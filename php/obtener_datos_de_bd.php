<?php
session_start();//importante para ver al usuario logueado

/*
//hacer test...
echo json_encode([
    'success' => false,
    'valorCampo' => 'no_tiene_datos',
    'error' => 'No hay todos los parametros necesarios.',
    'dic_code' => 'd251'
]);
exit;
*/


if (true) {

    //hacer test en postman
    //metodo: POST
    //ruta web: https://bibleqt.es/obtener_datos_de_bd.php
    //o ruta local: http://localhost/bibleqt/obtener_datos_de_bd.php
    //Body
    //raw
    //JSON
    
    // Recuperar datos JSON
    $json = file_get_contents('php://input');
    //echo json_encode(['$json' => $json]);
    
    $datos = json_decode($json, true);
    //echo json_encode(['$datos' => $datos]);

    // Verificar que se decodificó correctamente
    if ($datos === null) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'valorCampo' => 'no_tiene_datos',
            'error' => 'No hay todos los parametros necesarios.',
            'dic_code' => 'd251'
        ]);
        exit;
    }

    $tabla = $datos['tabla'];//vkladki
    $campo = $datos['campo'];//arrTabs
    //echo json_encode(['tabla' => $tabla, 'campo' => $campo, 'tabla2' => $tabla2, 'campo2' => $campo2]);
    //die();

    // Recuperar los valores
    if(isset($_SESSION['id_user']) ) {
        $id_user_logged = $_SESSION['id_user'];
        //$username_logged = $_SESSION['username'];
        //echo json_encode(['mensaje' => 'sesion username_logged: ' . $username_logged ]);        
    } else {
        $id_user_logged = 5;//0
        //$username_logged = 'user_test';//'nobody';
        //echo json_encode(['mensaje' => $username_logged]);
    }
	//die();

    include('connect_db.php');

    //busco si hay registro
    // Preparar y ejecutar la consulta
    $sql = "SELECT $campo 
            FROM $tabla 
            WHERE id_user = '$id_user_logged' 
    ";
    // $result = mysqli_query($conn, $sql);
    $result = $conn->query($sql);
	//echo json_encode(['sql' => $sql, 'num_rows' => mysqli_num_rows($result)]);
    //die();
	
    if(/*mysqli_num_rows($result) > 0*/$result->num_rows > 0){
        
        // $row = mysqli_fetch_assoc($result);
        $row = $result->fetch_assoc();
		//echo json_encode(['$row' => $row]);
		//die();
        
        $hay_id_user_en_tabla = true;
        $valorCampo = $row[$campo];
        $data = [
            'success' => true,
            'valorCampo' => $valorCampo
        ];

    }else{
        
        $hay_id_user_en_tabla = false;
        $data = [
            'success' => true,//AUNQUE NO TIENE DATOS , PONGO TRUE PARA QUE ENTRE EN EL BLOQUE
            'valorCampo' => 'no_tiene_datos'
        ];

    }


    //Cierro conexion con bd
    $conn->close();

    // Enviar respuesta al cliente en formato JSON
    header('Content-Type: application/json');
    echo json_encode($data);

}else{

    // Manejar solicitudes incorrectas
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'valorCampo' => 'no_tiene_datos',
        'error' => 'Solicitud incorrecta.',
        'dic_code' => '250'
    ]);

}

?>