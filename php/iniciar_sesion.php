<?php
// Iniciar sesión
session_start();

header('Content-Type: application/json; charset=utf-8');

include('connect_db.php');

// Obtener datos del cuerpo de la solicitud (en formato JSON)
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

// Obtener usuario y contraseña del cuerpo de la solicitud
$email = isset($input['email']) ? $input['email'] : '';
$password = isset($input['password']) ? $input['password'] : '';

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

$email = $conn->real_escape_string(strtolower($email));

//$salt = bin2hex(random_bytes(22)); // 22 bytes para el salt (176 bits) es aleatorio. al registrar a un usuario debo guardar su salt en la bd.
$salt = bin2hex(2000);//32303030 lo mismo que en bd por ahora...

// Concatenar el salt con la contraseña y aplicar el hash bcrypt
$hashedPassword = password_hash($salt . $password, PASSWORD_BCRYPT);
//echo"<p>$ hashedPassword; $hashedPassword</p>";

//saco datos de user de la bd.
$sql = "SELECT `id_user`, `username`, `email`, `is_email_verified`, `password_text`, `password`, `salt` 
        FROM users 
        WHERE BINARY email = '$email' 
";
$result = $conn->query($sql);
//echo json_encode(['info' => $sql]);
//die();

if($result->num_rows > 0){
    // Usuario encontrado, verificar la contraseña
    $row = $result->fetch_assoc();
    $storedId_user = $row["id_user"];//1
    $storedUsername = $row["username"];//Sergio
    $storedEmail = $row["email"];//sergiokovalchuk@gmail.com
    $storedHashedPassword = $row["password"];//123123
    $storedSalt = $row["salt"];//32303030
    $storedIs_email_verified = $row["is_email_verified"];//1 or 0

    //var_dump($row);

    //echo"<hr>$ row<pre>";
    //echo print_r($row);
    //echo"</pre>";

    //echo json_encode(['info' => password_verify($storedSalt . $password, $storedHashedPassword) ]);
    //die();
    
    //funcción password_verify(contraseña_input, contraseña_hasheada_de_bd)
    if(password_verify($storedSalt . $password, $storedHashedPassword)) { 
        //Contraseña correcta! Usuario autenticado

        //verifico si tiene email verificado
        if($storedIs_email_verified){
            $_SESSION['id_user'] = $storedId_user;
            $_SESSION['username'] = $storedUsername;
            $_SESSION['email'] = $storedEmail;

            $fechaHoraActual = date('Y-m-d H:i:s');

            $sql_up = "UPDATE users SET 
                        `last_login` = '$fechaHoraActual'
                        WHERE id_user = '$storedId_user'
            ";
            $result_up = $conn->query($sql_up);

            echo json_encode([
                'success' => true, 
                'email_verificado' => true, 
                'username' => $storedUsername
            ]);
        }else{
            echo json_encode([
                'success' => false,
                'email_verificado' => false,
                'error' => 'El correo electrónico del usuario no está verificado.',
                'dic_code' => 'd243'
            ]);
        }
    
        //echo json_encode([
        //    'success' => true, 
        //    'username' => $storedUsername
        //]);

    }else{
        
        //Contraseña incorrecta. Usuario no autenticado.
        // Autenticación fallida
        echo json_encode([
            'success' => false,
            'error' => 'Contrasena incorrecta',
            'dic_code' => 'd243'
        ]);

    }
    
}else{
    
    //echo "Usuario no encontrado.";
    // Autenticación fallida
    echo json_encode([
        'success' => false, 
        'error' => 'Usuario no encontrado',
        'dic_code' => 'd244'
    ]);

}

$conn->close();

?>
