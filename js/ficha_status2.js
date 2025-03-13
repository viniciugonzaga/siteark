
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
    "titulo": "Dodô ou Esquilo",
    "texto": "A classe Dodô ou Esquilo tem a função básica de preparar o campo de batalha para os demais dinossauros dos jogadores, fornecendo 1 gota de sangue.",
    "gif": "imagens/feras1_icon.jpeg",
    "background": "imagens/feras1_icon.jpeg"
  },
  {
    "titulo": "Cão ou Labrador",
    "texto": "A classe Cão ou Labrador tem a função de revelar as cartas da equipe inimiga, prevendo a próxima jogada assim que são colocadas para lutar. Além disso, podem mover-se livremente um espaço para a direita ou esquerda (o tabuleiro possui 4 espaços básicos por jogo).",
    "gif": "imagens/feras2_icon.jpeg",
    "background": "imagens/feras2_icon.jpeg"
  },
  {
    "titulo": "Lebre ou Coelho",
    "texto": "A classe Lebre ou Coelho é mais ágil que as demais, podendo atacar alvos que estão voando em todas as rodadas. Além disso, pode se mover para qualquer espaço no tabuleiro por rodada.",
    "gif": "imagens/feras3_icon.jpeg",
    "background": "imagens/feras3_icon.jpeg"
  },
  {
    "titulo": "Alce ou Veado",
    "texto": "A classe Alce ou Veado tem a função de tentar atordoar inimigos no solo sempre que atacar uma carta inimiga (1d2 para determinar o atordoamento). Se bem-sucedido, o inimigo não poderá agir por 1 rodada. Além disso, pode mover-se 1 espaço para o lado no tabuleiro, mas, uma vez escolhido o lado, essa carta só poderá se mover nessa direção até ser eliminada ou retirada do campo de batalha.",
    "gif": "imagens/feras4_icon.jpeg",
    "background": "imagens/feras4_icon.jpeg"
  },
  {
    "titulo": "Camaleão ou Raposa",
    "texto": "A classe Camaleão ou Raposa ataca furtivamente. Ao ser colocada em campo, pode entrar em furtividade e atacar qualquer carta em seu turno, seja aérea ou aquática. Quando furtiva, causa +2 pontos de dano em sua mordida.",
    "gif": "imagens/feras5_icon.jpeg",
    "background": "imagens/feras5_icon.jpeg"
  },
  {
    "titulo": "Jacaré ou Crocodilo",
    "texto": "A classe Jacaré ou Crocodilo tem a função de causar dano e se esconder na água para evitar dano convencional(Aquático). Ao atacar, pode mergulhar, tornando-se imune a ataques diretos até seu próximo turno.",
    "gif": "imagens/feras6_icon.jpeg",
    "background": "imagens/feras6_icon.jpeg"
  },
  {
    "titulo": "Tubarão ou Peixe",
    "texto": "A classe Tubarão ou Peixe tem a função de causar dano e se esconder na água para evitar ataques (Aquático). Além disso, provoca sangramento nos inimigos atingidos, reduzindo 1 ponto de couro (vida) por rodada.",
    "gif": "imagens/feras7_icon.jpeg",
    "background": "imagens/feras7_icon.jpeg"
  },
  {
    "titulo": "Borboleta ou Mariposa",
    "texto": "A classe Borboleta ou Mariposa pode imobilizar inimigos com seus ataques, impedindo-os de se mover ou ativar habilidades passivas. Sendo uma criatura aérea, desvia de ataques convencionais terrestres e aquáticos.",
    "gif": "imagens/feras8_icon.jpeg",
    "background": "imagens/feras8_icon.jpeg"
  },
  {
    "titulo": "Vespa ou Abelha",
    "texto": "A classe Vespa ou Abelha enfraquece os inimigos com seus ataques, reduzindo seu dano de mordida em 2 pontos. Por serem aéreas, evitam ataques convencionais terrestres e aquáticos.",
    "gif": "imagens/feras9_icon.jpeg",
    "background": "imagens/feras9_icon.jpeg"
  },
  {
    "titulo": "Águia ou Coruja",
    "texto": "A classe Águia ou Coruja revela as cartas do inimigo, prevendo sua próxima jogada ao ser colocada em campo. Por serem aéreas, evitam ataques convencionais terrestres e aquáticos. Além disso, pode escolher e trazer para o campo uma carta de uma criatura da tribo, sem precisar seguir os métodos convencionais de invocação.",
    "gif": "imagens/feras10_icon.jpeg",
    "background": "imagens/feras10_icon.jpeg"
  },
  {
    "titulo": "Rinoceronte ou Javali",
    "texto": "A classe Rinoceronte ou Javali pode atordoar um inimigo ao ser colocada em campo, podendo ser terrestre ou aquático, impedindo sua ação por 1 rodada. Além disso, sempre que sofre dano convencional de outra carta inimiga, causa 1 ponto de dano como contra-ataque.",
    "gif": "imagens/feras11_icon.jpeg",
    "background": "imagens/feras11_icon.jpeg"
  },
  {
    "titulo": "Elefante ou Hipopótamo",
    "texto": "A classe Elefante ou Hipopótamo atua como tanque, podendo bloquear o primeiro ataque recebido ao ser colocado em campo. Ele pode se mover sempre em direção a uma carta inimiga que esteja atacando sua tribo e pode atuar em ambientes aéreo, aquático e terrestre.",
    "gif": "imagens/feras12_icon.jpeg",
    "background": "imagens/feras12_icon.jpeg"
  },
  {
    "titulo": "Lobo ou Leopardo",
    "texto": "A classe Lobo ou Leopardo causa dano contínuo ao aplicar sangramento em seus ataques, reduzindo 1 ponto de vida do inimigo a cada rodada. Também pode se mover 1 espaço para qualquer lado no tabuleiro.",
    "gif": "imagens/feras13_icon.jpeg",
    "background": "imagens/feras13_icon.jpeg"
  },
  {
    "titulo": "Coiote ou Hiena",
    "texto": "A classe Coiote ou Hiena tem a função de se aproveitar de cartas inimigas que já foram eliminadas. Caso uma carta dessa classe esteja em uma coluna onde outra carta inimiga morreu, ela ganha 1 ponto de vida para cada carta eliminada nessa coluna. Além disso, podem ser colocadas em campo caso uma carta aliada morra, desde que estejam na mão do jogador e a carta eliminada não seja dessa classe.",
    "gif": "imagens/feras14_icon.jpeg",
    "background": "imagens/feras14_icon.jpeg"
  },
  {
    "titulo": "Urso ou Gorila",
    "texto": "A classe Urso ou Gorila tem a função de causar dano de forma bruta. Quando são colocadas em campo, ganham +1 ponto de dano para cada carta de médio porte no tabuleiro. Além disso, sempre que eliminam uma carta inimiga, ganham 1 ponto de vida por devorá-la.",
    "gif": "imagens/feras15_icon.jpeg",
    "background": "imagens/feras15_icon.jpeg"
  },
  {
    "titulo": "Leão ou Tigre",
    "texto": "A classe Leão ou Tigre tem a função de aumentar o dano dos aliados e reduzir o dano dos inimigos. Sempre que são colocadas em campo, podem rugir. Se estiverem em menor número que os inimigos, aumentam 1 ponto de dano para todas as cartas aliadas no tabuleiro. Se estiverem em maior número, diminuem 1 ponto de dano de todas as cartas inimigas. Além disso, sempre que eliminam uma carta inimiga, ganham 1 ponto de dano por devorá-la e aumentar a adrenalina na batalha.",
    "gif": "imagens/feras16_icon.jpeg",
    "background": "imagens/feras16_icon.jpeg"
  },
  {
    "titulo": "Dinossauro ou Dragão",
    "texto": "A classe Dinossauro ou Dragão tem a função de causar dano e eliminar alvos rapidamente. Quando atacam uma carta inimiga pela primeira vez, podem agarrá-la e causar dano de fraqueza, reduzindo 2 pontos do potencial de mordida (dano) e imobilizando-a, impedindo que a carta inimiga se mova. Além disso, sempre podem se deslocar 1 espaço para qualquer lado do tabuleiro e atacar cartas voadoras normalmente.",
    "gif": "imagens/feras17_icon.jpeg",
    "background": "imagens/feras17_icon.jpeg"
  },
  {
    "titulo": "Hidra ou Ser Mitológico",
    "texto": "A classe Hidra ou Ser Mitológico tem a função de causar dano constante em uma coluna. Sempre que é colocada em campo, pode incendiar ou envenenar a coluna. Assim, qualquer carta inimiga que estiver naquela coluna recebe 2 pontos de dano por rodada. Além disso, são criaturas aéreas e sempre que eliminam uma carta inimiga, ganham 1 ponto de vida por devorá-la e 1 ponto de potencial de mordida por aumentarem a adrenalina na batalha.",
    "gif": "imagens/feras18_icon.jpeg",
    "background": "imagens/feras18_icon.jpeg"
  },
  {
    "titulo": "Behemoth ou Golem",
    "texto": "A classe Behemoth ou Golem tem a função de bloquear qualquer tipo de dano. No início de cada rodada, a tribo pode escolher qual tipo de dano essa carta vai bloquear: aéreo, aquático ou terrestre. Além disso, ela pode se mover automaticamente em direção a qualquer carta inimiga que esteja atacando diretamente a tribo e não outra carta.",
    "gif": "imagens/feras19_icon.jpeg",
    "background": "imagens/feras19_icon.jpeg"
  },
  {
    "titulo": "Leviatã ou Divindade",
    "texto": "A classe Leviatã ou Divindade tem a função de afogar um alvo e causar dano brutal. Sempre que é colocada em campo, a tribo pode escolher uma carta inimiga para afogar. Cartas afogadas ficam imobilizadas, sangram e não podem atacar, a menos que sejam aquáticas. Caso sejam aquáticas, perdem 2 pontos de potencial de mordida. Além disso, sendo uma criatura aquática, esta carta ganha 2 pontos de dano por adrenalina na batalha caso a carta afogada seja eliminada.",
    "gif": "imagens/feras20_icon.jpeg",
    "background": "imagens/feras20_icon.jpeg"
  }
   
  ];
  
  // Função para alterar o conteúdo
  function changeContent(index) {
    const content = contents[index - 1];
    document.getElementById("titulo").textContent = content.titulo;
    document.getElementById("texto").textContent = content.texto;
    document.getElementById("gif").src = content.gif;
    document.getElementById("imagem-fundo").src = content.background;
  }