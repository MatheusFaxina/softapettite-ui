import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ConfirmationService, MessageService, LazyLoadEvent } from 'primeng/components/common/api';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { MesaFiltro } from './../mesa.service';
import { MesaService } from '../mesa.service';

@Component({
  selector: 'app-mesa-pesquisa',
  templateUrl: './mesa-pesquisa.component.html',
  styleUrls: ['./mesa-pesquisa.component.css']
})
export class MesaPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new MesaFiltro();
  mesas = [];
  @ViewChild('tabela') grid;

  constructor(
    private mesaService: MesaService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de mesas');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.mesaService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.mesas = resultado.mesas;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(mesa: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(mesa);
      }
    });
  }

  excluir(mesa: any) {
    this.mesaService.excluir(mesa.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.messageService.add({ severity: 'success', detail: 'Mesa excluída com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
