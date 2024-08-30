<?php
// Iniciar la sesión
session_start();

// Llamada a la función de verificación de autenticación
if(verificarAutenticacion()){
    
    http_response_code(200); // OK
    echo json_encode([
        'mensaje' => 'php -> El usuario está autenticado.'
    ]);

} else {
    
    http_response_code(401); // No autorizado
    echo json_encode([
        'mensaje' => 'php -> El usuario no está autenticado.'
    ]);

}

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
