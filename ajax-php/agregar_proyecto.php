<?php
//Esta funcion incluye al archivo externo conexion.php
require '../conexion.php';
/**
 * ruc_cliente - numero - Almacena varible externa ruc_cliente que obtenemos con la funcion filter_input.
 * nombre_pro -  cadena de texto - Almacena varible externa n_proyect que obtenemos con la funcion filter_input.
 * inversion - numero - Almacena varible externa inver que obtenemos con la funcion filter_input.
 * verificar - instruccion sql para consultar si existe el nombre_pro  del proyecto.
 * sql -  instruccion sql para insertar proyecto.
 * sentenciaV recibe el resultado de la consulta sql y posteriormente lo ejecuta.
 */
$ruc_cliente= filter_input(INPUT_POST, 'ruc_cliente');
$nombre_pro= filter_input(INPUT_POST, 'n_proyect');
$inversion= filter_input(INPUT_POST, 'inver');
$verificar="select * from proyecto as p
inner join cliente as c on c.ruc_cliente = p.ruc_cliente
where p.n_proyecto='".$nombre_pro."' and c.status=1";

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
