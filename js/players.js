// ========================
// Sistema de Dados (mantido igual)
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

// Funções do sistema de dados
openMenuButton.addEventListener('click', () => {
    menu.classList.remove('hidden');
});

closeMenuButton.addEventListener('click', () => {
    menu.classList.add('hidden');
});

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

clearRollsButton.addEventListener('click', () => {
    playerScores = {};
    rollList.innerHTML = '';
    totalDisplay.textContent = 'Total geral: 0';
});

// Gerenciador de Jogadores
class PlayerManager {
    constructor() {
        this.players = JSON.parse(localStorage.getItem('rpgPlayers')) || [];
        this.currentPlayerId = null;
        this.imageFile = null;
        this.pdfMode = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadPlayers();
        this.updateCounters();
        this.initJoice();
    }

    bindEvents() {
        // Botões de ação
        document.getElementById('add-player-btn').addEventListener('click', () => this.openPlayerModal());
        document.getElementById('reset-all-btn').addEventListener('click', () => this.resetAllPlayers());
        
        // Modal de jogador
        document.getElementById('modal-close').addEventListener('click', () => this.closePlayerModal());
        document.getElementById('cancel-btn').addEventListener('click', () => this.closePlayerModal());
        document.getElementById('modal-overlay').addEventListener('click', () => this.closePlayerModal());
        document.getElementById('player-form').addEventListener('submit', (e) => this.savePlayer(e));
        
        // Modal de personagem
        document.getElementById('character-modal-close').addEventListener('click', () => this.closeCharacterModal());
        document.getElementById('character-modal-overlay').addEventListener('click', () => this.closeCharacterModal());
        
        // Busca
        document.getElementById('search-btn').addEventListener('click', () => this.searchPlayers());
        document.getElementById('search-players').addEventListener('input', () => this.searchPlayers());
        
        // Upload de imagem
        document.getElementById('upload-image-btn').addEventListener('click', () => {
            document.getElementById('character-image-upload').click();
        });
        
        document.getElementById('character-image-upload').addEventListener('change', (e) => {
            this.handleImageUpload(e.target.files[0]);
        });
        
        // Exportação PDF
        document.getElementById('pdf-export-btn').addEventListener('click', () => this.togglePdfMode());
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    handleImageUpload(file) {
        if (!file) return;
        
        if (!file.type.match('image.*')) {
            alert('Por favor, selecione um arquivo de imagem.');
            return;
        }
        
        if (file.size > 5 * 1024 * 1024) { // 5MB
            alert('A imagem deve ter menos de 5MB.');
            return;
        }
        
        this.imageFile = file;
        
        // Mostrar preview
        const reader = new FileReader();
        reader.onload = (e) => {
            const preview = document.getElementById('image-preview');
            preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
    }

    openPlayerModal(playerId = null) {
        const modal = document.getElementById('player-modal');
        const form = document.getElementById('player-form');
        const title = document.getElementById('modal-title');
        
        this.currentPlayerId = playerId;
        this.imageFile = null;
        
        if (playerId) {
            title.textContent = 'Editar Jogador';
            const player = this.players.find(p => p.id === playerId);
            if (player) {
                this.fillForm(player);
            }
        } else {
            title.textContent = 'Adicionar Novo Jogador';
            form.reset();
            document.getElementById('image-preview').innerHTML = '<i class="fas fa-user"></i>';
            // Valores padrão
            document.getElementById('max-hp').value = 100;
            document.getElementById('current-hp').value = 100;
            document.getElementById('armor').value = 10;
            document.getElementById('max-sanity').value = 100;
            document.getElementById('current-sanity').value = 100;
            document.getElementById('honor').value = 0;
        }
        
        modal.classList.add('show');
    }

    closePlayerModal() {
        document.getElementById('player-modal').classList.remove('show');
        document.getElementById('player-form').reset();
        document.getElementById('image-preview').innerHTML = '<i class="fas fa-user"></i>';
        document.getElementById('character-image-upload').value = '';
        this.currentPlayerId = null;
        this.imageFile = null;
    }

    fillForm(player) {
        document.getElementById('player-name').value = player.playerName;
        document.getElementById('character-name').value = player.characterName;
        document.getElementById('max-hp').value = player.maxHP;
        document.getElementById('current-hp').value = player.currentHP;
        document.getElementById('armor').value = player.armor;
        document.getElementById('max-sanity').value = player.maxSanity;
        document.getElementById('current-sanity').value = player.currentSanity;
        document.getElementById('honor').value = player.honor;
        document.getElementById('character-tribe').value = player.tribe || '';
        document.getElementById('character-clan').value = player.clan || '';
        document.getElementById('traumas').value = player.traumas || '';
        
        // Configurar preview da imagem
        const preview = document.getElementById('image-preview');
        if (player.characterImage) {
            preview.innerHTML = `<img src="${player.characterImage}" alt="${player.characterName}">`;
        } else {
            preview.innerHTML = '<i class="fas fa-user"></i>';
        }
    }

    savePlayer(e) {
        e.preventDefault();
        
        const playerData = {
            id: this.currentPlayerId || this.generateId(),
            playerName: document.getElementById('player-name').value,
            characterName: document.getElementById('character-name').value,
            maxHP: parseInt(document.getElementById('max-hp').value),
            currentHP: parseInt(document.getElementById('current-hp').value),
            armor: parseInt(document.getElementById('armor').value),
            maxSanity: parseInt(document.getElementById('max-sanity').value),
            currentSanity: parseInt(document.getElementById('current-sanity').value),
            honor: parseInt(document.getElementById('honor').value),
            tribe: document.getElementById('character-tribe').value,
            clan: document.getElementById('character-clan').value,
            traumas: document.getElementById('traumas').value,
            createdAt: new Date().toISOString()
        };

        // Processar imagem
        if (this.imageFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                playerData.characterImage = e.target.result;
                this.finalizeSave(playerData);
            };
            reader.readAsDataURL(this.imageFile);
        } else if (this.currentPlayerId) {
            // Manter imagem existente se editando
            const existingPlayer = this.players.find(p => p.id === this.currentPlayerId);
            playerData.characterImage = existingPlayer?.characterImage || null;
            this.finalizeSave(playerData);
        } else {
            playerData.characterImage = null;
            this.finalizeSave(playerData);
        }
    }

    finalizeSave(playerData) {
        // Validar dados
        if (playerData.currentHP > playerData.maxHP) playerData.currentHP = playerData.maxHP;
        if (playerData.currentSanity > playerData.maxSanity) playerData.currentSanity = playerData.maxSanity;

        if (this.currentPlayerId) {
            // Editar jogador existente
            const index = this.players.findIndex(p => p.id === this.currentPlayerId);
            if (index !== -1) {
                this.players[index] = playerData;
            }
        } else {
            // Adicionar novo jogador
            this.players.push(playerData);
        }

        this.saveToLocalStorage();
        this.loadPlayers();
        this.closePlayerModal();
    }

    deletePlayer(playerId) {
        if (confirm('Tem certeza que deseja remover este jogador?')) {
            this.players = this.players.filter(p => p.id !== playerId);
            this.saveToLocalStorage();
            this.loadPlayers();
        }
    }

    resetAllPlayers() {
        if (confirm('Tem certeza que deseja resetar todos os jogadores? A vida e sanidade voltarão ao máximo.')) {
            this.players.forEach(player => {
                player.currentHP = player.maxHP;
                player.currentSanity = player.maxSanity;
            });
            this.saveToLocalStorage();
            this.loadPlayers();
        }
    }

    updatePlayerStat(playerId, stat, value) {
        const player = this.players.find(p => p.id === playerId);
        if (!player) return;

        let newValue = player[stat] + value;
        
        // Limitar valores
        if (stat === 'currentHP' || stat === 'currentSanity') {
            const maxStat = stat === 'currentHP' ? 'maxHP' : 'maxSanity';
            newValue = Math.max(0, Math.min(newValue, player[maxStat]));
        } else if (stat === 'armor' || stat === 'honor') {
            newValue = Math.max(0, newValue);
        }

        player[stat] = newValue;
        this.saveToLocalStorage();
        this.updatePlayerCard(playerId);
        this.updateCounters();
    }

    updatePlayerCard(playerId) {
        const player = this.players.find(p => p.id === playerId);
        if (!player) return;

        const card = document.querySelector(`[data-player-id="${playerId}"]`);
        if (!card) return;

        // Atualizar valores
        card.querySelector('.player-name').textContent = player.playerName;
        card.querySelector('.character-name').textContent = player.characterName;
        card.querySelector('.hp-value').textContent = player.currentHP;
        card.querySelector('.sanity-value').textContent = player.currentSanity;
        card.querySelector('.armor-value').textContent = player.armor;
        card.querySelector('.honor-value').textContent = player.honor;

        // Atualizar avatar
        const avatar = card.querySelector('.player-avatar');
        if (player.characterImage) {
            avatar.innerHTML = `<img src="${player.characterImage}" alt="${player.characterName}" onerror="this.style.display='none'; this.parentElement.innerHTML='<i class=\\'fas fa-user\\'></i>';" />`;
        } else {
            avatar.innerHTML = '<i class="fas fa-user"></i>';
        }

        // Atualizar barras de progresso
        const hpPercent = (player.currentHP / player.maxHP) * 100;
        const sanityPercent = (player.currentSanity / player.maxSanity) * 100;
        
        const hpBar = card.querySelector('.hp-progress .progress-fill');
        const sanityBar = card.querySelector('.sanity-progress .progress-fill');
        
        hpBar.style.width = `${hpPercent}%`;
        sanityBar.style.width = `${sanityPercent}%`;

        // Verificar status crítico
        const isHpCritical = hpPercent <= 30;
        const isSanityCritical = sanityPercent <= 30;
        
        hpBar.classList.toggle('low', isHpCritical);
        sanityBar.classList.toggle('low', isSanityCritical);
        card.classList.toggle('critical', isHpCritical || isSanityCritical);
        
        avatar.classList.toggle('critical', isHpCritical || isSanityCritical);
    }

    loadPlayers() {
        const grid = document.getElementById('players-grid');
        const emptyState = document.getElementById('empty-state');
        
        grid.innerHTML = '';
        
        if (this.players.length === 0) {
            emptyState.classList.add('show');
            return;
        }
        
        emptyState.classList.remove('show');
        
        this.players.forEach(player => {
            const card = this.createPlayerCard(player);
            grid.appendChild(card);
        });
        
        this.updateCounters();
    }

    createPlayerCard(player) {
        const hpPercent = (player.currentHP / player.maxHP) * 100;
        const sanityPercent = (player.currentSanity / player.maxSanity) * 100;
        const isCritical = hpPercent <= 30 || sanityPercent <= 30;
        
        const card = document.createElement('div');
        card.className = `player-card ${isCritical ? 'critical' : ''} ${this.pdfMode ? 'pdf-mode' : ''}`;
        card.dataset.playerId = player.id;
        
        card.innerHTML = `
            <div class="player-header">
                <div class="player-avatar ${isCritical ? 'critical' : ''}">
                    ${player.characterImage ? 
                        `<img src="${player.characterImage}" alt="${player.characterName}" onerror="this.style.display='none'; this.parentElement.innerHTML='<i class=\\'fas fa-user\\'></i>';" />` : 
                        '<i class="fas fa-user"></i>'
                    }
                </div>
                <div class="player-info">
                    <div class="player-name" title="${player.playerName}">${player.playerName}</div>
                    <div class="character-name" title="${player.characterName}">${player.characterName}</div>
                </div>
            </div>
            
            <div class="player-stats">
                <!-- Vida -->
                <div class="stat-item">
                    <div class="stat-header">
                        <span class="stat-label">
                            <i class="fas fa-heart"></i> Vida
                        </span>
                        <span class="stat-value hp-value">${player.currentHP}</span>
                    </div>
                    <div class="progress-bar hp-progress">
                        <div class="progress-fill hp ${hpPercent <= 30 ? 'low' : ''}" style="width: ${hpPercent}%"></div>
                    </div>
                    <div class="stat-controls">
                        <button class="control-btn decrement" data-stat="currentHP" data-value="-5">-5</button>
                        <button class="control-btn decrement" data-stat="currentHP" data-value="-1">-1</button>
                        <button class="control-btn increment" data-stat="currentHP" data-value="+1">+1</button>
                        <button class="control-btn increment" data-stat="currentHP" data-value="+5">+5</button>
                    </div>
                </div>
                
                <!-- Armadura -->
                <div class="stat-item">
                    <div class="stat-header">
                        <span class="stat-label">
                            <i class="fas fa-shield-alt"></i> Armadura
                        </span>
                        <span class="stat-value armor-value">${player.armor}</span>
                    </div>
                    <div class="stat-controls">
                        <button class="control-btn decrement" data-stat="armor" data-value="-1">-1</button>
                        <button class="control-btn increment" data-stat="armor" data-value="+1">+1</button>
                    </div>
                </div>
                
                <!-- Sanidade -->
                <div class="stat-item">
                    <div class="stat-header">
                        <span class="stat-label">
                            <i class="fas fa-brain"></i> Sanidade
                        </span>
                        <span class="stat-value sanity-value">${player.currentSanity}</span>
                    </div>
                    <div class="progress-bar sanity-progress">
                        <div class="progress-fill sanity ${sanityPercent <= 30 ? 'low' : ''}" style="width: ${sanityPercent}%"></div>
                    </div>
                    <div class="stat-controls">
                        <button class="control-btn decrement" data-stat="currentSanity" data-value="-5">-5</button>
                        <button class="control-btn decrement" data-stat="currentSanity" data-value="-1">-1</button>
                        <button class="control-btn increment" data-stat="currentSanity" data-value="+1">+1</button>
                        <button class="control-btn increment" data-stat="currentSanity" data-value="+5">+5</button>
                    </div>
                </div>
                
                <!-- Honra -->
                <div class="stat-item">
                    <div class="stat-header">
                        <span class="stat-label">
                            <i class="fas fa-award"></i> Honra
                        </span>
                        <span class="stat-value honor-value">${player.honor}</span>
                    </div>
                    <div class="stat-controls">
                        <button class="control-btn decrement" data-stat="honor" data-value="-1">-1</button>
                        <button class="control-btn increment" data-stat="honor" data-value="+1">+1</button>
                    </div>
                </div>
            </div>
            
            <div class="player-actions">
                <button class="player-action-btn view" title="Ver detalhes">
                    <i class="fas fa-eye"></i> Detalhes
                </button>
                <button class="player-action-btn edit" title="Editar">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="player-action-btn delete" title="Remover">
                    <i class="fas fa-trash"></i> Remover
                </button>
            </div>
        `;
        
        // Adicionar event listeners aos botões
        card.querySelectorAll('.control-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (this.pdfMode) return; // Não permitir edição em modo PDF
                const stat = btn.dataset.stat;
                const value = parseInt(btn.dataset.value);
                this.updatePlayerStat(player.id, stat, value);
            });
        });
        
        card.querySelector('.view').addEventListener('click', (e) => {
            e.stopPropagation();
            if (this.pdfMode) {
                this.exportToPdf(player.id);
            } else {
                this.openCharacterModal(player.id);
            }
        });
        
        card.querySelector('.edit').addEventListener('click', (e) => {
            e.stopPropagation();
            if (this.pdfMode) return;
            this.openPlayerModal(player.id);
        });
        
        card.querySelector('.delete').addEventListener('click', (e) => {
            e.stopPropagation();
            if (this.pdfMode) return;
            this.deletePlayer(player.id);
        });
        
        // Clicar no card
        card.addEventListener('click', () => {
            if (this.pdfMode) {
                this.exportToPdf(player.id);
            } else {
                this.openCharacterModal(player.id);
            }
        });
        
        return card;
    }

    openCharacterModal(playerId) {
        const player = this.players.find(p => p.id === playerId);
        if (!player) return;
        
        const modal = document.getElementById('character-modal');
        const avatarImg = document.getElementById('character-avatar-img');
        const avatarIcon = document.getElementById('character-avatar-icon');
        
        document.getElementById('character-modal-title').textContent = `Ficha - ${player.characterName}`;
        document.getElementById('character-modal-player').textContent = player.playerName;
        document.getElementById('character-modal-character').textContent = player.characterName;
        document.getElementById('character-tribe-detail').textContent = player.tribe || '-';
        document.getElementById('character-clan-detail').textContent = player.clan || '-';
        document.getElementById('character-hp-detail').textContent = `${player.currentHP}/${player.maxHP}`;
        document.getElementById('character-sanity-detail').textContent = `${player.currentSanity}/${player.maxSanity}`;
        document.getElementById('character-armor-detail').textContent = player.armor;
        document.getElementById('character-honor-detail').textContent = player.honor;
        document.getElementById('character-traumas-detail').textContent = player.traumas || 'Nenhum trauma registrado.';
        
        // Configurar avatar
        if (player.characterImage) {
            avatarImg.src = player.characterImage;
            avatarImg.style.display = 'block';
            avatarIcon.style.display = 'none';
        } else {
            avatarImg.style.display = 'none';
            avatarIcon.style.display = 'block';
        }
        
        modal.classList.add('show');
    }

    closeCharacterModal() {
        document.getElementById('character-modal').classList.remove('show');
    }

    searchPlayers() {
        const searchTerm = document.getElementById('search-players').value.toLowerCase();
        const cards = document.querySelectorAll('.player-card');
        
        cards.forEach(card => {
            const playerName = card.querySelector('.player-name').textContent.toLowerCase();
            const characterName = card.querySelector('.character-name').textContent.toLowerCase();
            
            if (playerName.includes(searchTerm) || characterName.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    updateCounters() {
        const totalPlayers = this.players.length;
        const lowHealth = this.players.filter(p => (p.currentHP / p.maxHP) * 100 <= 30).length;
        const lowSanity = this.players.filter(p => (p.currentSanity / p.maxSanity) * 100 <= 30).length;
        
        document.getElementById('total-players').textContent = totalPlayers;
        document.getElementById('low-health').textContent = lowHealth;
        document.getElementById('low-sanity').textContent = lowSanity;
    }

    // ==================== SISTEMA PDF ====================
    togglePdfMode() {
        this.pdfMode = !this.pdfMode;
        const pdfBtn = document.getElementById('pdf-export-btn');
        const pdfHint = document.getElementById('pdf-hint');
        const cards = document.querySelectorAll('.player-card');
        
        if (this.pdfMode) {
            pdfBtn.classList.add('active');
            pdfBtn.innerHTML = '<i class="fas fa-times"></i> Cancelar PDF';
            pdfHint.classList.add('show');
            
            cards.forEach(card => {
                card.classList.add('pdf-mode');
            });
            
            // Desativar botões de edição
            document.querySelectorAll('.control-btn, .player-action-btn').forEach(btn => {
                btn.style.pointerEvents = 'none';
                btn.style.opacity = '0.5';
            });
        } else {
            pdfBtn.classList.remove('active');
            pdfBtn.innerHTML = '<i class="fas fa-file-pdf"></i> Modo Exportar PDF';
            pdfHint.classList.remove('show');
            
            cards.forEach(card => {
                card.classList.remove('pdf-mode');
            });
            
            // Reativar botões de edição
            document.querySelectorAll('.control-btn, .player-action-btn').forEach(btn => {
                btn.style.pointerEvents = '';
                btn.style.opacity = '';
            });
        }
    }

    async exportToPdf(playerId) {
        if (!this.pdfMode) return;
        
        const player = this.players.find(p => p.id === playerId);
        if (!player) return;
        
        try {
            // Criar elemento temporário para o PDF
            const pdfContainer = document.createElement('div');
            pdfContainer.className = 'pdf-template';
            pdfContainer.style.cssText = `
                position: fixed;
                top: -10000px;
                left: -10000px;
                width: 800px;
                padding: 40px;
                background: linear-gradient(145deg, #1a1a1a, #000);
                color: #e0e0e0;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                border: 2px solid rgba(156, 240, 255, 0.5);
                border-radius: 15px;
                box-shadow: 0 0 30px rgba(193, 240, 248, 0.411);
            `;
            
            pdfContainer.innerHTML = this.generatePdfHtml(player);
            document.body.appendChild(pdfContainer);
            
            // Converter para PDF
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('p', 'mm', 'a4');
            
            await html2canvas(pdfContainer, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#1a1a1a'
            }).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const imgWidth = 190;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                
                pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
                pdf.save(`ficha-${player.characterName.replace(/\s+/g, '-').toLowerCase()}.pdf`);
            });
            
            document.body.removeChild(pdfContainer);
            
            // Desativar modo PDF após exportação
            this.togglePdfMode();
            
        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            alert('Erro ao gerar PDF. Tente novamente.');
        }
    }

    generatePdfHtml(player) {
        const hpPercent = (player.currentHP / player.maxHP) * 100;
        const sanityPercent = (player.currentSanity / player.maxSanity) * 100;
        
        return `
            <div class="pdf-header" style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #d6feff; font-size: 28px; margin-bottom: 10px;">FICHA DO PERSONAGEM</h1>
                <div style="height: 2px; background: linear-gradient(90deg, #b6fff3, #d6feff); margin: 0 auto 20px; width: 200px;"></div>
            </div>
            
            <div class="pdf-character-info" style="display: flex; gap: 30px; margin-bottom: 30px; align-items: center;">
                <div class="pdf-avatar" style="width: 120px; height: 120px; border-radius: 50%; border: 3px solid rgba(156, 240, 255, 0.5); overflow: hidden; flex-shrink: 0;">
                    ${player.characterImage ? 
                        `<img src="${player.characterImage}" alt="${player.characterName}" style="width: 100%; height: 100%; object-fit: cover;">` : 
                        '<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: rgba(182, 255, 243, 0.1);"><i class="fas fa-user" style="font-size: 40px; color: #b6fff3;"></i></div>'
                    }
                </div>
                <div class="pdf-names" style="flex: 1;">
                    <h2 style="color: #d6feff; font-size: 24px; margin-bottom: 5px;">${player.characterName}</h2>
                    <p style="color: #ccc; font-size: 18px; margin-bottom: 15px; font-style: italic;">Jogador: ${player.playerName}</p>
                    <div style="display: flex; gap: 20px;">
                        ${player.tribe ? `<div><strong style="color: #b6fff3;">Tribo:</strong> <span style="color: #e0e0e0;">${player.tribe}</span></div>` : ''}
                        ${player.clan ? `<div><strong style="color: #b6fff3;">Clã:</strong> <span style="color: #e0e0e0;">${player.clan}</span></div>` : ''}
                    </div>
                </div>
            </div>
            
            <div class="pdf-stats" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 30px;">
                <div class="pdf-stat-item" style="background: rgba(255, 255, 255, 0.05); padding: 15px; border-radius: 10px; border: 1px solid rgba(156, 240, 255, 0.2);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                        <h3 style="color: #d6feff; font-size: 16px; display: flex; align-items: center; gap: 8px;">
                            <i class="fas fa-heart"></i> Vida
                        </h3>
                        <span style="color: #b6fff3; font-size: 20px; font-weight: bold;">${player.currentHP}/${player.maxHP}</span>
                    </div>
                    <div style="height: 10px; background: rgba(255, 255, 255, 0.2); border-radius: 5px; overflow: hidden;">
                        <div style="height: 100%; width: ${hpPercent}%; background: url('../imagens/fundo_rubi.jpg') center/cover; border-right: 2px solid #000;"></div>
                    </div>
                </div>
                
                <div class="pdf-stat-item" style="background: rgba(255, 255, 255, 0.05); padding: 15px; border-radius: 10px; border: 1px solid rgba(156, 240, 255, 0.2);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                        <h3 style="color: #d6feff; font-size: 16px; display: flex; align-items: center; gap: 8px;">
                            <i class="fas fa-brain"></i> Sanidade
                        </h3>
                        <span style="color: #b6fff3; font-size: 20px; font-weight: bold;">${player.currentSanity}/${player.maxSanity}</span>
                    </div>
                    <div style="height: 10px; background: rgba(255, 255, 255, 0.2); border-radius: 5px; overflow: hidden;">
                        <div style="height: 100%; width: ${sanityPercent}%; background: url('../imagens/fundo_rubi_azul.jpg') center/cover; border-right: 2px solid #000;"></div>
                    </div>
                </div>
                
                <div class="pdf-stat-item" style="background: rgba(255, 255, 255, 0.05); padding: 15px; border-radius: 10px; border: 1px solid rgba(156, 240, 255, 0.2);">
                    <h3 style="color: #d6feff; font-size: 16px; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-shield-alt"></i> Armadura
                    </h3>
                    <div style="text-align: center;">
                        <span style="color: #b6fff3; font-size: 32px; font-weight: bold;">${player.armor}</span>
                    </div>
                </div>
                
                <div class="pdf-stat-item" style="background: rgba(255, 255, 255, 0.05); padding: 15px; border-radius: 10px; border: 1px solid rgba(156, 240, 255, 0.2);">
                    <h3 style="color: #d6feff; font-size: 16px; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-award"></i> Honra
                    </h3>
                    <div style="text-align: center;">
                        <span style="color: #b6fff3; font-size: 32px; font-weight: bold;">${player.honor}</span>
                    </div>
                </div>
            </div>
            
            ${player.traumas ? `
            <div class="pdf-traumas" style="background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 10px; border: 1px solid rgba(156, 240, 255, 0.2);">
                <h3 style="color: #d6feff; font-size: 18px; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                    <i class="fas fa-skull-crossbones"></i> Traumas
                </h3>
                <p style="color: #ccc; line-height: 1.6; font-size: 14px;">${player.traumas}</p>
            </div>
            ` : ''}
            
            <div class="pdf-footer" style="margin-top: 30px; text-align: center; color: #888; font-size: 12px; border-top: 1px solid rgba(156, 240, 255, 0.2); padding-top: 15px;">
                Gerado em ${new Date().toLocaleDateString()} - Sistema de Controle do Mestre
            </div>
        `;
    }

    // ==================== SISTEMA JOICE ====================
    initJoice() {
        document.getElementById('execute-command').addEventListener('click', () => this.executeJoiceCommand());
        document.getElementById('joice-command').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.executeJoiceCommand();
            }
        });
    }

    executeJoiceCommand() {
        const commandInput = document.getElementById('joice-command');
        const command = commandInput.value.trim();
        
        if (!command) return;
        
        // Adicionar ao log
        this.addToCommandLog(`> ${command}`, 'command');
        
        // Processar comando
        this.processJoiceCommand(command);
        
        // Limpar campo
        commandInput.value = '';
        
        // Mostrar status de processamento
        this.showExecutionStatus('processing', 'Processando comando...');
        
        // Simular processamento
        setTimeout(() => {
            this.showExecutionStatus('success', 'Comando executado com sucesso!');
        }, 1000);
    }

    processJoiceCommand(command) {
        const lowerCommand = command.toLowerCase();
        
        // Padrões de comando
        const patterns = [
            // [Nome] - [Status] [+/-][Valor]
            /^([^-\n]+)\s*-\s*(vida|sanidade|armadura|honra)\s*([+-]?\d+)$/i,
            
            // [Nome] [Operação] [Valor] [Status]
            /^([^ \n]+)\s+([+-]?)\s*(\d+)\s+(vida|sanidade|armadura|honra)$/i,
            
            // reset [Nome]
            /^reset\s+([^ \n]+)$/i,
            
            // all [Operação] [Status] [Valor]
            /^all\s+([+-]?)\s*(vida|sanidade|armadura|honra)\s+(\d+)$/i,
            
            // [Nome] [Status] para [Valor]
            /^([^ \n]+)\s+(vida|sanidade|armadura|honra)\s+para\s+(\d+)$/i
        ];

        let match = null;
        for (const pattern of patterns) {
            match = command.match(pattern);
            if (match) break;
        }

        if (!match) {
            this.addToCommandLog('Erro: Comando não reconhecido. Use a sintaxe correta.', 'error');
            return;
        }

        try {
            // Padrão 1: Nome - Status Valor
            if (match[1] && match[2] && match[3]) {
                const playerName = match[1].trim();
                const status = match[2].toLowerCase();
                let value = parseInt(match[3]);
                
                // Se não tem sinal, assume negativo (para "Nome - Vida 20" ser -20)
                if (match[3].match(/^\d+$/)) {
                    value = -Math.abs(value);
                }
                
                this.modifyPlayerStatus(playerName, status, value);
            }
            
            // Padrão 2: Nome Operação Valor Status
            else if (match[1] && match[2] && match[3] && match[4]) {
                const playerName = match[1].trim();
                const operation = match[2];
                const value = parseInt(match[3]);
                const status = match[4].toLowerCase();
                
                const finalValue = operation === '-' ? -value : value;
                this.modifyPlayerStatus(playerName, status, finalValue);
            }
            
            // Padrão 3: reset Nome
            else if (lowerCommand.startsWith('reset') && match[1]) {
                const playerName = match[1].trim();
                this.resetPlayer(playerName);
            }
            
            // Padrão 4: all Operação Status Valor
            else if (lowerCommand.startsWith('all') && match[1] && match[2] && match[3]) {
                const operation = match[1];
                const status = match[2].toLowerCase();
                const value = parseInt(match[3]);
                
                const finalValue = operation === '-' ? -value : value;
                this.modifyAllPlayers(status, finalValue);
            }
            
            // Padrão 5: Nome Status para Valor
            else if (match[1] && match[2] && match[3]) {
                const playerName = match[1].trim();
                const status = match[2].toLowerCase();
                const value = parseInt(match[3]);
                
                this.setPlayerStatus(playerName, status, value);
            }
            
        } catch (error) {
            this.addToCommandLog(`Erro: ${error.message}`, 'error');
        }
    }

    modifyPlayerStatus(playerName, status, value) {
        const players = this.players.filter(p => 
            p.playerName.toLowerCase().includes(playerName.toLowerCase()) ||
            p.characterName.toLowerCase().includes(playerName.toLowerCase())
        );
        
        if (players.length === 0) {
            this.addToCommandLog(`Erro: Jogador "${playerName}" não encontrado.`, 'error');
            return;
        }
        
        if (players.length > 1) {
            this.addToCommandLog(`Aviso: Múltiplos jogadores encontrados. Modificando o primeiro: ${players[0].characterName}`, 'system');
        }
        
        const player = players[0];
        const statusMap = {
            'vida': 'currentHP',
            'sanidade': 'currentSanity',
            'armadura': 'armor',
            'honra': 'honor'
        };
        
        const stat = statusMap[status];
        if (!stat) {
            this.addToCommandLog(`Erro: Status "${status}" inválido.`, 'error');
            return;
        }
        
        let newValue = player[stat] + value;
        
        // Limitar valores
        if (stat === 'currentHP') {
            newValue = Math.max(0, Math.min(newValue, player.maxHP));
        } else if (stat === 'currentSanity') {
            newValue = Math.max(0, Math.min(newValue, player.maxSanity));
        } else {
            newValue = Math.max(0, newValue);
        }
        
        player[stat] = newValue;
        this.saveToLocalStorage();
        this.updatePlayerCard(player.id);
        this.updateCounters();
        
        const statusNames = {
            'currentHP': 'Vida',
            'currentSanity': 'Sanidade',
            'armor': 'Armadura',
            'honor': 'Honra'
        };
        
        this.addToCommandLog(
            `${player.characterName}: ${statusNames[stat]} alterado para ${newValue} (${value >= 0 ? '+' : ''}${value})`,
            'success'
        );
    }

    modifyAllPlayers(status, value) {
        const statusMap = {
            'vida': 'currentHP',
            'sanidade': 'currentSanity',
            'armadura': 'armor',
            'honra': 'honor'
        };
        
        const stat = statusMap[status];
        if (!stat) {
            this.addToCommandLog(`Erro: Status "${status}" inválido.`, 'error');
            return;
        }
        
        let modifiedCount = 0;
        this.players.forEach(player => {
            let newValue = player[stat] + value;
            
            // Limitar valores
            if (stat === 'currentHP') {
                newValue = Math.max(0, Math.min(newValue, player.maxHP));
            } else if (stat === 'currentSanity') {
                newValue = Math.max(0, Math.min(newValue, player.maxSanity));
            } else {
                newValue = Math.max(0, newValue);
            }
            
            if (newValue !== player[stat]) {
                player[stat] = newValue;
                modifiedCount++;
                this.updatePlayerCard(player.id);
            }
        });
        
        if (modifiedCount > 0) {
            this.saveToLocalStorage();
            this.updateCounters();
            
            const statusNames = {
                'currentHP': 'Vida',
                'currentSanity': 'Sanidade',
                'armor': 'Armadura',
                'honor': 'Honra'
            };
            
            this.addToCommandLog(
                `Todos os jogadores: ${statusNames[stat]} modificado (${value >= 0 ? '+' : ''}${value}). ${modifiedCount} jogadores afetados.`,
                'success'
            );
        }
    }

    resetPlayer(playerName) {
        const players = this.players.filter(p => 
            p.playerName.toLowerCase().includes(playerName.toLowerCase()) ||
            p.characterName.toLowerCase().includes(playerName.toLowerCase())
        );
        
        if (players.length === 0) {
            this.addToCommandLog(`Erro: Jogador "${playerName}" não encontrado.`, 'error');
            return;
        }
        
        if (players.length > 1) {
            this.addToCommandLog(`Aviso: Múltiplos jogadores encontrados. Resetando o primeiro: ${players[0].characterName}`, 'system');
        }
        
        const player = players[0];
        const oldHP = player.currentHP;
        const oldSanity = player.currentSanity;
        
        player.currentHP = player.maxHP;
        player.currentSanity = player.maxSanity;
        
        this.saveToLocalStorage();
        this.updatePlayerCard(player.id);
        this.updateCounters();
        
        this.addToCommandLog(
            `${player.characterName}: Vida e Sanidade resetadas para máximo (Vida: ${oldHP}→${player.maxHP}, Sanidade: ${oldSanity}→${player.maxSanity})`,
            'success'
        );
    }

    setPlayerStatus(playerName, status, value) {
        const players = this.players.filter(p => 
            p.playerName.toLowerCase().includes(playerName.toLowerCase()) ||
            p.characterName.toLowerCase().includes(playerName.toLowerCase())
        );
        
        if (players.length === 0) {
            this.addToCommandLog(`Erro: Jogador "${playerName}" não encontrado.`, 'error');
            return;
        }
        
        if (players.length > 1) {
            this.addToCommandLog(`Aviso: Múltiplos jogadores encontrados. Modificando o primeiro: ${players[0].characterName}`, 'system');
        }
        
        const player = players[0];
        const statusMap = {
            'vida': 'currentHP',
            'sanidade': 'currentSanity',
            'armadura': 'armor',
            'honra': 'honor'
        };
        
        const stat = statusMap[status];
        if (!stat) {
            this.addToCommandLog(`Erro: Status "${status}" inválido.`, 'error');
            return;
        }
        
        const oldValue = player[stat];
        
        // Limitar valores
        if (stat === 'currentHP') {
            player[stat] = Math.max(0, Math.min(value, player.maxHP));
        } else if (stat === 'currentSanity') {
            player[stat] = Math.max(0, Math.min(value, player.maxSanity));
        } else {
            player[stat] = Math.max(0, value);
        }
        
        this.saveToLocalStorage();
        this.updatePlayerCard(player.id);
        this.updateCounters();
        
        const statusNames = {
            'currentHP': 'Vida',
            'currentSanity': 'Sanidade',
            'armor': 'Armadura',
            'honor': 'Honra'
        };
        
        this.addToCommandLog(
            `${player.characterName}: ${statusNames[stat]} definido para ${player[stat]} (era ${oldValue})`,
            'success'
        );
    }

    addToCommandLog(message, type = 'system') {
        const logContent = document.getElementById('command-log-content');
        const logEntry = document.createElement('div');
        logEntry.className = `log-entry ${type}`;
        
        const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        logEntry.innerHTML = `
            <span class="log-time">[${time}]</span> ${message}
        `;
        
        logContent.appendChild(logEntry);
        logContent.scrollTop = logContent.scrollHeight;
    }

    showExecutionStatus(type, message) {
        const statusEl = document.getElementById('execution-status');
        const statusIndicator = statusEl.querySelector('.status-indicator');
        const icon = statusIndicator.querySelector('i');
        const text = statusIndicator.querySelector('span');
        
        // Remover todas as classes de status
        icon.classList.remove('status-idle', 'status-processing', 'status-success', 'status-error');
        
        // Adicionar classe correta
        icon.classList.add(`status-${type}`);
        text.textContent = message;
        
        // Resetar após alguns segundos
        if (type !== 'idle') {
            setTimeout(() => {
                this.showExecutionStatus('idle', 'Pronto para executar comandos');
            }, 3000);
        }
    }

    saveToLocalStorage() {
        localStorage.setItem('rpgPlayers', JSON.stringify(this.players));
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new PlayerManager();
});

// Export/Import (mantido)
function exportData() {
    const data = JSON.parse(localStorage.getItem('rpgPlayers')) || [];
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rpg-players-backup.json';
    a.click();
    URL.revokeObjectURL(url);
}

function importData(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            localStorage.setItem('rpgPlayers', JSON.stringify(data));
            alert('Dados importados com sucesso!');
            location.reload();
        } catch (error) {
            alert('Erro ao importar dados. Verifique o formato do arquivo.');
        }
    };
    
    reader.readAsText(file);
}