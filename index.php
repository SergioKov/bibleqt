<?php 
session_start();
?>
<!DOCTYPE html>
<html lang="es">
<head>
<!-- header('Content-type: text/html; charset=utf-8');-->
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BQ</title>
    <link rel="icon" type="image/png" href="./images/bq.png">
    <link href='https://fonts.googleapis.com/css?family=Muli' rel='stylesheet'>    

    <link rel="stylesheet" href="./css/bible_app.css">
    <link rel="stylesheet" href="./css/bible_app_resp.css">
   
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Oswald&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital@1&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Archivo+Narrow:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&family=Open+Sans:wght@300&family=Raleway:wght@100&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&family=Roboto+Slab:wght@100..900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Roboto+Slab:wght@100..900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Arimo:ital,wght@0,400..700;1,400..700&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=PT+Sans+Narrow:wght@400;700&family=Roboto+Serif:ital,opsz,wght@0,8..144,100..900;1,8..144,100..900&display=swap" rel="stylesheet">

</head>
<body>

    <div id="header">

        <div id="headerMain">
            <div id="headerMainInner" class="headerFlex">               
                
                <div id="bl_headerBtns">
                    
                    <div id="btn_hideShowSidebar" class="dbtn" title="Hide or Show sidebar" onclick="hideShowSidebar()">
                        <div>Hide</div>
                    </div>

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

                    <div id="btn_chapterGoPrev" class="dbtn" title="Previous chapter" onclick="chapterGo('prev')">
                        <img src="images/arrow_chevron_left_white.svg">                            
                    </div>
                    <div id="btn_chapterGoNext" class="dbtn" title="Next chapter" onclick="chapterGo('next')">
                        <img src="images/arrow_chevron_right_white.svg">
                    </div>

                    <div class="dbtn" title="History previous register" onclick="hist('prev')">
                        <div>< H</div>
                    </div>
                    <div class="dbtn" title="History next register. function in development..." onclick="hist('next')">
                        <div>H ></div>
                    </div>                        

                    <div id="btn_changePositionShowHeader" class="dbtn" title="Change position: Columns or Rows" onclick="changePositionShow()">
                        <div>Row</div>
                    </div>
                    <div id="btnStrong" class="dbtn" title="Show / Hide Strong Numbers" onclick="showHideStrongNumbers()">
                        <div>S#</div>
                    </div>
                    <div id="btnMinOtrasTrans" class="dbtn" title="Minimizar Otras Trans" onclick="enableDesableMinOtrasTrans()">
                        <div>Tr_m</div>
                    </div>
                    <div id="btnMaxWidthCol" class="dbtn" title="Habilitar/Deshabilitar ancho máximo de una columna" onclick="enableDesableMaxWidthCol()">
                        <div>mwC</div>
                    </div>

                    <div style="display: none;">
                        (<span class="test_font_hebrew">ָאֱלֹהִים</span>)
                        (<span class="test_font_greek">λόγος</span>)
                    </div>


                    
                </div>


                <div class="wr_menu_r">
                    <h3>BQ</h3>    
                    <div id="login_menu" title="login" onclick="openModal('top','Login',null,'showLogin')">
                        <img src="images/login2_white.svg">
                    </div>
                    <div id="tres_puntos_menu" title="menu..." onclick="openModal('top','Меню',null,'showMenu')">
                        <img src="images/tres_puntos2_white.svg">
                    </div>
                </div>

            </div>
        </div>

    </div>



    
    <div id="wrapper">

        <div id="sidebar">
            <div id="sidebarInner">

                <div id="menuTabs">
                    <div id="menuTabsInner">
                        
                        <div id="arrowBack" onclick="closeSidebar(this)">
                            <img class="f_l" src="images/arrow_left2_white.svg">
                        </div>

                        <div id="restoTabs" class="f_r">                    
                            <div class="wr_btns_scr f_l">
                                <button id="btn_nav" class="btn btn_active" onclick="showTab(this,'nav')" title="Навигация">
                                    <img class="btn_img" src="./images/open_book_white.png">
                                </button>
                                <button id="btn_find" class="btn" onclick="showTab(this,'find')" title="Поиск">
                                    <img class="btn_img" src="./images/search_zoom_icon_white.svg">
                                </button>
                                <button id="btn_tsk" class="btn" onclick="showTab(this,'tsk')" title="TSK - Перекрестные Ссылки">
                                    <img class="btn_img" src="./images/book_reference_white.svg">
                                </button>
                                <button id="btn_strong" class="btn" onclick="showTab(this,'strong')" title="Словарь Стронга">
                                    <span>S#</span>
                                </button>
                                <button id="btn_markers" class="btn" onclick="showTab(this,'markers')" title="Маркеры / Закладки">
                                    <img class="btn_img" src="./images/book_marker_white.svg">
                                </button>
                                <button id="btn_comm" class="btn d-none" onclick="" title="Комментарии">Comm</button>
                                <button id="btn_dic" class="btn d-none" onclick="" title="Словари">Dic</button>
                            </div>
                        </div>

                        <div id="closeBack" onclick="closeSidebar(this)">
                            <div>&#10005;</div><!--X-->
                        </div>

                    </div>
                </div>
                    
                <div id="vklad_nav" class="vklads" style="display: block;">
                    <div id="nav_head">
                        <div class="wr_nav">
                            <div class="wr_inpt_x">
                                <input 
                                    id="inpt_nav" 
                                    data-trans="" 
                                    data-divtrans="" 
                                    data-book_short_name="Ин." 
                                    data-id_book="42" 
                                    data-show_chapter="" 
                                    data-show_verse="" 
                                    data-show_to_verse=""
                                    type="text" 
                                    value="Ин."
                                >
                                <div id="clear_inpt" onclick="clear_inpt('nav')">&times;</div>
                            </div>
                            <div id="hist_nav" onclick="hideShowHistNav()">
                                <img src="./images/history_icon_white.svg">
                            </div>
                            <button id="btn_ok" class="btn f_r" onclick="getRef(document.querySelector('#inpt_nav').dataset.trans)">
                                <img class="btn_img" src="./images/search_zoom_icon_white.svg"><!--OK-->
                            </button>
                        </div>
                        
                        <div id="wr_hist_nav" style="display:none;">
                            <div class="wr_hist_inner"></div>
                        </div>

                        <div id="wr_act_trans_nav">
                            <div id="act_trans_nav" onclick="openModalForActTrans()">
                                RST+r
                            </div>
                        </div>

                        <div class="wr_bcv">
                            <div id="s_book" class="v_bcv bcv_active" onclick="sel(this,'b',null,document.querySelector('#inpt_nav').dataset.trans)">
                                <div>Книга</div>
                            </div> 
                            <div id="s_chapter" class="v_bcv" onclick="sel(this,'ch',null,document.querySelector('#inpt_nav').dataset.trans)">
                                <div>Глава</div>
                            </div> 
                            <div id="s_verse" class="v_bcv" onclick="sel(this,'v',null,document.querySelector('#inpt_nav').dataset.trans)">
                                <div>Стих</div>
                            </div>
                            <div class="break"></div>
                            <div class="wr_bcv_line">
                                <div id="bcv_line"></div>
                            </div>
                        </div>

                    </div>

                    <div id="nav_body">
                        <div class="wr_bcv_uls">                    
                            <ul id="v_book" class="wr_lis ul_active">
                                <li class="v_li v_li_active">Быт.</li> 
                            </ul>
                            <ul id="v_chapter" class="wr_lis">
                                <li class="v_li">1</li> 
                            </ul>
                            <ul id="v_verse" class="wr_lis">
                                <span class="prim_verse">html: Antes de seleccionar el versículo, selecciona el capítulo por favor.</span> 
                            </ul>
                        </div>
                    </div>
                </div><!--/vklad_nav-->

                <div id="vklad_find" class="vklads" style="display: none;">
                    <div id="wr_find_head">
                        <div class="wr_nav">
                            <div class="wr_inpt_x">
                                <input id="inpt_find" placeholder="Введите слово или фразу..." value="">
                                <div id="clear_inpt" onclick="clear_inpt('find')">&times;</div>
                            </div>
                            <div id="hist_find" onclick="hideShowHistFind()">
                                <img src="./images/history_icon_white.svg">
                            </div>
                            <button id="btn_ok_find" class="btn f_r" onclick="findWords(this.parentElement.querySelector('input').value)">
                                <img class="btn_img" src="./images/search_zoom_icon_white.svg"><!--Find-->
                            </button>
                            <button id="btn_ok_stop" class="btn f_r d-none" onclick="stopFindWords()">
                                Stop
                                <!--<img class="btn_img" src="./images/stop4.png">--><!--Stop-->
                            </button>
                        </div>

                        <div id="find_head">
                            
                            <div id="wr_hist_find" style="display:none;">
                                <div class="wr_hist_inner"></div>
                            </div>

                            <div id="wr_act_trans_find">
                                <div id="act_trans_find" onclick="openModalForActTrans()">
                                    RST+r
                                </div>
                            </div>

                            <div class="wr_op">
                                <div class="bl_trig title_par" onclick="hideShowFindParams()">
                                    Параметры поиска:
                                    <img src="images/icon_razvernut.png">
                                    <span class="trans_name"></span>
                                </div>

                                <div class="bl_trig bl_par" style="display:none;">

                                    <div class="wr_sel">
                                        <select id="gde">
                                            <option value="TB">ВСЯ БИБЛИЯ</option>
                                            <option value="AT">ВЕТХИЙ ЗАВЕТ</option>
                                            <option value="NT">НОВЫЙ ЗАВЕТ</option>
                                            <option disabled></option>

                                            <optgroup label="Категории">
                                                <option disabled>--- Ветхий Завет ---</option>
                                                <option value="M">#Пятикнижье</option>
                                                <option value="Hist">#Исторические книги</option>
                                                <option value="Poet">#Поэтические книги</option>
                                                <option value="Prof">#Пророки (Болшие и Малые)</option>
                                                <option value="ProfB">#Большие Пророки</option>
                                                <option value="ProfM">#Малые Пророки</option>
                                                <option disabled></option>
                                                <option disabled>--- НовыйЗавет ---</option>
                                                <option value="EvActs">#Евангелия и Деяния</option>
                                                <option value="EpPablo">#Послания Павла</option>
                                                <option value="EpSoborn">#Соборные Послания</option>
                                                <option value="Apocrif">#Неканонические книги</option>
                                            </optgroup>
                                            <option disabled></option>
                                            
                                            <optgroup label="Пятикнижье">
                                                <option value="0" sel-ected>Бытие</option>
                                                <option value="1">Исход</option>
                                                <option value="2">Левит</option>
                                                <option value="3">Числа</option>
                                                <option value="4">Второзаконие</option>
                                            </optgroup>
                                            <option disabled></option>
                                            
                                            <optgroup label="Исторические книги">
                                                <option value="5">Иисус Навин</option>
                                                <option value="6">Судьи</option>
                                                <option value="7">Руфь</option>
                                                <option value="8">1 Царств</option>
                                                <option value="9">2 Царств</option>
                                                <option value="10">3 Царств</option>
                                                <option value="11">4 Царств</option>
                                                <option value="12">1 Паралипоменон</option>
                                                <option value="13">2 Паралипоменон</option>
                                                <option value="14">Ездра</option>
                                                <option value="15">Неемия</option>
                                                <option value="16">Есфирь</option>
                                            </optgroup>
                                            <option disabled></option>
                                            
                                            <optgroup label="Поэтические книги">
                                                <option value="17">Иов</option>
                                                <option value="18">Псалтирь</option>
                                                <option value="19">Притчи</option>
                                                <option value="20">Екклесиаст</option>
                                                <option value="21">Песни Песней</option>
                                            </optgroup>
                                            <option disabled></option>
                                            
                                            <optgroup label="Большие Пророки">
                                                <option value="22">Исаия</option>
                                                <option value="23">Иеремия</option>
                                                <option value="24">Плач Иеремии</option>
                                                <option value="25">Иезекииль</option>
                                                <option value="26">Даниил</option>
                                            </optgroup>
                                            <option disabled></option>

                                            <optgroup label="Малые Пророки">
                                                <option value="27">Осия</option>
                                                <option value="28">Иоиль</option>
                                                <option value="29">Амос</option>
                                                <option value="30">Авдий</option>
                                                <option value="31">Иона</option>
                                                <option value="32">Михей</option>
                                                <option value="33">Наум</option>
                                                <option value="34">Аввакум</option>
                                                <option value="35">Софония</option>
                                                <option value="36">Аггей</option>
                                                <option value="37">Захария</option>
                                                <option value="38">Малахия</option>
                                            </optgroup>
                                            <option disabled></option>
                                            
                                            <optgroup label="Евангелия">
                                                <option value="39">Матфея</option>
                                                <option value="40">Марка</option>
                                                <option value="41">Луки</option>
                                                <option value="42">Иоанна</option>
                                            </optgroup>
                                            <option disabled></option>

                                            <optgroup label="Деяния">
                                                <option value="43">Деяния</option>
                                            </optgroup>
                                            <option disabled></option>

                                            <optgroup label="Послания Павла">
                                                <option value="44">Римлянам</option>
                                                <option value="45">1 Коринфянам</option>
                                                <option value="46">2 Коринфянам</option>
                                                <option value="47">Галатам</option>
                                                <option value="48">Ефесянам</option>
                                                <option value="49">Филиппийцам</option>
                                                <option value="50">Колоссянам</option>
                                                <option value="51">1 Фессалоникийцам</option>
                                                <option value="52">2 Фессалоникийцам</option>
                                                <option value="53">1 Тимофею</option>
                                                <option value="54">2 Тимофею</option>
                                                <option value="55">Титу</option>
                                                <option value="56">Филимону</option>
                                                <option value="57">Евреям</option>
                                            </optgroup>
                                            <option disabled></option>

                                            <optgroup label="Соборные Послания">
                                                <option value="58">Иакова</option>
                                                <option value="59">1 Петра</option>
                                                <option value="60">2 Петра</option>
                                                <option value="61">1 Иоанна</option>
                                                <option value="62">2 Иоанна</option>
                                                <option value="63">3 Иоанна</option>
                                                <option value="64">Иуды</option>
                                            </optgroup>
                                            <option disabled></option>

                                            <optgroup label="Откровение">
                                                <option value="65">Откровение</option>
                                            </optgroup>
                                            <option disabled></option>
                                        </select>
                                        <select id="limit">
                                            <!-- <option value="5">5</option> -->
                                            <!-- <option value="10">10</option> -->
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                            <option value="200">200</option>
                                            <option value="300">300</option>
                                            <option value="*">*</option>
                                        </select>
                                    </div>

                                    <p>
                                        <label>
                                            <input id="cbox1" type="checkbox" onclick="cboxChange(this)"> 
                                            <span>1. Искомое содержит хотя бы одно слово</span>
                                            <span class="tooltip" data-tooltip="Пример: найти не только стихи, содержащие 'Иисус Христос', но и те, которые содержат 'Иисус' или 'Христос'." onmouseenter="showTooltip(this)" onmouseleave="hideTooltip(this)">*</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input id="cbox2" type="checkbox" onclick="cboxChange(this)" value=""> 
                                            <span>2. Cлова идут в заданном порядке</span>
                                            <span class="tooltip" data-tooltip="Пример: найти стихи, где встречается 'Иисус Христос', но не 'Христос Иисус'." onmouseenter="showTooltip(this)" onmouseleave="hideTooltip(this)">*</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input id="cbox3" type="checkbox" onclick="cboxChange(this)" value=""> 
                                            <span>3. Искать точную фразу</span>
                                            <span class="tooltip" data-tooltip="Пример: найти стихи, где есть 'Благословен Бог', но не 'Благословен ГОСПОДЬ Бог'." onmouseenter="showTooltip(this)" onmouseleave="hideTooltip(this)">*</span>

                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input id="cbox4" type="checkbox" onclick="cboxChange(this)" value=""> 
                                            <span>4. Выражения не могут быть частями слов</span>
                                            <span class="tooltip" data-tooltip="Пример: найти стихи, где есть 'благословен', но не 'благословенИЕ'." onmouseenter="showTooltip(this)" onmouseleave="hideTooltip(this)">*</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input id="cbox5" type="checkbox" onclick="cboxChange(this)" value=""> 
                                            <span>5. Различать прописные и ЗАГЛАВНЫЕ буквы</span>
                                            <span class="tooltip" data-tooltip="Пример: различать при поиске слова 'БОГ' и 'бог'." onmouseenter="showTooltip(this)" onmouseleave="hideTooltip(this)">*</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input id="cbox6" type="checkbox" onclick="cboxChange(this)" value=""> 
                                            <span>6. Различать буквы с ударениями (если есть)</span>
                                            <span class="tooltip" data-tooltip="Пример: различать при поиске слова 'creó' (сотворил) и 'creo' (верю)." onmouseenter="showTooltip(this)" onmouseleave="hideTooltip(this)">*</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input id="cbox7" type="checkbox" onclick="cboxChange(this)" value=""> 
                                            <span>7. Искать только номер Стронга (если есть)</span>
                                            <span class="tooltip" data-tooltip="Пример: Искать толко номер Стронга <S>H430</S> (Бог) в модулях, где он есть." onmouseenter="showTooltip(this)" onmouseleave="hideTooltip(this)">*</span>

                                        </label>
                                    </p>                                    
                                </div>                                
                            </div><!--/wr_op-->
                        </div><!--/find_head-->
                        <div id="find_result"></div>
                    </div><!--/wr_find_head-->
                    <div id="find_body">
                        <span class="prim_tsk">Introduce el texto para buscar y si quieres aplica los parámetros del filtro.</span>
                    </div>
                </div><!--/vklad_find-->

                <div id="vklad_tsk" class="vklads" style="display: none;">
                    <div id="tsk_head">
                        <h4>TSK - Перекрестные Ссылки</h4>
                    </div>
                    <div id="tsk_body">
                        <span class="prim_tsk">Para ver pasajes paralelos del versículo, presiona la referencia. Por ejemplo: Gen.1:1</span>
                    </div>
                </div><!--/vklad_tsk-->

                <div id="vklad_strong" class="vklads" style="display: none;">
                    
                    <div id="wr_strong_head">
                        <div class="wr_nav">
                            <div class="wr_inpt_x">
                                <input id="inpt_strong" value="G3056">
                                <div id="clear_inpt" onclick="clear_inpt('strong')">&times;</div>
                            </div>
                            
                            <div id="hist_strong" onclick="hideShowHistStrong()">
                                <img src="./images/history_icon_white.svg">
                            </div>

                            <button id="btn_ok_strong" class="btn f_r" onclick="getStrongNumber(this.parentElement.querySelector('.wr_inpt_x input').value)">
                                <img class="btn_img" src="./images/search_zoom_icon_white.svg"><!--Strong-->
                            </button>
                        </div>
                        <div id="strong_head">
                            <div id="wr_hist_strong" style="display:none;">
                                <div class="wr_hist_inner"></div>
                            </div>

                            <div id="wr_act_trans_strong">
                                <div id="act_trans_strong" onclick="openModalForActTrans()">
                                    RST+r
                                </div>
                            </div>

                        </div>
                    </div>

                    <div id="strong_body">
                        <span class="prim_tsk">Introduce el número de Strong para ver su significado y dónde se encuenta.</span>
                    </div>
                </div><!--/vklad_strong-->

                <div id="vklad_markers" class="vklads" style="display: none;">
                    <div id="markers_head">
                        <h4>Маркеры / Закладки</h4>
                        <span id="markers_porcentaje">45/100</span>
                    </div>
                    <div id="markers_body">
    
                        <div id="wr_markers">
                            <div class="wr_markers_inner"></div>
                        </div>                   
                    
                    </div>
                </div><!--/vklad_markers-->




            </div><!--/sidebarInner-->
        </div>
        
        <div id="v_line"></div>

        <div id="container">
            <div id="containerInner">



                <div id="headerContainer">
                    <div id="headerContainerInner">

                        <noscript>
                            <p>Por favor, activa JavaScript para ver este sitio web correctamente.</p>
                        </noscript>

                        <div class="partDesk">
                            <div class="partDeskInner">
                            
                                <div id="partDeskTabs">
                                    <!--
                                    <div id="tab1" class="tabs tab_active" style="display:none;">
                                        <span>Рим.10:17</span>
                                    </div>
                                    -->
                                </div>

                                <div id="partDeskPlus">
                                    <button id="btnPlus" class="btn" onclick="addTab(null,null,null,'tab_new')"> + </button>
                                </div>
                            
                            </div>
                        </div>

                        <div class="partMob" style="display:none;">
                            <div class="partMobInner">

                                <button class="btnMenu btn btn_svg" data-typebtn="transMenu" onclick="openSidebar(this)"><img src="images/menu_white.svg"></button>
                                <button class="btn btn_svg" onclick="chapterGo('prev')" title="Previous Chapter"><img src="images/arrow_chevron_left_white.svg"></button>
                                
                                <div class="centralPart">
                                    <button class="btn" title="Избранныe модули Библии" onclick="openModal('full','Избранныe модули Библии',document.querySelector('#trans1.colsHead'),'showModules')">
                                        <span class="mob_trans">RST+r</span>
                                    </button>
                                    <div class="separ_line"></div>
                                    <button class="btn" data-typebtn="transRef" onclick="showTabMob('#btn_nav','nav',this)" title="Навигация. Выбор книги, главы, стиха">
                                        <span>Быт. 1:1</span>
                                    </button>
                                </div>
                                
                                <button class="btn btn_svg" onclick="chapterGo('next')" title="Next Chapter"><img src="images/arrow_chevron_right_white.svg"></button>
                                <button class="btn btn_svg" title="Меню" onclick="openModal('top','Меню',null,'showMenu')"><img src="images/tres_puntos2_white.svg" style="width:24px;"></button>

                            </div>
                        </div>


                    </div>
                </div>

                <div id="wrPageBtns" style="position:relative;z-index: 1;/* background: red; */">
                                        
                    <button id="btn_pageUp" onclick="pageUp()"><img src="images/arrow_chevron_down_white.svg"></button>
                    <button id="btn_pageDown" onclick="pageDown()"><img src="images/arrow_chevron_down_white.svg"></button>
                                        
                </div>

                                
                <div id="wrCols">
               
                    <div id="col1" class="cols">
                        <div id="trans1" class="colsHead" data-trans="rstStrongRed" data-base_ep="N">
                            <div class="colsHeadInner">

                                <div class="partDesk">

                                    <div class="wr_desk_trans">

                                        <button class="btn btn_svg" onclick="chapterGo('prev')" title="Previous Chapter"><img src="images/arrow_chevron_left_white.svg"></button>

                                        <div class="centralPart" title="Избранныe модули Библии" onclick="openModal('full','Избранныe модули Библии',document.querySelector('#trans1.colsHead'),'showModules')">
                                            <div class="desk_trans">RST</div>
                                            <div class="separ_line"></div>
                                            <div class="desk_sh_link">Gn. 1:1</div>
                                        </div>


                                        <button class="btn btn_svg" onclick="chapterGo('next')" title="Next Chapter"><img src="images/arrow_chevron_right_white.svg"></button>

                                    </div>

                                </div>

                                <div class="partMob">
                                    <div class="partMobInner">

                                        <button class="btnMenu btn btn_svg" data-typebtn="transMenu"  onclick="openSidebar(this)"><img src="images/menu_white.svg"></button>
                                        <button class="btn btn_svg" onclick="chapterGo('prev')" title="Previous Chapter"><img src="images/arrow_chevron_left_white.svg"></button>
                                        
                                        <div class="centralPart">
                                            <button class="btn" title="Избранныe модули Библии" onclick="openModal('full','Избранныe модули Библии',document.querySelector('#trans1.colsHead'),'showModules')">
                                                <span class="mob_trans">RST+r</span>
                                            </button>
                                            <div class="separ_line"></div>
                                            <button class="btn" data-typebtn="transRef" onclick="showTabMob('#btn_nav','nav',this)" title="Навигация. Выбор книги, главы, стиха">
                                                <span class="mob_sh_link">Быт. 1:1</span>
                                            </button>
                                        </div>
                                        
                                        <button class="btn btn_svg" onclick="chapterGo('next')" title="Next Chapter"><img src="images/arrow_chevron_right_white.svg"></button>
                                        <button class="btn btn_svg" title="Меню" onclick="openModal('top','Меню',null,'showMenu')"><img src="images/tres_puntos2_white.svg" style="width:24px;"></button>
                                        
                                    </div>
                                </div>
                            
                            </div><!--/colsHeadInner-->
                        </div><!--/colsHead-->
                        <div class="colsInner">
                            <p>Cargando la Biblia... </p> 

                            


                            <p id="ukr_umts__0__1__2" data-verse="2" style="display: none;">
                                <a href="#">Бут.1:2</a> 
                                <span class="vt">
                                    <span>земля була <button id="myButton">myButton</button> безформна та порожня. Земля знаходилася у морській безодні, а темрява огортала воду. Дух Божий, неначе буря, носився над водами. </span>
                                    
                                    
                                    <span class="wr_tooltip" onclick="hideShowComment(event)">
                                        <span class="tooltip" data-tooltip=" <em>морській безодні </em>Або «була вкрита глибоким океаном». <em>Дух Божий </em>Тут можливі також інші переклади «Вітер Божий» або «Потужний вітер». ">
                                            <span class="asterisco">*</span>
                                            <span class="trik d-none"></span>
                                        </span>
                                        <span class="comment d-none">
                                            <span class="commentInner">
                                                <span class="close" onclick="close_comment_x(this.parentElement.parentElement.parentElement, event)">&#10005;</span><!--X-->
                                                <span class="text">
                                                    <em>морській безодні </em>Або «була вкрита глибоким океаном». <a href="#" onclick="getRefByBibleRef('Исх. 3 6')">Исх. 3 6 </a>Тут можливі також інші переклади «Вітер Божий» або «Потужний вітер».Або «була вкрита глибоким океаном». <em>Дух Божий </em>Тут можливі також інші переклади «Вітер Божий» або «Потужний вітер».Або «була вкрита глибоким океаном». <em>Дух Божий </em>Тут можливі також інші переклади «Вітер Божий» або «Потужний вітер».
                                                </span>
                                            </span>
                                        </span>
                                    </span>


                                    <span> (продолжение) земля була безформна та порожня. Земля знаходилася у морській безодні, а темрява огортала воду </span>


                                    <span class="wr_tooltip" onclick="hideShowComment(event)">

                                        <span class="tooltip" data-tooltip=" <em>морській безодні </em>Або «була вкрита глибоким океаном». <em>Дух Божий </em>Тут можливі також інші переклади «Вітер Божий» або «Потужний вітер». ">
                                            <span class="asterisco">*</span>
                                            <span class="trik d-none"></span>
                                        </span>
                                        
                                        <span class="comment d-none">
                                            <span class="commentInner">
                                                <span class="close" onclick="close_comment_x(this.parentElement.parentElement.parentElement, event)">&#10005;</span><!--X-->
                                                <span class="text" onclick="e.stopPropagation()">
                                                    <em>морській безодні </em>Або «була вкрита глибоким океаном». <em>Дух Божий </em>Тут можливі також інші переклади «Вітер Божий» або «Потужний вітер».Або «була вкрита глибоким океаном». <em>Дух Божий </em>Тут можливі також інші переклади «Вітер Божий» або «Потужний вітер».Або «була вкрита глибоким океаном». <em>Дух Божий </em>Тут можливі також інші переклади «Вітер Божий» або «Потужний вітер».
                                                </span>
                                            </span>
                                        </span>

                                    </span>


                                    <span> (продолжение 2) земля була безформна та порожня. Земля знаходилася у морській безодні, а темрява огортала воду </span>

                                    <span class="wr_tooltip" onclick="hideShowComment(event)">

                                        <span class="tooltip" data-tooltip="<em>морській безодні </em> ">
                                            <span class="asterisco">*</span>
                                            <span class="trik d-none"></span>
                                        </span>
                                        
                                        <span class="comment d-none">
                                            <span class="commentInner">
                                                <span class="close" onclick="close_comment_x(this.parentElement.parentElement.parentElement, event)">&#10005;</span><!--X-->
                                                <span class="text" onclick="e.stopPropagation()">
                                                    <em>морській безодні </em>
                                                </span>
                                            </span>
                                        </span>

                                    </span>

                                
                                
                                
                                </span>
                                    
                                    <span class="btn_verse_menu"></span>
                            </p>

                        </div>
                    </div>                

                </div><!--/wrCols-->

            </div>
        </div>
    
    
    </div>

    <div id="footer">
        <div id="footerInner">
            
        </div>
    </div>

<!--
    <button id="btn_pageUp" onclick="pageUp()"><img src="images/arrow_chevron_down_white.svg"></button>
    <button id="btn_pageDown" onclick="pageDown()"><img src="images/arrow_chevron_down_white.svg"></button>
-->

    <!-- The Modal -->
    <div id="myModal" class="modal">

        <!-- Modal Content -->
        <div id="myModalContent" class="modal-content">

            <header id="modcont_header">
                <div class="inner">
                    <h4>
                        <span class="close" onclick="closeModal(null,true)">&#10005;</span><!-- x -->
                        <span id="btn_sp_atras" class="sp_atras" onclick="openModal('top','Меню',null,'showMenu')"></span>
                        <span id="h4_text">aki modal content header</span>
                    </h4>
                </div>
            </header>

            <div id="modcont_body">
                <div class="inner">




                    <div id="bl_modalTop" class="body_bls" style="display:none;">
                        <div id="bl_modalTopInner">

                            <div id="topLogin" style="display:none;">
                                <div id="topLoginInner">

<?php
    
    if(isset($_GET['reset_pwd_ok'])){
print<<<HERE
<script>
    setTimeout(()=>{
        openModal('top','Login',null,'showLogin');
    },3000);
</script>
HERE;
    }
    
    
    if( isset($_SESSION['username']) && isset($_SESSION['id_user']) ){
        // El usuario está logueado, muestra el contenido protegido
        $st_bl_sesion_iniciada = 'block';
        $st_bl_login = 'none';
        $st_bl_register_form = 'none';
        $st_bl_email_form = 'none';
        $st_bl_change_email_form = 'none';
        $frase_bienvenida = "Bienvenido, " . $_SESSION['username'];
        //$frase_bienvenida .= "<br>(id_user: " .$_SESSION['id_user'] . ")";//para test
        $mensaje = '<span class="clr_green">Sesión iniciada correctamente. Se cargan tus ajustes personales.';
        $login_img_src = './images/login2_white.svg';
        //echo "<script>alert('js session iniciada. Bienvenido, " . $_SESSION['username'] . ".')</script>";
print<<<HERE
<script>
    let hay_sesion = true;
    let username = '$_SESSION[username]';
    //console.log('print js: session iniciada. Bienvenido, ' +  username + '.');

    document.addEventListener("DOMContentLoaded", () => {
        pintLoginImg(hay_sesion);

        (async ()=>{
            //alert(111);
            await obtenerDatosDeBD('fav_trans','arrFavTrans');           
            //alert(222);
        })();
    });

</script>
HERE;
    }else{
        // El usuario no está logueado, muestra el formulario de inicio de sesión
        $st_bl_sesion_iniciada = 'none';
        $st_bl_login = 'block';
        $st_bl_register_form = 'none';
        $st_bl_email_form = 'none';
        $st_bl_change_email_form = 'none';
        $frase_bienvenida = "No estás logueado.";
        $mensaje = "Sesión no iniciada.";
        $login_img_src = './images/login2_grey2.svg';
        //echo "<script>alert('js session cerrada')</script>";
print<<<HERE
    <script>
        let hay_sesion = false;        
        //console.log('print js: session cerrada. hay que iniciar la sesión.');

        document.addEventListener("DOMContentLoaded", () => {
            pintLoginImg(hay_sesion);
        });   
    
    </script>
HERE;
    }

print<<<HERE

    <div class="login-page">

        <div class="form">

            <div id="bl_register_form" style="display:$st_bl_register_form;">
                <form class="register-form">
                    <h1>Crear cuenta</h1>
                    <p class="mensaje">Al crear la cuenta tendrás acceso a tus ajustes personales.</p>
                    <input id="reg_username" name="username" type="text" placeholder="name"/>
                    <input id="reg_password" name="password" type="password" autocomplete="password" placeholder="password"/>
                    <input id="reg_email" name="email" type="text" placeholder="email address"/>
                    <button class="btn_wide" type="button" onclick="crearCuenta()">Crear cuenta</button>
                    <p class="message">¿Ya estás registrado? <a href="#" onclick="mostrarLoginForm()">Entrar</a></p>
                </form>
            </div>

            <div id="bl_email_form" style="display:$st_bl_email_form;">
                <form class="email-form">
                    <h1>Recuperar contraseña</h1>
                    <p class="mensaje">Introduce tu correo electrónico para recibir instrucciones sobre cómo establecer una nueva contraseña.</p>
                    <input id="rec_email" name="email" type="text" placeholder="email address"/>
                    <button class="btn_wide" type="button" onclick="enviarEmail()">Enviar</button>
                    <p class="message"><a href="#" onclick="mostrarLoginForm()">Iniciar sesión</a></p>
                </form>
            </div>

            <div id="bl_change_email_form" style="display:$st_bl_change_email_form;">
                <form class="change-email-form">
                    <h1>Cambiar contraseña</h1>
                    <p class="mensaje">Introduce tu correo electrónico actual y las contraseñas, actual y nueva.</p>
                    <input id="act_email" name="email" type="text" placeholder="actual email address"/>
                    <input id="act_password" name="password" type="password" autocomplete="password" placeholder="actual password"/>
                    <input id="new_password" name="password" type="password" autocomplete="" placeholder="new password"/>
                    <input id="new_password_rep" name="password" type="password" autocomplete="" placeholder="repeat new password"/>
                    <button class="btn_wide" type="button" onclick="enviarChangeEmail()">Cambiar</button>
                    <p class="message"><a href="#" onclick="mostrarLoginForm()">Iniciar sesión</a></p>
                </form>
            </div>
            
            <div id="bl_login" style="display:$st_bl_login;">
                <form class="login-form">
                    <h1>Iniciar sesión</h1>
                    <p class="mensaje">Tendrás acceso a tus ajustes personales.</p>
                    <input id="username" name="username" type="text" placeholder="username" required/>
                    <input id="password" name="password" type="password" autocomplete="password" placeholder="password" required/>
                    <button class="btn_wide" type="button" onclick="iniciarSesion()">Iniciar Sesión</button>
                    <p class="message">
                        ¿No estás registrado? <a href="#" onclick="mostrarForm('bl_register_form')">Crear una cuenta</a>
                        <br>¿Has olvidado la contraseña? <a href="#" onclick="mostrarForm('bl_email_form')">Recuperar contraseña</a>
                        <br>¿Quieres cambiar la contraseña? <a href="#" onclick="mostrarForm('bl_change_email_form')">Cambiar contraseña</a>
                    </p>
                </form>
            </div>

            <div id="bl_sesion_iniciada" style="display:$st_bl_sesion_iniciada;">
                <h1>$frase_bienvenida!</h1>
                <p class="mensaje">$mensaje</p>
                <br>
                <button class="cerr_ses" onclick="cerrarSesion()">Cerrar Sesión</button>
            </div>

        </div>

  </div>
HERE;
?>





                                </div>
                            </div><!--/#topLogin-->


                            <div id="topMenu" style="display:none;">
                                <div id="topMenuInner">
<?php
print<<<HERE
                                    <div id="m_login_menu" class="dbtn" title="Sesion" onclick="openModal('top','Login',null,'showLogin')" style="width:100%;">
                                    <div class="dbtn_inner">
                                            <img src="$login_img_src">    
                                            <span>Login</span>
                                        </div>
                                    </div>
HERE;
?>                                    

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


                                    <div class="dbtn" title="Маркеры / Закладки" onclick="openModal('full','Маркеры',null,'showMarkers')" style="width:50%;">
                                        <div>Маркеры</div>
                                    </div>
                                    <div class="dbtn" title="Заметки" onclick="alert('функция в разработке...')" style="width:50%;">
                                        <div>Заметки</div>
                                    </div>

                                    <div id="m_btnMinOtrasTrans" class="dbtn" title="Minimizar Otras Trans" onclick="enableDesableMinOtrasTrans()" style="width:33.33%;">
                                        <div>Tr_min</div>
                                    </div>
                                    <div class="dbtn" title="" onclick="alert('funcción en desarrollo...')" style="width:33.33%;">
                                        <div>...</div>
                                    </div>
                                    <div id="m_btnMaxWidthCol" class="dbtn" onclick="enableDesableMaxWidthCol()" style="width:33.33%;">
                                        <div>mw_Col</div>
                                    </div>


                                    <div id="m_btnByText" class="dbtn" onclick="changeModo('by_text')" style="width:33.33%;">
                                        <div>by_text</div>
                                    </div>
                                    <div id="m_btnByJson" class="dbtn" onclick="changeModo('by_json')" style="width:33.33%;">
                                        <div>by_json</div>
                                    </div>
                                    <div id="m_btnVkladkiInMob" class="dbtn" onclick="hideShowVkladkiInMob()" style="width:33.33%;">
                                        <div>Tabs_in_Mob</div>
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



                                </div><!--/#topMenuInner-->
                            </div><!--/#topMenu-->


                            <div id="topOtraCosa" style="display:none;">
                                ...
                            </div><!--/#topOtraCosa-->

                                            
                        </div>
                    </div>


                    <div id="bl_modalCenter" class="body_bls" style="display:none;">
                        <div id="bl_modalCenterInner">
                            ...
                        </div>
                    </div>


                    <div id="bl_modalBottom" class="body_bls" style="display:none;">
                        <div id="bl_modalBottomInner">
                            ...
                        </div>

                    </div>


                    <div id="bl_modalFull" class="body_bls" style="display:none;">
                        <div id="bl_modalFullInner" class="vyb_trans">
                            ...
                        </div>
                    </div>


                </div><!--/inner-->
            </div><!--/modcont_body-->

            <footer id="modcont_footer" style="display:none;">
                <div class="inner">
                    <p>
                        <span class="close" onclick="closeModal(null,true)">&#10005;</span> 
                        aki modal content footer 
                    </p>
                </div>
            </footer>

        </div><!--/myModalContent-->
    </div><!--/myModal-->

<?php 
    if(isset($_GET) && !empty($_GET) ){
        //echo "<p>isset $ _GET";
        
        $trans = (isset($_GET['trans'])) ? $_GET['trans'] : null ;
        $ref = (isset($_GET['ref'])) ? $_GET['ref'] : null ;
        //echo "$ str_trans: $str_trans";
        //echo "$ ref: $ref";
    }else{
        //echo "<p>NO isset $ _GET";
        
        $trans = null;
        $ref = null; 
    }
    //die();

    if(isset($_SESSION) && !empty($_SESSION) && !empty($_SESSION['username'])){
        //echo "<p>isset $ _SESSION. $ _SESSION[username]: " . $_SESSION['username'];
    }else{
        //echo "<p>NO isset $ _SESSION";
    }
    //die();
?>

<!-- Javascript para este html -->
<script>
    
    let get_trans = <?=json_encode($trans)?>;
    let get_ref = <?=json_encode($ref)?>;
    
    // Utilizar la variable en JavaScript
    //console.log("Valor de la variable en JavaScript - get_trans:", get_trans);
    //console.log("Valor de la variable en JavaScript - get_ref:", get_ref);
    
    let hay_get_data = false;//por defecto
    if(get_ref != null){
        hay_get_data = true;
    }
    
</script>

<script src="./js/config.js"></script>
<script src="./js/bible_app.js"></script>
<script src="./js/functions.js"></script>
<script src="./js/functions2.js"></script>
<script src="./js/tests.js"></script>
<script src="./js/modal.js"></script>
<script src="./js/listeners.js"></script>
</body>
</html>

