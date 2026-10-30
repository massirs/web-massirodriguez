
fetch('/html/menu.html')
    .then(response => {
        if (!response.ok) {
            throw new Error('No se encontró menu.html');
        }

        return response.text();
    })
    .then(html => {
        const menuContainer = document.getElementById('menu');

        if (!menuContainer) {
            throw new Error('No existe el elemento #menu');
        }

        // Insertar el HTML del menú
        menuContainer.innerHTML = html;

        // Buscar los elementos DESPUÉS de insertar el HTML
        const overlayMenu = menuContainer.querySelector('#overlayMenu');
        const menuBtn = menuContainer.querySelector('.menu-btn');
        const closeBtn = menuContainer.querySelector('.close-btn');

        if (!overlayMenu || !menuBtn || !closeBtn) {
            throw new Error('No se encontraron los elementos del menú');
        }

        // Abrir menú
        function openMenu() {
            overlayMenu.classList.add('active');
            overlayMenu.setAttribute('aria-hidden', 'false');
            menuBtn.classList.add('hidden');
            document.body.style.overflow = 'hidden';
        }

        // Cerrar menú
        function closeMenu() {
            overlayMenu.classList.remove('active');
            overlayMenu.setAttribute('aria-hidden', 'true');
            menuBtn.classList.remove('hidden');
            document.body.style.overflow = '';
        }

        // Eventos de los botones
        menuBtn.addEventListener('click', openMenu);
        closeBtn.addEventListener('click', closeMenu);

        // Cerrar con Escape
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                closeMenu();
            }
        });

        // Cerrar al seleccionar un enlace
        overlayMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    })
    .catch(error => {
        console.error('Error al cargar el menú:', error);

        const menuContainer = document.getElementById('menu');

        if (menuContainer) {
            menuContainer.textContent =
                'Error al cargar el menú. Comprueba que estás usando Live Server.';
        }
    });
