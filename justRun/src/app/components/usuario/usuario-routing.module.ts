import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'edit',
    component: EditComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioPageRoutingModule {}
