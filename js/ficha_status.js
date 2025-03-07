
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

let npcAtual = "";

// Senhas pré-definidas para cada NPC
const senhas = {
    "npc1": "trono",
    "npc2": "Deus",
    "npc3": "Favela",
    "npc4": "Dodô",
    "npc5": "Droga",
    "npc6": "Amigo",
    "npc7": "Eva",

};

// Dados dos NPCs
const npcs = {
    "npc1": {
        nome: "Thormond",
        imagem: "imagens/npc1_brok.jpg",
        historia: "Thormond era o terceiro filho da linhagem dos anões, uma família grande e respeitada, com irmãos, primos distantes e muitas gerações que se espalhavam pelas vastas montanhas gélidas do norte da Floresta dos Pinheiros. Seu pai, o grande rei, governava a montanha mais rica e fria da região, um lugar onde seu povo prosperava através da forja de itens raros e da mineração de preciosos minérios. A força e a destreza dos anões eram admiradas por todas as civilizações ao redor, que os viam como mestres em seu ofício. No entanto, tudo mudou quando a batalha nas estradas de ferro, contra os orcs e outras forças unidas, trouxe a queda do rei. A derrota foi devastadora, e a montanha que antes era o coração pulsante de seu povo se tornou um símbolo de derrota. Com a morte do rei, a confiança foi abalada e os anões perderam o foco. O povo, desmotivado e com os ânimos fragilizados, se dispersou. A montanha gélida, que um dia fora um local de prosperidade, agora estava nas mãos dos Gladius, um grupo cruel e implacável que dominava a região. Thormond, o último herdeiro legítimo da linhagem real, viu-se sozinho. Seus irmãos, seus primos e todos aqueles a quem ele confiara seu futuro desapareceram: mortos em um trágico acidente no mar. A confiança de Thormond na possibilidade de reconquistar a grande montanha e restaurar o legado de sua família foi testada até seus limites. Ele sabia que sua única chance de salvar o que restava de seu povo repousava sobre seus ombros. E, agora, com os olhares agressivos de seu novo povo, que o aguardava com desesperança e desconfiança, Thormond precisava provar que ainda era capaz de conduzir sua linhagem à grandeza perdida.",
        acoes: ["+15 construir, +15 mecânica civil, +10 esquiva, +10 esculpir, +10 crime, +10 saquear, +10 peso criminoso, +10 organização de planta residêncial, +10 formação, +10 construção primal, +5 construção industrialziada, +10 construção de muros, + 5 luta, +5 percpeção, +5 furtividade, +5 reclaamr, +5 força bruta, +5 pontaria, +5 indentificação de minério, +5 sobrevivência, +5 pensar em construção.    "],
        mutacao: "Raiva Anã: Quando Thormond está com raiva faz todas as construções com +5 em testes de vig, for, int, além de aumentar a vida máxima e a rigidez da cosnrução em 1 nivel de resistência. Pode usar pontos de esforço em suas construções, para adicionar vida ou + dados no teste.",
        classes: "Construtor, Sobrevivente ",
        agilidade: 2,
        forca: 3,
        inteligencia: 3,
        sobrevivencia: 5,
        vigor: 4,
        status: "Vida: 100, Determinação/Sanidade: 90, Existência/Resistência: 30, Fôlego: 7, Armadura: 15",
       
    },
    "npc2": {
        nome: "Dante",
        imagem: "imagens/npc2_dante.jpg",
        historia: " Dante sempre foi um garoto curioso, fascinado pelos mistérios da fé e das escrituras. Criado sob a rigidez de pais devotos, teve sua infância moldada por orações e disciplina, mas a guerra não esperou ele crescer. Ainda menino, foi arrancado de casa e enviado aos campos de batalha na Guerra do Paraguai, onde aprendeu a sobreviver antes mesmo de entender a vida. Cresceu entre trincheiras e cadáveres, estudando livros de anatomia e religião nos raros momentos de paz, buscando entender tanto os limites da perfeição humana quanto os segredos ocultos da fé. Aprendeu a manejar armas e tratar feridas, tornando-se um médico improvisado no campo de batalha. À noite, sob a luz das fogueiras, ensinava outros soldados a ler e escrever, acreditando que o conhecimento era a única dádiva que a guerra não poderia roubar. Mas nada o preparou para o dia em que viu crianças como ele serem mortas sem piedade. Tomado pela raiva, Dante tirou a vida de um homem, e naquele momento, compreendeu o peso do pecado. Chorou, não pelo inimigo, mas por si mesmo. Naquela noite, jurou que jamais mataria novamente. Se a guerra queria sua alma, que tomasse tudo, mas ele não derramaria mais sangue. Então, veio o impossível. Ao abrir os olhos, não estava mais no campo de batalha. O céu era diferente, o ar estranho, e nada ao seu redor fazia sentido. De alguma forma, despertara em um novo mundo, onde a sobrevivência era a única certeza. Agora, ao lado de um grupo de desconhecidos, Dante se agarrava à sua promessa, disposto a protegê-los sem recorrer à violência, pois, mesmo diante do desconhecido, ainda acreditava que poderia salvar alguém — nem que, para isso, tivesse que enfrentar o próprio julgamento dos pecados.   ",
        acoes: ["+15 medicina, +15 cura arcana, +15 tratamento de feridas, +15 cirurgia de remoção de balas, +10 pontaria, +10 correr, +10 diplomacia, +10 psicologia, +10 ler, +10 diplomata, +10 área da educação, +10 religião, +5 furtividade, +5 esquiva, +5 reflexo, +5 contra-ataque, +5 identificação de veneno, +5 sobrevivência, +5 pensar em grupo."],
        mutacao: "Dádiva de Deus: Pode usar uma benção arcana de cura que acumula de acordo com os dias da semana, sendo +1 (d20) de cura para cade que dia passa, onde o último dia é o dia de descanso, voltando a contagem de cura. Sesu despertar provoca um efeito que quebra o espelho entre a divisão do que é alma e corpo, podendo reviver todo alvo que passar do estado morrendo próximo ao dante por 1 rodada.",
        classes: "Sobrevivente, Curandeiro ",
        agilidade: 2,
        forca: 2,
        inteligencia: 4,
        sobrevivencia: 3,
        vigor: 2,
        status: "Vida: 70, Determinação/Sanidade: 115, Existência/Resistência: 20, Fôlego: 5, Armadura: 5",
      
    },

};

function openModal(npcId) {
    npcAtual = npcId;
    document.getElementById("modalSenha").style.display = "flex";
}

function fecharModal() {
    document.getElementById("modalSenha").style.display = "none";
}

function verificarSenha() {
    const senhaDigitada = document.getElementById("senha").value;
    if (senhas[npcAtual] === senhaDigitada) {
        abrirFicha(npcAtual);
        fecharModal();
    } else {
        alert("Senha incorreta!");
    }
}

function abrirFicha(npcId) {
    const npc = npcs[npcId];

    document.getElementById("npcNome").innerText = npc.nome;
    document.getElementById("npcImagem").src = npc.imagem;
    document.getElementById("npcHistoria").innerText = npc.historia;
    document.getElementById("npcMutacao").innerText = npc.mutacao;
    document.getElementById("npcClasses").innerText = npc.classes;
    document.getElementById("npcStatus").innerText = npc.status;
    document.getElementById("npcAcoes").innerHTML = npc.acoes.map(acao => `<li>${acao}</li>`).join("");
    
    document.getElementById("npcAgilidade").innerText = npc.agilidade;
    document.getElementById("npcForca").innerText = npc.forca;
    document.getElementById("npcInteligencia").innerText = npc.inteligencia;
    document.getElementById("npcSobrevivencia").innerText = npc.sobrevivencia;
    document.getElementById("npcVigor").innerText = npc.vigor;
    
    document.getElementById("modalFicha").style.display = "flex";
}

function fecharFicha() {
    document.getElementById("modalFicha").style.display = "none";
}
