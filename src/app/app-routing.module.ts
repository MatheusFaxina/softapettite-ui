import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NaoAutorizadoComponent } from './core/nao-autorizado.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';

const routes: Routes = [
  { path: 'lancamentos', loadChildren: 'app/lancamentos/lancamentos.module#LancamentosModule' },
  { path: 'pessoas', loadChildren: 'app/pessoas/pessoas.module#PessoasModule' },
  { path: 'produtos', loadChildren: 'app/produtos/produtos.module#ProdutosModule' },
  { path: 'usuarios', loadChildren: 'app/usuarios/usuarios.module#UsuariosModule' },
  { path: 'vendas', loadChildren: 'app/vendas/vendas.module#VendasModule' },
  { path: 'parcelas', loadChildren: 'app/parcelas/parcelas.module#ParcelasModule' },
  { path: 'mesas', loadChildren: 'app/mesas/mesas.module#MesasModule' },
  { path: 'formapagamentos', loadChildren: 'app/formapagamentos/formapagamentos.module#FormapagamentosModule' },
  { path: 'permissoes', loadChildren: 'app/permissoes/permissoes.module#PermissoesModule' },
  { path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule'},
  { path: 'relatorios', loadChildren: 'app/relatorios/relatorios.module#RelatoriosModule' },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'nao-autorizado', component: NaoAutorizadoComponent },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
