// ======================================
// CONFIGURACIÓN DE RUTAS
// ======================================

// Detectar la ubicación del archivo JS
const scriptUrl = document.currentScript.src;

// Obtener la ubicación de menu.html
const menuUrl = new URL('../menu.html', scriptUrl);


// ======================================
// CARGAR MENÚ
// ======================================

fetch(menuUrl)

    .then(response => {

        if (!response.ok) {
            throw new Error(
                `No se pudo encontrar menu.html: ${response.status}`
            );
        }

        return response.text();

    })

    .then(html => {

        const menuContainer = document.getElementById('menu');

        if (!menuContainer) {
            throw new Error('No existe el elemento #menu');
        }

        // Insertar menú
        menuContainer.innerHTML = html;


        // ======================================
        // CONFIGURAR ENLACES
        // ======================================

        menuContainer.querySelectorAll('a[href]').forEach(link => {

            const href = link.getAttribute('href');

            // No modificar enlaces externos ni anclas
            if (
                href.startsWith('#') ||
                href.startsWith('http://') ||
                href.startsWith('https://') ||
                href.startsWith('mailto:')
            ) {
                return;
            }

            // Construir rutas desde la raíz del proyecto
            link.href = new URL(href, menuUrl).href;

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