//2.c.iv-Obtener el id de la dir web
//!IR A CONSOLA y mostrar "location.search" (devuelve el parametro de la web)
const parametro = new URLSearchParams(location.search);
/* mostrar en consola ahora "parametro", devuelve 
un objeto con metodos y nos interesa el get*/
//creamos una variable "id"
const idProducto = parametro.get("id");
//console.log(idProducto);

//2.a-Capturar contenedor
let contenedor = document.querySelector("#contenedor");

//2.b-Traer los productos
let productos = JSON.parse(localStorage.getItem("productos")) || [];

//2.c-Funcion para crear la card
const traerDatosProductos = () => {
  //2.c.iv-Encontrar el producto
  //!Ir primero a app.js a listarProducto
  let producto = productos.find((item) => item.id == idProducto);
  console.log(producto); //colocar funcion abajo para ejecutar automatica

  //2.c.v-Crear la tarjeta (si existe)
  if (producto) {
    let col = document.createElement("div");
    col.classList = "col";
    let tarjeta = `<div class="card mb-3">
    <div class="row g-0">
    <div class="col-md-4">
    <img src="${producto.image}" class="img-fluid rounded-start p-3" alt="${producto.title}">
    </div>
    <div class="col-md-8">
    <div class="card-body">
    <h5 class="card-title">${producto.title}</h5>
    <p class="card-text">${producto.description}</p>
    <p class="card-text"><small class="text-muted">Precio: $${producto.price}</small></p>
    </div>
    </div>
    </div>
    </div>`;

    col.innerHTML = tarjeta;
    contenedor.append(col);
  } else {
    console.log("No existe un producto con el id recibido");
  }

  //Si no existe
};
traerDatosProductos();
