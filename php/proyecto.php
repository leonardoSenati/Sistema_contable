<?php
/**
 * Esta funcion incluye al archivo externo conexion.php
 */
require '../conexion.php';
/**
 * ruc_cliente - numero - Almacena varible externa ruc_cliente que obtenemos con la funcion filter_input.
 * sql - consulta sql a la tabla proyecto validando siexiste el ruc del cliente con estado 1
 * resultado - recibe los resultados de la consulta sql y posteriormente lo ejecuta.
 * json - arreglo - para capturar la matriz de datos que devuelve la funcion fetch.
 *  json_encode - convierte el array de datos en formato JSON.
 */
$ruc_cliente=filter_input(INPUT_POST, 'ruc_cliente');
$sql ="select * from proyecto where ruc_cliente='".$ruc_cliente."' and estado=1";
$resultado = $connection->prepare($sql);
$resultado->execute();
$json=array();
while($r=$resultado->fetch(PDO::FETCH_ASSOC)){
    $json[]=array(
        'id_proyecto'=>$r['id_proyecto'],
        'n_proyecto'=>$r['n_proyecto']
    );
}
echo json_encode($json);
