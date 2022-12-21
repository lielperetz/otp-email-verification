import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

export default function Login(props) {

    const [error, setError] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [email, setEmail] = useState('');
    const nav = useNavigate();

    const validateEmail = (email) => {
        if (email === '') {
            setError('Email is required');
            setDisabled(true);
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            setError('Invalid email');
            setDisabled(true);
        } else {
            setError('');
            setDisabled(false);
            setEmail(email);
        }
    }

    const login = async () => {
        await props.login(email);
        console.log(localStorage.getItem('token'));
        if (localStorage.getItem('token')) {
            props.send();
            nav('/verify');
        }
    }

    return (
        <div>
            <div className='container'>
                <h1>Login</h1>
                <hr />
                <div style={{ marginTop: '10px' }}>
                    <label htmlFor='email'><b>Email</b></label>
                    <input
                        name="email"
                        placeholder='Email'
                        required
                        onChange={(e) => validateEmail(e.target.value)}></input>
                    {error && (<small>{error}</small>)}<br />
                </div>

                <button disabled={disabled} onClick={() => login()} className='registerbtn'>Login</button>
                <div className='signin'>
                    <p>Not registered? <Link to={'/register'} className='link'>Create an account</Link>.</p>
                </div>
            </div>
        </div>
    )
}
