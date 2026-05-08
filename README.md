# 🛒 Proyecto E-commerce - Laboratorio de Aplicaciones Web Cliente

Proyecto correspondiente al **Laboratorio de Aplicaciones Web Cliente**  
📅 Primer cuatrimestre 2026 - ISTEA  
👨‍🏫 Instructor: Carlos Jesus  
👨‍💻 Integrantes:
- Federico Valdes - @Trenyu
- Facundo Perez - @FacuPerez00
- Nicolás Gonzalez - @NicoFox01

## 📌 Descripción

El presente proyecto consiste en el desarrollo de una aplicación web tipo **E-commerce**, construida con tecnologías de front-end, que consume datos desde una API externa y permite gestionar un carrito de compras del lado del cliente.

La aplicación deberá cumplir con requisitos de **responsive design**, **UX**, **accesibilidad**, y funcionalidades dinámicas mediante JavaScript.

---

## 🎯 Objetivos

- Consumir una API REST
- Renderizar productos dinámicamente
- Implementar carrito de compras
- Manejar estado con LocalStorage
- Aplicar diseño responsive
- Mantener consistencia UX/UI
- Aplicar buenas prácticas de accesibilidad

---

## 🧩 Tecnologías Utilizadas

- HTML5 (etiquetas semánticas)
- CSS3
- Bootstrap 5
- JavaScript (DOM, Fetch API, LocalStorage)
- Fake Store API: https://fakestoreapi.com/

---

## 📁 Estructura del Proyecto

```
labo_app_web_cliente/
├── index.html           # Página de login
├── ecommerce.html       # Tienda principal
├── images/               # Imágenes y logos
│   ├── istea_logo.png
│   └── logo_istea_nocturno.png
├── scripts/             # Archivos JavaScript
│   ├── ecommerce.js     # Lógica de la tienda
│   ├── login.js         # Autenticación
│   └── theme.js         # Cambio de tema
├── styles/              # Estilos CSS
│   ├── ecommerce.css
│   └── login.css
└── README.md
```

---

## 🚀 Cómo ejecutar

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/NicoFox01/labo_app_web_cliente.git
   ```

2. **Navegar al directorio:**
   ```bash
   cd labo_app_web_cliente
   ```

3. **Ejecutar:**
   - Abrir `index.html` en un navegador web
   - O usar un servidor local (Live Server de VS Code, python, etc.)

4. **Iniciar sesión:**
   - Usuario: `mor_2314`
   - Contraseña: `83r5^_`

---

## ✨ Funcionalidades

- **🔐 Login**: Autenticación con Fake Store API, validación de credenciales, mensajes de error accesibles
- **📦 Catálogo de productos**: Renderizado dinámico desde la API con imágenes, precios y ratings
- **🔍 Buscador**: Filtrado de productos en tiempo real por título
- **ℹ️ Modal de detalles**: Ver información completa de cada producto, ajustar cantidad y agregar al carrito
- **🛒 Carrito de compras**: Offcanvas lateral con gestión de productos (agregar, quitar, modificar cantidad)
- **💾 Persistencia**: Los datos del carrito se guardan en LocalStorage
- **🧾 Finalizar compra**: Vacía el carrito y muestra mensaje de confirmación
- **🌙 Theme toggle**: Cambio entre tema claro y oscuro, con persistencia de preferencia

---

## 📌 Datos de importancia

Las credenciales de Fake Store API no se encuentran en funcionamiento. Luego de buscar en internet, encontre unas credenciales que se pueden utilizar (lo vi en github):
- Usuario: mor_2314
- Contraseña: 83r5^_

 Igualmente, se agrega un apartado de Q&A en el login con las credenciales par autilizar.
 
https://github.com/keikaavousi/fake-store-api/issues/131

---

## ♿ Accesibilidad

A nivel accesibilidad se implementó el grado A de la WCAG 2.1.

Para más información sobre los criterios de accesibilidad implementados, consultá la documentación oficial:
- https://www.w3.org/TR/WCAG21/
- https://www.w3.org/WAI/WCAG21/Understanding/


