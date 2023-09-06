import { call, put, takeEvery } from "redux-saga/effects";
import {
  DELETE_PRODUCT_FAILED,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  GET_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  POST_PRODUCT_REQUEST,
  POST_USER_FAILED,
  POST_USER_REQUEST,
  POST_USER_SUCCESS,
  PRODUCTDATA_FAILED,
  PRODUCTDATA_REQUEST,
  PRODUCTDATA_SUCCESS,
  PUT_USER_REQUEST,
  SINGLE_PRODUCTDATA_FAILED,
  SINGLE_PRODUCTDATA_REQUEST,
  SINGLE_PRODUCTDATA_SUCCESS,
  // USER_FAILED,
  // USER_REQUEST,
  // USER_SUCCESS,
} from "./action";
import axios from "axios";

const apiUrl = `http://localhost:3001`;

const getUser = async () => {
  const user = await axios.get(`${apiUrl}/signup`).then((res) => res?.data);
  return user;
};

const postUser = async (data: any) => {
  await axios.post(`${apiUrl}/signup`, data);
};

const putUser = async ({ id, data }: any) => {
  await axios.put(`${apiUrl}/signup/${id}`, data);
};

const getProduct = async () => {
  const productsData = await axios
    .get(`${apiUrl}/product`)
    .then((res) => res?.data);
  return productsData;
};

const postProduct = async (data: any) => {
  await axios.post(`${apiUrl}/product`, data);
};

const deleteProduct = async (id: any) => {
  await axios.delete(`${apiUrl}/product/${id}`);
};

const getSingleProduct = async (id: any) => {
  const singleData = await axios
    .get(`${apiUrl}/product/${id}`)
    .then((res) => res?.data);
  return singleData;
};

function* getUserSaga(action: any) {
  try {
    const user = yield call(getUser);
    yield put({ type: GET_USER_SUCCESS, user: user });
  } catch (e: any) {
    yield put({ type: GET_USER_FAILED, error: e.message });
  }
}

function* postUserSaga(action: any) {
  yield call(postUser, action.payload);
  // try {
  //    yield put({type: POST_USER_SUCCESS});
  // } catch (e:any) {
  //    yield put({type: POST_USER_FAILED});
  // }
}

function* putUserSaga(action: any) {
  try {
    yield call(putUser, action.payload);
  } catch (err) {
    console.log(err);
  }
  // try {
  //    yield put({type: POST_USER_SUCCESS});
  // } catch (e:any) {
  //    yield put({type: POST_USER_FAILED});
  // }
}

function* fetchProductSaga(action: any) {
  try {
    const products = yield call(getProduct);
    yield put({ type: PRODUCTDATA_SUCCESS, productData: products });
  } catch (e: any) {
    yield put({ type: PRODUCTDATA_FAILED, error: e.message });
  }
}

function* postProductSaga(action: any) {
  yield call(postProduct, action.payload);
  // try {
  //    yield put({type: PRODUCTDATA_SUCCESS, productData: products});
  // } catch (e:any) {
  //    yield put({type: PRODUCTDATA_FAILED, error: e.message});
  // }
}

function* deleteProductSaga(action: any) {
  try {
    yield call(deleteProduct, action.payload);
    yield put({
      type: DELETE_PRODUCT_SUCCESS,
      deleteId: action.payload,
    });
  } catch (e: any) {
    yield put({ type: DELETE_PRODUCT_FAILED, error: e.message });
  }
}

function* fetchSingleProductSaga(action: any) {
  try {
    const singleProductData = yield call(getSingleProduct, action.payload);
    yield put({
      type: SINGLE_PRODUCTDATA_SUCCESS,
      singleProduct: singleProductData,
    });

    // const getUserSingle = action.payload.user?.find(
    //   (e: any) => e?.userName === localStorage.getItem("user-token")
    // );

    // if (
    //   !getUserSingle?.cart?.map((e: any) => e?.id).includes(action.payload.id)
    // ) {
    //   yield put({
    //     type: PUT_USER_REQUEST,
    //     payload: {
    //       id: getUserSingle?.id,
    //       data: {
    //         ...getUserSingle,
    //         cart: [
    //           ...getUserSingle?.cart,
    //           {
    //             ...singleProductData,
    //             quantity: 1,
    //             userName: localStorage.getItem("user-token"),
    //             count: 1,
    //           },
    //         ],
    //       },
    //     },
    //   });
    // }
  } catch (e: any) {
    yield put({ type: SINGLE_PRODUCTDATA_FAILED, error: e.message });
  }
}

function* productSaga() {
  yield takeEvery(PUT_USER_REQUEST, putUserSaga);
  yield takeEvery(GET_USER_REQUEST, getUserSaga);
  yield takeEvery(POST_USER_REQUEST, postUserSaga);
  yield takeEvery(PRODUCTDATA_REQUEST, fetchProductSaga);
  yield takeEvery(POST_PRODUCT_REQUEST, postProductSaga);
  yield takeEvery(DELETE_PRODUCT_REQUEST, deleteProductSaga);
  yield takeEvery(SINGLE_PRODUCTDATA_REQUEST, fetchSingleProductSaga);
}

export default productSaga;
