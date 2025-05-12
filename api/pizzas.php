<?php
include 'db.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

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

    if (!isset($data['name'], $data['description'], $data['price'])) {
        echo json_encode(['error' => 'Invalid input data']);
        exit;
    }

    $name = $conn->real_escape_string($data['name']);
    $description = $conn->real_escape_string($data['description']);
    $price = $conn->real_escape_string($data['price']);

    $query = "INSERT INTO pizzas (name, description, price) VALUES ('$name', '$description', '$price')";
    if ($conn->query($query)) {
        echo json_encode(['message' => 'Pizza created successfully']);
    } else {
        echo json_encode(['error' => 'Failed to create pizza', 'details' => $conn->error]);
    }
    exit;
}

if ($method === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['id'], $data['name'], $data['description'], $data['price'])) {
        echo json_encode(['error' => 'Invalid input data']);
        exit;
    }

    $id = $conn->real_escape_string($data['id']);
    $name = $conn->real_escape_string($data['name']);
    $description = $conn->real_escape_string($data['description']);
    $price = $conn->real_escape_string($data['price']);

    $query = "UPDATE pizzas SET name = '$name', description = '$description', price = '$price' WHERE id = $id";
    if ($conn->query($query)) {
        echo json_encode(['message' => 'Pizza updated successfully']);
    } else {
        echo json_encode(['error' => 'Failed to update pizza', 'details' => $conn->error]);
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

    $query = "DELETE FROM pizzas WHERE id = $id";
    if ($conn->query($query)) {
        echo json_encode(['message' => 'Pizza deleted successfully']);
    } else {
        echo json_encode(['error' => 'Failed to delete pizza', 'details' => $conn->error]);
    }
    exit;
}

echo json_encode(['error' => 'Invalid request method']);
http_response_code(405);
?>