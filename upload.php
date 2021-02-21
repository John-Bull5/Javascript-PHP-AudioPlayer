<?php
include_once('config.php');
if (isset($_POST['upload'])) {

    $songSizeLimit = 250000000;
    $allowedSongType = array('mp3');


    //create a new folder for videos

    $targetSongDir = "src/songs/";

    // creating a temp path
    $songData = $_FILES['song'];

    $tempSongFilePath = $targetSongDir . uniqid() . basename($songData['name']);

    // replace all spaces with _

    $tempSongFilePath = str_replace(" ", "_", $tempSongFilePath);


    echo $tempSongFilePath;

    //validation for the song
    $songType = pathinfo($tempSongFilePath, PATHINFO_EXTENSION);
    $songName = pathinfo($songData['name'], PATHINFO_FILENAME);

    if ($songData["size"] >= $songSizeLimit) {
        echo "File is too large to upload";
    } elseif (!in_array($songType, $allowedSongType)) {
        echo "Invalid file types";
    } elseif ($songData['error'] != 0) {
        echo 'An error occured';
    }

    //move song into folder

    if (move_uploaded_file($songData['tmp_name'], $tempSongFilePath)) {

        $statement = $pdo->prepare(
            "INSERT INTO songs (songName,songPath) VALUES(:songName,:songPath)"
        );
        $statement->bindParam(":songName", $songName);
        $statement->bindParam(":songPath", $tempSongFilePath);

        $statement->execute();
        header('location:index.html');
    } else {
        echo 'an error occured';
    }
}
