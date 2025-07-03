
// Objeto para armazenar os valores dos atributos
const attributes = {
    agi: 1,
    for: 1,
    int: 1,
    set: 1,
    vig: 1
};

// Objeto para armazenar os bônus de ação (lista de objetos {action: '', value: 5, fixed: false, occupiesSlot: true})
let actionBonuses = [];

// Objeto para armazenar os bônus de ação aprendidos (lista de objetos {action: '', value: 5})
let learnedActionBonuses = []; // Array para bônus de ações aprendidos

// --- NOVO: Variável para armazenar as armas (lista de objetos {name: '', damageDice: '', condition: ''}) ---
let weapons = [];

// --- NOVO: Lista de condições pré-definidas para as armas ---
const predefinedConditions = [
    "Nula", // Opção padrão para nenhuma condição
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


// Pontos de atributo iniciais disponíveis para o jogador distribuir
let initialDistributablePoints = 5;
let bonusPointsFromLevel = 0; // Pontos ganhos por nível
let bonusPointsFromClasses = 0; // Total de pontos ganhos por classes aplicadas

// Para controlar os bônus aplicados por classe
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

// =========================================================
// NOVO: Variáveis e Funções para Gerenciamento de Ficha Local (Sem Login)
// =========================================================

// O sistema de login será mantido apenas para propósitos de 'loginUser' e 'logoutUser'
// e o redirecionamento, mas não para o salvamento da ficha em si.
let currentUser = null; // Simula o usuário atualmente logado (para o login/logout geral do site)

// CHAVE ÚNICA PARA SALVAR A FICHA NO LOCALSTORAGE
const LOCAL_CHARACTER_STORAGE_KEY = 'localCharacterData';

// Função para simular o login de um usuário
// MANTIDO, MAS AGORA SÓ REDIRECIONA. NÃO AFETA O SALVAMENTO DA FICHA.
function loginUser(username) {
    if (!username) {
        alert("Por favor, digite um nome de usuário.");
        return;
    }
    currentUser = username.toLowerCase();
    localStorage.setItem('loggedInUser', currentUser); // Salva o usuário logado
    console.log(`Usuário logado: ${currentUser}`);
    alert(`Bem-vindo, ${username}!`);
    updateLoginDisplay(); // Atualiza a UI para mostrar o usuário logado
    // REMOVIDO: listUserCharacters() - não há mais lista de fichas por usuário aqui
    resetForm(); // Limpa o formulário (pode ser útil se o usuário quiser começar uma nova ficha)
    
    // NOVO: Redireciona para a página inicial
    window.location.href = '../index.html'; 
}

// Função para simular o logout do usuário
// MANTIDO, MAS SÓ AFETA O ESTADO DE LOGIN GERAL DO SITE.
function logoutUser() {
    if (confirm("Tem certeza que deseja sair?")) {
        currentUser = null;
        localStorage.removeItem('loggedInUser');
        console.log("Usuário deslogado.");
        alert("Você foi desconectado.");
        updateLoginDisplay(); // Atualiza a UI
        // Não resetamos o formulário da ficha, pois ela é local e independente do login agora.
        // O usuário pode querer que a ficha permaneça lá mesmo deslogado.
        // REMOVIDO: document.getElementById('userCharactersList').innerHTML = ''; // Limpa a lista de fichas
    }
}

// Função para pegar o usuário logado do localStorage ao carregar a página
// MANTIDO, PARA EXIBIR O STATUS DE LOGIN NO HEADER/MENU.
function getLoggedInUser() {
    currentUser = localStorage.getItem('loggedInUser');
    if (currentUser) {
        updateLoginDisplay();
        // REMOVIDO: listUserCharacters() - não há mais lista de fichas por usuário aqui
    }
}

// Função para atualizar a exibição do usuário logado na UI
// MANTIDO
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

// REMOVIDA: generateCharacterId() - não é mais necessário para IDs de fichas por usuário.

// REMOVIDA: listUserCharacters() - não há mais uma lista de fichas por usuário.
// O ELEMENTO HTML <div id="userCharactersList"></div> DEVE SER REMOVIDO DO index_jogadores.html

// NOVO: Função para salvar a ficha localmente (UMA POR NAVEGADOR)
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
        if (characterNameInput) characterNameInput.value = characterName; // Atualiza o input se existir
    }
    
    const characterData = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        level: document.getElementById("level").value,
        photo: document.getElementById("preview").src,
        lore: document.getElementById("lore").value,
        attributes: { ...attributes }, // Copia o objeto global 'attributes'
        mutation: document.getElementById("mutation").value,
        class1: document.getElementById("class1").value,
        class2: document.getElementById("class2").value, // Classe 2 agora considerada obrigatória para salvar
        combatClass: document.getElementById("combatClass").value,
        inventory: document.getElementById("inventory").value,
        actionBonuses: [...actionBonuses], // Copia o array global 'actionBonuses'
        learnedActionBonuses: [...learnedActionBonuses], // Copia o array global 'learnedActionBonuses'
        // --- NOVO: Salva o array de armas ---
        weapons: [...weapons],
        appliedClassBonuses: { // Copia o objeto global 'appliedClassBonuses'
            class1: { ...appliedClassBonuses.class1 },
            class2: { ...appliedClassBonuses.class2 }
        },
        savedName: characterName, // Nome da ficha para o display no input
        savedLevel: parseInt(document.getElementById("level").value) || 1
    };
    console.log("Dados da ficha a serem salvos localmente:", characterData);

    localStorage.setItem(LOCAL_CHARACTER_STORAGE_KEY, JSON.stringify(characterData));
    alert(`Ficha "${characterName}" salva localmente com sucesso!`);
    // Nenhuma lista de fichas para atualizar aqui.
}

// NOVO: Função para carregar a ficha localmente (A ÚLTIMA SALVA)
function loadCharacterLocal() {
    const data = JSON.parse(localStorage.getItem(LOCAL_CHARACTER_STORAGE_KEY) || 'null');

    if (!data) {
        console.log("Nenhuma ficha salva localmente encontrada. Iniciando com formulário limpo.");
        resetForm(); // Garante que o formulário está limpo se não há dados salvos
        return;
    }

    console.log("Carregando ficha localmente:", data);

    // Preenche o formulário com os dados da ficha
    document.getElementById("name").value = data.name || '';
    document.getElementById("age").value = data.age || '';
    document.getElementById("level").value = data.level || '1';

    document.getElementById("lore").value = data.lore || '';
    document.getElementById("mutation").value = data.mutation || '';

    // Carrega atributos
    for (const key in data.attributes) {
        if (attributes.hasOwnProperty(key)) {
            attributes[key] = data.attributes[key];
            document.getElementById(`${key}Value`).textContent = attributes[key];
        }
    }

    // Define os valores das classes
    document.getElementById("class1").value = data.class1 || '';
    document.getElementById("class2").value = data.class2 || '';
    
    // Carrega bônus de classe aplicados
    bonusPointsFromClasses = 0; // Reseta antes de carregar
    appliedClassBonuses.class1 = { className: '', attribute: '' };
    appliedClassBonuses.class2 = { className: '', attribute: '' };

    if (data.appliedClassBonuses) {
        Object.assign(appliedClassBonuses.class1, data.appliedClassBonuses.class1);
        Object.assign(appliedClassBonuses.class2, data.appliedClassBonuses.class2);

        // Recalcula bonusPointsFromClasses com base no que foi carregado
        if (appliedClassBonuses.class1.className && appliedClassBonuses.class1.attribute) bonusPointsFromClasses++;
        if (appliedClassBonuses.class2.className && appliedClassBonuses.class2.attribute) bonusPointsFromClasses++;
    }

    // Atualiza o estado dos botões "Aplicar Bônus"
    document.getElementById('applyClass1Btn').disabled = !!appliedClassBonuses.class1.className;
    document.getElementById('applyClass2Btn').disabled = !!appliedClassBonuses.class2.className;
    
    // Dispara eventos para que a lógica de desabilitar/habilitar botões de classe funcione
    // Isto é crucial para que a validação de classe duplicada funcione ao carregar
    document.getElementById("class1").dispatchEvent(new Event('change'));
    document.getElementById("class2").dispatchEvent(new Event('change'));


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

    // Carrega bônus de ação e bônus aprendidos
    actionBonuses = (data.actionBonuses || []).map(bonus => ({
        ...bonus,
        occupiesSlot: bonus.occupiesSlot !== undefined ? bonus.occupiesSlot : !bonus.fixed
    }));
    renderActionBonuses();

    learnedActionBonuses = data.learnedActionBonuses || [];
    renderLearnedActionBonuses();

    // --- NOVO: Carrega e renderiza as armas ---
    weapons = data.weapons || [];
    renderWeapons(); // <--- CHAMA A NOVA FUNÇÃO DE RENDERIZAÇÃO


    // Define o nome da ficha no input de nome da ficha
    const characterNameInput = document.getElementById("characterNameInput");
    if (characterNameInput) {
        characterNameInput.value = data.savedName || '';
    }

    // Chamar validateLevelInput e outras atualizações *após* carregar todos os dados relevantes
    validateLevelInput(); // Isso vai chamar updateAttributePointsDisplay e updateActionBonusLimits
    
    calculateStats(); // Recalcula e exibe a ficha
    updateLevelBar();

    alert(`Ficha "${data.savedName || 'Sem Nome'}" carregada automaticamente!`);
    document.getElementById("results").scrollIntoView({ behavior: 'smooth' }); // Rola para os resultados
}

// REMOVIDA: deleteUserCharacter() - não é mais necessário para deletar fichas por ID.
// Se quiser um botão para "Limpar Ficha", ele chamaria resetForm() e removeria a chave LOCAL_CHARACTER_STORAGE_KEY.

// Função para resetar o formulário para uma nova ficha
function resetForm() {
    document.getElementById("characterForm").reset(); // Limpa a maioria dos inputs

    // Limpa os elementos de imagem
    const preview = document.getElementById("preview");
    preview.style.display = "none";
    preview.src = "#";

    // Reseta atributos para 1 e atualiza a exibição
    for (const key in attributes) {
        attributes[key] = 1;
        document.getElementById(`${key}Value`).textContent = attributes[key];
    }
    
    // Reseta os bônus de classe aplicados
    bonusPointsFromClasses = 0;
    appliedClassBonuses.class1 = { className: '', attribute: '' };
    appliedClassBonuses.class2 = { className: '', attribute: '' };
    document.getElementById('applyClass1Btn').disabled = false;
    document.getElementById('applyClass2Btn').disabled = false;
    document.getElementById('class1').value = ''; // Limpa as classes no reset
    document.getElementById('class2').value = '';
    document.getElementById('class1').dispatchEvent(new Event('change')); // Garante que o outro botão esteja correto
    document.getElementById('class2').dispatchEvent(new Event('change')); // Garante que o outro botão esteja correto

    // Reseta os bônus de ação
    actionBonuses = [];
    renderActionBonuses();
    learnedActionBonuses = [];
    renderLearnedActionBonuses();

    // --- NOVO: Reseta o array de armas e re-renderiza ---
    weapons = [];
    renderWeapons();

    const characterNameInput = document.getElementById("characterNameInput");
    if (characterNameInput) characterNameInput.value = ''; // Limpa o nome da ficha no input

    // Atualiza todas as exibições dependentes
    document.getElementById("level").value = '1'; // Garante que o nível comece em 1
    validateLevelInput(); // Isso vai chamar updateAttributePointsDisplay e updateActionBonusLimits
    
    document.getElementById("results").style.display = "none"; // Esconde a ficha calculada
    alert("Formulário limpo para uma nova ficha.");

    // Remove a ficha salva localmente para que um novo formulário possa ser preenchido
    localStorage.removeItem(LOCAL_CHARACTER_STORAGE_KEY);
}

// Função para "salvar" um formulário, que agora chama saveCharacterLocal
function saveForm() {
    saveCharacterLocal();
}

// Função loadForm para inicialização (agora carrega a ficha localmente)
function loadForm() {
    getLoggedInUser(); // Tenta carregar o usuário logado (para o header)
    loadCharacterLocal(); // Tenta carregar a ficha salva localmente
    updateAttributePointsDisplay(); // Garante que a exibição inicial esteja correta
    updateActionBonusLimits(); // Garante que os limites de bônus estejam corretos
    renderLearnedActionBonuses(); // Garante que a renderização de bônus aprendidos esteja correta
    renderWeapons(); // <--- NOVO: Garante que as armas sejam renderizadas ao carregar o formulário
    document.getElementById("results").style.display = "none"; // Garante que a ficha calculada não apareça vazia inicialmente
}


// =========================================================
// FIM: Variáveis e Funções para Gerenciamento de Ficha Local
// =========================================================


// Função para calcular o total de pontos que o jogador *já distribuiu* acima do valor base de 1
function calculateCurrentDistributedPoints() {
    return Object.values(attributes).reduce((sum, val) => sum + (val - 1), 0);
}

// Função para validar e ajustar o nível, garantindo que não exceda 100
function validateLevelInput() {
    const levelInput = document.getElementById("level");
    let level = parseInt(levelInput.value) || 1;
    if (level > 100) {
        level = 100;
        levelInput.value = 100; // Define o valor do input para 100
    } else if (level < 1) {
        level = 1;
        levelInput.value = 1;
    }
    updateAttributePointsDisplay();
    updateActionBonusLimits();
    renderLearnedActionBonuses(); // Chamar para atualizar os limites dos bônus aprendidos
    updateLevelBar(); // *** ADICIONE ESTA LINHA *** **
}

// Função para atualizar a exibição dos pontos de atributo disponíveis
function updateAttributePointsDisplay() {
    const level = parseInt(document.getElementById("level").value) || 1;
    bonusPointsFromLevel = 0;
    if (level >= 15) {
        bonusPointsFromLevel += 1;
    }
    if (level >= 65) {
        bonusPointsFromLevel += 1;
    }
    if (level >= 99) {
        bonusPointsFromLevel += 1;
    }

    const totalAllowedPoints = initialDistributablePoints + bonusPointsFromLevel + bonusPointsFromClasses;
    const currentDistributedPoints = calculateCurrentDistributedPoints();

    const remainingPoints = totalAllowedPoints - currentDistributedPoints;
    document.getElementById('availableAttributePoints').textContent = remainingPoints;

    // Habilita/desabilita botões +/-
    const attributeNames = ['agi', 'for', 'int', 'set', 'vig'];
    attributeNames.forEach(attr => {
        const valueElement = document.getElementById(`${attr}Value`);
        const plusButton = valueElement.previousElementSibling;
        const minusButton = valueElement.nextElementSibling;
        
        minusButton.disabled = (attributes[attr] <= 1);
        plusButton.disabled = (remainingPoints <= 0);
    });
}

// Função para mudar o valor de um atributo
function changeAttribute(attributeName, change) {
    const currentAttributeValue = attributes[attributeName];
    const totalAllowedPoints = initialDistributablePoints + bonusPointsFromLevel + bonusPointsFromClasses;
    const currentDistributedPoints = calculateCurrentDistributedPoints();
    const remainingPoints = totalAllowedPoints - currentDistributedPoints;

    if (currentAttributeValue + change < 1) {
        return;
    }

    if (change > 0 && remainingPoints <= 0) {
        return;
    }
    
    attributes[attributeName] += change;
    document.getElementById(`${attributeName}Value`).textContent = attributes[attributeName];
    updateAttributePointsDisplay();
}

// Função para verificar se uma classe já está sendo usada no outro slot
function isClassAlreadyUsed(className, currentClassId) {
    if (!className) return false; // Nenhuma classe selecionada não conta como usada

    // CORRIGIDO: appliedClassBonuses.class1 e class2 eram usados incorretamente
    if (currentClassId === 'class1' && appliedClassBonuses.class2.className === className) {
        return true;
    }
    if (currentClassId === 'class2' && appliedClassBonuses.class1.className === className) {
        return true;
    }
    return false;
}

function resetClassBonus(classId) {
    const previousBonus = appliedClassBonuses[classId];
    if (previousBonus.className && previousBonus.attribute) {
        // CORRIGIDO: Ao resetar, devemos tentar decrementar o atributo,
        // mas só se o valor do atributo for maior que 1. Se foi o único +1
        // da classe, ele pode voltar para 1, mas não abaixo disso.
        if (attributes[previousBonus.attribute] > 1) { 
            attributes[previousBonus.attribute]--;
            document.getElementById(`${previousBonus.attribute}Value`).textContent = attributes[previousBonus.attribute];
        } else {
            // Se o atributo já está em 1 e o bônus de classe foi o único a aumentá-lo,
            // e estamos resetando, ele não deve ir abaixo de 1.
            // Para garantir que o contador de pontos distribuídos esteja correto,
            // precisamos assegurar que bonusPointsFromClasses seja decrementado apenas se
            // o bônus realmente foi aplicado e o atributo era > 1 ANTES do decremento
            // ou se o bônus fosse para ser aplicado a um atributo que já estava em 1.
            // A forma mais segura é sempre decrementar bonusPointsFromClasses aqui se havia um bônus.
            console.warn(`Tentativa de decrementar ${previousBonus.attribute} abaixo de 1 ao resetar bônus da classe. Pode ser normal.`);
        }
        bonusPointsFromClasses--; // Sempre decrementa o contador de pontos de classe
        appliedClassBonuses[classId] = { className: '', attribute: '' };

        updateAttributePointsDisplay();
    }
    document.getElementById(`apply${classId.replace('class', 'Class')}Btn`).disabled = false;
    // Re-habilita o botão do outro slot se a classe removida o estava bloqueando
    const otherClassId = classId === 'class1' ? 'class2' : 'class1';
    const otherSelectElement = document.getElementById(otherClassId);
    if (otherSelectElement) {
        // Simula uma mudança para recalcular o estado do botão
        otherSelectElement.dispatchEvent(new Event('change'));
    }
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
        alert(`Você já aplicou um bônus para este slot de classe. Mude a classe selecionada para desfazer o bônus e aplicar um novo.`);
        return;
    }

    // VALIDAÇÃO: Impede classe duplicada
    if (isClassAlreadyUsed(selectedClass, classId)) {
        alert(`A classe "${selectedClass}" já está sendo usada no outro slot de Classe Primitiva.`);
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
        
        attributes[chosenAttribute]++;
        document.getElementById(`${chosenAttribute}Value`).textContent = attributes[chosenAttribute];
        bonusPointsFromClasses++;
        
        appliedClassBonuses[classId] = { className: selectedClass, attribute: chosenAttribute };
        
        alert(`Bônus de +1 em ${chosenAttribute} da classe ${selectedClass} aplicado!`);
        applyButton.disabled = true;

        // Desabilita o botão do outro slot se a classe recém-aplicada estiver nele
        const otherClassId = classId === 'class1' ? 'class2' : 'class1';
        const otherSelectElement = document.getElementById(otherClassId);
        const otherApplyButton = document.getElementById(`apply${otherClassId.replace('class', 'Class')}Btn`);
        // CORRIGIDO: Verifica se a outra classe já tem um bônus aplicado para não sobrescrever o disabled
        if (otherSelectElement.value === selectedClass && selectedClass !== '') {
            otherApplyButton.disabled = true;
        }

        updateAttributePointsDisplay();
    } else {
        alert("Escolha inválida. Por favor, digite o nome exato de um dos atributos sugeridos.");
    }
}

// Adiciona event listener para as classes mudarem
// Isso garante que o botão "Aplicar" do outro slot seja desabilitado/habilitado
// se a classe selecionada nele for a mesma do slot atual.
document.getElementById('class1').addEventListener('change', function() {
    const class2Select = document.getElementById('class2');
    const class2ApplyBtn = document.getElementById('applyClass2Btn');
    // CORRIGIDO: Se a classe selecionada for igual à da class2, desabilita o botão da class2
    // Mas só se a class2 AINDA NÃO tiver um bônus aplicado (para permitir mudança de escolha)
    if (this.value !== '' && class2Select.value === this.value) {
        class2ApplyBtn.disabled = true;
    } else if (!appliedClassBonuses.class2.className) { // Se não houver bônus aplicado na class2, habilita
        class2ApplyBtn.disabled = false;
    }
});

document.getElementById('class2').addEventListener('change', function() {
    const class1Select = document.getElementById('class1');
    const class1ApplyBtn = document.getElementById('applyClass1Btn');
    // CORRIGIDO: Se a classe selecionada for igual à da class1, desabilita o botão da class1
    // Mas só se a class1 AINDA NÃO tiver um bônus aplicado (para permitir mudança de escolha)
    if (this.value !== '' && class1Select.value === this.value) {
        class1ApplyBtn.disabled = true;
    } else if (!appliedClassBonuses.class1.className) { // Se não houver bônus aplicado na class1, habilita
        class1ApplyBtn.disabled = false;
    }
});


document.getElementById('level').addEventListener('input', validateLevelInput);
document.getElementById('level').addEventListener('change', validateLevelInput);
// Adicione estes listeners para garantir que os bônus aprendidos sejam renderizados quando o nível muda
document.getElementById('level').addEventListener('input', renderLearnedActionBonuses);
document.getElementById('level').addEventListener('change', renderLearnedActionBonuses);


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
        maxBonusValue = 20;
    }
    
    document.getElementById('totalActionSlots').textContent = totalSlots;
    document.getElementById('usedActionSlots').textContent = calculateUsedSlots();
    document.getElementById('remainingActionSlots').textContent = totalSlots - calculateUsedSlots();

    // Lógica para o bônus fixo "Criação Tek" (mantido)
    const tekBonusIndex = actionBonuses.findIndex(b => b.action === 'Criação Tek' && b.fixed);
    if (level >= 95 && tekBonusIndex === -1) {
        actionBonuses.push({ action: 'Criação Tek', value: 5, fixed: true, occupiesSlot: false });
    } else if (level < 95 && tekBonusIndex !== -1) {
        actionBonuses.splice(tekBonusIndex, 1);
    }
    
    renderActionBonuses(); 

    document.querySelectorAll('.action-bonus-value-select').forEach(select => {
        const currentValue = parseInt(select.value);
        select.innerHTML = '';

        select.innerHTML += `<option value="5">+5</option>`;
        if (maxBonusValue >= 10) select.innerHTML += `<option value="10">+10</option>`;
        if (maxBonusValue >= 15) select.innerHTML += `<option value="15">+15</option>`;
        if (maxBonusValue >= 20) select.innerHTML += `<option value="20">+20</option>`;

        if (select.querySelector(`option[value="${currentValue}"]`)) {
            select.value = currentValue;
        } else {
            if (currentValue > maxBonusValue) {
                select.value = maxBonusValue;
            } else {
                select.value = 5;
            }
        }
    });
    
    const addActionButton = document.querySelector('button[onclick="addActionBonus()"]');
    addActionButton.disabled = (totalSlots - calculateUsedSlots() <= 0 && totalSlots > 0);
}

function addActionBonus(action = '', value = 5) {
    const level = parseInt(document.getElementById("level").value) || 1;
    let totalSlots = 9;
    if (level >= 30) totalSlots = 12;
    if (level >= 50) totalSlots = 15;
    if (level >= 80) totalSlots = 20;

    if (calculateUsedSlots() + getSlotCost(value) > totalSlots) {
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
    container.innerHTML = '';
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
                <option value="10">+10</option>
                <option value="15">+15</option>
                <option value="20">+20</option>
            </select>
        `;
        container.appendChild(itemDiv);

        const selectElement = itemDiv.querySelector(`#actionValue${index}`);
        if (selectElement) {
            const maxAllowedValue = (parseInt(document.getElementById("level").value) || 1) >= 50 ? 20 : 15;
            if (bonus.value > maxAllowedValue) {
                selectElement.value = maxAllowedValue;
                bonus.value = maxAllowedValue;
            } else {
                selectElement.value = bonus.value;
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

    const originalValue = actionBonuses[index].value;
    const originalCost = getSlotCost(originalValue);
    const newCost = getSlotCost(newValue);

    const level = parseInt(document.getElementById("level").value) || 1;
    let totalSlots = 9;
    if (level >= 30) totalSlots = 12;
    if (level >= 50) totalSlots = 15;
    if (level >= 80) totalSlots = 20;

    if (field === 'value' && actionBonuses[index].occupiesSlot && newCost > originalCost && (calculateUsedSlots() - originalCost + newCost) > totalSlots) {
        alert("Mudar este bônus para este valor excederia o limite de slots!");
        document.getElementById(`actionValue${index}`).value = originalValue;
        return;
    }

    actionBonuses[index][field] = newValue;
    updateActionBonusLimits();
}

// NOVO CÓDIGO PARA BÔNUS DE AÇÕES APRENDIDOS
// Função para adicionar um novo bônus de ação aprendido
function addLearnedActionBonus(action = '', value = 5) {
    learnedActionBonuses.push({ action: action, value: value });
    renderLearnedActionBonuses();
}

// Função para remover um bônus de ação aprendido
function removeLearnedActionBonus(index) {
    learnedActionBonuses.splice(index, 1);
    renderLearnedActionBonuses();
}

// Função para renderizar os bônus de ação aprendidos no formulário
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
                <option value="10">+10</option>
                <option value="15">+15</option>
                <option value="20">+20</option>
            </select>
        `;
        container.appendChild(itemDiv);

        const selectElement = itemDiv.querySelector(`#learnedActionValue${index}`);
        if (selectElement) {
            if (bonus.value > maxBonusValue) {
                selectElement.value = maxBonusValue;
                bonus.value = maxBonusValue;
            } else {
                selectElement.value = bonus.value;
            }
        }
    });
}

// Função para atualizar um bônus de ação aprendido
function updateLearnedActionBonus(index, field, newValue) {
    learnedActionBonuses[index][field] = newValue;
    renderLearnedActionBonuses();
}
// FIM DO NOVO CÓDIGO PARA BÔNUS DE AÇÕES APRENDIDOS


// --- NOVO: Funções CRUD para Armas ---

/**
 * Adiciona uma nova arma vazia ao array de armas.
 * @param {string} name - Nome inicial da arma (opcional).
 * @param {string} damageDice - Dano inicial da arma (ex: '1d6') (opcional).
 * @param {string} condition - Condição inicial da arma (opcional, padrão 'Nula').
 */
function addWeapon(name = '', damageDice = '', condition = 'Nula') {
    weapons.push({ name: name, damageDice: damageDice, condition: condition });
    renderWeapons();
}

/**
 * Remove uma arma do array pelo seu índice.
 * @param {number} index - O índice da arma a ser removida.
 */
function removeWeapon(index) {
    if (confirm("Tem certeza que deseja remover esta arma?")) {
        weapons.splice(index, 1);
        renderWeapons();
    }
}

/**
 * Atualiza um campo específico de uma arma no array.
 * @param {number} index - O índice da arma a ser atualizada.
 * @param {string} field - O campo a ser atualizado ('name', 'damageDice', 'condition').
 * @param {*} value - O novo valor para o campo.
 */
function updateWeapon(index, field, value) {
    if (weapons[index]) {
        weapons[index][field] = value;
    }
}

/**
 * Renderiza todas as armas no container HTML.
 * CORRIGIDO: Estrutura HTML para melhor layout do botão X.
 */
function renderWeapons() {
    const container = document.getElementById('weaponsContainer');
    if (!container) return; // Garante que o container existe

    container.innerHTML = ''; // Limpa o conteúdo atual

    weapons.forEach((weapon, index) => {
        const weaponDiv = document.createElement('div');
        weaponDiv.classList.add('weapon-item'); // Adicione uma classe para estilização

        // Cria as opções do select de condições
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
    // 1. Obter valores dos inputs estáticos (do HTML)
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const level = parseInt(document.getElementById("level").value) || 1;
    const photoSrc = document.getElementById("preview").src;
    const lore = document.getElementById("lore").value;
    const mutation = document.getElementById("mutation").value;
    const class1 = document.getElementById("class1").value;
    const class2 = document.getElementById("class2").value; // Classe 2 agora é sempre lida
    const combatClass = document.getElementById("combatClass").value;
    const inventory = document.getElementById("inventory").value;

    // Use os objetos globais 'attributes', 'actionBonuses' e 'learnedActionBonuses'
    // que são atualizados por outras funções no script. NÃO RE-DECLARAR COM const aqui.

    // Cálculos conforme as regras
    let vida = 55 + (attributes.vig * 15);
    let determinacaoSanidade = 55 + (attributes.int * 10) + (attributes.set * 15);
    let resistencia = 15 + (attributes.vig * 5);
    let folego = 4 + (attributes.vig * 1);
    let armadura = 5; // Valor fixo inicial

    // Lógica para adicionar armadura por nível:
    if (level >= 15) {
        armadura += 1;
    }
    if (level >= 30) {
        armadura += 1;
    }


    // Geração da lista de Bônus em Ações (com a classe attribute-value no valor)
    let bonusAcoesHtml = '';
    // Use a variável global actionBonuses
    if (actionBonuses.length > 0) {
        bonusAcoesHtml = `<ul class="stats-list">`;
        actionBonuses.forEach(bonus => {
            // Certifique-se de que o valor é tratado como número e prefixado com '+'
            bonusAcoesHtml += `<li><strong class="sub-category-title">${bonus.action}</strong>: <span class="attribute-value">+${bonus.value} em ações</span></li>`;
        });
        bonusAcoesHtml += `</ul>`;
    } else {
        bonusAcoesHtml = '<p class="no-info">Nenhum bônus de ação registrado.</p>';
    }
    
    // Geração da lista de Bônus de Ações Aprendidos (com a classe attribute-value no valor)
    let learnedBonusAcoesHtml = '';
    // Use a variável global learnedActionBonuses
    if (learnedActionBonuses.length > 0) {
        learnedBonusAcoesHtml = `<ul class="stats-list">`;
        learnedActionBonuses.forEach(bonus => {
            // Certifique-se de que o valor é tratado como número e prefixado com '+'
            learnedBonusAcoesHtml += `<li><strong class="sub-category-title">${bonus.action}</strong>: <span class="attribute-value">+${bonus.value} em ações (Aprendido)</span></li>`;
        });
        learnedBonusAcoesHtml += `</ul>`;
    } else {
        learnedBonusAcoesHtml = '<p class="no-info">Nenhum bônus de ação aprendido registrado.</p>';
    }

    // --- NOVO: Geração da lista de Armas ---
    let weaponsHtml = '';
    if (weapons.length > 0) {
        weaponsHtml = `<ul class="stats-list weapon-list">`;
        weapons.forEach(weapon => {
            weaponsHtml += `<li><strong class="sub-category-title">${weapon.name || '<span class="no-info">Arma sem nome</span>'}</strong>: <span class="attribute-value">${weapon.damageDice || '<span class="no-info">Dano não especificado</span>'}</span>`;
            if (weapon.condition && weapon.condition !== 'Nula') {
                weaponsHtml += `<span class="attribute-value">${weapon.condition}</span>`;
            }
            weaponsHtml += `</li>`;
        });
        weaponsHtml += `</ul>`;
    } else {
        weaponsHtml = '<p class="no-info">Nenhuma arma registrada.</p>';
    }


    // Listas de recompensas por nível
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
        vida += 30;
        levelRewardsList.push(`+30 de Vida (já adicionado ao total)`);
        levelRewardsList.push(`Mais slots para Bônus de Ação (Total de 15 slots) e possibilidade de bônus até +20`);
        inventoryRewardsList.push('Convite da Linhagem de Athenas');
        inventoryRewardsList.push('1 Presente de Evento Global');
    }

    if (level >= 65) {
        determinacaoSanidade += 20;
        levelRewardsList.push(`+20 de Sanidade (já adicionado ao total de Determinação/Sanidade)`);
        levelRewardsList.push(`+1 Ponto de Atributo adicional (já contabilizado na ficha)`);
        mutationRewardsList.push(`+1 Parte de Mutação (Revivendo Memória)`);
    }

    if (level >= 80) {
        armadura += 10;
        levelRewardsList.push(`+10 Armadura padrão (já adicionado ao total)`);
        levelRewardsList.push(`Mais slots para Bônus de Ação (Total de 20 slots)`);
        inventoryRewardsList.push('1 Ritual Normal');
        inventoryRewardsList.push('1 Subida de Patente');
    }

    if (level >= 95) {
        vida += 20;
        determinacaoSanidade += 20;
        mutationRewardsList.push(`+1 Parte de Mutação (Conversa com o Infinito)`);
        inventoryRewardsList.push('Convite da Linhagem de Athenas');
    }
    
    if (level >= 99) {
        armadura += 10;
        levelRewardsList.push(`+10 Armadura padrão (já adicionado ao total)`); 
        levelRewardsList.push(`+1 Ponto de Atributo adicional (já contabilizado na ficha)`);
        mutationRewardsList.push(`+1 Parte de Mutação (Último Incentivo Pessoal)`);
        levelRewardsList.push(`Título: "Sobrevivente"`);
    }


    // Construir o HTML para exibir as estatísticas
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
            <h4 class="section-title">Inventário e Armas</h4> <p class="stats-item"><strong class="sub-category-title">Itens Atuais</strong>:<br><span class="attribute-value formatted-text">${inventory ? inventory.replace(/\n/g, '<br>') : '<span class="no-info">Nenhum item registrado.</span>'}</span></p>
            ${inventoryRewardsList.length > 0 ? `<div class="stats-item"><strong class="sub-category-title">Recompensas Adicionais no Inventário por Nível</strong>: <ul class="stats-list">${inventoryRewardsList.map(item => `<li><span class="attribute-value">${item}</span></li>`).join('')}</ul></div>` : ''}

            <h4 class="sub-section-title"></h4> ${weaponsHtml} </div>
        
        ${levelRewardsList.length > 0 ? `<div class="ficha-section"><h4 class="section-title">Recompensas Gerais por Nível</h4><ul class="stats-list">${levelRewardsList.map(item => `<li><span class="attribute-value">${item}</span></li>`).join('')}</ul></div>` : ''}
    `;

    document.getElementById("stats").innerHTML = statsHtml;
    document.getElementById("results").style.display = "block";
    document.getElementById("results").scrollIntoView({ behavior: 'smooth' });
}

// Função para copiar o texto da ficha
function copyFicha() {
    const statsDiv = document.getElementById("stats");
    if (!statsDiv) {
        alert("A ficha calculada não está disponível para cópia.");
        return;
    }

    // Clonar o elemento para evitar modificações no DOM visível
    const tempDiv = statsDiv.cloneNode(true);

    // --- NOVO: Remover a imagem se existir no clone ---
    const photoDisplay = tempDiv.querySelector('.photo-display');
    if (photoDisplay) {
        photoDisplay.remove();
    }

    let fichaText = '=== FICHA DE PERSONAGEM ===\n\n'; // Título principal para a ficha copiada

    // Iterar sobre as seções e seus conteúdos para organizar a cópia
    tempDiv.querySelectorAll('.ficha-section').forEach(section => {
        const sectionTitleElement = section.querySelector('.section-title');
        if (sectionTitleElement) {
            fichaText += `=== ${sectionTitleElement.textContent.trim()} ===\n\n`;
        }

        // Adiciona subtítulos específicos como "Armas"
        section.querySelectorAll('.sub-section-title').forEach(subTitleElement => {
            fichaText += `-- ${subTitleElement.textContent.trim()} --\n\n`;
        });


        section.querySelectorAll('.stats-item').forEach(item => {
            const strongElement = item.querySelector('strong');
            let label = strongElement ? strongElement.textContent.trim().replace(/:$/, '') : '';
            let value = item.textContent.replace(strongElement ? strongElement.textContent : '', '').trim();

            // Ajustar quebras de linha em campos como Lore, Mutação e Inventário
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
            fichaText += '\n'; // Adiciona uma linha extra após cada lista
        });
        fichaText += '\n'; // Adiciona uma linha extra após cada seção
    });

    // Remover espaços extras e linhas em branco consecutivas
    fichaText = fichaText.replace(/(\n\s*){2,}/g, '\n\n').trim();

    // Copiar para a área de transferência
    navigator.clipboard.writeText(fichaText)
        .then(() => {
            alert("Ficha copiada para a área de transferência!");
        })
        .catch(err => {
            console.error('Erro ao copiar a ficha: ', err);
            alert("Erro ao copiar a ficha. Por favor, tente novamente ou copie manualmente.");
        });
}


window.onload = loadForm; // Esta linha chama a nova loadForm, que inicializa o estado de login e a ficha local.

document.addEventListener('DOMContentLoaded', () => {
    loadForm(); // Garante que loadForm é chamado uma vez no DOMContentLoaded
});


// ========================
// Código de dados e menu (não alterado, apenas para contexto)
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

if (openMenuButton && menu && closeMenuButton) { // Verifique se os elementos existem
    openMenuButton.addEventListener('click', () => {
        menu.classList.remove('hidden');
    });

    closeMenuButton.addEventListener('click', () => {
        menu.classList.add('hidden');
    });
}


if (rollDiceButton) { // Verifique se o botão de rolar dado existe
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

if (clearRollsButton) { // Verifique se o botão de limpar rolagens existe
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
    if (footer) { // Verifique se o footer existe
        if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
            footer.style.background = "linear-gradient(45deg, #1a1a1a, #1a1a1a, #000, #000,#1a1a1a, #1a1a1a)";
        } else {
            footer.style.background = "linear-gradient(45deg, #1a1a1a, #000)";
        }
    }
});

// Toggle para o menu no celular
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) { // Verifique se os elementos existem
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
}

// --- NOVO: Função para atualizar a barra de nível visualmente ---
function updateLevelBar() {
    // Pega o valor do nível do input existente
    const levelInput = document.getElementById("level");
    const level = parseInt(levelInput.value) || 1; // Garante que seja um número, padrão 1

    // Pega o elemento da barra de preenchimento que você adicionou no HTML
    const levelBarFill = document.getElementById("levelBarFill");

    // Calcula a porcentagem de preenchimento (nível atual / nível máximo (100) * 100%)
    // Math.max/min garantem que a porcentagem fique entre 0 e 100
    const percentage = Math.max(0, Math.min(100, level)); 
    
    // Aplica a largura calculada ao estilo da barra de preenchimento
    if (levelBarFill) { // Verifica se o elemento existe antes de tentar manipulá-lo
        levelBarFill.style.width = percentage + '%';
    }
}

// O event listener DOMContentLoaded já está presente no final do arquivo,
// garantindo que as funções de renderização de armas, bônus e o loadForm sejam chamados.

// --- NOVO: Objeto para armazenar as armas (lista de objetos {name: '', damageDice: '', condition: ''}) ---
// Esta declaração já estava na primeira parte que você enviou.
// Apenas para garantir que não haja duplicação, ela deve estar apenas UMA VEZ no seu código final.
// let weapons = []; 

// --- NOVO: Lista de condições pré-definidas ---
// Esta declaração já estava na primeira parte que você enviou.
// Apenas para garantir que não haja duplicação, ela deve estar apenas UMA VEZ no seu código final.
/*
const predefinedConditions = [
    "Nula", // Opção padrão para nenhuma condição
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
*/

// Carrega a ficha salva no localStorage ao iniciar
// Este event listener já estava na primeira parte que você enviou, mas com a adição da renderização de armas.
// Para garantir que ele seja o único, o `renderWeapons()` já foi incluído na primeira parte.
/*
document.addEventListener('DOMContentLoaded', () => {
    loadCharacterLocal();
    renderActionBonuses();
    renderLearnedActionBonuses();
    renderWeapons(); // <--- NOVO: Garante que as armas sejam renderizadas
});
*/