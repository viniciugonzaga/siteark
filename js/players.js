// ========================
// Gerenciador de Imagens Otimizado
// ========================
class ImageManager {
    constructor() {
        this.MAX_IMAGE_SIZE = 300 * 1024;
        this.MAX_TOTAL_STORAGE = 4 * 1024 * 1024;
        this.COMPRESSION_QUALITY = 0.6;
        this.MAX_DIMENSION = 400;
    }

    compressImage(file) {
        return new Promise((resolve, reject) => {
            if (!file || !file.type.match('image.*')) {
                reject(new Error('Arquivo não é uma imagem válida'));
                return;
            }

            if (file.size <= 100 * 1024) {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.onerror = () => reject(new Error('Erro ao ler imagem'));
                reader.readAsDataURL(file);
                return;
            }

            const img = new Image();
            const reader = new FileReader();

            reader.onload = (e) => {
                img.src = e.target.result;
                
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    
                    let width = img.width;
                    let height = img.height;
                    
                    if (width > this.MAX_DIMENSION || height > this.MAX_DIMENSION) {
                        const ratio = Math.min(this.MAX_DIMENSION / width, this.MAX_DIMENSION / height);
                        width = Math.floor(width * ratio);
                        height = Math.floor(height * ratio);
                    }
                    
                    canvas.width = width;
                    canvas.height = height;
                    
                    ctx.imageSmoothingEnabled = true;
                    ctx.imageSmoothingQuality = 'low';
                    ctx.drawImage(img, 0, 0, width, height);
                    
                    let quality = this.COMPRESSION_QUALITY;
                    let compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
                    
                    while (compressedDataUrl.length > this.MAX_IMAGE_SIZE && quality > 0.3) {
                        quality -= 0.1;
                        compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
                    }
                    
                    resolve(compressedDataUrl);
                };
                
                img.onerror = () => reject(new Error('Erro ao carregar imagem'));
            };
            
            reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
            reader.readAsDataURL(file);
        });
    }

    checkStorageSpace() {
        try {
            let totalSize = 0;
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                const value = localStorage.getItem(key);
                totalSize += key.length + (value ? value.length : 0);
            }
            
            const availableSpace = this.MAX_TOTAL_STORAGE - totalSize;
            const percentage = (totalSize / this.MAX_TOTAL_STORAGE) * 100;
            
            return {
                used: totalSize,
                available: availableSpace,
                percentage: percentage,
                isFull: percentage >= 85
            };
        } catch (error) {
            console.error('Erro ao verificar espaço:', error);
            return { used: 0, available: 0, percentage: 0, isFull: true };
        }
    }

    cleanupOldImages() {
        const players = JSON.parse(localStorage.getItem('rpgPlayers') || '[]');
        if (players.length === 0) return 0;

        const sortedPlayers = [...players].sort((a, b) => 
            new Date(a.updatedAt || a.createdAt || 0) - new Date(b.updatedAt || b.createdAt || 0)
        );

        let removedCount = 0;
        for (let player of sortedPlayers) {
            if (player.characterImage && removedCount < Math.floor(players.length * 0.4)) {
                player.characterImage = null;
                removedCount++;
            }
        }

        if (removedCount > 0) {
            localStorage.setItem('rpgPlayers', JSON.stringify(sortedPlayers));
            return removedCount;
        }
        return 0;
    }

    getObjectSize(obj) {
        return JSON.stringify(obj).length;
    }
}

// ========================
// SISTEMA NLP PARA JOICE (MELHORADO)
// ========================
class NaturalLanguageProcessor {
    constructor(playerManager) {
        this.playerManager = playerManager;
        this.synonyms = {
            vida: ['vida', 'hp', 'health', 'saúde', 'pontos de vida', 'pv', 'vida'],
            sanidade: ['sanidade', 'sanity', 'san', 'mente', 'loucura', 'psique'],
            armadura: ['armadura', 'armor', 'defesa', 'proteção', 'ca', 'ac'],
            honra: ['honra', 'honor', 'glória', 'fama', 'prestígio', 'reputação'],
            
            aumentar: ['ganhou', 'recebeu', 'obteve', 'adquiriu', 'conquistou', 'recuperou', 'curou', 'restaurou', 'adicionou', 'incrementou', '+', 'aumentou'],
            diminuir: ['perdeu', 'tomou', 'sofreu', 'recebeu', 'levou', 'dano', 'dano de', 'danos', 'reduziu', 'diminuiu', 'abaixou', '-', 'menos'],
            definir: ['ficou com', 'está com', 'possui', 'tem', 'definir', 'alterar para', 'mudar para', '=', 'para'],
            resetar: ['resetar', 'reiniciar', 'restaurar', 'voltar ao normal', 'curar completamente', 'recuperar total'],
            
            todos: ['todos', 'todo mundo', 'cada um', 'cada personagem', 'todos os jogadores', 'todos os personagens', 'todos ganharam'],
            
            ignorar: ['o', 'a', 'os', 'as', 'de', 'do', 'da', 'dos', 'das', 'em', 'no', 'na', 'nos', 'nas', 'por', 'para', 'com', 'sem', 'sob', 'sobre', 'até', 'na', 'no']
        };
    }

    processPhrase(phrase) {
        const lowerPhrase = phrase.toLowerCase().trim();
        
        // Extrair número da frase
        const numberMatch = lowerPhrase.match(/\b(\d+)\b/);
        const value = numberMatch ? parseInt(numberMatch[1]) : null;
        
        // Extrair nome do jogador/personagem (MELHORADO)
        const name = this.extractName(lowerPhrase);
        
        // Detectar ação e atributo
        const action = this.detectAction(lowerPhrase);
        const attribute = this.detectAttribute(lowerPhrase);
        
        // Detectar se é para todos
        const isForAll = this.isForAll(lowerPhrase);
        
        return {
            original: phrase,
            name: name,
            value: value,
            action: action,
            attribute: attribute,
            isForAll: isForAll,
            isValid: this.validateCommand(name, value, action, attribute, isForAll)
        };
    }

    // MÉTODO MELHORADO para extrair nomes
    extractName(phrase) {
        // Remover palavras comuns e números
        const ignoreWords = [...this.synonyms.ignorar, 
                           ...this.synonyms.vida, 
                           ...this.synonyms.sanidade,
                           ...this.synonyms.armadura,
                           ...this.synonyms.honra,
                           ...this.synonyms.aumentar,
                           ...this.synonyms.diminuir,
                           ...this.synonyms.definir,
                           ...this.synonyms.resetar,
                           ...this.synonyms.todos,
                           'dano', 'danos', 'pontos'];
        
        const words = phrase.split(/\s+/);
        
        // Procurar correspondências exatas primeiro
        for (let i = 0; i < words.length; i++) {
            for (let j = words.length; j > i; j--) {
                const possibleName = words.slice(i, j).join(' ').trim();
                
                // Pular palavras muito curtas ou números
                if (possibleName.length < 2 || /\d+/.test(possibleName)) continue;
                
                // Verificar se é uma palavra para ignorar
                if (ignoreWords.includes(possibleName.toLowerCase())) continue;
                
                // Verificar se corresponde a um jogador
                const matchingPlayers = this.playerManager.players.filter(p => 
                    p.playerName.toLowerCase() === possibleName.toLowerCase() ||
                    p.characterName.toLowerCase() === possibleName.toLowerCase() ||
                    p.playerName.toLowerCase().includes(possibleName.toLowerCase()) ||
                    p.characterName.toLowerCase().includes(possibleName.toLowerCase())
                );
                
                if (matchingPlayers.length > 0) {
                    return possibleName;
                }
            }
        }
        
        // Se não encontrou, tentar pegar a primeira palavra que não é de controle
        for (const word of words) {
            const lowerWord = word.toLowerCase();
            if (word.length >= 2 && 
                !/\d+/.test(word) && 
                !ignoreWords.includes(lowerWord)) {
                return word;
            }
        }
        
        return null;
    }

    detectAction(phrase) {
        if (this.containsSynonym(phrase, 'resetar')) return 'reset';
        if (this.containsSynonym(phrase, 'definir')) return 'set';
        if (this.containsSynonym(phrase, 'diminuir') || phrase.includes('dano')) return 'decrease';
        if (this.containsSynonym(phrase, 'aumentar') || phrase.includes('curou') || phrase.includes('ganhou')) return 'increase';
        
        return null;
    }

    detectAttribute(phrase) {
        if (this.containsSynonym(phrase, 'vida') || phrase.includes('vida')) return 'currentHP';
        if (this.containsSynonym(phrase, 'sanidade') || phrase.includes('sanidade')) return 'currentSanity';
        if (this.containsSynonym(phrase, 'armadura') || phrase.includes('armadura')) return 'armor';
        if (this.containsSynonym(phrase, 'honra') || phrase.includes('honra')) return 'honor';
        
        // Se não especificou, assume vida por padrão (para frases como "Yvor tomou 30 de dano")
        return 'currentHP';
    }

    isForAll(phrase) {
        return this.containsSynonym(phrase, 'todos');
    }

    containsSynonym(phrase, category) {
        if (!this.synonyms[category]) return false;
        
        return this.synonyms[category].some(synonym => {
            const regex = new RegExp(`\\b${synonym}\\b`, 'i');
            return regex.test(phrase);
        });
    }

    isSynonym(word, category) {
        if (!this.synonyms[category]) return false;
        return this.synonyms[category].includes(word.toLowerCase());
    }

    validateCommand(name, value, action, attribute, isForAll) {
        if (isForAll) {
            return action !== null && attribute !== null && value !== null;
        }
        
        if (action === 'reset') {
            return name !== null;
        }
        
        // Para comandos como "Yvor tomou 30 de dano", pode não ter atributo explícito
        if (name !== null && value !== null && action !== null) {
            return true;
        }
        
        return false;
    }

    generateSuggestions(input) {
        if (!input || input.length < 1) return [];
        
        const lowerInput = input.toLowerCase();
        const suggestions = [];
        
        // Sugerir nomes de jogadores
        this.playerManager.players.forEach(player => {
            if (player.playerName.toLowerCase().includes(lowerInput) ||
                player.characterName.toLowerCase().includes(lowerInput)) {
                suggestions.push({
                    type: 'name',
                    text: `${player.characterName} (${player.playerName})`,
                    complete: player.characterName
                });
            }
        });
        
        // Sugerir ações baseadas no contexto
        const contextSuggestions = [
            { trigger: 'dano', text: ' de vida', complete: input + ' de vida' },
            { trigger: 'perdeu', text: ' de vida', complete: input + ' de vida' },
            { trigger: 'tomou', text: ' de dano', complete: input + ' de dano' },
            { trigger: 'curou', text: ' de vida', complete: input + ' de vida' },
            { trigger: 'ganhou', text: ' de vida', complete: input + ' de vida' },
            { trigger: 'recebeu', text: ' de vida', complete: input + ' de vida' }
        ];
        
        contextSuggestions.forEach(item => {
            if (lowerInput.includes(item.trigger)) {
                suggestions.push({
                    type: 'template',
                    text: item.text,
                    complete: item.complete
                });
            }
        });
        
        return suggestions.slice(0, 5);
    }
}

// ========================
// Gerenciador de Jogadores (CORRIGIDO)
// ========================
class PlayerManager {
    constructor() {
        this.players = JSON.parse(localStorage.getItem('rpgPlayers')) || [];
        this.currentPlayerId = null;
        this.imageFile = null;
        this.pdfMode = false;
        this.imageManager = new ImageManager();
        this.storageControlsMinimized = false;
        this.nlpProcessor = new NaturalLanguageProcessor(this);
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadPlayers();
        this.updateCounters();
        this.initEnhancedJoice();
        this.startStorageMonitor();
    }

    bindEvents() {
        document.getElementById('add-player-btn')?.addEventListener('click', () => this.openPlayerModal());
        document.getElementById('reset-all-btn')?.addEventListener('click', () => this.resetAllPlayers());
        document.getElementById('modal-close')?.addEventListener('click', () => this.closePlayerModal());
        document.getElementById('cancel-btn')?.addEventListener('click', () => this.closePlayerModal());
        document.getElementById('modal-overlay')?.addEventListener('click', () => this.closePlayerModal());
        document.getElementById('player-form')?.addEventListener('submit', (e) => this.savePlayer(e));
        document.getElementById('character-modal-close')?.addEventListener('click', () => this.closeCharacterModal());
        document.getElementById('character-modal-overlay')?.addEventListener('click', () => this.closeCharacterModal());
        document.getElementById('search-btn')?.addEventListener('click', () => this.searchPlayers());
        document.getElementById('search-players')?.addEventListener('input', () => this.searchPlayers());
        document.getElementById('upload-image-btn')?.addEventListener('click', () => {
            document.getElementById('character-image-upload').click();
        });
        document.getElementById('character-image-upload')?.addEventListener('change', (e) => {
            this.handleImageUpload(e.target.files[0]);
        });
        document.getElementById('pdf-export-btn')?.addEventListener('click', () => this.togglePdfMode());
    }

    // ==================== SISTEMA JOICE INTELIGENTE (CORRIGIDO) ====================
    initEnhancedJoice() {
        const commandInput = document.getElementById('joice-command');
        const executeBtn = document.getElementById('execute-command');
        const voiceBtn = document.getElementById('voice-command');
        
        if (!commandInput || !executeBtn) return;
        
        commandInput.addEventListener('input', (e) => {
            this.showSuggestions(e.target.value);
        });
        
        commandInput.addEventListener('focus', (e) => {
            if (e.target.value) {
                this.showSuggestions(e.target.value);
            }
        });
        
        commandInput.addEventListener('blur', (e) => {
            setTimeout(() => {
                this.hideSuggestions();
            }, 200);
        });
        
        commandInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.executeNaturalCommand();
            }
        });
        
        executeBtn.addEventListener('click', () => this.executeNaturalCommand());
        
        if (voiceBtn) {
            voiceBtn.addEventListener('click', () => this.toggleVoiceRecognition());
        }
        
        this.addExamplePhrases();
    }

    showSuggestions(input) {
        const suggestions = this.nlpProcessor.generateSuggestions(input);
        const suggestionsBox = document.getElementById('suggestions-box');
        const suggestionsList = document.getElementById('suggestions-list');
        
        if (!suggestionsBox || !suggestionsList) return;
        
        if (suggestions.length === 0) {
            suggestionsBox.style.display = 'none';
            return;
        }
        
        suggestionsList.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const div = document.createElement('div');
            div.className = 'suggestion-item';
            div.textContent = suggestion.text;
            div.dataset.complete = suggestion.complete;
            div.addEventListener('click', () => {
                const commandInput = document.getElementById('joice-command');
                if (commandInput) {
                    commandInput.value = suggestion.complete;
                }
                this.hideSuggestions();
            });
            suggestionsList.appendChild(div);
        });
        
        suggestionsBox.style.display = 'block';
    }

    hideSuggestions() {
        const suggestionsBox = document.getElementById('suggestions-box');
        if (suggestionsBox) {
            suggestionsBox.style.display = 'none';
        }
    }

    executeNaturalCommand() {
        const commandInput = document.getElementById('joice-command');
        const command = commandInput?.value.trim();
        
        if (!command) {
            this.showJoiceMessage('Por favor, digite uma frase para eu processar.', 'error');
            return;
        }
        
        this.addToCommandLog(`> ${command}`, 'command');
        this.showExecutionStatus('processing', 'Interpretando frase...');
        
        setTimeout(() => {
            try {
                const result = this.nlpProcessor.processPhrase(command);
                
                if (!result.isValid) {
                    this.showJoiceMessage('Não entendi completamente. Pode reformular? Ex: "Yvor tomou 30 de dano"', 'error');
                    this.showExecutionStatus('error', 'Frase não compreendida');
                    return;
                }
                
                this.processNaturalCommand(result);
                
            } catch (error) {
                console.error('Erro ao processar comando:', error);
                this.showJoiceMessage('Ocorreu um erro ao processar sua frase.', 'error');
                this.showExecutionStatus('error', 'Erro de processamento');
            }
        }, 500);
        
        if (commandInput) {
            commandInput.value = '';
        }
        this.hideSuggestions();
    }

    processNaturalCommand(result) {
        const { name, value, action, attribute, isForAll } = result;
        
        this.showExecutionStatus('processing', 'Executando ação...');
        
        setTimeout(() => {
            try {
                if (isForAll) {
                    this.processAllCommand(action, attribute, value);
                } else if (action === 'reset') {
                    this.processResetCommand(name);
                } else {
                    this.processSingleCommand(name, action, attribute, value);
                }
                
                this.showExecutionStatus('success', 'Ação executada com sucesso!');
                
            } catch (error) {
                console.error('Erro ao executar comando:', error);
                this.showJoiceMessage(`Erro: ${error.message}`, 'error');
                this.showExecutionStatus('error', 'Erro na execução');
            }
        }, 300);
    }

    processAllCommand(action, attribute, value) {
        const statusMap = {
            'currentHP': 'Vida',
            'currentSanity': 'Sanidade',
            'armor': 'Armadura',
            'honor': 'Honra'
        };
        
        const statusName = statusMap[attribute] || 'Vida';
        let finalValue = value || 0;
        
        if (action === 'decrease') {
            finalValue = -Math.abs(finalValue);
        }
        
        let modifiedCount = 0;
        this.players.forEach(player => {
            let newValue = player[attribute] + finalValue;
            
            if (attribute === 'currentHP') {
                newValue = Math.max(0, Math.min(newValue, player.maxHP));
            } else if (attribute === 'currentSanity') {
                newValue = Math.max(0, Math.min(newValue, player.maxSanity));
            } else {
                newValue = Math.max(0, newValue);
            }
            
            if (newValue !== player[attribute]) {
                player[attribute] = newValue;
                player.updatedAt = new Date().toISOString();
                modifiedCount++;
                this.updatePlayerCard(player.id);
            }
        });
        
        if (modifiedCount > 0) {
            this.saveToLocalStorage();
            this.updateCounters();
            
            const actionText = action === 'increase' ? 'aumentou' : action === 'decrease' ? 'diminuiu' : 'alterou';
            const valueText = action === 'increase' ? `+${value}` : action === 'decrease' ? `-${value}` : `para ${value}`;
            
            this.showJoiceMessage(
                `✅ ${statusName} ${actionText} ${valueText} para todos os ${modifiedCount} personagens.`,
                'success'
            );
        } else {
            this.showJoiceMessage('ℹ️ Nenhum personagem foi modificado.', 'info');
        }
    }

    processResetCommand(name) {
        if (!name) {
            this.showJoiceMessage('❌ Não especificou qual personagem resetar.', 'error');
            return;
        }
        
        const players = this.findPlayersByName(name);
        
        if (players.length === 0) {
            this.showJoiceMessage(`❌ Não encontrei nenhum personagem chamado "${name}".`, 'error');
            return;
        }
        
        if (players.length > 1) {
            this.showJoiceMessage(`⚠️ Encontrei ${players.length} personagens. Vou resetar o primeiro: ${players[0].characterName}`, 'system');
        }
        
        const player = players[0];
        const oldHP = player.currentHP;
        const oldSanity = player.currentSanity;
        
        player.currentHP = player.maxHP;
        player.currentSanity = player.maxSanity;
        player.updatedAt = new Date().toISOString();
        
        this.saveToLocalStorage();
        this.updatePlayerCard(player.id);
        this.updateCounters();
        
        this.showJoiceMessage(
            `✅ ${player.characterName} foi totalmente curado! Vida: ${oldHP}→${player.maxHP}, Sanidade: ${oldSanity}→${player.maxSanity}`,
            'success'
        );
    }

    processSingleCommand(name, action, attribute, value) {
        if (!name) {
            this.showJoiceMessage('❌ Não especificou qual personagem modificar.', 'error');
            return;
        }
        
        const players = this.findPlayersByName(name);
        
        if (players.length === 0) {
            this.showJoiceMessage(`❌ Não encontrei nenhum personagem chamado "${name}".`, 'error');
            return;
        }
        
        if (players.length > 1) {
            this.showJoiceMessage(`⚠️ Encontrei ${players.length} personagens. Vou modificar o primeiro: ${players[0].characterName}`, 'system');
        }
        
        const player = players[0];
        const statusMap = {
            'currentHP': { name: 'Vida', emoji: '❤️' },
            'currentSanity': { name: 'Sanidade', emoji: '🧠' },
            'armor': { name: 'Armadura', emoji: '🛡️' },
            'honor': { name: 'Honra', emoji: '⭐' }
        };
        
        const statusInfo = statusMap[attribute] || statusMap['currentHP'];
        let finalValue = value || 0;
        
        if (action === 'decrease') {
            finalValue = -Math.abs(finalValue);
        } else if (action === 'set') {
            finalValue = value - player[attribute];
        }
        
        let newValue = player[attribute] + finalValue;
        
        if (attribute === 'currentHP') {
            newValue = Math.max(0, Math.min(newValue, player.maxHP));
        } else if (attribute === 'currentSanity') {
            newValue = Math.max(0, Math.min(newValue, player.maxSanity));
        } else {
            newValue = Math.max(0, newValue);
        }
        
        const oldValue = player[attribute];
        player[attribute] = newValue;
        player.updatedAt = new Date().toISOString();
        
        this.saveToLocalStorage();
        this.updatePlayerCard(player.id);
        this.updateCounters();
        
        const actionText = action === 'increase' ? 'aumentou' : 
                          action === 'decrease' ? 'diminuiu' : 
                          'alterou para';
        
        const valueText = action === 'set' ? `${value}` : 
                         `${oldValue} → ${newValue} (${finalValue >= 0 ? '+' : ''}${finalValue})`;
        
        this.showJoiceMessage(
            `✅ ${statusInfo.emoji} ${player.characterName}: ${statusInfo.name} ${actionText} ${valueText}`,
            'success'
        );
    }

    // MÉTODO MELHORADO para encontrar jogadores
    findPlayersByName(name) {
        if (!name) return [];
        
        const lowerName = name.toLowerCase().trim();
        const exactMatches = [];
        const partialMatches = [];
        
        this.players.forEach(player => {
            const playerNameLower = player.playerName.toLowerCase();
            const charNameLower = player.characterName.toLowerCase();
            
            // Busca exata
            if (playerNameLower === lowerName || charNameLower === lowerName) {
                exactMatches.push(player);
            }
            // Busca parcial
            else if (playerNameLower.includes(lowerName) || charNameLower.includes(lowerName)) {
                partialMatches.push(player);
            }
        });
        
        // Retorna exatos primeiro, depois parciais
        return [...exactMatches, ...partialMatches];
    }

    showJoiceMessage(message, type = 'system') {
        this.addToCommandLog(message, type);
        
        if (type === 'error') {
            this.showNotification(message, 'error');
        }
    }

    addExamplePhrases() {
        const examples = [
            "Experimente digitar frases como:",
            "'Yvor tomou 20 de dano'",
            "'Maria curou 15 de vida'",
            "'Todos ganharam 10 de sanidade'",
            "'Resetar vida de Yvor'"
        ];
        
        setTimeout(() => {
            examples.forEach((example, index) => {
                setTimeout(() => {
                    this.addToCommandLog(example, index === 0 ? 'ai' : 'system');
                }, index * 300);
            });
        }, 1000);
    }

    toggleVoiceRecognition() {
        if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
            this.showJoiceMessage('❌ Seu navegador não suporta reconhecimento de voz.', 'error');
            return;
        }
        
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.lang = 'pt-BR';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        
        const voiceBtn = document.getElementById('voice-command');
        if (voiceBtn) {
            voiceBtn.classList.add('listening');
        }
        
        recognition.start();
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            const commandInput = document.getElementById('joice-command');
            if (commandInput) {
                commandInput.value = transcript;
            }
            if (voiceBtn) {
                voiceBtn.classList.remove('listening');
            }
            
            setTimeout(() => this.executeNaturalCommand(), 1000);
        };
        
        recognition.onerror = (event) => {
            console.error('Erro no reconhecimento de voz:', event.error);
            if (voiceBtn) {
                voiceBtn.classList.remove('listening');
            }
            this.showJoiceMessage('❌ Erro no reconhecimento de voz.', 'error');
        };
        
        recognition.onend = () => {
            if (voiceBtn) {
                voiceBtn.classList.remove('listening');
            }
        };
    }

    // ==================== MÉTODOS PRINCIPAIS ====================
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    handleImageUpload(file) {
        if (!file) return;
        
        if (!file.type.match('image.*')) {
            this.showNotification('Por favor, selecione um arquivo de imagem (JPG, PNG, GIF).', 'error');
            return;
        }
        
        if (file.size > 5 * 1024 * 1024) {
            this.showNotification('A imagem deve ter menos de 5MB.', 'error');
            return;
        }
        
        this.imageFile = file;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const preview = document.getElementById('image-preview');
            if (preview) {
                preview.innerHTML = `<img src="${e.target.result}" alt="Preview" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
            }
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
            if (form) form.reset();
            const preview = document.getElementById('image-preview');
            if (preview) {
                preview.innerHTML = '<i class="fas fa-user"></i>';
            }
            // Valores padrão
            const elements = ['max-hp', 'current-hp', 'armor', 'max-sanity', 'current-sanity', 'honor'];
            elements.forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    if (id === 'max-hp' || id === 'current-hp' || id === 'max-sanity' || id === 'current-sanity') {
                        el.value = 100;
                    } else if (id === 'armor') {
                        el.value = 10;
                    } else if (id === 'honor') {
                        el.value = 0;
                    }
                }
            });
        }
        
        if (modal) {
            modal.classList.add('show');
        }
    }

    closePlayerModal() {
        const modal = document.getElementById('player-modal');
        if (modal) {
            modal.classList.remove('show');
        }
        const form = document.getElementById('player-form');
        if (form) {
            form.reset();
        }
        const preview = document.getElementById('image-preview');
        if (preview) {
            preview.innerHTML = '<i class="fas fa-user"></i>';
        }
        const upload = document.getElementById('character-image-upload');
        if (upload) {
            upload.value = '';
        }
        this.currentPlayerId = null;
        this.imageFile = null;
    }

    fillForm(player) {
        const fields = {
            'player-name': player.playerName,
            'character-name': player.characterName,
            'max-hp': player.maxHP,
            'current-hp': player.currentHP,
            'armor': player.armor,
            'max-sanity': player.maxSanity,
            'current-sanity': player.currentSanity,
            'honor': player.honor,
            'character-tribe': player.tribe || '',
            'character-clan': player.clan || '',
            'traumas': player.traumas || ''
        };
        
        Object.entries(fields).forEach(([id, value]) => {
            const el = document.getElementById(id);
            if (el) el.value = value;
        });
        
        const preview = document.getElementById('image-preview');
        if (player.characterImage && preview) {
            preview.innerHTML = `<img src="${player.characterImage}" alt="${player.characterName}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
        } else if (preview) {
            preview.innerHTML = '<i class="fas fa-user"></i>';
        }
    }

    // Substitua todo o método savePlayer por este:

savePlayer(e) {
    e.preventDefault();
    e.stopPropagation(); // Impede propagação
    
    console.log('Tentando salvar jogador...');
    
    // Verificar espaço antes de começar
    const storageStatus = this.imageManager.checkStorageSpace();
    if (storageStatus.isFull) {
        if (!confirm(`O storage está ${storageStatus.percentage.toFixed(1)}% cheio. Deseja limpar algumas imagens antes de continuar?`)) {
            this.showNotification('Operação cancelada. Storage muito cheio.', 'warning');
            return;
        }
        this.cleanupImages();
    }
    
    // Desabilitar botão e mostrar loading
    const saveBtn = document.getElementById('save-btn');
    const originalContent = saveBtn ? saveBtn.innerHTML : '';
    if (saveBtn) {
        saveBtn.disabled = true;
        saveBtn.classList.add('save-btn-loading');
        saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Salvando...';
    }
    
    // Coletar dados do formulário
    const playerData = {
        id: this.currentPlayerId || this.generateId(),
        playerName: (document.getElementById('player-name')?.value || '').trim(),
        characterName: (document.getElementById('character-name')?.value || '').trim(),
        maxHP: parseInt(document.getElementById('max-hp')?.value) || 100,
        currentHP: parseInt(document.getElementById('current-hp')?.value) || 100,
        armor: parseInt(document.getElementById('armor')?.value) || 10,
        maxSanity: parseInt(document.getElementById('max-sanity')?.value) || 100,
        currentSanity: parseInt(document.getElementById('current-sanity')?.value) || 100,
        honor: parseInt(document.getElementById('honor')?.value) || 0,
        tribe: (document.getElementById('character-tribe')?.value || '').trim(),
        clan: (document.getElementById('character-clan')?.value || '').trim(),
        traumas: (document.getElementById('traumas')?.value || '').trim(),
        createdAt: this.currentPlayerId ? 
            (this.players.find(p => p.id === this.currentPlayerId)?.createdAt || new Date().toISOString()) : 
            new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    console.log('Dados coletados:', playerData);

    // Validar dados
    if (!playerData.playerName) {
        this.showNotification('Nome do jogador é obrigatório!', 'error');
        if (saveBtn) {
            saveBtn.disabled = false;
            saveBtn.classList.remove('save-btn-loading');
            saveBtn.innerHTML = originalContent;
        }
        return;
    }

    if (!playerData.characterName) {
        this.showNotification('Nome do personagem é obrigatório!', 'error');
        if (saveBtn) {
            saveBtn.disabled = false;
            saveBtn.classList.remove('save-btn-loading');
            saveBtn.innerHTML = originalContent;
        }
        return;
    }

    // Validar valores numéricos
    if (playerData.maxHP <= 0 || playerData.maxSanity <= 0) {
        this.showNotification('Valores máximos devem ser maiores que zero!', 'error');
        if (saveBtn) {
            saveBtn.disabled = false;
            saveBtn.classList.remove('save-btn-loading');
            saveBtn.innerHTML = originalContent;
        }
        return;
    }

    // Processar imagem de forma otimizada
    const processImage = () => {
        return new Promise((resolve) => {
            if (this.imageFile) {
                console.log('Processando imagem...');
                // Usar o gerenciador para comprimir
                this.imageManager.compressImage(this.imageFile)
                    .then(compressedImage => {
                        console.log('Imagem comprimida com sucesso');
                        playerData.characterImage = compressedImage;
                        resolve();
                    })
                    .catch(error => {
                        console.warn('Erro ao processar imagem:', error);
                        this.showNotification('Aviso: Imagem não foi processada corretamente.', 'warning');
                        playerData.characterImage = null;
                        resolve();
                    });
            } else if (this.currentPlayerId) {
                // Manter imagem existente se editando
                const existingPlayer = this.players.find(p => p.id === this.currentPlayerId);
                playerData.characterImage = existingPlayer?.characterImage || null;
                console.log('Mantendo imagem existente:', !!playerData.characterImage);
                resolve();
            } else {
                playerData.characterImage = null;
                console.log('Sem imagem definida');
                resolve();
            }
        });
    };

    // Processar imagem e salvar
    processImage()
        .then(() => {
            console.log('Finalizando salvamento...');
            return this.finalizeSave(playerData);
        })
        .then(() => {
            console.log('Jogador salvo com sucesso!');
            // Restaurar botão
            if (saveBtn) {
                saveBtn.disabled = false;
                saveBtn.classList.remove('save-btn-loading');
                saveBtn.innerHTML = originalContent;
            }
        })
        .catch(error => {
            console.error('Erro ao salvar jogador:', error);
            this.showNotification('Erro ao salvar jogador. Tente novamente.', 'error');
            
            // Restaurar botão
            if (saveBtn) {
                saveBtn.disabled = false;
                saveBtn.classList.remove('save-btn-loading');
                saveBtn.innerHTML = originalContent;
            }
        });
}

// 3. Adicione este método se não existir (para debug):

showDebugInfo(message) {
    console.log(`[DEBUG] ${message}`);
    
    // Também mostra no log da Joice para visualização
    const logContent = document.getElementById('command-log-content');
    if (logContent) {
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry system';
        const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        logEntry.innerHTML = `<span class="log-time">[Debug]</span> ${message}`;
        logContent.appendChild(logEntry);
        logContent.scrollTop = logContent.scrollHeight;
    }
}

// 4. Verifique se o método finalizeSave está assim:

finalizeSave(playerData) {
    return new Promise((resolve, reject) => {
        try {
            console.log('Finalizando salvamento do jogador:', playerData.characterName);
            
            // Validar e ajustar valores
            if (playerData.currentHP > playerData.maxHP) {
                playerData.currentHP = playerData.maxHP;
            }
            if (playerData.currentSanity > playerData.maxSanity) {
                playerData.currentSanity = playerData.maxSanity;
            }

            if (this.currentPlayerId) {
                // Editar jogador existente
                const index = this.players.findIndex(p => p.id === this.currentPlayerId);
                if (index !== -1) {
                    console.log(`Editando jogador existente na posição ${index}`);
                    this.players[index] = playerData;
                } else {
                    console.log('ID não encontrado, adicionando como novo');
                    this.players.push(playerData);
                }
            } else {
                // Adicionar novo jogador
                console.log('Adicionando novo jogador');
                this.players.push(playerData);
            }

            // Tentar salvar
            try {
                localStorage.setItem('rpgPlayers', JSON.stringify(this.players));
                console.log('Dados salvos no localStorage');
            } catch (storageError) {
                console.error('Erro ao salvar no localStorage:', storageError);
                if (storageError.name === 'QuotaExceededError') {
                    // Storage cheio, tentar limpar
                    if (this.cleanupStorage()) {
                        // Tentar salvar novamente
                        localStorage.setItem('rpgPlayers', JSON.stringify(this.players));
                        console.log('Dados salvos após limpeza');
                    } else {
                        throw new Error('Não foi possível liberar espaço suficiente.');
                    }
                } else {
                    throw storageError;
                }
            }

            // Atualizar interface
            this.loadPlayers();
            this.closePlayerModal();
            
            this.showNotification(
                `✅ ${this.currentPlayerId ? 'Jogador atualizado' : 'Jogador adicionado'} com sucesso!`,
                'success'
            );
            
            // Verificar espaço após salvar
            this.checkStorageStatus();
            
            resolve();
        } catch (error) {
            console.error('Erro no finalizeSave:', error);
            reject(error);
        }
    });
}

    finalizeSave(playerData) {
        return new Promise((resolve, reject) => {
            try {
                if (playerData.currentHP > playerData.maxHP) playerData.currentHP = playerData.maxHP;
                if (playerData.currentSanity > playerData.maxSanity) playerData.currentSanity = playerData.maxSanity;

                if (this.currentPlayerId) {
                    const index = this.players.findIndex(p => p.id === this.currentPlayerId);
                    if (index !== -1) {
                        this.players[index] = playerData;
                    }
                } else {
                    this.players.push(playerData);
                }

                try {
                    localStorage.setItem('rpgPlayers', JSON.stringify(this.players));
                } catch (storageError) {
                    if (storageError.name === 'QuotaExceededError') {
                        if (this.cleanupStorage()) {
                            localStorage.setItem('rpgPlayers', JSON.stringify(this.players));
                        } else {
                            throw new Error('Não foi possível liberar espaço suficiente.');
                        }
                    } else {
                        throw storageError;
                    }
                }

                this.loadPlayers();
                this.closePlayerModal();
                
                this.showNotification(
                    `✅ ${this.currentPlayerId ? 'Jogador atualizado' : 'Jogador adicionado'} com sucesso!`,
                    'success'
                );
                
                this.checkStorageStatus();
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    showNotification(message, type = 'info') {
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        document.body.appendChild(notification);
        
        notification.querySelector('.notification-close').onclick = () => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        };
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 3000);
    }

    deletePlayer(playerId) {
        const player = this.players.find(p => p.id === playerId);
        if (!player) return;

        if (confirm(`Tem certeza que deseja remover "${player.characterName}"?`)) {
            this.players = this.players.filter(p => p.id !== playerId);
            this.saveToLocalStorage();
            this.loadPlayers();
            this.showNotification('✅ Jogador removido com sucesso!', 'success');
            this.checkStorageStatus();
        }
    }

    resetAllPlayers() {
        if (this.players.length === 0) {
            this.showNotification('Não há jogadores para resetar!', 'info');
            return;
        }

        if (confirm('Tem certeza que deseja resetar todos os jogadores? A vida e sanidade voltarão ao máximo.')) {
            this.players.forEach(player => {
                player.currentHP = player.maxHP;
                player.currentSanity = player.maxSanity;
            });
            this.saveToLocalStorage();
            this.loadPlayers();
            this.showNotification('✅ Todos os jogadores foram resetados!', 'success');
        }
    }

    updatePlayerStat(playerId, stat, value) {
        const player = this.players.find(p => p.id === playerId);
        if (!player) return;

        let newValue = player[stat] + value;
        
        if (stat === 'currentHP' || stat === 'currentSanity') {
            const maxStat = stat === 'currentHP' ? 'maxHP' : 'maxSanity';
            newValue = Math.max(0, Math.min(newValue, player[maxStat]));
        } else if (stat === 'armor' || stat === 'honor') {
            newValue = Math.max(0, newValue);
        }

        player[stat] = newValue;
        player.updatedAt = new Date().toISOString();
        this.saveToLocalStorage();
        this.updatePlayerCard(playerId);
        this.updateCounters();
    }

    updatePlayerCard(playerId) {
        const player = this.players.find(p => p.id === playerId);
        if (!player) return;

        const card = document.querySelector(`[data-player-id="${playerId}"]`);
        if (!card) {
            // Se o card não existe, recarrega todos os players
            this.loadPlayers();
            return;
        }

        // Atualizar valores
        const elements = {
            '.player-name': player.playerName,
            '.character-name': player.characterName,
            '.hp-value': player.currentHP,
            '.sanity-value': player.currentSanity,
            '.armor-value': player.armor,
            '.honor-value': player.honor
        };
        
        Object.entries(elements).forEach(([selector, value]) => {
            const el = card.querySelector(selector);
            if (el) el.textContent = value;
        });

        // Atualizar avatar
        const avatar = card.querySelector('.player-avatar');
        if (avatar) {
            if (player.characterImage) {
                const existingImg = avatar.querySelector('img');
                if (existingImg && existingImg.src === player.characterImage) {
                    // Mesma imagem, não precisa atualizar
                } else {
                    const imageId = `img-${playerId}-${Date.now()}`;
                    avatar.innerHTML = `
                        <div class="avatar-image-container" id="${imageId}">
                            <img src="${player.characterImage}" 
                                 alt="${player.characterName}" 
                                 class="loading"
                                 onload="this.classList.remove('loading'); this.classList.add('loaded');"
                                 onerror="this.onerror=null; this.style.display='none'; document.getElementById('${imageId}').innerHTML='<i class=\\'fas fa-user\\'></i>';" />
                        </div>
                    `;
                }
            } else {
                avatar.innerHTML = '<i class="fas fa-user"></i>';
            }
        }

        // Atualizar barras de progresso
        const hpPercent = (player.currentHP / player.maxHP) * 100;
        const sanityPercent = (player.currentSanity / player.maxSanity) * 100;
        
        const hpBar = card.querySelector('.hp-progress .progress-fill');
        const sanityBar = card.querySelector('.sanity-progress .progress-fill');
        
        if (hpBar) {
            hpBar.style.width = `${hpPercent}%`;
            hpBar.classList.toggle('low', hpPercent <= 30);
        }
        if (sanityBar) {
            sanityBar.style.width = `${sanityPercent}%`;
            sanityBar.classList.toggle('low', sanityPercent <= 30);
        }

        // Verificar status crítico
        const isHpCritical = hpPercent <= 30;
        const isSanityCritical = sanityPercent <= 30;
        
        card.classList.toggle('critical', isHpCritical || isSanityCritical);
        
        if (avatar) {
            avatar.classList.toggle('critical', isHpCritical || isSanityCritical);
        }
    }

    // MÉTODO CORRIGIDO - Evita duplicação de cards
    loadPlayers() {
        const grid = document.getElementById('players-grid');
        const emptyState = document.getElementById('empty-state');
        
        if (!grid) return;
        
        // LIMPAR grid completamente antes de recarregar
        grid.innerHTML = '';
        
        if (this.players.length === 0) {
            if (emptyState) {
                emptyState.classList.add('show');
            }
            this.updateCounters();
            return;
        }
        
        if (emptyState) {
            emptyState.classList.remove('show');
        }
        
        // Ordenar por nome do personagem
        const sortedPlayers = [...this.players].sort((a, b) => 
            a.characterName.localeCompare(b.characterName)
        );
        
        // Criar todos os cards de uma vez
        sortedPlayers.forEach((player, index) => {
            const card = this.createPlayerCard(player);
            card.style.animationDelay = `${index * 0.05}s`;
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
        card.style.animation = 'fadeIn 0.3s ease forwards';
        card.style.opacity = '0';
        
        const imageId = `player-img-${player.id}-${Date.now()}`;
        
        card.innerHTML = `
            <div class="player-header">
                <div class="player-avatar ${isCritical ? 'critical' : ''}">
                    ${player.characterImage ? 
                        `<div class="avatar-image-container" id="${imageId}">
                            <img src="${player.characterImage}" 
                                 alt="${player.characterName}" 
                                 class="loading"
                                 onload="this.classList.remove('loading'); this.classList.add('loaded');"
                                 onerror="this.onerror=null; this.style.display='none'; document.getElementById('${imageId}').innerHTML='<i class=\\'fas fa-user\\'></i>';" />
                        </div>` : 
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
        
        // Adicionar event listeners
        card.querySelectorAll('.control-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (this.pdfMode) return;
                const stat = btn.dataset.stat;
                const value = parseInt(btn.dataset.value);
                this.updatePlayerStat(player.id, stat, value);
            });
        });
        
        const viewBtn = card.querySelector('.view');
        if (viewBtn) {
            viewBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (this.pdfMode) {
                    this.exportToPdf(player.id);
                } else {
                    this.openCharacterModal(player.id);
                }
            });
        }
        
        const editBtn = card.querySelector('.edit');
        if (editBtn) {
            editBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (this.pdfMode) return;
                this.openPlayerModal(player.id);
            });
        }
        
        const deleteBtn = card.querySelector('.delete');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (this.pdfMode) return;
                this.deletePlayer(player.id);
            });
        }
        
        card.addEventListener('click', (e) => {
            // Evitar que o clique no card seja acionado quando clicar em botões
            if (e.target.closest('.control-btn') || e.target.closest('.player-action-btn')) {
                return;
            }
            
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
        if (!modal) return;
        
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
        
        if (avatarImg && avatarIcon) {
            if (player.characterImage) {
                avatarImg.src = player.characterImage;
                avatarImg.style.display = 'block';
                avatarIcon.style.display = 'none';
                
                avatarImg.onload = () => {
                    avatarImg.classList.add('loaded');
                };
                avatarImg.onerror = () => {
                    avatarImg.style.display = 'none';
                    avatarIcon.style.display = 'block';
                };
            } else {
                avatarImg.style.display = 'none';
                avatarIcon.style.display = 'block';
            }
        }
        
        modal.classList.add('show');
    }

    closeCharacterModal() {
        const modal = document.getElementById('character-modal');
        if (modal) {
            modal.classList.remove('show');
        }
    }

    searchPlayers() {
        const searchTerm = document.getElementById('search-players')?.value.toLowerCase() || '';
        const cards = document.querySelectorAll('.player-card');
        
        cards.forEach(card => {
            const playerName = card.querySelector('.player-name')?.textContent.toLowerCase() || '';
            const characterName = card.querySelector('.character-name')?.textContent.toLowerCase() || '';
            
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
        
        const totalEl = document.getElementById('total-players');
        const lowHealthEl = document.getElementById('low-health');
        const lowSanityEl = document.getElementById('low-sanity');
        
        if (totalEl) totalEl.textContent = totalPlayers;
        if (lowHealthEl) lowHealthEl.textContent = lowHealth;
        if (lowSanityEl) lowSanityEl.textContent = lowSanity;
    }

    // ==================== SISTEMA PDF ====================
    togglePdfMode() {
        this.pdfMode = !this.pdfMode;
        const pdfBtn = document.getElementById('pdf-export-btn');
        const pdfHint = document.getElementById('pdf-hint');
        const cards = document.querySelectorAll('.player-card');
        
        if (this.pdfMode) {
            if (pdfBtn) {
                pdfBtn.classList.add('active');
                pdfBtn.innerHTML = '<i class="fas fa-times"></i> Cancelar PDF';
            }
            if (pdfHint) {
                pdfHint.classList.add('show');
            }
            
            cards.forEach(card => {
                card.classList.add('pdf-mode');
            });
            
            document.querySelectorAll('.control-btn, .player-action-btn').forEach(btn => {
                btn.style.pointerEvents = 'none';
                btn.style.opacity = '0.5';
            });
        } else {
            if (pdfBtn) {
                pdfBtn.classList.remove('active');
                pdfBtn.innerHTML = '<i class="fas fa-file-pdf"></i> Modo Exportar PDF';
            }
            if (pdfHint) {
                pdfHint.classList.remove('show');
            }
            
            cards.forEach(card => {
                card.classList.remove('pdf-mode');
            });
            
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
            this.togglePdfMode();
            
        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            this.showNotification('Erro ao gerar PDF. Tente novamente.', 'error');
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
    addToCommandLog(message, type = 'system') {
        const logContent = document.getElementById('command-log-content');
        if (!logContent) return;
        
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
        if (!statusEl) return;
        
        const statusIndicator = statusEl.querySelector('.status-indicator');
        const icon = statusIndicator?.querySelector('i');
        const text = statusIndicator?.querySelector('span');
        
        if (!statusIndicator || !icon || !text) return;
        
        icon.classList.remove('status-idle', 'status-processing', 'status-success', 'status-error');
        icon.classList.add(`status-${type}`);
        text.textContent = message;
        
        if (type !== 'idle') {
            setTimeout(() => {
                this.showExecutionStatus('idle', 'Pronto para executar comandos');
            }, 3000);
        }
    }

    // ==================== MONITORAMENTO DE STORAGE ====================
    startStorageMonitor() {
        setInterval(() => this.checkStorageStatus(), 30000);
    }

    checkInitialStorage() {
        const status = this.imageManager.checkStorageSpace();
        if (status.percentage > 70) {
            this.showStorageWarning(status.percentage);
        }
    }

    checkStorageStatus() {
        const status = this.imageManager.checkStorageSpace();
        
        if (status.percentage > 85) {
            this.showStorageWarning(status.percentage, true);
        } else if (status.percentage > 70) {
            this.showStorageWarning(status.percentage, false);
        } else {
            this.hideStorageWarning();
        }
    }

    showStorageWarning(percentage, isCritical = false) {
        let warning = document.getElementById('storage-warning');
        
        if (!warning) {
            warning = document.createElement('div');
            warning.id = 'storage-warning';
            warning.className = `storage-warning ${isCritical ? 'storage-critical' : ''}`;
            document.body.appendChild(warning);
        }
        
        warning.className = `storage-warning ${isCritical ? 'storage-critical' : ''}`;
        warning.innerHTML = `
            <i class="fas fa-${isCritical ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>Storage ${percentage.toFixed(1)}% cheio</span>
            <button onclick="window.playerManager.cleanupImages()">Limpar Imagens</button>
            <button onclick="window.playerManager.hideStorageWarning()">&times;</button>
        `;
    }

    hideStorageWarning() {
        const warning = document.getElementById('storage-warning');
        if (warning) {
            warning.remove();
        }
    }

    // ==================== MÉTODOS DE LIMPEZA ====================
    cleanupImages() {
        const removed = this.imageManager.cleanupOldImages();
        if (removed > 0) {
            this.loadPlayers();
            this.showNotification(`✅ ${removed} imagens antigas removidas para liberar espaço.`, 'success');
            this.checkStorageStatus();
        } else {
            this.showNotification('ℹ️ Nenhuma imagem para limpar.', 'info');
        }
    }

    cleanupStorage() {
        const methods = [
            () => this.removeAllImages(),
            () => this.removeOldPlayers(10),
            () => this.clearAllData()
        ];
        
        for (let method of methods) {
            try {
                method();
                this.checkStorageStatus();
                return true;
            } catch (error) {
                console.error('Erro no método de limpeza:', error);
            }
        }
        return false;
    }

    removeAllImages() {
        this.players.forEach(player => {
            player.characterImage = null;
        });
        this.saveToLocalStorage();
        this.loadPlayers();
        this.showNotification('🖼️ Todas as imagens removidas.', 'warning');
    }

    removeOldPlayers(keepCount = 10) {
        if (this.players.length <= keepCount) {
            this.showNotification('ℹ️ Não há jogadores suficientes para remover.', 'info');
            return;
        }
        
        const sortedPlayers = [...this.players].sort((a, b) => 
            new Date(a.createdAt) - new Date(b.createdAt)
        );
        
        this.players = sortedPlayers.slice(-keepCount);
        this.saveToLocalStorage();
        this.loadPlayers();
        
        this.showNotification(`✅ Mantidos apenas os ${keepCount} jogadores mais recentes.`, 'warning');
    }

    clearAllData() {
        if (confirm('⚠️ TEM CERTEZA? Isso apagará TODOS os jogadores permanentemente!')) {
            localStorage.removeItem('rpgPlayers');
            this.players = [];
            this.loadPlayers();
            this.showNotification('✅ Todos os dados foram removidos.', 'success');
        }
    }

    saveToLocalStorage() {
        try {
            localStorage.setItem('rpgPlayers', JSON.stringify(this.players));
            return true;
        } catch (error) {
            console.error('Erro ao salvar no localStorage:', error);
            this.showNotification('Erro ao salvar dados. O localStorage pode estar cheio.', 'error');
            return false;
        }
    }
}

// ========================
// FUNÇÕES GLOBAIS DE UTILIDADE
// ========================
function checkStorageUsage() {
    let totalSize = 0;
    let items = [];
    
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        const size = key.length + (value ? value.length : 0);
        totalSize += size;
        items.push({ 
            key, 
            sizeKB: (size / 1024).toFixed(2),
            sizeMB: (size / (1024 * 1024)).toFixed(4)
        });
    }
    
    const totalKB = totalSize / 1024;
    const totalMB = totalSize / (1024 * 1024);
    const limitMB = 5;
    const percentage = (totalMB / limitMB) * 100;
    
    alert(`Uso do localStorage: ${totalKB.toFixed(2)} KB / ${limitMB * 1024} KB (${percentage.toFixed(2)}%)\n\n${items.length} itens armazenados.`);
    
    return { totalKB, totalMB, percentage, items };
}

function clearLocalStorage(showConfirm = true) {
    if (showConfirm && !confirm('⚠️ TEM CERTEZA? Isso apagará TODOS os jogadores permanentemente!')) {
        return;
    }
    
    try {
        localStorage.clear();
        alert('✅ localStorage limpo com sucesso!');
        location.reload();
    } catch (error) {
        alert('❌ Erro ao limpar localStorage: ' + error.message);
    }
}

function exportData() {
    const data = JSON.parse(localStorage.getItem('rpgPlayers')) || [];
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rpg-players-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    alert('✅ Dados exportados com sucesso!');
}

function exportDataWithoutImages() {
    const data = JSON.parse(localStorage.getItem('rpgPlayers')) || [];
    
    const dataWithoutImages = data.map(player => ({
        ...player,
        characterImage: null
    }));
    
    const blob = new Blob([JSON.stringify(dataWithoutImages, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rpg-players-no-images-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    alert('✅ Dados exportados sem imagens! As imagens foram removidas do arquivo de backup.');
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (!Array.isArray(data)) {
                throw new Error('Formato inválido: os dados devem ser um array.');
            }
            
            const currentData = JSON.parse(localStorage.getItem('rpgPlayers') || '[]');
            const newSize = JSON.stringify([...currentData, ...data]).length;
            const maxSize = 4.5 * 1024 * 1024;
            
            if (newSize > maxSize) {
                if (!confirm(`⚠️ A importação excederá o limite de storage (${(newSize/1024/1024).toFixed(2)}MB > 4.5MB).\nDeseja importar mesmo assim? Alguns dados podem ser perdidos.`)) {
                    return;
                }
            }
            
            const existingIds = new Set(currentData.map(p => p.id));
            const newPlayers = data.filter(p => !existingIds.has(p.id));
            const mergedData = [...currentData, ...newPlayers];
            
            localStorage.setItem('rpgPlayers', JSON.stringify(mergedData));
            
            alert(`✅ ${newPlayers.length} jogadores importados com sucesso!`);
            location.reload();
        } catch (error) {
            alert('❌ Erro ao importar dados: ' + error.message);
        }
    };
    
    reader.onerror = function() {
        alert('❌ Erro ao ler o arquivo.');
    };
    
    reader.readAsText(file);
}

function testJoiceAI() {
    const testPhrases = [
        "Yvor tomou 30 de dano",
        "Maria curou 20 de vida",
        "Pedro ganhou 15 de sanidade",
        "Ana perdeu 5 de armadura",
        "Lucas recebeu 10 de honra",
        "Resetar vida de Yvor",
        "Todos ganharam 10 de vida"
    ];
    
    testPhrases.forEach((phrase, index) => {
        setTimeout(() => {
            const commandInput = document.getElementById('joice-command');
            if (commandInput) {
                commandInput.value = phrase;
            }
            if (window.playerManager) {
                window.playerManager.executeNaturalCommand();
            }
        }, index * 3000);
    });
}

// ========================
// INICIALIZAÇÃO
// ========================
document.addEventListener('DOMContentLoaded', () => {
    window.playerManager = new PlayerManager();
    
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'L') {
            e.preventDefault();
            clearLocalStorage();
        }
        
        if (e.ctrlKey && e.shiftKey && e.key === 'E') {
            e.preventDefault();
            exportData();
        }
        
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
            e.preventDefault();
            checkStorageUsage();
        }
        
        if (e.ctrlKey && e.shiftKey && e.key === 'M') {
            e.preventDefault();
            if (window.playerManager) {
                window.playerManager.toggleStorageControls();
            }
        }
    });
    
    console.log('🚀 Sistema RPG Mestre inicializado com sucesso!');
});

// ========================
// EXPORTAR FUNÇÕES PARA USO GLOBAL
// ========================
window.checkStorageUsage = checkStorageUsage;
window.clearLocalStorage = clearLocalStorage;
window.exportData = exportData;
window.exportDataWithoutImages = exportDataWithoutImages;
window.importData = importData;
window.testJoiceAI = testJoiceAI;