// DEFINIMOS LA URL DE LA API DE SERVICIOS DE PCEXTREME
const urlApi = "https://pcextreme.grupoctic.com/appMovil/PCStatus/Api/apiServicios.php";

//FUNCION PARA RECUPERAR LOS SERVICIOS A TRAVEZ DEL API
const recuperarServicios = () => {
    // Usamos fetch para hacer la petición HTTP
    fetch(urlApi)
        .then(respuesta => respuesta.json()) // Convertimos la respuesta cruda a formato JSON
        .then(data => {
            // La API devuelve un objeto 
            const servicios = data;
           
            console.log("Datos recibidos:", servicios); // Debugging en consola
           
            // Llamamos a la función que se encarga de mostrar los servicios
            mostrarServicios(servicios);
        })
        .catch(error => {
            // Buena práctica: Manejar errores por si falla la red o la API
            console.error("Error al cargar los servicios:", error);
            alert("Hubo un error al cargar los servicios. Revisa la consola.");
        })
}
// Función encargada de manipular el DOM
const mostrarServicios = (servicios) => {
    // 1. Seleccionamos el contenedor del HTML
    const contenedorServicios = document.getElementById("contenedor-servicios");
   
    // 2. Limpiamos el contenedor por si ya tenía contenido previo
    contenedorServicios.innerHTML = "";
    

    // 3. Recorremos cada personaje del array
    servicios.forEach(servicio => {
        // Creamos un elemento DIV nuevo en memoria
        const tarjeta = document.createElement("div");
       
        // Le añadimos la clase CSS que definimos en el paso 3
        tarjeta.classList.add("servicio-tarjeta");
        // Usamos Template Strings (``) para inyectar el HTML interno con los datos
        tarjeta.innerHTML = `
            <img src="https://pcextreme.grupoctic.com/appWeb/aseets/${servicio.imagen}" alt="${servicio.titulo}" width="100%" style="object-fit: contain; height: 300px;">
            <h3 class="titulo-servicio">${servicio.titulo}</h3>
            <p id="infoDescripcion">${servicio.descripcion}</p>
        `;
       
        // Finalmente, agregamos la tarjeta completa al contenedor principal
        contenedorServicios.appendChild(tarjeta);
    })
}