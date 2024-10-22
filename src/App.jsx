import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css'
import Home from './pages/HomePage/Home'
import ToDo from './pages/ToDo/ToDo'
import { HashRouter, Routes , Route} from 'react-router-dom'

import { useEffect, useState } from 'react'
import Layouts from './Layouts/Layouts'
import Component from './pages/Component/Component'
import Calculator from './pages/Calculator/Calculator'
import Products from './pages/Products/Products'
import Cart from './pages/Cart/Cart'
import Animations from './pages/Animations/Animations'
import { fetchProduct } from './data/product'
import Login from './pages/Login/login'


const initPage = 'home'

function App() {

  const [token, setToken] = useState('')
  
  const [tab, setTab] = useState('')
  
  useEffect(() => {
    setTab(initPage)}, []) // First load only


    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])



    useEffect(() => {
      setProducts(fetchProduct())

    } , [])

    useEffect(() => {
      console.log(products)
    }, [products])

    if (token === '') {
      return  <Login setToken={setToken}/>
    } else {

      
      return (
        <div className='app-container'>
      <HashRouter>
        <Routes> 
          <Route element={<Layouts tab={tab} setTab={setTab} products={products} cart={cart} setToken={setToken}/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/todo' element={<ToDo/>}/>
            <Route path='/animations' element={<Animations/>}/>
            <Route path='*' element={<Home/>}/>
            <Route path='/component' element={<Component/>}/>
            <Route path='/calculator' element={<Calculator/>}/>
            <Route path='/products' element={<Products products={products} setCart={setCart} cart={cart}/>}/>
            <Route path='/cart' element={<Cart setCart={setCart} cart={cart}/>}/>
            
          </Route>
       </Routes>
      </HashRouter>
      
      
    </div>
  )
}
}

export default App
