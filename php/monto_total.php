<?php
/**
 * Esta funcion incluye al archivo externo conexion.php
 */
require '../conexion.php';
/*
 * id_proyecto - numero - Almacena varible externa id_proyecto que obtenemos con la funcion filter_input.
 * sql - consulta sql a la tabla egreso validando si existe el id del proyecto. 
 * resultado - recibe los resultados de la consulta sql y posteriormente lo ejecuta.
 * json - arreglo - para capturar la matriz de datos que devuelve la funcion fetch.
 *  json_encode - convierte el array de datos en formato JSON.
 */
$id_proyecto=filter_input(INPUT_POST, 'id_proyecto');
$sql ="SELECT SUM(monto) as total FROM egreso WHERE id_proyecto ='".$id_proyecto."'";
$resultado = $connection->prepare($sql);
$resultado->execute();
$json=array();
while($r=$resultado->fetch(PDO::FETCH_ASSOC)){
    $json[]=array(
        'total'=>$r['total']
    );
}
echo json_encode($json);
