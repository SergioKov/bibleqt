<?php 

// Conexión a la base de datos
if($_SERVER['HTTP_HOST'] == 'bibleqt.es'){//HOSTALIA
    //echo"hostalia";
	$servername = "PMYSQL120.dns-servicio.com";
    $username = "admin_bibleqt";
    $password = "&admin_bibleqt&";
    $dbname = "7229353_db_bibleqt";
    
}else{//LOCALHOST
    //echo"localhost";
	$servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "db_bibleqt";    
}

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión a la base de datos
if ($conn->connect_error) {
    //echo "conn error";
	die("Conexión fallida: " . $conn->connect_error);
}else{
	//echo "conn ok";
}

?>