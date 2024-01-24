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

// SQL to fetch items from the order list
$sql = "SELECT sm.food_name, sm.price FROM order_list ol JOIN seasonal_menu sm ON ol.item_id = sm.id";
$result = $conn->query($sql);

$order_items = array();

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        $order_items[] = $row;
    }
    echo json_encode($order_items);
} else {
    echo "0 results";
}

$conn->close();
?>
