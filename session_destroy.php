<?php 

// Iniciar la sesión
session_start();

// Limpiar la cookie de sesión
setcookie(session_name(), "", time() - 3600, "/");

session_unset(); // Elimina todas las variables de sesión

$status_sess = session_destroy();// Destruye la sesión

if($status_sess){
    echo "session destroed";
}else{
    echo "session NO destroed";
}

// Redirigir o realizar cualquier otra acción después de destruir la sesión
//header("Location: index.php?session_destroed_with_exit"); // Cambia "index.php" al nombre de la página a la que deseas redirigir

// Asegurarse de que no haya más código ejecutándose después de la redirección
exit();



?>