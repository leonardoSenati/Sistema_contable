<?php

//En este archivo se le llamará primero a la conexión a la base de Datos luego se capturará los Datos enviados a través del ajax 
// por el input post
// será una consulta en la cual tendrá que restarse la inversión con el monto total a lo cual nos va a dar un resultado 
// y mostrar el aquí caja pertenece id con una condición que el id  del proyecto se iguala a id que se le haga enviado
// Sí implementará el white para mostrar los Datos que se hicieron en la consulta a través de un array en este caso 
// se mostrará lo que es el id de la caja y el resultado y se enviará al ajax en formato jason
/**
 * Esta funcion incluye al archivo externo conexion.php
*/
require '../conexion.php';

/**
 * id_proyecto - numero - Almacena variable externa id_p que obtenemos con la funcion filter_input.
 * monto - numero - Almacena varible externa monto que obtenemos con la funcion filter_input.
 * rucs - numero - Almacena varible externa ruc que obtenemos con la funcion filter_input.
 * fecha - date - Almacena varible externa y le da el formato d-m-Y que obtenemos con la funcion filter_input.
 * obtner_id - numero  - consulta sql aplicando procedimiento almacenado
 * $sentencia1 - recibe el resultado de la consulta sql y posteriormente lo ejecuta.
 */
 
$id_proyecto= filter_input(INPUT_POST, 'id_p');
$monto= filter_input(INPUT_POST, 'monto');
$rucs= filter_input(INPUT_POST, 'ruc');
$fecha=date('d-m-Y');

$obtner_id="SELECT p.inversion-c.total_monto as resultado,c.id_caja FROM caja as c inner join proyecto as p on p.id_proyecto=c.id_proyecto WHERE p.id_proyecto='".$id_proyecto."'";
$sentencia1=$connection->prepare($obtner_id);
$sentencia1->execute();
$json=array();
while($r=$sentencia1->fetch(PDO::FETCH_ASSOC)){
    $json[]=array(
        'id_caja'=>$r['id_caja'],
        'resultado'=>$r['resultado']
    );
}
echo json_encode($json);
