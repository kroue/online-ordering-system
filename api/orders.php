<?php
include 'db.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Fetch all orders
    $query = "SELECT * FROM orders";
    $result = $conn->query($query);

    if ($result) {
        $orders = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($orders);
    } else {
        echo json_encode(['error' => 'Failed to fetch orders', 'details' => $conn->error]);
        http_response_code(500);
    }
    exit;
}

if ($method === 'PUT') {
    // Get the JSON input
    $input = json_decode(file_get_contents('php://input'), true);

    // Validate input
    if (!isset($input['id'], $input['status'])) {
        echo json_encode(['error' => 'Invalid input data']);
        http_response_code(400);
        exit;
    }

    $id = $conn->real_escape_string($input['id']);
    $status = $conn->real_escape_string($input['status']);

    $query = "UPDATE orders SET status = '$status' WHERE id = $id";
    if ($conn->query($query)) {
        echo json_encode(['message' => 'Order status updated successfully']);
    } else {
        echo json_encode(['error' => 'Failed to update order status', 'details' => $conn->error]);
        http_response_code(500);
    }
    exit;
}

if ($method === 'POST') {
    // Get the JSON input
    $input = json_decode(file_get_contents('php://input'), true);

    // Validate input
    if (!is_array($input)) {
        echo json_encode(['error' => 'Invalid input data. Expected an array of orders.']);
        http_response_code(400);
        exit;
    }

    foreach ($input as $order) {
        if (!isset($order['pizza_name'], $order['size'], $order['crust'], $order['toppings'], $order['price'], $order['status'])) {
            echo json_encode(['error' => 'Invalid input data for one or more orders.', 'received' => $order]);
            http_response_code(400);
            exit;
        }

        $pizza_name = $conn->real_escape_string($order['pizza_name']);
        $size = $conn->real_escape_string($order['size']);
        $crust = $conn->real_escape_string($order['crust']);
        $toppings = $conn->real_escape_string(implode(', ', $order['toppings']));
        $price = $conn->real_escape_string($order['price']);
        $status = $conn->real_escape_string($order['status']);

        $query = "INSERT INTO orders (pizza_name, size, crust, toppings, price, status) VALUES ('$pizza_name', '$size', '$crust', '$toppings', '$price', '$status')";
        if (!$conn->query($query)) {
            echo json_encode(['error' => 'Failed to create order', 'details' => $conn->error]);
            http_response_code(500);
            exit;
        }
    }

    echo json_encode(['message' => 'Orders created successfully']);
    exit;
}
if ($method === 'DELETE') {
    $query = "DELETE FROM orders";
    if ($conn->query($query)) {
        echo json_encode(['message' => 'All orders deleted successfully']);
    } else {
        echo json_encode(['error' => 'Failed to delete orders', 'details' => $conn->error]);
        http_response_code(500);
    }
    exit;
}
echo json_encode(['error' => 'Invalid request method']);
http_response_code(405);
?>