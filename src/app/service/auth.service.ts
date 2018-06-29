import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { User } from '../domain'
import { Observable } from 'rxjs';
import { Project } from '../domain'
@Injectable()
export class AuthService {
    private readonly domain = 'user';
    private headers = new Headers({
        'Content-type': 'application/json'
    })
    constructor(
        private http: Http,
        @Inject('BASE_URL') private baseUrl
    ) { }
    register(filter: string): Observable<User[]> {
        let url = `${this.baseUrl.baseUrl}/${this.domain}`;
        return this.http.get(url, { params: { 'email_like': filter } })
            .map(res => res.json() as User[])
    }
  

}