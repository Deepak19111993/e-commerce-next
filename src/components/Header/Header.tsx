import React, { useEffect, useState } from 'react';
import './Header.scss';
import Image from 'next/image';
import axios from 'axios';

const Header = ({ cartData }: any) => {
  // const [cartData, setCartData] = useState([]);
  // const [cartFlag, setCartFlag] = useState(false);

  //   const cartProductData = async () => {
  //     const cartProduct = await axios.get('http://localhost:3001/cart').then((res) => setCartData(res.data));
  //   };

  console.log('cartData', cartData);

  return (
    <div className='header-wrapper'>
      <Image src='' alt='logo' width={50} height={50} />
      <ul className='right'>
        <li>
          Cart <span className='count'>{cartData.length}</span>
        </li>
      </ul>
    </div>
  );
};

export default Header;
