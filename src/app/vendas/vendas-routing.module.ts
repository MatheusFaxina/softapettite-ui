import { VendaPesquisaComponent } from './venda-pesquisa/venda-pesquisa.component';
import { VendaCadastroComponent } from './venda-cadastro/venda-cadastro.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './../seguranca/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: VendaPesquisaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'nova',
    component: VendaCadastroComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':codigo',
    component: VendaCadastroComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class VendasRoutingModule { }
