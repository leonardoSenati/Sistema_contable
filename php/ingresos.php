<?php
/**
 * Esta funcion incluye al archivo externo conexion.php
 */
require '../conexion.php';
/**
 * sql - consulta sql con procedimiento almacenado.
 * resultado - recibe los resultados de la consulta sql y posteriormente lo ejecuta.
 * json - arreglo - para capturar la matriz de datos que devuelve la funcion fetch.
 *  json_encode - convierte el array de datos en formato JSON.
 */
$sql ="select i.id_ingreso,i.id_caja,p.n_proyecto,i.fecha,i.monto_ingreso,c.fecha as fecha_caja from ingreso as i inner join caja as c on c.id_caja=i.id_caja
inner join proyecto as p on p.id_proyecto=c.id_proyecto limit 0,10";
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
