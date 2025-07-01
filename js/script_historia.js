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

// ========================
// Footer dinâmico
// ========================
document.addEventListener("scroll", () => {
    const footer = document.querySelector("footer"); // Seleciona o rodapé

    // Se o usuário rolar até o fim da página
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
        footer.style.background = "linear-gradient(45deg, #463c04a8,#463c04a8;,#463c04a8)"; // Altera a cor do rodapé
    } else {
        footer.style.background = "linear-gradient(45deg,  #463c04a8,#463c04a8;,#463c04a8)"; // Mantém a cor padrão
    }
});

    document.addEventListener('DOMContentLoaded', function() {
        const icones = document.querySelectorAll('.icone-item');
        const textos = document.querySelectorAll('.civilizacoes-texto');
        const civilizacoesSection = document.querySelector('.civilizacoes-section'); // Seleciona a seção principal

        // Função para atualizar a imagem de fundo
        function updateBackgroundImage(imageUrl) {
            civilizacoesSection.style.setProperty('--bg-image-url', `url(${imageUrl})`); // Define a variável CSS
            civilizacoesSection.classList.add('has-background-image'); // Adiciona classe para visibilidade e animação
        }

        icones.forEach(icone => {
            icone.addEventListener('click', function() {
                const targetId = this.dataset.target; // Pega o ID do texto alvo
                const iconImageUrl = this.querySelector('img').src; // Pega o src da imagem do ícone clicado
                
                // Esconde todos os textos
                textos.forEach(texto => {
                    texto.classList.remove('active');
                    texto.classList.add('hidden');
                });

                // Mostra o texto correspondente ao ícone clicado
                const textoAlvo = document.getElementById(targetId);
                if (textoAlvo) {
                    textoAlvo.classList.remove('hidden');
                    textoAlvo.classList.add('active');
                }

                // Opcional: Adicionar/Remover uma classe 'selected' no ícone clicado
                icones.forEach(i => i.classList.remove('selected'));
                this.classList.add('selected');

                // Chama a função para atualizar a imagem de fundo
                updateBackgroundImage(iconImageUrl);
            });
        });

        // Opcional: Define um ícone e texto inicial selecionados ao carregar a página
        // Simula um clique no primeiro ícone para carregar o texto e a imagem inicial
        const primeiroIcone = document.querySelector('.icone-item[data-target="texto-civilizacao1"]');
        if (primeiroIcone) {
            primeiroIcone.click(); // Dispara o clique programaticamente
        } else {
             // Caso não haja ícone inicial, pelo menos esconde o texto inicial se ele não for o 'texto-civilizacao1'
            document.getElementById('texto-inicial').classList.add('active');
            document.getElementById('texto-inicial').classList.remove('hidden');
        }

    });
    
