import { Injectable } from '@angular/core';
import { Actions, toPayload, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import * as actions from '../actions/quote.action';
import { QuoteService } from '../service/quote.service'


@Injectable()
export class QuoteEffects {
    constructor(
        private actions$: Actions,
        private service$: QuoteService
    ) { }

    @Effect()
    quote$: Observable<Action> = this.actions$.ofType(actions.ActionTypes.LOAD)
        .map(toPayload)
        .switchMap(_ => this.service$.getQuote()
            .map(q => new actions.LoadSuccesAction(q))
            .catch(err => Observable.of(new actions.LoadFailAction(JSON.stringify(err))))
        )
}