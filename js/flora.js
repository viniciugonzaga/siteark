// ========================
// Menu (Navbar)
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

if (openMenuButton && closeMenuButton && menu) {
    openMenuButton.addEventListener('click', () => {
        menu.classList.remove('hidden');
    });

    closeMenuButton.addEventListener('click', () => {
        menu.classList.add('hidden');
    });
}

if (rollDiceButton && diceSelect && rollList) {
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
}

if (clearRollsButton) {
    clearRollsButton.addEventListener('click', () => {
        playerScores = {};
        rollList.innerHTML = '';
        totalDisplay.textContent = 'Total geral: 0';
    });
}

function goToPage(page) {
    window.location.href = page;
}

// DADOS COMPLETOS DOS BIOMAS DO ARK
const biomas = [
    {
        id: 1,
        nome: "Campos",
        tipo: "comum",
        regiao: "campos-ouro",
        corGlow: "rgba(255, 215, 0, 0.6)",
        corParticula: "rgba(255, 215, 0, 0.4)",
        imagem: "../imagens/bioma_campos.jpg",
        descricaoCurta: "Vastas extensões de gramíneas douradas sob o sol do Ark",
        descricaoCompleta: "Os Campos são biomas abertos e ensolarados, caracterizados por vastas extensões de gramíneas douradas que ondulam ao vento. São áreas relativamente seguras para sobreviventes iniciantes, com recursos básicos abundantes e criaturas geralmente pacíficas.",
        vegetacao: [
            "Gramíneas altas e douradas",
            "Arbustos de bagas variadas",
            "Flores silvestres coloridas",
            "Pequenas árvores frutíferas",
            "Plantas medicinais rasteiras"
        ],
        animais: [
            "Parassaurolophus - Herbívoros pacíficos",
            "Triceratops - Defensivos em grupo",
            "Dilophossaurus - Caçadores em bandos",
            "Dodos - Passivos e abundantes",
            "Pteranodons - Sobrevoo constante"
        ],
        comportamento: "Criaturas geralmente pacíficas, com comportamento defensivo quando ameaçadas. Herbívoros pastam livremente, enquanto pequenos predadores caçam em bandos.",
        recursos: ["Madeira básica", "Pedra", "Flores", "Bagas", "Fibra"]
    },
    {
        id: 2,
        nome: "Planalto",
        tipo: "comum", 
        regiao: "condado",
        corGlow: "rgba(139, 69, 19, 0.6)",
        corParticula: "rgba(160, 82, 45, 0.4)",
        imagem: "../imagens/bioma_planalto.jpg",
        descricaoCurta: "Terras altas com visão estratégica e recursos minerais",
        descricaoCompleta: "Os Planaltos são áreas elevadas com visão privilegiada da paisagem. Caracterizam-se por formações rochosas expostas, ventos constantes e temperaturas mais amenas. Ideais para construções defensivas.",
        vegetacao: [
            "Arbustos resistentes ao vento",
            "Gramíneas baixas e duras",
            "Musgos e líquens rochosos",
            "Pequeiras coníferas",
            "Plantas alpinas"
        ],
        animais: [
            "Mamute - Herbívoros gigantes pacíficos",
            "Sabre-tooth - Predadores territoriais",
            "Argentavis - Aves de rapina",
            "Ovis - Ovelhas pacíficas",
            "Pulmonoscorpius - Escorpiões agressivos"
        ],
        comportamento: "Animais adaptados a condições mais rigorosas. Predadores são territoriais e caçam em emboscadas. Herbívoros formam manadas para proteção.",
        recursos: ["Metal", "Pedra", "Cristal", "Peles grossas", "Quitina"]
    },
    {
        id: 3,
        nome: "Montanha",
        tipo: "comum",
        regiao: "norte-frio", 
        corGlow: "rgba(192, 192, 192, 0.6)",
        corParticula: "rgba(230, 230, 230, 0.4)",
        imagem: "../imagens/bioma_montanha.jpg",
        descricaoCurta: "Picos nevados com recursos raros e criaturas poderosas",
        descricaoCompleta: "As Montanhas são os picos mais altos do Ark, constantemente cobertos de neve e sujeitos a temperaturas extremas. Abrigam os recursos mais valiosos e as criaturas mais perigosas.",
        vegetacao: [
            "Pinheiros adaptados ao frio",
            "Liquens nas rochas",
            "Musgos resistentes à geada",
            "Arbustos anões",
            "Flores de neve raras"
        ],
        animais: [
            "Rex - Predadores alfa dominantes",
            "Yutyrannus - Tiranossauros com penas",
            "Direwolf - Lobos em alcateia",
            "Yeti - Criaturas lendárias",
            "Pteranodon - Aves de grandes altitudes"
        ],
        comportamento: "Predadores extremamente territoriais e agressivos. Criaturas adaptadas ao frio intenso com comportamentos de caça coordenada.",
        recursos: ["Metal de alta qualidade", "Obsidiana", "Cristal puro", "Peles raras", "Pernas de yeti"]
    },
    {
        id: 4,
        nome: "Taiga",
        tipo: "comum",
        regiao: "norte-frio",
        corGlow: "rgba(34, 139, 34, 0.6)",
        corParticula: "rgba(50, 205, 50, 0.4)",
        imagem: "../imagens/bioma_taiga.jpg",
        descricaoCurta: "Florestas boreais densas com vida adaptada ao frio",
        descricaoCompleta: "A Taiga é caracterizada por florestas densas de coníferas que se estendem pelas regiões mais frias. Um bioma de transição entre as florestas temperadas e a tundra ártica.",
        vegetacao: [
            "Pinheiros e abetos densos",
            "Musgos e samambaias",
            "Arbustos de bagas congeladas",
            "Fungos bioluminescentes",
            "Líquens pendentes"
        ],
        animais: [
            "Megaloceros - Alces gigantes",
            "Direbear - Ursos territoriais",
            "Castoroides - Castores construtores",
            "Thylacoleo - Marsupiais predadores",
            "Otter - Lontras coletoras"
        ],
        comportamento: "Animais adaptados a invernos rigorosos. Comportamentos de hibernação e territorialidade acentuada. Predadores especializados em emboscadas.",
        recursos: ["Madeira de qualidade", "Cimento de castor", "Peles quentes", "Pérolas sílicas", "Cogumelos"]
    },
    {
        id: 5,
        nome: "Pântano",
        tipo: "comum",
        regiao: "floresta-pinheiros",
        corGlow: "rgba(47, 79, 79, 0.6)",
        corParticula: "rgba(95, 158, 160, 0.4)",
        imagem: "../imagens/bioma_pantano.jpg",
        descricaoCurta: "Áreas alagadas com perigos ocultos e recursos únicos",
        descricaoCompleta: "Os Pântanos são áreas úmidas e traiçoeiras, com águas paradas, vegetação densa e criaturas perigosas que se camuflam no ambiente. Um bioma de alto risco e alta recompensa.",
        vegetacao: [
            "Cipós e trepadeiras espessas",
            "Árvores de mangue retorcidas",
            "Plantas carnívoras",
            "Lírios e plantas aquáticas",
            "Fungos venenosos"
        ],
        animais: [
            "Sarcosuchus - Crocodilos gigantes",
            "Titanoboa - Serpentes constritoras",
            "Kaprosuchus - Crocodilos saltadores",
            "Leeches - Sanguessugas parasitas",
            "Piranhas - Peixes predadores"
        ],
        comportamento: "Predadores especializados em emboscadas aquáticas. Comportamento de camuflagem e ataques surpresa. Baixa visibilidade aumenta o perigo.",
        recursos: ["Bio-toxina", "Peles grossas", "Ovos raros", "Plantas medicinais", "Sedimento"]
    },
    {
        id: 6,
        nome: "Bosque",
        tipo: "comum",
        regiao: "bosque-antigo",
        corGlow: "rgba(85, 107, 47, 0.6)",
        corParticula: "rgba(107, 142, 35, 0.4)",
        imagem: "../imagens/bioma_bosque.jpg",
        descricaoCurta: "Florestas mistas com diversidade de vida e recursos",
        descricaoCompleta: "Os Bosques são florestas mistas com grande diversidade de árvores e vida selvagem. Áreas relativamente seguras com boa disponibilidade de recursos básicos e avançados.",
        vegetacao: [
            "Carvalhos e nogueiras",
            "Arbustos frutíferos diversos",
            "Samambaias e vegetação rasteira",
            "Cogumelos comestíveis",
            "Flores silvestres"
        ],
        animais: [
            "Therizinosaurus - Herbívoros defensivos",
            "Raptor - Predadores em bandos",
            "Phiomia - Porcos-domésticos",
            "Iguanodon - Herbívoros velozes",
            "Pegomastax - Coletores irritantes"
        ],
        comportamento: "Equilíbrio entre predadores e presas. Bandos de pequenos predadores caçam herbívoros solitários. Comportamentos territoriais moderados.",
        recursos: ["Madeira diversa", "Frutos silvestres", "Sementes raras", "Fibra abundante", "Plantas"]
    },
    {
        id: 7,
        nome: "Caverna",
        tipo: "comum",
        regiao: "todas",
        corGlow: "rgba(75, 0, 130, 0.6)",
        corParticula: "rgba(138, 43, 226, 0.4)",
        imagem: "../imagens/bioma_caverna.jpg",
        descricaoCurta: "Sistemas subterrâneos com perigos e tesouros únicos",
        descricaoCompleta: "As Cavernas são sistemas subterrâneos complexos que escondem os segredos mais profundos do Ark. Com ecossistemas únicos adaptados à escuridão permanente.",
        vegetacao: [
            "Fungos bioluminescentes",
            "Musgos que brilham no escuro",
            "Plantas carnívoras subterrâneas",
            "Cristais naturais luminosos",
            "Líquens radioativos"
        ],
        animais: [
            "Arthropluera - Centopeias gigantes",
            "Pulmonoscorpius - Escorpiões cavernícolas",
            "Onyc - Morcegos predadores",
            "Titanomyrma - Formigas gigantes",
            "Aberrant Creatures - Variantes mutadas"
        ],
        comportamento: "Criaturas adaptadas à escuridão com sentidos aguçados. Comportamentos de emboscada em território conhecido. Defesa agressiva de territórios.",
        recursos: ["Cristal de caverna", "Pérolas luminosas", "Artefatos antigos", "Recursos aberrantes", "Minérios raros"]
    },
    {
        id: 8,
        nome: "Praia",
        tipo: "comum",
        regiao: "campos-ouro",
        corGlow: "rgba(64, 164, 223, 0.6)",
        corParticula: "rgba(135, 206, 235, 0.4)",
        imagem: "../imagens/bioma_praia.jpg",
        descricaoCurta: "Zonas costeiras com recursos marinhos e criaturas anfíbias",
        descricaoCompleta: "As Praias são as zonas de transição entre a terra e o mar, caracterizadas por areias claras, ondas suaves e uma mistura única de vida terrestre e marinha.",
        vegetacao: [
            "Coqueiros e palmeiras",
            "Algas marinhas encalhadas",
            "Plantas halófitas",
            "Flores de praia resistentes",
            "Arbustos costeiros"
        ],
        animais: [
            "Ichthyosaurus - Golfinhos amigáveis",
            "Megalodon - Tubarões predadores",
            "Carbonemys - Tartarugas gigantes",
            "Plesiosaur - Répteis marinhos",
            "Manta - Arraias velozes"
        ],
        comportamento: "Vida tanto terrestre quanto marinha. Predadores marinhos patrulham as águas costeiras. Criaturas anfíbias transitam entre os dois ambientes.",
        recursos: ["Silica pearls", "Oil nodes", "Chitin marinha", "Sand", "Salt"]
    },
    {
        id: 9,
        nome: "Floresta Vermelha",
        tipo: "raro",
        regiao: "floresta-pinheiros",
        corGlow: "rgba(178, 34, 34, 0.6)",
        corParticula: "rgba(220, 20, 60, 0.4)",
        imagem: "../imagens/bioma_floresta_vermelha.jpg",
        descricaoCurta: "Vegetação vermelha com seiva abundante e criaturas diabólicas",
        descricaoCompleta: "Uma vegetação de árvores vermelhas, intensa, com uma grande quantidade de seiva e materias naturais vindo da floresta de tonalidade vermelha, rios pequenos com vegetação de fungos e plantas que soltam feromônios que atraem as criaturas mais diabólicas da ilha, sendo assim apenas criaturas categorizadas diabólicas vivem nesse bioma raro.",
        vegetacao: [
            "Árvores vermelhas de seiva abundante",
            "Fungos que liberam feromônios",
            "Plantas carnívoras vermelhas",
            "Líquens sanguíneos",
            "Cipós venenosos"
        ],
        animais: [
            "Demonic Raptor - Raptores mutados",
            "Blood Wyvern - Dragões sanguinários",
            "Hell Hound - Cães infernais",
            "Imp - Criaturas demoníacas pequenas",
            "Succubus - Sedutoras mortais"
        ],
        comportamento: "Criaturas extremamente agressivas e territoriais. Comportamentos de caça em matilha. Atraídas por feromônios especiais da vegetação.",
        recursos: ["Seiva vermelha", "Blood packs", "Demon hide", "Infernal crystals", "Rare mushrooms"]
    },
    {
        id: 10,
        nome: "Floresta de Cogumelos",
        tipo: "raro",
        regiao: "bosque-antigo",
        corGlow: "rgba(186, 85, 211, 0.6)",
        corParticula: "rgba(216, 191, 216, 0.4)",
        imagem: "../imagens/bioma_cogumelos.jpg",
        descricaoCurta: "Bioma variante com alta concentração de minérios e fungos",
        descricaoCompleta: "Um bioma variante da floresta vermelha, onde a diferença é a grande concentração de minérios, pedras e plantas rasteiras que soltam feromônios junto com os fungos atraindo criaturas Suínas, um pasto rico em nutrientes próximos ao minério hypo de maior concentração no bioma, atraindo esses animais como um santuário propício a eles.",
        vegetacao: [
            "Cogumelos gigantes coloridos",
            "Plantas rasteiras com feromônios",
            "Fungos bioluminescentes",
            "Musgos especiais",
            "Flores alucinógenas"
        ],
        animais: [
            "Direboar - Javalis gigantes",
            "Mushroom Dodo - Dodos mutados",
            "Spore Wolf - Lobos fungais",
            "Myconid - Humanoides fúngicos",
            "Truffle Hog - Porcos farejadores"
        ],
        comportamento: "Criaturas suínas dominam o bioma. Comportamentos de busca por trufas e minérios. Defesa agressiva do território de pastagem.",
        recursos: ["Hypo minério", "Truffles raras", "Mushroom spores", "Fungal wood", "Rare flowers"]
    },
    {
        id: 11,
        nome: "Floresta Misteriosa",
        tipo: "raro",
        regiao: "condado",
        corGlow: "rgba(47, 79, 79, 0.6)",
        corParticula: "rgba(112, 128, 144, 0.4)",
        imagem: "../imagens/bioma_floresta_misteriosa.jpg",
        descricaoCurta: "Bioma denso e escuro dominado por aracnídeos e insetos",
        descricaoCompleta: "Um bioma denso com árvores grandes e grande quantidade de carcaças de animais, restos de animais e matérias orgânica que atrai insetos, a floresta é dominada principalmente por aranhas e as folhas e troncos são tão grandes, densos e juntos que escondem a luz do dia.",
        vegetacao: [
            "Árvores gigantes com copas fechadas",
            "Teias de aranha gigantes",
            "Plantas decompositoras",
            "Fungos de decomposição",
            "Cipós espinhosos"
        ],
        animais: [
            "Titanomyrma Drone - Formigas gigantes",
            "Araneo - Aranhas caçadoras",
            "Insect Swarm - Enxames agressivos",
            "Carrion Bird - Aves carniceiras",
            "Giant Leech - Sanguessugas"
        ],
        comportamento: "Predadores de emboscada e criaturas que atacam em enxame. Comportamentos de teia e armadilhas. Baixa visibilidade favorece ataques surpresa.",
        recursos: ["Chitin abundante", "Spider silk", "Insect jelly", "Rare meat", "Decomposed organic"]
    },
    {
        id: 12,
        nome: "Floresta de Fungos Abissal",
        tipo: "raro",
        regiao: "cavernas",
        corGlow: "rgba(72, 61, 139, 0.6)",
        corParticula: "rgba(106, 90, 205, 0.4)",
        imagem: "../imagens/bioma_fungos_abissal.jpg",
        descricaoCurta: "Ecossistema cavernoso adaptado à escuridão total",
        descricaoCompleta: "Uma floresta adaptada dentro das cavernas, com fungos que consomem toda matéria orgânica e afetam o funcionamento nervoso das criaturas, adaptando-as a usar mais os sentidos da audição e localização e ficando cegas.",
        vegetacao: [
            "Fungos nervo-ativos",
            "Cogumelos paralisantes",
            "Plantas de ecolocalização",
            "Fungos consumidores",
            "Bioluminescentes cegantes"
        ],
        animais: [
            "Blind Cave Raptor - Raptores cegos",
            "Echo Bat - Morcegos de ecolocalização",
            "Nerve Fungus - Fungos inteligentes",
            "Deep Crawler - Rastejadores cegos",
            "Psychic Mushroom - Cogumelos psíquicos"
        ],
        comportamento: "Criaturas cegas com sentidos alternativos aguçados. Caça por ecolocalização e detectores de movimento. Comportamentos psíquicos e de controle mental.",
        recursos: ["Nerve fungus", "Echo crystals", "Blind sense organs", "Psychic spores", "Deep minerals"]
    }
];

// VARIÁVEIS GLOBAIS
let biomaAtual = null;
let regiaoAtual = "campos-ouro";

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando sistema de biomas...');
    inicializarNavegacaoRegioes();
    inicializarListaBiomas();
    console.log('Sistema inicializado com ' + biomas.length + ' biomas');
});

// INICIALIZAR NAVEGAÇÃO POR REGIÕES
function inicializarNavegacaoRegioes() {
    const botoes = document.querySelectorAll('.regiao-btn');
    
    botoes.forEach(botao => {
        botao.addEventListener('click', function() {
            // Remover classe ativa de todos os botões
            botoes.forEach(b => b.classList.remove('ativo'));
            
            // Adicionar classe ativa ao botão clicado
            this.classList.add('ativo');
            
            // Atualizar região atual e filtrar biomas
            regiaoAtual = this.dataset.regiao;
            filtrarBiomasPorRegiao(regiaoAtual);
        });
    });
}

// FILTRAR BIOMAS POR REGIÃO
function filtrarBiomasPorRegiao(regiao) {
    const biomasFiltrados = biomas.filter(bioma => 
        bioma.regiao === regiao || bioma.regiao === 'todas'
    );
    
    // Atualizar lista de biomas
    const lista = document.getElementById('listaBiomas');
    lista.innerHTML = '';
    
    biomasFiltrados.forEach(bioma => {
        criarItemBioma(bioma, lista);
    });
    
    // Se houver bioma atual selecionado que não está na lista, limpar detalhes
    if (biomaAtual && !biomasFiltrados.some(b => b.id === biomaAtual.id)) {
        document.getElementById('detalheBioma').classList.remove('ativo');
        biomaAtual = null;
    }
}

// CRIAR ITEM DE BIOMA
function criarItemBioma(bioma, container) {
    const item = document.createElement('div');
    item.className = `bioma-item ${bioma.tipo}`;
    item.dataset.id = bioma.id;
    
    // Definir variáveis CSS para o bioma
    item.style.setProperty('--bioma-glow', bioma.corGlow);
    item.style.setProperty('--bioma-particula', bioma.corParticula);
    item.style.backgroundImage = `url('${bioma.imagem}')`;
    
    item.innerHTML = `
        <div class="bioma-particulas" id="particulas-${bioma.id}"></div>
        <div class="bioma-conteudo">
            <h3 class="bioma-nome">${bioma.nome}</h3>
            <p class="bioma-descricao-curta">${bioma.descricaoCurta}</p>
        </div>
    `;
    
    item.addEventListener('click', function() {
        mostrarDetalheBioma(bioma.id);
    });
    
    container.appendChild(item);
    
    // Criar partículas após o elemento ser adicionado ao DOM
    setTimeout(() => criarParticulasBioma(bioma.id), 100);
}

// CRIAR PARTÍCULAS PARA O BIOMA
function criarParticulasBioma(biomaId) {
    const container = document.getElementById(`particulas-${biomaId}`);
    if (!container) return;
    
    for (let i = 0; i < 15; i++) {
        const particula = document.createElement('div');
        particula.className = 'particula';
        particula.style.cssText = `
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 6}s;
            animation-duration: ${Math.random() * 3 + 4}s;
        `;
        container.appendChild(particula);
    }
}

// INICIALIZAR LISTA DE BIOMAS
function inicializarListaBiomas() {
    const lista = document.getElementById('listaBiomas');
    
    if (!lista) {
        console.error('Elemento listaBiomas não encontrado!');
        return;
    }
    
    // Mostrar todos os biomas inicialmente
    biomas.forEach(bioma => {
        criarItemBioma(bioma, lista);
    });
    
    console.log('Lista de biomas criada com sucesso');
}

// MOSTRAR DETALHES DO BIOMA
function mostrarDetalheBioma(id) {
    const bioma = biomas.find(b => b.id === id);
    
    if (!bioma) {
        console.error('Bioma com ID ' + id + ' não encontrado!');
        return;
    }
    
    biomaAtual = bioma;
    const detalhe = document.getElementById('detalheBioma');
    
    if (!detalhe) {
        console.error('Elemento detalheBioma não encontrado!');
        return;
    }
    
    // Definir variáveis CSS para o bioma detalhado
    detalhe.style.setProperty('--bioma-glow', bioma.corGlow);
    detalhe.style.setProperty('--bioma-imagem', `url('${bioma.imagem}')`);
    
    detalhe.innerHTML = `
        <h2>${bioma.nome} ${bioma.tipo === 'raro' ? '✨' : ''}</h2>
        
        <div class="bioma-descricao-completa">
            ${bioma.descricaoCompleta}
        </div>
        
        <div class="bioma-info-grid">
            <div class="bioma-info-categoria">
                <h3>🌿 Vegetação</h3>
                <ul>
                    ${bioma.vegetacao.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            
            <div class="bioma-info-categoria">
                <h3>🐾 Animais</h3>
                <ul>
                    ${bioma.animais.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            
            <div class="bioma-info-categoria">
                <h3>🎯 Comportamento</h3>
                <p>${bioma.comportamento}</p>
                <h3 style="margin-top: 20px;">⛏️ Recursos</h3>
                <ul>
                    ${bioma.recursos.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    
    // Remover classe ativa de todos os itens
    document.querySelectorAll('.bioma-item').forEach(item => {
        item.classList.remove('ativo');
    });
    
    // Adicionar classe ativa ao item correspondente
    document.querySelectorAll(`[data-id="${id}"]`).forEach(item => {
        item.classList.add('ativo');
    });
    
    detalhe.classList.add('ativo');
    
    // Rolar para o detalhe
    detalhe.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
    
    console.log('Detalhes do bioma ' + bioma.nome + ' exibidos');
}

// NAVEGAÇÃO POR TECLADO
document.addEventListener('keydown', function(e) {
    if (!biomaAtual) return;
    
    const currentIndex = biomas.findIndex(b => b.id === biomaAtual.id);
    
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        const nextIndex = (currentIndex + 1) % biomas.length;
        mostrarDetalheBioma(biomas[nextIndex].id);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        const prevIndex = (currentIndex - 1 + biomas.length) % biomas.length;
        mostrarDetalheBioma(biomas[prevIndex].id);
    }
});

// DEBUG
setTimeout(() => {
    const itensLista = document.querySelectorAll('.bioma-item');
    
    console.log('DEBUG - Itens criados:');
    console.log('- Biomas: ' + itensLista.length + ' itens');
    console.log('- Total esperado: ' + biomas.length + ' itens');
    
    if (itensLista.length === biomas.length) {
        console.log('✅ Todos os elementos foram criados corretamente!');
    } else {
        console.error('❌ Problema na criação dos elementos!');
    }
}, 1000);