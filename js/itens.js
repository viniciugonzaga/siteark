// ========================
// Menu (Navbar)
// ========================
const menu = document.getElementById('diceMenu'); // Menu de dados
const openMenuButton = document.getElementById('openMenu'); // Botão para abrir o menu
const closeMenuButton = document.getElementById('closeMenu'); // Botão para fechar o menu
const diceSelect = document.getElementById('diceSelect'); // Seleção do tipo de dado
const rollDiceButton = document.getElementById('rollDice'); // Botão para rolar dado
const clearRollsButton = document.getElementById('clearRolls'); // Botão para limpar rolagens
const rollList = document.getElementById('rollList'); // Lista de rolagens
const totalDisplay = document.getElementById('total'); // Exibição do total geral
const playerNameInput = document.getElementById('playerName'); // Entrada do nome do jogador

// Variáveis globais
let playerScores = {}; // Armazena as somas dos dados por jogador

// Função para abrir o menu
openMenuButton.addEventListener('click', () => {
    menu.classList.remove('hidden'); // Exibe o menu
});

// Função para fechar o menu
closeMenuButton.addEventListener('click', () => {
    menu.classList.add('hidden'); // Oculta o menu
});

// ========================
// Função de rolagem de dados
// ========================
rollDiceButton.addEventListener('click', () => {
    const playerName = playerNameInput.value.trim(); // Nome do jogador
    const diceType = parseInt(diceSelect.value); // Tipo de dado selecionado
    const roll = Math.floor(Math.random() * diceType) + 1; // Rolagem aleatória do dado

    // Validação: O nome do jogador deve ser preenchido
    if (!playerName) {
        alert("Por favor, insira o nome do jogador!");
        return;
    }

    // Atualiza o total do jogador
    if (!playerScores[playerName]) {
        playerScores[playerName] = 0; // Inicializa o jogador, caso não exista
    }
    playerScores[playerName] += roll;

    // Adiciona o registro da rolagem na lista
    const listItem = document.createElement('li');
    listItem.textContent = `${playerName} = D${diceType}: ${roll} (Total: ${playerScores[playerName]})`;
    rollList.appendChild(listItem);

    // Atualiza o total geral
    totalDisplay.textContent = `Total geral: ${Object.values(playerScores).reduce((a, b) => a + b, 0)}`;
});

// ========================
// Limpar registro de rolagens
// ========================
clearRollsButton.addEventListener('click', () => {
    playerScores = {}; // Reinicia os totais por jogador
    rollList.innerHTML = ''; // Limpa a lista de rolagens
    totalDisplay.textContent = 'Total geral: 0'; // Zera o total exibido
});

 // Função que redireciona com base no argumento recebido
 function goToPage(page) {
    window.location.href = page; // Redireciona para a página passada como argumento
}



const efeitos = document.querySelectorAll('.efeito');
const descricao = document.getElementById('descricao');

document.addEventListener('DOMContentLoaded', () => {
  const botoesFiltro = document.querySelectorAll('.filtro-btn');
  const armas = document.querySelectorAll('.arma');
  const bolinhas = document.querySelectorAll('.bolinha');
  const minerios = document.querySelectorAll('.minerio');

  // FILTRO POR TIPO
  botoesFiltro.forEach(btn => {
    btn.addEventListener('click', () => {
      const tipo = btn.getAttribute('data-tipo');
      
      botoesFiltro.forEach(b => b.classList.remove('ativo'));
      btn.classList.add('ativo');
      
      armas.forEach(arma => {
        if (arma.getAttribute('data-tipo') === tipo) {
          arma.style.display = 'block';
        } else {
          arma.style.display = 'none';
        }
      });
    });
  });

  // MODAL DE ARMAS
  window.abrirModalArma = (id) => {
    const modal = document.getElementById('modal-arma');
    const conteudo = document.getElementById('conteudo-arma');
    conteudo.innerHTML = `<h3>Arma Selecionada</h3><p>ID: ${id}</p>`; // Você pode colocar descrição real aqui
    modal.classList.remove('hidden');
  };

  window.fecharModalArma = () => {
    document.getElementById('modal-arma').classList.add('hidden');
  };

  // MODAL DE MINÉRIO
  window.abrirModalMinerio = () => {
    document.getElementById('modal-minerio').classList.remove('hidden');
  };

  window.fecharModalMinerio = () => {
    document.getElementById('modal-minerio').classList.add('hidden');
  };

  // TROCAR MINÉRIO PELO ÍNDICE
  window.trocarMinerio = (index) => {
    minerios.forEach((m, i) => {
      m.classList.toggle('ativo', i === index);
    });
    bolinhas.forEach((b, i) => {
      b.classList.toggle('ativa', i === index);
    });
  };
});
