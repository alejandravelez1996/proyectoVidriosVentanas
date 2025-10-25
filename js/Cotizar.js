// --- cotizar.js ---
// Este script valida el formulario y guarda los datos en localStorage

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formCotizacion");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // Capturamos los valores de los campos
    const servicio = document.getElementById("servicio").value.trim();
    const tamano = document.getElementById("tamano").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const identificacion = document.getElementById("identificacion").value.trim();
    const celular = document.getElementById("celular").value.trim();
    const correo = document.getElementById("correo").value.trim();

    // Capturar forma de pago (radio)
    const formaPago = document.querySelector("input[name='forma_pago']:checked");

    // Validaciones básicas
    if (!servicio) {
      alert("Por favor selecciona un tipo de servicio.");
      return;
    }

    if (!tamano) {
      alert("Por favor selecciona un tamaño.");
      return;
    }

    if (!formaPago) {
      alert("Por favor selecciona una forma de pago.");
      return;
    }

    if (nombre === "" || apellido === "" || identificacion === "" || celular === "" || correo === "") {
      alert("Por favor completa todos los campos personales.");
      return;
    }

    // Validación simple del correo
    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoValido.test(correo)) {
      alert("Por favor ingresa un correo válido.");
      return;
    }

    // Creamos el objeto con los datos de la cotización
    const cotizacion = {
      servicio,
      tamano,
      formaPago: formaPago.value,
      nombre,
      apellido,
      identificacion,
      celular,
      correo,
      fecha: new Date().toLocaleString(),
    };

    // Obtenemos las cotizaciones previas desde localStorage
    const cotizacionesGuardadas = JSON.parse(localStorage.getItem("cotizaciones")) || [];

    // Agregamos la nueva cotización
    cotizacionesGuardadas.push(cotizacion);

    // Guardamos todo nuevamente
    localStorage.setItem("cotizaciones", JSON.stringify(cotizacionesGuardadas));

    // Limpiamos el formulario
    form.reset();

    // Mensaje de confirmación
    alert("Tu cotización ha sido enviada correctamente. ¡Gracias por confiar en Vidrios y Ventanas!");
    console.log("Cotización guardada:", cotizacion);
  });
});