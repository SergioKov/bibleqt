function saveNewPassword(){
    console.log('===function saveNewPassword()===');

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
        return;
    }
    if(email == '' || token == ''){
        alert('la url está dañada. Haz click en el enlace enviado a u email.');
        return;
    }

    // Enviar los datos al servidor para la autenticación
    fetch("reset_password_form_action.php", {
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
        
        console.log(data);
        
        let eid_bl_reset_pwd_form = document.getElementById('bl_reset_pwd_form');
        
        if(data.success) {
            
            console.log(`La contraseña se ha guardado correctamente.`);

            eid_bl_reset_pwd_form.querySelector('.mensaje').innerHTML = `<span style="color:green;">La contraseña se ha guardado correctamente.</span>`;

            setTimeout(()=>{
                window.location.href = "index.php?reset_pwd_ok";  //de momento comento para no hacer la redirección...
                //mostrarLoginForm();
            },3000);
            

            // Redirigir a la página de inicio si la autenticación es exitosa
        } else {
            let error_text = "Error al guardar la contraseña";
            console.error(data.error);
            console.error(error_text);

            eid_bl_reset_pwd_form.querySelector('.mensaje').innerHTML = `<span style="color:red;">Hubo problemas al guardar la contraseña. Revisa todos los datos. <br>Error: ${data.error}</span>`;
        }
        
    })
    .catch(error => {
        console.error("Error: ", error);
    });

}
