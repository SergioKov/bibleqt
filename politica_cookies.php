<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Política de Cookies</title>
    <link rel="icon" type="image/png" href="./images/bq.png">

    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            padding: 20px;
            background-color: #f4f4f4;
        }
        h1 {
            color: #333;
        }
        p {
            color: #555;
            line-height: 1.6;
        }
        ul {
            margin: 10px 0;
            padding-left: 20px;
        }
        a {
            color: #007bff;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    
    <h1>Política de Cookies</h1>
    
    <p>En <strong>Bibleqt.es</strong>, utilizamos cookies para mejorar tu experiencia de navegación y analizar el uso de nuestro sitio web. Al continuar navegando, aceptas el uso de cookies según esta política. A continuación, te proporcionamos detalles sobre el uso que hacemos de ellas.</p>
    
    <h2>1. ¿Qué son las cookies?</h2>
    <p>Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Nos permiten recordar tus preferencias y mejorar el rendimiento del sitio.</p>
    
    <h2>2. ¿Qué tipos de cookies utilizamos?</h2>
    <p>En nuestro sitio web utilizamos los siguientes tipos de cookies:</p>
    <ul>
        <li><strong>Cookies necesarias:</strong> Son esenciales para el funcionamiento básico del sitio web, como el inicio de sesión o el acceso a áreas seguras.</li>
        <li><strong>Cookies de preferencia:</strong> Permiten recordar tus preferencias, como el idioma o la región desde la que accedes.</li>
    </ul>
    
    <h2>3. ¿Cómo usamos las cookies?</h2>
    <p>Las cookies se utilizan con los siguientes fines:</p>
    <ul>
        <li>Reconocer a los usuarios que han iniciado sesión.</li>
        <li>Recordar las preferencias seleccionadas (como el idioma o la ubicación).</li>
    </ul>
    
    <h2>4. Cookies de terceros</h2>
    <p>No usamos cookies de terceros.</p>
    
    <h2>5. Duración de las cookies</h2>
    <p>Las cookies pueden ser de sesión o persistentes:</p>
    <ul>
        <li><strong>Cookies de sesión:</strong> Se eliminan automáticamente cuando cierras tu navegador.</li>
        <li><strong>Cookies persistentes:</strong> Permanecen en tu dispositivo hasta que expiran o las eliminas manualmente.</li>
    </ul>
    
    <h2>6. Gestión y eliminación de cookies</h2>
    <p>Puedes gestionar y eliminar las cookies desde la configuración de tu navegador. A continuación, te proporcionamos enlaces a las instrucciones para hacerlo en los navegadores más comunes:</p>
    <ul>
        <li><a href="https://support.google.com/chrome/answer/95647" target="_blank">Google Chrome</a></li>
        <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank">Mozilla Firefox</a></li>
        <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank">Safari</a></li>
        <li><a href="https://support.microsoft.com/es-es/help/17442/windows-internet-explorer-delete-manage-cookies" target="_blank">Internet Explorer</a></li>
    </ul>
    
    <h2>7. Consentimiento</h2>
    <p>Al navegar en nuestro sitio web, consientes el uso de cookies. Puedes retirar tu consentimiento o modificar tus preferencias en cualquier momento desde la configuración de tu navegador.</p>
    
    <h2>8. Actualizaciones de la política de cookies</h2>
    <p>Nos reservamos el derecho de modificar esta política de cookies en cualquier momento. Te recomendamos revisar esta página periódicamente para estar informado de cualquier cambio. Esta política fue actualizada por última vez el <strong>16 de septiembre de 2024</strong>.</p>
    
    <h2>9. Contacto</h2>
    <p>Si tienes alguna pregunta o necesitas más información sobre nuestra política de cookies, puedes ponerte en contacto con nosotros a través de <a href="mailto:contact@bibleqt.es" target="_blank">contact@bibleqt.es</a>.</p>




<script type="text/javascript">
    
const arr_langs = ['ru','ua','es','en'];//array de idiomas disponibles
let lang = localStorage.getItem('lang') || navigator.languages[1] || 'ru';//idioma por defecto
//lang = 'ddddru';//test ok


</script>

<script src="./js/get_cookieConsent.js"></script>
<?php include('incl_aviso_cookies.html'); ?>    
<script src="./js/incl_aviso_cookies.js"></script>

</body>
</html>
