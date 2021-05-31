import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Usuario } from 'src/app/model/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommentPost } from 'src/app/model/comment-post';
import { Post } from 'src/app/model/post';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.scss'],
})
export class DetailPostComponent {

  //@Input() post: Post
  post: Post;

  user: Usuario = new Usuario("1", "Pepe", "García", "pepe@gmail.com","123456", "");

  formComentario: any;

  constructor(private fb: FormBuilder,
    private router: Router, 
    private navCtrl: NavController) { 
    this.formComentario = this.fb.group({
      comentarioId: ['', [Validators.required, Validators.maxLength(160)]]
    });
    this.post = new Post("1", "NUEVAS ZAPATILLAS", "estas zapatillas estan guapisimas bro", 
    this.user, "", []);
  }

  addComentario(){
    let comment: CommentPost;
    comment._id = "1";
    comment.content = this.formComentario.value.comentarioId;
    comment.user = this.user;

    var d = new Date();

    comment.date = d.getDate() + "/" + d.getMonth()+1 + "/" + d.getFullYear;

    this.post.comments.push(comment);
  }

}
