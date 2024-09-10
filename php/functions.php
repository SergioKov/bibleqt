<?php
//=====================================================================================//
// FUNCTIONS - START
//=====================================================================================//

function debug($variable, $name_var = null){
    if($name_var != null) echo"<h3>$name_var: </h3>";
    echo"<pre>";
    var_dump($variable);
    echo"</pre>";
}


function debug_x($variable, $name_var = null){//con exit;
    if($name_var != null) echo"<h3>$name_var: </h3>";
    echo"<pre>";
    var_dump($variable);
    echo"</pre>";
    echo"<p>--- hago exit ---</p>";
    exit;
}

function debug_r($variable, $name_var = null){
    if($name_var != null) echo"<h3>$name_var: </h3>";
    echo"<pre>";
    print_r($variable);
    echo"</pre>";
}

function debug_r_x($variable, $name_var = null){
    if($name_var != null) echo"<h3>$name_var: </h3>";
    echo"<pre>";
    print_r($variable);
    echo"</pre>";
    echo"<p>--- hago exit ---</p>";
    exit;
}

function echo_json($variable, $name_var = null){
    if($name_var != null){
        echo json_encode([
            $name_var => $variable
        ], JSON_UNESCAPED_UNICODE);    
    }else{
        echo json_encode([
            'variable' => $variable
        ], JSON_UNESCAPED_UNICODE);
    }    
}

function echo_json_x($variable, $name_var = null){//con exit;
    if($name_var != null){
        echo json_encode([
            $name_var => $variable,
            'hago_exit' => true
        ], JSON_UNESCAPED_UNICODE);    
    }else{
        echo json_encode([
            'variable' => $variable,
            'hago_exit' => true
        ], JSON_UNESCAPED_UNICODE);
    }    
    exit;
}


function interpolateQuery($query, $params) {//$params es un array
    // Dividir la consulta en partes utilizando '?' como delimitador
    $parts = explode('?', $query);
    $final_query = '';
    
    // Iterar sobre las partes y los parámetros
    for ($i = 0; $i < count($parts); $i++) {
        $final_query .= $parts[$i];
        
        // Añadir el valor del parámetro si existe
        if (isset($params[$i])) {
            $value = $params[$i];
            
            // Determinar el tipo de dato y formatear adecuadamente
            if (is_int($value) || is_float($value)) {
                $final_query .= $value;
            } elseif (is_null($value)) {
                $final_query .= 'NULL';
            } else {
                // Escapar caracteres especiales para cadenas
                $escaped = addslashes($value);
                $final_query .= "'" . $escaped . "'";
            }
        }
    }
    
    return $final_query;
}


function prepararQuery($conn, $query, $arr_params, $sign = '?') {
    //echo "<hr><p> START --- function: prepararQuery() </p><hr>";
    //$conn => es necesario para $conn->real_escape_string($value)
    //$query => es la consulta sql 
    //$arr_params => es un array de parámetros
    //$sign => por defecto es '?' pero al introducir json pongo signo especial. Ej.: '__[(&)]__' //no usar '<' ni '>'
    //si en arr_params algun valor es null, meterlo directamente sin usar '?'
    //si la consulta $query no tiene '?' pasar $arr_params vacio => [] o no USAR ESTA FUNCION YA QUE NO HACE NADA

    // Dividir la consulta en partes utilizando '?' como delimitador
    $arr_parts = explode($sign, $query);
    $final_query = '';
    
    //debug($sign, 'sign');
    //debug($query, 'query');
    //debug($arr_params, 'arr_params');
    //debug($arr_parts, 'arr_parts');
    //debug(count($arr_parts), 'count(arr_parts)');
    //echo "<hr><p> START --- FOR </p><hr>";

    if(count($arr_parts) > 1){//SI AL MENOS HAY UN '?' AL DIVIDIR STRING RETORNA 2 VALORES EN arr_parts

        // Iterar sobre las partes y los parámetros
        for ($i = 0; $i < count($arr_parts); $i++) {        
            $final_query .= $arr_parts[$i];

            //debug($arr_parts[$i],"$ arr_parts[$i]");
            //debug($final_query, "$ final_query [$i] antes");
            
            // Añadir el valor del parámetro si existe
            if (isset($arr_params[$i]) ) {
                $value = $arr_params[$i];

                //debug($arr_params[$i], "$ arr_params[$i]");
                //debug($value, 'value');
                
                // Determinar el tipo de dato y formatear adecuadamente
                if (is_int($value) || is_float($value)) {
                    $final_query .= $value;
                    //echo " $ value es INT o FLOAT";
                } elseif (is_bool($value)) {
                    $final_query .= ($value) ? 1 : 0 ;
                    //echo " $ value es BOOL";
                } elseif (is_null($value)) {
                    //aki no entra nunca ya que si $arr_params[$i] = NULL la comprobación isset(NULL) retorna false y no entra aki. 
                    //pero lo dejo aki con esta explicación
                    $final_query .= 'NULL';
                    //echo " $ value [$value] es NULL";
                } else {
                    // Escapar caracteres especiales para cadenas
                    $value_escaped = $conn->real_escape_string($value);
                    $final_query .= "'" . $value_escaped . "'";
                    //echo " $ value [$value] es STRING";
                }
            }

            //debug($final_query, "$ final_query [$i] después ");
            //echo "<hr>";
        }
        //echo "<hr><p> END --- FOR </p><hr>";
        //echo "<hr><p> END --- function: prepararQuery() </p><hr>";

        return $final_query;

    }else{

        //echo "<hr><h3> NO HAY '?' EN LA CONSULTA. LA RETORNO TAL CUAL</h3>";
        return $query;
    }    
}



function agregarBarrasUnicode($cadena) {
    // Aplicar addslashes solo a los caracteres 'uXXXX'
    $cadena = preg_replace('/(u[0-9A-Fa-f]{4})/i', '\\\\$1', $cadena);

    return $cadena;
}


function ejemploSQLpreparada(){//compleja y no funciona. dejo aki como ejemplo y comentado
    /*
        if($modo == 'seguro'){
            //con la consulta segura, preparando los parémetros
            $checkQuery = "SELECT `username`, `email` 
                            FROM users 
                            WHERE email = ?
            ";
        
            // Preparar la consulta SQL con parámetros
            $stmt = $conn->prepare($checkQuery);
            if ($stmt === false) {
                die("Error en la preparación de la consulta: " . $conn->error);
            }
        
            // Vincular los parámetros con diferentes tipos de datos
            //$stmt->bind_param("sis", $name, $age, $registration_date);//ejemplo si hay varios parametros...
            $stmt->bind_param("s", $email);
        
            // 's' => string
            // 'i' => integer
            // 's' => string (las fechas se manejan como strings en este caso)
        
            // Ejecutar la consulta
            $stmt->execute();
        
            // Almacenar los resultados en el objeto $stmt
            $stmt->store_result();
        
            // Obtener el resultado
            //$result = $stmt->get_result();//->get_result() se usa solo con 'SELECT' NO FUNCIONA NI EN LOCALHOST NI EN HOSTALIA
            
            // Vincular las columnas devueltas por la consulta a variables
            //bind_result() solo se usa con 'SELECT'
            $stmt->bind_result($username, $email);//los nombres de los campos en bd `username`, `email`. 
            
            //$result = $stmt;//para hacer $result->num_rows ya que lo hace $stmt->num_rows
            $result_num_rows = $stmt->num_rows;//lo mismo devuelve $stmt->affected_rows
            $stmt->close();//cerrar la declaración
        }
    */

    /*
        if($modo == 'seguro'){
            //modo 2. seguro
            $insertQuery = "INSERT INTO users (`username`, `password_text`, `password`, `salt`, `email`, `created_at`) 
                            VALUES (?, ?, ?, ?, ?, ?)
            ";//VALUES ('$username', '$password', '$hashedPassword', '$salt', '$email', '$created_at')

            //$params = array($username, $password, $hashedPassword, $salt, $email, $created_at);
            //echo interpolateQuery($insertQuery, $params);
            //debug($insertQuery);
            //debug_x(interpolateQuery($insertQuery, $params));

            // Preparar la consulta SQL con parámetros
            $stmt = $conn->prepare($insertQuery);
            if ($stmt === false) {
                die("Error en la preparación de la consulta: " . $conn->error);
            }

            // Vincular los parámetros con diferentes tipos de datos
            $stmt->bind_param("ssssss", $username, $password, $hashedPassword, $salt, $email, $created_at);
            
            // Ejecutar la consulta
            $stmt->execute();

            // Obtener el resultado
            $result_in = $stmt->affected_rows;//
            $stmt->close();//cerrar la declaración
        }    
    */

    /*
        if($modo == 'seguro'){
            // Verificar si el correo electrónico existe en la base de datos
            //modo 2. consulta preparada
            $checkQuery = "SELECT `id_user`, `username` 
                            FROM users 
                            WHERE email = ? 
            ";    
            $stmt = $conn->prepare($checkQuery);
            $stmt->bind_param("s", $email);

            // Ejecutar la consulta
            $stmt->execute();

            // Almacenar los resultados en el objeto $stmt
            $stmt->store_result();

            // Vincular las columnas devueltas por la consulta a variables
            $stmt->bind_result($id_user, $username);//si hay 2 campos => bind_result($id_user, $username)

            $results = [];//para meter alli variables $id_user y $username
            // Iterar sobre los resultados
            while ($stmt->fetch()) {
                $results[] = array(
                    'id_user' => $id_user,
                    'username' => $username
                );
            }

            //ver los valores de results en pantalla. solo para debuguear!
            for ($i=0; $i < count($results); $i++) { 
                $row = $results[$i];
                debug($row, 'row') . "<br>";
            }
            //debug_x($results, 'results');

            // $result = $stmt->get_result();//'->get_result()' no funciona 
            $result_num_rows = $stmt->num_rows;//no funciona 
            $stmt->close();

            $row = $results[0];
            //$storedId_user = $row['id_user'];//1
            $storedUsername = $row['username'];//Sergio
        }
    */
}


function writeLog($message, $level = 'INFO') {
    
    if($_SERVER['HTTP_HOST'] == 'bibleqt.es'){//HOSTALIA
        $logFile = '../logs/app_prod.log';  // Define la ruta del archivo de log en Hostalia
    }else{//LOCALHOST
        $logFile = '../logs/app_local.log';  // Define la ruta del archivo de log en Localhost
    }

    // Obtiene el archivo desde donde se llamó a la función usando debug_backtrace()
    $backtrace = debug_backtrace();
    $callingFile = isset($backtrace[0]['file']) ? $backtrace[0]['file'] : 'desconocido';
    $callingLine = isset($backtrace[0]['line']) ? $backtrace[0]['line'] : 'desconocido';

    if($callingFile !== 'desconocido'){
        if(strpos($callingFile, '/') !== false){
            $arr_callingFile = explode('/',$callingFile);
        }else{
            $arr_callingFile = explode('\\',$callingFile);
        }
        $callingfile_short = array_slice($arr_callingFile, -1)[0]; // Obtiene el último elemento
    }else{
        $callingfile_short = $callingFile;
    }    

    $logMessage = date('Y-m-d H:i:s') . " [$level] - $message - Archivo: [$callingfile_short] línea: [$callingLine]";
    
    // Escribe el mensaje en el archivo de log
    error_log($logMessage . PHP_EOL, 3, $logFile);
}



//=====================================================================================//
// FUNCTIONS - END
//=====================================================================================//
?>