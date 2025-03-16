import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { fetchProductsByCategory } from '../services/api';

function Categories() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    const getProductsByCategory = async () => {
      try {
        setLoading(true);
        const data = await fetchProductsByCategory(id);
        setProducts(data.products || []);
        setCategoryName(data.category_name || getCategoryNameById(id));
        setLoading(false);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      }
    };

    getProductsByCategory();
  }, [id]);

  // Function to get category name for test data
  const getCategoryNameById = (categoryId) => {
    const categories = {
      '1': 'Clothing',
      '2': 'Accessories',
      '3': 'Footwear',
      '4': 'Electronics'
    };
    return categories[categoryId] || 'Category';
  };

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
  const dummyProductsByCategory = {
    '1': [ // Clothing
      { id: 1, name: "Classic T-Shirt", description: "A comfortable classic t-shirt for everyday wear", price: 499.00, image: null },
      { id: 2, name: "Slim Fit Jeans", description: "Stylish slim fit jeans for a modern look", price: 1299.00, image: null }
    ],
    '2': [ // Accessories
      { id: 3, name: "Leather Belt", description: "Premium quality leather belt", price: 699.00, image: null },
      { id: 4, name: "Analog Watch", description: "Classic analog watch with leather strap", price: 1999.00, image: null }
    ],
    '3': [ // Footwear
      { id: 5, name: "Running Shoes", description: "Comfortable running shoes for athletes", price: 2499.00, image: null },
      { id: 6, name: "Casual Boots", description: "Stylish casual boots for men", price: 1799.00, image: null }
    ],
    '4': [ // Electronics
      { id: 7, name: "Smartphone Case", description: "Protective case for smartphones", price: 399.00, image: null },
      { id: 8, name: "Wireless Earbuds", description: "High-quality wireless earbuds", price: 1499.00, image: null }
    ]
  };

  const productsToRender = products.length > 0 ? products : (dummyProductsByCategory[id] || []);

  return (
    <div>
      <h1 className="text-center mb-4">{categoryName}</h1>
      
      {productsToRender.length === 0 ? (
        <div className="alert alert-info">
          No products found in this category.
        </div>
      ) : (
        <div className="products-grid">
          {productsToRender.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Categories; 