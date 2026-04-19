// Validación del token de FakeStoreAPI para acceder a la pantalla de ecommerce.html
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "index.html";
  }

  cargarProductos();
});

let listadoProductos = document.querySelector("#listado-productos");

//Fetch para obtener los productos desde la FakeStoreAPI
function getAllProductos() {
  return fetch("https://fakestoreapi.com/products")
    .then(res => res.json());
}

//Renderizado dinámico de los productos obtenidos desde la FakeStoreAPI en cards en el HTML.
function cargarProductos() {
  getAllProductos()
    .then(productos => {

      listadoProductos.innerHTML = "";

      productos.forEach((producto, index) => {

        const col = document.createElement("div");
        col.className = "col";

        col.innerHTML = `
          <div class="card h-100 product-card">
            <img src="${producto.image}" class="card-img-top" style="height:200px; object-fit:contain;" />

            <div class="card-body d-flex flex-column">

              <h5 class="card-title text-truncate">
                ${producto.title}
              </h5>

              <div class="mt-auto">

                <h6 class="fw-bold">$${producto.price}</h6>

                <div class="text-warning mb-2">
                  ⭐ ${producto.rating.rate} (${producto.rating.count})
                </div>

                <div style="display:flex; width:100%; align-items:center;">

                  <div style="width:12.5%"></div>

                  <button class="btn btn-primary btn-detalle" style="width:35%;">
                    <i class="bi bi-eye me-1"></i> Más Detalles
                  </button>

                  <div style="width:5%"></div>

                  <button class="btn btn-success btn-add" style="width:35%;">
                    <i class="bi bi-cart-plus me-1"></i> Agregar al Carrito
                  </button>

                  <div style="width:12.5%"></div>

                </div>

              </div>
            </div>
          </div>
        `;

        listadoProductos.appendChild(col);

        const btnDetalle = col.querySelector(".btn-detalle");
        const btnAdd = col.querySelector(".btn-add");

        btnDetalle.addEventListener("click", () => {
          openProductModal(producto);
        });

        btnAdd.addEventListener("click", () => {
          addToCart(producto, 1);
        });

      });

    })
    .catch(err => {
      listadoProductos.innerHTML = "<p>Error cargando productos</p>";
      console.error(err);
    });
}

//Modal detalle del producto
function openProductModal(producto) {
  const existing = document.querySelector(".product-modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.className = "product-modal";
  modal.innerHTML = `
    <div class="product-modal-content">
      <span class="product-close">&times;</span>
      
      <div class="modal-header-custom">
        <h2 class="product-title-top">${producto.title}</h2>
        <hr class="title-divider">
      </div>

      <div class="product-modal-body-grid">
        
        <div class="product-image-box">
          <img src="${producto.image}" alt="${producto.title}">
        </div>

        <div class="product-details-box">
          
          <div class="product-description-container">
            <p class="product-description">${producto.description}</p>
          </div>

          <div class="price-qty-row">
            <div class="price-box">
              <span class="price-label">Precio Unitario:</span>
              <span class="price-value">$${producto.price.toFixed(2)}</span>
              <hr style="margin: 5px 0; border: 0; border-top: 1px solid #ddd;">
              <span class="price-label">Precio Total:</span>
              <span class="price-value total-price" id="total-price-${producto.id}">$${producto.price.toFixed(2)}</span>
            </div>
            
            <div class="qty-box">
              <label for="qty-${producto.id}">Cantidad</label>
              <input type="number" id="qty-${producto.id}" value="1" min="1" class="qty-input">
            </div>
          </div>

          <button class="product-modal-btn">Agregar al carrito</button>
          
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector(".product-close").addEventListener("click", () => {
    modal.remove();
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.remove();
  });

  const cantidadProducto = modal.querySelector(`#qty-${producto.id}`);
  const precioTotal = modal.querySelector(`#total-price-${producto.id}`);

  cantidadProducto.addEventListener("input", (e) => {
    let cantidad = parseInt(e.target.value) || 1;
    if (cantidad < 1) {
      cantidad = 1;
      e.target.value = 1;
    }
    const total = (producto.price * cantidad).toFixed(2);
    precioTotal.innerText = `$${total}`;
  });

  modal.querySelector(".product-modal-btn").addEventListener("click", () => {
    const cantidadSeleccionada = parseInt(cantidadProducto.value) || 1;
    addToCart(producto, cantidadSeleccionada);
    modal.remove();
  });
}

//Agregar productos al carrito
function addToCart(producto, cantidad) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const indiceExistente = carrito.findIndex(item => item.id === producto.id);

  if (indiceExistente !== -1) {
    carrito[indiceExistente].quantity += cantidad;
  } else {
    carrito.push({ ...producto, quantity: cantidad });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Producto agregado",
    showConfirmButton: false,
    timer: 1500,
    toast: true
  });

  actualizarBadge();
}


// Actualizar carrito con cantidad de productos agregados
function actualizarBadge() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const totalProductos = carrito.reduce((acumulador, item) => acumulador + (item.quantity || 1), 0);
  
  const badgeElement = document.querySelector(".cart-badge");
  if (badgeElement) {
    badgeElement.innerText = totalProductos;
  }
}

actualizarBadge();

/*para siguientes funcionalidades tendríamos que agregar:
localStorage.removeItem
localStorage.clear
*/
