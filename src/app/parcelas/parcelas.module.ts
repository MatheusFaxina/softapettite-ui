import { ParcelasRoutingModule } from './parcelas-routing.module';
import { ParcelaPesquisaComponent } from './parcela-pesquisa/parcela-pesquisa.component';
import { ParcelaCadastroComponent } from './parcela-cadastro/parcela-cadastro.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,

    ParcelasRoutingModule
  ],
  declarations: [
    ParcelaCadastroComponent,
    ParcelaPesquisaComponent
  ]
})
export class ParcelasModule { }
