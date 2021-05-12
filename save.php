<?php
if(isset($_POST['img'])){
$data = $_POST['img'];
$id = uniqid();
$file = "data/".$id.".jpg";
$uri = substr($data,strpos($data, ",") + 1);
file_put_contents($file, base64_decode($uri));
echo json_encode([$id.'.jpg']);
}
else
{
    header('location:index');
};
?>