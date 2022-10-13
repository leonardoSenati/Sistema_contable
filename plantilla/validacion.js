function SoloNumero(id){
    jQuery(id).keypress(function (tecla) {
    if (tecla.charCode < 48 || tecla.charCode > 57) return false;
    });
}
function SoloNumeroDecimales(id){
    jQuery(id).keypress(function (tecla) {
    if ((tecla.charCode < 48 || tecla.charCode > 57) && tecla.charCode!=46) return false;
    });
}
function SoloLetra(id){
    jQuery(id).keypress(function (tecla) {
    if ((tecla.charCode < 65 || tecla.charCode > 90) && (tecla.charCode < 97 || tecla.charCode > 122) && (tecla.charCode != 32)) return false;
    });
}

$(document).on('keydown','#monto',function(){
    
    document.getElementById("monto").maxLength=8;
    SoloNumeroDecimales("#monto");
});

$(document).on('keydown','#dni_admin',function(){
    document.getElementById("dni_admin").maxLength=8;
    SoloNumero("#dni_admin");
});

$(document).on('keydown','#ruc_cliente',function(){
    document.getElementById("ruc_cliente").maxLength=11;
    SoloNumero("#ruc_cliente");
});

$(document).on('keydown','#telefono',function(){
    document.getElementById("telefono").maxLength=9;
    SoloNumero("#telefono")
});

$(document).on('keydown','#telefono2',function(){
    document.getElementById("telefono2").maxLength=9;
    SoloNumero("#telefono2")
});

$(document).on('keydown','#nombre',function(){
    SoloLetra("#nombre");
});

$(document).on('keydown','#apellido',function(){
    SoloLetra("#apellido");
});

$(document).on('keydown','#nombre2',function(){
    SoloLetra("#nombre2");
});

$(document).on('keydown','#apellido2',function(){
    SoloLetra("#apellido2");
});

$(document).on('keydown','#nombre_clie',function(){
    SoloLetra("#nombre_clie");
});

$(document).on('keydown','#nombre_clie2',function(){
    SoloLetra("#nombre_clie2");
});

$(document).on('keydown','#nombre_proyecto',function(){
    SoloLetra("#nombre_proyecto");
});

$(document).on('keydown','#nombre_proyecto2',function(){
    SoloLetra("#nombre_proyecto2");
});

$(document).on('keydown','#inversion',function(){    
    SoloNumero("#inversion");
});



function fecha_actual(id){
    var hoy =new Date();
    var dia=hoy.getDate();// dia actual del servidor local
    var mes=hoy.getMonth()+1;// getMonth() toma los meses a partir de 0 al 11, para darle el formato sumamos 1
    var anio=hoy.getFullYear();// año actual del servidor local
    dia=('0'+dia).slice(-2);// damos formato de 2 cifras a los dias, ejemplo dia 01, 02,...,31
    mes=('0'+mes).slice(-2);// damos formato de 2 cifras a los meses, ejemplo dia 01, 02,...,12
    var formato=anio+'-'+mes+'-'+dia;
    document.getElementById(id).value=formato;
}


function fecha_post(id){
    var hoy =new Date();
    var dia=hoy.getDate();// dia actual del servidor local
    var mes=hoy.getMonth()+2;// getMonth() toma los meses a partir de 0 al 11, para darle el formato sumamos 1
    var anio=hoy.getFullYear();
    if(mes>12){
        mes=1;
        anio=anio+1;
    }// año actual del servidor local
    dia=('0'+dia).slice(-2);// damos formato de 2 cifras a los dias, ejemplo dia 01, 02,...,31
    mes=('0'+mes).slice(-2);// damos formato de 2 cifras a los meses, ejemplo dia 01, 02,...,12
    var formato=anio+'-'+mes+'-'+dia;
    document.getElementById(id).value=formato;
}