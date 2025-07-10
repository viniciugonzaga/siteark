// ========================
// Menu (Navbar)
// ========================
const menu = document.getElementById("diceMenu"); // Menu de dados
const openMenuButton = document.getElementById("openMenu"); // Botão para abrir o menu
const closeMenuButton = document.getElementById("closeMenu"); // Botão para fechar o menu
const diceSelect = document.getElementById("diceSelect"); // Seleção do tipo de dado
const rollDiceButton = document.getElementById("rollDice"); // Botão para rolar dado
const clearRollsButton = document.getElementById("clearRolls"); // Botão para limpar rolagens
const rollList = document.getElementById("rollList"); // Lista de rolagens
const totalDisplay = document.getElementById("total"); // Exibição do total geral
const playerNameInput = document.getElementById("playerName"); // Entrada do nome do jogador

// Variáveis globais
let playerScores = {}; // Armazena as somas dos dados por jogador

// Função para abrir o menu
if (openMenuButton) { // Adicionado verificação para garantir que o elemento existe
    openMenuButton.addEventListener("click", () => {
        if (menu) menu.classList.remove("hidden"); // Verifica se menu existe
    });
}

// Função para fechar o menu
if (closeMenuButton) { // Adicionado verificação
    closeMenuButton.addEventListener("click", () => {
        if (menu) menu.classList.add("hidden"); // Verifica se menu existe
    });
}

// ========================
// Função de rolagem de dados
// ========================
if (rollDiceButton) { // Adicionado verificação
    rollDiceButton.addEventListener("click", () => {
        const playerName = playerNameInput ? playerNameInput.value.trim() : ''; // Nome do jogador
        const diceType = diceSelect ? parseInt(diceSelect.value) : 0; // Tipo de dado selecionado

        // Validação: O nome do jogador deve ser preenchido
        if (!playerName) {
            alert("Por favor, insira o nome do jogador!");
            return;
        }
        if (diceType === 0) { // Validação simples para tipo de dado
            alert("Por favor, selecione um tipo de dado!");
            return;
        }

        const roll = Math.floor(Math.random() * diceType) + 1; // Rolagem aleatória do dado

        // Atualiza o total do jogador
        if (!playerScores[playerName]) {
            playerScores[playerName] = 0; // Inicializa o jogador, caso não exista
        }
        playerScores[playerName] += roll;

        // Adiciona o registro da rolagem na lista
        if (rollList) { // Adicionado verificação
            const listItem = document.createElement("li");
            listItem.textContent = `${playerName} = D${diceType}: ${roll} (Total: ${playerScores[playerName]})`;
            rollList.appendChild(listItem);
        }

        // Atualiza o total geral
        if (totalDisplay) { // Adicionado verificação
            totalDisplay.textContent = `Total geral: ${Object.values(playerScores).reduce((a, b) => a + b, 0)}`;
        }
    });
}

// ========================
// Limpar registro de rolagens
// ========================
if (clearRollsButton) { // Adicionado verificação
    clearRollsButton.addEventListener("click", () => {
        playerScores = {}; // Reinicia os totais por jogador
        if (rollList) rollList.innerHTML = ""; // Limpa a lista de rolagens
        if (totalDisplay) totalDisplay.textContent = "Total geral: 0"; // Zera o total exibido
    });
}

// Função que redireciona com base no argumento recebido
function goToPage(page) {
    window.location.href = page; // Redireciona para a página passada como argumento
}

// ========================
// Animações de Elementos
// ========================
document.addEventListener("DOMContentLoaded", function () {
    const animatedElements = document.querySelectorAll(
        ".animated-element, .section-wrapper",
    );
    const animatedTexts = document.querySelectorAll(".animated-text");

    // Intersection Observer para animações de entrada de divs e sections
    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animation = element.getAttribute("data-animation");
                    if (animation) {
                        element.style.opacity = "1"; // Torna visível para a animação
                        element.style.animationName = animation;
                        element.style.animationDuration = element.dataset.duration || "1s"; // Permite duração customizada
                        element.style.animationDelay = element.dataset.delay || "0s"; // Permite delay customizado
                    }
                    observer.unobserve(element); // Para de observar depois que a animação é acionada
                }
            });
        },
        {
            threshold: 0.1, // A animação dispara quando 10% do elemento está visível
        },
    );

    animatedElements.forEach((element) => {
        observer.observe(element);
    });

    animatedTexts.forEach((textElement) => {
        if (textElement.dataset.animation === "glowing-sweep-text") {
            // A animação glowingSweep já é controlada via CSS e 'infinite'
        } else if (textElement.dataset.animation === "flicker-text") {
            // A animação flickerText é puramente CSS e 'infinite'
        }
    });
});

// ========================
// Funções de Modal (Gerais)
// ========================

// Função para abrir um modal específico pelo ID
function abrirModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add("active");
    }
}

// Função para fechar um modal específico pelo ID
function fecharModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove("active");
    }
}

// Fecha qualquer modal que for clicado fora do conteúdo (se o elemento clicado tiver a classe 'modal')
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
        e.target.classList.remove("active");
    }
});

// Fecha qualquer modal com a tecla ESC
window.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        const activeModals = document.querySelectorAll(".modal.active");
        activeModals.forEach(modal => modal.classList.remove("active"));
    }
});

// ======================================================
// FILTRO DE CARDS DE RITUAIS E PACTOS
// ======================================================

// Variável de estado para a classe de card atualmente visível ('ritual' ou 'pacto')
let currentClassFilter = "ritual"; // Começa mostrando rituais por padrão

/**
 * Atualiza a exibição de todos os cards com base nos filtros ativos.
 * Esta é a função central que determina quais cards são visíveis.
 * @param {string} activeClass - A classe principal a ser exibida ('ritual' ou 'pacto').
 * @param {string} activeType - O tipo de card a ser exibido ('todos' ou um tipo específico como 'dano', 'normal', 'Acordo').
 * @param {string} searchTerm - O texto para buscar no nome do card.
 */
function updateCardDisplay(activeClass, activeType, searchTerm = "") {
    const cards = document.querySelectorAll(".cards-wrapper .card");
    searchTerm = searchTerm.toLowerCase(); // Converte o termo de busca para minúsculas para comparação

    cards.forEach((card) => {
        const cardClass = card.dataset.classe; // 'ritual' ou 'pacto'
        const cardType = card.dataset.tipo;     // 'normal', 'brutal', 'dano', 'Acordo', etc.
        const cardNameElement = card.querySelector("h3 span[data-name]") || card.querySelector("h3");
        const cardName = cardNameElement ? cardNameElement.innerText.toLowerCase() : "";

        // Condições para exibir o card:
        // 1. O card deve pertencer à classe ativa (ritual ou pacto).
        const matchesClass = cardClass === activeClass;
        // 2. O card deve corresponder ao tipo de filtro ou se o filtro for 'todos'.
        const matchesType = (activeType === "todos" || cardType === activeType);
        // 3. O nome do card deve incluir o termo de busca (se houver).
        const matchesSearch = (searchTerm === "" || cardName.includes(searchTerm));

        // Se todas as condições forem verdadeiras, exibe o card; caso contrário, esconde.
        if (matchesClass && matchesType && matchesSearch) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

/**
 * Configura a interface e filtra os cards para mostrar apenas "Rituais".
 */
function mostrarRituais() {
    currentClassFilter = "ritual"; // Define o filtro de classe global como 'ritual'
    const tituloPrincipal = document.getElementById("tituloPrincipal");
    if (tituloPrincipal) tituloPrincipal.innerText = "Rituais"; // Atualiza o título

    // Atualiza a classe 'active' nos botões de Rituais/Pactos
    const btnRituais = document.getElementById("btnRituais");
    const btnPactos = document.getElementById("btnPactos");
    if (btnRituais) btnRituais.classList.add("active");
    if (btnPactos) btnPactos.classList.remove("active");

    // Mostra o grupo de filtros de rituais e esconde o de pactos
    const filtrosRituais = document.getElementById("filtrosRituais");
    const filtrosPactos = document.getElementById("filtrosPactos");
    if (filtrosRituais) filtrosRituais.style.display = "flex";
    if (filtrosPactos) filtrosPactos.style.display = "none";

    // Mostra a barra de pesquisa de rituais e esconde a de pactos
    const searchRituais = document.getElementById("searchRituais");
    const searchPactos = document.getElementById("searchPactos");
    if (searchRituais) searchRituais.style.display = "block";
    if (searchPactos) searchPactos.style.display = "none";

    // Pega o tipo de filtro atualmente ativo na seção de rituais (o botão com 'active')
    const activeRitualTypeButton = document.querySelector('#filtrosRituais button.active');
    const typeFilterForRituais = activeRitualTypeButton ? activeRitualTypeButton.dataset.tipo : 'todos';

    // Pega o termo de busca atual da barra de pesquisa de rituais
    const searchTermForRituais = searchRituais ? searchRituais.value : '';

    // Aplica os filtros para exibir os cards corretos
    updateCardDisplay(currentClassFilter, typeFilterForRituais, searchTermForRituais);
}

/**
 * Configura a interface e filtra os cards para mostrar apenas "Pactos".
 */
function mostrarPactos() {
    currentClassFilter = "pacto"; // Define o filtro de classe global como 'pacto'
    const tituloPrincipal = document.getElementById("tituloPrincipal");
    if (tituloPrincipal) tituloPrincipal.innerText = "Pactos"; // Atualiza o título

    // Atualiza a classe 'active' nos botões de Rituais/Pactos
    const btnRituais = document.getElementById("btnRituais");
    const btnPactos = document.getElementById("btnPactos");
    if (btnPactos) btnPactos.classList.add("active");
    if (btnRituais) btnRituais.classList.remove("active");

    // Mostra o grupo de filtros de pactos e esconde o de rituais
    const filtrosRituais = document.getElementById("filtrosRituais");
    const filtrosPactos = document.getElementById("filtrosPactos");
    if (filtrosRituais) filtrosRituais.style.display = "none";
    if (filtrosPactos) filtrosPactos.style.display = "flex";

    // Mostra a barra de pesquisa de pactos e esconde a de rituais
    const searchRituais = document.getElementById("searchRituais");
    const searchPactos = document.getElementById("searchPactos");
    if (searchRituais) searchRituais.style.display = "none";
    if (searchPactos) searchPactos.style.display = "block";

    // Pega o tipo de filtro atualmente ativo na seção de pactos (o botão com 'active')
    const activePactoTypeButton = document.querySelector('#filtrosPactos button.active');
    const typeFilterForPactos = activePactoTypeButton ? activePactoTypeButton.dataset.tipo : 'todos';

    // Pega o termo de busca atual da barra de pesquisa de pactos
    const searchTermForPactos = searchPactos ? searchPactos.value : '';

    // Aplica os filtros para exibir os cards corretos
    updateCardDisplay(currentClassFilter, typeFilterForPactos, searchTermForPactos);
}

/**
 * Filtra os cards por tipo (ex: 'dano', 'normal', 'Acordo') dentro da categoria ativa.
 * @param {string} tipo - O valor do data-tipo do card ('todos' ou tipo específico).
 */
function filtrarCards(tipo) {
    // Determine qual container de filtros está ativo para remover a classe 'active' corretamente
    const activeFilterContainerId = currentClassFilter === "ritual" ? "filtrosRituais" : "filtrosPactos";
    document.querySelectorAll(`#${activeFilterContainerId} button`).forEach((btn) => btn.classList.remove("active"));

    // Encontra o botão clicado para adicionar a classe 'active' a ele.
    // Usamos um seletor mais específico para garantir que o botão correto seja ativado.
    const clickedButton = document.querySelector(`#${activeFilterContainerId} button[onclick*="filtrarCards('${tipo}')"]`);
    if (clickedButton) {
        clickedButton.classList.add("active");
    }

    // Pega o termo de busca atual da barra de pesquisa ativa
    const searchTerm = currentClassFilter === "ritual"
        ? (document.getElementById("searchRituais")?.value || '')
        : (document.getElementById("searchPactos")?.value || '');

    // Aplica os filtros com a nova seleção de tipo
    updateCardDisplay(currentClassFilter, tipo, searchTerm);
}

// Event Listeners para as barras de pesquisa
const searchPactosInput = document.getElementById("searchPactos");
if (searchPactosInput) {
    searchPactosInput.addEventListener("input", (e) => {
        // Só atualiza se a aba de pactos estiver visível
        if (currentClassFilter === "pacto") {
            const activePactoTypeButton = document.querySelector('#filtrosPactos button.active');
            const typeFilter = activePactoTypeButton ? activePactoTypeButton.dataset.tipo : 'todos';
            updateCardDisplay(currentClassFilter, typeFilter, e.target.value);
        }
    });
}

const searchRituaisInput = document.getElementById("searchRituais");
if (searchRituaisInput) {
    searchRituaisInput.addEventListener("input", (e) => {
        // Só atualiza se a aba de rituais estiver visível
        if (currentClassFilter === "ritual") {
            const activeRitualTypeButton = document.querySelector('#filtrosRituais button.active');
            const typeFilter = activeRitualTypeButton ? activeRitualTypeButton.dataset.tipo : 'todos';
            updateCardDisplay(currentClassFilter, typeFilter, e.target.value);
        }
    });
}


/**
 * Inicializa o estado da página ao carregar o DOM.
 * Garante que os rituais são mostrados por padrão e o filtro 'Todos' está ativo.
 */
document.addEventListener("DOMContentLoaded", () => {
    // Esconde a barra de busca de pactos e mostra a de rituais no início
    const searchPactos = document.getElementById("searchPactos");
    const searchRituais = document.getElementById("searchRituais");

    if (searchPactos) searchPactos.style.display = "none";
    if (searchRituais) searchRituais.style.display = "block";

    // Chama mostrarRituais para configurar o estado inicial.
    // Esta função já fará a chamada inicial para updateCardDisplay.
    mostrarRituais();

    // Garante que o botão 'Todos' da seção de Rituais esteja visualmente ativo na inicialização.
    const todosRituaisButton = document.querySelector('#filtrosRituais button[onclick*="filtrarCards(\'todos\')"]');
    if (todosRituaisButton) {
        todosRituaisButton.classList.add("active");
    }

    // Opcional: Se quiser resetar outros botões de filtro de rituais para garantir que apenas 'Todos' esteja ativo
    document.querySelectorAll('#filtrosRituais button').forEach(button => {
        if (button !== todosRituaisButton) {
            button.classList.remove("active");
        }
    });
});


// ======================================================
// Função colocarNaFicha
// ======================================================
/**
 * Envia os dados do ritual/pacto para o localStorage para serem carregados na ficha do personagem.
 * @param {string} name - O nome do ritual/pacto.
 * @param {string} modalId - O ID do modal do ritual/pacto.
 */
function colocarNaFicha(name, modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) {
        console.error("Modal não encontrado para o ID:", modalId);
        return;
    }

    let imageSrc = '';
    const descriptionElement = modal.querySelector('p');
    const description = descriptionElement ? descriptionElement.textContent.trim() : '';

    // Tenta encontrar a imagem no card correspondente usando o data-name
    const cardElement = document.querySelector(`.cards-wrapper .card h3 span[data-name="${name}"]`)?.closest('.card');
    if (cardElement) {
        const img = cardElement.querySelector('img');
        if (img) {
            imageSrc = img.src;
        }
    } else {
        // Fallback: se a imagem não estiver no card principal, verifica se está no próprio modal
        const modalImageElement = modal.querySelector('img');
        if (modalImageElement) {
            imageSrc = modalImageElement.src;
        }
        if (!imageSrc) {
            console.warn(`Imagem para "${name}" não encontrada no card ou modal. Verifique os seletores.`);
        }
    }

    const newItem = {
        name: name,
        image: imageSrc,
        description: description,
    };

    const storedItems = localStorage.getItem("selectedRitualsPacts");
    let selectedItems = storedItems ? JSON.parse(storedItems) : [];

    const isDuplicate = selectedItems.some(item => item.name === newItem.name);
    if (isDuplicate) {
        alert(`"${name}" já está na sua ficha!`);
        fecharModal(modalId);
        return;
    }

    selectedItems.push(newItem);
    localStorage.setItem("selectedRitualsPacts", JSON.stringify(selectedItems));

    alert(`"${name}" adicionado à sua ficha!`);
    fecharModal(modalId); // Fecha o modal após a seleção

    // Redireciona para a página da ficha após salvar
    window.location.href = "../index/index_jogadores.html"; // Verifique se este caminho está correto
}