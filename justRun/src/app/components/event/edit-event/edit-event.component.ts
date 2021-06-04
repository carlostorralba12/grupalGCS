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
    this._router.navigate(['/event/all'])
   }

  ngOnInit() {
    this.getEvent()
  }

  getEvent() {
    this._route.params.subscribe(params => {
      let id = params['id'];


      this._eventService.getEvent(id).subscribe(
        response => {
          if(!response){
            this._router.navigate(['/usuario/profile'])
          }else{
            this.event = response.event;
          }
        },
        error => console.log(error)
      )
      console.log(id)
    })
  }

  onSubmit(form){
    var id = this.event._id
    this._eventService.updateEvent(this.token, id, this.event).subscribe(
      response => {
        if(response.event){
          this.status = 'success',
          this.event = response.event
          console.log(this.event)
        }
      },
      error => console.log(error)
    )


  }

}
