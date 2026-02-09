const coleccion_docentes=[
    {
        nombre:"LUIS ALBERTO",
        apellidos:"MENDOZA SAN JUAN",
        puesto:"PROFESOR INVESTIGADOR",
        edad:"41",
        estado:true
    },
    {
        nombre:"DOC. EFREN",
        apellidos:"JUAREZ CASTILLO",
        puesto:"PROFESOR INVESTIGADOR",
        edad:"55",
        estado:false
    },
    {
        nombre:"HERMES",
        apellidos:"SALAZAR CASANOVA",
        puesto:"PROFESOR INVESTIGADOR",
        edad:"43",
        estado:true
    }
]
const mostrar=()=>{
    //RESCATAR CONTENEDOR
    const contenedor=document.getElementById("contenedor")
    //RESTABLECER EL CONTENEDOR
    contenedor.innerHTML=""
    //AGREGAR ELEMENTO AL CONTENEDOR
    coleccion_docentes.forEach((docente)=>{
        if (docente.estado)
        contenedor.innerHTML+="<div class='tarjeta'>"+"<h2>"+docente.nombre +"</h2>"+"</div>"
    })
    
    
}