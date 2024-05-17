import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons'; // Import the required icons
import logo from './logo.jpeg'; // Import the image file
import './LoginForm.css'; // Import the CSS file

function LoginForm({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onLogin({ email, password });
    };

    return (
        <div className="container h-100">
            <div className="d-flex justify-content-center h-100">
                <div className="user_card">
                    <div className="d-flex justify-content-center">
                        <div className="brand_logo_container">
                            <img src={logo} className="brand_logo" alt="Logo" /> {/* Use imported image */}
                        </div>
                    </div>
                    <div className="d-flex justify-content-center form_container">
                        <form onSubmit={handleSubmit}>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend user-icon">
                                    <span className="input-group-text">
                                        <FontAwesomeIcon icon={faUser} style={{ fontSize: '16px', color: 'white' }} />
                                    </span>
                                </div>
                                <input type="text" name="email" className="form-control input_user" value={email} onChange={handleEmailChange} placeholder="Enter email" />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <FontAwesomeIcon icon={faKey} style={{ fontSize: '16px', color: 'white' }} />
                                    </span>
                                </div>
                                <input type="password" name="password" className="form-control input_pass" value={password} onChange={handlePasswordChange} placeholder="Enter password" />
                            </div>
                            <div className="form-group">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="customControlInline" />
                                    <label className="custom-control-label" htmlFor="customControlInline">Remember me</label>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center mt-3 login_container">
                                <button type="submit" className="btn login_btn">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;




