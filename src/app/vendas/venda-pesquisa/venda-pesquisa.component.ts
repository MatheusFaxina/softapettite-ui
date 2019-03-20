import { MessageService } from 'primeng/api';
import { AuthService } from './../../seguranca/auth.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { Pedido } from './../../core/model';
import { VendaFiltro, VendaService } from './../venda.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-venda-pesquisa',
  templateUrl: './venda-pesquisa.component.html',
  styleUrls: ['./venda-pesquisa.component.css']
})
export class VendaPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new VendaFiltro();
  vendas = [];
  @ViewChild('tabela') grid;

  ngOnInit() {
    this.pesquisar();
  }

  constructor(
    private vendaService: VendaService,
    private errorHandler: ErrorHandlerService,
    private auth: AuthService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
  ) { }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.vendaService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.vendas = resultado.vendas;
        console.log(this.vendas);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarCancelamentoPedido(venda: Pedido) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja cancelar o venda?',
      accept: () => {
        this.cancelarPedido(venda);
      }
    });
  }

  cancelarPedido(venda: Pedido): void {
    this.vendaService.cancelar(venda.codigo)
      .then(() => {
        if (venda.status === 'CANCELADO') {
          this.messageService.add({ severity: 'warn', detail: 'Este venda já foi cancelado!' });
        } else {
          this.messageService.add({ severity: 'success', detail: 'Pedido cancelado com sucesso!' });
          this.pesquisar();
        }
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  verificaSePodeAlterar(venda: Pedido): Boolean {
    if (venda.status === 'CANCELADO') {
      return true;
    } else {
      return false;
    }
  }

}
