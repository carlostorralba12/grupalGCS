import { global } from './../../../services/global';
import { Component, OnInit } from '@angular/core';
import { Event } from './../../../model/event';

import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from 'src/app/model/usuario';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
  providers: [ EventService, UserService]
})
export class AddEventComponent  {

  
    event: Event = new Event("", "", "", 1, "", "", []);
    public file;
    public user: Usuario
    public afuConfig;
    public url;
    public token;
    public identity;
    public status;
 

    constructor(
      private _router: Router,
      private route:ActivatedRoute,
      private _userService: UserService,
      private _eventService: EventService,
      private http: HttpClient
    ) {
        this.url = global.url;
        this.user = new Usuario('','','','','','');
        this.token = _userService.getToken();
        this.identity = _userService.getIdentity();
      }
  
      goToEvents() {
        this._router.navigate(['/'])
       }

    imageUpload(data){
      this.file = data.target.files[0];
     const reader = new FileReader();
  
     console.log(this.file)
  
     //this.subirImagen()
  
    }

    subirImagen() {
      if(this.file != null){
        const formData = new FormData()
        formData.append("file0",this.file,this.file.name)
        console.log(formData)
        this._eventService.subirImagen(formData,this.token,this.event._id).subscribe(
          response => {
            console.log(response, "la imagen subida")
            
          },
          error => {
            console.log(error)
          }
        )
      }
    }


    onSubmit(form){
      var id = this.event._id
      this._eventService.createEvent(this.token,  this.event).subscribe(
        response => {
          if(response.event){
            this.status = 'success',
            this.event = response.event
            console.log(this.event)
            this.subirImagen()
          }
        },
        error => console.log(error)
      )
    }

   


  
  

}
