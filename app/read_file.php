<?php
$isGet = false;
//$isGet = true;
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
    $book = (isset($_POST['book']) and !empty($_POST['book'])) ? $_POST['book'] : null ;
    $chapter = (isset($_POST['chapter']) and !empty($_POST['chapter'])) ? $_POST['chapter'] : 1 ;
    $verse = (isset($_POST['verse']) and !empty($_POST['verse'])) ? $_POST['verse'] : null ;
    $to_verse = (isset($_POST['to_verse']) and !empty($_POST['to_verse'])) ? $_POST['to_verse'] : null ;
}


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
    
    


    //Nombre chapter
    $arr_h4 = explode("<h4>", $myfile_read);
    //echo"<h1>arr_h4:</h1><pre>";
    //print_r($arr_h4);
    //echo"</pre>";
    
    $chapter_max = count($arr_h4) - 1;
    //echo "<p>$ chapter_max: $chapter_max</p><hr>";

    if($chapter < 1) $chapter = 1;
    if($chapter > $chapter_max) $chapter = $chapter_max;    
    
    if(strpos($arr_h4[$chapter], "</h4>") !== false){
        $arr_h4_text = explode("</h4>", $arr_h4[$chapter]);
        //echo"<h3>$ arr_h4_text:</h3><pre>";
        //print_r($arr_h4_text);
        //echo"</pre>";
        
        $ChapterNameText = $arr_h4_text[0];
        $ChapterText = $arr_h4_text[1];
        //echo"<p> if --- $ ChapterNameText: $ChapterNameText</p>";
        //echo"<p> if --- $ ChapterText: $ChapterText</p>";
    }else{
        $ChapterNameText = $chapter;
        $ChapterText = $arr_h4[$chapter];
        //echo"<p> if --- $ ChapterNameText: $ChapterNameText</p>";
        //echo"<p> else --- $ ChapterText: $ChapterText</p>";
    }
    //die();
    
    
    //echo"<h1>$ arr_h4[$chapter]</h1><pre>";
    //print_r($arr_h4[$chapter]);
    //echo"</pre>";
    
    
    
    //echo "<hr>";
    //die();




    //devuelvo chapter
    if($chapter && !$verse){
        echo '<h4>' . $arr_h4[$chapter];
    }


    //devuelvo chapter y verse
    if($chapter && $verse){
        $arr_p = explode("<p>", $arr_h4[$chapter]);

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

        //varios verses
        if($verse && $to_verse){ 
            //echo"<br> if";
            for ($i = $verse; $i <= $to_verse; $i++) { 
                //echo '<p>' . $i;
                echo '<p>' . $arr_p[$i];
            }            
        }else{//1 verse
            //echo"<br> else";
            echo '<p>' . $arr_p[$verse];
        }

    }



    // Cerramos el archivo después de usarlo
    fclose($myfile);

}else{
    echo "Error. No está indicado el parametro de la url o chapter.";
}
//echo "<p>$ chapter: $chapter</p>";










?>