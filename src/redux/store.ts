import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './rootReducer';
// import { createWrapper } from 'next-redux-wrapper';

const store = configureStore({
  reducer: rootReducer,
});

export default store;

// // export const wrapper = createWrapper(store, { debug: false });

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;

// new

// import { legacy_createStore as createStore, applyMiddleware } from 'redux';
// // import { composeWithDevTools } from 'redux-devtools-extension';
// import { createWrapper } from 'next-redux-wrapper';
// import rootReducer from './rootReducer';

// export const makeStore = () => {
//   // 2: Add an extra parameter for applying middleware
//   const store = createStore(rootReducer); // 3: Run your sagas on server // store.sagaTask = sagaMiddleware.run(rootSaga); // 4: now return the store

//   return store;
// };

// export const wrapper = createWrapper(makeStore, { debug: false });

// import { configureStore } from '@reduxjs/toolkit';
// // import { cartSlice } from "./cartSlice";
// import { createWrapper } from 'next-redux-wrapper';
// import rootReducer from './rootReducer';

// const makeStore = () =>
//   configureStore({
//     reducer: rootReducer,
//     devTools: true,
//   });

// export type rootStore = ReturnType<typeof makeStore>;
// export type rootState = ReturnType<rootStore['getState']>;
// export const wrapper = createWrapper<rootStore>(makeStore);
