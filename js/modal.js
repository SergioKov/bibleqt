function openModal(param = null, headerTitle = null, htmlTrans = null, action = null, modalFadeIn = true){
    //console.log('=== function openModal() ===');
    //console.log(`param: ${param} --- headerTitle: ${headerTitle}`); 
    
    //Reset
    eid_myModalContent.removeAttribute('class');
    eid_myModalContent.classList.add('modal-content');
    eid_modcont_body.removeAttribute('class');//reset
    

    if(modalFadeIn){
        eid_myModal.style.display = "block";
        eid_myModal.style.opacity = 0;//start efecto fade
        setTimeout(()=>{
            eid_myModal.style.opacity = 1;//end efecto fade
        },10);
    }else{
        eid_myModal.style.display = "block";
        eid_myModal.style.opacity = 1;//start efecto fade
    }
 
    Array.from(document.querySelectorAll('.body_bls')).forEach((el,i)=>{
        el.style.display = 'none';
        //el.removeAttribute('class');
        //el.classList.add('modal-content');//default
    });


    //Tipos de ModalContent
    switch (param) {

        //Меню
        case 'top':
            eid_modcont_body.style.overflow = 'auto';//habilita scroll  
            eid_modcont_body.classList.add('theme_grey');   
            //eid_h4_text.innerHTML = headerTitle;//'Меню';
            eid_btn_sp_atras.style.display = 'none'; //mo muestro flecha atras
            eid_myModal.style.paddingTop = '0px';
            eid_myModalContent.classList.add('modalContentTop');
            eid_bl_modalTop.style.display = 'block';

            let eid_topLogin = document.getElementById('topLogin');
            let eid_topMenu = document.getElementById('topMenu');

            switch (action) {
            
                case 'showLogin':
                    eid_modcont_body.style.overflow = 'auto';//habilita scroll
                    eid_modcont_body.classList.add('theme_grey');  
                    eid_h4_text.innerHTML = headerTitle;//'Меню'; 
                    //console.log('aki llamar showMenu()');

                    eid_topLogin.style.display = 'block';
                    eid_topMenu.style.display = 'none';

                    //showLogin(htmlTrans, param);
                    break;

                case 'showMenu':
                    eid_modcont_body.style.overflow = 'auto';//habilita scroll
                    eid_modcont_body.classList.add('theme_grey');  
                    eid_h4_text.innerHTML = headerTitle;//'Меню'; 
                    //console.log('aki llamar showMenu()');

                    eid_topLogin.style.display = 'none';
                    eid_topMenu.style.display = 'block';
                    
                    //showMenu(htmlTrans, param);//es arr_p_id en este caso
                    break;
            
            
                default:
                    //console.log('indica action en openModal()');
                    break;
            }
            break;

        //pendiente de desarrollo
        case 'center':
            eid_h4_text.innerHTML = headerTitle;//'verse Меню';
            eid_btn_sp_atras.style.display = 'none';//?
            eid_myModal.style.paddingTop = '25vh';
            eid_myModalContent.classList.add('modalContentCenter');
            eid_bl_modalCenter.style.display = 'block';
            switch (action) {
            
                case 'buildVerseMenu':
                    eid_modcont_body.style.overflow = 'auto';//habilita scroll
                    eid_modcont_body.classList.add('theme_grey');   
                    //console.log('aki llamar buildVerseMenu()');
                    buildVerseMenu(htmlTrans, param);//es arr_p_id en este caso
                    break;

                case 'showAviso':
                    eid_modcont_body.style.overflow = 'auto';//habilita scroll
                    eid_modcont_body.classList.add('theme_grey');   
                    //console.log('aki llamar showAviso()');
                    //alert('aki showAviso()');
                    showAviso(htmlTrans, param);//es arr_p_id en este caso
                    break;
            
            
                default:
                    //console.log('indica action en openModal()');
                    break;
            }
            break;

        //pendiente de desarrollo
        case 'bottom':
            eid_h4_text.innerHTML = headerTitle;//'verse Меню';
            eid_btn_sp_atras.style.display = 'none';//?
            eid_myModal.style.paddingTop = '50vh';
            eid_myModalContent.classList.add('modalContentBottom');
            eid_bl_modalBottom.style.display = 'block';
            switch (action) {
            
                case 'buildVerseMenu':
                    eid_modcont_body.style.overflow = 'auto';//habilita scroll
                    eid_modcont_body.classList.add('theme_grey');   
                    //console.log('aki llamar buildVerseMenu()');
                    buildVerseMenu(htmlTrans, param);//es arr_p_id en este caso
                    break;
            
            
                default:
                    //console.log('indica action en openModal()');
                    break;
            }
            break;

        //Выбор модуля Библии из Избранных
        case 'full':
            eid_btn_sp_atras.style.display = 'block';
            eid_myModal.style.paddingTop = '0vh';
            eid_myModalContent.classList.add('modalContentFull');
            eid_bl_modalFull.style.display = 'block';
            
            switch (action) {
                
                case 'showModules':
                    eid_h4_text.innerHTML = headerTitle;//'Избранныe модули Библии';    
                    eid_modcont_body.style.overflow = 'auto';//habilita scroll 
                    eid_modcont_body.classList.add('theme_grey');   
                    selectModule2(htmlTrans);
                    break;
            
                case 'showHistoryNav':
                    eid_h4_text.innerHTML = headerTitle;//'Избранныe модули Библии';    
                    eid_modcont_body.style.overflow = 'auto';//habilita scroll
                    eid_modcont_body.classList.add('theme_grey');   
                    //console.log('aki llamar showHistoryNav()');
                    showHistoryNav();
                    break;
            
                case 'showHistoryFind':
                    eid_h4_text.innerHTML = headerTitle;//'Избранныe модули Библии';    
                    eid_modcont_body.style.overflow = 'auto';//habilita scroll
                    eid_modcont_body.classList.add('theme_grey');   
                    //console.log('aki llamar showHistoryFind()');
                    showHistoryFind();
                    break;
            
                case 'showHistoryStrong':
                    eid_h4_text.innerHTML = headerTitle;//'Избранныe модули Библии';    
                    eid_modcont_body.style.overflow = 'auto';//habilita scroll 
                    eid_modcont_body.classList.add('theme_grey');   
                    //console.log('aki llamar showHistoryStrong()');
                    showHistoryStrong();
                    break;

                case 'showMarkers':
                    eid_h4_text.innerHTML = `${headerTitle} <span id="m_markers_porcentaje" class="f_r"></span>`;//'Избранныe модули Библии';    
                    eid_modcont_body.style.overflow = 'auto';//habilita scroll
                    eid_modcont_body.classList.add('theme_grey');   
                    //console.log('aki llamar showMarkers()');
                    showMarkers();
                    break;    

                case 'compareVerse':
                    eid_h4_text.innerHTML = headerTitle;//'Избранныe модули Библии';    
                    eid_modcont_body.style.overflow = 'hidden';//desabilita scroll de head 
                    eid_modcont_body.classList.add('theme_white');  
                    eid_btn_sp_atras.style.display = 'none';
                    //console.log('aki llamar buildVersesToCompare()');
                    buildVersesToCompare(htmlTrans);//aki htmlTrans = arr_p_id = ['rstStrongRed',0,1,1]
                    break;
            
                default:
                    //console.log('indica action en openModal()');
                    break;
            }
            break;

        //Vkladki
        case 'tabsList':
            eid_modcont_body.style.overflow = 'auto';//habilita scroll 
            eid_modcont_body.classList.add('theme_grey');   
            eid_h4_text.innerHTML = headerTitle;//'Вкладки';
            eid_btn_sp_atras.style.display = 'block';
            eid_myModal.style.paddingTop = '0vh';
            eid_myModalContent.classList.add('modalContentFull');
            eid_bl_modalFull.style.display = 'block';
            selectTab();
            break;

        default:
            //console.log('---case default: nada---');
            break;
    }
}




function showMenu(htmlTrans){
    //console.log('=== showMenu(htmlTrans) ===');

    eid_bl_modalTopInner.innerHTML = '';

    //<div class="dbtn" title="Remove Bible Translation" onclick="removeTrans()">
    //    <div>Tr -</div>
    //</div>
    const dbtn_tr_rem = document.createElement('div');
    dbtn_tr_rem.id = 'tr_rem';
    dbtn_tr_rem.className = 'dbtn';
    dbtn_tr_rem.title = 'Remove Bible Translation';
    dbtn_tr_rem.dataset.fn = "removeTrans()";
    dbtn_tr_rem.innerHTML = '<div>Tr -</div>';
    dbtn_tr_rem.onclick = ()=>{
        removeTrans();
    };

    //<div class="dbtn" title="Add Bible Translation" onclick="addTrans('askForTrans')">
    //        <div>Tr +</div>
    //</div>
    const dbtn_tr_add = document.createElement('div');
    dbtn_tr_add.id = 'tr_add';
    dbtn_tr_add.className = 'dbtn';
    dbtn_tr_add.title = 'Add Bible Translation';
    dbtn_tr_add.dataset.fn = "addTrans('askForTrans')";
    dbtn_tr_add.innerHTML = '<div>Tr +</div>';
    dbtn_tr_add.onclick = ()=>{
        addTrans('askForTrans')
    };



    //<div class="dbtn" title="Quitar Pestaña" onclick="removeTab()">
    //    <div>Vk -</div>
    //</div>
    const dbtn_vk_rem = document.createElement('div');
    dbtn_vk_rem.id = 'vk_rem';
    dbtn_vk_rem.className = 'dbtn';
    dbtn_vk_rem.title = 'Quitar Pestaña';
    dbtn_vk_rem.dataset.fn = "removeTab()";
    dbtn_vk_rem.innerHTML = '<div>Vk -</div>';
    dbtn_vk_rem.onclick = ()=>{
        removeTab();
    };

    //<div class="dbtn" title="Añadir Pestaña" onclick="addTab(null,null,null,'tab_new')">
    //    <div>Vk +</div>
    //</div>
    const dbtn_vk_add = document.createElement('div');
    dbtn_vk_add.id = 'vk_add';
    dbtn_vk_add.className = 'dbtn';
    dbtn_vk_add.title = 'Añadir Pestaña';
    dbtn_vk_add.dataset.fn = "addTab(null,null,null,'tab_new')";
    dbtn_vk_add.innerHTML = '<div>Vk +</div>';
    dbtn_vk_add.onclick = ()=>{
        addTab(null,null,null,'tab_new');
    };



    //<div class="dbtn" title="Previous book" onclick="bookGo('prev')">
    //    <img src="images/arrow_backward_white.svg">
    //</div>
    const dbtn_bg_prev = document.createElement('div');
    dbtn_bg_prev.id = 'bg_prev';
    dbtn_bg_prev.className = 'dbtn';
    dbtn_bg_prev.title = 'Previous book';
    dbtn_bg_prev.dataset.fn = "bookGo('prev')";
    dbtn_bg_prev.innerHTML = '<img src="images/arrow_backward_white.svg">';
    dbtn_bg_prev.onclick = ()=>{
        bookGo('prev');
    };

    //<div class="dbtn" title="Next book"onclick="bookGo('next')">
    //    <img src="images/arrow_forward_white.svg">
    //</div>   
    const dbtn_bg_next = document.createElement('div');
    dbtn_bg_next.id = 'bg_next';
    dbtn_bg_next.className = 'dbtn';
    dbtn_bg_next.title = 'Next book';
    dbtn_bg_next.dataset.fn = "bookGo('next')";
    dbtn_bg_next.innerHTML = '<img src="images/arrow_backward_white.svg">';
    dbtn_bg_next.onclick = ()=>{
        bookGo('next');
    };



    //<div class="dbtn" title="Previous chapter" onclick="chapterGo('prev')">
    //    <img src="images/arrow_chevron_left_white.svg">                            
    //</div>
    const dbtn_chg_prev = document.createElement('div');
    dbtn_chg_prev.id = 'bg_prev';
    dbtn_chg_prev.className = 'dbtn';
    dbtn_chg_prev.title = 'Previous chapter';
    dbtn_chg_prev.dataset.fn = "chapterGo('prev')";
    dbtn_chg_prev.innerHTML = '<img src="images/arrow_chevron_left_white.svg">';
    dbtn_chg_prev.onclick = ()=>{
        chapterGo('prev');
    };

    //<div class="dbtn" title="Next chapter" onclick="chapterGo('next')">
    //    <img src="images/arrow_chevron_right_white.svg">
    //</div>
    const dbtn_chg_next = document.createElement('div');
    dbtn_chg_next.id = 'bg_next';
    dbtn_chg_next.className = 'dbtn';
    dbtn_chg_next.title = 'Next chapter';
    dbtn_chg_next.dataset.fn = "chapterGo('next')";
    dbtn_chg_next.innerHTML = '<img src="images/arrow_chevron_right_white.svg">';
    dbtn_chg_next.onclick = ()=>{
        chapterGo('next');
    };



    //<div class="dbtn" title="History previous register" onclick="hist('prev')">
    //    <div>< H</div>
    //</div>
    const dbtn_h_prev = document.createElement('div');
    dbtn_h_prev.id = 'h_prev';
    dbtn_h_prev.className = 'dbtn';
    dbtn_h_prev.title = 'History previous register';
    dbtn_h_prev.dataset.fn = "hist('prev')";
    dbtn_h_prev.innerHTML = '<div>< H</div>';
    dbtn_h_prev.onclick = ()=>{
        hist('prev');
    };
    
    //<div class="dbtn" title="History next register" onclick="hist('next')">
    //    <div>H ></div>
    //</div>
    const dbtn_h_next = document.createElement('div');
    dbtn_h_next.id = 'h_next';
    dbtn_h_next.className = 'dbtn';
    dbtn_h_next.title = 'History next register';
    dbtn_h_next.dataset.fn = "hist('next')";
    dbtn_h_next.innerHTML = '<div>H ></div>';
    dbtn_h_next.onclick = ()=>{
        hist('next');
    };



    //<div id="btn_changePositionShowModal" class="dbtn" title="Change position: Columns or Rows" onclick="changePositionShow()">
    //    <div>Row</div>
    //</div>
    const dbtn_ch_pos = document.createElement('div');
    dbtn_ch_pos.id = 'btn_changePositionShowModal';
    dbtn_ch_pos.className = 'dbtn';
    dbtn_ch_pos.title = 'Change position: Columns or Rows';
    dbtn_ch_pos.dataset.fn = "changePositionShow()";
    dbtn_ch_pos.innerHTML = '<div>Row</div>';
    dbtn_ch_pos.onclick = (ev)=>{
        changePositionShow();
    };    
    
    //<div id="m_btnStrong" class="dbtn" title="Show / Hide Strong Numbers" onclick="showHideStrongNumbers()">
    //    <div>S#</div>
    //</div>
    const dbtn_s_num = document.createElement('div');
    dbtn_s_num.id = 'm_btnStrong';
    dbtn_s_num.className = 'dbtn';
    dbtn_s_num.title = 'Show / Hide Strong Numbers';
    dbtn_s_num.dataset.fn = "showHideStrongNumbers()";
    dbtn_s_num.innerHTML = '<div>S#</div>';
    dbtn_s_num.onclick = ()=>{
        showHideStrongNumbers();
    };



    //<div class="dbtn" title="Избранныe модули Библии" onclick="openModal('full','Избранныe модули Библии',document.querySelector('#trans1.colsHead'),'showModules')" style="width:50%;">
    //    <div>Модули</div>
    //</div>
    const dbtn_moduli = document.createElement('div');
    dbtn_moduli.id = 'm_moduli';
    dbtn_moduli.className = 'dbtn';
    dbtn_moduli.title = 'Избранныe модули Библии';
    dbtn_moduli.style = 'width:50%;';
    dbtn_moduli.dataset.fn = "openModal('full','Избранныe модули Библии',document.querySelector('#trans1.colsHead'),'showModules')";
    dbtn_moduli.innerHTML = '<div>Модули</div>';
    dbtn_moduli.onclick = ()=>{
        openModal('full','Избранныe модули Библии',eid_trans1,'showModules');
    };

    //<div class="dbtn" title="Вкладки" onclick="showTabs()" style="width:50%;">
    //    <div>Вкладки</div>
    //</div>
    const dbtn_vkladki = document.createElement('div');
    dbtn_vkladki.id = 'm_vkladki';
    dbtn_vkladki.className = 'dbtn';
    dbtn_vkladki.title = 'Вкладки';
    dbtn_vkladki.style = 'width:50%;';
    dbtn_vkladki.dataset.fn = "showTabs()";
    dbtn_vkladki.innerHTML = '<div>Вкладки</div>';
    dbtn_vkladki.onclick = ()=>{
        showTabs();
    };



    //<div id="m_btnByText" class="dbtn" onclick="changeModo('by_text')" style="width:50%;">
    //    <div>by_text</div>
    //</div>
    const dbtn_by_text = document.createElement('div');
    dbtn_by_text.id = 'm_btnByText';
    dbtn_by_text.className = 'dbtn';
    dbtn_by_text.title = 'modo de cargar modules';
    dbtn_by_text.style = 'width:50%;';
    dbtn_by_text.dataset.fn = "changeModo('by_text')";
    dbtn_by_text.innerHTML = '<div>by_text</div>';
    dbtn_by_text.onclick = ()=>{
        changeModo('by_text');
    };

    //<div id="m_btnByJson" class="dbtn" onclick="changeModo('by_json')" style="width:50%;">
    //    <div>by_json</div>
    //</div>
    const dbtn_by_json = document.createElement('div');
    dbtn_by_json.id = 'm_btnByJson';
    dbtn_by_json.className = 'dbtn';
    dbtn_by_json.title = 'modo de cargar modules';
    dbtn_by_json.style = 'width:50%;';
    dbtn_by_json.dataset.fn = "changeModo('by_json')";
    dbtn_by_json.innerHTML = '<div>by_json</div>';
    dbtn_by_json.onclick = ()=>{
        changeModo('by_json');
    };



    //<div id="m_btn_loadAllFavBibleFiles" class="dbtn" onclick="loadAllFavBibleFiles()" style="width:33.33%;">
    //    <div>Modules</div>
    //</div>
    const dbtn_load_bib = document.createElement('div');
    dbtn_load_bib.id = 'm_btn_loadAllFavBibleFiles';
    dbtn_load_bib.className = 'dbtn';
    dbtn_load_bib.title = 'cargar a memoria ram';
    dbtn_load_bib.style = 'width:33.33%;';
    dbtn_load_bib.dataset.fn = "loadAllFavBibleFiles()";
    dbtn_load_bib.innerHTML = '<div>Modules</div>';
    dbtn_load_bib.onclick = ()=>{
        loadAllFavBibleFiles();
    };

    //<div id="m_btn_loadAllFavTskFiles" class="dbtn" onclick="loadAllFavTskFiles()" style="width:33.33%;">
    //    <div>TSK</div>
    //</div>
    const dbtn_load_tsk = document.createElement('div');
    dbtn_load_tsk.id = 'm_btn_loadAllFavTskFiles';
    dbtn_load_tsk.className = 'dbtn';
    dbtn_load_tsk.title = 'cargar a memoria ram';
    dbtn_load_tsk.style = 'width:33.33%;';
    dbtn_load_tsk.dataset.fn = "loadAllFavTskFiles()";
    dbtn_load_tsk.innerHTML = '<div>TSK</div>';
    dbtn_load_tsk.onclick = ()=>{
        loadAllFavTskFiles();
    };

    //<div id="m_btn_loadAllFavStrongFiles" class="dbtn" onclick="loadAllFavStrongFiles()" style="width:33.33%;">
    //    <div>Strong</div>
    //</div>
    const dbtn_load_strong = document.createElement('div');
    dbtn_load_strong.id = 'm_btn_loadAllFavStrongFiles';
    dbtn_load_strong.className = 'dbtn';
    dbtn_load_strong.title = 'cargar a memoria ram';
    dbtn_load_strong.style = 'width:33.33%;';
    dbtn_load_strong.dataset.fn = "loadAllFavStrongFiles()";
    dbtn_load_strong.innerHTML = '<div>Strong</div>';
    dbtn_load_strong.onclick = ()=>{
        loadAllFavStrongFiles();
    };



    //<div class="dbtn" title="История навигации" onclick="openModal('full','История навигации',null,'showHistoryNav')" style="width:33.33%;">
    //    <div class="dbtn_inner">
    //        <img src="./images/history_icon_white.svg">
    //        <span>Nav.</span>
    //    </div>
    //</div>
    const dbtn_h_nav = document.createElement('div');
    dbtn_h_nav.id = 'm_h_nav';
    dbtn_h_nav.className = 'dbtn';
    dbtn_h_nav.title = 'История навигации';
    dbtn_h_nav.style = 'width:33.33%;';
    dbtn_h_nav.dataset.fn = "openModal('full','История навигации',null,'showHistoryNav')";
    dbtn_h_nav.innerHTML = `
    <div class="dbtn_inner">
        <img src="./images/history_icon_white.svg">
        <span>Nav.</span>
    </div>
    `;
    dbtn_h_nav.onclick = ()=>{
        openModal('full','История навигации',null,'showHistoryNav');
    };

    //<div class="dbtn" title="История поиска" onclick="openModal('full','История поиска',null,'showHistoryFind')" style="width:33.33%;">
    //    <div class="dbtn_inner">
    //        <img src="./images/history_icon_white.svg">    
    //        <span>Find</span>
    //    </div>
    //</div>
    const dbtn_h_find = document.createElement('div');
    dbtn_h_find.id = 'm_h_find';
    dbtn_h_find.className = 'dbtn';
    dbtn_h_find.title = 'История поиска';
    dbtn_h_find.style = 'width:33.33%;';
    dbtn_h_find.dataset.fn = "openModal('full','История поиска',null,'showHistoryFind')";
    dbtn_h_find.innerHTML = `
    <div class="dbtn_inner">
        <img src="./images/history_icon_white.svg">
        <span>Find</span>
    </div>
    `;
    dbtn_h_find.onclick = ()=>{
        openModal('full','История поиска',null,'showHistoryFind');
    };

    //<div class="dbtn" title="История номеров Стронга" onclick="openModal('full','История номеров Стронга',null,'showHistoryStrong')" style="width:33.33%;">
    //    <div class="dbtn_inner">
    //        <img src="./images/history_icon_white.svg">    
    //        <span>Strong</span>
    //    </div>
    //</div>
    const dbtn_h_strong = document.createElement('div');
    dbtn_h_strong.id = 'm_h_strong';
    dbtn_h_strong.className = 'dbtn';
    dbtn_h_strong.title = 'История номеров Стронга';
    dbtn_h_strong.style = 'width:33.33%;';
    dbtn_h_strong.dataset.fn = "openModal('full','История номеров Стронга',null,'showHistoryStrong')";
    dbtn_h_strong.innerHTML = `
    <div class="dbtn_inner">
        <img src="./images/history_icon_white.svg">
        <span>Strong</span>
    </div>
    `;
    dbtn_h_strong.onclick = ()=>{
        openModal('full','История номеров Стронга',null,'showHistoryStrong');
    };


    eid_bl_modalTopInner.append(dbtn_tr_rem);
    eid_bl_modalTopInner.append(dbtn_tr_add);    
    eid_bl_modalTopInner.append(dbtn_vk_rem);
    eid_bl_modalTopInner.append(dbtn_vk_add);

    eid_bl_modalTopInner.append(dbtn_bg_prev);
    eid_bl_modalTopInner.append(dbtn_bg_next);
    eid_bl_modalTopInner.append(dbtn_chg_prev);
    eid_bl_modalTopInner.append(dbtn_chg_next);

    eid_bl_modalTopInner.append(dbtn_h_prev);
    eid_bl_modalTopInner.append(dbtn_h_next);
    eid_bl_modalTopInner.append(dbtn_ch_pos);
    eid_bl_modalTopInner.append(dbtn_s_num);
    
    eid_bl_modalTopInner.append(dbtn_moduli);
    eid_bl_modalTopInner.append(dbtn_vkladki);

    eid_bl_modalTopInner.append(dbtn_by_text);
    eid_bl_modalTopInner.append(dbtn_by_json);

    eid_bl_modalTopInner.append(dbtn_load_bib);
    eid_bl_modalTopInner.append(dbtn_load_tsk);
    eid_bl_modalTopInner.append(dbtn_load_strong);

    eid_bl_modalTopInner.append(dbtn_h_nav);
    eid_bl_modalTopInner.append(dbtn_h_find);
    eid_bl_modalTopInner.append(dbtn_h_strong);


    //const htmlMenu = document.createElement('div');
    const htmlMenu = `
        
        <div class="dbtn" title="Remove Bible Translation" onclick="removeTrans()">
            <div>Tr -</div>
        </div>
        <div class="dbtn" title="Add Bible Translation" onclick="addTrans('askForTrans')">
            <div>Tr +</div>
        </div>

        
        <div class="dbtn" title="Quitar Pestaña" onclick="removeTab()">
            <div>Vk -</div>
        </div>
        <div class="dbtn" title="Añadir Pestaña" onclick="addTab(null,null,null,'tab_new')">
            <div>Vk +</div>
        </div>


        <div class="dbtn" title="Previous book" onclick="bookGo('prev')">
            <img src="images/arrow_backward_white.svg">
        </div>
        <div class="dbtn" title="Next book"onclick="bookGo('next')">
            <img src="images/arrow_forward_white.svg">
        </div>


        <div class="dbtn" title="Previous chapter" onclick="chapterGo('prev')">
            <img src="images/arrow_chevron_left_white.svg">                            
        </div>
        <div class="dbtn" title="Next chapter" onclick="chapterGo('next')">
            <img src="images/arrow_chevron_right_white.svg">
        </div>


        <div class="dbtn" title="History previous register" onclick="hist('prev')">
            <div>< H</div>
        </div>
        <div class="dbtn" title="History next register" onclick="hist('next')">
            <div>H ></div>
        </div>                        


        <div id="btn_changePositionShowModal" class="dbtn" title="Change position: Columns or Rows" onclick="changePositionShow()">
            <div>Row</div>
        </div>
        <div id="m_btnStrong" class="dbtn" title="Show / Hide Strong Numbers" onclick="showHideStrongNumbers()">
            <div>S#</div>
        </div>


        <div class="dbtn" title="Избранныe модули Библии" onclick="openModal('full','Избранныe модули Библии',document.querySelector('#trans1.colsHead'),'showModules')" style="width:50%;">
            <div>Модули</div>
        </div>
        <div class="dbtn" title="Вкладки" onclick="showTabs()" style="width:50%;">
            <div>Вкладки</div>
        </div>


        <div id="m_btnByText" class="dbtn" onclick="changeModo('by_text')" style="width:50%;">
            <div>by_text</div>
        </div>
        <div id="m_btnByJson" class="dbtn" onclick="changeModo('by_json')" style="width:50%;">
            <div>by_json</div>
        </div>


        <div id="m_btn_loadAllFavBibleFiles" class="dbtn" onclick="loadAllFavBibleFiles()" style="width:33.33%;">
            <div>Modules</div>
        </div>
        <div id="m_btn_loadAllFavTskFiles" class="dbtn" onclick="loadAllFavTskFiles()" style="width:33.33%;">
            <div>TSK</div>
        </div>
        <div id="m_btn_loadAllFavStrongFiles" class="dbtn" onclick="loadAllFavStrongFiles()" style="width:33.33%;">
            <div>Strong</div>
        </div>


        <div class="dbtn" title="История навигации" onclick="openModal('full','История навигации',null,'showHistoryNav')" style="width:33.33%;">
            <div class="dbtn_inner">
                <img src="./images/history_icon_white.svg">    
                <span>Nav.</span>
            </div>
        </div>
        <div class="dbtn" title="История поиска" onclick="openModal('full','История поиска',null,'showHistoryFind')" style="width:33.33%;">
            <div class="dbtn_inner">
                <img src="./images/history_icon_white.svg">    
                <span>Find</span>
            </div>
        </div>
        <div class="dbtn" title="История номеров Стронга" onclick="openModal('full','История номеров Стронга',null,'showHistoryStrong')" style="width:33.33%;">
            <div class="dbtn_inner">
                <img src="./images/history_icon_white.svg">    
                <span>Strong</span>
            </div>
        </div>
    `;
    //eid_bl_modalTopInner.innerHTML = htmlMenu;

}







function showAviso(htmlTrans, positionModal){
    //console.log('=== showAviso(htmlTrans, param) ===');

    if(positionModal == 'center'){
        eid_bl_modalCenterInner.innerHTML = '';
    }else if(positionModal == 'bottom'){
        eid_bl_modalBottomInner.innerHTML = '';
    }
    
    const p = document.createElement('p');
    p.className = 'p_aviso';
    p.innerHTML = htmlTrans;

    if(positionModal == 'center'){
        eid_bl_modalCenterInner.append(p);
    
    }else if(positionModal == 'bottom'){
        eid_bl_modalBottomInner.append(p);
    }

}

function buildVerseMenu(arr_p_id,positionModal){//['rstStrongRed', '42', '1', '3']
    //console.log('=== function buildVerseMenu(arr_p_id) ===');

    
    if(positionModal == 'center'){
        eid_bl_modalCenterInner.innerHTML = '';
    }else if(positionModal == 'bottom'){
        eid_bl_modalBottomInner.innerHTML = '';
    }

    let enable_otro_div = false;//por defecto
    
    //Copiar texto de verso
    const btn1 = document.createElement('div');
    btn1.id = 'btn_copiar';
    btn1.className = 'dbtn';
    btn1.title = 'Копировать текст стиха';
    btn1.innerHTML = '<img src="./images/copy_icon_white.svg">';
    btn1.onclick = ()=>{
        
        enable_otro_div = true;
        let btn_copiar_delay = 500;

        const wr_sel_copy = document.createElement('div');
        wr_sel_copy.id = 'wr_sel_copy';
        wr_sel_copy.className = 'dbtn';
        //wr_sel_copy.innerHTML = `
        //    <p>Selecciona el versículo hasta donde copiar:
        //        <select class="zzz">
        //            <option value="1">1</option>
        //            <option value="2">2</option>
        //            <option value="3">3</option>
        //        </select>
        //    </p>
        //`;
        

        const btn_only_one_verse = document.createElement('button');
        btn_only_one_verse.className = 'btn btn_only_one_verse'; 
        btn_only_one_verse.innerHTML = '<span>Solo un versículo</span>'; 
        btn_only_one_verse.onclick = (event, idelement) =>{
            window.focus(); // Opción para intentar dar foco a la ventana
            let idElement = arr_p_id.join('__');
            copyTextFromIdElement(idElement);

            btn1.innerHTML = '<img src="./images/icon_ok_white.svg">';
            wr_sel_copy.innerHTML = '<span>¡Texto copiado!</span>';
            setTimeout(()=>{
                closeModal(null,true);
            },btn_copiar_delay);
        };
        

        
        const d_sel_bl = document.createElement('div');
        d_sel_bl.className = 'd_sel_bl';


        //saco verses posteriores para formar un select
        let verse_base_id = `${arr_p_id[0]}__${arr_p_id[1]}__${arr_p_id[2]}`;//"rstStrongRed__42__1__"
        let versesAll = document.querySelectorAll(`[id^="${verse_base_id}"]`);
        let verse_start = parseInt(arr_p_id[3]);
        let verse_last = parseInt(versesAll.length);


        const btn_many_verses = document.createElement('button');
        btn_many_verses.className = 'btn btn_many_verses'; 
        btn_many_verses.innerHTML = '<span>Copiar hasta el versículo:</span>'; 
        btn_many_verses.onclick = (event) =>{

            let verse_end = parseInt(d_sel_bl.querySelector('.sel_copy').value);
            console.log(`copiar verses: (${verse_start} - ${verse_end})`);
            
            let arr_text_ref = document.querySelector('#h4_text').innerText.split(':');
            let ref_all = `${arr_text_ref[0]}:${verse_start}-${verse_end}`;
            document.querySelector('#h4_text').textContent = ref_all;

            let idElement = arr_p_id.join('__');
            copyTextFromIdElement(idElement, verse_base_id, verse_start, verse_end);           
            
            btn1.innerHTML = '<img src="./images/icon_ok_white.svg">';
            wr_sel_copy.innerHTML = `<span>¡Texto copiado!</span>`;
            setTimeout(()=>{
                closeModal(null,true);
            },btn_copiar_delay);            
        }

       

        const sel_copy = document.createElement('select');
        sel_copy.className = 'sel_copy';        

        for (let i = (verse_start + 1); i <= verse_last; i++) {
            const opt = document.createElement('option');
            opt.value = i;
            opt.textContent = i;
            sel_copy.append(opt);            
        }

        sel_copy.onchange = (event)=>{
            console.log(event);
            window.focus(); // Opción para intentar dar foco a la ventana

            let verse_end = parseInt(event.currentTarget.value);
            console.log(`copiar verses: (${verse_start + 1} - ${verse_end})`);
            
            let arr_text_ref = document.querySelector('#h4_text').innerText.split(':');
            let ref_all = `${arr_text_ref[0]}:${verse_start}-${verse_end}`;
            document.querySelector('#h4_text').textContent = ref_all;

            let idElement = arr_p_id.join('__');
            copyTextFromIdElement(idElement, verse_base_id, verse_start, verse_end);           
            
            btn1.innerHTML = '<img src="./images/icon_ok_white.svg">';
            wr_sel_copy.innerHTML = `<span>¡Texto copiado!</span>`;
            setTimeout(()=>{
                closeModal(null,true);
            },btn_copiar_delay);

        };

        d_sel_bl.append(btn_many_verses);
        d_sel_bl.append(sel_copy);

        wr_sel_copy.append(btn_only_one_verse); 
        wr_sel_copy.append(d_sel_bl);

        if(enable_otro_div){            
            if(eid_bl_modalCenterInner.querySelector('#wr_sel_copy') == null){
                eid_bl_modalCenterInner.append(wr_sel_copy);                
            }
        }
        
        /*
        //console.log('llamo func para copiar');
        //console.log(arr_p_id);
        let idElement = arr_p_id.join('__');
        copyTextFromIdElement(idElement);
        btn1.innerHTML = '<img src="./images/icon_ok_white.svg">';
        setTimeout(()=>{
            closeModal(null,true);
        },500);
        */
    }

    //Marker
    const btn2 = document.createElement('div');
    btn2.id = 'btn_marker';
    btn2.className = 'dbtn';
    btn2.title = 'Добавить стих в Закладки';
    btn2.innerHTML = '<img src="./images/marker_icon_white.svg">';
    btn2.onclick = ()=>{
        //console.log('llamo func para añadir marker-закладку');
        //console.log(arr_p_id);
        let trans = arr_p_id[0];
        let book = arr_p_id[1];
        let chapter = arr_p_id[2];
        let verse = arr_p_id[3];
        let id_p = arr_p_id.join('__');
        let ref = document.getElementById(id_p).querySelector('a').innerText;
        let a_verseText = document.getElementById(id_p).cloneNode(true); // Clonar el nodo para preservar su estructura
        a_verseText.querySelectorAll('a')[0].remove(); // Eliminar 1-r el elemento <a> del clon
        
        //si hay yooltips, los quito del texto
        let wr_tooltip_all = a_verseText.querySelectorAll('.wr_tooltip');
        if(wr_tooltip_all != null){
            wr_tooltip_all.forEach(el=>{
                el.remove();
            });
        }
        
        a_verseText = removeTagsOfElement(a_verseText,'S');//Strong Numbers
        let verseText = a_verseText.textContent.trim(); // Obtener el texto limpio del clon

        addRefToMarker(trans, ref, book, chapter, verse, null, verseText);
        btn2.innerHTML = '<img src="./images/icon_ok_white.svg">';
        setTimeout(()=>{
            closeModal(null,true);
        },500);
    }

    //comparar verses
    const btn3 = document.createElement('div');
    btn3.id = 'btn_comparar';
    btn3.className = 'dbtn';
    btn3.title = 'Сравнить стих в разных переводах';
    btn3.innerHTML = '<img src="./images/compare_icon_white.svg">';
    btn3.onclick = ()=>{
        //console.log('llamo func para comparar');
        //console.log(arr_p_id);
        eid_bl_modalFullInner.innerHTML = '<div id="wr_vc">cargando...</div>';//reset
        openModal('full', 'Сравнение переводов', arr_p_id, 'compareVerse');
    }
    
    //Compartir enlace
    const btn4 = document.createElement('div');
    btn4.id = 'btn_compartir';
    btn4.className = 'dbtn';
    btn4.title = 'Поделиться ссылкой на стих';
    btn4.innerHTML = '<img src="./images/share_icon_white.svg">';
    btn4.onclick = ()=>{
        //console.log('llamo func para compartir');
        //console.log(arr_p_id);
        alert('funccion en desarrollo...')
    }

    if(positionModal == 'center'){
        eid_bl_modalCenterInner.append(btn1);
        eid_bl_modalCenterInner.append(btn2);
        eid_bl_modalCenterInner.append(btn3);
        eid_bl_modalCenterInner.append(btn4);
    
    }else if(positionModal == 'bottom'){
        eid_bl_modalBottomInner.append(btn1);
        eid_bl_modalBottomInner.append(btn2);
        eid_bl_modalBottomInner.append(btn3);
        eid_bl_modalBottomInner.append(btn4);    
    }

    //eid_bl_modalBottomInner.append(btn1);
    //eid_bl_modalBottomInner.append(btn2);
    //eid_bl_modalBottomInner.append(btn3);
    //eid_bl_modalBottomInner.append(btn4);
    
}


function copyTextFromIdElement(idElement, verse_base_id = null, verse_start = null, verse_end = null) {//"rstStrongRed__22__66__2"
    //console.log('=== function copyTextFromIdElement() ===');
    let copy_with_trans = true;

    if(verse_base_id == null && verse_start == null && verse_end == null){//1 verse
        
        //console.log('es un verse');

        let textoAll = document.getElementById(idElement).innerText;
        let textoRef = document.getElementById(idElement).querySelectorAll('a')[0].innerText;
        let textoACopiar = textoAll.replace(textoRef, '').trim();
        //console.log(textoACopiar.length);
        if(copy_with_trans){
            let arr = idElement.split('__');
            let trans = arr[0];
            let book = arr[1];
            let chapter = arr[2];
            let verse = arr[3];
            let this_trans_obj = arrFavTransObj.find(v => v.Translation === trans);
            let BibleShortName = this_trans_obj.BibleShortName;
            let BookShortName = this_trans_obj.Books[book].ShortNames[0];
            let ref = `${BookShortName} ${chapter}:${verse}`;
            textoACopiar = `${ref} ${textoACopiar} \n(${BibleShortName})`;
        }

        if(textoACopiar.length > 1 && textoACopiar != "" || true) {          
            copyTextToClibboard(textoACopiar);
            //console.log(`textoACopiar: \n${textoACopiar}`);
        }

    }else{//many verses
        
        console.log('son muchos verses');
        
        let textoACopiarAll = '';
        let arr = idElement.split('__');
        let trans = arr[0];
        let book = arr[1];
        let chapter = arr[2];
        let verse = arr[3];

        let this_trans_obj = arrFavTransObj.find(v => v.Translation === trans);
        let BibleShortName = this_trans_obj.BibleShortName;
        let BookShortName = this_trans_obj.Books[book].ShortNames[0];
        let ref = `(${BookShortName} ${chapter}:${verse_start}-${verse_end} | ${BibleShortName})`;//(Иоан. 1:15-23 | RST+r)
        textoACopiarAll += ref + '\n';

        for (let i = verse_start; i <= verse_end; i++) {
            let id_element = `${verse_base_id}__${i}`;
            const element = document.getElementById(id_element);

            let textoAll = element.innerText;
            let textoRef = element.querySelectorAll('a')[0].innerText;
            let textoACopiar = textoAll.replace(textoRef, '').trim();
            //console.log(textoACopiar.length);
            
            if(copy_with_trans){
                textoACopiar = `${i}. ${textoACopiar}`;
                textoACopiarAll += textoACopiar + '\n';
            }
            
            if(i == verse_end){
                //textoACopiarAll += `(${BibleShortName})`;//(RST+r)
                if(textoACopiarAll.length > 1 && textoACopiarAll != "" || true) {       
                    fn_await();
                    async function fn_await(){                
                        const res = await copyTextToClibboard(textoACopiarAll);                        
                        //if(res){
                        //    console.log(`textoACopiarAll: \n${textoACopiarAll}`);
                        //}else{
                        //    console.log('el texto no se copió');
                        //}
                    }
                }
            }
        }
    }    
}



async function copyTextToClibboard(text) {  
    navigator.clipboard.writeText(text)
        .then((text2) => {
            //console.log('Texto copiado al portapapeles: ', text);
            //console.log(`text2 copiado: \n${text2}`);
        })
        .catch(error => {
            console.error('Error al copiar al portapapeles: ', error);
        });
}











function buildVersesToCompare(arr_p_id){//arr_p_id = ['rstStrongRed',0,1,1]
    //console.log('=== function buildVersesToCompare(arr_p_id) ===');

    //creo array de p's de un verse de todas las trans favoritas
    arr_verses_compare = [];//reset
    let iter_a = 0;//start

    let btnStrongIsActive = false;
    if(eid_btnStrong.classList.contains('btn_active')){
        btnStrongIsActive = true;
    }

    makeArrVersesToCompare(iter_a, arr_p_id);

    function makeArrVersesToCompare(iter_a, arr_p_id){//arr_p_id = ['rstStrongRed', 0, 2, 5]
        
        let base_ep = eid_trans1.dataset.base_ep;

        let trans_ref = arr_p_id[0];//'rstStrongRed'
        let book = arr_p_id[1];
        let chapter = arr_p_id[2];
        let verse = arr_p_id[3];

        let bookNumber = book;
        let chapterNumber = chapter;
        let verseNumber = verse;

        if(iter_a < arrFavTransObj.length){
            //console.log(`iter_a: ${iter_a}`);

            el_trans = arrFavTransObj[iter_a];
            //console.log(`abajo el_trans:`);
            //console.log(el_trans);

            //si existe traduccion, el libro de trans y book del libro
            if(typeof el_trans.Translation != 'undefined' && typeof el_trans.Books[bookNumber] != 'undefined'){
                //url del libro necesario
                let url = `../modules/text/${el_trans.Translation}/${el_trans.Books[bookNumber].PathName}`;//ej.: nrt_01.htm'; 
                //console.log('--- url: ', url);

                if(url.includes('no_disponible.htm')){
                    //console.log('url includes no_disponible.htm');
    
                    iter_a++;
                    //console.log(`aumentado iter_a: ${iter_a}`);
                    arr_verses_compare.push('');//item vacio. luego lo quito

                    if(iter_a == arrFavTransObj.length){
                        //console.log('1. final  --- llamo buildVersesFromArr()');
                        arr_verses_compare = arr_verses_compare.filter(elem => elem);//quito items vacios
    
                        buildVersesFromArr(arr_p_id, arr_verses_compare);
                    }   
    
                    makeArrVersesToCompare(iter_a, arr_p_id);//si iter_a es ultimo elemento de arrFavTransObj, no entrará aquí 
                    return false;
                }

            }else{
                //console.log(`bookNumber '${bookNumber}' no existe en este trans '${el_trans.Translation}'.`);

                iter_a++;
                //console.log(`aumentado iter_a: ${iter_a}`);
                arr_verses_compare.push('');//item vacio. luego lo quito

                if(iter_a == arrFavTransObj.length){
                    //console.log('2. final  --- llamo buildVersesFromArr()');
                    arr_verses_compare = arr_verses_compare.filter(elem => elem);//quito items vacios

                    buildVersesFromArr(arr_p_id, arr_verses_compare);
                }

                makeArrVersesToCompare(iter_a, arr_p_id);//si iter_a es ultimo elemento de arrFavTransObj, no entrará aquí
                return false;
            }

            arr_verses_compare.push({});
            arr_verses_compare[iter_a]['Translation'] = el_trans.Translation;
            arr_verses_compare[iter_a]['Lang'] = el_trans.Lang;
            arr_verses_compare[iter_a]['BibleName'] = el_trans.BibleName;
            arr_verses_compare[iter_a]['BibleShortName'] = el_trans.BibleShortName;
            arr_verses_compare[iter_a]['BibleBookShortName'] = el_trans.Books[book].ShortNames[0];
            arr_verses_compare[iter_a]['EnglishPsalms'] = el_trans.EnglishPsalms;
            arr_verses_compare[iter_a]['BookQty'] = el_trans.BookQty;
            arr_verses_compare[iter_a]['StrongNumbers'] = el_trans.StrongNumbers;
            arr_verses_compare[iter_a]['Notes'] = el_trans.Notes;

            let trans_obj_ref = arrFavTransObj.find(v => v.Translation === trans_ref);

            if(trans_obj_ref.EnglishPsalms == 'N' && el_trans.EnglishPsalms == 'Y'){//Пс 22 | Sal 23
                let res = convertLinkFromRusToEsp(book, chapter, verse);
                bookNumber = res[0];
                chapterNumber = res[1];
                verseNumber = res[2];
                //console.log(`modifico chapter y verse de rus a esp`);        
            }
            else if(trans_obj_ref.EnglishPsalms == 'Y' && el_trans.EnglishPsalms == 'N'){//Sal 23 | Пс 22
                let res = convertLinkFromEspToRus(book, chapter, verse);
                bookNumber = res[0];
                chapterNumber = res[1];
                verseNumber = res[2];
                //console.log(`modifico chapter y verse de esp a rus`);
            }
            else{
                //console.log('--- 335 chapter y verse no se modifican. se pasan tal cual.');
            }

            arr_verses_compare[iter_a].book = bookNumber;
            arr_verses_compare[iter_a].chapter = chapterNumber;
            arr_verses_compare[iter_a].verse = verseNumber;

            book = bookNumber;
            chapter = chapterNumber;
            verse = verseNumber;

            if(modo_fetch_verses_compare == 'by_text'){
                //console.log(`modo_fetch_verses_compare == 'by_text'`);

                //saco ajustes de este modulo en json               
                let bq = el_trans;
                //console.log(' abajo bq:');
                //console.log(bq);

                let Translation = el_trans.Translation;//solo aqui

                //si no existe objeto lo creo
                if(typeof obj_bible_files[Translation] == 'undefined'){
                    obj_bible_files[Translation] = {};
                    obj_bible_files[Translation].Books = [];
                }


                //si existe objeto con Translation. Saco datos del objeto
                if(typeof obj_bible_files[Translation] != 'undefined'){
                    if(typeof obj_bible_files[Translation].Books != 'undefined'){
                        if(typeof obj_bible_files[Translation].Books[book] != 'undefined'){

                            if( obj_bible_files[Translation].Books[book].fileName == bq.Books[book].PathName && 
                                obj_bible_files[Translation].Books[book].fileContent != '' && 
                                obj_bible_files[Translation].Books[book].fileContent != ' '
                            ){
                                //console.log(`--- --- starting from myPromise --- iter_a: ${iter_a}  --- Translation: ${Translation} `);
                                
                                // Registra el tiempo de inicio
                                const tiempoInicio = new Date().getTime();
                                //console.log('obj_bible_files --- tiempoInicio: '+tiempoInicio);

                                let myPromise_vc = new Promise(function(resolve, reject){
                                    resolve('ok');
                                });

                                myPromise_vc
                                .then((data) => {//data = ok
                                    
                                    //console.log(data);

                                    let bookModule;
                                    if(data == 'ok'){//siempre ok
                                        bookModule = obj_bible_files[Translation].Books[book].fileContent;
                                    }            
                                                
                                    let nb = bookModule.split('<h4>');//делю файл на главы
                                    //console.log(nb);
                                    
                                    nb = nb.filter(elem => elem);//удаляю пустые елементы массива
                                    //console.log(nb);
            
                                    //si existe el capitulo// siempre existe
                                    if(typeof nb[chapter] !== 'undefined'){
            
                                        let nb_chapter_verses = nb[chapter].split('<p>');
                                        //console.log(nb_chapter_verses);  
                                        
                                        let este_p = nb_chapter_verses[verse];
                                        let VerseText = '(текст стиха отсутствует...)';//si es vacio... //antes
                                        
                                        if(typeof este_p != 'undefined'){
                                            let p_Text = ' ';

                                            if(este_p.includes('</p>')){
                                                let arr_p_text = este_p.split('</p>');
                                                p_Text = arr_p_text[0];
                                            }else{
                                                p_Text = este_p;
                                            }
                                            //console.log('p_Text: '+p_Text); 
                        
                                            let arr_p = p_Text.split(' ');
                                            let VerseId = arr_p[0];
                                            //console.log('VerseId: '+VerseId);
                        
                                            arr_p.shift(0);//elimino index 0
                                            VerseText = arr_p.join(' '); 
                                        }                                       

                                        arr_verses_compare[iter_a].ChapterQty = bq.Books[book].ChapterQty;
                                        arr_verses_compare[iter_a].VerseQty = nb_chapter_verses.length - 1;
                                                          
                    
                                        //========================================================//
                                        //start - modificado
                                        //========================================================//
                    
                                        //Номера Стронга в стихах (RST+)
                                        if(bq.StrongNumbers == "Y"){
                                            let t = VerseText;
                                            let arr_t = (t.includes(' ')) ? t.split(' ') : alert('err 1');
                                            let arr_verse_words = [];                               
                                            arr_t.forEach((el,i) => {    
                                                //element of string is Strong Number
                                                if(!isNaN(parseInt(el)) || el == '0'){//number                         
                                                    let span_strong_tag_start,span_strong_tag_end;
                                                    if(btnStrongIsActive){
                                                        span_strong_tag_start = '<span class="strong show strongActive">'; 
                                                        span_strong_tag_end = '</span>'; 
                                                    }else{
                                                        span_strong_tag_start = '<span class="strong">';
                                                        span_strong_tag_end = '</span>'; 
                                                    }
                                                    let last_char = (el.length > 1) ? el.charAt(el.length-1) : "" ;
                                                    //si ultimo carácter es string
                                                    if(last_char != '' && isNaN(last_char)){
                                                        let el_number = el.substring(0,el.length-1);
                                                        let el_string = last_char;
                                                        arr_verse_words.push(span_strong_tag_start + el_number + span_strong_tag_end + el_string);
                                                    }else{//es number
                                                        arr_verse_words.push(span_strong_tag_start + el + span_strong_tag_end);
                                                    }
                                                }else{//is word
                                                    if(btnStrongIsActive){
                                                        if(el.includes('<S>')){
                                                            el = el.replace('<S>','<S class="show strongActive">');
                                                        }
                                                    }
                                                    arr_verse_words.push(el);
                                                }
                                            });
                                            //console.log('arr_verse_words: ');
                                            //console.log(arr_verse_words);
                                            let new_VerseText = arr_verse_words.join(' ');
                                            arr_verses_compare[iter_a].verseText = `<span class="vt">${new_VerseText}</span>`;
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

                                                    before_Note = (bq.HTMLFilter == 'Y') ? htmlEntities(before_Note) : before_Note ;

                                                    let p_id = `${Translation}__${book}__${chapter}__${verse}`;
                                                    let a_ref = `${el_trans.Books[book].ShortNames[0]} ${chapter}:${verse}`;

                                                    let wr_tooltip = buildWrTooltip(bq.NoteSign,text_Note,p_id,a_ref);                                                    
                                                    after_Note = (bq.HTMLFilter == 'Y') ? htmlEntities(after_Note) : after_Note ; 
                                                                                                        
                                                    /*
                                                    arr_verses_compare[iter_a].verseText = `
                                                    <span class="vt">
                                                        ${before_Note}
                                                        <span class="tooltip" data-tooltip="${text_Note}">
                                                            ${bq.NoteSign}
                                                        </span>
                                                        ${after_Note}
                                                    </span>
                                                    `;
                                                    */
                                                    arr_verses_compare[iter_a].verseText = `
                                                    <span class="vt">
                                                        ${before_Note}
                                                        ${wr_tooltip.outerHTML}
                                                        ${after_Note}
                                                    </span>
                                                    `;
                                                }
                                            }else{
                                                arr_verses_compare[iter_a].verseText = `<span class="vt">${VerseText}</span>`;
                                            }
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
                                                arr_verses_compare[iter_a].verseText = `${before_Title} <span class="verse_title">${text_Title}</span>${after_Title}`;
                                            }else{
                                                arr_verses_compare[iter_a].verseText = VerseText;
                                            }
                                        }
                    
                    
                                        //Нет ни Номеров Стронга, ни Примечаний ни Оглавлений
                                        if(bq.StrongNumbers == "N" && bq.Notes == 'N' && bq.Titles == 'N'){
                                            arr_verses_compare[iter_a].verseText = `<span class="vt">${VerseText}</span>`;
                                        }
                    
                                        //========================================================//
                                        //end - modificado
                                        //========================================================//
                                        
                            
                                        iter_a++;
                                        //console.log(`aumentado iter_a: ${iter_a}`);
                    
                                        if(iter_a < arrFavTransObj.length){
                                            //console.log(' llamo makeArrVersesToCompare()');
                                            makeArrVersesToCompare(iter_a, arr_p_id);
                                        }
                    
                                        if(iter_a == arrFavTransObj.length){
                                            //console.log(' final  --- llamo buildVersesFromArr()');
                                            arr_verses_compare = arr_verses_compare.filter(elem => elem);//quito items vacios
                    
                                            buildVersesFromArr(arr_p_id, arr_verses_compare);
                                        }                                         
            
                                    }else{
                                        //console.log(`1. no existe chapter ${chapter} del book ${book} --- el_trans.Translation: ${el_trans.Translation} --- nb[chapter]: ${nb[chapter]} `);
                                        let aviso_text = 'Текущий модуль Библии не содержит стихов для выбранной книги';
                                        //alert(aviso_text);

                                        arr_verses_compare[iter_a].ChapterQty = bq.Books[book].ChapterQty;
                                        arr_verses_compare[iter_a].VerseQty = 0;//ya que no existe chapter
                                        arr_verses_compare[iter_a].verseText = `<span class="prim_error_verse_compare">${aviso_text}</span>`;

                                        iter_a++;
                                        //console.log(`aumentado iter_a: ${iter_a}`);
                    
                                        if(iter_a < arrFavTransObj.length){
                                            //console.log(' llamo makeArrVersesToCompare()');
                                            makeArrVersesToCompare(iter_a, arr_p_id);
                                        }
                    
                                        if(iter_a == arrFavTransObj.length){
                                            //console.log(' final  --- llamo buildVersesFromArr()');
                                            arr_verses_compare = arr_verses_compare.filter(elem => elem);//quito items vacios
                    
                                            buildVersesFromArr(arr_p_id, arr_verses_compare);
                                        }
                                    }
                                })
                                .catch(error => {
                                    // Manejar cualquier error que pueda ocurrir durante la solicitud o el procesamiento de la respuesta
                                    console.error('2. error promesa en myPromise con obj_bible_files. error: '+error);
                                });

                            }else{
                                //console.log('No coincide el nombre del fichero o fileContent está vacío');
                            }

                        }else{
                            //console.log('no esxiste obj_bible_files book');
                        }
                    }
                }//end - if(typeof obj_bible_files[Translation] != 'undefined')
                

                //si no existe objeto con Translation. hago fetch()
                if(typeof obj_bible_files[Translation].Books[book] == 'undefined'){
                    //console.log('--- vc --- no existe objeto con Translation. hago fetch()');

                    //start de tiempo para calcular cuanto tarda
                    const tiempoInicioFetch = new Date().getTime();
                    //console.log('fetch() --- tiempoInicioFetch: '+tiempoInicioFetch);

                    //url del libro necesario
                    url = `./modules/text/${Translation}/${bq.Books[book].PathName}`;//nrt_01.htm'; 

                    fetch(url)
                    .then((response) => response.text())
                    .then((bookModule) => {

                        if(crear_objeto_obj_bible_files){
                            obj_bible_files[Translation].Books[book] = {
                                'fileName': bq.Books[book].PathName, 
                                'fileContent': bookModule
                            };
                            //console.log('abajo obj_bible_files:');
                            //console.log(obj_bible_files);
                        }
                       

                        let nb = bookModule.split('<h4>');//делю файл на главы
                        //console.log(nb);
                        
                        nb = nb.filter(elem => elem);//удаляю пустые елементы массива
                        //console.log(nb);

                        //si existe el capitulo// siempre existe
                        if(typeof nb[chapter] !== 'undefined'){

                            let nb_chapter_verses = nb[chapter].split('<p>');
                            //console.log(nb_chapter_verses);                            

                            let este_p = nb_chapter_verses[verse];
                            let VerseText = '(текст стиха отсутствует...)';//si es vacio...
                            
                            if(typeof este_p != 'undefined'){
                                let p_Text = ' ';

                                if(este_p.includes('</p>')){
                                    let arr_p_text = este_p.split('</p>');
                                    p_Text = arr_p_text[0];
                                }else{
                                    p_Text = este_p;
                                }
                                //console.log('p_Text: '+p_Text); 
            
                                let arr_p = p_Text.split(' ');
                                let VerseId = arr_p[0];
                                //console.log('VerseId: '+VerseId);
            
                                arr_p.shift(0);//elimino index 0
                                VerseText = arr_p.join(' '); 
                            }                                       

                            arr_verses_compare[iter_a].ChapterQty = bq.Books[book].ChapterQty;
                            arr_verses_compare[iter_a].VerseQty = nb_chapter_verses.length - 1;
                                                
        
                            //========================================================//
                            //start - modificado
                            //========================================================//
        
                            //Номера Стронга в стихах (RST+)
                            if(bq.StrongNumbers == "Y"){
                                let t = VerseText;
                                let arr_t = (t.includes(' ')) ? t.split(' ') : alert('err 1');
                                let arr_verse_words = [];                               
                                arr_t.forEach((el,i) => {    
                                    //element of string is Strong Number
                                    if(!isNaN(parseInt(el)) || el == '0'){//number                         
                                        let span_strong_tag_start,span_strong_tag_end;
                                        if(btnStrongIsActive){
                                            span_strong_tag_start = '<span class="strong show strongActive">'; 
                                            span_strong_tag_end = '</span>'; 
                                        }else{
                                            span_strong_tag_start = '<span class="strong">';
                                            span_strong_tag_end = '</span>'; 
                                        }
                                        let last_char = (el.length > 1) ? el.charAt(el.length-1) : "" ;
                                        //si ultimo carácter es string
                                        if(last_char != '' && isNaN(last_char)){
                                            let el_number = el.substring(0,el.length-1);
                                            let el_string = last_char;
                                            arr_verse_words.push(span_strong_tag_start + el_number + span_strong_tag_end + el_string);
                                        }else{//es number
                                            arr_verse_words.push(span_strong_tag_start + el + span_strong_tag_end);
                                        }
                                    }else{//is word
                                        if(btnStrongIsActive){
                                            if(el.includes('<S>')){
                                                el = el.replace('<S>','<S class="show strongActive">');
                                            }
                                        }
                                        arr_verse_words.push(el);
                                    }
                                });
                                //console.log('arr_verse_words: ');
                                //console.log(arr_verse_words);
                                let new_VerseText = arr_verse_words.join(' ');
                                arr_verses_compare[iter_a].verseText = `<span class="vt">${new_VerseText}</span>`;
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
                                        before_Note = (bq.HTMLFilter == 'Y') ? htmlEntities(before_Note) : before_Note ;
                                        after_Note = (bq.HTMLFilter == 'Y') ? htmlEntities(after_Note) : after_Note ;
                                        arr_verses_compare[iter_a].verseText = `<span class="vt">${before_Note}<span class="tooltip" data-tooltip="${text_Note}">${bq.NoteSign}</span>${after_Note}</span>`;
                                    }
                                }else{
                                    arr_verses_compare[iter_a].verseText = `<span class="vt">${VerseText}</span>`;
                                }
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
                                    arr_verses_compare[iter_a].verseText = `${before_Title} <span class="verse_title">${text_Title}</span>${after_Title}`;
                                }else{
                                    arr_verses_compare[iter_a].verseText = VerseText;
                                }
                            }
        
        
                            //Нет ни Номеров Стронга, ни Примечаний ни Оглавлений
                            if(bq.StrongNumbers == "N" && bq.Notes == 'N' && bq.Titles == 'N'){
                                arr_verses_compare[iter_a].verseText = `<span class="vt">${VerseText}</span>`;
                            }
        
                            //========================================================//
                            //end - modificado
                            //========================================================//
                            
                
                            iter_a++;
                            //console.log(`aumentado iter_a: ${iter_a}`);
        
                            if(iter_a < arrFavTransObj.length){
                                //console.log(' llamo makeArrVersesToCompare()');
                                makeArrVersesToCompare(iter_a, arr_p_id);
                            }
        
                            if(iter_a == arrFavTransObj.length){
                                //console.log(' final  --- llamo buildVersesFromArr()');
                                arr_verses_compare = arr_verses_compare.filter(elem => elem);//quito items vacios
        
                                buildVersesFromArr(arr_p_id, arr_verses_compare);
                            }

                        }else{
                            //console.log(`2. no existe chapter ${chapter} del book ${book} --- el_trans.Translation: ${el_trans.Translation} --- nb[chapter]: ${nb[chapter]} `);
                            let aviso_text = 'Текущий модуль Библии не содержит стихов для выбранной книги';
                            //alert(aviso_text);

                            arr_verses_compare[iter_a].ChapterQty = bq.Books[book].ChapterQty;
                            arr_verses_compare[iter_a].VerseQty = 0;//ya que no existe chapter
                            arr_verses_compare[iter_a].verseText = `<span class="prim_error_verse_compare">${aviso_text}</span>`;

                            iter_a++;
                            //console.log(`aumentado iter_a: ${iter_a}`);
        
                            if(iter_a < arrFavTransObj.length){
                                //console.log(' llamo makeArrVersesToCompare()');
                                makeArrVersesToCompare(iter_a, arr_p_id);
                            }
        
                            if(iter_a == arrFavTransObj.length){
                                //console.log(' final  --- llamo buildVersesFromArr()');
                                arr_verses_compare = arr_verses_compare.filter(elem => elem);//quito items vacios
        
                                buildVersesFromArr(arr_p_id, arr_verses_compare);
                            }                            
                        }
                    })
                    .catch(error => { 
                        //Código a realizar cuando se rechaza la promesa
                        console.error('error promesa en fetch() con obj_bible_files. error: '+error);
                    });                    
                }//end - if(typeof obj_bible_files[Translation].Books[book] == 'undefined')

                //console.log('despues de fetch --- abajo obj_bible_files:');
                //console.log(obj_bible_files); 

            }//end - modo_fetch_verses_compare == 'by_text'







            if(modo_fetch_verses_compare == 'by_json'){
                //console.log(`modo_fetch_verses_compare == 'by_json'`);

                //Meto parametros para sacar datos por el fetch de solo un capitulo en vez de todo el fichero
                let formData = new FormData();
                // formData.append('url', url );//antes
                formData.append('url', './'+url);//importante './' delante de la url
                formData.append('base_ep', base_ep);
                formData.append('bq_EnglishPsalms', el_trans.EnglishPsalms);
                if(book != null) formData.append('book', bookNumber);
                formData.append('chapter', chapterNumber);
                //AKI si HACE FALTA VERSENUMBER y TO_VERSENUMBER!!!
                if(typeof verseNumber != 'undefined' && verseNumber != null) formData.append('verse', verseNumber);
                if(typeof col1_p_length != 'undefined' && col1_p_length != null) formData.append('col1_p_length', col1_p_length);
        
                fetch('./app/read_file_to_json.php',{
                    method: 'POST',
                    body: formData
                })
                .then((response) => response.json())
                .then((dataRead) => {
        
                    //console.log(dataRead);

                    arr_verses_compare[iter_a].ChapterQty = dataRead.chapterData.ChapterQty;
                    arr_verses_compare[iter_a].VerseQty = dataRead.chapterData.VerseQty;
                    
                    //console.log(`en then() --- el_trans.Translation: ${el_trans.Translation}`);
                    let bq = el_trans;


                    let arr = dataRead.chapterData.arr_p_verses[verseNumber].split(' ');
                    arr.shift(0);//elimino index 0
                    let VerseText = arr.join(' ');


                    //========================================================//
                    //start - modificado
                    //========================================================//

                    //Номера Стронга в стихах (RST+)
                    if(bq.StrongNumbers == "Y"){
                        let t = VerseText;
                        let arr_t = (t.includes(' ')) ? t.split(' ') : alert('err 1');
                        let arr_verse_words = [];                               
                        arr_t.forEach((el,i) => {    
                            //element of string is Strong Number
                            if(!isNaN(parseInt(el)) || el == '0'){//number                         
                                let span_strong_tag_start,span_strong_tag_end;
                                if(btnStrongIsActive){
                                    span_strong_tag_start = '<span class="strong show strongActive">'; 
                                    span_strong_tag_end = '</span>'; 
                                }else{
                                    span_strong_tag_start = '<span class="strong">';
                                    span_strong_tag_end = '</span>'; 
                                }
                                let last_char = (el.length > 1) ? el.charAt(el.length-1) : "" ;
                                //si ultimo carácter es string
                                if(last_char != '' && isNaN(last_char)){
                                    let el_number = el.substring(0,el.length-1);
                                    let el_string = last_char;
                                    arr_verse_words.push(span_strong_tag_start + el_number + span_strong_tag_end + el_string);
                                }else{//es number
                                    arr_verse_words.push(span_strong_tag_start + el + span_strong_tag_end);
                                }
                            }else{//is word
                                if(btnStrongIsActive){
                                    if(el.includes('<S>')){
                                        el = el.replace('<S>','<S class="show strongActive">');
                                    }
                                }
                                arr_verse_words.push(el);
                            }
                        });
                        //console.log('arr_verse_words: ');
                        //console.log(arr_verse_words);
                        let new_VerseText = arr_verse_words.join(' ');
                        arr_verses_compare[iter_a].verseText = `<span class="vt">${new_VerseText}</span>`;
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
                                before_Note = (bq.HTMLFilter == 'Y') ? htmlEntities(before_Note) : before_Note ;
                                after_Note = (bq.HTMLFilter == 'Y') ? htmlEntities(after_Note) : after_Note ;
                                arr_verses_compare[iter_a].verseText = `<span class="vt">${before_Note}<span class="tooltip" data-tooltip="${text_Note}">${bq.NoteSign}</span>${after_Note}</span>`;
                            }
                        }else{
                            arr_verses_compare[iter_a].verseText = `<span class="vt">${VerseText}</span>`;
                        }
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
                            arr_verses_compare[iter_a].verseText = `${before_Title} <span class="verse_title">${text_Title}</span>${after_Title}`;
                        }else{
                            arr_verses_compare[iter_a].verseText = VerseText;
                        }
                    }


                    //Нет ни Номеров Стронга, ни Примечаний ни Оглавлений
                    if(bq.StrongNumbers == "N" && bq.Notes == 'N' && bq.Titles == 'N'){
                        arr_verses_compare[iter_a].verseText = `<span class="vt">${VerseText}</span>`;
                    }

                    //========================================================//
                    //end - modificado
                    //========================================================//
                    
        
                    iter_a++;
                    //console.log(`aumentado iter_a: ${iter_a}`);

                    if(iter_a < arrFavTransObj.length){
                        //console.log(' llamo makeArrVersesToCompare()');
                        makeArrVersesToCompare(iter_a, arr_p_id);
                    }

                    if(iter_a == arrFavTransObj.length){
                        //console.log(' final  --- llamo buildVersesFromArr()');
                        arr_verses_compare = arr_verses_compare.filter(elem => elem);//quito items vacios

                        buildVersesFromArr(arr_p_id, arr_verses_compare);
                    }
        
                })
                .catch(error => {
                    console.error('Error fetch versesCompare. error: ', error);
                });

            }//end - modo_fetch_verses_compare == 'by_json'



        }


    }


}

function buildVersesFromArr(arr_p_id, arr_verses_compare){
    //console.log('=== buildVersesFromArr() ===');

    //console.log('arr_p_id: ', arr_p_id);
    //console.log('arr_verses_compare: ', arr_verses_compare);

    let trans_ref = arr_p_id[0];
    let book = arr_p_id[1];
    let chapter = arr_p_id[2];
    let verse = arr_p_id[3];
    
    eid_bl_modalFullInner.innerHTML = '';

    //creo array de lang de los que están en arr_verses_compare
    arr_verses_lang = [];//reset
    arr_verses_lang = arr_verses_compare.map(el => el.Lang);
    //quito valores duplicados
    arr_verses_lang = [... new Set(arr_verses_lang)];

    

    let objTransCompare = arr_verses_compare.find(v => v.Translation === trans_ref);

    let verseRef = `${objTransCompare.BibleBookShortName}${objTransCompare.chapter}:${objTransCompare.verse}`;

    let obj_to_send = {
        "verseRef":   verseRef,
        "BibleBookShortName":   objTransCompare.BibleBookShortName,
        "trans_ref":  trans_ref,
        "book":       Number(book),
        "chapter":    Number(chapter),
        "verse":      Number(verse),
        "BookQty":    Number(objTransCompare.BookQty),
        "ChapterQty": Number(objTransCompare.ChapterQty),
        "VerseQty":   Number(objTransCompare.VerseQty)
    };

    let obj_to_send_string = JSON.stringify(obj_to_send);







    //================================================================//
    //start - estructura html
    //================================================================//
    const div_wr_vc = document.createElement('div');
    div_wr_vc.id = 'wr_vc';

        const div_wr_vc_head = document.createElement('div');
        div_wr_vc_head.id = 'wr_vc_head';

            const div_vc_head = document.createElement('div');
            div_vc_head.id = 'vc_head';
            /*
            div_vc_head.innerHTML = ` 
                    <div id="btn_verseGoPrev" class="dbtn" title="Prev verse" onclick="verseGo('prev','${obj_to_send_string}')">
                        <img src="images/arrow_chevron_left_white.svg">
                    </div> 
                    
                    <div class="vc_head_ref">${verseRef}</div> 
                    
                    <div id="btn_verseGoNext" class="dbtn" title="Next verse" onclick="verseGo('next','${obj_to_send_string}')">
                        <img src="images/arrow_chevron_right_white.svg">
                    </div>
                `;
            div.append(div_vc_head);
            */


            const d_prev = document.createElement('div');
            d_prev.id = 'btn_verseGoPrev';
            d_prev.className = 'dbtn';
            d_prev.title = 'Prev verse';
            d_prev.onclick = () => {
                verseGo('prev',obj_to_send_string);
            };
            d_prev.innerHTML = `<img src="images/arrow_chevron_left_white.svg">`;

            const d_ref = document.createElement('div');
            d_ref.className = 'vc_head_ref';
            d_ref.innerHTML = verseRef;

            const d_next = document.createElement('div');
            d_next.id = 'btn_verseGoNext';
            d_next.className = 'dbtn';
            d_next.title = 'Next verse';
            d_next.onclick = () => {
                verseGo('next',obj_to_send_string);
            };
            d_next.innerHTML = `<img src="images/arrow_chevron_right_white.svg">`;



        //div FILTER
        const div_vc_head_filter = document.createElement('div');
        div_vc_head_filter.id = 'vc_head_filter'; 

    
        /*
        div_vc_head_filter.innerHTML = ` 
            <div id="title_filter" onclick="hideShowWrFilter()">Filtrar:</div>

            <div id="wr_filter" style="display:none;">
                <div id="wr_filter_inner">
                
                    
                    <div id="wr_one_lang">
                        <label id="lab_one_lang">
                            <span>
                                <input id="one_lang" type="checkbox" onchange="filterTransCompare(this,null)"> Solo un idioma
                            </span>
                        </label>
                        <button id="btn_show_refs" class="btn" onclick="hideShowRefsCompare(this)">Show Refs</button>
                    </div>


                    <div id="wr_btns_lang">
                    
                        <div id="btns_lang">
                            <button class="btn btn_active" data-lang="ru" onclick="filterTransCompare(this,'ru')">Rus</button>
                            <button class="btn btn_active" data-lang="ua" onclick="filterTransCompare(this,'ua')">Ukr</button>
                            <button class="btn btn_active" data-lang="es" onclick="filterTransCompare(this,'es')">Esp</button>
                        </div>
                    
                        <button id="btn_lang_all" class="btn btn_active" onclick="filterTransCompare(this,'all')">Todos</button>

                    </div>

                </div>
            </div>
        `;
        */


        //title_filter
        const div_title_filter = document.createElement('div');
        div_title_filter.id = 'title_filter';
        let cl_filter_img = (obj_ajustes.verseCompare.wr_filter.display == 'block') ? 'razv' : '' ;
        div_title_filter.innerHTML = `Фильтр: <img src="images/icon_razvernut.png" class="${cl_filter_img}">`;
        div_title_filter.onclick = () => {
            hideShowWrFilter();
        }

        //wr_filter
        const div_wr_filter = document.createElement('div');
        div_wr_filter.id = 'wr_filter';
        div_wr_filter.style.display = obj_ajustes.verseCompare.wr_filter.display;//por defecto es oculto
    
            //wr_filter_inner
            const div_wr_filter_inner = document.createElement('div');
            div_wr_filter_inner.id = 'wr_filter_inner';



            //fld_refs
            const fieldset_fld_refs = document.createElement('fieldset');
            fieldset_fld_refs.id = 'fld_refs';
            fieldset_fld_refs.innerHTML = '<legend class="leg">Ссылки</legend>';

                //wr_show_refs
                const div_wr_show_refs = document.createElement('div');
                div_wr_show_refs.id = 'wr_show_refs';

                    //btn_show_refs
                    const boton_btn_show_refs = document.createElement('button');
                    boton_btn_show_refs.id = 'btn_show_refs';
                    //boton_btn_show_refs.innerHTML = `<button id="btn_show_refs" class="btn" onclick="hideShowRefsCompare(this)">Show Refs</button>`;
                    boton_btn_show_refs.style.display = obj_ajustes.verseCompare.btn_show_refs.display;
                    boton_btn_show_refs.className = obj_ajustes.verseCompare.btn_show_refs.classText;
                    boton_btn_show_refs.textContent = 'Паказывать ссылки';
                    //hideShowRefsCompare();
                    boton_btn_show_refs.onclick = (e) => {
                        hideShowRefsCompare(e.target);
                        applyMaxWidthToClass('wr_b_trans_a_ref');
                    };



            //fld_lang
            const fieldset_fld_lang = document.createElement('fieldset');
            fieldset_fld_lang.id = 'fld_lang';
            fieldset_fld_lang.innerHTML = '<legend class="leg">Языки</legend>';

                //wr_one_lang
                const div_wr_one_lang = document.createElement('div');
                div_wr_one_lang.id = 'wr_one_lang';
                /*
                div_wr_one_lang.innerHTML = `
                    <label id="lab_one_lang">
                            <input id="one_lang" type="checkbox" onchange="filterTransCompare(this,null)"> <span>Один язык</span>
                    </label>
                    <label id="lab_many_lang">
                            <input id="many_lang" type="checkbox" onchange="filterTransCompare(this,null)"> <span>Несколько языков</span>
                    </label>
                    <button id="btn_show_refs" class="btn" onclick="hideShowRefsCompare(this)">Show Refs</button>
                `;
                */

                    //label_one_lang
                    const label_one_lang = document.createElement('label');
                    label_one_lang.id = 'lab_one_lang';

                    //span_one_lang_text
                    const span_one_lang_text = document.createElement('span');
                    span_one_lang_text.textContent = ' Один язык';

                    const radio_one_lang = document.createElement('input');
                    radio_one_lang.id = 'one_lang';
                    radio_one_lang.type = 'radio';
                    radio_one_lang.name = 'modo_lang';
                    radio_one_lang.checked = obj_ajustes.verseCompare.one_lang.checked;
                    radio_one_lang.onchange = (e) => {
                        filterTransCompare(e.target,null);//e.srcElement = this 
                    };


                    //label_many_lang
                    const label_many_lang = document.createElement('label');
                    label_many_lang.id = 'lab_many_lang';

                    //span_one_lang_text
                    const span_many_lang_text = document.createElement('span');
                    span_many_lang_text.textContent = ' Несколько языков';

                    const radio_many_lang = document.createElement('input');
                    radio_many_lang.id = 'many_lang';
                    radio_many_lang.type = 'radio';
                    radio_many_lang.name = 'modo_lang';
                    radio_many_lang.checked = obj_ajustes.verseCompare.many_lang.checked;
                    radio_many_lang.onchange = (e) => {
                        filterTransCompare(e.target,null);//e.srcElement = this 
                    }; 



                //wr_btns_lang
                const div_wr_btns_lang = document.createElement('div');
                div_wr_btns_lang.id = 'wr_btns_lang';
                /*
                div_wr_btns_lang.innerHTML = `
                    <div id="btns_lang">
                        <button class="btn btn_active" data-lang="ru" onclick="filterTransCompare(this,'ru')">Rus</button>
                        <button class="btn btn_active" data-lang="ua" onclick="filterTransCompare(this,'ua')">Ukr</button>
                        <button class="btn btn_active" data-lang="es" onclick="filterTransCompare(this,'es')">Esp</button>
                    </div>

                    <button id="btn_lang_all" class="btn btn_active" onclick="filterTransCompare(this,'all')">Todos</button>
                `;
                */

                //btns_lang
                const div_btns_lang = document.createElement('div');
                div_btns_lang.id = 'btns_lang';

                arr_verses_lang.forEach(el=>{
                    //ejemplo boton: <button class="btn btn_active" data-lang="ru" onclick="filterTransCompare(this,'ru')">Rus</button>
                    const btn = document.createElement('button');
                    btn.className = (obj_ajustes.verseCompare.arr_lang_act.includes(el) || (obj_ajustes.verseCompare.arr_lang_act.length == 0 && obj_ajustes.verseCompare.arr_lang_noact.length == 0) ) ? 'btn btn_active' : 'btn' ;
                    btn.dataset.lang = el;//['ru','ua','es']
                    btn.textContent = el.toUpperCase();
                    btn.onclick = (e) => {
                        filterTransCompare(e.target,el);
                    };
                    div_btns_lang.append(btn);
                });                


                //btn_lang_all
                const boton_btn_lang_all = document.createElement('button');
                boton_btn_lang_all.id = 'btn_lang_all';
                //div_btn_lang_all.innerHTML = `<button id="btn_lang_all" class="btn btn_active" onclick="filterTransCompare(this,'all')">Todos</button>`;
                boton_btn_lang_all.className = (obj_ajustes.verseCompare.arr_lang_act.length == arr_verses_lang.length || (obj_ajustes.verseCompare.arr_lang_act.length == 0 && obj_ajustes.verseCompare.arr_lang_noact.length == 0) ) ? 'btn btn_active' : 'btn' ;
                boton_btn_lang_all.style.display = (obj_ajustes.verseCompare.many_lang.checked) ? 'block' : 'none' ;
                boton_btn_lang_all.textContent = 'Все языки';
                boton_btn_lang_all.onclick = (e) => {
                    filterTransCompare(e.target,'all');
                };


            
            //fld_trans
            const fieldset_fld_trans = document.createElement('fieldset');
            fieldset_fld_trans.id = 'fld_trans';
            fieldset_fld_trans.innerHTML = `
                <legend class="leg">Переводы</legend>
            `;
            
                //wr_btns_trans
                const div_wr_btns_trans = document.createElement('div');
                div_wr_btns_trans.id = 'wr_btns_trans';
                /*
                div_wr_btns_trans.innerHTML = `
                    <div id="btns_trans">
                        <button class="btn btn_active" data-lang="ru" data-trans="rstStrongRed" onclick="filterTransCompare(this,'ru')">RSTr+</button>
                        <button class="btn btn_active" data-lang="ua" data-trans="ukr_ogi" onclick="filterTransCompare(this,'ua')">Ukr_Ogi</button>
                        <button class="btn btn_active" data-lang="es" data-trans="rv60" onclick="filterTransCompare(this,'es')">RV60</button>
                    </div>
                `;
                */
                
                //btns_lang
                const div_btns_trans = document.createElement('div');
                div_btns_trans.id = 'btns_trans';
            
                arr_verses_compare.forEach(el => {
                    //ejemplo boton: <button class="btn btn_active" data-lang="ru" data-trans="rstStrongRed" onclick="filterTransCompare(this,'ru')">RSTr+</button>
                    const btn = document.createElement('button');

                    if(obj_ajustes.verseCompare.arr_lang_act.includes(el.Lang) || (obj_ajustes.verseCompare.arr_lang_act.length == 0 && obj_ajustes.verseCompare.arr_lang_noact.length == 0) ){
                        btn.style.display = 'block';
                    }else{
                        btn.style.display = 'none';
                    }

                    if(obj_ajustes.verseCompare.arr_trans_act.includes(el.Translation) || (obj_ajustes.verseCompare.arr_trans_act.length == 0 && obj_ajustes.verseCompare.arr_trans_noact.length == 0) ){
                        btn.className = 'btn btn_active';
                    }else{
                        btn.className = 'btn';
                    }

                    btn.dataset.lang = el.Lang;//['ru','ua','es']
                    btn.dataset.trans = el.Translation;//['rstStrongRed','rv60',...]
                    btn.textContent = el.BibleShortName;
                    btn.title = el.BibleName;
                    btn.onclick = (e) => {
                        filterTransCompareBtns(e.target);
                    };
                    div_btns_trans.append(btn);
                });


    //BODY of verses
    const div_vc_body = document.createElement('div');
    div_vc_body.id = 'vc_body';    
    

    //==================================//
    //start - append los elementos
    //==================================//
    div_wr_vc.append(div_wr_vc_head);

        div_wr_vc_head.append(div_vc_head);
            div_vc_head.append(d_prev);
            div_vc_head.append(d_ref);
            div_vc_head.append(d_next);

        div_wr_vc_head.append(div_vc_head_filter);

            div_vc_head_filter.append(div_title_filter);
            div_vc_head_filter.append(div_wr_filter);
                div_wr_filter.append(div_wr_filter_inner);

                    div_wr_filter_inner.append(fieldset_fld_refs);
                        fieldset_fld_refs.append(div_wr_show_refs);
                            div_wr_show_refs.append(boton_btn_show_refs);

                    div_wr_filter_inner.append(fieldset_fld_lang);
                        fieldset_fld_lang.append(div_wr_one_lang);
                            div_wr_one_lang.append(label_one_lang);
                                label_one_lang.append(radio_one_lang);
                                label_one_lang.append(span_one_lang_text);
                            div_wr_one_lang.append(label_many_lang);
                                label_many_lang.append(radio_many_lang);
                                label_many_lang.append(span_many_lang_text);

                    div_wr_filter_inner.append(fieldset_fld_trans);        
                        fieldset_fld_lang.append(div_wr_btns_lang);
                            div_wr_btns_lang.append(boton_btn_lang_all);
                            div_wr_btns_lang.append(div_btns_lang);

                    div_wr_filter_inner.append(fieldset_fld_trans);
                        fieldset_fld_trans.append(div_wr_btns_trans);
                            div_wr_btns_trans.append(div_btns_trans);

    div_wr_vc.append(div_vc_body);
    //==================================//
    //end - append los elementos
    //==================================//    

    //================================================================//
    //end - estructura html
    //================================================================//   


    
    //coloco trans del versiculo elegido al inicio de la lista de los comparados
    arr_verses_compare.sort((a, b) => {
        if(a.Translation == trans_ref){
            return -1;//coloca al inicio la trans_ref
        }else{
            return 1;
        }
    });
    //console.log(arr_verses_compare);


    arr_verses_compare.forEach((el,i) => {        
        const p = document.createElement('p');
        p.className = (i == 0) ? 'pv pv_active' : 'pv' ;//el primer elemento -> activo que es trans_ref
        p.dataset.verse_lang = el.Lang;
        p.dataset.verse_trans = el.Translation;

        if( i == 0 || 
            //(obj_ajustes.verseCompare.arr_lang_act.includes(el.Lang) || (obj_ajustes.verseCompare.arr_lang_act.length == 0 && obj_ajustes.verseCompare.arr_lang_noact.length == 0) ) || 
            (obj_ajustes.verseCompare.arr_trans_act.includes(el.Translation) || (obj_ajustes.verseCompare.arr_trans_act.length == 0 && obj_ajustes.verseCompare.arr_trans_noact.length == 0) )
        ){
            p.style.display = 'block';
        }else{
            p.style.display = 'none';
        }

        /*
        p.innerHTML = ` 
        <span class="pv_inner">
            <span class="b_trans" title="${el.BibleName}">${el.BibleShortName}</span> 
            <a href="#" class="a_ref" style="display: ${obj_ajustes.verseCompare.a_ref.display}">${el.BibleBookShortName}${el.chapter}:${el.verse}</a> 
            <span class="v_trans">${el.verseText}</span>
        </span>
        `;
        */

        /*
        // new
        p.innerHTML = ` 
        <span class="pv_inner">
            <span class="wr_b_trans_a_ref">
                <span class="b_trans" title="${el.BibleName}">${el.BibleShortName}</span> 
                <a href="#" class="a_ref" style="display: ${obj_ajustes.verseCompare.a_ref.display}">${el.BibleBookShortName}${el.chapter}:${el.verse}</a> 
            </span>
            <span class="v_trans">${el.verseText}</span>
        </span>
        `;
        */
        
        const pv_inner = document.createElement('span');
        pv_inner.className = 'pv_inner';

        const wr_b_trans_a_ref = document.createElement('span');
        wr_b_trans_a_ref.className = 'wr_b_trans_a_ref';


        const b_trans = document.createElement('span');
        b_trans.className = 'b_trans';
        b_trans.title = el.BibleName;
        b_trans.innerHTML = el.BibleShortName;
        b_trans.onclick = (e) => {
            //console.log('b_trans.onclick. e: ', e);
            goToRefFromCompareVerses();
        }

        const a_ref = document.createElement('a');
        a_ref.className = 'a_ref';
        a_ref.href = '#';
        a_ref.style.display = obj_ajustes.verseCompare.a_ref.display;
        let refLink = `${el.BibleBookShortName} ${el.chapter}:${el.verse}`;
        a_ref.innerHTML = refLink;
        a_ref.onclick = (e) => {
            //console.log('a_ref.onclick. e: ', e);
            goToRefFromCompareVerses(e);
        };

        function goToRefFromCompareVerses(){
            //console.log('=== function goToRefFromCompareVerses() ===');
            
            updateArrTrans();

            if(arr_trans.includes(el.Translation)){
                arr_trans.unshift(el.Translation);//вставляю в начало
                arr_trans = [... new Set(arr_trans)];//удаляю повторяющиеся елементы
            }else{
                arr_trans[0] = el.Translation;//меняю первый елемент
            }

            document.querySelectorAll('.colsHead').forEach((el,i) => {
                let this_trans = arrFavTransObj.find(v => v.Translation === arr_trans[i]);

                el.dataset.trans = this_trans.Translation;
                el.dataset.base_ep = this_trans.EnglishPsalms;

                if(i == 0){
                    //eid_inpt_nav.dataset.trans = this_trans.Translation; 
                }
            });
            
            
            eid_inpt_nav.dataset.trans = el.Translation;
            eid_act_trans_nav.textContent = el.BibleShortName;            
            eid_act_trans_find.textContent = el.BibleShortName;            
            eid_act_trans_strong.textContent = el.BibleShortName;            
            
            goToLink(el.Translation, refLink);
            updateArrTrans();
            setTimeout(()=>{
                eid_s_verse.click();
            },100);
            closeModal(null,true);
        }

        const v_trans = document.createElement('span');
        v_trans.className = 'v_trans';
        v_trans.innerHTML = el.verseText;

        //NumbersStrong si hay
        if(el.StrongNumbers == 'Y' && el.verseText.includes('<S') && el.verseText.includes('</S>') ){
            if(v_trans.querySelectorAll('.vt s.show.strongActive').length > 0){
                v_trans.querySelector('.vt').addEventListener('click', (e) => { 
                    if(e.target.tagName === 'S'){
                        getStrongNumber(e.target.innerText);
                        if(window.innerWidth < pantallaTabletMinPx){
                            closeModal(null,true);
                        }
                    }
                })
            }
        }

        //Примечания редактора в стихах (RSTi2,Ukr_UMTs)
        if(el.Notes == 'Y' && el.verseText.includes('<span class="wr_tooltip">') ){
            if(v_trans.querySelectorAll('.vt span.tooltip').length > 0){
                
                v_trans.querySelector('.vt .wr_tooltip').onclick = (event) => {
                    //event.stopPropagation();
                    hideShowComment(event);
                };

                v_trans.querySelector('.vt .wr_tooltip .comment .close').onclick = (event) => {
                    close_comment_x(event.target.parentElement.parentElement.parentElement, event);
                }

                v_trans.querySelectorAll('.vt .wr_tooltip .comment .text a').forEach(el_a =>{
                    let Translation = el.Translation; 
                    let book = el.book; 
                    let chapter = el.chapter; 
                    let verse = el.verse; 
                    let to_verse = null; 
                    let ref = refLink;
                    
                    el_a.addEventListener('click',(ev)=>{
                        ev.preventDefault(); 
                        //console.log(el_a.innerHTML);
                        //console.log(el_a.href);
                        addRefToHistNav(Translation, ref, book, chapter, verse, to_verse);
                        getRefByHref(el_a.getAttribute('href'),'/',1);
                        closeModal(null,true);
                    });
                });
            }
        }

        p.append(pv_inner);

        pv_inner.append(wr_b_trans_a_ref);
            wr_b_trans_a_ref.append(a_ref);
            wr_b_trans_a_ref.append(b_trans);

        pv_inner.append(v_trans);

        div_vc_body.append(p);
    });
    eid_bl_modalFullInner.append(div_wr_vc);

    mySizeVersesCompare();

    //si es mobile, ciero menu
    if(window.innerWidth > pantallaTabletMinPx){
        //console.log('func selVerse(). mobile.');
        applyMaxWidthToClass('wr_b_trans_a_ref');
    }

    mySizeVersesCompare();

    if(hay_sesion){
        guardarEnBd('ajustes','obj_ajustes',obj_ajustes);
    }
}

function updateArrTrans(){
    let colsHeadAll = document.querySelectorAll('.colsHead');

    arr_trans = [];//reset
    colsHeadAll.forEach((el) =>{
        arr_trans.push(el.dataset.trans);
        //console.log(arr_trans);
    });
    //console.log('arr_trans: ',arr_trans);


    let btns_footer_trans_all = document.querySelectorAll('#footerInner button');
    btns_footer_trans_all.forEach(el => {
        if(el.classList.contains('btn_active')){
            el.classList.remove('btn_active');
        }
        
        if(el.value == eid_trans1.dataset.trans){
            el.classList.add('btn_active');
        }
    });

}

function mySizeVersesCompare(){

    //eid_myModalContent.offsetHeight;//1208
    //eid_modcont_header.offsetHeight;//40 // Sravneniye perevodov
    //eid_modcont_body.offsetHeight;//1168
    //eid_bl_modalFull.offsetHeight;//1721 todos los versiculos
    //eid_bl_modalFullInner.offsetHeight;//1721 todos los versiculos

    const eid_wr_vc_head = document.getElementById('wr_vc_head');
    const eid_vc_body = document.getElementById('vc_body');

    if(eid_wr_vc_head != null && eid_vc_body != null){
        let h = 
            eid_myModalContent.offsetHeight //653
          - eid_modcont_header.offsetHeight //41   
          - eid_wr_vc_head.offsetHeight     //173
          - 20  
        ;
    
        eid_vc_body.style.maxHeight = h + 'px';
        //eid_vc_body.style.height = h + 'px';//para test
        eid_modcont_body.style.overflow = 'hidden';
    }
}

function hideShowWrFilter(){
    let wr_filter = document.getElementById('wr_filter');
    let val;
    let title_filter_img = document.getElementById('title_filter').querySelector('img');

    if(esVisible(wr_filter)){
        //wr_filter.style.display = 'none';
        val = 'none';
        title_filter_img.classList.remove('razv');
    }else{
        //wr_filter.style.display = 'block';
        val = 'block';
        title_filter_img.classList.add('razv');
    }

    wr_filter.style.display = val;
    obj_ajustes.verseCompare.wr_filter.display = val;
    mySizeVersesCompare();

    if(hay_sesion){
        guardarEnBd('ajustes','obj_ajustes',obj_ajustes);
    }
}

function hideShowRefsCompare(e = null){
    let a_ref_all = document.querySelectorAll('.a_ref');//todos a_ref
    let btn_show_refs = document.getElementById('btn_show_refs');
    //let elementoRef = a_ref_all[0];//primer link   

    
    if(obj_ajustes.verseCompare.btn_show_refs.stateActive /*esVisible(elementoRef)*/){
        btn_show_refs.classList.remove('btn_active');
        obj_ajustes.verseCompare.btn_show_refs.classText = 'btn';
        obj_ajustes.verseCompare.btn_show_refs.stateActive = false;
        obj_ajustes.verseCompare.a_ref.display = 'none';
        a_ref_all.forEach(el=>{
            el.style.display = 'none';
        });
    }else{
        btn_show_refs.classList.add('btn_active');
        obj_ajustes.verseCompare.btn_show_refs.classText = 'btn btn_active';
        obj_ajustes.verseCompare.btn_show_refs.stateActive = true;
        obj_ajustes.verseCompare.a_ref.display = 'inline-block';
        a_ref_all.forEach(el=>{
            el.style.display = 'inline-block';
        });
    }

    if(hay_sesion){
        guardarEnBd('ajustes','obj_ajustes',obj_ajustes);
    }
}

function filterTransCompare(e, param = 'all'){
    const radio_one_lang = document.getElementById('one_lang');
    const radio_many_lang = document.getElementById('many_lang');
    const btns_lang = document.getElementById('btns_lang');
    const btn_lang_all = document.getElementById('btn_lang_all');
    const btns_trans = document.getElementById('btns_trans');
    
    let pv_all = document.querySelectorAll('.pv');//todos los parafos de verses mostrados
    let btns_lang_all = btns_lang.querySelectorAll('.btn');
    let btns_trans_all = btns_trans.querySelectorAll('.btn');
    let this_btn = e;

    if(radio_one_lang.checked){//solo mostrar un idioma

        obj_ajustes.verseCompare.one_lang.checked = true;
        obj_ajustes.verseCompare.many_lang.checked = false;
        
        btn_lang_all.style.display = 'none';
        obj_ajustes.verseCompare.btn_lang_all.display = 'none';
        obj_ajustes.verseCompare.btn_lang_all.class = 'tab';

        btns_lang_all.forEach(el=>{
            if(el.className.includes('btn_active')){
                el.classList.remove('btn_active');
            } 
        });
        this_btn.classList.add('btn_active');

        //y desactivo todos trans
        btns_trans_all.forEach(el=>{
            if(el.className.includes('btn_active')){
                el.classList.remove('btn_active');
                el.style.display = 'none';
                obj_ajustes.verseCompare.arr_trans_act.splice(obj_ajustes.verseCompare.arr_trans_act.indexOf(el.dataset.trans),1);
            } 
        });

        //miro cuantos botones están marcados
        let arr_lang_act = [];
        let arr_lang_noact = [];
        btns_lang_all.forEach(el => {
            if(el.className.includes('btn_active')){
                arr_lang_act.push(el.dataset.lang);
            }else{
                arr_lang_noact.push(el.dataset.lang);
            }
        });
        //console.log('arr_lang_act: ',arr_lang_act );
        //console.log('arr_lang_noact: ',arr_lang_noact);

        obj_ajustes.verseCompare.arr_lang_act = arr_lang_act;
        obj_ajustes.verseCompare.arr_lang_noact = arr_lang_noact;

        //btns_trans
        btns_trans_all.forEach(el=>{
            //console.log(`${el.dataset.lang} --- ${el.dataset.trans}`);
            if(arr_lang_act.indexOf(el.dataset.lang) >= 0){
                el.style.display = 'block';        
                if(!el.className.includes('btn_active') && this_btn.dataset.lang == el.dataset.lang){
                    el.classList.add('btn_active');
                    obj_ajustes.verseCompare.arr_trans_act.push(el.dataset.trans);
                }    
            }else{
                el.style.display = 'none';                
                if(el.className.includes('btn_active')){
                    el.classList.remove('btn_active');
                    obj_ajustes.verseCompare.arr_trans_act.splice(obj_ajustes.verseCompare.arr_trans_act.indexOf(el.dataset.trans),1);
                }
            }
        });

        
        pv_all.forEach((el,i)=>{   
            if(i != 0){//siempre dejo visible el primer parafo con el verse comparado 
                //console.log(`one lang --- ${el.dataset.verse_lang} --- ${el.dataset.verse_trans}`);
                if(el.dataset.verse_lang == param){
                    el.style.display = 'block';
                }else{
                    el.style.display = 'none';
                }
            }
        });

    }else{//mostrar VARIOS idiomas marcadas

        obj_ajustes.verseCompare.one_lang.checked = false;
        obj_ajustes.verseCompare.many_lang.checked = true;

        btn_lang_all.style.display = 'block';
        obj_ajustes.verseCompare.btn_lang_all.display = 'block';
        obj_ajustes.verseCompare.btn_lang_all.class = 'tab tab_active';

        if(this_btn.id == 'btn_lang_all'){

            if(btn_lang_all.className.includes('btn_active')){
                btn_lang_all.classList.remove('btn_active');//desactivo este btn_lang_all
                
                //y desactivo todos lang
                btns_lang_all.forEach(el=>{
                    if(el.className.includes('btn_active')){
                        el.classList.remove('btn_active');
                    } 
                });

                //y desactivo todos trans
                btns_trans_all.forEach(el=>{
                    if(el.className.includes('btn_active')){
                        el.classList.remove('btn_active');
                        obj_ajustes.verseCompare.arr_trans_act.splice(obj_ajustes.verseCompare.arr_trans_act.indexOf(el.dataset.trans),1);
                    } 
                });
                
            }else{
                btn_lang_all.classList.add('btn_active');//activo este btn_lang_all
                
                //y activo todos lang
                btns_lang_all.forEach(el=>{
                    if(!el.className.includes('btn_active')){
                        el.classList.add('btn_active');
                    } 
                });

                //y activo todos trans
                btns_trans_all.forEach(el=>{
                    if(!el.className.includes('btn_active') ){
                        el.classList.add('btn_active');
                        obj_ajustes.verseCompare.arr_trans_act.push(el.dataset.trans);
                    } 
                });
            }

        }else{

            if(this_btn.className.includes('btn_active')){
                this_btn.classList.remove('btn_active');
            }else{
                this_btn.classList.add('btn_active'); 
            }

        }

        

        //miro cuantos botones están marcados
        let arr_lang_act = [];
        let arr_lang_noact = [];
        btns_lang_all.forEach(el => {
            if(el.className.includes('btn_active')){
                arr_lang_act.push(el.dataset.lang);
            }else{
                arr_lang_noact.push(el.dataset.lang);
            }
        });
        //console.log('arr_lang_act: ',arr_lang_act );
        //console.log('arr_lang_noact: ',arr_lang_noact);

        obj_ajustes.verseCompare.arr_lang_act = arr_lang_act;
        obj_ajustes.verseCompare.arr_lang_noact = arr_lang_noact;
        
        //btns_trans
        btns_trans_all.forEach(el=>{
            //console.log(`${el.dataset.lang} --- ${el.dataset.trans}`);

            if(arr_lang_act.indexOf(el.dataset.lang) >= 0){
                el.style.display = 'block';        
                if(!el.className.includes('btn_active') && this_btn.dataset.lang == el.dataset.lang){
                    el.classList.add('btn_active');
                    obj_ajustes.verseCompare.arr_trans_act.push(el.dataset.trans);
                }    
            }else{
                el.style.display = 'none';                
                if(el.className.includes('btn_active')){
                    el.classList.remove('btn_active');
                    obj_ajustes.verseCompare.arr_trans_act.splice(obj_ajustes.verseCompare.arr_trans_act.indexOf(el.dataset.trans),1);
                }
            }
        });
        

        (arr_lang_act.length == arr_verses_lang.length) ? btn_lang_all.classList.add('btn_active') : btn_lang_all.classList.remove('btn_active') ;

        pv_all.forEach((el,i) => {   
            if(i != 0){//siempre dejo visible el primer parafo con el verse comparado 
                //console.log(`${el.dataset.verse_lang} --- ${el.dataset.verse_trans}`);

                //si lang de pv esta en el 'array arr_lang_act' su index sera >= 0
                if(obj_ajustes.verseCompare.arr_trans_act.indexOf(el.dataset.verse_trans) >= 0){
                    //console.log('muestro pv');
                    el.style.display = 'block';
                }else{
                    //console.log('--- NO muestro pv');
                    el.style.display = 'none';
                }
            }
        });
    }
    
    mySizeVersesCompare();
    
    if(hay_sesion){
        guardarEnBd('ajustes','obj_ajustes',obj_ajustes);
    }
}



function filterTransCompareBtns(e){
    //console.log('=== function filterTransCompareBtns() ===');

    const btns_trans = document.getElementById('btns_trans');
    let pv_all = document.querySelectorAll('.pv');//todos los parafos de verses mostrados

    let btns_lang_all = btns_lang.querySelectorAll('.btn');
    let btns_trans_all = btns_trans.querySelectorAll('.btn');
    let this_btn = e;


    if(this_btn.className.includes('btn_active')){
        this_btn.classList.remove('btn_active');
    }else{
        this_btn.classList.add('btn_active');
    }


    let arr_trans_act = [];
    let arr_trans_noact = [];
    let arr_trans_lang = [];

    btns_trans_all.forEach(el => {
        if(el.className.includes('btn_active')){
            arr_trans_act.push(el.dataset.trans);
            arr_trans_lang.push(el.dataset.lang);
            //console.log('arr_trans_lang: ',arr_trans_lang );
        }else{
            arr_trans_noact.push(el.dataset.trans);
        }
    });
    //console.log('arr_trans_act: ',arr_trans_act );
    //console.log('arr_trans_noact: ',arr_trans_noact);

    arr_trans_lang = [... new Set(arr_trans_lang)];//quito elementos duplicados 
    //console.log('sin duplicados --- arr_trans_lang: ',arr_trans_lang );

    obj_ajustes.verseCompare.arr_trans_act = arr_trans_act;
    obj_ajustes.verseCompare.arr_trans_noact = arr_trans_noact;    
    
    btns_lang_all.forEach(el => {
        if(el.className.includes('btn_active') && arr_trans_lang.indexOf(el.dataset.lang) == -1 ){
            //console.log(' noo ok. --- quito act');
            el.classList.remove('btn_active');
            obj_ajustes.verseCompare.arr_lang_act.splice(obj_ajustes.verseCompare.arr_lang_act.indexOf(el.dataset.lang),1)
        }
        else if(!el.className.includes('btn_active') && arr_trans_lang.indexOf(el.dataset.lang) >= 0 ){
            //console.log(' todo ok. no quito act');
            el.classList.add('btn_active');
            obj_ajustes.verseCompare.arr_lang_act.push(el.dataset.lang);
        }       
    });
    obj_ajustes.verseCompare.arr_lang_act = [... new Set(obj_ajustes.verseCompare.arr_lang_act)];//quito elementos duplicados


    pv_all.forEach((el,i)=>{   
        if(i != 0){//siempre dejo visible el primer parafo con el verse comparado 
            //si lang de pv esta en el 'array arr_lang_act' su index sera >= 0
            if(obj_ajustes.verseCompare.arr_trans_act.indexOf(el.dataset.verse_trans) >= 0){
                el.style.display = 'block';
            }else{
                el.style.display = 'none';
            }
        }
    });

    if(hay_sesion){
        guardarEnBd('ajustes','obj_ajustes',obj_ajustes);
    }
}


function esVisible(elemento) {
    return !!elemento && (elemento.offsetWidth > 0 || elemento.offsetHeight > 0 || elemento.getClientRects().length > 0) && getComputedStyle(elemento).visibility !== 'hidden';
}


function showHistoryNav(){
    eid_bl_modalFullInner.innerHTML = '';

    if(arr_hist_nav.length > 0){
        arr_hist_nav.forEach((el,i)=>{
            const p = document.createElement('p');
            p.className = 'p_pointer';       
            p.onclick = () => {
                onclick_p_nav(el);
                closeModal(null,true);
                showTab(eid_btn_nav,'nav');
            }
            p.innerHTML = `<span class="sp_trans_hist">${el.BibleShortName} <span class="sp_fecha_hist">${el.fecha}</span></span>`;
            p.innerHTML += `<span class="sp_ref_hist">${el.ref} <span class="sp_hora_hist">${el.hora}</span></span>`;
            eid_bl_modalFullInner.append(p);
        });
    }else{
        const p = document.createElement('p');
        p.className = 'prim';
        p.innerHTML = 'Нет записей в истории навигации.';
        eid_bl_modalFullInner.append(p);
    }    
}

function showHistoryFind(){
    eid_bl_modalFullInner.innerHTML = '';

    if(arr_hist_find.length > 0){
        arr_hist_find.forEach((el,i)=>{
            const p = document.createElement('p');
            p.className = 'p_pointer';       
            p.onclick = () => {
                onclick_p_find(el);
                closeModal(null,true);
                if(window.innerWidth < pantallaTabletMinPx){
                    openSidebar(document.querySelector('.btnMenu'));//abro sidemar 'menu hamburguesa left'
                }
                showTab(eid_btn_find,'find');
            }
            p.innerHTML = ` <span class="sp_trans_hist">${el.BibleShortName} 
                            <span class="wr_fecha_hora">
                                <span class="sp_fecha_hist">Совпадений: ${el.count_matches}</span>
                                <span class="sp_hora_hist">Стихов: ${el.count_verses}</span>
                            </span>
                        </span>`;
            p.innerHTML += `<span class="sp_words_hist">${el.words}</span>`;
            eid_bl_modalFullInner.append(p);
        });
    }else{
        const p = document.createElement('p');
        p.className = 'prim';
        p.innerHTML = 'Нет записей в истории поиска.';
        eid_bl_modalFullInner.append(p);
    }
}

function showHistoryStrong(){
    eid_bl_modalFullInner.innerHTML = '';

    if(arr_hist_strong.length > 0){
        arr_hist_strong.forEach((el,i)=>{
            const p = document.createElement('p');
            p.className = 'p_pointer';       
            p.onclick = () => {
                onclick_p_strong(el);
                closeModal(null,true);
                showTab(eid_btn_strong,'strong');           
            }
            p.innerHTML = `
                <span class="sp_trans_hist">${el.strongLang} <span class="sp_fecha_hist">${el.fecha}</span></span>
                <span class="sp_ref_hist">${el.strongIndex} <span class="sp_hora_hist">${el.hora}</span></span>
            `;
            if(typeof el.strongWord !== 'undefined' && typeof el.strongTranslation !== 'undefined'){
                p.innerHTML += `
                    <span class="sp_ref_hist">${el.strongWord}</span>
                    <span class="sp_w_t">${el.strongTranslation}</span>
                `;
            }
            eid_bl_modalFullInner.append(p);
        });
    }else{
        const p = document.createElement('p');
        p.className = 'prim';
        p.innerHTML = 'Нет записей в истории номеров Стронга.';
        eid_bl_modalFullInner.append(p);
    }
}

function showMarkers(){
    eid_bl_modalFullInner.innerHTML = '';
    let totalMarkers = arr_markers.length;
    let m_markers_porcentaje = document.getElementById('m_markers_porcentaje');
    m_markers_porcentaje.textContent = `${totalMarkers}/${arr_markers_limit}`;

    if(arr_markers.length > 0){
        arr_markers.forEach((el,i)=>{
            
            const p = document.createElement('p');
            p.className = 'p_pointer';       

            const sam_mk_head = document.createElement('span');
            sam_mk_head.className = 'sam_mk_head';
            sam_mk_head.innerHTML = `
                <span class="sp_trans_hist">
                    <span class="sp_ref">
                        <span class="sp_f">${totalMarkers - i}</span>
                        ${el.BibleShortName}
                    </span> 
                    <span class="sp_fecha_hist">${el.fecha}</span>
                </span>
                <span class="sp_ref_hist">${el.ref} <span class="sp_hora_hist">${el.hora}</span></span>
            `;
            sam_mk_head.onclick = () => {
                onclick_p_marker(el);
                closeModal(null,true);//en mobile cierro modal
            }
            p.append(sam_mk_head);

            const sp_vtext = document.createElement('span');
            sp_vtext.className = 'sp_vtext';

            const sam_text = document.createElement('span');
            sam_text.className = 'sam_text';
            sam_text.innerHTML = el.verseText;
            sam_text.onclick = () => {
                onclick_p_marker(el);
                closeModal(null,true);//en mobile cierro modal
            }

            sp_vtext.append(sam_text);

            const btn_verse_menu = document.createElement('span');
            btn_verse_menu.className = 'mark btn_verse_menu';
            btn_verse_menu.onclick = (e)=>{
                //console.log('llamo a hideShow3Btns()');
                hideShow3Btns(e.currentTarget);
            }
            //btn_verse_menu.innerHTML = `<span class="wr_3_btns" style="display: none;">
            //                                <span>Ver</span>
            //                                <span>Compartir</span>
            //                                <span>Eliminar</span>
            //                            </span>
            //`;

            const wr_3_btns = document.createElement('span');
            wr_3_btns.className = 'wr_3_btns';
            wr_3_btns.style.display = 'none';
            //wr_3_btns.innerHTML = ` <span>Ver</span>
            //                        <span>Compartir</span>
            //                        <span>Eliminar</span>
            //`;

            const btn_ver = document.createElement('span');
            btn_ver.className = 'btn_ver';
            btn_ver.innerHTML = 'Ver';
            btn_ver.dataset.indexMarker = i;
            btn_ver.onclick = (e) =>{
                let index = e.currentTarget.dataset.indexMarker;
                //console.log(e.currentTarget.dataset.indexMarker);
                //console.log('1. index de arr_markers. index: ',index);
                onclick_p_marker(el);
                closeModal(null,true);//en mobile cierro modal
            }
            wr_3_btns.append(btn_ver);

            const btn_compartir = document.createElement('span');
            btn_compartir.className = 'btn_compartir';
            btn_compartir.innerHTML = 'Compartir';
            btn_compartir.dataset.indexMarker = i;
            btn_compartir.onclick = (e) =>{
                let index = e.currentTarget.dataset.indexMarker;
                //console.log(e.currentTarget.dataset.indexMarker);
                //console.log('2. index de arr_markers. index: ',index);
                alert('funcción en desarrollo.');
            }
            wr_3_btns.append(btn_compartir);

            const btn_eliminar = document.createElement('span');
            btn_eliminar.className = 'btn_eliminar';
            btn_eliminar.innerHTML = 'Eliminar';
            btn_eliminar.dataset.indexMarker = i;
            btn_eliminar.onclick = (e) =>{
                let index = e.currentTarget.dataset.indexMarker;
                //console.log(e.currentTarget.dataset.indexMarker);
                //console.log('3. index de arr_markers. index: ',index);
                arr_markers.splice(index, 1);//elimino elemento del array
                if(hay_sesion){
                    guardarEnBd('markers','arr_markers',arr_markers);
                }
                buildMarkersDesktop();
                showMarkers();
            }
            wr_3_btns.append(btn_eliminar);


            const wr_both = document.createElement('span');
            wr_both.className = 'wr_both';

            p.append(sp_vtext);
            sp_vtext.append(wr_both);
            wr_both.append(btn_verse_menu);
            wr_both.append(wr_3_btns);

            //p.innerHTML += `<span class="sp_vtext">${el.verseText}
            //                    <span class="btn_verse_menu" onclick="hideShow3Btns(${p.querySelector('.btn_verse_menu')})">
            //                        <span class="wr_3_btns" style="display: none;">
            //                            <span>ver</span>
            //                            <span>compartir</span>
            //                            <span>eliminar</span>
            //                        </span>
            //                    </span>
            //                </span>`;            

            eid_bl_modalFullInner.append(p);

        });
    }else{
        const p = document.createElement('p');
        p.className = 'prim';
        p.innerHTML = 'Нет записей в закладках.';
        eid_bl_modalFullInner.append(p);
    }    
}



// When the user clicks on <span> (x), close the eid_myModal
function closeModal(modal_head_text = null, click_fuera_o_x = false) {
    let actual_h4_text = eid_myModal.querySelector('#h4_text').textContent;
    //console.log('actual_h4_text: ',actual_h4_text);

    if(modal_head_text == actual_h4_text || click_fuera_o_x){
        //console.log(`[if]. el titulo es igual. ${modal_head_text} == ${actual_h4_text}. o click_fuera_o_x -> Cierro modal.`);

        eid_myModal.style.opacity = 0;//start efecto fade
        setTimeout(()=>{
            eid_myModal.style.display = "none";
        },400);

    }else{
        //console.log(`[else] --- NO. el titulo no es igual. ${modal_head_text} != ${actual_h4_text}`);
        //no hago nada
    }

}

// When the user clicks anywhere outside of the eid_myModal, close it
window.onclick = function(event) {
    //console.log('window.onclick on eid_myModal');
    if(event.target == eid_myModal || event.target == eid_myModalContent){
        closeModal(null,true);//click_fuera_o_x
    }
}



function verseGo(dir, obj_to_send_string){
    
    let this_json = JSON.parse(obj_to_send_string);

    //console.log('abajo this_json: ');    
    //console.log(this_json);  

    //desestructuracion de objeto this_json
    const { 
        verseRef,
        BibleBookShortName,
        trans_ref,
        book, 
        chapter, 
        verse,        
        BookQty,
        ChapterQty,
        VerseQty
    } = this_json;

    //console.log(`${trans_ref} --- ${book} ---${chapter} ---${verse}`);

    let this_objTrans = arrFavTransObj.find(v => v.Translation === trans_ref);  
    
    
    if(dir == 'next'){
        //console.log('show next verse');    

        let next_book = book;
        let next_chapter = chapter; 
        let next_verse = verse;

        if(verse == VerseQty){

            if(chapter == ChapterQty){
                
                if(book == BookQty - 1){//Apocalipsis
                    next_book = 0;//Génesis
                }else{
                    next_book = book + 1;
                }   
    
                next_chapter = 1;
            }else{
                next_chapter = chapter + 1;
            }
            
            next_verse = 1;
        }else{
            next_verse = verse + 1;
        }

        //console.log(`${next_book} ---${next_chapter} ---${next_verse}`);

        openModal('full', 'Сравнение переводов', [trans_ref, next_book, next_chapter, next_verse], 'compareVerse', false);// modalFadeIn = false

    }


    if(dir == 'prev'){
        //console.log('show prev verse');    

        let prev_book = book;
        let prev_chapter = chapter; 
        let prev_verse = verse;

        if(verse == 1){

            if(chapter == 1){
                
                if(book == 0){//Génesis
                    prev_book = BookQty - 1;//66 - 1 = 65 => Apocapipsis
                }else{
                    prev_book = book - 1;
                }   
    
                prev_chapter = parseInt(this_objTrans.Books[prev_book].ChapterQty);
            }else{
                prev_chapter = chapter - 1;
            }

            
            //hago fetch para sacar VerseQty del chapter anterior
            let url = `../modules/text/${trans_ref}/${this_objTrans.Books[prev_book].PathName}`;// "./modules/text/rstStrongRed/02_exodus.htm"                                
                                
            let formData = new FormData();
            // formData.append('url', url);//antes
            formData.append('url', './'+url);//importante './' delante de la url
            formData.append('book', prev_book);
            formData.append('chapter', prev_chapter);

            fetch('./app/read_file_get_VerseQty_to_json.php',{
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                
                prev_verse = data.VerseQty;
                //console.log('15047. verse: ',verse);

                if(prev_verse > 0){
                    openModal('full', 'Сравнение переводов', [trans_ref, prev_book, prev_chapter, prev_verse], 'compareVerse', false);// modalFadeIn = false
                }

            })
            .catch(error => { 
                // Código a realizar cuando se rechaza la promesa
                console.error('VerseQty. error promesa: '+error);
            });

        }else{
            prev_verse = verse - 1;
            //console.log(`${prev_book} ---${prev_chapter} ---${prev_verse}`);
            
            openModal('full', 'Сравнение переводов', [trans_ref, prev_book, prev_chapter, prev_verse], 'compareVerse', false);// modalFadeIn = false
        }

    }
}


function openModalForActTrans(){//trans del col1
    let divtrans_to_change = (eid_inpt_nav.dataset.divtrans != '') ? document.getElementById(eid_inpt_nav.dataset.divtrans) : eid_trans1 ; 
    //console.log(divtrans_to_change);    
    openModal('full','Избранныe модули Библии',divtrans_to_change,'showModules');
}

//trans seleccionado con el click de la col de una trans sin cambiar trans1 en col1del col1
function openModalForSelectedTrans(){
    let divtrans_to_change = (eid_inpt_nav.dataset.divtrans != '') ? document.getElementById(eid_inpt_nav.dataset.divtrans) : eid_trans1 ; 
    //console.log(divtrans_to_change);    
    openModal('full','Избранныe модули Библии',divtrans_to_change,'showModules');
}

/*
// no hace falta ya que hay window.onclick con click_fuera_o_x
eid_myModal.addEventListener('click', function(e){
    //console.log('eid_myModal. div 2 exterior');
    closeModal(null,true);
});
*/

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




function applyMaxWidthToClass(the_class){
    // Obtener todos los elementos con la clase "aaa"
    let elementos = document.querySelectorAll('.'+the_class);

    // Inicializar una variable para almacenar el ancho máximo
    let anchoMaximo = 0;

    // Iterar sobre los elementos para encontrar el ancho máximo
    elementos.forEach(function(elemento) {
        elemento.style.minWidth = 'auto';//reset
        let ancho = elemento.offsetWidth; // Obtener el ancho del elemento
        if (ancho > anchoMaximo) {
            anchoMaximo = ancho; // Actualizar el ancho máximo si es necesario
        }
    });

    // Aplicar el ancho máximo a todos los elementos
    elementos.forEach(function(elemento) {
        elemento.style.minWidth = anchoMaximo + 'px';
    });

    //console.log('anchoMaximo: ',anchoMaximo);

}

















