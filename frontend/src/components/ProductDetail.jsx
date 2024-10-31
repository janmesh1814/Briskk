// src/components/ProductDetail.jsx
import React from 'react';

function ProductDetail({ product, onClose }) {
    return (
        <div>
            <h2>{product.name}</h2>
            <p>Brand: {product.brand}</p>
            <p>Price: ${product.price}</p>
            <p>Description: {product.description}</p>
            <button onClick={onClose}>Close</button>
        </div>
    );
}

export default ProductDetail;
