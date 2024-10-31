function Product({ image, name, brand, price }) {
    return (
        <>
            <img src={image} alt={name} className="Product-image" />
            <h3>{name} - {brand}</h3>
            <h4>{price}$</h4>
        </>
    );
}

export default Product;