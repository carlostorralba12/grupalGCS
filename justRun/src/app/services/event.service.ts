import { global } from './global';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class EventService {
    
    public url: string
    
    constructor(
        private _http: HttpClient
    ) {
        this.url = global.url        
    }

    prueba() {
        return "Hola desde Event Service"
    }

    getMyEvents(userId):Observable<any>{
        let header = new HttpHeaders().set('Content-Type', 'applicatioin/json');

        return this._http.get(this.url+'user-events/'+userId, {headers: header})
    }

    getEvent(id):Observable<any>{
        return this._http.get(this.url+'event/'+id);
    }

    updateEvent(token, id, event):Observable<any> {
        let params = JSON.stringify(event);

        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', token);

        return this._http.put(this.url+'event/'+id, params, {headers:headers})
    }

    deleteEvent(token, id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', token);

        return this._http.delete(this.url+'event/'+id, {headers:headers})
    }

}