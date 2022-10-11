<?php

#Carga de la libreria y base de datos
require '../vendor/autoload.php';
require("../conexion.php");

#Importar SpreadSheet y Xlsx
use PhpOffice\PhpSpreadsheet\SpreadSheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

#Crear instancia de la clase
$spreadsheet = new SpreadSheet();

//$spreadsheet->getProperties()->setCreator("GRUPO 6")->setTitle("Sistema Contable");

#Activar la hoja
$spreadsheet->setActiveSheetIndex(0);
$sheet = $spreadsheet->getActiveSheet();

//Pintar la casilla desde A1 a F1
$spreadsheet->getActiveSheet()->getStyle('A1:F1')->getFill()->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)->getStartColor()->setARGB('1967CA');
$spreadsheet->getActiveSheet()->getStyle('A1:F1')
->getFont()->getColor()->setARGB("FFFFFF");

//Font Arial y tamaño 14
$spreadsheet->getDefaultStyle()->getFont()->setName('Arial');
$spreadsheet->getDefaultStyle()->getFont()->setSize(14);

//Poner cabecera del reporte
$sheet->setCellValue('A1', "Nº Boleta");
$sheet->setCellValue('B1', 'Proyecto');
$sheet->setCellValue('C1', 'Fecha');
$sheet->setCellValue('D1', 'Fecha de caja');
$sheet->setCellValue('E1', 'Descripcion');
$sheet->setCellValue('F1', 'Monto');

//Obtiene los datos que se pasan por el GET
$id=$_GET['id'];

#Sentencia sql que muestra los datos
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

#Segunda query que muestra el total, justo al igb y la suma.
$query1 = $connection->query("select c.total_monto as totald,r.igv as igb,sum(eg.monto) *r.igv as resultadoigv,sum(eg.monto) as totalegresos from proyecto as p
inner join caja as c on c.id_proyecto=p.id_proyecto
inner join cliente as cl on cl.ruc_cliente = p.ruc_cliente
inner join rubro as r on r.id_rubro = cl.id_rubro
inner join egreso as eg on eg.id_proyecto=p.id_proyecto
where p.n_proyecto='" . $id . "'");

#Bucle que pondrá los datos de la tabla en cada columna junto al color y tipo de letra;
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
#Guarda el archivo en formato excel y lo llamada myfile.xls
header('Content-Type: application/vnd.ms-excel');
header('Content-Disposition: attachment;filename="myfile.xls"');
header('Cache-Control: max-age=0');

#Mostrar los datos
$writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xls');
$writer->save('php://output');

?>