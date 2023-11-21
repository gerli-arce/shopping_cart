$(document).ready(function () {
  sessionStorage.setItem("car", "[]");
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
                            <p class="card-text">Precio: S/${producto.price}</p>
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
  var car = JSON.parse(sessionStorage.getItem("car"));
  var is_duplicate = false;
  for (var i = 0; i < car.length; i++) {
    var car_ = car[i];
    if (car_.id === data.id) {
      is_duplicate = true;
      break; 
    }
  }
  if (is_duplicate) {
     Swal.fire({
        icon: "error",
        title: "No pueden duplicarse los productos",
        text: "Este producto ya existe en tu carrito ",
        
      });
  } else {
    car.push(data);
    sessionStorage.setItem("car", JSON.stringify(car));
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Producto agregado correctamente",
      showConfirmButton: false,
      timer: 500,
    });
  }
});

const vierw_car = () => {
  $("#modal_view_car").modal("show");
  $("#view_products_car").html(null);
  var data = JSON.parse(sessionStorage.getItem("car"));
  var price_all = 0;
  $.each(data, function (i, product) {
    var rowId = "row_" + i; 
    price_all += parseFloat(product.price);
    $("#view_products_car").append(`
        <tr id="${rowId}" data=''>
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
                    <input type="number"  min="0" value="1" style="width: 40%;" class="quantityInput form-control" data-row-id="${rowId}">
                </center>
            </td>
            <td>
                <button class="btn btn-danger" data-row-id="${rowId}">Eliminar</button>
            </td>
            <td>
                <center>
                   <p> S/<span class="productTotal" data-price="${parseFloat(
                     product.price
                   ).toFixed(2)}">${parseFloat(product.price).toFixed(2)}</span>
                </center>
            </td>
        </tr>
    `);
    product.storageId = "product_" + i;
  });

  $("#view_products_car").append(`
    <tr>
      <td colspan="5">
        <center>
          <strong>
            PRECIO TOTAL
          </strong>
        </center>
      </td>
      <td>
        <center id="price_products_all" data="${price_all.toFixed(2)}">
          S/${price_all.toFixed(2)}
        </center>
      </td>
    </tr>
  `);

  $(".quantityInput").on("input", function () {
    var rowId = $(this).data("row-id");
    var quantity = $(this).val();
    var productPrice = parseFloat(
      $("#" + rowId + " .productTotal").data("price")
    );
    var newProductTotal = (quantity * productPrice).toFixed(2);
    $("#" + rowId + " .productTotal").text(newProductTotal);
    updateTotalPrice();
  });
  $(".btn-danger").on("click", function () {
    var rowId = $(this).data("row-id");
    var productIndex = rowId.split("_")[1]; 
    $("#" + rowId).remove();
    var removedProduct = data.splice(productIndex, 1)[0];
    sessionStorage.setItem("car", JSON.stringify(data));
    updateTotalPrice();
  });

  function updateTotalPrice() {
    var newTotalPrice = 0;
    $(".productTotal").each(function () {
      newTotalPrice += parseFloat($(this).text());
    });
    $("#price_products_all").text("S/" + newTotalPrice.toFixed(2));
  }
};
