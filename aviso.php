
<?php
include('./php/base_url.php');

//mensaje
$m = (isset($_GET['m']) && $_GET['m'] != '') ? $_GET['m'] : '';

if($m != ''){
print<<<HERE
<script>
    //alert('$m');
    let dic_code = '$m';
</script>
HERE;
}

?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aviso</title>
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
<body id="body_aviso">
    

    <div id="wrapper_pwd_form">

        <div class="pwd-page">

            <div class="form">

                <div id="bl_aviso_form">
                    <form class="aviso-form">
                        <h1>Aviso</h1>
                        <p id="aviso" class="mensaje"></p>
                        <p class="message"><a id="a_inicio" href="/">Ir al inicio</a></p>
                    </form>
                </div>
                
            </div>

        </div>

    </div>


<!-- <script src="./js/aviso_script.js"></script> -->
<script type="text/javascript">

const arr_langs = ['ru','ua','es','en'];//array de idiomas disponibles
let lang = localStorage.getItem('lang') || navigator.languages[1] || 'ru';//idioma por defecto

let obj_lang = {};
crear_obj_lang(); // Llamamos a la función para que crea obj_lang

async function crear_obj_lang() {
    obj_lang = await make_obj_lang();
    //console.log(obj_lang);

    //llamo funcion de pintar el aviso
    pintMensaje();
}

async function make_obj_lang(){
    //console.log('=== function make_obj_lang() ===');
    
    try {

        if(!arr_langs.includes(lang)){
            console.error(`No existe este idioma '${lang}' para las traducciones. Creo objeto con lang '${arr_langs[0]}' por defecto`);
            lang = arr_langs[0];
        }            
        
        let obj_lang_f = await fetchDataToJson(`../modules/json/${lang}.json`);
        //console.log('obj_lang_f:');
        //console.log(obj_lang_f);
        //localStorage.setItem('lang',lang);

        return obj_lang_f;

    } catch (error) {
        // Código a realizar cuando se rechaza la promesa
        console.error('make_obj_lang. error: ',error);
    }    
}

async function fetchDataToJson(url_bq) {
    const response = await fetch(url_bq);
    const data = await response.json();
    return data;
}

function pintMensaje(){
    const aviso = document.getElementById('aviso');
    if(dic_code && typeof obj_lang[dic_code] !== 'undefined'){
        aviso.innerHTML = obj_lang[dic_code];
    }else{
        aviso.innerHTML = obj_lang.d259;//'Código de mensaje no indicado.';
    }
    document.head.querySelector('title').textContent = obj_lang.d261;//Aviso
    document.querySelector('.aviso-form h1').textContent = obj_lang.d261;//Aviso
    document.querySelector('#a_inicio').textContent = obj_lang.d262;//Ir al inicio
    setTimeout(()=>{
        window.location.href = "/index.php?from_aviso";
    },5000);
}

</script>

</body>
</html>