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
        footer.style.background = "linear-gradient(45deg,,#6b6a62a4,#857b7bad,#6b6a62a4)"; // Altera a cor do rodapé
    } else {
        footer.style.background = "linear-gradient(45deg,,#6b6a62a4,#857b7bad,#6b6a62a4)"; // Mantém a cor padrão
    }
});
const efeitos = document.querySelectorAll('.efeito');
const descricao = document.getElementById('descricao');


// Array de objetos com os dados de cada efeito
const dadosEfeitos = [
    { nome: 'Efeito 1', descricao: ' Além de não enxergar, o personagem pode desenvolver alucinações auditivas ou táteis.' },
    { nome: 'Efeito 2', descricao: ' Se fazer ações vomita e recebe torpor, corre metade do deslocamento' },
    { nome: 'Efeito 3', descricao: '1d6 aleatório pra oq deve fazer. 1-atacar 2-recuar 3-nada 4-cura- 5-grita 6-escolhe ' },
    { nome: 'Efeito 4', descricao: 'Vê mais de uma coisa aleatória e imagens da cabeça, imagina criaturas, recebe danos mentais enganosos' },
    { nome: 'Efeito 5', descricao: 'Toda vez que vê aquilo toma dano mental até superar ou esquecer.'},
    { nome: 'Efeito 6', descricao: 'Não consegue se mover de medo, perde a ação.' },
    { nome: 'Efeito 7', descricao: 'Além de não ouvir, o personagem pode ter dificuldade em qualquer teste de audição ou perceber q está fazendo barulho.' },
    { nome: 'Efeito 8', descricao: 'Além de não poder falar, o personagem pode ter dificuldade em expressar suas emoções. '},
    { nome: 'Efeito 9', descricao: 'Permita que os personagens façam testes de resistência para diminuir a duração ou a severidade de um efeito.' },
    { nome: 'Efeito 10', descricao: 'Ofereça diferentes formas de curar os efeitos, como poções, magias ou descanso prolongado.' },
    { nome: 'Efeito 11', descricao: ' 10% da vida máxima é perdida por rodada e faz rastro' },
    { nome: 'Efeito 12', descricao: 'Normalmente conserta com cirurgia mas recebe 20% de dano total da vida por rodada até estabilizarem. '},
    { nome: 'Efeito 13', descricao: 'Fica com sono ou é nocauteado, teste de resistência' },
    { nome: 'Efeito 14', descricao: 'Sofre desvantagem no teste de lua, esquiva ou bloqueio. -5/-10/-15.'},
    { nome: 'Efeito 15', descricao: 'Não faz nada e perde a ação.' },
    { nome: 'Efeito 16', descricao: 'Ao andar toma dano interno 10 % da vida.' },
    { nome: 'Efeito 17', descricao: ' Metade do deslocamento +5 furtividade em situações.'},
    { nome: 'Efeito 18', descricao: 'Muito medo de começar a luta -5 em qualquer ação no começo da luta.'},
    { nome: 'Efeito 19', descricao: ' Perde 1 dado em todos os testes de força.' },
    { nome: 'Efeito 20', descricao: 'Menos 1 dado em todos os testes de agilidade.' }
   

];

efeitos.forEach((efeito, index) => {
    efeito.addEventListener('click', () => {
        const efeitoSelecionado = dadosEfeitos[index];
        descricao.textContent = efeitoSelecionado.descricao;
        imagem.src = efeitoSelecionado.imagem;
    });
});


