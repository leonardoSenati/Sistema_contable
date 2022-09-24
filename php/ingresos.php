<?php
require '../conexion.php';
$sql ="select i.id_ingreso,i.id_caja,p.n_proyecto,i.fecha,i.monto_ingreso,c.fecha as fecha_caja from ingreso as i inner join caja as c on c.id_caja=i.id_caja
inner join proyecto as p on p.id_proyecto=c.id_proyecto limit 1,10";
$resultado = $connection->prepare($sql);
$resultado->execute();
$json=array();
while($r=$resultado->fetch(PDO::FETCH_ASSOC)){
    $json[]=array(
        'id_ingreso'=>$r['id_ingreso'],
        'id_caja'=>$r['id_caja'],
        'n_proyecto'=>$r['n_proyecto'],
        'fecha'=>$r['fecha'],
        'fecha_caja'=>$r['fecha_caja'],
        'monto_ingreso'=>$r['monto_ingreso']
        
    );
}
echo json_encode($json);
