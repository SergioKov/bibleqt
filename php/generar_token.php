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
        $updateQuery = "UPDATE users SET reset_token = '$resetToken', reset_token_expiry = '$resetTokenExpiry' WHERE email = '$email' ";
        $result_up = mysqli_query($conn, $updateQuery);


        // Protocolo (http o https)
        $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';

        // Nombre del host (dominio)
        $host = $_SERVER['HTTP_HOST'];//'bibleqt.local' o 'bibleqt.es'
        //echo $host;
        //exit();

        // Ruta base
        $basePath = dirname($_SERVER['SCRIPT_NAME']);

        // Construir la URL base
        $baseUrl = "$protocol://$host$basePath/";
        //echo "<br>La URL base es: $baseUrl";


        // Enviar un correo electrónico al usuario con el enlace de restablecimiento
        $resetLink = $baseUrl . "reset_password.php?email=$email&token=$resetToken";
        $subject = "Restablecer Contraseña";
        $message = "Haga clic en el siguiente enlace para restablecer su contraseña: $resetLink";

        $message_html = '
        <div marginheight="0" marginwidth="0" style="width:100%!important;margin:0;padding:0;background: white;">    
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="margin: 0 auto; max-width: 480px;">
                <tbody>
                <tr>
                    <td align="left" style="font-size:0px;padding:32px 44px;word-break:break-word">
                        <div style="font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.4;text-align:left;color:#253238">
                            Hola, <a href="mailto:' . $email . '" target="_blank">' . $email . '</a>:
                        </div>
                    </td>
                </tr>
                <tr>
                    <td align="left" style="font-size:0px;padding:0px 40px;padding-bottom:10px;word-break:break-word">
                        <div style="font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.4;text-align:left;color:#253238">
                            Hemos recibido una solicitud para restablecer la contraseña. Pulsa "Restablecer contraseña" para crear una nueva contraseña. Si no has sido tú quien lo ha solicitado, puedes ignorar este mensaje.
                        </div>
                    </td>
                </tr>
                <tr>
                    <td align="left" style="font-size:0px;padding:0px 40px;padding-bottom:10px;word-break:break-word">
                        <div style="font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.4;text-align:left;color:#253238">
                            <b>Por seguridad, nunca compartas este enlace con otras personas. Desde Bibleqt en ningún caso te pediremos que lo hagas.</b>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td align="center" style="font-size:0px;padding:32px 44px;padding-bottom:10px;word-break:break-word">
                        <a 
                        href="' . $resetLink . '" 
                        style="background:#2196f3;color:#ffffff;font-family:Raleway,Arial;font-size:16px;font-weight:normal;line-height:120%;Margin:0;text-decoration:none;text-transform:none;border-radius:40px;padding:10px 25px" 
                        target="_blank"
                        >
                            Restablecer contraseña
                        </a>
                    </td>
                </tr>
                <tr>
                    <td align="left" style="font-size:0px;padding:32px 44px;word-break:break-word">
                        <div style="font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.4;text-align:left;color:#253238">
                            Gracias, <br>El equipo de Bibleqt
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        ';
        
        //$from_email = "sergiokovalchuk@gmail.com";
        //$reply_to_email = "sergiokovalchuk@gmail.com";

        // Для отправки HTML-письма должен быть установлен заголовок Content-type
        //$headers  = "MIME-Version: 1.0" . "\r\n";
        //$headers .= "Content-type: text/plain; charset=\"utf-8\"" . "\r\n";
            //$headers .= "From: bibleqt.es - admin <" . $from_email . ">" . "\r\n";//comento ya que no funciona 
            //$headers .= "Reply-To: admin <" . $reply_to_email . ">" . "\r\n";//comento ya que no funciona 
        //$headers .= "From: bibleqt.es - admin <sergiokovalchuk@gmail.com>" . "\r\n"; 
        //$headers .= "Reply-To: admin <sergiokovalchuk@gmail.com>" . "\r\n"; 



        $headers  = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";
        $headers .= "From: Bibleqt - <contact@serg.es>" . "\r\n"; 
        $headers .= "Reply-To: Sergio <sergiokovalchuk@gmail.com>" . "\r\n"; 


        
        // Aquí deberías usar una biblioteca de envío de correo electrónico como PHPMailer o similar
        

        if($host == 'bibleqt.local'){//localhost

            echo json_encode([
                'success' => true, 
                'localhost' => true, 
                'resetLink' => $resetLink
            ]);
            //exit;

        }else{//produccion
            
            $result_mail = mail($email, $subject, $message_html, $headers);

            if ($result_mail) {
                //echo "1. El correo electrónico se envió correctamente.";
                echo json_encode(['success' => true, 'mensaje' => 'Se ha enviado un enlace de restablecimiento de contraseña a su correo electrónico.']);
            } else {
                //echo "2. Error al enviar el correo electrónico.";
                echo json_encode(['success' => false, 'mensaje' => 'Error al enviar el correo electrónico']);
            }
        }

    } else {
        //echo "El correo electrónico no está registrado en nuestro sistema.";
        echo json_encode(['success' => false, 'error' => 'El correo electrónico no está registrado en nuestro sistema.', 'error_text_code' => 'd231']);//d231 = Este correo electrónico no está registrado en nuestro sistema.
    }
}else{
    echo json_encode(['info' => false]);
}

mysqli_close($conn);
?>
