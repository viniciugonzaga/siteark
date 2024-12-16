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


const imageData = [
    
    {
        src: "imagens/maia_mascara_dourada.webp",
        title: "Os Maias",
        desc: "Antigamente uma das civilizações mais numerosas e poderosas da ilha, os Maias agora são apenas um eco de sua antiga glória.Com poucos sobreviventes restantes, este povo mantém viva sua fé inabalável em seus deuses, especialmente em Quetzal, a Serpente Voadora, divindade do ar e do sol. Acreditam que Quetzal controla a chuva e regula os raios solares ao mover as nuvens pelo céu, protegendo-os das forças naturais e guiando-os para o equilíbrio.A lenda mais sagrada entre os Maias é a do Espelho da Profecia, uma visão compartilhada por seu antigo mestre antes de sua morte. A profecia diz que quando o sol 'levantar e descansar no topo da pedra'o Caminho da Verdade será revelado, permitindo ao povo atravessar o deserto de areia ao sul da ilha — um território inexplorado e misterioso que dizem esconder segredos de eras antigas. Atualmente, os Maias habitam os Campos de Ouro, uma região isolada e reluzente, longe do tumulto e da política das outras tribos da ilha. De lá, protegem sua cultura e crenças a qualquer custo, chegando até mesmo a sequestrar aqueles que ousam desafiar seus deuses ou ameaçar seu povo. Apesar de viverem à margem, sua influência é temida, e histórias de sua devoção e habilidades espirituais percorrem toda a ilha, deixando claro que os Maias, embora reduzidos em número, ainda são uma força a ser respeitada. 'Quando o sol levantar e descansar no topo da pedra, o caminho da verdade será revelado.'Uma promessa, uma esperança, e a última chama de um povo determinado a sobreviver."
    },
    {
        src: "imagens/gladius_icon.webp",
        title: "Império Gladius",
        desc: "O Império Gladius foi o primeiro grande império formado pelos humanos que apareceram na ilha, unidos por um objetivo comum: ascender e escapar do ciclo eterno da ilha. Sua fundação foi marcada por conquistas e batalhas contra outras tribos iniciais, mas o império logo enfrentou uma das maiores crises de sua história.Após uma guerra devastadora contra as tribos rivais, o Império Gladius mergulhou em um período de seca e fome, que levou seu povo à beira da destruição. Sem matéria-prima ou alimento suficiente para sustentar a população e suas feras, o caos se espalhou entre os humanos. Foi nesse momento que as divisões começaram a surgir.Em busca de sobrevivência, parte do povo se alinhou aos elfos, formando alianças para enfrentar a crise. Contudo, os mais fiéis às crenças do império recusaram-se a se render, firmando uma divisão clara entre os chamados 'verdadeiros gladiadores' e os 'fracos e desesperados'.A chegada do imperador marcou uma nova era para o Império Gladius. Ele reconstruiu a facção, roubando recursos dos elfos e recrutando traidores para enfraquecer a Legião dos Elfos. Esse movimento culminou na brutal Guerra dos 100 Dias, um confronto marcado por traições e derramamento de sangue. No entanto, os elfos emergiram vitoriosos, derrotando o império.Após a derrota, o imperador deixou a ilha, mas seu filho assumiu o trono. Agora, ele tenta unificar os fragmentos do Império Gladius e dominar a ilha, com a esperança de desvendar os segredos da ascensão dos elfos e reivindicar o destino que um dia foi prometido ao império."
    },
    {
        src: "imagens/antigos icone.webp",
        title: "Os Caídos",
        desc: "Os Caídos são uma civilização tão antiga quanto o próprio Ark, testemunhas de todas as tribos e facções que já surgiram e desapareceram ao longo do tempo. No entanto, eles perderam algo essencial: sua própria identidade. Movidos por um desejo insaciável de entender o propósito de sua existência e o significado da ascensão, decidiram mudar sua abordagem: não buscaram apenas ascender, mas compreender o porquê desse ciclo eterno. Para preservar o vasto conhecimento que acumulavam, os Caídos desenvolveram maneiras únicas de guardar sua essência. Eles extraíam suas origens e consciências em cristais especiais, que registravam não apenas informações, mas também as memórias e sentimentos de seu povo. Esse avanço possibilitou aos Caídos manipular seu próprio código genético, prolongando suas vidas e sobrevivendo a eras inteiras. Ao longo dos séculos, os Caídos identificaram padrões em cada novo ciclo de ascensão, percebendo que o ciclo sempre reiniciava após o surgimento de uma nova civilização. Essa repetição incessante levou-os a uma corrupção gradual, causada pelas inúmeras mudanças em suas próprias estruturas físicas e mentais. Eles começaram a perder sua humanidade, tornando-se algo que mal podia ser reconhecido como o povo que um dia foram. Na tentativa de preservar o que restava de sua essência, os Caídos criaram templos sagrados, onde registravam seus conhecimentos nas paredes. Para guardar suas histórias e memórias, desenvolveram um método peculiar: derretiam os corpos de seus mortos, misturando-os com o elemento que permeava a ilha. Esses líquidos, guardados por protetores em cada templo, tornaram-se uma forma de perpetuar sua existência, mesmo após a degradação de sua humanidade. Hoje, os Caídos são pouco mais do que pedras gravadas com contos e histórias, e seus templos, embora cobertos por poeira e esquecidos pelo tempo, ainda guardam segredos profundos sobre o ciclo do Ark. Seus cristais e registros permanecem como um testemunho silencioso de uma civilização que tentou compreender o porquê, mas acabou sendo consumida pelo tempo e pela própria busca."
    },
    {
        src: "imagens/icone_elfos.PNG",
        title: "Os Elfos",
        desc: "Os Elfos surgiram como uma das facções mais estruturadas e estrategicamente habilidosas do Ark, despontando lado a lado com o Império Gladius. Desde seu início, destacaram-se por sua organização política e disciplina militar, adotando um sistema de governo que valorizava alianças estratégicas e eficiência no cumprimento de objetivos. Com uma cultura profundamente ligada ao conhecimento e à sobrevivência, os Elfos não apenas se tornaram uma força militar formidável, mas também excelentes negociadores e estrategistas. Suas habilidades em combate, aliadas a uma visão clara de seus propósitos, tornaram-nos peças-chave na balança de poder da ilha. Eles não desejavam ascender, como outras tribos, mas sim encontrar uma maneira de retornar à sua terra natal, além dos confins do Ark. A descoberta mais significativa feita pelos Elfos veio com a exploração da Ilha da Caveira, onde encontraram uma alternativa arriscada à ascensão. Essa alternativa prometia uma possível fuga da ilha, mas desafiava os limites de sua existência. Apesar dos riscos, os Elfos estavam dispostos a arriscar tudo para alcançar sua liberdade. A rivalidade entre os Elfos e os Gladius culminou na Guerra dos Cem Dias, uma das batalhas mais devastadoras da história do Ark. Apesar da resistência feroz do Império Gladius, os Elfos saíram vitoriosos, consolidando sua posição como uma das facções mais poderosas da ilha. Após sua vitória, os Elfos voltaram seus esforços para explorar as misteriosas nascentes da Ilha da Caveira, locais onde acreditavam residir o segredo de sua fuga. No entanto, após adentrarem essas terras sombrias, nunca mais foram vistos. Seus registros e memórias foram perdidos ao longo do tempo, deixando apenas vestígios de sua cultura espalhados pela ilha. Hoje, os Elfos são uma lembrança distante, uma lenda sussurrada entre as tribos remanescentes, que ainda buscam entender os mistérios deixados para trás"
    },
    {
        src: "imagens/Raça orc antiga_icone.PNG",
        title: "Os Morgoths",
        desc: "Toda rosa linda tem seu veneno.' Os Morgoths nasceram das sombras de um passado sombrio, um legado macabro deixado pelos eventos da Guerra dos Cem Dias. Originalmente Elfos, eles foram capturados e aprisionados nos porões de guerra do Império Gladius, onde o sofrimento e a negligência moldaram sua transformação. Esquecidos no subterrâneo, longe da luz do sol e da esperança, esses Elfos evoluíram, ou melhor, decadiram, tornando-se algo completamente diferente. Sem comida suficiente, sem água limpa e sem a promessa de resgate, os Elfos prisioneiros foram lentamente sucumbindo à insanidade. A escuridão moldou suas mentes e corpos, fazendo-os mais pálidos, mais fortes e insensíveis à dor. Com os recursos tão escassos, eles passaram a alimentar-se de si mesmos, bebendo o sangue e devorando a carne dos mais fracos, tudo em nome da sobrevivência. Foi nesse ambiente de desespero que abandonaram sua identidade original e se autodenominaram Morgoths, que significa 'os Orcs dos Antigos Dias'. O ódio por aqueles que os aprisionaram e o desejo de vingança os consumiu, e sua humanidade (ou elficidade) foi completamente apagada, substituída por uma ferocidade animalesca e insaciável. Enquanto os Morgoths se organizavam em meio à loucura, surgiu um líder: o General Morgoth, um dos prisioneiros mais resilientes e astutos. Em uma demonstração de força absoluta, ele matou seu próprio pai — o último elo que ainda o conectava à sua antiga vida como Elfo — e assumiu o comando da tribo. Ele era, nas palavras dos sobreviventes, um leão em meio a cães famintos, liderando seu povo com uma combinação de brutalidade e inteligência. Após se libertarem dos porões, os Morgoths iniciaram uma rebelião sangrenta, mas sua existência como facção ativa foi breve.  Tornaram-se pálidos, resistentes à dor, e completamente insanos devido às condições brutais de confinamento e à prática de canibalismo. Um ódio ardente contra todos que os fizeram sofrer, transformando-os em uma força de destruição e caos. 'Nas trevas, onde a luz nunca chega, e o ódio é a única chama, nasce um novo predador — um leão entre cães famintos, pronto para devorar o mundo."
    }
    
];
  
function changeContent(index) {
    const mainImage = document.getElementById("mainImage");
    const imageTitle = document.getElementById("imageTitle");
    const imageDescription = document.getElementById("imageDescription");
  
    // Atualiza a Imagem, Título e Descrição
    mainImage.src = imageData[index].src;
    imageTitle.textContent = imageData[index].title;
    imageDescription.textContent = imageData[index].desc;
}

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
;
// Array com as fontes a serem alternadas
const fontes = [
    'Optima, sans-serif',
    'Times, Times New Roman, serif',
    'Courier New, monospace',
    'Snell Roundhand, cursive'
];

let indiceFonte = 0; // Começa no índice 0

// Função para alternar as fontes
function trocarFonte() {
    const h2Element = document.getElementById("tituloSecundario"); // Seleciona o h2
    h2Element.style.fontFamily = fontes[indiceFonte]; // Aplica a fonte atual

    // Atualiza o índice para a próxima fonte, retornando ao início quando chegar ao fim
    indiceFonte = (indiceFonte + 1) % fontes.length;
}

// Chama a função a cada 3 segundos
setInterval(trocarFonte, 1000);
