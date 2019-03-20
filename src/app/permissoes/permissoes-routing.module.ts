import { PermissaoPesquisaComponent } from './permissao-pesquisa/permissao-pesquisa.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './../seguranca/auth.guard';
import { PermissaoCadastroComponent } from './permissao-cadastro/permissao-cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: PermissaoPesquisaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'nova',
    component: PermissaoCadastroComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':codigo',
    component: PermissaoCadastroComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PermissoesRoutingModule { }
