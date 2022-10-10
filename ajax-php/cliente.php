<?php
//Esta funcion incluye al archivo externo conexion.php
require '../conexion.php';
/**
 * sql - instruccion sql de tipo consulta con procedimiento almacenado.
 * resultado - obtiene el resultado de la consulta y lo ejecuta.
 * json - arreglo - para capturar la matriz de datos que devuelve la funcion fetch
 * json_encode - convierte el array de datos en formato JSON
 */
$sql ="select * from cliente as c inner join rubro as r on r.id_rubro=c.id_rubro where status='1'";
$resultado = $connection->prepare($sql);
$resultado->execute();
$json=array();
while($r=$resultado->fetch(PDO::FETCH_ASSOC)){
    $json[]=array(
        'ruc_cliente'=>$r['ruc_cliente'],
        'nombre_clie'=>$r['nombre_clie'],
        'apellido'=>$r['apellido'],
        'correo'=>$r['correo'],
        'telefono'=>$r['telefono'],
        'tipo_empresa'=>$r['tipo_empresa']
    );
}
echo json_encode($json);
