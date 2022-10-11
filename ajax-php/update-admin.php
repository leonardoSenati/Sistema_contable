<?php
/**
 * Esta funcion incluye al archivo externo conexion.php
 */
require '../conexion.php';
/**
 * dni_admin - numero - Almacena varible externa dni que obtenemos con la funcion filter_input.
 * nombre - cadena de texto - Almacena varible externa nom que obtenemos con la funcion filter_input.
 * apellido - cadena de texto - Almacena varible externa ape que obtenemos con la funcion filter_input.
 * correo - cadena de texto - Almacena varible externa cor que obtenemos con la funcion filter_input.
 * contraseña - Cadena alfanumérica - Almacena varible externa contra que obtenemos con la funcion filter_input.
 * sql - instruccion sql para actualizar la tabla administrador.
 * sentencia - recibe los resultados de la consulta sql y posteriormente lo ejecuta.
 */
$dni_admin= filter_input(INPUT_POST, 'dni');
$nombre= filter_input(INPUT_POST, 'nom');
$apellido= filter_input(INPUT_POST, 'ape');
$correo= filter_input(INPUT_POST, 'cor');
$contraseña= md5(filter_input(INPUT_POST, 'contra'));
$sql="update administrador set nombre=:nom, apellido=:ape, correo=:cor, contraseña=:contra where dni_admin=:dni";
$sentencia=$connection->prepare($sql);
$sentencia->bindParam(':dni',$dni_admin);
$sentencia->bindParam(':nom',$nombre);
$sentencia->bindParam(':ape',$apellido);
$sentencia->bindParam(':cor',$correo);
$sentencia->bindParam(':contra',$contraseña);
if(!$sentencia){
    return 'Error al crear registro';}
else{
    $sentencia->execute();
}



