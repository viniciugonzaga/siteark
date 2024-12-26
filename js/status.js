


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

// ========================
// Footer dinâmico
// ========================
document.addEventListener("scroll", () => {
    const footer = document.querySelector("footer"); // Seleciona o rodapé

    // Se o usuário rolar até o fim da página
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
        footer.style.background = "linear-gradient(45deg, #552e948f,#5d0964d5,#502b8b8f)"; // Altera a cor do rodapé
    } else {
        footer.style.background = "linear-gradient(45deg, #552e948f,#5d0964d5,#502b8b8f)"; // Mantém a cor padrão
    }
});
  // Função para salvar dados no localStorage
  function salvarFicha() {
    const ficha = {
        nome: document.getElementById('nome').value,
        personagem: document.getElementById('personagem').value,
        vida: document.getElementById('vida').value,
        sanidade: document.getElementById('sanidade').value,
        armadura: document.getElementById('armadura').value,
        agi: document.getElementById('agi').value,
        for: document.getElementById('for').value,
        int: document.getElementById('int').value,
        pre: document.getElementById('pre').value,
        vig: document.getElementById('vig').value,
        anotacoes: document.getElementById('anotacoes').value,
    };

    localStorage.setItem('ficha', JSON.stringify(ficha));
}

// Função para carregar dados do localStorage
function carregarFicha() {
    const ficha = JSON.parse(localStorage.getItem('ficha'));
    if (ficha) {
        document.getElementById('nome').value = ficha.nome;
        document.getElementById('personagem').value = ficha.personagem;
        document.getElementById('vida').value = ficha.vida;
        document.getElementById('sanidade').value = ficha.sanidade;
        document.getElementById('armadura').value = ficha.armadura;
        document.getElementById('agi').value = ficha.agi;
        document.getElementById('for').value = ficha.for;
        document.getElementById('int').value = ficha.int;
        document.getElementById('pre').value = ficha.pre;
        document.getElementById('vig').value = ficha.vig;
        document.getElementById('anotacoes').value = ficha.anotacoes;
    }
}

// Função para rolar dados
function rolarDado(lados) {
    const resultado = Math.floor(Math.random() * lados) + 1;
    document.getElementById('resultadoDado').textContent = `Resultado do dado: ${resultado}`;
    salvarFicha();
}

// Salvar automaticamente ao alterar campos
document.querySelectorAll('input, textarea').forEach((element) => {
    element.addEventListener('input', salvarFicha);
});

// Carregar a ficha ao carregar a página
window.onload = carregarFicha;