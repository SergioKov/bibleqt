// Get the modal
var modal = document.getElementById("myModal");
var modalContent = document.getElementById("myModalContent");

// Get the button that opens the modal
//var btn = document.getElementById("myBtn");

// When the user clicks the button, open the modal 
//btn.onclick = openModal;

function openModal() {
  modal.style.display = "block";
  modal.style.opacity = 0;//start efecto fade
  setTimeout(()=>{
    modal.style.opacity = 1;//end efecto fade
  },10);
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