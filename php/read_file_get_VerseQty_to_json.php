<?php

include('functions.php');
include('includes/config.php');


//si los datos NO VIENEN desde el metodo permitido
if (!in_array($_SERVER['REQUEST_METHOD'], $arr_metodos)){   
    writeLog("El método de pasar los parametros no es correcto.");
    
    echo json_encode([
        'success' => false,
        'error' => 'El método de pasar los parametros no es correcto.',
        'VerseQty' => 0,
        'dic_code' => 'd256'
    ], JSON_UNESCAPED_UNICODE);
}


//si los datos SÍ VIENEN desde el metodo permitido
//es lo mismo que => if ($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'GET'){
if (in_array($_SERVER['REQUEST_METHOD'], $arr_metodos)){

    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        //POST
        $isGet = false;        
        $url = (isset($_POST['url']) and !empty($_POST['url'])) ? $_POST['url'] : false ;
        $book = (isset($_POST['book']) and !empty($_POST['book'])) ? intval($_POST['book']) : null ;
        $chapter = (isset($_POST['chapter']) and !empty($_POST['chapter'])) ? intval($_POST['chapter']) : 1 ;
    } 

    if($_SERVER['REQUEST_METHOD'] === 'GET'){//para hacer test...
        //GET
        $isGet = true;
        $url = (isset($_GET['url']) and !empty($_GET['url'])) ? $_GET['url'] : false ;
        $book = (isset($_GET['book']) and !empty($_GET['book'])) ? intval($_GET['book']) : null ;
        $chapter = (isset($_GET['chapter']) and !empty($_GET['chapter'])) ? intval($_GET['chapter']) : 1 ;
    }
}

//debug($isGet, 'isGet');
//debug($url, 'url');
//debug($book, 'book');
//debug_x($chapter, 'chapter');


if(isset($_GET) and !empty($_GET['url'])){
    $isGet = true;//comentar para conseguir datos por js
}else{
    $isGet = false;
}


//creo un arr de datos de texto
$arr_data = [];


if($url && $chapter > 0){
    //debug_x($url, 'url');
    //debug_x($chapter, 'chapter');

    $filename = $url;
    //echo_json_x($filename, 'filename');

    if(file_exists($filename)) {

        //Abrimos el fichero $filename y el resultado lo metemos en $myfile
        $myfile = fopen($filename, "r") or die("Unable to open file!");

        //Leemos el fichero filename que está en $myfile y el contenido del fichero lo meto en $myfile_read
        $myfile_read = fread($myfile,filesize($filename));
        //echo count($myfile_read);
        //echo $myfile_read;  

        //Nombre chapter
        $arr_h4 = explode("<h4>", $myfile_read);
        //debug_r($arr_h4);
        
        $chapter_max = count($arr_h4) - 1;
        //debug($chapter_max, 'chapter_max');

        if($chapter < 1) $chapter = 1;
        if($chapter > $chapter_max) $chapter = $chapter_max;

        if(strpos($arr_h4[$chapter], "</h4>") !== false){
            $arr_h4_text = explode("</h4>", $arr_h4[$chapter]);
            //debug_r($arr_h4_text, 'arr_h4_text');
            
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
            debug_r($arr_data, 'isGet. arr_data');
        }

        $json_data = json_encode($arr_data, JSON_UNESCAPED_UNICODE);
        echo $json_data;        

        // Cerramos el archivo después de usarlo
        fclose($myfile);

    }else{

        echo json_encode([
            'success' => false,
            'error' => 'No existe el fichero pasado como url.',
            'VerseQty' => 0,
            'dic_code' => 'd304'
        ], JSON_UNESCAPED_UNICODE);
    }

}else{

    echo json_encode([
        'success' => false,
        'error' => 'No está indicado el parametro de la url o chapter.',
        'VerseQty' => 0,
        'dic_code' => 'd305'
    ], JSON_UNESCAPED_UNICODE);    
}

?>