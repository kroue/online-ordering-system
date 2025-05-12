<?php
include 'db.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $result = $conn->query("SELECT * FROM toppings");
    if ($result) {
        $toppings = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($toppings);
    } else {
        echo json_encode(['error' => 'Failed to fetch toppings', 'details' => $conn->error]);
    }
    exit;
}

if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['name'])) {
        echo json_encode(['error' => 'Invalid input data']);
        exit;
    }

    $name = $conn->real_escape_string($data['name']);

    $query = "INSERT INTO toppings (name) VALUES ('$name')";
    if ($conn->query($query)) {
        echo json_encode(['message' => 'Topping created successfully']);
    } else {
        echo json_encode(['error' => 'Failed to create topping', 'details' => $conn->error]);
    }
    exit;
}

if ($method === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['id'], $data['name'])) {
        echo json_encode(['error' => 'Invalid input data']);
        exit;
    }

    $id = $conn->real_escape_string($data['id']);
    $name = $conn->real_escape_string($data['name']);

    $query = "UPDATE toppings SET name = '$name' WHERE id = $id";
    if ($conn->query($query)) {
        echo json_encode(['message' => 'Topping updated successfully']);
    } else {
        echo json_encode(['error' => 'Failed to update topping', 'details' => $conn->error]);
    }
    exit;
}

if ($method === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['id'])) {
        echo json_encode(['error' => 'Invalid input data']);
        exit;
    }

    $id = $conn->real_escape_string($data['id']);

    $query = "DELETE FROM toppings WHERE id = $id";
    if ($conn->query($query)) {
        echo json_encode(['message' => 'Topping deleted successfully']);
    } else {
        echo json_encode(['error' => 'Failed to delete topping', 'details' => $conn->error]);
    }
    exit;
}

echo json_encode(['error' => 'Invalid request method']);
http_response_code(405);
?>