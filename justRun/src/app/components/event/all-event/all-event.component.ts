import { Event } from './../../../model/event';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import { global } from './../../../services/global';

@Component({
  selector: 'app-all-event',
  templateUrl: './all-event.component.html',
  styleUrls: ['./all-event.component.scss'],
  providers: [ EventService, UserService]
})
export class AllEventComponent implements OnInit {


  public events: Array<Event>;
  
 
  public url;
  public token;
  public status;
  public identity;
  _eventService: any;

  constructor(private fb: FormBuilder,
    private srvEvent: EventService,
    private _userService: UserService,
    
    private route: ActivatedRoute,
    private router: Router) { 
    
      
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.url = global.url;
  }
  ngOnInit(): void {
    this.getEvents();
  }

  getEvents() {
    
    this.srvEvent.getEvents().subscribe(
      response => {
        if(response.events) {
          console.log(response);
          this.events = response.events
          console.log(this.events,"Estos son los eventos: ");
        }
      },
      error => {
        console.log(error)
      }
    )
  }
}

  


