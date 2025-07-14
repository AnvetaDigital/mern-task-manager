# MERN Task Manager

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
│       ├── components/
│       ├── pages/
│       └── App.js
├── README.md
└── .gitignore
