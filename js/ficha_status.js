
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
    "npc2": "Deus",
    "npc3": "Vingança",
    "npc4": 'Irmão',
    "npc5": "Adrenalina",
    "npc6": "Amigo",
    "npc7": "Eva",
    "npc8": "Mamãe",
    "npc9": "ganância",
    "npc10": "Neta",
    "npc11": "Pai",
    "npc12": "Escravo",
    "npc13": "Levaitã",
    "npc14": "Demônios",
    "npc15": "Escarlate",
    "npc16": "UmFavor",

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
        forca: 2,
        inteligencia: 3,
        sobrevivencia: 2,
        vigor: 3,
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
        nome: "Melarys",
        imagem: "imagens/npc8_meleys.jpg",
        historia: "Nasceu de uma semente hypo que foi colhida por um antigo mago, famoso por ser amigo dos animais, transformando o desejo daquela planta carnívora sem graça em um ser mais conciente e que podesse ir atrás de sua comida sem precisar esperar. Após anos sem ser tocada ou alimentada, ficou dormindo em sua casca de semente, onde toda a vida começou, acordada por uma jovem na floresta. Agora seu objetivo é saciar sua vontade de comer tudo e todos, se sua 'Mãe' permitir. ",
        acoes: ["+15 agarrar, +15 quebrar solo, +15 locomover, +15 conhecimento arcano botânico, +15 vigia, +15 luta +15 morder, +15 resisitr venenos, +15 resisitir efeitos de controle, +15 em camuflar, +10 furtividade, +10 comer, +10 digestão, +10 atrair com cheiro, +10 em ficar parado, +10 giro, +10 força bruta na mordida, +10 engolir, +10 combo, +10 luta, +10 contra-ataque, +10 reflexo, +10 esquiva, +10 bloqueio, +10 perseguir, +10 cheirar, +5 flanco, +5 sentidos, +5 pontaria, +5 arremesso, +5 pensar em comer, +5 DRACARYSS, +5 VISCERYS, +5 pensar (Comandos) +5 percepção em terra. "],
        mutacao: "Fome de Carnívora: Melarys pode sempre regernar metade do dano que causou em vida ou armadura até 50% da vida acumulada, álem disso pode tentar causa agarrão em todos os ataques e ganha +5 contra qualquer tipo de inseto. Meleys precisa obedecer seu dono caso seja treinada e cuidada, mais é intolerante a qualquer outro tipo de pessoa caso a provoquem, álem de ser fraca contra fogo por ser uma planta. Seu despertar faz aumentar o tamanho, ganhar +1 vig e +1 for, além de ter uma defesa maior em armadura ",
        classes: "Sobrevivente, guerreiro",
        agilidade: 2,
        forca: 4,
        inteligencia: 1,
        sobrevivencia: 2,
        vigor: 4,
        status: "Vida: 130, Determinação/Sanidade: 70, Existência/Resistência: 30, Fôlego: 7, Armadura: 35",
      
    },
    "npc9": {
        nome: "Anel de Morgoth",
        imagem: "imagens/npc10_.jpg",
        historia: "Criado por um Rei Morgoth antigo, o anel foi perdido na guerra, sendo resgatado e roubado de vária maneiras até passar nas mãos de um novo sobrevivente. Existem 9 anéis do Imperador Morgoth.",
        acoes: ["+20 enganação, +20 vontade, +20 percepção arcana, +20 manipulação de medo, +20 manipulação de peso, +20 bloqueio, +20 controle mental, +20 percepção, +35 furtividade."],
        mutacao: "Anel de Morgoth da Ganância: O anel pode fazer o portador ou arauto enxergar de forma distorcida a realidade, podendo ficar invisível visualmente, cada rodada com o poder ativo gasta 5 de sanidade do portador. O Anel precisa deixar ele de maneira obcecada em seu uso, para ficar vivo.",
        classes: "Arcano, Sobrevivente",
        agilidade: 1,
        forca: 1,
        inteligencia: 1,
        sobrevivencia: 5,
        vigor: 1,
        status: "Vida: 25, Determinação/Sanidade: -, Existência/Resistência: 100, Fôlego: -, Armadura: -",
      
    },
    "npc10": {
        nome: "Alfredo Alexander Santos",
        imagem: "imagens/npc10_alfredo.jpg",
        historia: "Alfredo é um simples sapateiro no século 19, que foi transportado para o ark depois de um acidente envolvendo sua fámilia após a sua casa onde sua eles moravam pegar fogo, Alfredo tentou salvar sua neta e se perdeu em meio a fumaça, encontrando um mundo desconhecido e selvagem",
        acoes: ["+15 criação primal, +15 manipular seda, +15 costura, +15 moldagem de couro, +10 corte, +10 pontaria, +10 empatia, +10 bloqueio, +10 diplomacia, +10 furtividade, +10 percepção, +10 customizar, +10 artes, +10 faxina, +5 cozinhar, +5 esquiva, +5 reflexo, +5 pensar, +5 sobrevivência  "],
        mutacao: "Alfredo pode usar sua habilidade de correr de forma anormal escolhendo 3 alvos para andar sobre as paredes e sobre as águas, o tempo em que o efeito persiste é pelo fôlego de cada alvo.",
        classes: "Arcano, Sobrevivente",
        agilidade: 3,
        forca: 2,
        inteligencia: 3,
        sobrevivencia: 2,
        vigor: 2,
        status: "Vida: 70, Determinação/Sanidade: 90, Existência/Resistência: 20, Fôlego: 5, Armadura: 5",
      
    },
     "npc11": {
        nome: "Gorki",
        imagem: "imagens/npc11_gorki.jpg",
        historia: "Gorki é um Orc sobrevivente de sua tribo nas montanhas congeladas, foi separado de sua tribo depois de uma luta territorial contra outros povos que ameaçavam sua tribo, após perder seu pai pelo líder da outra tribo ficou perdido nos campos de corpos de seu povo e foi parar em outra ilha.",
        acoes: ["+15 luta, +15 contra-ataque, +15 bloqueio, +10 força bruta, +10 resistência, +10 escalada, +10 sobrevivência, +10 correr, +5 furtividade, +5 combo, +5 reflexo, +5 esquiva, +5 pensar, +5 percepção"],
        mutacao: "Gorik é um Orc, tendo muita resistência a dor e um corpo treinando para a guerra nos ambientes mais frios, tendo + 40 pv e +25 armadura base, além de poder reduzir sempre um dano de corte pela metade em uma rodada em troca de acertar alguém nessa mesma rodada. Podendo também ter habilidades e potencial de luta com qualquer tipo de arma física, além de acumular dano recebeido e devolver em um ataque de fúria que quebra a arma do oponente, causa o dobro de dano em armas em sues ataques, caso a arma quebre o gorik pode atacar novamnete na mesma rodada.",
        classes: "Guerreiro, Sobrevivente",
        agilidade: 2,
        forca: 3,
        inteligencia: 2,
        sobrevivencia: 2,
        vigor: 3,
        status: "Vida: 125, Determinação/Sanidade: 70, Existência/Resistência: 20, Fôlego: 5, Armadura: 30",
    },
    "npc12": {
        nome: "Baraka",
        imagem: "imagens/npc12_baraka.jpg",
        historia: "Baraka era um guerreiro de seu grupo, seu povo era escravaizado pela socidade e raça humana que dominava em seu universo, para poder te chance de libertar parte de povo foi participar d eum torneio e nunca mais voltou, indo para um outro lugar. ",
        acoes: ["+15 luta, +10 refletir dano, +10 coragem +15 contra-ataque, +15 bloqueio, +10 pontaria, +10 fintar, +10 combo, +10 desarme, +10 reflexo, +10 esquiva, +10 mordida, +10 esquartejar, +10, +5 resistência, +5 escalada, +5 sobrevivência, +5 correr, +5 furtividade, +5 percepção"],
        mutacao: "Corpo Tarkata: ganha +20 pontos de vida , +15 de armadura e seus socos viram socos lámina: causam 3d12+5 de corte. Baraka ao causar dano severo em um inimigo, que arranque metade da vida ou 45%, pode tentar causar sangramento em um teste de esquartejar, caso o inimigo seja esquartjado baraka pode atacar várias vezes o alvo usando seus soco de lâmina, a cada 30 pontos de dano que causou no alvo com o primeiro ataque é um soco em sequência que baraka ataca de forma desenfreada. ",
        classes: "Guerreiro, Arcano",
        agilidade: 3,
        forca: 3,
        inteligencia: 1,
        sobrevivencia: 2,
        vigor: 2,
        status: "Vida: 90, Determinação/Sanidade: 70, Existência/Resistência: 20, Fôlego: 5, Armadura: 20",
      
    },
    "npc13": {
        nome: "Alexei Stukov",
        imagem: "imagens/npc13_alexei.jpg",
        historia: "Um capitão que liderava embarcações espaciais em um universo distante, Alexei Stukov era conhecido por ser um grande capitão caçador de monnstros, enviado para a terra na missão de eliminar a raça predominante alienigena que dominou parte da terra, em um dia de viagem, foi emboscado por um cardume de peixes monstros, sendo deixado como isca em meio ao mar, abandonado pela triupulação e sendo digerido vivo por um leviatã, dentro da fera, aprendeu a lidar e controlar seus sentidos iguais as feras, em uma tentativa de sobrevivência, tendo um próprio sistema em seu corpo, com vida própria e monstruosa, acordado em uma praia depois de um sonho, ainda molhado.",
        acoes: ["+15 luta, +15 agarrão, +10 tática, +10 folêgo marinho, +10 percepção marinha, +10 sobrevivência, +10 nadar, +10 percepção, +10 fortitude, +10 pontaria, +10 adestramento, +10 percepção inimiga, +10 bloqueio, +10 contra-ataque, +10 pilotagem, +10 pensar (sobre os mares), +10 manipulação de veneno, +10 manipulação de vida, +10 intimidar, +5 flanquear, +5 esquiva, +5 criação industrial, +5 diplomacia, +5 furtividade, +5 refelxo, +5 arremesso."],
        mutacao: "Braço Zerg: Alexei pode causar dano ou curar tanto aliados e inimigos, soltando um jato de gosma que acelera o corpo em produzir a regeneração de machucados, feridas extremas, Sendo 3d12+15 de dano ou cura. Fora isso, pode agarrar um alvo com o braço monstro ganhando +5 e causando o efeito agarrado junto com Desarmado. Caso queira bloquear, ganha +30 pontos de vida e +5 bloqueio, se o alvo inimigo for um aniaml marinho ele ganah o triplo de pontos de vida. Pode também atacar usando o braço monstro e recuperando a vida perdida com um dano de 4d12+5",
        classes: "Guerreiro, Sobrevivente",
        agilidade: 1,
        forca: 4,
        inteligencia: 3,
        sobrevivencia: 2,
        vigor: 3,
        status: "Vida: 90, Determinação/Sanidade: 105, Existência/Resistência: 25, Fôlego: 6, Armadura: 25",
      
    },
    "npc14": {
        nome: "Kenshi",
        imagem: "imagens/npc14_kenshi.jpg",
        historia: "Um guerreiro cego que luta com espadas, Kenshi é um mestre em combate corpo a corpo. Ele perdeu a visão em uma batalha de um torneio, mais conseguiu achar a paz depois de anos de agonia, enxergando coisas do além e participando de um torneio, mais apareceu em outro lugar....",
        acoes: ["+15 contra-ataque,  +15 percepção dos mortos, +10 esquiva, +10 bloqueio, +10 luta, +10 percepção arcana, +10 manipulação de alma, +10 conjuração, +10 manipulação de ódio, +10 resiliência, +10 flanquear, +10 combo, +10 correr, +10 furtividade, +10 diplomacia, +10 vontade, +10 resistência, +10 reflexo, +10 pensar, +10 preparar ação, +10 conhecimentos arcanos, +10 audição."],
        mutacao: "Olhos do Além: Kenshi pode enxergar o que está além do físico, podendo ver os mortos e espíritos, podendo usar isso para atacar ou defender, ganhando +5 em todas as ações de ataque e defesa contra inimigos espirituais. kenshi causa +1 dado de dano extra em sua katana invocada para cada 10 pontos de sanidade que perder durante a luta ou em uma cena. Além de possui esse dominio pode conversar com os mortos e perceber pessoas de forma arcana.",
        classes: "Guerreiro, Arcano",
        agilidade: 3,
        forca: 2,
        inteligencia: 3,
        sobrevivencia: 3,
        vigor: 2,
        status: "Vida: 70, Determinação/Sanidade: 105, Existência/Resistência: 20, Fôlego: 5, Armadura: 5",
      
    },
    "npc15": {
        nome: "Morgana Lefray",
        imagem: "imagens/npc15_fada_morgana.jpg",
        historia: "Morgana Lefray é da familia Lefray, uma família de nobres que sempre foram conhecidos por serem os melhores magos e feiticeiros do reinado dos gladius, mais escolherma lutar e não apoiar as decisões do líder que tinha apenas interesses na rebeldia e controle da ilha, sairam de seu território e criaram uma capital junatmente com outras casas para ter um reinado contra sua antiga civilização. Morgana, foi a primeira Lefray a ser treinada por um mago de magias antigas, seu treinamento nos castelos cercados pela nobreza a influênciaram, mas morgana não enraizou sua mente apenas nos prazeres, se aproveitou das oportunidades, usando riqueza como poder e fonte de conhecimento para se tornar mais forte.",
        acoes: ["+20 manipulção de elemento, +20 manipulação de essência escarlate, +20 fluxo arcano, +15 percepção arcana, +15 conjuração, +15 contra-ataque, +10 bloqueio, +10 esquiva, +10 luta, +10 diplomacia, +10 adestramento, +10 preparar ação, +10 pensar, +10 enganação, +10 equilibrio, +10 furtividade, +5 correr, +5 charme, +5 reflexo, +5 reliência, +5 resitência a fogo, +5 provocação, +5 pontaria, +5 criação de ritual, +5 domesticação, +5 ler, +5 artes, +5 tática, +5 uso de armas medievais, +5 soberania, +5 vontade."],
        mutacao: "Espada Escarlate: Morgana possui a invocação de sua espada mágica que não pode ser usada como uma espada comum, ao ser atingida ela retorna a forma arcana, não sendo invocada por um tempo. Equanto estiver invocada, próxima a ela, Morgana ganha +5 conjuração e pontaria arcana para cada inimigo com desvantagens mágicas próximas a ela durante a cena. Seus ataques normais da espada soltam ondas escarlate juntando elementos arcanos de fogo e ódio, causando 8d12+35 pontos de dano de fogo, queimando o alvo em um raio de 4 metros. A espada também pode dar ao portador maior flexibilidade arcana e maior fluxo de mana, aumentando o seu poder, dados de dano e disponibilidade de rituais conforme aprende mais manifestações arcanas, aumentando suas permissões de rituais em cada ciclo e ganahndo +1 dado de dano e aumentando a área desse ritual de maneira proporcional ao quanto sabe sobre ele.  ",
        classes: "Arcano, guerreiro",
        agilidade: 2,
        forca: 2,
        inteligencia: 4,
        sobrevivencia: 4,
        vigor: 3,
        status: "Vida: 85, Determinação/Sanidade: 130, Existência/Resistência: 25, Fôlego: 6, Armadura: 25",
      
    },
    "npc16": {
        nome: "Jonh Vanguard",
        imagem: "imagens/npc16_john_vanguard.jpg",
        historia: "Jonh Vanguard foi um aventureiro de um mundo mágico que foi para o ark, em uma época de guerra, entre os gladius e elfos, foi da civlização antiga dos gladius e teve uma vida humilde como um escudeiro e soldado no campo de batalah, sempre conseguiu se destacar em guildas de missões contra feras. Em sua adaptação ao ark, foi acolhido por uma mulher já um pouco idosa, reconhecndo-a como uma mãe, pelo seu cuidado e acolhimento em tempos dificeis. Agora atualmente busca proteger uma amada que o reconheça como seu cavaleiro, pelo seu dever e juramento como tal. Fazendo e concluindo suas ordens contra os gladius que executaram a única pessoa que lhe importava, por enquanto...",
        acoes: ["+15 bloqueio, +15 manipulação de vida, +15 manipulação de luta, +15 manipulação de elemento (origem suporte), +15 luta, +10 contra-ataque, +10 esquiva, +10 percepção, +10 furtividade, +10 resiliência, +10 diplomacia, +10 pensar, +10 correr, +10 agarrar, +10 reflexo, +10 resistência, +10 fortitude, +10 tática, +10 sobrevivência, +10 criação de armas primais, +10 conheciemnto medieval, +10 vontade, +10 intimidação, +10 domesticação, +10 pontaria, +10 percepção arcana, +5 conhecimento arcano, +5 enganação, +5 religião, +5 rastreamento, +5 nadar, +5 encontrão, +5 combo, +5 rolar, +5 arrmesso. "],
        mutacao: "Escudo Vanguard: Jonh possui duas armas, seu escudo e sua espada, pode reagir para defender qualquer aliado, quando estiver próximo de um suporte ganha efeito de sua passiva em sue escudo, ganhando +5 em bloquear, +20 de vida acelerada, mais o uso da mutação do suporte que concede efeito ao Jonh e ao alaido q ele defender com o escudo. Caso defenda um alvo recebe +5 em correr e luta, para ficar pronto para a próxima defesa. Caso puxe a espada, causa o dano de uma espada d ferro + o efeito de seu suporte, causando o dano no inimigo, o buff é alterado de forma contrária contra inimigos. Se algum aliado receber dano em seu campo de visão, ganha o efeito de rage apenas contra inimigos e cura acelerada +25 pontos de vida ",
        classes: "Guerreiro, Arcano",
        agilidade: 3,
        forca: 3,
        inteligencia: 2,
        sobrevivencia: 3,
        vigor: 3,
        status: "Vida: 85, Determinação/Sanidade: 95, Existência/Resistência: 25, Fôlego: 6, Armadura: 35",
      
    },


};

function filtrarNPCs() {
    const termoPesquisa = document.getElementById("pesquisa").value.toLowerCase();
    const npcs = document.querySelectorAll(".npc-grid .npc");

    npcs.forEach(npc => {
        const nome = npc.querySelector("h2").textContent.toLowerCase();
        const classe = npc.querySelector(".info2").textContent.toLowerCase();
        
        // Se o nome ou a classe contiver o termo pesquisado, mostra; senão, esconde
        npc.style.display = (nome.includes(termoPesquisa) || classe.includes(termoPesquisa)) ? "block" : "none";
    });
}

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
// Conteúdo dinâmico para cada ícone
const contents = [
    {
    "titulo": "Duelista",
    "texto": "O Duelista é o principal atacante do time. Personagens dessa classe podem atacar alvos que estejam entre os dois primeiros da linha de frente. Com um teste de Luta, podem tentar flanquear sempre o alvo da frente. Seus ataques reduzem a Guarda do inimigo e, caso este sofra muitos ataques que causem dano severo (80% da vida máxima), ele perde a Guarda e fica abalado. Além disso, caso o Duelista possua (Combo) em sua ficha, ele pode aplicar uma condição ou efeito ao alvo atingido, como Sangramento, Atordoamento, Imobilizado, Lento, entre outros, conforme descrito na ficha.",
    "gif": "imagens/brutal1_icon.jpg",
    "background": "imagens/brutal_fundo_icon.jpg"
  },
  {
    "titulo": "Guerreiro",
    "texto": "O Guerreiro é a principal barreira quando não há um Vanguardista no time. Ele consegue causar dano e resistir a ataques com eficácia. Pode atingir os dois primeiros inimigos da linha de frente e, caso possua Giro, pode tentar um teste de Luta para acertar ambos simultaneamente. Além disso, se tiver Força Bruta ou Investida na ficha, sempre que acertar um alvo, pode realizar um teste para aplicar Atordoamento. Se o Guerreiro também possuir Resistência, ele pode mitigar efeitos negativos, reduzindo os debuffs recebidos e aproveitando apenas os benefícios que um efeito inimigo poderia conceder.",
    "gif": "imagens/brutal2_icon.jpg",
    "background": "imagens/brutal_fundo_icon.jpg"
  },
  {
    "titulo": "Mago ou Suporte Endiabrado",
    "texto": "O Mago ou Suporte Endiabrado é o principal aplicador de efeitos e condições no time. Ele pode atacar qualquer inimigo utilizando Magia Arcana ou Encantamentos. Suas magias variam entre causar dano elemental (fogo, gelo, veneno, sangramento) ou aplicar efeitos de controle. Sempre que lança uma magia contra um inimigo, este deve realizar um teste de Resistência ou Fortitude para tentar anular a condição imposta. Além de causar dano, o Mago ou Suporte Endiabrado pode auxiliar a equipe de diferentes formas, dependendo das magias ou encantamentos que possui em sua ficha. Ele também tem a capacidade de teleportar um aliado durante o combate, permitindo reorganizar a formação do time conforme necessário.",
    "gif": "imagens/brutal3_icon.jpg",
    "background": "imagens/brutal_fundo_icon.jpg"
  },
  {
    "titulo": "Vanguardista",
    "texto": "O Vanguardista é o principal tanque e a linha de frente do time. Ele pode utilizar todas as suas reações para defender a si mesmo ou proteger qualquer membro do grupo. Caso tenha um escudo, pode bloquear projéteis. Se possuir Reflexo, pode intervir para proteger um aliado, absorvendo todo o dano físico que ele receberia. Com Fortitude, pode reduzir pela metade qualquer dano físico recebido a cada rodada. Além de sua resistência, caso tenha Diplomacia ou alguma ação de Trabalho em Grupo, pode impulsionar um aliado para ajudá-lo a alcançar um ataque, concedendo-lhe um bônus de +5 no acerto.",
    "gif": "imagens/brutal4_icon.jpg",
    "background": "imagens/brutal_fundo_icon.jpg"
  },
  {
    "titulo": "Adestrador",
    "texto": "A classe Adestrador é o principal controlador de criaturas e monstros. Ele é o único que pode usar criaturas durante o combate, pois os outros personagens estão ocupados demais para comandá-las. O Adestrador pode atacar apenas os dois primeiros inimigos da frente, mas sua fera pode alcançar qualquer alvo. A fera age de acordo com o comando do Adestrador e pode causar dano, curar ou aplicar efeitos no combate. Ele pode comandar apenas uma fera por rodada, mas caso tenha Reflexo, Pensar ou Adestramento, pode trocar de fera no meio do combate. Além disso, o Adestrador pode usar sua fera para um segundo contra-ataque ou preparar uma armadilha para inimigos que tentem se aproximar de sua equipe.",
    "gif": "imagens/brutal5_icon.jpg",
    "background": "imagens/brutal_fundo_icon.jpg"
  },
  {
    "titulo": "Assassino",
    "texto": "A classe Assassino é especialista em causar dano crítico e aplicar efeitos de sangramento. Ele pode atacar apenas os dois primeiros inimigos da frente, mas se estiver furtivo, pode atacar qualquer alvo. Sempre que entra em furtividade, pode realizar um ataque que cause sangramento ou veneno. Caso tenha a habilidade Crítico na ficha, pode rolar duas vezes e reduzir a margem de acerto crítico em 2. Além disso, o Assassino possui duas reações de esquiva e contra-ataque, podendo usá-las para se reposicionar, atacar novamente ou fugir, tornando-se ideal para eliminar alvos isolados.",
    "gif": "imagens/brutal6_icon.jpg",
    "background": "imagens/brutal_fundo_icon.jpg"
  },
  {
    "titulo": "Suporte",
    "texto": "A classe Suporte é o principal curandeiro do time. Ele pode curar qualquer aliado e atacar apenas o primeiro inimigo da frente. O Suporte tem controle total sobre os efeitos aplicados em seus aliados e pode redistribuí-los no início de cada rodada, transferindo efeitos para quem estiver mais preparado para suportá-los. Caso tenha Medicina, pode curar um aliado sem mutações (habilidades) usando utensílios que possua, restaurando vida proporcional ao item utilizado. Se possuir Tratamento de Feridas, pode tentar anular um efeito de sangramento e curar o dano causado por ele. Além disso, se tiver testes de Percepção relacionados a infecções ou doenças, pode tentar anular o dano causado por pestes ou enfermidades. Sempre que uma rodada reinicia, caso tenha Diplomacia, pode conceder um bônus de +5 para um aliado em uma ação ou tentar reverter dano de sanidade.",
    "gif": "imagens/brutal7_icon.jpg",
    "background": "imagens/brutal_fundo_icon.jpg"
  },
  {
    "titulo": "Atirador",
    "texto": "A classe Atirador é especializada em dano direto contra inimigos estratégicos. Ele pode atacar qualquer inimigo que esteja em sua linha de visão. Caso tenha Pontaria, pode mirar antes de atacar para ganhar +5 no acerto. Se possuir Crítico, pode rolar novamente para tentar confirmar um acerto crítico e reduzir a margem de ameaça em 2. Além disso, se tiver Furtividade, pode tentar se esconder antes de atacar, obtendo um bônus de +5 no golpe. No início de cada rodada, o Atirador pode marcar um alvo, garantindo que seus aliados tenham um bônus de +5 ao atacá-lo.",
    "gif": "imagens/brutal8_icon.jpg",
    "background": "imagens/brutal_fundo_icon.jpg"
  },
  {
    "titulo": "Colosso",
    "texto": "A classe Colosso é o principal tanque e lutador da linha de frente, sendo um monstro de guerra que só conhece a violência. Sempre que acerta um alvo e possui agarrão em sua ficha, pode agarrá-lo, aplicando -5 em todas as suas reações. Se possuir intimidação, pode tentar intimidar todos os inimigos, causando -5 em todos os testes contra ele. Se tiver bloquear, pode usar 2 reações de bloqueio no combate. Caso tenha resistência, pode reduzir todo o dano recebido pela metade. Além de ser uma máquina de guerra, a cada 3 rodadas pode tentar atordoar o primeiro alvo que vê ou correr enfurecido, embaralhando a posição dos inimigos.",
    "gif": "imagens/brutal9_icon.jpg",
    "background": "imagens/brutal_fundo_icon.jpg"
  },
  {
    "titulo": "Chefe de Batalha",
    "texto": "A classe Chefe de Batalha é uma classe especial onde um chefe participa do combate, podendo utilizar todas as vantagens de outras classes, além de criar suas próprias estratégias, ataques, passivas e efeitos. Ele tem total controle sobre a preparação de sua equipe, tornando-se um dos piores confrontos que qualquer um pode enfrentar.",
    "gif": "imagens/brutal10_icon.jpg",
    "background": "imagens/brutal_fundo_icon.jpg"
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