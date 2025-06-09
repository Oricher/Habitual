document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('arquivo');
  const contador = document.getElementById('contador');
  const status = document.getElementById('status');
  const cenario = document.getElementById('cenario');
  const campoManual = document.getElementById('palavras-digitadas');
  const botaoAdicionar = document.getElementById('botao-adicionar');

  let palavrasUnicas = new Set();

  // Carrega palavras salvas, se houver
  const salvarExistente = localStorage.getItem('palavrasAprendidas');
  if (salvarExistente) {
    palavrasUnicas = new Set(JSON.parse(salvarExistente));
    atualizarContador();
  }

  // Importação via arquivo TXT
  input.addEventListener('change', (event) => {
    const arquivo = event.target.files[0];
    if (!arquivo) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const texto = e.target.result;
      const palavras = texto.toLowerCase().match(/\b[a-z']+\b/g);

      if (palavras) {
        palavras.forEach(p => palavrasUnicas.add(p));
        salvar();
        status.textContent = 'Palavras adicionadas com sucesso!';
      } else {
        status.textContent = 'Nenhuma palavra encontrada.';
      }
    };

    reader.readAsText(arquivo);
  });

  // Entrada manual
  function adicionarManual() {
    const texto = campoManual.value.trim().toLowerCase();
    const palavras = texto.match(/\b[a-z']+\b/g);

    if (palavras) {
      palavras.forEach(p => palavrasUnicas.add(p));
      salvar();
      status.textContent = 'Palavras adicionadas com sucesso!';
      campoManual.value = ''; // limpa o campo
    } else {
      status.textContent = 'Nenhuma palavra válida foi detectada.';
    }
  }

  // Enter adiciona também
  campoManual.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      adicionarManual();
    }
  });

  botaoAdicionar.addEventListener('click', adicionarManual);

  // Utilitários
  function salvar() {
    localStorage.setItem('palavrasAprendidas', JSON.stringify([...palavrasUnicas]));
    atualizarContador();
  }

  function atualizarContador() {
    const total = palavrasUnicas.size;
    contador.textContent = total.toString().padStart(4, '0');
  }

  /*function atualizarCenario() {
    const total = palavrasUnicas.size;

    if (total < 100) {
      cenario.style.backgroundImage = "url('/assets/cenarios/fundo1.jpg')";
    } else if (total < 250) {
      cenario.style.backgroundImage = "url('/assets/cenarios/fundo2.jpg')";
    } else if (total < 500) {
      cenario.style.backgroundImage = "url('/assets/cenarios/fundo3.jpg')";
    } else {
      cenario.style.backgroundImage = "url('/assets/cenarios/fundo4.jpg')";
    }
  } */
});
