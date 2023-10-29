//====================================================================//
//  F U N C T I O N S
//====================================================================//

//getStrongNumber('H430');
//setTimeout(()=>{getStrongNumber('G3056')},5000);



function getStrongNumberVersion2(numberStr, lang = null, paramfirstLetter = null){
    
    let div_strong_head = document.querySelector('#strong_head');
    let div_strong_body = document.querySelector('#strong_body');
    var numberInt, numberStrShow, strongFile;

    //si numero strong es clecked desde findWords y viene rojo... 
    if(numberStr.includes('<b class="f_red">') || numberStr.includes('</b>')){
        numberStr = numberStr.replace('<b class="f_red">','');
        numberStr = numberStr.replace('</b>','');
    }

    if(window.innerWidth < 768){//si es mobile
        openSidebar(document.querySelector('.btnMenu'));//simulo click sobre el boton hamburguesa        
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

    if(typeof obj_s == 'undefined'){
        obj_s = {};
    }

    //si existe objeto con Translation. Saco datos del objeto
    if(typeof obj_s[strongLang] != 'undefined'){
        if(obj_s[strongLang].fileName != 'undefined'){
            if(obj_s[strongLang].fileName == strongFile && obj_s[strongLang].fileContent != ''){
                //console.log(' --- typeof obj_s[strongLang] EXISTE --- saco datos del objeto guardado ');
       
                var myPromise_strong = new Promise(function(resolve, reject){
                    resolve('ok');
                });

                myPromise_strong
                .then((data) => {
                    //console.log(strong);

                    if(data == 'ok'){//siempre es ok
                        var strong = obj_s[strongLang].fileContent;
                    }
            
                    let obj_strong = strong.find(v => v.t === numberStr); 
                    //console.log('abajo obj_strong: ');
                    //console.log(obj_strong);
            
                    let strongIndex = obj_strong.t;//topic
                    let strongText = obj_strong.d;//definition
                    //console.log('strongIndex: '+strongIndex);
                    //console.log('strongText: '+strongText);
            
                    div_strong_body.innerHTML = '';//reset datos
            
                    showTab(document.querySelector('#btn_strong'),'strong');  
                    
                    const span_hist_strong = document.createElement('span');
                    span_hist_strong.className = 'hist_strong';
                    //span_hist_strong.setAttribute('onclick',"getStrongNumber('"+strongIndex+"')");
                    span_hist_strong.setAttribute('onclick',"getStrongNumber('"+numberStrShow+"')");
                    //span_hist_strong.innerHTML = strongIndex;
                    span_hist_strong.innerHTML = numberStrShow;
                    
                    let hist_strong_all = document.querySelectorAll('.hist_strong');
                    let ult_hist_strong = hist_strong_all[0];
                    if(typeof ult_hist_strong == 'undefined' && hist_strong_all.length == 0){//vacio y 1-er element
                        div_strong_head.prepend(span_hist_strong);
                        //console.log('1 strongIndex');
                    }else if(ult_hist_strong.innerHTML != numberStrShow){
                        div_strong_head.prepend(span_hist_strong);
                        //console.log('2 y mas strongIndex ...');
                    }else{
                        //console.log('no hago nada...');
                    }
            
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
            
                    arr_w = arr_w.filter(elm => elm);
            
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
                            
                            var regex = /\s(\d+)\)\s/gi;// ejemplo: ' 1) '
                            var resultado = el.match(regex);
            
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
                                console.log("No se encontró ningún dígito entre espacio al principio y paréntesis con espacio al final.");
                            }
            
                            el = '<span class="btn btn_dvor" onclick="showHideDvor()">Словарь Дворецкого: <img src="images/icon_razvernut.png"></span>' + '<span class="sn2 sn_dvor">'+el +'</span>';
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
                    var new_strongText = arr_new.join(' ');
            
                    const span_text_strong = document.createElement('span');
                    span_text_strong.className = 'text_strong';
                    span_text_strong.innerHTML = new_strongText;            
            
                    const p_v = document.createElement('p');//найти стихи с этим номером
                    p_v.className = 'p_v';
                    p_v.innerHTML = `Найти стихи с этим номером.`;
                    p_v.onclick = function(){
                        showTab(document.querySelector('#btn_find'),'find');
                        
            
                        if(paramfirstLetter != null && paramfirstLetter == 'Y'){
                            document.querySelector('#inpt_find').value = numberStrShow;
                            document.querySelector('#cbox7').checked = true;//si hace falta
                            findWords(numberStrShow);//rstStrongRed - ok
                        }else{
                            document.querySelector('#inpt_find').value = numberStr;
                            if(numberStr.includes('H') || numberStr.includes('G')){//rstStrongRed
                                document.querySelector('#cbox7').checked = true;//si hace falta
                                findWords(numberStr);
                            }else{//rstStrong (старый)
                                document.querySelector('#cbox4').checked = true;//si hace falta
                                document.querySelector('#cbox7').checked = false;//si hace falta
                                findWords(numberStr);//rstStrong
                            }
                        }
                        //findWords(strongIndex);//rstStrong - ok
                        //findWords(numberStr);
                    }
                    div_strong_body.append(p_v);
            
                    const p = document.createElement('p');
                    p.append(span_num_strong);
                    p.append(span_text_strong);
            
                    div_strong_body.append(p);
            
                    //Listener para Strong Heb
                    if(typeof new_strongText !== 'undefined' && new_strongText.includes('sn2_s')){
                        document.querySelectorAll('.a_sn').forEach(el=>{                 
                            el.addEventListener('click', function(){ 
                                getStrongNumber(el.innerHTML);
                            });    
                        });
                    }
                    mySizeStrong();//altura de div_strong_body despues de meter div_strong_head
                })
                .catch(error => { 
                    // Código a realizar cuando se rechaza la promesa
                    console.log('error promesa strong2: '+error);
                });        
        
            }else{
                console.log('No coincide el nombre del fichero o fileContent está vacío');
            }
        } 
    }

    if(typeof obj_s[strongLang] == 'undefined'){
        //console.log(' --- typeof obj_s[strongLang] == undefined --- hago fetch() ');
        
        fetch(`modules/text/strongs/${strongFile}`)
        .then((response) => response.json())
        .then((strong) => {
            //console.log(strong);

            //añado info al objeto con los datos obtenidos por fetch()
            obj_s[strongLang] = {'fileName': strongFile, 'fileContent': strong};
            //console.log('abajo obj_o:');
            //console.log(obj_o);
    
            //let arr_strong = strong.split('<h4>')[numberInt + 1].split('</h4>');//una linea 
            let obj_strong = strong.find(v => v.t === numberStr); 
            //console.log('abajo obj_strong: ');
            //console.log(obj_strong);
    
            let strongIndex = obj_strong.t;//topic
            let strongText = obj_strong.d;//definition
            //console.log('strongIndex: '+strongIndex);
            //console.log('strongText: '+strongText);
    
            div_strong_body.innerHTML = '';//reset datos
    
            showTab(document.querySelector('#btn_strong'),'strong');  
            
            const span_hist_strong = document.createElement('span');
            span_hist_strong.className = 'hist_strong';
            //span_hist_strong.setAttribute('onclick',"getStrongNumber('"+strongIndex+"')");
            span_hist_strong.setAttribute('onclick',"getStrongNumber('"+numberStrShow+"')");
            //span_hist_strong.innerHTML = strongIndex;
            span_hist_strong.innerHTML = numberStrShow;
            
            let hist_strong_all = document.querySelectorAll('.hist_strong');
            let ult_hist_strong = hist_strong_all[0];
            if(typeof ult_hist_strong == 'undefined' && hist_strong_all.length == 0){//vacio y 1-er element
                div_strong_head.prepend(span_hist_strong);
                //console.log('1 strongIndex');
            }else if(ult_hist_strong.innerHTML != numberStrShow){
                div_strong_head.prepend(span_hist_strong);
                //console.log('2 y mas strongIndex ...');
            }else{
                //console.log('no hago nada...');
            }
    
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
    
            arr_w = arr_w.filter(elm => elm);
    
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
                    
                    var regex = /\s(\d+)\)\s/gi;// ejemplo: ' 1) '
                    var resultado = el.match(regex);
    
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
                        console.log("No se encontró ningún dígito entre espacio al principio y paréntesis con espacio al final.");
                    }
    
                    el = '<span class="btn btn_dvor" onclick="showHideDvor()">Словарь Дворецкого: <img src="images/icon_razvernut.png"></span>' + '<span class="sn2 sn_dvor">'+el +'</span>';
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
            var new_strongText = arr_new.join(' ');

            const span_text_strong = document.createElement('span');
            span_text_strong.className = 'text_strong';
            span_text_strong.innerHTML = new_strongText;            
    
            const p_v = document.createElement('p');//найти стихи с этим номером
            p_v.className = 'p_v';
            p_v.innerHTML = `Найти стихи с этим номером.`;
            p_v.onclick = function(){
                showTab(document.querySelector('#btn_find'),'find');
                
    
                if(paramfirstLetter != null && paramfirstLetter == 'Y'){
                    document.querySelector('#inpt_find').value = numberStrShow;
                    document.querySelector('#cbox7').checked = true;//si hace falta
                    findWords(numberStrShow);//rstStrongRed - ok
                }else{
                    document.querySelector('#inpt_find').value = numberStr;
                    if(numberStr.includes('H') || numberStr.includes('G')){//rstStrongRed
                        document.querySelector('#cbox7').checked = true;//si hace falta
                        findWords(numberStr);
                    }else{//rstStrong (старый)
                        document.querySelector('#cbox4').checked = true;//si hace falta
                        document.querySelector('#cbox7').checked = false;//si hace falta
                        findWords(numberStr);//rstStrong
                    }
                }
                //findWords(strongIndex);//rstStrong - ok
                //findWords(numberStr);
            }
            div_strong_body.append(p_v);
    
            const p = document.createElement('p');
            p.append(span_num_strong);
            p.append(span_text_strong);
    
            div_strong_body.append(p);
    
            //Listener para Strong Heb
            if(typeof new_strongText !== 'undefined' && new_strongText.includes('sn2_s')){
                document.querySelectorAll('.a_sn').forEach(el=>{                 
                    el.addEventListener('click', function(){ 
                        getStrongNumber(el.innerHTML);
                    });    
                });
            }
            mySizeStrong();//altura de div_strong_body despues de meter div_strong_head
        })
        .catch(error => { 
            // Código a realizar cuando se rechaza la promesa
            console.log('error promesa strong2: '+error);
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
    tsk_body.innerHTML = '';//reset 
    //console.log(arr_tsk_p);
    arr_tsk_p_filtered = arr_tsk_p.filter(elm => elm);

    if(arr_tsk_p_filtered.length == 0) return;

    arr_tsk_p_filtered.forEach(el=>{
        //console.log('build tsk. abajo el: ');
        //console.log(el);
        tsk_body.append(el);
    });
    tsk_body.scrollTop = 0;

    //Después de formar todos los links de tsk añado listener on click//No funciona correctamente!
    
    tsk_body.removeEventListener('click', handlerListenTsk);
    tsk_body.addEventListener('click', handlerListenTsk);
    

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


const buildDivShow = (arrData, indexColToBuild = null) => {
    //console.log('function buildDivShow');
    //console.log('arrData: ', arrData);

    //si solo hay que construir una columna
    if(indexColToBuild != null){
        let el = Array.from(wrCols.children)[indexColToBuild];//wrCols es constanta y está declarada al inicio

        let el_colsInner = el.querySelector('.colsInner');
        el_colsInner.innerHTML = '';

        for (let index = 0; index < arrData[indexColToBuild].length; index++) {
            const element = arrData[indexColToBuild][index];            
            //console.log('añado element con append. abajo element:');
            //console.log(element);
            el_colsInner.append(element);            
        }        
        //console.log('one col --- el_colsInner: ', el_colsInner);

    }else{//construir todas columnas
        //wrCols es constanta y está declarada al inicio
        Array.from(wrCols.children).forEach((el,i)=>{
            let el_colsInner = el.querySelector('.colsInner');
            el_colsInner.innerHTML = '';

            for (let index = 0; index < arrData[i].length; index++) {
                const element = arrData[i][index];            
                //console.log('añado element con append. abajo element:');
                //console.log(element);
                el_colsInner.append(element);            
            }        
            //console.log('all cols --- el_colsInner: ', el_colsInner);
        });
    }
    //console.log('build. wrCols: ', wrCols);

    arrDataDivShow = [];//reset despues de build
}


const countElementsInArray = arr => {   
    if(arr.length == 0) return 0;
    const countElements = arr.reduce(function (contador) {
        return contador + 1;
      }, 0);
    return countElements;    
}















































////////////////////////////////////////////////////////////////////////////////////////////////////////////
// start test
////////////////////////////////////////////////////////////////////////////////////////////////////////////


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
//ejecutar0('./modules/text/nrt/bibleqt.json');//'./modules/text/nrt/bibleqt.json'
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// end test
////////////////////////////////////////////////////////////////////////////////////////////////////////////















