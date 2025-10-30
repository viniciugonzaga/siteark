// ========================
// Menu (Navbar)
// ========================
const menu = document.getElementById('diceMenu');
const openMenuButton = document.getElementById('openMenu');
const closeMenuButton = document.getElementById('closeMenu');
const diceSelect = document.getElementById('diceSelect');
const rollDiceButton = document.getElementById('rollDice');
const clearRollsButton = document.getElementById('clearRolls');
const rollList = document.getElementById('rollList');
const totalDisplay = document.getElementById('total');
const playerNameInput = document.getElementById('playerName');

let playerScores = {};

if (openMenuButton && closeMenuButton && menu) {
    openMenuButton.addEventListener('click', () => {
        menu.classList.remove('hidden');
    });

    closeMenuButton.addEventListener('click', () => {
        menu.classList.add('hidden');
    });
}

if (rollDiceButton && diceSelect && rollList) {
    rollDiceButton.addEventListener('click', () => {
        const playerName = playerNameInput.value.trim();
        const diceType = parseInt(diceSelect.value);
        const roll = Math.floor(Math.random() * diceType) + 1;

        if (!playerName) {
            alert("Por favor, insira o nome do jogador!");
            return;
        }

        if (!playerScores[playerName]) {
            playerScores[playerName] = 0;
        }
        playerScores[playerName] += roll;

        const listItem = document.createElement('li');
        listItem.textContent = `${playerName} = D${diceType}: ${roll} (Total: ${playerScores[playerName]})`;
        rollList.appendChild(listItem);

        totalDisplay.textContent = `Total geral: ${Object.values(playerScores).reduce((a, b) => a + b, 0)}`;
    });
}

if (clearRollsButton) {
    clearRollsButton.addEventListener('click', () => {
        playerScores = {};
        rollList.innerHTML = '';
        totalDisplay.textContent = 'Total geral: 0';
    });
}

function goToPage(page) {
    window.location.href = page;
}

 // ANIMAÇÃO INTERATIVA DA SANIDADE
        document.addEventListener('DOMContentLoaded', function() {
            const cards = document.querySelectorAll('.dificuldade-card');
            
            cards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    const fill = this.querySelector('.sanidade-fill');
                    if (fill) {
                        const currentWidth = parseFloat(fill.style.width);
                        fill.style.transition = 'width 0.3s ease';
                        fill.style.width = (currentWidth + 10) + '%';
                        
                        setTimeout(() => {
                            fill.style.width = currentWidth + '%';
                        }, 300);
                    }
                });

                // Efeito de clique para demonstrar o sistema
                card.addEventListener('click', function() {
                    const cardType = this.classList[1];
                    let message = '';
                    
                    switch(cardType) {
                        case 'normal':
                            message = ' Cena Normal: Recursos completos disponíveis';
                            break;
                        case 'diabolica':
                            message = ' Cena Diabólica: Sistema de esforço mental ativado';
                            break;
                        case 'caveira':
                            message = ' Cena da Caveira: Limiar da loucura - cuidado extremo!';
                            break;
                    }
                    
                    // Efeito visual de confirmação
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = 'translateY(-10px)';
                    }, 150);
                    
                    console.log(message);
                });
            });

            // Efeito de digitação no título
            const title = document.querySelector('.titulo_efeito');
            const originalText = title.textContent;
            title.textContent = '';
            
            let i = 0;
            function typeWriter() {
                if (i < originalText.length) {
                    title.textContent += originalText.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            }
            
            // Inicia a animação de digitação
            setTimeout(typeWriter, 1000);
        });