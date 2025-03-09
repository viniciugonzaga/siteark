
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
    "npc1": "Trono",
    "npc2": "Deus",
    "npc3": "Vingança",
    "npc4": "Irmão",
    "npc5": "Adrenalina",
    "npc6": "Amigo",
    "npc7": "Eva",
    "npc8": "Aurora",
    "npc9": "ganância",
    "npc10": "Domador",
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
    "npc3": {
        nome: "Capitão",
        imagem: "imagens/npc3_capitao.jpg",
        historia: "A favela nunca dorme. Entre vielas estreitas e becos abafados, Vicent cresceu como o mais novo de três irmãos. Seu mundo era um tabuleiro de poder, onde clãs armados ditavam as regras e cada esquina era um campo de batalha silencioso. Aprendeu cedo que a justiça era um conceito frágil, moldado pelo peso do chumbo e pelo corte da navalha. Seu irmão e sua irmã mais velhos eram sua fortaleza, sua única certeza. Juntos, driblavam a fome, escapavam da mira de fuzis e sonhavam com um futuro onde não precisassem correr. Mas sonhos na favela costumam ser curtos. Numa noite de aço e pólvora, o clã inimigo veio sem aviso. O barulho dos tiros ecoou como trovões sem chuva, e quando a poeira assentou, Vicent estava sozinho. Seu sangue, seu lar, sua família, tudo arrancado pelo ódio de uma guerra que nunca seria dele. A dor virou propósito. Armado com a fúria dos que não têm mais nada a perder, Vicent caçou os assassinos com a precisão de um predador. Cada traiçoeiro tombou diante de sua fúria, cada bala carregava um nome. Mas vingança não preenche o vazio, só o expande. Quando os corpos jaziam no chão e os gritos cessaram, ele percebeu que sua luta precisava ser maior. Guiou sua comunidade como um líder, ergueu os que ainda podiam ser salvos. Trouxe ordem ao caos, ergueu mãos cansadas para que empunhassem ferramentas em vez de fuzis. Mas o passado nunca solta suas presas, e Vicent sabia que ali, seu tempo estava contado. Foi para o exército, trocando a guerra das ruas pela disciplina das fileiras. Aprendeu a lidar com armas que nunca imaginou, a lutar de formas que nunca sonhou. Mas a favela ainda pulsava em seu peito, lembrando-o de onde veio e de tudo que perdeu. E agora, em outra terra, em uma nova missão, ele segue adiante. Não importa onde a batalha o leve, pois dentro de si carrega o eco de tiros distantes e os sussurros de sua família perdida. A favela nunca o deixou. E nunca deixará.",
        acoes: ["+15 percepção, +15 tática, +15 criação primal, +15 sobrevivência, +15 analisar alvo, +15 percepção de inimigos, +15 furtividade, +10 pontaria, +10 corte, +10 luta, +10 contra-ataquel, +10 combinações primais, +10 escalar, + 10 correr, +10 esquiva, + 10 reflexo, +5 arremesso, +5 identificação, +5 veneno, +5 preparar ação. "],
        mutacao: "Alvos de Guerra: Capitão pode olhar para o céu e perceber a localização de todos os alvos inimigos próximos mesmos furtivos, sabendo sua localização e mostrando para seus aliados. Cada alvo localziado fica marcado somente para o capitão. (1 vez por dia). Possui uma grande intolerância a pessoas e traições na tribo de aliados, ficando obcecado pelo alvo. ",
        classes: "Sobrevivente, Atirador",
        agilidade: 3,
        forca: 2,
        inteligencia: 3,
        sobrevivencia: 4,
        vigor: 2,
        status: "Vida: 70, Determinação/Sanidade: 120, Existência/Resistência: 20, Fôlego: 5, Armadura: 5",
      
    },
    "npc4": {
        nome: "Guga",
        imagem: "imagens/npc4_guga.jpg",
        historia: "Guga era um jovem apaixonado por culinária até ser tragado por uma fenda arcana junto com seu irmão. Ao despertar, descobriu-se transformado em um dodô em uma ilha misteriosa. Com sua mente intacta e memória perfeita, aprendeu a sobreviver, misturando ingredientes e criando rações arcanas. Seguindo pegadas, percebeu que seu irmão também estava ali, mas agora como um lagarto. Determinado a encontrá-lo e entender o que aconteceu, Guga usa sua astúcia para navegar pelos perigos do Ark, enfrentando criaturas e mistérios que desafiam a própria realidade.",
        acoes: ["+15 cozinhar, +15 artes, +15 lembrar, +10 fazer rações, +10 elaborar rações, +10 junção arcana de ingredientes, +10 primeira impressão de comida, +10 identificação Arcana de ingredientes, +10 em mainipular Arcano, +5 correr, +5 luta, +5 reflexo, +5 esquiva, +5 furtividade, +5 pensar, +5 sentidos"],
        mutacao: "Atencioso como uma Galinha: Guga ao ficar em perigo ganha +5 em todas as ações que forem de proteção ou fuga própria para fugir ou correr. álem disso  pode gravar e lembrar exatamente de cenários e cenas em, sua cabeça como simbolos ou lugares.",
        classes: "Sobrevivente, Arcano",
        agilidade: 2,
        forca: 1,
        inteligencia: 4,
        sobrevivencia: 3,
        vigor: 2,
        status: "Vida: 70, Determinação/Sanidade: 115, Existência/Resistência: 20, Fôlego: 5, Armadura: 5",
      
    },
    "npc5": {
        nome: "Octane",
        imagem: "imagens/npc5_ocatne.jpg",
        historia: "Obcecado por adrenalina, Octane criou uma droga extrema que alterou seu corpo, permitindo-lhe produzir misturas químicas que aumentam sua velocidade e reflexos. Porém, sem certos nutrientes, ele entra em torpor profundo. Acordando misteriosamente no Ark, Octane viu o ambiente hostil como um novo desafio. Entre saltos impossíveis e fugas alucinantes, aprendeu a usar sua velocidade para sobreviver. Agora, busca ingredientes raros para aprimorar suas misturas e continuar correndo—porque para ele, parar nunca foi uma opção.",
        acoes: ["+15 correr, +15 esquiva, +15 resistência, +15 equilíbrio, +15 contra-ataque, +15 em dança reversa, +15 dança, +15 em escalar, +10 em salto, +10 em acrobacia, +10 em usar drogas, +10 indentificar drogas, +10 fazer drogas, +10 resiliência,  +10 luta, +10 reflexo, +10 impacto, +10 combo, +5 desarmar, +5 agarrão, +5 percepção, +5 sobrevivência, +5 pensar de forma radical, +5 radical, +5 duvidar,  "],
        mutacao: "Mistura de Drogas : Octane pode usar compostos e misturas de drogas formadas e fabricadas a partir de seu corpo, tendo que se alimentar de certos nutrientes ou ervas para formar seus compostos, caso tenha uma alimentação faltando em poucos dias, ele fica com efeitos de narcolepsia, aumentando o torpor ao máximo por um tempo. Mais pode usar esses compostos de forma natural, sempre com o efeito Ágil, caso ejete de forma excessiva ou apressada, pode converter torpor em  dano ou o acertos por 1 rodada. (3 vezes por dia).",
        classes: "Sobrevivente, Guerreiro",
        agilidade: 5,
        forca: 2,
        inteligencia: 1,
        sobrevivencia: 2,
        vigor: 3,
        status: "Vida: 85, Determinação/Sanidade: 70, Existência/Resistência: 25, Fôlego: 6, Armadura: 5",
      
    },
    "npc6": {
        nome: "Dito",
        imagem: "imagens/npc6_dito.jpg",
        historia: "Dito estava andando tranquilamente na floresta, quando encontrou um treinador pokémon, após tentar ser capturado, saiu correndo e foi pego ao mesmo tenmpo por 2 pokébolas, não sabendo qual seria seu caminho apareceu no ark, onde possui várias criaturas e amigos para copiar.",
        acoes: ["+15 copiar, +15 imitar, +15 transformar, +15 criar forma arcana, +15 controle de células, +10 em empatia, + 10 em medicina, +10 isca, +10 intimidação, +10 escalar, +10 entrar, +10 pulo, +10  social, +10 primeira impressão, +5 fugir, +5 luta, +5 reflexo, +5 esquiva, +5 furtividade, +5 diplomacia, +5 suporte. "],
        mutacao: "Cópia de Criaturas: Dito pode copiar criaturas e seres que ele veja, podendo usar suas habilidades e características, porém não pode copiar a mesma criatura por 1 dia, e não consegue causar nenhum tipo de dano, mutação ou efeito da criatura, apenas os atributos e forma física, sendo mais visual.",
        classes: "Arcano, médico",
        agilidade: 3,
        forca: 1,
        inteligencia: 2,
        sobrevivencia: 3,
        vigor: 3,
        status: "Vida: 85, Determinação/Sanidade: 95, Existência/Resistência: 25, Fôlego: 6, Armadura: 5",
      
    },
    "npc7": {
        nome: "Wall-E",
        imagem: "imagens/npc7_Wall-E.jpg",
        historia: "Antes de chegar ao Ark, Wall-Le era um engenheiro dedicado, especializado em robótica e inteligência artificial. Trabalhando para uma grande corporação, ele passou anos desenvolvendo máquinas autônomas para exploração e construção. No entanto, sua ética começou a entrar em conflito com os interesses de seus superiores, que desejavam usar suas criações para fins militares. Em um dia Wall-E encontrou uma outra máquina que sentia o mesmo que ele, desejava o mesmo principio que Wall-E queria mostrar, após marcar um encontro entre eles em uma floresta coberta pela lua e céu estrelado, Wall-E esperou por horas, enquanto lembrava de como ela se movia, falava e agia, sua carcaça branca bela como a luz da lua. Se Wall-E fosse um humano aceitaria que estaria apaixonado, mas s recusa a pensar como seus superiores com medo de pensar igual a eles. Depois de esperar e pensar em maneiras de ajudar essa máquina ou robô, procurou ela no caminho até se perder na floresta e perceber que não é a mesma, um mundo diferente que está prestes a estudar, entender e superar para encontrar seu lado humano de se ver as coisas e achar sua 'Lua' novamente.",
        acoes: ["+15 agricultor, +15 resitir venenos, +15 resistir efeitos, +15 coletar, +15 transformar, +10 esculpir, +10 construir, +10 mecânica, +10 empatia, +10 bloqueio, +10 contra-ataque, +10 resistir, +10 plantar, +10 sustentabilidade, +10 pontaria, +10 identificar plantas, +10 identificar ervas, +10 processos de adubo, +10 processos de energia, +10 prótese primal, +10 sobrevivência, +5 criação de item primal, +5 junção primal, +5 furtividade, +5 esquiva, +5 luta, +5 pensar, +5 perceber inimigos, +5 analisar alvos, +5 analisar terreno, +5 prevenção de clima. "],
        mutacao: "Wall-E: Pode usar energia solar para recarregar seus pontos de esforço, podendo usar energia para criar próteses e ferramentas, podendo usar energia para aumentar a vida de suas construções e plantas, além de poder usar energia para aumentar a vida de seus aliados (4d8). (3 vezes por dia).",
        classes: "Construtor, sobrevivnete",
        agilidade: 3,
        forca: 1,
        inteligencia: 2,
        sobrevivencia: 3,
        vigor: 3,
        status: "Vida: 85, Determinação/Sanidade: 115, Existência/Resistência: 25, Fôlego: 6, Armadura: 5",
      
    },
    "npc8": {
        nome: "Meleys",
        imagem: "imagens/npc8_meleys.jpg",
        historia: "Nasceu de uma semente hypo que foi colhida por um antigo mago, famoso por ser amigo dos animais, transformando o desejo daquela planta carnívora sem graça em um ser mais conciente e que podesse ir atrás de sua comida sem precisar esperar. Após anos sem ser tocada ou alimentada, ficou dormindo em sua casca de semente, onde toda a vida começou, acordada por uma jovem na floresta. Agora seu objetivo é saciar sua vontade de comer tudo e todos, se sua 'Mãe' permitir. ",
        acoes: ["+15 agarrar, +15 morder, +15 resisitr venenos, +15 resisitir efeitos de controle, +15 em camuflar, +10 furtividade, +10 comer, +10 digestão, +10 atrair com cheiro, +10 em ficar parado, +10 giro, +10 força bruta na mordida, +10 engolir, +10 combo, +10 luta, +10 contra-ataque, +10 reflexo, +10 esquiva, +10 bloqueio, +10 perseguir, +10 cheirar, +5 flanco, +5 sentidos, +5 pontaria, +5 arremesso, +5 pensar em comer, +5 DRACARYSS, -5 visual, -5 enxergar. "],
        mutacao: "Fome de Carnívora: Meleys pode sempre regernar metade do dano que causou em vida ou armadura até 50% da vida acumulada, álem disso pode tentar causa agarrão em todos os ataques e ganha +5 contra qualquer tipo de inseto. Meleys precisa obedecer seu dono caso seja treinada e cuidada, mais é intolerante a qualquer outro tipo de pessoa caso a provoquem, álem de ser fraca contra fogo por ser uma planta. ",
        classes: "Sobrevivente, guerreiro",
        agilidade: 2,
        forca: 3,
        inteligencia: 1,
        sobrevivencia: 2,
        vigor: 4,
        status: "Vida: 100, Determinação/Sanidade: 70, Existência/Resistência: 30, Fôlego: 7, Armadura: 5",
      
    },
    "npc9": {
        nome: "Anel de Morgoth",
        imagem: "imagens/npc10_.jpg",
        historia: "Criado por um Rei Morgoth antigo, o anel foi perdido na guerra, sendo resgatado e roubado de vária maneiras até passar nas mãos de um novo sobrevivente. Existem 9 anéis do Imperador Morgoth.",
        acoes: ["+20 enganação, +20 persuação, +20 vontade, +20 bloqueio, +20 controle mental, +20 percepção, +35 furtividade."],
        mutacao: "Anel de Morgoth da Ganância: O anel pode fazer o portador ou arauto enxergar de forma distorcida a realidade, podendo ficar invisível visualmente, cada rodada com o poder ativo gasta 5 de sanidade do portador. O Anel precisa deixar ele de maneira obcecada em seu uso, para ficar vivo.",
        classes: "Arcano",
        agilidade: 1,
        forca: 1,
        inteligencia: 1,
        sobrevivencia: 5,
        vigor: 2,
        status: "Vida: 100, Determinação/Sanidade: 70, Existência/Resistência: 30, Fôlego: 7, Armadura: 5",
      
    },
    "npc10": {
        nome: "O Adestrador",
        imagem: "imagens/npc10_adestrador.png",
        historia: "TODOS VCS VÃO MORRER PARA AS MINHAS FERAS",
        acoes: ["+25 teatro, +25 maquiagem, +25 enganação (Vou Matar todos VCS)"],
        mutacao: "Filho do Domador",
        classes: "Melhor Enganador 'Trouxas'",
        agilidade: 0,
        forca: 0,
        inteligencia: 0,
        sobrevivencia: 0,
        vigor: 0,
        status: "Morte a todos Vocês, em nome do meu pai",
      
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
