<?php
//GET - para test
//$url = (isset($_GET['url']) and !empty($_GET['url'])) ? $_GET['url'] : false ;
//$chapter = (isset($_GET['chapter']) and !empty($_GET['chapter'])) ? $_GET['chapter'] : 1 ;

//POST
$url = (isset($_POST['url']) and !empty($_POST['url'])) ? $_POST['url'] : false ;
$chapter = (isset($_POST['chapter']) and !empty($_POST['chapter'])) ? $_POST['chapter'] : 1 ;


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


    $chapter_max = count($arr_h4) - 1;
    //echo "<p>$ chapter_max: $chapter_max</p><hr>";

    if($chapter > $chapter_max) $chapter = $chapter_max;

    //devuelvo chapter
    echo '<h4>' . $arr_h4[$chapter];

    // Cerramos el archivo después de usarlo
    fclose($myfile);

}else{
    echo "Error. No está indicado el parametro de la url.";
}
//echo "<p>$ chapter: $chapter</p>";










?>