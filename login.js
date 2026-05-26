const API_URL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", function() {

  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async function(event) {

    event.preventDefault();

    const emailIngresado    = document.getElementById("email").value.trim();
    const passwordIngresada = document.getElementById("password").value;

    const respuesta = await fetch(
      API_URL + "/users?email=" + emailIngresado
    );

    const usuarios = await respuesta.json();
    const usuario  = usuarios[0];

    if (usuario && usuario.password === passwordIngresada) {

      localStorage.setItem("sesionActiva",  "true");
      localStorage.setItem("usuarioId",      usuario.id);
      localStorage.setItem("usuarioNombre",  usuario.name);
      localStorage.setItem("usuarioEmail",   usuario.email);
      localStorage.setItem("usuarioRol",     usuario.role);

      // ✅ Todos los roles van a board.html
      window.location.href = "board.html";

    } else {
      mostrarError("Correo o contraseña incorrectos. Intentalo de nuevo.");
    }
  });

});

function mostrarError(mensaje) {
  const yaExiste = document.getElementById("mensajeError");
  if (yaExiste) yaExiste.remove();

  const divError       = document.createElement("div");
  divError.id          = "mensajeError";
  divError.textContent =  mensaje;
  divError.className   = `
    flex items-center gap-2
    bg-red-50 border border-red-200
    text-red-700 text-sm font-medium
    px-4 py-3 rounded-lg
  `;

  const boton = document.querySelector("button[type='submit']").parentElement;
  boton.before(divError);
}