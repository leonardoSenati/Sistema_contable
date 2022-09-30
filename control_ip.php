<?php
require 'conexion.php';
$ip_s=filter_input(INPUT_POST, 'ip');
$fecha_hora=filter_input(INPUT_POST, 'fecha_h');

// consulta en sql
$sql3 ="select * from seguridad where ip='".$ip_s."' and contador >='2'";
$resultado3 = $connection->prepare($sql3);
$resultado3->execute();
//
if($row3=$resultado3->fetch(PDO::FETCH_ASSOC)>0){
    //consulta de bloquedo y aumento de tiempo mas 1 min
    $sql4 ="UPDATE seguridad SET `fecha`=date_add(fecha,INTERVAL 2 minute),contador='0',r_h=r_h+1 WHERE ip='$ip_s'";
    $resultado4 = $connection->prepare($sql4);
    $resultado4->execute();
    
}else{
    //
    $sql ="select * from seguridad where ip='$ip_s'";
    $resultado2 = $connection->prepare($sql);
    $resultado2->execute();


    if($row2=$resultado2->fetch(PDO::FETCH_ASSOC)>0){ 
        echo 'se actualizo';
        //
        $sql =" UPDATE seguridad SET `fecha`='$fecha_hora',contador=contador+1 WHERE ip='$ip_s'";
        $resultado2 = $connection->prepare($sql);
        $resultado2->execute();

    }else{
        echo 'se inserto';
        //
        $sql2="INSERT INTO seguridad(`ip`, `fecha`, `contador`,`r_h`) VALUES ('$ip_s','$fecha_hora','1','0')";
        $resultado = $connection->prepare($sql2);
        $resultado->execute();
    }
}
?>