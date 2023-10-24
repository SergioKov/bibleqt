<?php

$isGet = false;
$isGet = true;//comentar para conseguir datos por js

if($isGet){
    //GET - para test
    echo"<pre>";
    print_r($_GET);
    echo"</pre>";

    $url = (isset($_GET['url']) and !empty($_GET['url'])) ? $_GET['url'] : false ;
    $book = (isset($_GET['book']) and !empty($_GET['book'])) ? $_GET['book'] : null ;
    $chapter = (isset($_GET['chapter']) and !empty($_GET['chapter'])) ? $_GET['chapter'] : 1 ;
    $verse = (isset($_GET['verse']) and !empty($_GET['verse'])) ? $_GET['verse'] : null ;
    $to_verse = (isset($_GET['to_verse']) and !empty($_GET['to_verse'])) ? $_GET['to_verse'] : null ;
print<<<HERE
    <h1>isGet (test)</h1>
    <br>$ url: <b>$url</b>
    <br>$ book: <b>$book</b>
    <br>$ chapter: <b>$chapter</b>
    <br>$ verse: <b>$verse</b>
    <br>$ to_verse: <b>$to_verse</b>
    <hr>
HERE;
}else{   
    //POST
    $url = (isset($_POST['url']) and !empty($_POST['url'])) ? $_POST['url'] : false ;

    //$BookQty = (isset($_POST['BookQty']) and !empty($_POST['BookQty'])) ? $_POST['BookQty'] : false ;
    //$OldTestament = (isset($_POST['OldTestament']) and !empty($_POST['OldTestament'])) ? $_POST['OldTestament'] : false ;
    //$NewTestament = (isset($_POST['NewTestament']) and !empty($_POST['NewTestament'])) ? $_POST['NewTestament'] : false ;
    //$Apocrypha = (isset($_POST['Apocrypha']) and !empty($_POST['Apocrypha'])) ? $_POST['Apocrypha'] : false ;
    
    $book = (isset($_POST['book']) and !empty($_POST['book'])) ? $_POST['book'] : null ;
    $chapter = (isset($_POST['chapter']) and !empty($_POST['chapter'])) ? $_POST['chapter'] : 1 ;
    $verse = (isset($_POST['verse']) and !empty($_POST['verse'])) ? $_POST['verse'] : null ;
    $to_verse = (isset($_POST['to_verse']) and !empty($_POST['to_verse'])) ? $_POST['to_verse'] : null ;
}

//if($OldTestament == 'N' && $NewTestament == 'Y'){
    //$book = $book - 39;
    //echo"NT book: $book";
//}

//creo un arr de datos de texto
$arr_data = [];
$allastext = '';
$arr_chapters_for_json = [];






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
    $arr_data['h2_text'] = "<h2>$BookName</h2>";
    
    


    //Nombre chapter
    $arr_h4 = explode("<h4>", $myfile_read);
    //echo"<h1>arr_h4:</h1><pre>";
    //print_r($arr_h4);
    //echo"</pre>";
    
    $chapter_max = count($arr_h4) - 1;
    //echo "<p>$ chapter_max: $chapter_max</p><hr>";

    if($chapter < 1) $chapter = 1;
    if($chapter > $chapter_max) $chapter = $chapter_max;
    
    $chapter_prev = ($chapter > 1) ? $chapter - 1 : null;
    $chapter_next = ($chapter < $chapter_max) ? $chapter + 1 : null;


    $arr_chapters_for_json['chapter_prev'] = $chapter_prev;
    $arr_chapters_for_json['chapter_act'] = $chapter;
    $arr_chapters_for_json['chapter_next'] = $chapter_next;





    foreach ($arr_chapters_for_json as $key => $chapt) {
        echo"<p>$ key : $key --- $ value : $chapt</p>";


        if(strpos($arr_h4[$chapt], "</h4>") !== false){
            $arr_h4_text = explode("</h4>", $arr_h4[$chapt]);
            //echo"<h3>$ arr_h4_text:</h3><pre>";
            //print_r($arr_h4_text);
            //echo"</pre>";
            
            $ChapterNameText = $arr_h4_text[0];
            $ChapterPText = $arr_h4_text[1];
            //echo"<p> if --- $ ChapterNameText: $ChapterNameText</p>";
            //echo"<p> if --- $ ChapterPText: $ChapterPText</p>";
        }else{
            $ChapterNameText = $chapt;
            $ChapterPText = $arr_h4[$chapt];
            //echo"<p> if --- $ ChapterNameText: $ChapterNameText</p>";
            //echo"<p> else --- $ ChapterPText: $ChapterPText</p>";
        }
        $arr_data['h4_text'] = "<h4>$ChapterNameText</h4>";
        $arr_data['p_text'] = $ChapterPText;
    
        //echo"<br>ChapterNameText <pre>" . $ChapterNameText ."</pre>";
        //echo"<br>ChapterPText <pre>" . $ChapterPText ."</pre>";
        //die();
        
        
        //echo"<h1>$ arr_h4[$chapt]</h1><pre>";
        //print_r($arr_h4[$chapt]);
        //echo"</pre>";
        
        
        
        //echo "<hr>";
        //die();
    
    
    
    
        //devuelvo chapt
        if($chapt && !$verse){
            // echo '<h4>' . $arr_h4[$chapt];
            $allastext .= '<h4>' . $arr_h4[$chapt];
        }
    
    
        //devuelvo chapt y verse
        if($chapt && $verse){
            $arr_p = explode("<p>", $arr_h4[$chapt]);
    
            $arr_data['h4_text'] = '<h4>' . $arr_p[0];
    
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
    
            $p_text = '';
    
            //varios verses
            if($verse && $to_verse){ 
                //echo"<br> if";
                for ($i = $verse; $i <= $to_verse; $i++) { 
                    //echo '<p>' . $i;
                    // echo '<p>' . $arr_p[$i];
                    $allastext .= '<p>' . $arr_p[$i];
                    $p_text .= '<p>' . $arr_p[$i];
                }            
            }else{//1 verse
                //echo"<br> else";
                // echo '<p>' . $arr_p[$verse];
                $allastext .= '<p>' . $arr_p[$verse];
                $p_text .= '<p>' . $arr_p[$verse];
            }
            $arr_data['p_text'] = $p_text;
    
        }

        $arr_chapters_for_json[$chapt] = $arr_data;


        echo"<h1>$ arr_chapters_for_json[$chapt]</h1><pre>";
        print_r($arr_chapters_for_json[$chapt]);
        echo"</pre>";




    }//end foreach

    echo"<h1>todo $ arr_chapters_for_json</h1><pre>";
    print_r($arr_chapters_for_json);
    echo"</pre>";



    $json_data = json_encode($arr_chapters_for_json);
    echo $json_data;










    





            //antes
            /*

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
                    //echo"<p> if --- $ ChapterNameText: $ChapterNameText</p>";
                    //echo"<p> else --- $ ChapterPText: $ChapterPText</p>";
                }
                $arr_data['h4_text'] = "<h4>$ChapterNameText</h4>";
                $arr_data['p_text'] = $ChapterPText;

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
                    // echo '<h4>' . $arr_h4[$chapter];
                    $allastext .= '<h4>' . $arr_h4[$chapter];
                }


                //devuelvo chapter y verse
                if($chapter && $verse){
                    $arr_p = explode("<p>", $arr_h4[$chapter]);

                    $arr_data['h4_text'] = '<h4>' . $arr_p[0];

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

                    $p_text = '';

                    //varios verses
                    if($verse && $to_verse){ 
                        //echo"<br> if";
                        for ($i = $verse; $i <= $to_verse; $i++) { 
                            //echo '<p>' . $i;
                            // echo '<p>' . $arr_p[$i];
                            $allastext .= '<p>' . $arr_p[$i];
                            $p_text .= '<p>' . $arr_p[$i];
                        }            
                    }else{//1 verse
                        //echo"<br> else";
                        // echo '<p>' . $arr_p[$verse];
                        $allastext .= '<p>' . $arr_p[$verse];
                        $p_text .= '<p>' . $arr_p[$verse];
                    }
                    $arr_data['p_text'] = $p_text;

                }

            */






    //$json_data = json_encode($arr_data);
    //echo $json_data;
    
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










?>