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

//BOTON LOGIN--------------------------------------------
let btnLogin = document.querySelector("#btn-login");
//--------------------------------------------------------
let usuario = JSON.parse(localStorage.getItem("user")) || [];
/*obtenemos el user del localS */

if (usuario) {
  btnLogin.innerText = usuario;
} else {
  btnLogin.innerText = "Inicio de sesión";
}

//INICIO DE SESION--------------------------------------
const sesion = () => {
  if (usuario) {
    localStorage.removeItem("user");
    location.replace("http://127.0.0.1:5500/pages/login.html");
    btnLogin.innerText = "Inicio de sesión";
  } else {
    localStorage.replace("http://127.0.0.1:5500/index.html");
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
