import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './rootReducer';
// import { createWrapper } from 'next-redux-wrapper';

const store = configureStore({
  reducer: rootReducer,
});

export default store;

// // export const wrapper = createWrapper(store, { debug: false });

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
