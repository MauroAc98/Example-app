
import './styles.css'
import { useState } from 'react'
import Card from '../../components/products/card';
import Input from '../../components/input';
import Details from '../../components/products/details';
import { useFetch } from '../../hooks/useFetch';
import { API_URLS } from '../../constants/index'
import Loader from '../../components/loader';

function Home() {
  const [active, setActive] = useState(false);
  const [search, setSearch] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [productDetail, setProductDetail] = useState(null);
  const [productFiltered, setProductFiltered] = useState([]);

  const { data: products, loading, error } = useFetch(API_URLS.PRODUCTS.url, API_URLS.PRODUCTS.config);

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


  return (
    <div>
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
              {loading && <Loader />}
              {error && <h3>{error}</h3>}
              {search.length > 0 && productFiltered.length === 0 && <h2>Product not fount</h2>}
              {
                search.length > 0 ? (
                  productFiltered.map((product) => (
                    <Card key={product.id} {...product} onShowDetails={onShowDetails} />
                  ))
                )
                  : (
                    products.map((product) => (
                      <Card key={product.id} {...product} onShowDetails={onShowDetails} />
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

export default Home
