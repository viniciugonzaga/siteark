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
// Sistema de Criaturas
// ========================

// Data structure for creatures (updated with new fields: diet and behavior)
const creaturesData = [ 
    {
        id: 1,
        name: "T-Rex",
        title: "Rei dos Dinossauros",
        image: "../imagens/icon_tiranossauro.png",
        thumbnail: "../imagens/icon_tiranossauro.png", 
        category: "Dinossauro",
        biome: ["Campos","Montanha"],
        environment: "land", // Mantido "land"
        height: "6.5m",
        length: "12m",
        weight: "9 ton",
        diet: "Carnívoro",
        behavior: "Agressivo",
        difficulty: "Difícil",
        habitat: "Campos, Montanha",
        attributes: {
            agi: 2,
            for: 6,
            int: 2,
            set: 2,
            vig: 6,
        },
        stats: {
            hp: 360,
            armor: 150,
            beastHp: 6,
            beastStr: 5
        },
        locomotion: "Terrestre",
        bonuses: [
            { action: "Força Bruta", bonus: "+25" }, // Corrigido
            { action: "Morder", bonus: "+20" },
            { action: "Coragem", bonus: "+20" },
            { action: "Intimidação", bonus: "+20" },
            { action: "Contra-ataque", bonus: "+20" },
            { action: "Agarrar", bonus: "+20" },
            { action: "Peso", bonus: "+20" },
            { action: "Fortitude", bonus: "+20" },
            { action: "Resistência", bonus: "+20" },
            { action: "Luta", bonus: "+20" },
            { action: "Bloqueio", bonus: "+15" },
            { action: "Cheirar", bonus: "+15" },
            { action: "Cabeçada", bonus: "+15" },
            { action: "Bloqueio", bonus: "+10" },
            { action: "Correr", bonus: "+10" },
            { action: "Esquiva", bonus: "+10" },
            { action: "Percepção", bonus: "+5" }, // Corrigido
            { action: "Pensar", bonus: "+5" },
            { action: "Furtividade", bonus: "+5" },

        ],
        attacks: [
            { 
                name: "Mordida Devastadora", 
                hit: "3d20+25", 
                damage: "Causa 14d12+50 pontos de dano",
                passive: "Vulnerável -5 em Defesas Físicas" // Corrigido
            },
            { 
                name: "Investida Esmagadora", 
                hit: "3d20+20", 
                damage: "Causa 9d8 pontos de dano em área.",
                passive: "Acertar um alvo derruba-o, concedendo uma ação extra para Agarrar ou Intimidar rugindo." // Corrigido
            }
        ],
        skills: [
            { 
                name: "Rugido do Rei", 
                desc: "O T-Rex solta um rugido que causa medo em criaturas menores que ele, concedendo um bônus de Intimidação para todos os inimigos da Cena que forem intimidados. Além de causar +25% em dano em Criaturas Apex-Predador ou Alfa para si e em aliados." // Corrigido
            },
            { 
                name: "Fúria do Rei", 
                desc: "Quando o Rex chega a 30% da Vida ou fica Machucado, sua próxima Mordida em um alvo único durante a Cena causa 2x pontos de dano. Essa habilidade pode ser usada somente contra alvos intimidados e uma vez por Cena." // Corrigido
            }
        ],
        passive: {
            name: "Auge Predatório",
            desc: "O Tiranossauro Rex, sempre que começar a primeira rodada, ganha uma ação livre para intimidar seus alvos rugindo. Todos os alvos que sofrerem ataques intimidados contra o Rex, fazem ele Acumular +5 em Resiliência (Máx. 3). Até o final da Cena." // Corrigido
        },
        elements: [
            { name: "Fogo", desc: "T-Rex de Fogo solta labaredas pela boca, causando dano contínuo de fogo." },
            { name: "Morte", desc: "T-Rex de Morte causa +2D de dano contra inimigos Intimidados." },
            { name: "Hipo", desc: "T-Rex Hipo ganha +100 pontos de vida, além de ganhar +30 de Armadura e +5 em Fortitude." } // Corrigido
        ],
        brutalFight: {
            category: "Guerreiro",
            role: "Causa dano e sobrevive a longas batalhas.", // Corrigido
            size: "Ocupa 2 espaços",
            attributes: {
                agi: 2,
                for: 6,
                int: 2,
                set: 2,
                vig: 6
            },
            stats: {
                hp: 360,
                armor: 150,
                beastHp: 6,
                beastStr: 5
            },
            skills: [
                { 
                    name: "Investida Colossal", 
                    position: "Meio 1, 2",
                    reach: "Alcança os 2 da frente",
                    hit: "3d20+25",
                    desc: "Causa 9d8 pontos de dano e derruba o alvo. Se acertar, causa o efeito Vulnerável por 1d2(R)."
                },
                { 
                    name: "Rugido do Rei", 
                    position: "Qualquer",
                    reach: "Todos os aliados",
                    hit: "Auto",
                    desc: "Concede +2D de dano contra Criaturas Alfas ou Apex-Predador, todos ganham +5 em Intimidação, +5 Luta." // Corrigido
                },
                { 
                    name: "Mordida Fatal", 
                    position: "Frente 1, 2",
                    reach: "Alcança 2 da frente",
                    hit: "3d20+25",
                    desc: "Causa 16d12+50 pontos de dano. Causa o Efeito Vulnerável por 1d2(R)."
                },
                { 
                    name: "Mordida do Rei", 
                    position: "Meio 1, 2, 3",
                    reach: "Alcança 2 da Frente",
                    desc: "Causa 10d10+8d8 pontos de dano e Agarra o alvo, causando -5 em testes de Defesa e puxando para um espaço para frente." // Corrigido
                }
            ],
            beastPassive: {
                name: "Dominância Alfa",
                desc: "O T-Rex, quando entra em campo, concede para todas as 3 cartas da frente adjacentes -1 de poder de dano." // Corrigido
            }
        }
    },
    {
        id: 2,
        name: "Espinossauro",
        title: "O Rei dos Rios",
        image: "../imagens/icon_espinossauro.png",
        thumbnail: "../imagens/icon_espinossauro.png",
        category: "Dinossauro",
        biome: ["Praia", "Pântano", "Deserto", "Planalto"], 
        environment: "land", // Mantido "land"
        height: "7.2m",
        length: "15m",
        weight: "7 ton",
        diet: "Carnívoro",
        behavior: "Territorial",
        difficulty: "Difícil",
        habitat: "Pântanos, Praias, Deserto, Planalto",
        attributes: {
            agi: 3,
            for: 4,
            int: 3,
            set: 3,
            vig: 5
        },
        stats: {
            hp: 320,
            armor: 110,
            beastHp: 5,
            beastStr: 4
        },
        locomotion: "Terrestre/Aquático",
        bonuses: [
            { action: "Girar", bonus: "+25" },
            { action: "Pescar", bonus: "+25" }, 
            { action: "Intimidação", bonus: "+25" },
            { action: "Percepção em Água", bonus: "+20" },
            { action: "Mordida", bonus: "+20" }, 
            { action: "Pancada", bonus: "+20" },
            { action: "Luta", bonus: "+20" }, 
            { action: "Combo", bonus: "+20" },  
            { action: "Contra-ataque", bonus: "+20" },
            { action: "Equilíbrio", bonus: "+20" }, // Corrigido
            { action: "Resistência", bonus: "+20" },    
            { action: "Força Bruta", bonus: "+15" }, // Corrigido
            { action: "Agarrar", bonus: "+15" },
            { action: "Fortitude", bonus: "+10" }, 
            { action: "Pensar", bonus: "+10" }, 
            { action: "Correr", bonus: "+10" },
            { action: "Cheirar", bonus: "+10" },
            { action: "Percepção", bonus: "+10" }, // Corrigido
            { action: "Nadar", bonus: "+10" },
            { action: "Esquiva", bonus: "+10" },
            { action: "Bloqueio", bonus: "+10" },
            { action: "Regulagem de Temperatura", bonus: "+10" }, // Corrigido
            { action: "Percepção Inimiga", bonus: "+10" }, // Corrigido
            { action: "Furtividade", bonus: "+5" },

        ],
        attacks: [
            { 
                name: "Ataque de Mordida", 
                hit: "3d20+20", 
                damage: "Causa 8d12+30 pontos de dano",
                passive: "Deixa o alvo Lento, -5 em testes de Agilidade por 1 rodada." // Corrigido
            },
            { 
                name: "Ataque de Garras", 
                hit: "3d20+20", 
                damage: "Causa 2x 6d10+3d6 pontos de dano",
                passive: "Acertar um alvo menor que a altura do Espinossauro concede uma ação livre para Agarrar, reduzindo a defesa em -5." // Corrigido
            }
        ],
        skills: [
            { 
                name: "Nado Veloz", 
                desc: "Na água, o Espinossauro se move 50% mais rápido e ganha +5 em Esquiva. Além de +5 em Correr perto da água em terra e ganha o efeito Ágil, ganhando +5 em testes que envolvam Velocidade." // Corrigido
            },
            { 
                name: "Instinto de Pescador Territorial", 
                desc: "O Espinossauro lembra e reconhece os últimos lugares que passou em seu hábitat, decorando os melhores lugares e períodos de estações que possuem mais peixes e predadores em seu território, ganhando +10 na primeira ação contra um invasor que entre em seu lar." // Corrigido
            }
        ],
        passive: {
            name: "Predador Anfíbio",
            desc: "O Espinossauro não sofre penalidades por lutar na água e ganha +5 em Percepção Inimiga, Arcana, bônus em Agarrar e qualquer ação de Força enquanto estiver nadando em seu rio ou lago." // Corrigido
        },
        elements: [
            { name: "Morte", desc: "Espinossauro de Morte causa dano de Peste em suas garras e boca." },
            { name: "Hipo", desc: "Espinossauro Hipo ganha +80 pontos de vida, +40 de Armadura e é imune à fadiga ou cansaço em água." }, // Corrigido
            { name: "Abismo Elétrico", desc: "Espinossauro do Abismo causa dano elétrico em sua boca, podendo soltar jatos carregados por suas velas." } // Corrigido
        ],
        brutalFight: {
            category: "Duelista",
            role: "Causa dano na linha de frente.", // Corrigido
            size: "Ocupa 2 espaços",
            attributes: {
                agi: 3,
                for: 4,
                int: 3,
                set: 3,
                vig: 5
            },
            stats: {
                hp: 320,
                armor: 110,
                beastHp: 5,
                beastStr: 4
            },
            skills: [
                { 
                    name: "Investida Aquática", 
                    position: "Meio 2, 3",
                    reach: "Alcança os 2 da frente juntos",
                    hit: "3d20+15",
                    desc: "Causa 7d12+6d6 pontos de dano. Se houver Água no cenário, causa o efeito Enraizado por 1d2(R)" // Corrigido
                },
                { 
                    name: "Golpe de Garra", 
                    position: "meio 2, 3",
                    reach: "Alcança 2 da frente",
                    hit: "3d20+20",
                    desc: "Causa 2x 6d10+4d6 pontos de dano e causa o efeito Sangrando, causando 1d12 de dano, por 1d2(R)"
                },
                { 
                    name: "Mordida de Espera", 
                    position: "Frente 1, 2",
                    reach: "Alcança 1, 2 da frente.",
                    hit: "3d20+20",
                    desc: "Causa uma Mordida de 12d10+30 pontos de dano, puxando o alvo para 1 espaço à frente." // Corrigido
                },
                { 
                    name: "Fúria do Pântano", 
                    position: "Qualquer",
                    reach: "Auto",
                    hit: "Auto",
                    desc: "Mergulha na água, ficando Furtivo e ganhando +3D de dano em sua Mordida, por 1d2(R). Apaga fogo e qualquer debuff de temperatura." // Corrigido
                }
            ],
            beastPassive: {
                name: "Instinto Territorial",
                desc: "Ao entrar em jogo, o Espinossauro define seu território no espaço da carta que entrou. Ao sobreviver 1 turno em seu território, o Espinossauro afunda na água, ficando imune a habilidades, tankando o primeiro acerto que receber ao ficar na água, além de Curar 1 de vida perdida a cada turno." // Corrigido
            }
        }
    },
    {
        id: 3,
        name: "Velociraptor",
        title: "Caçador Inteligente",
        image: "../imagens/icon_raptor.png",
        thumbnail: "../imagens/icon_raptor.png",
        category: "Dinossauro",
        biome: ["Bosque", "Campos", "Floresta Vermelha"],
        environment: "land", // Mantido "land"
        height: "1.8m",
        length: "4m",
        weight: "150 kg",
        diet: "Carnívoro",
        behavior: "Agressivo",
        difficulty: "Difícil",
        habitat: "Floresta Vermelha, Campos, Bosque",
        attributes: {
            agi: 4,
            for: 2,
            int: 4,
            set: 3,
            vig: 2
        },
        stats: {
            hp: 120,
            armor: 50,
            beastHp: 2,
            beastStr: 3
        },
        locomotion: "Terrestre",
        bonuses: [
            { action: "Correr", bonus: "+20" },
            { action: "Pensar", bonus: "+15" }, // Corrigido
            { action: "Morder", bonus: "+15" },
            { action: "Percepção", bonus: "+15" }, // Corrigido
            { action: "Socializar", bonus: "+15" }, 
            { action: "Esquiva", bonus: "+15" }, 
            { action: "Agachar", bonus: "+15" },
            { action: "Rastrear", bonus: "+15" },  
            { action: "Saltar", bonus: "+15" },
            { action: "Cheirar", bonus: "+10" }, 
            { action: "Luta", bonus: "+10" },
            { action: "Contra-ataque", bonus: "+10" },
            { action: "Lembrar", bonus: "+10" }, 
            { action: "Percepção Inimiga", bonus: "+10" }, // Corrigido
            { action: "Preparar Ação", bonus: "+10" }, // Corrigido
            { action: "Reflexo", bonus: "+10" },      
            { action: "Garra", bonus: "+10" },
            { action: "Furtividade", bonus: "+10" },
            { action: "Tática", bonus: "+10" }, 
            { action: "Fortitude", bonus: "+5" }, 
            { action: "Resistência", bonus: "+5" },
            { action: "Conhecimento de Atualidades", bonus: "+5" }, // Corrigido
            { action: "Vontade", bonus: "+5" },   
        ],
        attacks: [
            { 
                name: "Garra do Saltador", 
                hit: "3d20+15", 
                damage: "Causa 6d8+3d6 pontos de dano",
                passive: "Causa 1d12 de Sangramento por 1d4(R)"
            },
            { 
                name: "Mordida Rápida", 
                hit: "3d20+15", 
                damage: "Causa 3d10+2d6 pontos de dano",
                passive: "Acertar concede um bônus em uma Reação de +5 na Defesa."
            }
        ],
        skills: [
            { 
                name: "Caçada em Grupo", 
                desc: "Quando em grupo com outros Velociraptors, cada um ganha +2 em acerto e na Defesa, conforme planejaram juntos a caçada e aumenta o dano para aliados próximos em +2D de dano, além de +2D de Crítico." // Corrigido
            },
            { 
                name: "Salto Predatório", 
                desc: "Pode saltar sobre obstáculos baixos e atacar do ar com vantagem de +5 contra alvos menores, no seu primeiro ataque. Além de Decorar um de seus bônus na luta da Cena e desarmar o alvo, ficando imobilizado até sair do Raptor." // Corrigido
            }
        ],
        passive: {
            name: "Pesadelo em Grupo",
            desc: "Velociraptors em bando são muito mais perigosos do que separados. Quando estão em grupo, conseguem trocar informações de forma tática e precisa, com seus rugidos de comunicação, fornecendo +10 em Percepção para um aliado próximo que ouviu e entendeu seu chamado ou grunhido de Alerta." // Corrigido
        },
        elements: [
            { name: "Morte", desc: "Velociraptors de Morte são muito mais Mortais, causando +2D de dano em suas garras e +1D de Sangramento." }, // Corrigido
            { name: "Fogo", desc: "Velocirraptores de Fogo causam dano de fogo em qualquer ataque físico, além de deixar rastros em seus saltos." },
            { name: "Caveira", desc: "Velocirraptores da Caveira são muito mais Mortais, ganham +30 PV, +2D de dano em todos os ataques físicos e +5 Luta, +5 Contra-ataque. Todos esses Buffs são amplamente ativos em Cenas com Humanos como presa." } // Corrigido
        ],
        brutalFight: {
            category: "Assassino",
            role: "Causa dano alto, mas é frágil.", // Corrigido
            size: "Ocupa 1 espaço",
            attributes: {
                agi: 4,
                for: 2,
                int: 4,
                set: 3,
                vig: 2
            },
            stats: {
                hp: 120,
                armor: 50,
                beastHp: 2,
                beastStr: 3
            },
            skills: [
                { 
                    name: "Ataque Furtivo", 
                    position: "Qualquer",
                    reach: "Auto",
                    hit: "Auto",
                    desc: "Ganha o efeito Furtivo, além de causar +6d6 pontos de dano e ter alcance de 4 espaços na Mordida." // Corrigido
                },
                { 
                    name: "Salto Mortal", 
                    position: "Frente 1, 2",
                    reach: "Alcança 2 da frente",
                    hit: "3d20+15",
                    desc: "Causa 6d8+3d6 pontos de dano e avança 1 para frente."
                },
                { 
                    name: "Chamado do Bando", 
                    position: "Qualquer",
                    reach: "Todos os aliados",
                    hit: "Auto",
                    desc: "Concede +5 em Iniciativa para toda a equipe por 1 rodada, além de Marcar um alvo em qualquer espaço, aplicando o efeito Marcado."
                },
                { 
                    name: "Golpe Duplo", 
                    position: "Frente 1, 2",
                    reach: "Alcança 3 da frente",
                    hit: "3d20+15",
                    desc: "Dois ataques rápidos que causam 2d12+3d6 pontos de dano cada."
                }
            ],
            beastPassive: {
                name: "Caçador em Grupo",
                desc: "Quando um Raptor entra em Campo, faz com que todas as cartas parentes da família Raptor ganhem +1 de poder de Ataque." // Corrigido
            }
        }
    },
    {
        id: 4,
        name: "Acrocantossauro",
        title: "O Tanque de Dentes",
        image: "../imagens/icon_acrocantossauro.png",
        thumbnail: "../imagens/icon_acrocantossauro.png",
        category: "Dinossauro",
        biome: ["Taiga", "Montanha", "Floresta Vermelha"],
        environment: "land", // Mantido "land"
        height: "6m",
        length: "12m",
        weight: "8 ton",
        diet: "Carnívoro",
        behavior: "Agressivo",
        difficulty: "Difícil",
        habitat: "Campos, Montanha, Floresta Vermelha",
        attributes: {
            agi: 2,
            for: 4,
            int: 2,
            set: 3,
            vig: 6
        },
        stats: {
            hp: 350,
            armor: 200,
            beastHp: 7,
            beastStr: 3
        },
        locomotion: "Terrestre",
        bonuses: [
            { action: "Bloqueio", bonus: "+25" },
            { action: "Resistência", bonus: "+25" },
            { action: "Fortitude", bonus: "+25" },
            { action: "Contra-ataque", bonus: "+20" },
            { action: "Pancada", bonus: "+20" },
            { action: "Força Bruta", bonus: "+20" }, // Corrigido
            { action: "Morder", bonus: "+20" },
            { action: "Intimidar", bonus: "+20" },
            { action: "Rugir", bonus: "+20" },
            { action: "Cheirar", bonus: "+20" },
            { action: "Luta", bonus: "+15" },
            { action: "Agarrar", bonus: "+15" },
            { action: "Percepção", bonus: "+10" }, // Corrigido
            { action: "Esquiva", bonus: "+10" },
            { action: "Vontade", bonus: "+10" },
            { action: "Rastrear", bonus: "+5" },
            { action: "Furtividade", bonus: "+5" },
            { action: "Correr", bonus: "+5" },
            { action: "Pensar", bonus: "+5" },
            
        ],
        attacks: [
            { 
                name: "Investida com Dentes", 
                hit: "3d20+15", 
                damage: "Causa 8d10+35 pontos de dano",
                passive: "Causa uma repulsão no alvo, empurrando-o para trás em 3 metros. Após acertar, ganha +5 no próximo bloqueio." // Corrigido
            },
            { 
                name: "Golpe de Corpo", 
                hit: "3d20+15", 
                damage: "Causa 9d12+6d8 pontos de dano",
                passive: "Causa repulsão em todos os inimigos atingidos, fazendo com que eles fiquem Lentos e com Debuff de -1 Agi e For." // Corrigido
            }
        ],
        skills: [
            { 
                name: "Grito de Colosso", 
                desc: "O Acro pode gastar 1 rodada gritando, acumulando todo o dano em uma barra interna e reduzindo o dano pela metade. Cada acerto diferente concede um acúmulo adicional na Barra de Frenesi. Enquanto grita, recebe +1 Reação de Bloqueio, além de +30 de Armadura temporária." // Corrigido
            },
            { 
                name: "Grito de Fera", 
                desc: "O Acro pode gastar 1 rodada gritando, buffando aliados por toda a Cena com o mesmo acúmulo de Frenesi, além de causar Lentidão e -2 Agi contra inimigos. DT Intimidação-Vontade. Caso fracassem, andam atordoados até o grito por 1 turno." // Corrigido
            }
        ],
        passive: {
            name: "Adrenalina de Frenesi",
            desc: "Sempre que um aliado ou o próprio recebe o efeito Frenesi, ganha +1 em qualquer teste de Bloqueio ou Força, acumulando com os estoques de seus rugidos. Uma vez gastos, o bônus zera novamente." // Corrigido
        },
        elements: [
            { name: "Fogo", desc: "Acrocantossauro fica em chamas enquanto ruge. Caso chegue a 8 estoques de Frenesi, pode liberar uma mordida de fogo especial em grito." }, // Corrigido
            { name: "Hipo", desc: "Acrocantossauro fica em uma versão anciã, ganhando +70 PV, +70 de Armadura e reduz todo o dano 2,5x em seu grito." }, // Corrigido
            { name: "Elemental", desc: "Acrocantossauro fica corrompido de Elemento, virando um pequeno Chefe, com +1D em testes de For e Vig, +5 em todas as categorias de testes e seus ataques causam o efeito Repulsão, Fraco em -1D em testes e -5 em bônus. Quando atinge Frenesi, explode em energia corrompida, causando 9d8+20 pontos de dano Verdadeiro." } // Corrigido
        ],
        brutalFight: {
            category: "Vanguardista",
            role: "Tanque que protege aliados.", // Corrigido
            size: "Ocupa 2 espaços",
            attributes: {
                agi: 2,
                for: 4,
                int: 2,
                set: 3,
                vig: 6
            },
            stats: {
                hp: 350,
                armor: 200,
                beastHp: 7,
                beastStr: 3
            },
            skills: [
                { 
                    name: "Muro de Corpo", 
                    position: "Qualquer", // Corrigido
                    reach: "Qualquer Aliado",
                    hit: "Auto",
                    desc: "Protege um aliado, recebendo o efeito Protegido. O alvo recebe +1D de Vigor e +5 em testes de Vig, concedendo +10 de Armadura até o seu limite Pessoal." // Corrigido
                },
                { 
                    name: "Investida Protetora", 
                    position: "Atrás 3, 4",
                    reach: "Alcança 2 da frente juntos",
                    hit: "3d20+15",
                    desc: "Causa 8d10+4d8 pontos de dano e empurra inimigos 2 espaços para trás."
                },
                { 
                    name: "Grito de Desafio", 
                    position: "Qualquer",
                    reach: "Alcança os 4",
                    hit: "Auto",
                    desc: "Força inimigos a atacá-lo por 1 rodada, reduzindo o dano que ele recebe em 50%. Porém o Acro perde a rodada, tentando bloquear de forma automática na retomada de Reação Extra." // Corrigido
                },
                { 
                    name: "Mordida", 
                    position: "Atrás 3, 4",
                    reach: "Alcança 1 da Frente",
                    hit: "3d20+20",
                    desc: "Causa uma Mordida de 8d10+35 de dano, que empurra o alvo 1 espaço para trás."
                }
            ],
            beastPassive: {
                name: "Frenesi de Guerra",
                desc: "Quando o Acrocantossauro entra em Campo, ele grita, fazendo com que no próximo turno as cartas fiquem com o efeito de Frenesi. Cartas que morrerem no turno com o efeito, atacam mais uma vez antes de morrer." // Corrigido
            }
        }
    },
      {
        id: 5,
        name: "Dodô",
        title: "A Super Galinha",
        image: "../imagens/icon_dodo.png",
        thumbnail: "../imagens/icon_dodo.png",
        category: "Dinossauro",
        biome: ["Bosque", "Campos", "Floresta Vermelha", "Planalto","Montanha","Taiga","Bosque","Praia","Deserto","Tundra","Pântano"],
        environment: "land", // Mantido "land"
        height: "1m",
        length: "4m",
        weight: "30 kg",
        diet: "Herbívoro",
        behavior: "passivo",
        difficulty: "Iniciante",
        habitat: "Quase todas as regiões do Ark.",
        attributes: {
            agi: 1,
            for: 1,
            int: 1,
            set: 1,
            vig: 1
        },
        stats: {
            hp: 15,
            armor: 10,
            beastHp: 1,
            beastStr: 0
        },
        locomotion: "Terrestre",
        bonuses: [
            { action: "Acasalar", bonus: "+20" },
            { action: "Fortitude", bonus: "+5" },
            { action: "Comer", bonus: "+5" },
            { action: "Dormir", bonus: "+5" },
            { action: "Cantar", bonus: "+5" },
            { action: "Incubar", bonus: "+5" },
            { action: "Rastrear", bonus: "+5" },
            { action: "-5 Correr", bonus: "+5" },
           
        ],
        attacks: [
            { 
                name: "Bico", 
                hit: "1d20", 
                damage: "Causa 1d8",
                passive: "Nula"
            },
            { 
                name: "Garra", 
                hit: "1d20", 
                damage: "Causa 2d4",
                passive: "Nula"
            }
        ],
        skills: [
            { 
                name: "Amizade em Grupo", 
                desc: "Quando estão juntos, Dodôs se mantém mais confiantes e ganham um comportamneto territorial " // Corrigido
            },
            { 
                name: "Salto Predatório", 
                desc: "Pode saltar sobre obstáculos baixos e atacar do ar com vantagem de +5 contra alvos menores, no seu primeiro ataque. Além de Decorar um de seus bônus na luta da Cena e desarmar o alvo, ficando imobilizado até sair do Raptor." // Corrigido
            }
        ],
        passive: {
            name: "Pesadelo em Grupo",
            desc: "Velociraptors em bando são muito mais perigosos do que separados. Quando estão em grupo, conseguem trocar informações de forma tática e precisa, com seus rugidos de comunicação, fornecendo +10 em Percepção para um aliado próximo que ouviu e entendeu seu chamado ou grunhido de Alerta." // Corrigido
        },
        elements: [
            { name: "Morte", desc: "Velociraptors de Morte são muito mais Mortais, causando +2D de dano em suas garras e +1D de Sangramento." }, // Corrigido
            { name: "Fogo", desc: "Velocirraptores de Fogo causam dano de fogo em qualquer ataque físico, além de deixar rastros em seus saltos." },
            { name: "Caveira", desc: "Velocirraptores da Caveira são muito mais Mortais, ganham +30 PV, +2D de dano em todos os ataques físicos e +5 Luta, +5 Contra-ataque. Todos esses Buffs são amplamente ativos em Cenas com Humanos como presa." } // Corrigido
        ],
        brutalFight: {
            category: "Assassino",
            role: "Causa dano alto, mas é frágil.", // Corrigido
            size: "Ocupa 1 espaço",
            attributes: {
                agi: 4,
                for: 2,
                int: 4,
                set: 3,
                vig: 2
            },
            stats: {
                hp: 120,
                armor: 50,
                beastHp: 2,
                beastStr: 3
            },
            skills: [
                { 
                    name: "Ataque Furtivo", 
                    position: "Qualquer",
                    reach: "Auto",
                    hit: "Auto",
                    desc: "Ganha o efeito Furtivo, além de causar +6d6 pontos de dano e ter alcance de 4 espaços na Mordida." // Corrigido
                },
                { 
                    name: "Salto Mortal", 
                    position: "Frente 1, 2",
                    reach: "Alcança 2 da frente",
                    hit: "3d20+15",
                    desc: "Causa 6d8+3d6 pontos de dano e avança 1 para frente."
                },
                { 
                    name: "Chamado do Bando", 
                    position: "Qualquer",
                    reach: "Todos os aliados",
                    hit: "Auto",
                    desc: "Concede +5 em Iniciativa para toda a equipe por 1 rodada, além de Marcar um alvo em qualquer espaço, aplicando o efeito Marcado."
                },
                { 
                    name: "Golpe Duplo", 
                    position: "Frente 1, 2",
                    reach: "Alcança 3 da frente",
                    hit: "3d20+15",
                    desc: "Dois ataques rápidos que causam 2d12+3d6 pontos de dano cada."
                }
            ],
            beastPassive: {
                name: "Caçador em Grupo",
                desc: "Quando um Raptor entra em Campo, faz com que todas as cartas parentes da família Raptor ganhem +1 de poder de Ataque." // Corrigido
            }
        }
    },
];

// Biomes data with image paths (COMPLETO com Pântano adicionado)
const biomesData = [
    // Land biomes (Terra)
    { name: "Campos", icon: "../imagens/icon_campos.png", type: "land" },
    { name: "Planalto", icon: "../imagens/icon_planicie.png", type: "land" },
    { name: "Montanha", icon: "../imagens/icon_montanha.png", type: "land" },
    { name: "Taiga", icon: "../imagens/icon_taiga.png", type: "land" },
    { name: "Bosque", icon: "../imagens/icon_bosque.png", type: "land" },
    { name: "Caverna", icon: "../imagens/icon_caverna.png", type: "land" },
    { name: "Praia", icon: "../imagens/icon_praia.png", type: "land" },
    { name: "Deserto", icon: "../imagens/icon_deserto.png", type: "land" },
    { name: "Tundra", icon: "../imagens/icon_tundra.png", type: "land" },
    { name: "Floresta Vermelha", icon: "../imagens/icon_floresta_vermelha.png", type: "land" },
    { name: "Floresta de Cogumelo", icon: "../imagens/icon_floresta_cogumelos.png", type: "land" },
    { name: "Floresta Misteriosa", icon: "../imagens/icon_floresta_misteriosa.png", type: "land" },
    { name: "Cogumelos Abissais", icon: "../imagens/icon_fungos.png", type: "land" },
    { name: "Pântano", icon: "../imagens/icon_pantano.png", type: "land" }, 
    
    // Water biomes (Mar)
    { name: "Oceanos", icon: "../imagens/icon_mar.png", type: "water" },
    { name: "Zonas de Coral", icon: "../imagens/icon_bioma_coral.png", type: "water" },
    { name: "Zonas Abissais", icon: "../imagens/icon_abismo.png", type: "water" },
    { name: "Zonas Vulcânicas", icon: "../imagens/icon_bioma_vulcao.png", type: "water" },
    { name: "Dunas Submarinas", icon: "../imagens/icon_bioma_dunas.png", type: "water" },
    { name: "Zonas de Cogumelos", icon: "../imagens/icon_bioma_cogumelo.png", type: "water" },
    { name: "Campos Vermelhos", icon: "../imagens/icon_campos_vermelho.png", type: "water" },
    { name: "Labirintos Submarinos", icon: "../imagens/icon_bioma_labirinto.png", type: "water" },
    { name: "Corais Profundos", icon: "../imagens/icon_coral_abissal.png", type: "water" },
    { name: "Zonas de Lava", icon: "../imagens/icon_bioma_lava.png", type: "water" },
    { name: "Void", icon: "../imagens/icon_void.png", type: "water" },
    { name: "Caverna de Cristais", icon: "../imagens/icon_bioma_critsal.png", type: "water" },
    
    // Skull biomes (Caveira)
    { name: "Praias Macabras", icon: "../imagens/icon_praias_macabras.png", type: "skull" },
    { name: "Campos de Ossos", icon: "../imagens/icon_camapos_ossos.png", type: "skull" },
    { name: "Pântanos Vermelhos", icon: "../imagens/icon_pantano_vermelho.png", type: "skull" },
    { name: "Floresta Sombria", icon: "../imagens/icon_floresta_sombria.png", type: "skull" },
    { name: "Reino do Leão", icon: "../imagens/icon_rei_leao.png", type: "skull" },
    { name: "Cavernas Sombrias", icon: "../imagens/icon_caverna_sombria.png", type: "skull" }
];

// DOM Elements
const biomesContainer = document.getElementById('biomes-container');
const landToggle = document.getElementById('land-toggle');
const waterToggle = document.getElementById('water-toggle');
const skullToggle = document.getElementById('skull-toggle');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const listViewBtn = document.getElementById('list-view-btn');
const cardViewBtn = document.getElementById('card-view-btn');
const listView = document.getElementById('list-view');
const cardView = document.getElementById('card-view');
const creatureList = document.getElementById('creature-list');
const cardViewContainer = document.getElementById('card-view');
const modal = document.getElementById('creature-modal');
const modalClose = document.getElementById('modal-close');
const normalSheetBtn = document.getElementById('normal-sheet-btn');
const brutalSheetBtn = document.getElementById('brutal-sheet-btn');
const normalSheet = document.getElementById('normal-sheet');
const brutalSheet = document.getElementById('brutal-sheet');
const modalBgImage = document.getElementById('modal-bg-image');

// State variables
let currentEnvironment = 'land';
let currentView = 'list';
let currentBiomeFilter = null;
let currentSearchFilter = '';
let currentCreatureData = null;

// Initialize the page
function init() {
    renderBiomes();
    renderCreatures();
    setupEventListeners();
}

// Render biomes icons with images
function renderBiomes() {
    biomesContainer.innerHTML = '';
    
    const filteredBiomes = biomesData.filter(biome => biome.type === currentEnvironment);
    
    filteredBiomes.forEach(biome => {
        const biomeElement = document.createElement('div');
        biomeElement.className = 'biome-icon';
        biomeElement.dataset.biome = biome.name;
        
        const img = document.createElement('img');
        img.src = biome.icon;
        img.alt = biome.name;
        img.title = biome.name;
        
        biomeElement.appendChild(img);
        
        biomeElement.addEventListener('click', () => {
            // Toggle active state
            document.querySelectorAll('.biome-icon').forEach(icon => {
                icon.classList.remove('active');
            });
            
            if (currentBiomeFilter === biome.name) {
                currentBiomeFilter = null;
            } else {
                biomeElement.classList.add('active');
                currentBiomeFilter = biome.name;
            }
            
            renderCreatures();
        });
        
        biomesContainer.appendChild(biomeElement);
    });
}

// Render creatures based on filters
function renderCreatures() {
    // Filter creatures
    let filteredCreatures = creaturesData.filter(creature => {
        // Environment filter
        if (currentEnvironment === 'skull') {
            // Para ambiente skull, mostre apenas criaturas que tenham elementos "Caveira"
            const hasSkullElement = creature.elements.some(element => 
                element.name.toLowerCase().includes('caveira') ||
                element.name.toLowerCase().includes('sombra')
            );
            if (!hasSkullElement) return false;
        } else if (creature.environment !== currentEnvironment) {
            return false;
        }
        
        // Biome filter
        if (currentBiomeFilter && !creature.biome.includes(currentBiomeFilter)) return false;
        
        // Search filter
        if (currentSearchFilter && !creature.name.toLowerCase().includes(currentSearchFilter.toLowerCase())) {
            return false;
        }
        
        return true;
    });
    
    // Sort alphabetically
    filteredCreatures.sort((a, b) => a.name.localeCompare(b.name));
    
    // Clear current lists
    creatureList.innerHTML = '';
    cardViewContainer.innerHTML = '';
    
    // Render list view
    filteredCreatures.forEach(creature => {
        // List item
        const listItem = document.createElement('li');
        listItem.className = 'creature-item';
        listItem.dataset.id = creature.id;
        
        // Create icon with creature thumbnail image
        const iconDiv = document.createElement('div');
        iconDiv.className = 'creature-icon';
        
        const iconImg = document.createElement('img');
        iconImg.src = creature.thumbnail || creature.image;
        iconImg.alt = creature.name;
        iconImg.title = creature.name;
        iconImg.onerror = function() {
            if (creature.thumbnail && this.src !== creature.image) {
                this.src = creature.image;
            } else {
                this.style.display = 'none';
                const fallbackIcon = document.createElement('img');
                fallbackIcon.src = '../imagens/icons/default_dino.png';
                fallbackIcon.alt = creature.name;
                fallbackIcon.style.width = '100%';
                fallbackIcon.style.height = '100%';
                fallbackIcon.style.objectFit = 'cover';
                iconDiv.appendChild(fallbackIcon);
            }
        };
        
        iconDiv.appendChild(iconImg);
        
        const nameDiv = document.createElement('div');
        nameDiv.className = 'creature-name';
        nameDiv.textContent = creature.name;
        
        listItem.appendChild(iconDiv);
        listItem.appendChild(nameDiv);
        
        listItem.addEventListener('click', () => openModal(creature));
        creatureList.appendChild(listItem);
        
        // Card item
        const cardItem = document.createElement('div');
        cardItem.className = 'creature-card';
        cardItem.dataset.id = creature.id;
        
        // Card image
        const cardImageDiv = document.createElement('div');
        cardImageDiv.className = 'card-image';
        
        const cardImg = document.createElement('img');
        cardImg.src = creature.image;
        cardImg.alt = creature.name;
        cardImg.onerror = function() {
            this.style.display = 'none';
            const fallbackIcon = document.createElement('img');
            fallbackIcon.src = '../imagens/icons/default_dino.png';
            fallbackIcon.alt = creature.name;
            fallbackIcon.style.width = '100%';
            fallbackIcon.style.height = '100%';
            fallbackIcon.style.objectFit = 'cover';
            cardImageDiv.appendChild(fallbackIcon);
        };
        
        cardImageDiv.appendChild(cardImg);
        
        // Card name
        const cardNameDiv = document.createElement('div');
        cardNameDiv.className = 'card-name';
        cardNameDiv.textContent = creature.name;
        
        cardItem.appendChild(cardImageDiv);
        cardItem.appendChild(cardNameDiv);
        
        cardItem.addEventListener('click', () => openModal(creature));
        cardViewContainer.appendChild(cardItem);
    });
    
    // Show/hide views based on current view
    if (currentView === 'list') {
        listView.classList.add('active');
        cardView.classList.remove('active');
    } else {
        listView.classList.remove('active');
        cardView.classList.add('active');
    }
}

// Open modal with creature data
function openModal(creature) {
    currentCreatureData = creature;
    
    // Set images
    const creaturePhoto = document.getElementById('creature-photo');
    const brutalCreaturePhoto = document.getElementById('brutal-creature-photo');
    
    if (creature.image) {
        creaturePhoto.src = creature.image;
        creaturePhoto.style.display = 'block';
        brutalCreaturePhoto.src = creature.image;
        brutalCreaturePhoto.style.display = 'block';
        modalBgImage.style.backgroundImage = `url(${creature.image})`;
    } else {
        creaturePhoto.style.display = 'none';
        brutalCreaturePhoto.style.display = 'none';
        modalBgImage.style.backgroundImage = 'none';
    }
    
    // Set basic info
    document.getElementById('modal-name').textContent = creature.name;
    document.getElementById('modal-name-full').textContent = creature.name;
    document.getElementById('brutal-modal-name-full').textContent = creature.name;
    document.getElementById('modal-title').textContent = creature.title;
    document.getElementById('info-category').textContent = creature.category;
    document.getElementById('info-habitat').textContent = creature.habitat;
    document.getElementById('info-height').textContent = creature.height;
    document.getElementById('info-length').textContent = creature.length;
    document.getElementById('info-weight').textContent = creature.weight;
    document.getElementById('info-diet').textContent = creature.diet || "N/A";
    document.getElementById('info-behavior').textContent = creature.behavior || "N/A";
    document.getElementById('info-difficulty').textContent = creature.difficulty;
    document.getElementById('info-locomotion').textContent = creature.locomotion;
    
    // Set attributes
    document.getElementById('attr-agi').textContent = creature.attributes.agi;
    document.getElementById('attr-for').textContent = creature.attributes.for;
    document.getElementById('attr-int').textContent = creature.attributes.int;
    document.getElementById('attr-set').textContent = creature.attributes.set;
    document.getElementById('attr-vig').textContent = creature.attributes.vig;
    
    document.getElementById('brutal-attr-agi').textContent = creature.brutalFight.attributes.agi;
    document.getElementById('brutal-attr-for').textContent = creature.brutalFight.attributes.for;
    document.getElementById('brutal-attr-int').textContent = creature.brutalFight.attributes.int;
    document.getElementById('brutal-attr-set').textContent = creature.brutalFight.attributes.set;
    document.getElementById('brutal-attr-vig').textContent = creature.brutalFight.attributes.vig;
    
    // Set stats
    document.getElementById('stat-hp').textContent = creature.stats.hp;
    document.getElementById('stat-armor').textContent = creature.stats.armor;
    document.getElementById('stat-beast-hp').textContent = creature.stats.beastHp;
    document.getElementById('stat-beast-str').textContent = creature.stats.beastStr;
    
    document.getElementById('brutal-stat-hp').textContent = creature.brutalFight.stats.hp;
    document.getElementById('brutal-stat-armor').textContent = creature.brutalFight.stats.armor;
    document.getElementById('brutal-beast-hp').textContent = creature.brutalFight.stats.beastHp;
    document.getElementById('brutal-beast-str').textContent = creature.brutalFight.stats.beastStr;
    
    // Set bonuses
    const bonusList = document.getElementById('bonus-list');
    bonusList.innerHTML = '';
    creature.bonuses.forEach(bonus => {
        const bonusItem = document.createElement('div');
        bonusItem.className = 'bonus-item';
        bonusItem.innerHTML = `
            <span>${bonus.action}</span>
            <span>${bonus.bonus}</span>
        `;
        bonusList.appendChild(bonusItem);
    });
    
    // Set attacks
    const attacksList = document.getElementById('attacks-list');
    attacksList.innerHTML = '';
    creature.attacks.forEach(attack => {
        const attackItem = document.createElement('div');
        attackItem.className = 'attack';
        attackItem.innerHTML = `
            <div class="attack-header">
                <span>${attack.name}</span>
                <span>${attack.hit}</span>
            </div>
            <div class="attack-desc">
                <strong>Dano:</strong> ${attack.damage}<br>
                <strong>Passiva:</strong> ${attack.passive}
            </div>
        `;
        attacksList.appendChild(attackItem);
    });
    
    // Set skills
    const skillsList = document.getElementById('skills-list');
    skillsList.innerHTML = '';
    creature.skills.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill';
        skillItem.innerHTML = `
            <div class="skill-header">
                <span>${skill.name}</span>
            </div>
            <div class="skill-desc">${skill.desc}</div>
        `;
        skillsList.appendChild(skillItem);
    });
    
    // Set passive
    document.getElementById('passive-name').textContent = creature.passive.name;
    document.getElementById('passive-desc').textContent = creature.passive.desc;
    
    // Set elements (show up to 3)
    const elementsGrid = document.getElementById('elements-grid');
    elementsGrid.innerHTML = '';
    creature.elements.forEach((element, index) => {
        if (index < 3) {
            const elementItem = document.createElement('div');
            elementItem.className = 'element';
            elementItem.innerHTML = `
                <div class="element-name">${element.name}</div>
                <div class="element-desc">${element.desc}</div>
            `;
            elementsGrid.appendChild(elementItem);
        }
    });
    
    // Set brutal fight data
    document.getElementById('brutal-category').textContent = creature.brutalFight.category;
    document.getElementById('brutal-role').textContent = creature.brutalFight.role;
    document.getElementById('brutal-size').textContent = creature.brutalFight.size || "Ocupa 1 espaço";
    
    // Set brutal skills
    const brutalSkillsList = document.getElementById('brutal-skills-list');
    brutalSkillsList.innerHTML = '';
    creature.brutalFight.skills.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill';
        skillItem.innerHTML = `
            <div class="skill-header">
                <span>${skill.name}</span>
                <span>${skill.hit}</span>
            </div>
            <div class="skill-desc">
                <strong>Posicionamento:</strong> ${skill.position}<br>
                <strong>Alcance:</strong> ${skill.reach}<br>
                ${skill.desc}
            </div>
        `;
        brutalSkillsList.appendChild(skillItem);
    });
    
    // Set brutal beast passive
    document.getElementById('brutal-beast-passive-name').textContent = creature.brutalFight.beastPassive.name;
    document.getElementById('brutal-beast-passive-desc').textContent = creature.brutalFight.beastPassive.desc;
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Reset to normal sheet view
    normalSheetBtn.classList.add('active');
    brutalSheetBtn.classList.remove('active');
    normalSheet.style.display = 'grid';
    brutalSheet.style.display = 'none';
}

// Setup event listeners
function setupEventListeners() {
    // Environment toggles
    landToggle.addEventListener('click', () => {
        setEnvironment('land');
    });
    
    waterToggle.addEventListener('click', () => {
        setEnvironment('water');
    });
    
    skullToggle.addEventListener('click', () => {
        setEnvironment('skull');
    });
    
    // Search functionality
    searchInput.addEventListener('input', () => {
        currentSearchFilter = searchInput.value;
        renderCreatures();
    });
    
    searchBtn.addEventListener('click', () => {
        currentSearchFilter = searchInput.value;
        renderCreatures();
    });
    
    // View toggles
    listViewBtn.addEventListener('click', () => {
        setView('list');
    });
    
    cardViewBtn.addEventListener('click', () => {
        setView('card');
    });
    
    // Modal controls
    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Sheet switching in modal
    normalSheetBtn.addEventListener('click', () => {
        normalSheetBtn.classList.add('active');
        brutalSheetBtn.classList.remove('active');
        normalSheet.style.display = 'grid';
        brutalSheet.style.display = 'none';
    });
    
    brutalSheetBtn.addEventListener('click', () => {
        brutalSheetBtn.classList.add('active');
        normalSheetBtn.classList.remove('active');
        brutalSheet.style.display = 'grid';
        normalSheet.style.display = 'none';
    });
}

// Set environment and update UI
function setEnvironment(env) {
    currentEnvironment = env;
    
    // Update toggle buttons
    document.querySelectorAll('.env-icon').forEach(icon => {
        icon.classList.remove('active');
    });
    
    if (env === 'land') {
        landToggle.classList.add('active');
    } else if (env === 'water') {
        waterToggle.classList.add('active');
    } else if (env === 'skull') {
        skullToggle.classList.add('active');
    }
    
    // Clear biome filter when switching environments
    currentBiomeFilter = null;
    document.querySelectorAll('.biome-icon').forEach(icon => {
        icon.classList.remove('active');
    });
    
    // Re-render biomes and creatures
    renderBiomes();
    renderCreatures();
}

// ========================
// FUNÇÃO PARA ABRIR CRIATURA POR ID DA URL
// ========================
function openCreatureByIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const creatureId = urlParams.get('creature');
    
    if (creatureId) {
        const creature = creaturesData.find(c => c.id === parseInt(creatureId));
        if (creature) {
            // Aguardar um pouco para garantir que tudo está carregado
            setTimeout(() => openModal(creature), 500);
        }
    }
}

// E modifique o init() para:
function init() {
    renderBiomes();
    renderCreatures();
    setupEventListeners();
    
    // Verificar se há criatura para abrir da URL
    openCreatureByIdFromURL();
}

// Set view and update UI
function setView(view) {
    currentView = view;
    
    // Update toggle buttons
    if (view === 'list') {
        listViewBtn.classList.add('active');
        cardViewBtn.classList.remove('active');
    } else {
        listViewBtn.classList.remove('active');
        cardViewBtn.classList.add('active');
    }
    
    renderCreatures();
}

// Initialize the application
document.addEventListener('DOMContentLoaded', init);

window.CreaturesData = creaturesData;
window.BiomesData = biomesData;

console.log('Dados de criaturas e biomas disponíveis globalmente');