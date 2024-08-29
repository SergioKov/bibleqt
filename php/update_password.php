<?php

include('connect_db.php');
include('base_url.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    //echo json_encode(['info' => true]);
    //exit;

    // Obtener datos del cuerpo de la solicitud (en formato JSON)
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, true);
    
    // Obtener usuario y contraseña del cuerpo de la solicitud
    $email = isset($input['email']) ? $input['email'] : '';
    $password = isset($input['password']) ? $input['password'] : '';
    $new_password = isset($input['new_password']) ? $input['new_password'] : '';
    $new_password_rep = isset($input['new_password_rep']) ? $input['new_password_rep'] : '';

    if($email == '' && $password == '' && $new_password == '' && $new_password_rep == ''){
        echo json_encode([
            'success' => false, 
            'error' => 'Email y contraseñas vacios'
        ]);
        return;
    }
    if($email == '' || $password == '' || $new_password == '' || $new_password_rep == ''){
        echo json_encode([
            'success' => false, 
            'error' => 'Email o contraseñas vacios'
        ]);
        return;
    }
    if($new_password !=  $new_password_rep){
        echo json_encode([
            'success' => false, 
            'error' => 'La contraseña nueva y su repetición no son iguales'
        ]);
        return;
    }

    $email = $conn->real_escape_string(strtolower($email));    

    //$salt = bin2hex(random_bytes(22)); // 22 bytes para el salt (176 bits) es aleatorio. al registrar a un usuario debo guardar su salt en la bd.
    $salt = bin2hex(2000);

    // Concatenar el salt con la contraseña y aplicar el hash bcrypt
    $hashedPassword = password_hash($salt . $password, PASSWORD_BCRYPT);
    $hashedNewPassword = password_hash($salt . $new_password, PASSWORD_BCRYPT);
    //echo"<p>$ hashedPassword; $hashedPassword</p>";


    // Verificar si el correo electrónico existe en la base de datos
    $checkQuery = "SELECT `id_user`, `username`, `email`, `password_text`, `password`, `salt` 
                    FROM users 
                    WHERE BINARY email = '$email' 
    ";
    //$result = mysqli_query($conn, $checkQuery);//antes
    $result = $conn->query($checkQuery);
    //echo json_encode(['info' => $checkQuery]);
    //exit;

    if(/*mysqli_num_rows($result) > 0*/ $result->num_rows > 0) {
        
        // Usuario encontrado, verificar la contraseña
        $row = $result->fetch_assoc();
        $storedId_user = $row["id_user"];//1
        $storedUsername = $row["username"];//Sergio
        $storedEmail = $row["email"];//sergiokovalchuk@gmail.com
        $storedHashedPassword = $row["password"];//123123
        $storedSalt = $row["salt"];//32303030

        //echo json_encode(['info' => "storedSalt: $storedSalt --- salt: $salt" ]);
        //exit;

        //funcción password_verify(contraseña_input, contraseña_hasheada_de_bd)
        if(password_verify($storedSalt . $password, $storedHashedPassword)) { 
            //echo "¡Contraseña correcta! Usuario autenticado.";
            //echo json_encode(['info' => 'dentro de password_verify']);
            //exit;

            // Obtener la fecha y hora actual
            $updated_at = date("Y-m-d H:i:s");

            $sql_up = "UPDATE users SET 
                        `password` = '$hashedNewPassword',
                        `password_text` = '$new_password',
                        `updated_at` = '$updated_at'
                        WHERE id_user = '$storedId_user'
            ";
            $result_up = $conn->query($sql_up);
            //echo json_encode(['info' => $sql_up]);
            //exit;

            // Enviar un correo electrónico al usuario con el enlace de restablecimiento
            //$resetLink = $baseUrl . "reset_password.php?email=$email&token=$resetToken";
            $subject = "Actualizar Contraseña";
            $message = "Tu contraseña ha sido actualizada con éxito.";

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
                                Tu contraseña ha sido actualizada con éxito. Pulsa "Entrar" para loguearte con la nueva contraseña. 
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="left" style="font-size:0px;padding:0px 40px;padding-bottom:10px;word-break:break-word">
                            <div style="font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.4;text-align:left;color:#253238">
                                <b>Por seguridad, nunca compartas tu contraseña con otras personas. Desde Bibleqt en ningún caso te pediremos que lo hagas.</b>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="font-size:0px;padding:32px 44px;padding-bottom:10px;word-break:break-word">
                            <a 
                            href="' . $host . '" 
                            style="background:#2196f3;color:#ffffff;font-family:Raleway,Arial;font-size:16px;font-weight:normal;line-height:120%;Margin:0;text-decoration:none;text-transform:none;border-radius:40px;padding:10px 25px" 
                            target="_blank"
                            >
                                Entrar
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
            $headers .= "From: Bibleqt - <contact@bibleqt.es>" . "\r\n"; 
            $headers .= "Reply-To: Sergio <sergiokovalchuk@gmail.com>" . "\r\n"; 
            
            // Aquí deberías usar una biblioteca de envío de correo electrónico como PHPMailer o similar
            if($host == 'bibleqt.local'){//localhost

                echo json_encode([
                    'success' => true, 
                    'localhost' => true,
                    'mensaje' => 'Su contraseña ha sido actualizada con éxito.'
                ]);
                //exit;

            }else{//produccion
                
                $result_mail = mail($email, $subject, $message_html, $headers);

                if($result_mail) {
                    //echo "1. El correo electrónico se envió correctamente.";
                    echo json_encode([
                        'success' => true, 
                        'mensaje' => 'Su contraseña ha sido actualizada con éxito.'
                    ]);
                } else {
                    //echo "2. Error al actualizar la contraseña.";
                    echo json_encode([
                        'success' => false, 
                        'mensaje' => 'Error al actualizar la contraseña.', 
                        'error' => 'Error al actualizar la contraseña.',
                        'dic_code' => 'd233'
                    ]);
                }
            }

        }else{
            
            //echo "Contraseña incorrecta. Usuario no autenticado.";
            // Autenticación fallida
            echo json_encode([
                'success' => false, 
                'error' => 'Contrasena actual es incorrecta. Los datos no se han actualizado.',
                'dic_code' => 'd234'
            ]);

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
    echo json_encode([
        'info' => false
    ]);
}

// mysqli_close($conn);
$conn->close();

?>
