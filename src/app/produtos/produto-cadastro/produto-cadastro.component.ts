import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { MessageService } from 'primeng/components/common/api';

import { CategoriaService } from './../../categorias/categoria.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Produto, RetirarProduto, ObservacaoProduto, AdicionalProduto } from './../../core/model';
import { ProdutosService } from '../produtos.service';

@Component({
  selector: 'app-produto-cadastro',
  templateUrl: './produto-cadastro.component.html',
  styleUrls: ['./produto-cadastro.component.css']
})
export class ProdutoCadastroComponent implements OnInit {

  produto = new Produto();
  mudaNomeNgModel = false;
  precoProduto: number;
  exibindoFormularioProduto = false;
  produtoNovo: Produto;
  produtoIndex: number;
  formulario: FormGroup;
  categorias = [];
  retirar: RetirarProduto;
  observacao: ObservacaoProduto;
  adicional: AdicionalProduto;
  @ViewChild('tabela') grid;
  exibindoFormularioAdicional = false;
  exibindoFormularioRetirar = false;
  exibindoFormularioObservacao = false;
  adicionalIndex: number;
  observacaoIndex: number;
  retirarIndex: number;

  constructor(
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder,
    private produtoService: ProdutosService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit() {
    const codigoLancamento = this.route.snapshot.params['codigo'];

    this.title.setTitle('Novo produto');

    if (codigoLancamento) {
      this.carregarProduto(codigoLancamento);
    }

    this.carregarCategorias();
  }

  validarObrigatoriedade(input: FormControl) {
    return (input.value ? null : { obrigatoriedade: true });
  }

  validarTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= valor) ? null : { tamanhoMinimo: { tamanho: valor } };
    };
  }

  novo() {
    this.formulario.reset();

    setTimeout(function() {
      this.produto = new Produto();
    }.bind(this), 1);

    this.router.navigate(['/produtos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de produto`);
  }

  carregarProduto(codigo: number) {
    this.produtoService.buscarPorCodigo(codigo)
      .then(produto => {
        this.produto = produto;
        //this.formulario.patchValue(pedido);
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.produto.codigo)
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarProduto(form);
    } else {
      this.adicionarProduto(form);
    }
  }

  adicionarProduto(form: FormControl) {
    this.produtoService.adicionar(this.produto)
      .then(produtoAdicionada => {
        this.messageService.add({ severity: 'success', detail: 'Produto adicionado com sucesso!' });
        this.router.navigate(['/produtos', produtoAdicionada.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarProduto(form: FormControl) {
    this.produtoService.atualizar(this.produto)
      .then(produto => {
        this.produto = produto;
        this.messageService.add({ severity: 'success', detail: 'Produto alterado com sucesso!' });
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
      .then(categorias => this.categorias = categorias
      )
  }

  prepararNovoAdicional() {
    this.exibindoFormularioAdicional = true;
    this.adicional = new AdicionalProduto();
    this.adicionalIndex = this.produto.adicionais.length;
  }

  confirmarAdicional(frm: FormControl) {
    this.produto.adicionais[this.adicionalIndex] = this.clonarAdicional(this.adicional);
    this.exibindoFormularioAdicional = false;

    frm.reset();
  }

  clonarAdicional(adicional: AdicionalProduto): AdicionalProduto {
    return new AdicionalProduto(adicional.codigo,
      adicional.nome);
  }

  removerAdicional(index: number) {
    this.produto.adicionais.splice(index, 1);
  }

  prepararEdicaoAdicional(adicional: AdicionalProduto, index: number) {
    this.adicional = this.clonarAdicional(adicional);
    this.exibindoFormularioAdicional = true;
    this.adicionalIndex = index;
  }

  prepararNovaObservacao() {
    this.exibindoFormularioObservacao = true;
    this.observacao = new ObservacaoProduto();
    this.observacaoIndex = this.produto.observacoes.length;
  }

  confirmarObservacao(frm: FormControl) {
    this.produto.observacoes[this.observacaoIndex] = this.clonarObservacao(this.observacao);

    this.exibindoFormularioObservacao = false;

    frm.reset();
  }

  clonarObservacao(observacao: ObservacaoProduto): ObservacaoProduto {
    return new ObservacaoProduto(observacao.codigo,
      observacao.nome);
  }

  removerObservacao(index: number) {
    this.produto.observacoes.splice(index, 1);
  }

  prepararEdicaoObservacao(observacao: ObservacaoProduto, index: number) {
    this.observacao = this.clonarObservacao(observacao);
    this.exibindoFormularioObservacao = true;
    this.observacaoIndex = index;
  }

  prepararNovoRetirar() {
    this.exibindoFormularioRetirar = true;
    this.retirar = new RetirarProduto();
    this.retirarIndex = this.produto.retirars.length;
  }

  confirmarRetirar(frm: FormControl) {
    this.produto.retirars[this.retirarIndex] = this.clonarRetirar(this.retirar);

    this.exibindoFormularioRetirar = false;

    frm.reset();
  }

  clonarRetirar(retirar: RetirarProduto): RetirarProduto {
    return new RetirarProduto(retirar.codigo,
      retirar.nome);
  }

  removerRetirar(index: number) {
    this.produto.retirars.splice(index, 1);
  }

  prepararEdicaoRetirar(retirar: RetirarProduto, index: number) {
    this.retirar = this.clonarRetirar(retirar);
    this.exibindoFormularioRetirar = true;
    this.retirarIndex = index;
  }

}
