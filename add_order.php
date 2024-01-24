<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "menu";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the item ID from the request
if (isset($_POST['item_id'])) {
    $item_id = $_POST['item_id'];

    // SQL to add item to order list
    $sql = "INSERT INTO order_list (item_id) VALUES (?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $item_id);

    if ($stmt->execute()) {
        echo "Item added to order list successfully";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
} else {

}

$conn->close();
?>
