import { AllEventComponent } from './all-event/all-event.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventPage } from './event.page';

const routes: Routes = [
  {
    path: '',
    component: EventPage
  },
  {
    path: 'all',
    component: AllEventComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventPageRoutingModule {}
