<?php
header("Content-Type: application/json");

$host = "localhost";
$dbuser = "root";
$dbpass = "zDbxSn.8Tr2E*kaW";  
$dbname = "xwatchzone";

$conn = new mysqli($host, $dbuser, $dbpass, $dbname);

if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed"
    ]);
    exit;
}
?>
