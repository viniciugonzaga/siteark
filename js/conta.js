// Função para criptografar a senha (SIMULADA para LocalStorage)
// ATENÇÃO: Para produção, SEMPRE use criptografia do lado do servidor!
function hashPassword(password) {
    // Uma simulação simples: concatenar e reverter. NUNCA faça isso em produção!
    return btoa(password).split('').reverse().join('');
}

// ====================================================================
// Gerenciamento de Usuários com LocalStorage
// ====================================================================

// Carrega todos os usuários existentes do LocalStorage
function getStoredUsers() {
    const usersJson = localStorage.getItem('rpgArkUsers');
    return usersJson ? JSON.parse(usersJson) : [];
}

// Salva a lista de usuários no LocalStorage
function saveUsers(users) {
    localStorage.setItem('rpgArkUsers', JSON.stringify(users));
}

// ====================================================================
// Lógica de Cadastro de Conta
// ====================================================================

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("login-form-unique");
    const usernameInput = document.getElementById("username");
    const nicknameRPGInput = document.getElementById("nicknameRPG");
    const emailInput = document.getElementById("email");
    const senhaInput = document.getElementById("senha");
    const confirmarSenhaInput = document.getElementById("confirmar");
    const roleRadios = document.querySelectorAll('input[name="role"]');
    const mensagemErro = document.getElementById("mensagem-erro");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = usernameInput.value.trim();
        const nicknameRPG = nicknameRPGInput.value.trim();
        const email = emailInput.value.trim();
        const senha = senhaInput.value;
        const confirmarSenha = confirmarSenhaInput.value;
        let selectedRole = '';

        for (const radio of roleRadios) {
            if (radio.checked) {
                selectedRole = radio.value;
                break;
            }
        }

        // Validações
        if (!username || !email || !senha || !confirmarSenha || !selectedRole) {
            mensagemErro.textContent = "Preencha todos os campos e selecione seu papel!";
            return;
        }

        if (senha.length < 6) {
            mensagemErro.textContent = "A senha deve ter no mínimo 6 caracteres.";
            return;
        }

        if (senha !== confirmarSenha) {
            mensagemErro.textContent = "As senhas não coincidem.";
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            mensagemErro.textContent = "Por favor, insira um e-mail válido.";
            return;
        }

        // Verifica se o email já existe
        const users = getStoredUsers();
        const emailExists = users.some(user => user.email === email);
        if (emailExists) {
            mensagemErro.textContent = "Este e-mail já está cadastrado. Tente outro ou faça login.";
            return;
        }

        // Tudo validado, agora salva o novo usuário
        const hashedPassword = hashPassword(senha); // Criptografa a senha (simulado)

        const newUser = {
            id: Date.now(), // ID único baseado no timestamp
            username: username,
            nicknameRPG: nicknameRPG,
            email: email,
            password: hashedPassword, // Salva a senha "criptografada"
            role: selectedRole,
            characters: [] // Cada usuário terá um array para suas fichas de personagem
        };

        users.push(newUser); // Adiciona o novo usuário à lista
        saveUsers(users); // Salva a lista atualizada no LocalStorage

        mensagemErro.textContent = "";
        alert(`Conta de ${selectedRole} (${username} - ${nicknameRPG || 'N/A'}) criada com sucesso! Você já pode fazer login.`);
        
        // Redireciona para a página de login após o cadastro bem-sucedido
        window.location.href = "../index/index_login.html"; 
    });
});


// ====================================================================
// Funções Comuns (Nav, Footer, Dados) - Considere mover para um arquivo comum
// Estas funções estão duplicadas em conta.js e login.js
// ====================================================================

document.addEventListener("scroll", () => {
    const footer = document.querySelector("footer");
    if (footer) {
        if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
            footer.style.background = "linear-gradient(45deg, #1a1a1a, #1a1a1a, #000, #000,#1a1a1a, #1a1a1a)";
        } else {
            footer.style.background = "linear-gradient(45deg, #1a1a1a, #000)";
        }
    }
});

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

if (openMenuButton) {
    openMenuButton.addEventListener('click', () => {
        if (menu) menu.classList.remove('hidden');
    });
}

if (closeMenuButton) {
    closeMenuButton.addEventListener('click', () => {
        if (menu) menu.classList.add('hidden');
    });
}

if (rollDiceButton) {
    rollDiceButton.addEventListener('click', () => {
        const playerName = playerNameInput ? playerNameInput.value.trim() : "Jogador";
        const diceType = diceSelect ? parseInt(diceSelect.value) : 20;
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
        if (rollList) rollList.appendChild(listItem);

        if (totalDisplay) totalDisplay.textContent = `Total geral: ${Object.values(playerScores).reduce((a, b) => a + b, 0)}`;
    });
}

if (clearRollsButton) {
    clearRollsButton.addEventListener('click', () => {
        playerScores = {};
        if (rollList) rollList.innerHTML = '';
        if (totalDisplay) totalDisplay.textContent = 'Total geral: 0';
    });
}

function goToPage(page) {
    window.location.href = page;
}