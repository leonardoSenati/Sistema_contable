
$(document).on('click','#caj',function(){
    recuperar_caja();
    document.getElementById("panel").innerText="Panel caja";
});

function recuperar_caja(){
    var cabecera=`
    <div class="main">
            <div class="cards">
            <form class="row g-3">
                <div class="col-md-3">
                <label for="exampleDataList" class="form-label">Cliente</label>
                <input class="form-control"  list="datalistOptions"  id="rucs" placeholder="Ingrese Cliente">
                <datalist id="datalistOptions">
                
                </datalist>
                </div>
                <div class="col-md-3">
                <label for="escuela" class="form-label">Proyecto</label>
                <select class="form-select" aria-label="Default select example" id="proyect">
                </select>
                </div>
                <div class="col-md-2">
                    <label for="inputAddress" class="form-label">Fecha</label>
                    <input type="date" class="form-control" id="fech" placeholder="1234 Main St" max="2028-12-31">
                </div>
                <div class="col-12">
                    <label for="inputAddress2" class="form-label">Egresos</label>
                    <div class="cont">
                    <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Proyecto</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Tipo Egreso</th>
                    <th scope="col">Monto</th>
                   
                    </tr>
                </thead>
                <tbody id="lista_gastos"> 
                 </tbody>
                </table>
                </div>
                </div>
                
                <div class="col-md-2">
                    <label for="inputCity" class="form-label">Total egresos</label>
                    <input type="text" class="form-control" id="total_egreso" readonly>
                </div>
                
                <div class="col-md-2">
                    <label for="inputZip" class="form-label">IGV</label>
                    <input type="text" class="form-control" id="igv" readonly>
                </div>
                <div class="col-md-2">
                    <label for="inputPassword4" class="form-label">Monto total</label>
                    <div class="input-group">
                    <div class="input-group-text">S/</div>
                    <input type="text" class="form-control" id="total" placeholder="Monto" readonly>
                    </div>
                </div>
                
                <div class="col-12">
                    <button type="button" class="btn btn-primary" id="guardar_caja">Generar boleta</button>
                </div>
            </form>
            </div>
     </div>
    `;
   
    $('#cabecera').html(cabecera);
    fecha_actual("fech");
    $.ajax({
        url:'../php/bus_cli.php',
        type:'GET',
        success:function(data){
            var lista_actividad=JSON.parse(data);
            var registro='';
            lista_actividad.forEach(fila=>{
                registro +=`
                <option value="${fila.ruc_cliente}">${fila.nombre_clie} </option>
                
                `;             
            });
            $('#datalistOptions').html(registro);
        }  
    }); 
}

$(document).on('keyup','#rucs',function(){
    var ruc=document.getElementById('rucs').value;
    $.ajax({
        url:'../php/bus_cli.php',
        type:'GET',
        success:function(data){
            var lista_actividad=JSON.parse(data);
            var registros='';
            lista_actividad.forEach(fila=>{
                registros +=`
                <option value="${fila.ruc_cliente}">${fila.nombre_clie}</option>
                `;
                       
            });
            $('#datalistOptions').html(registros);
            nombre_proyecto(ruc);
    
        }  
    })
    
});

function nombre_proyecto(ruc_cliente){

    $.ajax({
        url:'../php/proyecto.php' ,
        data:{ruc_cliente},//envia la variable
        type: 'POST',
        success: function(data){
                var lista_actividad=JSON.parse(data);
                var registro='';
                lista_actividad.forEach(fila=>{
                    registro +=`
                    <option value="${fila.id_proyecto}">${fila.n_proyecto}</option>
                    `;  
                           
                });
            $('#proyect').html(registro);
            var proyecto=document.getElementById('proyect').value;
            lista_egreso(proyecto);
        }
    });
}
function lista_egreso(id_proyecto){
    $.ajax({
        url:'../php/caja.php' ,
        data:{id_proyecto},//envia la variable
        type: 'POST',
        success: function(data){
                var lista_actividad=JSON.parse(data);
                var registros='';
                lista_actividad.forEach(fila=>{
                registros +=`
                <tr ID="${fila.id_egreso}">
                    <td>${fila.n_proyecto}</td>
                    <td>${fila.descripcion}</td>
                    <td>${fila.fecha}</td>
                    <td>${fila.nombre}</td>
                    <td>${fila.monto}</td>
                    <input type="hidden" value="${fila.igv}" id="igvs">
                </tr>
                `; 
                 
                });
                
                
            $('#lista_gastos').html(registros);
            
            monto_total(id_proyecto);
        }
    });
}

$(document).on('change','#proyect',function(){
    var id_proyecto=document.getElementById('proyect').value;
    lista_egreso(id_proyecto);
   
})

function monto_total(id_proyecto){

    $.ajax({
        url:'../php/monto_total.php' ,
        data:{id_proyecto},//envia la variable
        type: 'POST',
        success: function(data){
                var lista_actividad=JSON.parse(data);
                var registro2='';
                lista_actividad.forEach(fila=>{
                registro2 +=`${fila.total}`;         
                });
                if(registro2=="null"){
                    registro2=`0`;
                }
            $('#total_egreso').val("S/." +registro2);
            igv(registro2);
        }
        
    });
}
function igv(monto){
    var total=document.getElementById('total_egreso').value;
    if(total !="" && total !="S/.0"){
    var igv=document.getElementById('igvs').value;
    var total_igv=(igv*monto).toFixed(2);
    var total=parseFloat(total_igv)+parseFloat(monto);
    document.getElementById('igv').value="S/. "+total_igv;
    document.getElementById('total').value=total;
    }
}

$(document).on('click','#guardar_caja',function(){
    var id_proyecto=$('#proyect').val();
    var fecha=$('#fech').val();
    var total_monto=$('#total').val();
    var rucs=$('#rucs').val();
    if(id_proyecto !=='null' && fecha !=='' && total_monto !==''&& rucs !==''  ){

        $.ajax({
            url:'../php/add_caja.php',
            type:'POST',
            data:{id_p:id_proyecto,fech:fecha,monto:total_monto,ruc:rucs},

            success:function(data){
                
                if(data=='yes'){
                    Swal.fire({
                        icon: 'success',
                        text: 'Se registro exitosamente!!'
                    }).then(function(){
                        insertar_datos()
                        recuperar_caja(); 
                    });
                }else if(data=='no'){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Ya esta registrado!'
                    })
                }

            }
        });

    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Complete todos los datos!'
          })
    }


});

function insertar_datos(){
    var rucs=$('#rucs').val();
    var id_proyecto=$('#proyect').val();
    var total_monto=$('#total').val();
    $.ajax({
        url:'../php/add_ingreso.php',
        type:'POST',
        data:{id_p:id_proyecto,monto:total_monto,ruc:rucs},
        success:function(data){
            var lista_actividad=JSON.parse(data);
            var caja='';
            var resultado='';
            lista_actividad.forEach(fila=>{
                caja =`${fila.id_caja}`;
                resultado =`${fila.resultado}`;
            console.log(caja);
            console.log(resultado);
            });
            insertar(caja,resultado);
        }
    
    });
};

function insertar(caja,resultado){
    $.ajax({
        url:'../php/add_ingreso2.php',
        type:'POST',
        data:{id_caja:caja,res:resultado},
        success:function(data){
            console.log(data);
        }
    
    });

}
   

