<?php
require ("../conexion2.php");
$egresos=json_decode($_POST['json'],true);
if($egresos !="[]"){
    echo "yes";
foreach ($egresos as $egreso){
    
    $id_proyecto=$egreso['id_proyecto'];
    $descripcion=$egreso['nombre'];
    $fecha=$egreso['fecha'];
    $t_egreso=$egreso['egreso'];
    $monto=$egreso['monto'];
    $guardar="INSERT INTO egreso (id_proyecto, descripcion, fecha, t_egreso, monto)VALUES ('$id_proyecto','$descripcion','$fecha','$t_egreso','$monto')";
    $resulta=mysqli_query($conection,$guardar);  
    
}
}else{
    echo "no";
}

?>