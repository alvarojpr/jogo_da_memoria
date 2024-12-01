const grid = document.querySelector('.grid');
const nomedascartas = ['um', 'dois', 'tres', 'quatro', 'cinco', 'seis'];//vetor com o nome das cartas
let pontuacao = 0;
const divpontuacao = document.getElementById('pontos');

const carregarJogo = () => {//funçao que inicia o jogo
    const botao = document.getElementById('comecar');
    botao.style.display = 'none';
    divpontuacao.style.display = 'block';
    divpontuacao.innerHTML = 'Pontuação: ' + pontuacao;
    const duplicateCharacters = [...nomedascartas, ...nomedascartas];//coloco as cartas pareadas em um array
    const arrayEmbaralhado = duplicateCharacters.sort(() => Math.random() - 0.5); //o sort ordena, mas com essa função ele embaralha
    
    arrayEmbaralhado.forEach((nomedascartas) => {//pra cada nome do array, insere uma nova carta na tela
        const carta = criarCarta(nomedascartas);
        grid.appendChild(carta);//agora a carta foi adicionada ao grid!
    });
}
const criarCarta = (nome) => {
    const carta = document.createElement('div');//cria uma div chamada 'carta'
    carta.className = 'carta';                  //essa div vai ser da classe "carta"
    const frente = document.createElement('div');
    frente.className = 'face frente';
    const tras = document.createElement('div');
    tras.className = 'face tras';

    frente.style.backgroundImage = `url(imagens/${nome}.jpg)`;//a frente da carta vai receber a imagem com o nome do parametro recebido

    //esse método appendChild adiciona um filho ao elemento antes do ponto
    carta.appendChild(frente);//agora frente é filho de carta
    carta.appendChild(tras);//agora tras é filho de carta
    carta.setAttribute('data-nome', nome);
    carta.addEventListener('click', revelarCarta);//a carta sera revelada quando for clicada

    return carta;
}

let primeiraCarta = '';
let segundaCarta = '';

const revelarCarta = ({ target }) => {//target recupera o elemento que foi clicado
    if (target.parentNode.className.includes('revelar-carta')) {
        return;//a mesma imagem nao pode ser clicada 2 vezes
    }
    if (primeiraCarta === '') {//se a carta nao foi clicada ainda
        target.parentNode.classList.add('revelar-carta');//revele-a
        primeiraCarta = target.parentNode;//primeira carta recebe target
    } else if (primeiraCarta != '' && segundaCarta === '') {
        target.parentNode.classList.add('revelar-carta');//revele-a
        segundaCarta = target.parentNode;//segunda carta recebe target
        compararCartas();
    }
}
const compararCartas = () => {
    const first = primeiraCarta.getAttribute('data-nome');//pega os nomes das cartas para fazer as comparações
    const second = segundaCarta.getAttribute('data-nome');

    if (first === second) {
        console.log(first, second);
        primeiraCarta.firstChild.classList.add('carta-acertada');//adiciona a classe que coloca ok na imagem
        segundaCarta.firstChild.classList.add('carta-acertada');
        primeiraCarta = '';//volta os trem pro conteúdo inicial
        segundaCarta = '';
        pontuacao += 10;
        divpontuacao.innerHTML = 'Pontuação: ' + pontuacao;

        checkFimDeJogo();
    } else {
        setTimeout(() => {
            primeiraCarta.classList.remove('revelar-carta');//remove a classe que mostra a carta
            segundaCarta.classList.remove('revelar-carta');
            primeiraCarta = '';
            segundaCarta = '';
            pontuacao -= 5;
            divpontuacao.innerHTML = 'Pontuação: ' + pontuacao;
        }, 500);
    }
}
checkFimDeJogo = () => {
    const disableCards = document.querySelectorAll('.carta-acertada');//pega todas as cartas que foram acertadas

    if (disableCards === 12) {
        const span = document.getElementById('vitoria');//mostra a mensagem de vitoria
        span.style.display = 'block';
    }
}


/*
    Uma expressão arrow function possui uma sintaxe mais curta quando comparada a uma expressão de função 
    (function expression) e não tem seu próprio this, arguments, super ou new.target. Estas expressões de funções 
    são melhor aplicadas para funções que não sejam métodos, e elas não podem ser usadas como construtoras 
    (constructors).
*/