<?php
// Iniciar sesión
session_start();

include('connect_db.php');
include('base_url.php');

function debug($variable){
    echo"<pre>";
    var_dump($variable);
    echo"</pre>";
}


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



if($_SERVER['REQUEST_METHOD'] == 'GET'){
    
    // Obtener usuario y contraseña del cuerpo de la solicitud
    $username = (isset($_GET['username'])) ? $conn->real_escape_string($_GET['username']) : '' ;
    $email = (isset($_GET['email'])) ? $conn->real_escape_string(strtolower($_GET['email'])) : '' ;
    $password = (isset($_GET['password'])) ? $_GET['password'] : '' ;
    $lang = (isset($_GET['lang'])) ? $_GET['lang'] : '' ;

    debug($_GET);
    //exit;

}else{//input

    // Obtener datos del cuerpo de la solicitud (en formato JSON)
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, true);

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

//echo json_encode(['info' => 'aki 1']);
//die();




$modo = 'simple';//modo1. simple
//$modo = 'seguro'; //modo 2. seguro no funciona en HOSTALIA 

if($modo == 'simple'){
    //antes con consulta simple => $conn->query($checkQuery)
    //saco datos de user de la bd.
    $checkQuery  = "SELECT  `username`, `email` 
            FROM users 
            WHERE email = '$email'
    ";
    $result = $conn->query($checkQuery);
}


if($modo == 'seguro'){
    //con la consulta segura, preparando los parémetros
    $checkQuery = "SELECT `username`, `email` 
                    FROM users 
                    WHERE email = ?
    ";

    // Preparar la consulta SQL con parámetros
    $stmt = $conn->prepare($checkQuery);
    if ($stmt === false) {
        die("Error en la preparación de la consulta: " . $conn->error);
    }

    // Vincular los parámetros con diferentes tipos de datos
    //$stmt->bind_param("sis", $name, $age, $registration_date);//ejemplo si hay varios parametros...
    $stmt->bind_param("s", $email);

    // 's' => string
    // 'i' => integer
    // 's' => string (las fechas se manejan como strings en este caso)

    // Ejecutar la consulta
    $stmt->execute();

    // Obtener el resultado
    $result = $stmt->get_result();//->get_result() se usa solo con 'SELECT' no funciona en Hostalia
    $stmt->close();//cerrar la declaración
}


//echo json_encode(['info' => 'aki 2']);
//die();

if ($result->num_rows > 0) {
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

    
    if($modo == 'simple'){
        //modo 1. simple
        $insertQuery = "INSERT INTO users (`username`, `password_text`, `password`, `salt`, `email`, `created_at`) 
                    VALUES ('$username', '$password', '$hashedPassword', '$salt', '$email', '$created_at')
        ";
        $result_in = $conn->query($insertQuery);
        //echo "$insertQuery";
        //exit;
    }
    

    if($modo == 'seguro'){
        //modo 2. seguro
        $insertQuery = "INSERT INTO users (`username`, `password_text`, `password`, `salt`, `email`, `created_at`) 
                        VALUES (?, ?, ?, ?, ?, ?)
        ";//VALUES ('$username', '$password', '$hashedPassword', '$salt', '$email', '$created_at')

        //$params = array($username, $password, $hashedPassword, $salt, $email, $created_at);
        //echo interpolateQuery($insertQuery, $params);
        //exit;

        // Preparar la consulta SQL con parámetros
        $stmt = $conn->prepare($insertQuery);
        if ($stmt === false) {
            die("Error en la preparación de la consulta: " . $conn->error);
        }

        // Vincular los parámetros con diferentes tipos de datos
        $stmt->bind_param("ssssss", $username, $password, $hashedPassword, $salt, $email, $created_at);
        
        // Ejecutar la consulta
        $stmt->execute();

        // Obtener el resultado
        $result_in = $stmt->affected_rows;//$stmt->get_result() se usa solo con 'SELECT';
        $stmt->close();//cerrar la declaración
    }

    //echo json_encode(['info' => 'aki 3']);
    //die();

    if ($result_in) {
        //Cuando se ha creado el usuario, mando un email para que él confirme su correo y así finalice el proceso de creación de su cuenta    
        
        //$username;//ya lo tengo mas arriba
        // Generar un token único y establecer la fecha de expiración
        $emailToken = bin2hex(random_bytes(32));
        
        //modo 2. Consulta segura
        // Almacenar el token y la fecha de expiración en la base de datos
        $updateQuery = "UPDATE users SET 
                        email_token = ? 
                        WHERE email = ? 
        ";
        $stmt = $conn->prepare($updateQuery);
        $stmt->bind_param("ss", $emailToken, $email);
        $stmt->execute();
        $result_up = $stmt->affected_rows;
        $stmt->close();        
        

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
        $verifyLink = $baseUrl . "verify_email.php?email=$email&token=$emailToken";
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


//=====================================================================================//
// FUNCTIONS - START
//=====================================================================================//
function interpolateQuery($query, $params) {//$params es un array
    // Dividir la consulta en partes utilizando '?' como delimitador
    $parts = explode('?', $query);
    $final_query = '';
    
    // Iterar sobre las partes y los parámetros
    for ($i = 0; $i < count($parts); $i++) {
        $final_query .= $parts[$i];
        
        // Añadir el valor del parámetro si existe
        if (isset($params[$i])) {
            $value = $params[$i];
            
            // Determinar el tipo de dato y formatear adecuadamente
            if (is_int($value) || is_float($value)) {
                $final_query .= $value;
            } elseif (is_null($value)) {
                $final_query .= 'NULL';
            } else {
                // Escapar caracteres especiales para cadenas
                $escaped = addslashes($value);
                $final_query .= "'" . $escaped . "'";
            }
        }
    }
    
    return $final_query;
}
//=====================================================================================//
// FUNCTIONS - END
//=====================================================================================//

?>
