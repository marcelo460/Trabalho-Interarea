//Faz uma verificação para ver se a pagina carregou
window.addEventListener('DOMContentLoaded', iniciar);

function iniciar() {
    
    //Recebe depois isola o ID que foi enviado pela página anterior (Pegando pela URL)
    const parametrosURL = new URLSearchParams(window.location.search);
    const identificador = parametrosURL.get('id');

    //Se não tiver esse ID ele só da erro mesmo. Chamando a função que está lá no final 
    if (!identificador) {
        console.error("Erro: Nenhum IDENTIFICADOR de obra foi encontrado nos parâmetros da sua URL.");
        exibirErro();
        return; 
    }

    // Ativa a função que vai pegar as informações do banco de dados.
    buscar_no_banco_dados(identificador);
}

//Usa fetch (muito dificil de entender, igual css) para conectar no JSON do back-end
function buscar_no_banco_dados(ID) {
    //Ao que tudo indica: Instala o banco de dados (?)
    fetch("banco.json")
        .then(resposta => {
            // Verifica se o arquivo foi encontrado e se ('!' == diferente) se não da erro
            if (!resposta.ok) {
                //Mensagem de erro...
                throw new Error("Ocorreu um erro ao carregar as informações desta obra.");
            }
            //Converte o que baixou (? O arquivo) e transforma em json (De novo??)
            return resposta.json();
        })
        .then(dicionarioObras => { // Aqui, dicionarioObras é o objeto que contém todas as obras do banco de dados
            
            // Acha o nome de identificação que eu dei
            const dados_recebidos = dicionarioObras[ID];

            if (dados_recebidos) {
                // Se a obra existir no arquivo, chama a função para preencher a tela
                renderizarDadosNoHTML(dados_recebidos);
            } else {
                // Se o ID não existir dentro do banco de dados
                console.warn(`Rapaz... Eu olhei aqui e não achei não, se você achar me avise viu? Esse seu 'I' - 'D' ta errado, só pode coisinho.`);
                exibirErro();
            }
        })
        //Se algo der eero ativa esse gatilho automaticamente
        .catch(erro => {
            // Entrega esses faoteres para algum erro esconhecido ou critico
            console.error("Erro:", erro, "\nNão terá conexão com o banco de dados.");
            exibirErro();
        });
}

//Pega todos esses dados recebidos antes e converte meu html
function renderizarDadosNoHTML(dados_obra) {
    // Pega as principais informações da obra e coloca no HTML
    document.getElementById('titulo-obra').innerText = dados_obra.titulo;
    document.getElementById('artista-obra').innerText = dados_obra.artista;
    document.getElementById('localizacao-obra').innerText = dados_obra.localizacao;
    document.getElementById('texto-contexto').innerText = dados_obra.contexto;
    document.getElementById('texto-analise').innerText = dados_obra.analise;

    // Localiza o container onde o mosaico de mídias
    const container_mosaico = document.getElementById('mosaico-midias');
    // Segurança caso a div não exista no HTML
    if (!container_mosaico) return;
    
    //Limpa da ultima vez que veio nessa pagina e atualiza o "Carregando..."
    container_mosaico.innerHTML = '';

    // Verifica se existem mídias cadastradas para esta obra (não entendi como verifica)
    if (dados_obra.midias && Array.isArray(dados_obra.midias)) {
        
        // Passa de mídia em mídia (forEach) e cria a tag HTML correspondente (img ou video) para cada item
        dados_obra.midias.forEach(midia => {
            let tag_criada; 

            // Identifica o tipo para criar a tag HTML correta (img ou video)
            if (midia.tipo === 'img') {
                tag_criada = document.createElement('img');
                tag_criada.src = midia.url;
                tag_criada.alt = dados_obra.titulo;
            } else if (midia.tipo === 'video') {
                tag_criada = document.createElement('video');
                tag_criada.src = midia.url;
                tag_criada.controls = true; // Mostra os botões de play, pause e volume
            }

            // Se a tag foi gerada com sucesso, aplica as classes e joga na tela
            if (tag_criada) {
                // Adiciona a classe de estilização caso ela exista e não esteja vazia no JSON
                if (midia.classe && midia.classe.trim() !== "") {
                    tag_criada.className = midia.classe;
                }
                
                // Insere o elemento recém-criado dentro da div do mosaico
                container_mosaico.appendChild(tag_criada);
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