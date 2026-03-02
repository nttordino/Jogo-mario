//=============================================
// Jogo do Mario
//=============================================

const mario = document.querySelector('.mario'); // acha o mario
const cano = document.querySelector('.cano'); // acha o cano
const nuvem = document.querySelector('.nuvem'); // acha a nuvem
const telaFim = document.querySelector('.fim'); // acha a tela de game over
const botaoReiniciar = document.querySelector('.reiniciar');

console.log('=== PARADA 01 ===');
console.log('Mario:', mario);
console.log('Cano:', cano);
console.log('Nuvem:', nuvem);
console.log('Tela de Fim:', telaFim);
console.log('Botão:', botaoReiniciar);

function pular() {
    if (!mario) return; // evita erro se não encontrar o elemento

    mario.classList.add('pular');

    // setTimeout = espera um tempo e depois executa algo
    setTimeout(function () {
        // Mario volta ao normal depois do pulo
        mario.classList.remove('pular');
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
    let posicaoCano = cano.offsetLeft;

    //getComputedStyle = pega o estilo atual do elemento
    // replace tira o 'px' do valor e o + na frente transforma em numero
    let posicaoMario = +window.getComputedStyle(mario).bottom.replace('px', '');

    console.log('cano:', posicaoCano, 'Mario:', posicaoMario);
})