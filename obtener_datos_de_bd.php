<?php
session_start();//importante para ver al usuario logueado

if (true) {

    // Recuperar datos JSON
    $json = file_get_contents('php://input');
    $datos = json_decode($json, true);
    
    // Verificar que se decodificó correctamente
    if ($datos === null) {
        http_response_code(400);
        echo json_encode(['mensaje' => 'Error al decodificar los datos JSON']);
        exit;
    }

    $tabla = $datos['tabla'];//vkladki
    $campo = $datos['campo'];//arrTabs
    $tabla2 = json_encode($datos['tabla']);//vkladki
    $campo2 = json_encode($datos['campo']);//arrTabs
    //echo json_encode(['tabla' => $tabla, 'campo' => $campo, 'tabla2' => $tabla2, 'campo2' => $campo2]);
    //die();


    // Recuperar los valores
    if(isset($_SESSION['username']) && isset($_SESSION['id_user']) ) {
        $id_user_logged = $_SESSION['id_user'];
        $username_logged = $_SESSION['username'];
        //echo json_encode(['mensaje' => 'sesion username_logged: ' . $username_logged ]);        
    } else {
        $id_user_logged = 0;
        $username_logged = 'nobody';
        //echo json_encode(['mensaje' => $username_logged]);
    }


    include('connect_db.php');


    //busco si hay registro
    $sql = "SELECT $campo FROM $tabla where id_user = '$id_user_logged' ";
    $result = $conn->query($sql);

    if($result->num_rows > 0){
        $rows = $result->fetch_all(MYSQLI_ASSOC);
        $hay_id_user_en_tabla = true;
        $data = $rows[0][$campo];

        //echo json_encode(['tabla' => $tabla, 'campo' => $campo, '$sql' => $sql, 'data' => $data]);
        //die();

        //$data = $campo;//test
        //echo"(if)";
        //var_dump($rows[0]);
        //die();
    }else{
        $hay_id_user_en_tabla = false;
        $data = 'no_tiene_datos';
        //echo"(else)";
    }
    //die();


    $conn->close();


    // Enviar respuesta al cliente en formato JSON
    header('Content-Type: application/json');
    echo json_encode($data);

}else{

    // Manejar solicitudes incorrectas
    http_response_code(400);
    echo json_encode(['mensaje' => 'Solicitud incorrecta']);
}
?>
