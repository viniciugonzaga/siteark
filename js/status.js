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

// ========================
// Constantes e Funções da Ficha
// ========================
const RITUALS_STORAGE_KEY = 'selectedRitualPacts';
const LOCAL_CHARACTER_STORAGE_KEY = 'localCharacterData';
const STAT_BACKGROUND_IMAGE_NORMAL = '../imagens/fundo_rubi_branco.jpg';
const STAT_BACKGROUND_IMAGE_ALTERED = '../imagens/fundo_rubi_rosa.jpg';

const ATTRIBUTE_MAP = {
    'agi': 'currentAgi',
    'for': 'currentFor',
    'int': 'currentInt',
    'set': 'currentSet',
    'vig': 'currentVig'
};

// ========================
// Funções de Renderização
// ========================
function renderList(data, containerId, formatter) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    if (data && data.length > 0) {
        data.forEach(item => {
            const li = document.createElement('li');
            li.innerText = formatter(item);
            container.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.innerText = 'Nenhum item registrado.';
        container.appendChild(li);
    }
}

function calculateBaseStats(characterData) {
    const level = parseInt(characterData.level) || 1;
    
    // Calcular atributos base + bônus de classe
    const vig = characterData.attributesBase.vig + 
                (characterData.appliedClassBonuses?.class1?.attribute === 'vig' ? 1 : 0) + 
                (characterData.appliedClassBonuses?.class2?.attribute === 'vig' ? 1 : 0);
    const int = characterData.attributesBase.int + 
                (characterData.appliedClassBonuses?.class1?.attribute === 'int' ? 1 : 0) + 
                (characterData.appliedClassBonuses?.class2?.attribute === 'int' ? 1 : 0);
    const set = characterData.attributesBase.set + 
                (characterData.appliedClassBonuses?.class1?.attribute === 'set' ? 1 : 0) + 
                (characterData.appliedClassBonuses?.class2?.attribute === 'set' ? 1 : 0);
    const agi = characterData.attributesBase.agi + 
                (characterData.appliedClassBonuses?.class1?.attribute === 'agi' ? 1 : 0) + 
                (characterData.appliedClassBonuses?.class2?.attribute === 'agi' ? 1 : 0);
    const forc = characterData.attributesBase.for + 
                 (characterData.appliedClassBonuses?.class1?.attribute === 'for' ? 1 : 0) + 
                 (characterData.appliedClassBonuses?.class2?.attribute === 'for' ? 1 : 0);
    
    const resistenciaBase = 15 + (vig * 5);

    let vidaBase = 55 + (vig * 15);
    let sanidadeBase = 55 + (int * 10) + (set * 15);
    let armaduraBase = 5;

    // Bônus por nível
    if (level >= 15) armaduraBase += 1;
    if (level >= 30) armaduraBase += 1;
    if (level >= 50) vidaBase += 30;
    if (level >= 65) sanidadeBase += 20;
    if (level >= 80) armaduraBase += 10;
    if (level >= 95) { 
        vidaBase += 20; 
        sanidadeBase += 20; 
    }
    if (level >= 99) armaduraBase += 10;

    return { 
        vidaBase, 
        armaduraBase, 
        sanidadeBase, 
        agi, 
        forc, 
        int, 
        set, 
        vig, 
        resistenciaBase 
    };
}

function checkAndChangeStatBackgrounds(characterData, baseStats) {
    const statElements = {
        vida: document.getElementById('fichaVida')?.closest('.main-stat'),
        armadura: document.getElementById('fichaArmadura')?.closest('.main-stat'),
        sanidade: document.getElementById('fichaSanidade')?.closest('.main-stat')
    };

    // Verificar e atualizar fundo da Vida
    if (statElements.vida) {
        const vidaAltered = parseInt(characterData.currentLife) !== baseStats.vidaBase;
        const vidaImageUrl = vidaAltered ? STAT_BACKGROUND_IMAGE_ALTERED : STAT_BACKGROUND_IMAGE_NORMAL;
        statElements.vida.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${vidaImageUrl}')`;
    }

    // Verificar e atualizar fundo da Armadura
    if (statElements.armadura) {
        const armaduraAltered = parseInt(characterData.currentArmor) !== baseStats.armaduraBase;
        const armaduraImageUrl = armaduraAltered ? STAT_BACKGROUND_IMAGE_ALTERED : STAT_BACKGROUND_IMAGE_NORMAL;
        statElements.armadura.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${armaduraImageUrl}')`;
    }

    // Verificar e atualizar fundo da Sanidade
    if (statElements.sanidade) {
        const sanidadeAltered = parseInt(characterData.currentSanity) !== baseStats.sanidadeBase;
        const sanidadeImageUrl = sanidadeAltered ? STAT_BACKGROUND_IMAGE_ALTERED : STAT_BACKGROUND_IMAGE_NORMAL;
        statElements.sanidade.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${sanidadeImageUrl}')`;
    }
    
    // Verificar e atualizar fundo da Resistência
    const resistenciaBlock = document.getElementById('resistenciaBlock');
    if (resistenciaBlock) {
        const resistenciaAltered = parseInt(characterData.currentResistencia) !== baseStats.resistenciaBase;
        const resistenciaImageUrl = resistenciaAltered ? STAT_BACKGROUND_IMAGE_ALTERED : STAT_BACKGROUND_IMAGE_NORMAL;
        resistenciaBlock.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${resistenciaImageUrl}')`;
    }

    // Verificar e atualizar fundos dos atributos
    const attributeMap = {
        'fichaAgi': 'agi',
        'fichaFor': 'forc',
        'fichaInt': 'int',
        'fichaSet': 'set',
        'fichaVig': 'vig'
    };

    document.querySelectorAll('.attribute-input').forEach(input => {
        const attributeName = attributeMap[input.id];
        if (attributeName) {
            const attributeBaseValue = baseStats[attributeName];
            const attributeCurrentValue = parseInt(input.value) || 0;
            const parentDiv = input.closest('.stat-box');
            
            if (parentDiv) {
                const isAltered = attributeCurrentValue !== attributeBaseValue;
                const imageUrl = isAltered ? STAT_BACKGROUND_IMAGE_ALTERED : STAT_BACKGROUND_IMAGE_NORMAL;
                parentDiv.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${imageUrl}')`;
            }
        }
    });
}

// ========================
// Sistema de Mutação para Status
// ========================
function displayMutationsInStatus(characterData) {
    const mutationsContainer = document.getElementById('mutationsContainer');
    if (!mutationsContainer) return;
    
    mutationsContainer.innerHTML = '';
    
    // Verificar se há mutações nos dados
    const mutations = characterData.characterMutations || [];
    
    if (!mutations || mutations.length === 0) {
        mutationsContainer.innerHTML = `
            <div class="ark-section">
                <h3 class="section-title">Sistema de Mutação</h3>
                <div class="no-info">
                    Nenhuma mutação registrada.
                </div>
            </div>
        `;
        return;
    }
    
    // Ordenar: primal primeiro, depois outras
    const primalMutations = mutations.filter(m => m.type === 'primal');
    const otherMutations = mutations.filter(m => m.type !== 'primal');
    const sortedMutations = [...primalMutations, ...otherMutations];
    
    // Criar seção de mutações
    const mutationsSection = document.createElement('div');
    mutationsSection.classList.add('ark-section');
    mutationsSection.innerHTML = `
        <h3 class="section-title">Sistema de Mutação</h3>
    `;
    
    sortedMutations.forEach(mutation => {
        const typeLabels = {
            'primal': 'MUTAÇÃO PRIMAL',
            'colosso': 'COLOSSO',
            'pacto': 'PACTO',
            'joia': 'JÓIA',
            'boss': 'BOSS'
        };
        
        const mutationDiv = document.createElement('div');
        mutationDiv.classList.add('mutation-display', mutation.type);
        
        mutationDiv.innerHTML = `
            <div class="mutation-header">
                <strong class="mutation-name">${mutation.name || 'Mutação sem nome'}</strong>
                <span class="mutation-type">
                    ${typeLabels[mutation.type] || mutation.type.toUpperCase()}
                    ${mutation.type === 'primal' && mutation.stage ? ` - Estágio ${mutation.stage}` : ''}
                </span>
            </div>
            ${mutation.source ? `<p class="mutation-source"><strong>Origem:</strong> ${mutation.source}</p>` : ''}
            <div class="mutation-description">
                <strong>Descrição:</strong>
                <p>${mutation.description ? mutation.description.replace(/\n/g, '<br>') : '<span class="no-info">Não descrito</span>'}</p>
            </div>
        `;
        
        mutationsSection.appendChild(mutationDiv);
    });
    
    mutationsContainer.appendChild(mutationsSection);
}

// ========================
// Carregar e Exibir Ficha Completa
// ========================
function loadAndDisplayCharacterSheet() {
    let characterData;

    try {
        const dataString = localStorage.getItem(LOCAL_CHARACTER_STORAGE_KEY);
        characterData = dataString ? JSON.parse(dataString) : null;
    } catch (e) {
        console.error("Erro ao carregar dados do localStorage:", e);
        alert("Erro ao carregar a ficha. Os dados podem estar corrompidos.");
        return;
    }

    if (!characterData) {
        alert("Nenhuma ficha salva encontrada. Por favor, crie uma na página inicial.");
        return;
    }

    // Nome do personagem
    document.getElementById('fichaName').innerText = characterData.name || 'Sem Nome';

    // Calcular estatísticas base
    const baseStats = calculateBaseStats(characterData);
    
    // Configurar valores atuais (ou usar padrão)
    characterData.currentLife = characterData.currentLife ?? baseStats.vidaBase;
    characterData.currentSanity = characterData.currentSanity ?? baseStats.sanidadeBase;
    characterData.currentArmor = characterData.currentArmor ?? baseStats.armaduraBase;
    characterData.currentResistencia = characterData.currentResistencia ?? baseStats.resistenciaBase;
    
    characterData.currentAgi = characterData.currentAgi ?? baseStats.agi;
    characterData.currentFor = characterData.currentFor ?? baseStats.forc;
    characterData.currentInt = characterData.currentInt ?? baseStats.int;
    characterData.currentSet = characterData.currentSet ?? baseStats.set;
    characterData.currentVig = characterData.currentVig ?? baseStats.vig;
    
    // Atualizar inputs
    const vidaInput = document.getElementById('fichaVida');
    const armaduraInput = document.getElementById('fichaArmadura');
    const sanidadeInput = document.getElementById('fichaSanidade');
    
    if (vidaInput) vidaInput.value = characterData.currentLife;
    if (armaduraInput) armaduraInput.value = characterData.currentArmor;
    if (sanidadeInput) sanidadeInput.value = characterData.currentSanity;
    
    document.getElementById('fichaAgi').value = characterData.currentAgi;
    document.getElementById('fichaFor').value = characterData.currentFor;
    document.getElementById('fichaInt').value = characterData.currentInt;
    document.getElementById('fichaSet').value = characterData.currentSet;
    document.getElementById('fichaVig').value = characterData.currentVig;
    
    const resistenciaInput = document.getElementById('fichaResistencia');
    if (resistenciaInput) resistenciaInput.value = characterData.currentResistencia;

    // Verificar e atualizar fundos
    checkAndChangeStatBackgrounds(characterData, baseStats);

    // Salvar dados atualizados
    localStorage.setItem(LOCAL_CHARACTER_STORAGE_KEY, JSON.stringify(characterData));

    // Barra de nível
    const level = parseInt(characterData.level) || 1;
    const percentage = Math.max(0, Math.min(100, level));
    const levelBarFill = document.getElementById("fichaLevelBarFill");
    if (levelBarFill) {
        levelBarFill.style.width = percentage + '%';
    }
    
    // Foto
    const photo = document.getElementById('fichaPhoto');
    if (characterData.photo && characterData.photo !== '#' && !characterData.photo.includes('data:image/gif;base64')) {
        photo.src = characterData.photo;
        photo.style.display = 'block';
    }
    
    // Informações básicas
    const loreElement = document.getElementById('fichaLore');
    const classesElement = document.getElementById('fichaClasses');
    const inventoryElement = document.getElementById('fichaInventory');
    
    if (loreElement) loreElement.innerText = characterData.lore || 'Não preenchido';
    if (classesElement) classesElement.innerText = `${characterData.class1 || ''} / ${characterData.class2 || ''} / ${characterData.combatClass || ''}`.replace(/ \/ \/ /g, ' / ') || 'Não preenchido';
    if (inventoryElement) inventoryElement.innerText = characterData.inventory || 'Nenhum item registrado.';

    // Exibir mutações
    displayMutationsInStatus(characterData);

    // Renderizar listas
    renderList(characterData.actionBonuses || [], 'fichaActionBonuses', (item) => `${item.action || 'Sem nome'}: +${item.value || 0}`);
    renderList(characterData.learnedActionBonuses || [], 'learnedActionBonusContainer', (item) => `${item.action || 'Sem nome'}: +${item.value || 0} (Aprendido)`);
    renderList(characterData.weapons || [], 'fichaWeapons', (item) => {
        const name = item.name || 'Arma sem nome';
        const damage = item.damageDice || 'Dano não especificado';
        const condition = item.condition && item.condition !== 'Nula' ? ` (${item.condition})` : '';
        return `${name}: ${damage}${condition}`;
    });

    // Carregar rituais
    loadAndDisplayRituals(characterData);
    
    // Configurar área de defesas
    setupDefensesArea();
}

// ========================
// Sistema de Rituais
// ========================
function loadAndDisplayRituals(characterData) {
    let ritualsToDisplay = [];
    
    // Tentativa 1: Verificar se os rituais estão nos dados do personagem
    if (characterData.characterRituals && characterData.characterRituals.length > 0) {
        ritualsToDisplay = characterData.characterRituals;
        console.log("✅ Rituais carregados dos dados do personagem:", ritualsToDisplay);
    }
    // Tentativa 2: Verificar no localStorage específico de rituais
    else {
        try {
            const storedRituals = localStorage.getItem(RITUALS_STORAGE_KEY);
            if (storedRituals) {
                ritualsToDisplay = JSON.parse(storedRituals);
                console.log("✅ Rituais carregados do localStorage específico:", ritualsToDisplay);
                
                // Atualizar os dados do personagem com os rituais encontrados
                characterData.characterRituals = ritualsToDisplay;
                localStorage.setItem(LOCAL_CHARACTER_STORAGE_KEY, JSON.stringify(characterData));
            }
        } catch (e) {
            console.error("Erro ao carregar rituais do localStorage:", e);
        }
    }
    
    // Tentativa 3: Verificar se há rituais na propriedade antiga
    if ((!ritualsToDisplay || ritualsToDisplay.length === 0) && characterData.rituals) {
        ritualsToDisplay = characterData.rituals;
        console.log("✅ Rituais carregados da propriedade antiga 'rituals':", ritualsToDisplay);
    }

    // Função auxiliar para formatar consistentemente os rituais
    const formatRitual = (ritual) => {
        if (!ritual) return 'Ritual inválido';
        
        // Normalizar as propriedades (suporta tanto 'nome' quanto 'name')
        const nome = ritual.nome || ritual.name || 'Ritual sem nome';
        const descricao = ritual.descricao || ritual.description || 'Descrição não disponível';
        const elemento = ritual.elemento || ritual.element || '';
        const nivel = ritual.nivel || ritual.level || '';
        
        let formatted = nome;
        if (elemento) formatted += ` (${elemento})`;
        if (nivel) formatted += ` [Nv. ${nivel}]`;
        formatted += `: ${descricao}`;
        
        return formatted;
    };

    // Renderizar os rituais
    renderList(ritualsToDisplay, 'fichaRituals', formatRitual);
    
    // Debug: log para verificar o que foi carregado
    if (ritualsToDisplay.length > 0) {
        console.log(`🎉 ${ritualsToDisplay.length} ritual(s) carregado(s) para exibição`);
    } else {
        console.log("ℹ️ Nenhum ritual encontrado para exibir");
    }
}

// ========================
// Configuração de Inputs
// ========================
function setupStatInputs() {
    document.querySelectorAll('.stat-input').forEach(input => {
        input.addEventListener('change', (event) => {
            const fieldId = event.target.id;
            const newValue = parseInt(event.target.value) || 0;

            let characterData = JSON.parse(localStorage.getItem(LOCAL_CHARACTER_STORAGE_KEY) || '{}');

            const statMap = {
                'fichaVida': 'currentLife',
                'fichaArmadura': 'currentArmor',
                'fichaSanidade': 'currentSanity',
                'fichaResistencia': 'currentResistencia'
            };

            const keyToUpdate = statMap[fieldId];
            if (!keyToUpdate) return;

            characterData[keyToUpdate] = newValue;
            localStorage.setItem(LOCAL_CHARACTER_STORAGE_KEY, JSON.stringify(characterData));

            const baseStats = calculateBaseStats(characterData);
            checkAndChangeStatBackgrounds(characterData, baseStats);
            
            setupDefensesArea();
        });
    });
}

function setupAttributeInputs() {
    document.querySelectorAll('.attribute-input').forEach(input => {
        input.addEventListener('change', (event) => {
            const fieldId = event.target.id;
            const newValue = parseInt(event.target.value) || 0;

            let characterData = JSON.parse(localStorage.getItem(LOCAL_CHARACTER_STORAGE_KEY) || '{}');

            const attributeMap = {
                'fichaAgi': 'currentAgi',
                'fichaFor': 'currentFor',
                'fichaInt': 'currentInt',
                'fichaSet': 'currentSet',
                'fichaVig': 'currentVig'
            };

            const keyToUpdate = attributeMap[fieldId];
            if (!keyToUpdate) return;

            // Se for Vitalidade, atualizar resistência também
            if (fieldId === 'fichaVig') {
                const resistencia = 15 + (newValue * 5);
                const resistenciaValueElement = document.getElementById('resistenciaValue');
                if (resistenciaValueElement) {
                    resistenciaValueElement.innerText = resistencia;
                }
                characterData.currentResistencia = resistencia;
                
                // Atualizar input de resistência
                const resistenciaInput = document.getElementById('fichaResistencia');
                if (resistenciaInput) {
                    resistenciaInput.value = resistencia;
                }
            }

            characterData[keyToUpdate] = newValue;
            localStorage.setItem(LOCAL_CHARACTER_STORAGE_KEY, JSON.stringify(characterData));

            const baseStats = calculateBaseStats(characterData);
            checkAndChangeStatBackgrounds(characterData, baseStats);
            
            setupDefensesArea();
        });
    });
}

// ========================
// Copiar Ficha para Área de Transferência
// ========================
function copyFichaDisplay() {
    let fichaText = `FICHA DE PERSONAGEM - RPG ARK\n\n`;
    fichaText += `Nome: ${document.getElementById('fichaName').innerText}\n`;
    
    const levelBarFill = document.getElementById('fichaLevelBarFill');
    if (levelBarFill) {
        fichaText += `Nível: ${levelBarFill.style.width.replace('%', '')}\n`;
    }

    fichaText += `\n--- ATRIBUTOS ---\n`;
    fichaText += `Agilidade: ${document.getElementById('fichaAgi').value}\n`;
    fichaText += `Força: ${document.getElementById('fichaFor').value}\n`;
    fichaText += `Inteligência: ${document.getElementById('fichaInt').value}\n`;
    fichaText += `Sentidos: ${document.getElementById('fichaSet').value}\n`;
    fichaText += `Vitalidade: ${document.getElementById('fichaVig').value}\n`;

    fichaText += `\n--- ESTATÍSTICAS ---\n`;
    const vidaInput = document.getElementById('fichaVida');
    const armaduraInput = document.getElementById('fichaArmadura');
    const sanidadeInput = document.getElementById('fichaSanidade');
    if (vidaInput) fichaText += `Vida: ${vidaInput.value}\n`;
    if (armaduraInput) fichaText += `Armadura: ${armaduraInput.value}\n`;
    if (sanidadeInput) fichaText += `Sanidade: ${sanidadeInput.value}\n`;
    
    const resistenciaInput = document.getElementById('fichaResistencia');
    if (resistenciaInput) fichaText += `Resistência: ${resistenciaInput.value}\n`;

    // Mutações
    const mutationsContainer = document.getElementById('mutationsContainer');
    if (mutationsContainer && mutationsContainer.innerHTML && !mutationsContainer.innerHTML.includes('Nenhuma mutação')) {
        fichaText += `\n--- MUTAÇÕES ---\n`;
        mutationsContainer.querySelectorAll('.mutation-display').forEach(mutation => {
            const name = mutation.querySelector('.mutation-name')?.textContent || 'Mutação';
            const type = mutation.querySelector('.mutation-type')?.textContent || '';
            const source = mutation.querySelector('.mutation-source')?.textContent || '';
            const description = mutation.querySelector('.mutation-description p')?.textContent || '';
            
            fichaText += `\n${name} (${type})\n`;
            if (source) fichaText += `Origem: ${source.replace('Origem:', '').trim()}\n`;
            if (description) fichaText += `Descrição: ${description}\n`;
        });
    }

    fichaText += `\n--- DETALHES ---\n`;
    fichaText += `História: ${document.getElementById('fichaLore').innerText}\n`;
    fichaText += `Classes: ${document.getElementById('fichaClasses').innerText}\n`;
    fichaText += `Inventário: ${document.getElementById('fichaInventory').innerText}\n`;

    // Bônus de ações
    const bonuses = document.getElementById('fichaActionBonuses');
    if(bonuses && bonuses.innerText && bonuses.innerText !== 'Nenhum item registrado.') {
        fichaText += `\n--- BÔNUS EM AÇÕES ---\n${bonuses.innerText}\n`;
    }

    // Bônus aprendidos
    const learnedBonuses = document.getElementById('learnedActionBonusContainer');
    if(learnedBonuses && learnedBonuses.innerText && learnedBonuses.innerText !== 'Nenhum item registrado.') {
        fichaText += `\n--- BÔNUS DE AÇÕES APRENDIDOS ---\n${learnedBonuses.innerText}\n`;
    }

    // Armas
    const weapons = document.getElementById('fichaWeapons');
    if(weapons && weapons.innerText && weapons.innerText !== 'Nenhum item registrado.') {
        fichaText += `\n--- ARMAS ---\n${weapons.innerText}\n`;
    }

    // Rituais
    const rituals = document.getElementById('fichaRituals');
    if(rituals && rituals.innerText && rituals.innerText !== 'Nenhum item registrado.') {
        fichaText += `\n--- RITUAIS & PACTOS ---\n${rituals.innerText}\n`;
    }

    navigator.clipboard.writeText(fichaText)
        .then(() => alert("Ficha copiada para a área de transferência!"))
        .catch(err => {
            console.error('Erro ao copiar a ficha: ', err);
            alert("Erro ao copiar a ficha. Por favor, tente novamente ou copie manualmente.");
        });
}

// ========================
// Área de Defesas
// ========================
function setupDefensesArea() {
    const characterData = JSON.parse(localStorage.getItem(LOCAL_CHARACTER_STORAGE_KEY) || '{}');
    if (!characterData) return;

    const vidaAtualInput = document.getElementById('currentHealthInput');
    const vidaMaxima = parseInt(document.getElementById('fichaVida')?.value) || 0;
    
    if (vidaAtualInput) {
        const vidaSalva = characterData.currentLife || vidaMaxima;
        vidaAtualInput.value = vidaSalva;
        updateHealthBar(vidaSalva, vidaMaxima);

        vidaAtualInput.addEventListener('input', () => {
            const novaVida = parseInt(vidaAtualInput.value) || 0;
            if (!isNaN(novaVida)) {
                characterData.currentLife = novaVida;
                localStorage.setItem(LOCAL_CHARACTER_STORAGE_KEY, JSON.stringify(characterData));
                updateHealthBar(novaVida, vidaMaxima);
            }
        });
    }

    const resistenciaValueElement = document.getElementById('resistenciaValue');
    const armaduraValueElement = document.getElementById('armaduraValue');
    
    if (resistenciaValueElement) {
        resistenciaValueElement.innerText = characterData.currentResistencia || '0';
    }
    if (armaduraValueElement) {
        armaduraValueElement.innerText = characterData.currentArmor || '0';
    }
}

function updateHealthBar(current, max) {
    const fill = document.getElementById('healthBarFill');
    if (fill) {
        if (max > 0) {
            const percentage = Math.max(0, Math.min(100, (current / max) * 100));
            fill.style.width = percentage + '%';
        } else {
            fill.style.width = '0%';
        }
    }
}

// ========================
// Sistema de Rolagem de Dados
// ========================
function renderBonusListInDiceRoller(data, containerId, title) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = `<h4 class="section-title">${title}</h4>`;
    
    if (data && data.length > 0) {
        const ul = document.createElement('ul');
        ul.classList.add('stats-list');
        data.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<strong class="sub-category-title">${item.action || 'Ação'}</strong>: <span class="attribute-value">+${item.value || 0}</span>`;
            ul.appendChild(li);
        });
        container.appendChild(ul);
    } else {
        const p = document.createElement('p');
        p.classList.add('no-info');
        p.innerText = 'Nenhum item registrado.';
        container.appendChild(p);
    }
}

function setupDiceRoller(
    containerId,
    attributeSelectId,
    attributeValueDisplayId,
    bonusInputId,
    bonusMenuBtnId,
    bonusOptionsMenuId,
    rollButtonId,
    rollResultId
) {
    const characterData = JSON.parse(localStorage.getItem(LOCAL_CHARACTER_STORAGE_KEY) || '{}');
    
    if (!characterData) return;

    const attributeSelect = document.getElementById(attributeSelectId);
    const attributeValueDisplay = document.getElementById(attributeValueDisplayId);
    const bonusInput = document.getElementById(bonusInputId);
    const bonusMenuBtn = document.getElementById(bonusMenuBtnId);
    const bonusOptionsMenu = document.getElementById(bonusOptionsMenuId);
    const rollButton = document.getElementById(rollButtonId);
    const rollResult = document.getElementById(rollResultId);
    
    // Carrega e renderiza os bônus gerais
    const bonuses = characterData.actionBonuses || [];
    renderBonusListInDiceRoller(bonuses, 'dice-roller-bonuses', 'Bônus de Ações');

    // Carrega e renderiza os bônus aprendidos
    const learnedBonuses = characterData.learnedActionBonuses || [];
    renderBonusListInDiceRoller(learnedBonuses, 'dice-roller-learned-bonuses', 'Bônus de Ações Aprendidos');

    const savedBonus = localStorage.getItem(`${bonusInputId}Value`);
    if (bonusInput && savedBonus) {
        bonusInput.value = savedBonus;
    }

    if (bonusInput) {
        bonusInput.addEventListener('input', () => {
            localStorage.setItem(`${bonusInputId}Value`, bonusInput.value);
        });
    }

    if (attributeSelect) {
        attributeSelect.addEventListener('change', (event) => {
            const selectedAttribute = event.target.value;
            const attributeKey = ATTRIBUTE_MAP[selectedAttribute];
            if (attributeValueDisplay) {
                attributeValueDisplay.value = characterData[attributeKey] || 0;
            }
        });
        
        // Definir valor inicial
        if (attributeSelect.value && attributeValueDisplay) {
            const initialAttributeKey = ATTRIBUTE_MAP[attributeSelect.value];
            attributeValueDisplay.value = characterData[initialAttributeKey] || 0;
        }
    }

    if (bonusMenuBtn) {
        bonusMenuBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            if (bonusOptionsMenu) {
                bonusOptionsMenu.classList.toggle('hidden');
            }
        });
    }

    if (bonusOptionsMenu) {
        document.addEventListener('click', (event) => {
            if (bonusOptionsMenu && bonusMenuBtn && 
                !bonusOptionsMenu.contains(event.target) && 
                !bonusMenuBtn.contains(event.target)) {
                bonusOptionsMenu.classList.add('hidden');
            }
        });
        
        if (bonusOptionsMenu.querySelectorAll('button')) {
            bonusOptionsMenu.querySelectorAll('button').forEach(btn => {
                btn.addEventListener('click', () => {
                    if (bonusInput) {
                        bonusInput.value = `+${btn.dataset.bonus}`;
                        localStorage.setItem(`${bonusInputId}Value`, bonusInput.value);
                    }
                    bonusOptionsMenu.classList.add('hidden');
                });
            });
        }
    }

    if (rollButton) {
        rollButton.addEventListener('click', () => {
            // Animação de giro
            rollButton.classList.remove("spin");
            void rollButton.offsetWidth; // Força reflow
            rollButton.classList.add("spin");

            // Calcular resultado após animação
            setTimeout(() => {
                const attributeValue = parseInt(attributeValueDisplay?.value) || 0;
                const bonusText = bonusInput?.value.trim() || '';
                const bonusValue = bonusText ? parseInt(bonusText.replace(/\+/g, '')) || 0 : 0;
                
                const rolls = [];
                for (let i = 0; i < attributeValue; i++) {
                    rolls.push(Math.floor(Math.random() * 20) + 1);
                }

                const bestRoll = rolls.length > 0 ? Math.max(...rolls) : 0;
                const totalResult = bestRoll + bonusValue;
                
                if (rollResult) {
                    rollResult.innerText = totalResult;
                    rollResult.style.opacity = 0;
                    setTimeout(() => {
                        rollResult.style.opacity = 1;
                    }, 100);
                }
            }, 800);
        });
    }
}

// ========================
// Sistema de Eventos
// ========================
const eventos = {
    sobrevivencia: [
        "Nada acontece",
        "Você ouve um barulho desconhecido",
        "Você ouve ou vê algo muito útil",
        "O chão cai",
        "Você ouve ou vê algo verdadeiramente útil",
        "Você encontra um comerciante de alguma área da região",
        "Você encontra um NPC conhecido ou novo na região",
        "Você encontra um NPC com vontade de aventura",
        "Você encontra um NPC útil",
        "Você encontra um NPC verdadeiramente útil",
        "A PIOR situação acontece...",
        "A MELHOR situação acontece...",
        "Um nevoeiro ou neblina domina a região até a noite",
        "Um nevoeiro ou neblina domina a região até amanhecer",
        "Uma onda de calor domina a região",
        "Uma onda de frio domina a região",
        "Uma onda climática estacional domina a região nesse dia",
        "Um item da base é saqueado por alguém ou algo, enquanto em jornada",
        "Um item valioso da base é saqueado por alguém ou algo, enquanto em jornada",
        "Um item é encontrado",
        "Um item valioso é encontrado",
        "Armas de fogo travam ou ficam com defeito na aventura",
        "Uma arma do grupo enferruja em jornada",
        "Uma arma do grupo enferruja na base",
        "Um caminho de sorte é guiado sobre a missão",
        "Um rastro de um inimigo fica aparente na região",
        "Um rastro de uma criatura fica aparente na região",
        "Um rastro de uma criatura Apex ou maior fica aparente na região",
        "Um rastro de um tesouro ou templo fica aparente na região",
        "Um rastro de um 'drop' fica aparente no céu",
        "Um conjunto de recursos animais fica aparente na região",
        "Um tipo de minério fica aparente na região",
        "Um tipo de minério raro fica aparente na região",
        "Um tipo de joia aparece nas praias próximas",
        "Um item aparece nas praias próximas",
        "Um náufrago aparece nas praias próximas",
        "Um item aparece no meio da floresta mais próxima",
        "Uma carcaça fica aparente na praia",
        "Um mega tesouro ou estrutura abandonada é encontrada nas praias mais próximas",
        "Um mega tesouro ou estrutura abandonada é encontrada nas florestas mais próximas",
        "Uma carcaça de um inimigo fica aparente na região",
        "Uma carcaça de um inimigo com itens fica à mostra na região",
        "Você lembra de momentos bons, recupera +20 de Sanidade",
        "Você lembra de momentos bons, recupera +30 de Sanidade",
        "Você lembra de momentos ruins, perde 10 de Sanidade",
        "Você lembra de momentos ruins, perde 20 de Sanidade",
        "Você lembra de momentos ruins, perde 30 de Sanidade",
        "Você não se sente bem e contrai uma doença",
        "Algo do cenário cai em você",
        "Você tropeça",
        "Você tropeça e acha algo escondido no chão",
        "Você encontra uma carcaça grande",
        "Você encontra uma carcaça pequena",
        "Você encontra uma carcaça média",
        "Você encontra uma carcaça de Apex Predador velho ou morto",
        "Os Deuses não gostaram de você hoje, jogue um dado de efeito",
        "O Deus Ancião não gostou das suas ações hoje, sua mutação é bloqueada temporariamente.",
        "O Deus Ancião gostou das suas ações hoje, se for diabólico, recebe +2 dados de dano contra humanos.",
        "Os Deuses gostaram das suas ações hoje, se tiver religião, ganha +5 em um bônus por 1 dia.",
        "Você se sente com muita fome, a ilha sabe que todos são animais",
        "Você sente sede",
        "Você reflete sobre um cenário em sua mente e ganha uma dica da narrativa.",
        "Você se sente motivado hoje, recebe mais cargas de mutação (1d4)",
        "Você encontra um animal do bioma de sua escolha",
        "Você encontra uma criatura pequena, do bioma",
        "Você encontra um casal pequeno com filhotes do bioma",
        "Você encontra um filhote pequeno indefeso do bioma",
        "Você encontra um animal médio, do bioma",
        "Você encontra um casal médio, com filhotes do bioma",
        "Você encontra um filhote médio indefeso do bioma",
        "Você encontra animais maldosos médios ou pequenos te espreitando",
        "Você encontra um animal grande ou Apex do bioma",
        "Você encontra um casal grande ou Apex do bioma, com filhotes",
        "Você encontra um filhote maldoso grande ou Apex sozinho do bioma",
        "Você encontra um filhote grande ou Apex indefeso do bioma",
        "Sua mente é abalada com um encontro de um APEX Predador",
        "Seu corpo reage contra uma emboscada de um APEX Predador",
        "Vocês são salvos de algum problema por uma manada de herbívoros",
        "Vocês são salvos de um Apex Predador por surgir uma manada APEX de herbívoros",
        "Uma manada surge com filhotes bonzinhos ao lado da base",
        "Desculpe, mas um chefe encontrou vocês...",
    ],

    efeito: [
        "Buff do dia, acorda estimulado, +5 em algo",
        "Buff do dia, acorda estimulado, +1 dado em algo",
        "Buff do dia, acorda estimulado, +1 dado de dano",
        "Buff do dia, acorda estimulado, Mana infinita",
        "Buff do dia, acorda estimulado, causa +2 dados de dano em sangramento ou em peste",
        "Nerf do dia, acorda preguiçoso, -5 no bônus mais usável",
        "Nerf do dia, acorda amedrontado, -5 de sanidade sempre que errar",
        "Nerf do dia, acorda defeituoso, -1 dado em vigor e força",
        "Nerf do dia, dor de cabeça, -1 dado de inteligência e sabedoria",
        "Condição, se for mulher, acorda com sangramento, 1d12 de dano de sangramento",
        "Condição, se for homem, acorda distraído, fica marcado a sessão toda",
        "Condição, sortudo, dobro de rolagens em dados de itens, minérios e drops",
        "Condição, destroçado, sobreviveu a um combate intenso, -5 em ações no resto do dia",
        "Condição, protagonista, se sente o especial, fica marcado a sessão toda",
        "Condição, doente, acorda ou fica fraco no resto do dia, recebe 2d6 de dano de peste",
        "Condição, calorento, não consegue usar armaduras sem superaquecer ou cheirar mal no resto do dia",
        "Condição, friento, não consegue ficar sem roupas grossas sem ficar lento, -1 de agilidade",
        "Condição, com fé, pode usar religião em bônus adicionais de testes",
        "Condição, sem fé, é proibido o uso de bônus em equipe durante a sessão",
        "Condição, caçado pelo Lobo, ele está te observando, infelizmente você está exposto no resto da sessão",
        "Condição, tímido, durante a sessão começa qualquer combate com o efeito Furtivo",
        "Condição, Diabólico, se sente solitário e raivoso à noite, se tornando diabólico durante a sessão",
        "Condição, Distorção de mutação, suas mutações possuem chance de evoluir (1d2)",
        "Condição, Alimentado, se sente satisfeito e não precisa comer durante o dia na sessão",
        "Condição, Apaixonado, se sente unido e depende de um jogador, ganhando +5 em uma ação em conjunto com ele",
        "Condição, Amigo dos animais, se sente confortável com dinossauros e tem chance de ser ignorado (1d2) por predadores na cena",
        "Condição, Bondade, cura 30 pontos de vida",
        "Condição, Reflexivo, recupera 30 pontos de sanidade"
    ],

    minerio: [
        "Você encontra lascas de Pedra (1d4)",
        "Você encontra lascas de Sílex (1d4)",
        "Você encontra lascas de Carvão (1d4)",
        "Você encontra lascas de Cristal (1d4)",
        "Você encontra um Depósito de Sal (1d4)",
        "Você encontra um pedaço de Âmbar (1d4)",
        "Você encontra lascas de Cobre (1d4)",
        "Você encontra lascas de Ferro (1d4)",
        "Você encontra minério de Enxofre (1d4)",
        "Você encontra lascas de Bronze (1d4)"
    ],

    raros: [
        "Você encontra lascas de Titânio (1d4)",
        "Você encontra lascas de Prata (1d4)",
        "Você encontra lascas de Ouro (1d4)",
        "Você encontra lascas de Chumbo (1d4)",
        "Você encontra lascas de Lítio (1d4)",
        "Você encontra minério de Urânio (1d4)",
        "Você encontra lascas de Platina (1d4)",
        "Você encontra pedaços de Obsidiana (1d4)"
    ],

    Drop: [
        "Masterpod", "Criopod com Criatura Aleatória", "Criopod da Caveira", "Criopod dos Raios", "Criopod das Pestes", "Criopod de Fogo", "Criopod Sirência", "Criopod Elemental", "Criopod de Gelo", "Criopod Gamma", "Criopod Maldita", "Criopod Hypo", "Criopod da Morte", "Orbe dos Ceifadores", "Pedaço de Colosso Esquecido", "Arma Lendária de Arena de Colosso", "Arma Radiante aleatória", "Ovo de Dragão", "Ovo de Dinossauro aleatório C/H", "Ovo de Dinossauro aleatório C/H", "Ovo de Dinossauro aleatório C/H", "Ovo de Dinossauro Selecional C/H", "Ovo de Dinossauro Apex", "Ovo de Leviatã C/H", "Item Raro de Criatura já Vista", "Amuleto de Invocação de Criatura (Escolha com Cuidado)", "Mochila de Consumivel de Cena", "Descanso de Fogueira no Reino dos Esquecidos", "Um Orbe de Pesadelo Lutável", "Uma Medalhão de Guilda da Caçada", "Um dia da Benção da Ovelha na Ilha da Caveira", "Um Meteorito de Minério épico", "Um Meteorito de Minério Raro-Comum Selecionavel", "Bússola do Caídos", "Fragmento de Coroa Dourada", "Arma com Imprint selecionável de minério", "Pedaço de arma Tek", "Pedaço de item Tek", "Pedaço de sela Tek", "Pedaço de máquina Tek", "Saco de jóias 3x", "Chave de Masmorra", "Chave da caveira", "Isca de leviatã selecionável", "Barril de pólvora", "Pólvora Negra", "Lasca de Casco do Inferno", "Planta Básica aleatória", "Um brasão do Tolo", "Convite Real da família Escarlate", "Chip avançado alienígena", "Chave roxa alienígena", "Chave azul alienígena", "Chave laranja alienígena", "Anotação de alienígena", "Livro de rituais comuns", "Livros de ritual brutal de elemento aleatório", "Baú de itens aleatórios 8x", "A Possibilidade de Criar um Título", "Armadura Ideal de personagem", "Item Ideal de Personagem", "Rolar Item Raro Aleatório", "Rolar Item Raro Aleatório","Rolar Item Raro Aleatório","Rolar Item Raro Aleatório",
    ],

    Traumas: [
        "Estressado", "Medroso", "Ganancioso", "Paranoico", "Egoísta", "Estresse Pós-Traumático", "Insano", "Desesperado", "Letárgico", "Fanático", "Degenerado", "Obsessivo", "Delirante", "Silencioso", "Detentor", 
    ],

    epicos: [
        "Você encontra um Lendário Diamante(1d4)",
        "Você encontra uma Lendária Magnetita(1d4)",
        "Você encontra um Lendário Netherite(1d4)",
        "Você encontra um Lendário Elemento(1d4)",
        "Você encontra uma Lendária Cianita(1d4)",
        "Você encontra um Lendário Módulo de Minério(1d4)"
    ],

    joias: [
        "Você encontra uma Jóia de Sáfira",
        "Você encontra uma Jóia de Esmeralda",
        "Você encontra uma Jóia de Rubi",
        "Você encontra uma Jóia de Redstone",
        "Você encontra uma Jóia de Diamante",
        "Você encontra uma Jóia Hypo",
        "Você encontra uma Jóia da Noite",
        "Você encontra uma quantia de Pérolas Sílicas",
        "Você encontra uma quantia de Pérolas Negras ",
    ],

    joias_Raras: [
        "Você encontra uma Jóia de Elemento",
        "Você encontra uma Jóia de Cristal da Caveira",
        "Você encontra uma Jóia de Cristal do Inferno",
        "Você encontra uma Jóia do Véu",
        "Você encontra uma Jóia de Mefisto",
        "Você encontra um Dente de Lobo Escuro",
        "Você encontra um Pelo liso branco de Ovelha ",
        "Você encontra uma Esféra de Ion",
        "Você encontra um Medalão de Ouro Maldito",
        "Você encontra uma Jóia Solar",
    ],

    Circuitos: [
        "Caixa de Ferramentas",
        "Chip de Alcance",
        "Chip de Eficiência",
        "Sensor de movimento",
        "Sensor de Meteorológico",
        "Sensor de Mana",
        "Sensor de Wi-fi",
        "Chip de Computador Artesão",
        "Fio de Cobre",
        "Bateria",
        "Bateria de Ion",
        "Resistores de Proteção",
        "Módulos de Circuito",
        "Sucatas de Engrenagens",
        "Rótulo de Filtro",
        "Compartimento de Chips",
        "Engrenagens Mecânicas Pesadas",
        "Pistões Hidráulicos",
        "Barril de Pressão / Tanque de Ar",
        "Rotor de Hélice / Turbina",
        "Cabo de Aço Trançado",
        "Molas de Compressão Militar",
        "Célula de Hidrogênio Líquido",
        "Núcleo de Mana Condensada",
        "Fluido de Refrigeração Criogênica",
        "Servo-Motor de Precisão",
        "Scanner de Frequência (Radar / Sonar)",
        "Painel de Interface Holográfica",
        "DNA Sintético Puro",
        "Parafusos Anti-Corrosão",
        "Vidro de Pressão (Cúpula Oceânica)",
        "Placa de Aço Enferrujada",
        "Circuito Alienígena",
        "Bobina de Energia",
        "Caboes Revestidos de Chumbo",
        "Peça de Sucata Espacial",
        "Condutor de Mana-Tek",
        "Núcleo de Reator Danificado",
        "Gel de Combustível Subaquático",
        "Módulo de Decodificação",
        "Fragmento de Satélite Caído",
        "Tampa de Cryo-Core",
        "Metal Compactado Experimental",
        "Um Pedaço Tek quebrado"
    ],

    Crimes: [
        "Um encontro com um grupo de Bandidos",
        "Um encontro com um bandido",
        "Um encontro com um Meio-humano sendo emboscado",
        "Um encontro com um Ser Diabólico",
        "Um encontro em uma situação de perseguição",
        "Um encontro em uma situação Delicada",
        "Um encontro em uma situação furtiva",
        "Um encontro em uma situação de tráfico de animais",
        "Um encontro com um capanga sozinho",
        "Uma Pista de um possível Caos",
        "Um encontro Brutal com um capanga",
        "Um encontro Brutal com um Grupo de Capangas",
        "Um encontro Brutal com um Chefe de Clã",
        "Uma situação que solicita ajuda",
        "Um encontro com um NPC que tanto espera",
        "Um encontro de Criatura selvagem atacando pessoas",
        "Um interrogatório de um bandido por um motivo",
        "Nada",
        "Nada",
        "Uma briga de bar",
        "Uma briga de Casal intensa",
        "Um roubo em andamento em uma caravana",
        "Um grupo vendendo relíquias roubadas",
        "Um sequestro silencioso em um beco",
        "Um corpo encontrado em circunstâncias misteriosas",
        "Uma emboscada de caçadores de recompensas",
        "Um duelo ilegal acontecendo na rua",
        "Um mercado negro de criaturas exóticas",
        "Um culto realizando um ritual proibido",
        "Um incêndio criminoso consumindo uma vila",
        "Uma gangue cobrando taxas de 'proteção'",
        "Um saque acontecendo após um desastre",
        "Uma criança pedindo ajuda para encontrar alguém",
        "Dois comerciantes brigando por contrabando",
        "Um assassinato testemunhado ao longe",
        "Contrabandistas carregando armas estranhas",
        "Soldados desertores saqueando viajantes",
        "Explosivos plantados em uma estrutura",
        "Um ladrão tentando cortar a bolsa de um aliado",
        "Um julgamento público prestes a acontecer",
        "Uma execução pública prestes a começar",
        "Um animal raro sendo vendido ilegalmente",
        "Uma milícia local interrogando inocentes",
        "Um grupo torturando alguém em um celeiro"
    ],

    Item: [
        "Pedra",
        "Um Saco de Moedas aleatório 1d10 (Moeda de Prata)",
        "Um Saco de Moedas aleatório 1d4 (Moeda de Ouro)",
        "Sílex",
        "Areia",
        "Pelo Seco",
        "Roupa do Ark Básica",
        "Roupa de Couro com Parte",
        "Roupa do Inverno",
        "Roupa de Banho",
        "Madeira natural",
        "Madeira refinada",
        "palha",
        "Monte grande de Palha",
        "Fibra",
        "Fibra do Campos",
        "Seda",
        "Seda de Inseto",
        "Lã",
        "Lã rara",
        "Quitina comum",
        "Quitina grossa",
        "Quitina rara",
        "Ossos de um dinossauro",
        "Fóssil preservado de um Dinossauro",
        "Parte de dinossauro ou criatura",
        "Couro comunm",
        "Couro de Penas",
        "Couro",
        "Couro de jacaré",
        "Couro de Abelissauro",
        "Couro de Ceratopcideos",
        "Couro de Acrocantosssaurideos",
        "Couro de tiranossaurideos",
        "Couro de raptores",
        "Couro de Handrossaurideos",
        "Couro de Saurópodes",
        "Couro de Espinossaurideos",
        "Couro de Presas",
        "Couro de Dragão",
        "Couro de Criatura da Caveira",
        "Couro de réptil Marinho",
        "Couro de Grupo dos Pterossauros",
        "Couro de Mamiferos",
        "Couro de Criatura Mágica",
        "Couro de Apex predador",
        "Couro de Apex esquecido",
        "Cimento Natural",
        "Cimento Industrial",
        "Resina",
        "Resina vermelha",
        "Ambâr comum",
        "Ambâr do pantâno",
        "Ambâr com inseto",
        "pólvora",
        "pólvora negra",
        "pólvora do véu",
        "Argila",
        "Fertilizante",
        "Caixa de temperos",
        "Pétróleo",
        "óleo",
        "Petróelo Natural rochosso",
        "Pétróelo refinado",
        "Óleo Carmsein",
        "Polimero Orgânico",
        "Polimero industrial",
        "Eletrônico",
        "Eletrônico tek",
        "Eletrônico Quebrado",
        "Criopod vazia",
        "Criopod com Animal comum",
        "Criopod com Animal de A-M aleatório",
        "Criopod com Animal de N-Z aleatório",
        "Criopod com Animal Médio de Seleção",
        "Mapa Rasgado de Explorador",
    ],

    Frutas: [
        "Amarberry", "Azulberry", "Mejoberry", "Narcoberry", "Stimberry", "Tintoberry", "Planta X", "Semente de Trigo", "Semente de Arroz", "Semente de Soja", "Limão", "Milho", "Cenoura", "Batata", "Maçã", "Banana", "Manga", "Cereja"
    ],

    Item2: [
        "Baú Normal - Item de pedra",
        "Baú Vazio - Que Azar",
        "Baú de Pirata - Item de ferro com ouro, 25 moedas de Ouro",
        "Baú de Acumulador - 650 moedas de Ouro, Moeda Maldita",
        "Baú de Acumulador - 250 Moedas de Ouro, Arma de ferro de Ouro",
        "Baú de Acumulador - 100 Moedas de Ouro, Shouldbraker",
        "Baú de Acumulador do Tributo - 700 moedas de Ouro, 250 Moedas de Prata, 100 Moedas de Bronze",
        "Baú dos Caídos - Uma parte de Colosso, Chave de Masmorra",
        "Baú dos Caídos - Uma Arma lendária de Arena de Colosso",
        "Baú dos Caídos - Um ritual de nível diabólico ou menor qualquer de qualquer elemento",
        "Baú dos Caídos - Uma Mutação tema de um Colosso",
        "Baú de Mercador - Uma joia normal 1d4",
        "Baú de Mercador - Uma Arma de Aço com Molde de Armadura",
        "Baú de Mercador - Um Tônico de Efeito Aleatório",
        "Baú de Mercador - 3 itens aleatórios",
        "Baú de Mercador - 3 tipos de couro ou tecido de animal",
        "Baú de Mercador - Pacote de criação de Pacto Caseiro",
        "Baú de Mercador - Pacote de Fertilizantes Companhia Rola-Bosta (1d4)",
        "Baú de Mercador - Pacotes de Bebidas de Luxo (1d8)",
        "Baú de Mercador - Pacotes de Produtos Industrializados (1d4)",
        "Baú do Caçador-Lobo - Pacotes de Munição Selecionável",
        "Baú de Atenas - 300 moedas de Prata e uma Arma Radiante",
        "Baú de Atenas - Joia do Véu e 3 Rituais Brutais de qualquer elemento",
        "Baú de Atenas - Chave de Forte do Véu e 10 Ervas de Alma",
        "Baú de Atenas - Barril de Pó Negro e 1d10 de Lascas de Carvão",
        "Baú de Ceifador - Uma Mutação de Alguém que se foi...",
        "Baú de Ceifador - Caveira de Ashen e um Molde de lava",
        "Baú de Ceifador - Uma reforja de uma Arma nos Ceifadores",
        "Baú do Ceifador - Uma entrega Arriscada para os Ceifadores",
        "Baú do Ceifador - Uma Criatura da Caveira aleatória em uma Criopod de 3 escolhas",
        "Baú do Ceifador - Um Pacto de fogo ou dos Serviçais da Chama",
        "Baú do Ceifador - Um Mel de Magma Único",
        "Baú Hypo - 3 Criaturas Bêbês Médias ou Grandes aleatórias",
        "Baú Hypo - 3 Sementes aleatórias de Plantas",
        "Baú Hypo - Pacote de Ervas e Frutas de biomas 5x d10",
        "Baú Hypo - Melhoria rígida de mutação",
        "Saco de Moedas - 250 Moedas de Prata",
        "Saco de Moedas Nobre - 100 Moedas de Ouro",
        "Baú do Náufrago - 50 moedas de Prata",
        "Baú do Almirante - 10 moedas de Ouro",
        "Baú da Fúria - 100 Moedas de Ouro, um ritual de Fogo ou uma Cicatrização de um membro",
        "Baú do Chorão - 100 moedas de prata, Recupera-se de um trauma qualquer",
        "Chave da Caveira de Forte",
        "Orbe dos Sonhos",
        "Orbe dos Ceifadores - Buff em mutação",
        "Pacote de Joias 1d2 aleatório",
        "Couro de um Apex Predador"
    ],
};

// Configurar eventos
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os blocos de evento
    document.querySelectorAll(".event-block").forEach(block => {
        const eventKey = block.dataset.event; // pega a chave do evento
        const button = block.querySelector(".event-icon");
        if (!button) return;
        
        const img = button.querySelector("img");
        const responseBox = block.querySelector(".event-response");
        const responseText = block.querySelector(".response-text");

        if (button && img && responseBox && responseText) {
            button.addEventListener('click', () => {
                // Animação de giro
                img.classList.remove("spin");
                void img.offsetWidth;
                img.classList.add("spin");

                // Sorteia evento
                const lista = eventos[eventKey];
                if (lista) {
                    const resultado = lista[Math.floor(Math.random() * lista.length)];
                    responseText.textContent = resultado;
                    responseBox.classList.add("show");
                }
            });
        }
    });
});

// ========================
// Inicialização
// ========================
document.addEventListener('DOMContentLoaded', () => {
    // Carregar e exibir ficha
    loadAndDisplayCharacterSheet();
    
    // Configurar inputs
    setupStatInputs();
    setupAttributeInputs();
    setupDefensesArea();

    // Configurar rolagem de dados principal
    setupDiceRoller(
        'diceMechanismContainer', 
        'attributeSelect', 
        'attributeValueDisplay', 
        'bonusInput', 
        'bonusMenuBtn', 
        'bonusOptionsMenu', 
        'rollButton', 
        'rollResult'
    );

    // Configurar rolagem de dados de Força
    setupDiceRoller(
        'strengthDiceContainer', 
        'strengthAttributeSelect', 
        'strengthAttributeValueDisplay', 
        'strengthBonusInput', 
        'strengthBonusMenuBtn', 
        'strengthBonusOptionsMenu', 
        'strengthRollButton', 
        'strengthRollResult'
    );
});

// ========================
// Função de Rolagem de Dados Simples
// ========================
function rolarDados() {
    const tipo = parseInt(document.getElementById("tipoDado").value) || 20;
    const qtd = parseInt(document.getElementById("quantidade").value) || 1;
    let total = 0;

    for (let i = 0; i < qtd; i++) {
        total += Math.floor(Math.random() * tipo) + 1;
    }

    const resultadoElement = document.getElementById("resultado");
    if (resultadoElement) {
        resultadoElement.textContent = total;
    }
}

// Adicionar CSS para as mutações
const mutationStyles = `
.mutation-display {
    background: rgba(20, 20, 35, 0.8);
    border: 1px solid rgba(193, 240, 248, 0.15);
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 15px;
    position: relative;
}

.mutation-display.primal {
    border-left: 5px solid #ff6b6b;
    background: rgba(255, 107, 107, 0.05);
}

.mutation-display.colosso {
    border-left: 5px solid #4ecdc4;
    background: rgba(78, 205, 196, 0.05);
}

.mutation-display.pacto {
    border-left: 5px solid #ffd166;
    background: rgba(255, 209, 102, 0.05);
}

.mutation-display.joia {
    border-left: 5px solid #a78bfa;
    background: rgba(167, 139, 250, 0.05);
}

.mutation-display.boss {
    border-left: 5px solid #ff7eb3;
    background: rgba(255, 126, 179, 0.05);
}

.mutation-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(193, 240, 248, 0.1);
}

.mutation-name {
    color: #d6feff;
    font-size: 1.2rem;
    font-weight: 600;
}

.mutation-type {
    color: #888;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 3px 8px;
    border-radius: 4px;
    background: rgba(193, 240, 248, 0.1);
}

.mutation-source {
    color: #aaa;
    font-size: 0.9rem;
    margin-bottom: 10px;
}

.mutation-description {
    color: #e0e0e0;
    font-size: 0.95rem;
    line-height: 1.5;
}

.mutation-description strong {
    color: #b6fff3;
}

.mutation-description p {
    margin-top: 5px;
}
`;

// Adicionar estilos ao documento
const styleElement = document.createElement('style');
styleElement.textContent = mutationStyles;
document.head.appendChild(styleElement);