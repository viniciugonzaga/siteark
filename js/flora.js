// ========================
// SISTEMA DE FLORA DOS BIOMAS - CORRIGIDO
// ========================

// Dados dos biomas (completos com descrições, recursos e clima)
const floraData = {
    // Land biomes
    "Campos": {
        description: "Vastas planícies com gramíneas altas e vegetação esparsa. Um ambiente aberto ideal para criaturas terrestres de grande porte que dependem da visão para caçar ou detectar predadores.",
        resources: ["Madeira", "Fibra", "Bagas", "Pedra", "Sílex", "Ferro", "Minérios-C1", "Repolho do Campos", "Pasto", "Ervas-d'água", "Espólios de Criaturas"],
        climate: {
            temperature: "Temperado",
            precipitation: "Moderada",
            hazards: "Exposição a predadores"
        },
        creatures: []
    },
    "Planalto": {
        description: "Áreas elevadas com vistas panorâmicas e ventos constantes. A vegetação é mais resistente e adaptada a condições de maior altitude e exposição.",
        resources: ["Madeira", "Pedra", "Fibra", "Frutas-Arbustivas", "Seda", "Minérios-C1", "Flor de Coelho", "Couro", "Restos de Quitina"],
        climate: {
            temperature: "Frio a Temperado",
            precipitation: "Variável",
            hazards: "Quedas, Ventos Fortes"
        },
        creatures: []
    },
    "Montanha": {
        description: "Picos rochosos e terrenos acidentados com vegetação esparsa. Ambiente desafiador com recursos valiosos nas encostas mais altas.",
        resources: ["Metal", "Cristal", "Minérios-C1", "Minérios-C2", "Pedra", "Sílex", "Quitina", "Porções de Musgos", "Flor da montanha", "Ervas-Musgo", "Espólios"],
        climate: {
            temperature: "Frio",
            precipitation: "Neve",
            hazards: "Quedas, Frio Extremo"
        },
        creatures: []
    },
    "Taiga": {
        description: "Florestas de coníferas com clima frio e neve sazonal. Abriga criaturas adaptadas ao frio e vegetação resistente a baixas temperaturas.",
        resources: ["Madeira", "Fibra", "Bagas", "Sílex", "Frutas-Arbustivas", "Seiva", "Seda", "Pedra", "Minérios-C1", "Resina", "Quitina", "Espólios", "frutos arbóreos", "Pelo-Seco", "Couro", "Flor-selvagem"],
        climate: {
            temperature: "Frio",
            precipitation: "Neve",
            hazards: "Frio, Predadores Noturnos"
        },
        creatures: []
    },
    "Bosque": {
        description: "Florestas mistas com árvores decíduas e coníferas. Oferece boa cobertura e recursos variados para sobrevivência.",
        resources: ["Madeira", "Fibra", "Bagas", "Cogumelos", "Sementes", "Resina", "Pedra", "Musgo", "Palha", "frutos arbóreos", "Pelo-seco", "Espólios", "Flor-Rara", "Ervas Comuns", "Musgo", "Seiva", "Flor do Bosque"],
        climate: {
            temperature: "Temperado",
            precipitation: "Alta",
            hazards: "Predadores Emboscadores"
        },
        creatures: []
    },
    "Caverna": {
        description: "Sistemas subterrâneos com formações rochosas únicas e ecossistemas adaptados à escuridão. Recursos raros mas perigosos.",
        resources: ["Cristal", "Metal", "Fungos", "Cogumelos", "Espólios", "Cristais de Luz", "Minérios-C1", "Minérios-C2", "Queratina", "Cogumelo-vermelho", "Sílex", "Musgo", "Bolsas Ácidas", "Teia", "Diários-Itens Aleatórios"],
        climate: {
            temperature: "Estável",
            precipitation: "Úmida",
            hazards: "Escuridão, Criaturas Especiais"
        },
        creatures: []
    },
    "Praia": {
        description: "Zonas costeiras com areia, palmeiras e vida marinha rasteira. Ponto de entrada para recursos oceânicos e terrestres.",
        resources: ["Pedras", "Madeira", "Fibra", "Sal", "Pérolas-Sílicas", "Óleo", "Cáscalho", "Areia", "Espólios", "Frutas do Litoral", "Banana", "Coco", "Carne", "Minérios-C1", "Sílex-Concentrado"],
        climate: {
            temperature: "Quente",
            precipitation: "Moderada",
            hazards: "Tsunamis, Predadores Aquáticos"
        },
        creatures: []
    },
    "Deserto": {
        description: "Áreas áridas com dunas de areia e vegetação escassa. Ambiente extremo com recursos específicos e desafios de sobrevivência.",
        resources: ["Areia", "Minérios-C1", "Sílex", "Pedras-Sedimentadas", "Óleo", "Seda", "Fibra", "Frutas-Arbustivas", "Cactos", "Espólios", "Couro", "Âmbar", "Pelo-Seco", "Quitina"],
        climate: {
            temperature: "Muito Quente",
            precipitation: "Quase Nula",
            hazards: "Calor, Desidratação"
        },
        creatures: []
    },
    "Tundra": {
        description: "Terras congeladas com gelo perpétuo e vegetação resistente. Extremamente desafiador mas com recursos exclusivos.",
        resources: ["Madeira", "Neve", "Pinha", "Sílex", "Crystal", "Metal", "Minérios-C1", "Pelo-Seco", "Espólios", "Pedra", "Couro", "Frutas-Arbustivas", "Fibra", "Gelo", "Pedras Arcanas", "Jóias-C1", "Âmbar", "Seiva", "Resina"],
        climate: {
            temperature: "Congelante",
            precipitation: "Neve",
            hazards: "Hipotermia, Tempestades"
        },
        creatures: []
    },
    "Floresta Vermelha": {
        description: "Floresta com vegetação de tonalidade avermelhada e atmosfera única. Contém recursos raros mas também perigos ocultos.",
        resources: ["Resina-Vermelha", "Madeira", "Fibra", "Pedra", "Sílex", "Minérios-C2", "Seiva", "Espólios", "Flor-Rara-Vermelha", "Quitina", "Couro", "Pelo-Seco", "Frutas-Arbustivas", "frutos arbóreos"],
        climate: {
            temperature: "Temperado",
            precipitation: "Alta",
            hazards: "Radiação, Criaturas Corrompidas"
        },
        creatures: []
    },
    "Floresta de Cogumelo": {
        description: "Área com fungos gigantes que formam um ecossistema único. Luminosa à noite com propriedades especiais.",
        resources: ["Pedra", "Fibra", "Musgo", "Erva-Musgo", "Quitina", "Minérios-C1", "Minérios-C2", "Cogumelos", "Ervas-Paralisantes", "Frutas-Cogumelo", "Sementes", "Resina", "Âmbar", "Sílex"],
        climate: {
            temperature: "Úmido",
            precipitation: "Constante",
            hazards: "Esporos Tóxicos"
        },
        creatures: []
    },
    "Floresta Misteriosa": {
        description: "Floresta densa com neblina permanente e atmosfera misteriosa. Abriga criaturas únicas e recursos místicos.",
        resources: ["Madeira", "Fibra", "Quitina", "Espólios", "Cimento", "Teia", "Seiva", "Resina", "Pedra", "Cogumelos", "Frutas-Aranha", "Pelo-seco", "Âmbar"],
        climate: {
            temperature: "Frio",
            precipitation: "Neblina Constante",
            hazards: "Perda de Orientação"
        },
        creatures: []
    },
    "Cogumelos Abissais": {
        description: "Zona profunda com fungos bioluminescentes que iluminam cavernas subaquáticas. Ecossistema frágil mas rico.",
        resources: ["Pedras", "Sílex", "Minérios-C2", "Cristal", "Metal", "Minérios-C3", "Cogumelos", "Musgo", "Espólios", "Fungos Abissais", "Fungo-Trepadeira"],
        climate: {
            temperature: "Frio",
            precipitation: "Subaquática",
            hazards: "Pressão, Escuridão"
        },
        creatures: []
    },
    "Pântano": { // NOVO BIOMA ADICIONADO
        description: "Áreas alagadas e lamacentas com águas estagnadas e vegetação densa. Habitat perfeito para criaturas anfíbias e répteis que se camuflam na vegetação aquática.",
        resources: ["Madeira", "Fibra", "Cogumelos", "Ervas Medicinais", "Lama", "Argila", "Pedra", "Sílex", "Pérolas", "Ovos", "Espólios", "Plantas Aquáticas", "Venenos Naturais", "Couro", "Pelo Molhado"],
        climate: {
            temperature: "Úmido e Quente",
            precipitation: "Alta",
            hazards: "Afundamento, Insetos, Doenças"
        },
        creatures: []
    },
    
    // Water biomes
    "Oceanos": {
        description: "Vastas extensões de água salgada com vida marinha diversificada. Profundidades variadas com recursos em diferentes níveis.",
        resources: ["Óleo", "Pérolas-Sílicas", "Pérolas-Negras", "Coral", "Algas", "Trilobite"],
        climate: {
            temperature: "Variável",
            precipitation: "N/A",
            hazards: "Afogamento, Predadores Marinhos"
        },
        creatures: []
    },
    "Zonas de Coral": {
        description: "Recifes de coral coloridos com alta biodiversidade. Águas rasas e claras ideais para coleta de recursos.",
        resources: ["Coral", "Pedra", "Pérola-Sílica", "Fibra", "Ovos", "Sementes", "Bolsas Nutritivas", "Resina", "Espólios", "Minérios-C1", "Quitina", "Escamas", "Metal", "Ervas-Marinhas"],
        climate: {
            temperature: "Quente",
            precipitation: "N/A",
            hazards: "Cortes, Criaturas Venenosas"
        },
        creatures: []
    },
    "Zonas Abissais": {
        description: "Profundidades oceânicas escuras com criaturas bioluminescentes e pressão extrema. Recursos raros mas perigosos.",
        resources: ["Pedra", "Sal", "Petróleo", "Gel", "Óleo", "Espólios", "Minérios-C2", "Âmbar", "Pérola-Negra", "Quitina", "Bolsas de Toxina"],
        climate: {
            temperature: "Muito Frio",
            precipitation: "N/A",
            hazards: "Pressão Extrema, Escuridão Total"
        },
        creatures: []
    },
    "Zonas Vulcânicas": {
        description: "Áreas aquáticas próximas a atividade vulcânica subaquática. Águas quentes com recursos geotérmicos.",
        resources: ["Magma", "Metal", "Obsidiana", "Quitina", "Pedras", "Sílex", "Minérios-C1", "Minérios-C2", "Vapores-Quentes", "Espólios", "Sal", "Fósseis", "Crustáceos"],
        climate: {
            temperature: "Muito Quente",
            precipitation: "N/A",
            hazards: "Queimaduras, Erupções"
        },
        creatures: []
    },
    "Dunas Submarinas": {
        description: "Desertos subaquáticos com dunas de areia movediça e vida adaptada ao fundo arenoso.",
        resources: ["Pedras", "Pérola-Sílica", "Fibra", "Espólios", "Quitinas", "Fósseis", "Ossos", "Tesouros", "Couro", "Pelo-Seco", "Coral da Caveira", "Escamas de Predador", "Musgos"],
        climate: {
            temperature: "Variável",
            precipitation: "N/A",
            hazards: "Correntes, Areia Movediça"
        },
        creatures: []
    },
    "Zonas de Cogumelos": {
        description: "Áreas subaquáticas com fungos gigantes adaptados à vida marinha. Formações únicas e recursos especiais.",
        resources: ["Pedra", "Sílex", "Cogumelos", "Gel-Parasita", "Coral", "Óleo", "Espólios", "Minérios-C2", "Quitina", "Sementes", "Coral-Parasita", "Bolsa de Toxina", "Ossos"],
        climate: {
            temperature: "Frio",
            precipitation: "N/A",
            hazards: "Correntes Fortes"
        },
        creatures: []
    },
    "Campos Vermelhos": {
        description: "Leitos marinhos com algas vermelhas que criam ecossistemas únicos. Vida marinha adaptada a condições especiais.",
        resources: ["Pedra", "Fibra", "Coral", "Espólios", "Minérios-C1", "Ovos", "Quitina", "Pelo-seco", "Óleo", "Seda", "Pepino-do-Mar", "Musgo", "Areia"],
        climate: {
            temperature: "Temperado",
            precipitation: "N/A",
            hazards: "Algas Tóxicas"
        },
        creatures: []
    },
    "Labirintos Submarinos": {
        description: "Complexos sistemas de cavernas e túneis subaquáticos. Fácil de se perder mas com tesouros escondidos.",
        resources: ["Pedra", "Sílex", "Pedras-Sedimentadas", "Coral-Espiral", "Minérios-C1", "Minérios-C2", "Quitina", "Óleo", "Petróleo", "Sal", "Cogumelos", "Fungos", "Jóias-C1", "Jóias-C2"],
        climate: {
            temperature: "Frio",
            precipitation: "N/A",
            hazards: "Perda, Armadilhas"
        },
        creatures: []
    },
    "Corais Profundos": {
        description: "Recifes de coral em grandes profundidades com adaptações à pouca luz. Cores vibrantes e formas únicas.",
        resources: ["Pedra", "Corais-Abissais", "Pérola-Sílica", "Cristais", "Minério-C2", "Espólios", "Quitina", "Gel", "Sal", "Âmbar", "Itens-Aleatórios", "Couro", "Coral-Elétrico", "Sementes"],
        climate: {
            temperature: "Muito Frio",
            precipitation: "N/A",
            hazards: "Pressão, Escassez de Oxigênio"
        },
        creatures: []
    },
    "Zonas de Lava": {
        description: "Áreas com atividade vulcânica subaquática ativa. Perigos extremos mas recursos valiosos.",
        resources: ["Magma", "Pedra", "Cristal", "Minérios-C3", "Minérios-C4", "Carvão", "Quitina", "Couro-Dragão", "Lava", "Vapores-Quentes", "Itens-Raros-Aleatórios"],
        climate: {
            temperature: "Extremamente Quente",
            precipitation: "N/A",
            hazards: "Queimaduras, Erupções"
        },
        creatures: []
    },
    "Void": {
        description: "Áreas de vazio subaquático com pouca vida e recursos. Pontos de transição entre biomas.",
        resources: ["Gel-Fantasma", "Espólios", "Plâncton"],
        climate: {
            temperature: "Gélido",
            precipitation: "N/A",
            hazards: "Desorientação, Isolamento"
        },
        creatures: []
    },
    "Caverna de Cristais": {
        description: "Cavernas subaquáticas com formações cristalinas gigantes. Luz refratada cria ambientes mágicos.",
        resources: ["Pedra", "Cristais", "Cristais de Luz", "Minérios-C1", "Minérios-C2", "Minérios-C3", "Espólios", "Cogumelos", "Musgos", "Âmbar", "Itens-Desconhecidos"],
        climate: {
            temperature: "Frio",
            precipitation: "N/A",
            hazards: "Cortes, Deslumbramento"
        },
        creatures: []
    },
    
    // Skull biomes
    "Praias Macabras": {
        description: "Praias com areia escura e águas turvas. Atmosfera opressiva com criaturas sombrias.",
        resources: ["Pedra", "Pérola-Negra", "Sal", "Coral da Caveira", "Coral-Sombrio", "Magnetita-Elemental", "Sílex", "Areia-Escura", "Ossos", "Fósseis", "Espólios", "Quitina", "Cimento", "Jóias-C1", "Minérios-C1", "Escamas"],
        climate: {
            temperature: "Frio",
            precipitation: "Neblina",
            hazards: "Criaturas Sombrias, Névoa Tóxica"
        },
        creatures: []
    },
    "Campos de Ossos": {
        description: "Planícies cobertas por ossos de criaturas gigantes. Ventos uivantes e sensação de morte.",
        resources: ["Pedras", "Ossos", "Fósseis", "Ovos", "Flor-Caviera", "Bolsa de Saliva", "Óleo", "Petróleo", "Quitina", "Escamas", "Carne-Podre", "Escama-Lagarto", "Frutas-Arbustivas", "Vapores-Tóxicos", "Ervas-Magnéticas"],
        climate: {
            temperature: "Gélido",
            precipitation: "Cinzas",
            hazards: "Assombrações, Ventos Cortantes"
        },
        creatures: []
    },
    "Pântanos Vermelhos": {
        description: "Áreas alagadas com águas vermelhas e vegetação deformada. Perigos ocultos nas profundezas lamacentas.",
        resources: ["Lama-Vermelha", "Seiva", "Madeira", "Resina Vermelha", "Minérios-C1", "Petróleo", "Fungos", "Cogumelos", "Escamas", "Coral-Parasita", "Quitina", "Fibra", "Bagas-Vermelhas"],
        climate: {
            temperature: "Úmido e Quente",
            precipitation: "Nevoeiro Sangrento",
            hazards: "Afundamento, Doenças"
        },
        creatures: []
    },
    "Floresta Sombria": {
        description: "Floresta densa com árvores retorcidas e pouca luz penetrando a copa. Sensação constante de estar sendo observado.",
        resources: ["Madeira", "Flor-Sombria", "Erva-Pesadelo", "Pedra", "Escamas-Behemoth", "Seiva", "Resina", "Frutos-Árboreos", "Frutas-Arbustivas", "Quitina", "Pelo-Seco"],
        climate: {
            temperature: "Frio",
            precipitation: "Chuva Negra",
            hazards: "Ilusões, Perda de Sanidade"
        },
        creatures: []
    },
    "Reino do Leão": {
        description: "Território dominado por criaturas majestosas e perigosas. Arquitetura antiga em ruínas pontua a paisagem.",
        resources: ["Pedras", "Sílex", "Minérios-C4", "Fósseis", "Ossos", "Quitina", "Espólios", "Pedras-Sedimentadas", "Flor do Rei", "Bagas da Caveira"],
        climate: {
            temperature: "Temperado",
            precipitation: "Tormentas Elétricas",
            hazards: "Predadores Alpha, Armadilhas Antigas"
        },
        creatures: []
    },
    "Cavernas Sombrias": {
        description: "Sistemas de cavernas com eco ameaçador e criaturas adaptadas à escuridão eterna. Portais para reinos sombrios.",
        resources: ["Pedra", "Cristal", "Metal", "Obsidiana", "Magnetita", "Urânio", "Elemento", "Sílex", "Minérios-C2", "Minérios-C3", "Couraça-Pedra", "Musgo", "Critais de Luz", "Teia", "Lava"],
        climate: {
            temperature: "Gélido-Quente",
            precipitation: "Condensação Sombria",
            hazards: "Terror, Criaturas das Sombras"
        },
        creatures: []
    }
};

// Estado atual
let currentEnvironmentFlora = 'land';
let creatureCount = 10;
let shuffledBiomes = [];

// DOM Elements
const landToggleFlora = document.getElementById('land-toggle-flora');
const waterToggleFlora = document.getElementById('water-toggle-flora');
const skullToggleFlora = document.getElementById('skull-toggle-flora');
const shuffleBiomesBtn = document.getElementById('shuffle-biomes');
const creatureCountSelect = document.getElementById('creature-count-select');
const biomesGrid = document.getElementById('biomes-grid');
const loadingMessage = document.getElementById('loading-message');
const noDataMessage = document.getElementById('no-data-message');
const biomeModal = document.getElementById('biome-modal');
const modalCloseBiome = document.getElementById('modal-close-biome');
const modalBiomeName = document.getElementById('modal-biome-name');
const modalBiomeType = document.getElementById('modal-biome-type');
const modalBiomeIcon = document.getElementById('modal-biome-icon');
const modalBiomeDescription = document.getElementById('modal-biome-description');
const modalBiomeResources = document.getElementById('modal-biome-resources');
const modalBiomeClimate = document.getElementById('modal-biome-climate');
const modalCreaturesGrid = document.getElementById('modal-creatures-grid');
const creatureCountText = document.getElementById('creature-count-text');
const refreshCreaturesBtn = document.getElementById('refresh-creatures');
const modalBgBiomeImage = document.getElementById('modal-bg-biome-image');

// Variáveis para estado do modal
let currentModalBiome = null;
let currentModalCreatures = [];

// Dados de biomas (se não estiverem disponíveis globalmente)
let biomesData = [
    // Land biomes (Terra) - COM PÂNTANO ADICIONADO
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
    { name: "Pântano", icon: "../imagens/icon_pantano.png", type: "land" }, // NOVO BIOMA
    
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

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando sistema de flora...');
    initFlora();
});

// Função principal de inicialização
function initFlora() {
    console.log('Configurando eventos...');
    
    // Configurar eventos
    setupEventListeners();
    
    // Tentar carregar dados das criaturas
    setTimeout(() => {
        loadCreaturesData();
    }, 500);
}

// Carregar dados das criaturas
function loadCreaturesData() {
    console.log('Tentando carregar dados das criaturas...');
    
    // Tentar múltiplas fontes para os dados
    let creatures = [];
    
    // Fonte 1: Objeto global do feras.js
    if (typeof window.CreaturesData !== 'undefined') {
        console.log('Dados encontrados em window.CreaturesData');
        creatures = window.CreaturesData;
    } 
    // Fonte 2: Objeto local (se o script foi incluído)
    else if (typeof creaturesData !== 'undefined') {
        console.log('Dados encontrados em creaturesData');
        creatures = creaturesData;
    } 
    // Fonte 3: Tentar buscar do localStorage (se já foi carregado antes)
    else {
        console.log('Tentando carregar dados de fontes alternativas...');
        
        // Criar dados de exemplo se nenhum for encontrado
        creatures = getSampleCreaturesData();
        console.log('Usando dados de exemplo:', creatures.length, 'criaturas');
    }
    
    // Processar dados
    processCreaturesData(creatures);
    
    // Esconder mensagem de carregamento
    if (loadingMessage) {
        loadingMessage.classList.add('hidden');
    }
    
    // Atualizar exibição
    updateBiomesDisplay();
}

// Dados de exemplo para testes
function getSampleCreaturesData() {
    return [
        {
            id: 1,
            name: "T-Rex",
            category: "Dinossauro",
            biome: ["Campos", "Planalto", "Floresta"],
            environment: "land",
            image: "../imagens/icon_tiranossauro.png",
            thumbnail: "../imagens/icon_tiranossauro.png",
            difficulty: "Difícil",
        },
        {
            id: 2,
            name: "Espinossauro",
            category: "Dinossauro",
            biome: ["Rios", "Pântano", "Floresta"],
            environment: "land",
            image: "../imagens/icon_espinossauro.png",
            thumbnail: "../imagens/icon_espinossauro.png",
            difficulty: "Médio",
        },
        {
            id: 3,
            name: "Velociraptor",
            category: "Dinossauro",
            biome: ["Floresta", "Campos", "Montanha"],
            environment: "land",
            image: "../imagens/icon_raptor.png",
            thumbnail: "../imagens/icon_raptor.png",
            difficulty: "Fácil",
        },
        {
            id: 4,
            name: "Megalodon",
            category: "Criatura Aquática",
            biome: ["Oceanos", "Zonas Abissais"],
            environment: "water",
            image: "../imagens/icon_megalodon.png",
            thumbnail: "../imagens/icon_megalodon.png",
            difficulty: "Difícil",
        },
        {
            id: 5,
            name: "Pteranodonte",
            category: "Dinossauro Voador",
            biome: ["Montanha", "Pradaria", "Deserto"],
            environment: "land",
            image: "../imagens/icon_ptero.png",
            thumbnail: "../imagens/icon_ptero.png",
            difficulty: "Fácil",
        },
        {
            id: 6,
            name: "Tricerátops",
            category: "Dinossauro",
            biome: ["Campos", "Floresta", "Pradaria"],
            environment: "land",
            image: "../imagens/icon_trike.png",
            thumbnail: "../imagens/icon_trike.png",
            difficulty: "Fácil",
        },
        {
            id: 7,
            name: "Dragão Caveira",
            category: "Criatura Mítica",
            biome: ["Campos de Ossos", "Floresta Sombria", "Cavernas Sombrias"],
            environment: "skull",
            image: "../imagens/icon_dragao_caveira.png",
            thumbnail: "../imagens/icon_dragao_caveira.png",
            difficulty: "Extremo",
        }
    ];
}

// Processar dados das criaturas para associar aos biomas
function processCreaturesData(creatures) {
    console.log('Processando dados de', creatures.length, 'criaturas...');
    
    // Resetar dados de criaturas em todos os biomas
    Object.keys(floraData).forEach(biome => {
        floraData[biome].creatures = [];
    });
    
    // Para cada criatura, adicionar aos biomas correspondentes
    creatures.forEach(creature => {
        // Verificar se a criatura tem biomas definidos
        if (creature.biome && Array.isArray(creature.biome)) {
            creature.biome.forEach(biomeName => {
                if (floraData[biomeName]) {
                    floraData[biomeName].creatures.push({
                        id: creature.id,
                        name: creature.name,
                        category: creature.category,
                        image: creature.image || creature.thumbnail,
                        thumbnail: creature.thumbnail || creature.image,
                        difficulty: creature.difficulty || "N/A",
                        // SEM STATS - removido conforme solicitado
                    });
                }
            });
        }
        
        // Para ambiente skull, verificar elementos "Caveira" ou "Sombra"
        if (creature.environment === 'skull' || 
            (creature.elements && creature.elements.some(el => 
                el.name && (el.name.toLowerCase().includes('caveira') || 
                el.name.toLowerCase().includes('sombra'))))) {
            
            // Adicionar aos biomas skull
            const skullBiomes = ["Praias Macabras", "Campos de Ossos", "Pântanos Vermelhos", 
                               "Floresta Sombria", "Reino do Leão", "Cavernas Sombrias"];
            
            skullBiomes.forEach(biomeName => {
                if (floraData[biomeName] && !floraData[biomeName].creatures.some(c => c.id === creature.id)) {
                    floraData[biomeName].creatures.push({
                        id: creature.id,
                        name: creature.name,
                        category: creature.category,
                        image: creature.image || creature.thumbnail,
                        thumbnail: creature.thumbnail || creature.image,
                        difficulty: creature.difficulty || "N/A",
                        // SEM STATS - removido conforme solicitado
                    });
                }
            });
        }
    });
    
    // Log para debug
    let totalCreatures = 0;
    Object.keys(floraData).forEach(biome => {
        totalCreatures += floraData[biome].creatures.length;
    });
    console.log('Total de associações criatura-bioma:', totalCreatures);
}

// Configurar event listeners
function setupEventListeners() {
    console.log('Configurando event listeners...');
    
    // Toggles de ambiente
    if (landToggleFlora) {
        landToggleFlora.addEventListener('click', () => setEnvironmentFlora('land'));
    }
    if (waterToggleFlora) {
        waterToggleFlora.addEventListener('click', () => setEnvironmentFlora('water'));
    }
    if (skullToggleFlora) {
        skullToggleFlora.addEventListener('click', () => setEnvironmentFlora('skull'));
    }
    
    // Controles de randomização
    if (shuffleBiomesBtn) {
        shuffleBiomesBtn.addEventListener('click', shuffleBiomes);
    }
    if (creatureCountSelect) {
        creatureCountSelect.addEventListener('change', function() {
            creatureCount = parseInt(this.value);
            updateBiomesDisplay();
        });
    }
    
    // Modal de bioma
    if (modalCloseBiome) {
        modalCloseBiome.addEventListener('click', closeBiomeModal);
    }
    if (refreshCreaturesBtn) {
        refreshCreaturesBtn.addEventListener('click', refreshModalCreatures);
    }
    
    // Fechar modal ao clicar fora
    window.addEventListener('click', function(event) {
        if (event.target === biomeModal) {
            closeBiomeModal();
        }
    });
    
    // Fechar modal com ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && biomeModal.style.display === 'block') {
            closeBiomeModal();
        }
    });
}

// Definir ambiente atual
function setEnvironmentFlora(env) {
    currentEnvironmentFlora = env;
    
    // Atualizar toggles visuais
    document.querySelectorAll('.env-icon').forEach(icon => {
        icon.classList.remove('active');
    });
    
    if (env === 'land' && landToggleFlora) {
        landToggleFlora.classList.add('active');
    } else if (env === 'water' && waterToggleFlora) {
        waterToggleFlora.classList.add('active');
    } else if (env === 'skull' && skullToggleFlora) {
        skullToggleFlora.classList.add('active');
    }
    
    // Atualizar exibição
    updateBiomesDisplay();
}

// Embaralhar biomas
function shuffleBiomes() {
    updateBiomesDisplay(true);
    
    // Efeito visual no botão
    if (shuffleBiomesBtn) {
        shuffleBiomesBtn.innerHTML = '<i class="fas fa-check view-icon"></i><span>Embaralhado!</span>';
        shuffleBiomesBtn.style.background = 'linear-gradient(145deg, #1a1a1a, #000)';
        shuffleBiomesBtn.style.borderColor = 'var(--accent-color)';
        
        setTimeout(() => {
            shuffleBiomesBtn.innerHTML = '<i class="fas fa-random view-icon"></i><span>Embaralhar Biomas</span>';
            shuffleBiomesBtn.style.background = '';
            shuffleBiomesBtn.style.borderColor = '';
        }, 2000);
    }
}

// Atualizar exibição dos biomas
function updateBiomesDisplay(forceShuffle = false) {
    console.log('Atualizando exibição para ambiente:', currentEnvironmentFlora);
    
    // Mostrar mensagem de carregamento
    if (loadingMessage) {
        loadingMessage.classList.remove('hidden');
    }
    if (noDataMessage) {
        noDataMessage.classList.add('hidden');
    }
    
    // Obter biomas do ambiente atual
    const biomes = biomesData.filter(biome => biome.type === currentEnvironmentFlora);
    
    console.log('Biomas encontrados:', biomes.length, 'para ambiente', currentEnvironmentFlora);
    
    if (biomes.length === 0) {
        console.log('Nenhum bioma encontrado para o ambiente selecionado');
        if (loadingMessage) loadingMessage.classList.add('hidden');
        if (noDataMessage) noDataMessage.classList.remove('hidden');
        if (biomesGrid) biomesGrid.innerHTML = '';
        return;
    }
    
    // Embaralhar se necessário
    if (forceShuffle || shuffledBiomes.length !== biomes.length) {
        shuffledBiomes = [...biomes].sort(() => Math.random() - 0.5);
        console.log('Biomas embaralhados');
    }
    
    // Limpar grid
    if (biomesGrid) {
        biomesGrid.innerHTML = '';
        
        // Adicionar cada bioma ao grid
        shuffledBiomes.forEach(biome => {
            const biomeInfo = floraData[biome.name] || {
                description: "Bioma sem descrição detalhada.",
                resources: ["Recursos variados"],
                climate: { temperature: "Variável", precipitation: "Variável", hazards: "Desconhecido" },
                creatures: []
            };
            
            // Obter criaturas aleatórias para este bioma
            const randomCreatures = getRandomCreaturesForBiome(biome.name, creatureCount);
            
            // Criar card do bioma
            const biomeCard = createBiomeCard(biome, biomeInfo, randomCreatures);
            biomesGrid.appendChild(biomeCard);
        });
    }
    
    // Ocultar mensagem de carregamento
    if (loadingMessage) {
        loadingMessage.classList.add('hidden');
    }
    
    console.log('Exibição atualizada com sucesso');
}

// Obter criaturas aleatórias para um bioma
function getRandomCreaturesForBiome(biomeName, count) {
    const biomeInfo = floraData[biomeName];
    if (!biomeInfo || !biomeInfo.creatures || biomeInfo.creatures.length === 0) {
        return [];
    }
    
    // Embaralhar criaturas
    const shuffledCreatures = [...biomeInfo.creatures].sort(() => Math.random() - 0.5);
    
    // Retornar apenas o número solicitado
    return shuffledCreatures.slice(0, Math.min(count, shuffledCreatures.length));
}

// Criar card de bioma
function createBiomeCard(biome, biomeInfo, creatures) {
    const card = document.createElement('div');
    card.className = 'biome-card';
    card.dataset.biome = biome.name;
    
    // Determinar classe do tipo
    let typeClass = 'type-land';
    if (biome.type === 'water') typeClass = 'type-water';
    if (biome.type === 'skull') typeClass = 'type-skull';
    
    // Determinar ícone do tipo
    let typeIcon = 'fa-mountain';
    if (biome.type === 'water') typeIcon = 'fa-water';
    if (biome.type === 'skull') typeIcon = 'fa-skull';
    
    // Descrição curta (limitada a 150 caracteres)
    const shortDescription = biomeInfo.description && biomeInfo.description.length > 150 
        ? biomeInfo.description.substring(0, 150) + '...' 
        : biomeInfo.description || "Descrição não disponível.";
    
    // Limitar recursos a 5 itens
    const displayResources = biomeInfo.resources ? biomeInfo.resources.slice(0, 5) : ["Recursos não disponíveis"];
    
    // Limitar criaturas a 3 para preview
    const displayCreatures = creatures.slice(0, 3);
    
    card.innerHTML = `
        <div class="biome-header">
            <div class="biome-icon-container">
                <img src="${biome.icon}" alt="${biome.name}" 
                     onerror="this.onerror=null; this.src='../imagens/icons/default_biome.png';">
            </div>
            <div class="biome-title">
                <div class="biome-name">${biome.name}</div>
                <div class="biome-type">
                    <i class="fas ${typeIcon}"></i>
                    <span class="type-badge ${typeClass}">${biome.type === 'land' ? 'Terra' : biome.type === 'water' ? 'Água' : 'Caveira'}</span>
                </div>
            </div>
        </div>
        
        <div class="biome-content">
            <div class="biome-description-short">
                ${shortDescription}
            </div>
            
            <div class="biome-resources">
                <div class="resources-title">
                    <i class="fas fa-gem"></i>
                    <span>Recursos Principais</span>
                </div>
                <div class="resources-grid">
                    ${displayResources.map(resource => `<div class="resource-item">${resource}</div>`).join('')}
                </div>
            </div>
            
            <div class="biome-creatures">
                <div class="creatures-title">
                    <span>
                        <i class="fas fa-dragon"></i>
                        Criaturas
                    </span>
                    <span class="creature-count-badge">${creatures.length}</span>
                </div>
                
                <div class="creatures-list">
                    ${displayCreatures.length > 0 
                        ? displayCreatures.map(creature => `
                            <div class="creature-list-item" data-creature-id="${creature.id}">
                                <div class="creature-thumb">
                                    <img src="${creature.thumbnail || creature.image}" alt="${creature.name}" 
                                         onerror="this.onerror=null; this.src='../imagens/icons/default_dino.png';">
                                </div>
                                <div class="creature-info">
                                    <div class="creature-list-name">${creature.name}</div>
                                    <div class="creature-list-category">${creature.category}</div>
                                </div>
                            </div>
                        `).join('')
                        : `<div class="no-creatures">Nenhuma criatura registrada</div>`
                    }
                </div>
                
                ${creatures.length > 3 
                    ? `<a href="#" class="view-all-link view-all-btn">Ver todas as ${creatures.length} criaturas <i class="fas fa-arrow-right"></i></a>`
                    : ''
                }
            </div>
        </div>
    `;
    
    // Adicionar evento de clique para abrir modal
    card.addEventListener('click', function(e) {
        // Não abrir modal se clicar em uma criatura ou no link "ver todas"
        if (!e.target.closest('.creature-list-item') && !e.target.closest('.view-all-btn')) {
            openBiomeModal(biome, biomeInfo, creatures);
        }
    });
    
    // Adicionar eventos para as criaturas na lista
    card.querySelectorAll('.creature-list-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation(); // Impedir que o clique abra o modal do bioma
            const creatureId = parseInt(this.dataset.creatureId);
            openCreatureModal(creatureId);
        });
    });
    
    // Adicionar evento para o link "ver todas"
    const viewAllLink = card.querySelector('.view-all-btn');
    if (viewAllLink) {
        viewAllLink.addEventListener('click', function(e) {
            e.stopPropagation(); // Impedir que o clique abra o modal do bioma
            e.preventDefault();
            openBiomeModal(biome, biomeInfo, creatures);
        });
    }
    
    return card;
}

// Abrir modal do bioma
function openBiomeModal(biome, biomeInfo, creatures) {
    currentModalBiome = biome;
    currentModalCreatures = [...creatures]; // Copiar array
    
    // Preencher informações básicas
    if (modalBiomeName) modalBiomeName.textContent = biome.name;
    if (modalBiomeType) modalBiomeType.textContent = `Tipo: ${biome.type === 'land' ? 'Terra' : biome.type === 'water' ? 'Água' : 'Caveira'}`;
    if (modalBiomeIcon) {
        modalBiomeIcon.src = biome.icon;
        modalBiomeIcon.alt = biome.name;
    }
    
    // Definir imagem de fundo
    if (modalBgBiomeImage) {
        modalBgBiomeImage.style.backgroundImage = `url(${biome.icon})`;
    }
    
    // Preencher descrição
    if (modalBiomeDescription) {
        modalBiomeDescription.textContent = biomeInfo.description || "Descrição não disponível.";
    }
    
    // Preencher recursos
    if (modalBiomeResources) {
        const resources = biomeInfo.resources || ["Recursos não disponíveis"];
        modalBiomeResources.innerHTML = resources
            .map(resource => `<li><i class="fas fa-check"></i> ${resource}</li>`)
            .join('');
    }
    
    // Preencher clima
    if (modalBiomeClimate) {
        const climate = biomeInfo.climate || { temperature: "Variável", precipitation: "Variável", hazards: "Desconhecido" };
        modalBiomeClimate.innerHTML = `
            <div class="climate-item">
                <div class="label">Temperatura</div>
                <div class="value">${climate.temperature}</div>
            </div>
            <div class="climate-item">
                <div class="label">Precipitação</div>
                <div class="value">${climate.precipitation}</div>
            </div>
            <div class="climate-item">
                <div class="label">Perigos</div>
                <div class="value">${climate.hazards}</div>
            </div>
        `;
    }
    
    // Atualizar contador de criaturas
    if (creatureCountText) {
        creatureCountText.textContent = `Mostrando ${Math.min(creatureCount, creatures.length)} de ${creatures.length} criaturas`;
    }
    
    // Preencher grid de criaturas
    refreshModalCreatures();
    
    // Mostrar modal
    if (biomeModal) {
        biomeModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Atualizar criaturas no modal
function refreshModalCreatures() {
    if (!currentModalBiome || !modalCreaturesGrid) return;
    
    // Embaralhar criaturas novamente
    const shuffledCreatures = [...currentModalCreatures].sort(() => Math.random() - 0.5);
    const displayCreatures = shuffledCreatures.slice(0, creatureCount);
    
    // Atualizar grid - SEM ESTATÍSTICAS
    modalCreaturesGrid.innerHTML = displayCreatures
        .map(creature => `
            <div class="creature-modal-card" data-creature-id="${creature.id}">
                <div class="creature-modal-image">
                    <img src="${creature.image || creature.thumbnail}" alt="${creature.name}" 
                         onerror="this.onerror=null; this.src='../imagens/icons/default_dino.png';">
                </div>
                <div class="creature-modal-info">
                    <div class="creature-modal-name">${creature.name}</div>
                    <div class="creature-modal-category">${creature.category} • ${creature.difficulty || "N/A"}</div>
                    <!-- REMOVIDOS OS STATS -->
                </div>
            </div>
        `)
        .join('');
    
    // Adicionar eventos de clique para as criaturas
    modalCreaturesGrid.querySelectorAll('.creature-modal-card').forEach(card => {
        card.addEventListener('click', function() {
            const creatureId = parseInt(this.dataset.creatureId);
            closeBiomeModal();
            openCreatureModal(creatureId);
        });
    });
    
    // Atualizar texto do contador
    if (creatureCountText) {
        creatureCountText.textContent = `Mostrando ${displayCreatures.length} de ${currentModalCreatures.length} criaturas`;
    }
}

// Fechar modal do bioma
function closeBiomeModal() {
    if (biomeModal) {
        biomeModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    currentModalBiome = null;
    currentModalCreatures = [];
}

// Abrir modal da criatura (integrado com o sistema de feras)
function openCreatureModal(creatureId) {
    console.log('Tentando abrir criatura ID:', creatureId);
    
    // Verificar se a função openModal existe (do feras.js)
    if (typeof window.openModal !== 'undefined') {
        console.log('Função openModal encontrada');
        
        // Encontrar a criatura nos dados globais
        const creatures = window.CreaturesData || creaturesData || [];
        const creature = creatures.find(c => c.id === creatureId);
        
        if (creature) {
            console.log('Criatura encontrada:', creature.name);
            window.openModal(creature);
        } else {
            console.log('Criatura não encontrada com ID:', creatureId);
            alert('Criatura não encontrada!');
        }
    } else {
        console.log('Função openModal não encontrada, redirecionando...');
        // Fallback: redirecionar para a página de feras com o ID
        window.location.href = `feras.html?creature=${creatureId}`;
    }
}

// Expor funções para uso global
window.floraModule = {
    setEnvironmentFlora,
    shuffleBiomes,
    updateBiomesDisplay,
    openBiomeModal,
    closeBiomeModal,
    openCreatureModal
};

// Inicializar com dados de exemplo se necessário
window.addEventListener('load', function() {
    // Verificar se os biomas foram carregados
    if (typeof window.BiomesData !== 'undefined') {
        console.log('BiomasData encontrado globalmente');
        biomesData = window.BiomesData;
    }
    
    // Atualizar exibição após um breve delay para garantir que tudo carregou
    setTimeout(() => {
        if (loadingMessage && !loadingMessage.classList.contains('hidden')) {
            console.log('Forçando atualização da exibição...');
            loadCreaturesData();
        }
    }, 1000);
});

console.log('Sistema de flora carregado e pronto');

