import { global } from './../../../services/global';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { Post } from 'src/app/model/post';


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
  providers: [ PostService, UserService]
})
export class AddPostComponent  {

  public file;
  public post: Post;
  public user: Usuario
  public afuConfig;
  public url;
  public token;
  public identity;
  public status;
  
 

    constructor(
      private _router: Router,
      private route:ActivatedRoute,
      private _userService: UserService,
      private _postService: PostService,
      private http: HttpClient
    ) {
        this.url = global.url;
        this.user = new Usuario('','','','','','');
        this.token = _userService.getToken();
        this.identity = _userService.getIdentity();
        this.post = new Post ("","",1,"", "", "", []);
      }
      

      goToPosts() {
        this._router.navigate(['/'])
       }


    imageUpload(data){
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
      this._postService.subirImagen(formData,this.token,this.post._id).subscribe(
        response => {
          console.log(response, "la imagen subida")
          
        },
        error => {
          console.log(error)
        }
      )
    }
  }


  onSubmit(form){
    var id = this.post._id
    this._postService.createPost(this.token, this.post).subscribe(
      response => {
        if(response.topic){
          this.status = 'success',
          this.post = response.topic
          console.log(this.post)
          this.subirImagen()
        }
      },
      error => console.log(error)
    )
  }

  



}
