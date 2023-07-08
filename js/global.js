class Producto {
  constructor(
    id,
    title,
    description,
    category,
    price,
    image,
    favorito = false
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.category = category;
    this.price = price;
    this.image = image;
    this.favorito = favorito;
  }
}

//4.a-BOTON LOGIN--------------------------------------------
let btnLogin = document.querySelector("#btn-login");
//--------------------------------------------------------
let usuario = JSON.parse(localStorage.getItem("user")) || [];
/*obtenemos el user del localS */

//Cambiamos la configuracion del boton
if (usuario) {
  btnLogin.innerText = usuario;
} else {
  btnLogin.innerText = "Inicio de sesión";
}

//4.b-FUNCION SESION--------------------------------------
const sesion = () => {
  if (usuario) {
    //Si el user esta logueado
    localStorage.removeItem("user");
    btnLogin.innerText = "Inicio de sesión";
    location.replace("http://127.0.0.1:5500/index.html");
  } else {
    //Si no esta logueado
    localStorage.replace("http://127.0.0.1:5500/pages/login.html");
  }
};
//--------------------------------------------------------

//3.marcarFavorito---------------------------------------
const marcarFavorito = (id) => {
  //Obtenemos con el id la posicion
  let index = productos.findIndex((item) => {
    return item.id == id;
  });
  //cambiamos el valor de favorito
  productos[index].favorito = !productos[index].favorito;
  //guardamos en localStorage
  localStorage.setItem("productos", JSON.stringify(productos));
  //Listamos los producos de nuevo
  listarProductos();
};
//3.--------------------------------------------------------
