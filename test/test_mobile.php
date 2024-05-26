<?php
  header('Content-type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mobile</title>
  <link href='https://fonts.googleapis.com/css?family=Muli' rel='stylesheet'>
  <link rel="stylesheet" href="test_mobile.css">
  <link rel="stylesheet" href="../css/bible_app.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

</head>
<body>


<div id="myNav" class="overlay">
  <div id="myNavInner">

    <div id="nav_header">
      <div class="inner">
                
        <button class="btn btn_m f_l" onclick="closeNav()"><img src="../images/arrow_left2_white.svg"></button>

        <div id="sidebarBtns">
            <div id="sidebarBtnsInner">

                <div class="wr_btns_scr f_l">
                    <button id="btn_nav" class="btn btn_active" onclick="showTab(this,'nav')" title="Навигация">Nav</button>
                    <button id="btn_find" class="btn" onclick="showTab(this,'find')" title="Поиск"><i class="fas fa-search"></i></button><!--Find-->
                    <button id="btn_tsk" class="btn" onclick="showTab(this,'tsk')" title="Перекрестные Ссылки">TSK</button>
                    <button id="btn_strong" class="btn" onclick="showTab(this,'strong')" title="Словарт Стронга">Strong</button>
                    <button id="btn_comm" class="btn d---none" onclick="" title="Комментарии">Comm</button>
                    <button id="btn_dic" class="btn d---none" onclick="" title="Словари Вечное Евангелие">Dic EG</button>
                </div>
            
            </div>
        </div>






      </div>
    </div>

    <div id="nav_body">

        <div style="dis-play:none;">
            <div style="overflow:hidden;">
                <button class="btn btn_m f_l" onclick="closeNav()">Nav</button>
                <button class="btn btn_m f_l" onclick="closeNav()"><i class="fas fa-search icon"></i></button><!--Find-->
                <button class="btn btn_m f_l" onclick="closeNav()">TSK</button>
                <button class="btn btn_m f_l" onclick="closeNav()">Strong</button>
            </div>

            <button class="btn btn_m f_l" onclick="closeNav()"><img src="../images/arrow_right2_white.svg"></button>
            <button class="btn btn_m f_r" onclick="closeNav()">&#10005;</button><!-- x -->

            <button class="btn btn_m f_l" onclick="closeNav()"><img src="../images/arrow_chevron_right_white.svg"></button>
            <button class="btn btn_m f_l" onclick="closeNav()"><img src="../images/arrow_chevron_left_white.svg"></button>

            <button class="btn btn_m f_l" onclick="closeNav()"><img src="../images/arrow_backward_white.svg"></button>
            <button class="btn btn_m f_l" onclick="closeNav()"><img src="../images/arrow_forward_white.svg"></button>
            
            <button class="btn btn_m f_l" onclick="closeNav()"><img src="../images/arrow_chevron_down_white.svg"></button>

            <button class="btn btn_m f_l utf8">&#10148;</button>
            <button class="btn btn_m f_l utf8">►</button>

            <button class="btn btn_m f_l" onclick="closeNav()"><img src="../images/arrow_forward_white.svg"></button>
            <button class="btn btn_m f_l" onclick="closeNav()"><img src="../images/arrow_backward_white.svg"></button>
            <button class="btn btn_m f_l" onclick="closeNav()"><img src="../images/arrow_right2_white.svg"></button>
            
            
            
            <button class="btn btn_m f_l" onclick="closeNav()"><img src="../images/tres_puntos2_white.svg" style="width:24px;"></button>

            <button class="btn btn_m f_l" onclick="closeNav()"><img src="../images/arrow_chevron_down_white.svg"></button>
            <button class="btn btn_m f_l" onclick="closeNav()"><img src="../images/lupa_white.svg" style="width:20px;"></button>
            <button class="btn btn_m f_l utf8">&#10148;</button>
            <button class="btn btn_m f_l utf8">►</button>    
        
        </div>


        <div id="vklad_nav" style="display: block;">
            
            <div id="nav_head">
                <div class="wr_nav">
                    <div class="wr_inpt_x">
                        <input 
                            id="inpt_nav" 
                            data-book_short_name="Быт." 
                            data-id_book="0" 
                            data-show_chapter="" 
                            data-show_verse="" 
                            data-show_to_verse="" 
                            value="Быт."
                        >
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
                    <img src="../images/icon_razvernut.png">
                </div>
                <button id="btn_ok_find" class="btn f_r" onclick="findWords(this.parentElement.querySelector('input').value)">Find</button>
                <button id="btn_ok_stop" class="btn f_r d-none" onclick="stopFindWords()">Stop</button>
            </div>
            <div id="find_head">
                <div id="wr_hist_find" style="display:none;">
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
                                    <option value="Prof">#Пророки (Болшие и Малые)</option>
                                    <option value="ProfB">#Большие Пророки</option>
                                    <option value="ProfM">#Малые Пророки</option>
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





    </div>

  </div>
</div>
<div id="fondo"></div>








<header>
  <div id="headerInner">
    <button class="btn btn_m f_l" onclick="openNav()"><img src="../images/menu_white.svg" style="width:20px;"></button>
  
    <button class="btn btn_m f_l" onclick="closeNav()" style="font-size:12px;">RST+</button>
    
    <div>
      <button class="btn btn_m f_l" onclick="closeNav()"><img src="../images/arrow_chevron_left_white.svg"></button>
      <button class="btn btn_m f_l" onclick="closeNav()">Jn 3:16</button>
      <button class="btn btn_m f_l" onclick="closeNav()"><img src="../images/arrow_chevron_right_white.svg"></button>
    </div>
    <button class="btn btn_m f_l" onclick="closeNav()"><img src="../images/lupa_white.svg" style="width:20px;"></button>
    
    <button class="btn btn_m f_l" onclick="closeNav()"><i class="fas fa-star icon"></i></button>
    

  

  
  </div>

</header>

<section>

  <h2>Fullscreen Overlay Nav Example</h2>

  <!-- En tu archivo HTML -->
  <i class="fas fa-star icon"></i> <!-- Icono de estrella con la clase "icon" aplicada -->

  <i class="fas fa-heart icon"></i> <!-- Icono de corazón sólido -->
  <i class="far fa-thumbs-up icon"></i> <!-- Icono de pulgar arriba vacío -->
  <i class="fas fa-envelope icon"></i> <!-- Icono de sobre sólido -->


    <p><i class="element" style="width:20px;"></i>zbzxb</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>Click on the element below to open the fullscreen overlay navigation menu. adfhadfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh adfh dfghsadhfadha adfh adfh dfha dfh dfha dfh adfha dfh adfh</p>
    <p>In this example, the navigation menu will slide in, from left to right: adfh adfha dfha dfh adfh adfha dfh adfha dfh</p>

</section>

<footer>
  <div style="font-size:30px;">Footer en body...</div>
</footer>



<!-- Javascript para este html -->
<script src="test_mobile.js"></script>
<script src="../bible_app.js"></script>
<script src="../functions.js"></script>
     
</body>
</html>
