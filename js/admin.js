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

//! 10.Configuracion de la pag admin.html
//a-Crear la funcion validarUsuario
const validarUsuario = () => {
  //1-Traigo el user del locaS
  let usuario = JSON.parse(localStorage.getItem("user")) || null;

  /*2-Si usuario es TRUE, cargar la tabla, sino
  limpiar el html y dejar un mensaje*/
  if (usuario) {
    cargarTabla();
  } else {
    main.innerHTML = "";

    //! 11. agregar el mensaje de alerta
    //a-Creamos el div con su clase
    let col = document.createElement("div");
    col.classList = "row mt-3";
    //b-contenido, un alert traido de la pag de bootstrap
    let contenido = `<div class="col"><div class="alert alert-danger" role="alert">
    No tiene permisos para acceder a esta página!
    </div>
    </div>`;

    col.innerHTML = contenido;
    main.append(col);
  }
};

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
    <td>${producto.price}</td>
   
    <td>
    <div class="d-flex gap-2">
    <i class="fa fa-pencil text-success puntero" onclick="abrirModal(${producto.id})" aria-hidden="true"></i>
    <i class="fa fa-trash-o text-danger puntero" onclick="eliminarProducto(${producto.id})" aria-hidden="true"></i>
    </div>
    </td>`;

    //Creamos el nodo
    // tableRow.append(contenidoHtml);
    // Tambien puedo hacerlo con:y es a forma correcta-------
    tableRow.innerHTML = contenidoHtml;

    //Agregamos la estructura al cuerpo de la tabla
    cuerpoTabla.append(tableRow);
  });
};
//5.------------------------------------------------------

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
//6.-----------------------------------------------------

//7.Eliminar producto -- con el FILTER-------------------
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
  let validar = confirm(
    `Esta seguro que desea eliminar el producto con el id ${id}?`
  );

  if (validar) {
    productos = [...nuevoArreglo];
    localStorage.setItem("productos", JSON.stringify(productos));
    cargarTabla();
  }
  /*e.---Y COMENTAR EL PUNTO C. DE ABAJO, 
  porq el cod ya esta dentro del e.*/

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
//7.-----------------------------------------------------

//9.Actualizar producto----------------------------------
//9.g.Abrir modal y completarlo con los datos del prod
const abrirModal = (id) => {
  /*A.mostrar en consola que recibo el di del producto */
  console.log(id);

  /*------------------------------------------ */
  /*B.h.Tambien necesito la posicion del elemento,
  usamos el indexUpdate que creamos al principio*/
  indexUpdate = productos.findIndex((item) => {
    return item.id == id;
  });
  console.log(indexUpdate);
  /*------------------------------------------ */

  /*------------------------------------------ */
  /*C.i.Capturar los campos del modal */
  document.querySelector("#tituloModal").value = productos[indexUpdate].title;
  document.querySelector("#descripcionModal").value =
    productos[indexUpdate].description;
  document.querySelector("#categoriaModal").value =
    productos[indexUpdate].category;
  document.querySelector("#precioModal").value = productos[indexUpdate].price;
  document.querySelector("#imagenModal").value = productos[indexUpdate].image;
  /*------------------------------------------ */

  /*A.*/
  myModal.show();
};

//9.j. Funcion actualizarProducto
const actualizarProducto = (event) => {
  event.preventDefault();
  //Mostrar el sig log antes de continuar
  // console.log(indexUpdate);

  /*Asignamos los valores de las propiedades
  a los input del form del modal*/
  productos[indexUpdate].title = document.querySelector("#tituloModal").value;
  productos[indexUpdate].description =
    document.querySelector("#descripcionModal").value;

  productos[indexUpdate].category =
    document.querySelector("#categoriaModal").value;

  productos[indexUpdate].price = document.querySelector("#precioModal").value;
  productos[indexUpdate].image = document.querySelector("#imagenModal").value;

  //Actualizar el lcoalStorage
  localStorage.setItem("productos", JSON.stringify(productos));
  //Cargar tabla
  cargarTabla();
  //Cerrar o escondar modal
  myModal.hide();
};
//9.-----------------------------------------------------

// //La llamamos, xa q cada vez q cargue la pag se ejecute
// cargarTabla();
// //5.-----------------------------------------------------

//! 10-
validarUsuario();

//!------------------------------------------------------
//!------------------------------------------------------
//!ELIMINAR PRODUCTO OTRA FORMA--------------------------
// /*QUE EN EL MENSJA DE ADVERTENCIA APAREZCA
// EL NOMBRE DEL PRODUCTO*/

// //Agregaos al foeeach el index, EN CARGARTABLA
// const cargarTabla = () => {
//   cuerpoTabla.innerHTML = "";
//   productos.forEach((producto, index) => {
//     let tableRow = document.createElement("tr");
//     let contenidoHtml = `<th scope="row">${producto.title}</th>
//     <td>${producto.description}</td>
//     <td>${producto.category}</td>
//     <td>${producto.price}</td>

//     <td>
//     <div class="d-flex gap-2">
//     <i class="fa fa-pencil text-success puntero" onclick="abrirModal(${producto.id})" aria-hidden="true"></i>
//     <i class="fa fa-trash-o text-danger puntero" onclick="eliminarProducto(${index})" aria-hidden="true"></i>
//     </div>
//     </td>`;

//     tableRow.innerHTML = contenidoHtml;

//     cuerpoTabla.append(tableRow);
//   });
// };
//!------------------------------------------------------

// /*al modificar cargarTabla, aqui ahora estaria
// recibiendo directamente la posicion */
// const eliminarProducto = (index) => {
//   let nuevoArreglo = productos.filter((producto) => {
//     /*aqui decimos que traiga todos los prod
//     que no tengan este id */
//     return producto.id != productos[index].id;
//   });

//   let validar = confirm(
//     //!cambiamos el mens
//     `Esta seguro que desea eliminar el producto ${productos[index].title}?`
//   );

//   if (validar) {
//     /*aqui decimos que el arreglo original, ahora,
//     sea el nuevo arreglo */
//     productos = [...nuevoArreglo];
//     localStorage.setItem("productos", JSON.stringify(productos));
//     cargarTabla();
//   }
// };

//!------------------------------------------------------
//!------------------------------------------------------
//!ELIMINAR PRODUCTO CON SPLICE--------------------------
// const eliminarProducto = (index) => {
//   //!/*EL FILTER YA NO HARIA FALTA */
//   // let nuevoArreglo = productos.filter((producto) => {
//   //     return producto.id != productos[index].id;
//   // });

//   //!/*PREGUNTAMOS PRIMERO */
//   let validar = confirm(
//     `Esta seguro que desea eliminar el producto ${productos[index].title}?`
//   );

//   if (validar) {
//     productos.splice(index, 1);
//     //!/*EL SPREAD TAMPOCO HARIA FALTA */
//     // productos = [...nuevoArreglo];
//     localStorage.setItem("productos", JSON.stringify(productos));
//     cargarTabla();
//   }
// };

//!------------------------------------------------------
