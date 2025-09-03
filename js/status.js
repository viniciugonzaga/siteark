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

// Mapeamento dos atributos para os valores atuais salvos
const ATTRIBUTE_MAP = {
    'agi': 'currentAgi',
    'for': 'currentFor',
    'int': 'currentInt',
    'set': 'currentSet',
    'vig': 'currentVig'
};

// Função utilitária para renderizar listas
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

// Função para calcular os valores base das estatísticas
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

// Função para checar e mudar a imagem de fundo
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
    let loadedRituals;

    try {
        const dataString = localStorage.getItem(LOCAL_CHARACTER_STORAGE_KEY);
        characterData = dataString ? JSON.parse(dataString) : null;

        const ritualsString = localStorage.getItem(RITUALS_STORAGE_KEY);
        loadedRituals = ritualsString ? JSON.parse(ritualsString) : [];
    } catch (e) {
        console.error("Erro ao carregar dados do localStorage:", e);
        alert("Erro ao carregar a ficha. Os dados podem estar corrompidos.");
        return;
    }

    if (!characterData) {
        alert("Nenhuma ficha salva encontrada. Por favor, crie uma na página inicial.");
        window.location.href = 'index.html';
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

    renderList(characterData.actionBonuses, 'fichaActionBonuses', (item) => `${item.action}: +${item.value}`);
    renderList(characterData.weapons, 'fichaWeapons', (item) => `${item.name || 'Arma sem nome'}: ${item.damageDice || 'Dano não especificado'}` + (item.condition && item.condition !== 'Nula' ? ` (${item.condition})` : ''));
    renderList(loadedRituals, 'fichaRituals', (item) => `${item.name}: ${item.description}`);
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

    // Mecanismo de Rolagem de Dados
    const attributeSelect = document.getElementById('attributeSelect');
    const attributeValueDisplay = document.getElementById('attributeValueDisplay');
    const bonusInput = document.getElementById('bonusInput');
    const bonusMenuBtn = document.getElementById('bonusMenuBtn');
    const bonusOptionsMenu = document.getElementById('bonusOptionsMenu');
    const rollButton = document.getElementById('rollButton');
    const rollResult = document.getElementById('rollResult');

    // ===== NOVO CÓDIGO PARA SALVAR E CARREGAR O BÔNUS =====
    // Carregar o bônus salvo do localStorage ao iniciar
    const savedBonus = localStorage.getItem('diceBonusValue');
    if (bonusInput && savedBonus) {
        bonusInput.value = savedBonus;
    }

    // Salvar o bônus quando o usuário digita
    if (bonusInput) {
        bonusInput.addEventListener('input', () => {
            localStorage.setItem('diceBonusValue', bonusInput.value);
        });
    }
    // ========================================================


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
                    localStorage.setItem('diceBonusValue', bonusInput.value); // Salva ao clicar no botão do menu
                }
                bonusOptionsMenu.classList.add('hidden');
            });
        });
    }

    if (rollButton) {
        rollButton.addEventListener('click', () => {
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
        });
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

// Função genérica para configurar qualquer menu de rolagem de dados
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

    // Carregar bônus específico do localStorage
    const savedBonus = localStorage.getItem(`${bonusInputId}Value`);
    if (bonusInput && savedBonus) {
        bonusInput.value = savedBonus;
    }

    // Salvar bônus quando o usuário digita
    if (bonusInput) {
        bonusInput.addEventListener('input', () => {
            localStorage.setItem(`${bonusInputId}Value`, bonusInput.value);
        });
    }

    // Lógica para o seletor de atributo
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

    // Menu de bônus
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

    // Função de rolagem
    if (rollButton) {
        rollButton.addEventListener('click', () => {
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
        });
    }
}

// Chame a função para cada menu de dados
document.addEventListener('DOMContentLoaded', () => {
    // ...
    // Chame a função de configuração para o menu de dados original
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

    // Chame a função para o NOVO menu de força
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