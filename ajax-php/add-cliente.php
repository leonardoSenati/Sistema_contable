<?php
//Esta funcion incluye al archivo externo conexion.php
require '../conexion.php';
/**
 * ruc_cliente - numero - Almacena varible externa ruc que obtnemos con la funcion filter_input.
 * nombre_clie - cadena de texto - Almacena varible externa clie que obtnemos con la funcion filter_input.
 * apellido - cadena de texto  - Almacena varible externa ape que obtnemos con la funcion filter_input.
 * correo - cadena de texto - Almacena varible externa ruc que obtnemos con la funcion filter_input.
 * telefono - numero - Almacena varible externa ruc que obtnemos con la funcion filter_input.
 * rubro - cadena de texto - Almacena varible externa ruc que obtnemos con la funcion filter_input.
 * verificar - instruccion sql para consultar si existe el ruc  o el correo del cliente.
 * sql - instruccion sql para insertar cliente.
 */
$ruc_cliente= filter_input(INPUT_POST, 'ruc');
$nombre_clie= filter_input(INPUT_POST, 'clie');
$apellido= filter_input(INPUT_POST, 'ape');
$correo= filter_input(INPUT_POST, 'cor');
$telefono= filter_input(INPUT_POST, 'tel');
$rubro= filter_input(INPUT_POST, 'rub');
$verificar="select * from cliente where ruc_cliente='".$ruc_cliente."' or correo='".$correo."'";
$sql="insert into cliente(ruc_cliente,nombre_clie,apellido,correo,telefono,id_rubro,status) values(:ruc,:clie,:ape,:cor,:tel,:rub,'1')";

$sentenciaV=$connection->prepare($verificar);
$sentenciaV->execute();

if($row=$sentenciaV->fetch(PDO::FETCH_ASSOC)>0){ 
    echo 'no';
}else{
    echo 'yes';
    $sentencia=$connection->prepare($sql);
    $sentencia->bindParam(':ruc',$ruc_cliente);
    $sentencia->bindParam(':clie',$nombre_clie);
    $sentencia->bindParam(':ape',$apellido);
    $sentencia->bindParam(':cor',$correo);
    $sentencia->bindParam(':tel',$telefono);
    $sentencia->bindParam(':rub',$rubro);
    if(!$sentencia){
        return 'Error al crear registro';}
    else{
        $sentencia->execute();
    }
}
