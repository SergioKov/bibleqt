<?php
include('connect_db.php');
echo "<p>1. estoy aki";


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    echo "<p>estoy aki";
    exit;
    
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $token = mysqli_real_escape_string($conn, $_POST['token']);
    $newPassword = password_hash($_POST['new_password'], PASSWORD_DEFAULT);

    // Actualizar la contraseña y borrar el token
    $updateQuery = "UPDATE users SET password = '$newPassword', reset_token = NULL, reset_token_expiry = NULL WHERE email = '$email' AND reset_token = '$token'";
    mysqli_query($conn, $updateQuery);

    echo "Contraseña restablecida con éxito.";
}else{
    echo "<p>else. REQUEST_METHOD";

}

mysqli_close($conn);
?>
