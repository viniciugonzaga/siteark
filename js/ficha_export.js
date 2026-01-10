// ==============================================
// VARIÁVEIS GLOBAIS DE EXPORTAÇÃO
// ==============================================

let isGeneratingPDF = false;

// ==============================================
// SISTEMA DE CÓPIA DA FICHA
// ==============================================

function copyFicha() {
    try {
        const resultsDiv = document.getElementById("results");
        if (!resultsDiv || resultsDiv.style.display === "none") {
            alert("❌ Calcule a ficha primeiro!");
            return;
        }
        
        const characterName = document.getElementById("name").value || "Não preenchido";
        const characterAge = document.getElementById("age").value || "Não preenchido";
        const characterLevel = document.getElementById("level").value || "1";
        const class1 = document.getElementById("class1").value || "Não selecionado";
        const class2 = document.getElementById("class2").value || "Não selecionado";
        const combatClass = document.getElementById("combatClass").value || "Não selecionado";
        const inventory = document.getElementById("inventory").value || "Nenhum item registrado";
        const lore = document.getElementById("lore").value || "";
        
        // Calcular bônus de classe
        updateClassBonusesFromForm();
        const classBonuses = calculateClassBonuses();
        
        let vida = 55 + (attributes.vig * 15) + classBonuses.stats.vida;
        let determinacaoSanidade = 55 + (attributes.int * 10) + (attributes.set * 15) + classBonuses.stats.determinacao;
        let resistencia = 15 + (attributes.vig * 5) + classBonuses.stats.resistencia;
        let folego = 4 + (attributes.vig * 1) + classBonuses.stats.folego;
        let armadura = 5 + classBonuses.stats.armadura;
        
        const level = parseInt(characterLevel) || 1;
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
        
        let fichaText = '='.repeat(60) + '\n';
        fichaText += 'FICHA DE PERSONAGEM - RPG ARK\n';
        fichaText += '='.repeat(60) + '\n\n';
        
        fichaText += 'INFORMAÇÕES BÁSICAS:\n';
        fichaText += '─'.repeat(40) + '\n';
        fichaText += `Nome: ${characterName}\n`;
        fichaText += `Idade: ${characterAge}\n`;
        fichaText += `Nível: ${characterLevel}\n\n`;
        
        fichaText += 'ATRIBUTOS:\n';
        fichaText += '─'.repeat(40) + '\n';
        fichaText += `Agilidade: ${attributes.agi} ${classBonuses.stats.agi > 0 ? `(+${classBonuses.stats.agi} bônus)` : ''}\n`;
        fichaText += `Força: ${attributes.for} ${classBonuses.stats.for > 0 ? `(+${classBonuses.stats.for} bônus)` : ''}\n`;
        fichaText += `Inteligência: ${attributes.int} ${classBonuses.stats.int > 0 ? `(+${classBonuses.stats.int} bônus)` : ''}\n`;
        fichaText += `Sentidos: ${attributes.set} ${classBonuses.stats.set > 0 ? `(+${classBonuses.stats.set} bônus)` : ''}\n`;
        fichaText += `Vitalidade: ${attributes.vig} ${classBonuses.stats.vig > 0 ? `(+${classBonuses.stats.vig} bônus)` : ''}\n\n`;
        
        fichaText += 'ESTATÍSTICAS:\n';
        fichaText += '─'.repeat(40) + '\n';
        fichaText += `Vida Total: ${vida} ${classBonuses.stats.vida > 0 ? `(+${classBonuses.stats.vida} bônus)` : ''}\n`;
        fichaText += `Determinação/Sanidade: ${determinacaoSanidade} ${classBonuses.stats.determinacao > 0 ? `(+${classBonuses.stats.determinacao} bônus)` : ''}\n`;
        fichaText += `Resistência: ${resistencia} ${classBonuses.stats.resistencia > 0 ? `(+${classBonuses.stats.resistencia} bônus)` : ''}\n`;
        fichaText += `Fôlego: ${folego} ${classBonuses.stats.folego > 0 ? `(+${classBonuses.stats.folego} bônus)` : ''}\n`;
        fichaText += `Armadura: ${armadura} ${classBonuses.stats.armadura > 0 ? `(+${classBonuses.stats.armadura} bônus)` : ''}\n\n`;
        
        fichaText += 'CLASSES:\n';
        fichaText += '─'.repeat(40) + '\n';
        fichaText += `Classe Primitiva 1: ${class1}\n`;
        fichaText += `Classe Primitiva 2: ${class2}\n`;
        fichaText += `Classe de Combate: ${combatClass}\n\n`;
        
        // Anotações das Classes
        if (classBonuses.notes.length > 0) {
            fichaText += 'ANOTAÇÕES DAS CLASSES:\n';
            fichaText += '─'.repeat(40) + '\n';
            classBonuses.notes.forEach(note => {
                // Remove tags HTML
                const cleanNote = note.replace(/<[^>]*>/g, '');
                fichaText += `• ${cleanNote}\n`;
            });
            fichaText += '\n';
        }
        
        if (characterMutations && characterMutations.length > 0) {
            fichaText += 'SISTEMA DE MUTAÇÃO:\n';
            fichaText += '─'.repeat(40) + '\n';
            
            characterMutations.forEach((mutation) => {
                const typeLabels = {
                    'primal': 'MUTAÇÃO PRIMAL',
                    'colosso': 'COLOSSO',
                    'pacto': 'PACTO',
                    'joia': 'JÓIA',
                    'boss': 'BOSS'
                };
                
                const mutationType = typeLabels[mutation.type] || mutation.type.toUpperCase();
                const stageInfo = mutation.type === 'primal' ? ` - Estágio ${mutation.stage}` : '';
                
                fichaText += `${mutation.name || 'Mutação sem nome'} (${mutationType}${stageInfo})\n`;
                
                if (mutation.source && mutation.source.trim()) {
                    fichaText += `  Origem: ${mutation.source}\n`;
                }
                
                if (mutation.description) {
                    fichaText += `  Descrição: ${mutation.description}\n`;
                }
                
                fichaText += '\n';
            });
        }
        
        if (actionBonuses.length > 0) {
            fichaText += 'BÔNUS EM AÇÕES:\n';
            fichaText += '─'.repeat(40) + '\n';
            actionBonuses.forEach(bonus => {
                fichaText += `  ${bonus.action}: +${bonus.value} em ações\n`;
            });
            fichaText += '\n';
        }
        
        if (learnedActionBonuses.length > 0) {
            fichaText += 'BÔNUS DE AÇÕES APRENDIDOS:\n';
            fichaText += '─'.repeat(40) + '\n';
            learnedActionBonuses.forEach(bonus => {
                fichaText += `  ${bonus.action}: +${bonus.value} em ações (Aprendido)\n`;
            });
            fichaText += '\n';
        }
        
        if (characterRituals.length > 0) {
            fichaText += 'RITUAIS E PACTOS:\n';
            fichaText += '─'.repeat(40) + '\n';
            
            characterRituals.forEach(ritual => {
                if (!ritual) return;
                
                const nome = ritual.nome || ritual.name || 'Ritual sem nome';
                const descricao = ritual.descricao || ritual.description || 'Descrição não disponível';
                const tipo = ritual.tipo || ritual.type || 'N/A';
                const elemento = ritual.elemento || ritual.element || 'N/A';
                const nivel = ritual.nivel || ritual.level || 'N/A';
                
                fichaText += `${nome} (${elemento} / ${tipo} / Nv. ${nivel})\n`;
                fichaText += `  ${descricao}\n\n`;
            });
        }
        
        if (fichaArmas.length > 0) {
            fichaText += 'ARMAS DO ARSENAL:\n';
            fichaText += '─'.repeat(40) + '\n';
            
            fichaArmas.forEach(arma => {
                fichaText += `${arma.nome}\n`;
                fichaText += `  Dano: ${arma.dano}\n`;
                
                if (arma.ct) fichaText += `  CT: ${arma.ct}\n`;
                if (arma.criticos) fichaText += `  Críticos: ${arma.criticos}\n`;
                if (arma.resistencia) fichaText += `  Resistência: ${arma.resistencia}\n`;
                if (arma.condition && arma.condition !== 'Nula') {
                    fichaText += `  Condição: ${arma.condition}\n`;
                }
                if (arma.passiva) fichaText += `  Passiva: ${arma.passiva}\n`;
                if (arma.passivaRadiante) fichaText += `  Passiva Radiante: ${arma.passivaRadiante}\n`;
                if (arma.passivaTek) fichaText += `  Passiva Tek: ${arma.passivaTek}\n`;
                if (arma.raridade) fichaText += `  Raridade: ${arma.raridade.toUpperCase()}\n`;
                
                if (arma.personalizada && arma.modificadores && arma.modificadores.length > 0) {
                    fichaText += `  Modificadores:\n`;
                    arma.modificadores.forEach(mod => {
                        const isJoia = mod.id && mod.id.includes('joia') || mod.tipo === 'joia';
                        fichaText += `    • ${mod.nome}${isJoia ? ' (JOIA)' : ''}: ${mod.efeito}\n`;
                        if (mod.descricao) {
                            fichaText += `      ${mod.descricao}\n`;
                        }
                    });
                }
                
                if (arma.descricao) {
                    fichaText += `  Descrição: ${arma.descricao}\n`;
                }
                
                fichaText += '\n';
            });
        }
        
        if (weapons.length > 0) {
            fichaText += 'ARMAS MANUAIS:\n';
            fichaText += '─'.repeat(40) + '\n';
            
            weapons.forEach(weapon => {
                fichaText += `${weapon.name || 'Arma sem nome'}: ${weapon.damageDice || 'Dano não especificado'}`;
                if (weapon.condition && weapon.condition !== 'Nula') {
                    fichaText += ` (${weapon.condition})`;
                }
                fichaText += '\n';
            });
            fichaText += '\n';
        }
        
        fichaText += 'INVENTÁRIO:\n';
        fichaText += '─'.repeat(40) + '\n';
        fichaText += `${inventory}\n\n`;
        
        if (lore && lore.trim() !== '') {
            fichaText += 'HISTÓRIA & PERSONALIDADE:\n';
            fichaText += '─'.repeat(40) + '\n';
            fichaText += `${lore}\n\n`;
        }
        
        let levelRewardsList = [];
        let mutationRewardsList = [];
        let inventoryRewardsList = [];
        
        if (level >= 15) levelRewardsList.push(`+1 Ponto de Atributo`);
        if (level >= 30) levelRewardsList.push(`Mais slots para Bônus de Ação (Total de 12 slots)`);
        if (level >= 50) {
            levelRewardsList.push(`+30 de Vida`);
            levelRewardsList.push(`Mais slots para Bônus de Ação (Total de 15 slots) e possibilidade de bônus até +20`);
            inventoryRewardsList.push('Convite da Linhagem de Athenas');
            inventoryRewardsList.push('1 Presente de Evento Global');
        }
        if (level >= 65) {
            levelRewardsList.push(`+20 de Sanidade`);
            levelRewardsList.push(`+1 Ponto de Atributo adicional`);
            mutationRewardsList.push(`+1 Parte de Mutação (Revivendo Memória) - Mutação Primal evolui para Estágio 2`);
        }
        if (level >= 80) {
            levelRewardsList.push(`+10 Armadura padrão`);
            levelRewardsList.push(`Mais slots para Bônus de Ação (Total de 20 slots)`);
            inventoryRewardsList.push('1 Ritual Normal');
            inventoryRewardsList.push('1 Subida de Patente');
        }
        if (level >= 95) {
            mutationRewardsList.push(`+1 Parte de Mutação (Conversa com o Infinito) - Mutação Primal evolui para Estágio 3`);
            inventoryRewardsList.push('Convite da Linhagem de Athenas');
        }
        if (level >= 99) {
            levelRewardsList.push(`+10 Armadura padrão`);
            levelRewardsList.push(`+1 Ponto de Atributo adicional`);
            mutationRewardsList.push(`+1 Parte de Mutação (Último Incentivo Pessoal) - Mutação Primal evolui para Estágio 4`);
            levelRewardsList.push(`Título: "Sobrevivente"`);
        }
        
        if (mutationRewardsList.length > 0) {
            fichaText += 'RECOMPENSAS DE MUTAÇÃO:\n';
            fichaText += '─'.repeat(40) + '\n';
            mutationRewardsList.forEach(item => {
                fichaText += `  • ${item}\n`;
            });
            fichaText += '\n';
        }
        
        if (inventoryRewardsList.length > 0) {
            fichaText += 'RECOMPENSAS ADICIONAIS:\n';
            fichaText += '─'.repeat(40) + '\n';
            inventoryRewardsList.forEach(item => {
                fichaText += `  • ${item}\n`;
            });
            fichaText += '\n';
        }
        
        if (levelRewardsList.length > 0) {
            fichaText += 'RECOMPENSAS GERAIS POR NÍVEL:\n';
            fichaText += '─'.repeat(40) + '\n';
            levelRewardsList.forEach(item => {
                fichaText += `  • ${item}\n`;
            });
            fichaText += '\n';
        }
        
        fichaText += '='.repeat(60) + '\n';
        fichaText += `Gerado em: ${new Date().toLocaleString('pt-BR')}\n`;
        fichaText += 'RPG ARK - Sistema de Ficha de Personagem\n';
        fichaText += '='.repeat(60);
        
        navigator.clipboard.writeText(fichaText)
            .then(() => {
                showCopyStatus("✅ Ficha copiada com sucesso! Todas as informações das armas incluídas.");
                
                const copyButton = document.getElementById('copyFichaBtn');
                if (copyButton) {
                    copyButton.classList.add('success');
                    const icon = copyButton.querySelector('i');
                    if (icon) {
                        icon.className = 'fas fa-check';
                    }
                    copyButton.innerHTML = '<i class="fas fa-check"></i> Ficha Copiada!';
                    
                    setTimeout(() => {
                        copyButton.classList.remove('success');
                        copyButton.innerHTML = '<i class="fas fa-copy"></i> Copiar Ficha';
                    }, 3000);
                }
            })
            .catch(err => {
                console.error('Erro ao copiar a ficha: ', err);
                
                const textArea = document.createElement('textarea');
                textArea.value = fichaText;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                
                try {
                    const successful = document.execCommand('copy');
                    if (successful) {
                        showCopyStatus("✅ Ficha copiada (método alternativo)!", "success");
                        
                        const copyButton = document.getElementById('copyFichaBtn');
                        if (copyButton) {
                            copyButton.classList.add('success');
                            copyButton.innerHTML = '<i class="fas fa-check"></i> Ficha Copiada!';
                            
                            setTimeout(() => {
                                copyButton.classList.remove('success');
                                copyButton.innerHTML = '<i class="fas fa-copy"></i> Copiar Ficha';
                            }, 3000);
                        }
                    } else {
                        throw new Error('Falha no método alternativo');
                    }
                } catch (err) {
                    console.error('Erro no método alternativo:', err);
                    showCopyStatus("❌ Erro ao copiar. Tente selecionar e copiar manualmente.", "error");
                    
                    const copyButton = document.getElementById('copyFichaBtn');
                    if (copyButton) {
                        copyButton.classList.add('error');
                        copyButton.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Erro ao Copiar';
                        
                        setTimeout(() => {
                            copyButton.classList.remove('error');
                            copyButton.innerHTML = '<i class="fas fa-copy"></i> Copiar Ficha';
                        }, 3000);
                    }
                    
                    if (fichaText.length > 2000) {
                        console.log("=== FICHA PARA COPIAR ===");
                        console.log(fichaText);
                        console.log("=== FIM DA FICHA ===");
                        alert("Ficha muito longa para mostrar em alerta. Verifique o console do navegador (F12) para copiar manualmente.");
                    } else {
                        alert("Copie manualmente o texto abaixo:\n\n" + fichaText);
                    }
                }
                
                document.body.removeChild(textArea);
            });
    } catch (error) {
        console.error('Erro em copyFicha:', error);
        showCopyStatus("❌ Erro ao copiar ficha. Tente novamente.", "error");
    }
}

function showCopyStatus(message, type = 'info') {
    const copyStatus = document.getElementById('copyStatus');
    if (!copyStatus) {
        const statusDiv = document.createElement('div');
        statusDiv.id = 'copyStatus';
        statusDiv.style.cssText = `
            text-align: center;
            margin-top: 10px;
            padding: 10px;
            border-radius: 5px;
            font-weight: bold;
            transition: all 0.3s ease;
            opacity: 0;
        `;
        
        const botoesContainer = document.getElementById('botoesFichaContainer');
        if (botoesContainer) {
            botoesContainer.appendChild(statusDiv);
        }
    }
    
    const element = document.getElementById('copyStatus');
    if (element) {
        element.textContent = message;
        element.style.opacity = '1';
        element.style.background = type === 'success' ? 'rgba(76, 175, 80, 0.2)' : 
                                   type === 'error' ? 'rgba(244, 67, 54, 0.2)' : 
                                   'rgba(33, 150, 243, 0.2)';
        element.style.color = type === 'success' ? '#4caf50' : 
                              type === 'error' ? '#f44336' : 
                              '#2196f3';
        element.style.border = type === 'success' ? '1px solid #4caf50' : 
                               type === 'error' ? '1px solid #f44336' : 
                               '1px solid #2196f3';
        
        setTimeout(() => {
            element.style.opacity = '0';
            setTimeout(() => {
                element.textContent = '';
            }, 300);
        }, 5000);
    }
}

// ==============================================
// FUNÇÃO PARA CARREGAR BIBLIOTECAS DE PDF
// ==============================================

async function loadPDFLibraries() {
    return new Promise((resolve, reject) => {
        if (typeof jspdf !== 'undefined' && typeof html2canvas !== 'undefined') {
            resolve();
            return;
        }
        
        if (typeof html2canvas === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';
            script.onload = () => {
                if (typeof jspdf === 'undefined') {
                    const script2 = document.createElement('script');
                    script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
                    script2.onload = () => {
                        resolve();
                    };
                    script2.onerror = reject;
                    document.head.appendChild(script2);
                } else {
                    resolve();
                }
            };
            script.onerror = reject;
            document.head.appendChild(script);
        } else if (typeof jspdf === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        }
    });
}

// ==============================================
// FUNÇÃO PRINCIPAL PARA GERAR PDF
// ==============================================

async function generatePDF() {
    if (isGeneratingPDF) {
        alert('Aguarde a geração do PDF atual terminar.');
        return;
    }
    
    const resultsDiv = document.getElementById("results");
    if (!resultsDiv || resultsDiv.style.display === "none") {
        alert('Por favor, calcule a ficha primeiro antes de gerar o PDF.');
        return;
    }
    
    if (typeof jspdf === 'undefined' || typeof html2canvas === 'undefined') {
        alert('Bibliotecas de PDF não carregadas. Carregando...');
        await loadPDFLibraries();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    isGeneratingPDF = true;
    
    const button = document.querySelector('.pdf-button');
    const originalButtonText = button?.innerHTML;
    if (button) {
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gerando PDF...';
        button.disabled = true;
    }
    
    try {
        const characterData = collectCharacterDataForPDF();
        
        const tempContainer = document.createElement('div');
        tempContainer.id = 'temp-pdf-container';
        
        tempContainer.style.cssText = `
            position: absolute;
            left: -9999px;
            top: 0;
            width: 794px;
            background: white;
            color: black;
            padding: 40px 30px;
            font-family: 'Arial', sans-serif;
            font-size: 12px;
            line-height: 1.4;
            z-index: -9999;
        `;
        
        tempContainer.innerHTML = `
            <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #000; padding-bottom: 20px;">
                <h1 style="font-size: 24px; margin: 0;">FICHA DE PERSONAGEM - RPG ARK</h1>
                <h2 style="font-size: 20px; margin: 10px 0 0 0; color: #333;">${characterData.name || 'Personagem Sem Nome'}</h2>
                <p style="margin: 5px 0;">Nível ${characterData.level} | ${characterData.age} anos</p>
                <p style="margin: 5px 0; font-size: 10px;">Gerado em: ${new Date().toLocaleString('pt-BR')}</p>
            </div>
            
            ${characterData.photoSrc && characterData.photoSrc !== '#' && !characterData.photoSrc.includes('data:image/gif') ? 
                `<div style="text-align: center; margin: 20px 0;">
                    <img src="${characterData.photoSrc}" alt="Foto" style="max-width: 150px; border: 2px solid #000;">
                </div>` 
                : ''}
            
            <div style="margin-bottom: 25px; page-break-inside: avoid;">
                <h3 style="background: #f0f0f0; padding: 8px; margin: 0 0 15px 0; border-left: 4px solid #000;">ATRIBUTOS</h3>
                <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin-bottom: 15px;">
                    <div style="text-align: center; border: 1px solid #ccc; padding: 10px;">
                        <div style="font-weight: bold; text-transform: uppercase; font-size: 10px;">AGILIDADE</div>
                        <div style="font-size: 24px; font-weight: bold;">${characterData.attributes.agi + characterData.classBonuses.stats.agi} ${characterData.classBonuses.stats.agi > 0 ? `<span style="font-size: 10px; color: green;">(+${characterData.classBonuses.stats.agi})</span>` : ''}</div>
                    </div>
                    <div style="text-align: center; border: 1px solid #ccc; padding: 10px;">
                        <div style="font-weight: bold; text-transform: uppercase; font-size: 10px;">FORÇA</div>
                        <div style="font-size: 24px; font-weight: bold;">${characterData.attributes.for + characterData.classBonuses.stats.for} ${characterData.classBonuses.stats.for > 0 ? `<span style="font-size: 10px; color: green;">(+${characterData.classBonuses.stats.for})</span>` : ''}</div>
                    </div>
                    <div style="text-align: center; border: 1px solid #ccc; padding: 10px;">
                        <div style="font-weight: bold; text-transform: uppercase; font-size: 10px;">INTELIGÊNCIA</div>
                        <div style="font-size: 24px; font-weight: bold;">${characterData.attributes.int + characterData.classBonuses.stats.int} ${characterData.classBonuses.stats.int > 0 ? `<span style="font-size: 10px; color: green;">(+${characterData.classBonuses.stats.int})</span>` : ''}</div>
                    </div>
                    <div style="text-align: center; border: 1px solid #ccc; padding: 10px;">
                        <div style="font-weight: bold; text-transform: uppercase; font-size: 10px;">SENTIDOS</div>
                        <div style="font-size: 24px; font-weight: bold;">${characterData.attributes.set + characterData.classBonuses.stats.set} ${characterData.classBonuses.stats.set > 0 ? `<span style="font-size: 10px; color: green;">(+${characterData.classBonuses.stats.set})</span>` : ''}</div>
                    </div>
                    <div style="text-align: center; border: 1px solid #ccc; padding: 10px;">
                        <div style="font-weight: bold; text-transform: uppercase; font-size: 10px;">VITALIDADE</div>
                        <div style="font-size: 24px; font-weight: bold;">${characterData.attributes.vig + characterData.classBonuses.stats.vig} ${characterData.classBonuses.stats.vig > 0 ? `<span style="font-size: 10px; color: green;">(+${characterData.classBonuses.stats.vig})</span>` : ''}</div>
                    </div>
                </div>
            </div>
            
            <div style="margin-bottom: 25px; page-break-inside: avoid;">
                <h3 style="background: #f0f0f0; padding: 8px; margin: 0 0 15px 0; border-left: 4px solid #000;">ESTATÍSTICAS</h3>
                <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px;">
                    <div style="text-align: center; background: #ffe6e6; padding: 10px; border: 1px solid #ff9999;">
                        <div style="font-size: 10px;">VIDA</div>
                        <div style="font-size: 24px; font-weight: bold;">${characterData.stats.vida}</div>
                        ${characterData.classBonuses.stats.vida > 0 ? `<div style="font-size: 9px; color: green;">+${characterData.classBonuses.stats.vida} classe</div>` : ''}
                    </div>
                    <div style="text-align: center; background: #e6f7ff; padding: 10px; border: 1px solid #66ccff;">
                        <div style="font-size: 10px;">DETERMINAÇÃO</div>
                        <div style="font-size: 24px; font-weight: bold;">${characterData.stats.determinacaoSanidade}</div>
                        ${characterData.classBonuses.stats.determinacao > 0 ? `<div style="font-size: 9px; color: green;">+${characterData.classBonuses.stats.determinacao} classe</div>` : ''}
                    </div>
                    <div style="text-align: center; background: #e6ffe6; padding: 10px; border: 1px solid #66cc66;">
                        <div style="font-size: 10px;">RESISTÊNCIA</div>
                        <div style="font-size: 24px; font-weight: bold;">${characterData.stats.resistencia}</div>
                        ${characterData.classBonuses.stats.resistencia > 0 ? `<div style="font-size: 9px; color: green;">+${characterData.classBonuses.stats.resistencia} classe</div>` : ''}
                    </div>
                    <div style="text-align: center; background: #fffae6; padding: 10px; border: 1px solid #ffcc66;">
                        <div style="font-size: 10px;">FÔLEGO</div>
                        <div style="font-size: 24px; font-weight: bold;">${characterData.stats.folego}</div>
                        ${characterData.classBonuses.stats.folego > 0 ? `<div style="font-size: 9px; color: green;">+${characterData.classBonuses.stats.folego} classe</div>` : ''}
                    </div>
                    <div style="text-align: center; background: #f0f0f0; padding: 10px; border: 1px solid #999;">
                        <div style="font-size: 10px;">ARMADURA</div>
                        <div style="font-size: 24px; font-weight: bold;">${characterData.stats.armadura}</div>
                        ${characterData.classBonuses.stats.armadura > 0 ? `<div style="font-size: 9px; color: green;">+${characterData.classBonuses.stats.armadura} classe</div>` : ''}
                    </div>
                </div>
            </div>
            
            <div style="margin-bottom: 25px; page-break-inside: avoid;">
                <h3 style="background: #f0f0f0; padding: 8px; margin: 0 0 15px 0; border-left: 4px solid #000;">CLASSES</h3>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
                    <div style="border: 1px solid #ccc; padding: 10px;">
                        <div style="font-weight: bold; font-size: 10px;">Classe Primitiva 1</div>
                        <div style="font-size: 14px; font-weight: bold;">${characterData.class1 || 'Não selecionado'}</div>
                    </div>
                    <div style="border: 1px solid #ccc; padding: 10px;">
                        <div style="font-weight: bold; font-size: 10px;">Classe Primitiva 2</div>
                        <div style="font-size: 14px; font-weight: bold;">${characterData.class2 || 'Não selecionado'}</div>
                    </div>
                    <div style="border: 1px solid #ccc; padding: 10px;">
                        <div style="font-weight: bold; font-size: 10px;">Classe de Combate</div>
                        <div style="font-size: 14px; font-weight: bold;">${characterData.combatClass || 'Não selecionado'}</div>
                    </div>
                </div>
            </div>
            
            ${characterData.classBonuses.notes.length > 0 ? `
            <div style="margin-bottom: 25px; page-break-inside: avoid;">
                <h3 style="background: #f0f0f0; padding: 8px; margin: 0 0 15px 0; border-left: 4px solid #000;">ANOTAÇÕES DAS CLASSES</h3>
                <div style="border: 1px solid #ccc; padding: 15px; background: #f9f9f9;">
                    ${characterData.classBonuses.notes.map(note => {
                        const cleanNote = note.replace(/<[^>]*>/g, '');
                        return `<div style="margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px dashed #ddd; font-size: 11px;">
                            ${cleanNote}
                        </div>`;
                    }).join('')}
                </div>
            </div>
            ` : ''}
            
            ${characterData.fichaArmas.length > 0 ? `
                <div style="margin-bottom: 25px; page-break-inside: avoid;">
                    <h3 style="background: #f0f0f0; padding: 8px; margin: 0 0 15px 0; border-left: 4px solid #000;">
                        ARMAS (${characterData.fichaArmas.length})
                    </h3>
                    ${characterData.fichaArmas.map(arma => `
                        <div style="border: 1px solid #ccc; margin-bottom: 15px; padding: 15px; page-break-inside: avoid;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                <h4 style="margin: 0; font-size: 16px;">${arma.nome}</h4>
                                <span style="font-size: 18px; font-weight: bold; color: #d00;">${arma.dano}</span>
                            </div>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; font-size: 11px;">
                                ${arma.ct ? `<div><strong>CT:</strong> ${arma.ct}</div>` : ''}
                                ${arma.criticos ? `<div><strong>Críticos:</strong> ${arma.criticos}</div>` : ''}
                                ${arma.passiva ? `<div><strong>Passiva:</strong> ${arma.passiva}</div>` : ''}
                                ${arma.condition && arma.condition !== 'Nula' ? `<div><strong>Condição:</strong> ${arma.condition}</div>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            
            ${characterData.characterMutations && characterData.characterMutations.length > 0 ? `
                <div style="margin-bottom: 25px; page-break-inside: avoid;">
                    <h3 style="background: #f0f0f0; padding: 8px; margin: 0 0 15px 0; border-left: 4px solid #000;">MUTAÇÕES</h3>
                    ${characterData.characterMutations.map(mutation => `
                        <div style="border: 1px solid #ccc; margin-bottom: 10px; padding: 10px;">
                            <div style="font-weight: bold; margin-bottom: 5px;">${mutation.name || 'Mutação sem nome'}</div>
                            <div style="font-size: 11px;">${mutation.description || 'Sem descrição'}</div>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            
            <div style="margin-bottom: 25px; page-break-inside: avoid;">
                <h3 style="background: #f0f0f0; padding: 8px; margin: 0 0 15px 0; border-left: 4px solid #000;">INVENTÁRIO</h3>
                <div style="border: 1px solid #ccc; padding: 15px; min-height: 150px; white-space: pre-line;">
                    ${characterData.inventory || 'Nenhum item registrado'}
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #000; font-size: 10px; color: #666;">
                <div>Ficha gerada pelo Sistema RPG ARK</div>
                <div>ID: ${generateFichaID(characterData.name, characterData.level)}</div>
            </div>
        `;
        
        document.body.appendChild(tempContainer);
        
        const canvas = await html2canvas(tempContainer, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
            width: 794,
            windowWidth: 794,
            allowTaint: true,
            removeContainer: true,
            foreignObjectRendering: false,
            imageTimeout: 10000,
            onclone: function(clonedDoc) {
                const container = clonedDoc.getElementById('temp-pdf-container');
                if (container) {
                    container.style.position = 'relative';
                    container.style.left = '0';
                    container.style.width = '794px';
                    container.style.background = 'white';
                    container.style.color = 'black';
                }
            }
        });
        
        document.body.removeChild(tempContainer);
        
        const pdf = new jspdf.jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            compress: true
        });
        
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        pdf.addImage(canvas.toDataURL('image/jpeg', 0.9), 'JPEG', 0, 0, imgWidth, imgHeight);
        
        let heightLeft = imgHeight - pageHeight;
        let position = 0;
        
        while (heightLeft > 0) {
            position -= pageHeight;
            pdf.addPage();
            pdf.addImage(canvas.toDataURL('image/jpeg', 0.9), 'JPEG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        
        const fileName = `ficha_${characterData.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}.pdf`;
        pdf.save(fileName);
        
        alert(`PDF gerado com sucesso: ${fileName}`);
        
    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        alert('Erro ao gerar PDF. Tente usar o botão "Copiar Ficha" em vez disso.\nErro: ' + error.message);
    } finally {
        isGeneratingPDF = false;
        
        const button = document.querySelector('.pdf-button');
        if (button && originalButtonText) {
            button.innerHTML = originalButtonText;
            button.disabled = false;
        }
    }
}

// ==============================================
// FUNÇÕES AUXILIARES DE LAYOUT
// ==============================================

function reorganizarSecoes() {
    const form = document.getElementById('characterForm');
    if (!form) return;
    
    const rituaisSection = document.getElementById('selected-ritual-pact-section');
    const weaponsManualSection = document.getElementById('weaponsManualSection');
    
    if (rituaisSection && weaponsManualSection) {
        weaponsManualSection.remove();
        rituaisSection.insertAdjacentElement('afterend', weaponsManualSection);
    }
    
    criarSecaoArmasFicha();
    reorganizarBotoes();
    atualizarArmasDaFicha();
}

function criarSecaoArmasFicha() {
    const form = document.getElementById('characterForm');
    if (!form) return;
    
    if (document.getElementById('armasFichaSection')) return;
    
    const secaoArmas = document.createElement('div');
    secaoArmas.id = 'armasFichaSection';
    secaoArmas.className = 'ficha-section armas-ficha-section';
    secaoArmas.innerHTML = `
        <h3 class="decorated-title">Armas do Arsenal</h3>
        <div class="armas-info">
            <p class="info-display">
                <strong>Armas do Catálogo</strong> - Estas são as armas que você adicionou do catálogo de armas.
                <br>
                <small>As armas adicionadas aqui aparecerão automaticamente na ficha calculada.</small>
            </p>
        </div>
        
        <div id="fichaArmasDisplayContainer" class="ficha-armas-display-container">
            <!-- As armas do catálogo serão carregadas aqui -->
        </div>
        
        <div class="armas-buttons">
            <button type="button" onclick="irParaArsenal()" class="btn-catalogo">
                <i class="fas fa-swords"></i> Ir para Arsenal
            </button>
            <button type="button" onclick="atualizarArmasDaFicha()" class="btn-atualizar">
                <i class="fas fa-sync-alt"></i> Atualizar Lista
            </button>
        </div>
    `;
    
    const weaponsManualSection = document.getElementById('weaponsManualSection');
    if (weaponsManualSection) {
        weaponsManualSection.insertAdjacentElement('afterend', secaoArmas);
    } else {
        const formActions = document.querySelector('.form-actions');
        if (formActions) {
            formActions.insertAdjacentElement('beforebegin', secaoArmas);
        } else {
            form.appendChild(secaoArmas);
        }
    }
}

function reorganizarBotoes() {
    const form = document.getElementById('characterForm');
    if (!form) return;
    
    const calcularBtn = document.querySelector('.calculate-btn');
    const saveBtn = document.querySelector('.save-btn');
    const resetBtn = document.querySelector('.reset-btn');
    const pdfBtn = document.querySelector('.pdf-button');
    const copyBtn = document.querySelector('.copy-ficha-btn');
    
    const existingActions = document.querySelector('.form-actions');
    if (existingActions) {
        existingActions.remove();
    }
    
    const botoesContainer = document.createElement('div');
    botoesContainer.className = 'botoes-ficha-container';
    botoesContainer.id = 'botoesFichaContainer';
    
    botoesContainer.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin: 30px 0;
        padding: 20px;
        background: rgba(16, 16, 25, 0.3);
        border-radius: 10px;
        border: 1px solid rgba(176, 255, 248, 0.1);
    `;
    
    const linha1 = document.createElement('div');
    linha1.className = 'botoes-linha';
    linha1.style.cssText = `
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: center;
    `;
    
    if (calcularBtn) {
        calcularBtn.style.cssText = `
            flex: 1;
            min-width: 180px;
            background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: all 0.3s ease;
        `;
        calcularBtn.onmouseenter = function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
        };
        calcularBtn.onmouseleave = function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        };
        linha1.appendChild(calcularBtn);
    }
    
    if (saveBtn) {
        saveBtn.style.cssText = calcularBtn.style.cssText;
        saveBtn.onmouseenter = calcularBtn.onmouseenter;
        saveBtn.onmouseleave = calcularBtn.onmouseleave;
        linha1.appendChild(saveBtn);
    }
    
    if (resetBtn) {
        resetBtn.style.cssText = calcularBtn.style.cssText;
        resetBtn.onmouseenter = calcularBtn.onmouseenter;
        resetBtn.onmouseleave = calcularBtn.onmouseleave;
        linha1.appendChild(resetBtn);
    }
    
    const linha2 = document.createElement('div');
    linha2.className = 'botoes-linha';
    linha2.style.cssText = linha1.style.cssText;
    
    if (!copyBtn) {
        const newCopyBtn = document.createElement('button');
        newCopyBtn.id = 'copyFichaBtn';
        newCopyBtn.className = 'copy-ficha-btn';
        newCopyBtn.innerHTML = '<i class="fas fa-copy"></i> Copiar Ficha';
        newCopyBtn.onclick = copyFicha;
        newCopyBtn.style.cssText = calcularBtn.style.cssText;
        newCopyBtn.onmouseenter = calcularBtn.onmouseenter;
        newCopyBtn.onmouseleave = calcularBtn.onmouseleave;
        linha2.appendChild(newCopyBtn);
    } else {
        copyBtn.style.cssText = calcularBtn.style.cssText;
        copyBtn.onmouseenter = calcularBtn.onmouseenter;
        copyBtn.onmouseleave = calcularBtn.onmouseleave;
        linha2.appendChild(copyBtn);
    }
    
    if (pdfBtn) {
        pdfBtn.style.cssText = calcularBtn.style.cssText;
        pdfBtn.onmouseenter = calcularBtn.onmouseenter;
        pdfBtn.onmouseleave = calcularBtn.onmouseleave;
        linha2.appendChild(pdfBtn);
    }
    
    botoesContainer.appendChild(linha1);
    botoesContainer.appendChild(linha2);
    
    const copyStatus = document.createElement('div');
    copyStatus.id = 'copyStatus';
    copyStatus.style.cssText = `
        text-align: center;
        margin-top: 10px;
        padding: 5px;
        font-size: 14px;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    botoesContainer.appendChild(copyStatus);
    
    form.appendChild(botoesContainer);
}

// ==============================================
// EXPORTAR FUNÇÕES PARA ESCOPO GLOBAL
// ==============================================

window.copyFicha = copyFicha;
window.generatePDF = generatePDF;
window.showCopyStatus = showCopyStatus;
window.loadPDFLibraries = loadPDFLibraries;
window.reorganizarSecoes = reorganizarSecoes;
window.criarSecaoArmasFicha = criarSecaoArmasFicha;
window.reorganizarBotoes = reorganizarBotoes;

// ==============================================
// INICIALIZAÇÃO COMPLETA
// ==============================================

window.onload = function() {
    console.log('Página carregada, inicializando sistema...');
    
    // NÃO ADICIONA MAIS CSS AQUI - REMOVI O BLOCO PROBLEMÁTICO
    getLoggedInUser();
    
    loadCharacterLocal();
    
    fichaArmas = carregarArmasFicha();
    
    setTimeout(() => {
        reorganizarSecoes();
    }, 100);
    
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
        validateLevelInput();
        levelInput.addEventListener('input', validateLevelInput);
        levelInput.addEventListener('change', validateLevelInput);
    }
    
    const photoInput = document.getElementById('photo');
    if (photoInput) {
        photoInput.addEventListener('change', function(event) {
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
    }
    
    console.log('Sistema de ficha inicializado com sucesso!');
};