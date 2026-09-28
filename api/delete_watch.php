<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: DELETE');
require_once 'conn.php';

$id = $_GET['id'] ?? null;

if (!$id) {
    echo json_encode(['success' => false, 'message' => 'ID required']);
    exit;
}


$stmt = $conn->prepare("SELECT image FROM watches WHERE id=?");
$stmt->bind_param("i", $id);
$stmt->execute();
$res = $stmt->get_result();
if ($res->num_rows === 1) {
    $row = $res->fetch_assoc();
    if ($row['image'] && file_exists(__DIR__ . '/' . $row['image'])) {
        unlink(__DIR__ . '/' . $row['image']);
    }
}
$stmt->close();


$stmt = $conn->prepare("DELETE FROM watches WHERE id=?");
$stmt->bind_param("i", $id);
if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to delete']);
}
$stmt->close();
$conn->close();
