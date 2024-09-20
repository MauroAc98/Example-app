
import './styles.css'
import { useState } from 'react'
import Card from '../../components/products/card';
import Input from '../../components/input';
import { useFetch } from '../../hooks/useFetch';
import { API_URLS } from '../../constants/index'
import Loader from '../../components/loader';
import { useNavigate } from 'react-router-dom';
import Slider from '../../components/slider';

function Home() {
  const [active, setActive] = useState(false);
  const [search, setSearch] = useState('');
  const [productFiltered, setProductFiltered] = useState([]);
  const navigate = useNavigate();
  const { data: products, loading: loadingProducts, error: errorProducts } = useFetch(API_URLS.PRODUCTS.url, API_URLS.PRODUCTS.config);
  const { data: categories, loading: loadingCategories, error: errorCategories } = useFetch(API_URLS.CATEGORIES.url, API_URLS.CATEGORIES.config);

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
        <div className='categoriesContainer'>
          {loadingCategories && <Loader />}
          {errorCategories && <h2>{errorCategories}</h2>}
          <Slider>
            {
              categories.map((category) => (
                <div key={category.id} className='categoryContainer'>
                  <p className='categoryName'>{category.name}</p>
                </div>
              ))
            }
          </Slider>
        </div>
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
          {loadingProducts && <Loader />}
          {errorProducts && <h3>{errorProducts}</h3>}
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
