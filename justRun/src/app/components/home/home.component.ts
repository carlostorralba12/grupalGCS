import { UserService } from './../../services/user.service';
import { EventService } from 'src/app/services/event.service';
import { PostService } from 'src/app/services/post.service';
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
  
  constructor(private _router: Router, private user: UserService) { }


  goToEvents() {
    this._router.navigate(['/tabs/event'])
   }

   goToPosts() {
    this._router.navigate(['/tabs/post'])
   }

  ngOnInit() {
    if(!this.user.getIdentity()){
      this._router.navigateByUrl('/login');
    }
  }

}
