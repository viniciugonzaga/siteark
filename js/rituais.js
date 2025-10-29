// rituais.js - Dados completos de todos os rituais e pactos
window.dadosRituais = {
    "rituais": {
        // Rituais de Fogo (1-4)
        1: {
            id: 1,
            nome: "Queimar Carne",
            tipo: "Simples",
            elemento: "Fogo",
            descricao: "A mão do conjurador se contorce de forma antinatural, aquecendo-se até que cinzas comecem a surgir entre seus dedos. Num estalar súbito, uma pequena combustão é invocada diretamente sobre um inimigo à vista, envolvendo seu corpo em chamas vivas. O alvo sofre 4d6 de dano de fogo e recebe o efeito Queimado, que persiste até que ele consiga apagar completamente a origem das chamas, seja por meios mágicos, ações físicas ou auxílio externo. O inimigo pode tentar se defender com testes de Fortitude.",
            nivel: 15,
            imagem: "../imagens/icon_queimar_carne.png",
            classe: "ritual"
        },
        2: {
            id: 2,
            nome: "Unir Chama",
            tipo: "Simples",
            elemento: "Fogo",
            descricao: "Canalizando calor para uma parte específica do corpo, o conjurador aquece sua pele até o limite do suportável. Ao esfregar essa área em uma arma ou objeto, transfere para ele um fogo ritualístico que queima sem ferir quem o utiliza. O item encantado passa a causar 2d6 de dano de fogo adicional nos ataques e aplica automaticamente o efeito Queimado ao acertar o inimigo. Esse encantamento dura por 1d4 rodadas, e o fogo não afeta o conjurador nem o portador da arma. Alvos atingidos podem tentar resistir ao efeito usando Reflexo.",
            nivel: 15,
            imagem: "../imagens/icon_controlar_chama.png",
            classe: "ritual"
        },
        3: {
            id: 3,
            nome: "Lançar Fogo",
            tipo: "Simples",
            elemento: "Fogo",
            descricao: "Com uma explosão de energia térmica, o conjurador reúne chamas em suas mãos e projeta uma esfera incandescente na direção de um inimigo. A bola de fogo explode no momento do impacto, causando 1d10 de dano de fogo imediato. Além disso, o alvo é consumido por um fogo residual que aplica 2d6 adicionais de dano contínuo pelo efeito Queimado, o qual persiste até que as chamas sejam completamente eliminadas. O inimigo pode tentar escapar da conjuração com um teste de Reflexo.",
            nivel: 15,
            imagem: "../imagens/icon_lançar_fogo.png",
            classe: "ritual"
        },
        4: {
            id: 4,
            nome: "Combustão",
            tipo: "Simples",
            elemento: "Fogo",
            descricao: "Concentrando a energia flamejante interna, o conjurador libera uma onda de calor invisível, que se espalha por todos os inimigos em seu alcance arcano ou linha de visão. A energia incandescente revela a presença de cada um, aplicando o efeito Revelado por 1d4 rodadas, impedindo qualquer tentativa de camuflagem ou invisibilidade. Adicionalmente, qualquer inimigo que já esteja sofrendo com efeitos de fogo — como o Queimado — sofre imediatamente 2d6 de dano de fogo extra, intensificando a combustão. Alvos podem tentar resistir ao efeito de revelação com Vontade, ou minimizar o dano adicional com um teste de Fortitude.",
            nivel: 15,
            imagem: "../imagens/icon_combustão.png",
            classe: "ritual"
        },

        // Rituais de Raio (5-8)
        5: {
            id: 5,
            nome: "Eletrocutar",
            tipo: "Simples",
            elemento: "Raio",
            descricao: "O conjurador concentra energia elétrica pura na palma de sua mão, disparando um raio direto contra um inimigo à vista. O alvo sofre 4d8 de dano elétrico e, caso não consiga resistir, recebe o efeito Vulnerável por 1d4 rodadas. Se o alvo estiver usando armadura metálica ou imerso em água, o dano é dobrado. O inimigo pode tentar evitar o ataque com um teste de Esquiva e resistir aos efeitos colaterais com Fortitude.",
            nivel: 15,
            imagem: "../imagens/icon_elerocutar.png",
            classe: "ritual"
        },
        6: {
            id: 6,
            nome: "Eletrizar",
            tipo: "Simples",
            elemento: "Raio",
            descricao: "Canalizando eletricidade revigorante, o conjurador direciona uma descarga controlada sobre um aliado à vista. Essa energia percorre o corpo e a aura arcana do alvo, concedendo-lhe um bônus de +5 em testes de Agilidade e imunidade a dano elétrico. Os efeitos duram por 1d4 rodadas e não afetam negativamente o alvo. Ideal para momentos de fuga, esquiva ou avanço veloz.",
            nivel: 15,
            imagem: "../imagens/icon_eletrizar.png",
            classe: "ritual"
        },
        7: {
            id: 7,
            nome: "Cópia Elétrica",
            tipo: "Simples",
            elemento: "Raio",
            descricao: "O conjurador manipula partículas elétricas para criar uma réplica instável e brilhante de um aliado ou de si mesmo. Essa cópia aparece logo atrás de seu criador e imita seus ataques, replicando o mesmo golpe, porém com dano dividido pela metade e com natureza puramente elétrica. A cópia possui funções limitadas, agindo apenas como uma extensão ofensiva e desaparece após 1d4 rodadas. Não pode agir por conta própria, defender, ou se mover autonomamente.",
            nivel: 15,
            imagem: "../imagens/icon_cópia_de_choque.png",
            classe: "ritual"
        },
        8: {
            id: 8,
            nome: "Dor de Cabeça",
            tipo: "Simples",
            elemento: "Raio",
            descricao: "Com um gesto súbito e focado, o conjurador é capaz de transferir a dor física de um aliado diretamente para sua mente, transformando todo o dano corporal em dano de estresse. Isso impede que o aliado seja afetado por choques, eletrocussão ou efeitos físicos de ataques elétricos. Em contrapartida, o conjurador é marcado por uma presença arcana, recebendo o efeito Marcado por 1d2 rodadas. O ritual funciona em qualquer aliado dentro de seu alcance visual e exige conexão mental mínima. Ideal para proteger alvos em estado crítico.",
            nivel: 15,
            imagem: "../imagens/icon_dor_de_cabeça.png",
            classe: "ritual"
        },

        // Rituais de Apodrecer (9-12)
        9: {
            id: 9,
            nome: "Escolha Suja",
            tipo: "Simples",
            elemento: "Apodrecer",
            descricao: "Após um dia inteiro sem limpar suas mãos, o conjurador canaliza uma energia pútrida apontando para um inimigo à vista. A podridão acumulada se transforma em uma maldição tóxica. O alvo deve realizar um teste de Vontade. Caso falhe, recebe 2d8 de dano ácido, sofre o efeito Envenenado (2d6) e fica Marcado por 1d2 rodadas, tornando-se mais vulnerável ao próximo ataque direto.",
            nivel: 15,
            imagem: "../imagens/icon_escolha_suja.png",
            classe: "ritual"
        },
        10: {
            id: 10,
            nome: "Sabotar Natureza",
            tipo: "Simples",
            elemento: "Apodrecer",
            descricao: "O conjurador arremessa um item deteriorado ou libera poeira venenosa com cheiro de podridão nos inimigos à frente. Os dois primeiros alvos que estiverem em linha reta devem realizar um teste de Fortitude. Se falharem, são afetados pelo efeito Enfraquecido, sofrendo -2 dados de dano em todas as habilidades e -5 em seus testes de ataque durante 1d4 rodadas.",
            nivel: 15,
            imagem: "../imagens/icon_sabotar_natureza.png",
            classe: "ritual"
        },
        11: {
            id: 11,
            nome: "Rastro Defeituoso",
            tipo: "Simples",
            elemento: "Apodrecer",
            descricao: "O conjurador dispara um jato ácido e corrosivo em linha reta. O inimigo atingido deve realizar um teste de Reflexo. Se falhar, sofre 2d6 de dano de Peste, recebe o efeito Enfraquecido, perde -1 dado de Agilidade e -1 de Força, e tem seu deslocamento reduzido à metade por 1d4 rodadas. Uma técnica eficiente para desacelerar e enfraquecer alvos mais físicos.",
            nivel: 15,
            imagem: "../imagens/icon_rastro_defeituoso.png",
            classe: "ritual"
        },
        12: {
            id: 12,
            nome: "Coração Podre",
            tipo: "Simples",
            elemento: "Apodrecer",
            descricao: "Canalizando corrupção profunda através do sacrifício, o conjurador transfere parte de sua essência vital para fortalecer um aliado. O alvo recebe o efeito Fortalecido, ganhando +1 dado em Força e aplicando 2d6 de dano de Veneno em todos os seus ataques. Contudo, o conjurador sofre uma penalidade imediata de 20 pontos de vida. O efeito persiste até o conjurador cair inconsciente ou entrar em estado de morte iminente.",
            nivel: 15,
            imagem: "../imagens/icon_coração_podre.png",
            classe: "ritual"
        },

        // Rituais de Medo (13-16)
        13: {
            id: 13,
            nome: "Criar Pesadelo",
            tipo: "Simples",
            elemento: "Medo",
            descricao: "O conjurador invade a mente do inimigo ao cruzar olhares ou concentrar sua percepção. O alvo precisa realizar um teste de Vontade. Se falhar, o conjurador acessa os momentos de maior terror e pavor do inimigo, revivendo seus pesadelos mais sombrios. O alvo sofre 3d6 de dano de Estresse e recebe o efeito Enfraquecido por 1 rodada, causando metade do dano em seus ataques durante esse período.",
            nivel: 15,
            imagem: "../imagens/icon_criar_pesadelo.png",
            classe: "ritual"
        },
        14: {
            id: 14,
            nome: "Admirar Seu Erro",
            tipo: "Simples",
            elemento: "Medo",
            descricao: "Este ritual pode ser usado como reação após um inimigo errar um ataque ou ritual. O conjurador profere palavras aterrorizantes, descrevendo o pior desfecho possível daquele erro. O inimigo afetado sofre 3d6 de Estresse, e durante 1d4 rodadas recebe -5 em testes de ataque. Se durante esse período o alvo errar novamente, ele acidentalmente se fere, causando a si mesmo metade do dano que causaria ao alvo.",
            nivel: 15,
            imagem: "../imagens/icon_admirar_erro.png",
            classe: "ritual"
        },
        15: {
            id: 15,
            nome: "Coletar o Medo",
            tipo: "Simples",
            elemento: "Medo",
            descricao: "Quando o conjurador presencia a morte iminente de um inimigo ou o estado de colapso de um corpo, ele pode canalizar esse medo para si. Utilizando uma de suas reações defensivas, o conjurador absorve toda a vida que o inimigo perdeu em combate, recuperando a própria vida ou ganhando pontos extras temporariamente. O ritual só pode ser realizado uma vez por alvo e exige proximidade. Dura por toda a cena atual.",
            nivel: 15,
            imagem: "../imagens/icon_coletar_medo.png",
            classe: "ritual"
        },
        16: {
            id: 16,
            nome: "Risada Maldita",
            tipo: "Simples",
            elemento: "Medo",
            descricao: "O conjurador solta uma gargalhada distorcida e profana diante de um inimigo que o esteja observando. O alvo deve realizar um teste de Percepção contra a do conjurador. Se falhar, fica intimidado, sofrendo -5 em testes contra o conjurador por 1d2 rodadas. Além disso, o primeiro ataque que fizer contra o conjurador sofrerá -4 dados de dano, afetado pelo medo inconsciente plantado na mente.",
            nivel: 15,
            imagem: "../imagens/icon_risada_maldita.png",
            classe: "ritual"
        },

        // Rituais de Água (17-20)
        17: {
            id: 17,
            nome: "Limpar Feridas",
            tipo: "Simples",
            elemento: "Água",
            descricao: "O conjurador invoca correntes de água misturadas com compostos curativos e antídotos. Ao tocar ou mirar um aliado dentro de seu campo de visão, a solução mágica limpa feridas, cicatriza cortes e desintoxica o corpo. O alvo recupera 4d8 + 10 pontos de vida. Esse ritual não causa efeitos colaterais e pode ser usado fora de combate.",
            nivel: 15,
            imagem: "../imagens/icon_limpar_feridas.png",
            classe: "ritual"
        },
        18: {
            id: 18,
            nome: "Jato de Água",
            tipo: "Simples",
            elemento: "Água",
            descricao: "O conjurador concentra a umidade do próprio corpo — como saliva ou suor — e a projeta como um jato de água pressurizada. Essa técnica pode ser usada como reação ou ataque quando um inimigo se aproxima. O alvo sofre 2d12 de dano de impacto e é empurrado 3 metros a cada 10 de dano causado. Se for atingido, também recebe o efeito Enfraquecido, reduzindo seu deslocamento pela metade. Testes de Reflexo podem mitigar o impacto.",
            nivel: 15,
            imagem: "../imagens/icon_jato_de_agua.png",
            classe: "ritual"
        },
        19: {
            id: 19,
            nome: "Correnteza",
            tipo: "Simples",
            elemento: "Água",
            descricao: "O conjurador canaliza parte de sua força ofensiva para impulsionar um aliado. Durante 1d4 rodadas, sofre -5 em todos os testes de ataque, mas permite que um aliado à escolha use metade dos dados de dano da arma do conjurador como bônus em seus ataques principais. O efeito é mágico e exige concentração contínua.",
            nivel: 15,
            imagem: "../imagens/icon_correnteza.png",
            classe: "ritual"
        },
        20: {
            id: 20,
            nome: "Melhorar Campo",
            tipo: "Simples",
            elemento: "Água",
            descricao: "O conjurador conjura um círculo de água mágica sob seus pés, criando uma elevação líquida que serve como impulso para um aliado. O aliado recebe +5 em testes de Agilidade enquanto estiver sobre o campo. O efeito dura 1d4 rodadas ou até o campo ser dispersado ou destruído por inimigos.",
            nivel: 15,
            imagem: "../imagens/icon_melhorar_campo.png",
            classe: "ritual"
        },

        // Rituais de Ferocidade (21-24)
        21: {
            id: 21,
            nome: "Rugido Implacável",
            tipo: "Simples",
            elemento: "Ferocidade",
            descricao: "O conjurador solta um rugido ancestral carregado de energia primal, marcando a si mesmo ou a um aliado com o efeito Marcado. Todos os inimigos ao alcance auditivo devem fazer um teste de Vontade. Aqueles que falharem sofrem -5 em ações contra o conjurador e causam -2 dados de dano na primeira rodada após serem afetados.",
            nivel: 15,
            imagem: "../imagens/icon_rugido_implacavel.png",
            classe: "ritual"
        },
        22: {
            id: 22,
            nome: "Criador de Feras",
            tipo: "Simples",
            elemento: "Ferocidade",
            descricao: "Assobiando em um tom místico, o conjurador emite uma frequência que ecoa por grandes distâncias, chamando suas feras aliadas. As feras afetadas ganham o efeito Fortalecido, recebem +2 dados de dano no próximo ataque e aumentam seu deslocamento em +50%. O efeito dura 1d4 rodadas.",
            nivel: 15,
            imagem: "../imagens/icon_criador_de_feras.png",
            classe: "ritual"
        },
        23: {
            id: 23,
            nome: "Escudo de Dentes",
            tipo: "Simples",
            elemento: "Ferocidade",
            descricao: "O conjurador escolhe um aliado e o envolve em um escudo espectral de mandíbulas e presas. O alvo recebe o efeito Protegido e o protetor ganha +5 em Contra-ataque sempre que for atingido. Porém, o alvo também é Marcado, se tornando um foco claro no campo de batalha. O efeito dura até que o conjurador encerre o ritual ou o alvo seja nocauteado.",
            nivel: 15,
            imagem: "../imagens/icon_escudo_de_dente.png",
            classe: "ritual"
        },
        24: {
            id: 24,
            nome: "Instinto Raptor",
            tipo: "Simples",
            elemento: "Ferocidade",
            descricao: "Sentindo o chamado da caça, o conjurador ativa instintos predatórios. Recebe o efeito Fortalecido, com +2 dados de dano no próximo ataque. Se estiver furtivo, aplica ainda Sangramento (4d6) nos ataques bem-sucedidos. O efeito dura 1d4 rodadas.",
            nivel: 15,
            imagem: "../imagens/icon_institno_raptor.png",
            classe: "ritual"
        },

        // Rituais de Vida (25-28)
        25: {
            id: 25,
            nome: "Criar Vinhas",
            tipo: "Simples",
            elemento: "Vida",
            descricao: "O conjurador estende o braço e aponta seu dedo para um inimigo visível, invocando vinhas espessas do solo. O alvo deve realizar um teste de Reflexo. Caso falhe, é envolto pelas vinhas e recebe o efeito Imobilizado. A cada rodada, o alvo pode tentar um teste de Força para romper as vinhas. Se for bem-sucedido, o efeito é dissipado.",
            nivel: 15,
            imagem: "../imagens/icon_criar_vinhas.png",
            classe: "ritual"
        },
        26: {
            id: 26,
            nome: "Armadura Viva",
            tipo: "Simples",
            elemento: "Vida",
            descricao: "O conjurador infunde vida em uma armadura, fazendo crescer espinhos mágicos por toda sua superfície. Um aliado à escolha recebe esse revestimento. Enquanto o efeito durar, qualquer inimigo que o atingir com um ataque corpo a corpo sofre 10 pontos de dano automático, sem direito a reação. O efeito dura 1d4 rodadas.",
            nivel: 15,
            imagem: "../imagens/icon_armadura_de_espinhos.png",
            classe: "ritual"
        },
        27: {
            id: 27,
            nome: "Fornecer Vida",
            tipo: "Simples",
            elemento: "Vida",
            descricao: "Em harmonia com a natureza, o conjurador canaliza a energia vital da floresta e da terra ao redor, criando uma aura de cura intensa. Um aliado à escolha recupera 20 pontos de vida por rodada enquanto o efeito estiver ativo. A cura persiste até que o conjurador seja atordoado, nocauteado ou marcado. O ritual só pode ser sustentado em um aliado por vez.",
            nivel: 15,
            imagem: "../imagens/icon_fornecer_vida.png",
            classe: "ritual"
        },
        28: {
            id: 28,
            nome: "Revestir Anti-Vida",
            tipo: "Simples",
            elemento: "Vida",
            descricao: "O conjurador concede uma bênção corrupta a um aliado, unindo força vital com essência sombria. O aliado recebe o efeito Fortalecido, e sua arma principal passa a causar Roubo de Vida: metade do dano causado é convertida em pontos de vida restaurados. O efeito dura 1d4 rodadas.",
            nivel: 15,
            imagem: "../imagens/icon_revstir_anti_cura.png",
            classe: "ritual"
        },

        // Rituais de Peso (29-32)
        29: {
            id: 29,
            nome: "Peso Arcano",
            tipo: "Simples",
            elemento: "Peso",
            descricao: "O conjurador ativa sua obsessão pelo peso mágico e fortalece seu próximo movimento. Este ritual pode ser usado como ataque ou reação e também pode ser aplicado em um aliado. Ele fornece um bônus mágico ao próximo teste, que pode utilizar os bônus de Peso Arcano em qualquer teste. O primeiro ataque realizado após a ativação causa +2 dados de dano. O efeito dura apenas até o fim da rodada.",
            nivel: 15,
            imagem: "../imagens/icon_peso_arcano.png",
            classe: "ritual"
        },
        30: {
            id: 30,
            nome: "Empurrar Peso",
            tipo: "Simples",
            elemento: "Peso",
            descricao: "O conjurador levanta sua mão e, com um gesto brusco, aplica uma força gravitacional sobre um alvo visível. O inimigo deve fazer um teste de Reflexo. Em caso de falha, ele é erguido e lançado a até 6 metros de distância, sofrendo 2d10 de dano de impacto. Caso atinja uma superfície sólida, recebe +3 dados de dano adicionais. Este ritual pode ser utilizado como reação. O efeito se encerra na mesma rodada.",
            nivel: 15,
            imagem: "../imagens/icon_empurrar_peso.png",
            classe: "ritual"
        },
        31: {
            id: 31,
            nome: "Retrucar",
            tipo: "Simples",
            elemento: "Peso",
            descricao: "Após acertar um ritual, o conjurador pode ativar esta reação quando for alvo de um ataque. Seu corpo se torna leve como o ar, trocando a densidade com seu inimigo mais próximo. O conjurador recebe +5 em Esquiva. Caso o inimigo erre o ataque, ele sofre o mesmo dano do último ritual acertado pelo conjurador. A duração do efeito segue as mesmas condições do ritual anterior utilizado.",
            nivel: 15,
            imagem: "../imagens/icon_retrucar.jpg",
            classe: "ritual"
        },
        32: {
            id: 32,
            nome: "Cosmologia",
            tipo: "Simples",
            elemento: "Peso",
            descricao: "Ao abrir as mãos para o céu, o conjurador invoca a gravidade cósmica para absorver todo impacto iminente. Este ritual pode ser usado como reação ou ataque. Ao ser alvo de projéteis ou ataques à distância, o conjurador ganha +5 em Bloqueio. Se for bem-sucedido, todo o dano é absorvido e transformado em vida extra, que dura por 1d4 rodadas.",
            nivel: 15,
            imagem: "../imagens/icon_cosmologia.png",
            classe: "ritual"
        },

        // Rituais de Sol (33-36)
        33: {
            id: 33,
            nome: "Iluminar",
            tipo: "Simples",
            elemento: "Sol",
            descricao: "O conjurador solta uma energia luminosa entre os dedos, criando um rastro que se liga ao aliado mais próximo. Esse rastro cura 2d8+5 pontos de vida e concede um bônus de +5 na próxima ação do aliado. A energia luminosa permanece ativa por 1d4 rodadas, acompanhando o alvo.",
            nivel: 15,
            imagem: "../imagens/icon_iluminar.jpg",
            classe: "ritual"
        },
        34: {
            id: 34,
            nome: "Criação de Fé",
            tipo: "Simples",
            elemento: "Sol",
            descricao: "O conjurador, ao confiar no sucesso de um aliado, realiza um teste de Religião. Caso o valor iguale ou ultrapasse o teste do aliado, este recebe +5 em seu teste bônus até o final da cena. O ritual pode ser utilizado à distância, desde que o conjurador tenha visão do aliado.",
            nivel: 15,
            imagem: "../imagens/icon_criação_de_fé.jpg",
            classe: "ritual"
        },
        35: {
            id: 35,
            nome: "Amanhecer",
            tipo: "Simples",
            elemento: "Sol",
            descricao: "O conjurador realiza uma bênção simbólica na arma de um aliado, concedendo +2 dados de dano. Essa bênção só pode ser aplicada em uma única arma por vez, com alcance corpo a corpo, e sua duração é de 1d4 rodadas.",
            nivel: 15,
            imagem: "../imagens/icon_amanhecer.jpg",
            classe: "ritual"
        },
        36: {
            id: 36,
            nome: "Tranquilizar",
            tipo: "Simples",
            elemento: "Sol",
            descricao: "O conjurador utiliza uma essência luminosa para aliviar a mente de um aliado que esteja a até 6 metros de distância e não esteja em estado de loucura. A essência molda a aura mental do aliado, restaurando 4d6 pontos de Sanidade.",
            nivel: 15,
            imagem: "../imagens/icon_tranquilar.jpg",
            classe: "ritual"
        },

        // Rituais de Código (37-40)
        37: {
            id: 37,
            nome: "Endireitar",
            tipo: "Simples",
            elemento: "Código",
            descricao: "Se, durante a cena, o conjurador causou dano ou condição a um inimigo e também beneficiou um aliado, ele pode estalar os dedos para liberar 6d12 de dano verdadeiro em um inimigo. Esse dano cura o aliado anteriormente beneficiado. O alcance pode ser visual ou baseado em presença arcana.",
            nivel: 15,
            imagem: "../imagens/icon_endireitar.jpg",
            classe: "ritual"
        },
        38: {
            id: 38,
            nome: "Baralho Primal",
            tipo: "Simples",
            elemento: "Código",
            descricao: "Ao presenciar quatro erros de ataque de um inimigo, o conjurador pode marcá-lo arcânicamente. Ao alcançar quatro marcas, ele cria três cópias ilusórias de si mesmo que imitam suas ações, mas não causam dano. As cópias somem ao serem atacadas ou se o conjurador sofrer dano. Duram até o fim da cena.",
            nivel: 15,
            imagem: "../imagens/icon_baralho_primal.jpg",
            classe: "ritual"
        },
        39: {
            id: 39,
            nome: "Criação de Selo",
            tipo: "Simples",
            elemento: "Código",
            descricao: "Após o conjurador ou aliado causar dano de sanidade ou aplicar uma condição com um ritual, esse ritual é ativado passivamente, fazendo com que todos os rituais do conjurador apliquem o efeito Marcado. A duração do efeito é de 1d4 rodadas.",
            nivel: 15,
            imagem: "../imagens/icon_criação_de_selo.jpg",
            classe: "ritual"
        },
        40: {
            id: 40,
            nome: "Anatomia Colossal",
            tipo: "Simples",
            elemento: "Código",
            descricao: "Se o conjurador já matou um colosso, ele pode sacrificar uma de suas reações para abrir um pequeno portal em seu corpo. Esse portal libera um ataque exatamente igual ao de um colosso derrotado, com os mesmos dados e efeitos. Só pode ser usado uma vez por cena.",
            nivel: 15,
            imagem: "../imagens/icon_anatomia_colossal.jpg",
            classe: "ritual"
        },

        // Rituais de Morte (41-44)
        41: {
            id: 41,
            nome: "Marca da Dor",
            tipo: "Simples",
            elemento: "Morte",
            descricao: "O conjurador aplica uma marca em um inimigo até 9 metros, causando 2d12 de dano de sangramento e aplicando o efeito Marcado. A marca permanece por 1d4 rodadas.",
            nivel: 15,
            imagem: "../imagens/icon_marcar_a_dor.jpg",
            classe: "ritual"
        },
        42: {
            id: 42,
            nome: "Nuvem de Cinzas",
            tipo: "Simples",
            elemento: "Morte",
            descricao: "O conjurador cria uma nuvem ao redor de si mesmo ou de um aliado, fornecendo +5 em Furtividade e +2 dados de dano. A nuvem dura 1d4 rodadas ou até se dissipar.",
            nivel: 15,
            imagem: "../imagens/icon_nuvem_de_cinza.jpg",
            classe: "ritual"
        },
        43: {
            id: 43,
            nome: "Aplicar Morte",
            tipo: "Simples",
            elemento: "Morte",
            descricao: "O conjurador sacrifica 2d6 pontos de sanidade para banhar uma arma (sua ou de um aliado) com energia necrosada, concedendo +2 dados de dano e o efeito Sangramento (2d6). O efeito persiste por 1d4 rodadas.",
            nivel: 15,
            imagem: "../imagens/icon_aplicar_a_morte.jpg",
            classe: "ritual"
        },
        44: {
            id: 44,
            nome: "Bloqueio Cadavérico",
            tipo: "Simples",
            elemento: "Morte",
            descricao: "Se houver um cadáver a até 12 metros, o conjurador o invoca do subsolo para protegê-lo. O corpo serve como escudo, com vida entre 1d12 e 4d12 (dependendo do tamanho). Ele bloqueia ataques até ser destruído e segue o conjurador até o fim da cena.",
            nivel: 15,
            imagem: "../imagens/icon_bloqueio_cadaverico.jpg",
            classe: "ritual"
        },

        // Rituais de Amor (45-48)
        45: {
            id: 45,
            nome: "Parceria",
            tipo: "Simples",
            elemento: "Amor",
            descricao: "Se o conjurador e um aliado estiverem a até 12 metros e compartilharem bônus semelhantes, ao lutarem juntos ou próximos, os bônus sobem de +5 para +10 (ou níveis superiores). Não se aplica a bônus de violência. Só pode ser usado uma vez por cena.",
            nivel: 15,
            imagem: "../imagens/icon_parceira.jpg",
            classe: "ritual"
        },
        46: {
            id: 46,
            nome: "Simplicidade de Cura",
            tipo: "Simples",
            elemento: "Amor",
            descricao: "O conjurador cura um aliado (em alcance de 12 metros, visual ou arcano) em 3d8+10 pontos. Se esse aliado receber outra cura, ela será dobrada na próxima vez. O conjurador não pode estar segurando armas ao usar este ritual.",
            nivel: 15,
            imagem: "../imagens/icon_simplicidade_de_cura.jpg",
            classe: "ritual"
        },
        47: {
            id: 47,
            nome: "Criar Vínculo",
            tipo: "Simples",
            elemento: "Amor",
            descricao: "O conjurador combina uma promessa com um aliado. Se ambos tentarem cumprir essa promessa em uma ação específica, recebem +5 no próximo teste relacionado. A duração do bônus é apenas até a realização do teste prometido.",
            nivel: 15,
            imagem: "../imagens/icon_criar_vinculo.jpg",
            classe: "ritual"
        },
        48: {
            id: 48,
            nome: "Motivação Familiar",
            tipo: "Simples",
            elemento: "Amor",
            descricao: "O conjurador banha sua arma com uma aura dourada que simboliza laços inquebráveis. A arma recebe +2 dados de dano e ignora o efeito Protegido de inimigos. A bênção dura 1d4 rodadas.",
            nivel: 15,
            imagem: "../imagens/icon__motivação_familiar.jpg",
            classe: "ritual"
        },

        // Rituais Escarlate (49-51)
        49: {
            id: 49,
            nome: "Risos da Companhia",
            tipo: "Simples",
            elemento: "Escarlate",
            descricao: "O conjurador canaliza o riso cruel da Família Escarlate, zombando de seus inimigos com um deboche sobrenatural. Este ritual só pode ser realizado por um ser diabólico durante a jogada de iniciativa. Se executado corretamente, permite ao conjurador escolher o inimigo com menor iniciativa ou menor agilidade e bloquear uma habilidade de ritual ou ataque de arma dele por 1d4 rodadas. Durante esse tempo, a habilidade escolhida não causa mais dano ao conjurador. O ritual possui alcance de até 12 metros e é ativado por efeito sonoro.",
            nivel: 15,
            imagem: "../imagens/Icon_Risos_da_compnhia.jpg",
            classe: "ritual"
        },
        50: {
            id: 50,
            nome: "Ataque da Sede",
            tipo: "Simples",
            elemento: "Escarlate",
            descricao: "O conjurador responde ao dano sofrido com uma fúria avassaladora. Usado como reação ou ação ofensiva, este ritual consome 1d6 de Sanidade do conjurador e aplica +3 dados de dano da arma corpo a corpo no alvo atingido. Além disso, o conjurador regenera metade do dano causado, podendo ultrapassar o limite de vida máxima. Pode ser utilizado também após a insanidade de um inimigo. O ritual é poderoso e sua intensidade cresce com o desespero.",
            nivel: 15,
            imagem: "../imagens/icon_ataque_da_sede.jpg",
            classe: "ritual"
        },
        51: {
            id: 51,
            nome: "Sede de Sangue",
            tipo: "Simples",
            elemento: "Escarlate",
            descricao: "Ao consumir sangue, o conjurador entra em um estado de frenesi absoluto. Ele ou um aliado em até 12 metros recebe o efeito Rage por 1d4 rodadas. Durante esse tempo, ganha +30 pontos de vida temporários, +1 reação adicional e +2 dados de dano. Este ritual é ideal para combates prolongados e momentos de virada. Seu efeito não é cumulativo.",
            nivel: 15,
            imagem: "../imagens/icon_sede_de_sangue.jpg",
            classe: "ritual"
        },

        // Rituais Piromância (52-54)
        52: {
            id: 52,
            nome: "Boca de Chamas",
            tipo: "Simples",
            elemento: "Piromância",
            descricao: "O conjurador ativa os instintos primais de uma fera ou aliado com características bestiais, fortalecendo seu corpo e ataque. Aplica o efeito Fortalecido, +1 dado de Força, +3 dados de dano e aumenta o alcance da mordida em 3 metros. O ataque também causa Queimando com 4d6 de dano de fogo. Os efeitos duram 1d4 rodadas e só podem ser aplicados a criaturas com afinidade natural.",
            nivel: 15,
            imagem: "../imagens/icon_boca_de_chamas.jpg",
            classe: "ritual"
        },
        53: {
            id: 53,
            nome: "Fortalecer aos Céus",
            tipo: "Simples",
            elemento: "Piromância",
            descricao: "Este ritual só pode ser realizado se o conjurador estiver voando ou flutuando. Ao conjurá-lo, uma aura infernal cobre o conjurador ou um aliado, curando 3d8 pontos de vida e concedendo uma armadura mágica que reduz danos, como se fosse feita de um minério de patente superior. O efeito dura 1d4 rodadas e representa a benção dos céus ardentes sobre o guerreiro.",
            nivel: 15,
            imagem: "../imagens/icon_fortalecer_aos_ceus.jpg",
            classe: "ritual"
        },
        54: {
            id: 54,
            nome: "Grito Infernal",
            tipo: "Simples",
            elemento: "Piromância",
            descricao: "O conjurador absorve o fogo ao seu redor ou sobre si mesmo, convertendo-o em energia vital. Ganha 50 pontos de vida temporários e cresce em porte, aumentando em uma categoria. O ritual pode ser utilizado apenas uma vez por cena e é ativado ao estar em contato com chamas vivas. Um efeito devastador que transforma dor em poder bruto.",
            nivel: 15,
            imagem: "../imagens/icon_grito_infernal.jpg",
            classe: "ritual"
        },

        // Rituais Ouro (55-56)
        55: {
            id: 55,
            nome: "Moldar ao Ouro",
            tipo: "Simples",
            elemento: "Ouro",
            descricao: "O conjurador sacrifica uma moeda de alto valor, derretendo-a e banhando sua arma com essência dourada. A arma se torna de ouro por 1d8 rodadas, recebendo bônus em ataques e resistência. Caso já seja de ouro, a arma ganha +3 dados de dano crítico. Apenas uma arma pode ser encantada por vez. Um ritual ideal para quem valoriza o peso da fortuna.",
            nivel: 15,
            imagem: "../imagens/icon_moldar_ouro.jpg",
            classe: "ritual"
        },
        56: {
            id: 56,
            nome: "Esqueletos de Ouro",
            tipo: "Simples",
            elemento: "Ouro",
            descricao: "O conjurador pode, ao encontrar um cadáver ou restos humanos próximos, invocar um esqueleto moldado em ouro para auxiliá-lo. O esqueleto retorna com metade da vida máxima do antigo corpo e recebe +10 em reações contra ataques de fogo. O esqueleto obedece o conjurador até o fim da cena, podendo ser invocado apenas uma vez por cena.",
            nivel: 15,
            imagem: "../imagens/icon_esqueleto_de_ouro.jpg",
            classe: "ritual"
        },

        // Ritual Elemento (57)
        57: {
            id: 57,
            nome: "Transmutação Animal",
            tipo: "Simples",
            elemento: "Elemento",
            descricao: "O conjurador altera o tipo elementar e a essência biológica de um animal, trocando temporariamente sua ficha por outro animal de porte equivalente. O ritual dura por toda a cena, e o efeito se desfaz caso a criatura entre em estado morrendo, voltando à sua forma original. Este ritual é especialmente útil para adaptação estratégica e manipulação de combate.",
            nivel: 15,
            imagem: "../imagens/icon_transmutar_animal.jpg",
            classe: "ritual"
        },

        // Rituais Escarlate Brutal (58-59)
        58: {
            id: 58,
            nome: "Sacrifício do Final",
            tipo: "Brutal",
            elemento: "Escarlate",
            descricao: "O conjurador realiza uma reverência macabra e decide que aquele será o seu último ato. Ele marca um inimigo em seu alcance visual ou sonoro, aplicando o efeito Marcado e Enfraquecido, reduzindo -5 das reações do alvo. Durante o combate, o conjurador acumula todo o dano que recebeu e causou contra esse inimigo. Quando desejar encerrar a batalha, ele pode invocar o ritual, provocando uma explosão de sangue que causa o total acumulado como dano no inimigo e regenera metade da vida perdida. Pode ser usado uma vez por cena, ou novamente após eliminar um inimigo e beber seu sangue.",
            nivel: 30,
            imagem: "../imagens/icon_Sacrificio do final.jpg",
            classe: "ritual"
        },
        59: {
            id: 59,
            nome: "Deboche Defensivo",
            tipo: "Brutal",
            elemento: "Escarlate",
            descricao: "Este ritual pode ser usado apenas como reação. O conjurador sacrifica 1d12 pontos de vida para conceder a si ou a um aliado +10 em bloqueio e contra-ataque por 1d4 rodadas. Caso o contra-ataque seja bem-sucedido, o inimigo recebe +2 dados de dano e o conjurador regenera metade da vida perdida. Pode ser usado uma vez por cena, ou novamente se o conjurador consumir um órgão.",
            nivel: 30,
            imagem: "../imagens/icon_deboche_defensivo.jpg",
            classe: "ritual"
        },

        // Rituais Escarlate Diabólico (60-62)
        60: {
            id: 60,
            nome: "Sangramento Viral",
            tipo: "Diabólico",
            elemento: "Escarlate",
            descricao: "O conjurador cospe sangue infectado em um inimigo a até 12 metros. O alvo deve realizar um teste de Esquiva. Caso fracasse, sofre o efeito Sangramento (4d12 por rodada), além de -5 em todas as suas reações. O conjurador se cura com o dano causado e o alvo contrai automaticamente a Maldição Escarlate. Pode ser usado uma vez por inimigo.",
            nivel: 50,
            imagem: "../imagens/icon_sangramento_viral.jpg",
            classe: "ritual"
        },
        61: {
            id: 61,
            nome: "Traumatizar",
            tipo: "Diabólico",
            elemento: "Escarlate",
            descricao: "O conjurador invoca imagens opressoras que afetam todos os inimigos que o estiverem observando. Cada alvo deve realizar um teste de Vontade. Se falhar, sofre 6d6 de dano de sanidade e o conjurador regenera metade disso em vida. O alvo recebe o efeito Amedrontado e passa a tomar +15 de dano adicional de sanidade durante o efeito, que dura 1d4 rodadas.",
            nivel: 50,
            imagem: "../imagens/icon_trauamtizar.jpg",
            classe: "ritual"
        },
        62: {
            id: 62,
            nome: "Efeito do Bobo",
            tipo: "Diabólico",
            elemento: "Escarlate",
            descricao: "Somente utilizável enquanto o conjurador estiver furtivo. O ritual arrisca um ataque entre dois extremos: sucesso crítico ou desastre. O conjurador joga 1d2. Em 1, o ataque falha catastróficamente. Em 2, o ataque é um acerto crítico com dano máximo e regenera parte da vida do conjurador. Pode ser usado apenas uma vez por cena, ou de forma ilimitada se o conjurador estiver em sua pior condição física ou mental.",
            nivel: 50,
            imagem: "../imagens/icon_efeito_do_bobo.jpg",
            classe: "ritual"
        },

        // Rituais Escarlate Complexo (63-66)
        63: {
            id: 63,
            nome: "Cria de Sangue",
            tipo: "Complexo",
            elemento: "Escarlate",
            descricao: "O conjurador rasga sua própria carne e sacrifica parte da vida para gerar uma cria de sangue: um inseto elemental da caveira com porte médio ou grande. A força e tamanho da criatura variam de acordo com a quantidade de vida sacrificada. A cria protege o conjurador até o fim da cena. O ritual só pode ser usado uma vez por cena.",
            nivel: 70,
            imagem: "../imagens/icon_cria_de_sangue.jpg",
            classe: "ritual"
        },
        64: {
            id: 64,
            nome: "Desfile da Duquesa",
            tipo: "Complexo",
            elemento: "Escarlate",
            descricao: "O conjurador desfila imponentemente, aplicando o efeito Amedrontado em todos os inimigos em seu alcance visual ou sonoro. A cada ponto de sanidade perdido por inimigos, o conjurador regenera pontos de vida. O efeito persiste até o fim da cena, enquanto houver dano de sanidade sendo causado.",
            nivel: 70,
            imagem: "../imagens/icon_desfle_da_duqeusa.jpg",
            classe: "ritual"
        },
        65: {
            id: 65,
            nome: "Fome do Visconde",
            tipo: "Complexo",
            elemento: "Escarlate",
            descricao: "O conjurador ou um aliado se torna imune a sangramento e recebe o efeito Rage até o fim da cena. Toda vez que atacar um inimigo em sangramento, causa +5 dados de dano e regenera metade do dano como vida, podendo ultrapassar a vida máxima.",
            nivel: 70,
            imagem: "../imagens/icon_fome_do_visconde.jpg",
            classe: "ritual"
        },
        66: {
            id: 66,
            nome: "Dentes Luxuosos",
            tipo: "Complexo",
            elemento: "Escarlate",
            descricao: "O conjurador alimenta sua fera com carne e sangue. Ele pode aplicar o efeito Rage em um animal aliado, independente do porte. Para cada nível de porte (1 a 4), o ataque da fera recebe +3 dados de dano. O conjurador e a fera curam metade do dano causado. Dura 1d8 rodadas e não é cumulativo.",
            nivel: 70,
            imagem: "../imagens/icon_dentes_luxuousos.jpg",
            classe: "ritual"
        },

        // Rituais Raio Brutal (67-71)
        67: {
            id: 67,
            nome: "Tempestade de Dor",
            tipo: "Brutal",
            elemento: "Raio",
            descricao: "O conjurador fica fascinado por explosões e reações que podem gerar estragos grandes. O Conjurador perde 12 pontos de sanidade, porém em um alcance de 6 metros, cria uma tempestade de relâmpagos que causa 6d8 pontos de dano elétrico, causando o dobro de dano em armaduras. O alvo deve realizar um teste de fortitude para não ficar atordoado por 1 rodada. O alvo pode esquivar antes, ignorando o dano e a condição em caso de sucesso.",
            nivel: 30,
            imagem: "../imagens/icon_tempestade_dor.jpg",
            classe: "ritual"
        },
        68: {
            id: 68,
            nome: "Cárcere Sintético",
            tipo: "Brutal",
            elemento: "Raio",
            descricao: "O conjurador precisa estar com as mãos livres. Suas táticas e controle de energia criam uma corrente que puxa um inimigo, deixando-o enraizado por 1d2 rodadas e causando 15 de dano + 3d8 elétrico. O alvo pode fazer um teste de esquiva para desviar. O efeito dura até o alvo ter sucesso em um teste de força/luta no início de seu turno.",
            nivel: 30,
            imagem: "../imagens/icon_carcere_sintetico.jpg",
            classe: "ritual"
        },
        69: {
            id: 69,
            nome: "Raio Leviatã",
            tipo: "Brutal",
            elemento: "Raio",
            descricao: "O conjurador se sente arrepiado em combate após presenciar um ataque de um animal. O ritual pode ser usado para apontar um alvo a até 6 metros, que recebe o grito elétrico materializado de um leviatã marcante do conjurador, causando 4d10 pontos de dano elétrico e o dobro de dano em armaduras. O alvo fica silenciado por 1d2 rodadas. Um teste de esquiva bem-sucedido permite ignorar totalmente o ritual.",
            nivel: 30,
            imagem: "../imagens/icon_raio_leviata.jpg",
            classe: "ritual"
        },
        70: {
            id: 70,
            nome: "Reflexo Fantasmagórico",
            tipo: "Brutal",
            elemento: "Raio",
            descricao: "O conjurador se sente no mesmo reino dos fantasmas, sentindo sua presença. Ele pode marcar um alvo ou a si próprio, aumentando o contra-ataque ou a esquiva em +5 após desviar de um ataque. O efeito não acumula. Em uma luta brutal, o alvo recebe o efeito Revide. Apenas uma única marca pode estar ativa em um aliado. A marca dura toda a cena, mas em uma luta brutal sua duração é de 1d4 rodadas.",
            nivel: 30,
            imagem: "../imagens/icon_reflexo_fantasmagorico.jpg",
            classe: "ritual"
        },
        71: {
            id: 71,
            nome: "Bola de Raio",
            tipo: "Brutal",
            elemento: "Raio",
            descricao: "O conjurador cria uma bola elétrica em seus dedos. O número de bolas elétricas geradas é igual ao número de armas de ferro próximas que seus aliados possuam em até 12 metros. Cada bola elétrica causa 2d12 pontos de dano elétrico. Atacar com as bolas obriga o alvo a tentar esquivar. Caso fracasse, o alvo recebe o dano acumulado de todas as bolas. Alcance: 9 metros.",
            nivel: 30,
            imagem: "../imagens/icon_bola_raio.jpg",
            classe: "ritual"
        },

        // Rituais Raio Diabólico (72-76)
        72: {
            id: 72,
            nome: "Aprimorar Circuito",
            tipo: "Diabólico",
            elemento: "Raio",
            descricao: "O conjurador descarrega energia em um alvo com complemento de metal (em si ou em um aliado), reforçando seus circuitos vitais: cura 4d8 pontos de vida, concede +20 de vida extra, +1 dado em Força e +2 dados de dano em todas as habilidades físicas e ataques. Alcance: visão. Duração: até o fim da cena ou até o conjurador entrar em estado Morrendo.",
            nivel: 50,
            imagem: "../imagens/icon_aprimorar_circuito.jpg",
            classe: "ritual"
        },
        73: {
            id: 73,
            nome: "Raio da Morte",
            tipo: "Diabólico",
            elemento: "Raio",
            descricao: "O conjurador molda um raio como uma lâmina e investe usando Força–Luta. Ao atingir um alvo a até 6 metros, causa 8d8 de dano elétrico (dobra se o alvo estiver com armadura reforçada), ignora guarda e aplica o efeito Vulnerável (-5 em reações). O alvo reage como contra um ataque corpo a corpo. Sucesso em Fortitude reduz o dano pela metade.",
            nivel: 50,
            imagem: "../imagens/icon_raio_da_morte.jpg",
            classe: "ritual"
        },
        74: {
            id: 74,
            nome: "Frenesi Elétrica",
            tipo: "Diabólico",
            elemento: "Raio",
            descricao: "O conjurador injeta um fluido elétrico no próprio corpo, ganhando 30 de vida temporária e o efeito Revide em Luta Brutal. Narrativamente, não precisa dormir nem sente cansaço por horas. Em Luta Brutal, só é possível manter um fluido ativo por vez. Duração: 1d4 rodadas.",
            nivel: 50,
            imagem: "../imagens/icon_frenesi_eletrica.jpg",
            classe: "ritual"
        },
        75: {
            id: 75,
            nome: "Pescar Nuvens",
            tipo: "Diabólico",
            elemento: "Raio",
            descricao: "O conjurador puxa uma nuvem densa para uma área do cenário, concedendo +10 em Furtividade para todos os aliados na zona. Em Luta Brutal, a área pode ser criada apenas uma vez por luta, ocupa 2 espaços e torna os aliados obrigatoriamente furtivos; enquanto furtivos por este efeito, qualquer dano que causarem recebe +2 dados. Duração: enquanto a área persistir nesta cena.",
            nivel: 50,
            imagem: "../imagens/icon_pescar_nuvens.jpg",
            classe: "ritual"
        },
        76: {
            id: 76,
            nome: "Acerto Desesperado",
            tipo: "Diabólico",
            elemento: "Raio",
            descricao: "Pré-requisito: o conjurador deve ter acertado um crítico nesta cena. Escolha um alvo (aliado ou si mesmo): concede +2 dados de dano em acertos críticos. Além disso, quando o alvo acertar um crítico com projéteis, pode rolar novamente o dano da mesma arma no mesmo turno (replicação). Afeta apenas um alvo por vez. Duração: 1d4 rodadas.",
            nivel: 50,
            imagem: "../imagens/icon_acerto_desesperado.jpg",
            classe: "ritual"
        },

        // Rituais Raio Complexo (77-80)
        77: {
            id: 77,
            nome: "Raio de Raijin",
            tipo: "Complexo",
            elemento: "Raio",
            descricao: "O conjurador pode usar este ritual uma vez por cena. Após sofrer dano elétrico, ele pode absorvê-lo e despejar um raio poderoso dos céus, que possui um alcance de 12 metros, causando 10d8+30 pontos de dano elétrico. O dano dobra contra alvos com armadura pesada ou média e queima todas as armas de ferro ou minério semelhantes. Em Luta Brutal, o alcance é de 2 quadrantes (6 metros de largura) e seres atingidos ficam atordoados. A defesa utilizada é Esquiva.",
            nivel: 70,
            imagem: "../imagens/icon_raio_raijin.jpg",
            classe: "ritual"
        },
        78: {
            id: 78,
            nome: "Raio dos Antigos",
            tipo: "Complexo",
            elemento: "Raio",
            descricao: "Pré-requisito: o conjurador deve conhecer a lenda do ser que não pode ser dito. Após perder metade da sanidade na cena ou já estar próximo da loucura, o ritual pode ser usado somente uma vez. O conjurador se corrompe com vozes daquele ser e despeja um raio que explode o chão em duas sequências, causando 8d12 pontos de dano elétrico. Inimigos atingidos precisam fazer um teste de Esquiva; caso falhem, sofrem o dano e o efeito Exposto por 1 rodada. Seu alcance é de 12 metros, mas atinge apenas um alvo de cada vez.",
            nivel: 70,
            imagem: "../imagens/icon_raio_antigos.jpg",
            classe: "ritual"
        },
        79: {
            id: 79,
            nome: "Sobrecarga",
            tipo: "Complexo",
            elemento: "Raio",
            descricao: "O conjurador gasta tudo de si para sobreviver, consumindo 25 pontos de sanidade para conceder ao alvo +25 em um acerto de ataque ou ritual no próximo turno. O alvo pode ser um aliado ou o próprio conjurador, mas afeta apenas uma pessoa. O alcance é de 12 metros. Inimigos podem fazer um teste de Percepção; em caso de sucesso, o bônus de acerto é reduzido de +25 para +15.",
            nivel: 70,
            imagem: "../imagens/icon_sobrecarga.jpg",
            classe: "ritual"
        },
        80: {
            id: 80,
            nome: "Portal de Eletricidade",
            tipo: "Complexo",
            elemento: "Raio",
            descricao: "O conjurador cria uma esfera de eletricidade capaz de transformar seres e objetos em plasma, desmaterializando seu corpo físico para se proteger. O alvo (o próprio conjurador ou um aliado a 3 metros em Luta Brutal) fica imune a dano por uma rodada. Este uso é único. Em Luta Brutal, a duração é de 1d2 rodadas.",
            nivel: 70,
            imagem: "../imagens/icon_portal_eletricidade.jpg",
            classe: "ritual"
        }
    },

    "pactos": {
        1: {
            id: 1,
            nome: "Pacto do Bobo",
            tipo: "Lealdade",
            elemento: "Escarlate",
            descricao: "Um acordo de Lealdade com um membro da Companhia Escarlate que tinha a função antigamente de provocar o humor e fazer jogos macabros com suas vítimas, o portador do vínculo recebe +20 pontos de vida, +1 mutação de tema perverso Escarlate, +Adquire sentidos diabólicos, ganhando +5 em percepção contra seres diabólicos, +5 em luta, enganação, beber, fortitude e esquiva, +Adquire 2 rituais escarlate de nível simples ou brutal. Aceitar o pacto proibe o personagem de usar qualquer tipo de arma, que não seja a arma do Bobo, quebrar o pacto ou trair a Companhia causa a libertação do Bobo.",
            nivel: 50,
            imagem: "../imagens/icon_pacto_bobo.jpg",
            classe: "pacto"
        }
        // Adicione outros pactos aqui seguindo o mesmo formato...
    }
};

// Mapeamento de requisitos de nível
window.ritualLevelRequirements = {
    'Simples': 15,
    'Brutal': 30,
    'Diabólico': 50,
    'Complexo': 70,
    'Ancião': 85,
    'Acordo': 15,
    'Lealdade': 50,
    'Combate': 50,
    'Maldição': 50,
    'Ancestral': 70
};
