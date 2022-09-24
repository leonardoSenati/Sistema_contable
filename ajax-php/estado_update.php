<?php
require '../conexion.php';
$ruc_cliente= filter_input(INPUT_POST, 'id');
$sql="update proyecto set estado ='2' where id_proyecto=:id";
$sentencia=$connection->prepare($sql);
$sentencia->bindParam(':id',$ruc_cliente);
if(!$sentencia){// si hay error
  return 'Error al crear registro';
}else{$sentencia->execute();}
