<?php 
session_start();
require 'conexion.php';
$ip=filter_input(INPUT_POST, 'ip');
$dni=filter_input(INPUT_POST, 'dni');
$password=md5(filter_input(INPUT_POST, 'password'));




$sql2 ="select * from seguridad where ip='".$ip."' and fecha >= SYSDATE() ";
$resultado2 = $connection->prepare($sql2);
$resultado2->execute();

if($row2=$resultado2->fetch(PDO::FETCH_ASSOC)>0){
	echo 'bloqueado';



}else{

	$sql ="select * from administrador where dni_admin='".$dni."' and contraseña='".$password."' ";
	$resultado = $connection->prepare($sql);
	$resultado->execute();

	if($row=$resultado->fetch(PDO::FETCH_ASSOC)>0){ 
		$_SESSION['dni_admin']=$dni;
		echo 'yes';
	}else {
		echo 'no';
	}


	if(isset($action))
	{
	unset($_SESSION["dni_admin"]);
	}

}