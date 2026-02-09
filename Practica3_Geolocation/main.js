const coordenadas=document.getElementById("parrafo")
const enlace=document.getElementById("enlace")

const obtener=()=>{
    //VERIFICAR QUE EL NAVEGADOR TENGA SOPORTE PARA GEOLOCALIZACION
    if (navigator.geolocation) {
        coordenadas.innerText="Localizando..."
        navigator.geolocation.getCurrentPosition((position)=>{
            const longitud=position.coords.longitude
            const latitud=position.coords.latitude
            
            coordenadas.innerText=`Longitud: ${longitud} , Latitud: ${latitud}`
            enlace.href=`https://www.google.com/maps?q=${latitud}, ${longitud}`
            enlace.style.display="block"
        },(error)=>{
            coordenadas.innerText="NO SE PUEDE ACCEDER A LA UBICACION"
        })
    }else{
        alert("Error")
    }
}