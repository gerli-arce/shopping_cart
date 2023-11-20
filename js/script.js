$(document).ready(function () {
    // Obtener productos y mostrarlos en la página
    $.ajax({
        url: 'controller/products.php',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            mostrarProductos(data);
        }
    });

    function mostrarProductos(productos) {
        console.log(productos)
        var listaProductos = $('#productos');
        listaProductos.empty();

        $.each(productos, function (index, producto) {
            listaProductos.append(`
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">${producto.name}</h5>
                        <p class="card-text">Precio: $${producto.price}</p>
                        <button class="btn btn-primary agregar-carrito" data-id="${producto.id}" data-nombre="${producto.name}" data-precio="${producto.price}">Agregar al Carrito</button>
                    </div>
                </div>
            `);
        });

        // Manejar clic en "Agregar al Carrito"
        $('.agregar-carrito').click(function () {
            var id = $(this).data('id');
            var nombre = $(this).data('nombre');
            var precio = $(this).data('precio');
            agregarAlCarrito(id, nombre, precio);
        });
    }

    // Función para agregar productos al carrito
    function agregarAlCarrito(id, nombre, precio) {
        var carrito = $('#carrito');
        carrito.append(`
            <li class="list-group-item">
                ${nombre} - $${precio}
                <button class="btn btn-danger btn-sm float-right quitar-carrito" data-id="${id}">Quitar</button>
            </li>
        `);

        // Manejar clic en "Quitar"
        $('.quitar-carrito').click(function () {
            var id = $(this).data('id');
            $(this).parent().remove();
        });
    }
});


const new_product = ()=>{
    $('#modal_add_product').modal('show')
}