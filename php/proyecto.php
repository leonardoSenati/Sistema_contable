<?php
require '../conexion.php';
$ruc_cliente=filter_input(INPUT_POST, 'ruc_cliente');
$sql ="select * from proyecto where ruc_cliente='".$ruc_cliente."' and estado=1";
$resultado = $connection->prepare($sql);
$resultado->execute();
$json=array();
while($r=$resultado->fetch(PDO::FETCH_ASSOC)){
    $json[]=array(
        'id_proyecto'=>$r['id_proyecto'],
        'n_proyecto'=>$r['n_proyecto']
    );
}
echo json_encode($json);
