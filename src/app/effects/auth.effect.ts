import { Injectable } from '@angular/core';
import { Actions, toPayload, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import * as actions from '../actions/auth.action';
import { AuthService } from '../service/auth.service'
import { User } from '../domain';
import { go } from '@ngrx/router-store';

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private service$: AuthService
    ) { }

    @Effect()
    login$: Observable<Action> = this.actions$
        .ofType(actions.ClassActionTypes.LOGIN)
        .map(toPayload)
        .switchMap(({ email, password }) => this.service$.login(email, password)
            .map(q => new actions.LoginSuccessAction(q))
            .catch(err => Observable.of(new actions.LoginFailAction(JSON.stringify(err))))
        )
    @Effect()  // @Effect()修饰的变量名字可以随便取
    ff$: Observable<Action> = this.actions$
        .ofType(actions.ClassActionTypes.REGISTER)
        .map(toPayload)
        .switchMap((user: User) => this.service$.register(user)
            .map(q => new actions.RegesterSuccessAction(q))
            .catch(err => Observable.of(new actions.RegesterFailAction(JSON.stringify(err))))
        )

    @Effect()
    logout$: Observable<Action> = this.actions$
        .ofType(actions.ClassActionTypes.LOGOUT)
        .do(val => sessionStorage.removeItem('persion'))
        .map(_ => go(['/']))

    @Effect()
    loginAndNavigate$: Observable<Action> = this.actions$
        .ofType(actions.ClassActionTypes.LOGIN_SUCCESS)   // effect 可实现action拼接
        .do(val => sessionStorage.setItem('persion', val.payload.user.id))
        .map(_ => go(['project']))
    @Effect()
    registerAndNavigate$: Observable<Action> = this.actions$
        .ofType(actions.ClassActionTypes.REGISTER_SUCCESS)
        .map(_ => go(['project']))
}