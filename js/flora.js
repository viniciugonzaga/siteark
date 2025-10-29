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


// DADOS COMPLETOS DOS BIOMAS DO ARK - COM RECURSOS ESPECÍFICOS

// DADOS COMPLETOS DOS BIOMAS DO ARK - COM MÚLTIPLAS REGIÕES

const biomas = [
    {
        id: 1,
        nome: "Campos",
        tipo: "comum",
        regioes: ["campos-ouro", "floresta-pinheiros", "condado", "norte-frio"],
        corGlow: "rgba(224, 149, 9, 0.73)",
        corParticula: "rgba(255, 166, 0, 0.49)",
        imagem: "../imagens/icon_campos.png",
        descricaoCurta: "Vastas extensões de savana sob o sol ardente do Ark",

        descricaoCompleta: "Os Campos são uma imensa savana dourada que se estende sob o sol inclemente do Ark...",

        descricaoCompleta: "Os Campos são uma imensa savana dourada que se estende sob o sol inclemente do Ark. Esta 'terra de pasto' sustenta numerosos herbívoros que se alimentam da vegetação rasteira e das raízes nutritivas que emergem após as breves chuvas. As presas desenvolveram sofisticados mecanismos de defesa, cavando complexas tocas subterrâneas ou formando grupos de vigilância coordenada. Os predadores, por sua vez, utilizam os rios serpenteantes, lagos sazonais e poças remanescentes no solo ressecado para emboscadas letais ou para seguir cardumes migratórios. A vegetação é rica em fibras naturais, com capim alto ondulando ao vento e arbustos dispersos que pontilham a paisagem - todos sustentados por lençóis freáticos ricos em nutrientes. Rochas erodidas pontilham o terreno, testemunhas silenciosas da proximidade das montanhas e sua influência climática. Nas temporadas de seca intensa, as chamas latentes no solo e a resistência implacável dos animais definem hierarquias de domínio nos Campos.",
        vegetacao: [
            "Gramíneas altas e douradas que ondulam ao vento",
            "Arbustos resistentes de bagas variadas",
            "Flores silvestres adaptadas à seca",
            "Raízes nutritivas que brotam após chuvas",
            "Plantas medicinais rasteiras de propriedades únicas"
        ],
        animais: [
            "Parassaurolophus - Herbívoros pacíficos de cristas sonoras",
            "Triceratops - Defensivos em grupo com chifres imponentes",
            "Dilophossaurus - Caçadores em bandos com veneno paralisante",
            "Dodos - Passivos e abundantes, fonte de alimento básico",
            "Pteranodons - Sobrevoo constante, vigilantes das alturas"
        ],

        comportamento: "Criaturas geralmente pacíficas durante o dia, com comportamento defensivo coordenado quando ameaçadas...",
        recursos: [
            "Amarberry", "Azulberry", "Mejoberry", "Narcoberry", "Stimberry", "Tintoberry",
            "Semente de Trigo", "Semente de Arroz", "Semente de Soja",
            "Repolho de Pasto", "Raiz Nutriva", "Semente de Capim Alto", "Semente do Outono",
            "Milho", "Cenoura", "Batata",
        ]
    },
    {
        id: 2,
        nome: "Planalto",
        tipo: "comum", 
        regioes: ["condado", "bosque-antigo", "norte-frio"],
        corGlow: "rgba(25, 209, 8, 0.64)",
        corParticula: "rgba(62, 209, 4, 0.49)",
        imagem: "../imagens/icon_planicie.png",
        descricaoCurta: "Terras altas estratégicas com visão panorâmica e recursos minerais",
        vegetacao: [
            "Arbustos resistentes ao vento constante",
            "Gramíneas baixas e duras de crescimento lento",
            "Musgos e líquens que colonizam rochas expostas",
            "Pequenas coníferas adaptadas à altitude",
            "Plantas alpinas de florescimento breve mas intenso"
        ],
        animais: [
            "Mamute - Herbívoros gigantes pacíficos em manadas",
            "Sabre-tooth - Predadores territoriais de emboscadas",
            "Argentavis - Aves de rapina de visão aguçada",
            "Ovis - Ovelhas pacíficas de lã valiosa",
            "Pulmonoscorpius - Escorpiões agressivos com veneno paralisante"
        ],

        comportamento: "Animais adaptados a condições mais rigorosas de vento e temperatura...",
        recursos: [
            "Amarberry", "Azulberry", "Mejoberry", "Narcoberry",
            "Fruto do Arbusto Ventoso", "Musgo da Rocha", "Flor do Vento", "Erva da alma",
            "Maçã", "Cereja"
        ]

    },
    {
        id: 3,
        nome: "Montanha",
        tipo: "comum",
        regioes: ["norte-frio", "floresta-pinheiros","bosque-antigo", "campos-ouro", "condado"], 
        corGlow: "rgba(192, 192, 192, 0.77)",
        corParticula: "rgba(230, 230, 230, 0.76)",
        imagem: "../imagens/icon_montanha.png",
        descricaoCurta: "Picos imponentes com recursos raros e criaturas dominantes",
        descricaoCompleta: "As Montanhas são o domínio supremo dos perigos extremos e das riquezas incomparáveis. Rochas imensas esculpidas pelo tempo criam acentuados desníveis, penhascos vertiginosos e cumes que alternam entre neves eternas e superfícies rochosas expostas. Estes gigantes de pedra aguardam exploradores audazes que ousem desafiar suas alturas. Nos picos mais escarpados e inacessíveis, criaturas voadoras fazem seus ninhos entre as fendas das pedras, aproveitando a vantagem estratégica das alturas para detectar presas a quilômetros de distância. Os predadores terrestres adaptaram-se evolutivamente para saltar de rocha em rocha com agilidade surpreendente, ou para emboscar incautos a partir de platôs ocultos. As Montanhas são também depósitos naturais de minério puro - veios ricos que atraem mineradores ambiciosos. Antigos templos esquecidos ou monumentos de civilizações perdidas somam camadas de mistério às galerias naturais esculpidas na rocha viva. Escalar, explorar e sobreviver aqui exige equipamentos especializados, resistência sobre-humana e atenção constante às mudanças bruscas de clima e aos inimigos que se ocultam em cada sombra. É um bioma onde quem domina o terreno, domina literalmente a altura - e com ela, todo o Ark.",
        vegetacao: [
            "Pinheiros retorcidos adaptados ao frio intenso",
            "Liquens coloridos que colonizam rochas nuas",
            "Musgos resistentes à geada e ventos fortes",
            "Arbustos anões que crescem rente ao solo",
            "Flores de neve raras com propriedades medicinais únicas"
        ],
        animais: [
            "Rex - Predadores alfa dominantes de poder absoluto",
            "Yutyrannus - Tiranossauros com penas para isolamento térmico",
            "Direwolf - Lobos em alcateia com táticas de caça coordenadas",
            "Yeti - Criaturas lendárias adaptadas ao frio extremo",
            "Pteranodon - Aves de grandes altitudes com visão telescópica"
        ],

        comportamento: "Predadores extremamente territoriais e agressivos que defendem ferremente seus domínios. Criaturas adaptadas ao frio intenso com comportamentos de caça coordenada e hierarquias sociais bem definidas. A competição por recursos é feroz e constante.",
        recursos: ["Metal de alta qualidade para armas superiores", "Obsidiana para ferramentas afiadas", "Cristal puro para tecnologia avançada", "Peles raras de isolamento térmico", "Pernas de yeti com propriedades especiais"]

    },
    {
        id: 4,
        nome: "Taiga",
        tipo: "comum",
        regioes: ["condado", "bosque-antigo"],
        corGlow: "rgb(189, 167, 123)",
        corParticula: "rgba(221, 110, 7, 0.4)",
        imagem: "../imagens/icon_taiga.png",
        descricaoCurta: "Florestas boreais densas com vida especializada no frio",
        descricaoCompleta: "A Taiga é um bioma frio e vasto, marcado pela presença de grandes mamíferos adaptados às condições gélidas, predadores com pelagem espessa e herbívoros de grupo que executam migrações sazonais entre os corredores de árvores sempreverdes. Esta floresta boreal lembra ecossistemas antigos onde a sobrevivência depende da preparação para o inverno. A aparente abundância de recursos naturais - madeira de qualidade, plantas medicinais potentes, ossos de criaturas majestosas - torna a Taiga ideal para quem busca um refúgio estratégico, mas as temperaturas baixas constantes, ventos cortantes que penetram até os ossos e a escuridão prolongada do inverno ártico fazem da sobrevivência um teste de resistência física e mental. A região ecoa com florestas boreais primordiais: troncos altos que sussurram com o vento, raízes profundas que se agarram ao solo congelado, tocas sob a neve que abrigam ecossistemas completos. Caçar ou ser caçado aqui exige camuflagem perfeita, fontes de calor confiáveis e estratégia meticulosa - cada movimento pode significar a diferença entre vida e morte no ambiente implacável.",
        vegetacao: [
            "Pinheiros e abetos densos que formam dossel fechado",
            "Musgos aveludados e samambaias resistentes ao gelo",
            "Arbustos de bagas congeladas com alto valor nutricional",
            "Fungos bioluminescentes que iluminam a escuridão invernal",
            "Líquens pendentes que filtram o ar gélido"
        ],
        animais: [
            "Megaloceros - Alces gigantes com galhadas impressionantes",
            "Direbear - Ursos territoriais de hibernação profunda",
            "Castoroides - Castores construtores de represas complexas",
            "Thylacoleo - Marsupiais predadores de emboscadas arborícolas",
            "Otter - Lontras coletoras de pérolas preciosas"
        ],

        comportamento: "Animais adaptados a invernos rigorosos com comportamentos especializados de hibernação e migração...",
        recursos: [
         
            "Erva Boreal", "Fibra de Lichen", "Semente de Arbusto Taiga",
            "Azulberry", "Mejoberry", "Narcoberry"
        ],

        comportamento: "Animais adaptados a invernos rigorosos com comportamentos especializados de hibernação e migração. Territorialidade acentuada durante épocas de reprodução. Predadores desenvolveram técnicas especializadas em emboscadas silenciosas na neve.",
        recursos: ["Madeira de qualidade superior para construção", "Cimento de castor para estruturas à prova d'água", "Peles quentes para sobrevivência no frio extremo", "Pérolas sílicas para componentes eletrônicos", "Cogumelos com propriedades alucinógenas e medicinais"]

    },
    {
        id: 5,
        nome: "Bosque",
        tipo: "comum",
        regioes: ["bosque-antigo", "campos-ouro", 'floresta-pinheiros'],
        corGlow: "rgba(85, 107, 47, 0.6)",
        corParticula: "rgba(107, 142, 35, 0.4)",
        imagem: "../imagens/icon_bosque1.png",
        descricaoCurta: "Ecossistema denso e vivo com diversidade incomparável",
        descricaoCompleta: "A Floresta é um mundo à parte dentro do Ark - densa, vibrante e pulsante com sons que ecoam através de séculos de crescimento ininterrupto. Este bioma abriga árvores monumentais que alcançam o céu, troncos tão grossos que múltiplos homens não conseguem abraçar, e folhagens tão espessas que quase bloqueiam completamente a luz do sol, criando um crepúsculo perpétuo no solo da floresta. Criaturas silvestres de todos os tamanhos se escondem nas sombras profundas, enquanto carcaças e restos de animais alimentam insetos especializados e predadores oportunistas que patrulham os corredores naturais. Caminhar por esse bioma é entrar em um reino de sombras em movimento constante: galhos rangem sob pesos invisíveis, pés esmagam tapetes de folhas secas que liberam aromas terrosos, presas ágeis correm entre as raízes expostas como labirintos naturais. A construção aqui exige a criação de clareiras artificiais ou plataformas elevadas para evitar surpresas indesejadas dos habitantes nativos. A Floresta é simultaneamente fonte inesgotável de recursos e armadilha mortal - oferecendo abundância com uma mão enquanto esconde perigos mortais com a outra.",
        vegetacao: [
            "Carvalhos anciões e nogueiras de madeira preciosa",
            "Arbustos frutíferos diversos com ciclos sazonais",
            "Samambaias gigantes e vegetação rasteira densa",
            "Cogumelos comestíveis com propriedades variadas",
            "Flores silvestres que raramente veem a luz direta do sol"
        ],
        animais: [
            "Therizinosaurus - Herbívoros defensivos com garras temíveis",
            "Raptor - Predadores em bandos de inteligência surpreendente",
            "Phiomia - Porcos-domésticos de comportamento imprevisível",
            "Iguanodon - Herbívoros velozes com polegares espetados",
            "Pegomastax - Coletores irritantes que roubam itens preciosos"
        ],

        comportamento: "Equilíbrio dinâmico entre predadores especializados e presas adaptadas...",
        recursos: [
          
            "Fruta da Nogueira Gigante", "Semente de Carvalho", "Bagas da Folha Lenta",
            "Amarberry", "Azulberry", "Mejoberry", "Narcoberry", "Stimberry", "Tintoberry",
            "Maçã", "Banana", "Manga", "Cereja", "Limão"
        ]
    },
    {
        id: 6,
        nome: "Caverna",
        tipo: "comum",
        regioes: ["todas"],
        corGlow: "rgb(236, 231, 255)",
        corParticula: "rgba(233, 234, 255, 0.78)",
        imagem: "../imagens/icon_caverna.png",
        descricaoCurta: "Sistemas subterrâneos com ecossistemas únicos e tesouros profundos",

        descricaoCompleta: "As Cavernas constituem o submundo silencioso e misterioso do Ark - uma rede complexa de túneis escuros que serpenteiam nas entranhas do mundo, salões de pedra que ecoam com sons ancestrais, estalactites e estalagmites que crescem gota a gota através de milênios, criando catedrais naturais de rara beleza. O solo pavimenta-se em penumbra eterna, e a vida adaptada a esta escuridão prospera de formas extraordinárias: criaturas cegas que desenvolveram sentidos alternativos, fungos bioluminescentes que pintam as paredes com luzes fantasmagóricas, rios subterrâneos que carregam segredos para lugares ainda mais profundos. Mineradores incautos frequentemente tropeçam em galerias abandonadas de civilizações perdidas, encontrando artefatos que contam histórias de tempos esquecidos. Nesse ambiente claustrofóbico, o perigo é tanto o que se move visivelmente quanto o que se oculta nas fendas mais escuras - parasitas, criaturas que se camuflam na rocha, armadilhas naturais e psicológicas. Levar equipamentos de luz confiável, cordas de segurança e antídotos para toxinas subterrâneas é tão fundamental quanto ter reflexos aguçados. A Caverna exige silêncio absoluto, paciência de meditar e coragem para enfrentar não apenas os perigos visíveis, mas também os terrores que habitam na mente humana quando confrontada com a escuridão primordial.",
        vegetacao: [
            "Fungos bioluminescentes em diversas cores e intensidades",
            "Musgos que brilham no escuro com padrões hipnóticos",
            "Plantas carnívoras subterrâneas com mecanismos de captura sofisticados",
            "Cristais naturais luminosos que armazenam energia geotérmica",
            "Líquens radioativos que emitem calor e luz constantes"
        ],
        animais: [
            "Arthropluera - Centopeias gigantes com veneno corrosivo",
            "Pulmonoscorpius - Escorpiões cavernícolas de ataques rápidos",
            "Onyc - Morcegos predadores com ecolocalização precisa",
            "Titanomyrma - Formigas gigantes com organização militar",
            "Aberrant Creatures - Variantes mutadas pela radiação profunda"
        ],

        recursos: [
           
            "Fungo Lume-Azul", "Semente de Planta de Rocha", "Bagas da Penumbra", "Fruto da Luz", "Fungo da Alma"
        ],

        comportamento: "Criaturas perfeitamente adaptadas à escuridão permanente com sentidos aguçados que substituem a visão. Comportamentos de emboscada em território conhecido através de mapas mentais precisos. Defesa agressiva e coordenada de territórios com recursos escassos.",

    },
    {
        id: 7,
        nome: "Praia",
        tipo: "comum",
        regioes: ["todas"],
        corGlow: "rgba(64, 164, 223, 0.6)",
        corParticula: "rgba(135, 206, 235, 0.4)",
        imagem: "../imagens/icon_praia.png",
        descricaoCurta: "Zonas costeiras de transição entre terra e mar",
       descricaoCompleta: "Onde o Ark encontra o mar infinito ou grandes lagos interiores, as Praias se estabelecem como zonas iniciais de sobrevivência - áreas de transição que misturam características terrestres e marinhas em um equilíbrio precário. Palmeiras inclinadas pelo vento constante, troncos arrastados pelas marés, arbustos baixos que toleram a salinidade, e pedras esculpidas pelas ondas em formas surrealistas caracterizam essa interface dinâmica. As criaturas aquáticas e terrestres se cruzam neste limiar: Raptors anfíbios e Baryonyx emergem das águas costeiras para caçar, enquanto as árvores altas oferecem abrigo leve para aves migratórias e pequenos mamíferos. Os recursos básicos são abundantes e de fácil acesso - madeira flutuante, pedras polidas, bagas que crescem na franja da vegetação - mas permanecer muito tempo aqui sem evoluir em equipamentos e defesas é correr risco crescente, pois predadores maiores logo detectam presas fáceis e se aproximam tanto da terra quanto do mar. A Praia é o limiar psicológico entre a segurança relativa do conhecido e os perigos do mar aberto, o convite tentador à aventura e o aviso silencioso de que algo maior e mais antigo espera além do horizonte aquático.",

        vegetacao: [
            "Coqueiros e palmeiras que fornecem sombra e alimento",
            "Algas marinhas encalhadas com propriedades medicinais",
            "Plantas halófitas adaptadas à salinidade do solo",
            "Flores de praia resistentes ao vento salino",
            "Arbustos costeiros que estabilizam dunas movediças"
        ],
        animais: [
            "Ichthyosaurus - Golfinhos amigáveis de comportamento curioso",
            "Megalodon - Tubarões predadores de patrulha costeira",
            "Carbonemys - Tartarugas gigantes de movimentos lentos",
            "Plesiosaur - Répteis marinhos de pescoço longo",
            "Manta - Arraias velozes com veneno paralisante"
        ],

       
        recursos: [
            "Coco", "Alga Marinha", "Semente de Palmeira", "Erva Halófita",
            "Erva Batata do Mar", "Erva de Coral", "Pepino"
        ],

        comportamento: "Vida em constante transição entre os ambientes terrestre e marinho. Predadores marinhos patrulham sistematicamente as águas costeiras em busca de presas terrestres distraídas. Criaturas anfíbias desenvolveram comportamentos especializados para transitar eficientemente entre os dois ambientes.",

    },
    {
        id: 8,
        nome: "Deserto",
        tipo: "raro",
        regioes: ["campos-ouro"],
        corGlow: "rgba(210, 180, 140, 0.6)",
        corParticula: "rgba(210, 180, 140, 0.4)",
        imagem: "../imagens/icon_deserto.png",
        descricaoCurta: "Mar de areia sob sol inclemente com vida especializada",
        descricaoCompleta: "O Deserto é um oceano de areia movediça sob um sol inclemente que castiga sem piedade...",
        vegetacao: [
            "Cactos gigantes que armazenam água preciosa",
            "Arbustos espinhosos de raízes profundíssimas",
            "Plantas de desabrochamento noturno para evitar a evaporação",
            "Líquens de crescimento lento em rochas sombreadas",
            "Trepadeiras do deserto que buscam umidade residual"
        ],
        animais: [
            "Morellatops - Criaturas adaptadas com reservatórios de água",
            "Mantis - Insetos predadores de ataques rápidos",
            "Rock Elemental - Elementais de pedra que se camuflam no ambiente",
            "Vulture - Abutures que detectam carniça a grandes distâncias",
            "Wyvern do Fogo - Dragões que dominam as temperaturas extremas"
        ],
        comportamento: "Criaturas de hábitos predominantemente noturnos ou crepusculares para evitar o calor diurno...",
        recursos: [
          
            "Cacto-Repolho", "Bagas do Sol", "Semente de Raiz", "Erva da Areia", "Flor da Noite",
            "Stimberry", "Tintoberry"
        ]
       
    },
    {
        id: 9,
        nome: "Deserto Frio",
        tipo: "raro",
        regioes: ["norte-frio"],
        corGlow: "rgba(176, 224, 230, 0.6)",
        corParticula: "rgba(176, 224, 230, 0.4)",
        imagem: "../imagens/icon_desert_frio.png",
        descricaoCurta: "Deserto gelado com dunas congeladas e vida adaptada ao frio extremo",
        descricaoCompleta: "O Deserto Frio é uma variação paradoxal do deserto tradicional - mantém a aridez característica mas substitui o calor abrasador por um clima glacial implacável. Ventos cortantes carregam cristais de gelo que funcionam como lâminas microscópicas, dunas geladas se movem lentamente sob pressão glacial, e criaturas com pele branca imaculada ou escamas adaptadas ao frio extremo dominam este ambiente enganosamente estéril. A sobrevivência aqui depende mais do calor interno e metabolismo acelerado do que de abrigos externos, pois nenhuma construção convencional pode proteger completamente contra o frio que penetra até a alma. Este bioma ensina que o vazio gelado pode ser tão mortal quanto o calor escaldante - e que a adaptação às condições extremas requer transformações profundas tanto no corpo quanto no espírito.",
        vegetacao: [
            "Líquens polares que crescem sobre neve compactada",
            "Musgos de neve que sobrevivem a temperaturas extremas",
            "Arbustos anões com mecanismos anticongelantes naturais",
            "Flores de gelo que cristalizam à noite e desabrocham ao amanhecer",
            "Fungos termogênicos que geram calor através de reações químicas"
        ],
        animais: [
            "Direwolf Branco - Lobos adaptados com pelagem isolante dupla",
            "Mammoth de Neve - Herbívoros com presas especializadas para quebrar gelo",
            "Snow Owl - Corujas que detectam calor corporal a grandes distâncias",
            "Polar Bear - Ursos que hibernam em tocas de gelo",
            "Ice Wyvern - Dragões que respiram gelo e criam armadilhas glaciais"
        ],
        comportamento: "Criaturas com metabolismos acelerados para gerar calor corporal constante. Comportamentos de conservação de energia através de movimentos lentos e calculados. Estratégias de caça baseadas em emboscadas a partir de tocas na neve ou camuflagem no gelo.",
        recursos: ["Gelo eterno para refrigeração avançada", "Cristais de gelo com propriedades únicas", "Peles polares de isolamento térmico superior", "Gordura animal para combustível e nutrição", "Minérios preservados no permafrost"]

    },
    {
        id: 10,
        nome: "Tundra",
        tipo: "raro",
        regioes: ["norte-frio"],
        corGlow: "rgba(240, 248, 255, 0.6)",
        corParticula: "rgba(240, 248, 255, 0.4)",
        imagem: "../imagens/icon_tundra.png",
        descricaoCurta: "Planalto gelado com vegetação rarefeita e vida resistente",

        descricaoCompleta: "A Tundra é um planalto gelado de beleza austera, onde o solo permanece rígido na maior parte do ano e a vegetação sobrevive em formas rarefeitas e especializadas. Musgos resistentes formam tapetes esparsos, arbustos baixos se agarram ao solo congelado, e uma fina camada de neque frequentemente cobre a paisagem em um manto de silêncio. A caça neste ambiente exige não apenas habilidade, mas resistência sobre-humana ao frio penetrante que desafia até os equipamentos mais avançados. As noites são desproporcionalmente longas, criando um ciclo de vida adaptado a períodos prolongados de escuridão e atividade concentrada nos breves momentos de luz. Na Tundra, cada recurso é precioso, cada movimento é calculado, e a sobrevivência é uma dança delicada com os elementos mais primitivos da natureza.",
        vegetacao: [
            "Musgos de tundra que sobrevivem ao congelamento completo",
            "Arbustos anões que crescem rente ao solo para proteção",
            "Gramíneas congeladas que mantêm valor nutricional no inverno",
            "Líquens caribou que formam simbiose com fungos",
            "Flores árticas de desabrochamento acelerado no verão breve"
        ],
        animais: [
            "Megaloceros de Tundra - Alces com adaptações especiais ao frio",
            "Direbear Polar - Ursos de hibernação prolongada",
            "Arctic Hare - Lebres com camuflagem sazonal perfeita",
            "Snow Fox - Raposas de caça cooperativa",
            "Woolly Rhino - Rinocerontes com pelagem densa e chifres especiais"
        ],

        
        recursos: [
          
            "Bagas de Solo", "Erva de Raiz Profunda", "Semente de Musgo Ártico", "Flor da Luz Frígida",
            "Mejoberry", "Narcoberry"
        ],

        comportamento: "Comportamentos migratórios sazonais bem definidos. Estratégias de conservação de energia através de redução de atividade metabólica. Predadores especializados em perseguições longas que exploram a exaustão das presas no terreno difícil.",

    },
    {
        id: 11,
        nome: "Floresta Vermelha",
        tipo: "raro",
        regioes: ["floresta-pinheiros"],
        corGlow: "rgba(178, 34, 34, 0.6)",
        corParticula: "rgba(220, 20, 60, 0.4)",
        imagem: "../imagens/icon_floresta_vermelha.png",
        descricaoCurta: "Floresta de tonalidade rubra com ecossistema diabólico",
        descricaoCompleta: "A Floresta Vermelha é uma anomalia perturbadora na paisagem do Ark - uma vegetação de árvores com troncos de tonalidade rubra intensa, onde seiva escarlate escorre como sangue de feridas abertas e materiais naturais emanam da floresta em tons que variam do carmesim ao vinho. Rios pequenos e sinuosos carregam águas tingidas de vermelho, entre vegetação de fungos alienígenas e plantas que liberam feromônios psicoativos que atraem as criaturas mais diabólicas da ilha. Este bioma funciona como um filtro natural - apenas criaturas categorizadas como 'diabólicas' conseguem prosperar aqui, desenvolvendo adaptações especiais para tolerar e até prosperar na atmosfera alterada. A Floresta Vermelha não é apenas um lugar, mas uma experiência sensorial completa que desafia a sanidade e redefine os limites entre o natural e o sobrenatural no Ark.",

        vegetacao: [
            "Árvores vermelhas de seiva abundante com propriedades únicas",
            "Fungos que liberam feromônios que alteram o comportamento animal",
            "Plantas carnívoras vermelhas com mecanismos de captura avançados",
            "Líquens sanguíneos que parecem pulsar com vida própria",
            "Cipós venenosos que se movem lentamente em busca de presas"
        ],
        animais: [
            "Demonic Raptor - Raptores mutados com agressividade aumentada",
            "Blood Wyvern - Dragões sanguinários que dominam os céus vermelhos",
            "Hell Hound - Cães infernais com pelagem de fogo eterno",
            "Imp - Criaturas demoníacas pequenas de ataques em enxame",
            "Succubus - Sedutoras mortais que paralisam presas com feromônios"
        ],
        recursos: [
           
            "Bagas Vermelhas-Sangue", "Erva Vermelha de Seiva", "Semente de Cipó Carmesim", "Cogumelo Rubro", "Flor da Fúria",
            "Stimberry", "Tintoberry", "Planta X"
        ],

        comportamento: "Criaturas extremamente agressivas e territorialmente obsessivas. Comportamentos de caça em matilha coordenada com eficiência mortal. Todas as criaturas são atraídas por feromônios especiais liberados pela vegetação, criando ciclos de agressão previsíveis.",
        recursos: ["Seiva vermelha com propriedades alquímicas", "Blood packs para transfusões e poções", "Demon hide para armaduras resistentes ao fogo", "Infernal crystals que armazenam energia demoníaca", "Rare mushrooms com efeitos psicoativos poderosos"]

    },
    {
        id: 12,
        nome: "Floresta de Cogumelos",
        tipo: "raro",
        regioes: ["condado"],
        corGlow: "rgba(186, 85, 211, 0.6)",
        corParticula: "rgba(216, 191, 216, 0.4)",
        imagem: "../imagens/icon_floresta_cogumelos.png",
        descricaoCurta: "Bioma fúngico com alta concentração de minérios especiais",
        descricaoCompleta: "A Floresta de Cogumelos é uma variante fascinante da floresta tradicional, onde a diferença fundamental reside na extraordinária concentração de minérios raros, formações pedrosas únicas e plantas rasteiras que emitem feromônios específicos em sintonia com os fungos dominantes. Este ambiente atrai principalmente criaturas Suínas, transformando-se em um pasto rico em nutrientes localizado estrategicamente próximo ao minério hypo de maior concentração em todo o bioma. Esta coincidência geológica cria um santuário natural propício para estas espécies, que desenvolveram simbiose com o ecossistema fúngico. A Floresta de Cogumelos não é apenas um local de recursos, mas um exemplo vívido de como a vida encontra caminhos para prosperar através de relações mutualísticas complexas em ambientes aparentemente inóspitos.",

        vegetacao: [
            "Cogumelos gigantes coloridos que formam dossel secundário",
            "Plantas rasteiras com feromônios que atraem espécies específicas",
            "Fungos bioluminescentes que criam padrões de luz noturna",
            "Musgos especiais que filtram metais pesados do solo",
            "Flores alucinógenas que liberam esporos psicoativos"
        ],
        animais: [
            "Direboar - Javalis gigantes com presas de metal natural",
            "Mushroom Dodo - Dodos mutados com simbiose fúngica",
            "Spore Wolf - Lobos fungais que liberam esporos paralisantes",
            "Myconid - Humanoides fúngicos com inteligência coletiva",
            "Truffle Hog - Porcos farejadores que detectam minérios profundos"
        ],
        comportamento: "Criaturas suínas dominam a hierarquia do bioma através de força bruta e adaptação digestiva...",
        recursos: [
           
            "Bagas Fungosas", "Flor Esporo-Brilho", "Musgo Cavernoso",
            "Mejoberry", "Narcoberry"
        ]
    },
    {
        id: 13,
        nome: "Floresta de Fungos Abissal",
        tipo: "raro",
        regioes: ["floresta-pinheiros"],
        corGlow: "rgba(72, 61, 139, 0.6)",
        corParticula: "rgba(106, 90, 205, 0.4)",
        imagem: "../imagens/icon_fungos.png",
        descricaoCurta: "Ecossistema cavernoso alienígena adaptado à escuridão total",
        descricaoCompleta: "A Floresta de Fungos Abissal representa a adaptação máxima da vida às condições mais extremas do Ark - um ecossistema que evoluiu no completo isolamento das profundezas cavernosas, desenvolvendo características que desafiam a compreensão convencional da biologia. Esta floresta especializada desenvolveu fungos que consomem toda matéria orgânica disponível e, mais extraordinariamente, afetam o funcionamento nervoso das criaturas que habitam este ambiente, adaptando-as gradualmente a utilizar mais os sentidos da audição e ecolocalização enquanto a visão se atrofia até a cegueira completa. O resultado é um ecossistema onde sons e vibrações substituem a luz, onde predadores 'veem' através de pulsos sonoros, e onde a escuridão não é uma limitação, mas uma vantagem evolutiva. Este bioma prova que a vida não apenas persiste nas condições mais adversas, mas se transforma radicalmente para dominá-las.",

        vegetacao: [
            "Fungos nervo-ativos que alteram química cerebral",
            "Cogumelos paralisantes com esporos de ação rápida",
            "Plantas de ecolocalização que emitem pulsos sonoros",
            "Fungos consumidores que decompõem matéria inorgânica",
            "Bioluminescentes cegantes como mecanismo defensivo"
        ],
        animais: [
            "Blind Cave Raptor - Raptores cegos com audição ultrasônica",
            "Echo Bat - Morcegos de ecolocalização precisa em 360 graus",
            "Nerve Fungus - Fungos inteligentes com comportamento predatório",
            "Deep Crawler - Rastejadores cegos que detectam vibrações no solo",
            "Psychic Mushroom - Cogumelos psíquicos que influenciam mentes"
        ],
        recursos: [
          
            "Cogumelo Nervo-Ativo", "Cogumelo Eco", "Cogumelo Invocador", "Cogumelo de Bioluminescente Profunda"
        ],

        comportamento: "Criaturas com cegueira evolutiva que desenvolveram sentidos alternativos extraordinariamente aguçados. Caça baseada exclusivamente em ecolocalização e detectores de vibração supersensíveis. Comportamentos psíquicos incomuns e suspeita de capacidade de controle mental em espécies dominantes.",
        recursos: ["Nerve fungus para pesquisas neurológicas", "Echo crystals que amplificam sons específicos", "Blind sense organs para implantes sensoriais", "Psychic spores para manipulação mental", "Deep minerals formados sob pressão extrema"]

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

// FILTRAR BIOMAS POR REGIÃO - ATUALIZADO PARA MÚLTIPLAS REGIÕES
function filtrarBiomasPorRegiao(regiao) {
    const biomasFiltrados = biomas.filter(bioma => {
        // Se o bioma tem "todas" nas regiões, aparece em todas
        if (bioma.regioes.includes('todas')) {
            return true;
        }
        // Caso contrário, verifica se a região atual está no array de regiões do bioma
        return bioma.regioes.includes(regiao);
    });
    
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
    
    console.log(`Filtrados ${biomasFiltrados.length} biomas para a região: ${regiao}`);
}

// CRIAR ITEM DE BIOMA - ADICIONANDO INDICAÇÃO DE REGIÕES
function criarItemBioma(bioma, container) {
    const item = document.createElement('div');
    item.className = `bioma-item ${bioma.tipo}`;
    item.dataset.id = bioma.id;
    
    // Definir variáveis CSS para o bioma
    item.style.setProperty('--bioma-glow', bioma.corGlow);
    item.style.setProperty('--bioma-particula', bioma.corParticula);
    item.style.setProperty('--bioma-imagem', `url('${bioma.imagem}')`);
    
    // Criar badge de regiões se o bioma aparecer em mais de uma região
    const regioesBadge = bioma.regioes.length > 1 ? 
        `<span class="bioma-regioes-badge">${bioma.regioes.length} regiões</span>` : '';
    
    item.innerHTML = `
        <div class="bioma-particulas" id="particulas-${bioma.id}"></div>
        <div class="bioma-conteudo">
            <h3 class="bioma-nome">${bioma.nome} ${bioma.tipo === 'raro' ? '' : ''}</h3>
            <p class="bioma-descricao-curta">${bioma.descricaoCurta}</p>
            ${regioesBadge}
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

// MOSTRAR DETALHES DO BIOMA - ADICIONANDO INFORMAÇÃO DE REGIÕES
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
    
    // Criar lista de regiões formatada
    const regioesLista = bioma.regioes.map(regiao => {
        const nomesRegioes = {
            'campos-ouro': 'Campos de Ouro',
            'condado': 'Condado',
            'norte-frio': 'Norte Frio',
            'floresta-pinheiros': 'Floresta dos Pinheiros',
            'bosque-antigo': 'Bosque Antigo',
            'cavernas': 'Cavernas',
            'todas': 'Todas as Regiões'
        };
        return nomesRegioes[regiao] || regiao;
    }).join(', ');
    
    detalhe.innerHTML = `
        <h2>${bioma.nome} ${bioma.tipo === 'raro' ? '' : ''}</h2>
        
        <div class="bioma-descricao-completa">
            ${bioma.descricaoCompleta}
        </div>
        
        <div class="bioma-info-grid">
            <div class="bioma-info-categoria">
                <h3>Vegetação</h3>
                <ul>
                    ${bioma.vegetacao.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            
            <div class="bioma-info-categoria">
                <h3>Animais</h3>
                <ul>
                    ${bioma.animais.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            
            <div class="bioma-info-categoria">
                <h3>Comportamento</h3>
                <p>${bioma.comportamento}</p>
                <h3 style="margin-top: 20px;">Regiões</h3>
                <p>${regioesLista}</p>
                <h3 style="margin-top: 20px;">Recursos</h3>
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