<?php
/**
 * Esta funcion incluye al archivo externo conexion.php
 */
require '../conexion.php';
/**
 * id - numero - Almacena varible externa id que obtenemos con la funcion filter_input.
 * sql - Consulta a la tabla cliente con procedimiento almacenado si existe el ruc del cliente.
 * resultado - recibe los resultados de la consulta sql y posteriormente lo ejecuta.
 * json - arreglo - para capturar la matriz de datos que devuelve la funcion fetch.
 *  json_encode - convierte el array de datos en formato JSON.
 */
$id= filter_input(INPUT_POST, 'id');
$sql="select * from cliente as c inner join rubro as r on r.id_rubro=c.id_rubro where ruc_cliente='".$id."'";
$resultado=$connection->prepare($sql);
$resultado->execute();
$json=array();
while($row=$resultado->fetch(PDO::FETCH_ASSOC)){
  $json[]=array(
    'ruc'=>$row['ruc_cliente'],
    'clie'=>$row['nombre_clie'],
    'ape'=>$row['apellido'],
    'cor'=>$row['correo'],
    'tel'=>$row['telefono'],
    'rub'=>$row['id_rubro']
  );
}

echo json_encode($json[0]);