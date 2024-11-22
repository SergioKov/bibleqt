//======================================//
//    _____                             //
//   / ____|            __ _  _         //
//  | (___   ___  _ __ / _` |(_) ____   //
//   \___ \ / _ \| '__| (_| || |/ _  \  //
//   ____) |  __/| |   \__, || | |_| |  //
//  |_____/ \___||_|   |___/ |_|\____/  //
//======================================//
//====================================================================//
//  C O N S T A N T A S
//====================================================================//

const eid_sel_lang = document.getElementById('sel_lang');
const eid_m_sel_lang = document.getElementById('m_sel_lang');

// prefijo 'eid_' se usa para lod elementos html con su id.

const eid_header = document.getElementById('header');
const eid_wrapper = document.getElementById('wrapper');
const eid_sidebar = document.getElementById('sidebar');

//Por defecto ancho de eid_sidebar
const def_w = eid_wrapper.offsetWidth * 0.3;//30%
eid_sidebar.style.width = def_w +'px';

const eid_sidebarInner = document.getElementById('sidebarInner');

const eid_vert_line = document.getElementById('vert_line');
const eid_container = document.getElementById('container');
const eid_containerInner = document.getElementById('containerInner');
const eid_headerContainer = document.getElementById('headerContainer');
const eid_wrCols = document.getElementById('wrCols');
const eid_trans1 = document.getElementById('trans1');
const eid_col1 = document.getElementById('col1');
const eid_footer = document.getElementById('footer');
const eid_footerInner = document.getElementById('footerInner');

const eid_btn_pageUp = document.getElementById('btn_pageUp');
const eid_btn_pageDown = document.getElementById('btn_pageDown');

const eid_menuTabs = document.getElementById('menuTabs');
const eid_nav_head = document.getElementById('nav_head');
const eid_nav_body = document.getElementById('nav_body');

// Get the computed style, including margins
const computedStyle = window.getComputedStyle(eid_sidebarInner);

const eid_inpt_nav = document.getElementById('inpt_nav');
const eid_hist_nav = document.getElementById('hist_nav');

const eid_act_trans_nav = document.getElementById('act_trans_nav');
const eid_act_trans_find = document.getElementById('act_trans_find');
const eid_act_trans_strong = document.getElementById('act_trans_strong');

const eid_wr_hist_nav = document.getElementById('wr_hist_nav');
const eid_wr_hist_find = document.getElementById('wr_hist_find');
const eid_wr_hist_strong = document.getElementById('wr_hist_strong');
const eid_wr_markers = document.getElementById('wr_markers');

const eid_hist_nav_regs = document.getElementById('hist_nav_regs');
const eid_hist_find_regs = document.getElementById('hist_find_regs');
const eid_hist_strong_regs = document.getElementById('hist_strong_regs');

const eid_wr_hist_nav_inner = eid_wr_hist_nav.querySelector('.wr_hist_inner');
const eid_wr_hist_find_inner = eid_wr_hist_find.querySelector('.wr_hist_inner');
const eid_wr_hist_strong_inner = eid_wr_hist_strong.querySelector('.wr_hist_inner');
const eid_wr_markers_inner = eid_wr_markers.querySelector('.wr_markers_inner');

const eid_s_book = document.getElementById('s_book');
const eid_s_chapter = document.getElementById('s_chapter');
const eid_s_verse = document.getElementById('s_verse');

const eid_v_book = document.getElementById('v_book');
const eid_v_chapter = document.getElementById('v_chapter');
const eid_v_verse = document.getElementById('v_verse');

const eid_bcv_line = document.getElementById('bcv_line');


const eid_inpt_find = document.getElementById('inpt_find');
const eid_hist_find = document.getElementById('hist_find');

const eid_inpt_strong = document.getElementById('inpt_strong');
const eid_hist_strong = document.getElementById('hist_strong');


const eid_wr_find_head = document.getElementById('wr_find_head');
const eid_find_head = document.getElementById('find_head'); 
const eid_find_result = document.getElementById('find_result');

const eid_find_body = document.getElementById('find_body');
const eid_wr_find_tabs = document.getElementById('wr_find_tabs');
const eid_partFindTabs = document.getElementById('partFindTabs');
const eid_wr_find_res_blocks = document.getElementById('wr_find_res_blocks');

const eid_gde = document.getElementById('gde');//select donde buscar
const eid_limit = document.getElementById('limit');//cuantos resultados de búsqueda mostrar en una página
const eid_cbox1 = document.getElementById('cbox1');//1. искомое содержит хотя бы одно слово ('Иисус Христос' или Иисус или Христос)
const eid_cbox2 = document.getElementById('cbox2');//2. cлова идут в заданном порядке
const eid_cbox3 = document.getElementById('cbox3');//3. искать точную фразу
const eid_cbox4 = document.getElementById('cbox4');//4. выражения не могут быть частями слов
const eid_cbox5 = document.getElementById('cbox5');//5. различать прописные и Заглавные буквы
const eid_cbox6 = document.getElementById('cbox6');//6. различать буквы с ударениями (если есть)
const eid_cbox7 = document.getElementById('cbox7');//7. Номер Стронга (если есть)

const eid_tsk_head = document.getElementById('tsk_head');
const eid_tsk_body = document.getElementById('tsk_body');

const eid_markers_head = document.getElementById('markers_head');
const eid_markers_porcentaje = document.getElementById('markers_porcentaje');
const eid_markers_body = document.getElementById('markers_body');

//botones
const eid_btn_nav = document.getElementById('btn_nav');
const eid_btn_tsk = document.getElementById('btn_tsk');
const eid_btn_find = document.getElementById('btn_find');
const eid_btn_ok_find = document.getElementById('btn_ok_find');
const eid_btn_ok_stop = document.getElementById('btn_ok_stop');
const eid_btn_strong = document.getElementById('btn_strong');

const eid_m_btn_loadAllFavBibleFiles = document.getElementById('m_btn_loadAllFavBibleFiles');
const eid_m_btn_loadAllFavTskFiles = document.getElementById('m_btn_loadAllFavTskFiles');
const eid_m_btn_loadAllFavStrongFiles = document.getElementById('m_btn_loadAllFavStrongFiles');

const eid_m_bl_cookies = document.getElementById('m_bl_cookies');

//const eid_sel_modules = document.getElementById('sel_modules');//?..


const eid_btn_sp_atras = document.getElementById('btn_sp_atras');
const eid_h4_text = document.getElementById('h4_text');//text en el header de modcont_header


const eid_vklad_nav = document.getElementById('vklad_nav');
const eid_vklad_find = document.getElementById('vklad_find');
const eid_vklad_tsk = document.getElementById('vklad_tsk');
const eid_vklad_strong = document.getElementById('vklad_strong');
const eid_vklad_markers = document.getElementById('vklad_markers');


const eid_btn_hideShowSidebar = document.getElementById('btn_hideShowSidebar');
const eid_btn_hideShowFooter = document.getElementById('btn_hideShowFooter');
const eid_btn_changePositionShowHeader = document.getElementById('btn_changePositionShowHeader');
const eid_btn_changePositionShowModal = document.getElementById('btn_changePositionShowModal');
const eid_btn_ok = document.getElementById('btn_ok');

const eid_btnStrong = document.getElementById('btnStrong');
const eid_m_btnStrong = document.getElementById('m_btnStrong');//menu tres puntos en mobile

const eid_wr_strong_head = document.getElementById('wr_strong_head');
const eid_strong_head = document.getElementById('strong_head');
const eid_strong_body = document.getElementById('strong_body');

const eid_partDeskTabs = document.getElementById('partDeskTabs');


//start - modal.js
const eid_myModal = document.getElementById('myModal');
const eid_myModalContent = document.getElementById('myModalContent');

const eid_modcont_header = document.getElementById('modcont_header');
const eid_modcont_body = document.getElementById('modcont_body');
const eid_modcont_footer = document.getElementById('modcont_footer');

const eid_bl_modalTop = document.getElementById('bl_modalTop');
const eid_bl_modalCenter = document.getElementById('bl_modalCenter');
const eid_bl_modalBottom = document.getElementById('bl_modalBottom');
const eid_bl_modalFull = document.getElementById('bl_modalFull');

const eid_bl_modalTopInner = document.getElementById('bl_modalTopInner');
const eid_bl_modalCenterInner = document.getElementById('bl_modalCenterInner');
const eid_bl_modalBottomInner = document.getElementById('bl_modalBottomInner');
const eid_bl_modalFullInner = document.getElementById('bl_modalFullInner');
//end - modal.js


const eid_bl_register_form = document.getElementById('bl_register_form');
const eid_bl_email_form = document.getElementById('bl_email_form');
const eid_bl_change_email_form = document.getElementById('bl_change_email_form');
const eid_bl_sesion_iniciada = document.getElementById('bl_sesion_iniciada');
const eid_bl_login_form = document.getElementById('bl_login_form');
const arrIdForms = [
    'bl_register_form',
    'bl_email_form',
    'bl_change_email_form',
    'bl_login_form',
    'bl_sesion_iniciada'
];

const eid_login_menu = document.getElementById('login_menu');
const eid_m_login_menu = document.getElementById('m_login_menu');


//====================================================//
//Medidas de pantallas para Media Queries - START
//====================================================//

//MOBILE (0px - 767px)
//const pantallaMobileMinPx = 0;//por ahora no lo uso...
//const pantallaMobileMaxPx = 575;//por ahora no lo uso...
const pantallaMobileMaxPx = 767;//por ahora no lo uso...

//TABLET (768px - )
let pantallaTabletMinPx = 768;//valor de tablet y mas (se usa muchisimo!)
//let pantallaTabletMaxPx = 991;//no uso


//let pantallaDesktopSmallMinPx = 992;//no uso
let pantallaTabletMaxPx = 1023;//uso 1 vez!

let pantallaDesktopSmallMinPx = 1024;//uso 1 vez
//let pantallaDesktopSmallMaxPx = 1199;// no uso

//let pantallaDesktopBigMinPx = 1200;//no uso

//Para ver en tablet verticalmente como en móvil
let modoMobile = false;//[true,false]//para ver como si fuera el móvil en tablet 

if(modoMobile){
    pantallaTabletMinPx = 1201;//pongo 1201 y no 1200 ya qye Samsung tab A9+ verticalmente es de 1200
    pantallaTabletMaxPx = 1439;//uso 1 vez
    pantallaDesktopSmallMinPx = 1439;//uso 1 vez
}
//====================================================//
//Medidas de pantallas para Media Queries - END
//====================================================//



const countMaxTransInCols = 10;//por defecto cantidad maxima de trans en columnas al addTrans()

let obj_ajustes_def = {};//todos los ajustes del usuario 
let obj_ajustes = {};//todos los ajustes del usuario
let obj_ajustes_is_loaded = false;//por defecto false, se cambia a true al descargarse de bd

obj_ajustes.verseCompare = {
    wr_filter: {
        display: 'none'
    },
    btn_lang_all: {
        display: 'block',
        class: 'btn',
        stateActive: true
    },
    one_lang: {
        checked: false
    },
    many_lang: {
        checked: true
    },
    btn_show_refs: {
        display: 'block',
        classText: 'btn',
        stateActive: false
    },
    a_ref: {
        display: 'none'
    },
    arr_lang_act: [],
    arr_lang_noact: [],
    arr_trans_act: [],
    arr_trans_noact: [],

    aaa: 'aaa'
};
//console.log(obj_ajustes);




const obj_ref = {
    "input": {
        "trans": null,
        "divtrans": null,
        "EnglishPsalms": null,
        "ref": null,
        "book": null,
        "chapter": null,
        "verse": null,
        "to_verse": null
    },
    "rus": {
        "trans": null,
        "ShortName": null,
        "ref": null,
        "book": null,
        "chapter": null,
        "verse": null,
        "to_verse": null
    },
    "esp": {
        "trans": null,
        "ShortName": null,
        "ref": null,
        "book": null,
        "chapter": null,
        "verse": null,
        "to_verse": null
    }
};

//objeto de ficheros de todas las traducciones de Biblia cargados como text
const obj_bible_files = {};

//objeto de ficheros de Strong
const obj_strong_files = {};

//objeto de ficheros de Tsk
const obj_tsk_files = {};










//====================================================================//
//  V A R I A B L E S
//====================================================================//

//variable para crear arrFavTransObj
let arrFavTransDef = [
    "rstStrongRed",
    "rstt",
    "rsti2",
    "rstm",
    //"rstStrong_rv60",
    "abi",
    "nrt",
    "mdri",
    "rsp",
    "rbo15",
    "rob",
    "opnz",
    
    "ukr_fil",
    "ukr_ogi",
    "ukr_ogi88",
    "ukr_hom",
    "ukr_gyz",
    "ukr_tur",
    "ukr_tur2",
    "ukr_kul",
    "ukr_umts",
    "ukr_der",
    
    "rv60",
    "lbla"

    //"kjv",
    //"nkjv",
];

let arrFavTrans = arrFavTransDef;

let arrFavTsk = [
    'tsk'//carpeta donde están ficheros '01_genesis.ini' para TSK
];

let positionShow = 'col';//por defecto posicion de columnas
let vkladkiInMobShow = true;//por defecto se muestran tabs (vkladki, arrTabs) en mobiles 

//por defecto true
let enable_maxWidthCol = true;//true,false
let maxWidthCol = 350;//ancho de columna para leer cómodamente como en periódico

//por defecto false
let enable_IMGx2 = false;//true, false //mostrar width: 200% en imagenes dentro de colsInner
let scrollLeftVal = 0;//por defecto img está a la izda


//por defecto false. otras trans no están minimizadas y se ven como antes
//si se pone a true => se ve sólo una trans que es trans_base (trans1), las demás se ocultan
let minOtrasTrans = false;//true,false

let obj_nav = {
    trans: '',
    divtrans: '',
    book_short_name: '',
    id_book: '',
    show_chapter: '',
    show_verse: '',
    show_to_verse: ''
} 

let arrTabs = [];//array de objetos de tabs (Vkladki)
let arrTabs_is_loaded = false;//por defecto false, se cambia a true al descargarse de bd

//array de objetos de historia de navegacion
let arr_hist_nav = [];//se añade en addRefToHistNav();
let arr_hist_nav_limit = 200;//limit de tener items en el historial
let arr_hist_nav_is_loaded = false;//por defecto false, se cambia a true al descargarse de bd

//array de objetos de historia de navegacion
let arr_hist_find = [];//se añade en addWordsToHistFind();
let arr_hist_find_limit = 200;//limit de tener items en el historial
let arr_hist_find_is_loaded = false;//por defecto false, se cambia a true al descargarse de bd

//array de objetos de historia de StrongNumber's
let arr_hist_strong = [];//se añade en addStrongNumberToHistStrong();
let arr_hist_strong_limit = 200;//limit de tener items en el historial
let arr_hist_strong_is_loaded = false;//por defecto false, se cambia a true al descargarse de bd

//array de objetos de historia de navegacion
let arr_markers = [];//se añade en addRefToHistNav();
let arr_markers_limit = 200;//limit de tener items en el historial
let arr_markers_is_loaded = false;//por defecto false, se cambia a true al descargarse de bd

//by_text es mas rápido y más optimizado
// en funcion showChaptertext4() hay 2 vias
//'by_text' (old): getting all file '01_genesis.htm' and making array with .split() and showing only needed verses,
//'by_json' (new): por php solo el capitulo
let modo_fetch_verses_for_cols = 'by_text';//by_json, by_text
//console.log('modo_fetch_verses_for_cols: ',modo_fetch_verses_for_cols);

//'by_text' (old): getting all file and making array with .split() and showing only needed verses,
//'by_json' (new): por php solo el capitulo
let modo_fetch_verses_for_tsk_block = 'by_text';//by_json, by_text
//console.log('modo_fetch_verses_for_tsk_block: ',modo_fetch_verses_for_tsk_block);

//'by_text' (old): getting all file and showing only needed verses, //creado después
//'by_json' (new): getting only verses to show by json (lento)//creado primero
let modo_fetch_verses_compare = 'by_text';//by_json, by_text
//console.log('modo_fetch_verses_compare: ',modo_fetch_verses_compare);

let modo_get_VerseQty = 'por_json';//'por_json' o 'por_text' en function sel(). default 'por_json'

//crear obj_tsk_files[tskName].Books[book] = {'fileName': tsk.Books[book].PathName, 'fileContent': tskModule}
//para sacar refs de links TSK sin cargarlos por fetch
let crear_objeto_obj_tsk_files = true;//true, false
//console.log('crear_objeto_obj_tsk_files: ',crear_objeto_obj_tsk_files);

//crear obj_bible_files[Translation].Books[bookNumber] = {'fileName': bq.Books[bookNumber].PathName, 'fileContent': bookModule}
//para sacar textos de libros sin cargarlos por fetch
let crear_objeto_obj_bible_files = true;//true, false
//console.log('crear_objeto_obj_bible_files: ',crear_objeto_obj_bible_files);

let trans_base = eid_trans1.dataset.trans;//la trans base de #trans1

let allowUseShowTrans = true;//permitir o no usar function showTrans()
//console.log('al iniciar --- allowUseShowTrans: ',allowUseShowTrans);

let strongAction = null;

let arr_verses_compare = [];
let arr_verses_lang = [];

let is_loading_def_functions = false;//por defecto . para no llamar 2 veces a loadDefaultFunctions()

let rechazar_cookies;
//rechazar_cookies = true;
rechazar_cookies = false;



obj_ajustes.lang = lang;

obj_ajustes_def = obj_ajustes;