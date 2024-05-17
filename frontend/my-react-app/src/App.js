import React, { useState } from 'react';
import axios from 'axios';
import LoginForm from './LoginForm';
import Chatbot from './Chatbot.jsx';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const handleLogin = (userData) => {
        axios.post('http://localhost:5000/login', userData)
            .then(response => {
                setIsLoggedIn(true);
                setUser(response.data.user);
            })
            .catch(error => {
                console.error('Login error:', error);
            });
    };

    return React.createElement(
        'div',
        null,
        !isLoggedIn ? React.createElement(LoginForm, { onLogin: handleLogin }) : React.createElement(Chatbot, { user: user })
    );
}

export default App;

