import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventPageRoutingModule } from './event-routing.module';

import { EventPage } from './event.page';
import { MenuModule } from '../menu/menu.module';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import { AllEventComponent } from './all-event/all-event.component';
import { DetailEventComponent } from './detail-event/detail-event.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventPageRoutingModule,
    ReactiveFormsModule,
    MenuModule
  ],
  declarations: [EventPage, DetailEventComponent, AllEventComponent],
  providers: [ EventService, UserService ]
})
export class EventPageModule {}
