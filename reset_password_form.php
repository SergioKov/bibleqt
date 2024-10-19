
<?php
include('./php/includes/base_url.php');

$email = (isset($_GET['email']) && $_GET['email'] != '') ? $_GET['email'] : '';
$token = (isset($_GET['token']) && $_GET['token'] != '') ? $_GET['token'] : '';

?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recuperar contraseña</title>
    <link rel="icon" type="image/png" href="./images/bq.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href='https://fonts.googleapis.com/css?family=Muli' rel='stylesheet'>    
    <link href="https://fonts.googleapis.com/css2?family=Oswald&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital@1&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Archivo+Narrow:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&family=Open+Sans:wght@300&family=Raleway:wght@100&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="./css/bible_app.css">
    <link rel="stylesheet" href="./css/bible_app_resp.css">

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
                        <input id="password" name="password" class="type_password" type="password" autocomplete="off" placeholder="password" required/>
                        <input id="password_rep" name="password" class="type_password m_bot0" type="password" autocomplete="off" placeholder="repeat password" required/>
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


<?php include('incl_aviso_cookies.html'); ?>

<script src="./js/var_lang.js"></script>

<script type="text/javascript">

let obj_lang = {};
crear_obj_lang(); // Llamamos a la función para que crea obj_lang

//llamo listener al input de campos
listenResetPwdFormInput();

async function crear_obj_lang() {
    obj_lang = await make_obj_lang();
    //console.log(obj_lang);
}

async function make_obj_lang(){
    //console.log('=== function make_obj_lang() ===');
    
    try {

        if(!arr_langs.includes(lang)){
            console.error(`No existe este idioma '${lang}' para las traducciones. Creo objeto con lang '${arr_langs[0]}' por defecto`);
            lang = arr_langs[0];
        }            
        
        let obj_lang_f = await fetchDataToJson(`./modules/json/${lang}.json`);
        //console.log('obj_lang_f:');
        //console.log(obj_lang_f);
        //localStorage.setItem('lang',lang);

        return obj_lang_f;

    } catch (error) {
        // Código a realizar cuando se rechaza la promesa
        console.error('make_obj_lang. error: ',error);
    }    
}

async function fetchDataToJson(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function listenResetPwdFormInput(){
    document.querySelectorAll('.reset-pwd-form input').forEach(el =>{    
        el.oninput = () =>{
            console.log(el.value);
            const p_mensaje = document.querySelector('.reset-pwd-form .mensaje');
            if(p_mensaje.classList.contains('color_red')){
                p_mensaje.classList.remove('color_red');
                p_mensaje.innerHTML = obj_lang.d277;//Introduce tu contraseña nueva.
            }
        }
    });
}


async function saveNewPassword(){
    //console.log('=== function saveNewPassword() ===');

    try {

        let email = document.getElementById("email").value.trim();
        let token = document.getElementById("token").value;
        let password = document.getElementById("password").value.trim();
        let password_rep = document.getElementById("password_rep").value.trim();
        email = email.toLowerCase();
    
        let errors = [];

        if(password == '' || password_rep == ''){
            errors.push(obj_lang.d274);//Los dos campos de contraseña son obligatorios.
        }
        if(password != '' && password_rep != '' && password != password_rep){
            errors.push(obj_lang.d275);//Las contraseñas introducidas no son iguales.
        }
        if(email == '' || token == ''){
            errors.push(obj_lang.d276);//El enlace está dañado. Haz click en el enlace enviado a tu email.
        }
        if(!validarEmail(email)){
            errors.push(obj_lang.d278);//El email no es válido.
        }
        if(!validarPassword(password)){
            errors.push(obj_lang.d279);//La contraseña no es válida. Debe tener al menos 6 carácteres.
        }
        if(errors.length > 0){
            let error_text = '';
            errors.forEach(error => {
                error_text += error + '<br>';
            });
            const p_mensaje = document.querySelector('.reset-pwd-form .mensaje');
            p_mensaje.classList.add('color_red');
            p_mensaje.innerHTML = error_text;
            return;
        }

        const response = await fetch('./php/reset_password_form_action.php', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                token: token,
                password: password
            })
        });

        if (!response.ok) {
            throw new Error('Error al obtener datos');
        }

        const data = await response.json();
        //console.log(data);

        let eid_bl_reset_pwd_form = document.getElementById('bl_reset_pwd_form');
        
        if(data.success) {
            //console.log(`La contraseña se ha guardado correctamente.`);

            let text_show = obj_lang[data.dic_code];
            eid_bl_reset_pwd_form.querySelector('.mensaje').innerHTML = `<span class="clr_gr-een">${text_show}</span>`;

            //para evitar que presionen otra vez, quito los elementos del formulario
            eid_bl_reset_pwd_form.querySelectorAll('input').forEach(el=>{
                el.remove();//cada input
            });
            eid_bl_reset_pwd_form.querySelector('.ch_lab').remove();//checkbox mostrar contraseña
            eid_bl_reset_pwd_form.querySelector('#btn_guardar').remove();//botón Guardar

            setTimeout(()=>{
                window.location.href = "./index.php?reset_pwd_ok";  //de momento comento para no hacer la redirección...
                //mostrarLoginForm();
            },3000);            

            // Redirigir a la página de inicio si la autenticación es exitosa
        } else {
            
            //"Error al guardar la contraseña";
            console.error(data.error);
            let text_show = obj_lang.d257;//Hubo problemas al guardar la contraseña. Revisa todos los datos. <br>Error: 
            let text_show2 = obj_lang[data.dic_code];

            eid_bl_reset_pwd_form.querySelector('.mensaje').innerHTML = `<span>${text_show} ${text_show2}.</span>.`;
            eid_bl_reset_pwd_form.querySelector('.mensaje').classList.add('color_red');
        }       

    } catch (error) {
        console.error('Error en la función saveNewPassword: Error: ', error);
    }
}


function showHidePassword(el){
    if(el.checked){
        el.parentElement.parentElement.parentElement.querySelectorAll('.type_password').forEach(input => {
            input.type = 'text';
        });
    }else{
        el.parentElement.parentElement.parentElement.querySelectorAll('.type_password').forEach(input => {
            input.type = 'password';
        });
    }
}

function validarEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);//.test() returns true or false
}

function validarPassword(password) {
    // Al menos 6 caracteres
    const longitud = /^.{6,}$/;

    // Al menos una letra mayúscula
    //const mayuscula = /[A-Z]/;

    // Al menos una letra minúscula
    //const minuscula = /[a-z]/;

    // Al menos un número
    //const numero = /[0-9]/;

    // Al menos un carácter especial
    //const caracterEspecial = /[!@#$%^&*(),.?":{}|<>]/;

    return longitud.test(password) 
        //&& mayuscula.test(password) 
        //&& minuscula.test(password) 
        //&& numero.test(password) 
        //&& caracterEspecial.test(password)
        ;//.test() returns true or false
}

</script>

</body>
</html>