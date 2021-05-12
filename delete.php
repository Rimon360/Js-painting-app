<?php
if(isset($_POST['iname']))
{
unlink($_POST['iname']);
}else
{
    header('location:index');
    echo 'Faild';
}
?>