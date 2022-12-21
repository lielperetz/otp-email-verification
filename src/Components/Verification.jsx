import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Verification(props) {

    const [verified, setVerified] = useState(false);

    let digitValidate = function (e) {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    }

    let tabChange = function (val) {
        let elements = document.querySelectorAll('input');
        if (elements[val - 1].value !== '') {
            elements[val].focus()
        } else if (elements[val - 1].value === '') {
            elements[val - 2].focus()
        }
    }

    const verifyOTP = () => {
        let elements = document.querySelectorAll('input');
        let otp = '';
        elements.forEach(e => {
            otp += e.value;
        });
        console.log(otp);
        console.log(props.user);
        console.log(new Date().getTime());
        if (otp !== props.user.otp) {
            alert('Invalid OTP!!');
            setVerified(false);
            return;
        }
        if (new Date().getTime() > props.user.otp_time) {
            alert('Time expired!!')
            setVerified(false);
            return;
        }
        setVerified(true);
    }
    return (
        <div>
            <div className='container'>
                <h1>Verify OTP</h1>
                <hr />
                {verified &&
                        <h1>Verification Success!!</h1>
                }
                {!verified &&
                    <div>
                        <div className='otp-inputs'>
                            <input onInput={(e) => digitValidate(e)} onKeyUp={() => tabChange(1)} maxLength={1} />
                            <input onInput={(e) => digitValidate(e)} onKeyUp={() => tabChange(2)} maxLength={1} />
                            <input onInput={(e) => digitValidate(e)} onKeyUp={() => tabChange(3)} maxLength={1} />
                            <input onInput={(e) => digitValidate(e)} onKeyUp={() => tabChange(4)} maxLength={1} />
                            <input onInput={(e) => digitValidate(e)} onKeyUp={() => tabChange(5)} maxLength={1} />
                            <input onInput={(e) => digitValidate(e)} onKeyUp={() => tabChange(6)} maxLength={1} />
                        </div>
                        <button onClick={() => verifyOTP()} className='registerbtn'>Verify</button>
                        <div className='signin'>
                            <p>Didn't get the OTP? <span className='link' style={{ cursor: 'pointer' }} onClick={() => props.resend()}>Resend</span>.</p>
                        </div>
                    </div>
                }
                <Link to='/login'>Login</Link>
            </div>
        </div>
    )
}
