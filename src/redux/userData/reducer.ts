import {
  GET_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  PRODUCTDATA_FAILED,
  PRODUCTDATA_REQUEST,
  PRODUCTDATA_SUCCESS,
  SINGLE_PRODUCTDATA_FAILED,
  SINGLE_PRODUCTDATA_REQUEST,
  SINGLE_PRODUCTDATA_SUCCESS,
} from "./action";

const initialState = {
  delta: false,
  products: [],
  singleProduct: {},
  user: [],
  loader: false,
  error: "",
};

const counterReducer = (state = initialState, action: any) => {
  console.log(
    "products+delta",
    action,
    state.products,
    state.singleProduct,
    state.user
  );

  switch (action.type) {
    case GET_USER_REQUEST:
      return { ...state, loader: true };
    case GET_USER_SUCCESS:
      return { ...state, loader: false, user: action.user };
    case GET_USER_FAILED:
      return { ...state, loader: false, error: action.error };
    case SINGLE_PRODUCTDATA_REQUEST:
    case PRODUCTDATA_REQUEST:
      return { ...state, loader: true };
    case PRODUCTDATA_SUCCESS:
      return { ...state, loader: false, products: action.productData };
    case PRODUCTDATA_FAILED:
      return { ...state, loader: false, error: action.error };
    case SINGLE_PRODUCTDATA_REQUEST:
      return { ...state, loader: true };
    case SINGLE_PRODUCTDATA_SUCCESS:
      return { ...state, loader: false, singleProduct: action.singleProduct };
    case SINGLE_PRODUCTDATA_FAILED:
      return { ...state, loader: false, error: action.error };
    default:
      return state;
  }
};

export default counterReducer;
