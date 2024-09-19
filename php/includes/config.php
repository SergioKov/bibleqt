<?php

if($_SERVER['HTTP_HOST'] == 'bibleqt.es'){//HOSTALIA
    $arr_metodos = ['POST'];//en PROD siempre!   
}else{//LOCALHOST
    $arr_metodos = ['POST', 'GET'];//para hacer test...  
}

//$arr_metodos = ['POST', 'GET'];//descomentar para hacer test y comentar en PROD... 
?>