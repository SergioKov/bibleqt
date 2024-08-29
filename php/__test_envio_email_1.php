<?php
$para = "sergiokovalchuk@gmail.com";
$asunto = "Prueba de correo electrónico";
$mensaje = "Este es un mensaje de prueba.";
$from_email = "sergiokovalchuk@gmail.com";
$reply_to_email = "sergiokovalchuk@gmail.com";

// Для отправки HTML-письма должен быть установлен заголовок Content-type
$headers  = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type: text/plain; charset=\"utf-8\"" . "\r\n";
$headers .= "From: mitest - YOOOO <$from_email>" . "\r\n"; 
$headers .= "Reply-To: Sergio <$reply_to_email>" . "\r\n"; 

try {
    $result = mail($para, $asunto, $mensaje, $headers);

    if ($result) {
        echo "1. El correo electrónico se envió correctamente.";
    } else {
        echo "2. Error al enviar el correo electrónico.";
    }

} catch (\Throwable $th) {
    //throw $th;
    echo $th;
}


?>