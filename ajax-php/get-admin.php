<?php
require '../conexion.php';
$id= filter_input(INPUT_POST, 'id');
$sql="select * from administrador where dni_admin='".$id."'";
$resultado=$connection->prepare($sql);
$resultado->execute();
$json=array();
while($row=$resultado->fetch(PDO::FETCH_ASSOC)){
  $json[]=array(
    'dni'=>$row['dni_admin'],
    'nom'=>$row['nombre'],
    'ape'=>$row['apellido'],
    'email'=>$row['correo']
  );
}

echo json_encode($json[0]);