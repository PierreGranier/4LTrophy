<?php

header('Content-Type: application/json');

$directory_name = "sponsors/";

$directory_position = "../" . $directory_name;
$images["records"] = [];

if (is_dir($directory_position)) {
    $directory = opendir($directory_position);

    while (($file = readdir($directory)) !== false) {
        if (is_file($directory_position . $file)) {
            array_push($images["records"], $directory_name . $file);
        }
    }

    closedir($directory);
}

echo json_encode($images);

?>
