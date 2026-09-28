<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once "conn.php";

$response = ["success" => false];


$name = $_POST['name'] ?? '';
$brand = $_POST['brand'] ?? '';
$description = $_POST['description'] ?? '';
$color = $_POST['color'] ?? '';
$price = $_POST['price'] ?? '';
$orderIndex = $_POST['order_index'] ?? 999;
$primaryPath = $_POST['primaryImagePath'] ?? '';
$editId = $_POST['id'] ?? null;

if (!$name || !$brand || !$price) {
    echo json_encode(["success" => false, "message" => "Missing required fields"]);
    exit;
}


$existingImages = [];
if (!empty($_POST['existingImagesJson'])) {
    $existingImages = json_decode($_POST['existingImagesJson'], true);
    if (!is_array($existingImages)) $existingImages = [];
}


$uploadedPaths = [];
if (!empty($_FILES['newImages']['name'][0])) {
    $files = $_FILES['newImages'];

    for ($i = 0; $i < count($files['name']); $i++) {
        $filename = uniqid("img_", true) . "_" . basename($files['name'][$i]);
        $target = "uploads/" . $filename;

        if (move_uploaded_file($files['tmp_name'][$i], $target)) {
            $uploadedPaths[] = $target;
        }
    }
}


$allImages = array_merge($existingImages, $uploadedPaths);


if (str_starts_with($primaryPath, "blob:")) {

    $primaryImage = $uploadedPaths[0] ?? ($existingImages[0] ?? "");
} else {
    $primaryImage = $primaryPath;
}


$imagesJson = $conn->real_escape_string(json_encode($allImages));
$name = $conn->real_escape_string($name);
$brand = $conn->real_escape_string($brand);
$description = $conn->real_escape_string($description);
$color = $conn->real_escape_string($color);
$price = $conn->real_escape_string($price);
$primaryImage = $conn->real_escape_string($primaryImage);
$orderIndex = (int)$orderIndex;



if ($editId) {

    $sql = "UPDATE watches SET 
        name='$name',
        brand='$brand',
        price='$price',
        description='$description',
        color='$color',
        image='$primaryImage',
        images='$imagesJson',
        order_index='$orderIndex' 
        WHERE id='$editId'";

    if ($conn->query($sql)) {
        echo json_encode(["success" => true, "message" => "Watch updated successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => $conn->error]);
    }
} else {


    $sql = "INSERT INTO watches (name, brand, price, description, color, image, images, order_index)
            VALUES ('$name', '$brand', '$price', '$description', '$color', '$primaryImage', '$imagesJson', '$orderIndex')";

    if ($conn->query($sql)) {
        echo json_encode([
            "success" => true,
            "message" => "Watch added successfully",
            "watch_id" => $conn->insert_id
        ]);
    } else {
        echo json_encode(["success" => false, "message" => $conn->error]);
    }
}

$conn->close();
?>