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
    exit;
}

function debug_r($variable, $name_var = null){
    if($name_var != null) echo"<h3>$name_var: </h3>";
    echo"<pre>";
    print_r($variable);
    echo"</pre>";
}

function echo_json($variable, $name_var = null){
    if($name_var != null){
        echo json_encode([
            $name_var => $variable
        ]);    
    }else{
        echo json_encode([
            'variable' => $variable
        ]);
    }    
}

function echo_json_x($variable, $name_var = null){//con exit;
    if($name_var != null){
        echo json_encode([
            $name_var => $variable
        ]);    
    }else{
        echo json_encode([
            'variable' => $variable
        ]);
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

function agregarBarrasUnicode($cadena) {
    // Aplicar addslashes solo a los caracteres 'uXXXX'
    $cadena = preg_replace('/(u[0-9A-Fa-f]{4})/i', '\\\\$1', $cadena);

    return $cadena;
}








//=====================================================================================//
// FUNCTIONS - END
//=====================================================================================//
?>