import './style.css';

// eslint-disable-next-line react/prop-types
const Card = ({ id, image, name, category, description, price, stock, onAddToCart }) => {
    return (
        <div key={id} className='card'>
            <img className='cardImage' src={image} alt={name} />
            <div className='cardContent'>
                <h3 className='cardName'>{name}</h3>
                <p className='cardCategory'>{category}</p>
                <div className='containerDescription'>
                    <p className='cardDescription'>{description}</p>
                </div>
                <p className='cardPrice'>USD{price}</p>
                <p className='cardStock'>{stock} ud.</p>
            </div>
            <div className='cardActions'>
                <button className='cardButton' onClick={() => onAddToCart(id)}>Add to cart</button>
            </div>
        </div>
    )
}

export default Card;