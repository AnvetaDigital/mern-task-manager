import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";

const RegistrationForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setMessage("Please fill in all fields");
      return;
    }
    try {
      await registerUser(form);
      setMessage("Registration successful!");
      setTimeout(() => {
        navigate("/create");
      }, 2000)    
    } catch (error) {
      setMessage(error.message || "Registration failed");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Register</h2>
      <form className="form">
        <label className="form-label">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="form-input"
        />
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="form-input"
        />
        <label className="form-label">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="form-input"
        />

        <button className="form-button register-button" onClick={handleSubmit}>
          Register
        </button>

        <p className="form-footer">
          Already have an account?{" "}
          <Link to="/" className="form-link">
            Log in here
          </Link>
        </p>
      </form>
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
    </div>
  );
};
export default RegistrationForm;
