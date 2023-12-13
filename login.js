console.log('es login.js');


//login('usuario','contraseña');

function login(/*username,password*/) {//username,password
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if(username == '' || password == ''){
        alert('Ambos campos son obligatorios. Introduce tu usuario y contraseña por favor.');
        return;
    }

    // Enviar los datos al servidor para la autenticación
    fetch("auth.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log(`Usuario autentificado con exito. Session creada para el usuario ${username} . Hago redireccion...`);

            // Redirigir a la página de inicio si la autenticación es exitosa
            window.location.href = "index.php?auth_ok";
        } else {
            let error_text = "Autenticación fallida. Verifica tu usuario y contraseña.";
            alert(error_text);
            console.error(error_text);
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
}
