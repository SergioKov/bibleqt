<?php
include('connect_db.php');

//echo "file: reset_password.php";
//die();

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $email = mysqli_real_escape_string($conn, $_GET['email']);
    $token = mysqli_real_escape_string($conn, $_GET['token']);

    // Verificar si el correo electrónico y el token son válidos
    $checkQuery = "SELECT * FROM users WHERE email = '$email' AND reset_token = '$token' AND reset_token_expiry > NOW()";
    $result = mysqli_query($conn, $checkQuery);

    if (mysqli_num_rows($result) > 0) {
        
        
        // Protocolo (http o https)
        $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';

        // Nombre del host (dominio)
        $host = $_SERVER['HTTP_HOST'];

        // Ruta base
        $basePath = dirname($_SERVER['SCRIPT_NAME']);

        // Construir la URL base
        $baseUrl = "$protocol://$host$basePath/";
        //echo "<br>La URL base es: $baseUrl";
        
        $location = "Location: " . $baseUrl . "reset_password_form.php?email=$email&token=$token";
        //echo "<br>$ location: $location";
        
        //echo "<br>1. redirijo...";
        //die();
        
        // Permitir al usuario restablecer la contraseña
        // Puedes redirigir al usuario a un formulario para ingresar la nueva contraseña
        header($location);
        exit();
    } else {
        echo "Enlace no válido o expirado.";
    }
}

mysqli_close($conn);
?>
