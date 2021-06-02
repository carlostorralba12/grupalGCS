import { HomeComponent } from './components/home/home.component';
import { EditComponent } from './components/usuario/edit/edit.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component'
import {RegisterComponent } from './components/register/register.component'
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'post',
    loadChildren: () => import('./components/post/post.module').then( m => m.PostPageModule)
  },
  {
    path: 'event',
    loadChildren: () => import('./components/event/event.module').then( m => m.EventPageModule)
  },
  {
    path: 'usuario',
    loadChildren: () => import('./components/usuario/usuario.module').then( m => m.UsuarioPageModule)
  },
  {
    path: 'edit-event/:id',
    loadChildren: () => import('./components/edit-event/edit-event.module').then( m => m.EditEventPageModule)
  },
  {
    path: 'edit-post/:id',
    loadChildren: () => import('./components/edit-post/edit-post.module').then( m => m.EditPostPageModule)
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'registro', component: RegisterComponent
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
