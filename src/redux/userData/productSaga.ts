import { call, put, takeEvery } from 'redux-saga/effects'
import { GET_USER_FAILED, GET_USER_REQUEST, GET_USER_SUCCESS, POST_PRODUCT_REQUEST, POST_USER_FAILED, POST_USER_REQUEST, POST_USER_SUCCESS, PRODUCTDATA_FAILED, PRODUCTDATA_REQUEST, PRODUCTDATA_SUCCESS, SINGLE_PRODUCTDATA_FAILED, SINGLE_PRODUCTDATA_REQUEST, SINGLE_PRODUCTDATA_SUCCESS, USER_FAILED, USER_REQUEST, USER_SUCCESS } from './action';
import axios from 'axios';

const apiUrl = `http://localhost:3001`;

const getUser = async() => {
   const user = await axios.get(`${apiUrl}/signup`).then((res) => res?.data);
   return user;
}

const postUser = async(data:any) => {
   await axios.post(`${apiUrl}/signup`, data);
}

const getProduct = async() => {
   const productsData = await axios.get(`${apiUrl}/product`).then((res) => res?.data);
   return productsData;
}

const postProduct = async(data: any) => {
  await axios.post(`${apiUrl}/product`, data);
  
}

const getSingleProduct = async(id:any) => {
   const singleData = await axios.get(`${apiUrl}/product/${id}`).then((res) => res?.data);
   return singleData;
}

function* getUserSaga(action:any) {   
   try {
      const user = yield call(getUser);
      yield put({type: GET_USER_SUCCESS, user: user});
   } catch (e:any) {
      yield put({type: GET_USER_FAILED, error: e.message});
   }
}

function* postUserSaga(action:any) {
   console.log("userPOST", action.payload);
   
   yield call(postUser, action.payload);
   // try {
   //    yield put({type: POST_USER_SUCCESS});
   // } catch (e:any) {
   //    yield put({type: POST_USER_FAILED});
   // }
}

function* fetchProductSaga(action:any) {
   
   try {
      const products = yield call(getProduct);
      yield put({type: PRODUCTDATA_SUCCESS, productData: products});
   } catch (e:any) {
      yield put({type: PRODUCTDATA_FAILED, error: e.message});
   }
}

function* postProductSaga(action:any) {
   
   yield call(postProduct, action.payload);
   // try {
   //    yield put({type: PRODUCTDATA_SUCCESS, productData: products});
   // } catch (e:any) {
   //    yield put({type: PRODUCTDATA_FAILED, error: e.message});
   // }
}

function* fetchSingleProductSaga(action:any) {
   console.log("action.payload",action.payload);
   
   try {
      const singleProductData = yield call(getSingleProduct, action.payload);
      yield put({type: SINGLE_PRODUCTDATA_SUCCESS, singleProduct: singleProductData});
   } catch (e:any) {
      yield put({type: SINGLE_PRODUCTDATA_FAILED, error: e.message});
   }
}

function* productSaga() {
   yield takeEvery(GET_USER_REQUEST, getUserSaga);
   yield takeEvery(POST_USER_REQUEST, postUserSaga);
   yield takeEvery(PRODUCTDATA_REQUEST, fetchProductSaga);
   yield takeEvery(POST_PRODUCT_REQUEST, postProductSaga);
   yield takeEvery(SINGLE_PRODUCTDATA_REQUEST, fetchSingleProductSaga);
}

export default productSaga;