import React, { useEffect, useState } from 'react';
import './Header.scss';
import Image from 'next/image';
import axios from 'axios';
import CartDrawer from '../CartDrawer/CartDrawer';
import { useRouter } from 'next/navigation';

const Header = ({ cartData, setCartData, setLoader, loader }: any) => {
  const router = useRouter();

  const [openDrawer, setOpenDrawer] = useState(false);

  const userToken = localStorage.getItem('user-token');

  console.log('cartData', cartData);

  const logout = async () => {
    localStorage.clear();
    // router.push('/home');

    if (window !== undefined) {
      window.location.replace('/home');
    }
  };

  return (
    <>
      <div className='header-wrapper'>
        {/* <Image src='' alt='logo' width={50} height={50} /> */}
        <div className='logo'>Logo</div>
        {userToken && (
          <ul className='right'>
            <li onClick={() => setOpenDrawer(true)}>
              Cart <span className='count'>{cartData?.length}</span>
            </li>
            <li onClick={logout}>Log Out</li>
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
      />
    </>
  );
};

export default Header;
