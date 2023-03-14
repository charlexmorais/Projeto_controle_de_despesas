// -identificando-os-elementos-no-html-através-do-id dos botoes
let btnFiltrar = document.getElementById("botao-filtrar");
let btnAdicionardespesa = document.getElementById("botao-adicionar");
let btnFiltrarCadastro = document.getElementById("filtrar-cadastro");
let btnSalvar = document.getElementById("botao-salvar");
let btnCancelar = document.getElementById("btn-personalizacao-cancelar");
let btnAddcategoria = document.getElementById("addcategoria");

// buscando valores dos inputs
let inputCategoria = document.getElementById("input-categoria");

let categoria = {
  ID: 0,
  categoria: "",
  acoes: "",
};

let listadeCategorias = [];

function VerificaInputAddCategoria() {
  if (inputCategoria.value <= 0) {
    alert("Por favor, preencha o campo Categoria.");
    return false;
  }

//  chama funcao de salvar e subir pro array

  return true;
}

let lista = () => {
  console.log("clicou");
};

btnSalvar.addEventListener("click", VerificaInputAddCategoria);
btnCancelar.addEventListener("click", lista);
