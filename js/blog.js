document.addEventListener("DOMContentLoaded", function () {

    // Capturamos el formulario correcto (no el del navbar)
    const formulario = document.querySelector(".clase-container form");

    formulario.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita recargar la página

        // Capturamos los valores del formulario
        const nombre = document.getElementById("firstName").value.trim();
        const apellido = formulario.querySelectorAll("input")[1]?.value.trim() || "";
        const email = document.getElementById("email").value.trim();
        const edad = formulario.querySelector("input[type='number']")?.value.trim() || "";
        const notificacion = document.getElementById("method").value;

        // Limpiamos errores previos
        document.querySelectorAll(".error").forEach(e => e.textContent = "");

        let valido = true;

        // Validar nombre
        if (nombre === "") {
            mostrarError(document.getElementById("firstName"), "El nombre es obligatorio");
            valido = false;
        }

        // Validar email
        if (email === "") {
            mostrarError(document.getElementById("email"), "El correo es obligatorio");
            valido = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            mostrarError(document.getElementById("email"), "Formato de correo no válido");
            valido = false;
        }

        // Validar notificación
        if (notificacion === "") {
            mostrarError(document.getElementById("method"), "Selecciona una opción");
            valido = false;
        }

        // Si pasa las validaciones
        if (valido) {
            try {
                const inscripcion = { nombre, apellido, email, edad, notificacion };

                // Recuperamos inscripciones existentes o creamos un array vacío
                const inscripciones = JSON.parse(localStorage.getItem("inscripcionesBlog")) || [];

                // Agregamos la nueva inscripción
                inscripciones.push(inscripcion);

                // Guardamos los datos en localStorage
                localStorage.setItem("inscripcionesBlog", JSON.stringify(inscripciones));

                // Mostramos mensaje de éxito
                mostrarMensaje(`❤️ Nos alegra que seas parte de nuestro blog, ${nombre}! ❤️`, "success");

                // Limpiamos el formulario
                formulario.reset();
            } catch (error) {
                console.error("Error al guardar en localStorage:", error);
                mostrarMensaje("❌ Error al guardar los datos", "error");
            }
        }
    });

    // Función para mostrar errores
    function mostrarError(campo, mensaje) {
        let error = campo.parentElement.querySelector(".error");
        if (!error) {
            error = document.createElement("div");
            error.classList.add("error");
            campo.parentElement.appendChild(error);
        }
        error.textContent = mensaje;
        error.style.color = "red";
    }

    // Función para mostrar mensaje temporal
    function mostrarMensaje(texto, tipo) {
        const mensaje = document.createElement("p");
        mensaje.textContent = texto;
        mensaje.style.textAlign = "center";
        mensaje.style.marginTop = "15px";
        mensaje.style.fontWeight = "bold";
        mensaje.style.color = tipo === "success" ? "green" : "red";
        mensaje.style.fontSize = "18px";
        formulario.appendChild(mensaje);

        setTimeout(() => mensaje.remove(), 4000);
    }
});
