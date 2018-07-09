import {
  Injectable,
  Inject
} from '@angular/core';
import {
  Http,
  Headers
} from '@angular/http';
import {
  User
} from '../domain'
import {
  Observable
} from 'rxjs';
import {
  Project
} from '../domain';
import {
  Auth
} from './auth.mode'
@Injectable()
export class AuthService {
  private readonly domain = 'users';
  private token = "123456789"
  private headers = new Headers({
    'Content-type': 'application/json'
  })
  constructor(
    private http: Http,
    @Inject('BASE_URL') private baseUrl
  ) {}
  register(user: User): Observable < Auth > {
    user.id = null;
    let url = `${this.baseUrl.baseUrl}/${this.domain}`;
    return this.http.get(url, {
        params: {
          'email': user.email
        }
      })
      .switchMap(res => {
        if (res.json().length > 0) {
          throw 'user existed';
        }
        return this.http.post(url, JSON.stringify(user), {
            headers: this.headers
          })
          .map(resd => ({
            token: this.token,
            user: resd.json()
          }))
      })
  }
  login(username: string, password: string): Observable < Auth > {
    let url = `${this.baseUrl.baseUrl}/${this.domain}`;
    return this.http.get(url, JSON.stringify({
      params: {
        'email': username,
        'password': password
      }
    })).map(res => {
      if (res.json().length === 0) {
        throw 'username or password not match';
      }
      return {
        token: this.token,
        user: res.json()[0]
      }
    })
  }

}
