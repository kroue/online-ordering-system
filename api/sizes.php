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
    $result = $conn->query("SELECT * FROM pizza_sizes");
    if ($result) {
        $sizes = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($sizes);
    } else {
        echo json_encode(['error' => 'Failed to fetch sizes', 'details' => $conn->error]);
    }
    exit;
}

if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['size_type'])) {
        echo json_encode(['error' => 'Invalid input data']);
        exit;
    }

    $size_type = $conn->real_escape_string($data['size_type']);

    $query = "INSERT INTO pizza_sizes (size_type) VALUES ('$size_type')";
    if ($conn->query($query)) {
        echo json_encode(['message' => 'Size created successfully']);
    } else {
        echo json_encode(['error' => 'Failed to create size', 'details' => $conn->error]);
    }
    exit;
}

if ($method === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['id'], $data['size_type'])) {
        echo json_encode(['error' => 'Invalid input data']);
        exit;
    }

    $id = $conn->real_escape_string($data['id']);
    $size_type = $conn->real_escape_string($data['size_type']);

    $query = "UPDATE pizza_sizes SET size_type = '$size_type' WHERE id = $id";
    if ($conn->query($query)) {
        echo json_encode(['message' => 'Size updated successfully']);
    } else {
        echo json_encode(['error' => 'Failed to update size', 'details' => $conn->error]);
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

    $query = "DELETE FROM pizza_sizes WHERE id = $id";
    if ($conn->query($query)) {
        echo json_encode(['message' => 'Size deleted successfully']);
    } else {
        echo json_encode(['error' => 'Failed to delete size', 'details' => $conn->error]);
    }
    exit;
}

echo json_encode(['error' => 'Invalid request method']);
http_response_code(405);
?>