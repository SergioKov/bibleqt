//====================================================================//
//   T E S T S
//====================================================================//




/*
let a = [];
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
    //console.log('paso1 --- function ejecutar0()');
    //console.log(new Date);
    const d = new Date();
    //console.log('d.getMilliseconds(): '+d.getMilliseconds());
    
    obtenerDatos0(url)
    .then(datos => {
        //console.log(datos);
    });
}
//paso 2
async function obtenerDatos0(url) {
    //console.log('paso2 --- function obtenerDatos0(url)');
    try {
        //console.log('paso2.0 --- dentro de try');
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        //console.log("paso2.1 --- retorno datos de la url: ", url);
        //console.log("paso2.2 --- datos: ", datos);
        const d = new Date();
        //console.log('d.getMilliseconds(): '+d.getMilliseconds());
        
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
    //console.log('inicio func ejecutar... 5 sec Espero resultado del obtenerDatos1() ...' + new Date().getSeconds());
    const resultado = await obtenerDatos1();
    //console.log('tengo el resultado del obtenerDatos1(). abajo resultado: ' + new Date().getSeconds());
    //console.log(resultado);
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
    //console.log(`inicio func ejecutar2(${url},${tipo}). Espero resultado del obtenerDatos2(${url},${tipo}) ...`);
    
    const inicio = performance.now();
    //console.log(`--- start ejecutar2(${url}): ${inicio}`);

    obtenerDatos2(url,tipo)
    .then(datos => {
        const fin = performance.now();
        const tiempo = fin - inicio;
        //console.log(`--- fin ejecutar2(${url}): ${fin}`);
        //console.log(`--- tiempo de ejecusion de ejecutar2(${url}): ${tiempo} milisec.`);
        //console.log(datos);
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





//ejecutarFetch('/bibleqt/modules/text/nrt/nrt_01.htm', 'text')

function ejecutarFetch(url, tipo_respuesta) {//tipo_respuesta: json(), text()
    //console.log('===function ejecutarFetch()===');
    //console.log(`inicio func ejecutarFetch(${url},${tipo_respuesta}). Espero resultado del fetchData(${url},${tipo_respuesta}) ...`);

    const inicio = performance.now();
    //console.log(`--- start ejecutarFetch(${url}): ${inicio}`);

    fetchData(url, tipo_respuesta)
        .then(datos => {
            const fin = performance.now();
            const tiempo = fin - inicio;
            //console.log(`--- fin ejecutarFetch(${url}): ${fin}`);
            //console.log(`--- tiempo de ejecusion de ejecutarFetch(${url}): ${tiempo} milisec.`);

            //console.log(datos);
        })
        .catch(error => {
            console.error('Error de .then() de promesa fetchData(): ', error);
        });
}
async function fetchData(url, tipo_respuesta = null) { //tipo_respuesta: json(), text()
    try {
        const respuesta = await fetch(url);
        const datos = (typeof tipo_respuesta != 'undefined' && tipo_respuesta == 'json')
            ? await respuesta.json()
            : await respuesta.text();
        return datos;
    } catch (error) {
        console.error("Error: ", error);
    }
}


//ejecutar1();
//paso 1
async function ejecutar7() {
    //console.log('inicio func ejecutar... 5 sec Espero resultado del obtenerDatos7() .... ahora segundos: ' + new Date().getSeconds());
    const resultado = await obtenerDatos7();
    //console.log('tengo el resultado del obtenerDatos7(). ahora segundos: ' + new Date().getSeconds());
    //console.log('abajo resultado: ');
    //console.log(resultado);
}
//paso 2
function obtenerDatos7() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(ejecutarFetch('/bibleqt/modules/text/nrt/nrt_01.htm', 'text'));
        }, 5000);
    });
}







async function obtenerDatos8() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(parseTextToRef('psa 2 5','nrt'));
        }, 5000);
    });
}
async function ejecutarDatos8(){
    const resultado = await obtenerDatos8();
    const datos = await resultado.json();
    return datos;
}
//obtenerDatos8();




function getRefToCompare(ref){
    //console.log('=== function getRefToCompare(ref) ===');
    //console.log('ref: ',ref);

    let act_trans = eid_trans1.dataset.trans;

    let inpt_v = eid_inpt_nav.value.trim();
    let book = null;//por defecto
    let chapter = null;//por defecto
    let verse = null;//por defecto
    let to_verse = null;//por defecto
    //console.log(inpt_v);

    //Solo book
    if(inpt_v.split(' ').length == 1){
        let arr_book = inpt_v.split(' ');
        book = arr_book[0];
    }

    //Ejemplo: 'Jn.3:16' y Jn.3:16-18
    if(inpt_v.includes(':')){
        let arr_v = inpt_v.split(':');
        verse = arr_v[1];
        //console.log('verse: '+verse);
        
        if(verse.includes('-')){
            let arr_verse = verse.split('-');
            verse = arr_verse[0];
            to_verse = arr_verse[1];
            //console.log('to_verse: '+to_verse);
        }

        if(arr_v[0].includes('.')){
            let arr_ch = arr_v[0].split('.');

            if(arr_ch.length == 2){
                book = arr_ch[0] + '.';
                chapter = arr_ch[1];
            }
            if(arr_ch.length == 3){// 'Иис.Нав.1' = ['Иис', 'Нав', '1']
                book = arr_ch[0] + '.' + arr_ch[1] + '.';
                chapter = arr_ch[2];
            }
            //console.log('book: '+book);
            //console.log('chapter: '+chapter);
        }

        if(arr_v[0].includes(' ')){
            let arr_ch = arr_v[0].split(' ');
            book = arr_ch[0];
            chapter = arr_ch[1];
            //console.log('book: '+book);
            //console.log('chapter: '+chapter);
        }
    }

    //Ejemplo: 'Jn.3,16'
    if(inpt_v.includes(',')){
        let arr_v = inpt_v.split(',');
        verse = arr_v[1];
        //console.log('verse: '+verse);
        
        if(verse.includes('-')){
            let arr_verse = verse.split('-');
            verse = arr_verse[0];
            to_verse = arr_verse[1];
            //console.log('to_verse: '+to_verse);
        }

        if(arr_v[0].includes('.')){
            let arr_ch = arr_v[0].split('.');
            book = arr_ch[0] + '.';
            chapter = arr_ch[1];
            //console.log('book: '+book);
            //console.log('chapter: '+chapter);
        }

        if(arr_v[0].includes(' ')){
            let arr_ch = arr_v[0].split(' ');
            book = arr_ch[0];
            chapter = arr_ch[1];
            //console.log('book: '+book);
            //console.log('chapter: '+chapter);
        }
    }

    //Ejemplo: 'Jn. 3 16' y 'Jn 3 16-18' // sin ':'
    if(inpt_v.includes(' ') && !inpt_v.includes(':') && !inpt_v.includes(',')){
        let arr_v = inpt_v.split(' ');

        if(arr_v.length > 3){
            arr_v = arr_v.filter(elem => elem);
            book = arr_v[0];
            chapter = arr_v[1];
            verse = arr_v[2];
            if(arr_v[3] == '-' && !isNaN(arr_v[4])){
                to_verse = arr_v[4];
            }
        }

        if(arr_v.length == 3){
            verse = arr_v[2];
            if(verse.includes('-')){
                let arr_verse = verse.split('-');
                verse = arr_verse[0];
                to_verse = arr_verse[1];
                //console.log('to_verse: '+to_verse);
            }
            chapter = arr_v[1];
            book = arr_v[0];
        }
        if(arr_v.length == 2){
            verse = null;
            chapter = arr_v[1];
            book = arr_v[0];
        }

        //console.log('book: '+book);
        //console.log('chapter: '+chapter);
        //console.log('verse: '+verse);
        //console.log('to_verse: '+to_verse);
    }

    //Si exisate book busco chapter y verse/to_verse si hay
    if(book != null && chapter != null && verse != null){
        //console.log('getRef() --- book != null');

        let Translation = trans;
        let objTrans = arrFavTransObj.find(v => v.Translation === Translation);
        
        //MODO NEW. Cuando  ya está creado el objeto 'objTrans' desde 'arrFavTransObj'
        //if(typeof objTrans != 'undefined' && objTrans != null && objTrans != ''){
            //console.log('getRef() --- objTrans está creado. abajo objTrans: ');
            //console.log(objTrans);

            //saco ajustes de este modulo en json               
            let data = objTrans;
            //console.log(data);
    
            window.dataBooksBtnOk = data.Books;

            for (let i = 0; i < dataBooksBtnOk.length; i++) {
                for (let j = 0; j < dataBooksBtnOk[i].ShortNames.length; j++) {
                    const el = dataBooksBtnOk[i].ShortNames[j];
                    if(book.toLowerCase() == el.toLowerCase() || book.toLowerCase()+'.' == el.toLowerCase()){//añado '.' por si viene 'Sal' y en ShortNames hay 'Sal.'
                        let n_book = dataBooksBtnOk[i].BookNumber;
                        let short_name = dataBooksBtnOk[i].ShortNames[0];//siempre el primer nombre del array
                        
                        chapter = (chapter != null) ? chapter : 1;//default si no hay
                        if(chapter > dataBooksBtnOk[i].ChapterQty) chapter = dataBooksBtnOk[i].ChapterQty;

                        //reviso desde qué divtrans se llega a introducir la referencia para preparar la ref correspondiente para trans1 si se accede desde otros trans's en mobile
                        if(window.innerWidth < pantallaTabletMinPx){//mobile
                            //checkRefNav(n_book, chapter, verse, to_verse);                        
                        
                            if(document.querySelectorAll('.cols').length > 1){

                                //si es trans2 y es trans con EnglishPsalms 'Y' se cliquea en el boton li de chapter Sal.23 español, convierto el chapter en el Пс 22 ruso 
                                //console.log('clickeado trans: '+eid_inpt_nav.dataset.trans);
                                
                                let trans_base = eid_trans1.dataset.trans;//la trans base de #trans1
                                let trans_inpt = eid_inpt_nav.dataset.trans;// trans desde input
                                let divtrans_inpt = eid_inpt_nav.dataset.divtrans;// trans desde input

                                if(divtrans_inpt != '' && divtrans_inpt != 'trans1'){
                                    // Usa el método find para buscar el objeto que contiene 'rst' como nombre
                                    const obj_trans_base = arrFavTransObj.find(v => v.Translation === trans_base);
                                    const obj_trans_inpt = arrFavTransObj.find(v => v.Translation === trans_inpt);

                                    if(obj_trans_base.EnglishPsalms == 'N' && obj_trans_inpt.EnglishPsalms == 'Y'){
                                        let new_res = convertLinkFromEspToRus(n_book, chapter, verse, to_verse);//importante EspToRus
                                        chapter = new_res[1];
                                        verse = new_res[2];
                                        to_verse = new_res[3];
                                        //console.log('en getRef() --- convertido chapter: '+chapter);//empezando de 1
                                        //console.log('en getRef() --- convertido verse: '+verse);//empezando de 1
                                        //console.log('en getRef() --- convertido to_verse: '+to_verse);//empezando de 1
                                    }
                                    else if(obj_trans_base.EnglishPsalms == 'Y' && obj_trans_inpt.EnglishPsalms == 'N'){
                                        let new_res = convertLinkFromRusToEsp(n_book, chapter, verse, to_verse);//importante RusToEsp
                                        chapter = new_res[1];
                                        verse = new_res[2];
                                        to_verse = new_res[3];
                                        //console.log('en getRef() --- convertido chapter: '+chapter);//empezando de 1
                                        //console.log('en getRef() --- convertido verse: '+verse);//empezando de 1
                                        //console.log('en getRef() --- convertido to_verse: '+to_verse);//empezando de 1
                                    }else{
                                        //console.log('en getRef() --- no hago nada. chapter verse to_verse se quedan igual como en input.');
                                    }

                                }
                            }                        
                        
                        } 
                    
                        eid_inpt_nav.setAttribute('data-id_book',n_book);
                        eid_inpt_nav.setAttribute('data-show_book',short_name);

                        eid_inpt_nav.setAttribute('data-id_chapter',parseInt(chapter) - 1);
                        eid_inpt_nav.setAttribute('data-show_chapter',chapter);

                        eid_inpt_nav.value = short_name;
                        obj_nav.show_book = short_name;
                        
                        //chapter
                        if(chapter != null && parseInt(chapter) > 0){
                            eid_inpt_nav.value += ' ' + chapter;
                            obj_nav.id_chapter = parseInt(chapter) - 1;
                            obj_nav.show_chapter = chapter;
                            eid_v_chapter.innerHTML = '';
                        }else{
                            eid_v_chapter.innerHTML = 'selecciona el capítulo';
                            obj_nav.id_chapter = parseInt(chapter) - 1;//por defecto para que no dé fallo
                            obj_nav.show_chapter = chapter;//por defecto para que no dé fallo
                        }

                        
                        //modo old. getting all file and showing only needed verses
                        if(modo_fetch_verses_for_cols == 'by_text'){
                            //console.log('modo_fetch_verses_for_cols == by_text');
                            
                            //verse
                            if (verse != null && parseInt(verse) > 0) {
                                eid_inpt_nav.value += ':' + verse;
                                obj_nav.id_verse = parseInt(verse) - 1;
                                obj_nav.show_verse = verse;
                                eid_inpt_nav.setAttribute('data-id_verse', parseInt(verse) - 1);
                                eid_inpt_nav.setAttribute('data-show_verse', verse);
                                eid_v_verse.innerHTML = '';
                            } else {
                                //eid_v_verse.innerHTML = '<span class="prim_verse">2. Antes de seleccionar el versículo, selecciona el capítulo por favor.</span>';
                                //creo virtual e
                                const e_virtual = document.createElement('li');
                                e_virtual.id = 'e_virt';
                                e_virtual.setAttribute('data-id_chapter', 0);
                                e_virtual.setAttribute('data-show_chapter', 1);
                                setTimeout(() => {
                                    //e_virtual.click();
                                    selChapter(e_virtual, chapter);
                                }, 50);
                            }

                            //hay to_verse
                            if (to_verse != null && parseInt(to_verse) > 0 && parseInt(verse) < parseInt(to_verse)) {
                                eid_inpt_nav.value += '-' + to_verse;
                                eid_inpt_nav.setAttribute('data-show_to_verse', to_verse);
                                obj_nav.show_to_verse = to_verse;
                            } else {
                                eid_inpt_nav.setAttribute('data-show_to_verse', '');
                                obj_nav.show_to_verse = '';
                            }


                            if(eid_v_book.querySelector('.li_active') != null){
                                eid_v_book.querySelector('.li_active').classList.remove('li_active');//quito anterior book
                            } 
                            if(eid_v_book.querySelector('div[data-id_book="'+n_book+'"]') != null){
                                eid_v_book.querySelector('div[data-id_book="'+n_book+'"]').classList.add('li_active');//añado book
                            }

                            //si es mobile, cierro menu
                            if (window.innerWidth < pantallaTabletMinPx) {
                                //console.log(' btn ok. cierro menu en mobile.');
                                closeSidebar();
                            }

                            //meto Gen.1:1 en los head de cada trans
                            document.querySelectorAll('.partMob .mob_sh_link').forEach(el => {
                                let verse_to_show = (verse > 0) ? parseInt(verse) : 1;
                                putRefVisibleToHead(`00__${n_book}__${chapter}__${verse_to_show}`, 0);//todos los heads de cols
                            });

                            showTrans(n_book, chapter, verse, to_verse);
                            //console.log('--- encontrado n_book: ' +n_book + '\n short_name: ' +short_name);

                            //test //no hay chapter, no hay verse
                            if (chapter == null && verse == null) {
                                document.querySelector('#s_chapter').click();//propongo seleccionar el chapter
                            }
                            //hay chapter, no hay verse
                            if (chapter != null && parseInt(chapter) > 0 && verse == null) {
                                document.querySelector('#s_verse').click();// se cargan verses del chapter indicado para elegir el verse
                            }
                            //hay chapter, hay verse
                            if (parseInt(chapter) > 0 && parseInt(verse) > 0) {
                                document.querySelector('#s_verse').click();// se cargan verses del chapter indicado y se muestra el verse marcado
                            }
                        }//end modo_fetch_verses_for_cols == by_text


                        //modo new. getting only verses to show by json
                        if(modo_fetch_verses_for_cols == 'by_json'){
                            //console.log('modo_fetch_verses_for_cols == by_json');
                            
                            //1. solo hay capitulo y no hay verse //funciona
                            if(chapter && verse == null){//no hay verse //funciona
                                //eid_v_verse.innerHTML = '<span class="prim_verse">2. Antes de seleccionar el versículo, selecciona el capítulo por favor.</span>';
                                //creo virtual e
                                const e_virtual = document.createElement('li');
                                e_virtual.id = 'e_virt';
                                e_virtual.setAttribute('data-id_chapter',0);
                                e_virtual.setAttribute('data-show_chapter',1);
                                setTimeout(()=>{
                                    selChapter(e_virtual, chapter);                           
                                },50);


                                if(eid_v_book.querySelector('.li_active') != null){
                                    eid_v_book.querySelector('.li_active').classList.remove('li_active');//quito anterior book
                                } 
                                if(eid_v_book.querySelector('div[data-id_book="'+n_book+'"]') != null){
                                    eid_v_book.querySelector('div[data-id_book="'+n_book+'"]').classList.add('li_active');//añado book
                                }
        
                                //si es mobile, cierro menu
                                if(window.innerWidth < pantallaTabletMinPx){
                                    //console.log(' btn ok. cierro menu en mobile.');
                                    closeSidebar();
                                }
        
                                //meto Gen.1:1 en los head de cada trans
                                document.querySelectorAll('.partMob .mob_sh_link').forEach(el=>{
                                    let verse_to_show = (verse > 0) ? parseInt(verse) : 1 ;
                                    putRefVisibleToHead(`00__${n_book}__${chapter}__${verse_to_show}`, 0);//todos los heads de cols
                                });
        
                                
                                showTrans(n_book, chapter, verse, to_verse);
                                //console.log('--- encontrado n_book: ' +n_book + '\n short_name: ' +short_name);

                                //test //no hay chapter, no hay verse
                                if(chapter == null && verse == null){
                                    document.querySelector('#s_chapter').click();//propongo seleccionar el chapter
                                }
                                //hay chapter, no hay verse
                                if(chapter != null && parseInt(chapter) > 0 && verse == null){
                                    document.querySelector('#s_verse').click();// se cargan verses del chapter indicado para elegir el verse
                                }
                                //hay chapter, hay verse
                                if(parseInt(chapter) > 0 && parseInt(verse) > 0){
                                    document.querySelector('#s_verse').click();// se cargan verses del chapter indicado y se muestra el verse marcado
                                }
                                
                            }
                            
                            //hay capitulo y hay verse //funciona
                            if(chapter && verse != null && parseInt(verse) > 0){

                                let url = './modules/text/'+trans+'/' + dataBooksBtnOk[i].PathName;// "./modules/text/rstStrongRed/02_exodus.htm"                                
                                
                                let formData = new FormData();
                                formData.append('url','../'+url);
                                formData.append('book', n_book);
                                formData.append('chapter', chapter);
        
                                fetch('app/read_file_get_VerseQty_to_json.php',{
                                    method: 'POST',
                                    body: formData
                                })
                                .then(response => response.json())
                                .then(data => {
                                    
                                    //console.log('data: ',data);
                                    //console.log('15047. VerseQty of chapter: ',data);
                                    
                                    if(verse > data.VerseQty) verse = data.VerseQty;
                                    //console.log('15047. verse: ',verse);

                                    eid_inpt_nav.value += ':' + verse;
                                    obj_nav.id_verse = parseInt(verse) - 1;
                                    obj_nav.show_verse = verse;
                                    eid_inpt_nav.setAttribute('data-id_verse',parseInt(verse) - 1);
                                    eid_inpt_nav.setAttribute('data-show_verse',verse);
                                    eid_v_verse.innerHTML = '';


                                    //hay to_verse
                                    if(to_verse != null && parseInt(to_verse) > data.VerseQty) to_verse = data.VerseQty;
                                    //console.log('15096. to_verse: ',to_verse);

                                    if(to_verse != null && parseInt(to_verse) > 0 && parseInt(verse) < parseInt(to_verse)){
                                        eid_inpt_nav.value += '-' + to_verse;
                                        eid_inpt_nav.setAttribute('data-show_to_verse',to_verse);
                                        obj_nav.show_to_verse = to_verse;
                                    }else{
                                        eid_inpt_nav.setAttribute('data-show_to_verse','');
                                        obj_nav.show_to_verse = '';
                                    }

                                    if(eid_v_book.querySelector('.li_active') != null){
                                        eid_v_book.querySelector('.li_active').classList.remove('li_active');//quito anterior book
                                    } 
                                    if(eid_v_book.querySelector('div[data-id_book="'+n_book+'"]') != null){
                                        eid_v_book.querySelector('div[data-id_book="'+n_book+'"]').classList.add('li_active');//añado book
                                    }
            
                                    //si es mobile, cierro menu
                                    if(window.innerWidth < pantallaTabletMinPx){
                                        //console.log(' btn ok. cierro menu en mobile.');
                                        closeSidebar();
                                    }
            
                                    //meto Gen.1:1 en los head de cada trans
                                    document.querySelectorAll('.partMob .mob_sh_link').forEach(el=>{
                                        let verse_to_show = (verse > 0) ? parseInt(verse) : 1 ;
                                        putRefVisibleToHead(`00__${n_book}__${chapter}__${verse_to_show}`, 0);//todos los heads de cols
                                    });



                                    showTrans(n_book, chapter, verse, to_verse);
                                    //console.log('--- encontrado n_book: ' +n_book + '\n short_name: ' +short_name);
        
                                                            //test //no hay chapter, no hay verse
                                    if(chapter == null && verse == null){
                                        document.querySelector('#s_chapter').click();//propongo seleccionar el chapter
                                    }
                                    //hay chapter, no hay verse
                                    if(chapter != null && parseInt(chapter) > 0 && verse == null){
                                        document.querySelector('#s_verse').click();// se cargan verses del chapter indicado para elegir el verse
                                    }
                                    //hay chapter, hay verse
                                    if(parseInt(chapter) > 0 && parseInt(verse) > 0){
                                        document.querySelector('#s_verse').click();// se cargan verses del chapter indicado y se muestra el verse marcado
                                    }
            
                                })
                                .catch(error => { 
                                    // Código a realizar cuando se rechaza la promesa
                                    console.error('VerseQty. error promesa: '+error);
                                });

                            }

                        }//end modo_fetch_verses_for_cols == 'by_json'


                        break;
                    }else{
                        //console.log('no hay coincidencia en el nombre corto de la Biblia... ');
                    }
                }//end for                
            }//end for

        //}
        


    }else{
        //console.log('no existe book chapter y verse');
    }
}







async function parseTextToArrRef(textRef, trans = null){
    //console.log('=== function parseTextToArrRef(text) ===');

    let act_trans = eid_trans1.dataset.trans;
    let trans_inpt = eid_inpt_nav.dataset.trans;
    const s_book = document.querySelector('#s_book');

    //Si no viene trans, lo cojo del div #trans1
    if(trans == null || trans == ''){
        trans = (trans_inpt != '') ? trans_inpt : act_trans;
    }else{//si viene trans...        
        //si trans es distinto del actual y es en tablet o desktop
        if(trans != act_trans && window.innerWidth >= pantallaTabletMinPx){
            //lo cojo del parametro y grabo en div #trans1
            let button_new_trans = document.querySelector('#footerInner button[value="'+trans+'"]');
            let EnglishPsalms = button_new_trans.getAttribute('ep');//EnglishPsalms

            s_book.click();//function sel(; click на 'Книга', чтобы загрузились названия книг выбраного модуля.
            
            let trans_buttons = document.querySelectorAll('#footerInner button');
            trans_buttons.forEach(el=>{
                el.classList.remove('btn_active');
            });
            button_new_trans.classList.add('btn_active');
            //console.log('nuevo trans: '+trans);
        }
    }

    let inpt_v = textRef.trim();
    let book = null;//por defecto
    let chapter = null;//por defecto
    let verse = null;//por defecto
    let to_verse = null;//por defecto
    //console.log(inpt_v);

    //Solo book
    if(inpt_v.split(' ').length == 1){
        let arr_book = inpt_v.split(' ');
        book = arr_book[0];
    }

    //Ejemplo: 'Jn.3:16' y Jn.3:16-18
    if(inpt_v.includes(':')){
        let arr_v = inpt_v.split(':');
        verse = arr_v[1];
        //console.log('verse: '+verse);
        
        if(verse.includes('-')){
            let arr_verse = verse.split('-');
            verse = arr_verse[0];
            to_verse = arr_verse[1];
            //console.log('to_verse: '+to_verse);
        }

        if(arr_v[0].includes('.')){
            let arr_ch = arr_v[0].split('.');

            if(arr_ch.length == 2){
                book = arr_ch[0] + '.';
                chapter = arr_ch[1];
            }
            if(arr_ch.length == 3){// 'Иис.Нав.1' = ['Иис', 'Нав', '1']
                book = arr_ch[0] + '.' + arr_ch[1] + '.';
                chapter = arr_ch[2];
            }
            //console.log('book: '+book);
            //console.log('chapter: '+chapter);
        }

        if(arr_v[0].includes(' ')){
            let arr_ch = arr_v[0].split(' ');
            book = arr_ch[0];
            chapter = arr_ch[1];
            //console.log('book: '+book);
            //console.log('chapter: '+chapter);
        }
    }

    //Ejemplo: 'Jn.3,16'
    if(inpt_v.includes(',')){
        let arr_v = inpt_v.split(',');
        verse = arr_v[1];
        //console.log('verse: '+verse);
        
        if(verse.includes('-')){
            let arr_verse = verse.split('-');
            verse = arr_verse[0];
            to_verse = arr_verse[1];
            //console.log('to_verse: '+to_verse);
        }

        if(arr_v[0].includes('.')){
            let arr_ch = arr_v[0].split('.');
            book = arr_ch[0] + '.';
            chapter = arr_ch[1];
            //console.log('book: '+book);
            //console.log('chapter: '+chapter);
        }

        if(arr_v[0].includes(' ')){
            let arr_ch = arr_v[0].split(' ');
            book = arr_ch[0];
            chapter = arr_ch[1];
            //console.log('book: '+book);
            //console.log('chapter: '+chapter);
        }
    }

    //Ejemplo: 'Jn. 3 16' y 'Jn 3 16-18' // sin ':'
    if(inpt_v.includes(' ') && !inpt_v.includes(':') && !inpt_v.includes(',')){
        let arr_v = inpt_v.split(' ');

        if(arr_v.length > 3){
            arr_v = arr_v.filter(elem => elem);
            book = arr_v[0];
            chapter = arr_v[1];
            verse = arr_v[2];
            if(arr_v[3] == '-' && !isNaN(arr_v[4])){
                to_verse = arr_v[4];
            }
        }

        if(arr_v.length == 3){
            verse = arr_v[2];
            if(verse.includes('-')){
                let arr_verse = verse.split('-');
                verse = arr_verse[0];
                to_verse = arr_verse[1];
                //console.log('to_verse: '+to_verse);
            }
            chapter = arr_v[1];
            book = arr_v[0];
        }
        if(arr_v.length == 2){
            verse = null;
            chapter = arr_v[1];
            book = arr_v[0];
        }

        //console.log('book: '+book);
        //console.log('chapter: '+chapter);
        //console.log('verse: '+verse);
        //console.log('to_verse: '+to_verse);
    }

    //Si exisate book busco chapter y verse/to_verse si hay
    if(book != null){
        //console.log('parseTextToArrRef --- book != null');

        let Translation = trans;
        let objTrans = arrFavTransObj.find(v => v.Translation === Translation);
        
        //MODO NEW. Cuando  ya está creado el objeto 'objTrans' desde 'arrFavTransObj'
        if(typeof objTrans != 'undefined' && objTrans != null && objTrans != ''){
            //console.log('getRef() --- objTrans está creado. abajo objTrans: ');
            //console.log(objTrans);

            //saco ajustes de este modulo en json               
            let data = objTrans;
            //console.log(data);
    
            window.dataBooksBtnOk = data.Books;

            for (let i = 0; i < dataBooksBtnOk.length; i++) {
                for (let j = 0; j < dataBooksBtnOk[i].ShortNames.length; j++) {
                    const el = dataBooksBtnOk[i].ShortNames[j];
                    if(book.toLowerCase() == el.toLowerCase() || book.toLowerCase()+'.' == el.toLowerCase()){//añado '.' por si viene 'Sal' y en ShortNames hay 'Sal.'
                        let n_book = dataBooksBtnOk[i].BookNumber;
                        let short_name = dataBooksBtnOk[i].ShortNames[0];//siempre el primer nombre del array
                        
                        chapter = (chapter != null) ? chapter : 1;//default si no hay
                        if(chapter > dataBooksBtnOk[i].ChapterQty) chapter = dataBooksBtnOk[i].ChapterQty;

                        //reviso desde qué divtrans se llega a introducir la referencia para preparar la ref correspondiente para trans1 si se accede desde otros trans's en mobile
                        if(window.innerWidth < pantallaTabletMinPx){//mobile
                            //checkRefNav(n_book, chapter, verse, to_verse);                        
                        
                            if(document.querySelectorAll('.cols').length > 1){

                                //si es trans2 y es trans con EnglishPsalms 'Y' se cliquea en el boton li de chapter Sal.23 español, convierto el chapter en el Пс 22 ruso 
                                //console.log('clickeado trans: '+eid_inpt_nav.dataset.trans);
                                
                                let trans_base = eid_trans1.dataset.trans;//la trans base de #trans1
                                let trans_inpt = eid_inpt_nav.dataset.trans;// trans desde input
                                let divtrans_inpt = eid_inpt_nav.dataset.divtrans;// trans desde input

                                if(divtrans_inpt != '' && divtrans_inpt != 'trans1'){
                                    // Usa el método find para buscar el objeto que contiene 'rst' como nombre
                                    const obj_trans_base = arrFavTransObj.find(v => v.Translation === trans_base);
                                    const obj_trans_inpt = arrFavTransObj.find(v => v.Translation === trans_inpt);
                                    let new_res;

                                    if(obj_trans_base.EnglishPsalms == 'N' && obj_trans_inpt.EnglishPsalms == 'Y'){
                                        new_res = convertLinkFromEspToRus(n_book, chapter, verse, to_verse);//importante EspToRus
                                        chapter = new_res[1];
                                        verse = new_res[2];
                                        to_verse = new_res[3];
                                        //console.log('en getRef() --- convertido chapter: '+chapter);//empezando de 1
                                        //console.log('en getRef() --- convertido verse: '+verse);//empezando de 1
                                        //console.log('en getRef() --- convertido to_verse: '+to_verse);//empezando de 1
                                    }
                                    else if(obj_trans_base.EnglishPsalms == 'Y' && obj_trans_inpt.EnglishPsalms == 'N'){
                                        new_res = convertLinkFromRusToEsp(n_book, chapter, verse, to_verse);//importante RusToEsp
                                        chapter = new_res[1];
                                        verse = new_res[2];
                                        to_verse = new_res[3];
                                        //console.log('en getRef() --- convertido chapter: '+chapter);//empezando de 1
                                        //console.log('en getRef() --- convertido verse: '+verse);//empezando de 1
                                        //console.log('en getRef() --- convertido to_verse: '+to_verse);//empezando de 1
                                    }else{
                                        //console.log('en getRef() --- no hago nada. chapter verse to_verse se quedan igual como en input.');
                                    }

                                }
                            }                        
                        } 
                        
                        let  arr_result = [];                        
                        
                        //1. solo hay capitulo y no hay verse //funciona
                        if(chapter && verse == null){//no hay verse //funciona
                            
                            verse = 1 ;
                            arr_result = [n_book, parseInt(chapter), verse, to_verse];
                            //console.log('arr_result: ', arr_result);
                            return arr_result;
                        }
                        
                        //hay capitulo y hay verse //funciona
                        if(chapter && verse != null && parseInt(verse) > 0){

                            let url = './modules/text/'+trans+'/' + dataBooksBtnOk[i].PathName;// "./modules/text/rstStrongRed/02_exodus.htm"                                
                            
                            let formData = new FormData();
                            formData.append('url','../'+url);
                            formData.append('book', n_book);
                            formData.append('chapter', chapter);

                            fetch('app/read_file_get_VerseQty_to_json.php',{
                                method: 'POST',
                                body: formData
                            })
                            .then(response => response.json())
                            .then(data => {
                                
                                //console.log('data: ',data);
                                //console.log('15047. VerseQty of chapter: ',data);

                                verse = (verse > 0) ? parseInt(verse) : 1 ;
                                if(verse > data.VerseQty) verse = data.VerseQty;
                                //console.log('15047. verse: ',verse);

                                //hay to_verse
                                if(to_verse != null && parseInt(to_verse) > data.VerseQty) to_verse = data.VerseQty;
                                //console.log('15096. to_verse: ',to_verse);

                                if(to_verse != null && parseInt(to_verse) > 0 && parseInt(verse) < parseInt(to_verse)){
                                    to_verse = parseInt(to_verse);//lo dejo igual
                                }else{
                                    to_verse = null;
                                }

                                arr_result = [n_book, parseInt(chapter), verse, to_verse];
                                //console.log('arr_result: ', arr_result);
                                return arr_result; 
                            })
                            .catch(error => { 
                                // Código a realizar cuando se rechaza la promesa
                                console.error('VerseQty. error promesa: '+error);
                            });

                        }                        

                        break;
                    }else{
                        //console.log('no hay coincidencia en el nombre corto de la Biblia... ');
                    }
                }//end for                
            }//end for

        }

    }else{
        //console.log('no existe book');
    }
}








function hideShowComment(ev){ 
    let elem = ev.currentTarget;
    //console.log(ev.target);

    if(ev.target.className == 'tooltip' || ev.target.className == 'asterisco'){
        let comment = elem.querySelector('.comment');

        if(comment.classList.contains('d-none')){
            let commentAll = document.querySelectorAll('.comment');
            commentAll.forEach(el=>{
                el.classList.remove('d-block');
                el.classList.add('d-none');
            });
            let trikAll = document.querySelectorAll('.trik');
            trikAll.forEach(el=>{
                el.classList.remove('d-block');
                el.classList.add('d-none');
            });        
            show_comment(elem);        
        }else{
            close_comment(elem);        
        }
    }
}
function show_comment(elem){
    let trik = elem.querySelector('.trik');
    let comment = elem.querySelector('.comment');

    trik.classList.remove('d-none');
    trik.classList.add('d-block');
    comment.classList.remove('d-none');
    comment.classList.add('d-block');

    setTimeout(()=>{
        trik.style.opacity = 1;
        comment.style.opacity = 1;
    },10);    
}
function close_comment(elem){
    let trik = elem.querySelector('.trik');
    let comment = elem.querySelector('.comment');

    trik.style.opacity = 0;
    comment.style.opacity = 0;

    setTimeout(()=>{
        trik.classList.remove('d-block');
        trik.classList.add('d-none');
        comment.classList.remove('d-block');
        comment.classList.add('d-none');
    },300);
}
function close_comment_x(elem, event){
    event.stopPropagation();
    close_comment(elem);
}