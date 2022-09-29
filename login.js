$(document).on('click','#login-ingresar',function(){
    login();
    getIpClient();
});

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

async function getIpClient() {
    try {
      const response = await axios.get('https://api.ipify.org?format=json');
      var ip=response.data.ip;//captura la ip
      
    } catch (error) {
      console.error(error);
    }
  }
  

