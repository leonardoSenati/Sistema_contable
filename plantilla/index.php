<?php
session_start();
if (isset($_SESSION['dni_admin'])) {
?>
    <!DOCTYPE html>
    <html lang="es">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css">
        <!-- <link rel="stylesheet" href="line-awesome/css/line-awesome.min.css"> -->
        <link rel="stylesheet" href="../css/egresos.css">
        <link rel="stylesheet" href="../css/caja.css">
        <link rel="stylesheet" href="styles.css">
        <title>Panel Admin</title>
        <!--link de iconos de bootrap-->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    </head>

    <body>
        <input type="checkbox" id="nav-toggle">
        <div class="sidebar">
            <div class="sidebar-brand">
                <h2> <span class="lab la-accusoft"></span><span>Sistema contable</span></h2>
            </div>

            <div class="sidebar-menu">
                <ul>
                    <?php if ($_SESSION['dni_admin'] == '12345678') { ?>
                        <li>
                            <a role="button" id="adm"><span class="las la-user-lock"></span><span>Administrador</span></a>

                        </li>
                    <?php } ?>
                    <li>
                        <a role="button" id="cli"><span class="las la-users"></span><span>Cliente</span></a>
                        <input type="hidden" id="acceso" value="<?php echo $_SESSION['dni_admin']; ?>">
                    </li>
                    <li>
                        <a role="button" id="egre"><span class="las la-file-invoice"></span><span>Egresos</span></a>
                    </li>

                    <li>
                        <a role="button" id="caj"><span class="las la-receipt"></span><span>Caja </span></a>
                    </li>
                    <li>
                        <a role="button" id="ing"><span class="las la-money-bill-wave"></span><span>Ingresos</span></a>
                    </li>
                </ul>
            </div>
        </div>

        <div class="main-content">
            <header>
                <div>
                    <h2>
                        <label for="nav-toggle">
                            <span class="las la-bars"></span>
                        </label>

                        <span class="panel" id="panel">Panel administrador</span>
                    </h2>
                </div>

                <div class="log-out">
                    <img src=" https://i.pinimg.com/236x/a3/2a/9f/a32a9fba1e59ab223205d9380e091681.jpg" width="50px" height="50px">

                    <div class="btn-group">
                        <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <?php if ($_SESSION['dni_admin'] == '12345678') {
                                echo "Admin";
                            } else {
                                echo "Usuario";
                            }
                            ?>
                        </button>
                        <ul class="dropdown-menu">

                            <li><a class="dropdown-item" target="_blank" href="https://drive.google.com/file/d/1bmv_yHdcoxk6NAlOYD7jSnh0Q-kCXtK8/view"><i class="las la-file-alt"></i> Manual de Uso</a></li>
                            <li><a class="dropdown-item" href="salir.php"><i class="las la-user-times"></i> Cerrar Sesion</a></li>
                        </ul>
                    </div>
                </div>

            </header>

            <main id="cabecera">

            </main>
        </div>

        </main>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <script src="../ajax-php/administrador.js"></script>
        <script src="../ajax-php/cliente.js"></script>
        <script src="../php/egresos.js"></script>
        <script src="../php/app.js"></script>
        <script src="../php/caja.js"></script>
        <script src="../php/ingreso.js"></script>
        <script src="validacion.js"></script>
        <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

        <!-- Script para desactivar el F12 -->
        <script disable-devtool-auto src='https://cdn.jsdelivr.net/npm/disable-devtool'></script>
    </body>

    </html>
<?php
} else {
    header('location: ../index.php');
}
?>