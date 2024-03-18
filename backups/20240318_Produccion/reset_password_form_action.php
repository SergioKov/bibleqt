<?php
include('connect_db.php');
//echo "<p>1. estoy aki";

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
        echo json_encode(['success' => false, 'error' => 'No existen los datos necesarios para hacer la comprobación']);
        return; 
    }

    //saco datos de user de la bd.
    $sql = "SELECT * 
            FROM users 
            WHERE email = '$email' 
    ";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Usuario encontrado, le permito guardar nueva contraseña
        //$salt = bin2hex(random_bytes(22)); // 22 bytes para el salt (176 bits) es aleatorio. al registrar a un usuario debo guardar su salt en la bd.
        $salt = bin2hex(2000);

        // Concatenar el salt con la contraseña y aplicar el hash bcrypt
        $hashedPassword = password_hash($salt . $password, PASSWORD_BCRYPT);
        //echo"<p>$ hashedPassword; $hashedPassword</p>";
        
        $password = mysqli_real_escape_string($conn, $password);

        // Actualizar la contraseña y borrar el token
        $updateQuery = "UPDATE users 
                        SET password = '$hashedPassword', password_text = '$password', salt = '$salt', reset_token = NULL, reset_token_expiry = NULL 
                        WHERE email = '$email' AND reset_token = '$token'
        ";
        mysqli_query($conn, $updateQuery);

        //echo "Contraseña restablecida con éxito.";
        echo json_encode(['success' => true, 'mensaje' => 'Contraseña restablecida con éxito.']);

    }else{
        echo json_encode(['success' => false, 'mensaje' => 'No existe usuario con el email ' . $email]);
    }

}else{
    //echo "<p>else. REQUEST_METHOD";
    echo json_encode(['success' => false, 'error' => 'REQUEST_METHOD no es correcto']);
}

mysqli_close($conn);
?>
