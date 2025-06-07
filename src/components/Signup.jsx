import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/signup", user);
      alert("Signup successful. Please login.");
      navigate("/");
    } catch (err) {
      console.error("Signup error:", err);
      const message = err.response?.data?.message || err.message || "Unknown error";
      alert("Signup failed: " + message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form" autoComplete="off">
      <h2>Signup</h2>
      <input className="authinpt" name="username" type="email" placeholder="Email" value={user.username} onChange={handleChange} required />
      <input className="authinpt" name="password" type="password" placeholder="Password" value={user.password} onChange={handleChange} required />
      <button type="submit" class="auth">Signup</button>
    </form>
  );
}

export default Signup;
