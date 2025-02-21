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
        footer.style.background = "linear-gradient(45deg,#792525c2,#3d0404c2)"; // Altera a cor do rodapé
    } else {
        footer.style.background = "linear-gradient(45deg, #0f0c29, #302b63, #24243e)"; // Mantém a cor padrão
    }
});

// Conteúdo dinâmico para cada ícone
const contents = [
    {
      titulo: "Guerreiro",
      texto: "A classe Guerreiro é especializada em combate corpo a corpo, abrangendo estilos como cavaleiros, bárbaros e outros lutadores que dependem de proximidade para atacar. Ela se destaca por enfraquecer os inimigos, aplicando desvantagens como redução de força, defesa ou velocidade, enquanto controla o ritmo da batalha. Seus ataques podem causar efeitos como atordoamento ou sangramento, além de receber bônus ao executar combos ou ações estratégicas. O Guerreiro pode se especializar em ser um defensor resistente, um agressor que causa danos massivos ou um tático que utiliza estratégia para criar oportunidades no combate. É ideal para jogadores que preferem dominar o campo de batalha e agir na linha de frente.",
      gif: "imagens/regras_guerreiro_gif.gif",
      background: "imagens/regras_fundo_menu.jpg",
    },
    {
      titulo: "Atiradores",
      texto: "A classe Atirador é especializada em combate à distância, focada em dano rápido e preciso, com habilidade para atingir pontos críticos e penetrar armaduras. Utilizando armas de fogo, adapta-se tanto a combates de média quanto longa distância, sendo essencial em batalhas por sua capacidade de causar alto dano. Seus bônus incluem maior precisão, aproveitamento de danos críticos e eficiência na perfuração de defesas, tornando-o uma opção estratégica para quem busca atacar de forma letal e segura, mantendo-se fora do alcance direto dos inimigos.",
      gif: "imagens/regras_atirador.gif",
      background: "imagens/regras_fundo_menu.jpg",
    },
    {
      titulo: "Ferreiro",
      texto: "A classe Ferreiro é especializada na forja e criação de itens, com foco em manipulação e extração eficiente de minérios. Seus bônus incluem maior produtividade na criação e aprimoramento de equipamentos, além de extrair recursos com eficiência. É uma das classes mais essenciais, garantindo suprimentos e itens fundamentais para todos os jogadores.",
      gif: "imagens/regras_gif_de_menu.gif",
      background: "imagens/regras_fundo_menu.jpg",
    },
    {
      titulo: "Arcano",
      texto: "A classe Arcano é indispensável para uma tribo, sendo a única capaz de manipular a magia e as essências de Aether. Com habilidades e sentidos aprimorados, os arcanos transformam o comum em algo extraordinário, usando sua conexão com o arcano para criar grandes feitos. Apesar de seu imenso poder, são indivíduos frágeis e raros, com a habilidade de compreender sigilos e realizar rituais mágicos complexos.",
      gif: "imagens/personagens_magobroxa.jpg",
      background: "imagens/regras_fundo_menu.jpg",
    },
    {
      titulo: "Cientista",
      texto: "A classe Cientista é especializada em estratégia e pesquisa científica, com a habilidade de manipular o DNA de criaturas e alterar seus códigos genéticos. Esses personagens podem criar ou destruir monstros com base em suas descobertas. Embora sejam inicialmente frágeis, tornam-se extremamente poderosos com o tempo, possuindo os maiores bônus de aprendizado da ilha. Eles dominam reações químicas, além de utilizarem armas biológicas e nucleares, tornando-se uma peça-chave na evolução e destruição do ecossistema.",
      gif: "imagens/regras_cientista.gif",
      background: "imagens/regras_fundo_menu.jpg",
    },
    {
      titulo: "Sobrevivente",
      texto: "A classe dos Sobreviventes se destaca por sua versatilidade no início do jogo, com bônus em ações de criação primal e domesticação de animais. Embora percam relevância à medida que outras classes evoluem, sua eficiência inicial é incomparável. Além disso, possuem a habilidade de aprimorar itens básicos, tornando-os uma escolha estratégica para os primeiros momentos da jornada.",
      gif: "imagens/regras_sobreviventes.gif",
      background: "imagens/regras_fundo_menu.jpg",
    },
    {
      titulo: "Construtor",
      texto: "A classe Construtor é especializada em criar estruturas e dispositivos com alta eficiência, dominando tanto a construção de barreiras sólidas, como muros e paredes, quanto a lógica de funcionamento de engrenagens e mecanismos. Sua habilidade em trabalhar com materiais improvisados os torna essenciais para desenvolver infraestrutura e tecnologia em qualquer situação.",
      gif: "imagens/regras_construtor.gif",
      background: "imagens/regras_fundo_menu.jpg",
    },
    {
      titulo: "Médico",
      texto: "A classe Médico é especializada no tratamento de doenças, cura eficiente de ferimentos e cuidado com traumas mentais. Além disso, domina a arte de garantir uma boa alimentação para os membros da tribo, sendo indispensável tanto em momentos de batalha quanto em períodos de descanso e recuperação.",
      gif: "imagens/regras_médicos.gif",
      background: "imagens/regras_fundo_menu.jpg",
    },
  ];
  
  // Função para alterar o conteúdo
  function changeContent(index) {
    const content = contents[index - 1];
    document.getElementById("titulo").textContent = content.titulo;
    document.getElementById("texto").textContent = content.texto;
    document.getElementById("gif").src = content.gif;
    document.getElementById("imagem-fundo").src = content.background;
  }

 // Array com os nomes das mecânicas de RPG
const mecanicas = [
  "Tempos e Turnos...",
  "Perigos Sorteados...",
  "Fatalidade...",
  "Interlúdio...",
  "Vantagens e Desvantagens..."
];

// Função para exibir conteúdo (acionada pelo clique)
function exibirConteudo(botaoIndex) {
    const imagens = [
      "imagens/regras_icon6.jpg",
      "imagens/regras_icon6.jpg",
      "imagens/regras_icon6.jpg",
      "imagens/regras_icon6.jpg",
      "imagens/regras_icon6.jpg"
    ];
    const titulos = [
      "Tempos e Turnos...",
      "Perigos Sorteados...",
      "Fatalidade...",
      "Interlúdio...",
      "Vantagens e Desvantagens..."
    ];
   

     // Atualiza os elementos com o conteúdo selecionado
     document.getElementById("imagem-selecionada").src = imagens[botaoIndex];
     document.getElementById("titulo-conteudo").innerText = titulos[botaoIndex];
     document.getElementById("paragrafo1").innerText = paragrafos[botaoIndex][0];
     document.getElementById("paragrafo2").innerText = paragrafos[botaoIndex][1];
     document.getElementById("paragrafo3").innerText = paragrafos[botaoIndex][2];
 
     // Exibe a área de conteúdo
     document.getElementById("area-conteudo").style.display = "block";
 }
 
 // Seleciona todos os botões
 const botoes = document.querySelectorAll('.botao-interativo, .botao-interativo2');
 
 // Para desktops: listeners de hover para atualizar o nome da mecânica
 botoes.forEach(button => {
   button.addEventListener('mouseenter', function() {
     const index = this.getAttribute('data-index');
     document.getElementById("mecanica-dinamica").textContent = mecanicas[index];
   });
   button.addEventListener('mouseleave', function() {
     document.getElementById("mecanica-dinamica").textContent = ". . .";
   });
 });
 
 // Para telas menores (ou dispositivos touch) – troca automática do nome e efeito no botão
 if ('ontouchstart' in window || window.innerWidth < 1080) {
   let index = 0;
   setInterval(function() {
     // Atualiza o texto da mecânica
     document.getElementById("mecanica-dinamica").textContent = mecanicas[index];
 
     // Remove a classe active-glow de todos os botões
     botoes.forEach(btn => btn.classList.remove('active-glow'));
     
     // Adiciona a classe active-glow ao botão correspondente
     const botaoAtual = document.querySelector(`.botao-interativo[data-index="${index}"], .botao-interativo2[data-index="${index}"]`);
     if (botaoAtual) {
       botaoAtual.classList.add('active-glow');
     }
     
     index = (index + 1) % mecanicas.length;
   }, 2000); // Intervalo de 2 segundos
 }


const imagens = [
  { src: "imagens/regras_fundo1.jpg", titulo: "Mecânicas de Situações", texto: "O Ark reage ativamente às decisões dos personagens, criando momentos inesperados de perigo intenso ou alívio momentâneo. Cada situação pode desencadear uma nova mecânica, adaptando-se à tensão crescente ou oferecendo respiros estratégicos antes da próxima ameaça. O desconhecido não é apenas um elemento narrativo, mas uma força viva que molda a experiência dos jogadores.", fundo: "imagens/regras_fundo1.jpg" },
  { src: "imagens/regras_fundo3.jpg", titulo: "Cenas de Furtividade", texto: "Ao cruzar o caminho de um predador ou animal territorial, a furtividade pode ser a única chance de sobrevivência. Nesse momento, inicia-se um embate entre percepção e furtividade, onde os jogadores devem evitar serem detectados pelos sentidos da criatura — seja pelo cheiro, visão ou outros meios. Cada jogador ou grupo começará com 0 a 4 pontos de visibilidade, dependendo do ambiente e da habilidade da criatura em rastrear. Fatores como tamanho, ruído e número de pessoas afetam diretamente a chance de sucesso: um grupo grande é mais chamativo, enquanto indivíduos menores e silenciosos passam despercebidos com mais facilidade. Se a visibilidade alcançar 4 pontos, a furtividade falha e a perseguição começa. Para sobreviver, os jogadores precisarão analisar o terreno, explorar vantagens e evitar chamar atenção, pois o menor erro pode significar o fim.", fundo: "imagens/regras_fundo3.jpg" },
  { src: "imagens/regras_fundo4.jpg", titulo: "Cenas de Campo Furtivo", texto: "Diferente da furtividade tradicional, o Campo Furtivo ocorre quando os jogadores já foram detectados e estão sendo caçados. Eles devem atravessar um campo dividido em quadrantes, blocos ou qualquer estrutura que o mestre definir, enquanto os predadores patrulham de forma imprevisível, movendo-se mais de um espaço por turno. Os jogadores avançam de um em um, podendo usar o ambiente para criar distrações, armadilhas ou esconderijos temporários, mas nunca enfrentando os caçadores diretamente. O mestre tem total liberdade para adaptar o cenário, o comportamento dos predadores e o nível de tensão, tornando cada tentativa única e imprevisível. Se um jogador for descoberto, a cena se torna uma perseguição, colocando todos em risco. O tempo é limitado e qualquer hesitação pode ser fatal.", fundo: "imagens/regras_fundo4.jpg" },
  { src: "imagens/regras_fundo2.jpg", titulo: "Cenas de Perseguições Normais e Diabólicas", texto: "Quando lutar não é uma opção, resta apenas correr. Nas perseguições, os jogadores enfrentam seus predadores em uma disputa de velocidade e resistência, testando Agilidade (correr) ou Vigor (atletismo) contra a DT da criatura (10 a 25 escalando por tamanho do caçador), incluindo seus bônus. A fuga dura 5 rodadas; falhar 3 vezes faz o jogador perder o ritmo, exigindo um teste de esquiva (-5). Se falhar, é capturado e atacado de maneira brutal. Em Perseguições Diabólicas, o pânico domina: dados de determinação podem ser usados, mas ninguém é obrigado a ajudar. Empurrar aliados ou sacrificá-los pode ser a única forma de sobreviver.", fundo: "imagens/regras_fundo2.jpg" },
  { src: "imagens/regras_fundo5.jpg", titulo: "Cenas de Encontro Mortal", texto: "Encontros Mortais ocorrem quando uma criatura ou chefe sofre mutações arcanas extremas, tornando-se brutalmente injusto. Nessas lutas, ela ganha +3 dados de dano em todas as habilidades, Vida Acelerada (+30 de vida por rodada), duas ações padrão, Ações de Fatalidade Aprimoradas que executam alvos livremente, dano de sanidade para todos próximos e um impacto direto na Ilha. O grupo só tem duas opções: lutar ou fugir, mas qualquer erro pode ser fatal.", fundo: "imagens/regras_fundo5.jpg" },
  { src: "imagens/regras_fundo6.jpg", titulo: "Aventura de Masmorras", texto: "Nas masmorras do Ark, o grupo ou tribo pode acampar ou encontrar um ponto seguro para recuperar vida, sanidade e reparar equipamentos. Durante a exploração, eventos como emboscadas, salas secretas, lutas e armadilhas podem ocorrer. Ao acamparem, poderão ver os próximos eventos nos dois corredores mais próximos.", fundo: "imagens/regras_fundo6.jpg" },
  { src: "imagens/regras_fundo7.jpg", titulo: "Cenas de Desafio Animal", texto: "Cenas de Desafio Animal ocorrem quando o grupo enfrenta um adversário estratégico que reconhece sua força e prefere um confronto indireto, utilizando criaturas para lutar à distância. Nessa mecânica, os animais do grupo se tornam cartas com valores de vida e dano, além de uma habilidade característica única. O combate ocorre entre essas cartas, onde cada criatura tem seu valor determinado pela resistência (1 ponto a cada 80 PV) e pelo poder ofensivo (1 ponto a cada 50 de dano). O objetivo é superar as cartas inimigas para abrir caminho sem que os jogadores sejam atacados diretamente. Quando um número chega a zero, a criatura correspondente é derrotada, forçando o jogador a aceitar a perda e seguir em frente sem ela.", fundo: "imagens/regras_fundo7.jpg" },
  { src: "imagens/regras_fundo8.jpg", titulo: "Cenas de Desafio de Enigma", texto: "Cenas de Desafio de Enigma acontecem quando o grupo se depara com um obstáculo que não pode ser superado pela força bruta, uma porta que não se abre, uma criatura imune a dano ou um caminho oculto. Para avançar, é necessário decifrar o enigma por meio de pistas deixadas na história, símbolos, traduções ou padrões ocultos no cenário. A solução pode exigir lógica, criatividade ou um conhecimento profundo do mundo ao redor, forçando os jogadores a pensar antes de agir.", fundo: "imagens/regras_fundo8.jpg" },
  { src: "imagens/regras_fundo9.jpg", titulo: "Cenas de Enigma de Domesticação", texto: "Cenas de Enigma de Domesticação ocorrem quando os jogadores têm a chance de domar uma criatura, mas, ao invés de um simples teste, o mestre pode introduzir um enigma baseado na personalidade ou características do animal. Esse enigma pode envolver ações específicas, alimentação adequada, imitações ou interações estratégicas que conduzam à domesticação. Todas as criaturas da ilha podem ser domadas, mas o grau de dificuldade varia: desafios fáceis (DT 5) exigem poucas ações para ganhar a confiança da fera, enquanto domesticações extremamente difíceis (DT 600) demandam estratégias precisas e grande dedicação.", fundo: "imagens/regras_fundo9.jpg" },
  { src: "imagens/regras_fundo10.jpg", titulo: "Cenas de Rivalidade", texto: "Cenas de Rivalidade são eventos raros onde um animal do grupo enfrenta um inimigo para proteger seus aliados, mas, por estar enfraquecido, precisa da ajuda de seu dono. Nessa conexão única, jogador e criatura se tornam um só: o animal fornece o corpo físico, enquanto o dono assume a mente, permitindo que joguem juntos utilizando a ficha da criatura, sua mutação e evolução elemental. Após essa fusão, os dois ganham a habilidade de se unir novamente em outras situações, por um período de 1d8 rodadas, antes de entrarem em fadiga e ficarem totalmente cansados", fundo: "imagens/regras_fundo10.jpg" },
  { src: "imagens/regras_fundo11.jpg", titulo:"Cenas de Pesadelo", texto: "Cenas de Pesadelo ocorrem quando os personagens estão aflitos ou sobrecarregados pelos horrores da Ilha. Se passarem por eventos traumáticos ou impactantes, suas mentes tentam se proteger, manifestando seus medos em sonhos intensos. Os jogadores podem superar esses traumas gradualmente ou enfrentá-los diretamente no pesadelo. No entanto, essas provações são extremamente desafiadoras e oferecem apenas uma única chance de superação. Se falharem, a condição persiste até ser vencida naturalmente, tornando-se um peso constante em sua jornada.", fundo: "imagens/regras_fundo11.jpg" },
  { src: "imagens/regras_fundo12.jpg", titulo:"Cenas de Caçada Sombria", texto: "Cenas de Caçada Noturna ocorrem quando um jogador ou o grupo passam três dias seguidos sem cumprir objetivos ou demonstrar vontade de avançar. O Ark é um ciclo de transformação e evolução, ficar estagnado é um risco. Quando isso acontece, os personagens são puxados para um sonho compartilhado com outros NPCs afetados, onde precisam sobreviver contra uma criatura que devora sonhos e reduz todos os atributos até 1. Se falharem no combate ou na fuga, despertam feridos e com todos os atributos reduzidos a 1, forçados a recuperar sua força no mundo real.", fundo: "imagens/regras_fundo12.jpg" },
  { src: "imagens/regras_fundo13.jpg", titulo:"Cenas de Tutorial", texto: "Cenas de Tutorial ocorrem quando um jogador entra no Ark pela primeira vez, enfrentando um desafio que exige o uso de sua mutação para superá-lo. Caso seja um smurf (já tenha jogado em outra mesa), pode tentar sem usá-la. O objetivo é apresentar o mundo e prepará-lo para os perigos que virão.", fundo: "imagens/regras_fundo13.jpg" },
];

let indiceAtual = 0;

function trocarImagem(direcao) {
  indiceAtual = (indiceAtual + direcao + imagens.length) % imagens.length;

  document.getElementById("imagemPrincipal").src = imagens[indiceAtual].src;
  document.getElementById("textoDescricao").textContent = imagens[indiceAtual].texto;
  document.getElementById("tituloDescricao").textContent = imagens[indiceAtual].titulo;
  
  // Muda o fundo da página e o fundo desfocado
  document.body.style.backgroundImage = `url(${imagens[indiceAtual].fundo})`;
  document.querySelector(".fundo-blur").style.backgroundImage = `url(${imagens[indiceAtual].fundo})`;
}


  