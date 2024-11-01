require('dotenv').config();

const express = require('express');
const app = express();

const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const productRoutes = require('./routes/product');

var corsOptions = {
    origin: 'http://localhost:5173/',
    methods: "GET, POST, DELETE, PUT, PATCH",
    credentials: true
}
app.use(cors());
const PORT = process.env.PORT || 3000;
app.use(express.json());


MONGO_URL = "mongodb://127.0.0.1:27017/briskk";
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, }).then(() => console.log("MongoDB connected")).catch((err) => console.log(err));

app.use('/products', productRoutes);



app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
})