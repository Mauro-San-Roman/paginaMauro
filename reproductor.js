// Selección de elementos del DOM
const musicBtn = document.getElementById('musicButton');
const musicCard = document.getElementById('musicCard');
const closeMusic = document.getElementById('closeMusic');
const playBtn = document.getElementById('playBtn');
const audio = document.getElementById('mainAudio');
const playIcon = document.getElementById('playIcon');
const progressBar = document.getElementById('progressBar');
const trackTitleDisplay = document.getElementById('currentTrackTitle');

// 1. Abrir/Cerrar la tarjeta flotante
musicBtn.addEventListener('click', () => {
    musicCard.classList.toggle('d-none');
});

closeMusic.addEventListener('click', () => {
    musicCard.classList.add('d-none');
});

// 2. Lógica de Play/Pause
playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playIcon.classList.replace('fa-play', 'fa-pause');
    } else {
        audio.pause();
        playIcon.classList.replace('fa-pause', 'fa-play');
    }
});

// 3. Actualizar la barra de progreso en tiempo real
audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = percent + '%';
    }
});

// 4. Cambiar de canción al hacer clic en la lista
// Se define como global para que el onclick del HTML la encuentre
window.changeTrack = function(title, artist, url) {
    audio.src = url;
    trackTitleDisplay.innerText = `Reproduciendo: ${title} - ${artist}`;
    audio.play();
    playIcon.classList.replace('fa-play', 'fa-pause');
    
    // Opcional: Resaltar la canción activa visualmente
    console.log(`Cambiando a: ${title}`);
};