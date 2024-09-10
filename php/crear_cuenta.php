<?php
// Iniciar sesión
session_start();

include('functions.php');
include('includes/connect_db.php');
include('includes/base_url.php');
include('includes/config.php');



/*
//HACER PRUEBAS...
echo json_encode([
    'HACIENDO_PRUEBAS' => 'DESCOMENTAR EN PROD',
    'success' => false, 
    // 'mensaje' => 'Error al registrar el usuario: ' . mysqli_error($conn), 
    'mensaje' => 'Error al registrar el usuario: ',
    'conn_error' => 'aki $conn->error', 
    'dic_code' => 'd238'
]);
exit;
*/


//si los datos NO VIENEN desde el metodo permitido
if (!in_array($_SERVER['REQUEST_METHOD'], $arr_metodos)){
	// Manejar solicitudes incorrectas
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Solicitud incorrecta.',
        'dic_code' => 'd250'
    ]);
    exit;
}



//si los datos SÍ VIENEN desde el metodo permitido
//es lo mismo que => if ($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'GET'){
if (in_array($_SERVER['REQUEST_METHOD'], $arr_metodos)){

    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        // Obtener datos del cuerpo de la solicitud (en formato JSON)
        $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, true);
        //debug($inputJSON, 'inputJSON');

        // Verificar si se recibió correctamente el JSON
        if ($input === null) {
            //echo "Error al procesar el JSON.";
            echo json_encode([
                'success' => false, 
                'error' => 'Error al procesar el JSON.',
                'dic_code' => 'd235'
            ]);
            exit;
        }

        // Obtener usuario y contraseña del cuerpo de la solicitud
        $username = (isset($input['username'])) ? $conn->real_escape_string($input['username']) : '' ;
        $email = (isset($input['email'])) ? $conn->real_escape_string(strtolower($input['email'])) : '' ;
        $password = (isset($input['password'])) ? $input['password'] : '' ;
        $lang = (isset($input['lang'])) ? $input['lang'] : '' ;
    } 

    if($_SERVER['REQUEST_METHOD'] === 'GET'){//para hacer test...
        // Obtener usuario y contraseña del cuerpo de la solicitud
        $username = (isset($_GET['username'])) ? $conn->real_escape_string($_GET['username']) : '' ;
        $email = (isset($_GET['email'])) ? $conn->real_escape_string(strtolower($_GET['email'])) : '' ;
        $password = (isset($_GET['password'])) ? $_GET['password'] : '' ;
        $lang = (isset($_GET['lang'])) ? $_GET['lang'] : '' ;
        //debug($email, 'email');
        //debug($password, 'password');
    }

}


//echo json_encode(['info' => 'aki 1']);
//die();


//Consulta con prepararQuery($conn, $query, $arr_params)
//saco datos de user de la bd.
$checkQuery_init = "SELECT  `username`, `email` 
                    FROM users 
                    WHERE email = '$email'
";
$checkQuery_prep = "SELECT  `username`, `email` 
                    FROM users 
                    WHERE email = ?
";
$arr_params = [$email];
$checkQuery_preparada = prepararQuery($conn, $checkQuery_prep, $arr_params);
$result = $conn->query($checkQuery_preparada);
$result_num_rows = $result->num_rows;
//debug_x($checkQuery_init);
//debug_x($checkQuery_preparada);

//echo_json_x('aki 2');

if ($result_num_rows > 0) {
    //echo "El nombre de usuario o correo electrónico ya está en uso.";
    echo json_encode([
        'success' => false, 
        'error' => 'El correo electrónico ya está en uso.',
        'dic_code' => 'd236'
    ]);
} else {
    // Insertar el nuevo usuario si no existe
    //$salt = bin2hex(random_bytes(22)); // 22 bytes para el salt (176 bits) es aleatorio. al registrar a un usuario debo guardar su salt en la bd.
    $salt = bin2hex(2000);

    // Concatenar el salt con la contraseña y aplicar el hash bcrypt
    $hashedPassword = password_hash($salt . $password, PASSWORD_BCRYPT);
    //echo"<p>$ hashedPassword; $hashedPassword</p>";

    // Obtener la fecha y hora actual
    $created_at = date("Y-m-d H:i:s");

    //inserto en la bd los datos
    $insertQuery_init = "INSERT INTO users (`username`, `password_text`, `password`, `salt`, `email`, `created_at`) 
                        VALUES ('$username', '$password', '$hashedPassword', '$salt', '$email', '$created_at')
    ";
    $insertQuery_prep = "INSERT INTO users (`username`, `password_text`, `password`, `salt`, `email`, `created_at`) 
                        VALUES (?, ?, ?, ?, ?, ?)
    ";
    $arr_params = [$username, $password, $hashedPassword, $salt, $email, $created_at];
    $insertQuery_preparada = prepararQuery($conn, $insertQuery_prep, $arr_params);
    $result_in = $conn->query($insertQuery_preparada);
    //debug_x($insertQuery_init);
    //debug_x($insertQuery_preparada);    

    //echo json_encode(['info' => 'aki 3']);
    //die();

    if($result_in){
        //Cuando se ha creado el usuario, mando un email para que él confirme su correo y así finalice el proceso de creación de su cuenta    
        
        //$username;//ya lo tengo mas arriba
        // Generar un token único y establecer la fecha de expiración
        $emailToken = bin2hex(random_bytes(32));
        $emailTokenExpiry = date('Y-m-d H:i:s', strtotime('+24 hour'));
        
        //Consulta segura preparada
        // Almacenar el token y la fecha de expiración en la base de datos
        $updateQuery = "UPDATE users SET 
                        email_token = ? , 
                        email_token_expiry = ?  
                        WHERE email = ? 
        ";
        $arr_params = [$emailToken, $emailTokenExpiry, $email];
        $updateQuery_preparada = prepararQuery($conn, $updateQuery, $arr_params);
        $result_up = $conn->query($updateQuery_preparada);
        

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
        $subject = $obj_lang['d296'];//"Confirmar el correo electrónico";
        $verifyLink = $baseUrl . "verify_email.php?email=$email&token=$emailToken&lang=$lang";
        //$message = "Para finalizar el proceso de creación de tu cuenta haz clic en el siguiente enlace para confirmar tu correo elecctrónico: $verifyLink";

        $frase_hola = $obj_lang['d287'];//'Hola';
        $frase2 = $obj_lang['d288'];//'Hemos recibido una solicitud para crear la cuenta. Pulsa "Confirmar email" para confirmar tu correo electrónico. Si no has sido tú quien lo ha solicitado, puedes ignorar este mensaje.';
        $frase3 = $obj_lang['d289'];//'Por seguridad, nunca compartas este enlace con otras personas. Desde Bibleqt en ningún caso te pediremos que lo hagas.';
        $frase_link = $obj_lang['d290'];//'Confirmar email';
        $frase_gracias = $obj_lang['d291'];//'Gracias, <br>El equipo de Bibleqt';

        $message_html = '
            <div marginheight="0" marginwidth="0" style="width:100%!important;margin:0;padding:0;background: white;">    
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="margin: 0 auto; max-width: 480px;">
                    <tbody>
                    <tr>
                        <td align="left" style="font-size:0px;padding:32px 44px;word-break:break-word">
                            <div style="font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.4;text-align:left;color:#253238">
                                ' . $frase_hola . ', <b>' . $username . '</b>.
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
                            href="' . $verifyLink . '" 
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
                'verifyLink' => $verifyLink,
                'mensaje' => 'Se ha enviado un enlace de confirmación a tu correo electrónico. Para finalizar el proceso de creación de tu cuenta, pincha sobre el enlace.',
                'dic_code' => 'd284' 
            ]);
            //exit;

        }else{//produccion
            
            $result_mail = mail($email, $subject, $message_html, $headers);

            if ($result_mail) {
                echo json_encode([
                    'success' => true, 
                    'mensaje' => 'Se ha enviado un enlace de confirmación a tu correo electrónico. Para finalizar el proceso de creación de tu cuenta, pincha sobre el enlace.',
                    'dic_code' => 'd284'
                ]);
            } else {
                echo json_encode([
                    'success' => false, 
                    'mensaje' => 'Error al enviar el correo electrónico.',
                    'dic_code' => 'd240'
                ]);
            }
        }
        
        //echo json_encode([
        //    'success' => true, 
        //    'mensaje' => 'Usuario registrado con éxito.',
        //    'dic_code' => 'd237'
        //]);

    } else {
        writeLog("Error al registrar el usuario. Error: [" . $conn->error . "]");
        echo json_encode([
            'success' => false, 
            'mensaje' => 'Error al registrar el usuario: ',
            'conn_error' => $conn->error, 
            'dic_code' => 'd238'
        ]);

    }
}

// Cerrar la conexión
$conn->close();

?>
