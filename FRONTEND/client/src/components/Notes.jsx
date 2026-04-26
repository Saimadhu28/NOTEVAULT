import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Profile from './Profile';

function Notes() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [msg, setMessage] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        } else {
            getNotes();
        }
    }, [])

    async function getNotes() {
        const token = localStorage.getItem("token");
        try {
            const res = await axios.get("https://notevault-backend-xykr.onrender.com/notes",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setData(res.data.notes);
        } catch (err) {
            navigate("/login");
        }
    }

    async function addNote(e) {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            let res = await axios.post("https://notevault-backend-xykr.onrender.com/notes",
                {
                    title,
                    content
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setMessage(res.data.message);
            getNotes();
        } catch (err) {
            navigate("/login");
        }
    }

    async function deleteNote(id) {
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`https://notevault-backend-xykr.onrender.com/notes/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            getNotes();
        } catch (err) {
            navigate("/login");
        }
    }

    async function updateNote(id, newTitle, newContent) {
        const token = localStorage.getItem("token");

        await axios.put(
            `https://notevault-backend-xykr.onrender.com/notes/${id}`,
            { title: newTitle, content: newContent },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        getNotes();
    }

    return (
        <div className="notes-container">

            <div className="notes-top">
                <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
                <input placeholder="Content" onChange={(e) => setContent(e.target.value)} />
                <button onClick={addNote}>Add</button>
                <button className="btn-secondary" onClick={() => navigate("/profile")}>Profile</button>
            </div>

            <h4>{msg}</h4>

            <div className="notes-grid">
                {data.map(note => (
                    <div key={note._id} className="note-card">

                        <h3>{note.title}</h3>
                        <p>{note.content}</p>

                        <div className="note-actions">
                            <button onClick={() => {
                                const newTitle = prompt("Enter new title", note.title);
                                const newContent = prompt("Enter new content", note.content);

                                if (!newTitle || !newContent) return;

                                updateNote(note._id, newTitle, newContent);
                            }}>
                                Update
                            </button>
                            <button onClick={() => deleteNote(note._id)}>Delete</button>
                        </div>

                    </div>
                ))}
            </div>

        </div>
    )
}

export default Notes
