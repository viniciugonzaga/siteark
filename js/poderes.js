
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



document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.animated-element, .section-wrapper');
    const animatedTexts = document.querySelectorAll('.animated-text');

    // Intersection Observer para animações de entrada de divs e sections
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animation = element.getAttribute('data-animation');
                if (animation) {
                    element.style.opacity = '1'; // Torna visível para a animação
                    element.style.animationName = animation;
                    element.style.animationDuration = element.dataset.duration || '1s'; // Permite duração customizada
                    element.style.animationDelay = element.dataset.delay || '0s'; // Permite delay customizado
                }
                observer.unobserve(element); // Para de observar depois que a animação é acionada
            }
        });
    }, {
        threshold: 0.1 // A animação dispara quando 10% do elemento está visível
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Para o brilho de texto que passa (glowing-sweep-text)
    animatedTexts.forEach(textElement => {
        if (textElement.dataset.animation === 'glowing-sweep-text') {
            // A animação glowingSweep já é controlada via CSS e 'infinite'
            // Não precisamos de JS para ativá-la, apenas para garantir que o elemento está visível
            // (que é coberto pelo Intersection Observer para as .animated-element e .section-wrapper)
        } else if (textElement.dataset.animation === 'flicker-text') {
            // A animação flickerText é puramente CSS e 'infinite'
        }
    });

    // Correção para o brilho de varredura do texto ao recarregar
    // Se você notar que o brilho não está animando corretamente após o carregamento inicial em alguns casos,
    // pode ser necessário forçar um reflow ou reiniciar a animação.
    // No entanto, para animações CSS "infinite", elas geralmente iniciam automaticamente.
});
function abrirModal() {
    document.getElementById('modalRegras').style.display = 'flex';
  }

  function fecharModal() {
    document.getElementById('modalRegras').style.display = 'none';
  }