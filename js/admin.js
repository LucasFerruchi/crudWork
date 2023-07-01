// class Producto {
//   constructor(
//     id,
//     title,
//     description,
//     category,
//     price,
//     image,
//     favorito = false
//   ) {
//     this.id = id;
//     this.title = title;
//     this.description = description;
//     this.category = category;
//     this.price = price;
//     this.image = image;
//     this.favorito = favorito;
//   }
// }

//Camptura de elementos de admin.html
let main = document.querySelector("#main");
/*Se mostrara el contenido, o NO, dependiendo de 
si el usuario Admin se loguea*/

//Tabla y su cuerpo
let contenedorTabla = document.querySelector("#contenedor-tabla");
let cuerpoTabla = document.querySelector("#cuerpo-tabla");

//Viene del modal de admin.htlm
const myModal = new bootstrap.Modal(document.getElementById("productoModal"));
/*Mostrar en la pag de bootstrap, buscar modal y luego 
"via javascript", buscar el enlace y NO copiar 
el parametro de opciones*/

//Traemos los productos de localStorage
let productos = JSON.parse(localStorage.getItem("productos")) || [];

//Almacenaremos el id del producto que quiero actualizar o modificar
let indexUpdate = null;

//5.Cargar la tabla----------------------------------------------

/*Traigo de bootstrap 5, la sig estructura de una tabla */

/*
  <tr> //!(document.createElement("tr"))
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
*/

const cargarTabla = () => {
  //!6.p.LIMPIAR EL CUERPO DE LA TABLA
  cuerpoTabla.innerHTML = "";
  //!----------------------------------
  productos.forEach((producto) => {
    //Creamos la estructura de la fila
    let tableRow = document.createElement("tr");
    let contenidoHtml = `<th scope="row">${producto.title}</th>
    <td>${producto.description}</td>
    <td>${producto.category}</td>
    <td>${producto.price}</td>`;

    //Creamos el nodo
    // tableRow.append(contenidoHtml);
    // Tambien puedo hacerlo con:y es a forma correcta-------
    tableRow.innerHTML = contenidoHtml;

    //Agregamos la estructura al cuerpo de la tabla
    cuerpoTabla.append(tableRow);
  });
};

//6.Crear producto----------------------------------------------
const guardarProducto = (event) => {
  //6.g.
  event.preventDefault();
  // console.log("Se hizo submit");

  //6.i.CAPTURAMOS LOS VALORES DEL FORM
  /*Creamos el ID. Tambien podiamos hacerlo con el DATE,
  pero de la siguiente manera iriamos enumerandolos, tomando 
  el ulltimo producto y sumarle uno*/
  let id = productos.at(-1).id + 1;
  //Con .value capturamos el valor de los campos
  let titulo = document.querySelector("#titulo").value;
  let descripcion = document.querySelector("#descripcion").value;
  let categoria = document.querySelector("#categoria").value;
  let precio = document.querySelector("#precio").value;
  let imagen = document.querySelector("#imagen").value;

  //6.j.CREAMOS UNA INSTANCIA DE PRODUCTO
  let producto = new Producto(
    id,
    titulo,
    descripcion,
    categoria,
    precio,
    imagen
  );

  //6.K.GUARDAR EL NUEVO PRODUCTO
  productos.push(producto);

  //6.l. GUARDAR EN LOCALSTORAGE
  localStorage.setItem("productos", JSON.stringify(productos));

  // //!6.o.Limpiar table
  document.querySelector("#titulo").value = "";
  document.querySelector("#descripcion").value = "";
  document.querySelector("#categoria").value = "";
  document.querySelector("#precio").value = "";
  document.querySelector("#imagen").value = "";

  //6.n.Cargar tabla de nuevo
  cargarTabla();
};

//Eliminar producto -- con el FILTER
/*(metodo de array, da un nuevo arreglo)*/
const eliminarProducto = (id) => {
  /*a.crea un nuevo arrglo */
  let nuevoArreglo = productos.filter((producto) => {
    /*mostrara todos los productos con id diferente al mensionado */
    return producto.id != id;
  });
  // console.log(nuevoArreglo);
  /*b.En consola llamar a eliminarProducto, descomentar 
  la linea de arriba */

  //e. Preguntar si desea eliminar realmente
  let validar = confirm(`Esta seguro que desea eliminar el producto?`);

  if (validar) {
    productos = [...nuevoArreglo];
    localStorage.setItem("productos", JSON.stringify(productos));
    cargarTabla();
  }
  //e.------------Y COMENTAR EL PUNTO C. DE ABAJO

  // //c. Ahora decir a productos tenga un nuevo valor
  // productos = [...nuevoArreglo]; //SPREAD OPERATOR
  // console.log(productos);

  // //d. eliminar con la posicion del elemento, con splice y findIndex
  // const index = productos.findIndex((item) => {
  //   return item.id == id;
  // });
  // productos.splice(index, 1);
  // console.log(productos);
};

//Actualizar producto

//La llamamos, para que cada vez que cargue la pagina se ejecute
cargarTabla();
//5.----------------------------------------------
