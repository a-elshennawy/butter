import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Joi from 'joi';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import './Register.css';

export default function Register() {
    const [formData, setFormData] = useState({
        FullName: '',
        Username: '',
        Email: '',
        Password: '',
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const schema = Joi.object({
        FullName: Joi.string()
            .pattern(/^[a-zA-Z]{1}[a-zA-Z ]{4,19}$/)
            .required()
            .messages({
                'string.pattern.base': 'Full name must be 5-20 letters long and contain no numbers or special characters.',
                'string.empty': 'Full name is required.',
            }),
        Username: Joi.string()
            .pattern(/^[a-zA-Z]{1}[a-zA-Z0-9!@#$%^&*()_+=-]{4,19}$/)
            .required()
            .messages({
                'string.pattern.base': 'Username must be 5-20 characters long and can include numbers or special characters.',
                'string.empty': 'Username is required.',
            }),
        Email: Joi.string().email({ tlds: { allow: false } }).required().messages({
            'string.email': 'Invalid email format.',
            'string.empty': 'Email is required.',
        }),
        Password: Joi.string()
            .pattern(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*()_+=-]{5,20}$/)
            .required()
            .messages({
                'string.pattern.base': 'Password must be 5-20 characters long and include at least one number.',
                'string.empty': 'Password is required.',
            }),
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        const { error: validationError } = schema.validate(
            { ...formData, [name]: value },
            { abortEarly: false }
        );

        if (validationError) {
            const fieldError = validationError.details.find((detail) => detail.context.key === name);
            setError(fieldError ? fieldError.message : '');
        } else {
            setError('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { error: validationError } = schema.validate(formData, { abortEarly: false });

        if (validationError) {
            setError(validationError.details[0].message);
            return;
        }

        const existingUsers = JSON.parse(localStorage.getItem('User_Reg_Data')) || [];

        const isUsernameTaken = existingUsers.some((user) => user.Username === formData.Username);
        const isEmailUsed = existingUsers.some((user) => user.Email === formData.Email);

        if (isUsernameTaken) {
            setError('Username already taken');
            return;
        }

        if (isEmailUsed) {
            setError('Email is already used');
            return;
        }

        const updatedUsers = [...existingUsers, formData];
        localStorage.setItem('User_Reg_Data', JSON.stringify(updatedUsers));

        setError('');
        setFormData({ FullName: '', Username: '', Email: '', Password: '' });
        navigate('/login');
    };

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Butter - Register</title>
                    <meta name='description' content='welcome to butter, new user ?' />
                </Helmet>
            </HelmetProvider>
            <div className="container-fluid">
                <div className="header row">
                    <div className="left col-10">
                        <h2>welcome</h2>
                        <h6>new user ?</h6>
                    </div>
                </div>
            </div>
            <div className="register">
                <div className="container">
                    <form className="registerform row" onSubmit={handleSubmit}>
                        <h4>register form</h4>
                        <div className="input-container col-10">
                            <i className="fa-solid fa-user"></i>
                            <input
                                type="text"
                                name="FullName"
                                placeholder="full name"
                                id="reg_name"
                                value={formData.FullName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-container col-10">
                            <i className="fa-solid fa-envelope"></i>
                            <input
                                type="email"
                                name="Email"
                                placeholder="email address"
                                id="email"
                                value={formData.Email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-container col-10">
                            <i className="fa-solid fa-user"></i>
                            <input
                                type="text"
                                name="Username"
                                placeholder="username"
                                id="reg_username"
                                value={formData.Username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-container col-10">
                            <i className="fa-solid fa-lock"></i>
                            <input
                                type="password"
                                name="Password"
                                placeholder="password"
                                id="reg_password"
                                value={formData.Password}
                                onChange={handleChange}
                            />
                        </div>
                        <p className="error">{error}</p>
                        <div className="regBtn col-5">
                            <button type="submit">sign up</button>
                        </div>
                        <p>already a user? <Link to={'/login'}>Login</Link></p>
                    </form>
                </div>
            </div>
            <Link to={'/'} className="guestBtn">guest browsing</Link>
        </>
    );
}
