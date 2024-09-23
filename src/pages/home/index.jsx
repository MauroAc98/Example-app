
import './styles.css'
import { useState } from 'react'
import Card from '../../components/products/card';
// import Input from '../../components/input';
import { useFetch } from '../../hooks/useFetch';
import { API_URLS } from '../../constants/index'
import Loader from '../../components/loader';
import { useNavigate } from 'react-router-dom';
import Slider from '../../components/slider';

function Home() {
  // const [active, setActive] = useState(false);
  const [search, setSearch] = useState('');
  const [productFiltered, setProductFiltered] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [cart, setCart] = useState([])
  const navigate = useNavigate();

  const { data: products, loading: loadingProducts, error: errorProducts } = useFetch(API_URLS.PRODUCTS.url, API_URLS.PRODUCTS.config);
  const { data: categories, loading: loadingCategories, error: errorCategories } = useFetch(API_URLS.CATEGORIES.url, API_URLS.CATEGORIES.config);

  // const onChange = (event) => {
  //   const value = event.target.value;
  //   setSearch(value);
  //   filterBySearch(value);
  // }

  // const filterBySearch = (query) => {
  //   let updateProductList = [...products];
  //   updateProductList = updateProductList.filter((item) => {
  //     return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
  //   })
  //   setProductFiltered(updateProductList)
  // }

  // const onFocus = () => {
  //   setActive(true);
  // }

  // const onBlur = () => {
  //   setActive(false);
  // }

  const onShowDetails = (id) => {
    navigate(`/products/${id}`)
  }


  const onFilter = (name) => {
    setIsFiltered(true)
    const productsByCategory = products.filter((product) => product.category === name);
    setProductFiltered(productsByCategory);
  }

  const onAddToCart = (id) => {
    const item = products.find((product) => product.id === id);
    if (cart?.find((product) => product.id === id)?.quantity === Number(item.stock)) return;
    if (cart?.length === 0) {
      setCart([{ ...item, quantity: 1 }])
    }
    if (cart?.length > 0 && !cart?.find((product) => product.id === id)) {
      setCart([...cart, { ...item, quantity: 1 }])
    }
    if (cart?.length > 0 && cart?.find((product) => product.id === id)) {
      setCart((currentCart) => {
        return currentCart.map((product) => {
          if (product.id === id) {
            return { ...product, quantity: product.quantity + 1 }
          } else {
            return product;
          }
        })
      })
    }
  }

  const onDecreaseCartItem = (id) => {

    if (cart?.find((product) => product.id === id)?.quantity === 1) return;
    if (cart?.length > 0 && cart?.find((product) => product.id === id)) {
      setCart((currentCart) => {
        return currentCart.map((product) => {
          if (product.id === id) {
            return { ...product, quantity: product.quantity - 1 }
          } else {
            return product;
          }
        })
      })
    }
  }

  const onRemoveCartItem = (id) => {
    setCart((currentCart) => {
      return currentCart.filter((product) => product.id !== id)
    })
  }

  const sumTotalCart = cart.reduce((acc, product) => acc + (product.price * product.quantity), 0)


  // const inputClass = `container ${active ? 'active' : ''}`

  return (
    <div>
      <div className='contentContainer'>

        <h2>Cart</h2>
        <div className='cartContainer'>
          {cart.length === 0 && <h3>Cart is empty</h3>}
          {
            cart?.length > 0 && cart.map((product) => (
              <div key={product.id} className='cartItem'>
                <div className='cardImageContainer'>
                  <img className='cardImage' src={product.image} alt={product.name} />
                </div>
                <div className='cartContentContainer'>
                  <p className='cartProductName'>{product.name}</p>
                  <p className='cartPrice'>USD {product.price}</p>
                  <p className='cartQuantity'>qty: {product.quantity}</p>
                  <p className='cartStock'>{product.stock}</p>
                  <div className='cartActions'>
                    <button onClick={() => onAddToCart(product.id)} className='cartButtonAdd'>+</button>
                    <button onClick={() => onDecreaseCartItem(product.id)} className='cartButtonDecrease'>-</button>
                    <button onClick={() => onRemoveCartItem(product.id)} className='cartButtonRemove'>Remove</button>
                  </div>
                </div>
              </div>
            ))
          }
          {
            cart?.length > 0 && <p>Total: USD {sumTotalCart}</p>
          }
        </div>

        <div className='categoriesContainer'>
          {loadingCategories && <Loader />}
          {errorCategories && <h2>{errorCategories}</h2>}
          <Slider>
            <button onClick={() => setIsFiltered(false)} type='button' className='categoryContainer'>
              <p className='categoryName'>All</p>
            </button>
            {
              categories.map((category) => (
                <button onClick={() => onFilter(category.name)} type='button' key={category.id} className='categoryContainer'>
                  <p className='categoryName'>{category.name}</p>
                </button>
              ))
            }
          </Slider>
        </div>
        {/* <div className='inputContainer' >
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
        </div> */}
        <h2 className='headerTitleCard'>Products</h2>
        <div className='cardContainer'>
          {loadingProducts && <Loader />}
          {errorProducts && <h3>{errorProducts}</h3>}
          {search.length > 0 && productFiltered.length === 0 && <h2>Product not fount</h2>}
          {
            isFiltered ? (
              productFiltered.map((product) => (
                <Card key={product.id} {...product} onAddToCart={onAddToCart} onShowDetails={onShowDetails} />
              ))
            )
              : (
                products.map((product) => (
                  <Card key={product.id} {...product} onAddToCart={onAddToCart} onShowDetails={onShowDetails} />
                ))
              )
          }
          {
            isFiltered && productFiltered.length === 0 && <h2>Products not found</h2>
          }
        </div>
      </div>
    </div >
  )
}

export default Home
