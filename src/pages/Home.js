import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/api';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      }
    };

    getProducts();
  }, []);

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
  const dummyProducts = [
    { id: 1, name: "Classic T-Shirt", description: "A comfortable classic t-shirt for everyday wear", price: 499.00, image: null },
    { id: 2, name: "Slim Fit Jeans", description: "Stylish slim fit jeans for a modern look", price: 1299.00, image: null },
    { id: 3, name: "Leather Belt", description: "Premium quality leather belt", price: 699.00, image: null },
    { id: 4, name: "Analog Watch", description: "Classic analog watch with leather strap", price: 1999.00, image: null },
    { id: 5, name: "Running Shoes", description: "Comfortable running shoes for athletes", price: 2499.00, image: null },
    { id: 6, name: "Casual Boots", description: "Stylish casual boots for men", price: 1799.00, image: null },
    { id: 7, name: "Smartphone Case", description: "Protective case for smartphones", price: 399.00, image: null },
    { id: 8, name: "Wireless Earbuds", description: "High-quality wireless earbuds", price: 1499.00, image: null }
  ];

  const productsToRender = products.length > 0 ? products : dummyProducts;

  return (
    <div>
      <div className="jumbotron">
        <h1 className="display-4">Welcome to Carri Shop</h1>
        <p className="lead">Shop the latest trends at affordable prices. Free shipping on orders over ₹1000!</p>
        <hr className="my-4" />
        <p>Explore our wide selection of products from top brands.</p>
        <a className="btn btn-primary btn-lg" href="#products" role="button">Shop Now</a>
      </div>
      
      <section id="featured-products">
        <h2 className="text-center mb-4">Featured Products</h2>
        <div className="products-grid">
          {productsToRender.filter(product => product.featured).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      
      <section id="products" className="mt-5">
        <h2 className="text-center mb-4">All Products</h2>
        <div className="products-grid">
          {productsToRender.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home; 