


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
        footer.style.background = "linear-gradient(45deg, #29fd8193,#12dbff80,#29fd8186)"; // Altera a cor do rodapé
    } else {
        footer.style.background = "linear-gradient(45deg, #0f0c29, #302b63, #24243e)"; // Mantém a cor padrão
    }
});

// Array com as imagens e os textos correspondentes
const imagens = [
    { src: "imagens/ciencias_hibridos.jpg", texto: "Dê vida ao impossível! Explore os limites da genética e crie criaturas que jamais existiram. Seja o pioneiro dessa revolução, mas cuidado... nem sempre são apenas animais que surgem, monstros podem despertar do desconhecido.   " },
    { src: "imagens/ciencias_nuclear.jpg", texto: "Domine a sua calamidade. Crie armas nucleares, libere pragas biológicas e testemunhe sua espécie correr rumo à autodestruição. Enquanto o mundo desmorona, uma pergunta ecoa: Se Deus existe, seria essa sua vontade ou nossa ambição desenfreada?" },
    { src: "imagens/ciencias_mistério.webp", texto: "Compreenda o inexistente. Uma força desenfreada impulsiona a corrida entre homem e natureza. A ilha evolui a cada dia: novas criaturas emergem, fenômenos inexplicáveis surgem, e a única resposta que resta... é o desconhecido." },
    { src: "imagens/ciencias_antigos.jpg", texto: "Desvende os antigos mistérios. Explore a história de civilizações perdidas, estude suas criaturas, flora e segredos esquecidos. O que causou sua extinção? E se... eles ainda existissem, esperando para serem encontrados?" }

];

// Seleção dos elementos
const imagemElemento = document.getElementById("imagem");
const textoElemento = document.getElementById("texto");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

let indiceAtual = 0;

// Função para atualizar o carrossel
function atualizarCarrossel() {
    imagemElemento.src = imagens[indiceAtual].src;
    textoElemento.textContent = imagens[indiceAtual].texto;
}

// Eventos para os botões
nextButton.addEventListener("click", () => {
    indiceAtual = (indiceAtual + 1) % imagens.length; // Avança e retorna ao início
    atualizarCarrossel();
});

prevButton.addEventListener("click", () => {
    indiceAtual = (indiceAtual - 1 + imagens.length) % imagens.length; // Retrocede e retorna ao final
    atualizarCarrossel();
});

// Inicializa com a primeira imagem
atualizarCarrossel();

function mudarModal(id) {
    // Muda o fundo do modal
    document.getElementById("modal").setAttribute('data-fundo', id);
    
    // Muda o texto do modal conforme o ícone clicado
    const modalTexto = document.querySelector('.conteudo-modal');
    switch (id) {
        case 1:
            modalTexto.textContent = "Um híbrido no Ark seria o produto da integração genética de diferentes espécies. Ao criar um híbrido, você seleciona duas ou mais criaturas para combiná-las em um novo ser. Esse ser pode herdar características genéticas de seus pais, como força, habilidades especiais, aparência e comportamentos. O processo pode ser complexo, dependendo da compatibilidade genética das criaturas envolvidas, o que adiciona um elemento estratégico ao jogo. Além disso, o híbrido pode ter um alelo dominante, onde certas características de um dos pais são mais prevalentes. A possibilidade de duplicar certas habilidades pode também ser introduzida no processo, ampliando ainda mais as opções estratégicas. O DNA do híbrido pode ser modificado para aumentar a resistência, força ou até criar criaturas com habilidades únicas, baseadas nas habilidades dos pais.";
            break;
        case 2:
            modalTexto.textContent = "Na mecânica de radiação, as fontes de radiação podem ser áreas contaminadas, como cavernas e instalações abandonadas, ou criaturas irradiadas, que emitem radiação ao redor. Quando os jogadores entram nessas zonas ou se aproximam dessas criaturas, começam a sofrer efeitos de radiação, como dano contínuo ao longo do tempo, enfraquecimento das habilidades e perda de saúde. Com a exposição prolongada, o jogador acumula contaminação radioativa, o que pode resultar em efeitos adversos, como a perda permanente de atributos ou mutação, caso a radiação ultrapasse certos limites. A contaminação exige cuidados, como o uso de antídotos, armaduras especiais ou a busca por áreas seguras para reverter os efeitos e proteger o jogador da exposição constante. ";
            break;
        case 3:
            modalTexto.textContent = "Dominar o conhecimento sobre as criaturas da ilha e a flora local, teriam uma vantagem estratégica crucial na luta pela sobrevivência, podendo manipular a biologia das criaturas e as propriedades das plantas para criar curas, venenos e até doenças específicas. Isso permitiria enfraquecer ou até matar criaturas poderosas, e até usar essas doenças contra outros jogadores, criando pragas que destroem suas fontes de recursos. Além disso, ao entender o comportamento e a genética das criaturas, poderiam criar híbridos com habilidades únicas, moldando um exército personalizado de seres adaptados ao ambiente. O controle sobre a flora e fauna também permitiria defender suas bases com plantas venenosas ou criar barreiras naturais. Com isso, os jogadores poderiam transformar a ilha em um campo de batalha biológica, onde o controle da natureza, por meio da manipulação de doenças e a criação de seres poderosos, garantiria seu domínio absoluto sobre o ecossistema e seus inimigos.";
            break;
        case 4:
            modalTexto.textContent = "Entender a natureza da Ilha da Caveira é crucial devido à sua agressividade extrema e às criaturas que desafiam as leis naturais. A ilha abriga seres que possuem características além da biologia convencional, como criaturas capazes de manipular petróleo para criar explosões, alterar sua estrutura corporal consumindo minerais e transformando-os em armaduras, ou até gerar fogo através de órgãos especializados em resistir ao calor. Essas adaptações únicas tornam o ambiente imprevisível e perigoso. Ao dominar o DNA dessas criaturas, ou até ao manipular esses seres geneticamente, os jogadores poderiam não apenas entender o ecossistema, mas também influenciar a fauna local ou criar híbridos poderosos com habilidades adaptativas incríveis, alterando a dinâmica do jogo. Com essas criaturas sob controle ou modificadas, a fauna da ilha e os híbridos poderiam ser moldados para se tornarem armas biológicas de grande poder, abrindo caminho para uma nova era de sobrevivência e dominação na Ilha da Caveira.";
            break;
        case 5:
            modalTexto.textContent = "Criar animais em laboratório pode ser uma forma mais segura e eficiente de controlar o processo de evolução e adaptação na Ilha da Caveira. Ao manipular geneticamente as criaturas em um ambiente controlado, os jogadores podem evitar os riscos imprevisíveis da interação direta com os ecossistemas selvagens, onde mutações e comportamentos instáveis podem resultar em falhas catastróficas. Além disso, os laboratórios permitem a experimentação de novas combinações genéticas sem depender das condições hostis da ilha. Isso também possibilita a criação de híbridos com habilidades específicas, como resistência ao calor ou força aumentada, sem precisar esperar por uma adaptação natural lenta. A manipulação genética controlada também oferece mais precisão, garantindo que as características desejadas sejam preservadas e aprimoradas, oferecendo uma vantagem estratégica sobre criaturas selvagens ou outras facções que dependem de métodos mais arriscados para obter seus próprios recursos biológicos. Dessa forma, a criação de animais em laboratório se torna uma alternativa mais segura, rápida e estratégica para a sobrevivência e dominação na Ilha da Caveira.";
            break;
    }
}
const modalHibridos = document.getElementById("modalHibridos");
const abrirModal = document.getElementById("abrirModalHibridos");
const fecharModal = document.getElementById("fecharModalHibridos");

abrirModal.addEventListener("click", () => {
    modalHibridos.style.display = "flex";
});

fecharModal.addEventListener("click", () => {
    modalHibridos.style.display = "none";
});

// Adicionar mais animais dinamicamente
let contadorAnimais = 2;
document.getElementById("adicionarAnimal").addEventListener("click", () => {
    contadorAnimais++;
    const formulario = document.getElementById("formularioHibridos");
    const novoAnimal = document.createElement("div");
    novoAnimal.classList.add("animal-box");
    novoAnimal.innerHTML = `
        <label for="bicho${contadorAnimais}">Nome do Animal ${contadorAnimais}:</label>
        <input type="text" id="bicho${contadorAnimais}" placeholder="Nome do Animal">

        <label for="compatibilidade${contadorAnimais}">Compatibilidade:</label>
        <select id="compatibilidade${contadorAnimais}">
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
        </select>

        <label for="duplicar${contadorAnimais}">Duplicar DNA?</label>
        <input type="checkbox" id="duplicar${contadorAnimais}">

        <label for="dominante${contadorAnimais}">Este é o DNA dominante?</label>
        <input type="radio" name="dominante" value="animal${contadorAnimais}">
    `;
    formulario.appendChild(novoAnimal);
});

// Calcular DT com base no formulário e DNA de fortificação
document.getElementById("calcularDTHibridos").addEventListener("click", () => {
    let dtBase = 20;
    let totalDt = dtBase;

    let dominanteSelecionado = null;
    const animais = []; // Armazena os nomes e informações dos animais
    const habilidades = []; // Armazena as porcentagens de habilidades

    // Processar cada animal
    for (let i = 1; i <= contadorAnimais; i++) {
        const nomeAnimal = document.getElementById(`bicho${i}`).value.trim();
        const compatibilidade = document.getElementById(`compatibilidade${i}`).value;
        const duplicar = document.getElementById(`duplicar${i}`).checked;
        const dominante = document.querySelector(`input[name="dominante"][value="animal${i}"]`).checked;

        if (!nomeAnimal) continue; // Ignorar animais sem nome

        // Determinar porcentagem base de habilidade
        let porcentagemHabilidade = dominante ? 65 : 50;
        if (duplicar) {
            porcentagemHabilidade *= 2; // Duplicar dobra a chance
        }

        if (dominante) {
            dominanteSelecionado = nomeAnimal;
        }

        // Adicionar compatibilidade ao DT
        if (compatibilidade === "nao") {
            totalDt += 15;
        }

        if (duplicar) {
            totalDt += 10;
        }

        // Registrar informações do animal
        animais.push(nomeAnimal);
        habilidades.push({
            nome: nomeAnimal,
            porcentagem: porcentagemHabilidade,
            dominante: dominante ? "Sim" : "Não",
            duplicado: duplicar ? "Sim" : "Não",
        });
    }

    if (!dominanteSelecionado) {
        alert("Você precisa selecionar o DNA dominante!");
        return;
    }

    // DNA de Fortificação
    const fortificacaoNome = document.getElementById("fortificacaoNome").value.trim();
    const fortificacaoChance = parseInt(document.getElementById("fortificacaoChance").value) || 50;
    const fortificacaoDominante = document.getElementById("fortificacaoDominante").value === "sim";
    let porcentagemFortificacao = fortificacaoDominante ? 65 : 50;

    if (fortificacaoNome) {
        if (fortificacaoChance === 100) {
            porcentagemFortificacao *= 2;
        }

        totalDt += fortificacaoChance === 50 ? 10 : 20;
        if (fortificacaoDominante) {
            totalDt += 5;
        }

        // Registrar o DNA de Fortificação
        habilidades.push({
            nome: fortificacaoNome,
            porcentagem: porcentagemFortificacao,
            dominante: fortificacaoDominante ? "Sim" : "Não",
            duplicado: fortificacaoChance === 100 ? "Sim" : "Não",
        });
    }

    // Atualizar exibição dos resultados
    const junçãoNomes = animais.join(" - ");
    document.getElementById("nomeJunção").textContent = junçãoNomes;

    // Construir exibição de habilidades
    const habilidadesDiv = document.getElementById("habilidadesHibrido");
    habilidadesDiv.innerHTML = ""; // Limpar resultado anterior

    habilidades.forEach((hab) => {
        const habDiv = document.createElement("div");
        habDiv.innerHTML = `
            <p><strong>${hab.nome}</strong></p>
            <p>Chance de Habilidade: ${hab.porcentagem}%</p>
            <p>Dominante: ${hab.dominante}</p>
            <p>Duplicado: ${hab.duplicado}</p>
            <hr>
        `;
        habilidadesDiv.appendChild(habDiv);
    });

    // Exibir resultado do DT Total
    document.getElementById("resultadoDTHibridos").innerHTML = `
        <p><strong>DT Total:</strong> ${totalDt}</p>
        <p><strong>DNA Dominante:</strong> ${dominanteSelecionado}</p>
    `;
});

