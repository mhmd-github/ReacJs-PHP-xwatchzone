<?php
ob_start();

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Access-Control-Allow-Headers: Content-Type, Authorization');

ini_set('display_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'conn.php';

$response = ['success' => false];




$sql = "SELECT id, name, brand, price, description, color, images, image, order_index FROM watches ORDER BY order_index ASC, id DESC";
$result = $conn->query($sql);
$watches = [];

while ($row = $result->fetch_assoc()) {
    $watches[] = [
        'id' => $row['id'],
        'name' => $row['name'],
        'brand' => $row['brand'],
        'price' => (string)$row['price'],
        'description' => $row['description'], 
        'color' => $row['color'], 
        'images' => $row['images'],
        'image' => $row['image'],
        'order_index' => (int)$row['order_index'] 
    ];
}

$response = ['success' => true, 'watches' => $watches];

$conn->close();

$buffer = ob_get_clean();
if ($buffer) {
    $response = [
        'success' => false,
        'message' => 'Stray output detected: ' . trim($buffer)
    ];
}

echo json_encode($response);
?>