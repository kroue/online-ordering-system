<?php
include 'db.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    // Get the JSON input
    $input = json_decode(file_get_contents('php://input'), true);

    // Debugging: Check if input is received
    if (!$input) {
        echo json_encode(['error' => 'No input received']);
        http_response_code(400);
        exit;
    }

    // Validate input
    if (!isset($input['name']) || empty($input['name'])) {
        echo json_encode(['error' => 'Topping name is required']);
        http_response_code(400);
        exit;
    }

    $name = $conn->real_escape_string($input['name']);

    // Debugging: Check the query
    $query = "INSERT INTO toppings (name) VALUES ('$name')";
    if ($conn->query($query)) {
        echo json_encode(['message' => 'Topping created successfully']);
    } else {
        echo json_encode(['error' => 'Failed to create topping', 'details' => $conn->error]);
        http_response_code(500);
    }
    exit;
}

if ($method === 'GET') {
    // Fetch all toppings
    $result = $conn->query("SELECT * FROM toppings");
    if ($result) {
        $toppings = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($toppings);
    } else {
        echo json_encode(['error' => 'Failed to fetch toppings', 'details' => $conn->error]);
    }
    exit;
}

echo json_encode(['error' => 'Invalid request method']);
http_response_code(405);
?>