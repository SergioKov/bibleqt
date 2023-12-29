<?php

include('connect_db.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    //echo json_encode(['info' => true]);
    //exit;

    // Obtener datos del cuerpo de la solicitud (en formato JSON)
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, true);
    
    
    //$email = mysqli_real_escape_string($conn, $_POST['email']);
    $email = mysqli_real_escape_string($conn, $input['email']);
    

    // Verificar si el correo electrónico existe en la base de datos
    $checkQuery = "SELECT * FROM users WHERE email = '$email' ";
    $result = mysqli_query($conn, $checkQuery);

    if(mysqli_num_rows($result) > 0) {
        
        // Generar un token único y establecer la fecha de expiración
        $resetToken = bin2hex(random_bytes(32));
        $resetTokenExpiry = date('Y-m-d H:i:s', strtotime('+1 hour'));

        // Almacenar el token y la fecha de expiración en la base de datos
        $updateQuery = "UPDATE users SET reset_token = '$resetToken', reset_token_expiry = '$resetTokenExpiry' WHERE email = '$email'";
        $result_up = mysqli_query($conn, $updateQuery);


        // Protocolo (http o https)
        $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';

        // Nombre del host (dominio)
        $host = $_SERVER['HTTP_HOST'];

        // Ruta base
        $basePath = dirname($_SERVER['SCRIPT_NAME']);

        // Construir la URL base
        $baseUrl = "$protocol://$host$basePath/";
        //echo "<br>La URL base es: $baseUrl";


        // Enviar un correo electrónico al usuario con el enlace de restablecimiento
        $resetLink = $baseUrl . "reset_password.php?email=$email&token=$resetToken";
        $subject = "Restablecer Contraseña";
        $message = "Haga clic en el siguiente enlace para restablecer su contraseña: $resetLink";
        
        $from_email = "sergiokovalchuk@gmail.com";
        $reply_to_email = "sergiokovalchuk@gmail.com";

        // Для отправки HTML-письма должен быть установлен заголовок Content-type
        $headers  = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type: text/plain; charset=\"utf-8\"" . "\r\n";
        $headers .= "From: bibleqt.es - admin <$from_email>" . "\r\n"; 
        $headers .= "Reply-To: admin <$reply_to_email>" . "\r\n"; 

        
        // Aquí deberías usar una biblioteca de envío de correo electrónico como PHPMailer o similar
        
        //DESCOMENTAR EN PRODUCCION
        /*
        $result_mail = mail($email, $subject, $message, $headers);

        if ($result_mail) {
            //echo "1. El correo electrónico se envió correctamente.";
            echo json_encode(['success' => true, 'resetLink' => 'resetLink', 'mensaje' => 'Se ha enviado un enlace de restablecimiento de contraseña a su correo electrónico.']);
        } else {
            //echo "2. Error al enviar el correo electrónico.";
            echo json_encode(['success' => false, 'mensaje' => 'Error al enviar el correo electrónico']);
        }
        */
        
        echo json_encode(['info' => $resetLink]);
        exit;

    } else {
        //echo "El correo electrónico no está registrado en nuestro sistema.";
        echo json_encode(['success' => false, 'error' => 'El correo electrónico no está registrado en nuestro sistema.']);
    }
}else{
    echo json_encode(['info' => false]);
}

mysqli_close($conn);
?>
