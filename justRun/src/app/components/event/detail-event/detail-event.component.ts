import { global } from './../../../services/global';
import { Event } from './../../../model/event';
import { Component, OnInit } from '@angular/core';
import { CommentEvent } from 'src/app/model/comment-event';
import { CommentEventService } from 'src/app/services/comment-event.service';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrls: ['./detail-event.component.scss'],
  providers: [ EventService, UserService, CommentEventService ]
})
export class DetailEventComponent implements OnInit {

  //user: Usuario = new Usuario("1", "Pepe", "García", "pepe@gmail.com","123456", "");

  event: Event = new Event("", "", "", 1, "", "", []);

  formComentario: any;

  public url;
  public token;
  public status;
  public identity;

  constructor(private fb: FormBuilder,
    private srvEvent: EventService,
    private _userService: UserService,
    private srvCommentEvent: CommentEventService,
    private route: ActivatedRoute,
    private router: Router) { 
    this.formComentario = this.fb.group({
      comentarioId: ['', [Validators.required, Validators.maxLength(160)]]
    });

    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.url = global.url;
  }

  ngOnInit(){
    this.getEvent();
  }

  private getEvent(){
    // LLAMADA AL BACKEND PARA COGER EL event SELECCIONADO
    this.srvEvent.getEvent(this.route.snapshot.paramMap.get('id')).subscribe(
      datos => {
        this.event = datos.event;
      },
      error => {
        console.log(error);
      }
    );
  }

  public addComentario(){
    var comment: CommentEvent = new CommentEvent("", this.formComentario.value.comentarioId, Date.now(), this.identity);

    this.srvCommentEvent.addComment(this.token, comment, this.event).subscribe(
      datos => {
        if(datos.event){
          this.event = datos.event;
          this.formComentario.controls['comentarioId'].setValue("");
          this.router.navigateByUrl('/event/detail-event/' + this.event._id);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteComentario(comment_id){
    this.srvCommentEvent.deleteComment(this.token, this.event._id, comment_id).subscribe(
      complete => {
        this.getEvent();
        this.router.navigateByUrl('/event/detail-event/' + this.event._id)
      },
      error => {
        console.log(error);
      }
    );
  }
}
