// ========================
// Sistema de Dados (mantido igual)
// ========================
const menu = document.getElementById('diceMenu');
const openMenuButton = document.getElementById('openMenu');
const closeMenuButton = document.getElementById('closeMenu');
const diceSelect = document.getElementById('diceSelect');
const rollDiceButton = document.getElementById('rollDice');
const clearRollsButton = document.getElementById('clearRolls');
const rollList = document.getElementById('rollList');
const totalDisplay = document.getElementById('total');
const playerNameInput = document.getElementById('playerName');

let playerScores = {};

// Funções do sistema de dados
openMenuButton.addEventListener('click', () => {
    menu.classList.remove('hidden');
});

closeMenuButton.addEventListener('click', () => {
    menu.classList.add('hidden');
});

rollDiceButton.addEventListener('click', () => {
    const playerName = playerNameInput.value.trim();
    const diceType = parseInt(diceSelect.value);
    const roll = Math.floor(Math.random() * diceType) + 1;

    if (!playerName) {
        alert("Por favor, insira o nome do jogador!");
        return;
    }

    if (!playerScores[playerName]) {
        playerScores[playerName] = 0;
    }
    playerScores[playerName] += roll;

    const listItem = document.createElement('li');
    listItem.textContent = `${playerName} = D${diceType}: ${roll} (Total: ${playerScores[playerName]})`;
    rollList.appendChild(listItem);

    totalDisplay.textContent = `Total geral: ${Object.values(playerScores).reduce((a, b) => a + b, 0)}`;
});

clearRollsButton.addEventListener('click', () => {
    playerScores = {};
    rollList.innerHTML = '';
    totalDisplay.textContent = 'Total geral: 0';
});

// ========================
// Sistema de Armas
// ========================

// Base de dados das armas organizada por era
const armasData = {
    pedra: [
        {
            id: 'pedra-espada',
            nome: 'Espada de Pedra',
            dano: '3d10+15',
            ct: null,
            criticos: null,
            descricao: 'Uma lâmina rudimentar, lascada a partir de uma rocha plana. A empunhadura é um pedaço de madeira envolvido em couro cru, oferecendo uma aderência firme, mas áspera. Suas bordas são afiadas de forma irregular, mas robustas o suficiente para o combate.',
            passiva: null
        },
        {
            id: 'pedra-espada-longa',
            nome: 'Espada Longa de Pedra',
            dano: '4d10+15',
            ct: null,
            criticos: null,
            descricao: 'Uma versão alongada da espada de pedra, com uma lâmina de pedra maior e mais pesada. Requer duas mãos para ser empunhada com eficácia, e seu peso desequilibrado torna cada golpe um esforço físico. O cabo é grosso, para suportar a tensão.',
            passiva: null
        },
        {
            id: 'pedra-claymore',
            nome: 'Claymore de Pedra',
            dano: '4d10+20',
            ct: null,
            criticos: null,
            descricao: 'Uma massa imponente de rocha polida e lascada, quase do tamanho de um homem. Sua lâmina bruta e larga termina em uma ponta cega. O cabo de madeira é reforçado e serve mais como um contrapeso do que como uma empunhadura refinada.',
            passiva: null
        },
        {
            id: 'pedra-bengala',
            nome: 'Bengala de Pedra',
            dano: '2d12+15',
            ct: null,
            criticos: null,
            descricao: 'Uma bengala de madeira com uma pedra oval e pesada presa firmemente na ponta. O corpo da bengala é simples e liso, enquanto a cabeça de pedra é uma ferramenta de impacto direta e sem adornos, feita para esmagar.',
            passiva: null
        },
        {
            id: 'pedra-lanca',
            nome: 'Lança de Pedra',
            dano: '3d12+10',
            ct: null,
            criticos: null,
            descricao: 'Uma ponta de pedra, longa e pontiaguda, fixada com tendões ou tiras de couro na extremidade de um eixo de madeira reta. Sua forma é aerodinâmica para o arremesso, mas a pedra lascada a torna pesada e difícil de equilibrar em combate corpo a corpo.',
            passiva: null
        },
        {
            id: 'pedra-martelo',
            nome: 'Martelo de Pedra',
            dano: '4d10',
            ct: null,
            criticos: null,
            descricao: 'Um martelo de guerra primitivo, composto por uma cabeça de rocha maciça e angular, presa a um cabo curto e resistente. A cabeça é simplesmente uma pedra pesada, escolhida por seu peso e capacidade de esmagar, sem nenhum polimento ou design especial.',
            passiva: null
        },
        {
            id: 'pedra-machado',
            nome: 'Machado de Pedra',
            dano: '3d12+15',
            ct: null,
            criticos: null,
            descricao: 'Uma grande cabeça de pedra, afiada de um lado e com um topo rombudo, montada em um cabo de madeira robusto. O encaixe é rústico, e a lâmina, embora funcional, é mais propensa a lascar do que a cortar limpidamente.',
            passiva: null
        },
        {
            id: 'pedra-pa',
            nome: 'Pá de Pedra',
            dano: '2d10+5',
            ct: null,
            criticos: null,
            descricao: 'Uma ferramenta híbrida e uma arma improvisada. A cabeça de pedra é larga e ligeiramente côncava, presa a um cabo longo. É mais pesada do que uma pá comum e pode ser usada para golpear ou escavar.',
            passiva: null
        },
        {
            id: 'pedra-gancho',
            nome: 'Gancho de Pedra',
            dano: '1d12+10',
            ct: null,
            criticos: null,
            descricao: 'Um gancho de rocha curvada e polida, com uma ponta afiada, preso a um cabo de madeira curto. É uma arma de combate ágil, feita para arrancar e perfurar, mas sua forma irregular pode dificultar o manuseio.',
            passiva: null
        },
        {
            id: 'pedra-foice',
            nome: 'Foice de Pedra',
            dano: '2d12+15',
            ct: null,
            criticos: null,
            descricao: 'Uma lâmina em forma de crescente, lascada de pedra e montada em um cabo de madeira. Embora tenha uma forma funcional, suas bordas são irregulares, o que a torna mais uma arma de corte e rasgo do que de corte limpo.',
            passiva: null
        },
        {
            id: 'pedra-arco',
            nome: 'Arco de Madeira',
            dano: '3d10+5',
            ct: null,
            criticos: null,
            descricao: 'Diferentemente das outras armas, o arco é feito de madeira flexível e uma corda de tendão. A madeira é entalhada de forma simples, mas eficaz. Não há adornos, apenas a forma crua necessária para atirar flechas.',
            passiva: null
        },
        {
            id: 'pedra-adaga',
            nome: 'Adaga de Pedra',
            dano: '2d10+10',
            ct: null,
            criticos: null,
            descricao: 'A menor das armas de pedra. A lâmina é um fragmento de rocha afiado, preso a um cabo pequeno, feito para caber na palma da mão. É leve e ideal para perfurar em curtas distâncias, embora sua fragilidade seja notável.',
            passiva: null
        },
        {
            id: 'pedra-clava',
            nome: 'Clava de Pedra',
            dano: '3d8+15',
            ct: null,
            criticos: null,
            descricao: 'Uma clava com uma cabeça de pedra volumosa e arredondada, montada em um cabo de madeira. É uma arma de impacto puro, sem arestas, feita para causar dano contundente com sua massa bruta.',
            passiva: null
        },
        {
            id: 'pedra-escudo',
            nome: 'Escudo de Pedra',
            dano: '1d10',
            ct: null,
            criticos: null,
            descricao: 'Um escudo simples e pesado, esculpido em uma laje de pedra grossa. Possui uma empunhadura de couro cru ou uma alça simples na parte de trás. Embora ofereça grande proteção, seu peso e falta de mobilidade limitam o movimento do usuário.',
            passiva: null
        },
        {
            id: 'pedra-tridente',
            nome: 'Tridente de Pedra',
            dano: '3d12+15',
            ct: null,
            criticos: null,
            descricao: 'Uma arma de combate longa, com três pontas de pedra afiadas presas a um eixo de madeira. Cada ponta é lascada com cuidado, mas as três juntas tornam a arma pesada e desafiadora de empunhar.',
            passiva: null
        },
        {
            id: 'pedra-maca-guerra',
            nome: 'Maça de Guerra de Pedra',
            dano: '4d8+15',
            ct: null,
            criticos: null,
            descricao: 'Uma maça com uma cabeça de rocha pesada e irregular, reforçada com saliências pontiagudas, presa a um cabo curto e resistente. É uma arma brutal, projetada para esmagar armaduras rudimentares e ossos.',
            passiva: null
        },
        {
            id: 'pedra-gladio',
            nome: 'Gládio de Pedra',
            dano: '3d10',
            ct: null,
            criticos: null,
            descricao: 'Uma versão curta e larga da espada de pedra. Sua lâmina é robusta e reta, feita para perfurar e cortar em combate a curta distância, mas a pedra limita sua flexibilidade.',
            passiva: null
        },
        {
            id: 'pedra-machadinha',
            nome: 'Machadinha de Pedra',
            dano: '2d12',
            ct: null,
            criticos: null,
            descricao: 'Uma versão menor do machado de pedra, ideal para uso com uma mão. A cabeça de pedra é mais leve e o cabo mais curto, permitindo movimentos mais rápidos e precisos.',
            passiva: null
        },
        {
            id: 'pedra-cimitarra',
            nome: 'Cimitarra de Pedra',
            dano: '2d12+15',
            ct: null,
            criticos: null,
            descricao: 'Uma lâmina de pedra curva, com uma única borda afiada, montada em um cabo. A forma curva é funcional, mas a natureza da pedra a torna propensa a quebrar.',
            passiva: null
        },
        {
            id: 'pedra-mangual',
            nome: 'Mangual de Pedra',
            dano: '3d8+10',
            ct: null,
            criticos: null,
            descricao: 'Uma arma com uma pequena pedra esférica, presa a uma corrente curta de couro ou fibra e a um cabo. A pedra é levemente esculpida e serve como um contrapeso de impacto.',
            passiva: null
        },
        {
            id: 'pedra-mangual-pesado',
            nome: 'Mangual Pesado de Pedra',
            dano: '3d8+15',
            ct: null,
            criticos: null,
            descricao: 'Similar ao mangual de pedra, mas com uma cabeça de rocha muito maior e mais pesada. A corrente de couro é grossa e o cabo, reforçado, para suportar o peso da pedra.',
            passiva: null
        },
        {
            id: 'pedra-martelo-guerra',
            nome: 'Martelo de Guerra de Pedra',
            dano: '4d10+15',
            ct: null,
            criticos: null,
            descricao: 'Uma variante mais longa e refinada do martelo de pedra. A cabeça é montada em um cabo de duas mãos, e a rocha é mais simétrica, permitindo golpes mais controlados e poderosos.',
            passiva: null
        },
        {
            id: 'pedra-marreta',
            nome: 'Marreta de Pedra',
            dano: '3d8+10',
            ct: null,
            criticos: null,
            descricao: 'Uma marreta grande e pesada, com uma cabeça de rocha maciça e cega. Montada em um cabo longo, é uma arma de duas mãos feita para impacto esmagador.',
            passiva: null
        },
        {
            id: 'pedra-alfange',
            nome: 'Alfange de Pedra',
            dano: '3d12+5',
            ct: null,
            criticos: null,
            descricao: 'Uma lâmina de pedra larga e curva, com uma ponta larga. É uma arma de corte pesado, mas a natureza da pedra a torna pesada e difícil de manusear com agilidade.',
            passiva: null
        },
        {
            id: 'pedra-cajado',
            nome: 'Cajado de Batalha de Pedra',
            dano: '1d12+10',
            ct: null,
            criticos: null,
            descricao: 'Um cajado longo e liso, com um cristal de pedra na ponta. Embora possa ser usado como arma, a pedra é mais pesada do que um cajado comum.',
            passiva: null
        },
        {
            id: 'pedra-katana',
            nome: 'Katana de Pedra',
            dano: '3d12+15',
            ct: null,
            criticos: null,
            descricao: 'Uma lâmina de pedra longa e fina, com uma leve curvatura. Sua construção é mais elaborada, feita para ser mais afiada e rápida, mas a fragilidade da pedra a torna uma arma arriscada.',
            passiva: null
        }
    ],

    ferro: [
        {
            id: 'ferro-espada',
            nome: 'Espada de Ferro',
            dano: '4d10+15',
            ct: '19',
            criticos: '+3D6',
            descricao: 'Forjada a partir do robusto minério de ferro, esta espada representa um salto tecnológico. Sua lâmina é mais afiada e resistente que a de pedra, permitindo golpes mais precisos. A dureza do material confere-lhe uma chance maior de acertos críticos e permite que seja forjada com outros minérios para aprimoramentos futuros.',
            passiva: null
        },
        {
            id: 'ferro-espada-longa',
            nome: 'Espada Longa de Ferro',
            dano: '5d10+10',
            ct: '19',
            criticos: '+4D6',
            descricao: 'Uma versão alongada da espada de ferro, balanceada para ser usada com as duas mãos. Seu design e peso permitem desferir golpes poderosos, e sua estrutura mais estável aumenta a probabilidade de acertos críticos. É uma das primeiras armas a demonstrar a versatilidade do ferro na criação de armas de grande porte.',
            passiva: null
        },
        {
            id: 'ferro-claymore',
            nome: 'Claymore de Ferro',
            dano: '5d10+15',
            ct: '20',
            criticos: '+2D6',
            descricao: 'Uma massa imponente de ferro forjado. A lâmina bruta e larga termina em uma ponta cega. O cabo de madeira é reforçado e serve mais como um contrapeso do que como uma empunhadura refinada.',
            passiva: null
        },
        {
            id: 'ferro-bengala',
            nome: 'Bengala de Ferro',
            dano: '3d12+15',
            ct: '18',
            criticos: '+3D6',
            descricao: 'Uma bengala de madeira com uma cabeça de ferro oval e pesada presa firmemente na ponta. O corpo da bengala é simples e liso, enquanto a cabeça de ferro é uma ferramenta de impacto direta e sem adornos, feita para esmagar.',
            passiva: null
        },
        {
            id: 'ferro-lanca',
            nome: 'Lança de Ferro',
            dano: '3d10+20',
            ct: '18',
            criticos: '+4D6',
            descricao: 'Uma ponta de ferro, longa e pontiaguda, fixada com tendões ou tiras de couro na extremidade de um eixo de madeira reta. Sua forma é aerodinâmica para o arremesso, e o ferro a torna pesada e difícil de equilibrar em combate corpo a corpo.',
            passiva: null
        },
        {
            id: 'ferro-martelo',
            nome: 'Martelo de Ferro',
            dano: '4d10+15',
            ct: '20',
            criticos: '+2D8',
            descricao: 'Um martelo de guerra primitivo, composto por uma cabeça de ferro maciça e angular, presa a um cabo curto e resistente. A cabeça é simplesmente uma peça pesada, escolhida por seu peso e capacidade de esmagar, sem nenhum polimento ou design especial.',
            passiva: null
        },
        {
            id: 'ferro-machado',
            nome: 'Machado de Ferro',
            dano: '4d12+20',
            ct: '18',
            criticos: '+3D6',
            descricao: 'Uma grande cabeça de ferro, afiada de um lado e com um topo rombudo, montada em um cabo de madeira robusto. O encaixe é rústico, e a lâmina, embora funcional, é mais propensa a lascar do que a cortar limpidamente.',
            passiva: null
        },
        {
            id: 'ferro-pa',
            nome: 'Pá de Ferro',
            dano: '2d10+20',
            ct: '17',
            criticos: '+2D8',
            descricao: 'Uma ferramenta híbrida e uma arma improvisada. A cabeça de ferro é larga e ligeiramente côncava, presa a um cabo longo. É mais pesada do que uma pá comum e pode ser usada para golpear ou escavar.',
            passiva: null
        },
        {
            id: 'ferro-gancho',
            nome: 'Gancho de Ferro',
            dano: '3d12+5',
            ct: '18',
            criticos: '+3D6',
            descricao: 'Um gancho de ferro curvado e polido, com uma ponta afiada, preso a um cabo de madeira curto. É uma arma de combate ágil, feita para arrancar e perfurar, mas sua forma irregular pode dificultar o manuseio.',
            passiva: null
        },
        {
            id: 'ferro-foice',
            nome: 'Foice de Ferro',
            dano: '3d12+15',
            ct: '18',
            criticos: '+4D6',
            descricao: 'Uma lâmina em forma de crescente, forjada em ferro e montada em um cabo de madeira. Embora tenha uma forma funcional, suas bordas são irregulares, o que a torna mais uma arma de corte e rasgo do que de corte limpo.',
            passiva: null
        },
        {
            id: 'ferro-arco',
            nome: 'Arco de Madeira Refinado',
            dano: '5d10+15',
            ct: '19',
            criticos: '+2D6',
            descricao: 'Diferentemente das outras armas, o arco é feito de madeira flexível e uma corda de tendão. A madeira é entalhada de forma simples, mas eficaz. Não há adornos, apenas a forma crua necessária para atirar flechas.',
            passiva: null
        },
        {
            id: 'ferro-adaga',
            nome: 'Adaga de Ferro',
            dano: '3d10+10',
            ct: '17',
            criticos: '+2D6',
            descricao: 'A menor das armas de ferro. A lâmina é um fragmento de ferro afiado, preso a um cabo pequeno, feito para caber na palma da mão. É leve e ideal para perfurar em curtas distâncias, embora sua fragilidade seja notável.',
            passiva: null
        },
        {
            id: 'ferro-clava',
            nome: 'Clava de Ferro',
            dano: '5d8+15',
            ct: '19',
            criticos: '+2D8',
            descricao: 'Uma clava com uma cabeça de ferro volumosa e arredondada, montada em um cabo de madeira. É uma arma de impacto puro, sem arestas, feita para causar dano contundente com sua massa bruta.',
            passiva: null
        },
        {
            id: 'ferro-escudo',
            nome: 'Escudo de Ferro',
            dano: '2d10+10',
            ct: '20',
            criticos: '+1D6',
            descricao: 'Um escudo simples e pesado, esculpido em uma laje de ferro grossa. Possui uma empunhadura de couro cru ou uma alça simples na parte de trás. Embora ofereça grande proteção, seu peso e falta de mobilidade limitam o movimento do usuário.',
            passiva: null
        },
        {
            id: 'ferro-tridente',
            nome: 'Tridente de Ferro',
            dano: '4d12+15',
            ct: '18',
            criticos: '+3D6',
            descricao: 'Uma arma de combate longa, com três pontas de ferro afiadas presas a um eixo de madeira. Cada ponta é forjada com cuidado, mas as três juntas tornam a arma pesada e desafiadora de empunhar.',
            passiva: null
        },
        {
            id: 'ferro-maca-guerra',
            nome: 'Maça de Guerra de Ferro',
            dano: '6d8+5',
            ct: '20',
            criticos: '+2D8',
            descricao: 'Uma maça com uma cabeça de ferro pesada e irregular, reforçada com saliências pontiagudas, presa a um cabo curto e resistente. É uma arma brutal, projetada para esmagar armaduras rudimentares e ossos.',
            passiva: null
        },
        {
            id: 'ferro-gladio',
            nome: 'Gládio de Ferro',
            dano: '4d10+10',
            ct: '17',
            criticos: '+2D6',
            descricao: 'Uma versão curta e larga da espada de ferro. Sua lâmina é robusta e reta, feita para perfurar e cortar em combate a curta distância, mas o ferro limita sua flexibilidade.',
            passiva: null
        },
        {
            id: 'ferro-machadinha',
            nome: 'Machadinha de Ferro',
            dano: '3d12',
            ct: '18',
            criticos: '+3D6',
            descricao: 'Uma versão menor do machado de ferro, ideal para uso com uma mão. A cabeça de ferro é mais leve e o cabo mais curto, permitindo movimentos mais rápidos e precisos.',
            passiva: null
        },
        {
            id: 'ferro-cimitarra',
            nome: 'Cimitarra de Ferro',
            dano: '4d12',
            ct: '17',
            criticos: '+3D6',
            descricao: 'Uma lâmina de ferro curva, com uma única borda afiada, montada em um cabo. A forma curva é funcional, mas a natureza do ferro a torna propensa a quebrar.',
            passiva: null
        },
        {
            id: 'ferro-mangual',
            nome: 'Mangual de Ferro',
            dano: '4d8+5',
            ct: '20',
            criticos: '+2D8',
            descricao: 'Uma arma com uma pequena esfera de ferro, presa a uma corrente curta de couro ou fibra e a um cabo. O ferro é levemente esculpido e serve como um contrapeso de impacto.',
            passiva: null
        },
        {
            id: 'ferro-martelo-guerra',
            nome: 'Martelo de Guerra de Ferro',
            dano: '6d8+20',
            ct: '20',
            criticos: '+1D8',
            descricao: 'Uma variante mais longa e refinada do martelo de ferro. A cabeça é montada em um cabo de duas mãos, e o ferro é mais simétrico, permitindo golpes mais controlados e poderosos.',
            passiva: null
        },
        {
            id: 'ferro-alfange',
            nome: 'Alfange de Ferro',
            dano: '4d12',
            ct: '19',
            criticos: '+2D6',
            descricao: 'Uma lâmina de ferro larga e curva, com uma ponta larga. É uma arma de corte pesado, mas a natureza do ferro a torna pesada e difícil de manusear com agilidade.',
            passiva: null
        },
        {
            id: 'ferro-cajado',
            nome: 'Cajado de Batalha de Ferro',
            dano: '2d12',
            ct: '20',
            criticos: '+1D6',
            descricao: 'Um cajado longo e liso, com um cristal de ferro na ponta. Embora possa ser usado como arma, o ferro é mais pesado do que um cajado comum.',
            passiva: null
        },
        {
            id: 'ferro-katana',
            nome: 'Katana de Ferro',
            dano: '4d12',
            ct: '18',
            criticos: '+3D6',
            descricao: 'Uma lâmina de ferro longa e fina, com uma leve curvatura. Sua construção é mais elaborada, feita para ser mais afiada e rápida, mas a fragilidade do ferro a torna uma arma arriscada.',
            passiva: null
        },
        {
            id: 'ferro-manoplas',
            nome: 'Manoplas de Ferro',
            dano: '2d10+10',
            ct: '20',
            criticos: '+1D8',
            descricao: 'Manoplas de ferro reforçadas, usadas para combate corpo a corpo. O ferro protege as mãos e aumenta a força de cada soco, tornando os ataques de impacto mais eficazes.',
            passiva: null
        },
        {
            id: 'ferro-pistola',
            nome: 'Pistola de Pederneira',
            dano: '4d10+15',
            ct: '18',
            criticos: '+3D',
            descricao: 'Uma arma de fogo de um único tiro, com um mecanismo de pederneira para disparar. A pederneira causa uma explosão controlada, e o projétil de metal é impulsionado com força, causando um dano massivo em pontos vitais.',
            passiva: null
        },
        {
            id: 'ferro-mosquete',
            nome: 'Mosquete de Pederneira',
            dano: '8d6+5',
            ct: '19',
            criticos: '+4D',
            descricao: 'Um mosquete de cano longo com um mecanismo de pederneira. Seu tamanho e peso permitem maior alcance e precisão, e o projétil de metal é capaz de penetrar alvos distantes com grande força.',
            passiva: null
        },
        {
            id: 'ferro-espingarda',
            nome: 'Espingarda de Cano Serrado',
            dano: '5d12+10',
            ct: '17',
            criticos: '+2D',
            descricao: 'Uma espingarda de cano curto, ideal para combate a curta distância. O cano serrado aumenta a dispersão dos projéteis, causando danos em uma área maior, e a alta chance de acerto crítico compensa o alcance limitado.',
            passiva: null
        },
        {
            id: 'ferro-besta-pesada',
            nome: 'Besta/Arcabuz Pesado',
            dano: '4d12',
            ct: '19',
            criticos: '+2D',
            descricao: 'Uma besta de ferro pesada, com um design robusto que permite disparar virotes com mais força. A estrutura de ferro é mais forte, permitindo que a besta armazene mais energia e dispare projéteis com maior potência.',
            passiva: null
        },
        {
            id: 'ferro-pistola-mao',
            nome: 'Pistola de Mão de Uma Carga',
            dano: '4d10+15',
            ct: '18',
            criticos: '+2D',
            descricao: 'Uma pistola de um único tiro, com uma câmara de ferro reforçada. A arma é simples, mas poderosa, e o projétil de metal é impulsionado com grande força, causando um dano considerável.',
            passiva: null
        },
        {
            id: 'ferro-escopeta-mao',
            nome: 'Escopeta de Mão',
            dano: '9d6+5',
            ct: '20',
            criticos: '+3D',
            descricao: 'Uma escopeta compacta, ideal para combate a curta distância. A arma dispara um projétil de metal em uma área ampla, causando dano devastador e aumentando a chance de acerto crítico.',
            passiva: null
        },
        {
            id: 'ferro-besta-repeticao',
            nome: 'Besta de Repetição',
            dano: '3d10',
            ct: '17',
            criticos: '+2D',
            descricao: 'Uma besta de ferro com um mecanismo de repetição, permitindo disparos rápidos. A estrutura de ferro é mais resistente, e o mecanismo é mais preciso, aumentando a chance de acerto crítico.',
            passiva: null
        },
        {
            id: 'ferro-olho-alcance',
            nome: 'Olho do Alcance',
            dano: '5d10',
            ct: '20',
            criticos: '+3D',
            descricao: 'Uma besta de ferro com um visor acoplado, que permite maior precisão em longas distâncias. O visor é um cristal polido que amplia a visão, e a estrutura de ferro é mais resistente, permitindo disparos precisos e com maior potencial de dano crítico.',
            passiva: null
        },
        {
            id: 'ferro-granada',
            nome: 'Granada de Pólvora',
            dano: '6d6+5',
            ct: '20',
            criticos: '+4D',
            descricao: 'Uma granada de ferro com uma carga de pólvora. O projétil explode ao contato, causando dano em uma área e atingindo múltiplos alvos. A granada é uma arma explosiva, e o dano extra é amplificado pela natureza da explosão.',
            passiva: null
        },
        {
            id: 'ferro-frasco-oleo',
            nome: 'Frasco de Óleo Flamejante',
            dano: '3d8+10',
            ct: '18',
            criticos: '+3D',
            descricao: 'Um frasco de vidro com óleo inflamável. O frasco quebra ao contato, espalhando óleo flamejante que causa dano em uma área e aumenta o dano de outros ataques. O dano extra é amplificado pela natureza do fogo.',
            passiva: null
        },
        {
            id: 'ferro-canhao',
            nome: 'Canhão de Mão',
            dano: '7d8+20',
            ct: '19',
            criticos: '+3D',
            descricao: 'Um canhão de mão de ferro, com um design mais pesado e robusto. O canhão é capaz de disparar projéteis de grande porte, causando um dano massivo em um único ponto. O dano extra é amplificado pela natureza do projétil.',
            passiva: null
        }
    ],

    aco: [
        {
            id: 'aco-espada',
            nome: 'Espada de Aço',
            dano: '5d10+20',
            ct: '18',
            criticos: '+4D6',
            descricao: 'Forjada em aço, já possui uma passiva.',
            passiva: 'Instinto de Guerreiro - Você causa +1D de dano e o efeito Sangrando em Feras ou animais.'
        },
        {
            id: 'aco-espada-longa',
            nome: 'Espada Longa de Aço',
            dano: '6d10+20',
            ct: '18',
            criticos: '+5D6',
            descricao: 'Forjada em aço, já possui uma passiva.',
            passiva: 'Guerreiro da Espada - Possui uma taxa de letalidade maior, causa +1D de dano em inimigos com armadura quebradas.'
        },
        {
            id: 'aco-claymore',
            nome: 'Claymore de Aço',
            dano: '6d10+25',
            ct: '19',
            criticos: '+3D6',
            descricao: 'Forjada em aço, já possui uma passiva.',
            passiva: 'Carrasco da Espada: Ganha uma ação livre de finalizar um alvo, recebendo +15 de vida temporária + (For)=5 de vida.'
        },
        {
            id: 'aco-adaga',
            nome: 'Adaga de Aço',
            dano: '4d10+15',
            ct: '16',
            criticos: '+3D6',
            descricao: 'Forjada em aço, já possui uma passiva.',
            passiva: 'Trapaceiro: Ataques em inimigos desprevenidos ou por costas causam efeito sangrando de 1d12 acumulável por 1d4 de rodadas.'
        },
        {
            id: 'aco-gladio',
            nome: 'Gládio de Aço',
            dano: '5d10+15',
            ct: '16',
            criticos: '+3D6',
            descricao: 'Forjado em aço, já possui uma passiva.',
            passiva: 'Nascido de Gládia: Gládios ou seres aliados ganham +2 dados de dano contra inimigos da nação.'
        },
        {
            id: 'aco-cimitarra',
            nome: 'Cimitarra de Aço',
            dano: '5d12+5',
            ct: '16',
            criticos: '+4D6',
            descricao: 'Forjada em aço, já possui uma passiva.',
            passiva: 'Focado na guerra: Após eliminar um alvo grande, ganha uma reação extra temporária acumulável, ao gastar a reação ela perde um estoque, podendo ser qualquer reação.'
        },
        {
            id: 'aco-alfange',
            nome: 'Alfange de Aço',
            dano: '4d12+10',
            ct: '18',
            criticos: '+3D6',
            descricao: 'Forjada em aço, já possui uma passiva.',
            passiva: 'Marinheiro: Lutar em navios fornece um bônus de luta +5 em acertos.'
        },
        {
            id: 'aco-katana',
            nome: 'Katana de Aço',
            dano: '5d12+10',
            ct: '17',
            criticos: '+4D6',
            descricao: 'Forjada em aço, já possui uma passiva.',
            passiva: 'Lutador da paz: Após um inimigo receber dano e entrar estado morrendo em seu campo visão, ganha +1D de crítico acumulável até o seu próximo ataque, ao gastar um ataque perde todos os estoques.'
        },
        {
            id: 'aco-bengala',
            nome: 'Bengala de Aço',
            dano: '4d12+20',
            ct: '17',
            criticos: '+4D6',
            descricao: 'Forjada em aço, já possui uma passiva.',
            passiva: 'Controlador: Ganha +5 em ações que envolvam equilíbrio e em reações que envolvam imobilizar ou derrubar.'
        },
        {
            id: 'aco-lanca',
            nome: 'Lança de Aço',
            dano: '4d10+25',
            ct: '17',
            criticos: '+5D6',
            descricao: 'Forjada em aço, já possui uma passiva.',
            passiva: 'Tática Primal: Atacar um alvo que já foi atacado por aliados, fornece +2 dados de dano em posições de cortes ou ferimentos expostos.'
        },
        {
            id: 'aco-tridente',
            nome: 'Tridente de Aço',
            dano: '5d12+20',
            ct: '17',
            criticos: '+4D6',
            descricao: 'Forjado em aço, já possui uma passiva.',
            passiva: 'Gladiador de Dores: Durante um combate, enquanto atacar um alvo atordoado pode escolher causar 1d12 de sangramento ou o efeito de vulnerabilidade em -5 em reações físicas.'
        },
        {
            id: 'aco-clava',
            nome: 'Clava de Aço',
            dano: '6d8+20',
            ct: '18',
            criticos: '+3D8',
            descricao: 'Forjada em aço, já possui uma passiva.',
            passiva: 'Ataque Pesado: Acertos críticos em inimigos causam o efeito vulnerável, infligindo -5 em reações físicas, além de +1D de dano maior.'
        },
        {
            id: 'aco-maca-guerra',
            nome: 'Maça de Guerra de Aço',
            dano: '7d8+10',
            ct: '19',
            criticos: '+3D8',
            descricao: 'Forjada em aço, já possui uma passiva.',
            passiva: 'Ataque poderoso: Acertos críticos em inimigos causam o efeito atordoado, além de causar +1 dado de dano de algum efeito, após ser atordoado.'
        },
        {
            id: 'aco-mangual',
            nome: 'Mangual de Aço',
            dano: '5d8+10',
            ct: '19',
            criticos: '+3D8',
            descricao: 'Forjado em aço, já possui uma passiva.',
            passiva: 'Determinação poderosa: Concede roubo de vida em ataques, curando +5 de vida a cada 30 pontos de dano de sua origem, vinda da arma.'
        },
        {
            id: 'aco-mangual-pesado',
            nome: 'Mangual Pesado de Aço',
            dano: '4d8+20',
            ct: '20',
            criticos: '+2D8',
            descricao: 'Forjado em aço, já possui uma passiva.',
            passiva: 'Determinação Inabalável: Concede +1d6 de determinação em ataques, após atacar um alvo atordoado, para aliados adjacentes.'
        },
        {
            id: 'aco-machado',
            nome: 'Machado de Aço',
            dano: '5d12+25',
            ct: '17',
            criticos: '+4D6',
            descricao: 'Forjado em aço, já possui uma passiva.',
            passiva: 'Limiar de dano: Atacar alvos sofrendo alguma condição, diminuem a margem de crítico em 1.'
        },
        {
            id: 'aco-martelo',
            nome: 'Martelo de Aço',
            dano: '5d10+20',
            ct: '19',
            criticos: '+3D8',
            descricao: 'Forjado em aço, já possui uma passiva.',
            passiva: 'Peso da Velocidade: Causa +2 dados de dano em alvos que estiverem em alta velocidade, como em um encontrão ou ataque rápido.'
        },
        {
            id: 'aco-martelo-guerra',
            nome: 'Martelo de Guerra de Aço',
            dano: '7d8+25',
            ct: '19',
            criticos: '+2D8',
            descricao: 'Forjado em aço, já possui uma passiva.',
            passiva: 'Peso da força: Causa +2 dados de dano em encontrões ou avanços para frente com a arma.'
        },
        {
            id: 'aco-machadinha',
            nome: 'Machadinha de Aço',
            dano: '4d12+5',
            ct: '17',
            criticos: '+4D6',
            descricao: 'Forjada em aço, já possui uma passiva.',
            passiva: 'Caçador de Alvos: Causa +2 dados de dano em alvos sangrando.'
        },
        {
            id: 'aco-pa',
            nome: 'Pá de Aço',
            dano: '3d10+25',
            ct: '16',
            criticos: '+3D8',
            descricao: 'Forjada em aço, já possui uma passiva.',
            passiva: 'Contra sujeiras: Causa +1 dado de dano em inimigos de origem terrestre ou escavadora.'
        },
        {
            id: 'aco-gancho',
            nome: 'Gancho de Aço',
            dano: '4d12+10',
            ct: '17',
            criticos: '+4D6',
            descricao: 'Forjado em aço, já possui uma passiva.',
            passiva: 'Instinto de Açougueiro: Causa o efeito sangrando causando 1d12 de sangramento acumulativo, sempre que acertar em alvos marcados.'
        },
        {
            id: 'aco-foice',
            nome: 'Foice de Aço',
            dano: '4d12+20',
            ct: '17',
            criticos: '+5D6',
            descricao: 'Forjada em aço, já possui uma passiva.',
            passiva: 'Instinto do Ceifador: Causa 2 dados de dano adicionais contra alvos vulneráveis ou com vida em estágio machucado ou próximos do estado morrendo (30%).'
        },
        {
            id: 'aco-marreta',
            nome: 'Marreta de Aço',
            dano: '4d8+15',
            ct: '19',
            criticos: '+4D8',
            descricao: 'Forjada em aço, já possui uma passiva.',
            passiva: 'Batedor: Causa +1 Dado de dano contra animais atordoados.'
        },
        {
            id: 'aco-cajado',
            nome: 'Cajado de Batalha de Aço',
            dano: '3d12+5',
            ct: '19',
            criticos: '+2D6',
            descricao: 'Forjado em aço, já possui uma passiva.',
            passiva: 'Mago de Campo: Fornece um bônus de +5 em manifestação Arcana elemental.'
        },
        {
            id: 'aco-escudo',
            nome: 'Escudo de Aço',
            dano: '3d10+15',
            ct: '19',
            criticos: '+2D6',
            descricao: 'Forjado em aço, já possui uma passiva.',
            passiva: 'Escudeiro: Ganha +5 em reações físicas, além de poder bloquear projéteis.'
        },
        {
            id: 'aco-manoplas',
            nome: 'Manoplas de Aço',
            dano: '3d10+15',
            ct: '19',
            criticos: '+2D8',
            descricao: 'Forjadas em aço, já possuem uma passiva.',
            passiva: 'Socador: Concede +5 em acertos de luta corpo a corpo em inimigos menores ou igual ao tamanho proporcional do portador.'
        },
        {
            id: 'aco-arco',
            nome: 'Arco de Aço',
            dano: '6d10+20',
            ct: '18',
            criticos: '+3D6',
            descricao: 'Forjado em aço, já possui uma passiva.',
            passiva: 'Margem do atirador: Ganha +2 dados de dano em acertos contra inimigos marcados, além de diminuir a margem de crítico em 1, contra alvos muito distantes.'
        },
        {
            id: 'aco-escopeta-mao',
            nome: 'Escopeta de Mão Aprimorada',
            dano: '10d6+10',
            ct: '19',
            criticos: '+4D',
            descricao: 'Aprimorada em aço, já possui uma passiva.',
            passiva: 'Caçadora: Ganha +2 dados de dano contra alvos marcados, além de causar mais 1 dado de crítico a cada 30 de dano causado.'
        },
        {
            id: 'aco-besta-repeticao',
            nome: 'Besta de Repetição de Aço',
            dano: '4d10+5',
            ct: '16',
            criticos: '+3D',
            descricao: 'Forjada em aço, já possui uma passiva.',
            passiva: 'Perfurador: Causa +2 dados de dano em inimigos que estejam protegendo ou possuem armaduras pesadas. Além de causar +2 D de crítico em alvos marcados.'
        },
        {
            id: 'aco-olho-alcance',
            nome: 'Olho do Alcance Aprimorado',
            dano: '6d10+5',
            ct: '19',
            criticos: '+4D',
            descricao: 'Aprimorado em aço, já possui uma passiva.',
            passiva: 'Olho do Alcance: Fornece um bônus de +5 em acertos de longa distância, além de aumentar +2D de dano, ao mirar por uma rodada.'
        },
        {
            id: 'aco-canhao-mao',
            nome: 'Canhão de Mão Aprimorado',
            dano: '8d8+25',
            ct: '18',
            criticos: '+4D',
            descricao: 'Aprimorado em aço, já possui uma passiva.',
            passiva: 'Canhão de Mão: Causa um grande impacto no alvo, fazendo com que ele se afaste em 5 metros, além de conceder um dano extra de +1D de dano para cada 50 pontos de dano causado. Além de causar 200% a mais de dano em construções.'
        },
        {
            id: 'aco-granada-polvora',
            nome: 'Granada de Pólvora Refinada',
            dano: '7d6+10',
            ct: '19',
            criticos: '+5D',
            descricao: 'Refinada em aço, já possui uma passiva.',
            passiva: 'Granada de Pólvora: Causa um dano de área em 3 metros, e causa o efeito "Queimando" no alvo, causando 1d6 de dano a cada rodada.'
        },
        {
            id: 'aco-frasco-oleo',
            nome: 'Frasco de Óleo Flamejante Aprimorado',
            dano: '4d8+15',
            ct: '17',
            criticos: '+4D',
            descricao: 'Aprimorado em aço, já possui uma passiva.',
            passiva: 'Frasco de Óleo: Causa um dano de fogo em área de 2 metros, e inflige o efeito "Queimando" no alvo, causando 1d4 de dano a cada rodada.'
        },
        {
            id: 'aco-ak12',
            nome: 'AK-12 (Assalto)',
            dano: '7d10+20',
            ct: '18',
            criticos: '+2D',
            descricao: 'Rifle de assalto forjado em aço.',
            passiva: 'Rajada de Fogo: A cada acerto, causa +1 dado de dano de fogo (1d6), acumulando até 5 dados de dano adicional para cada acerto. Ao atingir o limite, o próximo ataque causa +2d6 de dano de fogo adicional, chegando ao fim dos estoques.'
        },
        {
            id: 'aco-m4a1',
            nome: 'M4A1 (Assalto)',
            dano: '6d10+25',
            ct: '17',
            criticos: '+3D',
            descricao: 'Rifle de assalto forjado em aço.',
            passiva: 'Munição Perfurante: Concede +5 em testes de pontaria contra inimigos com armaduras pesadas ou criaturas com carapaças grandes.'
        },
        {
            id: 'aco-mp5',
            nome: 'MP5 (SMG)',
            dano: '5d8+20',
            ct: '16',
            criticos: '+2D',
            descricao: 'SMG forjada em aço.',
            passiva: 'Tiro Rápido: Caso tenha um sucesso extremo em um teste de pontaria pode atirar 2 vezes no mesmo turno.'
        },
        {
            id: 'aco-ump45',
            nome: 'UMP-45 (SMG)',
            dano: '5d8+15',
            ct: '17',
            criticos: '+3D',
            descricao: 'SMG forjada em aço.',
            passiva: 'Disparos Rápidos: A cada ataque bem-sucedido em um inimigo, acumula 1 estoque por turno, acertar um inimigo de forma consecutiva ganha +1D de dano, pode acumular 5 estoques. Os estoques duram até o final da cena.'
        },
        {
            id: 'aco-awp',
            nome: 'AWP (Rifle de Precisão)',
            dano: '10d12+40',
            ct: '19',
            criticos: '+6D',
            descricao: 'Rifle de precisão forjado em aço.',
            passiva: 'Disparo Fatal: Acertos concedem um nível maior de fatalidade, tiros precisos podem finalizar um alvo no mesmo turno. Acertos extremos em inimigos enfraquecidos ou frágeis causam +2D extras de crítico.'
        },
        {
            id: 'aco-417',
            nome: '417 (DMR)',
            dano: '7d10+25',
            ct: '18',
            criticos: '+4D',
            descricao: 'DMR forjado em aço.',
            passiva: 'Atirador Tático: Acertos em alvos marcados, fazem com quem ele recebe +3D de dano extra, além de causar o efeito vulnerável adicional por 1d4 de rodadas.'
        },
        {
            id: 'aco-g8a1',
            nome: 'G8A1 (LMG)',
            dano: '6d8+15',
            ct: '20',
            criticos: '+2D',
            descricao: 'LMG forjada em aço.',
            passiva: 'Supressão de Fogo: Causa +2D de dano contra inimigos com algum tipo de resistência ou efeito de proteção, além de sempre causar o efeito marcado.'
        },
        {
            id: 'aco-supernova',
            nome: 'Supernova (Escopeta)',
            dano: '8d8+15',
            ct: '17',
            criticos: '+3D',
            descricao: 'Escopeta forjada em aço.',
            passiva: 'Impacto Devastador: Acertos corpo a corpo ou próximos de um inimigo marcado ou a queima roupa, fazem com que o crítico de dados extras multiplique o dano por 2, além de adicionar +3D críticos.'
        },
        {
            id: 'aco-desert-eagle',
            nome: 'Desert Eagle (.50 AE)',
            dano: '6d8+20',
            ct: '18',
            criticos: '+3D',
            descricao: 'Pistola forjada em aço.',
            passiva: 'Perfuração: Ignora defesas e efeitos defensivos contra inimigos grandes, quebrando o efeito protegido e adicionando +2D de dano extra.'
        },
        {
            id: 'aco-lanca-chamas',
            nome: 'Lança-Chamas',
            dano: '12d8+15',
            ct: '19',
            criticos: '+2D',
            descricao: 'Forjado em aço, já possui uma passiva.',
            passiva: 'Incêndio: Acertos causam o efeito "Queimando" no alvo, causando 3d6 de dano inicial de fogo. Além disso, causar novamente dano em inimigos queimando duplica o dano de fogo recebido do efeito queimando. A duração é 1d4 de rodadas e acumulável.'
        },
        {
            id: 'aco-rifle-estase',
            nome: 'Rifle de Estase',
            dano: '1d12',
            ct: '-',
            criticos: '+1D',
            descricao: 'Forjado em aço, já possui uma passiva.',
            passiva: 'Congelamento sintético: Acertos bem sucedidos fazem o alvo ficar atordoado por 1 rodada de forma imediata, além disso o efeito atordoado contra animais fazem com que todos os danos ignorem a armadura durante o efeito.'
        },
        {
            id: 'aco-canhao-propulsao',
            nome: 'Canhão de Propulsão',
            dano: '3d8+10',
            ct: '17',
            criticos: '+3D8',
            descricao: 'Forjado em aço, já possui uma passiva.',
            passiva: 'Impulso: Acertos causam o efeito "Agarrado" no alvo, jogando-o 3 metros para trás ou para frente. Se o alvo for jogado contra uma parede ou objeto, ele sofre mais 10d6 de dano.'
        },
        {
            id: 'aco-termo-lamina',
            nome: 'Termo Lâmina',
            dano: '4d10+15',
            ct: '18',
            criticos: '+3D6',
            descricao: 'Forjada em aço, já possui uma passiva.',
            passiva: 'Calor Extremo: Acertos diretos causam o efeito "Queimado", causando 2d6 de fogo para cada 1 atributo de força. O efeito dura 1d4 de rodadas.'
        },
        {
            id: 'aco-markov',
            nome: 'Arma de Raios de Markov',
            dano: '6d8+15',
            ct: '19',
            criticos: '+3D6',
            descricao: 'Arma de raio forjada em aço.',
            passiva: 'Eletricidade: Acertos causam o efeito "Abalado" no alvo, fazendo com que não possa bloquear por 1 rodada, além de causar +2D de dano em inimigos marcados.'
        },
        {
            id: 'aco-hyde',
            nome: 'Lança-Chamas de Hyde',
            dano: '5d8+10',
            ct: '18',
            criticos: '+2D8',
            descricao: 'Forjado em aço, já possui uma passiva.',
            passiva: 'Fogo Sagrado: Acertos causam o efeito "Queimando" no alvo por 1d4 de rodadas, causando 6d6 de pontos de fogo, o dano de fogo é convertido para dano verdadeiro ignorando armadura e causando o dobro de dano em criaturas da caveira.'
        },
        {
            id: 'aco-val',
            nome: 'Rifle de Precisão de Val',
            dano: '7d12+20',
            ct: '17',
            criticos: '+5D6',
            descricao: 'Forjado em aço, já possui uma passiva.',
            passiva: 'Disparo Certeiro: A cada acerto, o portador ganha +2D de dano contra criaturas da caveira, acumulando até 5 vezes. O bônus é resetado após sofrer atordoamento.'
        }
    ],

    radiante: [
        {
            id: 'radiante-espada',
            nome: 'Espada da Luz',
            dano: '6d10+25',
            ct: '18',
            criticos: '+4D6',
            descricao: 'Forjada em aço, já possui uma passiva.',
            passiva: 'Instinto de Guerreiro – Você causa +1D de dano e o efeito Sangrando em Feras ou animais.',
            passivaRadiante: 'Luz Purificadora – Causar dano contra inimigos Profanos ou seres diabólicos, com uma maldade encarnada em seus atos durante a cena, aumenta seu potencial de ataque para +3D de dano. Além de sempre que acertar um alvo em um turno, pode remover uma penalidade de si mesmo. Portar a arma, ganha o bônus de +5 em religião, além de poder iluminar o ambiente com uma luz celestial de sua fé.'
        },
        {
            id: 'radiante-espada-longa',
            nome: 'Espada da Caveira',
            dano: '6d10+25',
            ct: '19',
            criticos: '+10D6',
            descricao: 'Forjada em aço, já possui uma passiva.',
            passiva: 'Corte Preciso – Em acertos críticos, causa +2D6 de dano adicional.',
            passivaRadiante: 'Instinto da Caveira – Quando está espada é usada, a cena se torna diabólica, causar dano a inimigos com a espada, aplica o efeito Abalado, além de poder executar um ataque cruel uma vez por turno contra inimigos abalados, somando os pontos de dano, junto aos pontos de esforço gastos com a sanidade. Caso chegue a beira da loucura ou em 20 de sanidade o portador ganha +20 de armadura e pontos de vida.'
        },
        {
            id: 'radiante-claymore',
            nome: 'Espada do Véu',
            dano: '6d10+25',
            ct: '17',
            criticos: '+3D6',
            descricao: 'Forjada em aço, já possui uma passiva.',
            passiva: 'Instinto de Guerreiro do Véu – Você causa +1D de dano e ganha um Buff de +5 em acertos em Criaturas com jóias, possuem alguma origem ligada ao fogo.',
            passivaRadiante: 'Fluxo do Véu – Causar dano em inimigos que possuem alguma chama, caso elimine a origem do fogo, ganha mais um ataque para poder executar durante o turno. Além de quanto mais impulso e força do ar contribuir nos ataques da cena, o dano é convertido para 1d8, cada estoque de dano equivale uma chama apagada, ritual de vento executado na cena, presença de tempestade ou clima pesado, entre outros elementos simbólicos ao vento. O portador da espada é imune a desvatagens de lentidão ou penalidades vindas pelo ar ou uso do vento.'
        },
        {
            id: 'radiante-lanca',
            nome: 'Lança Estelar',
            dano: '6d12+30',
            ct: '18',
            criticos: '+6D6',
            descricao: 'Arma radiante de combate à distância.',
            passiva: 'Impacto Celestial – Em ataques à distância, você adiciona +1D8 de dano extra.',
            passivaRadiante: 'Astros em Colisão – Sempre que acertar um inimigo, você marca o alvo com uma "estrela cadente". A cada 3 marcas, uma explosão de energia cósmica causa +8D8 de dano verdadeiro em uma área de 3-6 metros. Além disso, o portador da lança ganha visão perfeita em ambientes escuros.'
        },
        {
            id: 'radiante-machado',
            nome: 'Machado do Inferno',
            dano: '7d10+20',
            ct: '20',
            criticos: '+4D8',
            descricao: 'Machado radiante com poderes ígneos.',
            passiva: 'Fúria Ardente – Todo acerto crítico causa o dano inteiro em origem de dano de fogo.',
            passivaRadiante: 'Inferno Vivo – Ao eliminar um inimigo, o corpo incendeia e explode, causando +6D6 de dano em área. Durante combates em ambientes flamejantes, o portador recebe +15 em Armadura por corpo incendiado ou aspectos quentes do ambiente, lim(5). O machado também pode atear chamas a qualquer objeto inflamável com um simples toque, causando o efeito queimando de 3d6 de fogo por 1d4 de rodadas. Além disso o portador pode usar um ritual simples de fogo.'
        },
        {
            id: 'radiante-arco',
            nome: 'Arco da Tormenta',
            dano: '5d12+25',
            ct: '19',
            criticos: '+5D6',
            descricao: 'Arco radiante com poderes elétricos.',
            passiva: 'Rajada Elétrica – Seus disparos causam +2D4 de dano elétrico adicional, acumulando dano elétrico em dados contra um alvo.',
            passivaRadiante: 'Olho do Furacão – A cada acerto, uma carga elétrica se acumula no alvo. A cada 3 acertos consecutivos, um relâmpago cai sobre ele, causando +8D6 de dano elétrico. Durante tempestades, o arco não precisa de flechas físicas: ele cria projéteis de energia elétrica, além de fornecer +5 em pontaria.'
        },
        {
            id: 'bobo-escarlate',
            nome: 'Espada do Bobo Escarlate — Mil Caras',
            dano: '10d10+30',
            ct: '18',
            criticos: '+2D8',
            descricao: 'Espada escarlate com múltiplas facetas.',
            passiva: 'Guerreiro da Espada – Possui uma taxa de letalidade maior, causando +1D de dano contra inimigos com armaduras quebradas.',
            passivaRadiante: 'Mil Caras – Sempre que acertar um crítico em inimigos sangrando, concede +3d12 de dano adicional de sangramento e aplica Abalado por 1d4 rodadas. Pode ser reconstruída instantaneamente na mão do portador ao custo de 1d12 de vida. Todo o dano de sangramento causado pela espada cura o portador em 50% do valor.'
        },// Adicione estas armas ao array 'radiante' no objeto armasData:

{
    id: 'escarlate-revolver',
    nome: 'Revolver Escarlate — Sangue do Carrasco',
    dano: '6d10+18',
    ct: '18',
    criticos: '+2D12',
    descricao: 'Revolver escarlate com mecânica de sacrifício.',
    passiva: 'Juramento Sangrento – Cada tiro exige que o portador inflija um corte em si mesmo, perdendo 1d4 PV (custo imediato) para alimentar a arma. Esse sacrifício é parte do juramento que mantém a arma sedenta de sangue.',
    passivaRadiante: 'Golpe Final – 1x por cena, o portador pode consumir todo o sangue perdido naquela cena (PV perdidos enquanto empunha a arma) e converter esse total em dano adicional único contra um alvo (multiplicador: PV perdidos × 1d6). O uso deixa o portador exausto — sofre -2 em todas as defesas por 1d4 rodadas.'
},
{
    id: 'escarlate-canhao',
    nome: 'Canhão Escarlate — Coração Estilhaçado',
    dano: '10d12+25',
    ct: '20',
    criticos: '+3D12',
    descricao: 'Canhão escarlate de poder devastador.',
    passiva: 'Peso Inumano – Após cada disparo, o portador fica de joelhos e perde 1 turno para recompor-se (o recuo e o peso exigem estabilização). Uso em movimento impõe penalidade adicional em esquiva até o próximo turno.',
    passivaRadiante: 'Colapso Carmesim – 1x por combate, o disparo cria uma implosão no ponto de impacto: puxa inimigos num raio de 5m para o centro e causa dano extra de 4d12; o portador sofre 2d10 PV de custo imediato devido à carga explosiva e ao retorno da arma.'
},
{
    id: 'escarlate-pistola',
    nome: 'Pistola Escarlate — Grito Carmesim',
    dano: '4d12+14',
    ct: '18',
    criticos: '+2D8',
    descricao: 'Pistola escarlate de disparo ensurdecedor.',
    passiva: 'Sangue Gasto – Ao disparar, o portador perde 2 PV (custo imediato). A pistola converte o sangue derramado em ferocidade do disparo.',
    passivaRadiante: 'Grito Mortal – 1x por cena, ao usar este modo a pistola dispara um tiro ensurdecedor: causa +5d12 de dano (alvo único ou em pequeno cone à curta distância) e aplica -10 em percepção a todos no raio de 5m por 1d2 rodadas. O portador também fica com -5 em concentração por 1 rodada.'
},
{
    id: 'escarlate-escopeta',
    nome: 'Escopeta Escarlate — Carniceira de Ossos',
    dano: '6d12+22',
    ct: '19',
    criticos: '+3D6',
    descricao: 'Escopeta escarlate de poder destrutivo.',
    passiva: 'Peso Cruel – Cada disparo empurra o atirador alguns metros para trás (recuo massivo). O jogador deve passar em teste de Força para manter posição; falha implica deslocamento involuntário e penalidade em sua próxima ação de ataque.',
    passivaRadiante: 'Chuva de Ossos – 1x por combate, ao ativar este modo a escopeta libera uma rajada de fragmentos que atinge todos os inimigos em um cone de 6m à frente (dano aumentado), mas o portador perde 1d8 PV imediatamente pelo custo ritualístico da arma.'
},
{
    id: 'adaga-escarlate',
    nome: 'Adaga Escarlate — Sedenta do Traidor',
    dano: '4d12+15',
    ct: '19',
    criticos: '+3d8',
    descricao: 'Adaga escarlate com sede de sangue.',
    passiva: 'Sede de Sangue – Causa +1D de dano adicional contra inimigos que já estejam sangrando.',
    passivaRadiante: 'Dreno Escarlate – Cada vez que causa dano em inimigos com penalidades acumuladas (sangramento, abalado, atordoado, etc.), o portador recupera 1d12 pontos de vida por penalidade ativa no alvo. Se o inimigo morrer sob efeito dessas penalidades, o portador ganha um bônus temporário de +5 em ataques até o fim da cena.'
},
{
    id: 'machado-eclipse',
    nome: 'Machado do Eclipse',
    dano: '8d12+28',
    ct: '19',
    criticos: '+4d10',
    descricao: 'Machado lendário das sombras.',
    passiva: 'Força das Sombras – Golpes críticos em inimigos cegos ou em ambientes de penumbra causam +1D de dano.',
    passivaRadiante: 'Crepúsculo – Ao atingir 0 PV, o portador pode sacrificar 20 pontos de sanidade para continuar lutando por 1d4 rodadas adicionais.'
},
{
    id: 'lanca-vento',
    nome: 'Lança do Vento Cortante',
    dano: '6d10+20',
    ct: '18',
    criticos: '+3d8',
    descricao: 'Lança lendária do vento.',
    passiva: 'Agilidade do Ar – O portador recebe +4 em esquiva.',
    passivaRadiante: 'Rajada Mortal – Sempre que elimina um inimigo, pode realizar imediatamente um ataque adicional contra outro alvo a até 6m.'
},
{
    id: 'martelo-trovao',
    nome: 'Martelo do Trovão',
    dano: '10d8+25',
    ct: '17',
    criticos: '+4d8',
    descricao: 'Martelo lendário do trovão.',
    passiva: 'Impacto Atordoante – Críticos atordoam inimigos por 1 rodada.',
    passivaRadiante: 'Fúria da Tempestade – Uma vez por cena, pode invocar um raio que causa 6d12 de dano em área (6m).'
},
{
    id: 'arco-lua',
    nome: 'Arco da Lua Sangrenta',
    dano: '5d12+18',
    ct: '18',
    criticos: '+2d10',
    descricao: 'Arco lendário da lua.',
    passiva: 'Olhos da Noite – Recebe +5 em testes de percepção noturna.',
    passivaRadiante: 'Luar Carmesim – Flechas que acertam inimigos sangrando causam +3d12 de dano adicional.'
},
{
    id: 'foice-colheita',
    nome: 'Foice da Colheita Negra',
    dano: '9d10+22',
    ct: '19',
    criticos: '+5d8',
    descricao: 'Foice lendária da colheita.',
    passiva: 'Lâmina Farta – Inimigos mortos pela foice têm suas almas seladas ou drenadas.',
    passivaRadiante: 'Colheita de Almas – Cada alma colhida concede +1 em todos os atributos até o fim da cena (máx. +5).'
},
{
    id: 'espada-solar',
    nome: 'Espada Solar',
    dano: '7d12+26',
    ct: '18',
    criticos: '+3d12',
    descricao: 'Espada lendária do sol.',
    passiva: 'Chama Brilhante – A espada emite luz intensa em 6m.',
    passivaRadiante: 'Sol Interior – O portador é imune a efeitos de medo e fogo, e causa +2d12 contra mortos-vivos.'
},
{
    id: 'cajado-profundezas',
    nome: 'Cajado das Profundezas',
    dano: '4d12+20',
    ct: '19',
    criticos: '+2d10',
    descricao: 'Cajado lendário das profundezas.',
    passiva: 'Sabedoria Abissal – O portador ganha +5 em rituais de Água.',
    passivaRadiante: 'Abyssus – Pode conjurar uma vez por cena um "Vórtice Abissal", que prende inimigos em um raio de 4m por 1d3 rodadas, além de causar uma mordida simulada pela água, de um leviatã conhecido pelo Portador.'
},
{
    id: 'adaga-sombria',
    nome: 'Adaga Sombria',
    dano: '3d12+15',
    ct: '20',
    criticos: '+4d6',
    descricao: 'Adaga lendária das sombras.',
    passiva: 'Passos Silenciosos – +5 em furtividade quando empunhada.',
    passivaRadiante: 'Sombras Vivas – Pode se teletransportar instantaneamente até 4m entre sombras.'
},
{
    id: 'servical-alfanje',
    nome: 'Alfanje do Coração de Fogo',
    dano: '9d10+22',
    ct: '18',
    criticos: '+3D8',
    descricao: 'Alfanje servical flamejante.',
    passiva: 'Sangue Incandescente – A cada acerto, aplica Queimado. Se o alvo já estiver Queimado, o dano é dobrado da origem de fogo.',
    passivaRadiante: 'Coração Flamejante – Se o portador estiver com menos de 50% de vida, a lâmina inflige +1d10 de fogo e aplica Marcado. Abater um Marcado concede +10 de Defesa por 1 rodada.'
},
{
    id: 'servical-bacamarte',
    nome: 'Bacamarte do Arauto da Chama',
    dano: '12d8+20',
    ct: '17',
    criticos: '+4D6',
    descricao: 'Bacamarte servical de fogo.',
    passiva: 'Rajada de Cinzas – Disparo em cone, aplicando Queimado a todos os inimigos atingidos.',
    passivaRadiante: 'Explosão do Serviçal – Após atingir 3 alvos diferentes, o próximo disparo causa +2d6 de Queimado e aplica Abalado por 1 rodada.'
},
{
    id: 'servical-escudo',
    nome: 'Escudo do Fogo da Alma',
    dano: '6d8+15',
    ct: '19',
    criticos: '+2D6',
    descricao: 'Escudo servical defensivo.',
    passiva: 'Barreira de Cinzas – Concede +15 Defesa em posição defensiva. Pode golpear inimigos.',
    passivaRadiante: 'Escudo do Brilho – Cada bloqueio cura 2d4 de PV. A cada 3 bloqueios, o escudo incandesce e causa Queimado em inimigos corpo a corpo.'
},
{
    id: 'servical-machado',
    nome: 'Machado "Fúria do Vulcão"',
    dano: '11d12+25',
    ct: '17',
    criticos: '+4D8',
    descricao: 'Machado servical vulcânico.',
    passiva: 'Erupção Flamejante – Críticos causam +2d8 de fogo e aplicam Queimado.',
    passivaRadiante: 'Núcleo de Lava – Após receber 3 golpes, o próximo ataque causa dano duplo e aplica Exposto. Portador sofre 1d6 de Estresse por rodada enquanto carregado.'
},
{
    id: 'servical-adaga',
    nome: 'Adaga "Gume Ígneo"',
    dano: '5d8+15',
    ct: '19',
    criticos: '+2D6',
    descricao: 'Adaga servical ígnea.',
    passiva: 'Queimadura Rápida – +10 em Agilidade. Cada acerto aplica Queimado.',
    passivaRadiante: 'Brasa Oculta – Ataques pelas costas dobram o dano de Queimado.'
},
{
    id: 'servical-espada',
    nome: 'Espada Longa "Lamento da Forja"',
    dano: '10d10+28',
    ct: '18',
    criticos: '+3D10',
    descricao: 'Espada servical da forja.',
    passiva: 'Forja da Chama – Todo acerto causa +1d6 de fogo.',
    passivaRadiante: 'Forja do Caos – Ao matar um inimigo, o próximo ataque pode Atordoar.'
},
{
    id: 'servical-manoplas',
    nome: 'Manoplas "Punhos Iridescentes"',
    dano: '8d8+20',
    ct: '18',
    criticos: '+3D6',
    descricao: 'Manoplas servical ofensivas.',
    passiva: 'Fúria do Incêndio – Ataques podem aplicar Queimado.',
    passivaRadiante: 'Dança da Chama – Pode gastar ação bônus para ganhar +5 Acerto/Defesa no turno. Sofre 1d4 Estresse no fim do turno.'
},
{
    id: 'servical-arco',
    nome: 'Arco do Caçador de Chama',
    dano: '7d12+18',
    ct: '18',
    criticos: '+3D6',
    descricao: 'Arco servical de caça.',
    passiva: 'Flecha de Fogo – Cada flecha causa +1d6 de fogo.',
    passivaRadiante: 'Chama Eterna – Cada acerto aumenta +1d6 de fogo no próximo (até 3x). A cada 3 acertos em 1 alvo, a flecha explode causando Queimado em área.'
},
{
    id: 'servical-granadas',
    nome: 'Lança-Granadas "Sopro do Dragão"',
    dano: '14d10+30',
    ct: '16',
    criticos: '+5D12',
    descricao: 'Lança-granadas servical.',
    passiva: 'Queimadura Máxima – Dano aumentado contra inimigos Queimados.',
    passivaRadiante: 'Rajada do Dragão – Pode carregar o próximo disparo (+5d10 dano, aplica Amedrontado em área). Recebe 1d4 Estresse por rodada até disparar.'
},
{
    id: 'servical-escopeta',
    nome: 'Escopeta "Vingança do Fogo"',
    dano: '12d10+25',
    ct: '17',
    criticos: '+4D6',
    descricao: 'Escopeta servical vingativa.',
    passiva: 'Alma Flamejante – A cada acerto, inimigos ficam Marcados e sofrem +1d6 dano por rodada.',
    passivaRadiante: 'Destruição Vingativa – Se o portador for atingido em combate corpo a corpo, libera onda de calor: aplica Queimado e empurra 2m.'
},
{
    id: 'tridente-infernal',
    nome: 'Tridente Infernal',
    dano: '7d12+35',
    ct: '18',
    criticos: '+2D',
    descricao: 'Tridente infernal radiante.',
    passiva: 'Gladiador de Dores – Durante um combate, ao atacar um alvo Atordoado, você pode escolher causar um dano adicional de 1d12 de Sangramento ou aplicar o efeito de Vulnerabilidade, reduzindo as defesas físicas do inimigo em -5.',
    passivaRadiante: 'Em ambientes com temperatura elevada (como vulcões, desertos ou infernos), o Tridente causa +2d12 de dano adicional. Além disso, a cada 20 pontos de dano causados, a arma gera +2d6 de dano de Fogo, aplicando o efeito Queimado. O portador pode gastar uma ação para conjurar um redemoinho de fogo à sua frente, causando 6d12 de dano de Fogo e aplicando Queimado a todos os inimigos na área de efeito.'
},
{
    id: 'alfanje-vento',
    nome: 'Alfanje do Vento Desatado',
    dano: '8d10+25',
    ct: '18',
    criticos: '+3D8',
    descricao: 'Alfanje do vento radiante.',
    passiva: 'Voo Fantasma – O portador pode se tornar parcialmente fantasma por 1 rodada durante a Cena, ganhando +5 em todas as reações e testes de agilidade.',
    passivaRadiante: 'Lâmina do Vendaval – A cada acerto no inimigo, Lim(3), aplica 1d10 de dano de Impacto. Se o portador estiver Voando, o próximo ataque causa +1d12 de dano adicional.'
},
{
    id: 'pistola-redemoinho',
    nome: 'Pistola Fantasma do Redemoinho',
    dano: '7d8+20',
    ct: '19',
    criticos: '+2D6',
    descricao: 'Pistola fantasma radiante.',
    passiva: 'Tiro Etéreo – Projéteis ignoram 1 ponto de atributo da defesa do alvo que foi selecionada.',
    passivaRadiante: 'Olhos do Fantasma – Pode marcar inimigo, deixando-o Abalado por 2 rodadas. Atingi-lo concede +5 de dano e projétil cria redemoinho causando 2d12 de dano de Vento em inimigos próximos.'
},
{
    id: 'bacamarte-eco',
    nome: 'Bacamarte do Eco Tempestuoso',
    dano: '12d8+20',
    ct: '17',
    criticos: '+4D6',
    descricao: 'Bacamarte do eco radiante.',
    passiva: 'Sopro do Vento – Tiro em cone que empurra inimigos 2 metros.',
    passivaRadiante: 'Ressonância Tempestuosa – Disparo ressoa, aplicando Abalado em todos no raio. Durante tempestade, dano +4d8 e inimigos ficam Atordoados 1 rodada.'
},
{
    id: 'granada-relampago',
    nome: 'Granada do Relâmpago Caótico',
    dano: '10d6+15',
    ct: '18',
    criticos: '+2D10',
    descricao: 'Granada de relâmpago radiante.',
    passiva: 'Explosão de Eletricidade – Aplica Vulnerável em todos atingidos.',
    passivaRadiante: 'Descarga Catastrófica – Em tempestades, +2d10 de dano extra. Inimigos Vulneráveis recebem Silenciado, aumentando dano subsequente em 1,5x por 1 rodada.'
},
{
    id: 'tridente-peso',
    nome: 'Tridente do Peso Fantasma',
    dano: '9d10+22',
    ct: '19',
    criticos: '+2D8',
    descricao: 'Tridente do peso radiante.',
    passiva: 'Peso da Morte – A cada ataque, aplica Enfraquecido.',
    passivaRadiante: 'Ancoragem Espiritual – Pode lançar o tridente para puxar inimigo. Se falhar em teste de Força, alvo fica Imobilizado 1 rodada pelo vento.'
},
{
    id: 'arco-cacador',
    nome: 'Arco do Caçador dos Ventos',
    dano: '7d12+18',
    ct: '18',
    criticos: '+3D6',
    descricao: 'Arco do caçador radiante.',
    passiva: 'Voo do Espírito – +5 acerto contra inimigos em movimento.',
    passivaRadiante: 'Flecha Eólica – Ao matar inimigo, portador ganha Voando por 1d4 rodadas, acumulativas.'
},
{
    id: 'flauta-liberdade',
    nome: 'Flauta da Canção da Liberdade',
    dano: '7d10+20',
    ct: '20',
    criticos: '+3D8',
    descricao: 'Flauta da liberdade radiante.',
    passiva: 'Melodia Abaladora – Aplica Exposto por 1 rodada pela canção do Véu.',
    passivaRadiante: 'Canção dos Céus – Concede efeito Voando por 1d4 rodadas a si mesmo e a 1 aliado. Remove Imobilizado e Enraizado.'
},
{
    id: 'espadas-tempestade',
    nome: 'Espadas Duplas da Tempestade',
    dano: '8d8+20 (cada)',
    ct: '18',
    criticos: '+3D6',
    descricao: 'Espadas duplas da tempestade radiante.',
    passiva: 'Dança dos Raios – A cada acerto, +1d6 de Raio. Se os dois ataques acertarem o mesmo alvo, o dano de Raio é dobrado.',
    passivaRadiante: 'Tempestade Pessoal – Contra-ataque rápido pode Atordoar o inimigo que tenha sofrido um dano de origem elétrica ou esteja com penalidade física. Durante tempestade, portador pode se teleportar após ataque bem-sucedido.'
},
{
    id: 'machado-peso',
    nome: 'Machado de Guerra "Alma do Peso Caótico"',
    dano: '11d12+25',
    ct: '17',
    criticos: '+4D8',
    descricao: 'Machado do peso caótico radiante.',
    passiva: 'Esmagador de Fantasmas – Ignora passivas de origem de Controle de grupo vindas de impacto. Efeitos dessa origem são reduzidas em 1d2 de rodadas.',
    passivaRadiante: 'Peso da Existência – A cada 3 ataques, próximo golpe cria um campo de raios concentrados de vento em 12 metros, aliados na área recebem o efeito voando por 1d2 de rodadas. Portador fica Imobilizado por 1 rodada.'
},
{
    id: 'lampiao-raios',
    nome: 'Lampião do Conjurador de Raios',
    dano: '7d10+20 (Mágico)',
    ct: '20',
    criticos: '+3D8',
    descricao: 'Lampião do conjurador radiante.',
    passiva: 'Luz do Véu – Feixe de luz causa dano de Raio e fornece ao portador +5 em conjuração de vento, raio ou origem de peso.',
    passivaRadiante: 'Tempestade de Bolso – Cria pequenas nuvens de tempestade em uma área de 20 Metros, rituais dentro da área ganham +2D de dano elétrico e força de Vento. A área possui a duração até o criador sair de dentro dela ou sofrer o efeito atordoado, estado Morrendo ou silenciado.'
},
// Adicione estas armas ao array 'radiante' ou crie uma nova era como 'especial'

{
    id: 'espada-orc',
    nome: 'Espada Orc',
    dano: '7d10+15',
    ct: '20',
    criticos: '+4d6',
    descricao: 'Uma espada forjada com técnicas orcs, pesada e brutal, mas com um brilho prateado que reage na presença de seus criadores.',
    passiva: 'Guerreiro da Espada - Possui uma taxa de letalidade maior, causa +1D de dano em inimigos com armadura quebradas.',
    passivaRadiante: 'Efeito Élfico: Ao ficar em uma mesma cena que um Orc a espada vai reagir brilhando em uma luz cintilante de prata, ao atacar Orc exclusivamente, causa +2D de dano além de criar uma fadiga e fraqueza adicionando sempre +1D de dano acumulativo sempre que atacar o mesmo Orc.'
},
{
    id: 'cutelo-espinhos-escarlate',
    nome: 'Cutelo de Espinhos Escarlate',
    dano: '6d12+4d8+3d6',
    ct: '18',
    criticos: '+6d6',
    descricao: 'Um cutelo maciço adornado com espinhos afiados que parecem sangrar constantemente. A lâmina é pesada e letal, perfeita para combates brutais.',
    passiva: 'Gladiador de Dores: Durante um combate, enquanto atacar um alvo atordoado pode escolher causar 1d12 de sangramento ou o efeito de vulnerabilidade em -5 em reações físicas.',
    passivaRadiante: 'Efeito da Companhia Escarlate: Ao ficar em uma mesma cena a arma jorrará sangue pelos furos entre o cutelo, vazando sangue sempre que um gládio estiver presente na cena, atacar exclusivamente um gládio causa +2D de dano além de causar um sangramento viral de 3d6 de dano que aumentam +3D a cada rodada enquanto o sangramento continuar.'
},
{
    id: 'espada-almas-negras',
    nome: 'Espada das Almas Negras',
    dano: '10d8',
    ct: '19',
    criticos: '+2d8',
    descricao: 'Uma lâmina negra como a noite, forjada com almas amaldiçoadas. Ela sussurra com vozes dos caídos e sua lâmina se adapta para enfrentar os mortos-vivos.',
    passiva: 'Instinto de Guerreiro - Você causa +1D de dano e o efeito Sangrando em Feras ou animais.',
    passivaRadiante: 'Efeito dos Caídos: Ao ficar próximos de mortos-vivos ou de fantasmas, a espada se molda em uma carapaça escura e mágica de elemento. Ao atacar exclusivamente um desses seres amaldiçoados, causa +2D de dano além de ignorar completamente a vida da armadura do alvo e deixar o inimigo Abalado por 1 rodada.'
},
{
    id: 'lanca-sombria-dragao',
    nome: 'Lança Sombria do Dragão',
    dano: '8d12+20',
    ct: '18',
    criticos: '+5d6',
    descricao: 'Uma lança forjada com escamas de dragão negro, capaz de perfurar até as mais resistentes armaduras. Emite uma aura de medo que afeta os inimigos.',
    passiva: 'Perfuradora de Escamas - Causa +2D de dano contra criaturas com escamas ou carapaças naturais.',
    passivaRadiante: 'Presença do Dragão: Quando em combate contra dragões ou criaturas voadoras grandes, a lança emite um rugido silencioso que causa Atordoado por 1 rodada no primeiro ataque. Ataques contra essas criaturas ignoram 50% da armadura.'
},
{
    id: 'machado-trovao-barbaro',
    nome: 'Machado do Trovão Bárbaro',
    dano: '9d10+25',
    ct: '17',
    criticos: '+4d10',
    descricao: 'Um machado de guerra gigantesco que canaliza a fúria dos trovões. Cada golpe cria uma pequena onda de choque que atinge inimigos próximos.',
    passiva: 'Fúria Tempestuosa - Críticos criam uma onda de choque que causa 2d8 de dano de trovão em inimigos adjacentes.',
    passivaRadiante: 'Ira do Céu: Durante tempestades ou em ambientes com alta umidade, o machado acumula carga elétrica, causando +3D de dano de eletricidade e aplicando o efeito Paralisado por 1 rodada em acertos críticos.'
},
{
    id: 'adaga-sussurros-noturnos',
    nome: 'Adaga dos Sussurros Noturnos',
    dano: '5d8+15',
    ct: '16',
    criticos: '+3d12',
    descricao: 'Uma adaga tão fina quanto uma sombra, que sussurra segredos mortais ao ouvido do portador. Quase invisível na escuridão.',
    passiva: 'Passos das Sombras - +10 em furtividade quando empunhada à noite ou em áreas escuras.',
    passivaRadiante: 'Eco da Morte: Ataques pelas costas contra humanos ou humanoides causam +4D de dano e aplicam Silenciado por 2 rodadas. A adaga pode ser teleportada de volta para a mão do portador como ação livre.'
},
{
    id: 'arco-lua-prateada',
    nome: 'Arco da Lua Prateada',
    dano: '7d10+18',
    ct: '19',
    criticos: '+4d8',
    descricao: 'Um arco élfico forjado sob a luz da lua cheia. Suas flechas brilham com luz prateada e são guiadas pela luz lunar.',
    passiva: 'Visão da Lua - Disparos à noite não sofrem penalidade por escuridão e ganham +2 em acerto.',
    passivaRadiante: 'Luz Prateada: Flechas criadas por este arco causam dano adicional contra criaturas das trevas e mortos-vivos. Durante a noite, o arco pode criar flechas de luz lunar que não precisam de munição.'
},
{
    id: 'martelo-justica-celestial',
    nome: 'Martelo da Justiça Celestial',
    dano: '11d8+22',
    ct: '20',
    criticos: '+3d12',
    descricao: 'Um martelo divino que emana luz sagrada. Forjado pelos deuses para punir os ímpios e proteger os justos.',
    passiva: 'Verdade Divina - Causa dano dobrado contra demônios e criaturas profanas.',
    passivaRadiante: 'Julgamento Final: Uma vez por cena, o portador pode invocar um raio de luz celestial que causa 8d12 de dano sagrado em uma área de 8m de raio. Aliados na área são curados em 4d8 de vida.'
},
{
    id: 'foice-ceifador-eterno',
    nome: 'Foice do Ceifador Eterno',
    dano: '12d6+20',
    ct: '18',
    criticos: '+5d10',
    descricao: 'Uma foice que parece ser feita de pura escuridão. Ela não corta carne, mas sim a própria alma dos inimigos.',
    passiva: 'Toque da Morte - Inimigos mortos por esta foice não podem ser revividos por meios comuns.',
    passivaRadiante: 'Colheita de Almas: Cada criatura inteligente morta pela foice concede ao portador +1 em todos os atributos por 1d4 rodadas (máximo de +5). Almas colhidas podem ser usadas para criar um escudo espiritual que absorve 50 pontos de dano.'
},
{
    id: 'espadas-gemeas-caos',
    nome: 'Espadas Gêmeas do Caos',
    dano: '4d10+15 (cada)',
    ct: '17',
    criticos: '+3d8 (cada)',
    descricao: 'Um par de espadas que representam o equilíbrio entre ordem e caos. Uma brilha com luz dourada, a outra com escuridão púrpura.',
    passiva: 'Dança do Caos - Atacar com ambas as espadas no mesmo turno concede um ataque adicional gratuito.',
    passivaRadiante: 'Equilíbrio Perfeito: Quando ambas as espadas acertam o mesmo alvo no mesmo turno, o dano é triplicado e o alvo fica Confuso por 2 rodadas, atacando aliados aleatoriamente.'
},

        
        // ... continuar com as demais armas radiante seguindo o mesmo padrão
    ]
};

// Função para criar a tabela de uma era específica
function criarTabelaEra(era) {
    const armas = armasData[era];
    if (!armas) return '';

    const temCt = armas.some(arma => arma.ct !== null);
    
    let html = `
        <table id="${era}" class="tabela ${era === 'pedra' ? 'active' : 'hidden'}">
            <tr>
                <th>Armas</th>
                <th>Dano</th>
                ${temCt ? '<th>CT</th><th>Críticos</th>' : ''}
            </tr>
    `;

    armas.forEach(arma => {
        html += `
            <tr>
                <td class="arma" onclick="openModal('modal-${arma.id}')">${arma.nome}</td>
                <td>${arma.dano}</td>
                ${temCt ? `
                    <td>${arma.ct || '-'}</td>
                    <td>${arma.criticos || '-'}</td>
                ` : ''}
            </tr>
        `;
    });

    html += `</table>`;
    return html;
}

// Função para criar os modais das armas
function criarModais() {
    let html = '';
    
    Object.keys(armasData).forEach(era => {
        armasData[era].forEach(arma => {
            html += `
                <div id="modal-${arma.id}" class="effects-modal">
                    <div class="effects-modal-content">
                        <span class="effects-modal-close-button" onclick="closeModal('modal-${arma.id}')">&times;</span>
                        <h2>${arma.nome}</h2>
                        <p><b>Dano:</b> ${arma.dano}</p>
                        ${arma.ct ? `<p><b>Crítico (CT):</b> ${arma.ct} | <b>Dano Extra:</b> ${arma.criticos}</p>` : ''}
                        ${arma.passiva ? `<p><b>Passiva Base:</b> ${arma.passiva}</p>` : ''}
                        ${arma.passivaRadiante ? `<p><b>Passiva Radiante:</b> ${arma.passivaRadiante}</p>` : ''}
                        <p><b>Descrição:</b> ${arma.descricao}</p>
                        <button class="add-btn" onclick="adicionarAFicha('${arma.id}')">Adicionar à Ficha</button>
                    </div>
                </div>
            `;
        });
    });
    
    return html;
}

// Função para inicializar as armas na página
function inicializarArmas() {
    const weaponsContainer = document.getElementById('weapons-container');
    const modalsContainer = document.getElementById('modals-container');
    
    if (!weaponsContainer || !modalsContainer) {
        console.error('Containers não encontrados!');
        return;
    }
    
    // Criar todas as tabelas
    Object.keys(armasData).forEach(era => {
        weaponsContainer.innerHTML += criarTabelaEra(era);
    });
    
    // Criar todos os modais
    modalsContainer.innerHTML = criarModais();
}

// Função para mostrar uma era específica
function showEra(eraId) {
    // Esconde todas as tabelas
    const tabelas = document.querySelectorAll('.tabela');
    tabelas.forEach(tabela => tabela.classList.remove('active'));

    // Mostra a tabela correspondente
    const tabelaAtiva = document.getElementById(eraId);
    if (tabelaAtiva) {
        tabelaAtiva.classList.add('active');
    }

    // Atualiza o estado dos botões
    const botoes = document.querySelectorAll('.eras button');
    botoes.forEach(btn => btn.classList.remove('active'));
    const botaoAtivo = document.querySelector(`.eras button[onclick="showEra('${eraId}')"]`);
    if (botaoAtivo) {
        botaoAtivo.classList.add('active');
    }
}

// Função para adicionar arma à ficha
function adicionarAFicha(armaId) {
    // Encontrar a arma nos dados
    let arma = null;
    Object.keys(armasData).forEach(era => {
        const found = armasData[era].find(a => a.id === armaId);
        if (found) arma = found;
    });
    
    if (arma) {
        // Aqui você pode implementar a lógica para adicionar à ficha do jogador
        console.log(`Adicionando à ficha: ${arma.nome}`);
        alert(`${arma.nome} adicionada à ficha!`);
        
        // Fechar o modal após adicionar
        closeModal(`modal-${armaId}`);
    }
}

// Funções para os modais
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Função de redirecionamento
function goToPage(page) {
    window.location.href = page;
}

// Fechar modal ao clicar fora dele
window.onclick = function(event) {
    const modals = document.querySelectorAll('.effects-modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    inicializarArmas();
    showEra('pedra'); // Mostrar a primeira era por padrão
});