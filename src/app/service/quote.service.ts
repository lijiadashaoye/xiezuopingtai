import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { Quote } from '../domain/quote.model'

@Injectable()
export class QuoteService {

  constructor(
    private http: Http,
    @Inject('BASE_URL') private baseUrl
  ) { }
  getQuote(): Observable<Quote> {
    let num = Math.floor(Math.random() * 10)
    let url = `${this.baseUrl.baseUrl}/quotes/${num}`
    return this.http.get(url).map(res => res.json() as Quote)
  }
}
