import React, { useEffect } from 'react'; // Import useEffect
import Product from './Products'; // Ensure the path is correct
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductList = ({ products, setProducts }) => {
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [setProducts]);

    return (
        <div className="product-list">
            <h2>Products</h2>
            <Link to="/newProduct">
                <button>New Product</button>
            </Link>
            <div>
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <Product
                            key={index}
                            name={product.name}
                            brand={product.brand}
                            image={product.imageUrl} // Ensure you are using the correct property
                            price={product.price}
                        />
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </div>
        </div>
    );
};

export default ProductList;
