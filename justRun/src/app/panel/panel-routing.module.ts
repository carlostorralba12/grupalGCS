import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

//Componentes
import { ListComponent } from './components/list/list.component';
import { EditComponent } from './../components/usuario/edit/edit.component';
import { MainComponent } from './components/main/main.component';

const panelRoutes: Routes = [
    {
        path: 'panel',
        component: MainComponent,
        children: [
            { path: '', component: ListComponent },
            { path: 'listado', component: ListComponent },
            
        ]
    },
    
];

@NgModule({
    imports: [
        RouterModule.forChild(panelRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class PanelRoutingModule {  }