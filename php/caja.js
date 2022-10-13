/*
Evento click que se dispara cuando se presiona el link de tipo button para abrir el panel caja.
 */
$(document).on('click','#caj',function(){
    recuperar_caja();
    document.getElementById("panel").innerText="Panel caja";
    document.getElementById("titulo_panel").innerText="Panel caja";
});

/**
 * Esta funcion envia datos a traves del metodo GET por medio ajax al archivo bus_cli.php
 * método $.ajax
 * URL - para la petición.
 * type - especifica que será una petición GET.
 * data - la información a enviar.
 *  la var cabecera que contiene el formulario para obtener los datos del cliente,proyecto y fecha para generar boleta.
 */
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

/**
 * Evento keyup para detectar la pulsación de una tecla en el input con id rucs.
 * ruc - con el metodo getElementById seleccionamos el elemento por medio del id rucs y capturamos su valor.
 * método $.ajax 
 * URL - ruta del archivo bus_cli.php para la petición.
 * type - especifica que será una petición GET
 * success - Establece una función a ejecutar si la petición a sido satisfactoria.
 * lista_actividad - variable que almacenar al objeto 
 * fila - varible de tipo array - almacena los elemento del objeto.
 * registros - variable de estructura html donde a la etiqueta option en su valor le colocamos los datos que tiene los respectivos elementos.
 * datalistOptions - id de la etiqueta datalist - colocando los valores de la var registros en el datalist.
 * nombre_proyecto - funcion que va enviar como parametro a la variable ruc.
 */
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

/**
 * funcion que recibe como parametro el ruc del cliente.
 * método $.ajax 
 * URL - ruta del archivo proyecto.php para la petición.
 * type - especifica que será una petición POST
 * success - Establece una función a ejecutar si la petición a sido satisfactoria.
 * lista_actividad - variable que almacenar al objeto 
 * fila - variable de tipo array - almacena los elementos del objeto.
 * registros - variable de estructura html donde a la etiqueta option en su valor le colocamos los datos que tiene los respectivos elementos.
 * proyect - id de la etiqueta datalist - colocando los valores de la var registros en el datalist.
 * proyecto - con el metodo getElementById seleccionamos el elemento por medio del id proyect y capturamos su valor.
 * lista_egreso - funcion que va enviar como parametro a la variable proyecto.
 */
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

/**
 * funcion que recibe como parametro el id del proyecto.
 * método $.ajax 
 * URL - ruta del archivo caja.php para la petición.
 * type - especifica que será una petición POST
 * success - Establece una función a ejecutar si la petición a sido satisfactoria.
 * lista_actividad - variable que almacenar al objeto 
 * fila - variable de tipo array - almacena los elementos del objeto.
 * registros - variable de estructura html donde a la etiqueta tr y td le colocamos los datos que tiene los respectivos elementos.
 * lista_gastos - id de la etiqueta tbody - colocando los valores de la var registros en las respectivas filas.
 * monto_total - funcion que va enviar como parametro a la variable id_proyecto.
 */
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

/**
 * El evento change se activa cuando el elemento finaliza un cambio.
 * asignamos el evento change  al selet de id proyect.
 * id_proyecto - variable que almacena el dato del select cuyo id es proyect.
 * lista_egreso - funcion que va enviar como parametro a la variable id_proyecto.
 */
$(document).on('change','#proyect',function(){
    var id_proyecto=document.getElementById('proyect').value;
    lista_egreso(id_proyecto);
})


/**
 * funcion que recibe como parametro el id del proyecto.
 * método $.ajax 
 * URL - ruta del archivo monto_total.php para la petición.
 * type - especifica que será una petición POST
 * success - Establece una función a ejecutar si la petición a sido satisfactoria.
 * lista_actividad - variable que almacenar al objeto.
 * fila - variable de tipo array - almacena los elementos del objeto.
 * registro2 - variable que va contener el dato del elemento total del array fila.
 * total_egreso - id del input en la cual vamos colocar el valor del la var registro2.
 * igv - uncion que va enviar como parametro a la variable registro2.
 */
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

/**
 * funcion que recibe como parametro el monto.
 * total - variable que va almacenar el total de egresos para luego validar.
 * igv - variable que va almacenar el igv.
 * total_igv - variable que va almacena el resultado de calcular el igv con respecto al monto.
 * total -  variable que va que va almacena el resultado de calcular el total igv + el monto. 
 * metodo getElementById para dirigirnos al id igv y en su valor le colocamos el resultado del monto total del igv.
 * getElementById para dirigirnos al id total y en su valor le colocamos el resultado del monto total.
 */
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

/**
 * evento click para al boton generar boleta.
 * id_proyecto - almacena el valor del atributo proyect.
 * fecha - almacena el valor del atributo fech.
 * total_monto - almacena el valor del atributo total.
 * rucs - almacena el valor del atributo rucs.
 * hacemos la peticion ajax para enviar el valor de los atributos y finalmente validar los resultados.
 */
$(document).on('click','#guardar_caja',function(){
    var id_proyecto=$('#proyect').val();
    var fecha=$('#fech').val();
    var total_monto=$('#total').val();
    var rucs=$('#rucs').val();
    if(fecha !=='' && total_monto !==''&& rucs !==''  ){

        if(id_proyecto !=='null'){
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

        } else {

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El proyecto no tiene ningun gasto'
              })

        }

        

    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No ha elegido ningun proyecto'
          })
    }
});

/**
 * funcion insertar datos. 
 * rucs - almacena el valor del atributo rucs.
 * id_proyecto - almacena el valor del atributo proyect.
 * total_monto - almacena el valor del atributo total.
 * hacemos la peticion ajax para enviar el valor de los atributos.
 * lista_actividad - almacena el objeto data.
 * fila - variable de tipo array - almacena los elementos del objeto.
 * caja - variable que almacena el dato del elemento id_caja.
 * resultado - variable que almacena el dato del elemento resultado.
 * insertar - funcion que va enciar como parametros las variables caja,resultado.
 */
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

/**
 * funcion que recibe dos parametros caja,resultado.
 *  hacemos la peticion ajax para enviar los datos que tienen los parametros.
 */
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
   

