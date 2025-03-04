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

// ========================
// Footer dinâmico
// ========================
document.addEventListener("scroll", () => {
    const footer = document.querySelector("footer"); // Seleciona o rodapé

    // Se o usuário rolar até o fim da página
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
        footer.style.background = "linear-gradient(45deg,,#6b6a62a4,#857b7bad,#6b6a62a4)"; // Altera a cor do rodapé
    } else {
        footer.style.background = "linear-gradient(45deg,,#630909a4,#360404ad,#630909a4)"; // Mantém a cor padrão
    }
});
const effects = [
    { "name": "Envenenado", "img": "imagens/efeitos_icon1.jpg", "description": "Recebe dano interno por rodada, que pode variar e ignorar armadura, aplicando outras condições determinadas pelo veneno. Danos básicos: 1d8/3d8/6d8." },
    { "name": "Congelado", "img": "imagens/efeitos_icon2.jpg", "description": "Recebe dano interno, fica preso e perde 1 de Vigor caso falhe em um teste de Fortitude até se aquecer novamente. Danos básicos: 2d12/3d12/4d12." },
    { "name": "Em Chamas", "img": "imagens/efeitos_icon3.jpg", "description": "Recebe dano de fogo por rodada até apagar a origem com alguma das ações. Dano básico: 2d6/4d6/6d6." },
    { "name": "Sobrecarga", "img": "imagens/efeitos_icon4.jpg", "description": "Recebe dano elétrico acumulado por rodadas, causando 2d8 a cada 30 pontos de dano de origem elétrica. (Ótimos Condutores duplicam o dano)." },
    { "name": "Sangrando", "img": "imagens/efeitos_icon5.jpg", "description": "Recebe dano interno por grande liberação contínua de sangue e deixa mais rastros. Dano básico: 2d12/3d12/4d12." },
    { "name": "Agarrado", "img": "imagens/efeitos_icon6.jpg", "description": "O alvo recebe desvantagem em reações e perde 1 dado de Força e Agilidade nas rolagens enquanto estiver agarrado. (-5 + efeitos de ataque/habilidade/passiva)." },
    { "name": "Infectado", "img": "imagens/efeitos_icon7.jpg", "description": "O alvo contraiu uma doença ou vírus. (Os efeitos da desvantagem variam)." },
    { "name": "Exposto à Radiação", "img": "imagens/efeitos_icon8.jpg", "description": "O alvo está próximo ou interagindo com uma origem radioativa. Seus atributos serão alterados permanentemente conforme o tempo. Danos básicos: +20/+30/+40." },
    { "name": "Exposto ao Ácido", "img": "imagens/efeitos_icon9.jpg", "description": "O alvo está próximo ou interagindo com uma origem ácida, recebendo dano na armadura e na vida ao mesmo tempo até remover a origem. Danos básicos: 3d8+5 / 6d8+10 / 9d8+15." },
    { "name": "Corrompido", "img": "imagens/efeitos_icon10.jpg", "description": "O alvo está próximo ou interagindo com uma origem de Aether ou Elemento, recebendo dano na vida. Além disso, deve rolar 1d2: caso caia 1, recebe dano em dobro; caso caia 2, adquire uma habilidade desconhecida permanentemente. Danos básicos: 2d10/4d10/5d10." },
    { "name": "Lento/Lentidão", "img": "imagens/efeitos_icon11.jpg", "description": "O alvo recebe uma desvantagem de -5 em todos os testes de Agilidade e perde 1 ponto de Agilidade temporariamente." },
    { "name": "Intimidado", "img": "imagens/efeitos_icon12.jpg", "description": "O alvo intimidado sofre o primeiro ataque ou ação inimiga da rodada com +5 de acerto." },
    { "name": "Corajoso", "img": "imagens/efeitos_icon13.jpg", "description": "O alvo é imune a efeitos de medo ou controle mental durante a cena ou permanentemente." },
    { "name": "Ódio/Rage", "img": "imagens/efeitos_icon14.jpg", "description": "O alvo causa +2 dados de dano e recebe +5 em acertos de ataques, mas deve acertar um alvo por rodada ou cena até o efeito acabar. Duração básica: (1d4 + ficha)." },
    { "name": "Ágil", "img": "imagens/efeitos_icon15.jpg", "description": "O alvo recebe +1 em Agilidade e +5 em todas as ações que envolvem movimentação frenética. Duração básica: (1d4 + ficha)." },
    { "name": "Dilacerado", "img": "imagens/efeitos_icon16.jpg", "description": "O alvo sofre dano de sangramento interno e recebe apenas metade dos efeitos de cura. Caso esteja sendo engolido, sofre -5 em todos os testes de Força e Vigor até o efeito acabar." },
    { "name": "Furtivo", "img": "imagens/efeitos_icon17.jpg", "description": "O alvo se torna furtivo a ataques, ganhando +5 em reações e ataques furtivos até o efeito acabar. (+ficha)." },
    { "name": "Protegido", "img": "imagens/efeitos_icon18.jpg", "description": "O alvo fica protegido contra um determinado ataque, condição ou temperatura, recebendo menos dano ou se tornando imune até o efeito acabar." },
    { "name": "Rasgo de Vida", "img": "imagens/efeitos_icon19.jpg", "description": "O alvo pode causar dano físico e regenerar parte da vida conforme o dano do ataque. Rasgos básicos: (10%-20% + ficha)." },
    { "name": "Forte", "img": "imagens/efeitos_icon20.jpg", "description": "O alvo se torna ou se sente mais forte, ganhando +1 em Força e +5 em ações que envolvem Força ou Vigor. Duração básica: (1d4 + ficha)." },
    { "name": "Imobilizado", "img": "imagens/efeitos_icon21.jpg", "description": "O alvo não pode se mover ou realizar ações de movimento até o efeito acabar." },
    { "name": "Preparado", "img": "imagens/efeitos_icon22.jpg", "description": "O alvo prepara uma ação, ganhando +5 no teste dessa ação na próxima rodada. (+ficha)." },
    { "name": "Cego", "img": "imagens/efeitos_icon23.jpg", "description": "O alvo é incapaz de enxergar, sofrendo -1 em Percepção e -5 em testes de Percepção e reações. Duração básica: (1d4 + ficha)." },
    { "name": "Eficiente", "img": "imagens/efeitos_icon24.jpg", "description": "O alvo ganha +5 em testes de um determinado atributo de forma permanente ou durante a cena." },
    { "name": "Certeiro", "img": "imagens/icon_certeiro.jpg", "description": "O alvo mira no inimigo e recebe +5 no ataque, ganhando +1 dado de dano e examinando um ponto fraco ou de interesse por 1 rodada. (+ficha)." },
    { "name": "Fraco", "img": "imagens/icon_fraco.jpg", "description": "O alvo sofre -1 FOR, -5 em testes de Força ou Vigor, e causa menos dano físico, perdendo 2 dados de dano até o efeito acabar. (+ficha)" },
    { "name": "Sufocando", "img": "imagens/efeitos_icon27.jpg", "description": "O alvo perde 1 VIG por turno caso o fôlego esteja zerado. Após isso, sofre dano proporcional à vida ou torpor em dados. Danos ou torpor básicos: (Dano: 20% / Torpor: 2d8/3d8/5d8 + ficha)" },
    { "name": "Fadiga", "img": "imagens/icon_fadiga.jpg", "description": "O alvo sofre -1 AGI ou -1 INT, -5 em testes que envolvem Inteligência ou Agilidade. Se o fôlego estiver zerado, fica com as desvantagens de 'Sufocado (Sem Ar)'." },
    { "name": "Molestado", "img": "imagens/icon_molestado.jpg", "description": "O alvo recebe +5 nos ataques inimigos conforme o número do grupo adversário aumenta em relação ao seu grupo. (+ficha)" },
    { "name": "Paralisado", "img": "imagens/efeitos_icon30.jpg", "description": "O alvo sofre -5 em todos os testes de Reações, PRE e INT até o efeito acabar. Duração Básica: (+1d4 + ficha)" },
    { "name": "Atordoado", "img": "imagens/efeitos_icon31.jpg", "description": "O alvo sofre -5 em todos os testes por 1d4 rodadas e não pode agir na primeira rodada. A desvantagem persiste até o efeito acabar. (+ficha)" },
    { "name": "Inconsciente", "img": "imagens/efeitos_icon32.jpg", "description": "O alvo não pode agir por estar desacordado. Após 3 rodadas, pode tentar acordar com testes de VIG (DT: 25/20/15). (+ficha)" },
    { "name": "Flanqueado", "img": "imagens/efeitos_icon33.jpg", "description": "O alvo sofre +5 no próximo ataque inimigo por 1 rodada. (+ficha)" },
    { "name": "Afinidade", "img": "imagens/efeitos_icon34.jpg", "description": "Os afetados por essa condição possuem um laço sentimental ou familiar, aprimorando habilidades combinadas em grupo. (+ficha)" },
    { "name": "Estado Morrendo", "img": "imagens/efeitos_icon35.jpg", "description": "O alvo não pode agir e apenas rasteja no chão. Durante 3 rodadas, deve fazer testes de VIG para sobreviver. Se falhar, morre. (DT: 10, 15, 20) (+ficha)" },
    { "name": "Executado", "img": "imagens/efeitos_icon36.jpg", "description": "O alvo morre instantaneamente ou de forma lenta, afetando emocionalmente os que testemunham. Todos devem testar Vontade para evitar ficarem pasmos por 1 rodada." },
    { "name": "Explodido", "img": "imagens/efeitos_icon37.jpg", "description": "O alvo é completamente destruído, sem deixar vestígios ou restos, incluindo armas e equipamentos." },
    { "name": "Anti-Cura", "img": "imagens/efeitos_icon38.jpg", "description": "O alvo não pode receber cura até o efeito acabar. Duração Básica: (1d4 + ficha)" },
    { "name": "Abalado", "img": "imagens/efeitos_icon39.jpg", "description": "O alvo sofre -5 em todos os testes, -1 AGI, FOR, INT, PER e VIG, além de perder a guarda, todos os pontos de determinação e fé. Duração Básica: (1d2 + ficha)" },
    { "name": "Alheio", "img": "imagens/efeitos_icon40.jpg", "description": "O alvo não possui informações táticas ou de localização sobre a cena. (+ficha)" },
    { "name": "Desmontado", "img": "imagens/efeitos_icon41.jpg", "description": "O alvo é forçado a sair de sua montaria e fica atordoado por 1d2 rodadas. (+ficha)" },
    { "name": "Imune", "img": "imagens/efeitos_icon42.jpg", "description": "O alvo é imune ou já foi tão torturado que ignora metade do dano ou não reage à dor, de forma permanente ou durante a cena. (+ficha)" },
    { "name": "Desprevenido", "img": "imagens/efeitos_icon43.jpg", "description": "O alvo sofre desvantagens contra ataques furtivos ou flanqueados por 1 rodada. (+ficha)" },
    { "name": "Pasmo", "img": "imagens/efeitos_icon44.jpg", "description": "O alvo não pode reagir, agir, falar ou realizar qualquer ação por 1 rodada. (+ficha)" },
    { "name": "Exposto", "img": "imagens/efeitos_icon45.jpg", "description": "O alvo recebe o primeiro ataque inimigo com +10 no acerto e o dobro de dano. Duração Básica: (1d2 + ficha)" },
    { "name": "Revelado", "img": "imagens/icon_revelado.jpg", "description": "O alvo tem sua aura e localização reveladas para todos os inimigos na cena. (+ficha)" },
    { "name": "Dose de Adrenalina", "img": "imagens/efeitos_icon47.jpg", "description": "O alvo pode tentar ignorar danos mentais ou físicos com testes de resistência, além de usar dados de esforço até o efeito acabar. Duração Básica: (Cena + ficha)" },
    { "name": "Curado", "img": "imagens/efeitos_icon48.jpg", "description": "O alvo recebe um efeito de cura, podendo recuperar vida por rodada ou por cena. Duração Básica: (Cena / 1d4 rodadas + ficha)" },
    { "name": "Trocado", "img": "imagens/efeitos_icon49.jpg", "description": "O alvo troca todos os seus efeitos com outro alvo escolhido. O efeito persiste até acabar. Duração Básica: (1d4 rodadas + ficha)" },
    { "name": "Revigorado", "img": "imagens/efeitos_icon_revigorado.jpg", "description": "O alvo recebe uma bênção que remove todos os efeitos negativos. Duração Básica: (Cena + ficha)" },
    { "name": "Marcado", "img": "imagens/efeitos_icon51.jpg", "description": "O alvo é marcado na mira da arma, facilitando acertos e estimulando aliados. Todos ganham +5 no acerto. Duração Básica: (1d2 + ficha)" },
    { "name": "Diabólico", "img": "imagens/efeitos_icon52.jpg", "description": "O alvo vê a realidade de forma distorcida e perde empatia por sua tribo e aliados, ganhando +5 em ações egoístas, mas sofrendo -5 em diplomacia. Duração Básica: (1d2 + ficha)" },
    { "name": "Embriagado", "img": "imagens/efeitos_icon53.jpg", "description": "O alvo está confuso e tem dificuldades para pensar, sofrendo -1 dado em todos os testes e -5 em todas as rolagens. Duração Básica: (Cena / 1d6 + ficha)" },
    { "name": "Sabotado", "img": "imagens/efeitos_icon_sabotado.jpg", "description": "O alvo ou item foi sabotado e não funciona corretamente, sofrendo -5 em testes e podendo falhar completamente com 1d2. Duração Básica: (1d2 + ficha)" }
];  

function renderEffects() {
    const grid = document.getElementById("effectsGrid");
    grid.innerHTML = "";
    effects.forEach((effect, index) => {
        let effectDiv = document.createElement("div");
        effectDiv.classList.add("effect");
        effectDiv.innerHTML = `
            <img src="${effect.img}" alt="${effect.name}">
            <h3>${effect.name}</h3>
        `;
        effectDiv.onclick = () => openModal(effect);
        grid.appendChild(effectDiv);
    });
}

function openModal(effect) {
    document.getElementById("modalImg").src = effect.img;
    document.getElementById("modalTitle").innerText = effect.name;
    document.getElementById("modalDescription").innerText = effect.description;
    document.getElementById("modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

document.getElementById("search").addEventListener("input", function () {
    const searchValue = this.value.toLowerCase();
    document.querySelectorAll(".effect").forEach(effect => {
        const name = effect.querySelector("h3").innerText.toLowerCase();
        effect.style.display = name.includes(searchValue) ? "block" : "none";
    });
});

renderEffects();