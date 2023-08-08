'use client';
import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import { usePathname } from 'next/navigation';

const MainComp = ({ children }: any) => {
  const [cartData, setCartData] = useState([]);

  const routerPath = usePathname();

  const adminUrl = routerPath?.split('/').at(1);

  const [loader, setLoader] = useState(false);

  //   const [alert, setAlert] = useState(false);

  //   const [imgName, setImageName] = useState(null);

  const [theme, setTheme] = useState('light');

  const [checkedIn, setCheckedIn] = useState(null);

  let userToken: any;
  let login_key: any;

  if (typeof window !== 'undefined' && window.localStorage) {
    userToken = localStorage.getItem('user-token');
    login_key = localStorage.getItem('login-key');
  }

  useEffect(() => {
    const cartProductData = async () => {
      if (userToken) {
        const singleUserCartData = await axios
          .get('http://localhost:3001/signup')
          .then((res) => res?.data);

        let indexData = singleUserCartData?.filter(
          (e: any) => e?.userName === userToken
        )[0]?.id;

        await axios
          .get(`http://localhost:3001/signup/${indexData}`)
          .then((res) => {
            if (res) {
              setCartData(res?.data?.cart);
            }
          });
      }
    };
    cartProductData();
  }, [loader, userToken]);

  console.log('productData', cartData);

  const handleTheme = (e: any) => {
    console.log('handleTheme', e.target.checked);
    setCheckedIn(e.target.checked);
    if (e.target.checked === true) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  useEffect(() => {
    const body = document.querySelector('body');
    console.log('body', body);
    if (theme === 'dark') {
      body?.classList.add('dark');
      body?.classList.remove('light');
    } else {
      body?.classList.add('light');
      body?.classList.remove('dark');
    }
  }, [theme]);

  return (
    <>
      <Header
        cartData={cartData}
        setCartData={setCartData}
        setLoader={setLoader}
        loader={loader}
        handleTheme={handleTheme}
        theme={theme}
        setCheckedIn={setCheckedIn}
        checkedIn={checkedIn}
      />
      <div>{children}</div>
    </>
  );
};

export default MainComp;
