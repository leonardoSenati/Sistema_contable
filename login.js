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

var contador=0;
function ip(){
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
    
}


function login(){
    var dni_admin=$('#dni_admin').val();
    var pass=$('#contra_log').val();
    $.getJSON('https://api.ipify.org?format=json', function(data){
        var ip_s=data.ip;  
        
                     
    if(dni_admin !=='' && pass !==''){
        $.ajax({
            url:'bienvenida.php',
            type:'POST',
            data:{dni:dni_admin,password:pass,ip:ip_s},
            success:function(data){
                console.log(data);
                if(data=='yes'){
                    Swal.fire({
                        icon: 'success',
                        text: 'Bienvenido!!'
                    })
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
                        text: 'usuario bloqueado'
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
  

