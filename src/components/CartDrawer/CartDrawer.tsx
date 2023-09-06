"use client";
import React, { useEffect, useState, useRef } from "react";
import "./CartDrawer.scss";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { log } from "console";
import { putUserAction } from "@/redux/userData/action";

const CartDrawer = ({
  cartData,
  setCartData,
  openDrawer,
  setOpenDrawer,
  setLoader,
  onClickOutside,
  theme,
}: any) => {
  const { user } = useSelector((state: any) => state?.counterReducer);

  let userToken: any;
  let login_key: any;

  if (typeof window !== "undefined" && window.localStorage) {
    userToken = localStorage.getItem("user-token");
    login_key = localStorage.getItem("login-key");
  }

  const [totalCart, setTotalCart] = useState(0);

  const cartRef = useRef(null);

  const router = useRouter();

  const dispatch = useDispatch();

  const decrease = async (id: any) => {
    const getUserSingle: any = user?.find(
      (e: any) => e?.userName === userToken
    );

    const currentCartItem = getUserSingle?.cart.map((e: any) =>
      e?.id === id
        ? { ...e, quantity: e?.quantity <= 1 ? 1 : e?.quantity - 1 }
        : { ...e }
    );

    dispatch(
      putUserAction({
        id: getUserSingle?.id,
        data: {
          ...getUserSingle,
          cart: currentCartItem,
        },
      })
    );
    setCartData(getUserSingle?.cart);
  };

  const increase = async (id: any) => {
    const getUserSingle: any = user?.find(
      (e: any) => e?.userName === userToken
    );

    const currentCartItems = getUserSingle?.cart.map((e: any) =>
      e?.id === id ? { ...e, quantity: e?.quantity + 1 } : { ...e }
    );

    dispatch(
      putUserAction({
        id: getUserSingle?.id,
        data: {
          ...getUserSingle,
          cart: currentCartItems,
        },
      })
    );
    setCartData(getUserSingle?.cart);
  };

  const handleDelete = (id: any) => {
    const getUserSingle: any = user?.find(
      (e: any) => e?.userName === userToken
    );

    const filteredCartData = getUserSingle?.cart.filter(
      (el: any) => el?.id !== id
    );

    dispatch(
      putUserAction({
        id: getUserSingle?.id,
        data: {
          ...getUserSingle,
          cart: filteredCartData,
        },
      })
    );
    setCartData(filteredCartData);
  };

  const getTotal = () => {
    const total = cartData?.map((e: any, i: any) => {
      const sum = Number(e?.product_price) * Number(e?.quantity);
      return sum;
    });
    let cartTotal = 0;

    total?.forEach((e: any) => {
      cartTotal += e;
    });

    setTotalCart(cartTotal);
  };
  useEffect(() => {
    getTotal();
  }, [cartData, userToken]);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClickOutside]);

  return (
    <div
      className={`cart-wrapper ${theme} ${openDrawer ? "open" : ""}`}
      ref={cartRef}
    >
      <div className="header">
        <h2 className="title">Cart</h2>
        <div className="icon" onClick={() => setOpenDrawer(false)}>
          X
        </div>
      </div>
      <div className="content">
        {cartData?.length > 0 ? (
          <div className="cart-item-wrapper">
            {cartData.map(
              (item: any) =>
                item !== null && (
                  <div key={item?.id} className="item">
                    <Image
                      src={item?.product_img}
                      alt="product-images"
                      width={60}
                      height={60}
                    />
                    <div className="item-content">
                      <h3>{item?.product_title}</h3>
                      <h4>{item?.product_subtitle}</h4>
                      <h5>$ {item?.product_price * item?.quantity}</h5>
                      {item?.quantity && (
                        <div className="quantity">
                          <span onClick={() => decrease(item?.id)}>-</span>
                          {item?.quantity}
                          <span onClick={() => increase(item?.id)}>+</span>
                        </div>
                      )}
                    </div>
                    <div className="btn-wrapper">
                      <button onClick={() => handleDelete(item?.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                )
            )}
          </div>
        ) : (
          "No Data"
        )}
      </div>
      <div className="footer">
        <div className="total">
          <span>Total</span>
          <span>$ {totalCart}</span>
        </div>
        <button onClick={() => router.push("/checkout")}>CheckOut</button>
      </div>
    </div>
  );
};

export default CartDrawer;
