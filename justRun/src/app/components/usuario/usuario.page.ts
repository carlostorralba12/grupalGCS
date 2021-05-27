import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { AngularFileUploaderComponent } from "angular-file-uploader";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Usuario } from "../../model/usuario";
import { UserService } from './../../services/user.service';
import { FormBuilder, Validators  } from "@angular/forms";
import { global } from './../../services/global'
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
  providers: [UserService],
  
})
export class UsuarioPage implements OnInit {

  public page_title: string
  public user: Usuario
  public afuConfig;
  public url;
  public token;
  public identity;
  public status;
  public file;

  formEdit: any

  constructor(
    private _router: Router,
    private route:ActivatedRoute,
    private _userService: UserService,
    private http: HttpClient
  ) {
      this.url = global.url
      this.user = new Usuario('','','','','','')
      this.token = _userService.getToken();
      this.identity = _userService.getIdentity();
    }

  ngOnInit() {
    console.log(this._userService.prueba());
  }

  avatarUpload(data){
    this.file = data.target.files[0];
   const reader = new FileReader();

   console.log(this.file)

  }

  subirImagen() {
    if(this.file != null){
      const formData = new FormData()
      formData.append("file0",this.file,this.file.name)
      console.log(formData)
      this.http.post(this.url+'upload-avatar',formData,{
        headers: {
          
          "Authorization": this.token,
        }
      }).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      )
    }
  }

  onSubmit() {
    console.log(this.user, "el user del form")
    this.user._id = this.identity._id
   this._userService.update(this.user).subscribe(
     response => {
      if(!response.user){
        this.status = 'error';
      }else{
        this.status = 'success'

        this.subirImagen()
        localStorage.setItem('identity', JSON.stringify(this.user))
        console.log(this.user, "success")
        //Falta hacer el cambio persistente en el localStorage
      }
     },
     error => {
      console.log(error)
     }
   )
  }
}
