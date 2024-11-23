<?php
// Iniciar sesión
session_start();

header('Content-Type: application/json; charset=utf-8');

include('functions.php');
include('includes/connect_db.php');
include('includes/config.php');


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

        // Obtener usuario y contraseña del cuerpo de la solicitud
        $email = isset($input['email']) ? $input['email'] : '';
        $password = isset($input['password']) ? $input['password'] : '';
    } 

    if($_SERVER['REQUEST_METHOD'] === 'GET'){//para hacer test...
        // Obtener usuario y contraseña del cuerpo de la solicitud
        $email = isset($_GET['email']) ? $_GET['email'] : '';
        $password = isset($_GET['password']) ? $_GET['password'] : '';
        //debug($email, 'email');
        //debug($password, 'password');
    }
}


if($email == '' && $password == ''){
    echo json_encode([
        'success' => false, 
        'error' => 'Email y contraseña vacios',
        'dic_code' => 'd241'
    ]);
    return;
}
if($email == '' || $password == ''){
    echo json_encode([
        'success' => false, 
        'error' => 'Email o contraseña vacios',
        'dic_code' => 'd242'
    ]);
    return;
}

//exit('aki');

$email = $conn->real_escape_string(strtolower($email));

//$salt = bin2hex(random_bytes(22)); // 22 bytes para el salt (176 bits) es aleatorio. al registrar a un usuario debo guardar su salt en la bd.
$salt = bin2hex(2000);//32303030 lo mismo que en bd por ahora...

// Concatenar el salt con la contraseña y aplicar el hash bcrypt
$hashedPassword = password_hash($salt . $password, PASSWORD_BCRYPT);
//echo"<p>$ hashedPassword; $hashedPassword</p>";

//saco datos de user de la bd.
$sql_init = "SELECT `id_user`, `username`, `email`, `is_email_verified`, `password_text`, `password`, `salt` 
            FROM users 
            WHERE BINARY email = '$email' 
";
$sql_prep = "SELECT `id_user`, `username`, `email`, `is_email_verified`, `password_text`, `password`, `salt` 
            FROM users 
            WHERE BINARY email = ? 
";
$arr_params = [$email];
$sql_preparada = prepararQuery($conn, $sql_prep, $arr_params);
$result = $conn->query($sql_preparada);
//debug_x($sql_init);
//debug_x($sql_preparada);


if($result->num_rows > 0){
    // Usuario encontrado, verificar la contraseña
    $row = $result->fetch_assoc();
    $storedId_user = $row["id_user"];//1
    $storedUsername = $row["username"];//Sergio
    $storedEmail = $row["email"];//sergiokovalchuk@gmail.com
    $storedHashedPassword = $row["password"];//123123
    $storedSalt = $row["salt"];//32303030
    $storedIs_email_verified = $row["is_email_verified"];//1 or 0


    //verifico si tiene email verificado
    if(!$storedIs_email_verified){
        echo json_encode([
            'success' => false,
            'email_verificado' => false,
            'error' => 'El correo electrónico del usuario no está verificado. Revisa tu email y pincha sobre el enlace enviado para verificarlo. Después de hacerlo podrás iniciar sesión.',
            'dic_code' => 'd298'
        ]);
        exit;
    }

    //debug($row);
    //debug_r($row);
    //echo_json_x(password_verify($storedSalt . $password, $storedHashedPassword), 'password_verify()');
    
    //funcción password_verify(contraseña_input, contraseña_hasheada_de_bd)
    if(password_verify($storedSalt . $password, $storedHashedPassword)) { 
        //Contraseña correcta! Usuario autenticado

        //verifico si tiene email verificado
        if($storedIs_email_verified){
            $_SESSION['id_user'] = $storedId_user;
            $_SESSION['username'] = $storedUsername;
            $_SESSION['email'] = $storedEmail;

            $fechaHoraActual = date('Y-m-d H:i:s');

            //aki no preparo la consulta ya que los datos son seguros porque son sacados de la bd
            $sql_up = "UPDATE users SET 
                        `last_login` = '$fechaHoraActual'
                        WHERE id_user = '$storedId_user'
            ";
            $result_up = $conn->query($sql_up);

            writeLog("Sesion iniciada correctamente. email: [" . $email . "] password: [" . $password . "]");

            echo json_encode([
                'success' => true, 
                'email_verificado' => true, 
                'username' => $storedUsername,
                            'id_user' => $storedId_user //luego quitar
            ]);
        }
    
        //echo json_encode([
        //    'success' => true, 
        //    'username' => $storedUsername
        //]);

    }else{
        
        //Contraseña incorrecta. Usuario no autenticado.
        writeLog("Contrasena incorrecta. email: [" . $email . "] password: [" . $password . "]");

        // Autenticación fallida
        echo json_encode([
            'success' => false,
            'error' => 'Contrasena incorrecta',
            'dic_code' => 'd243'
        ]);

    }
    
}else{
    
    //echo "Usuario no encontrado.";
    writeLog("Usuario no encontrado. email: [" . $email . "]");

    // Autenticación fallida
    echo json_encode([
        'success' => false, 
        'error' => 'Usuario no encontrado',
        'dic_code' => 'd244'
    ]);

}

$conn->close();

?>
