
<?php
/**
 * Esta funcion incluye al archivo externo conexion.php
 */
require ("../conexion2.php");
/**
 * egresos - array de datos - almacena los datos que trae la var json a traves del metodo POST.
 * id_proyecto - numero - almacena del array $egreso el dato que hay elemento id_proyecto.
 * descripcion - cadena de texto - almacena del array $egreso el dato que hay el elemento nombre.
 * fecha - date - almacena del array $egreso el dato que hay el elemento fecha.
 * t_egreso - cadena de texto  - almacena del array $egreso el dato que hay el elemento egreso.
 * monto - numero - - almacena del array $egreso el dato que hay el elemento monto.
 * guardar - instruccion sql para insertar los datos alamcenado en las variables en la tabla egreso.
 * resulta -  recibe el resultados de la instruccion sql y posteriormente lo ejecuta.
 */
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