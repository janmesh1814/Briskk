// src/components/NewProduct.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NewProduct.css';
import Navbar from './Navbarr';

const NewProduct = ({ onAddProduct }) => {
    const [product, setProduct] = useState({
        name: '',
        brand: '',
        price: '',
        image: '',
        description: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/products', {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(product)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const savedProduct = await response.json();
            onAddProduct(savedProduct);
            navigate('/');
        } catch (error) {
            console.log("Error in saving new Product: ", error);
        }
    };

    return (
        <div className='newProduct'>
            <Navbar />
            <hr />
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit} className='form'>
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={product.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="brand"
                    placeholder="Brand Name"
                    value={product.brand}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price in INR"
                    value={product.price}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={product.image}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Product Description"
                    value={product.description}
                    onChange={handleChange}
                    required
                />
                <button className='btn' type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default NewProduct;
