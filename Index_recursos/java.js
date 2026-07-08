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

    //Pega o Logo da pagina e adiciona um evento de clique para rolar suavemente para o topo
    document.getElementById('Logo').addEventListener('click', function(elemento) {
    // Impede o salto instantâneo padrão do link quando clicado e tem o href definido como -> '#'
    elemento.preventDefault(); 
    
    // Faz a janela rolar para a posição (0,0) que é o topo, de forma suave
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  //Pega o Botão de exposição da pagina e adiciona um evento que leva a tela para o ponto especifico que começa as exposições
    document.getElementById('Expor').addEventListener('click', function(elemento) {
    // Impede o salto instantâneo padrão do link quando clicado e tem o href definido como -> '#'
    elemento.preventDefault(); 
    
    // Faz a janela rolar para a posição (0,0) que é o topo, de forma suave
    window.scrollTo({
      top: 100,
      behavior: 'smooth'
    });
  });

});