


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
      "Item de contrução nivel 1"
    ];
    const numeroAleatorio = Math.floor(Math.random() * 16) + 1; // Número de 1 a 8
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
    ];
  
    // Embaralhar a lista de eventos para torná-los aleatórios
    const eventosEmbaralhados = eventosSorte.sort(() => Math.random() - 0.5);
  
    // Rolar o dado (1d40)
    const numeroD40 = Math.floor(Math.random() * 40) + 1;
  
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
      "Leal", "Medrosa", "Furioso", "Depressivo", "Cansado",
      "Agitado", "Inteligente", "Invejoso", "Ciumento", "Bipolar",
      "Insano", "Alegre", "Carente", "Corajoso", "Conturbado",
      "Solitário", "Forte", "Calmo", "Obsessivo", "Ansioso"
    ];
  
    let personalidadesSelvagens = [
      "Corajoso", "Medrosa", "Furioso", "Guloso", "Cansado",
      "Agitado", "Inteligente", "Fraco", "Forte", "Burro",
      "Insano", "Alegre", "Carente", "Com sede", "Solitário",
      "Brigão", "Prioritário", "Passivo", "Doente", "Parrudo"
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
      "Evento aleatório local(1d4)", "Drops lendários Marinhos", "Surto de Aether marinho", "Evento de Sorte em domas ou itens"
    ];
  
    // Embaralha a lista de eventos
    const eventosAleatorios = shuffleArray([...eventosIlha]);
  
    // Rola um número aleatório entre 1 e 8 (1d8)
    const numeroEvento = Math.floor(Math.random() * 16) + 1;
  
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
      "Ovo de Dino Comum", "Ovo de Dino Raro", "Ovo de Dino aleatório",
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
      "Arma Tek Quebrada 1/3", "Item Primal", "Item Raro", "Item Industrial",
      "Ovo de Dino herbívoro", "Ovo de Dino carnívoro", "Ovo de Dino elemental",
      "Tradução de um Sigilo", "Item de Espólio Normal", "Item de Espólio Elemental"
    ];
  
    const itensEmbaralhados = itensDrop.sort(() => Math.random() - 0.5);
    const numeroDrop = Math.floor(Math.random() * 10) + 1;
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

