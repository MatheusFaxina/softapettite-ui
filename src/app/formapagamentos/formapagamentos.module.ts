import { FormapagamentoPesquisaComponent } from './formapagamento-pesquisa/formapagamento-pesquisa.component';
import { FormapagamentoCadastroComponent } from './formapagamento-cadastro/formapagamento-cadastro.component';
import { FormaPagamentosRoutingModule } from './formapagamentos-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,

    FormaPagamentosRoutingModule
  ],
  declarations: [
    FormapagamentoCadastroComponent,
    FormapagamentoPesquisaComponent
  ]
})
export class FormapagamentosModule { }
