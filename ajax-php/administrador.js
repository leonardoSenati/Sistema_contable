
/*
El bloque $(document).ready() - se ejecutará sólo al momento que se carga la pagina.
Este bloque valida el tipo de rol del usuario.  
*/
$(document).ready(function(){
    var acceso=document.getElementById("acceso").value;
    if(acceso=="12345678"){
        recuperar_tareas();
        document.getElementById("panel").innerText="Panel administrador";

    }else{
        recuperar_tarea();
        document.getElementById("panel").innerText="Panel cliente";
    }

})

/*
Evento click que se dispara cuando se presiona el link de tipo button para abrir el panel administrador.
*/
$(document).on('click','#adm',function(){
    recuperar_tareas();
    document.getElementById("panel").innerText="Panel administrador";
    document.getElementById("titulo_panel").innerText="Panel administrador";

});

/**
 *alerta para algun elemento en desarrollo.(no se esta ejecutando)
 */
function desarrollo(){
    Swal.fire({
        title: 'Aún en desarrollo',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
}

/*
Esta funcion envia datos a traves del metodo GET por medio ajax al archivo administrador.php
var cabecera - contiene el modal de registro de administrador y de actualizacion. 
registros - arreglo en formarto json.
*/
function recuperar_tareas(){
    $.ajax({
        url:'../ajax-php/administrador.php',
        type:'GET',
        success:function(data){
            var lista_actividad=JSON.parse(data);

            var cabecera=`
            <div class="main">
            <div class="cards">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="bi bi-person-plus"></i> 
                    Agregar</button>
            <div class="tabla-responsive" id="no-more-tables">
            <table class="table">
            <thead>
                    <tr>
                    <th scope="col">DNI</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Correo</th>
                    <th scope="col">						
                    </th>
                    </tr>
                </thead>
                <tbody>`;
            var fin = `
                </tbody>
            </table>
            </div>
            </div>
        </div>
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Agregar Trabajador</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="btnCerrar"></button>
                    </div>
                    <section id="container">
		<div class="modal-body">

                <form class="row g-3" id="frm-admin">
                <div class="col-md-6">
                <label for="nombre">Nombre:</label>
                <input type="text" class="form-control" name="nombre" id="nombre" placeholder="Ingrese Nombres" onpaste="return false">
                </div>
                <div class="col-md-6">
                <label for="apellido">Apellido:</label>
                <input type="text" class="form-control" name="apellido" id="apellido" placeholder="Ingrese Apellidos" onpaste="return false">
                </div>
                <div class="col-md-6">
                <label for="dni_admin">DNI:</label>
                <input type="text" class="form-control" name="dni_admin" id="dni_admin" placeholder="Ingrese DNI" onpaste="return false">
                </div>
                <div class="col-md-6">
                <label for="correo">Correo Electronico:</label>
                <input type="email" class="form-control" name="correo" id="correo" placeholder="Ingrese Correo Electronico" onpaste="return false">
                <span id="mensajeCorreo"></span>
                </div>
                <div class="col-md-6">
                <label for="contraseña">Contraseña:</label>
                <input type="text" class="form-control" name="contraseña" id="contraseña" placeholder="Ingrese Contraseña" onpaste="return false">
                <span id="mensajePassword" style="font-size: 13px" ></span>
                </div>

                <div class="col-md-12">
                <button type="button" class="btn btn-primary" id="btnIngreso">Crear Usuario</button>
                </div>
            </form>
        </div>
	</section>
        </div>
        </div>
        </div>
        
        <div class="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="titulo2 modal-title" id="staticBackdropLabel">Actualizar Trabajador</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="btnCerrar2"></button>
                    </div>
                    <section id="container">
		<div class="modal-body">
                <form class="row g-3" id="frm-edit">
                <div class="col-md-6">
                <label for="nombre">Nombre:</label>
                <input type="text" class="form-control" name="nombre2" id="nombre2" placeholder="Ingrese Nombres" onpaste="return false">
                </div>
                <div class="col-md-6">
                <label for="apellido">Apellido:</label>
                <input type="text" class="form-control" name="apellido2" id="apellido2" placeholder="Ingrese Apellidos" onpaste="return false">
                </div>
                <div class="col-md-6">
                <label for="dni_admin">DNI:</label>
                <input type="text" class="form-control" maxlength="8" name="dni_admin2" id="dni_admin2" placeholder="Ingrese DNI" readonly onpaste="return false">
                </div>
                <div class="col-md-6">
                <label for="correo">Correo Electronico:</label>
                <input type="email" class="form-control" name="correo2" id="correo2" placeholder="Ingrese Correo Electronico" onpaste="return false">

                <span id="mensaje55"></span>

                </div>
                <div class="col-md-6">
                <label for="contraseña">Contraseña:</label>
                <input type="password" class="form-control" name="contraseña2" id="contraseña2" placeholder="Ingrese Contraseña" onpaste="return false">                
                <span id="mensajePassword2" style="font-size: 13px" ></span>
                </div>

                <div class="col-md-12">
                <button type="button" class="btn btn-primary" id="btnIngreso2">Actualizar</button>
                </div>
            </form>
        </div>
	</section>
        </div>
        </div>
        </div>
        `;
            var registros='';
            lista_actividad.forEach(fila=>{
                registros +=`
                <tr ID="${fila.dni_admin}">
                     <td data-title="DNI">${fila.dni_admin}</td>
                    <td data-title="Nombre">${fila.nombre}</td>
                    <td data-title="Apellido">${fila.apellido}</td>
                    <td data-title="Correo">${fila.correo}</td>
                    <td>
                        <button class="update_adm btn btn-success"><i class="bi bi-pencil-square"></i></button> 
                        <button class="delete_adm btn btn-danger"><i class="bi bi-person-x"></i></button>
                    </td>
                </tr>
                `;              
            });
            $('#cabecera').html(cabecera+registros+fin);
            }  
    });
}

var validarContraGlobal = 0;
var validarCorreoGlobal = 0;

/*
*Evento que se ejecuta cuando cuando damos click al boton Agregar usuario.
*dni_admin - Numero -Numero de DNI del usuaruio administrador.
*nombre -Cadena de texto - Nombre del usuario.
*apellido -Cadena de texto - Apellido del usuario.
*correo  -Cadena de texto - Correo del usuario.
*password -Cadena alfanumérica - Contraseña del usuario.
*/
$(document).on('click','#btnIngreso',function(){
    var dni_admin=$('#dni_admin').val();
    var nombre=$('#nombre').val();
    var apellido=$('#apellido').val();
    var correo=$('#correo').val();
    var password=$('#contraseña').val();    
    
    if(dni_admin !=='' && nombre !=='' && apellido !=='' && correo !=='' && password !=='' && validarContraGlobal == 4 && validarCorreoGlobal == 1){
        $.ajax({
            url:'../ajax-php/add-admin.php',
            type:'POST',
            data:{dni:dni_admin,nom:nombre,ape:apellido,cor:correo,contra:password},
            success:function(data){
                if(data=='yes'){
                    Swal.fire({
                        icon: 'success',
                        text: 'Se registro exitosamente!!'
                    }).then(function(){
                        $("#staticBackdrop").modal("hide");
                        recuperar_tareas();
                        document.getElementById("frm-admin").reset(); 
                    });
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'El DNI o Correo ya estan siendo usados!'
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
    console.log(validarContraGlobal);
    console.log(validarCorreoGlobal);
});

/**
 * Evento keyup para detectar la pulsación de una tecla en el input con id contraseña
 * validarContraseña - Cadena alfanumérica - Validar la contraseña. 
 */
$(document).on("keyup", "#contraseña", function () {
    var pass = $("#contraseña").val();
    var validarContraseña = 0;

  if (/[0-9]/.test(pass)) {
    validarContraseña++;
  } 

  if (/[^A-Za-z0-9]/.test(pass)) {
    validarContraseña++
  } 

  if (/[A-Z]/.test(pass)) {    
    validarContraseña++
  } 

  if (pass.length > 8) {   
    validarContraseña++
  } 

  if(validarContraseña == 4){
    $("#mensajePassword").text("La contraseña debe ser mayor a 8 caracteres  y contener '123 , /@!*, QWEASD'").css("color", "green");
  } else {
    $("#mensajePassword").text("La contraseña debe ser mayor a 8 caracteres y contener '123 , /@!*, QWEASD'").css("color", "red")
  }

  validarContraGlobal = validarContraseña;      
});


/*
 * Evento keyup para detectar la pulsación de una tecla en el input con id contraseña2
 * validarContraseña - Cadena alfanumérica - Validar la contraseña. 
 */
$(document).on("keyup", "#contraseña2", function () {
  var pass = $("#contraseña2").val();
  var validarContraseña = 0;

  if (/[0-9]/.test(pass)) {
    validarContraseña++;
  }

  if (/[^A-Za-z0-9]/.test(pass)) {
    validarContraseña++
  }

  if (/[A-Z]/.test(pass)) {
    validarContraseña++
  }

  if (pass.length > 8) {
    validarContraseña++
  }

  if (validarContraseña == 4) {
    $("#mensajePassword2").text("La contraseña debe ser mayor a 8 caracteres  y contener '123 , /@!*, QWEASD'").css("color", "green");
  } else {
    $("#mensajePassword2").text("La contraseña debe ser mayor a 8 caracteres y contener '123 , /@!*, QWEASD'").css("color", "red")
  }

  validarContraGlobal = validarContraseña;

});

/**
 * Evento keyup para detectar la pulsación de una tecla en el input con id correo
 * validarCorreo - Cadena alfanumérica - Validar el correo. 
 */
$(document).on("keyup", "#correo", function () {
    var correo = $("#correo").val();
     var validarCorreo = 0;

    if (/[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/.test(correo)
    ) {
      $("#mensaje5").text("Correo valido").css("color", "green");
      validarCorreo++;
    } else {
      $("#mensaje5").text("Correo invalido").css("color", "red");
    }
    validarCorreoGlobal = validarCorreo;
});

/**
 * Evento keyup para detectar la pulsación de una tecla en el input con id correo2
 * validarCorreo - Cadena alfanumérica - Validar el correo. 
 */
$(document).on("keyup", "#correo2", function () {
    var correo = $("#correo2").val();
    var validarCorreo = 1;


    if (/[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/.test(correo)
    ) {
      $("#mensaje55").text("Correo valido").css("color", "green");
      validarCorreo = 1;
     
    } else {
      $("#mensaje55").text("Correo invalido").css("color", "red");
      validarCorreo = 0;
      
    }

  validarCorreoGlobal = validarCorreo;

});

/**
 * Evento click que se ejecuta cuando le damos click al boton actualizar administrador.
 */
$(document).on('click','.update_adm',function(){
    $("#staticBackdrop1").modal("show");
    var element=$(this)[0].parentElement.parentElement;
    var id = $(element).attr('ID');
    $.post('../ajax-php/get-admin.php',{id},function(response){
        var t = JSON.parse(response);
        $('#dni_admin2').val(t.dni);
        $('#nombre2').val(t.nom);
        $('#apellido2').val(t.ape);
        $('#correo2').val(t.email);
        $('#contraseña2').val("");
        $('#mensajePassword2').text("");

        edit=true;
    });
});

/**
 * Evento click que se ejecuta cuando le damos click al boton ingreso 2.
 */
$(document).on('click','#btnIngreso2',function(){
    var dni_admin=$('#dni_admin2').val();
    var nombre=$('#nombre2').val();
    var apellido=$('#apellido2').val();
    var correo=$('#correo2').val();
    var password=$('#contraseña2').val();
  if (dni_admin !== '' && nombre !== '' && apellido !== '' && correo !== '' && password !== '' && validarContraGlobal == 4 && validarCorreoGlobal == 1){
        $.ajax({
            url:'../ajax-php/update-admin.php',
            type:'POST',
            data:{dni:dni_admin,nom:nombre,ape:apellido,cor:correo,contra:password},
            success:function(data){
                Swal.fire({
                    icon: 'success',
                    text: 'Se actualizo el registro!'
                }).then(function(){
                    $("#staticBackdrop1").modal("hide");
                    recuperar_tareas();
                    document.getElementById("frm-edit").reset(); 
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
 * Evento click que se ejecuta cuando le damos click al boton cerrar que corresponde al modal.
 */
$(document).on('click','#btnCerrar',function(){
    $("#staticBackdrop").modal("show");
    document.getElementById("frm-admin").reset(); 
})

/**
 * Evento click que se ejecuta cuando le damos click en eliminar un usuario administrador.
 */
$(document).on('click','.delete_adm',function(){

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
            $.post("../ajax-php/suspender-admin.php",{id}, function (response){
            recuperar_tareas();
        });
          Swal.fire(
            'Eliminado!',
            'Se elimino el registro.',
            'success'
          )
        }
      })
});
