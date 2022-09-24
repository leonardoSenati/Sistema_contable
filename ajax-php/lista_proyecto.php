<?php
require '../conexion.php';
$ruc_cliente=filter_input(INPUT_POST, 'ruc_cliente');
$sql ="select id_proyecto, ruc_cliente, n_proyecto, inversion, estado,   
case when estado=0 then 'Finalizado'  when estado=1 then 'proceso'
else 'eliminado'  
end as estad from proyecto where ruc_cliente='".$ruc_cliente."' and estado != 2 ";
$resultado = $connection->prepare($sql);
$resultado->execute();
$json=array();
while($r=$resultado->fetch(PDO::FETCH_ASSOC)){
    $json[]=array(
        'id_proyecto'=>$r['id_proyecto'],
        'ruc_cliente'=>$r['ruc_cliente'],
        'n_proyecto'=>$r['n_proyecto'],
        'inversion'=>$r['inversion'],
        'estad'=>$r['estad']
    );
}
echo json_encode($json);
