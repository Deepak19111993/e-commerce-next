import React, { useEffect, useState , useRef} from 'react';
import './CartDrawer.scss';
import Image from 'next/image';
import axios from 'axios';

const CartDrawer = ({
  cartData,
  setCartData,
  openDrawer,
  setOpenDrawer,
  setLoader,
  loader,
  onClickOutside
}: any) => {

  const userToken = localStorage.getItem('user-token');

  const [totalCart, setTotalCart] = useState(0);

  const cartRef = useRef(null);

  const decrease = async (id: any) => {
    setLoader(true);
    const singleUserCartData = await axios
    .get('http://localhost:3001/signup')
    .then((res) => res?.data);

    let indexData = singleUserCartData?.filter(
      (e: any) => e?.userName === userToken)[0]?.id;

    
    const getUserSingle = await axios
    .get(`http://localhost:3001/signup/${indexData}`)
    .then((res) => res?.data);

    
    console.log('indexData', indexData, singleUserCartData,getUserSingle?.cart.map((e: any) => e?.id === id), id);

     await axios.put(
        `http://localhost:3001/signup/${indexData}`,
        {
          ...getUserSingle,
          cart: 
            // ...getUserSingle?.cart,
            getUserSingle?.cart.map((e: any) => e?.id === id ? {...e, quantity: e?.quantity <= 1 ? 1 : e?.quantity - 1} : {...e})
          
        }
      );
      setLoader(false);
  };

  const increase = async (id: any) => {
    setLoader(true);
    const singleUserCartData = await axios
    .get('http://localhost:3001/signup')
    .then((res) => res?.data);

    let indexData = singleUserCartData?.filter(
      (e: any) => e?.userName === userToken)[0]?.id;

    
    const getUserSingle = await axios
    .get(`http://localhost:3001/signup/${indexData}`)
    .then((res) => res?.data);

    
    console.log('indexData', indexData, singleUserCartData,getUserSingle?.cart.map((e: any) => e?.id === id), id);

     await axios.put(
        `http://localhost:3001/signup/${indexData}`,
        {
          ...getUserSingle,
          cart: 
            // ...getUserSingle?.cart,
            getUserSingle?.cart.map((e: any) => e?.id === id ? {...e, quantity: e?.quantity + 1} : {...e})
          
        }
      );
      setLoader(false);
  };

  const handleDelete = async (id: any) => {
    setLoader(true);
    const singleUserCartData = await axios
    .get('http://localhost:3001/signup')
    .then((res) => res?.data);

    let indexData = singleUserCartData?.filter(
      (e: any) => e?.userName === userToken)[0]?.id;

    
    const getUserSingle = await axios
    .get(`http://localhost:3001/signup/${indexData}`)
    .then((res) => res?.data);

    
    console.log('indexData', indexData, singleUserCartData,getUserSingle?.cart[id]);

     await axios.put(
        `http://localhost:3001/signup/${indexData}`,
        {
          ...getUserSingle,
          cart: getUserSingle?.cart.filter((e:any) => e?.id !== id),
        }
      );
      setLoader(false);
  };

  const getTotal = () => {
      const total = cartData?.map((e:any, i:any) => {
        const sum = Number(e?.product_price) * Number(e?.quantity);
        return sum;
      })
      let cartTotal = 0;

      total.forEach( (e:any) => {
        cartTotal += e;
      })

      setTotalCart(cartTotal);
    }
  useEffect(() => {
    getTotal();
  },[cartData, userToken])

  console.log('cartData==========', cartData);

  useEffect(() => {
    const handleClickOutside = (e:any) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ onClickOutside ]);


  return (
    <div className={`cart-wrapper ${openDrawer ? 'open' : ''}`} ref={cartRef}>
      <div className='header'>
        <h2 className='title'>Cart</h2>
        <div className='icon' onClick={() => setOpenDrawer(false)}>
          X
        </div>
      </div>
      <div className='content'>
        {cartData?.length > 0 ? (
          <div className='cart-item-wrapper'>
            {cartData.map((item: any) => (
              <div key={item?.uuid} className='item'>
                <Image
                  src={item?.product_img}
                  alt='product-images'
                  width={60}
                  height={60}
                />
                <div className='item-content'>
                  <h3>{item?.product_title}</h3>
                  <h4>{item?.product_subtitle}</h4>
                  <h5>$ {item?.product_price * item?.quantity}</h5>
                  {item?.quantity && (
                    <div className='quantity'>
                      <span onClick={() => decrease(item?.id)}>-</span>
                      {item?.quantity}
                      <span onClick={() => increase(item?.id)}>+</span>
                    </div>
                  )}
                </div>
                <div className='btn-wrapper'>
                  <button onClick={() => handleDelete(item?.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          'No Data'
        )}
      </div>
      <div className='footer'>
        <div className="total">
          <span>Total</span>
          <span>$ {totalCart}</span>
        </div>
        <button>CheckOut</button>
      </div>
    </div>
  );
};

export default CartDrawer;
