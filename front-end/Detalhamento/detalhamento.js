// 1. Nosso banco de dados fictício focado em Arte Urbana
const bancoDeDadosObras = {
    "grafite-bansky": {
        titulo: "O Lançador de Flores",
        artista: "Banksy",
        localizacao: "Jerusalém, Palestina",
        contexto: "Pintada em 2003 em um muro na cidade de Jerusalém, esta obra é uma das mais icônicas do artista de rua britânico Banksy. A imagem mostra um homem com o rosto coberto, típica vestimenta de manifestantes urbanos, mas em vez de uma pedra ou coquetel molotov, ele está prestes a lançar um buquê de flores coloridas. A obra traz uma forte mensagem de paz e ativismo social utilizando o espaço público.",
        analise: "Visualmente, Banksy utiliza a técnica do estêncil (stencil) em preto e branco para a figura humana, criando um alto contraste agressivo que simula a fotografia de guerrilha. O único ponto de cor viva são as flores. O impacto urbano reside em ressignificar um ato de violência comum em zonas de conflito urbano em um manifesto poético e pacífico de resistência artística.",
        midias: [
            { tipo: 'img', url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119', classe: 'bloco-destaque' }, // Foto grande destaque
            { tipo: 'img', url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab', classe: '' },
            { tipo: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4', classe: 'grande-vertical' }, // Vídeo ocupando 2 linhas vertical
            { tipo: 'img', url: 'https://images.unsplash.com/photo-1533158326339-7f3cf2404354', classe: 'grande-horizontal' }, // Foto esticada de lado
            { tipo: 'img', url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f', classe: '' },
            { tipo: 'video', url: 'https://www.w3schools.com/html/movie.mp4', classe: '' } // Segundo vídeo básico
        ]
    },
    "beco-do-batman": {
        titulo: "Muralismo Coletivo",
        artista: "Vários Artistas",
        localizacao: "Beco do Batman, São Paulo, Brasil",
        contexto: "O Beco do Batman é uma galeria de grafite a céu aberto localizada na Vila Madalena, em São Paulo. Teve início na década de 1980, quando um desenho do personagem de quadrinhos Batman apareceu em um dos muros. A partir dali, estudantes de artes e grafiteiros começaram a preencher as paredes cinzas com desenhos psicodélicos e manifestos políticos.",
        analise: "A dinâmica aqui é o constante movimento. Diferente de museus tradicionais, as artes do beco são temporárias, sendo cobertas por novas pinturas tempos depois. O uso agressivo de cores saturadas reflete o movimento do muralismo brasileiro contemporâneo, transformando a degradação urbana em polo cultural e turístico.",
        midias: [
            { tipo: 'img', url: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b', classe: 'grande-horizontal' },
            { tipo: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4', classe: '' },
            { tipo: 'img', url: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8', classe: 'bloco-destaque' },
            { tipo: 'img', url: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912', classe: '' },
            { tipo: 'video', url: 'https://www.w3schools.com/html/movie.mp4', classe: 'grande-vertical' },
            { tipo: 'img', url: 'https://images.unsplash.com/photo-1549887534-1541e9326642', classe: '' }
        ]
    }
};

// 2. Lógica para capturar o ID que veio na URL e montar a tela
function carregarDadosDaObra() {
    const params = new URLSearchParams(window.location.search);
    const idObra = params.get('id'); // Pega ex: detalhes.html?id=grafite-bansky

    // Busca os dados específicos da obra escolhida
    const dadosObra = bancoDeDadosObras[idObra];

    if (dadosObra) {
        // Alimenta os campos de texto principais
        document.getElementById('titulo-obra').innerText = dadosObra.titulo;
        document.getElementById('artista-obra').innerText = dadosObra.artista;
        document.getElementById('localizacao-obra').innerText = dadosObra.localizacao;
        document.getElementById('texto-contexto').innerText = dadosObra.contexto;
        document.getElementById('texto-analise').innerText = dadosObra.analise;

        // Limpa e monta o Mosaico de mídias (Quebra-cabeça)
        const containerMosaico = document.getElementById('mosaico-midias');
        containerMosaico.innerHTML = ''; // Limpa o carregando

        dadosObra.midias.forEach(midia => {
            let elementoMidia;

            if (midia.tipo === 'img') {
                elementoMidia = document.createElement('img');
                elementoMidia.src = midia.url;
                elementoMidia.alt = dadosObra.titulo;
            } else if (midia.tipo === 'video') {
                elementoMidia = document.createElement('video');
                elementoMidia.src = midia.url;
                elementoMidia.controls = true; // Permite dar play e pause no vídeo
            }

            // Se houver uma classe especial de tamanho (ex: grande-vertical), aplica aqui
            if (midia.classe) {
                elementoMidia.className = midia.classe;
            }

            containerMosaico.appendChild(elementoMidia);
        });

    } else {
        // Fallback caso acesse a página sem parâmetros válidos
        document.querySelector('.container-detalhes').innerHTML = `
            <div style="text-align:center; padding: 100px 0;">
                <h1 style="color: #d4af37;">Obra não encontrada!</h1>
                <p style="margin-top:20px;"><a href="index.html" style="color:#fff;">Voltar para a Galeria Principal</a></p>
            </div>
        `;
    }
}

// Inicializa a função assim que a página termina de carregar
window.addEventListener('DOMContentLoaded', carregarDadosDaObra);