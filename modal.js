// Get the modal
var modal = document.querySelector("#myModal");
var modalContent = document.querySelector("#myModalContent");
var bl_modalTop = document.querySelector("#bl_modalTop");
var bl_modalBottom = document.querySelector("#bl_modalBottom");
var bl_modalFull = document.querySelector("#bl_modalFull");

// Get the button that opens the modal
//var btn = document.getElementById("myBtn");

// When the user clicks the button, open the modal 
//btn.onclick = openModal;

function openModal(param = null) {
  modal.style.display = "block";
  modal.style.opacity = 0;//start efecto fade
  setTimeout(()=>{
    modal.style.opacity = 1;//end efecto fade
  },10);

  if(param == 'modalTop'){
    modal.style.paddingTop = headerContainer.offsetHeight + 'px';
    modalContent.classList.add('modalContentTop');
    bl_modalTop.style.display = 'block';
  }else{

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
    console.log('window.onclick on modal');
  if (event.target == modal || event.target == modalContent) {
    closeModal();
  }
}