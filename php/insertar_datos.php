<?php
session_start();//importante para ver al usuario logueado

include('functions.php');

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
	//echo_json_x($datos, 'datos');

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

    include('connect_db.php');

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

    //debug_x($datos['arr']);

    //antes
    //$tabla = $datos['tabla'];//vkladki
    //$campo = $datos['campo'];//arrTabs
    //$arr = json_encode($datos['arr']);//arrTabs   
    
    $tabla = $conn->real_escape_string($datos['tabla']);//vkladki
    $campo = $conn->real_escape_string($datos['campo']);//arrTabs
    $arr = json_encode($datos['arr']);//arrTabs //no usar $conn->real_escape_string($datos['arr']) ya que retorna NULL

    //$arr = json_encode(agregarBarrasUnicode($datos['arr']));
    //exit;

    // Obtener la fecha y hora actual
    $fechaHoraActual = date("Y-m-d H:i:s");
    

    //busco si hay registro en la tabla a donde insertar array
    $sql_init = "SELECT * 
                FROM $tabla 
                WHERE id_user = '$id_user_logged' 
    ";
    $sql_prep = "SELECT * 
                FROM $tabla 
                WHERE id_user = ? 
    ";
    $arr_params = [$id_user_logged];
    $sql_preparada = prepararQuery($conn, $sql_prep, $arr_params);
	$result = $conn->query($sql_preparada);
    //debug_x($sql_preparada, 'sql_preparada');

    if($result->num_rows > 0){
        $row = $result->fetch_assoc();
		//echo_json_x($row,'row');
		
        $storedId_user = $row["id_user"];//1
        $hay_id_user_en_tabla = true;
    }else{
        $hay_id_user_en_tabla = false;
    }

	//echo_json_x($hay_id_user_en_tabla, 'hay_id_user_en_tabla');

    $sign = '__[(&)]__';//IMPORTANTE! para que ho haya errores con $arr en json
    
    // Realizar la inserción o (update) en la base de datos 
    if($hay_id_user_en_tabla){
        //hago update
        $sql2_up_init = "UPDATE $tabla SET 
                    $campo = '$arr',
                    updated_at = '$fechaHoraActual'
                    WHERE id_user = '$id_user_logged'
        ";
        $sql2_up_prep = "UPDATE $sign SET 
                    $sign = '$arr',
                    updated_at = $sign 
                    WHERE id_user = $sign 
        ";
        //$arr paso tal cual ya que los datos pueden tener dentro '?' y romper sql
        $arr_params = [$tabla, $campo, $fechaHoraActual, $id_user_logged];
        $sql2_up_preparada = prepararQuery($conn, $sql2_up_prep, $arr_params, $sign);
        $result2 = $conn->query($sql2_up_preparada);
        //debug_x($sql2_up_preparada, 'sql2_up_preparada');
        //echo_json_x($sql2_up_preparada, 'sql2_up_preparada');	
    }else{
        //hago insert
        $sql2_in_init = "INSERT INTO $tabla (id_user, username, $campo, created_at) 
                        VALUES ('$id_user_logged', '$username_logged', '$arr', '$fechaHoraActual')
        ";
        $sql2_in_prep = "INSERT INTO $sign (id_user, username, $sign, created_at) 
                        VALUES ($sign, $sign, '$arr', $sign)
        ";
        //$arr paso tal cual ya que los datos pueden tener dentro '?' y romper sql
        $arr_params = [$tabla, $campo, $id_user_logged, $username_logged, $fechaHoraActual];
        $sql2_in_preparada = prepararQuery($conn, $sql2_in_prep, $arr_params, $sign);
        $result2 = $conn->query($sql2_in_preparada);
        //debug_x($sql2_in_preparada, 'sql2_in_preparada');
    }
	//echo_json_x($result2, 'result2');


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

?>
