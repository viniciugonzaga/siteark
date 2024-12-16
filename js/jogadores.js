
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

const attributes = { agi: 1, for: 1, int: 1, pre: 1, vig: 1 };

// Exibir prévia da imagem
document.getElementById("photo").addEventListener("change", function () {
    const file = this.files[0];
    const preview = document.getElementById("preview");

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.style.display = "block";
        };
        reader.readAsDataURL(file);
    }
});

// Alterar atributos
function changeAttribute(attr, delta) {
    attributes[attr] = Math.max(1, attributes[attr] + delta);
    document.getElementById(attr).textContent = attributes[attr];
}

function calculateStats() {
    const vig = attributes.vig;
    const pre = attributes.pre;
    const int = attributes.int;

    const vida = vig * 15 + 40;
    const determinacao = pre * 15 + int * 10 + 30;
    const existencia = vig * 5 + 10;
    const folego = vig + 3;
    const armadura = 5;

    const name = document.getElementById("name").value || "Nome não informado";
    const history = document.getElementById("history").value || "História não informada";
    const bonus = document.getElementById("history2").value || "Bônus não informado";
    const class1 = document.getElementById("class1").value || "Classe 1 não selecionada";
    const class2 = document.getElementById("class2").value || "Classe 2 não selecionada";

    // Respeitar parágrafos no campo "Bônus em Ações"
    const formattedBonus = bonus.replace(/\n/g, "<br>");

    document.getElementById("stats").innerHTML = `
        <strong>Ficha Completa:</strong><br><br>
        <strong>Nome:</strong><br> ${name}<br><br>
        <strong>História:</strong><br> ${history}<br><br>
        <strong>Bônus em Ações:</strong><br> ${formattedBonus}<br><br>
        <strong>Classe Primitiva 1:</strong><br> ${class1}<br><br>
        <strong>Classe Primitiva 2:</strong><br> ${class2}<br><br>
        <strong>Atributos:</strong><br>
        Agilidade: ${attributes.agi}<br>
        Força: ${attributes.for}<br>
        Inteligência: ${attributes.int}<br>
        Percepção: ${attributes.pre}<br>
        Vigor: ${attributes.vig}<br><br>
        <strong>Estatísticas:</strong><br>
        Vida: ${vida}<br>
        Determinação/Sanidade: ${determinacao}<br>
        Existência/Resistência: ${existencia}<br>
        Fôlego: ${folego}<br>
        Armadura: ${armadura}
    `;
    document.getElementById("results").style.display = "block";
}

// Salvar formulário
function saveForm() {
    const data = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        history: document.getElementById("history").value,
        history2: document.getElementById("history2").value,
        mutation: document.getElementById("mutation").value,
        class1: document.getElementById("class1").value,
        class2: document.getElementById("class2").value,
        attributes: { ...attributes },
        photo: document.getElementById("preview").src // Salvar a imagem como string Base64
    };

    localStorage.setItem("characterData", JSON.stringify(data));
    alert("Ficha salva com sucesso!");
}

// Carregar dados salvos
function loadForm() {
    const savedData = localStorage.getItem("characterData");
    if (savedData) {
        const data = JSON.parse(savedData);
        document.getElementById("name").value = data.name || "";
        document.getElementById("age").value = data.age || "";
        document.getElementById("history").value = data.history || "";
        document.getElementById("history2").value = data.history2 || "";
        document.getElementById("mutation").value = data.mutation || "";
        document.getElementById("class1").value = data.class1 || "";
        document.getElementById("class2").value = data.class2 || "";
        Object.keys(data.attributes).forEach(attr => {
            attributes[attr] = data.attributes[attr];
            document.getElementById(attr).textContent = attributes[attr];
        });
        if (data.photo) {
            const preview = document.getElementById("preview");
            preview.src = data.photo;
            preview.style.display = "block";
        }
    }
}


// Carregar os dados automaticamente ao abrir a página
window.onload = loadForm;
// ========================
// Footer dinâmico
// ========================
document.addEventListener("scroll", () => {
    const footer = document.querySelector("footer"); // Seleciona o rodapé

    // Se o usuário rolar até o fim da página
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
        footer.style.background = "linear-gradient(45deg, #091bbde0,#343a53d5)"; // Altera a cor do rodapé
    } else {
        footer.style.background = "linear-gradient(45deg, #0f0c29, #302b63, #24243e)"; // Mantém a cor padrão
    }
});

// Toggle para o menu no celular
document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});
