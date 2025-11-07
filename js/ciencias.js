
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
        // ========================
        // Carrossel
        // ========================
        const imagens = [
            { 
                src: "../imagens/ciencias_hibridos.jpg", 
                texto: "Dê vida ao impossível! Explore os limites da genética e crie criaturas que jamais existiram. Seja o pioneiro dessa revolução, mas cuidado... nem sempre são apenas animais que surgem, monstros podem despertar do desconhecido." 
            },
            { 
                src: "../imagens/ciencias_nuclear.jpg", 
                texto: "Domine a sua calamidade. Crie armas nucleares, libere pragas biológicas e testemunhe sua espécie correr rumo à autodestruição. Enquanto o mundo desmorona, uma pergunta ecoa: Se Deus existe, seria essa sua vontade ou nossa ambição desenfreada?" 
            },
            { 
                src: "../imagens/ciencias_mistério.webp", 
                texto: "Compreenda o inexistente. Uma força desenfreada impulsiona a corrida entre homem e natureza. A ilha evolui a cada dia: novas criaturas emergem, fenômenos inexplicáveis surgem, e a única resposta que resta... é o desconhecido." 
            },
            { 
                src: "../imagens/ciencias_antigos.jpg", 
                texto: "Desvende os antigos mistérios. Explore a história de civilizações perdidas, estude suas criaturas, flora e segredos esquecidos. O que causou sua extinção? E se... eles ainda existissem, esperando para serem encontrados?" 
            }
        ];

        const imagemElemento = document.getElementById("imagem");
        const textoElemento = document.getElementById("texto");
        const prevButton = document.getElementById("prev");
        const nextButton = document.getElementById("next");

        let indiceAtual = 0;

        function atualizarCarrossel() {
            imagemElemento.src = imagens[indiceAtual].src;
            textoElemento.textContent = imagens[indiceAtual].texto;
        }

        nextButton.addEventListener("click", () => {
            indiceAtual = (indiceAtual + 1) % imagens.length;
            atualizarCarrossel();
        });

        prevButton.addEventListener("click", () => {
            indiceAtual = (indiceAtual - 1 + imagens.length) % imagens.length;
            atualizarCarrossel();
        });

        atualizarCarrossel();

        // ========================
        // Sistema de Híbridos
        // ========================
        let contadorAnimais = 2;
        const formularioHibridos = document.getElementById("formularioHibridos");
        const adicionarAnimalBtn = document.getElementById("adicionarAnimal");
        const calcularDTHibridosBtn = document.getElementById("calcularDTHibridos");
        const resultadoDTHibridos = document.getElementById("resultadoDTHibridos");

        // Inicializar formulário com 2 animais
        function inicializarFormularioHibridos() {
            formularioHibridos.innerHTML = '';
            for (let i = 1; i <= contadorAnimais; i++) {
                adicionarAnimalBox(i);
            }
        }

        function adicionarAnimalBox(numero) {
            const animalBox = document.createElement('div');
            animalBox.className = 'animal-box';
            animalBox.innerHTML = `
                <div class="form-group">
                    <label class="form-label">Nome do Animal ${numero}:</label>
                    <input type="text" id="bicho${numero}" class="form-input" placeholder="Nome do Animal">
                </div>
                <div class="form-group">
                    <label class="form-label">Compatibilidade:</label>
                    <select id="compatibilidade${numero}" class="form-select">
                        <option value="sim">Sim</option>
                        <option value="nao">Não</option>
                    </select>
                </div>
                <div class="checkbox-group">
                    <label class="checkbox-label">
                        <input type="checkbox" id="duplicar${numero}"> Duplicar DNA?
                    </label>
                    <label class="checkbox-label">
                        <input type="radio" name="dominante" value="animal${numero}"> DNA Dominante?
                    </label>
                </div>
            `;
            formularioHibridos.appendChild(animalBox);
        }

        adicionarAnimalBtn.addEventListener("click", () => {
            contadorAnimais++;
            adicionarAnimalBox(contadorAnimais);
        });

        calcularDTHibridosBtn.addEventListener("click", () => {
            let dtBase = 20;
            let totalDt = dtBase;
            let dominanteSelecionado = null;
            const animais = [];
            const habilidades = [];

            for (let i = 1; i <= contadorAnimais; i++) {
                const nomeAnimal = document.getElementById(`bicho${i}`)?.value.trim();
                const compatibilidade = document.getElementById(`compatibilidade${i}`)?.value;
                const duplicar = document.getElementById(`duplicar${i}`)?.checked;
                const dominante = document.querySelector(`input[name="dominante"][value="animal${i}"]`)?.checked;

                if (!nomeAnimal) continue;

                let porcentagemHabilidade = dominante ? 65 : 50;
                if (duplicar) {
                    porcentagemHabilidade *= 2;
                }

                if (dominante) {
                    dominanteSelecionado = nomeAnimal;
                }

                if (compatibilidade === "nao") {
                    totalDt += 15;
                }

                if (duplicar) {
                    totalDt += 10;
                }

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

            resultadoDTHibridos.innerHTML = `
                <h3 style="color: #4CAF50; margin-bottom: 15px;">Resultado do Cálculo</h3>
                <p><strong>DT Total:</strong> ${totalDt}</p>
                <p><strong>DNA Dominante:</strong> ${dominanteSelecionado}</p>
                <p><strong>Junção:</strong> ${animais.join(" - ")}</p>
                <div style="margin-top: 15px;">
                    <strong>Habilidades:</strong>
                    ${habilidades.map(hab => `
                        <div style="margin: 10px 0; padding: 10px; background: rgba(0,0,0,0.3); border-radius: 5px;">
                            <strong>${hab.nome}</strong><br>
                            Chance: ${hab.porcentagem}% | Dominante: ${hab.dominante} | Duplicado: ${hab.duplicado}
                        </div>
                    `).join('')}
                </div>
            `;
        });

        // Inicializar o sistema
        inicializarFormularioHibridos();

        // Fechar modal híbridos
        document.getElementById('fecharModalHibridos').addEventListener('click', function() {
            document.getElementById('modalHibridos').style.display = 'none';
        });

        // Abrir modal híbridos (exemplo)
        document.addEventListener('DOMContentLoaded', function() {
            // Para testar, você pode adicionar um botão para abrir o modal
            // document.getElementById('abrirModalHibridos').addEventListener('click', function() {
            //     document.getElementById('modalHibridos').style.display = 'flex';
            // });
        });
