function openModal(param = null, headerTitle = null, htmlTrans = null, action = null, modalFadeIn = true){
    console.log('===function openModal()===');
    console.log(`param: ${param} --- headerTitle: ${headerTitle}`); 
    
    //Reset
    eid_myModalContent.removeAttribute('class');
    eid_myModalContent.classList.add('modal-content');
    eid_modcont_body.removeAttribute('class');//reset
    

    if(modalFadeIn){
        eid_myModal.style.display = "block";
        eid_myModal.style.opacity = 0;//start efecto fade
        setTimeout(()=>{
            eid_myModal.style.opacity = 1;//end efecto fade
        },10);
    }else{
        eid_myModal.style.display = "block";
        eid_myModal.style.opacity = 1;//start efecto fade
    }
 
    Array.from(document.querySelectorAll('.body_bls')).forEach((el,i)=>{
        el.style.display = 'none';
        //el.removeAttribute('class');
        //el.classList.add('modal-content');//default
    });


    //Tipos de ModalContent
    switch (param) {

        //Меню
        case 'top':
            eid_modcont_body.style.overflow = 'auto';//habilita scroll  
            eid_modcont_body.classList.add('theme_grey');   
            eid_h4_text.innerHTML = headerTitle;//'Меню';
            eid_btn_sp_atras.style.display = 'none'; //mo muestro flecha atras
            eid_myModal.style.paddingTop = '0px';
            eid_myModalContent.classList.add('modalContentTop');
            eid_bl_modalTop.style.display = 'block';
            break;

        //pendiente de desarrollo
        case 'center':
            eid_h4_text.innerHTML = headerTitle;//'verse Меню';
            eid_btn_sp_atras.style.display = 'none';//?
            eid_myModal.style.paddingTop = '25vh';
            eid_myModalContent.classList.add('modalContentCenter');
            eid_bl_modalCenter.style.display = 'block';
            switch (action) {
            
                case 'buildVerseMenu':
                    eid_modcont_body.style.overflow = 'auto';//habilita scroll
                    eid_modcont_body.classList.add('theme_grey');   
                    console.log('aki llamar buildVerseMenu()');
                    buildVerseMenu(htmlTrans, param);//es arr_p_id en este caso
                    break;

                case 'showAviso':
                    eid_modcont_body.style.overflow = 'auto';//habilita scroll
                    eid_modcont_body.classList.add('theme_grey');   
                    console.log('aki llamar showAviso()');
                    //alert('aki showAviso()');
                    showAviso(htmlTrans, param);//es arr_p_id en este caso
                    break;
            
            
                default:
                    console.log('indica action en openModal()');
                    break;
            }
            break;

        //pendiente de desarrollo
        case 'bottom':
            eid_h4_text.innerHTML = headerTitle;//'verse Меню';
            eid_btn_sp_atras.style.display = 'none';//?
            eid_myModal.style.paddingTop = '50vh';
            eid_myModalContent.classList.add('modalContentBottom');
            eid_bl_modalBottom.style.display = 'block';
            switch (action) {
            
                case 'buildVerseMenu':
                    eid_modcont_body.style.overflow = 'auto';//habilita scroll
                    eid_modcont_body.classList.add('theme_grey');   
                    console.log('aki llamar buildVerseMenu()');
                    buildVerseMenu(htmlTrans, param);//es arr_p_id en este caso
                    break;
            
            
                default:
                    console.log('indica action en openModal()');
                    break;
            }
            break;

        //Выбор модуля Библии из Избранных
        case 'full':
            eid_h4_text.innerHTML = headerTitle;//'Избранныe модули Библии';
            eid_btn_sp_atras.style.display = 'block';
            eid_myModal.style.paddingTop = '0vh';
            eid_myModalContent.classList.add('modalContentFull');
            eid_bl_modalFull.style.display = 'block';
            
            switch (action) {
                
                case 'showModules':
                    eid_modcont_body.style.overflow = 'auto';//habilita scroll 
                    eid_modcont_body.classList.add('theme_grey');   
                    selectModule2(htmlTrans);
                    break;
            
                case 'showHistoryNav':
                    eid_modcont_body.style.overflow = 'auto';//habilita scroll
                    eid_modcont_body.classList.add('theme_grey');   
                    console.log('aki llamar showHistoryNav()');
                    showHistoryNav();
                    break;
            
                case 'showHistoryFind':
                    eid_modcont_body.style.overflow = 'auto';//habilita scroll
                    eid_modcont_body.classList.add('theme_grey');   
                    console.log('aki llamar showHistoryFind()');
                    showHistoryFind();
                    break;
            
                case 'showHistoryStrong':
                    eid_modcont_body.style.overflow = 'auto';//habilita scroll 
                    eid_modcont_body.classList.add('theme_grey');   
                    console.log('aki llamar showHistoryStrong()');
                    showHistoryStrong();
                    break;

                case 'compareVerse':
                    eid_modcont_body.style.overflow = 'hidden';//desabilita scroll de head 
                    eid_modcont_body.classList.add('theme_white');  
                    eid_btn_sp_atras.style.display = 'none';
                    console.log('aki llamar buildVersesToCompare()');
                    buildVersesToCompare(htmlTrans);//aki htmlTrans = arr_p_id = ['rstStrongRed',0,1,1]
                    break;
            
                default:
                    console.log('indica action en openModal()');
                    break;
            }
            break;

        //Vkladki
        case 'tabsList':
            eid_modcont_body.style.overflow = 'auto';//habilita scroll 
            eid_modcont_body.classList.add('theme_grey');   
            eid_h4_text.innerHTML = headerTitle;//'Вкладки';
            eid_btn_sp_atras.style.display = 'block';
            eid_myModal.style.paddingTop = '0vh';
            eid_myModalContent.classList.add('modalContentFull');
            eid_bl_modalFull.style.display = 'block';
            selectTab();
            break;

        default:
            console.log('---case default: nada---');
            break;
    }
}


function showAviso(htmlTrans, positionModal){
    console.log('=== showAviso(htmlTrans, param) ===');

    if(positionModal == 'center'){
        eid_bl_modalCenterInner.innerHTML = '';
    }else if(positionModal == 'bottom'){
        eid_bl_modalBottomInner.innerHTML = '';
    }


    const p = document.createElement('p');
    p.className = 'p_aviso';
    p.innerHTML = htmlTrans;



    if(positionModal == 'center'){
        eid_bl_modalCenterInner.append(p);
    
    }else if(positionModal == 'bottom'){
        eid_bl_modalBottomInner.append(p);
    }

}


function buildVerseMenu(arr_p_id,positionModal){
    console.log('=== function buildVerseMenu(arr_p_id) ===');

    
    if(positionModal == 'center'){
        eid_bl_modalCenterInner.innerHTML = '';
    }else if(positionModal == 'bottom'){
        eid_bl_modalBottomInner.innerHTML = '';
    }
  
    const btn1 = document.createElement('div');
    btn1.id = 'btn_copiar';
    btn1.className = 'dbtn';
    btn1.title = 'Copiar el texto del versículo.';
    btn1.innerHTML = '<img src="./images/copy_icon_white.svg">';
    btn1.onclick = ()=>{
        console.log('llamo func para copiar');
        console.log(arr_p_id);
    }

    const btn2 = document.createElement('div');
    btn2.id = 'btn_marker';
    btn2.className = 'dbtn';
    btn2.title = 'Marker el texto del versículo.';
    btn2.innerHTML = '<img src="./images/marker_icon_white.svg">';
    btn2.onclick = ()=>{
        console.log('llamo func para añadir marker-закладку');
        console.log(arr_p_id);
    }

    const btn3 = document.createElement('div');
    btn3.id = 'btn_comparar';
    btn3.className = 'dbtn';
    btn3.title = 'Comparar el versiculo en diferentes traducciones.';
    btn3.innerHTML = '<img src="./images/compare_icon_white.svg">';
    btn3.onclick = ()=>{
        console.log('llamo func para comparar');
        console.log(arr_p_id);
        eid_bl_modalFullInner.innerHTML = '<div id="wr_vc">cargando...</div>';//reset
        openModal('full', 'Сравнение переводов', arr_p_id, 'compareVerse');
    }
    
    const btn4 = document.createElement('div');
    btn4.id = 'btn_compartir';
    btn4.className = 'dbtn';
    btn4.title = 'Compartir el versiculo en redes sociales.';
    btn4.innerHTML = '<img src="./images/share_icon_white.svg">';
    btn4.onclick = ()=>{
        console.log('llamo func para compartir');
        console.log(arr_p_id);
    }

    if(positionModal == 'center'){
        eid_bl_modalCenterInner.append(btn1);
        eid_bl_modalCenterInner.append(btn2);
        eid_bl_modalCenterInner.append(btn3);
        eid_bl_modalCenterInner.append(btn4);
    
    }else if(positionModal == 'bottom'){
        eid_bl_modalBottomInner.append(btn1);
        eid_bl_modalBottomInner.append(btn2);
        eid_bl_modalBottomInner.append(btn3);
        eid_bl_modalBottomInner.append(btn4);    
    }

    //eid_bl_modalBottomInner.append(btn1);
    //eid_bl_modalBottomInner.append(btn2);
    //eid_bl_modalBottomInner.append(btn3);
    //eid_bl_modalBottomInner.append(btn4);
    
}

function buildVersesToCompare(arr_p_id){//arr_p_id = ['rstStrongRed',0,1,1]
    console.log('===function buildVersesToCompare(arr_p_id)===');

    //creo array de p's de un verse de todas las trans favoritas
    arr_verses_compare = [];//reset
    let iter_a = 0;//start


    let btnStrongIsActive = false;
    if(eid_btnStrong.classList.contains('btn_active')){
        btnStrongIsActive = true;
    }

    makeArrVersesToCompare(iter_a, arr_p_id);

    function makeArrVersesToCompare(iter_a, arr_p_id){//arr_p_id = ['rstStrongRed', 0, 2, 5]
        
        let base_ep = eid_trans1.dataset.base_ep;

        let trans_ref = arr_p_id[0];//'rstStrongRed'
        let book = arr_p_id[1];
        let chapter = arr_p_id[2];
        let verse = arr_p_id[3];

        let bookNumber = book;
        let chapterNumber = chapter;
        let verseNumber = verse;

        if(iter_a < arrFavTransObj.length){
            console.log(`iter_a: ${iter_a}`);

            el_trans = arrFavTransObj[iter_a];
            console.log(`abajo el_trans:`);
            console.log(el_trans);

            //si existe traduccion, el libro de trans y book del libro
            if(typeof el_trans.Translation != 'undefined' && typeof el_trans.Books[bookNumber] != 'undefined'){
                //url del libro necesario
                url = `modules/text/${el_trans.Translation}/${el_trans.Books[bookNumber].PathName}`;//ej.: nrt_01.htm'; 

                if(url.includes('no_disponible.htm')){
                    console.log('url includes no_disponible.htm');
    
                    iter_a++;
                    console.log(`aumentado iter_a: ${iter_a}`);
                    arr_verses_compare.push('');//item vacio. luego lo quito

                    if(iter_a == arrFavTransObj.length){
                        console.log('1. final  --- llamo buildVersesFromArr()');
                        arr_verses_compare = arr_verses_compare.filter(elem => elem);//quito items vacios
    
                        buildVersesFromArr(arr_p_id, arr_verses_compare);
                    }   
    
                    makeArrVersesToCompare(iter_a, arr_p_id);//si iter_a es ultimo elemento de arrFavTransObj, no entrará aquí 
                    return false;
                }

            }else{
                console.log(`bookNumber '${bookNumber}' no existe en este trans '${el_trans.Translation}'.`);

                iter_a++;
                console.log(`aumentado iter_a: ${iter_a}`);
                arr_verses_compare.push('');//item vacio. luego lo quito

                if(iter_a == arrFavTransObj.length){
                    console.log('2. final  --- llamo buildVersesFromArr()');
                    arr_verses_compare = arr_verses_compare.filter(elem => elem);//quito items vacios

                    buildVersesFromArr(arr_p_id, arr_verses_compare);
                }

                makeArrVersesToCompare(iter_a, arr_p_id);//si iter_a es ultimo elemento de arrFavTransObj, no entrará aquí
                return false;
            }

            arr_verses_compare.push({});
            arr_verses_compare[iter_a]['Translation'] = el_trans.Translation;
            arr_verses_compare[iter_a]['Lang'] = el_trans.Lang;
            arr_verses_compare[iter_a]['BibleName'] = el_trans.BibleName;
            arr_verses_compare[iter_a]['BibleShortName'] = el_trans.BibleShortName;
            arr_verses_compare[iter_a]['BibleBookShortName'] = el_trans.Books[book].ShortNames[0];
            arr_verses_compare[iter_a]['EnglishPsalms'] = el_trans.EnglishPsalms;
            arr_verses_compare[iter_a]['BookQty'] = el_trans.BookQty;

            let trans_obj_ref = arrFavTransObj.find(v => v.Translation === trans_ref);

            if(trans_obj_ref.EnglishPsalms == 'N' && el_trans.EnglishPsalms == 'Y'){//Пс 22 | Sal 23
                let res = convertLinkFromRusToEsp(book, chapter, verse);
                bookNumber = res[0];
                chapterNumber = res[1];
                verseNumber = res[2];
                console.log(`modifico chapter y verse de rus a esp`);        
            }
            else if(trans_obj_ref.EnglishPsalms == 'Y' && el_trans.EnglishPsalms == 'N'){//Sal 23 | Пс 22
                let res = convertLinkFromEspToRus(book, chapter, verse);
                bookNumber = res[0];
                chapterNumber = res[1];
                verseNumber = res[2];
                console.log(`modifico chapter y verse de esp a rus`);
            }
            else{
                console.log('--- 335 chapter y verse no se modifican. se pasan tal cual.');
            }

            arr_verses_compare[iter_a].book = bookNumber;
            arr_verses_compare[iter_a].chapter = chapterNumber;
            arr_verses_compare[iter_a].verse = verseNumber;

            book = bookNumber;
            chapter = chapterNumber;
            verse = verseNumber;

            if(modo_fetch_verses_compare == 'by_text'){
                console.log(`modo_fetch_verses_compare == 'by_text'`);

                //saco ajustes de este modulo en json               
                let bq = el_trans;
                //console.log(' abajo bq:');
                //console.log(bq);

                let Translation = el_trans.Translation;//solo aqui

                //si no existe objeto lo creo
                if(typeof obj_bible_files[Translation] == 'undefined'){
                    obj_bible_files[Translation] = {};
                    obj_bible_files[Translation].Books = [];
                }


                //si existe objeto con Translation. Saco datos del objeto
                if(typeof obj_bible_files[Translation] != 'undefined'){
                    if(typeof obj_bible_files[Translation].Books != 'undefined'){
                        if(typeof obj_bible_files[Translation].Books[book] != 'undefined'){

                            if( obj_bible_files[Translation].Books[book].fileName == bq.Books[book].PathName && 
                                obj_bible_files[Translation].Books[book].fileContent != '' && 
                                obj_bible_files[Translation].Books[book].fileContent != ' '
                            ){
                                console.log(`--- --- starting from myPromise --- iter_a: ${iter_a}  --- Translation: ${Translation} `);
                                
                                // Registra el tiempo de inicio
                                const tiempoInicio = new Date().getTime();
                                //console.log('obj_bible_files --- tiempoInicio: '+tiempoInicio);

                                let myPromise_vc = new Promise(function(resolve, reject){
                                    resolve('ok');
                                });

                                myPromise_vc
                                .then((data) => {//data = ok
                                    
                                    //console.log(data);

                                    let bookModule;
                                    if(data == 'ok'){//siempre ok
                                        bookModule = obj_bible_files[Translation].Books[book].fileContent;
                                    }            
                                                
                                    let nb = bookModule.split('<h4>');//делю файл на главы
                                    //console.log(nb);
                                    
                                    nb = nb.filter(elem => elem);//удаляю пустые елементы массива
                                    //console.log(nb);
            
                                    //si existe el capitulo// siempre existe
                                    if(typeof nb[chapter] !== 'undefined'){
            
                                        let nb_chapter_verses = nb[chapter].split('<p>');
                                        //console.log(nb_chapter_verses);  
                                        
                                        let este_p = nb_chapter_verses[verse];
                                        let VerseText = '(текст стиха отсутствует...)';//si es vacio...
                                        
                                        if(typeof este_p != 'undefined'){
                                            let p_Text = ' ';

                                            if(este_p.includes('</p>')){
                                                let arr_p_text = este_p.split('</p>');
                                                p_Text = arr_p_text[0];
                                            }else{
                                                p_Text = este_p;
                                            }
                                            //console.log('p_Text: '+p_Text); 
                        
                                            let arr_p = p_Text.split(' ');
                                            let VerseId = arr_p[0];
                                            console.log('VerseId: '+VerseId);
                        
                                            arr_p.shift(0);//elimino index 0
                                            VerseText = arr_p.join(' '); 
                                        }                                       

                                        arr_verses_compare[iter_a].ChapterQty = bq.Books[book].ChapterQty;
                                        arr_verses_compare[iter_a].VerseQty = nb_chapter_verses.length - 1;
                                                           
                    
                                        //========================================================//
                                        //start - modificado
                                        //========================================================//
                    
                                        //Номера Стронга в стихах (RST+)
                                        if(bq.StrongNumbers == "Y"){
                                            let t = VerseText;
                                            let arr_t = (t.includes(' ')) ? t.split(' ') : alert('err 1');
                                            let arr_verse_words = [];                               
                                            arr_t.forEach((el,i) => {    
                                                //element of string is Strong Number
                                                if(!isNaN(parseInt(el)) || el == '0'){//number                         
                                                    let span_strong_tag_start,span_strong_tag_end;
                                                    if(btnStrongIsActive){
                                                        span_strong_tag_start = '<span class="strong show strongActive">'; 
                                                        span_strong_tag_end = '</span>'; 
                                                    }else{
                                                        span_strong_tag_start = '<span class="strong">';
                                                        span_strong_tag_end = '</span>'; 
                                                    }
                                                    let last_char = (el.length > 1) ? el.charAt(el.length-1) : "" ;
                                                    //si ultimo carácter es string
                                                    if(last_char != '' && isNaN(last_char)){
                                                        let el_number = el.substring(0,el.length-1);
                                                        let el_string = last_char;
                                                        arr_verse_words.push(span_strong_tag_start + el_number + span_strong_tag_end + el_string);
                                                    }else{//es number
                                                        arr_verse_words.push(span_strong_tag_start + el + span_strong_tag_end);
                                                    }
                                                }else{//is word
                                                    if(btnStrongIsActive){
                                                        if(el.includes('<S>')){
                                                            el = el.replace('<S>','<S class="show strongActive">');
                                                        }
                                                    }
                                                    arr_verse_words.push(el);
                                                }
                                            });
                                            console.log('arr_verse_words: ');
                                            console.log(arr_verse_words);
                                            let new_VerseText = arr_verse_words.join(' ');
                                            arr_verses_compare[iter_a].verseText = `<span class="vt">${new_VerseText}</span>`;
                                        }
                    
                    
                                        //Примечания редактора в стихах (RSTi2)
                                        if(bq.Notes == 'Y'){
                                            let t = VerseText;
                                            if(t.includes(bq.NoteSign)){// '*'
                                                let arr_t0 = t.split(bq.NoteSign);
                                                let before_Note = arr_t0[0];
                                                if(t.includes(bq.StartNoteSign) && t.includes(bq.EndNoteSign)){
                                                    let arr_t1 = t.split(bq.StartNoteSign);//'[('
                                                    let arr_t2 = arr_t1[1].split(bq.EndNoteSign);//')]'
                                                    let text_Note = arr_t2[0];
                                                    let after_Note = arr_t2[1];
                                                    before_Note = (bq.HTMLFilter == 'Y') ? htmlEntities(before_Note) : before_Note ;
                                                    after_Note = (bq.HTMLFilter == 'Y') ? htmlEntities(after_Note) : after_Note ;
                                                    arr_verses_compare[iter_a].verseText = `<span class="vt">${before_Note}<span class="tooltip" data-tooltip="${text_Note}">${bq.NoteSign}</span>${after_Note}</span>`;
                                                }
                                            }else{
                                                arr_verses_compare[iter_a].verseText = `<span class="vt">${VerseText}</span>`;
                                            }
                                        }
                    
                    
                                        //Оглавления в стихах (NRT)
                                        if(bq.Titles == 'Y'){
                                            let t = VerseText;
                                            if(t.includes(bq.StartTitleSign) && t.includes(bq.EndTitleSign)){
                                                let arr_t1 = t.split(bq.StartTitleSign);//'[('
                                                let before_Title = arr_t1[0];
                                                let arr_t2 = arr_t1[1].split(bq.EndTitleSign);//')]'
                                                let text_Title = arr_t2[0];
                                                let after_Title = arr_t2[1];
                                                arr_verses_compare[iter_a].verseText = `${before_Title} <span class="verse_title">${text_Title}</span>${after_Title}`;
                                            }else{
                                                arr_verses_compare[iter_a].verseText = VerseText;
                                            }
                                        }
                    
                    
                                        //Нет ни Номеров Стронга, ни Примечаний ни Оглавлений
                                        if(bq.StrongNumbers == "N" && bq.Notes == 'N' && bq.Titles == 'N'){
                                            arr_verses_compare[iter_a].verseText = `<span class="vt">${VerseText}</span>`;
                                        }
                    
                                        //========================================================//
                                        //end - modificado
                                        //========================================================//
                                        
                            
                                        iter_a++;
                                        console.log(`aumentado iter_a: ${iter_a}`);
                    
                                        if(iter_a < arrFavTransObj.length){
                                            console.log(' llamo makeArrVersesToCompare()');
                                            makeArrVersesToCompare(iter_a, arr_p_id);
                                        }
                    
                                        if(iter_a == arrFavTransObj.length){
                                            console.log(' final  --- llamo buildVersesFromArr()');
                                            arr_verses_compare = arr_verses_compare.filter(elem => elem);//quito items vacios
                    
                                            buildVersesFromArr(arr_p_id, arr_verses_compare);
                                        }                                         
            
                                    }else{
                                        //console.log(' no existe capítulo '+chapter+' del módulo '+book);
                                        let aviso_text = '<p class="prim">Текущий модуль Библии не содержит стихов для выбранной книги.</p>';
                                        alert(aviso_text);
                                    }
                                })
                                .catch((error) => {
                                    // Manejar cualquier error que pueda ocurrir durante la solicitud o el procesamiento de la respuesta
                                    console.log('error promesa en myPromise con obj_bible_files. error: '+error);
                                });

                            }else{
                                console.log('No coincide el nombre del fichero o fileContent está vacío');
                            }

                        }else{
                            //console.log('no esxiste obj_bible_files book');
                        }
                    }
                }//end - if(typeof obj_bible_files[Translation] != 'undefined')
                

                //si no existe objeto con Translation. hago fetch()
                if(typeof obj_bible_files[Translation].Books[book] == 'undefined'){
                    console.log('--- vc --- no existe objeto con Translation. hago fetch()');

                    //start de tiempo para calcular cuanto tarda
                    const tiempoInicioFetch = new Date().getTime();
                    //console.log('fetch() --- tiempoInicioFetch: '+tiempoInicioFetch);

                    //url del libro necesario
                    url = `modules/text/${Translation}/${bq.Books[book].PathName}`;//nrt_01.htm'; 

                    fetch(url)
                    .then((response) => response.text())
                    .then((bookModule) => {

                        if(crear_objeto_obj_bible_files){
                            obj_bible_files[Translation].Books[book] = {
                                'fileName': bq.Books[book].PathName, 
                                'fileContent': bookModule
                            };
                            //console.log('abajo obj_bible_files:');
                            //console.log(obj_bible_files);
                        }
                       

                        let nb = bookModule.split('<h4>');//делю файл на главы
                        //console.log(nb);
                        
                        nb = nb.filter(elem => elem);//удаляю пустые елементы массива
                        //console.log(nb);

                        //si existe el capitulo// siempre existe
                        if(typeof nb[chapter] !== 'undefined'){

                            let nb_chapter_verses = nb[chapter].split('<p>');
                            //console.log(nb_chapter_verses);                            

                            let este_p = nb_chapter_verses[verse];
                            let VerseText = '(текст стиха отсутствует...)';//si es vacio...
                            
                            if(typeof este_p != 'undefined'){
                                let p_Text = ' ';

                                if(este_p.includes('</p>')){
                                    let arr_p_text = este_p.split('</p>');
                                    p_Text = arr_p_text[0];
                                }else{
                                    p_Text = este_p;
                                }
                                //console.log('p_Text: '+p_Text); 
            
                                let arr_p = p_Text.split(' ');
                                let VerseId = arr_p[0];
                                console.log('VerseId: '+VerseId);
            
                                arr_p.shift(0);//elimino index 0
                                VerseText = arr_p.join(' '); 
                            }                                       

                            arr_verses_compare[iter_a].ChapterQty = bq.Books[book].ChapterQty;
                            arr_verses_compare[iter_a].VerseQty = nb_chapter_verses.length - 1;
                                                
        
                            //========================================================//
                            //start - modificado
                            //========================================================//
        
                            //Номера Стронга в стихах (RST+)
                            if(bq.StrongNumbers == "Y"){
                                let t = VerseText;
                                let arr_t = (t.includes(' ')) ? t.split(' ') : alert('err 1');
                                let arr_verse_words = [];                               
                                arr_t.forEach((el,i) => {    
                                    //element of string is Strong Number
                                    if(!isNaN(parseInt(el)) || el == '0'){//number                         
                                        let span_strong_tag_start,span_strong_tag_end;
                                        if(btnStrongIsActive){
                                            span_strong_tag_start = '<span class="strong show strongActive">'; 
                                            span_strong_tag_end = '</span>'; 
                                        }else{
                                            span_strong_tag_start = '<span class="strong">';
                                            span_strong_tag_end = '</span>'; 
                                        }
                                        let last_char = (el.length > 1) ? el.charAt(el.length-1) : "" ;
                                        //si ultimo carácter es string
                                        if(last_char != '' && isNaN(last_char)){
                                            let el_number = el.substring(0,el.length-1);
                                            let el_string = last_char;
                                            arr_verse_words.push(span_strong_tag_start + el_number + span_strong_tag_end + el_string);
                                        }else{//es number
                                            arr_verse_words.push(span_strong_tag_start + el + span_strong_tag_end);
                                        }
                                    }else{//is word
                                        if(btnStrongIsActive){
                                            if(el.includes('<S>')){
                                                el = el.replace('<S>','<S class="show strongActive">');
                                            }
                                        }
                                        arr_verse_words.push(el);
                                    }
                                });
                                console.log('arr_verse_words: ');
                                console.log(arr_verse_words);
                                let new_VerseText = arr_verse_words.join(' ');
                                arr_verses_compare[iter_a].verseText = `<span class="vt">${new_VerseText}</span>`;
                            }
        
        
                            //Примечания редактора в стихах (RSTi2)
                            if(bq.Notes == 'Y'){
                                let t = VerseText;
                                if(t.includes(bq.NoteSign)){// '*'
                                    let arr_t0 = t.split(bq.NoteSign);
                                    let before_Note = arr_t0[0];
                                    if(t.includes(bq.StartNoteSign) && t.includes(bq.EndNoteSign)){
                                        let arr_t1 = t.split(bq.StartNoteSign);//'[('
                                        let arr_t2 = arr_t1[1].split(bq.EndNoteSign);//')]'
                                        let text_Note = arr_t2[0];
                                        let after_Note = arr_t2[1];
                                        before_Note = (bq.HTMLFilter == 'Y') ? htmlEntities(before_Note) : before_Note ;
                                        after_Note = (bq.HTMLFilter == 'Y') ? htmlEntities(after_Note) : after_Note ;
                                        arr_verses_compare[iter_a].verseText = `<span class="vt">${before_Note}<span class="tooltip" data-tooltip="${text_Note}">${bq.NoteSign}</span>${after_Note}</span>`;
                                    }
                                }else{
                                    arr_verses_compare[iter_a].verseText = `<span class="vt">${VerseText}</span>`;
                                }
                            }
        
        
                            //Оглавления в стихах (NRT)
                            if(bq.Titles == 'Y'){
                                let t = VerseText;
                                if(t.includes(bq.StartTitleSign) && t.includes(bq.EndTitleSign)){
                                    let arr_t1 = t.split(bq.StartTitleSign);//'[('
                                    let before_Title = arr_t1[0];
                                    let arr_t2 = arr_t1[1].split(bq.EndTitleSign);//')]'
                                    let text_Title = arr_t2[0];
                                    let after_Title = arr_t2[1];
                                    arr_verses_compare[iter_a].verseText = `${before_Title} <span class="verse_title">${text_Title}</span>${after_Title}`;
                                }else{
                                    arr_verses_compare[iter_a].verseText = VerseText;
                                }
                            }
        
        
                            //Нет ни Номеров Стронга, ни Примечаний ни Оглавлений
                            if(bq.StrongNumbers == "N" && bq.Notes == 'N' && bq.Titles == 'N'){
                                arr_verses_compare[iter_a].verseText = `<span class="vt">${VerseText}</span>`;
                            }
        
                            //========================================================//
                            //end - modificado
                            //========================================================//
                            
                
                            iter_a++;
                            console.log(`aumentado iter_a: ${iter_a}`);
        
                            if(iter_a < arrFavTransObj.length){
                                console.log(' llamo makeArrVersesToCompare()');
                                makeArrVersesToCompare(iter_a, arr_p_id);
                            }
        
                            if(iter_a == arrFavTransObj.length){
                                console.log(' final  --- llamo buildVersesFromArr()');
                                arr_verses_compare = arr_verses_compare.filter(elem => elem);//quito items vacios
        
                                buildVersesFromArr(arr_p_id, arr_verses_compare);
                            }

                        }else{
                            //console.log(' no existe capítulo '+chapter+' del módulo '+book);
                            let aviso_text = '<p class="prim">Текущий модуль Библии не содержит стихов для выбранной книги.</p>';
                            alert(aviso_text);
                        }
                    })
                    .catch(error => { 
                        //Código a realizar cuando se rechaza la promesa
                        console.log('error promesa en fetch() con obj_bible_files. error: '+error);
                    });                    
                }//end - if(typeof obj_bible_files[Translation].Books[book] == 'undefined')

                console.log('despues de fetch --- abajo obj_bible_files:');
                console.log(obj_bible_files); 

            }//end - modo_fetch_verses_compare == 'by_text'







            if(modo_fetch_verses_compare == 'by_json'){
                console.log(`modo_fetch_verses_compare == 'by_json'`);

                //Meto parametros para sacar datos por el fetch de solo un capitulo en vez de todo el fichero
                let formData = new FormData();
                formData.append('url', '../'+url );
                formData.append('base_ep', base_ep);
                formData.append('bq_EnglishPsalms', el_trans.EnglishPsalms);
                if(book != null) formData.append('book', bookNumber);
                formData.append('chapter', chapterNumber);
                //AKI si HACE FALTA VERSENUMBER y TO_VERSENUMBER!!!
                if(typeof verseNumber != 'undefined' && verseNumber != null) formData.append('verse', verseNumber);
                if(typeof col1_p_length != 'undefined' && col1_p_length != null) formData.append('col1_p_length', col1_p_length);
        
                fetch('app/read_file_to_json.php',{
                    method: 'POST',
                    body: formData
                })
                .then((response) => response.json())
                .then((dataRead) => {
        
                    console.log(dataRead);

                    arr_verses_compare[iter_a].ChapterQty = dataRead.chapterData.ChapterQty;
                    arr_verses_compare[iter_a].VerseQty = dataRead.chapterData.VerseQty;
                    
                    console.log(`en then() --- el_trans.Translation: ${el_trans.Translation}`);
                    let bq = el_trans;


                    let arr = dataRead.chapterData.arr_p_verses[verseNumber].split(' ');
                    arr.shift(0);//elimino index 0
                    let VerseText = arr.join(' ');


                    //========================================================//
                    //start - modificado
                    //========================================================//

                    //Номера Стронга в стихах (RST+)
                    if(bq.StrongNumbers == "Y"){
                        let t = VerseText;
                        let arr_t = (t.includes(' ')) ? t.split(' ') : alert('err 1');
                        let arr_verse_words = [];                               
                        arr_t.forEach((el,i) => {    
                            //element of string is Strong Number
                            if(!isNaN(parseInt(el)) || el == '0'){//number                         
                                let span_strong_tag_start,span_strong_tag_end;
                                if(btnStrongIsActive){
                                    span_strong_tag_start = '<span class="strong show strongActive">'; 
                                    span_strong_tag_end = '</span>'; 
                                }else{
                                    span_strong_tag_start = '<span class="strong">';
                                    span_strong_tag_end = '</span>'; 
                                }
                                let last_char = (el.length > 1) ? el.charAt(el.length-1) : "" ;
                                //si ultimo carácter es string
                                if(last_char != '' && isNaN(last_char)){
                                    let el_number = el.substring(0,el.length-1);
                                    let el_string = last_char;
                                    arr_verse_words.push(span_strong_tag_start + el_number + span_strong_tag_end + el_string);
                                }else{//es number
                                    arr_verse_words.push(span_strong_tag_start + el + span_strong_tag_end);
                                }
                            }else{//is word
                                if(btnStrongIsActive){
                                    if(el.includes('<S>')){
                                        el = el.replace('<S>','<S class="show strongActive">');
                                    }
                                }
                                arr_verse_words.push(el);
                            }
                        });
                        console.log('arr_verse_words: ');
                        console.log(arr_verse_words);
                        let new_VerseText = arr_verse_words.join(' ');
                        arr_verses_compare[iter_a].verseText = `<span class="vt">${new_VerseText}</span>`;
                    }


                    //Примечания редактора в стихах (RSTi2)
                    if(bq.Notes == 'Y'){
                        let t = VerseText;
                        if(t.includes(bq.NoteSign)){// '*'
                            let arr_t0 = t.split(bq.NoteSign);
                            let before_Note = arr_t0[0];
                            if(t.includes(bq.StartNoteSign) && t.includes(bq.EndNoteSign)){
                                let arr_t1 = t.split(bq.StartNoteSign);//'[('
                                let arr_t2 = arr_t1[1].split(bq.EndNoteSign);//')]'
                                let text_Note = arr_t2[0];
                                let after_Note = arr_t2[1];
                                before_Note = (bq.HTMLFilter == 'Y') ? htmlEntities(before_Note) : before_Note ;
                                after_Note = (bq.HTMLFilter == 'Y') ? htmlEntities(after_Note) : after_Note ;
                                arr_verses_compare[iter_a].verseText = `<span class="vt">${before_Note}<span class="tooltip" data-tooltip="${text_Note}">${bq.NoteSign}</span>${after_Note}</span>`;
                            }
                        }else{
                            arr_verses_compare[iter_a].verseText = `<span class="vt">${VerseText}</span>`;
                        }
                    }


                    //Оглавления в стихах (NRT)
                    if(bq.Titles == 'Y'){
                        let t = VerseText;
                        if(t.includes(bq.StartTitleSign) && t.includes(bq.EndTitleSign)){
                            let arr_t1 = t.split(bq.StartTitleSign);//'[('
                            let before_Title = arr_t1[0];
                            let arr_t2 = arr_t1[1].split(bq.EndTitleSign);//')]'
                            let text_Title = arr_t2[0];
                            let after_Title = arr_t2[1];
                            arr_verses_compare[iter_a].verseText = `${before_Title} <span class="verse_title">${text_Title}</span>${after_Title}`;
                        }else{
                            arr_verses_compare[iter_a].verseText = VerseText;
                        }
                    }


                    //Нет ни Номеров Стронга, ни Примечаний ни Оглавлений
                    if(bq.StrongNumbers == "N" && bq.Notes == 'N' && bq.Titles == 'N'){
                        arr_verses_compare[iter_a].verseText = `<span class="vt">${VerseText}</span>`;
                    }

                    //========================================================//
                    //end - modificado
                    //========================================================//
                    
        
                    iter_a++;
                    console.log(`aumentado iter_a: ${iter_a}`);

                    if(iter_a < arrFavTransObj.length){
                        console.log(' llamo makeArrVersesToCompare()');
                        makeArrVersesToCompare(iter_a, arr_p_id);
                    }

                    if(iter_a == arrFavTransObj.length){
                        console.log(' final  --- llamo buildVersesFromArr()');
                        arr_verses_compare = arr_verses_compare.filter(elem => elem);//quito items vacios

                        buildVersesFromArr(arr_p_id, arr_verses_compare);
                    }
        
                })
                .catch(error => {
                    console.log('Error fetch versesCompare. error: ', error);
                });

            }//end - modo_fetch_verses_compare == 'by_json'



        }


    }


}

function buildVersesFromArr(arr_p_id, arr_verses_compare){
    console.log('=== buildVersesFromArr() ===');

    console.log('arr_p_id: ', arr_p_id);
    console.log('arr_verses_compare: ', arr_verses_compare);

    let trans_ref = arr_p_id[0];
    let book = arr_p_id[1];
    let chapter = arr_p_id[2];
    let verse = arr_p_id[3];
    
    eid_bl_modalFullInner.innerHTML = '';

    //creo array de lang de los que están en arr_verses_compare
    arr_verses_lang = [];//reset
    arr_verses_lang = arr_verses_compare.map(el => el.Lang);
    //quito valores duplicados
    arr_verses_lang = [... new Set(arr_verses_lang)];

    

    let objTransCompare = arr_verses_compare.find(v => v.Translation === trans_ref);

    let verseRef = `${objTransCompare.BibleBookShortName}${objTransCompare.chapter}:${objTransCompare.verse}`;

    let obj_to_send = {
        "verseRef":   verseRef,
        "BibleBookShortName":   objTransCompare.BibleBookShortName,
        "trans_ref":  trans_ref,
        "book":       Number(book),
        "chapter":    Number(chapter),
        "verse":      Number(verse),
        "BookQty":    Number(objTransCompare.BookQty),
        "ChapterQty": Number(objTransCompare.ChapterQty),
        "VerseQty":   Number(objTransCompare.VerseQty)
    };

    let obj_to_send_string = JSON.stringify(obj_to_send);







    //================================================================//
    //start - estructura html
    //================================================================//
    const div_wr_vc = document.createElement('div');
    div_wr_vc.id = 'wr_vc';

        const div_wr_vc_head = document.createElement('div');
        div_wr_vc_head.id = 'wr_vc_head';

            const div_vc_head = document.createElement('div');
            div_vc_head.id = 'vc_head';
            /*
            div_vc_head.innerHTML = ` 
                    <div id="btn_verseGoPrev" class="dbtn" title="Prev verse" onclick="verseGo('prev','${obj_to_send_string}')">
                        <img src="images/arrow_chevron_left_white.svg">
                    </div> 
                    
                    <div class="vc_head_ref">${verseRef}</div> 
                    
                    <div id="btn_verseGoNext" class="dbtn" title="Next verse" onclick="verseGo('next','${obj_to_send_string}')">
                        <img src="images/arrow_chevron_right_white.svg">
                    </div>
                `;
            div.append(div_vc_head);
            */


            const d_prev = document.createElement('div');
            d_prev.id = 'btn_verseGoPrev';
            d_prev.className = 'dbtn';
            d_prev.title = 'Prev verse';
            d_prev.onclick = () => {
                verseGo('prev',obj_to_send_string);
            };
            d_prev.innerHTML = `<img src="images/arrow_chevron_left_white.svg">`;

            const d_ref = document.createElement('div');
            d_ref.className = 'vc_head_ref';
            d_ref.innerHTML = verseRef;

            const d_next = document.createElement('div');
            d_next.id = 'btn_verseGoNext';
            d_next.className = 'dbtn';
            d_next.title = 'Next verse';
            d_next.onclick = () => {
                verseGo('next',obj_to_send_string);
            };
            d_next.innerHTML = `<img src="images/arrow_chevron_right_white.svg">`;



        //div FILTER
        const div_vc_head_filter = document.createElement('div');
        div_vc_head_filter.id = 'vc_head_filter'; 

    
        /*
        div_vc_head_filter.innerHTML = ` 
            <div id="title_filter" onclick="hideShowWrFilter()">Filtrar:</div>

            <div id="wr_filter" style="display:none;">
                <div id="wr_filter_inner">
                
                    
                    <div id="wr_one_lang">
                        <label id="lab_one_lang">
                            <span>
                                <input id="one_lang" type="checkbox" onchange="filterTransCompare(this,null)"> Solo un idioma
                            </span>
                        </label>
                        <button id="btn_show_refs" class="btn" onclick="hideShowRefsCompare(this)">Show Refs</button>
                    </div>


                    <div id="wr_btns_lang">
                    
                        <div id="btns_lang">
                            <button class="btn btn_active" data-lang="ru" onclick="filterTransCompare(this,'ru')">Rus</button>
                            <button class="btn btn_active" data-lang="ua" onclick="filterTransCompare(this,'ua')">Ukr</button>
                            <button class="btn btn_active" data-lang="es" onclick="filterTransCompare(this,'es')">Esp</button>
                        </div>
                    
                        <button id="btn_lang_all" class="btn btn_active" onclick="filterTransCompare(this,'all')">Todos</button>

                    </div>

                </div>
            </div>
        `;
        */


        //title_filter
        const div_title_filter = document.createElement('div');
        div_title_filter.id = 'title_filter';
        div_title_filter.innerHTML = 'Фильтр:';
        div_title_filter.onclick = () => {
            hideShowWrFilter();
        }

        //wr_filter
        const div_wr_filter = document.createElement('div');
        div_wr_filter.id = 'wr_filter';
        div_wr_filter.style.display = ajuste1.wr_filter.display;//por defecto es oculto
    
            //wr_filter_inner
            const div_wr_filter_inner = document.createElement('div');
            div_wr_filter_inner.id = 'wr_filter_inner';



            //fld_refs
            const fieldset_fld_refs = document.createElement('fieldset');
            fieldset_fld_refs.id = 'fld_refs';
            fieldset_fld_refs.innerHTML = '<legend class="leg">Ссылки</legend>';

                //wr_show_refs
                const div_wr_show_refs = document.createElement('div');
                div_wr_show_refs.id = 'wr_show_refs';

                    //btn_show_refs
                    const boton_btn_show_refs = document.createElement('button');
                    boton_btn_show_refs.id = 'btn_show_refs';
                    //boton_btn_show_refs.innerHTML = `<button id="btn_show_refs" class="btn" onclick="hideShowRefsCompare(this)">Show Refs</button>`;
                    boton_btn_show_refs.style.display = ajuste1.btn_show_refs.display;
                    boton_btn_show_refs.className = ajuste1.btn_show_refs.classText;
                    boton_btn_show_refs.textContent = 'Паказывать ссылки';
                    //hideShowRefsCompare();
                    boton_btn_show_refs.onclick = (e) => {
                        hideShowRefsCompare(e.target);
                    };



            //fld_lang
            const fieldset_fld_lang = document.createElement('fieldset');
            fieldset_fld_lang.id = 'fld_lang';
            fieldset_fld_lang.innerHTML = '<legend class="leg">Языки</legend>';

                //wr_one_lang
                const div_wr_one_lang = document.createElement('div');
                div_wr_one_lang.id = 'wr_one_lang';
                /*
                div_wr_one_lang.innerHTML = `
                    <label id="lab_one_lang">
                            <input id="one_lang" type="checkbox" onchange="filterTransCompare(this,null)"> <span>Один язык</span>
                    </label>
                    <label id="lab_many_lang">
                            <input id="many_lang" type="checkbox" onchange="filterTransCompare(this,null)"> <span>Несколько языков</span>
                    </label>
                    <button id="btn_show_refs" class="btn" onclick="hideShowRefsCompare(this)">Show Refs</button>
                `;
                */

                    //label_one_lang
                    const label_one_lang = document.createElement('label');
                    label_one_lang.id = 'lab_one_lang';

                    //span_one_lang_text
                    const span_one_lang_text = document.createElement('span');
                    span_one_lang_text.textContent = ' Один язык';

                    const radio_one_lang = document.createElement('input');
                    radio_one_lang.id = 'one_lang';
                    radio_one_lang.type = 'radio';
                    radio_one_lang.name = 'modo_lang';
                    radio_one_lang.checked = ajuste1.one_lang.checked;
                    radio_one_lang.onchange = (e) => {
                        filterTransCompare(e.target,null);//e.srcElement = this 
                    };


                    //label_many_lang
                    const label_many_lang = document.createElement('label');
                    label_many_lang.id = 'lab_many_lang';

                    //span_one_lang_text
                    const span_many_lang_text = document.createElement('span');
                    span_many_lang_text.textContent = ' Несколько языков';

                    const radio_many_lang = document.createElement('input');
                    radio_many_lang.id = 'many_lang';
                    radio_many_lang.type = 'radio';
                    radio_many_lang.name = 'modo_lang';
                    radio_many_lang.checked = ajuste1.many_lang.checked;
                    radio_many_lang.onchange = (e) => {
                        filterTransCompare(e.target,null);//e.srcElement = this 
                    }; 



                //wr_btns_lang
                const div_wr_btns_lang = document.createElement('div');
                div_wr_btns_lang.id = 'wr_btns_lang';
                /*
                div_wr_btns_lang.innerHTML = `
                    <div id="btns_lang">
                        <button class="btn btn_active" data-lang="ru" onclick="filterTransCompare(this,'ru')">Rus</button>
                        <button class="btn btn_active" data-lang="ua" onclick="filterTransCompare(this,'ua')">Ukr</button>
                        <button class="btn btn_active" data-lang="es" onclick="filterTransCompare(this,'es')">Esp</button>
                    </div>

                    <button id="btn_lang_all" class="btn btn_active" onclick="filterTransCompare(this,'all')">Todos</button>
                `;
                */

                //btns_lang
                const div_btns_lang = document.createElement('div');
                div_btns_lang.id = 'btns_lang';

                arr_verses_lang.forEach(el=>{
                    //ejemplo boton: <button class="btn btn_active" data-lang="ru" onclick="filterTransCompare(this,'ru')">Rus</button>
                    const btn = document.createElement('button');
                    btn.className = (ajuste1.arr_lang_act.includes(el) || (ajuste1.arr_lang_act.length == 0 && ajuste1.arr_lang_noact.length == 0) ) ? 'btn btn_active' : 'btn' ;
                    btn.dataset.lang = el;//['ru','ua','es']
                    btn.textContent = el.toUpperCase();
                    btn.onclick = (e) => {
                        filterTransCompare(e.target,el);
                    };
                    div_btns_lang.append(btn);
                });                


                //btn_lang_all
                const boton_btn_lang_all = document.createElement('button');
                boton_btn_lang_all.id = 'btn_lang_all';
                //div_btn_lang_all.innerHTML = `<button id="btn_lang_all" class="btn btn_active" onclick="filterTransCompare(this,'all')">Todos</button>`;
                boton_btn_lang_all.className = (ajuste1.arr_lang_act.length == arr_verses_lang.length || (ajuste1.arr_lang_act.length == 0 && ajuste1.arr_lang_noact.length == 0) ) ? 'btn btn_active' : 'btn' ;
                boton_btn_lang_all.style.display = (ajuste1.many_lang.checked) ? 'block' : 'none' ;
                boton_btn_lang_all.textContent = 'Все языки';
                boton_btn_lang_all.onclick = (e) => {
                    filterTransCompare(e.target,'all');
                };


            
            //fld_trans
            const fieldset_fld_trans = document.createElement('fieldset');
            fieldset_fld_trans.id = 'fld_trans';
            fieldset_fld_trans.innerHTML = `
                <legend class="leg">Переводы</legend>
            `;
            
                //wr_btns_trans
                const div_wr_btns_trans = document.createElement('div');
                div_wr_btns_trans.id = 'wr_btns_trans';
                /*
                div_wr_btns_trans.innerHTML = `
                    <div id="btns_trans">
                        <button class="btn btn_active" data-lang="ru" data-trans="rstStrongRed" onclick="filterTransCompare(this,'ru')">RSTr+</button>
                        <button class="btn btn_active" data-lang="ua" data-trans="ukr_ogi" onclick="filterTransCompare(this,'ua')">Ukr_Ogi</button>
                        <button class="btn btn_active" data-lang="es" data-trans="rv60" onclick="filterTransCompare(this,'es')">RV60</button>
                    </div>
                `;
                */
                
                //btns_lang
                const div_btns_trans = document.createElement('div');
                div_btns_trans.id = 'btns_trans';
            
                arr_verses_compare.forEach(el => {
                    //ejemplo boton: <button class="btn btn_active" data-lang="ru" data-trans="rstStrongRed" onclick="filterTransCompare(this,'ru')">RSTr+</button>
                    const btn = document.createElement('button');

                    if(ajuste1.arr_lang_act.includes(el.Lang) || (ajuste1.arr_lang_act.length == 0 && ajuste1.arr_lang_noact.length == 0) ){
                        btn.style.display = 'block';
                    }else{
                        btn.style.display = 'none';
                    }

                    if(ajuste1.arr_trans_act.includes(el.Translation) || (ajuste1.arr_trans_act.length == 0 && ajuste1.arr_trans_noact.length == 0) ){
                        btn.className = 'btn btn_active';
                    }else{
                        btn.className = 'btn';
                    }

                    btn.dataset.lang = el.Lang;//['ru','ua','es']
                    btn.dataset.trans = el.Translation;//['rstStrongRed','rv60',...]
                    btn.textContent = el.BibleShortName;
                    btn.title = el.BibleName;
                    btn.onclick = (e) => {
                        filterTransCompareBtns(e.target);
                    };
                    div_btns_trans.append(btn);
                });


    //BODY of verses
    const div_vc_body = document.createElement('div');
    div_vc_body.id = 'vc_body';    
    

    //==================================//
    //start - append los elementos
    //==================================//
    div_wr_vc.append(div_wr_vc_head);

        div_wr_vc_head.append(div_vc_head);
            div_vc_head.append(d_prev);
            div_vc_head.append(d_ref);
            div_vc_head.append(d_next);

        div_wr_vc_head.append(div_vc_head_filter);

            div_vc_head_filter.append(div_title_filter);
            div_vc_head_filter.append(div_wr_filter);
                div_wr_filter.append(div_wr_filter_inner);

                    div_wr_filter_inner.append(fieldset_fld_refs);
                        fieldset_fld_refs.append(div_wr_show_refs);
                            div_wr_show_refs.append(boton_btn_show_refs);

                    div_wr_filter_inner.append(fieldset_fld_lang);
                        fieldset_fld_lang.append(div_wr_one_lang);
                            div_wr_one_lang.append(label_one_lang);
                                label_one_lang.append(radio_one_lang);
                                label_one_lang.append(span_one_lang_text);
                            div_wr_one_lang.append(label_many_lang);
                                label_many_lang.append(radio_many_lang);
                                label_many_lang.append(span_many_lang_text);

                    div_wr_filter_inner.append(fieldset_fld_trans);        
                        fieldset_fld_lang.append(div_wr_btns_lang);
                            div_wr_btns_lang.append(boton_btn_lang_all);
                            div_wr_btns_lang.append(div_btns_lang);

                    div_wr_filter_inner.append(fieldset_fld_trans);
                        fieldset_fld_trans.append(div_wr_btns_trans);
                            div_wr_btns_trans.append(div_btns_trans);

    div_wr_vc.append(div_vc_body);
    //==================================//
    //end - append los elementos
    //==================================//    

    //================================================================//
    //end - estructura html
    //================================================================//   


    
    //coloco trans del versiculo elegido al inicio de la lista de los comparados
    arr_verses_compare.sort((a, b) => {
        if(a.Translation == trans_ref){
            return -1;//coloca al inicio la trans_ref
        }else{
            return 1;
        }
    });
    //console.log(arr_verses_compare);


    arr_verses_compare.forEach((el,i) => {        
        const p = document.createElement('p');
        p.className = (i == 0) ? 'pv pv_active' : 'pv' ;//el primer elemento -> activo que es trans_ref
        p.dataset.verse_lang = el.Lang;
        p.dataset.verse_trans = el.Translation;

        if( i == 0 || 
            //(ajuste1.arr_lang_act.includes(el.Lang) || (ajuste1.arr_lang_act.length == 0 && ajuste1.arr_lang_noact.length == 0) ) || 
            (ajuste1.arr_trans_act.includes(el.Translation) || (ajuste1.arr_trans_act.length == 0 && ajuste1.arr_trans_noact.length == 0) )
        ){
            p.style.display = 'block';
        }else{
            p.style.display = 'none';
        }

        /*
        p.innerHTML = ` 
        <span class="pv_inner">
            <span class="b_trans" title="${el.BibleName}">${el.BibleShortName}</span> 
            <a href="#" class="a_ref" style="display: ${ajuste1.a_ref.display}">${el.BibleBookShortName}${el.chapter}:${el.verse}</a> 
            <span class="v_trans">${el.verseText}</span>
        </span>
        `;
        */
        
        const pv_inner = document.createElement('span');
        pv_inner.className = 'pv_inner';

        const b_trans = document.createElement('span');
        b_trans.className = 'b_trans';
        b_trans.title = el.BibleName;
        b_trans.innerHTML = el.BibleShortName;

        const a_ref = document.createElement('a');
        a_ref.className = 'a_ref';
        a_ref.href = '#';
        a_ref.style.display = ajuste1.a_ref.display;
        let refLink = `${el.BibleBookShortName}${el.chapter}:${el.verse}`;
        a_ref.innerHTML = refLink;
        a_ref.onclick = (e) => {
            
            updateArrTrans();

            if(arr_trans.includes(el.Translation)){
                arr_trans.unshift(el.Translation);//вставляю в начало
                arr_trans = [... new Set(arr_trans)];//удаляю повторяющиеся елементы
            }else{
                arr_trans[0] = el.Translation;//меняю первый елемент
            }

            document.querySelectorAll('.colsHead').forEach((el,i) => {
                let this_trans = arrFavTransObj.find(v => v.Translation === arr_trans[i]);

                el.dataset.trans = this_trans.Translation;
                el.dataset.base_ep = this_trans.EnglishPsalms;

                if(i == 0){
                    //eid_inpt_nav.dataset.trans = this_trans.Translation; 
                }
            });
            
            
            eid_inpt_nav.dataset.trans = el.Translation;
            eid_act_trans_nav.textContent = el.BibleShortName;            
            
            goToLink(el.Translation, refLink);
            updateArrTrans();
            setTimeout(()=>{
                eid_s_verse.click();
            },100);
            closeModal();
        };

        const v_trans = document.createElement('span');
        v_trans.className = 'v_trans';
        v_trans.innerHTML = el.verseText;

        p.append(pv_inner);

        pv_inner.append(b_trans);
        pv_inner.append(a_ref);
        pv_inner.append(v_trans);

        div_vc_body.append(p);
    });
    eid_bl_modalFullInner.append(div_wr_vc);

    mySizeVersesCompare();

}

function updateArrTrans(){
    let colsHeadAll = document.querySelectorAll('.colsHead');

    arr_trans = [];//reset
    colsHeadAll.forEach((el) =>{
        arr_trans.push(el.dataset.trans);
        console.log(arr_trans);
    });
    console.log('arr_trans: ',arr_trans);


    let btns_footer_trans_all = document.querySelectorAll('#footerInner button');
    btns_footer_trans_all.forEach(el => {
        if(el.classList.contains('btn_active')){
            el.classList.remove('btn_active');
        }
        
        if(el.value == eid_trans1.dataset.trans){
            el.classList.add('btn_active');
        }
    });

}

function mySizeVersesCompare(){

    //eid_myModalContent.offsetHeight;//1208
    //eid_modcont_header.offsetHeight;//40 // Sravneniye perevodov
    //eid_modcont_body.offsetHeight;//1168
    //eid_bl_modalFull.offsetHeight;//1721 todos los versiculos
    //eid_bl_modalFullInner.offsetHeight;//1721 todos los versiculos

    const eid_wr_vc_head = document.getElementById('wr_vc_head');
    const eid_vc_body = document.getElementById('vc_body');

    if(eid_wr_vc_head != null && eid_vc_body != null){
        let h = 
            eid_myModalContent.offsetHeight //653
          - eid_modcont_header.offsetHeight //41   
          - eid_wr_vc_head.offsetHeight     //173
          - 20  
        ;
    
        eid_vc_body.style.maxHeight = h + 'px';
        //eid_vc_body.style.height = h + 'px';//para test
        eid_modcont_body.style.overflow = 'hidden';
    }
}

function hideShowWrFilter(){
    let wr_filter = document.getElementById('wr_filter');
    let val;

    if(esVisible(wr_filter)){
        //wr_filter.style.display = 'none';
        val = 'none';
    }else{
        //wr_filter.style.display = 'block';
        val = 'block';
    }

    wr_filter.style.display = val;
    ajuste1.wr_filter.display = val;
    mySizeVersesCompare();
}

function hideShowRefsCompare(e = null){
    let a_ref_all = document.querySelectorAll('.a_ref');//todos a_ref
    let btn_show_refs = document.getElementById('btn_show_refs');
    //let elementoRef = a_ref_all[0];//primer link   

    
    if(ajuste1.btn_show_refs.stateActive /*esVisible(elementoRef)*/){
        btn_show_refs.classList.remove('btn_active');
        ajuste1.btn_show_refs.classText = 'btn';
        ajuste1.btn_show_refs.stateActive = false;
        ajuste1.a_ref.display = 'none';
        a_ref_all.forEach(el=>{
            el.style.display = 'none';
        });
    }else{
        btn_show_refs.classList.add('btn_active');
        ajuste1.btn_show_refs.classText = 'btn btn_active';
        ajuste1.btn_show_refs.stateActive = true;
        ajuste1.a_ref.display = 'inline-block';
        a_ref_all.forEach(el=>{
            el.style.display = 'inline-block';
        });
    }
}

function filterTransCompare(e, param = 'all'){
    const radio_one_lang = document.getElementById('one_lang');
    const radio_many_lang = document.getElementById('many_lang');
    const btns_lang = document.getElementById('btns_lang');
    const btn_lang_all = document.getElementById('btn_lang_all');
    const btns_trans = document.getElementById('btns_trans');
    
    let pv_all = document.querySelectorAll('.pv');//todos los parafos de verses mostrados
    let btns_lang_all = btns_lang.querySelectorAll('.btn');
    let btns_trans_all = btns_trans.querySelectorAll('.btn');
    let this_btn = e;

    if(radio_one_lang.checked){//solo mostrar un idioma

        ajuste1.one_lang.checked = true;
        ajuste1.many_lang.checked = false;
        
        btn_lang_all.style.display = 'none';
        ajuste1.btn_lang_all.display = 'none';
        ajuste1.btn_lang_all.class = 'tab';

        btns_lang_all.forEach(el=>{
            if(el.className.includes('btn_active')){
                el.classList.remove('btn_active');
            } 
        });
        this_btn.classList.add('btn_active');

        //y desactivo todos trans
        btns_trans_all.forEach(el=>{
            if(el.className.includes('btn_active')){
                el.classList.remove('btn_active');
                el.style.display = 'none';
                ajuste1.arr_trans_act.splice(ajuste1.arr_trans_act.indexOf(el.dataset.trans),1);
            } 
        });

        //miro cuantos botones están marcados
        let arr_lang_act = [];
        let arr_lang_noact = [];
        btns_lang_all.forEach(el => {
            if(el.className.includes('btn_active')){
                arr_lang_act.push(el.dataset.lang);
            }else{
                arr_lang_noact.push(el.dataset.lang);
            }
        });
        //console.log('arr_lang_act: ',arr_lang_act );
        //console.log('arr_lang_noact: ',arr_lang_noact);

        ajuste1.arr_lang_act = arr_lang_act;
        ajuste1.arr_lang_noact = arr_lang_noact;

        //btns_trans
        btns_trans_all.forEach(el=>{
            //console.log(`${el.dataset.lang} --- ${el.dataset.trans}`);
            if(arr_lang_act.indexOf(el.dataset.lang) >= 0){
                el.style.display = 'block';        
                if(!el.className.includes('btn_active') && this_btn.dataset.lang == el.dataset.lang){
                    el.classList.add('btn_active');
                    ajuste1.arr_trans_act.push(el.dataset.trans);
                }    
            }else{
                el.style.display = 'none';                
                if(el.className.includes('btn_active')){
                    el.classList.remove('btn_active');
                    ajuste1.arr_trans_act.splice(ajuste1.arr_trans_act.indexOf(el.dataset.trans),1);
                }
            }
        });

        
        pv_all.forEach((el,i)=>{   
            if(i != 0){//siempre dejo visible el primer parafo con el verse comparado 
                //console.log(`one lang --- ${el.dataset.verse_lang} --- ${el.dataset.verse_trans}`);
                if(el.dataset.verse_lang == param){
                    el.style.display = 'block';
                }else{
                    el.style.display = 'none';
                }
            }
        });

    }else{//mostrar VARIOS idiomas marcadas

        ajuste1.one_lang.checked = false;
        ajuste1.many_lang.checked = true;

        btn_lang_all.style.display = 'block';
        ajuste1.btn_lang_all.display = 'block';
        ajuste1.btn_lang_all.class = 'tab tab_active';

        if(this_btn.id == 'btn_lang_all'){

            if(btn_lang_all.className.includes('btn_active')){
                btn_lang_all.classList.remove('btn_active');//desactivo este btn_lang_all
                
                //y desactivo todos lang
                btns_lang_all.forEach(el=>{
                    if(el.className.includes('btn_active')){
                        el.classList.remove('btn_active');
                    } 
                });

                //y desactivo todos trans
                btns_trans_all.forEach(el=>{
                    if(el.className.includes('btn_active')){
                        el.classList.remove('btn_active');
                        ajuste1.arr_trans_act.splice(ajuste1.arr_trans_act.indexOf(el.dataset.trans),1);
                    } 
                });
                
            }else{
                btn_lang_all.classList.add('btn_active');//activo este btn_lang_all
                
                //y activo todos lang
                btns_lang_all.forEach(el=>{
                    if(!el.className.includes('btn_active')){
                        el.classList.add('btn_active');
                    } 
                });

                //y activo todos trans
                btns_trans_all.forEach(el=>{
                    if(!el.className.includes('btn_active') ){
                        el.classList.add('btn_active');
                        ajuste1.arr_trans_act.push(el.dataset.trans);
                    } 
                });
            }

        }else{

            if(this_btn.className.includes('btn_active')){
                this_btn.classList.remove('btn_active');
            }else{
                this_btn.classList.add('btn_active'); 
            }

        }

        

        //miro cuantos botones están marcados
        let arr_lang_act = [];
        let arr_lang_noact = [];
        btns_lang_all.forEach(el => {
            if(el.className.includes('btn_active')){
                arr_lang_act.push(el.dataset.lang);
            }else{
                arr_lang_noact.push(el.dataset.lang);
            }
        });
        console.log('arr_lang_act: ',arr_lang_act );
        //console.log('arr_lang_noact: ',arr_lang_noact);

        ajuste1.arr_lang_act = arr_lang_act;
        ajuste1.arr_lang_noact = arr_lang_noact;
        
        //btns_trans
        btns_trans_all.forEach(el=>{
            console.log(`${el.dataset.lang} --- ${el.dataset.trans}`);

            if(arr_lang_act.indexOf(el.dataset.lang) >= 0){
                el.style.display = 'block';        
                if(!el.className.includes('btn_active') && this_btn.dataset.lang == el.dataset.lang){
                    el.classList.add('btn_active');
                    ajuste1.arr_trans_act.push(el.dataset.trans);
                }    
            }else{
                el.style.display = 'none';                
                if(el.className.includes('btn_active')){
                    el.classList.remove('btn_active');
                    ajuste1.arr_trans_act.splice(ajuste1.arr_trans_act.indexOf(el.dataset.trans),1);
                }
            }
        });
        

        (arr_lang_act.length == arr_verses_lang.length) ? btn_lang_all.classList.add('btn_active') : btn_lang_all.classList.remove('btn_active') ;

        pv_all.forEach((el,i) => {   
            if(i != 0){//siempre dejo visible el primer parafo con el verse comparado 
                console.log(`${el.dataset.verse_lang} --- ${el.dataset.verse_trans}`);

                //si lang de pv esta en el 'array arr_lang_act' su index sera >= 0
                if(ajuste1.arr_trans_act.indexOf(el.dataset.verse_trans) >= 0){
                    console.log('muestro pv');
                    el.style.display = 'block';
                }else{
                    console.log('--- NO muestro pv');
                    el.style.display = 'none';
                }
            }
        });
    }

}



function filterTransCompareBtns(e){
    console.log('===function filterTransCompareBtns()===');

    const btns_trans = document.getElementById('btns_trans');
    let pv_all = document.querySelectorAll('.pv');//todos los parafos de verses mostrados

    let btns_lang_all = btns_lang.querySelectorAll('.btn');
    let btns_trans_all = btns_trans.querySelectorAll('.btn');
    let this_btn = e;


    if(this_btn.className.includes('btn_active')){
        this_btn.classList.remove('btn_active');
    }else{
        this_btn.classList.add('btn_active');
    }


    let arr_trans_act = [];
    let arr_trans_noact = [];
    let arr_trans_lang = [];

    btns_trans_all.forEach(el => {
        if(el.className.includes('btn_active')){
            arr_trans_act.push(el.dataset.trans);
            arr_trans_lang.push(el.dataset.lang);
            console.log('arr_trans_lang: ',arr_trans_lang );
        }else{
            arr_trans_noact.push(el.dataset.trans);
        }
    });
    console.log('arr_trans_act: ',arr_trans_act );
    //console.log('arr_trans_noact: ',arr_trans_noact);

    arr_trans_lang = [... new Set(arr_trans_lang)];//quito elementos duplicados 
    console.log('sin duplicados --- arr_trans_lang: ',arr_trans_lang );

    ajuste1.arr_trans_act = arr_trans_act;
    ajuste1.arr_trans_noact = arr_trans_noact;    
    
    btns_lang_all.forEach(el => {
        if(el.className.includes('btn_active') && arr_trans_lang.indexOf(el.dataset.lang) == -1 ){
            console.log(' noo ok. --- quito act');
            el.classList.remove('btn_active');
            ajuste1.arr_lang_act.splice(ajuste1.arr_lang_act.indexOf(el.dataset.lang),1)
        }
        else if(!el.className.includes('btn_active') && arr_trans_lang.indexOf(el.dataset.lang) >= 0 ){
            console.log(' todo ok. no quito act');
            el.classList.add('btn_active');
            ajuste1.arr_lang_act.push(el.dataset.lang);
        }       
    });
    ajuste1.arr_lang_act = [... new Set(ajuste1.arr_lang_act)];//quito elementos duplicados


    pv_all.forEach((el,i)=>{   
        if(i != 0){//siempre dejo visible el primer parafo con el verse comparado 
            //si lang de pv esta en el 'array arr_lang_act' su index sera >= 0
            if(ajuste1.arr_trans_act.indexOf(el.dataset.verse_trans) >= 0){
                el.style.display = 'block';
            }else{
                el.style.display = 'none';
            }
        }
    });
}


function esVisible(elemento) {
    return !!elemento && (elemento.offsetWidth > 0 || elemento.offsetHeight > 0 || elemento.getClientRects().length > 0) && getComputedStyle(elemento).visibility !== 'hidden';
}


function showHistoryNav(){
    eid_bl_modalFullInner.innerHTML = '';

    if(arr_hist_nav.length > 0){
        arr_hist_nav.forEach((el,i)=>{
            const p = document.createElement('p');       
            p.onclick = () => {
                onclick_p_nav(el);
                closeModal();
                showTab(eid_btn_nav,'nav');
            }
            p.innerHTML = `<span class="sp_trans_hist">${el.BibleShortName} <span class="sp_fecha_hist">${el.fecha}</span></span>`;
            p.innerHTML += `<span class="sp_ref_hist">${el.ref} <span class="sp_hora_hist">${el.hora}</span></span>`;
            eid_bl_modalFullInner.append(p);
        });
    }else{
        const p = document.createElement('p');
        p.className = 'prim';
        p.innerHTML = 'Нет записей в истории навигации.';
        eid_bl_modalFullInner.append(p);
    }    
}

function showHistoryFind(){
    eid_bl_modalFullInner.innerHTML = '';

    if(arr_hist_find.length > 0){
        arr_hist_find.forEach((el,i)=>{
            const p = document.createElement('p');
            p.onclick = () => {
                onclick_p_find(el);
                closeModal();
                if(window.innerWidth < pantallaTabletMinPx){
                    openSidebar(document.querySelector('.btnMenu'));//abro sidemar 'menu hamburguesa left'
                }
                showTab(eid_btn_find,'find');
            }
            p.innerHTML = ` <span class="sp_trans_hist">${el.BibleShortName} 
                            <span class="wr_fecha_hora">
                                <span class="sp_fecha_hist">Совпадений: ${el.count_matches}</span>
                                <span class="sp_hora_hist">Стихов: ${el.count_verses}</span>
                            </span>
                        </span>`;
            p.innerHTML += `<span class="sp_words_hist">${el.words}</span>`;
            eid_bl_modalFullInner.append(p);
        });
    }else{
        const p = document.createElement('p');
        p.className = 'prim';
        p.innerHTML = 'Нет записей в истории поиска.';
        eid_bl_modalFullInner.append(p);
    }
}

function showHistoryStrong(){
    eid_bl_modalFullInner.innerHTML = '';

    if(arr_hist_strong.length > 0){
        arr_hist_strong.forEach((el,i)=>{
            const p = document.createElement('p');
            p.onclick = () => {
                onclick_p_strong(el);
                closeModal();
                showTab(eid_btn_strong,'strong');           
            }
            p.innerHTML = `<span class="sp_trans_hist">${el.strongLang} <span class="sp_fecha_hist">${el.fecha}</span></span>`;
            p.innerHTML += `<span class="sp_ref_hist">${el.strongIndex} <span class="sp_hora_hist">${el.hora}</span></span>`;
            eid_bl_modalFullInner.append(p);
        });
    }else{
        const p = document.createElement('p');
        p.className = 'prim';
        p.innerHTML = 'Нет записей в истории номеров Стронга.';
        eid_bl_modalFullInner.append(p);
    }
}


// When the user clicks on <span> (x), close the eid_myModal
function closeModal() {
    eid_myModal.style.opacity = 0;//start efecto fade
    setTimeout(()=>{
        eid_myModal.style.display = "none";
    },400);
}

// When the user clicks anywhere outside of the eid_myModal, close it
window.onclick = function(event) {
    // console.log('window.onclick on eid_myModal');
    if(event.target == eid_myModal || event.target == eid_myModalContent){
        closeModal();
    }
}



function verseGo(dir, obj_to_send_string){
    
    let this_json = JSON.parse(obj_to_send_string);

    console.log('abajo this_json: ');    
    console.log(this_json);  

    //desestructuracion de objeto this_json
    const { 
        verseRef,
        BibleBookShortName,
        trans_ref,
        book, 
        chapter, 
        verse,        
        BookQty,
        ChapterQty,
        VerseQty
    } = this_json;

    console.log(`${trans_ref} --- ${book} ---${chapter} ---${verse}`);

    let this_objTrans = arrFavTransObj.find(v => v.Translation === trans_ref);  
    
    
    if(dir == 'next'){
        console.log('show next verse');    

        let next_book = book;
        let next_chapter = chapter; 
        let next_verse = verse;

        if(verse == VerseQty){

            if(chapter == ChapterQty){
                
                if(book == BookQty - 1){//Apocalipsis
                    next_book = 0;//Génesis
                }else{
                    next_book = book + 1;
                }   
    
                next_chapter = 1;
            }else{
                next_chapter = chapter + 1;
            }
            
            next_verse = 1;
        }else{
            next_verse = verse + 1;
        }

        console.log(`${next_book} ---${next_chapter} ---${next_verse}`);

        openModal('full', 'Сравнение переводов', [trans_ref, next_book, next_chapter, next_verse], 'compareVerse', false);// modalFadeIn = false

    }


    if(dir == 'prev'){
        console.log('show prev verse');    

        let prev_book = book;
        let prev_chapter = chapter; 
        let prev_verse = verse;

        if(verse == 1){

            if(chapter == 1){
                
                if(book == 0){//Génesis
                    prev_book = BookQty - 1;//66 - 1 = 65 => Apocapipsis
                }else{
                    prev_book = book - 1;
                }   
    
                prev_chapter = parseInt(this_objTrans.Books[prev_book].ChapterQty);
            }else{
                prev_chapter = chapter - 1;
            }

            
            //hago fetch para sacar VerseQty del chapter anterior
            let url = './modules/text/'+trans_ref+'/' + this_objTrans.Books[prev_book].PathName;// "./modules/text/rstStrongRed/02_exodus.htm"                                
                                
            let formData = new FormData();
            formData.append('url','../'+url);
            formData.append('book', prev_book);
            formData.append('chapter', prev_chapter);

            fetch('app/read_file_get_VerseQty_to_json.php',{
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                
                prev_verse = data.VerseQty;
                //console.log('15047. verse: ',verse);

                if(prev_verse > 0){
                    openModal('full', 'Сравнение переводов', [trans_ref, prev_book, prev_chapter, prev_verse], 'compareVerse', false);// modalFadeIn = false
                }

            })
            .catch(error => { 
                // Código a realizar cuando se rechaza la promesa
                console.log('VerseQty. error promesa: '+error);
            });

        }else{
            prev_verse = verse - 1;
            console.log(`${prev_book} ---${prev_chapter} ---${prev_verse}`);
            
            openModal('full', 'Сравнение переводов', [trans_ref, prev_book, prev_chapter, prev_verse], 'compareVerse', false);// modalFadeIn = false
        }

    }
}


function openModalForActTrans(){
    let divtrans_to_change = (eid_inpt_nav.dataset.divtrans != '') ? document.getElementById(eid_inpt_nav.dataset.divtrans) : eid_trans1 ; 
    // console.log(divtrans_to_change);    
    openModal('full','Избранныe модули Библии',divtrans_to_change,'showModules');
}




eid_myModal.addEventListener('click', function(e){
    //console.log('eid_myModal. div 2 exterior');
    closeModal();
});

eid_modcont_header.addEventListener('click', function(e){
    //console.log('-- eid_modcont_header. div 1 interior');
    e.stopPropagation();
});
eid_modcont_body.addEventListener('click', function(e){
    //console.log('-- eid_modcont_body. div 1 interior');
    e.stopPropagation();
});
eid_modcont_footer.addEventListener('click', function(e){
    //console.log('-- eid_modcont_footer. div 1 interior');
    e.stopPropagation();
});






















