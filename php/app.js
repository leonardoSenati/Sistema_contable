var booton=document.getElementById('agregar');
var guardar=document.getElementById('guardar');
var lista=document.getElementById('lista');

var data=[];
var cant=0;

$(document).on('click','#agregar',function(){
    agregar();
});
$(document).on('click','#guardar',function(){
    save();
});
function agregar(){
    var id_proyecto=document.getElementById('proyects').value;
    var combop=document.getElementById('proyects');
    if(id_proyecto!=""){
    var selectp=combop.options[combop.selectedIndex].text;
    }
    var nombre=document.getElementById('nombre').value;
    var fecha=document.getElementById('fecha').value;
    var egreso=document.getElementById('egreso').value;
    var combo=document.getElementById('egreso');
    var select=combo.options[combo.selectedIndex].text;
    var monto1=document.getElementById('monto').value;
    var monto=parseFloat(document.getElementById('monto').value);
    if(id_proyecto!="" && nombre!="" && fecha!="" && egreso!="" && monto1!=""){
    data.push(
        {
            "id":cant,
            "id_proyecto":id_proyecto,
            "nombre":nombre,
            "fecha":fecha,
            "egreso":egreso,
            "monto":monto
        }
    );
    var id_row='row'+cant;
    var fila='<tr id='+id_row+'> <td>'+selectp+'</td><td>'+nombre+'</td><td>'+fecha+'</td><td>'+select+'</td><td>s/'+monto+'</td> <td><a class="btn btn-danger bi bi-journal-minus " onclick="eliminar('+cant+')" href="#" role="button"></a></td></tr>';

    $("#lista").append(fila);
    $("#nombre").val('');
    $("#monto").val('');
    $("#proyects").focus();
    cant++;
    console.log(data);
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Complete todos los datos!'
          })
    }
    

}
function save(){
    var json=JSON.stringify(data);
    if(json=="[]"){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'no hay datos!'
          })
    }else{
    $.ajax({
        url:"../php/api.php",
        type: "POST",
        data:"json="+json,
        success:function(resp){
            console.log(resp);
            if(resp=="yes"){
                Swal.fire({
                    icon: 'success',
                    text: 'Se registro exitosamente!!'
                }).then(function(){
                    recuperar();
                    data.splice(0, data.length);
                });
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ingrese datos!'
                  })
            }
        }
    });
}
}
function eliminar(row){
    $("#row"+row).remove();
    var i=0;
    var pos=0;
    for (x of data){
        if(x.id==row){
            pos=i;
        }
        i++;
    }
    data.splice(pos,1);

}
