import { global } from './../../services/global';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [ UserService ]
})
export class MenuComponent implements OnInit {

  public identity;
  public token;
  public url;
  @Input() public title: string;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute,
    private menu: MenuController
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;
  }

  ngOnInit() {
    //console.log(this.identity)
    //console.log(this.token)
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

  goToMainMenu() {
    this._router.navigate(['/'])
  }

  goToProfile() {
    this._router.navigate(['/tabs/usuario'])
   }

  goToAddEvent() {
    this._router.navigate(['/event/add'])
   }

  goToAddPost() {
    this._router.navigate(['/post/add'])
  }

  goToLogin() {
    this._router.navigate(['/login'])
  }

  goToRegister() {
    this._router.navigate(['/registro'])
  }


  logout(){
    localStorage.clear();
    this.identity = null;
    this.token = null;
    this._router.navigate(['/login'])
  }

}
