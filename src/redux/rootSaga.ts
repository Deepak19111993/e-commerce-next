import { all, fork } from 'redux-saga/effects'
import productSaga from './userData/productSaga'

export default function* rootSaga() {
  yield all([
    // userSaga(),
    fork(productSaga),
  ])
}