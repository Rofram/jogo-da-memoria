// métodos estáticos não podem acessar o this
const util = Util

const ID_CONTEUDO = 'conteudo'
const ID_BTN_JOGAR = 'jogar'
const ID_BTN_MOSTRAR_TUDO = 'mostrarTudo'
const ID_CARREGANDO = 'carregando'
const ID_CONTADOR = 'contador'
const ID_MENSAGEM = 'mensagem'
const CLASSE_INVISIVEL = 'invisible'
const MENSAGENS = {
  sucesso: {
    texto: 'Combinação correta!',
    classe: 'alert-success'
  },
  erro: {
    texto: 'Combinação Incorreta',
    classe: 'alert-danger'
  }
}

class Tela {
  static obterCodigoHtml(item) {
    return `
    <div class="col-md-3">
      <div class="card" onclick="window.verificarSelecao('${item.id}', '${item.nome}')">
        <img src="${item.img}" name="${item.nome}" class="card-img-top">
      </div>
      <br />
    </div>
    `
  }

  static alterarConteudoHtml(codigoHtml) {
    const conteudo = document.getElementById(ID_CONTEUDO)
    conteudo.innerHTML = codigoHtml
  }

  static gerarStringHTMLPelaImagem(itens) {
    // para cada item da lista, vai executar a função obterCodigoHtml
    // ao final, vai concatenar tudo em uma única string
    // muda de Array para String
    return itens.map(Tela.obterCodigoHtml).join('')
  }

  static atualizarImagens(itens) {
    const codigoHtml = Tela.gerarStringHTMLPelaImagem(itens)
    Tela.alterarConteudoHtml(codigoHtml)
  }

  static exibirHerois(nome, img) {
    const elementosHtml = document.getElementsByName(nome)

    // para cada elemento trocar o src da imagem
    elementosHtml.forEach(item => (item.src = img))
  }

  static async exibirMensagem(sucesso = true) {
    const elemento = document.getElementById(ID_MENSAGEM)
    if(sucesso) {
      elemento.classList.remove(MENSAGENS.erro.classe)
      elemento.classList.add(MENSAGENS.sucesso.classe)
      elemento.innerText = MENSAGENS.sucesso.texto
    } else {
      elemento.classList.remove(MENSAGENS.sucesso.classe)
      elemento.classList.add(MENSAGENS.erro.classe)
      elemento.innerText = MENSAGENS.erro.texto
    }

    elemento.classList.remove(CLASSE_INVISIVEL)

    await util.timeout(1000)

    elemento.classList.add(CLASSE_INVISIVEL)
  }

  static exibirCarregando(mostrar = true) {
    const carregando = document.getElementById(ID_CARREGANDO)
    if(mostrar) {
      carregando.classList.remove(CLASSE_INVISIVEL)
      return;
    }

    carregando.classList.add(CLASSE_INVISIVEL)
  }

  static iniciarContador() {
    let contarAte = 3
    const elementoContador = document.getElementById(ID_CONTADOR)
    const identificadorNoTexto = "$$contador"
    let textoPadrao = `Começando em ${identificadorNoTexto}...`
    const atualizarTexto = () => {
      elementoContador.innerText = textoPadrao.replace(identificadorNoTexto, contarAte--)
    }

    atualizarTexto()
    const idDoIntervalo = setInterval(atualizarTexto, 1000)
    return idDoIntervalo
  }

  static limparContador(idDoInterval) {
    clearInterval(idDoInterval)
    document.getElementById(ID_CONTADOR).innerText = ""
  }

  static configurarBotaoJogar(functionOnClick) {
    const btnJogar = document.getElementById(ID_BTN_JOGAR)
    btnJogar.onclick = functionOnClick
  }

  static configurarBotaoSelecao(funcaoOnClick) {
     window.verificarSelecao = funcaoOnClick
  }

  static configurarBotaoMostrarTudo(funcaoOnClick) {
    const btnMostrarTudo = document.getElementById(ID_BTN_MOSTRAR_TUDO)
    btnMostrarTudo.onclick = funcaoOnClick
  }
}