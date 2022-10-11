<?php
//Esta funcion incluye al archivo externo conexion.php
require '../conexion.php';
/**
 * sql - Consulta a la tabla administrador donde el status sea igual a 1 
 * resultado - recibe los resultados de la consulta sql y posteriormente lo ejecuta.
 * json - arreglo - para capturar la matriz de datos que devuelve la funcion fetch
 *  json_encode - convierte el array de datos en formato JSON
 */
$sql ="select * from administrador where status='1'";
$resultado = $connection->prepare($sql);
$resultado->execute();
$json=array();
while($r=$resultado->fetch(PDO::FETCH_ASSOC)){
    $json[]=array(
        'dni_admin'=>$r['dni_admin'],
        'nombre'=>$r['nombre'],
        'apellido'=>$r['apellido'],
        'correo'=>$r['correo']
    );
}
echo json_encode($json);
