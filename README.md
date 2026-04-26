# 📝 NoteVault

A simple and clean **Full-Stack Notes App** where users can register, login, and manage their notes securely.

🔗 Live Demo: https://notevault-app.netlify.app

---

## 🚀 What this project does

This app allows users to:

* Create an account (Register)
* Login securely using JWT authentication
* Add notes
* View all notes
* Update notes
* Delete notes
* View and update profile

---

## 🧠 How it works (Simple explanation)

1. User registers → data stored in MongoDB
2. Password is encrypted using bcrypt
3. User logs in → server generates a JWT token
4. Token is stored in browser (localStorage)
5. Every request (notes/profile) sends token in headers
6. Backend verifies token → allows access

👉 This is how authentication is handled securely.

---

## 🛠️ Tech Stack

### Frontend:

* React (Vite)
* Axios
* React Router

### Backend:

* Node.js
* Express.js

### Database:

* MongoDB (Atlas)

### Authentication:

* JWT (JSON Web Token)
* bcrypt (password hashing)

---

## 📂 Project Structure

```
NOTEVAULT/
├── BACKEND/
│   ├── server.js
│   ├── models
│   └── routes
│
├── FRONTEND/client/
│   ├── src/
│   ├── components/
│   └── App.jsx
```

---

## 🔐 Features implemented

* Authentication using JWT
* Protected routes
* CRUD operations (Create, Read, Update, Delete)
* Secure password storage
* Token-based authorization

---

## ⚙️ How to run locally

### 1. Clone the repo

```
git clone https://github.com/your-username/notevault.git
```

---

### 2. Backend setup

```
cd BACKEND
npm install
```

Create `.env` file:

```
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
PORT=8000
```

Run backend:

```
nodemon server.js
```

---

### 3. Frontend setup

```
cd FRONTEND/client
npm install
npm run dev
```

---

## 🌐 Deployment

* Frontend: Netlify
* Backend: Render

---

## ✨ What I learned

* How JWT authentication works
* How frontend and backend connect
* How to deploy full-stack apps
* Handling protected routes
* Managing state and API calls

---

## 🙌 Final Note

This project helped me understand full-stack development in a practical way.
Built step-by-step with focus on clarity and learning.

---
