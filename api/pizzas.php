<?php
include 'db.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $result = $conn->query("SELECT * FROM pizzas");
    if ($result) {
        $pizzas = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($pizzas);
    } else {
        echo json_encode(['error' => 'Failed to fetch pizzas', 'details' => $conn->error]);
    }
    exit;
}

if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Validate input data
    if (!isset($data['name'], $data['description'], $data['price'], $data['image_url'])) {
        echo json_encode(['error' => 'Invalid input data']);
        exit;
    }

    $name = $data['name'];
    $description = $data['description'];
    $price = $data['price'];
    $image_url = $data['image_url'];

    $stmt = $conn->prepare("INSERT INTO pizzas (name, description, price, image_url) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssds", $name, $description, $price, $image_url);

    if ($stmt->execute()) {
        echo json_encode(['message' => 'Pizza created successfully']);
    } else {
        echo json_encode(['error' => 'Failed to create pizza', 'details' => $stmt->error]);
    }
    exit;
}

echo json_encode(['error' => 'Invalid request method']);
?>