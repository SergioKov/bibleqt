<?php
// Protocolo (http o https)
$protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';

// Nombre del host (dominio)
$host = $_SERVER['HTTP_HOST'];

// Ruta base
$basePath = dirname($_SERVER['SCRIPT_NAME']);

// Construir la URL base
$baseUrl = "$protocol://$host$basePath/";

//echo "La URL base es: $baseUrl";

?>