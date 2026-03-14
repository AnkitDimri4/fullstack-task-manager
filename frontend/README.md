
---

> # Task Manager Frontend
> Frontend for the **Task Management Application** built with **Next.js**, connecting to the secure backend API for authentication and task management.
> The application allows users to **register, login, and manage tasks** through a clean dashboard interface while interacting with encrypted backend APIs.

---

## Features

* User Registration & Login
* Protected Dashboard
* Task CRUD (Create, Read, Update, Delete)
* Task search by title
* Filter tasks by status
* Pagination support
* API request & response encryption
* Authentication using HTTP-only JWT cookies

---

## Tech Stack

* **Framework:** Next.js
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **HTTP Client:** Axios
* **Encryption:** CryptoJS

---

## Project Structure

```
frontend/
│
├── app/
│   ├── login/          # Login page
│   ├── register/       # User registration page
│   └── dashboard/      # Protected task dashboard
│
├── services/
│   └── api.ts          # Axios API client
│
├── utils/
│   └── encryption.ts   # AES encrypt/decrypt helpers
│
├── public/
└── package.json
```

---

## Environment Setup

Create `.env.local` inside `frontend`:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_AES_SECRET=your_aes_secret
```

This connects the frontend to the backend API.

---

## Installation

```bash
cd frontend

npm install

npm run dev
```

Application runs at:

```
http://localhost:3000
```

---

## Register Page Data Flow

The **Register page** collects user input:

```
Name
Email
Password
```

### Step-by-step process

1. User enters details on `/register`.
2. The frontend encrypts the payload using AES.
3. Encrypted data is sent to backend:

```
POST /api/auth/register
```

Example request:

```json
{
 "data": "encrypted_string"
}
```

4. Backend decrypts the payload and creates the user.
5. Backend sends an encrypted response.
6. Frontend decrypts the response and shows success message.

---

## Authentication Flow

1. User logs in via `/login`.
2. Backend verifies credentials.
3. JWT token is stored in **HTTP-only cookies**.
4. Protected pages (like `/dashboard`) require this cookie.
5. Unauthorized users cannot access task routes.

---

## Deployment

Frontend can be deployed easily using **Vercel**.

Steps:

1. Push project to GitHub
2. Import repository in Vercel
3. Set environment variables
4. Deploy

Production frontend will connect to deployed backend API.

---
## Author

**Ankit Dimri**  
Full-Stack & AI Developer – Dehradun, India  

[![GitHub](https://img.shields.io/badge/GitHub-AnkitDimri4-black?logo=github)](https://github.com/AnkitDimri4)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Ankit%20Dimri-blue?logo=linkedin)](https://linkedin.com/in/ankit-dimri-a6ab98263)
[![LeetCode](https://img.shields.io/badge/LeetCode-Profile-orange?logo=leetcode)](https://leetcode.com/u/user4612MW/)

---

## Tech Stack

### Frontend
![Next.js](https://img.shields.io/badge/Framework-Next.js-000?logo=nextdotjs)
![React](https://img.shields.io/badge/Library-React-149eca?logo=react)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178c6?logo=typescript)
![Tailwind%20CSS](https://img.shields.io/badge/UI-Tailwind_CSS-0ea5e9?logo=tailwindcss)
![Axios](https://img.shields.io/badge/HTTP-Axios-5a29e4)
![CryptoJS](https://img.shields.io/badge/Encryption-CryptoJS-purple)

### Dev Tools
![ESLint](https://img.shields.io/badge/Quality-ESLint-4b32c3?logo=eslint)
![Node.js](https://img.shields.io/badge/Runtime-Node.js-393?logo=node.js)
![Git](https://img.shields.io/badge/Version_Control-Git-f05032?logo=git)
![GitHub](https://img.shields.io/badge/Repo-GitHub-000?logo=github)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000?logo=vercel)

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
