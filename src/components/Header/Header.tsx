"use client";
import React, { useEffect, useState } from "react";
import "./Header.scss";
// import Image from 'next/image';
import axios from "axios";
import CartDrawer from "../CartDrawer/CartDrawer";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAction,
  productDataAction,
  putUserAction,
} from "@/redux/userData/action";

const Header = ({
  cartData,
  setCartData,
  setLoader,
  handleTheme,
  theme,
  setCheckedIn,
  checkedIn,
}: any) => {
  const router = useRouter();

  const dispatch = useDispatch();

  const { loader, products, user, singleProduct } = useSelector(
    (state: any) => state?.counterReducer
  );

  const [openDrawer, setOpenDrawer] = useState(false);

  const [product, setProduct] = useState([]);

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

  // const cartProductData = () => {
  //   if (userToken) {
  //     const getUserSingle = user?.filter(
  //       (e: any) => e?.userName === userToken
  //     )[0];

  //     // let indexData = user?.filter((e: any) => e?.userName === userToken)[0]
  //     //   ?.id;

  //     const productId = product?.map((e: any) => e?.id);

  //     setCartData(
  //       getUserSingle?.cart.filter((e: any) => productId.includes(e?.id))
  //     );
  //   }
  // };

  useEffect(() => {
    setProduct(products);
    // cartProductData();
  }, [products]);

  // const searchProduct = async (searchText: any) => {
  //   const productSearchData = await axios
  //     .get("http://localhost:3001/product")
  //     .then((res) => res?.data);

  //   const filterData = productSearchData.filter((e: any) =>
  //     e?.product_title.toLowerCase().includes(searchText)
  //   );
  // };

  console.log("header ====> ======>", products, cartData);

  return (
    <>
      <div className={`header-wrapper ${theme}`}>
        {/* <Image src='' alt='logo' width={50} height={50} /> */}
        <div className="logo">Logo</div>
        {userToken && login_key === "user" && (
          <div className="search-box">
            <input
              placeholder="Search Product"
              // onChange={searchProduct}
            />
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
                Cart <span className="count">{cartData?.length}</span>
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
