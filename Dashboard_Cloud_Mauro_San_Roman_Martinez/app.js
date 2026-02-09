const baseDeDatosCloud = [
    { nombre: "Amazon EC2", tipo: "IaaS", estado: "Activo", costo: 35.00 },
    { nombre: "Google Drive Enterprise", tipo: "SaaS", estado: "Activo", costo: 12.50 },
    { nombre: "Heroku App Server", tipo: "PaaS", estado: "Inactivo", costo: 0.00 },
    { nombre: "Azure Virtual Machines", tipo: "IaaS", estado: "Activo", costo: 40.00 }
];
const cargarServicios =()=>{
    //RESCATAR CONTENEDOR
    const contenedor = document.getElementById("contenedor-servicios");
    //RESTABLECER EL CONTENEDOR
    contenedor.innerHTML=""
    //RECORRER Y AGREGAR EL ARREGLO
    baseDeDatosCloud.forEach((servicio)=>{

        let cssEstado="";
        //DECIDIR EL ESTADO DEL CSS QUE SE LE DARA
        if (servicio.estado==="Activo")
            cssEstado="activo"
        else
            cssEstado="inactivo"

        //CREAR TARJETA USANDO TEMPLATE STRINGS
        const tarjeta = `
            <div class="card">
                <h3>${servicio.nombre}</h3>
                <p class="tipo">Categoría: ${servicio.tipo}</p>
                <p>Estado: <span class="${cssEstado}">${servicio.estado}</span></p>
                <p>Costo: $${servicio.costo}</p>
            </div>
        `;
        // CREAR EL CONTENEDOR
        contenedor.innerHTML += tarjeta;
    })
    
    
}