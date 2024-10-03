<?php



// Conexión a la base de datos
if($_SERVER['HTTP_HOST'] == 'bibleqt.es'){//HOSTALIA
    //echo"hostalia";
	$servername = "PMYSQL120.dns-servicio.com";
    $username = "admin_slideshow";
    $password = "&admin_slideshow&";
    $dbname = "7229353_db_slideshow";//db de slideshow
    
}else{//LOCALHOST
    //echo"localhost";
	$servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "db_slideshow";    
}

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión a la base de datos
if ($conn->connect_error) {
    //echo "conn error";
    //writeLog("Conexión fallida. Error: [" . $conn->connect_error . "]");

	die("Conexión fallida: " . $conn->connect_error);
}else{
	//echo "conn ok";
}


?>