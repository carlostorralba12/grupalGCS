import { global } from './../../../services/global';
import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Usuario } from 'src/app/model/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommentPost } from 'src/app/model/comment-post';
import { Post } from 'src/app/model/post';
import { PostService } from 'src/app/services/post.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.scss'],
  providers: [ PostService, UserService]
})
export class AllPostComponent  implements OnInit {
  formEditPost: any
  public post: Post;
  public token;
  public status;
  public identity;
  public posts: Array<Post>;
  public url;

  constructor(
  private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _postService: PostService,
    private http: HttpClient
  ) {
    this.post = new Post ('','',1,'','','',[])
    this.token = _userService.getToken()
    this.url = global.url;
   }

  ngOnInit():void {
    this.getPosts()
  }

  getPosts() {
    
    this._postService.getPosts().subscribe(
      response => {
        if(response.topics) {
          console.log();
          this.posts = response.topics;
          console.log(this.posts,"estos son los posts: ")
        }
      },
      error => {
        console.log(error)
      }
    )
  }
}
  //postDePrueba = this.getPost();

/** 
 //@Input() post: Post
 post1: Post;
 post2: Post;
 post3: Post;
 post4: Post;
 post5: Post;

 user1: Usuario = new Usuario("1", "Pepe", "García", "pepe@gmail.com","123456", "");
 user2: Usuario = new Usuario("2", "Ramón", "Lopez", "ramón@gmail.com","123456", "");
 user3: Usuario = new Usuario("3", "Paco", "Macía", "paco@gmail.com","123456", "");
 user4: Usuario = new Usuario("4", "Alberto", "Gómez", "alberto@gmail.com","123456", "");
 user5: Usuario = new Usuario("5", "Sofía", "Pérez", "sofia@gmail.com","123456", "");
  users:Usuario[] = []; 
  posts:Post[] = [];



 constructor(private fb: FormBuilder,
   private router: Router, 
   private navCtrl: NavController) { 
   
   this.post1 = new Post("1", "NUEVAS ZAPATILLAS", "estas zapatillas estan guapisimas bro", 
   this.user1, "", []);
  this.users.push(this.user1);
  this.posts.push(this.post1);

   this.post2 = new Post("2", "Entrenamiento duro", "10 kilómetros por toda la playa", 
   this.user2, "", []);
   this.users.fill(this.user2);
   this.posts.fill(this.post2);

   this.post3 = new Post("3", "He salido a correr con mi amiga", "que buen tiempo hacía", 
   this.user3, "", []);
   this.users.fill(this.user3);
   this.posts.fill(this.post3);
   
   this.post4 = new Post("4", "que comodos estos shorts", "me encantan", 
   this.user4, "", []);
   this.users.fill(this.user4);
   this.posts.fill(this.post4);

   this.post5 = new Post("5", "que comodos estos shorts", "me encantan", 
   this.user5, "", []);
   this.users.fill(this.user5);
   this.posts.fill(this.post5);
   */


 

 



