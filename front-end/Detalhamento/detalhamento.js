// 1. Inicializa a função assim que o HTML carregar
window.addEventListener('DOMContentLoaded', iniciarPagina);
    const params = new URLSearchParams(window.location.search);
    const idObra = params.get('id');


function iniciarPagina() {

    // 3. Busca o banco de dados fictício
    fetch("../../back-end/dados-obras/banco.json")
        .then(resposta => {
            if (!resposta.ok) {
                throw new Error("Não foi possível carregar o banco de dados.");
            }
            return resposta.json();
        })
        .then(dados => {
            // Supondo que seu JSON tenha a estrutura { "obras": [ {...}, {...} ] }
            const listaObras = dados.obras;

            // Busca a obra específica dentro da lista pelo ID
            const obraEncontrada = listaObras[idObra];

            if (obraEncontrada) {
                // Se achou, renderiza os dados na tela
                renderizarDadosObra(obraEncontrada);
            } else {
                // Se não achou o ID no banco, mostra erro
                exibirErro();
            }
        })
        .catch(erro => {
            console.error("Erro na requisição:", erro);
            exibirErro();
        });
}

// 4. Função responsável por alimentar o HTML com os dados
function renderizarDadosObra(obra) {
    document.getElementById('titulo-obra').innerText = obra.titulo;
    document.getElementById('artista-obra').innerText = obra.artista;
    document.getElementById('localizacao-obra').innerText = obra.localizacao;
    document.getElementById('texto-contexto').innerText = obra.contexto;
    document.getElementById('texto-analise').innerText = obra.analise;
    console.log("Chegou na função renderizar")
    console.log(obra.titulo)
    console.log(obra)

    // Monta o Mosaico de mídias (Quebra-cabeça)
    const containerMosaico = document.getElementById('mosaico-midias');
    containerMosaico.innerHTML = ''; // Limpa o "carregando"

    if (obra.midias && Array.isArray(obra.midias)) {
        obra.midias.forEach(midia => {
            let elementoMidia;

            if (midia.tipo === 'img') {
                elementoMidia = document.createElement('img');
                elementoMidia.src = midia.url;
                elementoMidia.alt = obra.titulo;
            } else if (midia.tipo === 'video') {
                elementoMidia = document.createElement('video');
                elementoMidia.src = midia.url;
                elementoMidia.controls = true;
            }

            if (elementoMidia) {
                // Aplica classe especial de tamanho se houver
                if (midia.classe) {
                    elementoMidia.className = midia.classe;
                }
                containerMosaico.appendChild(elementoMidia);
            }
        });
    }
}

// 5. Função de Fallback (Erro)
function exibirErro() {
    const container = document.querySelector('.container-detalhes');
    if (container) {
        container.innerHTML = `
            <div style="text-align:center; padding: 100px 0;">
                <h1 style="color: #d4af37;">Obra não encontrada!</h1>
                <p style="margin-top:20px;"><a href="index.html" style="color:#fff;">Voltar para a Galeria Principal</a></p>
            </div>
        `;
    }
}