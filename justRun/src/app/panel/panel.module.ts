//Modulos
import { PanelRoutingModule } from './panel-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

//Componentes
import { ListComponent } from './components/list/list.component';

import { MainComponent } from './components/main/main.component';

//Servicios



//NgModule
@NgModule({
    declarations: [
        MainComponent,
        ListComponent,
        
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        PanelRoutingModule
    ],
    exports: [
        MainComponent,
        ListComponent,
        
    ],
    providers: []
})

export class PanelModule {}