import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../services/api';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load product details. Please try again later.');
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  // For testing without API
  const dummyProduct = {
    id: parseInt(id),
    name: 'Sample Product ' + id,
    description: 'This is a detailed description of the product. It shows all the information about the product that a customer might want to know before purchasing.',
    price: 999.00,
    image: null,
    stock: 10,
    brand: 'Carri',
    sku: 'SKU-' + id
  };

  const productToRender = product || dummyProduct;

  return (
    <div className="row mt-5">
      <div className="col-md-6">
        <img 
          src={productToRender.image || 'https://via.placeholder.com/500x500?text=No+Image'} 
          alt={productToRender.name} 
          className="img-fluid" 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/500x500?text=No+Image';
          }}
        />
      </div>
      <div className="col-md-6">
        <h1>{productToRender.name}</h1>
        <p className="text-muted">{productToRender.brand}</p>
        <p>{productToRender.description}</p>
        <h3 className="text-primary">₹{productToRender.price}</h3>
        <p>
          <strong>SKU:</strong> {productToRender.sku}<br />
          <strong>Availability:</strong> {productToRender.stock > 0 ? 'In Stock' : 'Out of Stock'}
        </p>
        
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input 
            type="number" 
            id="quantity" 
            className="form-control w-25" 
            min="1" 
            max={productToRender.stock} 
            defaultValue="1" 
          />
        </div>
        
        <button className="btn btn-primary btn-lg mt-3">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetail; 