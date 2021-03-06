import { AllEventComponent } from './../components/event/all-event/all-event.component';
import { ProfileComponent } from './../components/usuario/profile/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AllPostComponent } from '../components/post/all-post/all-post.component';
import { HomeComponent } from '../components/home/home.component';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'event',
        loadChildren: () => import('./../components/event/event.module').then(m => m.EventPageModule),
      },
      {
        path: 'post',
        loadChildren: () => import('./../components/post/post.module').then(m => m.PostPageModule),
      },
      {
        path: 'usuario',
        loadChildren: () => import('./../components/usuario/usuario.module').then(m => m.UsuarioPageModule),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
