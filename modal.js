const eid_myModal = document.getElementById('myModal');
const eid_myModalContent = document.getElementById('myModalContent');

const eid_modcont_header = document.getElementById('modcont_header');
const eid_modcont_body = document.getElementById('modcont_body');
const eid_modcont_footer = document.getElementById('modcont_footer');

const eid_bl_modalTop = document.getElementById('bl_modalTop');
const eid_bl_modalCenter = document.getElementById('bl_modalCenter');
const eid_bl_modalBottom = document.getElementById('bl_modalBottom');
const eid_bl_modalFull = document.getElementById('bl_modalFull');

const eid_btn_sp_atras = document.getElementById('btn_sp_atras');
const eid_h4_text = document.getElementById('h4_text');//text en el header de modcont_header




function openModal(param = null, headerTitle = null, htmlTrans = null, action = null){
  console.log('===function openModal()===');
  console.log(`param: ${param} --- headerTitle: ${headerTitle}`);    

    eid_myModal.style.display = "block";
    eid_myModal.style.opacity = 0;//start efecto fade
    setTimeout(()=>{
        eid_myModal.style.opacity = 1;//end efecto fade
    },10);

    //reset
    eid_myModalContent.removeAttribute('class');
    eid_myModalContent.classList.add('modal-content');
 
    Array.from(document.querySelectorAll('.body_bls')).forEach((el,i)=>{
        el.style.display = 'none';
        //el.removeAttribute('class');
        //el.classList.add('modal-content');//default
    });

    //
    //Tipos de ModalContent
    switch (param) {

        //Меню
        case 'top':
            eid_h4_text.innerHTML = headerTitle;//'Меню';
            eid_btn_sp_atras.style.display = 'none'; //mo muestro flecha atras
            eid_myModal.style.paddingTop = '0px';
            eid_myModalContent.classList.add('modalContentTop');
            eid_bl_modalTop.style.display = 'block';
            break;

        //pendiente de desarrollo
        case 'center':
            eid_btn_sp_atras.style.display = 'none';//?
            eid_myModal.style.paddingTop = '25vh';
            eid_myModalContent.classList.add('modalContentCenter');
            eid_bl_modalCenter.style.display = 'block';
            break;

        //pendiente de desarrollo
        case 'bottom':
            eid_btn_sp_atras.style.display = 'none';//?
            eid_myModal.style.paddingTop = '50vh';
            eid_myModalContent.classList.add('modalContentBottom');
            eid_bl_modalBottom.style.display = 'block';
            break;

        //Выбор модуля Библии из Избранных
        case 'full':
            eid_h4_text.innerHTML = headerTitle;//'Избранныe модули Библии';
            eid_btn_sp_atras.style.display = 'block';
            eid_myModal.style.paddingTop = '0vh';
            eid_myModalContent.classList.add('modalContentFull');
            eid_bl_modalFull.style.display = 'block';
            
            switch (action) {
                case 'showModules':
                    selectModule2(htmlTrans);
                    break;
            
                case 'showHistoryNav':
                    console.log('aki llamar showHistoryNav()');
                    showHistoryNav();
                    break;
            
                case 'showHistoryFind':
                    console.log('aki llamar showHistoryFind()');
                    showHistoryFind();
                    break;
            
                case 'showHistoryStrong':
                    console.log('aki llamar showHistoryStrong()');
                    showHistoryStrong();
                    break;
            
                default:
                    console.log('indica action en openModal()');
                    break;
            }
            break;

        //Vkladki
        case 'tabsList':
            eid_h4_text.innerHTML = headerTitle;//'Вкладки';
            eid_btn_sp_atras.style.display = 'block';
            eid_myModal.style.paddingTop = '0vh';
            eid_myModalContent.classList.add('modalContentFull');
            eid_bl_modalFull.style.display = 'block';
            selectTab();
            break;

        default:
            console.log('---case default: nada---');
            break;
    }
}

function showHistoryNav(){
    eid_bl_modalFullInner.innerHTML = '';

    arr_hist_nav.forEach((el,i)=>{
               
        const p = document.createElement('p');       
        p.onclick = () => {
            onclick_p_nav(el);
            closeModal();
            showTab(eid_btn_nav,'nav');
        }
        p.innerHTML = `<span class="sp_trans_hist">${el.BibleShortName} <span class="sp_fecha_hist">${el.fecha}</span></span>`;
        p.innerHTML += `<span class="sp_ref_hist">${el.ref} <span class="sp_hora_hist">${el.hora}</span></span>`;
        eid_bl_modalFullInner.append(p);

    });
}

function showHistoryFind(){
    eid_bl_modalFullInner.innerHTML = '';

    arr_hist_find.forEach((el,i)=>{
        const p = document.createElement('p');
        p.onclick = () => {
            onclick_p_find(el);
            closeModal();
            showTab(eid_btn_find,'find');
        }
        p.innerHTML = ` <span class="sp_trans_hist">${el.BibleShortName} 
                            <span class="wr_fecha_hora">
                                <span class="sp_hora_hist">${el.hora}</span>
                                <span class="sp_fecha_hist">${el.fecha}</span>
                            </span>
                        </span>`;
        p.innerHTML += `<span class="sp_ref_hist">${el.words}</span>`;
        eid_bl_modalFullInner.append(p);
    });

}

function showHistoryStrong(){
    eid_bl_modalFullInner.innerHTML = '';

    arr_hist_strong.forEach((el,i)=>{
        const p = document.createElement('p');
        p.onclick = () => {
            onclick_p_strong(el);
            closeModal();
            showTab(eid_btn_strong,'strong');           
        }
        p.innerHTML = `<span class="sp_trans_hist">${el.strongLang} <span class="sp_fecha_hist">${el.fecha}</span></span>`;
        p.innerHTML += `<span class="sp_ref_hist">${el.strongIndex} <span class="sp_hora_hist">${el.hora}</span></span>`;
        eid_bl_modalFullInner.append(p);
    });

}


// When the user clicks on <span> (x), close the eid_myModal
function closeModal() {
    eid_myModal.style.opacity = 0;//start efecto fade
    setTimeout(()=>{
        eid_myModal.style.display = "none";
    },400);
}

// When the user clicks anywhere outside of the eid_myModal, close it
window.onclick = function(event) {
    // console.log('window.onclick on eid_myModal');
    if(event.target == eid_myModal || event.target == eid_myModalContent){
        closeModal();
    }
}


eid_myModal.addEventListener('click', function(e){
    //console.log('eid_myModal. div 2 exterior');
    closeModal();
});

eid_modcont_header.addEventListener('click', function(e){
    //console.log('-- eid_modcont_header. div 1 interior');
    e.stopPropagation();
});
eid_modcont_body.addEventListener('click', function(e){
    //console.log('-- eid_modcont_body. div 1 interior');
    e.stopPropagation();
});
eid_modcont_footer.addEventListener('click', function(e){
    //console.log('-- eid_modcont_footer. div 1 interior');
    e.stopPropagation();
});






















