const form = document.getElementById('formRegistro');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = document.getElementById('usuario').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('contrasena').value;
    const confirmar = document.getElementById('confirmar').value;

    if (!nombre || !email || !password || !confirmar) {
        alert('Por favor completa todos los campos');
        return;
    }

    if (password !== confirmar) {
        alert('Las contraseñas no coinciden');
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioExistente = usuarios.some(u => u.email === email);

    if (usuarioExistente) {
        alert('Ya existe un usuario con ese correo');
        return;
    }

    usuarios.push({ nombre, email, password, rol: 'cliente' });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Registro exitoso');
    form.reset();
    window.location.href = 'iniciodesesion.html';
})
