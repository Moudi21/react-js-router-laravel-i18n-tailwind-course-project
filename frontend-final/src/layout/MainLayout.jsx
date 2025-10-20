import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import {Outlet} from 'react-router';
import TopButton from '../components/TopButton';
import MobileCategories from '../components/MobileCategories';

function MainLayout() {
  return (
    <>
      <NavBar />
      <MobileCategories />
      <Outlet />
      <TopButton />
      <Footer />
    </>
  );
}

export default MainLayout;