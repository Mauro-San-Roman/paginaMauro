
let paginaActual = 1;
const productosPorPagina = 10;
let busquedaActual = "";
let categoriaActual = "";
let ordenActual = "";
let totalProductos = 0;

document.addEventListener("DOMContentLoaded", () => {
    aplicarFiltrosYOrden();
    cargarCategoriasEnSelect();
});

const aplicarFiltrosYOrden = (nuevaPagina = 1) => {
    paginaActual = nuevaPagina;
    const skip = (paginaActual - 1) * productosPorPagina;
    
    let urlBase = "";

    if (busquedaActual) {
        urlBase = `https://dummyjson.com/products/search?q=${busquedaActual}`;
    } else if (categoriaActual) {
        urlBase = `https://dummyjson.com/products/category/${categoriaActual}`;
    } else {
        urlBase = `https://dummyjson.com/products`;
    }

    const conector = urlBase.includes('?') ? '&' : '?';
    const urlFinal = `${urlBase}${conector}sortBy=price&order=${ordenActual}&limit=${productosPorPagina}&skip=${skip}`;

    fetch(urlFinal)
        .then(res => res.json())
        .then(data => {
            totalProductos = data.total;
            mostrarProductos(data.products);
            renderizarPaginacion();
        })
        .catch(err => console.error("Error al cargar datos:", err));
};

const mostrarProductos = (productos) => {
    const contenedor = document.getElementById("contenedor-productos");
    contenedor.innerHTML = "";

    if (productos.length === 0) {
        contenedor.innerHTML = `<p class="alert alert-warning fs-2 w-100">No hay productos que coincidan.</p>`;
        return;
    }

    productos.forEach(producto => {
        const columna = document.createElement("div");
        columna.classList.add("col");

        columna.innerHTML = `
            <div class="card h-100 shadow-sm" onclick="detalleProducto(${producto.id})" style="cursor: pointer;">
                <div class="card-body d-flex flex-column">
                    <h2 class="fs-3 fw-bold text-dark">${producto.title}</h2>
                    <img class="card-img-top p-3" src="${producto.thumbnail}" alt="${producto.title}" 
                         style="height: 200px; object-fit: contain;">
                    <p class="card-text text-truncate"><strong>Descripción:</strong> ${producto.description}</p>
                    <div class="mt-auto">
                        <p class="fs-4 mb-1 text-primary"><strong>Precio:</strong> $${producto.price}</p>
                        <p class="mb-1 text-muted"><strong>Categoría:</strong> ${producto.category}</p>
                        <p class="mb-2 text-dark"><strong>Rating:</strong> ${producto.rating} <span class="text-warning">★</span></p>
                        <div class="d-grid gap-2 d-md-block">
                            <button class="btn btn-success btn-sm" onclick="event.stopPropagation(); editarProducto(${producto.id})">Editar</button>
                            <button class="btn btn-danger btn-sm" onclick="event.stopPropagation(); eliminarProducto(${producto.id})">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        contenedor.appendChild(columna);
    });
};

const renderizarPaginacion = () => {
    const contenedorPaginacion = document.getElementById("paginacion");
    if (!contenedorPaginacion) return; 

    contenedorPaginacion.innerHTML = "";
    const totalPaginas = Math.ceil(totalProductos / productosPorPagina);

    if (totalPaginas <= 1) return;

    const ul = document.createElement("ul");
    ul.classList.add("pagination", "justify-content-center", "mt-4");

    // Botón Anterior
    ul.innerHTML += `
        <li class="page-item ${paginaActual === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="event.preventDefault(); aplicarFiltrosYOrden(${paginaActual - 1})">Anterior</a>
        </li>
    `;

    // Números
    for (let i = 1; i <= totalPaginas; i++) {
        if (i >= paginaActual - 2 && i <= paginaActual + 2) {
            ul.innerHTML += `
                <li class="page-item ${i === paginaActual ? 'active' : ''}">
                    <a class="page-link" href="#" onclick="event.preventDefault(); aplicarFiltrosYOrden(${i})">${i}</a>
                </li>
            `;
        }
    }

    // Botón Siguiente
    ul.innerHTML += `
        <li class="page-item ${paginaActual === totalPaginas ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="event.preventDefault(); aplicarFiltrosYOrden(${paginaActual + 1})">Siguiente</a>
        </li>
    `;

    contenedorPaginacion.appendChild(ul);
};

const buscarProducto = () => {
    busquedaActual = document.getElementById("busqueda").value.trim();
    categoriaActual = "";
    aplicarFiltrosYOrden(1);
};

const buscarProductoCategoria = () => {
    categoriaActual = document.getElementById("filtroCategorias").value;
    busquedaActual = "";
    aplicarFiltrosYOrden(1);
};

const ordenarPorPrecio = () => {
    ordenActual = document.getElementById("ordenarPorPrecio").value;
    aplicarFiltrosYOrden(1);
};

const cargarCategoriasEnSelect = () => {
    fetch("https://dummyjson.com/products/category-list")
        .then(res => res.json())
        .then(categorias => {
            const select = document.getElementById("filtroCategorias");
            select.innerHTML = '<option value="" disabled selected>Filtrar por categoría</option>';
            categorias.forEach(categoria => {
                select.innerHTML += `<option value="${categoria}">${categoria}</option>`;
            });
        });
};

const detalleProducto = (id) => {
    window.location.href = `productos_detalle.html?id=${id}`;
};
//FUNCION PARA ELIMINAR EL PRODUCTO
const eliminarProducto = (id) => {
   const confirmar = confirm("¿Estás seguro de que deseas eliminar este producto?");

    if (confirmar) {
        fetch(`https://dummyjson.com/products/${id}`, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(data => {
            if (data.isDeleted) {
                alert(`Producto "${data.title}" eliminado (Simulación)`);
                const tarjetas = document.querySelectorAll('.card');
                tarjetas.forEach(tarjeta => {
                    if (tarjeta.getAttribute('onclick').includes(id)) {
                        tarjeta.parentElement.remove();
                    }
                });
            }
        })
        .catch(err => console.error("Error al borrar:", err));
    }
};
//FUNCION PARA ACTUALIZAR EL PRODUCTO
const editarProducto = (id) => {
    console.log("Editando producto ID:", id);
    window.location.href = `./editar.html?id=${id}`;
};