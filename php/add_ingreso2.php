<?php
/**
 * Esta funcion incluye al archivo externo conexion.php
 */
require '../conexion.php';
/**
 * id_caja -  numero - Almacena variable externa id_caja que obtenemos con la funcion filter_input.
 * monto - numero - Almacena varible externa monto que obtenemos con la funcion filter_input.
 * sql - instruccion sql para insertar datos
 * sentencia - recibe el resultados de la instruccion sql y posteriormente lo ejecuta.
 */
$id_caja= filter_input(INPUT_POST, 'id_caja');
$monto= filter_input(INPUT_POST, 'res');

$sql="call insertar_datos('".$id_caja."','".$monto."')";
$sentencia=$connection->prepare($sql);
$sentencia->execute();
echo 'exito';