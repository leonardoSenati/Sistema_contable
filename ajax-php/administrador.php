<?php
require '../conexion.php';
$sql ="select * from administrador where status='1'";
$resultado = $connection->prepare($sql);
$resultado->execute();
$json=array();
while($r=$resultado->fetch(PDO::FETCH_ASSOC)){
    $json[]=array(
        'dni_admin'=>$r['dni_admin'],
        'nombre'=>$r['nombre'],
        'apellido'=>$r['apellido'],
        'correo'=>$r['correo']
    );
}
echo json_encode($json);
