<?php 
session_start();
if(isset($_SESSION['dni_admin'])){
  header('location: plantilla/');
}else{
?>
<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <!--  link de bootrack  -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" 
    rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" 
    crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" 
    integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" 
    crossorigin="anonymous"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!--  link de iconos de bootrack  -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="css/styles.css">
    
</head>
<body>
  <div class="con_login">
    <div class="con"> 
      <img src="imagenes/img1.jpg" alt="" id="img1"  >
    </div>
    <div class="con">
      <form class="for_login" action="" method="post">
        <img src="imagenes/img2.webp" alt="" id="img2">
        <h1>Iniciar sesión</h1>
        <div class="row mb-3">
          <div class="col-10" id="login" >
            <input type="text" class="form-control" id="dni_admin" placeholder="Ingresa tu DNI :" name="dni_admin" onpaste="return false">
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-sm-10" id="login">
            <input type="password" class="form-control" id="contra_log" min="3" max="15" pattern="[a-zA-z]{0,9}" placeholder="Ingresa tu contraseña :" name ="contraseña">
          </div>
          <p id="seguridad"></p>
            <p id="dd"></p>
        </div>
        
        <button type="button" id="login-ingresar" class="login btn btn-primary">Ingresar</button>
      </form>
    </div>
   
</div>

<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src="login.js"></script>
<script src="https://code.jquery.com/jquery-3.6.1.min.js"></script>
</body>
</html>
<?php 
}
?>