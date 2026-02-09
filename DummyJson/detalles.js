const mostrarDetalle = () => {
    const parametros = new URLSearchParams(window.location.search);
    const idProducto = parametros.get("id");
    const headerDetalle = document.getElementById("detalleTitulo");
    const mainDetalle = document.getElementById("detalleContenedor");

    if (idProducto) {

        mainDetalle.innerHTML = `<div class="text-center"><div class="spinner-border text-primary" role="status"></div></div>`;

        fetch(`https://dummyjson.com/products/${idProducto}`)
            .then((respuesta) => respuesta.json())
            .then((data) => {

                headerDetalle.innerHTML = `<h1 class="display-4 fw-bold text-dark">${data.title}</h1>`;
                mainDetalle.innerHTML = `
                <div class="row g-5">
                    <div class="col-md-6">
                        <div class="card shadow-sm border-0 p-4 bg-white">
                            <img src="${data.thumbnail}" class="img-fluid rounded" alt="${data.title}" style="max-height: 450px; object-fit: contain;">
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="p-3">
                            <p class="fs-5 text-dark mb-4"><strong>Descripción:</strong> ${data.description}</p>
                            <p class="text-dark fs-5 mb-4"><strong>Categoria:</strong> ${data.category}</p>
                            <p class="text-dark fs-5 mb-4"><strong>Marca:</strong> ${data.brand || "No disponible"}</p>
                            
                            <div class="d-flex align-items-center mb-4">
                                <span class="display-5 fw-bold text-primary">$${data.price}</span>
                                <div class="ms-4">
                                    <p class="mb-0 text-warning fs-4">★ ${data.rating}</p>
                                    <p class="text-dark">Rating de usuarios</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 mt-5">
                        <h3 class="fw-bold border-bottom pb-3 mb-4">Opiniones de Clientes</h3>
                        <div id="contenedorOpiniones" class="row g-3"></div>
                    </div>
                </div>`;

                const contenedorOpiniones = document.getElementById(
                    "contenedorOpiniones"
                );

                if (data.reviews && data.reviews.length > 0) {
                    data.reviews.forEach((review) => {
                        contenedorOpiniones.innerHTML += `
                        <div class="col-md-4">
                            <div class="card h-100 border-0 shadow-sm bg-white">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between mb-2">
                                        <h6 class="fs-4 mb-0">${review.reviewerName
                            }</h6>
                                        <span class="text-warning small">${"★".repeat(
                                review.rating
                            )}</span>
                                    </div>
                                    <p class="fs-5 text-muted mb-2">"${review.comment
                            }"</p>
                                    <p class="card-text"><small class="text-dark">${review.date
                            }</small></p>
                                    
                                </div>
                            </div>
                        </div>`;
                    });
                } else {
                    contenedorOpiniones.innerHTML = `<p class="text-dark text-center">No hay reseñas para este producto.</p>`;
                }
            })
            .catch((error) => {
                mainDetalle.innerHTML = `<div class="alert alert-danger">Error al cargar el detalle: ${error.message}</div>`;
            });
    }
};

mostrarDetalle();
