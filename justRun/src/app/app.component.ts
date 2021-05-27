import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { Component, OnInit, DoCheck } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [UserService]
})
export class AppComponent implements OnInit {
  
  public identity;
  public token;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    console.log(this.identity)
    console.log(this.token)
  }

  ngDoCheck(){
    this.identity = this._userService.getIdentity()
  }

  logout(){
    localStorage.clear();
    this.identity = null;
    this.token = null;
    this._router.navigate(['/login'])
  }

}
