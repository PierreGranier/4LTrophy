<?php

header('Content-Type: application/json');

$directory_name = "galerie/";
$images["records"] = [];

if (is_dir($directory_name)) {
    $directory = opendir($directory_name);

    while (($file = readdir($directory)) !== false) {
        if (is_file($directory_name . $file)) {
            array_push($images["records"], $directory_name . $file);
        }
    }

    closedir($directory);
}

echo json_encode($images);

?>
