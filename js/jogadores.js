// JavaScript Completo para Ficha de Personagem - RPG ARK

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

// Sistema de Mutação - INICIALIZAÇÃO CORRIGIDA
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

const appliedClassBonuses = {
    class1: { className: '', attribute: '' },
    class2: { className: '', attribute: '' }
};

const attributeMappings = {
    guerreiro: ['for', 'vig'],
    atirador: ['agi', 'int'],
    forjador: ['int', 'for'],
    arcano: ['set', 'agi'],
    cientista: ['int', 'agi'],
    sobrevivente: ['set', 'int'],
    construtor: ['int', 'vig'],
    medico: ['int', 'agi']
};

let currentUser = null;
const LOCAL_CHARACTER_STORAGE_KEY = 'localCharacterData';
const RITUALS_STORAGE_KEY = 'selectedRitualPacts';

// Variável para controle de geração de PDF
let isGeneratingPDF = false;

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
            return;
        }
        if (characterNameInput) characterNameInput.value = characterName;
    }

    // ATUALIZAR MUTAÇÕES DO FORMULÁRIO ANTES DE SALVAR
    updateMutationsFromForm();

    const characterData = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        level: document.getElementById("level").value,
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
        appliedClassBonuses: { 
            class1: { ...appliedClassBonuses.class1 }, 
            class2: { ...appliedClassBonuses.class2 }  
        },
        savedName: characterName,
        savedLevel: parseInt(document.getElementById("level").value) || 1
    };

    try {
        localStorage.setItem(LOCAL_CHARACTER_STORAGE_KEY, JSON.stringify(characterData));
        localStorage.setItem(RITUALS_STORAGE_KEY, JSON.stringify(characterRituals));
        alert(`Ficha "${characterName}" salva localmente com sucesso!`);
    } catch (e) {
        console.error("Erro ao salvar no localStorage:", e);
        alert("Erro ao salvar a ficha. Verifique o console para mais detalhes ou tente limpar o cache do navegador.");
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

    appliedClassBonuses.class1 = { className: '', attribute: '' };
    appliedClassBonuses.class2 = { className: '', attribute: '' };

    if (data.appliedClassBonuses) {
        if (data.appliedClassBonuses.class1) {
            Object.assign(appliedClassBonuses.class1, data.appliedClassBonuses.class1);
        }
        if (data.appliedClassBonuses.class2) {
            Object.assign(appliedClassBonuses.class2, data.appliedClassBonuses.class2);
        }
    }

    document.getElementById("class1").value = data.class1 || '';
    document.getElementById("class2").value = data.class2 || '';

    updateAttributesDisplay(); 
    updateClassButtonsState();

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

    // Carregar rituais
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

    // Carregar mutações
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

    validateLevelInput();
    calculateStats(); 

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
    
    appliedClassBonuses.class1 = { className: '', attribute: '' };
    appliedClassBonuses.class2 = { className: '', attribute: '' };
    
    updateAttributesDisplay();
    document.getElementById('class1').value = '';
    document.getElementById('class2').value = '';
    updateClassButtonsState();

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

    document.getElementById("results").style.display = "none";

    localStorage.removeItem(LOCAL_CHARACTER_STORAGE_KEY);
    localStorage.removeItem(RITUALS_STORAGE_KEY);
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
    bonusPointsFromLevel = Math.floor((level - 1) / 15);
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

    if (appliedClassBonuses.class1.className && appliedClassBonuses.class1.attribute) {
        attributes[appliedClassBonuses.class1.attribute]++;
    }
    if (appliedClassBonuses.class2.className && appliedClassBonuses.class2.attribute) {
        attributes[appliedClassBonuses.class2.attribute]++;
    }

    for (const key in attributes) {
        const element = document.getElementById(`${key}Value`);
        if (element) {
            element.textContent = attributes[key];
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
    }
}

function updateClassButtonsState() {
    const class1Select = document.getElementById('class1');
    const class2Select = document.getElementById('class2');
    const applyClass1Btn = document.getElementById('applyClass1Btn');
    const applyClass2Btn = document.getElementById('applyClass2Btn');

    if (!applyClass1Btn || !applyClass2Btn || !class1Select || !class2Select) return;

    const selectedClass1 = class1Select.value;
    const selectedClass2 = class2Select.value;

    applyClass1Btn.disabled = !!appliedClassBonuses.class1.className || selectedClass1 === '';
    applyClass2Btn.disabled = !!appliedClassBonuses.class2.className || selectedClass2 === '';

    if (selectedClass1 !== '' && selectedClass1 === selectedClass2) {
        if (!appliedClassBonuses.class1.className) applyClass1Btn.disabled = true;
        if (!appliedClassBonuses.class2.className) applyClass2Btn.disabled = true;
    }
}

function resetClassBonus(classId) {
    const previousBonus = appliedClassBonuses[classId];
    if (previousBonus.className && previousBonus.attribute) {
        appliedClassBonuses[classId] = { className: '', attribute: '' }; 
        updateAttributesDisplay();
    }
    updateClassButtonsState();
}

function applyClassBonus(classId) {
    const selectElement = document.getElementById(classId);
    const selectedClass = selectElement.value;
    const applyButton = document.getElementById(`apply${classId.replace('class', 'Class')}Btn`);

    if (!selectedClass) {
        alert("Por favor, selecione uma classe antes de aplicar o bônus.");
        return;
    }

    if (appliedClassBonuses[classId].className) {
        alert(`Você já aplicou um bônus para este slot de classe.`);
        return;
    }

    const otherClassId = classId === 'class1' ? 'class2' : 'class1';
    const otherSelectElement = document.getElementById(otherClassId);
    if (selectedClass !== '' && selectedClass === otherSelectElement.value) {
        alert(`A classe "${selectedClass}" já está selecionada no outro slot de Classe Primitiva.`);
        return;
    }

    const mappedAttributes = attributeMappings[selectedClass];
    if (!mappedAttributes) {
        alert("Classe selecionada não possui bônus de atributo definidos.");
        return;
    }

    const choice = prompt(`Para a classe ${selectedClass}, qual atributo você deseja aumentar: ${mappedAttributes[0]} ou ${mappedAttributes[1]}? (Digite o nome do atributo, ex: ${mappedAttributes[0]})`);

    if (choice && mappedAttributes.includes(choice.toLowerCase())) {
        const chosenAttribute = choice.toLowerCase();
        
        appliedClassBonuses[classId] = { className: selectedClass, attribute: chosenAttribute };

        updateAttributesDisplay();
        alert(`Bônus de +1 em ${chosenAttribute} da classe ${selectedClass} aplicado aos atributos!`);
        updateClassButtonsState();
        updateAttributePointsDisplay();

    } else {
        alert("Escolha inválida. Por favor, digite o nome exato de um dos atributos sugeridos.");
    }
}

document.getElementById('class1').addEventListener('change', updateClassButtonsState);
document.getElementById('class2').addEventListener('change', updateClassButtonsState);
document.getElementById('level').addEventListener('input', validateLevelInput);
document.getElementById('level').addEventListener('change', validateLevelInput);

document.getElementById('photo').addEventListener('change', function(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const preview = document.getElementById('preview');
        preview.src = reader.result;
        preview.style.display = 'block';
    }
    if (event.target.files[0]) {
        reader.readAsDataURL(event.target.files[0]);
    } else {
        document.getElementById('preview').style.display = 'none';
        document.getElementById('preview').src = "#";
    }
});

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
    if (level >= 50) totalSlots = 15;
    if (level >= 80) totalSlots = 20;

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

function calculateStats() {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const level = parseInt(document.getElementById("level").value) || 1;
    const photoSrc = document.getElementById("preview").src;
    const lore = document.getElementById("lore").value;
    const class1 = document.getElementById("class1").value;
    const class2 = document.getElementById("class2").value;
    const combatClass = document.getElementById("combatClass").value;
    const inventory = document.getElementById("inventory").value;

    updateMutationsFromForm();

    let vida = 55 + (attributes.vig * 15);
    let determinacaoSanidade = 55 + (attributes.int * 10) + (attributes.set * 15);
    let resistencia = 15 + (attributes.vig * 5);
    let folego = 4 + (attributes.vig * 1);
    let armadura = 5;

    if (level >= 15) armadura += 1;
    if (level >= 30) armadura += 1;
    if (level >= 50) vida += 30;
    if (level >= 65) determinacaoSanidade += 20;
    if (level >= 80) armadura += 10;
    if (level >= 95) {
        vida += 20;
        determinacaoSanidade += 20;
    }
    if (level >= 99) armadura += 10;
    
    const characterData = {
        name: name,
        age: age,
        level: level,
        photo: photoSrc,
        lore: lore,
        class1: class1,
        class2: class2,
        combatClass: combatClass,
        inventory: inventory,
        attributesBase: attributes,
        appliedClassBonuses: appliedClassBonuses,
        currentLife: vida,
        currentSanity: determinacaoSanidade,
        currentArmor: armadura,
        currentResistencia: resistencia,
        currentAgi: attributes.agi,
        currentFor: attributes.for,
        currentInt: attributes.int,
        currentSet: attributes.set,
        currentVig: attributes.vig,
        actionBonuses: actionBonuses,
        learnedActionBonuses: learnedActionBonuses,
        weapons: weapons,
        rituals: characterRituals,
        characterMutations: characterMutations,
    };

    localStorage.setItem('localCharacterData', JSON.stringify(characterData));
    
    let bonusAcoesHtml = '';
    if (actionBonuses.length > 0) {
        bonusAcoesHtml = `<ul class="stats-list">`;
        actionBonuses.forEach(bonus => {
            bonusAcoesHtml += `<li><strong class="sub-category-title">${bonus.action}</strong>: <span class="attribute-value">+${bonus.value} em ações</span></li>`;
        });
        bonusAcoesHtml += `</ul>`;
    } else {
        bonusAcoesHtml = '<p class="no-info">Nenhum bônus de ação registrado.</p>';
    }

    let learnedBonusAcoesHtml = '';
    if (learnedActionBonuses.length > 0) {
        learnedBonusAcoesHtml = `<ul class="stats-list">`;
        learnedActionBonuses.forEach(bonus => {
            learnedBonusAcoesHtml += `<li><strong class="sub-category-title">${bonus.action}</strong>: <span class="attribute-value">+${bonus.value} em ações (Aprendido)</span></li>`;
        });
        learnedBonusAcoesHtml += `</ul>`;
    } else {
        learnedBonusAcoesHtml = '<p class="no-info">Nenhum bônus de ação aprendido registrado.</p>';
    }

    let weaponsHtml = '';
    if (weapons.length > 0) {
        weaponsHtml = `<ul class="stats-list weapon-list">`;
        weapons.forEach(weapon => {
            weaponsHtml += `<li><strong class="sub-category-title">${weapon.name || '<span class="no-info">Arma sem nome</span>'}</strong>: <span class="attribute-value">${weapon.damageDice || '<span class="no-info">Dano não especificado</span>'}</span>`;
            if (weapon.condition && weapon.condition !== 'Nula') {
                weaponsHtml += `<span class="attribute-value"> (${weapon.condition})</span>`;
            }
            weaponsHtml += `</li>`;
        });
        weaponsHtml += `</ul>`;
    } else {
        weaponsHtml = '<p class="no-info">Nenhuma arma registrada.</p>';
    }

    let ritualsHtml = '';
    if (characterRituals.length > 0) {
        ritualsHtml = `<div class="ficha-section"><h4 class="section-title">Rituais e Pactos</h4>`;
        ritualsHtml += `<ul class="stats-list ritual-list">`;
        
        characterRituals.forEach(ritual => {
            if (!ritual) return;
            
            const nome = ritual.nome || ritual.name || 'Ritual sem nome';
            const descricao = ritual.descricao || ritual.description || 'Descrição não disponível';
            const tipo = ritual.tipo || ritual.type || 'N/A';
            const elemento = ritual.elemento || ritual.element || 'N/A';
            const nivel = ritual.nivel || ritual.level || 'N/A';
            const imagem = ritual.imagem || ritual.image || '';
            
            ritualsHtml += `
                <li class="ritual-item">
                    <div class="ritual-header">
                        <strong class="sub-category-title">${nome}</strong>
                        <span class="ritual-meta">${elemento} / ${tipo} / Nv. ${nivel}</span>
                    </div>
                    ${imagem ? `<img src="${imagem}" alt="${nome}" class="ritual-image-ficha" style="max-width: 150px; margin: 10px 0; border-radius: 8px; border: 1px solid rgba(193, 240, 248, 0.2);">` : ''}
                    <div class="ritual-description-ficha">
                        <p>${descricao}</p>
                    </div>
                </li>
            `;
        });
        
        ritualsHtml += `</ul></div>`;
    } else {
        ritualsHtml = '<div class="ficha-section"><h4 class="section-title">Rituais e Pactos</h4><p class="no-info">Nenhum ritual ou pacto selecionado.</p></div>';
    }

    let mutationsHtml = '';
    if (characterMutations && characterMutations.length > 0) {
        mutationsHtml = `<div class="ficha-section"><h4 class="section-title">Sistema de Mutação</h4>`;
        
        characterMutations.forEach((mutation) => {
            const typeLabels = {
                'primal': 'MUTAÇÃO PRIMAL',
                'colosso': 'COLOSSO',
                'pacto': 'PACTO',
                'joia': 'JÓIA',
                'boss': 'BOSS'
            };
            
            mutationsHtml += `
                <div class="mutation-display" data-type="${mutation.type}">
                    <div class="mutation-header">
                        <strong class="mutation-name">${mutation.name || 'Mutação sem nome'}</strong>
                        <span class="mutation-type">${typeLabels[mutation.type] || mutation.type.toUpperCase()} ${mutation.type === 'primal' ? `- Estágio ${mutation.stage}` : ''}</span>
                    </div>
                    ${mutation.source && mutation.source.trim() ? `<p class="mutation-source"><strong>Origem:</strong> ${mutation.source}</p>` : ''}
                    <div class="mutation-description">
                        <strong>Descrição Completa:</strong>
                        <p>${mutation.description ? mutation.description.replace(/\n/g, '<br>') : '<span class="no-info">Não descrito</span>'}</p>
                    </div>
                </div>
            `;
        });
        
        mutationsHtml += `</div>`;
    }

    let levelRewardsList = [];
    let mutationRewardsList = [];
    let inventoryRewardsList = [];

    if (level >= 15) {
        levelRewardsList.push(`+1 Ponto de Atributo (já contabilizado na ficha)`);
    }
    if (level >= 30) {
        levelRewardsList.push(`Mais slots para Bônus de Ação (Total de 12 slots)`);
    }
    if (level >= 50) {
        levelRewardsList.push(`+30 de Vida (já adicionado ao total)`);
        levelRewardsList.push(`Mais slots para Bônus de Ação (Total de 15 slots) e possibilidade de bônus até +20`);
        inventoryRewardsList.push('Convite da Linhagem de Athenas');
        inventoryRewardsList.push('1 Presente de Evento Global');
    }
    if (level >= 65) {
        levelRewardsList.push(`+20 de Sanidade (já adicionado ao total de Determinação/Sanidade)`);
        levelRewardsList.push(`+1 Ponto de Atributo adicional (já contabilizado na ficha)`);
        mutationRewardsList.push(`+1 Parte de Mutação (Revivendo Memória) - Mutação Primal evolui para Estágio 2`);
    }
    if (level >= 80) {
        levelRewardsList.push(`+10 Armadura padrão (já adicionado ao total)`);
        levelRewardsList.push(`Mais slots para Bônus de Ação (Total de 20 slots)`);
        inventoryRewardsList.push('1 Ritual Normal');
        inventoryRewardsList.push('1 Subida de Patente');
    }
    if (level >= 95) {
        mutationRewardsList.push(`+1 Parte de Mutação (Conversa com o Infinito) - Mutação Primal evolui para Estágio 3`);
        inventoryRewardsList.push('Convite da Linhagem de Athenas');
    }
    if (level >= 99) {
        levelRewardsList.push(`+10 Armadura padrão (já adicionado ao total)`);
        levelRewardsList.push(`+1 Ponto de Atributo adicional (já contabilizado na ficha)`);
        mutationRewardsList.push(`+1 Parte de Mutação (Último Incentivo Pessoal) - Mutação Primal evolui para Estágio 4`);
        levelRewardsList.push(`Título: "Sobrevivente"`);
    }

    let statsHtml = `
        <div class="ficha-section">
            <h4 class="section-title">Informações Básicas</h4>
            <div class="header-ficha">
                <div class="title-with-image">
                    ${photoSrc && photoSrc !== window.location.href + "#" && !photoSrc.includes('data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=') ? 
                    `<div class="character-photo-container">
                        <img src="${photoSrc}" alt="Foto do Personagem" class="character-photo">
                    </div>` : ''}
                    <h3 class="titulo-ficha">${name || '<span class="no-info">Não preenchido</span>'}</h3>
                </div>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Idade</div>
                        <div class="info-value">${age || '<span class="no-info">Não preenchido</span>'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Nível</div>
                        <div class="info-value ficha-calculated-level-value">${level}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Experiência</div>
                        <div class="info-value">Nv. ${level}</div>
                    </div>
                </div>
            </div>
            ${lore ? `<div class="lore-section">
                <h5 class="sub-section-title">História & Personalidade</h5>
                <p class="formatted-text">${lore.replace(/\n/g, '<br>')}</p>
            </div>` : ''}
        </div>

        <div class="ficha-section">
            <h4 class="section-title">Atributos e Estatísticas</h4>
            <div class="attributes-grid">
                <div class="attribute-item">
                    <div class="attribute-icon"></div>
                    <div class="attribute-content">
                        <div class="attribute-name">Agilidade</div>
                        <div class="attribute-value">${attributes.agi}</div>
                    </div>
                </div>
                <div class="attribute-item">
                    <div class="attribute-icon"></div>
                    <div class="attribute-content">
                        <div class="attribute-name">Força</div>
                        <div class="attribute-value">${attributes.for}</div>
                    </div>
                </div>
                <div class="attribute-item">
                    <div class="attribute-icon"></div>
                    <div class="attribute-content">
                        <div class="attribute-name">Inteligência</div>
                        <div class="attribute-value">${attributes.int}</div>
                    </div>
                </div>
                <div class="attribute-item">
                    <div class="attribute-icon"></div>
                    <div class="attribute-content">
                        <div class="attribute-name">Sentidos</div>
                        <div class="attribute-value">${attributes.set}</div>
                    </div>
                </div>
                <div class="attribute-item">
                    <div class="attribute-icon"></div>
                    <div class="attribute-content">
                        <div class="attribute-name">Vitalidade</div>
                        <div class="attribute-value">${attributes.vig}</div>
                    </div>
                </div>
            </div>
            
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-icon"></div>
                    <div class="stat-content">
                        <div class="stat-value">${vida}</div>
                        <div class="stat-label">Vida Total</div>
                    </div>
                </div>
                <div class="stat-item">
                    <div class="stat-icon"></div>
                    <div class="stat-content">
                        <div class="stat-value">${determinacaoSanidade}</div>
                        <div class="stat-label">Determinação</div>
                    </div>
                </div>
                <div class="stat-item">
                    <div class="stat-icon"></div>
                    <div class="stat-content">
                        <div class="stat-value">${resistencia}</div>
                        <div class="stat-label">Resistência</div>
                    </div>
                </div>
                <div class="stat-item">
                    <div class="stat-icon"></div>
                    <div class="stat-content">
                        <div class="stat-value">${folego}</div>
                        <div class="stat-label">Fôlego</div>
                    </div>
                </div>
                <div class="stat-item">
                    <div class="stat-icon"></div>
                    <div class="stat-content">
                        <div class="stat-value">${armadura}</div>
                        <div class="stat-label">Armadura</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="ficha-section">
            <h4 class="section-title">Classes</h4>
            <div class="classes-grid">
                <div class="class-item">
                    <div class="class-label">Classe Primitiva 1</div>
                    <div class="class-value">${class1 || '<span class="no-info">Não selecionado</span>'}</div>
                </div>
                <div class="class-item">
                    <div class="class-label">Classe Primitiva 2</div>
                    <div class="class-value">${class2 || '<span class="no-info">Não selecionado</span>'}</div>
                </div>
                <div class="class-item">
                    <div class="class-label">Classe de Combate</div>
                    <div class="class-value">${combatClass || '<span class="no-info">Não selecionado</span>'}</div>
                </div>
            </div>
        </div>

        ${mutationsHtml}

        ${mutationRewardsList.length > 0 ? `<div class="ficha-section"><h4 class="section-title">Recompensas de Mutação</h4><ul class="stats-list">${mutationRewardsList.map(item => `<li><span class="attribute-value">${item}</span></li>`).join('')}</ul></div>` : ''}

        <div class="ficha-section">
            <h4 class="section-title">Bônus em Ações</h4>
            ${bonusAcoesHtml}
        </div>

        <div class="ficha-section">
            <h4 class="section-title">Bônus de Ações Aprendidos</h4>
            ${learnedBonusAcoesHtml}
        </div>
        
        ${ritualsHtml}

        <div class="ficha-section">
            <h4 class="section-title">Inventário e Armas</h4>
            <div class="inventory-section">
                <h5 class="sub-section-title">Itens Atuais</h5>
                <p class="formatted-text">${inventory ? inventory.replace(/\n/g, '<br>') : '<span class="no-info">Nenhum item registrado.</span>'}</p>
            </div>
            ${inventoryRewardsList.length > 0 ? `<div class="rewards-section">
                <h5 class="sub-section-title">Recompensas Adicionais</h5>
                <ul class="stats-list">${inventoryRewardsList.map(item => `<li><span class="attribute-value">${item}</span></li>`).join('')}</ul>
            </div>` : ''}

            ${weaponsHtml}
        </div>

        ${levelRewardsList.length > 0 ? `<div class="ficha-section"><h4 class="section-title">Recompensas Gerais por Nível</h4><ul class="stats-list">${levelRewardsList.map(item => `<li><span class="attribute-value">${item}</span></li>`).join('')}</ul></div>` : ''}
    `;

    document.getElementById("stats").innerHTML = statsHtml;
    document.getElementById("results").style.display = "block";
    document.getElementById("results").scrollIntoView({ behavior: 'smooth' });
}

function copyFicha() {
    const statsDiv = document.getElementById("stats");
    if (!statsDiv) {
        alert("A ficha calculada não está disponível para cópia.");
        return;
    }

    const tempDiv = statsDiv.cloneNode(true);
    const photoDisplay = tempDiv.querySelector('.photo-display');
    if (photoDisplay) photoDisplay.remove();

    let fichaText = '=== FICHA DE PERSONAGEM - RPG ARK ===\n\n';
    tempDiv.querySelectorAll('.ficha-section').forEach(section => {
        const sectionTitleElement = section.querySelector('.section-title');
        if (sectionTitleElement) {
            fichaText += `=== ${sectionTitleElement.textContent.trim().toUpperCase()} ===\n\n`;
        }

        section.querySelectorAll('.sub-section-title').forEach(subTitleElement => {
            fichaText += `-- ${subTitleElement.textContent.trim()} --\n\n`;
        });

        const nameElement = section.querySelector('.titulo-ficha');
        if (nameElement) {
            fichaText += `NOME: ${nameElement.textContent.trim()}\n`;
        }

        const infoItems = section.querySelectorAll('.info-item');
        infoItems.forEach(item => {
            const label = item.querySelector('.info-label')?.textContent.trim();
            const value = item.querySelector('.info-value')?.textContent.trim();
            if (label && value) {
                fichaText += `${label}: ${value}\n`;
            }
        });

        const loreElement = section.querySelector('.lore-section .formatted-text');
        if (loreElement) {
            fichaText += `\nHISTÓRIA:\n${loreElement.textContent.trim()}\n\n`;
        }

        const attributeItems = section.querySelectorAll('.attribute-item');
        if (attributeItems.length > 0) {
            fichaText += `ATRIBUTOS:\n`;
            attributeItems.forEach(item => {
                const name = item.querySelector('.attribute-name')?.textContent.trim();
                const value = item.querySelector('.attribute-value')?.textContent.trim();
                if (name && value) {
                    fichaText += `  ${name}: ${value}\n`;
                }
            });
            fichaText += '\n';
        }

        const statItems = section.querySelectorAll('.stat-item');
        if (statItems.length > 0) {
            fichaText += `ESTATÍSTICAS:\n`;
            statItems.forEach(item => {
                const label = item.querySelector('.stat-label')?.textContent.trim();
                const value = item.querySelector('.stat-value')?.textContent.trim();
                if (label && value) {
                    fichaText += `  ${label}: ${value}\n`;
                }
            });
            fichaText += '\n';
        }

        const classItems = section.querySelectorAll('.class-item');
        if (classItems.length > 0) {
            fichaText += `CLASSES:\n`;
            classItems.forEach(item => {
                const label = item.querySelector('.class-label')?.textContent.trim();
                const value = item.querySelector('.class-value')?.textContent.trim();
                if (label && value) {
                    fichaText += `  ${label}: ${value}\n`;
                }
            });
            fichaText += '\n';
        }

        const mutationElements = section.querySelectorAll('.mutation-display');
        if (mutationElements.length > 0) {
            fichaText += `MUTAÇÕES:\n`;
            mutationElements.forEach(mutation => {
                const name = mutation.querySelector('.mutation-name')?.textContent.trim();
                const type = mutation.querySelector('.mutation-type')?.textContent.trim();
                const source = mutation.querySelector('.mutation-source')?.textContent.trim();
                const description = mutation.querySelector('.mutation-description p')?.textContent.trim();
                
                fichaText += `- ${name} (${type})\n`;
                if (source) fichaText += `  Origem: ${source.replace('Origem:', '').trim()}\n`;
                if (description) fichaText += `  Descrição: ${description}\n`;
                fichaText += '\n';
            });
        }

        const bonusLists = section.querySelectorAll('.stats-list:not(.weapon-list):not(.ritual-list)');
        bonusLists.forEach(list => {
            const items = list.querySelectorAll('li');
            if (items.length > 0) {
                items.forEach(item => {
                    fichaText += `- ${item.textContent.trim()}\n`;
                });
                fichaText += '\n';
            }
        });

        const inventoryElement = section.querySelector('.inventory-section .formatted-text');
        if (inventoryElement) {
            fichaText += `INVENTÁRIO:\n${inventoryElement.textContent.trim()}\n\n`;
        }

        const weaponList = section.querySelector('.weapon-list');
        if (weaponList) {
            const weaponItems = weaponList.querySelectorAll('li');
            if (weaponItems.length > 0) {
                fichaText += `ARMAS:\n`;
                weaponItems.forEach(item => {
                    fichaText += `- ${item.textContent.trim()}\n`;
                });
                fichaText += '\n';
            }
        }

        const ritualList = section.querySelector('.ritual-list');
        if (ritualList) {
            const ritualItems = ritualList.querySelectorAll('li');
            if (ritualItems.length > 0) {
                fichaText += `RITUAIS/PACTOS:\n`;
                ritualItems.forEach(item => {
                    fichaText += `- ${item.textContent.trim()}\n`;
                });
                fichaText += '\n';
            }
        }

        fichaText += '\n';
    });

    fichaText = fichaText.replace(/(\n\s*){3,}/g, '\n\n').trim();

    navigator.clipboard.writeText(fichaText)
        .then(() => alert("Ficha copiada para a área de transferência!"))
        .catch(err => {
            console.error('Erro ao copiar a ficha: ', err);
            alert("Erro ao copiar a ficha. Por favor, tente novamente ou copie manualmente.");
        });
}

// Sistema de Dados
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

if (openMenuButton && menu && closeMenuButton) {
    openMenuButton.addEventListener('click', () => menu.classList.remove('hidden'));
    closeMenuButton.addEventListener('click', () => menu.classList.add('hidden'));
}

if (rollDiceButton) {
    rollDiceButton.addEventListener('click', () => {
        const playerName = playerNameInput.value.trim();
        const diceType = parseInt(diceSelect.value);
        const roll = Math.floor(Math.random() * diceType) + 1;

        if (!playerName) {
            alert("Por favor, insira o nome do jogador!");
            return;
        }

        if (!playerScores[playerName]) playerScores[playerName] = 0;
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

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
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
// SISTEMA DE PDF PRINCIPAL (CORRIGIDO)
// ==============================================

function generatePDF() {
    if (isGeneratingPDF) {
        alert('Aguarde a geração do PDF atual terminar.');
        return;
    }

    const resultsContainer = document.getElementById('results');
    if (!resultsContainer || resultsContainer.style.display === 'none') {
        alert('Por favor, calcule a ficha primeiro antes de gerar o PDF.');
        return;
    }

    // Verificar se as bibliotecas estão carregadas
    if (typeof html2canvas === 'undefined' || typeof jspdf === 'undefined') {
        alert('Bibliotecas de PDF não estão disponíveis. Usando método alternativo...');
        generateSimplePDF();
        return;
    }

    // Detectar dispositivo móvel
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
        offerMobilePDFOptions();
        return;
    }

    generateDesktopPDF();
}

// ==============================================
// MÉTODO PRINCIPAL PARA DESKTOP
// ==============================================

function generateDesktopPDF() {
    isGeneratingPDF = true;
    
    const button = document.querySelector('.pdf-button');
    const originalButtonText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gerando...';
    button.disabled = true;
    
    const statsElement = document.getElementById('stats');
    const tempDiv = document.createElement('div');
    tempDiv.style.cssText = 'position: absolute; left: -9999px; top: 0; width: 800px;';
    tempDiv.innerHTML = statsElement.innerHTML;
    document.body.appendChild(tempDiv);
    
    html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        onclone: function(clonedDoc) {
            clonedDoc.body.style.backgroundColor = '#ffffff';
            clonedDoc.body.style.color = '#333333';
        }
    }).then(canvas => {
        document.body.removeChild(tempDiv);
        
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf.jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        
        let heightLeft = imgHeight;
        let position = 0;
        
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        
        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        const characterName = document.getElementById('name').value || 'personagem';
        const fileName = `ficha_${characterName.toLowerCase().replace(/\s+/g, '_')}.pdf`;
        
        pdf.save(fileName);
        
        button.innerHTML = originalButtonText;
        button.disabled = false;
        isGeneratingPDF = false;
        
        alert(`PDF gerado com sucesso: ${fileName}`);
        
    }).catch(error => {
        console.error('Erro ao gerar PDF:', error);
        document.body.removeChild(tempDiv);
        
        button.innerHTML = originalButtonText;
        button.disabled = false;
        isGeneratingPDF = false;
        
        alert('Erro ao gerar PDF. Tentando método simples...');
        generateSimplePDF();
    });
}

// ==============================================
// MÉTODO SIMPLES PARA MOBILE/DESKTOP
// ==============================================

function generateSimplePDF() {
    const { jsPDF } = window.jspdf;
    
    const characterName = document.getElementById('name').value || 'Personagem';
    const level = document.getElementById('level').value || '1';
    const age = document.getElementById('age').value || 'N/I';
    
    const attributes = ['agi', 'for', 'int', 'set', 'vig'];
    const attributeNames = ['Agilidade', 'Força', 'Inteligência', 'Sentidos', 'Vitalidade'];
    const attributeValues = attributes.map(attr => 
        parseInt(document.getElementById(`${attr}Value`)?.textContent || '1')
    );
    
    const class1 = document.getElementById('class1').value || 'N/I';
    const class2 = document.getElementById('class2').value || 'N/I';
    const combatClass = document.getElementById('combatClass').value || 'N/I';
    
    const vida = 55 + (parseInt(document.getElementById('vigValue')?.textContent || 1) * 15);
    const determinacao = 55 + (parseInt(document.getElementById('intValue')?.textContent || 1) * 10) + 
                        (parseInt(document.getElementById('setValue')?.textContent || 1) * 15);
    
    const pdf = new jsPDF();
    const margin = 20;
    let y = margin;
    const lineHeight = 7;
    const pageWidth = pdf.internal.pageSize.getWidth();
    
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 102, 204);
    pdf.text('FICHA DE PERSONAGEM - RPG ARK', pageWidth / 2, y, { align: 'center' });
    y += 15;
    
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);
    pdf.text(characterName, pageWidth / 2, y, { align: 'center' });
    y += 10;
    
    pdf.setFontSize(12);
    pdf.text(`Nível: ${level}`, margin, y);
    pdf.text(`Idade: ${age}`, pageWidth - margin - 30, y);
    y += 10;
    
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, pageWidth / 2, y, { align: 'center' });
    y += 15;
    
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, y, pageWidth - margin, y);
    y += 10;
    
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.text('ATRIBUTOS PRINCIPAIS', margin, y);
    y += 10;
    
    pdf.setFontSize(11);
    const attributesPerRow = 2;
    for (let i = 0; i < attributes.length; i++) {
        const col = i % attributesPerRow;
        const row = Math.floor(i / attributesPerRow);
        const x = margin + (col * 85);
        
        pdf.setFillColor(240, 240, 240);
        pdf.rect(x, y + (row * 15), 80, 12, 'F');
        
        pdf.setTextColor(0, 0, 0);
        pdf.text(`${attributeNames[i]}:`, x + 5, y + (row * 15) + 8);
        
        pdf.setTextColor(255, 0, 0);
        pdf.setFont('helvetica', 'bold');
        pdf.text(attributeValues[i].toString(), x + 70, y + (row * 15) + 8);
        pdf.setFont('helvetica', 'normal');
    }
    
    y += (Math.ceil(attributes.length / attributesPerRow) * 15) + 15;
    
    pdf.setFontSize(14);
    pdf.text('CLASSES', margin, y);
    y += 10;
    
    pdf.setFontSize(11);
    pdf.text(`Classe Primitiva 1: ${class1}`, margin, y);
    y += 8;
    pdf.text(`Classe Primitiva 2: ${class2}`, margin, y);
    y += 8;
    pdf.text(`Classe de Combate: ${combatClass}`, margin, y);
    y += 15;
    
    pdf.setFontSize(14);
    pdf.text('ESTATÍSTICAS', margin, y);
    y += 10;
    
    pdf.setFontSize(11);
    pdf.text(`Vida: ${vida}`, margin, y);
    y += 8;
    pdf.text(`Determinação: ${determinacao}`, margin, y);
    y += 15;
    
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);
    pdf.text('© RPG ARK - Ficha gerada automaticamente', pageWidth / 2, 280, { align: 'center' });
    
    const fileName = `ficha_${characterName.replace(/\s+/g, '_')}_${Date.now()}.pdf`;
    pdf.save(fileName);
    
    alert(`PDF "${fileName}" gerado com sucesso!`);
}

// ==============================================
// OPÇÕES PARA MOBILE
// ==============================================

function offerMobilePDFOptions() {
    const modal = document.createElement('div');
    modal.id = 'pdfOptionsModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(10, 10, 20, 0.95);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        background: rgba(16, 16, 25, 0.95);
        border: 2px solid rgba(176, 255, 248, 0.3);
        border-radius: 15px;
        padding: 30px;
        max-width: 500px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.7);
    `;
    
    content.innerHTML = `
        <div style="padding: 20px; text-align: center;">
            <h3 style="color: #b6fff3; margin-bottom: 20px;">Gerar PDF (Dispositivo Móvel)</h3>
            <p style="color: #d6feff; margin-bottom: 30px;">
                Escolha o método de geração de PDF:
            </p>
            <div style="display: flex; flex-direction: column; gap: 15px;">
                <button onclick="closeModalAndGenerate('simple')" style="
                    background: linear-gradient(45deg, #6c63ff, #854fff);
                    color: white;
                    border: none;
                    padding: 15px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 16px;
                ">
                    📱 PDF Simples (Rápido)
                </button>
                <button onclick="closeModalAndGenerate('full')" style="
                    background: linear-gradient(45deg, #3498db, #2ecc71);
                    color: white;
                    border: none;
                    padding: 15px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 16px;
                ">
                    🖼️ PDF Completo (Pode ser lento)
                </button>
            </div>
            <p style="color: #888; margin-top: 20px; font-size: 12px;">
                <strong>PDF Simples:</strong> Texto básico, mais rápido<br>
                <strong>PDF Completo:</strong> Com imagens e formatação
            </p>
        </div>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '✕';
    closeButton.style.cssText = `
        position: absolute;
        top: 15px;
        right: 15px;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    closeButton.onclick = () => document.body.removeChild(modal);
    content.appendChild(closeButton);
}

function closeModalAndGenerate(type) {
    const modal = document.getElementById('pdfOptionsModal');
    if (modal) modal.remove();
    
    if (type === 'simple') {
        generateSimplePDF();
    } else if (type === 'full') {
        generateDesktopPDF();
    }
}

// ==============================================
// INICIALIZAÇÃO
// ==============================================

window.onload = function() {
    loadForm();
    
    const addMutationBtn = document.getElementById('addMutationSlotBtn');
    if (addMutationBtn) {
        addMutationBtn.addEventListener('click', showMutationTypeMenu);
    }
    
    document.addEventListener('input', function(e) {
        if (e.target && e.target.id && e.target.id.startsWith('mutationName_') || 
            e.target.id.startsWith('mutationDescription_') || 
            e.target.id.startsWith('mutationSource_')) {
            const index = parseInt(e.target.id.split('_')[1]);
            const field = e.target.id.includes('Name') ? 'name' : 
                         e.target.id.includes('Description') ? 'description' : 'source';
            updateMutationFromFormSlot(index, field, e.target.value);
        }
    });
    
    const levelInput = document.getElementById('level');
    if (levelInput) {
        levelInput.addEventListener('change', function() {
            updatePrimalStage();
            saveMutationData();
        });
    }
    
    const pdfButton = document.querySelector('.pdf-button');
    if (pdfButton) {
        pdfButton.onclick = generatePDF;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    loadForm();
});