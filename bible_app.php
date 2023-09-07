<?php
header('Content-type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BQ</title>
    <link href='https://fonts.googleapis.com/css?family=Muli' rel='stylesheet'>
    <link rel="stylesheet" href="bible_app.css">
    <link rel="stylesheet" href="bible_app_resp.css">

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.7.3/dist/sweetalert2.all.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11.7.3/dist/sweetalert2.min.css" rel="stylesheet">

    <link href="https://fonts.googleapis.com/css2?family=Oswald&display=swap" rel="stylesheet">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital@1&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Archivo+Narrow:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&family=Open+Sans:wght@300&family=Raleway:wght@100&display=swap" rel="stylesheet">
</head>
<body>

    <div id="header">

        <div id="headerMain">
            <div id="headerMainInner" class="headerFlex">               
                
                
                <div style="display:none;">
                    <button class="btn f_l" title="Hide or Show sidebar" onclick="hideShowSidebar(this)">H / S</button>

                    <button class="btn f_l ml" title="Remove Bible Translation" onclick="removeTrans()">Tr -</button>
                    <button class="btn f_l" title="Add Bible Translation" onclick="addTrans()">Tr +</button>

                    <button class="btn f_l ml" title="Quitar Pestaña" onclick="removeTab()">Vk -</button>
                    <button class="btn f_l" title="Añadir Pestaña" onclick="addTab()">Vk +</button>

                    <button class="btn f_l ml" title="History previous register" onclick="prevHist()">&lang; H</button>
                    <button class="btn f_l" title="History next register" onclick="nextHist()">H &rang;</button>

                    <button class="btn f_l ml" title="Previous book" onclick="bookGo('prev')">&#9668;</button>
                    <button class="btn f_l" title="Next book" onclick="bookGo('next')">&#9658;</button>

                    <button class="btn f_l ml" title="Previous chapter" onclick="chapterGo('prev')">&lang;</button>
                    <button class="btn f_l" title="Next chapter" onclick="chapterGo('next')">&rang;</button>
                    
                    <button class="btn f_l ml" title="Change position: Columns or Rows" onclick="changePositionShow(this)">Row</button>

                    <button id="btnStrong" class="btn f_l ml" title="Show / Hide Strong Numbers" onclick="showHideStrongNumbers()">S#</button>

                    <button class="btn f_r" title="Settings" style="display:none;">Set</button>

                    <button class="btn" title="menu modal. ajustes de la app" onclick="openModal('modalTop')" >
                        <img src="image/tres_puntos2_white.svg" style="height: 20px;">
                    </button>
            
                </div>

                <div id="bl_headerBtns">

                    <div class="dbtn" title="Hide or Show sidebar" onclick="hideShowSidebar(this)">
                        <div>Hide</div>
                    </div>

                    <div class="dbtn" title="Remove Bible Translation" onclick="removeTrans()">
                        <div>Tr -</div>
                    </div>
                    <div class="dbtn" title="Add Bible Translation" onclick="addTrans()">
                        <div>Tr +</div>
                    </div>

                    <div class="dbtn" title="Quitar Pestaña" onclick="removeTab()">
                        <div>Vk -</div>
                    </div>
                    <div class="dbtn" title="Añadir Pestaña" onclick="addTab()">
                        <div>Vk +</div>
                    </div>

                    <div class="dbtn" title="Previous book" onclick="bookGo('prev')">
                        <img src="image/arrow_backward_white.svg">
                    </div>
                    <div class="dbtn" title="Next book"onclick="bookGo('next')">
                        <img src="image/arrow_forward_white.svg">
                    </div>

                    <div class="dbtn" title="Previous chapter" onclick="chapterGo('prev')">
                        <img src="image/arrow_chevron_left_white.svg">                            
                    </div>
                    <div class="dbtn" title="Next chapter" onclick="chapterGo('next')">
                        <img src="image/arrow_chevron_right_white.svg">
                    </div>

                    <div class="dbtn" title="History previous register" onclick="prevHist()">
                        <div>< H</div>
                    </div>
                    <div class="dbtn" title="History next register" onclick="nextHist()">
                        <div>H ></div>
                    </div>                        

                    <div id="btn_changePositionShowHeader" class="dbtn" title="Change position: Columns or Rows" onclick="changePositionShow(this)">
                        <div>Row</div>
                    </div>
                    <div class="dbtn" title="Show / Hide Strong Numbers" onclick="showHideStrongNumbers()">
                        <div>S#</div>
                    </div>

                    <h3>BQ</h3>


                    
                </div>

                <div class="tres_puntos_menu" title="menu..." onclick="openModal('top')">
                    <img src="image/tres_puntos2_white.svg" style="width:24px;">
                </div>




            </div>
        </div>

    </div>



    
    <div id="wrapper">

        <div id="sidebar">
            <div id="sidebarInner">

                <div id="menuTabs">
                    
                    <div id="arrowBack" onclick="closeSidebar(this)">
                        <img class="f_l" src="image/arrow_left2_white.svg">
                    </div>

                    <div id="restoTabs" class="f_r">                    
                        <div class="wr_btns_scr f_l">
                            <button id="btn_nav" class="btn btn_active" onclick="showTab(this,'nav')" title="Навигация">Nav</button>
                            <button id="btn_find" class="btn" onclick="showTab(this,'find')" title="Поиск">Find</button>
                            <button id="btn_tsk" class="btn" onclick="showTab(this,'tsk')" title="Перекрестные Ссылки">TSK</button>
                            <button id="btn_strong" class="btn" onclick="showTab(this,'strong')" title="Словарт Стронга">Strong</button>
                            <button id="btn_comm" class="btn d-none" onclick="" title="Комментарии">Comm</button>
                            <button id="btn_dic" class="btn d-none" onclick="" title="Словари">Dic</button>
                        </div>
                    </div>

                    <div id="closeBack" onclick="closeSidebar(this)">
                        &#10005;<!--X-->
                    </div>

                </div>
                    
                <div id="vklad_nav" style="display: block;">
                    <div id="nav_head">
                        <div class="wr_nav">
                            <div class="wr_inpt_x">
                                <input id="inpt_nav" data-divtrans="" data-trans="" data-id_book="0" data-show_book="Быт." data-id_chapter="" data-show_chapter="" data-id_verse="" data-show_verse="" data-show_to_verse="" value="Быт.">
                                <div id="clear_inpt" onclick="clear_inpt('nav')">&times;</div>
                            </div>
                            <button id="btn_ok" class="btn f_r" onclick="getRef(document.querySelector('#inpt_nav').dataset.trans)">OK</button>
                        </div>
                        <div class="wr_bcv">
                            <div id="s_book" class="v_bcv bcv_active" onclick="sel(this,'b',document.querySelector('#inpt_nav').dataset.trans)">
                                <div>Книга</div>
                            </div> 
                            <div id="s_chapter" class="v_bcv" onclick="sel(this,'ch',document.querySelector('#inpt_nav').dataset.trans)">
                                <div>Глава</div>
                            </div> 
                            <div id="s_verse" class="v_bcv" onclick="sel(this,'v',document.querySelector('#inpt_nav').dataset.trans)">
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
                                <span class="prim_verse">Antes de seleccionar el versículo, selecciona el capítulo por favor.</span> 
                            </ul>
                        </div>
                    </div>
                </div><!--/vklad_nav-->

                <div id="vklad_find" style="display: none;">
                    <div id="wr_find_head">
                        <div class="wr_nav">
                            <div class="wr_inpt_x">
                                <input id="inpt_find" value="В начале сотворил Бог небо и землю">
                                <div id="clear_inpt" onclick="clear_inpt('find')">&times;</div>
                            </div>
                            <div id="hist_find" onclick="hideShowHistFind()">
                                <img src="image/icon_razvernut.png">
                            </div>
                            <button id="btn_ok_find" class="btn f_r" onclick="findWords(this.parentElement.querySelector('input').value)">Find</button>
                            <button id="btn_ok_stop" class="btn f_r d-none" onclick="stopFindWords()">Stop</button>
                        </div>
                        <div id="find_head">
                            <div class="wr_hist_find" style="display:none;">
                                ...
                            </div>                       

                            <div class="wr_op">
                                <div class="bl_trig title_par" onclick="hideShowFindParams()">Параметры поиска:</div>

                                <div class="bl_trig bl_par" style="display:none;">

                                    <div class="wr_sel">
                                        <select id="gde">
                                            <option value="TB">ВСЯ БИБЛИЯ</option>
                                            <option value="AT">ВЕТХИЙ ЗАВЕТ</option>
                                            <option value="NT">НОВЫЙ ЗАВЕТ</option>
                                            <option disabled></option>

                                            <optgroup label="Категории">
                                                <option value="M">#Пятикнижье</option>
                                                <option value="Hist">#Исторические книги</option>
                                                <option value="Poet">#Поэтические книги</option>
                                                <option value="Prof">#Пророки</option>
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
                                            
                                            <optgroup label="Пророки">
                                                <option value="22">Исаия</option>
                                                <option value="23">Иеремия</option>
                                                <option value="24">Плач Иеремии</option>
                                                <option value="25">Иезекииль</option>
                                                <option value="26">Даниил</option>
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
                                            
                                            <optgroup label="Евангелия и Деяния">
                                                <option value="39">Матфея</option>
                                                <option value="40">Марка</option>
                                                <option value="41">Луки</option>
                                                <option value="42">Иоанна</option>
                                                <option value="43">Деяния</option>
                                            </optgroup>
                                            <option disabled></option>

                                            <optgroup label="Послания и Откровение">
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
                                                    <option disabled></option>
                                                <option value="58">Иакова</option>
                                                <option value="59">1 Петра</option>
                                                <option value="60">2 Петра</option>
                                                <option value="61">1 Иоанна</option>
                                                <option value="62">2 Иоанна</option>
                                                <option value="63">3 Иоанна</option>
                                                <option value="64">Иуды</option>
                                                    <option disabled></option>
                                                <option value="65">Откровение</option>
                                                <option disabled></option>
                                            </optgroup>
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
                                            <span>1. искомое содержит хотя бы одно слово</span>
                                            <span class="tooltip" data-tooltip="Пример: найти не только стихи, содержащие 'Иисус Христос', но и те, которые содержат 'Иисус' или 'Христос'." onmouseenter="showTooltip(this)" mouseleave="hideTooltip(this)">*</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input id="cbox2" type="checkbox" onclick="cboxChange(this)" value=""> 
                                            <span>2. cлова идут в заданном порядке</span>
                                            <span class="tooltip" data-tooltip="Пример: найти стихи, где встречается 'Иисус Христос', но не 'Христос Иисус'." onmouseenter="showTooltip(this)" mouseleave="hideTooltip(this)">*</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input id="cbox3" type="checkbox" onclick="cboxChange(this)" value=""> 
                                            <span>3. искать точную фразу</span>
                                            <span class="tooltip" data-tooltip="Пример: найти стихи, где есть 'Благословен Бог', но не 'Благословен ГОСПОДЬ Бог'." onmouseenter="showTooltip(this)" mouseleave="hideTooltip(this)">*</span>

                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input id="cbox4" type="checkbox" onclick="cboxChange(this)" value=""> 
                                            <span>4. выражения не могут быть частями слов</span>
                                            <span class="tooltip" data-tooltip="Пример: найти стихи, где есть 'благословен', но не 'благословенИЕ'." onmouseenter="showTooltip(this)" mouseleave="hideTooltip(this)">*</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input id="cbox5" type="checkbox" onclick="cboxChange(this)" value=""> 
                                            <span>5. различать прописные и ЗАГЛАВНЫЕ буквы</span>
                                            <span class="tooltip" data-tooltip="Пример: различать при поиске слова 'БОГ' и 'бог'." onmouseenter="showTooltip(this)" mouseleave="hideTooltip(this)">*</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input id="cbox6" type="checkbox" onclick="cboxChange(this)" value=""> 
                                            <span>6. различать буквы с ударениями (если есть)</span>
                                            <span class="tooltip" data-tooltip="Пример: различать при поиске слова 'creó' (сотворил) и 'creo' (верю)." onmouseenter="showTooltip(this)" mouseleave="hideTooltip(this)">*</span>

                                        </label>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div id="find_result"></div>
                    </div>
                    <div id="find_body">
                        <span class="prim_tsk">Introduce el texto para buscar y si quieres aplica los parámetros del filtro.</span>
                    </div>
                </div><!--/vklad_find-->

                <div id="vklad_tsk" style="display: none;">
                    <div id="tsk_head">
                        <h4>Pasajes paralelos</h4>
                    </div>
                    <div id="tsk_body">
                        <span class="prim_tsk">Para ver pasajes paralelos del versículo, presiona la referencia. Por ejemplo: Gen.1:1</span>
                    </div>
                </div><!--/vklad_tsk-->

                <div id="vklad_strong" style="display: none;">
                    
                    <div id="wr_strong_head">
                        <div class="wr_nav">
                            <div class="wr_inpt_x">
                                <input id="inpt_strong" value="00776">
                                <div id="clear_inpt" onclick="clear_inpt('strong')">&times;</div>
                            </div>
                            <button id="btn_ok_strong" class="btn f_r" onclick="getStrongNumber(this.parentElement.querySelector('.wr_inpt_x input').value)">Strong</button>
                        </div>
                        <div id="strong_head"></div>
                    </div>

                    <div id="strong_body">
                        <span class="prim_tsk">Introduce el número de Strong para ver su significado y dónde se encuenta.</span>
                    </div>
                </div><!--/vklad_strong-->



            </div><!--/sidebarInner-->
        </div>
        
        <div id="v_line"></div>

        <div id="container">
            <div id="containerInner">



                <div id="headerContainer">
                    <div id="headerContainerInner">


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
                                    <button id="btnPlus" class="btn" onclick="addTab()"> + </button>
                                </div>
                            
                            </div>
                        </div>

                        <div class="partMob" style="display:none;">
                            <div class="partMobInner">

                                <button class="btnMenu btn btn_svg" data-typebtn="transMenu" onclick="openSidebar(this)"><img src="image/menu_white.svg"></button>
                                <button class="btn btn_svg" onclick="chapterGo('prev')" title="Previous Chapter"><img src="image/arrow_chevron_left_white.svg"></button>
                                
                                <div class="centralPart">
                                    <button class="btn" onclick="openModal('full',document.querySelector('#trans1.colsHead'))" title="open Modal to choose translation">
                                        <span class="mob_trans">RST+r</span>
                                    </button>
                                    <div class="separ_line"></div>
                                    <button class="btn" data-typebtn="transRef" onclick="showTabMob('#btn_nav','nav',this)" title="Навигация. Выбор книги, главы, стиха">
                                        <span>Быт. 1:1</span>
                                    </button>
                                </div>
                                
                                <button class="btn btn_svg" onclick="chapterGo('next')" title="Next Chapter"><img src="image/arrow_chevron_right_white.svg"></button>
                                
                                <!--
                                <button class="btn btn_svg" onclick="openModal('bottom')" title="'menu abajo. navegación. historial."><img src="image/arrow_chevron_down_white.svg"></button>
                                <button class="btn btn_svg" onclick="openModal('center')" title="'menu abajo. navegación. historial."><img src="image/arrow_chevron_down_white.svg"></button>
                                -->

                                <button class="btn btn_svg" onclick="openModal('top')" title="menu modal. ajustes de la app"><img src="image/tres_puntos2_white.svg" style="width:24px;"></button>

                            </div>
                        </div>


                    </div>
                </div>

                                
                <div id="wrCols">
               
                    <div id="col1" class="cols">
                        <div id="trans1" class="colsHead" data-trans="rstStrongRed" data-base_ep="N">
                            <div class="colsHeadInner">

                                <div class="partDesk">

                                    <div class="wr_desk_trans">

                                        <button class="btn btn_svg" onclick="chapterGo('prev')" title="Previous Chapter"><img src="image/arrow_chevron_left_white.svg"></button>

                                        <div class="centralPart" title="Presiona para seleccionar la traducción." onclick="openModal('full',document.querySelector('#trans1.colsHead'))">
                                            <div class="desk_trans">RST</div>
                                            <div class="separ_line"></div>
                                            <div class="desk_sh_link">Gn. 1:1</div>
                                        </div>


                                        <button class="btn btn_svg" onclick="chapterGo('next')" title="Next Chapter"><img src="image/arrow_chevron_right_white.svg"></button>

                                    </div>

                                </div>

                                <div class="partMob">
                                    <div class="partMobInner">

                                        <button class="btnMenu btn btn_svg" data-typebtn="transMenu"  onclick="openSidebar(this)"><img src="image/menu_white.svg"></button>
                                        <button class="btn btn_svg" onclick="chapterGo('prev')" title="Previous Chapter"><img src="image/arrow_chevron_left_white.svg"></button>
                                        
                                        <div class="centralPart">
                                            <button class="btn" onclick="openModal('full',document.querySelector('#trans1.colsHead'))" title="open Modal to choose translation">
                                                <span class="mob_trans">RST+r</span>
                                            </button>
                                            <div class="separ_line"></div>
                                            <button class="btn" data-typebtn="transRef" onclick="showTabMob('#btn_nav','nav',this)" title="Навигация. Выбор книги, главы, стиха">
                                                <span class="mob_sh_link">Быт. 1:1</span>
                                            </button>
                                        </div>
                                        
                                        <button class="btn btn_svg" onclick="chapterGo('next')" title="Next Chapter"><img src="image/arrow_chevron_right_white.svg"></button>
                                        <!--
                                        <button class="btn btn_svg" onclick="openModal('bottom')" title="'menu abajo. navegación. historial."><img src="image/arrow_chevron_down_white.svg"></button>
                                        <button class="btn btn_svg" onclick="openModal('center')" title="'menu abajo. navegación. historial."><img src="image/arrow_chevron_down_white.svg"></button>
                                        -->

                                        <button class="btn btn_svg" onclick="openModal('top')" title="menu modal. ajustes de la app"><img src="image/tres_puntos2_white.svg" style="width:24px;"></button>
                                        
                                    </div>
                                </div>
                            
                            </div><!--/colsHeadInner-->
                        </div><!--/colsHead-->
                        <div class="colsInner">
                            <p><a href="#">Пс.1:1</a> los versículos se cargan aquí...</p> 
                        </div>
                    </div>                

                </div><!--/wrCols-->


            </div>
        </div>
    
    
    </div>

    <div id="footer">
        <div id="footerInner">
            <button class="btn" onclick="changeTrans(this,this.value,this.innerHTML,this.getAttribute('ep'))" ep="N" value="rstStrongRed">RST+r</button>
            <button class="btn" onclick="changeTrans(this,this.value,this.innerHTML,this.getAttribute('ep'))" ep="N" value="rstStrong">RST+</button>
            <button class="btn" onclick="changeTrans(this,this.value,this.innerHTML,this.getAttribute('ep'))" ep="N" value="rstt">RSTt</button>
            <button class="btn" onclick="changeTrans(this,this.value,this.innerHTML,this.getAttribute('ep'))" ep="N" value="rsti2">RSTi2*</button>
            <button class="btn" onclick="changeTrans(this,this.value,this.innerHTML,this.getAttribute('ep'))" ep="N" value="rstm">RSTm*</button>
            <button class="btn" onclick="changeTrans(this,this.value,this.innerHTML,this.getAttribute('ep'))" ep="N" value="nrt">NRT</button>
            <button class="btn" onclick="changeTrans(this,this.value,this.innerHTML,this.getAttribute('ep'))" ep="N" value="rstStrong_rv60">RST+RV60</button>
            <button class="btn" onclick="changeTrans(this,this.value,this.innerHTML,this.getAttribute('ep'))" ep="N" value="opnz">OPNZ</button>

            <button class="btn" onclick="changeTrans(this,this.value,this.innerHTML,this.getAttribute('ep'))" ep="N" value="ukr_fil">Ukr_Fil</button>
            <button class="btn" onclick="changeTrans(this,this.value,this.innerHTML,this.getAttribute('ep'))" ep="N" value="ukr_ogi">Ukr_Ogi</button>
            <button class="btn" onclick="changeTrans(this,this.value,this.innerHTML,this.getAttribute('ep'))" ep="Y" value="ukr_hom">Ukr_Hom</button>
            <button class="btn" onclick="changeTrans(this,this.value,this.innerHTML,this.getAttribute('ep'))" ep="N" value="ukr_gyz">Ukr_Gyz</button>
            <button class="btn" onclick="changeTrans(this,this.value,this.innerHTML,this.getAttribute('ep'))" ep="N" value="ukr_tur">Ukr_Tur</button>
            <button class="btn" onclick="changeTrans(this,this.value,this.innerHTML,this.getAttribute('ep'))" ep="Y" value="ukr_der">Ukr_Der</button>

            <button class="btn" onclick="changeTrans(this,this.value,this.innerHTML,this.getAttribute('ep'))" ep="Y" value="rv60">RV60</button>
            <button class="btn" onclick="changeTrans(this,this.value,this.innerHTML,this.getAttribute('ep'))" ep="Y" value="lbla">LBLA</button>
            <!--
            <button class="btn" onclick="changeTrans(this,this.value,this.innerHTML,this.getAttribute('ep'))" ep="N" value="kjv">KJV</button>
            <button class="btn" onclick="changeTrans(this,this.value,this.innerHTML,this.getAttribute('ep'))" ep="N" value="nkjv">NKJV</button>
            -->
        </div>
    </div>


    <button id="btn_pageUp" onclick="pageUp()"><img src="image/arrow_chevron_down_white.svg"></button>
    <button id="btn_pageDown" onclick="pageDown()"><img src="image/arrow_chevron_down_white.svg"></button>

    <!-- The Modal -->
    <div id="myModal" class="modal">
        <!-- Modal content -->
        <div id="myModalContent" class="modal-content">
            <!-- <div class="modal-content-inner"> -->

            <header>
                <div class="inner">
                <h4>
                    <span class="close" onclick="closeModal()">&#10005;</span><!-- x --> 
                    <span class="h4_text">aki modal content header</span>
                </h4>
            </div>
            </header>

            <section>
                <div class="inner">

                    <div id="bl_modalTop" style="display:none;">
                        <div id="bl_modalTopInner">

                            <div class="dbtn" title="Remove Bible Translation" onclick="removeTrans()">
                                <div>Tr -</div>
                            </div>
                            <div class="dbtn" title="Add Bible Translation" onclick="addTrans()">
                                <div>Tr +</div>
                            </div>

                            <div class="dbtn" title="Quitar Pestaña" onclick="removeTab()">
                                <div>Vk -</div>
                            </div>
                            <div class="dbtn" title="Añadir Pestaña" onclick="addTab()">
                                <div>Vk +</div>
                            </div>


                            <div class="dbtn" title="Previous book" onclick="bookGo('prev')">
                                <img src="image/arrow_backward_white.svg">
                            </div>
                            <div class="dbtn" title="Next book"onclick="bookGo('next')">
                                <img src="image/arrow_forward_white.svg">
                            </div>

                            <div class="dbtn" title="Previous chapter" onclick="chapterGo('prev')">
                                <img src="image/arrow_chevron_left_white.svg">                            
                            </div>
                            <div class="dbtn" title="Next chapter" onclick="chapterGo('next')">
                                <img src="image/arrow_chevron_right_white.svg">
                            </div>

                            <div class="dbtn" title="History previous register" onclick="prevHist()">
                                <div>< H</div>
                            </div>
                            <div class="dbtn" title="History next register" onclick="nextHist()">
                                <div>H ></div>
                            </div>                        

                            <div id="btn_changePositionShowModal" class="dbtn" title="Change position: Columns or Rows" onclick="changePositionShow(this)">
                                <div>Row</div>
                            </div>
                            <div class="dbtn" title="Show / Hide Strong Numbers" onclick="showHideStrongNumbers()">
                                <div>S#</div>
                            </div>
                            
                        </div>
                    </div>



                    <div id="bl_modalCenter" style="display:none;">
                        <p>bl_modalCenter</p>
                        <p>bl_modalCenter</p>
                        <p>bl_modalCenter</p>
                        <p>bl_modalCenter</p>
                        <p>bl_modalCenter</p>
                        <p>bl_modalCenter</p>
                        <p>bl_modalCenter</p>
                        <p>bl_modalCenter</p>
                        <p>bl_modalCenter</p>
                        <p>bl_modalCenter</p>
                        <p>Some text in the Modal..</p><p>Some text in the Modal..</p>            
                        <p>Some text in the Modal..</p><p>Some text in the Modal..</p><p>Some text in the Modal..</p><p>Some text in the Modal..</p><p>Some text in the Modal..</p><p>Some text in the Modal..</p><p>Some text in the Modal..</p><p>Some text in the Modal..</p><p>Some text in the Modal..</p><p>Some text in the Modal..</p><p>Some text in the Modal..</p><p>Some text in the Modal..</p><p>Some text in the Modal..</p><p>Some text in the Modal..</p><p>Some text in the Modal..</p><p>Some text in the Modal..</p><p>Some text in the Modal..</p><p>Some text in the Modal..</p><p>Some text in the Modal..</p><p>Some text in the Modal..</p><p>Some text in the Modal..</p><p>Some text in the Modal..</p><p>Some text in the Modal..</p>
                    </div>

                    <div id="bl_modalBottom" style="display:none;">
                        <p>bl_modalBottom</p>
                        <p>bl_modalBottom</p>
                        <p>bl_modalBottom</p>
                        <p>bl_modalBottom</p>
                        <p>bl_modalBottom</p>
                        <p>bl_modalBottom</p>
                        <p>bl_modalBottom</p>
                        <p>bl_modalBottom</p>
                        <p>bl_modalBottom</p>
                        <p>Some text in the Modal..</p><p>Some text in the Modal..</p>            
                        <p>Some text in the Modal..</p><p>Some text in the Modal..</p><p>Some text in the Modal..</p><p>Some text in the Modal..</p><p>Some text in the Modal..</p><p>Some text in the Modal..</p><p>Some text in the Modal..</p><p>Some text in the Modal..</p><p>Some text in the Modal..</p><p>Some text in the Modal..</p>
                    </div>

                    <div id="bl_modalFull" style="display:none;">
                        <div id="bl_modalFullInner" class="vyb_trans">
                            
                        </div>
                    </div>



                </div>
            </section>

            <footer style="display:none;">
                <div class="inner">
                    <p>
                        <span class="close" onclick="closeModal()">&#10005;</span> 
                        aki modal content footer 
                    </p>
                </div>
            </footer>

            <!-- </div>/modal-content-inner -->

        </div>
    </div>

<!-- Javascript para este html -->
<script src="./bible_app.js"></script>
<script src="./functions.js"></script>
<script src="./functions2.js"></script>
<script src="./modal.js"></script>
</body>
</html>

