import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/model/post';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
  providers: [UserService, PostService]
})
export class EditPostComponent implements OnInit {

  formEditPost: any
  public post: Post;
  public token;
  public status;
  public identity;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _postService: PostService,
    private http: HttpClient
  ) {
    this.post = new Post ("","",1,"", "", "", []);
    this.token = _userService.getToken()
   }

  ngOnInit() {
    this.getPost()
  }

  getPost() {
    console.log(this.token)
    this._route.params.subscribe(params => {
      let id = params['id'];
      console.log("entra?")

      this._postService.getPost(id).subscribe(
        response => {
          if(!response){
            this._router.navigate(['/usuario/profile'])
          }else{
            this.post = response.topic;
            console.log(this.post)
          }
        },
        error => console.log(error)
      )
      console.log(id)
    })
  }

  onSubmit(form){
    var id = this.post._id
    this._postService.updatePost(this.token, id, this.post).subscribe(
      response => {
        if(response.topic){
          this.status = 'success',
          this.post = response.topic
          console.log(this.post)
          this._router.navigate(['/usuario/profile'])
        }
      },
      error => console.log(error)
    )
  }

}
