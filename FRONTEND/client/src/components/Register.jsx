import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg,#1e3c72,#2a5298)"
};

const box = {
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
};

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMessage] = useState("");
    const navigate = useNavigate();

    async function register(e) {
        e.preventDefault();
        try {
            let res = await axios.post("https://notevault-backend-xykr.onrender.com/register", {
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

                <h2>Register</h2>

                <input type="text" placeholder='Enter Name' onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} />

                <button>Register</button>

                <button type="button" className="btn-secondary" onClick={() => navigate("/login")}>
                    Back to Login
                </button>

                <h4>{msg}</h4>

            </form>
        </div>
    )

}

export default Register
