<?php
session_start();//importante para ver al usuario logueado


/*
//HACER PRUEBAS...
echo json_encode([
    'HACIENDO_PRUEBAS' => 'DESCOMENTAR EN PROD',
    'success' => true,
    'message' => 'No existe sessión. Para insertar datos hay que loguearse antes. Solicitud incorrecta.',
    'dic_code' => 'd245'
]);
exit;
*/


if ($_SERVER['REQUEST_METHOD'] === 'POST' || true) {
       
    // Recuperar datos JSON
    $json = file_get_contents('php://input');
    $datos = json_decode($json, true);
	//echo json_encode(['$datos' => $datos]);
	//die();

    // Verificar que se decodificó correctamente
    if ($datos === null) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Error al procesar el JSON.',
            'dic_code' => 'd235'
        ]);
        exit;
    }
    

    // Recuperar los valores
    if(isset($_SESSION['username']) && isset($_SESSION['id_user']) ) {
        $id_user_logged = $_SESSION['id_user'];
        $username_logged = $_SESSION['username'];
        //echo json_encode(['mensaje' => 'sesion username_logged: ' . $username_logged ]);        
    } else {
        $id_user_logged = 5;
        $username_logged = 'user_test_no_borrar';
        //echo json_encode(['mensaje' => $username_logged]);
        
        // Manejar solicitudes incorrectas
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'No existe sessión. Para insertar datos hay que loguearse antes. Solicitud incorrecta.',
            'dic_code' => 'd245'
        ]);
        die();
    }
	//echo json_encode(['$id_user_logged' => $id_user_logged]);
	//die();

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
    $sql = "SELECT * 
            FROM $tabla 
            WHERE id_user = '$id_user_logged' 
    ";
	// $result = mysqli_query($conn, $sql);
	$result = $conn->query($sql);

    if(/*mysqli_num_rows($result) > 0*/ $result->num_rows > 0){
		//$row = mysqli_fetch_assoc($result);
        $row = $result->fetch_assoc();
		//echo json_encode(['$row' => $row]);
		//die();
		
        $storedId_user = $row["id_user"];//1
        $hay_id_user_en_tabla = true;
    }else{
        $hay_id_user_en_tabla = false;
    }

	//echo json_encode(['$hay_id_user_en_tabla' => $hay_id_user_en_tabla]);
	//die();

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
	// $result2 = mysqli_query($conn, $sql2);	
	$result2 = $conn->query($sql2);	
	//echo json_encode(['$result2' => $result2]);
	//die();


    //Update o insert datos en la tabla $tabla
    if($result2 === TRUE) {
        if($hay_id_user_en_tabla){
            $respuesta = [
                'success' => true,
                'mensaje' => 'Datos actualizados correctamente.',
                'dic_code' => 'd246'
            ];
        }else{
            $respuesta = [
                'success' => true,
                'mensaje' => 'Datos insertados correctamente.',
                'dic_code' => 'd247'
            ];
        }
    } else {
        if($hay_id_user_en_tabla){
            $respuesta = [
                'success' => false,
                'error' => 'Error al actualizar datos: ',
                'conn_error' => $conn->error,
                'dic_code' => 'd248'
            ];
        }else{
            $respuesta = [
                'success' => false,
                'mensaje' => 'Error al insertar datos: ',
                'conn_error' => $conn->error,
                'dic_code' => 'd249'
            ];
        }
    }

    //Cierro conexion con bd
    $conn->close();	

    // Enviar respuesta al cliente en formato JSON
    header('Content-Type: application/json');
    echo json_encode($respuesta);
	
} else {
    
	// Manejar solicitudes incorrectas
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Solicitud incorrecta.',
        'dic_code' => 'd250'
    ]);
}


function agregarBarrasUnicode($cadena) {
    // Aplicar addslashes solo a los caracteres 'uXXXX'
    $cadena = preg_replace('/(u[0-9A-Fa-f]{4})/i', '\\\\$1', $cadena);

    return $cadena;
}

?>
