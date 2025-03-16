<?php
// Set headers for JSON API
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Include database connection
require_once 'config/database.php';

// Get database connection
$conn = getConnection();

// Prepare SQL query
$sql = "SELECT id, name, description FROM categories ORDER BY name";
$stmt = $conn->prepare($sql);

// Execute query
$stmt->execute();
$result = $stmt->get_result();

// Check if any categories were found
if ($result->num_rows > 0) {
    $categories = [];
    
    // Fetch all categories
    while ($row = $result->fetch_assoc()) {
        $category = [
            'id' => $row['id'],
            'name' => $row['name'],
            'description' => $row['description']
        ];
        
        $categories[] = $category;
    }
    
    // Return categories as JSON
    echo json_encode($categories);
} else {
    // No categories found
    echo json_encode([]);
}

// Close statement and connection
$stmt->close();
$conn->close();
?> 