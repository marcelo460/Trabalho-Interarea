/**
 * =========================================================================
 * FLUXO PRINCIPAL DA PÁGINA DE DETALHAMENTO
 * =========================================================================
 * Este evento garante que o script só rode depois que todo o HTML da página
 * de detalhamento estiver pronto e carregado no navegador.
 */
window.addEventListener('DOMContentLoaded', iniciarPaginaDetalhamento);

function iniciarPaginaDetalhamento() {
    
    // [PARTE 1]: Recebe e isola o ID que foi enviado pela página anterior através da URL
    const parametrosURL = new URLSearchParams(window.location.search);
    const idObraBuscada = parametrosURL.get('id');

    // Validação de segurança: se não houver ID na URL, exibe a tela de erro imediatamente
    if (!idObraBuscada) {
        console.error("Erro: Nenhum ID de obra foi encontrado nos parâmetros da URL.");
        exibirErro();
        return; 
    }

    // [PARTE 2]: Com o ID em mãos, chama a função para buscar as informações no banco de dados
    buscarDadosNoBanco(idObraBuscada);
}

/**
 * =========================================================================
 * PARTE 2: BUSCA NO BANCO DE DADOS (FETCH)
 * =========================================================================
 * Faz a requisição para o arquivo JSON e localiza a obra usando o ID como chave.
 */
function buscarDadosNoBanco(idAlvo) {
    // Faz o download silencioso do arquivo JSON do seu back-end
    fetch("../../back-end/dados-obras/banco.json")
        .then(resposta => {
            // Verifica se o arquivo foi encontrado com sucesso
            if (!resposta.ok) {
                throw new Error("Não foi possível carregar o arquivo banco.json.");
            }
            return resposta.json(); // Converte o texto puro do JSON em um objeto JavaScript
        })
        .then(dicionarioObras => { // MUDANÇA: alterado 'dados' para 'dicionarioObras' para combinar com a nova estrutura direta do JSON
            
            // Como seu JSON agora é direto, buscamos a obra usando o ID como chave (ex: dicionarioObras["1"])
            const obraLocalizada = dicionarioObras[idAlvo];

            if (obraLocalizada) {
                // Se a obra existir no arquivo, chama a função para preencher a tela
                renderizarDadosNoHTML(obraLocalizada);
            } else {
                // Se o ID não existir dentro do banco de dados
                console.warn(`Aviso: A obra com ID "${idAlvo}" não foi encontrada no banco de dados.`);
                exibirErro();
            }
        })
        .catch(erro => {
            // Trata qualquer erro que aconteça durante a requisição ou leitura do arquivo
            console.error("Erro crítico na busca dos dados:", erro);
            exibirErro();
        });
}

/**
 * =========================================================================
 * PARTE 3: TRANSFORMAÇÃO E PREENCHIMENTO DO HTML (RENDERIZAÇÃO)
 * =========================================================================
 * Pega os dados que vieram do JSON e os injeta nos elementos HTML correspondentes.
 */
function renderizarDadosNoHTML(dadosDaObra) {
    // Insere os textos principais da obra nos seus respectivos IDs do HTML
    document.getElementById('titulo-obra').innerText = dadosDaObra.titulo;
    document.getElementById('artista-obra').innerText = dadosDaObra.artista;
    document.getElementById('localizacao-obra').innerText = dadosDaObra.localizacao;
    document.getElementById('texto-contexto').innerText = dadosDaObra.contexto;
    document.getElementById('texto-analise').innerText = dadosDaObra.analise;

    // Localiza o container onde o mosaico de mídias será montado
    const containerMosaico = document.getElementById('mosaico-midias');
    if (!containerMosaico) return; // Segurança caso a div não exista no HTML
    
    containerMosaico.innerHTML = ''; // Limpa qualquer conteúdo antigo ou mensagem de "carregando"

    // Verifica se existem mídias cadastradas para esta obra
    if (dadosDaObra.midias && Array.isArray(dadosDaObra.midias)) {
        
        // Passa de mídia em mídia para criar os elementos dinamicamente
        dadosDaObra.midias.forEach(midia => {
            let tagCriada; // MUDANÇA: alterado de 'elementoMidia' para 'tagCriada' para diferenciar a tag HTML física do objeto 'midia'

            // Identifica o tipo para criar a tag HTML correta (img ou video)
            if (midia.tipo === 'img') {
                tagCriada = document.createElement('img');
                tagCriada.src = midia.url;
                tagCriada.alt = dadosDaObra.titulo;
            } else if (midia.tipo === 'video') {
                tagCriada = document.createElement('video');
                tagCriada.src = midia.url;
                tagCriada.controls = true; // Mostra os botões de play, pause e volume
            }

            // Se a tag foi gerada com sucesso, aplica as classes e joga na tela
            if (tagCriada) {
                // Adiciona a classe de estilização caso ela exista e não esteja vazia no JSON
                if (midia.classe && midia.classe.trim() !== "") {
                    tagCriada.className = midia.classe;
                }
                
                // Insere o elemento recém-criado dentro da div do mosaico
                containerMosaico.appendChild(tagCriada);
            }
        });
    }
}

//Caso de algum erro ele apaga onde aparece as imagens e coloca um texto para a pessoa voltar ao index
function exibirErro() {
    const containerTela = document.querySelector('.container-detalhes');
    if (containerTela) {
        containerTela.innerHTML = `
            <div style="text-align:center; padding: 100px 0;">
                <h1 style="color: #d4af37;">Obra não encontrada!</h1>
                <p style="margin-top:20px;">
                    <a href="../../index.html" style="color:#fff; text-decoration: underline;">Volte para a Galeria Principal clicando nesse texto.</a>
                </p>
            </div>
        `;
    }
}