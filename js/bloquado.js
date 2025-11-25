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


function checkPassword() {
    const userInput = document.getElementById('passwordInput').value;

    // Verifica se a senha inserida está correta
    if (userInput === correctPassword) {
      // Se a senha for correta, oculta o modal de senha
      document.getElementById('passwordModal').style.display = 'none';
      // Remove qualquer filtro visual (se houver)
      document.body.style.filter = 'none';  
    } else {
      // Senha incorreta, alerta o usuário
      alert('Senha incorreta! Tente novamente.');
    }
}
// Senha mestre (você pode alterar para a senha que desejar)
const MASTER_PASSWORD = "mestrefoda";

// Elementos do DOM
const passwordInput = document.getElementById('masterPassword');
const cardsContainer = document.getElementById('cardsContainer');
const cards = document.querySelectorAll('.card');
const cardLinks = document.querySelectorAll('.card-link');

// URLs para cada card (substitua pelas suas URLs reais)
const cardUrls = {
    'bosses': '',
    'feras': '',
    'players': '/players.html',
    'plantas': '/plantas.html',
    'entidades': '/entidades.html'
};

// Configurar URLs iniciais (vazias enquanto bloqueado)
function setupCardLinks() {
    cardLinks.forEach(link => {
        link.href = '#';
        link.addEventListener('click', (e) => {
            if (link.parentElement.classList.contains('locked')) {
                e.preventDefault();
                showAccessDenied();
            }
        });
    });
}

// Verificar senha
function checkPassword() {
    const enteredPassword = passwordInput.value.trim();
    
    if (enteredPassword === MASTER_PASSWORD) {
        unlockCards();
        showSuccessMessage();
        passwordInput.value = '';
    } else if (enteredPassword.length >= MASTER_PASSWORD.length) {
        showErrorAnimation();
        passwordInput.value = '';
    }
}

// Liberar cards
function unlockCards() {
    cards.forEach(card => {
        card.classList.remove('locked');
        card.classList.add('unlocked');
        
        // Ativar links
        const category = card.getAttribute('data-category');
        const link = card.querySelector('.card-link');
        if (cardUrls[category]) {
            link.href = cardUrls[category];
        }
    });
    
    // Adicionar efeito de transição suave
    cardsContainer.style.opacity = '0.8';
    setTimeout(() => {
        cardsContainer.style.opacity = '1';
        cardsContainer.style.transition = 'opacity 0.5s ease';
    }, 100);
}

// Mostrar mensagem de sucesso
function showSuccessMessage() {
    const existingMessage = document.querySelector('.success-message');
    if (existingMessage) existingMessage.remove();
    
    const message = document.createElement('div');
    message.className = 'success-message';
    message.textContent = 'Acesso Liberado! Segredos Revelados!';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(145deg, #1a1a1a, #000);
        color: #b6fff3;
        padding: 20px 40px;
        border-radius: 15px;
        border: 3px solid #b6fff3;
        box-shadow: 0 0 30px rgba(193, 240, 248, 0.8);
        font-size: 1.5rem;
        font-weight: bold;
        text-align: center;
        z-index: 1000;
        animation: fadeInOut 3s ease-in-out;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Mostrar animação de erro
function showErrorAnimation() {
    passwordInput.style.animation = 'shake 0.5s ease-in-out';
    passwordInput.style.borderColor = '#ff4444';
    passwordInput.style.boxShadow = '0 0 20px rgba(255, 68, 68, 0.6)';
    
    setTimeout(() => {
        passwordInput.style.animation = '';
        passwordInput.style.borderColor = '#333333';
        passwordInput.style.boxShadow = '0 0 20px rgba(193, 240, 248, 0.3)';
    }, 500);
}

// Mostrar acesso negado
function showAccessDenied() {
    const existingMessage = document.querySelector('.access-denied');
    if (existingMessage) existingMessage.remove();
    
    const message = document.createElement('div');
    message.className = 'access-denied';
    message.textContent = '🔒 Acesso Bloqueado - Digite a Senha Mestre';
    message.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(145deg, #2a1a1a, #000);
        color: #ff6b6b;
        padding: 15px 30px;
        border-radius: 10px;
        border: 2px solid #ff4444;
        box-shadow: 0 0 20px rgba(255, 68, 68, 0.6);
        font-size: 1rem;
        font-weight: bold;
        text-align: center;
        z-index: 1000;
        animation: fadeInOut 2s ease-in-out;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 2000);
}

// Adicionar estilos de animação dinamicamente
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
        
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translate(-50%, -60%); }
            20% { opacity: 1; transform: translate(-50%, -50%); }
            80% { opacity: 1; transform: translate(-50%, -50%); }
            100% { opacity: 0; transform: translate(-50%, -40%); }
        }
    `;
    document.head.appendChild(style);
}

// Event Listeners
passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

passwordInput.addEventListener('focus', () => {
    passwordInput.parentElement.querySelector('.cursor-animation').style.opacity = '1';
});

passwordInput.addEventListener('blur', () => {
    passwordInput.parentElement.querySelector('.cursor-animation').style.opacity = '0';
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    setupCardLinks();
    addDynamicStyles();
    
    // Focar no campo de senha automaticamente
    setTimeout(() => {
        passwordInput.focus();
    }, 1000);
});

// Proteção adicional: bloquear clique direito e inspecionar (opcional)
document.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener('keydown', (e) => {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault();
    }
});