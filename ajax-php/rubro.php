<?php
require '../conexion.php';
$sql ="select * from rubro";
$resultado = $connection->prepare($sql);
$resultado->execute();
$json=array();
while($r=$resultado->fetch(PDO::FETCH_ASSOC)){
    $json[]=array(
        'id_rubro'=>$r['id_rubro'],
        'tipo_empresa'=>$r['tipo_empresa']
    );
}
echo json_encode($json);
