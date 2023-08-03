'use client';
import Main from '@/components/Main/Main';
import store from '@/redux/store';
// import { wrapper } from '@/redux/store';
import { Provider } from 'react-redux';

export function Home() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default Home;
