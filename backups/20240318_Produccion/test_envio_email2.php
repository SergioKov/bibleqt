<?php
$para      = 'sergiokovalchuk@gmail.com';
$titulo    = 'testing email';
$mensaje   = 'Hola';
$cabeceras = 'From: webmaster@example.com' . "\r\n" .
    'Reply-To: webmaster@example.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

if(mail($para, $titulo, $mensaje, $cabeceras)){
	echo"email se ha enviado";
}else{
	echo"email NO se ha enviado";
}
?>