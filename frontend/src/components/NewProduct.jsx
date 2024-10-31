// src/components/NewProduct.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewProduct = ({ onAddProduct }) => {
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProduct = { name, brand, price, imageUrl };
        try {
            const savedProduct = await axios.post('http://localhost:3000/products', newProduct);
            onAddProduct(savedProduct.data);
            navigate('/');
        } catch (e) {
            console.log("Error in saving new Product " + e);
        }
        onAddProduct(newProduct);
        navigate('/');
    };

    return (
        <div>
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    required
                />
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default NewProduct;
