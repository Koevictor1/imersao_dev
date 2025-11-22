let container = document.querySelector(".card-container");
let dados = [];

// Supondo que você tenha um <input id="busca"> no seu HTML
let campoBusca = document.querySelector("#busca");

async function iniciarbusca(){
    let resposta = await fetch("data.json");
    dados = await resposta.json();
    renderizarCards(dados);

    // Adiciona um evento que chama a função de busca a cada tecla digitada
    campoBusca.addEventListener("keyup", buscar);
}

function renderizarCards(dados){ 
    // Limpa o container antes de adicionar novos cards
    container.innerHTML = "";

    for(let item of dados){
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML= `
        <h2>${item.nome}</h2>
        <p>Ano de criação: ${item.ano}</p>
        <p>${item.descricao}</p>
        <p><strong>Tags:</strong> JavaScript</p>
        <a href="${item.link}" target="_blank">Saiba mais</a>
        `
        container.appendChild(article);
    }
}

function buscar() {
    let termoBusca = campoBusca.value.toLowerCase();
    let dadosFiltrados = dados.filter(item => item.nome.toLowerCase().includes(termoBusca) || item.descricao.toLowerCase().includes(termoBusca));
    renderizarCards(dadosFiltrados);
}