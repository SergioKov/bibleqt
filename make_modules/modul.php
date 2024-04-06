<?php
header('Content-type: text/html; charset=utf-8');


echo "<p>Hola test<hr>";


$lines = file("greek.htm");
$count = count($lines);

echo"$ count:$count:";
echo"$ lines[0]: $lines[0]";
echo"$ lines[1]: $lines[1]";
echo"$ lines[2]: $lines[2]";





//include('moduls/json/rsti.json');



?>