// Espera a que el contenido de la página esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Maneja el evento de envío del formulario
    document.getElementById('register-form').addEventListener('submit', async function(event) {
        event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional

        // Captura los valores de los campos del formulario
        const nombre = document.getElementById('nombre').value;
        const correo = document.getElementById('correo').value;
        const hashedPassword = document.getElementById('contrasena').value;
        const direccion = document.getElementById('direccion').value;
        const telefono = document.getElementById('telefono').value;

        // Crea un objeto con los datos a enviar
        const data = {
            nombre: nombre,
            correo: correo,
            contrasena: hashedPassword,
            direccion: direccion,
            telefono: telefono
        };

        try {
            // Realiza la solicitud POST a la API
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Convierte el objeto en JSON
            });

            // Procesa la respuesta de la API
            const result = await response.json();
            
            if (response.ok) {
                alert(result.message); // Mensaje de éxito
                window.location.href = 'login.html';
            } else {
                alert(result.message); // Mensaje de error
            }
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            alert('Hubo un problema al registrar el usuario.');
        }
    });

    // Espera a que el contenido de la página esté completamente cargado
    document.addEventListener('DOMContentLoaded', () => {
    // Maneja el evento de envío del formulario de inicio de sesión
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional

            // Captura los valores de los campos del formulario
            const correo = document.querySelector('input[name="correo"]').value;
            const contrasena = document.querySelector('input[name="contrasena"]').value;

            // Crea un objeto con los datos a enviar
            const data = {
                correo: correo,
                contrasena: contrasena
            };

            try {
                // Realiza la solicitud POST a la API
                const response = await fetch('http://localhost:3000/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data), // Convierte el objeto en JSON
                });

                // Procesa la respuesta de la API
                const result = await response.json();

                if (response.ok) {
                    alert(result.message); // Mensaje de éxito
                    window.location.href = 'catalogo.html'; // Cambia a la ruta correspondiente
                } else {
                    alert(result.message); // Mensaje de error
                }
            } catch (error) {
                console.error('Error al iniciar sesión:', error);
                alert('Hubo un problema al iniciar sesión.');
            }
        });
    } else {
        console.error('El formulario de inicio de sesión no se encontró.');
    }
});

});
