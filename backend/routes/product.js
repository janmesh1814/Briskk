const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// POST: Add a new product
router.post('/', async(req, res) => {
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET: Retrieve all products
router.get('/', async(req, res) => {
    try {
        res.render('../frontend/App.jsx');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;