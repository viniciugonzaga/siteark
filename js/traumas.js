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

 // DADOS COMPLETOS DOS EFEITOS DE ESTRESSE COM INFORMAÇÕES MECÂNICAS
        const efeitos = [
            {
                id: 1,
                nome: "ESTRESSADO",
                citacao: "“Quando tudo é ameaça, até o silêncio grita.”",
                descricao: "O corpo ainda luta, mas a mente já quebrou. O Estressado vive em constante estado de alerta, como se qualquer movimento ao redor fosse um ataque prestes a acontecer. Ele reage com raiva, impulsividade e descontrole, incapaz de distinguir aliados de inimigos durante uma explosão emocional.",
                mecanicas: [
                    "Não pode realizar Testes de Vontade sozinho (precisa de ajuda ou vantagem)",
                    "Efeitos de Rage têm duração para a cena inteira",
                    "Deve atacar qualquer alvo, amigo ou inimigo (perde escolha)",
                    "Se receber dano de um aliado, realiza Revide imediato contra ele",
                    "Efeitos de Relaxamento, Diplomacia ou Calmaria são anulados"
                ]
            },
            {
                id: 2,
                nome: "MEDROSO",
                citacao: "“Coragem é uma palavra que esqueceu o sabor.”",
                descricao: "O Medroso conhece o terror de perto — e nunca mais voltou o mesmo. Ele hesita até mesmo para respirar. Quando o caos o envolve, reage como um animal encurralado: recua, treme, implora em silêncio.",
                mecanicas: [
                    "Age sempre por último, depois de todos os aliados",
                    "Em cenas de Furtividade ou Caos, sofre –5 em Coragem, Intimidação e Vontade",
                    "Efeitos de Determinação, Coragem ou Inspiração são anulados",
                    "Fica sempre atrás, observando o inevitável"
                ]
            },
            {
                id: 3,
                nome: "GANANCIOSO",
                citacao: "“Nada é mais importante do que aquilo que é meu.”",
                descricao: "O Ganancioso não teme a morte — teme perder o que conquistou. Seus olhos brilham mais por metal do que por pessoas. Cada arma, cada item, cada criatura domesticada não é ferramenta, é identidade.",
                mecanicas: [
                    "Obcecado por armas, itens e criaturas próprias; perder ou quebrar algo gera colapso",
                    "Ao perder itens ou falhar em Mutação, sofre –10 em Vontade, Bloqueio e Contra-Ataque",
                    "Causa –4 dados de dano em armas corpo a corpo, por medo de quebrá-las",
                    "Buffs de Aliados e efeitos de 'Marcado' em Inimigos são ignorados"
                ]
            },
            {
                id: 4,
                nome: "PARANOICO",
                citacao: "“Quando tudo pode matar… nada é confiável.”",
                descricao: "O Paranoico vive entre dois mundos: o real e aquele que sua mente distorce. Cada ruído é um inimigo. Cada olhar, uma ameaça. Ele vê emboscadas onde há silêncio, enxerga códigos em gestos banais.",
                mecanicas: [
                    "Vê inimigos e perigos que não existem (ilusões)",
                    "Mutações que usam Magia causam –3 dados de dano",
                    "Utilizar magia Arcana gera Fadiga automática",
                    "Buffs mágicos ou de Mutação não afetam este alvo em combate"
                ]
            },
            {
                id: 5,
                nome: "EGOÍSTA",
                citacao: "“Se eu não sobreviver, ninguém merece.”",
                descricao: "O Egoísta conhece apenas uma lei: eu primeiro. Ele se recusa a dividir cura, poder ou glória. No campo de batalha, busca destaque, não vitória.",
                mecanicas: [
                    "Em Testes de Grupo (Percepção, Diplomacia, Fuga), apenas o dado dele conta como o maior",
                    "Prioriza sempre sua própria cura",
                    "Se ver aliado se curando, sofre –10 em Luta, Contra-Ataque, Esquiva e Bloqueio",
                    "Buffs que ele recebe não afetam a equipe (são nulos ao redor)"
                ]
            },
            {
                id: 6,
                nome: "ESTRESSE PÓS-TRAUMÁTICO",
                citacao: "“O passado não acabou… ele continua acontecendo.”",
                descricao: "Para o Pós-Traumático, o tempo é uma espiral. O que aconteceu uma vez, acontece todas as noites de novo. Em sonho, em silêncio, em respirações curtas.",
                mecanicas: [
                    "Recuperação natural de Status pela metade ao descansar",
                    "Sempre que dorme, chance de Pesadelo Vivo (luta mental com monstros de trauma)",
                    "Buffs Mentais, Inspiração ou Esperança são anulados",
                    "Vê inimigos com faces que já morreram"
                ]
            },
            {
                id: 7,
                nome: "INSANO",
                citacao: "“Quem disse que estou errado, se eu vejo além?”",
                descricao: "O Insano já partiu. O corpo ainda luta, mas a consciência viajou para lugares sem nome. Ele murmura frases sem sentido, mas às vezes essas frases parecem profecias.",
                mecanicas: [
                    "Em Enigmas, Colossos ou Cenas Complexas, recebe –10 em Inteligência",
                    "Não consegue usar Rituais por parte do dia (mente travada em vozes ancestrais)",
                    "Buffs em si ou em aliados têm –10 de eficiência OU –4 dados de dano",
                    "Age de forma imprevisível, sem lógica aparente"
                ]
            },
            {
                id: 8,
                nome: "DESESPERADO",
                citacao: "“Não tem saída… não tem saída… não tem…”",
                descricao: "A mente do Desesperado desistiu antes do corpo. Qualquer ataque contra ele é um fim possível. Espera sempre o pior. Vê inimigos invencíveis, sente dores que ainda não aconteceram.",
                mecanicas: [
                    "Ao ser atacado primeiro ou com diferença de +5 bônus, recebe Exposto",
                    "Velocidade, Acertos e Contra-Ataques são anulados",
                    "Perde qualquer instinto de sobrevivência tática",
                    "Aceita o golpe, não bloqueia, não reage"
                ]
            },
            {
                id: 9,
                nome: "LETÁRGICO",
                citacao: "“Continuo vivo… mas não sei por quê.”",
                descricao: "O Letárgico não chora, não grita. Apenas existe. Reage ao mundo com passos arrastados e olhar vazio. Não sente medo — porque não sente mais nada.",
                mecanicas: [
                    "Sempre atua por último, ignorando iniciativas ou alertas",
                    "Cura, Poções ou Estimulantes em si têm 50% de chance de falhar",
                    "Ao ver aliados lutando ou sangrando, perde 1 dado de ataque (indiferença)",
                    "Não pode iniciar ataques – apenas reage",
                    "A mente desistiu antes do corpo"
                ]
            },
            {
                id: 10,
                nome: "FANÁTICO",
                citacao: "“Eu ouvi o chamado. Vocês não.”",
                descricao: "O Fanático acredita servir a algo maior. Não importa se é um deus, um símbolo ou uma fera — ele obedece. Escolhe um alvo e transforma essa existência em uma missão sagrada.",
                mecanicas: [
                    "Transforma dor em fé distorcida",
                    "Escolhe um alvo (inimigo ou aliado) e jura eliminá-lo ou segui-lo até a morte",
                    "Causa +2 dados de dano apenas nesse alvo, mas –4 dados contra qualquer outro",
                    "Ignora ordens, rolagens sociais e táticas do grupo",
                    "Se o 'jurado' morrer, entra em Rage (sem controle)"
                ]
            },
            {
                id: 11,
                nome: "DEGENERADO",
                citacao: "“Cada ferida me lembra que estou vivo.”",
                descricao: "O Degenerado não teme a dor — venera. Cada golpe que recebe deixa um rastro de êxtase. Ele força sua carne ao limite, recusa cura, procura feridas.",
                mecanicas: [
                    "Tudo vira dor, mesmo prazer",
                    "Recebe sempre +1 dado de dano por rodada (autodestruição)",
                    "Sempre que matar alguém, sofre 1 nível de estresse extra",
                    "Não pode ser alvo de Cura Completa — apenas curas parciais",
                    "Se for curado acima de 50%, entra em estado de automutilação"
                ]
            },
            {
                id: 12,
                nome: "OBSESSIVO",
                citacao: "“Se não for perfeito, não vale.”",
                descricao: "O Obsessivo é escravo de uma regra invisível. Um gesto, uma arma, um ritual — algo se fixou em sua mente, e agora isso é lei.",
                mecanicas: [
                    "Algo precisa estar perfeito — ou tudo está errado",
                    "Escolhe um ritual, arma ou mutação e só usa aquilo; qualquer outro recurso é recusado",
                    "Ao perder ou ficar sem seu objeto/ritual, recebe –15 em Vontade e Inteligência",
                    "Reage com pânico se alguém tocar no que é 'dele'",
                    "Buffs de aliados só funcionam se forem do tipo escolhido"
                ]
            },
            {
                id: 13,
                nome: "SILENCIOSO",
                citacao: "“Se eu falar… eles escutam.”",
                descricao: "Ele decidiu calar. Não por timidez, mas por proteção. Algo o persegue pelo som, e agora ele teme a própria voz.",
                mecanicas: [
                    "Fala apenas com as vozes internas",
                    "Não pode comunicar planos, gritar ou interagir socialmente em combate",
                    "Aliados não podem usar ajuda, empatia ou liderança nele",
                    "Não pode pedir socorro — curas devem ser adivinhadas",
                    "Ganha vantagem em Furtividade, mas perde em Coordenação de Grupo"
                ]
            },
            {
                id: 14,
                nome: "DELIRANTE",
                citacao: "“Vocês não veem? Eles estão aqui.”",
                descricao: "Para o Delirante, a realidade se mistura com pesadelos. Ele conversa com sombras, ataca o vazio, acredita em emboscadas de criaturas invisíveis.",
                mecanicas: [
                    "Sua realidade é uma mentira... mas ele acredita nela",
                    "Ganha inimigos imaginários: uma vez por combate, ataca o vazio (perde turno)",
                    "Tem 30% de chance de atacar aliados achando serem monstros",
                    "Testes de sanidade custam o dobro",
                    "Se alguém tentar acordá-lo ou curá-lo, ele resiste ou revida"
                ]
            },
            {
                id: 15,
                nome: "REDENTOR SOMBRIO",
                citacao: "“Não tema… a dor vai libertar você.”",
                descricao: "Ele acredita que a dor purifica. Ao ver um aliado caído, não corre para curar — corre para terminar o trabalho.",
                mecanicas: [
                    "Acredita que deve punir para salvar",
                    "Sempre que um aliado cair a 0 HP, ele tenta sacrificá-lo ('Purificação')",
                    "Recusa Buffs de Defesa, mas aceita Buffs de Dano",
                    "Cura convertida em dano divino contra qualquer alvo próximo",
                    "Se impedido, sofre ataque cardíaco espiritual (–20 HP)"
                ]
            },
           
        ];

        // VARIÁVEIS GLOBAIS
        let efeitoAtual = null;

        // INICIALIZAÇÃO
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Inicializando sistema de efeitos...');
            inicializarListaEfeitos();
            inicializarGridEfeitos();
            console.log('Sistema inicializado com ' + efeitos.length + ' efeitos');
        });

        // INICIALIZAR LISTA DE EFEITOS
        function inicializarListaEfeitos() {
            const lista = document.getElementById('listaEfeitos');
            
            if (!lista) {
                console.error('Elemento listaEfeitos não encontrado!');
                return;
            }
            
            console.log('Criando lista com ' + efeitos.length + ' itens');
            
            efeitos.forEach((efeito, index) => {
                const item = document.createElement('div');
                item.className = 'efeito-item';
                item.dataset.id = efeito.id;
                
                item.innerHTML = `
                    <div class="efeito-header">
                        <div class="efeito-numero">${efeito.id}</div>
                        <h3 class="efeito-nome">${efeito.nome}</h3>
                    </div>
                    <div class="efeito-citacao">${efeito.citacao}</div>
                    <div class="efeito-descricao">${efeito.descricao}</div>
                    ${efeito.mecanicas ? `
                    <div class="efeito-mecanicas">
                        <h4>Efeitos Mecânicos:</h4>
                        <ul>
                            ${efeito.mecanicas.map(mecanica => `<li>${mecanica}</li>`).join('')}
                        </ul>
                    </div>
                    ` : ''}
                `;
                
                item.addEventListener('click', function() {
                    mostrarDetalheEfeito(efeito.id);
                });
                
                lista.appendChild(item);
            });
            
            console.log('Lista criada com sucesso');
        }

        // INICIALIZAR GRID DE EFEITOS
        function inicializarGridEfeitos() {
            const grid = document.getElementById('gridEfeitos');
            
            if (!grid) {
                console.error('Elemento gridEfeitos não encontrado!');
                return;
            }
            
            console.log('Criando grid com ' + efeitos.length + ' miniaturas');
            
            efeitos.forEach((efeito, index) => {
                const miniatura = document.createElement('div');
                miniatura.className = 'efeito-miniatura';
                miniatura.dataset.id = efeito.id;
                
                miniatura.innerHTML = `
                    <h4>${efeito.nome}</h4>
                    <div class="citacao-mini">${efeito.citacao}</div>
                    ${efeito.mecanicas ? `
                    <div class="mecanicas-mini">
                        <strong>Mecânicas:</strong>
                        <div class="mecanicas-lista">
                            ${efeito.mecanicas.slice(0, 2).map(mecanica => `<span>• ${mecanica}</span>`).join('')}
                            ${efeito.mecanicas.length > 2 ? `<span class="mais-mecanicas">+${efeito.mecanicas.length - 2} mais...</span>` : ''}
                        </div>
                    </div>
                    ` : ''}
                `;
                
                miniatura.addEventListener('click', function() {
                    mostrarDetalheEfeito(efeito.id);
                    document.getElementById('detalheEfeito').scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                });
                
                grid.appendChild(miniatura);
            });
            
            console.log('Grid criado com sucesso');
        }

        // MOSTRAR DETALHES DO EFEITO
        function mostrarDetalheEfeito(id) {
            const efeito = efeitos.find(e => e.id === id);
            
            if (!efeito) {
                console.error('Efeito com ID ' + id + ' não encontrado!');
                return;
            }
            
            efeitoAtual = efeito;
            const detalhe = document.getElementById('detalheEfeito');
            
            if (!detalhe) {
                console.error('Elemento detalheEfeito não encontrado!');
                return;
            }
            
            detalhe.innerHTML = `
                <h2>${efeito.nome}</h2>
                <div class="citacao">${efeito.citacao}</div>
                <div class="descricao">${efeito.descricao}</div>
                ${efeito.mecanicas ? `
                <div class="mecanicas-detalhadas">
                    <h3>Efeitos Mecânicos</h3>
                    <div class="mecanicas-lista-detalhes">
                        ${efeito.mecanicas.map((mecanica, index) => `
                            <div class="mecanica-item">
                                <span class="mecanica-numero">${index + 1}</span>
                                <span class="mecanica-texto">${mecanica}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
            `;
            
            // Remover classe ativa de todos os itens
            document.querySelectorAll('.efeito-item, .efeito-miniatura').forEach(item => {
                item.classList.remove('ativo');
            });
            
            // Adicionar classe ativa aos itens correspondentes
            document.querySelectorAll(`[data-id="${id}"]`).forEach(item => {
                item.classList.add('ativo');
            });
            
            detalhe.classList.add('ativo');
            
            console.log('Detalhes do efeito ' + efeito.nome + ' exibidos');
        }

        // FUNÇÃO PARA FILTRAR EFEITOS (OPCIONAL)
        function filtrarEfeitos(termo) {
            const itens = document.querySelectorAll('.efeito-item, .efeito-miniatura');
            const termoLower = termo.toLowerCase();
            
            itens.forEach(item => {
                const texto = item.textContent.toLowerCase();
                if (texto.includes(termoLower)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }

        // FUNÇÃO PARA MOSTRAR TODOS OS EFEITOS
        function mostrarTodosEfeitos() {
            document.querySelectorAll('.efeito-item, .efeito-miniatura').forEach(item => {
                item.style.display = 'block';
            });
        }

        // NAVEGAÇÃO POR TECLADO
        document.addEventListener('keydown', function(e) {
            if (!efeitoAtual) return;
            
            const currentIndex = efeitos.findIndex(e => e.id === efeitoAtual.id);
            
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                const nextIndex = (currentIndex + 1) % efeitos.length;
                mostrarDetalheEfeito(efeitos[nextIndex].id);
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                const prevIndex = (currentIndex - 1 + efeitos.length) % efeitos.length;
                mostrarDetalheEfeito(efeitos[prevIndex].id);
            }
        });

        // DEBUG
        setTimeout(() => {
            const itensLista = document.querySelectorAll('.efeito-item');
            const itensGrid = document.querySelectorAll('.efeito-miniatura');
            
            console.log('DEBUG - Itens criados:');
            console.log('- Lista: ' + itensLista.length + ' itens');
            console.log('- Grid: ' + itensGrid.length + ' itens');
            console.log('- Total esperado: ' + (efeitos.length * 2) + ' itens');
            
            if (itensLista.length === efeitos.length && itensGrid.length === efeitos.length) {
                console.log('✅ Todos os elementos foram criados corretamente!');
            } else {
                console.error('❌ Problema na criação dos elementos!');
            }
        }, 1000);