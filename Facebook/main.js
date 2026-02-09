const selectUsuario=document.getElementById("select-usuario")
const muroDiv=document.getElementById("muro")
const avatarImg=document.getElementById("avatar-img")
const nombreHeader=document.getElementById("nombre-usuario")

fetch("https://jsonplaceholder.typicode.com/users")
.then((response)=>response.json())
.then(usuarios=>{
    usuarios.forEach(usuario=>{
        const opcion=`<option value="`+usuario.id+`">`+usuario.name+`</option>`
        selectUsuario.innerHTML+=opcion
    })
})

//SELECCIONAR USUARIO
const cargaMuro=()=>{
    const userId=selectUsuario.value
    const nombre=selectUsuario.options[selectUsuario.selectedIndex].text
    //MOSTRAMOS NOMBRE DEL USUARIO Y SU AVATAR
    nombreHeader.innerHTML=nombre
    avatarImg.src="https://api.dicebear.com/9.x/dylan/svg?seed="+nombre
    avatarImg.style.display="block"

    //CARGAMOS EL MURO

fetch("https://jsonplaceholder.typicode.com/users/"+userId+"/posts")
.then(response=>response.json())
.then(posts=>{
    muroDiv.innerHTML=""
    posts.forEach(posts=>{
        muroDiv.innerHTML+=`<div class="post">
        <div class="post-title">${posts.title}</div>
        <p>${posts.body}</p>
        <small>Publicado por: ${nombre}</small>
        </div>`
    })
})
}


