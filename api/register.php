<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include "db.php";

$raw = file_get_contents("php://input");
if (!$raw) {
    echo json_encode(["success" => false, "message" => "No input received."]);
    exit();
}

$data = json_decode($raw);

if (!$data || empty($data->email) || empty($data->password)) {
    echo json_encode(["success" => false, "message" => "Invalid input."]);
    exit();
}

$email = $conn->real_escape_string($data->email);
$password = password_hash($data->password, PASSWORD_BCRYPT);

// Check if email already exists
$check = $conn->query("SELECT * FROM users WHERE email = '$email'");
if ($check->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Email already registered."]);
    exit();
}

// Insert new user into database
$sql = "INSERT INTO users (email, password) VALUES ('$email', '$password')";
if ($conn->query($sql)) {
    echo json_encode(["success" => true, "message" => "Registration successful."]);
} else {
    echo json_encode(["success" => false, "message" => "Registration failed."]);
}
?>