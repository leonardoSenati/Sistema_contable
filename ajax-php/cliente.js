/*
Evento click que se dispara cuando se presiona el link de tipo button para abrir el panel cliente.
 */
$(document).on('click','#cli',function(){
    recuperar_tarea();
    document.getElementById("panel").innerText="Panel cliente";
    document.getElementById("titulo_panel").innerText="Panel cliente";
});


/**
 * Esta funcion envia datos a traves del metodo GET por medio ajax al archivo administrador.php
 * método $.ajax
 * URL - para la petición.
 * type - especifica que será una petición POST.
 * data - la información a enviar.
 * lista_actividad - almacena al objeto.  
 */
function recuperar_tarea(){
    $.ajax({
        url:'../ajax-php/cliente.php',
        type:'GET',
        success:function(data){
            var lista_actividad=JSON.parse(data);

            var cabecera=`<div class="main">
            <div class="cards">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop3" id="agregacli"><i class="bi bi-person-plus"></i> 
                    Agregar</button>
            <div class="tabla-responsive" id="no-more-tables">
            <table class="table ">
            <thead>
                    <tr>
                     <th scope="col">RUC</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Télefono</th>
                    <th scope="col">Tipo de Empresa</th>
                    <th scope="col">
																																																																												
                    </th>
                    </tr>
                </thead>
                <tbody>`;
            var registros='';
            
            lista_actividad.forEach(fila=>{
                registros +=`
                <tr ID="${fila.ruc_cliente}">
                    <td data-title="RUC">${fila.ruc_cliente}</td>
                    <td data-title="Nombre">${fila.nombre_clie}</td>
                    <td data-title="Apellido">${fila.apellido}</td>
                    <td data-title="Correo">${fila.correo}</td>
                    <td data-title="Telefono">${fila.telefono}</td>
                    <td data-title="Empresa">${fila.tipo_empresa}</td>
                    <td>
                    
                    <button class="proyecto_cli btn btn-primary"><i class="bi bi-list-ul"></i></button> 
                    <button class="update_cli btn btn-success"><i class="bi bi-pencil-square"></i></button> 
                    <button class="delete_cli btn btn-danger"><i class="bi bi-person-x"></i></button>
                    
                    </td>
                </tr>
                `;              
            });
            var fin=`
                </tbody>
            </table>
            </div>
            </div>
				  
        </div>
        <div class="modal fade" id="staticBackdrop3" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Agregar Cliente</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="btnCerrar3"></button>
                    </div>
                    <section id="container">
		<div class="modal-body">
                <form class="row g-3" id="frm-cli">
                <div class="col-md-6">
                <label for="ruc_cliente">Ruc Cliente:</label>
                <input type="text" class="form-control" name="ruc_cliente" id="ruc_cliente" placeholder="Ingrese Ruc" onpaste="return false">
                </div>
                <div class="col-md-6">
                <label for="nombre_clie">Nombre:</label>
                <input type="text" class="form-control" name="nombre_clie" id="nombre_clie" placeholder="Ingrese Nombres" onpaste="return false">
                </div>
                <div class="col-md-6">
                <label for="apellido">Apellido:</label>
                <input type="text" class="form-control" name="apellido" id="apellido" placeholder="Ingrese Apellidos" onpaste="return false">
                </div>
                <div class="col-md-6">
                <label for="correo">Correo Electronico:</label>
                <input type="email" class="form-control" name="correo" id="correo" placeholder="Ingrese Correo Electronico" onpaste="return false">
                </div>
                <div class="col-md-6">
                <label for="telefono">Telefono:</label>
                <input type="text" class="form-control" name="telefono" id="telefono" placeholder="Ingrese telefono" onpaste="return false">
                </div>
                <div class="col-md-6">
                <label for="correo">Tipo de Empresa:</label>
                <select class="form-select" name="rubro" id="rubro">
                
                </select>
                </div>
                <div class="col-md-12">
                <button type="button" class="btn btn-primary" id="btnIngreso3">Crear Cliente</button>
                </div>
            </form>
        </div>
	</section>
        </div>
        </div>
        </div>
        
        <div class="modal fade" id="staticBackdrop4" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Actualizar Cliente</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="btnCerrar4"></button>
            </div>
            <section id="container">
<div class="modal-body">
        <form class="row g-3" id="frm-edit-cli">
        <div class="col-md-6">
        <label for="ruc_cliente">Ruc Cliente:</label>
        <input type="text" class="form-control" name="ruc_cliente2" id="ruc_cliente2" placeholder="Ingrese Ruc" readonly onpaste="return false">
        </div>
        <div class="col-md-6">
        <label for="nombre_clie">Nombre:</label>
        <input type="text" class="form-control" name="nombre_clie2" id="nombre_clie2" placeholder="Ingrese Nombres" onpaste="return false">
        </div>
        <div class="col-md-6">
        <label for="apellido">Apellido:</label>
        <input type="text" class="form-control" name="apellido2" id="apellido2" placeholder="Ingrese Apellidos" onpaste="return false">
        </div>
        <div class="col-md-6">
        <label for="correo">Correo Electronico:</label>
        <input type="email" class="form-control" name="correo2" id="correo2" placeholder="Ingrese Correo Electronico" onpaste="return false">
        </div>
        <div class="col-md-6">
        <label for="telefono">Telefono:</label>
        <input type="text" class="form-control" name="telefono2" id="telefono2" placeholder="Ingrese telefono" onpaste="return false">
        </div>
        <div class="col-md-12">
        <button type="button" class="btn btn-primary" id="btnIngreso4">Actualizar</button>
        </div>
    </form>
</div>
</section>
</div>
</div>
</div>

<div class="modal fade" id="staticBackdrop5" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Añadir Proyecto</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="btnCerrar4"></button>
            </div>
            <section id="container">
<div class="modal-body">
        <form class="row g-3" id="frm-edit-cli">
        <div class="col-md-6">
        <label for="ruc_cliente">Ruc Cliente:</label>
        <input type="text" class="form-control" name="ruc_cliente2" id="ruc_cliente3" placeholder="Ingrese Ruc" readonly onpaste="return false">
        </div>
        <div class="col-md-6">
        <label for="nombre_clie">Nombre de Proyecto:</label>
        <input type="text" class="form-control" name="nombre_clie2" id="nombre_pro" placeholder="Ingrese Nombres" onpaste="return false">
        </div>
        <div class="col-md-6">
        <label for="apellido">Inversion:</label>
        <input type="text" class="form-control" name="apellido2" id="inversion" placeholder="Ingrese Inversion" onpaste="return false">
        </div>
        <div class="col-md-12">
        <button type="button" class="btn btn-primary" id="btnIngreso5">Registrar Proyecto</button>
        </div>
    </form>
</div>
</section>
</div>
</div>
</div>

<!-- Modal -->
<div class="modal fade" id="staticBackdrop7" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Lista Proyectos</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
         
      
      <button class="agregar_pro btn btn-primary" ><i class="bi bi-file-earmark-plus-fill"></i> Agregar Proyecto</button>

      <div class="tabla-responsive" id="no-more-tables">
            <table class="table modal-responsive">
            <thead>
                <tr>
                <th scope="col">Ruc</th>
                <th scope="col">Proyecto</th>
                <th scope="col">Inversión</th>
                <th scope="col">Estado</th>
                <th scope="col">Accion</th>
                </tr>
            </thead>
        </div>
        <tbody id="lista_p">
        
        </tbody>
       </table>

      </div>
      
    </div>
  </div>
</div>
        `;
            $('#cabecera').html(cabecera+registros+fin);
            }  
    });
}


/**
 * Evento click que abre el modal lista de proyectos.
 * método $.ajax
 * URL - para la petición.
 * type - especifica que será una petición POST.
 * data - la información a enviar.
 * lista_actividad2 - almacena al objeto.  
 */
$(document).on('click','.proyecto_cli',function(){
    $("#staticBackdrop7").modal("show");
    var element=$(this)[0].parentElement.parentElement;
    var ids = $(element).attr('ID');
    console.log(ids);

    $.ajax({
        url:'../ajax-php/lista_proyecto.php',
        type:'POST',
        data:{ruc_cliente:ids},
        success:function(data){
            var lista_actividad2=JSON.parse(data);
            var registros1='';
            lista_actividad2.forEach(fila=>{
                registros1 +=`

                <tr ID_P="${fila.id_proyecto}">
                    <td data-title="RUC">${fila.ruc_cliente}</td>
                    <td data-title="Proyecto">${fila.n_proyecto}</td>
                    <td data-title="Inversion">${fila.inversion}</td>
                    <td id="est" data-title="Estado">${fila.estad}</td>
                    <td>
                    <button class="eliminar_pro btn btn-danger"><i class="bi bi-trash"></i></button> 
                    </td>
                </tr>
                `;   
            });  
            $('#lista_p').html(registros1);
        }
    });

/**
 * Evento click que abre el modal agregar proyecto.
 */ 
 $(document).on('click','.agregar_pro',function(){
            $("#staticBackdrop5").modal("show");
            $("#staticBackdrop7").modal("hide");
            console.log(ids);
            document.getElementById("ruc_cliente3").value=ids;
        })
})

/**
 * Evento click que se ejecuta cuando le damos click al boton se registrar proyecto.
 * método $.ajax
 * URL - para la petición.
 * type - especifica que será una petición POST.
 * data - la información a enviar. 
 */
$(document).on('click','#btnIngreso5',function(){
    
    var id=document.getElementById("ruc_cliente3").value;
    var nombre_pro=$('#nombre_pro').val();
    var inversion=$('#inversion').val();
    if(id !=='' && nombre_pro !=='' && inversion !==''){
    $.ajax({
        url:'../ajax-php/agregar_proyecto.php',
        type:'POST',
        data:{ruc_cliente:id,n_proyect:nombre_pro,inver:inversion},
        success:function(data){
            if(data=='yes'){
                Swal.fire({
                    icon: 'success',
                    text: 'Se registro el proyecto!'
                }).then(function(){
                    $("#staticBackdrop5").modal("hide");
                    recuperar_tarea();
                    
                    
                    
                });
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El nombre del proyecto ya esta siendo usado. Por favor use uno distinto'
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

})

/**
 * Evento click que se ejecuta cuando le damos click al boton se registrar proyecto.
 * método $.ajax
 * URL - para la petición.
 * type - especifica que será una petición POST.
 * data - la información a enviar. 
 */
$(document).on('click','#agregacli',function(){
    $.ajax({
        url:'../ajax-php/rubro.php',
        type:'GET',
        success:function(data){
            var lista_actividad=JSON.parse(data);
            var registros='';
            lista_actividad.forEach(fila=>{
                registros +=`
                <option value="${fila.id_rubro}">${fila.tipo_empresa}</option>
                `;              
            });
            $('#rubro').html(registros);
            }  
    });
})


/**
 * Evento click que se ejecuta cuando le damos click al boton agregar cliente.
 */
$(document).on('click','#btnIngreso3',function(){
    var ruc_cliente=$('#ruc_cliente').val();
    var nombre_clie=$('#nombre_clie').val();
    var apellido=$('#apellido').val();
    var correo=$('#correo').val();
    var telefono=$('#telefono').val();
    var rubro=$('#rubro').val();
    if(ruc_cliente !=='' && nombre_clie !=='' && apellido !=='' && correo !=='' && telefono !=='' && rubro !=='' ){

        if(ruc_cliente.length == 11){
            $.ajax({
                url:'../ajax-php/add-cliente.php',
                type:'POST',
                data:{ruc:ruc_cliente,clie:nombre_clie,ape:apellido,cor:correo,tel:telefono,rub:rubro},
                success:function(data){
                    if(data=='yes'){
                        Swal.fire({
                            icon: 'success',
                            text: 'Se registro exitosamente!!'
                        }).then(function(){
                            $("#staticBackdrop3").modal("hide");
                            recuperar_tarea();
                            document.getElementById("frm-cli").reset(); 
                        });
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'El RUC o Correo ya estan siendo usados!'
                        })
                    }
                }
            });  
        } else {

            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'RUC debe tener 11 Digitos'
              })
        }
        
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Complete todos los datos!'
          })
    }
});

/**
 * Evento click al boton actualizar cliente - abre modal para llenar datos.
 */
$(document).on('click','.update_cli',function(){
    $("#staticBackdrop4").modal("show");
    var element=$(this)[0].parentElement.parentElement;
    var id = $(element).attr('ID');
    $.post('../ajax-php/get-cliente.php',{id},function(response){
        var t = JSON.parse(response);
        $('#ruc_cliente2').val(t.ruc);
        $('#nombre_clie2').val(t.clie);
        $('#apellido2').val(t.ape);
        $('#correo2').val(t.cor);
        $('#telefono2').val(t.tel);
    });
});

/**
 * Evento click al boton actualizar cliente - Envia los nuevos datos por ajax al archivo update-cliente.php
 * método $.ajax
 * URL - para la petición.
 * type - especifica que será una petición POST.
 * data - la información a enviar.
 */
$(document).on('click','#btnIngreso4',function(){
    var ruc_cliente=$('#ruc_cliente2').val();
    var nombre_clie=$('#nombre_clie2').val();
    var apellido=$('#apellido2').val();
    var correo=$('#correo2').val();
    var telefono=$('#telefono2').val();
    if(ruc_cliente !=='' && nombre_clie !=='' && apellido !=='' && correo !=='' && telefono !==''){
        $.ajax({
            url:'../ajax-php/update-cliente.php',
            type:'POST',
            data:{ruc:ruc_cliente,clie:nombre_clie,ape:apellido,cor:correo,tel:telefono},
            success:function(data){
                Swal.fire({
                    icon: 'success',
                    text: 'Se actualizo el registro!'
                }).then(function(){
                    $("#staticBackdrop4").modal("hide");
                    recuperar_tarea();
                    document.getElementById("frm-edit-cli").reset(); 
                });
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

/**
 * Evento click al boton eliminar cliente - cambia el status del cliente eliminado a 0 en la base de datos.
 */
$(document).on('click','.delete_cli',function(){

    Swal.fire({
        title: 'Estas seguro de eliminar?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borralo!'
      }).then((result) => {
        if (result.isConfirmed) {
            let element=$(this)[0].parentElement.parentElement;
            let id=$(element).attr('ID');
            $.post("../ajax-php/suspender-cliente.php",{id}, function (response){
            recuperar_tarea();
        });
          Swal.fire(
            'Eliminado!',
            'Se elimino el registro.',
            'success'
          )
        }
      })
});


/**
 * Evento click al boton eliminar proyecto - cambia el status del proyecto eliminado a 0 en la base de datos.
 */
$(document).on('click','.eliminar_pro',function(){

    Swal.fire({
        title: 'Estas seguro de eliminar?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borralo!'
      }).then((result) => {
        if (result.isConfirmed) {
            let element=$(this)[0].parentElement.parentElement;
            let id=$(element).attr('ID_P');
            console.log(id);
            $.post("../ajax-php/estado_update.php",{id}, function (response){
            $("#staticBackdrop7").modal("hide");
            recuperar_tarea();
        });
          Swal.fire(
            'Eliminado!',
            'Se elimino el registro.',
            'success'
          )
        }
      })
});
