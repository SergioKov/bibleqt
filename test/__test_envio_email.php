<?php

$para = "sergbas2001@gmail.com,sergiokovalchuk@gmail.com";
$asunto = "Prueba de correo electrónico 4";
$mensaje = "Este es un <b>mensaje de prueba en negrita</b>. <h3>envio</h3> a 2 emails separados por coma. Prueba de correo electrónico 444 desde el fichero: <b>https://bibleqt.es/__test_envio_email.php</b>";


echo "<p>$ para: $para";
echo "<p>$ asunto: $asunto";
echo "<p>$ mensaje: $mensaje";


// Для отправки HTML-письма должен быть установлен заголовок Content-type
$headers  = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";
$headers .= "From: Bibleqt <contact@bibleqt.es>" . "\r\n"; 
$headers .= "Reply-To: Sergio <contact@bibleqt.es>" . "\r\n"; 


echo "<pre>$ headers:<br> $headers </pre>";

try {
    $result = mail($para, $asunto, $mensaje, $headers);

    if ($result) {
        echo "<p>(if). El correo electrónico se envió correctamente.";
    } else {
        echo "<p>(else). Error al enviar el correo electrónico.";
    }

} catch (\Throwable $th) {
    //throw $th;
    echo $th;
}


?>