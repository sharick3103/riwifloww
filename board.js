
const vistas = {
  dashboard: {
    titulo: "Dashboard",
    contenido: () => document.getElementById("vista-dashboard").innerHTML
  },
  projects: {
    titulo: "Projects",
    contenido: () => document.getElementById("vista-projects").innerHTML
  },
  team: {
    titulo: "Team",
    contenido: () => document.getElementById("vista-team").innerHTML
  },
  reports: {
    titulo: "Reports",
    contenido: () => document.getElementById("vista-reports").innerHTML
  },
  settings: {
    titulo: "Settings",
    contenido: () => document.getElementById("vista-settings").innerHTML
  }
};

function navegarA(ruta) {


  if (!vistas[ruta]) {
    console.error("Ruta no encontrada:", ruta);
    return;
  }


  history.pushState({ ruta: ruta }, vistas[ruta].titulo, "#" + ruta);


  renderizarVista(ruta);

  actualizarNavActivo(ruta);
}

function renderizarVista(ruta) {

  const areaContenido = document.getElementById("area-contenido");

  areaContenido.style.opacity = "0";
  areaContenido.style.transform = "translateY(8px)";
  areaContenido.style.transition = "opacity 0.2s ease, transform 0.2s ease";


  setTimeout(() => {
  
    areaContenido.innerHTML = vistas[ruta].contenido();

   
    areaContenido.style.opacity = "1";
    areaContenido.style.transform = "translateY(0)";
  }, 150);
}


function actualizarNavActivo(rutaActiva) {


  const enlaces = document.querySelectorAll("aside nav a");

  enlaces.forEach(function(enlace) {

    const rutaEnlace = enlace.getAttribute("data-ruta");

    if (rutaEnlace === rutaActiva) {

      enlace.classList.add("bg-primary-fixed", "text-on-primary-fixed-variant");
      enlace.classList.remove("text-secondary", "hover:text-primary", "hover:bg-primary-container/10");
    } else {

      enlace.classList.remove("bg-primary-fixed", "text-on-primary-fixed-variant");
      enlace.classList.add("text-secondary", "hover:text-primary", "hover:bg-primary-container/10");
    }
  });
}

window.addEventListener("popstate", function(evento) {

  if (evento.state && evento.state.ruta) {

    renderizarVista(evento.state.ruta);
    actualizarNavActivo(evento.state.ruta);
  } else {

    renderizarVista("dashboard");
    actualizarNavActivo("dashboard");
  }
});

// ── 6. Conectar los enlaces del menú lateral ──────────────────
function inicializarNavegacion() {

  const enlaces = document.querySelectorAll("aside nav a");

  enlaces.forEach(function(enlace) {
    enlace.addEventListener("click", function(evento) {
      // Evitar que el navegador siga el href="#" y recargue
      evento.preventDefault();

      // Leer la ruta del atributo data-ruta del enlace
      const ruta = enlace.getAttribute("data-ruta");

      if (ruta) {
        navegarA(ruta);
      }
    });
  });
}

// ── 7. Cargar la vista inicial al abrir la página ─────────────
document.addEventListener("DOMContentLoaded", function() {

  // Leer la ruta desde la URL actual (ej: #projects → "projects")
  const rutaInicial = window.location.hash.replace("#", "") || "dashboard";

  // Inicializar los listeners de los enlaces
  inicializarNavegacion();

  // Mostrar la vista correcta según la URL
  renderizarVista(rutaInicial);
  actualizarNavActivo(rutaInicial);

  // Guardar el estado inicial en el historial
  history.replaceState({ ruta: rutaInicial }, vistas[rutaInicial]?.titulo || "Dashboard", "#" + rutaInicial);
});