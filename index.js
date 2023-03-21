// -identificando-os-elementos-no-html-através-do-id dos botoes
let btnFiltrar = document.getElementById("botao-filtrar");
let btnAdicionardespesa = document.getElementById("botao-adicionar");
let btnSalvardespesa = document.getElementById("botao-salvar-despesa");
let btnSalvar = document.getElementById("botao-salvar");
let btnCancelar = document.getElementById("botao-cancelar");
let btnCancelaDespesa = document.getElementById("botao-cancelar-despesa");
let btnCancelarCategoria = document.getElementById("btn-categoria-cancelar");
let btnAddcategoria = document.getElementById("addcategoria");
let btnNavCategoria = document.getElementById("categorias");
let btnNavDespesas = document.getElementById("despesas");
let btnFiltrarCadastro = document.getElementById("btn-filtrar-cadastro");
let btnFiltrarDespesa = document.getElementById("botao-filtrar");
let btnPago = document.getElementById("pago");
let btnPendente = document.getElementById("pendente");
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
let opcoesCategorias = document.getElementById("opcoes-categorias");
const listadeCategorias = [];

function gerarId() {
  if (listadeCategorias.length > 0) {
    return listadeCategorias[listadeCategorias.length - 1].id + 1;
  }
  return 1;
}
function gerarIddespesas() {
  if (listaDespesas.length > 0) {
    return listaDespesas[listaDespesas.length - 1].id + 1;
  }
  return 1;
}

function validarFormulario() {
  if (
    inputCategoria.value.length == 0 ||
    listadeCategorias.find((obj) => obj.categoria == inputCategoria.value)
  ) {
    alert("ERRO digite novamente ");
  } else {
    inputCategoria.value = inputCategoria.value.toLowerCase(); // converter para minúsculas
    alert("preenchido com sucesso");
    salvarCategoria();
    limparCampo();
  }
}

function salvarCategoria() {
  let categoria = {
    id: gerarId(),
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
    listarCategoria();
  }
}
// funcao pra filtrar categorias e exibir
function exibeLista(categoria) {
  // lista filtrada
  let trTds = "";
  categoria.forEach(function (categoria) {
    trTds += `<tr>
    <td>${categoria.id}</td>
    <td>${categoria.categoria}</td>
   <td class="botoes-categoria">
    <button class="btn-salvar btn-primary" data-id="${categoria.id}" onclick="editarCategoria(${categoria.id})">Editar</button>
    
    
      <button class="btn-cancelar botao-cancelar-pagina" data-id="${categoria.id}" onclick="excluirCategoria(${categoria.id})">Excluir</button>
    </td>
    
    </tr>`;
  });
  tabelalistadeCategorias.innerHTML = trTds;
}

let proximoId = 1;

function adicionarCategoria() {
  const novaCategoria = {
    id: proximoId,
    categoria: inputCategoria.value,
  };
  listadeCategorias.push(novaCategoria);
  proximoId++;
  listarCategoria();
  inputCategoria.value = "";
}

function editarCategoria(id) {
  const categoriaParaEditar = listadeCategorias.find(
    (categoria) => categoria.id === id
  );
  const novoNomeCategoria = prompt(
    "Digite o novo nome da categoria:",
    categoriaParaEditar.categoria
  );
  categoriaParaEditar.categoria = novoNomeCategoria;
  listarCategoria();
}

function listarCategoria() {
  tabelalistadeCategorias.innerHTML = listadeCategorias
    .map((categoria) => {
      if (categoria.categoria !== "") {
        return `
          <tr>
            <td>${categoria.id}</td>
            <td>${categoria.categoria}</td>
            
            <td class="botoes-categoria">

            <button class="btn-salvar btn-primary" data-id="${categoria.id}" onclick="editarCategoria(${categoria.id})">Editar</button>
            
            
              <button class="btn-cancelar botao-cancelar-pagina" data-id="${categoria.id}" onclick="excluirCategoria(${categoria.id})">Excluir</button>
            </td>
            
          </tr>
        `;
      } else {
        return "";
      }
    })
    .join("");
}
function categoriasDatalist() {
  let opcao = "";
  listadeCategorias.forEach(
    (cat) => (opcao += `<option>${cat.categoria}</option>`)
  );

  opcoesCategorias.innerHTML = opcao;
}

function atualizarCategoria(id) {
  const categoriaIndex = listadeCategorias.findIndex(
    (categoria) => categoria.id === id
  );
  if (categoriaIndex !== -1) {
    // Atualize a categoria na lista de categorias com o novo nome da categoria
    listadeCategorias[categoriaIndex].categoria = inputCategoria.value;

    // Atualize a tabela
    // listarCategoria();

    // Limpe o formulário e altere o botão "Atualizar" para "Salvar"
    inputCategoria.value = "";
    btnSalvar.innerText = "Salvar";
    btnSalvar.onclick = salvarCategoria;
  }
}

// modal adicionando despesa
function validarFormularioDespesa() {
  if (
    (inputBuscaCategoria.value.length !== 0 &&
      isNaN(inputBuscaCategoria.value)) ||
    (inputDespesas.value.length !== 0 && isNaN(inputDespesas.value.length))
  ) {
    inputBuscaCategoria.value = inputBuscaCategoria.value.toLowerCase(); // converter para minúsculas
    alert("preenchido com sucesso");
  } else {
    alert("ERRO digite novamente ");
  }
}
// Seleciona o campo de entrada de data
// let dataInput = document.getElementById("data");

// // Aplica a máscara no evento "input"
// dataInput.addEventListener("input", function () {
//   // Obtém o valor atual do campo de entrada
//   let data = this.value;

//   // Remove todos os caracteres que não são números
//   data = data.replace(/\D/g, "");

//   // Adiciona os caracteres da máscara
//   data = data.replace(/^(\d{2})(\d)/g, "$1/$2");
//   data = data.replace(/(\d{2})(\d)/, "$1/$2");

//   // Define o valor formatado no campo de entrada
//   this.value = data;
// });

// formatando moeda
let mascara = (symbol, element) => {
  // Seleciona o elemento pelo ID
  let valor = document.getElementById("mascara");

  // Remove qualquer caractere que não seja número
  let val = inputValor.value.replace(/\D/g, "");

  // Adiciona separadores de milhares
  val = val.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

  // Adiciona o símbolo e atualiza o valor do elemento
  inputValor.value = symbol + val;
};
// adicionando despesa

const listaDespesas = [];

let despesa = {
  
  BuscaCategoria: "",
  despesa: "",
  valor: inputValor.value,
  data: inputData.value,
};
function salvarDespesa() {
  let creandoDespesa = { ...despesa };
  creandoDespesa.id=gerarIddespesas()
  creandoDespesa.BuscaCategoria = inputBuscaCategoria.value;
  creandoDespesa.despesa = inputDespesas.value;
  creandoDespesa.valor = inputValor.value;
  creandoDespesa.data = inputData.value;
  listaDespesas.push(creandoDespesa);
  console.log(listaDespesas);
}


function trocaStatuspago(id) {
  const despesa = listaDespesas.find((d) => d.id === id);
  if (despesa) {
    despesa.pago = !despesa.pago;
    const pagoButton = document.querySelector(
      `button[data-id="${id}"][id="pago"]`
    );
    const pendenteButton = document.querySelector(
      `button[data-id="${id}"][id="pendente"]`
    );
    if (pagoButton && pendenteButton) {
      pagoButton.classList.toggle("hidden");
      pendenteButton.classList.toggle("hidden");
    }
  }
}

// tabela listar despesa
function listarDespesa() {
  tabelaControleDedespesas.innerHTML = listaDespesas
    .map((despesa) => {
      if (despesa.despesa !== "") {
        console.log(despesa)
        return `
          <tr>
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
          </tr>
        `;
      } else {
        return "";
      }
    })
    .join("");
}
// exibe lista filtro
function exibeListaFiltro(despesa) {
  // lista filtrada
  let trTdsfiltro = "";
  despesa.forEach(function (despesa) {
    trTdsfiltro += `<tr>
    <td>${despesa.data}</td>
    <td>${despesa.despesa}</td>
    <td>${despesa.valor}</td>
    
    </tr>`;
  });
  tabelaControleDedespesas.innerHTML = trTdsfiltro;
}

//  Filtrando valor,data,despesas
inputFiltroDespesas.addEventListener("keyup", () => {
  let valordespesa = inputFiltroDespesas.value.toLowerCase().trim();
  let listaFiltrodespesas = listaDespesas.filter((despesa) => {
    let comparaData = despesa.data.toLowerCase()
    .includes(valordespesa);
    let comparaDespesas = despesa.despesa.toLowerCase()
      .includes(valordespesa);
    let comparavalor = despesa.valor.toLowerCase()
    .includes(valordespesa);
    return comparaData || comparaDespesas || comparavalor;
  });
  exibeListaFiltro(listaFiltrodespesas);
});
// inputFiltroDespesas.addEventListener("keyup", () => {
//   let textoFiltrodespesa = inputFiltroDespesas.value.toLowerCase().trim();
//   let listaFiltrodespesas = listaDespesas.filter((obj) => {
//     despesa.despesa.toLowerCase().trim().includes(textoFiltrodespesa)||
//     despesa.valor.trim().includes(textoFiltrodespesa)||
//     despesa.data.trim().includes(textoFiltrodespesa)

//   });
//   exibeListaFiltro(listaFiltrodespesas);
// });

function limparFormulario() {
  document.getElementById("meuFormulario").reset(); // reinicia o formulário inteiro
}

btnSalvardespesa.addEventListener("click", () => {
  validarFormularioDespesa();
  salvarDespesa();
  limparFormulario();
  mostraPaginaHome();
  listarDespesa();
  // exibeListaDespesa();
});

btnFiltrarCadastro.addEventListener("click", () => {
  validarFormulario();
  mostraPaginaCategorias();
});

inputFiltro.addEventListener("keyup", () => {
  let valor = inputFiltro.value.toLowerCase().trim();
  let listaFiltrada = listadeCategorias.filter((categoria) => {
    let comparaCategoria = categoria.categoria.toLowerCase().startsWith(valor);
    let comparacaoId = categoria.id.toString() === valor;
    return comparaCategoria || comparacaoId;
  });
  exibeLista(listaFiltrada);
});

function atualizaTela() {
  location.reload(); // voltando ao formulario
}
function limparCampo() {
  inputCategoria.value = "";
}
function mensagem() {
  alert("por favor edite sua categoria na tela anterior");
}
// troca de paginas
function mostraPaginaCategorias() {
  limparCampo();
  paginaHome.classList.add("hidden");
  paginaCadastroCategoria.classList.remove("hidden");
  paginaAddDespesas.classList.add("hidden");
  paginaAdicionarCategoria.classList.add("hidden");
}
// btn troca de paginas
btnNavCategoria.addEventListener("click", mostraPaginaCategorias);
btnCancelarCategoria.addEventListener("click", mostraPaginaHome);

function mostraPaginaHome() {
  paginaHome.classList.remove("hidden");
  paginaAdicionarCategoria.classList.add("hidden");
  paginaAddDespesas.classList.add("hidden");
  paginaCadastroCategoria.classList.add("hidden");
}
btnNavDespesas.addEventListener("click", mostraPaginaHome);

function mostraModaldespesa() {
  paginaAddDespesas.classList.remove("hidden");
  paginaHome.classList.add("hidden");
}
btnAdicionardespesa.addEventListener("click", () => {
  mostraModaldespesa();
  categoriasDatalist();
});

function mostraCadastroCategoria() {
  paginaAdicionarCategoria.classList.remove("hidden");
  paginaHome.classList.add("hidden");
  paginaAddDespesas.classList.add("hidden");
  paginaCadastroCategoria.classList.add("hidden");
}

btnAddcategoria.addEventListener("click", mostraCadastroCategoria);
btnCancelarCategoria.addEventListener("click", mostraPaginaCategorias);
// btn da pagina de add categoria
btnSalvar.addEventListener("click", () => {
  validarFormulario();
  mostraPaginaCategorias();
  listarCategoria();
});

btnCancelaDespesa.addEventListener("click", () => {
  mostraPaginaHome();
});
