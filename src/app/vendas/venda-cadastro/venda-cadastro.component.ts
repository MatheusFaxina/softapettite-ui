import { VendaService } from './../venda.service';
import { Pedido, Produto, ItemPedido, Mesa } from './../../core/model';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, ErrorHandler } from '@angular/core';
import { PessoaService } from 'app/pessoas/pessoa.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { MesaService } from 'app/mesas/mesa.service';
import { ProdutosService } from 'app/produtos/produtos.service';

@Component({
  selector: 'app-venda-cadastro',
  templateUrl: './venda-cadastro.component.html',
  styleUrls: ['./venda-cadastro.component.css']
})
export class VendaCadastroComponent implements OnInit {

  venda: Pedido;
  item: ItemPedido;
  mesas: Array<Mesa>;
  produtos: Array<Produto>;
  @Output() vendaSalva = new EventEmitter();

  constructor(private vendaService: VendaService,
    private mesaService: MesaService,
    private produtoService: ProdutosService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
) { }

  ngOnInit() {
    const codigoPedido = this.route.snapshot.params['codigo'];

    this.title.setTitle('Nova venda');

    if (codigoPedido) {
      this.carregarPedido(codigoPedido);
    }

    this.carregarMesas();
    this.carregarProdutos();
    this.novaVenda();
  }

  novaVenda() {
    this.venda = new Pedido();
    this.item = new ItemPedido();
  }

  incluirItem() {
    this.item.valorUnitario = this.item.produto.valor;

    this.venda.itens.push(this.item);

    this.item = new ItemPedido();

    //this.calcularTotal();
  }

  calcularTotal() {
    const totalItens = this.venda.itens
      .map(i => (i.produto.valor * i.quantidade))
      .reduce((total, v) => total + v, 0);

    this.venda.valorTotal = totalItens;
  }

  //adicionar(frm: FormGroup) {
    // this.vendaService.adicionar(this.venda).then(response => {
    //   frm.reset();
    //   this.novaVenda();
    //   //this.messageService.add({ severity: 'success', detail: 'Venda adicionada com sucesso!' });
    //   console.log(this.venda);

    //   this.vendaSalva.emit(response);
    //});
    //console.log(this.venda);
    //}

  adicionar(form: FormControl) {
    this.venda.cadastro = new Date('2018-02-20');
    this.calcularTotal();
    this.vendaService.adicionar(this.venda)
      .then(vendaAdicionada => {
        this.messageService.add({ severity: 'success', detail: 'Venda adicionada com sucesso' });
        this.router.navigate(['/vendas', vendaAdicionada.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
      console.log(this.venda);
  }

    carregarMesas() {
      return this.mesaService.listarTodas()
        .then(categorias => this.mesas = categorias
        )
    }

    carregarProdutos() {
      return this.produtoService.listarTodas()
        .then(produtos => this.produtos = produtos
        )
    }

    carregarPedido(codigo: number) {
      this.vendaService.buscarPorCodigo(codigo)
        .then(venda => {
          this.venda = venda;
          this.atualizarTituloEdicao();
        })
        .catch(erro => this.errorHandler.handle(erro));
    }

    atualizarTituloEdicao() {
      this.title.setTitle(`Edição de venda: ${this.venda.cadastro}`);
    }

}
