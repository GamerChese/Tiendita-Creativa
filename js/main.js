const menu = document.getElementById("menu");
const opciones = document.querySelector(".menu-opciones");

function actualizarMenu() {

    let progreso = Math.min(window.scrollY / 300, 1);

    let anchoInicial = Math.min(450, window.innerWidth - 40);
    let ancho = anchoInicial - (anchoInicial - 55) * progreso;

    menu.style.width = ancho + "px";

    opciones.style.opacity = 1 - progreso;
    opciones.style.transform = `translateX(${progreso * 50}px)`;
    opciones.style.visibility = progreso === 1 ? "hidden" : "visible";

}

window.addEventListener("scroll", actualizarMenu);
window.addEventListener("resize", actualizarMenu);

actualizarMenu();


const productos = [
    {
        id: 1,
        nombre: "Vela aromática",
        descripcion: "Vela artesanal con aroma a lavanda.",
        precio: 120,
        categoria: "Decoración",
        imagen: "vela-aromatica.webp"
    },
    {
        id: 2,
        nombre: "Maceta pintada",
        descripcion: "Maceta pintada a mano con diseño floral.",
        precio: 150,
        categoria: "Decoración",
        imagen: "maceta-pintada.webp"
    },
    {
        id: 3,
        nombre: "Florero artesanal",
        descripcion: "Florero de cerámica con detalles pintados a mano.",
        precio: 220,
        categoria: "Decoración",
        imagen: "florero-artesanal.webp"
    },
    {
        id: 4,
        nombre: "Libreta decorada",
        descripcion: "Libreta artesanal con portada de diseño floral.",
        precio: 95,
        categoria: "Papelería",
        imagen: "libreta-decorada.webp"
    },
    {
        id: 5,
        nombre: "Agenda artesanal",
        descripcion: "Agenda con diseño floral para organizar tus días.",
        precio: 180,
        categoria: "Papelería",
        imagen: "agenda-artesanal.webp"
    },
    {
        id: 6,
        nombre: "Separador libros",
        descripcion: "Separador de libros decorado con flores prensadas.",
        precio: 45,
        categoria: "Papelería",
        imagen: "separador-libros.webp"
    },
    {
        id: 7,
        nombre: "Tote bag",
        descripcion: "Bolsa de tela reutilizable con diseño floral.",
        precio: 160,
        categoria: "Accesorios",
        imagen: "tote-bag.webp"
    },
    {
        id: 8,
        nombre: "Pulsera artesanal",
        descripcion: "Pulsera de cuentas con dije floral.",
        precio: 75,
        categoria: "Accesorios",
        imagen: "pulsera-artesanal.webp"
    },
    {
        id: 9,
        nombre: "Llavero personalizado",
        descripcion: "Llavero de resina con detalles decorativos.",
        precio: 65,
        categoria: "Accesorios",
        imagen: "llavero-personalizado.webp"
    }
];

const catalogo = document.getElementById("catalogo");

function mostrarProductos() {

    catalogo.innerHTML = "";

    productos.forEach(producto => {

        catalogo.innerHTML += `
            <div class="producto">

                <img src="assets/images/products/${producto.imagen}"
                     alt="${producto.nombre}">

                <h3>${producto.nombre}</h3>

                <p>${producto.descripcion}</p>

                <span class="precio">$${producto.precio}.00</span>

                <button class="agregar">
                    Agregar al carrito
                </button>

            </div>
        `;

    });

}

mostrarProductos();