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
        footer.style.background = "linear-gradient(45deg,,#6b6a62a4,#857b7bad,#6b6a62a4)"; // Mantém a cor padrão
    }
});
const efeitos = document.querySelectorAll('.efeito');
const descricao = document.getElementById('descricao');

// Array de objetos com os dados de cada efeito
const dadosEfeitos = [
    { nome: 'Efeito 1', descricao: ' Causada por mordidas de criaturas infectadas. Reduz saúde e estamina rapidamente.(Cirurgia)' },
    { nome: 'Efeito 2', descricao: ' Contrai-se ao inalar esporos tóxicos em cavernas. Causa perda de saúde constante.(Rémédio)' },
    { nome: 'Efeito 3', descricao: ' Transmitida por Leeches. Drena saúde e afeta movimento.(Transfusão)' },
    { nome: 'Efeito 4', descricao: ' Ataca o sistema imunológico, deixando o corpo mais vulnerável a doenças.(Tratamento) ' },
    { nome: 'Efeito 5', descricao: 'Provocadas pela exposição prolongada a gás venenoso em áreas vulcânicas ou cavernas.(Tratamento)'},
    { nome: 'Efeito 6', descricao: 'Uma infecção causada por contato com criaturas ácidas ou superfícies tóxicas.(Tratamento)' },
    { nome: 'Efeito 7', descricao: 'Causada por exposição prolongada ao calor extremo. Afeta foco e estamina.(Tratamento)' },
    { nome: 'Efeito 8', descricao: ' Uma versão adaptada transmitida por mosquitos em regiões tropicais.(vacina)'},
    { nome: 'Efeito 9', descricao: 'Infecção de sangue transmitida por insetos que causa febre alta e fraqueza extrema.(vacina)' },
    { nome: 'Efeito 10', descricao: 'Transmitida pelo ar em cavernas com morcegos ou fósseis infectados.(vacina)' },
    { nome: 'Efeito 11', descricao: ' Causada por beber água contaminada. Afeta hidratação e saúde.(vacina)' },
    { nome: 'Efeito 12', descricao: 'Causada por grande queimadura na região do corpo, queimando os orgãos internos.(Tratamento)' },
    { nome: 'Efeito 13', descricao: 'Causada por efeito quebrado de forma severa, enfraquecendo.(cirurgia)' },
    { nome: 'Efeito 14', descricao: 'Causada por paralisia de um membro, afetando a movimentação(cirurgia)'},
    { nome: 'Efeito 15', descricao: 'Causada por grande descarga elétrica, afetando o funcionamento do sistema nervoso(tratamento)' },
    { nome: 'Efeito 16', descricao: 'Uma arma biológica, que consome lentamente o hospedeiro, como vermes cheios de dentes.(Cirurgia)' },
    { nome: 'Efeito 17', descricao: 'Uma doença muito rara, que afeta a visão e a audição, causando alucinações.(Cirurgia)' },
    { nome: 'Efeito 18', descricao: 'Maldição que afeta a mente, causando perda de memória e confusão, criando uma dependência ao mar.(Cirurgia)' },
    { nome: 'Efeito 19', descricao: 'Uma peste viral que deixa o alvo fraco e drena suas forças, não deixando energia para o corpo restante(Remédio)' },
    { nome: 'Efeito 20', descricao: 'A infecção sanguínea surge quando o sangue do hospedeiro é contaminado por patógenos agressivos.(Tranfusão e tratamento)' },
    { "nome": "Efeito 21", "descricao": "Um parasita microscópico que se aloja no cérebro do hospedeiro, causando confusão e perda de coordenação. (Cirurgia)" },
    { "nome": "Efeito 22", "descricao": "Vírus altamente contagioso que destrói o sistema imunológico, deixando o corpo suscetível a qualquer outra infecção. (Tratamento contínuo)" },
    { "nome": "Efeito 23", "descricao": "Doença bacteriana transmitida por insetos que causa febre intensa, calafrios e delírios. (Remédio e repouso)" },
    { "nome": "Efeito 24", "descricao": "Uma febre misteriosa causada por um patógeno desconhecido presente na névoa de certas regiões. (Remédio específico)" },
    { "nome": "Efeito 25", "descricao": "Infecção causada por contato prolongado com matéria orgânica em decomposição, causando necrose gradual. (Amputação ou tratamento intensivo)" },
    { "nome": "Efeito 26", "descricao": "Causada por beber água contaminada, levando à desidratação extrema e falência dos órgãos. (Reidratação e remédios)" },
    { "nome": "Efeito 27", "descricao": "Doença mística associada a queimaduras graves, onde as chamas parecem continuar ardendo por dentro. (Tratamento especializado)" },
    { "nome": "Efeito 28", "descricao": "Fratura exposta que não se cura adequadamente, resultando em ossos frágeis e dores constantes. (Cirurgia e reabilitação)" },
    { "nome": "Efeito 29", "descricao": "Paralisia severa causada por uma toxina que endurece os músculos e nervos, restringindo os movimentos. (Cirurgia e fisioterapia)" },
    { "nome": "Efeito 30", "descricao": "Descarga elétrica de alta voltagem que causa danos irreversíveis ao sistema nervoso, afetando reflexos e percepção. (Tratamento especializado)" },
    { "nome": "Efeito 31", "descricao": "Um parasita alienígena que devora o corpo de dentro para fora, levando a uma morte agonizante. (Cirurgia radical)" },
    { "nome": "Efeito 32", "descricao": "Doença degenerativa que faz os sentidos do hospedeiro se deteriorarem lentamente, levando à loucura. (Tratamento experimental)" },
    { "nome": "Efeito 33", "descricao": "Maldição marítima que suga a vitalidade do hospedeiro, fazendo-o desejar se lançar ao oceano. (Exorcismo ou cirurgia)" },
    { "nome": "Efeito 34", "descricao": "Peste rara que consome a energia vital da vítima, deixando-a permanentemente exausta. (Remédio de alta potência)" },
    { "nome": "Efeito 35", "descricao": "Infecção sanguínea avançada que endurece as veias e artérias, tornando a circulação sanguínea dolorosa. (Transfusão completa)" },
    { "nome": "Efeito 36", "descricao": "Um vírus que altera geneticamente seu hospedeiro, tornando-o mais agressivo e menos racional. (Tratamento genético)" },
    { "nome": "Efeito 37", "descricao": "Uma doença parasitária que transforma a pele em escamas duras e quebradiças, dificultando a mobilidade. (Tratamento avançado)" },
    { "nome": "Efeito 38", "descricao": "Infecção causada por um fungo luminescente que se espalha pelo corpo, causando dores e febres intensas. (Antifúngico especializado)" },
    { "nome": "Efeito 39", "descricao": "Síndrome rara que faz os órgãos internos falharem de maneira sequencial, levando a uma morte lenta. (Tratamento emergencial)" },
    { "nome": "Efeito 40", "descricao": "Doença que corrompe o DNA do hospedeiro, causando mutações incontroláveis e crescimento de tumores. (Cirurgia e radioterapia)" }
];

efeitos.forEach((efeito, index) => {
    efeito.addEventListener('click', () => {
        const efeitoSelecionado = dadosEfeitos[index];
        descricao.textContent = efeitoSelecionado.descricao;
        imagem.src = efeitoSelecionado.imagem;
    });
});


