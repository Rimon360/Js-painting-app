<?php
if(!isset($_FILES['file'])){ echo 'File is not set yet!!!!!!!!!!!!'; }
else{
$file = $_FILES["file"];
$f_name = $file['name'];
$tmp_name = $file['tmp_name'];
$file_ex = pathinfo($f_name, PATHINFO_EXTENSION);
if($file_ex == 'png' || $file_ex == 'jpg' || $file_ex == 'jpeg' || $file_ex == 'tif' || $file_ex == 'tiff' ) {
$random_code = uniqid();
$file_name = $random_code.'.'.$file_ex;
move_uploaded_file($tmp_name,'data/'.$file_name);

echo json_encode([$file_name]);
}
else
{
 echo "Not the valid file exetension";   
}
}
?>