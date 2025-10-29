const attributesBase = { // Armazena os pontos base distribuídos pelo jogador
    agi: 1,
    for: 1,
    int: 1,
    set: 1,
    vig: 1
};

// 'attributes' agora será uma representação dos atributos com bônus aplicados, para exibição no formulário.
// Ele será recalculado com base em attributesBase e appliedClassBonuses.
let attributes = { ...attributesBase }; 

let actionBonuses = [];
let learnedActionBonuses = [];
let weapons = [];
let characterRituals = []; 

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
    class2: { className: '' , attribute: '' }
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

    const characterData = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        level: document.getElementById("level").value,
        photo: document.getElementById("preview").src,
        lore: document.getElementById("lore").value,
        attributesBase: { ...attributesBase }, // Salva a base dos atributos
        mutation: document.getElementById("mutation").value,
        class1: document.getElementById("class1").value,
        class2: document.getElementById("class2").value,
        combatClass: document.getElementById("combatClass").value,
        inventory: document.getElementById("inventory").value,
        actionBonuses: [...actionBonuses],
        learnedActionBonuses: [...learnedActionBonuses],
        weapons: [...weapons],
        characterRituals: [...characterRituals],
        appliedClassBonuses: { 
            class1: { ...appliedClassBonuses.class1 }, 
            class2: { ...appliedClassBonuses.class2 }  
        },
        savedName: characterName,
        savedLevel: parseInt(document.getElementById("level").value) || 1
    };
    console.log("Dados da ficha a serem salvos localmente:", characterData);

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

    console.log("Carregando ficha localmente:", data);

    document.getElementById("name").value = data.name || '';
    document.getElementById("age").value = data.age || '';
    document.getElementById("level").value = data.level || '1';
    document.getElementById("lore").value = data.lore || '';
    document.getElementById("mutation").value = data.mutation || '';

    // Carrega os valores base dos atributos (sem bônus de classe)
    for (const key in data.attributesBase) {
        if (attributesBase.hasOwnProperty(key)) {
            attributesBase[key] = data.attributesBase[key];
        }
    }

    // Limpa os bônus aplicados antes de carregar
    appliedClassBonuses.class1 = { className: '', attribute: '' };
    appliedClassBonuses.class2 = { className: '', attribute: '' };

    // Carrega o estado de appliedClassBonuses
    if (data.appliedClassBonuses) {
        if (data.appliedClassBonuses.class1) {
            Object.assign(appliedClassBonuses.class1, data.appliedClassBonuses.class1);
        }
        if (data.appliedClassBonuses.class2) {
            Object.assign(appliedClassBonuses.class2, data.appliedClassBonuses.class2);
        }
    }

    // Carrega as classes selecionadas nos selects
    // Garante que o valor seja setado ANTES de recalcular o display e o estado dos botões
    document.getElementById("class1").value = data.class1 || '';
    document.getElementById("class2").value = data.class2 || '';

    // Agora, aplique os bônus de classe aos atributos exibidos (attributes)
    updateAttributesDisplay(); 
    // E atualize o estado dos botões de classe.
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

    characterRituals = Array.isArray(loadedRituals) ? loadedRituals : [];
    loadSelectedRitualPact();

    const characterNameInput = document.getElementById("characterNameInput");
    if (characterNameInput) {
        characterNameInput.value = data.savedName || '';
    }

    validateLevelInput();
    calculateStats(); 

    alert(`Ficha "${data.savedName || 'Sem Nome'}" carregada automaticamente!`);
    document.getElementById("results").scrollIntoView({ behavior: 'smooth' });
}


// Reseta apenas o estado das variáveis, não o formulário visual
function resetFormState() {
    const preview = document.getElementById("preview");
    preview.style.display = "none";
    preview.src = "#";

    for (const key in attributesBase) {
        attributesBase[key] = 1; // Reseta a base
    }
    
    // Limpa os bônus aplicados
    appliedClassBonuses.class1 = { className: '', attribute: '' };
    appliedClassBonuses.class2 = { className: '', attribute: '' };
    
    updateAttributesDisplay(); // Atualiza a exibição no formulário
    document.getElementById('class1').value = ''; // Limpa explicitamente o valor do select
    document.getElementById('class2').value = ''; // Limpa explicitamente o valor do select
    updateClassButtonsState(); // Garante que os botões voltem ao estado inicial

    actionBonuses = [];
    renderActionBonuses();
    updateActionBonusLimits(); 
    learnedActionBonuses = [];
    renderLearnedActionBonuses();

    weapons = [];
    renderWeapons();
    characterRituals = []; 
    loadSelectedRitualPact(); 

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

// Calcula os pontos distribuídos na base, sem contar os bônus de classe
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
}

// ATUALIZADO: Função para atualizar a exibição dos atributos no formulário
// Recalcula 'attributes' a partir de 'attributesBase' e 'appliedClassBonuses'
function updateAttributesDisplay() {
    // Primeiro, copia os valores base para 'attributes'
    for (const key in attributesBase) {
        attributes[key] = attributesBase[key];
    }

    // Agora, adiciona os bônus de classe *APENAS AQUI*
    if (appliedClassBonuses.class1.className && appliedClassBonuses.class1.attribute) {
        attributes[appliedClassBonuses.class1.attribute]++;
    }
    if (appliedClassBonuses.class2.className && appliedClassBonuses.class2.attribute) {
        attributes[appliedClassBonuses.class2.attribute]++;
    }

    // Atualiza o display no HTML
    for (const key in attributes) {
        const element = document.getElementById(`${key}Value`);
        if (element) {
            element.textContent = attributes[key];
        } else {
            console.warn(`Elemento com ID '${key}Value' não encontrado para atualização.`);
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

    attributesBase[attributeName] += change; // Altera a base
    updateAttributesDisplay(); // Atualiza o display no formulário
    updateAttributePointsDisplay(); // Atualiza os pontos disponíveis
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

// Função centralizada para atualizar o estado dos botões de classe
function updateClassButtonsState() {
    const class1Select = document.getElementById('class1');
    const class2Select = document.getElementById('class2');
    const applyClass1Btn = document.getElementById('applyClass1Btn');
    const applyClass2Btn = document.getElementById('applyClass2Btn');

    if (!applyClass1Btn || !applyClass2Btn || !class1Select || !class2Select) {
        console.warn("Elementos de classe ou botões não encontrados. Verifique o HTML.");
        return;
    }

    const selectedClass1 = class1Select.value;
    const selectedClass2 = class2Select.value;

    // Desabilita o botão se já houver um bônus aplicado para o slot OU se nenhuma classe foi selecionada
    applyClass1Btn.disabled = !!appliedClassBonuses.class1.className || selectedClass1 === '';
    applyClass2Btn.disabled = !!appliedClassBonuses.class2.className || selectedClass2 === '';

    // Se as classes selecionadas são iguais e válidas, e nenhum bônus foi aplicado ainda
    if (selectedClass1 !== '' && selectedClass1 === selectedClass2) {
        // Se o bônus da classe 1 ainda NÃO foi aplicado, desabilita o botão da classe 1
        if (!appliedClassBonuses.class1.className) {
            applyClass1Btn.disabled = true;
        }
        // Se o bônus da classe 2 ainda NÃO foi aplicado, desabilita o botão da classe 2
        if (!appliedClassBonuses.class2.className) {
            applyClass2Btn.disabled = true;
        }
    }
}


// ATUALIZADO: Remove a manipulação direta de attributesBase
function resetClassBonus(classId) {
    const previousBonus = appliedClassBonuses[classId];
    if (previousBonus.className && previousBonus.attribute) {
        // Apenas limpa o registro do bônus aplicado. O recalculo será feito em updateAttributesDisplay.
        appliedClassBonuses[classId] = { className: '', attribute: '' }; 
        updateAttributesDisplay(); // Recalcula e atualiza o display
    }
    updateClassButtonsState(); // Reavalia o estado dos botões
}

// ATUALIZADO: Remove a manipulação direta de attributesBase
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

    // Verificação se a mesma classe está selecionada no outro slot
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
        
        // Apenas registra qual bônus foi aplicado. O incremento real ocorre em updateAttributesDisplay.
        appliedClassBonuses[classId] = { className: selectedClass, attribute: chosenAttribute };

        updateAttributesDisplay(); // Recalcula e atualiza o display dos atributos
        alert(`Bônus de +1 em ${chosenAttribute} da classe ${selectedClass} aplicado aos atributos!`);
        updateClassButtonsState(); // Atualiza o estado dos botões
        updateAttributePointsDisplay(); // Atualiza os pontos disponíveis

    } else {
        alert("Escolha inválida. Por favor, digite o nome exato de um dos atributos sugeridos.");
    }
}

// Event Listeners para os selects de classe primitiva
// Eles agora apenas chamam updateClassButtonsState()
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

    if (level >= 30) {
        totalSlots = 12;
    }
    if (level >= 50) {
        totalSlots = 15;
        maxBonusValue = 20;
    }
    if (level >= 80) {
        totalSlots = 20;
    }

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
    addActionButton.disabled = (totalSlots - calculateUsedSlots() <= 0 && totalSlots > 0);
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

function calculateStats() {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const level = parseInt(document.getElementById("level").value) || 1;
    const photoSrc = document.getElementById("preview").src;
    const lore = document.getElementById("lore").value;
    const mutation = document.getElementById("mutation").value;
    const class1 = document.getElementById("class1").value;
    const class2 = document.getElementById("class2").value;
    const combatClass = document.getElementById("combatClass").value;
    const inventory = document.getElementById("inventory").value;

    let vida = 55 + (attributes.vig * 15);
    let determinacaoSanidade = 55 + (attributes.int * 10) + (attributes.set * 15);
    let resistencia = 15 + (attributes.vig * 5);
    let folego = 4 + (attributes.vig * 1);
    let armadura = 5;

    if (level >= 15) {
        armadura += 1;
    }
    if (level >= 30) {
        armadura += 1;
    }
    if (level >= 50) {
        vida += 30;
    }
    if (level >= 65) {
        determinacaoSanidade += 20;
    }
    if (level >= 80) {
        armadura += 10;
    }
    if (level >= 95) {
        vida += 20;
        determinacaoSanidade += 20;
    }
    if (level >= 99) {
        armadura += 10;
    }
    
    // Objeto completo com todos os dados do personagem
    const characterData = {
        name: name,
        age: age,
        level: level,
        photo: photoSrc,
        lore: lore,
        mutation: mutation,
        class1: class1,
        class2: class2,
        combatClass: combatClass,
        inventory: inventory,
        attributesBase: attributes,
        appliedClassBonuses: {
            class1: { attribute: class1 },
            class2: { attribute: class2 }
        },
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
    };

    // Salva o objeto completo no localStorage
    localStorage.setItem('localCharacterData', JSON.stringify(characterData));
    
    // Renderiza a ficha HTML (como você já fazia)
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
        ritualsHtml = `<ul class="stats-list ritual-list">`;
        characterRituals.forEach(ritual => {
            ritualsHtml += `<li><strong class="sub-category-title">${ritual.name}</strong>: <span class="attribute-value">${ritual.description}</span></li>`;
        });
        ritualsHtml += `</ul>`;
    } else {
        ritualsHtml = '<p class="no-info">Nenhum ritual ou pacto selecionado.</p>';
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
        mutationRewardsList.push(`+1 Parte de Mutação (Revivendo Memória)`);
    }
    if (level >= 80) {
        levelRewardsList.push(`+10 Armadura padrão (já adicionado ao total)`);
        levelRewardsList.push(`Mais slots para Bônus de Ação (Total de 20 slots)`);
        inventoryRewardsList.push('1 Ritual Normal');
        inventoryRewardsList.push('1 Subida de Patente');
    }
    if (level >= 95) {
        mutationRewardsList.push(`+1 Parte de Mutação (Conversa com o Infinito)`);
        inventoryRewardsList.push('Convite da Linhagem de Athenas');
    }
    if (level >= 99) {
        levelRewardsList.push(`+10 Armadura padrão (já adicionado ao total)`);
        levelRewardsList.push(`+1 Ponto de Atributo adicional (já contabilizado na ficha)`);
        mutationRewardsList.push(`+1 Parte de Mutação (Último Incentivo Pessoal)`);
        levelRewardsList.push(`Título: "Sobrevivente"`);
    }

    let statsHtml = `
        <div class="ficha-section">
            <h4 class="section-title">Informações Básicas</h4>
            <p class="stats-item"><strong class="sub-category-title">Nome</strong>: <span class="attribute-value">${name || '<span class="no-info">Não preenchido</span>'}</span></p>
            ${photoSrc && photoSrc !== window.location.href + "#" && !photoSrc.includes('data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=') ? `<div class="stats-item photo-display"><strong class="sub-category-title">Foto</strong>:<br><img src="${photoSrc}" alt="Foto do Personagem" class="character-photo"></div>` : ''}
            <p class="stats-item"><strong class="sub-category-title">Idade</strong>: <span class="attribute-value">${age || '<span class="no-info">Não preenchido</span>'}</span></p>
            <p class="stats-item"><strong class="sub-category-title">Nível</strong>: <span class="ficha-calculated-level-value">${level}</span></p>
        </div>

        <div class="ficha-section">
            <h4 class="section-title">Atributos e Estatísticas</h4>
            <ul class="stats-list attributes-list">
                <li><strong class="sub-category-title">Agi</strong>: <span class="attribute-value">${attributes.agi}</span></li>
                <li><strong class="sub-category-title">For</strong>: <span class="attribute-value">${attributes.for}</span></li>
                <li><strong class="sub-category-title">Int</strong>: <span class="attribute-value">${attributes.int}</span></li>
                <li><strong class="sub-category-title">Set</strong>: <span class="attribute-value">${attributes.set}</span></li>
                <li><strong class="sub-category-title">Vig</strong>: <span class="attribute-value">${attributes.vig}</span></li>
            </ul>
            <p class="stats-item"><strong class="sub-category-title">Vida Total</strong>: <span class="attribute-value">${vida}</span></p>
            <p class="stats-item"><strong class="sub-category-title">Determinação/Sanidade</strong>: <span class="attribute-value">${determinacaoSanidade}</span></p>
            <p class="stats-item"><strong class="sub-category-title">Resistência</strong>: <span class="attribute-value">${resistencia}</span></p>
            <p class="stats-item"><strong class="sub-category-title">Fôlego</strong>: <span class="attribute-value">${folego}</span></p>
            <p class="stats-item"><strong class="sub-category-title">Armadura</strong>: <span class="attribute-value">${armadura}</span> <span class="ficha-calculated-skin-detail"></span></p>
        </div>

        <div class="ficha-section">
            <h4 class="section-title">Classes e Mutação</h4>
            <p class="stats-item"><strong class="sub-category-title">Classe Primitiva 1</strong>: <span class="attribute-value">${class1 || '<span class="no-info">Não selecionado</span>'}</span></p>
            <p class="stats-item"><strong class="sub-category-title">Classe Primitiva 2</strong>: <span class="attribute-value">${class2 || '<span class="no-info">Não selecionado</span>'}</span></p> <p class="stats-item"><strong class="sub-category-title">Classe de Combate</strong>: <span class="attribute-value">${combatClass || '<span class="no-info">Não selecionado</span>'}</span></p>
            <p class="stats-item"><strong class="sub-category-title">Mutação de Personagem</strong>:<br><span class="attribute-value formatted-text">${mutation ? mutation.replace(/\n/g, '<br>') : '<span class="no-info">Não preenchido</span>'}</span></p>
            ${mutationRewardsList.length > 0 ? `<div class="stats-item"><strong class="sub-category-title">Recompensas de Mutação</strong>: <ul class="stats-list">${mutationRewardsList.map(item => `<li><span class="attribute-value">${item}</span></li>`).join('')}</ul></div>` : ''}
        </div>

        <div class="ficha-section">
            <h4 class="section-title">Bônus em Ações</h4>
            ${bonusAcoesHtml}
        </div>

        <div class="ficha-section">
            <h4 class="section-title">Bônus de Ações Aprendidos</h4>
            ${learnedBonusAcoesHtml}
        </div>
        
        <div class="ficha-section">
            <h4 class="section-title">Rituais/Pactos Selecionados</h4>
            ${ritualsHtml}
        </div>

        <div class="ficha-section">
            <h4 class="section-title">Inventário e Armas</h4> <p class="stats-item"><strong class="sub-category-title">Itens Atuais</strong>:<br><span class="attribute-value formatted-text">${inventory ? inventory.replace(/\n/g, '<br>') : '<span class="no-info">Nenhum item registrado.</span>'}</span></p>
            ${inventoryRewardsList.length > 0 ? `<div class="stats-item"><strong class="sub-category-title">Recompensas Adicionais no Inventário por Nível</strong>: <ul class="stats-list">${inventoryRewardsList.map(item => `<li><span class="attribute-value">${item}</span></li>`).join('')}</ul></div>` : ''}

            <h4 class="sub-section-title">Armas</h4> ${weaponsHtml} </div>

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
    if (photoDisplay) {
        photoDisplay.remove();
    }

    let fichaText = '=== FICHA DE PERSONAGEM ===\n\n';

    tempDiv.querySelectorAll('.ficha-section').forEach(section => {
        const sectionTitleElement = section.querySelector('.section-title');
        if (sectionTitleElement) {
            fichaText += `=== ${sectionTitleElement.textContent.trim()} ===\n\n`;
        }

        section.querySelectorAll('.sub-section-title').forEach(subTitleElement => {
            fichaText += `-- ${subTitleElement.textContent.trim()} --\n\n`;
        });

        section.querySelectorAll('.stats-item').forEach(item => {
            const strongElement = item.querySelector('strong');
            let label = strongElement ? strongElement.textContent.trim().replace(/:$/, '') : '';
            let value = item.textContent.replace(strongElement ? strongElement.textContent : '', '').trim();

            if (label.includes('Lore - História') || label.includes('Mutação de Personagem') || label.includes('Itens Atuais')) {
                value = value.replace(/<br>/g, '\n').trim();
                fichaText += `${label}:\n${value}\n\n`;
            } else if (label) {
                fichaText += `${label}: ${value}\n`;
            }
        });

        section.querySelectorAll('.stats-list').forEach(list => {
            list.querySelectorAll('li').forEach(listItem => {
                const subCategory = listItem.querySelector('.sub-category-title');
                const attributeValue = listItem.querySelector('.attribute-value');
                let itemText = listItem.textContent.trim();

                if (subCategory && attributeValue) {
                    itemText = `${subCategory.textContent.trim().replace(':', '')}: ${attributeValue.textContent.trim()}`;
                }
                fichaText += `- ${itemText}\n`;
            });
            fichaText += '\n';
        });

        const ritualPactDisplay = section.querySelector('#selectedRitualPactDisplay');
        if (ritualPactDisplay) {
            fichaText += `-- Rituais/Pactos Selecionados --\n\n`;
            characterRituals.forEach(item => {
                fichaText += `- ${item.name}:\n  ${item.description}\n\n`;
            });
        }
        fichaText += '\n';
    });

    fichaText = fichaText.replace(/(\n\s*){2,}/g, '\n\n').trim();

    navigator.clipboard.writeText(fichaText)
        .then(() => {
            alert("Ficha copiada para a área de transferência!");
        })
        .catch(err => {
            console.error('Erro ao copiar a ficha: ', err);
            alert("Erro ao copiar a ficha. Por favor, tente novamente ou copie manualmente.");
        });
}

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
    openMenuButton.addEventListener('click', () => {
        menu.classList.remove('hidden');
    });

    closeMenuButton.addEventListener('click', () => {
        menu.classList.add('hidden');
    });
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

document.addEventListener("scroll", () => {
    const footer = document.querySelector("footer");
    if (footer) {
        if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
            footer.style.background = "linear-gradient(45deg, #1a1a1a, #1a1a1a, #000, #000,#1a1a1a, #1a1a1a)";
        } else {
            footer.style.background = "linear-gradient(45deg, #1a1a1a, #000)";
        }
    }
});

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

    if (!displayContainer) {
        console.warn("Contêiner 'selectedRitualPactDisplay' não encontrado na ficha.");
        return;
    }

    displayContainer.innerHTML = '';

    // 🎯 CORREÇÃO: Carregar dados de forma robusta
    try {
        // Tentar múltiplas fontes
        const storedData = localStorage.getItem(RITUALS_STORAGE_KEY);
        const characterData = JSON.parse(localStorage.getItem(LOCAL_CHARACTER_STORAGE_KEY) || '{}');
        
        console.log("📦 Tentando carregar rituais de:", { 
            hasRitualsStorage: !!storedData,
            hasCharacterData: !!characterData,
            hasCharacterRituals: !!(characterData.characterRituals)
        });

        // Prioridade 1: Dados específicos de rituais
        if (storedData) {
            characterRituals = JSON.parse(storedData);
            console.log("✅ Rituais carregados do storage específico");
        }
        // Prioridade 2: Rituais nos dados do personagem
        else if (characterData.characterRituals) {
            characterRituals = characterData.characterRituals;
            console.log("✅ Rituais carregados dos dados do personagem");
        }
        // Prioridade 3: Propriedade antiga
        else if (characterData.rituals) {
            characterRituals = characterData.rituals;
            console.log("✅ Rituais carregados da propriedade antiga");
        }
        else {
            characterRituals = [];
            console.log("ℹ️ Nenhum ritual encontrado");
        }

    } catch (error) {
        console.error("❌ Erro ao carregar rituais:", error);
        characterRituals = [];
    }

    // Garantir que characterRituals é um array
    if (!Array.isArray(characterRituals)) {
        console.warn("❌ characterRituals não é um array, convertendo...");
        characterRituals = [];
    }

    console.log(`🔍 ${characterRituals.length} ritual(s) para exibir`);

    if (characterRituals.length > 0) {
        console.log("✅ Exibindo rituais na ficha");
        
        characterRituals.forEach((item, index) => {
            if (!item) {
                console.warn("Item inválido encontrado, pulando...");
                return;
            }

            const itemDiv = document.createElement("div");
            itemDiv.classList.add("ritual-pact-item");
            
            // 🎯 USAR PROPRIEDADES NORMALIZADAS
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

        // Adicionar event listeners para os botões de remover
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
    
    // 🆕 SINCRONIZAR com os dados principais do personagem
    synchronizeRitualsWithCharacterData();
}

// 🆕 FUNÇÃO PARA SINCRONIZAR RITUAIS
function synchronizeRitualsWithCharacterData() {
    try {
        const characterData = JSON.parse(localStorage.getItem(LOCAL_CHARACTER_STORAGE_KEY) || '{}');
        characterData.characterRituals = characterRituals;
        localStorage.setItem(LOCAL_CHARACTER_STORAGE_KEY, JSON.stringify(characterData));
        console.log("✅ Rituais sincronizados com dados do personagem");
    } catch (error) {
        console.error("❌ Erro ao sincronizar rituais:", error);
    }
}
// 🆕 FUNÇÃO PARA ATUALIZAR RITUAIS EM AMBOS OS LOCAIS
function updateRitualsInBothStorages(ritualsArray) {
    // Atualizar storage específico de rituais
    localStorage.setItem(RITUALS_STORAGE_KEY, JSON.stringify(ritualsArray));
    
    // Atualizar nos dados do personagem
    const characterData = JSON.parse(localStorage.getItem(LOCAL_CHARACTER_STORAGE_KEY) || '{}');
    characterData.characterRituals = ritualsArray;
    localStorage.setItem(LOCAL_CHARACTER_STORAGE_KEY, JSON.stringify(characterData));
    
    console.log("✅ Rituais atualizados em ambos os storages");
}

function removeRitualPact(indexToRemove) {
    if (indexToRemove !== undefined && indexToRemove >= 0 && indexToRemove < characterRituals.length) {
        const removedItemName = characterRituals[indexToRemove].nome || characterRituals[indexToRemove].name;
        characterRituals.splice(indexToRemove, 1);
        
        // 🎯 USAR A NOVA FUNÇÃO PARA ATUALIZAR EM AMBOS OS LOCAIS
        updateRitualsInBothStorages(characterRituals);
        
        loadSelectedRitualPact();
        alert(`"${removedItemName}" removido da ficha.`);
    }
}


window.onload = loadForm;
document.addEventListener('DOMContentLoaded', () => {
    loadForm();
});

function debugRitualsStorage() {
    console.log("=== 🔍 DEBUG COMPLETO DO SISTEMA DE RITUAIS ===");
    
    // Verificar todas as chaves no localStorage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        console.log(`Chave ${i}: "${key}"`);
        
        if (key === RITUALS_STORAGE_KEY) {
            try {
                const data = JSON.parse(localStorage.getItem(key));
                console.log("📦 Conteúdo da chave de rituais:", data);
                console.log("📊 Tipo:", typeof data);
                console.log("🔢 Quantidade de itens:", Array.isArray(data) ? data.length : 'Não é array');
                
                if (Array.isArray(data) && data.length > 0) {
                    console.log("📝 Primeiro item:", data[0]);
                    console.log("🔑 Propriedades do primeiro item:", Object.keys(data[0]));
                }
            } catch (e) {
                console.error("❌ Erro ao parsear:", e);
            }
        }
    }
    console.log("=== FIM DO DEBUG ===");
}

// Chame esta função no console do navegador para verificar
// debugRitualsStorage();
