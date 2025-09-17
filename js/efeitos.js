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
  const efeitos = [
  {
    nome: "Sangramento",
    dano: "1d12 Sangramento",
    defesa: "Medicina ou Fortitude",
    status: "Sangrando",
    acumulo: "Sim",
    icon: "../imagens/Icon_sangue.png",
    descricao: "O alvo sofre ferimentos contínuos e perde vitalidade gradualmente, representado por dano recorrente. O efeito se acumula caso múltiplos golpes agravem os cortes. Só pode ser encerrado com tratamento adequado ou superação extrema da dor através de testes físicos ou médicos."
  },
  {
    nome: "Envenenado",
    dano: "2d6 Peste",
    defesa: "Medicina ou Resistência",
    status: "Com Peste",
    acumulo: "Sim",
    icon: "../imagens/icon_peste.png",
    descricao: "O corpo do alvo é contaminado por toxinas, doenças ou venenos, causando dano de peste a cada rodada. O veneno pode se acumular, agravando os sintomas até o colapso total, a menos que seja tratado ou vencido por resistência interna."
  },
  {
    nome: "Queimado",
    dano: "3d6 Fogo",
    defesa: "Agachar ou Reflexo",
    status: "Em chamas",
    acumulo: "Sim",
    icon: "../imagens/icon_fogo.png",
    descricao: "O alvo é envolto em chamas ou calor extremo, sofrendo dano progressivo enquanto estiver em combustão. O efeito se acumula com novas fontes de fogo e só é removido ao apagar completamente a origem das chamas ou usar ações específicas de proteção."
  },
  {
    nome: "Atordoado",
    dano: "Dano da Arma",
    defesa: "Defesa inimiga",
    status: "Em Stun (1 rodada)",
    acumulo: "Não",
    icon: "../imagens/icon_stun.png",
    descricao: "O alvo sofre uma forte interrupção sensorial — como pancadas na cabeça ou impactos repentinos — perdendo a capacidade de agir durante sua vez (1 rodada). Apesar disso, ainda é capaz de se defender. Após passar o efeito, recupera suas ações normalmente."
  },
  {
    nome: "Vulnerável",
    dano: "Dano da Arma (Raio)",
    defesa: "Defesa inimiga ou Fortitude",
    status: "-5 defesas físicas",
    acumulo: "Sim",
    icon: "../imagens/icon_vulneravel.png",
    descricao: "O alvo é pego desprevenido, com brechas em sua postura ou armadura, sofrendo -5 em defesas físicas. O efeito pode se acumular e permanece até que a criatura resista com sucesso ou recupere o controle do próprio corpo e mente."
  },
  {
    nome: "Amedrontado",
    dano: "Estresse",
    defesa: "Vontade",
    status: "Com Medo",
    acumulo: "Não",
    icon: "../imagens/icon_medo.png",
    descricao: "O medo domina o alvo, provocando dano de estresse a cada instante. Esse estado mental frágil persiste até que ele reúna vontade o suficiente para resistir ou anular completamente os danos sofridos. Ao conseguir isso, o efeito é imediatamente dissipado."
  },
  {
    nome: "Agarrado",
    dano: "Dano da Arma",
    defesa: "Defesa do Inimigo",
    status: "Agarrado",
    acumulo: "Sim",
    icon: "../imagens/icon_agarrado.png",
    descricao: "O alvo é dominado fisicamente, sofrendo -3 em todos os testes de defesa. Se o inimigo for maior em tamanho, o redutor é de -5. O efeito é acumulativo. Se o alvo vencer um único teste de defesa contra um dos inimigos que o agarra, ele se liberta de todos. O inimigo pode arrastar o alvo com base em sua força."
  },
  {
    nome: "Marcado",
    dano: "Arma",
    defesa: "Defesa do inimigo",
    status: "Marcado",
    acumulo: "Não",
    icon: "../imagens/icon_marcado.png",
    descricao: "Uma marca visível ou energética é colocada sobre o alvo, tornando-o um foco claro no campo de batalha. O próximo ataque contra ele recebe +5 no acerto e é considerado crítico automático. Após esse ataque, a marca desaparece."
  },
  {
    nome: "Fortalecido",
    dano: "Buff",
    defesa: "Nulo",
    status: "Buff Ativo",
    acumulo: "Sim",
    icon: "../imagens/icon_forte.png",
    descricao: "O corpo ou mente do alvo é envolto por uma energia amplificadora ligada à sua origem. Ganha vantagens relacionadas à sua classe, linhagem ou condição especial. O efeito dura até que o tempo da habilidade acabe ou a fonte da vantagem se dissipe."
  },
  
  {
    nome: "Enfraquecido",
    dano: "Normal",
    defesa: "Defesa do inimigo",
    status: "Fraco",
    acumulo: "Sim",
    icon: "../imagens/icon_enfraquecido.png",
    descricao: "O alvo está mentalmente ou fisicamente debilitado, sofrendo penalidades e dano se falhar em resistir. Caso não suporte o efeito, ele permanece ativo por um número de rodadas conforme indicado na habilidade ou ataque que o causou. Depois disso, é encerrado."
  },
  {
    nome: "Revide",
    dano: "Dano da Arma",
    defesa: "Defesa do atacante",
    status: "Em Revide", 
    acumulo: "Não",
    icon: "../imagens/icon_revide.png",
    descricao: "O alvo se prepara para um contra-ataque implacável. Quando atingido por um ataque, ele automaticamente retalia com um golpe certeiro que não pode ser defendido. Esse contra-ataque ocorre imediatamente após o dano recebido e consome o efeito após ser executado. Ideal para guerreiros que esperam o momento perfeito para devolver o golpe."
  },
  {
    nome: "Imobilizado",
    dano: "Efeito",
    defesa: "Reflexo ou Contra-ataque",
    status: "Enraizado",
    acumulo: "Não",
    icon: "../imagens/icon_enraizado.png",
    descricao: "O alvo está preso por raízes, correntes ou impedimentos sobrenaturais, incapaz de se mover. Ele pode realizar testes para escapar e, ao ter sucesso, se liberta e o efeito é encerrado."
  },
  {
    nome: "Abalado",
    dano: "Efeito",
    defesa: "Bloqueio",
    status: "Abalado",
    acumulo: "Não",
    icon: "../imagens/icon_abalado.png",
    descricao: "O alvo é afetado por um golpe ou acontecimento que o desestabiliza profundamente. Caso não resista, fica impossibilitado de realizar bloqueios por toda a duração do efeito. Após esse tempo, retorna ao normal."
  },
  {
    nome: "Cegueira",
    dano: "Efeito",
    defesa: "Fortitude ou Reflexo",
    status: "Cego",
    acumulo: "Sim",
    icon: "../imagens/icon_cegueira.png",
    descricao: "O alvo perde totalmente a capacidade de enxergar, mergulhado em completa escuridão, seja por mágica, dano ocular ou manipulação sensorial. Enquanto o efeito estiver ativo, ele sofre desvantagens severas em testes de percepção visual e ataques à distância ou corpo a corpo. A cegueira pode ser superada com testes apropriados, cura mágica ou quando sua duração natural expira."
  },
  {
    nome: "Protegido",
    dano: "Proteção",
    defesa: "Nulo",
    status: "Protegido",
    acumulo: "Não",
    icon: "../imagens/icon_protegido.png",
    descricao: "O alvo é designado como protegido por um aliado. Enquanto o efeito estiver ativo, o aliado assume os ataques direcionados a ele por vontade própria, colocando-se em risco. O efeito se mantém até que o protetor morra, desista ou seja forçado a romper a proteção."
  },
  {
    nome: "Revelado",
    dano: "Efeito",
    defesa: "Defesa do inimigo",
    status: "Revelado",
    acumulo: "Não",
    icon: "../imagens/icon_revelado.png",
    descricao: "A camuflagem ou invisibilidade do alvo é anulada. Ele se torna totalmente visível e rastreável, mesmo por meios mágicos ou sensores naturais. O efeito permanece até que sua duração se encerre ou a habilidade seja dissipada."
  },
  {
    nome: "Silenciado",
    dano: "Efeito",
    defesa: "Defesa do inimigo",
    status: "Silenciado",
    acumulo: "Não",
    icon: "../imagens/icon_silenciado.png",
    descricao: "O alvo perde a capacidade de se comunicar, entoar magias, gritar ou emitir qualquer som significativo. O efeito permanece até o final da duração ou até que o alvo resista a ele. Ideal contra conjuradores ou criaturas que dependem da fala."
  },
  {
    nome: "Exposto",
    dano: "Dano x2 e Estresse",
    defesa: "Defesa do inimigo",
    status: "Exposto",
    acumulo: "Não",
    icon: "../imagens/icon_exposto.png",
    descricao: "A armadura do alvo está destruída, sua mente quebrada ou sua alma despida de proteção. Todo dano físico contra ele é dobrado, e o dano de estresse é igualmente amplificado. O efeito permanece até o fim da duração natural."
  },
  {
    nome: "Furtivo",
    dano: "Nulo",
    defesa: "Defesa do inimigo",
    status: "Furtivo",
    acumulo: "Não",
    icon: "../imagens/icon_furtivo.png",
    descricao: "O alvo se torna mais difícil de ser detectado, recebendo +5 em reações e +5 em acertos. Esse estado de furtividade permite que o alvo execute ações com maior eficácia, mas pode ser interrompido se for descoberto ou atacado."
},
{
    nome: "Voando",
    dano: "Nulo",
    defesa: "Armas corpo a corpo",
    status: "Voando",
    acumulo: "Não",
    icon: "../imagens/icon_voando.png",
    descricao: "O alvo está em uma posição elevada, ganhando +5 em reações contra armas corpo a corpo. Enquanto estiver voando, o alvo se torna menos vulnerável a ataques físicos diretos, mas pode ser derrubado por habilidades específicas."
}
];

            // Adicione os outros efeitos aqui...
        
const tabela = document.getElementById("efeito-tabela");
const modais = document.getElementById("modais-container");

efeitos.forEach((efeito, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td class="effect-name-cell">
            <img src="${efeito.icon}" alt="${efeito.nome}" class="effect-icon">
            <span>${efeito.nome}</span>
        </td>
        <td>${efeito.dano}</td>
        <td>${efeito.defesa}</td>
        <td>${efeito.status}</td>
        <td>${efeito.acumulo}</td>
        <td><button class="effects-table-button" onclick="document.getElementById('effects-modal-${i}').style.display='block'">Detalhes</button></td>
    `;
    tabela.appendChild(tr);

    const modal = document.createElement("div");
    modal.className = "effects-modal";
    modal.id = `effects-modal-${i}`;

    modal.innerHTML = `
        <div class="effects-modal-content">
            <span class="effects-modal-close-button" onclick="document.getElementById('effects-modal-${i}').style.display='none'">&times;</span>
            <img class="icon" src="${efeito.icon}" alt="${efeito.nome}" />
            <h2 class="effects-modal-title">${efeito.nome}</h2>
            <p class="effects-modal-description">${efeito.descricao}</p>
        </div>
    `;
    modais.appendChild(modal);
});

// Fecha modal ao clicar fora
window.onclick = function(event) {
    if (event.target.classList.contains('effects-modal')) {
        event.target.style.display = "none";
    }
};

let indice = 0;

    const img = document.getElementById("efeito-img");
    const nome = document.getElementById("efeito-nome");
    const descricao = document.getElementById("efeito-descricao");

    function mostrarEfeito(i) {
      const efeito = efeitos[i];
      img.src = efeito.icon;
      nome.textContent = efeito.nome;
      descricao.textContent = efeito.descricao;
    }

    document.querySelector(".prev").addEventListener("click", () => {
      indice = (indice - 1 + efeitos.length) % efeitos.length;
      mostrarEfeito(indice);
    });

    document.querySelector(".next").addEventListener("click", () => {
      indice = (indice + 1) % efeitos.length;
      mostrarEfeito(indice);
    });

    mostrarEfeito(indice);