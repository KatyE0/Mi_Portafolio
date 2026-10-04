// nav y footer fijos al hacer scroll
window.addEventListener('scroll', function() {
    const menu = document.getElementById('header');
    const pie = document.getElementById('footer');
    if (window.scrollY > 0) {
        menu.style.backgroundColor = "var(--bg-pink)";
        menu.style.transition = "all ease-in .3s";
        menu.style.position = "fixed";
        pie.style.backgroundColor = "var(--bg-pink)";
        pie.style.transition = "all ease-in .3s"
    } else{
        menu.style.backgroundColor = "#00000000";
        pie.style.backgroundColor = "#00000000";

    }
});

    // const links = document.querySelectorAll("nav ul li a");

    // links.forEach(link => {
        // link.addEventListener("click", function() {
            
            // quitar clase active a todos
            // links.forEach(l => l.classList.remove("active"));
            
            // agregar active al clickeado
            // this.classList.add("active");
        // });
    // });

// Datos del carrusel

const data = [

    {
        img: "sources/background_no_imagen.webp",
        nombre: "Persona 2",
        texto: "Texto de ejemplo 2"
    },
    {
        img: "sources/background_no_imagen.webp",
        nombre: "Persona 1",
        texto: "Texto de ejemplo 1"
    },

];

// Índice actual
let index = 0;

// Elementos del DOM
const img = document.querySelector(".carrusel-img img");
const nombre = document.querySelector(".carrusel-text h4");
const texto = document.querySelector(".carrusel-text p");

const btnPrev = document.querySelectorAll(".btn-flecha")[0];
const btnNext = document.querySelectorAll(".btn-flecha")[1];

// Función para actualizar contenido
function actualizarCarrusel() {
    img.src = data[index].img;
    nombre.textContent = data[index].nombre;
    texto.textContent = data[index].texto;
}

// Evento botón siguiente
btnNext.addEventListener("click", (e) => {
    e.preventDefault();
    index++;
    if (index >= data.length) {
        index = 0; // vuelve al inicio
    }
    actualizarCarrusel();
});

// Evento botón anterior
btnPrev.addEventListener("click", (e) => {
    e.preventDefault();
    index--;
    if (index < 0) {
        index = data.length - 1; // va al final
    }
    actualizarCarrusel();
});


//Contacto
const formulario = document.getElementById("formContacto");

formulario.addEventListener("submit", async function (event) {

    event.preventDefault();

    const datos = new FormData(formulario);

    try {

        const respuesta = await fetch("/contacto", {
            method: "POST",
            body: datos
        });

        const resultado = await respuesta.text();

        if (respuesta.ok) {

            alert(resultado);

            window.location.href = "/";

        } else {

            alert("Ocurrió un error al enviar el mensaje.");

        }

    } catch (error) {

        console.error("Error:", error);

        alert("No se pudo enviar el mensaje. Inténtalo nuevamente.");

    }

});
