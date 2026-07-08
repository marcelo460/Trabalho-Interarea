// Aguarda todo o HTML ser carregado
document.addEventListener("DOMContentLoaded", () => {

    // Seleciona todas as imagens das obras de arte
    const artImages = document.querySelectorAll(".art-image");

    // Adiciona um evento de clique para cada imagem
    artImages.forEach(image => {
        image.addEventListener("click", (event) => {
            
            // Encontra o container pai (.card-img) da imagem clicada
            const card = event.target.closest(".card-img");
            
            // CORRIGIDO: Mudado de 'art-naem' para 'art-name'
            const title = card.querySelector(".art-name").innerText;
            const artist = card.querySelector(".artista").innerText;

            // CORRIGIDO: Remove o destaque baseado na classe certa (.card-img)
            document.querySelectorAll(".card-img").forEach(c => c.classList.remove("highlighted"));

            // Aplica a classe de destaque no card atual
            card.classList.add("highlighted");

            // Exibe as informações da obra clicada no Console do Navegador
            console.log(`Você está apreciando: "${title}" de ${artist}.`);
        });
    });
});