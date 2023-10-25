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
$allastext = '';






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
        // echo"<h2>$BookName</h2>";
        $allastext .= "<h2>$BookName</h2>";
    }else{
        $arr_h2_text = explode("<h4>", $arr_h2[1]);
        $BookName = $arr_h2_text[0];
        //echo"<p>else --- $ BookName: $BookName</p>";
        // echo"<h2>$BookName</h2>";
        $allastext .= "<h2>$BookName</h2>";
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
                                // 2. inicio - Numeración base Rusa - y col's Española
                                //=====================================================//
                                if(true /*$base_ep == 'N' && $bq_EnglishPsalms == 'Y'*/){//numeración Española
                                    
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
        print_r($arr_data_for_json );
        print_r(getDataFromArr($arr_data, $arr_h4, 12, 16) );
        print_r(getDataFromArr($arr_data, $arr_h4, $chapter, $verse, $to_verse) );//returns $arr_data
        echo"</pre>";
    }


    //$json_data = json_encode(getDataFromArr($arr_data, $arr_h4, $chapter, $verse, $to_verse));
    $json_data = json_encode($arr_data_for_json);
    echo $json_data;
    
    //$json_allastext = json_encode($allastext);
    //echo $json_allastext;

    //echo"<h1>$ arr_data</h1><pre>";
    //print_r($arr_data);
    //echo"</pre>";

    //echo"<hr>";




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
    $allastext = '';
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
    $arr_data['p_text_all'] = $ChapterPText;

    //echo"<br>ChapterNameText <pre>" . $ChapterNameText ."</pre>";
    //echo"<br>ChapterPText <pre>" . $ChapterPText ."</pre>";
    //die();
    
    //echo"<h1>$ arr_h4[$chapter]</h1><pre>";
    //print_r($arr_h4[$chapter]);
    //echo"</pre>";
    
    //echo "<hr>";
    //die();

    //devuelvo chapter
    if($chapter && !$verse){
        //echo '<p> if($chapter && !$verse)';

        // echo '<h4>' . $arr_h4[$chapter];
        $allastext .= '<h4>' . $arr_h4[$chapter];

        $arr_verses_from_ChapterPText = explode("<p>", $ChapterPText);
        for ($i = 0; $i <= count($arr_verses_from_ChapterPText) - 1; $i++) { 
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



        $verse_max = count($arr_p) - 1;
        //echo "<p>$ verse_max: $verse_max</p><hr>";

        if($verse < 1) $verse = 1;
        if($verse > $verse_max) $verse = $verse_max;
        if($to_verse < 1 || $verse == $to_verse) $to_verse = null;
        //echo "<p>$ to_verse: $to_verse</p>";


        if($to_verse){
            if($to_verse > $verse_max) $to_verse = $verse_max;
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

        $p_text_all = '';

        //varios verses
        if($verse && $to_verse){ 
            //echo"<br> if";
            for ($i = $verse; $i <= $to_verse; $i++) { 
                //echo '<p>' . $i;
                // echo '<p>' . $arr_p[$i];
                $allastext .= '<p>' . $arr_p[$i];
                $p_text_all .= '<p>' . $arr_p[$i];
                $arr_p_verses[$i] = $arr_p[$i];
            }            
        }else{//1 verse
            //echo"<br> else";
            // echo '<p>' . $arr_p[$verse];
            $allastext .= '<p>' . $arr_p[$verse];
            $p_text_all .= '<p>' . $arr_p[$verse];
            $arr_p_verses[$verse] = $arr_p[$verse];
        }
        $arr_data['p_text_all'] = $p_text_all;
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