import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTaskById, updateTasks } from "../api/taskApi";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    status: "Incomplete",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await getTaskById(id);
        setTask(data);
      } catch (err) {
        console.error(err.message);
      }
    })();
  }, [id]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    await updateTasks(id, task);
    setMessage("Task updated successfully!");
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
    } catch (error) {
      setMessage(err.message || "Failed to update task");
    }
   
  };

  return (
    <div className="form-container">
      <h3 className="form-title">Edit Task</h3>
      <form className="form">
        <input
          name="title"
          value={task.title}
          onChange={handleChange}
          required
          className="form-input"
        />
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          maxLength={50}
          rows={4}
          className="form-textarea"
        />
        <input
          name="dueDate"
          type="date"
          value={task.dueDate.split("T")[0]}
          onChange={handleChange}
          required
          className="form-input"
        />
        <select
          name="priority"
          value={task.priority}
          onChange={handleChange}
          className="form-select"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <select
          name="status"
          value={task.status}
          onChange={handleChange}
          className="form-select"
        >
          <option>Incomplete</option>
          <option>Complete</option>
        </select>
        <button
          onClick={handleSubmit}
          className="form-button update-task-button"
        >
          Update Task
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

export default EditTask;
