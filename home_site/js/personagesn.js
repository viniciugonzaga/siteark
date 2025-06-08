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

document.addEventListener("DOMContentLoaded", () => {
    // ========================
    // Carousel no Main
    // ========================
    const carouselImages = document.querySelector('.carousel-images');
    const images = document.querySelectorAll('.carousel-images img');
    let index = 1; // Começa na primeira imagem real
    const totalImages = images.length - 2; // Exclui imagens duplicadas para loop

    // Função para avançar para a próxima imagem
    function nextImage() {
        index++;
        carouselImages.style.transition = 'transform 1s ease-in-out'; // Adiciona transição suave
        carouselImages.style.transform = `translateX(${-index * 100}%)`;

        // Caso alcance a última imagem duplicada, reseta para a primeira
        if (index > totalImages) {
            setTimeout(() => {
                carouselImages.style.transition = 'none'; // Remove a transição
                index = 1; // Volta para a primeira imagem real
                carouselImages.style.transform = `translateX(${-index * 100}%)`;
            }, 1000); // Aguarda a transição terminar
        }
    }

    // Alterna automaticamente as imagens a cada 4 segundos
    setInterval(nextImage, 4000);
});
const toggleIcon = document.getElementById("toggle-icon");
const container = document.getElementById("container");
const titulo = document.getElementById("titulo");
const gif = document.getElementById("gif");
const descricao = document.getElementById("descricao");

// Estado inicial
let isPersonagem = true;

// Função para alternar o conteúdo
toggleIcon.addEventListener("click", () => {
  if (isPersonagem) {
    // Troca para NPC
    titulo.textContent = "NPCs ou Minions";
    gif.innerHTML = '<img src="imagens/personagens_magobroxa.jpg" alt="Gif de NPC">';
    descricao.textContent = "NPCs são personagens controlados pelo mestre, criados para auxiliar ou desafiar os protagonistas, geralmente marcados por carisma e características únicas. Já os minions são usados em combates massivos, como em guerras, para simplificar as batalhas. Eles possuem personalidades básicas e ações previsíveis, facilitando o desenrolar do conflito e determinando um vencedor de forma prática.";
    container.style.background = "linear-gradient(to bottom, #7c410a9a,#470a0a9a)";
  } else {
    // Troca para Personagem
    titulo.textContent = "Personagens-Sobreviventes";
    gif.innerHTML = '<img src="imagens/personagens_animação_caveleiro2.gif" alt="Gif de Personagem">';
    descricao.textContent = "No Ark, personagens podem ser criados pelo mestre ou pelos jogadores, com estatísticas baseadas em suas histórias e características. Suas ações evoluem ao longo do tempo, e jogar como um personagem exige interpretar suas decisões, evitando o 'Meta Game'. Aparência e conquistas refletem seus feitos, enquanto sobrevivem em uma selva cheia de predadores – que nem sempre são apenas animais.";
    container.style.background = "linear-gradient(to bottom, #470a0a9a,#7c410a9a)";
  }

  // Alterna o estado
  isPersonagem = !isPersonagem;
});

const card1 = document.getElementById("card1");
const card2 = document.getElementById("card2");

// Detectar telas pequenas
if (window.innerWidth <= 1080) {
  let isFlipped = false;

  setInterval(() => {
    if (isFlipped) {
      card1.style.transform = "translateX(-20px) rotate(-2deg)";
      card1.style.zIndex = "2";

      card2.style.transform = "translateX(20px) rotate(2deg)";
      card2.style.zIndex = "1";
    } else {
      card1.style.transform = "translateX(20px) rotate(2deg)";
      card1.style.zIndex = "1";

      card2.style.transform = "translateX(-20px) rotate(-2deg)";
      card2.style.zIndex = "2";
    }

    isFlipped = !isFlipped;
  }, 3000); // Troca automática a cada 3 segundos
}
// ========================
// Footer dinâmico
// ========================
document.addEventListener("scroll", () => {
    const footer = document.querySelector("footer"); // Seleciona o rodapé

    // Se o usuário rolar até o fim da página
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
        footer.style.background = "linear-gradient(45deg,  #0628299a,#811313c4,#0628299a)"; // Altera a cor do rodapé
    } else {
        footer.style.background = "linear-gradient(45deg, #0f0c29, #302b63, #24243e)"; // Mantém a cor padrão
    }
});

// Toggle para o menu no celular
document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

