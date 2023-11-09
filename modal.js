// Get the modal
const modal = document.getElementById('myModal');
const modalContent = document.getElementById('myModalContent');
const modalContent_header = document.getElementById('myModalContent header');
const modalContent_section = document.getElementById('myModalContent section');
const modalContent_footer = document.getElementById('myModalContent footer');
const bl_modalTop = document.getElementById('bl_modalTop');
const bl_modalBottom = document.getElementById('bl_modalBottom');
const bl_modalCenter = document.getElementById('bl_modalCenter');
const bl_modalFull = document.getElementById('bl_modalFull');

// Get the button that opens the modal
//var btn = document.getElementById("myBtn");

// When the user clicks the button, open the modal 
//btn.onclick = openModal;

function openModal(param = null, htmlTrans = null) {
  
    let header_h4_text = modalContent.querySelector('header .h4_text');

    modal.style.display = "block";
    modal.style.opacity = 0;//start efecto fade
    setTimeout(()=>{
        modal.style.opacity = 1;//end efecto fade
    },10);

    //reset
    modalContent.removeAttribute('class');
    modalContent.classList.add('modal-content');
 
    Array.from(document.querySelectorAll('#myModalContent section .inner > div')).forEach((el,i)=>{
        el.style.display = 'none';
        //el.removeAttribute('class');
        //el.classList.add('modal-content');//default
    });


    if(param == 'top'){
        header_h4_text.innerHTML = 'Меню';
        modal.style.paddingTop = '0px';
        modalContent.classList.add('modalContentTop');
        bl_modalTop.style.display = 'block';
    }
    else if(param == 'center'){
        modal.style.paddingTop = '25vh';
        modalContent.classList.add('modalContentCenter');
        bl_modalCenter.style.display = 'block';
    }
    else if(param == 'bottom'){
        modal.style.paddingTop = '50vh';
        modalContent.classList.add('modalContentBottom');
        bl_modalBottom.style.display = 'block';
    }
    else if(param == 'full'){
        header_h4_text.innerHTML = 'Выбор модуля Библии из Избранных';
        modal.style.paddingTop = '0vh';
        modalContent.classList.add('modalContentFull');
        bl_modalFull.style.display = 'block';
        selectModule2(htmlTrans);
    }
    else if(param == 'tabsList'){//Vkladki
        header_h4_text.innerHTML = 'Выбор Вкладки';
        modal.style.paddingTop = '0vh';
        modalContent.classList.add('modalContentFull');
        bl_modalFull.style.display = 'block';
        selectTab();
    }
    else{
        console.log('---es else---');
    }
}

// When the user clicks on <span> (x), close the modal
function closeModal() {
    modal.style.opacity = 0;//start efecto fade
    setTimeout(()=>{
        modal.style.display = "none";
    },400);
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    // console.log('window.onclick on modal');
    if(event.target == modal || event.target == modalContent){
        closeModal();
    }
}


modal.addEventListener('click', function(e){
    //console.log('modal. div 2 exterior');
    closeModal();
});

modalContent_header.addEventListener('click', function(e){
    //console.log('-- modalContent_header. div 1 interior');
    e.stopPropagation();
});
modalContent_section.addEventListener('click', function(e){
    //console.log('-- modalContent_section. div 1 interior');
    e.stopPropagation();
});
modalContent_footer.addEventListener('click', function(e){
    //console.log('-- modalContent_footer. div 1 interior');
    e.stopPropagation();
});






















