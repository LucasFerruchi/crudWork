//1.Traemos el contenedor de favoritos.html-------------
let contenedor = document.querySelector("#contenedor");

//2.Traemos productso de localS--------------------------
let productos = JSON.parse(localStorage.getItem("productos")) || [];

//3.Listar productos-------------------------------------
const listarProductos = () => {
  //Limpio el doc
  contenedor.innerHTML = "";

  //Traer los productos marcados como fav
  let productosFavoritos = productos.filter((producto) => {
    return producto.favorito === true;
  });

  /*Preguntamos primero si hay productos favoritos,
  mostrarlos. Sino!! dejar un ensaje que 
  la pagina esta vacia */

  if (productosFavoritos.length > 0) {
    productosFavoritos.forEach((item) => {
      //Creamos el NODO
      let columna = document.createElement("div");
      columna.className = "col";
      /*Estructura de tarjeta y agregar el h-100, 
          para que tengan todas el mismo alto*/
      let tarjeta = `<div class="card h-100">
          <div class="contenedor-img">     
          <img src="${item.image}" class="card-img-top img-tarjeta" alt="${item.title}">
          </div>
      <div class="card-body">
        <h5 class="card-title">${item.title}</h5>
        <div class="text-muted puntero" >
        <i class="fa fa-times fa-2x puntero" aria-hidden="true" onclick="marcarFavorito(${item.id})"></i>
        </div>
      </div>
      </div>`;

      columna.innerHTML = tarjeta;
      contenedor.appendChild(columna);
    });
  } else {
    let columna = document.createElement("div");
    let mensaje = `<h3>No existen productos favoritos!</h3>`;
    columna.innerHTML = mensaje;
    contenedor.appendChild(columna);
  }
};

listarProductos();
//3.--------------------------------------------------------
