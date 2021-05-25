import { Post } from './../../../model/post';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.scss'],
})
export class DetailPostComponent {

  //@Input() post: Post
  post: Post;

  formComentario: any;

  constructor(private fb: FormBuilder) { 
    this.formComentario = this.fb.group({
      comentarioId: ['', [Validators.required/*, Validators.maxLength(160)*/]]
    });
  }

  addComentario(){

  }

}
