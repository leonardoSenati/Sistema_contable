<?php
require '../conexion.php';
$ruc_cliente= filter_input(INPUT_POST, 'id');
$sql="update cliente set status='0' where ruc_cliente=:id";
$sentencia=$connection->prepare($sql);
$sentencia->bindParam(':id',$ruc_cliente);
if(!$sentencia){// si hay error
  return 'Error al crear registro';
}else{$sentencia->execute();}
