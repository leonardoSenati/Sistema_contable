
$(document).on('click','#egre',function(){
    recuperar();
    document.getElementById("panel").innerText="Panel egreso";
});


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
    
    $.ajax({
        url:'../php/bus_tipo_egre.php',
        type:'GET',
        success:function(data){
            var lista_actividad=JSON.parse(data);
            var registros='';
            lista_actividad.forEach(fila=>{
                registros +=`
                <option value="${fila.t_egreso}">${fila.nombre}</option>
                `;              
            });
            $('#egreso').html(registros);
        }  
    });
    
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

    fecha_actual("fecha");
}


$(document).on('keyup','#ruc',function(){
    var ruc=document.getElementById('ruc').value; 
    
    $.ajax({
        url:'../php/bus_cli.php',
        type:'GET',//tipo get
        success:function(data){
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
    nombre_proyectos(ruc);
});



function nombre_proyectos(ruc_cliente){

    $.ajax({
        url:'../php/proyecto.php',
        data:{ruc_cliente},
        type: 'POST',
        success: function(data){
                var lista_actividad=JSON.parse(data);
                var registro='';
                
                lista_actividad.forEach(fila=>{
                    registro +=`
                    <option value="${fila.id_proyecto}">${fila.n_proyecto}</option>
                    `;  
                           
                });
                
            $('#proyects').html(registro);
        }
    });
}
