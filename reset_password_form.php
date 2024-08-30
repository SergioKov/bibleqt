
<?php
include('./php/base_url.php');

$email = (isset($_GET['email']) && $_GET['email'] != '') ? $_GET['email'] : '';
$token = (isset($_GET['token']) && $_GET['token'] != '') ? $_GET['token'] : '';

?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recuperar contraseña</title>
    <link rel="stylesheet" href="./css/bible_app.css">
    <link rel="stylesheet" href="./css/bible_app_resp.css">
    <link rel="icon" type="image/png" href="./images/bq.png">
    <link href='https://fonts.googleapis.com/css?family=Muli' rel='stylesheet'>    
   
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Oswald&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital@1&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Archivo+Narrow:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&family=Open+Sans:wght@300&family=Raleway:wght@100&display=swap" rel="stylesheet">

</head>
<body id="body_reset_pwd">
    

    <div id="wrapper_pwd_form">

        <div class="pwd-page">

            <div class="form">

                <div id="bl_reset_pwd_form">
                    <form class="reset-pwd-form" action="./php/reset_password_action.php" method="POST">
                        <h1>Recuperar contraseña</h1>
                        <p class="mensaje">Introduce tu contraseña nueva.</p>
                        <input id="email" name="email" type="hidden" value="<?=$email?>"/>
                        <input id="token" name="token" type="hidden" value="<?=$token?>"/>
                        <input id="password" name="password" class="type_password" type="password" placeholder="password" required/>
                        <input id="password_rep" name="password" class="type_password m_bot0" type="password" placeholder="repeat password" required/>
                        <label class="ch_lab">
                            <input class="ch_mostrar" type="checkbox" onchange="showHidePassword(this)">
                            <span class="ch_mostrar_sp">mostrar contraseña</span>
                        </label>
                        <button id="btn_guardar" class="btn_wide" type="button" onclick="saveNewPassword();">Guardar</button>
                        <p class="message"><a href="#" onclick="window.location.href = '<?=$baseUrl?>'">Ir al inicio</a></p>
                    </form>
                </div>
                
            </div>

        </div>

    </div>


<script src="./js/reset_password_script.js"></script>

</body>
</html>