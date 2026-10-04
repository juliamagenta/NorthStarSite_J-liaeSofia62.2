
/* =========================================================
   NORTH STAR — JAVASCRIPT

   Responsável por:
   - Navegação entre as telas.
   - Cadastro e remoção de eventos.
   - Cadastro de tarefas no cronograma.
   - Envio de mensagens no chat.
   - Filtros e pesquisas.
   - Salvamento dos dados no localStorage.
   ========================================================= */

"use strict";

const CHAVE_DADOS = "northStarDadosV1";


/* NOMES DAS PÁGINAS */

const paginas = {
    inicio: "Olá, viajante!",
    explorar: "Explore possibilidades",
    tipos: "Tipos de intercâmbio",
    requisitos: "Requisitos e documentos",
    paises: "Países e trabalho",
    custos: "Custo e inscrições",
    orientacoes: "Orientações",
    agendas: "Agendas",
    dicas: "Dicas",
    chat: "Chat",
    cronograma: "Meu cronograma"
};


/* DADOS INICIAIS DO APLICATIVO */

const dadosIniciais = {

    eventos: [
        {
            id: 1,
            titulo: "Reunião com a consultora",
            horario: "10:00",
            data: "2026-10-20",
            feito: false
        },
        {
            id: 2,
            titulo: "Revisar documentos",
            horario: "14:00",
            data: "2026-10-20",
            feito: false
        },
        {
            id: 3,
            titulo: "Aula de inglês",
            horario: "17:00",
            data: "2026-10-20",
            feito: false
        }
    ],

    mensagens: [
        {
            id: 1,
            autor: "Marina 🇨🇦",
            texto: "Alguém já deu entrada no visto? Como foi o processo?",
            propria: false
        },
        {
            id: 2,
            autor: "Lucas 🇨🇦",
            texto: "O segredo é separar os documentos com antecedência!",
            propria: false
        }
    ],

    tarefas: [
        {
            id: 1,
            titulo: "Documentos, visto e inscrição",
            data: "Out 2026",
            feito: false
        },
        {
            id: 2,
            titulo: "Organizar malas e despedidas",
            data: "Nov 2026",
            feito: false
        },
        {
            id: 3,
            titulo: "Chegada e acomodação",
            data: "Dez 2026",
            feito: false
        },
        {
            id: 4,
            titulo: "Início do intercâmbio",
            data: "Jan 2027",
            feito: false
        }
    ],

    perfil: {
        nome: "Ana"
    }
};


/* =========================================================
   CARREGAMENTO E SALVAMENTO DOS DADOS
   ========================================================= */

function carregarDados() {

    try {

        const salvo = localStorage.getItem(CHAVE_DADOS);

        if (!salvo) {
            return structuredClone(dadosIniciais);
        }

        const convertido = JSON.parse(salvo);

        return {
            ...structuredClone(dadosIniciais),
            ...convertido
        };

    } catch (erro) {

        console.warn(
            "Não foi possível ler os dados salvos. Usando dados iniciais.",
            erro
        );

        return structuredClone(dadosIniciais);
    }
}


/* Variáveis principais */

let dados = carregarDados();

let paginaAtual = "inicio";

let filtroPais = "Todos";

let abaCusto = "custos";

let dataSelecionada = "2026-10-20";


/* Salvar as alterações no navegador */

function salvarDados() {

    try {

        localStorage.setItem(
            CHAVE_DADOS,
            JSON.stringify(dados)
        );

    } catch (erro) {

        mostrarAviso("Não foi possível salvar neste navegador.");

        console.error("Falha ao salvar dados:", erro);
    }
}


/* Proteção de textos inseridos pelo usuário */

function escapar(texto) {

    return String(texto).replace(/[&<>"']/g, caractere => ({

        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"

    })[caractere]);
}


/* =========================================================
   AVISOS DE CONFIRMAÇÃO
   ========================================================= */

function mostrarAviso(mensagem) {

    const toast = document.getElementById("anuncio");

    toast.textContent = mensagem;

    toast.classList.add("visivel");

    window.clearTimeout(mostrarAviso.temporizador);

    mostrarAviso.temporizador = window.setTimeout(() => {

        toast.classList.remove("visivel");

    }, 2600);
}


/* =========================================================
   NAVEGAÇÃO ENTRE AS PÁGINAS
   ========================================================= */

function irPara(pagina) {

    if (!paginas[pagina]) return;

    paginaAtual = pagina;

    renderizar();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* ÍCONES DOS CARTÕES */

function iconeCartao(icone, cor = "") {

    return `
        <span class="icone-cartao ${cor}" aria-hidden="true">
            ${icone}
        </span>
    `;
}


/* CARTÕES CLICÁVEIS DA TELA INICIAL */

function cartaoAtalho(pagina, icone, titulo, cor = "") {

    return `
        <a
            class="cartao-link"
            href="#${pagina}"
            data-page="${pagina}"
            aria-label="Abrir ${titulo}"
        >
            <div class="cartao atalho">

                ${iconeCartao(icone, cor)}

                <strong>${titulo}</strong>

            </div>
        </a>
    `;
}


/* =========================================================
   TELA INICIAL
   ========================================================= */

function renderInicio() {

    return `

        <section
            class="banner-inicio"
            aria-label="Apresentação do North Star"
        >

            <div class="banner-texto">

                <h2>
                    Seu futuro no exterior começa com informação.
                </h2>

                <p>
                    Descubra destinos, planeje seus passos e viva novas experiências.
                </p>

                <button
                    class="botao-principal"
                    data-page="explorar"
                >
                    Explorar
                </button>

            </div>

        </section>


        <section class="secao" aria-labelledby="atalhos-titulo">

            <h2 id="atalhos-titulo">
                Comece por aqui
            </h2>

            <div class="grade grade-2">

                ${cartaoAtalho(
                    "tipos",
                    "🎓",
                    "Tipos de intercâmbio",
                    "vermelho"
                )}

                ${cartaoAtalho(
                    "requisitos",
                    "▤",
                    "Requisitos e documentos",
                    "azul"
                )}

                ${cartaoAtalho(
                    "paises",
                    "🌐",
                    "Países e trabalho"
                )}

                ${cartaoAtalho(
                    "custos",
                    "✥",
                    "Custo e inscrições",
                    "vermelho"
                )}

            </div>

        </section>


        <section class="secao">

            <h2>Outras funções</h2>

            <div class="grade grade-3">

                ${cartaoAtalho(
                    "orientacoes",
                    "⌂",
                    "Orientações",
                    "azul"
                )}

                ${cartaoAtalho(
                    "agendas",
                    "▦",
                    "Agendas"
                )}

                ${cartaoAtalho(
                    "dicas",
                    "♧",
                    "Dicas",
                    "vermelho"
                )}

                ${cartaoAtalho(
                    "chat",
                    "☏",
                    "Chat"
                )}

                ${cartaoAtalho(
                    "cronograma",
                    "▤",
                    "Cronograma",
                    "azul"
                )}

            </div>

        </section>

    `;
}


/* =========================================================
   TELA DE TIPOS DE INTERCÂMBIO
   ========================================================= */

const tipos = [

    [
        "🎓",
        "Estudos no exterior",
        "Cursos de idiomas, graduação, pós-graduação e muito mais."
    ],

    [
        "💼",
        "Trabalho + Estudo",
        "Ganhe experiência e estude no mesmo destino."
    ],

    [
        "♥",
        "Au Pair",
        "Cuide de crianças e viva uma nova cultura."
    ],

    [
        "🍃",
        "Voluntariado",
        "Faça a diferença enquanto conhece o mundo."
    ],

    [
        "✈",
        "Programa de férias",
        "Viagens curtas com foco em idiomas e cultura."
    ]

];


function renderTipos() {

    return `

        <p class="texto-suave">
            Escolha o que mais combina com você:
        </p>

        <div class="grade">

            ${tipos.map(([icone, titulo, descricao]) => `

                <article class="cartao cartao-linha">

                    ${iconeCartao(
                        icone,
                        titulo === "Au Pair" ? "vermelho" : ""
                    )}

                    <div class="detalhes">

                        <h3>${titulo}</h3>

                        <p class="texto-suave">
                            ${descricao}
                        </p>

                    </div>

                    <span class="seta" aria-hidden="true">›</span>

                </article>

            `).join("")}

        </div>

    `;
}


/* =========================================================
   TELA DE REQUISITOS E DOCUMENTOS
   ========================================================= */

function renderRequisitos() {

    const docs = [

        "Passaporte válido",

        "Comprovante de matrícula ou carta de aceitação",

        "Comprovação financeira",

        "Seguro viagem",

        "Visto (quando necessário)"

    ];

    return `

        <p class="texto-suave">
            Cada tipo de intercâmbio tem exigências específicas.
            Veja os principais itens para começar a se organizar.
        </p>

        <div
            class="abas"
            role="tablist"
            aria-label="Categorias de requisitos"
        >

            <button
                class="aba ativo"
                role="tab"
                aria-selected="true"
            >
                Documentos
            </button>

            <button
                class="aba"
                role="tab"
                aria-selected="false"
                data-action="requisitos-gerais"
            >
                Requisitos gerais
            </button>

        </div>


        <div class="cartao" id="lista-requisitos">

            <ul class="lista">

                ${docs.map(documento => `

                    <li class="lista-item">

                        ${iconeCartao("▤", "azul")}

                        <div class="detalhes">
                            ${documento}
                        </div>

                    </li>

                `).join("")}

            </ul>

        </div>


        <p class="nota secao">
            ⓘ As exigências podem variar conforme o país e o tipo de intercâmbio.
            Confirme sempre com a instituição responsável.
        </p>

    `;
}


/* =========================================================
   TELA DE PAÍSES E TRABALHO
   ========================================================= */

const paises = [

    {
        bandeira: "🇨🇦",
        nome: "Canadá",
        tipo: "Estudo + Trabalho",
        categorias: ["Estudo", "Trabalho"]
    },

    {
        bandeira: "🇺🇸",
        nome: "Estados Unidos",
        tipo: "Estudo + Trabalho",
        categorias: ["Estudo", "Trabalho"]
    },

    {
        bandeira: "🇮🇪",
        nome: "Irlanda",
        tipo: "Estudo + Trabalho",
        categorias: ["Estudo", "Trabalho"]
    },

    {
        bandeira: "🇦🇺",
        nome: "Austrália",
        tipo: "Estudo + Trabalho",
        categorias: ["Estudo", "Trabalho"]
    },

    {
        bandeira: "🇬🇧",
        nome: "Reino Unido",
        tipo: "Estudo",
        categorias: ["Estudo"]
    },

    {
        bandeira: "🇩🇪",
        nome: "Alemanha",
        tipo: "Estudo + Trabalho",
        categorias: ["Estudo", "Trabalho"]
    }

];


function renderPaises() {

    const campoBusca = document.getElementById("busca-pais");

    const textoBusca = campoBusca
        ? campoBusca.value.toLowerCase()
        : "";

    const filtrados = paises.filter(pais => {

        const correspondeFiltro =
            filtroPais === "Todos" ||
            pais.categorias.includes(filtroPais);

        const correspondeBusca =
            pais.nome.toLowerCase().includes(textoBusca);

        return correspondeFiltro && correspondeBusca;

    });


    return `

        <p class="texto-suave">
            Conheça destinos procurados e oportunidades para intercambistas.
        </p>


        <label class="campo-pesquisa">

            <span aria-hidden="true">⌕</span>

            <input
                id="busca-pais"
                type="search"
                placeholder="Buscar país..."
                aria-label="Buscar país"
                value="${escapar(textoBusca)}"
            >

        </label>


        <div class="filtros" aria-label="Filtrar países">

            ${["Todos", "Estudo", "Trabalho", "Au Pair"].map(filtro => `

                <button
                    class="filtro ${filtroPais === filtro ? "ativo" : ""}"
                    data-filter="${filtro}"
                >
                    ${filtro}
                </button>

            `).join("")}

        </div>


        <div class="cartao">

            <ul class="lista">

                ${filtrados.map(pais => `

                    <li class="lista-item">

                        <span
                            class="bandeira"
                            role="img"
                            aria-label="Bandeira de ${pais.nome}"
                        >
                            ${pais.bandeira}
                        </span>

                        <div class="detalhes">

                            <strong>${pais.nome}</strong>

                            <p>${pais.tipo}</p>

                        </div>

                        <span class="seta" aria-hidden="true">›</span>

                    </li>

                `).join("") || `

                    <li class="vazio">
                        Nenhum país encontrado.
                    </li>

                `}

            </ul>

        </div>

    `;
}


/* =========================================================
   TELA DE CUSTOS E INSCRIÇÕES
   ========================================================= */

function renderCustos() {

    const itens = [

        ["♧", "Curso e acomodação", "US$ 3.000 – 12.000"],

        ["✈", "Passagem aérea", "US$ 800 – 2.500"],

        ["⬡", "Seguro viagem", "US$ 300 – 600"],

        ["▣", "Taxas e visto", "US$ 150 – 1.000"]

    ];


    return `

        <p class="texto-suave">
            Planeje seu investimento e veja o passo a passo para se inscrever.
        </p>


        <div class="abas">

            <button
                class="aba ${abaCusto === "custos" ? "ativo" : ""}"
                data-cost-tab="custos"
            >
                Custos
            </button>

            <button
                class="aba ${abaCusto === "inscricoes" ? "ativo" : ""}"
                data-cost-tab="inscricoes"
            >
                Inscrições
            </button>

        </div>


        ${abaCusto === "custos" ? `

            <div class="nota">
                ⓘ O valor pode variar de acordo com o país,
                o tipo de intercâmbio e a duração do programa.
            </div>

            <section class="secao">

                <h2>Principais custos</h2>

                <div class="cartao">

                    <ul class="lista">

                        ${itens.map(([icone, titulo, valor]) => `

                            <li class="lista-item">

                                ${iconeCartao(icone, "azul")}

                                <div class="detalhes">

                                    <strong>${titulo}</strong>

                                    <p>${valor}</p>

                                </div>

                            </li>

                        `).join("")}

                    </ul>

                </div>

            </section>

        ` : `

            <div class="cartao">

                <h2>Passo a passo da inscrição</h2>

                <ol class="lista">

                    <li class="lista-item">
                        1. Escolha o destino e o programa.
                    </li>

                    <li class="lista-item">
                        2. Confira requisitos e prazos.
                    </li>

                    <li class="lista-item">
                        3. Separe documentos e comprovantes.
                    </li>

                    <li class="lista-item">
                        4. Envie a candidatura e acompanhe o retorno.
                    </li>

                </ol>

            </div>

        `}


        <button
            class="botao-principal"
            data-page="cronograma"
        >
            Ver meu passo a passo
        </button>

    `;
}


/* =========================================================
   TELA DE ORIENTAÇÕES
   ========================================================= */

function renderOrientacoes() {

    const orientacoes = [

        ["▤", "Documentação e visto", "O que levar e como solicitar"],

        ["⌂", "Vida no exterior", "Moradia, transporte e adaptação"],

        ["✚", "Saúde e segurança", "Cuidados e seguros"],

        ["⚑", "Regras do país", "Leis, cultura e costumes"],

        ["♜", "Embarque e chegada", "Dicas para o primeiro dia"]

    ];


    return `

        <p class="texto-suave">
            Tire suas dúvidas e prepare-se para a sua jornada.
        </p>

        <div class="grade">

            ${orientacoes.map(([icone, titulo, descricao]) => `

                <article class="cartao cartao-linha">

                    ${iconeCartao(icone)}

                    <div class="detalhes">

                        <h3>${titulo}</h3>

                        <p class="texto-suave">
                            ${descricao}
                        </p>

                    </div>

                    <span class="seta" aria-hidden="true">›</span>

                </article>

            `).join("")}

        </div>

    `;
}


/* =========================================================
   TELA DE AGENDAS
   ========================================================= */

function renderAgendas() {

    const eventos = dados.eventos.filter(evento =>
        evento.data === dataSelecionada
    );

    const dataLegivel = new Date(
        `${dataSelecionada}T12:00:00`
    ).toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long"
    });


    return `

        <p class="texto-suave">
            Organize suas tarefas e prazos importantes.
        </p>


        <div class="cartao">

            <div class="dias-semana">

                ${["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map(
                    (dia, indice) => `

                        <button
                            class="dia ${indice === 2 ? "ativo" : ""}"
                            data-date="${indice}"
                        >
                            ${dia}<br>${18 + indice}
                        </button>

                    `
                ).join("")}

            </div>

        </div>


        <section class="secao">

            <h2>Eventos de ${dataLegivel}</h2>

            <div class="cartao">

                ${eventos.map(evento => `

                    <div class="evento ${evento.feito ? "concluido" : ""}">

                        <input
                            class="check-evento"
                            type="checkbox"
                            data-event-check="${evento.id}"
                            ${evento.feito ? "checked" : ""}
                            aria-label="Marcar ${escapar(evento.titulo)} como concluído"
                        >

                        <div class="detalhes">

                            <strong class="evento-titulo">
                                ${escapar(evento.titulo)}
                            </strong>

                            <p>${escapar(evento.horario)}</p>

                        </div>

                        <button
                            class="botao-perigo"
                            data-delete-event="${evento.id}"
                            aria-label="Excluir evento ${escapar(evento.titulo)}"
                        >
                            Excluir
                        </button>

                    </div>

                `).join("") || `

                    <p class="vazio">
                        Nenhum evento nesta data.
                    </p>

                `}

            </div>

        </section>


        <section class="cartao">

            <h2>Adicionar evento</h2>

            <form id="form-evento" class="formulario">

                <label>
                    Nome do evento

                    <input
                        name="titulo"
                        required
                        maxlength="80"
                        placeholder="Ex.: Entregar documentos"
                    >
                </label>

                <div class="grade grade-2">

                    <label>
                        Data

                        <input
                            type="date"
                            name="data"
                            value="${dataSelecionada}"
                            required
                        >
                    </label>

                    <label>
                        Horário

                        <input
                            type="time"
                            name="horario"
                            value="12:00"
                            required
                        >
                    </label>

                </div>

                <button class="botao-principal" type="submit">
                    Adicionar evento
                </button>

            </form>

        </section>

    `;
}


/* =========================================================
   TELA DE DICAS
   ========================================================= */

const dicas = [

    [
        "🗺️",
        "5 dicas para se adaptar à cultura canadense",
        "Aprenda expressões locais, respeite os costumes e mantenha a mente aberta."
    ],

    [
        "🧳",
        "Como economizar na sua viagem",
        "Planeje com antecedência, compare opções e reserve uma margem para imprevistos."
    ],

    [
        "📚",
        "Erros comuns que você deve evitar",
        "Não deixe documentos para a última hora e confira as regras oficiais."
    ],

    [
        "🏔️",
        "Melhores cidades para estudar e trabalhar",
        "Pesquise custo de vida, transporte, clima e oportunidades antes de decidir."
    ]

];


function renderDicas() {

    return `

        <div class="filtros">

            <button class="filtro ativo">Todos</button>

            <button class="filtro">Cultura</button>

            <button class="filtro">Viagem</button>

            <button class="filtro">Estudo</button>

        </div>


        <div class="grade">

            ${dicas.map(([icone, titulo, descricao]) => `

                <article class="cartao">

                    <div class="cartao-linha">

                        <span class="icone-cartao claro">
                            ${icone}
                        </span>

                        <div class="detalhes">

                            <h3>${titulo}</h3>

                            <p class="texto-suave">
                                ${descricao}
                            </p>

                        </div>

                    </div>

                    <button
                        class="botao-secundario"
                        style="margin-top:14px"
                        data-tip="${titulo}"
                    >
                        Ler mais →
                    </button>

                </article>

            `).join("")}

        </div>

    `;
}


/* =========================================================
   TELA DE CHAT
   ========================================================= */

function renderChat() {

    return `

        <p class="texto-suave">
            Conecte-se com outros intercambistas e troque experiências!
        </p>


        <div class="cartao">

            <h2>Intercambistas no Canadá</h2>

            <p class="texto-suave">
                Grupo da turma • 25 membros
            </p>


            <div id="mensagens-chat" aria-live="polite">

                ${dados.mensagens.map(mensagem => `

                    <div class="chat-mensagem ${mensagem.propria ? "propria" : ""}">

                        <strong>${escapar(mensagem.autor)}</strong>

                        <br>

                        ${escapar(mensagem.texto)}

                    </div>

                `).join("")}

            </div>


            <form id="form-chat" class="chat-compor">

                <label class="sr-only" for="mensagem-chat">
                    Escreva sua mensagem
                </label>

                <input
                    id="mensagem-chat"
                    name="mensagem"
                    maxlength="300"
                    required
                    placeholder="Escreva uma mensagem..."
                >

                <button
                    class="botao-principal"
                    type="submit"
                    aria-label="Enviar mensagem"
                >
                    ➤
                </button>

            </form>

        </div>

    `;
}


/* =========================================================
   TELA DE CRONOGRAMA PERSONALIZADO
   ========================================================= */

function renderCronograma() {

    const concluidas = dados.tarefas.filter(
        tarefa => tarefa.feito
    ).length;


    return `

        <p class="texto-suave">
            Seu plano de intercâmbio, do seu jeito.
        </p>


        <div class="cartao">

            <div class="cartao-linha">

                <span class="icone-cartao">🌐</span>

                <div class="detalhes">

                    <h2 style="margin:0">Canadá</h2>

                    <p class="texto-suave">
                        Estudo + Trabalho • 12 meses
                    </p>

                </div>

            </div>


            <div
                class="barra-progresso"
                role="progressbar"
                aria-label="Progresso do cronograma"
                aria-valuemin="0"
                aria-valuemax="${dados.tarefas.length}"
                aria-valuenow="${concluidas}"
            >

                <span
                    style="width:${
                        dados.tarefas.length
                            ? concluidas / dados.tarefas.length * 100
                            : 0
                    }%"
                ></span>

            </div>


            <p class="texto-suave">
                ${concluidas} de ${dados.tarefas.length} etapas concluídas
            </p>

        </div>


        <section class="secao">

            <h2>Planejamento</h2>

            <div class="cartao">

                ${dados.tarefas.map(tarefa => `

                    <div class="etapa ${tarefa.feito ? "" : "pendente"}">

                        <label>

                            <input
                                type="checkbox"
                                data-task-check="${tarefa.id}"
                                ${tarefa.feito ? "checked" : ""}
                            >

                            <strong>${escapar(tarefa.titulo)}</strong>

                        </label>

                        <br>

                        <small>${escapar(tarefa.data)}</small>

                    </div>

                `).join("")}

            </div>

        </section>


        <section class="cartao">

            <h2>Adicionar etapa</h2>

            <form id="form-tarefa" class="formulario">

                <label>
                    Etapa do planejamento

                    <input
                        name="titulo"
                        required
                        maxlength="80"
                        placeholder="Ex.: Comprar passagem"
                    >
                </label>

                <label>
                    Quando?

                    <input
                        name="data"
                        required
                        placeholder="Ex.: Fev 2027"
                    >
                </label>

                <button class="botao-principal" type="submit">
                    Adicionar etapa
                </button>

            </form>

        </section>

    `;
}


/* =========================================================
   FUNÇÃO QUE MONTA A TELA ATUAL
   ========================================================= */

function renderizar() {

    document.title = `${paginas[paginaAtual]} | North Star`;

    document.getElementById("titulo-pagina").textContent =
        paginaAtual === "inicio"
            ? `Olá, ${dados.perfil.nome}!`
            : paginas[paginaAtual];


    const conteudos = {

        inicio: renderInicio,
        tipos: renderTipos,
        requisitos: renderRequisitos,
        paises: renderPaises,
        custos: renderCustos,
        orientacoes: renderOrientacoes,
        agendas: renderAgendas,
        dicas: renderDicas,
        chat: renderChat,
        cronograma: renderCronograma,
        explorar: renderInicio

    };


    document.getElementById("visual-pagina").innerHTML =
        (conteudos[paginaAtual] || renderInicio)();


    /* Atualiza o botão ativo no menu */

    document.querySelectorAll("[data-page]").forEach(botao => {

        botao.classList.toggle(
            "ativo",
            botao.dataset.page === paginaAtual
        );

    });

}


/* =========================================================
   CLIQUES E NAVEGAÇÃO
   ========================================================= */

/* Delegação de eventos para evitar listeners duplicados */

document.addEventListener("click", evento => {

    /* Navegação entre páginas */

    const botaoPagina = evento.target.closest("[data-page]");

    if (botaoPagina) {

        evento.preventDefault();

        irPara(botaoPagina.dataset.page);

        return;
    }


    /* Filtros de países */

    const filtro = evento.target.closest("[data-filter]");

    if (filtro) {

        filtroPais = filtro.dataset.filter;

        renderizar();

        return;
    }


    /* Abas de custos e inscrições */

    const abaC = evento.target.closest("[data-cost-tab]");

    if (abaC) {

        abaCusto = abaC.dataset.costTab;

        renderizar();

        return;
    }


    /* Remoção de eventos da agenda */

    const excluir = evento.target.closest("[data-delete-event]");

    if (excluir) {

        dados.eventos = dados.eventos.filter(
            evento => evento.id !== Number(excluir.dataset.deleteEvent)
        );

        salvarDados();

        renderizar();

        mostrarAviso("Evento removido.");

        return;
    }


    /* Botões de leitura das dicas */

    const dica = evento.target.closest("[data-tip]");

    if (dica) {

        mostrarAviso(
            "Dica: " + dica.dataset.tip +
            ". Pesquise fontes oficiais e planeje com antecedência."
        );
    }


    /* Notificações */

    if (evento.target.closest("#botao-notificacoes")) {

        mostrarAviso("Você está em dia com suas notificações!");
    }


    /* Alternância entre documentos e requisitos gerais */

    if (evento.target.closest("[data-action='requisitos-gerais']")) {

        const caixa = document.getElementById("lista-requisitos");

        if (caixa) {

            caixa.innerHTML = `

                <ul class="lista">

                    <li class="lista-item">
                        Verifique a idade mínima do programa.
                    </li>

                    <li class="lista-item">
                        Confira a proficiência no idioma.
                    </li>

                    <li class="lista-item">
                        Consulte as regras de trabalho do destino.
                    </li>

                    <li class="lista-item">
                        Observe prazos e condições da instituição.
                    </li>

                </ul>

            `;
        }


        document.querySelectorAll(".aba").forEach(aba => {

            aba.classList.toggle(
                "ativo",
                aba.dataset.action === "requisitos-gerais"
            );

            aba.setAttribute(
                "aria-selected",
                String(aba.dataset.action === "requisitos-gerais")
            );

        });

    }

});


/* =========================================================
   PESQUISA DE PAÍSES
   ========================================================= */

document.addEventListener("input", evento => {

    if (evento.target.id === "busca-pais") {

        const posicao = evento.target.selectionStart;

        renderizar();

        const novoCampo = document.getElementById("busca-pais");

        novoCampo.focus();

        novoCampo.setSelectionRange(posicao, posicao);

    }

});


/* =========================================================
   ALTERAÇÃO DO ESTADO DE EVENTOS E TAREFAS
   ========================================================= */

document.addEventListener("change", evento => {

    /* Marcar evento como concluído */

    const checkEvento = evento.target.closest("[data-event-check]");

    if (checkEvento) {

        const item = dados.eventos.find(
            evento => evento.id === Number(checkEvento.dataset.eventCheck)
        );

        if (item) {

            item.feito = checkEvento.checked;

            salvarDados();

            renderizar();

        }

    }


    /* Marcar tarefa do cronograma como concluída */

    const checkTarefa = evento.target.closest("[data-task-check]");

    if (checkTarefa) {

        const item = dados.tarefas.find(
            tarefa => tarefa.id === Number(checkTarefa.dataset.taskCheck)
        );

        if (item) {

            item.feito = checkTarefa.checked;

            salvarDados();

            renderizar();

        }

    }


    /* Alterar data da agenda */

    const data = evento.target.closest("[data-date]");

    if (data) {

        const dia = 18 + Number(data.dataset.date);

        dataSelecionada =
            `2026-10-${String(dia).padStart(2, "0")}`;

        renderizar();

    }

});


/* =========================================================
   FORMULÁRIOS — SEM RECARREGAMENTO DA PÁGINA
   ========================================================= */

document.addEventListener("submit", evento => {

    /* Impede que o navegador recarregue a página */
    evento.preventDefault();

    const form = evento.target;


    /* CADASTRO DE EVENTOS */

    if (form.id === "form-evento") {

        const fd = new FormData(form);

        dados.eventos.push({

            id: Date.now(),

            titulo: String(fd.get("titulo")).trim(),

            data: String(fd.get("data")),

            horario: String(fd.get("horario")),

            feito: false

        });

        dataSelecionada = String(fd.get("data"));

        salvarDados();

        renderizar();

        mostrarAviso("Evento adicionado à sua agenda!");

    }


    /* CADASTRO DE TAREFAS NO CRONOGRAMA */

    if (form.id === "form-tarefa") {

        const fd = new FormData(form);

        dados.tarefas.push({

            id: Date.now(),

            titulo: String(fd.get("titulo")).trim(),

            data: String(fd.get("data")).trim(),

            feito: false

        });

        salvarDados();

        renderizar();

        mostrarAviso("Etapa adicionada ao cronograma!");

    }


    /* ENVIO DE MENSAGENS NO CHAT */

    if (form.id === "form-chat") {

        const campo = form.elements.mensagem;

        const texto = campo.value.trim();

        if (!texto) return;

        dados.mensagens.push({

            id: Date.now(),

            autor: dados.perfil.nome,

            texto: texto,

            propria: true

        });

        salvarDados();

        renderizar();

        mostrarAviso("Mensagem enviada.");

    }

});


/* =========================================================
   INICIALIZAÇÃO DO APLICATIVO
   ========================================================= */


/* =========================================================
   LOGIN E INICIALIZAÇÃO DO APLICATIVO
   ========================================================= */

const CHAVE_USUARIO = "northStarUsuario";

const telaLogin = document.getElementById("tela-login");
const appShell = document.getElementById("app-shell");
const navInferior = document.getElementById("nav-inferior");
const formularioLogin = document.getElementById("form-login");

// Mostra a tela de login e esconde o aplicativo
function mostrarLogin() {
    telaLogin.hidden = false;
    appShell.hidden = true;

    if (navInferior) {
        navInferior.hidden = true;
    }
}

// Libera o acesso ao aplicativo após o login
function mostrarHome(usuario) {
    telaLogin.hidden = true;
    appShell.hidden = false;

    if (navInferior) {
        navInferior.hidden = false;
    }

    // Atualiza o nome do usuário na página inicial
    dados.perfil.nome = usuario.nome.trim().split(/\s+/)[0];

    // Abre a página inicial
    paginaAtual = "inicio";
    renderizar();
}

// Verifica se o usuário já realizou o login
function verificarLogin() {
    const dadosSalvos = localStorage.getItem(CHAVE_USUARIO);

    if (dadosSalvos) {
        try {
            const usuario = JSON.parse(dadosSalvos);

            if (usuario && usuario.nome && usuario.email) {
                mostrarHome(usuario);
                return;
            }
        } catch (erro) {
            console.warn("Erro ao verificar login:", erro);
        }
    }

    mostrarLogin();
}

// Só entra no aplicativo quando clicar no botão
formularioLogin.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome-login").value.trim();
    const email = document.getElementById("email-login").value.trim();
    const senha = document.getElementById("senha-login").value;

    if (!nome || !email || !senha) {
        alert("Preencha todos os campos para continuar!");
        return;
    }

    if (senha.length < 6) {
        alert("A senha precisa ter pelo menos 6 caracteres.");
        return;
    }

    const usuario = {
        nome: nome,
        email: email
    };

    localStorage.setItem(CHAVE_USUARIO, JSON.stringify(usuario));

    mostrarHome(usuario);
});

// Inicializa o aplicativo
verificarLogin();