<?php 
session_start();
require 'conexion.php';
$dni=filter_input(INPUT_POST, 'dni');;
$password=md5(filter_input(INPUT_POST, 'password'));
$sql ="select * from administrador where dni_admin='".$dni."' and contraseña='".$password."'";
$resultado = $connection->prepare($sql);
$resultado->execute();
if($row=$resultado->fetch(PDO::FETCH_ASSOC)>0){ 
	$_SESSION['dni_admin']=$dni;
    echo 'yes';
}else{
	echo 'no';
}

if(isset($action))
{
unset($_SESSION["dni_admin"]);
}