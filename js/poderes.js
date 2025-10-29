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

// script.js - Lógica otimizada da página

// ========================
// Configurações e Estado
// ========================
const CONFIG = {
    itensPorPagina: 20,
    delayAnimacao: 300
};

let estado = {
    paginaAtual: 0,
    classeAtiva: 'ritual',
    filtroAtivo: 'todos',
    termoPesquisa: '',
    todosCarregados: false
};

// ========================
// Cache de Elementos DOM
// ========================
const elementos = {
    // Modal dinâmico
    modal: null,
    modalTitulo: null,
    modalConteudo: null,
    modalBtnFicha: null,
    
    // Filtros e busca
    filtrosRituais: null,
    filtrosPactos: null,
    searchRituais: null,
    searchPactos: null,
    
    // Containers
    cardsContainer: null,
    tituloPrincipal: null,
    
    // Botões
    btnRituais: null,
    btnPactos: null
};

// ========================
// Inicialização
// ========================
document.addEventListener("DOMContentLoaded", function () {
    inicializarElementos();
    configurarEventListeners();
    inicializarPagina();
});

function inicializarElementos() {
    // Cache de elementos DOM
    elementos.modal = document.getElementById('modal-dinamico');
    elementos.modalTitulo = document.getElementById('modal-titulo');
    elementos.modalConteudo = document.getElementById('modal-conteudo');
    elementos.modalBtnFicha = document.getElementById('modal-btn-ficha');
    
    elementos.filtrosRituais = document.getElementById('filtrosRituais');
    elementos.filtrosPactos = document.getElementById('filtrosPactos');
    elementos.searchRituais = document.getElementById('searchRituais');
    elementos.searchPactos = document.getElementById('searchPactos');
    
    elementos.cardsContainer = document.querySelector('.cards-wrapper');
    elementos.tituloPrincipal = document.getElementById('tituloPrincipal');
    
    elementos.btnRituais = document.getElementById('btnRituais');
    elementos.btnPactos = document.getElementById('btnPactos');
}

function configurarEventListeners() {
    // Pesquisa com debounce
    if (elementos.searchRituais) {
        elementos.searchRituais.addEventListener('input', debounce((e) => {
            estado.termoPesquisa = e.target.value.toLowerCase();
            recarregarCards();
        }, CONFIG.delayAnimacao));
    }
    
    if (elementos.searchPactos) {
        elementos.searchPactos.addEventListener('input', debounce((e) => {
            estado.termoPesquisa = e.target.value.toLowerCase();
            recarregarCards();
        }, CONFIG.delayAnimacao));
    }
    
    // Fechar modal
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            fecharModal();
        }
    });
    
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && elementos.modal.classList.contains('active')) {
            fecharModal();
        }
    });
    
    // Scroll infinito
    window.addEventListener('scroll', debounce(verificarScroll, 100));
}

function inicializarPagina() {
    mostrarRituais();
    carregarPrimeirosCards();
}

// ========================
// Modal Dinâmico
// ========================
function abrirModal(dados) {
    if (!elementos.modal) return;
    
    elementos.modalTitulo.textContent = dados.nome;
    elementos.modalConteudo.innerHTML = `
        <p><strong>Tipo:</strong> ${dados.elemento} / ${dados.tipo}</p>
        <p><strong>Nível Requerido:</strong> ${dados.nivel}</p>
        <p>${dados.descricao}</p>
    `;
    
    elementos.modalBtnFicha.onclick = () => colocarNaFicha(dados);
    elementos.modal.classList.add('active');
}

function fecharModal() {
    if (elementos.modal) {
        elementos.modal.classList.remove('active');
    }
}

// ========================
// Controle de Abas
// ========================
function mostrarRituais() {
    estado.classeAtiva = 'ritual';
    estado.paginaAtual = 0;
    estado.todosCarregados = false;
    
    atualizarInterfaceAba();
    recarregarCards();
}

function mostrarPactos() {
    estado.classeAtiva = 'pacto';
    estado.paginaAtual = 0;
    estado.todosCarregados = false;
    
    atualizarInterfaceAba();
    recarregarCards();
}

function atualizarInterfaceAba() {
    // Atualizar título
    if (elementos.tituloPrincipal) {
        elementos.tituloPrincipal.textContent = estado.classeAtiva === 'ritual' ? 'Rituais' : 'Pactos';
    }
    
    // Atualizar botões ativos
    if (elementos.btnRituais && elementos.btnPactos) {
        elementos.btnRituais.classList.toggle('active', estado.classeAtiva === 'ritual');
        elementos.btnPactos.classList.toggle('active', estado.classeAtiva === 'pacto');
    }
    
    // Mostrar/ocultar filtros
    if (elementos.filtrosRituais && elementos.filtrosPactos) {
        elementos.filtrosRituais.style.display = estado.classeAtiva === 'ritual' ? 'flex' : 'none';
        elementos.filtrosPactos.style.display = estado.classeAtiva === 'pacto' ? 'flex' : 'none';
    }
    
    // Mostrar/ocultar busca
    if (elementos.searchRituais && elementos.searchPactos) {
        elementos.searchRituais.style.display = estado.classeAtiva === 'ritual' ? 'block' : 'none';
        elementos.searchPactos.style.display = estado.classeAtiva === 'pacto' ? 'block' : 'none';
    }
    
    // Resetar pesquisa
    estado.termoPesquisa = '';
    if (elementos.searchRituais) elementos.searchRituais.value = '';
    if (elementos.searchPactos) elementos.searchPactos.value = '';
}

// ========================
// Filtros e Busca
// ========================
function filtrarCards(tipo) {
    estado.filtroAtivo = tipo;
    estado.paginaAtual = 0;
    estado.todosCarregados = false;
    
    // Atualizar botões ativos
    const containerId = estado.classeAtiva === 'ritual' ? 'filtrosRituais' : 'filtrosPactos';
    document.querySelectorAll(`#${containerId} button`).forEach(btn => {
        btn.classList.remove('active');
    });
    
    const botaoAtivo = document.querySelector(`#${containerId} button[onclick*="filtrarCards('${tipo}')"]`);
    if (botaoAtivo) botaoAtivo.classList.add('active');
    
    recarregarCards();
}

// ========================
// Gerenciamento de Cards
// ========================
function carregarPrimeirosCards() {
    estado.paginaAtual = 0;
    estado.todosCarregados = false;
    if (elementos.cardsContainer) {
        elementos.cardsContainer.innerHTML = '';
    }
    carregarMaisCards();
}

function recarregarCards() {
    estado.paginaAtual = 0;
    estado.todosCarregados = false;
    if (elementos.cardsContainer) {
        elementos.cardsContainer.innerHTML = '';
    }
    carregarMaisCards();
}

function carregarMaisCards() {
    if (estado.todosCarregados) return;
    
    const inicio = estado.paginaAtual * CONFIG.itensPorPagina;
    const fim = inicio + CONFIG.itensPorPagina;
    
    const dados = estado.classeAtiva === 'ritual' ? window.dadosRituais.rituais : window.dadosRituais.pactos;
    const itensFiltrados = filtrarItens(dados);
    
    if (inicio >= itensFiltrados.length) {
        estado.todosCarregados = true;
        return;
    }
    
    const lotes = itensFiltrados.slice(inicio, fim);
    renderizarCards(lotes);
    estado.paginaAtual++;
}

function filtrarItens(dados) {
    return Object.values(dados).filter(item => {
        const matchesTipo = estado.filtroAtivo === 'todos' || item.tipo === estado.filtroAtivo;
        const matchesSearch = estado.termoPesquisa === '' || 
                            item.nome.toLowerCase().includes(estado.termoPesquisa);
        return matchesTipo && matchesSearch;
    });
}

function renderizarCards(itens) {
    if (!elementos.cardsContainer) return;
    
    const fragment = document.createDocumentFragment();
    
    itens.forEach(item => {
        const card = criarCard(item);
        fragment.appendChild(card);
    });
    
    elementos.cardsContainer.appendChild(fragment);
}

function criarCard(dados) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.tipo = dados.tipo;
    card.dataset.classe = dados.classe;
    
    card.innerHTML = `
        <h3><span data-name="${dados.nome}">${dados.nome}</span></h3>
        <img src="${dados.imagem}" alt="${dados.nome}" loading="lazy" />
        <span class="tipo">${dados.elemento} / ${dados.tipo}</span>
        <button onclick="abrirRitual(${dados.id})">Descrição</button>
    `;
    
    return card;
}

function abrirRitual(id) {
    const dados = estado.classeAtiva === 'ritual' 
        ? window.dadosRituais.rituais[id]
        : window.dadosRituais.pactos[id];
    
    if (dados) {
        abrirModal(dados);
    }
}

// ========================
// Scroll Infinito
// ========================
function verificarScroll() {
    if (estado.todosCarregados) return;
    
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    
    if (scrollTop + clientHeight >= scrollHeight - 100) {
        carregarMaisCards();
    }
}

// ========================
// Sistema de Ficha
// ========================
function colocarNaFicha(dados) {
    const nivelJogador = getCharacterLevel();
    
    if (nivelJogador < dados.nivel) {
        alert(`Você precisa ser no mínimo Nível ${dados.nivel} para usar ${dados.nome}. Seu nível atual é ${nivelJogador}.`);
        fecharModal();
        return;
    }
    
    const novoItem = {
        nome: dados.nome,
        imagem: dados.imagem,
        descricao: dados.descricao,
        tipo: dados.tipo,
        elemento: dados.elemento,
        nivel: dados.nivel
    };
    
    const RITUALS_STORAGE_KEY = 'selectedRitualPacts';
    const storedItems = localStorage.getItem(RITUALS_STORAGE_KEY);
    let itensSelecionados = storedItems ? JSON.parse(storedItems) : [];
    
    const duplicado = itensSelecionados.some(item => item.nome === novoItem.nome);
    if (duplicado) {
        alert(`"${dados.nome}" já está na sua ficha!`);
        fecharModal();
        return;
    }
    
    itensSelecionados.push(novoItem);
    localStorage.setItem(RITUALS_STORAGE_KEY, JSON.stringify(itensSelecionados));
    
    alert(`"${dados.nome}" adicionado à sua ficha!`);
    fecharModal();
    
    // Redirecionar para ficha
    window.location.href = "../index/index_jogadores.html";
}

function getCharacterLevel() {
    try {
        const LOCAL_CHARACTER_STORAGE_KEY = 'localCharacterData';
        const storedData = localStorage.getItem(LOCAL_CHARACTER_STORAGE_KEY);
        if (storedData) {
            const characterData = JSON.parse(storedData);
            return parseInt(characterData.level) || 1;
        }
    } catch (e) {
        console.error("Erro ao ler nível do personagem:", e);
    }
    return 1;
}

// ========================
// Utilitários
// ========================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========================
// Sistema de Elementos Especiais
// ========================
document.addEventListener('DOMContentLoaded', function() {
    const icones = document.querySelectorAll('.icone-item');
    const textos = document.querySelectorAll('.civilizacoes-texto');
    const civilizacoesSection = document.querySelector('.civilizacoes-section');

    function updateBackgroundImage(imageUrl) {
        civilizacoesSection.style.setProperty('--bg-image-url', `url(${imageUrl})`);
        civilizacoesSection.classList.add('has-background-image');
    }

    icones.forEach(icone => {
        icone.addEventListener('click', function() {
            const targetId = this.dataset.target;
            const iconImageUrl = this.querySelector('img').src;
            
            textos.forEach(texto => {
                texto.classList.remove('active');
                texto.classList.add('hidden');
            });

            const textoAlvo = document.getElementById(targetId);
            if (textoAlvo) {
                textoAlvo.classList.remove('hidden');
                textoAlvo.classList.add('active');
            }

            icones.forEach(i => i.classList.remove('selected'));
            this.classList.add('selected');

            updateBackgroundImage(iconImageUrl);
        });
    });

    const primeiroIcone = document.querySelector('.icone-item[data-target="texto-civilizacao1"]');
    if (primeiroIcone) {
        primeiroIcone.click();
    }
});