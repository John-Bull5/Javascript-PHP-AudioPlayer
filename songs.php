<?php 

include_once('config.php');

$statement = $pdo->prepare("SELECT * FROM songs");

$statement->execute();
$result = $statement->fetchAll();


echo json_encode($result);