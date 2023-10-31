<?php

if(isset($_GET) and !empty($_GET['url'])){
    $isGet = true;//comentar para conseguir datos por js
}else{
    $isGet = false;
}

//$isGet = true;//comentar para conseguir datos por js


if($isGet){
    //GET - para test
    echo"<pre>";
    print_r($_GET);
    echo"</pre>";

    $base_ep = (isset($_GET['base_ep']) and $_GET['base_ep'] == 'Y') ? 'Y' : 'N' ;
    $bq_EnglishPsalms = (isset($_GET['bq_EnglishPsalms']) and $_GET['bq_EnglishPsalms'] == 'Y') ? 'Y' : 'N' ;
    $col1_p_length = (isset($_GET['col1_p_length']) and $_GET['col1_p_length'] > 0) ? $_GET['col1_p_length'] : null ;
    
    $url = (isset($_GET['url']) and !empty($_GET['url'])) ? $_GET['url'] : false ;
    $book = (isset($_GET['book']) and !empty($_GET['book'])) ? $_GET['book'] : null ;
    $chapter = (isset($_GET['chapter']) and !empty($_GET['chapter'])) ? $_GET['chapter'] : 1 ;
    $verse = (isset($_GET['verse']) and !empty($_GET['verse'])) ? $_GET['verse'] : null ;
    $to_verse = (isset($_GET['to_verse']) and !empty($_GET['to_verse'])) ? $_GET['to_verse'] : null ;
print<<<HERE
    <h1>isGet (test)</h1>
    <br>$ col1_p_length: <b>$col1_p_length</b>
    <br>$ url: <b>$url</b>
    <br>$ _GET['book']: <b>$_GET[book]</b>
    <br>$ book: <b>$book</b>
    <br>$ chapter: <b>$chapter</b>
    <br>$ verse: <b>$verse</b>
    <br>$ to_verse: <b>$to_verse</b>
    <hr>
HERE;
}else{   
    //POST
    $base_ep = (isset($_POST['base_ep']) and $_POST['base_ep'] == 'Y') ? 'Y' : 'N' ;
    $bq_EnglishPsalms = (isset($_POST['bq_EnglishPsalms']) and $_POST['bq_EnglishPsalms'] == 'Y') ? 'Y' : 'N' ;  
    $col1_p_length = (isset($_POST['col1_p_length']) and $_POST['col1_p_length'] > 0) ? $_POST['col1_p_length'] : null ;
    
    $url = (isset($_POST['url']) and !empty($_POST['url'])) ? $_POST['url'] : false ;
    $book = (isset($_POST['book']) and !empty($_POST['book'])) ? $_POST['book'] : null ;
    $chapter = (isset($_POST['chapter']) and !empty($_POST['chapter'])) ? $_POST['chapter'] : 1 ;
    $verse = (isset($_POST['verse']) and !empty($_POST['verse'])) ? $_POST['verse'] : null ;
    $to_verse = (isset($_POST['to_verse']) and !empty($_POST['to_verse'])) ? $_POST['to_verse'] : null ;
}



//creo un arr de datos de texto
$arr_data = [];
$arr_data_for_json = [];



if($url && $chapter){
    //echo "<p>existe $ url: $url</p>";
    //echo "<p>existe $ chapter: $chapter</p>";

    // $filename = "miarchivo.htm";
    $filename = $url;

    //Abrimos el fichero $filename y el resultado lo metemos en $myfile
    $myfile = fopen($filename, "r") or die("Unable to open file!");
    //Leemos el fichero filename que está en $myfile y el contenido del fichero lo meto en $myfile_read
    $myfile_read = fread($myfile,filesize($filename));
    //echo count($myfile_read);
    //echo $myfile_read;

    if(strpos($myfile_read, "<h2>") == false){
        //exit('vacio');
    } 

    //Nombre book  
    $arr_h2 = explode("<h2>", $myfile_read);
    //echo"<pre>";
    //print_r($arr_h2[0]);
    //echo"</pre>";

    if(strpos($myfile_read, "</h2>") !== false){
        $arr_h2_text = explode("</h2>", $arr_h2[1]);
        $BookName = $arr_h2_text[0];
        //echo"<p>if --- $ BookName: $BookName</p>";
    }else{
        $arr_h2_text = explode("<h4>", $arr_h2[1]);
        $BookName = $arr_h2_text[0];
        //echo"<p>else --- $ BookName: $BookName</p>";
    }
    $arr_data['h2_text'] = $BookName;
    
    


    //Nombre chapter
    $arr_h4 = explode("<h4>", $myfile_read);
    //echo"<h1>arr_h4:</h1><pre>";
    //print_r($arr_h4);
    //echo"</pre>";
    
    $chapter_max = count($arr_h4) - 1;
    //echo "<p>$ chapter_max: $chapter_max</p><hr>";

    if($chapter < 1) $chapter = 1;
    if($chapter > $chapter_max) $chapter = $chapter_max;


    //$arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, 12, 16);
    //$arr_data_for_json['vstavkaData'] = null;
    $arr_data_for_json['chapterData'] = getDataFromArr($arr_data, $arr_h4, $chapter, $verse, $to_verse);
    



    
    //=====================================================//
    // 1. inicio - Numeración base Española - y col's Rusa
    //=====================================================//
    if($base_ep == 'Y' && $bq_EnglishPsalms == 'N'){//numeración rusa
        
        //Miro la traducción con EnglishPsalms
        switch ($book) {

            case 3: //Числа
                    if($chapter == 12){//Числа 12:16 => Num. 13:1
                        // arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 13, 1);//add Num. 13:1
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, 13, 1);
                    }
                    if($chapter == 13){//13:1-33 => 13: +1
                        //nada
                    }
                break;

            case 5: //Иисус Навин
                    if($chapter == 5){//Ис.Нав.6:1 => Josue 5:16 | 6:2-27 =>	6: -1
                        //nada
                    }
                    if($chapter == 6){//Ис.Нав.6:1 => Josue 5:16 | 6:2-27 =>	6: -1
                        // arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 5, 16);//add Josue 5:16
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, 5, 16);
                    }
                break; 
                
            case 8: //1Samuel (1Царств) 
                    if($chapter == 20){//20:42-а	=> 20:42:00 | 20:42-б => 20:43:00
                        //1 verse contiene 2 en ruso
                        // arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 20, form_list_verses(1, col1_p_length+1) );
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, 20, 1, $col1_p_length+1);
                    }
                    if($chapter == 23){//23:29 => 24:1
                        //arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 24, 1 );
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, 24, 1);                        
                    }
                    if($chapter == 24){//24:1-22	=> 24: +1
                        //nada
                    }
                break; 
            
            case 17: //Job 
                    if($chapter == 39){
                        //nada
                    }
                    if($chapter == 40){//40:1-5 => 39:31-35 | 40:6-24 =>	40: -5
                        //arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 39, form_list_verses(31, 35) );
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, 39, 31, 35);
                    }
                    if($chapter == 41){//41:1-8 => 40:20-27 | 41:9-34 =>	41: -8
                        //arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 40, form_list_verses(20, 27) );
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, 40, 20, 27);
                    }
                break; 

            case 18: //Psalmos 
                    if($chapter >= 3 && $chapter <= 8){//3:1 - 9:20 =>	Х : +1 *
                        //nada
                    }
                    if($chapter == 9){//3:1 - 9:20 => Х : +1 *
                        //nada
                    }
                    if($chapter == 10){//10:2-18 => 9: +21
                        // arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 9, form_list_verses(22, 39) );
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, 9, 22, 39);
                    }
                    //Formula Esp => Rus //Ps.X:1 => Пс.X-1:1 
                    //-1 : Х
                    if(
                        ($chapter == 11) || 
                        ($chapter >= 14 && $chapter <= 17) || 
                        ($chapter >= 23 && $chapter <= 29) || 
                        ($chapter >= 32 && $chapter <= 33) || 
                        ($chapter == 35) || 
                        ($chapter == 37) || 
                        ($chapter == 43) || 
                        ($chapter == 50) || 
                        ($chapter == 66) || 
                        ($chapter >= 71 && $chapter <= 74) || 
                        ($chapter >= 78 && $chapter <= 79) || 
                        ($chapter == 82) || 
                        ($chapter == 86) || 
                        ($chapter == 87) || 
                        ($chapter == 91) || 
                        ($chapter >= 93 && $chapter <= 101) || 
                        ($chapter >= 103 && $chapter <= 107) || 
                        ($chapter >= 109 && $chapter <= 114) || 
                        ($chapter >= 117 && $chapter <= 146)
                    ){
                        // arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-1, form_list_verses(1, col1_p_length) );
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, $chapter-1, 1, $col1_p_length);
                    }
                    //Formula Esp => Rus //Ps.X:1 => Пс.X-1:2 
                    //-1 : +1
                    if(
                        ($chapter == 12) || 
                        ($chapter >= 18 && $chapter <= 22) || 
                        ($chapter >= 30 && $chapter <= 31) || 
                        ($chapter == 34) || 
                        ($chapter == 36) || 
                        ($chapter >= 38 && $chapter <= 42) || 
                        ($chapter >= 44 && $chapter <= 49) || 
                        ($chapter == 53) || 
                        ($chapter >= 55 && $chapter <= 59) || 
                        ($chapter >= 61 && $chapter <= 65) || 
                        ($chapter >= 67 && $chapter <= 70) || 
                        ($chapter >= 75 && $chapter <= 77) || 
                        ($chapter >= 80 && $chapter <= 81) || 
                        ($chapter >= 83 && $chapter <= 85) || 
                        ($chapter >= 88 && $chapter < 90) || 
                        ($chapter == 92) || 
                        ($chapter == 102) || 
                        ($chapter == 108)
                    ){
                        // arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-1, form_list_verses(1+1, col1_p_length+1) );// desde 2 versiculo
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, $chapter-1, 1+1, $col1_p_length+1);
                    }
                    //Formula
                    //2en1
                    if($chapter == 13){//13:05 => 12:6-а | 13:06 => 12:6-б
                        // arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-1, form_list_verses(2, 6) );// desde 2 versiculo
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, $chapter-1, 2, 6);
                    }
                    //Formula
                    //-1 : +2 *
                    if(
                        ($chapter >= 51 && $chapter <= 52) ||
                        ($chapter == 54) || 
                        ($chapter == 60)
                    ){
                        // arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-1, form_list_verses(1+2, col1_p_length+2) );// desde 3 versiculo
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, $chapter-1, 1+2, $col1_p_length+2);
                    }
                    //Formula
                    //2en1
                    if($chapter == 90){//90:05 => 89:6-а | 90:06	=> 89:6-б 
                        // arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-1, form_list_verses(2, col1_p_length) );
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, $chapter-1, 2, $col1_p_length);
                    }
                    //Formula
                    //-2: +8
                    if($chapter == 115){//115:1-18 => 113: +8
                        // arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-2, form_list_verses(1+8, col1_p_length+8) );// desde 9 versiculo
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, $chapter-2, 1+8, $col1_p_length+8);
                    }
                    //Formula
                    //-2: X
                    if($chapter == 116){//116:1-9 => 114: Х
                        // Sal.116:1-9 => Пс. 114:1-9
                        // arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-2, form_list_verses(1, 9) );
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, $chapter-2, 1, 9);

                        // Sal.116:10-19 => Пс. 115:1-10
                        // vstavka2 = for_parseVerse(Translation, bq, bookModule, book, chapter-1, form_list_verses(1, 10) );
                        $arr_data_for_json['vstavkaData2'] = getDataFromArr($arr_data, $arr_h4, $chapter-1, 1, 10);
                    }
                    //Formula
                    //-1: X (especial)
                    if($chapter == 147){//147:1-11 => 146:1-11
                        // Sal.147:1-11 => Пс.146:1-11
                        // arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-1, form_list_verses(1, 11) );
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, $chapter-1, 1, 11);

                        // Sal.147:12-20 => Пс. 147:1-9
                        // vstavka2 = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, 9) );
                        $arr_data_for_json['vstavkaData2'] = getDataFromArr($arr_data, $arr_h4, $chapter, 1, 9);
                    }
                break;

            case 19: //Притчи
                    if($chapter == 4){
                        // arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length) );
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, $chapter, 1, $col1_p_length);
                    }
                break;
        
            case 21: //Cantares - Песня песней
                    if($chapter == 1){
                        // arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length-1) );
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, $chapter, 1, $col1_p_length-1);
                    }
                    if($chapter == 6){//06:13 =>	07:1
                        // arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+1, 1 );
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, $chapter+1, 1);
                    }
                    if($chapter == 7){//7:1-13 => 7: +1 (7:2-14)
                        // arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1+1, col1_p_length+1) );
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, $chapter, 1+1, $col1_p_length+1);
                    }
                break;

            case 22: //Isaías - Исаия
                    if($chapter == 3){
                        // arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length-1) );//correcto!
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, $chapter, 1, $col1_p_length-1);//correcto!
                    }
                break;

            case 26: //Daniel - Даниил
                    if($chapter == 3){//3:1-30 => 3:1-30
                        //в Синодальном переводе есть вставочные стихи, которых нет в Исп Библии. Стихи с 24 по 90 включительно переведены с греческого, потому что в еврейском тексте их нет. - Прим. ред.
                        // arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length) );
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, $chapter, 1, $col1_p_length);
                    }
                    if($chapter == 4){//4:1-3 => 3:31-33 | 4:4-37 => 4: -3
                        // arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-1, form_list_verses(31, 33) );
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, $chapter-1, 31, 33);
                    }
                break;

            case 27: //Oseas - Осия
                    if($chapter == 13){//13:16 => 14:1
                        // arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 14, 1);
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, 14, 1);
                    }
                    if($chapter == 14){//14:1-9 => 14:2-10
                        // arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(2, 10) );
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, $chapter, 2, 10);
                    }
                break;

            case 31: //Jonas - Иона
                    if($chapter == 1){//1:17 => 2:1
                        // arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 2, 1);
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, 2, 1);
                    }
                    if($chapter == 2){//2:1-10 => 2:2-11
                        // arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(2, 11) );
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, $chapter, 2, 11);
                    }
                break;

            case 44: //Romanos - Римлянам
                    //book = book + 7;// 44 + 7 = 51 //Romanos - Римлянам
                    if($chapter == 16){// 16:25-27 => 14:24-26                                          
                        // arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter-2, form_list_verses(24,  26) );
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, $chapter-2, 24, 26);
                    }
                break;

            case 46: //2Corintios - 2-Коринфянам
                    //book = book + 7;// 46 + 7 = 53 //2Corintios - 2-Коринфянам
                    if($chapter == 13){// 13:12-13 => 13:12 | 13:14 => 13:13                                          
                        // arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length-1) );
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, $chapter, 1, $col1_p_length-1);
                    }
                break;
            
            default:
                //console.log('default en switch');
                break;
        }//fin switch
    }
    //=====================================================//
    // 1. fin - Numeración base Española - y col's Rusa
    //=====================================================//






    //=====================================================//
    // 2. inicio - Numeración base Rusa - y col's Española
    //=====================================================//
    if($base_ep == 'N' && $bq_EnglishPsalms == 'Y'){//numeración Española
        
        //Miro la traducción con EnglishPsalms
        switch ($book) {

            case 3: //Числа
                    if($chapter == 12){//12:X => 12:X (quito ultimo verse)
                        //nada
                    }
                    if($chapter == 13){//Числа 13:1 => Num.12:16 
                        //arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 12, 16);
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, 12, 16);
                    }
                break;

            case 5: //Иисус Навин
                    if($chapter == 5){//Иис.Нав.5:16 => Jos.6:1                                    
                        // arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 6, 1);
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, 6, 1);
                    }
                    if($chapter == 6){//Иис.Нав.6:1 => Jos.6:2 ... Иис.Нав.6:26 => Jos.6:27
                        //arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1+1, col1_p_length+1));
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, 6, 2, $col1_p_length+1);
                    }
                break; 

            case 8: //1Samuel (1Царств) 
                    if($chapter == 20){//1Цар.20:42-43 => 1Sam 20:42
                        //1 verse contiene 2 en ruso
                        //arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length-1) );
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, 20, 1, $col1_p_length-1);
                    }
                    if($chapter == 23){//
                        //arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length) );
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, 23, 1, $col1_p_length);
                    }
                    if($chapter == 24){//1Цар.24:1 => 1S.23:29
                        //arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 23, 29 );//cojo último verse del capitulo anterior
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, 23, 29);
                    }
                break; 

            case 17: //Job 
                    if($chapter == 39){//39:31-35 => 40:1-5  | 40:6-24 =>	40: -5
                        //arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 40, form_list_verses(1, 5) );
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, 40, 1, 5);
                    }
                    if($chapter == 40){//40:1-19 => 40:6-24 
                        //console.log(arr_data_body);//arr_data_body trae todos los verses del capitulo  40:1-24
                        //arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 40, form_list_verses(6, 24) );//trae 8 verses 40:6-24
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, 40, 6, 24);
                        //console.log(arr_vstavka);//trae 8 verses 40:6-24
                        //vstavka2 = for_parseVerse(Translation, bq, bookModule, book, 41, form_list_verses(1, 8) );//trae 8 verses 41:1-8
                        $arr_data_for_json['vstavkaData2'] = getDataFromArr($arr_data, $arr_h4, 41, 1, 8);
                    }
                    if($chapter == 41){//40:1-26 => 41:9-34
                        //arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 41, form_list_verses(9, 34) );
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, 41, 9, 34);
                    }
                break; 

            case 18: //Psalmos 
                    if($chapter >= 3 && $chapter <= 8){//3:1 - 9:20 =>	Х : +1 *
                        // arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length-1) );
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, $chapter, 1, $col1_p_length-1);
                    }
                    if($chapter == 9){//3:1 - 9:20 => Х : +1 *
                        // arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, 20) );
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, $chapter, 1, 20);
                        //vstavka2 = for_parseVerse(Translation, bq, bookModule, book, 10, form_list_verses(1, 18) );
                        $arr_data_for_json['vstavkaData2'] = getDataFromArr($arr_data, $arr_h4, 10, 1, 18);
                    }
                    //Formula Esp => Rus //Пс.X:1 => Ps.X+1:1 
                    //+1 : Х
                    if(
                        ($chapter == 10) || 
                        ($chapter >= 13 && $chapter <= 16) || 
                        ($chapter >= 22 && $chapter <= 28) || 
                        ($chapter >= 31 && $chapter <= 32) || 
                        ($chapter == 34) || 
                        ($chapter == 36) || 
                        ($chapter == 42) || 
                        ($chapter == 49) || 
                        ($chapter == 65) || 
                        ($chapter >= 70 && $chapter <= 73) || 
                        ($chapter >= 77 && $chapter <= 78) || 
                        ($chapter == 81) || 
                        ($chapter == 85) || 
                        ($chapter == 86) || 
                        ($chapter == 90) || 
                        ($chapter >= 92 && $chapter <= 100) || 
                        ($chapter >= 102 && $chapter <= 106) || 
                        ($chapter >= 108 && $chapter < 113) || 
                        ($chapter >= 116 && $chapter <= 138) ||
                        ($chapter >= 140 && $chapter <= 145)
                    ){
                        // arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+1, form_list_verses(1, col1_p_length) );
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, $chapter+1, 1, $col1_p_length);
                    }
                    //Formula Esp => Rus //Пс.X+1:2 => Ps.X:1 //добавляю пустой стих сначала в исп перевод
                    //+1 : -1
                    if(
                        ($chapter == 11) || 
                        ($chapter == 12) || 
                        ($chapter >= 17 && $chapter <= 21) ||
                        ($chapter >= 29 && $chapter <= 30) || 
                        ($chapter == 33) || 
                        ($chapter == 35) || 
                        ($chapter >= 37 && $chapter <= 41) || 
                        ($chapter >= 43 && $chapter <= 48) || 
                        ($chapter == 52) || 
                        ($chapter >= 54 && $chapter <= 58) || 
                        ($chapter >= 60 && $chapter <= 64) || 
                        ($chapter >= 66 && $chapter <= 69) || 
                        ($chapter >= 74 && $chapter <= 76) || 
                        ($chapter >= 79 && $chapter <= 80) || 
                        ($chapter >= 82 && $chapter <= 84) || 
                        ($chapter >= 87 && $chapter < 89) || 
                        ($chapter == 91) || 
                        ($chapter == 101) || 
                        ($chapter == 107) ||
                        ($chapter == 139)
                    ){
                        //arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+1, form_list_verses(1, col1_p_length-1) );
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, $chapter+1, 1, $col1_p_length-1);
                    }
                    //Formula
                    //+1 : -2 | Ej.:  50:0 => 51:1 | 50:1 => 51:2
                    if(
                        ($chapter >= 50 && $chapter <= 51) ||
                        ($chapter == 53) || 
                        ($chapter == 59)
                    ){
                        //arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+1, form_list_verses(1, col1_p_length-2) );
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, $chapter+1, 1, $col1_p_length-2);
                    }
                    //Formula
                    //2en1
                    if($chapter == 89){//89:6 => 90:5-6 
                        //arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+1, form_list_verses(1, col1_p_length) );
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, $chapter+1, 1, $col1_p_length);
                    }
                    //Formula
                    //+2: -8
                    if($chapter == 113){//113: +8 => 115:1-18 | Пс.113:9 => Sal.115:1
                        // arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+1, form_list_verses(1, 8) );
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, $chapter+1, 1, 8);
                        // vstavka2 = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+2, form_list_verses(1, 18) );
                        $arr_data_for_json['vstavkaData2'] = getDataFromArr($arr_data, $arr_h4, $chapter+2, 1, 18);
                    }
                    //Formula
                    //-2: X
                    if($chapter == 114){// Пс. 114:1-9 => Sal.116:1-9 
                        // arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+2, form_list_verses(1, 9) );
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, $chapter+2, 1, 9);
                    }
                    if($chapter == 115){// Пс. 115:1-10 => Sal.116:10-19
                        // arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+1, form_list_verses(10, 19) );
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, $chapter+1, 10, 19);
                    }
                    //Formula (especial)
                    if($chapter == 146){// Пс.146:1-11 => Sal.147:1-11
                        // arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)+1, form_list_verses(1, 11) );
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, $chapter+1, 1, 11);
                    }
                    //Formula (especial)
                    if($chapter == 147){// Пс.147:1-11 => Sal.147:12-20
                        // arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(12, 20) );
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, $chapter, 12, 20);
                    }
                break; 

            case 19: //Притчи
                    if($chapter == 4){
                        // arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length) );
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, $chapter, 1, $col1_p_length);
                    }
                break;
        
            case 21: //Cantares - Песня песней
                    if($chapter == 1){
                        //arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length) );
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, $chapter, 1, $col1_p_length);
                    }
                    if($chapter == 6){//06:1-12 => 06:1-12	
                        //nada
                    }
                    if($chapter == 7){//07:1 => 06:13	
                        // arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, parseInt(chapter)-1, 13 );
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, $chapter-1, 13);
                    }
                break;

            case 22: //Isaías - Исаия
                    if($chapter == 3){
                        //arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length+1) );//correcto!
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, $chapter, 1, $col1_p_length+1);//correcto!
                    }
                break;

            case 26: //Daniel - Даниил
                    if($chapter == 3){//3:1-30 => 3:1-30
                        //в Синодальном переводе есть вставочные стихи, которых нет в Исп Библии. Стихи с 24 по 90 включительно переведены с греческого, потому что в еврейском тексте их нет. - Прим. ред.
                        //arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, 30) );
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, $chapter, 1, 30);
                        //vstavka2 = for_parseVerse(Translation, bq, bookModule, book, 4, form_list_verses(1, 3) );
                        $arr_data_for_json['vstavkaData2'] = getDataFromArr($arr_data, $arr_h4, 4, 1, 3);
                    }
                    if($chapter == 4){
                        //arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(4, col1_p_length+3) );
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, $chapter, 4, $col1_p_length+3);
                    }
                break;

            case 27: //Oseas - Осия
                    if($chapter == 14){//14:1 => 13:16 
                        //arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 13, 16);
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, 13, 16);
                    }
                break;

            case 31: //Jonas - Иона
                    if($chapter == 1){
                        //arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, form_list_verses(1, col1_p_length));
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, 1, 1, $col1_p_length);
                    }
                    if($chapter == 2){// 2:1 => 1:17
                        // arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 1, 17);
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, 1, 17);
                    }
                break;

            case 44: //Romanos - Римлянам
                    if($chapter == 14){// 14:24-26 => 16:25-27                                       
                        //arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, 16, form_list_verses(25,  27) );
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, 16, 25, 27);
                    }
                break;

            case 46: //2Corintios - 2-Коринфянам
                    if($chapter == 13){// 13:12-13 => 13:12 | 13:14 => 13:13                                          
                        //arr_vstavka = for_parseVerse(Translation, bq, bookModule, book, chapter, form_list_verses(1, col1_p_length+1) );
                        $arr_data_for_json['vstavkaData'] = getDataFromArr($arr_data, $arr_h4, $chapter, 1, $col1_p_length+1);
                    }
                break;

            default:
                //console.log('default en switch');
                break;
        }//fin switch
    }
    //=====================================================//
    // 2. fin - Numeración base Rusa - y col's Española
    //=====================================================//


















    
    //para test
    if($isGet){
        echo"<h3>--- $ function getDataFromArr():</h3><pre>";
        print_r($arr_data_for_json);
        print_r(getDataFromArr($arr_data, $arr_h4, 12, 16) );
        print_r(getDataFromArr($arr_data, $arr_h4, $chapter, $verse, $to_verse) );//returns $arr_data
        echo"</pre>";
    }


    //$json_data = json_encode(getDataFromArr($arr_data, $arr_h4, $chapter, $verse, $to_verse));
    $json_data = json_encode($arr_data_for_json);
    echo $json_data;
    

    // Cerramos el archivo después de usarlo
    fclose($myfile);

}else{
    echo "Error. No está indicado el parametro de la url o chapter.";
}
//echo "<p>$ chapter: $chapter</p>";




//=====================================================================================//
// FUNCTIONS
//=====================================================================================//

function getDataFromArr($arr_data, $arr_h4, $chapter, $verse = null, $to_verse = null){
    
    //echo"<p>=== function getDataFromArr() ===</p>";
    $arr_p_verses = [];


    if(strpos($arr_h4[$chapter], "</h4>") !== false){
        $arr_h4_text = explode("</h4>", $arr_h4[$chapter]);
        //echo"<h3>$ arr_h4_text:</h3><pre>";
        //print_r($arr_h4_text);
        //echo"</pre>";
        
        $ChapterNameText = $arr_h4_text[0];
        $ChapterPText = $arr_h4_text[1];
        //echo"<p> if --- $ ChapterNameText: $ChapterNameText</p>";
        //echo"<p> if --- $ ChapterPText: $ChapterPText</p>";
    }else{
        $ChapterNameText = $chapter;
        $ChapterPText = $arr_h4[$chapter];
        //echo"<p> else --- $ ChapterNameText: $ChapterNameText</p>";
        //echo"<p> else --- $ ChapterPText: $ChapterPText</p>";
    }
    $arr_data['h4_text'] = $ChapterNameText;
    //$arr_data['p_text_all'] = $ChapterPText;//COMENTO YA QUE NO HACE FALTA PARA JS YA QUE ESCOJO SOLO JSON

    
    $ChapterQty = count($arr_h4) - 1;
    $arr_data['ChapterQty'] = $ChapterQty;

    //echo "<p>$ VerseQty: $VerseQty</p><hr>";
    //echo"<br>ChapterNameText <pre>" . $ChapterNameText ."</pre>";
    //echo"<br>ChapterPText <pre>" . $ChapterPText ."</pre>";
    //die();
    
    //echo"<h1>$ arr_h4[$chapter]</h1><pre>";
    //print_r($arr_h4[$chapter]);
    //echo"</pre>";
    

    //devuelvo chapter
    if($chapter && !$verse){
        //echo '<p> if($chapter && !$verse)';
        // echo '<h4>' . $arr_h4[$chapter];

        $arr_verses_from_ChapterPText = explode("<p>", $ChapterPText);
        $VerseQty = count($arr_verses_from_ChapterPText) - 1;
        $arr_data['VerseQty'] = $VerseQty;
        for ($i = 0; $i <= $VerseQty; $i++) { 
            //echo '<p>' . $i;
            // echo '<p>' . $arr_p[$i];
            $arr_p_verses[$i] = $arr_verses_from_ChapterPText[$i];
        }
        $arr_data['arr_p_verses'] = $arr_p_verses;
    }


    //devuelvo chapter y verse
    if($chapter && $verse){
        $arr_p = explode("<p>", $arr_h4[$chapter]);

        if(strpos($arr_p[0], "</h4>") !== false){
            $arr_h4_text = explode("</h4>", $arr_p[0]);
            
            $ChapterNameText = $arr_h4_text[0];
            //echo"<p> if --- $ ChapterNameText: $ChapterNameText</p>";
            //echo"<p> if --- $ ChapterPText: $ChapterPText</p>";
        }else{
            $ChapterNameText = $chapter;
            //echo"<p> else --- $ ChapterNameText: $ChapterNameText</p>";
            //echo"<p> else --- $ ChapterPText: $ChapterPText</p>";
        }
        $arr_data['h4_text'] = $ChapterNameText;



        $VerseQty = count($arr_p) - 1;
        $arr_data['VerseQty'] = $VerseQty;
        //echo "<p>$ VerseQty: $VerseQty</p><hr>";

        if($verse < 1) $verse = 1;
        if($verse > $VerseQty) $verse = $VerseQty;
        if($to_verse < 1 || $verse == $to_verse) $to_verse = null;
        //echo "<p>$ to_verse: $to_verse</p>";

        if($to_verse){
            if($to_verse > $VerseQty) $to_verse = $VerseQty;
            if($to_verse < $verse){
                $new_verse = $to_verse;
                $new_to_verse = $verse;
                //echo "<p>$ ahora $ new_verse: $new_verse</p>";
                //echo "<p>$ ahora $ new_to_verse: $new_to_verse</p>";
                $verse = $new_verse;
                $to_verse = $new_to_verse;
                //echo "<p>$ ahora $ verse: $verse</p>";
                //echo "<p>$ ahora $ to_verse: $to_verse</p>";
            }
        }        

        //echo"<h1>$ arr_p</h1><pre>";
        //print_r($arr_p);
        //echo"</pre>";

        //$p_text_all = '';

        //varios verses
        if($verse && $to_verse){ 
            //echo"<br> if";
            for ($i = $verse; $i <= $to_verse; $i++) { 
                //echo '<p>' . $i;
                // echo '<p>' . $arr_p[$i];
                //$p_text_all .= '<p>' . $arr_p[$i];
                $arr_p_verses[$i] = $arr_p[$i];
            }            
        }else{//1 verse
            //echo"<br> else";
            // echo '<p>' . $arr_p[$verse];
            //$p_text_all .= '<p>' . $arr_p[$verse];
            $arr_p_verses[$verse] = $arr_p[$verse];
        }
        //$arr_data['p_text_all'] = $p_text_all;
        $arr_data['arr_p_verses'] = $arr_p_verses;

    }

    return $arr_data;

}//end function



/*
function form_list_verses($from_verse, $to_verse){
    $lista_verses = [];
    for ($i = $from_verse; $i <= $to_verse; $i++) {
        array_push($lista_verses, $i);                                                   
        //echo "<p>$ lista_verses: $ lista_verses</p>";
    }
    return $lista_verses;
}
*/










?>