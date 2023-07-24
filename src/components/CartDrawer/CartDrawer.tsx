import React from 'react';
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
}: any) => {
  const decrease = async (id: any) => {
    setLoader(true);
    await axios.get(`http://localhost:3001/cart/${id}`).then(async (res) => {
      if (res) {
        await axios.put(`http://localhost:3001/cart/${id}`, {
          ...res?.data,
          quantity: res?.data?.quantity <= 1 ? 1 : res?.data?.quantity - 1,
        });
        setLoader(false);
      }
    });
  };

  const increase = async (id: any) => {
    setLoader(true);
    await axios.get(`http://localhost:3001/cart/${id}`).then(async (res) => {
      if (res) {
        await axios.put(`http://localhost:3001/cart/${id}`, {
          ...res?.data,
          quantity: res?.data?.quantity + 1,
        });
        setLoader(false);
      }
    });
  };

  const handleDelete = async (id: any) => {
    setLoader(true);
    await axios.delete(`http://localhost:3001/cart/${id}`);
    setLoader(false);
  };

  return (
    <div className={`cart-wrapper ${openDrawer ? 'open' : ''}`}>
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
              <div key={item?.id} className='item'>
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
        <button>CheckOut</button>
      </div>
    </div>
  );
};

export default CartDrawer;
