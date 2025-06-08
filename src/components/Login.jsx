import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const baseUrl = import.meta.env.MODE === 'development'
      ? 'http://localhost:3000'
      : ''; // empty string uses same domain (vercel)

    try {
      const res = await axios.post(`${baseUrl}/api/auth/login`, credentials, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      localStorage.setItem("token", res.data.token);
      navigate("/app");
    } catch (err) {
      const message = err.response?.data?.error || err.message || "Unknown error";
      alert("Login failed: " + message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form" autoComplete="off">
      <h2>Login</h2>
      <input
        className="authinpt"
        name="username"
        type="email"
        placeholder="Email"
        value={credentials.username}
        onChange={handleChange}
        required
      />
      <input
        className="authinpt"
        name="password"
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleChange}
        required
      />
      <button type="submit" className="auth">Login</button>
    </form>
  );
}

export default Login;
