// Validación del token de FakeStoreAPI para acceder a la pantalla de ecommerce.html
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "index.html";
  }

  cargarProductos();
  renderizarCarrito();

  const btnVaciar = document.querySelector("#btn-vaciar-carrito");
  if (btnVaciar) {
    btnVaciar.addEventListener("click", vaciarCarrito);
  }
});

let listadoProductos = document.querySelector("#listado-productos");

//Fetch para obtener los productos desde la FakeStoreAPI
function getAllProductos() {
  return fetch("https://fakestoreapi.com/products").then((res) => res.json());
}

//Renderizado dinámico de los productos obtenidos desde la FakeStoreAPI en cards en el HTML.
function cargarProductos() {
  getAllProductos()
    .then((productos) => {
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
    .catch((err) => {
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
              <span class="price-value" id="total-price-${producto.id}">
                $${producto.price.toFixed(2)}
              </span>
            </div>

            <div class="qty-box">
              <label>Cantidad</label>
              <div class="d-flex align-items-center gap-2 mt-2">
                <button class="btn btn-sm btn-outline-secondary modal-restar">-</button>

                <span class="fw-bold text-center" id="modal-cantidad" style="min-width: 30px;">
                  1
                </span>

                <button class="btn btn-sm btn-outline-secondary modal-sumar">+</button>
              </div>
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

  let cantidad = 1;

  const cantidadSpan = modal.querySelector("#modal-cantidad");
  const precioTotal = modal.querySelector(`#total-price-${producto.id}`);
  const btnSumar = modal.querySelector(".modal-sumar");
  const btnRestar = modal.querySelector(".modal-restar");

  function actualizarVistaModal() {
    cantidadSpan.innerText = cantidad;
    precioTotal.innerText = `$${(producto.price * cantidad).toFixed(2)}`;
    btnRestar.disabled = cantidad === 1;
  }

  btnSumar.addEventListener("click", () => {
    cantidad++;
    actualizarVistaModal();
  });

  btnRestar.addEventListener("click", () => {
    if (cantidad > 1) {
      cantidad--;
      actualizarVistaModal();
    }
  });

  actualizarVistaModal();

  modal.querySelector(".product-modal-btn").addEventListener("click", () => {
    addToCart(producto, cantidad);
    modal.remove();
  });
}

//Agregar productos al carrito
function addToCart(producto, cantidad) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const indiceExistente = carrito.findIndex((item) => item.id === producto.id);

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
    toast: true,
  });

  actualizarBadge();
  renderizarCarrito();
}
function updateElementsInCart(producto, cantidad) {}

// Actualizar carrito con cantidad de productos agregados
function actualizarBadge() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const totalProductos = carrito.reduce(
    (acumulador, item) => acumulador + (item.quantity || 1),
    0,
  );

  const badgeElement = document.querySelector(".cart-badge");
  if (badgeElement) {
    badgeElement.innerText = totalProductos;
  }
}

actualizarBadge();

//Renderizar los productos del carrito en el aside

function renderizarCarrito() {
  let offcanvasbody = document.querySelector("#cart-aside");
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carrito.length === 0) {
    offcanvasbody.innerHTML = `
      <div class="text-center py-5">
        <i class="bi bi-cart-x" style="font-size: 2rem; opacity: 0.5;"></i>
        <p class="mt-3 mb-0">Carrito sin productos guardados</p>
      </div>
    `;
    return;
  }
  let template = "";
  let total = carrito.reduce((acc, producto) => {
    return acc + producto.price * producto.quantity;
  }, 0);
  carrito.forEach((producto) => {
    template += `
      <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-4 d-flex justify-content-center align-items-center">
            <img src="${producto.image}" class="img-fluid rounded-start" style="object-fit: contain; height: 150px;" alt="${producto.title}">
          </div>
        <div class="col-md-8">
          <div class="card-body">
            <div>
              <h5 class="card-title">${producto.title}</h5>
              <div class="d-flex align-items-center gap-2 mt-2">
                <button class="btn btn-sm btn-outline-secondary btn-restar" data-id="${producto.id}">-</button>
                
                <span class="fw-bold text-center" style="min-width: 30px;">
                  ${producto.quantity}
                </span>
                
                <button class="btn btn-sm btn-outline-secondary btn-sumar" data-id="${producto.id}">+</button>
              </div>  
            </div>
              <div class="d-flex justify-content-between align-items-center mt-2">
                
                <div>
                  <small class="text-muted">Precio Unitario: $${producto.price}</small><br>
                  <small class="text-muted">
                    Subtotal: <strong>$${(producto.price * producto.quantity).toFixed(2)}</strong>
                  </small>
                </div>

                <button class="btn btn-outline-danger border-0" id="eliminarProducto-${producto.id}">
                  <i class="bi bi-trash-fill"></i>
                </button>          

              </div>
          </div>
        </div>
      </div>
    </div>
  `;
  });
  offcanvasbody.innerHTML = template;
  offcanvasbody.innerHTML += `
    <div class="mt-4 p-3 border-top">
      <h5 class="text-center mb-0">
        Total: <strong>$${total.toFixed(2)}</strong>
      </h5>
    </div>
  `;
  carrito.forEach((producto) => {
  const btnEliminar = document.querySelector(`#eliminarProducto-${producto.id}`);
  if (btnEliminar) {
      btnEliminar.addEventListener("click", () => {
        eliminarProductoDelCarrito(producto.id);
      });
    }
  });

  document.querySelectorAll(".btn-sumar").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.currentTarget.dataset.id);
      cambiarCantidad(id, 1);
    });
  });

  document.querySelectorAll(".btn-restar").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.currentTarget.dataset.id);
      cambiarCantidad(id, -1);
    });
  });
}

//Actualizar cantidad de productos en el carrito
function cambiarCantidad(id, delta) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const index = carrito.findIndex((item) => item.id === id);

  if (index !== -1) {
    carrito[index].quantity += delta;
    if (carrito[index].quantity <= 0) {
      carrito.splice(index, 1);
    }
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  actualizarBadge();
  renderizarCarrito();
}


// Eliminar producto del carrito
function eliminarProductoDelCarrito(id) {
  Swal.fire({
    title: "¿Estás seguro/a?",
    text: "Se eliminará el producto del carrito",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

      carrito = carrito.filter((item) => item.id !== id);

      localStorage.setItem("carrito", JSON.stringify(carrito));

      actualizarBadge();
      renderizarCarrito();

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Producto eliminado del carrito",
        showConfirmButton: false,
        timer: 1500,
        toast: true
      });
    }
  });
}

//Vaciar carrito
function vaciarCarrito() {
  Swal.fire({
    title: "¿Estás seguro/a?",
    text: "Se eliminarán todos los productos del carrito",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Sí, vaciar",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("carrito");
      actualizarBadge();
      renderizarCarrito();

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Carrito vaciado",
        showConfirmButton: false,
        timer: 1500,
        toast: true
      });
    }
  });
}