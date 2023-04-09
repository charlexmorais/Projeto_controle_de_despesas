// -identificando-os-elementos-no-html-através-do-id dos botoes
let btnNavCategoria = document.getElementById("categorias");
let btnNavDespesas = document.getElementById("despesas");
let btnAdicionardespesa = document.getElementById("botao-adicionar");
let btnSalvardespesa = document.getElementById("botao-salvar-despesa");
let btnSalvar = document.getElementById("botao-salvar");
let btnCancelar = document.getElementById("botao-cancelar");
let btnCancelaDespesa = document.getElementById("botao-cancelar-despesa");
let btnCancelarCategoria = document.getElementById("btn-categoria-cancelar");
let btnExcluirPagas = document.getElementById("excluirStatuspago");
let btnAddcategoria = document.getElementById("addcategoria");
let btnFiltrarCadastro = document.getElementById("btn-filtrar-cadastro");
let btnFiltrarDespesa = document.getElementById("botao-filtrar");

// troca de paginas
let paginaHome = document.getElementById("pagina-home");
let paginaAddDespesas = document.getElementById("pagina-despesas");
let paginaCadastroCategoria = document.getElementById("pagina-cadastro");
let paginaAdicionarCategoria = document.getElementById("pagina-add-categoria");
const tabelalistadeCategorias = document.getElementById(
  "tabelalistadeCategorias"
);
const tabelaControleDedespesas = document.getElementById("exibir-resultado");

// buscando valores dos inputs
let inputCategoria = document.getElementById("categoria");
let inputFiltro = document.getElementById("input-filtrar");
let inputBuscaCategoria = document.getElementById("add-categoria");
let inputData = document.getElementById("data");
let inputDespesas = document.getElementById("despesa");
let inputValor = document.getElementById("valor");
let inputFiltroDespesas = document.getElementById("filtro-despesas");
let cardTotalpago = document.getElementById("total-pago");
let cardTotalapagar = document.getElementById("total-a-pagar");
let cardAtrasadas = document.getElementById("total-atrasadas");
// data list
let opcoesCategorias = document.getElementById("opcoes-categorias");

// localStorage
let listadeCategoriaslocalstorage = JSON.parse(
  localStorage.getItem("arraylistacategorias")
);

const listadeCategorias = listadeCategoriaslocalstorage ?? [];

let listaDespesaslocalStorage = localStorage.getItem("despesas")
  ? JSON.parse(localStorage.getItem("despesas"))
  : [];

const listaDespesas = listaDespesaslocalStorage ?? [];

// gerando id para as listas de categoria e dispesas
function gerarIdCategoria() {
  if (listadeCategorias.length > 0) {
    return listadeCategorias[listadeCategorias.length - 1].id + 1;
  }
  return 1;
}
// gerando id para as listas de dispesas
function gerarIddespesas() {
  let ultimoId = 0;
  if (listaDespesas.length > 0) {
    let ultimaDespesa = listaDespesas[listaDespesas.length - 1];
    if (ultimaDespesa != null) {
      ultimoId = ultimaDespesa.id;
    }
  }
  return ultimoId + 1;
}
// validanddo formulario de cadastro de categorias
function validarFormulario() {
  if (
    inputCategoria.value.length == 0 ||
    listadeCategorias.find(
      (obj) => obj.categoria == inputCategoria.value.toLowerCase()
    )
  ) {
    exibirMensagem("erro", "digite novamente !");

    // alert("ERRO: digite novamente ");
    inputCategoria.focus();
    return false;
  } else {
    inputCategoria.value = inputCategoria.value.toLowerCase();
    exibirMensagem("sucesso", "Operação concluída com sucesso!");
    // alert("Preenchido com sucesso!");
    salvarCategoria();
    limparCampo();

    return true;
  }
}

btnSalvar.addEventListener("click", (event) => {
  event.preventDefault();
  if (validarFormulario()) {
    mostraPaginaCategorias();
    listarCategoria(listadeCategorias);
  }
});

// objeto categoria
function salvarCategoria() {
  let categoria = {
    id: gerarIdCategoria(),
    categoria: inputCategoria.value,
  };

  listadeCategorias.push(categoria);
  console.log(listadeCategorias);
}

// Remove a categoria da lista
function excluirCategoria(id) {
  const categoriaIndex = listadeCategorias.findIndex(
    (categoria) => categoria.id === id
  );

  if (categoriaIndex !== -1) {
    listadeCategorias.splice(categoriaIndex, 1);
    listarCategoria(listadeCategorias);
  }
}
// excluindo despesa na listaDespesas
function excluirDespesa(id) {
  const despesaIndex = listaDespesas.findIndex((despesa) => despesa.id === id);

  if (despesaIndex !== -1) {
    listaDespesas.splice(despesaIndex, 1);
    listarDespesa(listaDespesas);
  }
}

function atualizandoLocalstorage() {
  localStorage.setItem(
    "arraylistacategorias",
    JSON.stringify(listadeCategorias)
  );
}
function atualizandoLocalstoragedespesas() {
  localStorage.setItem("despesas", JSON.stringify(listaDespesas));
}
// carrega as despesas da tabela do LocalStorage quando a página é carregada
window.onload = function () {
  listarDespesa();
  exibiDespesaspagas(); // Ao carregar localStorage atualiza o card tt pago
  exibirDespesasapagar(); // Ao carregar localStorage atualiza o card tt a pagar
  exibirQuantidadeDespesasPendentes(); // Ao carregar localStorage atualiza o card atrasadas
};

let proximoId = 1;

function adicionarCategoria() {
  const novaCategoria = {
    id: proximoId,
    categoria: inputCategoria.value,
  };
  listadeCategorias.push(novaCategoria);
  proximoId++;
  listarCategoria(listadeCategorias);
  inputCategoria.value = "";
}
// editando a categoria na pagina cadastro de categorias
function editarCategoria(id) {
  const categoriaParaEditar = listadeCategorias.find(
    (categoria) => categoria.id === id
  );
  const novoNomeCategoria = prompt(
    "Digite o novo nome da categoria:",
    categoriaParaEditar.categoria
  );
  categoriaParaEditar.categoria = novoNomeCategoria;
  listarCategoria(listadeCategorias);
}

// tabela listar categorias
function listarCategoria(novalista) {
  tabelalistadeCategorias.innerHTML = novalista
    .map((categoria) => {
      if (categoria.categoria !== "") {
        return `
          <tr>
            <td>${categoria.id}</td>
            <td>${categoria.categoria}</td>
            
            <td class="botoes-categoria">

            <button class="btn-salvar btn-primary" data-id="${categoria.id}" onclick="editarCategoria(${categoria.id})">Editar</button>
            
            
              <button class="btn-cancelar botao-cancelar-pagina altera-btn-cancel" data-id="${categoria.id}" onclick="excluirCategoria(${categoria.id})">Excluir</button>
            </td>
            
          </tr>
        `;
      } else {
        return "";
      }
    })
    .join("");
  atualizandoLocalstorage();
}
function categoriasDatalist() {
  let opcao = "";
  listadeCategorias.forEach(
    (cat) => (opcao += `<option>${cat.categoria}</option>`)
  );

  opcoesCategorias.innerHTML = opcao;
}

// validando campos no formulario de adicionar depesas
function validarFormularioDespesa() {
  if (
    inputBuscaCategoria.value.length !== 0 &&
    inputDespesas.value.length !== 0 &&
    listadeCategorias.some((obj) => obj.categoria == inputBuscaCategoria.value)
    
  ) {
    // Verificar se o valor inserido é "R$ 0,00"
    if (inputValor.value === "R$ 0,00") {
      alert("Valor inválido. Insira um valor diferente de zero.");
      return false;
    }
  } else {
    exibirMensagem("erro", "digite novamente !");
    limparFormulario();

    return false;
  }

  inputBuscaCategoria.value = inputBuscaCategoria.value.toLowerCase(); // converter para minúsculas
  inputDespesas.value = inputDespesas.value.toLowerCase(); // converter para minúsculas
  exibirMensagem("sucesso", "Operação concluída com sucesso!");
  return true;
}

// objeto despesa
let despesa = {
  BuscaCategoria: "",
  despesa: "",
  valor: inputValor.value,
  data: inputValor.value,
  status: listarDespesa,
};
// salvando e adicionando no array listaDespesas
function salvarDespesa() {
  let creandoDespesa = { ...despesa };
  creandoDespesa.id = gerarIddespesas();
  creandoDespesa.BuscaCategoria = inputBuscaCategoria.value;
  creandoDespesa.despesa = inputDespesas.value;
  creandoDespesa.valor = inputValor.value;
  creandoDespesa.data = inputData.value;
  listaDespesas.push(creandoDespesa);
}
console.log(listaDespesas);
let novoArray = listaDespesas.filter((elemento) => elemento !== null);
console.log(novoArray);
function trocaStatusFiltro(id) {
  const despesaIndex = listaDespesas.findIndex((despesa) => despesa.id === id);
  listaDespesas[despesaIndex].pago = !listaDespesas[despesaIndex].pago;
  const linhaDespesa = document.querySelector(`.despesa-${id}`);
  if (listaDespesas[despesaIndex].pago) {
    exibiDespesaspagas();
    exibirDespesasapagar();
    exibirQuantidadeDespesasPendentes();
  } else {
    exibiDespesaspagas();
    exibirDespesasapagar();
    exibirQuantidadeDespesasPendentes();
  }
  listarDespesa(listaDespesas);
}

function trocaStatuspago(id) {
  const despesaIndex = listaDespesas.findIndex((despesa) => despesa.id === id);
  listaDespesas[despesaIndex].pago = !listaDespesas[despesaIndex].pago;
  const linhaDespesa = document.querySelector(`.despesa-${id}`);
  if (listaDespesas[despesaIndex].pago) {
    linhaDespesa.classList.remove("pendente");
    linhaDespesa.classList.add("pago");
    exibiDespesaspagas();
    exibirDespesasapagar();
    exibirQuantidadeDespesasPendentes();
  } else {
    linhaDespesa.classList.remove("pago");
    linhaDespesa.classList.add("pendente");
    exibiDespesaspagas();
    exibirDespesasapagar();
    exibirQuantidadeDespesasPendentes();
  }
  listarDespesa(listaDespesas);
}

// tabela listar despesa
function listarDespesa(listaFiltrodespesas) {
  tabelaControleDedespesas.innerHTML = listaDespesas.map((despesa) => {
    if (despesa.despesa !== "") {
      let classeStatus = "";
      if (despesa.pago) {
        classeStatus = "pago-linha";
      } else {
        classeStatus = "pendente-linha";
      }
      return `
        <tr class="despesa-${despesa.id} ${classeStatus}">
          <td>${despesa.data}</td>
          <td>${despesa.despesa}</td>
          <td>${despesa.valor}</td>
          <td>
            <button btn-Status id="pago" class="btn-salvar btn-primary${
              despesa.pago ? "" : " hidden"
            }" data-id="${despesa.id}" onclick="trocaStatuspago(${
        despesa.id
      })">Pago</button>
            <button btn-Status id="pendente" class="btn-cancelar botao-cancelar-pagina${
              !despesa.pago ? "" : " hidden"
            }" data-id="${despesa.id}" onclick="trocaStatuspago(${
        despesa.id
      })">Pendente</button>
          </td>
          <td>
          <button id="excluirStatuspendente"class="btn-cancelar botao-cancelar-pagina" data-id="${
            despesa.id
          }" onclick="excluirDespesasPendentes(${despesa.id})">Excluir</button>
          </td>
        </tr>
      `;
    } else {
      return "";
    }
  });
  atualizandoLocalstoragedespesas();
}

// exibe lista filtro depesa  obs: recebendo  listaFiltrodespesas
function exibeListaFiltro(despesa) {
  let trTdsfiltro = "";
  despesa.forEach(function (despesa) {
    trTdsfiltro += `<tr>
    <td>${despesa.data}</td>
    <td>${despesa.despesa}</td>
    <td>${despesa.valor}</td>
    <td>
            <button btn-Status id="pago" class="btn-salvar btn-primary${
              despesa.pago ? "" : " hidden"
            }" data-id="${despesa.id}" onclick="trocaStatusFiltro(${
      despesa.id
    })">Pago</button>
            <button btn-Status id="pendente" class="btn-cancelar botao-cancelar-pagina${
              !despesa.pago ? "" : " hidden"
            }" data-id="${despesa.id}" onclick="trocaStatusFiltro(${
      despesa.id
    })">Pendente</button>
          </td>
    <td>
    <button class="btn-cancelar botao-cancelar-pagina" data-id="${
      despesa.id
    }" onclick="excluirDespesa(${despesa.id})">Excluir</button>
    </td></tr>`;
  });

  tabelaControleDedespesas.innerHTML = trTdsfiltro;
}

//  Filtrando valor,data,despesa
inputFiltroDespesas.addEventListener("keyup", () => {
  let valordespesa = inputFiltroDespesas.value.toLowerCase().trim();
  let listaFiltrodespesas = listaDespesas.filter((despesa) => {
    let comparaData = despesa.data.toLowerCase().includes(valordespesa);
    let comparaDespesas = despesa.despesa.toLowerCase().includes(valordespesa);
    let comparavalor = despesa.valor.toLowerCase().includes(valordespesa);
    return comparaData || comparaDespesas || comparavalor;
  });

  exibeListaFiltro(listaFiltrodespesas);
});

function limparFormulario() {
  document.getElementById("meuFormulario").reset();
}

btnSalvardespesa.addEventListener("click", () => {
  if (validarFormularioDespesa()) {
    salvarDespesa();
    listarDespesa();
    limparFormulario();
    exibirQuantidadeDespesasPendentes();
    mostraPaginaHome();
    listarDespesa(listaDespesas);
  }
});

btnFiltrarCadastro.addEventListener("click", () => {
  inputFiltro.value = "";
  mostraPaginaCategorias();
});

// input filtro de categorias comparando categoria e id
inputFiltro.addEventListener("keyup", () => {
  let valor = inputFiltro.value.toLowerCase().trim();
  let listaFiltrada = listadeCategorias.filter((categoria) => {
    let comparaCategoria = categoria.categoria.toLowerCase().startsWith(valor);
    let comparacaoId = categoria.id.toString() === valor;
    return comparaCategoria || comparacaoId;
  });
  // trocaStatuspago(listaFiltrada);
  listarCategoria(listaFiltrada);
  inputFiltroDespesas.value = "";
});

function limparCampo() {
  inputCategoria.value = "";
}
// funcao troca de paginas
function mostraPaginaCategorias() {
  listarCategoria(listadeCategorias);
  limparCampo();
  paginaHome.classList.add("hidden");
  paginaCadastroCategoria.classList.remove("hidden");
  paginaAddDespesas.classList.add("hidden");
  paginaAdicionarCategoria.classList.add("hidden");
}
// btn troca de paginas
btnNavCategoria.addEventListener("click", mostraPaginaCategorias);
btnCancelarCategoria.addEventListener("click", mostraPaginaHome);

// funcao troca de paginas
function mostraPaginaHome() {
  listarDespesa(listaDespesas);
  limparCampo();
  paginaHome.classList.remove("hidden");
  paginaAdicionarCategoria.classList.add("hidden");
  paginaAddDespesas.classList.add("hidden");
  paginaCadastroCategoria.classList.add("hidden");
}
btnNavDespesas.addEventListener("click", mostraPaginaHome);

// funcao troca de paginas
function mostraModaldespesa() {
  paginaAddDespesas.classList.remove("hidden");
  paginaHome.classList.add("hidden");
}
btnAdicionardespesa.addEventListener("click", () => {
  mostraModaldespesa();
  categoriasDatalist();
});

// funcao troca de paginas
function mostraCadastroCategoria() {
  paginaAdicionarCategoria.classList.remove("hidden");
  paginaHome.classList.add("hidden");
  paginaAddDespesas.classList.add("hidden");
  paginaCadastroCategoria.classList.add("hidden");
}

btnAddcategoria.addEventListener("click", mostraCadastroCategoria);
btnCancelarCategoria.addEventListener("click", mostraPaginaCategorias);

btnFiltrarDespesa.addEventListener("click", function () {
  inputFiltroDespesas.value = "";
  mostraPaginaHome();
});
btnCancelaDespesa.addEventListener("click", () => {
  mostraPaginaHome();
});

// obs: usar parseFloat pra converter em numero
// A chamada do método replace usada nesse código para transformar o valor da despesa de uma string formatada na moeda brasileira em um valor numérico (float) que pode ser usado em cálculos matemáticos.
function somaDespesasPagas() {
  const despesasPagas = listaDespesas.filter((despesa) => despesa.pago);
  const totalDespesasPagas = despesasPagas.reduce((total, despesa) => {
    const valorNumerico = parseFloat(
      despesa.valor.replace("R$", "").replace(",", ".")
    );
    return total + valorNumerico;
  }, 0);
  console.log(totalDespesasPagas);
}

function exibiDespesaspagas() {
  const despesasPagas = listaDespesas.filter((despesa) => despesa.pago);
  const totalDespesasPagas = despesasPagas.reduce((total, despesa) => {
    const valorNumerico = parseFloat(
      despesa.valor.replace("R$", "").replace(",", ".")
    );
    return total + valorNumerico;
  }, 0);
  cardTotalpago.innerHTML = ` ${totalDespesasPagas.toLocaleString("pt-br", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
  atualizandoLocalstoragedespesas(); // Atualiza localStorage dos cards
}

function exibirDespesasapagar() {
  const despesasApagar = listaDespesas.filter((despesa) => !despesa.pago);

  const totalDespesasApagar = despesasApagar.reduce((total, despesa) => {
    const valorNumerico2 = parseFloat(
      despesa.valor.replace("R$", "").replace(",", ".")
    );
    return total + valorNumerico2;
  }, 0);
  cardTotalapagar.innerHTML = `${totalDespesasApagar.toLocaleString("pt-br", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function contarDespesasPendentes() {
  const despesasPendentes = listaDespesas.filter((despesa) => !despesa.pago);
  return despesasPendentes.length;
}

function exibirQuantidadeDespesasPendentes() {
  const quantidade = contarDespesasPendentes();

  if (cardAtrasadas) {
    cardAtrasadas.innerHTML = quantidade;
  }
}
// exlcuindo despesas pendentes e exibindo cards
function excluirDespesasPendentes(id) {
  let despesasPendentesFiltradas = listaDespesas.filter(
    (despesa) => !despesa.pago
  );

  if (despesasPendentesFiltradas.length > 0) {
    despesasPendentesFiltradas.splice(0, 1); 
    exibirQuantidadeDespesasPendentes();
    location.reload(); 
    excluirDespesa(id);
  } else {
    let despesasPagasFiltradas = listaDespesas.filter(
      (despesa) => despesa.pago
    );

    if (despesasPagasFiltradas.length > 0) {
      despesasPagasFiltradas = listaDespesas.filter((despesa) => despesa.pago);
      cardTotalpago.innerHTML = 0;
      excluirDespesa(id);
    }
  }
}
// formatando moeda
const inputValor1 = document.getElementById("valor");

inputValor.addEventListener("input", function () {
  let valor = this.value.replace(/\D/g, "");
  valor = (valor / 100)
    .toFixed(2)
    .replace(".", ",")
    .replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
  this.value = `R$ ${valor}`;
});
function exibirMensagem(tipo, mensagem) {
  const mensagemElemento = document.createElement("div");
  mensagemElemento.textContent = mensagem;
  mensagemElemento.classList.add(tipo);

  document.body.appendChild(mensagemElemento);

  setTimeout(function() {
    mensagemElemento.style.opacity = "0";
    setTimeout(function() {
      document.body.removeChild(mensagemElemento);
    }, 1000);
  }, 1000);
}


// Exemplo de uso
// exibirMensagem("sucesso", "Operação concluída com sucesso!");

// exibirMensagem("erro", "Ocorreu um erro durante a operação!");
