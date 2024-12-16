


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
        footer.style.background = "linear-gradient(45deg, #b80f0fe0,#5a0707a1, #b80f0fe0)"; // Altera a cor do rodapé
    } else {
        footer.style.background = "linear-gradient(45deg, #0f0c29, #302b63, #24243e)"; // Mantém a cor padrão
    }
});

// Função para mudar o conteúdo
function mudarConteudo(numero) {
    // Títulos para cada container
    const titulos = [
        "Crescer-Mudar",
        "Estimulo da ira",
        "Controle Cruel",
        "Frenesi traumático",
        "Visão do Abismo",
        "Reflexão da dor",
        "Chama Eterna",
        "Olho do kraken",
        "Ritual de arma",
        "Aprimorar elemental"
    ];

    // Textos para cada container
    const textos = [
        "O símbolo de crescimento e transformação altera a massa física de uma criatura, podendo fazê-la crescer ou encolher. Esse efeito depende da presença do personagem que o aplica. Ao crescer, a criatura dobra sua vida e ganha um bônus de intimidação; ao encolher, perde esse bônus e tem sua vida reduzida pela metade. O tamanho é alterado em até 40% do tamanho original do alvo. Para conjurar, o símbolo deve ser escrito na criatura ou ser vivo, e o efeito ocorre após uma rodada de invocação enquanto o conjurador lê um trecho do conto O Pequeno Colosso, encontrado nas ruínas dos caídos.",
        "O Estímulo da Ira é uma antiga praga que se fundiu com os efeitos da mega raiva, uma doença poderosa. Quando ativado, faz com que o alvo cause apenas danos críticos, liberando uma raiva descontrolada e permitindo ataques a qualquer um à vista. Quando a criatura perde metade da vida, seus olhos ficam amarelos e ela ataca o primeiro ser que encontrar, ficando ainda mais descontrolada. No entanto, ela ganha um bônus de vida de 4d12 + (Vig) d12 do alvo. Durante todo o efeito, a criatura sente uma fome e desidratação constantes. Para conjurar, é necessário coletar o sangue do alvo e colocá-lo em um recipiente especial, no formato de uma sanguessuga dos caídos, encontrado nas ruínas, que drena o sangue e transforma o efeito ao longo do tempo.",
        "O Controle Cruel é um ritual ancestral e cruel que permite ao conjurador dominar a mente de um inimigo por uma rodada, forçando-o a obedecer a até seis ordens. Se o inimigo resistir, ele sofre um dano de sangue devastador. No entanto, o preço da dominação é alto: o conjurador absorve metade do dano mental que o inimigo sofre fisicamente, mergulhando em um frenesi de traumas. Para realizar o ritual, é necessário o Olho Perdido do Imperador dos Caídos ou a inscrição dos sigilos específicos em uma lâmina e a repetição das palavras sagradas. O ritual, que só pode ser usado em seres conscientes, é um legado sombrio dos primeiros imperadores, um testemunho de sua crueldade e ambição de poder.",
        "O Frenesi Traumático é um ritual ancestral e sombrio, capaz de desvendar as profundezas mais escuras da mente. Ao conjurá-lo, o praticante inflige um tormento indescritível ao alvo, forçando-o a confrontar seus piores medos e traumas. O mundo físico se deforma, derretendo diante dos olhos da vítima, enquanto ela é assombrada por visões horripilantes. Esse ritual, nascido da era da escravidão dos Caídos, era utilizado como instrumento de dominação, subjugando os inimigos através do terror absoluto. Para invocá-lo, o conjurador deve estar à beira da morte, consumindo um veneno letal e inscrevendo em sua pele os padrões da 'canção do medo'. O Frenesi Traumático é uma dança macabra com a morte, um banquete para a alma torturada.",
        "O Visão do Abismo é um ritual arcano que permite ao conjurador ouvir os sussurros dos mortos, revelando os caminhos percorridos por eles e oferecendo guias para o futuro. Ao pronunciar uma palavra-chave ancestral, inscrita em pedras sagradas, o praticante entra em contato com o além, mas a conexão é frágil e dura apenas enquanto ele respirar. As informações recebidas podem ser valiosas, mas também perigosas, pois a exposição prolongada aos espíritos pode levar à loucura ou à possessão. Os Caídos, uma civilização antiga, dominavam esse ritual, mas seus segredos foram perdidos ao longo do tempo. A busca por essas palavras-chave e a realização do ritual expõem o conjurador a perigos desconhecidos, como armadilhas, criaturas sobrenaturais e os próprios espíritos que podem ter motivos ocultos para compartilhar seus conhecimentos.",
        "A Reflexão da Dor é um ritual sombrio e arcano que permite ao conjurador absorver todo o dano infligido em um único objeto: um espelho fragmentado. Por uma rodada, o praticante se torna um receptáculo de dor, experimentando uma agonia indescritível enquanto acumula energia negativa. Ao quebrar o espelho diante de seu inimigo, o conjurador libera essa energia em uma explosão devastadora, infligindo um dano massivo. No entanto, essa prática tem um alto custo: a sanidade do conjurador é drasticamente reduzida, e ele fica marcado pelas visões horripilantes que testemunhou durante o ritual. A criação desse espelho requer conhecimentos arcanos e materiais específicos, como sigilos místicos ou amuletos dos Caídos.",
        "A Chama Eterna é um ritual arcano que transforma um fogo comum em uma fonte de poder inextinguível. Ao ingerir essa chama, o conjurador se funde com o fogo, tornando-se uma criatura ígnea. Essa transformação concede ao praticante habilidades sobrenaturais relacionadas ao fogo, como a capacidade de manipular chamas, criar escudos de calor e até mesmo voar. No entanto, essa habilidade tem um preço: o conjurador se torna dependente do fogo e vulnerável à água. Para realizar esse ritual, é necessário encontrar um templo perdido nas profundezas de um vulcão e decifrar as palavras sagradas que invocam a Chama Eterna.",
        "O Olho do Kraken é um artefato sombrio e poderoso, fragmento do olho de uma criatura marinha lendária. Ao conjurar este olho, o praticante se torna um necromante, ganhando o poder de controlar a morte e ressuscitar os mortos. No entanto, este dom tem um preço terrível: o necromante se torna um escravo da morte, condenado a sofrer tormentos eternos e a viver à margem da sociedade. Para obter esse poder, o conjurador deve encontrar os fragmentos dispersos do olho, escondidos nas profundezas mais escuras dos oceanos, e realizar um ritual antigo e perigoso.",
        "O ritual de fusão elemental é uma prática arcana que permite ao conjurador infundir em suas armas os poderes de criaturas elementais ou seres arcanos. Ao combinar os espólios dessas criaturas, como pele, olhos, garras ou outros materiais, com um equipamento existente, o conjurador cria uma sinergia única, imbuindo a arma com novas habilidades e propriedades.",
        "O ritual de aprimoramento elemental é uma prática arcana que transforma uma criatura companheira em uma entidade elemental, imbuindo-a com as forças e fraquezas de um elemento específico. Para realizar esse ritual, o conjurador precisa de uma profunda conexão com a criatura, um item de valor sentimental para ela e símbolos arcanos representando o elemento escolhido. Ao final do ritual, a criatura adquire novas habilidades e capacidades relacionadas ao elemento, mas também se torna vulnerável a seu oposto. No entanto, essa transformação é um processo delicado e arriscado, pois pode alterar drasticamente a personalidade da criatura e até mesmo enfraquecer o vínculo entre ela e o conjurador.",
    
    ];

    // Imagens para cada container
    const imagens = [
        "imagens/poderes_crescer.png",
        "imagens/poderes_ira.jpg",
        "imagens/poderes_espelho_de_carne.jpg",
        "imagens/poderes_traumas.jpg",
        "imagens/poderes_caminho.jpg",
        "imagens/poderes_reflexão.jpg",
        "imagens/poderes_chama.jpg",
        "imagens/poderes_morte.jpg",
        "imagens/poderes_arma.webp",
        "imagens/poderes_bicho.jpg"
       
    ];

    // Atualiza título, texto e imagem
    document.getElementById("titulo").innerText = titulos[numero - 1];
    document.getElementById("texto").innerText = textos[numero - 1];
    document.getElementById("imagem-conteudo").src = imagens[numero - 1];
}
