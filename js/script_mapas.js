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
    "../imagens/icon_mapa_atov3.png"

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
    { src: "../imagens/campos_de_ouro.PNG", texto: "Os Campos de Ouro são uma vasta região de terra fértil, considerada a mais rica da ilha, onde as estações do ano favorecem o crescimento de uma vegetação exuberante. A terra é perfeita para a vida, sendo permeada por vilas e pequenas cidades povoadas por diversos povos, que se beneficiam dos recursos abundantes. Os herbívoros prosperam nesse ambiente, desde os de tamanho menor até os maiores, que se alimentam e se multiplicam rapidamente. A região também é lar de predadores médios, que caçam o que está disponível, sem especialização. Sua fertilidade atrai animais de outras partes da ilha, em busca de abrigo e alimento durante as mudanças sazonais. Minérios e rochas preciosas estão espalhados pela terra e montanhas, escondendo ruínas e cavernas que guardam mistérios antigos. Ao sul, um deserto desconhecido estende-se como uma barreira inexplorada, enquanto a floresta fechada, que se estende mais ao norte, serve de refúgio para animais maiores, que se protegem da presença dos predadores de lagos e riachos, especializados na pesca de peixes e nas águas das regiões mais isoladas.", titulo: "Campos de Ouro" },
    { src: "../imagens/condado.PNG", texto: " O Condado é uma terra de paz e serenidade, dominada por vastas planícies e praias douradas, onde a vegetação litorânea floresce sob o céu aberto. Em contraste, uma floresta calma abriga predadores silenciosos, geralmente ativos à noite, enquanto os herbívoros adaptaram-se, com couraças mais espessas ou maior maturidade, para resistir aos perigos. As montanhas do condado, ricas em metais preciosos, são repletas de grandes aves, cujos cânticos ecoam pela região. O ambiente é marcado por uma melancolia sutil, onde as praias vazias dão a sensação de solidão, e as estrelas parecem observar cada movimento. Ao norte, uma floresta dominada por artrópodes gigantes é um lugar evitado por todos, devido aos mistérios de uma cidade perdida, escondida nas profundezas dessa vegetação escura e abandonada, a qual ninguém ousa explorar, nem mesmo os mais corajosos.", titulo: "Condado" },
    { src: "../imagens/Pinheiros.PNG", texto: "A Floresta de Pinheiros é uma imensa e selvagem região repleta de biodiversidade, onde altas árvores e vegetação densa abrigam uma variedade de animais, desde mamíferos e répteis ágeis até grandes herbívoros. Enquanto o ambiente oferece abrigo e alimento para muitas espécies, também esconde perigos para os menores, que devem enfrentar armadilhas naturais e predadores astutos. A paisagem varia: ao norte, o clima frio abriga uma ilha de herbívoros e riquezas minerais; ao sul, vastos campos favorecem a caça de predadores velozes; e no sudeste, um reino autoritário impõe a ideia de que os fracos estão destinados à derrota.", titulo: "Floresta dos Pinheiros" },
    { src: "../imagens/Ilha_da_caveira.png", texto: "A Ilha da Caveira é um lugar isolado e inóspito, afastada de qualquer rota comum e envolta por uma densa névoa que dificulta a aproximação. Suas águas são traidoras, repletas de criaturas desconhecidas, muitas das quais são verdadeiros monstros marinhos, prontos para devorar qualquer intruso que ouse se aproximar. Esta ilha é um território endiabrado, onde a morte permeia todos os cantos. Quem ousa pisar em suas praias nunca retorna. A fauna local é composta por predadores cruéis, acostumados a devorar tudo o que veem pela frente, com uma predileção particular por humanos, que são considerados as presas mais fáceis. As criaturas que habitam a ilha são fora dos padrões normais, gigantes e poderosas, com habilidades adaptadas tanto para o ataque quanto para a defesa. Pilhas de ossos e restos de carne se acumulam em várias partes da ilha, lembrando a carnificina que ali ocorre constantemente. Carniceiros e aproveitadores vagam pelas cavernas, em busca de qualquer oportunidade para saquear ou caçar. A ilha é repleta de cavernas e túneis, muitos deles contendo minérios únicos, que atraem aqueles que buscam riquezas. Também existem túneis secretos que conectam a ilha a vilarejos orcs e, segundo rumores, há passagens tão grandes que podem até ligar a Ilha da Caveira a outras ilhas, fazendo dela um ponto estratégico de trevas e mistérios.", titulo: "Ilha da Caveira" },
    { src: "../imagens/Norte.PNG", texto: "O Norte Frio é uma terra implacável, onde uma tempestade de neve constante esconde uma paisagem de gelo seco e pedras congeladas. As montanhas cobertas de neve se erguem como colossos, com picos de gelo e espinhos formando barreiras naturais em cada entrada de caverna, criando um labirinto perigoso. No coração desse deserto gelado, a temperatura extrema torna a sobrevivência impossível sem as adaptações necessárias: todas as criaturas, desde os predadores grandes e pacientes até os herbívoros gigantes, possuem penas ou pelos espessos para suportar o frio feroz. Os rastros de sangue são frequentemente encontrados, vestígios das caçadas impiedosas que ocorrem nas cavernas, onde os animais inteligentes formam grupos para tirar proveito das presas mais vulneráveis. As montanhas, ocupadas por corujas, golens e aves de rapina, aguardam o momento certo para atacar. O grande predador que caminha pelo deserto gelado é temido por todos, uma força imparável que percorre o território à procura de suas próximas vítimas. Ao sul, um pântano misterioso se estende, repleto de flores e ervas medicinais, mas infestadas de crocodilos, cobras, sapos e insetos gigantes, tornando a travessia um desafio mortal para quem ousa se aventurar por essa região infestada.", titulo: "Norte Frio" },
    { src: "../imagens/bosque_antigo.PNG", texto: "O Bosque Antigo é uma região selvagem dominada por um imponente Rei Leão e marcada pela presença de um vulcão ativo. O ambiente hostil é composto por campos de pedregulho, vegetação rasteira e uma fauna feroz, onde superpredadores lutam diariamente pelo domínio, enquanto herbívoros sobrevivem em bandos ou por agilidade. A gritaria das batalhas ecoa pela terra, criando um cenário de constante tensão. Ao Sudoeste, uma ilha cercada por mata fechada abriga animais que acumulam galhos para moldar os caminhos dos rios, oferecendo um contraste de estratégia em meio à brutalidade do bosque. É um território implacável, governado pela força e pela astúcia.", titulo: "Bosque Antigo" },
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
    const warSession = document.querySelector('.war-session');
    const titleEl = document.getElementById("warTitle");
    const textEl = document.getElementById("warText");
    const iconsEl = document.getElementById("warIcons");
    const prevArrow = document.getElementById("prevWar");
    const nextArrow = document.getElementById("nextWar");

    

    // Definições de cores para cada tema de guerra
    const warThemes = {
        "Guerra dos 100 dias": {
            primary: "193, 240, 248", // Azul claro (RGB)
            secondary: "143, 216, 228", // Azul médio (RGB)
            text: "#E6FAFF", // Cor do texto azul claro
            shadow: "rgba(193, 240, 248, 0.6)",
            border: "rgba(193, 240, 248, 0.8)",
            backgroundStart: "rgba(10, 10, 10, 0.98)",
            backgroundEnd: "rgba(20, 20, 20, 0.95)",
            iconBorder: "rgba(193, 240, 248, 0.8)",
            iconGlow: "rgba(193, 240, 248, 0.7)",
        },
        "Dia Sangrento": {
            primary: "255, 100, 100", // Vermelho claro (RGB)
            secondary: "220, 70, 70", // Vermelho médio (RGB)
            text: "#FFDADA", // Cor do texto vermelho claro
            shadow: "rgba(255, 100, 100, 0.6)",
            border: "rgba(255, 100, 100, 0.8)",
            backgroundStart: "rgba(30, 0, 0, 0.98)", // Fundo mais escuro/avermelhado
            backgroundEnd: "rgba(50, 0, 0, 0.95)",
            iconBorder: "rgba(255, 100, 100, 0.8)",
            iconGlow: "rgba(255, 100, 100, 0.7)",
        },
        "Desastre de Laboratório": {
            primary: "100, 255, 100", // Verde claro (RGB)
            secondary: "70, 220, 70", // Verde médio (RGB)
            text: "#DAFFDA", // Cor do texto verde claro
            shadow: "rgba(100, 255, 100, 0.6)",
            border: "rgba(100, 255, 100, 0.8)",
            backgroundStart: "rgba(0, 30, 0, 0.98)", // Fundo mais escuro/esverdeado
            backgroundEnd: "rgba(0, 50, 0, 0.95)",
            iconBorder: "rgba(100, 255, 100, 0.8)",
            iconGlow: "rgba(100, 255, 100, 0.7)",
        },
        "Chamas do Mar": {
            primary: "255, 150, 50", // Laranja/Marrom (RGB)
            secondary: "220, 120, 40", // Laranja/Marrom médio (RGB)
            text: "#FFEDDC", // Cor do texto laranja/marrom claro
            shadow: "rgba(255, 150, 50, 0.6)",
            border: "rgba(255, 150, 50, 0.8)",
            backgroundStart: "rgba(50, 20, 0, 0.98)", // Fundo mais escuro/avermelhado-marrom
            backgroundEnd: "rgba(70, 30, 0, 0.95)",
            iconBorder: "rgba(255, 150, 50, 0.8)",
            iconGlow: "rgba(255, 150, 50, 0.7)",
        },
         "Guerra das Colinas de Ferro": {
            primary: "255, 230, 0",       // Amarelo vibrante (RGB)
            secondary: "255, 200, 0",     // Amarelo médio (RGB)
            text: "#FFEDDC",             // Cor do texto marrom escuro/amarelado (contraste com o amarelo)
            shadow: "rgba(255, 230, 0, 0.6)", // Sombra amarela
            border: "rgba(255, 230, 0, 0.8)", // Borda amarela
            backgroundStart: "rgba(50, 45, 0, 0.98)", // Fundo mais escuro/amarronzado
            backgroundEnd: "rgba(70, 60, 0, 0.95)",   // Fundo um pouco mais claro/amarronzado
            iconBorder: "rgba(255, 230, 0, 0.8)", // Borda do ícone amarela
            iconGlow: "rgba(255, 230, 0, 0.7)",   // Brilho do ícone amarelo
        },
    };

    
       const wars = [
  {
    title: "Guerra dos 100 dias",
    text: "A Guerra dos 100 Dias foi um conflito devastador entre os Gladius e os Elfos, motivado por disputas territoriais no sul do Norte Frio, uma região de clima gelado e pantanoso. Os Gladius, conhecidos por sua impaciência e força bruta, avançavam em linha reta, confiantes em seu número superior e em suas armaduras de ouro. No entanto, sua falta de treinamento tático e a dependência de montarias tornavam suas formações vulneráveis. Os Elfos, mestres em emboscadas, utilizavam arcos e espadas mágicas, criando flechas que podiam atravessar armaduras. Suas estratégias de guerra eram projetadas para maximizar a eficácia dos ataques, utilizando o terreno a seu favor e contando com animais treinados como aliados. O conflito começou quando os Gladius invadiram florestas sagradas dos Elfos, que responderam com ataques rápidos e letais. A batalha se intensificou, com os Elfos desferindo ataques coordenados e desgastando as forças Gladius. A impaciência dos Gladius se tornava evidente, e suas formações se desintegravam sob a pressão dos Elfos. Politicamente, a guerra refletia tensões internas nos Gladius, que enfrentavam divisões e instabilidade sob a liderança de Shao Kahn. Ao final do conflito, os Gladius foram forçados a recuar, enquanto os Elfos consolidaram seu domínio e fortaleceram alianças com outras civilizações. A vitória dos Elfos não foi apenas uma questão de força, mas de estratégia e adaptação, marcando um importante capítulo na história do Ark.",
    icons: ["../imagens/gladius_icon.jpg", "../imagens/elfos_icon.jpg"]
  },
  {
    title: "Dia Sangrento",
    text: "O Natal deveria ser um momento de celebração para os Gladius, mas o Dia Sangrento transformou-se em um pesadelo. A antiga capital, adornada para o Festival da Colheita de Inverno, foi atacada pela Companhia Escarlate, que se infiltrou entre os cidadãos. Quando os sinos da meia-noite tocaram, o caos se instaurou: veneno foi misturado ao vinho, e assassinos eliminaram guardas e nobres em um ataque brutal. Shao Kahn, o rei, tentou liderar a resistência contra a rebelião, mas seu povo estava devastado pela crueldade da Companhia Escarlate. O Barão, líder dos rebeldes, enfrentou Shao Kahn em um combate feroz. A batalha se dividiu entre os comandantes leais ao rei e os membros da Escarlate. Com sorte e habilidade, Shao Kahn conseguiu vencer o Barão, mas saiu gravemente ferido, perdendo a visão e muito sangue. Apesar da vitória, a rebelião causou estragos irreparáveis. Metade dos camponeses foi morta, e os estoques de comida foram destruídos. A chegada de guardas de outros acampamentos e forças de casas aliadas ajudou a conter a rebelião, mas o custo foi alto: um rei cego e um exército reduzido. Após o Dia Sangrento e a Guerra dos 100 Dias, a capital Gladius foi reconstruída sob a liderança de um novo chefe, que buscou um acordo com os Iberus para restaurar a ordem. A colaboração entre as duas civilizações trouxe esperança em meio à devastação, mas as cicatrizes do passado ainda assombravam os Gladius, lembrando-os de que a paz é frágil e pode ser facilmente destruída.",
    icons: ["../imagens/icone_sorriso.png", "../imagens/gladius_icon.jpg",]
  },
  {
    title: "Desastre de Laboratório",
    text: "Nas profundezas da Caverna de Cristal, os Precursores realizavam experimentos com um híbrido biológico, combinando DNA de criaturas abissais. Quando a criatura escapou de seu tanque, iniciou um massacre devastador, caçando os Sirênicos em suas fortalezas subaquáticas. Os Sirênicos, inicialmente alheios ao perigo, começaram a encontrar cadáveres de seus guerreiros. Quando a criatura atacou a cidade-estado de Atlantarca, a destruição foi imensa. Os magos arcanos, em um esforço desesperado, conseguiram banir a criatura para a Ilha da Caveira, onde se acredita que ela tenha morrido. No entanto, o Feiticeiro Mórdeo, irmão de Gandalf, ficou gravemente afetado pela batalha, com marcas permanentes em seu corpo: um de seus chifres foi quebrado, e sua pele tornou-se enrugada e morta. Após esses eventos, os Sirênicos desapareceram de suas ruínas e casas, com todos mortos ou fugindo, resultando na extinção de sua honra e população. Os magos retornaram para cuidar de Mórdeo, enquanto os Precursores ignoraram o desastre e mudaram-se para outra instalação, deixando para trás os vestígios de sua ambição e destruição.",
    icons: ["../imagens/sirênios_icon.jpg", "../imagens/precursor.jpg"]
  },
  {
    title: "Chamas do Mar",
    text: "A Guerra das Chamas do Mar foi um conflito devastador que marcou a ilha e suas civilizações, resultando de tensões acumuladas entre os Maias e os Ceifadores. Os Maias, com sua rica cultura e domínio do arcano, buscavam proteger sua terra e seus valores, enquanto os Ceifadores, liderados pela figura mítica de Flame Heart, lutavam pela sobrevivência e liberdade, desprezando alianças e acordos. Após a Guerra dos Cem Dias, os Maias formaram a Lenda do Véu como uma defesa contra os Ceifadores, permitindo que seus comandantes lutassem em batalhas táticas no mar. A guerra se desenrolou em um embate naval, onde os Maias usaram seu poder arcano e manipulação dos elementos naturais, enquanto os Ceifadores empregaram o medo como arma, utilizando um Megalodon e outros grandes animais marinhos para intimidar seus inimigos. O conflito culminou em um empate, com o navio do capitão dos Maias sendo destruído e o capitão dos Ceifadores morto. Durante a guerra, ambos os lados se abstiveram de envolver outras civilizações, resultando em uma batalha isolada que ficou conhecida como a Marcação das Bandeiras. As civilizações de todo o Ark foram forçadas a escolher um lado, ou se tornariam inimigas. Os vestígios da guerra agora são visíveis nas memórias dos soldados, que ainda acreditam na chama eterna e sonham em recuperar o Burning Blade, o navio perdido dos Ceifadores. Após a destruição, os Maias se estabeleceram em um novo refúgio no deserto quente ao sul da ilha, enquanto os Ceifadores continuaram a defender sua fé e conceito de vida. Atualmente, ambos os lados permanecem em um estado de tensão, aguardando que a iniciativa venha de algum lugar. As forças e líderes de cada lado continuam a crescer, prontos para um novo confronto que poderá decidir o futuro da ilha e de suas civilizações.",
    icons: ["../imagens/maias_icon.jpg",  "../imagens/icon_ceifadores.png"]
  },
  {
    title: "Guerra das Colinas de Ferro",
    text: "A Guerra das Colinas de Ferro eclodiu entre o Império sobre a Montanha, formado por anões, e os orcs liderados pelo General Pálido. Os anões, conhecidos por sua coragem, enfrentaram dificuldades devido à falta de táticas adequadas e paciência em combate. Armados com machados e martelos, eles avançavam sem estratégia, enquanto os orcs utilizavam arcos com flechas envenenadas e montarias ferozes, como Ravagers e tigres, para atacar de longe enquantos se deslocavam rápidamente. A batalha foi longa e desgastante, culminando em um duelo decisivo entre o Rei dos Anões e o General Pálido, que resultou na morte do rei e na fuga de muitos anões, abandonando a fortaleza repleta de recursos. Com a fortaleza desprotegida, os Morgoths, elfos transformados em criaturas insanas, se tornaram os Orcs, elfos caídos depois de uma grande mistura de raças, formando uma aliança sombria. O castelo dos anões tornou-se um símbolo de derrota, e o herdeiro do rei, agora encarregado de reunir os sobreviventes e vingar seu pai, se deparou com o mistério de um castelo vazio. A guerra não apenas resultou na derrota dos anões, mas também na ascensão do império Orc, criando um novo equilíbrio de poder e uma ameaça crescente na região.",
    icons: ["../imagens/icon_anao.jpg",  "../imagens/Orc_icon.PNG"]
  }
    ];

    let currentIndex = 0;

    function applyTheme(theme) {
        warSession.style.setProperty('--current-theme-primary', theme.primary);
        warSession.style.setProperty('--current-theme-secondary', theme.secondary);
        warSession.style.setProperty('--current-theme-text-color', theme.text);
        warSession.style.setProperty('--current-theme-shadow-color', theme.shadow);
        warSession.style.setProperty('--current-theme-border-color', theme.border);
        warSession.style.setProperty('--current-theme-background-start', theme.backgroundStart);
        warSession.style.setProperty('--current-theme-background-end', theme.backgroundEnd);
        warSession.style.setProperty('--current-theme-icon-border', theme.iconBorder);
        warSession.style.setProperty('--current-theme-icon-glow', theme.iconGlow);

        // Aplica o tema aos elementos que não são filhos diretos do .war-session
        // (Eles não herdam diretamente as custom properties do parent se não estiverem no :root)
        // Se as custom properties estiverem no :root, elas serão globais e os elementos poderão usá-las diretamente.
        // Caso contrário, é bom setar diretamente:
        titleEl.style.color = theme.text;
        textEl.style.color = theme.text;
        prevArrow.style.color = theme.secondary;
        nextArrow.style.color = theme.secondary;
    }

    function updateWarDisplay(index) {
        if (!warSession) return;

        const war = wars[index];
        const currentTheme = warThemes[war.title];

        // Se não houver tema definido, usa um fallback ou o tema padrão
        if (currentTheme) {
            applyTheme(currentTheme);
        } else {
            console.warn(`Tema para "${war.title}" não encontrado. Usando tema padrão.`);
            applyTheme(warThemes["Guerra dos 100 dias"]); // Fallback para o tema padrão
        }

        // Adiciona a classe para iniciar a animação de fade-out
        warSession.classList.add('fade-out-content');

        warSession.addEventListener('animationend', function handler(event) {
            if (event.animationName === 'fade-out-blur') {
                warSession.removeEventListener('animationend', handler);

                // Atualiza o conteúdo DOM
                titleEl.textContent = war.title;
                textEl.textContent = war.text;
                iconsEl.innerHTML = ''; // Limpa ícones antes de adicionar novos

                // Adiciona ícones com atraso sequencial
                war.icons.forEach((src, i) => {
                    const img = document.createElement('img');
                    img.src = src; // Caminho completo para a imagem
                    // Assumindo que o alt dos ícones será o mesmo que a chave no iconImageMap
                    // Ex: 'image_fab939.jpg' -> 'Ícone do Cthulhu'
                    // Isso é um ponto que precisa de cuidado: como mapear a URL para o alt TEXTO
                    // Para simplificar, vou usar o src como o identificador temporariamente
                    // O ideal é ter um data-attribute no HTML para o nome do ícone
                    
                    // Exemplo de como você poderia extrair um nome do arquivo se ele for único o suficiente:
                    // const iconFileName = src.split('/').pop(); // Pega 'image_fab939.jpg'
                    // console.log("Checking icon file name:", iconFileName);

                    // Para o mapeamento de fundo, precisamos do 'alt' text exato
                    // Você terá que garantir que o `alt` no HTML corresponda à chave no `iconImageMap`
                    // Exemplo: <img src="image_fab939.jpg" alt="Ícone do Cthulhu">
                    // Por agora, vou usar um valor genérico se alt não estiver definido, ou se preferir, passe o alt aqui.
                    // Ajuste o alt aqui para o valor REAL que você usaria no HTML:
                    img.alt = `Ícone ${i + 1}`; // Temporário. Ajuste isso conforme seu HTML real!
                                                // Se você tem: <img src="image_fab939.jpg" alt="Ícone do Cthulhu">
                                                // Então, aqui seria `img.alt = "Ícone do Cthulhu";`
                                                // Ou melhor, o `wars` array deveria ter o `alt` junto com o `src`
                                                // Por exemplo: icons: [{src: "...", alt: "..."}]

                    // Define a variável CSS para o atraso da animação de entrada
                    img.style.setProperty('--icon-enter-delay', `${0.6 + i * 0.15}s`); // Atraso de 0.15s entre cada ícone
                    
                    // Adiciona os event listeners para a imagem de fundo no hover
                    img.addEventListener('mouseenter', () => {
                        const iconIdentifier = Object.keys(iconImageMap).find(key => iconImageMap[key] === src);
                        // O 'src' do JS deve ser o mesmo que o 'fileName' das imagens upadas
                        if (iconIdentifier) {
                             const imageUrl = getFiles[iconIdentifier].url; // Busca a URL do arquivo no objeto global
                             if (imageUrl) {
                                warSession.style.setProperty('--war-bg-image-url', `url('${imageUrl}')`);
                                warSession.style.setProperty('--war-bg-opacity', '0.1');
                                warSession.style.setProperty('--war-bg-blur', '3px');
                                warSession.style.setProperty('--war-bg-grayscale', '60%');
                                warSession.style.setProperty('--war-bg-brightness', '70%');
                            }
                        } else {
                            console.warn(`Imagem de fundo para ${src} não encontrada no mapeamento.`);
                        }
                    });

                    img.addEventListener('mouseleave', () => {
                        warSession.style.setProperty('--war-bg-opacity', '0');
                        warSession.style.setProperty('--war-bg-blur', '5px');
                        warSession.style.setProperty('--war-bg-grayscale', '80%');
                        warSession.style.setProperty('--war-bg-brightness', '60%');
                    });
                    
                    iconsEl.appendChild(img);
                });

                // Remove a classe fade-out e adiciona fade-in
                warSession.classList.remove('fade-out-content');
                warSession.classList.add('fade-in-content');

                warSession.addEventListener('animationend', function handler2(event2) {
                    if (event2.animationName === 'fade-in-blur') {
                        warSession.classList.remove('fade-in-content');
                        warSession.removeEventListener('animationend', handler2);
                    }
                });
            }
        });
    }

    prevArrow.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + wars.length) % wars.length;
        updateWarDisplay(currentIndex);
    });

    nextArrow.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % wars.length;
        updateWarDisplay(currentIndex);
    });

    // Inicializar com a primeira guerra
    updateWarDisplay(currentIndex);
});
