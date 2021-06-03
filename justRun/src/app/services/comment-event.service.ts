import { global } from 'src/app/services/global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentEventService {

  url: any;

  constructor(private http: HttpClient) { 
    this.url = global.url;
  }

  addComment(token, comment, event): Observable<any> {
    let params = JSON.stringify(comment);

    let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', token);

    return this.http.post(this.url + 'commentEvent/event/' + event._id, params, { headers: headers })
  }

  deleteComment(token, id_event, id_comment):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', token);

    return this.http.delete(this.url+'commentEvent/'+id_event + "/" + id_comment, {headers:headers})
  } 
}
