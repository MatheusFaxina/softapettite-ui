import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Mesa } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { MesaService } from '../mesa.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-mesa-cadastro',
  templateUrl: './mesa-cadastro.component.html',
  styleUrls: ['./mesa-cadastro.component.css']
})
export class MesaCadastroComponent implements OnInit {

  mesa = new Mesa();

  constructor(
    private mesaService: MesaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const codigoMesa = this.route.snapshot.params['codigo'];

    this.title.setTitle('Nova mesa');

    //this.carregarEstados();

    if (codigoMesa) {
      this.carregarMesa(codigoMesa);
    }
  }

  get editando() {
    return Boolean(this.mesa.codigo)
  }

  carregarMesa(codigo: number) {
    this.mesaService.buscarPorCodigo(codigo)
      .then(mesa => {
        this.mesa = mesa;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarMesa(form);
    } else {
      this.adicionarMesa(form);
    }
  }

  adicionarMesa(form: FormControl) {
    this.mesaService.adicionar(this.mesa)
      .then(mesaAdicionada => {
        this.messageService.add({ severity: 'success', detail: 'Mesa adicionada com sucesso!' });
        this.router.navigate(['/mesa', mesaAdicionada.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarMesa(form: FormControl) {
    this.mesaService.atualizar(this.mesa)
      .then(mesa => {
        this.mesa = mesa;

        this.messageService.add({ severity: 'success', detail: 'Mesa alterada com sucesso!' });
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  nova(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.mesa = new Mesa();
    }.bind(this), 1);

    this.router.navigate(['/mesas/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de mesa: ${this.mesa.nome}`);
  }

}
