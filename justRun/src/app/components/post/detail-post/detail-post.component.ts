import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Usuario } from 'src/app/model/usuario';
import { ActivatedRoute, Router, RouterState } from '@angular/router';
import { Post } from 'src/app/model/post';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { CommentPost } from 'src/app/model/comment-post';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.scss',],
  providers: [ PostService, UserService ]
})
export class DetailPostComponent implements OnInit {

  user: Usuario = new Usuario("1", "Pepe", "García", "pepe@gmail.com","123456", "");

  //@Input() post: Post
  post: Post = new Post("", "", 1, "", this.user, "", []);

  formComentario: any;

  public token;
  public status;
  public identity;

  constructor(private fb: FormBuilder,
    private srvPost: PostService,
    private _userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { 
    this.formComentario = this.fb.group({
      comentarioId: ['', [Validators.required, Validators.maxLength(160)]]
    });

    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    //this.post = new Post("1", "NUEVAS ZAPATILLAS", Date.now(), "estas zapatillas estan guapisimas bro", this.user, "", []);
  }

  ngOnInit(){
    this.getPost();
  }

  private getPost(){
    // LLAMADA AL BACKEND PARA COGER EL POST SELECCIONADO
    this.srvPost.getPost(/*this.route.snapshot.paramMap.get('id')*/"60b3722549f2772c6c3e6556").subscribe(
      datos => {
        this.post = datos.topic;
        console.log(datos.topic);
      },
      error => {
        console.log(error);
      }
    );
  }

  public addComentario(){
    var comment: CommentPost = new CommentPost("1", this.formComentario.value.comentarioId, Date.now(), this.user);
    this.post.comments.push(comment);

    this.srvPost.updatePost(this.token, this.post._id, this.post).subscribe(
      datos => {
        if(datos.topic){
          this.post = datos.topic;
          console.log(this.post);
          console.log("Paso por aqui");
          this.router.navigateByUrl('/');
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
