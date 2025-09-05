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
const LEARNED_BONUSES_STORAGE_KEY = 'learnedActionBonuses'; // Nova constante
const STAT_BACKGROUND_IMAGE_NORMAL = '../imagens/fundo_rubi_branco.jpg';
const STAT_BACKGROUND_IMAGE_ALTERED = '../imagens/fundo_rubi_rosa.jpg';

const ATTRIBUTE_MAP = {
    'agi': 'currentAgi',
    'for': 'currentFor',
    'int': 'currentInt',
    'set': 'currentSet',
    'vig': 'currentVig'
};

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
    const vig = characterData.attributesBase.vig + (characterData.appliedClassBonuses.class1.attribute === 'vig' ? 1 : 0) + (characterData.appliedClassBonuses.class2.attribute === 'vig' ? 1 : 0);
    const int = characterData.attributesBase.int + (characterData.appliedClassBonuses.class1.attribute === 'int' ? 1 : 0) + (characterData.appliedClassBonuses.class2.attribute === 'int' ? 1 : 0);
    const set = characterData.attributesBase.set + (characterData.appliedClassBonuses.class1.attribute === 'set' ? 1 : 0) + (characterData.appliedClassBonuses.class2.attribute === 'set' ? 1 : 0);
    const agi = characterData.attributesBase.agi + (characterData.appliedClassBonuses.class1.attribute === 'agi' ? 1 : 0) + (characterData.appliedClassBonuses.class2.attribute === 'agi' ? 1 : 0);
    const forc = characterData.attributesBase.for + (characterData.appliedClassBonuses.class1.attribute === 'for' ? 1 : 0) + (characterData.appliedClassBonuses.class2.attribute === 'for' ? 1 : 0);
    
    const resistenciaBase = 15 + (vig * 5);

    let vidaBase = 55 + (vig * 15);
    let sanidadeBase = 55 + (int * 10) + (set * 15);
    let armaduraBase = 5;

    if (level >= 15) armaduraBase += 1;
    if (level >= 30) armaduraBase += 1;
    if (level >= 50) vidaBase += 30;
    if (level >= 65) sanidadeBase += 20;
    if (level >= 80) armaduraBase += 10;
    if (level >= 95) { vidaBase += 20; sanidadeBase += 20; }
    if (level >= 99) armaduraBase += 10;

    return { vidaBase, armaduraBase, sanidadeBase, agi, forc, int, set, vig, resistenciaBase };
}

function checkAndChangeStatBackgrounds(characterData, baseStats) {
    const statElements = {
        vida: document.getElementById('fichaVida').closest('.main-stat'),
        armadura: document.getElementById('fichaArmadura').closest('.main-stat'),
        sanidade: document.getElementById('fichaSanidade').closest('.main-stat')
    };

    const vidaAltered = parseInt(characterData.currentLife) !== baseStats.vidaBase;
    const vidaImageUrl = vidaAltered ? STAT_BACKGROUND_IMAGE_ALTERED : STAT_BACKGROUND_IMAGE_NORMAL;
    statElements.vida.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${vidaImageUrl}')`;

    const armaduraAltered = parseInt(characterData.currentArmor) !== baseStats.armaduraBase;
    const armaduraImageUrl = armaduraAltered ? STAT_BACKGROUND_IMAGE_ALTERED : STAT_BACKGROUND_IMAGE_NORMAL;
    statElements.armadura.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${armaduraImageUrl}')`;

    const sanidadeAltered = parseInt(characterData.currentSanity) !== baseStats.sanidadeBase;
    const sanidadeImageUrl = sanidadeAltered ? STAT_BACKGROUND_IMAGE_ALTERED : STAT_BACKGROUND_IMAGE_NORMAL;
    statElements.sanidade.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${sanidadeImageUrl}')`;
    
    const resistenciaBlock = document.getElementById('resistenciaBlock');
    const resistenciaAltered = parseInt(characterData.currentResistencia) !== baseStats.resistenciaBase;
    const resistenciaImageUrl = resistenciaAltered ? STAT_BACKGROUND_IMAGE_ALTERED : STAT_BACKGROUND_IMAGE_NORMAL;
    resistenciaBlock.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${resistenciaImageUrl}')`;

    const attributeMap = {
        'fichaAgi': 'agi',
        'fichaFor': 'forc',
        'fichaInt': 'int',
        'fichaSet': 'set',
        'fichaVig': 'vig'
    };

    document.querySelectorAll('.attribute-input').forEach(input => {
        const attributeName = attributeMap[input.id];
        const attributeBaseValue = baseStats[attributeName];
        const attributeCurrentValue = parseInt(input.value);
        const parentDiv = input.closest('.stat-box');
        
        const isAltered = attributeCurrentValue !== attributeBaseValue;
        const imageUrl = isAltered ? STAT_BACKGROUND_IMAGE_ALTERED : STAT_BACKGROUND_IMAGE_NORMAL;
        
        parentDiv.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${imageUrl}')`;
    });
}

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

    document.getElementById('fichaName').innerText = characterData.name || 'Sem Nome';

    const baseStats = calculateBaseStats(characterData);
    characterData.currentLife = characterData.currentLife ?? baseStats.vidaBase;
    characterData.currentSanity = characterData.currentSanity ?? baseStats.sanidadeBase;
    characterData.currentArmor = characterData.currentArmor ?? baseStats.armaduraBase;
    characterData.currentResistencia = characterData.currentResistencia ?? baseStats.resistenciaBase;
    
    characterData.currentAgi = characterData.currentAgi ?? baseStats.agi;
    characterData.currentFor = characterData.currentFor ?? baseStats.forc;
    characterData.currentInt = characterData.currentInt ?? baseStats.int;
    characterData.currentSet = characterData.currentSet ?? baseStats.set;
    characterData.currentVig = characterData.currentVig ?? baseStats.vig;
    
    document.getElementById('fichaVida').value = characterData.currentLife;
    document.getElementById('fichaArmadura').value = characterData.currentArmor;
    document.getElementById('fichaSanidade').value = characterData.currentSanity;
    
    document.getElementById('fichaAgi').value = characterData.currentAgi;
    document.getElementById('fichaFor').value = characterData.currentFor;
    document.getElementById('fichaInt').value = characterData.currentInt;
    document.getElementById('fichaSet').value = characterData.currentSet;
    document.getElementById('fichaVig').value = characterData.currentVig;
    
    document.getElementById('fichaResistencia').value = characterData.currentResistencia;
    document.getElementById('fichaArmadura').value = characterData.currentArmor;

    checkAndChangeStatBackgrounds(characterData, baseStats);

    localStorage.setItem(LOCAL_CHARACTER_STORAGE_KEY, JSON.stringify(characterData));

    const level = parseInt(characterData.level) || 1;
    const percentage = Math.max(0, Math.min(100, level));
    const levelBarFill = document.getElementById("fichaLevelBarFill");
    if (levelBarFill) {
        levelBarFill.style.width = percentage + '%';
    }
    const photo = document.getElementById('fichaPhoto');
    if (characterData.photo && characterData.photo !== '#' && !characterData.photo.includes('data:image/gif;base64')) {
        photo.src = characterData.photo;
        photo.style.display = 'block';
    }
    
    document.getElementById('fichaLore').innerText = characterData.lore || 'Não preenchido';
    document.getElementById('fichaMutation').innerText = characterData.mutation || 'Não preenchido';
    document.getElementById('fichaClasses').innerText = `${characterData.class1} / ${characterData.class2} / ${characterData.combatClass}` || 'Não preenchido';
    document.getElementById('fichaInventory').innerText = characterData.inventory || 'Nenhum item registrado.';

    // Renderiza a lista de bônus de ações geral
    renderList(characterData.actionBonuses, 'fichaActionBonuses', (item) => `${item.action}: +${item.value}`);
    
    // Renderiza a lista de bônus de ações aprendidos
    renderList(characterData.learnedActionBonuses, 'learnedActionBonusContainer', (item) => `${item.action}: +${item.value}`);

    renderList(characterData.weapons, 'fichaWeapons', (item) => `${item.name || 'Arma sem nome'}: ${item.damageDice || 'Dano não especificado'}` + (item.condition && item.condition !== 'Nula' ? ` (${item.condition})` : ''));
    renderList(characterData.rituals, 'fichaRituals', (item) => `${item.name}: ${item.description}`);
}

function setupStatInputs() {
    document.querySelectorAll('.stat-input').forEach(input => {
        input.addEventListener('change', (event) => {
            const fieldId = event.target.id;
            const newValue = parseInt(event.target.value);

            let characterData = JSON.parse(localStorage.getItem(LOCAL_CHARACTER_STORAGE_KEY));

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
            const newValue = parseInt(event.target.value);

            let characterData = JSON.parse(localStorage.getItem(LOCAL_CHARACTER_STORAGE_KEY));

            const attributeMap = {
                'fichaAgi': 'currentAgi',
                'fichaFor': 'currentFor',
                'fichaInt': 'currentInt',
                'fichaSet': 'currentSet',
                'fichaVig': 'currentVig'
            };

            const keyToUpdate = attributeMap[fieldId];
            if (!keyToUpdate) return;

            if (fieldId === 'fichaVig') {
                const resistencia = 15 + (newValue * 5);
                const resistenciaValueElement = document.getElementById('resistenciaValue');
                if (resistenciaValueElement) {
                    resistenciaValueElement.innerText = resistencia;
                }
                characterData.currentResistencia = resistencia;
            }

            characterData[keyToUpdate] = newValue;
            localStorage.setItem(LOCAL_CHARACTER_STORAGE_KEY, JSON.stringify(characterData));

            const baseStats = calculateBaseStats(characterData);
            checkAndChangeStatBackgrounds(characterData, baseStats);
            
            setupDefensesArea();
        });
    });
}

function copyFichaDisplay() {
    let fichaText = `FICHA DE PERSONAGEM\n\n`;
    fichaText += `Nome: ${document.getElementById('fichaName').innerText}\n`;
    const levelBarFill = document.getElementById('fichaLevelBarFill');
    if (levelBarFill) {
        fichaText += `Nível: ${levelBarFill.style.width.replace('%', '')}\n\n`;
    }

    fichaText += `--- ATRIBUTOS ---\n`;
    fichaText += `Agi: ${document.getElementById('fichaAgi').value}\n`;
    fichaText += `For: ${document.getElementById('fichaFor').value}\n`;
    fichaText += `Int: ${document.getElementById('fichaInt').value}\n`;
    fichaText += `Set: ${document.getElementById('fichaSet').value}\n`;
    fichaText += `Vig: ${document.getElementById('fichaVig').value}\n\n`;

    fichaText += `--- ESTATÍSTICAS ---\n`;
    const vidaInput = document.getElementById('fichaVida');
    const armaduraInput = document.getElementById('fichaArmadura');
    const sanidadeInput = document.getElementById('fichaSanidade');
    if (vidaInput) fichaText += `Vida: ${vidaInput.value}\n`;
    if (armaduraInput) fichaText += `Armadura: ${armaduraInput.value}\n`;
    if (sanidadeInput) fichaText += `Sanidade: ${sanidadeInput.value}\n\n`;

    fichaText += `--- DETALHES ---\n`;
    fichaText += `Lore: ${document.getElementById('fichaLore').innerText}\n`;
    fichaText += `Mutação: ${document.getElementById('fichaMutation').innerText}\n`;
    fichaText += `Classes: ${document.getElementById('fichaClasses').innerText}\n`;
    fichaText += `Inventário: ${document.getElementById('fichaInventory').innerText}\n\n`;

    const bonuses = document.getElementById('fichaActionBonuses').innerText;
    if(bonuses && bonuses !== 'Nenhum item registrado.') {
        fichaText += `--- BÔNUS EM AÇÕES ---\n${bonuses}\n\n`;
    }

    const learnedBonuses = document.getElementById('learnedActionBonusContainer').innerText;
    if(learnedBonuses && learnedBonuses !== 'Nenhum item registrado.') {
        fichaText += `--- BÔNUS DE AÇÕES APRENDIDOS ---\n${learnedBonuses}\n\n`;
    }

    const weapons = document.getElementById('fichaWeapons').innerText;
    if(weapons && weapons !== 'Nenhum item registrado.') {
        fichaText += `--- ARMAS ---\n${weapons}\n\n`;
    }

    const rituals = document.getElementById('fichaRituals').innerText;
    if(rituals && rituals !== 'Nenhum item registrado.') {
        fichaText += `--- RITUAIS & PACTOS ---\n${rituals}\n\n`;
    }

    navigator.clipboard.writeText(fichaText)
        .then(() => alert("Ficha copiada para a área de transferência!"))
        .catch(err => console.error('Erro ao copiar a ficha: ', err));
}

document.addEventListener('DOMContentLoaded', () => {
    loadAndDisplayCharacterSheet();
    setupStatInputs();
    setupAttributeInputs();
    setupDefensesArea();
});

// ========================
// Funções da Nova Área de Defesas
// ========================
function setupDefensesArea() {
    const characterData = JSON.parse(localStorage.getItem(LOCAL_CHARACTER_STORAGE_KEY));
    if (!characterData) return;

    const vidaAtualInput = document.getElementById('currentHealthInput');
    const vidaMaxima = parseInt(document.getElementById('fichaVida').value);
    
    const vidaSalva = characterData.currentLife;
    if (vidaAtualInput) {
        vidaAtualInput.value = vidaSalva;
    }
    updateHealthBar(vidaSalva, vidaMaxima);

    if (vidaAtualInput) {
        vidaAtualInput.addEventListener('input', () => {
            const novaVida = parseInt(vidaAtualInput.value);
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

function renderBonusListInDiceRoller(data, containerId, title) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = `<h4 class="section-title">${title}</h4>`;
    
    if (data && data.length > 0) {
        const ul = document.createElement('ul');
        ul.classList.add('stats-list');
        data.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<strong class="sub-category-title">${item.action}</strong>: <span class="attribute-value">+${item.value}</span>`;
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
    const characterData = JSON.parse(localStorage.getItem(LOCAL_CHARACTER_STORAGE_KEY));
    
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
        const initialAttributeKey = ATTRIBUTE_MAP[attributeSelect.value];
        if (attributeValueDisplay) {
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
            if (!bonusOptionsMenu.contains(event.target) && !bonusMenuBtn.contains(event.target)) {
                bonusOptionsMenu.classList.add('hidden');
            }
        });
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

    if (rollButton) {
        rollButton.addEventListener('click', () => {
            // --- animação de giro ---
            rollButton.classList.remove("spin"); // reseta
            void rollButton.offsetWidth; // força reflow
            rollButton.classList.add("spin");

            // --- calcula o resultado após 0.8s (tempo do giro) ---
            setTimeout(() => {
                const attributeValue = parseInt(attributeValueDisplay.value);
                const bonusText = bonusInput.value.trim();
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
            }, 800); // espera o giro terminar
        });
    }
}


// Chame a função para cada menu de dados
document.addEventListener('DOMContentLoaded', () => {
    loadAndDisplayCharacterSheet();
    setupStatInputs();
    setupAttributeInputs();
    setupDefensesArea();

    // Chama a função para o menu de dados principal
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

    // Chama a função para o menu de dados de Força
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



function rolarDados() {
    const tipo = parseInt(document.getElementById("tipoDado").value);
    const qtd = parseInt(document.getElementById("quantidade").value);
    let total = 0;

    for (let i = 0; i < qtd; i++) {
        total += Math.floor(Math.random() * tipo) + 1;
    }

    document.getElementById("resultado").textContent = total;
}

// Banco de dados de eventos
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
  "Desculpe, mas um chefe encontrou vocês..."
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
  "Condição, caçado pelo Lobo, ele está te observando, infelizmente você está exposto no resto da sessão"
    ],

    minerio: [
  "Pedra",
  "Sílex",
  "Carvão",
  "Cristal",
  "Sal",
  "Âmbar",
  "Cobre",
  "Ferro",
  "Enxofre",
  "Bronze"
    ],

    regional: [
      "Uma tempestade incomum se aproxima",
      "Um vulcão local entra em atividade",
      "Um grupo de nativos aparece na região",
      "Você descobre ruínas antigas",
      "Um animal lendário surge próximo",
      "O terreno muda abruptamente",
      "Um fenômeno natural raro ocorre"
    ]
};

// Seleciona todos os blocos
document.querySelectorAll(".event-block").forEach(block => {
  const eventKey = block.dataset.event; // pega a chave do evento
  const button = block.querySelector(".event-icon");
  const img = button.querySelector("img");
  const responseBox = block.querySelector(".event-response");
  const responseText = block.querySelector(".response-text");

  button.addEventListener("click", () => {
    // --- animação de giro ---
    img.classList.remove("spin"); // reseta a animação
    void img.offsetWidth; // força reflow pra permitir reanimar
    img.classList.add("spin");

    // --- sorteia evento ---
    const lista = eventos[eventKey];
    const resultado = lista[Math.floor(Math.random() * lista.length)];

    // Mostra a resposta
    responseText.textContent = resultado;
    responseBox.classList.add("show");
  });
});

