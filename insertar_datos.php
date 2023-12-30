<?php
session_start();//importante para ver al usuario logueado

if ($_SERVER['REQUEST_METHOD'] === 'POST' || true) {
       
    // Recuperar datos JSON
    $json = file_get_contents('php://input');
    $datos = json_decode($json, true);

    // Verificar que se decodificó correctamente
    if ($datos === null) {
        http_response_code(400);
        echo json_encode(['mensaje' => 'Error al decodificar los datos JSON']);
        exit;
    }
    

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

    /*
    foreach ($datos['arr'] as $arr_k => $arr_v) {

        foreach ($arr_v as $k => $v) {
            if($k == 'ref'){
                //echo "<p>$k: $v </p>";
                // $datos['arr'][$arr_k][$k] = agregarBarrasUnicode($v);
                $datos['arr'][$arr_k][$k] = addslashes($v);
                //echo "<p>$ datos['arr'][$arr_k][$k]:" . $datos['arr'][$arr_k][$k];
            }
        }
    }
    */

    //print_r($datos['arr']);
    //die();


    $tabla = $datos['tabla'];//vkladki
    $campo = $datos['campo'];//arrTabs
    $arr = json_encode($datos['arr']);//arrTabs
    
    
    //$arr = json_encode(agregarBarrasUnicode($datos['arr']));
    //exit;

    // Obtener la fecha y hora actual
    $fechaHoraActual = date("Y-m-d H:i:s");


    include('connect_db.php');


    //busco si hay registro en la tabla a donde insertar array
    $sql = "SELECT * FROM $tabla where id_user = '$id_user_logged' ";
    $result = $conn->query($sql);

    if($result->num_rows > 0){
        $rows = $result->fetch_all(MYSQLI_ASSOC);
        $storedId_user = $rows[0]["id_user"];//1
        $hay_id_user_en_tabla = true;
        //echo"11";
        //var_dump($rows[0]);
        //die();
    }else{
        $hay_id_user_en_tabla = false;
        //echo"00";
    }




    // Realizar la inserción o (update) en la base de datos 
    if($hay_id_user_en_tabla){
        //hago update
        $sql2 = "UPDATE $tabla SET 
                $campo = '$arr',
                updated_at = '$fechaHoraActual'
                WHERE id_user = '$id_user_logged'
        ";
    }else{
        //hago insert
        $sql2 = "INSERT INTO $tabla (id_user, username, $campo, created_at) 
                 VALUES ('$id_user_logged', '$username_logged', '$arr', '$fechaHoraActual')
        ";
    }
    //echo"$sql2";
    $result2 = $conn->query($sql2);
    //die();


    //Update o insert datos en la tabla $tabla
    if($result2 === TRUE) {
        if($hay_id_user_en_tabla){
            $respuesta = ['mensaje' => 'Datos actualizados correctamente'];
        }else{
            $respuesta = ['mensaje' => 'Datos insertados correctamente'];
        }
    } else {
        if($hay_id_user_en_tabla){
            $respuesta = ['mensaje' => 'Error al actualizar datos: ' . $conn->error];
        }else{
            $respuesta = ['mensaje' => 'Error al insertar datos: ' . $conn->error];
        }
    }

    $conn->close();



    // Enviar respuesta al cliente en formato JSON
    header('Content-Type: application/json');
    echo json_encode($respuesta);
} else {
    // Manejar solicitudes incorrectas
    http_response_code(400);
    echo json_encode(['mensaje' => 'Solicitud incorrecta']);
}



function agregarBarrasUnicode($cadena) {
    // Aplicar addslashes solo a los caracteres 'uXXXX'
    $cadena = preg_replace('/(u[0-9A-Fa-f]{4})/i', '\\\\$1', $cadena);

    return $cadena;
}


?>
