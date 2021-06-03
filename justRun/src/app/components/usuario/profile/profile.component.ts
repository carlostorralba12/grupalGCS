import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/model/post';
import { Event } from 'src/app/model/event';
import { EventService } from 'src/app/services/event.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  public readonly title = "PANEL DE USUARIO"

  public posts: Array<Post>;
  public events: Array<Event>;
  public token;
  public status;
  public identity;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _postService: PostService,
    private _eventService: EventService
  ) { 
    this.token = _userService.getToken();
    this.identity= _userService.getIdentity()
  }

  ngOnInit() {
    this.getPosts();
    this.getEvents()
  }

  getPosts() {
    
    this._postService.getMyTopics(this.identity._id).subscribe(
      response => {
        if(response.topics) {
          this.posts = response.topics
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  getEvents() {
    var userId = this.identity._id
    this._eventService.getMyEvents(userId).subscribe(
      response => {
        if(response.events) {
          this.events = response.events
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  deletePost(id){
    this._postService.deletePost(this.token, id).subscribe(
      response => {
        this.getPosts();
      },
      error => console.log(error)
    )
  }

  deleteEvent(id){
    this._eventService.deleteEvent(this.token, id).subscribe(
      response => {
        this.getEvents();
      },
      error => console.log(error)
    )
  }

}
