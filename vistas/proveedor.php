<?php 
//activamos almacenamiento en el buffer
ob_start();
session_start();
if (!isset($_SESSION['nombre'])) {
  header("Location: login.html");
}else{

require 'header.php';
if ($_SESSION['proveedores']==1) {
 ?>
    <div class="content-wrapper" id="contenedor-principal">
    <!-- Main content -->
    <section class="content">

      <!-- Default box -->
      <div class="row">
        <div class="col-md-12">
          <div class="box" style="box-shadow: 5px 7px 10px #3300ff99;border-radius: 16px;">
            <div class="box-header with-border">
              <center><h4 class="box-title">Proveedor </h4></center>
            <div class="box-tools pull-right">
          </div>
        </div>
<!--box-header-->
<!--centro-->
<div class="panel-body table-responsive" id="listadoregistros">
   <div class="form-group col-lg-4 col-md-6 col-xs-12">
      <button title="Registrar" id="btnagregarservicio" data-toggle='popover' data-trigger='hover' data-content='Registrar nuevo proveedor' data-placement='right' class='btn btn-success' onclick="mostrarform(true)"><i class="fa fa-plus-circle"></i> Agregar Nuevo</button>
    </div>
    <div class="form-group col-lg-4 col-md-6 col-xs-12" style="position:relative;">
      <section>
        <center><input class="form-control me-2" type="text" name="busqueda" id="busqueda" placeholder="Buscar..." style="width:250px; border-radius: 8px; box-shadow: -2px 2px 5px #3300ff99;"></center><br><br>
      </section>        
    </div>     
    <div class="form-group col-lg-4 col-md-6 col-xs-12">
      <div class="loaderSearch">
        <img src="../files/images/loader.gif" alt="" width="35px">
      </div>
    </div>
    <div id="global">
      <div id="tablaResultados">
        <section id="tabla_resultado"></section>
      </div>
    </div>
</div>
<div class="panel-body" style="height: 400px;" id="formularioregistros">
  <form action="" name="formulario" id="formulario" method="POST">
    <div class="form-group col-lg-6 col-md-6 col-xs-12">
      <label for="">Nombre</label>
      <input class="form-control" type="hidden" name="idpersona" id="idpersona">
      <input class="form-control" type="hidden" name="tipo_persona" id="tipo_persona" value="Proveedor">
      <input class="form-control" type="text" name="nombre" id="nombre" maxlength="100" placeholder="Nombre del proveedor" required>
    </div>
    <div class="form-group col-lg-6 col-md-6 col-xs-12">
      <label for="">Direccion</label>
      <input class="form-control" type="text" name="direccion" id="direccion" maxlength="70" placeholder="Direccion">
    </div>
    <div class="form-group col-lg-6 col-md-6 col-xs-12">
      <label for="">Telefono</label>
      <input class="form-control" type="text" name="telefono" id="telefono" maxlength="20" placeholder="Número de Telefono">
    </div>
        <div class="form-group col-lg-6 col-md-6 col-xs-12">
      <label for="">Email</label>
      <input class="form-control" type="email" name="email" id="email" maxlength="50" placeholder="Email">
    </div>
    <div class="form-group col-lg-6 col-md-6 col-xs-12">
      <label for="">RFC</label>
      <input class="form-control" type="text" name="rfc" id="rfc" maxlength="50" placeholder="RFC">
    </div>
    <div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <button class="btn btn-primary" type="submit" id="btnGuardar"><i class="fa fa-save"></i>  Guardar</button>

      <button class="btn btn-danger" onclick="cancelarform()" type="button"><i class="fa fa-arrow-circle-left"></i> Cancelar</button>
    </div>
  </form>
</div>
<!--fin centro-->
      </div>
      </div>
      </div>
      <!-- /.box -->

    </section>
    <!-- /.content -->
  </div>
<?php 
}else{
 require 'noacceso.php'; 
}
require 'footer.php';
 ?>
 <script src="scripts/proveedor.js"></script>
 <?php 
}

ob_end_flush();
  ?>
