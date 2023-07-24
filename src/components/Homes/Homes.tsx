'use client';
import React, { useEffect, useState } from 'react';
import './Homes.scss';
import axios from 'axios';
import Image from 'next/image';
import Header from '../Header/Header';
import { useRouter } from 'next/navigation';

const Homes = () => {
  const router = useRouter();

  const [fileInput, setFileInput] = useState<any>('');
  const [inputValue, setInputValue] = useState<any>({
    product_img: fileInput,
    product_title: '',
    product_subtitle: '',
    product_price: '',
  });

  const [productData, setProductData] = useState([]);

  const [cartData, setCartData] = useState([]);

  const [loader, setLoader] = useState(false);

  const [alert, setAlert] = useState(false);

  const userToken = localStorage.getItem('user-token');

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
      product_price: '',
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
    // if (userToken) {
    setLoader(true);
    await axios.get(`http://localhost:3001/product/${id}`).then(async (res) => {
      if (res) {
        await axios.post('http://localhost:3001/cart', {
          ...res.data,
          quantity: 1,
        });

        // if (cartData.map((e: any) => e?.id === id)) {
        //   await axios.post(`http://localhost:3001/product/${id}`, {
        //     ...res?.data,
        //     clicked: 'clicked',
        //   });
        // }

        setLoader(false);
      }
    });
    setTimeout(() => {
      setAlert(true);
      const time = setTimeout(() => {
        setAlert(false);
      }, 5000);
      return () => {
        clearTimeout(time);
      };
    }, 500);
    // } else {
    //   router.push('/userlogin');
    // }
  };

  useEffect(() => {
    const cartProductData = async () => {
      await axios.get('http://localhost:3001/cart').then((res) => {
        setCartData(res.data);
      });
    };

    cartProductData();
  }, [loader]);

  console.log('productData', productData, cartData);

  return (
    <>
      {alert && <div className='alert'>Add Successfully!</div>}
      <Header
        cartData={cartData}
        setCartData={setCartData}
        setLoader={setLoader}
        loader={loader}
      />
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
          <input
            type='number'
            name='product_price'
            placeholder='Product Price'
            onChange={handleChange}
            value={inputValue?.product_price}
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
            {item?.product_price && (
              <div className='price'>$ {item?.product_price}</div>
            )}
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
