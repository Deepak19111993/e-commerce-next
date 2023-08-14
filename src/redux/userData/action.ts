export const POST_USER_REQUEST = 'POST_USER_REQUEST';
export const POST_USER_SUCCESS = 'POST_USER_SUCCESS';
export const POST_USER_FAILED = 'POST_USER_FAILED';

export const POST_PRODUCT_REQUEST = 'POST_PRODUCT_REQUEST';
export const POST_PRODUCT_SUCCESS = 'POST_PRODUCT_SUCCESS';
export const POST_PRODUCT_FAILED = 'POST_PRODUCT_FAILED';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const PUT_USER_REQUEST = 'PUT_USER_REQUEST';
export const PUT_USER_SUCCESS = 'PUT_USER_SUCCESS';
export const PUT_USER_FAILED = 'PUT_USER_FAILED';

export const PRODUCTDATA_REQUEST = 'PRODUCTDATA_REQUEST';
export const PRODUCTDATA_SUCCESS = 'PRODUCTDATA_SUCCESS';
export const PRODUCTDATA_FAILED = 'PRODUCTDATA_FAILED';

export const SINGLE_PRODUCTDATA_REQUEST = 'SINGLE_PRODUCTDATA_REQUEST';
export const SINGLE_PRODUCTDATA_SUCCESS = 'SINGLE_PRODUCTDATA_SUCCESS';
export const SINGLE_PRODUCTDATA_FAILED = 'SINGLE_PRODUCTDATA_FAILED';

export const getUserAction = () => ({
  type: GET_USER_REQUEST,
  // payload,
});

export const postUserAction = (payload: any) => ({
  type: POST_USER_REQUEST,
  payload,
});

export const putUserAction = (payload: any) => ({
  type: PUT_USER_REQUEST,
  payload,
});


export const productDataAction = () => ({
  type: PRODUCTDATA_REQUEST,
  // payload,
});

export const postProductAction = (payload: any) => ({
  type: POST_PRODUCT_REQUEST,
  payload,
});

export const singleProductDataAction = (payload: any) => ({
  type: SINGLE_PRODUCTDATA_REQUEST,
  payload
})

