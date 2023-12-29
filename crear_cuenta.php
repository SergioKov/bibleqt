<?php
// Iniciar sesión
session_start();

include('connect_db.php');


// Obtener datos del cuerpo de la solicitud (en formato JSON)
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);


// Verificar si se recibió correctamente el JSON
if ($input === null) {
    //echo "Error al procesar el JSON.";
    echo json_encode(['success' => false, 'error' => 'Error al procesar el JSON.']);
    exit;
}

// Obtener usuario y contraseña del cuerpo de la solicitud
$username = isset($input['username']) ? mysqli_real_escape_string($conn, $input['username']) : '';
$password = isset($input['password']) ? $input['password'] : '';
$email = isset($input['email']) ? mysqli_real_escape_string($conn, $input['email']) : '';


//saco datos de user de la bd.
$checkQuery  = "SELECT  `username`, `email` 
        FROM users 
        WHERE username = '$username' OR email = '$email'
";
$result = $conn->query($checkQuery );


if (mysqli_num_rows($result) > 0) {
    //echo "El nombre de usuario o correo electrónico ya está en uso.";
    echo json_encode(['success' => false, 'error' => 'El nombre de usuario o correo electrónico ya está en uso.']);
} else {
    // Insertar el nuevo usuario si no existe
    //$salt = bin2hex(random_bytes(22)); // 22 bytes para el salt (176 bits) es aleatorio. al registrar a un usuario debo guardar su salt en la bd.
    $salt = bin2hex(2000);

    // Concatenar el salt con la contraseña y aplicar el hash bcrypt
    $hashedPassword = password_hash($salt . $password, PASSWORD_BCRYPT);
    //echo"<p>$ hashedPassword; $hashedPassword</p>";

    // Obtener la fecha y hora actual
    $created_at = date("Y-m-d H:i:s");
    
    $insertQuery = "INSERT INTO users (`username`, `password_text`, `password`, `salt`, `email`, `created_at`) 
                    VALUES ('$username', '$password', '$hashedPassword', '$salt','$email', '$created_at')
    ";

    if (mysqli_query($conn, $insertQuery)) {
        //echo "Usuario registrado con éxito.";
        echo json_encode(['success' => true, 'mensaje' => 'Usuario registrado con éxito.']);
    } else {
        //echo "Error al registrar el usuario: " . mysqli_error($conn);
        echo json_encode(['success' => false, 'mensaje' => 'Error al registrar el usuario: ' . mysqli_error($conn) ]);
    }
}


//mysqli_close($conn);



$conn->close();


?>
