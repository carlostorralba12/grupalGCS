import { DetailPostComponent } from './../components/post/detail-post/detail-post.component';
import { global } from './global';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../model/post';


@Injectable()
export class PostService {
    
    public url: string
    
    constructor(
        private _http: HttpClient
    ) {
        this.url = global.url        
    }

    prueba() {
        return "Hola desde Post Service"
    }
 
    //this.user._id = "60a53869c75081218465d886"
    getMyTopics(userId):Observable<any>{
        let header = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url+'user-topics/'+userId, {headers: header})
    }

    getPost(id):Observable<any>{
        return this._http.get(this.url+'topic/'+id);
    }

    getPosts():Observable<any>{
        let header = new HttpHeaders().set('Content-Type', 'applicatioin/json');
        
        return this._http.get(this.url+'topics');
    }

    createPost(token,post):Observable<any> {
        let params = JSON.stringify(post);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', token);

        return this._http.post(this.url+'topic', params, {headers:headers})
    }

    updatePost(token, id, post): Observable<any> {
        let params = JSON.stringify(post);

        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);

        return this._http.put(this.url + 'topic/' + id, params, { headers: headers })
    }

    deletePost(token, id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', token);

        return this._http.delete(this.url+'topic/'+id, {headers:headers})
    }
    
    subirImagen(formData,token,id):Observable<any> {

        let headers = new HttpHeaders().set('Authorization',token)

        return this._http.post(this.url+'upload-post/'+id,formData, {headers:headers})

    }
}