var tabla;

//funcion que se ejecuta al inicio
function init(){
   mostrarform(false);
   obtener_registros();

   $("#formulario").on("submit",function(e){
   	guardaryeditar(e);
   })

   $("#imagenmuestra").hide();
//mostramos los permisos
$.post("../ajax/usuario.php?op=permisos&id=", function(r){
	$("#permisos").html(r);
});

$.post("../ajax/usuario.php?op=sucursales&id=", function(r){
	$("#sucursales").html(r);
});

//cargamos los items al select sucursal
$.post("../ajax/usuario.php?op=selectSucursal", function(r){
	$("#idsucursal").html(r);
	$('#idsucursal').selectpicker('refresh');
});
}

function activarPopover() {
	$(function () {
		$('[data-toggle="popover"]').popover()		
	})
}

//funcion limpiar
function limpiar(){
	$("#nombre").val("");    
	$("#direccion").val("");
	$("#telefono").val("");
	$("#email").val("");
	$("#cargo").val("");
	$("#login").val("");
	$("#clave").val("");
	$("#permisos").val("");
	$("#imagenmuestra").attr("src","");
	$("#imagenactual").val("");
	$("#idusuario").val("");
	$("#idsucursal").val("");
	$("#idNivelUsuario").val("");
}

//funcion mostrar formulario
function mostrarform(flag){
	limpiar();
	if(flag){
		$("#listadoregistros").hide();
		$("#formularioregistros").show();
		$("#btnGuardar").prop("disabled",false);
		$("#btnagregar").hide();
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

//funcion listar registros
function obtener_registros(usuarios){	
	$.ajax({
		url : '../ajax/usuario.php?op=listar',
		type : 'POST',
		dataType : 'html',
		data : { usuarios: usuarios },
	}
	)
	.done(function(resultado){
		$("#tabla_resultado").html(resultado);
		activarPopover();
	})
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

//funcion para guardaryeditar
function guardaryeditar(e){
     e.preventDefault();//no se activara la accion predeterminada 
     $("#btnGuardar").prop("disabled",true);
     var formData=new FormData($("#formulario")[0]);

     $.ajax({
     	url: "../ajax/usuario.php?op=guardaryeditar",
     	type: "POST",
     	data: formData,
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
     	}
     });
     limpiar();
}

function mostrar(idusuario){
	$.post("../ajax/usuario.php?op=mostrar",{idusuario : idusuario},
		function(data,status)
		{							
			data=JSON.parse(data);
			mostrarform(true);
			$("#nombre").val(data.nombre);
			$("#idsucursal").val(data.idsucursal);
			$("#idsucursal").selectpicker('refresh');
			$("#idNivelUsuario").val(data.acceso);
			$("#idNivelUsuario").selectpicker('refresh');
            $("#direccion").val(data.direccion);
            $("#telefono").val(data.telefono);
            $("#email").val(data.email);
            $("#cargo").val(data.cargo);
            $("#login").val(data.login);
            $("#clave").val(data.clave);
            $("#imagenmuestra").show();
            $("#imagenmuestra").attr("src","../files/usuarios/"+data.imagen);
            $("#imagenactual").val(data.imagen);
            $("#idusuario").val(data.idusuario);
		});
		$.post("../ajax/usuario.php?op=permisos&id="+idusuario, function(r){
			$("#permisos").html(r);
		});
		$.post("../ajax/usuario.php?op=listarSucursales&id="+idusuario, function(r){
			console.log("SUCURSALES: ", r);
			$("#sucursales").html(r);
		});
}


//funcion para desactivar
function desactivar(idusuario){
	swal({
		title: '??Est?? seguro de borrar el usuario?',
		text: "??Si no lo est?? puede cancelar la acc????n!",
		type: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  cancelButtonText: 'Cancelar',
		  confirmButtonText: 'Si, borrar usuario!'
	  }).then(function(result){
	
		if(result.value){
	
			$.post("../ajax/usuario.php?op=desactivar", {idusuario : idusuario}, function(e){
				swal(
				'Usuario eliminado!',
				'Se elimino correctamente el usuario.',
				'success'
				)
				obtener_registros();
			});	
		}
	})
}

function activar(idusuario){
	swal({
		title: '??Est?? seguro de activar el usuario?',
		text: "??Si no lo est?? puede cancelar la acc????n!",
		type: 'question',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  cancelButtonText: 'Cancelar',
		  confirmButtonText: 'Si, activar usuario!'
	  }).then(function(result){
		  if(result.value) {
			$.post("../ajax/usuario.php?op=activar", {idusuario : idusuario}, function(e){
				swal(
				'Usuario activado!',
				'Se activo correctamente el usuario.',
				'success'
				)
				obtener_registros();
			});
		  }
		})
}

init();