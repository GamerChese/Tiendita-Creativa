const menu = document.getElementById("menu");
const opciones = document.getElementById("menu-opciones");
const menuCollapse = bootstrap.Collapse.getOrCreateInstance(opciones, { toggle: false });

function actualizarMenu() {
    if (window.innerWidth < 992) {
        menu.style.width = "min(450px, calc(100vw - 24px))";
        menu.classList.remove("menu-colapsado");
        opciones.style.opacity = "1";
        opciones.style.transform = "none";
        opciones.style.visibility = "visible";
        return;
    }

    const progreso = Math.min(window.scrollY / 300, 1);
    const anchoInicial = Math.min(650, window.innerWidth - 40);
    const ancho = anchoInicial - (anchoInicial - 55) * progreso;

    menu.style.width = `${ancho}px`;
    menu.classList.toggle("menu-colapsado", progreso === 1);
    opciones.style.opacity = 1 - progreso;
    opciones.style.transform = `translateX(${progreso * 35}px)`;
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

function mostrarProductos(listaProductos) {
    catalogo.innerHTML = listaProductos.map(producto => `
        <article class="card producto h-100">
            <img class="card-img-top" src="assets/images/products/${producto.imagen}" alt="${producto.nombre}" loading="lazy">
            <div class="card-body d-flex flex-column">
                <span class="producto-categoria">${producto.categoria}</span>
                <h3 class="card-title">${producto.nombre}</h3>
                <p class="card-text">${producto.descripcion}</p>
                <span class="precio mt-auto">${formatoMoneda.format(producto.precio)}</span>
                <button class="btn btn-primary agregar" type="button" data-producto="${producto.id}">Agregar al carrito</button>
            </div>
        </article>
    `).join("");
}

const formatoMoneda = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0
});

mostrarProductos(productos);

const botones = document.querySelectorAll(".boton-categoria");

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        botones.forEach(b => 
            b.classList.remove("activo"));
        boton.classList.add("activo");
        const state = boton.dataset.categoria
        if (state === "Todo"){
            mostrarProductos(productos);
        }
        else{
            const lista = productos.filter(producto => producto.categoria === state);
            mostrarProductos(lista);
        }
    });
});

const carrito = [];
const listaCarrito = document.getElementById("lista-carrito");
const carritoVacio = document.getElementById("carrito-vacio");
const totalCarrito = document.getElementById("total-carrito");
const botonConfirmarCompra = document.getElementById("confirmar-compra");
const carritoModal = document.getElementById("carritoModal");

catalogo.addEventListener("click", (e) => {
    const botonAgregar = e.target.closest(".agregar");
    if (botonAgregar) {
        const id = Number(botonAgregar.dataset.producto);
        const compra = productos.find(producto => producto.id === id);
        if (!compra) return;

        const enCarrito = carrito.find(producto => producto.id === id);
        if (enCarrito) enCarrito.cantidad += 1;
        else carrito.push({ ...compra, cantidad: 1 });

        actualizarContador();
        mostrarCarrito();
        activarToast();
    }
});

const counter = document.getElementById("contador");

function actualizarContador() {
    let total = 0;
    carrito.forEach(producto => total += producto.cantidad);
    counter.textContent = total;
    counter.setAttribute("aria-label", `${total} productos en el carrito`);
}

function mostrarCarrito() {
    const total = carrito.reduce((suma, producto) => suma + producto.precio * producto.cantidad, 0);
    carritoVacio.classList.toggle("d-none", carrito.length > 0);
    botonConfirmarCompra.disabled = carrito.length === 0;
    totalCarrito.textContent = formatoMoneda.format(total);

    listaCarrito.innerHTML = carrito.map(producto => `
        <div class="fila-carrito">
            <img src="assets/images/products/${producto.imagen}" alt="">
            <div class="fila-carrito-info">
                <strong>${producto.nombre}</strong>
                <span>${formatoMoneda.format(producto.precio)} c/u</span>
            </div>
            <div class="controles-cantidad" aria-label="Cantidad de ${producto.nombre}">
                <button class="btn btn-sm" type="button" data-carrito-accion="menos" data-producto="${producto.id}" aria-label="Quitar una unidad">−</button>
                <span>${producto.cantidad}</span>
                <button class="btn btn-sm" type="button" data-carrito-accion="mas" data-producto="${producto.id}" aria-label="Agregar una unidad">+</button>
            </div>
            <button class="btn btn-sm quitar-producto" type="button" data-carrito-accion="quitar" data-producto="${producto.id}" aria-label="Quitar ${producto.nombre} del carrito">Quitar</button>
        </div>
    `).join("");
}

listaCarrito.addEventListener("click", event => {
    const boton = event.target.closest("[data-carrito-accion]");
    if (!boton) return;

    const id = Number(boton.dataset.producto);
    const producto = carrito.find(item => item.id === id);
    if (!producto) return;

    if (boton.dataset.carritoAccion === "mas") producto.cantidad += 1;
    if (boton.dataset.carritoAccion === "menos") producto.cantidad -= 1;
    if (boton.dataset.carritoAccion === "quitar" || producto.cantidad <= 0) {
        carrito.splice(carrito.indexOf(producto), 1);
    }

    actualizarContador();
    mostrarCarrito();
});

carritoModal.addEventListener("show.bs.modal", mostrarCarrito);

botonConfirmarCompra.addEventListener("click", () => {
    if (!carrito.length) return;
    const total = carrito.reduce((suma, producto) => suma + producto.precio * producto.cantidad, 0);
    sessionStorage.setItem("pedido-tiendita", JSON.stringify({ productos: carrito, total }));
    window.location.href = "gracias.html";
});

const visitasNumero = Number(localStorage.getItem("visitas") || 0) + 1;
localStorage.setItem("visitas", String(visitasNumero));
document.getElementById("visitas").textContent = visitasNumero;


const texto_toast = "¡¡Articulo agregado al carrito exitosamente!!";
const elemento_toast = document.getElementById("toast");

function activarToast(){
    elemento_toast.textContent = texto_toast;
    elemento_toast.classList.add("encendido");
    window.clearTimeout(activarToast.temporizador);
    activarToast.temporizador = window.setTimeout(() => elemento_toast.classList.remove("encendido"), 1800);
}

const formularioContacto = document.getElementById("form-contacto");
const contactoConfirmacion = document.getElementById("contacto-confirmacion");
const contactoModal = document.getElementById("contactoModal");

formularioContacto.addEventListener("submit", event => {
    event.preventDefault();
    if (!formularioContacto.checkValidity()) {
        event.stopPropagation();
        formularioContacto.classList.add("was-validated");
        return;
    }

    formularioContacto.classList.add("d-none");
    contactoConfirmacion.classList.remove("d-none");
});

contactoModal.addEventListener("hidden.bs.modal", () => {
    formularioContacto.reset();
    formularioContacto.classList.remove("was-validated", "d-none");
    contactoConfirmacion.classList.add("d-none");
});

const modoToggle = document.getElementById("modo-toggle");
const modoGuardado = localStorage.getItem("modo-noche") === "true";

function aplicarModoNoche(activo) {
    document.body.classList.toggle("modo-noche", activo);
    modoToggle.textContent = activo ? "Modo día" : "Modo noche";
    modoToggle.setAttribute("aria-pressed", String(activo));
}

modoToggle.addEventListener("click", () => {
    const activo = !document.body.classList.contains("modo-noche");
    localStorage.setItem("modo-noche", String(activo));
    aplicarModoNoche(activo);
});

aplicarModoNoche(modoGuardado);

document.querySelectorAll("#menu-opciones .nav-link").forEach(enlace => {
    enlace.addEventListener("click", () => {
        if (window.innerWidth < 992) menuCollapse.hide();
    });
});

mostrarCarrito();
