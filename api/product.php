<?php
// Set headers for JSON API
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Include database connection
require_once 'config/database.php';

// Check if product id is provided
if (!isset($_GET['id'])) {
    $error = [
        'status' => 'error',
        'message' => 'Product ID is required'
    ];
    echo json_encode($error);
    exit();
}

// Get product id
$product_id = intval($_GET['id']);

// Get database connection
$conn = getConnection();

// Prepare SQL query
$sql = "SELECT p.id, p.name, p.description, p.price, p.image, p.brand, p.stock, p.featured, p.sku, c.name as category_name 
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $product_id);

// Execute query
$stmt->execute();
$result = $stmt->get_result();

// Check if product was found
if ($result->num_rows > 0) {
    // Fetch product
    $row = $result->fetch_assoc();
    
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
    
    // Return product as JSON
    echo json_encode($product);
} else {
    // Product not found
    $error = [
        'status' => 'error',
        'message' => 'Product not found'
    ];
    echo json_encode($error);
}

// Close statement and connection
$stmt->close();
$conn->close();
?> 