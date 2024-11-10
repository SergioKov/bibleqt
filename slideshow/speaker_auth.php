<?php 

    
    // Autenticar el usuario
    $errores = [];
    $correct_password = "speaker";

    if($_SERVER['REQUEST_METHOD'] === 'POST') {
        //echo "<pre>";
        //var_dump($_POST);
        //echo "</pre>";

        $password = $_POST['password'];

        if(!$password) {
            $errores[] = "La contraseña es obligatoria";
        }

        if(empty($errores)) {

            // Verificar si la contraseña es correcta
            if ($password === $correct_password) {
                // Establecer una cookie de autenticación válida por 1 hora
                setcookie("authenticated", "true", time() + 3600, "/");
                
                // Redirigir al contenido protegido
                header("Location: /slideshow/slide_nav.php");
                exit();
            } else {
                // Si la contraseña es incorrecta, mostrar un mensaje de error
                //echo "Contraseña incorrecta.";
                $errores[] = 'La contraseña es incorrecta';
            }
             
        }

    }

?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BQ - Slideshow</title>
    <link rel="icon" type="image/png" href="./images/slideshow3.png">
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap" rel="stylesheet">
    <link id="estilos_slideshow" rel="stylesheet" href="./css/style_index.css">
</head>
<body>

    <header>
        <nav>
            <ul>
                <li><a href="/" data-link="">Biblia</a></li>
                <li><a href="/slideshow" data-link="">Slideshow</a></li>
            </ul>
        </nav>
    </header>
    
    <div class="container">

        <h1 class="h1_title">Modo Speaker</h1>
    
        <div class="wr_block">

            <h1>Autentifícate como Speaker</h1>
            
            <div class="wr_links" style="flex-direction: column;">

                <?php foreach($errores as $error): ?>
                    <div class="alerta error">
                        <?php echo $error; ?>
                    </div>
                <?php endforeach; ?>

                <form method="POST" class="formulario" novalidate>
                    <fieldset>
                        <legend>Contraseña</legend>

                        <input id="password" type="password" name="password" placeholder="Tu Contraseña">
                    </fieldset>
                    <button id="btn_submit" class="btn_wide" type="submit">Entrar</button>
                </form>

            </div>
                
        </div>

    </div><!--/container-->

    <footer>
        <p>&copy; 2024 Bibleqt.es. Todos los derechos reservados.</p>
    </footer>

</body>
</html>