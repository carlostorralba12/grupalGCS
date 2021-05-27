import { global } from './global';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Usuario } from './../model/usuario';

@Injectable()
export class UserService{

    public url;
    public token;
    public identity;

    constructor(private _http: HttpClient){
        this.url = global.url;
        
    }

    prueba(){
        return "hola desde user service";
    }


    register(user):Observable<any>{
        let params = JSON.stringify(user);

        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'register', params, {headers:headers})
    }

    login(user, gettoken = null):Observable<any>{
        
        if(gettoken != null) {
            user.gettoken = gettoken;
        }

        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'login',params, {headers:headers})

    }


    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity'));

        if(identity && identity != null && identity != "undefined" && identity != undefined){
            this.identity = identity
        }else{
            this.identity = null;
        }

        return this.identity;
    }

    getToken(){
        let token = localStorage.getItem('token');

        if(token && token != null && token != "undefined" && token != undefined){
            this.token = token
        }else{
            this.token = null;
        }

        return this.token;
    }



    update(user):Observable<any>{
        let params = JSON.stringify(user);

        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', this.token)

        return this._http.put(this.url+'update', params, {headers:headers});
    }
}