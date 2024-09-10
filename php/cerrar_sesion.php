<?php
session_start();

include('functions.php');

// Limpiar la cookie de sesión
setcookie(session_name(), "", time() - 3600, "/");

writeLog("Sesión cerrada. email: [" . $_SESSION['email'] . "]");

session_unset(); // Elimina todas las variables de sesión
session_destroy(); // Destruye la sesión

echo json_encode([
    'cerrada' => true
]);
?>
