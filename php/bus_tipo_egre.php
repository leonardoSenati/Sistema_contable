<?php
/**
 * Esta funcion incluye al archivo externo conexion.php
 */
require '../conexion.php';
/*
 * sql - instruccion sql - consulta a la tabla tipo_egreso.
 * resultado - recibe el resultado de la consulta sql y posteriormente lo ejecuta.
 * json_encode - convierte el array de datos en formato JSON
 */
$sql ="select * from tipo_egreso";
$resultado = $connection->prepare($sql);
$resultado->execute();
$json=array();
while($r=$resultado->fetch(PDO::FETCH_ASSOC)){
    $json[]=array(
        't_egreso'=>$r['t_egreso'],
        'nombre'=>$r['nombre']
    );
}
echo json_encode($json);
