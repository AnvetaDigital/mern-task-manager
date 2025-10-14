# Task Manager

A full-stack **Task Management Application** built using the **MERN** (MongoDB, Express.js, React.js, Node.js) stack. This app allows users to register, log in, and manage their daily tasks efficiently.

---

## Features

-  User Authentication (Register/Login)
-  Create tasks with:
  - Title
  - Description
  - Due Date
  - Priority (Low, Medium, High)
- View all tasks in a paginated table
- Edit or delete tasks
- Mark tasks as complete/incomplete
- Filter by status or priority
- Search by title

---

## 🛠️ Tech Stack

| Frontend            | Backend             | Database     |
|---------------------|---------------------|--------------|
| React.js            | Node.js + Express.js| MongoDB (Atlas) |
| React Router        | JWT for Auth        | Mongoose     |
| CSS & MUI           | bcryptjs            |              |
| Fetch API           | CORS, dotenv        |              |

---

##  Folder Structure

```bash
mern-task-manager/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
├── frontend/
│   └── src/
│       ├── api/
│       ├── components/
│       └── App.jsx
│       ├── index.css
│       └── main.jsx
|       
├── README.md
|__ LICENSE
└── .gitignore

## ⚙️ Setup Instructions

### 1️⃣ Clone the repo
```bash
git clone https://github.com/AnvetaDigital/mern-task-manager.git
cd mern-task-manager

2️⃣ Backend Setup
cd backend
npm install

Create .env file in /backend with the following:
# Server Port
PORT=5000

# MongoDB connection string (replace with your own cluster or local URI)
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/event-tracker

# JWT secret key (replace with a strong random string)
JWT_SECRET=your_jwt_secret_key

Run backend:
npm start


3️⃣ Frontend Setup
cd ../frontend
npm install

Run frontend:
npm run dev

🔒 Security Notes
Passwords hashed with bcrypt
JWT-based auth with expiry
Basic validation & error handling

📌 Trade-offs & Assumptions
No email verification (to save time)
Basic UI for simplicity

## License
This project is licensed under the [MIT License](./LICENSE).



