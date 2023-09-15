//convertir links de Ruso a Español // contrario a la anterior checkLink()
function convertLinkFromRusToEsp(book, chapter, verse, to_verse = null){
    //console.log('=== function convertLinkFromRusToEsp() ===');
    //console.log('--- Convierto Псалом 118:63 en Psalmo 119:63 para TSK  u otra cosa.');

    var book = parseInt(book);
    var chapter = parseInt(chapter);
    var verse = parseInt(verse);
    var to_verse = parseInt(to_verse);

    //nuevos datos
    var bookNumber = book;
    var chapterNumber = chapter;
    var verseNumber = verse;
    var to_verseNumber = to_verse;


    //Convierto link Ruso (Пс. 22:1) -> en Español (Ps. 23:1) 
    //Convierto link Ruso (Пс. 118:63) -> en Español (Ps. 119:63) 
    switch (book) {

        case 3: //Числа
                if(chapter == 12){//12:X => 12:X (quito ultimo verse)
                    //todo ok
                }
                if(chapter == 13){//Числа 13:1 => Num.12:16 
                    if(verse == 1){
                        chapterNumber = 12;
                        verseNumber = 16;
                    }
                    if(verse >= 2){
                        verseNumber -= 1;//Чис.13:2 => Nm.13:1
                    }
                }
            break;

        case 5: //Иисус Навин
                if(chapter == 5){//Иис.Нав.5:16 => Jos.6:1                                    
                    if(verse == 16){
                        chapterNumber = 6;
                        verseNumber = 1;
                    } 
                }
                if(chapter == 6){//Иис.Нав.6:1 => Jos.6:2 ... Иис.Нав.6:26 => Jos.6:27
                    verseNumber += 1; 
                }
            break; 
            
        case 8: //1Samuel (1Царств) 
                if(chapter == 20){//1Цар.20:42-43 => 1Sam 20:42
                    if(verse == 43){
                        verseNumber = 42;
                    }
                }
                if(chapter == 23){//
                    //ok
                }
                if(chapter == 24){//1Цар.24:1 => 1S.23:29
                    if(verse == 1){
                        chapterNumber = 23;
                        verseNumber = 29;
                    }
                    if(verse > 1){
                        verseNumber -= 1;
                    }
                }
            break; 
        
        case 17: //Job 
                if(chapter == 39){//39:31-35 => 40:1-5 | 40:6-24 => 40: -5
                    if(verse >= 31){
                        chapterNumber = 40;
                        verseNumber -= 30;
                    }
                }
                if(chapter == 40){//40:1-19 => 40:6-24 
                    if(verse <= 19){
                        verseNumber += 5;
                    }
                    if(verse >= 20){
                        chapterNumber = 41;
                        verseNumber -= 19;
                    }
                }
                if(chapter == 41){//40:1-26 => 41:9-34
                    verseNumber += 8;
                }
            break; 

        case 18: //Psalmos 
                //Formula Rus => Esp //Пс.3:1 - 9:20 =>	Х : +1 *
                if(chapter >= 3 && chapter <= 8){
                    if(verse > 1){
                        verseNumber -= 1;
                    }
                }
                if(chapter == 9){//3:1 - 9:20 => Х : +1 *
                    if(verse >= 2 && verse <= 21){
                        verseNumber -= 1;
                    }
                    if(verse >= 22){
                        chapterNumber = 10;
                        verseNumber -= 21;
                    }
                }
                //Formula Rus => Esp  //Пс.X:1 => Ps.X+1:1 
                //+1 : Х
                if(
                    (chapter == 10) || 
                    (chapter >= 13 && chapter <= 16) || 
                    (chapter >= 22 && chapter <= 28) || 
                    (chapter >= 31 && chapter <= 32) || 
                    (chapter == 34) || 
                    (chapter == 36) || 
                    (chapter == 42) || 
                    (chapter == 49) || 
                    (chapter == 65) || 
                    (chapter >= 70 && chapter <= 73) || 
                    (chapter >= 77 && chapter <= 78) || 
                    (chapter == 81) || 
                    (chapter == 85) || 
                    (chapter == 86) || 
                    (chapter == 90) || 
                    (chapter >= 92 && chapter <= 100) || 
                    (chapter >= 102 && chapter <= 106) || 
                    (chapter >= 108 && chapter < 113) || 
                    (chapter >= 116 && chapter <= 138) || //revisar!
                    (chapter >= 140 && chapter <= 145) //revisar!
                ){
                    chapterNumber += 1;//Psalom 22:2 ruso => Salmo 23:2 español
                    
                }
                //Formula Rus => Esp //Пс.X+1:2 => Ps.X:1 //добавляю пустой стих сначала в исп перевод
                //+1 : -1
                if(
                        (chapter == 11) || //revisar!
                    (chapter == 12) || 
                    (chapter >= 17 && chapter <= 21) ||
                    (chapter >= 29 && chapter <= 30) || 
                    (chapter == 33) || 
                    (chapter == 35) || 
                    (chapter >= 37 && chapter <= 41) || 
                    (chapter >= 43 && chapter <= 48) || 
                    (chapter == 52) || 
                    (chapter >= 54 && chapter <= 58) || 
                    (chapter >= 60 && chapter <= 64) || 
                    (chapter >= 66 && chapter <= 69) || 
                    (chapter >= 74 && chapter <= 76) || 
                    (chapter >= 79 && chapter <= 80) || 
                    (chapter >= 82 && chapter <= 84) || 
                    (chapter >= 87 && chapter < 89) || 
                    (chapter == 91) || 
                    (chapter == 101) || 
                    (chapter == 107) ||
                    (chapter == 139) //revisar! 
                ){
                    chapterNumber += 1;
                    if(verse >= 2){
                        verseNumber -= 1;
                    }
                }
                //Formula Rus => Esp
                //+1 : -2 | Ej.:  50:0 => 51:1 | 50:1 => 51:2
                if(
                    (chapter >= 50 && chapter <= 51) ||
                    (chapter == 53) || 
                    (chapter == 59)
                ){
                    chapterNumber += 1;
                    if(verse <= 2){
                        verseNumber = 1;
                    }
                    if(verse >= 3){
                        verseNumber -= 2;
                    }
                }
                //Formula Rus => Esp
                //2en1
                if(chapter == 89){//89:6 => 90:5-6 
                    chapterNumber += 1;
                    if(verse >= 2){
                        verseNumber -= 1;
                    }
                }
                //Formula Rus => Esp
                //+2: -8
                if(chapter == 113){//113: +8 => 115:1-18 | Пс.113:9 => Sal.115:1
                    if(verse <= 8){
                        chapterNumber += 1;
                    }
                    if(verse >= 9){
                        chapterNumber += 2;
                        verseNumber -= 8;
                    }
                }
                //Formula Rus => Esp
                //-2: X
                if(chapter == 114){// Пс. 114:1-9 => Sal.116:1-9 
                    chapterNumber += 2;
                }
                if(chapter == 115){// Пс. 115:1-10 => Sal.116:10-19
                    chapterNumber += 1;
                    verseNumber += 9;
                }
                //Formula (especial)
                if(chapter == 146){// Пс.146:1-11 => Sal.147:1-11
                    chapterNumber += 1;
                }
                //Formula (especial)
                if(chapter == 147){// Пс.147:1-11 => Sal.147:12-20
                    verseNumber += 11;
                }
            break;                                 

        case 19: //Притчи
                if(chapter == 4){
                    if(verse >= 28){
                        verseNumber = 27;
                    } 
                }
            break;
        
        case 21: //Cantares - Песня песней
                if(chapter == 1){
                    verseNumber += 1;
                    if(verse == 17){
                        verseNumber = 17;
                    } 
                }
                if(chapter == 7){//07:1 => 06:13	
                    if(verse == 1){
                        chapterNumber = 6;
                        verseNumber = 13;
                    }
                    if(verse >= 2){
                        verseNumber -= 1;
                    } 
                }
            break;

        case 22: //Isaías - Исаия
                if(chapter == 3){
                    if(verse >=20){
                        verseNumber += 1;
                    }
                    if(verse == 26){
                        verseNumber = 26;
                    } 
                }
            break;

        case 26: //Daniel - Даниил
                if(chapter == 3){//3:1-30 => 3:1-30
                    //в Синодальном переводе есть вставочные стихи, которых нет в Исп Библии. Стихи с 24 по 90 включительно переведены с греческого, потому что в еврейском тексте их нет. - Прим. ред.
                    if(verse >= 30){
                        chapterNumber = 4;
                        verseNumber -= 30;
                    }
                }
                if(chapter == 4){
                    verseNumber += 3;                        
                }
            break;

        case 27: //Oseas - Осия
                if(chapter == 14){//14:1 => 13:16 
                    if(verse == 1){
                        chapterNumber = 13;
                        verseNumber = 16;
                    }
                    if(verse >= 2){
                        verseNumber -= 1;
                    }
                }
            break;

        case 31: //Jonas - Иона
                if(chapter == 1){
                    //ok
                }
                if(chapter == 2){// 2:1 => 1:17
                    if(verse == 1){
                        chapterNumber = 1;
                        verseNumber = 17;
                    }
                    if(verse >= 2){
                        verseNumber -= 1;
                    } 
                }
            break;

        case 44: //Romanos - Римлянам
                if(chapter == 14){// 14:24-26 => 16:25-27                                       
                    if(verse >= 24){
                        chapterNumber = 16;
                        verseNumber += 1;
                    }
                }
            break;

        case 46: //2Corintios - 2-Коринфянам
                if(chapter == 13){// 13:12-13 => 13:12 | 13:14 => 13:13                                          
                    if(verse == 13){
                        verseNumber = 14;
                    }    
                }
            break;

        default:
            //console.log('default en switch');
            break;
    }//fin switch

    var result = [bookNumber, chapterNumber, verseNumber];

    return result;

}


function checkRefNav(book, chapter = null, verse = null, to_verse = null){
    //console.log('=== function checkRefNav() ===');
    
    var inpt_nav = document.querySelector('#inpt_nav');
    
    var trans_base = document.querySelector('#trans1').dataset.trans;//la trans base de #trans1
    var trans_inpt = inpt_nav.dataset.trans;// trans desde input
    var divtrans_inpt = inpt_nav.dataset.divtrans;// trans desde input

    let bookNumber = (book != null) ? book : 0 ;
    let chapterNumber = chapter;
    let verseNumber = verse;
    let to_verseNumber = to_verse;

    // console.log('0. antes bookNumber: '+bookNumber);//empezando de 1
    // console.log('0. antes chapterNumber: '+chapterNumber);//empezando de 1
    // console.log('0. antes verseNumber: '+verseNumber);//empezando de 1
    // console.log('0. antes to_verseNumber: '+to_verseNumber);//mayor que verseNumber 


    if(divtrans_inpt != '' && divtrans_inpt != 'trans1'){
        
        //console.log('divtrans_inpt: '+divtrans_inpt);
    
        // preparo le ref
        // Usa el método find para buscar el objeto que contiene 'rst' como nombre
        const obj_trans_base = arrFavTransObj.find(p => p.Translation === trans_base);
        const obj_trans_inpt = arrFavTransObj.find(p => p.Translation === trans_inpt);
        var trans_BookShortName = obj_trans_inpt.Books[book].ShortNames[0];
        
        //Convertir el link de Español a Ruso. (Sal.23:1 => Псалом 22:1)
        if(obj_trans_base.EnglishPsalms == 'N' && obj_trans_inpt.EnglishPsalms == 'Y'){
            //convierto la ref de input en la ref de trans_base. Porque se forma a partir del trans1

            //console.log('--- entro aki 1. trans1 = Rus --- trans2 = Esp. --- convertir Link Rus => Esp');

            //Modifico sólo los links de ruso a español
            //trans1 = RST (base. metido antes. Пс 22:2. lo tengo que convertir en Sal.23:2)
            //trans2 = rv60 clicked
            var new_result = convertLinkFromRusToEsp(bookNumber, chapterNumber, verseNumber, to_verseNumber);//importante RusToEsp
            
            //asigno nuevo valor
            bookNumber = new_result[0];
            chapterNumber = new_result[1];
            verseNumber = new_result[2];
            to_verseNumber = new_result[3];

            // console.log('1. ahora bookNumber: '+bookNumber);//empezando de 1
            // console.log('1. ahora chapterNumber: '+chapterNumber);//empezando de 1
            // console.log('1. ahora verseNumber: '+verseNumber);//empezando de 1
            // console.log('1. ahora to_verseNumber: '+to_verseNumber);//mayor que verseNumber 
            // console.log('1. ahora trans_BookShortName: '+trans_BookShortName);
        }

        //Convertir el link de Ruso a Español. (Псалом 22:1 => Sal.23:1)
        if(obj_trans_base.EnglishPsalms == 'Y' && obj_trans_inpt.EnglishPsalms == 'N'){
            //convierto la ref de input en la ref de trans_base. Porque se forma a partir del trans1
            //console.log('entro aki 2. trans1 = Esp --- trans2 = Rus. convertir Link Esp => Esp');

            //Modifico sólo los links si en input se pone link ruso para mostrar link espñol
            var new_result = convertLinkFromEspToRus(bookNumber, chapterNumber, verseNumber, to_verseNumber);//importante EspToRus
            
            //asigno nuevo valor
            bookNumber = new_result[0];
            chapterNumber = new_result[1];
            verseNumber = new_result[2];
            to_verseNumber = new_result[3];

            // console.log('2. ahora bookNumber: '+bookNumber);//empezando de 1
            // console.log('2. ahora chapterNumber: '+chapterNumber);//empezando de 1
            // console.log('2. ahora verseNumber: '+verseNumber);//empezando de 1
            // console.log('2. ahora to_verseNumber: '+to_verseNumber);//mayor que verseNumber
            // console.log('2. ahora trans_BookShortName: '+trans_BookShortName);
        }

    }else{
        return false;
    }

    var result = [bookNumber, chapterNumber, verseNumber, to_verseNumber, trans_BookShortName];

    return result;
}























setTimeout(()=>{    
    pintRefOnScroll();
},100);

function pintRefOnScroll(){

    const divContenedor = document.querySelector('#col1 .colsInner');
    //let divContenedor_rect = divContenedor.getBoundingClientRect();//para test
    //console.log(" ANTES de listener --- divContenedor_rect.top: " +divContenedor_rect.top);
    
    divContenedor.addEventListener('scroll', function(){        

        let divContenedor_rect = document.querySelector('#col1 .colsInner').getBoundingClientRect();
        let divContenedor_colsHead_rect = document.querySelector('#col1 .colsHead').getBoundingClientRect();
        const elementos = divContenedor.children;
        let primerElementoVisible = null;
        const mob_sh_link = document.querySelector('#col1 .mob_sh_link');
        let colsAll_length = document.querySelectorAll('.cols').length;

        //Recorrer elementos de '.colsInner'
        Array.from(elementos).forEach(elemento => {            
            
            const el_rect = elemento.getBoundingClientRect();

            //console.log(" ");
            //console.log("divContenedor_rect.top: "+divContenedor_rect.top);
            //console.log("abajo elemento: ");
            //console.log(elemento);
            //console.log("abajo elemento.id: " +elemento.id);
            //console.log("abajo el_rect: ");
            //console.log(el_rect);
            //console.log("el_rect.top: " + el_rect.top);
            //console.log("el_rect.bottom: " + el_rect.bottom);
            //console.log("divContenedor.clientHeight: " + divContenedor.clientHeight);
            //console.log("window.innerHeight: " + window.innerHeight);
            //console.log("--- cond 1: el_rect.top >= 0: " + (el_rect.top >= 0) );
            //console.log("--- cond 2: el_rect.top <= divContenedor_rect.top: " + (el_rect.top <= (divContenedor_rect.top)) );
            //console.log("--- cond 1: el_rect.bottom <= (divContenedor.clientHeight || window.innerHeight): " + (el_rect.bottom <= (divContenedor.clientHeight || window.innerHeight)) );

            if(window.innerWidth < 768){//mobile
                //en mobile
                if(
                    el_rect.top >= 0 && 
                    el_rect.top <= divContenedor_rect.top &&
                    el_rect.bottom <= (divContenedor.clientHeight || window.innerHeight) &&
                    !primerElementoVisible
                ){
                    primerElementoVisible = elemento;
                    //console.log('--- MOBILE --- Si --- primerElementoVisible');
                    //console.log(
                    //`--- si --- element parcialmente está visto. 
                    //    --- elemento.tagName: ${elemento.tagName} 
                    //    --- elemento.id: ${elemento.id}
                    //    --- el_rect.top: ${el_rect.top}
                    //    --- el_rect.bottom: ${el_rect.bottom}
                    //`);
                }else{
                    elemento.classList.remove('elementoVisible');
                    //console.log('--- MOBILE --- NO --- primerElementoVisible');
                }
            }else{//desktop
                //en desktop
                if(
                    el_rect.top >= 0 &&
                    el_rect.top <= divContenedor_rect.top + 1 &&
                    el_rect.bottom >= divContenedor_rect.top + 1 &&
                    !primerElementoVisible               
                ){
                    primerElementoVisible = elemento;
                    //console.log('--- DESKTOP --- Si --- primerElementoVisible');
                    //console.log(
                    //    `--- si --- element parcialmente está visto. 
                    //    --- elemento.tagName: ${elemento.tagName} 
                    //    --- elemento.id: ${elemento.id}
                    //    --- el_rect.top: ${el_rect.top}
                    //    --- el_rect.bottom: ${el_rect.bottom}
                    //`);
                }else{
                    elemento.classList.remove('elementoVisible');
                    //console.log('--- DESKTOP --- NO --- primerElementoVisible');
                }
            }
        });
        //console.log('primerElementoVisible: ');
        //console.log(primerElementoVisible);

        if(primerElementoVisible){
            primerElementoVisible.classList.add('elementoVisible');
            //console.log(primerElementoVisible.getBoundingClientRect().top);
            //console.log(primerElementoVisible.getBoundingClientRect().bottom);    

            //console.log('añado class elementoVisible');
            //primerElementoVisible.style.background = 'pink';//test

            if(primerElementoVisible.tagName === 'P'){
                //console.log("primerElementoVisible.tagName: " + primerElementoVisible.tagName);
                //console.log(primerElementoVisible.querySelector('a').innerHTML);
                if(colsAll_length > 0){
                    putRefvisibleToHead(primerElementoVisible.id,0);//añado ref de todos cols en el header de trans
                }
            }else if(primerElementoVisible.tagName === 'H4' || primerElementoVisible.tagName === 'H2'){
                //console.log("else if --- primerElementoVisible.tagName: " + primerElementoVisible.tagName);
                let p_first = document.querySelector('#col1 .colsInner p');
                if(colsAll_length > 0){
                    putRefvisibleToHead(p_first.id,0);
                }    
            }  
        }
    });
}


//Si startingFromIndexCol es 0 se actualizan todos los heads, si es 1 -> todos menos cols[0] que es #col1
function putRefvisibleToHead(id_ref, startingFromIndexCol = 0){//id_ref: rv60__0__1__1 // trans__book__chapter__verse
    //console.log('=== function putRefvisibleToHead(ref) ===');
    //console.log('id_ref: ' +id_ref);
    //console.log('startingFromIndexCol: ' +startingFromIndexCol);
    let arr_ref = id_ref.split('__');
    let bookNumber = arr_ref[1];
    let chapterNumber = arr_ref[2];
    let verseNumber = arr_ref[3];

    let trans_base = document.querySelector('#trans1').dataset.trans;
    
    let colsAll = document.querySelectorAll('.cols');

    colsAll.forEach((el,i)=>{
        //console.log(el);

        //si no es #col1
        if(i >= startingFromIndexCol){

            let trans_head = el.querySelector('.colsHead').dataset.trans;

            // preparo le ref
            // Usa el método find para buscar el objeto que contiene 'rst' como nombre
            const obj_trans_base = arrFavTransObj.find(p => p.Translation === trans_base);
            const obj_trans_head = arrFavTransObj.find(p => p.Translation === trans_head);

            //si está seleccionado traducción
            if(typeof trans_head != 'undefined'){

                var trans_BookShortName = obj_trans_head.Books[bookNumber].ShortNames[0];
            
                //Convertir el link de Español a Ruso. (Sal.23:1 => Псалом 22:1)
                if(obj_trans_base.EnglishPsalms == 'N' && obj_trans_head.EnglishPsalms == 'Y'){
                    //convierto la ref de input en la ref de trans_base. Porque se forma a partir del trans1
                    //console.log('--- ref head 1. trans1 = Rus --- trans2 = Esp. --- convertir Link Rus => Esp');

                    //Modifico sólo los links de ruso a español
                    //trans1 = RST (base. metido antes. Пс 22:2. lo tengo que convertir en Sal.23:2)
                    //trans2 = rv60 clicked
                    var new_result = convertLinkFromRusToEsp(bookNumber, chapterNumber, verseNumber);//importante RusToEsp
                    
                    //asigno nuevo valor
                    bookNumber = new_result[0];
                    chapterNumber = new_result[1];
                    verseNumber = new_result[2];

                    //console.log('1. ahora bookNumber: '+bookNumber);//empezando de 1
                    //console.log('1. ahora chapterNumber: '+chapterNumber);//empezando de 1
                    //console.log('1. ahora verseNumber: '+verseNumber);//empezando de 1
                    //console.log('1. ahora trans_BookShortName: '+trans_BookShortName);
                }

                //Convertir el link de Ruso a Español. (Псалом 22:1 => Sal.23:1)
                if(obj_trans_base.EnglishPsalms == 'Y' && obj_trans_head.EnglishPsalms == 'N'){
                    //convierto la ref de input en la ref de trans_base. Porque se forma a partir del trans1
                    //console.log('head 2. trans1 = Esp --- trans2 = Rus. convertir Link Esp => Esp');

                    //Modifico sólo los links si en input se pone link ruso para mostrar link espñol
                    var new_result = convertLinkFromEspToRus(bookNumber, chapterNumber, verseNumber);//importante EspToRus
                    
                    //asigno nuevo valor
                    bookNumber = new_result[0];
                    chapterNumber = new_result[1];
                    verseNumber = new_result[2];

                    // console.log('2. ahora bookNumber: '+bookNumber);//empezando de 1
                    // console.log('2. ahora chapterNumber: '+chapterNumber);//empezando de 1
                    // console.log('2. ahora verseNumber: '+verseNumber);//empezando de 1
                    // console.log('2. ahora trans_BookShortName: '+trans_BookShortName);
                }

                //console.log(id_ref + ' => ' + trans_BookShortName + ''+chapterNumber +':'+verseNumber);
                var new_ref = trans_BookShortName + ' '+chapterNumber +':'+verseNumber;

                el.querySelector('.partMob .mob_sh_link').innerHTML = new_ref;
                el.querySelector('.partDesk .desk_sh_link').innerHTML = new_ref;
            
            }//end 

        }
    });
}


function pageUp() {    
    var colsAll = document.querySelectorAll('.colsInner');
    colsAll.forEach(el=>{
        var el_rect = el.getBoundingClientRect();
        let clientHeight = el.clientHeight;

        //console.log('el.parentElement.id :'+el.parentElement.id);
        //console.log('el.scrollTop: '+el.scrollTop);
        //console.log('clientHeight: '+clientHeight);
      
        // Calcula la cantidad de desplazamiento necesario para una página
        let pageHeight = clientHeight;
      
        // Calcula la nueva posición de desplazamiento
        let newScrollTop = el.scrollTop - pageHeight;
        //console.log('newScrollTop: '+newScrollTop);

        var newScrollTop_toVerse = false;
        var arr_elps = [];

        el.querySelectorAll('p').forEach(elp=>{
            let elp_rect = elp.getBoundingClientRect();
            //console.log('elp.id: '+elp.id + ' --- elp_rect.top: '+elp_rect.top +' --- elp_rect.bottom: '+elp_rect.bottom);

            //busco primer elemento que se ve entero en la pantalla para moverme alli
            if(elp_rect.top > -clientHeight){
                //console.log(' -------------- el elemento elp.id: '+elp.id + 
                //' --- elp_rect.top: '+elp_rect.top + 
                //' --- elp_rect.bottom: '+elp_rect.bottom  
                //);
                arr_elps.push(elp);
            }
        });
        //console.log('arr_elps: ');
        //console.log(arr_elps);
        //console.log('arp_elps[0].top: '+arr_elps[0].getBoundingClientRect().top);
        //console.log('arp_elps[0].bottom: '+arr_elps[0].getBoundingClientRect().bottom);

        if(arr_elps.length > 1){
            var first_p_rect = arr_elps[0].getBoundingClientRect();
            newScrollTop_toVerse = newScrollTop + (clientHeight - el_rect.top + first_p_rect.top);
            //console.log('newScrollTop_toVerse: ' + newScrollTop + ' + ('+ clientHeight + ' - '+ el_rect.top + ' + ' +  first_p_rect +') = '+newScrollTop_toVerse);
        }

        // Asegúrate de que no te desplaces más allá del final del contenido
        if(newScrollTop < 0) {
            el.scrollTop = 0;//mover al top
            console.log(`1. me muevo al top --- el.scrollTop: ${el.scrollTop} `);
            if(newScrollTop < 0 && newScrollTop == -el.clientHeight){//if( newScrollTop: -926 y newScrollTop: -926 = -clientHeight: -926)
                console.log(`1.b --- me muevo al cpítulo anterior. y al ultimo versículo.`);
                console.log(`top --- el.scrollTop: ${el.scrollTop}. --- if(newScrollTop < 0 && newScrollTop == -el.clientHeight) --- . (${newScrollTop} < 0 && ${newScrollTop} == ${-el.clientHeight})`);
                chapterGo('prev');//OK    
            }
        }
        else if(newScrollTop >= 0) {
            //el.scrollTop = newScrollTop;//antes
            if(newScrollTop_toVerse){
                el.scrollTop = newScrollTop_toVerse;
                console.log('2.--- ago newScrollTop_toVerse: ' + newScrollTop_toVerse);
            }else{
                el.scrollTop = newScrollTop;
                console.log('3.--- ago newScrollTop: ' + newScrollTop);
            }
        }
        else{
            // Si ya estás en la parte superior del contenido, no hagas nada
            console.log('4.--- Estoy en la parte superior del contenido.');
        }
    });
}


function pageDown() {
    var colsAll = document.querySelectorAll('.colsInner');   
    colsAll.forEach(el=>{
        var el_rect = el.getBoundingClientRect();
        let scrollHeight = el.scrollHeight;
        let clientHeight = el.clientHeight;
        //console.log('el.parentElement.id :'+el.parentElement.id);
        //console.log('scrollHeight: '+scrollHeight);
        //console.log('el.scrollTop: '+el.scrollTop);
        //console.log('clientHeight: '+clientHeight);
     
        // Calcula la cantidad de desplazamiento necesario para una página
        let pageHeight = clientHeight;
      
        // Calcula la nueva posición de desplazamiento
        let newScrollTop = el.scrollTop + pageHeight;
        //console.log('newScrollTop: '+newScrollTop);

        var newScrollTop_toVerse = false;

        el.querySelectorAll('p').forEach(elp=>{
            let elp_rect =elp.getBoundingClientRect();
            //console.log('elp.id: '+elp.id + ' --- elp_rect.top: '+elp_rect.top + ' --- elp_rect.bottom: '+elp_rect.bottom);

            //busco qué elp cual top es menos que newScrollTop (920) y su bottom es mas que newScrollTop (920)
            //primer click on pageDown
            if(clientHeight == newScrollTop){
                if(elp_rect.top <= newScrollTop + el_rect.top && elp_rect.bottom > newScrollTop + el_rect.top){
                    newScrollTop_toVerse = elp_rect.top - el_rect.top;
                    //console.log('---if------ newScrollTop_toVerse: '+elp_rect.top + ' - '+ el_rect.top +' = '+newScrollTop_toVerse);
                    //console.log('------ elp.id: '+elp.id)
                }
            }else{//segundo y posteriores clicks on pageDown
                var el_rect_bottom = el.getBoundingClientRect().bottom;
                if(elp_rect.top <= el_rect_bottom && elp_rect.bottom > el_rect_bottom){
                    newScrollTop_toVerse = newScrollTop - (el_rect_bottom - elp_rect.top) ;
                    //console.log('---else------ newScrollTop_toVerse: '+newScrollTop + ' - ('+ el_rect_bottom + ' - '+ elp_rect.top +') = '+newScrollTop_toVerse);
                    //console.log('------ elp.id: '+elp.id)
                }
            }
        });
      
        // Asegúrate de que no te desplaces más allá del final del contenido
        if(newScrollTop > scrollHeight) {
            el.scrollTop = scrollHeight;//mover al bottom
            console.log('1. --- me muevo al bottom --- el.scrollTop: ' + el.scrollTop);
        }
        else if(newScrollTop < scrollHeight) {
            // el.scrollTop = newScrollTop;//antes
            if(newScrollTop_toVerse){
                el.scrollTop = newScrollTop_toVerse;
                console.log('2. --- ago newScrollTop_toVerse: ' + newScrollTop_toVerse);
            }else{
                el.scrollTop = newScrollTop;
                console.log('3. --- ago newScrollTop: ' + newScrollTop);
            }
        }
        else{
            // Si ya estás en la parte superior del contenido, no hagas nada
            console.log('4. --- Estoy en la parte de abajo del contenido. voy al siguiente capítulo.');
            chapterGo('next');//OK 
        }
    });
}


/*
function bbb(n){

    document.querySelectorAll('.colsInner').forEach(el=>{
        console.log('voy al :nth-child: '+n);

            el.querySelector(`:nth-child(${n})`)
            //.scrollIntoView();
            .scrollIntoView({behavior: "smooth",block: "start",inline: "nearest"});
            console.log('end -- voy al :nth-child: '+n);
    });
 return n;
}
*/



async function obtenerDatosDeAPI() {
    try {
      // Realiza una solicitud GET a una API
      const respuesta = await fetch('http://localhost/bibleqt/modules/text/rv60/01_genesis.htm');
      
      // Verifica si la solicitud fue exitosa
      if (!respuesta.ok) {
        throw new Error('Error al obtener datos de la API');
      }
      
      // Convierte la respuesta a formato JSON
      const datos = await respuesta.text();
  
      // Haz algo con los datos, por ejemplo, imprímelos en la consola
      console.log(datos);
  
      // Puedes realizar más acciones aquí con los datos obtenidos
  
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // Llama a la función para obtener los datos
  //obtenerDatosDeAPI();

doPageDownOnScroll();

function doPageDownOnScroll(){
    let colsInner = document.querySelector('.colsInner');
    colsInner.addEventListener('scroll', function(el){
        const scrollTop = colsInner.scrollTop;
        const colsInner_h = colsInner.offsetHeight;
        const scrollHeight = colsInner.scrollHeight;      
        //PageDown
        if(scrollTop > colsInner_h && scrollTop + colsInner_h >= (scrollHeight - 5) ) {
            // Si llegamos al final de la sección actual, pasa a la siguiente
            //console.log(`paso a la sig page. (scrollTop + colsInner_h >= scrollHeight): (${scrollTop} + ${colsInner_h} >= ${scrollHeight}) `);
            alert('test mobile. estoy abajo. hago chapterGo().');
            chapterGo('next');
        }
        console.log('el.target.scrollTop: '+el.target.scrollTop);        
    });
} 
 