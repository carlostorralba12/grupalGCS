import { DetailPostComponent } from './detail-post/detail-post.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllPostComponent } from './all-post/all-post.component';

const routes: Routes = [
  {
    path: 'all',
    component: AllPostComponent
  },
  {
    path: 'detail-post',
    component: DetailPostComponent
  },
  {
    path: '',
    redirectTo: 'detail-post',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostPageRoutingModule {}
