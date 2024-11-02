const express = require('express');
const router = express.Router();
const Product = require('../models/Product');


// GET: Retrieve details of a product with reviews
router.get('/:id', async(req, res) => {
    const id = req.params.id;

    try {
        const product = await Product.findById(id).populate('reviews');
        if (!product) {
            return res.status(404).json({ message: "Product doesn't exist!" });
        }
        res.status(200).json(product);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Server error, could not retrieve product." });
    }
});

// POST: Add a new product
router.post('/', async(req, res) => {
    try {
        const { name, brand, image, price, description, reviews } = req.body;

        const newProduct = new Product({ name, brand, image, price, description });

        // Saving reviews separately and add to product
        if (reviews && reviews.length > 0) {
            const savedReviews = await Review.insertMany(reviews);
            newProduct.reviews = savedReviews.map(review => review._id); // Assign review IDs to product
        }

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error, could not add product." });
    }
});

// GET: Retrieve all products
router.get('/', async(req, res) => {
    try {
        const products = await Product.find().populate('reviews');
        res.status(200).json(products);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Server error, could not retrieve products." });
    }
});

// POST: Add a new review to a product
router.post('/:id/review', async(req, res) => {
    const productId = req.params.id;
    const { rating, comment } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found!" });
        }

        product.reviews.push({ rating: Number(rating), comment });
        await product.save();

        res.status(201).json(product);
    } catch (error) {
        console.error("Error adding review: ", error);
        res.status(500).json({ message: "Server error while adding review." });
    }
});


module.exports = router;