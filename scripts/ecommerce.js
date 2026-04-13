document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "index.html";
  }
});
let listadoProductos = document.querySelector("#listado-productos");

function getAllProductos() {
  return fetch("https://fakestoreapi.com/products").then((response) =>
    response.json(),
  );
}

getAllProductos()
  .then((productos) => {
    let listadoProductosCards = "";

    productos.forEach((producto) => {
      listadoProductosCards += `
        <div class="col">
          <div class="card h-100 product-card">
            <img src="${producto.image}" class="card-img-top" alt="${producto.title}" />
            <div class="card-body d-flex flex-column">
              
              <h5 class="card-title">${producto.title}</h5>

              <p class="card-text">
                ${producto.description.substring(0, 80)}...
              </p>

              <div class="mt-auto">
                <h6 class="fw-bold mb-2">$${producto.price}</h6>

                <div class="text-warning mb-2">
                  ⭐ ${producto.rating.rate} (${producto.rating.count})
                </div>

                <button class="btn btn-primary w-100" onclick="event.stopPropagation()">
                  <i class="bi bi-cart-plus"></i> Agregar
                </button>
              </div>

            </div>
          </div>
        </div>
      `;
    });

    listadoProductos.innerHTML = listadoProductosCards;
    const cards = document.querySelectorAll(".product-card");

cards.forEach((card, index) => {
   card.addEventListener("click", () => {
    console.log("CLICK EN CARD", productos[index]);
    openProductModal(productos[index]);
});
});
  })
  .catch((error) => {
    listadoProductos.innerHTML = "<p>Error cargando productos</p>";
    console.error(error);
  });

  function openProductModal(producto) {
    document.getElementById("modal-title").innerText = producto.title;
    document.getElementById("modal-price").innerText = "$" + producto.price;
    document.getElementById("modal-description").innerText = producto.description;
    document.getElementById("modal-img").src = producto.image;

    document.getElementById("productModal").style.display = "flex";
}

function closeProductModal() {
    document.getElementById("productModal").style.display = "none";
}

function addToCartAndClose() {
    closeProductModal();
}