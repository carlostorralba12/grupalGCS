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
    this.user = this.identity
  }

  avatarUpload(data){
    this.file = data.target.files[0];
   const reader = new FileReader();

   console.log(this.file)

   //this.subirImagen()

  }

  subirImagen() {
    if(this.file != null){
      const formData = new FormData()
      formData.append("file0",this.file,this.file.name)
      console.log(formData)
      this._userService.subirImagen(formData).subscribe(
        response => {
          console.log(response.userUpdated, "la imagen subida")

          this.user = response.user

          localStorage.setItem('identity', JSON.stringify(this.user))
        },
        error => {
          console.log(error)
        }
      )
    }
  }

  onSubmit() {
    console.log(this.user, "el user del form")
    this.user._id = this.identity._id
    this.subirImagen()
   this._userService.update(this.user).subscribe(
     response => {
      if(!response.user){
        this.status = 'error';
      }else{
        this.status = 'success'
        this.user = response.user
        if(this.identity.image != null || this.identity.image != ""){
          this.user.image = this.identity.image
        }

        

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
