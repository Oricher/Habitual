// Executa assim que o DOM for carregado
document.addEventListener("DOMContentLoaded", () => {
  definirTituloDoDia();   // Define o título com a data de hoje
  carregarTarefas();      // Carrega as tarefas salvas no localStorage

  // Evento do botão "+" para adicionar uma nova tarefa vazia
  document.getElementById('add-tarefa').addEventListener('click', () => {
    adicionarTarefa('', false);  // Cria nova tarefa (não marcada, sem texto)
    salvarTarefas();             // Atualiza localStorage
  });
});

// Define o título do dia atual no formato longo (ex: segunda-feira, 27 de maio de 2025)
function definirTituloDoDia() {
  const hoje = new Date();
  const opcoes = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const titulo = hoje.toLocaleDateString('pt-BR', opcoes);
  document.getElementById('titulo-hoje').textContent = titulo;
}

// Lê as tarefas do localStorage e insere na lista do HTML
function carregarTarefas() {
  const lista = document.getElementById('tarefas-hoje');
  lista.innerHTML = ''; // Limpa o conteúdo atual da lista

  // Recupera tarefas salvas ou usa array vazio se não houver
  const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || [];

  // Para cada tarefa salva, adiciona à lista visualmente
  tarefasSalvas.forEach(tarefa => {
    adicionarTarefa(tarefa.texto, tarefa.feita);
  });
}

// Cria um novo item de tarefa (checkbox + input + botão de remover)
function adicionarTarefa(texto, feita) {
  const lista = document.getElementById('tarefas-hoje');
  const novoItem = document.createElement('li'); // <li> para conter a tarefa

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = feita;

  const inputTexto = document.createElement('input');
  inputTexto.type = 'text';
  inputTexto.value = texto;
  inputTexto.placeholder = 'Nova tarefa...';

  const botaoRemover = document.createElement('button');
  botaoRemover.textContent = '🗑️';
  botaoRemover.classList.add('remover-tarefa');
  
  // Ao clicar no botão de remover, deleta a tarefa da interface e salva a nova lista
  botaoRemover.addEventListener('click', () => {
    novoItem.remove();
    salvarTarefas();
  });

  // Quando o checkbox é alterado, salva o estado da tarefa
  checkbox.addEventListener('change', salvarTarefas);

  // Quando o input perde o foco, salva a tarefa (caso tenha sido editada)
  inputTexto.addEventListener('blur', salvarTarefas);

  // Pressionar "Enter" dentro do input adiciona nova tarefa abaixo e já foca nela
  inputTexto.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const novoInput = adicionarTarefa('', false); // Cria novo campo
      salvarTarefas();
      setTimeout(() => novoInput.focus(), 10); // Foco no novo campo
    }
  });

  // Monta o item visualmente
  novoItem.appendChild(checkbox);
  novoItem.appendChild(inputTexto);
  novoItem.appendChild(botaoRemover);
  lista.appendChild(novoItem);

  return inputTexto; // Retorna o input para dar foco quando necessário
}

// Percorre todos os itens da lista e salva no localStorage
function salvarTarefas() {
  const itens = document.querySelectorAll('#tarefas-hoje li');
  const tarefas = [];

  itens.forEach(item => {
    const checkbox = item.querySelector('input[type="checkbox"]');
    const inputTexto = item.querySelector('input[type="text"]');

    // Só salva se o texto não estiver vazio
    if (inputTexto.value.trim() !== '') {
      tarefas.push({
        texto: inputTexto.value,
        feita: checkbox.checked
      });
    }
  });

  // Salva o array final como JSON no localStorage
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}
