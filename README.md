
---

> # Full Stack Task Manager
> Secure **Task Management Application** built with **Next.js**, **Node.js**, **Express**, and **MongoDB**.
> The project demonstrates **JWT authentication, encrypted APIs, secure cookies, and full CRUD task management** with a modern frontend dashboard.

---

> # Live Demo
> Frontend (Deployed on Vercel): **[https://fullstack-task-manager-ebon.vercel.app](https://fullstack-task-manager-ebon.vercel.app)**

# Demo Credentials
You can test the application using the following account:

```
Email: ankit1@test.com
Password: 12345678
```

### Desktop View
<img src="frontend/public/DesktopView.png" width="1000"/>

### Mobile View
<img src="frontend/public/mobileview.jpeg" width="600"/>
---

# Project Architecture

```
Frontend (Next.js)
      │
      │ Encrypted API Requests
      ▼
Backend (Node.js + Express)
      │
      │ JWT Authentication + AES Encryption
      ▼
MongoDB Database
```

---

# Features

### Authentication

* User registration
* Secure login system
* Password hashing using **bcrypt**
* JWT authentication stored in **HTTP-only cookies**

### Task Management

* Create tasks
* View tasks
* Update tasks
* Delete tasks
* Search tasks by title
* Filter tasks by status
* Pagination support

### Security

* AES encrypted request and response payloads
* Protected routes with JWT middleware
* CORS configuration
* Secure cookie handling

---

## Tech Stack

### Frontend

![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-149ECA?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-0EA5E9?logo=tailwindcss&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white)
![CryptoJS](https://img.shields.io/badge/CryptoJS-4B5563?logo=cryptpad&logoColor=white)

### Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JSON_Web_Token-000000?logo=jsonwebtokens&logoColor=white)
![bcryptjs](https://img.shields.io/badge/bcryptjs-F59E0B?logo=keepassxc&logoColor=white)
![CryptoJS](https://img.shields.io/badge/CryptoJS-4B5563?logo=cryptpad&logoColor=white)


---

# Repository Structure

```
fullstack-task-manager/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── app/
│   │   ├── login/
│   │   ├── register/
│   │   └── dashboard/
│   ├── services/
│   └── utils/
│
└── README.md
```

---

# Installation (Local Setup)

Clone the repository:

```
git clone https://github.com/AnkitDimri4/fullstack-task-manager.git
```

## Backend Setup

> - **[Backend README](https://github.com/AnkitDimri4/fullstack-task-manager/blob/main/backend/README.md)**
```
cd backend
npm install
npm run dev
```

Create `.env`:

```
PORT=5000
MONGOURI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
AES_SECRET=your_aes_secret
CLIENT_ORIGIN=http://localhost:3000
```

---

## Frontend Setup


> - **[Frontend README](https://github.com/AnkitDimri4/fullstack-task-manager/blob/main/frontend/README.md)**
```
cd frontend
npm install
npm run dev
```

Create `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_AES_SECRET=your_aes_secret
```

Open:

```
http://localhost:3000
```

---

# Authentication Flow

1. User registers via `/register`
2. Payload is encrypted using AES
3. Backend decrypts the request
4. Password is hashed with bcrypt
5. On login, JWT is issued and stored in HTTP-only cookies
6. Protected routes verify JWT before allowing access

---

# Deployment

### Frontend

Deployed using **Vercel**

### Backend

Recommended deployment using **Render**

---

## Author

**Ankit Dimri**  
Full-Stack & AI Developer – Dehradun, India  

[![GitHub](https://img.shields.io/badge/GitHub-AnkitDimri4-black?logo=github)](https://github.com/AnkitDimri4)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Ankit%20Dimri-blue?logo=linkedin)](https://linkedin.com/in/ankit-dimri-a6ab98263)
[![LeetCode](https://img.shields.io/badge/LeetCode-Profile-orange?logo=leetcode)](https://leetcode.com/u/user4612MW/)


---

## Project Info

- **Project:** Full Stack Task Manager  
- **Role:** Full Stack Development Intern  
- **Organization:** Myraid  
- **Stack:** Next.js (Frontend) · Node.js/Express (Backend) · MongoDB  
- **Key Requirements:** JWT auth, AES-encrypted request/response, pagination, search, filters  
- **Year:** 2026  

---

<div align="center">
Built and designed by <strong>Ankit Dimri</strong>    © 2026
</div>

---
