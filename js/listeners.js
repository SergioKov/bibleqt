/*
document.addEventListener("DOMContentLoaded", function(event) { 
    //do work
    //console.log('DOMContentLoaded');
    //addListenerToPA();//listen links p > a //no hace falta ya que todavía no hay p a

    //addTrans();
    //addTrans();
});
*/

//listen links p > a
function addListenerToPA(){
    setTimeout(()=>{
        //console.log('=== function addListenerToPA()');       
       document.querySelectorAll('.colsInner').forEach(event =>{ 
            event.removeEventListener("click", handlerListenColsInnerAClick);
            event.addEventListener('click', handlerListenColsInnerAClick);    
        });

    },100);  
}

let contador_llamada_tsk = 0;

const handlerListenColsInnerAClick = (e) => {
    //console.log(e);
    //console.log(e.target.parentElement);
    if(e.target.tagName == 'A'){
        contador_llamada_tsk++;
        //console.log(`--- contador_llamada_tsk: ${contador_llamada_tsk}`);
        getTsk(e);//ok new
    }
    if(e.target.className == 'btn_verse_menu'){
        //console.log(`--- es btn_verse_menu ---`);
        showVerseMenu(e);//muestro botones: añadir zametku, añadir marcador, copiar, comparar, compartir link
    }
}

//listen links p > a en Tsk block
function addListenerToPATsk(){//no se llama en ninguna parte
    setTimeout(()=>{
        //console.log('=== function addListenerToPATsk()');
        let trans = eid_tsk_head.querySelector('p').dataset.trans; 
        Array.from(document.querySelectorAll('#vklad_tsk p a')).forEach(el=>{
            el.addEventListener('click',()=>{
                goToLink(trans, el.innerHTML);
            });
        });
    },1000);  
}








function addListenerToScrollLeft(){//para controlar el scroll a la izda o derecha de la IMGx2
    console.log('=== function addListenerToScrollLeft()');
    //console.log(`inicial scrollLeftVal: ${scrollLeftVal}`);

    let colsInnerAll = document.querySelectorAll('.colsInner'); 
    colsInnerAll.forEach((el,i)=>{
        el.removeEventListener('scroll', myListenerScrollLeft);
        el.addEventListener('scroll', myListenerScrollLeft.bind(null,el,i));
    }); 
}

function myListenerScrollLeft(el,i,event){
    console.log('=== function myListenerScrollLeft() ===');
    //console.log(el);
    //console.log(i);
    //console.log(event);
    //console.log(`myListenerScrollLeft() --- scrollLeftVal: ${scrollLeftVal}`);
    let scrollLeftVal_prev = scrollLeftVal;

    if(el.getElementsByTagName('img').length > 0 && enable_IMGx2){
        scrollLeftVal = el.scrollLeft; 
        //console.log(`if --- scrollLeftVal: ${scrollLeftVal}`);            
        if(scrollLeftVal == 0 && scrollLeftVal_prev > 0){
            setTimeout(()=>{
                doScrollAllImg(scrollLeftVal_prev);
            },1000);
        }else{
            doScrollAllImg(scrollLeftVal);                    
        }
    }else{
        //console.log(`else --- scrollLeftVal: ${scrollLeftVal}`);
        //el.scrollLeft = scrollLeftVal;
    }
}

function doScrollAllImg(scrollLeftVal){
    console.log('=== function doScrollAllImg() ===');

    let colsInnerAll = document.querySelectorAll('.colsInner');
    //console.log(`doScrollAllImg() --- scrollLeftVal: ${scrollLeftVal}`);
    
    colsInnerAll.forEach(el=>{
        //console.log(el);
        if(el.querySelector('img')){
            el.scrollLeft = scrollLeftVal;
        }        
    });
}