
import './App.css'
import Header from './components/header'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import ProductDetail from './pages/product-detail'
import { CartProvider } from './context/cartContext'
import Cart from './pages/cart'

function App() {

  return (
    <div>
      <CartProvider>
        <Header logo="TDI" />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products/:productId' element={<ProductDetail />}></Route>
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </CartProvider>
    </div>
  )
}

export default App
