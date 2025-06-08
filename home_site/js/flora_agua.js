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
        footer.style.background = "linear-gradient(45deg, #090f4994, #0c4f539d,#090f4994)"; // Altera a cor do rodapé
    } else {
        footer.style.background = "linear-gradient(45deg, #0f0c29, #302b63, #24243e)"; // Mantém a cor padrão
    }
});

// Função para mudar o conteúdo
function mudarConteudo(numero) {
    // Títulos para cada container
    const titulos = [
        "Recifes",
        "Áreas vûlcanicas",
        "Labirintos de recife",
        "Recife profundo",
        "Dunas de areia",
        "Caverna de cristal",
        "Berçario",
        "Floretsa de cogumelos",
        "Águas frias",
        "Águas quentes"
    ];

    // Textos para cada container
    const textos = [
        "Os recifes formam um bioma extenso e diversificado, abrigando uma vasta gama de criaturas que prosperam entre os corais vibrantes e variados. Esse ambiente subaquático é rico em minérios preciosos, como pérolas, manganês e calcita, camuflados pela densidade dos corais e formações rochosas submersas. A temperatura é predominantemente quente, mas apresenta leves variações dependendo da profundidade e das correntes oceânicas. Os recifes são um equilíbrio entre beleza e perigo, com uma biodiversidade impressionante que inclui tanto predadores furtivos quanto espécies menores adaptadas à camuflagem e à sobrevivência nesse ecossistema colorido e dinâmico.",
        "As áreas vulcânicas são regiões intensamente quentes, marcadas por solo rochoso e rios de lava que cortam a paisagem. Essas áreas são ricas em minérios como obsidiana, enxofre, hematita e quartzo vulcânico, que revestem as rochas e o terreno instável. O calor extremo cria um ambiente desafiador, mas ideal para criaturas adaptadas a altas temperaturas. Grandes predadores dominam o bioma, atraídos pela abundância de presas e pela energia geotérmica que sustenta a cadeia alimentar. No subsolo, formações de cavernas oferecem abrigos e bolsões de minerais raros, enquanto a superfície exibe um cenário árido e poderoso, onde apenas os mais fortes prosperam.",
        "O Labirinto de Recife é um bioma subaquático complexo e fascinante, composto por intricados caminhos de espirais e arcos formados por corais e rochas, que criam uma atmosfera quase hipnótica, acentuada por aromas naturais que podem desorientar visitantes. Esse ambiente é habitado por espécies ágeis de tubarões e peixes, adaptados para navegar rapidamente pelos corredores estreitos. A vegetação é rica e diversificada, com algas energéticas e fitas biológicas luminescentes que fornecem alto valor nutricional, servindo de alimento para as criaturas locais que dependem desse recurso para sua vitalidade. No fundo, extensas trilhas de areia escondem minérios preciosos, enquanto grandes crustáceos patrulham o terreno, completando a biodiversidade desse bioma enigmático e perigoso.",
        "O Recife Profundo é uma extensão abissal do bioma de recifes, caracterizado por sua escuridão intercalada com a luz hipnotizante da bioluminescência emitida pelas criaturas que habitam essas profundezas. Os animais exibem brilhos variados, desde padrões sutis até explosões vibrantes de cores, usadas tanto para comunicação quanto para atrair presas. Os corais, maiores e mais intricados, são ainda mais exuberantes, com cores intensas que se destacam na escuridão. Eles exalam aromas peculiares que podem causar efeitos variados, como sonolência, confusão ou até aumento de percepção, influenciando o comportamento das criaturas ao redor. Esse ambiente, embora fascinante, é traiçoeiro, com predadores camuflados que usam tanto o brilho quanto os aromas a seu favor, enquanto o fundo do bioma esconde minérios raros e formações cristalinas de valor inestimável.",
        "As Dunas de Areia são um bioma inóspito e traiçoeiro, onde a vida evoluiu para ser silenciosa e furtiva. Criaturas adaptadas a se moverem sob a areia dominam o ambiente, com predadores carniceiros que utilizam biolocalização sonora para detectar qualquer movimento. Peixes rápidos e astutos se destacam entre as presas, enquanto os predadores, extremamente agressivos, governam com força e precisão. Essa região árida e cercada por vastas dunas é um verdadeiro cerco natural à ilha da Caveira, criando uma barreira quase impenetrável onde nada entra ou sai. O ambiente é um palco constante de tensão, onde cada som ou movimento pode significar a diferença entre a sobrevivência e a morte.",
        "As Cavernas de Cristais são profundezas geladas localizadas abaixo do nível do mar, onde a pressão e a escuridão moldaram um ambiente de mistério e riqueza. Suas paredes brilham com minérios preciosos como diamantes, magnetita e uma variedade única de cristais, formando um espetáculo deslumbrante. Esse bioma, no entanto, é também lar de predadores da classe leviatã, criaturas gigantescas adaptadas à escuridão e à pressão extrema, sustentadas por um ecossistema único e profundo. Entre os cristais e formações naturais, estão ruínas imponentes da antiga civilização dos Caídos, estruturas que guardam segredos sobre o passado e despertam a curiosidade de exploradores ousados, mas que também atraem perigos ocultos.",
        "O Berçário é um bioma raro e sagrado, onde diversas espécies aquáticas e terrestres encontram um refúgio seguro para depositar seus ovos. Esse local único exala tranquilidade, com criaturas que normalmente seriam agressivas tornando-se passivas em proteção aos seus ninhos. Rodeado por árvores imponentes, o ambiente é marcado pela presença de água contaminada por Aether, que confere um brilho sobrenatural ao bioma e influencia a flora e fauna ao redor. Os minérios encontrados aqui são igualmente raros, muitas vezes imbuídos de propriedades mágicas devido à influência do Aether. O Berçário é um símbolo de renovação e equilíbrio, mas também um lugar de mistério, protegido por seus habitantes e pelo poder arcano que o permeia.",
        "A Floresta de Cogumelos é uma variante terrestre do Labirinto de Corais, marcada por uma densa concentração de cogumelos gigantes e coloridos. Esses fungos liberam aromas distintos, muitos dos quais provocam alergias ou efeitos únicos nos intrusos, como tontura, sonolência ou até alucinações. O bioma é habitado por uma diversidade de predadores que usam os cogumelos como abrigo, emboscando suas presas enquanto elas tentam navegar por esse ambiente traiçoeiro. Apesar dos perigos, a floresta é fascinante por sua biodiversidade, abrigando espécies adaptadas às condições específicas de um ecossistema dominado por fungos.",
        "O Abismo Frio é um bioma enigmático e desolador, onde o vazio é tanto o maior predador quanto o maior esconderijo. Pequenas criaturas microscópicas e luminosas vagam pelas águas, filtrando nutrientes e sustentando a frágil cadeia alimentar local. Contudo, o verdadeiro terror do abismo reside nos gigantescos leviatãs conhecidos como Fantasmas. Essas criaturas colossais emitem uma luz ofuscante que cega qualquer um que se aproxime, precedendo uma morte rápida e aterrorizante. O ambiente é dominado por um silêncio opressor e uma sensação de isolamento absoluto, tornando o Abismo Frio um dos biomas mais assustadores e inóspitos de toda a região.",
        "O Abismo Quente é uma versão ardente e ainda mais hostil de seu contraparte frio. Nesse bioma, as pequenas criaturas que filtram nutrientes da água desenvolveram adaptações para sobreviver ao calor extremo, criando um ecossistema único nas profundezas. No entanto, o verdadeiro perigo são os Leviatãs Lagosta, predadores gigantescos e vorazes, conhecidos por sua força brutal e comportamento extremamente territorial. Essas criaturas aterrorizantes são implacáveis com qualquer invasor, atacando sem hesitação e transformando o Abismo Quente em um campo de caça mortal. Combinando temperaturas sufocantes, escuridão opressiva e predadores letais, o bioma é um desafio apenas para os mais ousados ou desesperados exploradores."
    
    
    
    ];

    // Imagens para cada container
    const imagens = [
        "imagens/flora_bioma_recife.jpg",
        "imagens/flora_bioma_vulacanico_aquatico.jpg",
        "imagens/flora_aguas.webp",
        "imagens/flora_bioma_recife_profundo.jpg",
        "imagens/flora_bioma_dunas.webp",
        "imagens/flora_bioma_caverna_de_cristal.webp",
        "imagens/flora_biomas_berçario.jpg",
        "imagens/flora_biomas_cogumelos.webp",
        "imagens/biomas_agua_frios.webp",
        "imagens/biomas_agua_quente.webp"
       
    ];

    // Atualiza título, texto e imagem
    document.getElementById("titulo").innerText = titulos[numero - 1];
    document.getElementById("texto").innerText = textos[numero - 1];
    document.getElementById("imagem-conteudo").src = imagens[numero - 1];
}
