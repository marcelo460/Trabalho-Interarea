// Aguarda todo o HTML ser carregado
document.addEventListener("DOMContentLoaded", () => {

    // Seleciona todas as imagens das obras de arte
    const artImages = document.querySelectorAll(".art-image");

    // Adiciona um evento de clique para cada imagem
    artImages.forEach(image => {
        image.addEventListener("click", (event) => {
            
            // Encontra o container pai (.art-card) da imagem clicada
            const card = event.target.closest(".card-img");
            
            // Pega o título da obra para usar na interação
            const title = card.querySelector(".art-naem").innerText;
            const artist = card.querySelector(".artista").innerText;

            // Remove o destaque de qualquer outro card que já estivesse selecionado
            document.querySelectorAll(".card-img").forEach(c => c.classList.remove("highlighted"));

            // Aplica a classe de destaque no card atual
            card.classList.add("highlighted");

            // Simula um guia do museu informando sobre a obra no console
            console.log(`Você está apreciando: "${title}" de ${artist}.`);
        });
    });
});