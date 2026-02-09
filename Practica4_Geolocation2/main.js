let lat;
let lon;
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            const coordenadas = [lat, lon];
            const map = L.map("map").setView(coordenadas, 13);
            L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 19,
                attribution:
                    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }).addTo(map);
            let marcador =  L.marker(coordenadas).addTo(map)
            marcador.bindPopup('<b>ESTOY AQUI...<br> Mis coordenanas son: <br> Latitud: '+lat+'<br >Longitud: '+lon)
            //alert(latt + long)
        },
        () => { }
    );
}
