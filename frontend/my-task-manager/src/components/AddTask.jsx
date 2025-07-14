import { useState } from "react";
import { createTask } from "../api/taskApi";
import { useNavigate } from "react-router-dom";

function AddTask() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage("")
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.dueDate) {
      setMessage("Title and Due Date are required");
      return;
    }

    try {
      await createTask(form);
      setMessage("Task created successfully!");
      setTimeout(() => {
             setForm({
               title: "",
               description: "",
               dueDate: "",
               priority: "Medium",
             });
             navigate("/dashboard"); 
      },2000)
    } catch (err) {
      setMessage(err.message || "Failed to create task");
    }
  };

  return (
    <div className="form-container">
      <h3 className="form-title">Create New Task</h3>
      <form className="form">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="form-input"
        />
        <textarea
          name="description"
          placeholder="Enter task description (max 50 characters)"
          value={form.description}
          onChange={handleChange}
          maxLength={50}
          rows={4}
          className="form-textarea"
        />
        <input
          name="dueDate"
          type="date"
          value={form.dueDate}
          onChange={handleChange}
          className="form-input"
        />
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="form-select"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <button
          onClick={handleSubmit}
          className="form-button create-task-button"
        >
          Create Task
        </button>
        {message && (
          <p
            className={
              message.toLowerCase().includes("success")
                ? "success-msg"
                : "error-msg"
            }
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default AddTask;
