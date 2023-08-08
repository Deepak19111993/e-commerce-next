'use client';
import React, { useState, useEffect } from 'react';
import '../UserSignup/UserSignup.scss';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import axios from 'axios';
import { useRouter, usePathname } from 'next/navigation';

const Login = () => {
  const [userLogin, setUserLogin] = useState<any>({});

  const router = useRouter();

  const routerPath = usePathname();

  const adminUrl = routerPath?.split('/').at(1);

  const userToken = localStorage.getItem('user-token');

  const login_key = localStorage.getItem('login-key');

  console.log('adminUrl', adminUrl);

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
    let type = {
      admin: 'admin',
      user: 'user',
    };
    setUserLogin({ ...userLogin, user });
    await axios.post(`http://localhost:3001/login`, {
      ...user,
      key: adminUrl === 'admin' ? type.admin : type.user,
    });
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

    const newSignup = signupData?.filter(
      (e: any) => e?.userName === loginData?.userName
    );

    console.log('newSignup', newSignup[0]);

    if (adminUrl !== 'admin') {
      if (
        newSignup[0]?.userName === loginData?.userName &&
        newSignup[0]?.email === loginData?.email &&
        newSignup[0]?.key === loginData?.key
      ) {
        localStorage.setItem('user-token', loginData?.userName);
        localStorage.setItem('login-key', loginData?.key);
        router.push(`/home`);
      } else {
        router.push(`/admin/login`);
      }
    } else {
      if (
        newSignup[0]?.userName === loginData?.userName &&
        newSignup[0]?.email === loginData?.email &&
        newSignup[0]?.key === loginData?.key
      ) {
        localStorage.setItem('user-token', loginData?.userName);
        localStorage.setItem('login-key', loginData?.key);
        router.push(`/admin`);
      }
    }
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
            <span>
              don`t have an account ? <Link href='/usersignup'>Sign Up</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
