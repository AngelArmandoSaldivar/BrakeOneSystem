<?php 
//activamos almacenamiento en el buffer
ob_start();
session_start();
if (!isset($_SESSION['nombre'])) {
  header("Location: login.html");
}else{

require 'header.php';
if ($_SESSION['accesos']==1) {
 ?>
    <div class="content-wrapper">    
      <section class="content">      
        <div class="row">
          <div class="col-md-12">
            <div class="box">
              <div class="box-header with-border">
                <h1 class="box-title">Usuarios <button class="btn btn-success" onclick="mostrarform(true)" id="btnagregar"><i class="fa fa-plus-circle"></i>Agregar</button></h1>
                  <div class="box-tools pull-right">    
                  </div>
              </div>

              <div class="panel-body table-responsive" id="listadoregistros">
                <section>
                  <center><input class="form-control me-2" type="text" name="busqueda" id="busqueda" placeholder="Buscar..." style="width:250px"></center><br><br>
                </section>            
                <section id="tabla_resultado"></section>
              </div> 
              <div class="panel-body" id="formularioregistros">
                <form action="" name="formulario" id="formulario" method="POST">
                  <div class="form-group col-lg-6 col-md-12 col-xs-12">
                    <label for="">Nombre(*):</label>
                    <input class="form-control" type="hidden" name="idusuario" id="idusuario">
                    <input class="form-control" type="text" name="nombre" id="nombre" maxlength="100" placeholder="Nombre" required>
                  </div>
                  <!-- <div class="form-group col-lg-6 col-md-6 col-xs-12">
                    <label for="">Tipo Documento(*):</label>
                    <select name="tipo_documento" id="tipo_documento" class="form-control select-picker" required>
                      <option value="DNI">DNI</option>
                      <option value="RUC">RUC</option>
                      <option value="CEDULA">CEDULA</option>
                    </select>
                  </div> -->
                  <!-- <div class="form-group col-lg-6 col-md-6 col-xs-12">
                    <label for="">Numero de Documento(*):</label>
                    <input type="text" class="form-control" name="num_documento" id="num_documento" placeholder="Documento" maxlength="20">
                  </div> -->
                  <div class="form-group col-lg-6 col-md-6 col-xs-12">
                    <label for="">Direccion</label>
                    <input class="form-control" type="text" name="direccion" id="direccion"  maxlength="70">
                  </div>
                  <div class="form-group col-lg-6 col-md-6 col-xs-12">
                    <label for="">Telefono</label>
                    <input class="form-control" type="text" name="telefono" id="telefono" maxlength="20" placeholder="Número de telefono">
                  </div>
                  <div class="form-group col-lg-6 col-md-6 col-xs-12">
                    <label for="">Email: </label>
                    <input class="form-control" type="email" name="email" id="email" maxlength="70" placeholder="email">
                  </div>
                  <div class="form-group col-lg-6 col-md-6 col-xs-12">
                    <label for="">Cargo</label>
                    <input class="form-control" type="text" name="cargo" id="cargo" maxlength="20" placeholder="Cargo">
                  </div>
                  <div class="form-group col-lg-6 col-md-6 col-xs-12">
                    <label for="">Nivel de usuario</label>
                    <select name="idNivelUsuario" id="idNivelUsuario" class="form-control selectpicker">
                      <option value="" disabled selected>Nivel de usuario</option>
                      <option value="admin">Administrador</option>
                      <option value="mostrador">Mostrador</option>
                      <option value="manager">Manager</option>
                    </select>
                  </div>
                  <div class="form-group col-lg-6 col-md-6 col-xs-12">
                    <label for="">Login(*):</label>
                    <input class="form-control" type="text" name="login" id="login" maxlength="20" placeholder="nombre de usuario" required>
                  </div>
                  <div class="form-group col-lg-6 col-md-6 col-xs-12">
                    <label for="">Clave(*):</label>
                    <input class="form-control" type="password" name="clave" id="clave" maxlength="64" placeholder="Clave">
                  </div>
                  <div class="form-group col-lg-6 col-md-8 col-xs-12">
                    <label for="">Sucursal(*):</label>
                    <select name="idsucursal" id="idsucursal" class="form-control selectpicker" data-live-search="true" required>
                    </select>
                  </div>
                  <div class="form-group col-lg-6 col-md-6 col-xs-12">
                    <label>Permisos</label>
                    <ul id="permisos" style="list-style: none;">
                      
                    </ul>
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
 <script src="scripts/usuarios.js"></script>
 <?php 
}

ob_end_flush();
  ?>
