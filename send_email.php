<?php
// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get raw POST data
    $data = json_decode(file_get_contents("php://input"), true);

    // Check if the data is valid
    if (json_last_error() === JSON_ERROR_NONE) {
        $name = $data['name'];
        $email = $data['email'];
        $address = $data['address'];
        $cart = $data['cart'];

        // Start building the order details
        $orderDetails = "Order Details:\n";
        foreach ($cart as $item) {
            // Correct price formatting with 2 decimal places
            $orderDetails .= "{$item['item']} - \$" . number_format($item['price'], 2) . "\n";
        }

        // Create the email body
        $message = "New Order Received\n\n" . 
                   "Name: $name\n" . 
                   "Email: $email\n" . 
                   "Address: $address\n\n" . 
                   "$orderDetails";

        // Email configuration
        $to = "creativebeavers25@gmail.com";  // Replace with your email
        $subject = "New Order from Your Website";
        $headers = "From: no-reply@orders.com\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8";

        // Send email
        if (mail($to, $subject, $message, $headers)) {
            // Send success response
            echo json_encode(['status' => 'success', 'message' => 'Order received successfully']);
        } else {
            // Send failure response
            echo json_encode(['status' => 'error', 'message' => 'Failed to send email']);
        }
    } else {
        // Invalid JSON
        echo json_encode(['status' => 'error', 'message' => 'Invalid JSON received']);
    }
}
?>
