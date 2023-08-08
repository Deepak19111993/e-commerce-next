import React from 'react';
import Checkout from '@/components/Checkout/Checkout';
import Main from '@/components/MainComp/MainComp';

const page = ({theme}: any) => {
  return (
    <Main>
      <Checkout />
    </Main>
  );
};

export default page;
