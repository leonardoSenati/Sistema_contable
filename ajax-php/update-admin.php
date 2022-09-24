<?php
require '../conexion.php';
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



