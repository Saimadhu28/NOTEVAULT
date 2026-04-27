import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        } else {
            fetchProfile();
        }
    }, []);

    async function fetchProfile() {
        const token = localStorage.getItem("token");
        try {
            let res = await axios.get("http://localhost:8000/profile", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUser(res.data);
        } catch (err) {
            navigate("/login");
        }
    }

    async function updateProfile(newName) {
        const token = localStorage.getItem("token");
        await axios.put("http://localhost:8000/profile/update-name",
            { name: newName },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        fetchProfile();
    }

    const initials = user.name
        ? user.name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase()
        : "?";

    return (
        <div className="center">

            <div className="profile-card">

                <div className="avatar">{initials}</div>

                <h2>My Profile</h2>

                <hr className="divider" />

                <p><strong>Username</strong> {user.name}</p>

                <p><strong>Email</strong> {user.email}</p>

                <hr className="divider" />

                <button onClick={() => {
                    const newname = prompt("Enter new name", user.name)
                    if (!newname) return
                    updateProfile(newname)
                }} style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                    Update name
                </button>

                <button className="btn-secondary" onClick={() => navigate("/notes")}
                    style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}
                >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
                    </svg>
                    Back to notes
                </button>

                <button
                    className="btn-secondary"
                    onClick={() => {
                        localStorage.removeItem("token")
                        navigate("/login")
                    }}
                    style={{
                        display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                        color:"#e03131", borderColor:"rgba(224,49,49,0.2)"
                    }}
                >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                        <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                    Logout
                </button>

            </div>

        </div>
    )
}

export default Profile
