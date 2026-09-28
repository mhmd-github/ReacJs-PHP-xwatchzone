import React, { useState, useEffect } from 'react';
import './Login.css'; 
import { useNavigate } from 'react-router-dom';  

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  
  

  useEffect(() => {

    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {

      navigate('/AddItems'); 
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/login.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {


            localStorage.setItem('isLoggedIn', 'true'); 
            

            localStorage.setItem('adminUser', username);


            navigate('/AddItems'); 
        } else {
            alert("Login failed. Check your credentials.");
        }
    })
    .catch(error => {
        console.error("Login API Error:", error);
        alert("An error occurred during login. Please try again.");
    });
  };

  return (
    <div className="login-container">
        {}
        <form onSubmit={handleLogin}>
          <div className="login-box">
            <h2>Login</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            {}
            <button type="submit">Login</button>
          </div>
        </form>
    </div>
  );
}

export default Login;