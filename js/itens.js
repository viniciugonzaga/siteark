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
        footer.style.background = "linear-gradient(45deg,#353757ea,#3a0b92d5,#353757ea)"; // Altera a cor do rodapé
    } else {
        footer.style.background = "linear-gradient(45deg, #0f0c29, #302b63, #24243e)"; // Mantém a cor padrão
    }
});

const efeitos = document.querySelectorAll('.efeito');
const descricao = document.getElementById('descricao');


// Array de objetos com os dados de cada efeito
const dadosEfeitos = [
    { nome: 'Flecha Explosiva', descricao: 'Causa 5d10 de dano em área e 1d8 de fogo residual.' },
    { nome: 'Espada Larga', descricao: 'Inflige 5d10+1d8 de dano, com variação dependendo do material.' },
    { nome: 'Armadilha de Urso', descricao: 'Causa 4d12 de dano e imobiliza por 1d4 turnos.' },
    { nome: 'Lança Granadas', descricao: 'Provoca 5d10+1d12 de dano em área.' },
    { nome: 'Cajado de Plasma', descricao: 'Realiza 7d12+1d10 de dano, mas tem recarga lenta.' },
    { nome: 'Fuzil de Precisão', descricao: 'Inflige 6d10+2d12 de dano, com 50% de chance de acerto crítico.' },
    { nome: 'Dardo Tranq', descricao: 'Provoca 1d8 de dano e induz torpor com teste de resistência.' },
    { nome: 'Armadilha Elétrica', descricao: 'Inflige 4d12 de dano e causa dano progressivo por 3 turnos.' },
    { nome: 'Piqueira', descricao: 'Inflige 2d10 de dano e reduz a defesa do alvo.' },
    { nome: 'Foice Gigante', descricao: 'Causa 5d10+1d12 de dano, atingindo múltiplos alvos em área cônica.' },
    { nome: 'Arco Composto', descricao: 'Inflige 5d10+2d12 de dano e tem maior alcance.' },
    { nome: 'Granada de Gás', descricao: 'Causa 1d6 de dano em área e induz torpor.' },
    { nome: 'Canhão Automático', descricao: 'Inflige 6d10+3d12 de dano, mas requer suporte fixo.' },
    { nome: 'Sabre de Energia', descricao: 'Causa 7d10+1d12 de dano e ignora armaduras metálicas.' },
    { nome: 'Besta Automática', descricao: 'Inflige 5d10+2d10 de dano, com alta taxa de disparos.' },
    { nome: 'Flecha Flamejante', descricao: 'Provoca 4d10+1d12 de dano e aplica dano contínuo por fogo.' },
    { nome: 'Bastão Espinhoso', descricao: 'Inflige 3d10+1d8 de dano, com chance de sangramento.' },
    { nome: 'Torpedo', descricao: 'Causa 8d12 de dano, eficaz apenas contra alvos aquáticos.' },
    { nome: 'Lança Pétrea', descricao: 'Inflige 3d12 de dano, com chance de criticar alvos voadores.' },
    { nome: 'Escudo Antigo Espinhoso', descricao: 'Reduz dano em 20 e causa 2d6 de dano ao atacante.' },
    { nome: 'Soco', descricao: 'Causa 1d6 + dano de arma.' },
    { nome: 'Escudo', descricao: 'Reduz dano em 15/25/35 dependendo do material.' },
    { nome: 'Graveto', descricao: 'Causa 1d6+2 de dano.' },
    { nome: 'Picareta', descricao: 'Inflige 3d8/3d12 de dano dependendo do minério.' },
    { nome: 'Machado', descricao: 'Causa 2d12/4d12 de dano dependendo da resistência.' },
    { nome: 'Soqueira', descricao: 'Aumenta o dano do soco em +10.' },
    { nome: 'Arco', descricao: 'Provoca 4d10+10+(1d12) ou 5d10+15+(1d12) dependendo do material.' },
    { nome: 'Espada', descricao: 'Inflige 5d10+1d8 ou 7d10+1d8 de dano dependendo do material.' },
    { nome: 'Lança', descricao: 'Causa 4d12+2d10 ou 5d10+2d12 de dano dependendo da técnica.' },
    { nome: 'Trabuco', descricao: 'Inflige 4d8 ou 8d8+(1d12) de dano.' },
    { nome: 'Porrete', descricao: 'Causa 4d10+10 ou 5d12+15 de dano.' },
    { nome: 'Besta', descricao: 'Inflige 4d10+20 ou 5d10+25 de dano.' },
    { nome: 'Clava de Corrente', descricao: 'Provoca 4d10+15+(1d12) ou 6d12+20+(1d12) de dano.' },
    { nome: 'Revólver', descricao: 'Inflige 3d10 ou 5d10+(1d12) de dano.' },
    { nome: 'Rifle de Assalto', descricao: 'Causa 4d10+10+(1d12) de dano.' },
    { nome: 'Rifle de Precisão', descricao: 'Provoca 5d10+20+(2d12) de dano.' },
    { nome: 'Martelo', descricao: 'Inflige 4d10+20 de dano.' },
    { nome: 'Chicote', descricao: 'Provoca 4d8+12+(1d12) de dano.' },
    { nome: 'Tridente', descricao: 'Causa 4d10+10+(2d12) de dano.' },
    { nome: 'Doze de Combate', descricao: 'Causa 4d10+4d12 à distância+(1d12) de dano.' },
    { nome: 'Muchaco', descricao: 'Inflige 3d12+(2d12) de dano.' },
    { nome: 'Tocha', descricao: 'Causa 3d6 de dano e aplica fogo.' }
   

];

efeitos.forEach((efeito, index) => {
    efeito.addEventListener('click', () => {
        const efeitoSelecionado = dadosEfeitos[index];
        descricao.textContent = efeitoSelecionado.descricao;
        imagem.src = efeitoSelecionado.imagem;
    });
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
