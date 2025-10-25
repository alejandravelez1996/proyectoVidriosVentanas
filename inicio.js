const form = document.getElementById('formLogin');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const emailOUsuario = document.getElementById('usuarioEmail').value.trim();
    const password = document.getElementById('contrasena').value;

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuario = usuarios.find(u =>
        (u.email === emailOUsuario || u.nombre === emailOUsuario) && u.password === password
    );

    if (usuario) {
        alert(`Bienvenido, ${usuario.nombre}`);
        window.location.href = 'Inicio.html';
    } else {
        alert('Correo o contraseña incorrectos');
    }
});
