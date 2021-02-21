<?php

ob_start();

session_start();

date_default_timezone_set("Asia/Calcutta");

try {
    $pdo = new PDO("mysql:dbname=audioPlayer;host=localhost", "root", "1999.12,2a##");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
} catch (PDOException $e) {
    echo "Connection Failed:" . $e->getMessage();
}
