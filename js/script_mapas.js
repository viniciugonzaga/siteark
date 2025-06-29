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

    // Validação: O nome do jogador deve ser preenchido
    if (!playerName) {
        alert("Por favor, insira o nome do jogador!");
        return;
    }

    const roll = Math.floor(Math.random() * diceType) + 1; // Rolagem aleatória do dado

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
// Funções de Mapa
// ========================
const spawnButton = document.getElementById('btnSpawn'); // Botão para gerar região
const mapMenu = document.getElementById('mapMenu'); // Menu de mapas
const closeMapMenuButton = document.getElementById('closeMapMenu'); // Botão para fechar o menu
const resetButton = document.getElementById('resetMap'); // Botão para resetar
const mapRegion = document.getElementById('mapRegion'); // Elemento para mostrar a região
const mapLocation = document.getElementById('mapLocation'); // Elemento para mostrar a localização

function openMapMenu() {
    mapMenu.style.display = 'block'; // Torna o menu visível
}

function closeMapMenu() {
    mapMenu.style.display = 'none'; // Esconde o menu
}

function generateMap() {
    const regions = [
        "Ilha da Caveira", "Campos de Ouro", "Bosque Antigo",
        "Floresta dos Pinheiros", "Condado", "Norte Frio"
    ];

    let locations = [
        "Norte", "Centro", "Sul", "Nordeste", "Noroeste", "Sudeste", "Sudoeste", "Leste", "Oeste",
        "Entrada de Caverna abandonada(Segura)",
        "Entrada de Caverna abandonada(Perigosa)",
        "Zona Segura(melhor Região)",
        "Zona de Caça(Região selvagem)",
    ];

    const randomRegion = regions[Math.floor(Math.random() * regions.length)];

    // Se a região for "Ilha da Caveira", remove as opções de zona segura
    if (randomRegion === "Ilha da Caveira") {
        locations = locations.filter(location =>
            !location.includes("Segura") && !location.includes("melhor Região")
        );
       
    }

    const randomLocation = locations[Math.floor(Math.random() * locations.length)];

    mapRegion.textContent = `Região: ${randomRegion}`;
    mapLocation.textContent = `Localização: ${randomLocation}`;

    openMapMenu();
}

function resetMap() {
    generateMap(); // Gera uma nova região e localização
}

spawnButton.addEventListener('click', generateMap);
closeMapMenuButton.addEventListener('click', closeMapMenu);
resetButton.addEventListener('click', resetMap);

// ========================
// Footer dinâmico
// ========================
document.addEventListener("scroll", () => {
    const footer = document.querySelector("footer");

    if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
        footer.style.background = "linear-gradient(45deg#1a1a1a, #1a1a1a, #000, #1a1a1a, #1a1a1a)";
    } else {
        footer.style.background = "linear-gradient(45deg,#1a1a1a, #1a1a1a, #000, #1a1a1a, #1a1a1a)";
    }
});
const imagens = [
    "../imagens/Ilha_Ark_Ciclo1.png",
    "../imagens/ark_mapa_ciclo2_v2.png",
];

let index = 0;
const mapaImg = document.getElementById("mapaImg");

// Função para trocar a imagem
function trocarImagem(direcao) {
    index = (index + direcao + imagens.length) % imagens.length;
    mapaImg.style.opacity = "0"; // Efeito de fade-out
    setTimeout(() => {
        mapaImg.src = imagens[index];
        mapaImg.style.opacity = "1"; // Efeito de fade-in
    }, 300);
}

// Eventos dos botões
document.querySelector(".prev").addEventListener("click", () => trocarImagem(-1));
document.querySelector(".next").addEventListener("click", () => trocarImagem(1));

// Array com as imagens e os textos correspondentes
const imagens2 = [
    { src: "../imagens/campos_de_ouro.png", texto: "Os Campos de Ouro são uma vasta região de terra fértil, considerada a mais rica da ilha, onde as estações do ano favorecem o crescimento de uma vegetação exuberante. A terra é perfeita para a vida, sendo permeada por vilas e pequenas cidades povoadas por diversos povos, que se beneficiam dos recursos abundantes. Os herbívoros prosperam nesse ambiente, desde os de tamanho menor até os maiores, que se alimentam e se multiplicam rapidamente. A região também é lar de predadores médios, que caçam o que está disponível, sem especialização. Sua fertilidade atrai animais de outras partes da ilha, em busca de abrigo e alimento durante as mudanças sazonais. Minérios e rochas preciosas estão espalhados pela terra e montanhas, escondendo ruínas e cavernas que guardam mistérios antigos. Ao sul, um deserto desconhecido estende-se como uma barreira inexplorada, enquanto a floresta fechada, que se estende mais ao norte, serve de refúgio para animais maiores, que se protegem da presença dos predadores de lagos e riachos, especializados na pesca de peixes e nas águas das regiões mais isoladas.", titulo: "Campos de Ouro" },
    { src: "../imagens/condado.png", texto: " O Condado é uma terra de paz e serenidade, dominada por vastas planícies e praias douradas, onde a vegetação litorânea floresce sob o céu aberto. Em contraste, uma floresta calma abriga predadores silenciosos, geralmente ativos à noite, enquanto os herbívoros adaptaram-se, com couraças mais espessas ou maior maturidade, para resistir aos perigos. As montanhas do condado, ricas em metais preciosos, são repletas de grandes aves, cujos cânticos ecoam pela região. O ambiente é marcado por uma melancolia sutil, onde as praias vazias dão a sensação de solidão, e as estrelas parecem observar cada movimento. Ao norte, uma floresta dominada por artrópodes gigantes é um lugar evitado por todos, devido aos mistérios de uma cidade perdida, escondida nas profundezas dessa vegetação escura e abandonada, a qual ninguém ousa explorar, nem mesmo os mais corajosos.", titulo: "Condado" },
    { src: "../imagens/floresta_dos_pinheiros.png", texto: "A Floresta de Pinheiros é uma imensa e selvagem região repleta de biodiversidade, onde altas árvores e vegetação densa abrigam uma variedade de animais, desde mamíferos e répteis ágeis até grandes herbívoros. Enquanto o ambiente oferece abrigo e alimento para muitas espécies, também esconde perigos para os menores, que devem enfrentar armadilhas naturais e predadores astutos. A paisagem varia: ao norte, o clima frio abriga uma ilha de herbívoros e riquezas minerais; ao sul, vastos campos favorecem a caça de predadores velozes; e no sudeste, um reino autoritário impõe a ideia de que os fracos estão destinados à derrota.", titulo: "Floresta dos Pinheiros" },
    { src: "../imagens/Ilha_da_caveira.png", texto: "A Ilha da Caveira é um lugar isolado e inóspito, afastada de qualquer rota comum e envolta por uma densa névoa que dificulta a aproximação. Suas águas são traidoras, repletas de criaturas desconhecidas, muitas das quais são verdadeiros monstros marinhos, prontos para devorar qualquer intruso que ouse se aproximar. Esta ilha é um território endiabrado, onde a morte permeia todos os cantos. Quem ousa pisar em suas praias nunca retorna. A fauna local é composta por predadores cruéis, acostumados a devorar tudo o que veem pela frente, com uma predileção particular por humanos, que são considerados as presas mais fáceis. As criaturas que habitam a ilha são fora dos padrões normais, gigantes e poderosas, com habilidades adaptadas tanto para o ataque quanto para a defesa. Pilhas de ossos e restos de carne se acumulam em várias partes da ilha, lembrando a carnificina que ali ocorre constantemente. Carniceiros e aproveitadores vagam pelas cavernas, em busca de qualquer oportunidade para saquear ou caçar. A ilha é repleta de cavernas e túneis, muitos deles contendo minérios únicos, que atraem aqueles que buscam riquezas. Também existem túneis secretos que conectam a ilha a vilarejos orcs e, segundo rumores, há passagens tão grandes que podem até ligar a Ilha da Caveira a outras ilhas, fazendo dela um ponto estratégico de trevas e mistérios.", titulo: "Ilha da Caveira" },
    { src: "../imagens/norte_frio.png", texto: "O Norte Frio é uma terra implacável, onde uma tempestade de neve constante esconde uma paisagem de gelo seco e pedras congeladas. As montanhas cobertas de neve se erguem como colossos, com picos de gelo e espinhos formando barreiras naturais em cada entrada de caverna, criando um labirinto perigoso. No coração desse deserto gelado, a temperatura extrema torna a sobrevivência impossível sem as adaptações necessárias: todas as criaturas, desde os predadores grandes e pacientes até os herbívoros gigantes, possuem penas ou pelos espessos para suportar o frio feroz. Os rastros de sangue são frequentemente encontrados, vestígios das caçadas impiedosas que ocorrem nas cavernas, onde os animais inteligentes formam grupos para tirar proveito das presas mais vulneráveis. As montanhas, ocupadas por corujas, golens e aves de rapina, aguardam o momento certo para atacar. O grande predador que caminha pelo deserto gelado é temido por todos, uma força imparável que percorre o território à procura de suas próximas vítimas. Ao sul, um pântano misterioso se estende, repleto de flores e ervas medicinais, mas infestadas de crocodilos, cobras, sapos e insetos gigantes, tornando a travessia um desafio mortal para quem ousa se aventurar por essa região infestada.", titulo: "Norte Frio" },
    { src: "../imagens/bosque_antigo.png", texto: "O Bosque Antigo é uma região selvagem dominada por um imponente Rei Leão e marcada pela presença de um vulcão ativo. O ambiente hostil é composto por campos de pedregulho, vegetação rasteira e uma fauna feroz, onde superpredadores lutam diariamente pelo domínio, enquanto herbívoros sobrevivem em bandos ou por agilidade. A gritaria das batalhas ecoa pela terra, criando um cenário de constante tensão. Ao Sudoeste, uma ilha cercada por mata fechada abriga animais que acumulam galhos para moldar os caminhos dos rios, oferecendo um contraste de estratégia em meio à brutalidade do bosque. É um território implacável, governado pela força e pela astúcia.", titulo: "Bosque Antigo" },
];

// Seleção dos elementos
const imagemElemento = document.getElementById("imagem2");
const textoElemento = document.getElementById("texto");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const tituloElemento = document.querySelector(".descricao3"); // Seleciona o título
const carrosselContainer = document.querySelector('.carrossel-container'); // Get the carousel container element

let indiceAtual = 0;

// Define a mapping of titles to colors and box-shadows
const regionStyles = {
    "Ilha da Caveira": {
        color: "rgba(163, 6, 6, 1)", // Cor principal para efeitos (vermelho mais sólido)
        background: "rgba(163, 6, 6, 0.18)", // Cor para o gradiente de fundo
        boxShadow: "0 8px 20px rgba(107, 4, 4, 0.7), 0 0 40px rgba(255, 0, 0, 0.4)" // Sombra do container
    },
    "Norte Frio": {
        color: "rgba(5, 133, 175, 1)", // Cor principal para efeitos (azul mais sólido)
        background: "rgba(5, 133, 175, 0.22)",
        boxShadow: "0 8px 20px rgba(0, 191, 255, 0.7), 0 0 40px rgba(0, 191, 255, 0.4)"
    },
    "Condado": {
        color: "rgba(1, 85, 1, 1)", // Cor principal para efeitos (verde mais sólido)
        background: "rgba(1, 85, 1, 0.21)",
        boxShadow: "0 8px 20px rgba(0, 128, 0, 0.7), 0 0 40px rgba(0, 128, 0, 0.4)"
    },
    "Bosque Antigo": {
        color: "rgba(99, 64, 1, 1)", // Cor principal para efeitos (laranja/marrom mais sólido)
        background: "rgba(99, 64, 1, 0.22)",
        boxShadow: "0 8px 20px rgba(255, 165, 0, 0.7), 0 0 40px rgba(255, 165, 0, 0.4)"
    },
    "Campos de Ouro": {
        color: "rgba(158, 158, 5, 1)", // Cor principal para efeitos (amarelo mais sólido)
        background: "rgba(158, 158, 5, 0.22)",
        boxShadow: "0 8px 20px rgba(255, 255, 0, 0.7), 0 0 40px rgba(255, 255, 0, 0.4)"
    },
    "Floresta dos Pinheiros": {
        color: "rgba(110, 51, 9, 1)", // Cor principal para efeitos (chocolate/salmão mais sólido)
        background: "rgba(110, 51, 9, 0.21)",
        boxShadow: "0 8px 20px rgba(210, 105, 30, 0.7), 0 0 40px rgba(210, 105, 30, 0.4)"
    }
};


// Função para atualizar o carrossel
function atualizarCarrossel() {
    imagemElemento.src = imagens2[indiceAtual].src;
    textoElemento.textContent = imagens2[indiceAtual].texto;
    tituloElemento.textContent = imagens2[indiceAtual].titulo;

    // Get the corresponding style for the current title
    const currentRegionStyle = regionStyles[imagens2[indiceAtual].titulo] || {
        color: "#f0f0f0", // Cor padrão para texto
        background: "transparent",
        boxShadow: "0px 8px 20px rgba(193, 240, 248, 0.5)" // Default shadow
    };

    // Set the CSS custom properties
    carrosselContainer.style.setProperty('--dynamic-background-color', currentRegionStyle.background);
    carrosselContainer.style.setProperty('--dynamic-box-shadow', currentRegionStyle.boxShadow);
    carrosselContainer.style.setProperty('--dynamic-text-color', currentRegionStyle.color); // Nova variável para a cor do texto
    // carrosselContainer.style.setProperty('--dynamic-image-shadow-color', currentRegionStyle.imageShadow); // Removido
}

// Eventos para os botões
nextButton.addEventListener("click", () => {
    indiceAtual = (indiceAtual + 1) % imagens2.length;
    atualizarCarrossel();
});

prevButton.addEventListener("click", () => {
    indiceAtual = (indiceAtual - 1 + imagens2.length) % imagens2.length;
    atualizarCarrossel();
});

// Inicializa com a primeira imagem
atualizarCarrossel();


document.addEventListener('DOMContentLoaded', () => {
    const mapaDiv = document.getElementById('mapa');
    const zoomMapBtn = document.getElementById('zoomMapBtn');

    zoomMapBtn.addEventListener('click', () => {
        mapaDiv.classList.toggle('zoomed');
    });
});