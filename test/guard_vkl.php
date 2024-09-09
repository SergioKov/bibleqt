<?php

//echo "<h1>__guard.php</h1><hr>";
//=============================================================================================//
$fecha = date('Y-m-d H:i:s');
$_POST['id_div'] = (isset($_POST['id_div']) and !empty($_POST['id_div'])) ? $_POST['id_div'] : 'id_div_vacio' ;
$_POST['trans'] = (isset($_POST['trans']) and !empty($_POST['trans'])) ? $_POST['trans'] : 'trans_vacio' ;
$_POST['ref'] = (isset($_POST['ref']) and !empty($_POST['ref'])) ? $_POST['ref'] : 'ref_vacio' ;
$_POST['status'] = (isset($_POST['status']) and !empty($_POST['status'])) ? $_POST['status'] : 'status_vacio' ;

//linea que se escribe un el array
$line_txt = [
  'id_div' => $_POST['id_div'],
  'trans' => $_POST['trans'],
  'ref' => $_POST['ref'],
  'status' => $_POST['status']
];

$filename = '__guard_vkl.json';
$arr = [];//array dse objetos (lineas de valores que significan una linea de texto de input)

//abro el fichero para leer su contenido
$myfile = fopen($filename, "r") or die("Unable to open file!");//abro file '__guard_file.json' para leerlo
$myfile_read = fread($myfile,filesize($filename));//$myfile_read es string (texto)
/*
echo"<pre>";
print_r($myfile_read);
echo"</pre>";
*/

$arr = (!empty($myfile_read)) ? json_decode($myfile_read) : [];
array_push($arr, $line_txt);//meto el valor de $line_txt en la ultima posicion del arr de objeto
/*
echo"<pre>";
print_r($arr);
echo"</pre>";
*/
fclose($myfile);//ciero fichero leido

$arr2_json = json_encode($arr);
//echo"<p>$ arr2_json:<br> $arr2_json";

$myfile2 = fopen($filename, "r+") or die("Unable to open file!");//abro para escribir en la primera linea, 
//fwrite($myfile2, $txt . $myfile_read);
if(fwrite($myfile2, $arr2_json)){//en if grabo y comprebo si devuelve la operación true
    echo"txt se grabó bien en el json";//devuelvo mensaje
}else{
    echo"txt No se grabó en el json";
}
fclose($myfile2);


?>