// ==============================================
// VARIÁVEIS GLOBAIS (Compartilhadas entre todos os arquivos)
// ==============================================

const attributesBase = {
    agi: 1,
    for: 1,
    int: 1,
    set: 1,
    vig: 1
};

let attributes = { ...attributesBase };
let actionBonuses = [];
let learnedActionBonuses = [];
let weapons = [];
let characterRituals = [];

// Sistema de Mutação
let characterMutations = [
    {
        name: "MUTAÇÃO PRIMAL",
        type: "primal",
        description: "",
        source: "Origem do Personagem",
        stage: 1,
        fixed: true,
        index: 0
    }
];

const predefinedConditions = [
    "Nula",
    "Sangramento",
    "Envenenado",
    "Queimando",
    "Atordoado",
    "Amedrontado",
    "Marcado",
    "Vulnerável",
    "Enfraquecido",
    "Imobilizado",
    "Cego",
    "Protegido",
    "Revelado",
    "Silenciado",
    "Exposto",
    "Abalado",
    "Fortalecido",
    "Rage"
];

let initialDistributablePoints = 5;
let bonusPointsFromLevel = 0;

// Sistema de armas
const ARMAS_FICHA_STORAGE_KEY = 'personagemArmas';
let fichaArmas = [];

// Sistema de dados
let playerScores = {};

// Constantes de armazenamento
const LOCAL_CHARACTER_STORAGE_KEY = 'localCharacterData';
const RITUALS_STORAGE_KEY = 'selectedRitualPacts';
let currentUser = null;

// ==============================================
// SISTEMA DE BÔNUS DE CLASSE
// ==============================================

const classBonuses = {
    guerreiro: {
        vida: 20,
        armadura: 20,
        nota: "O guerreiro ganha +1d6 de dano físico para cada ponto de força em seus ataques."
    },
    atirador: {
        agi: 1,
        vida: 10,
        determinacao: 10,
        nota: "Todas as suas margens de crítico em armas de fogo são reduzidas para 19."
    },
    forjador: {
        vida: 15,
        int: 1,
        resistencia: 5,
        nota: "Pode rolar 1d2 sempre que for construir um item que já aprendeu ou estudou a construir ou forjar, para diminuir a DT em 1d10."
    },
    arcano: {
        determinacao: 25,
        set: 1,
        vida: 5,
        nota: "Concede a possibilidade de realizar testes arcanos básicos sem ter aprendido. Além de poder usar a determinação em cenas diabólicas com 1d8 invés de 1d6."
    },
    cientista: {
        int: 1,
        determinacao: 20,
        vida: 5,
        nota: "O cientista possui a habilidade de reduzir qualquer tipo de teste de aprendizagem ou de memória -5, ao investigar sobre um animal, doença ou elementos químicos."
    },
    sobrevivente: {
        vida: 15,
        agi: 1,
        folego: 1,
        nota: "O sobrevivente consegue gravar, enumerar e saber exatamente como está um ambiente que sempre tenha sobrevivido, podendo saber de informações de terreno ou animais do bioma de forma básica. Além de ganhar +3 em qualquer reação de uma criatura que já tenha domado."
    },
    construtor: {
        int: 1,
        vig: 1,
        vida: 15,
        nota: "Ganha a habilidade de construir estruturas melhoradas, com a DT de eficiência menor (-5). Além de carregar metade do peso em seu inventário, não fazendo barulho por penalidade de itens."
    },
    medico: {
        int: 1,
        determinacao: 25,
        armadura: 10,
        nota: "O médico sempre que for estabilizar um ser que esteja 'estado morrendo' garante sucesso no primeiro teste durante a cena."
    }
};

let activeClassBonuses = {
    class1: null,
    class2: null
};

function applyClassBonus(className, slot) {
    // Remove bônus anterior se existir
    resetClassBonus(slot);
    
    if (!className || !classBonuses[className]) {
        activeClassBonuses[slot] = null;
        return;
    }
    
    activeClassBonuses[slot] = {
        className: className,
        bonuses: classBonuses[className]
    };
    
    console.log(`Bônus de classe ${className} aplicado para ${slot}`);
    
    // Atualizar exibição imediatamente
    updateAttributesDisplay();
    updateAttributePointsDisplay();
}

function resetClassBonus(slot) {
    if (activeClassBonuses[slot]) {
        console.log(`Removendo bônus de ${activeClassBonuses[slot].className} de ${slot}`);
        activeClassBonuses[slot] = null;
    }
}

function calculateClassBonuses() {
    let totalBonuses = {
        vida: 0,
        armadura: 0,
        agi: 0,
        for: 0,
        int: 0,
        set: 0,
        vig: 0,
        determinacao: 0,
        resistencia: 0,
        folego: 0
    };
    
    let classNotes = [];
    
    // Calcular bônus da classe 1
    if (activeClassBonuses.class1 && activeClassBonuses.class1.bonuses) {
        const bonuses = activeClassBonuses.class1.bonuses;
        Object.keys(bonuses).forEach(key => {
            if (typeof bonuses[key] === 'number') {
                totalBonuses[key] += bonuses[key];
            }
        });
        if (bonuses.nota) {
            classNotes.push(`<strong>${activeClassBonuses.class1.className.toUpperCase()}:</strong> ${bonuses.nota}`);
        }
    }
    
    // Calcular bônus da classe 2
    if (activeClassBonuses.class2 && activeClassBonuses.class2.bonuses) {
        const bonuses = activeClassBonuses.class2.bonuses;
        Object.keys(bonuses).forEach(key => {
            if (typeof bonuses[key] === 'number') {
                totalBonuses[key] += bonuses[key];
            }
        });
        if (bonuses.nota) {
            classNotes.push(`<strong>${activeClassBonuses.class2.className.toUpperCase()}:</strong> ${bonuses.nota}`);
        }
    }
    
    return {
        stats: totalBonuses,
        notes: classNotes
    };
}

// ==============================================
// FUNÇÕES BÁSICAS DO FORMULÁRIO
// ==============================================

function loginUser(username) {
    if (!username) {
        alert("Por favor, digite um nome de usuário.");
        return;
    }
    currentUser = username.toLowerCase();
    localStorage.setItem('loggedInUser', currentUser);
    console.log(`Usuário logado: ${currentUser}`);
    alert(`Bem-vindo, ${username}!`);
    updateLoginDisplay();
}

function logoutUser() {
    if (confirm("Tem certeza que deseja sair?")) {
        currentUser = null;
        localStorage.removeItem('loggedInUser');
        console.log("Usuário deslogado.");
        alert("Você foi desconectado.");
        updateLoginDisplay();
    }
}

function getLoggedInUser() {
    currentUser = localStorage.getItem('loggedInUser');
    if (currentUser) {
        updateLoginDisplay();
    }
}

function updateLoginDisplay() {
    const loginStatusDiv = document.getElementById('loginStatus');
    if (loginStatusDiv) {
        if (currentUser) {
            loginStatusDiv.innerHTML = `Logado como: <strong>${currentUser}</strong> <button onclick="logoutUser()" class="logout-btn">Sair</button>`;
        } else {
            loginStatusDiv.innerHTML = `
                <input type="text" id="usernameInput" placeholder="Nome de usuário">
                <button onclick="loginUser(document.getElementById('usernameInput').value)" class="login-btn">Entrar</button>
            `;
        }
    }
}

function saveCharacterLocal() {
    console.log("Tentativa de salvar ficha localmente.");

    const characterNameInput = document.getElementById("characterNameInput");
    let characterName = characterNameInput ? characterNameInput.value.trim() : '';

    if (!characterName) {
        characterName = prompt("Por favor, dê um nome para esta ficha antes de salvar:");
        if (!characterName) {
            alert("Salvamento cancelado. O nome da ficha é obrigatório.");
            console.warn("Salvamento cancelado: Nome da ficha não fornecido.");
            return false;
        }
        if (characterNameInput) characterNameInput.value = characterName;
    }

    updateMutationsFromForm();
    updateClassBonusesFromForm();

    // Atualizar armas antes de salvar
    weapons = fichaArmas.map(arma => ({
        name: arma.nome,
        damageDice: arma.dano,
        condition: arma.condition || 'Nula'
    }));

    const characterData = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        level: parseInt(document.getElementById("level").value) || 1,
        photo: document.getElementById("preview").src,
        lore: document.getElementById("lore").value,
        attributesBase: { ...attributesBase },
        class1: document.getElementById("class1").value,
        class2: document.getElementById("class2").value,
        combatClass: document.getElementById("combatClass").value,
        inventory: document.getElementById("inventory").value,
        actionBonuses: [...actionBonuses],
        learnedActionBonuses: [...learnedActionBonuses],
        weapons: [...weapons],
        characterRituals: [...characterRituals],
        characterMutations: [...characterMutations],
        savedName: characterName,
        savedLevel: parseInt(document.getElementById("level").value) || 1,
        activeClassBonuses: { ...activeClassBonuses }
    };

    try {
        localStorage.setItem(LOCAL_CHARACTER_STORAGE_KEY, JSON.stringify(characterData));
        localStorage.setItem(RITUALS_STORAGE_KEY, JSON.stringify(characterRituals));
        
        salvarArmasFicha();
        
        alert(`Ficha "${characterName}" salva localmente com sucesso!`);
        return true;
    } catch (e) {
        console.error("Erro ao salvar no localStorage:", e);
        alert("Erro ao salvar a ficha. Verifique o console para mais detalhes ou tente limpar o cache do navegador.");
        return false;
    }
}

function loadCharacterLocal() {
    let data;
    let loadedRituals;
    try {
        data = JSON.parse(localStorage.getItem(LOCAL_CHARACTER_STORAGE_KEY) || 'null');
        loadedRituals = JSON.parse(localStorage.getItem(RITUALS_STORAGE_KEY) || '[]');
    } catch (e) {
        console.error("Erro ao parsear dados do localStorage:", e);
        alert("Erro ao carregar a ficha salva. Os dados podem estar corrompidos. Tente limpar o cache do navegador.");
        resetFormState(); 
        return;
    }

    if (!data) {
        console.log("Nenhuma ficha salva localmente encontrada. Iniciando com formulário limpo.");
        resetFormState(); 
        return;
    }

    document.getElementById("name").value = data.name || '';
    document.getElementById("age").value = data.age || '';
    document.getElementById("level").value = data.level || '1';
    document.getElementById("lore").value = data.lore || '';

    for (const key in data.attributesBase) {
        if (attributesBase.hasOwnProperty(key)) {
            attributesBase[key] = data.attributesBase[key];
        }
    }

    document.getElementById("class1").value = data.class1 || '';
    document.getElementById("class2").value = data.class2 || '';

    // Carregar bônus de classe salvos
    if (data.activeClassBonuses) {
        activeClassBonuses = data.activeClassBonuses;
        // Reaplicar bônus
        if (activeClassBonuses.class1) {
            applyClassBonus(activeClassBonuses.class1.className, 'class1');
        }
        if (activeClassBonuses.class2) {
            applyClassBonus(activeClassBonuses.class2.className, 'class2');
        }
    } else {
        // Se não tiver dados salvos, aplicar baseado nas classes selecionadas
        if (data.class1) applyClassBonus(data.class1, 'class1');
        if (data.class2) applyClassBonus(data.class2, 'class2');
    }

    updateAttributesDisplay(); 

    document.getElementById("combatClass").value = data.combatClass || '';
    document.getElementById("inventory").value = data.inventory || '';

    const preview = document.getElementById("preview");
    if (data.photo && data.photo !== window.location.href + "#" && !data.photo.includes('data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=') && data.photo !== '') {
        preview.src = data.photo;
        preview.style.display = "block";
    } else {
        preview.style.display = "none";
        preview.src = "#";
    }

    actionBonuses = Array.isArray(data.actionBonuses) ? data.actionBonuses.map(bonus => ({
        ...bonus,
        occupiesSlot: bonus.occupiesSlot !== undefined ? bonus.occupiesSlot : !bonus.fixed
    })) : [];
    renderActionBonuses();
    updateActionBonusLimits();

    learnedActionBonuses = Array.isArray(data.learnedActionBonuses) ? data.learnedActionBonuses : [];
    renderLearnedActionBonuses();

    weapons = Array.isArray(data.weapons) ? data.weapons : [];
    renderWeapons();

    try {
        const storedRituals = localStorage.getItem(RITUALS_STORAGE_KEY);
        if (storedRituals) {
            characterRituals = JSON.parse(storedRituals);
        } else if (data.characterRituals && Array.isArray(data.characterRituals)) {
            characterRituals = data.characterRituals;
        } else if (data.rituals && Array.isArray(data.rituals)) {
            characterRituals = data.rituals;
        } else {
            characterRituals = [];
        }
    } catch (error) {
        console.error("Erro ao carregar rituais:", error);
        characterRituals = [];
    }
    
    if (!Array.isArray(characterRituals)) {
        characterRituals = [];
    }
    
    loadSelectedRitualPact();

    if (data.characterMutations && Array.isArray(data.characterMutations)) {
        characterMutations = data.characterMutations.map((mut, idx) => ({
            ...mut,
            index: idx
        }));
    }
    
    const hasPrimal = characterMutations.some(mut => mut.type === 'primal');
    if (!hasPrimal) {
        characterMutations.unshift({
            name: "MUTAÇÃO PRIMAL",
            type: "primal",
            description: "",
            source: "Origem do Personagem",
            stage: 1,
            fixed: true,
            index: 0
        });
        
        characterMutations.forEach((mut, idx) => {
            mut.index = idx;
        });
    }
    
    renderMutationSlots();
    updatePrimalStage();
    
    syncFormMutations();

    const characterNameInput = document.getElementById("characterNameInput");
    if (characterNameInput) {
        characterNameInput.value = data.savedName || '';
    }

    fichaArmas = carregarArmasFicha();
    
    weapons = fichaArmas.map(arma => ({
        name: arma.nome,
        damageDice: arma.dano,
        condition: arma.condition || 'Nula'
    }));
    renderWeapons();

    validateLevelInput();
    updateAttributePointsDisplay();

    alert(`Ficha "${data.savedName || 'Sem Nome'}" carregada automaticamente!`);
    document.getElementById("results").scrollIntoView({ behavior: 'smooth' });
}

function resetFormState() {
    const preview = document.getElementById("preview");
    preview.style.display = "none";
    preview.src = "#";

    for (const key in attributesBase) {
        attributesBase[key] = 1;
    }
    
    // Resetar bônus de classe
    activeClassBonuses = {
        class1: null,
        class2: null
    };
    
    updateAttributesDisplay();
    document.getElementById('class1').value = '';
    document.getElementById('class2').value = '';

    actionBonuses = [];
    renderActionBonuses();
    updateActionBonusLimits(); 
    learnedActionBonuses = [];
    renderLearnedActionBonuses();

    weapons = [];
    renderWeapons();
    characterRituals = []; 
    loadSelectedRitualPact();

    characterMutations = [
        {
            name: "MUTAÇÃO PRIMAL",
            type: "primal",
            description: "",
            source: "Origem do Personagem",
            stage: 1,
            fixed: true,
            index: 0
        }
    ];
    renderMutationSlots();
    updatePrimalStage();

    const characterNameInput = document.getElementById("characterNameInput");
    if (characterNameInput) characterNameInput.value = '';

    document.getElementById("level").value = '1';
    validateLevelInput(); 
    updateAttributePointsDisplay();

    document.getElementById("results").style.display = "none";

    fichaArmas = [];
    localStorage.removeItem(ARMAS_FICHA_STORAGE_KEY);
    
    if (typeof atualizarArmasDaFicha === 'function') {
        atualizarArmasDaFicha();
    }
}

function resetForm() {
    if (confirm("Tem certeza que deseja limpar todo o formulário e perder o progresso atual?")) {
        document.getElementById("characterForm").reset(); 
        resetFormState(); 
        alert("Formulário limpo para uma nova ficha.");
    }
}

function saveForm() {
    saveCharacterLocal();
}

function loadForm() {
    getLoggedInUser();
    loadCharacterLocal();
    document.getElementById("results").style.display = "none";
}

// ==============================================
// FUNÇÕES DE ATRIBUTOS
// ==============================================

function calculateCurrentDistributedPoints() {
    return Object.values(attributesBase).reduce((sum, val) => sum + (val - 1), 0);
}

function validateLevelInput() {
    const levelInput = document.getElementById("level");
    let level = parseInt(levelInput.value) || 1;

    if (level > 100) {
        level = 100;
        levelInput.value = 100;
    } else if (level < 1) {
        level = 1;
        levelInput.value = 1;
    }
    
    bonusPointsFromLevel = 0;
    if (level >= 15) bonusPointsFromLevel += 1;
    if (level >= 65) bonusPointsFromLevel += 1;
    if (level >= 99) bonusPointsFromLevel += 1;
    
    initialDistributablePoints = 5;
    
    updateAttributePointsDisplay(); 
    updateActionBonusLimits(); 
    updateLevelBar();
    updatePrimalStage();
}

function updateAttributesDisplay() {
    for (const key in attributesBase) {
        attributes[key] = attributesBase[key];
    }

    // Adicionar bônus de classe aos atributos
    const classBonuses = calculateClassBonuses();
    
    for (const key in attributes) {
        const element = document.getElementById(`${key}Value`);
        if (element) {
            const baseValue = attributes[key];
            const bonusValue = classBonuses.stats[key] || 0;
            const totalValue = baseValue + bonusValue;
            element.textContent = totalValue;
            
            // Adicionar tooltip se houver bônus
            if (bonusValue > 0) {
                element.title = `Base: ${baseValue} + Bônus de classe: ${bonusValue}`;
                element.style.color = '#4ade80'; // Verde para indicar bônus
            } else {
                element.removeAttribute('title');
                element.style.color = ''; // Resetar cor
            }
        }
    }
}

function changeAttribute(attributeName, change) {
    const currentAttributeBaseValue = attributesBase[attributeName];
    const totalAllowedPoints = initialDistributablePoints + bonusPointsFromLevel; 
    const currentDistributedPoints = calculateCurrentDistributedPoints();
    const remainingPoints = totalAllowedPoints - currentDistributedPoints;

    if (currentAttributeBaseValue + change < 1) {
        return;
    }

    if (change > 0 && remainingPoints <= 0) {
        alert("Você não tem mais pontos de atributo disponíveis!");
        return;
    }

    attributesBase[attributeName] += change;
    updateAttributesDisplay();
    updateAttributePointsDisplay();
}

function updateAttributePointsDisplay() {
    const totalAllowedPoints = initialDistributablePoints + bonusPointsFromLevel;
    const currentDistributedPoints = calculateCurrentDistributedPoints();
    const remainingPoints = totalAllowedPoints - currentDistributedPoints;

    const availablePointsSpan = document.getElementById("availableAttributePoints");
    if (availablePointsSpan) {
        availablePointsSpan.textContent = remainingPoints;
        availablePointsSpan.style.color = remainingPoints >= 0 ? '#4ade80' : '#ef4444';
    }
}

function updateLevelBar() {
    const levelInput = document.getElementById("level");
    const level = parseInt(levelInput.value) || 1;
    const levelBarFill = document.getElementById("levelBarFill");

    const percentage = Math.max(0, Math.min(100, level));

    if (levelBarFill) {
        levelBarFill.style.width = percentage + '%';
    }
}

// ==============================================
// SISTEMA DE BÔNUS DE AÇÃO
// ==============================================

const getSlotCost = (value) => {
    switch (value) {
        case 5: return 1;
        case 10: return 2;
        case 15: return 3;
        case 20: return 4;
        default: return 1;
    }
};

function calculateUsedSlots() {
    return actionBonuses.filter(bonus => bonus.occupiesSlot).reduce((sum, bonus) => sum + getSlotCost(bonus.value), 0);
}

function updateActionBonusLimits() {
    const level = parseInt(document.getElementById("level").value) || 1;
    let totalSlots = 9;
    let maxBonusValue = 15;

    if (level >= 30) totalSlots = 12;
    if (level >= 50) {
        totalSlots = 15;
        maxBonusValue = 20;
    }
    if (level >= 80) totalSlots = 20;

    document.getElementById('totalActionSlots').textContent = totalSlots;
    document.getElementById('usedActionSlots').textContent = calculateUsedSlots();
    document.getElementById('remainingActionSlots').textContent = totalSlots - calculateUsedSlots();

    const tekBonusIndex = actionBonuses.findIndex(b => b.action === 'Criação Tek' && b.fixed);
    if (level >= 95 && tekBonusIndex === -1) {
        actionBonuses.push({ action: 'Criação Tek', value: 5, fixed: true, occupiesSlot: false });
    } else if (level < 95 && tekBonusIndex !== -1) {
        actionBonuses.splice(tekBonusIndex, 1);
    }

    renderActionBonuses();
    renderLearnedActionBonuses();

    const addActionButton = document.querySelector('button[onclick="addActionBonus()"]');
    if (addActionButton) {
        addActionButton.disabled = (totalSlots - calculateUsedSlots() <= 0 && totalSlots > 0);
    }
}

function addActionBonus(action = '', value = 5) {
    const level = parseInt(document.getElementById("level").value) || 1;
    let totalSlots = 9;
    if (level >= 30) totalSlots = 12;

    const currentCost = getSlotCost(value);
    if (calculateUsedSlots() + currentCost > totalSlots) {
        alert("Limite de slots para Bônus de Ação atingido!");
        return;
    }

    const newBonus = { action: action, value: value, fixed: false, occupiesSlot: true };
    actionBonuses.push(newBonus);
    renderActionBonuses(); 
    updateActionBonusLimits(); 
}

function removeActionBonus(index) {
    if (actionBonuses[index].fixed) {
        alert("Este bônus é fixo e não pode ser removido manualmente.");
        return;
    }
    actionBonuses.splice(index, 1);
    renderActionBonuses(); 
    updateActionBonusLimits(); 
}

function renderActionBonuses() {
    const container = document.getElementById('actionBonusContainer');
    if (!container) return;

    container.innerHTML = '';
    const level = parseInt(document.getElementById("level").value) || 1;
    const maxBonusValue = (level >= 50) ? 20 : 15;

    actionBonuses.forEach((bonus, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('action-bonus-item');

        const removeButtonHtml = bonus.fixed ?
            `<button type="button" class="remove-bonus-btn disabled" disabled>X</button>` :
            `<button type="button" class="remove-bonus-btn" onclick="removeActionBonus(${index})">X</button>`;

        const inputReadonly = bonus.fixed ? 'readonly' : '';
        const selectDisabled = bonus.fixed ? 'disabled' : '';

        itemDiv.innerHTML = `
            ${removeButtonHtml}
            <label for="actionName${index}">Ação:</label>
            <input type="text" id="actionName${index}" value="${bonus.action}" onchange="updateActionBonus(${index}, 'action', this.value)" placeholder="Nome da Ação" ${inputReadonly}>
            <label for="actionValue${index}">Bônus:</label>
            <select id="actionValue${index}" class="action-bonus-value-select" onchange="updateActionBonus(${index}, 'value', parseInt(this.value))" ${selectDisabled}>
                <option value="5">+5</option>
                ${maxBonusValue >= 10 ? '<option value="10">+10</option>' : ''}
                ${maxBonusValue >= 15 ? '<option value="15">+15</option>' : ''}
                ${maxBonusValue >= 20 ? '<option value="20">+20</option>' : ''}
            </select>
        `;
        container.appendChild(itemDiv);

        const selectElement = itemDiv.querySelector(`#actionValue${index}`);
        if (selectElement) {
            if (selectElement.querySelector(`option[value="${bonus.value}"]`)) {
                selectElement.value = bonus.value;
            } else {
                if (bonus.value > maxBonusValue) {
                    selectElement.value = maxBonusValue;
                    bonus.value = maxBonusValue; 
                } else {
                    selectElement.value = 5; 
                    bonus.value = 5; 
                }
            }
        }
    });
}

function updateActionBonus(index, field, newValue) {
    if (actionBonuses[index].fixed && (field === 'action' || field === 'value')) {
        alert("Este bônus é fixo e não pode ser editado manualmente.");
        if (field === 'action') {
            document.getElementById(`actionName${index}`).value = actionBonuses[index].action;
        } else if (field === 'value') {
            document.getElementById(`actionValue${index}`).value = actionBonuses[index].value;
        }
        return;
    }

    if (field === 'value' && actionBonuses[index].occupiesSlot) {
        const originalValue = actionBonuses[index].value;
        const originalCost = getSlotCost(originalValue);
        const newCost = getSlotCost(newValue);

        const level = parseInt(document.getElementById("level").value) || 1;
        let totalSlots = 9;
        if (level >= 30) totalSlots = 12;
        if (level >= 50) totalSlots = 15;
        if (level >= 80) totalSlots = 20;

        if (newCost > originalCost && (calculateUsedSlots() - originalCost + newCost) > totalSlots) {
            alert("Mudar este bônus para este valor excederia o limite de slots!");
            document.getElementById(`actionValue${index}`).value = originalValue; 
            return;
        }
    }

    actionBonuses[index][field] = newValue;
    updateActionBonusLimits(); 
}

function addLearnedActionBonus(action = '', value = 5) {
    learnedActionBonuses.push({ action: action, value: value });
    renderLearnedActionBonuses(); 
}

function removeLearnedActionBonus(index) {
    learnedActionBonuses.splice(index, 1);
    renderLearnedActionBonuses(); 
}

function renderLearnedActionBonuses() {
    const container = document.getElementById('learnedActionBonusContainer');
    if (!container) return;

    container.innerHTML = '';
    const level = parseInt(document.getElementById("level").value) || 1;
    const maxBonusValue = (level >= 50) ? 20 : 15;

    learnedActionBonuses.forEach((bonus, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('learned-action-bonus-item');

        itemDiv.innerHTML = `
            <button type="button" class="remove-learned-bonus-btn" onclick="removeLearnedActionBonus(${index})">X</button>
            <label for="learnedActionName${index}">Ação:</label>
            <input type="text" id="learnedActionName${index}" value="${bonus.action}" onchange="updateLearnedActionBonus(${index}, 'action', this.value)" placeholder="Nome da Ação">
            <label for="learnedActionValue${index}">Bônus:</label>
            <select id="learnedActionValue${index}" class="learned-action-bonus-value-select" onchange="updateLearnedActionBonus(${index}, 'value', parseInt(this.value))">
                <option value="5">+5</option>
                ${maxBonusValue >= 10 ? '<option value="10">+10</option>' : ''}
                ${maxBonusValue >= 15 ? '<option value="15">+15</option>' : ''}
                ${maxBonusValue >= 20 ? '<option value="20">+20</option>' : ''}
            </select>
        `;
        container.appendChild(itemDiv);

        const selectElement = itemDiv.querySelector(`#learnedActionValue${index}`);
        if (selectElement) {
            if (selectElement.querySelector(`option[value="${bonus.value}"]`)) {
                selectElement.value = bonus.value;
            } else {
                if (bonus.value > maxBonusValue) {
                    selectElement.value = maxBonusValue;
                    bonus.value = maxBonusValue;
                } else {
                    selectElement.value = 5;
                    bonus.value = 5;
                }
            }
        }
    });
}

function updateLearnedActionBonus(index, field, newValue) {
    learnedActionBonuses[index][field] = newValue;
    renderLearnedActionBonuses(); 
}

// ==============================================
// SISTEMA DE ARMAS (MANUAL)
// ==============================================

function addWeapon(name = '', damageDice = '', condition = 'Nula') {
    weapons.push({ name: name, damageDice: damageDice, condition: condition });
    renderWeapons();
}

function removeWeapon(index) {
    if (confirm("Tem certeza que deseja remover esta arma?")) {
        weapons.splice(index, 1);
        renderWeapons();
    }
}

function updateWeapon(index, field, value) {
    if (weapons[index]) {
        weapons[index][field] = value;
    }
}

function renderWeapons() {
    const container = document.getElementById('weaponsContainer');
    if (!container) return;

    container.innerHTML = '';

    weapons.forEach((weapon, index) => {
        const weaponDiv = document.createElement('div');
        weaponDiv.classList.add('weapon-item');

        const conditionOptions = predefinedConditions.map(cond =>
            `<option value="${cond}" ${weapon.condition === cond ? 'selected' : ''}>${cond}</option>`
        ).join('');

        weaponDiv.innerHTML = `
            <div class="weapon-header">
                <button type="button" class="remove-item-btn" onclick="removeWeapon(${index})">X</button>
            </div>
            <div class="weapon-fields">
                <label for="weaponName${index}">Nome da Arma:</label>
                <input type="text" id="weaponName${index}" value="${weapon.name}" onchange="updateWeapon(${index}, 'name', this.value)" placeholder="Ex: Espada Larga">

                <label for="weaponDamage${index}">Dano:</label>
                <input type="text" id="weaponDamage${index}" value="${weapon.damageDice}" onchange="updateWeapon(${index}, 'damageDice', this.value)" placeholder="Ex: 4d10">

                <label for="weaponCondition${index}">Condição:</label>
                <select id="weaponCondition${index}" onchange="updateWeapon(${index}, 'condition', this.value)">
                    ${conditionOptions}
                </select>
            </div>
        `;
        container.appendChild(weaponDiv);
    });
}

// ==============================================
// SISTEMA DE MUTAÇÃO
// ==============================================

function syncFormMutations() {
    const primalMutation = characterMutations.find(mut => mut.type === 'primal');
    if (primalMutation) {
        const primalNameInput = document.getElementById('mutationName_0');
        const primalDescInput = document.getElementById('mutationDescription_0');
        const primalSourceInput = document.getElementById('mutationSource_0');
        
        if (primalNameInput) primalNameInput.value = primalMutation.name;
        if (primalDescInput) primalDescInput.value = primalMutation.description;
        if (primalSourceInput) primalSourceInput.value = primalMutation.source;
    }
}

function updateMutationsFromForm() {
    characterMutations.forEach((mutation, index) => {
        const nameInput = document.getElementById(`mutationName_${index}`);
        const descInput = document.getElementById(`mutationDescription_${index}`);
        const sourceInput = document.getElementById(`mutationSource_${index}`);
        const typeInput = document.getElementById(`mutationType_${index}`);
        
        if (nameInput) mutation.name = nameInput.value || mutation.name;
        if (descInput) mutation.description = descInput.value;
        if (sourceInput) mutation.source = sourceInput.value;
        if (typeInput) mutation.type = typeInput.value;
    });
}

function renderMutationSlots() {
    const container = document.getElementById('additionalMutationSlots');
    
    if (!container) {
        console.warn("Container de mutações não encontrado");
        return;
    }
    
    container.innerHTML = '';
    
    updatePrimalStage();
    
    const additionalMutations = characterMutations.filter(mut => mut.type !== 'primal');
    
    additionalMutations.forEach((mutation, index) => {
        const slotIndex = mutation.index;
        const slotDiv = document.createElement('div');
        slotDiv.classList.add('mutation-slot');
        slotDiv.classList.add(`${mutation.type}-slot`);
        slotDiv.setAttribute('data-index', slotIndex);
        
        const typeLabels = {
            'colosso': 'COLOSSO',
            'pacto': 'PACTO',
            'joia': 'JÓIA',
            'boss': 'BOSS',
            'primal': 'MUTAÇÃO PRIMAL'
        };
        
        slotDiv.innerHTML = `
            <div class="slot-header">
                <span class="slot-type">${typeLabels[mutation.type] || mutation.type.toUpperCase()}</span>
                <button type="button" class="remove-mutation-btn" onclick="removeMutationSlot(${slotIndex})" title="Remover esta parte de mutação">×</button>
            </div>
            <div class="slot-fields">
                <label for="mutationName_${slotIndex}">Nome da Mutação:</label>
                <input type="text" id="mutationName_${slotIndex}" 
                       value="${mutation.name || ''}" 
                       placeholder="Ex: Visão Noturna Avançada"
                       oninput="updateMutationFromFormSlot(${slotIndex}, 'name', this.value)">
                
                <label for="mutationType_${slotIndex}">Tipo:</label>
                <select id="mutationType_${slotIndex}" 
                        onchange="updateMutationFromFormSlot(${slotIndex}, 'type', this.value)">
                    <option value="colosso" ${mutation.type === 'colosso' ? 'selected' : ''}>Colosso</option>
                    <option value="pacto" ${mutation.type === 'pacto' ? 'selected' : ''}>Pacto</option>
                    <option value="joia" ${mutation.type === 'joia' ? 'selected' : ''}>Jóia</option>
                    <option value="boss" ${mutation.type === 'boss' ? 'selected' : ''}>Boss</option>
                </select>
                
                <label for="mutationDescription_${slotIndex}">Descrição Completa (Benefício + Contraparte):</label>
                <textarea id="mutationDescription_${slotIndex}" 
                          class="mutation-textarea"
                          placeholder="Descreva a mutação completa, incluindo benefícios e fraquezas..."
                          oninput="updateMutationFromFormSlot(${slotIndex}, 'description', this.value)">${mutation.description || ''}</textarea>
                
                <label for="mutationSource_${slotIndex}">Origem/Fonte:</label>
                <input type="text" id="mutationSource_${slotIndex}" 
                       value="${mutation.source || ''}" 
                       placeholder="Ex: Colosso das Sombras, Pacto com..."
                       oninput="updateMutationFromFormSlot(${slotIndex}, 'source', this.value)">
            </div>
        `;
        
        container.appendChild(slotDiv);
    });
    
    syncFormMutations();
    
    document.getElementById('mutationSlotCount').textContent = characterMutations.length;
}

function updatePrimalStage() {
    const level = parseInt(document.getElementById("level").value) || 1;
    let stage = 1;
    
    if (level >= 65) stage = 2;
    if (level >= 95) stage = 3;
    if (level >= 99) stage = 4;
    
    const primalMutation = characterMutations.find(mut => mut.type === 'primal');
    if (primalMutation) {
        primalMutation.stage = stage;
        
        const stageSelect = document.getElementById('mutationStage_0');
        if (stageSelect) {
            stageSelect.value = stage;
            
            const oldStage = parseInt(stageSelect.dataset.lastStage) || 1;
            if (stage > oldStage) {
                showPrimalEvolutionWarning(stage);
                stageSelect.dataset.lastStage = stage;
            }
        }
        
        const stageDisplay = document.getElementById('primalStageDisplay');
        if (stageDisplay) {
            stageDisplay.textContent = `MUTAÇÃO PRIMAL - ESTÁGIO ${stage}`;
        }
    }
}

function showPrimalEvolutionWarning(stage) {
    const messages = {
        2: " Sua Mutação Primal evoluiu para o Estágio 2! Atualize sua descrição para refletir esta evolução.",
        3: " Sua Mutação Primal evoluiu para o Estágio 3! Sua mutação está se tornando poderosa!",
        4: " Sua Mutação Primal alcançou o Estágio 4 máximo! Complete sua evolução primal!"
    };
    
    if (messages[stage]) {
        alert(messages[stage]);
    }
}

function showMutationTypeMenu() {
    const menu = document.getElementById('mutationTypeMenu');
    const btn = document.getElementById('addMutationSlotBtn');
    if (menu && btn) {
        menu.classList.remove('hidden');
        btn.disabled = true;
    }
}

function hideMutationTypeMenu() {
    const menu = document.getElementById('mutationTypeMenu');
    const btn = document.getElementById('addMutationSlotBtn');
    if (menu && btn) {
        menu.classList.add('hidden');
        btn.disabled = false;
    }
}

function addMutationSlot(type) {
    const newIndex = characterMutations.length;
    const typeNames = {
        'colosso': 'Colosso',
        'pacto': 'Pacto',
        'joia': 'Jóia',
        'boss': 'Boss'
    };
    
    const newMutation = {
        name: `Nova Mutação ${typeNames[type] || type}`,
        type: type,
        description: "",
        source: "",
        fixed: false,
        index: newIndex
    };
    
    characterMutations.push(newMutation);
    renderMutationSlots();
    hideMutationTypeMenu();
    saveMutationData();
}

function removeMutationSlot(index) {
    if (index === 0) {
        alert("A Mutação Primal não pode ser removida!");
        return;
    }
    
    const mutationToRemove = characterMutations.find(mut => mut.index === index);
    if (!mutationToRemove) return;
    
    if (confirm(`Tem certeza que deseja remover a mutação "${mutationToRemove.name}"?`)) {
        characterMutations = characterMutations.filter(mut => mut.index !== index);
        
        characterMutations.forEach((mut, idx) => {
            mut.index = idx;
        });
        
        renderMutationSlots();
        saveMutationData();
    }
}

function updateMutationFromFormSlot(index, field, value) {
    const mutation = characterMutations.find(mut => mut.index === index);
    if (mutation) {
        mutation[field] = value;
        saveMutationData();
    }
}

function saveMutationData() {
    updateMutationsFromForm();
    
    const characterData = JSON.parse(localStorage.getItem(LOCAL_CHARACTER_STORAGE_KEY) || '{}');
    characterData.characterMutations = characterMutations;
    localStorage.setItem(LOCAL_CHARACTER_STORAGE_KEY, JSON.stringify(characterData));
}

// ==============================================
// SISTEMA UNIFICADO DE ARMAS
// ==============================================

function carregarArmasFicha() {
    try {
        const armasSalvas = localStorage.getItem(ARMAS_FICHA_STORAGE_KEY);
        if (armasSalvas) {
            const armas = JSON.parse(armasSalvas);
            
            weapons = armas.map(arma => ({
                name: arma.nome,
                damageDice: arma.dano,
                condition: arma.condition || 'Nula',
                ct: arma.ct,
                criticos: arma.criticos,
                passiva: arma.passiva,
                passivaRadiante: arma.passivaRadiante,
                passivaTek: arma.passivaTek,
                resistencia: arma.resistencia,
                raridade: arma.raridade,
                descricao: arma.descricao,
                personalizada: arma.personalizada || false,
                modificadores: arma.modificadores || []
            }));
            
            return armas;
        }
    } catch (e) {
        console.error('Erro ao carregar armas da ficha:', e);
    }
    return [];
}

function salvarArmasFicha() {
    try {
        localStorage.setItem(ARMAS_FICHA_STORAGE_KEY, JSON.stringify(fichaArmas));
        
        const characterData = JSON.parse(localStorage.getItem(LOCAL_CHARACTER_STORAGE_KEY) || '{}');
        
        const weaponsFormatado = fichaArmas.map(arma => ({
            name: arma.nome,
            damageDice: arma.dano,
            condition: arma.condition || 'Nula',
            ct: arma.ct,
            criticos: arma.criticos,
            passiva: arma.passiva,
            passivaRadiante: arma.passivaRadiante,
            passivaTek: arma.passivaTek,
            resistencia: arma.resistencia,
            raridade: arma.raridade,
            descricao: arma.descricao,
            personalizada: arma.personalizada || false,
            modificadores: arma.modificadores || []
        }));
        
        characterData.weapons = weaponsFormatado;
        localStorage.setItem(LOCAL_CHARACTER_STORAGE_KEY, JSON.stringify(characterData));
        
        return true;
    } catch (e) {
        console.error('Erro ao salvar armas da ficha:', e);
        return false;
    }
}

function adicionarAFicha(armaId) {
    console.log(`Tentando adicionar arma: ${armaId}`);
    
    let armaEncontrada = null;
    
    if (typeof window.armasData !== 'undefined') {
        for (const era in window.armasData) {
            const arma = window.armasData[era].find(a => a.id === armaId);
            if (arma) {
                armaEncontrada = arma;
                break;
            }
        }
    }
    
    if (!armaEncontrada) {
        alert('Erro: Arma não encontrada no catálogo.');
        return false;
    }
    
    fichaArmas = carregarArmasFicha();
    
    const armaJaExiste = fichaArmas.some(a => a.id === armaId);
    
    if (armaJaExiste) {
        const confirmacao = confirm(`"${armaEncontrada.nome}" já está na sua ficha. Deseja adicionar outra vez?`);
        if (!confirmacao) {
            console.log('Adição de arma cancelada pelo usuário');
            return false;
        }
    }
    
    const novaArma = {
        ...armaEncontrada,
        fichaId: Date.now() + Math.random(),
        dataAdicao: new Date().toISOString(),
        condition: 'Nula'
    };
    
    fichaArmas.push(novaArma);
    
    if (salvarArmasFicha()) {
        mostrarNotificacaoArma(armaEncontrada.nome);
        
        if (typeof atualizarArmasDaFicha === 'function') {
            atualizarArmasDaFicha();
        }
        
        weapons = fichaArmas.map(arma => ({
            name: arma.nome,
            damageDice: arma.dano,
            condition: arma.condition || 'Nula',
            ct: arma.ct,
            criticos: arma.criticos,
            passiva: arma.passiva,
            passivaRadiante: arma.passivaRadiante,
            passivaTek: arma.passivaTek,
            resistencia: arma.resistencia,
            raridade: arma.raridade,
            descricao: arma.descricao,
            personalizada: arma.personalizada || false,
            modificadores: arma.modificadores || []
        }));
        
        renderWeapons();
        
        console.log(`Arma "${armaEncontrada.nome}" adicionada à ficha com sucesso!`);
        return true;
    } else {
        alert('❌ Erro ao adicionar arma à ficha.');
        return false;
    }
}

function removerArmaDaFichaPorIndex(index) {
    if (confirm('Tem certeza que deseja remover esta arma da sua ficha?')) {
        fichaArmas = carregarArmasFicha();
        if (index >= 0 && index < fichaArmas.length) {
            const armaRemovida = fichaArmas.splice(index, 1)[0];
            salvarArmasFicha();
            
            weapons = fichaArmas.map(arma => ({
                name: arma.nome,
                damageDice: arma.dano,
                condition: arma.condition || 'Nula'
            }));
            
            atualizarArmasDaFicha();
            renderWeapons();
            
            alert(`"${armaRemovida.nome}" removida da ficha.`);
            return true;
        }
    }
    return false;
}

function irParaArsenal() {
    window.location.href = '../index/index_itens.html';
}

function atualizarArmasDaFicha() {
    const container = document.getElementById('fichaArmasDisplayContainer');
    if (!container) return;
    
    fichaArmas = carregarArmasFicha();
    
    if (fichaArmas.length === 0) {
        container.innerHTML = `
            <div class="no-armas-message-ficha">
                <i class="fas fa-box-open fa-2x"></i>
                <p>Nenhuma arma do catálogo adicionada à ficha.</p>
                <p><small>Vá para o arsenal para adicionar algumas!</small></p>
            </div>
        `;
        return;
    }
    
    let html = `
        <div class="ficha-armas-list">
            <div class="ficha-armas-header-info">
                <span><strong>${fichaArmas.length}</strong> arma(s) do catálogo</span>
                <span class="total-mods-ficha">
                    <i class="fas fa-tools"></i>
                    ${fichaArmas.reduce((total, arma) => total + (arma.modificadores ? arma.modificadores.length : 0), 0)} modificador(es)
                </span>
            </div>
    `;
    
    fichaArmas.forEach((arma, index) => {
        const ctInfo = arma.ct ? `<div class="ficha-arma-info"><strong>CT:</strong> ${arma.ct}</div>` : '';
        const criticosInfo = arma.criticos ? `<div class="ficha-arma-info"><strong>Críticos:</strong> ${arma.criticos}</div>` : '';
        const passivaInfo = arma.passiva ? `<div class="ficha-arma-info passiva"><strong>Passiva:</strong> ${arma.passiva}</div>` : '';
        const passivaRadianteInfo = arma.passivaRadiante ? `<div class="ficha-arma-info passiva-radiante"><strong>Passiva Radiante:</strong> ${arma.passivaRadiante}</div>` : '';
        const passivaTekInfo = arma.passivaTek ? `<div class="ficha-arma-info passiva-tek"><strong>Passiva Tek:</strong> ${arma.passivaTek}</div>` : '';
        const condicaoInfo = arma.condition && arma.condition !== 'Nula' 
            ? `<div class="ficha-arma-info"><strong>Condição:</strong> ${arma.condition}</div>` 
            : '';
        const resistenciaInfo = arma.resistencia ? `<div class="ficha-arma-info"><strong>Resistência:</strong> ${arma.resistencia}</div>` : '';
        const raridadeInfo = arma.raridade ? `<div class="ficha-arma-raridade ${arma.raridade}">${arma.raridade.toUpperCase()}</div>` : '';
        
        let modificadoresHTML = '';
        if (arma.personalizada && arma.modificadores && arma.modificadores.length > 0) {
            modificadoresHTML = renderizarModificadoresNaFicha(arma);
        }
        
        html += `
            <div class="ficha-arma-item ${arma.personalizada ? 'personalizada' : ''}">
                <div class="ficha-arma-header">
                    <div class="ficha-arma-nome">
                        <h4>
                            ${arma.nome}
                            ${arma.personalizada ? '<span class="arma-personalizada-badge"><i class="fas fa-hammer"></i> Personalizada</span>' : ''}
                        </h4>
                        <span class="ficha-arma-dano">${arma.dano}</span>
                    </div>
                    <div class="ficha-arma-header-right">
                        ${raridadeInfo}
                        <button type="button" onclick="removerArmaDaFichaPorIndex(${index})" class="btn-remover-ficha-arma" title="Remover da ficha">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="ficha-arma-detalhes">
                    ${ctInfo}
                    ${criticosInfo}
                    ${resistenciaInfo}
                    ${condicaoInfo}
                    ${passivaInfo}
                    ${passivaRadianteInfo}
                    ${passivaTekInfo}
                    ${arma.descricao ? `<div class="arma-descricao-ficha"><p>${arma.descricao}</p></div>` : ''}
                    
                    ${modificadoresHTML}
                </div>
            </div>
        `;
    });
    
    html += `</div>`;
    container.innerHTML = html;
}

function renderizarModificadoresNaFicha(arma) {
    if (!arma.personalizada || !arma.modificadores || arma.modificadores.length === 0) {
        return '';
    }

    let html = `
        <div class="arma-modificadores-ficha">
            <div class="modificadores-header-ficha">
                <h6><i class="fas fa-tools"></i> Modificadores Aplicados:</h6>
                <span class="mod-count-badge">${arma.modificadores.length} mod(s)</span>
            </div>
            <div class="modificadores-grid-ficha">
    `;

    arma.modificadores.forEach((mod, index) => {
        const isJoia = mod.id && mod.id.includes('joia') || mod.tipo === 'joia';
        const modClass = isJoia ? 'joia' : 'modificador';
        
        html += `
            <div class="modificador-item-ficha ${modClass}">
                <div class="mod-header-ficha">
                    <div class="mod-nome-ficha">
                        ${isJoia ? '<i class="fas fa-gem"></i>' : '<i class="fas fa-cog"></i>'}
                        <strong>${mod.nome}</strong>
                    </div>
                    <span class="mod-tipo-ficha">${isJoia ? 'JOIA' : 'MOD'}</span>
                </div>
                <div class="mod-efeito-ficha">
                    <strong>Efeito:</strong> ${mod.efeito}
                </div>
                ${mod.descricao ? `
                    <div class="mod-descricao-ficha">
                        <small>${mod.descricao}</small>
                    </div>
                ` : ''}
            </div>
        `;
    });

    html += `
            </div>
        </div>
    `;

    return html;
}

function mostrarNotificacaoArma(nomeArma) {
    const notification = document.createElement('div');
    notification.className = 'arma-notification';
    notification.innerHTML = `
        <div class="arma-notification-content">
            <i class="fas fa-check-circle"></i>
            <span><strong>"${nomeArma}"</strong> adicionada à sua ficha!</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease, fadeOut 0.3s ease 3s forwards;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 350px;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }
        .arma-notification i {
            font-size: 20px;
            color: #4ade80;
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3300);
}

// ==============================================
// SISTEMA DE RITUAIS
// ==============================================

function loadSelectedRitualPact() {
    const displayContainer = document.getElementById("selectedRitualPactDisplay");

    if (!displayContainer) return;

    displayContainer.innerHTML = '';

    try {
        const storedData = localStorage.getItem(RITUALS_STORAGE_KEY);
        const characterData = JSON.parse(localStorage.getItem(LOCAL_CHARACTER_STORAGE_KEY) || '{}');
        
        if (storedData) {
            characterRituals = JSON.parse(storedData);
        }
        else if (characterData.characterRituals) {
            characterRituals = characterData.characterRituals;
        }
        else if (characterData.rituals) {
            characterRituals = characterData.rituals;
        }
        else {
            characterRituals = [];
        }

    } catch (error) {
        console.error("Erro ao carregar rituais:", error);
        characterRituals = [];
    }

    if (!Array.isArray(characterRituals)) characterRituals = [];

    if (characterRituals.length > 0) {
        characterRituals.forEach((item, index) => {
            if (!item) return;

            const itemDiv = document.createElement("div");
            itemDiv.classList.add("ritual-pact-item");
            
            const nome = item.nome || item.name || 'Ritual sem nome';
            const imagem = item.imagem || item.image || '';
            const descricao = item.descricao || item.description || 'Descrição não disponível';
            const tipo = item.tipo || item.type || 'N/A';
            const elemento = item.elemento || item.element || 'N/A';
            const nivel = item.nivel || item.level || 'N/A';

            itemDiv.innerHTML = `
                <div class="ritual-pact-header">
                    <h3>${nome}</h3>
                    <span class="ritual-type">${elemento} / ${tipo} / Nv. ${nivel}</span>
                </div>
                ${imagem ? `<img src="${imagem}" alt="${nome}" class="ritual-image">` : ''}
                <div class="ritual-info">
                    <p class="ritual-description">${descricao}</p>
                </div>
                <button class="remove-ritual-pact-btn" data-index="${index}">🗑️ Remover</button>
            `;
            
            displayContainer.appendChild(itemDiv);
        });

        document.querySelectorAll(".remove-ritual-pact-btn").forEach(button => {
            button.addEventListener("click", (event) => {
                const indexToRemove = parseInt(event.target.dataset.index);
                removeRitualPact(indexToRemove);
            });
        });

    } else {
        displayContainer.innerHTML = `
            <div class="no-rituals-message">
                <p>📜 Nenhum ritual ou pacto selecionado.</p>
                <p><small>Vá para a página de Rituais para adicionar alguns!</small></p>
        </div>
        `;
    }
    
    synchronizeRitualsWithCharacterData();
}

function synchronizeRitualsWithCharacterData() {
    try {
        const characterData = JSON.parse(localStorage.getItem(LOCAL_CHARACTER_STORAGE_KEY) || '{}');
        characterData.characterRituals = characterRituals;
        localStorage.setItem(LOCAL_CHARACTER_STORAGE_KEY, JSON.stringify(characterData));
    } catch (error) {
        console.error("Erro ao sincronizar rituais:", error);
    }
}

function updateRitualsInBothStorages(ritualsArray) {
    localStorage.setItem(RITUALS_STORAGE_KEY, JSON.stringify(ritualsArray));
    const characterData = JSON.parse(localStorage.getItem(LOCAL_CHARACTER_STORAGE_KEY) || '{}');
    characterData.characterRituals = ritualsArray;
    localStorage.setItem(LOCAL_CHARACTER_STORAGE_KEY, JSON.stringify(characterData));
}

function removeRitualPact(indexToRemove) {
    if (indexToRemove !== undefined && indexToRemove >= 0 && indexToRemove < characterRituals.length) {
        const removedItemName = characterRituals[indexToRemove].nome || characterRituals[indexToRemove].name;
        characterRituals.splice(indexToRemove, 1);
        updateRitualsInBothStorages(characterRituals);
        loadSelectedRitualPact();
        alert(`"${removedItemName}" removido da ficha.`);
    }
}

// ==============================================
// EXPORTAR FUNÇÕES PARA ESCOPO GLOBAL
// ==============================================

window.loginUser = loginUser;
window.logoutUser = logoutUser;
window.saveForm = saveForm;
window.loadForm = loadForm;
window.resetForm = resetForm;
window.changeAttribute = changeAttribute;
window.addActionBonus = addActionBonus;
window.removeActionBonus = removeActionBonus;
window.updateActionBonus = updateActionBonus;
window.addLearnedActionBonus = addLearnedActionBonus;
window.removeLearnedActionBonus = removeLearnedActionBonus;
window.updateLearnedActionBonus = updateLearnedActionBonus;
window.addWeapon = addWeapon;
window.removeWeapon = removeWeapon;
window.updateWeapon = updateWeapon;
window.showMutationTypeMenu = showMutationTypeMenu;
window.hideMutationTypeMenu = hideMutationTypeMenu;
window.addMutationSlot = addMutationSlot;
window.removeMutationSlot = removeMutationSlot;
window.updateMutationFromFormSlot = updateMutationFromFormSlot;
window.validateLevelInput = validateLevelInput;
window.adicionarAFicha = adicionarAFicha;
window.carregarArmasFicha = carregarArmasFicha;
window.irParaArsenal = irParaArsenal;
window.atualizarArmasDaFicha = atualizarArmasDaFicha;
window.removerArmaDaFichaPorIndex = removerArmaDaFichaPorIndex;
window.renderizarModificadoresNaFicha = renderizarModificadoresNaFicha;
window.loadSelectedRitualPact = loadSelectedRitualPact;
window.removeRitualPact = removeRitualPact;
window.applyClassBonus = applyClassBonus;
window.resetClassBonus = resetClassBonus;
window.calculateClassBonuses = calculateClassBonuses;