<?php
/**
 * Esta funcion incluye al archivo externo conexion.php
 */
require '../conexion.php';
/**
 * ruc_cliente - numero - Almacena varible externa id que obtenemos con la funcion filter_input.
 * sql - actualiza el status a 0 en la tabla cliente 
 * sentencia - recibe los resultados de la consulta sql y posteriormente lo ejecuta.
 */
$ruc_cliente= filter_input(INPUT_POST, 'id');
$sql="update cliente set status='0' where ruc_cliente=:id";
$sentencia=$connection->prepare($sql);
$sentencia->bindParam(':id',$ruc_cliente);
if(!$sentencia){// si hay error
  return 'Error al crear registro';
}else{$sentencia->execute();}
