/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */

import './App.css'
import Header from './components/header'
import { useEffect, useState } from 'react'
import Card from './components/products/card';
import Input from './components/input';

function App() {
  const [products, setProducts] = useState([]);
  const [active, setActive] = useState(false);
  const [task, setTask] = useState('');

  const onChange = (event) => {
    const value = event.target.value;
    setTask(value);
  }

  const onFocus = () => {
    setActive(true);
  }

  const onBlur = () => {
    setActive(false);
  }

  const inputClass = `container ${active ? 'active' : ''}`

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
      <div className='contentContainer'>
        <div className='inputContainer' >
          <Input
            placeholder='find a product'
            id='task'
            required={true}
            name='Search'
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            className={inputClass}
          />
        </div>
        <h2 className='headerTitleCard'>Products</h2>
        <div className='cardContainer'>
          {
            products.map((product) => (
              <Card {...product} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default App
