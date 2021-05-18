import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'post',
    loadChildren: () => import('./components/post/post.module').then( m => m.PostPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./components/auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'event',
    loadChildren: () => import('./components/event/event.module').then( m => m.EventPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./components/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'usuario',
    loadChildren: () => import('./components/usuario/usuario.module').then( m => m.UsuarioPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
