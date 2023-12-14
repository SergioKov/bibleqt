<?php
// Iniciar sesión
session_start();



// Conexión a la base de datos (reemplaza con tus propios detalles)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "db_bibleqt";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión a la base de datos
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}



// Obtener datos del cuerpo de la solicitud (en formato JSON)
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

// Obtener usuario y contraseña del cuerpo de la solicitud
$username = isset($input['username']) ? $input['username'] : '';
$password = isset($input['password']) ? $input['password'] : '';

//$salt = bin2hex(random_bytes(22)); // 22 bytes para el salt (176 bits) es aleatorio. al registrar a un usuario debo guardar su salt en la bd.
$salt = bin2hex(2000);

// Concatenar el salt con la contraseña y aplicar el hash bcrypt
$hashedPassword = password_hash($salt . $password, PASSWORD_BCRYPT);
//echo"<p>$ hashedPassword; $hashedPassword</p>";



//saco datos de user de la bd.
$sql = "SELECT `id_user`, `username`, `password_text`, `password`, `salt` FROM users WHERE username = '$username' ";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Usuario encontrado, verificar la contraseña
    $row = $result->fetch_assoc();
    $storedUsername = $row["username"];//Sergio
    $storedHashedPassword = $row["password"];//123123
    $storedSalt = $row["salt"];//32303030

    //var_dump($row);

    //echo"<hr>$ row<pre>";
    //echo print_r($row);
    //echo"</pre>";

    //if(verifyPasswordMd5($password, $storedHashedPassword)) {
    
    if(password_verify($storedSalt . $password, $hashedPassword)) {
        //echo "¡Contraseña correcta! Usuario autenticado.";
        // Autenticación exitosa
        $_SESSION['username'] = $storedUsername;
        echo json_encode(['success' => true]);

        //echo"<hr>$ _SESSION <pre>";
        //echo print_r($_SESSION);
        //echo"</pre>";

    }else{
        //echo "Contraseña incorrecta. Usuario no autenticado.";
        // Autenticación fallida
        echo json_encode(['success' => false, 'error' => 'Contrasena incorrecta']);


    }
}else{
    //echo "Usuario no encontrado.";
    // Autenticación fallida
    echo json_encode(['success' => false, 'error' => 'Usuario no encontrado']);

}

$conn->close();


?>
