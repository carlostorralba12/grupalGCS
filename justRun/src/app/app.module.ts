import { PostPageModule } from './components/post/post.module';
import { EventPageModule } from './components/event/event.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RegisterComponent } from './components/register/register.component'
import {LoginComponent} from './components/login/login.component'
import { HomeComponent } from './components/home/home.component';
import { MenuModule } from './components/menu/menu.module';
import { UsuarioPageModule } from './components/usuario/usuario.module';

@NgModule({
  declarations: [AppComponent, RegisterComponent, LoginComponent, HomeComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule, 
    FormsModule,
    ReactiveFormsModule, 
    MenuModule,
    UsuarioPageModule,
    EventPageModule,
    PostPageModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
