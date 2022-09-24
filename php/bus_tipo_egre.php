<?php
require '../conexion.php';
$sql ="select * from tipo_egreso";
$resultado = $connection->prepare($sql);
$resultado->execute();
$json=array();
while($r=$resultado->fetch(PDO::FETCH_ASSOC)){
    $json[]=array(
        't_egreso'=>$r['t_egreso'],
        'nombre'=>$r['nombre']
    );
}
echo json_encode($json);
