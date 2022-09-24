<?php
require '../conexion.php';
$ruc_cliente= filter_input(INPUT_POST, 'ruc_cliente');
$nombre_pro= filter_input(INPUT_POST, 'n_proyect');
$inversion= filter_input(INPUT_POST, 'inver');
$verificar="select * from proyecto where n_proyecto='".$nombre_pro."'";
$sql="insert into proyecto(ruc_cliente,n_proyecto,inversion,estado) values(:ruc_cliente,:n_proyect,:inver,'1')";

$sentenciaV=$connection->prepare($verificar);
$sentenciaV->execute();

if($row=$sentenciaV->fetch(PDO::FETCH_ASSOC)>0){ 
    echo 'no';
}else{
    echo 'yes';
    $sentencia=$connection->prepare($sql);
    $sentencia->bindParam(':ruc_cliente',$ruc_cliente);
    $sentencia->bindParam(':n_proyect',$nombre_pro);
    $sentencia->bindParam(':inver',$inversion);
    if(!$sentencia){
        return 'Error al crear registro';}
    else{
        $sentencia->execute();
    }
}
