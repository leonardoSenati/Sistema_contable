<?php
require '../conexion.php';
$id= filter_input(INPUT_POST, 'id');
$sql="select * from cliente as c inner join rubro as r on r.id_rubro=c.id_rubro where ruc_cliente='".$id."'";
$resultado=$connection->prepare($sql);
$resultado->execute();
$json=array();
while($row=$resultado->fetch(PDO::FETCH_ASSOC)){
  $json[]=array(
    'ruc'=>$row['ruc_cliente'],
    'clie'=>$row['nombre_clie'],
    'ape'=>$row['apellido'],
    'cor'=>$row['correo'],
    'tel'=>$row['telefono'],
    'rub'=>$row['id_rubro']
  );
}

echo json_encode($json[0]);