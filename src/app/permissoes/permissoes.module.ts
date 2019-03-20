import { PermissaoPesquisaComponent } from './permissao-pesquisa/permissao-pesquisa.component';
import { PermissaoCadastroComponent } from './permissao-cadastro/permissao-cadastro.component';
import { PermissoesRoutingModule } from './permissoes-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,

    PermissoesRoutingModule
  ],
  declarations: [
    PermissaoCadastroComponent,
    PermissaoPesquisaComponent
  ]
})
export class PermissoesModule { }
