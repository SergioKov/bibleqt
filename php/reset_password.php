<?php

include('connect_db.php');
include('base_url.php');

//echo "file: /php/reset_password.php";
//die();

function debug($variable){
    echo"<pre>";
    var_dump($variable);
    echo"</pre>";
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    
    //debug($_GET);
    //exit();
    
    // Escapar el valor de $_GET['email'] para evitar inyecciones SQL
    $email = (isset($_GET['email'])) ? $conn->real_escape_string(strtolower($_GET['email'])) : '' ;
    $token = (isset($_GET['token'])) ? $conn->real_escape_string($_GET['token']) : '' ;

    if($email == '' || $token == ''){
        // Establecer la redirección después de 5 segundos
        header("Refresh: 0; url=../aviso.php?m=d258");
        //echo '<p>Email o token vacios. <br>Para restablecer la contraseña son imprescindibles estos datos.</p>';
        return;
    }
    
    // Verificar si el correo electrónico y el token son válidos
    $checkQuery = "SELECT * 
                    FROM users 
                    WHERE email = '$email' 
                    AND reset_token = '$token' 
                    AND reset_token_expiry > NOW()
    ";
    // $result = mysqli_query($conn, $checkQuery);
    $result = $conn->query($checkQuery);

    if(/*mysqli_num_rows($result) > 0*/ $result->num_rows > 0){
                
        $location = "Location: " . $protocol . "://" . $host . "/reset_password_form.php?email=$email&token=$token";
        //echo "<br>$ location: $location";
        //exit();
        
        //echo "<br>1. redirijo a ...";
        //echo "<br>$location";
        //die();
        
        // Permitir al usuario restablecer la contraseña
        // Puedes redirigir al usuario a un formulario para ingresar la nueva contraseña
        header($location);

    } else {
        
        // Establecer la redirección después de 5 segundos
        header("Refresh: 0; url=../aviso.php?m=d260");
        //echo '<p>Enlace no válido o expirado. <br>Intenta recuperar la contraseña de nuevo por favor.</p>'; 
    }
}

// mysqli_close($conn);
$conn->close();

?>
