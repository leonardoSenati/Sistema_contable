//este evento click nos envia a el panel de egreso
$(document).on('click','#egre',function(){
    recuperar();//llamanos a la funcion recurer lo cual muestra todo el dato html
    document.getElementById("panel").innerText="Panel egreso";//cambia ta etiquta h1 al momento de llamar este archivo
});

//esta funcion tiene una variable donde almacena los datos en html
function recuperar(){
    var cabecera=`
    <div class="main">
        <div class="cards">
            <form class="row g-3">
                <div class="col-md-4">
                    <label for="exampleDataList" class="form-label">Cliente</label>
                    <input class="form-control" list="datalistOptions" id="ruc" placeholder="Ingrese Cliente">
                    <datalist id="datalistOptions">
                    </datalist>
                </div>
                <div class="col-md-3">
                    <label for="escuela" class="form-label">Proyecto</label>
                    <select class="form-select" aria-label="Default select example" id="proyects">
                    </select>
                </div>
                <div class="col-md-4">
                    <label for="inputEmail4" class="form-label">Descripción</label>
                    <input type="email" class="form-control" id="nombre">
                </div>
                <div class="col-md-3">
                    <label for="inputPassword4" class="form-label">Fecha</label>
                    <input type="date" class="form-control" id="fecha">
                </div>
                <div class="col-md-3">
                    <label for="escuela" class="form-label">Tipo Egreso</label>
                    <select class="form-select" aria-label="Default select example" id="egreso">
                    </select>
                </div>
                <div class="col-md-3">
                    <label for="inputPassword4" class="form-label">Monto</label>
                    <div class="input-group">
                    <div class="input-group-text">S/</div>
                    <input type="text" class="form-control" id="monto" placeholder="Monto">
                    </div>
                </div>
                <div id="acciones">
                    <button type="button" class="btn btn-primary bi bi-plus-circle" id="agregar"> Agregar</button>
                    <button type="button" class="btn btn-primary bi bi-folder-symlink" id="guardar"> Guardar</button>
                </div>
            </form>
        </div>
        <div class="mt-4" id="conte">
            <table class="table" id="lista">
                <thead>
                    <tr>
                    <th scope="col">Proyecto</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Tipo Egreso</th>
                    <th scope="col">Monto</th>
                    <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table> 
        </div>
    </div>`;
    $('#cabecera').html(cabecera);//
    //se implementa el ajax
    $.ajax({
        url:'../php/bus_tipo_egre.php',//pones la direccion URL
        type:'GET',//tipo de envio Get
        success:function(data){//esta funcion sirve para ver los tipos de egresos que hay-> fijjos / recurrentes
            var lista_actividad=JSON.parse(data);//se captura los datos en formato json
            var registros='';//se inicializa esta variable
            lista_actividad.forEach(fila=>{//se muesta los datos atraves de un forech
                registros +=`
                <option value="${fila.t_egreso}">${fila.nombre}</option>
                `;              
            });
            $('#egreso').html(registros);// se envai los datos atraves del id de la etiqueta  select
        }  
    });
    //se implementa ajax para visualizar en lafuncion el nombre y el ruc del cliente
    $.ajax({
        url:'../php/bus_cli.php',//envia la direccion
        type:'GET',//de tio Get
        success:function(data){//esta funcion cumple con visualizare los nombres del cliente y su ruc
            var lista_actividad=JSON.parse(data);//se captura la variable en formato json
            var registro='';
            lista_actividad.forEach(fila=>{//se visualiza los nombre del cliente y su ruc atraves del forech
                registro +=`
                <option value="${fila.ruc_cliente}">${fila.nombre_clie} </option>
                `;              
            });
            $('#datalistOptions').html(registro);//se implemeta la visualizacion atraves del id de la etiqueta datalist
        }  
    });
    //esta funcion te muestra la fecha actual
    fecha_actual("fecha");
}

//esta evento click cumple la visualizacion del ruc y nombre del cliente
$(document).on('keyup','#ruc',function(){
    var ruc=document.getElementById('ruc').value;//se guarda los datos ingresados en el input en la variable ruc 
    //se implementa el aja
    $.ajax({
        url:'../php/bus_cli.php',//se envia a la direccion URL
        type:'GET',//tipo get
        success:function(data){// esta funcion cumple con ver los nombres del cliente y el ruc del mismo
            var lista_actividad=JSON.parse(data);
            var registros='';
            lista_actividad.forEach(fila=>{
                registros +=`
                <option value="${fila.ruc_cliente}">${fila.nombre_clie}</option>
                `;              
            });
            $('#datalistOptions').html(registros);
            
        }  
    })
    //esta funcion llama los proyectos del cliente
    //se ingresa el parametro del ruc del cliente
    nombre_proyectos(ruc);
    

});


//esta funcion llama los proyectos del cliente
//atraves del paramento del ruc del cliente
function nombre_proyectos(ruc_cliente){
    //se implementa el ajax 
    $.ajax({
        url:'../php/proyecto.php',//se pone la direccion donde se envia el parametro
        data:{ruc_cliente},//envia la variable
        type: 'POST',//de tipo post
        success: function(data){//esta funcion visualiza los proyectos del cliente
                var lista_actividad=JSON.parse(data);//se cartura la variable en formato json
                var registro='';
                //en este forEach nombra los id del proyecto y su nombre los cuales se visualizaran
                lista_actividad.forEach(fila=>{
                    registro +=`
                    <option value="${fila.id_proyecto}">${fila.n_proyecto}</option>
                    `;  
                           
                });
                //aqui se direcciona atraves de su id donde se visualizara esta etiqueta option
            $('#proyects').html(registro);
        }
    });
}