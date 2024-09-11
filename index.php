<?php 
session_start();
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BQ</title>
    <link rel="icon" type="image/png" href="./images/bq.png">
    <link href='https://fonts.googleapis.com/css?family=Muli' rel='stylesheet'>    

    <link id="estilos_base" rel="stylesheet" href="./css/bible_app.css">
    <link id="estilos_resp" rel="stylesheet" href="./css/bible_app_resp.css">
   
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
                    
                    <div id="btn_hideShowSidebar" class="dbtn" data-dic="d1_t" title="Hide or Show sidebar" onclick="hideShowSidebar()">
                        <!--<div>Hide</div>-->
                        <img src="images/sidebar_show_white.svg">
                    </div>
                    <div id="btn_hideShowFooter" class="dbtn" data-dic="d2_t" title="Hide or Show footer" onclick="hideShowFooter()">
                        <img src="images/sidebar_show_white.svg">
                    </div>

                    <div class="dbtn" data-dic="d3_t" title="Remove Bible Translation" onclick="removeTrans()">
                        <div>Tr -</div>
                    </div>
                    <div class="dbtn" data-dic="d4_t" title="Add Bible Translation" onclick="addTrans('askForTrans')">
                        <div>Tr +</div>
                    </div>

                    <div class="dbtn" data-dic="d5_t" title="Quitar Pestaña" onclick="removeTab()">
                        <div>Vk -</div>
                    </div>
                    <div class="dbtn" data-dic="d6_t" title="Añadir Pestaña" onclick="addTab(null,null,null,'tab_new')">
                        <div>Vk +</div>
                    </div>

                    <div class="dbtn" data-dic="d7_t" title="Previous book" onclick="bookGo('prev')">
                        <img src="images/arrow_backward_white.svg">
                    </div>
                    <div class="dbtn" data-dic="d8_t" title="Next book"onclick="bookGo('next')">
                        <img src="images/arrow_forward_white.svg">
                    </div>

                    <div id="btn_chapterGoPrev" class="dbtn" data-dic="d9_t" title="Previous chapter" onclick="chapterGo('prev')">
                        <img src="images/arrow_chevron_left_white.svg">                            
                    </div>
                    <div id="btn_chapterGoNext" class="dbtn" data-dic="d10_t" title="Next chapter" onclick="chapterGo('next')">
                        <img src="images/arrow_chevron_right_white.svg">
                    </div>

                    <div class="dbtn" data-dic="d11_t" title="History previous register" onclick="hist('prev')">
                        <div>< H</div>
                    </div>
                    <div class="dbtn" data-dic="d12_t" title="History next register" onclick="hist('next')">
                        <div>H ></div>
                    </div>                        

                    <div id="btn_changePositionShowHeader" class="dbtn" data-dic="d13_t" title="Change position: Columns or Rows" onclick="changePositionShow()">
                        <!--<div>Row</div>-->
                        <img class="col_row position_row" src="images/col_row_white.svg">
                    </div>
                    <div id="btnStrong" class="dbtn" data-dic="d14_t" title="Show / Hide Strong Numbers" onclick="showHideStrongNumbers()">
                        <div>S#</div>
                    </div>
                    <div id="btnMinOtrasTrans" class="dbtn" data-dic="d15_t" title="Minimizar Otras Trans" onclick="enableDisableMinOtrasTrans()">
                        <div>Tr_m</div>
                    </div>
                    <div id="btnMaxWidthCol" class="dbtn" data-dic="d16_t" title="Habilitar/Deshabilitar ancho máximo de una columna" onclick="enableDisableMaxWidthCol()">
                        <div>mw_Col</div>
                    </div>

                    <div id="btnIMGx2" class="dbtn" data-dic="d17_t" title="Aumentar el ancho de la imagen x2" onclick="enableDisableIMGx2()">
                        <div>IMGx2</div>
                    </div>
                    <div id="" class="dbtn" data-dic="_t" title="un botón más" onclick="alert('para futura función')" style="display:none;">
                        <div>btn2</div>
                    </div>
                    <div id="" class="dbtn" data-dic="_t" title="un botón más" onclick="alert('para futura función')" style="display:none;">
                        <div>btn3</div>
                    </div>
                    <div id="" class="dbtn" data-dic="_t" title="un botón más" onclick="alert('para futura función')" style="display:none;">
                        <div>btn4</div>
                    </div>


                    <div style="display: none;">
                        (<span class="test_font_hebrew">ָאֱלֹהִים</span>)
                        (<span class="test_font_greek">λόγος</span>)
                    </div>

                    
                </div>


                <div class="wr_menu_r">
                    <h3>BQ</h3>
                    <select id="sel_lang" class="select_lang" onchange="changeLang(this.value)">
                        <option value="ru">RU</option>
                        <option value="ua">UA</option>
                        <option value="es">ES</option>
                        <option value="en">EN</option>
                    </select>    
                    <div id="login_menu" data-dic="d18_t" title="Login" onclick="openModal('top',this.title,null,'showLogin')">
                        <img src="images/login2_white.svg">
                    </div>
                    <div id="tres_puntos_menu" data-dic="d19_t" title="menu..." onclick="openModal('top','Меню',null,'showMenu')">
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
                                <button id="btn_nav" class="btn btn_active" onclick="showTab(this,'nav')" data-dic="d20_t" title="Навигация">
                                    <img class="btn_img" src="./images/open_book_white.png">
                                </button>
                                <button id="btn_find" class="btn" onclick="showTab(this,'find')" data-dic="d21_t" title="Поиск">
                                    <img class="btn_img" src="./images/search_zoom_icon_white.svg">
                                </button>
                                <button id="btn_tsk" class="btn" onclick="showTab(this,'tsk')" data-dic="d22_t" title="TSK - Перекрестные Ссылки">
                                    <img class="btn_img" src="./images/book_reference_white.svg">
                                </button>
                                <button id="btn_strong" class="btn" onclick="showTab(this,'strong')" data-dic="d23_t" title="Словарь Стронга">
                                    <span>S#</span>
                                </button>
                                <button id="btn_markers" class="btn" onclick="showTab(this,'markers')" data-dic="d24_t" title="Маркеры / Закладки">
                                    <img class="btn_img" src="./images/book_marker_white.svg">
                                </button>

                                


                                <button id="btn_comm" class="btn d-none" onclick="" data-dic="d25_t" title="Комментарии">Comm</button>
                                <button id="btn_dic" class="btn d-none" onclick="" data-dic="d26_t" title="Словари">Dic</button>
                            </div>
                        </div>


                        <div id="btn_settings" class="" onclick="alert('en derarrollo...')" data-dic="" title="Ajustes" style="display: ;">
                            <img class="btn_img posi-tion_row" src="./images/settings7_white.svg">
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

                        <div class="wr_regs">Registros: <span class="f_r">5/100</span></div>
                        
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
                                <div data-dic="d27">Книга</div>
                            </div> 
                            <div id="s_chapter" class="v_bcv" onclick="sel(this,'ch',null,document.querySelector('#inpt_nav').dataset.trans)">
                                <div data-dic="d28">Глава</div>
                            </div> 
                            <div id="s_verse" class="v_bcv" onclick="sel(this,'v',null,document.querySelector('#inpt_nav').dataset.trans)">
                                <div data-dic="d29">Стих</div>
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
                                <span class="prim_verse" data-dic="d">html: Antes de seleccionar el versículo, selecciona el capítulo por favor.</span> 
                            </ul>
                        </div>
                    </div>
                </div><!--/vklad_nav-->

                <div id="vklad_find" class="vklads" style="display: none;">
                    <div id="wr_find_head">
                        <div class="wr_nav">
                            <div class="wr_inpt_x">
                                <input id="inpt_find" data-dic="d30_ph" placeholder="Введите слово или фразу..." value="">
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

                        <div class="wr_regs">Registros: <span class="f_r">5/100</span></div>

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
                                    <span data-dic="d31">Параметры поиска:</span>
                                    <img src="images/icon_razvernut.png">
                                    <span class="trans_name"></span>
                                </div>

                                <div class="bl_trig bl_par" style="display:none;">

                                    <div class="wr_sel">
                                        <select id="gde">
                                            <option value="TB" data-dic="d32">ВСЯ БИБЛИЯ</option>
                                            <option value="AT" data-dic="d33">ВЕТХИЙ ЗАВЕТ</option>
                                            <option value="NT" data-dic="d34">НОВЫЙ ЗАВЕТ</option>
                                            <option disabled></option>

                                            <optgroup data-dic="d35_lab" label="Категории">
                                                <option disabled data-dic="d36">--- Ветхий Завет ---</option>
                                                <option value="M" data-dic="d37">#Пятикнижье</option>
                                                <option value="Hist" data-dic="d38">#Исторические книги</option>
                                                <option value="Poet" data-dic="d39">#Поэтические книги</option>
                                                <option value="Prof" data-dic="d40">#Пророки (Болшие и Малые)</option>
                                                <option value="ProfB" data-dic="d41">#Большие Пророки</option>
                                                <option value="ProfM" data-dic="d42">#Малые Пророки</option>
                                                <option disabled></option>
                                                <option disabled data-dic="d43">--- Новый Завет ---</option>
                                                <option value="EvActs" data-dic="d44">#Евангелия и Деяния</option>
                                                <option value="EpPablo" data-dic="d45">#Послания Павла</option>
                                                <option value="EpSoborn" data-dic="d46">#Соборные Послания</option>
                                                <option value="Apocrif" data-dic="d47">#Неканонические книги</option>
                                            </optgroup>
                                            <option disabled></option>
                                            
                                            <optgroup data-dic="d48_lab" label="Пятикнижье">
                                                <option value="0" data-dic="d49">Бытие</option>
                                                <option value="1" data-dic="d50">Исход</option>
                                                <option value="2" data-dic="d51">Левит</option>
                                                <option value="3" data-dic="d52">Числа</option>
                                                <option value="4" data-dic="d53">Второзаконие</option>
                                            </optgroup>
                                            <option disabled></option>
                                            
                                            <optgroup data-dic="d54_lab" label="Исторические книги">
                                                <option value="5" data-dic="d55">Иисус Навин</option>
                                                <option value="6" data-dic="d56">Судьи</option>
                                                <option value="7" data-dic="d57">Руфь</option>
                                                <option value="8" data-dic="d58">1 Царств</option>
                                                <option value="9" data-dic="d59">2 Царств</option>
                                                <option value="10" data-dic="d60">3 Царств</option>
                                                <option value="11" data-dic="d61">4 Царств</option>
                                                <option value="12" data-dic="d62">1 Паралипоменон</option>
                                                <option value="13" data-dic="d63">2 Паралипоменон</option>
                                                <option value="14" data-dic="d64">Ездра</option>
                                                <option value="15" data-dic="d65">Неемия</option>
                                                <option value="16" data-dic="d66">Есфирь</option>
                                            </optgroup>
                                            <option disabled></option>
                                            
                                            <optgroup data-dic="d67_lab" label="Поэтические книги">
                                                <option value="17" data-dic="d68">Иов</option>
                                                <option value="18" data-dic="d69">Псалтирь</option>
                                                <option value="19" data-dic="d70">Притчи</option>
                                                <option value="20" data-dic="d71">Екклесиаст</option>
                                                <option value="21" data-dic="d72">Песни Песней</option>
                                            </optgroup>
                                            <option disabled></option>
                                            
                                            <optgroup data-dic="d73_lab" label="Большие Пророки">
                                                <option value="22" data-dic="d74">Исаия</option>
                                                <option value="23" data-dic="d75">Иеремия</option>
                                                <option value="24" data-dic="d76">Плач Иеремии</option>
                                                <option value="25" data-dic="d77">Иезекииль</option>
                                                <option value="26" data-dic="d78">Даниил</option>
                                            </optgroup>
                                            <option disabled></option>

                                            <optgroup data-dic="d79_lab" label="Малые Пророки">
                                                <option value="27" data-dic="d80">Осия</option>
                                                <option value="28" data-dic="d81">Иоиль</option>
                                                <option value="29" data-dic="d82">Амос</option>
                                                <option value="30" data-dic="d83">Авдий</option>
                                                <option value="31" data-dic="d84">Иона</option>
                                                <option value="32" data-dic="d85">Михей</option>
                                                <option value="33" data-dic="d86">Наум</option>
                                                <option value="34" data-dic="d87">Аввакум</option>
                                                <option value="35" data-dic="d88">Софония</option>
                                                <option value="36" data-dic="d89">Аггей</option>
                                                <option value="37" data-dic="d90">Захария</option>
                                                <option value="38" data-dic="d91">Малахия</option>
                                            </optgroup>
                                            <option disabled></option>
                                            
                                            <optgroup data-dic="d92_lab" label="Евангелия">
                                                <option value="39" data-dic="d93">Матфея</option>
                                                <option value="40" data-dic="d94">Марка</option>
                                                <option value="41" data-dic="d95">Луки</option>
                                                <option value="42" data-dic="d96">Иоанна</option>
                                            </optgroup>
                                            <option disabled></option>

                                            <optgroup data-dic="d97_lab" label="Деяния">
                                                <option value="43" data-dic="d98">Деяния</option>
                                            </optgroup>
                                            <option disabled></option>

                                            <optgroup data-dic="d99_lab" label="Послания Павла">
                                                <option value="44" data-dic="d100">Римлянам</option>
                                                <option value="45" data-dic="d101">1 Коринфянам</option>
                                                <option value="46" data-dic="d102">2 Коринфянам</option>
                                                <option value="47" data-dic="d103">Галатам</option>
                                                <option value="48" data-dic="d104">Ефесянам</option>
                                                <option value="49" data-dic="d105">Филиппийцам</option>
                                                <option value="50" data-dic="d106">Колоссянам</option>
                                                <option value="51" data-dic="d107">1 Фессалоникийцам</option>
                                                <option value="52" data-dic="d108">2 Фессалоникийцам</option>
                                                <option value="53" data-dic="d109">1 Тимофею</option>
                                                <option value="54" data-dic="d110">2 Тимофею</option>
                                                <option value="55" data-dic="d111">Титу</option>
                                                <option value="56" data-dic="d112">Филимону</option>
                                                <option value="57" data-dic="d113">Евреям</option>
                                            </optgroup>
                                            <option disabled></option>

                                            <optgroup data-dic="d114_lab" label="Соборные Послания">
                                                <option value="58" data-dic="d115">Иакова</option>
                                                <option value="59" data-dic="d116">1 Петра</option>
                                                <option value="60" data-dic="d117">2 Петра</option>
                                                <option value="61" data-dic="d118">1 Иоанна</option>
                                                <option value="62" data-dic="d119">2 Иоанна</option>
                                                <option value="63" data-dic="d120">3 Иоанна</option>
                                                <option value="64" data-dic="d121">Иуды</option>
                                            </optgroup>
                                            <option disabled></option>

                                            <optgroup data-dic="d122_lab" label="Откровение">
                                                <option value="65" data-dic="d123">Откровение</option>
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
                                            <span data-dic="d124">1. Искомое содержит хотя бы одно слово</span>
                                            <span class="tooltip"  data-dic="d125_ttip" data-tooltip="Пример: найти не только стихи, содержащие 'Иисус Христос', но и те, которые содержат 'Иисус' или 'Христос'." onmouseenter="showTooltip(this)" onmouseleave="hideTooltip(this)">*</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input id="cbox2" type="checkbox" onclick="cboxChange(this)" value=""> 
                                            <span data-dic="d126">2. Cлова идут в заданном порядке</span>
                                            <span class="tooltip" data-dic="d127_ttip" data-tooltip="Пример: найти стихи, где встречается 'Иисус Христос', но не 'Христос Иисус'." onmouseenter="showTooltip(this)" onmouseleave="hideTooltip(this)">*</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input id="cbox3" type="checkbox" onclick="cboxChange(this)" value=""> 
                                            <span data-dic="d128">3. Искать точную фразу</span>
                                            <span class="tooltip" data-dic="d129_ttip" data-tooltip="Пример: найти стихи, где есть 'Благословен Бог', но не 'Благословен ГОСПОДЬ Бог'." onmouseenter="showTooltip(this)" onmouseleave="hideTooltip(this)">*</span>

                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input id="cbox4" type="checkbox" onclick="cboxChange(this)" value=""> 
                                            <span data-dic="d130">4. Выражения не могут быть частями слов</span>
                                            <span class="tooltip" data-dic="d131_ttip" data-tooltip="Пример: найти стихи, где есть 'благословен', но не 'благословенИЕ'." onmouseenter="showTooltip(this)" onmouseleave="hideTooltip(this)">*</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input id="cbox5" type="checkbox" onclick="cboxChange(this)" value=""> 
                                            <span data-dic="d132">5. Различать прописные и ЗАГЛАВНЫЕ буквы</span>
                                            <span class="tooltip" data-dic="d133_ttip" data-tooltip="Пример: различать при поиске слова 'БОГ' и 'бог'." onmouseenter="showTooltip(this)" onmouseleave="hideTooltip(this)">*</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input id="cbox6" type="checkbox" onclick="cboxChange(this)" value=""> 
                                            <span data-dic="d134">6. Различать буквы с ударениями (если есть)</span>
                                            <span class="tooltip" data-dic="d135_ttip" data-tooltip="Пример: различать при поиске слова 'creó' (сотворил) и 'creo' (верю)." onmouseenter="showTooltip(this)" onmouseleave="hideTooltip(this)">*</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input id="cbox7" type="checkbox" onclick="cboxChange(this)" value=""> 
                                            <span data-dic="d136">7. Искать только номер Стронга (если есть)</span>
                                            <span class="tooltip" data-dic="d137_ttip" data-tooltip="Пример: Искать толко номер Стронга 'H430' (Бог) в модулях, где он есть." onmouseenter="showTooltip(this)" onmouseleave="hideTooltip(this)">*</span>

                                        </label>
                                    </p>                                    
                                </div>                                
                            </div><!--/wr_op-->
                        </div><!--/find_head-->
                        <div id="find_result"></div>
                    </div><!--/wr_find_head-->
                    <div id="find_body">
                        <span class="prim_tsk" data-dic="d138">Introduce el texto para buscar y si quieres aplica los parámetros del filtro.</span>
                    </div>
                </div><!--/vklad_find-->

                <div id="vklad_tsk" class="vklads" style="display: none;">
                    <div id="tsk_head">
                        <h4 data-dic="d139">TSK - Перекрестные Ссылки</h4>
                    </div>
                    <div id="tsk_body">
                        <span class="prim_tsk" data-dic="d140">Para ver pasajes paralelos del versículo, presiona la referencia. Por ejemplo: Gen.1:1</span>
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
                        <div class="wr_regs">Registros: <span class="f_r">5/100</span></div>
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
                        <span class="prim_tsk" data-dic="d141">Introduce el número de Strong para ver su significado y dónde se encuenta.</span>
                    </div>
                </div><!--/vklad_strong-->

                <div id="vklad_markers" class="vklads" style="display: none;">
                    <div id="markers_head">
                        <h4 data-dic="d142">Маркеры / Закладки</h4>
                        <span id="markers_porcentaje">0/100</span>
                    </div>
                    <div id="markers_body">    
                        <div id="wr_markers">
                            <div class="wr_markers_inner">
                                <span class="prim_tsk"><span data-dic="d143">Нет записей в Маркерах.</span> <br><a href="#" data-dic="d144" data-info="1. Кликните на стих 2. Кликните на кнопку с троеточием 3. Кликните на вторую кнопку слева" onclick="event.preventDefault(); alert(this.dataset.info);">Как добавить стих?</a></span>
                            </div>
                        </div>
                    </div>
                </div><!--/vklad_markers-->




            </div><!--/sidebarInner-->
        </div>
        
        <div id="vert_line"></div>

        <div id="container">
            <div id="containerInner">


                <div id="headerContainer">
                    <div id="headerContainerInner">

                        <noscript>
                            <p data-dic="d145">Por favor, activa JavaScript para ver este sitio web correctamente.</p>
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

                                <button class="btnMenu btn btn_svg" data-typebtn="transMenu" onclick="openSidebar(this)">
                                    <img src="images/menu_white.svg">
                                </button>
                                <button class="btn btn_svg"data-dic="d9_t" onclick="chapterGo('prev')" title="Previous Chapter">
                                    <img src="images/arrow_chevron_left_white.svg">
                                </button>
                                
                                <div class="centralPart">
                                    <button class="btn" data-dic="d146_t" title="Избранныe модули Библии" onclick="openModal('full','Избранныe модули Библии',document.querySelector('#trans1.colsHead'),'showModules')">
                                        <span class="mob_trans">RST+r</span>
                                    </button>
                                    <div class="separ_line"></div>
                                    <button class="btn" data-dic="d147_t" data-typebtn="transRef" onclick="showTabMob('#btn_nav','nav',this)" title="Навигация. Выбор книги, главы, стиха">
                                        <span>Быт. 1:1</span>
                                    </button>
                                </div>
                                
                                <button class="btn btn_svg" data-dic="d10_t" onclick="chapterGo('next')" title="Next Chapter">
                                    <img src="images/arrow_chevron_right_white.svg">
                                </button>
                                <button class="btn btn_svg" data-dic="d19_t" title="Меню" onclick="openModal('top','Меню',null,'showMenu')">
                                    <img src="images/tres_puntos2_white.svg" style="width:24px;">
                                </button>

                            </div>
                        </div>


                    </div>
                </div>

                <div id="wrPageBtns" style="position:relative;z-index: 1;">                                        
                    <button id="btn_pageUp" onclick="pageUp()"><img src="images/arrow_chevron_down_white.svg"></button>
                    <button id="btn_pageDown" onclick="pageDown()"><img src="images/arrow_chevron_down_white.svg"></button>
                </div>

                                
                <div id="wrCols">
               
                    <div id="col1" class="cols">
                        <div id="trans1" class="colsHead" data-trans="rstStrongRed" data-base_ep="N">
                            <div class="colsHeadInner">

                                <div class="partDesk">

                                    <div class="wr_desk_trans">

                                        <button class="btn btn_svg" data-dic="d9_t" onclick="chapterGo('prev')" title="Previous Chapter">
                                            <img src="images/arrow_chevron_left_white.svg">
                                        </button>

                                        <div class="centralPart" data-dic="d146_t" title="Избранныe модули Библии" onclick="openModal('full',this.title,document.querySelector('#trans1.colsHead'),'showModules')">
                                            <div class="desk_trans">RST</div>
                                            <div class="separ_line"></div>
                                            <div class="desk_sh_link">Gn. 1:1</div>
                                        </div>

                                        <button class="btn btn_svg" onclick="chapterGo('next')" title="Next Chapter">
                                            <img src="images/arrow_chevron_right_white.svg">
                                        </button>

                                    </div>

                                </div>

                                <div class="partMob">
                                    <div class="partMobInner">

                                        <button class="btnMenu btn btn_svg" data-typebtn="transMenu" onclick="openSidebar(this)">
                                            <img src="images/menu_white.svg">
                                        </button>
                                        <button class="btn btn_svg" data-dic="d9_t" onclick="chapterGo('prev')" title="Previous Chapter">
                                            <img src="images/arrow_chevron_left_white.svg">
                                        </button>
                                        
                                        <div class="centralPart">
                                            <button class="btn" data-dic="d146_t" title="Избранныe модули Библии" onclick="openModal('full',this.title,document.querySelector('#trans1.colsHead'),'showModules')">
                                                <span class="mob_trans">RST+r</span>
                                            </button>
                                            <div class="separ_line"></div>
                                            <button class="btn" data-dic="d147_t" data-typebtn="transRef" onclick="showTabMob('#btn_nav','nav',this)" title="Навигация. Выбор книги, главы, стиха">
                                                <span class="mob_sh_link">Быт. 1:1</span>
                                            </button>
                                        </div>
                                        
                                        <button class="btn btn_svg" data-dic="d10_t" onclick="chapterGo('next')" title="Next Chapter">
                                            <img src="images/arrow_chevron_right_white.svg">
                                        </button>
                                        <button class="btn btn_svg" data-dic="d19_t" title="Меню" onclick="openModal('top',this.title,null,'showMenu')">
                                            <img src="images/tres_puntos2_white.svg" style="width:24px;">
                                        </button>
                                        
                                    </div>
                                </div>
                            
                            </div><!--/colsHeadInner-->
                        </div><!--/colsHead-->
                        <div class="colsInner">
                            <p data-dic="d148">Cargando la Biblia... </p>                            

                            
                            <!--testings start-->
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
                            <!--testings end-->

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


    <!-- The Modal -->
    <div id="myModal" class="modal">

        <!-- Modal Content -->
        <div id="myModalContent" class="modal-content">

            <header id="modcont_header">
                <div class="inner">
                    <h4>
                        <span class="close" onclick="closeModal(null,true)">&#10005;</span><!-- x -->
                        <span id="btn_sp_menu_settings" class="sp_menu_settings" onclick="alert('en desarrollo...')" style="display:none;"></span>

                        <span id="btn_sp_atras" class="sp_atras" data-dic="d19_t" title="Меню" onclick="openModal('top',this.title,null,'showMenu')"></span>
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
    
    if(isset($_GET['login'])){
print<<<HERE
<script>
    setTimeout(()=>{
        openModal('top','Login',null,'showLogin');
    },3000);
</script>
HERE;
    }


    if(isset($_GET['from_aviso'])){
print<<<HERE
<script>
    setTimeout(()=>{
        openModal('top','Login',null,'showLogin');
    },3000);
</script>
HERE;
    }


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
        $st_bl_login_form = 'none';
        $st_bl_register_form = 'none';
        $st_bl_email_form = 'none';
        $st_bl_change_email_form = 'none';
        $frase_bienvenida = '<span data-dic="d151">Bienvenido</span>, ' . $_SESSION['username'];
        //$frase_bienvenida .= "<br>(id_user: " .$_SESSION['id_user'] . ")";//para test
        $mensaje = '<span class="clr_gr-een" data-dic="d149">Sesión iniciada correctamente. Se cargan tus ajustes personales.</span>';
        $login_img_src = './images/login2_white.svg';
        //echo "<script>alert('js session iniciada. Bienvenido, " . $_SESSION['username'] . ".')</script>";
print<<<HERE
<script>
    let hay_sesion = true;
    let username = '$_SESSION[username]';
    let email = '$_SESSION[email]';
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
        $st_bl_login_form = 'block';
        $st_bl_register_form = 'none';
        $st_bl_email_form = 'none';
        $st_bl_change_email_form = 'none';
        $frase_bienvenida = '<span data-dic="d152">No estás logueado.</span>';
        $mensaje = '<span data-dic="d150">Sesión no iniciada.</span>';
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
                    <h1 data-dic="d177">Crear cuenta</h1>
                    <p class="mensaje" data-dic="d178">Al crear la cuenta tendrás acceso a tus ajustes personales.</p>
                    <input id="reg_username" name="username" type="text" autocomplete="off" placeholder="Nombre" data-dic="d192_ph" />
                    <input id="reg_email" name="email" type="email" autocomplete="on" placeholder="Email" required data-dic="d194_ph" />
                    <input id="reg_password" name="password" class="type_password m_bot0" type="password" autocomplete="off" placeholder="Contraseña" data-dic="d193_ph" />
                    <label class="ch_lab">
                        <input class="ch_mostrar" type="checkbox" onchange="showHidePassword(this)">
                        <span class="ch_mostrar_sp">mostrar contraseña</span>
                    </label>
                    <button class="btn_wide" type="button" onclick="crearCuenta()" data-dic="d177">Crear cuenta</button>
                    <p class="message"><span data-dic="d179">¿Ya estás registrado?</span> <a href="#" onclick="mostrarLoginForm()" data-dic="d180">Entrar</a></p>
                </form>
            </div>

            <div id="bl_email_form" style="display:$st_bl_email_form;">
                <form class="email-form">
                    <h1 data-dic="d181">Recuperar contraseña</h1>
                    <p class="mensaje" data-dic="d182">Introduce tu correo electrónico para recibir instrucciones sobre cómo establecer una nueva contraseña.</p>
                    <input id="rec_email" name="email" type="email" required autocomplete="on" placeholder="Email" data-dic="d194_ph" />
                    <button class="btn_wide" type="button" onclick="enviarEmail()" data-dic="d183">Enviar</button>
                    <p class="message"><a href="#" onclick="mostrarLoginForm()" data-dic="d184">Iniciar sesión</a></p>
                </form>
            </div>

            <div id="bl_change_email_form" style="display:$st_bl_change_email_form;">
                <form class="change-email-form">
                    <h1 data-dic="d185">Cambiar contraseña</h1>
                    <p class="mensaje" data-dic="d186">Introduce tu correo electrónico actual y las contraseñas, actual y nueva.</p>
                    <input id="act_email" name="email" type="email" required autocomplete="on" placeholder="Actual email" data-dic="d195_ph" />
                    <input id="act_password" name="password" class="type_password" type="password" autocomplete="on" placeholder="Actual contraseña" data-dic="d196_ph" />
                    <input id="new_password" name="password" class="type_password" type="password" autocomplete="off" placeholder="Nueva contraseña" data-dic="d197_ph" />
                    <input id="new_password_rep" name="password" class="type_password m_bot0" type="password" autocomplete="off" placeholder="Repite nueva contraseña" data-dic="d198_ph" />
                    <label class="ch_lab">
                        <input class="ch_mostrar" type="checkbox" onchange="showHidePassword(this)">
                        <span class="ch_mostrar_sp">mostrar contraseña</span>
                    </label>
                    <button class="btn_wide" type="button" onclick="enviarChangeEmail()" data-dic="d187">Cambiar</button>
                    <p class="message"><a href="#" onclick="mostrarLoginForm()" data-dic="d184">Iniciar sesión</a></p>
                </form>
            </div>
            
            <div id="bl_login_form" style="display:$st_bl_login_form;">
                <form class="login-form">
                    <h1 data-dic="d184">Iniciar sesión</h1>
                    <p class="mensaje">
                        <span data-dic="d188">Tendrás acceso a tus ajustes personales.</span>
                    </p>
                    <input id="username_email" name="username_email" type="email" autocomplete="on" placeholder="Email" data-dic="d194_ph" required />
                    <input id="password" name="password" class="type_password m_bot0" type="password" autocomplete="on" placeholder="Contraseña" data-dic="d193_ph" required />
                    <label class="ch_lab">
                        <input class="ch_mostrar" type="checkbox" onchange="showHidePassword(this)">
                        <span class="ch_mostrar_sp">mostrar contraseña</span>
                    </label>
                    <button class="btn_wide" type="button" onclick="iniciarSesion()" data-dic="d184">Iniciar Sesión</button>
                    <p class="message">
                        <span data-dic="d189">¿No estás registrado?</span> <a href="#" onclick="mostrarForm('bl_register_form')" data-dic="d177">Crear cuenta</a>
                        <br><span data-dic="d190">¿Has olvidado la contraseña?</span> <a href="#" onclick="mostrarForm('bl_email_form')" data-dic="d181">Recuperar contraseña</a>
                        <br><span data-dic="d191">¿Quieres cambiar la contraseña?</span> <a href="#" onclick="mostrarForm('bl_change_email_form')" data-dic="d185">Cambiar contraseña</a>
                    </p>
                </form>
            </div>

            <div id="bl_sesion_iniciada" style="display:$st_bl_sesion_iniciada;">
                <h1>$frase_bienvenida!</h1>
                <p class="mensaje">$mensaje</p>
                <br>
                <p class="p_svit">
                    <span class="sp_svit">
                        <span data-dic="d201">Исследуйте Писания, ибо вы думаете чрез них иметь жизнь вечную; а они свидетельствуют о Мне.</span>
                        <a href="#" class="" onclick="getRefByCodeWithoutTrans(42,5,39);closeModal('Login');" data-dic="d202">Иоан. 5:39</a>
                    </span>                    
                    <img src="./images/svitok3.png">
                </p>
                <button class="cerr_ses" onclick="cerrarSesion()" style="display:none;" data-dic="d153">Cerrar Sesión</button>
                <p class="p_cerr_ses">
                    <a href="#" class="a_cerr_ses" onclick="cerrarSesion()" data-dic="d153">Cerrar sesión</a>
                </p>
            </div>

        </div>

  </div>
HERE;
?>
                                </div>
                            </div><!--/#topLogin-->


                            <div id="topMenu">
                                <div id="topMenuInner">
<?php
print<<<HERE
                                    <div id="m_login_menu" class="dbtn" data-dic="d18_t" title="Login" onclick="openModal('top',this.title,null,'showLogin')" style="width:100%;">
                                        <div class="dbtn_inner">
                                            <img src="$login_img_src">    
                                            <span data-dic="d18_t">Login</span>
                                        </div>
                                    </div>
HERE;
?>
                                    <div class="dbtn" data-dic="d3_t" title="Remove Bible Translation" onclick="removeTrans()">
                                        <div>Tr -</div>
                                    </div>
                                    <div class="dbtn" data-dic="d4_t" title="Add Bible Translation" onclick="addTrans('askForTrans')">
                                        <div>Tr +</div>
                                    </div>

                                    <div class="dbtn" data-dic="d5_t" title="Quitar Pestaña" onclick="removeTab()">
                                        <div>Vk -</div>
                                    </div>
                                    <div class="dbtn" data-dic="d6_t" title="Añadir Pestaña" onclick="addTab(null,null,null,'tab_new')">
                                        <div>Vk +</div>
                                    </div>


                                    <div class="dbtn" data-dic="d7_t" title="Previous book" onclick="bookGo('prev')">
                                        <img src="images/arrow_backward_white.svg">
                                    </div>
                                    <div class="dbtn" data-dic="d8_t" title="Next book"onclick="bookGo('next')">
                                        <img src="images/arrow_forward_white.svg">
                                    </div>

                                    <div class="dbtn" data-dic="d9_t" title="Previous chapter" onclick="chapterGo('prev')">
                                        <img src="images/arrow_chevron_left_white.svg">                            
                                    </div>
                                    <div class="dbtn" data-dic="d10_t" title="Next chapter" onclick="chapterGo('next')">
                                        <img src="images/arrow_chevron_right_white.svg">
                                    </div>

                                    <div class="dbtn" data-dic="d11_t" title="History previous register" onclick="hist('prev')">
                                        <div>< H</div>
                                    </div>
                                    <div class="dbtn" data-dic="d12_t" title="History next register" onclick="hist('next')">
                                        <div>H ></div>
                                    </div>                        

                                    <div id="btn_changePositionShowModal" class="dbtn" data-dic="d13_t" title="Change position: Columns or Rows" onclick="changePositionShow()">
                                        <!--<div>Row</div>-->
                                        <img class="col_row position_row" src="images/col_row_white.svg">
                                    </div>
                                    <div id="m_btnStrong" class="dbtn" data-dic="d14_t" title="Show / Hide Strong Numbers" onclick="showHideStrongNumbers()">
                                        <div>S#</div>
                                    </div>

                                    <div class="dbtn" data-dic="d146_t" title="Избранныe модули Библии" onclick="openModal('full',this.title,document.querySelector('#trans1.colsHead'),'showModules')" style="width:50%;">
                                        <div data-dic="d161">Модули</div>
                                    </div>
                                    <div class="dbtn" data-dic="d154_t" title="Вкладки" onclick="showTabs()" style="width:50%;">
                                        <div data-dic="d155">Вкладки</div>
                                    </div>


                                    <div class="dbtn" data-dic="d156_t" title="Маркеры / Закладки" onclick="openModal('full','Маркеры',null,'showMarkers')" style="width:50%;">
                                        <div data-dic="d157">Маркеры</div>
                                    </div>
                                    <div class="dbtn" data-dic="d158_t" title="Заметки" onclick="alert('функция в разработке...')" style="width:50%;">
                                        <div data-dic="d159">Заметки</div>
                                    </div>



                                    <div style="display:none;">                                    
                                        <div id="m_btnMinOtrasTrans" class="dbtn" data-dic="d" title="Minimizar Otras Trans" onclick="enableDisableMinOtrasTrans()" style="width:33.33%;">
                                            <div>Tr_min</div>
                                        </div>
                                        <div id="m_btnMaxWidthCol" class="dbtn" data-dic="d" onclick="enableDisableMaxWidthCol()" style="width:33.33%;">
                                            <div>mw_Col</div>
                                        </div>
                                        <div id="m_btnIMGx2" class="dbtn" data-dic="d" title="Aumentar la anchura de la imagen x2" onclick="enableDisableIMGx2()" style="width:33.33%;">
                                            <div>IMGx2</div>
                                        </div>


                                        <div id="m_btnByText" class="dbtn" data-dic="d" onclick="changeModo('by_text')" style="width:33.33%;">
                                            <div>by_text</div>
                                        </div>
                                        <div id="m_btnByJson" class="dbtn" data-dic="d" onclick="changeModo('by_json')" style="width:33.33%;">
                                            <div>by_json</div>
                                        </div>
                                        <div id="m_btnVkladkiInMob" class="dbtn" data-dic="d" onclick="hideShowVkladkiInMob()" style="width:33.33%;">
                                            <div>Tabs_in_Mob</div>
                                        </div>
                                    </div>



                                    <h3 data-dic="d160">Загрузки (RAM)</h3>

                                    <div id="m_btn_loadAllFavBibleFiles" class="dbtn" onclick="loadAllFavBibleFiles()" style="width:33.33%;">
                                        <div data-dic="d161">Модули</div>
                                    </div>
                                    <div id="m_btn_loadAllFavTskFiles" class="dbtn" onclick="loadAllFavTskFiles()" style="width:33.33%;">
                                        <div data-dic="d162">TSK</div>
                                    </div>
                                    <div id="m_btn_loadAllFavStrongFiles" class="dbtn" onclick="loadAllFavStrongFiles()" style="width:33.33%;">
                                        <div data-dic="d163">Стронг</div>
                                    </div>


                                    <h3 data-dic="d164">История</h3>

                                    <div class="dbtn" data-dic="d165_t" title="История навигации" onclick="openModal('full',this.title,null,'showHistoryNav')" style="width:33.33%;">
                                        <div class="dbtn_inner">
                                            <img src="./images/history_icon_white.svg">    
                                            <span data-dic="d166">Nav.</span>
                                        </div>
                                    </div>
                                    <div class="dbtn" data-dic="d167_t" title="История поиска" onclick="openModal('full',this.title,null,'showHistoryFind')" style="width:33.33%;">
                                        <div class="dbtn_inner">
                                            <img src="./images/history_icon_white.svg">    
                                            <span data-dic="d168">Find</span>
                                        </div>
                                    </div>
                                    <div class="dbtn" data-dic="d169_t" title="История номеров Стронга" onclick="openModal('full',this.title,null,'showHistoryStrong')" style="width:33.33%;">
                                        <div class="dbtn_inner">
                                            <img src="./images/history_icon_white.svg">    
                                            <span data-dic="d163">Strong</span>
                                        </div>
                                    </div>


                                    <h3 data-dic="d170">Функциональность</h3>

                                    <div class="dbtn btns_sw" style="width: 100%;">
                                        <span data-dic="d199">Язык итнерфейса: </span>
                                        <select id="m_sel_lang" class="select_lang" onchange="changeLang(this.value)">
                                            <option value="ru">RU</option>
                                            <option value="ua">UA</option>
                                            <option value="es">ES</option>
                                            <option value="en">EN</option>
                                        </select>
                                    </div>

                                    <div id="d_sw_modoMobile" class="dbtn btns_sw" onclick="enableDisableModoMobile()">
                                        <div class="wr_sw_text">
                                            <span class="sp_com">
                                                modo_Mobile
                                            </span>
                                            <span class="sp_expl" data-dic="d227">
                                                Форсировать мобильный режим (до 1200px)
                                            </span>
                                        </div>
                                        <label class="switch">
                                            <input type="checkbox" onclick="enableDisableModoMobile()">
                                            <span class="slider"></span>
                                        </label>
                                    </div>
                                    
                                    <div id="d_sw_VkladkiInMob" class="dbtn btns_sw" onclick="hideShowVkladkiInMob()">
                                        <div class="wr_sw_text">
                                            <span class="sp_com">
                                                Tabs_in_Mob
                                            </span>
                                            <span class="sp_expl" data-dic="d174">
                                                Показывать вкладки в мобильном режиме
                                            </span>
                                        </div>
                                        <label class="switch">
                                            <input type="checkbox" onclick="hideShowVkladkiInMob()">
                                            <span class="slider"></span>
                                        </label>
                                    </div>

                                    <div id="d_sw_MinOtrasTrans" class="dbtn btns_sw" onclick="enableDisableMinOtrasTrans()">
                                        <div class="wr_sw_text">                                            
                                            <span class="sp_com">
                                                Tr_min
                                            </span>
                                            <span class="sp_expl" data-dic="d171">
                                                Свернуть другие переводы, чтобы видеть только основной перевод (первая колонка слева)
                                            </span>
                                        </div>
                                        <label class="switch">
                                            <input type="checkbox" onclick="enableDisableMinOtrasTrans()">
                                            <span class="slider"></span>
                                        </label>
                                    </div>

                                    <div id="d_sw_MaxWidthCol" class="dbtn btns_sw" onclick="enableDisableMaxWidthCol()">
                                        <div class="wr_sw_text">
                                            <span class="sp_com">
                                                mw_Col
                                            </span>
                                            <span class="sp_expl" data-dic="d172">
                                                Включить максимальную ширину 350px для просмотра колонок, как в газете
                                            </span>
                                        </div>
                                        <label class="switch">
                                            <input type="checkbox" onclick="enableDisableMaxWidthCol()">
                                            <span class="slider"></span>
                                        </label>
                                    </div>

                                    <div id="d_sw_btnIMGx2" class="dbtn btns_sw" onclick="enableDisableIMGx2()">
                                        <div class="wr_sw_text">
                                            <span class="sp_com">
                                                IMGx2
                                            </span>
                                            <span class="sp_expl" data-dic="d173">
                                                Увеличьте размер изображения x2, если таковое имеется
                                            </span>
                                        </div>
                                        <label class="switch">
                                            <input type="checkbox" onclick="enableDisableIMGx2()">
                                            <span class="slider"></span>
                                        </label>
                                    </div>

                                    <div id="d_sw_ByText" class="dbtn btns_sw" onclick="changeModo('by_text')">
                                        <div class="wr_sw_text">
                                            <span class="sp_com">
                                                by_text
                                            </span>
                                            <span class="sp_expl" data-dic="d175">
                                                Получать модули в формате текста (быстрее)
                                            </span>
                                        </div>
                                        <label class="switch">
                                            <input type="checkbox" onclick="changeModo('by_text')">
                                            <span class="slider"></span>
                                        </label>
                                    </div>

                                    <div id="d_sw_ByJson" class="dbtn btns_sw" onclick="changeModo('by_json')">
                                        <div class="wr_sw_text">
                                            <span class="sp_com">
                                                by_json
                                            </span>
                                            <span class="sp_expl" data-dic="d176">
                                                Получать модули в формате json
                                            </span>
                                        </div>
                                        <label class="switch">
                                            <input type="checkbox" onclick="changeModo('by_json')">
                                            <span class="slider"></span>
                                        </label>
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

    if(isset($_SESSION) && !empty($_SESSION) && !empty($_SESSION['email'])){
        //echo "<p>isset $ _SESSION. $ _SESSION[email]: " . $_SESSION['email'];
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

