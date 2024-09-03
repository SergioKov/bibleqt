<?php

include('connect_db.php');
include('base_url.php');

//echo "file: /php/verify_email.php";
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
        header("Refresh: 0; url=../aviso.php?m=d281");
        //echo '<p>Email o token vacios. <br>Para confirmar tu correo electrónico son imprescindibles estos datos.</p>';
        return;
    }
    
    // Verificar si el correo electrónico y el token son válidos
    $checkQuery = "SELECT * 
                    FROM users 
                    WHERE email = '$email' 
                    AND email_token = '$token'
    ";
    $result = $conn->query($checkQuery);

    //debug($checkQuery);
    //exit();

    if($result->num_rows > 0){
         
        // Actualizar email_token y borrar el token
        $updateQuery = "UPDATE users SET 
                        is_email_verified = 1,
                        email_token = NULL 
                        WHERE email = '$email' AND email_token = '$token'
        ";
        $result_up = $conn->query($updateQuery);

        //debug($updateQuery);
        //exit();

        if($result_up){
            $dic_code = 'd282';//Tu email ha sido verificado correctamente. Tu cuenta se ha creado con éxito.
        }else{
            $dic_code = 'd285';//Tu email no ha sido verificado. Intenta de nuevo.
        }
        
        $location = "Location: " . $protocol . "://" . $host . "/aviso.php?m=$dic_code";
        //echo "<br>$ location: $location";
        //exit();
        
        // Puedes redirigir al usuario a un aviso
        header($location);

    } else {
        
        // Establecer la redirección después de 5 segundos
        header("Refresh: 0; url=../aviso.php?m=d283");
        //echo '<p>Enlace no válido. <br>Intenta confirmar tu correo electrónico de nuevo por favor.</p>'; 
    }
}

// mysqli_close($conn);
$conn->close();

?>
