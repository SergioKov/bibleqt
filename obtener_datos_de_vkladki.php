<?php
session_start();//importante para ver al usuario logueado

if (true) {


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
    $sql = "SELECT arr FROM vkladki where id_user = '$id_user_logged' ";
    $result = $conn->query($sql);

    if($result->num_rows > 0){
        $rows = $result->fetch_all(MYSQLI_ASSOC);
        $hay_id_user_en_vkladki = true;
        $data = $rows[0]['arr'];
        //echo"(if)";
        //var_dump($rows[0]);
        //die();
    }else{
        $hay_id_user_en_vkladki = false;
        $data = 'no_tiene_vkladki';
        //echo"(else)";
    }
    //die();


    $conn->close();



    // Enviar respuesta al cliente en formato JSON
    header('Content-Type: application/json');
    echo json_encode($data);
} else {
    // Manejar solicitudes incorrectas
    http_response_code(400);
    echo json_encode(['mensaje' => 'Solicitud incorrecta']);
}
?>
