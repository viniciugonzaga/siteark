


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


//dinos

const creatures = {
    'Carnívoros': [
    'T-Rex',
    'Dilofossauro',
    'Compsognathus',
    'Celófode',
    'Proceratossauro',
    'Trodonte',
    'Oviraptor',
    'Hiena',
    'Ave-do-Terror',
    'Austroraptor',
    'Moros-Intrepidus',
    'Criolofossauro',
    'Pinguim',
    'arqueopterix',
    'Piranha',
    'Parasitas',
    'Tubarões',
    'dunkleosteus',
    'Megalodon',
    'Orca',
    'plesiosauros',
    'Mossasauros',
    'liopleurodonte',
    'helicoprion',
    'poraque',
    'peixe-pescador',
    'Carnotauro',
    'Majugassauro',
    'Abelissauros',
    'Carcharodontossauro',
    'Acrocantossauros',
    'Giganotossauros',
    'Alossauros',
    'Ceratossauro',
    'Deinonico',
    'Albertossauro',
    'Hererassauros',
    'Metriacontossauro',
    'Rajassauros',
    'Yutiranos',
    'Suchumimus',
    'Barionix',
    'Irritator',
    'Oshalaia',
    'Dimotrodonte',
    'Deynocheirus',
    'Espinossauro',
    'Crocodilo',
    'Sarco-imperador',
    'Purussauros',
    'Deinosuchus',
    'Leão marsupial',
    'Purlovia',
    'Dente de sabre',
    'Lobo-terrível',
    'Andreorsachus',
    'Velociraptor',
    'Antrorraptor',
    'Pyroraptor',
    'Ptero',
    'Quetzal',
    'Tapejara',
    'Tropeugnathos',
    'Dimorfonte',
    'Desmodus-draculai',
    'Orc-morcego',
    'Argentavis',
    'Pelagornis',
    'Rhynoghtinata',
    'Aranha-lobo',
    'Aranha-da-areia',
    'Aranha-viúva-negra',
    'Antropleura',
    'Lagosta',
    'Lagosta-boxeadora',
    'Megalossauro',
    'Meraxes',
    'Antrodemus',
    'Formiga-soldado-vermelha',
    'Tecelão de Orbe',
    'Formiga Soldado Bombeiro',
    'Louva-a-deus',
    'gorgossauro',
    'Concavenator'
    ],
        
    'Herbívoros': 
    [
        'Dodô', 'Parassauro', 'Iguanodonte', 'Olorotiã', 'Coritossauro', 'Mutaburrassauro', 'Edmontossauro', 'Maiassauro', 
        'Galimimo', 'Estrutiomimo', 'Gigantorraptor', 'Morchops', 'Cavalo', 'Alce', 'Archeotiomimus', 'Braquiossauro', 
        'Brontossauro', 'Amargassauro', 'Argentinossauro', 'Titãnossauro', 'Apatossauro', 'Diplodoco', 'Mamequiassauro', 
        'Nigersauro', 'Dreadnoughtus', 'Camarassauro', 'Girafotitã', 'Paraceratério', 'Sea Treader', 
        'Trike', 'Torossauro', 'Chasmossauro', 'Dracorex', 'Nasuceratops', 'Sinoceratops', 'Estiracossauro', 
        'Estegossauro', 'Kentrossauro', 'Nodossauro', 'Anquilossauro', 'Tatu', 'Castor', 'Carbonemy', 'Mamute', 
        'Rinoceronte', 'Therezinossauro', 'Magatério', 'Chalicotério', 'Basilossauro', 'Golfinho', 'Baleia', 'Foca', 
        'Ichitiossauro', 'Água-viva', 'Manta', 'Grifo', 'Sinomacrops','Listrossauro','Mariposa', 'Porco', 'gado comum','Pulgão','Gorgulho', 'Abelha','Inseto Escudo Verde', 'Crabsquid',  
  
                
    ],


    'Apex Criaturas': 
    ['Indominus Rex','Indoraptor','E750','Megavore','Indotaurus','Tusotheuthis','Reaper-leviatã','Dragão-leviatã','fantasma-leviatã','Sombra-leviatã','Chelicerate','Imperador','Leviatã-Coral','Embermane','Stormclaw','Drask','Koshai','Riftstalkear','Gnasher','Pangar','Hellion','Nayzaga','Valomyr','Shrike','Skullcrawler','Golias','Kraken','Espectro','Górgona','Behemoth','Peixe-jaula','Gargantua']
};

const dinoFichas = {
    'T-Rex': {
        title: 'Rei da Ilha',
        image: 'imagens/dinos_T-rex_ficha.jpg', // Caminho válido
        weight: '8 toneladas',
        height: '7 M',
        length: '13,5 M',
        attributes: { agi: 3, for: 5, int: 2, pre: 2, vig: 4 },
        life: 360, // Vida do dinossauro
        armor: 25, // Armadura do dinossauro
        actionBonus: '+25 mordida, +20 intimidar, +20 cheirar, +20 pisar, +20 imobilizar, +15 cheirar, +10 cabeçada, +20 contra-ataque, +10 esquiva, +10 bloquear +5 corrida ', // Bônus de ação de criatura
        attacks: ['Mordida Poderosa: 16d10+30', 'Investida: 7d10+10', 'Ataque de cauda: 7d10+20'],
        abilities: [
            'Tirano: O tiranossauro rex é uma criatura implacável que consome todos, no começo da luta o tiranossauro aplica um grito de lentidão de 1d6 na corrida. Sua tirania é implacável, durante a luta quando está machucado o tiranossauro ganha um buff na mordida que causa o efeito quebrado e se um dado for extremo ganha mais 1 para extremo.',
            'Coragem do rei: Não sofre efeito de medo e efeitos negativos de qualquer intimidação.'
        ],
        passiva: 'Mordida destruidora: A mordida do tiranossauro rex é tão forte que pode causar efeitos de quebrado, sangramento ou dilacerado para toda mordida.',
        passivaElemental: 'FOGO: O tiranossauro pode fazer seu corpo pegar fogo nas investidas e rabadas, causando dano ao contato de 3d12 de fogo, por rodada 1d12+2d6 (1d6 rod). MORTE: Causa um dano extra a inimigos com pouca vida na mordida +20, 1/4 do dano da mordida faz ele devorar a carne e regenerar vida. AETHER: O tiranossauro ganha um buff de vida e gereneração por quantos inimigos estiver enfretando 1 = 30 de regeneração'
    },
'Dilofossauro': {
    title: 'O Mestre da Distração',
    image: 'imagens/dinos_dilofossauro.webp', // Substitua pelo caminho correto
    weight: '300 kg',
    height: '30 cm - 2,50 M',
    length: '4,5 M',
    attributes: { agi: 4, for: 2, int: 2, pre: 3, vig: 2 },
    life: [15, 25, 50, 80, 100], // Escalável por nível ou estágio
    armor: 10, // Base de armadura
    actionBonus: '+10 mordida, +10 garra, +10 veneno, +5 intimidação, +5 corrida, +5 furtividade',
    attacks: [
        'Mordida: 1d10 / 2d12+5 ',
        'Garra: 1d10 / 2d12+5 ',
        'Veneno Paralisante: 1d8 (cegueira por 1d4 rodadas)'
       
    ],
    abilities: [
        'Distração Fatal: Quando a vítima está envenenada ou distraida, o Dilofossauro ganha um bônus de +1d6 em ataques diretos.',
        'Intimidar: +10 em intimidar, usado para assustar ou distrair oponentes em menor número.'
    ],
    passiva: 'O veneno do Dilofossauro cega suas presas temporariamente, permitindo ataques críticos ou desvantagem (-5) em testes de percepção.',
    passivaElemental: 'Morte:Pode criar clones ou alucinações contra inimigos envenenados. Fogo Veneno solta fogo (3d6 de fogo).Hypo: aumenta o tamanho para 2 metros e +1 força. ',


    // Adicione outras fichas aqui
},
'Compsognathus': {
    title: 'O Pequeno Caçador',
    image: 'imagens/dinos_comp.png', // Substitua pelo caminho correto
    weight: '3 kg',
    height: '30 cm',
    length: '1,5 M',
    attributes: { agi: 5, for: 1, int: 2, pre: 2, vig: 1 },
    life: [10, 20, 30, 40, 50], // Escalável por nível ou estágio
    armor: 5, // Armadura leve
    actionBonus: '+10 mordida, +5 garra, +5 furtividade, +10 trabalho em grupo, +5 corrida',
    attacks: [
        'Mordida: 1d6 / 1d8+2 / 1d10+grupo',
        'Garra: 1d6 / 1d8+2 / 1d10+grupo',
        'Ataque em Grupo: Se houver 3 ou mais compsognathus, cada um ganha +1d6 no ataque e no dano.'
    ],
    abilities: [
        'Pequeno Predador: Apesar de seu tamanho, o compsognathus pode desferir ataques rápidos e precisos, dificultando a reação do inimigo.',
        'Trabalho em Grupo: Quando em grupo, eles podem cercar e confundir inimigos, aplicando desvantagem em testes de percepção e esquiva do alvo.'
    ],
    passiva: 'Caçador Ágil: Ganha +1d6 em testes de esquiva e fuga, devido à sua pequena estatura e agilidade.',
    passivaElemental: 'Fogo: Aplica 1d6 de fogo para cada comp em contato, escala 1 dado para cada comp de fogo.Biolétrica: ataques causam dano extra de elétrico 1d6 em mordida. Morte: aplica torpor em qualquer ataque.',
  
},
'Celófode': {
    title: 'O Médio Caçador',
    image: 'imagens/dinos_celopide.jpeg', // Substitua pelo caminho correto
    weight: '3 kg',
    height: '60 cm',
    length: '1,5 M',
    attributes: { agi: 5, for: 2, int: 2, pre: 2, vig: 1 },
    life: [10, 20, 30, 40, 50], // Escalável por nível ou estágio
    armor: 5, // Armadura leve
    actionBonus: '+10 mordida, +5 garra, +5 furtividade, +10 trabalho em grupo, +5 corrida',
    attacks: [
        'Mordida: 2d6 / 1d8+2 / 1d10+grupo',
        'Garra: 2d6 / 1d8+2 / 1d10+grupo',
        'Ataque em Grupo: Se houver 3 ou mais compsognathus, cada um ganha +1d6 no ataque e no dano.'
    ],
    abilities: [
        'Pequeno Predador: Apesar de seu tamanho, o compsognathus pode desferir ataques rápidos e precisos, dificultando a reação do inimigo.',
        'Trabalho em Grupo: Quando em grupo, eles podem cercar e confundir inimigos, aplicando desvantagem em testes de percepção e esquiva do alvo.'
    ],
    passiva: 'Caçador Ágil: Ganha +1d6 em testes de esquiva e fuga, devido à sua pequena estatura e agilidade.',
    passivaElemental: 'Fogo: Aplica 1d6 de fogo para cada celo em contato, escala 1 dado para cada celo de fogo.Biolétrica: ataques causam dano extra de elétrico 2d6 em mordida. Morte: aplica torpor em qualquer ataque.',
  
},
'Proceratossauro': {
    title: 'O ágil Caçador',
    image: 'imagens/dinos_procerato.png', // Substitua pelo caminho correto
    weight: '3 kg',
    height: '60 cm',
    length: '1,5 M',
    attributes: { agi: 4, for: 2, int: 2, pre: 2, vig: 2 },
    life: [10, 20, 30, 40, 50], // Escalável por nível ou estágio
    armor: 7, // Armadura leve
    actionBonus: '+10 mordida, +5 garra, +5 furtividade, +10 trabalho em grupo, +5 corrida',
    attacks: [
        'Mordida: 3d6 / 3d8+2 / 1d10+grupo',
        'Garra: 4d6 / 2d8+2 / 1d10+grupo',
        'Ataque em Grupo: Se houver 3 ou mais compsognathus, cada um ganha +1d6 no ataque e no dano.'
    ],
    abilities: [
        'Pequeno Predador: Apesar de seu tamanho, o compsognathus pode desferir ataques rápidos e precisos, dificultando a reação do inimigo.',
        'Trabalho em Grupo: Quando em grupo, eles podem cercar e confundir inimigos, aplicando desvantagem em testes de percepção e esquiva do alvo.'
    ],
    passiva: 'Caçador Ágil: Ganha +1d6 em testes de esquiva e fuga, devido à sua pequena estatura e agilidade.',
    passivaElemental: 'Fogo: Aplica 1d6 de fogo para cada Pro em contato, escala 1 dado para cada Pro de fogo.Biolétrica: ataques causam dano extra de elétrico 2d6 em mordida. Morte: aplica torpor em qualquer ataque.',
  
},
'Trodonte': {
    title: 'O Caçador Noturno',
    image: 'imagens/dinos_trodonte.jpeg', // Substitua pelo caminho correto
    weight: '25 kg',
    height: '50 cm',
    length: '2 M',
    attributes: { agi: 4, for: 2, int: 3, pre: 3, vig: 2 },
    life: 35, // Vida moderada
    armor: 7, // Armadura leve
    actionBonus: '+10 mordida, +5 garra, +10 furtividade, +15 rastrear, +10 ataques noturnos, -5 em ações durante o dia',
    attacks: [
        'Mordida: 2d6+5',
        'Garra: 1d8+3',
        'Ataque Letal Noturno: 3d8+5+grupo, aplica sangramento devido à precisão mortal.'
    ],
    abilities: [
        'Visão Noturna: O Troodonte enxerga claramente no escuro, ignorando penalidades em combates noturnos.',
        'Agressividade Noturna: Durante a noite, ganha +1d6 em furtividade, rastrear e ataques corpo a corpo.',
      
    ],
    passiva: 'Caçador Silencioso: Quando está no escuro, o Troodonte pode atacar de surpresa, forçando o inimigo a realizar um teste de percepção com desvantagem. Caso o inimigo falhe, o ataque causa dano adicional de +1d6.',
    passivaElemental: 'Morte: O Troodonte pode se fundir às sombras por 1 rodada, tornando-se impossível de ser detectado. Durante essa rodada, seu próximo ataque causa +2d8 de dano extra.Nuclear: possui radiação que altera o dna das vitimas, aplicando desvantagem +5 em tudo.',
    gene: ['Adaptação Noturna', 'Resistência a baixas temperaturas', 'Furtividade Elevada']
},

'Oviraptor': {
    title: 'O Ladrão de Ovos',
    image: 'imagens/dinos_oviraptor.webp', // Substitua pelo caminho correto
    weight: '20 kg',
    height: '80 cm',
    length: '2 M',
    attributes: { agi: 4, for: 2, int: 3, pre: 2, vig: 2 },
    life: 40, // Vida leve, criatura ágil
    armor: 8, // Armadura leve
    actionBonus: '+15 em furtividade, +10 em corrida, +10 em esquiva, +20 em ações de roubo, +10 em provocação, +5 em rastrear ninhos',
    attacks: [
        'Investida Rápida: 2d8+3, causa desequilíbrio no alvo.',
        'Picada: 1d8+2, ideal para confundir inimigos.',
        'Provocação: O Oviraptor pode irritar fêmeas protetoras próximas, forçando-as a um teste de resistência mental (int ou vig). Se falharem, recebem desvantagem em sua próxima ação.'
    ],
    abilities: [
        'Roubo Especialista: Quando o Oviraptor se aproxima de um ninho, ele pode tentar roubar um ovo. Se bem-sucedido, ele recupera 10 de vida ao consumir o ovo em até 3 rodadas.',
        'Provocador Nato: O Oviraptor é capaz de desviar a atenção das fêmeas de outras criaturas, fazendo com que o alvo perca sua próxima ação em um ataque direto ao Oviraptor.',
       
    ],
    passiva: 'Predador Ágil: O Oviraptor recebe +10 em esquiva contra ataques corpo a corpo e +5 contra ataques à distância enquanto estiver em movimento com o ovo.',
    passivaElemental: 'Bioelétrico: consegue aplicar lentidão em seus rastro elétrico ao correr com os ovos. hypo: +30 de vida e maior tamanho.',
    
},

'Hiena': {
    title: 'Aproveitadora Implacável',
    image: 'imagens/dinos_hiena.webp', // Insira um caminho válido
    weight: '50 kg',
    height: '1,2 M',
    length: '1,5 M',
    attributes: { agi: 3, for: 2, int: 3, pre: 2, vig: 3 },
    life: 45, // Vida da hiena
    armor: 10, // Armadura da hiena
    actionBonus: '+15 em ataques coordenados, +20 em furtividade, +20 em perceber sangrando, +20 em aproveitar cadáver, +10 em desviar, +5 em bloquear',
    attacks: ['Mordida Coletiva: 2d12+10 (por hiena no grupo)', 'Investida de Caça: 3d10+5', 'Golpe Oportuno: 2d10+10 quando inimigo está ferido'],
    abilities: [
        'Carniceira Oportunista: Hienas em grupo podem executar ataques coordenados, ganhando um bônus de +1d6 por cada hiena adicional próxima (máximo grupo).',
        'Caçadora Astuta: Se enfrentar inimigos feridos ou distraídos, a hiena pode desferir ataques que ignoram metade da armadura do alvo.',
      
    ],
    passiva: 'Estratégia de Grupo: Cada hiena próxima aumenta em +1 a dificuldade dos testes de defesa dos inimigos.',
    passivaElemental: 'Fogo: Ao atacar em grupo, as hienas podem causar 1d6 de fogo por hiena no grupo. Morte: Cada hiena que cair em combate pode ser consumida pelas outras, recuperando 25 de vida por hiena devorada.',
},
'Ave-do-Terror': {
    title: 'Predadora Implacável',
    image: 'imagens/dinos_ave_do_terror.jpeg', // Insira um caminho válido
    weight: '78 kg',
    height: '1,8 M',
    length: '2,5 M',
    attributes: { agi: 3, for: 3, int: 2, pre: 2, vig: 3 },
    life: 65, // Vida da Ave do Terror
    armor: 15, // Armadura da Ave do Terror
    actionBonus: '+20 em corrida, +15 em planar, +15 em puxar carne, +10 em causar sangramento, +10 em esquivar, +15 em ataques rápidos',
    attacks: [
        'Mordida Cruel: 3d12+10 (causa sangramento por 1d6 rodadas)', 
        'Garra Destruidora: 4d10+15 (ignora metade da armadura)', 
        'Investida Planada: 4d10+10 (derruba inimigo no chão, exige teste de vigor ou fica atordoado por 1 rodada)'
    ],
    abilities: [
        'Crueldade Inclemente: Cada ataque bem-sucedido com mordida ou garra ativa sangramento contínuo (1d6 por rodada até ser tratado).',
        'Carrasco Veloz: Quando perseguindo um inimigo com menos de 50% da vida, ganha um bônus de +1d6 no próximo ataque.',
        'Plana e Ataca: A Ave do Terror pode planar rapidamente sobre alvos, ganhando vantagem (rola 2d20 e escolhe o maior) em investidas feitas do ar.'
    ],
    passiva: 'Puxar Carne: Sempre que causar dano crítico, retira parte da carne do alvo, reduzindo sua armadura em -5 (máximo acumulado de -15).',
    passivaElemental: 'fOGO: Ao planar, pode soltar fogo no alvo, causando 1d6 de fogo por rodada. Morte: Cada inimigo abatido pode ser consumido, recuperando 25 de vida por inimigo devorado.',
},

 'Austroraptor': {
    title: 'O ardiloso Caçador',
    image: 'imagens/dinos_austro.jpg', // Substitua pelo caminho correto
    weight: '3 kg',
    height: '60 cm',
    length: '1,5 M',
    attributes: { agi: 4, for: 2, int: 2, pre: 2, vig: 2 },
    life: [10, 20, 30, 40, 50], // Escalável por nível ou estágio
    armor: 7, // Armadura leve
    actionBonus: '+10 mordida, +5 garra, +5 furtividade, +10 trabalho em grupo, +5 corrida',
    attacks: [
        'Mordida: 3d6 / 3d8+2 / 1d10+grupo',
        'Garra: 4d6 / 2d8+2 / 1d10+grupo',
        'Ataque em Grupo: Se houver 3 ou mais no grupo, cada um ganha +1d6 no ataque e no dano.'
    ],
    abilities: [
        'Pequeno Predador: Apesar de seu tamanho, o compsognathus pode desferir ataques rápidos e precisos, dificultando a reação do inimigo.',
        'Trabalho em Grupo: Quando em grupo, eles podem cercar e confundir inimigos, aplicando desvantagem em testes de percepção e esquiva do alvo.'
    ],
    passiva: 'Caçador Ágil: Ganha +1d6 em testes de esquiva e fuga, devido à sua pequena estatura e agilidade.',
    passivaElemental: 'Fogo: Aplica 1d6 de fogo para cada Asutro em contato, escala 1 dado para cada Austro de fogo.Biolétrica: ataques causam dano extra de elétrico 2d6 em mordida. Morte: aplica torpor em qualquer ataque.',
  
},

'Moros-Intrepidus': {
    title: 'Faxineiro dos Carnívoros',
    image: 'imagens/dinos_moros.webp', // Insira um caminho válido
    weight: '78 kg',
    height: '1,2 M',
    length: '2 M',
    attributes: { agi: 4, for: 2, int: 2, pre: 3, vig: 2 },
    life: 30, // Vida do Moros Intrepidus
    armor: 5, // Armadura do Moros Intrepidus
    actionBonus: '+20 em esquiva, +15 em correr, +10 em furtividade, +15 em gritar para alertar aliados, +10 em detectar ameaças, +5 em ações rápidas',
    attacks: [
        'Mordida Fraca: 2d6+5 (dano mínimo, usado apenas em desespero)', 
        'Investida Ágil: 2d10+10 (permite reposicionamento em combate, ganha +1 na próxima esquiva)'
    ],
    abilities: [
        'Faxina Útil: Quando próximo a grandes carnívoros aliados, o Moros Intrepidus pode limpar restos de carne e parasitas, reduzindo seus efeitos negativos e regenerando 1d6 de vida por rodada do aliado.',
        'Grito de Alerta: Quando ameaçado, o Moros Intrepidus pode soltar um grito que chama grandes predadores aliados em um raio de até 100 metros. Alerta predadores para o perigo, forçando um teste de intimidação contra os oponentes (+3d6).',
        
    ],
    passiva: 'Proteção de Predadores: Quando próximo a grandes carnívoros aliados, o Moros Intrepidus recebe um bônus de +10 na esquiva e intimidação, pois os predadores tendem a protegê-lo instintivamente.',
    passivaElemental: 'Morte: pode se camuplar.Nuclear: coleta dna dos ultimos bichos sobre seus cuidados'
},
'Criolofossauro': {
    title: 'Caçador Congelado',
    image: 'imagens/dinos_criolofossauros.jpg', // Insira um caminho válido
    weight: '50 kg',
    height: '1,5 M',
    length: '3 M',
    attributes: { agi: 4, for: 3, int: 2, pre: 2, vig: 3 },
    life: 45, // Vida do Criolofossauro
    armor: 10, // Armadura do Criolofossauro
    actionBonus: '+15 em esquiva, +15 em escalar, +10 em caçar, +5 em furtividade, +10 em ataques rápidos',
    attacks: [
        'Mordida Congelante: 4d6+10 (causa sangramento, podendo reduzir a agilidade do alvo)',
        'Investida Rápida: 5d10+5 (não deixa o alvo reagir, mas reduz a esquiva do Criolofossauro por 1 rodada)',
        'Corte de Garras: 2d12+10 (golpe rápido com garras afiadas, pode desarmar o inimigo)'
    ],
    abilities: [
        'Sobrevivência no Frio: O Criolofossauro possui resistência ao frio, reduzindo o dano causado por ataques elementais de gelo ou frio em 50%.',
        'Garras Congelantes: Ao atacar com suas garras, o Criolofossauro pode causar uma redução de 1d4 na velocidade do inimigo por 2 rodadas.',
       
    ],
    passiva: 'Agilidade no Gelo: Quando em áreas frias ou com neve, o Criolofossauro ganha +15 em esquiva e pode se mover até duas vezes por rodada.',
    passivaElemental: 'Hypo-Gelo: Ganha resistência a dano de frio e pode fazer ataques elementais de gelo a cada 3 rodadas, causando 3d6 de dano extra.'
},
'Pinguim': {
    title: 'Viajante do Gelo',
    image: 'imagens/dinos_pinguin.webp', // Insira um caminho válido
    weight: '15 kg',
    height: '1 M',
    length: '1,2 M',
    attributes: { agi: 5, for: 2, int: 2, pre: 1, vig: 3 },
    life: 35, // Vida do Pinguim
    armor: 5, // Armadura do Pinguim
    actionBonus: '+25 em natação, +15 em furtividade, +5 em esquiva',
    attacks: [
        'Bico Cortante: 3d6+5 (golpe rápido, pode cortar com o bico e gerar sangramento)',
        'Mergulho: 3d10+5 (ataque rápido enquanto se move de baixo para cima, pode causar dano e empurrar o inimigo)',
        'Golpe de Asa: 2d12+5 (golpe de asa que empurra o inimigo para longe)'
    ],
    abilities: [
        'Adaptado ao Frio: O Pinguim não sofre efeitos negativos de temperaturas extremamente baixas e pode se mover rapidamente em ambientes gelados.',
        'Mergulho Ágil: Ao mergulhar na água, o Pinguim ganha +10 de esquiva e pode atravessar qualquer área aquática com facilidade.',
       
    ],
    passiva: 'Corpo Resistente: Ganha resistência a ataques que causam sangramento ou queimaduras devido ao seu corpo adaptado ao frio.',
    passivaElemental: 'Hypo-abismoelétrico: Pode reduzir o dano de ataques de fogo em 25% e é imune a desidratação em ambientes gelados e consegue mergulhar nas profundezas.'
},
'arqueopterix': {
    title: 'Escalador dos Céus',
    image: 'imagens/dinos_archaeopteryx.jpeg', // Insira um caminho válido
    weight: '2,5 kg',
    height: '0,4 M',
    length: '1 M',
    attributes: { agi: 5, for: 1, int: 3, pre: 2, vig: 1 },
    life: 20, // Vida do Archaeopteryx
    armor: 3, // Armadura do Archaeopteryx
    actionBonus: '+20 em escalar, +15 em furtividade, +10 em voo, +5 em ataque aéreo',
    attacks: [
        'Golpe de Garras: 2d6+5 (golpe rápido com as garras, pode rasgar a pele e causar sangramento)',
        'Bico Perfurante: 3d6+10 (golpe com o bico que pode atingir pontos vulneráveis)',
        'Ataque Aéreo: 2d10+5 (ataque enquanto está voando, ganha +10 de esquiva após o ataque)'
    ],
    abilities: [
        'Escalador Ágil: O Archaeopteryx pode escalar superfícies verticais com facilidade, ganhando +20 em testes de escalada.',
        'Voo Rápido: Pode voar por até 30 metros em um turno, causando 2d10+5 de dano ao aterrissar em um inimigo.',
     
    ],
    passiva: 'Escalada Perfeita: Ao escalar ou voar, o Archaeopteryx ganha +10 em esquiva e +5 em furtividade.',
    passivaElemental: 'Elétrico: Pode aumentar a velocidade de voo em áreas com ventos fortes, permitindo que o Archaeopteryx se mova 1,5 vezes mais rápido.'
},
'Piranha': {
    title: 'O Peixe Endiabrado',
    image: 'imagens/dinos_piranha.webp', // Insira um caminho válido
    weight: '0,5 kg',
    height: '0,4 M',
    length: '0,4 M',
    attributes: { agi: 4, for: 3, int: 1, pre: 1, vig: 3 },
    life: 35, // Vida da Piranha
    armor: 2, // Armadura da Piranha
    actionBonus: '+15 em ataque rápido, +10 em mordida, +5 em esquiva',
    attacks: [
        'Mordida Devastadora: 4d6+5 (destrói pedaços de carne, causando sangramento e acumulando desvantagens no alvo, como quebrado e hemorragia)',
        'Ataque em Grupo: 5d6+5 (se houver aliados próximos, a Piranha ganha +1d6 de dano por criatura adicional)',
        'Investida Aquática: 3d10+5 (investida rápida enquanto a Piranha se move através da água, pode atingir o inimigo e causar dano adicional ao contato)'
    ],
    abilities: [
        'Destruição Implacável: Cada mordida da Piranha causa um efeito acumulativo no inimigo. Cada ataque de mordida aumenta a desvantagem do alvo (sangrando, quebrado, hemorragia).',
        'Caçadora de Cardumes: A Piranha é mais forte em grupos, ganhando bônus de dano e ataque enquanto estiver próxima de outras piranhas.',
      
    ],
    passiva: 'Sanguinária: A cada ataque bem-sucedido, a Piranha causa um efeito adicional de sangramento (1d6 de dano por rodada) até que o inimigo trate o ferimento.',
    passivaElemental: 'Morte: A Piranha ganha +5 em esquiva e +10 em ataques quando está dentro da água ou em ambientes cheio de morte.'
},
'Parasitas': {
    title: 'Parasita Sanguinário',
    image: 'imagens/dinos_parasitas.png', // Insira um caminho válido para imagem
    weight: 'Variante de 0,1 kg a 5 kg', // Peso variável de acordo com a espécie
    height: '0,2 M a 1,5 M', // Tamanho depende da espécie
    length: '0,5 M a 3 M', // Varia de acordo com o parasita
    attributes: { agi: 3, for: 2, int: 1, pre: 1, vig: 4 },
    life: 20, // Vida geral do parasita, pode variar dependendo da espécie
    armor: 0, // Armadura muito baixa ou inexistente
    actionBonus: '+15 em mordida, +10 em sugar vida, +10 em rastejar ou se esconder, +5 em sobrevivência, +15 furtividade',
    attacks: [
        'Mordida Sanguinária: 2d6+5 (a mordida causa perda de vida devido à ingestão de sangue)',
        'Sugamento: 4d8+5 (ao se fixar no alvo, causa perda de vida contínua, drenando o sangue durante 3 rodadas)',
        'Sufocamento (Vermes): 3d6+5 (danos contínuos causados por vermes ou parasitas internos que corroem o organismo de dentro para fora)',
    
    ],
    abilities: [
        'Drenagem Vital: O parasita pode drenar a vida do inimigo a cada rodada, com dano contínuo enquanto estiver fixado no alvo.',
        'Visão Sonora: Muitas espécies de parasitas (como as lampreias) podem detectar movimentos com a vibração da água ou do ar, ganhando vantagem em ataques surpresa.',
      
    ],
    passiva: 'Fixa-se e Drena: Os parasitas são implacáveis, sempre que se fixam na vítima, causam dano contínuo e a drenagem de vida. O inimigo precisa de um teste de resistência para se livrar do parasita.',
    passivaElemental: 'hypo: Ganham 2x vida e aumenta tamanho, lamperia: +2d8 de dano sangramento interno, Fogo: morcego orc, drena o sangue em picadas doloras que queimam 2d8 3x. nuclear: causa dano que muda a mutação do alvo. ',
  
},
'Tubarões': {
    title: 'Predadores dos Mares',
    image: 'imagens/dinos_tubarões.jpeg', // Caminho válido
    weight: 'De 500 kg a 2,5 toneladas', // Peso pode variar dependendo da espécie de tubarão
    height: '1,5 M a 3,5 M', // Tamanho variável dependendo da espécie
    length: 'De 3 M a 18 M', // Tubarões de diferentes tamanhos
    attributes: { agi: 4, for: 5, int: 2, pre: 3, vig: 4 },
    life: 150, // Vida do tubarão (varia com a espécie)
    armor: 65, // Armadura de pele espessa e resistente
    actionBonus: '+15 mordida, +15 esquiva, +15 contra-ataque, +20 luta, +15 detecção de movimento, +10 natação furtiva',
    attacks: [
        'Mordida Fatal: 6d10+25 (mordida poderosa que causa danos enormes com alta chance de sangramento)',
        'Investida Submersa: 5d12+20 (dano adicional devido à aceleração da investida através da água)',
        'Ataque de Cauda: 4d12+15 (cauda poderosa que causa impacto violento e pode atordoar)',
      
    ],
    abilities: [
        'Predador Implacável: O tubarão tem uma habilidade inata de rastrear e caçar suas presas com precisão. Ele tem um bônus em detectar presas com base em movimento e vibração na água.',
        'Visão Subaquática: Adaptado para caçar nas profundezas do oceano, o tubarão possui uma excelente visão em ambientes aquáticos, permitindo rastrear inimigos à distância.',
        
    ],
    passiva: 'Dentição Perigosa: Tubarões possuem dentes afiados que causam danos elevados. Cada mordida tem a chance de deixar o inimigo sangrandoou com hemorragia.',
    passivaElemental: 'Perseguidor: ganha +10 em furtividade e corrida, mais perde 30 de vida. Tigre:+10 intimidar e ganha efeito quebrado na mordida. Cobra: +15 em furtividade e rouba de vida1/4.Presa dupla: causa o dano de mordida 1,5 x e ganah 40 de vida.Fantasma: Aplica esquecimento ou alguma doença na sua mordida. ',
   
},
'dunkleosteus': {
    title: 'O Colosso Marinho',
    image: 'imagens/dinos_dunkleoteuros.webp',
    weight: '4,5 toneladas',
    height: '2,5 M',
    length: '10 M',
    attributes: { agi: 2, for: 5, int: 2, pre: 3, vig: 5 },
    life: 280,
    armor: 50,
    actionBonus: '+30 mordida, +15 bloqueio, +25 cauda, +20 natação, +20 imobilizar',
    attacks: [
        'Mordida de Aço: 9d12+20',
        'Investida Afiada: 8d10',
        'Ataque de Cauda: 7d12+25'
    ],
    abilities: [
        'Escudo Natural: A armadura do Dunkleosteus é tão resistente que pode bloquear grande parte do dano, especialmente contra ataques diretos.',
        'Força Imparável: Quando o Dunkleosteus está com a vida abaixo de 50%, ele ganha um bônus de 1,5x no dano de mordida e cauda.'
    ],
    passiva: 'Couraça de aço: pode minerar minérios e coletar me grande escala.',
    passivaElemental: 'Hypo: +40 de vida e +10 bloqueio, fora ser maior.',
},
'Megalodon': {
    title: 'O Predador Supremo',
    image: 'imagens/dinos_megalodon.jpg',
    weight: '40 toneladas',
    height: '6 M',
    length: '18 M',
    attributes: { agi: 3, for: 5, int: 2, pre: 4, vig: 4 },
    life: 280,
    armor: 40,
    actionBonus: '+35 mordida, +25 natação, +20 esquiva, +10 cauda, +25 contra-ataque',
    attacks: [
        'Mordida Devastadora: 12d12+50',
        'Investida Aquática: 10d12+40',
        'Ataque de Cauda: 8d12+30'
    ],
    abilities: [
        'Contra-Ataque Imparável: Quando o Megalodon é atacado, há uma chance de 40% de ele realizar um contra-ataque com 1,5x o dano normal.',
        'Inimigo do Mossasaurus: O Megalodon possui um bônus de 50% de dano contra o Mossasaurus devido à rivalidade entre as espécies.'
    ],
    passiva: 'Força Devastadora: O Megalodon causa 1,5x de dano a inimigos com menos de 25% de vida, devido ao seu instinto predador feroz.',
    passivaElemental: 'Abismo Elétrico: O Megalodon gera uma onda elétrica ao redor de seu corpo, causando dano de 3d10 a todos os inimigos que se aproximam a menos de 2 metros.'
},

'Orca': {
    title: 'A Caçadora Inteligente',
    image: 'imagens/dinos_orca.webp',
    weight: '6 toneladas',
    height: '2,5 M',
    length: '9 M',
    attributes: { agi: 4, for: 3, int: 5, pre: 3, vig: 3 },
    life: 210,
    armor: 30,
    actionBonus: '+25 mordida, +20 natação, +30 esquiva, +20 intimidação, +15 cauda',
    attacks: [
        'Mordida Poderosa: 7d10+25',
        'Investida Coordenada: 6d10+30',
        'Ataque de Cauda: 5d10+25'
    ],
    abilities: [
        'Caçadora de Cardumes: A Orca tem um bônus de +20 quando ataca em grupo, coordenando ataques com outras Orcas.',
        'Rivalidade com Tubarões: Orcas causam 1,5x de dano contra Tubarões, devido à natureza competitiva entre as espécies.'
    ],
    passiva: 'Inteligência Tática: A Orca pode realizar um ataque adicional a cada 3 rodadas de combate, devido à sua habilidade de coordenar ataques com seu grupo.',
    passivaElemental: 'Abismo Elétrico: Orcas geram uma onda elétrica em ataques de cauda, causando 3d12 de dano elétrico aos inimigos em um raio de 2 metros de seu corpo.'
},
'plesiosauros': {
    title: 'Caçador das Profundezas',
    image: 'imagens/dinos_plesiosaurus.jpg',
    weight: '4 toneladas',
    height: '5 M',
    length: '12 M',
    attributes: { agi: 4, for: 3, int: 3, pre: 2, vig: 4 },
    life: 180,
    armor: 25,
    actionBonus: '+25 natação, +30 esquiva, +20 pesca, +15 emboscada',
    attacks: [
        'Ataque de Pescoço Longo: 8d10+30',
        'Investida Aquática: 7d12+25',
        'Garra Cortante: 6d12+20'
    ],
    abilities: [
        'Emboscada Marinha: O Plesiosaurus pode realizar um ataque surpresa a inimigos despreparados ao atacar de baixo d\'água, aplicando desvantagem.',
        'Pesca Rápida: Ao atacar na água, Plesiosaurus ganha um bônus de +15 em todos os ataques relacionados a capturar ou ferir presas aquáticas.'
    ],
    passiva: 'Alcance de Pescoço: O Plesiosaurus pode atingir inimigos a uma distância considerável com seu pescoço longo, evitando ataques corpo a corpo diretos.',
    passivaElemental: 'Água: O Plesiosaurus é imbatível na água, ganhando um bônus de +20 de esquiva quando em combate aquático.'
},
'Mossasauros': {
    title: 'O Predador Colossal',
    image: 'imagens/dinos_mossasaurus.jpg',
    weight: '40 toneladas',
    height: '6 M',
    length: '18 M',
    attributes: { agi: 2, for: 5, int: 2, pre: 3, vig: 5 },
    life: 400,
    armor: 60,
    actionBonus: '+40 mordida, +30 natação, +20 investida, +35 cauda, +25 contra-ataque',
    attacks: [
        'Mordida Colossal: 15d12+50',
        'Investida Brutal: 10d12+40',
        'Ataque de Cauda: 9d12+35'
    ],
    abilities: [
        'Soberano dos Mares: O Mossasaurus tem vantagem em combate contra outros predadores marinhos, causando 1,5x de dano contra criaturas como o Megalodon.',
        'Imunidade ao Choque: O Mossasaurus é imune a efeitos de choque ou eletricidade, incluindo os de enguias e criaturas elétricas.'
    ],
    passiva: 'Destruição Imparável: O Mossasaurus ignora 20% da armadura de inimigos em combate devido à sua força bruta.',
    passivaElemental: 'Abismo Elétrico: Ao se mover rapidamente na água, o Mossasaurus gera uma onda elétrica que causa 3d12 de dano a inimigos próximos.'
},
'liopleurodonte': {
    title: 'Predador Silencioso',
    image: 'imagens/dinos_lioplurodon.jpeg',
    weight: '10 toneladas',
    height: '4 M',
    length: '15 M',
    attributes: { agi: 4, for: 4, int: 3, pre: 2, vig: 4 },
    life: 250,
    armor: 30,
    actionBonus: '+35 mordida, +25 natação, +15 esquiva, +20 cauda',
    attacks: [
        'Mordida de Caçador: 12d10+40',
        'Investida Silenciosa: 10d12+30',
        'Ataque de Cauda: 8d12+25'
    ],
    abilities: [
        'Aura de Sorte: Criaturas que lutam ao lado do Liopleurodon têm 20% mais chances de receber um item raro ao derrotar um inimigo.',
        'Corte de Pescoço: Ao acertar um ataque com a mordida, o Liopleurodon aplica um efeito de sangramento por 3 rodadas.'
    ],
    passiva: 'Predador Silencioso: O Liopleurodon tem 20% mais chance de criticar ao atacar inimigos que estão distraídos ou não perceberam sua presença.',
    passivaElemental: 'Água: O Liopleurodon ganha 15% de regeneração de vida quando está em combate submerso na água.'
},
'helicoprion': {
    title: 'O Tubarão Serrilhado',
    image: 'imagens/dinos_helicoprion.jpg',
    weight: '1,5 toneladas',
    height: '2 M',
    length: '6 M',
    attributes: { agi: 3, for: 4, int: 2, pre: 3, vig: 3 },
    life: 200,
    armor: 35,
    actionBonus: '+30 mordida, +20 investida, +25 natação, +20 hemorragia',
    attacks: [
        'Mordida Serrilhada: 9d12+40',
        'Investida Cortante: 8d10+30',
        'Ataque de Cauda: 6d12+25'
    ],
    abilities: [
        'Serra Cortante: A mordida do Helicoprion aplica o efeito de hemorragia, causando 3d6 de dano adicional por rodada.',
        'Lentidão Serrilhada: O Helicoprion aplica um efeito de lentidão no inimigo após sua mordida, diminuindo a agilidade do alvo em 2 pontos por 3 rodadas.'
    ],
    passiva: 'Serra Mortal: O Helicoprion pode aplicar um dano extra de 2d10 em sua mordida a cada 3 rodadas, acumulando-se com o efeito de hemorragia.',
    passivaElemental: 'Abismo Elétrico: O Helicoprion emite uma leve carga elétrica ao atacar, causando 2d10 de dano elétrico adicional aos inimigos atingidos.'
},

'poraque': {
    title: 'A Enguia Elétrica',
    image: 'imagens/dinos_poraque.webp',
    weight: '0,2 toneladas',
    height: '1,8 M',
    length: '3 M',
    attributes: { agi: 4, for: 2, int: 2, pre: 1, vig: 3 },
    life: 150,
    armor: 20,
    actionBonus: '+25 choque, +30 natação, +10 esquiva, +15 investida',
    attacks: [
        'Ataque Elétrico: 8d10+25',
        'Investida Elétrica: 7d12+20',
        'Choque Paralizante: 6d12+15'
    ],
    abilities: [
        'Choque de Rebanho: O Poraque ganha um bônus de +10 no ataque sempre que outro Poraque estiver próximo dele.',
        'Eletro-Defesa: Sempre que atacado, o Poraque tem uma chance de 30% de gerar um campo elétrico que causa 2d10 de dano a quem o atacar.'
    ],
    passiva: 'Corrente Elétrica: O Poraque pode gerar um campo de eletricidade ao nadar em alta velocidade, causando dano adicional de 3d10 aos inimigos próximos.',
    passivaElemental: 'Elétrica: O Poraque tem a habilidade de aplicar choques em áreas ao seu redor, aumentando o dano de ataques em água por 2 rodadas.'
},
'peixe-pescador': {
    title: 'Luz das Profundezas',
    image: 'imagens/dinos_pescador.jpg',
    weight: '0,1 toneladas',
    height: '2 M',
    length: '3 M',
    attributes: { agi: 3, for: 2, int: 3, pre: 4, vig: 2 },
    life: 120,
    armor: 15,
    actionBonus: '+15 atração, +25 natação, +10 esquiva, +15 investida',
    attacks: [
        'Luz Atraente: 6d12+20',
        'Investida Escura: 5d12+15',
        'Ataque de Mordida: 4d12+10'
    ],
    abilities: [
        'Ilusão das Profundezas: O Peixe-Pescador pode atrair e enganar inimigos com sua luz, criando uma área de desvantagem para os inimigos dentro do alcance de sua luz.',
        'Sutil: A habilidade de nadar sem fazer barulho permite que o Peixe-Pescador se aproxime de suas presas sem ser detectado, ganhando vantagem nos ataques surpresa.'
    ],
    passiva: 'Luz da Morte: Ao atrair presas para perto, o Peixe-Pescador aplica um dano extra de 2d10 por rodada aos inimigos que ficam muito perto da luz.',
    passivaElemental: 'Água: O Peixe-Pescador tem um bônus de +20 em esquiva e regeneração de vida quando estiver em combate submerso na água.'
},

'Carnotauro': {
    title: 'O Duelo Mortal',
    image: 'imagens/dinos_carnotauro.jpg',
    weight: '2 toneladas',
    height: '4 M',
    length: '8 M',
    attributes: { agi: 3, for: 4, int: 2, pre: 3, vig: 4 },
    life: 200,
    armor: 30,
    actionBonus: '+30 investida, +25 mordida, +20 cabeçada, +15 bloquear, +10 esquiva',
    attacks: [
        'Investida com Chifres: 9d12+35',
        'Mordida Brutal: 8d10+30',
        'Ataque de Cabeçada: 7d12+25'
    ],
    abilities: [
        'Duelo Solitário: Quando enfrentando apenas um inimigo, o Carnotauro ganha +10 em todos os ataques e +10 em esquiva.',
        'Quebrador de Ossos: Ao acertar a investida com os chifres, o Carnotauro aplica o efeito **quebrado**, reduzindo a força ou agilidade do alvo em 1 ponto por 3 rodadas.'
    ],
    passiva: 'Coragem Predatória: O Carnotauro é imune a qualquer efeito de medo ou intimidação, mantendo-se focado mesmo contra inimigos maiores ou mais numerosos.',
    passivaElemental: 'Fogo: Durante a investida, os chifres do Carnotauro podem incendiar, causando um dano adicional de 3d10 de fogo e aplicando o efeito de queimadura por 2 rodadas.'
},
'Majugassauro': {
    title: 'O Empurrador Implacável',
    image: 'imagens/dinos_majugassauro.png',
    weight: '3 toneladas',
    height: '4 M',
    length: '8 M',
    attributes: { agi: 2, for: 4, int: 2, pre: 2, vig: 5 },
    life: 220,
    armor: 40,
    actionBonus: '+25 investida, +20 empurrão, +15 imobilizar, +10 mordida, +10 bloquear',
    attacks: [
        'Investida Pesada: 8d10+25 (aplica lentidão e desvantagem por 2 rodadas)',
        'Empurrão Brutal: 7d12+20 (empurra o alvo e causa dano reduzido se colidir com obstáculos)',
        'Mordida Canibalística: 6d10+15 (restaura 10 de vida se o alvo estiver ferido)'
    ],
    abilities: [
        'Controle de Terreno: Qualquer alvo que sofra uma investida do Mujagassauro fica com sua movimentação reduzida em 50% por 2 rodadas.',
        'Canibal Frenético: Ao derrotar um inimigo, o Mujagassauro restaura 20% de sua vida máxima, mas apenas se for outra criatura carnívora ou da mesma espécie.'
    ],
    passiva: 'Tanque Resistente: Reduz todos os danos recebidos em 10% e ignora efeitos negativos de força e vigor que tentem derrubá-lo ou empurrá-lo.',
    passivaElemental: 'Fogo: Suas investidas e mordidas inflamam o alvo, causando 2d10 de dano de fogo adicional por rodada enquanto o efeito durar.'
},
'Abelissauros': {
    title: 'O Predador Fantasma',
    image: 'imagens/dinos_abelissauros.jpg',
    weight: '1,8 toneladas',
    height: '4 M',
    length: '8 M',
    attributes: { agi: 4, for: 3, int: 2, pre: 3, vig: 3 },
    life: 180,
    armor: 25,
    actionBonus: '+30 ataque furtivo, +20 mordida, +15 corrida, +15 esquiva, +10 bloquear',
    attacks: [
        'Mordida Furtiva: 6d12+25 (dano dobrado se o alvo estiver distraído ou de costas)',
        'Investida Rápida: 5d10+20 (aplica desvantagem ao alvo por 1 rodada)',
        'Garras Precisas: 6d8+15 (ignora 5 pontos de armadura do alvo se o ataque for bem-sucedido)'
    ],
    abilities: [
        'Flanqueador Nascido: O Abelissauro ganha vantagem em todos os ataques contra alvos que não estejam olhando diretamente para ele.',
        'Corrida Espectral: Após atacar, pode recuar 5 metros sem provocar ataques de oportunidade, ideal para emboscadas.'
    ],
    passiva: 'Caçador Silencioso: Sua presença é difícil de detectar, o que o torna imune a habilidades de percepção passiva ou ativa em um raio de 10 metros.',
    passivaElemental: 'Elétrico: Seus ataques rápidos podem liberar um choque, aplicando lentidão no alvo e causando 1d12 de dano adicional de eletricidade por rodada durante 2 rodadas.'
},
'Carcharodontossauro': {
    title: 'O Sanguinário Implacável',
    image: 'imagens/dinos_carcharodontossauro.webp',
    weight: '6 toneladas',
    height: '6 M',
    length: '14 M',
    attributes: { agi: 3, for: 5, int: 2, pre: 3, vig: 4 },
    life: 240,
    armor: 30,
    actionBonus: '+30 mordida, +20 investida, +15 intimidar, +15 contra-ataque, +10 esmagar',
    attacks: [
        'Mordida Sanguinária: 8d12+30 (ganha um bônus de +10 dano adicional para cada alvo diferente mordido)',
        'Investida Poderosa: 6d10+20 (derruba o alvo se o ataque for bem-sucedido)',
        'Golpe de Cauda: 5d8+15 (atinge todos os inimigos próximos em um arco de 180°)'
    ],
    abilities: [
        'Fúria Sanguinária: Para cada alvo diferente mordido em uma rodada, ganha um aumento de 10% em dano e velocidade de ataque acumulativos por 2 rodadas.',
        'Regeneração Frenética: Quando sua vida cai abaixo de 50%, regenera pontos de vida iguais a 50% do dano causado por suas mordidas.'
    ],
    passiva: 'Terror Colossal: Sua presença causa desvantagem em testes de coragem e provoca alvos mais fracos a fugirem em um raio de 10 metros.',
    passivaElemental: 'Sangue: Sua mordida pode causar efeitos de sangramento severo (1d12 por rodada), e o dano aumenta conforme o oponente está mais ferido (+10 dano adicional para inimigos abaixo de 30% de vida).'
},
'Acrocantossauros': {
    title: 'A Máquina de Guerra',
    image: 'imagens/dinos_acrocantossauros.webp',
    weight: '6,5 toneladas',
    height: '6,5 M',
    length: '12 M',
    attributes: { agi: 3, for: 5, int: 3, pre: 3, vig: 5 },
    life: 280,
    armor: 35,
    actionBonus: '+30 mordida, +25 empurrão, +20 postura defensiva, +15 rugido de batalha',
    attacks: [
        'Mordida Poderosa: 9d12+35 (empurra o alvo 5 metros para trás em postura ofensiva)',
        'Empurrão de Defesa: 6d8+20 (causa dano menor, mas empurra alvos em um raio de 3 metros na postura defensiva)',
        'Golpe de Investida: 8d10+25 (atinge com força total, ideal para iniciar um ataque em postura ofensiva)'
    ],
    abilities: [
        'Postura Ofensiva: Foca em ataques devastadores. A mordida pode empurrar inimigos, e ele ganha +10% de dano por rodada enquanto mantiver essa postura.',
        'Postura Defensiva: Reduz o dano físico e balístico em 25%. Quando ataca nessa postura, causa dano reduzido, mas empurra todos os inimigos próximos, ideal para controlar o campo de batalha.'
    ],
    passiva: 'Adrenalina de Guerra: Ao sofrer dano, acumula adrenalina. Quando atinge um limite, pode liberar um **Rugido de Guerra**, que cura aliados próximos em 15% de sua vida máxima e aumenta seu dano e velocidade em 20% por 2 rodadas.',
    passivaElemental: 'Fogo: O Acrocantossauro pode fazer sua armadura natural incandescer ou endurecer, reduzindo ainda mais o dano recebido e queimando qualquer inimigo que o toque (1d12 de dano por rodada enquanto estiver em contato).'
},
'Giganotossauros': {
    title: 'O Destruidor',
    image: 'imagens/dinos_giganotossauro.webp',
    weight: '10 toneladas',
    height: '7,4 M',
    length: '14 M',
    attributes: { agi: 3, for: 6, int: 2, pre: 4, vig: 6 },
    life: 360,
    armor: 40,
    actionBonus: '+35 mordida, +30 esmagar, +20 quebrar, +25 intimidar, +10 bloquear',
    attacks: [
        'Mordida Devastadora: 10d12+40 (aplica **quebrado** ao atingir estruturas ou inimigos grandes)',
        'Golpe Esmagador: 8d10+30 (atinge com força bruta, causando dano em área e destruição a muros e barricadas)',
        'Carga Intimidante: 7d8+25 (intimida inimigos próximos, reduzindo a precisão deles em 10% por 2 rodadas)'
    ],
    abilities: [
        'Rivalidade Ancestral: Quando enfrenta um T-Rex, ganha +15 de defesa e +10% de dano, além de imunidade a intimidação.',
        'Predador Colossal: Atrai predadores grandes para o campo de batalha, usando sua presença intimidadora para controlar a situação.'
    ],
    passiva: 'Digestão Rápida: Cura 10% de sua vida máxima sempre que consome carne fresca ou devora o corpo de um inimigo derrotado.',
    passivaElemental: 'Fogo: A força do Giganotossauro queima com intensidade. Cada golpe que acerta cria uma explosão de chamas que causa 2d12 de dano de fogo em área e pode incendiar o ambiente ao redor.'
},
'Alossauros': {
    title: 'O Caçador Ágil',
    image: 'imagens/dinos_alossauro.webp',
    weight: '2 toneladas',
    height: '4,5 M',
    length: '10 M',
    attributes: { agi: 5, for: 4, int: 3, pre: 4, vig: 4 },
    life: 220,
    armor: 20,
    actionBonus: '+30 mordida, +25 cortes rápidos, +20 furtividade, +15 esquiva, +10 emboscada',
    attacks: [
        'Mordida Sangrenta: 6d10+20 (aplica **sangramento**, causando 2d6 de dano contínuo por 3 rodadas)',
        'Investida Furtiva: 5d8+15 (ataca zonas frágeis do inimigo, causando desvantagem nos próximos ataques do alvo por 2 rodadas)',
        'Rasgo Implacável: 4d10+10 (sequência de mordidas rápidas, com chance de aplicar **hemorragia** se o alvo já estiver sangrando)'
    ],
    abilities: [
        'Perseguir e Destruir: Ganha +10 de dano contra inimigos que já estejam sofrendo efeitos de sangramento ou hemorragia.',
        'Emboscador Notório: Quando ataca vindo de uma posição oculta, ganha um bônus de +15 na precisão e no dano.'
    ],
    passiva: 'Predador Estratégico: Reduz a velocidade e a força do alvo a cada ataque consecutivo, acumulando desvantagem no movimento e defesa enquanto o alvo perde sangue.',
    passivaElemental: 'Fogo: Seus ataques deixam queimaduras no alvo, causando dano adicional de 1d12 de fogo por rodada. Isso aumenta sua furtividade, pois a fumaça atrapalha a visão dos inimigos próximos.'
},
'Ceratossauro': {
    title: 'O Infectado Predador',
    image: 'imagens/dinos_ceratossauro.jpg',
    weight: '2,5 toneladas',
    height: '4,5 M',
    length: '9 M',
    attributes: { agi: 3, for: 4, int: 3, pre: 4, vig: 5 },
    life: 250,
    armor: 30,
    actionBonus: '+25 mordida infecciosa, +20 rastreamento, +15 empurrar, +15 bloquear, +10 pisada',
    attacks: [
        'Mordida Contaminada: 5d12+15 (aplica **infecção** causando 1d10 de dano contínuo por rodada, acumulando até 3 vezes)',
        'Golpe com Chifres: 4d10+10 (derruba o alvo e causa **desvantagem** nos ataques por 2 rodadas)',
        'Investida Tanque: 6d8+20 (carrega com força, causando dano em área e empurrando inimigos próximos)'
    ],
    abilities: [
        'Raiva Bacteriana: Ao acertar 3 ataques consecutivos no mesmo alvo, aplica **Mega Raiva**, reduzindo vigor e causando dano adicional de 2d12 por rodada até ser curado.',
        'Caçador Preguiçoso: Após eliminar um inimigo, o Ceratossauro pode consumir o cadáver para regenerar 50 pontos de vida e ganhar +10 de resistência contra o próximo ataque.'
    ],
    passiva: 'Bactérias Acumulativas: Cada rodada em combate aumenta a intensidade de seus efeitos de infecção, tornando suas mordidas progressivamente mais letais.',
    passivaElemental: 'Fogo: Seus ataques inflamam as bactérias acumuladas, causando uma explosão ao atingir o inimigo e aplicando queimaduras graves que reduzem a eficácia das curas em 50%.'
},
'Deinonico': {
    title: 'O Caçador em Grupo',
    image: 'imagens/dinos_deinonico.webp',
    weight: '70 kg',
    height: '1,8 M',
    length: '4 M',
    attributes: { agi: 4, for: 3, int: 3, pre: 4, vig: 3 },
    life: 90,
    armor: 15,
    actionBonus: '+20 mordida ágil, +15 garras rápidas, +15 saltar, +10 esquiva, +10 rastreamento',
    attacks: [
        'Mordida Rápida: 4d8+10 (aplica **infecção leve**, causando 1d8 de dano contínuo por rodada por 2 rodadas)',
        'Garra Saltadora: 5d6+10 (ataca pontos frágeis do alvo, reduzindo armadura em -5 por 2 rodadas)',
        'Ataque Coordenado: 6d6+15 (só pode ser usado em grupo, causa dano adicional por cada Deinonico atacando o mesmo alvo [+2 por aliado])'
    ],
    abilities: [
        'Rastreador Preciso: O Deinonico ganha bônus de +10 em rastreamento e pode prever movimentos do inimigo, aplicando **desvantagem** no próximo ataque do alvo.',
        'Ataque em Grupo: Para cada aliado próximo, o Deinonico recebe +5 em agilidade e +5 no bônus de ataque, maximizando a eficiência do grupo.'
    ],
    passiva: 'Predador de Matilha: Quando há 3 ou mais Deinonicos atacando juntos, todos recebem um aumento de +10 em resistência contra ataques e regeneram 10 pontos de vida por rodada.',
    passivaElemental: 'Elétrica: Ganha um aumento de velocidade enquanto ataca, podendo realizar um ataque adicional a cada rodada em grupos com mais de dois aliados.'
},

'Albertossauro': {
    title: 'O Rastreador Estratégico',
    image: 'imagens/dinos_albertosauros.webp',
    weight: '2 toneladas',
    height: '5 M',
    length: '9 M',
    attributes: { agi: 3, for: 4, int: 3, pre: 5, vig: 4 },
    life: 240,
    armor: 18,
    actionBonus: '+25 mordida poderosa, +20 farejar, +15 rastrear, +15 esquivar, +10 bloquear',
    attacks: [
        'Mordida Poderosa: 6d10+20 (aplica **quebrado**, reduzindo a eficiência do alvo por 2 rodadas)',
        'Investida Estratégica: 5d8+15 (ataca com precisão e empurra o inimigo 2 metros para trás)',
        'Golpe de Cauda: 4d6+10 (útil para controlar áreas e derrubar inimigos menores ao alcance)'
    ],
    abilities: [
        'Rastreador Preciso: O Albertossauro pode localizar qualquer criatura a até 500 metros de distância, recebendo +10 em rastreamento e podendo antecipar a presença do inimigo.',
        'Instinto Predador: Quando rastreia um alvo, seus ataques recebem +5 de bônus e ele ignora 5 pontos de armadura do inimigo.'
    ],
    passiva: 'Predador Incansável: O Albertossauro recupera 10 pontos de vida sempre que elimina um inimigo, ganhando também +5 no próximo ataque.',
    passivaElemental: 'Fogo: Sua mordida e ataques corpo a corpo causam 2d8 de dano adicional de fogo por rodada enquanto o inimigo estiver queimando.'
},

'Hererassauros': {
    title: 'O Predador Invisível',
    image: 'imagens/dinos_heressauros.jpeg',
    weight: '350 kg',
    height: '3 M',
    length: '6 M',
    attributes: { agi: 5, for: 3, int: 3, pre: 4, vig: 3 },
    life: 120,
    armor: 12,
    actionBonus: '+25 furtividade, +20 emboscada, +15 esquiva, +10 bloquear',
    attacks: [
        'Mordida Rápida: 4d8+10 (causa sangramento leve por 2 rodadas)',
        'Garra Furtiva: 5d8+15 (se usado em emboscada, aplica desvantagem no alvo por 1 rodada)',
        'Investida Camuflada: 3d8+10 (ignora a armadura se usado na furtividade)'
    ],
    abilities: [
        'Mestre da Camuflagem: Pode se esconder perfeitamente em áreas de floresta, recebendo +15 em furtividade e anulando percepção visual de inimigos próximos.',
        'Ataque Surpresa: Quando ataca em furtividade, seus ataques recebem +10 no dano e bônus crítico em 18-20.'
    ],
    passiva: 'Predador Silencioso: Recupera 5 pontos de vida toda vez que elimina um inimigo enquanto está em furtividade.',
    passivaElemental: 'Elétrico: Em regiões florestais ou próximas de água, seus ataques geram descargas elétricas de 2d6 adicionais.'
},
'Metriacontossauro': {
    title: 'O Observador Estratégico',
    image: 'imagens/dinos_metriacontossauro.jpeg',
    weight: '500 kg',
    height: '4 M',
    length: '8 M',
    attributes: { agi: 4, for: 3, int: 4, pre: 5, vig: 3 },
    life: 150,
    armor: 14,
    actionBonus: '+20 observação, +20 esquiva, +15 rastrear, +15 hipnose',
    attacks: [
        'Mordida Tática: 4d10+15 (causa lentidão no alvo por 2 rodadas)',
        'Garra Precisa: 4d8+10 (aplica desvantagem no próximo teste de esquiva do alvo)',
        'Hipnose Instintiva: 3d8+5 (faz o alvo perder sua ação por 1 rodada)'
    ],
    abilities: [
        'Análise do Terreno: Recebe +10 em percepção e rastreamento, podendo detectar fraquezas no inimigo após 2 rodadas de observação.',
        'Controle de Combate: Pode hipnotizar inimigos, aplicando lentidão ou desorientação em área de 5 metros.'
    ],
    passiva: 'Predador Paciente: Recebe +5 em defesa e ataque para cada rodada que passa observando sem agir.',
    passivaElemental: 'Gelo: Seus ataques reduzem a velocidade dos inimigos em 50% por 2 rodadas adicionais.'
},
'Rajassauros': {
    title: 'O Imobilizador Ágil',
    image: 'imagens/dinos_rajasaurus.jpg',
    weight: '700 kg',
    height: '3,5 M',
    length: '7 M',
    attributes: { agi: 3, for: 4, int: 3, pre: 3, vig: 4 },
    life: 200,
    armor: 16,
    actionBonus: '+25 investida, +20 mordida, +15 bloquear, +15 imobilizar',
    attacks: [
        'Mordida Poderosa: 5d10+15 (aplica lentidão por 2 rodadas)',
        'Investida Imobilizadora: 6d8+10 (empurra e derruba o alvo no impacto)',
        'Cabeçada: 5d8+10 (causa atordoamento no alvo por 1 rodada)'
    ],
    abilities: [
        'Empurrão Selvagem: Pode usar investidas para desestabilizar inimigos, derrubando-os e aplicando desvantagem em reações.',
        'Resistência Implacável: Recebe +5 em armadura contra ataques físicos diretos.'
    ],
    passiva: 'Fúria do Caçador: Ganha +5 de bônus em dano para cada inimigo imobilizado próximo.',
    passivaElemental: 'Fogo: Suas investidas e cabeçadas geram uma onda de calor, causando 2d6 adicionais em dano de fogo.'
},
'Yutiranos': {
    title: 'O Inspirador do Gelo',
    image: 'imagens/dinos_yutiranos.webp',
    weight: '2 toneladas',
    height: '4,5 M',
    length: '9 M',
    attributes: { agi: 3, for: 4, int: 4, pre: 5, vig: 4 },
    life: 250,
    armor: 18,
    actionBonus: '+25 rugido inspirador, +20 mordida, +15 bloquear, +5 esquiva',
    attacks: [
        'Mordida Glacial: 6d10+15 (aplica lentidão e sangramento leve no alvo)',
        'Garra Imponente: 5d8+10 (causa desvantagem em ataques do inimigo na rodada seguinte)',
        'Rugido do Terror: 3d8+5 (provoca medo e reduz a eficácia do inimigo em 50% por 2 rodadas)'
    ],
    abilities: [
        'Aura de Inspiração: Todas as criaturas aliadas recebem +10 em dano e velocidade enquanto estiverem próximas do Yutiranos.',
        'Grito Aterrorizante: Inimigos ao alcance sofrem medo, recebendo desvantagem em todas as ações por 1 rodada.'
    ],
    passiva: 'Sobrevivente Glacial: Recebe resistência a ataques de gelo e regeneração de 10 pontos de vida por rodada em ambientes frios.',
    passivaElemental: 'Gelo: Seus ataques têm chance de congelar o inimigo por 1 rodada (1d4 no congelamento).'
},
'Suchumimus': {
    title: 'O Rei da Margem',
    image: 'imagens/dinos_suchumimos.webp',
    weight: '1,8 toneladas',
    height: '5 M',
    length: '11 M',
    attributes: { agi: 3, for: 4, int: 3, pre: 4, vig: 4 },
    life: 280,
    armor: 20,
    actionBonus: '+25 mordida, +20 intimidar, +15 nadar, +15 bloquear, +5 esquiva',
    attacks: [
        'Mordida de Alcance: 6d12+20 (aplica desvantagem em reações de inimigos atingidos)',
        'Giro Mortal: 5d10+15 (causa dano extra de 2d10 na água e sangramento por 2 rodadas)',
        'Investida Aquática: 4d8+10 (empurra o alvo e reduz sua armadura em 5 por 1 rodada)'
    ],
    abilities: [
        'Predador de Peixes: Recupera 10 pontos de vida ao eliminar criaturas aquáticas pequenas ou médias.',
        'Alcance Intimidador: Inimigos próximos ao Suchomimo recebem desvantagem em testes de coragem e ataques enquanto ele estiver em posição de ataque.'
    ],
    passiva: 'Fúria Aquática: Ganha +5 de bônus em dano e +2 em armadura quando em ambientes aquáticos.',
    passivaElemental: 'Água: Seus ataques na água geram ondas de impacto, causando 2d6 adicionais em dano de concussão.'
},
'Barionix': {
    title: 'O Brigão Aquático',
    image: 'imagens/dinos_barionix.jpg',
    weight: '1,2 toneladas',
    height: '4 M',
    length: '9 M',
    attributes: { agi: 3, for: 4, int: 3, pre: 4, vig: 4 },
    life: 200,
    armor: 18,
    actionBonus: '+25 mordida, +20 intimidar, +20 bloquear, +15 nadar',
    attacks: [
        'Mordida Poderosa: 7d10+25 (causa desvantagem em defesa ao alvo por 1 rodada)',
        'Giro Selvagem: 6d10+20 (sangramento e dano extra de 2d8 em alvos na água)',
        'Impacto Direto: 5d8+15 (empurra o alvo e reduz a velocidade em 50%)'
    ],
    abilities: [
        'Pescador Nato: Recupera 15 pontos de vida ao consumir criaturas aquáticas.',
        'Espírito Brigão: Ganha +10 em ataques ao receber dano em combate direto.'
    ],
    passiva: 'Instinto de Sobrevivência: Recebe +2 em vigor e +3 em força ao estar com menos de 50% da vida.',
    passivaElemental: 'Água: Seus ataques causam dano adicional de 2d6 e empurram os alvos para longe em ambientes aquáticos.'
},
'Irritator': {
    title: 'O Pequeno Brigão',
    image: 'imagens/dinos_irritator.jpg',
    weight: '900 kg',
    height: '3,5 M',
    length: '8 M',
    attributes: { agi: 3, for: 3, int: 3, pre: 4, vig: 3 },
    life: 160,
    armor: 15,
    actionBonus: '+20 mordida, +15 intimidar, +15 nadar, +10 bloquear',
    attacks: [
        'Mordida Ágil: 6d8+20 (causa desvantagem ao alvo em ações ofensivas por 1 rodada)',
        'Giro Rápido: 5d8+15 (aplica sangramento e dano extra de 2d6 na água)',
        'Investida Precisa: 4d8+10 (reduz a armadura do alvo em 5 por 1 rodada)'
    ],
    abilities: [
        'Pequeno Predador: Recupera 10 pontos de vida ao consumir criaturas aquáticas pequenas.',
        'Adaptabilidade Rápida: Recebe +5 em esquiva e +10 em velocidade na água.'
    ],
    passiva: 'Espírito Lutador: Ganha +3 de bônus em força e vigor ao enfrentar alvos maiores.',
    passivaElemental: 'Água: Seus ataques criam redemoinhos que causam 1d8 adicional em dano por concussão.'
},
'Oshalaia': {
    title: 'O Velho Pescador',
    image: 'imagens/dinos_oxalaia.jpg',
    weight: '4 toneladas',
    height: '6 M',
    length: '12 M',
    attributes: { agi: 3, for: 4, int: 3, pre: 4, vig: 5 },
    life: 300,
    armor: 20,
    actionBonus: '+25 mordida, +20 furtividade, +20 nadar, +15 bloquear, +5 esquiva',
    attacks: [
        'Mordida Poderosa: 8d10+30 (aplica sangramento por 2 rodadas)',
        'Investida Submersa: 6d10+25 (só utilizável na água, reduz a defesa do alvo em 10 por 1 rodada)',
        'Golpe Surpresa: 5d10+20 (recebe +10 no ataque se o alvo não percebe sua presença)'
    ],
    abilities: [
        'Sobrevivente das Margens: Pode sobreviver por longos períodos com pouca comida e recupera 20 pontos de vida ao consumir alimentos já deixados.',
        'Furtividade Aquática: Ganha +15 em furtividade quando submerso e é quase indetectável em rios ou lagos.'
    ],
    passiva: 'Pescador Nato: Recebe um bônus de +5 em vigor e força ao caçar presas aquáticas.',
    passivaElemental: 'Água: Seus ataques aquáticos causam dano adicional de 3d6 e reduzem a velocidade do alvo em 50%.'
},
'Dimotrodonte': {
    title: 'O Regulador de Temperatura',
    image: 'imagens/dinos_dimotrodonte.webp',
    weight: '200 kg',
    height: '2 M',
    length: '3 M',
    attributes: { agi: 2, for: 4, int: 2, pre: 3, vig: 4 },
    life: 120,
    armor: 10,
    actionBonus: '+20 mordida, +15 nadar, +10 bloquear',
    attacks: [
        'Mordida Infecciosa: 6d10+20 (aplica infecção ao alvo, causando -5 em vigor por 2 rodadas)',
        'Golpe Preguiçoso: 4d10+15 (dano reduzido, mas recupera 10 pontos de vida)',
        'Investida Regenerativa: 5d10+20 (apenas após 1 rodada parado, ganha +15 em vigor por 2 rodadas)'
    ],
    abilities: [
        'Regulação Térmica: Ao permanecer imóvel por 1 rodada, recupera 15 pontos de vida e ganha resistência a efeitos de calor ou frio.',
        'Parasita Natural: Seus ataques podem causar doenças ao alvo, reduzindo suas capacidades físicas ao longo do tempo (-2 em força e vigor por rodada, dura 3 rodadas).'
    ],
    passiva: 'Nadador Lento: Apesar de ser preguiçoso na água, sua lentidão o torna imperceptível para predadores submersos, ganhando +15 em furtividade enquanto nada.',
    passivaElemental: 'Água: Quando em ambientes aquáticos, recupera 10 pontos de vida a cada rodada e ganha +10 em ataques.'
},
'Deynocheirus': {
    title: 'O Jardineiro do Lago',
    image: 'imagens/dinos_deyno.webp',
    weight: '6 toneladas',
    height: '4,5 M',
    length: '10 M',
    attributes: { agi: 2, for: 4, int: 3, pre: 4, vig: 5 },
    life: 180,
    armor: 20,
    actionBonus: '+25 arranhão, +20 nadar, +15 intimidar, +10 bloquear , +5 contra-ataque',
    attacks: [
        'Arranhão Feroz: 7d10+25 (aplica sangramento, causando -10 de vida por rodada durante 3 rodadas)',
        'Golpe Submerso: 6d10+20 (pode ser usado na água, tem +10 de acerto)',
        'Empurrão Intimidador: 5d10+15 (força o alvo a recuar, aplica -5 em ataques por 2 rodadas)'
    ],
    abilities: [
        'Regeneração de Ervas: Ao consumir plantas aquáticas ou algas, recupera 30 pontos de vida por rodada.',
        'Fertilizador Natural: Após consumir alimentos, deixa um rastro fértil, melhorando os recursos de flora em uma área ao longo do tempo (pode ser usado em campanhas narrativas para revitalizar regiões).'
    ],
    passiva: 'Dispersor de Sementes: Espalha sementes ao caminhar, influenciando positivamente o ecossistema local e reduzindo agressividade de herbívoros ao redor.',
    passivaElemental: 'Água: Ganha +10 de regeneração e +15 em furtividade quando em ambientes aquáticos.'
},
'Espinossauro': {
    title: 'O Maior predador já visto',
    image: 'imagens/dinos_espinossaro.jpg',
    weight: '9 toneladas',
    height: '8 M',
    length: '7 M',
    attributes: { agi: 3, for: 5, int: 3, pre: 4, vig: 5 },
    life: 380,
    armor: 30,
    actionBonus: '+30 mordida, +25 agarrar, +25 girar, +20 intimidar, +20 nadar, +10 bloquear , +10 esquiva',
    attacks: [
        'Mordida Destruidora: 10d12+40 (aplica quebrado em estruturas e objetos atingidos)',
        'Garras Imobilizadoras: 8d10+35 (imobiliza alvos por 1 rodada, aplicando -15 de defesa)',
        'Investida Territorial: 9d10+30 (se usado próximo à água, adiciona +15 de dano e empurra alvos menores para longe)'
    ],
    abilities: [
        'Agressividade Territorial: Quando próximo de água, ganha +15 em ataques e +10 em defesa.',
        'Predador Apex: Contra Tiranossauros ou Giganotossauros, recebe +10 em todas as defesas e +20 em intimidação.'
    ],
    passiva: 'Domínio das Margens: É mais rápido perto da água, ganhando +10 em velocidade e +15 em furtividade em terrenos aquáticos; fora da água, sofre -10 de agilidade.',
    passivaElemental: 'Água: Adquire +20 de regeneração e reduz todos os danos recebidos em 40% ao lutar em rios ou áreas alagadas.'
},
'Crocodilo': {
    title: 'Predador Ancestral',
    image: 'imagens/dinos_kapro.jpg',
    weight: '500 kg',
    height: '1,5 M',
    length: '4 M',
    attributes: { agi: 3, for: 4, int: 2, pre: 3, vig: 4 },
    life: 80,
    armor: 15,
    actionBonus: '+15 mordida, +20 girar, +15 furtividade (na água), +10 agarrar, +10 nadar +10 esquiva',
    attacks: [
        'Mordida Triturante: 6d10+20 (aplica dano de quebra em alvos atingidos)',
        'Giro Mortal: 5d12+25 (causa dano de quebra e hemorragia em alvos imobilizados)',
        'Arrastamento: 4d10+15 (leva alvos para dentro da água, aplicando exaustão e perda de estamina)'
    ],
    abilities: [
        'Couro Resistente: Reduz dano cortante e perfurante recebido em 20%.',
        'Predador Aquático: É furtivo e rápido dentro da água, ganhando +15 em furtividade e +10 em ataques.'
    ],
    passiva: 'Imunidade Natural: Imune a sanguessugas, doenças e venenos que afetam sangue ou pele.',
    passivaElemental: 'Água: Ganha +10 de regeneração ao lutar em ambientes aquáticos.'
},
'Sarco-imperador': {
    title: 'Imperador das Águas Rasas',
    image: 'imagens/dinos_sarco.jpg',
    weight: '1 tonelada',
    height: '2,5 M',
    length: '6 M',
    attributes: { agi: 4, for: 5, int: 2, pre: 4, vig: 4 },
    life: 160,
    armor: 20,
    actionBonus: '+20 mordida, +25 giro, +20 furtividade (na água), +15 saltar, +10 nadar',
    attacks: [
        'Mordida Destruidora: 8d12+30 (aplica quebra e sangramento em alvos atingidos)',
        'Giro Voraz: 9d12+35 (aplica dano de quebra e empurra alvos menores)',
        'Investida Rápida: 6d10+25 (realiza um ataque direto ao sair da água, com +10 de bônus se furtivo)'
    ],
    abilities: [
        'Ângulo Ampliado: Consegue atacar em um arco de 130 graus, alcançando múltiplos inimigos.',
        'Velocidade Letal: Após sair da água, ganha +15 de velocidade e +10 de dano por 2 rodadas.'
    ],
    passiva: 'Caçador Submerso: Movimenta-se silenciosamente na água, ganhando +20 em furtividade.',
    passivaElemental: 'Água: Aumenta o alcance dos ataques em 10% quando submerso.'
},
'Deinosuchus': {
    title: 'O Monstro dos Pântanos',
    image: 'imagens/dinos_deinosuchus.webp',
    weight: '5 toneladas',
    height: '3,5 M',
    length: '10 M',
    attributes: { agi: 3, for: 6, int: 2, pre: 4, vig: 5 },
    life: 300,
    armor: 30,
    actionBonus: '+30 mordida, +25 cauda, +25 girar, +15 nadar',
    attacks: [
        'Mordida Esmagadora: 12d12+50 (aplica quebra massiva, dano comparável ao Tiranossauro)',
        'Giro Devastador: 10d12+40 (causa dano de quebra e hemorragia em múltiplos alvos)',
        'Golpe de Cauda: 8d10+30 (derruba alvos menores e causa lentidão por 1 rodada)'
    ],
    abilities: [
        'Predador Colossal: Quando quebra ossos de um alvo, recebe +15 de dano contra ele.',
        'Velocidade Implacável: Em pântanos ou rios, ganha +10 de velocidade e +20 em ataques de emboscada.'
    ],
    passiva: 'Gigante Submerso: Pode se esconder completamente na água, ganhando +20 em furtividade.',
    passivaElemental: 'Água: Regenera 10% da vida máxima por rodada ao lutar submerso.'
},
'Purussauros': {
    title: 'O Tanque dos Rios',
    image: 'imagens/dinos_purussaurus.jpeg',
    weight: '7 toneladas',
    height: '4.5 M',
    length: '12 M',
    attributes: { agi: 3, for: 6, int: 3, pre: 3, vig: 6 },
    life: 330,
    armor: 35,
    actionBonus: '+30 mordida, +25 giro, +20 defender, +15 nadar',
    attacks: [
        'Mordida Poderosa: 10d12+45 (aplica dano massivo e quebra em estruturas)',
        'Giro Defensivo: 8d10+30 (derruba alvos e aplica lentidão em inimigos ao redor)',
        'Postura Implacável: Ao ativar, reduz todo dano recebido em 50% por 1 rodada.'
    ],
    abilities: [
        'Adrenalina Crescente: Quanto mais dano recebe, maior é sua velocidade e dano (+5% por rodada até o limite de +25%).',
        'Defensor Submerso: Na água, reduz todo dano recebido em 25% e aumenta a regeneração em +15.'
    ],
    passiva: 'Guardião das Águas: Ganha +20 em defesa e regeneração ao lutar na água.',
    passivaElemental: 'Água: Reduz em 50% os efeitos negativos de ataques elementais recebidos enquanto submerso.'
},
'Leão marsupial': {
    title: 'Predador Ágil e Astuto',
    image: 'imagens/dinos_leão-marsupial.webp',
    weight: '110 kg',
    height: '2 M',
    length: '1.5 M',
    attributes: { agi: 5, for: 4, int: 4, pre: 3, vig: 3 },
    life: 120,
    armor: 10,
    actionBonus: '+20 escalada, +15 mordida, +15 furtividade, +10 salto +10 esquiva',
    attacks: [
        'Mordida Lacerante: 6d10+25 (causa sangramento e desvantagem em vigor no alvo)',
        'Garras Cortantes: 5d10+20 (aplica feridas leves que acumulam sangramento)',
        'Pulo Predatório: 4d12+20 (realiza um ataque surpresa com bônus de +10 ao atingir zonas vitais)'
    ],
    abilities: [
        'Predador Escalador: Consegue escalar paredes e árvores com facilidade, ganhando +20 em escalada.',
        'Astúcia Predatória: Quando realiza ataques contra alvos com desvantagens, ganha +15 em dano e precisão.'
    ],
    passiva: 'Caçador Noturno: Ganha +10 em furtividade e velocidade em ambientes de baixa luz.',
    passivaElemental: 'Fogo: Suas mordidas inflamam, aplicando um leve dano de queimadura em alvos sangrando.'
},
'Purlovia': {
    title: 'Tigre Furtivo e Letal',
    image: 'imagens/dinos_purlovia.webp',
    weight: '150 kg',
    height: '2 M',
    length: '2.5 M',
    attributes: { agi: 4, for: 5, int: 3, pre: 3, vig: 4 },
    life: 140,
    armor: 15,
    actionBonus: '+25 emboscada, +20 mordida, +20 furtividade, +15 imobilizar +10 esquiva',
    attacks: [
        'Mordida Devastadora: 7d10+30 (aplica desvantagem em vigor e resistência)',
        'Golpe Surpresa: 6d12+25 (dano dobrado ao atacar furtivamente)',
        'Imobilização Selvagem: 5d12+20 (impede o alvo de se mover por 1 turno)'
    ],
    abilities: [
        'Furtividade Suprem: Se esconde perfeitamente em vegetações ou terrenos rochosos, ganhando +20 em furtividade.',
        'Predador Sorrateiro: Ao atacar furtivamente, seus ataques ignoram 50% da armadura do alvo.'
    ],
    passiva: 'Emboscador Implacável: Após sair de furtividade, causa +15 de dano no próximo ataque.',
    passivaElemental: 'Fogo: Ao atacar de surpresa, inflama alvos, aplicando queimaduras moderadas por 2 turnos.'
},'Dente de sabre': {
    title: 'Tigre Ágil e Mortal',
    image: 'imagens/dinos_dente_de_sabre.webp',
    weight: '200 kg',
    height: '1.6 M',
    length: '2.8 M',
    attributes: { agi: 5, for: 4, int: 3, pre: 4, vig: 3 },
    life: 130,
    armor: 10,
    actionBonus: '+20 corrida, +20 mordida, +15 flanqueamento, +15 farejar',
    attacks: [
        'Mordida Lacerante: 6d12+25 (causa sangramento contínuo)',
        'Garras Ágeis: 5d12+20 (dano extra ao atacar pelas costas)',
        'Ataque em Corrida: 5d10+20 (aplica lentidão no alvo)'
    ],
    abilities: [
        'Flanqueador Mestre: Ganha +20 ao atacar alvos que estão distraídos ou cercados.',
        'Instinto Afiado: Sempre sabe a localização de alvos até 30 metros de distância.'
    ],
    passiva: 'Predador Veloz: Ganha +10 em velocidade e +5 em dano ao correr para atacar.',
    passivaElemental: 'Fogo: Suas garras inflamam, aplicando dano adicional de queimadura.'
},
'Lobo-terrível': {
    title: 'Caçador Estratégico e Astuto',
    image: 'imagens/dinos_lobo_terrivel.webp',
    weight: '90 kg',
    height: '1.6 M',
    length: '2.1 M',
    attributes: { agi: 4, for: 3, int: 5, pre: 4, vig: 4 },
    life: 140,
    armor: 12,
    actionBonus: '+20 mordida, +15 rastrear, +15 estratégia, +20 matilha +10 esquiva',
    attacks: [
        'Mordida Precisa: 6d10+20 (aplica sangramento moderado)',
        'Ataque em Grupo: 5d12+25 (dano extra por cada aliado próximo)',
        'Rugido Coordenado: Buffa aliados próximos com +10 em ataque e defesa por 2 turnos'
    ],
    abilities: [
        'Estratégia de Matilha: Coordena ataques, concedendo bônus de +10 em ataque para todos aliados próximos.',
        'Faro Afiado: Pode localizar alvos até 50 metros de distância, independentemente de obstáculos.'
    ],
    passiva: 'Instinto de Caçador: Ganha +10 em esquiva ao lutar contra múltiplos alvos.',
    passivaElemental: 'Elétrica: Seus movimentos ganham agilidade extra, aumentando a evasão e precisão em +10.'
},
'Andreorsachus': {
    title: 'Velocista Territorial',
    image: 'imagens/dinos_andrewosarchus.png',
    weight: '400 kg',
    height: '4 M',
    length: '5 M',
    attributes: { agi: 5, for: 5, int: 3, pre: 3, vig: 4 },
    life: 160,
    armor: 15,
    actionBonus: '+20 investida, +20 corrida, +15 mordida, +15 intimidação +10 bloqueio',
    attacks: [
        'Mordida Esmagadora: 6d12+30 (dano elevado ao atingir alvos parados)',
        'Investida Brutal: 7d10+25 (dano extra em alvos menores)',
        'Golpe Territorial: 5d12+20 (diminui defesa do alvo em 10)'
    ],
    abilities: [
        'Velocidade Estonteante: Pode percorrer grandes distâncias rapidamente, ganhando +20 em corrida.',
        'Predador Territorial: Causa +10 de dano adicional ao defender seu território.'
    ],
    passiva: 'Instinto Selvagem: Ganha +5 de velocidade e +10 de força ao atacar de surpresa.',
    passivaElemental: 'Elétrica: Seus ataques ganham um efeito paralisante leve por 1 turno.'
},
'Velociraptor': {
    title: 'Predador Ágil e Inteligente',
    image: 'imagens/dinos_velociraptor.jpeg',
    weight: '70 kg',
    height: '1.8 M',
    length: '2.5 M',
    attributes: { agi: 5, for: 3, int: 5, pre: 4, vig: 3 },
    life: 125,
    armor: 8,
    actionBonus: '+25 em grupo, +20 furtividade, +15 mordida, +20 análise de alvos +10 esquiva',
    attacks: [
        'Mordida Lacerante: 5d10+20 (causa sangramento contínuo por 2 turnos)',
        'Garras Cortantes: 6d12+25 (dano extra em alvos imobilizados ou distraídos)',
        'Investida Coordenada: 5d12+20 (dano aumentado por aliados próximos)'
    ],
    abilities: [
        'Caça em Grupo: Ao lutar com aliados próximos, todos ganham +10 em dano e defesa.',
        'Instinto Predatório: Analisa a fraqueza do inimigo, reduzindo a resistência em -10 por 2 turnos.'
    ],
    passiva: 'Predador Furtivo: Ganha +20 em furtividade e emboscada ao caçar em terrenos florestais ou com cobertura.',
    passivaElemental: 'Elétrica: Ao atacar, ganha um aumento de velocidade temporário e aplica paralisia leve no alvo.'
},
'Antrorraptor': {
    title: 'Raptor Atroz',
    image: 'imagens/dinos_atrocirraptor.png',
    weight: '85 kg',
    height: '1.9 M',
    length: '2.8 M',
    attributes: { agi: 4, for: 4, int: 4, pre: 3, vig: 4 },
    life: 120,
    armor: 60,
    actionBonus: '+20 perseguição, +15 furtividade, +20 em defesa, +15 em localizar, +10 luta, +10 contra-ataque',
    attacks: [
        'Mordida Atroz: 6d10+25 (causa sangramento)',
        'Garra Brutal: 5d12+20 (dano extra em alvos em fuga)',
        'Investida Voraz: 6d8+20 (impede o alvo de se mover por 1 turno)'
    ],
    abilities: [
        'Predador Tático: Ganha +10 de dano e esquiva ao perseguir um alvo por mais de 2 turnos.',
        'Resiliência Atroz: Reduz o dano recebido em -10 enquanto estiver em combate com múltiplos inimigos.'
    ],
    passiva: 'Tanque Natural: Recebe +15 de resistência contra ataques frontais.',
    passivaElemental: 'Elétrica: Durante perseguições, ganha um aumento de velocidade e deixa os inimigos mais lentos.'
},
'Pyroraptor': {
    title: 'Raptor de Gelo',
    image: 'imagens/dinos_pyroraptor.png',
    weight: '75 kg',
    height: '2 M',
    length: '2.7 M',
    attributes: { agi: 5, for: 3, int: 4, pre: 4, vig: 3 },
    life: 120,
    armor: 8,
    actionBonus: '+25 nadar, +20 ataque no gelo, +15 enfraquecimento +10 esquiva',
    attacks: [
        'Mordida Gélida: 6d10+25 (diminui vigor do alvo em -5 por 2 turnos)',
        'Garra Cortante: 5d12+30 (dano extra contra alvos já enfraquecidos)',
        'Investida Congelante: 6d8+20 (aplica lentidão no alvo)'
    ],
    abilities: [
        'Adaptado ao Gelo: Ganha +15 de defesa e dano ao lutar em ambientes gelados.',
        'Foco Mortal: Dano extra contra alvos debilitados ou sangrando.'
    ],
    passiva: 'Predador Ártico: Recebe +20 de furtividade e visão perfeita em ambientes nevados.',
    passivaElemental: 'Gelo: Todos os ataques podem causar dano extra congelante, reduzindo a velocidade do inimigo.'
},
'Ptero': {
    title: 'Trapaceiro Aéreo',
    image: 'imagens/dinos_ptero.webp',
    weight: '45 kg',
    height: '2.5 M',
    length: '6 M',
    attributes: { agi: 4, for: 3, int: 3, pre: 5, vig: 3 },
    life: 100,
    armor: 6,
    actionBonus: '+20 flanquear, +15 furtividade, +10 ganância +10 esquiva',
    attacks: [
        'Bicada Afiada: 5d10+20 (dano extra em alvos distraídos)',
        'Garra Aérea: 4d12+15 (dano em investidas rápidas)',
        'Rasante Enganador: 6d8+20 (confunde o alvo e causa dano)'
    ],
    abilities: [
        'Ganância Alada: Ao roubar ou se alimentar, ganha +10 de velocidade de voo e força temporariamente.',
        'Furtividade Aérea: Dificulta a localização ao se esconder entre árvores ou terrenos altos.'
    ],
    passiva: 'Astuto Voador: Ganha +15 em ações de fuga ou esquiva aérea.',
    passivaElemental: 'Elétrica: Ganha mais velocidade em tempestades ou próximo a rios e lagos.'
},
'Quetzal': {
    title: 'Gigante do Céu',
    image: 'imagens/dinos_quetzal.webp',
    weight: '250 kg',
    height: '6 M',
    length: '15 M',
    attributes: { agi: 3, for: 5, int: 4, pre: 3, vig: 5 },
    life: 300,
    armor: 20,
    actionBonus: '+25 carregar, +20 rasgar metal, +15 força em voo + 10 bloqueio',
    attacks: [
        'Bicada Devastadora: 8d12+35 (dano extra contra armaduras)',
        'Investida Aérea: 6d10+30 (pode atordoar alvos menores)',
        'Pancada com Asas: 7d8+25 (dano em área, empurra inimigos próximos)'
    ],
    abilities: [
        'Força Colossal: Pode carregar criaturas pesadas ou quebrar estruturas menores.',
        'Protetor Agressivo: Ao lutar por comida ou território, ganha +15 em ataque e defesa.'
    ],
    passiva: 'Senhor dos Céus: Recebe +20 de resistência e bônus de força enquanto estiver em voo.',
    passivaElemental: 'Abismoelétrico: Aumenta o tamanho das asas e o dano de ataques ao lutar próximo de oceanos ou lagos profundos.'
},
"Tapejara": {
    "title": "Aéreo Adaptável",
    "image": "imagens/dinos_tapejara.jpeg",
    "weight": "60 kg",
    "height": "2 M",
    "length": "8 M",
    "attributes": { "agi": 4, "for": 3, "int": 4, "pre": 4, "vig": 4 },
    "life": 180,
    "armor": 10,
    actionBonus: "+20 voo rápido, +15 carregar pessoas, +15 adaptação, +10 esquiva aérea, +15 ataque aéreo, +10 esquiva",
    "attacks": [
      "Bicada Versátil: 5d10+20 (dano extra contra alvos pequenos)",
      "Garra Afiada: 6d8+25 (pode segurar e atacar ao mesmo tempo)",
      "Investida Desesperada: 6d10+20 (dano aumentado ao estar com pouca vida)"
    ],
    "abilities": [
      "Adaptação de Peso: Consegue carregar peso adicional sem penalidades.",
      "Sobrevivência Instintiva: Ganha velocidade ao estar com pouca vida."
    ],
    "passiva": "Voo Estratégico: Recebe bônus de +15 em esquiva e resistência enquanto em movimento aéreo constante.",
    "passivaElemental": "Elétrica: Aumenta velocidade de voo e pode aplicar paralisia leve em alvos atacados"
  },

'Tropeugnathos': {
    title: 'Brigão Aéreo',
    image: 'imagens/dinos_tropeu.jpg',
    height: '3.5 m',
    length: '9 m',
    weight: '120 kg',
    attributes: { agi: 3, for: 5, int: 3, pre: 4, vig: 4 },
    life: 180,
    armor: 15,
    actionBonus: "+10 voar rápido, +15 intimidar, +20 brigar no ar, +10 dano aéreo, +15 resistência ao ar +10 contra-ataque",
    attacks: [
        'Bicada Brutal: 7d12+30 (causa dano extra em alvos menores)',
        'Pancada com Asas: 6d10+25 (dano em área, pode empurrar inimigos)',
        'Investida Aérea: 8d8+25 (atordoa o alvo por 1 turno)'
    ],
    abilities: [
        'Intimidação Natural: Reduz a precisão de inimigos próximos em -10 no início do combate.',
        'Alcance Superior: Seus ataques possuem maior alcance, dificultando respostas corpo a corpo.'
    ],
    passiva: 'Brigão Nascido: Ganha +10 de resistência e dano ao lutar no ar ou próximo a rivais.',
    passivaElemental: 'Abismoelétrico: Amplia alcance e força dos ataques em áreas próximas ao oceano.'
},
'Dimorfonte': {
    title: 'Predador Esquivo',
    image: 'imagens/dinos_dimorfodonte.webp',
    height: '1.2 m',
    length: '4 m',
    weight: '15 kg',
    attributes: { agi: 5, for: 3, int: 3, pre: 4, vig: 2 },
    life: 70,
    armor: 6,
    actionBonus: "+15 emboscar, +10 escalar, +15 atacar por trás, +10 agarrar",
    attacks: [
        'Mordida Afiada: 5d8+20 (causa sangramento por 2 turnos)',
        'Prisão Mortal: 6d10+25 (prende o alvo, impedindo-o de se mover por 1 turno)',
        'Rasante Rápido: 5d12+15 (ataca e recua em um único movimento)'
    ],
    abilities: [
        'Esquiva Natural: Ganha +15 em esquiva, dificultando ser atingido.',
        'Presas Vorazes: Ao prender um alvo, causa dano contínuo de sangramento por 3 turnos.'
    ],
    passiva: 'Fujão Estratégico: Ao recuar, ganha +10 de velocidade e reduz o dano recebido por 1 turno.',
    passivaElemental: 'Elétrica: Em ambientes úmidos ou próximos a rios, pode aplicar paralisia leve em alvos mordidos.'
},
'Desmodus-draculai': {
    title: 'Vampiro Aéreo',
    image: 'imagens/dinos_desmodus.jpg.', // Substitua pelo caminho correto da imagem
    height: '2.5 m',
    length: '6 m',
    weight: '35 kg',
    attributes: { agi: 4, for: 3, int: 5, pre: 5, vig: 4 },
    life: 130,
    armor: 12,
    actionBonus: "+15 atacar à noite, +10 voar silenciosamente, +15 detectar inimigos, +10 sugar sangue +10 esquiva, +5 bloqueio, +15 furtividade",
    attacks: [
        'Mordida Vampírica: 6d8+25 (suga 50% do dano como vida)',
        'Garras Afiadas: 7d6+20 (imobiliza o alvo por 1 turno)',
        'Rasante Sangrento: 8d6+20 (ganha vantagem contra alvos feridos)'
    ],
    abilities: [
        'Eco Localização: Detecta inimigos em até 30 metros, mesmo em ambientes escuros.',
        'Sede de Sangue: A cada 3 ataques bem-sucedidos, ganha +10% de vida total como regeneração.'
    ],
    passiva: 'Sangue Vital: Regenera continuamente vida enquanto se alimenta de sangue.',
    passivaElemental: 'Aether: Quando presente em regiões de magia elevada, ganha resistência adicional a ataques mágicos e aumenta o alcance de sua eco localização em 50%.'
},
'Orc-morcego': {
    title: 'Predador Cego',
    image: 'imagens/dinos_orc_morcego.webp', // Substitua pelo caminho correto da imagem
    height: '2 m',
    length: '3.5 m',
    weight: '30 kg',
    attributes: { agi: 3, for: 3, int: 4, pre: 5, vig: 4 },
    life: 120,
    armor: 10,
    actionBonus: "+15 atacar em ambientes escuros, +10 detectar movimento, +15 sugar sangue, +10 escalar",
    attacks: [
        'Tentáculos Sugadores: 6d6+15 (drena sangue e aplica 10% de torpor por turno)',
        'Mordida Paralisante: 7d6+20 (paralisa o alvo por 1 turno se falhar na resistência)',
        'Ataque de Rasante: 8d4+15 (ganha vantagem contra alvos distraídos ou imóveis)'
    ],
    abilities: [
        'Audição Aguda: Localiza alvos em até 20 metros com precisão, mesmo no completo silêncio.',
        'Torpor Vampírico: Alvos que têm o sangue sugado acumulam torpor, podendo cair inconscientes após 3 turnos.'
    ],
    passiva: 'Cegueira Adaptativa: Imune a ataques que dependam de visão, como flashes ou ilusões visuais.',
    passivaElemental: 'AbismoElétrico: Dentro de cavernas ou áreas escuras, ganha resistência a ataques de projéteis e pode localizar alvos em um raio dobrado.'
},
'Argentavis': {
    title: 'Águia Gigante',
    image: 'imagens/dinos_argentavis.webp', // Substitua pelo caminho correto da imagem
    height: '2.5 m',
    length: '4 m',
    weight: '80 kg',
    attributes: { agi: 4, for: 4, int: 3, pre: 5, vig: 4 },
    life: 180,
    armor: 40,
    actionBonus: "+15 atacar em voo, +10 transportar carga, +15 avistar alvos a longa distância, +10 resistir a ventos fortes, +10 esquiva",
    attacks: [
        'Garras Afiadas: 6d8+20 (causa sangramento)',
        'Investida do Vento: 5d10+15 (empurra alvos para trás e desestabiliza)',
        'Bico Esmagador: 7d6+25 (dano direto com perfuração alta)'
    ],
    abilities: [
        'Caçadora Precisa: Ganha vantagem contra alvos em movimento no ar ou no chão.',
        'Sobrevoo Intimidador: Alvos ao redor sofrem penalidade de -5 em resistência ao medo.'
    ],
    passiva: 'Voo Eficiente: Consome menos energia para longas perseguições e voos prolongados.',
    passivaElemental: 'Vento: Em áreas montanhosas ou com correntes de ar fortes, ganha bônus de +10 em agilidade e alcance ampliado em ataques.'
},
'Pelagornis': {
    title: 'Pescador Aéreo',
    image: 'imagens/dinos_pelagornis.jpg', // Substitua pelo caminho correto da imagem
    height: '2 m',
    length: '3 m',
    weight: '25 kg',
    attributes: { agi: 3, for: 2, int: 3, pre: 4, vig: 3 },
    life: 100,
    armor: 10,
    actionBonus: "+15 pescar, +10 voar baixo, +15 mergulhar, +10 navegar em correntes marinhas",
    attacks: [
        'Bico Cortante: 5d6+15 (causa dano perfurante)',
        'Mergulho Rápido: 4d8+10 (dano ao atacar diretamente da água)',
        'Golpe de Asa: 3d10+10 (dano físico e chance de desequilibrar)'
    ],
    abilities: [
        'Pesca Precisa: Recupera 10% da vida máxima ao pescar peixes.',
        'Navegador Hábil: Pode flutuar na superfície da água sem esforço, mantendo-se fora do alcance de predadores aquáticos.'
    ],
    passiva: 'Pesca Constante: Recebe regeneração de vida passiva ao permanecer próximo a cardumes.',
    passivaElemental: 'Água: Em ambientes aquáticos, ganha +5 em agilidade e bônus de precisão em ataques.'
},
'Rhynoghtinata': {
    title: 'Besouro Devastador',
    image: 'imagens/dinos_rhynio.jpg', // Substitua pelo caminho correto da imagem
    height: '5 m',
    length: '7 m',
    weight: '2.5 toneladas',
    attributes: { agi: 3, for: 5, int: 4, pre: 3, vig: 4 },
    life: 250,
    armor: 25,
    actionBonus: "+20 congelar, +15 esmagar, +10 usar ferramentas, +15 cavar, +10 resistir a venenos +10 esquiva, +10 contra-ataque, +10 bloqeuio",
    attacks: [
        'Cauda Espinhosa: 5d10+20 (dano devastador e aplica sangramento)',
        'Investida com Garras: 4d8+15 (causa torpor e dano perfurante)',
        'Disparo de Âmbar: 3d12+10 (imobiliza ou isola o alvo em âmbar por 2 turnos)'
    ],
    abilities: [
        'Aperto Mortal: Pode agarrar e segurar inimigos, impossibilitando suas ações por 1 turno.',
        'Rugido Intimidador: Espanta inimigos próximos, reduzindo sua precisão em 15% por 3 turnos.'
    ],
    passiva: 'Pensador Tático: Pode usar objetos do ambiente como ferramentas ou armas improvisadas.',
    passivaElemental: 'Abismoelétrico: No ambiente aquático, seus disparos de âmbar geram cargas elétricas que atordoam o inimigo por 1 turno adicional.'
},
'Aranha-lobo': {
    title: 'Caçadora Alucinógena',
    image: 'imagens/dinos_aranha_lobo.jpg', // Substitua pelo caminho correto da imagem
    height: '3 m',
    length: '5 m',
    weight: '1.2 toneladas',
    attributes: { agi: 5, for: 4, int: 3, pre: 2, vig: 3 },
    life: 150,
    armor: 15,
    actionBonus: "+15 cavar, +10 emboscar, +15 mover-se na areia, +10 resistir a desidratação +10 esquiva, +10 contra-ataque +10 acertos",
    attacks: [
        'Agarrão Devastador: 4d10+15 (dano esmagador, quebra escudos ou carapaças)',
        'Mordida Tóxica: 3d8+10 (aplica veneno com alucinações, reduzindo precisão do alvo)',
        'Cerdas Irritantes: 3d12+8 (espalha toxinas que enfraquecem a força inimiga por 2 turnos)'
    ],
    abilities: [
        'Emboscada Mortal: Pode atacar de surpresa, garantindo 30% de dano adicional no primeiro golpe.',
        'Reação Rápida: Ao ser atacada, ganha 50% de esquiva adicional por 2 turnos.'
    ],
    passiva: 'Caçadora Ágil: Ao eliminar um inimigo, recupera 10% da vida máxima e reduz o custo de energia do próximo ataque em 20%.',
    passivaElemental: 'Abismoelétrico: No ambiente aquático, suas toxinas conduzem eletricidade, atordoando inimigos atingidos por 1 turno adicional.'
},
'Aranha-da-areia': {
    title: 'Predadora do Deserto',
    image: 'imagens/dinos_aranha_da_areia.jpg', // Substitua pelo caminho correto da imagem
    height: '2,5 m',
    length: '4 m',
    weight: '900 kg',
    attributes: { agi: 4, for: 3, int: 2, pre: 3, vig: 3 },
    life: 120,
    armor: 12,
    actionBonus: "+15 atacar à distância com teias, +10 emboscar, +15 escalar superfícies lisas, +10 resistir a venenos +10 esquiva",
    attacks: [
        'Mordida Venenosa: 3d10+10 (aplica veneno que reduz a força do alvo por 2 turnos)',
        'Salto Predatório: 4d8+12 (ataca com força esmagadora ao pular sobre o inimigo)',
        'Rugido Intimidador: 2d8+6 (assusta inimigos próximos, reduzindo precisão por 1 turno)'
    ],
    abilities: [
        'Cavar e Emboscar: Pode se esconder sob a areia ou em paredes cavernosas, atacando de surpresa com 25% de dano adicional.',
        'Resistência do Deserto: Reduz o dano recebido de fontes físicas em 10% quando em terreno arenoso ou seco.'
    ],
    passiva: 'Caçadora Instintiva: Ao atacar um inimigo envenenado, ganha 15% de chance de causar dano crítico.',
    passivaElemental: 'Abismoelétrico: Em ambientes subterrâneos ou desérticos, suas toxinas adquirem um efeito paralisante, imobilizando inimigos por 1 turno.'
},
'Aranha-viúva-negra': {
    title: 'Predadora Solitária',
    image: 'imagens/dinos_aranha_viuva_negra.jpeg', // Substitua pelo caminho correto da imagem
    height: '4 m',
    length: '5,5 m',
    weight: '1.200 kg',
    attributes: { agi: 5, for: 4, int: 3, pre: 4, vig: 2 },
    life: 200,
    armor: 10,
    actionBonus: "+15 se esconder em lugares estreitos, +10 resistir a esmagamento, +15 liberar ácido, +10 se mover em terrenos acidentados +10 esquiva",
    attacks: [
        'Mordida Tóxica: 4d12+15 (causa veneno quase fatal, reduzindo vitalidade e dano por 3 turnos)',
        'Fio Mortal: 3d8+10 (prende o alvo e reduz agilidade em 50% por 2 turnos)',
        'Emboscada Letal: 5d10+20 (ataque surpresa ao flanco, causa 25% de dano extra se o alvo estiver distraído)'
    ],
    abilities: [
        'Solitária e Letal: Aumenta a precisão em 20% quando sem aliados próximos.',
        'Dor Extrema: Veneno infligido causa um estado debilitante, reduzindo a força e resistência do alvo.'
    ],
    passiva: 'Olhos Treinados: Aumenta a chance de detectar inimigos furtivos em 50% e reduz a chance de ser emboscada.',
    passivaElemental: 'Abismoelétrico: Em cavernas escuras ou locais isolados, o veneno da Viúva-Negra ganha propriedades paralisantes, imobilizando por 1 turno enquanto reduz resistência adicionalmente.'
},
'Antropleura': {
    title: 'Lacraia Colossal',
    image: 'imagens/dinos_antlopeura.jpg', // Substitua pelo caminho correto da imagem
    height: '2 m',
    length: '7 m',
    weight: '750 kg',
    attributes: { agi: 3, for: 5, int: 2, pre: 3, vig: 4 },
    life: 250,
    armor: 20,
    actionBonus: "+15 se esconder em lugares estreitos, +10 resistir a esmagamento, +15 liberar ácido, +10 se mover em terrenos acidentados +15 bloqueio",
    attacks: [
        'Ácido Corrosivo: 4d10+20 (cospe ácido que reduz a armadura do alvo em 30% por 2 turnos e causa dano contínuo)',
        'Mordida Letal: 3d12+15 (penetra carne e armadura, aplicando veneno leve)',
        'Golpe de Corpo: 5d8+10 (usa o corpo massivo para empurrar e desequilibrar inimigos)'
    ],
    abilities: [
        'Atração pela Luz: Recebe bônus de agilidade e precisão ao lutar em áreas iluminadas.',
        'Reflexão Carapaçal: Sua carapaça tem 50% de chance de refletir projéteis não perfurantes de volta ao atacante.'
    ],
    passiva: 'Corrosão Natural: Ataques ignoram 20% da armadura do inimigo e podem derreter equipamentos básicos.',
    passivaElemental: 'Abismoelétrico: Em locais subterrâneos ou sombrios, o ácido da Antlopeura ganha propriedades explosivas ao contato com luz intensa, causando dano em área.'
},
'Lagosta-boxeadora': {
    title: 'Guerreira dos Mares',
    image: 'imagens/dinos_lagosta_boxeadora.jpg', // Substitua pelo caminho correto da imagem
    height: '4 m',
    length: '6,5 m',
    weight: '1.800 kg',
    attributes: { agi: 3, for: 5, int: 2, pre: 3, vig: 4 },
    life: 180,
    armor: 15,
    actionBonus: "+15 lutar corpo a corpo, +10 nadar em águas profundas, +15 quebrar estruturas, +10 resistir a pressão +10 contra-ataque",
    attacks: [
        'Soco Massivo: 10d12+25 (golpe devastador, quebra armaduras e causa desvantagem em movimento por 2 turnos)',
        'Impacto Sônico: 4d10+20 (onda de choque que afeta inimigos próximos, causando atordoamento por 1 turno)',
        'Arremetida Explosiva: 3d8+15 (investida rápida que empurra o alvo, causando dano adicional em estruturas leves)'
    ],
    abilities: [
        'Reflexos Precisos: Reduz em 20% a chance de ser atingida por ataques de projéteis ou lentos.',
        'Escudo de Quitina: Reduz 10 pontos de dano de qualquer ataque físico direto devido à sua carapaça resistente.'
    ],
    passiva: 'Predadora Subaquática: Movimenta-se rapidamente na água e aumenta a chance de acertar alvos aquáticos em 30%.',
    passivaElemental: 'Abismoelétrico: Em águas profundas, ganha 20% de alcance adicional nos ataques e resiste a ataques elétricos.'
},
'Lagosta': {
    title: 'Sobrevivente das Profundezas',
    image: 'imagens/dinos_lagosta.jpg', // Substitua pelo caminho correto da imagem
    height: '1,2 m',
    length: '2,5 m',
    weight: '450 kg',
    attributes: { agi: 3, for: 3, int: 2, pre: 2, vig: 3 },
    life: 100,
    armor: 8,
    actionBonus: "+10 se esconder em recifes, +15 nadar em águas rasas, +10 regenerar membros, +15 resistir a esmagamento",
    attacks: [
        'Soco Moderado: 3d8+10 (golpe que causa dano médio e chance de empurrar o alvo levemente)',
        'Garras Afiadas: 2d6+8 (corta e causa desvantagem de força por 1 turno)',
        'Investida Aquática: 2d8+10 (avanço rápido que pode desestabilizar o alvo, causando dano leve)'
    ],
    abilities: [
        'Defesa Natural: Reduz 5 pontos de dano de ataques físicos devido à carapaça resistente.',
        'Sobrevivente: Pode regenerar 10% da vida ao permanecer imóvel por 1 turno dentro da água.'
    ],
    passiva: 'Camuflagem Natural: Aumenta a furtividade em águas rasas e reduz a chance de ser detectada em 30%.',
    passivaElemental: 'Abismoelétrico: Em águas profundas, ganha resistência a ataques elementais e bônus de 10% em agilidade.'
},
'Megalossauro': {
    title: 'Predador da Noite',
    image: 'imagens/dinos_megalossauros.jpg', // Substitua pelo caminho correto da imagem
    height: '4 m',
    length: '6 m',
    weight: '1.500 kg',
    attributes: { agi: 4, for: 5, int: 3, pre: 4, vig: 4 },
    life: 250,
    armor: 12,
    actionBonus: "+15 atacar à noite, +10 perseguir presas, +15 intimidar, +10 resistir a fadiga +10 esquiva",
    attacks: [
        'Mordida Voraz: 5d12+15 (durante a noite, dano aumenta em 20%)',
        'Investida Noturna: 4d10+10 (velocidade alta durante a noite, reduz agilidade do alvo em 30% por 2 turnos)',
        'Rugido Intimidador: reduz atributos de pre e for do alvo em 20% por 1 turno'
    ],
    abilities: [
        'Sono Defensivo: Durante o dia, ganha +15% em defesa enquanto está dormindo ou sonolento.',
        'Ira Acumulada: Ao ser acordado durante o dia, acumula ira, regenerando 10% da vida e aumentando o dano em 15% por 2 turnos.'
    ],
    passiva: 'Caçador das Cavernas: Detecta inimigos ocultos em cavernas e ganha +20% em precisão nesses ambientes.',
    passivaElemental: 'Abismoelétrico: À noite, ganha resistência a efeitos de status e +10% em velocidade.'
},

'Meraxes': {
    title: 'Predador do Diabo',
    image: 'imagens/dinos_meraxes.jpg', // Substitua pelo caminho correto da imagem
    height: '5 m',
    length: '7 m',
    weight: '2.000 kg',
    attributes: { agi: 3, for: 6, int: 3, pre: 4, vig: 5 },
    life: 300,
    armor: 15,
    actionBonus: "+15 atacar grandes alvos, +10 intimidar, +15 resistir a dor, +10 regenerar +10 esquiva",
    attacks: [
        'Mordida Devastadora: 6d12+20 (causa dano de quebra e sangramento por 2 turnos)',
        'Investida de Fúria: 5d10+15 (causa dano adicional com base na quantidade de ira acumulada)',
        'Golpe Brutal: 4d8+12 (reduz a defesa do alvo em 10% por 3 turnos)'
    ],
    abilities: [
        'Regeneração Irável: Ao tomar dano, regenera 5% da vida e acumula ira que amplifica o dano causado em 20%.',
        'Caça aos Filhotes: Ganha +30% em velocidade e precisão ao detectar filhotes, com bônus de ira ao consumir um filhote.'
    ],
    passiva: 'Tanque Inabalável: Reduz o impacto de ataques críticos em 20% devido à sua robustez.',
    passivaElemental: 'Abismoelétrico: Na presença de predadores maiores, ganha resistência adicional e amplificação do dano de 15%.'
},

'Antrodemus': {
    title: 'Predador Escárnio',
    image: 'imagens/dino_antrodemus.jpg', // Substitua pelo caminho correto da imagem
    height: '4,5 m',
    length: '6 m',
    weight: '1.300 kg',
    attributes: { agi: 5, for: 4, int: 3, pre: 4, vig: 3 },
    life: 220,
    armor: 10,
    actionBonus: "+15 perseguir presas, +10 atacar em grupo, +15 infligir sangramento, +10 resistir a fadiga +10 contra-ataque",
    attacks: [
        'Mordida Lacerante: 4d10+15 (causa sangramento com dano aumentado em 1,5x)',
        'Rugido Frenético: Reduz a precisão do alvo em 20% por 2 turnos',
        'Investida Rápida: 5d8+12 (velocidade alta, causa dano extra em alvos flanqueados)'
    ],
    abilities: [
        'Velocidade Ameaçadora: Ganha +10% em velocidade ao perseguir alvos com sangramento ativo.',
        'Força Voraz: Ao eliminar um alvo, regenera 10% da vida e amplifica o dano do próximo ataque em 15%.'
    ],
    passiva: 'Intimidação Selvagem: Reduz a agilidade dos inimigos em 10% ao entrar no combate.',
    passivaElemental: 'Abismoelétrico: Em condições de tempestade ou em terrenos íngremes, ganha resistência contra debuffs e amplifica os efeitos de intimidação.'
},
'Dodô': {
    title: 'A Galinha',
    image: 'imagens/dinos_dodo.jpg', 
    height: '1 m',
    length: '1,5 m',
    weight: '15 kg',
    attributes: { agi: 1, for: 1, int: 2, pre: 2, vig: 1 },
    life: 20,
    armor: 0,
    actionBonus: "+10 correr, +15 procriar, +10 encontrar comida, +15 resistir a quedas",
    attacks: [
        'Bicada Nutritiva: 1d4+2 (causa pouco dano, mas pode aumentar a nutrição da equipe com ovos)',
    ],
    abilities: [
        'Procriação Veloz: Produz ovos nutritivos que regeneram 5% de vida para aliados próximos.',
        'Fuga Rápida: Ganha +20% de agilidade ao fugir de predadores.'
    ],
    passiva: 'Nutrição Natural: Dodôs em grupo aumentam a regeneração de vida da tribo em 2%.',
    passivaElemental: 'Abismoelétrico: Se atingido por tempestades, acelera a produção de ovos, gerando até 3 extras por ciclo.'
},
'Parassauro': {
    title: 'Guarda de Alerta',
    image: 'imagens/dinos_parassauro.jpg', 
    height: '3 m',
    length: '6 m',
    weight: '1.000 kg',
    attributes: { agi: 3, for: 3, int: 4, pre: 5, vig: 3 },
    life: 150,
    armor: 5,
    actionBonus: "+15 detectar perigos, +10 alertar o grupo, +15 correr em grupo, +10 resistir a fadiga",
    attacks: [
        'Chifrada Poderosa: 3d8+8 (causa dano de impacto e empurra alvos próximos)',
        'Som de Alerta: 2d6+5 (emite ondas sonoras, reduzindo a precisão dos predadores em 10% por 2 turnos)'
    ],
    abilities: [
        'Radar Natural: Detecta predadores a até 50 metros de distância e alerta aliados próximos.',
        'Velocidade Instintiva: Ganha +15% de agilidade ao perceber um predador.'
    ],
    passiva: 'Comunicação Sonora: Amplia a percepção em 30% para aliados ao redor.',
    passivaElemental: 'Abismoelétrico: Ondas sonoras tornam-se capazes de criar ecos que confundem predadores em áreas com água ou cavernas.'
},
'Iguanodonte': {
    title: 'Herbívoro Adaptável',
    image: 'imagens/dinos_iguanodonte.jpg',
    height: '3,5 m',
    length: '5 m',
    weight: '1.200 kg',
    attributes: { agi: 3, for: 4, int: 4, pre: 3, vig: 3 },
    life: 180,
    armor: 7,
    actionBonus: "+10 se adaptar ao ambiente, +15 comer plantas, +10 se defender em grupo, +15 resistir a venenos",
    attacks: [
        'Soco Devastador: 4d8+10 (aplica dano concussivo e derruba o alvo por 1 turno)',
        'Investida Ágil: 3d10+8 (muda rapidamente de posição para causar dano e confundir predadores)'
    ],
    abilities: [
        'Adaptação Bípede: Alterna entre posições quadrúpede e bípede, ganhando +10% em força ou +15% em velocidade, respectivamente.',
        'Análise de Ervas: Detecta plantas medicinais e tóxicas, auxiliando na sobrevivência do grupo.'
    ],
    passiva: 'Sobrevivente Natural: Reduz o impacto de venenos em 30%.',
    passivaElemental: 'Abismoelétrico: Durante tempestades, aumenta a resistência a debuffs e ganha um bônus de +10% em vigor.'
},
'Galimimo': {
    title: 'Corredor Ágil',
    image: 'imagens/dinos_galimimo.webp', // Substitua pelo caminho correto da imagem
    height: '2 m',
    length: '3 m',
    weight: '150 kg',
    attributes: { agi: 6, for: 2, int: 3, pre: 4, vig: 3 },
    life: 80,
    armor: 6,
    attacks: [
        'Chute Rápido: 3d8+10 (causa dano leve e atordoa por 1 turno)',
        'Investida Ágil: 4d10+12 (desvia de ataques ao se mover)',
        'Esquiva Natural: 2d6+8 (reduz dano recebido em 10%)'
    ],
    abilities: [
        'Velocidade Impressionante: Aumenta agilidade em 20% ao fugir de combate.',
        'Resistência à Fadiga: Pode correr por mais tempo sem penalidades.'
    ],
    passiva: 'Adaptabilidade: Recebe menos penalidades em terrenos difíceis.',
    passivaElemental: 'Eco da Agilidade: Durante tempestades, ganha +15% de esquiva.',
    actionBonus: '+20 velocidade, +15 esquiva, +10 resistência a terreno difícil'
},

'Estrutiomimo': {
    title: 'Velocista Imparável',
    image: 'imagens/dinos_estrutimimo.jpg', // Substitua pelo caminho correto da imagem
    height: '2,5 m',
    length: '3,5 m',
    weight: '180 kg',
    attributes: { agi: 7, for: 3, int: 3, pre: 4, vig: 3 },
    life: 70,
    armor: 7,
    attacks: [
        'Chute Impetuoso: 4d8+12 (dano médio com chance de derrubar)',
        'Rasante Rápido: 3d10+10 (causa dano extra em alvos atordoados)',
        'Desvio Ágil: 2d8+8 (reduz a precisão do inimigo em 10%)'
    ],
    abilities: [
        'Instinto de Sobrevivência: Aumenta a evasão em 15% ao ser atacado.',
        'Impulso Natural: Ganha bônus de +20% de velocidade em perseguições.'
    ],
    passiva: 'Perseverança: Regenera 5% de vida ao evitar ataques consecutivos.',
    passivaElemental: 'Resiliência Climática: Em terrenos quentes, sofre menos penalidades de vigor.',
    actionBonus: '+25 velocidade em perseguições, +20 esquiva, +10 precisão em ataques rápidos'
},

'Gigantorraptor': {
    title: 'Gigante Ágil',
    image: 'imagens/dinos_gigantoraptor.webp', // Substitua pelo caminho correto da imagem
    height: '5 m',
    length: '8 m',
    weight: '2.500 kg',
    attributes: { agi: 5, for: 6, int: 4, pre: 5, vig: 4 },
    life: 240,
    armor: 15,
    attacks: [
        'Garra Devastadora: 6d10+20 (causa sangramento por 2 turnos)',
        'Investida Brutal: 5d12+18 (derruba alvos e aplica -10% de agilidade por 3 turnos)',
        'Bicada Agressiva: 4d8+15 (reduz a defesa do alvo em 10% por 2 turnos)'
    ],
    abilities: [
        'Presença Intimidadora: Reduz a precisão de inimigos menores em 15%.',
        'Força Colossal: Ignora 10% da armadura do alvo ao atacar.'
    ],
    passiva: 'Gigante Resiliente: Reduz dano recebido em 10% de ataques críticos.',
    passivaElemental: 'Fúria Elemental: Em climas extremos, ganha +15% de dano.',
    actionBonus: '+20 força em ataques, +15 resistência, +10 precisão ao intimidar'
},

'Morchops': {
    title: 'Sobrevivente Pacífico',
    image: 'imagens/dinos_morchops.jpg', // Substitua pelo caminho correto da imagem
    height: '1,8 m',
    length: '2,5 m',
    weight: '300 kg',
    attributes: { agi: 3, for: 3, int: 4, pre: 3, vig: 5 },
    life: 120,
    armor: 8,
    attacks: [
        'Mordida Defensiva: 3d8+10 (reduz dano recebido em 10% por 1 turno)',
        'Chute Impulsivo: 2d10+8 (aplica -10% de precisão no alvo)',
        'Cabeçada Resistente: 4d6+12 (causa atordoamento por 1 turno)'
    ],
    abilities: [
        'Sobrevivente Nato: Ganha +15% de resistência a debuffs.',
        'Resiliência Ambiental: Reduz penalidades em climas extremos.'
    ],
    passiva: 'Adaptabilidade Natural: Recupera 5% de vigor ao final de cada turno.',
    passivaElemental: 'Fortaleza Pacífica: Em áreas verdes, ganha +10% de vida temporária.',
    actionBonus: '+10 resistência, +15 regeneração em ambientes naturais, +10 força em defesa'
},
'Cavalo': {
    title: 'Companheiro Leal',
    image: 'imagens/dinos_cavalo.jpg', // Substitua pelo caminho correto da imagem
    height: '1,6 m',
    length: '2 m',
    weight: '500 kg',
    attributes: { agi: 4, for: 3, int: 3, pre: 4, vig: 4 },
    life: 120,
    armor: 6,
    attacks: [
        'Coice Forte: 4d8+12 (derruba inimigos e reduz agilidade em 15%)',
        'Mordida Leve: 2d6+8 (dano leve com chance de causar sangramento)',
        'Pisoteio: 3d10+10 (dano em área pequena ao redor do cavalo)'
    ],
    abilities: [
        'Velocidade Constante: Ganha +10% de agilidade ao mover-se continuamente.',
        'Fuga Ágil: Aumenta a evasão em 20% ao sair de combate.'
    ],
    passiva: 'Companheiro Confiável: Reduz o custo de ações montadas em 10%.',
    passivaElemental: 'Espírito Indomável: Em terrenos abertos, aumenta a velocidade em 15%.',
    actionBonus: '+10 deslocamento rápido, +15 estabilidade em corrida, +10 agilidade ao saltar obstáculos'
},

'Alce': {
    title: 'Cervo Majestoso',
    image: 'imagens/dinos_alce.jpg', // Substitua pelo caminho correto da imagem
    height: '2,1 m',
    length: '2,5 m',
    weight: '600 kg',
    attributes: { agi: 4, for: 4, int: 3, pre: 3, vig: 5 },
    life: 120,
    armor: 8,
    attacks: [
        'Investida Poderosa: 5d10+15 (causa dano extra em alvos menores)',
        'Chifrada: 4d8+12 (chance de atordoar o inimigo por 1 turno)',
        'Pisoteio Frenético: 3d10+10 (dano em área pequena)'
    ],
    abilities: [
        'Instinto Selvagem: Ganha +10% em esquiva em florestas densas.',
        'Resistência ao Frio: Reduz efeitos de clima frio em 20%.'
    ],
    passiva: 'Presença Inspiradora: Aumenta a moral de aliados próximos em 10%.',
    passivaElemental: 'Vigor da Floresta: Recupera 5% de vida em florestas ao final do turno.',
    actionBonus: '+15 força ao investir, +10 resistência ao frio, +10 estabilidade ao escalar terrenos'
},

'Archeotiomimus': {
    title: 'Velocista Pré-histórico',
    image: 'imagens/dinos_archeomimus.jpg', // Substitua pelo caminho correto da imagem
    height: '1,8 m',
    length: '2,7 m',
    weight: '120 kg',
    attributes: { agi: 6, for: 3, int: 3, pre: 4, vig: 3 },
    life: 150,
    armor: 7,
    attacks: [
        'Chute Ágil: 3d8+10 (dano moderado com chance de desviar)',
        'Investida Veloz: 4d10+12 (dano alto em linha reta)',
        'Garra Cortante: 2d8+8 (causa sangramento leve por 1 turno)'
    ],
    abilities: [
        'Movimento Furtivo: Reduz a chance de ser detectado em 20% e anual o dano completamnete',
        'Vigor Natural: Pode correr mais tempo sem penalidades.'
    ],
    passiva: 'Sobrevivência Instintiva: Evita ataques críticos com 80% de chance.',
    passivaElemental: 'Eco Selvagem: Em áreas abertas, ganha +50% em esquiva.',
    actionBonus: '+15 velocidade em retas, +10 agilidade ao desviar, +10 resistência em corridas longas'
},

'Braquiossauro': {
    title: 'Gigante Gentil',
    image: 'imagens/dinos_braquiossauro.jpg', // Substitua pelo caminho correto da imagem
    height: '12 m',
    length: '25 m',
    weight: '45.000 kg',
    attributes: { agi: 2, for: 6, int: 3, pre: 3, vig: 6 },
    life: 600,
    armor: 300,
    attacks: [
        'Golpe de Cauda: 6d12+20 (dano em área e reduz a precisão dos inimigos)',
        'Pisar Devastador: 5d10+18 (causa atordoamento em alvos menores)',
        'Mordida Poderosa: 4d8+15 (ignora 10% da armadura do alvo)'
    ],
    abilities: [
        'Força Titânica: Ignora penalidades de peso ao carregar aliados.',
        'Resistência Incrível: Reduz o impacto de ataques críticos em 95%.'
    ],
    passiva: 'Colosso Protetor: Diminui o dano sofrido por aliados próximos em 30%.',
    passivaElemental: 'Estabilidade Colossal: Imune a debuffs de terreno.',
    actionBonus: '+10 estabilidade, +15 força ao atacar, +20 resistência ao carregar peso'
},

'Brontossauro': {
    title: 'Titã das Planícies',
    image: 'imagens/dinos_brontossauro.jpg', // Substitua pelo caminho correto da imagem
    height: '10 m',
    length: '22 m',
    weight: '40.000 kg',
    attributes: { agi: 2, for: 6, int: 3, pre: 3, vig: 7 },
    life: 450,
    armor: 200,
    attacks: [
        'Cauda Impactante: 6d12+22 (dano pesado em área com recuo)',
        'Pisoteio Colossal: 5d10+20 (derruba e atordoa alvos menores)',
        'Investida Lenta: 4d8+18 (dano adicional contra estruturas)'
    ],
    abilities: [
        'Força Monumental: Causa dano adicional a estruturas.',
        'Resistência a Impactos: Reduz o dano de investidas em 15%.'
    ],
    passiva: 'Protetor Ancestral: Garante 10% de vida extra a aliados próximos.',
    passivaElemental: 'Fortaleza Titânica: Imune a quedas e debuffs climáticos.',
    actionBonus: '+10 resistência ao impacto, +20 força em ataques a estruturas, +15 estabilidade em terrenos'
},

'Amargassauro': {
    title: 'Espinhos Venenosos',
    image: 'imagens/dinos_amargassauros.jpg', // Substitua pelo caminho correto da imagem
    height: '6 m',
    length: '18 m',
    weight: '30.000 kg',
    attributes: { agi: 3, for: 5, int: 3, pre: 4, vig: 6 },
    life: 280,
    armor: 80,
    attacks: [
        'Espetada Venenosa: 6d10+20 (causa veneno por 2 turnos)',
        'Cauda Espinhosa: 5d8+18 (dano em área com chance de sangramento)',
        'Pisada Furiosa: 4d12+15 (derruba alvos menores)'
    ],
    abilities: [
        'Resistência Natural: Reduz efeitos de veneno em 20%.',
        'Fúria Espinhosa: Ganha +10% de dano ao sofrer ataques consecutivos.'
    ],
    passiva: 'Adaptado ao Combate: Reduz penalidades de vigor ao lutar por longos períodos.',
    passivaElemental: 'Veneno Glacial: Em climas frios, o veneno se torna mais letal, aumentando o dano em 15%.',
    actionBonus: '+10 resistência ao veneno, +15 dano em ataques consecutivos, +10 estabilidade em terrenos adversos'
},
'Argentinossauro': {
    title: 'Colosso Imponente',
    image: 'imagens/dinos_argentinossauro.jpg', // Substitua pelo caminho correto da imagem
    height: '15 m',
    length: '35 m',
    weight: '60.000 kg',
    attributes: { agi: 2, for: 7, int: 3, pre: 3, vig: 8 },
    life: 900,
    armor: 450,
    attacks: [
        'Pisada Sísmica: 8d12+25 (cria ondas de choque, atordoa inimigos em 10 m)',
        'Cauda Destruidora: 7d10+22 (ignora 15% da armadura do alvo)',
        'Investida Monumental: 6d10+20 (derruba estruturas e alvos menores)'
    ],
    abilities: [
        'Presença Colossal: Reduz o moral de inimigos próximos em 20%.',
        'Força Ancestral: Causa dano extra a inimigos de grande porte.'
    ],
    passiva: 'Guardião das Planícies: Concede 10% de redução de dano a aliados próximos.',
    passivaElemental: 'Resiliência da Terra: Imune a efeitos de terremotos.',
    actionBonus: '+25 impacto ao pisar, +20 resistência a debuffs, +30 força em ataques a estruturas'
},

'Titãnossauro': {
    title: 'Titã Indestrutível',
    image: 'imagens/dinos_titanossauro.jpg', // Substitua pelo caminho correto da imagem
    height: '20 m',
    length: '40 m',
    weight: '80.000 kg',
    attributes: { agi: 1, for: 8, int: 3, pre: 3, vig: 9 },
    life: 1000,
    armor: 500,
    attacks: [
        'Impacto Colossal: 10d12+30 (causa tremores, reduz a precisão dos inimigos em 15%)',
        'Cauda Titânica: 8d10+28 (dano em área, derruba alvos menores)',
        'Pisada Devastadora: 7d12+25 (dano extra contra estruturas)'
    ],
    abilities: [
        'Fortaleza Viva: Reduz todo o dano recebido em 20%.',
        'Resistência Mítica: Imune a debuffs de vigor e moral.'
    ],
    passiva: 'Dominância Absoluta: Inimigos próximos sofrem penalidade de -10% em todos os atributos.',
    passivaElemental: 'Fúria Primordial: Em climas extremos, ganha +20% de dano.',
    actionBonus: '+30 resistência a impactos, +25 força em investidas, +35 dano contra estruturas'
},

'Apatossauro': {
    title: 'Titã Calmo',
    image: 'imagens/dinos_apatossauros.jpg', // Substitua pelo caminho correto da imagem
    height: '10 m',
    length: '28 m',
    weight: '45.000 kg',
    attributes: { agi: 2, for: 6, int: 3, pre: 3, vig: 7 },
    life: 450,
    armor: 220,
    attacks: [
        'Cauda Vigorosa: 6d10+20 (ignora 10% da armadura do alvo)',
        'Pisada Maciça: 5d12+18 (derruba inimigos em área pequena)',
        'Mordida Resistente: 4d8+15 (reduz vigor do alvo em 10%)'
    ],
    abilities: [
        'Calma Monumental: Reduz o impacto de debuffs mentais em 25%.',
        'Força Inerente: Causa 15% de dano adicional ao lutar em terreno plano.'
    ],
    passiva: 'Proteção da Calma: Aliados próximos recebem +50% de vigor.',
    passivaElemental: 'Vigor Tranquilo: Regenera 15% de vida ao fim de cada turno.',
    actionBonus: '+20 dano em terrenos planos, +15 resistência a debuffs mentais, +25 força ao atacar'
},

'Diplodoco': {
    title: 'Chicote Vivo',
    image: 'imagens/dinos_diplodoco.jpg', // Substitua pelo caminho correto da imagem
    height: '6 m',
    length: '25 m',
    weight: '25.000 kg',
    attributes: { agi: 3, for: 5, int: 3, pre: 4, vig: 6 },
    life: 650,
    armor: 180,
    attacks: [
        'Cauda Chicoteante: 7d10+18 (causa atordoamento em inimigos menores)',
        'Pisada Estratégica: 5d8+15 (cria uma zona de impacto, reduz agilidade em 15%)',
        'Investida Leve: 4d10+12 (dano moderado com recuo)'
    ],
    abilities: [
        'Flexibilidade Natural: Ignora penalidades em terrenos estreitos.',
        'Resistência Duradoura: Reduz o custo de vigor em 15% em ações repetitivas.'
    ],
    passiva: 'Protetor Ágil: Aliados ganham +10% de esquiva em combates próximos.',
    passivaElemental: 'Chicote Elemental: Em climas secos, aumenta o dano da cauda em 15%.',
    actionBonus: '+20 dano ao usar cauda, +25 resistência em terrenos estreitos, +15 agilidade ao desviar'
},

'Mamequiassauro': {
    title: 'Serpente Gigante',
    image: 'imagens/dinos_mamequiossauro.jpg', // Substitua pelo caminho correto da imagem
    height: '8 m',
    length: '30 m',
    weight: '50.000 kg',
    attributes: { agi: 3, for: 6, int: 4, pre: 4, vig: 7 },
    life: 600,
    armor: 400,
    attacks: [
        'Esmagamento Corporal: 8d10+22 (prende inimigos, reduz o vigor em 20%)',
        'Mordida Poderosa: 6d8+20 (causa sangramento por 2 turnos)',
        'Golpe de Cauda: 5d10+18 (derruba alvos menores)'
    ],
    abilities: [
        'Aperto Mortal: Diminui a evasão e danos de inimigos presos em 50%.',
        'Resistência Natural: Reduz penalidades de debuffs climáticos em 80%.'
    ],
    passiva: 'Predador Discreto: Movimenta-se silenciosamente, reduzindo a detecção em 15%.',
    passivaElemental: 'Golpe das Tempestades: Em climas úmidos, causa +10% de dano.',
    actionBonus: '+20 força em ataques presos, +25 resistência a clima, +30 dano em ataques consecutivos'
},

'Sea Treader': {
    title: 'Andarilho dos Oceanos',
    image: 'imagens/dinos_sea_treades.jpg', // Substitua pelo caminho correto da imagem
    height: '10 m',
    length: '18 m',
    weight: '35.000 kg',
    attributes: { agi: 2, for: 5, int: 4, pre: 4, vig: 7 },
    life: 400,
    armor: 200,
    attacks: [
        'Chute Oceânico: 6d10+20 (dano aumentado na água)',
        'Pisada Pesada: 5d12+18 (derruba alvos menores)',
        'Impacto de Cauda: 5d10+15 (reduz a velocidade dos inimigos em 20%)'
    ],
    abilities: [
        'Andarilho Submerso: Imune a penalidades de terrenos aquáticos.',
        'Resiliência Marinha: Regenera 15% de vida ao final de cada turno na água.'
    ],
    passiva: 'Protetor Oceânico: Aliados próximos ganham +10% de vigor ao lutar na água.',
    passivaElemental: 'Força das Marés: Aumenta o dano em 15% enquanto submerso.',
    actionBonus: '+25 força em ataques na água, +20 resistência a movimentos lentos, +30 regeneração de vida submerso, +10 em cavar, +10 socializar'
},
'Nigersauro': {
    title: 'Pastoreiro Silencioso',
    image: 'imagens/dinos_nigersaurus.jpg', // Substitua pelo caminho correto da imagem
    height: '9 m',
    length: '15 m',
    weight: '15.000 kg',
    attributes: { agi: 3, for: 4, int: 4, pre: 3, vig: 6 },
    life: 450,
    armor: 220,
    attacks: [
        'Mordida Precisa: 5d8+15 (ignora 10% da armadura do alvo)',
        'Cauda Ágil: 4d10+12 (dano médio com chance de derrubar)',
        'Pisada Estável: 3d10+10 (reduz a agilidade dos inimigos em 10%)'
    ],
    abilities: [
        'Colheita Eficiente: Regenera 5% de vigor ao consumir plantas próximas.',
        'Presença Tranquilizante: Reduz o impacto de debuffs mentais em aliados.'
    ],
    passiva: 'Pastoreiro Natural: Aliados próximos recuperam 5% de vida ao final de cada turno.',
    passivaElemental: 'Resiliência Vegetal: Em terrenos verdes, ganha +15% de vida temporária.',
    actionBonus: '+20 força ao usar cauda, +15 resistência a debuffs mentais, +25 dano contra alvos imóveis'
},
'Dreadnoughtus': {
    title: 'Guerreiro Colossal',
    image: 'imagens/dinos_dreadnoughtus.jpg', // Substitua pelo caminho correto da imagem
    height: '12 m',
    length: '30 m',
    weight: '50.000 kg',
    attributes: { agi: 2, for: 7, int: 3, pre: 4, vig: 8 },
    life: 1000,
    armor: 680,
    attacks: [
        'Impacto Colossal: 8d12+25 (causa tremores, reduz precisão dos inimigos em 15%)',
        'Cauda Demolidora: 7d10+22 (derruba alvos menores e causa dano em área)',
        'Pisada Devastadora: 6d12+20 (dano extra contra estruturas)'
    ],
    abilities: [
        'Presença Ameaçadora: Reduz a moral dos inimigos em 70% ao entrar em combate.',
        'Fortaleza Natural: Reduz o dano recebido de ataques à distância em 20%.'
    ],
    passiva: 'Defesa Gigantesca: Concede +50% de armadura para aliados próximos.',
    passivaElemental: 'Fúria Ancestral: Em climas extremos, aumenta o dano em 50%.',
    actionBonus: '+30 resistência a impactos, +25 dano em ataques contínuos, +35 força contra estruturas'
},

'Camarassauro': {
    title: 'Defensor das Planícies',
    image: 'imagens/dinos_camarassauro.jpg', // Substitua pelo caminho correto da imagem
    height: '7 m',
    length: '23 m',
    weight: '25.000 kg',
    attributes: { agi: 3, for: 5, int: 4, pre: 4, vig: 7 },
    life: 500,
    armor: 200,
    attacks: [
        'Cauda Impactante: 6d10+18 (ignora 10% da armadura do alvo)',
        'Pisada Contundente: 5d12+16 (dano em área pequena, reduz vigor dos inimigos)',
        'Mordida Poderosa: 4d8+15 (dano extra contra criaturas menores)'
    ],
    abilities: [
        'Resistência em Grupo: Garante +15% de vigor a aliados próximos.',
        'Força Ambiental: Causa dano adicional em climas temperados.'
    ],
    passiva: 'Estabilidade Territorial: Concede resistência a deslocamentos.',
    passivaElemental: 'Vitalidade Verde: Recupera 5% de vida em terrenos verdes.',
    actionBonus: '+20 dano ao usar cauda, +25 resistência em terrenos difíceis, +30 vigor em combate prolongado'
},

'Girafotitã': {
    title: 'Alto Guardião',
    image: 'imagens/dinos_giraffatitan.jpg', // Substitua pelo caminho correto da imagem
    height: '18 m',
    length: '25 m',
    weight: '40.000 kg',
    attributes: { agi: 2, for: 6, int: 4, pre: 5, vig: 8 },
    life: 700,
    armor: 240,
    attacks: [
        'Chicote de Cauda: 7d10+20 (derruba inimigos menores e reduz precisão)',
        'Pisada Monumental: 6d12+22 (cria tremores, causa atordoamento por 1 turno)',
        'Mordida Destrutiva: 5d8+18 (ignora armaduras leves)'
    ],
    abilities: [
        'Guarda Silenciosa: Diminui a visibilidade de aliados próximos em 20%.',
        'Resistência Alta: Reduz penalidades por altura ao atacar.'
    ],
    passiva: 'Protetor Elevado: Aliados recebem +70% de visão em combate.',
    passivaElemental: 'Rugido dos Altos Céus: Em climas montanhosos, ganha +40% de dano.',
    actionBonus: '+25 força contra inimigos menores, +30 resistência em alturas, +35 dano em ataques sequenciais'
},

'Paraceratério': {
    title: 'Nômade Resistente',
    image: 'imagens/dinos_paraceratério.jpg', // Substitua pelo caminho correto da imagem
    height: '6 m',
    length: '9 m',
    weight: '10.000 kg',
    attributes: { agi: 4, for: 5, int: 4, pre: 4, vig: 7 },
    life: 450,
    armor: 180,
    attacks: [
        'Chute Nômade: 5d10+15 (derruba inimigos menores)',
        'Cabeçada de Impacto: 6d10+18 (ignora 15% da armadura)',
        'Pisada Resiliente: 4d12+16 (dano em área pequena)'
    ],
    abilities: [
        'Viajante Ágil: Imune a penalidades em terrenos variados.',
        'Resiliência Nômade: Regenera 5% de vida ao final de cada turno fora de combate.'
    ],
    passiva: 'Sobrevivente Errante: Garante +10% de vigor a aliados em movimento.',
    passivaElemental: 'Força Nômade: Aumenta o dano em 20% ao lutar em diferentes terrenos.',
    actionBonus: '+20 força em terrenos variados, +25 resistência a debuffs climáticos, +30 vigor em deslocamento'
},
'Trike': {
    title: 'Batalhador Defensivo',
    image: 'imagens/dinos_trike.jpg', // Substitua pelo caminho correto da imagem
    height: '3 m',
    length: '9 m',
    weight: '6.000 kg',
    attributes: { agi: 2, for: 4, int: 3, pre: 4, vig: 4 },
    life: 230,
    armor: 230,
    attacks: [
        'Investida de Chifres: 6d10+20 (derruba e causa atordoamento por 1 turno)',
        'Cabeçada Poderosa: 5d12+18 (ignora 10% da armadura do alvo)',
        'Chifrada Giratória: 4d10+15 (dano em área pequena ao redor do Trike)'
    ],
    abilities: [
        'Fortaleza Natural: Reduz dano recebido em 50% contra ataques frontais.',
        'Resistência ao Impacto: Ignora efeitos de atordoamento.'
    ],
    passiva: 'Defensor Territorial: Garante +40% de armadura a aliados próximos.',
    passivaElemental: 'Critico de chifre: Em áreas de montanhas, aumenta o dano em 75%.',
    actionBonus: '+25 força em investidas, +20 resistência a impactos, +30 dano contra estruturas defensivas'
},

'Torossauro': {
    title: 'Escudo Vivente',
    image: 'imagens/dinos_torossauro.jpg', // Substitua pelo caminho correto da imagem
    height: '3,2 m',
    length: '8,5 m',
    weight: '6.500 kg',
    attributes: { agi: 3, for: 4, int: 2, pre: 2, vig: 2 },
    life: 280,
    armor: 200,
    attacks: [
        'Chifrada Demolidora: 7d10+22 (derruba alvos menores e reduz vigor em 10%)',
        'Pisada Pesada: 5d12+18 (dano em área com chance de derrubar)',
        'Empurrão Brutal: 4d8+15 (empurra inimigos 2 metros para trás)'
    ],
    abilities: [
        'Resiliência Imensa: Reduz penalidades por ferimentos críticos.',
        'Presença Defensiva: Garante +15% de vigor a aliados próximos.'
    ],
    passiva: 'Guardião Resistente: Imune a penalidades de movimento em terrenos difíceis.',
    passivaElemental: 'Fúria Protetora: Aumenta o dano em 50% ao defender aliados.',
    actionBonus: '+30 resistência contra impactos, +25 vigor em combates defensivos, +25 dano em ataques frontais'
},

'Chasmossauro': {
    title: 'Protetor das Florestas',
    image: 'imagens/dinos_chasmossauro.jpg', // Substitua pelo caminho correto da imagem
    height: '4 m',
    length: '8 m',
    weight: '5.800 kg',
    attributes: { agi: 2, for: 3, int: 2, pre: 2, vig: 3 },
    life: 320,
    armor: 180,
    attacks: [
        'Cabeçada Impetuosa: 6d10+20 (ignora 15% da armadura do alvo)',
        'Chifrada Precisiva: 5d12+18 (reduz agilidade dos inimigos em 10%)',
        'Pisada Contundente: 4d10+15 (dano médio com chance de derrubar)'
    ],
    abilities: [
        'Presença Imponente: Reduz a precisão dos inimigos próximos em 50%.',
        'Defesa Natural: Aumenta a armadura em 100% em terrenos florestais.'
    ],
    passiva: 'Vitalidade Verde: Recupera 50% de vida ao lutar em áreas florestais.',
    passivaElemental: 'Força Territorial: Em florestas, aumenta o dano em 50%.',
    actionBonus: '+20 força contra inimigos em movimento, +25 resistência em florestas, +25 vigor em combates prolongados'
},

'Dracorex': {
    title: 'Cabeça Dura',
    image: 'imagens/dinos_dracorex.jpg', // Substitua pelo caminho correto da imagem
    height: '1,8 m',
    length: '4 m',
    weight: '600 kg',
    attributes: { agi: 4, for: 3, int: 1, pre: 2, vig: 2 },
    life: 80,
    armor: 12,
    attacks: [
        'Cabeçada Explosiva: 5d8+15 (derruba e causa atordoamento por 1 turno)',
        'Chifrada Rápida: 4d10+12 (dano médio com redução de vigor do alvo)',
        'Investida Ágil: 3d10+10 (desvia de ataques ao se mover)'
    ],
    abilities: [
        'Agilidade Natural: Ganha +15% de evasão ao se mover.',
        'Defesa Rápida: Reduz dano recebido de ataques à distância.'
    ],
    passiva: 'Sobrevivente Ágil: Recupera vigor ao esquivar de ataques consecutivos.',
    passivaElemental: 'Eco do Vento: Em tempestades, aumenta a precisão em 15%.',
    actionBonus: '+10 agilidade ao se mover, +5 resistência a ataques frontais, +10 força em investidas'
},

'Nasuceratops': {
    title: 'Defensor Obstinado',
    image: 'imagens/dinos_nasuceratops.jpg', // Substitua pelo caminho correto da imagem
    height: '2,5 m',
    length: '6 m',
    weight: '3.000 kg',
    attributes: { agi: 3, for: 4, int: 2, pre: 2, vig: 4 },
    life: 200,
    armor: 150,
    attacks: [
        'Investida Firme: 6d8+18 (derruba inimigos e reduz precisão em 50%)',
        'Cabeçada Precisa: 5d10+15 (dano adicional contra armaduras leves)',
        'Pisada Rápida: 4d8+12 (dano em área com chance de atordoar)'
    ],
    abilities: [
        'Defensor Persistente: Reduz penalidades de vigor em combates longos.',
        'Resiliência Territorial: Imune a penalidades em climas quentes.'
    ],
    passiva: 'Proteção Implacável: Garante +10% de armadura a aliados próximos.',
    passivaElemental: 'Força do Sol: Aumenta o dano em 15% ao lutar sob forte calor.',
    actionBonus: '+15 força contra inimigos menores, +10 resistência em climas quentes, +15 vigor em lutas prolongadas'
},

'Sinoceratops': {
    title: 'Protetor Unido',
    image: 'imagens/dinos_sinoceratops.jpg', // Substitua pelo caminho correto da imagem
    height: '2,8 m',
    length: '7,5 m',
    weight: '4.500 kg',
    attributes: { agi: 4, for: 5, int: 4, pre: 5, vig: 6 },
    life: 320,
    armor: 200,
    attacks: [
        'Chifrada Implacável: 6d10+20 (dano médio com chance de atordoar)',
        'Pisada Contundente: 5d12+18 (dano em área com redução de vigor do alvo)',
        'Investida Poderosa: 4d10+15 (derruba alvos menores com impacto)'
    ],
    abilities: [
        'Unidade Natural: Garante +50% de vigor a aliados próximos.',
        'Resiliência Inata: Reduz penalidades de movimentação em terrenos difíceis.'
    ],
    passiva: 'Defensor Unido: Aumenta a armadura de aliados em 40% ao lutar em grupo.',
    passivaElemental: 'Força Territorial: Ganha +15% de dano ao proteger aliados.',
    actionBonus: '+20 força em grupos, +25 resistência a debuffs de agilidade, +30 vigor em combates defensivos'
},

'Estiracossauro': {
    title: 'Defensor Espinhoso',
    image: 'imagens/dinos_estiracossauro.jpg', // Substitua pelo caminho correto da imagem
    height: '2,8 m',
    length: '7 m',
    weight: '4.800 kg',
    attributes: { agi: 4, for: 5, int: 4, pre: 4, vig: 6 },
    life: 180,
    armor: 180,
    attacks: [
        'Chifrada Espinhosa: 7d12+22 (ignora 100% da armadura do alvo)',
        'Pisada Forte: 5d12+20 (dano em área com chance de derrubar)',
        'Investida Espinhosa: 4d10+18 (causa dano adicional contra criaturas grandes)'
    ],
    abilities: [
        'Presença Espinhosa: Causa 15% de dano de retorno ao ser atacado.',
        'Defesa Natural: Reduz dano recebido em 10% contra ataques físicos, como ataques criticos.'
    ],
    passiva: 'Proteção Espinhosa: Aliados recebem +50% de dano de retorno critico.',
    passivaElemental: 'Resistência do Sol: Ganha +45% de resistência em climas quentes.',
    actionBonus: '+25 força em ataques frontais, +20 resistência a danos físicos, +30 dano contra criaturas grandes'
},
// Fichas completas e balanceadas com ajustes nas habilidades, atributos e bônus de ação

'Olorotiã': {
    title: 'Herbívoro Resiliente',
    image: 'imagens/dinos_olorotitã.jpg', // Substitua pelo caminho correto da imagem
    height: '4,5 m',
    length: '9 m',
    weight: '4.200 kg',
    attributes: { agi: 3, for: 4, int: 3, pre: 4, vig: 5 },
    life: 220,
    armor: 14,
    attacks: [
        'Bicada Poderosa: 4d10+15 (ignora 25% da armadura do alvo)',
        'Cauda Varredora: 3d10+12 (dano em área com chance de derrubar)',
        'Pisada Pesada: 4d8+10 (impacto moderado em área pequena)'
    ],
    abilities: [
        'Força da Multidão: Ganha +50% de vigor por aliado próximo.',
        'Resistência Persistente: Reduz penalidades de vigor em combates longos.'
    ],
    passiva: 'Sobrevivente Territorial: Recupera 3% de vida em biomas de florestas.',
    passivaElemental: 'Força Ancestral: Aumenta o dano em 100% em áreas montanhosas.',
    actionBonus: '+15 resistência em terrenos difíceis, +10 força em ataques de grupo, +10 vigor em combates defensivos'
},

'Coritossauro': {
    title: 'Eco das Planícies',
    image: 'imagens/dinos_coritinossauro.jpg', // Substitua pelo caminho correto da imagem
    height: '3,5 m',
    length: '8 m',
    weight: '3.800 kg',
    attributes: { agi: 4, for: 3, int: 3, pre: 4, vig: 4 },
    life: 180,
    armor: 30,
    attacks: [
        'Bicada Veloz: 4d8+12 (dano moderado com chance de desorientar)',
        'Cabeçada Ecoante: 3d10+15 (reduz a precisão dos inimigos em 5%)',
        'Pisada de Advertência: 3d8+10 (dano em área pequena com som intimidante)'
    ],
    abilities: [
        'Presença Ecoante: Reduz o vigor dos inimigos próximos em 30%.',
        'Agilidade Natural: Ganha +50% de evasão em áreas abertas.'
    ],
    passiva: 'Chamado das Planícies: Aumenta a agilidade dos aliados em 30%.',
    passivaElemental: 'Força do Som: Emite um grito que aumenta o dano em 5% durante tempestades.',
    actionBonus: '+10 força em áreas abertas, +10 resistência contra debuffs de agilidade, +15 precisão em ataques ecoantes'
},

'Mutaburrassauro': {
    title: 'Protetor Adaptável',
    image: 'imagens/dinos_mutaburrassauro.jpg', // Substitua pelo caminho correto da imagem
    height: '3 m',
    length: '7 m',
    weight: '4.000 kg',
    attributes: { agi: 3, for: 4, int: 3, pre: 4, vig: 5 },
    life: 160,
    armor: 55,
    attacks: [
        'Investida Poderosa: 5d8+15 (derruba inimigos menores)',
        'Cauda Cortante: 4d10+12 (dano em área com redução de vigor do alvo)',
        'Pisada Impactante: 4d8+10 (dano moderado com chance de desorientar)'
    ],
    abilities: [
        'Resiliência Adaptável: Ganha resistência a climas extremos.',
        'Defesa Instintiva: Reduz o dano recebido de ataques críticos em 50%.'
    ],
    passiva: 'Sobrevivente Versátil: Recupera 10% de vida por turno ao mudar de posição.',
    passivaElemental: 'Força Natural: Aumenta o vigor em 50% em florestas densas.',
    actionBonus: '+10 resistência em climas extremos, +10 vigor em áreas densamente arborizadas, +10 força em ataques frontais'
},

'Edmontossauro': {
    title: 'Gigante das Pastagens',
    image: 'imagens/dinos_edmontossauro.jpg', // Substitua pelo caminho correto da imagem
    height: '3,2 m',
    length: '10 m',
    weight: '5.000 kg',
    attributes: { agi: 2, for: 4, int: 3, pre: 2, vig: 5 },
    life: 240,
    armor: 150,
    attacks: [
        'Bicada Pesada: 5d10+15 (dano médio com redução de precisão do alvo)',
        'Cauda Varredora: 4d8+12 (dano em área com chance de derrubar)',
        'Investida Intimidante: 4d8+10 (causa desorientação ao atingir o alvo)'
    ],
    abilities: [
        'Resiliência das Pastagens: Aumenta a armadura em 50% em terrenos planos.',
        'Força Territorial: Ganha +50% de vigor ao lutar em grupo.'
    ],
    passiva: 'Defesa do Rebanho: Aliados próximos recebem +5% de armadura.',
    passivaElemental: 'Força do Sol: Aumenta o dano em 5% sob forte luz solar.',
    actionBonus: '+10 força em áreas abertas, +10 resistência contra penalidades de vigor, +15 precisão em ataques defensivos'
},

'Maiassauro': {
    title: 'Protetora Maternal',
    image: 'imagens/dinos_maiassauro.jpg', // Substitua pelo caminho correto da imagem
    height: '3,5 m',
    length: '9 m',
    weight: '4.500 kg',
    attributes: { agi: 4, for: 4, int: 4, pre: 5, vig: 5 },
    life: 200,
    armor: 100,
    attacks: [
        'Bicada Protetora: 4d10+15 (dano médio com redução de agilidade do alvo)',
        'Cauda Impactante: 3d10+12 (dano em área com chance de derrubar)',
        'Pisada Pesada: 4d8+10 (impacto moderado em área pequena)'
    ],
    abilities: [
        'Instinto Protetor: Garante +50% de resistência a aliados próximos.',
        'Presença Calma: Reduz os efeitos de medo em aliados próximos.'
    ],
    passiva: 'Defensora Inata: Recupera 30% de vigor ao proteger aliados.',
    passivaElemental: 'Força da Terra: Aumenta o dano em 50% em terrenos estáveis.',
    actionBonus: '+10 força em combates de grupo, +10 resistência em combates prolongados, +15 precisão em ataques protetores'
},
'Estegossauro': {
    title: 'Tanque Espinhoso',
    image: 'imagens/dinos_estegossauro.jpg',
    height: '4 m',
    length: '9 m',
    weight: '5.000 kg',
    attributes: { agi: 2, for: 5, int: 2, pre: 3, vig: 5 },
    life: 260,
    armor: 180,
    attacks: [
        'Golpe com Cauda: 7d10+10 (causa lentidão por 1 turno)',
        'Investida Espinhosa: 5d8+12 (reduz a agilidade do alvo em 10%)',
        'Defesa Natural: 3d8+8 (aumenta a resistência própria por 2 turnos)'
    ],
    abilities: [
        'Escudo Natural: Reduz o dano recebido em 50% contra ataques frontais.',
        'Resiliência Espinhosa: Ao sofrer ataques corpo a corpo, causa 25% de dano refletido.'
    ],
    passiva: 'Proteção Espinhosa: Ganha +50% de armadura ao ser cercado por inimigos.',
    passivaElemental: 'Fortaleza de Pedra: Ganha resistência extra de 70% em terrenos rochosos.',
    actionBonus: '+15 em ataques de cauda, +10 resistência contra predadores, +10 lentidão adicional em golpes.'
},

'Kentrossauro': {
    title: 'Defensor Espinhoso',
    image: 'imagens/dinos_kentroussauro.jpg',
    height: '3 m',
    length: '7 m',
    weight: '3.000 kg',
    attributes: { agi: 3, for: 4, int: 2, pre: 3, vig: 5 },
    life: 240,
    armor: 200,
    attacks: [
        'Golpe Espinhoso: 5d10+12 (reflete 50% do dano recebido por 1 turno)',
        'Cauda Giratória: 4d8+10 (ataca múltiplos inimigos próximos)',
        'Defesa Enraizada: 2d8+8 (aumenta a própria resistência em 25% por 2 turnos)'
    ],
    abilities: [
        'Barreira Natural: Reflete 100% do dano recebido ao permanecer imóvel.',
        'Retaliação Espinhosa: Inimigos que atacam corpo a corpo recebem 75% do dano refletido.'
    ],
    passiva: 'Defesa Instintiva: Recebe +50% de resistência ao ser atacado por múltiplos inimigos.',
    passivaElemental: 'Armadura de Chamas: Ganha imunidade parcial a queimaduras.',
    actionBonus: '+15 em ataques em grupo, +10 resistência extra contra investidas, +10 regeneração ao usar Defesa Enraizada.'
},

'Nodossauro': {
    title: 'Escudo Vivo',
    image: 'imagens/dinos_nodossauro.jpg',
    height: '2,5 m',
    length: '6 m',
    weight: '2.500 kg',
    attributes: { agi: 2, for: 4, int: 2, pre: 2, vig: 6 },
    life: 180,
    armor: 280,
    attacks: [
        'Pancada com Cauda: 3d10+15 (causa lentidão por 2 turnos)',
        'Investida Blindada: 4d12+15 (derruba inimigos menores)',
        'Defesa Impenetrável: 2d6+8 (bloqueia 50% do dano recebido por 2 turnos)'
    ],
    abilities: [
        'Armadura Pesada: Reduz 25% do dano recebido de ataques à distância.',
        'Resistência Inabalável: Imune a efeitos de empurrão.'
    ],
    passiva: 'Escudo de Pedra: Ganha +20% de resistência ao defender aliados próximos.',
    passivaElemental: 'Vigor Inato: Em climas frios, regenera 25% da vida ao final de cada turno.',
    actionBonus: '+15 em ataques de defesa, +10 bloqueio adicional, +10 resistência em grupo.'
},

'Anquilossauro': {
    title: 'Martelo Blindado',
    image: 'imagens/dinos_anquilossauro.jpg',
    height: '3 m',
    length: '8 m',
    weight: '4.000 kg',
    attributes: { agi: 2, for: 5, int: 2, pre: 3, vig: 6 },
    life: 300,
    armor: 650,
    attacks: [
        'Golpe Esmagador: 6d10+15 (aplica quebrado)',
        'Investida Blindada: 4d12+12 (derruba alvos grandes)',
        'Martelada Destruidora: 3d8+10 (reduz a agilidade do alvo em 25%)'
    ],
    abilities: [
        'Pancada Resistente: Ganha +100% de dano contra estruturas.',
        'Defesa Impenetrável: Imune a efeitos de sangramento.'
    ],
    passiva: 'Armadura Natural: Ganha +50% de resistência ao atacar inimigos corpo a corpo.',
    passivaElemental: 'Força da Terra: Em terrenos rochosos, aumenta o dano em 50%.',
    actionBonus: '+15 em ataques contra estruturas, +10 bloqueio adicional, +10 resistência a debuffs.'
},

'Tatu': {
    title: 'Defensor Compacto',
    image: 'imagens/dinos_tatu.jpg',
    height: '1 m',
    length: '1,5 m',
    weight: '80 kg',
    attributes: { agi: 3, for: 2, int: 3, pre: 2, vig: 5 },
    life: 180,
    armor: 300,
    attacks: [
        'Giro Defensivo: 8d6+8 (reduz dano recebido em 50%)',
        'Investida Compacta: 4d8+10 (derruba inimigos pequenos)',
        'Defesa Enrolada: 10d6+6 (reduz dano em 25% por 1 turno)'
    ],
    abilities: [
        'Resiliência Pequena: Ganha +50% de resistência ao ser atacado.',
        'Proteção Natural: Reduz penalidades em terrenos arenosos.'
    ],
    passiva: 'Compactação Natural: Recupera 10% de vida ao se enrolar.',
    passivaElemental: 'Escudo de Areia: Em desertos, ganha +90% de resistência.',
    actionBonus: '+15 em resistência contra impactos, +10 regeneração ao usar Defesa Enrolada.'
},

'Castor': {
    title: 'Construtor Hábil',
    image: 'imagens/dinos_castor.jpg',
    height: '1 m',
    length: '1,2 m',
    weight: '40 kg',
    attributes: { agi: 3, for: 2, int: 4, pre: 3, vig: 4 },
    life: 120,
    armor: 8,
    attacks: [
        'Mordida Cortante: 3d6+8 (causa sangramento leve)',
        'Golpe com Cauda: 4d6+10 (reduz a precisão do alvo em 25%)',
        'Construtor Defensivo: 2d6+6 (aumenta resistência própria por 2 turnos)'
    ],
    abilities: [
        'Eficiência Natural: Reduz penalidades ao construir estruturas.',
        'Resiliência Hídrica: Ganha +50% de vigor ao nadar.'
    ],
    passiva: 'Engenheiro Nato: Recupera 50% de vigor ao completar ações.',
    passivaElemental: 'Fluxo da Água: Em rios, aumenta o dano em 10%.',
    actionBonus: '+15 em ações de construção, +10 resistência em combate, +10 regeneração ao usar Construtor Defensivo.'
},
'Carbonemy': {
    title: 'Defensor Blindado',
    image: 'imagens/dinos_carbonemy.jpg',
    height: '1,2 m',
    length: '2,5 m',
    weight: '500 kg',
    attributes: { agi: 2, for: 4, int: 2, pre: 3, vig: 6 },
    life: 280,
    armor: 450,
    attacks: [
        'Mordida Lenta: 8d6+25 (dano leve, chance de aplicar -50% de agilidade no alvo)',
        'Golpe de Carapaça: 4d8+10 (reflete 50% do dano recebido durante o turno)',
        'Investida Resistente: 3d10+12 (derruba inimigos pequenos)' 
    ],
    abilities: [
        'Carapaça Reforçada: Reduz dano físico em 30%.',
        'Resistência Natural: Imune a debuffs de sangramento.'
    ],
    passiva: 'Tartaruga de Ferro: Regenera 10% da vida ao bloquear ataques críticos.',
    passivaElemental: 'Fortaleza Marinha: Em terrenos aquáticos, aumenta a armadura em 80%.',
    actionBonus: '+15 resistência a danos físicos, +10 movimento em terrenos aquáticos, +15 bloqueio de ataques.'
},

'Mamute': {
    title: 'Titã das Neves',
    image: 'imagens/dinos_mamute.jpg',
    height: '3,4 m',
    length: '6 m',
    weight: '6.000 kg',
    attributes: { agi: 3, for: 6, int: 3, pre: 4, vig: 5 },
    life: 400,
    armor: 120,
    attacks: [
        'Chifrada Poderosa: 5d10+15 (derruba e aplica -50% de resistência ao alvo por 2 turnos)',
        'Pisoteio: 4d12+20 (dano em área com chance de atordoamento)',
        'Golpe de Presa: 4d8+12 (aplica sangramento leve)' 
    ],
    abilities: [
        'Fúria do Gelo: Aumenta dano em 50% em ambientes frios.',
        'Resistência Ártica: Reduz penalidades de movimento em terrenos nevados.'
    ],
    passiva: 'Proteção Espessa: Reduz o impacto de ataques críticos em 25%, reduz o frio tbm',
    passivaElemental: 'Aura Congelante: Em ambientes frios, reduz agilidade de inimigos próximos em 10%.',
    actionBonus: '+15 dano em terrenos nevados, +20 resistência ao frio, +10 ao bloquear investidas.'
},

'Rinoceronte': {
    title: 'Investidor Impetuoso',
    image: 'imagens/dinos_rinoceronte.jpg',
    height: '1,8 m',
    length: '4 m',
    weight: '2.800 kg',
    attributes: { agi: 3, for: 5, int: 2, pre: 3, vig: 4 },
    life: 280,
    armor: 150,
    attacks: [
        'Chifrada Agressiva: 4d10+18 (causa dano adicional x4 se usado após movimentação)',
        'Pisada Furiosa: 3d12+15 (dano em área pequena)',
        'Golpe de Impacto: 4d8+10 (derruba inimigos menores)' 
    ],
    abilities: [
        'Força Bruta: Ignora 100% da armadura do alvo ao atacar.',
        'Fúria Crescente: Aumenta dano em 10% a cada turno em combate.'
    ],
    passiva: 'Pele Dura: Reduz dano de projéteis em 25%.',
    passivaElemental: 'Coração Selvagem: Em climas quentes, aumenta vigor em 10%.',
    actionBonus: '+20 dano após corrida, +15 resistência a impactos, +10 velocidade em ataques.'
},

'Therezinossauro': {
    title: 'Ceifador Selvagem',
    image: 'imagens/dinos_therezinossauro.jpg',
    height: '5 m',
    length: '6 m',
    weight: '3.000 kg',
    attributes: { agi: 4, for: 6, int: 3, pre: 4, vig: 4 },
    life: 280,
    armor: 40,
    attacks: [
        'Garra Mortal: 6d10+20  x2(causa sangramento por 3 turnos)',
        'Corte Selvagem: 5d12+18 (ignora 10% da armadura do alvo)',
        'Investida Cortante: 4d8+15 (derruba alvos pequenos e médios)' 
    ],
    abilities: [
        'Resiliência Selvagem: Reduz penalidades de fadiga em combate ao acertar um ataque.',
        'Fúria Sangrenta: Aumenta dano em 50% ao atacar inimigos com sangramento ativo.'
    ],
    passiva: 'Vigor Predador: Regenera 5% da vida ao causar abates.',
    passivaElemental: 'Aura Selvagem: Em ambientes florestais, aumenta agilidade em 50%.',
    actionBonus: '+15 dano contra alvos com sangramento, +20 resistência a fadiga, +10 esquiva em terrenos densos.'
},

'Magatério': {
    title: 'Força Ancestral',
    image: 'imagens/dinos_magatério.jpg',
    height: '3 m',
    length: '4,5 m',
    weight: '2.200 kg',
    attributes: { agi: 3, for: 5, int: 3, pre: 4, vig: 5 },
    life: 300,
    armor: 160,
    attacks: [
        'Garra Pesada: 4d12+18 x2(causa dano de impacto e reduz precisão do alvo em 50%)',
        'Golpe de Força: 5d10+15 (ignora 50% da armadura do alvo)',
        'Investida Brutal: 3d10+12 (derruba inimigos pequenos)' 
    ],
    abilities: [
        'Poder Ancestral: Aumenta resistência em 100% contra ataques elementais ou insetos,atrópodes.',
        'Instinto de Sobrevivência: Regenera 10% do vigor ao final de cada turno.'
    ],
    passiva: 'Fúria Territorial: Ganha +20% de dano ao lutar em áreas conhecidas.',
    passivaElemental: 'Resiliência Pré-histórica: Em terrenos montanhosos, reduz dano recebido em 40%.',
    actionBonus: '+15 resistência a elementos, +20 vigor em terrenos montanhosos, +10 força contra predadores.'
},

'Chalicotério': {
    title: 'Gigante Calmo',
    image: 'imagens/dinos_chalicotéiro.jpg',
    height: '2,5 m',
    length: '4 m',
    weight: '2.000 kg',
    attributes: { agi: 3, for: 4, int: 4, pre: 3, vig: 5 },
    life: 180,
    armor: 120,
    attacks: [
        'Soco Forte: 4d10+15 (derruba inimigos pequenos e médios)',
        'Investida Tranquila: 3d12+12 (ignora 10% da armadura do alvo)',
        'Golpe Defensivo: 3d8+10 (reduz dano recebido em 10% por 2 turnos)' 
    ],
    abilities: [
        'Resistência Natural: Reduz penalidades de combate em terrenos difíceis, atacar inimigos com fezes aplica lentidão de 50% e ganha bônus de ataque da memsa porcentagem',
        'Força Tranquila: Aumenta vigor em 10% ao início de cada combate.'
    ],
    passiva: 'Paz Resistente: Ganha +30% de resistência contra ataques consecutivos.',
    passivaElemental: 'Aura de Serenidade: Em áreas verdes, aumenta regeneração de vida em 5%.',
    actionBonus: '+15 vigor em áreas verdes, +10 resistência a debuffs, +20 dano ao defender aliados',
    },
    'Basilossauro': {
    title: 'Colosso do Mar',
    image: 'imagens/dinos_basilosaurus.jpg',
    height: '4 m',
    length: '15 m',
    weight: '10.000 kg',
    attributes: { agi: 3, for: 4, int: 4, pre: 2, vig: 6 },
    life: 260,
    armor: 200,
    attacks: [
        'Mordida Colossal: 6d10+25 (ignora 20% da armadura do alvo)',
        'Investida Aquática: 5d12+20 (derruba alvos menores e reduz precisão por 2 turnos)',
        'Impacto de Cauda: 4d8+18 (dano em área, aplica lentidão de 15%)'
    ],
    abilities: [
        'Resistência Marinha: Reduz penalidades de movimento em águas rasas.',
        'Força Oceânica: Ganha +50% de dano em correntes marítimas.'
    ],
    passiva: 'Fúria Submersa: Regenera 20% da vida ao causar dano.',
    passivaElemental: 'Adaptabilidade Salina: Ganha +20% de resistência contra efeitos de status na água.',
    actionBonus: '+15 Investida Aquática, +20 Impacto de Cauda, +15 regeneração ao longo do tempo.'
},

'Golfinho': {
    title: 'Ágil das Águas',
    image: 'imagens/dinos_golfinho.jpg',
    height: '1,2 m',
    length: '3 m',
    weight: '200 kg',
    attributes: { agi: 5, for: 3, int: 5, pre: 4, vig: 2 },
    life: 90,
    armor: 8,
    attacks: [
        'Investida Ágil: 4d8+12 (ignora bloqueios ao atacar em movimento)',
        'Mordida Rápida: 3d6+10 (chance de aplicar sangramento leve)',
        'Golpe com Focinho: 2d8+8 (atordoa o alvo por 1 turno)'
    ],
    abilities: [
        'Velocidade Hidrodinâmica: Ganha +15% de movimento na água.',
        'Inteligência Social: Ao lutar em grupo, todos recebem +50% de precisão.'
    ],
    passiva: 'Adaptação Aquática: Reduz penalidades de vigor em longas perseguições.',
    passivaElemental: 'Euforia Submersa: Durante tempestades, ganha +50% de esquiva.',
    actionBonus: '+15 Investida Ágil, +10 ao Golpe com Focinho, +10 esquiva, +5 socializar, +5 em movimento.'
},

'Baleia': {
    title: 'Gigante Pacificadora',
    image: 'imagens/dinos_baleia.jpg',
    height: '6 m',
    length: '20 m',
    weight: '30.000 kg',
    attributes: { agi: 2, for: 5, int: 4, pre: 3, vig: 6 },
    life: 400,
    armor: 300,
    attacks: [
        'Golpe de Cauda: 7d12+30 (derruba todos os inimigos próximos)',
        'Investida Oceânica: 6d10+25 (dano em linha reta, aplica empurrão)',
        'Ondulação Devastadora: 5d8+20 (dano em área com redução de vigor nos inimigos)'
    ],
    abilities: [
        'Resistência Colossal: Reduz todo dano recebido em 10%.',
        'Força da Maré: Ao mover-se continuamente, ganha +10% de dano.'
    ],
    passiva: 'Defesa Natural: Regenera 10% de vida por turno em águas calmas.',
    passivaElemental: 'Vigor Oceânico: Em áreas profundas, ganha +15% de resistência contra debuffs.',
    actionBonus: '+20 Golpe de Cauda, +25 Ondulação Devastadora.'
},

'Foca': {
    title: 'Caçadora Ágil',
    image: 'imagens/dinos_foca.jpg',
    height: '1,5 m',
    length: '3 m',
    weight: '300 kg',
    attributes: { agi: 5, for: 2, int: 3, pre: 4, vig: 2 },
    life: 100,
    armor: 10,
    attacks: [
        'Mordida Rápida: 3d8+10 (dano leve, chance de aplicar lentidão)',
        'Golpe com Nado: 4d6+12 (aplica confusão no alvo por 1 turno)',
        'Salto Aquático: 2d10+10 (dano adicional em alvos maiores)'
    ],
    abilities: [
        'Agilidade Submersa: Ganha +20% de velocidade ao atacar de surpresa.',
        'Predador Ártico: Resiste a climas frios com bônus de +15% em vigor.'
    ],
    passiva: 'Sobrevivência Ágil: Evita o primeiro ataque recebido por combate.',
    passivaElemental: 'Fúria do Gelo: Em águas geladas, causa +10% de dano.',
    actionBonus: '+15 Mordida Rápida, +10 Golpe com Nado, +10 em fuga.'
},

'Ichitiossauro': {
    title: 'Veloz dos Mares',
    image: 'imagens/dinos_ictiossauros.jpg',
    height: '2 m',
    length: '5 m',
    weight: '1.200 kg',
    attributes: { agi: 6, for: 2, int: 4, pre: 4, vig: 2 },
    life: 90,
    armor: 12,
    attacks: [
        'Mordida de Velocista: 5d8+15 (dano rápido com chance de crítico)',
        'Golpe Submerso: 2d10+12 (aplica lentidão no alvo por 2 turnos)',
        'Ataque em Movimento: 3d6+10 (dano extra ao atacar em movimento)'
    ],
    abilities: [
        'Instinto Ágil: Ganha +10% de esquiva ao ser atacado.',
        'Caçador Submerso: Dano aumentado em 50% contra alvos menores.'
    ],
    passiva: 'Fôlego Resiliente: Reduz penalidades de vigor em 50%.',
    passivaElemental: 'Força das Correntes: Ganha +15% de precisão em águas agitadas.',
    actionBonus: '+20 Golpe Submerso, +10 Ataque em Movimento, +10 em fuga'
},

'Água-viva': {
    title: 'Terror Transparente',
    image: 'imagens/dinos_águas_vivas.jpg',
    height: '0,5 m',
    length: '2 m',
    weight: '50 kg',
    attributes: { agi: 5, for: 2, int: 3, pre: 5, vig: 3 },
    life: 120,
    armor: 120,
    attacks: [
        'Choque Elétrico: 3d10+12 (paralisa o alvo por 1 turno)',
        'Golpe com Tentáculos: 3d8+10 (aplica lentidão de 100% por 2 turnos)',
        'Corrente Mortal: 5d6+15 (causa dano contínuo por 2 turnos)'
    ],
    abilities: [
        'Presença Invisível: Reduz a detecção por inimigos em 70%.',
        'Campo Elétrico: Causa dano em área ao ser atacada.'
    ],
    passiva: 'Adaptação Oceânica: Regenera 25% da vida ao permanecer imóvel.',
    passivaElemental: 'Força Elétrica: Em tempestades, amplifica o dano em 100%.',
    actionBonus: '+15 Choque Elétrico, +10 Corrente Mortal.'
},

'Manta': {
    title: 'Planadora Marinha',
    image: 'imagens/dinos_manta.jpg',
    height: '2 m',
    length: '6 m',
    weight: '1.500 kg',
    attributes: { agi: 6, for: 2, int: 2, pre: 3, vig: 2 },
    life: 80,
    armor: 10,
    attacks: [
        'Investida Submersa: 5d8+15 (ignora armaduras ao atacar de surpresa)',
        'Golpe de Asa: 4d6+12 (dano em área pequena)',
        'Esmagamento Aquático: 3d10+10 (aplica lentidão em alvos próximos)'
    ],
    abilities: [
        'Nado Ágil: Ganha +20% de velocidade em águas rasas.',
        'Predador Veloz: Causa +50% de dano ao atacar alvos em fuga.'
    ],
    passiva: 'Defesa Elegante: Evita o primeiro ataque recebido.',
    passivaElemental: 'Adaptação Salina: Resiste a efeitos debilitantes em áreas salinas.',
    actionBonus: '+15 Investida Submersa, +10 Golpe de Asa, +10 em fuga e esquiva'
},

'Grifo': {
    title: 'Guardião dos Céus',
    image: 'imagens/dinos_grifo.jpg',
    height: '3 m',
    length: '5 m',
    weight: '1.200 kg',
    attributes: { agi: 5, for: 2, int: 4, pre: 3, vig: 2 },
    life: 230,
    armor: 100,
    attacks: [
        'Garra Afiada: 5d10+20 (aplica sangramento por 2 turnos)',
        'Investida Aérea: 6d12+25 (derruba o alvo e reduz agilidade em 20%)',
        'Rugido Intimidador: 4d8+15 (reduz precisão dos inimigos em 15%)'
    ],
    abilities: [
        'Domínio Aéreo: Reduz penalidades ao atacar em movimento.',
        'Fúria Celestial: Amplifica o dano em 15% ao voar continuamente.'
    ],
    passiva: 'Visão Predadora: Ganha +100% de precisão contra alvos maiores.',
    passivaElemental: 'Força dos Ventos: Em tempestades, recebe +50% de esquiva.',
    actionBonus: '+20 Investida Aérea, +15 Rugido Intimidador, +15 esquiva, +15 fuga.'
},
'Sinomacrops': {
    title: 'Pequeno Companheiro Alado',
    image: 'imagens/dinos_sinomacrops.jpg', // Substitua pelo caminho correto da imagem
    height: '0,5 m',
    length: '1 m',
    weight: '10 kg',
    attributes: { agi: 5, for: 1, int: 5, pre: 5, vig: 1 },
    life: 70,
    armor: 5,
    attacks: [
        'Mordida Curiosa: 2d6+5 (dano leve com chance de desarmar alvos pequenos)',
        'Balanço de Asas: 3d6+8 (aplica lentidão de 10% por 2 turnos ao redor)',
        'Impacto Ágil: 3d8+10 (dano moderado com chance de derrubar alvos pequenos)'
    ],
    abilities: [
        'Fascínio por Quitina: Ao interagir com quitina, emite um grito que aumenta o dano dos aliados em 15% por 3 turnos.',
        'Alerta Preciso: Detecta inimigos a até 30 metros, revelando emboscadas e alvos escondidos.',
        'Companheiro Alado: Permite que o sobrevivente voe em suas costas por até o fôlego da criatura.'
    ],
    passiva: 'Voo Ágil: Recebe +15% de esquiva enquanto estiver voando.',
    passivaElemental: 'Inteligência Adaptativa: A cada turno consecutivo enfrentando inimigos mais fortes, ganha +25% de esquiva e precisão.',
    actionBonus: '+10 Mordida Curiosa, +15 Fascínio por Quitina, +15 Companheiro Alado (tempo de voo estendido em +5 segundos)'
},
'Listrossauro': {
    title: 'Pequeno Companheiro',
    image: 'imagens/dinos_listrossauro.jpg', // Substitua pelo caminho correto da imagem
    height: '0,5 m',
    length: '1 m',
    weight: '10 kg',
    attributes: { agi: 3, for: 1, int: 1, pre: 1, vig: 2 },
    life: 70,
    armor: 5,
    attacks: [
        'Mordida Curiosa: 2d6+5 (dano leve com chance de desarmar alvos pequenos)',
        'Patinha: 2d6+5 (aplica lentidão de 10%)',
        'Impacto Ágil: 1d8+10 (dano moderado com chance de derrubar alvos pequenos)'
    ],
    abilities: [
        'Aglomerar: Ganha +10 em socializar e em acasalr para passar a linhagem da espécie',
        'Alerta Preciso: Detecta inimigos a até 30 metros, revelando emboscadas e alvos escondidos.',
        'Companheiro: faz o aliado ganhar bônus +5 em uma ação'
    ],
    passiva: 'Voo Ágil: Recebe +15% de esquiva enquanto estiver voando.',
    passivaElemental: 'Inteligência Adaptativa: A cada turno consecutivo enfrentando inimigos mais fortes, ganha +5% de esquiva e precisão.',
    actionBonus: '+10 Mordida Curiosa, +15 Fascínio por Quitina, +15 Companheiro Alado (tempo de voo estendido em +5 segundos)'
},
 'Indominus Rex': {
    title: 'A Criação Indomável',
    image: 'imagens/dinos_indominusrex.jpg', // Substitua pelo caminho correto
    weight: '8 toneladas',
    height: '9 M',
    length: '12 M',
    attributes: { agi: 4, for: 5, int: 5, pre: 4, vig: 5 },
    life: 650, // Escalável por nível ou estágio
    armor: 400, // Base de armadura devido à couraça anti-balas
    actionBonus: '+25 mordida, +15 garra, +15 camuflagem, +10 furtividade, +10 percepção, +25 intimidação, +10 em qualquer outra ação de agi e força.',
    attacks: [
        'Mordida Destrutiva: 16d12+30 (ignora metade da armadura)',
        'Garra Devastadora: 6d12+25 / 3d20+10 (dano adicional em alvos com armadura inferior a 15)',
        'Golpe Estratégico: 8d12+15 (adapta ao alvo, adicionando +1d6 ao ataque em rodadas subsequentes)'
    ],
    abilities: [
        'Camuflagem Total: Pode se tornar invisível por até 1d6 rodadas, ganhando +20 em furtividade e ataques críticos na primeira ação enquanto camuflada.',
        'Aprendizagem Rápida: Após observar uma ação específica por 1 rodada, pode replicá-la com +15 em testes relacionados.'
    ],
    passiva: 'Percepção Afiada: Imune a furtividade de inimigos e ganha vantagem em testes de percepção (+15).',
    passivaElemental: 'Fogo: Exala calor intenso ao ponto de causar 4d8 de dano em inimigos próximos. Gelo: Reduz a temperatura corporal para resistir a calor e congelar alvos (+15 em resistência ao fogo e ataques de gelo infligem lentidão). Sombras: Adquire invisibilidade permanente em locais escuros, exceto ao atacar.'
},
'Megavore' : {
    title: 'A Adaptação Incomum',
    image: 'imagens/dinos_megavore.jpg', // Substitua pelo caminho correto
    weight: '4 toneladas',
    height: '7 M',
    length: '13 M',
    attributes: { agi: 3, for: 5, int: 3, pre: 4, vig: 5 },
    life: 650, // Escalável por nível ou estágio
    armor: 600, // Base de armadura devido à pele resistente
    actionBonus: '+15 mordida, +15 garra, +10 natação, +10 escalada, +10 intimidação, +10 percepção',
    attacks: [
        'Mordida Quádrupla: 2d20+10 4x (aplica sangramento, causando 4d12 por turno)',
        'Garras Cortantes: 4d12+50 2x (dano adicional contra inimigos com elemento inimigo )',
        'Rugido Aterrorizante: Aplica medo (-2 em ações), lentidão e fraqueza (-2 em força) em uma área de 15 metros (resistência contra dificuldade 35).'
    ],
    abilities: [
        'Predador Adaptável: Pode nadar, escalar ou pular grandes alturas sem penalidades, ganhando +20 em testes relacionados.',
        'Sangramento Fatal: Alvos que já estão sangrando recebem anti-elemento de dano adicional em todos os ataques diretos.'
    ],
    passiva: 'Visão Multidimensional: Imune a furtividade de oponentes e ganha vantagem em ataques contra alvos ocultos.',
    passivaElemental: 'Aether: Ganha +30 em resistência a ataques elementais e pode absorver 10% do dano recebido para recuperar vida. '
},
 'Tusotheuthis' : {
    title: 'O Predador do Abismo',
    image: 'imagens/dinos_tusotheuthis.jpg', // Substitua pelo caminho correto
    weight: '3 toneladas',
    height: '4 M (tentáculos estendidos)',
    length: '23 M',
    attributes: { agi: 4, for: 5, int: 2, pre: 3, vig: 5 },
    life: [600], // Escalável por nível ou estágio
    armor: 220, // Base de armadura devido à pele resistente e tamanho colossal
    actionBonus: '+25 agarrar, +15 mordida, +10 regeneração, +10 resistência, +10 percepção subaquática',
    attacks: [
        'Tentáculos Esmagadores: 2d12+25 6x/ 3d20+10 (agarra o alvo e reduz sua mobilidade pela metade enquanto causa dano contínuo de 4d12 por rodada)',
        'Mordida do Abismo: 4d10+30 (causa dano adicional de 20d6 se o alvo estiver agarrado)',
        'Espremer Vitalidade: Recupera 10% da vida ao causar dano com os tentáculos enquanto agarra o alvo.'
    ],
    abilities: [
        'Agarre Colossal: Pode agarrar até dois alvos ao mesmo tempo, aplicando desvantagem (-15) em seus testes de força para se soltar.',
        'Recuperação Abissal: Recupera 5% da vida máxima a cada rodada que soltar a tinta de escape, tirando a percepção geral em 50%.'
    ],
    passiva: 'Predador do Abismo: Imune a debuffs relacionados à pressão ou escuridão subaquática e ganha +10 em furtividade em águas profundas.',
    passivaElemental: 'Água: Aumenta a velocidade de movimento em ambientes aquáticos e causa 1d8 de dano adicional ao atacar criaturas terrestres. Gelo: Ataca com tentáculos congelados, causando lentidão (-2 em agilidade). Sombras: Fica invisível em águas escuras, ganhando vantagem em ataques surpresa.'
},
 'Reaper-leviatã' : {
    title: 'O Predador Cego',
    image: 'imagens/dinos_reaper.jpg', // Substitua pelo caminho correto
    weight: '5 toneladas',
    height: '4,5 M',
    length: '17 M',
    attributes: { agi: 3, for: 5, int: 1, pre: 4, vig: 4 },
    life: 280, // Escalável por nível ou estágio
    armor: 220, // Base de armadura devido à musculatura densa e tamanho
    actionBonus: '+15 mordida, +15 garras, +10 eco localização, +10 agarrar, +10 resistência, +10 intimidação, +10 contra-ataque',
    attacks: [
        'Mordida Feroz: 4d12+10 (dano adicional de 1d20 contra alvos com menos de 50% de vida)',
        'Garras Mandibulares: 2d10+15 4x(agarra o alvo, causando 2d10 de dano por rodada e reduzindo sua mobilidade em 50%)',
        'Grito Ecoante: Um grito que atinge todos em um raio de 15 metros, causando 2d8 de dano sônico e desorientando alvos (-5 em ações por 1d4 rodadas, resistência contra dificuldade 15).'
    ],
    abilities: [
        'Eco-localização: Pode localizar qualquer criatura em um raio de 30 metros, ignorando furtividade ou invisibilidade, e ganha vantagem em ataques contra elas.',
        'Frenesi Predatório: Adiciona +1 dado a mais de dano em ataques contra alvos com menos de 25% de vida.'
    ],
    passiva: 'Implacável: Ao agarrar um alvo, suas garras têm vantagem em testes de força, e o alvo sofre -5 em tentativas de escapar.',
    passivaElemental: 'Água: Seus ataques têm alcance adicional de 3 metros e causam +1d8 de dano submerso. Sombras: Permanece invisível para criaturas que dependam de visão, exceto ao atacar. Fogo: Seus gritos provocam queimaduras sônicas, adicionando +3d6 de dano contínuo por 1d4 rodadas.'
},
'Dragão-leviatã' : {
    title: 'O Soberano Vulcânico do Abismo',
    image: 'imagens/dinos_dragão_marinho.jpg', // Substitua pelo caminho correto
    weight: '15 toneladas',
    height: '10 M',
    length: '30 M',
    attributes: { agi: 3, for: 5, int: 3, pre: 5, vig: 5 },
    life: 450, // Escalável por nível ou estágio
    armor: 400, // Base de armadura devido à sua couraça de ferro
    actionBonus: '+15 mordida, +15 mãos, +10 bolas de fogo, +10 intimidação, +10 resistência, +10 furtividade aquática',
    attacks: [
        'Mordida Devastadora: 6d20+50 (ignora 100% de pontos de armadura e causa +1d20 de dano em alvos com armadura.)',
        'Mãos Poderosas: 5d10+20 (desarma ou derruba o alvo com um teste de força contra dificuldade em teste de força)',
        'Bolas de Fogo Submersas:  3d12+20 6x(dano em área de 5 metros, causando +1d10 de queimaduras em rodadas subsequentes por 1d4 rodadas).'
    ],
    abilities: [
        'Grito Intimidador: Todas as criaturas em um raio de 20 metros recebem -10 em ações ofensivas e defensivas por 1d6 rodadas (resistência contra dificuldade força).',
        'Resistência Vulcânica: Reduz todo dano de fogo recebido em 100% e ignora condições ambientais relacionadas ao calor extremo.'
    ],
    passiva: 'Aura Intimidadora: Todas as criaturas menores que o Dragão Marinho sofrem desvantagem em testes de intimidação ou resistência contra seus ataques.',
    passivaElemental: 'Fogo: Seus ataques de fogo submersos causam +1d8 de dano contínuo em áreas afetadas. Água: Ganha regeneração de 10% da vida máxima por rodada em ambientes aquáticos profundos. Sombras: Se torna indetectável em águas escuras, ganhando vantagem em ataques surpresa.'
},
'fantasma-leviatã': {
    title: 'O Guardião Espectral dos Abismos',
    image: 'imagens/dinos_fantasma_leviatã.jpg', // Substitua pelo caminho correto
    weight: '20 toneladas',
    height: '8 M',
    length: '42 M',
    attributes: { agi: 2, for: 5, int: 4, pre: 6, vig: 3 },
    life: 600, // Escalável por nível ou estágio
    armor: 350, // Base de armadura devido à sua resistência espectral
    actionBonus: '+20 mordida fantasma, +15 anéis espectrais, +15 esmagamento, +15 espasmos mentais, +15 furtividade aquática',
    attacks: [
        'Mordida Fantasma: 9d12+30 (causa dano psíquico e ignora imunidade mágica por 1d4 turnos).',
        'Anéis Espectrais: 3d10+40 (em área de 4 metros, reduz visão de cores com teste de resistência Constituição contra teste de vigor).',
        'Esmagamento Corporal: 10d10+25 (paralisa inimigos atingidos por 1 turno com teste de resistência Força).'
    ],
    abilities: [
        'Emoções Dobras: Emite um pulso emocional que força criaturas em um raio de 10 metros a fazerem teste de resistência Carisma (vigor (resis)). Falha resulta em pânico ou luto profundo por 1d6 rodadas.',
        'Espasmos Mentais: Altera o estado mental de inimigos que olham diretamente para ele, causando cegueira ou confusão por 1d4 turnos (teste de resistência Sabedoria contra.).'
    ],
    passiva: 'Intocável Sob a Água: Sob a água, ignora 50% dos ataques físicos devido à sua natureza etérea.',
    passivaElemental: 'Água: Regenera 5% da vida máxima por rodada em águas profundas. Sombras: Ganha vantagem em ataques furtivos e reduz chance de ser detectado. Psíquico: Todos os ataques causam +1d8 de dano psíquico adicional.'
},
'Sombra-leviatã': {
    title: 'O Predador Sombrio das Profundezas',
    image: 'imagens/dinos_shadow_leviatã.jpg', // Substitua pelo caminho correto
    weight: '30 toneladas',
    height: '12 M',
    length: '25 M',
    attributes: { agi: 5, for: 4, int: 3, pre: 4, vig: 4 },
    life: 450, // Escalável por nível ou estágio
    armor: 250, // Base de armadura devido à sua agilidade e camuflagem natural
    actionBonus: '+15 garras sombrias, +10 mordida corrosiva, +10 camuflagem, +12 alucinações plasmáticas, +8 furtividade',
    attacks: [
        'Garras Sombrias: 2d12+25 4x(ignora 50% da armadura e causa +1d8 de dano contínuo em rodadas subsequentes por 1d4 rodadas).',
        'Mordida Corrosiva: 6d12+20 (testes de resistência Constituição. Falha causa -2 em força por 1d6 rodadas).',
        'Espasmo Estomacal: 10d10+15 (engole parcialmente o alvo, causando 1d10 de dano interno e vomita plasma corrosivo ao redor, atingindo área de 5m).'
    ],
    abilities: [
        'Alucinações Plasmáticas: Inimigos que entram em contato com o plasma de sua boca devem realizar um teste de resistência Sabedoria. Falha causa alucinações severas por 1d4 rodadas, tornando-os incapazes de distinguir aliados de inimigos.',
        'Camuflagem Sombria: Ganha vantagem em furtividade +10 e ataques surpresa em águas escuras ou em áreas sombreadas.'
    ],
    passiva: 'Estômago Regenerativo: Assim como uma estrela do mar, ele regenera 10% de sua vida máxima por rodada enquanto devora presas vivas.',
    passivaElemental: 'Sombras: Em águas escuras, torna-se quase invisível e ganha +10 em camuflagem. Psíquico: Todos os alvos sob alucinações sofrem dano adicional de +1d6 psíquico por rodada. Água: Recupera vigor ao consumir plasma do ambiente (restaura 5% de vigor por rodada).'
},
'Chelicerate': {
    title: 'O Terror Quitinoso das Águas Quentes',
    image: 'imagens/dinos_chelicerate.jpg', // Substitua pelo caminho correto
    weight: '40 toneladas',
    height: '5 M',
    length: '22 M',
    attributes: { agi: 4, for: 5, int: 2, pre: 4, vig: 5 },
    life: 450, // Escalável por nível ou estágio
    armor: 350, // Base de armadura devido à sua carapaça de quitina
    actionBonus: '+15 garras cortantes, +15 mordida superaquecida, +10 resistência quitinosa, +10 investida aquática, +10 mordida, +5 ações de agilidade/percepção.',
    attacks: [
        'Garras Cortantes: 3d10+25 4x(ignora 20% da armadura do alvo e causa 5d10 de dano em ambientes quentes).',
        'Mordida Superaquecida: 10d12+25 (ao aquecer a mandíbula em áreas vulcânicas, causa +4d10 de dano por queimadura em rodadas subsequentes por 1d4 rodadas).',
        'Investida Aquática: 7d10+20 (atinge alvos em linha reta até 15m, derrubando ou afastando-os 5m com teste de resistência Força).'
    ],
    abilities: [
        'Mandíbulas de Lava: Em ambientes quentes ou vulcânicos, seus ataques ganham +2d8 de dano adicional e ignoram 50% da resistência a fogo.',
        'Resistência Quitinosa: Reduz todo dano físico recebido em 25% devido à sua carapaça natural extremamente resistente.'
    ],
    passiva: 'Adaptabilidade Térmica: Recebe +10 em agilidade e furtividade em ambientes quentes ou vulcânicos.',
    passivaElemental: 'Fogo: Ganha imunidade a queimaduras e condições relacionadas a calor extremo. Água: Recupera 5% da vida máxima por rodada em áreas aquáticas profundas. Lava: Ganha +10 em força ao permanecer em áreas próximas a lava ativa por mais de 2 rodadas.',
},
'Imperador': {
    title: 'O Soberano dos Oceanos',
    image: 'imagens/dinos_imperadores.jpg', // Substitua pelo caminho correto
    weight: '70 toneladas',
    height: '15 M',
    length: '50 M',
    attributes: { agi: 4, for: 5, int: 7, pre: 6, vig: 5 },
    life: 650, // Escalável por nível ou estágio
    armor: 400, // Base de armadura devido à sua pele resistente e massiva
    actionBonus: '+10 golpes de nadadeira, +15 controle mental, +12 comunicação esporádica, +8 manipulação de ambiente',
    attacks: [
        'Golpe de Nadadeira: 6d12+30 2x(derruba inimigos e causa +5d8 de dano de concussão).',
        'Investida Colossal: 10d10+25 (atinge todos em uma linha de até 10m, empurrando-os 5m e reduzindo sua armadura em 100% por 1d4 rodadas).',
        'Explosão de Esporos: 8d12+20 (em área de 10m, causa confusão mental por 1d6 rodadas com teste de resistência Sabedoria contra DC 18).'
    ],
    abilities: [
        'Controle Mental: O Imperador pode se conectar mentalmente com criaturas em um raio de 15m. Teste de resistência Sabedoria. Falha: O alvo obedece ao Imperador por 1d4 rodadas.',
        'Comunicação Esporádica: Libera esporos na água, permitindo-lhe transmitir mensagens telepáticas para qualquer criatura em um raio de 30m, independente da linguagem.'
    ],
    passiva: 'Inteligência Superior: Sempre tem vantagem em testes de resistência mental e pode prever movimentos inimigos, reduzindo o dano recebido de ataques direcionados em 90%.',
    passivaElemental: 'Água: Recupera 10% da vida máxima por rodada em águas profundas. Psíquico: Seus ataques de controle mental causam +1d8 de dano psíquico contínuo. Natureza: Pode manipular plantas aquáticas ao seu redor, dificultando movimentação inimiga (-10 de agilidade em área de 5m).',
},

'Leviatã-Coral': {
    title: 'O Guardião dos Recifes Vivos',
    image: 'imagens/dinos_recife_de_coral.jpg', // Substitua pelo caminho correto
    weight: '120 toneladas',
    height: '18 M',
    length: '60 M',
    attributes: { agi: 3, for: 6, int: 5, pre: 5, vig: 7 },
    life: 800, // Escalável por nível ou estágio
    armor: 500, // Base de armadura devido ao casco extremamente resistente e coberto de flora adaptativa
    actionBonus: '+10 golpes de cauda, +12 investida de casco, +15 bônus em ações aliadas (ecos), +8 resistência natural',
    attacks: [
        'Golpe de Cauda: 10d10+35 (em área de 5m, derruba inimigos e causa dano de concussão).',
        'Investida de Casco: 10d12+30 (ataca em linha de até 10m, reduzindo em 15% a armadura dos alvos por 1d4 rodadas).',
        'Explosão de Coral: 10d12+25 (em área de 8m, estilhaços de coral causam dano perfurante e reduzem a agilidade dos inimigos em -10 por 1d4 rodadas).'
    ],
    abilities: [
        'Ecos de Harmonia: O Leviatã-Coral emite ecos que aumentam as capacidades de aliados em um raio de 15m. Bônus de +10 em todas as ações durante 1d6 rodadas.',
        'Flora Adaptativa: As plantas que crescem no casco do Leviatã podem alterar-se para curar aliados próximos. Cura 3d10 de vida a todos em um raio de 10m uma vez a cada 3 turnos.'
    ],
    passiva: 'Casco Biodiverso: O casco coberto por flora concede imunidade a venenos e doenças, além de absorver 10% do dano mágico recebido.',
    passivaElemental: 'Água: Regenera 5% da vida máxima por rodada em ambientes aquáticos. Natureza: Flora adaptativa concede +1d8 de cura adicional ao usar habilidades regenerativas. Harmonia: Todos os aliados próximos recebem +5 em resistência a ataques mentais e físicos enquanto estiverem dentro do alcance dos ecos.',
},

'Embermane': {
    title: 'O Flamejante da Fúria',
    image: 'imagens/dinos_embermane.jpg', // Substitua pelo caminho correto
    weight: '800 kg',
    height: '2.5 M',
    length: '3.5 M',
    attributes: { agi: 4, for: 5, int: 3, pre: 4, vig: 4 },
    life: 230, // Escalável por nível ou estágio
    armor: 100, // Base de armadura devido à sua resistência natural e chamas defensivas
    actionBonus: '+12 ataques de pata, +15 chifre flamejante, +10 impulso flamejante, +10 resistência contra efeitos de controle',
    attacks: [
        'Garras Flamejantes: 4d10+20 2x(causa +6d8 de dano de fogo contínuo em rodadas subsequentes por 1d4 rodadas).',
        'Chifre Flamejante: 7d12+25 (atinge o alvo e causa o efeito **quebrado**, reduzindo a armadura em 20% por 1d4 rodadas).',
        'Impulso Flamejante: 4d10+35 (em linha reta de até 8m, amplificado se usado logo após um movimento de carga, causando +1d10 de dano adicional).'
    ],
    abilities: [
        'Ira Crescente: Para cada 40% de vida perdida, ganha +1 em força e agilidade. Ao atingir 50% de vida ou menos, entra em estado de fúria, ignorando controles mentais por 1d6 rodadas.',
        'Predador Incansável: Após derrubar um inimigo ao chão, ganha +10 em mobilidade e +2d10 de dano em ataques no próximo turno.'
    ],
    passiva: 'Chamas da Ferocidade: Sua ferocidade escala ao receber dano. Cada golpe sofrido aumenta o bônus de dano de fogo em +3d6 por rodada até o máximo de +9d6.',
    passivaElemental: 'Fogo: Seus ataques causam queimaduras adicionais de +1d8. Terra: Após cair abaixo de 30% de vida, ganha 50% de resistência a todos os ataques físicos. Ferocidade: Regenera 5% de vida por rodada enquanto estiver no estado de fúria.',
},

'Stormclaw': {
    title: 'A Cria da Tempestade',
    image: 'imagens/dinos_stormclaw.webp', // Substitua pelo caminho correto
    weight: '900 kg',
    height: '3 M',
    length: '3.7 M',
    attributes: { agi: 6, for: 5, int: 4, pre: 5, vig: 4 },
    life: 300, // Escalável por nível ou estágio
    armor: 130, // Base de armadura devido à sua resistência natural e carga elétrica defensiva
    actionBonus: '+12 ataques de garra, +15 chifre elétrico, +10 pulso de choque, +10 resistência contra efeitos de paralisia',
    attacks: [
        'Garras Eletrocutantes: 4d10+20 2x(causa +8d8 de dano elétrico contínuo em rodadas subsequentes por 1d4 rodadas).',
        'Chifre de Raio: 8d12+25 (atinge o alvo e causa o efeito **debilitado**, reduzindo a agilidade em -10 por 1d4 rodadas).',
        'Pulso de Choque: 4d10+35 (em área de 5m, todos os inimigos devem fazer teste de resistência Constituição. Falha causa paralisia por 1 rodada e +4d8 de dano elétrico adicional).'
    ],
    abilities: [
        'Carga Crescente: Para cada 10% de vida perdida, ganha +2d6 de dano elétrico adicional em ataques. Quando abaixo de 50% de vida, libera uma descarga elétrica em área de 5m ao receber golpes, causando 8d8 de dano elétrico em todos ao redor.',
        'Predador Estático: Após derrubar um inimigo ao chão, ganha +10 em mobilidade e +3d10 de dano elétrico contínuo em ataques no próximo turno.'
    ],
    passiva: 'Descarga da Tempestade: Seus ataques têm 50% de chance de causar paralisia por 1 rodada, aumentando a vulnerabilidade do inimigo ao dano elétrico em +3d6.',
    passivaElemental: 'Eletricidade: Todos os ataques causam +1d8 de dano elétrico contínuo. Tempestade: Ao lutar em ambientes chuvosos ou tempestuosos, ganha +10 em agilidade e regenera 5% da vida máxima por rodada.',
},
'Drask': {
    title: 'O Crocodilo Elétrico',
    image: 'imagens/dinos_drask.jpg', // Substitua pelo caminho correto
    weight: '6 toneladas',
    height: '4.5 M',
    length: '6 M',
    attributes: { agi: 3, for: 5, int: 4, pre: 5, vig: 6 },
    life: 380, // Escalável por nível ou estágio
    armor: 180, // Bloqueio muito alto devido à sua pele resistente e capacidade de absorver choques
    actionBonus: '+20 ataques de garra elétrica, +15 mordida elétrica, +25 contra-ataque de descarga, +20 resistência contra paralisia e efeitos elétricos',
    attacks: [
        'Garras Elétricas: 4d10+25 2x (causa +6d8 de dano elétrico contínuo em rodadas subsequentes por 1d4 rodadas).',
        'Mordida Elétrica: 8d12+35 (causa dano elétrico adicional de +4d8 e efeito **paralisia** por 1 rodada se o alvo falhar no teste de resistência).',
        'Grito Elétrico: 4d10+20 (em área de 6m, todos os inimigos devem fazer um teste de resistência Constituição. Falha causa atordoamento por 1 rodada e +5d8 de dano elétrico adicional).'
    ],
    abilities: [
        'Acúmulo de Energia: Acumula energia elétrica por cada ataque que recebe. Ao atingir 3 pontos de energia, a próxima ação de contra-ataque de Drask libera uma descarga elétrica em área de 5m, causando 8d10 de dano elétrico a todos os inimigos próximos.',
        'Contra-ataque Elétrico: Ao ser atacado fisicamente, Drask libera uma descarga elétrica em quem o atingiu, causando 5d10+20 de dano elétrico e causando paralisia por 1 rodada se o alvo falhar no teste de resistência.',
    ],
    passiva: 'Bloqueio de Energia: Drask possui 50% de chance de bloquear ataques físicos, gerando uma explosão elétrica ao ser atacado. O bloqueio causa 4d8 de dano elétrico a quem atacou.',
    passivaElemental: 'Condutividade: Seus ataques causam +2d8 de dano elétrico contínuo. Tempestade: Em ambientes chuvosos ou com alta umidade, Drask aumenta sua armadura em +20 e regenera 5% de sua vida máxima por rodada.',
},
'Koshai': {
    title: 'O Tigre de Chifres',
    image: 'imagens/dinos_koshai.jpg', // Substitua pelo caminho correto
    weight: '750 kg',
    height: '3.2 M',
    length: '4.5 M',
    attributes: { agi: 6, for: 5, int: 6, pre: 4, vig: 6 },
    life: 350, // Escalável por nível ou estágio
    armor: 140, // Resistência natural devido à sua pelagem espessa e habilidades de controle da flora
    actionBonus: '+15 ataques de garra, +10 ataque com bico, +20 resistência contra efeitos de controle mental ou veneno, +10 em testes de furtividade',
    attacks: [
        'Garras Cortantes: 4d10+20 2x(causa dano adicional de +3d8 de dano perfurante e pode enraizar o alvo no solo, dificultando sua movimentação por 1 rodada).',
        'Bico Espiral: 3d12+25 (causa dano físico e um efeito de **cegueira** temporária por 1 rodada se o alvo falhar no teste de resistência).',
        'Cabeçada Selvagem: 8d10+35 (causa um efeito de **atordoamento** por 1 rodada e empurra o alvo para trás em 2 metros).'
    ],
    abilities: [
        'Aceleração Floral: Koshai pode acelerar o crescimento de plantas ao seu redor, criando uma parede de raízes ou arbustos ao longo de 6 metros. Essa parede dura 2 rodadas e pode bloquear ataques ou dificultar a movimentação inimiga.',
        'Raízes Afiadas: Usando suas habilidades florais, Koshai pode criar raízes afiadas que saem do solo para prender inimigos ou atacar, causando 8d8 de dano e imobilizando o alvo por 1 rodada.',
    ],
    passiva: 'Tigre Cervo: Koshai tem a habilidade de regenerar 10% de sua vida máxima ao se esconder em áreas com vegetação densa, como florestas ou campos com plantas altas.',
    passivaElemental: 'Flora Viva: Seus ataques com raízes ou plantas causam um dano adicional de +2d8 ao longo de 2 rodadas, e Koshai pode cavar rapidamente para se esconder e surpreender os inimigos com um teste de furtividade bem-sucedido.',
},
'Riftstalkear': {
    title: 'O Tigre Sombrio',
    image: 'imagens/dinos_riftstalkear.jpg', // Substitua pelo caminho correto
    weight: '450 kg',
    height: '3 M',
    length: '4 M',
    attributes: { agi: 4, for: 3, int: 5, pre: 6, vig: 5 },
    life: 280, // Escalável por nível ou estágio
    armor: 120, // Pele sombria e etérea que reduz danos físicos e mágicos
    actionBonus: '+20 ataques de garra, +15 cauda sombria, +20 bônus de furtividade, +10 percepção em testes de localização',
    attacks: [
        'Garras Sombras: 4d10+25 2x(causa +8d6 de dano de sombras, afetando a visão e o movimento do alvo, com 50% de chance de causar cegueira temporária por 1 rodada).',
        'Cauda de Aether: 10d8+20 (causa dano e atordoa o alvo, também cria uma área de sombra de 3 metros ao redor do alvo, dificultando a visão e as movimentações para inimigos por 1 rodada).',
        'Ataque Sombrio: 6d12+25 (Riftstalker teleportando-se para atacar o inimigo de surpresa com um portal de Aether, causando dano de sombras e deixando o alvo vulnerável por 1 rodada).'
    ],
    abilities: [
        'Teleporte Aéreo: Riftstalker pode criar portais de Aether para teletransportar-se por até 10 metros em qualquer direção. Após cada teleporte, ele ganha +10 em furtividade e +5d6 de dano extra em seu próximo ataque.',
        'Sombra Dominante: Riftstalker pode controlar as sombras ao seu redor para se esconder ou atacar. Ele pode invocar uma sombra para distrair inimigos, ganhando um bônus de +15 em furtividade e criando uma zona de neblina que obscurece a visão dos inimigos dentro de 5 metros.',
    ],
    passiva: 'Ecolocalização Sombria: Riftstalker pode localizar inimigos ou objetos em um raio de 30 metros, mesmo se estiver escondido ou em total escuridão, usando ecolocalização baseada nas ondas sonoras e nas vibrações no ambiente.',
    passivaElemental: 'Portais de Aether: Ao usar seus portais, Riftstalker ganha +20 em agilidade e pode reagir com +4d8 de dano sombrios adicionais em ataques contra inimigos dentro de seu portal, tornando-os vulneráveis a ataques subsequentes.',
},
'Gnasher': {
    title: 'O Castor Gigante',
    image: 'imagens/dinos_gnasher.jpg', // Substitua pelo caminho correto
    weight: '1000 kg',
    height: '3 M',
    length: '4 M',
    attributes: { agi: 3, for: 4, int: 4, pre: 4, vig: 5 },
    life: 350, // Escalável por nível ou estágio
    armor: 160, // Alta resistência devido à sua armadura natural e habilidades de bloqueio
    actionBonus: '+15 ataques com dentes de castor, +20 ataque com cauda espinhosa, +10 em testes de esquiva e bloqueio, +15 em testes de percepção e intimidação',
    attacks: [
        'Dentes Cortantes: 7d10+25 (causa dano adicional de +3d6 a inimigos derrubados, além de cortar madeira ou obstáculos com facilidade).',
        'Cauda Espinhosa: 4d8+20 3x(causa dano e cria um abalo sísmico de 5 metros ao redor de Gnasher, derrubando inimigos e causando 10d6 de dano físico a todos dentro da área).',
        'Encontro da Ira: 6d12+30 (Gnasher usa a força acumulada da sua armadura para gerar uma onda de choque contra os inimigos próximos, causando dano em área e desestabilizando os inimigos com um efeito de **desorientação** por 1 rodada).'
    ],
    abilities: [
        'Acúmulo de Dano: Gnasher pode absorver dano físico e transformá-lo em poder ofensivo. Para cada 10% de sua vida perdida, ele acumula +2d6 de dano adicional para seu próximo ataque.',
        'Bloqueio Imbatível: Quando Gnasher se prepara para um ataque físico, ele pode bloquear com a cauda ou com seu corpo, reduzindo o dano recebido em 50% e causando um contra-ataque imediato de 2d10 de dano físico.',
    ],
    passiva: 'Percepção de Terreno: Gnasher é altamente sensível ao ambiente ao seu redor. Ele pode detectar movimentos no solo ou mudanças no terreno a até 20 metros de distância, recebendo +10 em testes de percepção para rastrear inimigos ou identificar armadilhas.',
    passivaElemental: 'Esquiva Selvagem: Sua habilidade de movimentação e adaptação ao terreno aumenta sua agilidade, permitindo esquivar-se de ataques com 20% mais eficácia. Além disso, Gnasher pode se mover rapidamente em ambientes aquáticos ou terrenos de lama, mantendo sua agilidade.',
},
'Pangar': {
    title: 'O Colosso Gelado',
    image: 'imagens/dinos_pangar.jpg', // Substitua pelo caminho correto
    weight: '8000 kg',
    height: '16 M',
    length: '19 M',
    attributes: { agi: 4, for: 7, int: 6, pre: 5, vig: 6 },
    life: 1000, // Escalável por nível ou estágio
    armor: 500, // Sua pele congelada e endurecida proporciona uma defesa imensa
    actionBonus: '+25 ataques com garras, +30 mordida, +20 contra-ataque gelado, +20 em testes de percepção e intimidação, +10 em esquiva e +20 bloqueio',
    attacks: [
        'Mordida Congelante: 10d12+40 (causa dano adicional de +4d6 de gelo e reduz a velocidade do alvo em 50% por 1d4 rodadas).',
        'Garras de Gelo: 5d10+30 2x(causa dano adicional de +3d6 de dano gélido contínuo e pode causar **congelamento** no alvo por 1 rodada se falhar no teste de resistência).',
        'Pisada Gelada: 5d12+35 (Pangar bate o chão com seu enorme peso, criando uma onda de gelo e causando 10d6 de dano em área de 5 metros. Inimigos na área devem fazer um teste de resistência ou ficarão **congelados** por 1 rodada).'
    ],
    abilities: [
        'Hálito Gélido: Pangar pode liberar um sopro gélido em cone de 10 metros, causando 4d12 de dano gélido em todos os inimigos na área. Inimigos falharem no teste de resistência ficam **congelados** por 2 rodadas.',
        'Abalos de Gelo: Pangar pode criar pedaços de gelo em qualquer área ao seu redor, causando abalos sísmicos ao bater o chão. Isso cria estalactites de gelo ou projéteis que podem ser disparados, causando 3d10 de dano gélido e derrubando inimigos dentro de 5 metros.',
    ],
    passiva: 'Pele Congelada: Pangar pode endurecer sua pele com sua energia gelada. Quando ele usa a habilidade de **contra-ataque**, ele causa 8d8 de dano gélido adicional, além de aumentar sua resistência a ataques físicos em +30%.',
    passivaElemental: 'Controle do Gelo: Todos os ataques de Pangar têm um efeito adicional de **congelamento**, causando dano gélido contínuo de +2d8 ao longo de 2 rodadas. Além disso, Pangar ganha +20 em esquiva ao se mover em terrenos congelados ou gelados.',
},
'Hellion': {
    title: 'O Colosso Flamejante',
    image: 'imagens/dinos_hellion.jpg', // Substitua pelo caminho correto
    weight: '8000 kg',
    height: '16 M',
    length: '19 M',
    attributes: { agi: 4, for: 7, int: 6, pre: 5, vig: 6 },
    life: 1000, // Escalável por nível ou estágio
    armor: 500, // Sua pele reforçada e resistente ao calor proporciona uma defesa imensa
    actionBonus: '+25 ataques com garras, +30 mordida flamejante, +20 contra-ataque ígneo, +20 em testes de percepção e intimidação, +10 em esquiva e +20 bloqueio',
    attacks: [
        'Mordida Flamejante: 9d12+40 (causa dano adicional de +4d6 de fogo e aumenta a temperatura do alvo, causando queimaduras que reduzem a agilidade em 25% por 1d4 rodadas).',
        'Garras Incandescentes: 5d10+30 (causa dano adicional de +3d6 de dano de fogo contínuo e pode causar **queimaduras** no alvo por 1 rodada, com dano adicional de +2d6 de fogo).',
        'Pisada Ígnea: 5d12+35 (Hellion bate o chão com seu enorme peso, criando uma onda de lava e causando 6d6 de dano em área de 5 metros. Inimigos na área devem fazer um teste de resistência ou sofrerão **queimaduras** que causam 2d6 de dano por rodada durante 2 rodadas).'
    ],
    abilities: [
        'Sopro Ígneo: Hellion pode liberar um sopro de fogo em cone de 10 metros, causando 8d12 de dano ígneo em todos os inimigos na área. Inimigos falharem no teste de resistência ficam **queimados** por 2 rodadas, com dano contínuo de 3d6 de fogo por rodada.',
        'Erupções Vulcânicas: Hellion pode criar erupções de lava ao seu redor, causando explosões de fogo em áreas de 5 metros e causando 3d10 de dano ígneo. Ele pode manipular o terreno, fazendo a lava surgir em qualquer lugar ao redor de sua posição, atingindo inimigos e causando queimaduras.',
    ],
    passiva: 'Pele Derretida: A alta temperatura do corpo de Hellion torna sua pele difícil de tocar. Quando ele usa a habilidade de **contra-ataque**, ele causa 4d8 de dano ígneo adicional, além de reduzir em 30% o dano recebido de ataques físicos.',
    passivaElemental: 'Controle do Fogo: Todos os ataques de Hellion têm um efeito adicional de **queimadura**, causando dano de fogo contínuo de +2d8 ao longo de 2 rodadas. Hellion também recebe +20 em esquiva ao estar em terrenos quentes ou de lava.',
},
'Nayzaga': {
    title: 'O Crocodilo Elétrico',
    image: 'imagens/dinos_nayzaga.jpg', // Substitua pelo caminho correto
    weight: '1200 kg',
    height: '4 M',
    length: '6 M',
    attributes: { agi: 3, for: 5, int: 3, pre: 4, vig: 5 },
    life: 350, // Escalável por nível ou estágio
    armor: 150, // A resistência natural e a carga elétrica proporcionam uma defesa considerável
    actionBonus: '+20 ataques com mordida elétrica, +15 ataques com garras afiadas, +20 espinhos elétricos, +10 bônus de esquiva, +15 bônus em ações relacionadas a voltagem',
    attacks: [
        'Mordida Elétrica: 6d10+30 (causa dano elétrico adicional de +4d6 e tem 50% de chance de paralisar o alvo por 1 rodada).',
        'Garras Afiadas: 8d8+25 2x(causa dano de corte e elétrico contínuo, com chance de aumentar o dano em +6d6 se o alvo estiver paralisado).',
        'Espinho Elétrico: 3d12+20 4x(lança um espinho elétrico em linha reta, causando dano em área de 5 metros, atingindo todos no caminho. Gasta 5% da voltagem acumulada e causa 6d6 de dano elétrico).'
    ],
    abilities: [
        'Acúmulo de Voltagem: Nayzaga pode acumular energia elétrica de suas ações e proximidade com cristais ou elementos condutores. A cada 5% da sua vida acumulada em voltagem, ele ganha +2 em agilidade ou força para o próximo turno, podendo acumular até 20% da sua vida. Cada volta de voltagem aumenta a eficiência de suas habilidades elétricas.',
        'Reação de Ferro: Ao receber dano de ataques que envolvem ferro (armas, armaduras ou objetos metálicos), Nayzaga estabiliza sua voltagem, restaurando 10% de sua vida e recebendo +10 em resistência elétrica por 2 rodadas.',
    ],
    passiva: 'Energia Condutora: Qualquer ação realizada perto de cristais ou fontes elétricas aumenta a voltagem de Nayzaga. Se ele estiver perto de uma fonte de energia elétrica (como cristais de voltagem ou tempestades), ele acumula voltagem 20% mais rápido.',
    passivaElemental: 'Imunidade Elétrica: Nayzaga é completamente imune a ataques elétricos, além de causar +1d8 de dano elétrico adicional sempre que ele atacar com habilidades baseadas em eletricidade. Ele também recebe +15 em esquiva quando está em contato com fontes de voltagem.',
},
'Valomyr': {
    title: 'O Rinoceronte Arcanjo',
    image: 'imagens/dinos_valomyr.jpg', // Substitua pelo caminho correto
    weight: '7000 kg',
    height: '6 M',
    length: '8 M',
    attributes: { agi: 2, for: 3, int: 4, pre: 3, vig: 6 },
    life: 550, // Escalável por nível ou estágio
    armor: 180, // Sua carapaça encantada oferece resistência física e mágica considerável
    actionBonus: '+20 chifre arcano, +25 debuffs de rasgos, +15 buffs mágicos, +15 em bloqueio e resistência mágica',
    attacks: [
        'Chifre Arcano: 6d12+35 (causa dano mágico adicional de +4d8, com 50% de chance de aplicar **desorientação mágica** no alvo, reduzindo inteligência e precisão em -10 por 1d4 rodadas).',
        'Pata Arcana: 5d10+30 (causa dano físico misturado com energia mágica. Se atingir inimigos com buffs ativos, remove um buff aleatório e causa dano extra de +2d8).',
        'Rasgo no Véu: 4d12+20 (Valomyr cria um rasgo arcano em uma área de 5 metros. Todos os inimigos dentro da área recebem debuffs aleatórios por 2 rodadas, como redução de força (-5) ou agilidade (-10), além de sofrerem dano de 3d8 mágico).'
    ],
    abilities: [
        'Bolha de Poder Arcano: Valomyr invoca uma bolha protetora que reduz todo o dano recebido em 50% por 3 rodadas e gera +10 de resistência mágica e física para aliados próximos (em até 10 metros). A bolha pode ser destruída se receber mais de 100 de dano em um único golpe.',
        'Fúria do Arcanjo: Valomyr pode usar seu poder arcano acumulado para liberar uma explosão em área de 10 metros, causando 6d10 de dano mágico. Ele ganha +10 em força por 2 rodadas após a explosão. Pode ser ativado uma vez por combate.',
    ],
    passiva: 'Presença Mística: Todas as ações realizadas por Valomyr dentro de sua bolha de poder recebem um bônus de +2d8 de dano mágico e causam **lentidão** nos inimigos em até 5 metros, reduzindo sua velocidade em 50%.',
    passivaElemental: 'Energia Arcana: Todos os ataques de Valomyr têm um efeito mágico adicional que causa +1d8 de dano contínuo em energia arcana por 2 rodadas. Ele também ganha +10 em bloqueio ao estar dentro de áreas afetadas por magia ativa.',
},
'Shrike': {
    title: 'A Fúria Alada',
    image: 'imagens/dinos_shrike.jpg', // Substitua pelo caminho correto
    weight: '2000 kg',
    height: '3.5 M',
    length: '4.5 M',
    attributes: { agi: 3, for: 4, int: 5, pre: 4, vig: 4 },
    life: 450, // Escalável por nível ou estágio
    armor: 170, // Resistente devido ao corpo robusto e penas densas
    actionBonus: '+20 ataques de soco, +25 ataques de bico, +15 encontrões, +10 em bloqueio, +15 em esquiva enquanto plana +10 arremesso',
    attacks: [
        'Soco Devastador: 5d10+30 (Shrike golpeia com suas patas enormes, causando dano adicional de +3d8 e empurrando o alvo 3 metros para trás. Se atingir um obstáculo, causa +2d6 de dano adicional).',
        'Bicada Implacável: 4d8+25 (Shrike usa seu bico poderoso para causar dano perfurante. Tem 50% de chance de imobilizar o alvo por 1 rodada).',
        'Encontrão Brutal: 5d12+40 (Shrike investe contra um inimigo, causando dano e o arremessando em linha reta. Inimigos atingidos pelo alvo arremessado sofrem 3d10 de dano por impacto).'
    ],
    abilities: [
        'Arremesso Dominante: Shrike pode agarrar um inimigo de tamanho menor ou igual a ele e arremessá-lo em outro alvo em até 10 metros. Ambos os alvos sofrem 4d10 de dano de impacto. Gasta uma ação bônus.',
        'Ódio Crescente: A cada golpe recebido, Shrike acumula **ódio** (5% por golpe). Quando atinge 50% de ódio, pode ativar esta habilidade para ganhar +10 em força e 100 de vida temporária por 3 rodadas. Enquanto ativo, todos os ataques causam +2d8 de dano adicional.',
    ],
    passiva: 'Voo Imponente: Enquanto Shrike estiver planando, ele ganha +15 em esquiva e pode se mover livremente pelo campo de batalha, ignorando terrenos difíceis. Se descer de uma altura maior que 5 metros para atacar, o dano do ataque é aumentado em +3d6.',
    passivaElemental: 'Fúria Incontrolável: Quando Shrike ativa sua habilidade de **ódio**, ele regenera 5% de sua vida máxima por rodada enquanto o efeito estiver ativo. Seu corpo robusto e enraivecido reduz todo o dano recebido em 20%.',
},
'Skullcrawler': {
    title: 'O Lagarto Endiabrado',
    image: 'imagens/dinos_skullcralerw.jpg', // Substitua pelo caminho correto
    weight: '2500 kg',
    height: '5.5 M',
    length: '8 M',
    attributes: { agi: 4, for: 4, int: 4, pre: 5, vig: 5 },
    life: 400, // Escalável por nível ou estágio
    armor: 120, // Defesa razoável, com foco em esquiva e furtividade
    actionBonus: '+15 mordida, +20 garras, +15 língua puxão, +10 furtividade, +15 rastreamento e percepção, +10 esquiva e contra ataque',
    attacks: [
        'Mordida Sangrenta: 5d12+35 (além do dano físico, causa sangramento de 2d8 por 1d4 rodadas. Contra humanos, o sangramento é dobrado, e a vítima entra em **pânico**, sendo incapaz de realizar ações calmas ou estratégicas por 2 rodadas).',
        'Garras Sangrentas: 4d10+30 (causa dano físico e aplica sangramento de 3d6 por 1d4 rodadas. Pode agarrar o alvo, impedindo seu movimento até que escape com um teste de força ou agilidade).',
        'Língua Puxão: 3d12+20 (Skullcrawler estica sua língua para agarrar um inimigo em até 10 metros e puxá-lo para sua boca. O alvo precisa passar em um teste de força para evitar ser puxado. Se bem-sucedido, o próximo ataque da mordida tem vantagem).'
    ],
    abilities: [
        'Sinfonia de Adrenalina: Ao morder um humano, Skullcrawler desencadeia uma onda de adrenalina na vítima. Isso aumenta a frequência cardíaca e causa desespero, tornando impossível ações calmas por 2 rodadas e dobrando o dano de sangramento.',
        'Predador Subterrâneo: Skullcrawler pode cavar para se mover rapidamente pelo terreno, ignorando obstáculos. Ele pode emergir em até 15 metros, surpreendendo inimigos e causando 2d10 de dano adicional em ataques no mesmo turno.',
    ],
    passiva: 'Caçador Implacável: Skullcrawler tem vantagem em testes de rastreamento e percepção. Ele ignora penalidades de terreno difícil enquanto rastreia ou caça, além de ser extremamente furtivo, recebendo +10 em ações de emboscada.',
    passivaElemental: 'Sangue Demoníaco: Todas as ações de Skullcrawler que causam sangramento ganham +1d8 de dano adicional. Ele regenera 5% de sua vida máxima por rodada enquanto estiver em combate contra inimigos com sangramento ativo.',
},
'Golias': {
    title: 'O Encouraçado',
    image: 'imagens/dinos_golias.jpg', // Substitua pelo caminho correto
    weight: '6500 kg',
    height: '7 M',
    length: '6.5 M',
    attributes: { agi: 4, for: 5, int: 5, pre: 3, vig: 5 },
    life: 600, // Escalável por nível ou estágio
    armor: 200, // Com seu couro indestrutível, Golias é imune a fogo e balas convencionais
    actionBonus: '+25 ataques de punho, +20 ombreada, +15 ataques de fogo, +15 rastreamento e percepção, +10 em furtividade e intimidação, +10 contra-ataque e bloqueio ',
    attacks: [
        'Punho Devastador: 6d12+40 2x(um golpe de força esmagadora. Se atingir, causa **fratura** em um membro do alvo, reduzindo a eficácia de ataques ou movimentação em 50% por 1d4 rodadas).',
        'Ombreada Destruidora: 5d10+35 (Golias investe com o ombro contra um alvo, causando dano físico e deslocando ossos. O alvo é empurrado 5 metros e fica **atordoado** por 1 rodada, a menos que passe em um teste de Constituição).',
        'Bafo de Fogo: 4d12+30 (Golias cospe um cone de fogo de 10 metros. Gasta energia e tem um cooldown de 2 rodadas. Todos na área sofrem dano de queimadura contínuo de +2d8 por 2 rodadas).'
    ],
    abilities: [
        'Quebra-Ossos: Golias é especializado em imobilizar e causar dano estrutural. Após imobilizar um alvo com punhos ou ombreada, seus próximos ataques têm +3d8 de dano adicional e 50% de chance de causar outra fratura.',
        'Mestre do Ambiente: Golias pode usar o ambiente a seu favor. Ele arremessa objetos, escala com facilidade e utiliza cobertura para se proteger ou surpreender. Ganha +10 em testes de escalada e arremesso.',
      
    ],
    passiva: 'Couraça Implacável: Golias é imune a dano de fogo e armas convencionais, além de reduzir todo dano físico em 25%.',
    passivaElemental: 'Fúria de Fogo: Quando Golias usa seu Bafo de Fogo, ele entra em um estado de **combustão controlada**, ganhando +10 em força e regenerando 5% de sua vida máxima por rodada por 2 rodadas.',
},
'Kraken': {
    title: 'O Polvo Diabólico',
    image: 'imagens/dinos_kraken.jpg', // Substitua pelo caminho correto
    weight: '4500 kg',
    height: '7 M',
    length: '5 M',
    attributes: { agi: 6, for: 3, int: 5, pre: 5, vig: 2 },
    life: 350, // Escalável por nível ou estágio
    armor: 80, // Pouca armadura devido à sua natureza frágil
    actionBonus: '+20 ataques de tentáculos, +18 mordida, +15 bolas de energia, +10 manipulação magnética, +15 em percepção e planejamento',
    attacks: [
        'Tentáculos Esmagadores: 4d12+25 (os tentáculos agarram o alvo, imobilizando-o. Caso o alvo esteja imobilizado, o próximo ataque tem dano dobrado).',
        'Mordida Mutante: 5d10+30 (mordida cheia de dentes serrilhados que causa sangramento de 2d6 por 2 rodadas e reduz a mobilidade do alvo em -10 enquanto durar o efeito).',
        'Bola de Energia: 6d8+20 4x(Kraken arremessa uma esfera de energia elétrica a até 15 metros, causando dano em área de 3 metros ao redor do impacto e reduzindo a agilidade dos atingidos em -5 por 1 rodada).'
    ],
    abilities: [
       
        'Atração Eletromagnética: Kraken pode atrair ou repelir objetos metálicos em até 20 metros, causando 10d8 de dano por impacto. Se usado contra criaturas em armaduras metálicas, os alvos são puxados e ficam vulneráveis (-10 em defesa) por 1 rodada.',
        'Descarga Celestial: Kraken concentra energia das nuvens e invoca um enorme raio em uma região de 5 metros. Todos os alvos na área devem fazer um teste de Constituição ou sofrer 8d12+40 de dano elétrico, além de paralisia por 1 rodada. Cooldown de 4 rodadas.',
    ],
    passiva: 'Condutor de Energia: Kraken absorve raios e energia elétrica no ambiente, regenerando 5% de sua vida máxima e ganhando +1d8 de dano adicional em todos os ataques elétricos enquanto estiver em combate próximo a tempestades ou fontes de energia. Absorção dura 2 rodadas.',
    passivaElemental: 'Manipulação Magnética: O Kraken ganha +10 de agilidade e ignora terreno difícil em áreas com grande presença de magnetita ou minerais. Seus ataques elétricos causam +2d8 de dano extra nessas regiões.',
},
'Espectro': {
    title: 'A Criatura Impossível',
    image: 'imagens/dinos_espectro.jpg', // Substitua pelo caminho correto
    weight: '800 kg',
    height: '5 M',
    length: '6 M',
    attributes: { agi: 6, for: 3, int: 6, pre: 5, vig: 2 },
    life: 320, // Escalável por nível ou estágio
    armor: 90, // Pouca armadura devido à sua fragilidade, compensada por sua inteligência e habilidades
    actionBonus: '+20 ataques de garra, +15 mordida regenerativa, +18 puxão de tentáculos, +15 camuflagem, +10 em criação de emboscadas, +15 em esquiva e contra ataque',
    attacks: [
        'Garras de Foice: 6d10+25 (ataque letal que causa **Adrenalina da Caveira**: alvos humanos atingidos entram em pânico, impossibilitando ações calmas e dobrando o dano de sangramento por 1d4 rodadas).',
        'Mordida Regenerativa: 5d8+20 (a mordida suga sangue, restaurando 10% da vida máxima do Espectro por rodada por 2 rodadas).',
        'Agarão de Tentáculos: 4d12+15 (puxa um alvo a até 10 metros diretamente para o Espectro. Caso o alvo falhe em um teste de Força, é imobilizado por 1 rodada).'
    ],
    abilities: [
        'Adrenalina de Plasma: Espectro pode gastar grande quantidade de energia para transformar matéria ao redor em plasma, triplicando o dano de seus ataques por 2 rodadas. Cooldown de 3 rodadas.',
        'Explosão do Clone: Espectro cria um clone ilusório que engana inimigos por 1 rodada. Ao explodir, o clone espalha pedaços de petróleo que inflamam com as faíscas da criatura, causando 8d10 de dano em área de 5 metros.',
      
    ],
    passiva: 'Inteligência Predatória: Espectro pode adaptar rapidamente suas estratégias, recebendo +10 em percepção e agilidade enquanto estiver camuflado ou analisando o inimigo. Sua capacidade de planejamento é inigualável.',
    passivaElemental: 'Plasma Instável: Espectro ganha +2d10 de dano adicional em ataques enquanto estiver agitado em combate. Após atingir 3 rodadas consecutivas de ataque, ativa automaticamente **Adrenalina de Plasma** sem custo adicional.',
},
'Górgona': {
    title: 'A Primeira Rainha Tecelã',
    image: 'imagens/dinos_górgona.jpg', // Substitua pelo caminho correto
    weight: '2800 kg',
    height: '6 M',
    length: '8 M (incluindo patas)',
    attributes: { agi: 6, for: 3, int: 5, pre: 5, vig: 2 },
    life: 340, // Escalável por nível ou estágio
    armor: 120, // Resistente, mas não impenetrável
    actionBonus: '+18 ataques de garras, +20 baforada ácida, +15 teias de imobilização, +10 percepção e rastreamento, +15 esquiva e furtividade',
    attacks: [
        'Garras Predadoras: 5d10+30 (se o ataque acertar, a Górgona pode agarrar o alvo, imobilizando-o por 1 rodada e ganhando +10 em agilidade para o próximo turno).',
        'Baforada Ácida: 6d12+25 (cobre uma área de 5 metros com ácido corrosivo que derrete armaduras e objetos. Inimigos sofrem dano contínuo de 3d6 por 2 rodadas).',
        'Teia Imobilizadora: 4d8+15 (arremessa uma teia pegajosa em até 10 metros, imobilizando o alvo por 2 rodadas. Caso o alvo falhe em um teste de Força, a Górgona pode puxá-lo para perto em seu próximo turno).'
    ],
    abilities: [
        'Clone de Teia: Górgona cria um clone feito de teia e petróleo, que engana inimigos por 1 rodada. Ao ser destruído ou explodido, causa 10d8 de dano em área de 5 metros com fogo e ácido.',
        'Chamado da Criadagem: Górgona invoca uma cria menor com 10% de sua vida máxima. A cria pode agarrar inimigos e, caso consiga comer o alvo, regenera 5% da vida máxima da Górgona. A cria dura 3 rodadas ou até ser derrotada.',
       
    ],
    passiva: 'Tecelã Demoníaca: A Górgona pode gerar teias que dificultam a movimentação de inimigos em um raio de 10 metros, reduzindo a agilidade deles em -10. Sempre que imobiliza ou agarra um alvo, ganha +1d8 de dano adicional nos ataques contra ele.',
    passivaElemental: 'Veneno Ácido: Todos os ataques da Górgona causam 2d8 de dano ácido adicional. Áreas afetadas por ácido tornam-se difíceis de atravessar para inimigos, reduzindo sua velocidade em 50%.',
},
'Behemoth': {
    title: 'O Golem do Diabo',
    image: 'imagens/dinos_behemoth.jpg', // Substitua pelo caminho correto
    weight: '25.000 kg',
    height: '7.5 M',
    length: '6 M',
    attributes: { agi: 4, for: 6, int: 2, pre: 3, vig: 5 },
    life: 600, // Escalável por nível ou estágio
    armor: 600, // Base extremamente resistente devido à sua armadura mineral
    actionBonus: '+20 esmagar, +18 língua agarradora, +22 jato de lava, +15 terreno pedregoso, +30 bloqueio.',
    attacks: [
        'Esmagar com Braços: 8d12+40 (ataque pesado que pode causar dano em área em um raio de 3 metros ao redor do Behemoth. Alvos atingidos devem fazer um teste de Constituição ou ficam atordoados por 1 rodada).',
        'Língua Agarradora: 4d10+20 (a língua do Behemoth pode atingir inimigos em até 8 metros, agarrando-os e puxando-os para perto. Inimigos agarrados sofrem dano contínuo de 3d8 por sufocamento até escaparem).',
        'Jato de Lava: 6d10+35 (Behemoth cospe lava em linha reta de até 10 metros, causando dano de fogo contínuo de 4d6 por 2 rodadas. A área afetada torna-se difícil de atravessar, reduzindo a velocidade em 50%).'
    ],
    abilities: [
        'Bola de Espinhos: Behemoth enrola-se e rola em alta velocidade por até 15 metros, causando 6d10+30 de dano a todos os inimigos no caminho e criando um terreno pedregoso que reduz a mobilidade. Durante o movimento, ele recebe +15 de armadura.',
        'Terreno Pedregoso: Behemoth ergue espinhos e pedras do chão em um raio de 10 metros, causando 5d8+20 de dano a todos os inimigos e dificultando a movimentação. Alvos atingidos ficam vulneráveis a ataques físicos no próximo turno.',
     
    ],
    passiva: 'Estômago Exposto: Behemoth é imune a armas convencionais. Para causar dano significativo, é necessário fazer com que ele corra, expondo seu estômago. Enquanto o estômago está exposto, ataques causam +4d10 de dano adicional.',
    passivaElemental: 'Fusão com Pedra: Todos os ataques causam 1d8 de dano adicional de pedra ou fogo. Behemoth ganha resistência ao dano de fogo e completa imunidade ao dano de perfuração ou corte de armas normais.',
},
'Peixe-jaula': {
    title: 'Guardião do Void Profundo',
    image: 'imagens/dinos_peixe_jaula.jpg', // Substitua pelo caminho correto
    weight: '30.000 kg',
    height: '16 M',
    length: '28M',
    attributes: { agi: 4, for: 7, int: 2, pre: 2, vig: 7 },
    life: 1000, // Escalável por nível ou estágio
    armor: 500, // Armadura natural reforçada pela pressão extrema das profundezas
    actionBonus: '+38 mordida colapsante, +30 golpe de cauda, +25 rajada de sombras, +20 em testes de percepção em águas escuras',
    attacks: [
        'Mordida Colapsante: 10d12+50 (um ataque massivo que pode esmagar armaduras e causar quebrado-fatal contínuo de 20d8 por 3 rodadas. Se usado contra criaturas menores, o alvo deve passar em um teste de Constituição ou ser engolido).',
        'Golpe de Cauda: 8d10+40 (o golpe de cauda gera uma onda de choque que desorienta inimigos em um raio de 10 metros, reduzindo sua mobilidade em 50% por 2 rodadas).',
        'Rajada de Sombras: 6d12+35 (o Peixe-Jaula emite uma rajada de energia sombria que reduz a visibilidade e causa dano em área em um cone de 15 metros. Alvos atingidos têm -10 em precisão por 2 rodadas).'
    ],
    abilities: [
        'Olhos Verdes do Abismo: A presença do Peixe-Jaula reduz a visibilidade para 1 metro em um raio de 20 metros ao redor. Seus olhos brilham em verde, forçando inimigos a fazerem um teste de Sabedoria ou sofrerem um efeito de pânico, reduzindo sua capacidade de atacar ou se mover estrategicamente.',
        'Guardião do Void: O Peixe-Jaula pode invocar Leviatãs menores para ajudar na batalha. Cada Leviatã tem 20% de sua vida e causa 4d10+20 de dano com ataques. Podem ser invocados a cada 5 rodadas.',
       
    ],
    passiva: 'Aura Abissal: Sempre que o Peixe-Jaula recebe dano, ele regenera 5% de sua vida máxima e reduz a visibilidade de quem o atacou ainda mais, tornando-o praticamente invisível para inimigos sem sentidos aprimorados.',
    passivaElemental: 'Profundezas Sombria: Todos os ataques do Peixe-Jaula causam +2d8 de dano de escuridão. Ele é imune a ataques baseados em luz e calor e ganha +10 em todos os testes em ambientes aquáticos profundos.',
},
'Gargantua': {
    title: 'O Colosso do Void',
    image: 'imagens/dinos_gargantua.jpg', // Substitua pelo caminho correto
    weight: '1.200.000 toneladas',
    height: '200 M',
    length: '1 KM',
    attributes: { agi: 2, for: 20, int: 6, pre: 15, vig: 20 },
    life: 10000, // Escalável por nível ou estágio, representando sua colossal resistência
    armor: 500, // Armadura quase impenetrável devido à sua escama densa e adaptada ao void
    actionBonus: '+105 mordida fatal, +80 golpe de cauda devastador, +75 rajada de escuridão, +75 em testes de percepção e rastreamento no void',
    attacks: [
        'Mordida Fatal: *Instant Kill* (Um ataque mortal que destrói qualquer criatura menor que o Gargantua. Criaturas maiores devem passar em um teste de Constituição extremo com dificuldade aumentada para evitar morte imediata, ainda sofrendo 15d20+100 de dano caso resistam).',
        'Golpe de Cauda Devastador: 12d20+80 (o impacto causa um terremoto submarino, gerando ondas de choque em um raio de 50 metros. Todos os inimigos na área devem passar em um teste de Reflexo ou serem lançados a uma grande distância, sofrendo dano por impacto).',
        'Rajada de Escuridão: 8d20+60 (o Gargantua emite uma onda de energia negra em um cone de 100 metros. Alvos atingidos perdem temporariamente a capacidade de enxergar, lutar estrategicamente ou usar habilidades mágicas por 1d4 rodadas).'
    ],
    abilities: [
        'Terror do Void: A simples presença do Gargantua força todos os inimigos a fazerem testes de Sabedoria em cada turno. Falhas resultam em efeitos de pânico, fazendo-os hesitar ou fugir. Criaturas mais fracas que o Gargantua automaticamente ficam paralisadas em um raio de 30 metros.',
        'Colosso do Abismo: O Gargantua é capaz de alterar o ambiente ao seu redor, criando correntes submarinas que arrastam inimigos para a escuridão. Esses redemoinhos causam 6d10 de dano por rodada e dificultam movimentos (-20 em agilidade).',
      
    ],
    passiva: 'Aura do Void Eterno: Dentro de seu domínio, o Gargantua é praticamente intangível para ataques comuns. Ele regenera 5% de sua vida máxima por rodada e reflete 10% do dano recebido de fontes mágicas como dano de escuridão no atacante.',
    passivaElemental: 'Escuridão Primordial: Todos os ataques do Gargantua causam +3d20 de dano sombrio. Ele é imune a qualquer efeito de luz, fogo ou gelo, e ganha +20 em todos os testes realizados em águas profundas e escuras.',
},
  'Mariposa': {
    title: 'Mariposa da Seda',
    image: 'imagens/dinos_mariposa.jpg', // Substitua pelo caminho correto da imagem
    height: '3.5 m',
    length: '7 m', // Considerando a envergadura das asas
    weight: '1.5 toneladas',
    attributes: { agi: 4, for: 3, int: 3, pre: 3, vig: 2 },
    life: 200, // Reduzido para refletir sua fragilidade
    armor: 85, // Reduzido para refletir sua menor resistência
    actionBonus: "+10 voar, +10 envenenar com seda, +10 camuflar, +10 detectar feromônios, +10 em acertos, flanquear, levar, esquiva, +10 em acertos de teia, +5 pensar",
    attacks: [
        'Picada Venenosa: 10d6+5 (dano venenoso e aplica veneno paralizante)',
        'Ataque com Garras: 4d6+10 4x(dano cortante e pode prender em teias)',
        'Disparo de Seda: 5d8+5 (cria teias que prendem por 1 turno)'
    ],
    abilities: [
        'Teia Adesiva: Pode criar teias para prender inimigos ou escalar superfícies. Cada inimiga preso faz ela ganhar um bônus de +5 em acertos e +20 de dano em todos os ataques ',
        'Grudar flanco: Ganha +5 em acertos e +25 de dano para aliados e para ela em acertos'
    ],
    passiva: 'Mestre Tecelã: Suas teias são extremamente fortes e podem ser usadas para diversas finalidades, como construir ninhos ou aprisionar presas.',
    passivaElemental: 'Veneno Sedativo: Seu veneno causa paralisia temporária, tornando os inimigos mais fáceis de manipular.'
},

"Formiga-soldado-vermelha": {
    "title": "Formiga-Soldado Vermelha",
    "image": "imagens/dinos_formiga_vermelha.webp",
    "height": "2 m",
    "length": "4.5 m",
    "weight": "500 kg",
    "attributes": { 
      "agi": 4, 
      "for": 4, 
      "int": 2, 
      "pre": 1, 
      "vig": 3 
    },
    "life": 50,
    "armor": 40,
    "actionBonus": "+10 em ataques coordenados, +10 rastejar rápido, +10 mordida crítica, +10 escalar superfícies verticais, +10 em flanquear, +5 em testes de percepção olfativa, +5 estratégia em grupo",
    "attacks": [
      "Mordida Ácida: 8d6+5 (dano ácido e causa queimação contínua por 2 turnos)",
      "Golpe com Mandíbulas: 6d8+5 (dano cortante, com chance de desmembrar partes menores do inimigo)",
      "Ejetar Ácido: 3d10+5 (projétil de ácido com alcance de 10 metros, reduz armadura em 10% por turno)"
    ],
    "abilities": [
      "Fúria Coordenada: Quando em grupo, a Formiga-Soldado Vermelha ganha +3 em acertos e +10 de dano para cada aliado próximo (máximo de 3).",
      "Carapaça Defensiva: Pode reduzir em 50% o dano de ataques físicos durante 1 turno. Usável uma vez a cada 3 turnos."
    ],
    "passiva": "Estratégia de Colônia: Sempre que uma Formiga-Soldado Vermelha estiver próxima de outra criatura da mesma espécie, ambas ganham +5 em acertos e +5 de dano.",
    "passivaElemental": "Ácido Corrosivo: Todo ataque de ácido ignora 20% da armadura do inimigo."
  },
  "Formiga Soldado Bombeiro": {
    "title": "Formiga-Soldado Bombeiro",
    "image": "imagens/dinos_formiga_bombeira.webp",
    "height": "2.2 m",
    "length": "4.8 m",
    "weight": "550 kg",
    "attributes": { 
      "agi": 4, 
      "for": 1, 
      "int": 3, 
      "pre": 2, 
      "vig": 2 
    },
    "life": 70,
    "armor": 20,
    "actionBonus": "+10 em ataques incendiários, +10 resistência a fogo, +10 em rastejar por superfícies quentes, +5 em detecção de calor, +5 em flanquear, +5 esquiva em áreas de fogo",
    "attacks": [
      "Mordida Incandescente: 8d8+5 (dano de fogo e aplica queimadura severa por 2 turnos)",
      "Golpe com Mandíbulas: 4d10+5 (dano cortante e pode desarmar o inimigo de itens pequenos)",
      "Spray de Fogo: 3d10+5 (um jato de fogo em cone de 5 metros, causa dano e aplica queimaduras leves)"
    ],
    "abilities": [
      "Chama Coordenada: Quando em grupo, a Formiga-Soldado Bombeiro aumenta em +10 o dano de ataques incendiários para todos os aliados próximos (máximo de 3).",
      "Armadura Flamejante: Reduz em 30% o dano de ataques baseados em fogo e reflete 10% do dano como calor ao atacante durante 2 turnos. Usável uma vez a cada 3 turnos."
    ],
    "passiva": "Defensor do Fogo: Ganha imunidade a queimaduras e aumenta a eficácia de ataques incendiários aliados em +5.",
    "passivaElemental": "Chamas Persistentes: Todo ataque de fogo causa dano contínuo por 1 turno adicional."
  },
  
    "Louva-a-deus": {
      "title": "Louva-Deus Predador",
      "image": "imagens/dinos_mantis.webp",
      "height": "2.5 m",
      "length": "3.2 m",
      "weight": "300 kg",
      "attributes": { 
        "agi": 5, 
        "for": 4, 
        "int": 3, 
        "pre": 3, 
        "vig": 3 
      },
      "life": 180,
      "armor": 90,
      "actionBonus": "+10 em ataques contra inimigos com menos de 50% da vida, +10 agarrar, +10 em bloqueio e contra-ataque, +10 camuflagem imóvel, +10 pulo, +5 escalada, +5 voo em pequenas distâncias",
      "attacks": [
        "Mordida Calculada: Causa dano baseado em 15% da vida total do inimigo (ignora armadura).",
        "Corte Rápido: 6d8+5 (dano cortante, com chance de desarmar ou incapacitar membros menores).",
        "Agarrar Letal: 7d6+5 (dano cortante e imobiliza o alvo por 1 turno, impedindo ações de movimento)."
      ],
      "abilities": [
        "Golpe Oportunista: Quando o inimigo está com menos de 50% da vida, todos os ataques do Louva-Deus ganham +10 de dano e ignoram armadura.",
        "Camuflagem Predatória: Pode ficar imóvel para se camuflar completamente, tornando-se indetectável por inimigos não atentos. Dura 2 turnos ou até realizar uma ação ofensiva."
      ],
      "passiva": "Caçador de Presas Fracas: Ganha bônus automático de +5 em acertos e +10 de dano contra inimigos com menos de 50% da vida.",
      "passivaElemental": "Agilidade Voraz: Pode realizar dois ataques em um único turno caso tenha realizado um salto ou voo antes."
    },
    "Tecelão de Orbe": {
        "title": "Tecelão de Orbe",
        "image": "imagens/dinos_aranha_orbe.webp",
        "height": "1.5 m",
        "length": "3 m",
        "weight": "200 kg",
        "attributes": { 
          "agi": 5, 
          "for": 3, 
          "int": 4, 
          "pre": 2, 
          "vig": 2 
        },
        "life": 180,
        "armor": 80,
        "actionBonus": "+15 furtividade, +10 em criar armadilhas, +10 em agarrar, +10 em detectar vibrações, +5 em escalar, +5 em esquiva",
        "attacks": [
          "Mordida Pegajosa: 6d6+5 (dano médio e aplica lentidão por 2 turnos).",
          "Ataque com Garras: 5d8+5 (dano cortante e pode imobilizar por 1 turno se atingir o alvo).",
          "Projeção de Orbe: 4d8+5 (arremessa um orbe pegajoso a até 10 metros, prendendo o inimigo por 1 turno)."
        ],
        "abilities": [
          "Tecelão Astuto: Pode criar túneis de teias e armadilhas com orbes de mel ou líquidos pegajosos. Qualquer inimigo capturado recebe -10 em movimentos e sofre dano contínuo de 2d6 por turno enquanto estiver preso.",
          "Captura Precisa: Ao agarrar um inimigo, o Tecelão de Orbe reduz as chances de evasão do alvo em -15 e pode executar um ataque adicional no próximo turno."
        ],
        "passiva": "Armadilhas Naturais: Sempre que um inimigo estiver preso em uma armadilha, o Tecelão de Orbe ganha +10 em acertos e +5 de dano contra ele.",
        "passivaElemental": "Orbe Ácido: Orbes projetados têm 20% de chance de corroer armadura e causar 3d6 de dano extra no próximo turno."
      },
      "Porco": {
    "title": "Porco Comum",
    "image": "imagens/dinos_porco.jpeg",
    "height": "1 m",
    "length": "1.5 m",
    "weight": "150 kg",
    "attributes": { 
      "agi": 2, 
      "for": 2, 
      "int": 1, 
      "pre": 1, 
      "vig": 3 
    },
    "life": 40,
    "armor": 10,
    "actionBonus": "+5 em esquiva, +5 farejar comida, +5 em resistência a venenos simples, +5 em carga e empurrão",
    "attacks": [
      "Mordida Simples: 2d6+2 (dano perfurante).",
      "Investida: 3d6+3 (dano de impacto, com chance de derrubar inimigos pequenos).",
      "Chute Desesperado: 2d8 (dano de impacto, só pode ser usado se o Porco estiver encurralado)."
    ],
    "abilities": [
      "Faro Apurado: Pode detectar alimentos, água ou materiais orgânicos próximos a até 20 metros.",
      "Persistência: Recebe +10 de resistência a qualquer efeito que cause medo ou paralisia."
    ],
    "passiva": "Força de Trabalho: Consegue carregar ou empurrar até o dobro do seu peso sem penalidades.",
    "passivaElemental": "Adaptável: Ganha +5 em resistências a mudanças climáticas e efeitos ambientais leves (calor, frio, etc.)."
  },
  "gado comum": {
    "title": "Gado Comum",
    "image": "imagens/dinos_gado.jpg",
    "height": "1.5 m",
    "length": "2.5 m",
    "weight": "700 kg",
    "attributes": { 
      "agi": 2, 
      "for": 4, 
      "int": 1, 
      "pre": 1, 
      "vig": 4 
    },
    "life": 100,
    "armor": 80,
    "actionBonus": "+5 em resistência a impactos, +10 em carga e empurrão, +5 em detectar ameaças naturais, -5 em ataques rápidos",
    "attacks": [
      "Chifrada: 4d6+4 (dano de impacto, com chance de derrubar inimigos pequenos).",
      "Pisada Pesada: 3d8+3 (dano de impacto, aplica lentidão por 1 turno).",
      "Investida: 5d6+5 (dano de impacto em linha reta, deve correr pelo menos 5 metros antes de atacar)."
    ],
    "abilities": [
      "Força Bruta: Pode empurrar ou destruir barreiras frágeis com facilidade.",
      "Tolerância Alta: Recebe +10 de resistência contra ataques baseados em veneno ou doenças."
    ],
    "passiva": "Animal de Carga: Pode transportar até 3 vezes seu peso sem penalidades.",
    "passivaElemental": "Resistência Natural: Reduz o dano de efeitos ambientais (calor, frio, chuva) em 20%."
  },
  "Gorgulho": {
    "title": "Gorgulho",
    "image": "imagens/dinos_gorgulho.webp",
    "height": "1 m",
    "length": "2 m",
    "weight": "50 g",
    "attributes": { 
      "agi": 4, 
      "for": 1, 
      "int": 1, 
      "pre": 2, 
      "vig": 3 
    },
    "life": 40,
    "armor": 20,
    "actionBonus": "+10 em perfurar, +5 escavar, +5 em resistência contra venenos naturais, -5 em velocidade de movimentação",
    "attacks": [
      "Mordida Perfurante: 3d4+2 (dano perfurante, com chance de ignorar 5% da armadura).",
      "Saliva Degradante: 2d6 (diminui a resistência da armadura do alvo em -10% por 2 turnos)."
    ],
    "abilities": [
      "Escavação: Pode criar túneis rapidamente para se esconder ou emboscar inimigos.",
      "Devastador de Plantações: Ganha +10 em ataques contra materiais vegetais ou criaturas herbívoras."
    ],
    "passiva": "Carapaça Dura: Recebe 10% de redução de dano contra ataques físicos.",
    "passivaElemental": "Sobrevivente Subterrâneo: Não sofre penalidades de movimento em terrenos difíceis ou subterrâneos."
  },
  "Pulgão": {
    "title": "Pulgão",
    "image": "imagens/dinos_pulgao.webp",
    "height": "0.50 cm",
    "length": "1.5 cm",
    "weight": "2 g",
    "attributes": { 
      "agi": 5, 
      "for": 1, 
      "int": 1, 
      "pre": 2, 
      "vig": 2 
    },
    "life": 30,
    "armor": 10,
    "actionBonus": "+10 em furtividade, +10 em escalar plantas, +10 sugar nutrientes, -5 resistência contra ataques de impacto",
    "attacks": [
      "Mordida Nutritiva: 2d4 (suga 5 pontos de vida do alvo e regenera o mesmo valor).",
      "Saliva Enfraquecedora: 1d6 (reduz força do alvo em -2 por 1 turno)."
    ],
    "abilities": [
      "Multiplicação Rápida: Sempre que um Pulgão causar dano, há uma chance de 20% de um novo pulgão surgir na área.",
      "Sugar Nutrientes: Pode recuperar 10 pontos de vida ao se alimentar de plantas ou criaturas grandes durante 1 turno."
    ],
    "passiva": "Parasitismo: Quando em grupo, todos os Pulgões ganham +5 em acertos e +5 de dano.",
    "passivaElemental": "Colônia Resiliente: Recebem 50% de redução de dano contra ataques baseados em elementos naturais (fogo, gelo, etc.)."
  },
  "gorgossauro": {
    "title": "Gorgossauro",
    "image": "imagens/dinos_gorgossauro.jpg",
    "height": "4 m",
    "length": "7 m",
    "weight": "1.2 toneladas",
    "attributes": { 
      "agi": 4, 
      "for": 5, 
      "int": 3, 
      "pre": 3, 
      "vig": 4 
    },
    "life": 200,
    "armor": 100,
    "actionBonus": "+10 em rastreamento, +10 em esquiva, +10 em ataques de grupo, +5 em furtividade, +5 em velocidade de movimento",
    "attacks": [
      "Mordida Devastadora: 8d10+10 (dano perfurante com chance de causar sangramento por 2 turnos).",
      "Garra Ágil: 5d8+5 (dano cortante com chance de empurrar o alvo).",
      "Investida Selvagem: 6d6+10 (dano de impacto em linha reta, só pode ser usado se o Gorgossauro correr ao menos 5 metros antes)."
    ],
    "abilities": [
      "Caça em Grupo: Para cada Gorgossauro adicional atacando o mesmo inimigo, todos ganham +5 em acertos e +10 de dano.",
      "Rastreador Nato: Pode seguir rastros e identificar presas a até 20 metros, ignorando obstáculos leves."
    ],
    "passiva": "Coordenação de Matilha: Todos os Gorgossauros no grupo ganham +10 de movimento enquanto estão a menos de 10 metros uns dos outros.",
    "passivaElemental": "Fúria da Matilha: Ao ser ferido, o Gorgossauro ganha +10 em acertos e +5 de dano por 1 turno."
  },
  
    "Abelha": {
      "title": "Abelha Colmeia",
      "image": "imagens/dinos_abelha.jpg",
      "height": "1 m",
      "length": "1.5 m",
      "weight": "20 kg",
      "attributes": { 
        "agi": 4, 
        "for": 2, 
        "int": 3, 
        "pre": 3, 
        "vig": 3 
      },
      "life": 70,
      "armor": 70,
      "actionBonus": "+10 em coordenação de grupo, +10 em ataques de ferrão, +5 em velocidade de voo, +5 em esquiva",
      "attacks": [
        "Picada Venenosa: 6d6+5 (dano perfurante e aplica veneno, causando -5 em ações do alvo por 2 turnos).",
        "Agressão em Grupo: 4d8+5 (dano acumulativo por abelhas próximas atacando o mesmo inimigo)."
      ],
      "abilities": [
        "Inteligência de Colônia: Sempre que uma Abelha realizar uma ação, outra pode replicá-la com metade do custo de ação.",
        "Fúria da Colmeia: Quando um aliado da colônia morre, todas as abelhas ganham +5 em dano por 2 turnos."
      ],
      "passiva": "Dedicação à Colônia: Recebem +5 em todas as ações enquanto estiverem protegendo sua colônia.",
      "passivaElemental": "Feromônios de Alerta: Toda a colônia é notificada de ameaças próximas em um raio de 50 metros."
    },
    "Inseto Escudo Verde": {
        "title": "Inseto Escudo Verde",
        "image": "imagens/dinos_inseto_escudo_verde.jpg",
        "height": "1.5 m",
        "length": "2.5 m",
        "weight": "300 kg",
        "attributes": { 
          "agi": 3, 
          "for": 3, 
          "int": 2, 
          "pre": 2, 
          "vig": 4 
        },
        "life": 150,
        "armor": 150,
        "actionBonus": "+10 em bloquear ataques, +10 em debuffs, +5 em resistência física, -5 em velocidade de movimento",
        "attacks": [
          "Escudo Ofensivo: 5d6+5 (dano de impacto e reduz acerto do inimigo em -5 por 1 turno).",
          "Investida Protetora: 4d8+5 (dano de impacto, aplica lentidão por 1 turno)."
        ],
        "abilities": [
          "Bloqueio Impecável: Pode bloquear até 50% do dano recebido de ataques físicos frontais.",
          "Retaliação Tóxica: Quando recebe dano, aplica -5 em todos os atributos do atacante por 2 turnos."
        ],
        "passiva": "Carapaça Protetora: Reduz todo o dano recebido em 10%.",
        "passivaElemental": "Escudo Regenerativo: Regenera 5% da vida total a cada 2 turnos enquanto estiver em combate."
      },
      "Concavenator": {
        "title": "Concavenator da Areia",
        "image": "imagens/dinos_concavenator.jpg",
        "height": "2 m",
        "length": "6 m",
        "weight": "800 kg",
        "attributes": { 
          "agi": 5, 
          "for": 4, 
          "int": 3, 
          "pre": 3, 
          "vig": 3 
        },
        "life": 200,
        "armor": 90,
        "actionBonus": "+10 em furtividade, +10 em movimento na areia, +5 em ataques surpresa, +5 em esquiva",
        "attacks": [
          "Mordida Rápida: 6d6+5 (dano cortante).",
          "Garras da Areia: 5d8+5 (dano cortante e aplica lentidão por 1 turno).",
          "Ataque Surpresa: 7d6+10 (dano cortante, só pode ser usado ao sair da furtividade)."
        ],
        "abilities": [
          "Caçador da Areia: Recebe +10 de movimento e furtividade ao se deslocar em terrenos arenosos.",
          "Emboscador Ágil: Sempre que atacar saindo de furtividade, ganha +10 em acertos e ignora 20% da armadura do alvo."
        ],
        "passiva": "Resistência à Areia: Imunidade a penalidades de movimento em terrenos arenosos.",
        "passivaElemental": "Velocidade do Deserto: Ao iniciar um turno, pode realizar um movimento extra sem gastar ação."
      },
      "Indoraptor": {
    "title": "Arma biológica",
    "image": "imagens/dinos_indoraptor.jpg",
    "height": "3 m",
    "length": "7 m",
    "weight": "1.2 toneladas",
    "attributes": { 
      "agi": 6, 
      "for": 5, 
      "int": 6, 
      "pre": 5, 
      "vig": 4 
    },
    "life": 250,
    "armor": 200,
    "actionBonus": "+30 em lábia, +15 em furtividade, +20 em rastreamento, +15 em esquiva, +15 em acertos, +20 em testes de aprendizado",
    "attacks": [
      "Mordida Devastadora: 10d10+15 (dano perfurante com chance de causar sangramento severo por 2 turnos).",
      "Garras Cortantes: 8d8+10 (dano cortante com chance de imobilizar o alvo por 1 turno).",
      "Analisar: Pode tentar copiar o aatque ou simular a ação nessa rodada, podendo fazer alguma vantagem em seus ataques normais e ficar mais rápido ou saber pontos vitais por exemplo. "
    ],
    "abilities": [
      "Caçador Implacável: Pode detectar alvos por calor, infravermelho, batimentos cardíacos ou eco, ignorando qualquer penalidade de furtividade do inimigo.",
      "Fingimento Astuto: Pode fingir uma ação para enganar o inimigo, ganhando +30 em lábia. Se atacar após enganar, causa dano triplo nesse ataque.",
     
    ],
    "passiva": "Caça Perfeita: Nunca perde rastros de suas presas, podendo segui-las indefinidamente.",
    "passivaElemental": "Predador Diabólico: Recebe +10 em todos os ataques e +10% de dano adicional ao lutar em ambientes escuros ou confinados."
  },
  "E750": {
    "title": "E750 - Híbrido Biológico",
    "image": "imagens/dinos_e750.jpg",
    "height": "4 m",
    "length": "8 m",
    "weight": "1.5 toneladas",
    "attributes": { 
      "agi": 6, 
      "for": 5, 
      "int": 4, 
      "pre": 4, 
      "vig": 5 
    },
    "life": 250,
    "armor": 200,
    "actionBonus": "+20 em furtividade, +15 em escalada, +15 em natação, +10 em esquiva, +10 em velocidade de movimento, +10 em ataques críticos.",
    "attacks": [
      "Mordida Envenenada: 10d10+15 (dano perfurante e aplica venenos com efeitos variados das glândulas: paralisia, redução de vida por turno ou dano acumulativo).",
      "Garras Venenosas: 8d8+10 (dano cortante, aplica veneno com chance de reduzir armadura em 10% por 2 turnos).",
      "Espinhos Tóxicos: 7d10+10 (dano perfurante em área, aplicando veneno com efeitos variados em até 3 alvos próximos)."
    ],
    "abilities": [
      "Habilidades Fragmentadas: Sempre que E750 recebe dano, causa dano ou vê uma criatura morrer, role 1d6 para determinar sua ação: 1 - Matar; 2 - Fugir; 3 - Matar; 4 - Neutro; 5 - Matar; 6 - Ira (ganha +20 em dano e velocidade por 2 turnos).",
      "Furtividade Fatal: Nunca sofre penalidades para se manter furtivo, e ao atacar de furtividade, causa dano crítico garantido."
    ],
    "passiva": "Metabolismo Tóxico: Seu corpo é resistente a todos os tipos de venenos e toxinas, ganhando +10 em resistência e regenerando 5% da vida total por turno.",
    "passivaElemental": "Glândulas Venenosas: Cada ataque inflige um tipo de veneno aleatório (paralisante, corrosivo ou mortal) que dura 2 turnos e reduz as capacidades do alvo."
  },
  "Indotaurus": {
    "title": "Indotaurus",
    "image": "imagens/dinos_indotaurus.jpg",
    "height": "4.5 m",
    "length": "8 m",
    "weight": "2 toneladas",
    "attributes": { 
      "agi": 5, 
      "for": 6, 
      "int": 4, 
      "pre": 4, 
      "vig": 5 
    },
    "life": 300,
    "armor": 250,
    "actionBonus": "+15 em força bruta, +20 em ataques de investida, +20 em rastreamento, +15 em esquiva, +15 em lábia",
    "attacks": [
      "Mordida Arrasadora: 12d10+20 (dano perfurante, aplica sangramento severo por 2 turnos).",
      "Chifrada Devastadora: 10d10+25 (dano de impacto, empurra o inimigo 5 metros e derruba).",
      "Investida Brutal: 10d10+30 (dano de impacto em linha reta, só pode ser usada após correr ao menos 10 metros)."
    ],
    "abilities": [
      "Fúria do Predador: Quando reduz um inimigo a menos de 50% de vida, ganha +10 em dano e +10 em acerto até o fim do combate.",
      "Carneiro Selvagem: Pode usar seus chifres para quebrar obstáculos ou ignorar barreiras, causando dano a todos em uma linha reta.",
    ],
    "passiva": "Mente Feroz: Embora menos inteligente que o Indoraptor, o Indotaurus ainda pode prever movimentos básicos e ajustar suas táticas, ganhando +5 em acertos contra inimigos previsíveis.",
    "passivaElemental": "Força Colossal: Todos os ataques causam 20% de dano adicional e ignoram 25% da armadura do alvo."
  },
  "Crabsquid": {
    "title": "Crabsquid",
    "image": "imagens/dinos_crabsquid.jpg",
    "height": "3 m",
    "length": "5 m",
    "weight": "800 kg",
    "attributes": { 
      "agi": 3, 
      "for": 3, 
      "int": 4, 
      "pre": 4, 
      "vig": 2 
    },
    "life": 250,
    "armor": 110,
    "actionBonus": "+15 em natação, +10 em intimidação (após rugir), +10 em ataques de agarrão, +10 em furtividade aquática, +10 em resistência contra eletricidade.",
    "attacks": [
      "Mordida Afiada: 8d8+10 (dano perfurante, pode reduzir a velocidade do alvo por 1 turno).",
      "Garras Triturantes: 10d8+15 (dano cortante, tem chance de agarrar o inimigo por 2 turnos).",
      "Investida Subaquática: 9d10+20 (dano de impacto, empurra o alvo e o atordoa por 1 turno)."
    ],
    "abilities": [
      "Onda Eletromagnética: Pode desativar dispositivos elétricos em um raio de 15 metros por 2 turnos, afetando qualquer tecnologia em uso.",
      "Teia Sintética: Cria teias de alta elasticidade para prender inimigos em um raio de 3 metros, reduzindo a mobilidade dos alvos por 2 turnos.",
     
    ],
    "passiva": "Furtividade Subaquática: É quase indetectável enquanto está submerso, ganhando +15 em furtividade na água.",
    "passivaElemental": "Campo Bioelétrico: Recebe resistência a ataques elétricos e reduz o dano de eletricidade em 50%."
  }
  
  
  
  










}

function openSearch(category) {
    document.getElementById('searchContainer').style.display = 'flex';
    document.getElementById('searchTitle').textContent = `Pesquisar em ${category}`;

    const creatureList = document.getElementById('creatureList');
    creatureList.innerHTML = '';
    creatures[category].forEach(creature => {
        const li = document.createElement('li');
        li.textContent = creature;
        li.onclick = () => openDinoFicha(creature);
        creatureList.appendChild(li);
    });
}

function openDinoFicha(dino) {
    const ficha = dinoFichas[dino];
    if (!ficha) {
        alert('Ficha não encontrada');
        return;
    }

    // Preencher dados no modal
    document.getElementById('dinoName').textContent = dino;
    document.getElementById('dinoTitle').textContent = ficha.title;
    document.getElementById('dinoImage').src = ficha.image;
    document.getElementById('dinoWeight').textContent = ficha.weight;
    document.getElementById('dinoHeight').textContent = ficha.height;
    document.getElementById('dinoLength').textContent = ficha.length;
    document.getElementById('dinoAgi').textContent = ficha.attributes.agi;
    document.getElementById('dinoFor').textContent = ficha.attributes.for;
    document.getElementById('dinoInt').textContent = ficha.attributes.int;
    document.getElementById('dinoPre').textContent = ficha.attributes.pre;
    document.getElementById('dinoVig').textContent = ficha.attributes.vig;

    document.getElementById('dinoLife').textContent = ficha.life;
    document.getElementById('dinoArmor').textContent = ficha.armor;
    document.getElementById('dinoActionBonus').textContent = ficha.actionBonus;

    document.getElementById('dinoAtk1').textContent = ficha.attacks[0];
    document.getElementById('dinoAtk2').textContent = ficha.attacks[1];
    document.getElementById('dinoAtk3').textContent = ficha.attacks[2];
    document.getElementById('dinoHab1').textContent = ficha.abilities[0];
    document.getElementById('dinoHab2').textContent = ficha.abilities[1];
    document.getElementById('dinoPassiva').textContent = ficha.passiva;
    document.getElementById('dinoPassivaElemental').textContent = ficha.passivaElemental;

    // Exibir modal
    document.getElementById('dinoModal').style.display = 'flex';
}
function closeDinoModal() {
    document.getElementById('dinoModal').style.display = 'none';
}
function filterCreatures() {
    const query = document.getElementById('searchInput').value.toLowerCase(); // Pega o valor digitado e converte para minúsculas
    const items = document.querySelectorAll('#creatureList li'); // Seleciona todos os itens da lista de criaturas

    items.forEach(item => {
        if (item.textContent.toLowerCase().includes(query)) {
            item.style.display = 'list-item'; // Mostra o item se corresponder à busca
        } else {
            item.style.display = 'none'; // Esconde o item caso não corresponda
        }
    });
}
