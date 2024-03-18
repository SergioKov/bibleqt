<?php
session_start();

// Limpiar la cookie de sesión
setcookie(session_name(), "", time() - 3600, "/");

session_unset(); // Elimina todas las variables de sesión
session_destroy(); // Destruye la sesión

echo json_encode(['cerrada' => true]);
?>
