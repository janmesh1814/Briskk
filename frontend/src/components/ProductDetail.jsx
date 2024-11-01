import React, { useEffect, useState } from 'react';
import Navbar from './Navbarr';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ProductDetail.css';

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [newReview, setNewReview] = useState({ rating: '', comment: '' }); // State for the new review

    // Fetch product details
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3000/products/${id}`);
                if (!response.ok) throw new Error('Product not found');
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
                navigate('/');
            }
        };

        fetchProduct();
    }, [id, navigate]);

    // Handle input change for new review
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReview((prevReview) => ({
            ...prevReview,
            [name]: value
        }));
    };

    // Handle review form submission
    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/products/${id}/review`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newReview)
            });

            if (!response.ok) throw new Error('Failed to add review');
            const updatedProduct = await response.json();
            setProduct(updatedProduct); // Update the product with the new review
            setNewReview({ rating: '', comment: '' }); // Reset the form
        } catch (error) {
            console.error('Error adding review:', error);
        }
    };

    if (!product) return <p>Loading...</p>;

    return (
        <div>
            <Navbar />
            <img src={product.image} alt={product.name} className="Product-image" />
            <div className='details'>
                <h2>{product.name}</h2>
                <p>Brand: {product.brand}</p>
                <p>Price: {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(product.price)}</p>
                <p>Description: {product.description}</p>

                <h3>Reviews:</h3>
                <ul>
                    {product.reviews && product.reviews.length > 0 ? (
                        product.reviews.map((review, index) => (
                            <li key={index}>
                                <strong>Rating:</strong> {review.rating} <br />
                                <strong>Comment:</strong> {review.comment}
                            </li>
                        ))
                    ) : (
                        <p>No reviews yet.</p>
                    )}
                </ul>
                <br />
                <button className='close-btn' onClick={() => navigate('/')}>Close</button>
            </div>
            <hr style={{ margin: "30px 80px 0 80px" }} />
            <h2 style={{ marginLeft: "160px" }}>Add Review</h2>
            <form onSubmit={handleReviewSubmit} className="review-form">
                <input
                    type="number"
                    name="rating"
                    placeholder="Rating (1-5)"
                    value={newReview.rating}
                    onChange={handleInputChange}
                    required
                    min="1"
                    max="5"
                />
                <textarea
                    name="comment"
                    placeholder="Comment"
                    value={newReview.comment}
                    onChange={handleInputChange}
                    required
                />
                <button className='btn' type="submit">Submit Review</button>
            </form>
        </div>
    );
}

export default ProductDetail;
