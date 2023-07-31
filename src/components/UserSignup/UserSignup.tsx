'use client';
import React, { useState } from 'react';
import './UserSignup.scss';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const UserSignup = () => {
  const router = usePathname();

  const adminUrl = router.split('/').at(1);

  const [userSignup, setUserSignup] = useState<any[]>([]);

  const [user, setUser] = useState<any>({
    userName: '',
    name: '',
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
    let type = {
      admin: 'admin',
      user: 'user',
    };
    e.preventDefault();
    setUserSignup([...userSignup, user]);
    await axios.post(`http://localhost:3001/signup`, {
      ...user,
      key: adminUrl === 'admin' ? type.admin : type.user,
      cart: [],
    });
    setUser({
      userName: '',
      name: '',
      email: '',
    });
  };

  return (
    <div className='form-data'>
      <h2>User Signup</h2>
      <div className='form-data-wrapper'>
        <form onSubmit={handleSubmit}>
          <div className='input-data'>
            <input
              name='userName'
              value={user?.userName}
              type='text'
              placeholder='Please enter username'
              onChange={handleChange}
            />
          </div>
          <div className='input-data'>
            <input
              name='name'
              value={user?.name}
              type='text'
              placeholder='Please enter name'
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
          {/* <div className='input-data'>
            <input
              name='role'
              type='text'
              value={user?.role}
              placeholder='Please enter role'
              onChange={handleChange}
            />
          </div> */}
          <div className='input-data'>
            <button>Sign Up</button>
          </div>
          <div className='input-data'>
            <p>
              Alreay have a account? <Link href='/login'>Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserSignup;
