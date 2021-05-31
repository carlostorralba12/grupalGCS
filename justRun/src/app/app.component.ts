import { global } from './services/global';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { Component, OnInit, DoCheck } from '@angular/core';
import { MenuController } from '@ionic/angular'



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [UserService]
})
export class AppComponent implements OnInit {
  
  public identity;
  public token;
  public url;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute,
    private menu: MenuController
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url
  }

  ngOnInit() {
    console.log(this.identity)
    console.log(this.token)
  }

  ngDoCheck(){
    this.identity = this._userService.getIdentity()
  }


  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }



  logout(){
    localStorage.clear();
    this.identity = null;
    this.token = null;
    this._router.navigate(['/login'])
  }

}
