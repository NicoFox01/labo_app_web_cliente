function openModal() {
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

const errorMsg = document.getElementById("login-error");
errorMsg.style.display = "none";

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("form").addEventListener("submit", async function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      if(!response.ok) {
        errorMsg.textContent = "Credenciales incorrectas";
        errorMsg.style.display = "block";
        return;
      }
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "ecommerce.html";
      } else {
        alert("Credenciales incorrectas. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error: ", error);
      errorMsg.textContent = "Error de conexión. Inténtalo de nuevo.";
      errorMsg.style.display = "block";
    }
  });
});

window.addEventListener("click", (event) => {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    closeModal();
  }
});

window.addEventListener("keydown", (event) => {
  const modal = document.getElementById("modal");
  if (event.key === "Escape" && modal.style.display === "flex") {
    closeModal();
  }
});