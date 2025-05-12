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
    $result = $conn->query("SELECT * FROM crusts");
    if ($result) {
        $crusts = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($crusts);
    } else {
        echo json_encode(['error' => 'Failed to fetch crusts', 'details' => $conn->error]);
    }
    exit;
}

if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['type'])) {
        echo json_encode(['error' => 'Invalid input data']);
        exit;
    }

    $type = $conn->real_escape_string($data['type']);

    $query = "INSERT INTO crusts (type) VALUES ('$type')";
    if ($conn->query($query)) {
        echo json_encode(['message' => 'Crust type created successfully']);
    } else {
        echo json_encode(['error' => 'Failed to create crust type', 'details' => $conn->error]);
    }
    exit;
}

if ($method === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['id'], $data['type'])) {
        echo json_encode(['error' => 'Invalid input data']);
        exit;
    }

    $id = $conn->real_escape_string($data['id']);
    $type = $conn->real_escape_string($data['type']);

    $query = "UPDATE crusts SET type = '$type' WHERE id = $id";
    if ($conn->query($query)) {
        echo json_encode(['message' => 'Crust type updated successfully']);
    } else {
        echo json_encode(['error' => 'Failed to update crust type', 'details' => $conn->error]);
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

    $query = "DELETE FROM crusts WHERE id = $id";
    if ($conn->query($query)) {
        echo json_encode(['message' => 'Crust type deleted successfully']);
    } else {
        echo json_encode(['error' => 'Failed to delete crust type', 'details' => $conn->error]);
    }
    exit;
}

echo json_encode(['error' => 'Invalid request method']);
http_response_code(405);
?>