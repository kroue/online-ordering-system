<?php
include 'db.php';

// Add CORS headers
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
    // Fetch all users or a specific user by email
    if (isset($_GET['email'])) {
        $email = $conn->real_escape_string($_GET['email']);
        $query = "SELECT id, first_name, last_name, address, email FROM users WHERE email = '$email'";
        $result = $conn->query($query);
        if ($result) {
            $users = $result->fetch_all(MYSQLI_ASSOC);
            echo json_encode($users);
        } else {
            echo json_encode(['error' => 'Failed to fetch user', 'details' => $conn->error]);
            http_response_code(500);
        }
    } else {
        $query = "SELECT id, first_name, last_name, address, email FROM users";
        $result = $conn->query($query);
        if ($result) {
            $users = $result->fetch_all(MYSQLI_ASSOC);
            echo json_encode($users);
        } else {
            echo json_encode(['error' => 'Failed to fetch users', 'details' => $conn->error]);
            http_response_code(500);
        }
    }
    exit;
}

if ($method === 'POST') {
    // Create a new user
    $input = json_decode(file_get_contents('php://input'), true);

    if (!isset($input['email'], $input['password'])) {
        echo json_encode(['error' => 'Invalid input data']);
        http_response_code(400);
        exit;
    }

    $email = $conn->real_escape_string($input['email']);
    $password = password_hash($conn->real_escape_string($input['password']), PASSWORD_BCRYPT);
    $first_name = isset($input['first_name']) ? $conn->real_escape_string($input['first_name']) : '';
    $last_name = isset($input['last_name']) ? $conn->real_escape_string($input['last_name']) : '';
    $address = isset($input['address']) ? $conn->real_escape_string($input['address']) : '';

    $query = "INSERT INTO users (email, password, first_name, last_name, address) VALUES ('$email', '$password', '$first_name', '$last_name', '$address')";
    if ($conn->query($query)) {
        echo json_encode(['message' => 'User created successfully']);
    } else {
        echo json_encode(['error' => 'Failed to create user', 'details' => $conn->error]);
        http_response_code(500);
    }
    exit;
}

if ($method === 'PUT') {
    // Update an existing user
    $input = json_decode(file_get_contents('php://input'), true);

    if (!isset($input['id'], $input['email'])) {
        echo json_encode(['error' => 'Invalid input data']);
        http_response_code(400);
        exit;
    }

    $id = $conn->real_escape_string($input['id']);
    $email = $conn->real_escape_string($input['email']);
    $first_name = isset($input['first_name']) ? $conn->real_escape_string($input['first_name']) : '';
    $last_name = isset($input['last_name']) ? $conn->real_escape_string($input['last_name']) : '';
    $address = isset($input['address']) ? $conn->real_escape_string($input['address']) : '';

    $set = "email = '$email', first_name = '$first_name', last_name = '$last_name', address = '$address'";
    if (!empty($input['password'])) {
        $password = password_hash($conn->real_escape_string($input['password']), PASSWORD_BCRYPT);
        $set .= ", password = '$password'";
    }

    $query = "UPDATE users SET $set WHERE id = $id";
    if ($conn->query($query)) {
        echo json_encode(['message' => 'User updated successfully']);
    } else {
        echo json_encode(['error' => 'Failed to update user', 'details' => $conn->error]);
        http_response_code(500);
    }
    exit;
}

if ($method === 'DELETE') {
    // Delete a user
    $input = json_decode(file_get_contents('php://input'), true);

    if (!isset($input['id'])) {
        echo json_encode(['error' => 'Invalid input data']);
        http_response_code(400);
        exit;
    }

    $id = $conn->real_escape_string($input['id']);

    $query = "DELETE FROM users WHERE id = $id";
    if ($conn->query($query)) {
        echo json_encode(['message' => 'User deleted successfully']);
    } else {
        echo json_encode(['error' => 'Failed to delete user', 'details' => $conn->error]);
        http_response_code(500);
    }
    exit;
}

echo json_encode(['error' => 'Invalid request method']);
http_response_code(405);
?>