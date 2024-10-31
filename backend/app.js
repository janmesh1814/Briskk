require('dotenv').config();

const express = require('express');
const app = express();

const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const productRoutes = require('./routes/product');

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

MONGO_URL = "mongodb://127.0.0.1:27017/briskk";
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, }).then(() => console.log("MongoDB connected")).catch((err) => console.log(err));

// Serve the React app
app.use(express.static(path.join(__dirname, '../frontend'))); // Serve static files from React

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html')); // Send React index.html for any other route
});

app.use('/products', productRoutes);

app.get('/', (req, res) => {
    res.send("Listings");
})
app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
})