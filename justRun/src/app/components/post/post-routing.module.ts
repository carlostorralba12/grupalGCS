import { DetailPostComponent } from './detail-post/detail-post.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllPostComponent } from './all-post/all-post.component';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';


const routes: Routes = [
  {
    path: 'all',
    component: AllPostComponent
  },
  {
    path: 'detail-post/:id',
    component: DetailPostComponent
  },
  {
    path: 'add',
    component: AddPostComponent
  },
  {
    path: 'edit-post/:id',
    component: EditPostComponent
  },
  {
    path: '',
    redirectTo: 'all',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostPageRoutingModule {}
