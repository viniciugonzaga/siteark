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
        footer.style.background = "linear-gradient(45deg, #0f0c29, #302b63, #24243e)"; // Altera a cor do rodapé
    } else {
        footer.style.background = "linear-gradient(45deg, #0f0c29, #302b63, #24243e)"; // Mantém a cor padrão
    }
});

const contents = [
    {
      titulo: "Evento Igneous",
      texto: "Eventos Ígneos são cataclismos devastadores que ocorrem quando uma nova fenda ou vulcão se abre, ou um abalo sísmico atinge a terra, liberando uma onda de lava e dando origem a uma criatura elemental de lava, extremamente poderosa e imprevisível. Esse fenômeno faz com que qualquer ser que morra durante o evento exploda em magma, acelerando a destruição do solo ao redor e tornando a área ainda mais inabitável e perigosa. A terra se funde com o fogo, criando um cenário de caos e desespero, onde a sobrevivência depende não apenas da resistência, mas também da habilidade de lidar com a intensidade e a imprevisibilidade do magma que consome tudo em seu caminho.",
      gif: "imagens/eventos_igneo.jpg",
      background: "imagens/eventos_igneo.jpg",
    },
    {
      titulo: "Evento abismoelétrico",
      texto: "O Evento Abismoelétrico ocorre tanto na água quanto no solo, quando uma tempestade intensa é desencadeada, fazendo com que um raio gigantesco atinja a terra ou o mar e dê origem a uma criatura elemental de choque, nascendo entre as cinzas e relâmpagos. Esse fenômeno agita violentamente o ambiente, com a tempestade seguindo seu caminho e levando a criatura com ela, tornando a região imprevisível e extremamente perigosa. Durante o evento, tudo que morre ganha um bônus de velocidade devido ao forte vento, que acelera o movimento de quem sobrevive e complica ainda mais o caos ao redor. Esse fenômeno altera o equilíbrio da natureza e desafia qualquer sobrevivente a lidar com a energia elétrica e os ventos impetuosos que seguem sua trajetória destrutiva.",
      gif: "imagens/eventos_elétrico.jpg",
      background: "imagens/eventos_elétrico.jpg",
    },
    {
      titulo: "Evento da mortalidade",
      texto: "O Evento da Mortalidade ocorre após uma grande guerra, quando os corpos das vítimas se acumulam em um montão macabro de carne, sob o qual surge uma criatura elemental da morte, presa por correntes. A criatura começa a puxar lentamente todos que estão próximos, atraindo-os para o centro da pilha de cadáveres. Para sobreviver, os indivíduos precisam escapar silenciosamente, sem fazer barulho, pois a criatura só pode ser ferida ao sair da pilha de corpos. A cada morte, a criatura ganha mais poder e vida, tornando-se cada vez mais forte e implacável, enquanto a pressão sobre os sobreviventes aumenta. O ambiente torna-se um campo de tensão constante, onde o menor erro pode significar o fim.",
      gif: "imagens/eventos_morte.webp",
      background: "imagens/eventos_morte.webp",
    },
    {
      titulo: "Evento da caveira",
      texto: "O Evento da Caveira é um fenômeno macabro causado por um ritual falho, que invoca uma criatura elemental da Ilha da Caveira. O combate contra essa criatura é brutal e sanguinário, focado em confrontos corpo a corpo, onde a violência e o derramamento de sangue são constantes. Cada vez que algo morre e sangra, o sangue que se derrama é absorvido pela criatura, fazendo-a evoluir e se tornar ainda mais poderosa e implacável. À medida que o combate se intensifica, a criatura cresce em força e ferocidade, tornando-se uma ameaça ainda mais aterradora, enquanto os sobreviventes precisam lutar desesperadamente para evitar alimentar sua evolução.",
      gif: "imagens/eventos_caveira.webp",
      background: "imagens/eventos_caveira.webp",
    },
    {
      titulo: "Evento tribal",
      texto: "O Evento Tribal é um fenômeno natural devastador, como um tornado ou enchente, que altera profundamente a floresta, mas não é causado por outros eventos. No caos gerado pela destruição, surge uma criatura elemental Hypo, que emerge do campo devastado. Durante esse evento, qualquer ser que morra cria uma área de cura ao redor de seu corpo, proporcionando regeneração para quem estiver dentro dessa zona, o que pode tanto ajudar quanto complicar a sobrevivência, já que essa cura pode atrair criaturas e outros sobreviventes em busca de benefícios. A criatura Hypo, alimentada pelo ambiente alterado, se torna uma ameaça formidável, e enquanto o terreno se recupera, os jogadores devem lidar com a constante pressão de decidir se irão explorar ou evitar os locais de cura, sabendo que o perigo pode estar ao virar da esquina.",
      gif: "imagens/eventos_tribal.jpg",
      background: "imagens/eventos_tribal.jpg",
    },
    {
      titulo: "Evento de drops",
      texto: "O Evento de Drops ocorre aleatoriamente, quando cápsulas caem do céu ou do mar, espalhando itens valiosos por todo o mapa. Essas cápsulas podem conter desde itens raros e comuns até ovos de criaturas aleatórias, oferecendo grandes vantagens para quem conseguir resgatá-las. Os drops do mar são mais raros, tornando-os ainda mais cobiçados e perigosos de alcançar, já que podem estar localizados em áreas remotas ou sob forte guarda de criaturas. Esse evento cria uma corrida constante entre os sobreviventes, que devem decidir entre enfrentar os riscos para conquistar os itens poderosos ou esperar que os outros façam o trabalho sujo.",
      gif: "imagens/eventos_drops.webp",
      background: "imagens/eventos_drops.webp",
    },
    {
      titulo: "Evento de aether",
      texto: "O Evento de Aether acontece exclusivamente na estação de Aether, onde uma mega criatura híbrida emerge das profundezas da praia e começa a percorrer a ilha, implacável e voraz, até se cansar. Essa criatura, uma devoradora de almas, essências e vidas, mata tudo o que encontra pelo caminho, destruindo seres vivos e deixando um rastro de esquecimento. Tudo o que morre nas proximidades da criatura é completamente apagado da memória da ilha, como se nunca tivesse existido. Sua presença é um pesadelo para os sobreviventes, que devem evitar seu caminho a todo custo, pois não só suas vidas estão em risco, mas também suas identidades e legados, que podem desaparecer sem deixar vestígios.",
      gif: "imagens/evento_aether.jpeg",
      background: "imagens/evento_aether.jpeg",
    },
   
  ];
  
  // Função para alterar o conteúdo
  function changeContent(index) {
    const content = contents[index - 1];
    document.getElementById("titulo").textContent = content.titulo;
    document.getElementById("texto").textContent = content.texto;
    document.getElementById("gif").src = content.gif;
    document.getElementById("imagem-fundo").src = content.background;
  }
