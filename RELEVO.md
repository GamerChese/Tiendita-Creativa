# Resumen de Relevo y Tutoría: La Tiendita Creativa (PIA - UANL)

## 1. Rol y Reglas del Tutor (si se continúa con tutoría IA)
* **Rol:** Tutor y maestro de programación web para el PIA de Diseño de Interfaces Web (Preparatoria Técnica "Álvaro Obregón", UANL).
* **Caso práctico:** *La Tiendita Creativa - Digitalizando lo hecho a mano* (productos artesanales; Bootstrap 5 para la etapa final).
* **Reglas estrictas:**
  1. Nunca dar la respuesta ni código resuelto; guiar paso a paso para que el estudiante construya su propio código.
  2. Ante errores o bloqueos, explicar únicamente la **teoría concreta** detrás del problema para que el estudiante razone y lo corrija por sí mismo.
  3. Resolver dudas conceptuales directas (*"¿para qué sirve?"*, *"¿cómo funciona?"*) con claridad y ejemplos teóricos breves (de otros casos).

---

## 2. Contexto General y Paleta
* **Stack actual:** HTML5 + CSS3 modularizado + Vanilla JavaScript (sin servidor; Bootstrap 5 pendiente para la etapa final).
* **Paleta de colores (`:root` en `css/base.css`):**
  * `--crema: #F5EBDD`
  * `--arena: #DCC4A8`
  * `--terracota: #A46B55`
  * `--oliva: #78815A`
  * `--cafe: #543526`
  * `--blanco: #FFFDF9`

---

## 3. Arquitectura Actual de Archivos

### HTML
* **`index.html`:** Página principal. Contiene:
  * `<nav class="menu" id="menu">`: menú flotante con enlaces (`#start`, `#productos`) y botón `.carrito` con `#contador`.
  * `.topbar#start`: banner principal con título y `hero-banner.webp`.
  * `.welcome`: bienvenida, filosofía y contador de visitas (`#visitas`).
  * `.tienda#productos`: selector de categorías (`.boton-categoria` con `data-categoria`) y contenedor `#catalogo`.
  * `<footer>`: redes sociales (`Instagram`, `Facebook`, `X`), `<hr>` y texto legal.
  * `#toast` (notificación emergente) y `.btn-up` (botón flotante para subir).
* **`gracias.html`:** Borrador inicial recién creado con título y mensajes de agradecimiento. *(Pendiente: enlazar CSS, cambiar `lang="en"` a `"es"`, y reemplazar el texto de la línea 16 por el botón/enlace hacia contacto/inicio).*

### CSS (Modularizado con `@import`)
* **`css/main.css`:** Punto de entrada; solo importa los módulos en este orden:
  1. **`css/base.css`:** `:root` con paleta, `scroll-behavior: smooth`, fuentes (`Playfair Display`, `Lato`) y `body` con fondo texturizado (`background-image` + `repeat` + respaldo `--crema`).
  2. **`css/layout.css`:** Estructura de `footer`, `.topbar`, `.welcome`, `.menu`, `.carrito`, `.tienda`, `.catalogo`, `.producto`, `.selector-categorias` y `.toast`.
  3. **`css/components.css`:** Detalles internos de `.btn-up`, `.hero-text`, `.welcome`, `.scroll-text`, `footer hr`, `.menu-opciones`, `.carrito`, `.producto`, `.boton-categoria` (`.activo`), `.contacto h2` y `.toast.encendido`.
  4. **`css/animations.css`:** Estados `:hover` de `.menu`, `.producto`, `.agregar`, `.boton-categoria:hover:not(.activo)` y `.btn-up`.
  5. **`css/responsive.css`:** `@media` en `900px` y `550px` para `.catalogo`.

### JavaScript
* **`js/main.js`:**
  * **Menú dinámico:** `actualizarMenu()` encoge `.menu` y oculta `.menu-opciones` al hacer scroll/resize.
  * **Catálogo:** Arreglo `productos` (9 productos en `Decoración`, `Papelería` y `Accesorios`) renderizados con `mostrarProductos()` en `#catalogo`.
  * **Filtro:** Eventos en `.boton-categoria` usando `data-categoria`, `.activo` y `.filter()`.
  * **Carrito en memoria:** Arreglo `carrito[]` con delegación de eventos en `#catalogo`, lectura de `data-producto`, búsqueda con `.find()`, control de `cantidad` y `actualizarContador()` en `#contador`.
  * **Visitas:** Persistencia con `localStorage` (`"visitas"`) mostrado en `#visitas`.
  * **Toast:** `activarToast()` muestra `#toast` con `.encendido` y lo oculta con `setTimeout` a los `1800` ms.

---

## 4. Estado Actual de Requisitos Oficiales

### Etapa 1: Estructura inicial (HTML)
* [x] Página de inicio con bienvenida y filosofía del emprendimiento.
* [x] Galería de productos separados por categoría (**Decoración, Papelería, Accesorios**).
* [~] Menú de navegación y pie de página (`<nav>` flotante listo; `<footer>` en HTML, falta enlace a Contacto cuando exista la sección y terminar estilos CSS del footer).
* [ ] Sección de contacto (formulario en HTML).

### Etapa 2: Estilos visuales (CSS)
* [x] Transmitir calidez y creatividad (paleta en tonos tierra, tipografía `Dancing Script` y **fondos texturizados**).
* [x] Layout flexible con Grid y Flexbox.
* [x] Animaciones suaves al pasar el mouse por los productos y botones de categoría.
* [x] Separación modular de estilos en `css/main.css` con `@import`.
* [~] Adaptabilidad a móvil/tablet (`.catalogo` ya tiene `@media` en `900px` y `550px`; falta adaptar `.topbar` y `.selector-categorias`).

### Etapa 3: Funciones interactivas (JavaScript sin servidor)
* [~] Simulación de carrito en memoria (ya identifica productos con `data-producto`, busca con `.find()`, acumula cantidades y actualiza `#contador`; falta el **panel/modal** para ver la lista y el total).
* [x] Filtro por tipo de producto (botones con `data-categoria`, clase `.activo` y `.filter()`).
* [x] Contador de visitas con `localStorage`.
* [x] Toast (notificación emergente) al agregar producto (`#toast`, `.toast.encendido`, `activarToast()` con `setTimeout`).
* [ ] Validación de formulario de contacto.
* [ ] Modo noche para navegación nocturna.

### Etapa 4: Interfaz moderna y publicación (UI profesional)
* [x] Botón flotante para regresar arriba (`.btn-up` con `href="#start"` y `scroll-behavior: smooth`).
* [~] Página simulada de `"gracias por tu pedido"` (`gracias.html` en borrador inicial).
* [ ] Integrar **Bootstrap 5** para tarjetas, navbar y formulario modal (cuidando no sobrescribir la paleta tierra ni el menú flotante).
* [ ] Publicación del sitio en GitHub Pages o Netlify.

---

## 5. Orden Sugerido para Continuar y Notas Importantes
1. **CSS rápido pendiente:** Completar estilos de `footer` (`padding`, `text-align`, `footer ul`/`a`) y agregar `@media` en `css/responsive.css` para `.topbar` y `.selector-categorias`.
2. **Modo noche:** Definir variables oscuras en una clase de `body` y alternarla con un botón + `localStorage`.
3. **Sección de contacto + validación JS:** Crear el formulario en `index.html`, agregar su enlace al menú/`footer` y validarlo en `js/main.js`. *(Nota: al dividir el CSS se perdió la regla contenedora `.contacto`, solo quedó `.contacto h2` en `css/components.css`, así que habrá que volver a agregarla).*
4. **Terminar `gracias.html`:** Enlazarle estilos coherentes con la paleta y reemplazar el texto `/* Boton que lleve a el apartado de contacto */` (que está con sintaxis de comentario CSS, no HTML) por el botón real hacia `index.html#contacto`.
5. **Bootstrap 5 + Modal del carrito:** Integrar Bootstrap cuidando que no sobrescriba la paleta tierra ni el menú flotante `.menu`, armar el modal con los productos de `carrito[]`, calcular el total y conectar el botón de confirmar compra hacia `gracias.html`.
6. **Publicación:** Subir el proyecto a GitHub Pages o Netlify.
