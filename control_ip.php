<?php
require 'conexion.php';
$ip_s=filter_input(INPUT_POST, 'ip');
$fecha_hora=filter_input(INPUT_POST, 'fecha_h');


$sql ="select * from seguridad where ip='$ip_s'";
$resultado2 = $connection->prepare($sql);
$resultado2->execute();


if($row=$resultado2->fetch(PDO::FETCH_ASSOC)>0){ 
    echo 'se actualizo';
    $sql =" UPDATE seguridad SET `fecha`='$fecha_hora',contador=contador+1 WHERE ip='$ip_s'";
    $resultado2 = $connection->prepare($sql);
    $resultado2->execute();

}else{
	echo 'se inserto';
    $sql2="INSERT INTO seguridad(`ip`, `fecha`, `contador`,`registro_boquedas`) VALUES ('$ip_s','$fecha_hora','1','0')";
    $resultado = $connection->prepare($sql2);
    $resultado->execute();
}

?>