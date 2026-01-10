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


// Configurações iniciais
const LOCAL_STORAGE_KEY = 'arkCharacterSheet';
let characterData = null;
let refreshInterval = null;

// Função principal para carregar a ficha
function loadFicha() {
    console.log('📖 Carregando ficha do personagem...');
    
    try {
        const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (!savedData) {
            showMessage('Nenhuma ficha encontrada. Volte à página principal e crie uma ficha primeiro.', 'warning');
            return;
        }
        
        characterData = JSON.parse(savedData);
        console.log('✅ Dados da ficha carregados:', characterData);
        
        updateFichaDisplay();
        setupAutoRefresh();
        
    } catch (error) {
        console.error('❌ Erro ao carregar ficha:', error);
        showMessage('Erro ao carregar a ficha. Os dados podem estar corrompidos.', 'error');
    }
}

// Atualizar toda a exibição da ficha
function updateFichaDisplay() {
    if (!characterData) return;
    
    // 1. Informações básicas
    updateBasicInfo();
    
    // 2. Status principais (vida, sanidade, etc)
    updateStatusDisplay();
    
    // 3. Atributos
    updateAttributesDisplay();
    
    // 4. Tabela de bônus
    updateBonusTable();
    
    // 5. Slots de mutação
    updateMutationsDisplay();
    
    // 6. Mutações Primal
    updatePrimalDisplay();
    
    // 7. Rodapé e metadados
    updateFooter();
}

// 1. Informações básicas
function updateBasicInfo() {
    document.getElementById('ficha-name').textContent = characterData.name || '-';
    document.getElementById('ficha-level').textContent = characterData.level || '1';
    document.getElementById('ficha-age').textContent = characterData.age || '-';
    document.getElementById('ficha-class').textContent = characterData.class1 || '-';
}

// 2. Status principais com barras de progresso
function updateStatusDisplay() {
    // Calcular status totais incluindo mutações
    const baseStats = calculateBaseStats();
    const mutationStats = calculateMutationStats();
    
    const totalStats = {
        vida: baseStats.vida + mutationStats.vida,
        sanidade: baseStats.sanidade + mutationStats.sanidade,
        armadura: baseStats.armadura + mutationStats.armadura,
        folego: baseStats.folego + mutationStats.folego,
        resistencia: baseStats.resistencia + mutationStats.resistencia
    };
    
    // Atualizar valores
    const stats = ['vida', 'sanidade', 'armadura', 'folego', 'resistencia'];
    stats.forEach(stat => {
        const element = document.getElementById(`ficha-${stat}`);
        if (element) {
            element.textContent = totalStats[stat] || 0;
        }
        
        // Atualizar barras de progresso
        const maxValue = getMaxStatValue(stat);
        const percentage = Math.min(100, (totalStats[stat] / maxValue) * 100);
        const bar = document.getElementById(`${stat}-bar`);
        if (bar) {
            bar.style.width = `${percentage}%`;
        }
        
        // Atualizar detalhes
        const detail = document.getElementById(`ficha-${stat}-detail`);
        if (detail) {
            detail.innerHTML = `
                <small>Base: ${baseStats[stat]} | Mutação: ${mutationStats[stat]}</small>
            `;
        }
    });
}

// Calcular stats base
function calculateBaseStats() {
    const level = parseInt(characterData.level) || 1;
    const attributes = characterData.attributesBase || { agi: 1, for: 1, int: 1, set: 1, vig: 1 };
    
    let vida = 55 + (attributes.vig * 15);
    let sanidade = 55 + (attributes.int * 10) + (attributes.set * 15);
    let resistencia = 15 + (attributes.vig * 5);
    let folego = 4 + (attributes.vig * 1);
    let armadura = 5;
    
    // Bônus de nível
    const levelBonuses = getLevelBonuses(level);
    vida += levelBonuses.vida;
    sanidade += levelBonuses.determinacaoSanidade;
    armadura += levelBonuses.armadura;
    
    // Bônus de classe
    const classBonuses = getClassBonuses(characterData.class1);
    vida += classBonuses.vida;
    sanidade += classBonuses.determinacaoSanidade;
    resistencia += classBonuses.resistencia;
    folego += classBonuses.folego;
    armadura += classBonuses.armadura;
    
    return { vida, sanidade, armadura, folego, resistencia };
}

// Calcular bônus de mutação
function calculateMutationStats() {
    const mutations = characterData.characterMutations || [];
    const stats = {
        vida: 0,
        sanidade: 0,
        armadura: 0,
        folego: 0,
        resistencia: 0
    };
    
    mutations.forEach(mutation => {
        if (mutation.stats) {
            stats.vida += (mutation.stats.vida || 0);
            stats.sanidade += (mutation.stats.sanidade || 0);
            stats.armadura += (mutation.stats.armadura || 0);
            stats.folego += (mutation.stats.folego || 0);
            stats.resistencia += (mutation.stats.resistencia || 0);
        }
    });
    
    return stats;
}

// 3. Atributos
function updateAttributesDisplay() {
    const attributes = characterData.attributesBase || { agi: 1, for: 1, int: 1, set: 1, vig: 1 };
    const container = document.getElementById('attributes-grid');
    
    container.innerHTML = '';
    
    Object.entries(attributes).forEach(([key, value]) => {
        const attrDiv = document.createElement('div');
        attrDiv.className = 'attribute-item';
        
        const label = key.toUpperCase();
        const mod = calculateAttributeModifier(value);
        
        attrDiv.innerHTML = `
            <span class="attribute-label">${label}</span>
            <div class="attribute-value">${value}</div>
            <span class="attribute-mod">${mod >= 0 ? '+' : ''}${mod}</span>
        `;
        
        container.appendChild(attrDiv);
    });
}

function calculateAttributeModifier(value) {
    return Math.floor((value - 10) / 2);
}

// 4. Tabela de bônus
function updateBonusTable() {
    const tableBody = document.getElementById('bonus-table-body');
    const slotsUsed = document.getElementById('slots-used');
    const slotsTotal = document.getElementById('slots-total');
    const weightUsed = document.getElementById('weight-used');
    const weightTotal = document.getElementById('weight-total');
    const bonusCount = document.getElementById('bonus-count');
    
    tableBody.innerHTML = '';
    
    // Coletar todos os bônus
    const allBonuses = [];
    
    // Bônus normais
    const normalBonuses = characterData.allBonuses || [];
    normalBonuses.forEach(bonus => {
        if (bonus.action && bonus.action.trim() !== '') {
            allBonuses.push({
                ...bonus,
                origin: 'Normal'
            });
        }
    });
    
    // Bônus aprendidos
    const learnedBonuses = characterData.learnedBonuses || [];
    learnedBonuses.forEach(bonus => {
        if (bonus.action && bonus.action.trim() !== '') {
            allBonuses.push({
                ...bonus,
                origin: 'Aprendido'
            });
        }
    });
    
    // Bônus de mutação
    const mutations = characterData.characterMutations || [];
    mutations.forEach(mutation => {
        if (mutation.bonuses) {
            mutation.bonuses.forEach(bonus => {
                if (bonus.action && bonus.action.trim() !== '') {
                    allBonuses.push({
                        ...bonus,
                        origin: mutation.name
                    });
                }
            });
        }
    });
    
    // Ordenar por valor (maior primeiro)
    allBonuses.sort((a, b) => b.value - a.value);
    
    // Adicionar à tabela
    allBonuses.forEach(bonus => {
        const row = document.createElement('tr');
        const weight = Math.floor(bonus.value / 5);
        
        row.innerHTML = `
            <td>${bonus.action}</td>
            <td>+${bonus.value}</td>
            <td>${weight}</td>
            <td>${bonus.origin}</td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Atualizar contadores
    const totalSlots = getTotalBonusSlots();
    const usedSlots = getUsedBonusSlots();
    const usedWeight = getUsedBonusWeight();
    
    slotsUsed.textContent = usedSlots;
    slotsTotal.textContent = totalSlots;
    weightUsed.textContent = usedWeight;
    weightTotal.textContent = totalSlots;
    bonusCount.textContent = `${allBonuses.length} bônus registrados`;
    
    // Destacar se slots excedidos
    if (usedSlots > totalSlots) {
        slotsUsed.style.color = '#e74c3c';
        slotsUsed.style.fontWeight = 'bold';
    }
    
    if (usedWeight > totalSlots) {
        weightUsed.style.color = '#e74c3c';
        weightUsed.style.fontWeight = 'bold';
    }
}

// Funções auxiliares para slots de bônus
function getTotalBonusSlots() {
    const level = parseInt(characterData.level) || 1;
    
    if (level >= 80) return 20;
    if (level >= 50) return 15;
    if (level >= 30) return 12;
    return 9;
}

function getUsedBonusSlots() {
    const allBonuses = characterData.allBonuses || [];
    return allBonuses.filter(b => b.action && b.action.trim() !== '').length;
}

function getUsedBonusWeight() {
    const allBonuses = characterData.allBonuses || [];
    return allBonuses.reduce((total, bonus) => {
        if (bonus.action && bonus.action.trim() !== '') {
            return total + (bonus.weight || Math.floor(bonus.value / 5));
        }
        return total;
    }, 0);
}

// 5. Slots de mutação
function updateMutationsDisplay() {
    const container = document.getElementById('mutations-grid');
    const countElement = document.getElementById('mutation-count');
    const summaryElement = document.getElementById('mutation-summary');
    
    container.innerHTML = '';
    
    const mutations = characterData.characterMutations || [];
    const mutationStats = {
        vida: 0,
        sanidade: 0,
        armadura: 0,
        folego: 0,
        resistencia: 0
    };
    
    mutations.forEach((mutation, index) => {
        const isPrimal = mutation.id === 0;
        
        const mutationDiv = document.createElement('div');
        mutationDiv.className = `mutation-card ${isPrimal ? 'primal' : ''}`;
        mutationDiv.onclick = () => showMutationDetails(mutation);
        
        // Calcular bônus totais desta mutação
        const stats = mutation.stats || {};
        const bonuses = mutation.bonuses || [];
        
        let statsHTML = '';
        if (stats.vida > 0) {
            statsHTML += `<span class="mutation-stat">❤️ +${stats.vida}</span>`;
            mutationStats.vida += stats.vida;
        }
        if (stats.sanidade > 0) {
            statsHTML += `<span class="mutation-stat">🧠 +${stats.sanidade}</span>`;
            mutationStats.sanidade += stats.sanidade;
        }
        if (stats.armadura > 0) {
            statsHTML += `<span class="mutation-stat">🛡️ +${stats.armadura}</span>`;
            mutationStats.armadura += stats.armadura;
        }
        if (stats.folego > 0) {
            statsHTML += `<span class="mutation-stat">💨 +${stats.folego}</span>`;
            mutationStats.folego += stats.folego;
        }
        if (stats.resistencia > 0) {
            statsHTML += `<span class="mutation-stat">💪 +${stats.resistencia}</span>`;
            mutationStats.resistencia += stats.resistencia;
        }
        
        mutationDiv.innerHTML = `
            <div class="mutation-name">${mutation.name}</div>
            <div class="mutation-type">${mutation.type.toUpperCase()} - Estágio ${mutation.stage || 1}</div>
            <div class="mutation-stats">
                ${statsHTML || '<small>Sem bônus de status</small>'}
            </div>
            ${bonuses.length > 0 ? `<small>${bonuses.length} bônus de ação</small>` : ''}
        `;
        
        container.appendChild(mutationDiv);
    });
    
    // Atualizar contador
    countElement.textContent = `${mutations.length}/∞`;
    
    // Atualizar resumo
    updateMutationSummary(mutationStats, summaryElement);
}

function updateMutationSummary(stats, element) {
    element.innerHTML = '';
    
    Object.entries(stats).forEach(([stat, value]) => {
        if (value > 0) {
            const statName = {
                vida: 'Vida',
                sanidade: 'Sanidade',
                armadura: 'Armadura',
                folego: 'Fôlego',
                resistencia: 'Resistência'
            }[stat];
            
            const statIcon = {
                vida: '❤️',
                sanidade: '🧠',
                armadura: '🛡️',
                folego: '💨',
                resistencia: '💪'
            }[stat];
            
            const div = document.createElement('div');
            div.className = 'summary-item';
            div.innerHTML = `
                <span>${statIcon} ${statName}</span>
                <span>+${value}</span>
            `;
            element.appendChild(div);
        }
    });
    
    if (element.children.length === 0) {
        element.innerHTML = '<div class="summary-item"><span>Nenhum bônus de mutação</span></div>';
    }
}

// 6. Mutações Primal
function updatePrimalDisplay() {
    const mutations = characterData.characterMutations || [];
    const primal = mutations.find(m => m.id === 0);
    
    if (!primal) return;
    
    document.getElementById('primal-stage').textContent = primal.stage || 1;
    document.getElementById('primal-vida').textContent = primal.stats?.vida || 0;
    document.getElementById('primal-sanidade').textContent = primal.stats?.sanidade || 0;
    document.getElementById('primal-armadura').textContent = primal.stats?.armadura || 0;
    document.getElementById('primal-folego').textContent = primal.stats?.folego || 0;
    document.getElementById('primal-resistencia').textContent = primal.stats?.resistencia || 0;
    
    const descElement = document.getElementById('primal-description-text');
    if (primal.description && primal.description.trim() !== '') {
        descElement.textContent = primal.description;
    } else {
        descElement.textContent = 'Nenhuma descrição fornecida.';
    }
}

// 7. Rodapé
function updateFooter() {
    const generationTime = document.getElementById('generation-time');
    const footerUser = document.getElementById('footer-user');
    const lastUpdate = document.getElementById('last-update');
    
    const now = new Date();
    generationTime.textContent = now.toLocaleString('pt-BR');
    
    const user = characterData.user || 'Não logado';
    footerUser.textContent = `Usuário: ${user}`;
    
    const savedAt = characterData.savedAt ? new Date(characterData.savedAt) : now;
    lastUpdate.textContent = `Última atualização: ${savedAt.toLocaleTimeString('pt-BR')}`;
}

// Funções auxiliares
function getMaxStatValue(stat) {
    const maxValues = {
        vida: 500,
        sanidade: 300,
        armadura: 100,
        folego: 20,
        resistencia: 100
    };
    return maxValues[stat] || 100;
}

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

// Modal para detalhes
function showMutationDetails(mutation) {
    const modal = document.getElementById('detail-modal');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    
    title.textContent = mutation.name;
    
    let html = `
        <div class="mutation-detail">
            <div class="detail-row">
                <strong>Tipo:</strong> ${mutation.type.toUpperCase()}
            </div>
            <div class="detail-row">
                <strong>Estágio:</strong> ${mutation.stage || 1}
            </div>
    `;
    
    if (mutation.source) {
        html += `
            <div class="detail-row">
                <strong>Origem:</strong> ${mutation.source}
            </div>
        `;
    }
    
    // Status da mutação
    const stats = mutation.stats || {};
    const hasStats = Object.values(stats).some(val => val > 0);
    
    if (hasStats) {
        html += `
            <div class="detail-section">
                <h4><i class="fas fa-chart-line"></i> Bônus de Status</h4>
                <div class="stats-grid">
        `;
        
        if (stats.vida > 0) html += `<div class="stat-item">❤️ Vida: +${stats.vida}</div>`;
        if (stats.sanidade > 0) html += `<div class="stat-item">🧠 Sanidade: +${stats.sanidade}</div>`;
        if (stats.armadura > 0) html += `<div class="stat-item">🛡️ Armadura: +${stats.armadura}</div>`;
        if (stats.folego > 0) html += `<div class="stat-item">💨 Fôlego: +${stats.folego}</div>`;
        if (stats.resistencia > 0) html += `<div class="stat-item">💪 Resistência: +${stats.resistencia}</div>`;
        
        html += `</div></div>`;
    }
    
    // Bônus de ação
    const bonuses = mutation.bonuses || [];
    if (bonuses.length > 0) {
        html += `
            <div class="detail-section">
                <h4><i class="fas fa-plus-circle"></i> Bônus de Ação</h4>
                <div class="bonuses-list">
        `;
        
        bonuses.forEach(bonus => {
            if (bonus.action && bonus.action.trim() !== '') {
                html += `
                    <div class="bonus-item">
                        <strong>${bonus.action}:</strong> +${bonus.value}
                    </div>
                `;
            }
        });
        
        html += `</div></div>`;
    }
    
    // Descrição
    if (mutation.description) {
        html += `
            <div class="detail-section">
                <h4><i class="fas fa-file-alt"></i> Descrição</h4>
                <div class="description-box">
                    ${mutation.description.replace(/\n/g, '<br>')}
                </div>
            </div>
        `;
    }
    
    html += `</div>`;
    
    body.innerHTML = html;
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('detail-modal').style.display = 'none';
}

// Configurar auto-atualização
function setupAutoRefresh() {
    if (refreshInterval) {
        clearInterval(refreshInterval);
    }
    
    // Atualizar a cada 30 segundos
    refreshInterval = setInterval(() => {
        console.log('🔄 Atualizando ficha automaticamente...');
        loadFicha();
    }, 30000);
}

// Funções de UI
function showMessage(message, type = 'info') {
    const colors = {
        info: '#3498db',
        success: '#27ae60',
        warning: '#f39c12',
        error: '#e74c3c'
    };
    
    // Criar elemento de mensagem
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    
    // Remover após 5 segundos
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 5000);
}

// Funções exportadas para botões
function refreshFicha() {
    loadFicha();
    showMessage('Ficha atualizada!', 'success');
}

function exportFicha() {
    const dataStr = JSON.stringify(characterData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `ficha_${characterData.name || 'personagem'}_${Date.now()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showMessage('Ficha exportada como JSON!', 'success');
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Inicializando visualizador de ficha...');
    loadFicha();
    
    // Fechar modal ao clicar fora
    window.onclick = (event) => {
        const modal = document.getElementById('detail-modal');
        if (event.target === modal) {
            closeModal();
        }
    };
    
    // Fechar modal com ESC
    document.onkeydown = (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    };
});

// Adicionar estilos de animação
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .mutation-detail {
        padding: 10px;
    }
    
    .detail-row {
        margin-bottom: 10px;
        padding: 8px;
        background: rgba(255,255,255,0.05);
        border-radius: 4px;
    }
    
    .detail-section {
        margin-top: 20px;
        padding-top: 15px;
        border-top: 1px solid #2a2a3e;
    }
    
    .detail-section h4 {
        color: #d4af37;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 10px;
        margin-top: 10px;
    }
    
    .stat-item {
        padding: 8px;
        background: rgba(255,255,255,0.05);
        border-radius: 4px;
        text-align: center;
    }
    
    .bonuses-list {
        margin-top: 10px;
    }
    
    .bonus-item {
        padding: 8px;
        margin-bottom: 5px;
        background: rgba(52, 152, 219, 0.1);
        border-radius: 4px;
        border-left: 3px solid #3498db;
    }
    
    .description-box {
        background: rgba(255,255,255,0.05);
        padding: 15px;
        border-radius: 6px;
        line-height: 1.6;
        max-height: 200px;
        overflow-y: auto;
    }
`;
document.head.appendChild(style);


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
        "Você encontra um Pelo liso branco de Ovelha",
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