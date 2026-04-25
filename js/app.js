// Lista base de productos del catálogo.
// Cada objeto representa un componente de hardware pensado para un e-commerce de PC.
const products = [
  {
  id: 1,
  nombre: 'Laptop Asus TUF Gaming A15 - AMD Ryzen 7 7445HS',
  precio: 17999,
  descripcion: 'Potente laptop gaming con procesador AMD Ryzen 7 7445HS y tarjeta gráfica NVIDIA RTX. Cuenta con 16GB de memoria RAM DDR5 y 512GB SSD. Pantalla Full HD (1920x1080) diseñada para alto rendimiento en gaming y tareas exigentes.',
  imagen: './media/1.png',
},
  {
  id: 2,
  nombre: 'Gamepad Inalámbrico Machenike G3 V2',
  precio: 657,
  descripcion: 'Control gamer multiplataforma (Switch/PC/Android/iOS) con Hall Effect Joysticks y Triggers. Ofrece una tasa de sondeo de 1000Hz, base de carga dedicada, giroscopio de 6 ejes y botones traseros configurables. Conectividad triple: Bluetooth, 2.4GHz y cable.',
  imagen: './media/2.png',
},
 {
  id: 3,
  nombre: 'Razer Blackshark V2 X Wired Gaming Headset Green',
  precio: 674,
  descripcion: 'Auriculares cerrados con diafragmas de 50mm para audio detallado. Incluyen micrófono flexible con cancelación de ruido, almohadillas de espuma viscoelástica para sellado hermético y conector Jack 3.5 mm. Compatibles con PC, consolas y dispositivos móviles.',
  imagen: './media/3.png',
},
  {
  id: 4,
  nombre: 'PC Gamer Pride Gaming Factor Black V2',
  precio: 24124,
  descripcion: 'Computadora de escritorio de alto rendimiento con procesador AMD Ryzen 7 5700X y GPU NVIDIA RTX 5060 de 8GB. Equipada con 32GB de RAM, 1TB SSD, enfriamiento líquido de 240mm y fuente de 650W 80 Plus. Todo montado en un gabinete Cougar con ventilación RGB.',
  imagen: './media/4.png',
},
{
  id: 5,
  nombre: 'Meta Quest 3S 256GB + Batman Arkham Shadow',
  precio: 7516,
  descripcion: 'Visor de realidad virtual inalámbrico con 256GB de almacenamiento. El paquete incluye el juego Batman Arkham Shadow y 3 meses de suscripción a Meta Horizon. Ideal para gaming, fitness y experiencias inmersivas sin cables.',
  imagen: './media/5.png',
},
{
  id: 6,
  nombre: 'Consola Sony PlayStation 5 Slim Digital 1TB SSD',
  precio: 9549,
  descripcion: 'Consola PS5 Slim edición digital con 1TB de almacenamiento SSD (825GB libres). Impulsada por un procesador AMD Ryzen Zen 2 y GPU Radeon con soporte para 120 FPS y resolución 4K. Incluye 16GB de RAM GDDR6, Wi-Fi 5.1 y Bluetooth para una experiencia de juego de última generación.',
  imagen: './media/6.png',
},
];

const STORAGE_KEY = 'pibblestore-cart';
const THEME_KEY = 'pibblestore-theme';
const catalogoView = document.getElementById('catalogo-view');
const carritoView = document.getElementById('carrito-view');
const productsContainer = document.getElementById('products-container');
const cartContainer = document.getElementById('cart-container');
const clearCartBtn = document.getElementById('clear-cart-btn');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const cartCountBadge = document.getElementById('cart-count-badge');
const cartNavButton = document.querySelector('.cart-btn');

// Obtiene el carrito desde localStorage.
// Se usa JSON.parse porque localStorage únicamente guarda texto plano.
// Si no existe información previa, devolvemos un arreglo vacío.
function getCartFromStorage() {
  const storedCart = localStorage.getItem(STORAGE_KEY);
  return storedCart ? JSON.parse(storedCart) : [];
}

// Guarda el carrito en localStorage.
// JSON.stringify convierte el arreglo de objetos a texto para poder persistirlo.
function saveCartToStorage(cart) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

// Agrega un producto al carrito.
// Si el producto ya está guardado, incrementa quantity; si no, lo crea con cantidad 1.
function saveToCart(product) {
  const cart = getCartFromStorage();
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCartToStorage(cart);
  renderCart();
}


// Formatea valores numéricos como moneda local.
function formatCurrency(value) {
  return value.toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN',
  });
}

// Renderiza el catálogo dinámicamente en el contenedor principal.
function renderProducts() {
  productsContainer.innerHTML = products
    .map(
      (product) => `
        <article class="col-12 col-sm-6 col-lg-4">
          <div class="card product-card h-100 shadow-sm border-0">
            <img src="${product.imagen}" class="card-img-top" alt="${product.nombre}" />
            <div class="card-body">
              <h3 class="h5 card-title">${product.nombre}</h3>
              <p class="card-text text-body-secondary">${product.descripcion}</p>
              <p class="price fs-5 text-primary mb-3">${formatCurrency(product.precio)}</p>
              <button type="button" class="btn btn-primary btn-add-cart w-100" data-product-id="${product.id}">
                Agregar al Carrito
              </button>
            </div>
          </div>
        </article>
      `
    )
    .join('');
}

// Construye la tabla/lista del carrito y calcula el total.
function renderCart() {
  const cart = getCartFromStorage();
  updateCartBadge(cart);

  if (cart.length === 0) {
    cartContainer.innerHTML = '<div class="alert alert-secondary mb-0 empty-state">El carrito está vacío.</div>';
    return;
  }

  const total = cart.reduce((accumulator, item) => {
    return accumulator + item.precio * item.quantity;
  }, 0);

  cartContainer.innerHTML = `
    <div class="table-responsive cart-table">
    <table class="table table-hover align-middle mb-0">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Precio</th>
          <th>Subtotal</th>
          <th class="text-end">Acciones</th>
        </tr>
      </thead>
      <tbody>
        ${cart
          .map(
            (item) => `
              <tr>
                <td>${item.nombre}</td>
                <td>${item.quantity}</td>
                <td>${formatCurrency(item.precio)}</td>
                <td>${formatCurrency(item.precio * item.quantity)}</td>
                <td class="text-end">
                  <button type="button" class="btn btn-sm btn-soft-danger" data-remove-id="${item.id}">
                    <i class="bi bi-trash action-icon"></i>Eliminar
                  </button>
                </td>
              </tr>
            `
          )
          .join('')}
      </tbody>
    </table>
    </div>

    <div class="card cart-summary mt-3">
      <div class="card-body">
        <p class="mb-0"><strong>Total:</strong> ${formatCurrency(total)}</p>
      </div>
    </div>
  `;
}

// Alterna entre las dos vistas sin recargar la página.
function showView(viewName) {
  const isCatalog = viewName === 'catalogo';
  catalogoView.classList.toggle('d-none', !isCatalog);
  carritoView.classList.toggle('d-none', isCatalog);

  if (!isCatalog) {
    renderCart();
  }
}

// Actualiza el badge del carrito y resalta el botón cuando hay productos.
function updateCartBadge(cart = getCartFromStorage()) {
  const totalItems = cart.reduce((accumulator, item) => accumulator + item.quantity, 0);

  if (totalItems > 0) {
    cartCountBadge.textContent = totalItems;
    cartCountBadge.classList.remove('d-none');
    cartNavButton.classList.add('has-items');
  } else {
    cartCountBadge.classList.add('d-none');
    cartNavButton.classList.remove('has-items');
  }
}

// Guarda y aplica el tema visual en localStorage.
// Bootstrap 5.3 usa el atributo data-bs-theme para cambiar entre modo claro y oscuro.
function setTheme(theme) {
  document.documentElement.setAttribute('data-bs-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  themeToggleBtn.textContent = theme === 'dark' ? 'Modo claro' : 'Modo oscuro';
  themeToggleBtn.setAttribute('aria-pressed', String(theme === 'dark'));
}

// Event delegation para capturar clics sobre los botones del catálogo.
productsContainer.addEventListener('click', (event) => {
  const button = event.target.closest('[data-product-id]');
  if (!button) return;

  const productId = Number(button.dataset.productId);
  const product = products.find((item) => item.id === productId);

  if (product) {
    saveToCart(product);
  }
});

// Permite eliminar un producto específico desde la tabla del carrito.
cartContainer.addEventListener('click', (event) => {
  const button = event.target.closest('[data-remove-id]');
  if (!button) return;

  const itemId = Number(button.dataset.removeId);
  const cart = getCartFromStorage().filter((item) => item.id !== itemId);
  saveCartToStorage(cart);
  renderCart();
});

// Cambia la vista al presionar Catálogo o Carrito.
document.querySelectorAll('[data-view]').forEach((button) => {
  button.addEventListener('click', () => showView(button.dataset.view));
});

// Vacía el carrito eliminando la clave del storage.
clearCartBtn.addEventListener('click', () => {
  localStorage.removeItem(STORAGE_KEY);
  renderCart();
});

// Alterna entre modo oscuro y claro manteniendo la preferencia del usuario.
themeToggleBtn.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-bs-theme') || 'dark';
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(nextTheme);
});

// Inicialización de la app: dibuja catálogo y carrito por primera vez.
renderProducts();
renderCart();
showView('catalogo');
setTheme(localStorage.getItem(THEME_KEY) || 'dark');




// Función para gestionar la reproducción inicial del audio
function initBackgroundMusic() {
  const audio = document.getElementById('bg-music');
  audio.play().then(() => {
    console.log("Reproducción iniciada");
    document.removeEventListener('click', initBackgroundMusic);
  }).catch(error => {
    console.log("El navegador bloqueó el autoplay. Esperando interacción del usuario.");
  });
}
document.addEventListener('click', initBackgroundMusic);
