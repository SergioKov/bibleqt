<?php

include('functions.php');
include('includes/connect_db.php');
include('includes/base_url.php');

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
    $checkQuery_init = "SELECT * 
                        FROM users 
                        WHERE email = '$email' AND email_token = '$token'
    ";
    $checkQuery_prep = "SELECT * 
                        FROM users 
                        WHERE email = ? AND email_token = ? 
    ";
    $arr_params = [$email, $token];
    $checkQuery_preparada = prepararQuery($conn, $checkQuery_prep, $arr_params);
    $result = $conn->query($checkQuery_preparada);
    //debug_x($checkQuery_preparada, 'checkQuery_preparada');


    if($result->num_rows > 0){
         $row = $result->fetch_assoc();

        //verifico si todavía no han pasado 24 horas desde inicio de creacion de cuenta        
        $now = date('Y-m-d H:i:s');

        //si la fecha de caducidad de email_token es posterior a ahora...
        if($row['email_token_expiry'] > $now){//sql equivalente => 'AND email_token_expiry > NOW()'
            //todo ok. todavia no han pasado los 24 horas desde inicio de creación de cuenta. le dejo continuar

            // Actualizar email_token y borrar el token
            //aki no hago consulta preparada ya que datos son seguras
            $updateQuery = "UPDATE users SET 
                            is_email_verified = 1,
                            email_token = NULL, 
                            email_token_expiry = NULL 
                            WHERE email = '$email' AND email_token = '$token'
            ";
            $result_up = $conn->query($updateQuery);
            //debug_x($updateQuery);

            if($result_up){
                $dic_code = 'd282';//Tu email ha sido verificado correctamente. Tu cuenta se ha creado con éxito.
                writeLog("Email verificado con éxito. email: [" . $email . "]");
                
            }else{
                $dic_code = 'd285';//Tu email no ha sido verificado. Intenta de nuevo.
                writeLog("Email no verificado. email: [" . $email . "]");
            }
            
            $location = "Location: " . $protocol . "://" . $host . "/aviso.php?m=$dic_code";
            //echo "<br>$ location: $location";
            //exit();
            
            // Puedes redirigir al usuario a un aviso
            header($location);

        }else{
            
            //demasiado tarde. elimino el registro del usuario y le pido registrarse de nuevo
            // Eliminar el registro de usuario
            $deleteQuery = "DELETE FROM users 
                            WHERE email = '$email' AND email_token = '$token'
            ";
            $result_del = $conn->query($deleteQuery);

            if($result_del){
                $dic_code = 'd299';//Ha pasado más de 24 horas desde el inicio del proceso de creación de tu cuenta. Tu email no ha sido confirmado a tiempo y tu cuenta no se ha creado. Vuelve a crear tu cuenta de nuevo por favor.
                writeLog("El usuario eliminado de la bd por superar 24 horas para l averificación. email: [" . $email . "]");


                // Establecer la redirección después de 5 segundos
                header("Refresh: 0; url=../aviso.php?m=d299");                

            }else{
                $dic_code = 'd300';//Ha ocurrido un error al crear tu cuenta. Ponte en contacto con el administrador de Bibleqt.

                writeLog("Error d300 al crear la cuenta.");

                // Establecer la redirección después de 5 segundos
                header("Refresh: 0; url=../aviso.php?m=d300");
            }
        }

    } else {

        writeLog("Error d283 al crear la cuenta. Enlace no válido.");

        // Establecer la redirección después de 5 segundos
        header("Refresh: 0; url=../aviso.php?m=d283");
        //echo '<p>Enlace no válido. <br>Intenta confirmar tu correo electrónico de nuevo por favor.</p>'; 
    }
}

// mysqli_close($conn);
$conn->close();

?>
