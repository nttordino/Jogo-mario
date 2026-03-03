//=============================================
// Jogo do Espadachim
//=============================================

let intervalo;
let time = 0;
let jogoAtivo = true;
let divTempo = document.querySelector('.time')
let pontos = 0;
const divPontos = document.querySelector('.pontos');

const espadachim = document.querySelector('.espadachim'); // acha o espadachim
const pedras = document.querySelector('.pedras'); // acha o cano
const nuvem = document.querySelector('.nuvem'); // acha a nuvem
const telaFim = document.querySelector('.fim'); // acha a tela de game over
const botaoReiniciar = document.querySelector('.reiniciar');

console.log('=== PARADA 01 ===');
console.log('Espadachim:', espadachim);
console.log('Pedras:', pedras);
console.log('Nuvem:', nuvem);
console.log('Tela de Fim:', telaFim);
console.log('Botão:', botaoReiniciar);

function contarTempo() {
    clearInterval(intervalo); // evita criar vários intervalos

    intervalo = setInterval(function() {
        if (jogoAtivo) {
            pontos++;
            divPontos.innerHTML = pontos;
            console.log("Pontos:", pontos);
        }
    }, 1000);
}

contarTempo();



function pular() {
    if (!espadachim) return; // evita erro se não encontrar o elemento

    espadachim.classList.add('pular');

    // setTimeout = espera um tempo e depois executa algo
    setTimeout(function () {
        // Espadachim volta ao normal depois do pulo
        espadachim.classList.remove('pular');
    }, 800); // 500 milissegundos = 0,5s
}

document.addEventListener('keydown', function(){
    //Mostra no console quando a tecla é pressionada
    console.log('Telca pressionada! chamando função pular()')

    //Qual function() devo chamar?
    pular();
})

//faça funcionar com um clique na tecla
document.addEventListener('click', function(){
    console.log('Click do Mouse! chamado funcção pular()')
    pular();
})

console.log('====== INICIANDO LOOP DO JOGO ======');
console.log('agora o jogo vai começar a verificar a colisão...');

let loopdoJogo = setInterval(function(){
    //offsetleft = distancia do elemento ate a borda esquerda da tela
    let posicaoPedras = pedras.offsetLeft;

    //getComputedStyle = pega o estilo atual do elemento
    // replace tira o 'px' do valor e o + na frente transforma em numero
    let posicaoEspadachim = +window.getComputedStyle(espadachim).bottom.replace('px', '');

    console.log('cano:', posicaoPedras, 'Espadachim:', posicaoEspadachim);
    if (posicaoPedras <= 19 && posicaoPedras > 0 && posicaoEspadachim < 60) {
        console.log('=== COLISÃO DETECTADA ===');
        console.log('Pedras na posição', posicaoPedras);
        console.log('Espadachim na posição', posicaoEspadachim);
        console.log('Fim de Jogo!');

        //para as pedras

        pedras.style.animation = 'none';
        pedras.style.left = posicaoPedras + 'px';

        // para o espadachim

        espadachim.style.animation = 'none';
        espadachim.style.bottom = posicaoEspadachim + 'px';

        //troca de do espadachim para gamer over
    
        espadachim.src = './img/caveira.svg';
        espadachim.style.width = '250px';

        //mostrar a tela de game over

        telaFim.style.visibility = 'visible';

        //parar  o loop

        clearInterval(loopdoJogo);
        clearInterval(intervalo);
        jogoAtivo = false;


    }

    function reiniciarJogo(){
        //Esconder a tela de game over
        telaFim.style.visibility = 'hiden';
        //Reustaura o espadachim
        pedras.style.animation = 'mexerCano 1.5s infinite linear';
        pedras.style.left = '';
        //Restaura o Espadachim
        espadachim.src = './img/mario.gif';
        espadachim.style.width = '130px';
        espadachim.style.bottom = '0px';
        espadachim.style.animation = ''; //remove qualquer animação fixa
        
        //=================================
        //>> CRIAR UM NOVO LOOP
        //=================================

        loopdoJogo = setInterval(function(){
            let posicaoPedras = pedras.offsetLeft;
            let posicaoEspadachim = +window.getComputedStyle(espadachim).bottom.replace('px', '')

            //A mesma condição de colisão anterior
            if (posicaoPedras <=100 && posicaoPedras > 0 && posicaoEspadachim < 60){
                console.log('==== COLISÃO NO JOGO, REINICIANDO');

                pedras.style.animation = 'none';
                pedras.style.left = posicaoPedras + 'px';

                espadachim.style.animation = 'none';
                espadachim.style.bottom = posicaoEspadachim + 'px';
                espadachim.src = './img/game-over.png'
                espadachim.style.width= '70px';
                telaFim.style.visibility = 'visible'
                clearInterval(loopdoJogo);

                jogoAtivo = false;

            }
        }, 10);

        if (jogoAtivo === true){
            contarTempo();
        }


        
    }
});
// FAZER O BOTÃO DE REINICIAR
botaoReiniciar.addEventListener('click', function() {
    console.log('Botão Reiniciar Clicado!');
    location.reload();
    pontos = 0;
    divPontos.innerHTML = 0;
    jogoAtivo = true;
    contarTempo();
});
