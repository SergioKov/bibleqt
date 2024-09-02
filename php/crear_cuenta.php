<?php
// Iniciar sesión
session_start();

include('connect_db.php');


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

/*
//antes con consulta simple => $conn->query($checkQuery)
//saco datos de user de la bd.
$checkQuery  = "SELECT  `username`, `email` 
        FROM users 
        WHERE email = '$email'
";
$result = $conn->query($checkQuery);
*/


//con la consulta segura, preparando los parémetros
$checkQuery  = "SELECT  `username`, `email` 
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
$result = $stmt->get_result();
$stmt->close();//cerrar la declaración

if (/*mysqli_num_rows($result) > 0*/ $result->num_rows > 0) {
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

    /*    
    //modo 1. simple
    $insertQuery = "INSERT INTO users (`username`, `password_text`, `password`, `salt`, `email`, `created_at`) 
                    VALUES ('$username', '$password', '$hashedPassword', '$salt', '$email', '$created_at')
    ";
    $result_in = $conn->query($insertQuery);
    */

    //modo 2. seguro
    $insertQuery = "INSERT INTO users (`username`, `password_text`, `password`, `salt`, `email`, `created_at`) 
                    VALUES (?, ?, ?, ?, ?, ?)
    ";//VALUES ('$username', '$password', '$hashedPassword', '$salt', '$email', '$created_at')

    // Preparar la consulta SQL con parámetros
    $stmt = $conn->prepare($insertQuery);
    if ($stmt === false) {
        die("Error en la preparación de la consulta: " . $conn->error);
    }

    // Vincular los parámetros con diferentes tipos de datos
    $stmt->bind_param("ssssss", $username, $password, $hashedPassword, $salt, $email, $created_atl);
    
    // Ejecutar la consulta
    $stmt->execute();

    // Obtener el resultado
    $result_in = $stmt->get_result();
    $stmt->close();//cerrar la declaración

    if ($result_in) {
        echo json_encode([
            'success' => true, 
            'mensaje' => 'Usuario registrado con éxito.',
            'dic_code' => 'd237'
        ]);
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

?>
