
// ======================================
// CONFIGURACIÓN DE RUTAS
// ======================================

// Detectar automáticamente la carpeta raíz del proyecto
const scriptPath = new URL(document.currentScript.src).pathname;

const basePath = scriptPath
    .replace(/\/js\/header-menu\.js$/, '')
    .replace(/\/$/, '');


// ======================================
// CARGAR MENÚ
// ======================================

fetch(`${basePath}menu.html`)

    .then(response => {
        if (!response.ok) {
            throw new Error(
                `No se encontró menu.html. Error: ${response.status}`
            );
        }

        return response.text();
    })

    .then(html => {

        const menuContainer = document.getElementById('menu');

        if (!menuContainer) {
            throw new Error('No existe el elemento #menu');
        }

        // Insertar el menú
        menuContainer.innerHTML = html;


        // ======================================
        // CORREGIR RUTAS DE LOS ENLACES
        // ======================================

        menuContainer.querySelectorAll('a[href^="/"]').forEach(link => {

            const originalHref = link.getAttribute('href');

            link.setAttribute('href', `${basePath}${originalHref}`);

        });


        // ======================================
        // ELEMENTOS DEL MENÚ
        // ======================================

        const overlayMenu = menuContainer.querySelector('#overlayMenu');
        const menuBtn = menuContainer.querySelector('.menu-btn');
        const closeBtn = menuContainer.querySelector('.close-btn');

        if (!overlayMenu || !menuBtn || !closeBtn) {
            throw new Error('No se encontraron los elementos del menú');
        }


        // ======================================
        // ABRIR MENÚ
        // ======================================

        function openMenu() {

            overlayMenu.classList.add('active');

            overlayMenu.setAttribute('aria-hidden', 'false');

            menuBtn.classList.add('hidden');

            document.body.style.overflow = 'hidden';

        }


        // ======================================
        // CERRAR MENÚ
        // ======================================

        function closeMenu() {

            overlayMenu.classList.remove('active');

            overlayMenu.setAttribute('aria-hidden', 'true');

            menuBtn.classList.remove('hidden');

            document.body.style.overflow = '';

        }


        // ======================================
        // EVENTOS
        // ======================================

        menuBtn.addEventListener('click', openMenu);

        closeBtn.addEventListener('click', closeMenu);


        // Cerrar con Escape
        document.addEventListener('keydown', function(event) {

            if (event.key === 'Escape') {
                closeMenu();
            }

        });


        // Cerrar al seleccionar un enlace
        overlayMenu.querySelectorAll('a').forEach(link => {

            link.addEventListener('click', closeMenu);

        });

        console.log('Menú cargado correctamente');

    })


    // ======================================
    // CONTROL DE ERRORES
    // ======================================

    .catch(error => {

        console.error('Error al cargar el menú:', error);

        const menuContainer = document.getElementById('menu');

        if (menuContainer) {

            menuContainer.textContent =
                'No se pudo cargar el menú. Revisa la consola del navegador.';

        }

    });
