<?php
require '../conexion.php';
$id_proyecto= filter_input(INPUT_POST, 'id_p');
$fecha= filter_input(INPUT_POST, 'fech');
$total_monto= filter_input(INPUT_POST, 'monto');
$rucs= filter_input(INPUT_POST, 'ruc');

$verificar="select * from caja where id_proyecto ='".$id_proyecto."'";
$sql="insert into caja(id_proyecto,fecha,total_monto) values(:id_p,:fech,:monto)";
$sentenciaV=$connection->prepare($verificar);
$sentenciaV->execute();

if($row=$sentenciaV->fetch(PDO::FETCH_ASSOC)>0){ 
    echo 'no';
}else{
    echo 'yes';

    $sentencia=$connection->prepare($sql);
    $sentencia->bindParam(':id_p',$id_proyecto);
    $sentencia->bindParam(':fech',$fecha);
    $sentencia->bindParam(':monto',$total_monto);
    $update_estado="update proyecto set estado=0 where id_proyecto='".$id_proyecto."'";
    $sentencia2=$connection->prepare($update_estado);
    $sentencia2->execute();

    if(!$sentencia){
        return 'Error al crear registro';}
    else{
        $sentencia->execute();
    }

}



?>