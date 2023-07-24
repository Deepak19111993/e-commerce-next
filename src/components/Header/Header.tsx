import React, { useEffect, useState } from 'react';
import './Header.scss';
import Image from 'next/image';
import axios from 'axios';
import CartDrawer from '../CartDrawer/CartDrawer';

const Header = ({ cartData, setCartData, setLoader, loader }: any) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  console.log('cartData', cartData);

  return (
    <>
      <div className='header-wrapper'>
        {/* <Image src='' alt='logo' width={50} height={50} /> */}
        <div className='logo'>Logo</div>
        <ul className='right'>
          <li onClick={() => setOpenDrawer(true)}>
            Cart <span className='count'>{cartData.length}</span>
          </li>
        </ul>
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
