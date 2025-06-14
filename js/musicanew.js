const audio = document.getElementById("audio");
const btn = document.getElementById("playPause");

btn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    btn.textContent = "⏸️";
  } else {
    audio.pause();
    btn.textContent = "▶️";
  }
});

function trocarPagina(pagina) {
  document.getElementById("conteudo").src = pagina;
}
