<?php 

$status_sess = session_start();

if($status_sess){
    echo "session started";
}else{
    echo "session NO started";
}

?>