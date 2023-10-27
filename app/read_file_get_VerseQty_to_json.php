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

    
    $url = (isset($_GET['url']) and !empty($_GET['url'])) ? $_GET['url'] : false ;
    $book = (isset($_GET['book']) and !empty($_GET['book'])) ? $_GET['book'] : null ;
    $chapter = (isset($_GET['chapter']) and !empty($_GET['chapter'])) ? $_GET['chapter'] : 1 ;
print<<<HERE
    <h1>isGet (test)</h1>
    <br>$ url: <b>$url</b>
    <br>$ book: <b>$book</b>
    <br>$ chapter: <b>$chapter</b>
    <hr>
HERE;
}else{   
    //POST
    $url = (isset($_POST['url']) and !empty($_POST['url'])) ? $_POST['url'] : false ;
    $book = (isset($_POST['book']) and !empty($_POST['book'])) ? $_POST['book'] : null ;
    $chapter = (isset($_POST['chapter']) and !empty($_POST['chapter'])) ? $_POST['chapter'] : 1 ;
}



//creo un arr de datos de texto
$arr_data = [];



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



    $arr_verses_from_ChapterPText = explode("<p>", $ChapterPText);
    $VerseQty = count($arr_verses_from_ChapterPText) - 1;
    $arr_data['VerseQty'] = $VerseQty;

    
    //para test
    if($isGet){
        echo"<h3>--- $ function getDataFromArr():</h3><pre>";
        print_r($arr_data);
        echo"</pre>";
    }


    //$json_data = json_encode(getDataFromArr($arr_data, $arr_h4, $chapter, $verse, $to_verse));
    $json_data = json_encode($arr_data);
    echo $json_data;
    

    // Cerramos el archivo después de usarlo
    fclose($myfile);

}else{
    echo "Error. No está indicado el parametro de la url o chapter.";
}
//echo "<p>$ chapter: $chapter</p>";












?>