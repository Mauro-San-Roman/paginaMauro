const guardarProducto=()=>{
    //CREAR VARIABLES PARA INTERACTUAR
    const titulo=document.getElementById("titulo").value;
    const precio=parseFloat(document.getElementById("precio").value);
    const categoria=document.getElementById("select-categorias").value;
    const descripcion=document.getElementById("descripcion").value;
    const resultado=document.getElementById("mensaje-exito");

    //VALIDAMOS QUE NO ESTE VACIO

    if (!titulo || !precio || !descripcion) {
        alert("Completa todos los campos")
        return  
    }

    //Creamos objeto que se va al body
    const producto={
        title:titulo,
        price:precio,
        category:categoria,
        description:descripcion,
        thumbnail:"https://dummyjson.com/image/400x200/008080/ffffff?text="+titulo
    }

    //HACEMOS LA PETICION
    fetch("https://dummyjson.com/products/add",{
        method:"POST",
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(producto)
    })
    .then(res => res.json())
    .then(data=>{
        console.log("Respuesta de API",data)
        resultado.style.display="block";
        resultado.innerHTML=`
        <strong>Producto agregado con exito</strong><br>
        ID asignado: ${data.id}<br>
        Nombre: ${data.title}<br>
        Precio: ${data.price}`
    });
    // REDIRECCION A LA PAGINA PRINCIPAL
        setTimeout(() => {
            window.location.href = "https://mauro-san-roman.github.io/paginaMauro/Catalogo_DummyJson/index.html";
        }, 2500);
}
fetch("https://dummyjson.com/products/category-list")
    .then(res=>res.json())
    .then((data) => {
        const Categorias = data;
        console.log("Categorias recibidas:", Categorias); // Debugging en consola
        //LLAMADA A LA FUNCION PARA MOSTRAR LAS CATEGORIAS
        mostrarCategorias(Categorias);
    })
    .catch((error) => {
        // ADVERTENCIA POR SI EXISTE ALGUN ERROR
        console.error("Error al cargar las categorias:", error);
        alert("Hubo un error al cargar los datos. Revisa la consola.");
    });
const mostrarCategorias=(Categorias)=>{

    const contenedorCategories=document.getElementById("select-categorias");
    contenedorCategories.innerHTML="";
    Categorias.forEach(category => {
        contenedorCategories.innerHTML+=`
        <option value="${category}">${category}</option>
        `;
    });

}
