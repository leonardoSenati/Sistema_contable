<?php
require '../conexion.php';
$id_proyecto=filter_input(INPUT_POST, 'id_proyecto');
$sql ="SELECT SUM(monto) as total FROM egreso WHERE id_proyecto ='".$id_proyecto."'";
$resultado = $connection->prepare($sql);
$resultado->execute();
$json=array();
while($r=$resultado->fetch(PDO::FETCH_ASSOC)){
    $json[]=array(
        'total'=>$r['total']
    );
}
echo json_encode($json);
