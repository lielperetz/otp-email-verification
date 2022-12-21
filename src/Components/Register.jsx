import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register(props) {

    const [error, setError] = useState({ username: '', email: '' });
    const [disabled, setDisabled] = useState(false);


    useEffect(() => {
        if (error.username !== '' || error.email !== '') {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [error])

    const validateInput = (e) => {
        const { name, value } = e.target;
        let msg = '';
        if (value === '') {
            msg = 'Required';
        } else if (name === 'email' && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            msg = 'Invalid email';
        }

        setError(prevState => ({
            ...prevState,
            [name]: msg
        })
        )
    }

    const regisetr = () => {
        let inpts = document.querySelectorAll('input');
        for (let i = 0; i < inpts.length; i++) {
            const val = inpts[i].value;
            if (val === '') {
                setError(prevState => ({
                    ...prevState,
                    [inpts[i].name]: 'Required'
                }))
                return;
            } else {
                setError(prevState => ({
                    ...prevState,
                    [inpts[i].name]: ''
                }))
            }
        }
        if (!disabled) {
            props.add();
        }
    }

    return (
        <div>
            <div className='container'>
                <h1>Register</h1>
                <hr />
                <div style={{ marginTop: '15px' }}>

                    <label htmlFor='username'><b>Username</b></label>
                    <input
                        name="username"
                        placeholder='User Name'
                        required
                        onChange={(e) => { validateInput(e); props.setInput(e) }}></input>
                    {error.username && (<small>{error.username}</small>)}<br />
                </div>
                <div style={{ marginTop: '15px' }}>
                    <label htmlFor='email'><b>Email</b></label>
                    <input
                        name="email"
                        placeholder='Email'
                        required
                        onChange={(e) => { validateInput(e); props.setInput(e) }}></input>
                    {error.email && (<small>{error.email}</small>)}<br />

                </div>
                <button disabled={disabled} onClick={() => regisetr()} className='registerbtn'>Register</button>

                <div className='signin'>
                    <p>Already have an account? <Link to={'/login'} className='link'>Sign in</Link>.</p>
                </div>
            </div>
        </div>
    )
}
