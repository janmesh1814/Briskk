import React, { useEffect } from 'react';
import Product from './Products';
import { Link } from 'react-router-dom';
import '../styles/productList.css';
import Navbar from './Navbarr';

const ProductList = ({ products, setProducts }) => {
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/products');

                // Check if the response is OK i.e. status code in the range 200-299
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                // Parse the JSON data from the response
                const data = await response.json();
                console.log('Fetched products:', data); // Check the fetched data
                setProducts(data); // Update the state with the fetched data
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [setProducts]);

    return (
        <>
            <Navbar />
            <div className="product-list">

                <hr />
                <h2>Add new Product</h2>
                <Link to="/newProduct">
                    <button className='add-btn'>New Product</button>
                </Link>
                <hr />
                <h1>Products</h1>
                <div className='products'>
                    {Array.isArray(products) && products.length > 0 ? (
                        products.map((product, index) => (
                            <Product
                                key={index}
                                id={product._id}
                                name={product.name}
                                brand={product.brand}
                                image={product.image}
                                price={product.price}
                            />
                        ))
                    ) : (
                        <p>No products available</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductList;
