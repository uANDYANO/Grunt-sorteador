// Garante que o código JavaScript seja executado somente após o carregamento completo do HTML
document.addEventListener('DOMContentLoaded', function() {

    // Adiciona um "ouvinte de evento" (event listener) ao formulário com o ID 'form-sorteador'
    document.getElementById('form-sorteador').addEventListener('submit', function(evento) {

        // Impede o comportamento padrão do formulário de recarregar a página ao ser submetido
        evento.preventDefault();

        // Obtém o valor do campo de entrada com o ID 'numero-maximo'
        let numeroMaximo = document.getElementById('numero-maximo').value;

        // Converte o valor obtido para um número inteiro
        numeroMaximo = parseInt(numeroMaximo);

        // Gera um número aleatório entre 1 e o número máximo especificado
        let numeroAleatorio = Math.random() * numeroMaximo; // Gera um número aleatório entre 0 (inclusive) e numeroMaximo (exclusive)
        numeroAleatorio = Math.floor(numeroAleatorio + 1); // Arredonda para baixo e adiciona 1 para garantir que o número esteja entre 1 e numeroMaximo

        // Exibe o número aleatório gerado no elemento com o ID 'resultado-valor'
        document.getElementById('resultado-valor').innerText = numeroAleatorio;

        // Exibe o elemento com a classe 'resultado', tornando-o visível
        document.querySelector('.resultado').style.display = 'block';
    });
});