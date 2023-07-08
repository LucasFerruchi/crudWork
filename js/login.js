//!continua clase 21 dic 1:15:00

//1.Crear un perfil admin de ejemplo
const admin = {
  correo: "admin@admin.com",
  password: "12345678",
};

//2.Verificar en el form de login los datos del admin--------
//a-Funcion login q recibe le event del form login

const logIn = (event) => {
  event.preventDefault();

  //b-Obtenemos los input
  let correo = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;

  //c-Verificar el correo}
  /*si el correo corresponde (admin),
    recien pasaria a verificar el password */
  if (correo === admin.correo) {
    //d-Verificar password
    if (password === admin.password) {
      //e-Enviamos datos al localS(NO LA CONTRASEÑA)
      localStorage.setItem("user", JSON.stringify(correo));
      //f-Ir a LOGIN.HTML
      location.replace("./admin.html");
    }
  } else {
    alert("El correo o la contraseña es incorrecto!");
  }
};

//! G - LISTENER
/*Le decimos a JVS que este "ESCUCHANDO" el
evento SUBMIT del form*/

document.getElementById("formulario").addEventListener("submit", logIn);
//2.----------------------------------------------------------
