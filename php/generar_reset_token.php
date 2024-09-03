<?php

include('connect_db.php');
include('base_url.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    //echo json_encode(['info' => true]);
    //exit;

    // Obtener datos del cuerpo de la solicitud (en formato JSON)
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, true);    
    
    $email = $conn->real_escape_string(strtolower($input['email']));    
    $lang = $conn->real_escape_string(strtolower($input['lang']));    

    //modo 1. simple
    // Verificar si el correo electrónico existe en la base de datos
    /*
    $checkQuery = "SELECT * 
                    FROM users 
                    WHERE email = '$email' 
    ";
    // $result = mysqli_query($conn, $checkQuery);
    $result = $conn->query($checkQuery);
    */


    //modo 2. consulta preparada
    $checkQuery = "SELECT * 
                    FROM users 
                    WHERE email = ? 
    ";    
    $stmt = $conn->prepare($checkQuery);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();


    if($result->num_rows > 0) {
        
        // Usuario encontrado, verificar la contraseña
        $row = $result->fetch_assoc();

        //$storedId_user = $row["id_user"];//1
        $storedUsername = $row["username"];//Sergio

        // Generar un token único y establecer la fecha de expiración
        $resetToken = bin2hex(random_bytes(32));
        $resetTokenExpiry = date('Y-m-d H:i:s', strtotime('+1 hour'));
        
        //modo 1. simple
        /*
        // Almacenar el token y la fecha de expiración en la base de datos
        $updateQuery = "UPDATE users SET 
                        reset_token = '$resetToken', 
                        reset_token_expiry = '$resetTokenExpiry' 
                        WHERE email = '$email' 
        ";
        // $result_up = mysqli_query($conn, $updateQuery);
        $result_up = $conn->query($updateQuery);
        */

        //modo 2. Consulta segura
        // Almacenar el token y la fecha de expiración en la base de datos
        $updateQuery = "UPDATE users SET 
                        reset_token = ?, 
                        reset_token_expiry = ? 
                        WHERE email = ? 
        ";
        $stmt = $conn->prepare($updateQuery);
        $stmt->bind_param("sss", $resetToken, $resetTokenExpiry, $email);
        $stmt->execute();
        $result_up = $stmt->affected_rows;
        $stmt->close();


        // Enviar un correo electrónico al usuario con el enlace de restablecimiento
        $subject = "Restablecer Contraseña";
        $message = "Haga clic en el siguiente enlace para restablecer su contraseña: $resetLink";
        $resetLink = $baseUrl . "reset_password.php?email=$email&token=$resetToken";

        $frase_hola = $obj_lang['d287'];//'Hola';
        $frase2 = $obj_lang['d294'];//Hemos recibido una solicitud para restablecer la contraseña. Pulsa "Restablecer contraseña" para crear una nueva contraseña. Si no has sido tú quien lo ha solicitado, puedes ignorar este mensaje.
        $frase3 = $obj_lang['d289'];//'Por seguridad, nunca compartas este enlace con otras personas. Desde Bibleqt en ningún caso te pediremos que lo hagas.';
        $frase_link = $obj_lang['d295'];//'Restablecer contraseña';
        $frase_gracias = $obj_lang['d291'];//'Gracias, <br>El equipo de Bibleqt';




        $message_html = '
            <div marginheight="0" marginwidth="0" style="width:100%!important;margin:0;padding:0;background: white;">    
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="margin: 0 auto; max-width: 480px;">
                    <tbody>
                    <tr>
                        <td align="left" style="font-size:0px;padding:32px 44px;word-break:break-word">
                            <div style="font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.4;text-align:left;color:#253238">
                                ' . $frase_hola . ', <b>' . $storedUsername . '</b>.
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="left" style="font-size:0px;padding:0px 40px;padding-bottom:10px;word-break:break-word">
                            <div style="font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.4;text-align:left;color:#253238">
                                ' . $frase2 . '
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="left" style="font-size:0px;padding:0px 40px;padding-bottom:10px;word-break:break-word">
                            <div style="font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.4;text-align:left;color:#253238">
                                <b>' . $frase3 . '</b>
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
                                ' . $frase_link . '
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td align="left" style="font-size:0px;padding:32px 44px;word-break:break-word">
                            <div style="font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.4;text-align:left;color:#253238">
                                ' . $frase_gracias . '
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        ';
        

        $headers  = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";
        $headers .= "From: Bibleqt <contact@bibleqt.es>" . "\r\n"; 
        $headers .= "Reply-To: Bibleqt <contact@bibleqt.es>" . "\r\n"; 
        
        
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
                echo json_encode([
                    'success' => true, 
                    'mensaje' => 'Se ha enviado un enlace de restablecimiento de contraseña a su correo electrónico.',
                    'dic_code' => 'd239'
                ]);
            } else {
                echo json_encode([
                    'success' => false, 
                    'mensaje' => 'Error al enviar el correo electrónico.',
                    'dic_code' => 'd240'
                ]);
            }
        }

    } else {
        
        //echo "El correo electrónico no está registrado en nuestro sistema.";
        echo json_encode([
            'success' => false, 
            'error' => 'El correo electrónico no está registrado en nuestro sistema.', 
            'dic_code' => 'd231'
        ]);//d231 = Este correo electrónico no está registrado en nuestro sistema.
    }

}else{

    //echo "<p>else. REQUEST_METHOD";
    
    // Establecer la redirección después de 5 segundos
    header("Refresh: 5; url=../aviso.php");

    echo json_encode([
        'success' => false, 
        'error' => 'El método de pasar los parametros no es correcto.',
        'dic_code' => 'd256'
    ]);    

}

// mysqli_close($conn);
$conn->close();

?>
