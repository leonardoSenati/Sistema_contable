<?php

require("../pdf/fpdf.php");
require("../conexion.php");
class PDF extends FPDF
{
// Page header
function Header()
{
    
    // Logo
    $this->Image('../imagenes/img1.jpg',10,20,40);
    // Arial bold 15
    $this->SetFont('Arial','B',20);

    $this->SetTextColor(19, 105, 200 );
    $this->Text(10,15,"Sistema Contable");
    $this->SetFont('Arial','B',12);
    // Move to the right
    
    $this->Cell(80);
    // Title
    $this->setFillColor(26, 93, 168);
    $this->SetTextColor(255,255,255);
    $this->Cell(30,10,'Ingresos',"B",0,'C',True);
    // Line break
    $this->Ln(40);

    $this->setFillColor(26, 93, 168);
    $this->cell(20,10,"Boleta",1,0,"C",True);

    $this->setFillColor(26, 93, 168);
    $this->cell(45,10,"Proyecto",1,0,"C",True);

    $this->setFillColor(26, 93, 168);
    $this->cell(30,10,"Fecha",1,0,"C",True);

    $this->setFillColor(26, 93, 168);
    $this->cell(45,10,"Fecha de caja",1,0,"C",1);

    $this->setFillColor(26, 93, 168);
    $this->cell(45,10,"Ingreso",1,0,"C",1);
    $this->Ln();
}

// Page footer
function Footer()
{
    // Position at 1.5 cm from bottom
    $this->SetY(-15);
    // Arial italic 8
    $this->SetFont('Arial','I',8);
    // Page number
    $this->Cell(0,10,'Page '.$this->PageNo().'/{nb}',0,0,'C');
}
}

// Instanciation of inherited class
$pdf = new PDF();
$pdf->AliasNbPages();
$pdf->AddPage();
$pdf->SetFont('Times','',12);
$fech_min=$_GET['fmin'];
$fech_max=$_GET['fmax'];
$query = $connection->query("select i.id_ingreso,i.id_caja,p.n_proyecto,i.fecha,i.monto_ingreso,c.fecha as fecha_caja from ingreso as i inner join caja as c on c.id_caja=i.id_caja
inner join proyecto as p on p.id_proyecto=c.id_proyecto
where i.fecha>='".$fech_min."' and i.fecha<='".$fech_max."'");
foreach($query->fetchAll(PDO::FETCH_ASSOC) as $row){
    $pdf->setFillColor(233,229,235);
    $pdf->setdrawColor(61,61,61);
    $pdf->Cell(20,10,$row["id_caja"],"B",0,'C',1);
    $pdf->Cell(45,10,$row["n_proyecto"],"B",0,'C',0);
    $pdf->Cell(30,10,$row["fecha"],"B",0,'C',0);
    $pdf->Cell(45,10,$row["fecha_caja"],"B",0,'C',0);
    if($row["monto_ingreso"]>0){
        $pdf->SetTextColor(0,0,0);
        $pdf->Cell(45,10,$row["monto_ingreso"],"B",0,'C',0);
    }else {
        $pdf->SetTextColor(255,0,31);
        $pdf->Cell(45,10,$row["monto_ingreso"],"B",0,'C',0);
        $pdf->SetTextColor(0,0,0);
    }

    
    $pdf->Ln(11);
}



$pdf->Output();

?>