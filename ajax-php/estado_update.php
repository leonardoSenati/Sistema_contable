<?php

//Esta funcion incluye al archivo externo conexion.php
require '../conexion.php';
/**
 * ruc_cliente - numero - Almacena varible externa id que obtenemos con la funcion filter_input.
 * sql - instruccion sql para actualizar el status.
 * sentencia - recibe el resultados de la actualizacion sql y posteriormente lo ejecuta.
 */
$ruc_cliente= filter_input(INPUT_POST, 'id');
$sql="update proyecto set estado ='2' where id_proyecto=:id";
$sentencia=$connection->prepare($sql);
$sentencia->bindParam(':id',$ruc_cliente);
if(!$sentencia){// si hay error
  return 'Error al crear registro';
}else{$sentencia->execute();}
