document.getElementById('add-tarefa').addEventListener('click', () => {
  const lista = document.getElementById('tarefas-hoje');
  const novoItem = document.createElement('li');

  novoItem.innerHTML = '<input type="checkbox" /> <input type="text" placeholder="Nova tarefa..."/>';
  lista.appendChild(novoItem);
});
