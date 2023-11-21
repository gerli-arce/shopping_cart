$(document).ready(function () {
  sessionStorage.setItem("car", "[]");
  // Obtener productos y mostrarlos en la página
  $.ajax({
    url: "controller/products.php",
    type: "GET",
    dataType: "json",
    success: function (data) {
      mostrarProductos(data);
    },
  });

  const mostrarProductos = (productos) => {
    console.log(productos);
    var listaProductos = $("#productos");
    listaProductos.empty();

    $.each(productos, function (index, producto) {
      listaProductos.append(`
                <div class="col-md-4">
                    <div class="content_product agregar-carrito" data='${JSON.stringify(
                      producto
                    )}'>
                        <center>
                            <img src="images/${producto.image}">
                            <h5 class="card-title">${producto.name}</h5>
                            <p class="card-text">Precio: $${producto.price}</p>
                            <button class="btn btn-primary " >Agregar al Carrito</button>
                        </center>
                    </div>
                </div>
            `);
    });
  };
});

$(document).on("click", ".agregar-carrito", function () {
  var data = JSON.parse($(this).attr("data"));
  console.log(data);

  var carrito = $("#carrito");
  carrito.append(`
        <li class="list-group-item">
            ${data.name} - $${data.price}
            <button class="btn btn-danger btn-sm float-right quitar-carrito" data-id="${data.id}">Quitar</button>
        </li>
          `);

  var car = JSON.parse(sessionStorage.getItem("car"));

  car.push(data);

  sessionStorage.setItem("car", JSON.stringify(car));
  console.log(car);

  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Producto agregado correctamente",
    showConfirmButton: false,
    timer: 1500,
  });

  $(".quitar-carrito").click(function () {
    var id = $(this).data("id");
    $(this).parent().remove();
  });
});

const vierw_car = () => {
  $("#modal_view_car").modal("show");
  $('#view_products_car').html(null)
  var data = JSON.parse(sessionStorage.getItem('car'))
  console.log(data)
  $.each(data, function (i,product) {
    $('#view_products_car').append(`
        <tr>
            <td>
                <center>
                    <img src="images/${product.image}" class="img_cot">
                </center>
            </td>
            <td>
                ${product.name}
            </td>
            <td>
                <center>
                   S/${product.price}
                </center>
            </td>
            <td>
                <center>
                    <input type="number" value="1" style="width: 35%;">
                </center>
            </td>
            <td>
                <button class="btn btn-danger" >Eliminar</button>
            </td>
            <td>
                <center>
                   <p> S/<span>${product.price}</span>
                </center>
            </td>
        </tr>
    
    `)
    console.log(product) 
  });
};
