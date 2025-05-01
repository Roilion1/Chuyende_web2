import React from 'react'
import HotDeals from './../components/home/HotDeals';
import ToastMessage from './../components/home/ToastMessage';
import Widgets from './../components/home/Widgets';
import Category from './../components/home/Category';

function Home(props) {
  return (
    <div>
      <Category />
      <ToastMessage />
      <HotDeals />
      <Widgets />
    </div>
  )
}
export default Home