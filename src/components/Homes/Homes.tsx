'use client';
import React, { useEffect, useState } from 'react';
import './Homes.scss';
import axios from 'axios';
import Image from 'next/image';
import Header from '../Header/Header';

const Homes = () => {
  const [fileInput, setFileInput] = useState<any>('');
  const [inputValue, setInputValue] = useState<any>({
    product_img: fileInput,
    product_title: '',
    product_subtitle: '',
  });

  const [productData, setProductData] = useState([]);

  const [cartData, setCartData] = useState([]);

  const [cartFlag, setCartFlag] = useState(false);

  const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleChange = async (e: any) => {
    console.log('product', e);

    setInputValue({ ...inputValue, [e.target.name]: e.target.value });

    const file = e.target.files[0];

    const base64 = await convertBase64(file);

    setFileInput(base64);
  };

  const postProduct = async (singleData: any) => {
    await axios.post('http://localhost:3001/product', singleData);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setInputValue({ ...inputValue, file: fileInput });
    postProduct({
      ...inputValue,
      product_img: fileInput,
    });
    setTimeout(() => {
      fetchData();
    }, 1000);
    setInputValue({
      product_img: '',
      product_title: '',
      product_subtitle: '',
    });
  };

  const fetchData = async () => {
    const data = await axios.get('http://localhost:3001/product');
    setProductData(data.data);
    console.log('data', data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleProductClick = async (id: any) => {
    setCartFlag(false);
    await axios
      .get(`http://localhost:3001/product/${id}`)
      .then(
        async (res) => await axios.post('http://localhost:3001/cart', res.data)
      )
      .then((res) => {
        if (res) {
          setCartFlag(true);
        }
      });

    // await axios.post('http://localhost:3001/cart', singleProduct.data);
  };

  useEffect(() => {
    const cartProductData = async () => {
      const cartProduct = await axios
        .get('http://localhost:3001/cart')
        .then((res) => {
          setCartData(res.data);
        });
    };

    cartProductData();
  }, [cartFlag]);

  return (
    <>
      <Header cartData={cartData} />
      <form onSubmit={handleSubmit}>
        <div className='block-input'>
          <input
            type='file'
            name='product_img'
            onChange={handleChange}
            value={inputValue?.product_img}
          />
        </div>
        <div className='block-input'>
          <input
            type='text'
            name='product_title'
            placeholder='Product Title'
            onChange={handleChange}
            value={inputValue?.product_title}
          />
        </div>
        <div className='block-input'>
          <input
            type='text'
            name='product_subtitle'
            placeholder='Product Sub Title'
            onChange={handleChange}
            value={inputValue?.product_subtitle}
          />
        </div>
        <div className='block-input'>
          <button type='submit'>Submit</button>
        </div>
      </form>
      <div className='product-wrapper'>
        {productData.map((item: any) => (
          <div key={item?.id} className='item'>
            <Image
              src={item?.product_img}
              width={250}
              height={250}
              alt='images'
            />
            <div className='title'>{item?.product_title}</div>
            <div className='sub-title'>{item?.product_subtitle}</div>
            <button onClick={() => handleProductClick(item?.id)}>Buy</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Homes;

// export const getServerSideProps = async () => {
//   // const res = await fetch('http://localhost:3001/posts');

//   // const data = await res.json();

//   // console.log('sbvcbhb', data);

//   return {
//     props: {
//       data: 'messagesed',
//     },
//   };
// };
