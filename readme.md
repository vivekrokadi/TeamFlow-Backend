
# TeamFlow Backend - Employee Task Management API 🚀



A robust **Node.js/Express.js backend API** for **TeamFlow** – providing secure authentication, task management, and employee management functionalities with **MongoDB integration**.

---

## 🌐 API Base URL
🔗 **Live API**: `https://teamflow-1yai.onrender.com`

---

## 🛠 Tech Stack

### Backend
![Node.js](https://img.shields.io/badge/Node.js-Server_Runtime-339933?logo=nodedotjs&logoColor=white)  
![Express.js](https://img.shields.io/badge/Express.js-Web_Framework-000000?logo=express&logoColor=white)  
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white)  

### Security & Authentication
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?logo=jsonwebtokens&logoColor=white)  
![bcrypt](https://img.shields.io/badge/bcrypt-Password_Hashing-FF6B6B)  
![CORS](https://img.shields.io/badge/CORS-Cross_Origin_Access-2496ED)  

### Development & Testing
![Nodemon](https://img.shields.io/badge/Nodemon-Hot_Reloading-76D04B?logo=nodemon&logoColor=white)  
![Postman](https://img.shields.io/badge/Postman-API_Testing-FF6C37?logo=postman&logoColor=white)  

---

## ✨ API Features

### 🔐 Authentication & Security
- ✅ JWT-based authentication system  
- ✅ Password hashing with bcrypt  
- ✅ Role-based access control (Admin/Employee)  
- ✅ CORS enabled for cross-origin requests  
- ✅ Input validation with express-validator  

### 👥 User Management
- ✅ User registration with role assignment  
- ✅ Secure login/logout functionality    
- ✅ Admin-only user management  
- ✅ Employee data retrieval  

### 📋 Task Management
- ✅ Full CRUD operations for tasks  
- ✅ Role-based task access  
- ✅ Task assignment to employees  
- ✅ Status tracking and updates  
- ✅ Priority and due date management  

### 🛡️ Security Features
- ✅ Protected API routes  
- ✅ Input sanitization and validation  
- ✅ MongoDB injection prevention  
- ✅ Secure headers and CORS configuration  


### 📚 API Documentation

### Authentication Endpoints
- **POST** `/api/auth/register` - Create new user account  
- **POST** `/api/auth/login` - User login  
- **GET** `/api/auth/me` - Get current user profile  

### User Management
- **GET** `/api/users` - Get all users (Admin only)  
- **GET** `/api/users/:id` - Get user by ID  
- **PUT** `/api/users/:id` - Update user profile  
- **DELETE** `/api/users/:id` - Delete user (Admin only)  

### Task Management
- **GET** `/api/tasks` - Get tasks (Admin: all tasks, Employee: assigned tasks)  
- **GET** `/api/tasks/:id` - Get specific task  
- **POST** `/api/tasks` - Create new task (Admin only)  
- **PUT** `/api/tasks/:id` - Update task status/details  
- **DELETE** `/api/tasks/:id` - Delete task (Admin only)  


---

## 🚀 Future Enhancements

### Planned Features
- 🔔 **Real-time Notifications** - WebSocket integration for live updates  
- 📊 **Analytics Dashboard** - Aggregate team performance metrics and insights  
- 🔗 **Third-party Integrations** - Slack, Google Calendar, etc.  
- 📁 **File Attachments** - Store and manage task-related documents  
- 👥 **Team Collaboration** - Comments and discussion endpoints  
- 📅 **Calendar View** - API support for visual task scheduling  
- 🎯 **Advanced Reporting** - Custom reports and exports API  

### Technical Improvements
- ⚡ **Performance Optimization** - Caching, query optimization, indexing  
- 🔒 **Enhanced Security** - Two-factor authentication, stricter validation   
- 🧪 **Advanced Testing** - E2E, integration, and load testing  
- 🐳 **Dockerization** - Containerized deployment for production  
