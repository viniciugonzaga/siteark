


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
        footer.style.background = "linear-gradient(45deg, #700404ec, #3c0000)"; // Altera a cor do rodapé
    } else {
        footer.style.background = "linear-gradient(45deg, #700404ec, #3c0000)"; // Mantém a cor padrão
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    body.classList.add('changing-background'); // Adiciona a classe imediatamente para teste
    const pontoDeMudancaBurnout = document.querySelector('.ritual-card'); // Seleciona a div com a classe ritual-card
    if (pontoDeMudanca) {
        const alturaPontoDeMudanca = pontoDeMudanca.offsetTop;
        let backgroundChanged = false;

        window.addEventListener('scroll', function() {
            const scrollY = window.scrollY || window.pageYOffset;

            if (scrollY > alturaPontoDeMudanca && !backgroundChanged) {
                backgroundChanged = true;
                body.classList.add('changing-background'); // Adiciona a classe para iniciar a animação

                // Após a animação, troca o fundo do body (opcional)
                setTimeout(() => {
                    body.style.backgroundImage = "url('../imagens/lobby_rituais.jpg')";
                    body.classList.remove('changing-background'); // Remove a classe de animação
                }, 1000); // Tempo da animação
            } else if (scrollY <= alturaPontoDeMudanca && backgroundChanged) {
                backgroundChanged = false;
                body.style.backgroundImage = "url('../imagens/lobby_rituais2.jpg')"; // Reverte o fundo
                body.classList.remove('changing-background'); // Remove a classe de animação
                // Opcional: Se quiser uma animação de volta, você precisaria criar outra classe e animação
            }
        });
    } else {
        console.error("Elemento com a classe 'titulo_principal' não encontrado.");
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('container-geral2');
    let isDarkening = true;
    const animationDuration = 4000; // Duração da animação em milissegundos

    container.addEventListener('animationiteration', function(event) {
        if (event.target === container && (event.animationName === 'darkenOscillate' || event.animationName === 'lightenOscillate')) {
            isDarkening = !isDarkening;
            const animationName = isDarkening ? 'darkenOscillate' : 'lightenOscillate';
            container.style.setProperty('--before-animation', `${animationName} ${animationDuration / 1000}s infinite alternate`);
        }
    });

    // Define uma variável CSS customizada para a animação no ::before
    container.style.setProperty('--before-animation', `darkenOscillate ${animationDuration / 1000}s infinite alternate`);

    // Adiciona um estilo para aplicar a animação ao ::before usando a variável
    const style = document.createElement('style');
    style.textContent = `#container-geral2::before { animation: var(--before-animation); }`;
    document.head.appendChild(style);
});


function showContainer(containerId) {
    const containers = document.querySelectorAll('.container');
    containers.forEach(container => {
        container.classList.remove('active');
    });
    document.getElementById(`container-${containerId}`).classList.add('active');
}

function openModal(title, type, imageSrc, description) {
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalImg = document.getElementById('modal-img');
    const modalType = document.getElementById('modal-type');
    const modalDescription = document.getElementById('modal-description');

    modalTitle.textContent = title;
    modalImg.src = imageSrc;
    modalImg.alt = title; // Adiciona texto alternativo para a imagem
    modalType.textContent = type;
    modalDescription.textContent = description;
    modalOverlay.style.display = 'flex'; // ou 'block', dependendo do seu layout
}

function closeModal() {
    const modalOverlay = document.querySelector('.modal-overlay');
    modalOverlay.style.display = 'none';
}

// Adiciona um ouvinte de evento para fechar o modal ao clicar fora dele
document.querySelector('.modal-overlay').addEventListener('click', function(event) {
    if (event.target === this) { // Verifica se o clique ocorreu diretamente no overlay
        closeModal();
    }
});

// Inicialmente, mostra o primeiro container (Rituais)
document.addEventListener('DOMContentLoaded', function() {
    showContainer(0);
});
