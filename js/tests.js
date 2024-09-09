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
//ejecutar0(`../modules/text/nrt/bibleqt.json`);
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
//ejecutar2(`../modules/text/nrt/bibleqt.json`,'json');
setTimeout(()=>{
    //ejecutar2(`../modules/text/nrt/nrt_01.htm`,'text');
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
    //console.log('=== function ejecutarFetch() ===');
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
                    
                        eid_inpt_nav.setAttribute('data-book_short_name',short_name);
                        eid_inpt_nav.setAttribute('data-id_book',n_book);
                        eid_inpt_nav.setAttribute('data-show_chapter',chapter);
                        eid_inpt_nav.value = short_name;
                        obj_nav.book_short_name = short_name;
                        
                        //chapter
                        if(chapter != null && parseInt(chapter) > 0){
                            eid_inpt_nav.value += ' ' + chapter;
                            obj_nav.show_chapter = chapter;
                            eid_v_chapter.innerHTML = '';
                        }else{
                            eid_v_chapter.innerHTML = 'selecciona el capítulo';
                            obj_nav.show_chapter = chapter;//por defecto para que no dé fallo
                        }

                        
                        //modo old. getting all file and showing only needed verses
                        if(modo_fetch_verses_for_cols == 'by_text'){
                            //console.log('modo_fetch_verses_for_cols == by_text');
                            
                            //verse
                            if (verse != null && parseInt(verse) > 0) {
                                eid_inpt_nav.value += ':' + verse;
                                obj_nav.show_verse = verse;
                                eid_inpt_nav.setAttribute('data-show_verse', verse);
                                eid_v_verse.innerHTML = '';
                            } else {
                                //eid_v_verse.innerHTML = '<span class="prim_verse">2. Antes de seleccionar el versículo, selecciona el capítulo por favor.</span>';
                                //creo virtual e
                                const e_virtual = document.createElement('li');
                                e_virtual.id = 'e_virt';
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

                            allowUseShowTrans = true;
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
        
                                allowUseShowTrans = true;
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

                                let url = `./modules/text/${trans}/${dataBooksBtnOk[i].PathName}`;// `../modules/text/rstStrongRed/02_exodus.htm`                                
                                
                                let formData = new FormData();
                                // formData.append('url', url);//antes
                                formData.append('url', '../'+url);//importante '../' delante de la url
                                formData.append('book', n_book);
                                formData.append('chapter', chapter);
        
                                fetch('./php/read_file_get_VerseQty_to_json.php',{
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
                                    obj_nav.show_verse = verse;
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


                                    allowUseShowTrans = true;
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

                            let url = `./modules/text/${trans}/${dataBooksBtnOk[i].PathName}`;// `../modules/text/rstStrongRed/02_exodus.htm`
                            
                            let formData = new FormData();
                            // formData.append('url', url);//antes
                            formData.append('url', '../'+url);//importante '../' delante de la url
                            formData.append('book', n_book);
                            formData.append('chapter', chapter);

                            fetch('./php/read_file_get_VerseQty_to_json.php',{
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





// Obtener el botón
var myButton = document.getElementById('myButton');

//Desktop
var pressTimer;

// Agregar eventos de mousedown y mouseup al botón
myButton.addEventListener('mousedown', startPress);
myButton.addEventListener('mouseup', stopPress);
myButton.addEventListener('mouseout', stopPress); // Manejar el caso en que el mouse salga del área del botón

function startPress() {
    // Establecer un temporizador después de 500 milisegundos (ajusta el valor según tus necesidades)
    pressTimer = setTimeout(function () {
        // Aquí se ejecuta tu función o código cuando se detecta una pulsación larga
        alert('Pulsación larga detectada en Desktop');
    }, 1000);
}

function stopPress() {
    // Limpiar el temporizador si se libera el botón antes de que transcurran 500 milisegundos
    clearTimeout(pressTimer);
}


//Movil
var touchTimer;

function startPressMob() {
    touchTimer = setTimeout(function () {
        // Aquí se ejecuta tu función o código cuando se detecta una pulsación larga
        alert('Pulsación larga detectada en móvil');
    }, 1000); // Ajusta la duración según tus necesidades
}

function stopPressMob() {
    clearTimeout(touchTimer);
}

// Agregar evento touchstart para iniciar el temporizador
myButton.addEventListener('touchstart', startPressMob);
// Agregar evento touchend para cancelar el temporizador si se levanta el dedo antes de la duración establecida
myButton.addEventListener('touchend', stopPressMob);










//iniciarSession('Sergio',123);

function old_iniciarSession(user, pass){//test
    //console.log('=== function iniciarSession(user, pass) ===');

    let formData = new FormData();
    formData.append('user',user);
    formData.append('pass',pass);

    fetch('./php/test_session_start.php',{
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        
        //console.log(data);

    })
    .catch(error => {
        console.error('error fetch ', error);
    });

}





















// Función que retorna una promesa
async function retornarMiPromesa() {
    //console.log('=== async function retornarMiPromesa() ===');
    
    // Crea una nueva promesa dentro de la función
    return new Promise((resolve, reject) => {
        //console.log('creando promesa');
        
        // Simula una operación asincrónica, por ejemplo, una solicitud HTTP
        setTimeout(() => {
            // Resuelve la promesa con éxito después de 2 segundos
            resolve(' en SetTimeout() --- ¡La operación fue exitosa!');
        }, 5000);
    });
}


// Uso de async/await para manejar la promesa
async function ejecutarMiPromesa(){
    //console.log('=== async function ejecutarMiPromesa() ===');

    try {
        //console.log('ejecutarMiPromesa() --- Iniciando operación...');
        // Espera a que la promesa se resuelva antes de continuar
        const resultado = await retornarMiPromesa();
        //console.log(resultado);
        //console.log('Despues de obtener resultado. Operación completada.');
    } catch (error) {
        // Manejo de errores si la promesa es rechazada
        console.error('Error:', error);
    }
}
//ejecutarMiPromesa();


setTimeout(()=>{
    //compare2modules('rv60','ukr_umts'); 
},2000);

let arr_refs = [];
let add_condition = true; 

function compare2modules(trans1, trans2){
    //console.log('=== function compare2modules(modul1, module2) ===');
    
    arr_refs = [];//reset

    let objTrans1 = arrFavTransObj.find(v => v.Translation === trans1);
    let objTrans2 = arrFavTransObj.find(v => v.Translation === trans2);
            
    for (let b = 0; b < objTrans1.Books.length; b++) {
        //console.log(`objTrans1.Books[${b}] --- BookName: ${objTrans1.Books[b].FullName} --- ${objTrans2.Books[b].FullName}`);

        let condition; 
        if(add_condition){
            condition = (typeof obj_bible_files[trans1].Books[b] != 'undefined' && typeof obj_bible_files[trans2].Books[b] != 'undefined');
        }else{
            condition = true;
        }

        if(
            typeof obj_bible_files[trans1] != 'undefined' && typeof obj_bible_files[trans2] != 'undefined' && condition
            //&& typeof obj_bible_files[trans1].Books[b].fileName != 'undefined' && typeof obj_bible_files[trans2].Books[b].fileName != 'undefined'
        ){

            //console.log('fileName1: ', obj_bible_files[trans1].Books[b].fileName);
            //console.log('fileName2: ', obj_bible_files[trans2].Books[b].fileName);

            bookModule1 = obj_bible_files[trans1].Books[b].fileContent;
            bookModule2 = obj_bible_files[trans2].Books[b].fileContent;

            let nb1 = bookModule1.split('<h4>');//делю файл на главы
            let nb2 = bookModule2.split('<h4>');//делю файл на главы
            //console.log(nb1);
            
            nb1 = nb1.filter(elem => elem);//удаляю пустые елементы массива
            nb2 = nb2.filter(elem => elem);//удаляю пустые елементы массива
            //console.log(nb1);


            for (let chapter = 1; chapter < nb1.length; chapter++) {
                //console.log(chapter);

                if(typeof nb1[chapter] !== 'undefined' && typeof nb2[chapter] !== 'undefined'){

                    let nb1_verses = nb1[chapter].split('<p>');
                    let nb1_count_verses = nb1_verses.length;

                    let nb2_verses = nb2[chapter].split('<p>');
                    let nb2_count_verses = nb2_verses.length;

                    if(nb1_count_verses != nb2_count_verses){
                        
                        //console.log(`--- objTrans1.Books[${b}] --- BookName: ${objTrans1.Books[b].FullName} --- ${objTrans2.Books[b].FullName}`);
                        //console.log(`chapter: ${chapter} --- nb1_count_verses: ${nb1_count_verses} --- nb2_count_verses: ${nb2_count_verses}`);

                        for (let i = 0; i < nb1_verses.length; i++) {
                            const el = nb1_verses[i];
                            
                            if(i != 0){//Verse
                                
                                //console.log('el es Verse: '+el);

                                let p_Text1 = nb1_verses[i];
                                let p_Text2 = nb2_verses[i];                                        

                                //console.log('p_Text1: '+p_Text1);
                                //console.log('p_Text2: '+p_Text2);

                                let arr_p1 = (typeof p_Text1 != 'undefined') ? p_Text1.split(' ') : ['no_hay','p_Text1_undefined'];
                                let VerseId1 = arr_p1[0];
                                //console.log('VerseId1: '+VerseId1);

                                let arr_p2 = (typeof p_Text2 != 'undefined') ? p_Text2.split(' ') : ['no_hay','p_Text2_undefined'];
                                let VerseId2 = arr_p2[0];
                                //console.log('VerseId2: '+VerseId2);

                                if(VerseId1 != VerseId2 && VerseId2 != 'no_hay'){
                                    let ref1 = `${objTrans1.Books[b].ShortNames[0]} ${chapter}:${VerseId1}`;
                                    let ref2 = `${objTrans2.Books[b].ShortNames[0]} ${chapter}:${VerseId2}`;
                                    
                                    //console.log(`--- --- chapter: ${chapter} --- NO ok --- objTrans1.Books[${b}] --- ref1: (${ref1}) --- ref2: (${ref2})`);
                                    //let obj_diff_refs = {
                                    //    trans1: ref1,
                                    //    trans2: ref2
                                    //};
                                    arr_refs.push(ref1);
                                    
                                    break;
                                }
                            }                                    
                        }//end for
                    }else{
                        //console.log(`--- chapter: ${chapter} --- ok`);

                    }
                }else{
                    //console.log(`chapter ${chapter} no se puede comparar`);
                }
            }
            //console.log('arr_refs: ',arr_refs);


        }else{
            //console.log('--- no existe objeto con estos modulos en obj_bible_files. no los comparo.');
        }                            
    }//end for

    //console.log('fin. arr_refs: ', arr_refs);
}

//getRefByBibleRef(arr_refs[0]);

function recorrerArrRefs(arr_refs){

    for (let index = 0; index < arr_refs.length; index++) {
        const ref = arr_refs[index];
        //console.log(ref);

        getRefByBibleRef(ref);
        
    }
}

//getIndexFromArrRefs(0);
function getIndexFromArrRefs(index){
    return getRefByBibleRef(arr_refs[index]);
}


/*
let ukr_ogi = [];

but.forEach((el,i)=>{ 
  
  
                     
    if(el.chapter == 1 && el.verse == 1){
        //console.log('<h2>libro '  + el.book_number+ '</h2>');
        arr.push(`<h2>${ukr_ogi[i].FullName}</h2>`);
        arr.push(`<h4>${el.chapter}</h4>`);
        arr.push(`<p>${el.verse} ${el.text}`);
    }else{
        
        if(el.verse == 1){
            //console.log('<h4>capitulo '  + el.chapter+ '</h4>');
            arr.push(`<h4>${el.chapter}</h4>`);
            arr.push(`<p>${el.verse} ${el.text}`);
        }else{
            arr.push(`<p>${el.verse} ${el.text}`);
        }                      
        

    }

    
    
    
});

*/


function ejecutar_alert1(str){
    alert(str);
}

function llamar_alert1(ev, f_number){
    let id_verse2 = ev.currentTarget.parentNode.parentNode.id;

    let str = 'onclick: ' + id_verse2 + ' f_number: ' + f_number;
    ejecutar_alert1(str);
}


function makeCommentsLinks(idCol){
    //console.log('idCol: ', idCol);

    const los_f_all = document.getElementById(idCol).querySelectorAll('f');
    //console.log('los_f_all: ', los_f_all);

    Array.from(los_f_all).forEach(el=>{    
        //console.log(el);
        let marker = el.innerText;
        //console.log('marker: ', marker);

        let f_number = el.innerText.replace('[','').replace(']','');
        //console.log('f_number: ', f_number);

        let p_id = el.parentNode.parentNode.id;
        let a_ref = el.parentNode.parentNode.querySelector('a').innerText;
        let arr_p_id = p_id.split('__');
        let trans = arr_p_id[0];
        let book = arr_p_id[1]; 
        let chapter = arr_p_id[2];
        let verse = arr_p_id[3];
        //console.log('arr_p_id: ', arr_p_id);
 
        //el.removeEventListener('click', llamar_alert1); 
        //el.addEventListener('click', llamar_alert1);

        //nuevo elemento
        let wr_tooltip = buildWrTooltipComm(marker,' ',p_id,a_ref); 
        //console.log(wr_tooltip.outerHTML);        

        // Reemplazar el elemento existente con el nuevo elemento
        el.replaceWith(wr_tooltip);
    });
}

async function getCommentFromMB(url_comments,book,chapter,verse,marker){
    //console.log('=== function getCommentFromMB() ===');

    //console.log('url_comments: ', url_comments);
    //console.log('book: ', book);
    //console.log('chapter: ', chapter);
    //console.log('verse: ', verse);
    //console.log('marker: ', marker);

    try {
        
        // Realiza una solicitud GET a una API
        const respuesta = await fetch(url_comments);

        // Verifica si la solicitud fue exitosa
        if (!respuesta.ok) {
            throw new Error('Error al obtener datos de la API');
        }

        // Convierte la respuesta a formato JSON
        const datos = await respuesta.json();

        // Haz algo con los datos, por ejemplo, imprímelos en la consola
        //console.log(datos);

        let this_comm = datos.find(v => {
            return (
                v.book_number === book &&
                (v.chapter_number_from === chapter || v.chapter_number_to === chapter) &&
                (v.verse_number_from === verse || v.verse_number_to === verse) &&
                v.marker === marker
            );
        });
        //console.log('this_comm: ');
        //console.log(this_comm);

        // Puedes realizar más acciones aquí con los datos obtenidos
        return this_comm;

    } catch (error) {
        console.error('Error: ', error);
    }
}


async function convertBookIndex(book_index,direction){//direction: 'bq_to_mb','mb_to_bq'
    try {
        book_index = Number(book_index);
        //console.log('book_index: ', book_index);
        //console.log('direction: ', direction);
        
        let url_BibleIndex = `./modules/json/BibleIndex.json`;        
        
        // Realiza una solicitud GET a una API
        const respuesta = await fetch(url_BibleIndex);

        // Verifica si la solicitud fue exitosa
        if (!respuesta.ok) {
            throw new Error('Error al obtener datos de la API');
        }

        // Convierte la respuesta a formato JSON
        const datos = await respuesta.json();

        // Haz algo con los datos, por ejemplo, imprímelos en la consola
        //console.log(url_BibleIndex);
        //console.log(datos);
        
        let this_book,book_number_converted;
        if(direction == 'bq_to_mb'){
            this_book = datos.find(v => v.book_number_bq === book_index);
            book_number_converted = this_book.book_number_mb;
        }else if(direction == 'mb_to_bq'){
            this_book = datos.find(v => v.book_number_mb === book_index);
            book_number_converted = this_book.book_number_bq;
        }
        //console.log('this_book: ');
        //console.log(this_book);
        //console.log('book_number_converted: ',book_number_converted);

        // Puedes realizar más acciones aquí con los datos obtenidos
        return book_number_converted;

    } catch (error) {
        console.error('Error: ', error);
    }
}

//setTimeout(()=>{
//    alert('pasados 5 seg. hago redirect desde test.js a index.php');
//    window.location.href = "index.php?reset_pwd_ok";// no hace falta '../index.php...'
//},5000);








                                
/*
//test
setTimeout(()=>{
    
    let url = "./modules/text/nrt/nrt_01.htm";//test
    let book = 2;
    let chapter = 5;
    alert('pasados 5 seg. ejecuto desde test.js --- url: ' + url);

    ejecutar_getVerseQty(url,book,chapter);
},5000);
*/

async function ejecutar_getVerseQty(url,book,chapter){
    //console.log('Inicio de la tarea asíncrona --- ejecutar_getVerseQty()');

    let result_getVerseQty = await getVerseQty(url,book,chapter);
    //console.log('result_getVerseQty: ',result_getVerseQty);
} 

async function getVerseQty(url,book,chapter){
    try {
        //console.log('=== async function getVerseQty() ===');
        //console.log('url: ', url);
        //console.log('book: ', book);
        //console.log('chapter: ', chapter);

        let formData = new FormData();
        formData.append('url', '../'+url);//importante '../' delante de la url
        formData.append('book', book);
        formData.append('chapter', chapter);

        
        // Realiza una solicitud GET a una API
        const respuesta = await fetch('./php/read_file_get_VerseQty_to_json.php',{
            method: 'POST',
            body: formData
        });

        // Convierte la respuesta a formato JSON
        const data = await respuesta.json();
        // const data = await respuesta.text();
        //console.log(' en getVerseQty() --- data:');
        //console.log(data);

        //console.log('=== fin de --- async function getVerseQty() ===');

        return data;

    } catch (error) {
        console.error('Error: ', error);
    }
}




var arrBooks = [];
var arrText = [];
let url = 'https://bolls.life/static/translations/UMT.json';
//makeBibleTextFromJson(url);

function makeBibleTextFromJson(url){

    fetchDataToJson(url)
    .then((data) => {

        //console.log(' abajo data:');
        //console.log(data);

        data.forEach(el => {
            
            //console.log(el);

            if(typeof arrBooks[el.book-1] == 'undefined'){
                arrBooks[el.book-1] = {};
                arrBooks[el.book-1].Chapters = {};
                arrText[el.book-1] = `<h2>kniga ${el.book-1}</h2>`;
            }
            //console.log(arrBooks);

            if(typeof arrBooks[el.book-1].Chapters[el.chapter] == 'undefined'){
                arrBooks[el.book-1].Chapters[el.chapter] = {};
                arrBooks[el.book-1].Chapters[el.chapter].Verses = {};
                arrText[el.book-1] += `<h4>Розділ ${el.chapter}</h4>`;

            }
            //console.log(arrBooks);


            if(typeof arrBooks[el.book-1].Chapters[el.chapter].Verses == 'undefined'){
                arrBooks[el.book-1].Chapters[el.chapter].Verses = {};
            }
            //console.log(arrBooks);


            if(typeof arrBooks[el.book-1] != 'undefined' && typeof arrBooks[el.book-1].Chapters[el.chapter] != 'undefined'){
                arrBooks[el.book-1].Chapters[el.chapter].Verses[el.verse] = {
                    "verseId": el.verse,
                    "text": el.text,
                    "comment": el.comment
                };

                if(typeof el.comment != 'undefined'){
                    arrText[el.book-1] += `<p>${el.verse} ${el.text} * [( ${el.comment} )]</p>`;
                }else{
                    arrText[el.book-1] += `<p>${el.verse} ${el.text}</p>`;
                }


            }
            //console.log(arrBooks);        
        });

        //console.log('abajo arrBooks: ');
        //console.log(arrBooks);

        //console.log('abajo arrText: ');
        //console.log(arrText);   
       
    })
    .catch(error => { 
        console.error('data. error promesa: '+error);
    });
}





function sss(h = 0){
    
    finishScrollInColsInner();//desabilito scroll en paralelo

    document.querySelectorAll('.colsInner').forEach(el=>{
        el.scrollTo({
            top: h,
            behavior: 'smooth'
            //behavior: 'instant'
          });
    });

    //init_scroll_in_colsInner();//desabilito scroll en paralelo
}

function addPaddingInColsInnerP(){
    document.querySelectorAll('.colsInner p').forEach(el=>{
        el.classList.add('p10p5p0');
    })
}

function removePaddingInColsInnerP(){
    document.querySelectorAll('.colsInner p').forEach(el=>{
        el.classList.remove('p10p5p0');
    })
}






let start_copy = true;
function makeModuleFromYouVersion(ChapterContent_reader, ChapterContent_p, ChapterContent_label, ChapterContent_content){

    let textChapter = '';

    //let ChapterContent_reader = 'ChapterContent_reader__Dt27r';
    //let ChapterContent_p = 'ChapterContent_p__dVKHb';
    //let ChapterContent_label = 'ChapterContent_label__R2PLt';
    //let ChapterContent_content = 'ChapterContent_content__RrUqA';

    let text_h4 = document.querySelector(`.${ChapterContent_reader} h1`).innerText;
    textChapter += `<h4>${text_h4}</h4>\n`;

    let p_All = document.querySelectorAll(`.${ChapterContent_p}`);
    
    p_All.forEach( (el,i)=>{   
        
        let v_number = el.querySelector(`.${ChapterContent_label}`).innerText;
        let v_text = el.querySelector(`.${ChapterContent_content}`).innerText;
        let p_verse = `<p>${v_number} ${v_text}</p>`;
        //console.log(p_verse);

        textChapter +=`${p_verse}\n`;

        //ultimo verse
        if(i == p_All.length - 1){
            textChapter +=`\n\r\n\r`;
        }
    });
    //console.log(textChapter);

    setTimeout(()=>{
        if(start_copy){
            let btns_prev_next = document.querySelectorAll('div[class*="pointer-events:all"] a');
            if(btns_prev_next.length == 2){
                btns_prev_next[1].click();//hay 2 botones. click sobre el segundo
            }else{
                btns_prev_next[0].click();//hay 1 boton. click sobre el primero y unico que es Next
            }
            makeModuleFromYouVersion('ChapterContent_reader__Dt27r', 'ChapterContent_p__dVKHb', 'ChapterContent_label__R2PLt', 'ChapterContent_content__RrUqA');
        }
    },1000);

}

//makeModuleFromYouVersion('ChapterContent_reader__Dt27r', 'ChapterContent_p__dVKHb', 'ChapterContent_label__R2PLt', 'ChapterContent_content__RrUqA');



//NO FUNCIONA COMO QUIERO YO. SE CREA BOTON, PERO AL SIG CLICK SE RECARGA LA WEB Y TENGO QUE HACERLO OTRA VEZ.
/*function crear_btn_click_me(){
    //btn 'Prev Chapter' en YouVersion
    const btn_prev_chapter = document.querySelectorAll('div[class*="pointer-events:all"] a')[0];
    //btn 'Next Chapter' en YouVersion
    const btn_next_chapter = document.querySelectorAll('div[class*="pointer-events:all"] a')[1];
    
    const btn_sk = document.createElement('button');
    btn_sk.id = 'btn_sk';
    btn_sk.style = `
        background: red;
        color: white;
        padding: 10px;
        border-radius: 3px;
        float: right;
        position: fixed;
        top: 190px;
        right: 0px;
        z-index: 9999;
    `;
    btn_sk.innerHTML = 'CLICK_ME';
    btn_sk.onclick = ()=>{
        makeModuleFromYouVersion(
            'ChapterContent_reader__Dt27r', 
            'ChapterContent_p__dVKHb', 
            'ChapterContent_label__R2PLt', 
            'ChapterContent_content__RrUqA'
        );
        setTimeout(()=>{
            //btn 'Next Chapter' en YouVersion
            btn_next_chapter.click();
            btn_sk.remove();
    
            setTimeout(()=>{
                crear_btn_click_me();
            },1000);
    
        },1000);
    };
    document.querySelector('body').prepend(btn_sk);    
}
*/

//como usar:
//1. copiar y pegar en la consola bibleqt.json de la traduccion deseada
//2. lanzar esta funcion
//3. copiar una string desde la consola y meterla en el campo 'Array de nombres...'
function makeArrPathName(obj_bibleqt, start_index_book = 0, end_index_book = 65){
    let arr_books = obj_bibleqt.Books;//copiar y pegar en la consola bibleqt.json y lanzar esta funcion
    
    end_index_book = (end_index_book > arr_books.length) ? (arr_books.length - 1) : end_index_book ;
    let arr_new = [];
    
    for (let index = start_index_book; index <= end_index_book; index++) {
        const el = arr_books[index];
        //console.log('el: ',el);
        arr_new.push(el.PathName);        
    }
    return arr_new.join(',');
}
//makeArrPathName(arrFavTransObj[0], 0, 65);//arrFavTransObj[0] == rstStrongRed




function generarImgSrc(nombreCarpeta, n_start, n_end){
    let ruta = 'modules/text/eg_img';
    let text_head = `<h2></h2>\n<h4>1</h4><p>1 \n`;
    let text = '';
    if(n_end < n_start){
        let n_min = n_end;
        let n_max = n_start;
        n_start = n_min;
        n_end = n_max;
    }

    for (let i = n_start; i <= n_end; i++) {
        let i_text;
        let i_length = i.toString().length;
        if(i_length == 1){
            i_text = '00' + i;
        }else if(i_length == 2){
            i_text = '0' + i;
        }else{
            i_text = i; 
        }
        let ruta_file = `${ruta}/${nombreCarpeta}/${i_text}.jpg`;
        text += `<img src="${ruta_file}"/>\n`;

        const url = ruta_file;

        fetch(url)
            .then(response => {
                if (response.ok) {
                    //console.log('El fichero existe.');
                } else if (response.status === 404) {
                    //console.error(`El fichero "${url}" no existe.`);//lo comento ya que la consola devuelve (Not found) y se vem sin este aviso
                } else {
                    console.error('Error al comprobar el fichero: ' + response.statusText);
                }
            })
            .catch(error => {
                console.error('Error al intentar acceder al fichero:', error);
            });
    }
    console.log(text_head + text);
}

/*
//por si acaso aquí tengo las páginas de cada libro de eg_img
let arrImgSrc = [
	['19_psalms',1134,1276],
	['20_proverbs',1277,1326],

	['40_matthew',11,101],
	['41_mark',102,158],
	['42_luke',159,253],
	['43_john',254,323],
	['44_acts',324,415],

	['45_james',416,425],
	['46_1peter',426,436],
	['47_2peter',437,443],
	['48_1john',444,453],
	['49_2john',454,455],
	['50_3john',456,457],
	['51_jude',458,460],
	
	['52_romans',461,497],
    ['53_1corinthians',498,533],
	['54_2corinthians',556,534],
	['55_galatians',557,569],
	['56_ephesians',570,582],
	['57_philippians',583,591],
	['58_colossians',592,599],
	['59_1thessalonians',600,607],
	['60_2thessalonians',608,612],
	['61_1timothy',613,623],
	['62_2timothy',624,631],
	['63_titus',632,636],
	['64_philemon',637,638],
	['65_hebrews',639,666],

	['66_revelation',667,710]
];
*/

function makeAllImgSrc(arr){
    if(arr.length == 0) return false;
    arr.forEach(el=>{
        console.warn(el[0]);
        generarImgSrc(el[0], el[1], el[2]);
    });
}


















//generarLangJson(31,250);

function generarLangJson(n_start,n_end){
    const obj = {};
    for (let i = n_start; i <= n_end; i++) {
        //console.log(`"d${i}" : "",`);
        obj[`d${i}`] = "";//returns json de la traducción "d1_t":
    }
    obj[`es_end`] = "";
    return obj;
}



