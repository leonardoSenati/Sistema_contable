<?php
/**
 * Esta funcion incluye al archivo externo conexion.php
 */
require '../conexion.php';
/**
 * sql - instruccion sql - consulta a la tabla cliente.
 * resultado - recibe el resultado de la consulta sql y posteriormente lo ejecuta.
 * json_encode - convierte el array de datos en formato JSON
 */
$sql ="select * from cliente where status = 1";
$resultado = $connection->prepare($sql);
$resultado->execute();
$json=array();
while($r=$resultado->fetch(PDO::FETCH_ASSOC)){
    $json[]=array(
        'ruc_cliente'=>$r['ruc_cliente'],
        'nombre_clie'=>$r['nombre_clie'],
    );
}
echo json_encode($json);
