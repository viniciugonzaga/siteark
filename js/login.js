// Função para criptografar a senha (SIMULADA - DEVE SER IGUAL À DO CADASTRO)
function hashPassword(password) {
    return btoa(password).split('').reverse().join('');
}

// Carrega todos os usuários existentes do LocalStorage (reimplementado aqui por enquanto)
function getStoredUsers() {
    const usersJson = localStorage.getItem('rpgArkUsers');
    return usersJson ? JSON.parse(usersJson) : [];
}

// ====================================================================
// Lógica de Login de Conta
// ====================================================================

document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("login-form-unique"); // Corrigido para o ID no HTML
    const emailInput = document.getElementById("login-email-input");
    const passwordInput = document.getElementById("login-password-input");
    const loginMessage = document.getElementById("login-message"); // Adicione um elemento para mensagens de erro/sucesso

    if (loginForm) { // Garante que o formulário exista
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = emailInput.value.trim();
            const password = passwordInput.value;

            if (!email || !password) {
                if (loginMessage) loginMessage.textContent = "Por favor, preencha todos os campos.";
                return;
            }

            const users = getStoredUsers(); // Obtém a lista de usuários
            const hashedPassword = hashPassword(password); // Criptografa a senha digitada

            // Procura por um usuário com o email e senha correspondentes
            const foundUser = users.find(user => 
                user.email === email && user.password === hashedPassword
            );

            if (foundUser) {
                // Login bem-sucedido!
                // Salva o ID ou email do usuário logado no LocalStorage
                localStorage.setItem('currentUserEmail', foundUser.email); // Usaremos o email como identificador do usuário logado

                if (loginMessage) loginMessage.textContent = "Login bem-sucedido!";
                alert(`Bem-vindo, ${foundUser.username}!`);
                
                // Redireciona para a página de fichas de personagem
                window.location.href = "../index/index_jogadores.html"; 
            } else {
                // Credenciais inválidas
                if (loginMessage) loginMessage.textContent = "E-mail ou senha inválidos. Tente novamente.";
            }
        });
    }

    // Validação de e-mail (do seu código original, mantido aqui)
    if (emailInput) {
        emailInput.addEventListener("input", () => {
            if (!emailInput.validity.valid) {
                emailInput.style.borderColor = "red";
            } else {
                emailInput.style.borderColor = "#00bfa5"; // Cor da borda para e-mail válido
            }
        });
    }
});

// ====================================================================
// Funções Comuns (Nav, Footer, Dados) - Considere mover para um arquivo comum
// Estas funções estão duplicadas em conta.js e login.js.
// Para um projeto maior, o ideal é ter um 'common.js' e importá-lo.
// ====================================================================

document.addEventListener("scroll", () => {
    const footer = document.querySelector("footer"); // Seleciona o rodapé
    if (footer) {
        if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
            footer.style.background = "linear-gradient(45deg,  #1a1a1a, #1a1a1a, #000, #000,#1a1a1a, #1a1a1a)"; // Altera a cor do rodapé
        } else {
            footer.style.background = "linear-gradient(45deg, #1a1a1a, #000)"; // Mantém a cor padrão
        }
    }
});

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

if (openMenuButton) {
    openMenuButton.addEventListener('click', () => {
        if (menu) menu.classList.remove('hidden'); // Exibe o menu
    });
}

if (closeMenuButton) {
    closeMenuButton.addEventListener('click', () => {
        if (menu) menu.classList.add('hidden'); // Oculta o menu
    });
}

if (rollDiceButton) {
    rollDiceButton.addEventListener('click', () => {
        const playerName = playerNameInput ? playerNameInput.value.trim() : "Jogador"; // Nome do jogador
        const diceType = diceSelect ? parseInt(diceSelect.value) : 20; // Tipo de dado selecionado
        const roll = Math.floor(Math.random() * diceType) + 1; // Rolagem aleatória do dado

        if (!playerName) {
            alert("Por favor, insira o nome do jogador!");
            return;
        }

        if (!playerScores[playerName]) {
            playerScores[playerName] = 0; // Inicializa o jogador, caso não exista
        }
        playerScores[playerName] += roll;

        const listItem = document.createElement('li');
        listItem.textContent = `${playerName} = D${diceType}: ${roll} (Total: ${playerScores[playerName]})`;
        if (rollList) rollList.appendChild(listItem);

        if (totalDisplay) totalDisplay.textContent = `Total geral: ${Object.values(playerScores).reduce((a, b) => a + b, 0)}`;
    });
}

if (clearRollsButton) {
    clearRollsButton.addEventListener('click', () => {
        playerScores = {}; // Reinicia os totais por jogador
        if (rollList) rollList.innerHTML = ''; // Limpa a lista de rolagens
        if (totalDisplay) totalDisplay.textContent = 'Total geral: 0'; // Zera o total exibido
    });
}

function goToPage(page) {
    window.location.href = page; // Redireciona para a página passada como argumento
}