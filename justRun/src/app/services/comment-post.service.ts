import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class CommentPostService {

  url: any;

  constructor(private http: HttpClient) { 
    this.url = global.url;
  }

  addComment(token, comment, post): Observable<any> {
    let params = JSON.stringify(comment);

    let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', token);

    return this.http.post(this.url + 'comment/topic/' + post._id, params, { headers: headers })
  }

  deleteComment(token, id_post, id_comment):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', token);

    return this.http.delete(this.url+'comment/'+id_post + "/" + id_comment, {headers:headers})
  } 
}
