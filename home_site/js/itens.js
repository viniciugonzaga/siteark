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
        footer.style.background = "linear-gradient(45deg,#353757ea,#3a0b92d5,#353757ea)"; // Altera a cor do rodapé
    } else {
        footer.style.background = "linear-gradient(45deg, #0f0c29, #302b63, #24243e)"; // Mantém a cor padrão
    }
});

const efeitos = document.querySelectorAll('.efeito');
const descricao = document.getElementById('descricao');


// Array de objetos com os dados de cada efeito
const dadosEfeitos = [
    { nome: 'Soco', descricao: 'Dano:For(x= 1d6)' },
    { nome: 'Chute', descricao: 'Dano:For(x= 1d8)' },
    { nome: 'Mordida', descricao: 'Dano: 1d6+For)' },
    { nome: 'Encontrão', descricao: '1d10+For' },
    { nome: 'Arco/Flecha', descricao: 'Medieval: 5d10/ Composto: 5d10+15/ Industrializado: 6d10+15/ Modificado/Minério:6d10+25+(forjador/minério) ' },
    { nome: 'Espada Larga', descricao: 'Medieval: 3d8+10/ Ferro: 6d10+10/ Industrializado: 7d10+25/ Modificado/Minério:8d10+25+(forjador/minério)' },
    { nome: 'Picareta', descricao: 'Medieval: 2d12+5/ Ferro: 4d12+10/ Industrializado: 5d12+15/ Modificado/Minério:5d10+25+(forjador/minério)' },
    { nome: 'Machado', descricao: 'Medieval: 4d8+10/ Ferro: 5d10+10/ Industrializado: 6d10+15/ Modificado/Minério:7d10+25+(forjador/minério)' },
    { nome: 'Lança', descricao: 'Medieval: 2d8+15/ Ferro: 3d12+20/ Industrializado: 4d10+25/ Modificado/Minério:5d10+30+(forjador/minério)' },
    { nome: 'Martelo', descricao: 'Medieval: 3d10+10/ Ferro: 6d10+20/ Industrializado: 7d10+25/ Modificado/Minério:8d10+25+(forjador/minério)' },
    { nome: 'Foice dupla', descricao: 'Medieval: 2d8+5 x2/ Ferro: 2d12+15 2x/ Industrializado: 4d12+15 2x/ Modificado/Minério:4d12+25+(forjador/minério) 2x' },
    { nome: 'Soqueira', descricao: 'Medieval: 1d10+For(x= +5) 2x/ Ferro: 2d10+For(x= +5) 2x/ Industrializado: 3d10+For(x= +5) 2x/ Modificado/Minério:3d12+For(x= +10)+(forjador/minério) 2x' },
    { nome: 'Tridente', descricao: 'Medieval: 3d8+15/ Ferro: 3d10+20/ Industrializado: 6d12+25/ Modificado/Minério:7d12+35+(forjador/minério)' },
    { nome: 'Porrete', descricao: 'Medieval: 3d8+for(x= +5)/ Ferro: 3d10+for(x= +10)/ Industrializado: 5d10+for(x= +10)/ Modificado/Minério: 5d12+for(x= +15)+(forjador/minério)' },
    { nome: 'Faca/Adaga', descricao: 'Medieval: 2d12+15/ Ferro: 3d12+20/ Industrializado: 4d12+20/ Modificado/Minério:4d12+25+(forjador/minério)' },
    { nome: 'Chicote', descricao: 'Medieval: 1d12+10/ Ferro: 2d12+15/ Industrializado: 3d12+20/ Modificado/Minério:4d12+25+(forjador/minério)' },
    { nome: 'Cutelo', descricao: 'Medieval: 2d12+10/ Ferro: 4d12+15/ Industrializado: 5d12+20/ Modificado/Minério:6d12+25+(forjador/minério)' },
    { nome: 'Punhal', descricao: 'Medieval: 3d10/ Ferro: 4d10/ Industrializado: 4d12+20/ Modificado/Minério:4d12+25+(forjador/minério)' },
    { nome: 'Besta', descricao: 'Medieval: 3d12+15/ Ferro: 5d12+15/ Industrializado: 6d12+20/ Modificado/Minério:6d12+25+(forjador/minério)' },
    { nome: 'Escudo', descricao: 'Medieval: 1d10/ Ferro: 2d12/ Industrializado: 3d12/ Modificado/Minério:4d12+(forjador/minério)' },
    { nome: 'Pistola', descricao: 'Medieval: 3d10+25/ Ferro: 5d10+25/ Industrializado: 7d10+30/ Modificado/Minério:7d12+35+(Munição/minério)' },
    { nome: 'Revólver', descricao: 'Medieval: 3d10+15/ Ferro: 6d10+15/ Industrializado: 6d12+35/ Modificado/Minério:8d12+35+(Munição/minério)' },
    { nome: 'Fuzil', descricao: 'Medieval: 6d6+15/ Ferro: 8d6+25/ Industrializado: 10d8+35/ Modificado/Minério:10d12+35+(Munição/minério)' },
    { nome: 'Carabina', descricao: 'Medieval: 8d6+5/ Ferro: 8d8+15/ Industrializado: 12d10+25/ Modificado/Minério:10d12+35+(Munição/minério)' },
    { nome: 'Espingarda', descricao: 'Medieval: 8d8+15/ Ferro: 8d10+25/ Industrializado: 8d12+25/ Modificado/Minério:10d8+35+(Munição/minério)' },
    { nome: 'Metralhadora', descricao: 'Medieval: 6d8+15/ Ferro: 7d6+25/ Industrializado: 8d8+35/ Modificado/Minério:10d8+35+(Munição/minério)' },
    { nome: 'Submetralhadora.', descricao: 'Medieval: 8d4+15/ Ferro: 8d6+25/ Industrializado: 12d8+35/ Modificado/Minério:13d8+35+(Munição/minério)' },
    { nome: 'Mosquetão', descricao: 'Medieval: 4d12+35/ Ferro: 6d12+45/ Industrializado: 8d12+45/ Modificado/Minério:10d12+45+(Munição/minério)' },
    { nome: 'Bazuca', descricao: 'Medieval: 10d6+45/ Ferro: 12d8+45/ Industrializado: 16d10+45/ Modificado/Minério:16d12+50+(Munição/minério)' },
    { nome: 'Sniper', descricao: 'Medieval: 10d6+45/ Ferro: 10d8+45/ Industrializado: 10d10+35/ Modificado/Minério:12d12+45+(Munição/minério)' },
    { nome: 'Granada', descricao: 'Medieval: 8d6+15/ Ferro: 12d6+25/ Industrializado: 16d6+35/ Modificado/Minério:16d8+35+(Munição/minério)' },
    { nome: 'gás Asfixiante', descricao: 'Medieval: 2d12+15 por rodada+(minério)' },
    { nome: 'Thompson', descricao: 'Medieval: 5d10+25/ Ferro: 10d10+35/ Industrializado: 12d10+35/ Modificado/Minério:14d10+35+(Munição/minério).' },
    { nome: 'Caçadeira Tática', descricao: 'Medieval: 10d6+15/ Ferro: 12d6+25/ Industrializado: 14d8+35/ Modificado/Minério:14d10+35+(Munição/minério)' },
    { nome: 'Lança-Chamas', descricao: 'Medieval: 6d6+(3d6 rodada)/ Ferro: 8d6+(8d6)/ Industrializado: 10d6+(8d6)/ Modificado/Minério:8d10+(5d12)+(Munição/minério)' },
    { nome: 'Motosserra', descricao: 'Medieval: 6d6+30/ Ferro: 10d4+25/ Industrializado: 10d6+20/ Modificado/Minério:10d8+35+(Munição/minério)' },
    { nome: 'Arpão', descricao: 'Medieval: 2d12+15/ Ferro: 4d12+25/ Industrializado: 6d12+25/ Modificado/Minério:8d12+25+(Munição/minério)' },
    { nome: 'minigun', descricao: 'Medieval: 12d6+15/ Ferro: 16d6+25/ Industrializado: 12d6+35/ Modificado/Minério:16d8+35+(Munição/minério)' },
    { nome: 'Dinamite', descricao: '3d10+20(Munição/Minério)' },
    { nome: 'Bomba Nuclear', descricao: 'Medieval: 10d10+100/ Ferro: 20d10+200/ Industrializado: 50d10+500/ Modificado/Minério:100d100+1000+(Munição/minério)' },
   

];

efeitos.forEach((efeito, index) => {
    efeito.addEventListener('click', () => {
        const efeitoSelecionado = dadosEfeitos[index];
        descricao.textContent = efeitoSelecionado.descricao;
        imagem.src = efeitoSelecionado.imagem;
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // ========================
    // Carousel no Main
    // ========================
    const carouselImages = document.querySelector('.carousel-images');
    const images = document.querySelectorAll('.carousel-images img');
    let index = 1; // Começa na primeira imagem real
    const totalImages = images.length - 2; // Exclui imagens duplicadas para loop

    // Função para avançar para a próxima imagem
    function nextImage() {
        index++;
        carouselImages.style.transition = 'transform 1s ease-in-out'; // Adiciona transição suave
        carouselImages.style.transform = `translateX(${-index * 100}%)`;

        // Caso alcance a última imagem duplicada, reseta para a primeira
        if (index > totalImages) {
            setTimeout(() => {
                carouselImages.style.transition = 'none'; // Remove a transição
                index = 1; // Volta para a primeira imagem real
                carouselImages.style.transform = `translateX(${-index * 100}%)`;
            }, 1000); // Aguarda a transição terminar
        }
    }

    // Alterna automaticamente as imagens a cada 4 segundos
    setInterval(nextImage, 4000);
});
function showTable(num) {
    document.querySelectorAll('.table-container').forEach(el => el.style.display = 'none');
    document.getElementById('table' + num).style.display = 'block';
}

function openModal(title, img, description) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalImage').src = img;
    document.getElementById('modalDescription').innerText = description;
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}