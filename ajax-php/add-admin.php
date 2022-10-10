<?php
//Esta funcion incluye al archivo externo conexion.php
require '../conexion.php';
/**
 * dni_admin - numero - Almacena variable externa dni que obtenemos con la funcion filter_input.
 * nombre - cadena de texto - Almacena varible externa nom que obtenemos con la funcion filter_input.
 * apellido - cadena de texto - Almacena varible externa ape que obtenemos con la funcion filter_input.
 * correo - cadena de texto - Almacena varible externa cor que obtenemos con la funcion filter_input.
 * contraseña - Cadena alfanumérica - Almacena varible externa contra que obtenemos con la funcion filter_input.
* verificar - instruccion sql para consultar si existe el dni_admin  o el correo del administrador.
 * sql - instruccion sql para insertar administrador.
 */
$dni_admin= filter_input(INPUT_POST, 'dni');
$nombre= filter_input(INPUT_POST, 'nom');
$apellido= filter_input(INPUT_POST, 'ape');
$correo= filter_input(INPUT_POST, 'cor');
$contraseña= md5(filter_input(INPUT_POST, 'contra'));
//
$verificar="select * from administrador where dni_admin='".$dni_admin."' or correo='".$correo."'";
$sql="insert into administrador(dni_admin,nombre,apellido,correo,contraseña,status) values(:dni,:nom,:ape,:cor,:contra,'1')";

$sentenciaV=$connection->prepare($verificar);
$sentenciaV->execute();

if($row=$sentenciaV->fetch(PDO::FETCH_ASSOC)>0){ 
    
    echo 'no';
}else{
    echo 'yes';
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
}
