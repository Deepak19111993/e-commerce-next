"use client";
import React, { useEffect, useState } from "react";
import "./Header.scss";
// import Image from 'next/image';
import axios from "axios";
import CartDrawer from "../CartDrawer/CartDrawer";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const Header = ({
  cartData,
  setCartData,
  setLoader,
  loader,
  handleTheme,
  theme,
  setCheckedIn,
  checkedIn,
}: any) => {
  const router = useRouter();

  const delta = useSelector((state: any) => state?.counterReducer);

  const [openDrawer, setOpenDrawer] = useState(false);

  let userToken: any;
  let login_key: any;

  if (typeof window !== "undefined" && window.localStorage) {
    userToken = localStorage.getItem("user-token");
    login_key = localStorage.getItem("login-key");
  }

  const logout = async () => {
    // setLoader(true);
    localStorage.clear();
    // router.push('/home');

    if (window !== undefined) {
      window.location.replace("/home");
    }
    // setLoader(false);
  };

  const login = () => {
    router.push("/login");
  };

  const cartProductData = async () => {
    if (userToken) {
      const productDataE = await axios
        .get(`http://localhost:3001/product`)
        .then((res) => res.data);

      const singleUserCartData = await axios
        .get("http://localhost:3001/signup")
        .then((res) => res?.data);

      let indexData = singleUserCartData?.filter(
        (e: any) => e?.userName === userToken
      )[0]?.id;

      const productId = productDataE?.map((e: any) => e?.id);

      const getUserSingle = await axios
        .get(`http://localhost:3001/signup/${indexData}`)
        .then((res) => res?.data);

      await axios.put(`http://localhost:3001/signup/${indexData}`, {
        ...getUserSingle,
        cart: getUserSingle?.cart.filter((e: any) => productId.includes(e?.id)),
      });

      await axios
        .get(`http://localhost:3001/signup/${indexData}`)
        .then((res) => {
          if (res) {
            setCartData(res?.data?.cart);
          }
        });
    }
  };

  useEffect(() => {
    cartProductData();
  }, [loader, userToken, delta]);

  useEffect(() => {
    cartProductData();
  }, []);

  return (
    <>
      <div className={`header-wrapper ${theme}`}>
        {/* <Image src='' alt='logo' width={50} height={50} /> */}
        <div className="logo">Logo</div>
        {userToken && login_key === "user" && (
          <div className="search-box">
            <input placeholder="Search Product" />
            <button>Search</button>
          </div>
        )}
        {userToken ? (
          <ul className="right">
            <li className="switcher">
              {theme === "dark" ? <span>Dark</span> : <span>Light</span>}
              <input
                type="checkbox"
                value={theme}
                id="check"
                onChange={handleTheme}
              />
              <label htmlFor="check">
                <div className="switch"></div>
              </label>
            </li>
            <li>
              {login_key === "user" ? "User:" : "Admin:"} {userToken}
            </li>
            {login_key === "user" && (
              <li onClick={() => setOpenDrawer(true)}>
                Cart <span className="count">{cartData.length}</span>
              </li>
            )}
            <li onClick={logout}>Log Out</li>
          </ul>
        ) : (
          <ul className="right">
            <li onClick={login}>Log In</li>
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
        onClickOutside={() => setOpenDrawer(false)}
        theme={theme}
      />
    </>
  );
};

export default Header;
