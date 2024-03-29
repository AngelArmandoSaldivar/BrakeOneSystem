var tabla;
var pesosMexicanos = Intl.NumberFormat('es-MX', {style: 'currency', currency: 'MXN'});
//funcion que se ejecuta al inicio
function init(){
   mostrarform(false);
   obtener_registros();
   obtener_registrosProductos();

   $("#formulario").on("submit",function(e){
   	guardaryeditar(e);
   });

	selectCliente();

	//Revisamos si la paginación esta en 1 para no mostrar el boton de Anterior
	let cachaPaginaNumber = Number($("#pagina").val());
	if(cachaPaginaNumber <= 1) {
		$("#anterior").hide();
	}
	var now = new Date();
	var day =("0"+now.getDate()).slice(-2);
	var month=("0"+(now.getMonth()+1)).slice(-2);
	var today=now.getFullYear()+"-"+(month)+"-"+(day);
	$("#fecha_entrada").val(today).prop("disabled", false);
}

function ocultarStock() {	
	$('.loaderSearch').show();
	setTimeout(() => {
		$('.loaderSearch').hide();
		$("#botonStock").show();
		$("#thStock").hide();
  		$('td:nth-child(5)').hide();
	}, 400);	
}


function mostrarStock() {
	$('.loaderSearch').show();
	setTimeout(() => {
		$('.loaderSearch').hide();
		$("#botonStock").hide();
		$("#thStock").show();
  		$('td:nth-child(5)').show();	
	}, 400);	
}

function ocultarMayoreo() {	
	$('.loaderSearch').show();
	setTimeout(() => {
		$('.loaderSearch').hide()
		$("#botonMayoreo").show();
		$("#thMayoreo").toggle();
  		$('td:nth-child(6)').toggle();
	}, 400);	
}

function mostrarMayoreo() {
	$('.loaderSearch').show();
	setTimeout(() => {
		$('.loaderSearch').hide()
		$("#botonMayoreo").hide();
		$("#thMayoreo").toggle();
		$('td:nth-child(6)').toggle();
	}, 400);  	
}

function ocultarTaller() {
	$('.loaderSearch').show();
	setTimeout(() => {
		$('.loaderSearch').hide()
		$("#botonTaller").show();
		$("#thTaller").toggle();
  		$('td:nth-child(7)').toggle();
	}, 400);	
}

function mostrarTaller() {
	$('.loaderSearch').show();
	setTimeout(() => {
		$('.loaderSearch').hide()
		$("#botonTaller").hide();
		$("#thTaller").toggle();
		$('td:nth-child(7)').toggle();
	}, 400);  	
}

function ocultarCredito() {
	$('.loaderSearch').show();
	setTimeout(() => {
		$('.loaderSearch').hide()
		$("#botonCredito").show();
		$("#thCredito").toggle();
  		$('td:nth-child(8)').toggle();
	}, 400);	
}

function mostrarCredito() {
	$('.loaderSearch').show();
	setTimeout(() => {
		$('.loaderSearch').hide()
		$("#botonCredito").hide();
		$("#thCredito").toggle();
		$('td:nth-child(8)').toggle();
	}, 400);  	
}

function ocultarPublico() {
	$('.loaderSearch').show();
	setTimeout(() => {
		$('.loaderSearch').hide()
		$("#botonMostrador").show();
		$("#thPublico").toggle();
  		$('td:nth-child(9)').toggle();
	}, 400);	
}

function mostrarPublico() {
	$('.loaderSearch').show();
	setTimeout(() => {
		$('.loaderSearch').hide()
		$("#botonMostrador").hide();
		$("#thPublico").toggle();
		$('td:nth-child(9)').toggle();
	}, 400);  	
}

function ocultarCosto() {
	$('.loaderSearch').show();
	setTimeout(() => {
		$('.loaderSearch').hide()
		$("#botonCosto").show();
		$("#thCosto").toggle();
  		$('td:nth-child(10)').toggle();
	}, 400);	
}

function mostrarCosto() {
	$('.loaderSearch').show();
	setTimeout(() => {
		$('.loaderSearch').hide()
		$("#botonCosto").hide();
		$("#thCosto").toggle();
		$('td:nth-child(10)').toggle();
	}, 400);
}

function ocultarDescripcion() {
	$('.loaderSearch').show();
	setTimeout(() => {
		$('.loaderSearch').hide()
		$("#botonDescripcion").show();
		$("#thDescripcion").toggle();
  		$('td:nth-child(4)').toggle();
	}, 400);	
}

function mostrarDescripcion() {
	$('.loaderSearch').show();
	setTimeout(() => {
		$('.loaderSearch').hide()
		$("#botonDescripcion").hide();
		$("#thDescripcion").toggle();
		$('td:nth-child(4)').toggle();
	}, 400);
}

function ocultarMarca() {
	$('.loaderSearch').show();
	setTimeout(() => {
		$('.loaderSearch').hide()
		$("#botonMarca").show();
		$("#thMarca").toggle();
  		$('td:nth-child(3)').toggle();
	}, 400);	
}

function mostrarMarca() {
	$('.loaderSearch').show();
	setTimeout(() => {
		$('.loaderSearch').hide()
		$("#botonMarca").hide();
		$("#thMarca").toggle();
		$('td:nth-child(3)').toggle();
	}, 400);
}

function ocultarFmsi() {
	$('.loaderSearch').show();
	setTimeout(() => {
		$('.loaderSearch').hide()
		$("#botonFmsi").show();
		$("#thFmsi").toggle();
  		$('td:nth-child(2)').toggle();
	}, 400);	
}

function mostrarFmsi() {
	$('.loaderSearch').show();
	setTimeout(() => {
		$('.loaderSearch').hide()
		$("#botonFmsi").hide();
		$("#thFmsi").toggle();
		$('td:nth-child(2)').toggle();
	}, 400);
}

function ocultarClave() {
	$('.loaderSearch').show();
	setTimeout(() => {
		$('.loaderSearch').hide()
		$("#botonClave").show();
		$("#thClave").toggle();
  		$('td:nth-child(1)').toggle();
	}, 400);	
}

function mostrarClave() {
	$('.loaderSearch').show();
	setTimeout(() => {
		$('.loaderSearch').hide()
		$("#botonClave").hide();
		$("#thClave").toggle();
		$('td:nth-child(1)').toggle();
	}, 400);
}

function onBlurText() {
	var busqueda = document.getElementById("searchSelect").value;
	$.ajax({
		url : '../ajax/persona.php?op=listarClientes',
		type : 'POST',
		dataType : 'html',			
	}).done(function(data){
		let array = JSON.parse(data);
		const filterItems = query => {
			return array.filter((el) =>
				el.toLowerCase().indexOf(query.toLowerCase()) > -1
			);
		}
		if(filterItems(busqueda).length > 0) {
			console.log("Si existe en la bd");
		} else {

			$("#agregarCliente").modal('show');
			$("#nombre").val(busqueda);
			
		}
	})
}


function actualizarFechaSalida(idservicio, fecha_salida) {
	$.ajax({
		url: "../ajax/cotizacion.php?op=editarFechaSalida&idservicio="+idservicio+"&fechaSalida="+ fecha_salida,
		type: "POST",
		data: {},
		contentType: false,
		processData: false,
		success: function(datos){			
			//alert("Fecha de salida actualizada");
			$("#remOrSalida").modal('hide');
			obtener_registrosProductos();	
		},
	});
}

function historialServicios() {		
	let idcliente = $("#idcliente").val();	

	window.open(
		`../reportes/exHistorialServicios.php?id=${idcliente}`,
		'_blank'
	);	

}

function mostrarDetalleServicioEdit() {	
	let idservicio = document.getElementById("idservicio").value;
	$.post("../ajax/cotizacion.php?op=mostrar",{idservicio : idservicio},
	function(data,status)
	{
		data=JSON.parse(data);		
		$("#idclienteDetalleVenta").val(data.idcliente).prop("disabled", false);
		$("#idclienteDetalleVenta").selectpicker('refresh');
		$("#fecha_salidaDetalle").val(data.fecha_salida).prop("disabled", false);
		$("#fecha_entradaDetalle").val(data.fecha).prop("disabled", false);
		$("#remisionDetalle").val(data.is_remision).prop("disabled", false);
		$("#remisionDetalle").selectpicker('refresh');
	})
}

function guardarDetalleVentaEditar() {
	var formData=new FormData($("#formulario")[0]);	
	let idservicio = document.getElementById("idservicio").value;
	let cliente = document.getElementById("idclienteDetalleVenta").value;	
	let entrada = document.getElementById("fecha_entradaDetalle").value;
	let salida = document.getElementById("fecha_salidaDetalle").value;
	let is_rem = document.getElementById("remisionDetalle").value;
	let remision = "";

	$('.loader').show();

	if(!salida && is_rem == 1) {
		$('.loader').hide();
		swal({
			title: "Un momento!",
			text: 'Debe ingresar una fecha de salida.',
			type: 'warning',
			showConfirmButton: true,
			//timer: 1500
		})
	} else if(salida != null && is_rem == 1){
		$.ajax({
			url: "../ajax/cotizacion.php?op=guardarDetalleServicio&idservicio="+idservicio+"&remision="+ remision + "&fecha_entrada=" + 
				entrada + "&fecha_salida="+salida + "&idcliente=" + cliente + "&is_rem=" + is_rem,
			type: "POST",
			data: formData,
			contentType: false,
			processData: false,
	
			success: function(datos){				
			   $('.loader').hide();
			   console.log(datos);
				$("#editarDetalleVenta").modal('hide');
				agregarRemision(idservicio);
				viewClient(idservicio);
			}
		})	
		.fail(function (jqXHR, textStatus, error) {
			console.log("ERROR: ", jqXHR.responseText);
		});
	} else if(salida != null && is_rem == 0) {
		$.ajax({
			url: "../ajax/cotizacion.php?op=guardarDetalleServicio&idservicio="+idservicio+"&remision="+ "0" + "&fecha_entrada=" + 
				entrada + "&fecha_salida="+salida + "&idcliente=" + cliente + "&is_rem=" + is_rem,
			type: "POST",
			data: formData,
			contentType: false,
			processData: false,
	
			success: function(datos){
			   $('.loader').hide();
			   console.log(datos);
				$("#editarDetalleVenta").modal('hide');
				viewClient(idservicio);
			}
		})	
		.fail(function (jqXHR, textStatus, error) {
			// Handle error here
			console.log("ERROR: ", jqXHR.responseText);
		});
	}

}

/*========================================================================================== */
/*===============================FILTROS==================================================== */
/*========================================================================================== */

function paginaSiguiente() {	

	let cachaPaginaNumber = Number($("#pagina").val());
	cachaPaginaNumber = cachaPaginaNumber + 1;
	$('.loaderSearch').show();

	document.getElementById("pagina").value=cachaPaginaNumber;
	if(cachaPaginaNumber > 1) {
		$("#anterior").show();
	}
	obtenerRegistrosSiguiente(cachaPaginaNumber);
}

function obtenerRegistrosSiguiente(pagina) {

	window.scroll({
		top: 50,
		left: 0,
		behavior: 'smooth'
	});
	
	let busqueda = $("#busqueda").val();		
	obtener_registros(busqueda);

}

function paginaAnterior() {
	let cachaPaginaNumber = Number($("#pagina").val());	
	cachaPaginaNumber = cachaPaginaNumber - 1;
	document.getElementById("pagina").value=cachaPaginaNumber;
	$('.loaderSearch').show();

	if(cachaPaginaNumber <= 1) {
		$("#anterior").hide();
	}	
	obtenerRegistrosAnterior(cachaPaginaNumber);
}

function obtenerRegistrosAnterior(pagina) {

	window.scroll({
		top: 50,
		left: 0,
		behavior: 'smooth'
	});
	let busqueda = $("#busqueda").val();	
	obtener_registros(busqueda);
	
}

//LIMITE REGISTROS
function mostrarRegistrosLimite(limites) {
	let busqueda = $("#busqueda").val();
	obtener_registros(busqueda)
}

var select = document.getElementById('limite_registros');
select.addEventListener('change',
function(){
	$('.loaderSearch').show();
	let selectedOption = this.options[select.selectedIndex];
	let limites = selectedOption.value;

	mostrarRegistrosLimite(limites);

});

//FECHA INICIO
function registrosFechaInicio(fechas) {
	let busqueda = $("#busqueda").val();
	obtener_registros(busqueda);
}

$("#fecha_inicio").change(fechaInicio);
function fechaInicio() {
	$('.loaderSearch').show();	
	fechas = $("#fecha_inicio").val();
	registrosFechaInicio(fechas);
}

//FECHA FIN
function registrosFechaFin(fechas) {
	let busqueda = $("#busqueda").val();
	obtener_registros(busqueda)
}

$("#fecha_fin").change(fechaFin);
function fechaFin() {
	$('.loaderSearch').show();
	fechas = $("#fecha_fin").val();
	registrosFechaFin(fechas);
}

function activarPopover() {
	$(function () {
		$('[data-toggle="popover"]').popover()		
	})
}

//funcion listar REGISTROS INGRESOS CREADOS
function obtener_registros(servicios){		

	let limitesRegistros = $("#limite_registros").val();
	let paginado = $("#pagina").val();

	let fecha_inicio = $("#fecha_inicio").val();
	let fecha_fin = $("#fecha_fin").val();	

	//FILTROOS BUSQUEDA
	if(servicios != "" && limitesRegistros == null && paginado == 1 && fecha_inicio == "" && fecha_fin == "") {
		console.log("Llegaste 1");
		$("#siguiente").show();
		$('.loaderSearch').show();
		$.ajax({
			url : '../ajax/cotizacion.php?op=listar',
			type : 'POST',
			dataType : 'html',
			data : { servicios: servicios},
		})
		.done(function(resultado){
			$("#tabla_resultado").html(resultado);
			$('.loaderSearch').hide();
			activarPopover()
		})
	} 
	if(servicios == "" && limitesRegistros == null && paginado == 1 && fecha_inicio == "" && fecha_fin == "") {
		$("#siguiente").show();
		$('.loaderSearch').show();
		$.ajax({
			url : '../ajax/cotizacion.php?op=listar',
			type : 'POST',
			dataType : 'html',
			data : {},
		})
		.done(function(resultado){
			$("#tabla_resultado").html(resultado);
			$('.loaderSearch').hide();
			activarPopover()
		})
	}
	if(servicios != "" && limitesRegistros > 0 && paginado == 1 && fecha_inicio == "" && fecha_fin == "") {
		console.log("Llegaste 3");
		$('.loaderSearch').show();
		$("#siguiente").show();

		$.ajax({
			url : '../ajax/cotizacion.php?op=listar',
			type : 'POST',
			dataType : 'html',
			data : {servicios:servicios, total_registros: limitesRegistros},
		})
		.done(function(resultado){
			$("#tabla_resultado").html(resultado);
			$('.loaderSearch').hide();
			activarPopover()
		})

	}
	if(servicios == "" && limitesRegistros > 0 && paginado == 1 && fecha_inicio == "" && fecha_fin == "") {
		$('.loaderSearch').show();
		$("#siguiente").show();

		$.ajax({
			url : '../ajax/cotizacion.php?op=listar',
			type : 'POST',
			dataType : 'html',
			data : {total_registros: limitesRegistros},
		})
		.done(function(resultado){
			$("#tabla_resultado").html(resultado);
			$('.loaderSearch').hide();
			activarPopover()
		})
	}
	if(servicios != "" && limitesRegistros > 0 && paginado == 1 && fecha_inicio != "" && fecha_fin == "") {
		$('.loaderSearch').show();
		$("#siguiente").show();

		$.ajax({
			url : '../ajax/cotizacion.php?op=listar',
			type : 'POST',
			dataType : 'html',
			data : {servicios:servicios, total_registros: limitesRegistros, fecha_inicio: fecha_inicio},
		})
		.done(function(resultado){
			$("#tabla_resultado").html(resultado);
			$('.loaderSearch').hide();
			activarPopover()
		})
	}	
	if(servicios != "" && limitesRegistros == null && paginado == 1 && fecha_inicio != "" && fecha_fin == "") {
		console.log("Llegaste 5");
		let total_registros = Number(((limitesRegistros * paginado) - paginado) + 1);		
		let inicio_registros = (total_registros - limitesRegistros) + 1;
	
		$.ajax({
			url : '../ajax/cotizacion.php?op=listar',
			type : 'POST',
			dataType : 'html',
			data : {busqueda:servicios, fecha_inicio: fecha_inicio},
		})
		.done(function(resultado){
			$('.loaderSearch').hide();
			$("#tabla_resultado").html(resultado);
			activarPopover()
		})
	}
	if(servicios == "" && limitesRegistros == null && paginado == 1 && fecha_inicio != "" && fecha_fin == "") {

		console.log("Llegaste 6");

		let total_registros = Number(((limitesRegistros * paginado) - paginado) + 1);		
		let inicio_registros = (total_registros - limitesRegistros) + 1;
	
		$.ajax({
			url : '../ajax/cotizacion.php?op=listar',
			type : 'POST',
			dataType : 'html',
			data : {busqueda:servicios, fecha_inicio: fecha_inicio},
		})
		.done(function(resultado){
			$('.loaderSearch').hide();
			$("#tabla_resultado").html(resultado);
			activarPopover()
		})
	}
	if(servicios == "" && limitesRegistros > 0 && paginado == 1 && fecha_inicio != "" && fecha_fin == "") {
		$('.loaderSearch').show();
		$("#siguiente").show();

		$.ajax({
			url : '../ajax/cotizacion.php?op=listar',
			type : 'POST',
			dataType : 'html',
			data : {servicios:servicios, total_registros: limitesRegistros, fecha_inicio: fecha_inicio},
		})
		.done(function(resultado){
			$("#tabla_resultado").html(resultado);
			$('.loaderSearch').hide();
			activarPopover()
		})
	}
	if(servicios == "" && limitesRegistros == null && paginado > 1 && fecha_inicio == "" && fecha_fin == "") {		
		let total_registros = Number(5 * paginado);
		let inicio_registros = (total_registros - 5);
		$.ajax({
			url : '../ajax/cotizacion.php?op=listar',
			type : 'POST',
			dataType : 'html',
			data : {inicio_registros:inicio_registros},
		})
		.done(function(resultado){
			$('.loaderSearch').hide();
			$("#tabla_resultado").html(resultado);
			activarPopover()
		})
	}
	if(servicios != "" && limitesRegistros == null && paginado > 1 && fecha_inicio == "" && fecha_fin == "") {
		let total_registros = Number(5 * paginado);
		let inicio_registros = (total_registros - 5);
		$.ajax({
			url : '../ajax/cotizacion.php?op=listar',
			type : 'POST',
			dataType : 'html',
			data : {busqueda: servicios, inicio_registros:inicio_registros},
		})
		.done(function(resultado){
			$('.loaderSearch').hide();
			$("#tabla_resultado").html(resultado);
			activarPopover()
		})
	}
	if(servicios != "" && limitesRegistros != null && paginado > 1 && fecha_inicio == "" && fecha_fin == "") {
		let total_registros = Number(limitesRegistros * paginado);
		let inicio_registros = (total_registros - limitesRegistros);
		$.ajax({
			url : '../ajax/cotizacion.php?op=listar',
			type : 'POST',
			dataType : 'html',
			data : {busqueda: servicios, inicio_registros:inicio_registros, total_registros: limitesRegistros},
		})
		.done(function(resultado){
			$('.loaderSearch').hide();
			$("#tabla_resultado").html(resultado);
			activarPopover()
		})
	}
	if(servicios != "" && limitesRegistros != null && paginado > 1 && fecha_inicio != "" && fecha_fin == "") {		
		let total_registros = Number(limitesRegistros * paginado);
		let inicio_registros = (total_registros - limitesRegistros);
		$.ajax({
			url : '../ajax/cotizacion.php?op=listar',
			type : 'POST',
			dataType : 'html',
			data : {busqueda: servicios, inicio_registros:inicio_registros, total_registros: limitesRegistros, fecha_inicio:fecha_inicio},
		})
		.done(function(resultado){
			$('.loaderSearch').hide();
			$("#tabla_resultado").html(resultado);
			activarPopover()
		})
	}
	if(servicios != "" && limitesRegistros == null && paginado > 1 && fecha_inicio != "" && fecha_fin == "") {		
		let total_registros = Number(5 * paginado);
		let inicio_registros = (total_registros - limitesRegistros);
		$.ajax({
			url : '../ajax/cotizacion.php?op=listar',
			type : 'POST',
			dataType : 'html',
			data : {busqueda: servicios, inicio_registros:inicio_registros, fecha_inicio:fecha_inicio},
		})
		.done(function(resultado){
			$('.loaderSearch').hide();
			$("#tabla_resultado").html(resultado);
			activarPopover()
		})
	}
	if(servicios == "" && limitesRegistros == null && paginado > 1 && fecha_inicio != "" && fecha_fin == "") {			
		let total_registros = Number(5 * paginado);
		let inicio_registros = (total_registros - limitesRegistros);
		$.ajax({
			url : '../ajax/cotizacion.php?op=listar',
			type : 'POST',
			dataType : 'html',
			data : {inicio_registros:inicio_registros, fecha_inicio:fecha_inicio},
		})
		.done(function(resultado){
			$('.loaderSearch').hide();
			$("#tabla_resultado").html(resultado);
			activarPopover()
		})
	}
	if(servicios == "" && limitesRegistros != null && paginado > 1 && fecha_inicio == "" && fecha_fin == "") {			
		let total_registros = Number(limitesRegistros * paginado);
		let inicio_registros = (total_registros - limitesRegistros);
		$.ajax({
			url : '../ajax/cotizacion.php?op=listar',
			type : 'POST',
			dataType : 'html',
			data : {inicio_registros:inicio_registros, total_registros: limitesRegistros},
		})
		.done(function(resultado){
			$('.loaderSearch').hide();
			$("#tabla_resultado").html(resultado);
			activarPopover()
		})
	}
	if(servicios == "" && limitesRegistros != null && paginado > 1 && fecha_inicio != "" && fecha_fin == "") {			
		let total_registros = Number(limitesRegistros * paginado);
		let inicio_registros = (total_registros - limitesRegistros);
		$.ajax({
			url : '../ajax/cotizacion.php?op=listar',
			type : 'POST',
			dataType : 'html',
			data : {inicio_registros:inicio_registros, total_registros: limitesRegistros, fecha_inicio: fecha_inicio},
		})
		.done(function(resultado){
			$('.loaderSearch').hide();
			$("#tabla_resultado").html(resultado);
			activarPopover()
		})
	}

	//FECHAS FIN
	//Solo fecha fin, pagina 1
	if(servicios == "" && limitesRegistros == null && paginado == 1 && fecha_fin != "" && fecha_inicio == "") {
		$.ajax({
			url : '../ajax/cotizacion.php?op=listar',
			type : 'POST',
			dataType : 'html',
			data : {fecha_fin: fecha_fin},
		})
		.done(function(resultado){
			$('.loaderSearch').hide();
			$("#tabla_resultado").html(resultado);
			activarPopover()
		})
	}
	//Fecha fin, busqueda, pagina 1
	if(servicios != "" && limitesRegistros == null && paginado == 1 && fecha_fin != "" && fecha_inicio == "") {
		$.ajax({
			url : '../ajax/cotizacion.php?op=listar',
			type : 'POST',
			dataType : 'html',
			data : {busqueda:servicios, fecha_fin: fecha_fin},
		})
		.done(function(resultado){
			$('.loaderSearch').hide();
			$("#tabla_resultado").html(resultado);
			activarPopover()
		})
	}
	//Fecha fin, busqueda, limite, pagina 1
	if(servicios != "" && limitesRegistros != null && paginado == 1 && fecha_fin != "" && fecha_inicio == "") {
		$.ajax({
			url : '../ajax/cotizacion.php?op=listar',
			type : 'POST',
			dataType : 'html',
			data : {busqueda:servicios, fecha_fin: fecha_fin, total_registros: limitesRegistros},
		})
		.done(function(resultado){
			$('.loaderSearch').hide();
			$("#tabla_resultado").html(resultado);
			activarPopover()
		})
	}
	//Fecha fin,limite, pagina 1
	if(servicios == "" && limitesRegistros != null && paginado == 1 && fecha_fin != "" && fecha_inicio == "") {
		$.ajax({
			url : '../ajax/cotizacion.php?op=listar',
			type : 'POST',
			dataType : 'html',
			data : {fecha_fin: fecha_fin, total_registros: limitesRegistros},
		})
		.done(function(resultado){
			$('.loaderSearch').hide();
			$("#tabla_resultado").html(resultado);
			activarPopover()
		})
	}
	//Fecha inicio, fecha fin
	if(servicios == "" && limitesRegistros == null && paginado == 1 && fecha_fin != "" && fecha_inicio != "") {
		$.ajax({
			url : '../ajax/cotizacion.php?op=listar',
			type : 'POST',
			dataType : 'html',
			data : {fecha_inicio: fecha_inicio, fecha_fin: fecha_fin},
		})
		.done(function(resultado){
			$('.loaderSearch').hide();
			$("#tabla_resultado").html(resultado);
			activarPopover()
		})
	}
	//Fecha inicio, fecha fin, busquedas
	if(servicios != "" && limitesRegistros == null && paginado == 1 && fecha_fin != "" && fecha_inicio != "") {
		$.ajax({
			url : '../ajax/cotizacion.php?op=listar',
			type : 'POST',
			dataType : 'html',
			data : {fecha_inicio: fecha_inicio, fecha_fin: fecha_fin, busqueda: servicios},
		})
		.done(function(resultado){
			$('.loaderSearch').hide();
			$("#tabla_resultado").html(resultado);
			activarPopover()
		})
	}
	//Fecha inicio, fecha fin, busquedas, limites
	if(servicios != "" && limitesRegistros != null && paginado == 1 && fecha_fin != "" && fecha_inicio != "") {
		let total_registros = Number(limitesRegistros * paginado);		
		$.ajax({
			url : '../ajax/cotizacion.php?op=listar',
			type : 'POST',
			dataType : 'html',
			data : {fecha_inicio: fecha_inicio, fecha_fin: fecha_fin, busqueda: servicios, total_registros: total_registros},
		})
		.done(function(resultado){
			$('.loaderSearch').hide();
			$("#tabla_resultado").html(resultado);
			activarPopover()
		})
	}
	//Fecha inicio, fecha fin, limites
	if(servicios == "" && limitesRegistros != null && paginado == 1 && fecha_fin != "" && fecha_inicio != "") {
		let total_registros = Number(limitesRegistros * paginado);		
		$.ajax({
			url : '../ajax/cotizacion.php?op=listar',
			type : 'POST',
			dataType : 'html',
			data : {fecha_inicio: fecha_inicio, fecha_fin: fecha_fin, total_registros: total_registros},
		})
		.done(function(resultado){
			$('.loaderSearch').hide();
			$("#tabla_resultado").html(resultado);
			activarPopover()
		})
	}
	//Fecha fin, pagina
	if(servicios == "" && limitesRegistros == null && paginado > 1 && fecha_fin != "" && fecha_inicio == "") {
		let total_registros = Number(5 * paginado);
		let inicio_registros = (total_registros - 5);
		$.ajax({
			url : '../ajax/cotizacion.php?op=listar',
			type : 'POST',
			dataType : 'html',
			data : {fecha_fin: fecha_fin, inicio_registros: inicio_registros},
		})
		.done(function(resultado){
			$('.loaderSearch').hide();
			$("#tabla_resultado").html(resultado);
			activarPopover()
		})
	}
	//Fecha fin, pagina, limites
	if(servicios == "" && limitesRegistros != null && paginado > 1 && fecha_fin != "" && fecha_inicio == "") {
		let total_registros = Number(limitesRegistros * paginado);
		let inicio_registros = (total_registros - limitesRegistros);
		$.ajax({
			url : '../ajax/cotizacion.php?op=listar',
			type : 'POST',
			dataType : 'html',
			data : {fecha_fin: fecha_fin, inicio_registros: inicio_registros, total_registros: limitesRegistros},
		})
		.done(function(resultado){
			$('.loaderSearch').hide();
			$("#tabla_resultado").html(resultado);
			activarPopover()
		})
	}
	//Fecha fin, pagina, limites
	if(servicios == "" && limitesRegistros != null && paginado > 1 && fecha_fin != "" && fecha_inicio != "") {
		let total_registros = Number(limitesRegistros * paginado);
		let inicio_registros = (total_registros - limitesRegistros);
		$.ajax({
			url : '../ajax/cotizacion.php?op=listar',
			type : 'POST',
			dataType : 'html',
			data : {fecha_inicio:fecha_inicio, fecha_fin: fecha_fin, inicio_registros: inicio_registros, total_registros: limitesRegistros},
		})
		.done(function(resultado){
			$('.loaderSearch').hide();
			$("#tabla_resultado").html(resultado);
			activarPopover()
		})
	}
	//Fecha fin, pagina, limites
	if(servicios != "" && limitesRegistros != null && paginado > 1 && fecha_fin != "" && fecha_inicio != "") {
		let total_registros = Number(limitesRegistros * paginado);
		let inicio_registros = (total_registros - limitesRegistros);
		$.ajax({
			url : '../ajax/cotizacion.php?op=listar',
			type : 'POST',
			dataType : 'html',
			data : {busqueda: servicios, fecha_inicio:fecha_inicio, fecha_fin: fecha_fin, inicio_registros: inicio_registros, total_registros: limitesRegistros},
		})
		.done(function(resultado){
			$('.loaderSearch').hide();
			$("#tabla_resultado").html(resultado);
			activarPopover()
		})
	}
	//Fecha fin, pagina, limites, busqueda
	if(servicios != "" && limitesRegistros != null && paginado > 1 && fecha_fin != "" && fecha_inicio == "") {		
		let total_registros = Number(limitesRegistros * paginado);
		let inicio_registros = (total_registros - limitesRegistros);
		$.ajax({
			url : '../ajax/cotizacion.php?op=listar',
			type : 'POST',
			dataType : 'html',
			data : {busqueda: servicios, fecha_fin: fecha_fin, inicio_registros: inicio_registros, total_registros: limitesRegistros},
		})
		.done(function(resultado){
			$('.loaderSearch').hide();
			$("#tabla_resultado").html(resultado);
			activarPopover()
		})
	}
	//Fecha inicio, fecha fin, pagina, busquedas
	if(servicios != "" && limitesRegistros == null && paginado > 1 && fecha_fin != "" && fecha_inicio != "") {
		let total_registros = Number(5 * paginado);
		let inicio_registros = (total_registros - 5);
		$.ajax({
			url : '../ajax/cotizacion.php?op=listar',
			type : 'POST',
			dataType : 'html',
			data : {busqueda: servicios, fecha_inicio: fecha_inicio, fecha_fin: fecha_fin, inicio_registros: inicio_registros},
		})
		.done(function(resultado){
			$('.loaderSearch').hide();
			$("#tabla_resultado").html(resultado);
			activarPopover()
		})
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

setInterval(() => {
	let busqueda = document.getElementById("busqueda").value;
	$('.loaderSearch').show();
	setTimeout(() => {
		obtener_registros(busqueda);
		$('.loaderSearch').hide();
	}, 500);
}, 5000);


/*========================================================================================== */
/*===============================FIN FILTROS================================================ */
/*========================================================================================== */
function cerrarModal() {
	$("#myModal").modal('hide');
}

function cerrarModalEdit() {
	$("#myModalProductsEdit").modal('hide');
}

function regresarMiSucursal() {
	$("#agregarProductoAlmacen").modal('hide');
}
function cerrarSucursalesEdit() {
	$("#myModalProductsAlmacenEdit").modal('hide');
}


function mostrarInfoClient(idcliente) {	
	$('.loader').show();
	$.post("../ajax/venta.php?op=mostrarInfoClient",{idcliente : idcliente},
		function(data,status)
		{
			$('.loader').hide();
			data=JSON.parse(data);
			$("#idcliente").val(idcliente).prop("disabled", false);
			$("#idcliente").selectpicker('refresh');
			$("#rfc").val(data.rfc).prop("disabled", true);
			$("#direccion").val(data.direccion).prop("disabled", true);			
			$("#email").val(data.email).prop("disabled", true);
			$("#telefono").val(data.telefono).prop("disabled", true);
			$("#credito").val(data.credito).prop("disabled", true);
			if(data.tipo_precio == "publico") {
				$("#tipoPrecio").val("Publico / Mostrador").prop("disabled", true);
			} else if(data.tipo_precio == "taller") {
				$("#tipoPrecio").val("Taller").prop("disabled", true);
			} else if(data.tipo_precio == "credito_taller") {
				$("#tipoPrecio").val("Credito Taller").prop("disabled", true);
			} else if(data.tipo_precio == "mayoreo") {
				$("#tipoPrecio").val("Mayoreo").prop("disabled", true);
			}
		});
}

//cargamos los items al select cliente
function selectCliente (){
	$.post("../ajax/cotizacion.php?op=selectCliente", function(r){
		$("#idcliente").html(r);
		$('#idcliente').selectpicker('refresh');
	});

	$.post("../ajax/cotizacion.php?op=selectCliente", function(r){
		$("#idclienteDetalleVenta").html(r);
		$('#idclienteDetalleVenta').selectpicker('refresh');
	});

	$("#idcliente").change(modIdCliente);
	function modIdCliente() {
		var idcliente = $("#idcliente option:selected").val();
		mostrarInfoClient(idcliente);
		document.getElementById("idclient").value=idcliente;

			$.post("../ajax/cotizacion.php?op=selectAuto&id="+idcliente,function(r){
				$("#idauto").html(r);
				$('#idauto').selectpicker('refresh');
			});				
			$("#idauto").change(modIdAuto);
			function modIdAuto() {	
				$('.loaderInfoAuto').show();			
				var idauto = $("#idauto option:selected").val();
				$.post("../ajax/cotizacion.php?op=mostrarInfoAuto",{idauto : idauto},
					function(data,status){
						$('.loaderInfoAuto').hide();
						data=JSON.parse(data);
						$("#placas").val(data.placas).prop("disabled", false);
						$("#marcaAuto").val(data.marca).prop("disabled", false);						
						$("#modelo").val(data.modelo).prop("disabled", false);
						$("#ano").val(data.ano).prop("disabled", false);
						$("#color").val(data.color).prop("disabled", false);
						$("#kms").val(data.kms).prop("disabled", false);
				});	
			}

	}	
}

//funcion limpiar
function limpiar() {

	var now = new Date();
	var day =("0"+now.getDate()).slice(-2);
	var month=("0"+(now.getMonth()+1)).slice(-2);
	var today=now.getFullYear()+"-"+(month)+"-"+(day);
	$("#fecha_hora").val(today);

	$("#btnAgregarArt").show();
	$("#btnGuardar").show();

	$("#idcliente").val("").prop("disabled", false);
	$("#idcliente").selectpicker('refresh');
	$("#tipo_comprobante").val("").prop("disabled", false);
	$("#tipo_comprobante").selectpicker('refresh');
	$("#impuesto").val("").prop("disabled", false);
	$("#marca").val("").prop("disabled", false);
	$("#placas").val("").prop("disabled", false);
	$("#modelo").val("").prop("disabled", false);
	$("#color").val("").prop("disabled", false);
	$("#ano").val("").prop("disabled", false);
	$("#kms").val("").prop("disabled", false);
	$("#estado").val("").prop("disabled", false);
	$("#rfc").val("").prop("disabled", false);
	$("#direccion").val("").prop("disabled", false);			
	$("#email").val("").prop("disabled", false);
	$("#telefono").val("").prop("disabled", false);
	$("#credito").val("").prop("disabled", false);
	$("#tipoPrecio").val("").prop("disabled", false);
	$("#idservicio").val("")

	$("#fecha_entrada").val("").prop("disabled", false);
	$("#fecha_salida").val("").prop("disabled", false);
	$("#remision").val("").prop("disabled", false);
	$("#remision").selectpicker('refresh');			
	$("#idauto").val("").prop("disabled", false);
	$("#idauto").selectpicker('refresh');

	$(".filas").remove();	
	$("#total").html("0");

	//marcamos el primer tipo_documento
	$("#tipo_comprobante").val("Factura");
	$("#tipo_comprobante").selectpicker('refresh');
	
}

//funcion mostrar formulario
function mostrarform(flag){	
	if(flag){	
		if(document.getElementById("idservicio")=="") {
			$("#btnAgregarArt").show();
			$("#btnGuardar").show();
		}
		var now = new Date();
		var day =("0"+now.getDate()).slice(-2);
		var month=("0"+(now.getMonth()+1)).slice(-2);
		var today=now.getFullYear()+"-"+(month)+"-"+(day);
		$("#fecha_hora").val(today);

		//Ocultamos detalle_cobro
		$("#detalle_cobro").hide();
		$("#listadoregistros").hide();
		$("#formularioregistros").show();
		$("#btnGuardar").prop("disabled",false);
		$("#btnagregarservicio").hide();
		obtener_registros();

		//$("#btnGuardar").show();
		$("#btnCancelar").show();
		//$("#btnAgregarArt").show();
		$("#btnAgregarArticulosEdit").hide();
		detalles=0;		
	}else{
		//$("#btnAgregarArt").show();
		//$("#btnGuardar").hide();
		//$("#btnCancelar").show();		
		$("#listadoregistros").show();
		$("#formularioregistros").hide();			
		$("#btnagregarservicio").show();
	}
}

function crearCotizacion() {
	mostrarform(true);
	$("#btnGuardar").show();
	$("#btnAddArt").show();
	$("#addCliente").show();
	$("#fecha_hora").prop("disabled", false);
	var now = new Date();
	var day =("0"+now.getDate()).slice(-2);
	var month=("0"+(now.getMonth()+1)).slice(-2);
	var today=now.getFullYear()+"-"+(month)+"-"+(day);
	$("#fecha_entrada").val(today).prop("disabled", false);
}

//Salir form
function salirForm() {
	limpiar();
	mostrarform(false);	
}

function almacenEdit(productosEdit){	
	
	$.ajax({
		url : '../ajax/cotizacion.php?op=listarProductosAlmacenEdit',
		type : 'POST',
		dataType : 'html',
		data : { productosEdit: productosEdit, types: "publico" },
	})
	.done(function(resultado){
		$("#tabla_resultadoProductoAlmacenEdit").html(resultado);
	})
}

$(document).on('keyup', '#busquedaProductAlmacenEdit', function(){	
	var valorBusqueda=$(this).val();

	console.log(valorBusqueda);
	
	if (valorBusqueda!="")
	{	
		almacenEdit(valorBusqueda);
	}
	else
	{
		almacenEdit();
	}
});

function obtener_registrosProductos(productos){

	$.ajax({
		url : '../ajax/cotizacion.php?op=listarProductos',
		type : 'POST',
		dataType : 'html',
		data : { productos: productos, types: "publico" },
	})
	.done(function(resultado){
		/*var thClave = $("#thClave").is(":visible");
		if(thClave == false) {
			console.log("TH DESACTIVADO");
			$("#botonClave").show();
			$("#thClave").toggle();
			$('td:nth-child(1)').toggle();
		} else {
			console.log("TH ACTIVADO");
		}*/
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

//Productos de otros almaneces
function obtener_registrosProductos_almacen(productos){			
	
	$.ajax({
		url : '../ajax/cotizacion.php?op=listarProductosSucursal',
		type : 'POST',
		dataType : 'html',
		data : { productos: productos, types: "publico" },
	})
	.done(function(resultado){
		$("#tabla_resultadoProducto_almacen").html(resultado);
	})
}

$(document).on('keyup', '#busquedaProductAlmacen', function(){
	var valorBusqueda=$(this).val();
	
	if (valorBusqueda!="")
	{	
		obtener_registrosProductos_almacen(valorBusqueda);
	}
	else
	{
		limpiar();
		obtener_registrosProductos_almacen();
	}
});

function obtener_registrosProductosEdit(productosEdit){	
	
	$.ajax({
		url : '../ajax/cotizacion.php?op=listarProductosEdit',
		type : 'POST',
		dataType : 'html',
		data : { productosEdit: productosEdit, types: "publico" },
	})
	.done(function(resultado){
		$("#tabla_resultadoProductoEdit").html(resultado);
	})
}

$(document).on('keyup', '#busquedaProductEdit', function(){	
	var valorBusqueda=$(this).val();

	console.log(valorBusqueda);
	
	if (valorBusqueda!="")
	{	
		obtener_registrosProductosEdit(valorBusqueda);
	}
	else
	{
		limpiar();
		obtener_registrosProductosEdit();
	}
});

/*setInterval(() => {
	let articulo = document.getElementById("busquedaProduct").value;
	let articuloAlmacen = document.getElementById("busquedaProductAlmacen").value;
	let articuloEdit = document.getElementById("busquedaProductEdit").value;
	let articuloAlmacenEdit = document.getElementById("busquedaProductAlmacenEdit").value;
	obtener_registrosProductos(articulo);
	obtener_registrosProductos_almacen(articuloAlmacen);
	obtener_registrosProductosEdit(articuloEdit);
	almacenEdit(articuloAlmacenEdit);
}, 5000);*/

//funcion para guardaryeditar
function guardaryeditar(e){	
     e.preventDefault();//no se activara la accion predeterminada 
     //$("#btnGuardar").prop("disabled",true);

	var formData=new FormData($("#formulario")[0]);
	$.ajax({
		url: "../ajax/cotizacion.php?op=guardaryeditar",
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
				title: datos,
				showConfirmButton: true,
				//timer: 1500
			});
			mostrarform(false);
			obtener_registros();
			limpiar();
		},			
	});
 
}

function eliminarProductoServicio(idservicio, idarticulo, stock, precio_servicio) {

	console.log("ID SERVICIO: ", idservicio);

	swal({
		title: '¿Está seguro de eliminar el articulo?',
		text: "¡Si no lo está puede cancelar la accíón!",
		type: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  cancelButtonText: 'Cancelar',
		  confirmButtonText: 'Si, eliminar!'
	  }).then(function(result){	
		if(result.value){
			$.post("../ajax/cotizacion.php?op=eliminarProductoServicio", {idservicio : idservicio, idarticulo : idarticulo, stock:stock, precio_servicio:precio_servicio}, function(e){
				swal({
					title:"Articulo eliminado!",
					text: 'Se elimino correctamente el articulo del servicio.',
					type: 'success',
					showConfirmButton: false,
					timer: 1500
				})
				detallesServicioEditar(idservicio);
			});	
		}
	})
}

function viewClient(idservicio) {
	$('.loader').show();
	$.post("../ajax/cotizacion.php?op=mostrar",{idservicio : idservicio},
		function(data,status)
		{
			data=JSON.parse(data);			
			$('.loader').hide();			
			$("#detalle_cobro").show();
			$("#divImpuesto").hide();			
			//ocultar y mostrar los botones
			$("#btnGuardar").hide();
			$("#btnCancelar").hide();
			//$("#btnAddArt").hide();			

			$("#idcliente").val(data.idcliente).prop("disabled", true);
			$("#idcliente").selectpicker('refresh');
			$("#tipo_comprobante").val(data.tipo_comprobante).prop("disabled", true);
			$("#tipo_comprobante").selectpicker('refresh');	
			$("#fecha_hora").val(data.fecha_hora).prop("disabled", true);			
			
			$("#idauto").val(data.is_remision).prop("disabled", true);
			$("#idauto").selectpicker('refresh');

			$("#impuesto").val(data.impuesto).prop("disabled", true);
			$("#marcaAuto").val(data.marca).prop("disabled", true);
			$("#placas").val(data.placas).prop("disabled", true);
			$("#modelo").val(data.modelo).prop("disabled", true);
			$("#color").val(data.color).prop("disabled", true);
			$("#ano").val(data.ano).prop("disabled", true);
			$("#kms").val(data.kms).prop("disabled", true);			
			$("#rfc").val(data.rfc).prop("disabled", true);
			$("#direccion").val(data.direccion).prop("disabled", true);			
			$("#email").val(data.email).prop("disabled", true);
			$("#telefono").val(data.telefono).prop("disabled", true);
			$("#credito").val(data.credito).prop("disabled", true);
			$("#idservicio").val(data.idcotizacion);
			if(data.tipo_precio == "publico") {
				$("#tipoPrecio").val("Publico / Mostrador").prop("disabled", true);
			} else if(data.tipo_precio == "taller") {
				$("#tipoPrecio").val("Taller").prop("disabled", true);
			} else if(data.tipo_precio == "credito_taller") {
				$("#tipoPrecio").val("Credito Taller").prop("disabled", true);
			} else if(data.tipo_precio == "mayoreo") {
				$("#tipoPrecio").val("Mayoreo").prop("disabled", true);
			}
			
			$("#btnCancelar").hide();
			$("#btnRegresar").show();
			//$("#btnAgregarArt").hide();
			//$("#btnAgregarArticulosEdit").show();
		}
	)
}

function detallesServicio(idservicio) {

	$.post("../ajax/cotizacion.php?op=listarDetalleIdCotizacion&idCotizacion="+idservicio,function(r) {				
		data = JSON.parse(r);		
		$.post("../ajax/cotizacion.php?op=mostrarArticulo&idArticulo="+data.idarticulo,function(a) {				
			dataArticulo = JSON.parse(a);
			console.log("DATA: " + dataArticulo.imagen);
			$.post("../ajax/cotizacion.php?op=listarDetalle&id="+idservicio + "&imagen=" + dataArticulo.imagen,function(r){			
				$('.loader').show();
				if(r.length < 0) {
					$("#detalles").html(r);
					$('.loader').hide();
				} else {
					setTimeout(() => {
						$("#detalles").html(r);
						$('.loader').hide();
					}, 1000);
				}
			});
		})	
	
	});	
}
function detallesServicioAnulado(idservicio) {	
	$.post("../ajax/cotizacion.php?op=listarDetalleAnulado&id="+idservicio,function(r){			
		$('.loader').show();
		if(r.length < 0) {
			$("#detalles").html(r);
			$('.loader').hide();
		} else {
			setTimeout(() => {
				$("#detalles").html(r);
				$('.loader').hide();
			}, 1000);
		}
	});
}

function mostrar(idservicio){	
	mostrarform(true);
	$("#btnAgregarArt").hide();
	$("#btnAgregarArticulosEdit").hide();
	$('.loader').show();
	viewClient(idservicio);
	$("#btnAgregarArticulo").hide();
	$("#btnGuardar").hide();
	$("#btnAddPago").hide();
	detallesServicio(idservicio);
	mostrarPagos(idservicio);
}

function mostrarAnulado(idservicio){	
	mostrarform(true);
	$("#btnAgregarArt").hide();
	$("#btnAgregarArticulosEdit").hide();
	$('.loader').show();
	viewClient(idservicio);
	$("#btnAgregarArticulo").hide();
	$("#btnGuardar").hide();
	$("#btnAddPago").hide();
	detallesServicioAnulado(idservicio);
	mostrarPagos(idservicio);
}

function detallesServicioEditar(idServicio) {

	$.post("../ajax/cotizacion.php?op=mostrarDetalleServicio&id="+idServicio,function(r){			
		$('.loader').show();
		if(r.length < 0) {
			$("#detalles").html(r);
			$('.loader').hide();
		} else {
			setTimeout(() => {
				$("#detalles").html(r);
				$('.loader').hide();
			}, 1000);
		}
	});
}

function editarProductoServicio(idarticulo) {	
	var idServicio = document.getElementById("idservicio").value;
	$.post("../ajax/cotizacion.php?op=mostrarProductoServicio&idarticulo="+idarticulo+"&idServicio="+idServicio,function(data){		
		data = JSON.parse(data);
		$("#claveProduct").val(data.codigo).prop("disabled", true);
		$("#idProducto").val(data.idarticulo).prop("disabled", true);
		$("#descripcionProducto").val(data.descripcion).prop("disabled", false);
		$("#cantidadProducto").val(data.cantidad).prop("disabled", false);
		$("#precioProducto").val(data.precio_cotizacion).prop("disabled", false);		
	});	
}

function editarGuardarProductoServicio() {	

	var idProducto = document.getElementById("idProducto").value;
	var idServicio = document.getElementById("idservicio").value;
	var descripcion = document.getElementById("descripcionProducto").value;
	var cantidad = document.getElementById("cantidadProducto").value;
	var precio = document.getElementById("precioProducto").value;	

	var formData=new FormData($("#formularioProductoServicio")[0]);

	$.post("../ajax/cotizacion.php?op=mostrarProductoServicio&idarticulo="+document.getElementById("idProducto").value+"&idServicio="+idServicio,function(data){		
		data = JSON.parse(data);
		$.ajax({
			url: "../ajax/cotizacion.php?op=editarGuardarProductoServicio&idarticulo="+idProducto+"&idservicio="
			+ idServicio+"&precioViejo="+data.precio_servicio+"&stockViejo="+data.cantidad 
			+ "&descripcion="+descripcion  + "&cantidad=" + cantidad + "&precio=" + precio,
			type: "POST",
			data: formData,
			contentType: false,
			processData: false,
   
			success: function(datos){   
				console.log("DATOS: ", datos);
			   swal({
				   title: datos,
				   text: 'Se actualizo correctamente el articulo del servicio.',
				   type: 'success',
				   showConfirmButton: true,
				   //timer: 1500
			   })			
			   $("#formularioProductoServicio")[0].reset();
			   $("#editProductServicio").modal('hide');
			   detallesServicioEditar(idServicio);
			},
	   });				
	});
}
function limpiarPagoForm() {
	$("#idpago").val("").prop("disabled", false);
	$("#importeCobro").val("").prop("disabled", false);
	$("#metodoPago").val("").prop("disabled", false);
	$("#metodoPago").selectpicker('refresh');
	$("#banco").val("").prop("disabled", false);
	$("#banco").selectpicker('refresh');
	$("#referenciaCobro").val("").prop("disabled", false);
}

function mostrarPagos(idservicio) {	
	$.post("../ajax/cotizacion.php?op=listarDetalleCobro&id="+idservicio,function(r){			
		$('.loader').show();		
		if(r.length < 0) {
			$("#detallesPagos").html(r);
			$('.loader').hide();
		} else {
			setTimeout(() => {
				$("#detallesPagos").html(r);
				$('.loader').hide();
			}, 1000);
		}
	});
}
function mostrarPagosEdit(idservicio) {
	console.log("LLEGASTE: ", viewClient);
	$.post("../ajax/cotizacion.php?op=listarEditarDetalleCobro&id="+idservicio,function(r){			
		$('.loader').show();		
		if(r.length < 0) {
			$("#detallesPagos").html(r);
			$('.loader').hide();
		} else {
			setTimeout(() => {
				$("#detallesPagos").html(r);
				$('.loader').hide();
			}, 1000);
		}
	});
}

function eliminarCobro(idcobro, importe, idservicio) {
	swal({
		title: '¿Está seguro de eliminar el pago?',
		text: "¡Si no lo está puede cancelar la accíón!",
		type: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  cancelButtonText: 'Cancelar',
		  confirmButtonText: 'Si, eliminar!'
	  }).then(function(result){
		if(result.value){
			$.ajax({
				url: "../ajax/cotizacion.php?op=eliminarCobro&idcobro=" + idcobro + "&importe=" + importe + "&idservicio=" + idservicio,
				type: "POST",
				data: "",
				contentType: false,
				processData: false,

				success: function(datos){				
				swal({
					title: datos,
					text: 'Se elimino correctamente el pago.',
					type: 'success',
					showConfirmButton: true,
					//timer: 1500
				})
				mostrarPagosEdit(idservicio);
				},
			});
		}
	})
		
}
function cobrarServicio(idservicio){
	mostrarform(true);
	$('.loader').show();
	viewClient(idservicio);
	$("#btnAgregarArt").hide();
	$("#btnAgregarArticulosEdit").hide();
	$("#btnAgregarArticulo").hide();
	$("#btnEliminarCobro").hide();
	$("#btnGuardar").hide();
	$("#btnAddPago").show();	
	detallesServicio(idservicio);
	mostrarPagosEdit(idservicio);
}
function infoPago() {
	//$('#modalAddCobro').modal({backdrop: 'static', keyboard: false})
	let idservicio = document.getElementById("idservicio").value;
	console.log("ID SERVICIO: ", idservicio);
	$.post("../ajax/cotizacion.php?op=mostrar",{idservicio : idservicio},
	function(data,status)
	{

		console.log("INFO PAGO. ", data);
		data=JSON.parse(data);		
		console.log(data);	
		let totalPagar = data.total_servicio - data.pagado;
		$("#clienteCobro").val(data.cliente).prop("disabled", true);
		$("#totalCobro").val("$" + data.total_servicio).prop("disabled", true);			
		$("#porPagar").val("$" + totalPagar).prop("disabled", true);

		if(totalPagar == 0) {
			$("#btnGuardarCobro").hide();
		} else {
			$("#btnGuardarCobro").show();
		}	
	});
}

function mostrarPagoEdit(idpago) {
	let idservicio = document.getElementById("idservicio").value;
	$.post("../ajax/cotizacion.php?op=mostrar",{idservicio : idservicio},
	function(data,status)
	{
		data=JSON.parse(data);
		let totalPagar = data.total_servicio - data.pagado;
		$("#clienteCobro").val(data.cliente).prop("disabled", true);
		$("#totalCobro").val("$" + data.total_servicio).prop("disabled", true);			
		$("#porPagar").val("$" + totalPagar).prop("disabled", true);		
		$("#btnGuardarCobro").show();
	});

	$.post("../ajax/cotizacion.php?op=mostrarPagoEdit&" + "idpago=" + idpago,
	function(data,status)
	{
		data=JSON.parse(data);		
		console.log(data);
		
		$("#importeCobro").val(data.importe).prop("disabled", false);
		$("#metodoPago").val(data.forma_pago).prop("disabled", false);
		$("#metodoPago").selectpicker('refresh');
		$("#banco").val(data.banco).prop("disabled", false);
		$("#banco").selectpicker('refresh');
		$("#referenciaCobro").val(data.referencia).prop("disabled", false);
		$("#idpago").val(data.idpago).prop("disabled", false);

	});

}

function cancelarFormPago() {
	limpiarPagoForm();
}

function guardarCobro() {	
	let idPago = document.getElementById("idpago").value;

	//limpiarPagoForm();
	
	let idservicio = document.getElementById("idservicio").value;
	let idcliente = document.getElementById("idcliente").value;
	let importeCobro = document.getElementById("importeCobro").value;
	let metodoPago = document.getElementById("metodoPago").value;
	let banco = document.getElementById("banco").value;
	let referenciaCobro = document.getElementById("referenciaCobro").value;		
	var now = new Date();
	var day =("0"+now.getDate()).slice(-2);
	var month=("0"+(now.getMonth()+1)).slice(-2);
	var today=now.getFullYear()+"-"+(month)+"-"+(day);	
	var formData=new FormData($("#formularioAddCobro")[0]);	

	if(idPago == "") {
		$.ajax({
			url: "../ajax/cotizacion.php?op=guardarCobro&idservicio="+idservicio+"&idcliente="+idcliente
			+"&importeCobro="+importeCobro+"&metodoPago="+metodoPago+"&banco="+banco
			+"&referenciaCobro="+referenciaCobro + "&fechaCobro=" + today,
			type: "POST",
			data: formData,
			contentType: false,
			processData: false,
	
			success: function(datos){				
				swal({
					title: datos,
					text: 'Se guardo correctamente el pago.',
					type: 'success',
					showConfirmButton: false,
					timer: 1500
				})
				$("#formularioAddCobro")[0].reset();
				$("#modalAddCobro").modal('hide');
				mostrarPagosEdit(idservicio);
				limpiarPagoForm();
			},
		});
	} else {
		$.post("../ajax/venta.php?op=mostrarPagoEdit&" + "idpago=" + idPago,
		function(data,status)
		{
			data=JSON.parse(data);		
			let importeViejo = data.importe;
			$.ajax({
				url: "../ajax/cotizacion.php?op=editarCobro&idpago="+idPago+"&importeCobro="
				+importeCobro+"&metodoPago="+metodoPago+"&banco="+banco + "&importeviejo=" + importeViejo + "&idservicio=" + idservicio
				+"&referenciaCobro="+referenciaCobro,
				type: "POST",
				data: formData,
				contentType: false,
				processData: false,
		
				success: function(datos){				
					swal({
						title: datos,
						text: 'Se actualizo correctamente el pago.',
						type: 'success',
						showConfirmButton: false,
						timer: 1500
					})			
					$("#formularioAddCobro")[0].reset();
					$("#modalAddCobro").modal('hide');
					mostrarPagosEdit(idservicio);
					limpiarPagoForm();
				},
			});
		});	
	}
		
}

function editar(idServicio){
	mostrarform(true);
	$("#addCliente").show();
	$("#btnAgregarArt").hide();	
	$("#btnAgregarClient").show();	
	$("#btnAgregarArticulosEdit").show();	
	$("#btnAddPago").show();
	//Mostrando info del cliente
	viewClient(idServicio);	
	$("#btnGuardar").show();
	detallesServicioEditar(idServicio);
	mostrarPagosEdit(idServicio);	
}

function limpiarFormCliente() {
	$("#nombre").val("").prop("disabled", false);
	$("#tipo_precioCliente").val("").prop("disabled", false);
	$("#tipo_precioCliente").selectpicker('refresh');
	$("#direccionCliente").val("").prop("disabled", false);
	$("#telefonoCliente").val("").prop("disabled", false);
	$("#telefono_localCliente").val("").prop("disabled", false);
	$("#emailCliente").val("").prop("disabled", false);
	$("#rfcCliente").val("").prop("disabled", false);
	$("#creditoCliente").val("").prop("disabled", false);
}

function guardarCliente() {
	var formData=new FormData($("#formCliente")[0]);
	var nombreCliente = document.getElementById("nombre").value;
	var tipo_precio = document.getElementById("tipo_precioCliente").value;
	var direccion = document.getElementById("direccionCliente").value;
	var telefono = document.getElementById("telefonoCliente").value;
	var telefono_local = document.getElementById("telefono_localCliente").value;
	var email = document.getElementById("emailCliente").value;
	var rfc = document.getElementById("rfcCliente").value;
	var credito = document.getElementById("creditoCliente").value;
	
	if(nombreCliente == "" || telefono == "") {		
		swal({
			position: 'top-end',
			type: 'warning',
			title: 'Nombre y telefono requeridos!',
			showConfirmButton: false,
			timer: 1500
		});
	} 
	else {
		$.ajax({
			url: "../ajax/cotizacion.php?op=guardarCliente&nombreCliente=" + nombreCliente + "&tipo_precio=" + tipo_precio + 
			"&direccion="+direccion + "&telefono=" + telefono + "&telefono_local=" + telefono_local + 
			"&email="+email + "&rfc=" + rfc + "&credito="+credito,
			type: "POST",
			data: formData,
			contentType: false,
			processData: false,
   
			success: function(datos){
			   swal({
				   position: 'top-end',
				   type: 'success',
				   title: 'Se guardo correctamente el cliente',
				   showConfirmButton: false,
				   timer: 1500
			   });	
   
			   selectCliente();
			   limpiarFormCliente();
			   $("#agregarCliente").modal('hide');
				//bootbox.alert(datos);
			   //selectCliente();
				   $.post("../ajax/venta.php?op=ultimoCliente&nombreCliente=" + nombreCliente,
				   function(data,status)
				   {
					   let idCliente = data.replace(/['"]+/g, '');
					   console.log("ID CLIENTE: ", idCliente);
					   mostrarInfoClient(idCliente);
				   });
			}
		});
	}
}

function guardarAuto() {
	let idcliente = document.getElementById("idcliente").value;
	let placas = $("#placasAdd").val();
	let marca =  $("#marcaAdd").val();
	let modelo =  $("#modeloAdd").val();
	let ano =  $("#anoAdd").val();
	let color =  $("#colorAdd").val();
	let kms =  $("#kmsAdd").val();

	$.ajax({
		url: "../ajax/cotizacion.php?op=guardarAuto&idcliente="+idcliente+"&placas="+placas
		+"&marca="+marca+"&modelo="+modelo+"&ano="+ano
		+"&color="+color + "&kms=" + kms,
		type: "POST",
		contentType: false,
		processData: false,

		success: function(datos){				
			swal({
				title: datos,
				text: 'Se guardo correctamente el auto.',
				type: 'success',
				showConfirmButton: true,
				//timer: 1500
			})
			$.post("../ajax/cotizacion.php?op=selectAuto&id="+idcliente,function(r){
				$("#idauto").html(r);
				$('#idauto').selectpicker('refresh');
			});	
			$.post("../ajax/cotizacion.php?op=ultimoAuto",
			function(data,status)
			{			
				let ultimoIdAuto = data.replace(/['"]+/g, '');	
				console.log("ID AUTO: ", ultimoIdAuto);
				$("#idauto").val(ultimoIdAuto).prop("disabled", false);
				$("#idauto").selectpicker('refresh');
				
				$.post("../ajax/cotizacion.php?op=mostrarInfoAuto",{idauto : ultimoIdAuto},
					function(data,status){
						$('.loaderInfoAuto').hide();
						data=JSON.parse(data);
						$("#placas").val(data.placas).prop("disabled", false);
						$("#marcaAuto").val(data.marca).prop("disabled", false);						
						$("#modelo").val(data.modelo).prop("disabled", false);
						$("#ano").val(data.ano).prop("disabled", false);
						$("#color").val(data.color).prop("disabled", false);
						$("#kms").val(data.kms).prop("disabled", false);
				});
				
			});
			
			$("#addAuto").modal('hide');
			//selectCliente();
		},
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
     		bootbox.alert(datos);
			selectProvider();
			$("#formulario")[0].reset();
			$("#formularioProduct")[0].reset();	
			$("#agregarProducto").modal('hide');
     	}
     });
}

//funcion para desactivar
function anular(idservicio){
	swal({
		title: '¿Está seguro de cancelar el servicio?',
		text: "¡Si no lo está puede cancelar la accíón!",
		type: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  cancelButtonText: 'Cancelar',
		  confirmButtonText: 'Si, cancelar servicio!'
	  }).then(function(result){
	
		if(result.value){
			$('.loader').show();
			$.post("../ajax/cotizacion.php?op=anular", {idservicio : idservicio}, function(e){
				swal({
					title:'Servicio cancelado!',
					text: 'Se cancelo correctamente el servicio.',
					type: 'success',
					showConfirmButton: false,
					timer: 1500
				})
				obtener_registros();
				$('.loader').hide();
			});	
		}
	})
}
function cobrar(idservicio) {

	bootbox.confirm("¿Esta seguro de cobrar este servicio?", function(result){
		
		if (result) {
			$.post("../ajax/cotizacion.php?op=cobrar", {idservicio : idservicio}, function(e){
				bootbox.alert(e);
				// tabla.ajax.reload();
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
	if (tipo_comprobante=='Factura') {
		$("#impuesto").val(impuesto);
	}else{
		$("#impuesto").val(0);		
	}
}

function agregarDetalle(idarticulo,articulo,fmsi, descripcion,marca, descMarca, publico1, stock, idsucursal, costo, publico, taller, credito, mayoreo){	
	
	console.log("MARCA: " + marca);

	var precioCot = 0.0;
	let tipoPrecio = document.getElementById("tipoPrecio").value;

	precioCot = tipoPrecio == "Publico" ? publico : tipoPrecio == "Taller" ? taller : tipoPrecio == "Credito Taller" ? credito : tipoPrecio == "Mayoreo" ? mayoreo : publico1;	

	var cantidad=1;
	var descuento=0;

	if (idarticulo!="") {
		var fila='<tr style="font-size:12px" class="filas" id="fila'+cont+'">'+
        '<td><button style="width: 40px;" title="Eliminar" type="button" class="btn btn-danger btn-xs" onclick="eliminarDetalle('+cont+')">X</button></td>'+        
		'<td><input type="hidden" name="clave[]" value="'+articulo+'"> <input class="form-control" type="hidden" name="idsucursalArticulo[]" value="'+idsucursal+'"> <input class="form-control" type="hidden" name="idarticulo[]" value="'+idarticulo+'">'+articulo+'</td>'+
		'<td><input type="hidden" name="fmsi[]" id="fmsi[]" value="'+fmsi+'">'+fmsi+'</td>'+
		'<td><input type="hidden" name="marca[]" id="marca[]" value="'+marca+'">'+descMarca+'</td>'+
		'<td><textarea class="form-control" id="descripcion[]" name="descripcion[]" rows="2" style="width: 280px;" value="'+descripcion+'">'+descripcion+'</textarea></td>'+
        '<td><input style="width: 55px;" type="number" onblur="modificarSubtotales()" name="cantidad[]" id="cantidad[]" value="'+cantidad+'" max="" min="1"></td>'+
        '<td><input style="width: 70px;" type="number" onblur="modificarSubtotales()" name="precio_cotizacion[]" id="precio_cotizacion[]" step="any" value="'+ precioCot +'"></td>'+
        '<td><input style="width: 70px;" type="number" onblur="modificarSubtotales()" name="descuento[]" value="'+descuento+'"></td>'+
        '<td><span id="subtotal'+cont+'" name="subtotal">'+ precioCot*cantidad +'</span></td>'+
		'</tr>';
		cont++;
		detalles++;
		$('#detalles').append(fila);
		modificarSubtotales();

	}else{
		alert("error al ingresar el detalle, revisar las datos del articulo ");
	}
}


function agregarDetalleImagen(idarticulo,articulo,fmsi, descripcion,marca,publico1, stock, idsucursal, costo, publico, taller, credito, mayoreo, imagen){
	
	var precioCot = 0;
	let tipoPrecio = document.getElementById("tipoPrecio").value;	
	precioCot = tipoPrecio == "Publico / Mostrador" ? publico : tipoPrecio == "Taller" ? taller : tipoPrecio == "Credito Taller" ? credito : tipoPrecio == "Mayoreo" ? mayoreo : publico1;	

	var cantidad=1;
	var descuento=0;

	if (idarticulo!="") {
		var fila='<tr style="font-size:12px" class="filas" id="fila'+cont+'">'+
        '<td><button style="width: 40px;" title="Eliminar" type="button" class="btn btn-danger btn-xs" onclick="eliminarDetalle('+cont+')">X</button></td>'+        
		'<td><input type="hidden" name="clave[]" value="'+articulo+'"> <input class="form-control" type="hidden" name="idsucursalArticulo[]" value="'+idsucursal+'"> <input class="form-control" type="hidden" name="idarticulo[]" value="'+idarticulo+'">'+articulo+'</td>'+
		'<td><input type="hidden" name="fmsi[]" id="fmsi[]" value="'+fmsi+'">'+fmsi+'</td>'+
		'<td><input type="hidden" name="marca[]" id="marca[]" value="'+marca+'">'+marca+'</td>'+
		'<td><textarea class="form-control" id="descripcion[]" name="descripcion[]" rows="2" style="width: 280px;" value="'+descripcion+'">'+descripcion+'</textarea></td>'+
        '<td><input style="width: 55px;" type="number" onblur="modificarSubtotales()" name="cantidad[]" id="cantidad[]" value="'+cantidad+'" max="" min="1"></td>'+
        '<td><input style="width: 70px;" type="number" onblur="modificarSubtotales()" name="precio_cotizacion[]" id="precio_cotizacion[]" step="any" value="'+ precioCot +'"></td>'+
        '<td><input style="width: 70px;" type="number" onblur="modificarSubtotales()" name="descuento[]" value="'+descuento+'"></td>'+
        '<td><span id="subtotal'+cont+'" name="subtotal">'+ precioCot*cantidad + '</span></td>'+
		'<td><img src="../files/articulos/'+imagen+'" alt="" width="250px" height="310" id="imagenmuestra" class="img-thumbnail"></td>'+        
		'</tr>';
		cont++;
		detalles++;
		$('#detalles').append(fila);
		modificarSubtotales();

	}else{
		alert("error al ingresar el detalle, revisar las datos del articulo ");
	}
}


function agregarDetalleEdit(idarticulo,articulo,fmsi, marca, descripcion,publico, stock, idarticuloSucursal){	
	stock = 1;

	//console.log("ID ARTICULO: ", idarticulo, "\nCÓDIGO: ", articulo, "\nFMSI: ", fmsi, "\nMARCA: ", marca, "\nDESCRIPCIÓN: ", descripcion, "\nCOSTO: ", publico, "\nCANTIDAD: ", stock);	
	var idservicio = document.getElementById("idservicio").value;	
	var idcliente = document.getElementById("idcliente").value;
	console.log(`ID SERVICIO:${idservicio.trim()}`);

	var now = new Date();
	var day =("0"+now.getDate()).slice(-2);
	var month=("0"+(now.getMonth()+1)).slice(-2);
	var today=now.getFullYear()+"-"+(month)+"-"+(day);

	if (idarticulo!="") {

		$.ajax({
			url: "../ajax/cotizacion.php?op=guardarProductoServicio&idservicios=" + idservicio + "&idArticulo=" + idarticulo + "&codigoArticulo="+articulo
			+ "&fmsiArticulo="+ fmsi + "&marcaArticulo="+marca + "&descripcionArticulo="+descripcion
			+ "&costoArticulo="+publico + "&cantidadArticulo="+stock+"&servicioId="+idservicio + "&dateTime=" + today
			+ "&idcliente=" + idcliente + "&idarticuloSucursal=" + idarticuloSucursal,
			type: "POST",			
		   beforeSend: function() {
		   },
			contentType: false,
			processData: false,
	
			success: function(data){
			   swal({
				   position: 'top-end',
				   type: 'success',
				   title: data,
				   showConfirmButton: true,				   
			   });
			   detallesServicioEditar(idservicio);
			},
		});

	}else{
		alert("error al ingresar el detalle, revisar las datos del articulo ");
	}
}

function modificarSubtotales(){
	var cant=document.getElementsByName("cantidad[]");
	var prev=document.getElementsByName("precio_cotizacion[]");
	var desc=document.getElementsByName("descuento[]");
	var sub=document.getElementsByName("subtotal");
	var fmsi=document.getElementsByName("fmsi[]");
	var descripcion=document.getElementsByName("descripcion[]");
	
	for (var i = 0; i < cant.length; i++) {
		var inpV=cant[i];		
		var inpP=prev[i];
		var inpS=sub[i];
		var des=desc[i];
		var fmsis = fmsi[i];
		var descrip = descripcion[i];
		var descuento = des.value / 100;	
		var cantPrec = inpV.value * inpP.value;
		var nuevoCosto = (cantPrec - (cantPrec * descuento));
		inpS.value=nuevoCosto;

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
	$("#total").html("$" + total);
	$("#total_cotizacion").val(total);
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