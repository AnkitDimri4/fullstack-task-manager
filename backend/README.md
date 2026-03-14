
---


> # Task Manager API (Backend)
> Secure Node.js/Express backend for a Task Management application with JWT authentication, AES-encrypted APIs, and MongoDB for persistence.


> All APIs were tested using Postman to verify authentication, encryption, and task CRUD functionality.
<table> <tr> <td align="center"><b>Register API</b><br><img src="Projecttestimage/Screenshot%202026-03-14%20132606.png" width="400"/></td> <td align="center"><b>Login API</b><br><img src="Projecttestimage/Screenshot%202026-03-14%20132653.png" width="400"/></td> </tr> <tr> <td align="center"><b>Create Task</b><br><img src="Projecttestimage/Screenshot%202026-03-14%20133241.png" width="400"/></td> <td align="center"><b>Get Tasks</b><br><img src="Projecttestimage/Screenshot%202026-03-14%20133312.png" width="400"/></td> </tr> <tr> <td align="center"><br><img src="Projecttestimage/Screenshot%202026-03-14%20133332.png" width="400"/></td> <td align="center"><br><img src="Projecttestimage/Screenshot%202026-03-14%20133345.png" width="400"/></td> </tr> <tr> <td align="center"><br><img src="Projecttestimage/Screenshot%202026-03-14%20133952.png" width="400"/></td> <td align="center"><br><img src="Projecttestimage/Screenshot%202026-03-14%20134054.png" width="400"/></td> </tr> <tr> <td align="center"><br><img src="Projecttestimage/Screenshot%202026-03-14%20134505.png" width="400"/></td> <td align="center"><b>Encrypted Response</b><br><img src="Projecttestimage/Screenshot%202026-03-14%20134516.png" width="400"/></td> </tr> <tr> <td align="center"><b>Unauthorized Access</b><br><img src="Projecttestimage/Screenshot%202026-03-14%20135018.png" width="400"/></td> <td align="center"><br><img src="Projecttestimage/Screenshot%202026-03-14%20135135.png" width="400"/></td> </tr> </table>

---

## Features

- User registration and login
- Password hashing with bcrypt
- JWT authentication stored in HTTP-only cookies
- AES encryption of request and response payloads
- Task CRUD (create, read, update, delete)
- Pagination, status filter, and title search for tasks
- Per-user task isolation (users can access only their own tasks)
- CORS configured for frontend integration

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB (Atlas or local)
- **ORM:** Mongoose
- **Auth:** JWT (HTTP-only cookies), bcryptjs
- **Security:** AES encryption with `crypto-js`, CORS, environment variables via `dotenv`

---

## Folder Structure

```bash
backend/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   ├── authController.js  # Register/Login logic
│   └── taskController.js  # Task CRUD logic
├── middleware/
│   ├── authMiddleware.js  # JWT verify, protects routes
│   └── decryptMiddleware.js # Decrypt incoming encrypted body
├── models/
│   ├── User.js            # User schema
│   └── Task.js            # Task schema
├── routes/
│   ├── authRoutes.js      # /api/auth routes
│   └── taskRoutes.js      # /api/tasks routes
├── utils/
│   └── encryption.js      # AES encrypt/decrypt helpers
├── server.js              # Express app entry
├── package.json
└── .env.example           # Sample env variables (no secrets)
```

---

## Environment Variables

Create a `.env` file in the `backend` directory based on `.env.example`:

```env
PORT=5000
MONGOURI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
AES_SECRET=your-aes-secret
CLIENT_ORIGIN=http://localhost:3000
```

- `CLIENT_ORIGIN` should be set to your frontend URL in production (e.g. Vercel URL).

---

## Installation & Local Setup

From the project root:

```bash
cd backend

# Install dependencies
npm install

# Copy env example and fill values
cp .env.example .env   # or create .env manually

# Run in development with auto-reload
npm run dev

# Or run in production mode
npm start
```

Backend will run on `http://localhost:5000` by default.

---

## API Overview

All responses follow:

```json
{
  "success": true | false,
  "data": "ENCRYPTED_STRING" | null,
  "message": "optional-plain-message"
}
```

Encrypted `data` must be decrypted on the frontend using the same AES secret.

### Auth Routes

Base: `/api/auth`

- **POST** `/register`  
  - Request: encrypted body `{ data: "<cipher>" }` where cipher decrypts to:
    ```json
    {
      "name": "Ankit Dimri",
      "email": "ankitdimri@example.com",
      "password": "secret123"
    }
    ```
  - Response (on success): `success: true`, `data` = encrypted `{ "message": "User registered successfully" }`.

- **POST** `/login`  
  - Request: encrypted body `{ data: "<cipher>" }` where cipher decrypts to:
    ```json
    {
      "email": "ankitdimri@example.com",
      "password": "secret123"
    }
    ```
  - Behavior:
    - Verifies user & password.
    - Sets JWT in HTTP-only cookie `token`.
  - Response (on success): `success: true`, `data` = encrypted `{ "message": "Login successful", "userId": "<id>" }`.

### Task Routes (Protected)

Base: `/api/tasks`  
All routes require a valid JWT cookie (`token`) set by the login endpoint.

- **GET** `/`  
  - Query params:
    - `page` (number, default 1)
    - `limit` (number, default 10)
    - `status` (`pending` | `completed`, optional)
    - `search` (string, search by title, optional)
  - Response: `success: true`, `data` = encrypted array of tasks.

- **POST** `/`  
  - Request: encrypted body `{ data: "<cipher>" }` where cipher decrypts to:
    ```json
    {
      "title": "Finish assignment",
      "description": "Complete full stack app",
      "status": "pending"
    }
    ```
  - Response: `success: true`, `data` = encrypted created task.

- **PUT** `/:id`  
  - Request: encrypted body with fields to update (same shape as POST).
  - Response: `success: true`, `data` = encrypted updated task.

- **DELETE** `/:id`  
  - Response: `success: true`, `data` = encrypted `{ "message": "Task deleted" }`.

All task routes enforce that the `user` field matches the authenticated user, so one user cannot access another user’s tasks.

---

## Encryption Flow

- **Encryption utility** (`utils/encryption.js`) uses `AES_SECRET`:

  ```js
  // encryptData(data) -> string
  // decryptData(cipher) -> object
  ```

- **Request-side (frontend)**:
  - Encrypt payload: `encryptRequest(payload) -> { data: "<cipher>" }`.
- **Server-side**:
  - `decryptMiddleware` runs before controllers:
    - If `req.body.data` exists, it calls `decryptData` and replaces `req.body` with decrypted JSON.
  - Controllers work with plain JS objects.
  - Before sending response, controllers wrap payload with `encryptData(...)`.

This satisfies the “end-to-end encrypted request/response” requirement.

---

## Deployment Notes

### Render (Backend)

1. Push full project to GitHub (including `backend`, excluding `node_modules` and real `.env`).
2. On Render, create a **Web Service** from the repo, pointing to `backend` directory.
3. Set:
   - Build command: `npm install`
   - Start command: `npm start`
4. Add environment variables in Render dashboard:
   - `PORT=10000` (or leave blank, Render sets `PORT`)
   - `MONGOURI=...`
   - `JWT_SECRET=...`
   - `AES_SECRET=...`
   - `CLIENT_ORIGIN=https://your-frontend.vercel.app`

After deploy, your backend URL will look like:  
`https://your-backend.onrender.com`

Use that as `baseURL` for your frontend API client.

---

## Author

**Ankit Dimri**  
Full-Stack & AI Developer – Dehradun, India  


[![GitHub](https://img.shields.io/badge/GitHub-AnkitDimri4-black?logo=github)](https://github.com/AnkitDimri4)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Ankit%20Dimri-blue?logo=linkedin)](https://linkedin.com/in/ankit-dimri-a6ab98263)
[![LeetCode](https://img.shields.io/badge/LeetCode-Profile-orange?logo=leetcode)](https://leetcode.com/u/user4612MW/)

---

## Tech Stack

### Backend
![Node.js](https://img.shields.io/badge/Runtime-Node.js-393?logo=node.js)
![Express](https://img.shields.io/badge/Framework-Express-000?logo=express)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-234?logo=mongodb)
![Mongoose](https://img.shields.io/badge/ORM-Mongoose-880000)
![JWT](https://img.shields.io/badge/Auth-JWT-000?logo=jsonwebtokens)
![bcryptjs](https://img.shields.io/badge/Security-bcryptjs-orange)
![CryptoJS](https://img.shields.io/badge/Encryption-CryptoJS-purple)
![Cookie%20Parser](https://img.shields.io/badge/HTTP-Cookie_Parser-444)
![CORS](https://img.shields.io/badge/Security-CORS-0f766e)
![Dotenv](https://img.shields.io/badge/Config-dotenv-4b5563)

### Dev Tools
![Nodemon](https://img.shields.io/badge/Dev-nodemon-76d04b?logo=nodemon)
![Git](https://img.shields.io/badge/Version_Control-Git-f05032?logo=git)
![GitHub](https://img.shields.io/badge/Repo-GitHub-000?logo=github)

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
