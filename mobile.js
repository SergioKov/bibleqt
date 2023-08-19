window.addEventListener('load',function(d){
    //console.log('load - window.innerWidth: '+window.innerWidth);
    mySizeWindow();
    //mySizeVerse();
});

window.addEventListener('resize',function(d){
    //console.log('resize - window.innerWidth: '+window.innerWidth);
    mySizeWindow();
    //mySizeVerse();
});  

document.querySelector("#myNav").addEventListener('click', function(e){
  console.log('div 2 exterior');
  closeNav();
});

document.querySelector("#myNavInner").addEventListener('click', function(e){
  console.log('-- div 1 interior');
  e.stopPropagation();
});



function openNav() {
  document.getElementById("myNav").style.left = "0%";

  document.querySelector("#fondo").style.display = 'block';
  setTimeout(()=>{
  document.querySelector("#fondo").style.background = '#00000090';//gris
  },5);

}

function closeNav() {
  document.getElementById("myNav").style.left = "-100%";

  document.querySelector("#fondo").style.background = '#00000000';//gris
  setTimeout(()=>{
    document.querySelector("#fondo").style.display = 'none';
  },300);
}



function mySizeWindow() {
    console.log('mySizeWindow');

    let header = document.querySelector('header');
    let secction = document.querySelector('section');
    let footer = document.querySelector('footer');

    let nav_header = document.querySelector('#nav_header');
    let nav_body = document.querySelector('#nav_body');

    let section_h =
    window.innerHeight //917
    - header.offsetHeight //107
    - footer.offsetHeight //40
    ;//=770

    let nav_body_h =
    window.innerHeight //917
    - nav_header.offsetHeight //50
    ;//=867


    secction.style.height = section_h + 'px';
    nav_body.style.height = nav_body_h + 'px';
}
