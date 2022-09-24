<?php
require '../conexion.php';
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



