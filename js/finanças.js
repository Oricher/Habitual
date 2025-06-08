const form = document.getElementById('form-lancamento');
const lista = document.getElementById('lista-lancamentos');
const saldoEl = document.getElementById('saldo');

let lancamentos = JSON.parse(localStorage.getItem('financas')) || [];

function atualizarSaldo() {
  const saldo = lancamentos.reduce((total, l) => {
    console.log(`[${l.tipo}] + R$${l.valor}`); // novo log aqui
    return l.tipo === 'entrada' ? total + l.valor : total - l.valor;
  }, 0);
  console.log("Saldo atualizado:", saldo); // novo log aqui
  saldoEl.textContent = saldo.toFixed(2);
}


function salvarLancamentos() {
  localStorage.setItem('financas', JSON.stringify(lancamentos));
}

function renderizarLista() {
  lista.innerHTML = '';
  lancamentos.forEach((l) => {
    const item = document.createElement('li');
    item.className = l.tipo;
    item.innerHTML = `
      <span>${l.descricao} - R$ ${l.valor.toFixed(2)}</span>
      <small>${l.data}</small>
    `;
    lista.appendChild(item);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const tipo = document.getElementById('tipo').value;
  const valorTexto = document.getElementById('valor').value.replace(',', '.');
  const valor = parseFloat(valorTexto);
  const descricao = document.getElementById('descricao').value;
  const data = new Date().toLocaleString();

  if (isNaN(valor) || descricao.trim() === '') return;

  lancamentos.push({ tipo, valor, descricao, data });
  salvarLancamentos();
  renderizarLista();
  atualizarSaldo();

  form.reset();
});

renderizarLista();
atualizarSaldo();
