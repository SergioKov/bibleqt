//====================================================================//
//  F U N C T I O N S
//====================================================================//

getStrongNumber2('H430');
setTimeout(()=>{getStrongNumber2('G3056')},5000);

function getStrongNumber2(numberStr, lang = null, paramfirstLetter = null){
    
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
    }else{//00776 
        numberInt = parseInt(numberStr); 
        if(lang == 'Grk'){
            numberStrShow = 'G'+numberInt;
            strongFile = 'greek_short.json';
        }else{
            numberStrShow = 'H'+numberInt;
            strongFile = 'hebrew_short.json';
        }
    }
    //console.log('numberInt: '+numberInt);
    //console.log('numberStrShow: '+numberStrShow);
    //console.log('strongFile: '+strongFile);  
    
    //if(typeof numberStr == 'undefined' || numberStr == null) return false;
    //var strongFile = 'hebrew_short.json';
    
    let url_strong = `modules/text/strongs/${strongFile}`;
    //console.log('url_strong: '+url_strong);


    fetch(`modules/text/strongs/${strongFile}`)
    .then((response) => response.json())
    .then((strong) => {
        //console.log(strong);

        //let arr_strong = strong.split('<h4>')[numberInt + 1].split('</h4>');//una linea 
        let obj_strong = strong.find(v =>v.t === numberStr); 
        //console.log('abajo obj_strong: ');
        //console.log(obj_strong);

        let strongIndex = obj_strong.t;//topic
        let strongText = obj_strong.d;//definition

        //console.log('strongIndex: '+strongIndex);
        //console.log('strongText: '+strongText);

        //strong_head.innerHTML = strongIndex;
        //strong_body.innerHTML = strongText;

        div_strong_body.innerHTML = '';//reset datos

        showTab(document.querySelector('#btn_strong'),'strong');  
        
        const span_hist_strong = document.createElement('span');
        span_hist_strong.className = 'hist_strong';
        //span_hist_strong.setAttribute('onclick',"getStrongNumber('"+strongIndex+"')");
        span_hist_strong.setAttribute('onclick',"getStrongNumber2('"+numberStrShow+"')");
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
        span_num_strong.innerHTML = numberStrShow+' <span class="f_r">'+strongIndex+'</span>';

        let arr_w = strongText.split('<br/>');
        let arr_new = [];
        //console.log('abajo arr_w: ');
        //console.log(arr_w);

        arr_w = arr_w.filter(elm => elm);

        arr_w.forEach((el,i,arr)=>{   
            
            //Links
            if(el.includes('<a href=') && el.includes('</a>')){
                el = el.replaceAll(`<a href='S:`,`<S class='show strongActive' data-strong='`);
                el = el.replaceAll(`</a>`,`</S>`);
            }
            
            //
            if( (el.includes('<he>') && el.includes('</he>')) || (el.includes('<el>') && el.includes('</el>'))){
                el = '<span class="sn2 sn_w_trad">'+el +'</span>';
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
            }

            //Транслитерация:
            if(el.includes('<df>Транслитерация:</df>') ){
                if(el.includes('<b>отсутствует</b>')){
                    el = '';//no muestro lo que está vacio vacío
                }else{
                    el = '<span class="sn2 sn_translit">'+el +'</span>';
                }                
            }

            //Произношение:
            if(el.includes('<df>Произношение:</df>') ){
                el = '<span class="sn2 sn_proizn">'+el +'</span>';
            }

            //Часть речи:
            if(el.includes('<df>Часть речи:</df>') ){
                el = '<span class="sn2 sn_chast_r">'+el +'</span>';
            }

            //Этимология:
            if(el.includes('<df>Этимология:</df>') ){
                el = '<span class="sn2 sn_etim">'+el +'</span>';
            }

            //Синонимы:
            if(el.includes('<df>Синонимы:</df>')){
                el = '<span class="sn2 sn_syn">'+el +'</span>';
            }

            //Словарь Дворецкого:
            if(el.includes('<df>Словарь Дворецкого:</df>')){
                el = el.replace('<df>Словарь Дворецкого:</df>','');//quito esta palabra ya que la añado luego en botón
                
                var regex = /\s(\d+)\)\s/gi;
                var resultado = el.match(regex);

                if(resultado){
                    //console.log('abajo resultado:');
                    //console.log(resultado);
                    //console.log(`resultado.length: ${resultado.length}`);
                    for (let index = 0; index < resultado.length; index++) {
                        const element = resultado[index];
                        //console.log('antes el: '+el);
    
                        if(index == 0){
                            el = '<span class="dvor_block" style="display:none;">' + el;
                        }
                        
                        el = el.replace(element, ' <br> ' +element);
                        //console.log('despues el: '+el);
    
                        if(index == resultado.length - 1){
                            el = el + '</span>';
                        }                    
                    }
                
                }else{
                    console.log("No se encontró ningún dígito entre espacio al principio y paréntesis con espacio al final.");
                }

                el = '<span class="btn btn_dvor" onclick="showHideDvor()">Словарь Дворецкого: <img src="images/icon_razvernut.png"></span>' + '<span class="sn2 sn_dvor">'+el +'</span>';
            }
            
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
        if(typeof new_strongText !== 'undefined' && new_strongText.includes('sp_strong Heb')){
            document.querySelectorAll('.sp_strong.Heb').forEach(el=>{ 
                el.addEventListener('click', function(){ 
                    getStrongNumber(el.innerHTML, 'Heb');
                });    
            });
        }
        //Listener para Strong Grk
        if(typeof new_strongText !== 'undefined' && new_strongText.includes('sp_strong Grk')){
            document.querySelectorAll('.sp_strong.Grk').forEach(el=>{ 
                el.addEventListener('click', function(){ 
                    getStrongNumber(el.innerHTML, 'Grk');
                });    
            });
        }
        mySizeStrong();//altura de div_strong_body despues de meter div_strong_head
    })
    .catch(error => { 
        // Código a realizar cuando se rechaza la promesa
        //console.log('error promesa strong: '+error);
    });

}




function showHideDvor(){
    let dvor_block = document.querySelector('.dvor_block');
    let btn_dvor_img = document.querySelector('.btn_dvor img');
    if(dvor_block.style.display == 'none'){
        dvor_block.style.display = 'block';
        btn_dvor_img.classList.add('razv');
    }else{
        dvor_block.style.display = 'none';
        btn_dvor_img.classList.remove('razv');
    }
}







////////////////////////////////////////////////////////////////////////////////////////////////////////////
// test
////////////////////////////////////////////////////////////////////////////////////////////////////////////


/*
var a = [];
for (let index = 3251; index < 3304; index++) {
    const el = index;
    a.push(`<h4>${index}</h4>\n\r\ --- `);   
}
//console.log(a);
*/




