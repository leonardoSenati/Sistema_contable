<?php

/*
    Importa la libreria SpreadSheet que está en la carpeta  vendor
*/
require '../vendor/autoload.php';

#Hace importación de la conexion para la base de datos
require("../conexion.php");

#Importar SpreadSheet y Xlsx de la libreria SpreadSheet
use PhpOffice\PhpSpreadsheet\SpreadSheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

#Crear una instancia de la clase SpreadSheet
$spreadsheet = new SpreadSheet();

//$spreadsheet->getProperties()->setCreator("GRUPO 6")->setTitle("Sistema Contable");

#Poner Indice para poder iniciar
$spreadsheet->setActiveSheetIndex(0);
#Recupera la hoja que está activa
$sheet = $spreadsheet->getActiveSheet();
#Pinta desde la casila A1 hasta la E1
$spreadsheet->getActiveSheet()->getStyle('A1:E1')->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)->getStartColor()->setARGB('1967CA');
$spreadsheet->getActiveSheet()->getStyle('A1:E1')
->getFont()->getColor()->setARGB("FFFFFF");

#Set el tipo de fuente
$spreadsheet->getDefaultStyle()->getFont()->setName('Arial');
#Set el tamaño de la fuente
$spreadsheet->getDefaultStyle()->getFont()->setSize(14);



/** 
*Insertar columnas
*Param string Posición, String valor
*/
$sheet->setCellValue('A1', "Nº Boleta");
$sheet->setCellValue('B1', 'Proyecto');
$sheet->setCellValue('C1', 'Fecha');
$sheet->setCellValue('D1', 'Fecha de caja');
$sheet->setCellValue('E1', 'Ingreso');

//Recoge los valores de la petición get con el minimo y máximo de fechas
$fech_min=$_GET['fmin'];
$fech_max=$_GET['fmax'];

#Sentencia sql que muestra los datos con el minimo y maximo de fecha
$sql ="select i.id_ingreso,i.id_caja,p.n_proyecto,i.fecha,i.monto_ingreso,c.fecha as fecha_caja from ingreso as i inner join caja as c on c.id_caja=i.id_caja
inner join proyecto as p on p.id_proyecto=c.id_proyecto
where i.fecha>='".$fech_min."' and i.fecha<='".$fech_max."'";

#ejecuta la consulta
$query=$connection->query($sql);

/*Variable que se irá aumentando según las veces que se repita el bucle, dando a 
 conocer la casilla que estará en cada vuelta
*/
$number = 1;

#Bucle que se ejecutará según cuantos datos devuelve la query
#La variable number irá aumentando para posicionar en qué columna estará en cada vuelta
foreach($query->fetchAll(PDO::FETCH_ASSOC) as $row){
    $number++;
    
    $sheet->setCellValue("A$number",$row["id_caja"]);
    $sheet->setCellValue("B$number",$row["n_proyecto"]);
    $sheet->setCellValue("C$number",$row["fecha"]);
    $sheet->setCellValue("D$number",$row["fecha_caja"]);
    $sheet->setCellValue("E$number",$row["monto_ingreso"]);
}

#Dará formato para que sea excel
header('Content-Type: application/vnd.ms-excel');
header('Content-Disposition: attachment;filename="myfile.xls"');
header('Cache-Control: max-age=0');
#Guardará todos los datos para poder mostrarse
$writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xls');
$writer->save('php://output');

?>