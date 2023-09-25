//====================================================================//
//  F U N C T I O N S
//====================================================================//

getStrongNumber2('H430');

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
    
    url_strong = `modules/text/strongs/${strongFile}`;
    console.log('url_strong: '+url_strong);


    fetch(`modules/text/strongs/${strongFile}`)
    .then((response) => response.json())
    .then((strong) => {
        //console.log(strong);

        //let arr_strong = strong.split('<h4>')[numberInt + 1].split('</h4>');//una linea 
        let obj_strong = strong.find(v =>v.t === numberStr); 
        console.log('abajo obj_strong: ');
        console.log(obj_strong);



        let strongIndex = obj_strong.t;//topic
        let strongText = obj_strong.d;//definition

        console.log('strongIndex: '+strongIndex);
        console.log('strongText: '+strongText);

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
        console.log('abajo arr_w: ');
        console.log(arr_w);

        arr_w = arr_w.filter(elm => elm);

        arr_w.forEach((el,i,arr)=>{   
            
            if(el.includes('<a href=') && el.includes('</a>')){
                el = el.replaceAll(`<a href='S:`,`<S class='show strongActive' data-strong='`);
                el = el.replaceAll(`</a>`,`</S>`);
            }

            if(el.includes('<b>отсутствует</b>')){
                el = '';//no muestro lo está vacío
            }

            if(el.includes('<df>Оригинал:</df>')){
                if(arr[0].includes('<he>') && arr[0].includes('</he>')){
                    el = el.replaceAll('<b>','<he class="hel_sm">');
                    el = el.replaceAll('</b>','</he>');
                }else if(arr[0].includes('<el>') && arr[0].includes('</el>')){
                    el = el.replaceAll('<b>','<el class="hel_sm">');
                    el = el.replaceAll('</b>','</el>');
                }                
            }

            if(el.includes('<df>Словарь Дворецкого:</df>')){
                var regex = /\s(\d+)\)\s/gi;
                var resultado = el.match(regex);

                if(resultado){
                    console.log(`resultado: ${resultado} --- y resultado.length: ${resultado.length}`);
                }else{
                    console.log("No se encontró un dígito entre espacio al principio y paréntesis con espacio al final.");
                }



            }

            if(el != ''){
                el = '<span class="sn2">'+el +'</span>';            
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


var w = " " +d +") ";//entera palabra del array, no parte
var regex_w = RegExp(w, tipo);


let texto2 = "Este 1) es un ejemplo 22) sdfgsdfg 3333) sdgdfgdsf de 4) expresión 5) regular.";
const regex = /\s(\d+)\)\s/gi;
const resultado = texto2.match(regex);

if (resultado) {
  console.log(`resultado: ${resultado} --- y resultado.length: ${resultado.length}`);
} else {
  console.log("No se encontró un dígito entre espacio al principio y paréntesis con espacio al final.");
}


