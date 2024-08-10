//====================================================================//
//  F U N C T I O N S
//====================================================================//

//getStrongNumber('H430');
//setTimeout(()=>{getStrongNumber('G3056')},5000);



function getStrongNumberVersion2(numberStr, lang = null, paramfirstLetter = null){
    //console.log('=== function getStrongNumberVersion2() ===');
    
    let numberInt, numberStrShow, strongFile;

    //si numero strong es clecked desde findWords y viene rojo... 
    if(numberStr.includes('<b class="f_red">') || numberStr.includes('</b>')){
        numberStr = numberStr.replace('<b class="f_red">','');
        numberStr = numberStr.replace('</b>','');
    }

    if(window.innerWidth < pantallaTabletMinPx){//si es mobile
        openSidebar(document.querySelector('.btnMenu'));//simulo click sobre el boton hamburguesa        
    }else{
        if(eid_sidebar.style.display == 'none'){
            hideShowSidebar();
        }
    }    
    
    //H7225 or G6225
    if(numberStr.includes('H') || numberStr.includes('G')){
        let firstLetter = numberStr.substr(0,1);
        //console.log('firstLetter: '+firstLetter);       
        numberInt = parseInt(numberStr.substr(1));
        numberStrShow = numberStr;
        strongFile = (firstLetter == 'G') ? 'greek_short.json' : 'hebrew_short.json' ;
        strongLang = (firstLetter == 'G') ? 'greek' : 'hebrew' ;
    }else{//00776 
        numberInt = parseInt(numberStr); 
        if(lang == 'Grk'){
            numberStrShow = 'G'+numberInt;
            strongFile = 'greek_short.json';
            strongLang = 'greek';
        }else{
            numberStrShow = 'H'+numberInt;
            strongFile = 'hebrew_short.json';
            strongLang = 'hebrew';
        }
    }
    //console.log('numberInt: '+numberInt);
    //console.log('numberStrShow: '+numberStrShow);
    //console.log('strongFile: '+strongFile);  

    if(typeof obj_strong_files == 'undefined'){
        obj_strong_files = {};
    }

    //si existe objeto con Translation. Saco datos del objeto
    if(typeof obj_strong_files[strongLang] != 'undefined'){
        if(obj_strong_files[strongLang].fileName != 'undefined'){
            if( obj_strong_files[strongLang].fileName == strongFile && 
                obj_strong_files[strongLang].fileContent != '' && 
                obj_strong_files[strongLang].fileContent != ' '
            ){
                //console.log(' --- typeof obj_strong_files[strongLang] EXISTE --- saco datos del objeto guardado ');
       
                let myPromise_strong = new Promise(function(resolve, reject){
                    resolve('ok');
                });

                myPromise_strong
                .then((data) => {

                    //console.log(data);

                    let strong;
                    if(data == 'ok'){//siempre es ok
                        strong = obj_strong_files[strongLang].fileContent;
                    }
            
                    let obj_strong = strong.find(v => v.t === numberStr); 
                    //console.log('abajo obj_strong: ');
                    //console.log(obj_strong);
            
                    let strongIndex = obj_strong.t;//topic
                    let strongText = obj_strong.d;//definition
                    //console.log('strongIndex: '+strongIndex);
                    //console.log('strongText: '+strongText);
            
                    eid_strong_body.innerHTML = '';//reset datos
            
                    showTab(eid_btn_strong,'strong'); 

                    //añado NumberStrong al historial
                    addStrongNumberToHistStrong(strongLang, strongIndex);
            
                    const span_num_strong = document.createElement('span');
                    span_num_strong.className = 'num_strong';
                    span_num_strong.innerHTML = numberStrShow;
                    //span_num_strong.innerHTML += ' <span class="f_r">'+strongIndex+'</span>';//ANTES. NO HACE FALTA
            
                    strongText = strongText.replaceAll('<br/>','<br/><br>');
                    strongText = strongText.replace('<br>','');//solo 1-ra palabra
            
                    let arr_w = strongText.split('<br/>');
                    let arr_new = [];
                    //console.log('abajo arr_w: ');
                    //console.log(arr_w);
            
                    arr_w = arr_w.filter(elem => elem);
            
                    arr_w.forEach((el,i,arr)=>{   
                        
                        //Links Strong
                        if(el.includes(`<a href='S:`) && el.includes('</a>')){
                            //el = el.replaceAll(`<a href='S:`,`<S class='sn2_s show' data-strong='`);
                            //el = el.replaceAll(`</a>`,`</S>`);
            
                            el = el.replaceAll(`<a href='S:`,`<a href='#' class='sn2_s a_sn show ' data-strong='`);
                            //el = el.replaceAll(`</a>`,`</S>`);
            
                        }
            
                        //Links Bible
                        //<a href="#" onclick="goToLink('rstStrongRed', 'Быт.1:4')">Быт.1:4</a>
                        if(el.includes(`<a href='B:`) && el.includes('</a>')){
                            el = el.replaceAll(`<a href='B:`,`<a onclick="goToLink('rstStrongRed', this.innerText)" href='#`);
                            //el = el.replaceAll(`</a>`,`</S>`);
                        }
            
                        
                        //Palabra + Traducción
                        if( (el.includes('<he>') && el.includes('</he>')) || (el.includes('<el>') && el.includes('</el>'))){
                            el = '<span class="sn2 sn_w_trad">'+el +'</span>';
                            el = el.replace('<br>','');//solo 1-ra palabra
                        }
            
                        
                        //Оригинал:
                        if(el.includes('<df>Оригинал:</df>')){
                            if(arr[0].includes('<he>') && arr[0].includes('</he>')){
                                el = el.replaceAll('<b>','<he class="hel_sm">');
                                el = el.replaceAll('</b>','</he>');
                            }else if(arr[0].includes('<el>') && arr[0].includes('</el>')){
                                el = el.replaceAll('<b>','<el class="hel_sm">');
                                el = el.replaceAll('</b>','</el>');
                            }
                            el = '<span class="sn2 sn_oryg">'+el +'</span>';
                            el = el.replaceAll('<br>','');
                        }
            
                        //Транслитерация:
                        if(el.includes('<df>Транслитерация:</df>') ){
                            if(el.includes('<b>отсутствует</b>')){
                                el = '';//no muestro lo que está vacio vacío
                            }else{
                                el = '<span class="sn2 sn_translit">'+el +'</span>';
                            } 
                            el = el.replaceAll('<br>','');
                        }
            
                        //Произношение:
                        if(el.includes('<df>Произношение:</df>') ){
                            el = '<span class="sn2 sn_proizn">'+el +'</span>';
                            el = el.replaceAll('<br>','');
                        }
            
                        //Часть речи:
                        if(el.includes('<df>Часть речи:</df>') ){
                            if(!el.includes('<b>') && !el.includes('</b>')){
                                el = '';//no muestro lo que está vacio vacío
                            }else{
                                el = '<span class="sn2 sn_chast_r">'+el +'</span>';
                            }
                            el = el.replaceAll('<br>','');
                        }
            
                        //Этимология:
                        if(el.includes('<df>Этимология:</df>') ){
                            el = '<span class="sn2 sn_etim">'+el +'</span>';
                            el = el.replaceAll('<br>','');
                        }
            
                        //Синонимы:
                        if(el.includes('<df>Синонимы:</df>')){
                            el = '<span class="sn2 sn_syn">'+el +'</span>';
                            el = el.replaceAll('<br>','');
                        }
            
                        //MASOR:
                        if(el.includes('<df>MASOR:</df>')){
                            el = '<span class="sn2 sn_masor">'+el +'</span>';
                            el = el.replaceAll('<br>','');
                        }
            
                        //LXX:
                        if(el.includes('<df>LXX:</df>')){
                            el = '<span class="sn2 sn_lxx">'+el +'</span>';
                            el = el.replaceAll('<br>','');
                        }
            
            
                        //Словарь Дворецкого:
                        if(el.includes('<df>Словарь Дворецкого:</df>')){
                            el = el.replace('<df>Словарь Дворецкого:</df>','');//quito esta palabra ya que la añado luego en botón
                            
                            let regex = /\s(\d+)\)\s/gi;// ejemplo: ' 1) '
                            let resultado = el.match(regex);
            
                            if(resultado){
                                //console.log('abajo resultado:');
                                //console.log(resultado);
                                //console.log(`resultado.length: ${resultado.length}`);
                                for (let i = 0; i < resultado.length; i++) {
                                    const element = resultado[i];
                                    //console.log(' ');
                                    //console.log('antes el: '+el);
                                    
                                    if(i == 0){
                                        el = '<span class="dvor_block" style="display:none;">' + el;
                                        //console.log(' ');
                                        //console.log('start for. el: '+el);
                                    }
                                    
                                    el = el.replace(element, ' <br> <nm>' + element +'</nm>');//solo un element . ' 1) ' => ' <br> 1) ' , luego ' 2) ' => ' <br> 2) '...
                                    //console.log(' ');
                                    //console.log('despues el: '+el);
                                    
                                    if(i == resultado.length - 1){
                                        el = el + '</span>';
                                        //console.log(' ');
                                        //console.log('end for. el: '+el);
                                    }                    
                                }
                            
                            }else{
                                //console.log("1. No se encontró ningún dígito entre espacio al principio y paréntesis con espacio al final.");
                                el = '<span class="dvor_block" style="display:none;">' + el + '</span>';
                            }
            
                            el = `
                                <span class="btn btn_dvor" onclick="showHideDvor()">
                                    <span class="slov_dvor">Словарь Дворецкого:</span> 
                                    <img src="images/icon_razvernut.png">
                                </span>
                                <span class="sn2 sn_dvor">${el}</span>
                            `;
                            el = el.replace('<br>','');//replace() no replaceAll(). elimino 1-er br
                            el = el.replaceAll(' Пр.: ',' <pr>Пр.:</pr> ');//                            
                        }
            
            
                        //si 'el' no incluye otro campo distinto a los mencionados...
                        //if(
                        //    !el.includes('<df>Оригинал:</df>') &&
                        //    !el.includes('<df>Транслитерация:</df>') &&
                        //    !el.includes('<df>Произношение:</df>') &&
                        //    !el.includes('<df>Часть речи:</df>') &&
                        //    !el.includes('<df>Этимология:</df>') &&
                        //    !el.includes('<df>Синонимы:</df>') &&
                        //    !el.includes('<df>Словарь Дворецкого:</df>')
                        //){
                        //    //el = '<span class="sn2 sn_other">'+el +'</span>';
                        //}
                        
                        //console.log(el);
                        arr_new.push(el);
                    });
                    let new_strongText = arr_new.join(' ');
            
                    const span_text_strong = document.createElement('span');
                    span_text_strong.className = 'text_strong';
                    span_text_strong.innerHTML = new_strongText;            
            
                    const p_v = document.createElement('p');//найти стихи с этим номером
                    p_v.className = 'p_v';
                    p_v.innerHTML = `Найти стихи с этим номером.`;
                    p_v.onclick = function(){
                        
                        showTab(btn_find,'find');                        
            
                        if(paramfirstLetter != null && paramfirstLetter == 'Y'){
                            eid_inpt_find.value = numberStrShow;
                            eid_cbox1.checked = false;
                            eid_cbox2.checked = false;
                            eid_cbox3.checked = false;
                            eid_cbox4.checked = false;
                            eid_cbox5.checked = false;
                            eid_cbox6.checked = false;
                            eid_cbox7.checked = true;//si hace falta
                            findWords(numberStrShow);//rstStrongRed - ok
                        }else{
                            eid_inpt_find.value = numberStr;
                            if(numberStr.includes('H') || numberStr.includes('G')){//rstStrongRed
                                eid_cbox1.checked = false;
                                eid_cbox2.checked = false;
                                eid_cbox3.checked = false;
                                eid_cbox4.checked = false;
                                eid_cbox5.checked = false;
                                eid_cbox6.checked = false;
                                eid_cbox7.checked = true;//si hace falta
                                findWords(numberStr);
                            }else{//rstStrong (старый)
                                eid_cbox1.checked = false;
                                eid_cbox2.checked = false;
                                eid_cbox3.checked = false;
                                eid_cbox4.checked = true;//si hace falta
                                eid_cbox5.checked = false;
                                eid_cbox6.checked = false;    
                                eid_cbox7.checked = false;//si hace falta
                                findWords(numberStr);//rstStrong
                            }
                        }
                        //findWords(strongIndex);//rstStrong - ok
                        //findWords(numberStr);
                    }
                    eid_strong_body.append(p_v);
            
                    const p = document.createElement('p');
                    p.append(span_num_strong);
                    p.append(span_text_strong);
            
                    eid_strong_body.append(p);
            
                    //Listener para Strong Heb
                    if(typeof new_strongText !== 'undefined' && new_strongText.includes('sn2_s')){
                        document.querySelectorAll('.a_sn').forEach(el=>{                 
                            el.addEventListener('click', function(){ 
                                getStrongNumber(el.innerHTML);
                            });    
                        });
                    }
                    mySizeStrong();//altura de eid_strong_body despues de meter eid_strong_head
                })
                .catch(error => { 
                    // Código a realizar cuando se rechaza la promesa
                    console.error('error promesa strong2: '+error);
                });        
        
            }else{
                //console.log('No coincide el nombre del fichero o fileContent está vacío');
            }
        } 
    }

    if(typeof obj_strong_files[strongLang] == 'undefined'){
        //console.log(' --- typeof obj_strong_files[strongLang] == undefined --- hago fetch() ');
        
        fetch(`./modules/text/strongs/${strongFile}`)
        .then((response) => response.json())
        .then((strong) => {
            //console.log(strong);

            //añado info al objeto con los datos obtenidos por fetch()
            obj_strong_files[strongLang] = {'fileName': strongFile, 'fileContent': strong};
            //console.log('abajo obj_strong_files:');
            //console.log(obj_strong_files);
    
            //let arr_strong = strong.split('<h4>')[numberInt + 1].split('</h4>');//una linea 
            let obj_strong = strong.find(v => v.t === numberStr); 
            //console.log('abajo obj_strong: ');
            //console.log(obj_strong);
    
            let strongIndex = obj_strong.t;//topic
            let strongText = obj_strong.d;//definition
            //console.log('strongIndex: '+strongIndex);
            //console.log('strongText: '+strongText);
    
            eid_strong_body.innerHTML = '';//reset datos
    
            showTab(eid_btn_strong,'strong');

            //añado numberStrong al historial
            addStrongNumberToHistStrong(strongLang, strongIndex);
    
            const span_num_strong = document.createElement('span');
            span_num_strong.className = 'num_strong';
            span_num_strong.innerHTML = numberStrShow;
            //span_num_strong.innerHTML += ' <span class="f_r">'+strongIndex+'</span>';//ANTES. NO HACE FALTA
    
            strongText = strongText.replaceAll('<br/>','<br/><br>');
            strongText = strongText.replace('<br>','');//solo 1-ra palabra
    
            let arr_w = strongText.split('<br/>');
            let arr_new = [];
            //console.log('abajo arr_w: ');
            //console.log(arr_w);
    
            arr_w = arr_w.filter(elem => elem);
    
            arr_w.forEach((el,i,arr)=>{   
                        
                //Links Strong
                if(el.includes(`<a href='S:`) && el.includes('</a>')){
                    //el = el.replaceAll(`<a href='S:`,`<S class='sn2_s show' data-strong='`);
                    //el = el.replaceAll(`</a>`,`</S>`);
    
                    el = el.replaceAll(`<a href='S:`,`<a href='#' class='sn2_s a_sn show ' data-strong='`);
                    //el = el.replaceAll(`</a>`,`</S>`);
    
                }
    
                //Links Bible
                //<a href="#" onclick="goToLink('rstStrongRed', 'Быт.1:4')">Быт.1:4</a>
                if(el.includes(`<a href='B:`) && el.includes('</a>')){
                    el = el.replaceAll(`<a href='B:`,`<a onclick="goToLink('rstStrongRed', this.innerText)" href='#`);
                    //el = el.replaceAll(`</a>`,`</S>`);
                }
    
                
                //Palabra + Traducción
                if( (el.includes('<he>') && el.includes('</he>')) || (el.includes('<el>') && el.includes('</el>'))){
                    el = '<span class="sn2 sn_w_trad">'+el +'</span>';
                    el = el.replace('<br>','');//solo 1-ra palabra
                }
    
                
                //Оригинал:
                if(el.includes('<df>Оригинал:</df>')){
                    if(arr[0].includes('<he>') && arr[0].includes('</he>')){
                        el = el.replaceAll('<b>','<he class="hel_sm">');
                        el = el.replaceAll('</b>','</he>');
                    }else if(arr[0].includes('<el>') && arr[0].includes('</el>')){
                        el = el.replaceAll('<b>','<el class="hel_sm">');
                        el = el.replaceAll('</b>','</el>');
                    }
                    el = '<span class="sn2 sn_oryg">'+el +'</span>';
                    el = el.replaceAll('<br>','');
                }
    
                //Транслитерация:
                if(el.includes('<df>Транслитерация:</df>') ){
                    if(el.includes('<b>отсутствует</b>')){
                        el = '';//no muestro lo que está vacio vacío
                    }else{
                        el = '<span class="sn2 sn_translit">'+el +'</span>';
                    } 
                    el = el.replaceAll('<br>','');
                }
    
                //Произношение:
                if(el.includes('<df>Произношение:</df>') ){
                    el = '<span class="sn2 sn_proizn">'+el +'</span>';
                    el = el.replaceAll('<br>','');
                }
    
                //Часть речи:
                if(el.includes('<df>Часть речи:</df>') ){
                    if(!el.includes('<b>') && !el.includes('</b>')){
                        el = '';//no muestro lo que está vacio vacío
                    }else{
                        el = '<span class="sn2 sn_chast_r">'+el +'</span>';
                    }
                    el = el.replaceAll('<br>','');
                }
    
                //Этимология:
                if(el.includes('<df>Этимология:</df>') ){
                    el = '<span class="sn2 sn_etim">'+el +'</span>';
                    el = el.replaceAll('<br>','');
                }
    
                //Синонимы:
                if(el.includes('<df>Синонимы:</df>')){
                    el = '<span class="sn2 sn_syn">'+el +'</span>';
                    el = el.replaceAll('<br>','');
                }
    
                //MASOR:
                if(el.includes('<df>MASOR:</df>')){
                    el = '<span class="sn2 sn_masor">'+el +'</span>';
                    el = el.replaceAll('<br>','');
                }
    
                //LXX:
                if(el.includes('<df>LXX:</df>')){
                    el = '<span class="sn2 sn_lxx">'+el +'</span>';
                    el = el.replaceAll('<br>','');
                }
    
    
                //Словарь Дворецкого:
                if(el.includes('<df>Словарь Дворецкого:</df>')){
                    el = el.replace('<df>Словарь Дворецкого:</df>','');//quito esta palabra ya que la añado luego en botón
                    
                    let regex = /\s(\d+)\)\s/gi;// ejemplo: ' 1) '
                    let resultado = el.match(regex);
    
                    if(resultado){
                        //console.log('abajo resultado:');
                        //console.log(resultado);
                        //console.log(`resultado.length: ${resultado.length}`);
                        for (let i = 0; i < resultado.length; i++) {
                            const element = resultado[i];
                            //console.log(' ');
                            //console.log('antes el: '+el);
                            
                            if(i == 0){
                                el = '<span class="dvor_block" style="display:none;">' + el;
                                //console.log(' ');
                                //console.log('start for. el: '+el);
                            }
                            
                            el = el.replace(element, ' <br> <nm>' + element +'</nm>');//solo un element . ' 1) ' => ' <br> 1) ' , luego ' 2) ' => ' <br> 2) '...
                            //console.log(' ');
                            //console.log('despues el: '+el);
                            
                            if(i == resultado.length - 1){
                                el = el + '</span>';
                                //console.log(' ');
                                //console.log('end for. el: '+el);
                            }                    
                        }
                    
                    }else{
                        //console.log("2. No se encontró ningún dígito entre espacio al principio y paréntesis con espacio al final.");
                        el = '<span class="dvor_block" style="display:none;">' + el + '</span>';
                    }
    
                    el = `
                        <span class="btn btn_dvor" onclick="showHideDvor()">
                            <span class="slov_dvor">Словарь Дворецкого:</span> 
                            <img src="images/icon_razvernut.png">
                        </span>
                        <span class="sn2 sn_dvor">${el}</span>
                    `;
                    el = el.replace('<br>','');//replace() no replaceAll(). elimino 1-er br
                    el = el.replaceAll(' Пр.: ',' <pr>Пр.:</pr> ');//                            
                }
    
    
                //si 'el' no incluye otro campo distinto a los mencionados...
                //if(
                //    !el.includes('<df>Оригинал:</df>') &&
                //    !el.includes('<df>Транслитерация:</df>') &&
                //    !el.includes('<df>Произношение:</df>') &&
                //    !el.includes('<df>Часть речи:</df>') &&
                //    !el.includes('<df>Этимология:</df>') &&
                //    !el.includes('<df>Синонимы:</df>') &&
                //    !el.includes('<df>Словарь Дворецкого:</df>')
                //){
                //    //el = '<span class="sn2 sn_other">'+el +'</span>';
                //}
                
                //console.log(el);
                arr_new.push(el);
            });
            let new_strongText = arr_new.join(' ');

            const span_text_strong = document.createElement('span');
            span_text_strong.className = 'text_strong';
            span_text_strong.innerHTML = new_strongText;            
    
            const p_v = document.createElement('p');//найти стихи с этим номером
            p_v.className = 'p_v';
            p_v.innerHTML = `Найти стихи с этим номером.`;
            p_v.onclick = function(){

                showTab(btn_find,'find');
                
                if(paramfirstLetter != null && paramfirstLetter == 'Y'){
                    eid_inpt_find.value = numberStrShow;
                    eid_cbox1.checked = false;
                    eid_cbox2.checked = false;
                    eid_cbox3.checked = false;
                    eid_cbox4.checked = false;
                    eid_cbox5.checked = false;
                    eid_cbox6.checked = false;
                    eid_cbox7.checked = true;//si hace falta
                    findWords(numberStrShow);//rstStrongRed - ok
                }else{
                    eid_inpt_find.value = numberStr;
                    if(numberStr.includes('H') || numberStr.includes('G')){//rstStrongRed
                        eid_cbox1.checked = false;
                        eid_cbox2.checked = false;
                        eid_cbox3.checked = false;
                        eid_cbox4.checked = false;
                        eid_cbox5.checked = false;
                        eid_cbox6.checked = false;
                        eid_cbox7.checked = true;//si hace falta
                        findWords(numberStr);
                    }else{//rstStrong (старый)
                        eid_cbox1.checked = false;
                        eid_cbox2.checked = false;
                        eid_cbox3.checked = false;
                        eid_cbox4.checked = true;//si hace falta
                        eid_cbox5.checked = false;
                        eid_cbox6.checked = false;    
                        eid_cbox7.checked = false;//si hace falta
                        findWords(numberStr);//rstStrong
                    }
                }
                //findWords(strongIndex);//rstStrong - ok
                //findWords(numberStr);
            }
            eid_strong_body.append(p_v);
    
            const p = document.createElement('p');
            p.append(span_num_strong);
            p.append(span_text_strong);
    
            eid_strong_body.append(p);
    
            //Listener para Strong Heb
            if(typeof new_strongText !== 'undefined' && new_strongText.includes('sn2_s')){
                document.querySelectorAll('.a_sn').forEach(el=>{                 
                    el.addEventListener('click', function(){ 
                        getStrongNumber(el.innerHTML);
                    });    
                });
            }
            mySizeStrong();//altura de eid_strong_body despues de meter eid_strong_head
        })
        .catch(error => { 
            // Código a realizar cuando se rechaza la promesa
            console.error('error promesa strong2: '+error);
        });

    }

}


function showHideDvor(){
    let dvor_block = document.querySelector('.dvor_block');
    let btn_dvor_img = document.querySelector('.btn_dvor img');

    if(dvor_block != null){
        if(dvor_block.style.display == 'none'){
            dvor_block.style.display = 'block';
            btn_dvor_img.classList.add('razv');
        }else{
            dvor_block.style.display = 'none';
            btn_dvor_img.classList.remove('razv');
        }
    }else{
        return false;
    }
}


const buildVersesTsk = (arr_tsk_p, Translation) => {
    const count_tsk = document.getElementById('count_tsk');
    eid_tsk_body.innerHTML = '';//reset 
    //console.log(arr_tsk_p);
    arr_tsk_p_filtered = arr_tsk_p.filter(elem => elem);

    if(arr_tsk_p_filtered.length == 0) return;

    arr_tsk_p_filtered.forEach(el=>{
        //console.log('build tsk. abajo el: ');
        //console.log(el);
        eid_tsk_body.append(el);
    });
    eid_tsk_body.scrollTop = 0;

    //Después de formar todos los links de tsk añado listener on click//No funciona correctamente!
    
    eid_tsk_body.removeEventListener('click', handlerListenTsk);
    eid_tsk_body.addEventListener('click', handlerListenTsk);
    

    if(count_tsk === null){
        const span_count_tsk = document.createElement('span');
        span_count_tsk.id = 'count_tsk';
        span_count_tsk.textContent = arr_tsk_p_filtered.length;
        document.getElementById('sm_trans').append(span_count_tsk);
    }else{
        count_tsk.textContent = arr_tsk_p_filtered.length;
    }
}

const handlerListenTsk = (ev, Translation ) => {
    //console.log(ev);
    //console.log(ev.target);

    if(ev.target.tagName === 'A'){
        //console.log(ev.target);
        //console.log(ev.target.innerHTML);
        goToLink(Translation, ev.target.innerHTML);
    } 
}


function buildDivShow(arrData, indexColToBuild = null){
    //console.log('function buildDivShow');
    //alert('function buildDivShow');
    //console.log('arrData: ', arrData);

    //si solo hay que construir una columna
    if(indexColToBuild != null){
        let el = Array.from(eid_wrCols.children)[indexColToBuild];//eid_wrCols es constanta y está declarada al inicio

        let el_colsInner = el.querySelector('.colsInner');
        el_colsInner.innerHTML = '';
        let show_comments_in_col = false;//por defecto

        //si hay verses en array
        if(arrData[0].length != 0){
            let trans = arr_trans[0];
            //console.log(' de columna trans: ', trans);
            //compruebo si la traducción tiene comentarios dentro en '<f>[1]</f>'
            //busco objeto de trans
            let trans_col = arrFavTransObj.find(v => v.Translation === trans);
            //console.log('trans_col: ', trans_col);
            if(trans_col.Commentaries == 'Y' ){
                show_comments_in_col = true;
            }
            
            for (let index = 0; index < arrData[0].length; index++) {//aquí siempre arrData[0]
                let element = arrData[0][index];            
                //console.log('añado element con append. abajo element:');
                //console.log(element);
                //añado boton con '...' al verse para verseMenu de comparar traducciones
                if(element.tagName == 'P'){   
                    const sp_btn_vm = document.createElement('span');
                    sp_btn_vm.className = 'btn_verse_menu';
                    //sp_btn_vm.textContent = '...';
                    element.append(sp_btn_vm);

                    //cojo primer element versiculo p y su referencia la meto en colHead Ej.: => 'Mat.7:1'
                    if(index == 2){//tercer element. [h2,h4, p]
                        let ref_colHead = element.querySelector('a').innerText;
                        //alert(ref_colHead);
                        el.querySelector('.colsHeadInner .partDesk .desk_sh_link').innerText = ref_colHead;
                        el.querySelector('.colsHeadInner .partMob .mob_sh_link').innerText = ref_colHead;
                    } 
                }                
                el_colsInner.append(element); 
                element = htmlEntities(element);//test                          
            }
        }else{
            el_colsInner.innerHTML = '<p class="prim">Текущий модуль Библии не содержит стихов для выбранной книги.</p>';
        }                
        //console.log('one col --- el_colsInner: ', el_colsInner);
        //console.log('all cols --- el_colsInner: ', el_colsInner);
        if(show_comments_in_col){
            //si hay comentarios de myBible, llamo esto
            //console.log(' --- hay comentarios de myBible, llamo makeCommentsLinks() ');
            let idCol = el_colsInner.parentElement.id;
            makeCommentsLinks(idCol);
        }

    }else{//construir todas columnas
        
        //eid_wrCols es constanta y está declarada al inicio
        Array.from(eid_wrCols.children).forEach((el,i)=>{
            let el_colsInner = el.querySelector('.colsInner');
            el_colsInner.innerHTML = '';
            let show_comments_in_col = false;//por defecto

            //si hay verses en array
            if(arrData[i].length != 0){
                let trans = arr_trans[i];
                //console.log(' de columna trans: ', trans);
                //compruebo si la traducción tiene comentarios dentro en '<f>[1]</f>'
                //busco objeto de trans
                let trans_col = arrFavTransObj.find(v => v.Translation === trans);
                //console.log('trans_col: ', trans_col);
                if(trans_col.Commentaries == 'Y' ){
                    show_comments_in_col = true;
                }
                
                for (let index = 0; index < arrData[i].length; index++) {
                    let element = arrData[i][index];            
                    //console.log('añado element con append. abajo element:');
                    //console.log(element);

                    //añado boton con '...' al verse para verseMenu de comparar traducciones
                    if(element.tagName == 'P'){   
                        const sp_btn_vm = document.createElement('span');
                        sp_btn_vm.className = 'btn_verse_menu';
                        //sp_btn_vm.textContent = '...';
                        element.append(sp_btn_vm);
                    }
                    el_colsInner.append(element);
                    element = htmlEntities(element);//test            
                }
            }else{
                el_colsInner.innerHTML = '<p class="prim">Текущий модуль Библии не содержит стихов для выбранной книги.</p>';
            }                    
            //console.log('all cols --- el_colsInner: ', el_colsInner);
            if(show_comments_in_col){
                //si hay comentarios de myBible, llamo esto
                //console.log(' --- hay comentarios de myBible, llamo makeCommentsLinks() ');
                let idCol = el_colsInner.parentElement.id;
                makeCommentsLinks(idCol);
            }
        });
        //si no hay botones de verses, simulo click para cargarlos
        if(eid_v_verse.innerHTML == ''){
            eid_s_verse.click();
        }
        //si hay comentarios de myBible, llamo esto
        //console.log(' --- si hay comentarios de myBible, llamo makeCommentsLinks() ');
        //makeCommentsLinks();
    }
    //console.log('build. eid_wrCols: ', eid_wrCols);

    arrDataDivShow = [];//reset despues de build

    //hago scroll a vkladka activa
    scrollToVkladkaActive();  
    
    setTimeout(()=>{
        getFirstPVisibleAndPutInVkladka();
    },50);

    setTimeout(()=>{    
        mySizeWindow();
        mySizeVerse();
    },300);

    //cuando se pintan todos los trans permito usar showTrans()
    allowUseShowTrans = true;
    //console.log('en buildDivShow() --- allowUseShowTrans: ',allowUseShowTrans);
    addListenerToScrollLeft();//test eg_img
}


const countElementsInArray = arr => {   
    if(arr.length == 0) return 0;
    const countElements = arr.reduce(function (contador) {
        return contador + 1;
      }, 0);
    return countElements;    
}




function pushStateHome(){

    // Obtener la base URL
    let base_url = window.location.protocol + "//" + window.location.host;
    //console.log("Base URL. base_url: ", base_url);

    // Obtener la URL completa
    let full_url = base_url + window.location.pathname;
    //console.log("URL completa. full_url :", full_url);

    window.history.pushState(null, "Título de la página", full_url);
}


function pushStateToHistNav(trans,ref){

    // Obtener la base URL
    let base_url = window.location.protocol + "//" + window.location.host;
    //console.log("Base URL. base_url: ", base_url);

    // Obtener la URL completa
    let full_url = base_url + window.location.pathname;
    //console.log("URL completa. full_url :", full_url);
    
    let full_url_ref = `${full_url}?trans=${trans}&ref=${ref}`;
    //console.log("URL completa con ref. full_url_ref: ", full_url_ref);

    window.history.pushState(null, "Título de la página", full_url_ref);
}

const addRefToHistNav = async (trans, ref, book, chapter, verse = null, to_verse = null) => {
    //console.log('=== const addRefToHistNav ===');

    if(arr_hist_nav.length == 0){
        await obtenerDatosDeBD('hist_nav','arr_hist_nav');
        //console.log(arr_hist_nav);
    }

    //console.log('trans: ', trans);
    //console.log('ref: ', ref);
    
    const fechaActual = new Date();
    //const horas = fechaActual.getHours();
    //const minutos = fechaActual.getMinutes();
    //const segundos = fechaActual.getSeconds();
    //const horas_minutos = horas + ':'+minutos;

    const fechaFormateada = fechaActual.toLocaleDateString();
    //console.log("Fecha actual: " + fechaFormateada);

    const horaActual = fechaActual.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
    //console.log("Hora actual: " + horaActual);

    let esteTrans = arrFavTransObj.find(v => v.Translation === trans);

    let itemHist = { 
        'trans': trans, 
        'BibleShortName': esteTrans.BibleShortName, 
        'ref': ref,
        'BookShortName': esteTrans.Books[book].ShortNames[0],
        'book': book,
        'chapter': chapter,
        'verse': verse,
        'to_verse': to_verse,
        'fecha': fechaFormateada, 
        'hora': horaActual 
    };

    pushStateToHistNav(trans,ref);
    updateRefInTabActive(trans,ref);
    updateArrTabs();

    //meto item si es primer index o si no se repite trans y words
    if(arr_hist_nav.length == 0 || (arr_hist_nav.length > 0 && (trans != arr_hist_nav[0].trans || ref != arr_hist_nav[0].ref )) ){
        arr_hist_nav.unshift(itemHist);//añado item al principio
        //console.log('meto item. arr_hist_nav: ', arr_hist_nav);

        if(arr_hist_nav.length > arr_hist_nav_limit) {//100
            // Elimina elementos a partir del índice 100 hasta el final del array
            arr_hist_nav.splice(arr_hist_nav_limit); 
        }
        guardarEnBd('hist_nav','arr_hist_nav',arr_hist_nav);
    }else{
        //console.log('este trans y ref se repitуn. no meto item en el arr_hist_nav...');
    }
    
    buildHistoryNavDesktop();//from arr_hist_nav   

}


function buildHistoryNavDesktop(){
    eid_wr_hist_nav_inner.innerHTML = '';
    
    if(arr_hist_nav.length > 0){
        arr_hist_nav.forEach((el,i)=>{
               
            const p = document.createElement('p');
            p.className = 'p_pointer';       
            p.onclick = () => {
                onclick_p_nav(el);
            }
            p.innerHTML = `<span class="sp_trans_hist">${el.BibleShortName} <span class="sp_fecha_hist">${el.fecha}</span></span>`;
            p.innerHTML += `<span class="sp_ref_hist">${el.ref} <span class="sp_hora_hist">${el.hora}</span></span>`;
            eid_wr_hist_nav_inner.append(p);
    
        });    
    }else{
        const p = document.createElement('p');
        p.innerHTML = '<span class="prim">Нет записей в истории навигации.</span>';
        eid_wr_hist_nav_inner.append(p);
    }
}


function onclick_p_nav(el){
    
    eid_inpt_nav.dataset.trans = el.trans;
    eid_inpt_nav.dataset.book_short_name = el.BookShortName;
    eid_inpt_nav.dataset.id_book = el.book;
    eid_inpt_nav.dataset.show_chapter = el.chapter;
    eid_inpt_nav.value = el.ref;

    if(el.chapter != ''){
        eid_inpt_nav.dataset.show_chapter = el.chapter;
        obj_nav.show_chapter = el.chapter;
    }else{
        el.chapter = 1;
        eid_inpt_nav.dataset.show_chapter = el.chapter;
        obj_nav.show_chapter = el.chapter;
    }
    
    if(el.verse != null){
        eid_inpt_nav.dataset.show_verse = el.verse;
        obj_nav.show_verse = el.verse;
        eid_s_verse.click();
    }else{
        eid_inpt_nav.dataset.show_verse = '';
        obj_nav.show_verse = '';
        eid_s_verse.click();
    }

    if(el.to_verse != null){
        eid_inpt_nav.dataset.show_to_verse = el.to_verse;
        obj_nav.show_to_verse = el.to_verse;
    }else{
        eid_inpt_nav.dataset.show_to_verse = '';
        obj_nav.show_to_verse = '';
    }

    let trans_base = arrFavTransObj.find(v => v.Translation === eid_trans1.dataset.trans);
    let trans_item = arrFavTransObj.find(v => v.Translation === el.trans);

    let number_id_book,number_show_chapter;
    
    if(trans_base.EnglishPsalms == 'N' && trans_item.EnglishPsalms == 'Y'){//Пс 22 | Sal 23
        let res = convertLinkFromEspToRus(el.book, el.chapter, el.verse, el.to_verse);
        allowUseShowTrans = true;
        number_id_book = (res[0] != '') ? res[0] : 1 ;
        number_show_chapter = !([null,NaN,''].includes(res[1])) ? res[1] : 1 ;//si res no es vacio,null,NaN
        number_show_verse = !([null,NaN,''].includes(res[2])) ? res[2] : null ;//si res no es vacio,null,NaN
        //showTrans(res[0], res[1], res[2], res[3]);
        showTrans(number_id_book, number_show_chapter, number_show_verse, res[3]);
    }
    else if(trans_base.EnglishPsalms == 'Y' && trans_item.EnglishPsalms == 'N'){//Sal 23 | Пс 22
        let res = convertLinkFromRusToEsp(el.book, el.chapter, el.verse, el.to_verse);
        allowUseShowTrans = true;
        number_id_book = (res[0] != '') ? res[0] : 1 ;
        number_show_chapter = !([null,NaN,''].includes(res[1])) ? res[1] : 1 ;//si res no es vacio,null,NaN
        number_show_verse = !([null,NaN,''].includes(res[2])) ? res[2] : null ;//si res no es vacio,null,NaN
        //showTrans(res[0], res[1], res[2], res[3]);
        showTrans(number_id_book, number_show_chapter, number_show_verse, res[3]);
    }
    else{   
        //console.log('llamo showTrans()');
        allowUseShowTrans = true;
        number_id_book = (el.book != '') ? el.book : 1 ;
        number_show_chapter = !([null,NaN,''].includes(el.chapter)) ? el.chapter : 1 ;
        //showTrans(el.book, el.chapter, el.verse, el.to_verse);//antes
        showTrans(number_id_book, number_show_chapter, el.verse, el.to_verse);
    }

    //hago scroll al inicio de div, al primer index de arr_hist_nav
    eid_wr_hist_nav_inner.scrollTop = 0;

    //meto Gen.1:1 en los head de cada trans Desk y Mob
    document.querySelectorAll('.partDesk .desk_sh_link').forEach(el=>{
        putRefVisibleToHead(`00__${number_id_book}__${number_show_chapter}__1`, 0);//todos los heads de cols
    });
    document.querySelectorAll('.partMob .mob_sh_link').forEach(el=>{
        putRefVisibleToHead(`00__${number_id_book}__${number_show_chapter}__1`, 0);//todos los heads de cols
    });

    //si es mobile, ciero menu
    if(window.innerWidth < pantallaTabletMinPx){
        //console.log('func selVerse(). mobile.');
        closeSidebar();
    }    
}











const addRefToMarker = async (trans, ref, book, chapter, verse = null, to_verse = null, verseText) => {
    //console.log('=== const addRefToMarker ===');

    if(arr_markers.length == 0){
        await obtenerDatosDeBD('markers','arr_markers');
        //console.log(arr_markers);
    }

    //console.log('trans: ', trans);
    //console.log('ref: ', ref);
    
    const fechaActual = new Date();
    //const horas = fechaActual.getHours();
    //const minutos = fechaActual.getMinutes();
    //const segundos = fechaActual.getSeconds();
    //const horas_minutos = horas + ':'+minutos;

    const fechaFormateada = fechaActual.toLocaleDateString();
    //console.log("Fecha actual: " + fechaFormateada);

    const horaActual = fechaActual.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
    //console.log("Hora actual: " + horaActual);

    let esteTrans = arrFavTransObj.find(v => v.Translation === trans);

    let itemHist = { 
        'trans': trans, 
        'BibleShortName': esteTrans.BibleShortName, 
        'ref': ref,
        'BookShortName': esteTrans.Books[book].ShortNames[0],
        'book': book,
        'chapter': chapter,
        'verse': verse,
        'verseText': verseText,
        'to_verse': to_verse,
        'fecha': fechaFormateada, 
        'hora': horaActual 
    };

    //meto item si es primer index o si no se repite trans y words
    //if(arr_markers.length == 0 || (arr_markers.length > 0 && (trans != arr_markers[0].trans || ref != arr_markers[0].ref )) ){
    if(true){
        arr_markers.unshift(itemHist);//añado item al principio
        //console.log('meto item. arr_markers: ', arr_markers);

        if(arr_markers.length > arr_markers_limit) {//100
            // Elimina elementos a partir del índice 100 hasta el final del array
            arr_markers.splice(arr_markers_limit); 
        }
        guardarEnBd('markers','arr_markers',arr_markers);
    }else{
        //console.log('este trans y ref se repitуn. no meto item en el arr_hist_nav...');
    }
    
    buildMarkersDesktop();//from arr_markers 
}


function buildMarkersDesktop(){
    eid_wr_markers_inner.innerHTML = '';
    let totalMarkers = arr_markers.length;
    eid_markers_porcentaje.textContent = `${totalMarkers}/${arr_markers_limit}`;
    
    if(arr_markers.length > 0){
        arr_markers.forEach((el,i)=>{
               
            const p = document.createElement('p');
            p.className = 'p_pointer';       

            const sam_mk_head = document.createElement('span');
            sam_mk_head.className = 'sam_mk_head';
            sam_mk_head.innerHTML = `
                <span class="sp_trans_hist">
                    <span class="sp_ref">
                        <span class="sp_f">${totalMarkers - i}</span>
                        ${el.BibleShortName}
                    </span> 
                    <span class="sp_fecha_hist">${el.fecha}</span>
                </span>
                <span class="sp_ref_hist">${el.ref} <span class="sp_hora_hist">${el.hora}</span></span>
            `;
            sam_mk_head.onclick = () => {
                onclick_p_marker(el);
            }
            p.append(sam_mk_head);

            const sp_vtext = document.createElement('span');
            sp_vtext.className = 'sp_vtext';

            const sam_text = document.createElement('span');
            sam_text.className = 'sam_text';
            sam_text.innerHTML = el.verseText;
            sam_text.onclick = () => {
                onclick_p_marker(el);
            }

            sp_vtext.append(sam_text);

            const btn_verse_menu = document.createElement('span');
            btn_verse_menu.className = 'mark btn_verse_menu';
            btn_verse_menu.onclick = (e)=>{
                //console.log('llamo a hideShow3Btns()');
                hideShow3Btns(e.currentTarget);
            }
            //btn_verse_menu.innerHTML = `<span class="wr_3_btns" style="display: none;">
            //                                <span>Ver</span>
            //                                <span>Compartir</span>
            //                                <span>Eliminar</span>
            //                            </span>
            //`;

            const wr_3_btns = document.createElement('span');
            wr_3_btns.className = 'wr_3_btns';
            wr_3_btns.style.display = 'none';
            //wr_3_btns.innerHTML = ` <span>Ver</span>
            //                        <span>Compartir</span>
            //                        <span>Eliminar</span>
            //`;

            const btn_ver = document.createElement('span');
            btn_ver.className = 'btn_ver';
            btn_ver.innerHTML = 'Ver';
            btn_ver.dataset.indexMarker = i;
            btn_ver.onclick = (e) =>{
                let index = e.currentTarget.dataset.indexMarker;
                //console.log(e.currentTarget.dataset.indexMarker);
                //console.log('1. index de arr_markers. index: ',index);
                onclick_p_marker(el);
            }
            wr_3_btns.append(btn_ver);

            const btn_compartir = document.createElement('span');
            btn_compartir.className = 'btn_compartir';
            btn_compartir.innerHTML = 'Compartir';
            btn_compartir.dataset.indexMarker = i;
            btn_compartir.onclick = (e) =>{
                let index = e.currentTarget.dataset.indexMarker;
                //console.log(e.currentTarget.dataset.indexMarker);
                //console.log('2. index de arr_markers. index: ',index);
                alert('funcción en desarrollo.');
            }
            wr_3_btns.append(btn_compartir);

            const btn_eliminar = document.createElement('span');
            btn_eliminar.className = 'btn_eliminar';
            btn_eliminar.innerHTML = 'Eliminar';
            btn_eliminar.dataset.indexMarker = i;
            btn_eliminar.onclick = (e) =>{
                let index = e.currentTarget.dataset.indexMarker;
                //console.log(e.currentTarget.dataset.indexMarker);
                //console.log('3. index de arr_markers. index: ',index);
                arr_markers.splice(index, 1);//elimino elemento del array
                guardarEnBd('markers','arr_markers',arr_markers);
                buildMarkersDesktop();
                showMarkers();
            }
            wr_3_btns.append(btn_eliminar);


            const wr_both = document.createElement('span');
            wr_both.className = 'wr_both';

            p.append(sp_vtext);
            sp_vtext.append(wr_both);
            wr_both.append(btn_verse_menu);
            wr_both.append(wr_3_btns);

            //p.innerHTML += `<span class="sp_vtext">${el.verseText}
            //                    <span class="btn_verse_menu" onclick="hideShow3Btns(${p.querySelector('.btn_verse_menu')})">
            //                        <span class="wr_3_btns" style="display: none;">
            //                            <span>ver</span>
            //                            <span>compartir</span>
            //                            <span>eliminar</span>
            //                        </span>
            //                    </span>
            //                </span>`;

            eid_wr_markers_inner.append(p);
    
        });    
    }else{
        const p = document.createElement('p');
        p.innerHTML = '<span class="prim">Нет записей в закладках.</span>';
        eid_wr_markers_inner.append(p);
    }

    document.removeEventListener('click', handlerListenMarkers);
    document.addEventListener('click', handlerListenMarkers);
}

function hideShow3Btns(el){ 
    //console.log(el);
    let wr_3_btns = el.parentElement.querySelector('.wr_3_btns');

    document.querySelectorAll('.wr_3_btns').forEach(el => {
        //console.log('item el', el);
        
        if(el !== wr_3_btns){
            el.style.display = 'none';
        }
    });

    let disp = wr_3_btns.style.display;
    if(disp != 'none' || wr_3_btns.offsetWidth > 0){//si se ve
        disp = 'none';//lo oculto
    }else{
        disp = 'flex';//lo muestro
    }
    wr_3_btns.style.display = disp;
}

function close_all_wr_3_btns(){
    document.querySelectorAll('.wr_3_btns').forEach(el => {
        el.style.display = 'none';
    });
}

const handlerListenMarkers = (ev) => {
    //console.log(ev);
    //console.log(ev.target);

    let wr_3_btnsAll = document.querySelectorAll('.wr_3_btns');

    wr_3_btnsAll.forEach(function (element) {
        // Verificar si el clic no se realizó dentro de un elemento con la clase "wr_3_btns"
        if (ev.target.className !== 'mark btn_verse_menu' && ev.target.className !== 'wr_3_btns' ) {
            element.style.display = "none"; // Ocultar el elemento
        }
    });
}

function onclick_p_marker(el){
    
    eid_inpt_nav.dataset.trans = el.trans;
    eid_inpt_nav.dataset.book_short_name = el.BookShortName;
    eid_inpt_nav.dataset.id_book = el.book;
    eid_inpt_nav.dataset.show_chapter = el.chapter;
    eid_inpt_nav.value = el.ref;
    
    if(el.verse != null){
        eid_inpt_nav.dataset.show_verse = el.verse;
        eid_s_verse.click();
    }else{
        eid_inpt_nav.dataset.show_verse = '';
        eid_s_verse.click();
    }

    if(el.to_verse != null){
        eid_inpt_nav.dataset.show_to_verse = el.to_verse;
    }else{
        eid_inpt_nav.dataset.show_to_verse = '';
    }

    let trans_base = arrFavTransObj.find(v => v.Translation === eid_trans1.dataset.trans);
    let trans_item = arrFavTransObj.find(v => v.Translation === el.trans);


    let thisDiv = eid_trans1;//test
    changeModule2(thisDiv, trans_item.Translation, trans_item.BibleShortName, trans_item.EnglishPsalms);    

    /*
    //antes - falla. se cargan en vez de ['ukr_pop','rst'] => 2 ['ukr_pop','ukr_pop']
    //no llega a cargar a tiempo los datos, y un modulo lo repite 2 veces. 
    //se necesita setTimeout(); 
    if(trans_base.EnglishPsalms == 'N' && trans_item.EnglishPsalms == 'Y'){//Пс 22 | Sal 23
        let res = convertLinkFromEspToRus(el.book, el.chapter, el.verse, el.to_verse);
        allowUseShowTrans = true;
        showTrans(res[0], res[1],res[2],res[3]);
    }
    else if(trans_base.EnglishPsalms == 'Y' && trans_item.EnglishPsalms == 'N'){//Sal 23 | Пс 22
        let res = convertLinkFromRusToEsp(el.book, el.chapter, el.verse, el.to_verse);
        allowUseShowTrans = true;
        showTrans(res[0], res[1],res[2],res[3]);
    }
    else{   
        //console.log('llamo showTrans()');
        allowUseShowTrans = true;
        showTrans(el.book, el.chapter, el.verse, el.to_verse);
    }
    */
    
    
    //MODO 1. FUNCIONA!!!
    setTimeout(()=>{
        if(trans_base.EnglishPsalms == 'N' && trans_item.EnglishPsalms == 'Y'){//Пс 22 | Sal 23
            let res = convertLinkFromEspToRus(el.book, el.chapter, el.verse, el.to_verse);
            allowUseShowTrans = true;
            showTrans(res[0], res[1], res[2], res[3]);
        }
        else if(trans_base.EnglishPsalms == 'Y' && trans_item.EnglishPsalms == 'N'){//Sal 23 | Пс 22
            let res = convertLinkFromRusToEsp(el.book, el.chapter, el.verse, el.to_verse);
            allowUseShowTrans = true;
            showTrans(res[0], res[1], res[2], res[3]);
        }
        else{   
            //console.log('llamo showTrans()');
            allowUseShowTrans = true;
            showTrans(el.book, el.chapter, el.verse, el.to_verse);
        }
    },50);
       

    /*
    //MODO 2. TAMBIÉN FUNCIONA
    setTimeout(()=>{
        
        //console.log(eid_inpt_nav.dataset.trans);
        //console.log(eid_inpt_nav.value);
        //console.log('llamo a getRef(el.trans)');
        
        getRef(el.trans);
    },50);
    */    

    eid_wr_markers_inner.scrollTop = 0;//scroll al inicio de div

    //si es mobile, ciero menu
    if(window.innerWidth < pantallaTabletMinPx){
        //console.log('func selVerse(). mobile.');
        closeSidebar();
        closeModal(null,true);
    }    
}














const addWordsToHistFind = async (trans, words, count_verses, count_matches) => {
    //console.log('=== const addWordsToHistFind ===');

    if(arr_hist_find.length == 0){
        await obtenerDatosDeBD('hist_find','arr_hist_find');
        //console.log(arr_hist_find);
    }

    //console.log('trans: ', trans);
    //console.log('words: ', words);
    
    const fechaActual = new Date();
    //const horas = fechaActual.getHours();
    //const minutos = fechaActual.getMinutes();
    //const segundos = fechaActual.getSeconds();
    //const horas_minutos = horas + ':'+minutos;

    const fechaFormateada = fechaActual.toLocaleDateString();
    //console.log("Fecha actual: " + fechaFormateada);
    
    const horaActual = fechaActual.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
    //console.log("Hora actual: " + horaActual);

    let esteTrans = arrFavTransObj.find(v => v.Translation === trans);

    let itemHist = {
        'trans': trans, 
        'BibleShortName': esteTrans.BibleShortName, 
        'words': words,
        'count_verses': count_verses,
        'count_matches': count_matches,
        'params': {
            'gde_val'  : eid_gde.value, 
            'limit_val': eid_limit.value,
            'cbox1_checked': eid_cbox1.checked,
            'cbox2_checked': eid_cbox2.checked,
            'cbox3_checked': eid_cbox3.checked,
            'cbox4_checked': eid_cbox4.checked,
            'cbox5_checked': eid_cbox5.checked,
            'cbox6_checked': eid_cbox6.checked,
            'cbox7_checked': eid_cbox7.checked             
        },
        'fecha': fechaFormateada, 
        'hora': horaActual
    };

    //meto item si es primer index o si no se repite trans y words
    if(arr_hist_find.length == 0 || (arr_hist_find.length > 0 && (trans != arr_hist_find[0].trans || words != arr_hist_find[0].words )) ){
        arr_hist_find.unshift(itemHist);
        //console.log('meto item. arr_hist_find: ', arr_hist_find);
        if(arr_hist_find.length > arr_hist_find_limit) {//100
            // Elimina elementos a partir del índice 100 hasta el final del array
            arr_hist_find.splice(arr_hist_find_limit); 
        }
        guardarEnBd('hist_find','arr_hist_find',arr_hist_find);

    }else{
        //console.log('este trans y words se repitan. no meto item en el arr_hist_find...');
    }

    buildHistoryFindDesktop();
}

function buildHistoryFindDesktop(){
    
    eid_wr_hist_find_inner.innerHTML = '';

    if(arr_hist_find.length > 0){
        arr_hist_find.forEach((el,i)=>{
            
            const p = document.createElement('p');
            p.className = 'p_pointer';
            p.onclick = () => {
                onclick_p_find(el);
            }
            p.innerHTML = ` <span class="sp_trans_hist">${el.BibleShortName} 
                                <span class="wr_fecha_hora">
                                    <span class="sp_fecha_hist">Совпадений: ${el.count_matches}</span>
                                    <span class="sp_hora_hist">Стихов: ${el.count_verses}</span>
                                </span>
                            </span>`;
            p.innerHTML += `<span class="sp_words_hist">${el.words}</span>`;
            eid_wr_hist_find_inner.append(p);

        });        
    }else{
        const p = document.createElement('p');
        p.innerHTML = '<span class="prim">Нет записей в истории поиска.</span>';
        eid_wr_hist_find_inner.append(p);
    }

}


function onclick_p_find(el){
    eid_inpt_nav.dataset.trans = el.trans;
    eid_inpt_find.value = el.words;

    eid_gde.value = el.params.gde_val;
    eid_limit.value = el.params.limit_val;
    eid_cbox1.checked = el.params.cbox1_checked;
    eid_cbox2.checked = el.params.cbox2_checked;
    eid_cbox3.checked = el.params.cbox3_checked;
    eid_cbox4.checked = el.params.cbox4_checked;
    eid_cbox5.checked = el.params.cbox5_checked;
    eid_cbox6.checked = el.params.cbox6_checked;
    eid_cbox7.checked = el.params.cbox7_checked;
    
    //console.log('llamo findWords()');
    //findWords(el.words);
    eid_wr_hist_find_inner.scrollTop = 0;//scroll al inicio de div
}

const addStrongNumberToHistStrong = async (strongLang, strongIndex) => {
    //console.log('=== const addStrongNumberToHistStrong ===');
    
    if(arr_hist_strong.length == 0){
        await obtenerDatosDeBD('hist_strong','arr_hist_strong');
        //console.log(arr_hist_strong);
    }

    //console.log('trans: ', trans);
    //console.log('ref: ', ref);
    
    const fechaActual = new Date();
    //const horas = fechaActual.getHours();
    //const minutos = fechaActual.getMinutes();
    //const segundos = fechaActual.getSeconds();
    //const horas_minutos = horas + ':'+minutos;

    const fechaFormateada = fechaActual.toLocaleDateString();
    //console.log("Fecha actual: " + fechaFormateada);

    const horaActual = fechaActual.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
    //console.log("Hora actual: " + horaActual);


    let itemHist = { 
        'strongLang': toTitleCase(strongLang), 
        'strongIndex': strongIndex, 
        'fecha': fechaFormateada, 
        'hora': horaActual 
    };

    if(arr_hist_strong.length == 0 || (arr_hist_strong.length > 0 && strongIndex != arr_hist_strong[0].strongIndex) ){
        arr_hist_strong.unshift(itemHist);
        //console.log('arr_hist_strong: ', arr_hist_strong);
        if(arr_hist_strong.length > arr_hist_strong_limit) {//100
            // Elimina elementos a partir del índice 100 hasta el final del array
            arr_hist_strong.splice(arr_hist_strong_limit); 
        }
        guardarEnBd('hist_strong','arr_hist_strong',arr_hist_strong);

    }else{
        //console.log('este strongIndex es el primer index en el array. no meto item en el arr_hist_strong...');
    }
    
    buildHistoryStrongDesktop();
}

function buildHistoryStrongDesktop(){
    
    eid_wr_hist_strong_inner.innerHTML = '';

    if(arr_hist_strong.length > 0){
        arr_hist_strong.forEach((el,i)=>{
            
            const p = document.createElement('p');
            p.className = 'p_pointer';
            p.onclick = () => {
                onclick_p_strong(el);            
            }
            p.innerHTML = `<span class="sp_trans_hist">${el.strongLang} <span class="sp_fecha_hist">${el.fecha}</span></span>`;
            p.innerHTML += `<span class="sp_ref_hist">${el.strongIndex} <span class="sp_hora_hist">${el.hora}</span></span>`;
            eid_wr_hist_strong_inner.append(p);

        });    
    }else{
        const p = document.createElement('p');
        p.innerHTML = '<span class="prim">Нет записей в истории номеров Стронга.</span>';
        eid_wr_hist_strong_inner.append(p);
    }
}


function onclick_p_strong(el){

    eid_inpt_strong.value = el.strongIndex;
    //console.log('llamo getStrongNumber()...');
    getStrongNumber(el.strongIndex);

    eid_wr_hist_strong_inner.scrollTop = 0;//scroll al inicio de div
    //si es mobile, no ciero el menu ya que no hay que mostrar verse automatico
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}


function showVerseMenu(e){
    //console.log('=== function showVerseMenu(e) ===');
    //console.log(e);

    let p_id = e.srcElement.parentElement.id;
    let ref = e.srcElement.parentElement.querySelector('a').textContent;
    let arr_p_id = p_id.split('__');
    //console.log(arr_p_id);

    let trans = arr_p_id[0];
    let book = arr_p_id[1];
    let chapter = arr_p_id[2];
    let verse = arr_p_id[3];
    
    // openModal('bottom', ref, arr_p_id, 'buildVerseMenu');
    openModal('center', ref, arr_p_id, 'buildVerseMenu');
}

function scrollToVkladkaActive(){
    //console.log('=== function scrollToVkladkaActive() ===');
    //hago scroll a vkladka activa
    if(document.querySelector('.tab_active') != null){
        document.querySelector('.tab_active').scrollIntoView();
    }    
}






























































