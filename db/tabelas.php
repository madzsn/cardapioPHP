<?php

$servername= "localhost";
$username = "root";
$password = "";
$dbname = "erasclothing";

try {
    $pdo = new PDO ("myswl:host=$servername;dbname=$dbname", $username,$password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $conn;
} catch (PDOException $e) {
    echo "Connection Failed: " , $e->getMessage();
    return null;
}

// Verifica se os dados foram enviados via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtém os dados enviados pelo JavaScript
    $data = json_decode(file_get_contents("php://input"), true);