import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MesasRoutingModule } from './mesas-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { MesaCadastroComponent } from './mesa-cadastro/mesa-cadastro.component';
import { MesaPesquisaComponent } from './mesa-pesquisa/mesa-pesquisa.component';

import { CurrencyMaskModule } from 'ng2-currency-mask';

import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    InputTextModule,
    ButtonModule,
    DialogModule,
    TableModule,
    TooltipModule,
    PanelModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    CurrencyMaskModule,
    InputSwitchModule,

    SharedModule,
    MesasRoutingModule
  ],
  declarations: [
    MesaCadastroComponent,
    MesaPesquisaComponent
  ]
})
export class MesasModule { }
