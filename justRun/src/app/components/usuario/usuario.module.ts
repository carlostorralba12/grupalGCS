import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular';

import { UsuarioPageRoutingModule } from './usuario-routing.module';

import { EditComponent } from './edit/edit.component';
import { ProfileComponent } from './profile/profile.component';
import { MenuModule } from '../menu/menu.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuarioPageRoutingModule,
    ReactiveFormsModule,
    MenuModule
  ],
  exports: [
    EditComponent,
    ProfileComponent
  ],
  declarations: [EditComponent, ProfileComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class UsuarioPageModule {}
