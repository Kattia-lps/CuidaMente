// Aguarda o evento que sinaliza que o conteúdo HTML foi completamente carregado
document.addEventListener("DOMContentLoaded", () => {
    // Movemos a seleção dos elementos para dentro deste bloco
    // para garantir que eles já existam na página.
    const cardConteiner = document.querySelector(".card-container");
    const caixaBusca = document.querySelector("#caixa-busca");
    let dados = [];

    async function iniciarBusca() {
        try {
            const resposta = await fetch("data.json");
            dados = await resposta.json();
            renderizarCards(dados);

            caixaBusca.addEventListener("input", () => {
                const termoBusca = caixaBusca.value;
                const dadosFiltrados = filtrarDados(termoBusca);
                renderizarCards(dadosFiltrados);
            });
        } catch (error) {
            console.error("Erro ao buscar os dados:", error);
        }
    }

    function filtrarDados(termo) {
        const termoFormatado = termo.toLowerCase();
        return dados.filter(dado => {
            return dado.profissional.toLowerCase().includes(termoFormatado) ||
                   dado.especialidade.toLowerCase().includes(termoFormatado) ||
                   dado.endereço.toLowerCase().includes(termoFormatado) ||
                   dado.contato.toLowerCase().includes(termoFormatado);
        });
    }

    function renderizarCards(dadosParaRenderizar) {
        cardConteiner.innerHTML = ""; // Limpa os cards existentes antes de renderizar novos
        for (const dado of dadosParaRenderizar) {
            const article = document.createElement("article");
            article.classList.add("card");
            article.innerHTML = `
            <h2>${dado.profissional}</h2>
            <p>${dado.especialidade}</p>
            <p>${dado.endereço}</p>
            <p>${dado.contato}</p>
            <a href="${dado.link}" target="_blank">Site</a>
            `;
            cardConteiner.appendChild(article);
        }
    }

    iniciarBusca(); // Inicia a aplicação
});