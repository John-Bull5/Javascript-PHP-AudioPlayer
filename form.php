<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./assets/bootstrap-4.5.2-dist/css/bootstrap.min.css">
    <title>Upload Your Song</title>
</head>

<body>
    <div class="container">
        <form action="upload.php" method="post" enctype="multipart/form-data">
            <div class="form-group">
                <label for="Songs">Choose Your Song</label>
                <input type="file" class="form-control-file" name="song">
            </div>
            <input type="submit" name="upload" class="btn btn-primary" value="Upload Song">
        </form>
    </div>
</body>

</html>