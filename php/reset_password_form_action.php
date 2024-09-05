<?php
include('connect_db.php');
include('functions.php');

//echo "<p>1. estoy aki";


/*
//HACER PRUEBAS...
echo json_encode([
    'HACIENDO_PRUEBAS' => 'DESCOMENTAR EN PROD', 
    'success' => false, 
    'error' => 'El método de pasar los parametros no es correcto.',
    'dic_code' => 'd256'
]);
exit;
*/


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    //echo "<p>estoy aki";
    //exit;

    // Obtener datos del cuerpo de la solicitud (en formato JSON)
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, true);

    // Obtener usuario y contraseña del cuerpo de la solicitud
    $email = isset($input['email']) ? $input['email'] : '';
    $token = isset($input['token']) ? $input['token'] : '';
    $password = isset($input['password']) ? $input['password'] : '';

    if($email == '' || $token == '' || $password == ''){
        echo json_encode([
            'success' => false, 
            'error' => 'No hay todos los parametros necesarios.',
            'dic_code' => 'd251'
        ]);
        return; 
    }

    $email = $conn->real_escape_string(strtolower($email));
    $token = $conn->real_escape_string($token);

    //saco datos de user de la bd.
    $sql_init = "SELECT * 
                FROM users 
                WHERE email = '$email' 
    ";
    $sql_prep = "SELECT * 
                FROM users 
                WHERE email = ? 
    ";
    $arr_params = [$email];
    $sql_preparada = prepararQuery($conn, $sql_prep, $arr_params);
    $result = $conn->query($sql_preparada);
    //debug_x($sql_preparada, 'sql_preparada');

    if($result->num_rows > 0){
        // Usuario encontrado, le permito guardar nueva contraseña
        //$salt = bin2hex(random_bytes(22)); // 22 bytes para el salt (176 bits) es aleatorio. al registrar a un usuario debo guardar su salt en la bd.
        $salt = bin2hex(2000);

        // Concatenar el salt con la contraseña y aplicar el hash bcrypt
        $hashedPassword = password_hash($salt . $password, PASSWORD_BCRYPT);
        //echo"<p>$ hashedPassword; $hashedPassword</p>";
        
        $password = $conn->real_escape_string($password);

        // Actualizar la contraseña y borrar el token
        //aki no hago consulta preparada ya que los datos son de bd y son correctos
        $updateQuery = "UPDATE users SET 
                        password = '$hashedPassword', 
                        password_text = '$password', 
                        salt = '$salt', 
                        reset_token = NULL, 
                        reset_token_expiry = NULL 
                        WHERE email = '$email' AND reset_token = '$token'
        ";
        $result_up = $conn->query($updateQuery);

        if($result_up){
            echo json_encode([
                'success' => true, 
                'mensaje' => 'La contraseña ha sido restablecida con éxito.',
                'dic_code' => 'd253'
            ]);
        }else{
            echo json_encode([
                'success' => false, 
                'mensaje' => 'la Contraseña no se ha restablecido. Error en la consulta.',
                'dic_code' => 'd254'
            ]);
        }

    }else{
        echo json_encode([
            'success' => false, 
            'mensaje' => 'No existe usuario con el email introducido.',
            'dic_code' => 'd255'
        ]);
    }

}else{
    
    echo json_encode([
        'success' => false, 
        'error' => 'El método de pasar los parametros no es correcto.',
        'dic_code' => 'd256'
    ]);
    
}

$conn->close();

?>
