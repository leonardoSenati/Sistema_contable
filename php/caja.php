<?php
/**
 * Esta funcion incluye al archivo externo conexion.php
 */
require '../conexion.php';
/**
 * id_proyecto - numero - Almacena varible externa id_proyecto que obtenemos con la funcion filter_input.
 * sql - consulta sql con procedimiento almacenado. 
 * resultado - recibe los resultados de la consulta sql y posteriormente lo ejecuta.
 * json - arreglo - para capturar la matriz de datos que devuelve la funcion fetch.
 * json_encode - convierte el array de datos en formato JSON.
 */
$id_proyecto=filter_input(INPUT_POST, 'id_proyecto');
$sql ="select * from egreso as e inner join tipo_egreso as t on t.t_egreso=e.t_egreso 
inner join proyecto as p on p.id_proyecto=e.id_proyecto
inner join cliente as c on c.ruc_cliente=p.ruc_cliente
inner join rubro as r on r.id_rubro=c.id_rubro
where e.id_proyecto='".$id_proyecto."'";
$resultado = $connection->prepare($sql);
$resultado->execute();
$json=array();
while($r=$resultado->fetch(PDO::FETCH_ASSOC)){
    $json[]=array(
        'id_egreso'=>$r['id_egreso'],
        'id_proyecto'=>$r['id_proyecto'],
        'n_proyecto'=>$r['n_proyecto'],
        'descripcion'=>$r['descripcion'],
        'fecha'=>$r['fecha'],
        'nombre'=>$r['nombre'],
        'monto'=>$r['monto'],
        'igv'=>$r['igv'],
    );
}
echo json_encode($json);

