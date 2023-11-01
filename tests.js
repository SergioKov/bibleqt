//====================================================================//
//   T E S T S
//====================================================================//




/*
var a = [];
for (let index = 3251; index < 3304; index++) {
    const el = index;
    a.push(`<h4>${index}</h4>\n\r\ --- `);   
}
//console.log(a);
*/

//====================================================================//
//start - modo 0
//====================================================================//
//paso 1
const ejecutar0 = (url) => {
    console.log('paso1 --- function ejecutar0()');
    console.log(new Date);
    const d = new Date();
    console.log('d.getMilliseconds(): '+d.getMilliseconds());
    
    obtenerDatos0(url)
    .then(datos => {
        console.log(datos);
    });
}
//paso 2
async function obtenerDatos0(url) {
    console.log('paso2 --- function obtenerDatos0(url)');
    try {
        console.log('paso2.0 --- dentro de try');
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        console.log("paso2.1 --- retorno datos de la url: ", url);
        console.log("paso2.2 --- datos: ", datos);
        const d = new Date();
        console.log('d.getMilliseconds(): '+d.getMilliseconds());
        
        return datos;
    } catch (error) {
        console.error("Error:", error);
    }
}
//ejecutar0('./modules/text/nrt/bibleqt.json');//'./modules/text/nrt/bibleqt.json'
//====================================================================//
//end - modo 0
//====================================================================//




//====================================================================//
//start - modo 1
//====================================================================//
//ejecutar1();
//paso 1
async function ejecutar1() {
    console.log('inicio func ejecutar... 5 sec Espero resultado del obtenerDatos1() ...' + new Date().getSeconds());
    const resultado = await obtenerDatos1();
    console.log('tengo el resultado del obtenerDatos1(). abajo resultado: ' + new Date().getSeconds());
    console.log(resultado);
}
//paso 2
function obtenerDatos1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Datos obtenidos');
        }, 5000);
    });
}
//====================================================================//
//end - modo 1
//====================================================================//


//====================================================================//
//start - modo 2
//====================================================================//
//ejecutar2('./modules/text/nrt/bibleqt.json','json');
setTimeout(()=>{
    //ejecutar2('./modules/text/nrt/nrt_01.htm','text');
},10000)

//paso 1
const ejecutar2 = (url,tipo) => {
    console.log(`inicio func ejecutar2(${url},${tipo}). Espero resultado del obtenerDatos2(${url},${tipo}) ...`);
    
    const inicio = performance.now();
    console.log(`--- start ejecutar2(${url}): ${inicio}`);

    obtenerDatos2(url,tipo)
    .then(datos => {
        const fin = performance.now();
        const tiempo = fin - inicio;
        console.log(`--- fin ejecutar2(${url}): ${fin}`);
        console.log(`--- tiempo de ejecusion de ejecutar2(${url}): ${tiempo} milisec.`);
        console.log(datos);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
//paso 2
async function obtenerDatos2(url,tipo) {
    const respuesta = await fetch(url);
    const datos = (tipo == 'json') ? await respuesta.json() : await respuesta.text();
    return datos;
}
//====================================================================//
//end - modo 2
//====================================================================//





//ejecutarPromesa('/bibleqt/modules/text/nrt/nrt_01.htm', 'text')

function ejecutarPromesa(url, tipo_respuesta) {//tipo_respuesta: json(), text()
    console.log('===function ejecutarPromesa()===');
    console.log(`inicio func ejecutarPromesa(${url},${tipo_respuesta}). Espero resultado del promesaObtenerDatosPorFetch(${url},${tipo_respuesta}) ...`);

    const inicio = performance.now();
    console.log(`--- start ejecutarPromesa(${url}): ${inicio}`);

    promesaObtenerDatosPorFetch(url, tipo_respuesta)
        .then(datos => {
            const fin = performance.now();
            const tiempo = fin - inicio;
            console.log(`--- fin ejecutarPromesa(${url}): ${fin}`);
            console.log(`--- tiempo de ejecusion de ejecutarPromesa(${url}): ${tiempo} milisec.`);

            console.log(datos);
        })
        .catch(error => {
            console.error('Error de .then() de promesa promesaObtenerDatosPorFetch(): ', error);
        });
}
async function promesaObtenerDatosPorFetch(url, tipo_respuesta = null) { //tipo_respuesta: json(), text()
    try {
        const respuesta = await fetch(url);
        const datos = (typeof tipo_respuesta != 'undefined' && tipo_respuesta == 'json')
            ? await respuesta.json()
            : await respuesta.text();
        return datos;
    } catch (error) {
        console.error("Error:", error);
    }
}


//ejecutar1();
//paso 1
async function ejecutar7() {
    console.log('inicio func ejecutar... 5 sec Espero resultado del obtenerDatos7() .... ahora segundos: ' + new Date().getSeconds());
    const resultado = await obtenerDatos7();
    console.log('tengo el resultado del obtenerDatos7(). ahora segundos: ' + new Date().getSeconds());
    console.log('abajo resultado: ');
    console.log(resultado);
}
//paso 2
function obtenerDatos7() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(ejecutarPromesa('/bibleqt/modules/text/nrt/nrt_01.htm', 'text'));
        }, 5000);
    });
}