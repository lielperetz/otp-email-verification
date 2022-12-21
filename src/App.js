import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import Verification from './Components/Verification';
const emailjs = require('emailjs-com');


function App() {

  const [returnedData, setReturnedData] = useState({ username: '', email: '', otp: null, otp_time: null });
  const [userInfo, setUserInfo] = useState({ username: '', email: '', otp: null, otp_time: null });

  useEffect(() => {
    console.log(returnedData);
  }, [returnedData])

  const setInput = (e) => {
    const { name, value } = e.target;
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value
    })
    )
  }

  const fetchData = async (e) => {
    await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: e
      })
    }).then(async res => {
      const data = await res.json();
      if (data.length === 0) {
        return Promise.reject('User doesn\'t exist, please sign up');
      }
      localStorage.setItem('token', data[0].email);
      setReturnedData(data[0]);
    }).catch(error => {
      alert(error.toString());
      window.location.assign('/register');
    });
  }

  const createUser = async () => {
    const newData = await fetch('/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        ...userInfo
      })
    }).then(async res => {
      const data = await res.json();
      alert('Added successfully!!');
      window.location.assign('/login');
      await setReturnedData(data);
    }).catch(error => {
      alert('Error!! user with email provided is already exist!');
    });
  }

  const createOTPAndSend = async () => {
    let otp = Math.floor(Math.random() * 899999) + 100000;
    let expireAt = new Date().getTime() + 5 * 60 * 1000;
    let user = { email: localStorage.getItem('token'), otp: otp, otp_time: expireAt };
    setReturnedData(user);
    //save otp at db
    const saveResult = await fetch('/saveOTP', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(async res => {
      const data = await res.json();
      if (data.length === 0) {
        return Promise.reject('Failed to send OTP. Pleae try again in a few minutes');
      }
      user = data[0];
      setReturnedData(user);
    }).catch(error => {
      console.error('Error!! ', error);
    });

    //send email
    await sendEmail(user);
  }

  const sendEmail = async (user) => {
    let template_params = {
      'name': user.username,
      'otp': user.otp,
      'email': user.email
    }
    try {
      emailjs.send("service_23s859n", "template_iudijlp", template_params, "HbphYjGVykH0I7oE4")
        .then((result) => {
          console.log(result);
        }, (error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register setInput={setInput} add={createUser} />} />
          <Route path='/register' element={<Register setInput={setInput} add={createUser} />} />
          <Route path='/login' element={<Login login={fetchData} send={createOTPAndSend} />} />
          <Route path='/verify' element={<Verification user={returnedData} resend={createOTPAndSend} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
