import { ParcelaPesquisaComponent } from './parcela-pesquisa/parcela-pesquisa.component';
import { ParcelaCadastroComponent } from './parcela-cadastro/parcela-cadastro.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './../seguranca/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ParcelaPesquisaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'nova',
    component: ParcelaCadastroComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':codigo',
    component: ParcelaCadastroComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ParcelasRoutingModule { }
