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

  const [productData, setProductData] = useState<any>([]);

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
      count: 0,
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
    await axios
      .get('http://localhost:3001/product')
      .then((res) => setProductData(res?.data));
  };

  const afterLogoutProductData = async () => {
    if (!userToken) {
      await axios.get('http://localhost:3001/product').then(async (res) =>
        res?.data?.map(
          async (e: any) =>
            await axios.put(`http://localhost:3001/product/${e?.id}`, {
              ...e,
              count: 0,
            })
        )
      );
    } else {
      if (cartData?.length) {
        const product_data = await axios
          .get(`http://localhost:3001/product`)
          .then((res) => res?.data);
        const cart_data = await axios
          .get(`http://localhost:3001/cart`)
          .then((res) =>
            res?.data.filter((e: any) => e?.userName === userToken)
          );
        const new_data = product_data?.map((e: any) =>
          cart_data?.map((e: any) => e?.id)?.includes(e?.id)
            ? { ...e, count: 1 }
            : { ...e, count: 0 }
        );
        setProductData(new_data);
        console.log('new_data', new_data, cart_data);
      }
    }
  };

  useEffect(() => {
    afterLogoutProductData();
  }, [loader, userToken, cartData]);

  useEffect(() => {
    fetchData();
  }, [loader]);

  console.log('userToken', userToken);

  const handleProductClick = async (id: any) => {
    if (userToken) {
      setLoader(true);
      await axios
        .get(`http://localhost:3001/product/${id}`)
        .then(async (res) => {
          if (res) {
            await axios.post('http://localhost:3001/cart', {
              ...res.data,
              quantity: 1,
              userName: userToken,
            });

            await axios.put(`http://localhost:3001/product/${id}`, {
              ...res?.data,
              count: 1,
            });
          }
        });
      setLoader(false);

      setTimeout(() => {
        setAlert(true);
        const time = setTimeout(() => {
          setAlert(false);
        }, 5000);
        return () => {
          clearTimeout(time);
        };
      }, 500);
    } else {
      router.push('/usersignup');
    }
  };

  useEffect(() => {
    const cartProductData = async () => {
      await axios.get('http://localhost:3001/cart').then((res) => {
        if (res) {
          const newCart = res?.data?.filter(
            (e: any) => e?.userName === userToken
          );
          setCartData(newCart);
        }
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
          <div
            key={item?.id}
            className={`item ${item?.count === 1 && userToken ? 'added' : ''}`}
          >
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
            <button onClick={() => handleProductClick(item?.id)}>
              {item?.count === 1 && userToken ? 'Added' : 'Buy'}
            </button>
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
