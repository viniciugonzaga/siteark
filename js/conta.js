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

    mensagemErro.textContent = "";
    alert(`Conta de ${selectedRole} (${username} - ${nicknameRPG || 'N/A'}) criada com sucesso!`);
    // Aqui você pode enviar os dados para um servidor ou redirecionar
    // Exemplo: window.location.href = "/dashboard.html";
  });

  // Nota: O código de footer dinâmico e menu de dados
  // deve estar em um arquivo JavaScript separado (script.js, por exemplo)
  // e não duplicado aqui para evitar conflitos.
  // Certifique-se de que esses elementos existam no seu HTML
  // onde esse script está sendo carregado.
});

// Consideração: Se o "Footer dinâmico" e o "Menu (Navbar)"
// já estão em outro arquivo JS para o resto do site,
// remova-os daqui para evitar duplicação.
// Mantenho-os aqui como referência caso estejam no mesmo arquivo.

// ========================
// Footer dinâmico (mantido do seu original, se estiver no mesmo arquivo JS)
// ========================
document.addEventListener("scroll", () => {
    const footer = document.querySelector("footer");
    if (footer) { // Verifica se o footer existe
        if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
            footer.style.background = "linear-gradient(45deg, #1a1a1a, #1a1a1a, #000, #000,#1a1a1a, #1a1a1a)";
        } else {
            footer.style.background = "linear-gradient(45deg, #1a1a1a, #000)";
        }
    }
});

// ========================
// Menu (Navbar) - (mantido do seu original, se estiver no mesmo arquivo JS)
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

if (openMenuButton) { // Verificação para evitar erro se o elemento não existir
  openMenuButton.addEventListener('click', () => {
      if (menu) menu.classList.remove('hidden');
  });
}

if (closeMenuButton) { // Verificação para evitar erro se o elemento não existir
  closeMenuButton.addEventListener('click', () => {
      if (menu) menu.classList.add('hidden');
  });
}

if (rollDiceButton) { // Verificação para evitar erro se o elemento não existir
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

if (clearRollsButton) { // Verificação para evitar erro se o elemento não existir
  clearRollsButton.addEventListener('click', () => {
      playerScores = {};
      if (rollList) rollList.innerHTML = '';
      if (totalDisplay) totalDisplay.textContent = 'Total geral: 0';
  });
}

// Função que redireciona (mantido do seu original, se estiver no mesmo arquivo JS)
function goToPage(page) {
  window.location.href = page;
}