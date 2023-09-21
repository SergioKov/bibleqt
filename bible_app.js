//====================================================================//
//  J A V A S C R I P T
//====================================================================//
const obj_ep = {
    //ruso
    'rstStrongRed': 'N',
    'rstStrong': 'N',
    'rstt': 'N',
    'rsti2': 'N',
    'rstm': 'N',
    'nrt': 'N',
    'rstStrong_rv60': 'N',
    'opnz': 'N',

    //ukr
    'ukr_fil': 'N',
    'ukr_ogi': 'N',
    'ukr_hom': 'Y',
    'ukr_gyz': 'N',
    'ukr_tur': 'N',
    'ukr_der': 'Y',

    //esp
    'rv60': 'Y',
    'lbla': 'Y',
    
    //eng
    'kjv': 'Y',
    'nkjv': 'Y',
}  

const arrFavTransObj = makeTransObj();
console.log('abajo arrFavTransObj:');
console.log(arrFavTransObj);
mostrarTamanioObjeto(arrFavTransObj);

const arrFavTskObj = makeTskObj();
//console.log('abajo arrFavTskObj:');
//console.log(arrFavTskObj);

var positionShow = 'col';//por defecto posicion de columnas
//mySizeVerse();

window.obj_nav = {
    divtrans: '',
    trans: '',
    id_book: '',
    show_book: '',
    id_chapter: '',
    show_chapter: '',
    id_verse: '',
    show_verse: '',
    show_to_verse: ''
} 

//objeto de ficheros
const obj_o = {};

var arrTabs = [];//array de objetos de tabs (Vkladki)


// Definición de la clase Persona
class Translation {
    constructor(trans, Books) {
        this.trans = trans;
        this.Books = Books; 
    }
}





document.addEventListener("DOMContentLoaded", function(event) { 
    //do work
    //console.log('DOMContentLoaded');
    //addListenerToPA();//listen links p > a //no hace falta ya que todavía no hay p a

    //addTrans();
    //addTrans();

    setTimeout(() => {
        autoWidthShortBook();//por defecto calculo width para ShortBook
    }, 500);

});

//listen links p > a
function addListenerToPA(){
    setTimeout(()=>{
        //console.log('=== function addListenerToPA()');

        Array.from(document.querySelectorAll('.colsInner p a')).forEach(el=>{
            el.addEventListener('click',getTsk);
        });
    },1000);  
}

//listen links p > a en Tsk block
function addListenerToPATsk(){
    setTimeout(()=>{
        //console.log('=== function addListenerToPATsk()');
        var trans = document.querySelector('#tsk_head p').getAttribute('data-trans'); 

        Array.from(document.querySelectorAll('#vklad_tsk p a')).forEach(el=>{
            el.addEventListener('click',()=>{
                goToLink(trans, el.innerHTML);
            });
        });
    },1000);  
}


function obtenerTamanioObjeto(objeto) {
    const objetoEnJSON = JSON.stringify(objeto);
    const tamanioEnBytes = new TextEncoder().encode(objetoEnJSON).length;
    return tamanioEnBytes;
}

function mostrarTamanioObjeto(objeto){
    const tamanio = obtenerTamanioObjeto(objeto);
    //console.log(`El tamaño del objeto es: ${tamanio} bytes.`);
}


function showTooltip(el){
    //console.log(el);
    //console.log(el.getAttribute('data-tooltip'));
    if(el.children[0] != null){
        el.children[0].remove();
    }
    
    /* modo 1 - ok
    const this_ttt = document.createElement('span');
    this_ttt.className = 'tooltiptext';
    this_ttt.innerHTML = '<span class="trik"></span><span class="text">'+ el.getAttribute('data-tooltip') +'</span>';
    el.append(this_ttt);
    */
    
    //modo 2 - ok (mas entendible)
    let this_ttt_html = `<span class="tooltiptext">
                            <span class="trik"></span>
                            <span class="text">${el.getAttribute('data-tooltip')}</span>
                        </span>`;
    el.innerHTML += this_ttt_html;
    

    let elPosTop = el.getBoundingClientRect().top;
    let elPosLeft = el.getBoundingClientRect().left;
    let elH = el.offsetHeight;//altura de *
    let elW = el.offsetWidth;//anchura de *
    let ttH = el.children[0].offsetHeight;//altura de tooltip
    let ttW = el.children[0].offsetWidth;//anchura de tooltip

    //tooltip (cuerpo)
    el.children[0].style.position = 'fixed';
    el.children[0].style.top = elPosTop + elH + 'px';
    //el.children[0].style.left = elPosLeft + (elW / 2) + 'px';//antes con margin-left: -65px
    el.children[0].style.left = elPosLeft - ttW/2 + elW/2+ 'px';
    
    //trikutnyk
    el.children[0].children[0].style.position = 'fixed';
    el.children[0].children[0].style.top = elPosTop + elH - 5 + 'px';
    el.children[0].children[0].style.left = elPosLeft + 'px';

    if(elPosLeft < ttW/2){
        el.children[0].style.left = elPosLeft - elW/2 + 'px';
    }else{
        if(document.documentElement.offsetWidth - elPosLeft < ttW){
            el.children[0].style.left = document.documentElement.offsetWidth - ttW+ 'px';
        }else{
            el.children[0].style.left = elPosLeft - ttW/2 + elW/2+ 'px';
        }
    }
}

function hideTooltip(el){
    if(el.children[0] != null){
        el.children[0].remove();
    }
}


// Quitar height de los 'p'
//document.querySelectorAll('.colsInner p').forEach(el=>{  el.style.removeProperty('height');  })


function initScroll(){
    document.querySelectorAll('.colsInner').forEach( (el,i) => {
        el.onmouseover = function(){
            //console.log('over i: '+i);
            enableScroll(el,i);
        }
        el.ontouchmove = function(){//mobile
            //console.log('over i: '+i);
            enableScroll(el,i);
        }
    });    
}


function enableScroll(el,i){
    el.onscroll = () => {
        fnScrollCol(el,i);
    }
    el.ontouchmove = () => {
        fnScrollCol(el,i);
    }
    document.querySelectorAll('.colsInner').forEach( (elem,index) => {
        if(index != i){
            //elem.removeEventListener('scroll', fnScrollCol);//NO FUNCIONA
            elem.onscroll = function(){
                //console.log('lalala');
            };
        }
    });
}


function getArrSumLineH(){
    //console.log('getArrSumLineH()');

    window.arr2_sum_line_h = [];
    window.arr1_line_h = [];
    var colsInnerAll = document.querySelectorAll('.colsInner');

    colsInnerAll.forEach(function(el,index){

        colsInnerAll.forEach(e => {
            Array.from(e.children).forEach(e => {
                e.style.removeProperty('height');
            });
        });

        let colsInnerAll_ch = document.querySelectorAll('.colsInner')[index].children;
        var arr_sum_p_h2 = [];
        var arr_p_h2 = [];
        var sum_p_h = 0;

        Array.from(colsInnerAll_ch).forEach(function(el2, index2, arr2){
            sum_p_h += arr2[index2].offsetHeight;
            //console.log('sum_p_h: '+sum_p_h);

            let p_h2 = arr2[index2].offsetHeight;         
            arr_p_h2.push(p_h2);
            arr_sum_p_h2.push(sum_p_h);
        });
        arr2_sum_line_h.push(arr_sum_p_h2);
        arr1_line_h.push(arr_p_h2);

        //console.log('getArrSumLineH() --- abajo arr2_sum_line_h: ');
        //console.log(arr2_sum_line_h); 

        //console.log('getArrSumLineH() --- abajo arr1_line_h: ');
        //console.log(arr1_line_h);    
    });



    //nuevo array
    window.arr2_line_h = [];       
    var colsInnerAll = document.querySelectorAll('.colsInner');

    colsInnerAll.forEach(e => {
        Array.from(e.children).forEach(e => {
            e.style.removeProperty('height');
        });
    });

    for(var p = 0; p < colsInnerAll[0].children.length; p++){
        //console.log(p);

        let max_h = 0;
        var arr2_line_h2 = [];
        
        for(var c = 0; c < colsInnerAll.length; c++){
            
            let act_h = (typeof arr_h[c][p] !== 'undefined') ? arr_h[c][p] : 0 ;            
            arr2_line_h2.push(act_h);
            //console.log('act_h: '+act_h);

            //document.querySelectorAll('.colsInner')[c].querySelectorAll('p')[p].style.height = max_h + 'px';
            if(typeof document.querySelectorAll('.colsInner')[c].children[p] !== 'undefined'){
                let este_cont = document.querySelectorAll('.colsInner')[c].children[p].innerHTML; 
                //console.log('colsInner['+c+'] children['+p+'] este_cont: '+este_cont);

                if(['span','b','i','strong'].includes(document.querySelectorAll('.colsInner')[c].children[p].localName) ){
                    document.querySelectorAll('.colsInner')[c].children[p].style.display = 'block';
                }
            }
        }
        arr2_line_h.push(arr2_line_h2);
        //console.log('abajo arr2_line_h');
        //console.log(arr2_line_h);
        
        
        max_h = Math.max(...arr2_line_h2);
        //console.log('pongo max_h: '+max_h);
        
        //para cada versiculo 'p' de cada columpa 'ch' pongo la misma altura 'max_h' si es positionShow 'col'
        if(positionShow == 'col'){
            for(var ch = 0; ch < colsInnerAll.length; ch++){
                if(typeof document.querySelectorAll('.colsInner')[ch].children[p] !== 'undefined'){
                    document.querySelectorAll('.colsInner')[ch].children[p].style.height = max_h + 'px';
                }
            }
        }        
    }

}


function fnScrollCol(el,i){
   
    //console.log('scrolling: '+ i);
    //console.log('abajo arr2_sum_line_h: ');
    //console.log(arr2_sum_line_h);

    let h = el.scrollTop;
    //let h = el.currentTarget.scrollTop;
    //console.log('*** i :'+i+' --- h:',h);

    //VERTICAL
    if(positionShow == 'col'){
        Array.from(document.querySelectorAll('.colsInner')).forEach( (elementCol, indexCol, arrCol) => {
            if(el.parentElement.id != arrCol[indexCol].parentElement.id){
                arrCol[indexCol].scrollTop = h;
                //console.log('otros --- arr['+i+'] h: '+h);
            }
        });
    }

    //HORIZONTAL
    if(positionShow == 'row'){
        
        //getArrSumLineH();
    
        //iv -> index de versiculo.
        //arr2_sum_line_h[0] -> versiculos de la primera columna: col1
        for (let iv = 0; iv < arr2_sum_line_h[i].length; iv++) {
            let h_min, h_max;
    
            if(iv == 0){
                h_min = 0;
                h_max = arr2_sum_line_h[i][iv];
            }else{
                h_min =  arr2_sum_line_h[i][iv - 1];
                h_max =  arr2_sum_line_h[i][iv];
            }
    
            //saco el coeficient de scroll para aplicar para otras columnas. //0.75
            let h_rest = h_max - h;
            var coef_h = (arr2_line_h[iv][i] - h_rest) / arr2_line_h[iv][i] ;// verse2. (54 - 18) / 54 = 36/54 = 2/3 = 0.67;  
            //console.log('coef_h: '+coef_h);
    
            if(h >= h_min && h <= h_max){
                //console.log('iv (' +iv+'). scroll ('+h+') está entre h_min ('+h_min+') y h_max ('+h_max+') ');
                
                var colsInnerAll = document.querySelectorAll('.colsInner');
                //ic -> index de columna colsInner.
                //colsInnerAll.length -> numero de columnas: col1,col2,col3 = 3
                for (let ic = 0; ic < colsInnerAll.length; ic++) {
                    
                    if(true /*colsInnerAll[ic].parentElement.id != 'col1'*/){
                        let new_h;
                        let h_prew = (iv > 0) ? arr2_sum_line_h[ic][iv-1] : 0 ;
                        //console.log('h_prew: '+h_prew);
    
                        new_h = h_prew + arr2_line_h[iv][ic] * coef_h;//208 + (76 * 0.75) = 208 + 57 = 235
                        //console.log('new_h ('+new_h+') = '+h_prew+' + '+arr2_line_h[iv][ic]+' * '+coef_h);
                        //console.log('new_h: '+new_h);
    
                        colsInnerAll[ic].scrollTop = new_h;
                        //console.log('div ('+ colsInnerAll[ic].parentElement.id+ '). scroll: '+ colsInnerAll[ic].scrollTop);
                    }
                }
                            
            }else{
                //console.log('iv (' +iv+'). --- scroll ('+h+') no está entre h_min ('+h_min+') y h_max ('+h_max+'). no hago nada... ');
            }           
        }
    
    }//end HORIZONTAL

}//end fnScrollCol

/*
//IMPORTANTE!!!
document.querySelector('#rstStrong_b1_c3_v9').scrollIntoView(); 
document.querySelector('#rsti2_b1_c3_v9').scrollIntoView(); 
document.querySelector('#rstStrong_b1_c3_v9a').scrollIntoView(); 
document.documentElement.scrollTop = 0;
*/

function scrollToVerse(verseNumber, to_verseNumber = null, userBlock = 'start'/*antes center*/){
    //let arr = idVerse.split('/');
    //let verseNumber = arr[2];

    //padding-bottom to scroll the lastest verse
    /*
    document.querySelectorAll('.colsInner').forEach(el => {
        el.lastChild.style.marginBottom = document.querySelector('#wrCols').offsetHeight + 'px';
    });
    */
    
    document.querySelectorAll('.active').forEach(el => {
        el.classList.remove('active');
        el.classList.remove('active_first');
        el.classList.remove('active_middle');
        el.classList.remove('active_last');
    });
    document.querySelectorAll('.active_one').forEach(el => {
        el.classList.remove('active_one');
    });


    //styles of other verses
    if(to_verseNumber != null && to_verseNumber != ''){//hay otros verses
        if(parseInt(verseNumber) < parseInt(to_verseNumber)){
         for (let i = parseInt(verseNumber); i <= parseInt(to_verseNumber); i++) {
             Array.from(document.querySelectorAll('[data-verse="'+i+'"]')).forEach(el=>{
                el.classList.add('active');
                if(i == parseInt(verseNumber)) {
                     el.classList.add('active_first');                
                }else if(i == parseInt(to_verseNumber)) {
                    el.classList.add('active_last');                
                }else{
                    el.classList.add('active_middle');                
                }
             });
         }
        } 
    }else{
        //only one verse of each translation
        document.querySelectorAll('[data-verse="'+verseNumber+'"]').forEach(el=>{
            el.classList.add('active_one');
        });
    }

    //scroll to first verse
    setTimeout(()=>{
        document.querySelectorAll('[data-verse="'+verseNumber+'"]').forEach(el=>{
            el.scrollIntoView({
                //behavior: "smooth",
                block: userBlock,//start,center,end
                inline: "nearest"
            });
            document.documentElement.scrollTop = 0; 
        });
    },300);

}

function scrollToVerseView(verseView, userBlock = 'start'){   
    //scroll to verseView
    setTimeout(()=>{
        document.querySelectorAll('[data-verse="'+verseView+'"]').forEach(el=>{
            el.scrollIntoView({
                //behavior: "smooth",
                block: userBlock,//start,center,end
                inline: "nearest"
            });
            document.documentElement.scrollTop = 0; 
        });
    },300);
}



function autoWidthShortBook(){
    let sidebar = document.querySelector('#sidebar');
    let s_wx = sidebar.offsetWidth;
    //console.log('autoWidthShortBook()');
    
    //Si es Tablet o Desktop
    if(window.innerWidth >= 768){       
        let book_w, chv_w;

        //width of book
        if(s_wx >= 351){
            book_w = '20%';
        }else if(s_wx >= 271 && s_wx <= 350){
            book_w = '25%';
        }else if(s_wx >= 201 && s_wx <= 270){
            book_w = '33.33%';
        }else if(s_wx <= 200){
            book_w = '50%';
        }

        //width of chapters and verses
        if(s_wx >= 501){
            chv_w = '10%';
        }else if(s_wx >= 421 && s_wx <= 500){
            chv_w = '11.11%';
        }else if(s_wx >= 361 && s_wx <= 420){
            chv_w = '12.5%';
        }else if(s_wx >= 301 && s_wx <= 360){
            chv_w = '14.28%';
        }else if(s_wx >= 241 && s_wx <= 300){
            chv_w = '16.66%';
        }else if(s_wx <= 240){
            chv_w = '20%';
        }


        const cssRule = `
            #v_book .v_li {
                width: ${book_w};
            }        
            #v_chapter .v_li, 
            #v_verse .v_li { 
                width: ${chv_w};
            }
            `;

        if (document.querySelector('#myStyle') == null) {
            // Create a <style> element and add the CSS rule
            const styleElement = document.createElement('style');
            styleElement.id = 'myStyle';
            styleElement.innerHTML = cssRule;

            // Append the <style> element to the document's head
            document.head.appendChild(styleElement);
        }else{
            document.querySelector('#myStyle').innerHTML = cssRule;
        }
        

    }
}

var wrapper = document.getElementById('wrapper');
var v_line = document.getElementById('v_line');
var sidebar = document.querySelector('#sidebar');
var isMouseDown = false;

//start - Desktop (mouse)
v_line.onmousedown = function() { isMouseDown = true  };
wrapper.onmousemove = function(e) { 
    if(isMouseDown) { 
        /* do drag things */ 
        //document.querySelector('#headerSidebar').style.width = e.pageX - 3 + 'px';//lo comento por ahora ya que elimino sidebarHeader desde header
        sidebar.removeAttribute('class');
        sidebar.style.width = e.pageX - 3 + 'px';

        autoWidthShortBook();
    }
};
v_line.onmouseup = function() { 
    isMouseDown = false;
    mySizeWindow();
    mySizeVerse();
};
//end - Desktop


//start - Mobile (touch)
v_line.ontouchstart = function() { isMouseDown = true  };
wrapper.ontouchmove = function(e) { 
    if(isMouseDown) { 
        /* do drag things */ 
        //document.querySelector('#headerSidebar').style.width = e.pageX - 3 + 'px';//lo comento por ahora ya que elimino sidebarHeader desde header
        sidebar.removeAttribute('class');
        sidebar.style.width = e.touches[0].pageX - 3 + 'px';
        console.log('wrapper.ontouchmove');
        autoWidthShortBook();
    }
};
v_line.ontouchend = function() { 
    isMouseDown = false;
    mySizeWindow();
    mySizeVerse();
};
//end - Mobile

function getShortBookName(){
    //code...
}


function addListenStrong(el){
    //alert(el.innerHTML);
    let lang;
    if(el.parentElement.id.split('__')[1] >= 39){//de Mateo 
        lang = 'Grk';
    }else{
        lang = 'Heb';
    }
    //console.log('lang: '+lang);

    getStrongNumber(el.innerHTML, lang);
}

//number dentro de <S>H3615</S>
function addListenStrongS(el){
    getStrongNumber(el.innerHTML);
}

function showHideStrongNumbers(){
    let strongAll = document.querySelectorAll('.strong, p S');
    let btnStrong = document.querySelector('#btnStrong');
    let strongAction = null;

    if(strongAll.length != 0){

        if(strongAll[0].classList.contains('show')){
            strongAction = 'hide';
            btnStrong.classList.remove('btn_active');
        }else{
            strongAction = 'show';
            btnStrong.classList.add('btn_active');
        }

        strongAll.forEach(el=>{
            if(strongAction == 'hide'){
                el.classList.remove('show','strongActive');
            }else{
                el.classList.add('show','strongActive');
            }
        });

        let strongAllActive = document.querySelectorAll('.strongActive');

        strongAllActive.forEach(el=>{
            if(strongAction == 'hide'){
                el.removeEventListener('click', addListenStrong);
            }else{
                el.addEventListener('click', ()=>{
                    addListenStrong(el);
                });
            }
        });

        mySizeVerse();
        mySizeWindow();

        var arr_verse_active = [];
        
        Array.from(document.querySelectorAll('.colsInner')[0].children).forEach(el=>{
            //console.log(el);
            if(el.classList.contains('active')){
                arr_verse_active.push(el.getAttribute('data-verse'));
            }
        });

        if(arr_verse_active.length>0){
            if(arr_verse_active.length == 1){
                var verseNumber = arr_verse_active[0];
                var to_verseNumber = null;
            }else{
                var verseNumber = arr_verse_active[0];
                var to_verseNumber = arr_verse_active[arr_verse_active.length-1];
            }
            setTimeout(()=>{
                scrollToVerse(verseNumber, to_verseNumber);
            },200);
        }
    
    }//fin
    
}




showTrans(0, 1);
/*
setTimeout(function(){
    showTrans(2, 5);

    setTimeout(function(){
        showTrans(40, 5);

        setTimeout(function(){
            showTrans(66, 22);
        },3000);

    },3000);

},3000);
*/

/*
//scroll to verse
setTimeout(function(){
    scrollToVerse(2);  
},12000);
setTimeout(function(){
    scrollToVerse(9);
},14000);
setTimeout(function(){
    scrollToVerse(15);
},16000);
*/



function showTrans(book, chapter, verseNumber = null, to_verseNumber = null, verseView = null){   
    window.arr_trans = [];
    window.arr_divShow = [];
    
    //var startDivTrans = document.querySelector('#inpt_nav').dataset.divtrans;

    document.querySelectorAll('.colsHead').forEach((el,i)=>{
        arr_trans.push(el.getAttribute('data-trans'));//antes
        arr_divShow.push(el.parentElement.getAttribute('id'));//antes
        //console.log('el trans: ' + el.getAttribute('data-trans') );
        //console.log('el divShow: ' + el.parentElement.getAttribute('id') );
    });
    /*
    var arr_trans = [
        'rsti2',
        'rstStrong',
        'nrt',
        'ukr_ogi',
    ];
    */

    /*
    document.querySelectorAll('.colsInner').forEach( (el,i) => {
        //console.log(el.parentElement.getAttribute('id'))
        showChapterText3(arr_trans[i],'#'+arr_divShow[i], book, chapter, verseNumber, to_verseNumber, verseView);
        
        //si se cargan más que 1 modulo, miro su base _ep
        if(i > 0){
            setBaseEnglishPsalms();//grabo en trans1 su valor de EnglishPsalms 'Y' o 'N'
        }
    });
    */

    //Cargo primero trans1 y luego cuando se termina de cargar en la func showChapterText3() llamo trans2. ya que en el forEach de arriba no se guarda la orden de llamada de funcion. se llama primero trans2 y luego trans1
    window.iter_i = 0;
    //showChapterText3(arr_trans[iter_i],'#'+arr_divShow[iter_i], book, chapter, verseNumber, to_verseNumber, verseView);
    showChapterText4(arr_trans[iter_i],'#'+arr_divShow[iter_i], book, chapter, verseNumber, to_verseNumber, verseView);
    //console.log('iter_i: ' + iter_i + ' --- start en showTrans()');
}

function decode_html_2(str) {
    let txt = new DOMParser().parseFromString(str, "text/html");
    return txt.documentElement.textContent;
}

function decode_html_1(str) {
    let txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
}

function htmlEntities(str) {
    return String(str).replace(/&lt;/gi, '<').replace(/&gt;/gi, '>');// cambia '<' por '<' y '>' por '>'
}

function setBaseEnglishPsalms(){
    var Translation = document.querySelector('#trans1').getAttribute('data-trans');

    fetch(`modules/text/${Translation}/bibleqt.json`)
    .then((response) => response.json())
    .then((bq) => {
        document.querySelector('#trans1').setAttribute('data-base_ep',bq.EnglishPsalms);
    })
    .catch(error => { 
        // Código a realizar cuando se rechaza la promesa
        //console.log('error promesa: '+error);
    });
}


function getTsk(e){
    var div_tsk_head = document.querySelector('#tsk_head');
    var div_tsk_body = document.querySelector('#tsk_body');
    //console.log(e);
    var el = e.srcElement.parentElement;

    var arr_v = el.id.split('__');//rstStrong__0__1__1 => ['rstStrong',0,1,1] => [rstStrong, Gen, 1, 1]
    var Translation = arr_v[0];//rstStrong
    var book = arr_v[1];//id_book
    var chapter = arr_v[2];//chapter
    var verse = arr_v[3];//verse
    var to_verse = null;//to_verse por defecto
    if(arr_v[3].includes('-')){
        verse = arr_v.split('-')[0];
        to_verse = arr_v.split('-')[1];
    }

    //console.log('Translation: '+Translation);
    //console.log('book: '+book);
    //console.log('chapter: '+chapter);
    //console.log('verse: '+verse);

    var verseEnglishPsalms = obj_ep[Translation];//devuelve 'Y' o 'N'

    //si clico Psa 118:63 ruso tiene que convertirse en Sal. 119:63 español
    //ya que tsk está en español(ingles);
    if(verseEnglishPsalms == 'N'){
        //Modifico sólo los links si es para traducción rusa, ya que TSK viene con EnglishPlsalms = Y
        var res = convertLinkFromRusToEsp(book, chapter, verse);
        
        //console.log('link el: '+el);
        //console.log('res: '+res);
        
        //asigno nuevo valor
        book = res[0];
        chapter = res[1];
        verse = res[2];

        //console.log('res --- book: '+book);//empezando de 0
        //console.log('res --- chapter: '+chapter);//empezando de 1
        //console.log('res --- verse: '+verse);//empezando de 1
    }

    
    url = `modules/text/tsk/bibleqt.json`;//tsk'; 
    fetch(url)
    .then((response) => response.json())
    .then((tsk) => {
        
        // //console.log('abajo tsk: ');
        // //console.log(tsk);
        //console.log('tsk.Books[book].PathName: '+tsk.Books[book].PathName);

            url = `modules/text/tsk/${tsk.Books[book].PathName}`;//datos de cross reference
            fetch(url)
            .then((response) => response.text())
            .then((tskModule) => {                

                var tb = tskModule.split('[');//divido en chapters
                var tb_chapter = tb[chapter].split(']\r\n');//arr de un chapter indicado en el link divido en 2
                var tb_chapterNumber = tb_chapter[0];//numero de chapter
                var tb_chapter_vlinks = tb_chapter[1];//links del chapter
                var tb_lines = tb_chapter_vlinks.split('\r\n');
                var tb_verseNumber = tb_chapter_vlinks[0];
                
                var tb_arr_links = tb_lines[verse - 1].split('=')[1].split('; ');
                if(tb_arr_links == null) alert('error tb_arr_links');
                
                //console.log('tb_chapterNumber: '+tb_chapterNumber);
                //console.log('tb_verseNumber: '+tb_verseNumber);
                //console.log('tb_arr_links: ');
                //console.log(tb_arr_links);

                div_tsk_head.innerHTML = '';//reset datos
                div_tsk_body.innerHTML = '';//reset datos

                //Siempre muestro el verse clickeado en tsk
                const span_sm_trans = document.createElement('span');
                span_sm_trans.id = 'sm_trans';
                span_sm_trans.innerHTML = document.querySelector('.colsHead[data-trans="' + Translation+ '"] .colsHeadInner .partDesk .desk_trans').innerHTML;

                const p = document.createElement('p');
                p.id = el.id;
                p.className = 'tsk tsk_verse';
                p.setAttribute('data-verse',el.getAttribute('data-verse'));
                p.setAttribute('data-trans',Translation);
                p.innerHTML = el.innerHTML;
                p.querySelector('a').setAttribute('onclick',`goToLink('${Translation}', '${this.innerHTML}')`);//funciona

                div_tsk_head.append(span_sm_trans);
                div_tsk_head.append(p);
                div_tsk_head.scrollTop = 0;
                
                mySizeTsk();//altura de div_tsk_body despues de meter div_tsk_head

                //Si hay links para el verse
                if(tb_arr_links != ''){
                    //console.log('tb_arr_links: '+tb_arr_links);

                    tb_arr_links.forEach((el,i)=>{

                        var bookShortName = el.split(' ')[0];//Mt de 'Mt 13:24-26'
                        var chapterNumber = el.split(' ')[1].split(':')[0];//13 de 'Mt 13:24-26'
                        var verseNumbers = el.split(' ')[1].split(':')[1];//13 de 'Mt 13:24-26'
                        var verseNumber = null;
                        var to_verseNumber = null;
    
                        if(verseNumbers.includes('-')){
                            verseNumber = verseNumbers.split('-')[0];
                            to_verseNumber = verseNumbers.split('-')[1];
                        }else{
                            verseNumber = verseNumbers;
                        }
    
                        //console.log('bookShortName: '+bookShortName);//Mat. Gen.
                        //console.log('chapterNumber: '+chapterNumber);//empezando de 1
                        //console.log('verseNumber: '+verseNumber);//empezando de 1
                        //console.log('to_verseNumber: '+to_verseNumber);//mayor que verseNumber
                        //console.log('---');                        

                        
                        //Saco ajustes del modulo de la traducción en json
                        url_bq = `modules/text/${Translation}/bibleqt.json`;
                        fetch(url_bq)
                        .then((response) => response.json())
                        .then((bq) => {
                                
                            //console.log(' abajo bq:');
                            //console.log(bq);

                            //Asigno global vars para que sean vistos en fetch interior
                            window.dataBooksTsk = bq.Books;

                            window.bq_StrongNumbers = bq.StrongNumbers;
                            window.bq_EnglishPsalms = bq.EnglishPsalms;//PARA SABER SI MODIFICO chapterNumber y verseNumber

                            window.bq_Notes = bq.Notes;
                            window.bq_NoteSign = bq.NoteSign;
                            window.bq_StartNoteSign = bq.StartNoteSign;
                            window.bq_EndNoteSign = bq.EndNoteSign;

                            window.bq_Titles = bq.Titles;
                            window.bq_StartTitleSign = bq.StartTitleSign;
                            window.bq_EndTitleSign = bq.EndTitleSign;

                            window.bq_HTMLFilter = bq.HTMLFilter;
                            
                            //Достаю индех книги, зная его короткое значение.Напр.: 'Mt 13:24-26'
                            for(let i = 0, bookNumber = null; i < dataBooksTsk.length; i++) {
                                const element = dataBooksTsk[i];

                                for(let y = 0; y < element.ShortNames.length; y++) {
                                    const elem = element.ShortNames[y];

                                    if(bookShortName.toLowerCase() == elem.toLowerCase()){
                                        var n_book = element.BookNumber;
                                        var short_name = elem;//siempre el primer nombre del array
                    
                                        bookNumber = i;//numero de book empezando de 0. 0 => Génesis
                                        //console.log('bookNumber: '+bookNumber);                        
                                        //console.log('--- encontrado n_book: ' +n_book + ' --- short_name: ' +short_name);

                                        //Al encontrar el identificador del libro, miro los links. 
                                        //14=Ge 49:8; Nu 1:7; Nu 2:3-9; Nu 26:19-27; Nu 7:12
                                        //vers 14 tiene los links: Ge 49:8; Nu 1:7; Nu 2:3-9; Nu 26:19-27; Nu 7:12

                                        if(bq_EnglishPsalms == 'N'){
                                            //Modifico sólo los links si es para traducción rusa, ya que TSK viene con EnglishPlsalms = Y
                                            var new_result = convertLinkFromEspToRus(bookNumber, chapterNumber, verseNumber, to_verseNumber);
                                                                                        
                                            //asigno nuevo valor
                                            bookNumber = new_result[0];
                                            chapterNumber = new_result[1];
                                            verseNumber = new_result[2];
                                            to_verseNumber = new_result[3];

                                            //console.log('ahora bookNumber: '+bookNumber);//empezando de 1
                                            //console.log('ahora chapterNumber: '+chapterNumber);//empezando de 1
                                            //console.log('ahora verseNumber: '+verseNumber);//empezando de 1
                                            //console.log('ahora to_verseNumber: '+to_verseNumber);//mayor que verseNumber
                                        }
                                            
                                        //url del libro necesario
                                        url = `modules/text/${Translation}/${bq.Books[bookNumber].PathName}`;//ej.: nrt_01.htm';     
                                        fetch(url)
                                        .then((response) => response.text())
                                        .then((bookModule) => {
                                            
                                            //console.log(' abajo bookModule:');//libro del modulo de la traducción de la Biblia// 01_Genesis.htm
                                            //console.log(bookModule);

                                            var nb = bookModule.split('<h4>');//делю файл на главы
                                            //console.log(nb);
                                            
                                            nb = nb.filter(elm => elm);//удаляю пустые елементы массива
                                            //console.log(nb);

                                            var VerseTextFull = '';
                    
                                            //Если больше одного стиха нужно показать для Tsk. (1Кор.11:7-12), то...
                                            if(to_verseNumber != null){                                                    
                                                
                                                for (let i = parseInt(verseNumber); i <= parseInt(to_verseNumber); i++) {
                                                    let stij = nb[chapterNumber].split('<p>')[i].split(' ');//делю на стихи и делю на слова по пробелам
                                                    let stijNumber = stij[0];
                                                    stij.shift();//elimino 1 index
                                                    let stijText = stij.join(' ');//junto
                                                    let fch = (i == verseNumber) ? ' fch' : '' ;//first-child

                                                    //siempre hay que aplicar htmlEntities() para que en tsk no se vean '<' y '>'
                                                    VerseTextFull += '<span class="stij_one'+ fch+ '">';
                                                    if(i != verseNumber){//si no es 1-er numero de versiculo, lo meto
                                                        VerseTextFull += '<span class="stij_numb">'+ stijNumber +'</span> ';
                                                    }
                                                    VerseTextFull += '<span class="stij_text">'+ stijText +'</span>';
                                                    VerseTextFull += '</span>';

                                                    //console.log(VerseTextFull);
                                                    
                                                    var VerseText = VerseTextFull;
                                                    //console.log(VerseText);
                                                }//end for

                                            }else{//если только 1 стих (1Кор.11:7), то...
                                                VerseTextFull = nb[chapterNumber].split('<p>')[verseNumber];//делю только на стихи выбранную главу
                                                //console.log(VerseTextFull);
                                                
                                                let stijText = VerseTextFull.split(' ');
                                                stijText.shift();//elimino numero de versiculo

                                                var VerseText = ' <span class="stij_text">' + stijText.join(' ') +'</span>';
                                                //console.log(VerseText);
                                            }


                                            var p = document.createElement('p');
                                            var idLink = Translation +'__'+bookNumber + '__' + chapterNumber + '__' + verseNumber;
                                            if(to_verseNumber != null) idLink += '-' + to_verseNumber;
                                            p.id = idLink;
                                            p.className = 'tsk tsk_link';
                                            p.setAttribute('data-verse',verseNumber);
                            
                                            var a = document.createElement('a');
                                            //a.id = 'goto_' + idLink;
                                            a.href = '#';
                                            a.classList.add = 'blink';

                                            var refLink = dataBooksTsk[bookNumber].ShortNames[0] + '' + chapterNumber + ':' + verseNumber;//ej.: 1Кор.11:7
                                            if(to_verseNumber != null) refLink += '-' + to_verseNumber;//ej.: 1Кор.11:7-12
                                            //console.log('===> refLink: '+refLink);

                                            //-----------------------------------------------------------------//
                                            //Evento on click. NO BORRAR !!!
                                            a.setAttribute('onclick',`goToLink('${Translation}', '${refLink}')`);//funciona
                                            //-----------------------------------------------------------------//
                                            
                                            a.innerHTML = refLink;
                                            p.append(a);
                                            p.append(' ');

                                            const span_vt = document.createElement('span');
                                            span_vt.className = 'vt';//text de Verse para aplicar HTMLFilter si hay

                                            
                                            //Номера Стронга в стихах (RST+)
                                            if(bq_StrongNumbers == "Y"){
                                                let t = VerseText;
                                                var arr_t = t.split(' ');

                                                arr_t.forEach((el,i) => {    
                                                    
                                                    //element of string is Strong Number
                                                    if(!isNaN(parseInt(el)) || el == '0'){//number                         
                                                        const span_strong = document.createElement('span');
                                                        span_strong.className = 'strong'; 
                                                        let last_char = (el.length > 1) ? el.charAt(el.length-1) : "" ;

                                                        //si ultimo carácter es string
                                                        if(last_char != '' && isNaN(last_char)){
                                                            let el_number = el.substring(0,el.length-1);
                                                            let el_string = last_char;
                                                            span_strong.innerHTML = el_number;
                                                            p.append(span_strong);
                                                            p.append(el_string);
                                                        }else{//es number
                                                            span_strong.innerHTML = el;
                                                            p.append(span_strong);
                                                        }
                                                    }else{//is word
                                                        p.append(' ');
                                                        p.append(el);
                                                    }
                                                });
                                                p.innerHTML.trim();

                                                if(bq_HTMLFilter == 'Y'){
                                                    p.innerHTML = htmlEntities(p.innerHTML);
                                                }

                                            }                                            
                                            
                                            //Примечания редактора в стихах (RSTi2)
                                            if(bq_Notes == 'Y'){
                                                let t = VerseText;

                                                if(t.includes(bq_NoteSign)){// '*'
                                                    let arr_t0 = t.split(bq_NoteSign);
                                                    let before_Note = arr_t0[0];

                                                    if(t.includes(bq_StartNoteSign) && t.includes(bq_EndNoteSign)){
                                                        let arr_t1 = t.split(bq_StartNoteSign);//'[('
                                                        let arr_t2 = arr_t1[1].split(bq_EndNoteSign);//')]'
                                                        let text_Note = arr_t2[0];
                                                        let after_Note = arr_t2[1];

                                                        const span_t = document.createElement('span');
                                                        span_t.className = 'tooltip';
                                                        span_t.setAttribute('data-tooltip',text_Note);
                                                        span_t.innerHTML = bq.NoteSign;

                                                        span_t.addEventListener('mouseenter', function(){
                                                            showTooltip(this);
                                                        });
                                                        span_t.addEventListener('mouseleave', function(){
                                                            hideTooltip(this);
                                                        });
                                                        
                                                        span_vt.append(before_Note);
                                                        span_vt.innerHTML = (bq_HTMLFilter == 'Y') ? htmlEntities(span_vt.innerHTML) : span_vt.innerHTML ;
                                                        span_vt.append(span_t);
                                                        const span_vt_despues = document.createElement('span');
                                                        span_vt_despues.className = 'vt';
                                                        span_vt_despues.append(after_Note);
                                                        span_vt_despues.innerHTML = (bq_HTMLFilter == 'Y') ? htmlEntities(span_vt_despues.innerHTML) : span_vt_despues.innerHTML ;

                                                        p.append(span_vt);
                                                        p.append(span_vt_despues);
                                                    }
                                                }else{
                                                    //span_vt.append(VerseText);//se ven '<'
                                                    span_vt.innerHTML = VerseText;// se ve OK
                                                    p.append(span_vt);

                                                    if(bq_HTMLFilter == 'Y'){
                                                        p.innerHTML = htmlEntities(p.innerHTML);
                                                    }
                                                }
                                            }
                                            
                                            //Оглавления в стихах (NRT)
                                            if(bq_Titles == 'Y'){
                                                let t = VerseText;

                                                if(t.includes(bq_StartTitleSign) && t.includes(bq_EndTitleSign)){
                                                    let arr_t1 = t.split(bq_StartTitleSign);//'[('
                                                    let before_Title = arr_t1[0];
                                                    let arr_t2 = arr_t1[1].split(bq_EndTitleSign);//')]'
                                                    let text_Title = arr_t2[0];
                                                    let after_Title = arr_t2[1];

                                                    const span_title = document.createElement('span');
                                                    span_title.className = 'verse_title';
                                                    span_title.innerHTML = text_Title;

                                                    p.append(before_Title);
                                                    p.append(span_title);
                                                    p.append(after_Title);
                                                }else{
                                                    p.append(VerseText);
                                                }

                                                if(bq_HTMLFilter == 'Y'){
                                                    p.innerHTML = htmlEntities(p.innerHTML);
                                                }
                                            }
                                            
                                            //Нет ни Номеров Стронга, ни Примечаний ни Оглавлений
                                            if(bq_StrongNumbers == "N" && bq_Notes == 'N' && bq_Titles == 'N'){
                                                span_vt.innerHTML = VerseText;
                                                p.append(span_vt);

                                                if(bq_HTMLFilter == 'Y'){
                                                    p.innerHTML = htmlEntities(p.innerHTML);
                                                }
                                            }

                                            showTab(document.querySelector('#btn_tsk'),'tsk');//Se abre tab TSK
                                            if(window.innerWidth < 768){//si es mobile
                                                openSidebar(document.querySelector('.btnMenu'));//simulo click sobre el boton hamburguesa        
                                            }else{//si es desktop o tablet
                                                //comprebo si está oculto sidebar
                                                let sidebar = document.querySelector('#sidebar');
                                                if(sidebar.style.display == 'none'){
                                                    document.querySelector('#btn_hideShowSidebar').click();//mostrar sidebar con tsk
                                                }
                                            }
                                            div_tsk_body.append(p);
                                            div_tsk_body.scrollTop = 0;
                                        })
                                        .catch(error => { 
                                            // Código a realizar cuando se rechaza la promesa
                                            //console.log('4. error promesa: '+error);
                                        });
                                        break;
                                    }
                                }
                                if(bookNumber != null){
                                    break;
                                }                                    
                            }                           
                        })
                        .catch(error => { 
                            // Código a realizar cuando se rechaza la promesa
                            //console.log('3. error promesa: '+error);
                        });
    
                    });//fin forEach de tb_arr_links

                }else{//no hay links
                    const p = document.createElement('p');
                    p.className = 'tsk tsk_nolink';
                    p.innerHTML = 'no hay tsk verses...';
                    //console.log(p);
                    div_tsk_body.append(p);
                }
            })
            .catch(error => { 
                // Código a realizar cuando se rechaza la promesa
                //console.log('2. error promesa: '+error);
            });
    })
    .catch(error => { 
        // Código a realizar cuando se rechaza la promesa
        //console.log('1. error promesa: '+error);
    });
}

//actual
function showChapterText3(Translation, divId, book, chapter, verseNumber = null, to_verseNumber = null, verseView = null){
    let book_i = (book > 0) ? book - 1 : 0 ;//index of book 1 is 0
    let chapter_i = (chapter > 0) ? chapter - 1 : 0 ;//index of chapter 1 is 0
    //var divTrans = document.querySelector(divId+' .colsHead .colsHeadInner div');//ej: RST+//antes
    var divTrans = document.querySelector(divId+' .colsHead .colsHeadInner .partDesk .desk_trans');//ej: RST+
    var divTransDesk = document.querySelector(divId+' .colsHead .colsHeadInner .partDesk .desk_trans');//ej: RST+
    var divTransMob = document.querySelector(divId+' .colsHead .colsHeadInner .partMob .mob_trans');
    var divShow = document.querySelector(divId+' .colsInner');//donde se ve el texto de la Biblia
    divShow.innerHTML = '';

    var btnStrong = document.querySelector('#btnStrong');
    var btnStrongIsActive = false;
    if(btnStrong.classList.contains('btn_active')){
        btnStrongIsActive = true;
    }

    window.base_ep = document.querySelector('#trans1').getAttribute('data-base_ep');
    //console.log('base_ep: '+base_ep);

    window.arr_data_head = [];//incluye h2 y h4
    window.arr_data_body = [];//incluye p
    window.arr_data_all = [];//incluye todo: h2 y h4 y p
        
    //saco ajustes de este modulo en json
    url_bq = `modules/text/${Translation}/bibleqt.json`;

    if(Translation != null){

        fetch(url_bq)
        .then((response) => response.json())
        .then((bq) => {
            //console.log(' abajo bq:');
            //console.log(bq);

            //window.bq = bq;
            if(divTrans != null){
                // divTrans.innerHTML = bq.BibleShortName;
                divTransDesk.innerHTML = bq.BibleShortName;
                divTransMob.innerHTML = bq.BibleShortName;
            }
            
            //si el id de book está entre numero de books del modulo, lo muestro
            if(parseInt(book) < bq.BookQty){//0-65 < 66
                
                //url del libro necesario
                url = `modules/text/${Translation}/${bq.Books[book].PathName}`;//nrt_01.htm';  

                fetch(url)
                .then((response) => response.text())
                .then((bookModule) => {
                    
                    //console.log(bookModule);
                    divShow.innerHTML = '';//IMPORTANTE! PARA QUE NO SE DUPLIQUE EL CONTENIDO DE UNA TRANS!

                    var nb = bookModule.split('<h4>');//делю файл на главы
                    //console.log(nb);
                    
                    nb = nb.filter(elm => elm);//удаляю пустые елементы массива
                    //console.log(nb);

                    //Book
                    if(bookModule.includes('<h2>')){
                        var arr_h2 = bookModule.split('<h2>');

                        if(arr_h2[1].includes('</h2>')){
                            var arr_h2_text = arr_h2[1].split('</h2>');
                            var BookName = arr_h2_text[0];
                        }else{
                            var BookName = arr_h2[1];
                        }
                        BookName = (BookName == '') ? bq.Books[book].FullName : BookName ;
                        //console.log('BookName: '+BookName); 
                        
                        //Book
                        var h2 = document.createElement('h2');
                        h2.append(BookName);

                        arr_data_head.push(h2);
                        //console.log(h2);

                        if(bq.HTMLFilter == 'Y'){
                            h2.innerHTML = htmlEntities(h2.innerHTML)
                        }
                    }

                    //si existe el capitulo
                    if(typeof nb[chapter] !== 'undefined'){
                        var ChapterId = chapter;

                        var nb_chapter_verses = nb[chapter].split('<p>');
                        //console.log(nb_chapter_verses);

                        var only_verses_length = nb_chapter_verses.length - 1;
                        //console.log(`Translation: ${divId} --- divId: ${divId} --- book: ${book} --- chapter: ${chapter} --- only_verses_length: ${only_verses_length}`);
                        // console.log('only_ divId: '+divId);

                        if(divId == '#col1'){
                            window.col1_p_length = only_verses_length;
                            //console.log('only_ col1_p_length: '+window.col1_p_length);
                        }else{
                            //console.log('no es col1. only_ col1_p_length: '+window.col1_p_length);
                        }



                        //Chapter, Verse
                        nb_chapter_verses.forEach( (el,i) => {
                            //console.log(el);
            
                            //Chapter
                            if(i == 0){
                                //console.log('es Chapter: '+el);

                                if(el.includes('</h4>')){
                                    var arr_h4_text = el.split('</h4>');
                                    var ChapterText = arr_h4_text[0];
                                }else{
                                    var ChapterText = el;
                                }
                                //console.log('ChapterText: '+ChapterText);

                                if(ChapterText == ''){
                                    ChapterText = bq.Books[book].FullName + ' ' + chapter;
                                }

                                //Chapter
                                var h4 = document.createElement('h4');
                                h4.append(ChapterText);

                                arr_data_head.push(h4);
                                //console.log(h4);

                                //divShow.append(h4);

                                if(bq.HTMLFilter == 'Y'){
                                    h4.innerHTML = htmlEntities(h4.innerHTML);
                                }
                            }
                            else{//Verse
                                //console.log('es Verse: '+el);
            
                                if(el.includes('</p>')){
                                    var arr_p_text = el.split('</p>');
                                    var p_Text = arr_p_text[0];
                                }else{
                                    var p_Text = el;
                                }
                                //console.log('p_Text: '+p_Text); 
            
                                var arr_p = p_Text.split(' ');
                                var VerseId = arr_p[0];
                                //console.log('VerseId: '+VerseId);
            
                                var VerseText = '';
                                for(let index = 1; index < arr_p.length; index++){
                                    VerseText += arr_p[index] + ' ';
                                }
                                //console.log('VerseText: '+VerseText);
            
                                var p = document.createElement('p');
                                p.id = Translation +'__'+book + '__' + chapter + '__' + VerseId;
                                p.setAttribute('data-verse',VerseId);
                
                                var a = document.createElement('a');
                                a.href = '#';
                                a.classList.add = 'blink';
                                a.innerHTML = bq.Books[book].ShortNames[0] + ChapterId + ':' + VerseId;
                                p.append(a);
                                p.append(' '); 

                                const span_vt = document.createElement('span');
                                span_vt.className = 'vt';//text de Verse para aplicar HTMLFilter si hay


                                //Номера Стронга в стихах (RST+)
                                if(bq.StrongNumbers == "Y"){
                                    let t = VerseText;
                                    var arr_t = t.split(' ');

                                    arr_t.forEach((el,i) => {    
                                        
                                        //element of string is Strong Number
                                        if(!isNaN(parseInt(el)) || el == '0'){//number                         
                                            const span_strong = document.createElement('span');
                                            if(btnStrongIsActive){
                                                span_strong.className = 'strong show strongActive'; 
                                            }else{
                                                span_strong.className = 'strong'; 
                                            }
                                            let last_char = (el.length > 1) ? el.charAt(el.length-1) : "" ;

                                            //si ultimo carácter es string
                                            if(last_char != '' && isNaN(last_char)){
                                                let el_number = el.substring(0,el.length-1);
                                                let el_string = last_char;
                                                span_strong.innerHTML = el_number;
                                                p.append(span_strong);
                                                p.append(el_string);
                                            }else{//es number
                                                span_strong.innerHTML = el;
                                                p.append(span_strong);
                                            }

                                        }else{//is word
                                            p.append(' ');
                                            if(btnStrongIsActive){
                                                if(el.includes('<S>')){
                                                    el = el.replace('<S>','<S class="show strongActive">');
                                                }
                                            }
                                            p.append(el);
                                        }
                                    });
                                    p.innerHTML.trim();

                                    //console.log('antes: ' + p.innerHTML);
                                    if(bq.HTMLFilter == 'Y'){
                                        p.innerHTML = htmlEntities(p.innerHTML);
                                    }
                                    //console.log('despues: '+p.innerHTML);

                                    if(btnStrongIsActive && p.innerHTML.includes('strongActive')){
                                        p.querySelectorAll('.strongActive').forEach((el)=>{
                                            el.addEventListener('click', ()=>{
                                                //console.log('1. bq.StrongFirstLetter: '+bq.StrongFirstLetter);
                                                //console.log('1. book: '+book);
                                                console.log('m --- 1. el.innerHTML: '+el.innerHTML);
                                                var paramfirstLetter = (bq.StrongFirstLetter == 'Y') ? 'Y' : 'N' ;

                                                if(el.innerHTML.includes('H') || el.innerHTML.includes('G')){//rstStrongRed G3056 /H3056
                                                    getStrongNumber(el.innerHTML, null, paramfirstLetter);
                                                }else{//rstStrong
                                                    lang = (book >= 39) ? 'Grk' : 'Heb' ;
                                                    getStrongNumber(el.innerHTML, lang, paramfirstLetter);
                                                }
                                            });
                                        }); 
                                    }

                                    arr_data_body.push(p);
                                    //console.log(p);
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

                                            const span_t = document.createElement('span');
                                            span_t.className = 'tooltip';
                                            span_t.setAttribute('data-tooltip',text_Note);
                                            span_t.innerHTML = bq.NoteSign;

                                            span_t.addEventListener('mouseenter', function(){
                                                showTooltip(this);
                                            });
                                            span_t.addEventListener('mouseleave', function(){
                                                hideTooltip(this);
                                            });
                                            /*
                                            //antes
                                            p.append(before_Note);
                                            p.append(span_t);
                                            p.append(after_Note);
                                            */

                                            before_Note = (bq.HTMLFilter == 'Y') ? htmlEntities(before_Note) : before_Note ;
                                            span_vt.append(before_Note);
                                            span_vt.append(span_t);
                                            after_Note = (bq.HTMLFilter == 'Y') ? htmlEntities(after_Note) : after_Note ;
                                            span_vt.append(after_Note);
                                            //span_vt.innerHTML = (bq.HTMLFilter == 'Y') ? htmlEntities(span_vt.innerHTML) : span_vt.innerHTML ;

                                            p.append(span_vt);//antes
                                        }
                                    }else{
                                        //p.append(VerseText);//antes
                                        span_vt.append(VerseText);
                                        p.append(span_vt);

                                        if(bq.HTMLFilter == 'Y'){
                                            p.innerHTML = htmlEntities(p.innerHTML);
                                        }
                                    }
                                    //p.append(span_vt);//antes
                                    //SIMULTANEAMENTE CON '*' Y '<' Y '> ' la función htmlEntities() DESHABILITA tooltip.

                                    arr_data_body.push(p);
                                    //console.log(p);
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

                                        const span_title = document.createElement('span');
                                        span_title.className = 'verse_title';
                                        span_title.innerHTML = text_Title;

                                        p.append(before_Title);
                                        p.append(span_title);
                                        p.append(after_Title);
                                    }else{
                                        p.append(VerseText);
                                    }

                                    arr_data_body.push(p);
                                    //console.log(p);

                                    if(bq.HTMLFilter == 'Y'){
                                        p.innerHTML = htmlEntities(p.innerHTML);
                                    }
                                }

                                //Нет ни Номеров Стронга, ни Примечаний ни Оглавлений
                                if(bq.StrongNumbers == "N" && bq.Notes == 'N' && bq.Titles == 'N'){
                                    //p.append(VerseText);//antes
                                    span_vt.append(VerseText);
                                    p.append(span_vt);

                                    arr_data_body.push(p);
                                    //console.log(p);
                                    
                                    if(bq.HTMLFilter == 'Y'){
                                        p.innerHTML = htmlEntities(p.innerHTML);
                                    }
                                }        
                                
                            }
            
                        });
                        
                        
                        //Posle forEach...
                        //=====================================================//
                        // 1. inicio - Numeración base Española - y col's Rusa
                        //=====================================================//
                        if(base_ep == 'Y' && bq.EnglishPsalms == 'N'){//numeración rusa
                            //console.log('Numeración base es Española - y cols es Rusa');
                            //var col1_p_length = document.querySelectorAll('#col1 .colsInner p').length;//antes
                            var arr_vstavka = [];
                            var vstavka2 = [];
                            
                            //Miro la traducción con EnglishPsalms
                            switch (parseInt(book)) {

                                case 3: //Числа
                                        if(chapter == 12){//Числа 12:16 => Num. 13:1
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 13, 1);//add Num. 13:1
                                            arr_data_body = arr_data_body.concat(arr_vstavka);
                                            addChapterToVerse(arr_data_body, bq, book, 13, 16);//se añade capitulo 13 al verse 13 español que es 1 ruso
                                            arr_data_body.splice(col1_p_length);
                                        }
                                        if(chapter == 13){//13:1-33 => 13: +1
                                            arr_data_body.splice(0, 1);//[p....] - elimino primer versículo
                                        }
                                    break;

                                case 5: //Иисус Навин
                                        if(chapter == 5){//Ис.Нав.6:1 => Josue 5:16 | 6:2-27 =>	6: -1
                                            arr_data_body.splice(col1_p_length);
                                        }
                                        if(chapter == 6){//Ис.Нав.6:1 => Josue 5:16 | 6:2-27 =>	6: -1
                                            addChapterToHead(bq, book, 5);//si el verse vstavka es primero
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 5, 16);//add Josue 5:16
                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                            addChapterToVerse(arr_data_body, bq, book, 6, 2);//se añade capitulo 6 al verse 2 español que es 1 ruso
                                            arr_data_body.splice(col1_p_length);
                                        }
                                    break; 
                                    
                                case 8: //1Samuel (1Царств) 
                                        if(chapter == 20){//20:42-а	=> 20:42:00 | 20:42-б => 20:43:00
                                            //1 verse contiene 2 en ruso
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 20, form_list_verses(1, col1_p_length+1) );                                       
                                            let arr_mezclado = mergeVerses(arr_vstavka, 42);//se meclan 42 y el siguiente 43.
                                            arr_data_body = [].concat(arr_mezclado, arr_data_body);
                                            arr_data_body.splice(col1_p_length);
                                        }
                                        if(chapter == 23){//23:29 => 24:1
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 24, 1 );
                                            arr_data_body = arr_data_body.concat(arr_vstavka);//añado al final un versiculo
                                            addChapterToVerse(arr_data_body, bq, book, 24, 29);//se añade capitulo 24 al verse 29 español que es 1 ruso
                                            arr_data_body.splice(col1_p_length);
                                        }
                                        if(chapter == 24){//24:1-22	=> 24: +1
                                            arr_data_body.splice(0, 1);//[p....] - elimino primer versículo
                                        }
                                    break; 
                                
                                case 17: //Job 
                                        if(chapter == 39){
                                            arr_data_body.splice(col1_p_length);
                                        }
                                        if(chapter == 40){//40:1-5 => 39:31-35 | 40:6-24 =>	40: -5
                                            addChapterToHead(bq, book, 39);//si el verse vstavka es primero
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 39, form_list_verses(31, 35) );
                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                            addChapterToVerse(arr_data_body, bq, book, 40, 6);//se añade capitulo 40 al verse 6 español que es 1 ruso
                                            arr_data_body.splice(col1_p_length);//[p....] - elimino versículos sobrantes a partir de el último hasta el fin
                                        }
                                        if(chapter == 41){//41:1-8 => 40:20-27 | 41:9-34 =>	41: -8
                                            addChapterToHead(bq, book, 40);//si el verse vstavka es primero
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 40, form_list_verses(20, 27) );
                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                            addChapterToVerse(arr_data_body, bq, book, 41, 9);//se añade capitulo 41 al verse 9 español que es 1 ruso
                                            arr_data_body.splice(col1_p_length);
                                        }
                                    break; 

                                case 18: //Psalmos 
                                        if(chapter >= 3 && chapter <= 8){//3:1 - 9:20 =>	Х : +1 *
                                            arr_data_body.splice(0, 1);//[p....] - elimino primer versículo
                                        }
                                        if(chapter == 9){//3:1 - 9:20 => Х : +1 *
                                            arr_data_body.splice(0, 1);//[p....] - elimino primer versículo
                                            arr_data_body.splice(col1_p_length);
                                        }
                                        if(chapter == 10){//10:2-18 => 9: +21
                                            addChapterToHead(bq, book, 9);//si el verse vstavka es primero
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 9, form_list_verses(22, 39) );
                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                            arr_data_body.splice(col1_p_length);
                                        }
                                        //Formula Esp => Rus //Ps.X:1 => Пс.X-1:1 
                                        //-1 : Х
                                        if(
                                            (chapter == 11) || 
                                            (chapter >= 14 && chapter <= 17) || 
                                            (chapter >= 23 && chapter <= 29) || 
                                            (chapter >= 32 && chapter <= 33) || 
                                            (chapter == 35) || 
                                            (chapter == 37) || 
                                            (chapter == 43) || 
                                            (chapter == 50) || 
                                            (chapter == 66) || 
                                            (chapter >= 71 && chapter <= 74) || 
                                            (chapter >= 78 && chapter <= 79) || 
                                            (chapter == 82) || 
                                            (chapter == 86) || 
                                            (chapter == 87) || 
                                            (chapter == 91) || 
                                            (chapter >= 93 && chapter <= 101) || 
                                            (chapter >= 103 && chapter <= 107) || 
                                            (chapter >= 109 && chapter <= 114) || 
                                            (chapter >= 117 && chapter <= 146)
                                        ){
                                            addChapterToHead(bq, book, parseInt(chapter)-1);//si el verse vstavka es primero
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-1, form_list_verses(1, col1_p_length) );
                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                            arr_data_body.splice(col1_p_length);
                                        }
                                        //Formula Esp => Rus //Ps.X:1 => Пс.X-1:2 
                                        //-1 : +1
                                        if(
                                            (chapter == 12) || 
                                            (chapter >= 18 && chapter <= 22) || 
                                            (chapter >= 30 && chapter <= 31) || 
                                            (chapter == 34) || 
                                            (chapter == 36) || 
                                            (chapter >= 38 && chapter <= 42) || 
                                            (chapter >= 44 && chapter <= 49) || 
                                            (chapter == 53) || 
                                            (chapter >= 55 && chapter <= 59) || 
                                            (chapter >= 61 && chapter <= 65) || 
                                            (chapter >= 67 && chapter <= 70) || 
                                            (chapter >= 75 && chapter <= 77) || 
                                            (chapter >= 80 && chapter <= 81) || 
                                            (chapter >= 83 && chapter <= 85) || 
                                            (chapter >= 88 && chapter < 90) || 
                                            (chapter == 92) || 
                                            (chapter == 102) || 
                                            (chapter == 108)
                                        ){
                                            addChapterToHead(bq, book, parseInt(chapter)-1);//si el verse vstavka es primero
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-1, form_list_verses(1+1, col1_p_length+1) );// desde 2 versiculo
                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                            arr_data_body.splice(col1_p_length);
                                        }
                                        //Formula
                                        //2en1
                                        if(chapter == 13){//13:05 => 12:6-а | 13:06 => 12:6-б
                                            addChapterToHead(bq, book, parseInt(chapter)-1);//si el verse vstavka es primero
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-1, form_list_verses(2, 6) );// desde 2 versiculo
                                            arr_data_body = arr_vstavka.concat(vstavka_vacio('arriba'),arr_data_body);
                                            arr_data_body.splice(col1_p_length);//1 verse español contiene 2 en ruso
                                        }
                                        //Formula
                                        //-1 : +2 *
                                        if(
                                            (chapter >= 51 && chapter <= 52) ||
                                            (chapter == 54) || 
                                            (chapter == 60)
                                        ){
                                            addChapterToHead(bq, book, parseInt(chapter)-1);//si el verse vstavka es primero
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-1, form_list_verses(1+2, col1_p_length+2) );// desde 3 versiculo
                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                            arr_data_body.splice(col1_p_length);
                                        }
                                        //Formula
                                        //2en1
                                        if(chapter == 90){//90:05 => 89:6-а | 90:06	=> 89:6-б 
                                            addChapterToHead(bq, book, parseInt(chapter)-1);//si el verse vstavka es primero
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-1, form_list_verses(2, col1_p_length) );
                                            let p_vacio = document.createElement('p');
                                            p_vacio.className = 'prim';
                                            p_vacio.innerHTML = 'смотри стих выше...';
                                            arr_vstavka.splice(5,0,p_vacio);
                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                            arr_data_body.splice(col1_p_length);
                                        }
                                        //Formula
                                        //-2: +8
                                        if(chapter == 115){//115:1-18 => 113: +8
                                            addChapterToHead(bq, book, parseInt(chapter)-2);//si el verse vstavka es primero
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-2, form_list_verses(1+8, col1_p_length+8) );// desde 9 versiculo
                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                            arr_data_body.splice(col1_p_length);
                                        }
                                        //Formula
                                        //-2: X
                                        if(chapter == 116){//116:1-9 => 114: Х
                                            addChapterToHead(bq, book, parseInt(chapter)-2);//si el verse vstavka es primero
                                            // Sal.116:1-9 => Пс. 114:1-9
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-2, form_list_verses(1, 9) );
                                            // Sal.116:10-19 => Пс. 115:1-10
                                            vstavka2 = for_parseVerse(Translation, bq, bookModule, book, chapter-1, form_list_verses(1, 10) );
                                            arr_vstavka = arr_vstavka.concat(vstavka2);
                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                            addChapterToVerse(arr_data_body, bq, book, 115, 10);//se añade capitulo 115 al verse 10 español que es 1 ruso
                                            arr_data_body.splice(col1_p_length);
                                        }
                                        //Formula
                                        //-1: X (especial)
                                        if(chapter == 147){//147:1-11 => 146:1-11
                                            addChapterToHead(bq, book, parseInt(chapter)-1);//si el verse vstavka es primero
                                            // Sal.147:1-11 => Пс.146:1-11
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-1, form_list_verses(1, 11) );
                                            // Sal.147:12-20 => Пс. 147:1-9
                                            vstavka2 = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, 9) );
                                            arr_vstavka = arr_vstavka.concat(vstavka2);
                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                            addChapterToVerse(arr_data_body, bq, book, 147, 12);//se añade capitulo 147 al verse 12 español que es 1 ruso
                                            arr_data_body.splice(col1_p_length);
                                        }
                                    break;

                                case 19: //Притчи
                                        if(chapter == 4){
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length) );
                                            arr_data_body = [].concat(arr_vstavka);
                                            arr_data_body.splice(col1_p_length);
                                        }
                                    break;
                            
                                case 21: //Cantares - Песня песней
                                        if(chapter == 1){
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length) );
                                            let p_vacio = document.createElement('p');
                                            p_vacio.className = 'prim';
                                            p_vacio.innerHTML = 'заглавие...';
                                            arr_vstavka.splice(0,0,p_vacio);
                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                            arr_data_body.splice(col1_p_length);
                                        }
                                        if(chapter == 6){//06:13 =>	07:1
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+1, 1 );
                                            arr_data_body = arr_data_body.concat(arr_vstavka);
                                            addChapterToVerse(arr_data_body, bq, book, 7, 13);//se añade capitulo 7 al verse 13 español que es 1 ruso
                                            arr_data_body.splice(col1_p_length);
                                        }
                                        if(chapter == 7){//7:1-13 => 7: +1 (7:2-14)
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1+1, col1_p_length+1) );
                                            arr_data_body = [].concat(arr_vstavka,arr_data_body);
                                            arr_data_body.splice(col1_p_length);
                                        }
                                    break;

                                case 22: //Isaías - Исаия
                                        if(chapter == 3){
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length) );
                                            let p_vacio = document.createElement('p');
                                            p_vacio.className = 'prim';
                                            p_vacio.innerHTML = 'смотри стих выше...';
                                            arr_vstavka.splice(19,0,p_vacio);
                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                            arr_data_body.splice(col1_p_length);
                                        }
                                    break;

                                case 26: //Daniel - Даниил
                                        if(chapter == 3){//3:1-30 => 3:1-30
                                            //в Синодальном переводе есть вставочные стихи, которых нет в Исп Библии. Стихи с 24 по 90 включительно переведены с греческого, потому что в еврейском тексте их нет. - Прим. ред.
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length) );
                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                            arr_data_body.splice(col1_p_length);
                                        }
                                        if(chapter == 4){//4:1-3 => 3:31-33 | 4:4-37 => 4: -3
                                            addChapterToHead(bq, book, parseInt(chapter)-1);//si el verse vstavka es primero
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-1, form_list_verses(31, 33) );
                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                            addChapterToVerse(arr_data_body, bq, book, 4, 4);//se añade capitulo 4 al verse 4 español que es 1 ruso
                                            arr_data_body.splice(col1_p_length);
                                        }
                                    break;

                                case 27: //Oseas - Осия
                                        if(chapter == 13){//13:16 => 14:1
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 14, 1);
                                            arr_data_body = arr_data_body.concat(arr_vstavka);
                                            addChapterToVerse(arr_data_body, bq, book, 14, 16);//se añade capitulo 14 al verse 16 español que es 1 ruso
                                            arr_data_body.splice(col1_p_length);
                                        }
                                        if(chapter == 14){//14:1-9 => 14:2-10
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(2, 10) );
                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                            arr_data_body.splice(col1_p_length);
                                        }
                                    break;

                                case 31: //Jonas - Иона
                                        if(chapter == 1){//1:17 => 2:1
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 2, 1);
                                            arr_data_body = arr_data_body.concat(arr_vstavka);
                                            addChapterToVerse(arr_data_body, bq, book, 2, 17);//se añade capitulo 2 al verse 17 español que es 1 ruso
                                            arr_data_body.splice(col1_p_length);
                                        }
                                        if(chapter == 2){//2:1-10 => 2:2-11
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(2, 11) );
                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                            arr_data_body.splice(col1_p_length);
                                        }
                                    break;

                                case 44: //Romanos - Римлянам
                                        //book = book + 7;// 44 + 7 = 51 //Romanos - Римлянам
                                        if(chapter == 16){// 16:25-27 => 14:24-26                                          
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-2, form_list_verses(24,  26) );
                                            arr_data_body = arr_data_body.concat(arr_vstavka);
                                            addChapterToVerse(arr_data_body, bq, book, 14, 25);//se añade capitulo 14 al verse 25 español que es 24-26 ruso
                                            arr_data_body.splice(col1_p_length);
                                        }
                                    break;

                                case 46: //2Corintios - 2-Коринфянам
                                        //book = book + 7;// 46 + 7 = 53 //2Corintios - 2-Коринфянам
                                        if(chapter == 13){// 13:12-13 => 13:12 | 13:14 => 13:13                                          
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length-1) );
                                            let p_vacio = document.createElement('p');
                                            p_vacio.className = 'prim';
                                            p_vacio.innerHTML = 'смотри стих выше...';
                                            arr_vstavka.splice(12,0,p_vacio);
                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                            arr_data_body.splice(col1_p_length);
                                        }
                                    break;
                                
                                default:
                                    //console.log('default en switch');
                                    break;
                            }//fin switch
                        }
                        //=====================================================//
                        // fin - Numeración base Española - y col's Rusa
                        //=====================================================//
                        
                        
                        //=====================================================//
                        // 2. inicio - Numeración base Rusa - y col's Española
                        //=====================================================//
                        if(base_ep == 'N' && bq.EnglishPsalms == 'Y'){//numeración Española
                            //console.log('Numeración base Rusa - y cols Española');
                            //var col1_p_length = document.querySelectorAll('#col1 .colsInner p').length;//antes
                            //console.log(' --- dentro de bloque Numeración base Rusa - y cols Española --- col1_p_length: '+col1_p_length);//test
                            var arr_vstavka = [];
                            var vstavka2 = [];
                            
                            //Miro la traducción con EnglishPsalms
                            switch (parseInt(book)) {

                                case 3: //Числа
                                        if(chapter == 12){//12:X => 12:X (quito ultimo verse)
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length) );
                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                            arr_data_body.splice(col1_p_length);
                                        }
                                        if(chapter == 13){//Числа 13:1 => Num.12:16 
                                            addChapterToHead(bq, book, 12);//si el verse vstavka es primero
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 12, 16);
                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                            addChapterToVerse(arr_data_body, bq, book, 13, 2);//result Num.13:1 => Números 13 Num.13:1
                                            arr_data_body.splice(col1_p_length);
                                        }
                                    break;

                                case 5: //Иисус Навин
                                        if(chapter == 5){//Иис.Нав.5:16 => Jos.6:1                                    
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 6, 1);
                                            arr_data_body = arr_data_body.concat(arr_vstavka);
                                            addChapterToVerse(arr_data_body, bq, book, 6, 16);//se añade capitulo 5 al verse 16 ruso que es 1 español
                                            arr_data_body.splice(col1_p_length);
                                        }
                                        if(chapter == 6){//Иис.Нав.6:1 => Jos.6:2 ... Иис.Нав.6:26 => Jos.6:27
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1+1, col1_p_length+1));
                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                            arr_data_body.splice(col1_p_length);
                                        }
                                    break; 
                                    
                                case 8: //1Samuel (1Царств) 
                                        if(chapter == 20){//1Цар.20:42-43 => 1Sam 20:42
                                            //1 verse contiene 2 en ruso
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length-1) );
                                            arr_data_body = [].concat(arr_vstavka,vstavka_vacio('arriba'));
                                            arr_data_body.splice(col1_p_length);
                                        }
                                        if(chapter == 23){//
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length) );
                                            arr_data_body = arr_data_body.concat(arr_vstavka);
                                            arr_data_body.splice(col1_p_length);
                                        }
                                        if(chapter == 24){//1Цар.24:1 => 1S.23:29
                                            addChapterToHead(bq, book, 23);//si el verse vstavka es primero
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 23, 29 );//cojo último verse del capitulo anterior
                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                            addChapterToVerse(arr_data_body, bq, book, 24, 2);//se añade capitulo 24 al verse 2 ruso que es 1 español
                                            arr_data_body.splice(col1_p_length);
                                        }
                                    break; 
                                
                                case 17: //Job 
                                        if(chapter == 39){//39:31-35 => 40:1-5  | 40:6-24 =>	40: -5
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 40, form_list_verses(1, 5) );
                                            arr_data_body = arr_data_body.concat(arr_vstavka);
                                            addChapterToVerse(arr_data_body, bq, book, 40, 31);//se añade capitulo 40 al verse 31 ruso que es 1 español
                                            arr_data_body.splice(col1_p_length);
                                        }
                                        if(chapter == 40){//40:1-19 => 40:6-24 
                                            //console.log(arr_data_body);//arr_data_body trae todos los verses del capitulo  40:1-24
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 40, form_list_verses(6, 24) );//trae 8 verses 40:6-24
                                            //console.log(arr_vstavka);//trae 8 verses 40:6-24
                                            vstavka2 = for_parseVerse(Translation, bq, bookModule, book, 41, form_list_verses(1, 8) );//trae 8 verses 41:1-8
                                            //console.log(vstavka2);
                                            arr_data_body = [].concat(arr_vstavka, vstavka2);//[]. reescribe y une 40:6-24 con 41:1-8 
                                            //console.log(arr_data_body);
                                            addChapterToVerse(arr_data_body, bq, book, 41, 20);//se añade capitulo 41 al verse 20 ruso que es 1 español                                        
                                            arr_data_body.splice(col1_p_length);
                                        }
                                        if(chapter == 41){//40:1-26 => 41:9-34
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 41, form_list_verses(9, 34) );
                                            arr_data_body = [].concat(arr_vstavka);
                                            arr_data_body.splice(col1_p_length);
                                        }
                                    break; 

                                case 18: //Psalmos 
                                        if(chapter >= 3 && chapter <= 8){//3:1 - 9:20 =>	Х : +1 *
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length-1) );
                                            arr_data_body = [].concat(vstavka_vacio(), arr_vstavka);
                                            arr_data_body.splice(col1_p_length);
                                        }
                                        if(chapter == 9){//3:1 - 9:20 => Х : +1 *
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, 20) );
                                            vstavka2 = for_parseVerse(Translation, bq, bookModule, book, 10, form_list_verses(1, 18) );
                                            arr_data_body = [].concat(vstavka_vacio(), arr_vstavka, vstavka2);
                                            addChapterToVerse(arr_data_body, bq, book, 10, 22);//se añade capitulo 10 al verse 22 ruso que es 1 español 
                                            arr_data_body.splice(col1_p_length);
                                        }
                                        //Formula Esp => Rus //Пс.X:1 => Ps.X+1:1 
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
                                            (chapter >= 116 && chapter <= 138) ||
                                            (chapter >= 140 && chapter <= 145)
                                        ){
                                            addChapterToHead(bq, book, parseInt(chapter)+1);//si el verse vstavka es primero
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+1, form_list_verses(1, col1_p_length) );
                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                            arr_data_body.splice(col1_p_length);
                                        }
                                        //Formula Esp => Rus //Пс.X+1:2 => Ps.X:1 //добавляю пустой стих сначала в исп перевод
                                        //+1 : -1
                                        if(
                                            (chapter == 11) || 
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
                                            (chapter == 139)
                                        ){
                                            addChapterToHead(bq, book, parseInt(chapter)+1);//si el verse vstavka es primero
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+1, form_list_verses(1, col1_p_length-1) );
                                            arr_data_body = [].concat(vstavka_vacio(), arr_vstavka);
                                            arr_data_body.splice(col1_p_length);
                                        }
                                        //Formula
                                        //+1 : -2 | Ej.:  50:0 => 51:1 | 50:1 => 51:2
                                        if(
                                            (chapter >= 50 && chapter <= 51) ||
                                            (chapter == 53) || 
                                            (chapter == 59)
                                        ){
                                            addChapterToHead(bq, book, parseInt(chapter)+1);//si el verse vstavka es primero
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+1, form_list_verses(1, col1_p_length-2) );
                                            arr_data_body = [].concat(vstavka_vacio(),vstavka_vacio(), arr_vstavka);
                                            arr_data_body.splice(col1_p_length);
                                        }
                                        //Formula
                                        //2en1
                                        if(chapter == 89){//89:6 => 90:5-6 
                                            addChapterToHead(bq, book, parseInt(chapter)+1);//si el verse vstavka es primero
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+1, form_list_verses(1, col1_p_length) );
                                            var new_arr = [];
                                            arr_vstavka.map((el,i,arr) => {
                                                if(i == 4){
                                                    const p_new = document.createElement('p');
                                                    p_new.innerHTML = arr[i].innerHTML + '<br>' + arr[i+1].innerHTML;
                                                    new_arr.push(p_new); 
                                                }else{
                                                    new_arr.push(el);
                                                }
                                            });
                                            new_arr.splice(5, 0);//elimino verse 6 (90:6) 
                                            //console.log(new_arr);
                                            arr_vstavka = new_arr;
                                            arr_data_body = [].concat(vstavka_vacio(), arr_vstavka);
                                            arr_data_body.splice(col1_p_length);
                                        }
                                        //Formula
                                        //+2: -8
                                        if(chapter == 113){//113: +8 => 115:1-18 | Пс.113:9 => Sal.115:1
                                            addChapterToHead(bq, book, parseInt(chapter)+1);//si el verse vstavka es primero
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+1, form_list_verses(1, 8) );
                                            vstavka2 = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+2, form_list_verses(1, 18) );
                                            arr_data_body = [].concat(arr_vstavka, vstavka2);
                                            addChapterToVerse(arr_data_body, bq, book, 115, 9);//se añade capitulo 115 al verse 9 ruso que es 1 español
                                            arr_data_body.splice(col1_p_length);
                                        }
                                        //Formula
                                        //-2: X
                                        if(chapter == 114){// Пс. 114:1-9 => Sal.116:1-9 
                                            addChapterToHead(bq, book, parseInt(chapter)+2);//si el verse vstavka es primero
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+2, form_list_verses(1, 9) );
                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                            arr_data_body.splice(col1_p_length);
                                        }
                                        if(chapter == 115){// Пс. 115:1-10 => Sal.116:10-19
                                            addChapterToHead(bq, book, parseInt(chapter)+1);//si el verse vstavka es primero
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+1, form_list_verses(10, 19) );
                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                            arr_data_body.splice(col1_p_length);
                                        }
                                        //Formula (especial)
                                        if(chapter == 146){// Пс.146:1-11 => Sal.147:1-11
                                            addChapterToHead(bq, book, parseInt(chapter)+1);//si el verse vstavka es primero
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+1, form_list_verses(1, 11) );
                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                            arr_data_body.splice(col1_p_length);
                                        }
                                        //Formula (especial)
                                        if(chapter == 147){// Пс.147:1-11 => Sal.147:12-20
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(12, 20) );
                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                            arr_data_body.splice(col1_p_length);
                                        }
                                    break;                                 

                                case 19: //Притчи
                                        if(chapter == 4){
                                            //arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length-2) );
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length) );
                                            //arr_data_body = [].concat(arr_vstavka, vstavka_vacio(), vstavka_vacio());
                                            arr_data_body = [].concat(arr_vstavka);
                                            arr_data_body.splice(col1_p_length);
                                        }
                                    break;
                                
                                case 21: //Cantares - Песня песней
                                        if(chapter == 1){
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length) );
                                            //console.log(arr_vstavka);
                                            var new_arr = [];
                                            arr_vstavka.map((el,i,arr) => {
                                                if(i == 0){
                                                    const p_new = document.createElement('p');
                                                    p_new.innerHTML = arr[i].innerHTML + '<br>' + arr[i+1].innerHTML;
                                                    new_arr.push(p_new); 
                                                }else{
                                                    new_arr.push(el);
                                                }
                                            });
                                            new_arr.splice(1, 1);//elimino verse  (Cantar 1:2) 
                                            //console.log(new_arr);
                                            arr_vstavka = new_arr;
                                            //arr_data_body = [].concat(arr_vstavka, vstavka_vacio('arriba'));//mal
                                            arr_data_body = [].concat(arr_vstavka);//ok
                                            arr_data_body.splice(col1_p_length);
                                        }
                                        if(chapter == 6){//06:1-12 => 06:1-12	
                                            arr_data_body.splice(col1_p_length);
                                        }
                                        if(chapter == 7){//07:1 => 06:13	
                                            addChapterToHead(bq, book, 6);//si el verse vstavka es primero
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)-1, 13 );
                                            arr_data_body = [].concat(arr_vstavka, arr_data_body);
                                            addChapterToVerse(arr_data_body, bq, book, 7, 2);//se añade capitulo 7 al verse 2 ruso que es 1 español
                                            arr_data_body.splice(col1_p_length);
                                        }
                                    break;

                                case 22: //Isaías - Исаия
                                        if(chapter == 3){
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length) );
                                            var new_arr = [];
                                            arr_vstavka.map((el,i,arr) => {
                                                if(i == 18){
                                                    const p_new = document.createElement('p');
                                                    p_new.innerHTML = arr[i].innerHTML + '<br>' + arr[i+1].innerHTML;
                                                    new_arr.push(p_new); 
                                                }else{
                                                    new_arr.push(el);
                                                }
                                            });
                                            new_arr.splice(19, 1);//elimino verse  (Is.3:19) 
                                            //console.log(new_arr);
                                            arr_vstavka = new_arr;
                                            //arr_data_body = [].concat(arr_vstavka, vstavka_vacio('arriba'));
                                            arr_data_body = [].concat(arr_vstavka);
                                            arr_data_body.splice(col1_p_length);
                                        }
                                    break;

                                case 26: //Daniel - Даниил
                                        if(chapter == 3){//3:1-30 => 3:1-30
                                            //в Синодальном переводе есть вставочные стихи, которых нет в Исп Библии. Стихи с 24 по 90 включительно переведены с греческого, потому что в еврейском тексте их нет. - Прим. ред.
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, 30) );
                                            vstavka2 = for_parseVerse(Translation, bq, bookModule, book, 4, form_list_verses(1, 3) );
                                            arr_data_body = [].concat(arr_vstavka, vstavka2);
                                            addChapterToVerse(arr_data_body, bq, book, 4, 31);//se añade capitulo 4 al verse 31 ruso que es 1 español
                                            arr_data_body.splice(col1_p_length);
                                        }
                                        if(chapter == 4){
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(4, col1_p_length+3) );
                                            arr_data_body = [].concat(arr_vstavka, arr_data_body);
                                            arr_data_body.splice(col1_p_length);
                                        }
                                    break;

                                case 27: //Oseas - Осия
                                        if(chapter == 14){//14:1 => 13:16 
                                            addChapterToHead(bq, book, 13);//si el verse vstavka es primero
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 13, 16);
                                            arr_data_body = [].concat(arr_vstavka, arr_data_body);
                                            addChapterToVerse(arr_data_body, bq, book, 14, 2);//se añade capitulo 14 al verse 2 ruso que es 1 español
                                            arr_data_body.splice(col1_p_length);
                                        }
                                    break;

                                case 31: //Jonas - Иона
                                        if(chapter == 1){
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, form_list_verses(1, col1_p_length));
                                            arr_data_body = [].concat(arr_vstavka, arr_data_body);
                                            arr_data_body.splice(col1_p_length);
                                        }
                                        if(chapter == 2){// 2:1 => 1:17
                                            addChapterToHead(bq, book, 1);//si el verse vstavka es primero
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 1, 17);
                                            arr_data_body = [].concat(arr_vstavka, arr_data_body);
                                            addChapterToVerse(arr_data_body, bq, book, 2, 2);//se añade capitulo 2 al verse 2 ruso que es 1 español
                                            arr_data_body.splice(col1_p_length);
                                        }
                                    break;

                                case 44: //Romanos - Римлянам
                                        if(chapter == 14){// 14:24-26 => 16:25-27                                       
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 16, form_list_verses(25,  27) );
                                            arr_data_body = arr_data_body.concat(arr_vstavka);
                                            addChapterToVerse(arr_data_body, bq, book, 16, 24);//se añade capitulo 14 al verse 24 ruso que es 1 español
                                            arr_data_body.splice(col1_p_length);
                                        }
                                    break;

                                case 46: //2Corintios - 2-Коринфянам
                                        if(chapter == 13){// 13:12-13 => 13:12 | 13:14 => 13:13                                          
                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length+1) );
                                            var new_arr = [];
                                            arr_vstavka.map((el,i,arr) => {
                                                if(i == 11){
                                                    const p_new = document.createElement('p');
                                                    p_new.innerHTML = arr[i].innerHTML + '<br>' + arr[i+1].innerHTML;
                                                    new_arr.push(p_new); 
                                                }else{
                                                    new_arr.push(el);
                                                }
                                            });
                                            new_arr.splice(12, 1);//elimino verse  (Is.3:19) 
                                            //console.log(new_arr);
                                            arr_vstavka = new_arr;
                                            arr_data_body = [].concat(arr_vstavka, arr_data_body);
                                            arr_data_body.splice(col1_p_length);
                                        }
                                    break;

                                default:
                                    //console.log('default en switch');
                                    break;
                            }//fin switch
                        }
                        //=====================================================//
                        // inicio - Numeración base Rusa - y col's Española
                        //=====================================================//
                        

                        //console.log('arr_data_head');
                        //console.log(arr_data_head);

                        //console.log('arr_data_body');
                        //console.log(arr_data_body);

                        arr_data_body.forEach((el,i)=>{//cambio data-verse
                            el.setAttribute('data-verse', i + 1 );
                        });

                        arr_data_all = arr_data_head.concat(arr_data_body);

                        arr_data_all.forEach((el,i)=>{
                            //document.querySelector('#col1 .colsInner').append(el);
                            //console.log(el);
                            divShow.append(el);
                        });
                        arr_data_head = [];
                        arr_data_body = [];
                        arr_data_all = [];
                        

                        window.iter_i++;
                        if(window.iter_i < window.arr_trans.length){
                            //console.log('iter_i: '+iter_i);
                            //showChapterText3(arr_trans[iter_i],'#'+arr_divShow[iter_i], book, chapter, verseNumber, to_verseNumber, verseView);
                            showChapterText4(arr_trans[iter_i],'#'+arr_divShow[iter_i], book, chapter, verseNumber, to_verseNumber, verseView);
                        }

                    }else{
                        //console.log(' no existe capítulo '+chapter+' del módulo '+book);
                        divShow.innerHTML = '<p class="prim">Текущий модуль Библии не содержит стихов для выбранной книги.</p>';
                    }
                })
                .then(() => {
                    mySizeWindow();
                    mySizeVerse();
                    /*
                    //si es ultimo elemento, añado padding-bottom
                    let p_last = divShow.querySelector('p:last-child');
                    let mb_h = divShow.offsetHeight - p_last.offsetHeight;
                    console.log('mb_h: '+mb_h)
                    p_last.style.marginBottom = mb_h + 'px';
                    p_last.style.background = 'lightgreen';
                    */
                })
                .then(() => {
                    
                    if(verseNumber !== null &&  verseNumber != "" && verseView == null){
                        //console.log('verseNumber !== null &&  verseNumber != "" && verseView == null');

                        //styles of other verses
                        if(to_verseNumber !== null && to_verseNumber != ""){
                            //console.log('hay to_verseNumber');
                            if(parseInt(verseNumber) < parseInt(to_verseNumber)){
                                for (let i = parseInt(verseNumber); i <= parseInt(to_verseNumber); i++) {
                                    Array.from(document.querySelectorAll('[data-verse="'+i+'"]')).forEach(el=>{
                                        if(i == parseInt(verseNumber)) {
                                            el.classList.add('active_first');                
                                        }else if(i == parseInt(to_verseNumber)) {
                                            el.classList.add('active_last');                
                                        }else{
                                            el.classList.add('active_middle');                
                                        }
                                    });
                                }
                            } 
                        }else{
                            //console.log('no hay to_verseNumber. reviso verseNumber');
                            //only one verse of each translation
                            if(verseNumber !== null && verseNumber != ""){
                                document.querySelectorAll('[data-verse="'+verseNumber+'"]').forEach(el=>{
                                    el.classList.add('active_one');
                                });
                            }
                        }                
                    
                        //scroll to verse o verses activos
                        //scrollToVerse(verseNumber, to_verseNumber);
                    }

                    if(verseView !== null && verseView != ""){
                        //console.log('hay verseView');

                        //styles of other verses of col1
                        if(to_verseNumber !== null && to_verseNumber != ""){
                            //console.log('hay to_verseNumber');
                            if(parseInt(verseNumber) < parseInt(to_verseNumber)){
                                for (let i = parseInt(verseNumber); i <= parseInt(to_verseNumber); i++) {
                                    Array.from(document.querySelectorAll('#col1 .colsInner [data-verse="'+i+'"]')).forEach(el=>{
                                        if(i == parseInt(verseNumber)) {
                                            el.classList.add('active_first');                
                                        }else if(i == parseInt(to_verseNumber)) {
                                            el.classList.add('active_last');                
                                        }else{
                                            el.classList.add('active_middle');                
                                        }
                                    });
                                }
                            } 
                        }else{
                            //console.log('no hay to_verseNumber. reviso verseNumber');
                            //only one verse of each translation
                            if(verseNumber !== null && verseNumber != ""){
                                document.querySelectorAll('.colsInner [data-verse="'+verseNumber+'"]').forEach(el=>{
                                    el.classList.add('active_one');
                                });
                            }
                        }                
                    }
                })
                .then(() => {
                    //si hay versiculo marcado con amarillo...
                    if(verseNumber !== null &&  verseNumber != "" ){
                        //scroll to verse o verses activos
                        scrollToVerse(verseNumber, to_verseNumber);

                        //y si con el versiculo marcado existe verse de la vista...
                        if(verseView !== null && verseView != ""){
                            //scroll to verseView
                            scrollToVerseView(verseView);
                        }
                    }else{
                        //console.log('no hay verseNumber');
                        if(verseView !== null && verseView != ""){
                            //scroll to verseView
                            scrollToVerseView(verseView);
                        }
                    }
                    
                })
                .then(() => {
                    mySizeWindow();
                    mySizeVerse();
                    addListenerToPA();//listen links p > a
                });

            }else{//si no está el id de book en el modulo...
                document.querySelectorAll('.colsInner').forEach(el=>{
                    if(el.childElementCount == 0 || el.textContent == ''){
                        var p = document.createElement('p');
                        p.className = 'prim';
                        p.innerHTML = `1. En este módulo no existe el libro indicado.`;
                        el.append(p);
                        //alert(' vacio');
                    }else{
                        //alert(' no vacio');
                    }
                });
            }            
        });

    }//end --- typeof Translation
    else{
        console.log('la traducción no está seleccionada. Translation: '+Translation); 
        //alert(`La traducción no está seleccionada. Selecciónala presionando sobre el símbolo '+' o nombre corto de la traducción.`);       
    }


}


function showChapterText4(Translation, divId, book, chapter, verseNumber = null, to_verseNumber = null, verseView = null){
    var divTrans = document.querySelector(divId+' .colsHead .colsHeadInner .partDesk .desk_trans');//ej: RST+
    var divTransDesk = document.querySelector(divId+' .colsHead .colsHeadInner .partDesk .desk_trans');//ej: RST+
    var divTransMob = document.querySelector(divId+' .colsHead .colsHeadInner .partMob .mob_trans');
    var divShow = document.querySelector(divId+' .colsInner');//donde se ve el texto de la Biblia
    divShow.innerHTML = '';

    var btnStrong = document.querySelector('#btnStrong');
    var btnStrongIsActive = false;
    if(btnStrong.classList.contains('btn_active')){
        btnStrongIsActive = true;
    }

    window.base_ep = document.querySelector('#trans1').getAttribute('data-base_ep');
    //console.log('base_ep: '+base_ep);

    window.arr_data_head = [];//incluye h2 y h4
    window.arr_data_body = [];//incluye p
    window.arr_data_all = [];//incluye todo: h2 y h4 y p
        
    
    if(Translation != null){

                
        var objTrans = arrFavTransObj.find(v => v.Translation === Translation);
        
        //MODO NEW. Cuando  ya está creado el objeto 'objTrans' desde 'arrFavTransObj'
        if(typeof objTrans != 'undefined' && objTrans != null && objTrans != '' ){
            //console.log('objTrans está creado. abajo objTrans: ');
            //console.log(objTrans);


            //saco ajustes de este modulo en json               
            var bq = objTrans;
            //console.log(' abajo bq:');
            //console.log(bq);

            //window.bq = bq;
            if(divTrans != null){
                // divTrans.innerHTML = bq.BibleShortName;
                divTransDesk.innerHTML = (typeof bq != 'undefined') ? bq.BibleShortName : '---';
                divTransMob.innerHTML = (typeof bq != 'undefined') ? bq.BibleShortName : '---';
            }
            
            //si el id de book está entre numero de books del modulo, lo muestro
            if(typeof bq.Books[book] != 'undefined'){//0-65 < 66
                
                //url del libro necesario
                url = `modules/text/${Translation}/${bq.Books[book].PathName}`;//nrt_01.htm';  

                //si no existe objeto lo creo
                if(typeof obj_o[Translation] == 'undefined'){
                    obj_o[Translation] = {};
                    obj_o[Translation].Books = [];
                }

                //si existe objeto con Translation. Saco datos del objeto
                if(typeof obj_o[Translation] != 'undefined'){
                    if(typeof obj_o[Translation].Books != 'undefined'){
                        if(typeof obj_o[Translation].Books[book] != 'undefined'){

                            if(obj_o[Translation].Books[book].fileName == bq.Books[book].PathName && obj_o[Translation].Books[book].fileContent != ''){
                                //console.log(`--- --- starting from myPromise --- divId: ${divId}  --- Translation: ${Translation} `);
                                
                                // Registra el tiempo de inicio
                                const tiempoInicio = new Date().getTime();
                                //console.log('obj_o --- tiempoInicio: '+tiempoInicio);

                                var myPromise = new Promise(function(resolve, reject){
                                    resolve('ok');
                                });

                                myPromise
                                .then((data) => {//data = ok
                                    //console.log(' --- if: ');

                                    if(data == 'ok'){
                                        var bookModule = obj_o[Translation].Books[book].fileContent;
                                    }            
                                    
                                    //console.log(bookModule);
                                    divShow.innerHTML = '';//IMPORTANTE! PARA QUE NO SE DUPLIQUE EL CONTENIDO DE UNA TRANS!
            
                                    var nb = bookModule.split('<h4>');//делю файл на главы
                                    //console.log(nb);
                                    
                                    nb = nb.filter(elm => elm);//удаляю пустые елементы массива
                                    //console.log(nb);
            
                                    //Book
                                    if(bookModule.includes('<h2>')){
                                        var arr_h2 = bookModule.split('<h2>');
            
                                        if(arr_h2[1].includes('</h2>')){
                                            var arr_h2_text = arr_h2[1].split('</h2>');
                                            var BookName = arr_h2_text[0];
                                        }else{
                                            var BookName = arr_h2[1];
                                        }
                                        BookName = (BookName == '') ? bq.Books[book].FullName : BookName ;
                                        //console.log('BookName: '+BookName); 
                                        
                                        //Book
                                        var h2 = document.createElement('h2');
                                        h2.append(BookName);
            
                                        arr_data_head.push(h2);
                                        //console.log(h2);
            
                                        if(bq.HTMLFilter == 'Y'){
                                            h2.innerHTML = htmlEntities(h2.innerHTML)
                                        }
                                    }
            
                                    //si existe el capitulo
                                    if(typeof nb[chapter] !== 'undefined'){
                                        var ChapterId = chapter;
            
                                        var nb_chapter_verses = nb[chapter].split('<p>');
                                        //console.log(nb_chapter_verses);
            
                                        var only_verses_length = nb_chapter_verses.length - 1;
                                        //console.log(`Translation: ${divId} --- divId: ${divId} --- book: ${book} --- chapter: ${chapter} --- only_verses_length: ${only_verses_length}`);
                                        // console.log('only_ divId: '+divId);
            
                                        if(divId == '#col1'){
                                            window.col1_p_length = only_verses_length;
                                        }           
            
            
                                        //Chapter, Verse
                                        nb_chapter_verses.forEach( (el,i) => {
                                            //console.log(el);
                            
                                            //Chapter
                                            if(i == 0){
                                                //console.log('es Chapter: '+el);
            
                                                if(el.includes('</h4>')){
                                                    var arr_h4_text = el.split('</h4>');
                                                    var ChapterText = arr_h4_text[0];
                                                }else{
                                                    var ChapterText = el;
                                                }
                                                //console.log('ChapterText: '+ChapterText);
            
                                                if(ChapterText == ''){
                                                    ChapterText = bq.Books[book].FullName + ' ' + chapter;
                                                }
            
                                                //Chapter
                                                var h4 = document.createElement('h4');
                                                h4.append(ChapterText);
            
                                                arr_data_head.push(h4);
                                                //console.log(h4);
            
                                                //divShow.append(h4);
            
                                                if(bq.HTMLFilter == 'Y'){
                                                    h4.innerHTML = htmlEntities(h4.innerHTML);
                                                }
                                            }
                                            else{//Verse
                                                //console.log('es Verse: '+el);
                            
                                                if(el.includes('</p>')){
                                                    var arr_p_text = el.split('</p>');
                                                    var p_Text = arr_p_text[0];
                                                }else{
                                                    var p_Text = el;
                                                }
                                                //console.log('p_Text: '+p_Text); 
                            
                                                var arr_p = p_Text.split(' ');
                                                var VerseId = arr_p[0];
                                                //console.log('VerseId: '+VerseId);
                            
                                                var VerseText = '';
                                                for(let index = 1; index < arr_p.length; index++){
                                                    VerseText += arr_p[index] + ' ';
                                                }
                                                //console.log('VerseText: '+VerseText);
                            
                                                var p = document.createElement('p');
                                                p.id = Translation +'__'+book + '__' + chapter + '__' + VerseId;
                                                p.setAttribute('data-verse',VerseId);
                                
                                                var a = document.createElement('a');
                                                a.href = '#';
                                                a.classList.add = 'blink';
                                                a.innerHTML = bq.Books[book].ShortNames[0] + ChapterId + ':' + VerseId;
                                                p.append(a);
                                                p.append(' '); 
            
                                                const span_vt = document.createElement('span');
                                                span_vt.className = 'vt';//text de Verse para aplicar HTMLFilter si hay
            
            
                                                //Номера Стронга в стихах (RST+)
                                                if(bq.StrongNumbers == "Y"){
                                                    let t = VerseText;
                                                    var arr_t = t.split(' ');
            
                                                    arr_t.forEach((el,i) => {    
                                                        
                                                        //element of string is Strong Number
                                                        if(!isNaN(parseInt(el)) || el == '0'){//number                         
                                                            const span_strong = document.createElement('span');
                                                            if(btnStrongIsActive){
                                                                span_strong.className = 'strong show strongActive'; 
                                                            }else{
                                                                span_strong.className = 'strong'; 
                                                            }
                                                            let last_char = (el.length > 1) ? el.charAt(el.length-1) : "" ;
            
                                                            //si ultimo carácter es string
                                                            if(last_char != '' && isNaN(last_char)){
                                                                let el_number = el.substring(0,el.length-1);
                                                                let el_string = last_char;
                                                                span_strong.innerHTML = el_number;
                                                                p.append(span_strong);
                                                                p.append(el_string);
                                                            }else{//es number
                                                                span_strong.innerHTML = el;
                                                                p.append(span_strong);
                                                            }
            
                                                        }else{//is word
                                                            p.append(' ');
                                                            if(btnStrongIsActive){
                                                                if(el.includes('<S>')){
                                                                    el = el.replace('<S>','<S class="show strongActive">');
                                                                }
                                                            }
                                                            p.append(el);
                                                        }
                                                    });
                                                    p.innerHTML.trim();
            
                                                    //console.log('antes: ' + p.innerHTML);
                                                    if(bq.HTMLFilter == 'Y'){
                                                        p.innerHTML = htmlEntities(p.innerHTML);
                                                    }
                                                    //console.log('despues: '+p.innerHTML);
            
                                                    if(btnStrongIsActive && p.innerHTML.includes('strongActive')){
                                                        p.querySelectorAll('.strongActive').forEach((el)=>{
                                                            el.addEventListener('click', ()=>{
                                                                //console.log('1. bq.StrongFirstLetter: '+bq.StrongFirstLetter);
                                                                //console.log('1. book: '+book);
                                                                console.log('m --- 1. el.innerHTML: '+el.innerHTML);
                                                                var paramfirstLetter = (bq.StrongFirstLetter == 'Y') ? 'Y' : 'N' ;
            
                                                                if(el.innerHTML.includes('H') || el.innerHTML.includes('G')){//rstStrongRed G3056 /H3056
                                                                    getStrongNumber(el.innerHTML, null, paramfirstLetter);
                                                                }else{//rstStrong
                                                                    lang = (book >= 39) ? 'Grk' : 'Heb' ;
                                                                    getStrongNumber(el.innerHTML, lang, paramfirstLetter);
                                                                }
                                                            });
                                                        }); 
                                                    }
            
                                                    arr_data_body.push(p);
                                                    //console.log(p);
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
            
                                                            const span_t = document.createElement('span');
                                                            span_t.className = 'tooltip';
                                                            span_t.setAttribute('data-tooltip',text_Note);
                                                            span_t.innerHTML = bq.NoteSign;
            
                                                            span_t.addEventListener('mouseenter', function(){
                                                                showTooltip(this);
                                                            });
                                                            span_t.addEventListener('mouseleave', function(){
                                                                hideTooltip(this);
                                                            });
                                                            /*
                                                            //antes
                                                            p.append(before_Note);
                                                            p.append(span_t);
                                                            p.append(after_Note);
                                                            */
            
                                                            before_Note = (bq.HTMLFilter == 'Y') ? htmlEntities(before_Note) : before_Note ;
                                                            span_vt.append(before_Note);
                                                            span_vt.append(span_t);
                                                            after_Note = (bq.HTMLFilter == 'Y') ? htmlEntities(after_Note) : after_Note ;
                                                            span_vt.append(after_Note);
                                                            //span_vt.innerHTML = (bq.HTMLFilter == 'Y') ? htmlEntities(span_vt.innerHTML) : span_vt.innerHTML ;
            
                                                            p.append(span_vt);//antes
                                                        }
                                                    }else{
                                                        //p.append(VerseText);//antes
                                                        span_vt.append(VerseText);
                                                        p.append(span_vt);
            
                                                        if(bq.HTMLFilter == 'Y'){
                                                            p.innerHTML = htmlEntities(p.innerHTML);
                                                        }
                                                    }
                                                    //p.append(span_vt);//antes
                                                    //SIMULTANEAMENTE CON '*' Y '<' Y '> ' la función htmlEntities() DESHABILITA tooltip.
            
                                                    arr_data_body.push(p);
                                                    //console.log(p);
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
            
                                                        const span_title = document.createElement('span');
                                                        span_title.className = 'verse_title';
                                                        span_title.innerHTML = text_Title;
            
                                                        p.append(before_Title);
                                                        p.append(span_title);
                                                        p.append(after_Title);
                                                    }else{
                                                        p.append(VerseText);
                                                    }
            
                                                    arr_data_body.push(p);
                                                    //console.log(p);
            
                                                    if(bq.HTMLFilter == 'Y'){
                                                        p.innerHTML = htmlEntities(p.innerHTML);
                                                    }
                                                }
            
                                                //Нет ни Номеров Стронга, ни Примечаний ни Оглавлений
                                                if(bq.StrongNumbers == "N" && bq.Notes == 'N' && bq.Titles == 'N'){
                                                    //p.append(VerseText);//antes
                                                    span_vt.append(VerseText);
                                                    p.append(span_vt);
            
                                                    arr_data_body.push(p);
                                                    //console.log(p);
                                                    
                                                    if(bq.HTMLFilter == 'Y'){
                                                        p.innerHTML = htmlEntities(p.innerHTML);
                                                    }
                                                }        
                                                
                                            }
                            
                                        });
                                        
                                        
                                        //Posle forEach...
                                        //=====================================================//
                                        // 1. inicio - Numeración base Española - y col's Rusa
                                        //=====================================================//
                                        if(base_ep == 'Y' && bq.EnglishPsalms == 'N'){//numeración rusa
                                            //console.log('Numeración base es Española - y cols es Rusa');
                                            //var col1_p_length = document.querySelectorAll('#col1 .colsInner p').length;//antes
                                            var arr_vstavka = [];
                                            var vstavka2 = [];
                                            
                                            //Miro la traducción con EnglishPsalms
                                            switch (parseInt(book)) {
            
                                                case 3: //Числа
                                                        if(chapter == 12){//Числа 12:16 => Num. 13:1
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 13, 1);//add Num. 13:1
                                                            arr_data_body = arr_data_body.concat(arr_vstavka);
                                                            addChapterToVerse(arr_data_body, bq, book, 13, 16);//se añade capitulo 13 al verse 13 español que es 1 ruso
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                        if(chapter == 13){//13:1-33 => 13: +1
                                                            arr_data_body.splice(0, 1);//[p....] - elimino primer versículo
                                                        }
                                                    break;
            
                                                case 5: //Иисус Навин
                                                        if(chapter == 5){//Ис.Нав.6:1 => Josue 5:16 | 6:2-27 =>	6: -1
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                        if(chapter == 6){//Ис.Нав.6:1 => Josue 5:16 | 6:2-27 =>	6: -1
                                                            addChapterToHead(bq, book, 5);//si el verse vstavka es primero
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 5, 16);//add Josue 5:16
                                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                                            addChapterToVerse(arr_data_body, bq, book, 6, 2);//se añade capitulo 6 al verse 2 español que es 1 ruso
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                    break; 
                                                    
                                                case 8: //1Samuel (1Царств) 
                                                        if(chapter == 20){//20:42-а	=> 20:42:00 | 20:42-б => 20:43:00
                                                            //1 verse contiene 2 en ruso
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 20, form_list_verses(1, col1_p_length+1) );                                       
                                                            let arr_mezclado = mergeVerses(arr_vstavka, 42);//se meclan 42 y el siguiente 43.
                                                            arr_data_body = [].concat(arr_mezclado, arr_data_body);
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                        if(chapter == 23){//23:29 => 24:1
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 24, 1 );
                                                            arr_data_body = arr_data_body.concat(arr_vstavka);//añado al final un versiculo
                                                            addChapterToVerse(arr_data_body, bq, book, 24, 29);//se añade capitulo 24 al verse 29 español que es 1 ruso
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                        if(chapter == 24){//24:1-22	=> 24: +1
                                                            arr_data_body.splice(0, 1);//[p....] - elimino primer versículo
                                                        }
                                                    break; 
                                                
                                                case 17: //Job 
                                                        if(chapter == 39){
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                        if(chapter == 40){//40:1-5 => 39:31-35 | 40:6-24 =>	40: -5
                                                            addChapterToHead(bq, book, 39);//si el verse vstavka es primero
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 39, form_list_verses(31, 35) );
                                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                                            addChapterToVerse(arr_data_body, bq, book, 40, 6);//se añade capitulo 40 al verse 6 español que es 1 ruso
                                                            arr_data_body.splice(col1_p_length);//[p....] - elimino versículos sobrantes a partir de el último hasta el fin
                                                        }
                                                        if(chapter == 41){//41:1-8 => 40:20-27 | 41:9-34 =>	41: -8
                                                            addChapterToHead(bq, book, 40);//si el verse vstavka es primero
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 40, form_list_verses(20, 27) );
                                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                                            addChapterToVerse(arr_data_body, bq, book, 41, 9);//se añade capitulo 41 al verse 9 español que es 1 ruso
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                    break; 
            
                                                case 18: //Psalmos 
                                                        if(chapter >= 3 && chapter <= 8){//3:1 - 9:20 =>	Х : +1 *
                                                            arr_data_body.splice(0, 1);//[p....] - elimino primer versículo
                                                        }
                                                        if(chapter == 9){//3:1 - 9:20 => Х : +1 *
                                                            arr_data_body.splice(0, 1);//[p....] - elimino primer versículo
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                        if(chapter == 10){//10:2-18 => 9: +21
                                                            addChapterToHead(bq, book, 9);//si el verse vstavka es primero
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 9, form_list_verses(22, 39) );
                                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                        //Formula Esp => Rus //Ps.X:1 => Пс.X-1:1 
                                                        //-1 : Х
                                                        if(
                                                            (chapter == 11) || 
                                                            (chapter >= 14 && chapter <= 17) || 
                                                            (chapter >= 23 && chapter <= 29) || 
                                                            (chapter >= 32 && chapter <= 33) || 
                                                            (chapter == 35) || 
                                                            (chapter == 37) || 
                                                            (chapter == 43) || 
                                                            (chapter == 50) || 
                                                            (chapter == 66) || 
                                                            (chapter >= 71 && chapter <= 74) || 
                                                            (chapter >= 78 && chapter <= 79) || 
                                                            (chapter == 82) || 
                                                            (chapter == 86) || 
                                                            (chapter == 87) || 
                                                            (chapter == 91) || 
                                                            (chapter >= 93 && chapter <= 101) || 
                                                            (chapter >= 103 && chapter <= 107) || 
                                                            (chapter >= 109 && chapter <= 114) || 
                                                            (chapter >= 117 && chapter <= 146)
                                                        ){
                                                            addChapterToHead(bq, book, parseInt(chapter)-1);//si el verse vstavka es primero
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-1, form_list_verses(1, col1_p_length) );
                                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                        //Formula Esp => Rus //Ps.X:1 => Пс.X-1:2 
                                                        //-1 : +1
                                                        if(
                                                            (chapter == 12) || 
                                                            (chapter >= 18 && chapter <= 22) || 
                                                            (chapter >= 30 && chapter <= 31) || 
                                                            (chapter == 34) || 
                                                            (chapter == 36) || 
                                                            (chapter >= 38 && chapter <= 42) || 
                                                            (chapter >= 44 && chapter <= 49) || 
                                                            (chapter == 53) || 
                                                            (chapter >= 55 && chapter <= 59) || 
                                                            (chapter >= 61 && chapter <= 65) || 
                                                            (chapter >= 67 && chapter <= 70) || 
                                                            (chapter >= 75 && chapter <= 77) || 
                                                            (chapter >= 80 && chapter <= 81) || 
                                                            (chapter >= 83 && chapter <= 85) || 
                                                            (chapter >= 88 && chapter < 90) || 
                                                            (chapter == 92) || 
                                                            (chapter == 102) || 
                                                            (chapter == 108)
                                                        ){
                                                            addChapterToHead(bq, book, parseInt(chapter)-1);//si el verse vstavka es primero
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-1, form_list_verses(1+1, col1_p_length+1) );// desde 2 versiculo
                                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                        //Formula
                                                        //2en1
                                                        if(chapter == 13){//13:05 => 12:6-а | 13:06 => 12:6-б
                                                            addChapterToHead(bq, book, parseInt(chapter)-1);//si el verse vstavka es primero
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-1, form_list_verses(2, 6) );// desde 2 versiculo
                                                            arr_data_body = arr_vstavka.concat(vstavka_vacio('arriba'),arr_data_body);
                                                            arr_data_body.splice(col1_p_length);//1 verse español contiene 2 en ruso
                                                        }
                                                        //Formula
                                                        //-1 : +2 *
                                                        if(
                                                            (chapter >= 51 && chapter <= 52) ||
                                                            (chapter == 54) || 
                                                            (chapter == 60)
                                                        ){
                                                            addChapterToHead(bq, book, parseInt(chapter)-1);//si el verse vstavka es primero
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-1, form_list_verses(1+2, col1_p_length+2) );// desde 3 versiculo
                                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                        //Formula
                                                        //2en1
                                                        if(chapter == 90){//90:05 => 89:6-а | 90:06	=> 89:6-б 
                                                            addChapterToHead(bq, book, parseInt(chapter)-1);//si el verse vstavka es primero
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-1, form_list_verses(2, col1_p_length) );
                                                            let p_vacio = document.createElement('p');
                                                            p_vacio.className = 'prim';
                                                            p_vacio.innerHTML = 'смотри стих выше...';
                                                            arr_vstavka.splice(5,0,p_vacio);
                                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                        //Formula
                                                        //-2: +8
                                                        if(chapter == 115){//115:1-18 => 113: +8
                                                            addChapterToHead(bq, book, parseInt(chapter)-2);//si el verse vstavka es primero
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-2, form_list_verses(1+8, col1_p_length+8) );// desde 9 versiculo
                                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                        //Formula
                                                        //-2: X
                                                        if(chapter == 116){//116:1-9 => 114: Х
                                                            addChapterToHead(bq, book, parseInt(chapter)-2);//si el verse vstavka es primero
                                                            // Sal.116:1-9 => Пс. 114:1-9
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-2, form_list_verses(1, 9) );
                                                            // Sal.116:10-19 => Пс. 115:1-10
                                                            vstavka2 = for_parseVerse(Translation, bq, bookModule, book, chapter-1, form_list_verses(1, 10) );
                                                            arr_vstavka = arr_vstavka.concat(vstavka2);
                                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                                            addChapterToVerse(arr_data_body, bq, book, 115, 10);//se añade capitulo 115 al verse 10 español que es 1 ruso
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                        //Formula
                                                        //-1: X (especial)
                                                        if(chapter == 147){//147:1-11 => 146:1-11
                                                            addChapterToHead(bq, book, parseInt(chapter)-1);//si el verse vstavka es primero
                                                            // Sal.147:1-11 => Пс.146:1-11
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-1, form_list_verses(1, 11) );
                                                            // Sal.147:12-20 => Пс. 147:1-9
                                                            vstavka2 = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, 9) );
                                                            arr_vstavka = arr_vstavka.concat(vstavka2);
                                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                                            addChapterToVerse(arr_data_body, bq, book, 147, 12);//se añade capitulo 147 al verse 12 español que es 1 ruso
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                    break;
            
                                                case 19: //Притчи
                                                        if(chapter == 4){
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length) );
                                                            arr_data_body = [].concat(arr_vstavka);
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                    break;
                                            
                                                case 21: //Cantares - Песня песней
                                                        if(chapter == 1){
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length) );
                                                            let p_vacio = document.createElement('p');
                                                            p_vacio.className = 'prim';
                                                            p_vacio.innerHTML = 'заглавие...';
                                                            arr_vstavka.splice(0,0,p_vacio);
                                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                        if(chapter == 6){//06:13 =>	07:1
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+1, 1 );
                                                            arr_data_body = arr_data_body.concat(arr_vstavka);
                                                            addChapterToVerse(arr_data_body, bq, book, 7, 13);//se añade capitulo 7 al verse 13 español que es 1 ruso
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                        if(chapter == 7){//7:1-13 => 7: +1 (7:2-14)
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1+1, col1_p_length+1) );
                                                            arr_data_body = [].concat(arr_vstavka,arr_data_body);
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                    break;
            
                                                case 22: //Isaías - Исаия
                                                        if(chapter == 3){
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length) );
                                                            let p_vacio = document.createElement('p');
                                                            p_vacio.className = 'prim';
                                                            p_vacio.innerHTML = 'смотри стих выше...';
                                                            arr_vstavka.splice(19,0,p_vacio);
                                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                    break;
            
                                                case 26: //Daniel - Даниил
                                                        if(chapter == 3){//3:1-30 => 3:1-30
                                                            //в Синодальном переводе есть вставочные стихи, которых нет в Исп Библии. Стихи с 24 по 90 включительно переведены с греческого, потому что в еврейском тексте их нет. - Прим. ред.
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length) );
                                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                        if(chapter == 4){//4:1-3 => 3:31-33 | 4:4-37 => 4: -3
                                                            addChapterToHead(bq, book, parseInt(chapter)-1);//si el verse vstavka es primero
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-1, form_list_verses(31, 33) );
                                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                                            addChapterToVerse(arr_data_body, bq, book, 4, 4);//se añade capitulo 4 al verse 4 español que es 1 ruso
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                    break;
            
                                                case 27: //Oseas - Осия
                                                        if(chapter == 13){//13:16 => 14:1
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 14, 1);
                                                            arr_data_body = arr_data_body.concat(arr_vstavka);
                                                            addChapterToVerse(arr_data_body, bq, book, 14, 16);//se añade capitulo 14 al verse 16 español que es 1 ruso
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                        if(chapter == 14){//14:1-9 => 14:2-10
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(2, 10) );
                                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                    break;
            
                                                case 31: //Jonas - Иона
                                                        if(chapter == 1){//1:17 => 2:1
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 2, 1);
                                                            arr_data_body = arr_data_body.concat(arr_vstavka);
                                                            addChapterToVerse(arr_data_body, bq, book, 2, 17);//se añade capitulo 2 al verse 17 español que es 1 ruso
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                        if(chapter == 2){//2:1-10 => 2:2-11
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(2, 11) );
                                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                    break;
            
                                                case 44: //Romanos - Римлянам
                                                        //book = book + 7;// 44 + 7 = 51 //Romanos - Римлянам
                                                        if(chapter == 16){// 16:25-27 => 14:24-26                                          
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-2, form_list_verses(24,  26) );
                                                            arr_data_body = arr_data_body.concat(arr_vstavka);
                                                            addChapterToVerse(arr_data_body, bq, book, 14, 25);//se añade capitulo 14 al verse 25 español que es 24-26 ruso
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                    break;
            
                                                case 46: //2Corintios - 2-Коринфянам
                                                        //book = book + 7;// 46 + 7 = 53 //2Corintios - 2-Коринфянам
                                                        if(chapter == 13){// 13:12-13 => 13:12 | 13:14 => 13:13                                          
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length-1) );
                                                            let p_vacio = document.createElement('p');
                                                            p_vacio.className = 'prim';
                                                            p_vacio.innerHTML = 'смотри стих выше...';
                                                            arr_vstavka.splice(12,0,p_vacio);
                                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                    break;
                                                
                                                default:
                                                    //console.log('default en switch');
                                                    break;
                                            }//fin switch
                                        }
                                        //=====================================================//
                                        // fin - Numeración base Española - y col's Rusa
                                        //=====================================================//
                                        
                                        
                                        //=====================================================//
                                        // 2. inicio - Numeración base Rusa - y col's Española
                                        //=====================================================//
                                        if(base_ep == 'N' && bq.EnglishPsalms == 'Y'){//numeración Española
                                            //console.log('Numeración base Rusa - y cols Española');
                                            //var col1_p_length = document.querySelectorAll('#col1 .colsInner p').length;//antes
                                            //console.log(' --- dentro de bloque Numeración base Rusa - y cols Española --- col1_p_length: '+col1_p_length);//test
                                            var arr_vstavka = [];
                                            var vstavka2 = [];
                                            
                                            //Miro la traducción con EnglishPsalms
                                            switch (parseInt(book)) {
            
                                                case 3: //Числа
                                                        if(chapter == 12){//12:X => 12:X (quito ultimo verse)
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length) );
                                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                        if(chapter == 13){//Числа 13:1 => Num.12:16 
                                                            addChapterToHead(bq, book, 12);//si el verse vstavka es primero
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 12, 16);
                                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                                            addChapterToVerse(arr_data_body, bq, book, 13, 2);//result Num.13:1 => Números 13 Num.13:1
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                    break;
            
                                                case 5: //Иисус Навин
                                                        if(chapter == 5){//Иис.Нав.5:16 => Jos.6:1                                    
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 6, 1);
                                                            arr_data_body = arr_data_body.concat(arr_vstavka);
                                                            addChapterToVerse(arr_data_body, bq, book, 6, 16);//se añade capitulo 5 al verse 16 ruso que es 1 español
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                        if(chapter == 6){//Иис.Нав.6:1 => Jos.6:2 ... Иис.Нав.6:26 => Jos.6:27
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1+1, col1_p_length+1));
                                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                    break; 
                                                    
                                                case 8: //1Samuel (1Царств) 
                                                        if(chapter == 20){//1Цар.20:42-43 => 1Sam 20:42
                                                            //1 verse contiene 2 en ruso
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length-1) );
                                                            arr_data_body = [].concat(arr_vstavka,vstavka_vacio('arriba'));
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                        if(chapter == 23){//
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length) );
                                                            arr_data_body = arr_data_body.concat(arr_vstavka);
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                        if(chapter == 24){//1Цар.24:1 => 1S.23:29
                                                            addChapterToHead(bq, book, 23);//si el verse vstavka es primero
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 23, 29 );//cojo último verse del capitulo anterior
                                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                                            addChapterToVerse(arr_data_body, bq, book, 24, 2);//se añade capitulo 24 al verse 2 ruso que es 1 español
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                    break; 
                                                
                                                case 17: //Job 
                                                        if(chapter == 39){//39:31-35 => 40:1-5  | 40:6-24 =>	40: -5
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 40, form_list_verses(1, 5) );
                                                            arr_data_body = arr_data_body.concat(arr_vstavka);
                                                            addChapterToVerse(arr_data_body, bq, book, 40, 31);//se añade capitulo 40 al verse 31 ruso que es 1 español
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                        if(chapter == 40){//40:1-19 => 40:6-24 
                                                            //console.log(arr_data_body);//arr_data_body trae todos los verses del capitulo  40:1-24
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 40, form_list_verses(6, 24) );//trae 8 verses 40:6-24
                                                            //console.log(arr_vstavka);//trae 8 verses 40:6-24
                                                            vstavka2 = for_parseVerse(Translation, bq, bookModule, book, 41, form_list_verses(1, 8) );//trae 8 verses 41:1-8
                                                            //console.log(vstavka2);
                                                            arr_data_body = [].concat(arr_vstavka, vstavka2);//[]. reescribe y une 40:6-24 con 41:1-8 
                                                            //console.log(arr_data_body);
                                                            addChapterToVerse(arr_data_body, bq, book, 41, 20);//se añade capitulo 41 al verse 20 ruso que es 1 español                                        
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                        if(chapter == 41){//40:1-26 => 41:9-34
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 41, form_list_verses(9, 34) );
                                                            arr_data_body = [].concat(arr_vstavka);
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                    break; 
            
                                                case 18: //Psalmos 
                                                        if(chapter >= 3 && chapter <= 8){//3:1 - 9:20 =>	Х : +1 *
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length-1) );
                                                            arr_data_body = [].concat(vstavka_vacio(), arr_vstavka);
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                        if(chapter == 9){//3:1 - 9:20 => Х : +1 *
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, 20) );
                                                            vstavka2 = for_parseVerse(Translation, bq, bookModule, book, 10, form_list_verses(1, 18) );
                                                            arr_data_body = [].concat(vstavka_vacio(), arr_vstavka, vstavka2);
                                                            addChapterToVerse(arr_data_body, bq, book, 10, 22);//se añade capitulo 10 al verse 22 ruso que es 1 español 
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                        //Formula Esp => Rus //Пс.X:1 => Ps.X+1:1 
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
                                                            (chapter >= 116 && chapter <= 138) ||
                                                            (chapter >= 140 && chapter <= 145)
                                                        ){
                                                            addChapterToHead(bq, book, parseInt(chapter)+1);//si el verse vstavka es primero
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+1, form_list_verses(1, col1_p_length) );
                                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                        //Formula Esp => Rus //Пс.X+1:2 => Ps.X:1 //добавляю пустой стих сначала в исп перевод
                                                        //+1 : -1
                                                        if(
                                                            (chapter == 11) || 
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
                                                            (chapter == 139)
                                                        ){
                                                            addChapterToHead(bq, book, parseInt(chapter)+1);//si el verse vstavka es primero
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+1, form_list_verses(1, col1_p_length-1) );
                                                            arr_data_body = [].concat(vstavka_vacio(), arr_vstavka);
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                        //Formula
                                                        //+1 : -2 | Ej.:  50:0 => 51:1 | 50:1 => 51:2
                                                        if(
                                                            (chapter >= 50 && chapter <= 51) ||
                                                            (chapter == 53) || 
                                                            (chapter == 59)
                                                        ){
                                                            addChapterToHead(bq, book, parseInt(chapter)+1);//si el verse vstavka es primero
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+1, form_list_verses(1, col1_p_length-2) );
                                                            arr_data_body = [].concat(vstavka_vacio(),vstavka_vacio(), arr_vstavka);
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                        //Formula
                                                        //2en1
                                                        if(chapter == 89){//89:6 => 90:5-6 
                                                            addChapterToHead(bq, book, parseInt(chapter)+1);//si el verse vstavka es primero
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+1, form_list_verses(1, col1_p_length) );
                                                            var new_arr = [];
                                                            arr_vstavka.map((el,i,arr) => {
                                                                if(i == 4){
                                                                    const p_new = document.createElement('p');
                                                                    p_new.innerHTML = arr[i].innerHTML + '<br>' + arr[i+1].innerHTML;
                                                                    new_arr.push(p_new); 
                                                                }else{
                                                                    new_arr.push(el);
                                                                }
                                                            });
                                                            new_arr.splice(5, 0);//elimino verse 6 (90:6) 
                                                            //console.log(new_arr);
                                                            arr_vstavka = new_arr;
                                                            arr_data_body = [].concat(vstavka_vacio(), arr_vstavka);
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                        //Formula
                                                        //+2: -8
                                                        if(chapter == 113){//113: +8 => 115:1-18 | Пс.113:9 => Sal.115:1
                                                            addChapterToHead(bq, book, parseInt(chapter)+1);//si el verse vstavka es primero
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+1, form_list_verses(1, 8) );
                                                            vstavka2 = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+2, form_list_verses(1, 18) );
                                                            arr_data_body = [].concat(arr_vstavka, vstavka2);
                                                            addChapterToVerse(arr_data_body, bq, book, 115, 9);//se añade capitulo 115 al verse 9 ruso que es 1 español
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                        //Formula
                                                        //-2: X
                                                        if(chapter == 114){// Пс. 114:1-9 => Sal.116:1-9 
                                                            addChapterToHead(bq, book, parseInt(chapter)+2);//si el verse vstavka es primero
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+2, form_list_verses(1, 9) );
                                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                        if(chapter == 115){// Пс. 115:1-10 => Sal.116:10-19
                                                            addChapterToHead(bq, book, parseInt(chapter)+1);//si el verse vstavka es primero
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+1, form_list_verses(10, 19) );
                                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                        //Formula (especial)
                                                        if(chapter == 146){// Пс.146:1-11 => Sal.147:1-11
                                                            addChapterToHead(bq, book, parseInt(chapter)+1);//si el verse vstavka es primero
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+1, form_list_verses(1, 11) );
                                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                        //Formula (especial)
                                                        if(chapter == 147){// Пс.147:1-11 => Sal.147:12-20
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(12, 20) );
                                                            arr_data_body = arr_vstavka.concat(arr_data_body);
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                    break;                                 
            
                                                case 19: //Притчи
                                                        if(chapter == 4){
                                                            //arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length-2) );
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length) );
                                                            //arr_data_body = [].concat(arr_vstavka, vstavka_vacio(), vstavka_vacio());
                                                            arr_data_body = [].concat(arr_vstavka);
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                    break;
                                                
                                                case 21: //Cantares - Песня песней
                                                        if(chapter == 1){
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length) );
                                                            //console.log(arr_vstavka);
                                                            var new_arr = [];
                                                            arr_vstavka.map((el,i,arr) => {
                                                                if(i == 0){
                                                                    const p_new = document.createElement('p');
                                                                    p_new.innerHTML = arr[i].innerHTML + '<br>' + arr[i+1].innerHTML;
                                                                    new_arr.push(p_new); 
                                                                }else{
                                                                    new_arr.push(el);
                                                                }
                                                            });
                                                            new_arr.splice(1, 1);//elimino verse  (Cantar 1:2) 
                                                            //console.log(new_arr);
                                                            arr_vstavka = new_arr;
                                                            //arr_data_body = [].concat(arr_vstavka, vstavka_vacio('arriba'));//mal
                                                            arr_data_body = [].concat(arr_vstavka);//ok
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                        if(chapter == 6){//06:1-12 => 06:1-12	
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                        if(chapter == 7){//07:1 => 06:13	
                                                            addChapterToHead(bq, book, 6);//si el verse vstavka es primero
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)-1, 13 );
                                                            arr_data_body = [].concat(arr_vstavka, arr_data_body);
                                                            addChapterToVerse(arr_data_body, bq, book, 7, 2);//se añade capitulo 7 al verse 2 ruso que es 1 español
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                    break;
            
                                                case 22: //Isaías - Исаия
                                                        if(chapter == 3){
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length) );
                                                            var new_arr = [];
                                                            arr_vstavka.map((el,i,arr) => {
                                                                if(i == 18){
                                                                    const p_new = document.createElement('p');
                                                                    p_new.innerHTML = arr[i].innerHTML + '<br>' + arr[i+1].innerHTML;
                                                                    new_arr.push(p_new); 
                                                                }else{
                                                                    new_arr.push(el);
                                                                }
                                                            });
                                                            new_arr.splice(19, 1);//elimino verse  (Is.3:19) 
                                                            //console.log(new_arr);
                                                            arr_vstavka = new_arr;
                                                            //arr_data_body = [].concat(arr_vstavka, vstavka_vacio('arriba'));
                                                            arr_data_body = [].concat(arr_vstavka);
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                    break;
            
                                                case 26: //Daniel - Даниил
                                                        if(chapter == 3){//3:1-30 => 3:1-30
                                                            //в Синодальном переводе есть вставочные стихи, которых нет в Исп Библии. Стихи с 24 по 90 включительно переведены с греческого, потому что в еврейском тексте их нет. - Прим. ред.
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, 30) );
                                                            vstavka2 = for_parseVerse(Translation, bq, bookModule, book, 4, form_list_verses(1, 3) );
                                                            arr_data_body = [].concat(arr_vstavka, vstavka2);
                                                            addChapterToVerse(arr_data_body, bq, book, 4, 31);//se añade capitulo 4 al verse 31 ruso que es 1 español
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                        if(chapter == 4){
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(4, col1_p_length+3) );
                                                            arr_data_body = [].concat(arr_vstavka, arr_data_body);
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                    break;
            
                                                case 27: //Oseas - Осия
                                                        if(chapter == 14){//14:1 => 13:16 
                                                            addChapterToHead(bq, book, 13);//si el verse vstavka es primero
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 13, 16);
                                                            arr_data_body = [].concat(arr_vstavka, arr_data_body);
                                                            addChapterToVerse(arr_data_body, bq, book, 14, 2);//se añade capitulo 14 al verse 2 ruso que es 1 español
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                    break;
            
                                                case 31: //Jonas - Иона
                                                        if(chapter == 1){
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, form_list_verses(1, col1_p_length));
                                                            arr_data_body = [].concat(arr_vstavka, arr_data_body);
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                        if(chapter == 2){// 2:1 => 1:17
                                                            addChapterToHead(bq, book, 1);//si el verse vstavka es primero
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 1, 17);
                                                            arr_data_body = [].concat(arr_vstavka, arr_data_body);
                                                            addChapterToVerse(arr_data_body, bq, book, 2, 2);//se añade capitulo 2 al verse 2 ruso que es 1 español
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                    break;
            
                                                case 44: //Romanos - Римлянам
                                                        if(chapter == 14){// 14:24-26 => 16:25-27                                       
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 16, form_list_verses(25,  27) );
                                                            arr_data_body = arr_data_body.concat(arr_vstavka);
                                                            addChapterToVerse(arr_data_body, bq, book, 16, 24);//se añade capitulo 14 al verse 24 ruso que es 1 español
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                    break;
            
                                                case 46: //2Corintios - 2-Коринфянам
                                                        if(chapter == 13){// 13:12-13 => 13:12 | 13:14 => 13:13                                          
                                                            arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length+1) );
                                                            var new_arr = [];
                                                            arr_vstavka.map((el,i,arr) => {
                                                                if(i == 11){
                                                                    const p_new = document.createElement('p');
                                                                    p_new.innerHTML = arr[i].innerHTML + '<br>' + arr[i+1].innerHTML;
                                                                    new_arr.push(p_new); 
                                                                }else{
                                                                    new_arr.push(el);
                                                                }
                                                            });
                                                            new_arr.splice(12, 1);//elimino verse  (Is.3:19) 
                                                            //console.log(new_arr);
                                                            arr_vstavka = new_arr;
                                                            arr_data_body = [].concat(arr_vstavka, arr_data_body);
                                                            arr_data_body.splice(col1_p_length);
                                                        }
                                                    break;
            
                                                default:
                                                    //console.log('default en switch');
                                                    break;
                                            }//fin switch
                                        }
                                        //=====================================================//
                                        // inicio - Numeración base Rusa - y col's Española
                                        //=====================================================//
                                        
            
                                        //console.log('arr_data_head');
                                        //console.log(arr_data_head);
            
                                        //console.log('arr_data_body');
                                        //console.log(arr_data_body);
            
                                        arr_data_body.forEach((el,i)=>{//cambio data-verse
                                            el.setAttribute('data-verse', i + 1 );
                                        });
            
                                        arr_data_all = arr_data_head.concat(arr_data_body);
            
                                        arr_data_all.forEach((el,i)=>{
                                            //document.querySelector('#col1 .colsInner').append(el);
                                            //console.log(el);
                                            divShow.append(el);
                                        });
                                        arr_data_head = [];
                                        arr_data_body = [];
                                        arr_data_all = [];
                                        
            
                                        window.iter_i++;
                                        if(window.iter_i < window.arr_trans.length){
                                            //console.log('iter_i: '+iter_i);
                                            //showChapterText3(arr_trans[iter_i],'#'+arr_divShow[iter_i], book, chapter, verseNumber, to_verseNumber, verseView);
                                            showChapterText4(arr_trans[iter_i],'#'+arr_divShow[iter_i], book, chapter, verseNumber, to_verseNumber, verseView);
                                        }
            
                                    }else{
                                        //console.log(' no existe capítulo '+chapter+' del módulo '+book);
                                        divShow.innerHTML = '<p class="prim">Текущий модуль Библии не содержит стихов для выбранной книги.</p>';
                                    }
                                })
                                .then(() => {
                                    mySizeWindow();
                                    mySizeVerse();
                                    /*
                                    //si es ultimo elemento, añado padding-bottom
                                    let p_last = divShow.querySelector('p:last-child');
                                    let mb_h = divShow.offsetHeight - p_last.offsetHeight;
                                    console.log('mb_h: '+mb_h)
                                    p_last.style.marginBottom = mb_h + 'px';
                                    p_last.style.background = 'lightgreen';
                                    */
                                })
                                .then(() => {
                                    
                                    if(verseNumber !== null &&  verseNumber != "" && verseView == null){
                                        //console.log('verseNumber !== null &&  verseNumber != "" && verseView == null');
            
                                        //styles of other verses
                                        if(to_verseNumber !== null && to_verseNumber != ""){
                                            //console.log('hay to_verseNumber');
                                            if(parseInt(verseNumber) < parseInt(to_verseNumber)){
                                                for (let i = parseInt(verseNumber); i <= parseInt(to_verseNumber); i++) {
                                                    Array.from(document.querySelectorAll('[data-verse="'+i+'"]')).forEach(el=>{
                                                        if(i == parseInt(verseNumber)) {
                                                            el.classList.add('active_first');                
                                                        }else if(i == parseInt(to_verseNumber)) {
                                                            el.classList.add('active_last');                
                                                        }else{
                                                            el.classList.add('active_middle');                
                                                        }
                                                    });
                                                }
                                            } 
                                        }else{
                                            //console.log('no hay to_verseNumber. reviso verseNumber');
                                            //only one verse of each translation
                                            if(verseNumber !== null && verseNumber != ""){
                                                document.querySelectorAll('[data-verse="'+verseNumber+'"]').forEach(el=>{
                                                    el.classList.add('active_one');
                                                });
                                            }
                                        }                
                                    
                                        //scroll to verse o verses activos
                                        //scrollToVerse(verseNumber, to_verseNumber);
                                    }
            
                                    if(verseView !== null && verseView != ""){
                                        //console.log('hay verseView');
            
                                        //styles of other verses of col1
                                        if(to_verseNumber !== null && to_verseNumber != ""){
                                            //console.log('hay to_verseNumber');
                                            if(parseInt(verseNumber) < parseInt(to_verseNumber)){
                                                for (let i = parseInt(verseNumber); i <= parseInt(to_verseNumber); i++) {
                                                    Array.from(document.querySelectorAll('#col1 .colsInner [data-verse="'+i+'"]')).forEach(el=>{
                                                        if(i == parseInt(verseNumber)) {
                                                            el.classList.add('active_first');                
                                                        }else if(i == parseInt(to_verseNumber)) {
                                                            el.classList.add('active_last');                
                                                        }else{
                                                            el.classList.add('active_middle');                
                                                        }
                                                    });
                                                }
                                            } 
                                        }else{
                                            //console.log('no hay to_verseNumber. reviso verseNumber');
                                            //only one verse of each translation
                                            if(verseNumber !== null && verseNumber != ""){
                                                document.querySelectorAll('.colsInner [data-verse="'+verseNumber+'"]').forEach(el=>{
                                                    el.classList.add('active_one');
                                                });
                                            }
                                        }                
                                    }
                                })
                                .then(() => {
                                    //si hay versiculo marcado con amarillo...
                                    if(verseNumber !== null &&  verseNumber != "" ){
                                        //scroll to verse o verses activos
                                        scrollToVerse(verseNumber, to_verseNumber);
            
                                        //y si con el versiculo marcado existe verse de la vista...
                                        if(verseView !== null && verseView != ""){
                                            //scroll to verseView
                                            scrollToVerseView(verseView);
                                        }
                                    }else{
                                        //console.log('no hay verseNumber');
                                        if(verseView !== null && verseView != ""){
                                            //scroll to verseView
                                            scrollToVerseView(verseView);
                                        }
                                    }
                                    
                                })
                                .then(() => {
                                    mySizeWindow();
                                    mySizeVerse();
                                    addListenerToPA();//listen links p > a

                                    //console.log('compruebo si llega window.iter_i: '+window.iter_i);
                                    //если это последняя колонка, то в цикле перехожу к последнему параграфу... 
                                    //console.log(`--- --- ending myPromise --- divId: ${divId}  --- Translation: ${Translation} `);
                                    // Registra el tiempo de finalización
                                    //const tiempoFin = new Date().getTime();
                                    // Calcula el tiempo de ejecución en milisegundos
                                    //const tiempoEjecucion = (tiempoFin - tiempoInicio) / 1000;//
                                    //console.log('obj_o --- tiempoFin: '+tiempoFin);
                                    //console.log('obj_o --- tiempoEjecucion: '+tiempoEjecucion+' sec.');
                                    //mostrarTamanioObjeto(obj_o);

                                })
                                .catch((error) => {
                                    // Manejar cualquier error que pueda ocurrir durante la solicitud o el procesamiento de la respuesta
                                    console.log('error promesa en myPromise con obj_o. error: '+error);
                                });

                            }else{
                                console.log('No coincide el nombre del fichero o fileContent está vacío');
                            }

                        }else{
                            //console.log('no esxiste obj_o book');
                        }
                    }
                }
                
                //si no existe objeto con Translation. hago fetch()
                if(typeof obj_o[Translation].Books[book] == 'undefined'){

                    //start de tiempo para calcular cuanto tarda
                    const tiempoInicioFetch = new Date().getTime();
                    //console.log('fetch() --- tiempoInicioFetch: '+tiempoInicioFetch);

                    //url del libro necesario
                    url = `modules/text/${Translation}/${bq.Books[book].PathName}`;//nrt_01.htm'; 

                    fetch(url)
                    .then((response) => response.text())
                    .then((bookModule) => {

                        obj_o[Translation].Books[book] = {'fileName': bq.Books[book].PathName, 'fileContent': bookModule};
                        //console.log('abajo obj_o:');
                        //console.log(obj_o);

                        
                        //console.log(bookModule);
                        divShow.innerHTML = '';//IMPORTANTE! PARA QUE NO SE DUPLIQUE EL CONTENIDO DE UNA TRANS!

                        var nb = bookModule.split('<h4>');//делю файл на главы
                        //console.log(nb);
                        
                        nb = nb.filter(elm => elm);//удаляю пустые елементы массива
                        //console.log(nb);

                        //Book
                        if(bookModule.includes('<h2>')){
                            var arr_h2 = bookModule.split('<h2>');

                            if(arr_h2[1].includes('</h2>')){
                                var arr_h2_text = arr_h2[1].split('</h2>');
                                var BookName = arr_h2_text[0];
                            }else{
                                var BookName = arr_h2[1];
                            }
                            BookName = (BookName == '') ? bq.Books[book].FullName : BookName ;
                            //console.log('BookName: '+BookName); 
                            
                            //Book
                            var h2 = document.createElement('h2');
                            h2.append(BookName);

                            arr_data_head.push(h2);
                            //console.log(h2);

                            if(bq.HTMLFilter == 'Y'){
                                h2.innerHTML = htmlEntities(h2.innerHTML)
                            }
                        }

                        //si existe el capitulo
                        if(typeof nb[chapter] !== 'undefined'){
                            var ChapterId = chapter;

                            var nb_chapter_verses = nb[chapter].split('<p>');
                            //console.log(nb_chapter_verses);

                            var only_verses_length = nb_chapter_verses.length - 1;
                            //console.log(`Translation: ${divId} --- divId: ${divId} --- book: ${book} --- chapter: ${chapter} --- only_verses_length: ${only_verses_length}`);
                            // console.log('only_ divId: '+divId);

                            if(divId == '#col1'){
                                window.col1_p_length = only_verses_length;
                                //console.log('only_ col1_p_length: '+window.col1_p_length);
                            }else{
                                //console.log('no es col1. only_ col1_p_length: '+window.col1_p_length);
                            }



                            //Chapter, Verse
                            nb_chapter_verses.forEach( (el,i) => {
                                //console.log(el);
                
                                //Chapter
                                if(i == 0){
                                    //console.log('es Chapter: '+el);

                                    if(el.includes('</h4>')){
                                        var arr_h4_text = el.split('</h4>');
                                        var ChapterText = arr_h4_text[0];
                                    }else{
                                        var ChapterText = el;
                                    }
                                    //console.log('ChapterText: '+ChapterText);

                                    if(ChapterText == ''){
                                        ChapterText = bq.Books[book].FullName + ' ' + chapter;
                                    }

                                    //Chapter
                                    var h4 = document.createElement('h4');
                                    h4.append(ChapterText);

                                    arr_data_head.push(h4);
                                    //console.log(h4);

                                    //divShow.append(h4);

                                    if(bq.HTMLFilter == 'Y'){
                                        h4.innerHTML = htmlEntities(h4.innerHTML);
                                    }
                                }
                                else{//Verse
                                    //console.log('es Verse: '+el);
                
                                    if(el.includes('</p>')){
                                        var arr_p_text = el.split('</p>');
                                        var p_Text = arr_p_text[0];
                                    }else{
                                        var p_Text = el;
                                    }
                                    //console.log('p_Text: '+p_Text); 
                
                                    var arr_p = p_Text.split(' ');
                                    var VerseId = arr_p[0];
                                    //console.log('VerseId: '+VerseId);
                
                                    var VerseText = '';
                                    for(let index = 1; index < arr_p.length; index++){
                                        VerseText += arr_p[index] + ' ';
                                    }
                                    //console.log('VerseText: '+VerseText);
                
                                    var p = document.createElement('p');
                                    p.id = Translation +'__'+book + '__' + chapter + '__' + VerseId;
                                    p.setAttribute('data-verse',VerseId);
                    
                                    var a = document.createElement('a');
                                    a.href = '#';
                                    a.classList.add = 'blink';
                                    a.innerHTML = bq.Books[book].ShortNames[0] + ChapterId + ':' + VerseId;
                                    p.append(a);
                                    p.append(' '); 

                                    const span_vt = document.createElement('span');
                                    span_vt.className = 'vt';//text de Verse para aplicar HTMLFilter si hay


                                    //Номера Стронга в стихах (RST+)
                                    if(bq.StrongNumbers == "Y"){
                                        let t = VerseText;
                                        var arr_t = t.split(' ');

                                        arr_t.forEach((el,i) => {    
                                            
                                            //element of string is Strong Number
                                            if(!isNaN(parseInt(el)) || el == '0'){//number                         
                                                const span_strong = document.createElement('span');
                                                if(btnStrongIsActive){
                                                    span_strong.className = 'strong show strongActive'; 
                                                }else{
                                                    span_strong.className = 'strong'; 
                                                }
                                                let last_char = (el.length > 1) ? el.charAt(el.length-1) : "" ;

                                                //si ultimo carácter es string
                                                if(last_char != '' && isNaN(last_char)){
                                                    let el_number = el.substring(0,el.length-1);
                                                    let el_string = last_char;
                                                    span_strong.innerHTML = el_number;
                                                    p.append(span_strong);
                                                    p.append(el_string);
                                                }else{//es number
                                                    span_strong.innerHTML = el;
                                                    p.append(span_strong);
                                                }

                                            }else{//is word
                                                p.append(' ');
                                                if(btnStrongIsActive){
                                                    if(el.includes('<S>')){
                                                        el = el.replace('<S>','<S class="show strongActive">');
                                                    }
                                                }
                                                p.append(el);
                                            }
                                        });
                                        p.innerHTML.trim();

                                        //console.log('antes: ' + p.innerHTML);
                                        if(bq.HTMLFilter == 'Y'){
                                            p.innerHTML = htmlEntities(p.innerHTML);
                                        }
                                        //console.log('despues: '+p.innerHTML);

                                        if(btnStrongIsActive && p.innerHTML.includes('strongActive')){
                                            p.querySelectorAll('.strongActive').forEach((el)=>{
                                                el.addEventListener('click', ()=>{
                                                    //console.log('1. bq.StrongFirstLetter: '+bq.StrongFirstLetter);
                                                    //console.log('1. book: '+book);
                                                    console.log('m --- 1. el.innerHTML: '+el.innerHTML);
                                                    var paramfirstLetter = (bq.StrongFirstLetter == 'Y') ? 'Y' : 'N' ;

                                                    if(el.innerHTML.includes('H') || el.innerHTML.includes('G')){//rstStrongRed G3056 /H3056
                                                        getStrongNumber(el.innerHTML, null, paramfirstLetter);
                                                    }else{//rstStrong
                                                        lang = (book >= 39) ? 'Grk' : 'Heb' ;
                                                        getStrongNumber(el.innerHTML, lang, paramfirstLetter);
                                                    }
                                                });
                                            }); 
                                        }

                                        arr_data_body.push(p);
                                        //console.log(p);
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

                                                const span_t = document.createElement('span');
                                                span_t.className = 'tooltip';
                                                span_t.setAttribute('data-tooltip',text_Note);
                                                span_t.innerHTML = bq.NoteSign;

                                                span_t.addEventListener('mouseenter', function(){
                                                    showTooltip(this);
                                                });
                                                span_t.addEventListener('mouseleave', function(){
                                                    hideTooltip(this);
                                                });
                                                /*
                                                //antes
                                                p.append(before_Note);
                                                p.append(span_t);
                                                p.append(after_Note);
                                                */

                                                before_Note = (bq.HTMLFilter == 'Y') ? htmlEntities(before_Note) : before_Note ;
                                                span_vt.append(before_Note);
                                                span_vt.append(span_t);
                                                after_Note = (bq.HTMLFilter == 'Y') ? htmlEntities(after_Note) : after_Note ;
                                                span_vt.append(after_Note);
                                                //span_vt.innerHTML = (bq.HTMLFilter == 'Y') ? htmlEntities(span_vt.innerHTML) : span_vt.innerHTML ;

                                                p.append(span_vt);//antes
                                            }
                                        }else{
                                            //p.append(VerseText);//antes
                                            span_vt.append(VerseText);
                                            p.append(span_vt);

                                            if(bq.HTMLFilter == 'Y'){
                                                p.innerHTML = htmlEntities(p.innerHTML);
                                            }
                                        }
                                        //p.append(span_vt);//antes
                                        //SIMULTANEAMENTE CON '*' Y '<' Y '> ' la función htmlEntities() DESHABILITA tooltip.

                                        arr_data_body.push(p);
                                        //console.log(p);
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

                                            const span_title = document.createElement('span');
                                            span_title.className = 'verse_title';
                                            span_title.innerHTML = text_Title;

                                            p.append(before_Title);
                                            p.append(span_title);
                                            p.append(after_Title);
                                        }else{
                                            p.append(VerseText);
                                        }

                                        arr_data_body.push(p);
                                        //console.log(p);

                                        if(bq.HTMLFilter == 'Y'){
                                            p.innerHTML = htmlEntities(p.innerHTML);
                                        }
                                    }

                                    //Нет ни Номеров Стронга, ни Примечаний ни Оглавлений
                                    if(bq.StrongNumbers == "N" && bq.Notes == 'N' && bq.Titles == 'N'){
                                        //p.append(VerseText);//antes
                                        span_vt.append(VerseText);
                                        p.append(span_vt);

                                        arr_data_body.push(p);
                                        //console.log(p);
                                        
                                        if(bq.HTMLFilter == 'Y'){
                                            p.innerHTML = htmlEntities(p.innerHTML);
                                        }
                                    }        
                                    
                                }
                
                            });
                            
                            
                            //Posle forEach...
                            //=====================================================//
                            // 1. inicio - Numeración base Española - y col's Rusa
                            //=====================================================//
                            if(base_ep == 'Y' && bq.EnglishPsalms == 'N'){//numeración rusa
                                //console.log('Numeración base es Española - y cols es Rusa');
                                //var col1_p_length = document.querySelectorAll('#col1 .colsInner p').length;//antes
                                var arr_vstavka = [];
                                var vstavka2 = [];
                                
                                //Miro la traducción con EnglishPsalms
                                switch (parseInt(book)) {

                                    case 3: //Числа
                                            if(chapter == 12){//Числа 12:16 => Num. 13:1
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 13, 1);//add Num. 13:1
                                                arr_data_body = arr_data_body.concat(arr_vstavka);
                                                addChapterToVerse(arr_data_body, bq, book, 13, 16);//se añade capitulo 13 al verse 13 español que es 1 ruso
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 13){//13:1-33 => 13: +1
                                                arr_data_body.splice(0, 1);//[p....] - elimino primer versículo
                                            }
                                        break;

                                    case 5: //Иисус Навин
                                            if(chapter == 5){//Ис.Нав.6:1 => Josue 5:16 | 6:2-27 =>	6: -1
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 6){//Ис.Нав.6:1 => Josue 5:16 | 6:2-27 =>	6: -1
                                                addChapterToHead(bq, book, 5);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 5, 16);//add Josue 5:16
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                addChapterToVerse(arr_data_body, bq, book, 6, 2);//se añade capitulo 6 al verse 2 español que es 1 ruso
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break; 
                                        
                                    case 8: //1Samuel (1Царств) 
                                            if(chapter == 20){//20:42-а	=> 20:42:00 | 20:42-б => 20:43:00
                                                //1 verse contiene 2 en ruso
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 20, form_list_verses(1, col1_p_length+1) );                                       
                                                let arr_mezclado = mergeVerses(arr_vstavka, 42);//se meclan 42 y el siguiente 43.
                                                arr_data_body = [].concat(arr_mezclado, arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 23){//23:29 => 24:1
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 24, 1 );
                                                arr_data_body = arr_data_body.concat(arr_vstavka);//añado al final un versiculo
                                                addChapterToVerse(arr_data_body, bq, book, 24, 29);//se añade capitulo 24 al verse 29 español que es 1 ruso
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 24){//24:1-22	=> 24: +1
                                                arr_data_body.splice(0, 1);//[p....] - elimino primer versículo
                                            }
                                        break; 
                                    
                                    case 17: //Job 
                                            if(chapter == 39){
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 40){//40:1-5 => 39:31-35 | 40:6-24 =>	40: -5
                                                addChapterToHead(bq, book, 39);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 39, form_list_verses(31, 35) );
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                addChapterToVerse(arr_data_body, bq, book, 40, 6);//se añade capitulo 40 al verse 6 español que es 1 ruso
                                                arr_data_body.splice(col1_p_length);//[p....] - elimino versículos sobrantes a partir de el último hasta el fin
                                            }
                                            if(chapter == 41){//41:1-8 => 40:20-27 | 41:9-34 =>	41: -8
                                                addChapterToHead(bq, book, 40);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 40, form_list_verses(20, 27) );
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                addChapterToVerse(arr_data_body, bq, book, 41, 9);//se añade capitulo 41 al verse 9 español que es 1 ruso
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break; 

                                    case 18: //Psalmos 
                                            if(chapter >= 3 && chapter <= 8){//3:1 - 9:20 =>	Х : +1 *
                                                arr_data_body.splice(0, 1);//[p....] - elimino primer versículo
                                            }
                                            if(chapter == 9){//3:1 - 9:20 => Х : +1 *
                                                arr_data_body.splice(0, 1);//[p....] - elimino primer versículo
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 10){//10:2-18 => 9: +21
                                                addChapterToHead(bq, book, 9);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 9, form_list_verses(22, 39) );
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            //Formula Esp => Rus //Ps.X:1 => Пс.X-1:1 
                                            //-1 : Х
                                            if(
                                                (chapter == 11) || 
                                                (chapter >= 14 && chapter <= 17) || 
                                                (chapter >= 23 && chapter <= 29) || 
                                                (chapter >= 32 && chapter <= 33) || 
                                                (chapter == 35) || 
                                                (chapter == 37) || 
                                                (chapter == 43) || 
                                                (chapter == 50) || 
                                                (chapter == 66) || 
                                                (chapter >= 71 && chapter <= 74) || 
                                                (chapter >= 78 && chapter <= 79) || 
                                                (chapter == 82) || 
                                                (chapter == 86) || 
                                                (chapter == 87) || 
                                                (chapter == 91) || 
                                                (chapter >= 93 && chapter <= 101) || 
                                                (chapter >= 103 && chapter <= 107) || 
                                                (chapter >= 109 && chapter <= 114) || 
                                                (chapter >= 117 && chapter <= 146)
                                            ){
                                                addChapterToHead(bq, book, parseInt(chapter)-1);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-1, form_list_verses(1, col1_p_length) );
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            //Formula Esp => Rus //Ps.X:1 => Пс.X-1:2 
                                            //-1 : +1
                                            if(
                                                (chapter == 12) || 
                                                (chapter >= 18 && chapter <= 22) || 
                                                (chapter >= 30 && chapter <= 31) || 
                                                (chapter == 34) || 
                                                (chapter == 36) || 
                                                (chapter >= 38 && chapter <= 42) || 
                                                (chapter >= 44 && chapter <= 49) || 
                                                (chapter == 53) || 
                                                (chapter >= 55 && chapter <= 59) || 
                                                (chapter >= 61 && chapter <= 65) || 
                                                (chapter >= 67 && chapter <= 70) || 
                                                (chapter >= 75 && chapter <= 77) || 
                                                (chapter >= 80 && chapter <= 81) || 
                                                (chapter >= 83 && chapter <= 85) || 
                                                (chapter >= 88 && chapter < 90) || 
                                                (chapter == 92) || 
                                                (chapter == 102) || 
                                                (chapter == 108)
                                            ){
                                                addChapterToHead(bq, book, parseInt(chapter)-1);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-1, form_list_verses(1+1, col1_p_length+1) );// desde 2 versiculo
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            //Formula
                                            //2en1
                                            if(chapter == 13){//13:05 => 12:6-а | 13:06 => 12:6-б
                                                addChapterToHead(bq, book, parseInt(chapter)-1);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-1, form_list_verses(2, 6) );// desde 2 versiculo
                                                arr_data_body = arr_vstavka.concat(vstavka_vacio('arriba'),arr_data_body);
                                                arr_data_body.splice(col1_p_length);//1 verse español contiene 2 en ruso
                                            }
                                            //Formula
                                            //-1 : +2 *
                                            if(
                                                (chapter >= 51 && chapter <= 52) ||
                                                (chapter == 54) || 
                                                (chapter == 60)
                                            ){
                                                addChapterToHead(bq, book, parseInt(chapter)-1);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-1, form_list_verses(1+2, col1_p_length+2) );// desde 3 versiculo
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            //Formula
                                            //2en1
                                            if(chapter == 90){//90:05 => 89:6-а | 90:06	=> 89:6-б 
                                                addChapterToHead(bq, book, parseInt(chapter)-1);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-1, form_list_verses(2, col1_p_length) );
                                                let p_vacio = document.createElement('p');
                                                p_vacio.className = 'prim';
                                                p_vacio.innerHTML = 'смотри стих выше...';
                                                arr_vstavka.splice(5,0,p_vacio);
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            //Formula
                                            //-2: +8
                                            if(chapter == 115){//115:1-18 => 113: +8
                                                addChapterToHead(bq, book, parseInt(chapter)-2);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-2, form_list_verses(1+8, col1_p_length+8) );// desde 9 versiculo
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            //Formula
                                            //-2: X
                                            if(chapter == 116){//116:1-9 => 114: Х
                                                addChapterToHead(bq, book, parseInt(chapter)-2);//si el verse vstavka es primero
                                                // Sal.116:1-9 => Пс. 114:1-9
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-2, form_list_verses(1, 9) );
                                                // Sal.116:10-19 => Пс. 115:1-10
                                                vstavka2 = for_parseVerse(Translation, bq, bookModule, book, chapter-1, form_list_verses(1, 10) );
                                                arr_vstavka = arr_vstavka.concat(vstavka2);
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                addChapterToVerse(arr_data_body, bq, book, 115, 10);//se añade capitulo 115 al verse 10 español que es 1 ruso
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            //Formula
                                            //-1: X (especial)
                                            if(chapter == 147){//147:1-11 => 146:1-11
                                                addChapterToHead(bq, book, parseInt(chapter)-1);//si el verse vstavka es primero
                                                // Sal.147:1-11 => Пс.146:1-11
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-1, form_list_verses(1, 11) );
                                                // Sal.147:12-20 => Пс. 147:1-9
                                                vstavka2 = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, 9) );
                                                arr_vstavka = arr_vstavka.concat(vstavka2);
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                addChapterToVerse(arr_data_body, bq, book, 147, 12);//se añade capitulo 147 al verse 12 español que es 1 ruso
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break;

                                    case 19: //Притчи
                                            if(chapter == 4){
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length) );
                                                arr_data_body = [].concat(arr_vstavka);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break;
                                
                                    case 21: //Cantares - Песня песней
                                            if(chapter == 1){
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length) );
                                                let p_vacio = document.createElement('p');
                                                p_vacio.className = 'prim';
                                                p_vacio.innerHTML = 'заглавие...';
                                                arr_vstavka.splice(0,0,p_vacio);
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 6){//06:13 =>	07:1
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+1, 1 );
                                                arr_data_body = arr_data_body.concat(arr_vstavka);
                                                addChapterToVerse(arr_data_body, bq, book, 7, 13);//se añade capitulo 7 al verse 13 español que es 1 ruso
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 7){//7:1-13 => 7: +1 (7:2-14)
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1+1, col1_p_length+1) );
                                                arr_data_body = [].concat(arr_vstavka,arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break;

                                    case 22: //Isaías - Исаия
                                            if(chapter == 3){
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length) );
                                                let p_vacio = document.createElement('p');
                                                p_vacio.className = 'prim';
                                                p_vacio.innerHTML = 'смотри стих выше...';
                                                arr_vstavka.splice(19,0,p_vacio);
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break;

                                    case 26: //Daniel - Даниил
                                            if(chapter == 3){//3:1-30 => 3:1-30
                                                //в Синодальном переводе есть вставочные стихи, которых нет в Исп Библии. Стихи с 24 по 90 включительно переведены с греческого, потому что в еврейском тексте их нет. - Прим. ред.
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length) );
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 4){//4:1-3 => 3:31-33 | 4:4-37 => 4: -3
                                                addChapterToHead(bq, book, parseInt(chapter)-1);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-1, form_list_verses(31, 33) );
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                addChapterToVerse(arr_data_body, bq, book, 4, 4);//se añade capitulo 4 al verse 4 español que es 1 ruso
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break;

                                    case 27: //Oseas - Осия
                                            if(chapter == 13){//13:16 => 14:1
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 14, 1);
                                                arr_data_body = arr_data_body.concat(arr_vstavka);
                                                addChapterToVerse(arr_data_body, bq, book, 14, 16);//se añade capitulo 14 al verse 16 español que es 1 ruso
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 14){//14:1-9 => 14:2-10
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(2, 10) );
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break;

                                    case 31: //Jonas - Иона
                                            if(chapter == 1){//1:17 => 2:1
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 2, 1);
                                                arr_data_body = arr_data_body.concat(arr_vstavka);
                                                addChapterToVerse(arr_data_body, bq, book, 2, 17);//se añade capitulo 2 al verse 17 español que es 1 ruso
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 2){//2:1-10 => 2:2-11
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(2, 11) );
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break;

                                    case 44: //Romanos - Римлянам
                                            //book = book + 7;// 44 + 7 = 51 //Romanos - Римлянам
                                            if(chapter == 16){// 16:25-27 => 14:24-26                                          
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-2, form_list_verses(24,  26) );
                                                arr_data_body = arr_data_body.concat(arr_vstavka);
                                                addChapterToVerse(arr_data_body, bq, book, 14, 25);//se añade capitulo 14 al verse 25 español que es 24-26 ruso
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break;

                                    case 46: //2Corintios - 2-Коринфянам
                                            //book = book + 7;// 46 + 7 = 53 //2Corintios - 2-Коринфянам
                                            if(chapter == 13){// 13:12-13 => 13:12 | 13:14 => 13:13                                          
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length-1) );
                                                let p_vacio = document.createElement('p');
                                                p_vacio.className = 'prim';
                                                p_vacio.innerHTML = 'смотри стих выше...';
                                                arr_vstavka.splice(12,0,p_vacio);
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break;
                                    
                                    default:
                                        //console.log('default en switch');
                                        break;
                                }//fin switch
                            }
                            //=====================================================//
                            // fin - Numeración base Española - y col's Rusa
                            //=====================================================//
                            
                            
                            //=====================================================//
                            // 2. inicio - Numeración base Rusa - y col's Española
                            //=====================================================//
                            if(base_ep == 'N' && bq.EnglishPsalms == 'Y'){//numeración Española
                                //console.log('Numeración base Rusa - y cols Española');
                                //var col1_p_length = document.querySelectorAll('#col1 .colsInner p').length;//antes
                                //console.log(' --- dentro de bloque Numeración base Rusa - y cols Española --- col1_p_length: '+col1_p_length);//test
                                var arr_vstavka = [];
                                var vstavka2 = [];
                                
                                //Miro la traducción con EnglishPsalms
                                switch (parseInt(book)) {

                                    case 3: //Числа
                                            if(chapter == 12){//12:X => 12:X (quito ultimo verse)
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length) );
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 13){//Числа 13:1 => Num.12:16 
                                                addChapterToHead(bq, book, 12);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 12, 16);
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                addChapterToVerse(arr_data_body, bq, book, 13, 2);//result Num.13:1 => Números 13 Num.13:1
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break;

                                    case 5: //Иисус Навин
                                            if(chapter == 5){//Иис.Нав.5:16 => Jos.6:1                                    
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 6, 1);
                                                arr_data_body = arr_data_body.concat(arr_vstavka);
                                                addChapterToVerse(arr_data_body, bq, book, 6, 16);//se añade capitulo 5 al verse 16 ruso que es 1 español
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 6){//Иис.Нав.6:1 => Jos.6:2 ... Иис.Нав.6:26 => Jos.6:27
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1+1, col1_p_length+1));
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break; 
                                        
                                    case 8: //1Samuel (1Царств) 
                                            if(chapter == 20){//1Цар.20:42-43 => 1Sam 20:42
                                                //1 verse contiene 2 en ruso
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length-1) );
                                                arr_data_body = [].concat(arr_vstavka,vstavka_vacio('arriba'));
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 23){//
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length) );
                                                arr_data_body = arr_data_body.concat(arr_vstavka);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 24){//1Цар.24:1 => 1S.23:29
                                                addChapterToHead(bq, book, 23);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 23, 29 );//cojo último verse del capitulo anterior
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                addChapterToVerse(arr_data_body, bq, book, 24, 2);//se añade capitulo 24 al verse 2 ruso que es 1 español
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break; 
                                    
                                    case 17: //Job 
                                            if(chapter == 39){//39:31-35 => 40:1-5  | 40:6-24 =>	40: -5
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 40, form_list_verses(1, 5) );
                                                arr_data_body = arr_data_body.concat(arr_vstavka);
                                                addChapterToVerse(arr_data_body, bq, book, 40, 31);//se añade capitulo 40 al verse 31 ruso que es 1 español
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 40){//40:1-19 => 40:6-24 
                                                //console.log(arr_data_body);//arr_data_body trae todos los verses del capitulo  40:1-24
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 40, form_list_verses(6, 24) );//trae 8 verses 40:6-24
                                                //console.log(arr_vstavka);//trae 8 verses 40:6-24
                                                vstavka2 = for_parseVerse(Translation, bq, bookModule, book, 41, form_list_verses(1, 8) );//trae 8 verses 41:1-8
                                                //console.log(vstavka2);
                                                arr_data_body = [].concat(arr_vstavka, vstavka2);//[]. reescribe y une 40:6-24 con 41:1-8 
                                                //console.log(arr_data_body);
                                                addChapterToVerse(arr_data_body, bq, book, 41, 20);//se añade capitulo 41 al verse 20 ruso que es 1 español                                        
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 41){//40:1-26 => 41:9-34
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 41, form_list_verses(9, 34) );
                                                arr_data_body = [].concat(arr_vstavka);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break; 

                                    case 18: //Psalmos 
                                            if(chapter >= 3 && chapter <= 8){//3:1 - 9:20 =>	Х : +1 *
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length-1) );
                                                arr_data_body = [].concat(vstavka_vacio(), arr_vstavka);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 9){//3:1 - 9:20 => Х : +1 *
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, 20) );
                                                vstavka2 = for_parseVerse(Translation, bq, bookModule, book, 10, form_list_verses(1, 18) );
                                                arr_data_body = [].concat(vstavka_vacio(), arr_vstavka, vstavka2);
                                                addChapterToVerse(arr_data_body, bq, book, 10, 22);//se añade capitulo 10 al verse 22 ruso que es 1 español 
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            //Formula Esp => Rus //Пс.X:1 => Ps.X+1:1 
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
                                                (chapter >= 116 && chapter <= 138) ||
                                                (chapter >= 140 && chapter <= 145)
                                            ){
                                                addChapterToHead(bq, book, parseInt(chapter)+1);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+1, form_list_verses(1, col1_p_length) );
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            //Formula Esp => Rus //Пс.X+1:2 => Ps.X:1 //добавляю пустой стих сначала в исп перевод
                                            //+1 : -1
                                            if(
                                                (chapter == 11) || 
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
                                                (chapter == 139)
                                            ){
                                                addChapterToHead(bq, book, parseInt(chapter)+1);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+1, form_list_verses(1, col1_p_length-1) );
                                                arr_data_body = [].concat(vstavka_vacio(), arr_vstavka);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            //Formula
                                            //+1 : -2 | Ej.:  50:0 => 51:1 | 50:1 => 51:2
                                            if(
                                                (chapter >= 50 && chapter <= 51) ||
                                                (chapter == 53) || 
                                                (chapter == 59)
                                            ){
                                                addChapterToHead(bq, book, parseInt(chapter)+1);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+1, form_list_verses(1, col1_p_length-2) );
                                                arr_data_body = [].concat(vstavka_vacio(),vstavka_vacio(), arr_vstavka);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            //Formula
                                            //2en1
                                            if(chapter == 89){//89:6 => 90:5-6 
                                                addChapterToHead(bq, book, parseInt(chapter)+1);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+1, form_list_verses(1, col1_p_length) );
                                                var new_arr = [];
                                                arr_vstavka.map((el,i,arr) => {
                                                    if(i == 4){
                                                        const p_new = document.createElement('p');
                                                        p_new.innerHTML = arr[i].innerHTML + '<br>' + arr[i+1].innerHTML;
                                                        new_arr.push(p_new); 
                                                    }else{
                                                        new_arr.push(el);
                                                    }
                                                });
                                                new_arr.splice(5, 0);//elimino verse 6 (90:6) 
                                                //console.log(new_arr);
                                                arr_vstavka = new_arr;
                                                arr_data_body = [].concat(vstavka_vacio(), arr_vstavka);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            //Formula
                                            //+2: -8
                                            if(chapter == 113){//113: +8 => 115:1-18 | Пс.113:9 => Sal.115:1
                                                addChapterToHead(bq, book, parseInt(chapter)+1);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+1, form_list_verses(1, 8) );
                                                vstavka2 = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+2, form_list_verses(1, 18) );
                                                arr_data_body = [].concat(arr_vstavka, vstavka2);
                                                addChapterToVerse(arr_data_body, bq, book, 115, 9);//se añade capitulo 115 al verse 9 ruso que es 1 español
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            //Formula
                                            //-2: X
                                            if(chapter == 114){// Пс. 114:1-9 => Sal.116:1-9 
                                                addChapterToHead(bq, book, parseInt(chapter)+2);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+2, form_list_verses(1, 9) );
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 115){// Пс. 115:1-10 => Sal.116:10-19
                                                addChapterToHead(bq, book, parseInt(chapter)+1);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+1, form_list_verses(10, 19) );
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            //Formula (especial)
                                            if(chapter == 146){// Пс.146:1-11 => Sal.147:1-11
                                                addChapterToHead(bq, book, parseInt(chapter)+1);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+1, form_list_verses(1, 11) );
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            //Formula (especial)
                                            if(chapter == 147){// Пс.147:1-11 => Sal.147:12-20
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(12, 20) );
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break;                                 

                                    case 19: //Притчи
                                            if(chapter == 4){
                                                //arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length-2) );
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length) );
                                                //arr_data_body = [].concat(arr_vstavka, vstavka_vacio(), vstavka_vacio());
                                                arr_data_body = [].concat(arr_vstavka);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break;
                                    
                                    case 21: //Cantares - Песня песней
                                            if(chapter == 1){
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length) );
                                                //console.log(arr_vstavka);
                                                var new_arr = [];
                                                arr_vstavka.map((el,i,arr) => {
                                                    if(i == 0){
                                                        const p_new = document.createElement('p');
                                                        p_new.innerHTML = arr[i].innerHTML + '<br>' + arr[i+1].innerHTML;
                                                        new_arr.push(p_new); 
                                                    }else{
                                                        new_arr.push(el);
                                                    }
                                                });
                                                new_arr.splice(1, 1);//elimino verse  (Cantar 1:2) 
                                                //console.log(new_arr);
                                                arr_vstavka = new_arr;
                                                //arr_data_body = [].concat(arr_vstavka, vstavka_vacio('arriba'));//mal
                                                arr_data_body = [].concat(arr_vstavka);//ok
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 6){//06:1-12 => 06:1-12	
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 7){//07:1 => 06:13	
                                                addChapterToHead(bq, book, 6);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)-1, 13 );
                                                arr_data_body = [].concat(arr_vstavka, arr_data_body);
                                                addChapterToVerse(arr_data_body, bq, book, 7, 2);//se añade capitulo 7 al verse 2 ruso que es 1 español
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break;

                                    case 22: //Isaías - Исаия
                                            if(chapter == 3){
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length) );
                                                var new_arr = [];
                                                arr_vstavka.map((el,i,arr) => {
                                                    if(i == 18){
                                                        const p_new = document.createElement('p');
                                                        p_new.innerHTML = arr[i].innerHTML + '<br>' + arr[i+1].innerHTML;
                                                        new_arr.push(p_new); 
                                                    }else{
                                                        new_arr.push(el);
                                                    }
                                                });
                                                new_arr.splice(19, 1);//elimino verse  (Is.3:19) 
                                                //console.log(new_arr);
                                                arr_vstavka = new_arr;
                                                //arr_data_body = [].concat(arr_vstavka, vstavka_vacio('arriba'));
                                                arr_data_body = [].concat(arr_vstavka);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break;

                                    case 26: //Daniel - Даниил
                                            if(chapter == 3){//3:1-30 => 3:1-30
                                                //в Синодальном переводе есть вставочные стихи, которых нет в Исп Библии. Стихи с 24 по 90 включительно переведены с греческого, потому что в еврейском тексте их нет. - Прим. ред.
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, 30) );
                                                vstavka2 = for_parseVerse(Translation, bq, bookModule, book, 4, form_list_verses(1, 3) );
                                                arr_data_body = [].concat(arr_vstavka, vstavka2);
                                                addChapterToVerse(arr_data_body, bq, book, 4, 31);//se añade capitulo 4 al verse 31 ruso que es 1 español
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 4){
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(4, col1_p_length+3) );
                                                arr_data_body = [].concat(arr_vstavka, arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break;

                                    case 27: //Oseas - Осия
                                            if(chapter == 14){//14:1 => 13:16 
                                                addChapterToHead(bq, book, 13);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 13, 16);
                                                arr_data_body = [].concat(arr_vstavka, arr_data_body);
                                                addChapterToVerse(arr_data_body, bq, book, 14, 2);//se añade capitulo 14 al verse 2 ruso que es 1 español
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break;

                                    case 31: //Jonas - Иона
                                            if(chapter == 1){
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, form_list_verses(1, col1_p_length));
                                                arr_data_body = [].concat(arr_vstavka, arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 2){// 2:1 => 1:17
                                                addChapterToHead(bq, book, 1);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 1, 17);
                                                arr_data_body = [].concat(arr_vstavka, arr_data_body);
                                                addChapterToVerse(arr_data_body, bq, book, 2, 2);//se añade capitulo 2 al verse 2 ruso que es 1 español
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break;

                                    case 44: //Romanos - Римлянам
                                            if(chapter == 14){// 14:24-26 => 16:25-27                                       
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 16, form_list_verses(25,  27) );
                                                arr_data_body = arr_data_body.concat(arr_vstavka);
                                                addChapterToVerse(arr_data_body, bq, book, 16, 24);//se añade capitulo 14 al verse 24 ruso que es 1 español
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break;

                                    case 46: //2Corintios - 2-Коринфянам
                                            if(chapter == 13){// 13:12-13 => 13:12 | 13:14 => 13:13                                          
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length+1) );
                                                var new_arr = [];
                                                arr_vstavka.map((el,i,arr) => {
                                                    if(i == 11){
                                                        const p_new = document.createElement('p');
                                                        p_new.innerHTML = arr[i].innerHTML + '<br>' + arr[i+1].innerHTML;
                                                        new_arr.push(p_new); 
                                                    }else{
                                                        new_arr.push(el);
                                                    }
                                                });
                                                new_arr.splice(12, 1);//elimino verse  (Is.3:19) 
                                                //console.log(new_arr);
                                                arr_vstavka = new_arr;
                                                arr_data_body = [].concat(arr_vstavka, arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break;

                                    default:
                                        //console.log('default en switch');
                                        break;
                                }//fin switch
                            }
                            //=====================================================//
                            // inicio - Numeración base Rusa - y col's Española
                            //=====================================================//
                            

                            //console.log('arr_data_head');
                            //console.log(arr_data_head);

                            //console.log('arr_data_body');
                            //console.log(arr_data_body);

                            arr_data_body.forEach((el,i)=>{//cambio data-verse
                                el.setAttribute('data-verse', i + 1 );
                            });

                            arr_data_all = arr_data_head.concat(arr_data_body);

                            arr_data_all.forEach((el,i)=>{
                                //document.querySelector('#col1 .colsInner').append(el);
                                //console.log(el);
                                divShow.append(el);
                            });
                            arr_data_head = [];
                            arr_data_body = [];
                            arr_data_all = [];
                            

                            window.iter_i++;
                            if(window.iter_i < window.arr_trans.length){
                                //console.log('iter_i: '+iter_i);
                                //showChapterText3(arr_trans[iter_i],'#'+arr_divShow[iter_i], book, chapter, verseNumber, to_verseNumber, verseView);
                                showChapterText4(arr_trans[iter_i],'#'+arr_divShow[iter_i], book, chapter, verseNumber, to_verseNumber, verseView);
                            }

                        }else{
                            //console.log(' no existe capítulo '+chapter+' del módulo '+book);
                            divShow.innerHTML = '<p class="prim">Текущий модуль Библии не содержит стихов для выбранной книги.</p>';
                        }
                    })
                    .then(() => {
                        mySizeWindow();
                        mySizeVerse();
                        /*
                        //si es ultimo elemento, añado padding-bottom
                        let p_last = divShow.querySelector('p:last-child');
                        let mb_h = divShow.offsetHeight - p_last.offsetHeight;
                        console.log('mb_h: '+mb_h)
                        p_last.style.marginBottom = mb_h + 'px';
                        p_last.style.background = 'lightgreen';
                        */
                    })
                    .then(() => {
                        
                        if(verseNumber !== null &&  verseNumber != "" && verseView == null){
                            //console.log('verseNumber !== null &&  verseNumber != "" && verseView == null');

                            //styles of other verses
                            if(to_verseNumber !== null && to_verseNumber != ""){
                                //console.log('hay to_verseNumber');
                                if(parseInt(verseNumber) < parseInt(to_verseNumber)){
                                    for (let i = parseInt(verseNumber); i <= parseInt(to_verseNumber); i++) {
                                        Array.from(document.querySelectorAll('[data-verse="'+i+'"]')).forEach(el=>{
                                            if(i == parseInt(verseNumber)) {
                                                el.classList.add('active_first');                
                                            }else if(i == parseInt(to_verseNumber)) {
                                                el.classList.add('active_last');                
                                            }else{
                                                el.classList.add('active_middle');                
                                            }
                                        });
                                    }
                                } 
                            }else{
                                //console.log('no hay to_verseNumber. reviso verseNumber');
                                //only one verse of each translation
                                if(verseNumber !== null && verseNumber != ""){
                                    document.querySelectorAll('[data-verse="'+verseNumber+'"]').forEach(el=>{
                                        el.classList.add('active_one');
                                    });
                                }
                            }                
                        
                            //scroll to verse o verses activos
                            //scrollToVerse(verseNumber, to_verseNumber);
                        }

                        if(verseView !== null && verseView != ""){
                            //console.log('hay verseView');

                            //styles of other verses of col1
                            if(to_verseNumber !== null && to_verseNumber != ""){
                                //console.log('hay to_verseNumber');
                                if(parseInt(verseNumber) < parseInt(to_verseNumber)){
                                    for (let i = parseInt(verseNumber); i <= parseInt(to_verseNumber); i++) {
                                        Array.from(document.querySelectorAll('#col1 .colsInner [data-verse="'+i+'"]')).forEach(el=>{
                                            if(i == parseInt(verseNumber)) {
                                                el.classList.add('active_first');                
                                            }else if(i == parseInt(to_verseNumber)) {
                                                el.classList.add('active_last');                
                                            }else{
                                                el.classList.add('active_middle');                
                                            }
                                        });
                                    }
                                } 
                            }else{
                                //console.log('no hay to_verseNumber. reviso verseNumber');
                                //only one verse of each translation
                                if(verseNumber !== null && verseNumber != ""){
                                    document.querySelectorAll('.colsInner [data-verse="'+verseNumber+'"]').forEach(el=>{
                                        el.classList.add('active_one');
                                    });
                                }
                            }                
                        }
                    })
                    .then(() => {
                        //si hay versiculo marcado con amarillo...
                        if(verseNumber !== null &&  verseNumber != "" ){
                            //scroll to verse o verses activos
                            scrollToVerse(verseNumber, to_verseNumber);

                            //y si con el versiculo marcado existe verse de la vista...
                            if(verseView !== null && verseView != ""){
                                //scroll to verseView
                                scrollToVerseView(verseView);
                            }
                        }else{
                            //console.log('no hay verseNumber');
                            if(verseView !== null && verseView != ""){
                                //scroll to verseView
                                scrollToVerseView(verseView);
                            }
                        }
                        
                    })
                    .then(() => {
                        mySizeWindow();
                        mySizeVerse();
                        addListenerToPA();//listen links p > a

                        
                        //console.log('2. ending fetch()');
                        // Registra el tiempo de finalización
                        //const tiempoFinFetch = new Date().getTime();
                        // Calcula el tiempo de ejecución en milisegundos
                        //const tiempoEjecucionFetch = (tiempoFinFetch - tiempoInicioFetch) / 1000;//
                        //console.log('fetch() --- tiempoFinFetch: '+tiempoFinFetch);
                        //console.log('fetch() --- tiempoEjecucionFetch: '+tiempoEjecucionFetch+' sec.');

                    })
                    .catch(error => { 
                        //Código a realizar cuando se rechaza la promesa
                        console.log('error promesa en fetch() con obj_o. error: '+error);
                    });                    
                }
                //console.log('despues de fetch --- abajo obj_o:');
                //console.log(obj_o); 


            }else{//si no está el id de book en el modulo...
                document.querySelectorAll('.colsInner').forEach(el=>{
                    if(el.childElementCount == 0 || el.textContent == ''){
                        var p = document.createElement('p');
                        p.className = 'prim';
                        p.innerHTML = `2. En este módulo no existe el libro indicado.`;
                        el.append(p);
                        //alert(' vacio');
                    }else{
                        //alert(' no vacio');
                    }
                });
            }            

    
        }else{//MODO OLD. como en Text3()
            
            //saco ajustes de este modulo en json
            url_bq = `modules/text/${Translation}/bibleqt.json`;
            fetch(url_bq)
            .then((response) => response.json())
            .then((bq) => {
                //console.log(' abajo bq:');
                //console.log(bq);

                //window.bq = bq;
                if(divTrans != null){
                    // divTrans.innerHTML = bq.BibleShortName;
                    divTransDesk.innerHTML = bq.BibleShortName;
                    divTransMob.innerHTML = bq.BibleShortName;
                }
                
                //si el id de book está entre numero de books del modulo, lo muestro
                if(parseInt(book) < bq.BookQty){//0-65 < 66
                    
                    //url del libro necesario
                    url = `modules/text/${Translation}/${bq.Books[book].PathName}`;//nrt_01.htm';  

                    fetch(url)
                    .then((response) => response.text())
                    .then((bookModule) => {
                        
                        //console.log(bookModule);
                        divShow.innerHTML = '';//IMPORTANTE! PARA QUE NO SE DUPLIQUE EL CONTENIDO DE UNA TRANS!

                        var nb = bookModule.split('<h4>');//делю файл на главы
                        //console.log(nb);
                        
                        nb = nb.filter(elm => elm);//удаляю пустые елементы массива
                        //console.log(nb);

                        //Book
                        if(bookModule.includes('<h2>')){
                            var arr_h2 = bookModule.split('<h2>');

                            if(arr_h2[1].includes('</h2>')){
                                var arr_h2_text = arr_h2[1].split('</h2>');
                                var BookName = arr_h2_text[0];
                            }else{
                                var BookName = arr_h2[1];
                            }
                            BookName = (BookName == '') ? bq.Books[book].FullName : BookName ;
                            //console.log('BookName: '+BookName); 
                            
                            //Book
                            var h2 = document.createElement('h2');
                            h2.append(BookName);

                            arr_data_head.push(h2);
                            //console.log(h2);

                            if(bq.HTMLFilter == 'Y'){
                                h2.innerHTML = htmlEntities(h2.innerHTML)
                            }
                        }

                        //si existe el capitulo
                        if(typeof nb[chapter] !== 'undefined'){
                            var ChapterId = chapter;

                            var nb_chapter_verses = nb[chapter].split('<p>');
                            //console.log(nb_chapter_verses);

                            var only_verses_length = nb_chapter_verses.length - 1;
                            //console.log(`Translation: ${divId} --- divId: ${divId} --- book: ${book} --- chapter: ${chapter} --- only_verses_length: ${only_verses_length}`);
                            // console.log('only_ divId: '+divId);

                            if(divId == '#col1'){
                                window.col1_p_length = only_verses_length;
                                //console.log('only_ col1_p_length: '+window.col1_p_length);
                            }else{
                                //console.log('no es col1. only_ col1_p_length: '+window.col1_p_length);
                            }



                            //Chapter, Verse
                            nb_chapter_verses.forEach( (el,i) => {
                                //console.log(el);
                
                                //Chapter
                                if(i == 0){
                                    //console.log('es Chapter: '+el);

                                    if(el.includes('</h4>')){
                                        var arr_h4_text = el.split('</h4>');
                                        var ChapterText = arr_h4_text[0];
                                    }else{
                                        var ChapterText = el;
                                    }
                                    //console.log('ChapterText: '+ChapterText);

                                    if(ChapterText == ''){
                                        ChapterText = bq.Books[book].FullName + ' ' + chapter;
                                    }

                                    //Chapter
                                    var h4 = document.createElement('h4');
                                    h4.append(ChapterText);

                                    arr_data_head.push(h4);
                                    //console.log(h4);

                                    //divShow.append(h4);

                                    if(bq.HTMLFilter == 'Y'){
                                        h4.innerHTML = htmlEntities(h4.innerHTML);
                                    }
                                }
                                else{//Verse
                                    //console.log('es Verse: '+el);
                
                                    if(el.includes('</p>')){
                                        var arr_p_text = el.split('</p>');
                                        var p_Text = arr_p_text[0];
                                    }else{
                                        var p_Text = el;
                                    }
                                    //console.log('p_Text: '+p_Text); 
                
                                    var arr_p = p_Text.split(' ');
                                    var VerseId = arr_p[0];
                                    //console.log('VerseId: '+VerseId);
                
                                    var VerseText = '';
                                    for(let index = 1; index < arr_p.length; index++){
                                        VerseText += arr_p[index] + ' ';
                                    }
                                    //console.log('VerseText: '+VerseText);
                
                                    var p = document.createElement('p');
                                    p.id = Translation +'__'+book + '__' + chapter + '__' + VerseId;
                                    p.setAttribute('data-verse',VerseId);
                    
                                    var a = document.createElement('a');
                                    a.href = '#';
                                    a.classList.add = 'blink';
                                    a.innerHTML = bq.Books[book].ShortNames[0] + ChapterId + ':' + VerseId;
                                    p.append(a);
                                    p.append(' '); 

                                    const span_vt = document.createElement('span');
                                    span_vt.className = 'vt';//text de Verse para aplicar HTMLFilter si hay


                                    //Номера Стронга в стихах (RST+)
                                    if(bq.StrongNumbers == "Y"){
                                        let t = VerseText;
                                        var arr_t = t.split(' ');

                                        arr_t.forEach((el,i) => {    
                                            
                                            //element of string is Strong Number
                                            if(!isNaN(parseInt(el)) || el == '0'){//number                         
                                                const span_strong = document.createElement('span');
                                                if(btnStrongIsActive){
                                                    span_strong.className = 'strong show strongActive'; 
                                                }else{
                                                    span_strong.className = 'strong'; 
                                                }
                                                let last_char = (el.length > 1) ? el.charAt(el.length-1) : "" ;

                                                //si ultimo carácter es string
                                                if(last_char != '' && isNaN(last_char)){
                                                    let el_number = el.substring(0,el.length-1);
                                                    let el_string = last_char;
                                                    span_strong.innerHTML = el_number;
                                                    p.append(span_strong);
                                                    p.append(el_string);
                                                }else{//es number
                                                    span_strong.innerHTML = el;
                                                    p.append(span_strong);
                                                }

                                            }else{//is word
                                                p.append(' ');
                                                if(btnStrongIsActive){
                                                    if(el.includes('<S>')){
                                                        el = el.replace('<S>','<S class="show strongActive">');
                                                    }
                                                }
                                                p.append(el);
                                            }
                                        });
                                        p.innerHTML.trim();

                                        //console.log('antes: ' + p.innerHTML);
                                        if(bq.HTMLFilter == 'Y'){
                                            p.innerHTML = htmlEntities(p.innerHTML);
                                        }
                                        //console.log('despues: '+p.innerHTML);

                                        if(btnStrongIsActive && p.innerHTML.includes('strongActive')){
                                            p.querySelectorAll('.strongActive').forEach((el)=>{
                                                el.addEventListener('click', ()=>{
                                                    //console.log('1. bq.StrongFirstLetter: '+bq.StrongFirstLetter);
                                                    //console.log('1. book: '+book);
                                                    console.log('m --- 1. el.innerHTML: '+el.innerHTML);
                                                    var paramfirstLetter = (bq.StrongFirstLetter == 'Y') ? 'Y' : 'N' ;

                                                    if(el.innerHTML.includes('H') || el.innerHTML.includes('G')){//rstStrongRed G3056 /H3056
                                                        getStrongNumber(el.innerHTML, null, paramfirstLetter);
                                                    }else{//rstStrong
                                                        lang = (book >= 39) ? 'Grk' : 'Heb' ;
                                                        getStrongNumber(el.innerHTML, lang, paramfirstLetter);
                                                    }
                                                });
                                            }); 
                                        }

                                        arr_data_body.push(p);
                                        //console.log(p);
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

                                                const span_t = document.createElement('span');
                                                span_t.className = 'tooltip';
                                                span_t.setAttribute('data-tooltip',text_Note);
                                                span_t.innerHTML = bq.NoteSign;

                                                span_t.addEventListener('mouseenter', function(){
                                                    showTooltip(this);
                                                });
                                                span_t.addEventListener('mouseleave', function(){
                                                    hideTooltip(this);
                                                });
                                                /*
                                                //antes
                                                p.append(before_Note);
                                                p.append(span_t);
                                                p.append(after_Note);
                                                */

                                                before_Note = (bq.HTMLFilter == 'Y') ? htmlEntities(before_Note) : before_Note ;
                                                span_vt.append(before_Note);
                                                span_vt.append(span_t);
                                                after_Note = (bq.HTMLFilter == 'Y') ? htmlEntities(after_Note) : after_Note ;
                                                span_vt.append(after_Note);
                                                //span_vt.innerHTML = (bq.HTMLFilter == 'Y') ? htmlEntities(span_vt.innerHTML) : span_vt.innerHTML ;

                                                p.append(span_vt);//antes
                                            }
                                        }else{
                                            //p.append(VerseText);//antes
                                            span_vt.append(VerseText);
                                            p.append(span_vt);

                                            if(bq.HTMLFilter == 'Y'){
                                                p.innerHTML = htmlEntities(p.innerHTML);
                                            }
                                        }
                                        //p.append(span_vt);//antes
                                        //SIMULTANEAMENTE CON '*' Y '<' Y '> ' la función htmlEntities() DESHABILITA tooltip.

                                        arr_data_body.push(p);
                                        //console.log(p);
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

                                            const span_title = document.createElement('span');
                                            span_title.className = 'verse_title';
                                            span_title.innerHTML = text_Title;

                                            p.append(before_Title);
                                            p.append(span_title);
                                            p.append(after_Title);
                                        }else{
                                            p.append(VerseText);
                                        }

                                        arr_data_body.push(p);
                                        //console.log(p);

                                        if(bq.HTMLFilter == 'Y'){
                                            p.innerHTML = htmlEntities(p.innerHTML);
                                        }
                                    }

                                    //Нет ни Номеров Стронга, ни Примечаний ни Оглавлений
                                    if(bq.StrongNumbers == "N" && bq.Notes == 'N' && bq.Titles == 'N'){
                                        //p.append(VerseText);//antes
                                        span_vt.append(VerseText);
                                        p.append(span_vt);

                                        arr_data_body.push(p);
                                        //console.log(p);
                                        
                                        if(bq.HTMLFilter == 'Y'){
                                            p.innerHTML = htmlEntities(p.innerHTML);
                                        }
                                    }        
                                    
                                }
                
                            });
                            
                            
                            //Posle forEach...
                            //=====================================================//
                            // 1. inicio - Numeración base Española - y col's Rusa
                            //=====================================================//
                            if(base_ep == 'Y' && bq.EnglishPsalms == 'N'){//numeración rusa
                                //console.log('Numeración base es Española - y cols es Rusa');
                                //var col1_p_length = document.querySelectorAll('#col1 .colsInner p').length;//antes
                                var arr_vstavka = [];
                                var vstavka2 = [];
                                
                                //Miro la traducción con EnglishPsalms
                                switch (parseInt(book)) {

                                    case 3: //Числа
                                            if(chapter == 12){//Числа 12:16 => Num. 13:1
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 13, 1);//add Num. 13:1
                                                arr_data_body = arr_data_body.concat(arr_vstavka);
                                                addChapterToVerse(arr_data_body, bq, book, 13, 16);//se añade capitulo 13 al verse 13 español que es 1 ruso
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 13){//13:1-33 => 13: +1
                                                arr_data_body.splice(0, 1);//[p....] - elimino primer versículo
                                            }
                                        break;

                                    case 5: //Иисус Навин
                                            if(chapter == 5){//Ис.Нав.6:1 => Josue 5:16 | 6:2-27 =>	6: -1
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 6){//Ис.Нав.6:1 => Josue 5:16 | 6:2-27 =>	6: -1
                                                addChapterToHead(bq, book, 5);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 5, 16);//add Josue 5:16
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                addChapterToVerse(arr_data_body, bq, book, 6, 2);//se añade capitulo 6 al verse 2 español que es 1 ruso
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break; 
                                        
                                    case 8: //1Samuel (1Царств) 
                                            if(chapter == 20){//20:42-а	=> 20:42:00 | 20:42-б => 20:43:00
                                                //1 verse contiene 2 en ruso
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 20, form_list_verses(1, col1_p_length+1) );                                       
                                                let arr_mezclado = mergeVerses(arr_vstavka, 42);//se meclan 42 y el siguiente 43.
                                                arr_data_body = [].concat(arr_mezclado, arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 23){//23:29 => 24:1
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 24, 1 );
                                                arr_data_body = arr_data_body.concat(arr_vstavka);//añado al final un versiculo
                                                addChapterToVerse(arr_data_body, bq, book, 24, 29);//se añade capitulo 24 al verse 29 español que es 1 ruso
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 24){//24:1-22	=> 24: +1
                                                arr_data_body.splice(0, 1);//[p....] - elimino primer versículo
                                            }
                                        break; 
                                    
                                    case 17: //Job 
                                            if(chapter == 39){
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 40){//40:1-5 => 39:31-35 | 40:6-24 =>	40: -5
                                                addChapterToHead(bq, book, 39);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 39, form_list_verses(31, 35) );
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                addChapterToVerse(arr_data_body, bq, book, 40, 6);//se añade capitulo 40 al verse 6 español que es 1 ruso
                                                arr_data_body.splice(col1_p_length);//[p....] - elimino versículos sobrantes a partir de el último hasta el fin
                                            }
                                            if(chapter == 41){//41:1-8 => 40:20-27 | 41:9-34 =>	41: -8
                                                addChapterToHead(bq, book, 40);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 40, form_list_verses(20, 27) );
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                addChapterToVerse(arr_data_body, bq, book, 41, 9);//se añade capitulo 41 al verse 9 español que es 1 ruso
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break; 

                                    case 18: //Psalmos 
                                            if(chapter >= 3 && chapter <= 8){//3:1 - 9:20 =>	Х : +1 *
                                                arr_data_body.splice(0, 1);//[p....] - elimino primer versículo
                                            }
                                            if(chapter == 9){//3:1 - 9:20 => Х : +1 *
                                                arr_data_body.splice(0, 1);//[p....] - elimino primer versículo
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 10){//10:2-18 => 9: +21
                                                addChapterToHead(bq, book, 9);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 9, form_list_verses(22, 39) );
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            //Formula Esp => Rus //Ps.X:1 => Пс.X-1:1 
                                            //-1 : Х
                                            if(
                                                (chapter == 11) || 
                                                (chapter >= 14 && chapter <= 17) || 
                                                (chapter >= 23 && chapter <= 29) || 
                                                (chapter >= 32 && chapter <= 33) || 
                                                (chapter == 35) || 
                                                (chapter == 37) || 
                                                (chapter == 43) || 
                                                (chapter == 50) || 
                                                (chapter == 66) || 
                                                (chapter >= 71 && chapter <= 74) || 
                                                (chapter >= 78 && chapter <= 79) || 
                                                (chapter == 82) || 
                                                (chapter == 86) || 
                                                (chapter == 87) || 
                                                (chapter == 91) || 
                                                (chapter >= 93 && chapter <= 101) || 
                                                (chapter >= 103 && chapter <= 107) || 
                                                (chapter >= 109 && chapter <= 114) || 
                                                (chapter >= 117 && chapter <= 146)
                                            ){
                                                addChapterToHead(bq, book, parseInt(chapter)-1);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-1, form_list_verses(1, col1_p_length) );
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            //Formula Esp => Rus //Ps.X:1 => Пс.X-1:2 
                                            //-1 : +1
                                            if(
                                                (chapter == 12) || 
                                                (chapter >= 18 && chapter <= 22) || 
                                                (chapter >= 30 && chapter <= 31) || 
                                                (chapter == 34) || 
                                                (chapter == 36) || 
                                                (chapter >= 38 && chapter <= 42) || 
                                                (chapter >= 44 && chapter <= 49) || 
                                                (chapter == 53) || 
                                                (chapter >= 55 && chapter <= 59) || 
                                                (chapter >= 61 && chapter <= 65) || 
                                                (chapter >= 67 && chapter <= 70) || 
                                                (chapter >= 75 && chapter <= 77) || 
                                                (chapter >= 80 && chapter <= 81) || 
                                                (chapter >= 83 && chapter <= 85) || 
                                                (chapter >= 88 && chapter < 90) || 
                                                (chapter == 92) || 
                                                (chapter == 102) || 
                                                (chapter == 108)
                                            ){
                                                addChapterToHead(bq, book, parseInt(chapter)-1);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-1, form_list_verses(1+1, col1_p_length+1) );// desde 2 versiculo
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            //Formula
                                            //2en1
                                            if(chapter == 13){//13:05 => 12:6-а | 13:06 => 12:6-б
                                                addChapterToHead(bq, book, parseInt(chapter)-1);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-1, form_list_verses(2, 6) );// desde 2 versiculo
                                                arr_data_body = arr_vstavka.concat(vstavka_vacio('arriba'),arr_data_body);
                                                arr_data_body.splice(col1_p_length);//1 verse español contiene 2 en ruso
                                            }
                                            //Formula
                                            //-1 : +2 *
                                            if(
                                                (chapter >= 51 && chapter <= 52) ||
                                                (chapter == 54) || 
                                                (chapter == 60)
                                            ){
                                                addChapterToHead(bq, book, parseInt(chapter)-1);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-1, form_list_verses(1+2, col1_p_length+2) );// desde 3 versiculo
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            //Formula
                                            //2en1
                                            if(chapter == 90){//90:05 => 89:6-а | 90:06	=> 89:6-б 
                                                addChapterToHead(bq, book, parseInt(chapter)-1);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-1, form_list_verses(2, col1_p_length) );
                                                let p_vacio = document.createElement('p');
                                                p_vacio.className = 'prim';
                                                p_vacio.innerHTML = 'смотри стих выше...';
                                                arr_vstavka.splice(5,0,p_vacio);
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            //Formula
                                            //-2: +8
                                            if(chapter == 115){//115:1-18 => 113: +8
                                                addChapterToHead(bq, book, parseInt(chapter)-2);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-2, form_list_verses(1+8, col1_p_length+8) );// desde 9 versiculo
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            //Formula
                                            //-2: X
                                            if(chapter == 116){//116:1-9 => 114: Х
                                                addChapterToHead(bq, book, parseInt(chapter)-2);//si el verse vstavka es primero
                                                // Sal.116:1-9 => Пс. 114:1-9
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-2, form_list_verses(1, 9) );
                                                // Sal.116:10-19 => Пс. 115:1-10
                                                vstavka2 = for_parseVerse(Translation, bq, bookModule, book, chapter-1, form_list_verses(1, 10) );
                                                arr_vstavka = arr_vstavka.concat(vstavka2);
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                addChapterToVerse(arr_data_body, bq, book, 115, 10);//se añade capitulo 115 al verse 10 español que es 1 ruso
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            //Formula
                                            //-1: X (especial)
                                            if(chapter == 147){//147:1-11 => 146:1-11
                                                addChapterToHead(bq, book, parseInt(chapter)-1);//si el verse vstavka es primero
                                                // Sal.147:1-11 => Пс.146:1-11
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-1, form_list_verses(1, 11) );
                                                // Sal.147:12-20 => Пс. 147:1-9
                                                vstavka2 = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, 9) );
                                                arr_vstavka = arr_vstavka.concat(vstavka2);
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                addChapterToVerse(arr_data_body, bq, book, 147, 12);//se añade capitulo 147 al verse 12 español que es 1 ruso
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break;

                                    case 19: //Притчи
                                            if(chapter == 4){
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length) );
                                                arr_data_body = [].concat(arr_vstavka);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break;
                                
                                    case 21: //Cantares - Песня песней
                                            if(chapter == 1){
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length) );
                                                let p_vacio = document.createElement('p');
                                                p_vacio.className = 'prim';
                                                p_vacio.innerHTML = 'заглавие...';
                                                arr_vstavka.splice(0,0,p_vacio);
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 6){//06:13 =>	07:1
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+1, 1 );
                                                arr_data_body = arr_data_body.concat(arr_vstavka);
                                                addChapterToVerse(arr_data_body, bq, book, 7, 13);//se añade capitulo 7 al verse 13 español que es 1 ruso
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 7){//7:1-13 => 7: +1 (7:2-14)
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1+1, col1_p_length+1) );
                                                arr_data_body = [].concat(arr_vstavka,arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break;

                                    case 22: //Isaías - Исаия
                                            if(chapter == 3){
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length) );
                                                let p_vacio = document.createElement('p');
                                                p_vacio.className = 'prim';
                                                p_vacio.innerHTML = 'смотри стих выше...';
                                                arr_vstavka.splice(19,0,p_vacio);
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break;

                                    case 26: //Daniel - Даниил
                                            if(chapter == 3){//3:1-30 => 3:1-30
                                                //в Синодальном переводе есть вставочные стихи, которых нет в Исп Библии. Стихи с 24 по 90 включительно переведены с греческого, потому что в еврейском тексте их нет. - Прим. ред.
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length) );
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 4){//4:1-3 => 3:31-33 | 4:4-37 => 4: -3
                                                addChapterToHead(bq, book, parseInt(chapter)-1);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-1, form_list_verses(31, 33) );
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                addChapterToVerse(arr_data_body, bq, book, 4, 4);//se añade capitulo 4 al verse 4 español que es 1 ruso
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break;

                                    case 27: //Oseas - Осия
                                            if(chapter == 13){//13:16 => 14:1
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 14, 1);
                                                arr_data_body = arr_data_body.concat(arr_vstavka);
                                                addChapterToVerse(arr_data_body, bq, book, 14, 16);//se añade capitulo 14 al verse 16 español que es 1 ruso
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 14){//14:1-9 => 14:2-10
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(2, 10) );
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break;

                                    case 31: //Jonas - Иона
                                            if(chapter == 1){//1:17 => 2:1
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 2, 1);
                                                arr_data_body = arr_data_body.concat(arr_vstavka);
                                                addChapterToVerse(arr_data_body, bq, book, 2, 17);//se añade capitulo 2 al verse 17 español que es 1 ruso
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 2){//2:1-10 => 2:2-11
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(2, 11) );
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break;

                                    case 44: //Romanos - Римлянам
                                            //book = book + 7;// 44 + 7 = 51 //Romanos - Римлянам
                                            if(chapter == 16){// 16:25-27 => 14:24-26                                          
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-2, form_list_verses(24,  26) );
                                                arr_data_body = arr_data_body.concat(arr_vstavka);
                                                addChapterToVerse(arr_data_body, bq, book, 14, 25);//se añade capitulo 14 al verse 25 español que es 24-26 ruso
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break;

                                    case 46: //2Corintios - 2-Коринфянам
                                            //book = book + 7;// 46 + 7 = 53 //2Corintios - 2-Коринфянам
                                            if(chapter == 13){// 13:12-13 => 13:12 | 13:14 => 13:13                                          
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length-1) );
                                                let p_vacio = document.createElement('p');
                                                p_vacio.className = 'prim';
                                                p_vacio.innerHTML = 'смотри стих выше...';
                                                arr_vstavka.splice(12,0,p_vacio);
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break;
                                    
                                    default:
                                        //console.log('default en switch');
                                        break;
                                }//fin switch
                            }
                            //=====================================================//
                            // fin - Numeración base Española - y col's Rusa
                            //=====================================================//
                            
                            
                            //=====================================================//
                            // 2. inicio - Numeración base Rusa - y col's Española
                            //=====================================================//
                            if(base_ep == 'N' && bq.EnglishPsalms == 'Y'){//numeración Española
                                //console.log('Numeración base Rusa - y cols Española');
                                //var col1_p_length = document.querySelectorAll('#col1 .colsInner p').length;//antes
                                //console.log(' --- dentro de bloque Numeración base Rusa - y cols Española --- col1_p_length: '+col1_p_length);//test
                                var arr_vstavka = [];
                                var vstavka2 = [];
                                
                                //Miro la traducción con EnglishPsalms
                                switch (parseInt(book)) {

                                    case 3: //Числа
                                            if(chapter == 12){//12:X => 12:X (quito ultimo verse)
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length) );
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 13){//Числа 13:1 => Num.12:16 
                                                addChapterToHead(bq, book, 12);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 12, 16);
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                addChapterToVerse(arr_data_body, bq, book, 13, 2);//result Num.13:1 => Números 13 Num.13:1
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break;

                                    case 5: //Иисус Навин
                                            if(chapter == 5){//Иис.Нав.5:16 => Jos.6:1                                    
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 6, 1);
                                                arr_data_body = arr_data_body.concat(arr_vstavka);
                                                addChapterToVerse(arr_data_body, bq, book, 6, 16);//se añade capitulo 5 al verse 16 ruso que es 1 español
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 6){//Иис.Нав.6:1 => Jos.6:2 ... Иис.Нав.6:26 => Jos.6:27
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1+1, col1_p_length+1));
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break; 
                                        
                                    case 8: //1Samuel (1Царств) 
                                            if(chapter == 20){//1Цар.20:42-43 => 1Sam 20:42
                                                //1 verse contiene 2 en ruso
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length-1) );
                                                arr_data_body = [].concat(arr_vstavka,vstavka_vacio('arriba'));
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 23){//
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length) );
                                                arr_data_body = arr_data_body.concat(arr_vstavka);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 24){//1Цар.24:1 => 1S.23:29
                                                addChapterToHead(bq, book, 23);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 23, 29 );//cojo último verse del capitulo anterior
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                addChapterToVerse(arr_data_body, bq, book, 24, 2);//se añade capitulo 24 al verse 2 ruso que es 1 español
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break; 
                                    
                                    case 17: //Job 
                                            if(chapter == 39){//39:31-35 => 40:1-5  | 40:6-24 =>	40: -5
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 40, form_list_verses(1, 5) );
                                                arr_data_body = arr_data_body.concat(arr_vstavka);
                                                addChapterToVerse(arr_data_body, bq, book, 40, 31);//se añade capitulo 40 al verse 31 ruso que es 1 español
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 40){//40:1-19 => 40:6-24 
                                                //console.log(arr_data_body);//arr_data_body trae todos los verses del capitulo  40:1-24
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 40, form_list_verses(6, 24) );//trae 8 verses 40:6-24
                                                //console.log(arr_vstavka);//trae 8 verses 40:6-24
                                                vstavka2 = for_parseVerse(Translation, bq, bookModule, book, 41, form_list_verses(1, 8) );//trae 8 verses 41:1-8
                                                //console.log(vstavka2);
                                                arr_data_body = [].concat(arr_vstavka, vstavka2);//[]. reescribe y une 40:6-24 con 41:1-8 
                                                //console.log(arr_data_body);
                                                addChapterToVerse(arr_data_body, bq, book, 41, 20);//se añade capitulo 41 al verse 20 ruso que es 1 español                                        
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 41){//40:1-26 => 41:9-34
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 41, form_list_verses(9, 34) );
                                                arr_data_body = [].concat(arr_vstavka);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break; 

                                    case 18: //Psalmos 
                                            if(chapter >= 3 && chapter <= 8){//3:1 - 9:20 =>	Х : +1 *
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length-1) );
                                                arr_data_body = [].concat(vstavka_vacio(), arr_vstavka);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 9){//3:1 - 9:20 => Х : +1 *
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, 20) );
                                                vstavka2 = for_parseVerse(Translation, bq, bookModule, book, 10, form_list_verses(1, 18) );
                                                arr_data_body = [].concat(vstavka_vacio(), arr_vstavka, vstavka2);
                                                addChapterToVerse(arr_data_body, bq, book, 10, 22);//se añade capitulo 10 al verse 22 ruso que es 1 español 
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            //Formula Esp => Rus //Пс.X:1 => Ps.X+1:1 
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
                                                (chapter >= 116 && chapter <= 138) ||
                                                (chapter >= 140 && chapter <= 145)
                                            ){
                                                addChapterToHead(bq, book, parseInt(chapter)+1);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+1, form_list_verses(1, col1_p_length) );
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            //Formula Esp => Rus //Пс.X+1:2 => Ps.X:1 //добавляю пустой стих сначала в исп перевод
                                            //+1 : -1
                                            if(
                                                (chapter == 11) || 
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
                                                (chapter == 139)
                                            ){
                                                addChapterToHead(bq, book, parseInt(chapter)+1);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+1, form_list_verses(1, col1_p_length-1) );
                                                arr_data_body = [].concat(vstavka_vacio(), arr_vstavka);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            //Formula
                                            //+1 : -2 | Ej.:  50:0 => 51:1 | 50:1 => 51:2
                                            if(
                                                (chapter >= 50 && chapter <= 51) ||
                                                (chapter == 53) || 
                                                (chapter == 59)
                                            ){
                                                addChapterToHead(bq, book, parseInt(chapter)+1);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+1, form_list_verses(1, col1_p_length-2) );
                                                arr_data_body = [].concat(vstavka_vacio(),vstavka_vacio(), arr_vstavka);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            //Formula
                                            //2en1
                                            if(chapter == 89){//89:6 => 90:5-6 
                                                addChapterToHead(bq, book, parseInt(chapter)+1);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+1, form_list_verses(1, col1_p_length) );
                                                var new_arr = [];
                                                arr_vstavka.map((el,i,arr) => {
                                                    if(i == 4){
                                                        const p_new = document.createElement('p');
                                                        p_new.innerHTML = arr[i].innerHTML + '<br>' + arr[i+1].innerHTML;
                                                        new_arr.push(p_new); 
                                                    }else{
                                                        new_arr.push(el);
                                                    }
                                                });
                                                new_arr.splice(5, 0);//elimino verse 6 (90:6) 
                                                //console.log(new_arr);
                                                arr_vstavka = new_arr;
                                                arr_data_body = [].concat(vstavka_vacio(), arr_vstavka);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            //Formula
                                            //+2: -8
                                            if(chapter == 113){//113: +8 => 115:1-18 | Пс.113:9 => Sal.115:1
                                                addChapterToHead(bq, book, parseInt(chapter)+1);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+1, form_list_verses(1, 8) );
                                                vstavka2 = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+2, form_list_verses(1, 18) );
                                                arr_data_body = [].concat(arr_vstavka, vstavka2);
                                                addChapterToVerse(arr_data_body, bq, book, 115, 9);//se añade capitulo 115 al verse 9 ruso que es 1 español
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            //Formula
                                            //-2: X
                                            if(chapter == 114){// Пс. 114:1-9 => Sal.116:1-9 
                                                addChapterToHead(bq, book, parseInt(chapter)+2);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+2, form_list_verses(1, 9) );
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 115){// Пс. 115:1-10 => Sal.116:10-19
                                                addChapterToHead(bq, book, parseInt(chapter)+1);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+1, form_list_verses(10, 19) );
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            //Formula (especial)
                                            if(chapter == 146){// Пс.146:1-11 => Sal.147:1-11
                                                addChapterToHead(bq, book, parseInt(chapter)+1);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+1, form_list_verses(1, 11) );
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            //Formula (especial)
                                            if(chapter == 147){// Пс.147:1-11 => Sal.147:12-20
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(12, 20) );
                                                arr_data_body = arr_vstavka.concat(arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break;                                 

                                    case 19: //Притчи
                                            if(chapter == 4){
                                                //arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length-2) );
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length) );
                                                //arr_data_body = [].concat(arr_vstavka, vstavka_vacio(), vstavka_vacio());
                                                arr_data_body = [].concat(arr_vstavka);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break;
                                    
                                    case 21: //Cantares - Песня песней
                                            if(chapter == 1){
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length) );
                                                //console.log(arr_vstavka);
                                                var new_arr = [];
                                                arr_vstavka.map((el,i,arr) => {
                                                    if(i == 0){
                                                        const p_new = document.createElement('p');
                                                        p_new.innerHTML = arr[i].innerHTML + '<br>' + arr[i+1].innerHTML;
                                                        new_arr.push(p_new); 
                                                    }else{
                                                        new_arr.push(el);
                                                    }
                                                });
                                                new_arr.splice(1, 1);//elimino verse  (Cantar 1:2) 
                                                //console.log(new_arr);
                                                arr_vstavka = new_arr;
                                                //arr_data_body = [].concat(arr_vstavka, vstavka_vacio('arriba'));//mal
                                                arr_data_body = [].concat(arr_vstavka);//ok
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 6){//06:1-12 => 06:1-12	
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 7){//07:1 => 06:13	
                                                addChapterToHead(bq, book, 6);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)-1, 13 );
                                                arr_data_body = [].concat(arr_vstavka, arr_data_body);
                                                addChapterToVerse(arr_data_body, bq, book, 7, 2);//se añade capitulo 7 al verse 2 ruso que es 1 español
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break;

                                    case 22: //Isaías - Исаия
                                            if(chapter == 3){
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length) );
                                                var new_arr = [];
                                                arr_vstavka.map((el,i,arr) => {
                                                    if(i == 18){
                                                        const p_new = document.createElement('p');
                                                        p_new.innerHTML = arr[i].innerHTML + '<br>' + arr[i+1].innerHTML;
                                                        new_arr.push(p_new); 
                                                    }else{
                                                        new_arr.push(el);
                                                    }
                                                });
                                                new_arr.splice(19, 1);//elimino verse  (Is.3:19) 
                                                //console.log(new_arr);
                                                arr_vstavka = new_arr;
                                                //arr_data_body = [].concat(arr_vstavka, vstavka_vacio('arriba'));
                                                arr_data_body = [].concat(arr_vstavka);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break;

                                    case 26: //Daniel - Даниил
                                            if(chapter == 3){//3:1-30 => 3:1-30
                                                //в Синодальном переводе есть вставочные стихи, которых нет в Исп Библии. Стихи с 24 по 90 включительно переведены с греческого, потому что в еврейском тексте их нет. - Прим. ред.
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, 30) );
                                                vstavka2 = for_parseVerse(Translation, bq, bookModule, book, 4, form_list_verses(1, 3) );
                                                arr_data_body = [].concat(arr_vstavka, vstavka2);
                                                addChapterToVerse(arr_data_body, bq, book, 4, 31);//se añade capitulo 4 al verse 31 ruso que es 1 español
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 4){
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(4, col1_p_length+3) );
                                                arr_data_body = [].concat(arr_vstavka, arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break;

                                    case 27: //Oseas - Осия
                                            if(chapter == 14){//14:1 => 13:16 
                                                addChapterToHead(bq, book, 13);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 13, 16);
                                                arr_data_body = [].concat(arr_vstavka, arr_data_body);
                                                addChapterToVerse(arr_data_body, bq, book, 14, 2);//se añade capitulo 14 al verse 2 ruso que es 1 español
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break;

                                    case 31: //Jonas - Иона
                                            if(chapter == 1){
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, form_list_verses(1, col1_p_length));
                                                arr_data_body = [].concat(arr_vstavka, arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                            if(chapter == 2){// 2:1 => 1:17
                                                addChapterToHead(bq, book, 1);//si el verse vstavka es primero
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 1, 17);
                                                arr_data_body = [].concat(arr_vstavka, arr_data_body);
                                                addChapterToVerse(arr_data_body, bq, book, 2, 2);//se añade capitulo 2 al verse 2 ruso que es 1 español
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break;

                                    case 44: //Romanos - Римлянам
                                            if(chapter == 14){// 14:24-26 => 16:25-27                                       
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 16, form_list_verses(25,  27) );
                                                arr_data_body = arr_data_body.concat(arr_vstavka);
                                                addChapterToVerse(arr_data_body, bq, book, 16, 24);//se añade capitulo 14 al verse 24 ruso que es 1 español
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break;

                                    case 46: //2Corintios - 2-Коринфянам
                                            if(chapter == 13){// 13:12-13 => 13:12 | 13:14 => 13:13                                          
                                                arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length+1) );
                                                var new_arr = [];
                                                arr_vstavka.map((el,i,arr) => {
                                                    if(i == 11){
                                                        const p_new = document.createElement('p');
                                                        p_new.innerHTML = arr[i].innerHTML + '<br>' + arr[i+1].innerHTML;
                                                        new_arr.push(p_new); 
                                                    }else{
                                                        new_arr.push(el);
                                                    }
                                                });
                                                new_arr.splice(12, 1);//elimino verse  (Is.3:19) 
                                                //console.log(new_arr);
                                                arr_vstavka = new_arr;
                                                arr_data_body = [].concat(arr_vstavka, arr_data_body);
                                                arr_data_body.splice(col1_p_length);
                                            }
                                        break;

                                    default:
                                        //console.log('default en switch');
                                        break;
                                }//fin switch
                            }
                            //=====================================================//
                            // inicio - Numeración base Rusa - y col's Española
                            //=====================================================//
                            

                            //console.log('arr_data_head');
                            //console.log(arr_data_head);

                            //console.log('arr_data_body');
                            //console.log(arr_data_body);

                            arr_data_body.forEach((el,i)=>{//cambio data-verse
                                el.setAttribute('data-verse', i + 1 );
                            });

                            arr_data_all = arr_data_head.concat(arr_data_body);

                            arr_data_all.forEach((el,i)=>{
                                //document.querySelector('#col1 .colsInner').append(el);
                                //console.log(el);
                                divShow.append(el);
                            });
                            arr_data_head = [];
                            arr_data_body = [];
                            arr_data_all = [];
                            

                            window.iter_i++;
                            if(window.iter_i < window.arr_trans.length){
                                //console.log('iter_i: '+iter_i);
                                //showChapterText3(arr_trans[iter_i],'#'+arr_divShow[iter_i], book, chapter, verseNumber, to_verseNumber, verseView);
                                showChapterText4(arr_trans[iter_i],'#'+arr_divShow[iter_i], book, chapter, verseNumber, to_verseNumber, verseView);
                            }

                        }else{
                            //console.log(' no existe capítulo '+chapter+' del módulo '+book);
                            divShow.innerHTML = '<p class="prim">Текущий модуль Библии не содержит стихов для выбранной книги.</p>';
                        }
                    })
                    .then(() => {
                        mySizeWindow();
                        mySizeVerse();
                        /*
                        //si es ultimo elemento, añado padding-bottom
                        let p_last = divShow.querySelector('p:last-child');
                        let mb_h = divShow.offsetHeight - p_last.offsetHeight;
                        console.log('mb_h: '+mb_h)
                        p_last.style.marginBottom = mb_h + 'px';
                        p_last.style.background = 'lightgreen';
                        */
                    })
                    .then(() => {
                        
                        if(verseNumber !== null &&  verseNumber != "" && verseView == null){
                            //console.log('verseNumber !== null &&  verseNumber != "" && verseView == null');

                            //styles of other verses
                            if(to_verseNumber !== null && to_verseNumber != ""){
                                //console.log('hay to_verseNumber');
                                if(parseInt(verseNumber) < parseInt(to_verseNumber)){
                                    for (let i = parseInt(verseNumber); i <= parseInt(to_verseNumber); i++) {
                                        Array.from(document.querySelectorAll('[data-verse="'+i+'"]')).forEach(el=>{
                                            if(i == parseInt(verseNumber)) {
                                                el.classList.add('active_first');                
                                            }else if(i == parseInt(to_verseNumber)) {
                                                el.classList.add('active_last');                
                                            }else{
                                                el.classList.add('active_middle');                
                                            }
                                        });
                                    }
                                } 
                            }else{
                                //console.log('no hay to_verseNumber. reviso verseNumber');
                                //only one verse of each translation
                                if(verseNumber !== null && verseNumber != ""){
                                    document.querySelectorAll('[data-verse="'+verseNumber+'"]').forEach(el=>{
                                        el.classList.add('active_one');
                                    });
                                }
                            }                
                        
                            //scroll to verse o verses activos
                            //scrollToVerse(verseNumber, to_verseNumber);
                        }

                        if(verseView !== null && verseView != ""){
                            //console.log('hay verseView');

                            //styles of other verses of col1
                            if(to_verseNumber !== null && to_verseNumber != ""){
                                //console.log('hay to_verseNumber');
                                if(parseInt(verseNumber) < parseInt(to_verseNumber)){
                                    for (let i = parseInt(verseNumber); i <= parseInt(to_verseNumber); i++) {
                                        Array.from(document.querySelectorAll('#col1 .colsInner [data-verse="'+i+'"]')).forEach(el=>{
                                            if(i == parseInt(verseNumber)) {
                                                el.classList.add('active_first');                
                                            }else if(i == parseInt(to_verseNumber)) {
                                                el.classList.add('active_last');                
                                            }else{
                                                el.classList.add('active_middle');                
                                            }
                                        });
                                    }
                                } 
                            }else{
                                //console.log('no hay to_verseNumber. reviso verseNumber');
                                //only one verse of each translation
                                if(verseNumber !== null && verseNumber != ""){
                                    document.querySelectorAll('.colsInner [data-verse="'+verseNumber+'"]').forEach(el=>{
                                        el.classList.add('active_one');
                                    });
                                }
                            }                
                        }
                    })
                    .then(() => {
                        //si hay versiculo marcado con amarillo...
                        if(verseNumber !== null &&  verseNumber != "" ){
                            //scroll to verse o verses activos
                            scrollToVerse(verseNumber, to_verseNumber);

                            //y si con el versiculo marcado existe verse de la vista...
                            if(verseView !== null && verseView != ""){
                                //scroll to verseView
                                scrollToVerseView(verseView);
                            }
                        }else{
                            //console.log('no hay verseNumber');
                            if(verseView !== null && verseView != ""){
                                //scroll to verseView
                                scrollToVerseView(verseView);
                            }
                        }
                        
                    })
                    .then(() => {
                        mySizeWindow();
                        mySizeVerse();
                        addListenerToPA();//listen links p > a
                    })
                    .catch((error) => {
                        // Manejar cualquier error que pueda ocurrir durante la solicitud o el procesamiento de la respuesta
                        console.log('error promesa en fetch() modo old. error: '+error);
                    });

                }else{//si no está el id de book en el modulo...
                    document.querySelectorAll('.colsInner').forEach(el=>{
                        if(el.childElementCount == 0 || el.textContent == ''){
                            var p = document.createElement('p');
                            p.className = 'prim';
                            p.innerHTML = `3. En este módulo no existe el libro indicado.`;
                            el.append(p);
                            //alert(' vacio');
                        }else{
                            //alert(' no vacio');
                        }
                    });
                }            
            });
        }//fin - modo old
        


    }//end --- typeof Translation
    else{
        console.log('la traducción no está seleccionada. Translation: '+Translation); 
        //alert(`La traducción no está seleccionada. Selecciónala presionando sobre el símbolo '+' o nombre corto de la traducción.`);       
    }


}


function form_list_verses(from_verse, to_verse){
    var lista_verses = [];
    for (let i = from_verse; i <= to_verse; i++) {
        lista_verses.push(i);                                                    
        //console.log('abajo lista_verses');
        //console.log(lista_verses);
    }
    return lista_verses;
}

function vstavka_vacio(direccion){
    //var arr = [];
    let p_vacio = document.createElement('p');
    p_vacio.className = 'prim';

    if(direccion == 'arriba'){
        p_vacio.innerHTML = 'смотри стих выше...';
    }else if(direccion == 'abajo'){
        p_vacio.innerHTML = 'смотри стих ниже...';
    }else{
        p_vacio.innerHTML = 'эквивалент стиха отсутствует в данном переводе...';
    } 
    
    //console.log('vstavka_vacio arr:');
    //console.log(p_vacio);
    return p_vacio;
}

function addChapterToHead(bq, book, chapter){
    arr_data_head.pop();//elimino h2 (Numeros 13)
    const h2_new = document.createElement('h4');
    h2_new.innerHTML = bq.Books[book].FullName + ' ' + chapter;
    //console.log(h2_new);
    
    let result = arr_data_head.push(h2_new); 
    //console.log(result);

    return result; 
}

function addChapterToVerse(arr_data_body, bq, book, chapter, verseNumber){
    let arr_new = [];
    arr_data_body.forEach((el,i) => {
        if(i == verseNumber-1){           
            const h2_vstavka = '<span class="h4_ch">'+bq.Books[book].FullName + ' ' + chapter + '</span>';
            el.innerHTML = h2_vstavka + el.innerHTML;
            //console.log('nuevo el.innerHTML: '+el.innerHTML);
            arr_new.push(el);
        }else{
            arr_new.push(el);
        }
    });
    //console.log('abajo arr_new: ');
    //console.log(arr_new);
    
    arr_data_body = arr_new; 
    //console.log(arr_data_body);
    return arr_data_body; 
}


function mergeVerses(arr_data_body, verseNumber){
    var new_arr = [];
    arr_data_body.map((el,i,arr) => {
        if(i == verseNumber-1){
            const p_vstavka = '<br>' + arr[i+1].innerHTML;
            el.innerHTML = arr[i].innerHTML + p_vstavka;
            new_arr.push(el); 
        }else{
            new_arr.push(el);
        }
    });
    new_arr.splice(verseNumber-1, 0);//elimino verse verseNumber ya que lo sustituyo con el mezclado 
    //console.log(new_arr);

    arr_data_body = new_arr;
    return arr_data_body;
}


function for_parseVerse(Translation, bq, bookModule, book, chapter, arr_verses ){
    var a = [];

    //Hay solo un verse
    if(typeof arr_verses == 'number'){// 1 vez
        //console.log('[if]--- hay un verse');
        a = parseVerse(Translation, bq, bookModule, book, chapter, arr_verses );// 1 vez
        //console.log('antes a: ');
        //console.log(a);
    }
    else if(typeof arr_verses == 'object'){//hay más verses
        //console.log('[else] --- hay arr_verses: '+arr_verses);
        for (let i = 0; i < arr_verses.length; i++) {
            a[i] = parseVerse(Translation, bq, bookModule, book, chapter, arr_verses[i]);
            //console.log('a: ');
            //console.log(a);
        }
        //console.log('antes a: ');
        //console.log(a);

        a = a.flat(1);//The depth level specifying how deep a nested array structure should be flattened. Defaults to 1.        
        //console.log('despues a: ');
        //console.log(a);

    }
    //console.log('return a: ');
    //console.log(a);

    return a;
}

function parseVerse(Translation, bq, bookModule, book, chapter, verseNumber){
    
    var verse_add = bookModule.split('<h4>')[chapter].split('<p>')[verseNumber];
    var el = verse_add;
    var arr_data_add = [];

        if(el.includes('</p>')){
            var arr_p_text = el.split('</p>');
            var p_Text = arr_p_text[0];
        }else{
            var p_Text = el;
        }
        //console.log('p_Text: '+p_Text); 

        var arr_p = p_Text.split(' ');
        var VerseId = arr_p[0];
        //console.log('VerseId: '+VerseId);

        var VerseText = '';
        for(let index = 1; index < arr_p.length; index++){
            VerseText += arr_p[index] + ' ';
        }
        //console.log('VerseText: '+VerseText);

        var p = document.createElement('p');
        p.id = Translation +'__'+book + '__' + chapter + '__' + VerseId;
        //p.setAttribute('data-verse',data_verse_add);//meto el numero correspondiente a trans1

        var a = document.createElement('a');
        a.href = '#';
        a.classList.add = 'blink';
        a.innerHTML = bq.Books[book].ShortNames[0] + chapter + ':' + VerseId;
        p.append(a);
        p.append(' '); 

        const span_vt = document.createElement('span');
        span_vt.className = 'vt';//text de Verse para aplicar HTMLFilter si hay


        //Номера Стронга в стихах (RST+)
        if(bq.StrongNumbers == "Y"){
            let t = VerseText;
            var arr_t = t.split(' ');

            arr_t.forEach((el,i) => {    
                
                //element of string is Strong Number
                if(!isNaN(parseInt(el)) || el == '0'){//number                         
                    const span_strong = document.createElement('span');
                    span_strong.className = 'strong'; 
                    let last_char = (el.length > 1) ? el.charAt(el.length-1) : "" ;

                    //si ultimo carácter es string
                    if(last_char != '' && isNaN(last_char)){
                        let el_number = el.substring(0,el.length-1);
                        let el_string = last_char;
                        span_strong.innerHTML = el_number;
                        p.append(span_strong);
                        p.append(el_string);
                    }else{//es number
                        span_strong.innerHTML = el;
                        p.append(span_strong);
                    }

                }else{//is word
                    p.append(' ');
                    p.append(el);
                }
            });
            p.innerHTML.trim();

            //console.log('antes: ' + p.innerHTML);
            if(bq.HTMLFilter == 'Y'){
                p.innerHTML = htmlEntities(p.innerHTML);
            }
            //console.log('despues: '+p.innerHTML);

            arr_data_add.push(p);
            //console.log(p);
            
            //добавляю стих в див
            //divShow.append(p);
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

                    const span_t = document.createElement('span');
                    span_t.className = 'tooltip';
                    span_t.setAttribute('data-tooltip',text_Note);
                    span_t.innerHTML = bq.NoteSign;

                    span_t.addEventListener('mouseenter', function(){
                        showTooltip(this);
                    });
                    span_t.addEventListener('mouseleave', function(){
                        hideTooltip(this);
                    });
                    /*
                    //antes
                    p.append(before_Note);
                    p.append(span_t);
                    p.append(after_Note);
                    */

                    before_Note = (bq.HTMLFilter == 'Y') ? htmlEntities(before_Note) : before_Note ;
                    span_vt.append(before_Note);
                    span_vt.append(span_t);
                    after_Note = (bq.HTMLFilter == 'Y') ? htmlEntities(after_Note) : after_Note ;
                    span_vt.append(after_Note);
                    //span_vt.innerHTML = (bq.HTMLFilter == 'Y') ? htmlEntities(span_vt.innerHTML) : span_vt.innerHTML ;

                    p.append(span_vt);//antes
                }
            }else{
                //p.append(VerseText);//antes
                span_vt.append(VerseText);
                p.append(span_vt);

                if(bq.HTMLFilter == 'Y'){
                    p.innerHTML = htmlEntities(p.innerHTML);
                }
            }
            //p.append(span_vt);//antes
            //SIMULTANEAMENTE CON '*' Y '<' Y '> ' la función htmlEntities() DESHABILITA tooltip.

            arr_data_add.push(p);
            //console.log(p);
            
            //добавляю стих в див
            //divShow.append(p);
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

                const span_title = document.createElement('span');
                span_title.className = 'verse_title';
                span_title.innerHTML = text_Title;

                p.append(before_Title);
                p.append(span_title);
                p.append(after_Title);
            }else{
                p.append(VerseText);
            }

            arr_data_add.push(p);
            //console.log(p);

            //добавляю стих в див
            //divShow.append(p);

            if(bq.HTMLFilter == 'Y'){
                p.innerHTML = htmlEntities(p.innerHTML);
            }
        }

        //Нет ни Номеров Стронга, ни Примечаний ни Оглавлений
        if(bq.StrongNumbers == "N" && bq.Notes == 'N' && bq.Titles == 'N'){
            //p.append(VerseText);//antes
            span_vt.append(VerseText);
            p.append(span_vt);

            arr_data_add.push(p);
            //console.log(p);
            
            //добавляю стих в див
            //divShow.append(p);

            if(bq.HTMLFilter == 'Y'){
                p.innerHTML = htmlEntities(p.innerHTML);
            }
        }

        return arr_data_add;

}


window.addEventListener('load',function(d){
    //console.log('load - window.innerWidth: '+window.innerWidth);
    mySizeWindow();
    mySizeVerse();
});

window.addEventListener('resize',function(d){
    //console.log('resize - window.innerWidth: '+window.innerWidth);
    mySizeWindow();
    mySizeVerse();
});

//Por defecto ancho de sidebar
var wrapper = document.querySelector('#wrapper');
var def_w = wrapper.offsetWidth * 0.3;//30%
if(document.querySelector('#sidebar')!= null){
    //document.querySelector('#headerSidebar').style.width = def_w +'px';
    document.querySelector('#sidebar').style.width = def_w +'px';
}


function resizeSidebar(par){
    //console.log('function resizeSidebar(par)');

    var sidebar_w = (!isNaN(parseInt(document.querySelector('#sidebar').style.width)))
        ? parseInt(document.querySelector('#sidebar').style.width)
        : def_w ;

    min_w = wrapper.offsetWidth * 0.05;//5%
    max_w = wrapper.offsetWidth;//100%

    if(par == 'less'){
        if( sidebar_w > wrapper.offsetWidth * 0.1 ){
            sidebar_w -= wrapper.offsetWidth * 0.05;
        }
    }else{
        if( sidebar_w < wrapper.offsetWidth * 0.5 ){
            sidebar_w += wrapper.offsetWidth * 0.05;
        }
    }
    //console.log(sidebar_w);
    document.querySelector('#headerSidebar').style.width = sidebar_w +'px';
    document.querySelector('#sidebar').style.width = sidebar_w +'px';
    mySizeWindow();
    mySizeVerse();
}

function openSidebar(el){
    let transClicked,idCol_transClicked;
    if(el.dataset.typebtn == 'transMenu'){//menu hamburguesa en mobile
        //saco la trans desde su padre de id="trans2.." accediendo a data-trans 4 niveles arriba
        //para saber en qué traducción se he dado el click
        transClicked = el.parentElement.parentElement.parentElement.parentElement.dataset.trans;
        idCol_transClicked = el.parentElement.parentElement.parentElement.parentElement.id;
        //console.log('clicked MENU of transClicked: '+transClicked);
        //console.log('clicked MENU of idCol_transClicked: '+idCol_transClicked);
    }
    else if(el.dataset.typebtn == 'transRef'){//ref o link Rom.10:17 en mobile
        //saco la trans desde su padre de id="trans2.." accediendo a data-trans 5 niveles arriba
        //para saber en qué traducción se he dado el click
        transClicked = el.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.trans;
        idCol_transClicked = el.parentElement.parentElement.parentElement.parentElement.parentElement.id;
        //console.log('clicked REF of transClicked: '+transClicked);
        //console.log('clicked REF of idCol_transClicked: '+idCol_transClicked);
    }

    if(typeof transClicked == 'undefined'){
        let inpt_nav = document.querySelector('#inpt_nav');
        if(inpt_nav.dataset.trans != ''){
            transClicked = inpt_nav.dataset.trans;
        }else{//default de #trans1
            transClicked = document.querySelector('#trans1').dataset.trans;
        }
        //console.log('new clicked MENU of transClicked: '+transClicked);
    }

    //cambio trans en la navegación del sidebar
    changeTransNav(transClicked,idCol_transClicked);

    let sidebar = document.querySelector('#sidebar');
    if(sidebar.classList.length == 0){//se ve, lo oculto
         //console.log("1) sidebar no tiene classe. se ve. Lo muestro de left a right");
         sidebar.classList.add('sideHide');
         setTimeout(()=>{
            sidebar.classList.remove('sideHide');
            sidebar.classList.add('sideShow');
         },3);
     }else if(sidebar.classList.contains('sideHide')){//no se ve, lo muestro
         //console.log("2, contains('sideHide')");
         sidebar.classList.remove('sideHide')
         sidebar.classList.add('sideShow');
     }
     
     mySizeWindow();
     mySizeVerse();
}

function closeSidebar(el){
    let sidebar = document.querySelector('#sidebar');
    //console.log("3, contains('sideShow')");
    sidebar.classList.remove('sideShow')
    sidebar.classList.add('sideHide');  
     
     mySizeWindow();
     mySizeVerse();
}

function hideShowSidebar(el){ 
    let sidebar = document.querySelector('#sidebar');
    let v_line = document.querySelector('#v_line');
    let disp = sidebar.style.display;
    if(disp != 'none' || sidebar.offsetWidth > 0){//si se ve
        disp = 'none';//lo oculto
        el.innerText = 'Show';
    }else{
        disp = 'block';//lo muestro
        el.innerText = 'Hide';
    }
    sidebar.removeAttribute('class');
    //document.querySelector('#headerSidebar').style.display = disp;
    sidebar.style.display = disp;
    v_line.style.display = disp;
    
    mySizeWindow();
    mySizeVerse();

}

getActTrans();

function getActTrans(){
    var act_trans = document.querySelector('#trans1').getAttribute('data-trans');
    let trans_buttons = document.querySelectorAll('#footerInner button');
    trans_buttons.forEach(el=>{
        if(el.value == act_trans){
            el.classList.add('btn_active');
        }
    });
}

function changeTransNav(trans, idCol_trans){
    // console.log('=== function changeTransNav ===');
    // console.log('trans to change en nav. trans: '+trans);
    // console.log('trans to change en nav. idCol_trans: '+idCol_trans);

    if(typeof trans == 'undefined'){
        trans = document.querySelector('#trans1').dataset.trans;
    }

    //en navegación
    var inpt_nav = document.querySelector('#inpt_nav');
    var id_book = inpt_nav.getAttribute('data-id_book');
    var chapter = inpt_nav.getAttribute('data-show_chapter');
    var verseNumber = inpt_nav.getAttribute('data-show_verse');
    var to_verseNumber = (inpt_nav.getAttribute('data-show_to_verse') != '') ? inpt_nav.getAttribute('data-show_to_verse') : null ;
    inpt_nav.dataset.divtrans = idCol_trans;
    inpt_nav.dataset.trans = trans;

    chapter = (chapter != '') ? chapter : 1;//default si no hay

    var Translation = trans;
    url_bq = `modules/text/${Translation}/bibleqt.json`;

    fetch(url_bq)
        .then((response) => response.json())
        .then((bq) => {


            if(document.querySelectorAll('.cols').length > 1){
                var chapter = obj_nav.show_chapter;
                var verse = obj_nav.show_verse; 
                var to_verse = null;//todavia no está seleccionado
                
                var res_new_link = checkRefNav(id_book, chapter, verse, to_verse);

                if(res_new_link){
                    //asigno nuevo valor
                    var bookNumber = res_new_link[0];
                    var chapterNumber = res_new_link[1];
                    var verseNumber = res_new_link[2];
                    var to_verseNumber = res_new_link[3];
                    var trans_BookShortName = res_new_link[4];
                    
                    // console.log('---despues---');
                    // console.log('3.--- res_new_link --- ahora bookNumber: '+bookNumber);//empezando de 1
                    // console.log('3.--- res_new_link --- ahora chapterNumber: '+chapterNumber);//empezando de 1
                    // console.log('3.--- res_new_link --- ahora verseNumber: '+verseNumber);//empezando de 1
                    // console.log('3.--- res_new_link --- ahora to_verseNumber: '+to_verseNumber);//mayor que verseNumber
                    // console.log('3.--- res_new_link --- ahora trans_BookShortName: '+trans_BookShortName);

                    var new_ref_text = trans_BookShortName;
                    if(chapterNumber > 0) new_ref_text += ' ' + chapterNumber;
                    if(verseNumber > 0) new_ref_text += ':' + verseNumber;
                    if(to_verseNumber > 0 && parseInt(to_verseNumber) > parseInt(verseNumber)) new_ref_text += '-' + to_verseNumber;
                    document.querySelector('#inpt_nav').value = new_ref_text;
                }
            }else{// un trans1
                inpt_nav.setAttribute('data-show_book', bq.Books[id_book].ShortNames[0]);
                inpt_nav.value = bq.Books[id_book].ShortNames[0];
    
                if(chapter > 0) inpt_nav.value += ' ' + chapter;
                if(typeof chapter == 'undefined' && inpt_nav.dataset.divtrans == 'trans1' && inpt_nav.dataset.show_chapter > 0) inpt_nav.value += ' ' + inpt_nav.dataset.show_chapter;
    
    
                if(parseInt(verseNumber) > 0) inpt_nav.value += ':' + verseNumber;
                if(typeof verseNumber == 'undefined' && inpt_nav.dataset.divtrans == 'trans1' && inpt_nav.dataset.show_verse > 0) inpt_nav.value += ':' + inpt_nav.dataset.show_verse;
    
                if(parseInt(to_verseNumber) > parseInt(verseNumber)) inpt_nav.value += '-' + to_verseNumber;
                if(typeof verseNumber == 'undefined' && inpt_nav.dataset.divtrans == 'trans1' && inpt_nav.dataset.show_to_verse > 0) inpt_nav.value += '-' + inpt_nav.dataset.show_to_verse;
            }
            
            //modifico los nombres de libros de la biblia en nav.
            sel(document.querySelector('#s_book'),'b',null,trans);
        })
        .catch(error => { 
            // Código a realizar cuando se rechaza la promesa
            //console.log('error promesa: '+error);
        });

}

function changeTrans(e, trans, BibleShortName, EnglishPsalms){
    var trans_buttons = document.querySelectorAll('#footerInner button');
    trans_buttons.forEach(el=>{
        el.classList.remove('btn_active');
    });
    e.classList.add('btn_active');
   
    var div_trans1 = document.querySelector('#trans1');
    var act_base_ep = div_trans1.getAttribute('data-base_ep');

    div_trans1.setAttribute('data-trans',trans);
    div_trans1.setAttribute('data-base_ep',EnglishPsalms);
    
    // document.querySelector('#trans1 .colsHeadInner div').innerHTML = BibleShortName;//antes
    document.querySelector('#trans1 .colsHeadInner .partDesk .desk_trans').innerHTML = BibleShortName;
    document.querySelector('#trans1 .colsHeadInner .partMob .mob_trans').innerHTML = BibleShortName;
    document.querySelector('#s_book').click();//function sel(; click на 'Книга', чтобы загрузились названия книг выбраного модуля. 

    //en navegación
    var inpt_nav = document.querySelector('#inpt_nav');
    var id_book = inpt_nav.getAttribute('data-id_book');
    var chapter = inpt_nav.getAttribute('data-show_chapter');
    var verseNumber = inpt_nav.getAttribute('data-show_verse');
    var to_verseNumber = (inpt_nav.getAttribute('data-show_to_verse') != '') ? inpt_nav.getAttribute('data-show_to_verse') : null ;
    inpt_nav.dataset.trans = trans;
    document.querySelector('#s_book').click();//simulo click sobre boton 'Kniga' para cargar los nombres corto de las libros de la Biblia


    chapter = (chapter != '') ? chapter : 1;//default si no hay
    var arr_verseView = [];//versiculos (elementos) visibles completamente en pantalla

    Array.from(document.querySelectorAll('.colsInner')[0].children).forEach(el=>{
        if(isInViewport(el)){
            //console.log('element is in ViewPort');
            //console.log(el);
            arr_verseView.push(el.getAttribute('data-verse'));
        }else{
            //console.log('element NO is in ViewPort');
            //console.log(el);
        }
    });
    var verseView = arr_verseView[0];

    var Translation = trans;
    url_bq = `modules/text/${Translation}/bibleqt.json`;

    fetch(url_bq)
        .then((response) => response.json())
        .then((bq) => {

            inpt_nav.setAttribute('data-show_book', bq.Books[id_book].ShortNames[0]);
            inpt_nav.value = bq.Books[id_book].ShortNames[0];
            if(chapter > 0){
                inpt_nav.value += ' ' + chapter;
            }
            if(parseInt(verseNumber) > 0){
                inpt_nav.value += ':' + verseNumber;
            }
            if(parseInt(to_verseNumber) > parseInt(verseNumber)){
                inpt_nav.value += '-' + to_verseNumber;
            }
        })
        .catch(error => { 
            // Código a realizar cuando se rechaza la promesa
            //console.log('error promesa: '+error);
        });
    
        //EnglishPsalms actual es igual que EnglishPsalms del modulo pinchado en footer, sólo recargo modulo base
        if(act_base_ep == EnglishPsalms){
            //showChapterText3(trans,'#col1', id_book, chapter, verseNumber, to_verseNumber, verseView);    
            showChapterText4(trans,'#col1', id_book, chapter, verseNumber, to_verseNumber, verseView);    
        }else{//EnglishPsalms actual es distinto. recargo todos los trans abiertos            
            document.querySelectorAll('.colsInner').forEach( el => {
                let este_trans = el.parentElement.children[0].getAttribute('data-trans');
                let este_col = el.parentElement.getAttribute('id');
                //showChapterText3(este_trans,'#'+este_col, id_book, chapter, verseNumber, to_verseNumber, verseView);
                showChapterText4(este_trans,'#'+este_col, id_book, chapter, verseNumber, to_verseNumber, verseView);
            });
        }

        //showTrans(id_book, chapter, verseNumber, to_verseNumber, verseView);

        //document.querySelectorAll('.colsInner').forEach( el => {
        //    let este_trans = el.parentElement.children[0].getAttribute('data-trans');
        //    let este_col = el.parentElement.getAttribute('id');
        //    showChapterText3(este_trans,'#'+este_col, id_book, chapter, verseNumber, to_verseNumber, verseView);
        //});
            
}

function changeModule(thisDiv,trans,BibleShortName){
   
    thisDiv.setAttribute('data-trans',trans);
    if(thisDiv.id == 'trans1'){
        //meto BibleShortName en el primer div, ya que este no tiene 'x' close
        thisDiv.children[0].children[0].innerHTML = BibleShortName;
    }else{
        //meto BibleShortName en el segundo div, ya que el primero es 'x' close
        thisDiv.children[0].children[1].innerHTML = BibleShortName;
    }

    //en navegación
    let inpt_nav = document.querySelector('#inpt_nav');
    let id_book = inpt_nav.getAttribute('data-id_book');
    let chapter = inpt_nav.getAttribute('data-show_chapter');
    let verseNumber = inpt_nav.getAttribute('data-show_verse');
    let to_verseNumber = inpt_nav.getAttribute('data-show_to_verse');

    chapter = (chapter != '') ? chapter : 1;//default si no hay
    var arr_verseView = [];//versiculos (elementos) visibles completamente en pantalla

    Array.from(thisDiv.parentElement.children[1].children).forEach(el=>{
        if(isInViewport(el)){
            //console.log('element is in ViewPort');
            //console.log(el);
            if(el.hasAttribute('data-verse')){
                arr_verseView.push(el.getAttribute('data-verse'));
            }
        }else{
            //console.log('element NO is in ViewPort');
            //console.log(el);
        }
    });
    var verseView = arr_verseView[0];
    //console.log('verseView: '+verseView);

    //si es trans1 cambio al color rojo el boton de footer en tablet y desktop
    if(thisDiv.id == 'trans1'){
        var trans_buttons = document.querySelectorAll('#footerInner button');
        trans_buttons.forEach(el=>{
            el.classList.remove('btn_active');
            if(el.value == thisDiv.dataset.trans){
                el.classList.add('btn_active');
                el.scrollIntoView();
            }
        });
    }
 
    //showChapterText3(trans,'#'+thisDiv.parentElement.getAttribute('id'), id_book, chapter, verseNumber, to_verseNumber, verseView);
    showChapterText4(trans,'#'+thisDiv.parentElement.getAttribute('id'), id_book, chapter, verseNumber, to_verseNumber, verseView);

    setTimeout(() => {
        mySizeWindow();
        mySizeVerse();
    }, 300);
}

function changeModule2(thisDiv,trans,BibleShortName,EnglishPsalms){
   //console.log('function changeModule2. abajo thisDiv: ');
   //console.log(thisDiv);

    thisDiv.setAttribute('data-trans',trans);
    thisDiv.setAttribute('data-base_ep',EnglishPsalms);
    if(thisDiv.id == 'trans1'){
        //meto BibleShortName en el primer div, ya que este no tiene 'x' close
        //thisDiv.children[0].children[0].innerHTML = BibleShortName;//antes
        thisDiv.querySelector('.desk_trans').innerHTML = BibleShortName;
        thisDiv.querySelector('.mob_trans').innerHTML = BibleShortName;
    }else{
        //meto BibleShortName en el segundo div, ya que el primero es 'x' close
        //thisDiv.children[0].children[1].innerHTML = BibleShortName; antes
        thisDiv.querySelector('.desk_trans').innerHTML = BibleShortName;
        thisDiv.querySelector('.mob_trans').innerHTML = BibleShortName;
    }

    //en navegación
    let inpt_nav = document.querySelector('#inpt_nav');
    let id_book = inpt_nav.getAttribute('data-id_book');
    let chapter = inpt_nav.getAttribute('data-show_chapter');
    let verseNumber = inpt_nav.getAttribute('data-show_verse');
    let to_verseNumber = inpt_nav.getAttribute('data-show_to_verse');
    inpt_nav.dataset.trans = trans;
    document.querySelector('#s_book').click();//simulo click sobre boton 'Kniga' para cargar los nombres corto de las libros de la Biblia

    chapter = (chapter != '') ? chapter : 1;//default si no hay
    var arr_verseView = [];//versiculos (elementos) visibles completamente en pantalla

    Array.from(thisDiv.parentElement.children[1].children).forEach(el=>{
        if(isInViewport(el)){
            //console.log('element is in ViewPort');
            //console.log(el);
            if(el.hasAttribute('data-verse')){
                arr_verseView.push(el.getAttribute('data-verse'));
            }
        }else{
            //console.log('element NO is in ViewPort');
            //console.log(el);
        }
    });
    var verseView = arr_verseView[0];
    //console.log('verseView: '+verseView);

    //si es trans1 cambio al color rojo el boton de footer en tablet y desktop
    if(thisDiv.id == 'trans1'){
        var trans_buttons = document.querySelectorAll('#footerInner button');
        trans_buttons.forEach(el=>{
            el.classList.remove('btn_active');
            if(el.value == thisDiv.dataset.trans){
                el.classList.add('btn_active');
                el.scrollIntoView();
            }
        });
    }

    //si es mobile, pongo 'row'
    if(window.innerWidth < 768){
        positionShow = 'col';//pongo 'col' para que se cambie a 'row' onclick
        changePositionShow(document.querySelector('#btn_changePositionShowModal'));
    }
 
    //showChapterText3(trans,'#'+thisDiv.parentElement.getAttribute('id'), id_book, chapter, verseNumber, to_verseNumber, verseView);
    showChapterText4(trans,'#'+thisDiv.parentElement.getAttribute('id'), id_book, chapter, verseNumber, to_verseNumber, verseView);

    setTimeout(() => {
        mySizeWindow();
        mySizeVerse();
    }, 300);
}


function changePositionShow(el){//row,col, default = col   
    if(positionShow == 'row'){
        positionShow = 'col';
        // el.innerText = 'Row';
        //si element tiene dentro un div, es el boton del modalTop
        el.innerHTML = (el.querySelector(':scope > span') !== null) ? '<span>Row</span>' : 'Row';
        //hago scroll to top en columna para todos cols
        document.querySelectorAll('.colsInner').forEach(el=>{
            el.scrollTop = 0;
        });
    }else{
        positionShow = 'row';
        // el.innerText = 'Col';
        el.innerHTML = (el.querySelector(':scope > span') !== null) ? '<span>Col</span>' : 'Col';
    }
    mySizeWindow();
    mySizeVerse();
}


function mySizeWindow() {
    //console.log('mySizeWindow');

    let header = document.querySelector('#header');
    let wrapper = document.querySelector('#wrapper');
    let sidebar = document.querySelector('#sidebar');
    //let sidebarInner = document.querySelector('#sidebarInner');
    let v_line = document.querySelector('#v_line');
    let container = document.querySelector('#container');
    //let containerInner = document.querySelector('#containerInner');
    let headerContainer = document.querySelector('#headerContainer');
    let wrCols = document.querySelector('#wrCols');
    let footer = document.querySelector('#footer');

    
    
    let window_w = window.innerWidth;
    let window_h = window.innerHeight;
    let header_h = header.offsetHeight;
    let footer_h = footer.offsetHeight;
    let headerContainer_h = headerContainer.offsetHeight;
    
    var pantalla, marginSidebar;
    if(window_w <= 767){
        pantalla = 'mobile';
        marginSidebar = 0;
        sidebar.removeAttribute('style');
    }else if(window_w >= 768 && window_w <= 1023){
        pantalla = 'tablet';
        marginSidebar = 10;
        sidebar.removeAttribute('class');
    }else if(window_w >= 1024){
        pantalla = 'desktop';
        marginSidebar = 10;
        sidebar.removeAttribute('class');
    }
    let marginSidebar_h = marginSidebar * 2;//arriba y abajo
    // console.log('window_w: '+window_w);
    // console.log('pantalla: '+pantalla);
    // console.log('marginSidebar: '+marginSidebar);


    let wrCols_h = 
    window_h //960
    - header_h //42
    - footer_h //46
    - headerContainer_h
    //- 20//antes cuando el margen en containerInner era 10px
    //- marginSidebar_h//en desktop = 10*2;  en mobile y tablet = 0
    ;
    // console.log('formula: window_h - + header_h - footer_h - marginSidebar_h = wrCols_h');
    // console.log('wrCols_h: ' + window_h +' - ' + header_h +' - ' + footer_h +' = ' + wrCols_h );

    let sidebar_h = 
    window_h //960
    - header_h //42
    - footer_h //46
    ;
    let container_h = sidebar_h; 
    let v_line_h = sidebar_h; 

    wrapper.style.top = header_h + 'px';

    wrCols.style.height = wrCols_h + 'px';
    //sidebarInner.style.height = wrCols_h + 'px';

    sidebar.style.height = sidebar_h + 'px';
    container.style.height = container_h + 'px';
    v_line.style.height = v_line_h + 'px';

    let colsAll = document.querySelectorAll('.cols');
    let colsHeadAll = document.querySelectorAll('.colsHead');
    let colsInnerAll = document.querySelectorAll('.colsInner');

    let arr_th = [];
    let sum_trans_h = 0; 
    colsHeadAll.forEach(el => { 
        el.style.removeProperty('height');
        arr_th.push(el.offsetHeight); 
        sum_trans_h += el.offsetHeight;
    });
    let trans_min_h = Math.min(...arr_th);
    let trans_max_h = Math.max(...arr_th);


    if(positionShow == 'row'){
        colsAll.forEach(el=>{
            el.style.width = 100 + '%';//100%
        });

        colsHeadAll.forEach(el=>{
            el.style.height =  trans_min_h +'px';
        });
        
        colsInnerAll.forEach(el=>{
            el.style.height =  wrCols_h / colsInnerAll.length - trans_min_h +'px';// 1/3 de height
        });

        wrCols.classList.remove('wrCols_center');
        wrCols.style.maxWidth = '';
        
    }else{//col
        colsAll.forEach(el=>{
            el.style.width = 100 / colsInnerAll.length +'%';//33%
        });

        colsHeadAll.forEach((el,i)=>{
            el.style.height =  trans_max_h +'px';
        });

        if(pantalla == 'desktop' || pantalla == 'tablet'){
            //añado anchi maximo de 350 px para comodidad de leer
            wrCols.style.maxWidth = 350 * colsInnerAll.length + 'px';
            colsHeadAll[0].style.display = '';
        }else if(pantalla == 'mobile'){
            //width 100%
            wrCols.style.maxWidth = '';
            if(colsHeadAll.length == 1){
                //document.querySelectorAll('.colsHead')[0].style.display = 'none';//comento temporalmente
            }
        }

        colsInnerAll.forEach((el,i)=>{
            //si se ve head con el texto de traducción...
            if(colsHeadAll[i].offsetHeight != 0){
                el.style.height =  wrCols_h - trans_max_h +'px';
            }else{
                el.style.height =  wrCols_h +'px';
            }
        });
        //pongo top para boton pageUp()
        let top_h = colsInnerAll[colsInnerAll.length-1].getBoundingClientRect().top;
        document.querySelector('#btn_pageUp').style.top = top_h + 10 + 'px';


        wrCols.classList.add('wrCols_center');
    }

    setTimeout(()=>{
        initScroll();
        getArrSumLineH();
    },100);

    mySizeNav();
    mySizeFind();
    mySizeTsk();
    mySizeStrong();

    /*
    //console.log('window_h: ' + window_h);
    //console.log('header_h: ' + header_h);
    //console.log('footer_h: ' + footer_h);
    //console.log('container.offsetHeight: ' + container.offsetHeight);
    //console.log('containerInner.offsetHeight: ' + containerInner.offsetHeight);
    //console.log('window_w: ' + window_w);
    //console.log('body.offsetWidth: ' + body.offsetWidth);
    //console.log('body.offsetHeight: ' + body.offsetHeight);
    //console.log('wrCols_h: ' + wrCols_h);
    //console.log('---');
    */  
}

function mySizeNav(){
    var sidebar = document.querySelector('#sidebar');
    var sidebarInner = document.querySelector('#sidebarInner');
    var menuTabs = document.querySelector('#menuTabs');
    var nav_head = document.querySelector('#nav_head');
    var nav_body = document.querySelector('#nav_body');

    // Get the computed style, including margins
    const computedStyle = window.getComputedStyle(sidebarInner);
    // Get the height of the element, including margins
    const sidebarInner_margins_h = 
    parseInt(computedStyle.marginTop) + 
    parseInt(computedStyle.marginBottom);

    let sidebar_h = sidebar.offsetHeight;
    let sidebarInner_h = sidebar_h - sidebarInner_margins_h;
    let menuTabs_h = menuTabs.offsetHeight;
    let nav_head_h = nav_head.offsetHeight;

    let nav_body_h = 
      sidebar_h
    - sidebarInner_margins_h
    - menuTabs_h
    - nav_head_h
    ;
    sidebarInner.style.height = sidebarInner_h + 'px';
    nav_body.style.height = nav_body_h + 'px';
    // console.log('nav_body_h: '+nav_body_h);

}

function mySizeFind(){
    var sidebar = document.querySelector('#sidebar');
    var sidebarInner = document.querySelector('#sidebarInner');
    var menuTabs = document.querySelector('#menuTabs');
    var wr_find_head = document.querySelector('#wr_find_head');
    var find_body = document.querySelector('#find_body');
    var padding_find_body = 15;// 10 si padding-top:5px y padding-bottom:5px // 15 si padding-top:5px y margin-bottom: 5px


    // Get the computed style, including margins
    const computedStyle = window.getComputedStyle(sidebarInner);
    // Get the height of the element, including margins
    const sidebarInner_margins_h = 
    parseInt(computedStyle.marginTop) + 
    parseInt(computedStyle.marginBottom);

    var sidebar_h = sidebar.offsetHeight;
    var sidebarInner_h = sidebar_h - sidebarInner_margins_h;
    var menuTabs_h = menuTabs.offsetHeight;
    var wr_find_head_h = wr_find_head.offsetHeight;

    var find_body_h = 
      sidebar_h
    - sidebarInner_margins_h
    - menuTabs_h
    - wr_find_head_h
    - padding_find_body
    ;
    sidebarInner.style.height = sidebarInner_h + 'px';
    find_body.style.height = find_body_h + 'px';
    //console.log('find_body_h: '+find_body_h);
}

/*
function old_mySizeFind(){
    var div_sidebarInner = document.querySelector('#sidebarInner');
    var div_find_nav = document.querySelector('#vklad_find .wr_nav');
    var div_find_head = document.querySelector('#find_head');
    var div_find_result = document.querySelector('#find_result');
    var div_find_body = document.querySelector('#find_body');
    var padding_find_body = 15;// 10 si padding-top:5px y padding-bottom:5px // 15 si padding-top:5px y margin-bottom: 5px
    
    //calculo altura de div_tsk_body despues de meter div_tsk_head
    div_find_body.style.height = div_sidebarInner.offsetHeight - div_find_nav.offsetHeight - div_find_head.offsetHeight - div_find_result.offsetHeight - padding_find_body + 'px';
}
*/

function mySizeTsk(){
    var sidebar = document.querySelector('#sidebar');
    var sidebarInner = document.querySelector('#sidebarInner');
    var menuTabs = document.querySelector('#menuTabs');
    var tsk_head = document.querySelector('#tsk_head');
    var tsk_body = document.querySelector('#tsk_body');
    var padding_tsk_body = 15;// 10 si padding-top:5px y padding-bottom:5px // 15 si padding-top:5px y margin-bottom: 5px

    // Get the computed style, including margins
    const computedStyle = window.getComputedStyle(sidebarInner);
    // Get the height of the element, including margins
    const sidebarInner_margins_h = 
    parseInt(computedStyle.marginTop) + 
    parseInt(computedStyle.marginBottom);

    let sidebar_h = sidebar.offsetHeight;
    let sidebarInner_h = sidebar_h - sidebarInner_margins_h;
    let menuTabs_h = menuTabs.offsetHeight;
    let tsk_head_h = tsk_head.offsetHeight;

    let tsk_body_h = 
      sidebar_h
    - sidebarInner_margins_h
    - menuTabs_h
    - tsk_head_h
    - padding_tsk_body
    ;
    sidebarInner.style.height = sidebarInner_h + 'px';
    tsk_body.style.height = tsk_body_h + 'px';
    //console.log('tsk_body_h: '+tsk_body_h);
}

/*
function old_mySizeTsk(){
    var div_sidebarInner = document.querySelector('#sidebarInner');
    var div_tsk_head = document.querySelector('#tsk_head');
    var div_tsk_body = document.querySelector('#tsk_body');
    var padding_tsk_body = 15;// 10 si padding-top:5px y padding-bottom:5px // 15 si padding-top:5px y margin-bottom: 5px
    
    //calculo altura de div_tsk_body despues de meter div_tsk_head
    div_tsk_body.style.height = div_sidebarInner.offsetHeight - div_tsk_head.offsetHeight - padding_tsk_body + 'px';
}
*/

function mySizeStrong(){
    var sidebar = document.querySelector('#sidebar');
    var sidebarInner = document.querySelector('#sidebarInner');
    var menuTabs = document.querySelector('#menuTabs');
    var wr_strong_head = document.querySelector('#wr_strong_head');
    var strong_body = document.querySelector('#strong_body');
    var padding_strong_body = 15;// 10 si padding-top:5px y padding-bottom:5px // 15 si padding-top:5px y margin-bottom: 5px

    // Get the computed style, including margins
    const computedStyle = window.getComputedStyle(sidebarInner);
    // Get the height of the element, including margins
    const sidebarInner_margins_h = 
    parseInt(computedStyle.marginTop) + 
    parseInt(computedStyle.marginBottom);

    var sidebar_h = sidebar.offsetHeight;
    var sidebarInner_h = sidebar_h - sidebarInner_margins_h;
    var menuTabs_h = menuTabs.offsetHeight;
    var wr_strong_head_h = wr_strong_head.offsetHeight;

    //si hay una card con el numero strong dentro
    let hasStrongCard = false;    
    for (let i = 0; i < strong_body.children.length; i++) {
        const childElement = strong_body.children[i];

        if(childElement.classList.contains('p_v')) {
            hasStrongCard = true;
            break; // Exit the loop once a matching child is found
        }
    }
    // let padding_StrongCard = (hasStrongCard) ? 2 : 2 ;
    let padding_StrongCard = 2;//siempre 2px por el border
    // console.log('hasStrongCard: '+hasStrongCard);
    // console.log('padding_StrongCard: '+padding_StrongCard);

    var strong_body_h = 
      sidebar_h
    - sidebarInner_margins_h
    - menuTabs_h
    - wr_strong_head_h
    - padding_strong_body
    - padding_StrongCard //2px de border
    ;
    sidebarInner.style.height = sidebarInner_h + 'px';
    strong_body.style.height = strong_body_h + 'px';
    //console.log('strong_body_h: '+strong_body_h);    
}

/*function old_mySizeStrong(){
    var div_sidebarInner = document.querySelector('#sidebarInner');
    var div_strong_nav = document.querySelector('#vklad_strong .wr_nav');
    var div_strong_head = document.querySelector('#strong_head');
    var div_strong_body = document.querySelector('#strong_body');
    var padding_strong_body = 5;// 10 si padding-top:5px y padding-bottom:5px // 15 si padding-top:5px y margin-bottom: 5px
    
    //calculo altura de div_tsk_body despues de meter div_tsk_head
    div_strong_body.style.height = div_sidebarInner.offsetHeight - div_strong_nav.offsetHeight - div_strong_head.offsetHeight - padding_strong_body + 'px';
}
*/



function mySizeVerse(){
    //console.log('mySizeVerse');

    window.arr_h = [];
    window.arr_sum_line_h = [];
    var arr_p_len = [];
    var colsHeadAll = document.querySelectorAll('.colsHead');
    var colsInnerAll = document.querySelectorAll('.colsInner');

    colsHeadAll.forEach(el=>{
        //si el ancho de una col es menos de 350, quito min-width:90px
        if(el.offsetWidth < 350){
            el.querySelector('.partDesk .desk_trans').classList.remove('mw-90');
            el.querySelector('.partDesk .desk_sh_link').classList.remove('mw-90');
        }else{
            el.querySelector('.partDesk .desk_trans').classList.add('mw-90');
            el.querySelector('.partDesk .desk_sh_link').classList.add('mw-90');
        }
    });

    colsInnerAll.forEach(function(el,index){
        //console.log(el);

        colsInnerAll.forEach(e => {
            Array.from(e.children).forEach(e => {
                e.style.removeProperty('height');
            });
        });

        let colsInnerAll_ch = document.querySelectorAll('.colsInner')[index].children;
        var arr_h2 = [];
        var arr_sum_p_h2 = [];
        var sum_p_h = 0;

        arr_p_len.push(colsInnerAll_ch.length);

        Array.from(colsInnerAll_ch).forEach(function(el2, index2, arr2){
            //console.log(el2);
            //console.log(arr2[index2]);
            
            arr_h2.push(arr2[index2].offsetHeight);
            
            sum_p_h += arr2[index2].offsetHeight;
            arr_sum_p_h2.push(sum_p_h);
            //console.log('sum_p_h: '+sum_p_h);
        });
        //console.log('kolonka cols['+index+']. arr_h2: '+arr_h2);

        arr_h.push(arr_h2);
        arr_sum_line_h.push(arr_sum_p_h2);
    });

    //console.log(arr_h);
    //console.log('arr_p_len: '+arr_p_len);

    var p_count = Math.max(...arr_p_len);
    //console.log('p_count: '+p_count);

    window.arr_line_h = [];       

    for(var p = 0; p < p_count; p++){
        //console.log(i);

        let max_h = 0;
        var arr_line_h2 = [];
        
        for(var c = 0; c < colsInnerAll.length; c++){
            
            let act_h = (typeof arr_h[c][p] !== 'undefined') ? arr_h[c][p] : 0 ;            
            arr_line_h2.push(act_h);
            //console.log('act_h: '+act_h);

            //document.querySelectorAll('.colsInner')[c].querySelectorAll('p')[p].style.height = max_h + 'px';
            if(typeof document.querySelectorAll('.colsInner')[c].children[p] !== 'undefined'){
                let este_cont = document.querySelectorAll('.colsInner')[c].children[p].innerHTML; 
                //console.log('colsInner['+c+'] children['+p+'] este_cont: '+este_cont);

                //document.querySelectorAll('.colsInner')[c].children[p].style.background = bg;//test
                if(['span','b','i','strong'].includes(document.querySelectorAll('.colsInner')[c].children[p].localName) ){
                    document.querySelectorAll('.colsInner')[c].children[p].style.display = 'block';
                }
            }
        }
        arr_line_h.push(arr_line_h2);
        //console.log('abajo arr_line_h');
        //console.log(arr_line_h);

        max_h = Math.max(...arr_line_h2);
        //console.log('pongo max_h: '+max_h);
        
        //para cada versiculo 'p' de cada columpa 'ch' pongo la misma altura 'max_h' si es positionShow 'col'
        if(positionShow == 'col'){
            for(var ch = 0; ch < colsInnerAll.length; ch++){
                if(typeof document.querySelectorAll('.colsInner')[ch].children[p] !== 'undefined'){
                    document.querySelectorAll('.colsInner')[ch].children[p].style.height = max_h + 'px';
                }
            }
        }
        //console.log('------------------------------');
    }
    setTimeout(()=>{
        addMarginTolastP();
        initScroll();
        getArrSumLineH();
    },100);

}//end mySizeVerse()


function addMarginTolastP(){
    let colsInnerAll = document.querySelectorAll('.colsInner');
    colsInnerAll.forEach(col=>{
        //si es ultimo elemento, añado padding-bottom
        let p_last = col.querySelector('p:last-child');
        
        if(p_last != null){
            // let mb_h = col.offsetHeight - p_last.offsetHeight;//antes
            let mb_h = col.offsetHeight;
            //console.log('mb_h: '+mb_h);
            /*
            const d = document.createElement('div');
            d.className = 'd_bot';
            d.style.background = 'pink';
            d.innerHTML = `<div class="d_btn">prev chapter</div>
                           <div class="d_btn">next chapter</div>
                          `;
            p_last.insertAdjacentElement('afterend', d);
            //d.style.height = mb_h + 'px';
            */

            p_last.style.marginBottom = mb_h /*- d.offsetHeight*/ + 'px';
            //p_last.style.background = 'lightgreen';
        }
    });
}


function ref(string){
    document.querySelector('#sidebarInner p').innerHTML = string;
}


function addTrans(addMode = null){
    let countCols = document.querySelectorAll('.cols').length;
    //console.log(countCols);

    let arr_n = [];
    document.querySelectorAll('.cols').forEach(el => {
        let n = parseInt(el.getAttribute('id').slice(-1));
        arr_n.push(n); 
    });
    //console.log(arr_n);

    for(let i = 1; i <= 8; i++) {
        if(!arr_n.includes(i)){
            var next_n = i;
            break;
        }
    }

    if(countCols < 8){        
        let new_w = 100 / (countCols+1) + '%';
        document.querySelectorAll('.cols').forEach(el => {
            el.style.width = new_w;
        });

        const htmlCol = document.createElement("div");//Column
        htmlCol.id = 'col' + next_n;
        htmlCol.className = 'cols';
        htmlCol.style.width = new_w;

        const htmlTrans = document.createElement("div");//Translation of Bible
        htmlTrans.id = 'trans' + next_n;
        htmlTrans.className = 'colsHead';

        htmlTrans.innerHTML =  `<div class="colsHeadInner">
                                    
                                    <div class="partDesk">

                                        <div class="wr_desk_trans" title="Presiona para seleccionar la traducción." onclick="openModal('full',document.querySelector('#${htmlTrans.id}.colsHead'))">
                                        
                                            <div class="vstavka_left">&nbsp;</div>
                                            <div class="centralPart">
                                                <div class="desk_trans"><span class="sp_plus_trans"> + </span></div>
                                                <div class="separ_line"></div>
                                                <div class="desk_sh_link"> --. --:-- </div>
                                            </div>
                                            <button class="btn btn_xsm f_r" onclick="closeTrans(this,event)">&#10005;</button><!--X-->    

                                        </div>
                                    
                                    </div>

                                    <div class="partMob">
                                        <div class="partMobInner">

                                            <button class="btnMenu btn btn_svg" data-typebtn="transMenu" onclick="openSidebar(this)"><img src="images/menu_white.svg"></button>
                                            <button class="btn btn_svg" onclick="chapterGo('prev')" title="Previous Chapter"><img src="images/arrow_chevron_left_white.svg"></button>
                                            
                                            <div class="centralPart">
                                                <button class="btn" onclick="openModal('full',document.querySelector('#${htmlTrans.id}.colsHead'))" title="open Modal to choose translation">
                                                    <span class="mob_trans">RST+r</span>
                                                </button>
                                                <div class="separ_line"></div>
                                                <button class="btn" data-typebtn="transRef" onclick="showTabMob('#btn_nav','nav',this)" title="Навигация. Выбор книги, главы, стиха">
                                                    <span class="mob_sh_link">Jn.3:16</span>
                                                </button>
                                            </div>
                                            
                                            <button class="btn btn_svg" onclick="chapterGo('next')" title="Next Chapter"><img src="images/arrow_chevron_right_white.svg"></button>                                            
                                            <button class="btn btn_x" onclick="closeTrans(this,event,'mob')" title="close Translation">&#10005;</button><!--x-->
                                            
                                        </div>
                                    </div> 

                                </div>`;       


        const htmlBody = document.createElement("div");//Text of Bible
        htmlBody.className = 'colsInner';						
        htmlBody.innerHTML =  `	<p class="prim">Выберите модуль Библии кликнув на '+' вверху.</p>
                                `;
                        
        htmlCol.appendChild(htmlTrans);
        htmlCol.appendChild(htmlBody);

        document.querySelector('#wrCols').appendChild(htmlCol);

        setTimeout(e => {
            mySizeVerse();
        },15);

        setTimeout(e => {
            mySizeWindow();
        },10);

        if(positionShow == 'row'){
            mySizeWindow();
            mySizeVerse();
            //console.log('en addTrans() mySize...');
        }
        //addListenerModule();//antes
        
        //listener on scroll para añadir versiculo en colsHead en mobile
        //pintRefOnScroll('#' + htmlCol.id);//'#col2' no funciona correctamente

        if(addMode == 'askForTrans'){
            //propongo selección del modulo
            openModal('full',htmlTrans);//contiene dentro selectModule2()
        }else{
            //no hago nada. añado col vacio
        }
    }
    
}

function removeTrans(){
    let countCols = document.querySelectorAll('.cols').length;
    //console.log(countCols);
    if(countCols != 1){
        document.querySelector('#wrCols').lastElementChild.remove();
        mySizeWindow();
        mySizeVerse();
    }
}

function closeTrans(el,event, param = null){
    var n = el.parentElement.parentElement.parentElement.parentElement.id.slice(-1);
    //console.log(n);
    event.stopPropagation();
    
    document.querySelector('#col'+n).remove();

    mySizeWindow();
    mySizeVerse();
}



function getRefOfTab(tab_id, ref, str_trans = null){
    //alert(str_trans);
    let this_tab = document.querySelector('#'+tab_id);
    console.log(this_tab);
    
    let tabsAll = document.querySelectorAll('.tabs');
    tabsAll.forEach(el=>{
        el.classList.remove('tab_active');
    });
    if(this_tab != null) this_tab.classList.add('tab_active');

    let inpt_nav = document.querySelector('#inpt_nav');
    let colsAll = document.querySelectorAll('.cols');
    inpt_nav.value = ref;

    str_trans = (str_trans != null) ? str_trans : inpt_nav.dataset.trans;
    arr_trans = str_trans.split(',');

    //удаляю лишние колоны
    if(colsAll.length > arr_trans.length){
        let counDiff = colsAll.length - arr_trans.length;
        for (let index = 0; index < counDiff; index++) {
            removeTrans();
        }
    }

    arr_trans.forEach((el,i)=>{
        el = el.trim();
        console.log(el);

        var obj_el_trans = arrFavTransObj.find(v => v.Translation === el);

        if(typeof obj_el_trans != 'undefined'){            
            if(colsAll[i] != null){//existe una columna
                colsAll[i].querySelector('.colsHead').dataset.trans = obj_el_trans.Translation;
                colsAll[i].querySelector('.colsHead').dataset.base_ep = obj_el_trans.EnglishPsalms;
            }else{//no existe columna. añado una trans 
                addTrans();//trans vacia
                let ult_col = document.querySelectorAll('.cols')[document.querySelectorAll('.cols').length - 1];
                ult_col.querySelector('.colsHead').dataset.trans = obj_el_trans.Translation;
                ult_col.querySelector('.colsHead').dataset.base_ep = obj_el_trans.EnglishPsalms;
            }
        }        

        //si es trans1 cambio al color rojo el boton de footer en tablet y desktop
        if(i == 0 && colsAll[i].querySelector('.colsHead').id == 'trans1'){
            var trans_buttons = document.querySelectorAll('#footerInner button');
            trans_buttons.forEach(el=>{
                el.classList.remove('btn_active');
                if(el.value == colsAll[i].querySelector('.colsHead').dataset.trans){
                    el.classList.add('btn_active');
                    el.scrollIntoView();
                }
            });
            if(typeof obj_el_trans != 'undefined'){
                //cambio trans del inpt_nav
                inpt_nav.dataset.trans = obj_el_trans.Translation;
            }
        }

    });
    //ejecuto click sobre el boton ok en inpt_nav
    document.querySelector('#btn_ok').click();
}



addTab('Быт. 1:1', 'act', null,'rstStrongRed');
addTab('Рим. 10:17', null, null, 'rstStrong, rv60 ,lbla');
addTab('Лук. 3:16', null, null, 'ukr_ogi, ukr_hom ,ukr_gyz, ukr_fil, ukr_tur');

function addTab(bibShortRef = null, act = null, tab_new = null, str_trans = null){
    let tabsAll = document.querySelectorAll('.tabs');
    let countTabs = tabsAll.length;
    //console.log(countTabs);
    let maxTabs = 20;

    let arr_n = [];
    tabsAll.forEach(el => {
        let n = parseInt(el.getAttribute('id').substring(3));//tab10 => 10
        arr_n.push(n); 
    });
    //console.log(arr_n);

    for(let i = 1; i <= maxTabs; i++){
        if(!arr_n.includes(i)){
            var next_n = i;
            break;
        }
    }

    let div_trans1 = document.querySelector('#trans1');
    bibShortRef = (bibShortRef != null) ? bibShortRef : div_trans1.querySelector('.desk_sh_link').innerHTML ;

    //si se añade nueva tab 
    if(str_trans == null){
        let colsHeadAll = document.querySelectorAll('.colsHead');
        let arr_str_trans = []; 
        colsHeadAll.forEach(el => {
            arr_str_trans.push(el.dataset.trans); 
        });
        str_trans = arr_str_trans.join();
        console.log('new str_trans: '+str_trans);
    }

    if(countTabs < maxTabs){
        const htmlTab = document.createElement("div");
        htmlTab.id = 'tab' + next_n;
        htmlTab.className = 'tabs';
        htmlTab.dataset.str_trans = str_trans;
        htmlTab.onclick = function(e){
            getRefOfTab(htmlTab.id, htmlTab.querySelector('span').innerHTML, htmlTab.dataset.str_trans);
            updateArrTabs();
        };
        if(act != null) htmlTab.classList.add('tab_active');//antes

        
        if(tab_new == 'tab_new'){
            let tabsAll = document.querySelectorAll('.tabs');
            tabsAll.forEach(el=>{
                el.classList.remove('tab_active');
            });
            htmlTab.classList.add('tab_active');
        }


        const spanBibShortRef = document.createElement("span");
        spanBibShortRef.innerHTML = (bibShortRef != null) ? bibShortRef : `New Tab${next_n}` ;
        //spanBibShortRef.title = str_trans;

        //a todos los tabs añado span close x
        htmlTab.innerHTML = '<button class="btn btn_sm f_r" onclick="closeTab(this)">&#10005;</button>';//<!--X-->
        htmlTab.appendChild(spanBibShortRef);

        //document.querySelector('#headerContainerInner').appendChild(htmlTab);//antes
        document.querySelector('#partDeskTabs').appendChild(htmlTab);
        htmlTab.scrollIntoView();

        //actualizo despues de 1 sec para que llegue a cargarse objeto de trans
        setTimeout(()=>{
            updateArrTabs();
        },1000);
        
    }
}

function updateArrTabs(){
    arrTabs = [];//reset

    let tabsAll = document.querySelectorAll('.tabs');
    tabsAll.forEach(el=>{
        //console.log(`el.id: ${el.id} --- el.classList: ${el.classList}`);
        let has_btn_close = (el.querySelector(':scope > button') !== null) ? true : false ;

        //saco BibleShortName por Translation desde string
        let arr_trans_names = [];
        let arr_el_trans = el.dataset.str_trans.split(','); 
        arr_el_trans.forEach(el_tr => {
            el_tr = el_tr.trim();
            //console.log('el_tr: '+el_tr);
            
            const el_tr_obj = getObjTransByName(el_tr);
            //console.log(el_tr_obj);
            if(typeof el_tr_obj != 'undefined') arr_trans_names.push(el_tr_obj.BibleShortName);
        });
        let str_trans_names = arr_trans_names.join(', ');
        //console.log('end --- str_trans_names: '+str_trans_names); 
        
        el.title = str_trans_names;

        const el_obj = {
            id: el.id,
            className: el.getAttribute('class'),
            str_trans: el.dataset.str_trans,
            title: str_trans_names,
            btn_close: has_btn_close,
            ref: el.querySelector('span').innerHTML
        };
        //console.log(el_obj);
        arrTabs.push(el_obj);
    });
    //console.log(arrTabs);
}

function showTabs(){
    //console.log('function showTabs()');
    openModal('tabsList',null);//contiene dentro selectTab()
}


function removeTab(){
    let countTabs = document.querySelectorAll('.tabs').length;
    //console.log(countTabs);

    if(countTabs != 1){
        //document.querySelector('#headerContainerInner').lastElementChild.remove();
        document.querySelector('#partDeskTabs').lastElementChild.remove();
    }
    updateArrTabs();
}

function closeTab(el){       
    el.parentElement.remove();
    updateArrTabs();
}

sel(document.querySelector('.bcv_active'),'b');//por defecto


//Click sobre el boton li del libro de la Biblia en navegación
function selBook(e){
    let inpt_nav = document.querySelector('#inpt_nav');
    let v_verse = document.querySelector('#v_verse');
    //console.log(e.srcElement.innerText);
    
    obj_nav.divtrans = inpt_nav.dataset.divtrans;
    obj_nav.trans = inpt_nav.dataset.trans;
    obj_nav.id_book = e.srcElement.getAttribute('data-id_book');
    obj_nav.show_book = e.srcElement.getAttribute('data-show_book');
    obj_nav.id_chapter = '';
    obj_nav.show_chapter = '';
    obj_nav.id_verse = '';
    obj_nav.show_verse = '';


    inpt_nav.setAttribute('data-id_book',e.srcElement.getAttribute('data-id_book'));//0, 1, 2
    inpt_nav.setAttribute('data-show_book',e.srcElement.getAttribute('data-show_book'));//Gen. Ex. Lev.

    inpt_nav.setAttribute('data-id_chapter','');
    inpt_nav.setAttribute('data-show_chapter','');

    inpt_nav.setAttribute('data-id_verse','');
    inpt_nav.setAttribute('data-show_verse','');
    
    inpt_nav.value = inpt_nav.getAttribute('data-show_book') + ' ';

    //reseteo los botones li de versiculos ya que todavia no estan seleccionados los chapters
    //v_verse.innerHTML = '<span class="prim_verse">test: Antes de seleccionar el versículo, selecciona el capítulo por favor.</span>';            


    e.srcElement.classList.add('active');//añado bg red al boton 'Sal.'
    document.querySelector('#s_chapter').click();// me muevo a la pestaña 'Glava'
    //en #s_chapter se llama sel(this,'ch',trans)...
    //en #v_chapter se quitan todos los li's botones de chapters para crear nuevos li's
    //en for se crean li's y si hay id_chapter -> al li que es igual a (id_chapter +1)=show_chapter se añade bg red class '.active'
    showTrans(e.srcElement.getAttribute('data-id_book'), 1);//cargo con fetch chapter 1 por defecto    
}

//Click sobre el capítulo del libro de la Biblia en navegación
function selChapter(e){
    let inpt_nav = document.querySelector('#inpt_nav');
    //console.log(e.srcElement.innerText); 

    //si es trans2 y es trans con EnglishPsalms 'Y' se cliquea en el boton li de chapter Sal.23 español, convierto el chapter en el Пс 22 ruso 
    //console.log('clickeado trans: '+inpt_nav.dataset.trans);
    //console.log('clickeado show_chapter: '+e.srcElement.getAttribute('data-show_chapter'));

    var trans_base = document.querySelector('#trans1').dataset.trans;//la trans base de #trans1
    var trans_inpt = inpt_nav.dataset.trans;// trans desde input
    var divtrans_inpt = inpt_nav.dataset.divtrans;// trans desde input

    var is_changedChapter = false;

    if(divtrans_inpt != '' && divtrans_inpt != 'trans1'){
        // Usa el método find para buscar el objeto que contiene 'rst' como nombre
        const obj_trans_base = arrFavTransObj.find(v => v.Translation === trans_base);
        const obj_trans_inpt = arrFavTransObj.find(v => v.Translation === trans_inpt);

        if(obj_trans_base.EnglishPsalms == 'N' && obj_trans_inpt.EnglishPsalms == 'Y'){
            var new_res = convertLinkFromEspToRus(inpt_nav.dataset.id_book, e.srcElement.getAttribute('data-show_chapter'), null, null);//importante EspToRus
            var chapterNumber = new_res[1];
            //console.log('en selChapter --- convertido chapterNumber: '+chapterNumber);//empezando de 1
            is_changedChapter = true;
        }
        else if(obj_trans_base.EnglishPsalms == 'Y' && obj_trans_inpt.EnglishPsalms == 'N'){
            var new_res = convertLinkFromRusToEsp(inpt_nav.dataset.id_book, e.srcElement.getAttribute('data-show_chapter'), null, null);//importante RusToEsp
            var chapterNumber = new_res[1];
            //console.log('en selChapter --- convertido chapterNumber: '+chapterNumber);//empezando de 1
            is_changedChapter = true;
        }else{
            var chapterNumber = e.srcElement.getAttribute('data-show_chapter');
        }

        obj_nav.id_chapter = chapterNumber - 1;
        obj_nav.show_chapter = chapterNumber;
        obj_nav.id_verse = '';
        obj_nav.show_verse = '';

        inpt_nav.setAttribute('data-id_chapter',chapterNumber - 1);
        inpt_nav.setAttribute('data-show_chapter',chapterNumber); 

    }else{//si es trans1

        obj_nav.id_chapter = e.srcElement.getAttribute('data-id_chapter');
        obj_nav.show_chapter = e.srcElement.getAttribute('data-show_chapter');
        obj_nav.id_verse = '';
        obj_nav.show_verse = '';
    }


    if(inpt_nav.dataset.divtrans != '' && inpt_nav.dataset.divtrans != 'trans1'){

        if(document.querySelectorAll('.cols').length > 1 && is_changedChapter == false){

            var id_book = obj_nav.id_book;
            var chapter = obj_nav.show_chapter;
            var verse = obj_nav.show_verse; 
            var to_verse = null;//todavia no está seleccionado
            
            var res_new_link = checkRefNav(id_book, chapter, verse, to_verse);

            if(res_new_link){
                //asigno nuevo valor
                var bookNumber = res_new_link[0];
                var chapterNumber = res_new_link[1];
                var verseNumber = res_new_link[2];
                var to_verseNumber = res_new_link[3];
                var trans_BookShortName = res_new_link[4];
                
                // console.log('---despues---');
                // console.log('3.--- res_new_link --- ahora bookNumber: '+bookNumber);//empezando de 1
                // console.log('3.--- res_new_link --- ahora chapterNumber: '+chapterNumber);//empezando de 1
                // console.log('3.--- res_new_link --- ahora verseNumber: '+verseNumber);//empezando de 1
                // console.log('3.--- res_new_link --- ahora to_verseNumber: '+to_verseNumber);//mayor que verseNumber
                // console.log('3.--- res_new_link --- ahora trans_BookShortName: '+trans_BookShortName);//mayor que verseNumber

                var new_ref_text = trans_BookShortName;
                if(chapterNumber > 0) new_ref_text += ' ' + chapterNumber;
                if(verseNumber > 0) new_ref_text += ':' + verseNumber;
                if(to_verseNumber > 0 && parseInt(to_verseNumber) > parseInt(verseNumber)) new_ref_text += '-' + to_verseNumber;
                document.querySelector('#inpt_nav').value = new_ref_text;

                inpt_nav.setAttribute('data-id_chapter',chapterNumber - 1);//REVISAR!!!
                inpt_nav.setAttribute('data-show_chapter',chapterNumber); //REVISAR!!!
        
                inpt_nav.setAttribute('data-id_verse','');
                inpt_nav.setAttribute('data-show_verse','');
            }
        }

        e.srcElement.classList.add('active');//añado bg red al li boton del chapter '22'
        document.querySelector('#s_verse').click();// me muevo a la pestaña 'Stij'
        //en #s_verse se llama sel(this,'v',trans)...
        //en #v_verse se quitan todos los li's botones de verses para crear nuevos li's
        //en for se crean li's y si hay id_chapter -> al li que es igual a (id_chapter +1)=show_chapter se añade bg red class '.active'
    
        showTrans(inpt_nav.getAttribute('data-id_book'), chapterNumber);//chapter def 1 

    }else{//trans1
        inpt_nav.setAttribute('data-id_chapter',e.srcElement.getAttribute('data-id_chapter'));
        inpt_nav.setAttribute('data-show_chapter',e.srcElement.getAttribute('data-show_chapter')); 

        inpt_nav.setAttribute('data-id_verse','');
        inpt_nav.setAttribute('data-show_verse','');
    
        inpt_nav.value = inpt_nav.getAttribute('data-show_book') + ' ' + inpt_nav.getAttribute('data-show_chapter'); 
        
        e.srcElement.classList.add('active');//añado bg red al li boton del chapter '22'
        document.querySelector('#s_verse').click();// me muevo a la pestaña 'Stij'
        //en #s_verse se llama sel(this,'v',trans)...
        //en #v_verse se quitan todos los li's botones de verses para crear nuevos li's
        //en for se crean li's y si hay id_chapter -> al li que es igual a (id_chapter +1)=show_chapter se añade bg red class '.active'
    
        showTrans(inpt_nav.getAttribute('data-id_book'), e.srcElement.getAttribute('data-show_chapter'));//chapter def 1    
    } 

    //e.srcElement.classList.add('active');//añado bg red al li boton del chapter '22'
    //document.querySelector('#s_verse').click();// me muevo a la pestaña 'Stij'
            //en #s_verse se llama sel(this,'v',trans)...
            //en #v_verse se quitan todos los li's botones de verses para crear nuevos li's
            //en for se crean li's y si hay id_chapter -> al li que es igual a (id_chapter +1)=show_chapter se añade bg red class '.active'

    //showTrans(inpt_nav.getAttribute('data-id_book'), e.srcElement.getAttribute('data-show_chapter'));//chapter def 1    
}

//Click sobre el versículo del capítulo del libro de la Biblia en navegación
function selVerse(e){
    let inpt_nav = document.querySelector('#inpt_nav');
    //console.log(e.srcElement.innerText);

    //si es trans2 y es trans con EnglishPsalms 'Y' se cliquea en el boton li de chapter Sal.23 español, convierto el chapter en el Пс 22 ruso 
    //console.log('clickeado trans: '+inpt_nav.dataset.trans);
    //console.log('clickeado show_verse: '+e.srcElement.getAttribute('data-show_verse'));

    var trans_base = document.querySelector('#trans1').dataset.trans;//la trans base de #trans1
    var trans_inpt = inpt_nav.dataset.trans;// trans desde input
    var divtrans_inpt = inpt_nav.dataset.divtrans;// trans desde input

    var is_changedVerse = false;

    if(divtrans_inpt != '' && divtrans_inpt != 'trans1'){
        // Usa el método find para buscar el objeto que contiene 'rst' como nombre
        const obj_trans_base = arrFavTransObj.find(v => v.Translation === trans_base);
        const obj_trans_inpt = arrFavTransObj.find(v => v.Translation === trans_inpt);

        if(obj_trans_base.EnglishPsalms == 'N' && obj_trans_inpt.EnglishPsalms == 'Y'){
            var new_res = convertLinkFromEspToRus(inpt_nav.dataset.id_book, inpt_nav.getAttribute('data-show_chapter'), e.srcElement.getAttribute('data-show_verse'), null);//importante EspToRus
            var chapterNumber = new_res[1];
            var verseNumber = new_res[2];
            //console.log('en selVerse --- convertido verseNumber: '+verseNumber);//empezando de 1
            is_changedVerse = true;
        }
        else if(obj_trans_base.EnglishPsalms == 'Y' && obj_trans_inpt.EnglishPsalms == 'N'){
            var new_res = convertLinkFromRusToEsp(inpt_nav.dataset.id_book, inpt_nav.getAttribute('data-show_chapter'), e.srcElement.getAttribute('data-show_verse'), null);//importante RusToEsp
            var chapterNumber = new_res[1];
            var verseNumber = new_res[2];
            //console.log('en selVerse --- convertido verseNumber: '+verseNumber);//empezando de 1
            is_changedVerse = true;
        }else{
            var chapterNumber = inpt_nav.getAttribute('data-show_chapter');
            var verseNumber = e.srcElement.getAttribute('data-show_verse');
        }

        obj_nav.id_verse = verseNumber - 1;//comprobar!
        obj_nav.show_verse = verseNumber;//comprobar!

        inpt_nav.setAttribute('data-id_verse',verseNumber - 1);
        inpt_nav.setAttribute('data-show_verse',verseNumber); 

    }else{//si es trans1

        obj_nav.id_verse = e.srcElement.getAttribute('data-id_verse');
        obj_nav.show_verse = e.srcElement.getAttribute('data-show_verse');
    }



    if(inpt_nav.dataset.divtrans != '' && inpt_nav.dataset.divtrans != 'trans1'){

        if(document.querySelectorAll('.cols').length > 1 && is_changedVerse == false){

            var id_book = obj_nav.id_book;
            var chapter = obj_nav.show_chapter;
            var verse = obj_nav.show_verse; 
            var to_verse = null;//todavia no está seleccionado
            
            var res_new_link = checkRefNav(id_book, chapter, verse, to_verse);

            if(res_new_link){
                //asigno nuevo valor
                var bookNumber = res_new_link[0];
                var chapterNumber = res_new_link[1];
                var verseNumber = res_new_link[2];
                var to_verseNumber = res_new_link[3];
                var trans_BookShortName = res_new_link[4];
                
                // console.log('---despues---');
                // console.log('3.--- res_new_link --- ahora bookNumber: '+bookNumber);//empezando de 1
                // console.log('3.--- res_new_link --- ahora chapterNumber: '+chapterNumber);//empezando de 1
                // console.log('3.--- res_new_link --- ahora verseNumber: '+verseNumber);//empezando de 1
                // console.log('3.--- res_new_link --- ahora to_verseNumber: '+to_verseNumber);//mayor que verseNumber
                // console.log('3.--- res_new_link --- ahora trans_BookShortName: '+trans_BookShortName);//mayor que verseNumber

                var new_ref_text = trans_BookShortName;
                if(chapterNumber > 0) new_ref_text += ' ' + chapterNumber;
                if(verseNumber > 0) new_ref_text += ':' + verseNumber;
                if(to_verseNumber > 0 && parseInt(to_verseNumber) > parseInt(verseNumber)) new_ref_text += '-' + to_verseNumber;
                document.querySelector('#inpt_nav').value = new_ref_text;

                inpt_nav.setAttribute('data-id_verse',verseNumber - 1);//REVISAR!!!
                inpt_nav.setAttribute('data-show_verse',verseNumber); //REVISAR!!!
            }
        }

    }else{//trans1
        obj_nav.id_verse = e.srcElement.getAttribute('data-id_verse');
        obj_nav.show_verse = e.srcElement.getAttribute('data-show_verse');
    
        inpt_nav.setAttribute('data-id_verse',e.srcElement.getAttribute('data-id_verse'));
        inpt_nav.setAttribute('data-show_verse',e.srcElement.getAttribute('data-show_verse'));
        
        inpt_nav.value = inpt_nav.getAttribute('data-show_book') + ' ' + inpt_nav.getAttribute('data-show_chapter') + ':' +inpt_nav.getAttribute('data-show_verse');    
    } 
   
    
    document.querySelectorAll('#v_verse .v_li').forEach(el=>{
        el.classList.remove('li_active');
    });
    e.srcElement.classList.add('li_active');//añado bg red al li boton del verse '2'

    //document.querySelector('#btn_ok').click();
    scrollToVerse(e.srcElement.getAttribute('data-show_verse'));//me muevo al verse clickeado con scroll

    //si es mobile, ciero menu
    if(window.innerWidth < 768){
        //console.log('func selVerse(). mobile.');
        closeSidebar();
    }
}


//Click sobre el botton li of book 'Gen.' o chapter '1...' or verse '1...' 
//Construllo botones li de books, chapters, verses
function sel(e, par, show_chapter = null, trans = null){
    var inpt_nav = document.querySelector('#inpt_nav');
    //var trans = document.querySelector('#trans1').getAttribute('data-trans');//antes
    //var trans = (trans != null) ? trans : document.querySelector('#trans1').getAttribute('data-trans') ;//antes
    var trans_base = document.querySelector('#trans1').dataset.trans;
    var trans_inpt = inpt_nav.dataset.trans;

    if(trans != null){
        var trans = trans;
    }else{
        if(trans_inpt != ''){
            var trans = trans_inpt;
        }else{
            var trans = trans_base;
        }
    }

    if(typeof arrFavTransObj != 'undefined' && arrFavTransObj != null && arrFavTransObj != ''){
        //creo objeto de esta trans
        var this_trans_obj = arrFavTransObj.find(v => v.Translation === trans);
        //console.log('abajo  this_trans_obj: ');
        //console.log(this_trans_obj);
    }

    var v_book = document.querySelector('#v_book')
    var v_chapter = document.querySelector('#v_chapter')
    var v_verse = document.querySelector('#v_verse');

    // console.log(' === en function sel(). trans1 (trans_base): '+trans_base);
    // console.log(' === en function sel(). param trans: '+trans);
    // console.log(' === en function sel(). trans2 (inpt): '+inpt_nav.dataset.trans);

    document.querySelectorAll('.v_bcv').forEach(el=>{
        el.classList.remove('bcv_active');
    });
    e.classList.add('bcv_active');

    document.querySelectorAll('.wr_lis').forEach(el=>{
        el.classList.remove('ul_active');
    });

    var bcv_line = document.querySelector('#bcv_line');
    
    //Select li Book
    if(par == 'b'){
        v_book.classList.add('ul_active');
        bcv_line.classList.remove('c_line');
        bcv_line.classList.remove('v_line');
        bcv_line.classList.add('b_line');

        var id_book = parseInt(inpt_nav.getAttribute('data-id_book'));
        //console.log(id_book);

        //modo new
        if(typeof arrFavTransObj != 'undefined' && arrFavTransObj != null && arrFavTransObj != ''){

            // Registra el tiempo de inicio
            const tiempoInicio_b = new Date().getTime();

            var myPromise_b = new Promise(function(resolve, reject){
                resolve('ok');
            });

            myPromise_b
            .then(res => {

                if(res == 'ok'){
                    window.arr_books = this_trans_obj.Books;
                    //console.log(arr_books);
                }
    
                v_book.innerHTML = '';//reset botones de books
    
                var arr_booksBible = [];
                var arr_genesis_hechos = [];
                var arr_ep_pablo = [];//epísolas de Pablo
                var arr_ep_saniago = [];//de Santiago a Juda
                var arr_apo = [];//Apocalipsis
                var arr_apocrif = [];//Apocrifos
        
                arr_books.forEach((el_b,i_b,arr_b) =>{
                    let cl_book = '';//class de book
                    if(i_b >= 0 && i_b <= 4){
                        cl_book = 'b_tora';//Tora
                    }
                    if(i_b >= 5 && i_b <= 16){
                        cl_book = 'b_hist';//historicos
                    }
                    if(i_b >= 17 && i_b <= 21){
                        cl_book = 'b_poet';//poeticos
                    }
                    if(i_b >= 22 && i_b <= 26){
                        cl_book = 'b_gr_prof';//grandes profetas
                    }
                    if(i_b >= 27 && i_b <= 38){
                        cl_book = 'b_peq_prof';//pequeños profetas
                    }
                    if(i_b >= 39 && i_b <= 42){
                       cl_book = 'b_evan';//evangelios
                    }
                    if(i_b == 43){
                       cl_book = 'b_hech';//hechos
                    }
                    if(i_b >= 44 && i_b <= 57){
                        cl_book = 'b_ep_pablo';//epístolas Pablo
                        arr_ep_pablo.push(el_b);
                    }
                    if(i_b >= 58 && i_b <= 64){
                        cl_book = 'b_ep';//otras epístolas (Иаков...)
                        arr_ep_saniago.push(el_b);
                    }
                    if(i_b == 65){
                        cl_book = 'b_apo';//apocalipsis
                        arr_apo.push(el_b);
                    }
                    if(i_b > 65){
                        cl_book = 'b_apocrif';//apócrifos
                        arr_apocrif.push(el_b);
                    }
                    if(i_b >= 0 && i_b <= 43){//de genesis a hechos
                        arr_genesis_hechos.push(el_b);
                    }
                    el_b.cl_book = cl_book;//obj new property
                });
    
                //Creo el array según la numeración
                if(this_trans_obj.EnglishPsalms == 'N'){//numeración Rusa
                    arr_booksBible = arr_booksBible.concat(arr_genesis_hechos, arr_ep_saniago, arr_ep_pablo, arr_apo, arr_apocrif);
                }else{//numeración Española
                    arr_booksBible = arr_booksBible.concat(arr_genesis_hechos, arr_ep_pablo, arr_ep_saniago, arr_apo, arr_apocrif);
                }
                //console.log(arr_booksBible);
    
                arr_booksBible.forEach((el_b,i_b,arr_b) =>{              
                    const li = document.createElement('li');
                    li.id = 'li' + arr_b[i_b].BookNumber;
                    li.title = arr_b[i_b].BookNumber;
                    li.setAttribute('data-id_book',arr_b[i_b].BookNumber);//0, 1, 2
                    li.setAttribute('data-show_book',arr_b[i_b].ShortNames[0]);//Gen. Ex. Lev.
                    li.className = 'v_li b_li '+ el_b.cl_book;
                    if(arr_b[i_b].BookNumber == id_book){// antes i_b == id_book
                        li.classList.add('li_active');                    
                    }
                    if(arr_books[arr_b[i_b].BookNumber].ChapterQty == 0){
                        li.classList.add('no_disp');
                    }
                    li.innerHTML = arr_b[i_b].ShortNames[0];
                    li.addEventListener('click',selBook);//click sobre li boton Gen. Lev.
                    v_book.append(li);
    
                    //si es último libro del Antiguo Testamento o Apocalipsis, meto razdelitel
                    if(i_b == 38 || i_b == 65){//Малахия //Откровение
                        const li_break = document.createElement('li');
                        li_break.className = 'break_book';
                        v_book.append(li_break);
                    }
                    //console.log(el_b);
                });
            })
            .then(()=>{
                //si hay un boton li activo me muevo alli
                if(v_book.getElementsByClassName('li_active').length > 0){
                    setTimeout(()=>{
                        v_book.querySelector('.li_active').scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                            inline: "nearest"
                        });
                    },100);
                }

                // Registra el tiempo de finalización
                //const tiempoFin_b = new Date().getTime();
                //const tiempoEjecucion_b = (tiempoFin_b - tiempoInicio_b) / 1000;//
                //console.log('myPromise_b --- tiempoEjecucion_b: '+tiempoEjecucion_b+' sec.');

            })
            .catch(error => { 
                // Código a realizar cuando se rechaza la promesa
                console.log('error promesa myPromise_b: '+error);
            });

        }else{//modo old

            //alert('modo old');//al iniciar...

            let url = './modules/text/'+trans+'/bibleqt.json';//rsti2
            fetch(url)
            .then(response => response.json())
            .then(data => {
    
                window.arr_books = data.Books;
                //console.log(arr_books);
    
                v_book.innerHTML = '';//reset botones de books
    
                var arr_booksBible = [];
                var arr_genesis_hechos = [];
                var arr_ep_pablo = [];//epísolas de Pablo
                var arr_ep_saniago = [];//de Santiago a Juda
                var arr_apo = [];//Apocalipsis
                var arr_apocrif = [];//Apocrifos
        
                arr_books.forEach((el_b,i_b,arr_b) =>{
                    let cl_book = '';//class de book
                    if(i_b >= 0 && i_b <= 4){
                        cl_book = 'b_tora';//Tora
                    }
                    if(i_b >= 5 && i_b <= 16){
                        cl_book = 'b_hist';//historicos
                    }
                    if(i_b >= 17 && i_b <= 21){
                        cl_book = 'b_poet';//poeticos
                    }
                    if(i_b >= 22 && i_b <= 26){
                        cl_book = 'b_gr_prof';//grandes profetas
                    }
                    if(i_b >= 27 && i_b <= 38){
                        cl_book = 'b_peq_prof';//pequeños profetas
                    }
                    if(i_b >= 39 && i_b <= 42){
                       cl_book = 'b_evan';//evangelios
                    }
                    if(i_b == 43){
                       cl_book = 'b_hech';//hechos
                    }
                    if(i_b >= 44 && i_b <= 57){
                        cl_book = 'b_ep_pablo';//epístolas Pablo
                        arr_ep_pablo.push(el_b);
                    }
                    if(i_b >= 58 && i_b <= 64){
                        cl_book = 'b_ep';//otras epístolas (Иаков...)
                        arr_ep_saniago.push(el_b);
                    }
                    if(i_b == 65){
                        cl_book = 'b_apo';//apocalipsis
                        arr_apo.push(el_b);
                    }
                    if(i_b > 65){
                        cl_book = 'b_apocrif';//apócrifos
                        arr_apocrif.push(el_b);
                    }
                    if(i_b >= 0 && i_b <= 43){//de genesis a hechos
                        arr_genesis_hechos.push(el_b);
                    }
                    el_b.cl_book = cl_book;//obj new property
                });
    
                //Creo el array según la numeración
                if(data.EnglishPsalms == 'N'){//numeración Rusa
                    arr_booksBible = arr_booksBible.concat(arr_genesis_hechos, arr_ep_saniago, arr_ep_pablo, arr_apo, arr_apocrif);
                }else{//numeración Española
                    arr_booksBible = arr_booksBible.concat(arr_genesis_hechos, arr_ep_pablo, arr_ep_saniago, arr_apo, arr_apocrif);
                }
                //console.log(arr_booksBible);
    
                arr_booksBible.forEach((el_b,i_b,arr_b) =>{              
                    const li = document.createElement('li');
                    li.id = 'li' + arr_b[i_b].BookNumber;
                    li.title = arr_b[i_b].BookNumber;
                    li.setAttribute('data-id_book',arr_b[i_b].BookNumber);//0, 1, 2
                    li.setAttribute('data-show_book',arr_b[i_b].ShortNames[0]);//Gen. Ex. Lev.
                    li.className = 'v_li b_li '+ el_b.cl_book;
                    if(arr_b[i_b].BookNumber == id_book){// antes i_b == id_book
                        li.classList.add('li_active');                    
                    }
                    if(arr_books[arr_b[i_b].BookNumber].ChapterQty == 0){
                        li.classList.add('no_disp');
                    }
                    li.innerHTML = arr_b[i_b].ShortNames[0];
                    li.addEventListener('click',selBook);//click sobre li boton Gen. Lev.
                    v_book.append(li);
    
                    //si es último libro del Antiguo Testamento o Apocalipsis, meto razdelitel
                    if(i_b == 38 || i_b == 65){//Малахия //Откровение
                        const li_break = document.createElement('li');
                        li_break.className = 'break_book';
                        v_book.append(li_break);
                    }
                    //console.log(el_b);
                });
            })
            .then(()=>{
                //si hay un boton li activo me muevo alli
                if(v_book.getElementsByClassName('li_active').length > 0){
                    setTimeout(()=>{
                        v_book.querySelector('.li_active').scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                            inline: "nearest"
                        });
                    },100);
                }
            })
            .catch(error => { 
                // Código a realizar cuando se rechaza la promesa
                //console.log('error promesa: '+error);
            });

        }
    }
    //Select li Chapter
    else if(par == 'ch'){ 
        v_chapter.classList.add('ul_active');
        bcv_line.classList.remove('b_line');
        bcv_line.classList.remove('v_line');
        bcv_line.classList.add('c_line');

        var id_book = parseInt(inpt_nav.getAttribute('data-id_book'));
        var id_chapter = parseInt(inpt_nav.getAttribute('data-id_chapter'));//antes  
        
        
        //modo new
        if(typeof arrFavTransObj != 'undefined' && arrFavTransObj != null && arrFavTransObj != ''){

            var myPromise_ch = new Promise(function(resolve, reject){
                resolve('ok');
            });

            myPromise_ch
            .then(res => {
                
                if(res == 'ok'){//siempre ok
                    //console.log('this_trans_obj.Books[id_book].ChapterQty: '+this_trans_obj.Books[id_book].ChapterQty);    
                }
                
                var inpt_nav = document.querySelector('#inpt_nav');//test
    
                if(document.querySelectorAll('.cols').length > 1){
                    var chapter = obj_nav.show_chapter;
                    var verse = obj_nav.show_verse; 
                    var to_verse = null;//todavia no está seleccionado
                    
                    var res_new_link = checkRefNav(id_book, chapter, verse, to_verse);

                    if(res_new_link){
                        //asigno nuevo valor
                        var bookNumber = res_new_link[0];
                        var chapterNumber = res_new_link[1];
                        var verseNumber = res_new_link[2];
                        var to_verseNumber = res_new_link[3];
                        var trans_BookShortName = res_new_link[4];
                        
                        // console.log('---despues---');
                        // console.log('3.--- res_new_link --- ahora bookNumber: '+bookNumber);//empezando de 1
                        // console.log('3.--- res_new_link --- ahora chapterNumber: '+chapterNumber);//empezando de 1
                        // console.log('3.--- res_new_link --- ahora verseNumber: '+verseNumber);//empezando de 1
                        // console.log('3.--- res_new_link --- ahora to_verseNumber: '+to_verseNumber);//mayor que verseNumber
                        // console.log('3.--- res_new_link --- ahora trans_BookShortName: '+trans_BookShortName);//mayor que verseNumber

                        var new_ref_text = trans_BookShortName;
                        if(chapterNumber > 0) new_ref_text += ' ' + chapterNumber;
                        if(verseNumber > 0) new_ref_text += ':' + verseNumber;
                        if(to_verseNumber > 0 && parseInt(to_verseNumber) > parseInt(verseNumber)) new_ref_text += '-' + to_verseNumber;
                        // document.querySelector('#inpt_nav').value = new_ref_text;
                        inpt_nav.value = new_ref_text;
                    }
                } 

                v_chapter.innerHTML = '';//reset todos los botones de chapter                            

                for(let index = 1; index <= this_trans_obj.Books[id_book].ChapterQty; index++) {
                    const li_ch = document.createElement('li');
                    li_ch.id = 'li_ch' + index;
                    li_ch.setAttribute('data-id_chapter',index - 1);
                    li_ch.setAttribute('data-show_chapter',index);
                    li_ch.className = 'v_li c_li';

                    //si el menu fue clickeado desde no la trans1 (trans base) 
                    if(inpt_nav.dataset.divtrans != '' && inpt_nav.dataset.divtrans != 'trans1'){
                        //console.log(index+') if --- obj_nav.divtrans != trans1');
                        //id_chapter = chapterNumber - 1;
                        //show_chapter = chapterNumber;
                        if(index == chapterNumber){
                            //console.log('--- --- modifico chapter: ' + chapterNumber);
                            li_ch.classList.add('li_active');
                        }    
                    }else{
                        //console.log(index+') else --- obj_nav.divtrans == trans1');
                        if(index == id_chapter + 1){
                            li_ch.classList.add('li_active');
                        }    
                    }
                    li_ch.innerHTML = index;
                    li_ch.addEventListener('click',selChapter);//click sobre li boton de chapter
                    v_chapter.append(li_ch);           
                }
            })
            .then(()=>{
                //si hay un boton li activo me muevo alli
                if(v_chapter.getElementsByClassName('li_active').length > 0){
                    setTimeout(()=>{
                        v_chapter.querySelector('.li_active').scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                            inline: "nearest"
                        });
                    },100);
                }
            })
            .catch(error => { 
                // Código a realizar cuando se rechaza la promesa
                console.log('error promesa chapter. error: '+error);
            });

        }else{//modo old

            alert('chapter modo old');

            let url_bq = './modules/text/'+trans+'/bibleqt.json';//rsti2
            fetch(url_bq)
            .then(response => response.json())
            .then(data => {
                window.chapter_PathName = data.Books[id_book].PathName;
                //console.log(chapter_PathName);
    
                let url = './modules/text/'+trans+'/' + chapter_PathName;//rsti2
                fetch(url)
                .then(response => response.text())
                .then(data => {
                    //console.log('abajo chapter_PathName');
                    //console.log(data);        
    
                    var inpt_nav = document.querySelector('#inpt_nav');//test
    
                    if(document.querySelectorAll('.cols').length > 1){
                        var chapter = obj_nav.show_chapter;
                        var verse = obj_nav.show_verse; 
                        var to_verse = null;//todavia no está seleccionado
                        
                        var res_new_link = checkRefNav(id_book, chapter, verse, to_verse);
    
                        if(res_new_link){
                            //asigno nuevo valor
                            var bookNumber = res_new_link[0];
                            var chapterNumber = res_new_link[1];
                            var verseNumber = res_new_link[2];
                            var to_verseNumber = res_new_link[3];
                            var trans_BookShortName = res_new_link[4];
                            
                            // console.log('---despues---');
                            // console.log('3.--- res_new_link --- ahora bookNumber: '+bookNumber);//empezando de 1
                            // console.log('3.--- res_new_link --- ahora chapterNumber: '+chapterNumber);//empezando de 1
                            // console.log('3.--- res_new_link --- ahora verseNumber: '+verseNumber);//empezando de 1
                            // console.log('3.--- res_new_link --- ahora to_verseNumber: '+to_verseNumber);//mayor que verseNumber
                            // console.log('3.--- res_new_link --- ahora trans_BookShortName: '+trans_BookShortName);//mayor que verseNumber
    
                            var new_ref_text = trans_BookShortName;
                            if(chapterNumber > 0) new_ref_text += ' ' + chapterNumber;
                            if(verseNumber > 0) new_ref_text += ':' + verseNumber;
                            if(to_verseNumber > 0 && parseInt(to_verseNumber) > parseInt(verseNumber)) new_ref_text += '-' + to_verseNumber;
                            // document.querySelector('#inpt_nav').value = new_ref_text;
                            inpt_nav.value = new_ref_text;
                        }
                    } 
                                    
                    window.arr_chapters = data.split('<h4>');
                    //console.log('abajo arr_chapters');
                    //console.log(arr_chapters);
    
                    v_chapter.innerHTML = '';//reset todos los botones de chapter                            
    
                    for(let index = 1; index <= arr_chapters.length - 1; index++) {
                        const li_ch = document.createElement('li');
                        li_ch.id = 'li_ch' + index;
                        li_ch.setAttribute('data-id_chapter',index - 1);
                        li_ch.setAttribute('data-show_chapter',index);
                        li_ch.className = 'v_li c_li';
    
                        //si el menu fue clickeado desde no la trans1 (trans base) 
                        if(inpt_nav.dataset.divtrans != '' && inpt_nav.dataset.divtrans != 'trans1'){
                            //console.log(index+') if --- obj_nav.divtrans != trans1');
                            //id_chapter = chapterNumber - 1;
                            //show_chapter = chapterNumber;
                            if(index == chapterNumber){
                                //console.log('--- --- modifico chapter: ' + chapterNumber);
                                li_ch.classList.add('li_active');
                            }    
                        }else{
                            //console.log(index+') else --- obj_nav.divtrans == trans1');
                            if(index == id_chapter + 1){
                                li_ch.classList.add('li_active');
                            }    
                        }
                        //if(index == id_chapter + 1){
                        //    li_ch.classList.add('li_active');
                        //}
                        li_ch.innerHTML = index;
                        li_ch.addEventListener('click',selChapter);//click sobre li boton de chapter
                        v_chapter.append(li_ch);           
                    }
                })
                .then(()=>{
                    //si hay un boton li activo me muevo alli
                    if(v_chapter.getElementsByClassName('li_active').length > 0){
                        setTimeout(()=>{
                            v_chapter.querySelector('.li_active').scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                                inline: "nearest"
                            });
                        },100);
                    }
                })
                .catch(error => { 
                    // Código a realizar cuando se rechaza la promesa
                    //console.log('error promesa module: '+error);
                });
            })
            .catch(error => { 
                // Código a realizar cuando se rechaza la promesa
                //console.log('error promesa chapter: '+error);
            });

        }

    }
    //Select li Verse
    else if(par == 'v'){
        v_verse.classList.add('ul_active');
        bcv_line.classList.remove('b_line');
        bcv_line.classList.remove('c_line');
        bcv_line.classList.add('v_line');

        var id_book = parseInt(inpt_nav.getAttribute('data-id_book'));
        var id_chapter = parseInt(inpt_nav.getAttribute('data-id_chapter'));
        var id_verse = parseInt(inpt_nav.getAttribute('data-id_verse'));


        //modo new
        if(typeof arrFavTransObj != 'undefined' && arrFavTransObj != null && arrFavTransObj != ''){

            var myPromise_v = new Promise(function(resolve, reject){
                resolve('ok');
            });

            myPromise_v
            .then(res => {

                if(res == 'ok'){//siempre ok
                    //console.log('this_trans_obj.Books[id_book].PathName: '+this_trans_obj.Books[id_book].PathName);    
                }

                //si existe objeto con Translation. Saco datos del objeto
                if(typeof obj_o[trans] != 'undefined'){
                    if(typeof obj_o[trans].Books != 'undefined'){
                        if(typeof obj_o[trans].Books[id_book] != 'undefined'){

                            if(obj_o[trans].Books[id_book].fileName == this_trans_obj.Books[id_book].PathName && obj_o[trans].Books[id_book].fileContent != ''){
                                //console.log('existen datos del modulo para sacar numero de versiculos');

                                var inpt_nav = document.querySelector('#inpt_nav');
                    
                                if(document.querySelectorAll('.cols').length > 1){
                                    var chapter = obj_nav.show_chapter;
                                    var verse = obj_nav.show_verse; 
                                    var to_verse = null;//todavia no está seleccionado
                                    
                                    var res_new_link = checkRefNav(id_book, chapter, verse, to_verse);
                
                                    if(res_new_link){
                                        //asigno nuevo valor
                                        var bookNumber = res_new_link[0];
                                        var chapterNumber = res_new_link[1];
                                        var verseNumber = res_new_link[2];
                                        var to_verseNumber = res_new_link[3];
                                        var trans_BookShortName = res_new_link[4];
                                        
                                        // console.log('---despues---');
                                        // console.log('3.--- res_new_link --- ahora bookNumber: '+bookNumber);//empezando de 1
                                        // console.log('3.--- res_new_link --- ahora chapterNumber: '+chapterNumber);//empezando de 1
                                        // console.log('3.--- res_new_link --- ahora verseNumber: '+verseNumber);//empezando de 1
                                        // console.log('3.--- res_new_link --- ahora to_verseNumber: '+to_verseNumber);//mayor que verseNumber
                                        // console.log('3.--- res_new_link --- ahora trans_BookShortName: '+trans_BookShortName);//mayor que verseNumber
                
                                        var new_ref_text = trans_BookShortName;
                                        if(chapterNumber > 0) new_ref_text += ' ' + chapterNumber;
                                        if(verseNumber > 0) new_ref_text += ':' + verseNumber;
                                        if(to_verseNumber > 0 && parseInt(to_verseNumber) > parseInt(verseNumber)) new_ref_text += '-' + to_verseNumber;
                                        // document.querySelector('#inpt_nav').value = new_ref_text;
                                        inpt_nav.value = new_ref_text;
                                    }else{//si no hay que cambiar el chapter 
                                        var chapterNumber = id_chapter + 1;
                                        var verseNumber = id_verse + 1;    
                                    }
                                }else{
                                    var chapterNumber = id_chapter + 1;
                                    var verseNumber = id_verse + 1;
                                }
                        
                                window.arr_verses = obj_o[trans].Books[id_book].fileContent.split('<h4>')[chapterNumber].split('<p>');
                                //console.log('abajo arr_verses');
                                //console.log(arr_verses);
                
                                v_verse.innerHTML = '';//reset botones de versiculos
                                
                                for(let index = 1; index <= window.arr_verses.length - 1; index++) {
                                    const li_v = document.createElement('li');
                                    li_v.id = 'li_v' + index;
                                    li_v.setAttribute('data-id_verse',index - 1);
                                    li_v.setAttribute('data-show_verse',index);
                                    li_v.className = 'v_li';
                
                                    //si el menu fue clickeado desde no la trans1 (trans base) 
                                    if(inpt_nav.dataset.divtrans != '' && inpt_nav.dataset.divtrans != 'trans1'){
                                        //console.log(index+') if --- obj_nav.divtrans != trans1');
                                        if(index == verseNumber){
                                            //console.log('--- --- modifico verse: ' + verseNumber);
                                            li_v.classList.add('li_active');
                                        }    
                                    }else{
                                        //console.log(index+') else --- obj_nav.divtrans == trans1');
                                        if(index == id_verse + 1){
                                            li_v.classList.add('li_active');
                                        }    
                                    }
                
                                    li_v.innerHTML = index;
                                    li_v.addEventListener('click',selVerse);//al click sobre boton de verse
                                    v_verse.append(li_v);
                                }

                            }else{
                                console.log('No coincide el nombre del fichero o fileContent está vacío');
                            }

                        }                
                    }
                }

                //si no existe objeto con Translation. hago fetch(). es necesario!
                if(typeof obj_o[trans].Books[id_book] == 'undefined'){

                    //alert('no existe objeto con Translation. hago fetch()'); 
                    //console.log('no existe objeto con Translation. hago fetch()');

                    window.chapter_PathName = this_trans_obj.Books[id_book].PathName;
                    //console.log(chapter_PathName);
    

                    let url = './modules/text/'+trans+'/' + chapter_PathName;//rsti2
                    fetch(url)
                    .then(response => response.text())
                    .then(data => {
                        //console.log('abajo chapter_PathName');
                        //console.log(data);
        
                        var inpt_nav = document.querySelector('#inpt_nav');
        
                        if(document.querySelectorAll('.cols').length > 1){
                            var chapter = obj_nav.show_chapter;
                            var verse = obj_nav.show_verse; 
                            var to_verse = null;//todavia no está seleccionado
                            
                            var res_new_link = checkRefNav(id_book, chapter, verse, to_verse);
        
                            if(res_new_link){
                                //asigno nuevo valor
                                var bookNumber = res_new_link[0];
                                var chapterNumber = res_new_link[1];
                                var verseNumber = res_new_link[2];
                                var to_verseNumber = res_new_link[3];
                                var trans_BookShortName = res_new_link[4];
                                
                                // console.log('---despues---');
                                // console.log('3.--- res_new_link --- ahora bookNumber: '+bookNumber);//empezando de 1
                                // console.log('3.--- res_new_link --- ahora chapterNumber: '+chapterNumber);//empezando de 1
                                // console.log('3.--- res_new_link --- ahora verseNumber: '+verseNumber);//empezando de 1
                                // console.log('3.--- res_new_link --- ahora to_verseNumber: '+to_verseNumber);//mayor que verseNumber
                                // console.log('3.--- res_new_link --- ahora trans_BookShortName: '+trans_BookShortName);//mayor que verseNumber
        
                                var new_ref_text = trans_BookShortName;
                                if(chapterNumber > 0) new_ref_text += ' ' + chapterNumber;
                                if(verseNumber > 0) new_ref_text += ':' + verseNumber;
                                if(to_verseNumber > 0 && parseInt(to_verseNumber) > parseInt(verseNumber)) new_ref_text += '-' + to_verseNumber;
                                // document.querySelector('#inpt_nav').value = new_ref_text;
                                inpt_nav.value = new_ref_text;
                            }else{//si no hay que cambiar el chapter 
                                var chapterNumber = id_chapter + 1;
                                var verseNumber = id_verse + 1;    
                            }
                        }else{
                            var chapterNumber = id_chapter + 1;
                            var verseNumber = id_verse + 1;
                        }
                
                        //window.arr_verses = data.split('<h4>')[id_chapter + 1].split('<p>');//antes
                        window.arr_verses = data.split('<h4>')[chapterNumber].split('<p>');
                        //console.log('abajo arr_verses');
                        //console.log(arr_verses);
        
                        v_verse.innerHTML = '';//reset botones de versiculos
                        
                        for(let index = 1; index <= window.arr_verses.length - 1; index++) {
                            const li_v = document.createElement('li');
                            li_v.id = 'li_v' + index;
                            li_v.setAttribute('data-id_verse',index - 1);
                            li_v.setAttribute('data-show_verse',index);
                            li_v.className = 'v_li';
        
                            //si el menu fue clickeado desde no la trans1 (trans base) 
                            if(inpt_nav.dataset.divtrans != '' && inpt_nav.dataset.divtrans != 'trans1'){
                                //console.log(index+') if --- obj_nav.divtrans != trans1');
                                if(index == verseNumber){
                                    //console.log('--- --- modifico verse: ' + verseNumber);
                                    li_v.classList.add('li_active');
                                }    
                            }else{
                                //console.log(index+') else --- obj_nav.divtrans == trans1');
                                if(index == id_verse + 1){
                                    li_v.classList.add('li_active');
                                }    
                            }
        
                            li_v.innerHTML = index;
                            li_v.addEventListener('click',selVerse);//al click sobre boton de verse
                            v_verse.append(li_v);
                        }
                    })
                    .then(()=>{
                        //si hay un boton li activo me muevo alli
                        if(v_verse.getElementsByClassName('li_active').length > 0){
                            setTimeout(()=>{
                                v_verse.querySelector('.li_active').scrollIntoView({
                                    behavior: "smooth",
                                    block: "start",
                                    inline: "nearest"
                                });
                            },100);
                        }
                    })
                    .catch(error => { 
                        // Código a realizar cuando se rechaza la promesa
                        //console.log('error promesa: '+error);
                    });

                }                











            })
            .then(()=>{
                //si hay un boton li activo me muevo alli
                if(v_verse.getElementsByClassName('li_active').length > 0){
                    setTimeout(()=>{
                        v_verse.querySelector('.li_active').scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                            inline: "nearest"
                        });
                    },100);
                }
            })
            .catch(error => { 
                // Código a realizar cuando se rechaza la promesa
                console.log('error promesa: '+error);
            });//end myPromise_v

        }else{//modo old

            alert('modo old verse');
            
            let url_bq = './modules/text/'+trans+'/bibleqt.json';//rsti2
            fetch(url_bq)
            .then(response => response.json())
            .then(data => {

                window.chapter_PathName = data.Books[id_book].PathName;
                //console.log(chapter_PathName);
    
                let url = './modules/text/'+trans+'/' + chapter_PathName;//rsti2
                fetch(url)
                .then(response => response.text())
                .then(data => {
                    //console.log('abajo chapter_PathName');
                    //console.log(data);
    
                    var inpt_nav = document.querySelector('#inpt_nav');
    
                    if(document.querySelectorAll('.cols').length > 1){
                        var chapter = obj_nav.show_chapter;
                        var verse = obj_nav.show_verse; 
                        var to_verse = null;//todavia no está seleccionado
                        
                        var res_new_link = checkRefNav(id_book, chapter, verse, to_verse);
    
                        if(res_new_link){
                            //asigno nuevo valor
                            var bookNumber = res_new_link[0];
                            var chapterNumber = res_new_link[1];
                            var verseNumber = res_new_link[2];
                            var to_verseNumber = res_new_link[3];
                            var trans_BookShortName = res_new_link[4];
                            
                            // console.log('---despues---');
                            // console.log('3.--- res_new_link --- ahora bookNumber: '+bookNumber);//empezando de 1
                            // console.log('3.--- res_new_link --- ahora chapterNumber: '+chapterNumber);//empezando de 1
                            // console.log('3.--- res_new_link --- ahora verseNumber: '+verseNumber);//empezando de 1
                            // console.log('3.--- res_new_link --- ahora to_verseNumber: '+to_verseNumber);//mayor que verseNumber
                            // console.log('3.--- res_new_link --- ahora trans_BookShortName: '+trans_BookShortName);//mayor que verseNumber
    
                            var new_ref_text = trans_BookShortName;
                            if(chapterNumber > 0) new_ref_text += ' ' + chapterNumber;
                            if(verseNumber > 0) new_ref_text += ':' + verseNumber;
                            if(to_verseNumber > 0 && parseInt(to_verseNumber) > parseInt(verseNumber)) new_ref_text += '-' + to_verseNumber;
                            // document.querySelector('#inpt_nav').value = new_ref_text;
                            inpt_nav.value = new_ref_text;
                        }else{//si no hay que cambiar el chapter 
                            var chapterNumber = id_chapter + 1;
                            var verseNumber = id_verse + 1;    
                        }
                    }else{
                        var chapterNumber = id_chapter + 1;
                        var verseNumber = id_verse + 1;
                    }
            
                    //window.arr_verses = data.split('<h4>')[id_chapter + 1].split('<p>');//antes
                    window.arr_verses = data.split('<h4>')[chapterNumber].split('<p>');
                    //console.log('abajo arr_verses');
                    //console.log(arr_verses);
    
                    v_verse.innerHTML = '';//reset botones de versiculos
                    
                    for(let index = 1; index <= window.arr_verses.length - 1; index++) {
                        const li_v = document.createElement('li');
                        li_v.id = 'li_v' + index;
                        li_v.setAttribute('data-id_verse',index - 1);
                        li_v.setAttribute('data-show_verse',index);
                        li_v.className = 'v_li';
    
                        //si el menu fue clickeado desde no la trans1 (trans base) 
                        if(inpt_nav.dataset.divtrans != '' && inpt_nav.dataset.divtrans != 'trans1'){
                            //console.log(index+') if --- obj_nav.divtrans != trans1');
                            if(index == verseNumber){
                                //console.log('--- --- modifico verse: ' + verseNumber);
                                li_v.classList.add('li_active');
                            }    
                        }else{
                            //console.log(index+') else --- obj_nav.divtrans == trans1');
                            if(index == id_verse + 1){
                                li_v.classList.add('li_active');
                            }    
                        }
    
                        //if(index == id_verse + 1){
                        //    li_v.classList.add('li_active');
                        //}
                        li_v.innerHTML = index;
                        li_v.addEventListener('click',selVerse);//al click sobre boton de verse
                        v_verse.append(li_v);
                    }
                })
                .then(()=>{
                    //si hay un boton li activo me muevo alli
                    if(v_verse.getElementsByClassName('li_active').length > 0){
                        setTimeout(()=>{
                            v_verse.querySelector('.li_active').scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                                inline: "nearest"
                            });
                        },100);
                    }
                })
                .catch(error => { 
                    // Código a realizar cuando se rechaza la promesa
                    //console.log('error promesa: '+error);
                });
            })
            .catch(error => { 
                // Código a realizar cuando se rechaza la promesa
                //console.log('error promesa: '+error);
            });

        }

    }
    else{//select Book by default
        v_book.classList.add('ul_active');
    }
}

/*
function getRefForTsk(Translation, bookShortName){
    //console.log('Translation: '+Translation);
    //console.log('bookShortName: '+bookShortName);
    var bookNumber;

    let url = './modules/text/'+Translation+'/bibleqt.json';//Ej.: rsti2
    fetch(url)
    .then(response => response.json())
    .then(data => {
        //console.log(data);

        window.dataBooks2 = data.Books;

        dataBooks2.forEach((el,i,arr) =>{
            //console.log('arr['+i+']: '+arr[i].FullName + ' '+arr[i].ShortNames[0] );
            arr[i].ShortNames.forEach( (e,j,arr_s) =>{
                if(bookShortName.toLowerCase() == e.toLowerCase()){
                    var n_book = arr[i].BookNumber;
                    var short_name = arr_s[0];//siempre el primer nombre del array

                    bookNumber = i;
                    //console.log('bookNumber: '+bookNumber);

                    //showTrans(n_book, chapter, verse, to_verse);
                    //console.log('--- encontrado n_book: ' +n_book + '\n short_name: ' +short_name);

                    //return bookNumber;
                }
            });
        });
    })
    .catch(error => { 
        // Código a realizar cuando se rechaza la promesa
        //console.log('error promesa: '+error);
    });
    return bookNumber;
}
*/


function getRef(trans = null){
    //console.log('=== function getRef() ===');
    var inpt = document.querySelector('#inpt_nav');
    var inpt_nav = document.querySelector('#inpt_nav');
    var div_trans1 = document.querySelector('#trans1');
    var act_trans = div_trans1.getAttribute('data-trans');
    //var trans = (trans == null) ? document.querySelector('#trans1').getAttribute('data-trans') : trans ;
    var trans_inpt = inpt_nav.dataset.trans;

    //Si no viene trans, lo cojo del div #trans1
    if(trans == null || trans == ''){
        var trans = (trans_inpt != '') ? trans_inpt : act_trans;
    }else{//si viene trans...        
        //si trans es distinto del actual y es en tablet o desktop
        if(trans != act_trans && window.innerWidth >= 768){
            //lo cojo del parametro y grabo en div #trans1
            var button_new_trans = document.querySelector('#footerInner button[value="'+trans+'"]');
            var EnglishPsalms = button_new_trans.getAttribute('ep');//EnglishPsalms
            div_trans1.setAttribute('data-trans',trans);
            div_trans1.setAttribute('data-base_ep',EnglishPsalms);
            div_trans1.querySelector('.colsHeadInner .partDesk .desk_trans').innerHTML = button_new_trans.innerHTML;//meto  BibleShortName (RST+);
            document.querySelector('#s_book').click();//function sel(; click на 'Книга', чтобы загрузились названия книг выбраного модуля.
            
            var trans_buttons = document.querySelectorAll('#footerInner button');
            trans_buttons.forEach(el=>{
                el.classList.remove('btn_active');
            });
            button_new_trans.classList.add('btn_active');
            //console.log('nuevo trans: '+trans);
        }
    }


    var inpt_v = inpt.value.trim();
    var book = null;//por defecto
    var chapter = null;//por defecto
    var verse = null;//por defecto
    var to_verse = null;//por defecto
    //console.log(inpt_v);

    //Solo book
    if(inpt_v.split(' ').length == 1){
        var arr_book = inpt_v.split(' ');
        book = arr_book[0];
    }

    //Ejemplo: 'Jn.3:16' y Jn.3:16-18
    if(inpt_v.includes(':')){
        var arr_v = inpt_v.split(':');
        verse = arr_v[1];
        //console.log('verse: '+verse);
        
        if(verse.includes('-')){
            var arr_verse = verse.split('-');
            verse = arr_verse[0];
            to_verse = arr_verse[1];
            //console.log('to_verse: '+to_verse);
        }

        if(arr_v[0].includes('.')){
            var arr_ch = arr_v[0].split('.');

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
            var arr_ch = arr_v[0].split(' ');
            book = arr_ch[0];
            chapter = arr_ch[1];
            //console.log('book: '+book);
            //console.log('chapter: '+chapter);
        }
    }

    //Ejemplo: 'Jn.3,16'
    if(inpt_v.includes(',')){
        var arr_v = inpt_v.split(',');
        verse = arr_v[1];
        //console.log('verse: '+verse);
        
        if(verse.includes('-')){
            var arr_verse = verse.split('-');
            verse = arr_verse[0];
            to_verse = arr_verse[1];
            //console.log('to_verse: '+to_verse);
        }

        if(arr_v[0].includes('.')){
            var arr_ch = arr_v[0].split('.');
            book = arr_ch[0] + '.';
            chapter = arr_ch[1];
            //console.log('book: '+book);
            //console.log('chapter: '+chapter);
        }

        if(arr_v[0].includes(' ')){
            var arr_ch = arr_v[0].split(' ');
            book = arr_ch[0];
            chapter = arr_ch[1];
            //console.log('book: '+book);
            //console.log('chapter: '+chapter);
        }
    }

    //Ejemplo: 'Jn. 3 16' y 'Jn 3 16-18' // sin ':'
    if(inpt_v.includes(' ') && !inpt_v.includes(':') && !inpt_v.includes(',')){
        var arr_v = inpt_v.split(' ');

        if(arr_v.length > 3){
            arr_v = arr_v.filter(elm=>elm);
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
                var arr_verse = verse.split('-');
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


    if(book != null){
        let url = './modules/text/'+trans+'/bibleqt.json';//rsti2
        fetch(url)
        .then(response => {
          return response.json(); // Devuelve una promesa
        })
        .then(data => {
            //console.log(data);
    
            window.dataBooksBtnOk = data.Books;

            for (let i = 0; i < dataBooksBtnOk.length; i++) {
                for (let j = 0; j < dataBooksBtnOk[i].ShortNames.length; j++) {
                    const el = dataBooksBtnOk[i].ShortNames[j];
                    if(book.toLowerCase() == el.toLowerCase() || book.toLowerCase()+'.' == el.toLowerCase()){//añado '.' por si viene 'Sal' y en ShortNames hay 'Sal.'
                        var n_book = dataBooksBtnOk[i].BookNumber;
                        var short_name = dataBooksBtnOk[i].ShortNames[0];//siempre el primer nombre del array

                        var inpt_nav = document.querySelector('#inpt_nav');

                        //reviso desde qué divtrans se llega a introducir la referencia para preparar la ref correspondiente para trans1 si se accede desde otros trans's en mobile
                        if(window.innerWidth < 768){//mobile
                            //checkRefNav(n_book, chapter, verse, to_verse);                        
                        
                            if(document.querySelectorAll('.cols').length > 1){

                                //si es trans2 y es trans con EnglishPsalms 'Y' se cliquea en el boton li de chapter Sal.23 español, convierto el chapter en el Пс 22 ruso 
                                console.log('clickeado trans: '+inpt_nav.dataset.trans);
                                
                                var trans_base = document.querySelector('#trans1').dataset.trans;//la trans base de #trans1
                                var trans_inpt = inpt_nav.dataset.trans;// trans desde input
                                var divtrans_inpt = inpt_nav.dataset.divtrans;// trans desde input

                                if(divtrans_inpt != '' && divtrans_inpt != 'trans1'){
                                    // Usa el método find para buscar el objeto que contiene 'rst' como nombre
                                    const obj_trans_base = arrFavTransObj.find(v => v.Translation === trans_base);
                                    const obj_trans_inpt = arrFavTransObj.find(v => v.Translation === trans_inpt);

                                    if(obj_trans_base.EnglishPsalms == 'N' && obj_trans_inpt.EnglishPsalms == 'Y'){
                                        var new_res = convertLinkFromEspToRus(n_book, chapter, verse, to_verse);//importante EspToRus
                                        chapter = new_res[1];
                                        verse = new_res[2];
                                        to_verse = new_res[3];
                                        console.log('en getRef() --- convertido chapter: '+chapter);//empezando de 1
                                        console.log('en getRef() --- convertido verse: '+verse);//empezando de 1
                                        console.log('en getRef() --- convertido to_verse: '+to_verse);//empezando de 1
                                    }
                                    else if(obj_trans_base.EnglishPsalms == 'Y' && obj_trans_inpt.EnglishPsalms == 'N'){
                                        var new_res = convertLinkFromRusToEsp(n_book, chapter, verse, to_verse);//importante RusToEsp
                                        chapter = new_res[1];
                                        verse = new_res[2];
                                        to_verse = new_res[3];
                                        console.log('en getRef() --- convertido chapter: '+chapter);//empezando de 1
                                        console.log('en getRef() --- convertido verse: '+verse);//empezando de 1
                                        console.log('en getRef() --- convertido to_verse: '+to_verse);//empezando de 1
                                    }else{
                                        console.log('en getRef() --- no hago nada. chapter verse to_verse se quedan igual como en input.');
                                    }

                                }
                            }                        
                        
                        } 

                        chapter = (chapter != null) ? chapter : 1;//default si no hay
                    
                        inpt_nav.setAttribute('data-id_book',n_book);
                        inpt_nav.setAttribute('data-show_book',short_name);

                        inpt_nav.setAttribute('data-id_chapter',parseInt(chapter) - 1);
                        inpt_nav.setAttribute('data-show_chapter',chapter);

                        inpt_nav.setAttribute('data-id_verse',parseInt(verse) - 1);
                        inpt_nav.setAttribute('data-show_verse',verse);

                        inpt_nav.value = short_name;
                        obj_nav.show_book = short_name;
                        
                        //chapter
                        if(chapter != null && parseInt(chapter) > 0){
                            inpt_nav.value += ' ' + chapter;
                            obj_nav.id_chapter = parseInt(chapter) - 1;
                            obj_nav.show_chapter = chapter;
                            document.querySelector('#v_chapter').innerHTML = '';
                        }else{
                            document.querySelector('#v_chapter').innerHTML = 'selecciona el capítulo';
                            obj_nav.id_chapter = parseInt(chapter) - 1;//por defecto para que no dé fallo
                            obj_nav.show_chapter = chapter;//por defecto para que no dé fallo
                        }
                        
                        //verse
                        if(verse != null && parseInt(verse) > 0){
                            inpt_nav.value += ':' + verse;
                            obj_nav.id_verse = parseInt(verse) - 1;
                            obj_nav.show_verse = verse;
                            document.querySelector('#v_verse').innerHTML = '';
                        }else{
                            document.querySelector('#v_verse').innerHTML = '<span class="prim_verse">2. Antes de seleccionar el versículo, selecciona el capítulo por favor.</span>';
                        }
                        //hay to_verse
                        if(to_verse != null && parseInt(to_verse) > 0 && parseInt(verse) < parseInt(to_verse)){
                            inpt_nav.value += '-' + to_verse;
                            inpt_nav.setAttribute('data-show_to_verse',to_verse);
                            obj_nav.show_to_verse = to_verse;
                        }else{
                            inpt_nav.setAttribute('data-show_to_verse','');
                            obj_nav.show_to_verse = '';
                        }


                        
                        //no hay chapter, no hay verse
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

                        document.querySelector('#v_book .li_active').classList.remove('li_active');//quito anterior book
                        document.querySelector('#v_book li[data-id_book="'+n_book+'"]').classList.add('li_active');//añado book

                        //si es mobile, cierro menu
                        if(window.innerWidth < 768){
                            //console.log(' btn ok. cierro menu en mobile.');
                            closeSidebar();
                        }

                        //meto Gen.1:1 en los head de cada trans
                        document.querySelectorAll('.partMob .mob_sh_link').forEach(el=>{
                            let verse_to_show = (verse > 0) ? parseInt(verse) : 1 ;
                            putRefvisibleToHead(`00__${n_book}__${chapter}__${verse_to_show}`, 0);//todos los heads de cols
                        });

                        showTrans(n_book, chapter, verse, to_verse);
                        //console.log('--- encontrado n_book: ' +n_book + '\n short_name: ' +short_name);
                        break;
                    }else{
                        //console.log('no hay coincidencia en el nombre corto de la Biblia... ');
                    }
                }//end for                
            }//end for   
        })
        .catch(error => { 
            // Código a realizar cuando se rechaza la promesa
            //console.log('error promesa: '+error);
        });
    }else{
        //console.log('no existe book');
    }
}


function getRefByCode(code){//ej.: code: rv60__0__14__7 / rv60__0__14__7-14
    //console.log('=== function getRefByCode() ===');
    var div_trans1 = document.querySelector('#trans1');
    var act_trans = div_trans1.getAttribute('data-trans');

    var arr_code = code.split('__');
    var trans = arr_code[0];
    var book = arr_code[1];
    var chapter = arr_code[2];
    var verse = arr_code[3];
    var to_verse = null;
    if(arr_code[3].includes('-')){
        verse = arr_code[3].split('-')[0];
        to_verse = arr_code[3].split('-')[1];
    }
    //console.log(inpt_v);

    //console.log('book: '+book);
    //console.log('chapter: '+chapter);
    //console.log('verse: '+verse);
    //console.log('to_verse: '+to_verse);

       
    //si trans es distinto del actual
    if(trans != act_trans){
        //lo cojo del parametro y grabo en div #trans1
        var button_new_trans = document.querySelector('#footerInner button[value="'+trans+'"]');
        var EnglishPsalms = button_new_trans.getAttribute('ep');//EnglishPsalms
        div_trans1.setAttribute('data-trans',trans);
        div_trans1.setAttribute('data-base_ep',EnglishPsalms);
        div_trans1.querySelector('.colsHeadInner .partDesk .desk_trans').innerHTML = button_new_trans.innerHTML;//meto  BibleShortName (RST+);
        document.querySelector('#s_book').click();//function sel(; click на 'Книга', чтобы загрузились названия книг выбраного модуля.
        
        var trans_buttons = document.querySelectorAll('#footerInner button');
        trans_buttons.forEach(el=>{
            el.classList.remove('btn_active');
        });
        button_new_trans.classList.add('btn_active');
        //console.log('nuevo trans: '+trans);
    }


    if(book != null){
        let url = './modules/text/'+trans+'/bibleqt.json';//rsti2
        fetch(url)
        .then(response => {
          return response.json(); // Devuelve una promesa
        })
        .then(data => {
            //console.log(data);
    
            let short_name = data.Books[book].ShortNames[0];
            let inpt_nav = document.querySelector('#inpt_nav');
                    
            inpt_nav.setAttribute('data-id_book',book);
            inpt_nav.setAttribute('data-show_book',short_name);

            inpt_nav.setAttribute('data-id_chapter',parseInt(chapter) - 1);
            inpt_nav.setAttribute('data-show_chapter',chapter);

            inpt_nav.setAttribute('data-id_verse',parseInt(verse) - 1);
            inpt_nav.setAttribute('data-show_verse',verse);

            inpt_nav.value = short_name ;

            if(chapter != null && parseInt(chapter) > 0){
                inpt_nav.value += ' ' + chapter;
                document.querySelector('#v_chapter').innerHTML = '';
            }

            if(verse != null && parseInt(verse) > 0){
                inpt_nav.value += ':' + verse;
                document.querySelector('#v_verse').innerHTML = '';
            }
            //hay to_verse
            if(to_verse != null && parseInt(to_verse) > 0 && parseInt(verse) < parseInt(to_verse)){
                inpt_nav.value += '-' + to_verse;
                inpt_nav.setAttribute('data-show_to_verse',to_verse);
            }else{
                inpt_nav.setAttribute('data-show_to_verse','');
            }

            //hay chapter, hay verse
            if(parseInt(chapter) > 0 && parseInt(verse) > 0){
                document.querySelector('#s_verse').click();// se cargan verses del chapter indicado y se muestra el verse marcado
            }

            document.querySelector('#v_book .li_active').classList.remove('li_active');//quito anterior book
            document.querySelector('#v_book li[data-id_book="'+book+'"]').classList.add('li_active');//añado book

            showTrans(book, chapter, verse, to_verse);
            //console.log('--- code of book: ' +book + ' --- and short_name: ' +short_name);   
        })
        .catch(error => { 
            // Código a realizar cuando se rechaza la promesa
            //console.log('error promesa: '+error);
        });
    }else{
        //console.log('no existe book');
    }
}


function getRefByCodeForFind(code){//ej.: code: rv60__0__14__7 / rv60__0__14__7-14
    //console.log('=== function getRefByCodeForFind() ===');
    var div_trans1 = document.querySelector('#trans1');
    var act_trans = div_trans1.getAttribute('data-trans');

    var arr_code = code.split('__');
    var trans = arr_code[0];
    var book = arr_code[1];
    var chapter = arr_code[2];
    var verse = arr_code[3];
    var to_verse = null;
    if(arr_code[3].includes('-')){
        verse = arr_code[3].split('-')[0];
        to_verse = arr_code[3].split('-')[1];
    }
    //console.log(inpt_v);

    //console.log('book: '+book);
    //console.log('chapter: '+chapter);
    //console.log('verse: '+verse);
    //console.log('to_verse: '+to_verse);

       
    //si trans es distinto del actual
    if(trans != act_trans){
        //lo cojo del parametro y grabo en div #trans1
        var button_new_trans = document.querySelector('#footerInner button[value="'+trans+'"]');
        var EnglishPsalms = button_new_trans.getAttribute('ep');//EnglishPsalms
        div_trans1.setAttribute('data-trans',trans);
        div_trans1.setAttribute('data-base_ep',EnglishPsalms);
        div_trans1.querySelector('.colsHeadInner .partDesk .desk_trans').innerHTML = button_new_trans.innerHTML;//meto  BibleShortName (RST+);
        document.querySelector('#s_book').click();//function sel(; click на 'Книга', чтобы загрузились названия книг выбраного модуля.
        
        var trans_buttons = document.querySelectorAll('#footerInner button');
        trans_buttons.forEach(el=>{
            el.classList.remove('btn_active');
        });
        button_new_trans.classList.add('btn_active');
        //console.log('nuevo trans: '+trans);
    }


    if(book != null){
        let url = './modules/text/'+trans+'/bibleqt.json';//rsti2
        fetch(url)
        .then(response => {
          return response.json(); // Devuelve una promesa
        })
        .then(data => {
            //console.log(data);
    
            let short_name = data.Books[book].ShortNames[0];
            let inpt_nav = document.querySelector('#inpt_nav');
                    
            inpt_nav.setAttribute('data-id_book',book);
            inpt_nav.setAttribute('data-show_book',short_name);

            inpt_nav.setAttribute('data-id_chapter',parseInt(chapter) - 1);
            inpt_nav.setAttribute('data-show_chapter',chapter);

            inpt_nav.setAttribute('data-id_verse',parseInt(verse) - 1);
            inpt_nav.setAttribute('data-show_verse',verse);

            inpt_nav.value = short_name ;

            if(chapter != null && parseInt(chapter) > 0){
                inpt_nav.value += ' ' + chapter;
                document.querySelector('#v_chapter').innerHTML = '';
            }

            if(verse != null && parseInt(verse) > 0){
                inpt_nav.value += ':' + verse;
                document.querySelector('#v_verse').innerHTML = '';
            }
            //hay to_verse
            if(to_verse != null && parseInt(to_verse) > 0 && parseInt(verse) < parseInt(to_verse)){
                inpt_nav.value += '-' + to_verse;
                inpt_nav.setAttribute('data-show_to_verse',to_verse);
            }else{
                inpt_nav.setAttribute('data-show_to_verse','');
            }

            //hay chapter, hay verse
            if(parseInt(chapter) > 0 && parseInt(verse) > 0){
                document.querySelector('#s_verse').click();// se cargan verses del chapter indicado y se muestra el verse marcado
            }

            document.querySelector('#v_book .li_active').classList.remove('li_active');//quito anterior book
            document.querySelector('#v_book li[data-id_book="'+book+'"]').classList.add('li_active');//añado book

            showTrans(book, chapter, verse, to_verse);
            //console.log('--- code of book: ' +book + ' --- and short_name: ' +short_name);   
        })
        .catch(error => { 
            // Código a realizar cuando se rechaza la promesa
            //console.log('error promesa: '+error);
        });
    }else{
        //console.log('no existe book');
    }
}



document.onkeydown = checkKey;

function checkKey(e) {//funciona .codigo mas limpio aunque .keyCode is deprecated
    e = e || window.event;
    switch (e.keyCode) {
        case 13:// tecla "Enter"
            if(document.querySelector('#btn_nav').classList.contains('btn_active')){
                var thisBtn = document.querySelector('#btn_ok')
                thisBtn.click();
                thisBtn.classList.add('btn_ok_active');
                setTimeout(() => {thisBtn.classList.remove('btn_ok_active')},100);
            }
            if(document.querySelector('#btn_find').classList.contains('btn_active')){
                document.querySelector('#btn_ok_find').click();
            }
        
            break;

        case 27:// tecla "Esc"
            if(document.querySelector('#btn_nav').classList.contains('btn_active')){
                clear_inpt('nav');
            }
            if(document.querySelector('#btn_find').classList.contains('btn_active')){
                //clear_inpt('find');
                stopFindWords();
            }
            if(document.querySelector('#btn_strong').classList.contains('btn_active')){
                clear_inpt('strong');
            }
            break;      
    }
};
function clear_inpt(param){
    let thisInpt = document.querySelector('#inpt_'+param);
    thisInpt.value = '';
    thisInpt.focus();
}


function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function selectModule(e){
    var thisDiv = e.currentTarget;

    let sk_test = true;//test...
    if(sk_test){
        thisDiv = e;
    }
    //console.log(thisDiv);
    
    Swal.fire({
        title: '<p><strong>Выберите модуль Библии</strong></p>',
        icon: 'info',
        html: ` <select name="modules" id="sel_modules" >

                    <optgroup label="Русский язык">
                        <option data-trans="rstStrongRed" data-shortName="RST+r">(RU) Синодальная Библия (с номерами Стронга, слова Иисуса выделены красным)</option>
                        <option data-trans="rstStrong" data-shortName="RST+">(RU) Русский Синодальный текст (с номерами Стронга)</option>
                        <option data-trans="rstt" data-shortName="RSTt">(RU) Синодальная Библия (для переводчиков).</option>
                        <option data-trans="rsti2" data-shortName="RSTi2*">(RU)* Уточненный синодальный перевод. Испр. 2 + неканонические.</option>
                        <option data-trans="rstm" data-shortName="RSTm*">(RU)* Русский Синодальный текст (современная редакция) + неканонические.</option>
                        <option data-trans="nrt" data-shortName="NRT">(RU) Новый русский перевод IBS 2006 Москва.</option>
                        <option data-trans="rstStrong_rv60" data-shortName="RST+RV60">(RU+ES) Русский Синодальный текст (с номерами Стронга) + Reina Valera 1960</option>
                        <option data-trans="opnz" data-shortName="OPNZ">(RU) Окрытый Перевод Новго Завета. 2013</option>
                    </optgroup>
                    <option disabled></option>

                    <optgroup label="Українська мова">
                        <option data-trans="ukr_fil" data-shortName="Ukr_Fil">(UA) Біблія. Патріарх Філарет (Денисено)</option>
                        <option data-trans="ukr_ogi" data-shortName="Ukr_Ogi">(UA) Біблія у перекладі І. Огієнка</option>
                        <option data-trans="ukr_hom" data-shortName="Ukr_Hom">(UA) Біблія у перекладі І. Хоменка</option>
                        <option data-trans="ukr_gyz" data-shortName="Ukr_Gyz">(UA) Біблія у перекладі Олександра Гижи</option>
                        <option data-trans="ukr_tur" data-shortName="Ukr_Tur">(UA) Біблія у перекладі з давньогрецької о. Р. Турконяка = UBT</option>
                        <option data-trans="ukr_der" data-shortName="Ukr_Der">(UA) Новий Завіт у перекладі Г. Деркач</option>
                    </optgroup>
                    <option disabled></option>

                    <optgroup label="Español">
                        <option data-trans="rv60" data-shortName="RV60">(ES) Reina Valera 1960</option>
                        <option data-trans="lbla" data-shortName="LBLA">(ES) La Biblia de las Américas</option>
                    </optgroup>
                    <option disabled></option>

                    <optgroup style="display:none;" label="English">
                        <option style="display:none;" data-trans="kjv" data-shortName="KJV">(EN) King James Version</option>
                        <option style="display:none;" data-trans="nkjv" data-shortName="NKJV">(EN) New King James Version</option>
                    </optgroup>
                    <option disabled></option>

                </select>
                <br><br>
                `,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Ok',
        confirmButtonAriaLabel: '',
        cancelButtonText: 'Отмена',
        cancelButtonAriaLabel: ''
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if(result.isConfirmed) {
            let sel_modules = document.querySelector('#sel_modules');
            let i = sel_modules.selectedIndex;
            //let trans = sel_modules[i].value;
            let trans = sel_modules[i].getAttribute('data-trans');
            // let BibleShortName = sel_modules[i].innerHTML;
            let BibleShortName = sel_modules[i].getAttribute('data-shortName');
            let BibleFullName = sel_modules[i].innerHTML;
            //console.log(trans);
            //console.log(thisDiv);

            changeModule(thisDiv, trans, BibleShortName);
            //document.querySelector('#footer button[value="'+sel_modules[i].value+'"]').click();
            //Swal.fire('Выбраный Модуль Библии: <b>' + BibleFullName + '</b>', '', 'success');
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
}


function selectModule2(htmlTrans){
    //console.log(arrFavTransObj);
    const bl_modalFullInner = document.querySelector('#bl_modalFullInner');
    bl_modalFullInner.innerHTML = '';//reset

    // let thisDiv = document.querySelector('#trans2.colsHead');//test
    let thisDiv = htmlTrans;//test
    //console.log('abajo htmlTrans: ');
    //console.log(htmlTrans);


    arrFavTransObj.forEach((el,i)=>{

        const p = document.createElement('p');
        p.className = 'cl_trans';
        p.innerHTML = `<span class="sh_n">${arrFavTransObj[i].BibleShortName}</span> `;
        p.innerHTML += `<span class="la_n">${arrFavTransObj[i].BibleName}</span>`;
        p.onclick = function(){
            changeModule2(thisDiv, arrFavTransObj[i].Translation, arrFavTransObj[i].BibleShortName,arrFavTransObj[i].EnglishPsalms);
            //console.log('p.onclick llamando changeModule2 ');
            closeModal();
        }        

        bl_modalFullInner.appendChild(p);
    });
}


function getObjTransByName(trans){
    if(typeof arrFavTransObj != 'undefined'){
        return arrFavTransObj.find(v => v.Translation === trans );
    }else{
        return false;
    }
}



function selectTab(){//Vkladki
    //console.log('function selectTab()');
    const bl_modalFullInner = document.querySelector('#bl_modalFullInner');
    bl_modalFullInner.innerHTML = '';//reset

    arrTabs.forEach((el,i)=>{

        //busco nombres de trans para mostrar
        let arr_el_trans = el.str_trans.split(',');
        //console.log('arr_el_trans: '+arr_el_trans);

        //saco BibleShortName por Translation desde string 
        let arr_trans_names = [];
        arr_el_trans.forEach(el_tr => {
            el_tr = el_tr.trim();
            //console.log('el_tr: '+el_tr);
            
            const el_tr_obj = arrFavTransObj.find(v => v.Translation === el_tr );
            //console.log(el_tr_obj);
            arr_trans_names.push(el_tr_obj.BibleShortName);
        });
        let str_trans_names = arr_trans_names.join(', ');
        //console.log('end --- str_trans_names: '+str_trans_names);

        const p = document.createElement('p');
        p.className = 'cl_tab';
        if(arrTabs[i].className.includes('tab_active')) p.className += ' cl_tab_active'; 
        p.innerHTML = `<span class="sh_nl">${i+1}) </span> `;
        p.innerHTML += `<span class="sh_n">${arrTabs[i].ref}</span> `;
        p.innerHTML += `<span class="sh_cuant" title="Translations to compare: ${arr_trans_names.length}">(${arr_trans_names.length})</span>`;
        p.innerHTML += `<span class="la_n">${str_trans_names}</span>`;
        p.innerHTML += `<span class="btn_tab_x" onclick="closeTab(document.querySelector('#${arrTabs[i].id} button'))">&#10005;</span>`;// <!--X--> 
        p.onclick = function(){
            if(window.innerWidth < 768){
                positionShow = 'col';//pongo 'col' para que se cambie a 'row' onclick 
                document.querySelector('#btn_changePositionShowModal').click();               
            }
            if(typeof arrTabs[i] != 'undefined'){
                //simulo click sobre vkladka correspondiente
                let this_tab = document.querySelector('#'+arrTabs[i].id);
                this_tab.click();
                this_tab.scrollIntoView();
            }
            //console.log('p.onclick llamando changeModule2 ');
            closeModal();
            updateArrTabs();
        }
        bl_modalFullInner.appendChild(p);
    });
}

addListenerModule();

function addListenerModule(){
    document.querySelectorAll('.colsHead').forEach((el,i)=>{
        if(i>0){
            el.addEventListener('click',selectModule);//antes
            //el.addEventListener('click',selectModule2);//new
        }
    });
}



function hist(param){
    console.log('funcion en desarrollo. param: '+param);
}


function bookGo(dir){
    //console.log('bookGo dir: '+dir);    
    var inpt_nav = document.querySelector('#inpt_nav');
    var act_id_book = (inpt_nav.getAttribute('data-id_book') != '') ? inpt_nav.getAttribute('data-id_book') : 0 ;//genesis
    Translation = (inpt_nav.dataset.trans != '') ? inpt_nav.dataset.trans : document.querySelector('#trans1').getAttribute('data-trans');

    //reset de verse en rojo ya que hay que escojer el verse...
    inpt_nav.setAttribute('data-id_chapter', '0');
    inpt_nav.setAttribute('data-show_chapter', '1');
    inpt_nav.setAttribute('data-id_verse', '');
    inpt_nav.setAttribute('data-show_verse', '');
    document.querySelectorAll('#v_verse .v_li').forEach(el=>{
        el.classList.remove('li_active');
    });

    obj_nav.id_chapter = 0;
    obj_nav.show_chapter = 1;
    obj_nav.id_verse = '';
    obj_nav.show_verse = '';

    var objTrans = arrFavTransObj.find(v => v.Translation === Translation);

    //MODO NEW. Cuando  ya está creado el objeto 'objTrans' desde 'arrFavTransObj'
    if(typeof objTrans != 'undefined' && objTrans != null && objTrans != '' ){
        //alert('bookGo(dir) --- objTrans está creado. abajo objTrans: ');
        //console.log('bookGo(dir) --- objTrans está creado. abajo objTrans: ');
        //console.log(objTrans);

        var myPromise_b_go = new Promise(function(resolve, reject){
            resolve('ok');
        });

        myPromise_b_go
        .then((res) => {

            if(res == 'ok'){//siempre ok
                var bq = objTrans;
            }            
            //console.log('abajo bq'); 
            //console.log(bq); 

            //console.log('abajo bq'); 
            //console.log(bq); 

            if(dir == 'next'){
                var next_id_book = act_id_book;
                var next_show_chapter = 1;//siempre      
                
                if(act_id_book == parseInt(bq.BookQty) - 1){//66 - 1 = 65 //Apocalipsis
                    next_id_book = 0;//Génesis
                }else{
                    next_id_book = parseInt(act_id_book) + 1;
                }            

                inpt_nav.setAttribute('data-id_book', next_id_book);
                inpt_nav.setAttribute('data-show_book', bq.Books[next_id_book].ShortNames[0]);

                inpt_nav.setAttribute('data-id_chapter', parseInt(next_show_chapter) - 1);
                inpt_nav.setAttribute('data-show_chapter', next_show_chapter);

                inpt_nav.value = bq.Books[next_id_book].ShortNames[0] + ' ' + next_show_chapter;

                //meto Gen.1:1 en los head de cada trans
                document.querySelectorAll('.partMob .mob_sh_link').forEach(el=>{
                    putRefvisibleToHead(`00__${next_id_book}__${next_show_chapter}__1`, 0);//todos los heads de cols
                });

                obj_nav.id_book = next_id_book;
                obj_nav.show_book = bq.Books[next_id_book].ShortNames[0];

                obj_nav.id_chapter = parseInt(next_show_chapter) - 1;
                obj_nav.show_chapter = next_show_chapter;


                sel(document.querySelector('#s_chapter'),'ch',next_show_chapter);//chapter
                showTrans(next_id_book, next_show_chapter);
            }

            if(dir == 'prev'){
                var prev_id_book = act_id_book;
                var prev_show_chapter = 1;

                if(act_id_book == 0){//Génesis
                    prev_id_book = parseInt(bq.BookQty) - 1;//66 - 1 = 65 => Apocapipsis
                }else{
                    prev_id_book = parseInt(act_id_book) - 1;
                }

                inpt_nav.setAttribute('data-id_book', prev_id_book);
                inpt_nav.setAttribute('data-show_book', bq.Books[prev_id_book].ShortNames[0]);

                inpt_nav.setAttribute('data-id_chapter', parseInt(prev_show_chapter) - 1);
                inpt_nav.setAttribute('data-show_chapter', prev_show_chapter);

                inpt_nav.value = bq.Books[prev_id_book].ShortNames[0] + ' ' + prev_show_chapter;
                
                //meto Gen.1:1 en los head de cada trans
                document.querySelectorAll('.partMob .mob_sh_link').forEach(el=>{
                    putRefvisibleToHead(`00__${prev_id_book}__${prev_show_chapter}__1`, 0);//todos los heads de cols
                });

                obj_nav.id_book = prev_id_book;
                obj_nav.show_book = bq.Books[prev_id_book].ShortNames[0];

                obj_nav.id_chapter = parseInt(prev_show_chapter) - 1;
                obj_nav.show_chapter = prev_show_chapter;

                sel(document.querySelector('#s_chapter'),'ch',prev_show_chapter);//chapter
                showTrans(prev_id_book, prev_show_chapter);
            }            
        })
        .catch(error => { 
            // Código a realizar cuando se rechaza la promesa
            //console.log('error promesa: '+error);
        });

    }else{//MODO OLD. si hace falta!

        //alert('bookGo(dir) --- modo old. fetch()');
        //console.log('chapterGo(dir) --- modo old. fetch()');

        //saco ajustes de este modulo en json
        url_bq = `modules/text/${Translation}/bibleqt.json`;
        fetch(url_bq)
        .then((response) => response.json())
        .then((bq) => {

            //console.log('abajo bq'); 
            //console.log(bq); 

            if(dir == 'next'){
                var next_id_book = act_id_book;
                var next_show_chapter = 1;//siempre      
                
                if(act_id_book == parseInt(bq.BookQty) - 1){//66 - 1 = 65 //Apocalipsis
                    next_id_book = 0;//Génesis
                }else{
                    next_id_book = parseInt(act_id_book) + 1;
                }            

                inpt_nav.setAttribute('data-id_book', next_id_book);
                inpt_nav.setAttribute('data-show_book', bq.Books[next_id_book].ShortNames[0]);

                inpt_nav.setAttribute('data-id_chapter', parseInt(next_show_chapter) - 1);
                inpt_nav.setAttribute('data-show_chapter', next_show_chapter);

                inpt_nav.value = bq.Books[next_id_book].ShortNames[0] + ' ' + next_show_chapter;

                //meto Gen.1:1 en los head de cada trans
                document.querySelectorAll('.partMob .mob_sh_link').forEach(el=>{
                    putRefvisibleToHead(`00__${next_id_book}__${next_show_chapter}__1`, 0);//todos los heads de cols
                });

                obj_nav.id_book = next_id_book;
                obj_nav.show_book = bq.Books[next_id_book].ShortNames[0];

                obj_nav.id_chapter = parseInt(next_show_chapter) - 1;
                obj_nav.show_chapter = next_show_chapter;


                sel(document.querySelector('#s_chapter'),'ch',next_show_chapter);//chapter
                showTrans(next_id_book, next_show_chapter);
            }

            if(dir == 'prev'){
                var prev_id_book = act_id_book;
                var prev_show_chapter = 1;

                if(act_id_book == 0){//Génesis
                    prev_id_book = parseInt(bq.BookQty) - 1;//66 - 1 = 65 => Apocapipsis
                }else{
                    prev_id_book = parseInt(act_id_book) - 1;
                }

                inpt_nav.setAttribute('data-id_book', prev_id_book);
                inpt_nav.setAttribute('data-show_book', bq.Books[prev_id_book].ShortNames[0]);

                inpt_nav.setAttribute('data-id_chapter', parseInt(prev_show_chapter) - 1);
                inpt_nav.setAttribute('data-show_chapter', prev_show_chapter);

                inpt_nav.value = bq.Books[prev_id_book].ShortNames[0] + ' ' + prev_show_chapter;
                
                //meto Gen.1:1 en los head de cada trans
                document.querySelectorAll('.partMob .mob_sh_link').forEach(el=>{
                    putRefvisibleToHead(`00__${prev_id_book}__${prev_show_chapter}__1`, 0);//todos los heads de cols
                });

                obj_nav.id_book = prev_id_book;
                obj_nav.show_book = bq.Books[prev_id_book].ShortNames[0];

                obj_nav.id_chapter = parseInt(prev_show_chapter) - 1;
                obj_nav.show_chapter = prev_show_chapter;

                sel(document.querySelector('#s_chapter'),'ch',prev_show_chapter);//chapter
                showTrans(prev_id_book, prev_show_chapter);
            }            
        })
        .catch(error => { 
            // Código a realizar cuando se rechaza la promesa
            //console.log('error promesa: '+error);
        });

    }

}

function scrollTopCero(){
    document.querySelectorAll('.colsInner').forEach(el=>{
        el.scrollTop = 0;
    });
}


function chapterGo(dir){
    var inpt_nav = document.querySelector('#inpt_nav');
    var act_id_book = (inpt_nav.getAttribute('data-id_book') != '') ? inpt_nav.getAttribute('data-id_book') : 0 ;//genesis
    var act_show_chapter = (inpt_nav.getAttribute('data-show_chapter') != '') ? inpt_nav.getAttribute('data-show_chapter') : 1 ;
    Translation = (inpt_nav.dataset.trans != '') ? inpt_nav.dataset.trans : document.querySelector('#trans1').getAttribute('data-trans');

    //reset de verse en rojo ya que hay que escojer el verse...
    inpt_nav.setAttribute('data-id_verse', '');
    inpt_nav.setAttribute('data-show_verse', '');
    document.querySelectorAll('#v_verse .v_li').forEach(el=>{
        el.classList.remove('li_active');
    });

    obj_nav.id_verse = '';
    obj_nav.show_verse = '';

    //por defecto muevo el scroll al top
    scrollTopCero();



    var objTrans = arrFavTransObj.find(v => v.Translation === Translation);
    
    //MODO NEW. Cuando  ya está creado el objeto 'objTrans' desde 'arrFavTransObj'
    if(typeof objTrans != 'undefined' && objTrans != null && objTrans != '' ){
        //alert('chapterGo(dir) --- objTrans está creado. abajo objTrans: ');
        //console.log('chapterGo(dir) --- objTrans está creado. abajo objTrans: ');
        //console.log(objTrans);

        var myPromise_ch_go = new Promise(function(resolve, reject){
            resolve('ok');
        });


        myPromise_ch_go
        .then((res) => {

            if(res == 'ok'){//siempre ok
                var bq = objTrans;
            }            
            //console.log('abajo bq'); 
            //console.log(bq); 

            //if(act_id_book >= bq.BookQty){//REVISAR!!!
            //    alert('No es posible pasar a siguiente capítulo ya que todos los módulos no tienen la misma cantidad de libros.Esto sucede cuando se quiere leer los librós apócrifos.');
            //    return false;
            //}


            if(dir == 'next'){
                var next_id_book = act_id_book;
                var next_show_chapter = act_show_chapter; 

                if(act_show_chapter == bq.Books[act_id_book].ChapterQty){
                    if(act_id_book == parseInt(bq.BookQty) - 1){//Apocalipsis
                        next_id_book = 0;//Génesis
                    }else{
                        next_id_book = parseInt(act_id_book) + 1;
                    }
                    next_show_chapter = 1;
                }else{
                    next_show_chapter = parseInt(act_show_chapter) + 1;
                }
                inpt_nav.setAttribute('data-id_book', next_id_book);
                inpt_nav.setAttribute('data-show_book', bq.Books[next_id_book].ShortNames[0]);

                inpt_nav.setAttribute('data-id_chapter', parseInt(next_show_chapter) - 1);
                inpt_nav.setAttribute('data-show_chapter', next_show_chapter);

                inpt_nav.value = bq.Books[next_id_book].ShortNames[0] + ' ' + next_show_chapter;
                
                //meto Gen.1:1 en los head de cada trans
                document.querySelectorAll('.partMob .mob_sh_link').forEach(el=>{
                    putRefvisibleToHead(`00__${next_id_book}__${next_show_chapter}__1`, 0);//todos los heads de cols
                });

                obj_nav.id_book = next_id_book;
                obj_nav.show_book = bq.Books[next_id_book].ShortNames[0];

                obj_nav.id_chapter = parseInt(next_show_chapter) - 1;
                obj_nav.show_chapter = next_show_chapter;

                sel(document.querySelector('#s_verse'),'v',Translation);//verse
                showTrans(next_id_book, next_show_chapter); 
            }

            if(dir == 'prev'){
                var prev_id_book = act_id_book;
                var prev_show_chapter = act_show_chapter;

                if(act_show_chapter == 1){
                    if(act_id_book == 0){//Génesis
                        prev_id_book = parseInt(bq.BookQty) - 1;//66 - 1 = 65 => Apocapipsis
                    }else{
                        prev_id_book = parseInt(act_id_book) - 1;
                    }
                    prev_show_chapter = parseInt(bq.Books[prev_id_book].ChapterQty);
                }else{
                    prev_show_chapter = parseInt(act_show_chapter) - 1;
                }
                inpt_nav.setAttribute('data-id_book', prev_id_book);
                inpt_nav.setAttribute('data-show_book', bq.Books[prev_id_book].ShortNames[0]);

                inpt_nav.setAttribute('data-id_chapter', parseInt(prev_show_chapter) - 1);
                inpt_nav.setAttribute('data-show_chapter', prev_show_chapter);

                inpt_nav.value = bq.Books[prev_id_book].ShortNames[0] + ' ' + prev_show_chapter;

                //meto Gen.1:1 en los head de cada trans
                document.querySelectorAll('.partMob .mob_sh_link').forEach(el=>{
                    putRefvisibleToHead(`00__${prev_id_book}__${prev_show_chapter}__1`, 0);//todos los heads de cols
                });

                obj_nav.id_book = prev_id_book;
                obj_nav.show_book = bq.Books[prev_id_book].ShortNames[0];

                obj_nav.id_chapter = parseInt(prev_show_chapter) - 1;
                obj_nav.show_chapter = prev_show_chapter;

                sel(document.querySelector('#s_verse'),'v',Translation);//verse
                showTrans(prev_id_book, prev_show_chapter);
            }

            
        })
        .catch(error => { 
            // Código a realizar cuando se rechaza la promesa
            //console.log('error promesa: '+error);
        });

    }else{//MODO OLD. si hace falta!
        
        //alert('chapterGo(dir) --- modo old. fetch()');
        //console.log('chapterGo(dir) --- modo old. fetch()');

        //saco ajustes de este modulo en json
        url_bq = `modules/text/${Translation}/bibleqt.json`;
        fetch(url_bq)
        .then((response) => response.json())
        .then((bq) => {

            //console.log('abajo bq'); 
            //console.log(bq); 

            //if(act_id_book >= bq.BookQty){//REVISAR!!!
            //    alert('No es posible pasar a siguiente capítulo ya que todos los módulos no tienen la misma cantidad de libros.Esto sucede cuando se quiere leer los librós apócrifos.');
            //    return false;
            //}


            if(dir == 'next'){
                var next_id_book = act_id_book;
                var next_show_chapter = act_show_chapter; 

                if(act_show_chapter == bq.Books[act_id_book].ChapterQty){
                    if(act_id_book == parseInt(bq.BookQty) - 1){//Apocalipsis
                        next_id_book = 0;//Génesis
                    }else{
                        next_id_book = parseInt(act_id_book) + 1;
                    }
                    next_show_chapter = 1;
                }else{
                    next_show_chapter = parseInt(act_show_chapter) + 1;
                }
                inpt_nav.setAttribute('data-id_book', next_id_book);
                inpt_nav.setAttribute('data-show_book', bq.Books[next_id_book].ShortNames[0]);

                inpt_nav.setAttribute('data-id_chapter', parseInt(next_show_chapter) - 1);
                inpt_nav.setAttribute('data-show_chapter', next_show_chapter);

                inpt_nav.value = bq.Books[next_id_book].ShortNames[0] + ' ' + next_show_chapter;
                
                //meto Gen.1:1 en los head de cada trans
                document.querySelectorAll('.partMob .mob_sh_link').forEach(el=>{
                    putRefvisibleToHead(`00__${next_id_book}__${next_show_chapter}__1`, 0);//todos los heads de cols
                });

                obj_nav.id_book = next_id_book;
                obj_nav.show_book = bq.Books[next_id_book].ShortNames[0];

                obj_nav.id_chapter = parseInt(next_show_chapter) - 1;
                obj_nav.show_chapter = next_show_chapter;

                sel(document.querySelector('#s_verse'),'v',Translation);//verse
                showTrans(next_id_book, next_show_chapter); 
            }

            if(dir == 'prev'){
                var prev_id_book = act_id_book;
                var prev_show_chapter = act_show_chapter;

                if(act_show_chapter == 1){
                    if(act_id_book == 0){//Génesis
                        prev_id_book = parseInt(bq.BookQty) - 1;//66 - 1 = 65 => Apocapipsis
                    }else{
                        prev_id_book = parseInt(act_id_book) - 1;
                    }
                    prev_show_chapter = parseInt(bq.Books[prev_id_book].ChapterQty);
                }else{
                    prev_show_chapter = parseInt(act_show_chapter) - 1;
                }
                inpt_nav.setAttribute('data-id_book', prev_id_book);
                inpt_nav.setAttribute('data-show_book', bq.Books[prev_id_book].ShortNames[0]);

                inpt_nav.setAttribute('data-id_chapter', parseInt(prev_show_chapter) - 1);
                inpt_nav.setAttribute('data-show_chapter', prev_show_chapter);

                inpt_nav.value = bq.Books[prev_id_book].ShortNames[0] + ' ' + prev_show_chapter;

                //meto Gen.1:1 en los head de cada trans
                document.querySelectorAll('.partMob .mob_sh_link').forEach(el=>{
                    putRefvisibleToHead(`00__${prev_id_book}__${prev_show_chapter}__1`, 0);//todos los heads de cols
                });

                obj_nav.id_book = prev_id_book;
                obj_nav.show_book = bq.Books[prev_id_book].ShortNames[0];

                obj_nav.id_chapter = parseInt(prev_show_chapter) - 1;
                obj_nav.show_chapter = prev_show_chapter;

                sel(document.querySelector('#s_verse'),'v',Translation);//verse
                showTrans(prev_id_book, prev_show_chapter);
            }

            
        })
        .catch(error => { 
            // Código a realizar cuando se rechaza la promesa
            //console.log('error promesa: '+error);
        });

    }


}

function showTab(e, param){
    document.querySelectorAll('.wr_btns_scr button').forEach(el=>{
        el.classList.remove('btn_active');
    });
    e.classList.add('btn_active');
    
    
    if(param == 'nav'){
        document.querySelector('#vklad_nav').style.display = 'block';
        document.querySelector('#vklad_find').style.display = 'none';
        document.querySelector('#vklad_tsk').style.display = 'none';
        document.querySelector('#vklad_strong').style.display = 'none';
        mySizeNav();
    }
    if(param == 'find'){
        document.querySelector('#vklad_nav').style.display = 'none';
        document.querySelector('#vklad_find').style.display = 'block';
        document.querySelector('#vklad_tsk').style.display = 'none';
        document.querySelector('#vklad_strong').style.display = 'none';
        mySizeFind();
    }
    if(param == 'tsk'){
        document.querySelector('#vklad_nav').style.display = 'none';
        document.querySelector('#vklad_find').style.display = 'none';
        document.querySelector('#vklad_tsk').style.display = 'block';
        document.querySelector('#vklad_strong').style.display = 'none';
        mySizeTsk();
    }
    if(param == 'strong'){
        document.querySelector('#vklad_nav').style.display = 'none';
        document.querySelector('#vklad_find').style.display = 'none';
        document.querySelector('#vklad_tsk').style.display = 'none';
        document.querySelector('#vklad_strong').style.display = 'block';
        mySizeStrong();
    }
            
}

function goToLink(trans, refLink){
    //console.log('=== function goToLink(refLink). refLink: '+refLink);
    document.querySelector('#inpt_nav').value = refLink;
    
    //console.log('llamo getRef()...');
    getRef(trans);

    //document.querySelector('#btn_ok').click();   

    /*
    let link = e.getAttribute('data2').split('__');
    let trans = link[0];
    let book = link[1];
    let chapter = link[2];
    let verse = link[3];
    let to_verse = link[4];
    showTrans(book, chapter, verse, to_verse);
    */
}

function goToLinkFromFind(trans, refLink){
    //console.log('=== function goToLinkFromFind(refLink). refLink: '+refLink);
    document.querySelector('#inpt_nav').value = refLink;

    //para que no aparezca TSK
    //showTab(document.querySelector('#btn_find'),'find');
    document.querySelector('#vklad_tsk').style.display = 'none';
    
    //console.log('llamo getRef()...');
    getRef(trans); 
}

function puntosInterval(){
    const element = document.querySelector(".puntos");
    var count = 0;
    if(element != null){
        setInterval(()=>{
            element.innerHTML += ".";
            count++;
            if(count == 4){
            count = 0;
            element.innerHTML = ''; 
            }               
        }, 500);
    }
}

function showTabMob(btn_id, param, el){
    //1. abro menu mobile
    openSidebar(el);
    //2. llamo showTab(document.querySelector('#btn_nav'),'nav')
    showTab(document.querySelector(btn_id), param);
}


function makeTransObj(){
    var arrTrans = [
        "rstStrongRed",
        "rstStrong",
        "rstt",
        "rsti2",
        "rstm",
        "nrt",
        "rstStrong_rv60",
        "opnz",
        
        "ukr_fil",
        "ukr_ogi",
        "ukr_hom",
        "ukr_gyz",
        "ukr_tur",
        "ukr_der",
        
        "rv60",
        "lbla"

        //"kjv",
        //"nkjv",
    ];

    var arrTransObj = [];
    //var arrTransObj = {};
    //let y = 0;

    for (let i = 0; i < arrTrans.length; i++) {
        const el = arrTrans[i];
        //console.log(i);
        //console.log(el);

        //saco ajustes de este modulo en json
        url_bq = `modules/text/${el}/bibleqt.json`;
        //console.log(url_bq);

        fetch(url_bq)
        .then((response) => response.json())
        .then((bq) => {
            arrTransObj[i] = bq;
            //console.log(arrTransObj);
        })
        .catch(error => { 
            // Código a realizar cuando se rechaza la promesa
            console.log('makeTransObj. error promesa: '+error);
        });        
    }

    //return arrTrans;
    return arrTransObj;
}

function makeTskObj(){
    var arrTsk = [
        "tsk"
        //"tsk_gromov",
        //"tsk_otro",
    ];

    var arrTskObj = [];

    for (let i = 0; i < arrTsk.length; i++) {
        const el = arrTsk[i];
        //console.log(i);
        //console.log(el);

        //saco ajustes de este modulo en json
        url_bq = `modules/text/${el}/bibleqt.json`;
        //console.log(url_bq);

        fetch(url_bq)
        .then((response) => response.json())
        .then((bq) => {
            arrTskObj[i] = bq;
            //console.log(arrTskObj);
        })
        .catch(error => { 
            // Código a realizar cuando se rechaza la promesa
            console.log('makeTskObj. error promesa: '+error);
        });        
    }

    return arrTskObj;
}


















