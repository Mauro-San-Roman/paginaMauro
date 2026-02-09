// 1. CAPTURAMOS EL ID DE LA URL
const parametros = new URLSearchParams(window.location.search);
const idProducto = parametros.get("id");

// Al cargar la página, ejecutamos la carga de datos
document.addEventListener("DOMContentLoaded", () => {
    if (idProducto) {
        cargarCategorias(); // Primero las categorías para que el select esté listo
        cargarDatosProducto(); // Luego los datos del producto
    } else {
        alert("No se proporcionó un ID de producto.");
    }
});

// 2. FUNCIÓN PARA CARGAR LAS CATEGORÍAS EN EL SELECT
const cargarCategorias = () => {
    fetch("https://dummyjson.com/products/category-list")
        .then(res => res.json())
        .then(categorias => {
        const select = document.getElementById("select-categorias");
        categorias.forEach(category => {
            select.innerHTML+=`
            <option value="${category}">${category}</option>`;
        });
    });
};

// FUNCION PARA OBTENER DATOS DEL PRODUCTO
const cargarDatosProducto = () => {
    fetch(`https://dummyjson.com/products/${idProducto}`)
        .then(res => res.json())
        .then(data => {
            // Llenamos los inputs con la información actual
            document.getElementById("titulo").value = data.title;
            document.getElementById("precio").value = data.price;
            document.getElementById("descripcion").value = data.description;
            document.getElementById("select-categorias").value = data.category;
            
        })
        .catch(err => console.error("Error al obtener producto:", err));
};

// FUNCION DE GUARDAR CAMBIOS
const guardarProducto = () => {
    const titulo = document.getElementById("titulo").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const categoria = document.getElementById("select-categorias").value;
    const descripcion = document.getElementById("descripcion").value;
    const resultadoDiv = document.getElementById("mensaje-exito");

    // PETICION PARA GUARDAR EL PRODUCTO
    fetch(`https://dummyjson.com/products/${idProducto}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: titulo,
            price: precio,
            category: categoria,
            description: descripcion
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log("Respuesta de actualización:", data);
        
        // MENSAJE DE EXITO
        resultadoDiv.innerHTML = `
            <div class="alert alert-success mt-3">
                ¡Producto actualizado con éxito! (Simulación)<br>
                <strong>Nuevo título:</strong> ${data.title}
            </div>
        `;
        // REDIRECCION A LA PAGINA PRINCIPAL
        setTimeout(() => {
            window.location.href = "https://mauro-san-roman.github.io/DummyJson/index.html";
        }, 2500);

    })
    .catch(error => {
        console.error("Error al actualizar:", error);
        resultadoDiv.innerHTML = `<div class="alert alert-danger mt-3">Hubo un error al guardar.</div>`;
    });
    
};