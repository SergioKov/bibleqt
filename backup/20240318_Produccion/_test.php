<?php

error_reporting(E_ALL);


    include('connect_db.php');

$campo = 'ArrTabs';
$tabla = 'vkladki';
$id_user_logged = 1;

 

    //busco si hay registro
    $sql = "SELECT $campo FROM $tabla where id_user = '$id_user_logged' ";
	$result = mysqli_query($conn, $sql);
	$num_rows = mysqli_num_rows($result);

	if($num_rows > 0){
		$rows = mysqli_fetch_assoc($result);
        $hay_id_user_en_tabla = true;
        $data = $rows;//[$campo];

        echo json_encode(['data' => $data]);
        //die();

        //$data = $campo;//test
        //echo"(if)";
        //var_dump($data);
        //die();
    }else{
        $hay_id_user_en_tabla = false;
        $data = 'no_tiene_datos';
        //echo"(else)";
    }
    //die();





?>