<?php  
// Database connection parameters  
$host = 'localhost';  
$dbname = 'carri_db';  
$username = 'admin_1'; // replace with your actual username  
$password = 'Admin@2025'; // replace with your actual password  

// Create connection  
$conn = new mysqli($host, $username, $password, $dbname);  

// Check connection  
if ($conn->connect_error) {  
    die("Connection failed: " . $conn->connect_error);  
}  

// Fetch products from database  
$sql = "SELECT id, name, description, price FROM products";  
$result = $conn->query($sql);  

if ($result) {  
    if ($result->num_rows > 0) {  
        while ($row = $result->fetch_assoc()) {  
            echo "Product ID: " . $row['id'] . " - Name: " . $row['name'] . "<br>";  
        }  
    } else {  
        echo "No products found.";  
    }  
} else {  
    echo "Query error: " . $conn->error;  
}  

$conn->close();  
?>  

<?php  
// Database connection parameters  
$host = 'localhost';  
$dbname = 'carri_db';  
$username = 'admin_1'; // Replace with your database username  
$password = 'Admin@2025'; // Replace with your database password  

// Create connection  
$conn = new mysqli($host, $username, $password, $dbname);  

// Check connection  
if ($conn->connect_error) {  
    die("Connection failed: " . $conn->connect_error);  
}  

// Fetch products from database  
$sql = "SELECT id, name, description, price, image FROM products";  
$result = $conn->query($sql);  
?>  

<!DOCTYPE html>  
<html lang="en">  
<head>  
    <meta charset="UTF-8">  
    <meta name="viewport" content="width=device-width, initial-scale=1.0">  
    <title>Product Cards</title>  
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">  
    <style>  
        .product-card {  
            margin: 20px;  
            border: 1px solid #ddd;  
            border-radius: 5px;  
            padding: 15px;  
            text-align: center;  
        }  
        .product-card img {  
            max-width: 100%;  
            height: auto;  
        }  
    </style>  
</head>  
<body>  
    <div class="container">  
        <h1 class="text-center">Products</h1>  
        <div class="row">  
            <?php  
            if ($result->num_rows > 0) {  
                // Output data of each row  
                while ($row = $result->fetch_assoc()) {  
                    echo '<div class="col-md-4">';  
                        echo '<div class="product-card">';  
                            echo '<img src="' . htmlspecialchars($row['image']) . '" alt="' . htmlspecialchars($row['name']) . '">';  
                            echo '<h2>' . htmlspecialchars($row['name']) . '</h2>';  
                            echo '<p>' . htmlspecialchars($row['description']) . '</p>';  
                            echo '<p>$' . htmlspecialchars($row['price']) . '</p>';  
                            echo '<button class="btn btn-primary">Add to Cart</button>';  
                        echo '</div>';  
                    echo '</div>';  
                }  
            } else {  
                echo '<p>No products found.</p>';  
            }  
            $conn->close();  
            ?>  
        </div>  
    </div>  
</body>  
</html>  
