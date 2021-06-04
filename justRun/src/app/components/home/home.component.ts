import { EventService } from 'src/app/services/event.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [UserService,PostService,EventService]
})
export class HomeComponent implements OnInit {

  public title: string = "HOME";
  
  constructor(private _router: Router) { }


  goToEvents() {
    this._router.navigate(['/event/all'])
   }

   goToPosts() {
    this._router.navigate(['/post/all'])
   }

  ngOnInit() {}

}
