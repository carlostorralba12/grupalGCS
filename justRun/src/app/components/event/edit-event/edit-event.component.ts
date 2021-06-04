import { Event } from './../../../model/event';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss'],
  providers: [UserService, EventService]
})
export class EditEventComponent implements OnInit {

  formEditEvent: any
  public file;
  public event: Event;
  public token;
  public status;
  public identity;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _eventService: EventService,
    private http: HttpClient
  ) {
    this.event = new Event ('','','',1,'','',[])
    this.token = _userService.getToken()
    this.identity = _userService.getIdentity()
   }

   goToEvents() {
    this._router.navigate(['/usuario/profile'])
   }

  ngOnInit() {
    this.getEvent()
  }

  getEvent() {
    this._route.params.subscribe(params => {
      let id = params['id'];


      this._eventService.getEvent(id).subscribe(
        response => {
         
            this.event = response.event;
           
        },
        error => console.log(error)
      )
      console.log(id)
    })
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
    this._eventService.updateEvent(this.token, id, this.event).subscribe(
      response => {
        if(response.event){
          this.status = 'success',
          this.event = response.event
          console.log(this.event)
          this.subirImagen();
          this._router.navigate(['/event/detail-event/'+ this.event._id])
          .then(() => {
            window.location.reload();
          });
        }
      },
      error => console.log(error)
    )


  }

}
