$(document).on('click','#ing',function(){
    recuperar_ingreso()
    document.getElementById("panel").innerText="Panel ingreso";
});
function recuperar_ingreso(){
    $.ajax({
        url:'../php/ingresos.php',
        type:'GET',
        success:function(data){
            var lista_actividad=JSON.parse(data);
            var cabecera=`
            <div class="main">
            <div class="cards">
            <div class="tabla-responsive" id="no-more-tables">
            <div class="row g-3">
            <div class="col-md-2">
            <label for="inputAddress" class="form-label">fecha Inicio</label>
            <input type="date" class="form-control" id="fechmin" placeholder="1234 Main St" max="2028-12-31">
            </div>
            <div class="col-md-2">
                <label for="inputAddress" class="form-label">fecha Fin</label>
                <input type="date" class="form-control" id="fechmax" placeholder="1234 Main St" max="2028-12-31">
            </div>
            <div class="col-md-2">
                <label for="inputAddress" class="form-label"><br></label>
                <a class='generar-pdf form-control btn btn-danger'>Generar PDF</a>
            </div>
            <div class="col-md-2">
                <label for="inputAddress" class="form-label"><br></label>
                <a class='generar-excel form-control btn btn-success'>Generar EXCEL</a>
            </div>
            </div>
            
            <table class="table table-striped">
            <thead>
                    <tr>
                    <th scope="col">N° Boleta</th>
                    <th scope="col">Proyecto</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Fecha de caja</th>
                    <th scope="col">Ingreso</th>
                    <th scope="col">Reporte</th>
                    </tr>
                </thead>
                <tbody id="completa_prueba">`;
            var fin=`
                </tbody>
            </table>
            </div>
            </div>
            <div id="n">
            </div>
            <div id="paginacion">
            </div>`;
            var registros='';
            lista_actividad.forEach(fila=>{
                registros +=`
                <tr ID="${fila.id_ingreso}">
                    <td data-title="N° Boleta">${fila.id_caja}</td>
                    <td data-title="Proyecto">${fila.n_proyecto}</td>
                    <td data-title="fecha">${fila.fecha}</td>
                    <td data-title="Fecha Caja">${fila.fecha_caja}</td>
                    <td data-title="Ingreso">S/. ${fila.monto_ingreso}</td>
                    <td data-title="Reporte">
                    <a class="btn" target="_blank" href='../php/reporte_pe.php?id=${fila.n_proyecto}'><img src="../imagenes/ms-pdf.png"></a>
                    <a class="btn"  target="_blank" href='../php/reporte_ex.php?id=${fila.n_proyecto}'><img src="../imagenes/ms-excel.png"></a>
                    </td>
                </tr>
                `;              
            });
            $('#cabecera').html(cabecera+registros+fin);
            fecha_actual("fechmin");
            fecha_post("fechmax");
            /*---------------------------Pruebas para paginacion--------------------------------*/
            /*---------------------------------linea 51,52--------------------------------------*/
            cantitad_registros();
            /*---------------------------Pruebas para paginacion--------------------------------*/
        } 
    });
}
/*---------------------------Pruebas para paginacion--------------------------------*/
/*---------------------------Pruebas para paginacion--------------------------------*/
/*---------------------------Pruebas para paginacion--------------------------------*/
function cantitad_registros(){
    $.ajax({
        url:'../php/prueba_cantida.php',
        type:'GET',
        success:function(data){
            var lista_actividad=JSON.parse(data);
            var registro='';
            lista_actividad.forEach(fila=>{
                registro=`<input type="hidden" value="${fila.cantidad}" id="registro">`;
            });
            $('#n').html(registro);
            var cant=document.getElementById("registro").value;
            paginacion(cant,1);
        }
    });
}

function paginacion(cant,pag){
    var n=parseInt(cant/10);
    var decimal=parseFloat(cant/10);
    var n_button='';
    var seleccion='';
    var btn_ini=`
    <center>
    <table>
    <tr><td>
    <nav aria-label="...">
        <ul class="pagination">`;
    var btn_fin=`</ul>
    </nav>
    </td>
    </tr>
    </center>
    `;
    if(decimal>1)
    {
        console.log(decimal);
        if(n<decimal){
            n=n+1;
        }
        for (var i = 1; i <= n; i++) {
            if(pag==i){
                n_button += `<li class="page-item active">
                                <a role="button" class="page-link" id="${i}">${i}<span class="sr-only">(current)</span></a>
                            </li>`;
                seleccion=i;
            }else{
                n_button += `<li class="page-item"><a role="button" class="page-link" id="${i}">${i}</a></li>`;
            }
        }
        if(n==2){

        }else{
            if(seleccion !=1){

            btn_ini=`
            <center>
            <table>
                <tr><td>
            <nav aria-label="...">
                <ul class="pagination">
                    <li class="page-item">
                        <a role="button" class="page-link"  id="${seleccion-1}">Previous</a>
                    </li>`;
                }
            if(seleccion !==n){
            btn_fin=`<li class="page-item">
                        <a role="button" class="page-link" id="${seleccion+1}">Next</a>
                    </li>
                </ul>
            </nav>
            </td>
        </tr>
        </center>
            `;
            }
        }
    }
    $('#paginacion').html(btn_ini+n_button+btn_fin);
}

$(document).on('click','.page-link',function(){
    var pag =this.id;
    var cant=document.getElementById("registro").value;
    paginacion(cant,pag);
    var limite=(pag*10)-10;
    $.ajax({
        
        url:'../php/prueba_select.php' ,
        data:{limite},//envia la variable
        type: 'POST',
        success: function(data){
                var lista_actividad=JSON.parse(data);
                var registros='';
                lista_actividad.forEach(fila=>{
                    registros +=`
                    <tr ID="${fila.id_ingreso}">
                        <td data-title="N° Boleta">${fila.id_caja}</td>
                        <td data-title="Proyecto">${fila.n_proyecto}</td>
                        <td data-title="fecha">${fila.fecha}</td>
                        <td data-title="Fecha Caja">${fila.fecha_caja}</td>
                        <td data-title="Ingreso">S/. ${fila.monto_ingreso}</td>
                        <td data-title="Reporte">
                        <a class="btn" target="_blank" href='../php/reporte_pe.php?id=${fila.n_proyecto}'><img src="../imagenes/ms-pdf.png"></a>
                        <a class="btn"  target="_blank" href='../php/reporte_ex.php?id=${fila.n_proyecto}'><img src="../imagenes/ms-excel.png"></a>
                        </td>
                    </tr>
                    `;  
                           
                });
            $('#completa_prueba').html(registros);
        }
    });
});
/*---------------------------Pruebas para paginacion--------------------------------*/
/*---------------------------Pruebas para paginacion--------------------------------*/
/*---------------------------Pruebas para paginacion--------------------------------*/


$(document).on('click','.generar-pdf',function(){
    var fecha_min=document.getElementById("fechmin").value;
    var fecha_max=document.getElementById("fechmax").value;
    window.open("../php/ingresospdf.php?fmin="+fecha_min+"&&fmax="+fecha_max,'_blank');
});

$(document).on('click','.generar-excel',function(){
    var fecha_min=document.getElementById("fechmin").value;
    var fecha_max=document.getElementById("fechmax").value;
    window.open("../php/ingresosexcel.php?fmin="+fecha_min+"&&fmax="+fecha_max,'_blank');
});