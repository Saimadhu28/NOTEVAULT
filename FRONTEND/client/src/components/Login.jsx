import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMessage] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      let res = await axios.post("https://notevault-backend-xykr.onrender.com/login", {
        email: email,
        password: password
      });

      if (!res.data.token) {
        setMessage(res.data.message);
        return;
      }

      localStorage.setItem("token", res.data.token);
      window.location.href = "/notes";

    } catch (err) {
      setMessage(err.response.data.message);
    }
  }

  return (
    <div className="center">
      <form onSubmit={handleLogin} className="box">

        <h2>Login</h2>

        <input type="email" required placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} />
        <input type="password" required placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} />

        <button type='submit'>Login</button>

        <button type="button" className="btn-secondary" onClick={() => navigate("/register")}>
          Create Account
        </button>

        <h4>{msg}</h4>

      </form>
    </div>
  )
}

export default Login
