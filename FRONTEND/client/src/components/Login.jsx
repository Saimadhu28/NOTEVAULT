import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/notes");
    }
  }, []);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      let res = await axios.post("http://localhost:8000/login", {
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

        <div style={{ textAlign: "center", marginBottom: "4px" }}>
          <div style={{
            width: 48, height: 48,
            background: "linear-gradient(135deg,#3b5bdb,#4c6ef5)",
            borderRadius: 14,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 12,
            boxShadow: "0 4px 16px rgba(59,91,219,0.3)"
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </div>
          <p style={{ fontSize: 12, color: "var(--ink-faint)", letterSpacing: "0.08em", textTransform: "uppercase" }}>NoteVault</p>
        </div>

        <h2>Welcome back</h2>
        <p style={{ textAlign:"center", color:"var(--ink-muted)", fontSize:14, marginTop:-6, marginBottom:4 }}>
          Sign in to your notes
        </p>

        <input
          type="email"
          required
          placeholder='Email address'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          required
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type='submit' style={{ marginTop: 4 }}>Sign in</button>

        <button type="button" className="btn-secondary" onClick={() => navigate("/register")}>
          Create account
        </button>

        <h4>{msg}</h4>

      </form>
    </div>
  )
}

export default Login
