
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
        footer.style.background = "linear-gradient(45deg, #755c08a4,#7c5102c4,#795e09a4)"; // Altera a cor do rodapé
    } else {
        footer.style.background = "linear-gradient(45deg, #755c08a4,#7c5102c4,#795e09a4)"; // Mantém a cor padrão
    }
});



// Dados dos Dinossauros
const dinossauros = {
    "dino1": {
        nome: "Heressauro",
        especie: "Tirek",
        imagem: "imagens/dino1.jpg",
        vida: 120,
        armadura: 40,
        funcao: "Predador furtivo ",
        valorVida: "Couro 2",
        valorDano: "Mordida 2",
        classe: "Camaleão"
    },
    "dino2": {
        nome: "Mariposa",
        especie: "Butterfly",
        imagem: "imagens/dino2.jpg",
        vida: 200,
        armadura: 85,
        funcao: "Voador Estratégico",
        valorVida: "Couro 3",
        valorDano: "Mordida 4",
        classe: "Mariposa"
    },
    "dino3": {
        nome: "Purlovia",
        especie: "Cacau",
        imagem: "imagens/dino3.jpg",
        vida: 140,
        armadura: 70,
        funcao: "Predador Furtivo",
        valorVida: "Couro 2",
        valorDano: "Mordida 3",
        classe: "Camaleão"
    },
    "dino4": {
        nome: "Trike",
        especie: "Lewall",
        imagem: "imagens/dino4.jpg",
        vida: 240,
        armadura: 240,
        funcao: "Tanque de Chifres",
        valorVida: "Couro 4",
        valorDano: "Mordida 3",
        classe: "Rinoceronte"
    },
    "dino5": {
        nome: "Dodô",
        especie: "Grupo Grande",
        imagem: "imagens/dino5.jpg",
        vida: 35,
        armadura: 0,
        funcao: "Galinha de Ovos",
        valorVida: "Couro 1",
        valorDano: "Mordida 0",
        classe: "Galinha"
    },
    
    // Adicione mais dinossauros aqui conforme necessário
};

function openModal(dinoID) {
    const dino = dinossauros[dinoID];
    document.getElementById("dino-nome").textContent = dino.nome;
    document.getElementById("dino-especie").textContent = dino.especie;
    document.getElementById("dino-imagem").src = dino.imagem;
    document.getElementById("dino-funcao").textContent = dino.funcao;
    document.getElementById("dino-vida").textContent = dino.vida;
    document.getElementById("valorVida").textContent = dino.valorVida;
    document.getElementById("valorDano").textContent = dino.valorDano;
    document.getElementById("classe").textContent = dino.classe;
    document.getElementById("dino-armadura").textContent = dino.armadura;
    document.getElementById("modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function filtrarDinossauros() {
    const termoPesquisa = document.getElementById("pesquisa").value.toLowerCase();
    const dinossaurosElementos = document.querySelectorAll(".npc");
    dinossaurosElementos.forEach(dino => {
        const nome = dino.querySelector("h2").textContent.toLowerCase();
        dino.style.display = nome.includes(termoPesquisa) ? "block" : "none";
    });
}

// Conteúdo dinâmico para cada ícone
const contents = [
    {
      titulo: "Dodô ou Esquilo",
      texto: "A classe de Dodô ou Esquilo possui a função básica de ajudar a preparar o campo de batalha para os demais dinossauros dos jogadores, forncendo 1 de gota de sangue.",
      gif: "imagens/feras1_icon.jpeg",
      background: "imagens/feras1_icon.jpeg",
    },
    {
      titulo: "Cão ou Labrador",
      texto: "A classe Cão ou Labrador possui a função de revelar as cartas da equipe inimiga, prevendo a próxima jogada a seguir a partir de quando são colocadas para lutar, além de poderem andar livremente um espaço para o lado, tanto para a direita ou esquerda (São 4 espaços básicos por jogo).  ",
      gif: "imagens/feras2_icon.jpeg",
      background: "imagens/feras2_icon.jpeg",
    },
    {
      titulo: "Lebre ou Coelho",
      texto: "A classe Lebre ou Coelho possui a funcão de ser mais ágil que as outras cartas, podendo atacar alvos que estão voando em todas as rodadas e defender ataques do céu, além de andar para qualquer espaço no tabuleiro por rodada.",
      gif: "imagens/feras3_icon.jpeg",
      background: "imagens/feras3_icon.jpeg",
    },
    {
      titulo: "Alce ou Veado",
      texto: "A classe de Alce ou Veado possui a função de tentar atordoar inimigos que estão no chão, sempre que atacarem uma carta inimiga na rodada (1d2) para decidir se a carta é atordoada ou não, além de poderem andar 1 espaço para o lado do tabueleiro, mais sempre que for decidio o lado dessa carta, somente andará esse lado até ser morta ou retirada do campo de batalha (Tabuleiro)",
      gif: "imagens/feras4_icon.jpeg",
      background: "imagens/feras4_icon.jpeg",
    },
    {
      titulo: "Camaleão ou Raposa",
      texto: "A classe Camaleão ou Raposa possui a função de atacar as cartas do inimigo de forma furtiva, sempre que for colacada em campo pode ficar furtiva e atacar qualquer outra carta em seu turno, tanto aéreo ou áquatico. além de quando esta furtiva causa +2 pontos de mordida ",
      gif: "imagens/feras5_icon.jpeg",
      background: "imagens/feras5_icon.jpeg",
    },
    {
        titulo: "Jacaré ou Crocodilo",
        texto: "A classe Jacaré ou Crocodilo possui a função de causar dano e anular dano por se esconder na água, quando ataca uma carta inimiga pode se esconder na água e não receba dano, sendo assim a carta que está na frente causa dano na água e não na criatura. ",
        gif: "imagens/feras6_icon.jpeg",
        background: "imagens/feras6_icon.jpeg",
      },
      {
        titulo: "Tubarão ou Peixe",
        texto: "A classe Tubarão ou Peixe tem a funcão de causar dano, anular dano por se esconder na água, álem de causar sangramento nas cartas que atingiu, sendo 1 ponto de couro (vida) por rodada. ",
        gif: "imagens/feras7_icon.jpeg",
        background: "imagens/feras7_icon.jpeg",
      },
      {
        titulo: "Borboleta ou Mariposa",
        texto: "A classe Borboleta ou Mariposa tem a função de imobilizar inimigos com seus ataques, podendo deixar cartas inimigas paradas, anulando qualquer habilidade ou passiva de movimentação, além de ser aéreo, sempre desviando de danos terrestres e áquaticos convencionais aos da carta inimiga, assim não recebendo dano. ",
        gif: "imagens/feras8_icon.jpeg",
        background: "imagens/feras8_icon.jpeg",
      },
      {
        titulo: "Vespa ou Abelha ",
        texto: "A classe Vespa ou Abelha tem a funcão de enfraquecer inimigos com seus ataques, causando dano com ataques diretos e diminuindo o potencial de mordida da carta em 2. Além de serem aéreos, desviando de ataques convecionais terrestres e aquáticos. ",
        gif: "imagens/feras9_icon.jpeg",
        background: "imagens/feras9_icon.jpeg",
      },
      {
        titulo: "Águia ou Coruja",
        texto: "A classe Águia ou Coruja tem a função de revelar as cartas do inimigo, prevendo sua próxima jogada quando for colacada em campo, álem de poder escolher uma carta de uma criatura da tribo qualquer, não precisando pegá-la chamando de forma convecional",
        gif: "imagens/feras10_icon.jpeg",
        background: "imagens/feras10_icon.jpeg",
      },
      {
        titulo: "Rinoceronte ou Javali",
        texto: "A classe ",
        gif: "imagens/feras11_icon.jpeg",
        background: "imagens/feras11_icon.jpeg",
      },
      {
        titulo: "Elefante ou Hipopótamo",
        texto: "A classe ",
        gif: "imagens/feras12_icon.jpeg",
        background: "imagens/feras12_icon.jpeg",
      },
      {
        titulo: "Lobo ou Leopardo",
        texto: "A classe ",
        gif: "imagens/feras13_icon.jpeg",
        background: "imagens/feras13_icon.jpeg",
      },
      {
        titulo: "Coiote ou Hiena ",
        texto: "A classe ",
        gif: "imagens/feras14_icon.jpeg",
        background: "imagens/feras14_icon.jpeg",
      },
      {
        titulo: "Urso ou Gorila",
        texto: "A classe ",
        gif: "imagens/feras15_icon.jpeg",
        background: "imagens/feras15_icon.jpeg",
      },
      {
        titulo: "leão ou Tigre",
        texto: "A classe ",
        gif: "imagens/feras16_icon.jpeg",
        background: "imagens/feras16_icon.jpeg",
      },
      {
        titulo: "Dinossauro ou Dragão",
        texto: "A classe ",
        gif: "imagens/feras17_icon.jpeg",
        background: "imagens/feras17_icon.jpeg",
      },
      {
        titulo: "Hidra ou Ser mitológico",
        texto: "A classe ",
        gif: "imagens/feras18_icon.jpeg",
        background: "imagens/feras18_icon.jpeg",
      },
      {
        titulo: "Behemoth ou golem",
        texto: "A classe ",
        gif: "imagens/feras19_icon.jpeg",
        background: "imagens/feras19_icon.jpeg",
      },
      {
        titulo: "Leviatã ou Divindade",
        texto: "A classe ",
        gif: "imagens/feras20_icon.jpeg",
        background: "imagens/feras20_icon.jpeg",
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