import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Notes from './components/Notes';
import './index.css'

function App() {
  const token = localStorage.getItem("token");
  
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={token ? <Notes /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/notes" element={token ? <Notes /> : <Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App