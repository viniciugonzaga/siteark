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

 // ANIMAÇÃO INTERATIVA DA SANIDADE
        document.addEventListener('DOMContentLoaded', function() {
            const cards = document.querySelectorAll('.dificuldade-card');
            
            cards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    const fill = this.querySelector('.sanidade-fill');
                    if (fill) {
                        const currentWidth = parseFloat(fill.style.width);
                        fill.style.transition = 'width 0.3s ease';
                        fill.style.width = (currentWidth + 10) + '%';
                        
                        setTimeout(() => {
                            fill.style.width = currentWidth + '%';
                        }, 300);
                    }
                });

                // Efeito de clique para demonstrar o sistema
                card.addEventListener('click', function() {
                    const cardType = this.classList[1];
                    let message = '';
                    
                    switch(cardType) {
                        case 'normal':
                            message = ' Cena Normal: Recursos completos disponíveis';
                            break;
                        case 'diabolica':
                            message = ' Cena Diabólica: Sistema de esforço mental ativado';
                            break;
                        case 'caveira':
                            message = ' Cena da Caveira: Limiar da loucura - cuidado extremo!';
                            break;
                    }
                    
                    // Efeito visual de confirmação
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = 'translateY(-10px)';
                    }, 150);
                    
                    console.log(message);
                });
            });

            // Efeito de digitação no título
            const title = document.querySelector('.titulo_efeito');
            const originalText = title.textContent;
            title.textContent = '';
            
            let i = 0;
            function typeWriter() {
                if (i < originalText.length) {
                    title.textContent += originalText.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            }
            
            // Inicia a animação de digitação
            setTimeout(typeWriter, 1000);
        });

        // Dados completos das ações do RPG Ark
const actionsData = [
    // ========== DEFESAS ==========
    {
        name: "Esquiva",
        category: "defesas",
        type: "Reação",
        shortDesc: "Desviar de um ataque usando agilidade",
        fullDesc: "Uma defesa usada como reação em uma rodada usando a agilidade, desviando do ataque.",
        mechanics: "Teste de Agilidade contra o ataque do oponente. Sucesso total: esquiva completa. Sucesso parcial: dano reduzido pela metade. Falha: recebe dano normal.",
        notes: "Pode ser usada uma vez por rodada como reação. Requer pelo menos 1 ponto de movimento disponível."
    },
    {
        name: "Contra-ataque",
        category: "defesas",
        type: "Reação",
        shortDesc: "Desviar e contra-atacar",
        fullDesc: "Uma defesa usada como reação em uma rodada usando a força, desviando do ataque e causando dano com um ataque básico. Fracassar resulta receber dano crítico garantido.",
        mechanics: "Teste de Força contra ataque oponente. Sucesso: desvia e causa dano básico. Falha: recebe dano crítico com multiplicador aumentado.",
        notes: "Risco elevado, recompensa alta. Recomendado para personagens com alta Força e experiência em combate."
    },
    {
        name: "Bloqueio",
        category: "defesas",
        type: "Reação",
        shortDesc: "Bloquear completamente o ataque",
        fullDesc: "Uma defesa usada como reação em uma rodada usando vig, bloqueando completamente o ataque e reduzindo o dano.",
        mechanics: "Teste de Vigor para bloquear. Sucesso total: bloqueia completamente o ataque. Sucesso parcial: reduz dano baseado no Vigor (1 ponto de Vigor = 2 pontos de dano reduzido).",
        notes: "Particularmente eficaz contra ataques físicos diretos. Requer escudo ou arma adequada para bloquear."
    },
    {
        name: "Vontade",
        category: "defesas",
        type: "Passiva",
        shortDesc: "Defesa contra ataques mentais",
        fullDesc: "Uma defesa passiva sobre ataques mentais, medo ou controle mental pavoroso.",
        mechanics: "Resistência passiva a efeitos mentais. Teste de Vontade quando afetado por magias de medo, controle ou ilusão. CD = 10 + nível do conjurador.",
        notes: "Funciona mesmo quando o personagem está desprevenido. Pode ser usada para resistir a tentativas de possessão."
    },
    {
        name: "Fortitude",
        category: "defesas",
        type: "Passiva",
        shortDesc: "Resistência a efeitos negativos internos",
        fullDesc: "Uma defesa passiva sobre a resistência de efeitos negativos internos como sangramento, peste ou venenos que atacam dentro do sangue.",
        mechanics: "Resistência passiva a venenos, doenças e efeitos corporais. Teste de Constituição quando exposto. Reduz duração de efeitos em 1 rodada por ponto de Fortitude.",
        notes: "Imunidade a venenos comuns em níveis altos. Reduz chance de infecção por ferimentos."
    },

    // ========== COMBATE ==========
    {
        name: "Luta",
        category: "combate",
        type: "Padrão",
        shortDesc: "Golpes físicos em combate",
        fullDesc: "Uma ação padrão de luta ou golpes físicos.",
        mechanics: "Teste de Força ou Agilidade (escolha do mestre) para acertar golpes corpo-a-corpo. Dano baseado na arma + modificador de atributo.",
        notes: "Pode ser combinada com outras ações como Combo ou Fintar. Especializações em armas específicas concedem bônus."
    },
    {
        name: "Pontaria",
        category: "combate",
        type: "Padrão",
        shortDesc: "Precisão com armas à distância",
        fullDesc: "Uma ação padrão de Pontaria com arma e eficiência em precisão.",
        mechanics: "Teste de Destreza + Pontaria para acertar alvos à distância. Penalidades: -2 por alcance médio, -5 por alcance longo. Cobertura fornece CA bônus ao alvo.",
        notes: "Pode ser combinada com Mirar para bônus de precisão. Arcos, bestas e armas de fogo usam esta habilidade."
    },
    {
        name: "Arremesso",
        category: "combate",
        type: "Padrão",
        shortDesc: "Arremessar objetos com força",
        fullDesc: "Uma ação padrão de Pontaria porém com força, baseado em quanto distante você joga algo.",
        mechanics: "Teste de Força para determinar distância e precisão. Alcance base = Força x 1,5m. Dano baseado no objeto arremessado + modificador de Força.",
        notes: "Pode arremessar armas, pedras, granadas ou outros objetos. Personagens grandes têm alcance aumentado."
    },
    {
        name: "Iniciativa",
        category: "combate",
        type: "Padrão",
        shortDesc: "Quem age primeiro na rodada",
        fullDesc: "Uma ação padrão de quem começa a rodada primeiro.",
        mechanics: "Teste de Agilidade + Percepção para determinar ordem de ação no combate. Rolagem: 1d20 + modificador de Iniciativa.",
        notes: "Personagens com iniciativa alta podem agir antes dos inimigos. Surpresa concede vantagem na rolagem."
    },
    {
        name: "Combo",
        category: "combate",
        type: "Passiva",
        shortDesc: "Ataques em sequência rápida",
        fullDesc: "Uma ação passiva que libera um ataque de combate com combo.",
        mechanics: "Após um ataque bem-sucedido, pode realizar um ataque adicional com penalidade progressiva (-10 por ataque extra). Máximo de ataques = 1 ataque extra-> +5 em Combo.",
        notes: "Máximo de ataques igual a Força usada em combo para personagens normais. Monstros e chefes podem ter combos especiais."
    },
    {
        name: "Fintar",
        category: "combate",
        type: "Passiva",
        shortDesc: "Enganar oponente para abrir defesa",
        fullDesc: "Uma ação passiva que libera um ataque de combate com finta.",
        mechanics: "Teste de Enganação contra Percepção do alvo. Sucesso: próximo ataque causa 2x, enganando o alvo. Falha: o ataque normal ocorre, pórem perde -5 em Luta contra o oponente. O máximo de Fintas em uma rodada é igual o valor de peso no bônus. +5 = 1 Finta.",
        notes: "Particularmente eficaz contra inimigos com armadura pesada. Requer movimento livre para executar."
    },
    {
        name: "Reflexo",
        category: "combate",
        type: "Padrão",
        shortDesc: "Agilidade em situações perigosas",
        fullDesc: "Uma ação Padrão de Agilidade em qualquer ato.",
        mechanics: "Teste de Agilidade para evitar perigos repentinos: armadilhas, desabamentos, explosões. CD variável baseado na ameaça.",
        notes: "Pode ser usada como reação em algumas situações. Fracasso geralmente resulta em dano ou efeito negativo."
    },
    {
        name: "Mirar",
        category: "combate",
        type: "Passiva",
        shortDesc: "Foco para aumentar precisão",
        fullDesc: "Uma ação passiva de um ataque de Pontaria de combate.",
        mechanics: "Usar ação completa para mirar concede +5 no próximo ataque à distância. Pode mirar em partes específicas do corpo com penalidades/bônus.",
        notes: "Mírar na cabeça: -10 para acertar, dano crítico automático se acertar. Mírar nas pernas: -4, reduz movimento do alvo pela metade. O alcance máximo de Mirar é igual o peso do bônus usado. +5 = 9 metros."
    },
    {
        name: "Força bruta",
        category: "combate",
        type: "Padrão",
        shortDesc: "Usar força pura em ações",
        fullDesc: "Uma ação Padrão que usa como prática sua Força em ações.",
        mechanics: "Teste de Força para ações como arrombar portas (CD 15-25), levantar objetos pesados (peso = Força x 10kg), quebrar barreiras (dano = Força x 1d6).",
        notes: "Pode ser usada em combate para atordoar ou empurrar oponentes. Empurrar: teste oposto de Força, sucesso move alvo 1,5m ou mais escalando com a Força."
    },
    {
        name: "Acrobacia",
        category: "combate",
        type: "Reação/Padrão",
        shortDesc: "Movimentos ágeis para vantagem",
        fullDesc: "Uma ação de Reação, Padrão que usa como prática movimentar-se para ganhar vantagem contra o inimigo. Fornece redução de 1 dado de dano x sua agilidade contra os seus acertos em uma reação ou movimentação Narrativa.",
        mechanics: "Teste de Agilidade + Acrobacia. Sucesso: move-se sem provocar ataques de oportunidade, escala superfícies difíceis, ou reduz dano de queda em 1d6 por ponto de Acrobacia.",
        notes: "Permite passar por espaços ocupados por inimigos. Falha crítica pode resultar em queda ou provocar ataque de oportunidade."
    },
    {
        name: "Saltar",
        category: "combate",
        type: "Padrão/Reação",
        shortDesc: "Saltos distantes e altos",
        fullDesc: "Uma Ação Padrão e Reação de eficiência em um salto, aumentando distância e reduzindo danos de arma corpo a corpo em -2 dado x sua agilidade.",
        mechanics: "Distância do salto horizontal = resultado do teste / 5 (em metros). Salto vertical = resultado / 10 (em metros). Reduz dano corpo a corpo recebido em 2 x Agilidade.",
        notes: "Pode ser usado para evitar armadilhas no chão ou alcançar posições elevadas. Requer espaço para correr antes do salto."
    },
    {
        name: "Rolar",
        category: "combate",
        type: "Padrão/Reação",
        shortDesc: "Rolagem defensiva",
        fullDesc: "Uma Ação Padrão e Reação de eficiência em uma cambalhota, aumentando distância e reduzindo danos de armas de Pontaria em -2 dado x sua agilidade.",
        mechanics: "Move metade do movimento normal enquanto rola. Recebe +2 na CA contra ataques à distância durante a rolagem. Reduz dano de armas à distância em 2 x Agilidade.",
        notes: "Excelente para fechar distância com atiradores. Pode ser usada para evitar área de efeito (teste adicional necessário)."
    },
    {
        name: "Equilíbrio",
        category: "combate",
        type: "Padrão/Passiva/Reação",
        shortDesc: "Manter estabilidade em situações difíceis",
        fullDesc: "Uma Ação Padrão, Passiva ou Reação de tentar-se equilibrar, anulando desvantagens de movimento ou agarrar.",
        mechanics: "Teste de Agilidade + Equilíbrio. Sucesso: mantém pé em superfícies estreitas ou escorregadias, resiste a efeitos que derrubariam, escapa de agarramento.",
        notes: "Passiva: não precisa testar para superfícies moderadamente difíceis. Reação: usado quando empurrado ou derrubado."
    },
    {
        name: "Furtividade",
        category: "combate",
        type: "Padrão",
        shortDesc: "Esconder-se e mover silenciosamente",
        fullDesc: "Uma ação Padrão para se esconder e ganhar o efeito Furtivo. Receber um ataque ou atacar tira o efeito.",
        mechanics: "Teste de Agilidade + Furtividade contra Percepção do alvo. Sucesso: fica escondido, ataque surpresa com vantagem. Movimento reduzido pela metade enquanto furtivo.",
        notes: "Ataques furtivos causam dano adicional (1d6 extra por cada 5 pontos de Furtividade) ou ignoram parte da CA."
    },
    {
        name: "Intimidação",
        category: "combate",
        type: "Padrão",
        shortDesc: "Causar medo em oponentes",
        fullDesc: "Uma ação Padrão para causar medo contra um alvo ou provocando. Causando -5 em qualquer reação.",
        mechanics: "Teste de Intimidação (Carisma ou Força) contra Vontade do alvo. Sucesso: alvo fica amedrontado por 1 rodada (-5 em testes), ou recua 1,5m.",
        notes: "Pode ser usada como ação livre durante um ataque bem-sucedido. Efeito ampliado contra inimigos mais fracos ou feridos."
    },
    {
        name: "Agachar",
        category: "combate",
        type: "Padrão",
        shortDesc: "Reduzir perfil para evitar detecção",
        fullDesc: "Uma ação Padrão para diminuir o raio de detecção de inimigos, animais ou ter uma rapidez agachando.",
        mechanics: "Movimento reduzido para 1,5m (ou metade do normal). +5 na CA contra ataques à distância. -5 em testes de Percepção para detectá-lo.",
        notes: "Pode se mover enquanto agachado sem penalidade após o primeiro turno. Excelente para aproximação furtiva."
    },
    {
        name: "Atletismo",
        category: "combate",
        type: "Padrão",
        shortDesc: "Esforço físico sustentado",
        fullDesc: "Uma ação Padrão de correr ou ação de muito esforço físico, porém priorizando o fôlego.",
        mechanics: "Teste de Constituição + Atletismo para atividades prolongadas: correr longas distâncias, nadar contra corrente, escalar por minutos. Fadiga acumula após falhas consecutivas.",
        notes: "Cada 5 pontos em Atletismo aumenta o tempo antes da fadiga em 1 minuto. Personagens com baixa Constituição sofrem penalidades."
    },
    {
        name: "Correr",
        category: "combate",
        type: "Padrão",
        shortDesc: "Movimento rápido em combate",
        fullDesc: "Uma ação Padrão de correr, considerando o conceito mais importante de agilidade na corrida.",
        mechanics: "Movimento = velocidade base x 3 em linha reta. Provoca ataques de oportunidade de inimigos adjacentes. Teste de Agilidade para mudar de direção rapidamente.",
        notes: "Pode ser combinado com Acrobacia para evitar alguns ataques de oportunidade. Falha crítica pode resultar em queda."
    },
    {
        name: "Conjuração",
        category: "combate",
        type: "Padrão",
        shortDesc: "Canalizar energia para magias",
        fullDesc: "Uma ação Padrão em canalizar um esforço extra para realizar um teste somado no total de qualquer ritual ou canalização arcana que já tenha aprendido na ficha.",
        mechanics: "Teste de Inteligência (magia arcana) ou Sabedoria (magia divina) para conjurar. Magias de nível 1-3: ação padrão. Magias superiores: 1 rodada por nível.",
        notes: "Interrupção por dano exige teste de concentração (CD 10 + dano recebido). Componentes materiais podem ser necessários."
    },
    {
        name: "Manipulação de Elemento",
        category: "combate",
        type: "Padrão/Reação",
        shortDesc: "Controlar elementos naturais",
        fullDesc: "Uma ação ou reação Padrão para manipular qualquer elemento do arcano.",
        mechanics: "Teste de Inteligência + Manipulação de Elemento. Pode criar pequenas quantidades de elemento (fogo, água, terra, ar), controlar elementos existentes, ou fortalecer magias elementais.",
        notes: "Escalar aumenta volume e complexidade do controle. Especializações em elementos específicos concedem bônus."
    },
    {
        name: "Manipulação de elemento ESP",
        category: "combate",
        type: "Padrão/Reação",
        shortDesc: "Controlar elemento específico",
        fullDesc: "Uma ação ou reação de manipulação de algum elemento específico.",
        mechanics: "Como Manipulação de Elemento, mas com +5 no teste para o elemento específico (ex: fogo, gelo, eletricidade). Pode realizar proezas mais complexas com o elemento.",
        notes: "Personagem deve escolher elemento ao adquirir a habilidade. Mudança posterior requer treinamento extensivo."
    },
    {
        name: "Percepção",
        category: "combate",
        type: "Padrão/Passiva",
        shortDesc: "Detectar perigos e detalhes",
        fullDesc: "Uma ação Padrão ou Passiva para detectar inimigos ou ver o ambiente.",
        mechanics: "Teste de Sabedoria + Percepção. Passiva: detecta ameaças óbvias automaticamente. Ativa: busca ativa por detalhes, armadilhas ou inimigos ocultos.",
        notes: "Penalidades em condições de pouca luz, nevoeiro, ou distrações. Visão no escuro ou sentidos aguçados concedem bônus."
    },
    {
        name: "Percepção-Inimiga",
        category: "combate",
        type: "Padrão",
        shortDesc: "Analisar fraquezas do oponente",
        fullDesc: "Uma ação Padrão para analisar fraquezas do inimigo, ganhando uma informação extra sobre sua estrutura e Armadura/Vida.",
        mechanics: "Teste de Inteligência + Percepção-Inimiga contra CD baseada na raridade/força do inimigo. Sucesso revela: pontos fracos, resistências, imunidades, vida aproximada.",
        notes: "Cada 5 pontos acima da CD revela uma informação adicional. Falha crítica pode fornecer informação errada."
    },
    {
        name: "Percepção-Arcana",
        category: "combate",
        type: "Padrão/Passiva",
        shortDesc: "Detectar magias e entidades",
        fullDesc: "Uma ação Padrão ou Passiva para detectar entidades ou o ambiente pelo arcano em sua volta ou presença.",
        mechanics: "Teste de Inteligência + Percepção-Arcana. Detecta magias ativas, itens mágicos, portais, ou presenças sobrenaturais. Alcance: 30m + 3m por ponto.",
        notes: "Pode identificar escolas de magia com teste adicional. Entidades poderosas podem se esconder (teste oposto)."
    },
    {
        name: "Coragem",
        category: "combate",
        type: "Passiva",
        shortDesc: "Resistir a efeitos de medo",
        fullDesc: "Uma ação de Defesa passiva que contraria qualquer efeito de medo ou efeitos mentais.",
        mechanics: "Teste de Carisma + Coragem quando afetado por medo. Sucesso anula efeito. Sucesso por 5 ou mais concede imunidade ao mesmo efeito por 24h.",
        notes: "Aliados dentro de 3m ganham +2 em seus testes de medo. Personagens com alta Coragem podem inspirar outros."
    },
    {
        name: "Resiliência",
        category: "combate",
        type: "Passiva",
        shortDesc: "Bônus quando ferido",
        fullDesc: "Uma ação Passiva que fornece bônus quando está machucado/Metade da vida. Inicialmente fornece +5 em qualquer ação, ao escalar concede mais defesas na beira da Morte, aumentando o dano exigido em 20%. Aumentando a Porcentagem a cada +5 em 20%.",
        mechanics: "Ativa automaticamente quando vida ≤ 50%. Concede +5 em todos os testes. A cada 5 pontos em Resiliência: +20% ao dano necessário para morte instantânea.",
        notes: "Pode salvar o personagem de um golpe final. Combina bem com habilidades de regeneração ou vampirismo."
    },
    {
        name: "Voar",
        category: "combate",
        type: "Padrão",
        shortDesc: "Voo controlado",
        fullDesc: "Uma ação Padrão que concede o efeito Voando. Aumentar concede maior velocidade.",
        mechanics: "Velocidade de voo = velocidade terrestre. Manobra: teste de Agilidade + Voar. Altitude máxima = nível x 3m. Aumentar habilidade: +3m de velocidade por ponto.",
        notes: "Condições climáticas adversas penalizam testes. Dano em asas pode exigir teste para permanecer no ar."
    },
    {
        name: "Nadar",
        category: "combate",
        type: "Padrão",
        shortDesc: "Natação eficiente",
        fullDesc: "Uma ação Padrão que define o conceito de estar nadando ou boiando na água. Gastando fôlego e aumentando a velocidade ao escalar.",
        mechanics: "Velocidade de nado = metade da velocidade terrestre. Teste de Força + Nadar para nadar contra corrente ou em águas turbulentas. Fôlego: Constituição x 10 segundos.",
        notes: "Equipamento de natação concede bônus. Armaduras pesadas impõem penalidades ou impossibilitam nado."
    },
    {
        name: "Morder",
        category: "combate",
        type: "Padrão",
        shortDesc: "Ataque de mordida",
        fullDesc: "Uma ação Padrão de ataque de Mordida.",
        mechanics: "Ataque corpo-a-corpo. Dano: 1d6 + Força (médio), 1d4 + Força (pequeno), 1d8 + Força (grande). Pode causar sangramento (teste de Constituição para evitar).",
        notes: "Criaturas venenosas aplicam veneno na mordida. Algumas raças têm mordidas especiais (enferrujar metal, doença, etc.)."
    },
    {
        name: "Pancada",
        category: "combate",
        type: "Padrão",
        shortDesc: "Ataque com o corpo",
        fullDesc: "Uma ação Padrão de ataque de força bruta com o corpo.",
        mechanics: "Ataque corpo-a-corpo sem arma. Dano: 1d4 + Força (mãos), 1d6 + Força (cotovelos/joelhos). Pode atordoar (teste de Constituição CD 10 + dano).",
        notes: "Monstros grandes causam dano aumentado. Personagens desarmados podem usar esta habilidade sem penalidade."
    },
    {
        name: "Ataque de Cauda",
        category: "combate",
        type: "Padrão",
        shortDesc: "Ataque com cauda",
        fullDesc: "Uma ação Padrão atacando com a cauda.",
        mechanics: "Ataque corpo-a-corpo com alcance aumentado (3m). Dano: 1d8 + Força. Pode derrubar (teste oposto de Agilidade) ou agarrar (se a cauda for preênsil).",
        notes: "Dragões e criaturas com caudas especiais podem causar efeitos adicionais (envenenamento, eletricidade, etc.)."
    },
    {
        name: "Ataque de Garras",
        category: "combate",
        type: "Padrão",
        shortDesc: "Ataque com garras",
        fullDesc: "Uma ação Padrão atacando com as garras.",
        mechanics: "Ataque corpo-a-corpo. Dano: 1d6 + Força. Taxa de acerto aumentada (pode atacar duas vezes como ação padrão com penalidade -2). Causa sangramento em acertos críticos.",
        notes: "Algumas criaturas têm garras envenenadas ou mágicas. Personagens com transformações podem adquirir esta habilidade."
    },

    // ========== MECÂNICO ==========
    {
        name: "Adestramento",
        category: "mecanico",
        type: "Padrão",
        shortDesc: "Treinar animais",
        fullDesc: "Uma ação que resume em treinar um animal ou criar disciplina.",
        mechanics: "Teste de Sabedoria + Adestramento. Tempo: comandos básicos (1 semana), truques complexos (1 mês), combate (2 meses). CD baseada na ferocidade/independência do animal.",
        notes: "Animais treinados podem executar comandos em combate ou fora dele. Algumas raças são mais fáceis de treinar."
    },
    {
        name: "Domesticação",
        category: "mecanico",
        type: "Padrão",
        shortDesc: "Domesticar animais selvagens",
        fullDesc: "Uma ação que resume a domesticação, escalar garante Dados adicionais na rolagem. +5= 1D",
        mechanics: "Teste de Carisma + Domesticação. Cada +5 concede +1d6 na rolagem. Tempo prolongado (meses para domesticar completamente). Oferecer comida concede vantagem.",
        notes: "Criaturas mágicas ou inteligentes são mais difíceis. Falhas podem resultar em ataque ou fuga do animal."
    },
    {
        name: "Forjar",
        category: "mecanico",
        type: "Padrão",
        shortDesc: "Criar e reparar equipamentos",
        fullDesc: "Uma ação que resume criar ou reforjar uma arma. Além de consertar.",
        mechanics: "Teste de Inteligência + Forjar. Itens simples: CD 10, 1 dia. Itens complexos: CD 15-25, 1 semana. Armas mágicas: CD 30+, 1 mês + materiais raros.",
        notes: "Requer ferramentas apropriadas e forja. Qualidade do item depende do resultado: falha = item frágil, sucesso crítico = bônus permanente."
    },
    {
        name: "Religião",
        category: "mecanico",
        type: "Padrão",
        shortDesc: "Conhecimento e prática religiosa",
        fullDesc: "Uma ação que resume tentar pedir uma oportunidade vinda da fé. Diminuindo (DTS) pela sorte.",
        mechanics: "Teste de Sabedoria + Religião. Conhecimento sobre deuses, rituais, símbolos sagrados. Usar em oração: reduz DTS (Dificuldade do Teste de Sorte) em 1 por 5 pontos no teste.",
        notes: "Clérigos e paladinos têm vantagem. Conhecimento específico de uma religião concede bônus para testes relacionados."
    },
    {
        name: "Artes",
        category: "mecanico",
        type: "Padrão",
        shortDesc: "Habilidade artística",
        fullDesc: "Uma ação que resume qualquer ação artística e sua eficiência.",
        mechanics: "Teste de Destreza (artes manuais) ou Carisma (artes performáticas) + Artes. Qualidade da obra determina valor: obra-prima (30+), excelente (25-29), boa (20-24), medíocre (10-19).",
        notes: "Pode ser usada para falsificação, disfarce ou entretenimento. Obras excepcionais podem ter efeitos mágicos ou históricos."
    },
    {
        name: "Atualidades",
        category: "mecanico",
        type: "Padrão",
        shortDesc: "Conhecimento de eventos atuais",
        fullDesc: "Uma ação que resume buscar conhecimento de algo já visto em vida ou na vida passada. Além de tentar saber de algo novo.",
        mechanics: "Teste de Inteligência + Atualidades. Conhecimento sobre eventos recentes, pessoas importantes, rumores, política local. CD baseada na obscuridade da informação.",
        notes: "Personagens viajados ou com contatos têm vantagem. Informação desatualizada ou falsa pode ser obtida em falhas."
    },
    {
        name: "Investigação",
        category: "mecanico",
        type: "Padrão",
        shortDesc: "Buscar pistas e informações",
        fullDesc: "Uma ação que resume buscar conhecimento em uma cena por meio de pistas ou oportunidades.",
        mechanics: "Teste de Inteligência + Investigação. Examinar cena do crime, encontrar pistas escondidas, conectar informações. Tempo: 10 minutos por área de 3x3m.",
        notes: "Kit de investigação concede bônus. Cenas perturbadas ou antigas impõem penalidades. Sucesso crítico revela pista crucial."
    },
    {
        name: "Pilotagem",
        category: "mecanico",
        type: "Padrão",
        shortDesc: "Controlar veículos",
        fullDesc: "Uma ação que resume sua eficiência na pilotagem.",
        mechanics: "Teste de Destreza + Pilotagem. Veículos terrestres (CD 10-15), aéreos (CD 15-25), aquáticos (CD 10-20), espaciais/mágicos (CD 20-30). Manobras arriscadas aumentam CD.",
        notes: "Familiaridade com veículo específico concede vantagem. Danos no veículo impõem penalidades. Falha crítica pode causar acidente."
    },
    {
        name: "Sobrevivência",
        category: "mecanico",
        type: "Padrão",
        shortDesc: "Sobreviver na natureza",
        fullDesc: "Uma ação que resume sua sobrevivência em zonas difíceis.",
        mechanics: "Teste de Sabedoria + Sobrevivência. Encontrar comida/água (CD 10-20), construir abrigo (CD 15), navegar (CD 15), prever clima (CD 10). Terreno hostil aumenta CD.",
        notes: "Kit de sobrevivência concede bônus. Conhecimento específico do terreno (deserto, montanha, floresta) é necessário para áreas extremas."
    },
    {
        name: "Carisma",
        category: "mecanico",
        type: "Padrão/Passiva",
        shortDesc: "Habilidade social e persuasão",
        fullDesc: "Uma ação que resume a boa impressão com a aparência.",
        mechanics: "Teste de Carisma em interações sociais. Primeiras impressões, venda, sedução, liderança. Bônus baseado em aparência, roupas, reputação.",
        notes: "Pode ser usado passivamente para reações iniciais de NPCs. Raças ou classes com penalidades de Carisma podem compensar com outras habilidades."
    },
    {
        name: "Cozinhar",
        category: "mecanico",
        type: "Padrão",
        shortDesc: "Preparar alimentos",
        fullDesc: "Uma ação que resume eficiência em cozinhar.",
        mechanics: "Teste de Inteligência + Cozinhar. Refeição básica (CD 10), banquete (CD 20), prato exótico/mágico (CD 25+). Qualidade afeta benefícios: +1 temporário em atributo para comida excelente.",
        notes: "Ingredientes raros ou mágicos podem criar refeições com efeitos especiais. Falha crítica pode causar doença ou efeito negativo."
    },
    {
        name: "Focar",
        category: "mecanico",
        type: "Padrão",
        shortDesc: "Concentração intensa",
        fullDesc: "Uma ação que resume buscar uma pista específica em um enigma ou situação difícil.",
        mechanics: "Teste de Sabedoria + Focar. Ação completa para analisar um problema, quebra-cabeça ou situação complexa. +5 em próximo teste relacionado ao objeto de foco.",
        notes: "Pode ser usada para decifrar códigos, encontrar padrões, ou entender mecanismos complexos. Interrupções quebram o foco."
    },
    {
        name: "Lembrar",
        category: "mecanico",
        type: "Padrão",
        shortDesc: "Recuperar informações da memória",
        fullDesc: "Uma ação que resume buscar uma informação já citada em toda sua trajetória.",
        mechanics: "Teste de Inteligência + Lembrar. Recuperar detalhes de conversas passadas, lugares visitados, pessoas conhecidas, conhecimento estudado. CD baseada no tempo e importância.",
        notes: "Anotações ou diários concedem vantagem. Memória fotográfica (talentos ou magias) concede bônus significativo."
    },
    {
        name: "Sabedoria",
        category: "mecanico",
        type: "Padrão",
        shortDesc: "Conhecimento geral e bom senso",
        fullDesc: "Uma ação que resume buscar uma informação de sabedoria geral.",
        mechanics: "Teste de Sabedoria para conselhos, ética, previsão de consequências, julgamento de caráter. Não é conhecimento especializado, mas senso comum e experiência de vida.",
        notes: "Anciãos e personagens experientes têm bônus. Pode ser usado para evitar armadilhas sociais ou tomar decisões sábias."
    },
    {
        name: "Diplomacia",
        category: "mecanico",
        type: "Padrão",
        shortDesc: "Negociação e persuasão",
        fullDesc: "Uma ação que resume ajudar, acalmar ou convencer uma entidade a sua ideia.",
        mechanics: "Teste de Carisma + Diplomacia. Negociações, resolver disputas, convencer sem coerção. Modificadores baseados em relação inicial, ofertas, e contexto.",
        notes: "Requer tempo (minutos a horas). Falhas podem piorar a situação. Sucessos críticos podem criar aliados duradouros."
    },
    {
        name: "Enganação",
        category: "mecanico",
        type: "Padrão",
        shortDesc: "Mentir e ludibriar",
        fullDesc: "Uma ação que resume enganar uma entidade de forma social.",
        mechanics: "Teste de Carisma + Enganação contra Percepção ou Insight do alvo. Mentiras simples (CD 10), complexas (CD 15), improváveis (CD 20+). Disfarces usam Enganação + modificador.",
        notes: "Histórias consistentes e evidências falsas concedem bônus. Falha crítica pode revelar a verdade ou piorar a situação."
    },
    {
        name: "Medicina",
        category: "mecanico",
        type: "Padrão",
        shortDesc: "Cuidados médicos",
        fullDesc: "Uma ação que resume tratar um ferimento, doença ou tirar da beira da Morte com vida. +10 vida = +5",
        mechanics: "Teste de Inteligência + Medicina. Estabilizar morrendo (CD 15), tratar doença (CD varia), diagnóstico (CD 10-20). Cura: 1d8 + Medicina pontos de vida (10 minutos).",
        notes: "Kit médico necessário para melhores resultados. Condições anti-higiênicas impõem penalidades. Doenças mágicas requerem teste mais alto."
    },
    {
        name: "Conhecimento (Ciências)",
        category: "mecanico",
        type: "Padrão",
        shortDesc: "Conhecimento científico",
        fullDesc: "Uma ação que resume buscar informação específica de algumas das áreas, liberando testes e condições específicas.",
        mechanics: "Teste de Inteligência + Conhecimento. Áreas: alquimia, astronomia, biologia, física, matemática. CD baseada na obscuridade do conhecimento.",
        notes: "Personagem deve escolher especialização. Múltiplas especializações são possíveis com treinamento separado."
    },
    {
        name: "Conhecimento (Arte)",
        category: "mecanico",
        type: "Padrão",
        shortDesc: "Conhecimento artístico",
        fullDesc: "Uma ação que resume buscar informação específica de algumas das áreas, liberando testes e condições específicas.",
        mechanics: "Teste de Inteligência + Conhecimento. Áreas: história da arte, crítica, técnicas, artistas famosos, movimentos. Identificar período, autor ou valor de obra.",
        notes: "Útil para detectar falsificações, entender símbolos em artefatos, ou impressionar patronos."
    },
    {
        name: "Conhecimento (Mecânica)",
        category: "mecanico",
        type: "Padrão",
        shortDesc: "Conhecimento mecânico",
        fullDesc: "Uma ação que resume buscar informação específica de algumas das áreas, liberando testes e condições específicas.",
        mechanics: "Teste de Inteligência + Conhecimento. Máquinas, engenharia, arquitetura, dispositivos. Entender funcionamento, reparar, identificar fraquezas estruturais.",
        notes: "Essencial para personagens de steampunk ou ambientes com tecnologia avançada. Pode substituir Forjar para dispositivos complexos."
    },
    {
        name: "Conhecimento (Primordial)",
        category: "mecanico",
        type: "Padrão",
        shortDesc: "Conhecimento das origens",
        fullDesc: "Uma ação que resume buscar informação específica de algumas das áreas, liberando testes e condições específicas.",
        mechanics: "Teste de Inteligência + Conhecimento. Criação do mundo, deuses antigos, eras esquecidas, profecias, linguagens primordiais. Informação muitas vezes fragmentada ou proibida.",
        notes: "Bibliotecas antigas ou mentores são necessários para aprender. Conhecimento perigoso pode ter consequências mentais ou espirituais."
    },
    {
        name: "Conhecimento (Área Específica)",
        category: "mecanico",
        type: "Padrão",
        shortDesc: "Conhecimento especializado",
        fullDesc: "Uma ação que resume buscar informação específica de algumas das áreas, liberando testes e condições específicas.",
        mechanics: "Teste de Inteligência + Conhecimento. O jogador define a área (ex: heráldica, direito, culinária exótica, genealogia). Mestre determina CD baseada na relevância e obscuridade.",
        notes: "Áreas muito específicas podem ter uso limitado mas alto valor quando aplicável. Pode ser desenvolvida durante o jogo baseado na experiência do personagem."
    },
    {
        name: "Peso",
        category: "mecanico",
        type: "Passiva",
        shortDesc: "Capacidade de carga",
        fullDesc: "Uma ação que resume diminuir o peso consumido por armas e itens. servindo como +1D escalável por nivel ou aumento de Limite +2.",
        mechanics: "Capacidade de carga = Força x 7,5kg (leve), x 15kg (médio), x 22,5kg (pesado). Cada ponto em Peso aumenta esses multiplicadores em 0,5. Excesso reduz movimento e impõe penalidades.",
        notes: "Mochilas mágicas ou itens de armazenamento extradimensional ignoram estas limitações. Raças grandes têm multiplicadores base maiores."
    },
    {
        name: "Peso Arcano",
        category: "mecanico",
        type: "Padrão",
        shortDesc: "Controlar gravidade arcana",
        fullDesc: "Uma ação 'Devastadora' de controlar a gravidade ou aura do Arcano, sugando toda a aura criada de alguma entidade e trazendo para você. Recebe honra mecanicamente.",
        mechanics: "Teste de Inteligência + Peso Arcano (CD 25+). Alcance 30m. Efeito: reduz movimento do alvo pela metade, causa 2d6 dano por rodada, ou suga magias ativas (converte em pontos de magia). Custo alto em pontos de magia/recursos.",
        notes: "Considerada magia proibida em alguns reinos. Uso excessivo pode corromper o usuário ou atrair atenção indesejada."
    },
    {
        name: "Dormir",
        category: "mecanico",
        type: "Passiva",
        shortDesc: "Eficiência no descanso",
        fullDesc: "Uma ação que resume como é eficiente dormindo. Ganhando bônus de regeneração de Status. +5 = +2d8 de vida/Sanidade",
        mechanics: "Descanso curto (1 hora): recupera 1d8 + Dormir pontos de vida. Descanso longo (8 horas): recupera todos os pontos de vida + 2d8 + Dormir pontos adicionais. Sanidade recupera similarmente.",
        notes: "Condições de descanso (conforto, segurança, silêncio) afetam bônus. Insônia ou pesadelos podem anular benefícios."
    },
    {
        name: "Acasalamento",
        category: "mecanico",
        type: "Padrão",
        shortDesc: "Reprodução eficiente",
        fullDesc: "Uma ação que resume como é eficiente no acasalamento. Mecanicamente abre 1 slot de mutação extra para a Entidade gerada. Além de conceder maiores chances de gerar a vida. +5 = +1 no teste da Vida.",
        mechanics: "Teste de Carisma + Acasalamento. Sucesso garante prole. Cada +5 no teste concede: +1 no atributo da prole, mutação especial, ou redução no tempo de gestação. Falha crítica pode resultar em infertilidade temporária.",
        notes: "Raças diferentes podem ter dificuldades. Magias ou condições especiais podem modificar resultados. Geralmente usado em momentos de downtime."
    },
    {
        name: "Tática",
        category: "mecanico",
        type: "Padrão",
        shortDesc: "Planejamento estratégico",
        fullDesc: "Uma ação que resume buscar informações de vantagem em um lugar, zona ou descobrir vantagens do lugar.",
        mechanics: "Teste de Inteligência + Tática. Análise de terreno: identifica pontos altos, cobertura, rotas de fuga, armadilhas naturais. Tempo: 10 minutos por área de 30x30m. Bônus em Iniciativa ou ataques surpresa para aliados.",
        notes: "Mapas ou reconhecimento prévio concedem vantagem. Pode ser usado para planejar emboscadas ou defesas."
    },
    {
        name: "Construir",
        category: "mecanico",
        type: "Padrão",
        shortDesc: "Construção de estruturas",
        fullDesc: "Uma ação que resume a eficiência de construir.",
        mechanics: "Teste de Força ou Inteligência + Construir. Estruturas simples (cabana, cerca: CD 15, 1-3 dias). Estruturas complexas (forte, ponte: CD 20-30, semanas). Qualidade afeta durabilidade.",
        notes: "Requer materiais e ferramentas adequadas. Trabalhadores ajudantes reduzem tempo. Estruturas defensivas concedem bônus em combate."
    },

    // ========== TIPOS DE AÇÕES ==========
    {
        name: "Padrão",
        category: "tipos",
        type: "Padrão",
        shortDesc: "Ação principal em uma rodada",
        fullDesc: "Ação principal que um personagem pode realizar em seu turno.",
        mechanics: "Cada personagem tem uma ação padrão por turno. Pode ser usada para atacar, usar habilidade, conjurar magia, interagir com objeto, ou outras ações definidas.",
        notes: "Ação mais versátil, base da maioria das atividades em combate. Algumas habilidades especiais consomem ação padrão."
    },
    {
        name: "Frenética",
        category: "tipos",
        type: "Frenética",
        shortDesc: "Ação rápida e intensa",
        fullDesc: "Ação realizada com velocidade extrema, muitas vezes com penalidades para precisão.",
        mechanics: "Permite ações extras com penalidade (-5 no teste) ou ações mais rápidas que o normal. Pode ser usada para atacar duas vezes com penalidade, ou realizar ação padrão como ação livre uma vez por combate.",
        notes: "Útil em situações de emergência ou para pressionar oponentes. Uso excessivo pode causar fadiga."
    },
    {
        name: "Reação",
        category: "tipos",
        type: "Reação",
        shortDesc: "Resposta instantânea a estímulos",
        fullDesc: "Ação realizada em resposta a um evento, mesmo fora do próprio turno.",
        mechanics: "Pode ser usada uma vez por rodada para responder a ataques ou eventos específicos. Não consome ação padrão. Exemplos: Esquiva, Bloqueio, Contra-ataque.",
        notes: "Algumas classes ou talentos concedem reações adicionais. Reações geralmente têm condições específicas de ativação."
    },
    {
        name: "Passiva",
        category: "tipos",
        type: "Passiva",
        shortDesc: "Efeito contínuo ou automático",
        fullDesc: "Habilidade que funciona automaticamente sem necessidade de ação.",
        mechanics: "Funciona continuamente ou ativa automaticamente quando condições são atendidas. Não requer ação do jogador para funcionar. Exemplos: Vontade, Fortitude, Resiliência.",
        notes: "Passivas poderosas podem ter requisitos ou limitadores. Algumas podem ser desativadas temporariamente por certos efeitos."
    }
];

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.getElementById('actions-table-body');
    const modal = document.getElementById('action-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal, .btn-close-modal');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('action-search');
    
    // Preencher tabela com dados
    function populateTable(filter = 'all', searchTerm = '') {
        tableBody.innerHTML = '';
        
        const filteredActions = actionsData.filter(action => {
            const matchesFilter = filter === 'all' || action.category === filter;
            const matchesSearch = searchTerm === '' || 
                action.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                action.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                action.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                action.type.toLowerCase().includes(searchTerm.toLowerCase());
            
            return matchesFilter && matchesSearch;
        });
        
        // Ordenar ações por nome
        filteredActions.sort((a, b) => a.name.localeCompare(b.name));
        
        filteredActions.forEach(action => {
            const row = document.createElement('tr');
            row.setAttribute('data-action', action.name.toLowerCase().replace(/\s+/g, '-'));
            
            // Determinar classe da categoria
            let categoryClass = '';
            let categoryText = '';
            switch(action.category) {
                case 'defesas': 
                    categoryClass = 'category-defesas'; 
                    categoryText = 'DEFESAS';
                    break;
                case 'combate': 
                    categoryClass = 'category-combate'; 
                    categoryText = 'COMBATE';
                    break;
                case 'mecanico': 
                    categoryClass = 'category-mecanico'; 
                    categoryText = 'MECÂNICO';
                    break;
                case 'tipos': 
                    categoryClass = 'category-tipos'; 
                    categoryText = 'TIPOS';
                    break;
            }
            
            // Determinar classe do tipo
            let typeClass = '';
            switch(action.type) {
                case 'Padrão': typeClass = 'type-padrao'; break;
                case 'Frenética': typeClass = 'type-frenetica'; break;
                case 'Reação': typeClass = 'type-reacao'; break;
                case 'Passiva': typeClass = 'type-passiva'; break;
                case 'Padrão/Reação': typeClass = 'type-reacao'; break;
                case 'Padrão/Passiva': typeClass = 'type-passiva'; break;
                case 'Padrão/Passiva/Reação': typeClass = 'type-reacao'; break;
                case 'Reação/Padrão': typeClass = 'type-reacao'; break;
            }
            
            row.innerHTML = `
                <td class="col-name">${action.name}</td>
                <td class="col-category"><span class="category-badge ${categoryClass}">${categoryText}</span></td>
                <td class="col-type"><span class="type-badge ${typeClass}">${action.type}</span></td>
                <td class="col-description">${action.shortDesc}</td>
                <td class="col-details"><button class="details-btn" data-action="${action.name}">Detalhes</button></td>
            `;
            
            tableBody.appendChild(row);
        });
        
        // Adicionar event listeners para os botões de detalhes
        document.querySelectorAll('.details-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const actionName = this.getAttribute('data-action');
                openModal(actionName);
            });
        });
        
        // Adicionar event listeners para as linhas da tabela
        document.querySelectorAll('#actions-table-body tr').forEach(row => {
            row.addEventListener('click', function() {
                const actionName = this.querySelector('.col-name').textContent;
                openModal(actionName);
            });
        });
    }
    
    // Abrir modal com detalhes da ação
    function openModal(actionName) {
        const action = actionsData.find(a => a.name === actionName);
        if (!action) return;
        
        document.getElementById('modal-title').textContent = action.name;
        document.getElementById('modal-category').textContent = action.category.toUpperCase();
        document.getElementById('modal-type').textContent = action.type;
        document.getElementById('modal-description').textContent = action.fullDesc;
        
        const mechanicsContent = document.getElementById('modal-mechanics');
        mechanicsContent.innerHTML = `<p>${action.mechanics}</p>`;
        
        const notesContent = document.getElementById('modal-notes');
        notesContent.innerHTML = `<p>${action.notes}</p>`;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    // Fechar modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Event listeners para fechar modal
    if (closeModalBtns.length > 0) {
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', closeModal);
        });
    }
    
    // Fechar modal ao clicar fora
    window.addEventListener('click', function(e) {
        if (modal && e.target === modal) {
            closeModal();
        }
    });
    
    // Event listeners para filtros
    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remover classe active de todos os botões
                filterButtons.forEach(b => b.classList.remove('active'));
                // Adicionar classe active ao botão clicado
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                const searchTerm = searchInput ? searchInput.value : '';
                populateTable(filter, searchTerm);
            });
        });
    }
    
    // Event listener para busca
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const activeFilter = document.querySelector('.filter-btn.active');
            const filter = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
            populateTable(filter, this.value);
        });
    }
    
    // Popular tabela inicialmente se existir o elemento
    if (tableBody) {
        populateTable();
    }
    
    // Adicionar tecla ESC para fechar modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.style.display === 'block') {
            closeModal();
        }
    });
});

// Exportar dados para possível uso em outros arquivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { actionsData };
}