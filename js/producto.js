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
  //   console.log(producto);

  //2.c.v-Crear la tarjeta (si existe)
};
