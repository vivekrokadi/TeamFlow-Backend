const express = require('express');
const { body, validationResult } = require('express-validator');
const Task = require('../models/Task');
const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes protected
router.use(protect);

// @desc    Get all tasks (Admin gets all, Employee gets assigned tasks)
// @route   GET /api/tasks
// @access  Private
router.get('/', asyncHandler(async (req, res) => {
  let tasks;
  
  if (req.user.role === 'admin') {
    // Admin can see all tasks with employee details
    tasks = await Task.find()
      .populate('assignedTo', 'name email position department')
      .populate('assignedBy', 'name email')
      .sort('-createdAt');
  } else {
    // Employees can only see their assigned tasks
    tasks = await Task.find({ assignedTo: req.user.id })
      .populate('assignedTo', 'name email position department')
      .populate('assignedBy', 'name email')
      .sort('-createdAt');
  }

  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks
  });
}));

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
router.get('/:id', asyncHandler(async (req, res) => {
  let task = await Task.findById(req.params.id)
    .populate('assignedTo', 'name email position department')
    .populate('assignedBy', 'name email');

  if (!task) {
    return res.status(404).json({
      success: false,
      message: 'Task not found'
    });
  }

  // Employees can only access their assigned tasks
  if (req.user.role !== 'admin' && task.assignedTo._id.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to access this task'
    });
  }

  res.status(200).json({
    success: true,
    data: task
  });
}));

// @desc    Create task (Admin only)
// @route   POST /api/tasks
// @access  Private/Admin
router.post('/', [
  body('title').notEmpty().withMessage('Title is required'),
  body('assignedTo').notEmpty().withMessage('Assigned To is required'),
  body('dueDate').notEmpty().withMessage('Due Date is required')
], authorize('admin'), asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  // Check if assigned user exists
  const assignedUser = await User.findById(req.body.assignedTo);
  if (!assignedUser) {
    return res.status(404).json({
      success: false,
      message: 'Assigned user not found'
    });
  }

  const task = await Task.create({
    ...req.body,
    assignedBy: req.user.id
  });

  const populatedTask = await Task.findById(task._id)
    .populate('assignedTo', 'name email position department')
    .populate('assignedBy', 'name email');

  res.status(201).json({
    success: true,
    data: populatedTask
  });
}));

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
router.put('/:id', [
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('status').optional().isIn(['pending', 'in progress', 'completed']).withMessage('Invalid status')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  let task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: 'Task not found'
    });
  }

  // Employees can only update status of their assigned tasks
  if (req.user.role !== 'admin') {
    if (task.assignedTo.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this task'
      });
    }
    
    // Employees can only update status field
    const allowedUpdates = ['status'];
    const attemptedUpdates = Object.keys(req.body);
    const isValidOperation = attemptedUpdates.every(update => 
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).json({
        success: false,
        message: 'Employees can only update task status'
      });
    }
  }

  task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  }).populate('assignedTo', 'name email position department')
    .populate('assignedBy', 'name email');

  res.status(200).json({
    success: true,
    data: task
  });
}));

// @desc    Delete task (Admin only)
// @route   DELETE /api/tasks/:id
// @access  Private/Admin
router.delete('/:id', authorize('admin'), asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  
  if (!task) {
    return res.status(404).json({
      success: false,
      message: 'Task not found'
    });
  }

  await Task.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Task deleted successfully'
  });
}));

module.exports = router;