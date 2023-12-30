<?php 

include('base_url.php');

// Conexión a la base de datos
if($baseUrl == 'https://bibleqt.es/'){//HOSTALIA
    $servername = "PMYSQL120.dns-servicio.com:3306";
    $username = "admin_bibleqt";
    $password = "&admin_bibleqt&";
    $dbname = "7229353_db_bibleqt";
    
}else{//LOCALHOST
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "db_bibleqt";    
}

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión a la base de datos
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

?>

