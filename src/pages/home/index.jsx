
import './styles.css'
import { useState } from 'react'
import Card from '../../components/products/card';
import Input from '../../components/input';
import { useFetch } from '../../hooks/useFetch';
import { API_URLS } from '../../constants/index'
import Loader from '../../components/loader';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [active, setActive] = useState(false);
  const [search, setSearch] = useState('');
  const [productFiltered, setProductFiltered] = useState([]);
  const navigate = useNavigate();

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
    navigate(`/products/${id}`)
  }

  const inputClass = `container ${active ? 'active' : ''}`

  return (
    <div>
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
      </div>
    </div>
  )
}

export default Home
