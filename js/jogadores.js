
// ========================
// Menu (Navbar)
// ========================
const menu = document.getElementById('diceMenu'); // Menu de dados
const openMenuButton = document.getElementById('openMenu'); // Botão para abrir o menu
const closeMenuButton = document.getElementById('closeMenu'); // Botão para fechar o menu
const diceSelect = document.getElementById('diceSelect'); // Seleção do tipo de dado
const rollDiceButton = document.getElementById('rollDice'); // Botão para rolar dado
const clearRollsButton = document.getElementById('clearRolls'); // Botão para limpar rolagens
const rollList = document.getElementById('rollList'); // Lista de rolagens
const totalDisplay = document.getElementById('total'); // Exibição do total geral
const playerNameInput = document.getElementById('playerName'); // Entrada do nome do jogador

// Variáveis globais
let playerScores = {}; // Armazena as somas dos dados por jogador

// Função para abrir o menu
openMenuButton.addEventListener('click', () => {
    menu.classList.remove('hidden'); // Exibe o menu
});

// Função para fechar o menu
closeMenuButton.addEventListener('click', () => {
    menu.classList.add('hidden'); // Oculta o menu
});

// ========================
// Função de rolagem de dados
// ========================
rollDiceButton.addEventListener('click', () => {
    const playerName = playerNameInput.value.trim(); // Nome do jogador
    const diceType = parseInt(diceSelect.value); // Tipo de dado selecionado
    const roll = Math.floor(Math.random() * diceType) + 1; // Rolagem aleatória do dado

    // Validação: O nome do jogador deve ser preenchido
    if (!playerName) {
        alert("Por favor, insira o nome do jogador!");
        return;
    }

    // Atualiza o total do jogador
    if (!playerScores[playerName]) {
        playerScores[playerName] = 0; // Inicializa o jogador, caso não exista
    }
    playerScores[playerName] += roll;

    // Adiciona o registro da rolagem na lista
    const listItem = document.createElement('li');
    listItem.textContent = `${playerName} = D${diceType}: ${roll} (Total: ${playerScores[playerName]})`;
    rollList.appendChild(listItem);

    // Atualiza o total geral
    totalDisplay.textContent = `Total geral: ${Object.values(playerScores).reduce((a, b) => a + b, 0)}`;
});

// ========================
// Limpar registro de rolagens
// ========================
clearRollsButton.addEventListener('click', () => {
    playerScores = {}; // Reinicia os totais por jogador
    rollList.innerHTML = ''; // Limpa a lista de rolagens
    totalDisplay.textContent = 'Total geral: 0'; // Zera o total exibido
});


// ==============================================
// INICIALIZAÇÃO COM EVENT LISTENERS PARA SALVAR
// ==============================================

// ==============================================
// FUNÇÃO PARA ATUALIZAR INPUTS DA PRIMAL APÓS CARREGAR
// ==============================================

function updatePrimalInputsAfterLoad() {
    console.log('🔄 Atualizando inputs da primal após carregar...');
    
    const primalMutation = characterMutations.find(m => m.id === 0);
    if (!primalMutation) {
        console.error('❌ Primal não encontrada após carregar');
        return;
    }
    
    console.log('📊 Dados da primal para carregar:', primalMutation.stats);
    
    // Mapear stats para inputs
    const inputs = [
        { id: 'primalVida', value: primalMutation.stats?.vida || 0 },
        { id: 'primalSanidade', value: primalMutation.stats?.sanidade || 0 },
        { id: 'primalArmadura', value: primalMutation.stats?.armadura || 0 },
        { id: 'primalFolego', value: primalMutation.stats?.folego || 0 },
        { id: 'primalResistencia', value: primalMutation.stats?.resistencia || 0 }
    ];
    
    inputs.forEach(({ id, value }) => {
        const input = document.getElementById(id);
        if (input) {
            input.value = value;
            console.log(`✅ Input ${id} carregado: ${value}`);
        } else {
            console.error(`❌ Input ${id} não encontrado`);
        }
    });
    
    // Descrição
    const primalDesc = document.getElementById('primalDescription');
    if (primalDesc && primalMutation.description) {
        primalDesc.value = primalMutation.description;
        console.log(`✅ Descrição carregada: ${primalMutation.description.substring(0, 50)}...`);
    }
    
    // Reconfigurar listeners
    setTimeout(setupDirectPrimalListeners, 100);
}

// ==============================================
// FUNÇÃO PARA CONFIGURAR TODOS OS LISTENERS DA PRIMAL
// ==============================================

function setupAllPrimalListeners() {
    console.log('🔧 Configurando todos os listeners da primal...');
    
    // 1. Descrição da primal
    const primalDesc = document.getElementById('primalDescription');
    if (primalDesc) {
        primalDesc.removeEventListener('input', null);
        primalDesc.removeEventListener('change', null);
        
        primalDesc.addEventListener('input', function() {
            updateMutation(0, 'description', this.value);
            saveCharacterData();
        });
        
        primalDesc.addEventListener('change', function() {
            updateMutation(0, 'description', this.value);
            saveCharacterData();
        });
        
        console.log('✅ Listener da descrição primal configurado');
    }
    
    // 2. Status da primal - CRIAR FUNÇÃO ESPECÍFICA
    function setupPrimalStatListeners() {
        const statsConfig = [
            { id: 'primalVida', stat: 'vida' },
            { id: 'primalSanidade', stat: 'sanidade' },
            { id: 'primalArmadura', stat: 'armadura' },
            { id: 'primalFolego', stat: 'folego' },
            { id: 'primalResistencia', stat: 'resistencia' }
        ];
        
        statsConfig.forEach(({ id, stat }) => {
            const input = document.getElementById(id);
            if (input) {
                // Remover listeners antigos
                input.removeEventListener('input', null);
                input.removeEventListener('change', null);
                
                // Criar nova função de handler
                const handleStatChange = function() {
                    const value = parseInt(this.value) || 0;
                    console.log(`📝 Primal ${stat} alterado para: ${value}`);
                    
                    // Atualizar o objeto primal
                    const primalMutation = characterMutations.find(m => m.id === 0);
                    if (primalMutation) {
                        if (!primalMutation.stats) {
                            primalMutation.stats = {
                                vida: 0,
                                sanidade: 0,
                                armadura: 0,
                                folego: 0,
                                resistencia: 0
                            };
                        }
                        primalMutation.stats[stat] = value;
                        
                        // Salvar imediatamente
                        saveCharacterData();
                        console.log(`✅ Primal ${stat} salvo: ${value}`);
                    }
                };
                
                // Adicionar novos listeners
                input.addEventListener('input', handleStatChange);
                input.addEventListener('change', handleStatChange);
                
                console.log(`✅ Listener configurado para: ${id}`);
            } else {
                console.error(`❌ Input não encontrado: ${id}`);
            }
        });
    }
    
    // Configurar listeners de status
    setupPrimalStatListeners();
    
    // 3. Bônus da primal
    const addBonusBtn = document.querySelector('#mutation-0 .btn-add-small');
    if (addBonusBtn) {
        addBonusBtn.onclick = function() {
            addMutationBonus(0);
        };
        console.log('✅ Botão de bônus primal configurado');
    }
    
    console.log('🎯 Todos os listeners da primal configurados');
}

// ==============================================
// ADICIONAR EVENT LISTENERS DIRETOS NOS INPUTS
// ==============================================

// ==============================================
// ADICIONAR EVENT LISTENERS DIRETOS NOS INPUTS
// ==============================================

function setupDirectPrimalListeners() {
    console.log('🔧 Configurando listeners diretos para primal...');
    
    const inputs = [
        { id: 'primalVida', stat: 'vida' },
        { id: 'primalSanidade', stat: 'sanidade' },
        { id: 'primalArmadura', stat: 'armadura' },
        { id: 'primalFolego', stat: 'folego' },
        { id: 'primalResistencia', stat: 'resistencia' }
    ];
    
    inputs.forEach(({ id, stat }) => {
        const input = document.getElementById(id);
        if (input) {
            // Remover listeners antigos
            const newInput = input.cloneNode(true);
            input.parentNode.replaceChild(newInput, input);
            
            const currentInput = document.getElementById(id);
            
            // Adicionar novos listeners
            currentInput.addEventListener('input', function() {
                console.log(`📝 Input ${id} alterado: ${this.value}`);
                updateMutationStat(0, stat, this.value);
                // Salvar IMEDIATAMENTE
                setTimeout(saveCharacterData, 100);
            });
            
            currentInput.addEventListener('change', function() {
                console.log(`💾 Change ${id}: ${this.value}`);
                updateMutationStat(0, stat, this.value);
                // Salvar IMEDIATAMENTE
                saveCharacterData();
            });
            
            console.log(`✅ Listener configurado para: ${id}`);
        } else {
            console.error(`❌ Input não encontrado: ${id}`);
        }
    });
    
    // Descrição da primal - TRATAMENTO ESPECIAL
    const primalDesc = document.getElementById('primalDescription');
    if (primalDesc) {
        const newDesc = primalDesc.cloneNode(true);
        primalDesc.parentNode.replaceChild(newDesc, primalDesc);
        
        const currentDesc = document.getElementById('primalDescription');
        
        currentDesc.addEventListener('input', function() {
            console.log(`📝 Descrição primal alterada`);
            updateMutation(0, 'description', this.value);
        });
        
        currentDesc.addEventListener('change', function() {
            console.log(`💾 Descrição primal salva`);
            updateMutation(0, 'description', this.value);
            saveCharacterData();
        });
        
        // Salvar também no blur (quando sai do campo)
        currentDesc.addEventListener('blur', function() {
            console.log(`💾 Descrição primal (blur): ${this.value}`);
            updateMutation(0, 'description', this.value);
            saveCharacterData();
        });
    }
    
    console.log('🎯 Todos os listeners da primal configurados');
}

// ==============================================
// FUNÇÃO DE DEBUG PARA VERIFICAR OS DADOS
// ==============================================

function debugSaveSystem() {
    console.log('=== DEBUG DO SISTEMA DE SALVAMENTO ===');
    
    // Verificar inputs da primal
    const primalInputs = [
        'primalVida', 'primalSanidade', 'primalArmadura', 
        'primalFolego', 'primalResistencia'
    ];
    
    console.log('📋 Inputs HTML da primal:');
    primalInputs.forEach(id => {
        const input = document.getElementById(id);
        console.log(`  ${id}: ${input?.value || 'não encontrado'}`);
    });
    
    // Verificar objeto primal
    const primalMutation = characterMutations.find(m => m.id === 0);
    console.log('🧬 Objeto primal:', primalMutation);
    console.log('📊 Stats da primal:', primalMutation?.stats);
    
    // Verificar localStorage
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
        try {
            const parsed = JSON.parse(savedData);
            const savedPrimal = parsed.characterMutations?.find(m => m.id === 0);
            console.log('💾 Primal salva no localStorage:', savedPrimal?.stats);
        } catch (e) {
            console.error('Erro ao ler localStorage:', e);
        }
    }
    
    console.log('=== FIM DEBUG ===');
}


// Variáveis globais
let attributesBase = {
    agi: 1,
    for: 1,
    int: 1,
    set: 1,
    vig: 1
};

let attributes = { ...attributesBase };
let initialDistributablePoints = 9; // Apenas 9 pontos
let bonusPointsFromLevel = 0;
let currentUser = null;
// Adicione estas variáveis globais
let mutationBonuses = {}; // Armazenará bônus por mutação

// Modifique a estrutura das mutações
let characterMutations = [
    {
        id: 0,
        name: "MUTAÇÃO PRIMAL",
        type: "primal",
        description: "",
        source: "Origem do Personagem",
        stage: 1,
        fixed: true,
        stats: {
            vida: 0,
            sanidade: 0,
            armadura: 0,
            folego: 0,
            resistencia: 0
        },
        bonuses: [] // Bônus de ação específicos desta mutação
    }
];

// Inicialize mutationBonuses
mutationBonuses[0] = [];

// Sistema de bônus
let allBonuses = [];
let learnedBonuses = [];

// Sistema de rituais - AGORA COM DADOS DA PÁGINA DE PODERES
let rituals = [];

// Sistema de arsenal - AGORA COM ARMAS DA PÁGINA DE ITENS
let weapons = [];

// Sistema de armazenamento
const LOCAL_STORAGE_KEY = 'arkCharacterSheet';
const WEAPONS_STORAGE_KEY = 'personagemArmas'; // Chave para armas da página de itens
const RITUALS_STORAGE_KEY = 'selectedRitualPacts'; // Chave para rituais da página de poderes

// ==============================================
// FUNÇÕES DE INICIALIZAÇÃO
// ==============================================

function initializeEventListeners() {
    // Nível
    const levelInput = document.getElementById('level');
    if (levelInput) {
        levelInput.addEventListener('input', validateLevelInput);
        levelInput.addEventListener('change', validateLevelInput);
    }
    
    // Foto
    const photoInput = document.getElementById('photo');
    if (photoInput) {
        photoInput.addEventListener('change', handlePhotoUpload);
    }
    
    // Mutação
    const addMutationBtn = document.getElementById('addMutationBtn');
    if (addMutationBtn) {
        addMutationBtn.addEventListener('click', addMutationSlot);
    }
    
    // Login
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            const usernameInput = document.getElementById('usernameInput');
            if (usernameInput) {
                loginUser(usernameInput.value);
            }
        });
    }
}

// ==============================================
// CARREGAR RITUAIS DA PÁGINA DE PODERES
// ==============================================

function loadRitualsFromStorage() {
    try {
        const rituaisSalvos = localStorage.getItem(RITUALS_STORAGE_KEY);
        if (rituaisSalvos) {
            const rituaisCarregados = JSON.parse(rituaisSalvos);
            
            // Converter rituais da página para o formato da ficha
            rituaisCarregados.forEach(ritual => {
                const ritualExistente = rituals.find(r => r.nome === ritual.nome);
                if (!ritualExistente) {
                    // Adicionar apenas se não existir
                    rituals.push({
                        id: Date.now() + Math.random(),
                        nome: ritual.nome || 'Ritual sem nome',
                        imagem: ritual.imagem || '',
                        descricao: ritual.descricao || '',
                        tipo: ritual.tipo || 'ritual',
                        elemento: ritual.elemento || '',
                        nivel: ritual.nivel || 1,
                        origem: 'poderes'
                    });
                }
            });
            
            console.log(`${rituaisCarregados.length} rituais/pactos carregados da página de poderes`);
            updateRitualsDisplay();
        }
    } catch (error) {
        console.error('Erro ao carregar rituais do storage:', error);
    }
}

// ==============================================
// ATUALIZAR SISTEMA DE RITUAIS DA FICHA
// ==============================================

function updateRitualsDisplay() {
    const container = document.getElementById('ritualsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (rituals.length === 0) {
        container.innerHTML = `
            <div class="no-rituals" style="text-align: center; padding: 40px 20px;">
                <p style="margin-bottom: 10px;">Nenhum ritual ou pacto adicionado.</p>
                <p>Clique em "Ir para Página de Rituais" para selecionar rituais e pactos.</p>
            </div>
        `;
        return;
    }
    
    const characterLevel = parseInt(document.getElementById('level').value) || 1;
    
    rituals.forEach((ritual, index) => {
        // Validar se o personagem tem nível suficiente
        const status = characterLevel >= ritual.nivel ? 'Aprendido' : 'Não Aprendido';
        const statusClass = characterLevel >= ritual.nivel ? 'learned' : 'not-learned';
        const canLearn = characterLevel >= ritual.nivel;
        
        const ritualDiv = document.createElement('div');
        ritualDiv.className = 'ritual-item';
        ritualDiv.id = `ritual-${ritual.id}`;
        ritualDiv.style.marginTop = '20px'; // Espaçamento maior em cima
        ritualDiv.style.marginBottom = '20px'; // Espaçamento embaixo
        ritualDiv.style.position = 'relative'; // Para posicionar o botão de remover
        
        // Determinar tipo visual
        const isPacto = ritual.tipo && ritual.tipo.toLowerCase().includes('pacto');
        const typeClass = isPacto ? 'pacto' : 'ritual';
        
        ritualDiv.innerHTML = `
            <div class="ritual-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <div class="ritual-name-container" style="flex: 1;">
                    <h4 class="ritual-name" style="margin: 0; font-size: 1.2rem; color: #d4af37;">${ritual.nome}</h4>
                    <span class="ritual-level-badge" style="display: inline-block; background: #8b4513; color: white; padding: 2px 8px; border-radius: 10px; font-size: 0.8rem; margin-top: 5px;">
                        Nível ${ritual.nivel}
                    </span>
                </div>
                <div class="ritual-status ${statusClass}" style="display: flex; align-items: center; gap: 8px; padding: 5px 12px; border-radius: 20px; font-size: 0.9rem; font-weight: bold; ${canLearn ? 'background: rgba(46, 204, 113, 0.2); color: #27ae60;' : 'background: rgba(231, 76, 60, 0.2); color: #e74c3c;'}">
                    <i class="fas ${canLearn ? 'fa-check-circle' : 'fa-lock'}"></i>
                    ${status}
                </div>
            </div>
            
            ${ritual.imagem ? `
                <div class="ritual-image-container" style="text-align: center; margin-bottom: 15px;">
                    <img src="${ritual.imagem}" alt="${ritual.nome}" class="ritual-image" loading="lazy" style="max-width: 200px; max-height: 150px; border-radius: 8px; object-fit: cover;">
                </div>
            ` : ''}
            
            <div class="ritual-details" style="margin-bottom: 15px;">
                <div class="ritual-info-row" style="display: flex; gap: 15px; margin-bottom: 10px;">
                    <div class="ritual-info-item" style="flex: 1;">
                        <span class="ritual-info-label" style="display: block; font-size: 0.85rem; color: #aaa; margin-bottom: 3px;">Tipo:</span>
                        <span class="ritual-info-value" style="font-weight: bold; color: #fff;">${ritual.tipo || 'Ritual'}</span>
                    </div>
                    <div class="ritual-info-item" style="flex: 1;">
                        <span class="ritual-info-label" style="display: block; font-size: 0.85rem; color: #aaa; margin-bottom: 3px;">Elemento:</span>
                        <span class="ritual-info-value" style="font-weight: bold; color: #fff;">${ritual.elemento || 'N/A'}</span>
                    </div>
                </div>
                
                <div class="ritual-description-container">
                    <span class="ritual-description-label" style="display: block; font-size: 0.85rem; color: #aaa; margin-bottom: 5px;">Descrição:</span>
                    <p class="ritual-description" style="margin: 0; line-height: 1.5; color: #ccc; font-size: 0.9rem;">${ritual.descricao || 'Sem descrição disponível.'}</p>
                </div>
            </div>
            
            <div class="ritual-actions" style="display: flex; justify-content: flex-end; align-items: center; gap: 10px;">
                <button type="button" onclick="removeRitual(${index})" class="remove-ritual" style="position: absolute; top: 10px; right: 10px; background: linear-gradient(135deg, #c0392b, #e74c3c); color: white; border: none; border-radius: 4px; width: 30px; height: 30px; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 10;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        container.appendChild(ritualDiv);
    });
}



function addRitual() {
    // Redirecionar para a página de poderes (rituais)
    goToRitualsPage();
}

function removeRitual(index) {
    if (confirm('Tem certeza que deseja remover este ritual/pacto da ficha?')) {
        rituals.splice(index, 1);
        updateRitualsDisplay();
        saveCharacterData();
        
        // Atualizar também o localStorage da página de poderes
        updatePowersStorage();
    }
}

function goToRitualsPage() {
    saveCharacterData();
    window.location.href = "../index/index_poderes.html";
}

function updatePowersStorage() {
    try {
        // Converter rituais para o formato da página de poderes
        const powersFormat = rituals.map(ritual => ({
            nome: ritual.nome,
            imagem: ritual.imagem,
            descricao: ritual.descricao,
            tipo: ritual.tipo,
            elemento: ritual.elemento,
            nivel: ritual.nivel
        }));
        
        localStorage.setItem(RITUALS_STORAGE_KEY, JSON.stringify(powersFormat));
    } catch (error) {
        console.error('Erro ao atualizar storage de poderes:', error);
    }
}

// ==============================================
// SISTEMA DE ARMAS (MANTIDO)
// ==============================================

function loadWeaponsFromStorage() {
    try {
        const armasSalvas = localStorage.getItem(WEAPONS_STORAGE_KEY);
        if (armasSalvas) {
            const armasCarregadas = JSON.parse(armasSalvas);
            
            // Limpar armas antigas
            weapons = [];
            
            // Converter armas da página para o formato da ficha
            armasCarregadas.forEach(arma => {
                // Função para processar modificadores
                const processModificadores = (modData) => {
                    if (!modData) return [];
                    
                    // Se for string, tentar parsear como JSON
                    if (typeof modData === 'string') {
                        try {
                            const parsed = JSON.parse(modData);
                            return Array.isArray(parsed) ? parsed : [parsed];
                        } catch (e) {
                            // Se não for JSON, tratar como array com um item
                            return [modData];
                        }
                    }
                    // Se já for array
                    else if (Array.isArray(modData)) {
                        return modData;
                    }
                    // Se for objeto único
                    else if (typeof modData === 'object' && modData !== null) {
                        return [modData];
                    }
                    // Qualquer outro caso
                    return [];
                };
                
                const novaArma = {
                    id: arma.id || `arma-${Date.now()}-${Math.random()}`,
                    name: arma.nome || arma.name || 'Arma sem nome',
                    type: getWeaponType(arma),
                    description: arma.descricao || arma.description || '',
                    damage: arma.dano || arma.damage || 'Desconhecido',
                    ct: arma.ct || 'N/A',
                    dct: arma.dct || 'N/A',
                    passive: arma.passiva || arma.passive || '',
                    modifiers: arma.modificadoresResumo || arma.modificadores || '',
                    criticals: arma.criticos || '',
                    raridade: arma.raridade || '',
                    resistence: arma.resistencia || '',
                    origem: arma.origem || 'arsenal',
                    personalizada: arma.personalizada || false,
                    // Processar modificadores corretamente
                    modificadoresLista: processModificadores(arma.modificadoresLista || arma.modificadores),
                    passivaRadiante: arma.passivaRadiante || '',
                    passivaTek: arma.passivaTek || ''
                };
                
                weapons.push(novaArma);
            });
            
            console.log(`${weapons.length} armas carregadas da página de itens`);
            
            // Debug para verificar o que foi carregado
            console.log('Armas carregadas:', weapons);
            
            updateArsenalDisplay();
        }
    } catch (error) {
        console.error('Erro ao carregar armas do storage:', error);
    }
}

function getWeaponType(arma) {
    // Determinar tipo baseado no nome ou características
    if (arma.nome) {
        const nomeLower = arma.nome.toLowerCase();
        if (nomeLower.includes('espada')) return 'arma_branca';
        if (nomeLower.includes('machado')) return 'arma_branca';
        if (nomeLower.includes('martelo')) return 'arma_branca';
        if (nomeLower.includes('lanca') || nomeLower.includes('lança')) return 'arma_branca';
        if (nomeLower.includes('arco')) return 'arma_distancia';
        if (nomeLower.includes('pistola') || nomeLower.includes('revólver')) return 'arma_fogo';
        if (nomeLower.includes('rifle') || nomeLower.includes('espingarda')) return 'arma_fogo';
        if (nomeLower.includes('metralhadora') || nomeLower.includes('smg')) return 'arma_fogo';
        if (nomeLower.includes('granada')) return 'arma_explosiva';
        if (nomeLower.includes('escudo')) return 'defesa';
    }
    return 'arma_branca';
}

function updateArsenalDisplay() {
    const container = document.getElementById('arsenalContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (weapons.length === 0) {
        container.innerHTML = '<p class="no-bonuses">Nenhuma arma adicionada</p>';
        return;
    }
    
    weapons.forEach((weapon, index) => {
        const weaponDiv = document.createElement('div');
        weaponDiv.className = 'weapon-item';
        weaponDiv.id = `weapon-${weapon.id}`;
        
        // Determinar classe de raridade
        let raridadeClass = '';
        if (weapon.raridade) {
            raridadeClass = weapon.raridade.toLowerCase();
        }
        
        // Construir HTML dos modificadores - CORREÇÃO DEFINITIVA
        let modificadoresHTML = '';
        
        // DEBUG: Verificar o que está chegando
        console.log('DEBUG - Arma:', weapon.name);
        console.log('DEBUG - modificadoresLista:', weapon.modificadoresLista);
        console.log('DEBUG - tipo:', typeof weapon.modificadoresLista);
        
        // Verificar se há modificadoresLista
        if (weapon.modificadoresLista) {
            let modificadoresProcessados = [];
            
            // Se for uma string, tentar parsear JSON
            if (typeof weapon.modificadoresLista === 'string') {
                try {
                    const parsed = JSON.parse(weapon.modificadoresLista);
                    if (Array.isArray(parsed)) {
                        modificadoresProcessados = parsed;
                    } else if (typeof parsed === 'object' && parsed !== null) {
                        modificadoresProcessados = [parsed];
                    }
                } catch (e) {
                    console.error('Erro ao parsear string como JSON:', e);
                    // Se não for JSON válido, tratar como string normal
                    modificadoresProcessados = [weapon.modificadoresLista];
                }
            }
            // Se já for um array
            else if (Array.isArray(weapon.modificadoresLista)) {
                modificadoresProcessados = weapon.modificadoresLista;
            }
            // Se for um objeto único
            else if (typeof weapon.modificadoresLista === 'object' && weapon.modificadoresLista !== null) {
                modificadoresProcessados = [weapon.modificadoresLista];
            }
            
            console.log('DEBUG - modificadoresProcessados:', modificadoresProcessados);
            
            // Se tiver modificadores processados
            if (modificadoresProcessados.length > 0) {
                modificadoresHTML = `
                    <div class="weapon-modifiers">
                        <h5><i class="fas fa-tools"></i> Modificadores (${modificadoresProcessados.length}):</h5>
                        <div class="modifiers-grid">
                            ${modificadoresProcessados.map((mod, idx) => {
                                // Se for um objeto válido
                                if (mod && typeof mod === 'object') {
                                    const nome = mod.nome || `Modificador ${idx + 1}`;
                                    const efeito = mod.efeito || '';
                                    const descricao = mod.descricao || '';
                                    
                                    return `
                                        <div class="modifier-card">
                                            <div class="modifier-header">
                                                <div class="modifier-icon">
                                                    <i class="fas fa-cog"></i>
                                                </div>
                                                <div class="modifier-info">
                                                    <h6 class="modifier-name">${nome}</h6>
                                                    <span class="modifier-effect">${efeito}</span>
                                                </div>
                                            </div>
                                            ${descricao ? `
                                                <div class="modifier-description">
                                                    <p>${descricao}</p>
                                                </div>
                                            ` : ''}
                                        </div>
                                    `;
                                }
                                // Se for string
                                else if (typeof mod === 'string') {
                                    return `
                                        <div class="modifier-card">
                                            <div class="modifier-header">
                                                <div class="modifier-icon">
                                                    <i class="fas fa-cog"></i>
                                                </div>
                                                <div class="modifier-info">
                                                    <h6 class="modifier-name">Modificador ${idx + 1}</h6>
                                                    <span class="modifier-effect">${mod}</span>
                                                </div>
                                            </div>
                                        </div>
                                    `;
                                }
                                // Qualquer outro tipo
                                else {
                                    return `
                                        <div class="modifier-card">
                                            <div class="modifier-header">
                                                <div class="modifier-icon">
                                                    <i class="fas fa-cog"></i>
                                                </div>
                                                <div class="modifier-info">
                                                    <h6 class="modifier-name">Modificador ${idx + 1}</h6>
                                                    <span class="modifier-effect">${String(mod)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    `;
                                }
                            }).join('')}
                        </div>
                    </div>
                `;
            }
        }
        // Se não tiver modificadoresLista, verificar a propriedade antiga 'modifiers'
        else if (weapon.modifiers && weapon.modifiers.trim() !== '') {
            console.log('DEBUG - Usando property antiga "modifiers":', weapon.modifiers);
            
            // Tentar parsear se parecer JSON
            if (weapon.modifiers.trim().startsWith('[') || weapon.modifiers.trim().startsWith('{')) {
                try {
                    const parsed = JSON.parse(weapon.modifiers);
                    let modificadoresProcessados = [];
                    
                    if (Array.isArray(parsed)) {
                        modificadoresProcessados = parsed;
                    } else if (typeof parsed === 'object' && parsed !== null) {
                        modificadoresProcessados = [parsed];
                    }
                    
                    if (modificadoresProcessados.length > 0) {
                        modificadoresHTML = `
                            <div class="weapon-modifiers">
                                <h5><i class="fas fa-tools"></i> Modificadores (${modificadoresProcessados.length}):</h5>
                                <div class="modifiers-grid">
                                    ${modificadoresProcessados.map((mod, idx) => {
                                        if (mod && typeof mod === 'object') {
                                            const nome = mod.nome || `Modificador ${idx + 1}`;
                                            const efeito = mod.efeito || '';
                                            const descricao = mod.descricao || '';
                                            
                                            return `
                                                <div class="modifier-card">
                                                    <div class="modifier-header">
                                                        <div class="modifier-icon">
                                                            <i class="fas fa-cog"></i>
                                                        </div>
                                                        <div class="modifier-info">
                                                            <h6 class="modifier-name">${nome}</h6>
                                                            <span class="modifier-effect">${efeito}</span>
                                                        </div>
                                                    </div>
                                                    ${descricao ? `
                                                        <div class="modifier-description">
                                                            <p>${descricao}</p>
                                                        </div>
                                                    ` : ''}
                                                </div>
                                            `;
                                        } else {
                                            return `
                                                <div class="modifier-card">
                                                    <div class="modifier-header">
                                                        <div class="modifier-icon">
                                                            <i class="fas fa-cog"></i>
                                                        </div>
                                                        <div class="modifier-info">
                                                            <h6 class="modifier-name">Modificador ${idx + 1}</h6>
                                                            <span class="modifier-effect">${String(mod)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            `;
                                        }
                                    }).join('')}
                                </div>
                            </div>
                        `;
                    }
                } catch (e) {
                    console.error('Não é JSON válido, mostrando como texto:', e);
                    modificadoresHTML = `
                        <div class="weapon-modifiers">
                            <h5><i class="fas fa-tools"></i> Modificadores:</h5>
                            <div class="modifier-text">
                                <p>${weapon.modifiers}</p>
                            </div>
                        </div>
                    `;
                }
            } else {
                // Se for texto simples
                modificadoresHTML = `
                    <div class="weapon-modifiers">
                        <h5><i class="fas fa-tools"></i> Modificadores:</h5>
                        <div class="modifier-text">
                            <p>${weapon.modifiers}</p>
                        </div>
                    </div>
                `;
            }
        }
        
        // Construir HTML das passivas
        let passivasHTML = '';
        if (weapon.passive) {
            passivasHTML += `
                <div class="weapon-passive">
                    <h5><i class="fas fa-star"></i> Passiva:</h5>
                    <p>${weapon.passive}</p>
                </div>
            `;
        }
        
        if (weapon.passivaRadiante) {
            passivasHTML += `
                <div class="weapon-passive radiante">
                    <h5><i class="fas fa-sun"></i> Passiva Radiante:</h5>
                    <p>${weapon.passivaRadiante}</p>
                </div>
            `;
        }
        
        if (weapon.passivaTek) {
            passivasHTML += `
                <div class="weapon-passive tek">
                    <h5><i class="fas fa-microchip"></i> Passiva Tek:</h5>
                    <p>${weapon.passivaTek}</p>
                </div>
            `;
        }
        
        weaponDiv.innerHTML = `
            <button onclick="removeWeapon('${weapon.id}')" class="remove-weapon">
                <i class="fas fa-times"></i>
            </button>
            <div class="weapon-header">
                <div class="weapon-name-container">
                    <input type="text" value="${weapon.name}" 
                           class="weapon-name-input" 
                           onchange="updateWeapon('${weapon.id}', 'name', this.value)"
                           placeholder="Nome da Arma">
                    ${weapon.raridade ? `<span class="weapon-rarity ${raridadeClass}">${weapon.raridade.toUpperCase()}</span>` : ''}
                </div>
                <div class="weapon-type-select">
                    <select onchange="updateWeapon('${weapon.id}', 'type', this.value)">
                        <option value="arma_branca" ${weapon.type === 'arma_branca' ? 'selected' : ''}>Arma Branca</option>
                        <option value="arma_fogo" ${weapon.type === 'arma_fogo' ? 'selected' : ''}>Arma de Fogo</option>
                        <option value="arma_arcana" ${weapon.type === 'arma_arcana' ? 'selected' : ''}>Arma Arcana</option>
                        <option value="arma_explosiva" ${weapon.type === 'arma_explosiva' ? 'selected' : ''}>Arma Explosiva</option>
                        <option value="arma_distancia" ${weapon.type === 'arma_distancia' ? 'selected' : ''}>Arma à Distância</option>
                        <option value="defesa" ${weapon.type === 'defesa' ? 'selected' : ''}>Defesa</option>
                        <option value="especial" ${weapon.type === 'especial' ? 'selected' : ''}>Especial</option>
                    </select>
                </div>
            </div>
            
            <div class="form-group">
                <textarea placeholder="Descrição da arma..." 
                          onchange="updateWeapon('${weapon.id}', 'description', this.value)"
                          rows="2">${weapon.description}</textarea>
            </div>
            
            <div class="weapon-stats">
                <div class="stat-item">
                    <span class="stat-label">Dano:</span>
                    <input type="text" value="${weapon.damage}" 
                           class="stat-value-input" 
                           onchange="updateWeapon('${weapon.id}', 'damage', this.value)"
                           placeholder="Ex: 1d6">
                </div>
                <div class="stat-item">
                    <span class="stat-label">CT:</span>
                    <input type="number" value="${weapon.ct}" 
                           class="stat-value-input" 
                           onchange="updateWeapon('${weapon.id}', 'ct', this.value)"
                           min="0" max="30" placeholder="0-30">
                </div>
                <div class="stat-item">
                    <span class="stat-label">DCT:</span>
                    <input type="number" value="${weapon.dct}" 
                           class="stat-value-input" 
                           onchange="updateWeapon('${weapon.id}', 'dct', this.value)"
                           min="0" max="30" placeholder="0-30">
                </div>
                ${weapon.criticals ? `
                    <div class="stat-item">
                        <span class="stat-label">Críticos:</span>
                        <input type="text" value="${weapon.criticals}" 
                               class="stat-value-input" 
                               onchange="updateWeapon('${weapon.id}', 'criticals', this.value)"
                               placeholder="Ex: +3D6">
                    </div>
                ` : ''}
                ${weapon.resistence ? `
                    <div class="stat-item">
                        <span class="stat-label">Resistência:</span>
                        <input type="text" value="${weapon.resistence}" 
                               class="stat-value-input" 
                               onchange="updateWeapon('${weapon.id}', 'resistence', this.value)"
                               placeholder="Ex: Dt:10">
                    </div>
                ` : ''}
            </div>
            
            ${modificadoresHTML}
            
            ${passivasHTML}
            
            <div class="weapon-origin">
                <small><i class="fas fa-map-marker-alt"></i> Origem: ${weapon.origem === 'forja' ? 'Arma Personalizada' : 'Arsenal Padrão'}</small>
            </div>
        `;
        container.appendChild(weaponDiv);
    });
}

// Função de debug para verificar os dados
function debugWeaponsData() {
    console.log('=== DEBUG DE ARMAS ===');
    weapons.forEach((weapon, index) => {
        console.log(`Arma ${index + 1}: ${weapon.name}`);
        console.log('modificadoresLista:', weapon.modificadoresLista);
        console.log('Tipo:', typeof weapon.modificadoresLista);
        
        if (weapon.modificadoresLista) {
            if (typeof weapon.modificadoresLista === 'string') {
                console.log('É string, tentando parsear...');
                try {
                    const parsed = JSON.parse(weapon.modificadoresLista);
                    console.log('Parseado:', parsed);
                } catch (e) {
                    console.log('Não é JSON válido');
                }
            } else if (Array.isArray(weapon.modificadoresLista)) {
                console.log('É array, tamanho:', weapon.modificadoresLista.length);
                console.log('Primeiro item:', weapon.modificadoresLista[0]);
            }
        }
        console.log('---');
    });
}

// Chame esta função após carregar as armas para debug
// debugWeaponsData();

function addWeapon() {
    weapons.push({
        id: `manual-${Date.now()}`,
        name: 'Nova Arma',
        type: 'arma_branca',
        description: '',
        damage: '1d6',
        ct: 10,
        dct: 15,
        passive: '',
        modifiers: '',
        criticals: '',
        raridade: '',
        resistence: '',
        origem: 'manual',
        personalizada: false
    });
    
    updateArsenalDisplay();
    saveCharacterData();
}

function removeWeapon(id) {
    weapons = weapons.filter(weapon => weapon.id !== id);
    updateArsenalDisplay();
    saveCharacterData();
}

function updateWeapon(id, field, value) {
    const weapon = weapons.find(w => w.id === id);
    if (weapon) {
        weapon[field] = value;
        
        // Atualizar visualização imediata
        const weaponDiv = document.getElementById(`weapon-${id}`);
        if (weaponDiv && field === 'name') {
            const nameInput = weaponDiv.querySelector('.weapon-name-input');
            if (nameInput) {
                nameInput.value = value;
            }
        }
        
        saveCharacterData();
    }
}

function goToArsenalPage() {
    saveCharacterData();
    window.location.href = "../index/index_itens.html";
}

// ==============================================
// SISTEMA DE LOGIN (MANTIDO)
// ==============================================

function loginUser(username) {
    if (!username || username.trim() === '') {
        alert('Por favor, digite um nome de usuário.');
        return;
    }
    
    currentUser = username.trim();
    localStorage.setItem('arkCurrentUser', currentUser);
    updateLoginDisplay();
    alert(`Bem-vindo, ${currentUser}!`);
}

function logoutUser() {
    if (confirm('Deseja sair?')) {
        currentUser = null;
        localStorage.removeItem('arkCurrentUser');
        updateLoginDisplay();
        alert('Você foi desconectado.');
    }
}

function updateLoginDisplay() {
    const loginStatus = document.getElementById('loginStatus');
    if (!loginStatus) return;
    
    if (currentUser) {
        loginStatus.innerHTML = `
            <span>Logado como: <strong>${currentUser}</strong></span>
            <button onclick="logoutUser()" class="logout-btn">Sair</button>
        `;
    } else {
        loginStatus.innerHTML = `
            <input type="text" id="usernameInput" placeholder="Nome de usuário">
            <button onclick="loginUser(document.getElementById('usernameInput').value)" class="login-btn">Entrar</button>
        `;
    }
}

function getLoggedInUser() {
    currentUser = localStorage.getItem('arkCurrentUser');
    if (currentUser) {
        updateLoginDisplay();
    }
}

// ==============================================
// SISTEMA DE ATRIBUTOS (MANTIDO)
// ==============================================

function changeAttribute(attributeName, change) {
    const currentValue = attributesBase[attributeName];
    const totalAllowedPoints = initialDistributablePoints + bonusPointsFromLevel;
    const currentDistributedPoints = calculateCurrentDistributedPoints();
    const remainingPoints = totalAllowedPoints - currentDistributedPoints;
    
    if (currentValue + change < 1) return;
    if (change > 0 && remainingPoints <= 0) {
        alert('Você não tem mais pontos de atributo disponíveis!');
        return;
    }
    
    attributesBase[attributeName] += change;
    updateAttributesDisplay();
    updateAttributePointsDisplay();
    
    // SALVAR APÓS MUDAR ATRIBUTO
    saveCharacterData();
}

function calculateCurrentDistributedPoints() {
    return Object.values(attributesBase).reduce((sum, val) => sum + (val - 1), 0);
}

function updateAttributesDisplay() {
    for (const key in attributesBase) {
        attributes[key] = attributesBase[key];
        const element = document.getElementById(`${key}Value`);
        if (element) {
            element.textContent = attributes[key];
        }
    }
}

function updateAttributePointsDisplay() {
    const totalAllowedPoints = initialDistributablePoints + bonusPointsFromLevel;
    const currentDistributedPoints = calculateCurrentDistributedPoints();
    const remainingPoints = totalAllowedPoints - currentDistributedPoints;
    
    const availablePointsSpan = document.getElementById('availableAttributePoints');
    if (availablePointsSpan) {
        availablePointsSpan.textContent = remainingPoints;
        availablePointsSpan.style.color = remainingPoints >= 0 ? '#27ae60' : '#e74c3c';
    }
}

// ==============================================
// SISTEMA DE NÍVEL (MANTIDO)
// ==============================================

function validateLevelInput() {
    const levelInput = document.getElementById('level');
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
    
    updateAttributePointsDisplay();
    updateLevelBar();
    updateCenterLevel();
    updatePrimalMutationStage();
    updateBonusSlots();
    updateRitualsDisplay(); // Atualizar validação de rituais quando o nível mudar
    saveCharacterData();
}

function updateLevelBar() {
    const levelInput = document.getElementById('level');
    const level = parseInt(levelInput.value) || 1;
    const levelBarFill = document.getElementById('levelBarFill');
    const levelBarFillCenter = document.getElementById('levelBarFillCenter');
    
    if (levelBarFill) {
        levelBarFill.style.width = level + '%';
    }
    
    if (levelBarFillCenter) {
        levelBarFillCenter.style.width = level + '%';
    }
}

function updateCenterLevel() {
    const levelInput = document.getElementById('level');
    const level = parseInt(levelInput.value) || 1;
    const centerLevelValue = document.getElementById('centerLevelValue');
    
    if (centerLevelValue) {
        centerLevelValue.textContent = level;
    }
}

// ==============================================
// SISTEMA DE FOTO (MANTIDO)
// ==============================================

function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const preview = document.getElementById('preview');
        const centerPreview = document.getElementById('centerPreview');
        const photoPreview = document.getElementById('photoPreview');
        const placeholder = photoPreview.querySelector('.photo-placeholder');
        const centerPlaceholder = document.querySelector('.center-placeholder');
        
        preview.src = e.target.result;
        preview.style.display = 'block';
        if (placeholder) placeholder.style.display = 'none';
        
        centerPreview.src = e.target.result;
        centerPreview.style.display = 'block';
        if (centerPlaceholder) centerPlaceholder.style.display = 'none';
    };
    
    reader.readAsDataURL(file);
}

// ==============================================
// SISTEMA DE MUTAÇÃO (MANTIDO)
// ==============================================

// Modificar a função addMutationSlot para inicializar stats corretamente
function addMutationSlot() {
    const newMutation = {
        id: Date.now(),
        name: 'Nova Mutação',
        type: 'colosso',
        description: '',
        source: '',
        stage: 1,
        fixed: false,
        stats: {
            vida: 0,
            sanidade: 0,
            armadura: 0,
            folego: 0,
            resistencia: 0
        },
        bonuses: []
    };
    
    characterMutations.push(newMutation);
    renderMutations();
    
    // Salvar após adicionar
    setTimeout(saveCharacterData, 100);
}

// Modificar a função removeMutationSlot para salvar
function removeMutationSlot(id) {
    if (id === 0) {
        alert('A mutação primal não pode ser removida!');
        return;
    }
    
    characterMutations = characterMutations.filter(mut => mut.id !== id);
    renderMutations();
    saveCharacterData();
}

// ==============================================
// FUNÇÃO DE DEBUG
// ==============================================

function debugPrimalSystem() {
    console.log('=== DEBUG DO SISTEMA PRIMAL ===');
    
    // Verificar inputs
    const inputs = [
        'primalVida', 'primalSanidade', 'primalArmadura', 
        'primalFolego', 'primalResistencia', 'primalDescription'
    ];
    
    inputs.forEach(id => {
        const element = document.getElementById(id);
        console.log(`📋 ${id}:`, {
            existe: !!element,
            valor: element?.value,
            type: element?.type
        });
    });
    
    // Verificar objeto primal
    const primal = characterMutations.find(m => m.id === 0);
    console.log('🧬 Objeto primal:', primal);
    console.log('📊 Stats da primal:', primal?.stats);
    
    // Verificar event listeners
    const primalVidaInput = document.getElementById('primalVida');
    if (primalVidaInput) {
        const listeners = getEventListeners(primalVidaInput);
        console.log('🎯 Listeners do primalVida:', listeners);
    }
    
    console.log('=== FIM DEBUG ===');
}


// ==============================================
// CORREÇÃO DA FUNÇÃO renderMutations()
// ==============================================

function renderMutations() {
    const additionalMutations = document.getElementById('additionalMutations');
    const mutationCount = document.getElementById('mutationCount');
    
    if (!additionalMutations || !mutationCount) return;
    
    // Atualizar mutação primal
    const primalStage = document.getElementById('primalStage');
    const primalMutation = characterMutations.find(m => m.id === 0);
    
    if (primalStage && primalMutation) {
        primalStage.textContent = primalMutation.stage;
    }
    
    // 🔥 CONFIGURAR LISTENERS DA PRIMAL APÓS RENDERIZAR
    setTimeout(setupAllPrimalListeners, 100);
    
    // Renderizar mutações adicionais
    additionalMutations.innerHTML = '';
    const additionalMuts = characterMutations.filter(m => m.id !== 0);
    
    additionalMuts.forEach(mutation => {
        const mutationDiv = document.createElement('div');
        mutationDiv.className = 'mutation-slot';
        mutationDiv.id = `mutation-${mutation.id}`;
        mutationDiv.innerHTML = `
            <div class="mutation-header">
                <div class="mutation-title">
                    <h3>${mutation.name}</h3>
                </div>
                <div class="mutation-actions">
                    <span class="mutation-type" id="mutation-type-${mutation.id}">${mutation.type.toUpperCase()}</span>
                    <button onclick="removeMutationSlot(${mutation.id})" class="remove-mutation">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
            <div class="mutation-fields">
                <div class="form-group">
                    <input type="text" value="${mutation.name}" 
                           placeholder="Nome da Mutação" 
                           class="mutation-input mutation-name-input"
                           data-id="${mutation.id}">
                </div>
                <div class="form-group">
                    <select class="mutation-type-select" data-id="${mutation.id}">
                        <option value="colosso" ${mutation.type === 'colosso' ? 'selected' : ''}>Colosso</option>
                        <option value="pacto" ${mutation.type === 'pacto' ? 'selected' : ''}>Pacto</option>
                        <option value="joia" ${mutation.type === 'joia' ? 'selected' : ''}>Jóia</option>
                        <option value="boss" ${mutation.type === 'boss' ? 'selected' : ''}>Boss</option>
                    </select>
                </div>
                <div class="form-group">
                    <textarea placeholder="Descrição (Benefício + Contraparte)" 
                              class="mutation-description-input"
                              data-id="${mutation.id}"
                              rows="3">${mutation.description}</textarea>
                </div>
                <div class="form-group">
                    <input type="text" value="${mutation.source}" 
                           placeholder="Origem/Fonte" 
                           class="mutation-source-input"
                           data-id="${mutation.id}">
                </div>
            </div>
            
            <!-- Blocos de Status Adicionais -->
            <div class="mutation-stats-section">
                <h4><i class="fas fa-chart-line"></i> Status Adicionais</h4>
                <div class="mutation-stats-grid">
                    <div class="mutation-stat-item">
                        <label><i class="fas fa-heart"></i> Vida Extra:</label>
                        <input type="number" min="0" value="${mutation.stats?.vida || 0}" 
                               class="mutation-stat-input" 
                               data-id="${mutation.id}"
                               data-stat="vida">
                        <span class="stat-unit">HP</span>
                    </div>
                    
                    <div class="mutation-stat-item">
                        <label><i class="fas fa-brain"></i> Sanidade Extra:</label>
                        <input type="number" min="0" value="${mutation.stats?.sanidade || 0}" 
                               class="mutation-stat-input" 
                               data-id="${mutation.id}"
                               data-stat="sanidade">
                        <span class="stat-unit">SP</span>
                    </div>
                    
                    <div class="mutation-stat-item">
                        <label><i class="fas fa-shield-alt"></i> Armadura Extra:</label>
                        <input type="number" min="0" value="${mutation.stats?.armadura || 0}" 
                               class="mutation-stat-input" 
                               data-id="${mutation.id}"
                               data-stat="armadura">
                        <span class="stat-unit">ARM</span>
                    </div>
                    
                    <div class="mutation-stat-item">
                        <label><i class="fas fa-wind"></i> Fôlego Extra:</label>
                        <input type="number" min="0" value="${mutation.stats?.folego || 0}" 
                               class="mutation-stat-input" 
                               data-id="${mutation.id}"
                               data-stat="folego">
                        <span class="stat-unit">FOL</span>
                    </div>
                    
                    <div class="mutation-stat-item">
                        <label><i class="fas fa-dumbbell"></i> Resistência Extra:</label>
                        <input type="number" min="0" value="${mutation.stats?.resistencia || 0}" 
                               class="mutation-stat-input" 
                               data-id="${mutation.id}"
                               data-stat="resistencia">
                        <span class="stat-unit">RES</span>
                    </div>
                </div>
            </div>
            
            <!-- Bônus de Ação da Mutação -->
            <div class="mutation-bonus-section">
                <h4><i class="fas fa-plus-circle"></i> Bônus de Ação da Mutação</h4>
                <div class="mutation-bonus-controls">
                    <button type="button" onclick="addMutationBonus(${mutation.id})" class="btn-add-small">
                        <i class="fas fa-plus"></i> Adicionar Bônus
                    </button>
                    <span class="mutation-bonus-counter">Bônus: <span id="mutationBonusCount-${mutation.id}">${mutation.bonuses?.length || 0}</span></span>
                </div>
                <div id="mutationBonuses-${mutation.id}" class="mutation-bonuses-list">
                    <!-- Bônus serão renderizados aqui -->
                </div>
            </div>
        `;
        additionalMutations.appendChild(mutationDiv);
        
        // Adicionar event listeners após criar o elemento
        setupMutationEventListeners(mutation.id);
        
        // Renderizar bônus desta mutação
        renderMutationBonuses(mutation.id);
    });
    
    mutationCount.textContent = characterMutations.length;
} // FALTAVA ESTE FECHAMENTO DE CHAVE

// NOVA FUNÇÃO: Debug para verificar o estado da primal
function debugPrimalStatus() {
    const primalMutation = characterMutations.find(m => m.id === 0);
    console.log('=== DEBUG PRIMAL ===');
    console.log('Objeto primal:', primalMutation);
    console.log('Stats da primal:', primalMutation?.stats);
    
    // Verificar inputs
    const inputs = ['primalVida', 'primalSanidade', 'primalArmadura', 'primalFolego', 'primalResistencia'];
    inputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            console.log(`${id}: ${input.value} (type: ${typeof input.value})`);
        }
    });
}


// Adicionar event listeners específicos para a primal
function setupPrimalEventListeners() {
    const primalStats = ['Vida', 'Sanidade', 'Armadura', 'Folego', 'Resistencia'];
    
    primalStats.forEach(stat => {
        const inputId = `primal${stat}`;
        const input = document.getElementById(inputId);
        
        if (input) {
            // Remover event listeners antigos
            input.onchange = null;
            input.oninput = null;
            
            // Adicionar novos listeners
            input.oninput = function() {
                updateMutationStat(0, stat.toLowerCase(), this.value);
            };
            
            input.onchange = function() {
                updateMutationStat(0, stat.toLowerCase(), this.value);
            };
            
            console.log(`Listener adicionado para: ${inputId}`);
        }
    });
    
    // Descrição da primal
    const primalDesc = document.getElementById('primalDescription');
    if (primalDesc) {
        primalDesc.oninput = function() {
            updateMutation(0, 'description', this.value);
        };
    }
}


// NOVA FUNÇÃO: Configurar event listeners para mutação
function setupMutationEventListeners(mutationId) {
    // Nome
    const nameInput = document.querySelector(`#mutation-${mutationId} .mutation-name-input`);
    if (nameInput) {
        nameInput.oninput = function() {
            updateMutation(mutationId, 'name', this.value);
        };
    }
    
    // Tipo
    const typeSelect = document.querySelector(`#mutation-${mutationId} .mutation-type-select`);
    if (typeSelect) {
        typeSelect.onchange = function() {
            updateMutationType(mutationId, this.value);
        };
    }
    
    // Descrição
    const descInput = document.querySelector(`#mutation-${mutationId} .mutation-description-input`);
    if (descInput) {
        descInput.oninput = function() {
            updateMutation(mutationId, 'description', this.value);
        };
    }
    
    // Fonte
    const sourceInput = document.querySelector(`#mutation-${mutationId} .mutation-source-input`);
    if (sourceInput) {
        sourceInput.oninput = function() {
            updateMutation(mutationId, 'source', this.value);
        };
    }
    
    // Status (o mais importante - estava faltando!)
    const statInputs = document.querySelectorAll(`#mutation-${mutationId} .mutation-stat-input`);
    statInputs.forEach(input => {
        input.oninput = function() {
            const mutationId = parseInt(this.dataset.id);
            const stat = this.dataset.stat;
            const value = parseInt(this.value) || 0;
            
            // Atualizar o objeto mutation
            const mutation = characterMutations.find(m => m.id === mutationId);
            if (mutation) {
                if (!mutation.stats) {
                    mutation.stats = {
                        vida: 0,
                        sanidade: 0,
                        armadura: 0,
                        folego: 0,
                        resistencia: 0
                    };
                }
                mutation.stats[stat] = value;
                
                // Salvar imediatamente
                saveCharacterData();
                
                console.log(`Status salvo: ${mutation.name} - ${stat}: ${value}`);
            }
        };
    });
}

// Nova função para renderizar bônus de uma mutação específica
function renderMutationBonuses(mutationId) {
    const container = document.getElementById(`mutationBonuses-${mutationId}`);
    const counter = document.getElementById(`mutationBonusCount-${mutationId}`);
    const mutation = characterMutations.find(m => m.id === mutationId);
    
    if (!container || !mutation) return;
    
    container.innerHTML = '';
    
    if (mutation.bonuses && mutation.bonuses.length > 0) {
        mutation.bonuses.forEach((bonus, index) => {
            const bonusDiv = document.createElement('div');
            bonusDiv.className = 'mutation-bonus-item';
            bonusDiv.innerHTML = `
                <div class="mutation-bonus-name">
                    <input type="text" value="${bonus.action}" 
                           placeholder="Nome da ação" 
                           onchange="updateMutationBonus(${mutationId}, ${index}, 'action', this.value)">
                </div>
                <div class="mutation-bonus-value">
                    <select onchange="updateMutationBonus(${mutationId}, ${index}, 'value', parseInt(this.value))">
                        <option value="5" ${bonus.value === 5 ? 'selected' : ''}>+5</option>
                        <option value="10" ${bonus.value === 10 ? 'selected' : ''}>+10</option>
                        <option value="15" ${bonus.value === 15 ? 'selected' : ''}>+15</option>
                        <option value="20" ${bonus.value === 20 ? 'selected' : ''}>+20</option>
                        <option value="25" ${bonus.value === 25 ? 'selected' : ''}>+25</option>
                    </select>
                </div>
                <button onclick="removeMutationBonus(${mutationId}, ${index})" class="mutation-bonus-remove">
                    <i class="fas fa-times"></i>
                </button>
            `;
            container.appendChild(bonusDiv);
        });
    }
    
    if (counter) {
        counter.textContent = mutation.bonuses ? mutation.bonuses.length : 0;
    }
}
// Nova função para adicionar bônus a uma mutação
function addMutationBonus(mutationId) {
    const mutation = characterMutations.find(m => m.id === mutationId);
    if (!mutation) return;
    
    if (!mutation.bonuses) {
        mutation.bonuses = [];
    }
    
    mutation.bonuses.push({
        id: `mut-bonus-${mutationId}-${Date.now()}`,
        action: 'Nova Ação',
        value: 5,
        mutationId: mutationId,
        mutationName: mutation.name
    });
    
    renderMutationBonuses(mutationId);
    updateBonusTables();
    saveCharacterData();
}

// Nova função para remover bônus de uma mutação
function removeMutationBonus(mutationId, bonusIndex) {
    const mutation = characterMutations.find(m => m.id === mutationId);
    if (!mutation || !mutation.bonuses) return;
    
    mutation.bonuses.splice(bonusIndex, 1);
    renderMutationBonuses(mutationId);
    updateBonusTables();
    saveCharacterData();
}

// Nova função para atualizar bônus de mutação
function updateMutationBonus(mutationId, bonusIndex, field, value) {
    const mutation = characterMutations.find(m => m.id === mutationId);
    if (!mutation || !mutation.bonuses || !mutation.bonuses[bonusIndex]) return;
    
    mutation.bonuses[bonusIndex][field] = value;
    updateBonusTables();
    saveCharacterData();
}

function updateMutationStat(mutationId, stat, value) {
    console.log(`📝 Atualizando stat: ${stat} = ${value} para mutação ${mutationId}`);
    
    const mutation = characterMutations.find(m => m.id === mutationId);
    if (!mutation) {
        console.error('❌ Mutação não encontrada:', mutationId);
        
        // Se for primal e não existir, criar
        if (mutationId === 0) {
            console.log('⚠️ Criando primal porque não foi encontrada');
            characterMutations.unshift({
                id: 0,
                name: "MUTAÇÃO PRIMAL",
                type: "primal",
                description: "",
                source: "Origem do Personagem",
                stage: 1,
                fixed: true,
                stats: {
                    vida: 0,
                    sanidade: 0,
                    armadura: 0,
                    folego: 0,
                    resistencia: 0
                },
                bonuses: []
            });
            
            // Chamar novamente com a primal criada
            return updateMutationStat(0, stat, value);
        }
        return;
    }
    
    // Garantir que stats exista
    if (!mutation.stats) {
        mutation.stats = {
            vida: 0,
            sanidade: 0,
            armadura: 0,
            folego: 0,
            resistencia: 0
        };
    }
    
    const numericValue = parseInt(value) || 0;
    mutation.stats[stat] = numericValue;
    
    console.log(`✅ Stat atualizado:`, mutation.stats);
    
    // Para a primal, também atualizar o input HTML (sincronização bidirecional)
    if (mutationId === 0) {
        const inputId = `primal${stat.charAt(0).toUpperCase() + stat.slice(1)}`;
        const input = document.getElementById(inputId);
        if (input && input.value !== String(numericValue)) {
            input.value = numericValue;
            console.log(`✅ Input ${inputId} sincronizado: ${numericValue}`);
        }
    }
    
    // SALVAR IMEDIATAMENTE
    setTimeout(() => {
        saveCharacterData();
    }, 50);
}

// ==============================================
// FUNÇÃO PARA SINCRONIZAR PRIMAL EM TEMPO REAL
// ==============================================

// ==============================================
// FUNÇÃO PARA SINCRONIZAR PRIMAL (CORRIGIDA)
// ==============================================

function syncPrimalData() {
    console.log('🔄 [SYNC] Sincronizando dados da primal...');
    
    // Garantir que a primal existe no array
    let primalMutation = characterMutations.find(m => m.id === 0);
    if (!primalMutation) {
        console.log('⚠️ [SYNC] Primal não encontrada, criando...');
        primalMutation = {
            id: 0,
            name: "MUTAÇÃO PRIMAL",
            type: "primal",
            description: "",
            source: "Origem do Personagem",
            stage: 1,
            fixed: true,
            stats: {
                vida: 0,
                sanidade: 0,
                armadura: 0,
                folego: 0,
                resistencia: 0
            },
            bonuses: []
        };
        characterMutations.unshift(primalMutation);
    }
    
    // Garantir que stats existe
    if (!primalMutation.stats) {
        primalMutation.stats = {
            vida: 0,
            sanidade: 0,
            armadura: 0,
            folego: 0,
            resistencia: 0
        };
    }
    
    // Sincronizar inputs com objeto - USAR VALORES DOS INPUTS COMO FONTE DA VERDADE
    const statMappings = [
        { inputId: 'primalVida', statKey: 'vida' },
        { inputId: 'primalSanidade', statKey: 'sanidade' },
        { inputId: 'primalArmadura', statKey: 'armadura' },
        { inputId: 'primalFolego', statKey: 'folego' },
        { inputId: 'primalResistencia', statKey: 'resistencia' }
    ];
    
    let changed = false;
    
    statMappings.forEach(({ inputId, statKey }) => {
        const input = document.getElementById(inputId);
        if (input) {
            const inputValue = parseInt(input.value) || 0;
            const currentValue = primalMutation.stats[statKey] || 0;
            
            if (inputValue !== currentValue) {
                console.log(`🔄 [SYNC] ${statKey}: ${currentValue} → ${inputValue}`);
                primalMutation.stats[statKey] = inputValue;
                changed = true;
            }
        }
    });
    
    // Sincronizar descrição
    const primalDesc = document.getElementById('primalDescription');
    if (primalDesc) {
        const inputDesc = primalDesc.value || "";
        const currentDesc = primalMutation.description || "";
        
        if (inputDesc !== currentDesc) {
            console.log(`🔄 [SYNC] Descrição alterada`);
            primalMutation.description = inputDesc;
            changed = true;
        }
    }
    
    if (changed) {
        console.log('✅ [SYNC] Primal sincronizada e alterada:', primalMutation.stats);
        // Salvar imediatamente se houve alteração
        setTimeout(saveCharacterData, 100);
    } else {
        console.log('✅ [SYNC] Primal já está sincronizada');
    }
    
    return primalMutation;
}

// ==============================================
// SALVAR ANTES DE SAIR DA PÁGINA
// ==============================================

function setupBeforeUnload() {
    window.addEventListener('beforeunload', function(e) {
        console.log('🚪 Salvando antes de sair da página...');
        
        // Sincronizar primal
        syncPrimalData();
        
        // Forçar salvamento
        saveCharacterData();
        
        // Mensagem opcional para navegadores mais antigos
        // e.preventDefault();
        // e.returnValue = '';
    });
    
    // Também salvar quando a página perde o foco
    window.addEventListener('blur', function() {
        console.log('👁️ Página perdeu foco, salvando...');
        setTimeout(() => {
            syncPrimalData();
            saveCharacterData();
        }, 100);
    });
}

// Chame esta função no DOMContentLoaded
// Adicione no final do DOMContentLoaded:
setupBeforeUnload();

// Nova função para atualizar display dos stats
function updateMutationStatsDisplay(mutationId) {
    const mutation = characterMutations.find(m => m.id === mutationId);
    if (!mutation || !mutation.stats) return;
    
    const stats = ['vida', 'sanidade', 'armadura', 'folego', 'resistencia'];
    stats.forEach(stat => {
        const input = document.getElementById(`${mutationId === 0 ? 'primal' : 'mutation'}${stat.charAt(0).toUpperCase() + stat.slice(1)}-${mutationId}`);
        if (input) {
            input.value = mutation.stats[stat] || 0;
        }
    });
}

function updateMutation(id, field, value) {
    const mutation = characterMutations.find(m => m.id === id);
    if (mutation) {
        mutation[field] = value;
        
        // Se for a mutação primal, atualizar o textarea
        if (id === 0 && field === 'description') {
            const primalDescription = document.getElementById('primalDescription');
            if (primalDescription) {
                primalDescription.value = value;
            }
        }
        
        if (field === 'name' && id !== 0) {
            const mutationDiv = document.querySelector(`#mutation-${id} .mutation-title h3`);
            if (mutationDiv) {
                mutationDiv.textContent = value;
            }
        }
        
        saveCharacterData();
    }
}

function updateMutationType(id, value) {
    const mutation = characterMutations.find(m => m.id === id);
    if (mutation) {
        mutation.type = value;
        
        const typeSpan = document.getElementById(`mutation-type-${id}`);
        if (typeSpan) {
            typeSpan.textContent = value.toUpperCase();
        }
        
        saveCharacterData();
    }
}

function updatePrimalMutationStage() {
    const levelInput = document.getElementById('level');
    const level = parseInt(levelInput.value) || 1;
    let stage = 1;
    
    if (level >= 65) stage = 2;
    if (level >= 95) stage = 3;
    if (level >= 99) stage = 4;
    
    const primalMutation = characterMutations.find(m => m.id === 0);
    if (primalMutation) {
        primalMutation.stage = stage;
        
        if (stage > 1) {
            const stageDisplay = document.getElementById('primalStage');
            const oldStage = parseInt(stageDisplay.dataset.lastStage) || 1;
            
            if (stage > oldStage) {
                const messages = {
                    2: "MUTAÇÃO PRIMAL evoluiu para Estágio 2!",
                    3: "MUTAÇÃO PRIMAL evoluiu para Estágio 3!",
                    4: "MUTAÇÃO PRIMAL alcançou o Estágio 4 máximo!"
                };
                
                if (messages[stage]) {
                    alert(messages[stage]);
                }
                
                stageDisplay.dataset.lastStage = stage;
            }
        }
        
        saveCharacterData();
    }
}

// ==============================================
// SISTEMA DE BÔNUS (MANTIDO)
// ==============================================

function updateBonusSystem() {
    renderAllBonuses();
    renderLearnedBonuses();
    updateBonusSlots();
}

function addBonus() {
    const totalSlots = getTotalBonusSlots();
    const usedSlots = getUsedBonusSlots();
    const usedWeight = getUsedBonusWeight();
    const maxWeight = getTotalBonusWeight();
    
    if (usedSlots >= totalSlots) {
        alert('Limite de slots para bônus atingido!');
        return;
    }
    
    const newBonusWeight = 1;
    if (usedWeight + newBonusWeight > maxWeight) {
        alert('Limite de peso para bônus atingido!');
        return;
    }
    
    allBonuses.push({
        id: `bonus-${Date.now()}`,
        action: '',
        value: 5,
        fixed: false,
        weight: 1
    });
    
    renderAllBonuses();
    updateBonusTables();
    updateBonusSlots();
}

function addLearnedBonus() {
    learnedBonuses.push({
        id: `learned-${Date.now()}`,
        action: '',
        value: 5,
        weight: 1
    });
    
    renderLearnedBonuses();
    updateBonusTables();
    saveCharacterData();
}

function removeBonus(id) {
    allBonuses = allBonuses.filter(bonus => bonus.id !== id);
    renderAllBonuses();
    updateBonusTables();
    updateBonusSlots();
}

function removeLearnedBonus(id) {
    learnedBonuses = learnedBonuses.filter(bonus => bonus.id !== id);
    renderLearnedBonuses();
    updateBonusTables();
    saveCharacterData();
}

function renderAllBonuses() {
    const container = document.getElementById('allBonuses');
    if (!container) return;
    
    container.innerHTML = '';
    allBonuses.forEach(bonus => {
        const bonusDiv = createBonusElement(bonus, false);
        container.appendChild(bonusDiv);
    });
}

function renderLearnedBonuses() {
    const container = document.getElementById('learnedBonuses');
    if (!container) return;
    
    container.innerHTML = '';
    learnedBonuses.forEach(bonus => {
        const bonusDiv = createBonusElement(bonus, true);
        container.appendChild(bonusDiv);
    });
}

function createBonusElement(bonus, isLearned) {
    const div = document.createElement('div');
    div.className = 'bonus-item';
    
    const weight = Math.floor(bonus.value / 5);
    
    div.innerHTML = `
        <div class="bonus-name">
            <input type="text" value="${bonus.action}" 
                   placeholder="Nome da ação" 
                   onchange="${isLearned ? 'updateLearnedBonusValue' : 'updateBonusValue'}('${bonus.id}', 'action', this.value)"
                   ${bonus.fixed ? 'readonly' : ''}>
        </div>
        <div class="bonus-value">
            <select onchange="${isLearned ? 'updateLearnedBonusValue' : 'updateBonusValue'}('${bonus.id}', 'value', parseInt(this.value))"
                    ${bonus.fixed ? 'disabled' : ''}>
                <option value="5" ${bonus.value === 5 ? 'selected' : ''}>+5</option>
                <option value="10" ${bonus.value === 10 ? 'selected' : ''}>+10</option>
                <option value="15" ${bonus.value === 15 ? 'selected' : ''}>+15</option>
                ${getMaxBonusValue() >= 20 ? '<option value="20" ' + (bonus.value === 20 ? 'selected' : '') + '>+20</option>' : ''}
            </select>
        </div>
        <div class="bonus-weight">${weight} peso${weight !== 1 ? 's' : ''}</div>
        ${!bonus.fixed ? `
            <button onclick="${isLearned ? 'removeLearnedBonus' : 'removeBonus'}('${bonus.id}')" class="remove-bonus">
                <i class="fas fa-times"></i>
            </button>
        ` : ''}
    `;
    return div;
}

function updateBonusValue(id, field, value) {
    const bonus = allBonuses.find(b => b.id === id);
    if (bonus) {
        const oldValue = bonus[field];
        bonus[field] = value;
        
        if (field === 'value') {
            const weight = Math.floor(value / 5);
            bonus.weight = weight;
            
            const maxValue = getMaxBonusValue();
            if (value > maxValue) {
                bonus.value = maxValue;
                bonus.weight = Math.floor(maxValue / 5);
                alert(`O valor máximo permitido é +${maxValue} neste nível!`);
            }
            
            const usedWeight = getUsedBonusWeight();
            const maxWeight = getTotalBonusWeight();
            if (usedWeight > maxWeight) {
                bonus.value = oldValue;
                bonus.weight = Math.floor(oldValue / 5);
                alert('Limite de peso excedido! Reduza o valor ou remova outro bônus.');
            }
        }
        
        renderAllBonuses();
        updateBonusTables();
        updateBonusSlots();
        saveCharacterData();
    }
}

function updateLearnedBonusValue(id, field, value) {
    const bonus = learnedBonuses.find(b => b.id === id);
    if (bonus) {
        bonus[field] = value;
        
        if (field === 'value') {
            bonus.weight = Math.floor(value / 5);
        }
        
        renderLearnedBonuses();
        updateBonusTables();
        saveCharacterData();
    }
}

// Modifique a função updateBonusTables para incluir bônus de mutação
function updateBonusTables() {
    const normalTable = document.getElementById('bonusTable');
    const learnedTable = document.getElementById('learnedBonusTable');
    
    if (!normalTable || !learnedTable) return;
    
    // Limpar tabelas
    normalTable.innerHTML = '';
    learnedTable.innerHTML = '';
    
    // Bônus normais
    const activeBonuses = allBonuses
        .filter(b => b.action && b.action.trim() !== '')
        .sort((a, b) => b.value - a.value);
    
    // Bônus aprendidos
    const activeLearnedBonuses = learnedBonuses
        .filter(b => b.action && b.action.trim() !== '')
        .sort((a, b) => b.value - a.value);
    
    // Bônus de mutação (todos juntos)
    let mutationBonusesList = [];
    characterMutations.forEach(mutation => {
        if (mutation.bonuses && mutation.bonuses.length > 0) {
            mutation.bonuses.forEach(bonus => {
                if (bonus.action && bonus.action.trim() !== '') {
                    mutationBonusesList.push({
                        ...bonus,
                        mutationName: mutation.name,
                        isMutationBonus: true
                    });
                }
            });
        }
    });
    
    mutationBonusesList.sort((a, b) => b.value - a.value);
    
    // Renderizar bônus normais
    if (activeBonuses.length === 0 && mutationBonusesList.length === 0) {
        normalTable.innerHTML = '<p class="no-bonuses">Nenhum bônus adicionado</p>';
    } else {
        // Adicionar bônus normais
        activeBonuses.forEach(bonus => {
            const item = document.createElement('div');
            item.className = 'bonus-table-item';
            item.innerHTML = `
                <span>${bonus.action}</span>
                <span class="bonus-value-display">+${bonus.value}</span>
            `;
            normalTable.appendChild(item);
        });
        
        // Adicionar bônus de mutação (em verde)
        mutationBonusesList.forEach(bonus => {
            const item = document.createElement('div');
            item.className = 'bonus-table-item mutation-bonus';
            item.innerHTML = `
                <span>${bonus.action} <small style="color: #27ae60; font-size: 0.8rem;">(${bonus.mutationName})</small></span>
                <span class="bonus-value-display">+${bonus.value}</span>
            `;
            normalTable.appendChild(item);
        });
    }
    
    // Renderizar bônus aprendidos
    if (activeLearnedBonuses.length === 0) {
        learnedTable.innerHTML = '<p class="no-bonuses">Nenhum bônus aprendido</p>';
    } else {
        activeLearnedBonuses.forEach(bonus => {
            const item = document.createElement('div');
            item.className = 'bonus-table-item';
            item.innerHTML = `
                <span>${bonus.action}</span>
                <span class="bonus-value-display">+${bonus.value}</span>
            `;
            learnedTable.appendChild(item);
        });
    }
}

function getMaxBonusValue() {
    const levelInput = document.getElementById('level');
    const level = parseInt(levelInput.value) || 1;
    return level >= 50 ? 20 : 15;
}

function getTotalBonusSlots() {
    const levelInput = document.getElementById('level');
    const level = parseInt(levelInput.value) || 1;
    
    if (level >= 80) return 20;
    if (level >= 50) return 15;
    if (level >= 30) return 12;
    return 9;
}

function getTotalBonusWeight() {
    return getTotalBonusSlots();
}

function getUsedBonusSlots() {
    return allBonuses.filter(b => b.action && b.action.trim() !== '').length;
}

function getUsedBonusWeight() {
    return allBonuses.reduce((total, bonus) => {
        if (bonus.action && bonus.action.trim() !== '') {
            return total + bonus.weight;
        }
        return total;
    }, 0);
}

function updateBonusSlots() {
    const totalSlots = getTotalBonusSlots();
    const usedSlots = getUsedBonusSlots();
    const remainingSlots = totalSlots - usedSlots;
    const usedWeight = getUsedBonusWeight();
    const totalWeight = getTotalBonusWeight();
    const remainingWeight = totalWeight - usedWeight;
    
    const totalElement = document.getElementById('totalActionSlots');
    const usedElement = document.getElementById('usedActionSlots');
    const remainingElement = document.getElementById('remainingActionSlots');
    const usedWeightElement = document.getElementById('usedBonusWeight');
    const totalWeightElement = document.getElementById('totalBonusWeight');
    
    if (totalElement) totalElement.textContent = totalSlots;
    if (usedElement) usedElement.textContent = usedSlots;
    if (remainingElement) remainingElement.textContent = remainingSlots;
    if (usedWeightElement) usedWeightElement.textContent = usedWeight;
    if (totalWeightElement) totalWeightElement.textContent = totalWeight;
    
    if (remainingElement) {
        remainingElement.style.color = remainingSlots >= 0 ? '#27ae60' : '#e74c3c';
    }
    
    if (usedWeightElement) {
        usedWeightElement.style.color = usedWeight <= totalWeight ? '#27ae60' : '#e74c3c';
    }
}

// ==============================================
// SISTEMA DE ARMAZENAMENTO (ATUALIZADO COM RITUAIS)
// ==============================================

function saveCharacterData() {
    console.log('🔄 Salvando ficha...');
    
    // PRIMEIRO: Coletar dados dos inputs da primal de forma SEGURA
    const primalVida = document.getElementById('primalVida');
    const primalSanidade = document.getElementById('primalSanidade');
    const primalArmadura = document.getElementById('primalArmadura');
    const primalFolego = document.getElementById('primalFolego');
    const primalResistencia = document.getElementById('primalResistencia');
    const primalDesc = document.getElementById('primalDescription');
    
    console.log('📊 Valores dos inputs da primal:', {
        vida: primalVida?.value,
        sanidade: primalSanidade?.value,
        armadura: primalArmadura?.value,
        folego: primalFolego?.value,
        resistencia: primalResistencia?.value,
        descricao: primalDesc?.value
    });
    
    // Atualizar o objeto primal no array - COM VERIFICAÇÃO ROBUSTA
    const primalMutation = characterMutations.find(m => m.id === 0);
    if (primalMutation) {
        // Garantir que stats exista
        if (!primalMutation.stats) {
            primalMutation.stats = {
                vida: 0,
                sanidade: 0,
                armadura: 0,
                folego: 0,
                resistencia: 0
            };
        }
        
        // Atualizar cada stat individualmente com fallback
        primalMutation.stats.vida = parseInt(primalVida?.value) || 0;
        primalMutation.stats.sanidade = parseInt(primalSanidade?.value) || 0;
        primalMutation.stats.armadura = parseInt(primalArmadura?.value) || 0;
        primalMutation.stats.folego = parseInt(primalFolego?.value) || 0;
        primalMutation.stats.resistencia = parseInt(primalResistencia?.value) || 0;
        
        if (primalDesc) {
            primalMutation.description = primalDesc.value || "";
        }
        
        console.log('✅ Primal atualizada:', primalMutation.stats);
    } else {
        console.error('❌ Primal não encontrada!');
        // Criar primal se não existir
        characterMutations.unshift({
            id: 0,
            name: "MUTAÇÃO PRIMAL",
            type: "primal",
            description: primalDesc?.value || "",
            source: "Origem do Personagem",
            stage: 1,
            fixed: true,
            stats: {
                vida: parseInt(primalVida?.value) || 0,
                sanidade: parseInt(primalSanidade?.value) || 0,
                armadura: parseInt(primalArmadura?.value) || 0,
                folego: parseInt(primalFolego?.value) || 0,
                resistencia: parseInt(primalResistencia?.value) || 0
            },
            bonuses: []
        });
    }
    
    const characterData = {
        // Informações básicas
        characterName: document.getElementById('characterNameInput')?.value || '',
        name: document.getElementById('name')?.value || '',
        age: document.getElementById('age')?.value || '',
        level: document.getElementById('level')?.value || '1',
        photo: document.getElementById('preview')?.src || '',
        lore: document.getElementById('lore')?.value || '',
        
        // Atributos
        attributesBase: { ...attributesBase },
        
        // Classes
        class1: document.getElementById('class1')?.value || '',
        combatClass: document.getElementById('combatClass')?.value || '',
        
        // Mutação - GARANTIR QUE ESTÁ COMPLETO
        characterMutations: characterMutations.map(mutation => ({
            id: mutation.id,
            name: mutation.name || '',
            type: mutation.type || 'primal',
            description: mutation.description || '',
            source: mutation.source || '',
            stage: mutation.stage || 1,
            fixed: mutation.fixed !== undefined ? mutation.fixed : true,
            stats: mutation.stats || {
                vida: 0,
                sanidade: 0,
                armadura: 0,
                folego: 0,
                resistencia: 0
            },
            bonuses: mutation.bonuses || []
        })),
        
        // Bônus
        allBonuses: [...allBonuses],
        learnedBonuses: [...learnedBonuses],
        
        // Rituais
        rituals: [...rituals],
        
        // Arsenal
        weapons: [...weapons],
        
        // Inventário
        inventory: document.getElementById('inventory')?.value || '',
        
        // Timestamp
        savedAt: new Date().toISOString(),
        user: currentUser,
        
        // Versão
        version: '4.1-primal-fix-final'
    };
    
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(characterData));
        console.log('💾 Ficha salva no localStorage!');
        console.log('🧬 Mutações salvas:', characterData.characterMutations);
        return true;
    } catch (error) {
        console.error('❌ Erro ao salvar ficha:', error);
        return false;
    }
}


function loadCharacterData() {
    try {
        const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (!savedData) {
            console.log('Nenhuma ficha salva encontrada.');
            
            // CONFIGURAR LISTENERS MESMO SEM DADOS SALVOS
            setTimeout(setupAllPrimalListeners, 500);
            return;
        }
        
        const characterData = JSON.parse(savedData);
        console.log('📂 Dados carregados do localStorage:', characterData);
        
        // Carregar informações básicas
        document.getElementById('characterNameInput').value = characterData.characterName || '';
        document.getElementById('name').value = characterData.name || '';
        document.getElementById('age').value = characterData.age || '';
        document.getElementById('level').value = characterData.level || '1';
        document.getElementById('lore').value = characterData.lore || '';
        
        // Carregar atributos
        if (characterData.attributesBase) {
            attributesBase = { ...characterData.attributesBase };
            updateAttributesDisplay();
        }
        
        // Carregar classes
        document.getElementById('class1').value = characterData.class1 || '';
        document.getElementById('combatClass').value = characterData.combatClass || '';
        
        // 🔥 CORREÇÃO CRÍTICA: Carregar mutações de forma mais robusta
        if (characterData.characterMutations && characterData.characterMutations.length > 0) {
            console.log('🧬 Carregando mutações do storage:', characterData.characterMutations);
            
            // Limpar array existente
            characterMutations = [];
            
            // 🔥 ENCONTRAR E PROCESSAR A PRIMAL PRIMEIRO
            const savedPrimal = characterData.characterMutations.find(m => m.id === 0);
            if (savedPrimal) {
                console.log('🎯 PRIMAL encontrada no storage:', savedPrimal);
                
                // Adicionar primal ao array
                characterMutations.push({
                    id: 0,
                    name: savedPrimal.name || "MUTAÇÃO PRIMAL",
                    type: savedPrimal.type || "primal",
                    description: savedPrimal.description || "",
                    source: savedPrimal.source || "Origem do Personagem",
                    stage: savedPrimal.stage || 1,
                    fixed: true,
                    stats: savedPrimal.stats || {
                        vida: 0,
                        sanidade: 0,
                        armadura: 0,
                        folego: 0,
                        resistencia: 0
                    },
                    bonuses: savedPrimal.bonuses || []
                });
                
                // 🔥 ATUALIZAR INPUTS DA PRIMAL IMEDIATAMENTE E FORÇADAMENTE
                setTimeout(() => {
                    console.log('🔄 FORÇANDO atualização dos inputs da primal...');
                    updatePrimalInputsFromMutation(savedPrimal);
                    
                    // Verificar se os valores foram aplicados
                    setTimeout(() => {
                        const primalVida = document.getElementById('primalVida');
                        console.log('✅ primalVida após carga:', primalVida?.value);
                    }, 200);
                }, 100);
                
            } else {
                console.log('⚠️ PRIMAL não encontrada no storage, criando padrão');
                
                // Criar primal padrão
                characterMutations.unshift({
                    id: 0,
                    name: "MUTAÇÃO PRIMAL",
                    type: "primal",
                    description: "",
                    source: "Origem do Personagem",
                    stage: 1,
                    fixed: true,
                    stats: {
                        vida: 0,
                        sanidade: 0,
                        armadura: 0,
                        folego: 0,
                        resistencia: 0
                    },
                    bonuses: []
                });
                
                // Atualizar inputs com valores padrão
                setTimeout(() => {
                    updatePrimalInputsFromMutation({
                        stats: { vida: 0, sanidade: 0, armadura: 0, folego: 0, resistencia: 0 },
                        description: ""
                    });
                }, 100);
            }
            
            // Adicionar outras mutações
            characterData.characterMutations
                .filter(m => m.id !== 0)
                .forEach(savedMut => {
                    characterMutations.push({
                        id: savedMut.id || Date.now(),
                        name: savedMut.name || 'Nova Mutação',
                        type: savedMut.type || 'colosso',
                        description: savedMut.description || '',
                        source: savedMut.source || '',
                        stage: savedMut.stage || 1,
                        fixed: false,
                        stats: savedMut.stats || {
                            vida: 0,
                            sanidade: 0,
                            armadura: 0,
                            folego: 0,
                            resistencia: 0
                        },
                        bonuses: savedMut.bonuses || []
                    });
                });
        } else {
            console.log('⚠️ Nenhuma mutação encontrada no storage');
            
            // Criar primal padrão se não existir
            characterMutations = [{
                id: 0,
                name: "MUTAÇÃO PRIMAL",
                type: "primal",
                description: "",
                source: "Origem do Personagem",
                stage: 1,
                fixed: true,
                stats: {
                    vida: 0,
                    sanidade: 0,
                    armadura: 0,
                    folego: 0,
                    resistencia: 0
                },
                bonuses: []
            }];
        }
        
        // Carregar bônus
        if (characterData.allBonuses) {
            allBonuses = [...characterData.allBonuses];
        }
        
        if (characterData.learnedBonuses) {
            learnedBonuses = [...characterData.learnedBonuses];
        }
        
        // Carregar rituais
        if (characterData.rituals) {
            rituals = [...characterData.rituals];
        }
        
        // Carregar armas
        if (characterData.weapons) {
            weapons = [...characterData.weapons];
        }
        
        // Carregar inventário
        document.getElementById('inventory').value = characterData.inventory || '';
        
        // Carregar foto
        const preview = document.getElementById('preview');
        const centerPreview = document.getElementById('centerPreview');
        const photoPreview = document.getElementById('photoPreview');
        const placeholder = photoPreview?.querySelector('.photo-placeholder');
        const centerPlaceholder = document.querySelector('.center-placeholder');
        
        if (characterData.photo && characterData.photo !== '') {
            if (preview) {
                preview.src = characterData.photo;
                preview.style.display = 'block';
            }
            if (centerPreview) {
                centerPreview.src = characterData.photo;
                centerPreview.style.display = 'block';
            }
            if (placeholder) placeholder.style.display = 'none';
            if (centerPlaceholder) centerPlaceholder.style.display = 'none';
        }
        
        // Renderizar tudo
        setTimeout(() => {
            renderAllBonuses();
            renderLearnedBonuses();
            updateBonusTables();
            renderMutations();
            updateRitualsDisplay();
            updateArsenalDisplay();
            
            // Atualizar displays
            updateAttributePointsDisplay();
            updateLevelBar();
            updateCenterLevel();
            validateLevelInput();
            updateBonusSlots();
            
            console.log('✅ Tudo renderizado após carga');
        }, 200);
        
        // 🔥 IMPORTANTE: Configurar listeners APÓS renderizar tudo
        setTimeout(() => {
            console.log('🎯 Configurando listeners da primal...');
            setupAllPrimalListeners();
            
            // 🔥 FORÇAR SINCRONIZAÇÃO FINAL
            setTimeout(() => {
                const primalFromMemory = characterMutations.find(m => m.id === 0);
                if (primalFromMemory) {
                    console.log('🔄 Sincronização final da primal:', primalFromMemory.stats);
                    updatePrimalInputsFromMutation(primalFromMemory);
                }
            }, 300);
        }, 500);
        
        console.log('✅ Ficha carregada com sucesso!');
        
    } catch (error) {
        console.error('❌ Erro ao carregar ficha:', error);
        // Mesmo com erro, tentar configurar listeners
        setTimeout(setupAllPrimalListeners, 500);
    }
}

// ==============================================
// FUNÇÃO DE DEBUG PARA VERIFICAR ESTADO DA PRIMAL
// ==============================================

function debugPrimalState() {
    console.log('=== DEBUG DO ESTADO DA PRIMAL ===');
    
    // Verificar storage
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
        try {
            const parsed = JSON.parse(savedData);
            const storagePrimal = parsed.characterMutations?.find(m => m.id === 0);
            console.log('💾 Primal no localStorage:', storagePrimal?.stats);
        } catch (e) {
            console.error('Erro ao ler storage:', e);
        }
    }
    
    // Verificar array em memória
    const memoryPrimal = characterMutations.find(m => m.id === 0);
    console.log('🧠 Primal em memória:', memoryPrimal?.stats);
    
    // Verificar inputs HTML
    const inputs = [
        'primalVida', 'primalSanidade', 'primalArmadura', 
        'primalFolego', 'primalResistencia'
    ];
    
    console.log('📋 Inputs HTML:');
    inputs.forEach(id => {
        const input = document.getElementById(id);
        console.log(`  ${id}: ${input?.value || 'não encontrado'}`);
    });
    
    // Verificar objeto primal completo
    console.log('📊 Primal completa:', memoryPrimal);
    
    console.log('=== FIM DEBUG ===');
    
    // Retornar dados para inspeção
    return {
        storage: savedData ? JSON.parse(savedData).characterMutations?.find(m => m.id === 0) : null,
        memory: memoryPrimal,
        inputs: inputs.reduce((acc, id) => {
            const input = document.getElementById(id);
            acc[id] = input?.value;
            return acc;
        }, {})
    };
}

// Adicione um botão para debug no HTML temporariamente
function addDebugButton() {
    const debugBtn = document.createElement('button');
    debugBtn.textContent = '🐛 Debug Primal';
    debugBtn.style.position = 'fixed';
    debugBtn.style.bottom = '10px';
    debugBtn.style.right = '10px';
    debugBtn.style.zIndex = '9999';
    debugBtn.style.padding = '10px';
    debugBtn.style.background = '#e74c3c';
    debugBtn.style.color = 'white';
    debugBtn.style.border = 'none';
    debugBtn.style.borderRadius = '5px';
    debugBtn.style.cursor = 'pointer';
    
    debugBtn.onclick = debugPrimalState;
    
    document.body.appendChild(debugBtn);
}

// ==============================================
// FUNÇÃO PARA FORÇAR SALVAMENTO E RECARGA
// ==============================================

function forceSaveAndReload() {
    console.log('💥 FORÇANDO salvamento e recarga da primal...');
    
    // 1. Sincronizar primal do HTML para memória
    syncPrimalData();
    
    // 2. Salvar imediatamente
    saveCharacterData();
    
    // 3. Recarregar dados do storage
    setTimeout(() => {
        loadCharacterData();
        alert('Primal forçada a salvar e recarregar! Verifique o console.');
    }, 500);
}

// Adicione ao DOMContentLoaded para chamar debug
document.addEventListener('DOMContentLoaded', function() {
    // ... código existente ...
    
    setTimeout(() => {
        // Adicionar botão de debug (remova depois de testar)
        addDebugButton();
        
        // Forçar verificação após 2 segundos
        setTimeout(() => {
            console.log('🕒 Verificando estado da primal após carga...');
            debugPrimalState();
        }, 2000);
    }, 1000);
});

// ==============================================
// FUNÇÃO PARA ATUALIZAR INPUTS DA PRIMAL
// ==============================================

// ==============================================
// FUNÇÃO PARA ATUALIZAR INPUTS DA PRIMAL (CORRIGIDA)
// ==============================================

function updatePrimalInputsFromMutation(mutation) {
    console.log('🔄 [PRIMAL SYNC] Atualizando inputs da primal a partir de mutação:', mutation);
    
    if (!mutation) {
        console.error('❌ [PRIMAL SYNC] Mutação não fornecida');
        return;
    }
    
    // Atualizar stats - GARANTIR que stats existe
    const stats = mutation.stats || {
        vida: 0,
        sanidade: 0,
        armadura: 0,
        folego: 0,
        resistencia: 0
    };
    
    console.log('📊 [PRIMAL SYNC] Stats recebidos:', stats);
    
    // Mapear stats para inputs
    const statMappings = [
        { inputId: 'primalVida', statKey: 'vida', defaultValue: 0 },
        { inputId: 'primalSanidade', statKey: 'sanidade', defaultValue: 0 },
        { inputId: 'primalArmadura', statKey: 'armadura', defaultValue: 0 },
        { inputId: 'primalFolego', statKey: 'folego', defaultValue: 0 },
        { inputId: 'primalResistencia', statKey: 'resistencia', defaultValue: 0 }
    ];
    
    statMappings.forEach(({ inputId, statKey, defaultValue }) => {
        const input = document.getElementById(inputId);
        const value = stats[statKey] !== undefined ? stats[statKey] : defaultValue;
        
        if (input) {
            // FORÇAR atualização mesmo se o valor parecer igual
            input.value = value;
            
            // Disparar evento para atualizar o objeto em memória
            setTimeout(() => {
                input.dispatchEvent(new Event('input', { bubbles: true }));
                input.dispatchEvent(new Event('change', { bubbles: true }));
            }, 10);
            
            console.log(`✅ [PRIMAL SYNC] Input ${inputId} atualizado: ${value}`);
        } else {
            console.error(`❌ [PRIMAL SYNC] Input ${inputId} não encontrado no DOM`);
        }
    });
    
    // Atualizar descrição
    const primalDesc = document.getElementById('primalDescription');
    if (primalDesc) {
        const descValue = mutation.description || "";
        primalDesc.value = descValue;
        
        // Disparar evento
        setTimeout(() => {
            primalDesc.dispatchEvent(new Event('input', { bubbles: true }));
            primalDesc.dispatchEvent(new Event('change', { bubbles: true }));
        }, 10);
        
        console.log(`✅ [PRIMAL SYNC] Descrição primal atualizada: "${descValue.substring(0, 50)}..."`);
    } else {
        console.error('❌ [PRIMAL SYNC] Elemento primalDescription não encontrado');
    }
    
    // ATUALIZAR O OBJETO EM MEMÓRIA IMEDIATAMENTE
    const primalMutation = characterMutations.find(m => m.id === 0);
    if (primalMutation) {
        primalMutation.stats = { ...stats };
        primalMutation.description = mutation.description || "";
        console.log('✅ [PRIMAL SYNC] Objeto primal atualizado em memória:', primalMutation.stats);
    }
}

// ==============================================
// FUNÇÃO PARA CARREGAR DADOS DA PRIMAL DO STORAGE
// ==============================================

function updatePrimalInputsFromSavedData(characterData) {
    console.log('🔄 Carregando dados da primal do storage...');
    
    if (!characterData || !characterData.characterMutations) {
        console.log('❌ Nenhum dado de mutações encontrado');
        return;
    }
    
    const savedPrimal = characterData.characterMutations.find(m => m.id === 0);
    if (!savedPrimal) {
        console.log('❌ Primal não encontrada nos dados salvos');
        return;
    }
    
    console.log('📊 Dados da primal para carregar:', savedPrimal.stats);
    
    // Atualizar inputs com os valores salvos
    const inputs = [
        { id: 'primalVida', value: savedPrimal.stats?.vida || 0 },
        { id: 'primalSanidade', value: savedPrimal.stats?.sanidade || 0 },
        { id: 'primalArmadura', value: savedPrimal.stats?.armadura || 0 },
        { id: 'primalFolego', value: savedPrimal.stats?.folego || 0 },
        { id: 'primalResistencia', value: savedPrimal.stats?.resistencia || 0 }
    ];
    
    inputs.forEach(({ id, value }) => {
        const input = document.getElementById(id);
        if (input) {
            input.value = value;
            console.log(`✅ Input ${id} carregado: ${value}`);
        } else {
            console.error(`❌ Input ${id} não encontrado`);
        }
    });
    
    // Descrição
    const primalDesc = document.getElementById('primalDescription');
    if (primalDesc && savedPrimal.description) {
        primalDesc.value = savedPrimal.description;
        console.log(`✅ Descrição primal carregada`);
    }
    
    // Atualizar o objeto primal no array global
    const primalMutation = characterMutations.find(m => m.id === 0);
    if (primalMutation) {
        primalMutation.description = savedPrimal.description || '';
        primalMutation.stats = {
            vida: savedPrimal.stats?.vida || 0,
            sanidade: savedPrimal.stats?.sanidade || 0,
            armadura: savedPrimal.stats?.armadura || 0,
            folego: savedPrimal.stats?.folego || 0,
            resistencia: savedPrimal.stats?.resistencia || 0
        };
        primalMutation.bonuses = savedPrimal.bonuses || [];
        
        // Renderizar bônus da primal
        renderMutationBonuses(0);
    }
}

// ==============================================
// FUNÇÕES PRINCIPAIS DA FICHA (ATUALIZADAS COM RITUAIS)
// ==============================================
function calculateStats() {
    // Coletar dados do formulário
    const name = document.getElementById('name').value || 'Personagem Sem Nome';
    const age = document.getElementById('age').value || 'Não informado';
    const level = parseInt(document.getElementById('level').value) || 1;
    const class1 = document.getElementById('class1').value;
    const combatClass = document.getElementById('combatClass').value;
    const inventory = document.getElementById('inventory').value;
    
    // Calcular estatísticas base
    let vida = 55 + (attributes.vig * 15);
    let determinacaoSanidade = 55 + (attributes.int * 10) + (attributes.set * 15);
    let resistencia = 15 + (attributes.vig * 5);
    let folego = 4 + (attributes.vig * 1);
    let armadura = 5;
    
    // Aplicar bônus de nível
    const levelBonuses = getLevelBonuses(level);
    vida += levelBonuses.vida;
    determinacaoSanidade += levelBonuses.determinacaoSanidade;
    armadura += levelBonuses.armadura;
    
    // Aplicar bônus de classe
    const classBonuses = getClassBonuses(class1);
    vida += classBonuses.vida;
    determinacaoSanidade += classBonuses.determinacaoSanidade;
    resistencia += classBonuses.resistencia;
    folego += classBonuses.folego;
    armadura += classBonuses.armadura;
    
    // NOVO: Coletar bônus de status de todas as mutações
    let totalMutationVida = 0;
    let totalMutationSanidade = 0;
    let totalMutationArmadura = 0;
    let totalMutationFolego = 0;
    let totalMutationResistencia = 0;
    
    characterMutations.forEach(mutation => {
        if (mutation.stats) {
            totalMutationVida += (mutation.stats.vida || 0);
            totalMutationSanidade += (mutation.stats.sanidade || 0);
            totalMutationArmadura += (mutation.stats.armadura || 0);
            totalMutationFolego += (mutation.stats.folego || 0);
            totalMutationResistencia += (mutation.stats.resistencia || 0);
        }
    });
    
    // NOVO: Aplicar bônus de mutação aos status
    vida += totalMutationVida;
    determinacaoSanidade += totalMutationSanidade;
    armadura += totalMutationArmadura;
    folego += totalMutationFolego;
    resistencia += totalMutationResistencia;
    
    // NOVO: Coletar todos os bônus de ação (normais + aprendidos + mutação)
    const mutationBonusesList = [];
    characterMutations.forEach(mutation => {
        if (mutation.bonuses && mutation.bonuses.length > 0) {
            mutation.bonuses.forEach(bonus => {
                if (bonus.action && bonus.action.trim() !== '') {
                    mutationBonusesList.push({
                        ...bonus,
                        mutationName: mutation.name,
                        isMutationBonus: true
                    });
                }
            });
        }
    });
    
    // LIMPAR QUALQUER CONTEÚDO DUPLICADO ANTES DE GERAR NOVO
    const statsDiv = document.getElementById('stats');
    statsDiv.innerHTML = '';
    
    // Gerar HTML da ficha calculada
    const statsHTML = `
        <div class="character-header">
            <h3>${name}</h3>
            <p>Nível ${level} | ${age} anos</p>
            <p>Classe: ${class1 || 'Não selecionada'} | Combate: ${combatClass || 'Não selecionada'}</p>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-name">Vida</div>
                <div class="stat-value">${vida}</div>
                ${totalMutationVida > 0 ? `<div class="stat-mutation-bonus">+${totalMutationVida} de mutações</div>` : ''}
            </div>
            <div class="stat-card">
                <div class="stat-name">Determinação</div>
                <div class="stat-value">${determinacaoSanidade}</div>
                ${totalMutationSanidade > 0 ? `<div class="stat-mutation-bonus">+${totalMutationSanidade} de mutações</div>` : ''}
            </div>
            <div class="stat-card">
                <div class="stat-name">Resistência</div>
                <div class="stat-value">${resistencia}</div>
                ${totalMutationResistencia > 0 ? `<div class="stat-mutation-bonus">+${totalMutationResistencia} de mutações</div>` : ''}
            </div>
            <div class="stat-card">
                <div class="stat-name">Fôlego</div>
                <div class="stat-value">${folego}</div>
                ${totalMutationFolego > 0 ? `<div class="stat-mutation-bonus">+${totalMutationFolego} de mutações</div>` : ''}
            </div>
            <div class="stat-card">
                <div class="stat-name">Armadura</div>
                <div class="stat-value">${armadura}</div>
                ${totalMutationArmadura > 0 ? `<div class="stat-mutation-bonus">+${totalMutationArmadura} de mutações</div>` : ''}
            </div>
        </div>
        
        <div class="attributes-display">
            <h4>Atributos</h4>
            <div class="attributes-list">
                <div class="attribute-display">
                    <span>AGI:</span>
                    <span class="attr-value">${attributes.agi}</span>
                </div>
                <div class="attribute-display">
                    <span>FOR:</span>
                    <span class="attr-value">${attributes.for}</span>
                </div>
                <div class="attribute-display">
                    <span>INT:</span>
                    <span class="attr-value">${attributes.int}</span>
                </div>
                <div class="attribute-display">
                    <span>SET:</span>
                    <span class="attr-value">${attributes.set}</span>
                </div>
                <div class="attribute-display">
                    <span>VIG:</span>
                    <span class="attr-value">${attributes.vig}</span>
                </div>
            </div>
        </div>
        
        <div class="mutations-display">
            <h4>Mutações (${characterMutations.length})</h4>
            ${characterMutations.map(mut => {
                const hasStats = mut.stats && Object.values(mut.stats).some(val => val > 0);
                return `
                    <div class="mutation-display-card ${mut.type}">
                        <div class="mutation-display-header">
                            <h5>${mut.name}</h5>
                            <span class="mutation-display-type">${mut.type.toUpperCase()} - Estágio ${mut.stage}</span>
                        </div>
                        ${mut.description ? `<p class="mutation-description">${mut.description}</p>` : ''}
                        ${mut.source ? `<p class="mutation-source"><small>Origem: ${mut.source}</small></p>` : ''}
                        
                        ${hasStats ? `
                            <div class="mutation-stats-display">
                                <h6><i class="fas fa-chart-line"></i> Bônus desta Mutação:</h6>
                                <div class="mutation-stats-list">
                                    ${mut.stats.vida > 0 ? `<span class="mutation-stat"><i class="fas fa-heart"></i> +${mut.stats.vida} Vida</span>` : ''}
                                    ${mut.stats.sanidade > 0 ? `<span class="mutation-stat"><i class="fas fa-brain"></i> +${mut.stats.sanidade} Sanidade</span>` : ''}
                                    ${mut.stats.armadura > 0 ? `<span class="mutation-stat"><i class="fas fa-shield-alt"></i> +${mut.stats.armadura} Armadura</span>` : ''}
                                    ${mut.stats.folego > 0 ? `<span class="mutation-stat"><i class="fas fa-wind"></i> +${mut.stats.folego} Fôlego</span>` : ''}
                                    ${mut.stats.resistencia > 0 ? `<span class="mutation-stat"><i class="fas fa-dumbbell"></i> +${mut.stats.resistencia} Resistência</span>` : ''}
                                </div>
                            </div>
                        ` : ''}
                        
                        ${mut.bonuses && mut.bonuses.length > 0 ? `
                            <div class="mutation-bonuses-display">
                                <h6><i class="fas fa-plus-circle"></i> Bônus de Ação:</h6>
                                <ul class="mutation-bonuses-list">
                                    ${mut.bonuses
                                        .filter(b => b.action && b.action.trim() !== '')
                                        .map(bonus => `<li>${bonus.action}: <span class="bonus-value">+${bonus.value}</span></li>`)
                                        .join('')}
                                </ul>
                            </div>
                        ` : ''}
                    </div>
                `;
            }).join('')}
        </div>
        
        <div class="mutations-summary">
            <h4><i class="fas fa-calculator"></i> Resumo de Bônus por Mutação</h4>
            <div class="mutations-stats-list">
                ${characterMutations.filter(m => m.stats && Object.values(m.stats).some(val => val > 0)).map(mutation => `
                    <div class="mutation-stat-summary">
                        <h5>${mutation.name} <span class="mutation-type-badge">${mutation.type.toUpperCase()}</span></h5>
                        <div class="mutation-stat-values">
                            ${mutation.stats.vida > 0 ? `<span><i class="fas fa-heart"></i> +${mutation.stats.vida} Vida</span>` : ''}
                            ${mutation.stats.sanidade > 0 ? `<span><i class="fas fa-brain"></i> +${mutation.stats.sanidade} Sanidade</span>` : ''}
                            ${mutation.stats.armadura > 0 ? `<span><i class="fas fa-shield-alt"></i> +${mutation.stats.armadura} Armadura</span>` : ''}
                            ${mutation.stats.folego > 0 ? `<span><i class="fas fa-wind"></i> +${mutation.stats.folego} Fôlego</span>` : ''}
                            ${mutation.stats.resistencia > 0 ? `<span><i class="fas fa-dumbbell"></i> +${mutation.stats.resistencia} Resistência</span>` : ''}
                        </div>
                    </div>
                `).join('')}
                
                ${characterMutations.filter(m => m.stats && Object.values(m.stats).every(val => val === 0)).length > 0 ? `
                    <div class="no-mutation-stats">
                        <p><i class="fas fa-info-circle"></i> ${characterMutations.filter(m => m.stats && Object.values(m.stats).every(val => val === 0)).length} mutação(ões) sem bônus de status</p>
                    </div>
                ` : ''}
            </div>
        </div>
        
        <div class="bonuses-display">
            <h4>Bônus em Ações - Total: ${allBonuses.filter(b => b.action && b.action.trim() !== '').length + learnedBonuses.filter(b => b.action && b.action.trim() !== '').length + mutationBonusesList.length}</h4>
            
            ${allBonuses.filter(b => b.action && b.action.trim() !== '').length > 0 ? `
                <div class="bonus-category">
                    <h5><i class="fas fa-star"></i> Bônus Normais (${allBonuses.filter(b => b.action && b.action.trim() !== '').length})</h5>
                    <ul>
                        ${allBonuses
                            .filter(b => b.action && b.action.trim() !== '')
                            .sort((a, b) => b.value - a.value)
                            .map(bonus => `<li>${bonus.action}: <span class="bonus-value">+${bonus.value}</span></li>`)
                            .join('')}
                    </ul>
                </div>
            ` : ''}
            
            ${learnedBonuses.filter(b => b.action && b.action.trim() !== '').length > 0 ? `
                <div class="bonus-category learned">
                    <h5><i class="fas fa-graduation-cap"></i> Bônus Aprendidos (${learnedBonuses.filter(b => b.action && b.action.trim() !== '').length})</h5>
                    <ul>
                        ${learnedBonuses
                            .filter(b => b.action && b.action.trim() !== '')
                            .sort((a, b) => b.value - a.value)
                            .map(bonus => `<li>${bonus.action}: <span class="bonus-value">+${bonus.value}</span></li>`)
                            .join('')}
                    </ul>
                </div>
            ` : ''}
            
            ${mutationBonusesList.length > 0 ? `
                <div class="bonus-category mutation">
                    <h5><i class="fas fa-dna"></i> Bônus de Mutação (${mutationBonusesList.length})</h5>
                    <ul>
                        ${mutationBonusesList
                            .sort((a, b) => b.value - a.value)
                            .map(bonus => `<li>${bonus.action}: <span class="bonus-value">+${bonus.value}</span> <span class="bonus-mutation-name">(${bonus.mutationName})</span></li>`)
                            .join('')}
                    </ul>
                </div>
            ` : ''}
            
            ${allBonuses.filter(b => b.action && b.action.trim() !== '').length === 0 && 
              learnedBonuses.filter(b => b.action && b.action.trim() !== '').length === 0 && 
              mutationBonusesList.length === 0 ? `
                <p class="no-bonuses-message">Nenhum bônus em ações adicionado</p>
            ` : ''}
        </div>
        
        ${rituals.length > 0 ? `
            <div class="rituals-display">
                <h4>Rituais e Pactos (${rituals.length})</h4>
                <div class="rituals-summary">
                    <p>Aprendidos: ${rituals.filter(r => level >= r.nivel).length} | Não disponíveis: ${rituals.filter(r => level < r.nivel).length}</p>
                </div>
                <div class="rituals-grid">
                    ${rituals.map(ritual => {
                        const canLearn = level >= ritual.nivel;
                        return `
                            <div class="ritual-display-card ${canLearn ? 'learned' : 'locked'}">
                                <div class="ritual-display-header">
                                    <h5>${ritual.nome}</h5>
                                    <div class="ritual-display-status ${canLearn ? 'can-learn' : 'cannot-learn'}">
                                        <i class="fas ${canLearn ? 'fa-unlock' : 'fa-lock'}"></i>
                                        ${canLearn ? 'Disponível' : 'Nível ' + ritual.nivel}
                                    </div>
                                </div>
                                
                                <div class="ritual-display-info">
                                    <div class="ritual-display-type">
                                        <span class="type-label">Tipo:</span>
                                        <span class="type-value">${ritual.tipo || 'Ritual'}</span>
                                    </div>
                                    <div class="ritual-display-element">
                                        <span class="element-label">Elemento:</span>
                                        <span class="element-value">${ritual.elemento || 'N/A'}</span>
                                    </div>
                                    <div class="ritual-display-level">
                                        <span class="level-label">Nível:</span>
                                        <span class="level-value ${canLearn ? 'met' : 'not-met'}">${ritual.nivel}</span>
                                    </div>
                                </div>
                                
                                ${ritual.descricao ? `
                                    <div class="ritual-display-description">
                                        <p>${ritual.descricao}</p>
                                    </div>
                                ` : ''}
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        ` : ''}
        
        ${weapons.length > 0 ? `
            <div class="arsenal-display">
                <h4>Arsenal de Armas (${weapons.length} arma${weapons.length !== 1 ? 's' : ''})</h4>
                <div class="weapons-grid">
                    ${weapons.map(weapon => `
                        <div class="weapon-display-card ${weapon.raridade ? weapon.raridade.toLowerCase() : ''}">
                            <div class="weapon-display-header">
                                <h5>${weapon.name}</h5>
                                <span class="weapon-display-type">${getWeaponTypeDisplay(weapon.type)}</span>
                            </div>
                            
                            <div class="weapon-display-stats">
                                <div class="weapon-stat">
                                    <span>Dano:</span>
                                    <strong>${weapon.damage}</strong>
                                </div>
                                ${weapon.ct && weapon.ct !== 'N/A' ? `
                                    <div class="weapon-stat">
                                        <span>CT:</span>
                                        <strong>${weapon.ct}</strong>
                                    </div>
                                ` : ''}
                                ${weapon.dct && weapon.dct !== 'N/A' ? `
                                    <div class="weapon-stat">
                                        <span>DCT:</span>
                                        <strong>${weapon.dct}</strong>
                                    </div>
                                ` : ''}
                                ${weapon.criticals ? `
                                    <div class="weapon-stat">
                                        <span>Críticos:</span>
                                        <strong>${weapon.criticals}</strong>
                                    </div>
                                ` : ''}
                                ${weapon.resistence ? `
                                    <div class="weapon-stat">
                                        <span>Resistência:</span>
                                        <strong>${weapon.resistence}</strong>
                                    </div>
                                ` : ''}
                            </div>
                            
                            ${weapon.passive ? `
                                <div class="weapon-passive-display">
                                    <span class="passive-label">Passiva:</span>
                                    <p>${weapon.passive}</p>
                                </div>
                            ` : ''}
                            
                            ${weapon.passivaRadiante ? `
                                <div class="weapon-passive-display radiante">
                                    <span class="passive-label">Passiva Radiante:</span>
                                    <p>${weapon.passivaRadiante}</p>
                                </div>
                            ` : ''}
                            
                            ${weapon.passivaTek ? `
                                <div class="weapon-passive-display tek">
                                    <span class="passive-label">Passiva Tek:</span>
                                    <p>${weapon.passivaTek}</p>
                                </div>
                            ` : ''}
                            
                            ${weapon.modificadoresLista && weapon.modificadoresLista.length > 0 ? `
                                <div class="weapon-modifiers-display">
                                    <span class="modifiers-label">Modificadores:</span>
                                    <ul>
                                        ${weapon.modificadoresLista.map(mod => `
                                            <li>
                                                <strong>${mod.nome}:</strong> ${mod.efeito}
                                                ${mod.descricao ? `<br><small>${mod.descricao}</small>` : ''}
                                            </li>
                                        `).join('')}
                                    </ul>
                                </div>
                            ` : weapon.modifiers ? `
                                <div class="weapon-modifiers-display">
                                    <span class="modifiers-label">Modificadores:</span>
                                    <p>${weapon.modifiers}</p>
                                </div>
                            ` : ''}
                            
                            ${weapon.description ? `
                                <div class="weapon-description-display">
                                    <span class="description-label">Descrição:</span>
                                    <p>${weapon.description}</p>
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : ''}
        
        ${inventory ? `
            <div class="inventory-display">
                <h4>Inventário</h4>
                <p>${inventory}</p>
            </div>
        ` : ''}
        
        <div class="rewards-display">
            <h4>Recompensas por Nível</h4>
            <ul>
                ${getLevelRewards(level).map(reward => `<li>${reward}</li>`).join('')}
            </ul>
        </div>
        
        <!-- NOVO: Resumo Final dos Status com Mutação -->
        <div class="final-summary">
            <h4><i class="fas fa-chart-pie"></i> Resumo Final dos Status</h4>
            <div class="summary-grid">
                <div class="summary-item">
                    <div class="summary-label">Vida Total:</div>
                    <div class="summary-value">${vida}</div>
                    <div class="summary-breakdown">
                        <small>Base: ${55 + (attributes.vig * 15)}</small>
                        <small>Classe: ${classBonuses.vida}</small>
                        <small>Nível: ${levelBonuses.vida}</small>
                        ${totalMutationVida > 0 ? `<small>Mutações: +${totalMutationVida}</small>` : ''}
                    </div>
                </div>
                <div class="summary-item">
                    <div class="summary-label">Determinação Total:</div>
                    <div class="summary-value">${determinacaoSanidade}</div>
                    <div class="summary-breakdown">
                        <small>Base: ${55 + (attributes.int * 10) + (attributes.set * 15)}</small>
                        <small>Classe: ${classBonuses.determinacaoSanidade}</small>
                        <small>Nível: ${levelBonuses.determinacaoSanidade}</small>
                        ${totalMutationSanidade > 0 ? `<small>Mutações: +${totalMutationSanidade}</small>` : ''}
                    </div>
                </div>
                <div class="summary-item">
                    <div class="summary-label">Resistência Total:</div>
                    <div class="summary-value">${resistencia}</div>
                    <div class="summary-breakdown">
                        <small>Base: ${15 + (attributes.vig * 5)}</small>
                        <small>Classe: ${classBonuses.resistencia}</small>
                        ${totalMutationResistencia > 0 ? `<small>Mutações: +${totalMutationResistencia}</small>` : ''}
                    </div>
                </div>
                <div class="summary-item">
                    <div class="summary-label">Fôlego Total:</div>
                    <div class="summary-value">${folego}</div>
                    <div class="summary-breakdown">
                        <small>Base: ${4 + (attributes.vig * 1)}</small>
                        <small>Classe: ${classBonuses.folego}</small>
                        ${totalMutationFolego > 0 ? `<small>Mutações: +${totalMutationFolego}</small>` : ''}
                    </div>
                </div>
                <div class="summary-item">
                    <div class="summary-label">Armadura Total:</div>
                    <div class="summary-value">${armadura}</div>
                    <div class="summary-breakdown">
                        <small>Base: 5</small>
                        <small>Classe: ${classBonuses.armadura}</small>
                        <small>Nível: ${levelBonuses.armadura}</small>
                        ${totalMutationArmadura > 0 ? `<small>Mutações: +${totalMutationArmadura}</small>` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Adicionar o HTML gerado
    statsDiv.innerHTML = statsHTML;
    
    // Mostrar resultados
    document.getElementById('results').style.display = 'block';
    
    // Salvar automaticamente
    saveCharacterData();
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando ficha de personagem...');
    
    // Inicializar listeners básicos
    initializeEventListeners();
    
    // Configurar salvamento antes de sair
    setupBeforeUnload();
    
    // Carregar dados salvos
    loadCharacterData();
    
    // Atualizar displays
    updateAttributePointsDisplay();
    updateLevelBar();
    updateCenterLevel();
    updateBonusSystem();
    
    // CARREGAR ARMAS DA PÁGINA DE ITENS
    loadWeaponsFromStorage();
    updateArsenalDisplay();
    
    // CARREGAR RITUAIS DA PÁGINA DE PODERES
    loadRitualsFromStorage();
    
    // Verificar usuário logado
    getLoggedInUser();
    
    // 🔥 CONFIGURAR LISTENERS DA PRIMAL NO CARREGAMENTO INICIAL
    // Usamos setTimeout para garantir que o DOM esteja completamente carregado
    setTimeout(() => {
        console.log('🎯 Configurando listeners da primal...');
        setupAllPrimalListeners();
        
        // Sincronizar primal
        syncPrimalData();
        
        // Debug: verificar se tudo está funcionando
        console.log('✅ Sistema de ficha inicializado');
        console.log('📊 Primal Mutation:', characterMutations.find(m => m.id === 0));
        
        // Verificar inputs da primal
        const primalInputs = [
            'primalVida', 'primalSanidade', 'primalArmadura', 
            'primalFolego', 'primalResistencia'
        ];
        
        primalInputs.forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                console.log(`✅ Input ${id} encontrado, valor: ${input.value}`);
            }
        });
    }, 1000); // Aguardar 1 segundo para garantir tudo carregou
});


function getWeaponTypeDisplay(type) {
    const types = {
        'arma_branca': 'Arma Branca',
        'arma_fogo': 'Arma de Fogo',
        'arma_arcana': 'Arma Arcana',
        'arma_explosiva': 'Arma Explosiva',
        'arma_distancia': 'Arma à Distância',
        'defesa': 'Defesa',
        'especial': 'Especial'
    };
    return types[type] || type;
}

function getLevelBonuses(level) {
    const bonuses = {
        vida: 0,
        determinacaoSanidade: 0,
        armadura: 0
    };
    
    if (level >= 50) bonuses.vida += 30;
    if (level >= 65) bonuses.determinacaoSanidade += 20;
    if (level >= 80) bonuses.armadura += 10;
    if (level >= 95) {
        bonuses.vida += 20;
        bonuses.determinacaoSanidade += 20;
    }
    if (level >= 99) bonuses.armadura += 10;
    
    return bonuses;
}



function getClassBonuses(className) {
    const bonuses = {
        vida: 0,
        determinacaoSanidade: 0,
        resistencia: 0,
        folego: 0,
        armadura: 0
    };
    
    switch(className) {
        case 'guerreiro':
            bonuses.vida += 20;
            bonuses.armadura += 20;
            break;
        case 'atirador':
            bonuses.vida += 10;
            bonuses.determinacaoSanidade += 10;
            break;
        case 'forjador':
            bonuses.vida += 15;
            bonuses.resistencia += 5;
            break;
        case 'arcano':
            bonuses.vida += 5;
            bonuses.determinacaoSanidade += 25;
            break;
        case 'cientista':
            bonuses.vida += 5;
            bonuses.determinacaoSanidade += 20;
            break;
        case 'sobrevivente':
            bonuses.vida += 15;
            bonuses.folego += 1;
            break;
        case 'construtor':
            bonuses.vida += 15;
            break;
        case 'medico':
            bonuses.determinacaoSanidade += 25;
            bonuses.armadura += 10;
            break;
    }
    
    return bonuses;
}

function getLevelRewards(level) {
    const rewards = [];
    
    if (level >= 15) rewards.push('Nível 15: +1 Ponto de Atributo');
    if (level >= 30) rewards.push('Nível 30: +3 slots para Bônus de Ação');
    if (level >= 50) {
        rewards.push('Nível 50: +30 de Vida');
        rewards.push('Nível 50: +3 slots para Bônus de Ação');
        rewards.push('Nível 50: Convite da Linhagem de Athenas');
        rewards.push('Nível 50: Presente de Evento Principal');
    }
    if (level >= 65) rewards.push('Nível 65: Mutação Primal evolui para Estágio 2');
    if (level >= 95) rewards.push('Nível 95: Mutação Primal evolui para Estágio 3');
    if (level >= 99) rewards.push('Nível 99: Mutação Primal evolui para Estágio 4');
    
    return rewards;
}

// ==============================================
// FUNÇÕES DE EXPORTAÇÃO (ATUALIZADAS COM RITUAIS)
// ==============================================

function saveForm() {
    if (saveCharacterData()) {
        alert('Ficha salva com sucesso!');
    }
}

function resetForm() {
    if (confirm('Tem certeza que deseja limpar todo o formulário? Esta ação não pode ser desfeita.')) {
        document.getElementById('characterForm').reset();
        
        // Resetar variáveis
        attributesBase = { agi: 1, for: 1, int: 1, set: 1, vig: 1 };
        characterMutations = [
            {
                id: 0,
                name: "MUTAÇÃO PRIMAL",
                type: "primal",
                description: "",
                source: "Origem do Personagem",
                stage: 1,
                fixed: true
            }
        ];
        allBonuses = [];
        learnedBonuses = [];
        rituals = [];
        weapons = [];
        
        // Resetar foto
        const preview = document.getElementById('preview');
        const centerPreview = document.getElementById('centerPreview');
        const photoPreview = document.getElementById('photoPreview');
        const placeholder = photoPreview.querySelector('.photo-placeholder');
        const centerPlaceholder = document.querySelector('.center-placeholder');
        
        preview.src = '';
        preview.style.display = 'none';
        centerPreview.src = '';
        centerPreview.style.display = 'none';
        if (placeholder) placeholder.style.display = 'flex';
        if (centerPlaceholder) centerPlaceholder.style.display = 'flex';
        
        // Resetar displays
        updateAttributesDisplay();
        updateAttributePointsDisplay();
        validateLevelInput();
        updateBonusSystem();
        renderMutations();
        updateBonusTables();
        updateRitualsDisplay();
        updateArsenalDisplay();
        
        // Esconder resultados
        document.getElementById('results').style.display = 'none';
        
        alert('Formulário limpo com sucesso!');
    }
}

function copyFicha() {
    const results = document.getElementById('results');
    if (!results || results.style.display === 'none') {
        alert('⚠️ Calcule a ficha primeiro usando o botão "Calcular Ficha"!');
        return;
    }
    
    const fichaText = generateFichaText();
    
    // Criar um elemento textarea temporário para cópia
    const textArea = document.createElement('textarea');
    textArea.value = fichaText;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    
    try {
        textArea.select();
        textArea.setSelectionRange(0, 99999); // Para dispositivos móveis
        
        const successful = document.execCommand('copy');
        
        if (successful) {
            // Feedback visual
            const copyBtn = document.querySelector('button[onclick="copyFicha()"]');
            const originalText = copyBtn.innerHTML;
            
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Ficha Copiada!';
            copyBtn.style.backgroundColor = '#27ae60';
            
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                copyBtn.style.backgroundColor = '';
            }, 2000);
            
            console.log('📋 Ficha copiada com sucesso!');
            console.log('Tamanho do texto:', fichaText.length, 'caracteres');
        } else {
            throw new Error('Falha no comando de cópia');
        }
    } catch (err) {
        console.error('Erro ao copiar:', err);
        alert('❌ Erro ao copiar a ficha. Tente selecionar e copiar manualmente.');
    } finally {
        document.body.removeChild(textArea);
    }
}

function previewFicha() {
    const results = document.getElementById('results');
    if (!results || results.style.display === 'none') {
        alert('Calcule a ficha primeiro!');
        return;
    }
    
    const fichaText = generateFichaText();
    
    // Criar janela/modal de pré-visualização
    const previewWindow = window.open('', 'Pré-visualização da Ficha', 
        'width=800,height=600,scrollbars=yes,resizable=yes');
    
    previewWindow.document.write(`
        <html>
        <head>
            <title>Pré-visualização da Ficha - RPG ARK</title>
            <style>
                body {
                    font-family: 'Courier New', monospace;
                    line-height: 1.4;
                    margin: 20px;
                    background: #1a1a1a;
                    color: #e0e0e0;
                    white-space: pre-wrap;
                    font-size: 12px;
                }
                h1 {
                    color: #d4af37;
                    text-align: center;
                }
                .section-title {
                    color: #4fc3f7;
                    font-weight: bold;
                    margin-top: 20px;
                    border-bottom: 1px solid #333;
                    padding-bottom: 5px;
                }
                .copy-btn {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #27ae60;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: bold;
                }
                .copy-btn:hover {
                    background: #219653;
                }
                .stats {
                    background: rgba(255,255,255,0.05);
                    padding: 10px;
                    border-radius: 5px;
                    margin: 10px 0;
                }
                .mutation {
                    background: rgba(46, 204, 113, 0.1);
                    padding: 10px;
                    margin: 5px 0;
                    border-left: 3px solid #2ecc71;
                }
                .weapon {
                    background: rgba(241, 196, 15, 0.1);
                    padding: 10px;
                    margin: 5px 0;
                    border-left: 3px solid #f1c40f;
                }
            </style>
        </head>
        <body>
            <button class="copy-btn" onclick="copyToClipboard()">📋 Copiar Ficha</button>
            <div id="fichaContent">${fichaText.replace(/\n/g, '<br>')}</div>
            
            <script>
                function copyToClipboard() {
                    const text = \`${fichaText.replace(/`/g, '\\`')}\`;
                    navigator.clipboard.writeText(text)
                        .then(() => {
                            alert('Ficha copiada!');
                            window.close();
                        })
                        .catch(err => {
                            alert('Erro ao copiar: ' + err);
                        });
                }
                
                // Destacar seções
                document.addEventListener('DOMContentLoaded', function() {
                    const content = document.getElementById('fichaContent');
                    let html = content.innerHTML;
                    
                    // Destacar títulos de seção
                    html = html.replace(/📋 INFORMAÇÕES BÁSICAS/g, '<div class="section-title">📋 INFORMAÇÕES BÁSICAS</div>');
                    html = html.replace(/⚡ ATRIBUTOS/g, '<div class="section-title">⚡ ATRIBUTOS</div>');
                    html = html.replace(/❤️ STATUS COMPLETOS/g, '<div class="section-title">❤️ STATUS COMPLETOS</div>');
                    html = html.replace(/🧬 MUTAÇÕES/g, '<div class="section-title">🧬 MUTAÇÕES</div>');
                    html = html.replace(/🎯 TABELA DE BÔNUS/g, '<div class="section-title">🎯 TABELA DE BÔNUS</div>');
                    html = html.replace(/🔮 RITUAIS E PACTOS/g, '<div class="section-title">🔮 RITUAIS E PACTOS</div>');
                    html = html.replace(/⚔️ ARSENAL DE ARMAS/g, '<div class="section-title">⚔️ ARSENAL DE ARMAS</div>');
                    html = html.replace(/🎒 INVENTÁRIO/g, '<div class="section-title">🎒 INVENTÁRIO</div>');
                    html = html.replace(/🏆 RECOMPENSAS/g, '<div class="section-title">🏆 RECOMPENSAS</div>');
                    html = html.replace(/📊 RESUMO FINAL/g, '<div class="section-title">📊 RESUMO FINAL</div>');
                    
                    content.innerHTML = html;
                });
            </script>
        </body>
        </html>
    `);
    
    previewWindow.document.close();
}

// ==============================================
// FUNÇÃO COMPLETA PARA EXPORTAR PARA PDF
// ==============================================

// ==============================================
// FUNÇÃO SIMPLIFICADA PARA EXPORTAR PARA PDF
// ==============================================

async function exportToPDF() {
    const results = document.getElementById('results');
    if (!results || results.style.display === 'none') {
        alert('⚠️ Calcule a ficha primeiro usando o botão "Calcular Ficha"!');
        return;
    }
    
    try {
        console.log('🔄 Iniciando geração de PDF...');
        
        // Mostrar loading
        const originalBtn = document.querySelector('button[onclick="exportToPDF()"]');
        const originalBtnText = originalBtn.innerHTML;
        originalBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gerando PDF...';
        originalBtn.disabled = true;
        
        // Coletar dados básicos
        const name = document.getElementById('name').value || 'Personagem Sem Nome';
        
        // Primeiro, vamos criar um elemento temporário com conteúdo otimizado para PDF
        const tempDiv = document.createElement('div');
        tempDiv.id = 'tempPdfContainer';
        tempDiv.style.cssText = `
            position: absolute;
            left: -10000px;
            top: 0;
            width: 800px;
            background: white;
            color: black;
            font-family: Arial, sans-serif;
            padding: 20px;
            box-sizing: border-box;
        `;
        
        // Conteúdo HTML simplificado para PDF
        tempDiv.innerHTML = generatePDFContent();
        
        document.body.appendChild(tempDiv);
        
        // Verificar se as bibliotecas estão carregadas
        if (typeof window.jspdf === 'undefined' || typeof html2canvas === 'undefined') {
            throw new Error('Bibliotecas para PDF não carregadas. Recarregue a página.');
        }
        
        // Usar html2canvas para capturar o conteúdo
        const canvas = await html2canvas(tempDiv, {
            scale: 1.5,
            useCORS: true,
            backgroundColor: '#ffffff',
            logging: false,
            allowTaint: true
        });
        
        // Configurar o PDF
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        // Calcular dimensões
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        // Converter canvas para imagem
        const imgData = canvas.toDataURL('image/png');
        
        // Adicionar imagem ao PDF
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        
        // Gerar nome do arquivo
        const fileName = `ficha_${name.replace(/\s+/g, '_')}_${Date.now()}.pdf`;
        
        // Salvar o PDF
        pdf.save(fileName);
        
        // Limpar
        document.body.removeChild(tempDiv);
        
        // Restaurar botão
        originalBtn.innerHTML = originalBtnText;
        originalBtn.disabled = false;
        
        console.log('✅ PDF gerado com sucesso:', fileName);
        alert(`✅ PDF "${fileName}" gerado com sucesso!`);
        
    } catch (error) {
        console.error('❌ Erro ao gerar PDF:', error);
        
        // Tentar restaurar o botão
        const originalBtn = document.querySelector('button[onclick="exportToPDF()"]');
        if (originalBtn) {
            originalBtn.innerHTML = '<i class="fas fa-file-pdf"></i> Exportar para PDF';
            originalBtn.disabled = false;
        }
        
        // Mostrar mensagem de erro específica
        let errorMessage = 'Erro ao gerar PDF. ';
        
        if (error.message.includes('Bibliotecas')) {
            errorMessage += 'Verifique sua conexão com a internet e recarregue a página.';
        } else if (error.message.includes('html2canvas')) {
            errorMessage += 'Problema ao capturar a tela.';
        } else {
            errorMessage += 'Detalhes: ' + error.message;
        }
        
        alert(`❌ ${errorMessage}\n\nVocê pode usar a opção "Copiar Ficha" como alternativa.`);
        
        // Fallback: abrir o conteúdo em nova janela para impressão
        if (confirm('Deseja abrir uma versão para impressão em vez disso?')) {
            openPrintableVersion();
        }
    }
}

// ==============================================
// FUNÇÃO PARA GERAR CONTEÚDO DO PDF (SIMPLIFICADA)
// ==============================================

function generatePDFContent() {
    const name = document.getElementById('name').value || 'Personagem Sem Nome';
    const age = document.getElementById('age').value || 'Não informado';
    const level = parseInt(document.getElementById('level').value) || 1;
    const class1 = document.getElementById('class1').value || 'Não selecionada';
    const combatClass = document.getElementById('combatClass').value || 'Não selecionada';
    const lore = document.getElementById('lore').value || '';
    
    // Calcular estatísticas básicas
    let vida = 55 + (attributes.vig * 15);
    let determinacaoSanidade = 55 + (attributes.int * 10) + (attributes.set * 15);
    let resistencia = 15 + (attributes.vig * 5);
    let folego = 4 + (attributes.vig * 1);
    let armadura = 5;
    
    const levelBonuses = getLevelBonuses(level);
    const classBonuses = getClassBonuses(class1);
    
    vida += levelBonuses.vida + classBonuses.vida;
    determinacaoSanidade += levelBonuses.determinacaoSanidade + classBonuses.determinacaoSanidade;
    resistencia += classBonuses.resistencia;
    folego += classBonuses.folego;
    armadura += levelBonuses.armadura + classBonuses.armadura;
    
    return `
        <div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
            <!-- Cabeçalho -->
            <div style="text-align: center; border-bottom: 3px solid #d4af37; padding-bottom: 20px; margin-bottom: 30px;">
                <h1 style="color: #333; margin: 0;">FICHA DE PERSONAGEM - RPG ARK</h1>
                <h2 style="color: #666; margin: 10px 0;">${name}</h2>
                <div style="display: flex; justify-content: center; gap: 20px; margin-top: 15px;">
                    <div><strong>Nível:</strong> ${level}</div>
                    <div><strong>Idade:</strong> ${age}</div>
                    <div><strong>Classe:</strong> ${class1}</div>
                </div>
            </div>
            
            <!-- Status -->
            <div style="margin-bottom: 30px;">
                <h3 style="color: #333; border-bottom: 2px solid #4fc3f7; padding-bottom: 5px;">STATUS</h3>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: 15px;">
                    <div style="background: #f0f8ff; padding: 15px; border-radius: 5px; text-align: center;">
                        <div style="font-size: 24px; font-weight: bold; color: #e74c3c;">${vida}</div>
                        <div style="color: #666;">VIDA</div>
                    </div>
                    <div style="background: #f0f8ff; padding: 15px; border-radius: 5px; text-align: center;">
                        <div style="font-size: 24px; font-weight: bold; color: #9b59b6;">${determinacaoSanidade}</div>
                        <div style="color: #666;">DETERMINAÇÃO</div>
                    </div>
                    <div style="background: #f0f8ff; padding: 15px; border-radius: 5px; text-align: center;">
                        <div style="font-size: 24px; font-weight: bold; color: #2ecc71;">${armadura}</div>
                        <div style="color: #666;">ARMADURA</div>
                    </div>
                    <div style="background: #f0f8ff; padding: 15px; border-radius: 5px; text-align: center;">
                        <div style="font-size: 24px; font-weight: bold; color: #f1c40f;">${resistencia}</div>
                        <div style="color: #666;">RESISTÊNCIA</div>
                    </div>
                    <div style="background: #f0f8ff; padding: 15px; border-radius: 5px; text-align: center;">
                        <div style="font-size: 24px; font-weight: bold; color: #3498db;">${folego}</div>
                        <div style="color: #666;">FÔLEGO</div>
                    </div>
                </div>
            </div>
            
            <!-- Atributos -->
            <div style="margin-bottom: 30px;">
                <h3 style="color: #333; border-bottom: 2px solid #3498db; padding-bottom: 5px;">ATRIBUTOS</h3>
                <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin-top: 15px;">
                    ${['AGI', 'FOR', 'INT', 'SET', 'VIG'].map(attr => `
                        <div style="background: #e8f4fc; padding: 15px; border-radius: 5px; text-align: center;">
                            <div style="color: #666; font-size: 14px;">${attr}</div>
                            <div style="font-size: 28px; font-weight: bold; color: #2980b9;">${attributes[attr.toLowerCase()]}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- Mutações -->
            <div style="margin-bottom: 30px;">
                <h3 style="color: #333; border-bottom: 2px solid #2ecc71; padding-bottom: 5px;">
                    MUTAÇÕES (${characterMutations.length})
                </h3>
                ${characterMutations.map((mut, index) => `
                    <div style="background: #f0f9f0; padding: 15px; border-radius: 5px; margin-top: 15px;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <h4 style="margin: 0; color: #27ae60;">${mut.name}</h4>
                            <span style="background: #d4af37; color: white; padding: 3px 10px; border-radius: 3px; font-size: 12px;">
                                ${mut.type.toUpperCase()} - Estágio ${mut.stage}
                            </span>
                        </div>
                        ${mut.description ? `
                            <p style="color: #555; margin: 10px 0; font-size: 14px;">${mut.description}</p>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
            
            <!-- Rodapé -->
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #777; font-size: 12px;">
                <div>Gerado em: ${new Date().toLocaleString('pt-BR')}</div>
                <div style="margin-top: 5px;">RPG ARK - Sistema de Ficha de Personagem</div>
            </div>
        </div>
    `;
}

// ==============================================
// FUNÇÃO FALLBACK PARA IMPRESSÃO
// ==============================================

function openPrintableVersion() {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Ficha de Personagem - RPG ARK</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                    background: white;
                    color: black;
                }
                @media print {
                    body { padding: 0; }
                    .no-print { display: none; }
                }
                .header {
                    text-align: center;
                    border-bottom: 3px solid #d4af37;
                    padding-bottom: 20px;
                    margin-bottom: 30px;
                }
                .section {
                    margin-bottom: 30px;
                    page-break-inside: avoid;
                }
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 15px;
                }
                .stat-box {
                    background: #f8f9fa;
                    padding: 15px;
                    border-radius: 5px;
                    text-align: center;
                    border: 1px solid #dee2e6;
                }
                .btn {
                    background: #007bff;
                    color: white;
                    padding: 10px 20px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    margin: 10px;
                }
            </style>
        </head>
        <body>
            <div class="no-print" style="text-align: center; margin-bottom: 20px;">
                <button class="btn" onclick="window.print()">🖨️ Imprimir</button>
                <button class="btn" onclick="window.close()">❌ Fechar</button>
            </div>
            ${generatePDFContent()}
            <div class="no-print" style="text-align: center; margin-top: 30px;">
                <p style="color: #666;">Use Ctrl+P para imprimir esta ficha</p>
            </div>
        </body>
        </html>
    `);
    printWindow.document.close();
}

// ==============================================
// FUNÇÕES AUXILIARES (se não existirem)
// ==============================================

function getLevelBonuses(level) {
    const bonuses = { vida: 0, determinacaoSanidade: 0, armadura: 0 };
    if (level >= 50) bonuses.vida += 30;
    if (level >= 65) bonuses.determinacaoSanidade += 20;
    if (level >= 80) bonuses.armadura += 10;
    if (level >= 95) {
        bonuses.vida += 20;
        bonuses.determinacaoSanidade += 20;
    }
    if (level >= 99) bonuses.armadura += 10;
    return bonuses;
}

function getClassBonuses(className) {
    const bonuses = { vida: 0, determinacaoSanidade: 0, resistencia: 0, folego: 0, armadura: 0 };
    const bonusesMap = {
        'guerreiro': { vida: 20, armadura: 20 },
        'atirador': { vida: 10, determinacaoSanidade: 10 },
        'forjador': { vida: 15, resistencia: 5 },
        'arcano': { vida: 5, determinacaoSanidade: 25 },
        'cientista': { vida: 5, determinacaoSanidade: 20 },
        'sobrevivente': { vida: 15, folego: 1 },
        'construtor': { vida: 15 },
        'medico': { determinacaoSanidade: 25, armadura: 10 }
    };
    
    if (bonusesMap[className]) {
        Object.assign(bonuses, bonusesMap[className]);
    }
    
    return bonuses;
}

// Função auxiliar para cores de raridade
function getRarityColor(rarity) {
    const colors = {
        'comum': '#95a5a6',
        'incomum': '#2ecc71',
        'rara': '#3498db',
        'épica': '#9b59b6',
        'lendária': '#f1c40f',
        'mítica': '#e74c3c',
        'única': '#d4af37'
    };
    return colors[rarity.toLowerCase()] || '#95a5a6';
}

// Função auxiliar para exibir tipo de arma
function getWeaponTypeDisplay(type) {
    const types = {
        'arma_branca': 'Arma Branca',
        'arma_fogo': 'Arma de Fogo',
        'arma_arcana': 'Arma Arcana',
        'arma_explosiva': 'Arma Explosiva',
        'arma_distancia': 'Arma à Distância',
        'defesa': 'Defesa',
        'especial': 'Especial'
    };
    return types[type] || type;
}

// Função para obter bônus de nível
function getLevelBonuses(level) {
    const bonuses = {
        vida: 0,
        determinacaoSanidade: 0,
        armadura: 0
    };
    
    if (level >= 50) bonuses.vida += 30;
    if (level >= 65) bonuses.determinacaoSanidade += 20;
    if (level >= 80) bonuses.armadura += 10;
    if (level >= 95) {
        bonuses.vida += 20;
        bonuses.determinacaoSanidade += 20;
    }
    if (level >= 99) bonuses.armadura += 10;
    
    return bonuses;
}

// Função para obter bônus de classe
function getClassBonuses(className) {
    const bonuses = {
        vida: 0,
        determinacaoSanidade: 0,
        resistencia: 0,
        folego: 0,
        armadura: 0
    };
    
    switch(className) {
        case 'guerreiro':
            bonuses.vida += 20;
            bonuses.armadura += 20;
            break;
        case 'atirador':
            bonuses.vida += 10;
            bonuses.determinacaoSanidade += 10;
            break;
        case 'forjador':
            bonuses.vida += 15;
            bonuses.resistencia += 5;
            break;
        case 'arcano':
            bonuses.vida += 5;
            bonuses.determinacaoSanidade += 25;
            break;
        case 'cientista':
            bonuses.vida += 5;
            bonuses.determinacaoSanidade += 20;
            break;
        case 'sobrevivente':
            bonuses.vida += 15;
            bonuses.folego += 1;
            break;
        case 'construtor':
            bonuses.vida += 15;
            break;
        case 'medico':
            bonuses.determinacaoSanidade += 25;
            bonuses.armadura += 10;
            break;
    }
    
    return bonuses;
}

function generateFichaText() {
    const name = document.getElementById('name').value || 'Personagem Sem Nome';
    const age = document.getElementById('age').value || 'Não informado';
    const level = parseInt(document.getElementById('level').value) || 1;
    const class1 = document.getElementById('class1').value || 'Não selecionada';
    const combatClass = document.getElementById('combatClass').value || 'Não selecionada';
    const lore = document.getElementById('lore').value || '';
    
    // Calcular estatísticas (reutilizando a lógica de calculateStats)
    let vida = 55 + (attributes.vig * 15);
    let determinacaoSanidade = 55 + (attributes.int * 10) + (attributes.set * 15);
    let resistencia = 15 + (attributes.vig * 5);
    let folego = 4 + (attributes.vig * 1);
    let armadura = 5;
    
    // Aplicar bônus de nível
    const levelBonuses = getLevelBonuses(level);
    vida += levelBonuses.vida;
    determinacaoSanidade += levelBonuses.determinacaoSanidade;
    armadura += levelBonuses.armadura;
    
    // Aplicar bônus de classe
    const classBonuses = getClassBonuses(class1);
    vida += classBonuses.vida;
    determinacaoSanidade += classBonuses.determinacaoSanidade;
    resistencia += classBonuses.resistencia;
    folego += classBonuses.folego;
    armadura += classBonuses.armadura;
    
    // Bônus de mutação
    let totalMutationVida = 0;
    let totalMutationSanidade = 0;
    let totalMutationArmadura = 0;
    let totalMutationFolego = 0;
    let totalMutationResistencia = 0;
    
    characterMutations.forEach(mutation => {
        if (mutation.stats) {
            totalMutationVida += (mutation.stats.vida || 0);
            totalMutationSanidade += (mutation.stats.sanidade || 0);
            totalMutationArmadura += (mutation.stats.armadura || 0);
            totalMutationFolego += (mutation.stats.folego || 0);
            totalMutationResistencia += (mutation.stats.resistencia || 0);
        }
    });
    
    // Aplicar bônus de mutação
    vida += totalMutationVida;
    determinacaoSanidade += totalMutationSanidade;
    armadura += totalMutationArmadura;
    folego += totalMutationFolego;
    resistencia += totalMutationResistencia;
    
    // Coletar todos os bônus
    const mutationBonusesList = [];
    characterMutations.forEach(mutation => {
        if (mutation.bonuses && mutation.bonuses.length > 0) {
            mutation.bonuses.forEach(bonus => {
                if (bonus.action && bonus.action.trim() !== '') {
                    mutationBonusesList.push({
                        ...bonus,
                        mutationName: mutation.name,
                        isMutationBonus: true
                    });
                }
            });
        }
    });
    
    let text = '='.repeat(80) + '\n';
    text += 'FICHA COMPLETA DE PERSONAGEM - RPG ARK\n';
    text += '='.repeat(80) + '\n\n';
    
    // SEÇÃO 1: INFORMAÇÕES BÁSICAS
    text += '📋 INFORMAÇÕES BÁSICAS\n';
    text += '─'.repeat(40) + '\n';
    text += `Nome: ${name}\n`;
    text += `Idade: ${age}\n`;
    text += `Nível: ${level}\n`;
    text += `Classe Primitiva: ${class1}\n`;
    text += `Classe de Combate: ${combatClass}\n`;
    if (lore) text += `História/Background: ${lore}\n`;
    text += '\n';
    
    // SEÇÃO 2: ATRIBUTOS
    text += '⚡ ATRIBUTOS\n';
    text += '─'.repeat(40) + '\n';
    text += `AGILIDADE (AGI): ${attributes.agi}\n`;
    text += `FORÇA (FOR): ${attributes.for}\n`;
    text += `INTELIGÊNCIA (INT): ${attributes.int}\n`;
    text += `SENTIDOS (SET): ${attributes.set}\n`;
    text += `VIGOR (VIG): ${attributes.vig}\n`;
    text += '\n';
    
    // SEÇÃO 3: STATUS COMPLETOS
    text += '❤️ STATUS COMPLETOS\n';
    text += '─'.repeat(40) + '\n';
    text += `VIDA: ${vida} HP\n`;
    text += `  ├─ Base: ${55 + (attributes.vig * 15)}\n`;
    text += `  ├─ Classe (${class1}): +${classBonuses.vida}\n`;
    text += `  ├─ Nível (${level}): +${levelBonuses.vida}\n`;
    if (totalMutationVida > 0) text += `  └─ Mutações: +${totalMutationVida}\n`;
    text += '\n';
    
    text += `DETERMINAÇÃO/SANIDADE: ${determinacaoSanidade} SP\n`;
    text += `  ├─ Base: ${55 + (attributes.int * 10) + (attributes.set * 15)}\n`;
    text += `  ├─ Classe (${class1}): +${classBonuses.determinacaoSanidade}\n`;
    text += `  ├─ Nível (${level}): +${levelBonuses.determinacaoSanidade}\n`;
    if (totalMutationSanidade > 0) text += `  └─ Mutações: +${totalMutationSanidade}\n`;
    text += '\n';
    
    text += `RESISTÊNCIA: ${resistencia}\n`;
    text += `  ├─ Base: ${15 + (attributes.vig * 5)}\n`;
    text += `  ├─ Classe (${class1}): +${classBonuses.resistencia}\n`;
    if (totalMutationResistencia > 0) text += `  └─ Mutações: +${totalMutationResistencia}\n`;
    text += '\n';
    
    text += `FÔLEGO: ${folego}\n`;
    text += `  ├─ Base: ${4 + (attributes.vig * 1)}\n`;
    text += `  ├─ Classe (${class1}): +${classBonuses.folego}\n`;
    if (totalMutationFolego > 0) text += `  └─ Mutações: +${totalMutationFolego}\n`;
    text += '\n';
    
    text += `ARMADURA: ${armadura}\n`;
    text += `  ├─ Base: 5\n`;
    text += `  ├─ Classe (${class1}): +${classBonuses.armadura}\n`;
    text += `  ├─ Nível (${level}): +${levelBonuses.armadura}\n`;
    if (totalMutationArmadura > 0) text += `  └─ Mutações: +${totalMutationArmadura}\n`;
    text += '\n';
    
    // SEÇÃO 4: MUTAÇÕES DETALHADAS
    text += '🧬 MUTAÇÕES\n';
    text += '─'.repeat(40) + '\n';
    characterMutations.forEach((mut, index) => {
        text += `${index + 1}. ${mut.name.toUpperCase()} (${mut.type.toUpperCase()})\n`;
        text += `   Estágio: ${mut.stage}\n`;
        if (mut.source) text += `   Origem: ${mut.source}\n`;
        if (mut.description) {
            text += `   Descrição:\n`;
            const lines = mut.description.split('\n');
            lines.forEach(line => {
                if (line.trim()) text += `      ${line}\n`;
            });
        }
        
        // Status da mutação
        if (mut.stats) {
            const hasStats = Object.values(mut.stats).some(val => val > 0);
            if (hasStats) {
                text += `   Bônus de Status:\n`;
                if (mut.stats.vida > 0) text += `      +${mut.stats.vida} Vida\n`;
                if (mut.stats.sanidade > 0) text += `      +${mut.stats.sanidade} Sanidade\n`;
                if (mut.stats.armadura > 0) text += `      +${mut.stats.armadura} Armadura\n`;
                if (mut.stats.folego > 0) text += `      +${mut.stats.folego} Fôlego\n`;
                if (mut.stats.resistencia > 0) text += `      +${mut.stats.resistencia} Resistência\n`;
            }
        }
        
        // Bônus de ação da mutação
        if (mut.bonuses && mut.bonuses.length > 0) {
            text += `   Bônus de Ação:\n`;
            mut.bonuses
                .filter(b => b.action && b.action.trim() !== '')
                .forEach(bonus => {
                    text += `      ${bonus.action}: +${bonus.value}\n`;
                });
        }
        text += '\n';
    });
    
    // SEÇÃO 5: TABELA DE BÔNUS COMPLETA
    text += '🎯 TABELA DE BÔNUS EM AÇÕES\n';
    text += '─'.repeat(40) + '\n';
    
    // Bônus normais
    const normalBonuses = allBonuses.filter(b => b.action && b.action.trim() !== '');
    if (normalBonuses.length > 0) {
        text += 'BÔNUS NORMAIS:\n';
        normalBonuses
            .sort((a, b) => b.value - a.value)
            .forEach(bonus => {
                const weight = Math.floor(bonus.value / 5);
                text += `  ✓ ${bonus.action}: +${bonus.value} (${weight} peso${weight !== 1 ? 's' : ''})\n`;
            });
        text += '\n';
    }
    
    // Bônus aprendidos
    const learnedBonusesList = learnedBonuses.filter(b => b.action && b.action.trim() !== '');
    if (learnedBonusesList.length > 0) {
        text += 'BÔNUS APRENDIDOS:\n';
        learnedBonusesList
            .sort((a, b) => b.value - a.value)
            .forEach(bonus => {
                const weight = Math.floor(bonus.value / 5);
                text += `  🎓 ${bonus.action}: +${bonus.value} (${weight} peso${weight !== 1 ? 's' : ''})\n`;
            });
        text += '\n';
    }
    
    // Bônus de mutação
    if (mutationBonusesList.length > 0) {
        text += 'BÔNUS DE MUTAÇÃO:\n';
        mutationBonusesList
            .sort((a, b) => b.value - a.value)
            .forEach(bonus => {
                text += `  🧬 ${bonus.action}: +${bonus.value} (${bonus.mutationName})\n`;
            });
        text += '\n';
    }
    
    // Resumo de slots
    const totalSlots = getTotalBonusSlots();
    const usedSlots = getUsedBonusSlots();
    const usedWeight = getUsedBonusWeight();
    const totalWeight = getTotalBonusWeight();
    
    text += `RESUMO DE SLOTS:\n`;
    text += `  Slots usados: ${usedSlots}/${totalSlots}\n`;
    text += `  Peso usado: ${usedWeight}/${totalWeight}\n`;
    text += '\n';
    
    // SEÇÃO 6: RITUAIS E PACTOS
    if (rituals.length > 0) {
        text += '🔮 RITUAIS E PACTOS\n';
        text += '─'.repeat(40) + '\n';
        
        const aprendidos = rituals.filter(r => level >= r.nivel);
        const bloqueados = rituals.filter(r => level < r.nivel);
        
        text += `Total: ${rituals.length} | Aprendidos: ${aprendidos.length} | Bloqueados: ${bloqueados.length}\n\n`;
        
        if (aprendidos.length > 0) {
            text += 'DISPONÍVEIS (Aprendidos):\n';
            aprendidos.forEach(ritual => {
                text += `  ✅ ${ritual.nome}\n`;
                text += `     Tipo: ${ritual.tipo || 'Ritual'}\n`;
                if (ritual.elemento) text += `     Elemento: ${ritual.elemento}\n`;
                text += `     Nível Requerido: ${ritual.nivel}\n`;
                if (ritual.descricao) {
                    text += `     Descrição: ${ritual.descricao.substring(0, 150)}`;
                    if (ritual.descricao.length > 150) text += '...';
                    text += '\n';
                }
                text += '\n';
            });
        }
        
        if (bloqueados.length > 0) {
            text += 'BLOQUEADOS (Falta nível):\n';
            bloqueados.forEach(ritual => {
                text += `  🔒 ${ritual.nome}\n`;
                text += `     Tipo: ${ritual.tipo || 'Ritual'}\n`;
                if (ritual.elemento) text += `     Elemento: ${ritual.elemento}\n`;
                text += `     Nível Requerido: ${ritual.nivel} (Faltam ${ritual.nivel - level} níveis)\n`;
                text += '\n';
            });
        }
    }
    
    // SEÇÃO 7: ARSENAL DE ARMAS (COMPLETO)
    if (weapons.length > 0) {
        text += '⚔️ ARSENAL DE ARMAS\n';
        text += '─'.repeat(40) + '\n';
        
        weapons.forEach((weapon, index) => {
            text += `${index + 1}. ${weapon.name}\n`;
            text += `   Tipo: ${getWeaponTypeDisplay(weapon.type)}\n`;
            if (weapon.raridade) text += `   Raridade: ${weapon.raridade.toUpperCase()}\n`;
            if (weapon.origem) text += `   Origem: ${weapon.origem === 'forja' ? 'Arma Personalizada' : 'Arsenal Padrão'}\n`;
            
            text += `   Status:\n`;
            text += `     ▸ Dano: ${weapon.damage}\n`;
            if (weapon.ct && weapon.ct !== 'N/A') text += `     ▸ CT: ${weapon.ct}\n`;
            if (weapon.dct && weapon.dct !== 'N/A') text += `     ▸ DCT: ${weapon.dct}\n`;
            if (weapon.criticals) text += `     ▸ Críticos: ${weapon.criticals}\n`;
            if (weapon.resistence) text += `     ▸ Resistência: ${weapon.resistence}\n`;
            
            // Descrição
            if (weapon.description) {
                text += `   Descrição: ${weapon.description}\n`;
            }
            
            // Passivas
            if (weapon.passive) {
                text += `   Passiva: ${weapon.passive}\n`;
            }
            if (weapon.passivaRadiante) {
                text += `   Passiva Radiante: ${weapon.passivaRadiante}\n`;
            }
            if (weapon.passivaTek) {
                text += `   Passiva Tek: ${weapon.passivaTek}\n`;
            }
            
            // Modificadores (corrigindo a forma como são exibidos)
            if (weapon.modificadoresLista && Array.isArray(weapon.modificadoresLista) && weapon.modificadoresLista.length > 0) {
                text += `   Modificadores:\n`;
                weapon.modificadoresLista.forEach((mod, idx) => {
                    if (mod && typeof mod === 'object') {
                        text += `     ${idx + 1}. ${mod.nome || `Modificador ${idx + 1}`}\n`;
                        if (mod.efeito) text += `        Efeito: ${mod.efeito}\n`;
                        if (mod.descricao) text += `        Descrição: ${mod.descricao}\n`;
                    } else {
                        text += `     ${idx + 1}. ${mod}\n`;
                    }
                });
            } else if (weapon.modifiers && weapon.modifiers.trim() !== '') {
                text += `   Modificadores: ${weapon.modifiers}\n`;
            }
            
            text += '\n';
        });
    }
    
    // SEÇÃO 8: INVENTÁRIO
    const inventory = document.getElementById('inventory').value;
    if (inventory && inventory.trim() !== '') {
        text += '🎒 INVENTÁRIO\n';
        text += '─'.repeat(40) + '\n';
        const lines = inventory.split('\n');
        lines.forEach(line => {
            if (line.trim()) text += `• ${line.trim()}\n`;
        });
        text += '\n';
    }
    
    // SEÇÃO 9: RECOMPENSAS E PROGRESSÃO
    text += '🏆 RECOMPENSAS POR NÍVEL\n';
    text += '─'.repeat(40) + '\n';
    const rewards = getLevelRewards(level);
    if (rewards.length > 0) {
        rewards.forEach(reward => {
            text += `• ${reward}\n`;
        });
    } else {
        text += `Nível ${level}: Sem recompensas especiais ainda\n`;
    }
    text += '\n';
    
    // SEÇÃO 10: RESUMO FINAL
    text += '📊 RESUMO FINAL\n';
    text += '─'.repeat(40) + '\n';
    text += `Nível Atual: ${level}\n`;
    text += `Vida Total: ${vida} HP\n`;
    text += `Determinação/Sanidade Total: ${determinacaoSanidade} SP\n`;
    text += `Resistência Total: ${resistencia}\n`;
    text += `Fôlego Total: ${folego}\n`;
    text += `Armadura Total: ${armadura}\n`;
    text += `Mutações: ${characterMutations.length}\n`;
    text += `Bônus de Ação: ${normalBonuses.length + learnedBonusesList.length + mutationBonusesList.length}\n`;
    text += `Rituais/Pactos: ${rituals.length}\n`;
    text += `Armas no Arsenal: ${weapons.length}\n`;
    text += '\n';
    
    // SEÇÃO 11: METADADOS
    text += '📅 METADADOS\n';
    text += '─'.repeat(40) + '\n';
    text += `Data de Geração: ${new Date().toLocaleString('pt-BR')}\n`;
    if (currentUser) text += `Jogador: ${currentUser}\n`;
    text += `Sistema: RPG ARK - Ficha de Personagem\n`;
    text += '='.repeat(80) + '\n';
    
    return text;
}

// Função para formatar tipo de arma para texto
function getWeaponTypeDisplay(type) {
    const typeMap = {
        'arma_branca': 'Arma Branca',
        'arma_fogo': 'Arma de Fogo',
        'arma_arcana': 'Arma Arcana',
        'arma_explosiva': 'Arma Explosiva',
        'arma_distancia': 'Arma à Distância',
        'defesa': 'Escudo/Defesa',
        'especial': 'Arma Especial'
    };
    return typeMap[type] || type;
}

// Função para obter recompensas por nível
function getLevelRewards(level) {
    const rewards = [];
    
    if (level >= 15) rewards.push('Nível 15: +1 Ponto de Atributo');
    if (level >= 30) rewards.push('Nível 30: +3 slots para Bônus de Ação');
    if (level >= 50) {
        rewards.push('Nível 50: +30 de Vida');
        rewards.push('Nível 50: +3 slots para Bônus de Ação');
        rewards.push('Nível 50: Convite da Linhagem de Athenas');
        rewards.push('Nível 50: Presente de Evento Principal');
    }
    if (level >= 65) rewards.push('Nível 65: Mutação Primal evolui para Estágio 2');
    if (level >= 95) rewards.push('Nível 95: Mutação Primal evolui para Estágio 3');
    if (level >= 99) rewards.push('Nível 99: Mutação Primal evolui para Estágio 4');
    
    return rewards;
}

window.loginUser = loginUser;
window.logoutUser = logoutUser;
window.changeAttribute = changeAttribute;
window.calculateStats = calculateStats;
window.saveForm = saveForm;
window.resetForm = resetForm;
window.copyFicha = copyFicha;
window.exportToPDF = exportToPDF;
window.addBonus = addBonus;
window.addLearnedBonus = addLearnedBonus;
window.removeBonus = removeBonus;
window.removeLearnedBonus = removeLearnedBonus;
window.updateBonusValue = updateBonusValue;
window.updateLearnedBonusValue = updateLearnedBonusValue;
window.addMutationSlot = addMutationSlot;
window.removeMutationSlot = removeMutationSlot;
window.updateMutation = updateMutation;
window.updateMutationType = updateMutationType;
window.validateLevelInput = validateLevelInput;
window.removeRitual = removeRitual;
window.goToRitualsPage = goToRitualsPage;
window.addWeapon = addWeapon;
window.removeWeapon = removeWeapon;
window.updateWeapon = updateWeapon;
window.goToArsenalPage = goToArsenalPage;
window.addMutationBonus = addMutationBonus;
window.removeMutationBonus = removeMutationBonus;
window.updateMutationBonus = updateMutationBonus;
window.updateMutationStat = updateMutationStat;