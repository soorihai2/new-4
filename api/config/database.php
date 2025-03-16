<?php
// Database connection parameters
$host = 'localhost';
$dbname = 'carri_db';
$username = 'admin_1';
$password = 'Admin@2025';

// Create database connection
function getConnection() {
    global $host, $username, $password, $dbname;
    
    $conn = new mysqli($host, $username, $password, $dbname);
    
    // Check connection
    if ($conn->connect_error) {
        $error = [
            'status' => 'error',
            'message' => 'Connection failed: ' . $conn->connect_error
        ];
        header('Content-Type: application/json');
        echo json_encode($error);
        exit();
    }
    
    return $conn;
}
?> 