<?php
require '../conexion.php';
$dni_admin= filter_input(INPUT_POST, 'id');
$sql="update administrador set status='0' where dni_admin=:id";
$sentencia=$connection->prepare($sql);
$sentencia->bindParam(':id',$dni_admin);
if(!$sentencia){// si hay error
  return 'Error al crear registro';
}else{$sentencia->execute();}
