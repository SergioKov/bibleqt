// Get the modal
var modal = document.querySelector("#myModal");
var modalContent = document.querySelector("#myModalContent");
var modalContent_header = document.querySelector("#myModalContent header");
var modalContent_section = document.querySelector("#myModalContent section");
var modalContent_footer = document.querySelector("#myModalContent footer");
var bl_modalTop = document.querySelector("#bl_modalTop");
var bl_modalBottom = document.querySelector("#bl_modalBottom");
var bl_modalCenter = document.querySelector("#bl_modalCenter");
var bl_modalFull = document.querySelector("#bl_modalFull");

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
    header_h4_text.innerHTML = 'Навигация. Переводы';
    // modal.style.paddingTop = headerContainer.offsetHeight + 'px';
    modal.style.paddingTop = '0px';
    modalContent.classList.add('modalContentTop');
    bl_modalTop.style.display = 'block';
  }else if(param == 'center'){
    modal.style.paddingTop = '25vh';
    modalContent.classList.add('modalContentCenter');
    bl_modalCenter.style.display = 'block';
  }else if(param == 'bottom'){
    modal.style.paddingTop = '50vh';
    modalContent.classList.add('modalContentBottom');
    bl_modalBottom.style.display = 'block';
  }else if(param == 'full'){
    header_h4_text.innerHTML = 'Выбор модуля Библии';
    modal.style.paddingTop = '0vh';
    modalContent.classList.add('modalContentFull');
    bl_modalFull.style.display = 'block';
    //selectModule(htmlTrans);//antes
    selectModule2(htmlTrans);//new
  }else{
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
  if (event.target == modal || event.target == modalContent) {
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