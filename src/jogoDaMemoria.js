class JogoDaMemoria {
  constructor({ tela, util }) {
    this.tela = tela
    this.util = util

    // caminho do arquivo, sempre relativo ao index.html
    this.heroisIniciais = [
      {
        img: './assets/batman.png',
        nome: 'batman'
      },
      {
        img: './assets/flash.png',
        nome: 'flash'
      },
      {
        img: './assets/gaviao.png',
        nome: 'gaviao'
      },
      {
        img: './assets/thor.png',
        nome: 'thor'
      }
    ]

    this.iconePadrao = './assets/shield.png'
    this.heroisEscondidos = []
    this.heroisSelecionados = []
  }

  // para usar o this, não pode usar static
  inicializar() {
    this.tela.atualizarImagens(this.heroisIniciais)
    this.tela.configurarBotaoJogar(this.jogar.bind(this))
    this.tela.configurarBotaoSelecao(this.verificarSelecao.bind(this))
    this.tela.configurarBotaoMostrarTudo(this.mostrarHeroisEscondidos.bind(this))
  }

  async embaralhar() {
    const copias = this.heroisIniciais
      .concat(this.heroisIniciais) // duplicar is itens
      .map(item => {
        return Object.assign({}, item, { id: Math.random() / 0.5 }) // adicionar nova propriedade
      })
      .sort(() => Math.random() - 0.5) // ordenar aleatoriamente
    
      this.tela.atualizarImagens(copias)
      this.tela.exibirCarregando()

      const idDoInterval = this.tela.iniciarContador()

      await this.util.timeout(3000)
      this.tela.limparContador(idDoInterval)
      this.esconderHerois(copias)
      this.tela.exibirCarregando(false)
      
      
  }

  esconderHerois(herois) {
    const heroisOcultos = herois.map(({ nome, id }) => ({
      id,
      nome,
      img: this.iconePadrao
    }))

    this.tela.atualizarImagens(heroisOcultos)
    this.heroisEscondidos = heroisOcultos
  }

  exibirHerois(nomeDoHeroi) {
     const { img } = this.heroisIniciais.find(({ nome }) => nome === nomeDoHeroi)

     this.tela.exibirHerois(nomeDoHeroi, img)
  }

  verificarSelecao(id, nome) {
    const item = { id, nome }
    const heroisSelecionados = this.heroisSelecionados.length

    switch(heroisSelecionados) {
      case 0:
        this.heroisSelecionados.push(item)
        break;
      case 1:
        const [ opcao1 ] = this.heroisSelecionados
        this.heroisSelecionados = []
        
        if(opcao1.nome === item.nome && opcao1.id !== item.id) {
          this.exibirHerois(item.nome)
          this.tela.exibirMensagem()
          return;
        }

        this.tela.exibirMensagem(false)
        break;
    }
  }

  mostrarHeroisEscondidos() {
    const heroisEscondidos = this.heroisEscondidos

    for(const heroi of heroisEscondidos) {
      const { img } = this.heroisIniciais.find(item => item.nome === heroi.nome)
      heroi.img = img
    }

    this.tela.atualizarImagens(heroisEscondidos)
  }

  jogar() {
    this.embaralhar()
  }
}