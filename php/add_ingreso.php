<?php
require '../conexion.php';
$id_proyecto= filter_input(INPUT_POST, 'id_p');
$monto= filter_input(INPUT_POST, 'monto');
$rucs= filter_input(INPUT_POST, 'ruc');
$fecha=date('d-m-Y');
$obtner_id="SELECT p.inversion-c.total_monto as resultado,c.id_caja FROM caja as c inner join proyecto as p on p.id_proyecto=c.id_proyecto WHERE p.id_proyecto='".$id_proyecto."'";
$sentencia1=$connection->prepare($obtner_id);
$sentencia1->execute();
$json=array();
while($r=$sentencia1->fetch(PDO::FETCH_ASSOC)){
    $json[]=array(
        'id_caja'=>$r['id_caja'],
        'resultado'=>$r['resultado']
    );
}
echo json_encode($json);
