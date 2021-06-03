import { AllEventComponent } from './all-event/all-event.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailEventComponent } from './detail-event/detail-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';

const routes: Routes = [
  {
    path: 'all',
    component: AllEventComponent
  },
  {
    path: 'detail-event/:id',
    component: DetailEventComponent
  },
  {
    path: 'edit-event/:id',
    component: EditEventComponent
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
export class EventPageRoutingModule {}
