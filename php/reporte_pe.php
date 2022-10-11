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
    $this->cell(30,10,"Proyecto",1,0,"C",True);

    $this->setFillColor(26, 93, 168);
    $this->cell(30,10,"Fecha",1,0,"C",True);

    $this->setFillColor(26, 93, 168);
    $this->cell(30,10,"Fecha de caja",1,0,"C",1);

    $this->setFillColor(26, 93, 168);
    $this->cell(30,10,"Descripcion",1,0,"C",1);

    $this->setFillColor(26, 93, 168);
    $this->cell(30,10,"Monto",1,0,"C",1);
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
#set un times de tamaño 12
$pdf->SetFont('Times','',12);


#Guardar dato id
$id=$_GET['id'];

#Ejecutar sentencia query con el parametro id
$query = $connection->query("select i.id_ingreso,i.id_caja,p.n_proyecto,i.fecha,e.monto,c.fecha as fecha_caja, e.descripcion from ingreso as i 
inner join caja as c on c.id_caja=i.id_caja
inner join proyecto as p on p.id_proyecto=c.id_proyecto 
inner join egreso as e on p.id_proyecto=e.id_proyecto
where p.n_proyecto='".$id."'" );
foreach($query->fetchAll(PDO::FETCH_ASSOC) as $row){
    $pdf->setFillColor(233,229,235);
    $pdf->setdrawColor(61,61,61);
    $pdf->Cell(20,10,$row["id_caja"],"B",0,'C',1);
    $pdf->Cell(30,10,$row["n_proyecto"],"B",0,'C',0);
    $pdf->Cell(30,10,$row["fecha"],"B",0,'C',0);
    $pdf->Cell(30,10,$row["fecha_caja"],"B",0,'C',0);
    $pdf->Cell(30,10,$row["descripcion"],"B",0,'C',0);
    $pdf->Cell(30,10,"S/ ".$row["monto"],"B",0,'C',0);
    $pdf->Ln();
    
}

#sentencia SQL de el monto, el IGV y el Monto total
$query1 = $connection->query("select c.total_monto as totald,r.igv as igb,sum(eg.monto) *r.igv as resultadoigv,sum(eg.monto) as totalegresos from proyecto as p
inner join caja as c on c.id_proyecto=p.id_proyecto
inner join cliente as cl on cl.ruc_cliente = p.ruc_cliente
inner join rubro as r on r.id_rubro = cl.id_rubro
inner join egreso as eg on eg.id_proyecto=p.id_proyecto
where p.n_proyecto='" . $id . "'");

#Pintar Cada vuelta de bucle inserta cada valor en una casilla
foreach($query1->fetchAll(PDO::FETCH_ASSOC) as $row){
    $pdf->Cell(110);
    $pdf->setFillColor(26, 93, 168);
    $pdf->SetTextColor(255,255,255);
    $pdf->Cell(30,10,"Subtotal","B",0,'C',True);    
    $pdf->setFillColor(31, 238, 10 );
    $pdf->setFillColor(255,255,255);
    $pdf->SetTextColor(0,0,0);  
    $pdf->Cell(30,10,"S/ ".$row["totalegresos"],"B",0,'C',0);

    $pdf->Ln(10.2);
    $pdf->Cell(110);
    $pdf->setFillColor(26, 93, 168);
    $pdf->SetTextColor(255,255,255);
    $pdf->Cell(30,10,"Igv ".$row["igb"] * 100 ." %","B",0,'C',True);    
    $pdf->setFillColor(26, 93, 168);
    $pdf->setFillColor(255,255,255);
    $pdf->SetTextColor(0,0,0);  
    $pdf->Cell(30,10,"S/ ".$row["resultadoigv"],"B",0,'C',0);

    $pdf->Ln(10.1);
    $pdf->Cell(110);
    $pdf->setFillColor(26, 93, 168);
    $pdf->SetTextColor(255,255,255);
    $pdf->Cell(30,10,"Total","B",0,'C',True);     
    $pdf->setFillColor(26, 93, 168);
    $pdf->setFillColor(26, 93, 168);
    $pdf->SetTextColor(0,0,0);     
    $pdf->Cell(30,10,"S/ ".$row["totald"],"B",0,'C',0);     
    $pdf->Ln();
     }



#Guarda y ejecuta todo lo hecho.
$pdf->Output();

?>