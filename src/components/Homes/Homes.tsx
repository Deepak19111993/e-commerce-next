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

  const [imgName, setImageName] = useState(null);

  const [theme, setTheme] = useState('light');

  const [checkedIn,setCheckedIn] = useState(null);

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

    setImageName(file?.name);
    

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
    setTimeout(() => {
      setAlert(true);
      const time = setTimeout(() => {
        setAlert(false);
      }, 3000);
      return () => {
        clearTimeout(time);
      };
    }, 500);
  };

  const fetchData = async () => {
    await axios
      .get('http://localhost:3001/product')
      .then((res) => setProductData(res?.data));
  };

  useEffect(() => {
    fetchData();
  }, [loader]);

  const handleProductClick = async (id: any) => {
    if (userToken) {
      setLoader(true);
      await axios
        .get(`http://localhost:3001/product/${id}`)
        .then(async (res) => {
          if (res) {
            const singleUserCartData = await axios
              .get('http://localhost:3001/signup')
              .then((res) => res?.data);

            let indexData = singleUserCartData?.filter(
              (e: any) => e?.userName === userToken
            )[0]?.id;

            console.log('indexData', indexData, singleUserCartData);

            const getUserSingle = await axios
              .get(`http://localhost:3001/signup/${indexData}`)
              .then((res) => res?.data);

            if (!getUserSingle?.cart.map((e: any) => e?.id).includes(id)) {
              const cartPut = await axios.put(
                `http://localhost:3001/signup/${indexData}`,
                {
                  ...getUserSingle,
                  cart: [
                    ...getUserSingle.cart,
                    {
                      ...res?.data,
                      quantity: 1,
                      userName: userToken,
                      count: 1,
                    },
                  ],
                }
              );
              setCartData(cartPut?.data?.cart);

              setTimeout(() => {
                setAlert(true);
                const time = setTimeout(() => {
                  setAlert(false);
                }, 3000);
                return () => {
                  clearTimeout(time);
                };
              }, 500);
            }
          }
        });

      setLoader(false);

    } else {
      router.push('/usersignup');
    }
  };

  useEffect(() => {    
    const cartProductData = async () => {
      if(userToken){

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
  }, [loader]);

  console.log('productData', productData, cartData);

  const handleTheme = (e: any) => {
    console.log("handleTheme", e.target.checked);
    setCheckedIn(e.target.checked);
    if(e.target.checked === true){
      setTheme('dark');
    }
    else{
      setTheme('light');
    }
  }

  useEffect(() => {
    const body = document.querySelector('body');
    console.log('body', body);
    if(theme === 'dark'){
      body?.classList.add('dark');
      body?.classList.remove('light');
    }
    else{
      body?.classList.add('light');
      body?.classList.remove('dark');
    }
  },[theme])

  return (
    <>
      {alert && <div className='alert'>Add Successfully!</div>}
      <Header
        cartData={cartData}
        setCartData={setCartData}
        setLoader={setLoader}
        loader={loader}
        handleTheme={handleTheme}
        theme={theme}
        setCheckedIn={setCheckedIn}
        checkedIn = {checkedIn}
      />
      <div className={`wrapper ${theme}`}>
      <form onSubmit={handleSubmit}>
        <div className='block-input'>
          <h2>Add Product</h2>
        </div>
        <div className='block-input'>
          <input
            type='file'
            name='product_img'
            onChange={handleChange}
            value={inputValue?.product_img}
          />
          <div className='upload'>upload</div>
          <div className='img-name'>{imgName}</div>
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
            className={`item ${cartData?.map((e:any) => e?.id).includes(item?.id) ? "added" : ""}`}
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
              {cartData?.map((e:any) => e?.id).includes(item?.id) ? "Added" : "Buy"}
            </button>
          </div>
        ))}
      </div>
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
