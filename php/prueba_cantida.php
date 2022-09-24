<?php
require '../conexion.php';
$sql ="select count(*) as cantidad from ingreso";
$resultado = $connection->prepare($sql);
$resultado->execute();
$json=array();
while($r=$resultado->fetch(PDO::FETCH_ASSOC)){
    $json[]=array(
        'cantidad'=>$r['cantidad']
    );
}
echo json_encode($json);