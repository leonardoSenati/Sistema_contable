<?php

require '../vendor/autoload.php';
require("../conexion.php");

use PhpOffice\PhpSpreadsheet\SpreadSheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

$spreadsheet = new SpreadSheet();

//$spreadsheet->getProperties()->setCreator("GRUPO 6")->setTitle("Sistema Contable");

$spreadsheet->setActiveSheetIndex(0);
$sheet = $spreadsheet->getActiveSheet();
$spreadsheet->getActiveSheet()->getStyle('A1:E1')->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)->getStartColor()->setARGB('1967CA');
$spreadsheet->getActiveSheet()->getStyle('A1:E1')
->getFont()->getColor()->setARGB("FFFFFF");
$spreadsheet->getDefaultStyle()->getFont()->setName('Arial');
$spreadsheet->getDefaultStyle()->getFont()->setSize(14);
$sheet->setCellValue('A1', "Nº Boleta");
$sheet->setCellValue('B1', 'Proyecto');
$sheet->setCellValue('C1', 'Fecha');
$sheet->setCellValue('D1', 'Fecha de caja');
$sheet->setCellValue('E1', 'Ingreso');

$fech_min=$_GET['fmin'];
$fech_max=$_GET['fmax'];
$sql ="select i.id_ingreso,i.id_caja,p.n_proyecto,i.fecha,i.monto_ingreso,c.fecha as fecha_caja from ingreso as i inner join caja as c on c.id_caja=i.id_caja
inner join proyecto as p on p.id_proyecto=c.id_proyecto
where i.fecha>='".$fech_min."' and i.fecha<='".$fech_max."'";
$query=$connection->query($sql);
$number = 1;
foreach($query->fetchAll(PDO::FETCH_ASSOC) as $row){
    $number++;
    $sheet->setCellValue("A$number",$row["id_caja"]);
    $sheet->setCellValue("B$number",$row["n_proyecto"]);
    $sheet->setCellValue("C$number",$row["fecha"]);
    $sheet->setCellValue("D$number",$row["fecha_caja"]);
    $sheet->setCellValue("E$number",$row["monto_ingreso"]);
}


header('Content-Type: application/vnd.ms-excel');
header('Content-Disposition: attachment;filename="myfile.xls"');
header('Cache-Control: max-age=0');

$writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xls');
$writer->save('php://output');

?>