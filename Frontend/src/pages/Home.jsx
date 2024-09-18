// src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Welcome to the Blog App</h1>
      <p>This is the homepage. Navigate to signup, login, or view blogs.</p>

      <div className="button-container">
        <button className="home-button" onClick={() => navigate('/signup')}>Sign Up</button>
        <button className="home-button" onClick={() => navigate('/login')}>Login</button>
      </div>
    </div>
  );
}

export default Home;
