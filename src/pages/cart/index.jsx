import './styles.css';
import { useContext } from 'react';
import { CartContext } from '../../context/cartContext';

function Cart({ }) {

    const { cart, onAddToCart, onDecreaseItem, onRemoveItem, total } = useContext(CartContext)

    return (
        <div>
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
                                    <button onClick={() => onDecreaseItem(product.id)} className='cartButtonDecrease'>-</button>
                                    <button onClick={() => onRemoveItem(product.id)} className='cartButtonRemove'>Remove</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
                {
                    cart?.length > 0 && <p>Total: USD {total}</p>
                }
            </div>
        </div>
    )
}
export default Cart;