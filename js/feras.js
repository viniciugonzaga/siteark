// ========================
// Sistema de Dados (mantido igual)
// ========================
const menu = document.getElementById('diceMenu');
const openMenuButton = document.getElementById('openMenu');
const closeMenuButton = document.getElementById('closeMenu');
const diceSelect = document.getElementById('diceSelect');
const rollDiceButton = document.getElementById('rollDice');
const clearRollsButton = document.getElementById('clearRolls');
const rollList = document.getElementById('rollList');
const totalDisplay = document.getElementById('total');
const playerNameInput = document.getElementById('playerName');

let playerScores = {};

// Funções do sistema de dados
openMenuButton.addEventListener('click', () => {
    menu.classList.remove('hidden');
});

closeMenuButton.addEventListener('click', () => {
    menu.classList.add('hidden');
});

rollDiceButton.addEventListener('click', () => {
    const playerName = playerNameInput.value.trim();
    const diceType = parseInt(diceSelect.value);
    const roll = Math.floor(Math.random() * diceType) + 1;

    if (!playerName) {
        alert("Por favor, insira o nome do jogador!");
        return;
    }

    if (!playerScores[playerName]) {
        playerScores[playerName] = 0;
    }
    playerScores[playerName] += roll;

    const listItem = document.createElement('li');
    listItem.textContent = `${playerName} = D${diceType}: ${roll} (Total: ${playerScores[playerName]})`;
    rollList.appendChild(listItem);

    totalDisplay.textContent = `Total geral: ${Object.values(playerScores).reduce((a, b) => a + b, 0)}`;
});

clearRollsButton.addEventListener('click', () => {
    playerScores = {};
    rollList.innerHTML = '';
    totalDisplay.textContent = 'Total geral: 0';
});
