const MUSIC_CLICK = "music_click";
const music = document.querySelector(".fa-music");
let audio = new Audio("audio/audio.mp3");
audio.loop = false;
audio.volume = 0.05;

music.addEventListener("click", function() {
  if (audio.paused) {
    audio.play();
    music.classList.add(MUSIC_CLICK);
  } else {
    audio.pause();
    audio.currentTime = 0;
    music.classList.remove(MUSIC_CLICK);
  }
});