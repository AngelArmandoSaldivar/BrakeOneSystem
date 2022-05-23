<div class="modal fade" id="myModalProductsEdit" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog" style="width: 95% !important;">
    <div class="modal-content" style="border-radius: 20px;">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">Seleccionar articulos</h4>
      </div>
      <div class="modal-body">
        <div class="panel-body table-responsive">
          <div class="form-group col-lg-10 col-md-8 col-xs-12">
            <section>            
              <center><input class="form-control me-2" type="text" name="busquedaProductEdit" id="busquedaProductEdit" placeholder="Buscar..." style="width:250px; border-radius: 8px; box-shadow: -2px 2px 5px #3300ff99;"></center><br><br>
            </section>
          </div>
          <div class="form-group col-lg-2 col-md-8 col-xs-12">              
            <a data-toggle="modal" href="#agregarProducto">
              <button id="btnAgregarArt" type="button" class="btn btn-primary" onclick="cerrarModalEdit()"><span class="fa fa-plus"></span>Registrar Producto</button>
            </a>
          </div>

          <div class="form-group col-lg-2 col-md-8 col-xs-12">
            <a data-toggle="modal" href="#myModalProductsAlmacenEdit">
              <button id="btnAgregarArt" type="button" class="btn btn-primary" onclick="cerrarModalEdit()"><span class="fa fa-search-plus"></span>Buscar en otro almacen</button>
            </a>
          </div>
          <div id="global">
            <div id="tablaResultadosModal">
              <section id="tabla_resultadoProductoEdit"> </section>
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

<div class="modal fade" id="editProductventa" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog" style="width: 50% !important;">
    <div class="modal-content" style="border-radius: 20px;">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">Editar producto</h4>
      </div>
      <!--<div class="modal-body">-->
      <form action="" name="formularioProductoVenta" id="formularioProductoVenta" method="POST">
        <div class="panel-body table-responsive">
            <div class="form-group col-lg-2 col-md-2 col-xs-6" id="divImpuesto">
              <label for="">ID</label>
              <input class="form-control" type="text" id="idproducto" name="idproducto"></input>
            </div>
            <div class="form-group col-lg-6 col-md-2 col-xs-6" id="divImpuesto">
              <label for="">Descripción </label>
              <textarea class="form-control" id="descripcionEdit" name="descripcionEdit" rows="5" style="width: 280px;" required></textarea>
            </div>
            <div class="form-group col-lg-4 col-md-2 col-xs-6" id="divImpuesto">
              <label for="">Cantidad </label>
              <input class="form-control" type="number" name="cantidadEdit" id="cantidadEdit" required>
            </div>
            <div class="form-group col-lg-4 col-md-2 col-xs-6" id="divImpuesto">
              <label for="">Precio Venta </label>
              <input class="form-control" type="number" name="precio" id="precio" required>
            </div>
        </div>
      </form>
        <div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <button class="btn btn-success" type="submit" name="btnGuardarProductoVenta" onclick="editarGuardarProductoVenta()">Guardar</button>
          <button class="btn btn-danger" type="button" data-dismiss="modal"><i class="fa fa-arrow-circle-left"></i> Cancelar</button>
        </div>
      <!--</div>-->
      <div class="modal-footer">
        <button class="btn btn-default" type="button" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>


<div class="modal fade" id="editProductServicio" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog" style="width: 50% !important;">
    <div class="modal-content" style="border-radius: 20px;">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <div class="form-group col-lg-4 col-md-2 col-xs-6" id="divImpuesto">
          <h4 class="modal-title">Editar producto</h4>
        </div>
        <div class="form-group col-lg-6 col-md-2 col-xs-6" id="divImpuesto">
          <input class="form-control" type="text" id="claveProduct" name="claveProduct" style="border:none; background-color:transparent; color:black"></input>
        </div>
      </div>
      <!--<div class="modal-body">-->
      <form action="" name="formularioProductoServicio" id="formularioProductoServicio" method="POST">
        <div class="panel-body table-responsive">
            <div class="form-group col-lg-2 col-md-2 col-xs-6" id="divImpuesto">
              <label for="">ID</label>
              <input class="form-control" type="text" id="idProducto" name="idProducto"></input>
            </div>
            <div class="form-group col-lg-6 col-md-2 col-xs-6" id="divImpuesto">
              <label for="">Descripción </label>
              <textarea class="form-control" id="descripcionProducto" name="descripcionProducto" rows="5" style="width: 280px;" required></textarea>
            </div>
            <div class="form-group col-lg-4 col-md-2 col-xs-6" id="divImpuesto">
              <label for="">Cantidad </label>
              <input class="form-control" type="number" name="cantidadProducto" id="cantidadProducto" required>
            </div>
            <div class="form-group col-lg-4 col-md-2 col-xs-6" id="divImpuesto">
              <label for="">Precio Venta </label>
              <input class="form-control" type="number" name="precioProducto" id="precioProducto" required>
            </div>
        </div>
      </form>
        <div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <button class="btn btn-success" type="submit" name="btnGuardarProductoServicio" onclick="editarGuardarProductoServicio()">Guardar</button>
          <button class="btn btn-danger" type="button" data-dismiss="modal"><i class="fa fa-arrow-circle-left"></i> Cancelar</button>
        </div>
      <!--</div>-->
      <div class="modal-footer">
        <button class="btn btn-default" type="button" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="editProductRecepcion" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog" style="width: 50% !important;">
    <div class="modal-content" style="border-radius: 20px;">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">Editar producto</h4>
      </div>
      <!--<div class="modal-body">-->
      <form action="" name="formularioProductoRecepcion" id="formularioProductoRecepcion" method="POST">
        <div class="panel-body table-responsive">
            <div class="form-group col-lg-2 col-md-2 col-xs-6" id="divImpuesto">
              <label for="">ID</label>
              <input class="form-control" type="text" id="idProductoRec" name="idProductoRec"></input>
            </div>
            <div class="form-group col-lg-6 col-md-2 col-xs-6" id="divImpuesto">
              <label for="">Descripción </label>
              <textarea class="form-control" id="descripcionProductoRec" name="descripcionProductoRec" rows="5" style="width: 280px;" required></textarea>
            </div>
            <div class="form-group col-lg-4 col-md-2 col-xs-6" id="divImpuesto">
              <label for="">Cantidad </label>
              <input class="form-control" type="number" name="cantidadProductoRec" id="cantidadProductoRec" required>
            </div>
            <div class="form-group col-lg-4 col-md-2 col-xs-6" id="divImpuesto">
              <label for="">Precio </label>
              <input class="form-control" type="number" name="precioProductoRec" id="precioProductoRec" required>
            </div>
        </div>
      </form>
        <div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <button class="btn btn-success" type="submit" name="btnGuardarProductoServicio" onclick="editarGuardarProductoRecepcion()">Guardar</button>
          <button class="btn btn-danger" type="button" data-dismiss="modal"><i class="fa fa-arrow-circle-left"></i> Cancelar</button>
        </div>
      <!--</div>-->
      <div class="modal-footer">
        <button class="btn btn-default" type="button" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="modalAddCobro" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog" style="width: 70% !important;">
    <div class="modal-content" style="border-radius: 20px;">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">Método pago</h4>
      </div>
      <div class="panel-body table-responsive">
        <div class="form-group col-lg-3 col-md-2 col-xs-6" id="">
          <label for="">Fecha </label>
          <input class="form-control" style="border:none; background-color: transparent; padding: 0;" id="" name="" type="" value="<?php echo date("Y-m-d"); ?>" disabled></input>
        </div>
        <div class="form-group col-lg-3 col-md-2 col-xs-6" id="">
          <label for="">Cliente </label>
          <input class="form-control" style="border:none; background-color: transparent; padding: 0;" id="clienteCobro" name="clienteCobro" type=""></input>
        </div>
        <div class="form-group col-lg-3 col-md-2 col-xs-6" id="">
          <label for="">Total </label>
          <input class="form-control" style="border:none; background-color: transparent; padding: 0;" id="totalCobro" name="totalCobro" type=""></input>
        </div>
        <div class="form-group col-lg-3 col-md-2 col-xs-6" id="">
          <label for="">Por pagar </label>
          <input class="form-control" style="border:none; background-color: transparent; padding: 0;" id="porPagar" name="porPagar" type=""></input>
        </div>     
      </div>
      <!--<div class="modal-body">-->
      <form action="" name="formularioAddCobro" id="formularioAddCobro" method="POST">
        <div class="panel-body table-responsive">
            <div class="form-group col-lg-4 col-md-2 col-xs-6" id="divImpuesto">
              <label for="">Importe </label>
              <input class="form-control" type="hidden" name="idpago" id="idpago">
              <input class="form-control" id="importeCobro" name="importeCobro" type="number" placeholder="$" required></input>
            </div>
            <div class="form-group col-lg-4 col-md-6 col-xs-12" id="">
              <label for="">Método pago: </label>
              <select name="metodoPago" id="metodoPago" class="form-control selectpicker" required>
                <option value="" selected disabled hidden>Forma de pago</option>
                <option value="Cheque">CHEQUE</option>
                <option value="Tarjeta">TARJETA</option>
                <option value="Efectivo">EFECTIVO</option>
                <option value="Deposito">DEPÓSITO</option>
                <option value="Tarjeta">TARJETA</option>
                <option value="Transferencia">TRASFERENCIA</option>
              </select>
            </div>
            <div class="form-group col-lg-4 col-md-6 col-xs-12">
              <label for="">Banco(*): </label>
                <select name="banco" id="banco" class="form-control selectpicker">     
                <option value="" selected disabled hidden>Banco</option>                       
                  <option value="IXE">IXE</option>
                  <option value="HSBC">HSBC</option>
                  <option value="BANORTE">BANORTE</option>
                  <option value="BANAMEX">BANCOMER</option>
                  <option value="SANTANDER">SANTANDER</option>
                  <option value="SCOTIA BANK">SCOTIA BANK</option>                    
                </select>
              </div>
            <div class="form-group col-lg-12 col-md-2 col-xs-6" id="divImpuesto">
              <label for="">Referencia </label>
              <textarea class="form-control" id="referenciaCobro" name="referenciaCobro" rows="5" style="width: 100%;"></textarea>
            </div>
        </div>
      </form>
      <div class="panel-body table-responsive">
        <div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <button class="btn btn-success" type="submit" name="btnGuardarCobro" id="btnGuardarCobro" onclick="guardarCobro()">Guardar</button>
          <button class="btn btn-danger" type="button" data-dismiss="modal" onclick="cancelarFormPago()"><i class="fa fa-arrow-circle-left"></i> Cancelar</button>
        </div>
      </div>
      <!--</div>-->
      <div class="modal-footer">
        <button class="btn btn-default" type="button" data-dismiss="modal" onclick="cancelarFormPago()">Cerrar</button>
      </div>
    </div>
  </div>
</div>

<!--MODAL PRODUCTOS DE OTRAS SUCURSALES-->

<div class="modal fade" id="myModalProductsAlmacenEdit" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog" style="width: 95% !important;">
    <div class="modal-content" style="border-radius: 20px;">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">Seleccionar articulos</h4>
      </div>
      <div class="modal-body">
        <div class="panel-body table-responsive">
          <div class="form-group col-lg-10 col-md-8 col-xs-12">
            <section>            
              <center><input class="form-control me-2" type="text" name="busquedaProductAlmacenEdit" id="busquedaProductAlmacenEdit" placeholder="Buscar..." style="width:250px; border-radius: 8px; box-shadow: -2px 2px 5px #3300ff99;"></center><br><br>
            </section>
          </div>
          <div class="form-group col-lg-2 col-md-8 col-xs-12">              
            <a data-toggle="modal" href="#agregarProducto">            
            </a>
          </div>

          <div class="form-group col-lg-2 col-md-8 col-xs-12">
            <a data-toggle="modal" href="#myModalProductsEdit">
              <button id="btnAgregarArt" type="button" class="btn btn-primary" onclick="cerrarSucursalesEdit()"><span class="fa fa-arrow-left"></span> Regresar a mi almacen</button>
            </a>
          </div>
          <div id="global">
            <div id="tablaResultadosModal">
              <section id="tabla_resultadoProductoAlmacenEdit"> </section>
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

<div class="modal fade" id="agregarProductoAlmacen" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="width: 95% !important;">
      <div class="modal-content" style="border-radius: 20px;">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title">Articulos sucursales y/o almacenes</h4>
        </div>
        <div class="modal-body">
          <div class="panel-body table-responsive">
            <div class="form-group col-lg-10 col-md-8 col-xs-12">
              <section>
                <center><input class="form-control me-2" type="text" name="busquedaProductAlmacen" id="busquedaProductAlmacen" placeholder="Buscar..." style="width:250px; border-radius: 8px; box-shadow: -2px 2px 5px #3300ff99;"></center><br><br>
              </section>
            </div>
            <div class="form-group col-lg-2 col-md-8 col-xs-12">              
            <a data-toggle="modal" href="#myModal">
              <button id="btnAgregarArt" type="button" class="btn btn-primary" onclick="regresarMiSucursal()"><span class="fa fa-arrow-left"></span> Regresar a mi almacen</button>
            </a>
          </div>
          <div id="global">
            <div id="tablaResultadosModal">
              <section id="tabla_resultadoProducto_almacen"> </section>
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

  <!--Modal registrar nuevo producto-->
  <div class="modal fade" id="agregarProducto" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="width: 80% !important; box-shadow:5px 5px 5px 5px rgba(0, 0, 0, 0.2);">
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
              <label for="">Descripción(*):</label>
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
              <label for="">Precio Público</label>
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
              <input class="form-control" type="text" name="barcode" id="barcode" placeholder="Código del producto" >              
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



