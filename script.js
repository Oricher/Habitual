document.addEventListener("DOMContentLoaded", () => {
    definirTituloDoDia();
    carregarTarefas();
  

  // Botão para adicionar nova tarefa
  document.getElementById('add-tarefa').addEventListener('click', () => {
    adicionarTarefa('', false);
    salvarTarefas();
  });
});

// Função que define o título do dia
function definirTituloDoDia() {
  const hoje = new Date();
  const opcoes = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const titulo = hoje.toLocaleDateString('pt-BR', opcoes);
  document.getElementById('titulo-hoje').textContent = titulo;
}

// Função que carrega tarefas do localStorage
function carregarTarefas() {
  const lista = document.getElementById('tarefas-hoje');
  lista.innerHTML = ''; // limpa a lista antes de carregar

  const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || [];

  tarefasSalvas.forEach(tarefa => {
    adicionarTarefa(tarefa.texto, tarefa.feita);
  });
}

// Função que adiciona uma tarefa na tela
function adicionarTarefa(texto, feita) {
  const lista = document.getElementById('tarefas-hoje');
  const novoItem = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = feita;

  const inputTexto = document.createElement('input');
  inputTexto.type = 'text';
  inputTexto.value = texto;
  inputTexto.placeholder = 'Nova tarefa...';

  // Sempre que editar ou marcar/desmarcar, salva as tarefas
  checkbox.addEventListener('change', salvarTarefas);
  inputTexto.addEventListener('blur', salvarTarefas);

  novoItem.appendChild(checkbox);
  novoItem.appendChild(inputTexto);
  lista.appendChild(novoItem);
}

// Salva todas as tarefas da lista no localStorage
function salvarTarefas() {
  const itens = document.querySelectorAll('#tarefas-hoje li');
  const tarefas = [];

  itens.forEach(item => {
    const checkbox = item.querySelector('input[type="checkbox"]');
    const inputTexto = item.querySelector('input[type="text"]');

    tarefas.push({
      texto: inputTexto.value,
      feita: checkbox.checked
    });
  });

  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}
