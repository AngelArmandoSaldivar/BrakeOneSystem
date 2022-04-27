var tabla;

//funcion que se ejecuta al inicio
function init(){
   mostrarform(false);
   obtener_registros();
   obtener_registrosProductos();   

   $("#formulario").on("submit",function(e){
   	guardaryeditar(e);
   });

   //cargamos los items al select proveedor
   selectProvider();

   	//Revisamos si la paginación esta en 1 para no mostrar el boton de Anterior
	let cachaPaginaNumber = Number($("#pagina").val());
	if(cachaPaginaNumber <= 1) {
		$("#anterior").hide();
	}
}

//Mostrar proveedores
function selectProvider() {

	$.post("../ajax/ingreso.php?op=selectProveedor", function(r){
		$("#idproveedor").html(r);
		$('#idproveedor').selectpicker('refresh');
	});

}

//funcion limpiar
function limpiar(){	

	$("#idproveedor").val("");
	$("#proveedor").val("");
	$("#serie_comprobante").val("");
	$("#impuesto").val("");
	$("#total_compra").val("");
	$(".filas").remove();
	$("#total").html("0");

	//obtenemos la fecha actual
	var now = new Date();
	var day =("0"+now.getDate()).slice(-2);
	var month=("0"+(now.getMonth()+1)).slice(-2);
	var today=now.getFullYear()+"-"+(month)+"-"+(day);
	$("#fecha_hora").val(today);

	//marcamos el primer tipo_documento
	$("#tipo_comprobante").val("Boleta");
	$("#tipo_comprobante").selectpicker('refresh');

}

//funcion mostrar formulario
function mostrarform(flag){
	limpiar();
	if(flag){
		$("#listadoregistros").hide();
		$("#formularioregistros").show();
		$("#btnGuardar").prop("disabled",false);
		$("#btnagregar").hide();

		$("#btnGuardar").hide();
		$("#btnCancelar").show();
		detalles=0;
		$("#btnAgregarArt").show();


	}else{
		$("#listadoregistros").show();
		$("#formularioregistros").hide();
		$("#btnagregar").show();
	}
}

//cancelar form
function cancelarform(){
	limpiar();
	mostrarform(false);
}

function fechas() {	
	$("#fecha_inicio").on('change', function() {
		let fecha_inicio = $("#fecha_inicio").val();		
		return fecha_inicio;
	})		
}



function paginasClick(e) {
	console.log("Paginas: ", e);
	let cachaPagina = document.getElementById("cachaPagina").value=e;
	document.getElementById("cachaPagina").value=e;	

	if(cachaPagina > 1) {
		$("#anterior").show();
	} else {
		$("#anterior").hide();
	}
}

function paginaSiguiente() {
	let cachaPaginaNumber = Number($("#pagina").val());
	cachaPaginaNumber = cachaPaginaNumber + 1;
	document.getElementById("pagina").value=cachaPaginaNumber;	
	if(cachaPaginaNumber > 1) {
		$("#anterior").show();
	}

	let paginaNext = Number(cachaPaginaNumber * 50);
	let paginaAntes = Number(paginaNext - 50);

	console.log("Pagina Antes: ", paginaAntes);
	console.log("Pagina siguiente: ", paginaNext);
	$.ajax({
		url : '../ajax/ingreso.php?op=listar',
		type : 'POST',
		dataType : 'html',
		data : {paginaAntes: paginaAntes, paginaNext: paginaNext},
	})
	.done(function(resultado){				
		$('.loader').hide();
		$("#tabla_resultado").html(resultado);
	})

}

function paginaAnterior() {
	let cachaPaginaNumber = Number($("#pagina").val());
	cachaPaginaNumber = cachaPaginaNumber - 1;
	document.getElementById("pagina").value=cachaPaginaNumber;
	console.log(cachaPaginaNumber);

	if(cachaPaginaNumber <= 1) {
		$("#anterior").hide();
	}

	let paginaNext = Number(cachaPaginaNumber * 40);
	let paginaAntes = Number(paginaNext - 40);

	console.log("Pagina Antes: ", paginaAntes);
	console.log("Pagina siguiente: ", paginaNext);
	$.ajax({
		url : '../ajax/ingreso.php?op=listar',
		type : 'POST',
		dataType : 'html',
		data : {paginaAntes: paginaAntes, paginaNext: paginaNext},
	})
	.done(function(resultado){				
		$('.loader').hide();
		$("#tabla_resultado").html(resultado);
	})
}


//Filtro Limite de registros
var select = document.getElementById('limite_registros');
select.addEventListener('change',
function(){
	$('.loader').show();
	let selectedOption = this.options[select.selectedIndex];
	let limites = selectedOption.value;
	console.log(selectedOption.value);
	$.ajax({
		url : '../ajax/ingreso.php?op=listar',
		type : 'POST',
		dataType : 'html',
		data : { limites: limites},
	})
	.done(function(resultado){				
		$('.loader').hide();
		$("#tabla_resultado").html(resultado);
	})
});


//funcion listar REGISTROS INGRESOS CREADOS
function obtener_registros(ingresos){

	busqueda = $("#busqueda").val();
	fechaInicial = $("#fecha_inicio").val();
	fechaFinal = $("#fecha_fin").val();
	

	//Filtro solo fecha
	$("#fecha_inicio").change(fechaInicio);
	function fechaInicio() {	
		fechas = $("#fecha_inicio").val();	
		$.ajax({
			url : '../ajax/ingreso.php?op=listar',
			type : 'POST',
			dataType : 'html',
			data : { fechas: fechas},
		}
		)
		.done(function(resultado){
			$("#tabla_resultado").html(resultado);
		})
		$("#fecha_fin").change(fechaFin);
		function fechaFin() {
			if(busqueda == "") {
				fechas = $("#fecha_inicio").val();
				fechaFin = $("#fecha_fin").val();
				$.ajax({
					url : '../ajax/ingreso.php?op=listar',
					type : 'POST',
					dataType : 'html',
					data : { fechas: fechas, fechaFin:fechaFin},
				}
				)
				.done(function(resultado){
					$("#tabla_resultado").html(resultado);
				})
			}
		}		
	}

	//Filtro busqueda y fechas
	if(ingresos != "") {
		$.ajax({
			url : '../ajax/ingreso.php?op=listar',
			type : 'POST',
			dataType : 'html',
			data : { ingresos: ingresos},
		}
		)
		.done(function(resultado){
			$("#tabla_resultado").html(resultado);
		})	
	}

	if(ingresos != "" && fechaInicial != "" && fechaFinal != "") {
		$.ajax({
			url : '../ajax/ingreso.php?op=listar',
			type : 'POST',
			dataType : 'html',
			data : { ingresos: ingresos},
		}
		)
		.done(function(resultado){
			$("#tabla_resultado").html(resultado);
		})
		$("#fecha_inicio").change(fechaInicio);
		function fechaInicio() {
			$("#fecha_fin").change(fechaFinFun);
			function fechaFinFun(){
				fechas = $("#fecha_inicio").val();
				fechasFin = $("#fecha_fin").val();
				$.ajax({
					url : '../ajax/ingreso.php?op=listar',
					type : 'POST',
					dataType : 'html',
					data : { ingresos: ingresos, fechas: fechas, fechasFin: fechasFin},
				}
				)
				.done(function(resultado){
					$("#tabla_resultado").html(resultado);
				})
			}
		}
	}
	
}

$(document).on('keyup', '#busqueda', function(){
	var valorBusqueda=$(this).val();
	if (valorBusqueda!="")
	{
		obtener_registros(valorBusqueda);
	}
	else
	{
		obtener_registros();
	}
});

//Listar productos
function obtener_registrosProductos(productos){
		$.ajax({
			url : '../ajax/ingreso.php?op=listarArticulos',
			type : 'POST',
			dataType : 'html',
			data : { productos: productos},
		})
		.done(function(resultado){
			$("#tabla_resultadoProducto").html(resultado);
		})	
}



$(document).on('keyup', '#busquedaProduct', function(){
	
	var valorBusqueda=$(this).val();
	if (valorBusqueda!="")
	{
		obtener_registrosProductos(valorBusqueda);
	}
	else
	{
		obtener_registrosProductos();
	}
});


//funcion para guardaryeditar
function guardaryeditar(e){
     e.preventDefault();//no se activara la accion predeterminada 
     //$("#btnGuardar").prop("disabled",true);
     var formData=new FormData($("#formulario")[0]);

     $.ajax({
     	url: "../ajax/ingreso.php?op=guardaryeditar",
     	type: "POST",
     	data: formData,
		 beforeSend: function() {
			$('.loader').show();		
		},
     	contentType: false,
     	processData: false,

     	success: function(datos){
			swal({
				position: 'top-end',
				type: 'success',
				title: 'Se guardo correctamente la recepción',
				showConfirmButton: false,
				timer: 1500
			});
     		mostrarform(false);
     		obtener_registros();
			$('.loader').hide();
     	}
     });

     limpiar();
}

function guardaryeditarProveedor(e){

     var formData=new FormData($("#formularioProve")[0]);

     $.ajax({
     	url: "../ajax/persona.php?op=guardaryeditar",
     	type: "POST",
     	data: formData,
     	contentType: false,
     	processData: false,

     	success: function(datos){
			swal({
				position: 'top-end',
				type: 'success',
				title: 'Se guardo correctamente el proveedor',
				showConfirmButton: false,
				timer: 1500
			});
			selectProvider();
			$("#formulario")[0].reset();
			$("#formularioProve")[0].reset();
			$("#agregarProveedor").modal('hide');
     	}
     });	
}

function guardaryeditarProducto() {

	var formData=new FormData($("#formularioProduct")[0]);

     $.ajax({
     	url: "../ajax/articulo.php?op=guardaryeditar",
     	type: "POST",
     	data: formData,
     	contentType: false,
     	processData: false,

     	success: function(datos){
			swal({
				position: 'top-end',
				type: 'success',
				title: 'Se guardo correctamente el producto',
				showConfirmButton: false,
				timer: 1500
			});
			selectProvider();
			$("#formulario")[0].reset();
			$("#formularioProduct")[0].reset();	
			$("#agregarProducto").modal('hide');			
     	}
     });
}

function mostrar(idingreso){
	$('.loader').show();
	$.post("../ajax/ingreso.php?op=mostrar",{idingreso : idingreso},
		function(data,status){			
			data=JSON.parse(data);
			mostrarform(true);
			$('.loader').hide();
			$("#idproveedor").val(data.idproveedor);
			$("#idproveedor").selectpicker('refresh');
			$("#tipo_comprobante").val(data.tipo_comprobante);
			$("#tipo_comprobante").selectpicker('refresh');
			$("#serie_comprobante").val(data.serie_comprobante);
			$("#fecha_hora").val(data.fecha);
			$("#impuesto").val(data.impuesto);
			$("#idingreso").val(data.idingreso);
			$("#codigo").val(data.codigo);
			//ocultar y mostrar los botones
			$("#btnGuardar").hide();
			$("#btnCancelar").show();
			$("#btnAgregarArt").hide();
		});

		$.post("../ajax/ingreso.php?op=listarDetalle&id="+idingreso,function(r){
			$('.loader').show();
			if(r) {
				$('.loader').hide();
				$("#detalles").html(r);
			}			
		});

}

//funcion para desactivar
function anular(idingreso){
	swal({
		title: '¿Está seguro de borrar la recepción?',
		text: "¡Si no lo está puede cancelar la accíón!",
		type: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  cancelButtonText: 'Cancelar',
		  confirmButtonText: 'Si, borrar recepción!'
	  }).then(function(result){

		if(result.value){
	
			$.post("../ajax/ingreso.php?op=anular", {idingreso : idingreso}, function(e){
				swal({
					title:'Recepción eliminada!',
					text: 'Se elimino correctamente la recepción.',
					type: 'success',
					showConfirmButton: false,
					timer: 1500
				})
				obtener_registros();
			});	
		}
	})
}

//declaramos variables necesarias para trabajar con las compras y sus detalles
var impuesto=0;
var cont=0;
var detalles=0;

$("#btnGuardar").hide();
$("#tipo_comprobante").change(marcarImpuesto);

function marcarImpuesto(){
	var tipo_comprobante=$("#tipo_comprobante option:selected").text();
	if (tipo_comprobante=='Factura'	) {
		$("#impuesto").val(impuesto);
	}
}

function agregarDetalle(idarticulo,articulo,fmsi, descripcion,costo){
	var cantidad=1;	
	var descuento = 0;

	if (idarticulo!="") {
		var fila='<tr class="filas" id="fila'+cont+'">'+
        '<td><button style="width: 40px;" type="button" class="btn btn-danger" onclick="eliminarDetalle('+cont+')">X</button></td>'+
        '<td><input type="hidden" name="idarticulo[]" value="'+idarticulo+'">'+idarticulo+'</td>'+
		'<td><input type="hidden" name="clave[]" value="'+articulo+'">'+articulo+'</td>'+
		'<td><input type="hidden" name="fmsi[]" id="fmsi[]" value="'+fmsi+'">'+fmsi+'</td>'+
		'<td><textarea class="form-control" id="descripcion[]" name="descripcion[]"rows="3" style="width: 150px;" value="'+descripcion+'">'+descripcion+'</textarea></td>'+
        '<td><input style="width: 55px;" type="number" name="cantidad[]" id="cantidad[]" value="'+cantidad+'"></td>'+
        '<td><input style="width: 70px;" type="number" name="precio_compra[]" id="precio_compra[]" value="'+costo+'"></td>'+
        '<td><input style="width: 70px;" type="number" name="descuento[]" value="'+descuento+'"></td>'+
        '<td><span id="subtotal'+cont+'" name="subtotal">'+costo*cantidad+'</span></td>'+
        '<td><button type="button" onclick="modificarSubtotales()" class="btn btn-info"><i class="fa fa-refresh"></i></button></td>'+
		'</tr>';
		cont++;
		detalles++;
		$('#detalles').append(fila);
		modificarSubtotales();

	}else{
		alert("error al ingresar el detalle, revisar las datos del articulo ");
	}
}

function modificarSubtotales(){
	var cant=document.getElementsByName("cantidad[]");
	var prec=document.getElementsByName("precio_compra[]");
	var sub=document.getElementsByName("subtotal");

	for (var i = 0; i < cant.length; i++) {
		var inpC=cant[i];
		var inpP=prec[i];
		var inpS=sub[i];

		inpS.value=inpC.value*inpP.value;
		document.getElementsByName("subtotal")[i].innerHTML=inpS.value;
	}

	calcularTotales();

}

function calcularTotales(){
	var sub = document.getElementsByName("subtotal");
	var total=0.0;

	for (var i = 0; i < sub.length; i++) {
		total += document.getElementsByName("subtotal")[i].value;
	}
	$("#total").html("$ " + total);
	$("#total_compra").val(total);
	evaluar();	
}

function evaluar(){

	if (detalles>0) 
	{
		$("#btnGuardar").show();
	}
	else
	{
		$("#btnGuardar").hide();
		cont=0;
	}
}

function eliminarDetalle(indice){
$("#fila"+indice).remove();
calcularTotales();
detalles=detalles-1;

}

init();