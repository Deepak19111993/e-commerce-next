'use client';
import React, { useState, useEffect } from 'react';
import '../UserSignup/UserSignup.scss';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [userLogin, setUserLogin] = useState<any>({});

  const router = useRouter();

  const [user, setUser] = useState<any>({
    userName: '',
    email: '',
  });

  const handleChange = (e: any) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
      id: uuidv4(),
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setUserLogin({ ...userLogin, user });
    await axios.post(`http://localhost:3001/login`, user);
    setUser({
      userName: '',
      email: '',
    });

    LoginData();
  };

  const LoginData = async () => {
    const signupData = await axios
      .get('http://localhost:3001/signup')
      .then((res) => res.data);
    console.log('signupData', signupData);

    const loginData = await axios
      .get('http://localhost:3001/login')
      .then((res) => res.data);
    console.log('loginData', loginData);

    signupData.map((e: any) => {
      if (
        loginData?.userName === e?.userName &&
        loginData?.email === e?.email
      ) {
          localStorage.setItem('user-token', loginData?.userName);
            router.push(`/home`);
      }
    });
  };

  return (
    <div className='form-data'>
      <h2>Login</h2>
      <div className='form-data-wrapper'>
        <form onSubmit={handleSubmit}>
          <div className='input-data'>
            <input
              name='userName'
              value={user?.userName}
              type='text'
              placeholder='Please enter UserName'
              onChange={handleChange}
            />
          </div>
          <div className='input-data'>
            <input
              name='email'
              type='text'
              value={user?.email}
              placeholder='Please enter email'
              onChange={handleChange}
            />
          </div>
          <div className='input-data'>
            <button>Login</button>
          </div>
          <div className='input-data'>
            <p>
              don`t have an account ? <Link href='/usersignup'>Sign Up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
