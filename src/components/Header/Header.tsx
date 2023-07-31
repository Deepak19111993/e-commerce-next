import React, { useEffect, useState } from 'react';
import './Header.scss';
import Image from 'next/image';
import axios from 'axios';
import CartDrawer from '../CartDrawer/CartDrawer';
import { useRouter } from 'next/navigation';

const Header = ({
  cartData,
  setCartData,
  setLoader,
  loader,
  handleTheme,
  theme,
  setCheckedIn,
  checkedIn,
}: any) => {
  const router = useRouter();

  const [openDrawer, setOpenDrawer] = useState(false);

  const userToken = localStorage.getItem('user-token');

  console.log('cartData', cartData);

  const logout = async () => {
    // setLoader(true);
    localStorage.clear();
    // router.push('/home');

    if (window !== undefined) {
      window.location.replace('/home');
    }
    // setLoader(false);
  };

  const login = () => {
    router.push('/login');
  };

  return (
    <>
      <div className={`header-wrapper ${theme}`}>
        {/* <Image src='' alt='logo' width={50} height={50} /> */}
        <div className='logo'>Logo</div>
        {userToken ? (
          <ul className='right'>
            <li>
              <div className='switcher'>
                {theme === 'dark' ? <span>Dark</span> : <span>Light</span>}
                <input
                  type='checkbox'
                  value={theme}
                  id='check'
                  onChange={handleTheme}
                />
                <label for='check'>
                  <div className='switch'></div>
                </label>
              </div>
            </li>
            <li>user: {userToken}</li>
            <li onClick={() => setOpenDrawer(true)}>
              Cart <span className='count'>{cartData?.length}</span>
            </li>
            <li onClick={logout}>Log Out</li>
          </ul>
        ) : (
          <ul className='right'>
            {/* <li>user: {userToken}</li> */}
            {/* <li onClick={() => setOpenDrawer(true)}>
            Cart <span className='count'>{cartData?.length}</span>
          </li> */}
            <li onClick={login}>Log In</li>
          </ul>
        )}
      </div>
      <CartDrawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        cartData={cartData}
        setCartData={setCartData}
        setLoader={setLoader}
        loader={loader}
        onClickOutside={() => setOpenDrawer(false)}
        theme={theme}
      />
    </>
  );
};

export default Header;
