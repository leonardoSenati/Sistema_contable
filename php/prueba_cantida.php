<?php
/**
 * Esta funcion incluye al archivo externo conexion.php
 */
require '../conexion.php';
/**
 * sql - consulta sql a la tabla ingreso.
 * resultado - recibe los resultados de la consulta sql y posteriormente lo ejecuta.
 * json - arreglo - para capturar la matriz de datos que devuelve la funcion fetch.
 *  json_encode - convierte el array de datos en formato JSON.
 */
$sql ="select count(*) as cantidad from ingreso";
$resultado = $connection->prepare($sql);
$resultado->execute();
$json=array();
while($r=$resultado->fetch(PDO::FETCH_ASSOC)){
    $json[]=array(
        'cantidad'=>$r['cantidad']
    );
}
echo json_encode($json);