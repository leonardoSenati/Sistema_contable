<?php
/**
 * Esta funcion incluye al archivo externo conexion.php
 */
require '../conexion.php';
/**
 * dni_admin - numero - Almacena varible externa id que obtenemos con la funcion filter_input.
 * sql - actualiza el status a 0 en la tabla administrador 
 * sentencia - recibe los resultados de la consulta sql y posteriormente lo ejecuta.
 */
$dni_admin= filter_input(INPUT_POST, 'id');
$sql="update administrador set status='0' where dni_admin=:id";
$sentencia=$connection->prepare($sql);
$sentencia->bindParam(':id',$dni_admin);
if(!$sentencia){// si hay error
  return 'Error al crear registro';
}else{$sentencia->execute();}
