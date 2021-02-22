<?php
include_once('config.php');

if (isset($_POST['upload'])) 
{
    $id = $_SESSION['id'];
    $imageSizeLimit = 2500000;

    $allowedImageType = array('jpg', 'jpeg', 'png');


    //create a new folder for videos

    $targetImageDir = "src/img/";

    // creating a temp path
    $imageData = $_FILES['image'];
    $songName = $_POST['name'];


    $tempImageFilePath = $targetImageDir . uniqid() . basename($imageData['name']);

    // replace all spaces with _

    $tempImageFilePath = str_replace(" ", "_", $tempImageFilePath);


    echo $tempImageFilePath;

    //validation for the song
    $imageType = pathinfo($tempImageFilePath, PATHINFO_EXTENSION);

    if ($imageData["size"] >= $imageSizeLimit) {
        echo "File is too large to upload";
    } elseif (!in_array($imageType, $allowedImageType)) {
        echo "Invalid file types";
    } elseif ($imageData['error'] != 0) {
        echo 'An error occured';
    }

    //move song into folder

    if (move_uploaded_file($imageData['tmp_name'], $tempImageFilePath)) {

        $statement = $pdo->prepare(
            "UPDATE songs SET songName=:songName,songPic=:songPic WHERE id=:id"
        );
        echo '<pre>';
        var_dump($statement);
        echo '</pre>';

        $statement->bindParam(":id", $id);
        $statement->bindParam(":songName", $songName);
        $statement->bindParam(":songPic", $tempImageFilePath);

        $statement->execute();
        header('location:index.php');
    }
    //https://guarded-savannah-26323.herokuapp.com/
}
?>