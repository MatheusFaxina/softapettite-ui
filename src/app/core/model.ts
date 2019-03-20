export class Endereco {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
}

export class Contato {
  codigo: number;
  nome: string;
  email: string;
  telefone: string;

  constructor(codigo?: number, nome?: string, email?: string, telefone?: string) {
    this.codigo = codigo;
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
  }
}

export class Pessoa {
  codigo: number;
  nome: string;
  endereco = new Endereco();
  ativo = true;
  contatos = new Array<Contato>();
}

export class Categoria {
  codigo: number;
}

export class Lancamento {
  codigo: number;
  tipo = 'RECEITA';
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  observacao: string;
  pessoa = new Pessoa();
  categoria = new Categoria();
}

export class Pedido {
  codigo: number;
  cadastro: Date;
  status: string;
  valorTotal: number;
  itens = new Array<ItemPedido>();
  mesa = new Mesa();
}

export class FormaPagamento {
  codigo: number;
  nome: string;
}

 export class ItemPedido {
  codigo: number;
  quantidade: Number = 1;
  venda = new Pedido();
  produto = new Produto();
  valorUnitario: number;

  constructor(codigo?: number, quantidade?: number, pedido?: Pedido,
    produto?: Produto) {
    this.codigo = codigo;
    this.quantidade = quantidade;
    this.venda = pedido;
    this.produto = produto;
  }
}

export class Produto {
  codigo: number;
  nome: string;
  valor: number;
  estoque: number;
  estoqueMinimo: number;
  valorCusto: number;
  adicionais = new Array<AdicionalProduto>();
  observacoes = new Array<ObservacaoProduto>();
  retirars = new Array<RetirarProduto>();
}

export class AdicionalProduto {
  codigo: number;
  nome: string;

  constructor(codigo?: number, nome?: string) {
    this.codigo = codigo;
    this.nome = nome;
  }
}

export class ObservacaoProduto {
  codigo: number;
  nome: string;
  produto: Produto;

  constructor(codigo?: number, nome?: string) {
    this.codigo = codigo;
    this.nome = nome;
  }
}

export class RetirarProduto {
  codigo: number;
  nome: string;
  produto: Produto;

  constructor(codigo?: number, nome?: string) {
    this.codigo = codigo;
    this.nome = nome;
  }
}

export class Parcela {
  codigo: number;
  nome: string;
  numeroParcela: number;
}

export class Mesa {
  codigo: number;
  nome: string;
  emUso: boolean;
  ativo: boolean;
}

export class Usuario {
  codigo: number;
  nome: string;
  email: string;
  senha: string;
  permissoes = new Array<Permissao>();
}

export class Permissao {
  codigo: number;
  nome: string;
}

export class Estado {
  codigo: number;
  nome: string;
}

export class Cidade {
  codigo: number;
  nome: string;
  estado: Estado;
}
