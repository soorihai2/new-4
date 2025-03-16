<?php
// Set headers for JSON API
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Include database connection
require_once 'config/database.php';

// Get database connection
$conn = getConnection();

// Check if category id is provided
$category_id = isset($_GET['category_id']) ? intval($_GET['category_id']) : null;

// Prepare SQL query
if ($category_id) {
    // Get products by category
    $sql = "SELECT p.id, p.name, p.description, p.price, p.image, p.brand, p.stock, p.featured, p.sku, c.name as category_name 
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            WHERE p.category_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $category_id);
} else {
    // Get all products
    $sql = "SELECT p.id, p.name, p.description, p.price, p.image, p.brand, p.stock, p.featured, p.sku, c.name as category_name 
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id";
    $stmt = $conn->prepare($sql);
}

// Execute query
$stmt->execute();
$result = $stmt->get_result();

// Check if any products were found
if ($result->num_rows > 0) {
    $products = [];
    
    // Fetch all products
    while ($row = $result->fetch_assoc()) {
        $product = [
            'id' => $row['id'],
            'name' => $row['name'],
            'description' => $row['description'],
            'price' => $row['price'],
            'image' => $row['image'],
            'brand' => $row['brand'],
            'stock' => $row['stock'],
            'featured' => (bool)$row['featured'],
            'sku' => $row['sku'],
            'category' => $row['category_name']
        ];
        
        $products[] = $product;
    }
    
    // Return products as JSON
    echo json_encode($products);
} else {
    // No products found
    echo json_encode([]);
}

// Close statement and connection
$stmt->close();
$conn->close();
?> 