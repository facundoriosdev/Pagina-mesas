Prototipo funcional web correspondiente al Trabajo Práctico de la materia. Implementa de punta a punta la convocatoria, postulación, evaluación administrativa y visualización geolocalizada de sedes de orientación para autoridades de mesa.

El prototipo no requiere configuración de claves. Incluye datos precargados en memoria local para validar la interacción de inmediato.


## Requisitos de Entorno

* **Node.js**: Versión `18.x` o superior (incluye `npm`).
* **Navegador Web**: Cualquier navegador moderno con soporte para módulos ES6 (Google Chrome, Mozilla Firefox, Microsoft Edge).

---

## Instalación

Descomprimir el archivo `.zip`

Abrir la terminal en la carpeta descomprimida

---

Para iniciar el servidor local de desarrollo, ejecutar:

npx serve

---

La aplicación quedará abierta en el navegador en la dirección:
http://localhost:3000 (o la URL local informada por la terminal).


## Estructura del Proyecto
El código está estructurado bajo una arquitectura modular en capas que separa presentación, dominio, servicios y persistencia:

index.html: Portal principal de bienvenida y navegación.

inscripcion.html: Formulario de postulación ciudadana.

charlas.html: Visualización de sedes y mapa interactivo.

admin.html: Panel de gestión y evaluación administrativa.

src/styles/: Hojas de estilo CSS modulares.

src/js/clases/: Modelos de dominio (Postulante, Charla, Sede).

src/js/servicio/: Capa de lógica de negocio y validaciones.

src/js/datos/: Capa de acceso y almacenamiento local (localStorage).

src/vista/: Controladores de interfaz e integración con la API de mapas.
