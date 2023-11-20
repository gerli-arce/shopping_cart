<?php
include '../db/conne.php';

$result = $conn->query("SELECT * FROM products");

$productos = [];
while ($row = $result->fetch_assoc()) {
    $productos[] = $row;
}

echo json_encode($productos);
?>
