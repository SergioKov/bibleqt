<?php
// Iniciar la sesión
session_start();

// Llamada a la función de verificación de autenticación
if(verificarAutenticacion()){
    
    http_response_code(200); // OK
    $data = [
        'mensaje' => 'php -> El usuario está autenticado.',
        '$ _SESSION[id_user]' => $_SESSION['id_user'],//luego comentar
        '$ _SESSION' => json_encode($_SESSION)//luego comentar
    ];

} else {
    
    http_response_code(401); // No autorizado
    $data = [
        'mensaje' => 'php -> El usuario no está autenticado.'
    ];

}

echo json_encode($data);//siempre devuelvo $data. esta linea es importante!

//verificarAutenticacion();

// Función para verificar la autenticación
function verificarAutenticacion() {
    // Verificar si el usuario está autenticado
    if(isset($_SESSION['id_user'])){
        return true;
    }else{
        return false;
    }
}

?>
