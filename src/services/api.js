import axios from 'axios';

// Base URL for API requests
const API_URL = '/api';

// Configure axios
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// API functions
export const fetchProducts = async () => {
  try {
    const response = await apiClient.get('/products.php');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await apiClient.get(`/product.php?id=${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};

export const fetchProductsByCategory = async (categoryId) => {
  try {
    const response = await apiClient.get(`/products.php?category_id=${categoryId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching products for category ${categoryId}:`, error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await apiClient.get('/categories.php');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}; 