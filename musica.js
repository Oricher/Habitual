function tocarMusica() {
  const musica = document.getElementById('bg-music');
  musica.volume = 0.4; // volume suave
  musica.play().catch(e => {
    alert("⚠️ O navegador bloqueou a reprodução automática. Clique novamente.");
  });
}

function pausarMusica() {
  const musica = document.getElementById('bg-music');
  musica.pause();
}
