

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
        footer.style.background = "linear-gradient(45deg, #552e948f,#5d0964d5,#502b8b8f)"; // Altera a cor do rodapé
    } else {
        footer.style.background = "linear-gradient(45deg, #552e948f,#5d0964d5,#502b8b8f)"; // Mantém a cor padrão
    }
});
let registroDados = [];

function rolarDado(lados) {
  const resultado = Math.floor(Math.random() * lados) + 1;
  let resultadoTexto = `Resultado do dado: ${resultado}`;
  
  // Adiciona funcionalidade especial ao rolar um D20
  if (lados === 20) {
    const dadoInvertido = Math.random() < 0.5 ? "Chance de Normal" : "Chance de invertido";
    const eventoD4 = Math.floor(Math.random() * 4) + 1; // Rola 1d4 escondido
    resultadoTexto += ` | ${dadoInvertido} (1d2: ${Math.floor(Math.random() * 2) + 1})`;
   
  }

  document.getElementById("resultadoDado").textContent = resultadoTexto;

  const dadoInfo = { lados, resultado };
  if (lados !== 20) {
    registroDados.push(dadoInfo);
  }

  const botao = document.querySelector(`.dado-button[data-lados="${lados}"] img`);
  botao.classList.add("girando");
  setTimeout(() => botao.classList.remove("girando"), 1000);
}

  function mostrarRegistro() {
    const modal = document.getElementById("modal-registro");
    const registroDiv = document.getElementById("registro-dados");
    registroDiv.innerHTML = registroDados
      .map(dado => `<p>Dado ${dado.lados} → Resultado: ${dado.resultado}</p>`)
      .join("");
    const total = registroDados.reduce((acc, dado) => acc + dado.resultado, 0);
    registroDiv.innerHTML += `<p><strong>Total de dano: ${total}</strong></p>`;
    modal.style.display = "block";
  }

  function limparRegistro() {
    registroDados = [];
    document.getElementById("registro-dados").innerHTML = "";
  }

  function fecharModal() {
    document.getElementById("modal-registro").style.display = "none";
  }

  function salvarFicha() {
    const ficha = {
      nome: document.getElementById("nome").value,
      personagem: document.getElementById("personagem").value,
      vida: document.getElementById("vida").value,
      sanidade: document.getElementById("sanidade").value,
      armadura: document.getElementById("armadura").value,
      agi: document.getElementById("agi").value,
      for: document.getElementById("for").value,
      int: document.getElementById("int").value,
      pre: document.getElementById("pre").value,
      vig: document.getElementById("vig").value,
      anotacoes: document.getElementById("anotacoes").value,
    };

    localStorage.setItem("ficha", JSON.stringify(ficha));
    alert("Ficha salva com sucesso!");
  }

  // Carregar ficha ao iniciar
  window.onload = () => {
    const fichaSalva = localStorage.getItem("ficha");
    if (fichaSalva) {
      const ficha = JSON.parse(fichaSalva);
      document.getElementById("nome").value = ficha.nome;
      document.getElementById("personagem").value = ficha.personagem;
      document.getElementById("vida").value = ficha.vida;
      document.getElementById("sanidade").value = ficha.sanidade;
      document.getElementById("armadura").value = ficha.armadura;
      document.getElementById("agi").value = ficha.agi;
      document.getElementById("for").value = ficha.for;
      document.getElementById("int").value = ficha.int;
      document.getElementById("pre").value = ficha.pre;
      document.getElementById("vig").value = ficha.vig;
      document.getElementById("anotacoes").value = ficha.anotacoes;
    }
  };
  function rolarEvento() {
    const eventos = ["Normal", "Invertido"];
    const numeroAleatorio = Math.floor(Math.random() * 2) + 1; // Número de 1 a 4
    const eventoAleatorio = eventos[Math.floor(Math.random() * eventos.length)]; // Evento aleatório
  
    // Atualiza o resultado no HTML
    document.getElementById("resultadoEvento").textContent = 
      `Resultado do evento: ${eventoAleatorio} (${numeroAleatorio})`;
  }
  function rolarEvento() {
    const eventos = ["Normal", "Invertido", "Normal", "Normal"];
    const numeroAleatorio = Math.floor(Math.random() * 4) + 1; // Número de 1 a 4
    const eventoAleatorio = eventos[Math.floor(Math.random() * eventos.length)]; // Evento aleatório
  
    // Atualiza o resultado no HTML
    document.getElementById("resultadoEvento").textContent = 
      `Resultado do evento: ${eventoAleatorio} (${numeroAleatorio})`;
  }
  function rolarItem() {
    const itens = [
      "Item Primal",
      "Item Natural",
      "Item Natural Quebrado",
      "Item Primal Quebrado",
      "Item Espólio Raro",
      "Item Espólio Comum",
      "Item Espólio Épico",
      "Item Antigo",
      "Item industrializado",
      "Item de invocação",
      "Item de espólio de Apex",
      "Item de ração animal(1d4)",
      "Item de ritual Arcano",
      "Item de Npc local",
      "Item de Criopod(1d4)",
      "Item de contrução nivel 1",
      "Ligação desconhecida de um telefone(1d4)",
    ];
    const numeroAleatorio = Math.floor(Math.random() * 17) + 1; // Número de 1 a 8
    const itemAleatorio = itens[Math.floor(Math.random() * itens.length)]; // Item aleatório
  
    // Atualiza o resultado no HTML
    document.getElementById("resultadoItem").textContent = 
      `Resultado do item: ${itemAleatorio} (${numeroAleatorio})`;
  }
  function rolarSorte() {
    // Lista de eventos de sorte (com 40 opções)
    const eventosSorte = [
      // Primeiros 20 eventos originais
      "Criatura comum pequena",
      "Criatura comum média",
      "Grupo de criaturas pequenas",
      "Casal de criaturas médias",
      "Predador alfa",
      "Filhotes de alfa",
      "Filhotes de comum",
      "Filhotes de médio",
      "Filhote comum com pai",
      "Filhote médio com pai",
      "Filhote alfa com pai",
      "Ninho de grupo comum",
      "Ninho de grupo médio",
      "Ninho de alfa",
      "Emboscada comum",
      "Emboscada média",
      "Perseguição alfa",
      "Criatura comum ferida",
      "Criatura média ferida",
      "Fezes de criatura",
      // Novos 20 eventos
      "Carcaça de criatura média",
      "Duas criaturas médias brigando",
      "Criatura elemental(1d4)tamanho",
      "Ninho elemental isolado(1d4)tamanho",
      "Criatura diabólica faminta média",
      "Casal faminto(1d4)tamanho",
      "Filhote(1d4) isolado carente",
      "emboscada de aventureiros",
      "Criatura apex dormindo",
      "Criatura apex faminta",
      "Oviraptor roubando ovo aleatório(1d4)tamanho",
      "Enboscada de elemental(1d4)tamanho",
      "Criatura ferida carente com filhote(1d4)tamanho",
      "Caçada de civilização local",
      "Armadilha de caçador local",
      "Dinossauro dormindo(1d4)tamanho",
      "Encontro com Apex Lendário",
      "Dica de alguma progressão na história",
      "Bando desorientado de criaturas(1d2)",
      "A PIOR situação que poderia encontrar",
      "Ligação desconhecida de um telefone(1d4)",
    ];
  
    // Embaralhar a lista de eventos para torná-los aleatórios
    const eventosEmbaralhados = eventosSorte.sort(() => Math.random() - 0.5);
  
    // Rolar o dado (1d40)
    const numeroD40 = Math.floor(Math.random() * 41) + 1;
  
    // Selecionar um evento aleatório do array embaralhado
    const eventoSorte = eventosEmbaralhados[numeroD40 - 1]; // Correspondente ao número do dado
  
    // Atualizar o resultado na página
    const resultado = `Número sorteado (1d40): ${numeroD40}<br>Evento de sorte: ${eventoSorte}`;
    document.getElementById("resultadoSorte").innerHTML = resultado;
  }
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  function rolarPersonalidade() {
    // Listas originais de personalidades
    let personalidadesDomesticos = [
"Leal",
"Medrosa",
"Furioso",
"Depressivo",
"Cansado",
"Agitado",
"Inteligente", 
"Invejoso",
"Ciumento",
"Bipolar",
"Insano", 
"Alegre",
"Carente",
"Corajoso",
"Conturbado",
"Solitário",
"Forte",
"Calmo",
"Obsessivo",
"Ansioso",
"Arrogante",
"Desconfiado",
"Vingativo",
"Nostálgico",
"Indeciso",
"Frustrado",
"Orgulhoso",
"Comodista",
"Tímido",
"Empático",
"Inseguro",
"Solidário",
"Pessimista",
"Extrovertido",
"Introvertido",
"Cauteloso",
"Estressado",
"Inquieto",
"Eufórico",
"Exuberante",
"Gélido",
"Melancólico",
"Humilde",
"Zeloso",
"Perseverante",
"Desesperado",
"Desiludido",
"Desinteressado",
"Arrependido",
"Orgulhoso",
"Determinada",
"Descontrolado",
"Cínico",
"Teimoso",
"Irritado",
"Sarcástico",
"Vulnerável",
"Culpado",
"Conformado",
"Rebelde",
    ];
  
    let personalidadesSelvagens = [
"Corajoso",
 "Medrosa", 
"Furioso",
 "Guloso",
 "Cansado",
"Agitado",
 "Inteligente",
 "Fraco",
 "Forte",
 "Burro",
"Insano",
 "Alegre",
 "Carente",
 "Com sede",
 "Solitário",
"Brigão",
 "Prioritário",
 "Passivo",
 "Doente",
 "Parrudo",
 "Impetuoso",
"Meloso",
"Frágil",
"Altruísta",
"Dúbio",
"Exigente",
"Caridoso",
"Impressionado",
"Inquietante",
"Fatalista",
"Aceitante",
"Grato",
"Distraído",
"Submisso",
"Reprimido",
"Estranho",
"Dedicado",
"Esperançoso",
"Confuso",
"Resiliente",
"Satisfeito",
"Sofredor",
"Cauteloso",
"Imprevisível",
"Cético",
"Entusiástico",
"Solitário",
"Decepcionado",
"Romântico",
"Subestimado",
"Orgulhoso",
"Temeroso",
"Triste",
"Feliz",
"Obstinado",
"Calculista",
"Ansioso",
"Descomprometido",
"Exaltado",

    ];
  
    // Embaralhar as listas
    personalidadesDomesticos = shuffleArray(personalidadesDomesticos);
    personalidadesSelvagens = shuffleArray(personalidadesSelvagens);
  
    // Rolar os dados (1d20 para cada lista)
    const numeroDomestico = Math.floor(Math.random() * 20) + 1;
    const numeroSelvagem = Math.floor(Math.random() * 20) + 1;
  
    // Selecionar as personalidades correspondentes
    const personalidadeDomestico = personalidadesDomesticos[numeroDomestico - 1];
    const personalidadeSelvagem = personalidadesSelvagens[numeroSelvagem - 1];
  
    // Atualizar o resultado na página
    const resultado = `Animal Doméstico (1d20): ${numeroDomestico} - Personalidade: ${personalidadeDomestico}<br>
                       Animal Selvagem (1d20): ${numeroSelvagem} - Personalidade: ${personalidadeSelvagem}`;
    document.getElementById("resultadoPersonalidade").innerHTML = resultado;
  }
  function rolarEventoIlha() {
    // Lista dos eventos da ilha
    const eventosIlha = [
      "Igneous", "Abismoelétrico", "Mortalidade", "Caveira", 
      "Tribal", "Drops", "Aether", "Nada",
      "Vulcão Acordado", "Ciclone no mar", "Enxame de Pestes", "Cavernas iluminadas", 
      "Evento aleatório local(1d4)", "Drops lendários Marinhos", "Surto de Aether marinho",
       "Evento de Sorte em domas ou itens,", "Chuva de aranhas local (1d4)", "Chuva de granizo",
        "Frota fantasma (1d6)", "frota de Orc", "Frota do Barco Infernal", "Todas as Criaturas Agressivas no Local",
    ];
  
    // Embaralha a lista de eventos
    const eventosAleatorios = shuffleArray([...eventosIlha]);
  
    // Rola um número aleatório entre 1 e 8 (1d8)
    const numeroEvento = Math.floor(Math.random() * 22) + 1;
  
    // Seleciona o evento baseado no número
    const eventoSelecionado = eventosAleatorios[numeroEvento - 1];
  
    // Exibe o número do dado e o evento selecionado
    const resultado = `Número (1d8): ${numeroEvento} - Evento: ${eventoSelecionado}`;
    document.getElementById("resultadoEventoIlha").innerHTML = resultado;
  }
  function rolarItemDrop() {
    // Lista de itens de drops
    const itensDrop = [
      "Arma Tek Quebrada 1/3", "Item Primal", "Item Raro", "Item Industrial",
      "Ovo de Dino Comum(1d2)", "Ovo de Dino Raro(1d2)", "Ovo de Dino aleatório(1d2)",
      "Tradução de um Sigilo", "Item de Espólio Normal", "Item de Espólio Elemental"
    ];
  
    // Embaralhar a lista de itens de drops aleatoriamente
    const itensEmbaralhados = itensDrop.sort(() => Math.random() - 0.5);
  
    // Rola um número aleatório entre 1 e 10 (1d10)
    const numeroDrop = Math.floor(Math.random() * 10) + 1;
  
    // Seleciona um item aleatório da lista embaralhada
    const itemSelecionado = itensEmbaralhados[numeroDrop - 1];
  
    // Exibe o número do dado e o item selecionado
    const resultado = `Número (1d10): ${numeroDrop} - Item: ${itemSelecionado}`;
    document.getElementById("resultadoItemDrop").innerHTML = resultado;
  }
  function rolarItemDrop() {
    const itensDrop = [
      "Arma Tek Quebrada 1/3 (1d2)", "Item Primal", "Item Raro", "Item Industrial",
      "Ovo de Dino herbívoro", "Ovo de Dino carnívoro", "Ovo de Dino elemental",
      "Tradução de um Sigilo", "Item de Espólio Normal", "Item de Espólio Elemental",
      "Espólio de Caçador local", "Frutas naturais", 'Ervas de torpor', "Parte de traje"
    ];
  
    const itensEmbaralhados = itensDrop.sort(() => Math.random() - 0.5);
    const numeroDrop = Math.floor(Math.random() * 14) + 1;
    const itemSelecionado = itensEmbaralhados[numeroDrop - 1];
    const resultado = `Número (1d10): ${numeroDrop} - Item: ${itemSelecionado}`;
    document.getElementById("resultadoItemDrop").innerHTML = resultado;
  }
  
  function gerarOvo() {
    const criaturas = [
"T-Rex",
"Abelissauros", "Abelissauros(1d4 Elemental)",
"Acrocantossauros", "Acrocantossauros(1d4 Elemental)",
"Albertossauro", "Albertossauro(1d4 Elemental)",
"Alossauros", "Alossauros(1d4 Elemental)",
"Andreorsachus", "Andreorsachus(1d4 Elemental)",
"Antrorraptor", "Antrorraptor(1d4 Elemental)",
"Antrodemus", "Antrodemus(1d4 Elemental)",
"Antropleura", "Antropleura(1d4 Elemental)",
"Aranha-da-areia", "Aranha-da-areia(1d4 Elemental)",
"Aranha-lobo", "Aranha-lobo(1d4 Elemental)",
"Aranha-saltadora", "Aranha-saltadora(1d4 Elemental)",
"Aranha-viúva-negra", "Aranha-viúva-negra(1d4 Elemental)",
"Argentavis", "Argentavis(1d4 Elemental)",
"arqueopterix", "arqueopterix(1d4 Elemental)",
"Austroraptor", "Austroraptor(1d4 Elemental)",
"Ave-do-Terror", "Ave-do-Terror(1d4 Elemental)",
"Barionix", "Barionix(1d4 Elemental)",
"Carcharodontossauro", "Carcharodontossauro(1d4 Elemental)",
"Carnotauro", "Carnotauro(1d4 Elemental)",
"Celófode", "Celófode(1d4 Elemental)",
"Ceratossauro", "Ceratossauro(1d4 Elemental)",
"Compsognathus", "Compsognathus(1d4 Elemental)",
"Concavenator", "Concavenator(1d4 Elemental)",
"Criolofossauro", "Criolofossauro(1d4 Elemental)",
"Crocodilo", "Crocodilo(1d4 Elemental)",
"Daeodon", "Daeodon(1d4 Elemental)",
"Deinosuchus", "Deinosuchus(1d4 Elemental)",
"Deinonico", "Deinonico(1d4 Elemental)",
"Desmodus-draculai", "Desmodus-draculai(1d4 Elemental)",
"Dilofossauro", "Dilofossauro(1d4 Elemental)",
"Dimorfonte", "Dimorfonte(1d4 Elemental)",
"Dimotrodonte", "Dimotrodonte(1d4 Elemental)",
"dunkleosteus", "dunkleosteus(1d4 Elemental)",
"Elasmosauros", "Elasmosauros(1d4 Elemental)",
"Espinossauro", "Espinossauro(1d4 Elemental)",
"Falosuchus", "Falosuchus(1d4 Elemental)",
"Formiga Soldado Bombeiro", "Formiga Soldado Bombeiro(1d4 Elemental)",
"Formiga-soldado-vermelha", "Formiga-soldado-vermelha(1d4 Elemental)",
"Giganotossauros", "Giganotossauros(1d4 Elemental)",
"Gigantophis", "Gigantophis(1d4 Elemental)",
"gorgossauro", "gorgossauro(1d4 Elemental)",
"helicoprion", "helicoprion(1d4 Elemental)",
"Hererassauros", "Hererassauros(1d4 Elemental)",
"Hiena", "Hiena(1d4 Elemental)",
"Irritator", "Irritator(1d4 Elemental)",
"Kronossauro", "Kronossauro(1d4 Elemental)",
"Lagosta", "Lagosta(1d4 Elemental)",
"Lagosta-boxeadora", "Lagosta-boxeadora(1d4 Elemental)",
"Leão marsupial", "Leão marsupial(1d4 Elemental)",
"liopleurodonte", "liopleurodonte(1d4 Elemental)",
"Lobo-terrível", "Lobo-terrível(1d4 Elemental)",
"Louva-a-deus", "Louva-a-deus(1d4 Elemental)",
"Majugassauro", "Majugassauro(1d4 Elemental)",
"Megalodon", "Megalodon(1d4 Elemental)",
"Megalossauro", "Megalossauro(1d4 Elemental)",
"Meraxes", "Meraxes(1d4 Elemental)",
"Metriacontossauro", "Metriacontossauro(1d4 Elemental)",
"Moros-Intrepidus", "Moros-Intrepidus(1d4 Elemental)",
"Mossasauros", "Mossasauros(1d4 Elemental)",
"Nothosauros", "Nothosauros(1d4 Elemental)",
"Orc-morcego", "Orc-morcego(1d4 Elemental)",
"Orca", "Orca(1d4 Elemental)",
"Oshalaia", "Oshalaia(1d4 Elemental)",
"Oviraptor", "Oviraptor(1d4 Elemental)",
"Parasitas", "Parasitas(1d4 Elemental)",
"Pelagornis", "Pelagornis(1d4 Elemental)",
"peixe-pescador", "peixe-pescador(1d4 Elemental)",
"Pinguim", "Pinguim(1d4 Elemental)",
"Piranha", "Piranha(1d4 Elemental)",
"plesiosauros", "plesiosauros(1d4 Elemental)",
"Poraque", "Poraque(1d4 Elemental)",
"Proceratossauro", "Proceratossauro(1d4 Elemental)",
"Purussauros", "Purussauros(1d4 Elemental)",
"Purlovia", "Purlovia(1d4 Elemental)",
"Pyroraptor", "Pyroraptor(1d4 Elemental)",
"Quetzal", "Quetzal(1d4 Elemental)",
"Rajassauros", "Rajassauros(1d4 Elemental)",
"Rhynoghtinata", "Rhynoghtinata(1d4 Elemental)",
"Sarco-imperador", "Sarco-imperador(1d4 Elemental)",
"Stalker da neve", "Stalker da neve(1d4 Elemental)",
"Stalker marinho", "Stalker marinho(1d4 Elemental)",
"Suchumimus", "Suchumimus(1d4 Elemental)",
"Tapejara", "Tapejara(1d4 Elemental)",
"Tecelão de Orbe", "Tecelão de Orbe(1d4 Elemental)",
"Titanoboa", "Titanoboa(1d4 Elemental)",
"Tropeugnathos", "Tropeugnathos(1d4 Elemental)",
"Trodonte", "Trodonte(1d4 Elemental)",
"Tubarões", "Tubarões(1d4 Elemental)",
"T-Rex", "T-Rex(1d4 Elemental)",
"Velociraptor", "Velociraptor(1d4 Elemental)",
"Xiphactinus", "Xiphactinus(1d4 Elemental)",
"Yutiranos", "Yutiranos(1d4 Elemental)",
"Dodô", "Dodô(1d4 Elemental)",
"Parassauro", "Parassauro(1d4 Elemental)",
"Iguanodonte", "Iguanodonte(1d4 Elemental)",
"Olorotiã", "Olorotiã(1d4 Elemental)",
"Coritossauro", "Coritossauro(1d4 Elemental)",
"Mutaburrassauro", "Mutaburrassauro(1d4 Elemental)",
"Edmontossauro", "Edmontossauro(1d4 Elemental)",
"Maiassauro", "Maiassauro(1d4 Elemental)",
"Galimimo", "Galimimo(1d4 Elemental)",
"Estrutiomimo", "Estrutiomimo(1d4 Elemental)",
"Gigantoraptor", "Gigantoraptor(1d4 Elemental)",
"Morchops", "Morchops(1d4 Elemental)",
"Cavalo", "Cavalo(1d4 Elemental)",
"Alce", "Alce(1d4 Elemental)",
"Archeotiomimus", "Archeotiomimus(1d4 Elemental)",
"Braquiossauro", "Braquiossauro(1d4 Elemental)",
"Brontossauro", "Brontossauro(1d4 Elemental)",
"Amargassauro", "Amargassauro(1d4 Elemental)",
"Argentinossauro", "Argentinossauro(1d4 Elemental)",
"Titãnossauro", "Titãnossauro(1d4 Elemental)",
"Apatossauro", "Apatossauro(1d4 Elemental)",
"Diplodoco", "Diplodoco(1d4 Elemental)",
"Mamequiassauro", "Mamequiassauro(1d4 Elemental)",
"Nigersauro", "Nigersauro(1d4 Elemental)",
"Dreadnoughtus", "Dreadnoughtus(1d4 Elemental)",
"Camarassauro", "Camarassauro(1d4 Elemental)",
"Girafotitã", "Girafotitã(1d4 Elemental)",
"Paraceratério", "Paraceratério(1d4 Elemental)",
"Sea Treader", "Sea Treader(1d4 Elemental)",
"Trike", "Trike(1d4 Elemental)",
"Torossauro", "Torossauro(1d4 Elemental)",
"Chasmossauro", "Chasmossauro(1d4 Elemental)",
"Dracorex", "Dracorex(1d4 Elemental)",
"Nasuceratops", "Nasuceratops(1d4 Elemental)",
"Sinoceratops", "Sinoceratops(1d4 Elemental)",
"Estiracossauro", "Estiracossauro(1d4 Elemental)",
"Estegossauro", "Estegossauro(1d4 Elemental)",
"Kentrossauro", "Kentrossauro(1d4 Elemental)",
"Nodossauro", "Nodossauro(1d4 Elemental)",
"Anquilossauro", "Anquilossauro(1d4 Elemental)",
"Tatu", "Tatu(1d4 Elemental)",
"Castor", "Castor(1d4 Elemental)",
"Carbonemy", "Carbonemy(1d4 Elemental)",
"Mamute", "Mamute(1d4 Elemental)",
"Rinoceronte", "Rinoceronte(1d4 Elemental)",
"Therezinossauro", "Therezinossauro(1d4 Elemental)",
"Magatério", "Magatério(1d4 Elemental)",
"Chalicotério", "Chalicotério(1d4 Elemental)",
"Basilossauro", "Basilossauro(1d4 Elemental)",
"Golfinho", "Golfinho(1d4 Elemental)",
"Baleia", "Baleia(1d4 Elemental)",
"Foca", "Foca(1d4 Elemental)",
"Ichitiossauro", "Ichitiossauro(1d4 Elemental)",
"Água-viva", "Água-viva(1d4 Elemental)",
"Manta", "Manta(1d4 Elemental)",
"Grifo", "Grifo(1d4 Elemental)",
"Sinomacrops", "Sinomacrops(1d4 Elemental)",
"Listrossauro", "Listrossauro(1d4 Elemental)",
"Mariposa", "Mariposa(1d4 Elemental)",
"Porco", "Porco(1d4 Elemental)",
"Gado comum", "Gado comum(1d4 Elemental)",
"Pulgão", "Pulgão(1d4 Elemental)",
"Gorgulho", "Gorgulho(1d4 Elemental)",
"Abelha", "Abelha(1d4 Elemental)",
"Inseto Escudo Verde", "Inseto Escudo Verde(1d4 Elemental)",
"Crabsquid", "Crabsquid(1d4 Elemental)",
"leedsichthys", "leedsichthys(1d4 Elemental)",
"Archelon", "Archelon(1d4 Elemental)",
"Coruja das neves", "Coruja das neves(1d4 Elemental)",
"Deynocheirus", "Deynocheirus(1d4 Elemental)",
"Yi ling", "Yi ling(1d4 Elemental)",
        ];
  
        const criaturaSelecionada = criaturas[Math.floor(Math.random() * criaturas.length)];
        const resultado = `Ovo gerado: Ovo de ${criaturaSelecionada}`;
        document.getElementById("resultadoGerarOvo").innerHTML = resultado;
    }
  
  function rolarItemSummon() {
    const itensSummon = [
"Colar de Presas Inquebráveis - Item que invoca Indominus Rex",
"Fóssil com Escamas Eternas - Item que invoca Espinossauro Ger 3",
"Concha Ancestral dos Abismos - Item que invoca Tusotheuthis",
"Coroa da Fera das Profundezas - Item que invoca Reaper-leviatã",
"Cristal de Dragões Abissais - Item que invoca Dragão-leviatã",
"Véu do Espectro Submerso - Item que invoca Fantasma-leviatã",
"Amuleto da Sombra Profunda - Item que invoca Sombra-leviatã",
"Garra Gélida da Fera - Item que invoca Chelicerate",
"Runa do Guardião de Algas - Item que invoca Imperador",
"Orbe de Coral Luminoso - Item que invoca Leviatã-Coral",
"Pluma Ardente - Item que invoca Embermane",
"Tempestade da Garra do Céu - Item que invoca Stormc,law",
"Olho do Relâmpago - Item que invoca Drask",
"Raiz da Floresta Eterna - Item que invoca Koshai",
"Garra do Caçador Sombrio - Item que invoca Riftstalkear",
"Mandíbula Serrada do Predador - Item que invoca Gnasher",
"Gelo Vivo - Item que invoca Pangar",
"Carapaça do Inferno - Item que invoca Hellion",
"Cristal da Tempestade - Item que invoca Nayzaga",
"Runas Estelares - Item que invoca Valomyr",
"Pluma Fantasma - Item que invoca Shrike",
"Ídolo da Fera da Escuridão - Item que invoca Skullcrawler",
"Pedra do Gigante Imortal - Item que invoca Golias",
"Fragmento do Tentáculo Ancestral - Item que invoca Kraken",
"Corrente Espectral - Item que invoca Espectro",
"Estátua da Deusa da Pedra - Item que invoca Górgona",
"Fragmento de Rocha Colossal - Item que invoca Behemoth",
"Gancho da Jaula Viva - Item que invoca Peixe-jaula",
"Troféu do Colosso - Item que invoca Gargantua",
"Colar de Gelo Vivo - Item que invoca Rudy",
"Chifre Distorcido - Item que invoca Carnotauro Rex",
"Amuleto da Ruína Infinita - Item que invoca Desolatitan",
"Garra do Devorador de Mundos - Item que invoca Giga Ger 2",
"Fragmento do Deserto Infinito - Item que invoca Verme da Areia",
"Pluma do Rei Alado - Item que invoca Rodan",
"Relíquia do Deus das Sombras - Item que invoca Camazotz",
"Garra do Predador Primordial - Item que invoca Acro Ger 2",
"Amuleto da Lua Sombria - Item que invoca Cão da Lua",
"Coroa do Mestre das Chamas - Item que invoca Pyromane",
"Troféu de Chifres Ardentes - Item que invoca Dodorex",
    ];

    const itensEmbaralhados = itensSummon.sort(() => Math.random() - 0.5);
    const numeroSummon = Math.floor(Math.random() * 10) + 1;
    const itemSelecionado = itensEmbaralhados[numeroSummon - 1];
    const resultado = `Número (1d10): ${numeroSummon} - Item: ${itemSelecionado}`;
    document.getElementById("resultadoItemSummon").innerHTML = resultado;
  }
  function mostrarTranstorno() {
    // Lista de transtornos
    const transtornos = [
"Transtorno de Estresse Pós-Traumático",
"Transtorno Dissociativo",
"Transtorno Obsessivo-Compulsivo",
"Transtorno de Ansiedade Generalizada",
"Depressão Maior",
"Transtorno de Apego Reativo",
"Cleptomania",
"Tricotilomania",
"Automutilação",
"Distúrbios Alimentares",
"Abuso de Substâncias",
"Pensamento Catastrófico",
"Sentimento de Culpa Excessiva",
"Despersonalização",
"Desrealização",
"Paranoia",
"Transtorno de Personalidade Borderline",
"Transtorno de Personalidade Esquizotípica",
"Distorção de Identidade",
"Síndrome de Estocolmo",
"Alexitimia",
"Hipocondria",
"Fobia Social",
"Anedonia",
"Trauma de Sobrevivente",
"Efeito Pós-Terror",
"Perturbação Mental",
"Desconexão Emocional",
"Fobia de Escuridão",
"Desordem de Identidade",
"Medo Paralisante",
"Despersonalização",
"Síndrome do Sobrevivente",
"Tensão Psíquica",
"Pesadelo Contínuo",
"Desespero Incontrolável",
"Perda de Realidade",
"Obsessão pela Morte",
"Distorção Temporal",
"Reflexo de Medo",
"Reatividade Pós-Traumática",
"Coração Congelado",
"Pânico Insano",
"Visões Angustiantes",
"Afastamento Emocional",
"Síndrome da Fuga",
"Vozes na Mente",
"Tragédia Indizível",
"Terror Congelante",
"Desconfiança Incessante",
"Pavor de Enganos",
"Esquecimento Forçado",
"Desintegração Psicológica",
"Ecos de Horror",
"Sombra do Passado",
"Quebra da Lógica",
"Estigmatização do Medo",
"Pesadelo Vivo",
"Deformidade Mental",
"Distorção de Memória",
"Desespero Irreversível",
"Isolamento Sensorial",
"Instinto de Autopreservação Pervertido",
"Efeito de Apatia Pós-Horror",
"Síndrome da Realidade Distante",
"Surto de Colapso Emocional",
"Visões Obsessivas",
"Coração Em Ruínas",
"Perda de Contato com a Verdade",
"Dúvida Perpétua",
"Fobia do Conhecido",
"Vazio Existencial",
"Cegueira Psicológica",
"Pavor Imortal",
    ];
  
    // Seleciona um transtorno aleatório
    const transtornoAleatorio = transtornos[Math.floor(Math.random() * transtornos.length)];
  
    // Exibe o transtorno no elemento de resultado
    document.getElementById("resultadoTranstorno").innerHTML = transtornoAleatorio;
  }
  function sortearFuncaoNPC() {
    // Lista de funções ou trabalhos sem duplicatas
    const funcoes = [
        "Domador de Criaturas", "Construtor", "Ferreiro", "Explorador", "Agricultor",
        "Caçador", "Minerador", "Alquimista", "Navegador", "Cartógrafo",
        "Cientista Genético", "Treinador de Combate", "Mecânico Tek",
        "Domínio de Arco e Flecha", "Mestre em Diplomacia", "Tolerância ao Clima",
        "Navegação Estelar", "Resistência Física", "Empatia com Criaturas",
        "Senso de Orientação", "Especialista em Armadilhas", "Guarda-Costas",
        "Comerciante", "Guia de Cavernas", "Artilheiro", "Pesquisador de Relíquias",
        "Médico Tribal", "Treinador de Voadores", "Guarda de Portão", "Enfrentar Chefes",
        "Explorar Ruínas Antigas", "Participar de Guerra de Tribos",
        "Domesticar Criaturas Épicas", "Sobrevivência Extrema", "Missões de Resgate",
        "Construção de Estruturas Avançadas", "Decifrar Sigilos e Artefatos",
        "Explorador de Biomas", "Domador de Criaturas Alpha", "Mestre das Ruínas",
        "Criadouro de Dinossauros", "Tecelão de Redes", "Especialista em Armadilhas de Selva",
        "Líder de Expedições", "Especialista em Defesa de Bases", "Mestre de Engenharia Avançada",
        "Criador de Artefatos", "Mestre de Cerco", "Especialista em Submersíveis",
        "Criador de Modificações Genéticas", "Mercador de Artefatos Raros",
        "Mestre em Venenos Naturais", "Especialista em Cristais", "Domador de Criaturas Voadoras",
        "Curandeiro de Tribo", "Mestre em Armadilhas Explosivas", "Especialista em Recursos Raros",
        "Historiador de Tribos Antigas", "Rastreador de Criaturas Raras",
        "Especialista em Sobrevivência Aquática", "Operador de Balistas",
        "Preparador de Rituais", "Guardião de Relíquias Perdidas",
        "Especialista em Mecanismos de Defesa", "Pesquisador de Fósseis",
        "Criador de Rotas Seguras", "Mestre em Táticas de Combate Tribal",
        "Engenheiro de Estruturas Subterrâneas", "Perito em Toxinas e Antídotos",
        "Especialista em Recolhimento de Espólios", "Criador de Pontes Suspensas",
        "Montador de Mechas Tek", "Domador de Criaturas Marinhas", "Especialista em Camuflagem",
        "Instrutor de Técnicas de Fuga", "Cultivador de Plantas Medicinais",
        "Navegador de Tempestades", "Instrutor de Técnicas de Escalada",
        "Mestre em Técnicas de Caça Noturna",
        "Engenheiro de Máquinas a Vapor", "Operador de Fábrica", "Minerador de Carvão", 
        "Ferreiro Industrial", "Operador de Tecelagem", "Mestre de Fundição", 
        "Operador de Caldeiras", "Construtor de Trilhos", "Operador de Guindaste", 
        "Fabricante de Engrenagens", "Projetista de Motores", "Mecânico de Locomotivas", 
        "Técnico em Eletricidade", "Supervisor de Linhas de Produção", 
        "Cortador de Madeira", "Trabalhador Ferroviário", "Operador de Fornalhas", 
        "Maquinista", "Inventor de Ferramentas", "Construtor de Navios", 
        "Trabalhador de Siderúrgica", "Soldador Industrial", "Padeiro de Grande Produção", 
        "Ceramista Industrial", "Engenheiro Civil", "Engenheiro Hidráulico", 
        "Montador de Máquinas", "Especialista em Polimento de Metais", 
        "Engenheiro Químico", "Trabalhador de Refinarias", "Gestor de Fábrica", 
        "Inventor de Equipamentos", "Estivador de Portos", "Maquinista de Escavadoras", 
        "Operador de Serras Industriais", "Projetista de Máquinas Pesadas", 
        "Supervisor de Construção", "Trabalhador de Usinas", "Operador de Laminadoras", 
        "Carregador de Vagões", "Fabricante de Motores a Vapor", "Artesão de Mobiliário", 
        "Técnico em Hidráulica", "Desenhista de Plantas Industriais", 
        "Metalúrgico", "Escavador de Túneis", "Especialista em Construção de Pontes", 
        "Transportador de Materiais", "Pesquisador de Combustíveis Fósseis", 
        "Especialista em Sistemas de Ventilação", "Engenheiro de Iluminação Pública", 
        "Operador de Máquinas Têxteis", "Instalador de Linhas de Telégrafo", 
        "Trabalhador de Docas", "Fabricante de Tubulações", 
        "Mecânico de Ferramentas Pesadas", "Administrador de Fábricas", 
        "Designer de Ferramentas Industriais", "Químico Industrial", 
        "Pesquisador de Novos Materiais", "Minerador de Ferro", "Engenheiro de Mineração", 
        "Mestre em Soldagem", "Montador de Pontes Metálicas", "Consertador de Motores", 
        "Operador de Máquinas de Corte", "Engenheiro de Infraestruturas Urbanas", 
        "Planejador Urbano", "Fabricante de Caldeiras", "Operador de Prensas Industriais", 
        "Especialista em Extração de Recursos", "Gerente de Estoque Industrial", 
        "Pesquisador de Energia Renovável Inicial", "Engenheiro de Drenagem Urbana",
        "Ferreiro Mestre", "Minerador de Gemas Preciosas", "Guardião do Salão das Montanhas",
         "Construtor de Túneis", "Engenheiro de Máquinas a Vapor", "Mestre Cervejeiro",
          "Escultor de Pedra Ancestral", "Mercador de Metais Raros", "Guardião do Tesouro da Tribo",
           "Inventor de Armamentos Pesados",
           "Guerreiro Selvagem", "Domador de Bestas", "Forjador de Armas Brutais", "Líder de Clãs Bárbaros",
            "Xamã Espiritual", "Caçador de Presas Gigantes", "Mestre em Emboscadas", "Criador de Táticas Tribais",
             "Espreitador das Sombras", "Rasgador de Almas",
             "Guardião de Masmorras", "Observador de Portais", "Espreitador Abissal", "Guardião de Relíquias Perdidas",
              "Arauto do Caos", "Ceifador de Almas", "Criatura Guardiã de Biomas", "Semeador de Pesadelos", "Tentáculo do Vazio",
               "Guardião de Cristais Ancestrais",
               "Cientista de Tecnologia Antiga", "Explorador de Galáxias Perdidas", "Guardião de Conhecimentos Perdidos", "Emissário do Conselho Estelar", "Protetor de Civilizações Emergentes", "Engenheiro de Naves-Mãe", "Caçador de Recursos Cósmicos", "Criador de Artefatos Estelares", "Mestre de Manipulação Temporal", "Operador de Drones Biomecânicos",
               "Mestre das Lâminas Ocultas", "Espião das Nações", "Infiltrador de Fortalezas", "Especialista em Táticas Silenciosas", "Sabotador de Máquinas", "Ladrão de Segredos", "Caçador de Alvos Marcados", "Agente Duplo", "Mercenário das Sombras", "Executor Fantasma",
               "Campeão da Luz", "Guardião dos Fracos", "Desbravador de Terras Selvagens", "Caçador de Recompensas", "Cavaleiro Andarilho", "Salvador de Vilas Perdidas", "Explorador de Mundos Distantes", "Mestre dos Mapas Perdidos", "Defensor de Reinos Antigos", "Caçador de Títulos Heroicos",
               "Shifter de Bestas Selvagens", "Mutante de Ambientes Hostis", "Guardião das Formas Perdidas", "Explorador de Identidades", "Camaleão de Civilizações", "Mestre da Metamorfose", "Protetor da Harmonia Biológica", "Desbravador das Essências Naturais", "Ceifador das Formas", "Moldador de Aparências",
               "Guardião Animado", "Construto Vivo", "Arauto dos Artefatos", "Animal de Suporte", "Montaria Lendária", "Espírito Encantado", "Arma com Consciência", "Mascote de Aventura", "Sentinela Ancestral", "Protetor Fantasmagórico",
              "Drone de Batalha", "Mecânico de Inteligências", "Engenheiro de Sistemas Avançados", "Sentinela Autônoma", "Protetor de Zonas Industriais", "Combatente Cibernético", "Criador de Redes de Defesa", "Guardião de Dados Críticos", "Androide Explorador", "Mestre em Automação Total"
    ];

    // Embaralha a lista para maior aleatoriedade
    const funcoesEmbaralhadas = funcoes.sort(() => Math.random() - 0.5);

    // Sorteia uma função da lista embaralhada
    const funcaoSorteada = funcoesEmbaralhadas[Math.floor(Math.random() * funcoesEmbaralhadas.length)];

    // Exibe a função sorteada
    document.getElementById("resultadoFuncao").innerHTML = `Função sorteada: ${funcaoSorteada}`;
}
  function mostrarMinerio() {
    // Lista de minérios
    const minerios = [
"Ouro",
"Prata",
"Cobre",
"Ferro",
"Níquel",
"Titanita",
"Manganês",
"Zinco",
"Metal Primário",

  
    ];

    // Seleciona um minério aleatório
    const minerioAleatorio = minerios[Math.floor(Math.random() * minerios.length)];
    
    // Rola um número aleatório entre 1 e 4 (1d4)
    const quantidade = Math.floor(Math.random() * 4) + 1;
    
    // Exibe o minério e a quantidade
    document.getElementById("resultadoMinerio").innerHTML = `Minério: ${minerioAleatorio} (Quantidade: 1d4 = ${quantidade})`;
  }
  function mostrarMinerioRaro() {
    // Lista de minérios raros
    const mineriosRaros = [
      "Platina", 
      "Diamante", 
      "Esmeralda", 
      "Rubi", 
      "Safira", 
      "Urânio", 
      "Titânio", 
      "Lítio", 
      "Obsidiana", 
      "Âmbar", 
      "Metal Primário", 
      "Cobalto", 
      "Cianita",
    ];
      // Seleciona um minério raro aleatório
      const minerioAleatorio = mineriosRaros[Math.floor(Math.random() * mineriosRaros.length)];
    
      // Rola um número aleatório entre 1 e 4 (1d4)
      const quantidade = Math.floor(Math.random() * 4) + 1;
      
      // Exibe o minério raro e a quantidade
      document.getElementById("resultadoMinerioRaro").innerHTML = `Minério Raro: ${minerioAleatorio} (Quantidade: 1d4 = ${quantidade})`;
    }
    function mostrarMinerioLendario() {
      // Lista de minérios lendários
      const mineriosLendarios = [
      'Cube de Ion',
      "Eletrocristal", 
      'Cristal de Mana',
      'Cristal de Sangue',
      'Magma igneo',
      'Elemento',
      'Pedra hyoo carga',
      'Concha do mar',
      'Minério da caveira',
      'Gelo verdadeiro',
      'Veia de Aether',
      'Netherite',
      "Pedra Colossal"
      ];
    
      // Seleciona um minério lendário aleatório
      const minerioAleatorio = mineriosLendarios[Math.floor(Math.random() * mineriosLendarios.length)];
    
      // Rola um número aleatório entre 1 e 3 (1d3)
      const quantidade = Math.floor(Math.random() * 3) + 1;
    
      // Exibe o minério lendário e a quantidade
      document.getElementById("resultadoMinerioLendario").innerHTML = 
        `Minério Lendário: ${minerioAleatorio} (Quantidade: 1d3 = ${quantidade})`;
    }

