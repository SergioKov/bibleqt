
const arr_langs = ['ru','ua','es','en'];//array de idiomas disponibles
let lang = localStorage.getItem('lang') || navigator.languages[1] || 'ru';//idioma por defecto

let obj_lang = {};
crear_obj_lang(); // Llamamos a la función para que crea obj_lang

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


async function saveNewPassword(){
    //console.log('=== function saveNewPassword() ===');

    try {

        let email = document.getElementById("email").value;
        let token = document.getElementById("token").value;
        let password = document.getElementById("password").value;
        let password_rep = document.getElementById("password_rep").value;
    
        if(password == '' || password_rep == ''){
            alert('Los campos de contraseña son obligatorios. Introdúcelos por favor.');
            return;
        }
        if(password != password_rep){
            alert('Las contraseñas introducidas no son iguales.');
            document.getElementById("password_rep").value = '';
            return;
        }
        if(email == '' || token == ''){
            alert('la url está dañada. Haz click en el enlace enviado a tu email.');
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
            eid_bl_reset_pwd_form.querySelector('#btn_guardar').remove();//botón Guardar

            setTimeout(()=>{
                window.location.href = "../index.php?reset_pwd_ok";  //de momento comento para no hacer la redirección...
                //mostrarLoginForm();
            },3000);            

            // Redirigir a la página de inicio si la autenticación es exitosa
        } else {
            
            //"Error al guardar la contraseña";
            console.error(data.error);
            let text_show = obj_lang.d257;//Hubo problemas al guardar la contraseña. Revisa todos los datos. <br>Error: 
            let text_show2 = obj_lang[data.dic_code];

            eid_bl_reset_pwd_form.querySelector('.mensaje').innerHTML = `<span class="clr_red">${text_show} ${text_show2}.</span>.`;
        }       

    } catch (error) {
        console.error('Error en la función saveNewPassword: Error: ', error);
    }
}


function saveNewPassword_old(){
    //console.log('=== function saveNewPassword() ===');

    let email = document.getElementById("email").value;
    let token = document.getElementById("token").value;
    let password = document.getElementById("password").value;
    let password_rep = document.getElementById("password_rep").value;

    if(password == '' || password_rep == ''){
        alert('Los campos de contraseña son obligatorios. Introdúcelos por favor.');
        return;
    }
    if(password != password_rep){
        alert('Las contraseñas introducidas no son iguales.');
        document.getElementById("password_rep").value = '';
        return;
    }
    if(email == '' || token == ''){
        alert('la url está dañada. Haz click en el enlace enviado a tu email.');
        return;
    }

    // Enviar los datos al servidor para la autenticación
    fetch("./php/reset_password_form_action.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            token: token,
            password: password
        })
    })
    .then(response => response.json())
    // .then(response => response.text()) //test
    .then(data => {        
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
            eid_bl_reset_pwd_form.querySelector('#btn_guardar').remove();//botón Guardar

            setTimeout(()=>{
                window.location.href = "../index.php?reset_pwd_ok";  //de momento comento para no hacer la redirección...
                //mostrarLoginForm();
            },3000);            

            // Redirigir a la página de inicio si la autenticación es exitosa
        } else {
            
            //"Error al guardar la contraseña";
            console.error(data.error);
            let text_show = obj_lang.d257;//Hubo problemas al guardar la contraseña. Revisa todos los datos. <br>Error: 
            let text_show2 = obj_lang[data.dic_code];

            eid_bl_reset_pwd_form.querySelector('.mensaje').innerHTML = `<span class="clr_red">${text_show} ${text_show2}.</span>.`;
        }
        
    })
    .catch(error => {
        console.error("saveNewPassword Error: ", error);
    });

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