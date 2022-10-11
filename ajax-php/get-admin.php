<?php
/**
 * Esta funcion incluye al archivo externo conexion.php
 */
require '../conexion.php';
/**
 * id - numero - Almacena varible externa id que obtenemos con la funcion filter_input.
 * sql - Consulta a la tabla administrador si existe el dni del administrador.
 * resultado - recibe los resultados de la consulta sql y posteriormente lo ejecuta.
 * json - arreglo - para capturar la matriz de datos que devuelve la funcion fetch.
 *  json_encode - convierte el array de datos en formato JSON.
 */
$id= filter_input(INPUT_POST, 'id');
$sql="select * from administrador where dni_admin='".$id."'";
$resultado=$connection->prepare($sql);
$resultado->execute();
$json=array();
while($row=$resultado->fetch(PDO::FETCH_ASSOC)){
  $json[]=array(
    'dni'=>$row['dni_admin'],
    'nom'=>$row['nombre'],
    'ape'=>$row['apellido'],
    'email'=>$row['correo']
  );
}

echo json_encode($json[0]);