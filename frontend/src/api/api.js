// src/api/api.js
export async function fetchProducts() {
    const response = await fetch('/api/products');
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
}

export async function fetchProductById(id) {
    const response = await fetch(`/api/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product details');
    return await response.json();
}