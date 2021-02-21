<?php 
include_once('config.php');


   $id = $_GET['id'];
    $_SESSION['id'] = $id;
    $statement = $pdo->prepare("SELECT * FROM songs WHERE id=:id");

    $statement->bindParam(":id", $id);

    $statement->execute();

    $result = $statement->fetch(PDO::FETCH_ASSOC);



?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./assets/bootstrap-4.5.2-dist/css/bootstrap.min.css">
    <title>Edit Your Song</title>
</head>

<body>
    <div class="container">
        <form action="update.php" method="post" enctype="multipart/form-data">
            <div class="form-group">
                <label for="image">Choose Song Image</label>
                <input type="file" class="form-control-file" name="image">
            </div>
            <div class="form-group">
                <label for="name">Song Name</label>
                <input type="text" class="form-control" name="name" value="<?php echo $result['songName'] ?>">
            </div>
            <input type="submit" name="upload" class="btn btn-primary" value="Upload Song">
        </form>
    </div>
</body>

</html>
