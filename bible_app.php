<?php
header('Content-type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>my BibleQt - 2</title>
    <link href='https://fonts.googleapis.com/css?family=Muli' rel='stylesheet'>
    <link rel="stylesheet" href="bible_app.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.7.3/dist/sweetalert2.all.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11.7.3/dist/sweetalert2.min.css" rel="stylesheet">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital@1&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Archivo+Narrow:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&family=Open+Sans:wght@300&family=Raleway:wght@100&display=swap" rel="stylesheet">
</head>
<body>

    <div id="header">

        <div id="headerMain">
            <div id="headerMainInner">
                
                <button class="btn f_l" title="Hide or Show sidebar" onclick="hideShowSidebar(this)">H / S</button>

                <button class="btn f_l ml" title="Remove Bible Translation" onclick="removeTrans()">Tr -</button>
                <button class="btn f_l" title="Add Bible Translation" onclick="addTrans()">Tr +</button>

                <button class="btn f_l ml" title="Quitar Pestaña" onclick="removeTab()">Vk -</button>
                <button class="btn f_l" title="Añadir Pestaña" onclick="addTab()">Vk +</button>

                <button class="btn f_l ml" title="History previous register" onclick="prevHist()">< H</button>
                <button class="btn f_l" title="History next register" onclick="nextHist()">H ></button>

                <button class="btn f_l ml" title="Previous chapter of the book" onclick="chapterGo('prev')">< Ch</button>
                <button class="btn f_l" title="Next chapter of the book" onclick="chapterGo('next')">Ch ></button>
                
                <button class="btn f_l ml" title="Change position: Columns or Rows" onclick="changePositionShow(this)">Row</button>

                <button id="btnStrong" class="btn f_l ml" title="Show / Hide Strong Numbers" onclick="showHideStrongNumbers()">S#</button>

                <button class="btn f_r" title="Settings" onclick="">Set</button>
                <h3>Bible App</h3>
            </div>
        </div>

        <div id="headerSidebar">
            <div id="headerSidebarInner">

                <div class="wr_btns f_r">
                    <button class="btn btn_sm f_r" title="Sidebar more wide" onclick="resizeSidebar('more')" style="display:none;">+</button>
                    <button class="btn btn_sm f_r" title="Sidebar less wide" onclick="resizeSidebar('less')" style="display:none;">-</button>
                </div>

                <div class="wr_btns_scr f_l">
                    <button id="btn_nav" class="btn btn_active" onclick="showTab(this,'nav')" title="Навигация">Nav</button>
                    <button id="btn_find" class="btn" onclick="showTab(this,'find')" title="Поиск">Find</button>
                    <button id="btn_tsk" class="btn" onclick="showTab(this,'tsk')" title="Перекрестные Ссылки">TSK</button>
                    <button id="btn_strong" class="btn" onclick="showTab(this,'strong')" title="Словарт Стронга">Strong</button>
                    <button id="btn_comm" class="btn d-none" onclick="" title="Комментарии">Comm</button>
                    <button id="btn_dic" class="btn d-none" onclick="" title="Словари">Dic</button>
                </div>
                


            </div>
        </div>

        <div id="headerContainer">
            <div id="headerContainerInner">
                <div id="tab1" class="tabs tab_active">
                    <span>Рим.10:17</span>
                </div>
                <div id="tab2" class="tabs">
                    <button class="btn btn_sm f_r" onclick="closeTab(this)">x</button>
                    <span>1Кор.13:1-17</span>
                </div>
                <div id="tab3" class="tabs">
                    <button class="btn btn_sm f_r" onclick="closeTab(this)">x</button>
                    <span>Ин.3:16</span>
                </div>
            </div>
        </div>

    </div>



    
    <div id="wrapper">

        <div id="sidebar">
            <div id="sidebarInner">
                
                <div id="vklad_nav" style="display: block;">
                    
                    <div id="nav_head">
                        <div class="wr_nav">
                            <div class="wr_inpt_x">
                                <input id="inpt_nav" data-id_book="0" data-show_book="Быт." data-id_chapter="" data-show_chapter="" data-id_verse="" data-show_verse="" data-show_to_verse="" value="Быт.">
                                <div id="clear_inpt" onclick="clear_inpt('nav')">&times;</div>
                            </div>
                            <button id="btn_ok" class="btn f_r" onclick="getRef()">OK</button>
                        </div>
                        
                        <div class="wr_bcv">
                            <div id="s_book" class="v_bcv bcv_active" onclick="sel(this,'b')">
                                <div>Книга</div>
                            </div> 
                            <div id="s_chapter" class="v_bcv" onclick="sel(this,'ch')">
                                <div>Глава</div>
                            </div> 
                            <div id="s_verse" class="v_bcv" onclick="sel(this,'v')">
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
                                <li class="v_li">1</li> 
                            </ul>
                        </div>
                    </div>


                    

                </div><!--/vklad_nav-->

                <div id="vklad_find" style="display: none;">
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
                    <div id="find_body">
                        
                    </div>
                </div><!--/vklad_find-->

                <div id="vklad_tsk">
                    <div id="tsk_head">
                        Verse of reference here...
                    </div>
                    <div id="tsk_body">
                        Cross reference here...
                    </div>
                </div><!--/vklad_tsk-->

                <div id="vklad_strong">
                    <div class="wr_nav">
                        <div class="wr_inpt_x">
                            <input id="inpt_strong" value="00776">
                            <div id="clear_inpt" onclick="clear_inpt('strong')">&times;</div>
                        </div>
                        <button id="btn_ok_strong" class="btn f_r" onclick="getStrongNumber(this.parentElement.querySelector('.wr_inpt_x input').value)">Strong</button>
                    </div>
                    <div id="strong_head"></div>
                    <div id="strong_body">
                        Strong text here...
                    </div>
                </div><!--/vklad_strong-->



            </div><!--/sidebarInner-->
        </div>
        
        <div id="v_line"></div>

        <div id="container">
            <div id="containerInner">
                                
                <div id="wrCols">
               
                    <div id="col1" class="cols">
                        <div id="trans1" class="colsHead" data-trans="rstStrongRed" data-base_ep="N">
                            <div class="colsHeadInner">
                                <span id="ch_dir_l" class="ch_dir f_l" onclick="chapterGo('prev')" title="Previous Chapter"> < </span>
                                <span id="ch_dir_r" class="ch_dir f_r" onclick="chapterGo('next')" title="Next Chapter"> > </span>
                                <div>RST</div>
                            </div>
                        </div>
                        <div class="colsInner">
                            <p id="v1" style="background: red;"><a href="#v10">Пс.1:1</a> muy largo versículo 
                        </div>
                    </div>
                
                <!--

                    <div id="col2" class="cols">
                        <div id="trans2" class="colsHead" oncl--ick="selectModule(this)" data-trans="rstStrong">
                            <div class="colsHeadInner">
                                <button class="btn btn_sm f_r" onclick="closeTrans(this,event)">x</button>
                                <div>Ukr_Ogi</div>
                            </div>
                        </div>
                        <div class="colsInner" >
                            <p id="v1" style="background: #0dff00;"><a href="#v10">Пс.1:1</a>Блажен муж, що за радою несправедливих не ходить, і не стоїть на дорозі грішних, і не сидить на сидінні злоріків.
                        </div>
                    </div>
                    
                

                    <div id="col3" class="cols">
                        <div id="trans3" class="colsHead" data-trans="rstStrong_rv60">
                            <div class="colsHeadInner">
                                <button class="btn btn_sm f_r" onclick="closeTrans(this,event)">x</button>
                                <div>Ukr_Hom</div>
                            </div>
                        </div>
                        <div class="colsInner" >
                            <p style="background: #0051ff;"><a href="#v10">Пс.1:1</a> corto versículo --- vacio sdh dhsdhsdh sdh </p>  
                        </div>                       
                    </div>
                    
                
                    <div id="col4" class="cols">
                        <div id="trans4" class="colsHead" data-trans="ukr_ogi">
                            <div class="colsHeadInner">
                                <button class="btn btn_sm f_r" onclick="closeTrans(this,event)">x</button>
                                <div>KJV</div>
                            </div>
                        </div>
                        <div class="colsInner">
                            <p id="v1" style="background: red;"><a href="#v10">Пс.1:1</a> muy largo
                        </div>
                    </div>


                    <div id="col5" class="cols">
                        <div id="trans5" class="colsHead" data-trans="ukr_gyz">
                            <div class="colsHeadInner">
                                <button class="btn btn_sm f_r" onclick="closeTrans(this,event)">x</button>
                                <div>KJV</div>
                            </div>
                        </div>
                        <div class="colsInner">
                            <title>Бытие</title>
                            <h4>1</h4>
                            <p>1 В начале сотворил Бог небо и землю.</p>
                            
                        </div>
                    </div>


                    <div id="col6" class="cols">
                        <div id="trans6" class="colsHead" data-trans="ukr_tur">
                            <div class="colsHeadInner">
                                <button class="btn btn_sm f_r" onclick="closeTrans(this,event)">x</button>
                                <div>KJV</div>
                            </div>
                        </div>
                        <div class="colsInner">
                            <b>col6</b>
                            <p>
                                testeando algo...
                            </p>    
                        </div>
                    </div>
                    
                    <div id="col7" class="cols">
                        <div id="trans7" class="colsHead" data-trans="ukr_der">
                            <div class="colsHeadInner">
                                <button class="btn btn_sm f_r" onclick="closeTrans(this,event)">x</button>
                                <div>KJV</div>
                            </div>
                        </div>
                        <div class="colsInner">
                            <b>col7</b>
                            <p>
                                testeando algo...
                            </p>    
                        </div>
                    </div>
                    
                
                    <div id="col8" class="cols">
                        <div class="colsInner">
                            <b>col8</b>
                            <p>
                                testeando algo...
                            </p>    
                        </div>
                    </div>
                -->

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

<!-- Javascript para este html -->
<script src="./bible_app.js"></script>
<script src="./functions.js"></script>
</body>
</html>

