<?php

include('connect_db.php');
include('base_url.php');


/*
//HACER PRUEBAS...
echo json_encode([
    'HACIENDO_PRUEBAS' => 'DESCOMENTAR EN PROD',
    'success' => false, 
    'error' => 'Este correo electrónico no está registrado en nuestro sistema.', 
    'dic_code' => 'd231'
]);
exit;
*/


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
    $lang = isset($input['lang']) ? $input['lang'] : '';

    if($email == '' && $password == '' && $new_password == '' && $new_password_rep == ''){
        echo json_encode([
            'success' => false, 
            'error' => 'Email y contraseñas vacios.',
            'dic_code' => 'd263'
        ]);
        return;
    }
    if($email == '' || $password == '' || $new_password == '' || $new_password_rep == ''){
        echo json_encode([
            'success' => false, 
            'error' => 'Email o contraseñas vacios.',
            'dic_code' => 'd264'
        ]);
        return;
    }
    if($new_password !=  $new_password_rep){
        echo json_encode([
            'success' => false, 
            'error' => 'La contraseña nueva y su repetición no son iguales.',
            'dic_code' => 'd265'
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

            //si se ha actualizdo el password en bd...
            if($result_up){


                $filename_lang = '../modules/json/' . $lang . '.json';
                if(file_exists($filename_lang)) {
                    // Leer el contenido del archivo
                    $obj_lang_content = file_get_contents($filename_lang);
        
                    // Convertir el contenido JSON en un array asociativo de PHP
                    $obj_lang = json_decode($obj_lang_content, true);
        
                    //echo json_encode ([
                    //    'filename_lang' => $filename_lang,
                    //    'test' => "$ obj_lang['d287']: " . $obj_lang['d287'] 
                    //]);
                    //exit;
                }else{
                    //echo json_encode ([
                    //    'filename_lang' => 'no existe'
                    //]);
                    //exit;    
                }


                // Enviar un correo electrónico al usuario con el enlace de restablecimiento
                $subject = "Actualizar Contraseña";
                $message = "Tu contraseña ha sido actualizada con éxito.";
                $linkLogin = $host . "/?login";

                $frase_hola = $obj_lang['d287'];//'Hola';
                $frase2 = $obj_lang['d292'];//Tu contraseña ha sido actualizada con éxito. Pulsa "Entrar" para loguearte con la nueva contraseña.
                $frase3 = $obj_lang['d289'];//'Por seguridad, nunca compartas este enlace con otras personas. Desde Bibleqt en ningún caso te pediremos que lo hagas.';
                $frase_link = $obj_lang['d293'];//'Entrar';
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
                                    href="' .$linkLogin . '" 
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
                        'linkLogin' => $linkLogin,
                        'mensaje' => 'Su contraseña ha sido actualizada con éxito.',
                        'dic_code' => 'd266'
                    ]);
                    //exit;

                }else{//produccion
                    
                    $result_mail = mail($email, $subject, $message_html, $headers);

                    if($result_mail) {
                        //El correo electrónico se envió correctamente.";
                        echo json_encode([
                            'success' => true, 
                            'mail_sent' => true,
                            'mensaje' => 'Su contraseña ha sido actualizada con éxito.',
                            'dic_code' => 'd266'
                        ]);
                    } else {
                        //El correo electrónico NO se envió";
                        echo json_encode([
                            'success' => true, 
                            'mail_sent' => false,
                            'mensaje' => 'Su contraseña ha sido actualizada con éxito.',
                            'dic_code' => 'd266'
                        ]);
                    }
                }

            }else{
                echo json_encode([
                    'success' => false, 
                    'error' => 'Su contraseñaa no se ha actualizado. <br>Error en la consulta.',
                    'dic_code' => 'd272'
                ]);
    
            }

        }else{
            
            //echo "Contraseña incorrecta. Usuario no autenticado.";
            // Autenticación fallida
            echo json_encode([
                'success' => false, 
                'error' => 'la contrasena actual es incorrecta. Los datos no se han actualizado.',
                'dic_code' => 'd234'
            ]);

        }

    } else {
        
        echo json_encode([
            'success' => false, 
            'error' => 'Este correo electrónico no está registrado en nuestro sistema.', 
            'dic_code' => 'd231'
        ]);

    }

}else{
    
    // Establecer la redirección después de 5 segundos
    header("Refresh: 0; url=../aviso.php?m=d256");
    //echo '<p>El método de pasar los parametros no es correcto.</p>';
    return;

}

// mysqli_close($conn);
$conn->close();

?>
