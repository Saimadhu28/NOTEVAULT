import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMessage] = useState("");
    const navigate = useNavigate();

    async function register(e) {
        e.preventDefault();
        try {
            let res = await axios.post("http://localhost:8000/register", {
                name: name,
                email: email,
                password: password
            });
            setMessage(res.data.message);
        } catch (err) {
            setMessage("Error Occured");
        }
    }

    return (
        <div className="center">
            <form onSubmit={register} className="box">

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

                <h2>Create account</h2>
                <p style={{ textAlign:"center", color:"var(--ink-muted)", fontSize:14, marginTop:-6, marginBottom:4 }}>
                    Start capturing your ideas
                </p>

                <input type="text" placeholder='Full name' onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder='Email address' onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder='Create password' onChange={(e) => setPassword(e.target.value)} />

                <button style={{ marginTop: 4 }}>Create account</button>

                <button type="button" className="btn-secondary" onClick={() => navigate("/login")}>
                    Back to sign in
                </button>

                <h4>{msg}</h4>

            </form>
        </div>
    )
}

export default Register
