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
        footer.style.background = "linear-gradient(45deg, #493d0994, #4948099d,#493d0994)"; // Altera a cor do rodapé
    } else {
        footer.style.background = "linear-gradient(45deg, #0f0c29, #302b63, #24243e)"; // Mantém a cor padrão
    }
});

// Função para mudar o conteúdo
function mudarConteudo(numero) {
    // Títulos para cada container
    const titulos = [
        "Bosques",
        "Campos",
        "Montanhas",
        "Praias",
        "Taiga",
        "Dunas",
        "Pântanos",
        "Minas",
        "Tundra",
        "Bosque frio"
    ];

    // Textos para cada container
    const textos = [
        "Os Bosques são matas fechadas com árvores grandes que criam um dossel contínuo, mantendo o ambiente sombreado. O solo é fértil, favorecendo vegetações em constante competição para capturar os raios solares. Rochas e tocas subterrâneas complementam o ecossistema, abrigando diversas espécies adaptadas à sombra e ao solo rico. Os Bosques são ricos em recursos naturais, com solos férteis que sustentam árvores altas como cedros e samambaias-arbóreas, além de musgos e bromélias que prosperam na sombra. As plantas competem intensamente pela luz solar, enquanto o subsolo abriga depósitos de fósforo, argila e carvão vegetal. Rochas calcárias e cristais de quartzo podem ser encontrados na superfície, assim como tocas subterrâneas que oferecem abrigo para a fauna local. Essa combinação de flora e minerais cria um ecossistema diversificado e dinâmico.",
        "Os Campos são semelhantes a uma savana, com clima quente e semiárido. O ambiente é caracterizado por vegetação de mato alto, poucas árvores espalhadas, terrenos com mistura de terra e areia, e amplas zonas abertas repletas de pedras e rochas. abrigam uma riqueza natural adaptada ao clima semiárido, com depósitos subterrâneos de ferro, cobre e carvão, além de quartzo e sal mineral acumulado pela evaporação dos poucos lagos. Na superfície, sílica e cristais raros podem ser encontrados entre as rochas espalhadas. A vegetação é composta por gramíneas resistentes como o capim-do-cerrado, arbustos espinhosos, árvores como acácias e candelabras, além de plantas como aloe vera e flores do deserto, que florescem após breves períodos de chuva, tornando o bioma diversificado e essencial para a sobrevivência.",
        "As Montanhas são formações de relevo variadas, com grandes altitudes, inúmeras cavernas e encostas rochosas. O terreno é rico em pedras, vinhas e sedimentos, tornando-o um bioma abundante em minérios, mas com vegetação escassa, limitada a plantas resistentes e poucas árvores adaptadas às condições adversas do solo e altitude.São ricas em recursos minerais como ferro, cobre, carvão, quartzo e enxofre, com veios de prata e ouro escondidos em suas profundezas. Na superfície, encontram-se cristais brutos e formações de calcário e mica. A vegetação é limitada, composta por pinheiros anões, liquens e musgos que crescem em rochas, além de vinhas como a hera alpina e arbustos resistentes como a artemísia. Esse bioma é um ambiente inóspito, mas essencial para recursos valiosos.",
        "As Praias são biomas costeiros com extensas faixas de areia, árvores litorâneas e clima quente. O ecossistema prospera com a presença do mar e de rios próximos, que garantem recursos hídricos. A vegetação é abundante devido à baixa competição, e o mar oculta minérios na areia e conchas preciosas, tornando o ambiente diversificado e rico.Oferecem recursos valiosos, como sal mineral, sílica e raras pérolas escondidas nas profundezas do mar ou entre as conchas preciosas espalhadas pela areia. Cristais marinhos e ocasionalmente âmbar podem ser encontrados em cavernas costeiras. A vegetação é rica e variada, com coqueiros, cajueiros e mangueiras prosperando no solo arenoso, enquanto gramíneas costeiras e cactos de praia resistem à salinidade. Manguezais e algas próximas aos rios completam o ecossistema, tornando o bioma um dos mais diversificados e repletos de recursos naturais.",
        "A Taiga é uma vasta floresta repleta de árvores colossais e solo extremamente fértil, enriquecido pelos próprios animais que vagam pelo bioma, espalhando nutrientes através de suas fezes. O ambiente abriga grandes tocas e cavernas, com vegetação composta por arbustos densos e espécies características desse ecossistema. A Taiga também se destaca por sua elevada concentração de âmbar, que pode ser encontrada em várias áreas.A Taiga é um bioma riquíssimo, com grandes depósitos de âmbar espalhados pelo solo fértil e próximo às raízes das árvores colossais, como sequoias e pinheiros gigantes. Cavernas escondem ferro, cobre e cristais naturais, enquanto a superfície apresenta argila e pedras de quartzo. A vegetação é diversificada, com arbustos densos de amora e framboesa, samambaias gigantes e musgos que cobrem o chão, tornando a Taiga um ecossistema vibrante e rico em recursos naturais.",
        "As Dunas são um bioma perigoso e extremamente quente, formado pela sedimentação de ossos, pedras antigas e restos de corpos que a ilha acumulou ao longo do tempo. O solo, rico e peculiar, é repleto de vermes e invertebrados que criam canais e túneis subterrâneos, irrigados por chuvas ocasionais. A região abriga fósseis e corpos fossilizados, além de cavernas e túneis escavados por criaturas locais. A neblina constante, combinada com gases tóxicos, torna o ambiente ainda mais hostil. Na ilha da caveira, o bioma se intensifica com campos magnéticos, alta radiação e uma vegetação selvagem que pode ser fatal.As Dunas abrigam depósitos valiosos de urânio, magnetita e enxofre, encontrados em suas cavernas radioativas e subterrâneos repletos de fósseis minerais. A superfície exibe sal mineral e sílica negra, originados da mistura de ossos e sedimentos antigos. A vegetação é perigosa e traiçoeira, com cactos venenosos, arbustos espinhosos e cogumelos bioluminescentes que prosperam em ambientes tóxicos. Algumas plantas carnívoras gigantes e flores alergênicas completam o cenário hostil, enquanto musgos escuros e fungos necrotóxicos florescem nas áreas subterrâneas, tornando este bioma um verdadeiro desafio para a sobrevivência.",
        "O Pântano é um bioma úmido e melancólico, onde a água estagnada se mistura com lama e vegetação densa. O ambiente é quente e com umidade elevada, criando um solo fértil, mas repleto de perigos como mosquitos, criaturas aquáticas e plantas traiçoeiras. A região é caracterizada por sua vegetação tropical, com árvores altas e arbustos espessos que formam uma cobertura densa, bloqueando a luz. O solo é lamacento e o pântano é preenchido por rios lentos, lagos e pântanos impenetráveis, tornando difícil a navegação.Um bioma rico em recursos como carvão, petróleo e minerais como ferro, cobre e sulfetos encontrados nas profundezas e no solo lamacento. A vegetação é predominantemente aquática, com nenúfares, juncos e lírios d'água cobrindo os lagos e rios lentos, enquanto mangueiras, ciprestes e bromélias dominam o ambiente mais alto e úmido. Plantas carnívoras como sarracênias e dioneias completam a paisagem traiçoeira, criando um ecossistema único onde as criaturas e plantas lutam pela sobrevivência em um ambiente saturado de umidade e mistério.",
        "As Minas são ambientes geralmente já explorados, com vestígios de atividades passadas, como carros de minérios abandonados ou veias de minério não totalmente extraídas. Este bioma é extremamente rico em diversos minérios e minerais, criando uma enorme diversidade geológica e uma variedade de recursos. O solo, muitas vezes fragmentado por escavações, é dominado por fungos e musgos, com algumas vegetações adaptadas ao ambiente escuro e úmido. Embora as plantas grandes sejam raras, algumas podem ser alteradas pela magia arcana, como o cogumelo de sangue, que tem o poder de atrair grandes mamíferos voadores ou invasores, tornando o bioma ainda mais imprevisível e perigoso.As Minas são ricas em uma variedade impressionante de minérios, incluindo carvão, ferro, cobre, ouro e até minerais raros como diamantes, platina e adamantium, que são extraídos de veios profundos e rochas sedimentadas. A presença de cristais de Aether e essência de mana torna este ambiente único, com propriedades mágicas que podem ser manipuladas por aqueles que compreendem o arcano. Este bioma, portanto, combina o potencial mineral com a imprevisibilidade da magia, criando um ambiente ao mesmo tempo fascinante e perigoso.",
        "A Tundra é um bioma frio e árido, caracterizado por extensas planícies cobertas de neve e gelo, com vegetação rasteira e solo permafrost. O clima é severo, com longos invernos e verões curtos e frescos, onde a vegetação se adapta à baixa temperatura e ao solo congelado. A fauna da tundra é adaptada a condições extremas, com animais como raposas árticas, ursos polares e renas. A vegetação é dominada por musgos, líquenes e arbustos baixos, com árvores raras devido ao solo congelado. A tundra também é conhecida por sua paisagem vasta e aberta, onde o vento e a neve são constantes.Um bioma gelado e árido, onde minérios como carvão, ferro, cobre e sal podem ser encontrados nas camadas congeladas do solo, enquanto metais mais raros, como diamantes e platina, aparecem em depósitos profundos. Minerais arcânicos, como cristais de gelo e essência de ártico, também são encontrados, sendo utilizados em magias de congelamento. A vegetação é dominada por musgos, líquenes e arbustos baixos, como o arbusto de baga ártica, que sobrevive às condições extremas. Árvores como o pinheiro siberiano e o cipreste de gelo podem ser encontradas em áreas menos severas, enquanto raízes de gelo e cogumelos de gelo prosperam nas camadas subterrâneas. A tundra, com suas condições extremas, oferece um ecossistema único, onde a adaptação é a chave para a sobrevivência.",
        "O Bosque Frio é uma variação do bioma de floresta, mas com temperaturas extremamente baixas, criando uma paisagem de inverno eterno. As árvores, embora grandes e robustas, são adaptadas para o clima severo, com cascas espessas e folhas perenes que resistem ao frio intenso. O solo é frequentemente coberto por uma camada de neve, com musgos e líquenes crescendo nas sombras das árvores, onde a luz solar é escassa. As águas dos rios e lagos são frequentemente congeladas, e a fauna local é adaptada para sobreviver ao frio, como ursos polares e lobos árticos. A vegetação é escassa e adaptada a sobreviver em condições adversas, competindo por espaços limitados de luz. Os ventos cortantes e a neve constante fazem deste bioma um ambiente desafiador, mas igualmente fascinante.O Bosque Frio, com seu ambiente de gelo eterno, abriga uma rica diversidade de minérios, incluindo carvão, ferro, cobre e sal, encontrados em veios subterrâneos e ao longo de áreas congeladas. Minerais raros, como diamantes, ouro e platina, podem ser extraídos das profundezas, onde a pressão e o tempo criaram depósitos valiosos. Além disso, elementos arcanos como Cristais de Gelo e a Essência de Inverno são comuns em cavernas e fontes mágicas, sendo usados em feitiçarias de gelo e proteção. A vegetação, adaptada a sobreviver nas duras condições do inverno, inclui líquenes de gelo, musgos gelados e arbustos de inverno como o Arbusto de Baga Gelada, que crescem à sombra das grandes árvores resistentes ao frio, como o Pinheiro Ártico e o Cipreste de Gelo. Mesmo no solo congelado, raízes de gelo e cogumelos gelados se expandem, mantendo o ecossistema do bosque vivo e em constante adaptação ao clima rigoroso."
    ];

    // Imagens para cada container
    const imagens = [
        "imagens/terras_bosque.jpg",
        "imagens/terras_campos.webp",
        "imagens/terras_montanhas.jpg",
        "imagens/terras_praias.jpg",
        "imagens/terras_taiga.webp",
        "imagens/terras_dunas.jpg",
        "imagens/terras_pantano.webp",
        "imagens/terras_minas.webp",
        "imagens/terras_tundra.jpg",
        "imagens/terras_bosque_frio.jpg"
       
    ];

    // Atualiza título, texto e imagem
    document.getElementById("titulo").innerText = titulos[numero - 1];
    document.getElementById("texto").innerText = textos[numero - 1];
    document.getElementById("imagem-conteudo").src = imagens[numero - 1];
}
