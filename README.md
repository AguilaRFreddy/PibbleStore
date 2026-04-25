# PibbleStore 

**PibbleStore** es una plataforma de e-commerce estática diseñada para entusiastas del hardware, gamers y creadores. El proyecto ofrece una experiencia de compra fluida con un catálogo dinámico y persistencia de datos local.

![Banner Hardware](media/4.png)

##  Características Principales

* **Catálogo Dinámico:** Renderizado automático de productos desde estructuras de datos en JavaScript.
* **Carrito de Compras:** Gestión completa de productos (agregar, eliminar, vaciar) con cálculo de totales en tiempo real.
* **Persistencia Local:** Uso de `localStorage` para conservar el carrito y las preferencias del usuario tras recargar la página.
* **Diseño Dual:** Soporte nativo para **Modo Claro** y **Modo Oscuro** con persistencia de elección.
* **Interfaz Responsiva:** Optimizado para móviles, tablets y escritorio mediante el sistema de grid de Bootstrap 5.3.

---

##  Tecnologías Utilizadas

| Tecnología | Uso |
| :--- | :--- |
| **HTML5 / CSS3** | Estructura semántica y estilos personalizados (variables CSS, gradientes). |
| **JavaScript (ES6+)** | Lógica del carrito, manipulación del DOM y gestión de eventos. |
| **Bootstrap 5.3** | Maquetación responsiva y componentes de interfaz. |
| **LocalStorage** | Almacenamiento persistente en el navegador sin base de datos externa. |

---

##  Cómo Ejecutar el Proyecto

Al ser una aplicación web estática, no requiere instalación de dependencias:

1.  **Clona el repositorio** o descarga los archivos.
2.  **Abre `index.html`** directamente en cualquier navegador moderno.
3.  *(Recomendado)* Usa la extensión **Live Server** en VS Code para una mejor experiencia de desarrollo.

---

##  Estructura del Proyecto

```text
PibbleStore/
├── index.html          # Punto de entrada principal
├── css/
│   └── styles.css      # Variables de color, temas y estilos personalizados
├── js/
│   └── app.js          # Lógica de negocio (Catálogo, Carrito, Temas)
└── media/              # Activos visuales (Logos e imágenes de productos)
    ├── 4.png           # Decoración de hardware
    └── 5.png           # Decoración de componentes
```

---

##  Detalles Técnicos

### Gestión de Estado
El sistema utiliza una arquitectura basada en **delegación de eventos** para optimizar el rendimiento al interactuar con el catálogo. La sincronización entre la vista y el almacenamiento se realiza mediante funciones auxiliares que parsean y serializan objetos JSON en el `localStorage`.

### UI Customization
A diferencia de los sitios estándar de Bootstrap, PibbleStore implementa una capa de **estilos premium** que incluye:
* Fondos con gradientes radiales y superficies semitransparentes (glassmorphism).
* Transiciones suaves en estados `hover` de las tarjetas de producto.
* Uso de variables CSS para facilitar cambios globales de identidad visual.

![Hardware Detail](media/5.png)

---