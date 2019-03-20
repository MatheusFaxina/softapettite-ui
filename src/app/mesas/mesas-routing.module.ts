import { MesaCadastroComponent } from './mesa-cadastro/mesa-cadastro.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './../seguranca/auth.guard';
import { MesaPesquisaComponent } from './mesa-pesquisa/mesa-pesquisa.component';

const routes: Routes = [
  {
    path: '',
    component: MesaPesquisaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'nova',
    component: MesaCadastroComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':codigo',
    component: MesaCadastroComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MesasRoutingModule { }
