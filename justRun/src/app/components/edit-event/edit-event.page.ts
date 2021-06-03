import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../services/user.service';
import { EventService } from './../../services/event.service';
import { Event } from './../../model/event';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.page.html',
  styleUrls: ['./edit-event.page.scss'],
  providers: [UserService, EventService]
})
export class EditEventPage implements OnInit {

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

  ngOnInit() {
    this.getEvent()
  }

  getEvent() {
    this._route.params.subscribe(params => {
      let id = params['id'];


      this._eventService.getEvent(id).subscribe(
        response => {
          if(!response){
            this._router.navigate(['/panel'])
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
