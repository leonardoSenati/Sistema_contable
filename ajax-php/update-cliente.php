<?php

/**
 * Esta funcion incluye al archivo externo conexion.php
 */
require '../conexion.php';
/**
 * ruc_cliente - numero - Almacena varible externa ruc que obtenemos con la funcion filter_input.
 * nombre_clie - cadena de texto - Almacena varible externa clie que obtenemos con la funcion filter_input.
 * apellido - cadena de texto - Almacena varible externa ape que obtenemos con la funcion filter_input.
 * correo - cadena de texto - Almacena varible externa cor que obtenemos con la funcion filter_input.
 * telefono - numero- Almacena varible externa tel que obtenemos con la funcion filter_input.
 * sql - instruccion sql para actualizar la tabla cliente.
 * sentencia - recibe los resultados de la consulta sql y posteriormente lo ejecuta.
 */
$ruc_cliente= filter_input(INPUT_POST, 'ruc');
$nombre_clie= filter_input(INPUT_POST, 'clie');
$apellido= filter_input(INPUT_POST, 'ape');
$correo= filter_input(INPUT_POST, 'cor');
$telefono= filter_input(INPUT_POST, 'tel');
$sql="update cliente set nombre_clie=:clie, apellido=:ape, correo=:cor , telefono=:tel  where ruc_cliente=:ruc";
$sentencia=$connection->prepare($sql);
$sentencia->bindParam(':ruc',$ruc_cliente);
$sentencia->bindParam(':clie',$nombre_clie);
$sentencia->bindParam(':ape',$apellido);
$sentencia->bindParam(':cor',$correo);
$sentencia->bindParam(':tel',$telefono);
if(!$sentencia){
    return 'Error al crear registro';}
else{
    $sentencia->execute();
}



