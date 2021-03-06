<?php
//activamos almacenamiento en el buffer
require "../config/Conexion.php";
ob_start();
session_start();
if (!isset($_SESSION['nombre'])) {
  header("Location: login.html");
}else{

require 'header.php';

if ($_SESSION['servicios']==1) {

 ?>
<div class="content-wrapper">
      <!-- Main content -->
  <section class="content">
        <!-- Default box -->
    <div class="row">
      <div class="col-md-12">
        <div class="box" style="box-shadow: 5px 7px 10px #3300ff99;border-radius: 16px;">
          <div class="box-header with-border">
            <center><h4 class="box-title">Cotizaciones </h4></center>
            <div class="box-tools pull-right"></div>          
            <div class="panel-body table-responsive" id="listadoregistros">
              <section>
                <div class="form-group col-lg-4 col-md-6 col-xs-12">
                  <button title="Registrar"  id="btnagregarservicio" title='Editar' data-toggle='popover' data-trigger='hover' data-content='Registrar nuevo servicio' data-placement='right' class='btn btn-success' onclick="crearCotizacion()"><i class="fa fa-plus-circle"></i> Agregar Nuevo</button>
                </div>
                <div class="form-group col-lg-4 col-md-6 col-xs-12">
                  <center><input class="form-control me-2" type="text" name="busqueda" id="busqueda" placeholder="Buscar..." style="width:250px; border-radius: 8px; box-shadow: -2px 2px 5px #3300ff99;"></center>
                </div>
              </section>
              <div class="form-group col-lg-4 col-md-6 col-xs-12">
                <div class="loaderSearch">
                  <img src="../files/images/loader.gif" alt="" width="35px">
                </div>
              </div>
              <div class="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <label>Fecha Inicio</label>
                <input type="date" class="form-control" name="fecha_inicio" id="fecha_inicio" value="">
              </div>
              <div class="form-group col-lg-4 col-md-6 col-sm-6 col-xs-12">
                <label>Fecha Fin</label>
                <input type="date" class="form-control" name="fecha_fin" id="fecha_fin" value="">
              </div>          
            <div class="form-group col-lg-2 col-md-6 col-xs-12" style="text-align:left;">
              <label>Limite de registros</label>
              <select name="limite_registros" id="limite_registros" class="form-control selectpicker" >
                <option value="" disabled selected>Seleccionar limite</option>                  
                <option value="50">50 / Registros</option>
                <option value="100">100 / Registros</option>
                <option value="200">200 / Registros</option>
                <option value="500">500 / Registros</option>
                <option value="1000">1000 / Registros</option>
              </select>
            </div>
            <div id="global">
              <div id="tablaResultados">
                <section id="tabla_resultado"></section>
              </div>
            </div>
            <div class="form-group col-lg-12 col-md-6 col-xs-12">
              <nav aria-label="Page navigation example" style="text-align:right; margin-right:5px">
                <ul class="pagination">
                  <input type="button" title="Anterior" data-toggle='popover' data-trigger='hover' data-content='Pagina anterior' data-placement='top' class='btn btn-primary me-md-2' value="Anterior" id="anterior" name="anterior" onclick="paginaAnterior();">
                    <li class="page-item"><input title="Pagina" data-toggle='popover' data-trigger='hover' data-content='Pagina actual' data-placement='top' class='btn btn-primary me-md-2' type="submit" id="pagina" name="pagina" value="1" onclick="paginasClick(<?php echo $i;?>)"></li>
                  <input type="submit" title="Siguiente" data-toggle='popover' data-trigger='hover' data-content='Pagina siguiente' data-placement='top' class='btn btn-primary me-md-2' value="Siguiente" id="siguiente" name="siguiente" onclick="paginaSiguiente()">                
                </ul>
              </nav>
            </div>
          </div>   
          <div class="box-header with-border" id="formularioregistros">
            <div class="panel-body table-responsive">   
              <form action="" name="formulario" id="formulario" method="POST">
                <div class="form-group col-lg-12 col-md-6 col-xs-12">
                  <center><h4 aling="center">Informaci??n del cliente</h4></center>
                </div>
                <div class="form-group col-lg-4 col-md-8 col-xs-12">
                <label for="">Cliente(*):</label>
                <input class="form-control" type="hidden" name="idservicio" id="idservicio">
                <select name="idcliente" id="idcliente" class="form-control selectpicker" data-live-search="true" required>                  
                </select>
              </div>
              <div class="loader form-group col-lg-1 col-md-8 col-xs-12" style="margin-top: 15px;">
                  <img src="../files/images/loader.gif" alt="" width="50px;">
              </div>
              <div class="form-group col-lg-2 col-md-4 col-xs-12" id="addCliente">
                <label for="">Agregar Cliente</label><br>
                  <a data-toggle="modal" href="#agregarCliente">
                    <button id="btnAgregarClient" type="button" class="btn btn-primary"><span class="fa fa-plus"></span>Agregar Cliente</button>
                  </a>
              </div>

              <div class="form-group col-lg-2 col-md-2 col-xs-6" id="divImpuesto">
                <label for="">RFC: </label>
                <input class="form-control" type="text" name="rfc" id="rfc">
              </div>

              <div class="form-group col-lg-4 col-md-2 col-xs-6" id="divImpuesto">
                <label for="">Direcci??n: </label>
                <input class="form-control" type="text" name="direccion" id="direccion">
              </div>

              <div class="form-group col-lg-2 col-md-2 col-xs-6" id="divImpuesto">
                <label for="">Tipo de precio: </label>
                <input class="form-control" type="text" name="tipoPrecio" id="tipoPrecio">
              </div>

              <div class="form-group col-lg-3 col-md-2 col-xs-6" id="divImpuesto">
                <label for="">Email: </label>
                <input class="form-control" type="text" name="email" id="email">
              </div>

              <div class="form-group col-lg-2 col-md-2 col-xs-6" id="divImpuesto">
                <label for="">N??mero m??vil: </label>
                <input class="form-control" type="text" name="telefono" id="telefono">
              </div>

              <div class="form-group col-lg-2 col-md-2 col-xs-6" id="divImpuesto">
                <label for="">D??as Cr??dito: </label>
                <input class="form-control" type="text" name="credito" id="credito">
              </div>

              <input type="hidden" id="idclient" name="idclient" value="" style="border:none; color:white;">

              <div class="form-group col-lg-12 col-md-6 col-xs-12">
                <center><h4 aling="center">Detalles cotizaci??n</h4></center>
              </div>
              <div class="form-group col-lg-2 col-md-4 col-xs-12">
                <label for="">Fecha(*): </label>
                <input class="form-control" type="date" name="fecha_hora" id="fecha_hora" required>
              </div>
              <div class="form-group col-lg-2 col-md-6 col-xs-12">
                <label for="">Tipo Comprobante(*): </label>
                  <select name="tipo_comprobante" id="tipo_comprobante" class="form-control selectpicker" required>                    
                    <option value="Factura">Factura</option>
                  </select>
              </div>
              <div class="form-group col-lg-2 col-md-2 col-xs-6">
                <label for="">Impuesto: </label>
                <input class="form-control" type="text" name="impuesto" id="impuesto">
              </div>

              <div class="form-group col-lg-2 col-md-6 col-xs-12">
                <label for="">Tipo de precio </label>
                  <select name="tipo_precio" id="tipo_precio" class="form-control selectpicker">
                  <option value="" disabled selected>Tipo Precio</option>
                    <option value="publico">Publico / Mostrador</option>
                    <option value="taller">Taller</option>
                    <option value="credito_taller">Credito Taller</option>
                    <option value="mayoreo">Mayoreo</option>
                  </select>
              </div>
                
                <div class="form-group col-lg-2 col-md-4 col-xs-12" id="estatus"> 
                  <a data-toggle="modal" href="#editarDetalleVenta">                   
                    <button class="btn btn-primary" type="submit" id="" onclick="mostrarDetalleServicioEdit()">Editar</button>
                  </a>
                </div>
              
              <div class="form-group col-lg-12 col-md-6 col-xs-12">
                    <center><h4 aling="center">Informaci??n de auto</h4></center>
              </div>

              <div class="form-group col-lg-4 col-md-2 col-xs-6" id="divImpuesto">
                <label for="">Automovil: </label>
                <select name="idauto" id="idauto" class="form-control selectpicker" data-live-search="true">
                  <option value="" disabled selected>Seleccionar auto</option>
                </select>
              </div>

              <div class="form-group col-lg-8 col-md-2 col-xs-6" id="divImpuesto">
                <label for="">Agregar auto</label><br>
                <a data-toggle="modal" href="#addAuto">
                  <button id="btnAgregarAuto" type="button" class="btn btn-primary"><span class="fa fa-plus"></span>Agregar Auto</button>
                </a>
              </div>

              <div class="loaderInfoAuto form-group col-lg-1 col-md-8 col-xs-12" style="margin-top: 15px;">
                  <img src="../files/images/loader.gif" alt="" width="50px;">
              </div>

              <div class="form-group col-lg-2 col-md-2 col-xs-6">
                <label for="">Placas: </label>
                <input class="form-control" type="text" name="placas" id="placas" placeholder="Placas">
              </div>
              <div class="form-group col-lg-2 col-md-2 col-xs-6">
                <label for="">Marca: </label>
                <input class="form-control" type="text" name="marcaAuto" id="marcaAuto" placeholder="Marca">
              </div>
              <div class="form-group col-lg-2 col-md-2 col-xs-6">
                <label for="">Modelo: </label>
                <input class="form-control" type="text" name="modelo" id="modelo"  placeholder="Modelo">
              </div>
              <div class="form-group col-lg-2 col-md-2 col-xs-6">
                <label for="">A??o: </label>
                <input class="form-control" type="number" name="ano" id="ano" min="1000"  placeholder="yyyy">
              </div>
              <div class="form-group col-lg-2 col-md-2 col-xs-6">
                <label for="">Color: </label>
                <input class="form-control" type="text" name="color" id="color"  placeholder="Color">
              </div>
              <div class="form-group col-lg-2 col-md-2 col-xs-6">
                <label for="">Kms: </label>
                <input class="form-control" type="number" name="kms" id="kms" min="1"  placeholder="Kms">
              </div>

              <div class="form-group col-lg-6 col-md-3 col-sm-6 col-xs-12">
                <a data-toggle="modal" href="#myModal" id="btnAddArt">
                  <button id="btnAgregarArt" name="btnAgregarArt" type="button" class="btn btn-primary" required><span class="fa fa-plus"></span>Agregar Articulos</button>
                </a>
              </div>

              <div class="form-group col-lg-8 col-md-3 col-sm-6 col-xs-12" id="btnAgregarArticulosEdit">
                <a data-toggle="modal" href="#myModalProductsEdit">
                  <button id="btnAgregarArticulosEdit" type="button" class="btn btn-primary"><span class="fa fa-plus"></span>Agregar Articulos</button>
                </a>
              </div>

              <div class="form-group col-lg-12 col-md-12 col-xs-12">    
              <div class="form-group col-lg-12 col-md-6 col-xs-12">
                    <center><h4 aling="center">Productos servicio</h4></center>
                  </div>
                <div class="panel-body table-responsive">
                <table id="detalles" class="table table-striped table-bordered table-condensed table-hover">
                  <thead style="background-color:#A9D0F5; font-size: 12px;">
                    <th>Opciones</th>                    
                    <th>Clave</th>
                    <th>Fmsi</th>
                    <th>Marca</th>
                    <th>Descripci??n</th>
                    <th>Cantidad</th>
                    <th>Precio Venta</th>
                    <th>Descuento</th>
                    <th>Subtotal</th>
                    <th>Acciones</th>
                  </thead>
                  <tfoot style="background-color:#A9D0F5">                    
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th>TOTAL</th>
                    <th><h5 id="total">$ 0.00</h5><input type="hidden" name="total_cotizacion" id="total_cotizacion"></th>
                    <th></th>
                  </tfoot>
                  <tbody>                
                  </tbody>
                </table>
                
                </div>
              </div>
              <div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <button class="btn btn-primary" type="submit" id="btnGuardar"><i class="fa fa-save"></i>  Guardar</button>
                <!--<button class="btn btn-danger" onclick="cancelarform()" type="button" id="btnCancelar"><i class="fa fa-arrow-circle-left"></i> Cancelar</button>-->
                <button class="btn btn-info" onclick="salirForm()" type="button" id="btnRegresar"><i class="fa fa-arrow-circle-left"></i> Regresar</button>
                <?php 
                  require('loader.php');
                ?>
          </div>                         
        </div>
      </div>
    </div>
  </section>
</div>


<?php 
  require("ediciones.php");
?>


  <!--Modal-->
  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" style="width: 95% !important;">
      <div class="modal-content" style="border-radius: 20px;">
        <div class="modal-header">
          <h4 class="modal-title">Seleccione un Articulo</h4>
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>          
        </div>
        <div class="modal-body">
        <div class="panel-body table-responsive">

        <div class="form-group col-lg-4 col-md-8 col-xs-12">              
            <a data-toggle="modal" href="#agregarProducto">
              <button id="btnAgregarArt" type="button" class="btn btn-primary" onclick="cerrarModal()"><span class="fa fa-plus"></span> Registrar Producto</button>
            </a>
          </div>

          <div class="form-group col-lg-4 col-md-8 col-xs-12">
            <section>            
              <center><input class="form-control me-2" type="text" name="busquedaProduct" id="busquedaProduct" placeholder="Buscar..." style="width:250px; border-radius: 8px; box-shadow: -2px 2px 5px #3300ff99;"></center><br><br>
            </section>
          </div>
          <div class="form-group col-lg-4 col-md-8 col-xs-12"  style="text-align:right">              
            <a data-toggle="modal" href="#agregarProductoAlmacen">
              <button id="btnAgregarArt" type="button" class="btn btn-primary" onclick="cerrarModal()"><span class="fa fa-search-plus"></span> Buscar en otro almacen</button>
            </a>
          </div>
          <div id="global">
            <div id="tablaResultadosModal">
              <section id="tabla_resultadoProducto"> </section>
            </div>
          </div>
        </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-default" type="button" data-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
  <!-- fin Modal-->

  <!--Modal registrar nuevo cliente-->
  <div class="modal fade" id="agregarCliente" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" style="width: 100% !important; box-shadow:5px 5px 5px 5px rgba(0, 0, 0, 0.2);">
      <div class="modal-content" style="border-radius: 20px;">
        <div class="modal-header">
          <h4 class="modal-title">Registrar Cliente</h4>
          <button name="addProduct" type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>          
        </div>
        <div class="modal-body">
          <div class="panel-body table-responsive">
            <form action="" name="formCliente" id="formCliente" method="POST">
              <div class="form-group col-lg-6 col-md-6 col-xs-12">
                <label for="">Nombre</label>
                <input class="form-control" type="hidden" name="idpersona" id="idpersona">
                <input class="form-control" type="hidden" name="tipo_persona" id="tipo_persona" value="Cliente">
                <input class="form-control" type="text" name="nombre" id="nombre" maxlength="100" placeholder="Nombre del cliente" required>
              </div>
              <div class="form-group col-lg-6 col-md-6 col-xs-12">
                <label for="">Direccion</label>
                <input class="form-control" type="text" name="direccionCliente" id="direccionCliente" maxlength="70" placeholder="Direccion">
              </div>
              <div class="form-group col-lg-6 col-md-6 col-xs-12">
                <label for="">Telefono</label>
                <input class="form-control" type="text" name="telefonoCliente" id="telefonoCliente" maxlength="20" placeholder="N??mero de Telefono" required>
              </div>
              <div class="form-group col-lg-6 col-md-6 col-xs-12">
                <label for="">Telefono local</label>
                <input class="form-control" type="text" name="telefono_localCliente" id="telefono_localCliente" maxlength="20" placeholder="N??mero de Telefono">
              </div>
              <div class="form-group col-lg-6 col-md-6 col-xs-12">
                <label for="">Email</label>
                <input class="form-control" type="email" name="emailCliente" id="emailCliente" maxlength="50" placeholder="Email">
              </div>
              <div class="form-group col-lg-4 col-md-6 col-xs-12">
                <label for="">RFC</label>
                <input class="form-control" type="text" name="rfcCliente" id="rfcCliente" placeholder="RFC">
              </div>
              <div class="form-group col-lg-4 col-md-6 col-xs-12">
                <label for="">D??as de cr??dito</label>
                <input class="form-control" type="number" name="creditoCliente" id="creditoCliente" min="0" placeholder="Cr??dito">
              </div>
              <div class="form-group col-lg-4 col-md-12 col-xs-12">
                <label for="">Tipo de precio(*): </label>
                <select name="tipo_precioCliente" id="tipo_precioCliente" class="form-control selectpicker" required>     
                  <option value="publico">Publico</option>
                  <option value="taller">Taller</option>
                  <option value="credito_taller">Cr??dito Taller</option>
                  <option value="mayoreo">Mayoreo</option>
                </select>
              </div>
            </form>
            <div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <button class="btn btn-success" type="submit" name="btnGuardarProveedor" onclick="guardarCliente()">Guardar</button>
              <button class="btn btn-danger" type="button" data-dismiss="modal"><i class="fa fa-arrow-circle-left" onclick="cancelarCli()"></i> Cancelar</button>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-default" type="button" data-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- fin Modal-->

  <!--Modal registrar nuevo producto-->
  <div class="modal fade" id="agregarProducto" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" style="width: 80% !important; box-shadow:5px 5px 5px 5px rgba(0, 0, 0, 0.2);">
      <div class="modal-content" style="border-radius: 20px;">
        <div class="modal-header">
          <button name="addProduct" type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title">Registrar Producto</h4>
        </div>
        <div class="modal-body">
        <div class="modal-body">
          <div class="panel-body table-responsive">

          <form action="" name="formularioProduct" id="formularioProduct" method="POST">
            <!--CLAVE DEL PRODUCTO-->
            <div class="form-group col-lg-4 col-md-6 col-xs-12">
              <label for="">Clave(*):</label>
              <input class="form-control" type="hidden" name="idarticulo" id="idarticulo">
              <input class="form-control" type="text" name="codigo" id="codigo" maxlength="100" placeholder="Clave" required>
            </div>


            <!--CLAVE DEL PRODUCTO-->
            <div class="form-group col-lg-4 col-md-6 col-xs-12">
              <label for="">Fmsi(*):</label>
              <input class="form-control" type="text" name="fmsi" id="fmsi" maxlength="100" placeholder="Fmsi">
            </div>


            <!--CATEGORIA DEL PRODUCTO-->
            <div class="form-group col-lg-4 col-md-6 col-xs-12">
              <label for="">Categoria(*):</label>
              <select name="idcategoria" id="idcategoria" class="form-control selectpicker" data-Live-search="true" required>

              <?php 
              
                $sql="SELECT * FROM categoria";
                $result = ejecutarConsulta($sql);

                while($row = $result->fetch_assoc()) {
                  echo "<option value='$row[idcategoria]'>$row[nombre]</option>";
                }
              
              ?>
              </select>
            </div>

            <!--MARCA DEL PRODUCTO-->
            <div class="form-group col-lg-6 col-md-6 col-xs-12">
              <label for="">Marca(*):</label>
              <input class="form-control" type="text" name="marca" id="marca" maxlength="100" placeholder="Marca" required>
            </div>

            <!--PROVEEDOR DEL PRODUCTO-->
            <div class="form-group col-lg-6 col-md-8 col-xs-12">
              <label for="">Proveedor(*):</label>
              <select name="idproveedor" id="idproveedor" class="form-control selectpicker" data-live-search="true" required>
                <?php 
                  $sql="SELECT * FROM persona WHERE tipo_persona='Proveedor'";
                  $result = ejecutarConsulta($sql);

                  while($row = $result->fetch_assoc()) {
                    echo "<option value='$row[idpersona]'>$row[nombre]</option>";
                  }
              
                ?>
              </select>
            </div>  

            <div class="form-group col-lg-12 col-md-6 col-xs-12">
              <label for="">Descripci??n(*):</label>
              <input class="form-control" type="text" name="descripcion" id="descripcion" maxlength="500" placeholder="Unidades (JUEGO / SET / PIEZA)" required>
            </div> 

            <!--UNIDADES DEL PRODUCTO-->
            <div class="form-group col-lg-4 col-md-6 col-xs-12">
              <label for="">Unidades(*):</label>
              <input class="form-control" type="text" name="unidades" id="unidades" maxlength="50" placeholder="Unidades (JUEGO / SET / PIEZA)" required>
            </div>    

            <!--STOCK DEL PRODUCTO-->
              <div class="form-group col-lg-4 col-md-6 col-xs-12">
              <label for="">Stock</label>
              <input class="form-control" type="number" name="stock" id="stock"  required>
            </div>    

            <!--PASILLO DEL PRODUCTO-->
            <div class="form-group col-lg-4 col-md-6 col-xs-12">
              <label for="">Pasillo(*):</label>
              <input class="form-control" type="text" name="pasillo" id="pasillo" maxlength="50" placeholder="Pasillo / Corredor" required>
            </div>

            <!--COSTOS DEL PRODUCTO-->
            <div class="form-group col-lg-2 col-md-6 col-xs-12">
              <label for="">Costo</label>
              <input class="form-control" type="number" name="costo" id="costo"  required placeholder="$">
            </div>
            <div class="form-group col-lg-2 col-md-6 col-xs-12">
              <label for="">Precio P??blico</label>
              <input class="form-control" type="number" name="publico" id="publico"  required placeholder="$">
            </div>
            <div class="form-group col-lg-2 col-md-6 col-xs-12">  
              <label for="">Precio Taller</label>
              <input class="form-control" type="number" name="taller" id="taller"  required placeholder="$">
            </div>
            <div class="form-group col-lg-2 col-md-6 col-xs-12">
              <label for="">Precio Credito Taller</label>
              <input class="form-control" type="number" name="credito_taller" id="credito_taller"  required placeholder="$">
            </div>
            <div class="form-group col-lg-2 col-md-6 col-xs-12">
              <label for="">Mayoreo</label>
              <input class="form-control" type="number" name="mayoreo" id="mayoreo"  required placeholder="$">
            </div>    

            <div class="form-group col-lg-6 col-md-6 col-xs-12">
              <label for="">Codigo barras:</label>
              <input class="form-control" type="text" name="barcode" id="barcode" placeholder="C??digo del producto" >              
            </div>            
          </form>

          <div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <button class="btn btn-success" type="submit" name="btnGuardarProveedor" onclick="guardaryeditarProducto()">Guardar</button>
            <button class="btn btn-danger" type="button" data-dismiss="modal"><i class="fa fa-arrow-circle-left"></i> Cancelar</button>
          </div>
          </div>
        </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-default" type="button" data-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
  <!-- fin Modal-->

  <!--A??ADIR AUTO-->
<div class="modal fade" id="addAuto" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" align="center">
  <div class="modal-dialog modal-lg" style="width: 75% !important;">
    <div class="modal-content" style="border-radius: 20px;">
      <div class="modal-header">
      <h4 class="modal-title">Agregar automovil</h4>
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>        
      </div>
      <div class="modal-body">
        <div class="panel-body table-responsive">
          <div class="form-group col-lg-4 col-md-6 col-xs-12">
            <label for="">Placas</label>
            <input class="form-control" type="text" name="placasAdd" id="placasAdd" placeholder="Placas" value="" required>
          </div>

          <div class="form-group col-lg-4 col-md-6 col-xs-12">
            <label for="">Marca</label>
            <input class="form-control" type="text" name="marcaAdd" id="marcaAdd" placeholder="Marca" value="" required>
          </div>

          <div class="form-group col-lg-4 col-md-6 col-xs-12">
            <label for="">Modelo</label>
            <input class="form-control" type="text" name="modeloAdd" id="modeloAdd" placeholder="Modelo" value="" required>
          </div>

          <div class="form-group col-lg-4 col-md-6 col-xs-12">
            <label for="">A??o</label>
            <input class="form-control" type="text" name="anoAdd" id="anoAdd" placeholder="A??o" value="" required>
          </div>

          <div class="form-group col-lg-4 col-md-6 col-xs-12">
            <label for="">Color</label>
            <input class="form-control" type="text" name="colorAdd" id="colorAdd" placeholder="Color" value="" required>
          </div>

          <div class="form-group col-lg-4 col-md-6 col-xs-12">
            <label for="">Kms</label>
            <input class="form-control" type="number" name="kmsAdd" id="kmsAdd" min="0" placeholder="Kms" value="" required>
          </div>
          <div class="form-group col-lg-2 col-md-3 col-sm-6 col-xs-12" id="">
            <button id="btnAgregar" type="button" class="btn btn-primary" onclick="guardarAuto()" data-dismiss="modal"><span class="fa fa-plus"></span>Agregar</button>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-default" type="button" data-dismiss="modal" onclick="limpiarFormAuto()">Cerrar</button>
      </div>
    </div>
  </div>
</div>

<?php 
}else{
 require 'noacceso.php'; 
}

require 'footer.php';
 ?>
 <script src="scripts/cotizaciones.js"></script>
 <?php 
}

ob_end_flush();
  ?>

