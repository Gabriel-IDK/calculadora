document.addEventListener('DOMContentLoaded', () => {

    let telaNum = document.querySelector('#display');
    const numeros = document.querySelectorAll('.num');
    const clear = document.querySelector('#clear');
    const operadores = document.querySelectorAll('.op');
    const result = document.querySelector('#equals');
    let salvos = JSON.parse(localStorage.getItem('calcHistory')) || [];

    let estadoOp = true;

    // Função para atualizar o display do histórico ao carregar a página
    const updateHistoryDisplay = () => {
        salvos.forEach(entry => {
            let novaEntrada = document.createElement('p');
            novaEntrada.textContent = entry;
            document.body.appendChild(novaEntrada);
        });
    };

    updateHistoryDisplay();

    numeros.forEach(botao => {
        botao.addEventListener('click', function (event) {
            if (telaNum.innerText == 0) {
                let num = event.target.innerText;
                telaNum.innerText = num;
                console.log('clicado');
                estadoOp = true;
            } else if (telaNum.innerText.length >= 14) {
                alert('Numero Muito Grande');
            } else {
                let num = event.target.innerText;
                telaNum.innerText = telaNum.innerText + num;
                console.log('clicado');
                estadoOp = true;
            }
        });
    });

    operadores.forEach(botao => {
        botao.addEventListener('click', (event) => {
            if (estadoOp === true) {
                let ope = event.target.innerHTML;
                telaNum.innerText = telaNum.innerText + ope;
                estadoOp = false;
            } else if (telaNum.innerText.length >= 14) {
                alert('Numero Muito Grande');
            } else {
                alert('Operação Inválida');
            }
        });
    });

    clear.addEventListener('click', () => {
        telaNum.innerText = '0';
        estadoOp = true;
    });

    result.addEventListener('click', () => {
        try {
            telaNum.innerHTML = eval(telaNum.innerHTML);
            result.style.backgroundColor = 'pink';
            estadoOp = true;

            setTimeout(() => {
                result.style.backgroundColor = 'white';
            }, 200);
        } catch (error) {
            alert('Erro na expressão');
            telaNum.innerText = '0';
            estadoOp = true;
        }
    });

    document.querySelector('#history').addEventListener('click', function () {
        let novaEntrada = telaNum.innerText;
        let novaEntradaElement = document.createElement('p');
        novaEntradaElement.textContent = novaEntrada;
        document.body.appendChild(novaEntradaElement);

        salvos.push(novaEntrada);
        localStorage.setItem('calcHistory', JSON.stringify(salvos));
    });

    document.querySelector('#remHistory').addEventListener('click', function(){
        localStorage.removeItem('calcHistory');
        salvos = [];
        let paragrafo = document.querySelectorAll('p');
        paragrafo.forEach(p => p.remove());
    });

    sessionStorage.setItem('Hello','There!');
    sessionStorage.setItem('nome:', 'BEN 10');

    console.log(salvos);
});
