"use client";
import React, { use, useEffect, useMemo, useState } from "react";
import "./Homes.scss";
import axios from "axios";
import Image from "next/image";
// import { usePathname, useRouter } from 'next/navigation';
import {
  getUserAction,
  postProductAction,
  postUserAction,
  productDataAction,
  putUserAction,
  singleProductDataAction,
} from "@/redux/userData/action";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { log } from "console";
// import { rootState } from '@/redux/store';
// import { RootState } from '@/redux/store';

const Homes = ({ theme, checkedIn }: any) => {
  const router = useRouter();

  const { loader, products, user, singleProduct } = useSelector(
    (state: any) => state?.counterReducer
  );

  const [users, setUsers] = useState<any[]>([]);

  const dispatch = useDispatch();

  const routerPath = usePathname();

  const adminUrl = routerPath?.split("/").at(1);

  const [fileInput, setFileInput] = useState<any>("");
  const [inputValue, setInputValue] = useState<any>({
    product_img: fileInput,
    product_title: "",
    product_subtitle: "",
    product_price: "",
    category: "",
  });

  const [product, setProduct] = useState<any>([]);

  const [productId, setProductId] = useState(null);

  const [singleProducts, setSingleProducts] = useState({});

  const [cartData, setCartData] = useState([]);

  // const [loader, setLoader] = useState(false);

  const [alert, setAlert] = useState(false);

  const [imgName, setImageName] = useState(null);

  // const [theme, setTheme] = useState('light');

  // const [checkedIn, setCheckedIn] = useState(null);

  const [clicked, setClicked] = useState(false);

  let userToken: any;
  let login_key: any;

  if (typeof window !== "undefined" && window.localStorage) {
    userToken = localStorage.getItem("user-token");
    login_key = localStorage.getItem("login-key");
  }

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
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });

    const file = e.target.files[0];

    const base64 = await convertBase64(file);

    setImageName(file?.name);

    setFileInput(base64);
  };

  const postProduct = async (singleData: any) => {
    dispatch(postProductAction(singleData));
    // await axios.post("http://localhost:3001/product", singleData);
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
      dispatch(productDataAction());
    }, 1000);
    setInputValue({
      product_img: setImageName(null),
      product_title: "",
      product_subtitle: "",
      product_price: "",
      category: "",
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

  const cartProductData = (users: any[]) => {
    const getUserSingle: any = users?.find(
      (e: any) => e?.userName === userToken
    );

    setCartData(getUserSingle?.cart);
  };

  const handleProductClick = (id: any) => {
    setClicked(true);
    setProductId(id);
    dispatch(singleProductDataAction(id));
    setClicked(false);
  };

  useEffect(() => {
    // setProduct([...products]);
    dispatch(getUserAction());
    dispatch(productDataAction());
    setUsers([...user]);
  }, []);

  useEffect(() => {
    // setProduct(products);
    cartProductData(user);
    setSingleProducts(singleProduct);
  }, [user, productId]);

  // const handleDeleteProduct = async (id: any) => {
  //   await axios.delete(`http://localhost:3001/product/${id}`);
  //   const deletedProduct = products?.map((e: any) => e?.id !== id);
  //   setProduct(deletedProduct);
  //   dispatch(deltaAction(!delta));
  // };

  useEffect(() => {
    const afterloginRoute = async () => {
      if (login_key === "admin") {
        router.replace("/admin");
      } else {
        if (login_key === "user") {
          router.replace("/home");
        }
      }
    };
    afterloginRoute();
  }, [login_key, userToken]);

  useEffect(() => {
    console.log("productId", productId);

    if (userToken) {
      const getUserSingle: any = users?.find(
        (e: any) => e?.userName === userToken
      );

      console.log("getUserSingle", getUserSingle, users);

      if (getUserSingle) {
        console.log("getUserSingle=-=-=-", getUserSingle, users);
        let cartDataLatest: any = [];

        if (getUserSingle.cart) {
          // Spread the existing cart items
          cartDataLatest = [...getUserSingle.cart];
        }

        // Add the new item to cartData
        cartDataLatest.push({
          ...singleProducts,
          quantity: 1,
          userName: userToken,
          count: 1,
        });

        if (!cartDataLatest.map((e: any) => e?.id).includes(productId)) {
          dispatch(
            putUserAction({
              id: getUserSingle.id,
              data: {
                ...getUserSingle,
                cart: cartDataLatest,
              },
            })
          );

          setCartData(cartDataLatest);

          setTimeout(() => {
            setAlert(true);
            const time = setTimeout(() => {
              setAlert(false);
            }, 3000);

            clearTimeout(time);
          }, 500);
        }
      }
    } else {
      router.push("/usersignup");
    }
  }, [productId, clicked]);

  console.log(
    "productData=================== >>>>>>",
    products,
    singleProduct,
    users,
    cartData
  );

  return (
    <>
      {alert && <div className="alert">Add Successfully!</div>}
      <div className={`wrapper ${theme}`}>
        {userToken && adminUrl === "admin" && (
          <form onSubmit={handleSubmit}>
            <div className="block-input">
              <h2>Add Product</h2>
            </div>
            <div className="block-input">
              <select
                name="category"
                defaultValue="select"
                onChange={handleChange}
                value={inputValue?.category}
              >
                <option value="select">select</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="electronic">Electronics</option>
                <option value="toy">Toys</option>
              </select>
            </div>
            <div className="block-input">
              <input
                type="file"
                name="product_img"
                onChange={handleChange}
                value={inputValue?.product_img}
              />
              <div className="upload">upload</div>
              <div className="img-name">{imgName}</div>
            </div>
            <div className="block-input">
              <input
                type="text"
                name="product_title"
                placeholder="Product Title"
                onChange={handleChange}
                value={inputValue?.product_title}
              />
            </div>
            <div className="block-input">
              <input
                type="text"
                name="product_subtitle"
                placeholder="Product Sub Title"
                onChange={handleChange}
                value={inputValue?.product_subtitle}
              />
            </div>
            <div className="block-input">
              <input
                type="number"
                name="product_price"
                placeholder="Product Price"
                onChange={handleChange}
                value={inputValue?.product_price}
              />
            </div>
            <div className="block-input">
              <button type="submit">Submit</button>
            </div>
          </form>
        )}

        <div className="product-wrapper">
          {loader
            ? "Loader"
            : products?.map((item: any) => (
                <div
                  key={item?.id}
                  className={`item ${
                    cartData?.map((e: any) => e?.id).includes(item?.id)
                      ? "added"
                      : ""
                  }`}
                >
                  <Image
                    src={item?.product_img}
                    width={250}
                    height={250}
                    alt="images"
                  />
                  <div className="title">{item?.product_title}</div>
                  <div className="sub-title">{item?.product_subtitle}</div>
                  {item?.product_price && (
                    <div className="price">$ {item?.product_price}</div>
                  )}
                  {userToken && adminUrl !== "admin" && (
                    <button onClick={() => handleProductClick(item?.id)}>
                      {cartData?.map((e: any) => e?.id).includes(item?.id)
                        ? "Added"
                        : "Buy"}
                    </button>
                  )}
                  {adminUrl === "admin" && (
                    <div className="overlay">
                      <button
                      // onClick={() => handleDeleteProduct(item?.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default Homes;
