$(document).on('click','#login-ingresar',function(){
    login();
});



function ip(){

    try {
        $.getJSON('https://api.ipify.org?format=json', function(data){
        var c_ip=data.ip;   
        
        var date  = new Date();
        const formatDate = (current_datetime)=>{
            let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
            return formatted_date;
        }
        f_h=formatDate(date);
        
        $.ajax({
            url:'control_ip.php',
            type:'POST',
            data:{ip:c_ip,fecha_h:f_h},
            success:function(data){ 
            }
        });             
    });
        
        
      } catch (error) {
        console.error(error);
      }
    
    
}


function login(){
    var dni_admin=$('#dni_admin').val();
    var pass=$('#contra_log').val();

    try {
        $.getJSON('https://api.ipify.org?format=json', function(data){
        var ip_s=data.ip;  
             
    if(dni_admin !=='' && pass !==''){
        $.ajax({
            url:'bienvenida.php',
            type:'POST',
            data:{dni:dni_admin,password:pass,ip:ip_s},
            success:function(data){
                if(data=='yes'){
                    Swal.fire({
                        icon: 'success',
                        text: 'Bienvenido!!'
                    }).then(function(){
                        window.location.href='plantilla';
                    });
                }else if(data == 'no'){   
                    ip(); 
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'DNI o Password Incorrecto!'
                    })
                    
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'usuario bloqueado intentelo mas tarde'
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
        
        
      } catch (error) {
        console.error(error);
      }
    
}
$(document).keyup(function(e){
    if(e.which==13){
       login();
    }
});

  

