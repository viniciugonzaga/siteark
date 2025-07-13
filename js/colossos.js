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

// Banco de fichas de Colossos
const colossos = {
    "Atlas": {
        nome: "Atlas",
        imagem: "imagens/tokens/colosso_acro.png",
        tamanho: "Altura: 10 M / Comprimento: 14 M",
        atributos: {
            agi: 2,
            for: 4,
            int: 2,
            pre: 1,
            vig: 5
        },
        vida:350,
        armadura:"350",
        bonus: "+20 bloqueio/ +20 resistência / +20 encontrão / +15 em intimidar / +15 em mordida/ +15 em luta/ +5 em ações de força/vig",
        ataques: ["Gritar: Ao receber dano enquanto grita aplica todo o dano que recebeu em um grito descontrolado, quem ficar surdo fica pasmo", "Bloqueio de ombro: Faz todo o dano recebido ser puxado a ele, fazendo o seu corpo tankar tudo menos os dentes, fora da armadura", "Mordida: 6d12+10"],
        passiva: "Toda vez que grita sua defesa aumenta em 20 em bloqueio ou qualquer teste de vig",
        enigmaPorta: "Eco do passado, que molda o presente, o que nasce da luta e carrega o peso da alma? Responda, ou o tempo o deixará para trás. - Ascensão. -eco-vida-luta-peso-alma: ascensão ",
        enigmaAntigo: "Um ritual antigo nasce no centro, sendo recebido pelos arcos de outras eras, com 4 pilares de pedra.",
        dropItens: "Dropa o dente da tormenta, tendo a passiva do grito.",
        passivaPermanente: "Ganha +5 em defesas gerais e 1 de vig ou for."
    },
    "Igneos": {
        nome: "Igneos",
        imagem: "imagens/tokens/colosso_acro.png",
        tamanho: "Altura: 8 M / Comprimento: 18 M",
        atributos: {
            agi: 3,
            for: 4,
            int: 1,
            pre: 2,
            vig: 3
        },
        vida: 280,
        armadura: 280,
        bonus: "+20 em bloqueio / +20 em contra-ataque / +20 em mordida / +20 em luta / +15 em corrida / +15 intimidar / +5 em ações de agi/for",
        ataques: [
            "Gritar: Ao estar próximo de um inimigo, Igneos pode gritar e forçar um inimigo a olhar a rodada inteira para ele; apenas ações que envolvam o 1v1 podem ser feitas.",
            "Encontrão da ira: Igneos pode correr em direção desenfreada, fazendo quem ele acertar tomar 4d12 de dano e os derrubando.",
            "Mordida: 7d12+10."
        ],
        passiva: "Inimigos próximos que forem intimidados por ele recebem +10 de dano em qualquer ataque.",
        enigmaPorta: "Eco de um coração queimando, ferocidade que consome, o fogo eterno que não esquece. Responda: o que pode mover montanhas, mas deixa cinzas ao passar? - Fogo. - ferocidade-fogo-mover-esquecer: fogo.",
        enigmaAntigo: "Um círculo de brasas ardentes, uma espiral selvagem e com cores fortes. Qual o símbolo do espírito irado?",
        dropItens: "Dente da Ira, que ao ser usado faz o alvo olhar para o conjurador por 1 rodada.",
        passivaPermanente: "Todas as origens de dano de ira são anuladas."
    },
    "Esquecidrus": {
        nome: "Esquecidrus",
        imagem: "imagens/tokens/Colosso_esquecido.png",
        tamanho: "Altura: 5 M / Comprimento: 3 M",
        atributos: {
            agi: 2,
            for: 2,
            int: 4,
            pre: 2,
            vig: 2
        },
        vida: 230,
        armadura: 45,
        bonus: "+20 em pensar / +10 em contra-ataque / +10 em luta / +10 em bloqueio / +5 em furtivo / +10 intimidar / +5 em ações de int",
        ataques: [
            "Eco de silenciamento: 3d10+5, cancela qualquer ação que faça som.",
            "Arrastar: 2d10+5, faz o alvo ser arrastado para ele.",
            "União de esquecimento: 4d10+5, faz o alvo esquecer de tudo por 1 dia."
        ],
        passiva: "Quando é atacado, o alvo inimigo deve fazer um teste de int. Caso falhe, ele esquece de tudo por 1 rodada.",
        enigmaPorta: "Memórias esquecidas fluem como um rio sem destino. O que resta quando o eco é apagado, o som perdido, e apenas o peso da alma persiste? - Esquecimento. - esquecer-eco-peso-alma: esquecimento.",
        enigmaAntigo: "Um nevoeiro de memórias sendo drenada por 1 ponto fixo, no meio o nada, puro esquecimento.",
        dropItens: "Coroa Antiga: Faz o alvo esquecer de tudo.",
        passivaPermanente: "Ganha +5 em defesas gerais, +1 de int, e imunidade a dores de cabeça."
    },
    "Celopia": {
        nome: "Celopia",
        imagem: "imagens/tokens/colosso_celopia.webp",
        tamanho: "Altura: 3 M / Comprimento: 4 M",
        atributos: {
            agi: 3,
            for: 4,
            int: 1,
            pre: 1,
            vig: 3
        },
        vida: 200,
        armadura: 190,
        bonus: "+15 em bloqueio / +20 em luta / +10 em corrida / +10 em esquiva / +5 em ações de força ou agilidade",
        ataques: [
            "Cabeçada: 7d10+30, um golpe poderoso que pode causar tontura no alvo.",
            "Espasmo de Raiva: Transfere toda a dor sofrida para uma explosão de ira. Para cada 30 de dano recebido, ganha 1 rodada adicional de fúria.",
            "Encontrão: 5d10+25, causa dano massivo e empurra o alvo para trás."
        ],
        passiva: "Fera Antiga: Celopia não sofre dano convencional devido à sua mega armadura. Apenas ataques de queda, impacto com objetos grandes, ou fogo podem danificá-lo significativamente.",
        enigmaPorta: "Fogo, coragem e peso, apenas esses poderão romper o que o tempo esculpiu e a fúria protege. Qual é o caminho? - Sol. - fogo-peso-luta-sol: resistência ao fogo.",
        enigmaAntigo: "Circulos de aura são formados pelo calor, uma brasa ardente se origina do meio.",
        dropItens: "Chifre de Celopia: Um material extremamente resistente, ideal para armas ou armaduras.",
        passivaPermanente: "Melhora a passiva de metamorfose, garantindo resistência adicional a fogo e ataques físicos."
},

"Kuromori": {
    nome: "Kuromori",
    imagem: "imagens/tokens/colosso_kuromori.jpeg",
    tamanho: "Altura: 4 M / Comprimento: 9 M",
    atributos: {
        agi: 4,
        for: 2,
        int: 3,
        pre: 3,
        vig: 1
    },
    vida: 180,
    armadura: 180,
    bonus: "+20 em esquiva / +15 em furtividade / +10 em luta / +10 em ações que envolvam agilidade ou precisão",
    ataques: [
        "Soltar Veneno: 4d10 + (metade do tempo de efeito em dano por rodada), cria uma área envenenada que dura 3 rodadas.",
        "Ataque de Cauda: 7d12+15, um golpe devastador que pode quebrar defesas inimigas.",
        "Mordida: 5d10+10."
    ],
    passiva: "Lagarto Antigo: Kuromori é extremamente rápido e possui uma armadura reforçada nas costas. Para equilibrar a batalha, os inimigos devem focar ataques nas patas ou pernas para derrubá-lo e expor suas áreas vulneráveis.",
    enigmaPorta: "Com cada movimento, o peso do eco se dissolve. A vitória não está em força, mas em astúcia. Quem ousa pisar sem medo? - Resposta: Movimento. - eco-peso-mover-ciclo: equilíbrio.",
    enigmaAntigo: "Sombras dançam enquanto o vento cobre. No coração da queda, onde eco e alma se encontram, o que surge do ciclo eterno?",
    dropItens: "Glândula de Veneno: Um item raro usado para criar toxinas poderosas ou resistências ao veneno.",
    passivaPermanente: "Melhora a passiva de metamorfose, aumentando a resistência a ataques e ampliando a agilidade em combate."

},
  "Avion": {
    nome: "Avion",
    imagem: "imagens/tokens/colosso_avion.webp",
    tamanho: "Altura: 11 M / Comprimento: 25 M",
    atributos: {
        agi: 3,
        for: 3,
        int: 3,
        pre: 3,
        vig: 2
    },
    vida: 400,
    armadura: 320,
    bonus: "+20 em intimidação / +15 em ações de precisão e força / +20 em bloqueio / +10 em resistência física/ +10 em luta/ +5 em percepção",
    ataques: [
        "Cauda/Esmagar: 6d12+30, aplica status 'Quebrado' ao inimigo.",
        "Garras/Bico: 7d12+25, também aplica status 'Quebrado'.",
        "Colossal:Pode bloquear projéteis e ataques com sua armadura no ar, fazendo os cair no chão, quanto mais tentaivas do inimigo mais dados de dano ele ganah no bico: 1-dado. "
    ],
    passiva: "Pássaro Antigo: Avion é imune a qualquer tipo de dano até ser atordoado ou cegado por uma luz intensa e forte, expondo suas fraquezas temporariamente.",
    enigmaPorta: "Nas alturas, o que pesa é esquecido. No brilho, a sombra dança, mas só o equilíbrio abre o caminho. - Resposta: Luz. - peso-esquecer-luz-alma: clareza.",
    enigmaAntigo: "Ao se erguer contra a luz, o que projeta o passado? No alto, eternamente solitária, a que reflete a verdade?",
    dropItens: "Pluma das Sombras: Um item usado para criar equipamentos ou poções que amplificam a furtividade e a resistência contra luze e feitos na visão.",
    passivaPermanente: "Aprimoramento Sombrio: Melhora a passiva de metamorfose, aumentando a resistência e os bônus em esquiva e precisão."
},
"Cenobia": {
        nome: "Cenobia",
        imagem: "imagens/tokens/colosso_cenobia.webp",
        tamanho: "Altura: 5 M / Comprimento: 6 M",
        atributos: {
            agi: 3,
            for: 4,
            int: 1,
            pre: 1,
            vig: 4
        },
        vida: 300,
        armadura: 340,
        bonus: "+20 em bloqueio / +25 em ataques corpo a corpo / +15 em resistência física / +15 em intimidação / +10 em ações de força ou vigor",
        ataques: [
            "Cabeçada: 8d10+30, aplica status 'Quebrado' ao inimigo, reduzindo sua defesa ou mobilidade.",
            "Encontrão: 7d10+25, um ataque devastador que derruba inimigos no impacto.",
            "Olhar Pasmo: Força os inimigos a realizarem um teste de Fortitude contra intimidação. Em caso de falha, eles ficam pasmos por 1 rodada."
        ],
        passiva: "Leão Antigo: Cenobia possui uma mega armadura que só pode ser quebrada após sofrer mais de 8 ataques fortes diretamente na cabeça. Suas viradas são lentas, tornando-o vulnerável em ângulos laterais, mas ele sempre focará no inimigo com mais bravura ou vida.",
        enigmaPorta: "A bravura persiste, mesmo sob o peso da vida. Quem carrega o fardo sem medo? Responda, ou sua coragem será devorada. - Resposta: Coragem. - peso-vida-coragem-luta: vitória.",
        enigmaAntigo: "Rugindo sob a pedra, o símbolo da força aguarda. Qual traço ecoa na alma do guerreiro e reflete sua ferocidade?",
        dropItens: "Presas do Guardião: Um material usado para fortalecer armaduras ou criar itens de intimidação.",
        passivaPermanente: "Aprimoramento de Força: Ataques diretos e corpo a corpo são multiplicados em 1,5x."
    },

    "Basarah": {
        nome: "Basarah",
        imagem: "imagens/tokens/colosso_basaran.jpeg",
        tamanho: "Altura: 8 M / Comprimento: 12 M",
        atributos: {
            agi: 1,
            for: 5,
            int: 2,
            pre: 3,
            vig: 5
        },
        vida: 400,
        armadura: 500,
        bonus: "+30 em resistência física / +25 em bloqueio / +15 em movimento em resistênca  / +10 em ações de presteza +15 em ações de vig",
        ataques: [
            "Puxão de língua: 3d12+15 em dano e puxa o alvo para perto de Basarah.",
            "Pisada de Terra: 5d12+35, dá um pisão no chão causando dano em área e fazendo os inimigos caírem ao redor.",
            "Ataque de Garras: 4d12+20, com as garras reforçadas, Basarah arranca a armadura dos oponentes com força bruta."
        ],
        passiva: "Gigante Resiliente: Basarah possui uma armadura colossal e é imune a dano de fogo e ataques físicos fracos. Para quebrar sua defesa, é necessário um dano de impacto massivo ou um ataque mágico direcionado ao ponto fraco de seu casco.",
        enigmaPorta: "Sob a casca, a terra guarda sua verdade. O que é forte e resistente, mas não pode ser movido com facilidade? Responda, ou será esmagado. - Resposta: Força/peso. - resistência-vida-força-ciclo: superação.",
        enigmaAntigo: "Em seu casco, o símbolo da montanhas e relevos. Que segredo de estabilidade se esconde sob o peso de sua existência?",
        dropItens: "Escudo de Casco: Pode ser usado para aumentar a resistência física ou ser transformado em um item defensivo especial.",
        passivaPermanente: "Aprimoramento de Casco: A cada dano que Basarah recebe, ele ganha +10 de armadura adicional temporária até o fim da rodada."
    }
};

// Função para abrir o modal de colossos
document.getElementById("colossosBtn").onclick = function() {
    document.getElementById("colossosModal").style.display = "block";
    // Popula a lista de colossos
    const colossosList = document.getElementById("colossosList");
    colossosList.innerHTML = ''; // Limpa a lista
    for (const nome in colossos) {
        const li = document.createElement("li");
        li.textContent = nome;
        li.onclick = function() {
            abrirFichaColosso(nome);
        };
        colossosList.appendChild(li);
    }
};

// Função para abrir a ficha do colosso
function abrirFichaColosso(nome) {
    const ficha = colossos[nome];
    const fichaModal = document.getElementById("fichaModal");
    document.getElementById("fichaTitle").textContent = ficha.nome;
    let fichaContent = `
        <img src="${ficha.imagem}" alt="${ficha.nome}" style="width: 100%; max-width: 300px;">
        <p><strong>Tamanho:</strong> ${ficha.tamanho}</p>
        <p><strong>Atributos:</strong></p>
        <ul>
            <li>Agilidade: ${ficha.atributos.agi}</li>
            <li>Força: ${ficha.atributos.for}</li>
            <li>Inteligência: ${ficha.atributos.int}</li>
            <li>Percepção: ${ficha.atributos.pre}</li>
            <li>Vigor: ${ficha.atributos.vig}</li>
        </ul>
        <p><strong>Vida:</strong> ${ficha.vida}</p>
        <p><strong>Armadura:</strong> ${ficha.armadura}</p>
        <p><strong>Bônus em Ações:</strong> ${ficha.bonus}</p>
        <p><strong>Ataques:</strong></p>
        <ul>
            ${ficha.ataques.map(ataque => `<li>${ataque}</li>`).join('')}
        </ul>
        <p><strong>Passiva:</strong> ${ficha.passiva}</p>
        <p><strong>Enigma da Porta:</strong> ${ficha.enigmaPorta}</p>
        <p><strong>Enigma Antigo:</strong> ${ficha.enigmaAntigo}</p>
        <p><strong>Drop de Itens:</strong> ${ficha.dropItens}</p>
        <p><strong>Passiva Permanente:</strong> ${ficha.passivaPermanente}</p>
    `;
    document.getElementById("colossoFicha").innerHTML = fichaContent;
    fichaModal.style.display = "block";
}

// Fechar os modais
document.getElementById("closeModal").onclick = function() {
    document.getElementById("colossosModal").style.display = "none";
};

document.getElementById("closeFichaModal").onclick = function() {
    document.getElementById("fichaModal").style.display = "none";
};

// Fechar o modal se clicar fora dele
window.onclick = function(event) {
    if (event.target === document.getElementById("colossosModal")) {
        document.getElementById("colossosModal").style.display = "none";
    } else if (event.target === document.getElementById("fichaModal")) {
        document.getElementById("fichaModal").style.display = "none";
    }
};
