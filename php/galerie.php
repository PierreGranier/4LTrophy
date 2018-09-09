<?php

header('Content-Type: application/json');

$directory_name = "galerie/";

$directory_position = "../" . $directory_name;
$files_sorted_by_date = [];

if (is_dir($directory_position)) {
    $directory = opendir($directory_position);

    while (($file = readdir($directory)) !== false) {
        if (is_file($directory_position . $file)) {
            $files_sorted_by_date[filemtime($directory_position . $file)] = $file;
        }
    }

    closedir($directory);
}

krsort($files_sorted_by_date);

$images["records"] = [];
foreach ($files_sorted_by_date as $file) {
    array_push($images["records"], $directory_name . $file);
}

echo json_encode($images);

?>
