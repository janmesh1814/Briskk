// src/App.jsx
import { useState } from 'react';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import NewProduct from './components/NewProduct';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [products, setProducts] = useState([]);

  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<ProductList products={products} />} /> */}
        <Route path="/" element={<ProductList products={products} setProducts={setProducts} />} />
        <Route path="/newProduct" element={<NewProduct onAddProduct={handleAddProduct} />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
