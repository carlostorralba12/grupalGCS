import { Post } from './../../../model/post';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.scss'],
})
export class DetailPostComponent implements OnInit {

  //@Input() post: Post
  post: Post
  constructor() { 
    
  }

  ngOnInit() {}

}
