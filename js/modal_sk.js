//Ejemplo cómo llamar openModal() con los textos de traduccion 
//preparados como html desde un fichero 'ca.ini' 
//el cual hay que conectar antes
//este fichero 'modal_sk.js' DEBE ESTAR ACOMPAÑADO CON LOS ESTILOS DE 'css/modal_sk.css'
function demo_openModalSK() {
    let html_show;
    html_show = `
        <h1>POLÍTICA DE PRIVACIDAD</h1>
        <p>De conformidad con la normativa vigente en materia de protección de datos de carácter personal, le informamos que los datos que nos facilita  voluntariamente al cumplimentar el presente formulario y todos aquellos que sean recogidos de forma posterior serán incorporados a un fichero  titularidad de REAL AUTOMÓVIL CLUB ESPAÑA con domicilio en C/ Isaac Newton nº4, Parque Tecnológico de Madrid (PTM) - 28760 Tres Cantos (Madrid) con la  finalidad de gestionar su solicitud, así como para enviarle comunicaciones publicitarias, ofertas y promociones relativas a productos y servicios de empresas del Grupo RACE (GRUPO EMPRESARIAL RACE, S.L., RACE ASISTENCIA, S.A.U., ASEGURACE, S.A.U. CORREDURIA DE SEGUROS VINCULADA A SEGUROS UNACSA y  UNION DE AUTOMÓVILES CLUB, S.A.U. DE SEGUROS Y REASEGUROS "UNACSA") relativas al sector seguros y del automóvil, así como de entidades colaboradoras del RACE, cuyos sectores podrá encontrar en el siguiente sitio web (<a href="http://www.race.es/alianzas-comerciales" target="_blank">http://www.race.es/alianzas-comerciales</a>).</p> 
        <p>Si desea acceder, rectificar, cancelar sus datos u oponerse a su tratamiento posteriormente a la  cumplimentación de este formulario, indíquenoslo mediante carta dirigida al Departamento de Socios a la dirección anteriormente indicada o mediante  correo electrónico a <strong>nopubli@race.es</strong></p>
        <p>El usuario declara tener más de 14 años de edad para poder obtener información comercial.</p> 
        <p>En caso de que no desee  recibir futuras comunicaciones comerciales de las empresas de Grupo RACE, no  dude en comunicárselo al operador durante la conversación telefónica.</p>			
    `;

    const div_tmp = document.createElement('div');
    div_tmp.innerHTML = `<?=$d['d16']; ?>`;//variable $d['d16'] tiene que existir en el fichero 'nombre_fichero_aki.php' importante para que se muestre correctamente
    
    html_show = div_tmp.innerHTML;

    openModalSK(html_show);
}

function openModalSK(html_show) {
    
    const modal_sk = document.createElement('div');
    modal_sk.className = 'modal_sk';
    modal_sk.innerHTML = `
        <div class="modal_sk_inner">
            <div class="modal_content">
                <div class="modal_head">
                    <button class="btn_close">&#10005;</button>
                </div>
                <div class="modal_body">
                    <div class="modal_body_inner">
                        ${html_show}
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.append(modal_sk);

    setTimeout(() => {
        modal_sk.classList.add('fadeIn');
    }, 10);

    setTimeout(() => {
        modal_sk.querySelector('.modal_content').classList.add('mooved');
    }, 500);

    document.querySelector('.modal_sk').onclick = (e) => {
        //console.log(e.target);
        if (['modal_sk', 'modal_sk_inner', 'btn_close'].includes(e.target.className)) {
            closeModalSK();
        }
    }
}

function closeModalSK() {
    const modal_sk = document.querySelector('.modal_sk');
    modal_sk.classList.remove('fadeIn');
    modal_sk.querySelector('.modal_content').classList.remove('mooved');

    setTimeout(() => {
        modal_sk.remove();
    }, 1000);
}