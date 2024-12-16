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

    // Validação: O nome do jogador deve ser preenchido
    if (!playerName) {
        alert("Por favor, insira o nome do jogador!");
        return;
    }

    const roll = Math.floor(Math.random() * diceType) + 1; // Rolagem aleatória do dado

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

// ========================
// Funções de Mapa
// ========================
const spawnButton = document.getElementById('btnSpawn'); // Botão para gerar região
const mapMenu = document.getElementById('mapMenu'); // Menu de mapas
const closeMapMenuButton = document.getElementById('closeMapMenu'); // Botão para fechar o menu
const resetButton = document.getElementById('resetMap'); // Botão para resetar
const mapRegion = document.getElementById('mapRegion'); // Elemento para mostrar a região
const mapLocation = document.getElementById('mapLocation'); // Elemento para mostrar a localização

function openMapMenu() {
    mapMenu.style.display = 'block'; // Torna o menu visível
}

function closeMapMenu() {
    mapMenu.style.display = 'none'; // Esconde o menu
}

function generateMap() {
    const regions = [
        "Ilha da Caveira", "Campos de Ouro", "Bosque Antigo",
        "Floresta dos Pinheiros", "Condado", "Norte Frio"
    ];

    const locations = ["Norte", "Centro", "Sul"];

    const randomRegion = regions[Math.floor(Math.random() * regions.length)];
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];

    mapRegion.textContent = `Região: ${randomRegion}`;
    mapLocation.textContent = `Localização: ${randomLocation}`;

    openMapMenu();
}

function resetMap() {
    generateMap(); // Gera uma nova região e localização
}

spawnButton.addEventListener('click', generateMap);
closeMapMenuButton.addEventListener('click', closeMapMenu);
resetButton.addEventListener('click', resetMap);

// ========================
// Footer dinâmico
// ========================
document.addEventListener("scroll", () => {
    const footer = document.querySelector("footer");

    if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
        footer.style.background = "linear-gradient(45deg, #0f0c29, #302b63, #24243e)";
    } else {
        footer.style.background = "linear-gradient(45deg, #0f0c29, #302b63, #24243e)";
    }
});
