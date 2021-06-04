import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Usuario } from 'src/app/model/usuario';
import { ActivatedRoute, Router, RouterState } from '@angular/router';
import { Post } from 'src/app/model/post';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { CommentPost } from 'src/app/model/comment-post';
import { global } from 'src/app/services/global';
import { CommentPostService } from 'src/app/services/comment-post.service';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.scss',],
  providers: [ PostService, UserService, CommentPostService ]
})
export class DetailPostComponent implements OnInit {

  //user: Usuario = new Usuario("1", "Pepe", "García", "pepe@gmail.com","123456", "");

  //@Input() post: Post
  post: Post = new Post("", "", 1, "", "", "", []);

  formComentario: any;

  public url;
  public token;
  public status;
  public identity;

  constructor(private fb: FormBuilder,
    private srvPost: PostService,
    private _userService: UserService,
    private srvCommentPost: CommentPostService,
    private route: ActivatedRoute,
    private router: Router) { 
    this.formComentario = this.fb.group({
      comentarioId: ['', [Validators.required, Validators.maxLength(160)]]
    });

    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.url = global.url;
    //this.post = new Post("1", "NUEVAS ZAPATILLAS", Date.now(), "estas zapatillas estan guapisimas bro", this.user, "", []);
  }

  ngOnInit(){
    this.getPost();
  }

  private getPost(){
    // LLAMADA AL BACKEND PARA COGER EL POST SELECCIONADO
    this.srvPost.getPost(this.route.snapshot.paramMap.get('id')).subscribe(
      datos => {
        this.post = datos.topic;
      },
      error => {
        console.log(error);
      }
    );
  }
  deletePost(id){
    this.srvPost.deletePost(this.token, id).subscribe(

      complete => {
        this.router.navigate(['/tabs/post'])
        .then(() => {
          window.location.reload();
        });
      },
      error => console.log(error)
    )
  }

 
  public addComentario(){
    var comment: CommentPost = new CommentPost("", this.formComentario.value.comentarioId, Date.now(), this.identity);

    this.srvCommentPost.addComment(this.token, comment, this.post).subscribe(
      datos => {
        if(datos.topic){
          this.post = datos.topic;
          this.formComentario.controls['comentarioId'].setValue("");
          this.router.navigateByUrl('/post/detail-post/' + this.post._id);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteComentario(comment_id){
    this.srvCommentPost.deleteComment(this.token, this.post._id, comment_id).subscribe(
      complete => {
        this.getPost();
        this.router.navigateByUrl('/post/detail-post/' + this.post._id)
      },
      error => {
        console.log(error);
      }
    );
  }

}
