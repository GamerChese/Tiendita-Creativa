const pedidoGuardado = sessionStorage.getItem("pedido-tiendita");
const resumenPedido = document.getElementById("resumen-pedido");

if (pedidoGuardado) {
    try {
        const pedido = JSON.parse(pedidoGuardado);
        const lista = document.getElementById("productos-pedido");
        const total = document.getElementById("total-pedido");
        const moneda = new Intl.NumberFormat("es-MX", {
            style: "currency",
            currency: "MXN",
            maximumFractionDigits: 0
        });

        lista.innerHTML = pedido.productos.map(producto => `
            <li><span>${producto.nombre} × ${producto.cantidad}</span><strong>${moneda.format(producto.precio * producto.cantidad)}</strong></li>
        `).join("");
        total.textContent = moneda.format(pedido.total);
        resumenPedido.classList.remove("d-none");
    } catch {
        sessionStorage.removeItem("pedido-tiendita");
    }
}
