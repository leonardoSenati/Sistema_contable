<?php
require '../conexion.php';
$id_caja= filter_input(INPUT_POST, 'id_caja');
$monto= filter_input(INPUT_POST, 'res');

$sql="call insertar_datos('".$id_caja."','".$monto."')";
$sentencia=$connection->prepare($sql);
$sentencia->execute();
echo 'exito';