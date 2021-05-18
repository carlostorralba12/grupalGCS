import { Post } from './../../../model/post';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.scss'],
})
export class AllPostComponent implements OnInit {

  //ruta: /post/all
  public posts: Post[] = [new Post(), new Post()];
  constructor() { }

  ngOnInit() {}
  

}
