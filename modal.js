function openModal(param = null, headerTitle = null, htmlTrans = null, action = null){
  console.log('===function openModal()===');
  console.log(`param: ${param} --- headerTitle: ${headerTitle}`);    

    eid_myModal.style.display = "block";
    eid_myModal.style.opacity = 0;//start efecto fade
    setTimeout(()=>{
        eid_myModal.style.opacity = 1;//end efecto fade
    },10);

    //reset
    eid_myModalContent.removeAttribute('class');
    eid_myModalContent.classList.add('modal-content');
 
    Array.from(document.querySelectorAll('.body_bls')).forEach((el,i)=>{
        el.style.display = 'none';
        //el.removeAttribute('class');
        //el.classList.add('modal-content');//default
    });

    //
    //Tipos de ModalContent
    switch (param) {

        //Меню
        case 'top':
            eid_h4_text.innerHTML = headerTitle;//'Меню';
            eid_btn_sp_atras.style.display = 'none'; //mo muestro flecha atras
            eid_myModal.style.paddingTop = '0px';
            eid_myModalContent.classList.add('modalContentTop');
            eid_bl_modalTop.style.display = 'block';
            break;

        //pendiente de desarrollo
        case 'center':
            eid_btn_sp_atras.style.display = 'none';//?
            eid_myModal.style.paddingTop = '25vh';
            eid_myModalContent.classList.add('modalContentCenter');
            eid_bl_modalCenter.style.display = 'block';
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
                    console.log('aki llamar buildVerseMenu()');
                    buildVerseMenu(htmlTrans);//es arr_p_id en este caso
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
                    selectModule2(htmlTrans);
                    break;
            
                case 'showHistoryNav':
                    console.log('aki llamar showHistoryNav()');
                    showHistoryNav();
                    break;
            
                case 'showHistoryFind':
                    console.log('aki llamar showHistoryFind()');
                    showHistoryFind();
                    break;
            
                case 'showHistoryStrong':
                    console.log('aki llamar showHistoryStrong()');
                    showHistoryStrong();
                    break;

                case 'compareVerse':
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




function buildVerseMenu(arr_p_id){
    console.log('=== function buildVerseMenu(arr_p_id) ===');

    eid_bl_modalBottomInner.innerHTML = '';
  
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
        openModal('full', 'Comparar traducciones', arr_p_id, 'compareVerse');
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

    eid_bl_modalBottomInner.append(btn1);
    eid_bl_modalBottomInner.append(btn2);
    eid_bl_modalBottomInner.append(btn3);
    eid_bl_modalBottomInner.append(btn4);
    
}

function buildVersesToCompare(arr_p_id){//arr_p_id = ['rstStrongRed',0,1,1]
    //creo array de p's de un verse de todas las trans favoritas

    window.arr_verses_compare = [];
    let iter_a = 0;//start


    let btnStrongIsActive = false;
    if(eid_btnStrong.classList.contains('btn_active')){
        btnStrongIsActive = true;
    }

    makeArrVersesToCompare(iter_a, arr_p_id);

    function makeArrVersesToCompare(iter_a, arr_p_id){
        
        let base_ep = eid_trans1.dataset.base_ep;

        let trans_ref = arr_p_id[0];
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
    
            //url del libro necesario
            url = `modules/text/${el_trans.Translation}/${el_trans.Books[bookNumber].PathName}`;//ej.: nrt_01.htm'; 
    

            if(url.includes('no_disponible.htm')){
                console.log('url includes no_disponible.htm');
                //divShow.innerHTML = '<p class="prim">Текущий модуль Библии не содержит стихов для выбранной книги.</p>';

                iter_a++;
                console.log(`aumentado iter_a: ${iter_a}`);
                arr_verses_compare.push('');//item vacio. luego lo quito

                makeArrVersesToCompare(iter_a, arr_p_id);
                return false;
            }


            arr_verses_compare.push({});
            arr_verses_compare[iter_a]['Translation'] = el_trans.Translation;
            arr_verses_compare[iter_a]['Lang'] = el_trans.Lang;
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
                console.log('--- chapter y verse no se modifican. se pasan tal cual.');
            }

            arr_verses_compare[iter_a].book = bookNumber;
            arr_verses_compare[iter_a].chapter = chapterNumber;
            arr_verses_compare[iter_a].verse = verseNumber;



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
                console.log('error: ', error);
            });

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

    const div = document.createElement('div');
    div.id = 'wr_vc';

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

    const d = document.createElement('div');
    d.className = 'vc_head';
    /*
    d.innerHTML = ` <div id="btn_verseGoPrev" class="dbtn" title="Prev verse" onclick="verseGo('prev','${obj_to_send_string}')">
                        <img src="images/arrow_chevron_left_white.svg">
                    </div> 
                    
                    <div class="vc_head_ref">${verseRef}</div> 
                    
                    <div id="btn_verseGoNext" class="dbtn" title="Next verse" onclick="verseGo('next','${obj_to_send_string}')">
                        <img src="images/arrow_chevron_right_white.svg">
                    </div>
                    `;
    div.append(d);
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

    d.append(d_prev);
    d.append(d_ref);
    d.append(d_next);
    div.append(d);


    const d2 = document.createElement('div');
    d2.id = 'pa';
    d2.className = 'vc_head_filter';
    d2.innerHTML = ` 
                    <div id="title_filter" onclick="hideShowWrFilter()">Filtrar:</div>

                    <div id="wr_filter" style="display:none;">
                        <div id="wr_filter_inner">
                        
                            
                            <div class="wr_one_lang">
                                <label>
                                    <span>
                                        <input id="one_lang" type="checkbox" onchange="filterTransCompare(this,null)"> Solo un idioma
                                    </span>
                                </label>
                                <button id="btn_show_refs" class="btn" onclick="hideShowRefsCompare(this)">Show Refs</button>
                            </div>


                            <div class="wr_btns_lang">
                            
                                <div class="btns_lang">
                                    <button id="btn_ru" class="btn btn_active" data-lang="ru" onclick="filterTransCompare(this,'ru')">Rus</button>
                                    <button id="btn_ua" class="btn btn_active" data-lang="ua" onclick="filterTransCompare(this,'ua')">Ukr</button>
                                    <button id="btn_es" class="btn btn_active" data-lang="es" onclick="filterTransCompare(this,'es')">Esp</button>
                                </div>
                            
                                <button id="btn_all" class="btn btn_active" onclick="filterTransCompare(this,'all')">Todos</button>

                            </div>

                        </div>
                    </div>
                `;
    div.append(d2);
    


    
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
        p.innerHTML = ` <span class="pv_inner">
                            <span class="b_trans">${el.BibleShortName}</span> 
                            <a href="#" class="a_ref">${el.BibleBookShortName}${el.chapter}:${el.verse}</a> 
                            <span class="v_trans">${el.verseText}</span>
                        </span>
                        `;
        div.append(p);
    });
    eid_bl_modalFullInner.append(div);

}

function hideShowWrFilter(){
    let wr_filter = document.getElementById('wr_filter');

    if(esVisible(wr_filter)){
        wr_filter.style.display = 'none';
    }else{
        wr_filter.style.display = 'block';
    }
}

function hideShowRefsCompare(e){
    let a_ref_all = document.querySelectorAll('.a_ref');//todos a_ref
    let elementoRef = a_ref_all[0];//primer link

    //if(e.className.includes())
    
    if(esVisible(elementoRef)){
        e.classList.remove('btn_active');
        a_ref_all.forEach(el=>{
            el.style.display = 'none';
        });
    }else{
        e.classList.add('btn_active');
        a_ref_all.forEach(el=>{
            el.style.display = 'inline-block';
        });
    }
}

function filterTransCompare(e, param = 'all'){
    let pv_all = document.querySelectorAll('.pv');//todos los parafos de verses mostrados

    const cbox_one_lang = document.getElementById('one_lang');
    const btn_all = document.getElementById('btn_all');
    const btn_ru = document.getElementById('btn_ru');
    const btn_ua = document.getElementById('btn_ua');
    const btn_es = document.getElementById('btn_es');

    let btns_lang_all = document.querySelectorAll('.btns_lang .btn');

    let this_btn = e;

    if(cbox_one_lang.checked){//solo mostrar un idioma
        
        btn_all.style.display = 'none';

        btns_lang_all.forEach(el=>{
            if(el.className.includes('btn_active')){
                el.classList.remove('btn_active');
            } 
        });
        this_btn.classList.add('btn_active');
        
        pv_all.forEach((el,i)=>{   
            if(i != 0){//siempre dejo visible el primer parafo con el verse comparado 
                //if(param == 'all'){
                //    el.style.display = 'block';
                //}else{
                    if(el.dataset.verse_lang == param){
                        el.style.display = 'block';
                    }else{
                        el.style.display = 'none';
                    }
                //}
            }
        });

    }else{//mostrar VARIOS los idiomas marcadas

        btn_all.style.display = 'block';


        if(this_btn.id == 'btn_all'){

            if(btn_all.className.includes('btn_active')){
                btn_all.classList.remove('btn_active');//desactivo este btn_all
                
                //y desactivo todos
                btns_lang_all.forEach(el=>{
                    if(el.className.includes('btn_active')){
                        el.classList.remove('btn_active');
                    } 
                });
                
            }else{
                btn_all.classList.add('btn_active');//activo este btn_all
                
                //y activo todos
                btns_lang_all.forEach(el=>{
                    if(!el.className.includes('btn_active')){
                        el.classList.add('btn_active');
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
        btns_lang_all.forEach(el=>{
            if(el.className.includes('btn_active')){
                arr_lang_act.push(el.dataset.lang);
            } 
        });
        console.log(arr_lang_act);

        (arr_lang_act.length == 3) ? btn_all.classList.add('btn_active') : btn_all.classList.remove('btn_active') ;

        pv_all.forEach((el,i)=>{   
            if(i != 0){//siempre dejo visible el primer parafo con el verse comparado 
                //si lang de pv esta en el 'array arr_lang_act' su index sera >= 0
                if(arr_lang_act.indexOf(el.dataset.verse_lang) >= 0){
                    el.style.display = 'block';
                }else{
                    el.style.display = 'none';
                }
            }
        });
    }

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

    console.log(`${book} ---${chapter} ---${verse}`);
    
    
    
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


        openModal('full', verseRef, [trans_ref, next_book, next_chapter, next_verse], 'compareVerse');

    }




























    if(dir == 'prev'){
        console.log('show prev verse');    

    }
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






















