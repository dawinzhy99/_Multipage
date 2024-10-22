import React from 'react'
import Header from './Header/Header'
import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'
import { Outlet } from 'react-router'




function Layout({tab , setTab ,products , cart , setToken}) {
  return (
    <div>
     <Header setToken={setToken}/>
     <Navbar tab={tab} setTab={setTab} products={products} cart={cart} setToken={setToken}/>
     <Outlet/>
     <Footer/>

    </div>
  )
}

export default Layout
