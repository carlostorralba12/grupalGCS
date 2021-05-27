import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { Usuario } from "../../model/usuario";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  public user: Usuario;
  public status: string;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
    this.user = new Usuario('','','','','','')
   }

  ngOnInit() {}

   onSubmit(form) {
    this._userService.register(this.user).subscribe(
      response => {
        if(response.user && response.user._id){
          this.status = 'success'
          form.reset()
        }else{
          
          this.status = 'error'
          console.log(this.status, "el status")
        }
      },
      error => {
        this.status = 'error',
        console.log(error)
      }
    )
   }

   goToLogin() {
    this._router.navigate(['/login'])
   }

}
