import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from '../api/authApi';
import { useNavigate } from "react-router-dom";


function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setMessage("Please fill in all fields");
      return;
    }

    try {
      const data = await loginUser(form)
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setMessage("Login successful!");
      setTimeout(() => {
              navigate("/create");
      },2000)
    } catch (err) {
        setMessage(err.message || "Login failed");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Login</h2>
      <form className="form">
        <input
          className="form-input"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <br />

        <input
          className="form-input"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <br />

        <button className="form-button login-button" onClick={handleLogin}>
          Login
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

        <p className="form-footer">
          Don't have an account?{" "}
          <Link
            className="form-link"
            to="/register"
            style={{ color: "blue", textDecoration: "underline" }}
          >
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
