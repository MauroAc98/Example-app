/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */

import './App.css'
import Header from './components/header'
import { useEffect, useState } from 'react'
import Card from './components/products/card';
import Input from './components/input';
import Details from './components/products/details';

function App() {
  const [products, setProducts] = useState([]);
  const [active, setActive] = useState(false);
  const [search, setSearch] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [productDetail, setProductDetail] = useState(null);
  const [productFiltered, setProductFiltered] = useState([]);

  const onChange = (event) => {
    const value = event.target.value;
    setSearch(value);
    filterBySearch(value);
  }

  const filterBySearch = (query) => {
    let updateProductList = [...products];
    updateProductList = updateProductList.filter((item) => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    })
    setProductFiltered(updateProductList)
  }

  const onFocus = () => {
    setActive(true);
  }

  const onBlur = () => {
    setActive(false);
  }

  const onShowDetails = (id) => {
    setShowDetails(true);
    const findProduct = products.find((product) => product.id === id);
    setProductDetail(findProduct);
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
        {showDetails ? (
          <>
            <div className='headerDetailContainer'>
              <button onClick={() => setShowDetails(false)} className='backButton'> &#8592; Back</button>
              <h2 className='headerTitleCard'>Product Detail</h2>
            </div>
            <Details {...productDetail} />
          </>
        ) : (
          <>
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
                search.length > 0 ? (
                  productFiltered.map((product) => (
                    <Card {...product} onShowDetails={onShowDetails} />
                  ))
                )
                  : (
                    products.map((product) => (
                      <Card {...product} onShowDetails={onShowDetails} />
                    ))
                  )
              }
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App
