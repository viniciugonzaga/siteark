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

 // Função que redireciona com base no argumento recebido
 function goToPage(page) {
    window.location.href = page; // Redireciona para a página passada como argumento
}
// Dados dos efeitos com suporte para imagens locais
const effectsData = {
    common: [
        {
            id: 1,
            name: "SANGRAMENTO",
            description: "Um efeito que surge um dano vindo de origem interna da vida do alvo, baseado no conceito de sangramento. Se o alvo pode sangrar, o efeito pode causar dano e acumular durante as rodadas.",
            type: "Dano Contínuo",
            icon: "../imagens/icon_sangramento.png", // Caminho da imagem local
            iconType: "image", // Tipo: image ou icon
            fallbackIcon: "fas fa-tint", // Fallback se imagem não carregar
            color: "#ad0513",
            tags: [
                { icon: "fas fa-layer-group", text: "Acumula" },
                { icon: "fas fa-heartbeat", text: "Dano por Rodada" },
                { icon: "fas fa-skull", text: "Dano Interno" }
            ],
            details: {
                acumula: "Sim",
                duracao: "Por rodadas",
                defesa: "Fortitude",
                dano: "Baseado no ataque"
            }
        },
        {
            id: 2,
            name: "VENENO",
            description: "Um efeito que surge um dano físico que pode contaminar tanto a carne, quanto materiais que não resistam a potência do veneno, podendo acumular por rodada.",
            type: "Dano Contínuo",
            icon: "../imagens/icon_peste.png",
            iconType: "image",
            fallbackIcon: "fas fa-skull-crossbones",
            color: "#39dd18ff",
            tags: [
                { icon: "fas fa-layer-group", text: "Acumula" },
                { icon: "fas fa-heartbeat", text: "Dano Físico" },
                { icon: "fas fa-radiation", text: "Contamina" }
            ],
            details: {
                acumula: "Sim",
                duracao: "Por rodadas",
                defesa: "Fortitude",
                dano: "Degenerativo"
            }
        },
        {
            id: 3,
            name: "QUEIMANDO",
            description: "Um efeito que surge um dano físico com base no calor, podendo ser aplicado em várias formas diferentes. Podendo também acumular durante as rodadas.",
            type: "Dano Contínuo",
            icon: "../imagens/icon_queimando.png",
            iconType: "image",
            fallbackIcon: "fas fa-fire",
            color: "#e74c3c",
            tags: [
                { icon: "fas fa-layer-group", text: "Acumula" },
                { icon: "fas fa-temperature-high", text: "Dano por Calor" },
                { icon: "fas fa-burn", text: "Aplicação Múltipla" }
            ],
            details: {
                acumula: "Sim",
                duracao: "Por rodadas",
                defesa: "Fortitude",
                dano: "Térmico"
            }
        },
        {
            id: 4,
            name: "ATORDOMENTO",
            description: "Um efeito que surge uma interrupção por força física ou mágica, deixando o alvo apenas se defender durante a rodada e não agir. Não pode acumular nas rodadas.",
            type: "Controle",
            icon: "../imagens/icon_atordoamento.png",
            iconType: "image",
            fallbackIcon: "fas fa-star-of-life",
            color: "#f39c12",
            tags: [
                { icon: "fas fa-ban", text: "Não Acumula" },
                { icon: "fas fa-shield-alt", text: "Só Defende" },
                { icon: "fas fa-fist-raised", text: "Força/Mágica" }
            ],
            details: {
                acumula: "Não",
                duracao: "1 Rodada",
                defesa: "Vontade",
                dano: "Nenhum"
            }
        },
        {
            id: 5,
            name: "VULNERÁVEL",
            description: "Um efeito que faz o alvo receber dano ignorando sua armadura, aplicando direto na vida. Não pode acumular nas rodadas.",
            type: "Debuff",
            icon: "../imagens/icon_vulneravel.png",
            iconType: "image",
            fallbackIcon: "fas fa-shield-virus",
            color: "#3498db",
            tags: [
                { icon: "fas fa-ban", text: "Não Acumula" },
                { icon: "fas fa-user-shield", text: "Ignora Armadura" },
                { icon: "fas fa-heart-broken", text: "Dano Direto" }
            ],
            details: {
                acumula: "Não",
                duracao: "Por rodadas",
                defesa: "Vontade",
                dano: "Ignora Defesas"
            }
        },
        {
            id: 6,
            name: "AGARRADO",
            description: "Um efeito que faz o alvo receber desvantagem em todos os testes de defesa, podendo acumular por número de seres que agarrem na rodada, porém os outros vão valer +2 para seres menores do que o alvo agarrado, +5 para Maiores.",
            type: "Controle/Debuff",
            icon: "../imagens/icon_agarrado.png",
            iconType: "image",
            fallbackIcon: "fas fa-hands",
            color: "#2ecc71",
            tags: [
                { icon: "fas fa-layer-group", text: "Acumula" },
                { icon: "fas fa-users", text: "Múltiplos Agentes" },
                { icon: "fas fa-balance-scale", text: "Desvantagem em Defesa" }
            ],
            details: {
                acumula: "Sim (por agente)",
                duracao: "Enquanto mantido",
                defesa: "Esquiva/Força",
                dano: "Nenhum"
            }
        },
        {
            id: 7,
            name: "FORTALECIDO/NERF",
            description: "Um efeito que se baseia em favorecer ou diminuir bônus em ações, testes, dados e entre outros valores mecânicos. Podendo acumular durante as rodadas.",
            type: "Buff/Debuff",
            icon: "../imagens/icon_buff.png",
            iconType: "image",
            fallbackIcon: "fas fa-chart-line",
            color: "#1abc9c",
            tags: [
                { icon: "fas fa-layer-group", text: "Acumula" },
                { icon: "fas fa-arrow-up", text: "Bônus/Ações" },
                { icon: "fas fa-dice", text: "Afeta Dados" }
            ],
            details: {
                acumula: "Sim",
                duracao: "Por rodadas",
                defesa: "Vontade",
                dano: "Nenhum"
            }
        },
        {
            id: 8,
            name: "ABALADO",
            description: "Um efeito que se baseia o alvo não poder se defender usando suas reações. Não acumulando.",
            type: "Debuff",
            icon: "../imagens/icon_abalado.png",
            iconType: "image",
            fallbackIcon: "fas fa-user-injured",
            color: "#95a5a6",
            tags: [
                { icon: "fas fa-ban", text: "Não Acumula" },
                { icon: "fas fa-running", text: "Sem Reações" },
                { icon: "fas fa-exclamation-triangle", text: "Defesa Reduzida" }
            ],
            details: {
                acumula: "Não",
                duracao: "1 Rodada",
                defesa: "Vontade",
                dano: "Nenhum"
            }
        },
        {
            id: 9,
            name: "SILENCIADO",
            description: "Um efeito que se baseia em cancelar qualquer ação de canalização, habilidades, rituais durante rodadas da duração do efeito do ataque. Não pode acumular.",
            type: "Controle",
            icon: "../imagens/icon_silenciado.png",
            iconType: "image",
            fallbackIcon: "fas fa-volume-mute",
            color: "#34495e",
            tags: [
                { icon: "fas fa-ban", text: "Não Acumula" },
                { icon: "fas fa-magic", text: "Bloqueia Magias" },
                { icon: "fas fa-hat-wizard", text: "Canalização" }
            ],
            details: {
                acumula: "Não",
                duracao: "Por rodadas",
                defesa: "Vontade",
                dano: "Nenhum"
            }
        },
        {
            id: 10,
            name: "EXPOSTO",
            description: "Um efeito que faz o alvo sofrer o dobro de dano durante a duração do efeito. Não podendo Acumular.",
            type: "Debuff",
            icon: "../imagens/icon_exposto.png",
            iconType: "image",
            fallbackIcon: "fas fa-eye",
            color: "#e67e22",
            tags: [
                { icon: "fas fa-ban", text: "Não Acumula" },
                { icon: "fas fa-bolt", text: "Dano Dobrado" },
                { icon: "fas fa-crosshairs", text: "Alvo Exposto" }
            ],
            details: {
                acumula: "Não",
                duracao: "Por rodadas",
                defesa: "Esquiva",
                dano: "100% Extra"
            }
        },
        {
            id: 11,
            name: "FURTIVO",
            description: "Um efeito que faz o alvo receber bônus em acertos e +2D de dano contra alvos desprevenidos. O efeito não pode acumular, todo alvo acertado por um inimigo furtivo, fica desprevenido.",
            type: "Buff",
            icon: "../imagens/icon_furtivo.png",
            iconType: "image",
            fallbackIcon: "fas fa-user-ninja",
            color: "#2c3e50",
            tags: [
                { icon: "fas fa-ban", text: "Não Acumula" },
                { icon: "fas fa-mask", text: "Furtividade" },
                { icon: "fas fa-dice-two", text: "+2D de Dano" }
            ],
            details: {
                acumula: "Não",
                duracao: "1 Ataque",
                defesa: "Percepção",
                dano: "+2D extra"
            }
        }
    ],
    special: [
        {
            id: 12,
            name: "GUARDA",
            description: "O alvo fica Protegido, fazendo todo acerto de qualquer ataque ser recebido pelo protetor. O efeito não pode acumular e se aplica até o final da duração.",
            type: "Proteção",
            icon: "../imagens/icon_guarda.png",
            iconType: "image",
            fallbackIcon: "fas fa-user-shield",
            color: "gold",
            details: {
                acumula: "Não",
                duracao: "Até cancelado",
                condicao: "Protege aliado",
                cancelamento: "Atordoamento/Silêncio"
            }
        },
        {
            id: 13,
            name: "REVIDE",
            description: "O alvo fica Versátil, fazendo uma reflexão do dano recebido usando reações ou ganhando um contra-ataque extra.",
            type: "Contrataque",
            icon: "../imagens/icon_revide.png",
            iconType: "image",
            fallbackIcon: "fas fa-exchange-alt",
            color: "gold",
            details: {
                acumula: "Não",
                duracao: "Por rodadas",
                efeito: "Contra-ataque",
                gatilho: "Ao receber dano"
            }
        },
        {
            id: 14,
            name: "VOANDO",
            description: "O alvo recebe valores adicionais em bônus contra ataques de arma corpo a corpo.",
            type: "Mobilidade",
            icon: "../imagens/icon_voar.png",
            iconType: "image",
            fallbackIcon: "fas fa-dove",
            color: "gold",
            details: {
                acumula: "Sim (bônus)",
                duracao: "Enquanto voando",
                vantagem: "Vs corpo a corpo",
                desvantagem: "Vs ataques aéreos"
            }
        }
    ],
    defenses: [
        {
            name: "ESQUIVA",
            description: "Esquiva do dano através de movimentos ágeis e rápidos.",
            icon: "fas fa-running",
            color: "#00bcd4"
        },
        {
            name: "CONTRA-ATAQUE",
            description: "Causa dano e esquiva simultaneamente ao defender.",
            icon: "fas fa-fist-raised",
            color: "#ff5722"
        },
        {
            name: "BLOQUEIO",
            description: "Anula completamente ou reduz significativamente o dano recebido.",
            icon: "fas fa-shield-alt",
            color: "#4caf50"
        },
        {
            name: "VONTADE",
            description: "Defesa mental contra efeitos psicológicos e mágicos.",
            icon: "fas fa-brain",
            color: "#9c27b0"
        },
        {
            name: "FORTITUDE",
            description: "Resistência física a efeitos, venenos e doenças.",
            icon: "fas fa-dumbbell",
            color: "#795548"
        }
    ],
    attributes: [
        {
            name: "VIGOR",
            description: "Aspectos da Vitalidade e Resistência a dor (1 Vig)",
            icon: "fas fa-heart",
            color: "#e91e63"
        },
        {
            name: "SENTIDOS",
            description: "Aspectos dos Sentidos Internos e Mentais (1 Set)",
            icon: "fas fa-eye",
            color: "#2196f3"
        },
        {
            name: "INTELECTO",
            description: "Aspectos de Intelecto e memória (1 Int)",
            icon: "fas fa-book",
            color: "#9c27b0"
        },
        {
            name: "FORÇA",
            description: "Aspectos de força física e corpo (1 For)",
            icon: "fas fa-dumbbell",
            color: "#ff9800"
        },
        {
            name: "AGILIDADE",
            description: "Aspectos de velocidade e flexibilidade (1 Agi)",
            icon: "fas fa-running",
            color: "#4caf50"
        }
    ]
};

// Função para renderizar ícone com suporte a imagens locais
function renderIcon(effect) {
    const effectColor = effect.color || '#b6fff3';
    
    // Se for do tipo imagem
    if (effect.iconType === 'image' && effect.icon) {
        return `
            <div class="icon-container">
                <img src="${effect.icon}" 
                     alt="${effect.name}" 
                     class="icon-image"
                     onerror="this.classList.add('hidden'); this.nextElementSibling.classList.add('show');"
                     style="filter: drop-shadow(0 0 3px ${effectColor})">
                <i class="${effect.fallbackIcon || 'fas fa-question-circle'} icon-fallback" 
                   style="color: ${effectColor}"></i>
            </div>
        `;
    }
    
    // Se for ícone FontAwesome
    return `<i class="${effect.icon || effect.fallbackIcon || 'fas fa-question-circle'}" 
                style="color: ${effectColor}; font-size: 1.5rem;"></i>`;
}

// Função para renderizar ícone no modal
function renderModalIcon(effect) {
    const effectColor = effect.color || '#b6fff3';
    
    if (effect.iconType === 'image' && effect.icon) {
        return `
            <div class="icon-container">
                <img src="${effect.icon}" 
                     alt="${effect.name}" 
                     class="icon-image"
                     onerror="this.classList.add('hidden'); this.nextElementSibling.classList.add('show');"
                     style="filter: drop-shadow(0 0 5px ${effectColor})">
                <i class="${effect.fallbackIcon || 'fas fa-question-circle'} icon-fallback" 
                   style="color: ${effectColor}"></i>
            </div>
        `;
    }
    
    return `<i class="${effect.icon || effect.fallbackIcon || 'fas fa-question-circle'}" 
                style="color: ${effectColor}; font-size: 2.5rem;"></i>`;
}

// Renderizar tabela de efeitos comuns
function renderEffectsTable() {
    const tableBody = document.getElementById('effectsTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = effectsData.common.map(effect => {
        // Converter cor HEX para RGB para usar no CSS
        const rgbColor = hexToRgb(effect.color || '#b6fff3');
        
        return `
            <tr data-effect-id="${effect.id}" style="--effect-color: ${effect.color || '#b6fff3'}; --effect-color-rgb: ${rgbColor};">
                <td class="effect-icon-cell">
                    <div class="effect-icon-small" style="border-color: ${effect.color || '#b6fff3'};">
                        ${renderIcon(effect)}
                    </div>
                </td>
                <td class="effect-name-cell">
                    <div class="effect-name">${effect.name}</div>
                    <span class="effect-type" style="border-color: ${effect.color || '#b6fff3'}; color: ${effect.color || '#b6fff3'}; background: rgba(${rgbColor}, 0.15);">
                        ${effect.type}
                    </span>
                </td>
                <td class="effect-desc-cell">
                    <div class="effect-desc">${effect.description}</div>
                </td>
                <td class="effect-tags-cell">
                    <div class="effect-tags-small">
                        ${effect.tags.map(tag => `
                            <span class="effect-tag-small" style="border-color: rgba(${rgbColor}, 0.3);">
                                <i class="${tag.icon}" style="color: ${effect.color || '#b6fff3'}"></i>
                                ${tag.text}
                            </span>
                        `).join('')}
                    </div>
                </td>
                <td class="effect-actions-cell">
                    <button class="action-button" onclick="showEffectModal(${effect.id})">
                        <i class="fas fa-eye"></i> Ver
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// Renderizar tabela de efeitos especiais
function renderSpecialEffectsTable() {
    const tableBody = document.getElementById('specialEffectsTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = effectsData.special.map(effect => {
        const goldRgb = '255, 215, 0';
        
        return `
            <tr data-effect-id="${effect.id}">
                <td>
                    <div class="effect-icon-small" style="border-color: gold; color: gold;">
                        ${renderIcon(effect)}
                    </div>
                </td>
                <td>
                    <div style="font-weight: 600; color: gold;">${effect.name}</div>
                    <span style="display: inline-block; padding: 2px 6px; background: rgba(${goldRgb}, 0.1); border-radius: 3px; font-size: 0.75rem; color: gold; border: 1px solid rgba(${goldRgb}, 0.3); margin-top: 3px;">
                        ${effect.type}
                    </span>
                </td>
                <td>
                    <div style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.4;">
                        ${effect.description}
                    </div>
                </td>
                <td>
                    <div style="font-size: 0.8rem; color: var(--text-muted);">
                        <div><strong>Acumula:</strong> ${effect.details.acumula}</div>
                        <div><strong>Duração:</strong> ${effect.details.duracao}</div>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// Renderizar tabela de defesas
function renderDefensesTable() {
    const tableBody = document.getElementById('defensesTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = effectsData.defenses.map(defense => {
        const rgbColor = hexToRgb(defense.color);
        
        return `
            <tr>
                <td>
                    <div class="defense-icon" style="--icon-color: ${defense.color}; border-color: ${defense.color}; color: ${defense.color}; background: rgba(${rgbColor}, 0.1);">
                        <i class="${defense.icon}"></i>
                    </div>
                </td>
                <td>
                    <div class="defense-name">${defense.name}</div>
                </td>
                <td>
                    <div class="defense-desc">${defense.description}</div>
                </td>
            </tr>
        `;
    }).join('');
}

// Renderizar tabela de atributos
function renderAttributesTable() {
    const tableBody = document.getElementById('attributesTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = effectsData.attributes.map(attr => {
        const rgbColor = hexToRgb(attr.color);
        
        return `
            <tr>
                <td>
                    <div class="attribute-icon" style="--icon-color: ${attr.color}; border-color: ${attr.color}; color: ${attr.color}; background: rgba(${rgbColor}, 0.1);">
                        <i class="${attr.icon}"></i>
                    </div>
                </td>
                <td>
                    <div class="attribute-name">${attr.name}</div>
                </td>
                <td>
                    <div class="attribute-desc">${attr.description}</div>
                </td>
            </tr>
        `;
    }).join('');
}

// Converter HEX para RGB
function hexToRgb(hex) {
    // Remove o # se presente
    hex = hex.replace('#', '');
    
    // Converte 3-digit hex para 6-digits
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    
    // Converte para RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `${r}, ${g}, ${b}`;
}

// Inicialização da página
document.addEventListener('DOMContentLoaded', function() {
    renderEffectsTable();
    renderSpecialEffectsTable();
    renderDefensesTable();
    renderAttributesTable();
    setupEventListeners();
    
    // Pré-carregar imagens para melhor experiência
    preloadImages();
});

// Pré-carregar imagens
function preloadImages() {
    const allEffects = [...effectsData.common, ...effectsData.special];
    
    allEffects.forEach(effect => {
        if (effect.iconType === 'image' && effect.icon) {
            const img = new Image();
            img.src = effect.icon;
        }
    });
}

// Configurar event listeners
function setupEventListeners() {
    // Clique nas linhas da tabela
    document.addEventListener('click', function(e) {
        const tableRow = e.target.closest('tr[data-effect-id]');
        if (tableRow) {
            const effectId = parseInt(tableRow.dataset.effectId);
            const effect = [...effectsData.common, ...effectsData.special].find(e => e.id === effectId);
            if (effect) {
                showEffectModal(effect);
            }
        }
        
        // Fechar modal ao clicar no overlay
        if (e.target.classList.contains('modal-overlay')) {
            hideEffectModal();
        }
        
        // Fechar modal ao clicar no botão X
        if (e.target.classList.contains('close-modal') || e.target.closest('.close-modal')) {
            hideEffectModal();
        }
    });
}

// Mostrar modal com detalhes do efeito (função global)
window.showEffectModal = function(effectId) {
    const effect = [...effectsData.common, ...effectsData.special].find(e => e.id === effectId);
    if (!effect) return;
    
    const modal = document.getElementById('effectModal');
    const modalContent = document.getElementById('effectDetails');
    
    const isSpecial = effectsData.special.some(e => e.id === effect.id);
    const effectColor = effect.color || (isSpecial ? 'gold' : '#b6fff3');
    const rgbColor = hexToRgb(effectColor);
    
    modalContent.innerHTML = `
        <button class="close-modal">
            <i class="fas fa-times"></i>
        </button>
        
        <div class="modal-header">
            <div class="modal-icon" style="--modal-effect-color: ${effectColor}; border-color: ${effectColor}; background: rgba(${rgbColor}, 0.1);">
                ${renderModalIcon(effect)}
            </div>
            <div class="modal-title">
                <h2>${effect.name}</h2>
                <span class="modal-type" style="border-color: rgba(${rgbColor}, 0.3); color: ${effectColor}; background: rgba(${rgbColor}, 0.15);">
                    ${effect.type}
                </span>
            </div>
        </div>
        
        <div class="modal-content">
            <div class="modal-description" style="border-left-color: ${effectColor};">
                ${effect.description}
                ${isSpecial ? `
                    <div style="margin-top: 15px; padding: 10px; background: rgba(255,215,0,0.1); border-radius: 4px; border-left: 3px solid gold;">
                        <strong style="color: gold; font-size: 0.9rem;">
                            <i class="fas fa-crown"></i> EFEITO ESPECIAL
                        </strong>
                        <p style="color: var(--text-secondary); font-size: 0.85rem; margin-top: 5px;">
                            Este efeito é reservado para situações específicas de combate e cenas narrativas especiais.
                        </p>
                    </div>
                ` : ''}
            </div>
            
            <div class="modal-details">
                <h3><i class="fas fa-info-circle"></i> DETALHES</h3>
                ${Object.entries(effect.details).map(([key, value]) => `
                    <div class="detail-item">
                        <strong>${formatDetailKey(key)}</strong>
                        <span style="color: ${effectColor};">${value}</span>
                    </div>
                `).join('')}
                
                ${!isSpecial ? `
                    <div class="detail-item">
                        <strong><i class="fas fa-dice"></i> Notação</strong>
                        <span style="color: ${effectColor};">1d ou -1d significa 1 dado ou -1 dado dos atributos ou dano</span>
                    </div>
                ` : ''}
            </div>
        </div>
        
        <div class="modal-tip">
            <h3><i class="fas fa-lightbulb"></i> DICA TÁTICA</h3>
            <p>${getMechanicalTip(effect.name)}</p>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Adicionar classes de fallback se as imagens falharem
    setTimeout(() => {
        const iconImages = modalContent.querySelectorAll('.icon-image');
        iconImages.forEach(img => {
            if (img.complete && img.naturalHeight === 0) {
                img.classList.add('hidden');
                const fallback = img.nextElementSibling;
                if (fallback && fallback.classList.contains('icon-fallback')) {
                    fallback.classList.add('show');
                }
            }
        });
    }, 100);
};

// Formatar chaves dos detalhes
function formatDetailKey(key) {
    const formatMap = {
        acumula: 'Acumulação',
        duracao: 'Duração',
        defesa: 'Defesa Contra',
        dano: 'Tipo de Dano',
        condicao: 'Condição',
        cancelamento: 'Cancelamento',
        efeito: 'Efeito Principal',
        gatilho: 'Gatilho',
        vantagem: 'Vantagem',
        desvantagem: 'Desvantagem'
    };
    return formatMap[key] || key.charAt(0).toUpperCase() + key.slice(1);
}

// Obter dica mecânica baseada no efeito
function getMechanicalTip(effectName) {
    const tips = {
        'SANGRAMENTO': 'Combine com ataques cortantes para aumentar a eficácia do sangramento. Criaturas sem sangue são imunes.',
        'VENENO': 'Excelente contra inimigos com muita armadura, pois ignora defesas físicas. Fortitude reduz o dano.',
        'QUEIMANDO': 'Pode se espalhar para objetos inflamáveis próximos. Água ou magias de gelo extinguem.',
        'ATORDOMENTO': 'Perfeito para controlar inimigos perigosos. Use após quebrar a defesa do alvo.',
        'VULNERÁVEL': 'Aplique antes de usar suas habilidades mais poderosas para maximizar o dano.',
        'AGARRADO': 'Trabalhe em equipe! Múltiplos agarrando o mesmo alvo tornam a fuga quase impossível.',
        'FORTALECIDO/NERF': 'Estados podem ser combinados, mas efeitos opostos se cancelam.',
        'ABALADO': 'Ótimo contra inimigos que dependem de reações para combater. Use antes de ataques em grupo.',
        'SILENCIADO': 'Devastador contra magos e conjuradores. Não afeta habilidades inatas ou físicas.',
        'EXPOSTO': 'Coordene com sua equipe para atacar o alvo exposto simultaneamente.',
        'FURTIVO': 'Posicione-se atrás do inimigo para ativar. Perdido se o alvo detectar você.',
        'GUARDA': 'Proteja aliados com pouca defesa. Fique atento ao seu próprio status.',
        'REVIDE': 'Use quando prevê que receberá muitos ataques. Não funciona contra dano em área.',
        'VOANDO': 'Mantenha distância de inimigos corpo a corpo. Cuidado com arqueiros e magos.'
    };
    
    return tips[effectName] || 'Efeito versátil que pode ser usado em diversas situações de combate. Experimente combinações!';
}

// Esconder modal
function hideEffectModal() {
    const modal = document.getElementById('effectModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Adicionar tecla ESC para fechar modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        hideEffectModal();
    }
});

// Adicionar classe quando a imagem falha
document.addEventListener('error', function(e) {
    if (e.target.classList.contains('icon-image')) {
        e.target.classList.add('hidden');
        const fallback = e.target.nextElementSibling;
        if (fallback && fallback.classList.contains('icon-fallback')) {
            fallback.classList.add('show');
        }
    }
}, true);  