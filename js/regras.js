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

 // Dados dos tópicos e imagens de fundo
const topicos = [
  {
    id: 1,
    titulo: "Mecânicas",
    texto: "O RPG funciona em turnos, onde cada personagem realiza suas ações em sequência. Ações em conjunto, como lutas ou momentos de lazer, acontecem simultaneamente. A importância da ação define sua duração na cena.As cenas estruturam o jogo, combinando as ações de todos os personagens, garantindo que ninguém fique desincronizado no tempo do RPG. Dependendo da necessidade, o mestre pode acelerar ou desacelerar certas ações para manter a fluidez da narrativa.",
    imagem: "imagens/regras_mecanicas.jpg" // Certifique-se de que esta imagem está na pasta 'imagens' no mesmo nível do HTML
  },
  {
    id: 2,
    titulo: "Fatalidade",
    texto: "A Fatalidade no RPG determina o quanto o personagem suporta dor ou mantém sua sanidade. Danos que ultrapassam metade da vida do oponente podem resultar na perda de um membro ou órgão (não vital). Quando um inimigo chega a zero de Determinação, ataques recebem +5 em acertos, e uma finalização pode afetar os inimigos próximos, reduzindo sua sanidade ou determinação. Em duelos corpo a corpo, a guarda rígida é essencial, e se um oponente perder a guarda, o bloqueio ou contra-ataque do oponente decai em -10. Traumas podem causar alucinações, bloqueios de memória ou paranoia, e se o personagem ficar louco, o jogador perde controle total sobre ele.",
    imagem: "imagens/regras_fatalidade.jpeg"
  },
  {
    id: 3,
    titulo: "Combate",
    texto: "Quando sua vida chega a zero, o personagem entra no estado 'morrendo', podendo rastejar, mas sem agir com eficácia. Não existe dano massivo contra humanos (não ultrapassando metade da vida), mas contra criaturas é possível. Ao tomar dano completo da vida, o personagem pode ser finalizado no próximo turno. Armaduras podem ser danificadas até zerar sua vida, após o que a vida do personagem é contabilizada. Dano de veneno ou mordidas colossais afetam tanto a vida quanto a armadura. Após zerar a energia, o personagem ganha torpor se continuar em uso, e durante perseguições de estamina, cada rodada consome um fôlego, e se o teste de saúde falhar, o personagem começará a infartar. Não é possível defender balas sem equipamentos, e em lutas de intimidação entre animais, os alphas fazem testes de força, sendo o vencedor beneficiado com 1d6 no próximo teste de luta. O primeiro a agir é o vencedor da intimidação ou o mais ágil/furtivo se não houver furtividade envolvida.",
    imagem: "imagens/regras_combate.jpg"
  },
  {
    id: 4,
    titulo: "Furtividade",
    texto: "A furtividade é a habilidade de seu personagem se manter escondido ou agir sem ser percebido. Se o personagem passar no teste de percepção, ele ficará furtivo, ganhando um bônus de +5 em acertos e um dado adicional de dano repetido. Assassinos podem aumentar ainda mais o dano furtivo. No entanto, realizar ações barulhentas ou atacar irá revelar a posição do personagem. Flanquear não é considerado estar furtivo, mas sim quando o inimigo está sendo rodeado ou incapaz de ficar de frente ao jogador. Nesse caso, o personagem pode escolher entre um dado adicional de dano ou +5 no acerto, mas apenas uma dessas opções pode ser aplicada.",
    imagem: "imagens/regras_furtividade.webp"
  },
  {
    id: 5,
    titulo: "Tempos de Recarga",
    texto: "Tempos de recarga é uma mecânica que engloba todos os períodos necessários para ações e eventos no jogo, como o tempo de mutações, o aparecimento de drops, a preparação de comida, a satisfação das necessidades do personagem, ou até mesmo o uso do cristal de uma criatura como corpo por um tempo. Cada uma dessas ações ou eventos tem um tempo de recarga específico, o que adiciona uma camada de estratégia, pois o jogador precisa gerenciar o tempo adequadamente para garantir a sobrevivência e a eficiência nas suas ações.",
    imagem: "imagens/regras_tempos_de_recarga.jpg"
  },
  {
    id: 6,
    titulo: "Domesticação",
    texto: "A domesticação dos animais na ilha varia de acordo com a espécie, e existem diversas formas de conquistar a confiança das criaturas. A maneira mais simples é roubando os ovos das criaturas ou dinossauros e cuidando deles desde filhotes. Algumas espécies só podem ser domesticadas dessa forma, enquanto outras exigem métodos específicos. O processo pode envolver incubação ou até mesmo manipulação em laboratório, o que resulta na criatura sendo parte da tribo do jogador, mas não garante que ela agirá de forma amigável, já que seus instintos podem ainda prevalecer. À medida que o vínculo entre o jogador e a criatura cresce, ela ganha maior confiança, podendo até dividir o cristal com o jogador, permitindo fusões ou o controle conjunto de seus corpos em batalha. A barra de progresso da domesticação sobe ou desce dependendo das ações do jogador, com base no que agrada ou desagrada a criatura. Quanto maior o vínculo, mais forte será a parceria e a cooperação durante o jogo.",
    imagem: "imagens/regras_domesticação.jpg"
  },
  {
    id: 7,
    titulo: "Críticos e Danos",
    texto: "Cada tipo de dano no jogo varia conforme a origem, como balístico (balas de armas de fogo), corte ou perfuração (armas de perto ou flechas). O comportamento dos críticos também é influenciado pelo tipo de dano. Críticos sempre fazem a soma do dobro dos dados rolados, o que significa que o dano causado será multiplicado por 1,5x. Por exemplo: se o jogador rolou 2d20 e obteve críticos nos dois, ele adicionaria +2d10 de dano, sendo que esse valor seria sempre a metade do dado de dano causado. Para as balas, o valor do crítico é mais vantajoso devido ao grande número de balas disparadas. Dano físico, como mordidas ou garras, tende a ser mais consistente, com efeitos adicionais. Por outro lado, os danos causados por arcano não possuem críticos, funcionando de maneira diferente em relação às outras fontes de dano.",
    imagem: "imagens/regras_criticos_danos.jpg_large"
  },
  {
    id: 8,
    titulo: "Sistema de Evolução",
    texto: "Os sistemas de evolução no RPG podem ser aplicados tanto para personagens jogadores quanto para animais. Após cada sessão, os jogadores ganham um bônus de +5 em uma ação de sua escolha. Com o tempo, o Ark oferece + atributos aos personagens, refletindo a experiência acumulada ou a sobrevivência prolongada. Caso os jogadores desejem acelerar esse processo, podem derrotar colossos que possuem surtos de Aether instáveis, que também contêm elementos em seus mecanismos de funcionamento junto com a magia arcana. Ao beber o sangue de um colosso, embora de gosto desagradável, os jogadores podem melhorar seus atributos, recebendo +3 bônus em ações, além de ganhar a passiva do colosso e seus espólios. Os animais, por sua vez, também podem evoluir, com objetivos próprios no jogo, sendo grandes arcos na sobrevivência. Eles podem nascer já evoluídos ou conquistar essa evolução ao longo de sua jornada, podendo até se corromper. Um exemplo seria o Espinossauro, que ao matar um Rex, evolui para um novo elemento, podendo se corromper com o Aether ou já nascer com uma evolução genética avançada.",
    imagem: "imagens/regras_sistema_de_evolucao.jpg"
  },
];

// Seleciona elementos
const listaTopicos = document.querySelectorAll(".topicos li");
const tituloBloco = document.querySelector(".titulo");
const textoBloco = document.querySelector(".texto");
const blocoConteudo = document.querySelector(".bloco-conteudo");

// Adiciona evento de clique
listaTopicos.forEach(item => {
  item.addEventListener("click", () => {
    const id = parseInt(item.getAttribute("data-id"));
    const topico = topicos.find(t => t.id === id);

    // Atualiza conteúdo do bloco
    tituloBloco.textContent = topico.titulo;
    textoBloco.textContent = topico.texto;
    blocoConteudo.style.backgroundImage = `url(${topico.imagem})`; // Adicionado URL corretamente
  });
});

  