// =========================================================
// SEÇÃO 1: Variáveis Globais e Constantes
// =========================================================

// Objeto para armazenar os valores dos atributos principais do personagem
const attributes = {
    agi: 1, // Agilidade
    for: 1, // Força
    int: 1, // Inteligência
    set: 1, // Sete (atributo místico/conexão)
    vig: 1  // Vigor
};

// Array para armazenar bônus de ação temporários ou fixos
// Cada item é um objeto: {action: 'Nome da Ação', value: 5, fixed: false, occupiesSlot: true}
let actionBonuses = [];

// Array para armazenar bônus de ação aprendidos (permanentes)
// Cada item é um objeto: {action: 'Nome da Ação', value: 5}
let learnedActionBonuses = [];

// Array para armazenar informações sobre as armas do personagem
// Cada item é um objeto: {name: 'Nome da Arma', damageDice: 'XdY', condition: 'Condição'}
let weapons = [];

// Array (NOVO) para rituais/pactos da fic
let characterRituals = []; 

// Lista pré-definida de condições que podem ser aplicadas às armas
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

// Pontos de atributo disponíveis para o jogador distribuir no início
let initialDistributablePoints = 5;
// Pontos de atributo bônus ganhos por alcançar certos níveis
let bonusPointsFromLevel = 0;
// Total de pontos de atributo bônus ganhos por aplicar bônus de classe
let bonusPointsFromClasses = 0; 

// Objeto para controlar os bônus de atributo que já foram aplicados por cada classe
const appliedClassBonuses = {
    class1: { className: '', attribute: '' }, // Armazena a classe e o atributo bônus da Classe Primitiva 1
    class2: { className: '', attribute: '' }  // Armazena a classe e o atributo bônus da Classe Primitiva 2
};

// Mapeamento de classes para os atributos que elas podem bonificar
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
// SEÇÃO 2: Gerenciamento de Ficha Local (LocalStorage)
// =========================================================

// Variável para simular o usuário logado (usado apenas para fins de exibição no site)
let currentUser = null; 
// Chave única para salvar os dados da ficha no LocalStorage do navegador
const LOCAL_CHARACTER_STORAGE_KEY = 'localCharacterData';

/**
 * Simula o login de um usuário.
 * O sistema de login foi simplificado e agora só gerencia a exibição do usuário
 * e redirecionamento, não o salvamento da ficha.
 * @param {string} username - O nome de usuário a ser logado.
 */
function loginUser(username) {
    if (!username) {
        alert("Por favor, digite um nome de usuário.");
        return;
    }
    currentUser = username.toLowerCase();
    localStorage.setItem('loggedInUser', currentUser); // Salva o usuário logado no LocalStorage
    console.log(`Usuário logado: ${currentUser}`);
    alert(`Bem-vindo, ${username}!`);
    updateLoginDisplay(); // Atualiza a interface do usuário para mostrar o status de login
    resetForm(); // Limpa o formulário, permitindo que o usuário comece uma nova ficha
    
    // Redireciona para a página inicial após o login
    window.location.href = '../index.html'; 
}

/**
 * Simula o logout do usuário.
 * Remove o usuário logado do LocalStorage e atualiza a interface.
 */
function logoutUser() {
    if (confirm("Tem certeza que deseja sair?")) {
        currentUser = null;
        localStorage.removeItem('loggedInUser'); // Remove o usuário logado do LocalStorage
        console.log("Usuário deslogado.");
        alert("Você foi desconectado.");
        updateLoginDisplay(); // Atualiza a interface do usuário
        // A ficha local não é resetada no logout, pois é independente do login.
    }
}

/**
 * Verifica se há um usuário logado no LocalStorage ao carregar a página.
 * Utilizado para manter o status de login no cabeçalho/menu.
 */
function getLoggedInUser() {
    currentUser = localStorage.getItem('loggedInUser');
    if (currentUser) {
        updateLoginDisplay(); // Atualiza a interface se um usuário for encontrado
    }
}

/**
 * Atualiza a exibição do status de login na interface do usuário (UI).
 * Mostra o nome do usuário logado ou os campos para login/registro.
 */
function updateLoginDisplay() {
    const loginStatusDiv = document.getElementById('loginStatus');
    if (loginStatusDiv) {
        if (currentUser) {
            // Se houver um usuário logado, exibe o nome e um botão de logout
            loginStatusDiv.innerHTML = `Logado como: <strong>${currentUser}</strong> <button onclick="logoutUser()" class="logout-btn">Sair</button>`;
        } else {
            // Se não houver usuário logado, exibe os campos de entrada para login
            loginStatusDiv.innerHTML = `
                <input type="text" id="usernameInput" placeholder="Nome de usuário">
                <button onclick="loginUser(document.getElementById('usernameInput').value)" class="login-btn">Entrar</button>
            `;
        }
    }
}

/**
 * Salva os dados completos da ficha do personagem no LocalStorage do navegador.
 * A ficha é salva como um objeto JSON sob uma chave única.
 */
function saveCharacterLocal() {
    console.log("Tentativa de salvar ficha localmente.");

    const characterNameInput = document.getElementById("characterNameInput");
    let characterName = characterNameInput ? characterNameInput.value.trim() : '';

    // Solicita um nome para a ficha se não houver um preenchido
    if (!characterName) {
        characterName = prompt("Por favor, dê um nome para esta ficha antes de salvar:");
        if (!characterName) {
            alert("Salvamento cancelado. O nome da ficha é obrigatório.");
            console.warn("Salvamento cancelado: Nome da ficha não fornecido.");
            return;
        }
        if (characterNameInput) characterNameInput.value = characterName; // Atualiza o input se existir
    }
    
    // Coleta todos os dados relevantes do formulário e dos objetos globais
    const characterData = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        level: document.getElementById("level").value,
        photo: document.getElementById("preview").src,
        lore: document.getElementById("lore").value,
        attributes: { ...attributes }, // Copia o objeto global 'attributes'
        mutation: document.getElementById("mutation").value,
        class1: document.getElementById("class1").value,
        class2: document.getElementById("class2").value, 
        combatClass: document.getElementById("combatClass").value,
        inventory: document.getElementById("inventory").value,
        actionBonuses: [...actionBonuses], // Copia o array global 'actionBonuses'
        learnedActionBonuses: [...learnedActionBonuses], // Copia o array global 'learnedActionBonuses'
        weapons: [...weapons], // Salva o array de armas
        appliedClassBonuses: { // Copia o objeto global 'appliedClassBonuses'
            class1: { ...appliedClassBonuses.class1 },
            class2: { ...appliedClassBonuses.class2 }
        },
        savedName: characterName, // Nome da ficha para exibição no input
        savedLevel: parseInt(document.getElementById("level").value) || 1
    };
    console.log("Dados da ficha a serem salvos localmente:", characterData);

    // Converte o objeto de dados para uma string JSON e salva no LocalStorage
    localStorage.setItem(LOCAL_CHARACTER_STORAGE_KEY, JSON.stringify(characterData));
    alert(`Ficha "${characterName}" salva localmente com sucesso!`);
}

/**
 * Carrega a última ficha salva localmente do LocalStorage e preenche o formulário.
 */
function loadCharacterLocal() {
    // Tenta obter os dados da ficha do LocalStorage
    const data = JSON.parse(localStorage.getItem(LOCAL_CHARACTER_STORAGE_KEY) || 'null');

    if (!data) {
        console.log("Nenhuma ficha salva localmente encontrada. Iniciando com formulário limpo.");
        resetForm(); // Limpa o formulário se não houver dados salvos
        return;
    }

    console.log("Carregando ficha localmente:", data);

    // Preenche os campos do formulário com os dados carregados
    document.getElementById("name").value = data.name || '';
    document.getElementById("age").value = data.age || '';
    document.getElementById("level").value = data.level || '1';
    document.getElementById("lore").value = data.lore || '';
    document.getElementById("mutation").value = data.mutation || '';

    // Carrega e atualiza os valores dos atributos
    for (const key in data.attributes) {
        if (attributes.hasOwnProperty(key)) {
            attributes[key] = data.attributes[key];
            document.getElementById(`${key}Value`).textContent = attributes[key];
        }
    }

    // Define os valores das classes
    document.getElementById("class1").value = data.class1 || '';
    document.getElementById("class2").value = data.class2 || '';
    
    // Carrega e recalcula os bônus de classe aplicados
    bonusPointsFromClasses = 0; // Reseta antes de carregar
    appliedClassBonuses.class1 = { className: '', attribute: '' };
    appliedClassBonuses.class2 = { className: '', attribute: '' };

    if (data.appliedClassBonuses) {
        // Usa Object.assign para copiar as propriedades mantendo a referência do objeto principal
        Object.assign(appliedClassBonuses.class1, data.appliedClassBonuses.class1);
        Object.assign(appliedClassBonuses.class2, data.appliedClassBonuses.class2);

        // Recalcula bonusPointsFromClasses com base no que foi carregado
        if (appliedClassBonuses.class1.className && appliedClassBonuses.class1.attribute) bonusPointsFromClasses++;
        if (appliedClassBonuses.class2.className && appliedClassBonuses.class2.attribute) bonusPointsFromClasses++;
    }

    // Atualiza o estado dos botões "Aplicar Bônus" para refletir os bônus carregados
    document.getElementById('applyClass1Btn').disabled = !!appliedClassBonuses.class1.className;
    document.getElementById('applyClass2Btn').disabled = !!appliedClassBonuses.class2.className;
    
    // Dispara eventos 'change' para que a lógica de desabilitar/habilitar botões de classe funcione
    // Isto é crucial para que a validação de classe duplicada funcione ao carregar
    document.getElementById("class1").dispatchEvent(new Event('change'));
    document.getElementById("class2").dispatchEvent(new Event('change'));

    document.getElementById("combatClass").value = data.combatClass || '';
    document.getElementById("inventory").value = data.inventory || '';

    // Carrega a foto do personagem
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
        // Garante que 'occupiesSlot' seja definido, caso não estivesse presente na versão salva antiga
        occupiesSlot: bonus.occupiesSlot !== undefined ? bonus.occupiesSlot : !bonus.fixed
    }));
    renderActionBonuses(); // Renderiza os bônus de ação na UI

    learnedActionBonuses = data.learnedActionBonuses || [];
    renderLearnedActionBonuses(); // Renderiza os bônus de ação aprendidos na UI

    // Carrega e renderiza as armas
    weapons = data.weapons || [];
    renderWeapons(); 

    // Define o nome da ficha no input de nome da ficha
    const characterNameInput = document.getElementById("characterNameInput");
    if (characterNameInput) {
        characterNameInput.value = data.savedName || '';
    }

    // Chama funções de atualização após carregar todos os dados
    validateLevelInput(); // Recalcula pontos de atributo e limites de bônus com base no nível
    calculateStats(); // Recalcula e exibe a ficha completa
    updateLevelBar(); // Atualiza a barra visual do nível

    alert(`Ficha "${data.savedName || 'Sem Nome'}" carregada automaticamente!`);
    document.getElementById("results").scrollIntoView({ behavior: 'smooth' }); // Rola para os resultados
}

/**
 * Reseta o formulário para uma nova ficha, limpando todos os campos e estados.
 */
function resetForm() {
    document.getElementById("characterForm").reset(); // Limpa a maioria dos inputs do formulário

    // Esconde e limpa a imagem de pré-visualização
    const preview = document.getElementById("preview");
    preview.style.display = "none";
    preview.src = "#";

    // Reseta todos os atributos para o valor base de 1 e atualiza a exibição
    for (const key in attributes) {
        attributes[key] = 1;
        document.getElementById(`${key}Value`).textContent = attributes[key];
    }
    
    // Reseta os bônus de classe aplicados e re-habilita os botões de aplicação
    bonusPointsFromClasses = 0;
    appliedClassBonuses.class1 = { className: '', attribute: '' };
    appliedClassBonuses.class2 = { className: '', attribute: '' };
    document.getElementById('applyClass1Btn').disabled = false;
    document.getElementById('applyClass2Btn').disabled = false;
    document.getElementById('class1').value = ''; // Limpa as classes selecionadas
    document.getElementById('class2').value = '';
    // Dispara eventos 'change' para garantir que os botões de classe do outro slot sejam atualizados
    document.getElementById('class1').dispatchEvent(new Event('change'));
    document.getElementById('class2').dispatchEvent(new Event('change'));

    // Reseta os arrays de bônus de ação e armas, e re-renderiza-os
    actionBonuses = [];
    renderActionBonuses();
    learnedActionBonuses = [];
    renderLearnedActionBonuses();
    weapons = [];
    renderWeapons();

    // Limpa o input de nome da ficha
    const characterNameInput = document.getElementById("characterNameInput");
    if (characterNameInput) characterNameInput.value = '';

    // Define o nível para 1 e atualiza as exibições dependentes
    document.getElementById("level").value = '1'; 
    validateLevelInput(); // Atualiza pontos de atributo e limites de bônus
    
    document.getElementById("results").style.display = "none"; // Esconde a ficha calculada
    alert("Formulário limpo para uma nova ficha.");

    // Remove a ficha salva localmente para permitir o início de uma nova ficha
    localStorage.removeItem(LOCAL_CHARACTER_STORAGE_KEY);
}

/**
 * Função de conveniência para "salvar" o formulário, que agora chama `saveCharacterLocal`.
 */
function saveForm() {
    saveCharacterLocal();
}

/**
 * Função de inicialização chamada ao carregar a página.
 * Tenta carregar o usuário logado e a ficha salva localmente.
 */
function loadForm() {
    getLoggedInUser(); // Tenta carregar o usuário logado (para o header)
    loadCharacterLocal(); // Tenta carregar a ficha salva localmente
    updateAttributePointsDisplay(); // Garante que a exibição de pontos de atributo esteja correta
    updateActionBonusLimits(); // Garante que os limites de bônus de ação estejam corretos
    renderLearnedActionBonuses(); // Garante que a renderização de bônus aprendidos esteja correta
    renderWeapons(); // Garante que as armas sejam renderizadas ao carregar o formulário
    document.getElementById("results").style.display = "none"; // Garante que a ficha calculada não apareça vazia inicialmente
}

// =========================================================
// SEÇÃO 3: Lógica de Atributos e Níveis
// =========================================================

/**
 * Calcula o total de pontos de atributo que o jogador já distribuiu acima do valor base de 1.
 * @returns {number} O número total de pontos distribuídos.
 */
function calculateCurrentDistributedPoints() {
    return Object.values(attributes).reduce((sum, val) => sum + (val - 1), 0);
}

/**
 * Valida e ajusta o valor do nível do personagem, garantindo que ele não exceda 100 ou seja menor que 1.
 * Também atualiza as exibições dependentes do nível.
 */
function validateLevelInput() {
    const levelInput = document.getElementById("level");
    let level = parseInt(levelInput.value) || 1; // Pega o valor do input, padrão 1

    // Limita o nível entre 1 e 100
    if (level > 100) {
        level = 100;
        levelInput.value = 100;
    } else if (level < 1) {
        level = 1;
        levelInput.value = 1;
    }
    // Atualiza as exibições com base no novo nível
    updateAttributePointsDisplay();
    updateActionBonusLimits();
    renderLearnedActionBonuses(); 
    updateLevelBar(); 
}

/**
 * Atualiza a exibição dos pontos de atributo disponíveis para distribuição.
 * Calcula os pontos totais permitidos e os pontos restantes.
 */
function updateAttributePointsDisplay() {
    const level = parseInt(document.getElementById("level").value) || 1;
    bonusPointsFromLevel = 0; // Reseta os pontos de nível

    // Adiciona pontos de atributo bônus com base no nível
    if (level >= 15) {
        bonusPointsFromLevel += 1;
    }
    if (level >= 65) {
        bonusPointsFromLevel += 1;
    }
    if (level >= 99) {
        bonusPointsFromLevel += 1;
    }

    // Calcula o total de pontos permitidos e os pontos restantes
    const totalAllowedPoints = initialDistributablePoints + bonusPointsFromLevel + bonusPointsFromClasses;
    const currentDistributedPoints = calculateCurrentDistributedPoints();
    const remainingPoints = totalAllowedPoints - currentDistributedPoints;

    document.getElementById('availableAttributePoints').textContent = remainingPoints;

    // Habilita/desabilita os botões de +/- para os atributos com base nos pontos restantes e valor mínimo
    const attributeNames = ['agi', 'for', 'int', 'set', 'vig'];
    attributeNames.forEach(attr => {
        const valueElement = document.getElementById(`${attr}Value`);
        const plusButton = valueElement.previousElementSibling; // Botão de incremento
        const minusButton = valueElement.nextElementSibling;    // Botão de decremento
        
        minusButton.disabled = (attributes[attr] <= 1); // Não pode ir abaixo de 1
        plusButton.disabled = (remainingPoints <= 0);  // Não pode adicionar se não houver pontos restantes
    });
}

/**
 * Altera o valor de um atributo específico.
 * Garante que o atributo não caia abaixo de 1 e respeite o limite de pontos disponíveis.
 * @param {string} attributeName - O nome do atributo a ser alterado (ex: 'agi').
 * @param {number} change - O valor a ser adicionado ou subtraído (ex: 1 ou -1).
 */
function changeAttribute(attributeName, change) {
    const currentAttributeValue = attributes[attributeName];
    const totalAllowedPoints = initialDistributablePoints + bonusPointsFromLevel + bonusPointsFromClasses;
    const currentDistributedPoints = calculateCurrentDistributedPoints();
    const remainingPoints = totalAllowedPoints - currentDistributedPoints;

    // Impede que o atributo caia abaixo de 1
    if (currentAttributeValue + change < 1) {
        return;
    }

    // Impede adicionar pontos se não houver pontos restantes
    if (change > 0 && remainingPoints <= 0) {
        return;
    }
    
    attributes[attributeName] += change; // Atualiza o valor do atributo
    document.getElementById(`${attributeName}Value`).textContent = attributes[attributeName]; // Atualiza a exibição na UI
    updateAttributePointsDisplay(); // Recalcula e atualiza a exibição de pontos disponíveis
}

// =========================================================
// SEÇÃO 4: Lógica de Classes e Bônus
// =========================================================

/**
 * Verifica se uma classe já está selecionada no outro slot de classe primitiva.
 * @param {string} className - O nome da classe a ser verificada.
 * @param {string} currentClassId - O ID do slot de classe atual ('class1' ou 'class2').
 * @returns {boolean} True se a classe já estiver em uso no outro slot, false caso contrário.
 */
function isClassAlreadyUsed(className, currentClassId) {
    if (!className) return false; // Nenhuma classe selecionada não conta como usada

    if (currentClassId === 'class1' && appliedClassBonuses.class2.className === className) {
        return true;
    }
    if (currentClassId === 'class2' && appliedClassBonuses.class1.className === className) {
        return true;
    }
    return false;
}

/**
 * Reseta o bônus de atributo aplicado por uma classe específica.
 * Decrementa o atributo bonificado e os pontos de bônus de classe.
 * @param {string} classId - O ID do slot de classe ('class1' ou 'class2').
 */
function resetClassBonus(classId) {
    const previousBonus = appliedClassBonuses[classId];
    if (previousBonus.className && previousBonus.attribute) {
        // Decrementa o atributo, mas garante que não caia abaixo de 1
        if (attributes[previousBonus.attribute] > 1) { 
            attributes[previousBonus.attribute]--;
            document.getElementById(`${previousBonus.attribute}Value`).textContent = attributes[previousBonus.attribute];
        } else {
            console.warn(`Tentativa de decrementar ${previousBonus.attribute} abaixo de 1 ao resetar bônus da classe. Pode ser normal.`);
        }
        bonusPointsFromClasses--; // Decrementa o contador de pontos de classe
        appliedClassBonuses[classId] = { className: '', attribute: '' }; // Limpa o registro do bônus aplicado

        updateAttributePointsDisplay(); // Atualiza a exibição de pontos de atributo
    }
    // Re-habilita o botão "Aplicar Bônus" para o slot atual
    document.getElementById(`apply${classId.replace('class', 'Class')}Btn`).disabled = false;
    // Re-habilita o botão do outro slot se a classe removida o estava bloqueando
    const otherClassId = classId === 'class1' ? 'class2' : 'class1';
    const otherSelectElement = document.getElementById(otherClassId);
    if (otherSelectElement) {
        otherSelectElement.dispatchEvent(new Event('change')); // Simula uma mudança para recalcular o estado do botão
    }
}

/**
 * Aplica um bônus de atributo a partir de uma classe selecionada.
 * Permite ao jogador escolher um dos atributos mapeados para a classe.
 * @param {string} classId - O ID do slot de classe ('class1' ou 'class2').
 */
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

    // VALIDAÇÃO: Impede seleção de classe duplicada
    if (isClassAlreadyUsed(selectedClass, classId)) {
        alert(`A classe "${selectedClass}" já está sendo usada no outro slot de Classe Primitiva.`);
        return;
    }

    const mappedAttributes = attributeMappings[selectedClass];
    if (!mappedAttributes) {
        alert("Classe selecionada não possui bônus de atributo definidos.");
        return;
    }

    // Solicita ao usuário qual atributo aumentar
    const choice = prompt(`Para a classe ${selectedClass}, qual atributo você deseja aumentar: ${mappedAttributes[0]} ou ${mappedAttributes[1]}? (Digite o nome do atributo, ex: ${mappedAttributes[0]})`);

    if (choice && mappedAttributes.includes(choice.toLowerCase())) {
        const chosenAttribute = choice.toLowerCase();
        
        attributes[chosenAttribute]++; // Incrementa o atributo escolhido
        document.getElementById(`${chosenAttribute}Value`).textContent = attributes[chosenAttribute]; // Atualiza a exibição
        bonusPointsFromClasses++; // Incrementa o contador de pontos de bônus de classe
        
        // Registra o bônus aplicado
        appliedClassBonuses[classId] = { className: selectedClass, attribute: chosenAttribute };
        
        alert(`Bônus de +1 em ${chosenAttribute} da classe ${selectedClass} aplicado!`);
        applyButton.disabled = true; // Desabilita o botão de aplicar para este slot

        // Desabilita o botão do outro slot se a classe recém-aplicada estiver nele
        const otherClassId = classId === 'class1' ? 'class2' : 'class1';
        const otherSelectElement = document.getElementById(otherClassId);
        const otherApplyButton = document.getElementById(`apply${otherClassId.replace('class', 'Class')}Btn`);
        // Verifica se a outra classe selecionada é a mesma e ainda não tem um bônus aplicado
        if (otherSelectElement.value === selectedClass && selectedClass !== '' && !appliedClassBonuses[otherClassId].className) {
            otherApplyButton.disabled = true;
        }

        updateAttributePointsDisplay(); // Atualiza a exibição de pontos de atributo disponíveis
    } else {
        alert("Escolha inválida. Por favor, digite o nome exato de um dos atributos sugeridos.");
    }
}

// Listeners para os seletores de classe para validar classes duplicadas e atualizar botões
document.getElementById('class1').addEventListener('change', function() {
    const class2Select = document.getElementById('class2');
    const class2ApplyBtn = document.getElementById('applyClass2Btn');
    // Se a classe selecionada for igual à da class2, desabilita o botão da class2 (a menos que já tenha bônus aplicado)
    if (this.value !== '' && class2Select.value === this.value) {
        class2ApplyBtn.disabled = true;
    } else if (!appliedClassBonuses.class2.className) { // Se não houver bônus aplicado na class2, habilita
        class2ApplyBtn.disabled = false;
    }
});

document.getElementById('class2').addEventListener('change', function() {
    const class1Select = document.getElementById('class1');
    const class1ApplyBtn = document.getElementById('applyClass1Btn');
    // Se a classe selecionada for igual à da class1, desabilita o botão da class1 (a menos que já tenha bônus aplicado)
    if (this.value !== '' && class1Select.value === this.value) {
        class1ApplyBtn.disabled = true;
    } else if (!appliedClassBonuses.class1.className) { // Se não houver bônus aplicado na class1, habilita
        class1ApplyBtn.disabled = false;
    }
});

// =========================================================
// SEÇÃO 5: Lógica de Bônus de Ação (Comuns e Aprendidos)
// =========================================================

// Adiciona listeners para garantir que a exibição de pontos e limites seja atualizada com o nível
document.getElementById('level').addEventListener('input', validateLevelInput);
document.getElementById('level').addEventListener('change', validateLevelInput);
document.getElementById('level').addEventListener('input', renderLearnedActionBonuses);
document.getElementById('level').addEventListener('change', renderLearnedActionBonuses);

// Listener para a mudança de imagem do personagem
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

/**
 * Calcula o custo em slots de um bônus de ação com base em seu valor.
 * @param {number} value - O valor do bônus (ex: 5, 10, 15, 20).
 * @returns {number} O número de slots que o bônus ocupa.
 */
const getSlotCost = (value) => {
    switch (value) {
        case 5: return 1;
        case 10: return 2;
        case 15: return 3;
        case 20: return 4;
        default: return 1; // Padrão, caso um valor inesperado seja fornecido
    }
};

/**
 * Calcula o total de slots de bônus de ação ocupados.
 * @returns {number} O número total de slots ocupados.
 */
function calculateUsedSlots() {
    // Filtra bônus que realmente ocupam slots e soma seus custos
    return actionBonuses.filter(bonus => bonus.occupiesSlot).reduce((sum, bonus) => sum + getSlotCost(bonus.value), 0);
}

/**
 * Atualiza os limites de slots para bônus de ação e o valor máximo permitido para bônus,
 * com base no nível do personagem. Também gerencia o bônus fixo "Criação Tek".
 */
function updateActionBonusLimits() {
    const level = parseInt(document.getElementById("level").value) || 1;
    let totalSlots = 9;
    let maxBonusValue = 15;

    // Define os limites de slots e valor máximo de bônus com base no nível
    if (level >= 30) {
        totalSlots = 12;
    }
    if (level >= 50) {
        totalSlots = 15;
        maxBonusValue = 20;
    }
    if (level >= 80) {
        totalSlots = 20;
        // maxBonusValue permanece 20
    }
    
    // Atualiza a exibição dos slots
    document.getElementById('totalActionSlots').textContent = totalSlots;
    document.getElementById('usedActionSlots').textContent = calculateUsedSlots();
    document.getElementById('remainingActionSlots').textContent = totalSlots - calculateUsedSlots();

    // Lógica para adicionar/remover o bônus fixo "Criação Tek" com base no nível
    const tekBonusIndex = actionBonuses.findIndex(b => b.action === 'Criação Tek' && b.fixed);
    if (level >= 95 && tekBonusIndex === -1) {
        // Adiciona "Criação Tek" se o nível for 95+ e ainda não estiver presente
        actionBonuses.push({ action: 'Criação Tek', value: 5, fixed: true, occupiesSlot: false });
    } else if (level < 95 && tekBonusIndex !== -1) {
        // Remove "Criação Tek" se o nível for menor que 95 e estiver presente
        actionBonuses.splice(tekBonusIndex, 1);
    }
    
    renderActionBonuses(); // Re-renderiza os bônus de ação para exibir as mudanças

    // Atualiza as opções de valor nos selects de bônus de ação existentes
    document.querySelectorAll('.action-bonus-value-select').forEach(select => {
        const currentValue = parseInt(select.value);
        select.innerHTML = ''; // Limpa as opções atuais

        // Adiciona as opções de valor permitidas com base no nível
        select.innerHTML += `<option value="5">+5</option>`;
        if (maxBonusValue >= 10) select.innerHTML += `<option value="10">+10</option>`;
        if (maxBonusValue >= 15) select.innerHTML += `<option value="15">+15</option>`;
        if (maxBonusValue >= 20) select.innerHTML += `<option value="20">+20</option>`;

        // Tenta manter o valor selecionado ou ajusta para o máximo permitido
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
    
    // Desabilita o botão de adicionar bônus se não houver slots restantes
    const addActionButton = document.querySelector('button[onclick="addActionBonus()"]');
    addActionButton.disabled = (totalSlots - calculateUsedSlots() <= 0 && totalSlots > 0);
}

/**
 * Adiciona um novo bônus de ação ao array, respeitando o limite de slots.
 * @param {string} action - O nome da ação (opcional).
 * @param {number} value - O valor do bônus (opcional, padrão 5).
 */
function addActionBonus(action = '', value = 5) {
    const level = parseInt(document.getElementById("level").value) || 1;
    let totalSlots = 9;
    if (level >= 30) totalSlots = 12;
    if (level >= 50) totalSlots = 15;
    if (level >= 80) totalSlots = 20;

    // Impede a adição se exceder o limite de slots
    if (calculateUsedSlots() + getSlotCost(value) > totalSlots) {
        alert("Limite de slots para Bônus de Ação atingido!");
        return;
    }

    const newBonus = { action: action, value: value, fixed: false, occupiesSlot: true };
    actionBonuses.push(newBonus); // Adiciona o novo bônus
    renderActionBonuses(); // Re-renderiza a lista
    updateActionBonusLimits(); // Atualiza os limites
}

/**
 * Remove um bônus de ação do array pelo seu índice.
 * Impede a remoção de bônus fixos.
 * @param {number} index - O índice do bônus a ser removido.
 */
function removeActionBonus(index) {
    if (actionBonuses[index].fixed) {
        alert("Este bônus é fixo e não pode ser removido manualmente.");
        return;
    }
    actionBonuses.splice(index, 1); // Remove o bônus
    renderActionBonuses(); // Re-renderiza a lista
    updateActionBonusLimits(); // Atualiza os limites
}

/**
 * Renderiza todos os bônus de ação (comuns) no container HTML.
 * Inclui lógica para desabilitar edição e remoção de bônus fixos.
 */
function renderActionBonuses() {
    const container = document.getElementById('actionBonusContainer');
    container.innerHTML = ''; // Limpa o conteúdo atual

    actionBonuses.forEach((bonus, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('action-bonus-item');

        // Define o HTML para o botão de remoção e atributos readonly/disabled
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
            // Ajusta o valor selecionado no dropdown com base no nível permitido
            const maxAllowedValue = (parseInt(document.getElementById("level").value) || 1) >= 50 ? 20 : 15;
            if (bonus.value > maxAllowedValue) {
                selectElement.value = maxAllowedValue;
                bonus.value = maxAllowedValue; // Atualiza o valor no objeto se for maior que o permitido
            } else {
                selectElement.value = bonus.value;
            }
        }
    });
}

/**
 * Atualiza um campo específico de um bônus de ação.
 * Impede a edição de bônus fixos e valida limites de slots ao alterar o valor.
 * @param {number} index - O índice do bônus a ser atualizado.
 * @param {string} field - O campo a ser atualizado ('action' ou 'value').
 * @param {*} newValue - O novo valor para o campo.
 */
function updateActionBonus(index, field, newValue) {
    // Impede a edição de bônus fixos
    if (actionBonuses[index].fixed && (field === 'action' || field === 'value')) {
        alert("Este bônus é fixo e não pode ser editado manualmente.");
        // Restaura o valor original no input
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

    // Valida se a mudança de valor excede os slots disponíveis
    if (field === 'value' && actionBonuses[index].occupiesSlot && newCost > originalCost && (calculateUsedSlots() - originalCost + newCost) > totalSlots) {
        alert("Mudar este bônus para este valor excederia o limite de slots!");
        document.getElementById(`actionValue${index}`).value = originalValue; // Restaura o valor original
        return;
    }

    actionBonuses[index][field] = newValue; // Atualiza o campo
    updateActionBonusLimits(); // Atualiza os limites após a alteração
}

/**
 * Adiciona um novo bônus de ação aprendido (permanente) ao array.
 * @param {string} action - O nome da ação (opcional).
 * @param {number} value - O valor do bônus (opcional, padrão 5).
 */
function addLearnedActionBonus(action = '', value = 5) {
    learnedActionBonuses.push({ action: action, value: value });
    renderLearnedActionBonuses(); // Re-renderiza a lista de bônus aprendidos
}

/**
 * Remove um bônus de ação aprendido do array pelo seu índice.
 * @param {number} index - O índice do bônus a ser removido.
 */
function removeLearnedActionBonus(index) {
    learnedActionBonuses.splice(index, 1);
    renderLearnedActionBonuses(); // Re-renderiza a lista de bônus aprendidos
}

/**
 * Renderiza todos os bônus de ação aprendidos no container HTML.
 * Ajusta as opções de valor no select com base no nível do personagem.
 */
function renderLearnedActionBonuses() {
    const container = document.getElementById('learnedActionBonusContainer');
    if (!container) return; // Garante que o container existe

    container.innerHTML = ''; // Limpa o conteúdo atual
    const level = parseInt(document.getElementById("level").value) || 1;
    const maxBonusValue = (level >= 50) ? 20 : 15; // Define o valor máximo permitido com base no nível

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
            // Ajusta o valor selecionado no dropdown com base no nível permitido
            if (bonus.value > maxBonusValue) {
                selectElement.value = maxBonusValue;
                bonus.value = maxBonusValue; // Atualiza o valor no objeto se for maior que o permitido
            } else {
                selectElement.value = bonus.value;
            }
        }
    });
}

/**
 * Atualiza um campo específico de um bônus de ação aprendido.
 * @param {number} index - O índice do bônus a ser atualizado.
 * @param {string} field - O campo a ser atualizado ('action' ou 'value').
 * @param {*} newValue - O novo valor para o campo.
 */
function updateLearnedActionBonus(index, field, newValue) {
    learnedActionBonuses[index][field] = newValue; // Atualiza o campo
    renderLearnedActionBonuses(); // Re-renderiza para refletir a mudança
}

// =========================================================
// SEÇÃO 6: Gerenciamento de Armas
// =========================================================

/**
 * Adiciona uma nova arma vazia (ou com valores iniciais) ao array de armas.
 * @param {string} name - Nome inicial da arma (opcional).
 * @param {string} damageDice - Dano inicial da arma (ex: '1d6') (opcional).
 * @param {string} condition - Condição inicial da arma (opcional, padrão 'Nula').
 */
function addWeapon(name = '', damageDice = '', condition = 'Nula') {
    weapons.push({ name: name, damageDice: damageDice, condition: condition });
    renderWeapons(); // Re-renderiza a lista de armas
}

/**
 * Remove uma arma do array pelo seu índice, após confirmação do usuário.
 * @param {number} index - O índice da arma a ser removida.
 */
function removeWeapon(index) {
    if (confirm("Tem certeza que deseja remover esta arma?")) {
        weapons.splice(index, 1); // Remove a arma do array
        renderWeapons(); // Re-renderiza a lista de armas
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
        weapons[index][field] = value; // Atualiza o campo da arma
    }
}

/**
 * Renderiza todas as armas no container HTML dedicado.
 * Cria dinamicamente os inputs e selects para cada arma.
 */
function renderWeapons() {
    const container = document.getElementById('weaponsContainer');
    if (!container) return; // Garante que o container existe

    container.innerHTML = ''; // Limpa o conteúdo atual

    weapons.forEach((weapon, index) => {
        const weaponDiv = document.createElement('div');
        weaponDiv.classList.add('weapon-item'); // Adiciona uma classe para estilização

        // Cria as opções do select de condições a partir da lista pré-definida
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
        container.appendChild(weaponDiv); // Adiciona a div da arma ao container
    });
}

// =========================================================
// SEÇÃO 7: Cálculo e Exibição de Estatísticas Finais
// =========================================================

/**
 * Calcula todas as estatísticas do personagem (Vida, Sanidade, Resistência, etc.)
 * com base nos atributos, nível e bônus, e as exibe na área de resultados.
 */
function calculateStats() {
    // 1. Obter valores dos inputs estáticos (do HTML)
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

    // As variáveis globais 'attributes', 'actionBonuses', 'learnedActionBonuses' e 'weapons'
    // já contêm os dados atualizados e são usadas diretamente.

    // Cálculos das estatísticas baseadas nos atributos e nível
    let vida = 55 + (attributes.vig * 15);
    let determinacaoSanidade = 55 + (attributes.int * 10) + (attributes.set * 15);
    let resistencia = 15 + (attributes.vig * 5);
    let folego = 4 + (attributes.vig * 1);
    let armadura = 5; // Valor fixo inicial

    // Lógica para adicionar bônus de armadura por nível
    if (level >= 15) {
        armadura += 1;
    }
    if (level >= 30) {
        armadura += 1;
    }

    // Geração do HTML para a lista de Bônus em Ações (dinâmicos/comuns)
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
    
    // Geração do HTML para a lista de Bônus de Ações Aprendidos (permanentes)
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

    // Geração do HTML para a lista de Armas
    let weaponsHtml = '';
    if (weapons.length > 0) {
        weaponsHtml = `<ul class="stats-list weapon-list">`;
        weapons.forEach(weapon => {
            weaponsHtml += `<li><strong class="sub-category-title">${weapon.name || '<span class="no-info">Arma sem nome</span>'}</strong>: <span class="attribute-value">${weapon.damageDice || '<span class="no-info">Dano não especificado</span>'}</span>`;
            if (weapon.condition && weapon.condition !== 'Nula') {
                weaponsHtml += `<span class="attribute-value"> (${weapon.condition})</span>`; // Adiciona a condição entre parênteses
            }
            weaponsHtml += `</li>`;
        });
        weaponsHtml += `</ul>`;
    } else {
        weaponsHtml = '<p class="no-info">Nenhuma arma registrada.</p>';
    }

    // Listas de recompensas por nível, mutação e inventário
    let levelRewardsList = [];
    let mutationRewardsList = [];
    let inventoryRewardsList = [];
    
    // Adiciona recompensas baseadas no nível do personagem
    if (level >= 15) {
        levelRewardsList.push(`+1 Ponto de Atributo (já contabilizado na ficha)`);
    }
    if (level >= 30) {
        levelRewardsList.push(`Mais slots para Bônus de Ação (Total de 12 slots)`);
    }
    if (level >= 50) {
        vida += 30; // Bônus de vida por nível
        levelRewardsList.push(`+30 de Vida (já adicionado ao total)`);
        levelRewardsList.push(`Mais slots para Bônus de Ação (Total de 15 slots) e possibilidade de bônus até +20`);
        inventoryRewardsList.push('Convite da Linhagem de Athenas');
        inventoryRewardsList.push('1 Presente de Evento Global');
    }
    if (level >= 65) {
        determinacaoSanidade += 20; // Bônus de sanidade por nível
        levelRewardsList.push(`+20 de Sanidade (já adicionado ao total de Determinação/Sanidade)`);
        levelRewardsList.push(`+1 Ponto de Atributo adicional (já contabilizado na ficha)`);
        mutationRewardsList.push(`+1 Parte de Mutação (Revivendo Memória)`);
    }
    if (level >= 80) {
        armadura += 10; // Bônus de armadura por nível
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

    // Construir o HTML final para exibir todas as estatísticas na ficha
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

            <h4 class="sub-section-title">Armas</h4> ${weaponsHtml} </div>
        
        ${levelRewardsList.length > 0 ? `<div class="ficha-section"><h4 class="section-title">Recompensas Gerais por Nível</h4><ul class="stats-list">${levelRewardsList.map(item => `<li><span class="attribute-value">${item}</span></li>`).join('')}</ul></div>` : ''}
    `;

    document.getElementById("stats").innerHTML = statsHtml; // Insere o HTML gerado na div de resultados
    document.getElementById("results").style.display = "block"; // Torna a div de resultados visível
    document.getElementById("results").scrollIntoView({ behavior: 'smooth' }); // Rola a página para exibir os resultados
}

// =========================================================
// SEÇÃO 8: Funções de Utilitário e Inicialização
// =========================================================

/**
 * Copia o texto formatado da ficha calculada para a área de transferência.
 * Remove elementos HTML e formata o texto para melhor legibilidade.
 */
function copyFicha() {
    const statsDiv = document.getElementById("stats");
    if (!statsDiv) {
        alert("A ficha calculada não está disponível para cópia.");
        return;
    }

    // Clona o elemento para evitar modificações no DOM visível durante a cópia
    const tempDiv = statsDiv.cloneNode(true);

    // Remove a imagem se existir no clone, pois ela não pode ser copiada como texto
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

            // Ajusta quebras de linha em campos como Lore, Mutação e Inventário para formatar corretamente no texto
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

    // Remove espaços extras e linhas em branco consecutivas para uma saída limpa
    fichaText = fichaText.replace(/(\n\s*){2,}/g, '\n\n').trim();

    // Copia o texto final para a área de transferência do usuário
    navigator.clipboard.writeText(fichaText)
        .then(() => {
            alert("Ficha copiada para a área de transferência!");
        })
        .catch(err => {
            console.error('Erro ao copiar a ficha: ', err);
            alert("Erro ao copiar a ficha. Por favor, tente novamente ou copie manualmente.");
        });
}

// =========================================================
// SEÇÃO 9: Funções de Rolagem de Dados e UI do Menu
// =========================================================

// Elementos do menu de rolagem de dados
const menu = document.getElementById('diceMenu');
const openMenuButton = document.getElementById('openMenu');
const closeMenuButton = document.getElementById('closeMenu');
const diceSelect = document.getElementById('diceSelect');
const rollDiceButton = document.getElementById('rollDice');
const clearRollsButton = document.getElementById('clearRolls');
const rollList = document.getElementById('rollList');
const totalDisplay = document.getElementById('total');
const playerNameInput = document.getElementById('playerName');

let playerScores = {}; // Objeto para armazenar as pontuações dos jogadores nas rolagens

// Event listeners para abrir e fechar o menu de dados
if (openMenuButton && menu && closeMenuButton) { 
    openMenuButton.addEventListener('click', () => {
        menu.classList.remove('hidden'); // Mostra o menu
    });

    closeMenuButton.addEventListener('click', () => {
        menu.classList.add('hidden'); // Esconde o menu
    });
}

// Event listener para o botão de rolar dados
if (rollDiceButton) { 
    rollDiceButton.addEventListener('click', () => {
        const playerName = playerNameInput.value.trim();
        const diceType = parseInt(diceSelect.value); // Tipo de dado (d4, d6, d20, etc.)
        const roll = Math.floor(Math.random() * diceType) + 1; // Rolagem aleatória

        if (!playerName) {
            alert("Por favor, insira o nome do jogador!");
            return;
        }

        // Inicializa a pontuação do jogador se for a primeira rolagem dele
        if (!playerScores[playerName]) {
            playerScores[playerName] = 0;
        }
        playerScores[playerName] += roll; // Adiciona a rolagem ao total do jogador

        const listItem = document.createElement('li');
        listItem.textContent = `${playerName} = D${diceType}: ${roll} (Total: ${playerScores[playerName]})`;
        rollList.appendChild(listItem); // Adiciona a rolagem à lista

        // Atualiza o total geral de todas as rolagens
        totalDisplay.textContent = `Total geral: ${Object.values(playerScores).reduce((a, b) => a + b, 0)}`;
    });
}

// Event listener para o botão de limpar rolagens
if (clearRollsButton) { 
    clearRollsButton.addEventListener('click', () => {
        playerScores = {}; // Reseta as pontuações
        rollList.innerHTML = ''; // Limpa a lista de rolagens na UI
        totalDisplay.textContent = 'Total geral: 0'; // Reseta o total
    });
}

/**
 * Redireciona o usuário para uma página específica.
 * @param {string} page - O URL da página para a qual redirecionar.
 */
function goToPage(page) {
    window.location.href = page;
}

// Listener para o evento de scroll para ajustar o estilo do rodapé
document.addEventListener("scroll", () => {
    const footer = document.querySelector("footer");
    if (footer) { // Verifica se o footer existe
        // Altera o gradiente do rodapé ao chegar ao final da página
        if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
            footer.style.background = "linear-gradient(45deg, #1a1a1a, #1a1a1a, #000, #000,#1a1a1a, #1a1a1a)";
        } else {
            footer.style.background = "linear-gradient(45deg, #1a1a1a, #000)";
        }
    }
});

// Toggle para o menu de navegação em dispositivos móveis (hambúrguer)
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) { 
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active'); // Ativa/desativa a classe 'active' para exibir/esconder o menu
    });
}

/**
 * Atualiza visualmente a barra de progresso do nível do personagem.
 */
function updateLevelBar() {
    const levelInput = document.getElementById("level");
    const level = parseInt(levelInput.value) || 1; // Pega o nível, padrão 1

    const levelBarFill = document.getElementById("levelBarFill"); // Elemento da barra de preenchimento

    // Calcula a porcentagem de preenchimento (nível atual / 100 * 100%)
    const percentage = Math.max(0, Math.min(100, level)); 
    
    // Aplica a largura calculada ao estilo da barra de preenchimento
    if (levelBarFill) { 
        levelBarFill.style.width = percentage + '%';
    }
}

// =========================================================
// SEÇÃO 10: Inicialização da Aplicação
// =========================================================

// Garante que a função loadForm seja chamada quando o DOM estiver completamente carregado.
// Isso inicializa o estado de login e tenta carregar a ficha localmente.
window.onload = loadForm; 
document.addEventListener('DOMContentLoaded', () => {
    loadForm(); 
});

// SEÇÃO 11: Gerenciamento de Rituais/Pactos Selecionados (Adicione esta nova seção)
// ========================
function loadSelectedRitualPact() {
    const selectedItem = localStorage.getItem("itemSelecionado");
    const displayContainer = document.getElementById("selectedRitualPactDisplay");

    if (displayContainer) { // Garante que o container existe
        if (selectedItem) {
            const item = JSON.parse(selectedItem);
            displayContainer.innerHTML = `
                <h3>${item.name}</h3>
                ${item.image ? `<img src="${item.image}" alt="${item.name}" style="max-width: 150px; height: auto; margin-bottom: 10px;">` : ''}
                <p>${item.description}</p>
                <button id="clearSelectedRitualPact">Remover da Ficha</button>
            `;

            // Adiciona evento para remover o item da ficha
            document.getElementById("clearSelectedRitualPact").addEventListener("click", () => {
                localStorage.removeItem("itemSelecionado");
                displayContainer.innerHTML = "<p>Nenhum ritual ou pacto selecionado.</p>";
                alert(`"${item.name}" removido da ficha.`);
            });

        } else {
            displayContainer.innerHTML = "<p>Nenhum ritual ou pacto selecionado.</p>";
        }
    }
}

// SEÇÃO 11: Gerenciamento de Rituais/Pactos Selecionados (Adicione esta nova seção)
// ========================
function loadSelectedRitualPact() {
    const selectedItem = localStorage.getItem("itemSelecionado");
    const displayContainer = document.getElementById("selectedRitualPactDisplay");

    if (displayContainer) { // Garante que o container existe
        if (selectedItem) {
            const item = JSON.parse(selectedItem);
            displayContainer.innerHTML = `
                <h3>${item.name}</h3>
                ${item.image ? `<img src="${item.image}" alt="${item.name}" style="max-width: 150px; height: auto; margin-bottom: 10px;">` : ''}
                <p>${item.description}</p>
                <button id="clearSelectedRitualPact">Remover da Ficha</button>
            `;

            // Adiciona evento para remover o item da ficha
            document.getElementById("clearSelectedRitualPact").addEventListener("click", () => {
                localStorage.removeItem("itemSelecionado");
                displayContainer.innerHTML = "<p>Nenhum ritual ou pacto selecionado.</p>";
                alert(`"${item.name}" removido da ficha.`);
            });

        } else {
            displayContainer.innerHTML = "<p>Nenhum ritual ou pacto selecionado.</p>";
        }
    }
}

// SEÇÃO 11: Gerenciamento de Rituais/Pactos Selecionados (Adicione esta nova seção)
// ========================
function loadSelectedRitualPact() {
    const storedItems = localStorage.getItem("selectedRitualsPacts");
    const displayContainer = document.getElementById("selectedRitualPactDisplay"); // Este será o wrapper

    if (!displayContainer) {
        console.warn("Contêiner 'selectedRitualPactDisplay' não encontrado na ficha.");
        return;
    }

    // Limpa o conteúdo atual para evitar duplicatas ao recarregar
    displayContainer.innerHTML = '';

    let selectedItems = storedItems ? JSON.parse(storedItems) : [];

    if (selectedItems.length > 0) {
        selectedItems.forEach((item, index) => {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("ritual-pact-item"); // Nova classe para cada item individual
            itemDiv.dataset.itemName = item.name; // Adiciona um atributo para fácil referência

            itemDiv.innerHTML = `
                <h3>${item.name}</h3>
                ${item.image ? `<img src="${item.image}" alt="${item.name}">` : ''}
                <p>${item.description}</p>
                <button class="remove-ritual-pact-btn" data-index="${index}">Remover da Ficha</button>
            `;
            displayContainer.appendChild(itemDiv);
        });

        // Adiciona os event listeners para os botões de remover após todos serem criados
        document.querySelectorAll(".remove-ritual-pact-btn").forEach(button => {
            button.addEventListener("click", (event) => {
                const itemToRemoveName = event.target.closest('.ritual-pact-item').dataset.itemName;
                removeRitualPact(itemToRemoveName);
            });
        });

    } else {
        displayContainer.innerHTML = "<p>Nenhum ritual ou pacto selecionado.</p>";
    }
}

/**
 * Remove um ritual/pacto específico da lista no localStorage.
 * @param {string} nameToRemove - O nome do ritual/pacto a ser removido.
 */
function removeRitualPact(nameToRemove) {
    const storedItems = localStorage.getItem("selectedRitualsPacts");
    let selectedItems = storedItems ? JSON.parse(storedItems) : [];

    // Filtra o array para remover o item com o nome correspondente
    selectedItems = selectedItems.filter(item => item.name !== nameToRemove);

    localStorage.setItem("selectedRitualsPacts", JSON.stringify(selectedItems)); // Salva a lista atualizada
    loadSelectedRitualPact(); // Recarrega e exibe a lista na ficha
    alert(`"${nameToRemove}" removido da ficha.`);
}

// Chame esta função na inicialização da sua página de ficha.
document.addEventListener("DOMContentLoaded", function() {
    // ... seu código existente de inicialização ...
    loadSelectedRitualPact(); // Chama a nova função para carregar os rituais/pactos
});

// Se você já tem uma função 'loadForm' que é chamada no DOMContentLoaded,
// adicione 'loadSelectedRitualPact()' dentro dela.
// Exemplo:
// function loadForm() {
//     // ... código existente da loadForm ...
//     loadSelectedRitualPact();
// }