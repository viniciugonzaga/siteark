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
const STAT_BACKGROUND_IMAGE_NORMAL = '/imagens/fundo_rubi_branco.jpg';
const STAT_BACKGROUND_IMAGE_ALTERED = '/imagens/fundo_rubi_laranja.jpg';

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

    return { vidaBase, armaduraBase, sanidadeBase };
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
    document.getElementById('fichaAgi').innerText = characterData.attributesBase.agi +
                                                   (characterData.appliedClassBonuses.class1.attribute === 'agi' ? 1 : 0) +
                                                   (characterData.appliedClassBonuses.class2.attribute === 'agi' ? 1 : 0);
    document.getElementById('fichaFor').innerText = characterData.attributesBase.for +
                                                   (characterData.appliedClassBonuses.class1.attribute === 'for' ? 1 : 0) +
                                                   (characterData.appliedClassBonuses.class2.attribute === 'for' ? 1 : 0);
    document.getElementById('fichaInt').innerText = characterData.attributesBase.int +
                                                   (characterData.appliedClassBonuses.class1.attribute === 'int' ? 1 : 0) +
                                                   (characterData.appliedClassBonuses.class2.attribute === 'int' ? 1 : 0);
    document.getElementById('fichaSet').innerText = characterData.attributesBase.set +
                                                   (characterData.appliedClassBonuses.class1.attribute === 'set' ? 1 : 0) +
                                                   (characterData.appliedClassBonuses.class2.attribute === 'set' ? 1 : 0);
    document.getElementById('fichaVig').innerText = characterData.attributesBase.vig +
                                                   (characterData.appliedClassBonuses.class1.attribute === 'vig' ? 1 : 0) +
                                                   (characterData.appliedClassBonuses.class2.attribute === 'vig' ? 1 : 0);

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

    const baseStats = calculateBaseStats(characterData);
    characterData.currentLife = characterData.currentLife ?? baseStats.vidaBase;
    characterData.currentSanity = characterData.currentSanity ?? baseStats.sanidadeBase;
    characterData.currentArmor = characterData.currentArmor ?? baseStats.armaduraBase;

    document.getElementById('fichaVida').value = characterData.currentLife;
    document.getElementById('fichaArmadura').value = characterData.currentArmor;
    document.getElementById('fichaSanidade').value = characterData.currentSanity;

    checkAndChangeStatBackgrounds(characterData, baseStats);

    localStorage.setItem(LOCAL_CHARACTER_STORAGE_KEY, JSON.stringify(characterData));

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
                'fichaSanidade': 'currentSanity'
            };

            const keyToUpdate = statMap[fieldId];
            if (!keyToUpdate) return;

            characterData[keyToUpdate] = newValue;
            localStorage.setItem(LOCAL_CHARACTER_STORAGE_KEY, JSON.stringify(characterData));

            const baseStats = calculateBaseStats(characterData);
            checkAndChangeStatBackgrounds(characterData, baseStats);
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
    fichaText += `Agi: ${document.getElementById('fichaAgi').innerText}\n`;
    fichaText += `For: ${document.getElementById('fichaFor').innerText}\n`;
    fichaText += `Int: ${document.getElementById('fichaInt').innerText}\n`;
    fichaText += `Set: ${document.getElementById('fichaSet').innerText}\n`;
    fichaText += `Vig: ${document.getElementById('fichaVig').innerText}\n\n`;

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
});