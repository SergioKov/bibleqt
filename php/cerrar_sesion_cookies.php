<?php
session_start();

include('functions.php');

writeLog("Sesión cerrada rechazando cookies.");


// Si se desea destruir la sesión completamente, también eliminar la cookie de sesión
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}


// Limpiar la cookie de sesión
//setcookie(session_name(), "", time() - 3600, "/");

session_unset(); // Elimina todas las variables de sesión
session_destroy(); // Destruye la sesión

echo json_encode([
    'cerrada' => true
]);

?>
