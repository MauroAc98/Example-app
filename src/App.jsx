/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */

import './App.css'
import Header from './components/header'
import ItemCount from './components/counter'
import { useEffect, useState } from 'react'
import Card from './components/products/card';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch('https://66eb2ace55ad32cda47be148.mockapi.io/products', {
          method: 'GET',
          header: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    }
    getProduct();
  }, [])


  return (
    <div>
      <Header logo="TDI" />
      <ItemCount />
      <div className='cardContainer'>
        {
          products.map((product) => (
            <Card {...product} />
          ))
        }
      </div>
    </div>
  )
}

export default App
