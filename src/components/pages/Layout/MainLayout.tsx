import { Outlet } from 'react-router';

import Header from '@/components/Header';

const MainLayout = () => {
  return (

    <>
      <Header />
      <main className='max-w-[960px] mx-auto px-3 grow flex flex-col justify-center'><Outlet /></main>

    </>

  );
};
export default MainLayout;
