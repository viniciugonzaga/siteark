// ==============================================
// FUNÇÕES DE CÁLCULO E EXIBIÇÃO DA FICHA
// ==============================================

function calculateStats() {
    try {
        console.log('calculateStats() chamada!');
        
        // Atualizar bônus de classe antes de calcular
        updateClassBonusesFromForm();
        
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

        // Calcular bônus de classe
        const classBonuses = calculateClassBonuses();
        
        // Calcular estatísticas base
        let vida = 55 + (attributes.vig * 15);
        let determinacaoSanidade = 55 + (attributes.int * 10) + (attributes.set * 15);
        let resistencia = 15 + (attributes.vig * 5);
        let folego = 4 + (attributes.vig * 1);
        let armadura = 5;

        // Adicionar bônus de classe
        vida += classBonuses.stats.vida;
        determinacaoSanidade += classBonuses.stats.determinacao;
        resistencia += classBonuses.stats.resistencia;
        folego += classBonuses.stats.folego;
        armadura += classBonuses.stats.armadura;
        
        // Atributos com bônus para exibição
        let atributosComBonus = {
            agi: attributes.agi + classBonuses.stats.agi,
            for: attributes.for + classBonuses.stats.for,
            int: attributes.int + classBonuses.stats.int,
            set: attributes.set + classBonuses.stats.set,
            vig: attributes.vig + classBonuses.stats.vig
        };

        // Bônus de nível
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
            currentLife: vida,
            currentSanity: determinacaoSanidade,
            currentArmor: armadura,
            currentResistencia: resistencia,
            currentAgi: atributosComBonus.agi,
            currentFor: atributosComBonus.for,
            currentInt: atributosComBonus.int,
            currentSet: atributosComBonus.set,
            currentVig: atributosComBonus.vig,
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

        fichaArmas = carregarArmasFicha();
        
        let armasCatalogoHtml = '';
        if (fichaArmas.length > 0) {
            armasCatalogoHtml = `<div class="ficha-section"><h4 class="section-title">Armas do Arsenal</h4>`;
            armasCatalogoHtml += `<div class="ficha-armas-display">`;
            
            fichaArmas.forEach(arma => {
                const ctInfo = arma.ct ? `<div class="arma-stat"><strong>CT:</strong> ${arma.ct}</div>` : '';
                const criticosInfo = arma.criticos ? `<div class="arma-stat"><strong>Críticos:</strong> ${arma.criticos}</div>` : '';
                const passivaInfo = arma.passiva ? `<div class="arma-passiva"><strong>Passiva:</strong> ${arma.passiva}</div>` : '';
                const passivaRadianteInfo = arma.passivaRadiante ? `<div class="arma-passiva-radiante"><strong>Passiva Radiante:</strong> ${arma.passivaRadiante}</div>` : '';
                const passivaTekInfo = arma.passivaTek ? `<div class="arma-passiva-tek"><strong>Passiva Tek:</strong> ${arma.passivaTek}</div>` : '';
                const resistenciaInfo = arma.resistencia ? `<div class="arma-stat"><strong>Resistência:</strong> ${arma.resistencia}</div>` : '';
                const raridadeInfo = arma.raridade ? `<div class="arma-raridade-badge ${arma.raridade}">${arma.raridade.toUpperCase()}</div>` : '';
                const condicaoInfo = arma.condition && arma.condition !== 'Nula' 
                    ? `<div class="arma-condicao-ficha"><strong>Condição:</strong> ${arma.condition}</div>` 
                    : '';
                
                let modificadoresFichaHTML = '';
                if (arma.personalizada && arma.modificadores && arma.modificadores.length > 0) {
                    let modsText = '';
                    arma.modificadores.forEach((mod, index) => {
                        const isJoia = mod.id && mod.id.includes('joia') || mod.tipo === 'joia';
                        modsText += `${index > 0 ? ', ' : ''}${mod.nome}${isJoia ? ' (JOIA)' : ''}: ${mod.efeito}`;
                    });
                    
                    modificadoresFichaHTML = `
                        <div class="arma-modificadores-resumo">
                            <strong>Modificadores:</strong> ${modsText}
                        </div>
                    `;
                }
                
                armasCatalogoHtml += `
                    <div class="arma-ficha-completa ${arma.personalizada ? 'arma-personalizada' : ''}">
                        <div class="arma-header-ficha">
                            <div>
                                <h5>
                                    ${arma.nome}
                                    ${arma.personalizada ? '<span class="person-badge"><i class="fas fa-hammer"></i></span>' : ''}
                                </h5>
                                ${raridadeInfo}
                            </div>
                            <span class="arma-dano-ficha">${arma.dano}</span>
                        </div>
                        <div class="arma-detalhes-ficha">
                            ${ctInfo}
                            ${criticosInfo}
                            ${resistenciaInfo}
                            ${condicaoInfo}
                            ${passivaInfo}
                            ${passivaRadianteInfo}
                            ${passivaTekInfo}
                            ${modificadoresFichaHTML}
                            ${arma.descricao ? `<div class="arma-descricao"><p>${arma.descricao}</p></div>` : ''}
                        </div>
                    </div>
                `;
            });
            
            armasCatalogoHtml += `</div></div>`;
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
                            <div class="attribute-value">${atributosComBonus.agi} ${classBonuses.stats.agi > 0 ? `<span class="class-bonus">(+${classBonuses.stats.agi})</span>` : ''}</div>
                        </div>
                    </div>
                    <div class="attribute-item">
                        <div class="attribute-icon"></div>
                        <div class="attribute-content">
                            <div class="attribute-name">Força</div>
                            <div class="attribute-value">${atributosComBonus.for} ${classBonuses.stats.for > 0 ? `<span class="class-bonus">(+${classBonuses.stats.for})</span>` : ''}</div>
                        </div>
                    </div>
                    <div class="attribute-item">
                        <div class="attribute-icon"></div>
                        <div class="attribute-content">
                            <div class="attribute-name">Inteligência</div>
                            <div class="attribute-value">${atributosComBonus.int} ${classBonuses.stats.int > 0 ? `<span class="class-bonus">(+${classBonuses.stats.int})</span>` : ''}</div>
                        </div>
                    </div>
                    <div class="attribute-item">
                        <div class="attribute-icon"></div>
                        <div class="attribute-content">
                            <div class="attribute-name">Sentidos</div>
                            <div class="attribute-value">${atributosComBonus.set} ${classBonuses.stats.set > 0 ? `<span class="class-bonus">(+${classBonuses.stats.set})</span>` : ''}</div>
                        </div>
                    </div>
                    <div class="attribute-item">
                        <div class="attribute-icon"></div>
                        <div class="attribute-content">
                            <div class="attribute-name">Vitalidade</div>
                            <div class="attribute-value">${atributosComBonus.vig} ${classBonuses.stats.vig > 0 ? `<span class="class-bonus">(+${classBonuses.stats.vig})</span>` : ''}</div>
                        </div>
                    </div>
                </div>
                
                <div class="stats-grid">
                    <div class="stat-item">
                        <div class="stat-icon"></div>
                        <div class="stat-content">
                            <div class="stat-value">${vida}</div>
                            <div class="stat-label">Vida Total ${classBonuses.stats.vida > 0 ? `<span class="class-bonus">(+${classBonuses.stats.vida})</span>` : ''}</div>
                        </div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-icon"></div>
                        <div class="stat-content">
                            <div class="stat-value">${determinacaoSanidade}</div>
                            <div class="stat-label">Determinação ${classBonuses.stats.determinacao > 0 ? `<span class="class-bonus">(+${classBonuses.stats.determinacao})</span>` : ''}</div>
                        </div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-icon"></div>
                        <div class="stat-content">
                            <div class="stat-value">${resistencia}</div>
                            <div class="stat-label">Resistência ${classBonuses.stats.resistencia > 0 ? `<span class="class-bonus">(+${classBonuses.stats.resistencia})</span>` : ''}</div>
                        </div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-icon"></div>
                        <div class="stat-content">
                            <div class="stat-value">${folego}</div>
                            <div class="stat-label">Fôlego ${classBonuses.stats.folego > 0 ? `<span class="class-bonus">(+${classBonuses.stats.folego})</span>` : ''}</div>
                        </div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-icon"></div>
                        <div class="stat-content">
                            <div class="stat-value">${armadura}</div>
                            <div class="stat-label">Armadura ${classBonuses.stats.armadura > 0 ? `<span class="class-bonus">(+${classBonuses.stats.armadura})</span>` : ''}</div>
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

            ${classBonuses.notes.length > 0 ? `
            <div class="ficha-section">
                <h4 class="section-title">Anotações das Classes</h4>
                <div class="class-notes">
                    ${classBonuses.notes.map(note => `<div class="class-note">${note}</div>`).join('')}
                </div>
            </div>
            ` : ''}

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

            ${armasCatalogoHtml}

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

        const copyButton = document.getElementById('copyFichaBtn');
        if (copyButton) {
            copyButton.style.display = 'flex';
            copyButton.disabled = false;
            copyButton.classList.add('pulse');
            copyButton.title = "Copia toda a ficha como texto formatado para colar em qualquer lugar";
            
            setTimeout(() => {
                copyButton.classList.remove('pulse');
            }, 5000);
        }
        
    } catch (error) {
        console.error('Erro em calculateStats:', error);
        alert('Erro ao calcular a ficha. Verifique o console para mais detalhes.');
        
        document.getElementById("results").style.display = "block";
        document.getElementById("stats").innerHTML = `
            <div class="error-message">
                <h3>Erro ao calcular ficha</h3>
                <p>${error.message}</p>
            </div>
        `;
    }
}

function updateClassBonusesFromForm() {
    const class1 = document.getElementById("class1").value;
    const class2 = document.getElementById("class2").value;
    
    applyClassBonus(class1, 'class1');
    applyClassBonus(class2, 'class2');
}

// ==============================================
// FUNÇÕES DE COLETA DE DADOS PARA EXPORTAÇÃO
// ==============================================

function collectCharacterDataForPDF() {
    // Atualizar bônus de classe
    updateClassBonusesFromForm();
    const classBonuses = calculateClassBonuses();
    
    // Coletar informações básicas
    const name = document.getElementById("name").value || "Personagem Sem Nome";
    const age = document.getElementById("age").value || "Não informado";
    const level = parseInt(document.getElementById("level").value) || 1;
    const photoSrc = document.getElementById("preview").src;
    const lore = document.getElementById("lore").value || "";
    const class1 = document.getElementById("class1").value || "Não selecionado";
    const class2 = document.getElementById("class2").value || "Não selecionado";
    const combatClass = document.getElementById("combatClass").value || "Não selecionado";
    const inventory = document.getElementById("inventory").value || "Nenhum item registrado";
    
    updateMutationsFromForm();
    
    // Calcular estatísticas com bônus de classe
    let vida = 55 + (attributes.vig * 15) + classBonuses.stats.vida;
    let determinacaoSanidade = 55 + (attributes.int * 10) + (attributes.set * 15) + classBonuses.stats.determinacao;
    let resistencia = 15 + (attributes.vig * 5) + classBonuses.stats.resistencia;
    let folego = 4 + (attributes.vig * 1) + classBonuses.stats.folego;
    let armadura = 5 + classBonuses.stats.armadura;
    
    // Bônus de nível
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
    
    fichaArmas = carregarArmasFicha();
    
    const levelRewards = getLevelRewards(level);
    const mutationRewards = getMutationRewards(level);
    const inventoryRewards = getInventoryRewards(level);
    
    return {
        name,
        age,
        level,
        photoSrc,
        lore,
        class1,
        class2,
        combatClass,
        inventory,
        attributes: { ...attributes },
        classBonuses: classBonuses,
        stats: {
            vida,
            determinacaoSanidade,
            resistencia,
            folego,
            armadura
        },
        actionBonuses: [...actionBonuses],
        learnedActionBonuses: [...learnedActionBonuses],
        weapons: [...weapons],
        fichaArmas: [...fichaArmas],
        characterRituals: [...characterRituals],
        characterMutations: [...characterMutations],
        levelRewards,
        mutationRewards,
        inventoryRewards,
        generatedDate: new Date().toLocaleString('pt-BR'),
        points: {
            totalAllowed: initialDistributablePoints + bonusPointsFromLevel,
            used: calculateCurrentDistributedPoints(),
            remaining: (initialDistributablePoints + bonusPointsFromLevel) - calculateCurrentDistributedPoints()
        }
    };
}

function getAttributeName(key) {
    const names = {
        'agi': 'AGILIDADE',
        'for': 'FORÇA',
        'int': 'INTELIGÊNCIA',
        'set': 'SENTIDOS',
        'vig': 'VITALIDADE'
    };
    return names[key] || key.toUpperCase();
}

function getLevelRewards(level) {
    const rewards = [];
    if (level >= 15) rewards.push(`+1 Ponto de Atributo`);
    if (level >= 30) rewards.push(`Mais slots para Bônus de Ação (Total de 12 slots)`);
    if (level >= 50) {
        rewards.push(`+30 de Vida`);
        rewards.push(`Mais slots para Bônus de Ação (Total de 15 slots) e possibilidade de bônus até +20`);
    }
    if (level >= 65) {
        rewards.push(`+20 de Sanidade`);
        rewards.push(`+1 Ponto de Atributo adicional`);
    }
    if (level >= 80) {
        rewards.push(`+10 Armadura padrão`);
        rewards.push(`Mais slots para Bônus de Ação (Total de 20 slots)`);
    }
    if (level >= 99) {
        rewards.push(`+10 Armadura padrão`);
        rewards.push(`+1 Ponto de Atributo adicional`);
        rewards.push(`Título: "Sobrevivente"`);
    }
    return rewards;
}

function getMutationRewards(level) {
    const rewards = [];
    if (level >= 65) rewards.push(`+1 Parte de Mutação (Revivendo Memória) - Mutação Primal evolui para Estágio 2`);
    if (level >= 95) rewards.push(`+1 Parte de Mutação (Conversa com o Infinito) - Mutação Primal evolui para Estágio 3`);
    if (level >= 99) rewards.push(`+1 Parte de Mutação (Último Incentivo Pessoal) - Mutação Primal evolui para Estágio 4`);
    return rewards;
}

function getInventoryRewards(level) {
    const rewards = [];
    if (level >= 50) {
        rewards.push('Convite da Linhagem de Athenas');
        rewards.push('1 Presente de Evento Global');
    }
    if (level >= 80) {
        rewards.push('1 Ritual Normal');
        rewards.push('1 Subida de Patente');
    }
    if (level >= 95) {
        rewards.push('Convite da Linhagem de Athenas');
    }
    return rewards;
}

function generateFichaID(name, level) {
    const timestamp = Date.now().toString(36);
    const nameCode = name.substring(0, 3).toUpperCase();
    const levelCode = level.toString().padStart(3, '0');
    return `ARK-${nameCode}-${levelCode}-${timestamp}`;
}

// ==============================================
// EXPORTAR FUNÇÕES PARA ESCOPO GLOBAL
// ==============================================

window.calculateStats = calculateStats;
window.collectCharacterDataForPDF = collectCharacterDataForPDF;
window.getLevelRewards = getLevelRewards;
window.getMutationRewards = getMutationRewards;
window.getInventoryRewards = getInventoryRewards;
window.generateFichaID = generateFichaID;
window.updateClassBonusesFromForm = updateClassBonusesFromForm;