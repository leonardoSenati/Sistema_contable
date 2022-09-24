<?php
require '../conexion.php';
$sql ="select * from cliente";
$resultado = $connection->prepare($sql);
$resultado->execute();
$json=array();
while($r=$resultado->fetch(PDO::FETCH_ASSOC)){
    $json[]=array(
        'ruc_cliente'=>$r['ruc_cliente'],
        'nombre_clie'=>$r['nombre_clie'],
    );
}
echo json_encode($json);
