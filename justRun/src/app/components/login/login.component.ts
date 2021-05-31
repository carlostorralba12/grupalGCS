import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Usuario } from "../../model/usuario";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public user: Usuario
  public status: string;
  public identity;
  public token;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { 
    this.user = new Usuario('','','','','','')
  }

  ngOnInit() {}

  onSubmit(form){
    this._userService.login(this.user).subscribe(
      response => {
        if(response.user && response.user._id){
          
          //guardo el usuario identificado
          this.identity = response.user;
          localStorage.setItem('identity', JSON.stringify(this.identity))
          console.log(this.identity, "el identity")
          //Conseguir el token

          this._userService.login(this.user, true).subscribe(
            response => {
              if(response.token){

                this.token = response.token
                localStorage.setItem('token', this.token)
                console.log(this.token, "el token")
                this.status = "success"
                this._router.navigate(['/panel'])
              }else{
                this.status = 'error';
              }
            },
            error => {
              this.status = 'error',
              console.log(error)
            }
          )

        }else{
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error',
        console.log(error)
      }
    )
  }

}
