$(document).on('click','#login-ingresar',function(){
    login();
});

$(document).on("keyup","#contra_log",function(){

    var mayus =new RegExp('^(?=.[A-Z])')
    var special = new RegExp('^(?=.[@!#$%&])')
    var numbers = new RegExp('^(?=.[0-9])')
    var lowers = new RegExp('^(?=.*[a-z])')
    //var len = new RegExp('^(?=.{8,})')

    var elementos = [mayus,special,numbers,lowers]
    var check = 0;
    var pass=$('#contra_log').val()

    var len = pass.length
    var cant=0;
    for(var i=0;i<4;i++){
        if(elementos[i].test(pass)){
            check++;
        }

    }


    if(len>=5){
        check++;
    }

        document.getElementById("dd").innerHTML=check

    if(check>=0 && check<=2){
        $("#seguridad").text("Muy insegura").css("color","red")
    }else if(check>=3 && check<=4){
        $("#seguridad").text("Poco segura").css("color","orange")

    }else if(check>=5){
        $("#seguridad").text("Muy segura").css("color","green")
    }


})

function login(){
    var dni_admin=$('#dni_admin').val();
    var pass=$('#contra_log').val();
    if(dni_admin !=='' && pass !==''){
        $.ajax({
            url:'bienvenida.php',
            type:'POST',
            data:{dni:dni_admin,password:pass},
            success:function(data){
                if(data=='yes'){
                    Swal.fire({
                        icon: 'success',
                        text: 'Bienvenido!!'
                    }).then(function(){
                        window.location.href='plantilla';
                    });
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'DNI o Password Incorrecto!'
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
}
$(document).keyup(function(e){
    if(e.which==13){//esc es en ascii el número 27
       login();
    }
});