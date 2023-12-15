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
    if(isset($_SESSION['username'])) {
        $id_user_logged = $_SESSION['id_user'];
        $username_logged = $_SESSION['username'];
        //echo json_encode(['mensaje' => 'sesion username_logged: ' . $username_logged ]);        
    } else {
        $id_user_logged = 0;
        $username_logged = 'nobody';
        //echo json_encode(['mensaje' => $username_logged]);
    }
    $arr = json_encode($datos['arr']);
    //exit;

    // Obtener la fecha y hora actual
    $fechaHoraActual = date("Y-m-d H:i:s");

    include('connect_db.php');





    //busco si hay registro
    $sql = "SELECT * FROM vkladki where id_user = '$id_user_logged' ";
    $result = $conn->query($sql);
    $rows = $result->fetch_all(MYSQLI_ASSOC);

    ($rows){
        //$rows = $result->fetch_all(MYSQLI_ASSOC)
        //$storedId_user = $rows[0]["id_user"];//1
        $hay_id_user = true;
    }else{
        $hay_id_user = false;
    }









    // Realizar la inserción en la base de datos 
    
    if($hay_id_user){
        //hago update
        $sql2 = "UPDATE vkladki SET 
                arr = '$arr',
                created_at = '$fechaHoraActual'
                WHERE id_user = '$id_user_logged'
                ";
    }else{
        //hago insert
        $sql2 = "INSERT INTO vkladki (id_user, username, arr, created_at) 
                 VALUES ('$id_user_logged', '$username_logged', '$arr', '$fechaHoraActual')
        ";
    }
    $result2 = $conn->query($sql2);



    if ($result2 === TRUE) {
        $respuesta = ['mensaje' => 'Datos insertados correctamente'];
    } else {
        $respuesta = ['mensaje' => 'Error al insertar datos: ' . $conn->error];
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
?>
