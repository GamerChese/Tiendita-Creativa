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

function mostrarProductos(listaProductos) {
    catalogo.innerHTML = "";

    listaProductos.forEach(producto => {

        catalogo.innerHTML += `
            <div class="producto">

                <img src="assets/images/products/${producto.imagen}"
                    alt="${producto.nombre}">

                <h3>${producto.nombre}</h3>

                <p>${producto.descripcion}</p>

                <span class="precio">$${producto.precio}.00</span>

                <button class="agregar" data-producto="${producto.id}">
                    Agregar al carrito
                </button>

            </div>
        `;

    });
}

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

catalogo.addEventListener("click", (e) => {
    if (e.target.classList.contains("agregar")){
        const read = e.target.dataset.producto;
        const id = Number(read);
        const compra = productos.find(producto =>
            producto.id === id
        )
        const enCarrito = carrito.find(producto =>
            producto.id === id
        )

        if(enCarrito){
            enCarrito.cantidad += 1;
        }
        else{
            carrito.push({...compra, cantidad: 1});
            
        }
    actualizarContador();
    activarToast();
    console.log(carrito);
    }
});    
const counter = document.getElementById("contador")

function actualizarContador(){
    let total = 0;
    carrito.forEach(producto =>{
        total = total + producto.cantidad;
    });
    counter.textContent = total;
}

let visitas_crudo = localStorage.getItem("visitas");
let visitas_numero = Number(visitas_crudo) ;
let visitas_real = visitas_numero + 1;

localStorage.setItem("visitas", visitas_real);

const visitas_texto = document.getElementById("visitas");
visitas_texto.textContent = visitas_real;


const texto_toast = "¡¡Articulo agregado al carrito exitosamente!!";
const elemento_toast = document.getElementById("toast");

function activarToast(){
    elemento_toast.textContent = texto_toast;
    elemento_toast.classList.add("encendido")
    setTimeout(() =>
    elemento_toast.classList.remove("encendido"),1800)
}