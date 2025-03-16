import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  // Default image if none is provided
  const imageSrc = product.image || 'https://via.placeholder.com/300x300?text=No+Image';
  
  return (
    <div className="product-card">
      <img 
        src={imageSrc} 
        alt={product.name} 
        className="img-fluid mb-3"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
        }}
      />
      <h3 className="h5">{product.name}</h3>
      <p className="text-muted">{product.description}</p>
      <p className="font-weight-bold">₹{product.price}</p>
      <div className="d-flex justify-content-center">
        <Link to={`/product/${product.id}`} className="btn btn-primary mr-2">View Details</Link>
        <button className="btn btn-success">Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductCard; 