<?php 
require_once "../modelos/Articulo.php";

if(!isset($_SESSION["nombre"])) {
	$articulo=new Articulo();
	session_start();
	$idsucursal = $_SESSION['idsucursal'];
	$acceso = $_SESSION['acceso'];

	$idarticulo=isset($_POST["idarticulo"])? limpiarCadena($_POST["idarticulo"]):"";
	$idcategoria=isset($_POST["idcategoria"])? limpiarCadena($_POST["idcategoria"]):"";
	$idproveedor=isset($_POST["idproveedor"])? limpiarCadena($_POST["idproveedor"]):"";
	$codigo=isset($_POST["codigo"])? limpiarCadena($_POST["codigo"]):"";
	$barcode=isset($_POST["barcode"])? limpiarCadena($_POST["barcode"]):"";
	$pasillo=isset($_POST["pasillo"])? limpiarCadena($_POST["pasillo"]):"";
	$unidades=isset($_POST["unidades"])? limpiarCadena($_POST["unidades"]):"";
	$fmsi=isset($_POST["fmsi"])? limpiarCadena($_POST["fmsi"]):"";
	$nombre=isset($_POST["nombre"])? limpiarCadena($_POST["nombre"]):"";
	$marca=isset($_POST["marca"])? limpiarCadena($_POST["marca"]):"";
	$costo=isset($_POST["costo"])? limpiarCadena($_POST["costo"]):"";
	$publico=isset($_POST["publico"])? limpiarCadena($_POST["publico"]):"";
	$taller=isset($_POST["taller"])? limpiarCadena($_POST["taller"]):"";
	$credito_taller=isset($_POST["credito_taller"])? limpiarCadena($_POST["credito_taller"]):"";
	$mayoreo=isset($_POST["mayoreo"])? limpiarCadena($_POST["mayoreo"]):"";
	$stock=isset($_POST["stock"])? limpiarCadena($_POST["stock"]):"";	
	$descripcion=isset($_POST["descripcion"])? limpiarCadena($_POST["descripcion"]):"";
	$imagen=isset($_POST["imagen"])? limpiarCadena($_POST["imagen"]):"";

	switch ($_GET["op"]) {
		case 'guardaryeditar':
			if (!file_exists($_FILES['imagen']['tmp_name'])|| !is_uploaded_file($_FILES['imagen']['tmp_name'])) {
				$imagen=$_POST["imagenactual"];
			}else{
				$ext=explode(".", $_FILES["imagen"]["name"]);
				if ($_FILES['imagen']['type']=="image/jpg" || $_FILES['imagen']['type']=="image/jpeg" || $_FILES['imagen']['type']=="image/png") {
					$imagen=round(microtime(true)).'.'. end($ext);
					move_uploaded_file($_FILES["imagen"]["tmp_name"], "../files/articulos/".$imagen);
				}
			}
			if (empty($idarticulo)) {
				$rspta=$articulo->insertar($codigo,$costo, $barcode, $credito_taller, $descripcion, $fmsi, $idcategoria, $idproveedor,$marca, $mayoreo, $pasillo, $publico, $stock, $taller, $unidades, $idsucursal, $imagen);			
				echo $rspta;
				echo $rspta ? "Articulo registrado correctamente" : "No se registro correctamente";
			}else{
				$rspta=$articulo->editar($idarticulo,$codigo,$costo, $barcode, $credito_taller, $descripcion, $fmsi, $idcategoria, $idproveedor,$marca, $mayoreo, $pasillo, $publico, $stock, $taller, $unidades, $imagen);
				echo $rspta ? " Articulo actualizado correctamente" : "No se pudo actualizar los datos";
			}
		break;
		case 'copiarBusqueda':
			$consulta = $articulo->filtroArticulosCopy("");
			if(!empty($_POST['busquedaCopy'])) {
				$termino=$conexion->real_escape_string($_POST['busquedaCopy']);
				usleep(100000);
				$consulta=$articulo->filtroArticulosCopy($termino);
			}
			$consultaBD=$consulta;
			//2000000
			$array = [];
			if($consultaBD->num_rows>=1){
				while($fila=$consultaBD->fetch_object()){
					if($fila->stock >= 1) {
						array_push($array, $fila);
						//echo json_encode($fila);
					}					
				}
				echo json_encode($array);
			}
			break;
		case 'guardarSolicitud':
			$idarticulo=$_GET['idarticulo'];
			$marca=$_GET['marca'];
			$clave=$_GET['clave'];
			$cantidad=$_GET['cantidad'];
			$fecha=$_GET['fecha'];
			$estadoPedido=$_GET['estadoPedido'];
			$nota=$_GET['nota'];
			$fecha_registro=$_GET['fecha_registro'];

			$rspta=$articulo->guardarPedido($clave, $marca, $cantidad, $fecha, $estadoPedido, $nota, $fecha_registro);
			echo $rspta ? "Se guardo correctamente el pedido" : "No se pudo guardar el pedido";
			break;
		case 'desactivar':
			$rspta=$articulo->desactivar($idarticulo);
			echo $rspta ? "Datos desactivados correctamente" : "No se pudo desactivar los datos";
		break;
		case 'activar':
			$rspta=$articulo->activar($idarticulo);
			echo $rspta ? "Datos activados correctamente" : "No se pudo activar los datos";
		break;	
		case 'mostrar':
			$rspta=$articulo->mostrar($idarticulo);
			echo json_encode($rspta);
			break;	
		case 'listarArticulos': 
			$array = array();
			$rspta=$articulo->listarArticulos();			
			while ($reg=$rspta->fetch_object()) {
				array_push($array, $reg->codigo);
			}
			//$arrayData = implode(',', $array);
			echo json_encode($array);
			break;

		case 'listar':							

			$cantidad = '';			
			$termino= "";
									
			$consulta = $articulo->articulosPagination(50, 0, "");

			if(!empty($_POST['articulos']) && empty($_POST['limites']) && empty($_POST['inicio_registros']) && empty($_POST["total_registros"])) {				
				$termino=$conexion->real_escape_string($_POST['articulos']);
				usleep(100000);								
				$consulta=$articulo->articulosPagination(50,0, $termino);

			} 
			else if(!empty($_POST['articulos']) && !empty($_POST['limites'])) {	
				usleep(100000);								
				$termino=$conexion->real_escape_string($_POST['articulos']);
				$limites=$conexion->real_escape_string($_POST['limites']);
				$consulta=$articulo->articulosPagination($limites,0, $termino);

			} else if(!empty($_POST['busqueda']) && !empty($_POST['inicio_registros']) && !empty($_POST["total_registros"])) {								
				usleep(100000);				
				$busqueda=$conexion->real_escape_string($_POST['busqueda']);
				$inicio=$conexion->real_escape_string($_POST['inicio_registros']);
				$fin=$conexion->real_escape_string($_POST['total_registros']);				
				$consulta=$articulo->articulosPagination($fin,$inicio, $busqueda);

			} else if(!empty($_POST['inicio_registros']) && !empty($_POST["total_registros"])) {
				usleep(100000);				
				$inicio=$conexion->real_escape_string($_POST['inicio_registros']);
				$fin=$conexion->real_escape_string($_POST['total_registros']);				
				$consulta=$articulo->articulosPagination($fin,$inicio, "");

			}

			$consultaBD=$consulta;
			//2000000
			if($consultaBD->num_rows>=1){
				echo "
				<button id='botonClave' data-trigger='hover' data-placement='top' class='btn btn-primary btn-xs' onclick='mostrarClave()'><i class='fa fa-eye'></i> Mostrar Clave</button>
				<button id='botonFmsi' data-trigger='hover' data-placement='top' class='btn btn-primary btn-xs' onclick='mostrarFmsi()'><i class='fa fa-eye'></i> Mostrar Fmsi</button>
				<button id='botonMarca' data-trigger='hover' data-placement='top' class='btn btn-primary btn-xs' onclick='mostrarMarca()'><i class='fa fa-eye'></i> Mostrar Marca</button>
				<button id='botonDescripcion' data-trigger='hover' data-placement='top' class='btn btn-primary btn-xs' onclick='mostrarDescripcion()'><i class='fa fa-eye'></i> Mostrar Descripci??n</button>
				<button id='botonStock' data-trigger='hover' data-placement='top' class='btn btn-primary btn-xs' onclick='mostrarStock()'><i class='fa fa-eye'></i> Mostrar Stock</button>
				<button id='botonMayoreo' data-trigger='hover' data-placement='top' class='btn btn-primary btn-xs' onclick='mostrarMayoreo()'><i class='fa fa-eye'></i> Mostrar Mayoreo</button>
				<button id='botonTaller' data-trigger='hover' data-placement='top' class='btn btn-primary btn-xs' onclick='mostrarTaller()'><i class='fa fa-eye'></i> Mostrar Taller</button>
				<button id='botonCredito' data-trigger='hover' data-placement='top' class='btn btn-primary btn-xs' onclick='mostrarCredito()'><i class='fa fa-eye'></i> Mostrar Credito</button>
				<button id='botonMostrador' data-trigger='hover' data-placement='top' class='btn btn-primary btn-xs' onclick='mostrarPublico()'><i class='fa fa-eye'></i> Mostrar Publico</button>
				<button id='botonCosto' data-trigger='hover' data-placement='top' class='btn btn-primary btn-xs' onclick='mostrarCosto()'><i class='fa fa-eye'></i> Mostrar Costo</button>
				<table class='responsive-table table table-hover table-bordered' style='border-radius: 15px;' id='tableArticulos'>
					<thead class='table-light' style='font-size:12px'>
						<tr background: linear-gradient(337deg, rgba(0, 1, 255, 0.682) 0%, rgba(255, 0, 0, 0.71) 50%, rgba(0, 246, 144, 0.737) 100%);>
							<th id='thClave' class='bg-info w-40' scope='col'>Clave
							<button data-trigger='hover' data-placement='top' class='btn btn-primary btn-xs' onclick='ocultarClave()'><i class='fa fa-eye-slash'></i></button>							
							</th>
							<th id='thFmsi' class='bg-info' scope='col'>FMSI
							<button data-trigger='hover' data-placement='top' class='btn btn-primary btn-xs' onclick='ocultarFmsi()'><i class='fa fa-eye-slash'></i></button></th>
							<th id='thMarca' class='bg-info' scope='col'>Marca
							<button data-trigger='hover' data-placement='top' class='btn btn-primary btn-xs' onclick='ocultarMarca()'><i class='fa fa-eye-slash'></i></button></th>
							<th id='thDescripcion' class='bg-info' scope='col'>Descripci??n
							<button data-trigger='hover' data-placement='top' class='btn btn-primary btn-xs' onclick='ocultarDescripcion()'><i class='fa fa-eye-slash'></i></button></th>
							<th id='thStock' class='bg-info' scope='col'>Stock
							<button data-trigger='hover' data-placement='top' class='btn btn-primary btn-xs' onclick='ocultarStock()'><i class='fa fa-eye-slash'></i></button></th>
							<th id='thMayoreo' class='bg-info' scope='col'>Mayoreo
								<button data-trigger='hover' data-placement='top' class='btn btn-primary btn-xs' onclick='ocultarMayoreo()'><i class='fa fa-eye-slash'></i></button>
								<button data-trigger='hover' data-placement='top' class='btn btn-primary btn-xs' onclick='copiarMayoreo()'><i class='fa fa-files-o'></i></button>
							</th>
							<th id='thTaller' class='bg-info' scope='col'>Taller
							<button data-trigger='hover' data-placement='top' class='btn btn-primary btn-xs' onclick='ocultarTaller()'><i class='fa fa-eye-slash'></i></button>
							<button data-trigger='hover' data-placement='top' class='btn btn-primary btn-xs' onclick='copiarTaller()'><i class='fa fa-files-o'></i></button></th>
							<th id='thCredito' class='bg-info' scope='col'>Cr??dito Taller
							<button data-trigger='hover' data-placement='top' class='btn btn-primary btn-xs' onclick='ocultarCredito()'><i class='fa fa-eye-slash'></i></button>
							<button data-trigger='hover' data-placement='top' class='btn btn-primary btn-xs' onclick='copiarCredito()'><i class='fa fa-files-o'></i></button></th>
							<th id='thPublico' class='bg-info' scope='col'>Publico Mostrador
							<button data-trigger='hover' data-placement='top' class='btn btn-primary btn-xs' onclick='ocultarPublico()'><i class='fa fa-eye-slash'></i></button>
							<button data-trigger='hover' data-placement='top' class='btn btn-primary btn-xs' onclick='copiarPublico()'><i class='fa fa-files-o'></i></button></th>
							<th id='thCosto' class='bg-info' scope='col'>Costo
							<button data-trigger='hover' data-placement='top' class='btn btn-primary btn-xs' onclick='ocultarCosto()'><i class='fa fa-eye-slash'></i></button>
							<button data-trigger='hover' data-placement='top' class='btn btn-primary btn-xs' onclick='copiarCosto()'><i class='fa fa-files-o'></i></button></th>
							<th class='bg-info' scope='col'>Acciones</th>
						</tr>
					</thead>
				<tbody>";				
				while($fila=$consultaBD->fetch_array(MYSQLI_ASSOC)){
					$costoMiles = number_format($fila['costo'], 2);
					$publicMiles = number_format($fila['publico'], 2);
					$tallerMiles = number_format($fila['taller'], 2);
					$creditoMiles = number_format($fila['credito_taller'], 2);
					$mayoreoMiles = number_format($fila['mayoreo'], 2);
					$descrip = $fila['descripcion'];
					$delit = substr($descrip, 0,18);
					$delitCodigo = substr($fila['codigo'], 0, 50);
					$delitFmsi = substr($fila['fmsi'], 0, 50);
					$stock_mdx = '';					
					if($fila["idsucursal"] == $idsucursal && $acceso === "admin") {
						if($fila["stock"] >=1) {
								echo "<tr style='color:blue; font-size:11px;'>
								<td style='width:20px'>".$fila['codigo']."</td>
								<td style='width:10px;'>".$delitFmsi."</td>
								<td style='width:10px;'>".$fila['marca']."</td>
								<td>".$delit."...</td>
								<td><p>".$fila['stock']."pz</td>								
								<td id='thStock'><p>$ ".$mayoreoMiles."</p></td>
								<td><p>$ ".$tallerMiles."</p></td>
								<td><p>$ ".$creditoMiles."</p></td>
								<td><p>$ ".$publicMiles."</p></td>
								<td><p>$ ".$costoMiles."</p></td>
								<td>
										<button title='Mostrar' data-toggle='popover' data-trigger='hover' data-content='Mostrar articulo' data-placement='top' class='btn btn-warning btn-xs' onclick='mostrar(".$fila["idarticulo"].")'><i class='fa fa-eye'></i></button>
										<button title='Editar' data-toggle='popover' data-trigger='hover' data-content='Editar articulo' data-placement='bottom' class='btn btn-warning btn-xs' onclick='editarArticulo(".$fila["idarticulo"].")'><i class='fa fa-pencil'></i></button>
										<button title='Eliminar' data-toggle='popover' data-trigger='hover' data-content='Eliminar articulo' data-placement='top' class='btn btn-danger btn-xs' onclick='desactivar(".$fila["idarticulo"].")')><i class='fa fa-close'></i></button>
										<a data-toggle='modal' href='#solicitarArticulo'>
											<button title='Solicitar' data-toggle='popover' data-trigger='hover' data-content='Solicitar articulo' data-placement='bottom' class='btn btn-info btn-xs' onclick='mostrarArticuloSolicitud(".$fila["idarticulo"].")')><i class='fa fa-paper-plane'></i></button>
										</a>										
										<!--<span data-tooltip='Activar articulo'><button class='btn btn-primary btn-xs' onclick='activar(".$fila["idarticulo"].")'><i class='fa fa-check'></i></button></span>-->									
								</td>
							</tr>
							";							
						} else if($fila["stock"] <=0){							
								echo "<tr style='color:red; font-size:11px;'>
								<td style='width:20px'>".$fila['codigo']."</td>
								<td style='width:10px;'>".$delitFmsi."</td>
								<td style='width:10px;'>".$fila['marca']."</td>
								<td>".$delit."...</td>
								<td id='thStock'><p>".$fila['stock']."pz</td>								
								<td><p>$ ".$mayoreoMiles."</p></td>								
								<td><p>$ ".$tallerMiles."</p></td>
								<td><p>$ ".$creditoMiles."</p></td>
								<td><p>$ ".$publicMiles."</p></td>
								<td><p>$ ".$costoMiles."</p></td>
								<td>
									<button title='Mostrar' data-toggle='popover' data-trigger='hover' data-content='Mostrar articulo' data-placement='top' class='btn btn-warning btn-xs' onclick='mostrar(".$fila["idarticulo"].")'><i class='fa fa-eye'></i></button>
									<button title='Editar' data-toggle='popover' data-trigger='hover' data-content='Editar articulo' data-placement='bottom' class='btn btn-warning btn-xs' onclick='editarArticulo(".$fila["idarticulo"].")'><i class='fa fa-pencil'></i></button>
									<button title='Eliminar' data-toggle='popover' data-trigger='hover' data-content='Eliminar articulo' data-placement='top' class='btn btn-danger btn-xs' onclick='desactivar(".$fila["idarticulo"].")')><i class='fa fa-close'></i></button>
									<a data-toggle='modal' href='#solicitarArticulo'>
										<button title='Solicitar' data-toggle='popover' data-trigger='hover' data-content='Solicitar articulo' data-placement='bottom' class='btn btn-info btn-xs' onclick='mostrarArticuloSolicitud(".$fila["idarticulo"].")')><i class='fa fa-paper-plane'></i></button>
									</a>
								</td>
							</tr>";								
						}
					}
					else if($fila["idsucursal"] == $idsucursal && $acceso != "admin"){
						if($fila["stock"] >=1) {
							echo "<tr style='color:blue; font-size:11px;'>
								<td style='width:20px'>".$fila['codigo']."</td>
								<td style='width:10px;'>".$delitFmsi."</td>
								<td style='width:10px;'>".$fila['marca']."</td>
								<td>".$delit."...</td>
								<td><p>".$fila['stock']."pz</td>								
								<td><p>$ ".$mayoreoMiles."</p></td>								
								<td><p>$ ".$tallerMiles."</p></td>
								<td><p>$ ".$creditoMiles."</p></td>
								<td><p>$ ".$publicMiles."</p></td>
								<td><p>$ ".$costoMiles."</p></td>
								<td>
									<button title='Mostrar' data-toggle='popover' data-trigger='hover' data-content='Mostrar articulo' data-placement='top' class='btn btn-warning btn-xs' onclick='mostrar(".$fila["idarticulo"].")'><i class='fa fa-eye'></i></button>
									<a data-toggle='modal' href='#solicitarArticulo'>
										<button title='Solicitar' data-toggle='popover' data-trigger='hover' data-content='Solicitar articulo' data-placement='bottom' class='btn btn-info btn-xs' onclick='mostrarArticuloSolicitud(".$fila["idarticulo"].")')><i class='fa fa-paper-plane'></i></button>
									</a>
							</tr>";
						} 						
						else if($fila["stock"] <=0) {
							echo "<tr style='color:red; font-size:11px;'>
								<td style='width:20px'>".$fila['codigo']."</td>
								<td style='width:10px;'>".$delitFmsi."</td>
								<td style='width:10px;'>".$fila['marca']."</td>
								<td>".$delit."...</td>
								<td><p>".$fila['stock']."pz</td>								
								<td><p>$ ".$mayoreoMiles."</p></td>								
								<td><p>$ ".$tallerMiles."</p></td>
								<td><p>$ ".$creditoMiles."</p></td>
								<td><p>$ ".$publicMiles."</p></td>
								<td><p>$ ".$costoMiles."</p></td>
								<td>
								<button title='Mostrar' data-toggle='popover' data-trigger='hover' data-content='Mostrar articulo' data-placement='top' class='btn btn-warning btn-xs' onclick='mostrar(".$fila["idarticulo"].")'><i class='fa fa-eye'></i></button>
								<a data-toggle='modal' href='#solicitarArticulo'>
									<button title='Solicitar' data-toggle='popover' data-trigger='hover' data-content='Solicitar articulo' data-placement='bottom' class='btn btn-info btn-xs' onclick='solicitar(".$fila["idarticulo"].")')><i class='fa fa-paper-plane'></i></button>
								</a>
							</tr>";	
						}	
					}
				}
				echo "</tbody>
				</table>				
				";
			}else{
				echo "<center><h4>No hemos encotrado ningun articulo (??????'-'???)??? con: "."<strong class='text-uppercase'>".$termino."</strong><h4><center>";
			}
			break;

			case 'selectCategoria':
				require_once "../modelos/Categoria.php";
				$categoria=new Categoria();

				$rspta=$categoria->select();

				while ($reg=$rspta->fetch_object()) {
					echo '<option value=' . $reg->idcategoria.'>'.$reg->nombre.'</option>';
				}
				
				break;

			case 'selectProveedor':
				require_once "../modelos/Persona.php";
				$persona = new Persona();

				$rspta = $persona->listarp();

				while ($reg = $rspta->fetch_object()) {
					echo '<option value='.$reg->idpersona.'>'.$reg->nombre.'</option>';
				}
			break;
	}
	
}

 ?>