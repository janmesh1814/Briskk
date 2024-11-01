import { Link } from 'react-router-dom';
import '../styles/Product.css';

function Product({ id, image, name, brand, price }) {
    return (
        <div className='Product'>
            <img src={image} alt={name} className="Product-image" />
            <h3>{name} - {brand}</h3>
            <h4>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price)}</h4>

            <Link to={`/products/${id}`}>
                <button className='show-btn'>Show</button>
            </Link>

        </div>
    );
}

export default Product;
