import React from 'react';
import Homes from '@/components/Homes/Homes';
import Main from '@/components/Main/Main';

const page = ({ theme }: any) => {
  return (
    <Main>
      <Homes theme={theme} />
    </Main>
  );
};

export default page;
