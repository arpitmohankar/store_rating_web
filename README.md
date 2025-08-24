## [!!!🔴For Website ScreenShots, Scroll down🔴!!!]
# 🏪 Store Rating Platform

A full-stack web application that allows users to submit ratings for stores registered on the platform. Built with React.js, Express.js, and PostgreSQL, featuring role-based access control and comprehensive dashboards.

![Store Rating Platform](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-19.0.0-61dafb.svg)

## 🔑 Environment Variables

### Backend Configuration
Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=5000
DATABASE_URL=
JWT_SECRET=
NODE_ENV=development
```
## 🚀Setup Project and run
```bash
git clone https://github.com/yourusername/store-rating-platform.git
cd store-rating-platform
!![in root folder, not need to go in backend and frontend folder]
## npm i
## npm run install-all
## npm run seed [to creater all table in db] neondb postgresql connection string use for db.
## npm run dev [automatically run both backend and frontend]
```
## Enjoy...

## ✨ Features

- **🔐 Role-Based Access Control**: Three distinct user roles with specific permissions
- **⭐ Rating System**: Users can rate stores from 1 to 5 stars
- **📊 Analytics Dashboard**: Comprehensive dashboards for each user role
- **🔍 Search & Filter**: Advanced search and filtering capabilities
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **🎨 Material UI**: Modern and professional user interface
- **🔒 Secure Authentication**: JWT-based authentication system
- **✅ Form Validation**: Comprehensive input validation on both frontend and backend

## 🛠 Tech Stack

### Frontend
- **React.js** (v19.0.0) - UI library
- **Material-UI** (v7.x) - Component library
- **React Router** (v7) - Routing
- **Axios** - HTTP client
- **React Toastify** - Notifications

### Backend
- **Express.js** (v5.1.0) - Node.js framework
- **PostgreSQL** - Database (via NeonDB)
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Cors** - Cross-origin resource sharing

### Database
- **PostgreSQL** (Hosted on NeonDB)
- **pg** (v8.16.3) - PostgreSQL client for Node.js

## 👥 User Roles

### 1. System Administrator
- Add new stores, users, and admin users
- Access comprehensive dashboard with platform statistics
- View and manage all users and stores
- Apply filters and sorting on all listings

### 2. Normal User
- Sign up and log in to the platform
- Rate stores (1-5 stars)
- Search and filter stores
- Update their ratings
- Change password

### 3. Store Owner
- View store dashboard with rating analytics
- See list of users who rated their store
- View average rating and rating distribution
- Monitor store performance

## 📦 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v20.0.0 or higher)
- **npm** (v9.0.0 or higher)
- **PostgreSQL** database (or NeonDB account)
- **Git**
<img width="1897" height="858" alt="image" src="https://github.com/user-attachments/assets/c7e09c39-f7e5-42a0-90a9-709f31a68bdd" />
<img width="1358" height="466" alt="image" src="https://github.com/user-attachments/assets/eb124713-9b25-4623-850c-cb8fb29057b6" />
<img width="1901" height="765" alt="image" src="https://github.com/user-attachments/assets/41f66c20-0c3e-42b6-9e1e-b67b4749ed93" />
<img width="1889" height="786" alt="image" src="https://github.com/user-attachments/assets/c20673e1-74c0-4b99-9a29-d56e33149972" />
<img width="1889" height="786" alt="image" src="https://github.com/user-attachments/assets/d67db447-8f55-4933-b319-2ca4dafed6d2" />
<img width="1144" height="805" alt="image" src="https://github.com/user-attachments/assets/2c1e0578-0ca4-4287-b2ce-50b015b32b05" />
<img width="1899" height="857" alt="image" src="https://github.com/user-attachments/assets/2b926013-d269-4021-8181-5e57a025c5ce" />
<img width="1882" height="861" alt="image" src="https://github.com/user-attachments/assets/50af98df-5a04-4519-bc4f-ec1d013ceec7" />


