<?php
include 'db.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $result = $conn->query("SELECT * FROM pizza_sizes");
    if ($result) {
        $sizes = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($sizes);
    } else {
        echo json_encode(['error' => 'Failed to fetch sizes', 'details' => $conn->error]);
    }
    exit;
}

echo json_encode(['error' => 'Invalid request method']);
?>