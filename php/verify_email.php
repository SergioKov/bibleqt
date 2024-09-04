<?php

include('connect_db.php');
include('base_url.php');
include('functions.php');

//debug_x("file: /php/verify_email.php");




if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    
    //debug($_GET);
    //exit();
    
    // Escapar el valor de $_GET['email'] para evitar inyecciones SQL
    $email = (isset($_GET['email'])) ? $conn->real_escape_string(strtolower($_GET['email'])) : '' ;
    $token = (isset($_GET['token'])) ? $conn->real_escape_string($_GET['token']) : '' ;
    $lang = (isset($_GET['lang'])) ? $conn->real_escape_string($_GET['lang']) : '' ;

    if($email == '' || $token == ''){
        // Establecer la redirección después de 5 segundos
        header("Refresh: 0; url=../aviso.php?m=d281");
        //echo '<p>Email o token vacios. <br>Para confirmar tu correo electrónico son imprescindibles estos datos.</p>';
        return;
    }
    
    // Verificar si el correo electrónico y el token son válidos
    $checkQuery = "SELECT * 
                    FROM users 
                    WHERE email = '$email' AND email_token = '$token'
    ";
    $result = $conn->query($checkQuery);

    //debug_x($checkQuery);

    if($result->num_rows > 0){
         $row = $result->fetch_assoc();

        //verifico si todavía no han pasado 24 horas desde inicio de creacion de cuenta        
        $now = date('Y-m-d H:i:s');

        //si la fecha de caducidad de email_token es posterior a ahora...
        if($row['email_token_expiry'] > $now){//sql equivalente => 'AND email_token_expiry > NOW()'
            //todo ok. todavia no han pasado los 24 horas desde inicio de creación de cuenta. le dejo continuar

            // Actualizar email_token y borrar el token
            $updateQuery = "UPDATE users SET 
                            is_email_verified = 1,
                            email_token = NULL, 
                            email_token_expiry = NULL 
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

        }else{
            //demasiado tarde. elimino el registro del usuario y le pido registrarse de nuevo
            // Actualizar email_token y borrar el token
            $deleteQuery = "DELETE FROM users 
                            WHERE email = '$email' AND email_token = '$token'
            ";
            $result_del = $conn->query($deleteQuery);

            if($result_del){
                $dic_code = 'd299';//Ha pasado más de 24 horas desde el inicio del proceso de creación de tu cuenta. Tu email no ha sido confirmado a tiempo y tu cuenta no se ha creado. Vuelve a crear tu cuenta de nuevo por favor.

                // Establecer la redirección después de 5 segundos
                header("Refresh: 0; url=../aviso.php?m=d299");                

            }else{
                $dic_code = 'd300';//Ha ocurrido un error al crear tu cuenta. Ponte en contacto con el administrador de Bibleqt.

                // Establecer la redirección después de 5 segundos
                header("Refresh: 0; url=../aviso.php?m=d300");
            }
        }

    } else {
        
        // Establecer la redirección después de 5 segundos
        header("Refresh: 0; url=../aviso.php?m=d283");
        //echo '<p>Enlace no válido. <br>Intenta confirmar tu correo electrónico de nuevo por favor.</p>'; 
    }
}

// mysqli_close($conn);
$conn->close();

?>
