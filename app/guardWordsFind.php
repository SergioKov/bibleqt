<?php
header('content-type:text/html;charset=utf-8');
//=============================================================================================//
$filename = 'guardWordsFind_file.json';
//$_POST['words'] = 'И увидел Бог свет, что он хорош, и отделил Бог свет от тьмы.';//test
$fecha = date('Y-m-d H:i:s');
$_POST['words'] = (isset($_POST['words']) and !empty($_POST['words'])) ? $_POST['words'] : 'words_vacio1' ;

//linea que se escribe un el array
$line_words = array(
  'fecha' => $fecha,
  'words' => $_POST['words'] 
);
//
echo"<pre>";
print_r($line_words);
echo"</pre>";
//

//abro el fichero para leer su contenido
$myfile = fopen($filename, "r") or die("Unable to open file!");//abro file 'guard_file.json' para leerlo
$myfile_read = fread($myfile,filesize($filename));//$myfile_read es string (texto)


if(json_decode($myfile_read) != null){
    //echo "<p> no es null. ";
    $arr = json_decode($myfile_read);
    array_unshift($arr, $line_words);//meto el valor de $line_words en la primera posicion del arr de objeto
}else{
    //echo "<p> es null";
    $arr = array();
    array_push($arr, $line_words);
}

$max_items = 100;
if(count($arr) > $max_items){   
    $arr = array_splice($arr,0,$max_items);
    /*
    
    echo"<br>arr: <pre>";
    print_r($arr);
    echo"</pre>";

    $arr_new = array();

    $max_items = 3;
    for ($i=0; $i < $max_items; $i++) { 
        array_push($arr_new, $arr[$i]); 
        echo"<br> meto value en arr_new";
    }

    echo"<br>arr_new: <pre>";
    print_r($arr_new);
    echo"</pre>";

    $arr = $arr_new;    
    
    echo"<br>arr ahora: <pre>";
    print_r($arr);
    echo"</pre>";
    */
}
fclose($myfile);//ciero fichero leido
//die();

$arr2_json = json_encode($arr);
//echo"<p>$ arr2_json:<br> $arr2_json";

$myfile2 = fopen($filename, "w+") or die("Unable to open file!");//w+ importante 
//fwrite($myfile2, $words . $myfile_read);
$result = fwrite($myfile2, $arr2_json);

if($result){//en if grabo y comprebo si devuelve la operación true
    echo"words se grabó bien en el json";//devuelvo mensaje
}else{
    echo"words No se grabó en el json";
}
fclose($myfile2);

?>