var tabla;

function init(){
    $('#producto_form').on("submit",function(e){
        guardaryeditar(e);
    })
}
$(document).ready(function(){
    tabla=$('#producto_data').dataTable({
        "aProcessing":true, //Activamos procesamiento del datatable
        "aServerSide":true, //Paginacion y filtrado realizados por el servidor
        dom:'Bfrtip', //Definimos los elementos del control de tabla
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5', 
            'pdf',            
        ],
        "ajax":{
            url:'../../controller/producto.php?op=listar',
            type:"get",
            dataType:'json',
            error: function(e){
                console.log(e.responseText);
            }
        },
        "bDetroy":true,
        "responsive":true,
        "bInfo":true,
        "iDisplayLength": 10, //Cantidad de registros por pagina
        "order":[[0,"asc"]], //ordenar (columna, orden)
        "language":{
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",            
            "sLoadingRecords": "Cargando",
            "oPaginate":{
                "sFirst": "Primero",
                "sLast": "Ultimo",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria":{
                "sSortAscending":"Activar para ordenar la columna de manera ascendente",
                "sSortDescending":"Activar para ordenar la columna de manera descendente",
            }

        }
    }).dataTable();
});

function guardaryeditar(e){
    console.log("::::::::")
    e.preventDefault();
    var formData= new FormData($("#producto_form")[0]);
    $.ajax({
        url: "../../controller/producto.php?op=guardaryeditar",
        type: "POST",
        data: formData,
        contentType: false, 
        processData: false,
        success: function (datos) {
           console.log(datos);
            $('#producto_form')[0].reset();
            $('#modalmantenimiento').modal('hide');
            $('#producto_data').DataTable().ajax.reload(); 
            swal({
                title: 'Guardar editar',
                text: 'Completado',
                type:success,
                confirmButtonText: "btn-success"
            });

        }

    });
}

function editar(prod_id){
console.log(prod_id);
}

function eliminar(prod_id){    
    Swal.fire({
        title: "Eliminar",
        text: "Está seguro de eliminar el registro?",
        icon: "error",
        showCancelButton: true,        
        confirmButtonText: "Si",
        cancelButtonText: "No",
        reverseButtons: true
    }).then((result) => {
        if(result.isConfirmed){
            //console.log(prod_id);
            $.post("../../controller/producto.php?op=eliminar",{prod_id:prod_id},function(data){
            });

            $('#producto_data').DataTable().ajax.reload();

            Swal.fire(  
                'Eliminado!',
                'El registro se eliminó correctamente',
                'sucess'
            )
        }
    })    
}
 
$(document).on("click","#btnnuevo", function(){
    $('#mdltitulo').html('Nuevo Registro');
    $('#modalmantenimiento').modal('show');
});

init();