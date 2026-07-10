// Aguarda todo o HTML ser carregado
document.addEventListener("DOMContentLoaded", () => {

    // Seleciona todas as imagens das obras de arte
    const artImages = document.querySelectorAll(".card-img");

    // Adiciona um evento de clique para cada imagem
    artImages.forEach(quadro => {
        quadro.addEventListener("click", (event) => {
            
            // Seleciona o card
            const card = event.target.closest(".card-img");
            
            // Informações do card clicado
            const id = card.getAttribute("data-id");
            const title = card.querySelector(".art-name").innerText;
            const artist = card.querySelector(".artista").innerText;

            // CORRIGIDO: Remove o destaque baseado na classe certa (.card-img)
            document.querySelectorAll(".card-img").forEach(c => c.classList.remove("highlighted"));

            // Aplica a classe de destaque no card atual
            quadro.classList.add("highlighted");

            //Leva para a outra pagina
            window.location.href = `front-end/Detalhamento/detalhamento.html?id=${id}&title=${encodeURIComponent(title)}&artist=${encodeURIComponent(artist)}`;
        });
    });


    //  Codigo do botão na Logo para rolar pra cima
        const logo = document.querySelector('.nav-logo');
    if (logo) {
        logo.addEventListener('click', function(elemento) {
            elemento.preventDefault(); 
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    // CÓDIGO DO BOTÃO EXPOR (Rolar para baixo)
    const botaoExpor = document.getElementById('Expor');
    if (botaoExpor) {
        botaoExpor.addEventListener('click', function(elemento) {
            // ativa uma coisa da função elemento que faz carregar só o js e não o html
            elemento.preventDefault(); 
            //Pega a posição do que eu quero
            const galeria_position = document.querySelector('.galeria');
            //outra verificação de existencia e se é um True
            if (galeria_position) {
              //manda scrollar até ...
                galeria_position.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});