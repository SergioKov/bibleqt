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

// Validar el usuario y la contraseña (esto es solo un ejemplo, deberías implementar una lógica segura de autenticación)
$hashedPassword = md5($password); // Reemplaza 'contraseña' con la contraseña real hasheada y salada
//echo"<p>$ hashedPassword; $hashedPassword</p>";
//verifyPasswordMd5($password,$hashedPassword);



$sql = "SELECT `id_user`, `username`, `password_text`, `password` FROM users WHERE username = '$username' ";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Usuario encontrado, verificar la contraseña
    $row = $result->fetch_assoc();
    $storedUsername = $row["username"];//Sergio
    $storedHashedPassword = $row["password"];//123123

    //var_dump($row);

    //echo"<hr>$ row<pre>";
    //echo print_r($row);
    //echo"</pre>";

    if(verifyPasswordMd5($password, $storedHashedPassword)) {
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



//mi fn
function verifyPasswordMd5($password,$hashedPassword){
    //echo"<p>$ hashedPassword: $hashedPassword</p>";
    //echo"<p>md5($ password): " . md5($password) . "</p>";

    if(md5($password) === $hashedPassword ){        
        return true;
    }else{
        return false;
    }
}


?>
