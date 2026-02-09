let lat = 21.048452;
let lon = -98.159085;

const map = L.map("map").setView([lat, lon], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

let marcador = L.marker([lat, lon]).addTo(map);

marcador.bindPopup("<b>¡AQUI VIVO! </b> <br>Mis coordenanas son: <br> Latitud: " +
    lat + "<br>Longitud: " + lon).openPopup();

var polygonMiCasa = L.polygon([
    [21.048152, -98.159475],
    [21.048363, -98.159133],
    [21.048339, -98.159075],
    [21.04843, -98.158853],
    [21.048706, -98.158904],
    [21.048624, -98.159319],
    [21.048347, -98.159265],
    [21.048195, -98.159494],
]).addTo(map);

polygonMiCasa.bindPopup(
    "Yo soy Mauro San Roman, <br> y esta es una practica usando LeafLet <br> para ubicar el perimetro de mi casa."
).openPopup;
