import React from 'react'
import HotDeals from './../components/home/HotDeals';
import ToastMessage from './../components/home/ToastMessage';
import Category from './../components/home/Category';
import Banner from './../components/home/Banner';

function Home(props) {
  return (
    <div>
      <Banner />
      <Category />
      <ToastMessage />
      <HotDeals />

    </div>
  )
}
export default Home