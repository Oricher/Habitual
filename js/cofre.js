const input = document.getElementById('arquivo');
const contador = document.getElementById('contador');
const status = document.getElementById('status');
const cenario = document.getElementById('cenario');

let palavrasUnicas = new Set();

// Carrega do localStorage, se houver
const salvarExistente = localStorage.getItem('palavrasAprendidas');
if (salvarExistente) {
  palavrasUnicas = new Set(JSON.parse(salvarExistente));
  atualizarContador();
  atualizarCenario();
}

input.addEventListener('change', (event) => {
  const arquivo = event.target.files[0];
  if (!arquivo) return;

  const reader = new FileReader();

  reader.onload = (e) => {
    const texto = e.target.result;
    const palavras = texto.toLowerCase().match(/\b[a-z']+\b/g);
    
    if (palavras) {
      palavras.forEach(p => palavrasUnicas.add(p));
      localStorage.setItem('palavrasAprendidas', JSON.stringify([...palavrasUnicas]));
      atualizarContador();
      atualizarCenario();
      status.textContent = 'Palavras adicionadas com sucesso!';
    } else {
      status.textContent = 'Nenhuma palavra encontrada.';
    }
  };

  reader.readAsText(arquivo);
});

function atualizarContador() {
  const total = palavrasUnicas.size;
  contador.textContent = total.toString().padStart(4, '0');
}

function atualizarCenario() {
  const total = palavrasUnicas.size;

  if (total < 100) {
    cenario.style.backgroundImage = "url('cenarios/fundo1.jpg')";
  } else if (total < 250) {
    cenario.style.backgroundImage = "url('cenarios/fundo2.jpg')";
  } else if (total < 500) {
    cenario.style.backgroundImage = "url('cenarios/fundo3.jpg')";
  } else {
    cenario.style.backgroundImage = "url('cenarios/fundo4.jpg')";
  }
}
