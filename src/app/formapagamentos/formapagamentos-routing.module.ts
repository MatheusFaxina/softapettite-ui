import { FormapagamentoPesquisaComponent } from './formapagamento-pesquisa/formapagamento-pesquisa.component';
import { FormapagamentoCadastroComponent } from './formapagamento-cadastro/formapagamento-cadastro.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './../seguranca/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: FormapagamentoPesquisaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'nova',
    component: FormapagamentoCadastroComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':codigo',
    component: FormapagamentoCadastroComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FormaPagamentosRoutingModule { }
