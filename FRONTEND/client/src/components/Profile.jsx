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
    return (
        <div className="center">

            <div className="profile-card">

                <h2 style={{ marginBottom: "20px" }}>My Profile</h2>

                <div style={{ textAlign: "left", marginBottom: "20px" }}>
                    <p><strong>Username:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>

                <button onClick={() => {
                    const newname = prompt("Enter new name", user.name)
                    if (!newname) return
                    updateProfile(newname)
                }}>
                    Update Name
                </button>

                <button className="btn-secondary" onClick={() => {
                    navigate("/notes")
                }}>
                    Back to Notes
                </button>

                <button className="btn-secondary" onClick={() => {
                    localStorage.removeItem("token")
                    navigate("/login")
                }}>
                    Logout
                </button>

            </div>

        </div>
    )
}

export default Profile
