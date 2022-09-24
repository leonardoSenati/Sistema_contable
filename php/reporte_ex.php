<?php

require '../vendor/autoload.php';
require("../conexion.php");

use PhpOffice\PhpSpreadsheet\SpreadSheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

$spreadsheet = new SpreadSheet();

//$spreadsheet->getProperties()->setCreator("GRUPO 6")->setTitle("Sistema Contable");

$spreadsheet->setActiveSheetIndex(0);
$sheet = $spreadsheet->getActiveSheet();
$spreadsheet->getActiveSheet()->getStyle('A1:F1')->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)->getStartColor()->setARGB('1967CA');
$spreadsheet->getActiveSheet()->getStyle('A1:F1')
->getFont()->getColor()->setARGB("FFFFFF");
$spreadsheet->getDefaultStyle()->getFont()->setName('Arial');
$spreadsheet->getDefaultStyle()->getFont()->setSize(14);
$sheet->setCellValue('A1', "Nº Boleta");
$sheet->setCellValue('B1', 'Proyecto');
$sheet->setCellValue('C1', 'Fecha');
$sheet->setCellValue('D1', 'Fecha de caja');
$sheet->setCellValue('E1', 'Descripcion');
$sheet->setCellValue('F1', 'Monto');
$id=$_GET['id'];
$sql ="select i.id_ingreso,i.id_caja,p.n_proyecto,i.fecha,e.monto,c.fecha as fecha_caja, e.descripcion from ingreso as i 
inner join caja as c on c.id_caja=i.id_caja
inner join proyecto as p on p.id_proyecto=c.id_proyecto 
inner join egreso as e on p.id_proyecto=e.id_proyecto
where p.n_proyecto='".$id."'";
$query=$connection->query($sql);
$number = 1;
foreach($query->fetchAll(PDO::FETCH_ASSOC) as $row){
    $number++;
    $sheet->setCellValue("A$number",$row["id_caja"]);
    $sheet->setCellValue("B$number",$row["n_proyecto"]);
    $sheet->setCellValue("C$number",$row["fecha"]);
    $sheet->setCellValue("D$number",$row["fecha_caja"]);
    $sheet->setCellValue("E$number",$row["descripcion"]);
    $sheet->setCellValue("F$number",$row["monto"]);
}


$query1 = $connection->query("select c.total_monto as totald,r.igv as igb,sum(eg.monto) *r.igv as resultadoigv,sum(eg.monto) as totalegresos from proyecto as p
inner join caja as c on c.id_proyecto=p.id_proyecto
inner join cliente as cl on cl.ruc_cliente = p.ruc_cliente
inner join rubro as r on r.id_rubro = cl.id_rubro
inner join egreso as eg on eg.id_proyecto=p.id_proyecto
where p.n_proyecto='" . $id . "'");

foreach($query1->fetchAll(PDO::FETCH_ASSOC) as $row){
    $number++;
    $spreadsheet->getActiveSheet()->getStyle("E$number")->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)->getStartColor()->setARGB('1967CA');
    $spreadsheet->getActiveSheet()->getStyle("E$number")->getFont()->getColor()->setARGB("FFFFFF");

    $sheet->setCellValue("E$number","Subtotal");
    $sheet->setCellValue("F$number",$row["totalegresos"]);
    $spreadsheet->getActiveSheet()->getStyle("E".$number+1)->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)->getStartColor()->setARGB('1967CA');
    $spreadsheet->getActiveSheet()->getStyle("E".$number+1)->getFont()->getColor()->setARGB("FFFFFF");
    $sheet->setCellValue("E".$number+1,"Igv ".$row["igb"]*100 ." %");
    $sheet->setCellValue("F".$number+1,$row["resultadoigv"]);
    $spreadsheet->getActiveSheet()->getStyle("E".$number+2)->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)->getStartColor()->setARGB('1967CA');
    $spreadsheet->getActiveSheet()->getStyle("E".$number+2)->getFont()->getColor()->setARGB("FFFFFF");
    $sheet->setCellValue("E".$number+2,"Total");
    $sheet->setCellValue("F".$number+2,$row["totald"]);
}

header('Content-Type: application/vnd.ms-excel');
header('Content-Disposition: attachment;filename="myfile.xls"');
header('Cache-Control: max-age=0');

$writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xls');
$writer->save('php://output');

?>