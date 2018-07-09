import { Action } from '@ngrx/store';
import { type } from '../utils/type.util';
import { Auth } from '../service/auth.mode';
import { User } from '../domain';

export const ClassActionTypes = {

    LOGIN: type('[Auth] Login'),
    LOGIN_SUCCESS: type('[Auth] Login Success'),
    LOGIN_FAIL: type('[Auth] Login Fail'),
    REGISTER: type('[Auth] Register'),
    REGISTER_SUCCESS: type('[Auth] Register Success'),
    REGISTER_FAIL: type('[Auth] Register Fail'),
    LOGOUT: type('[Auth] Logout'),
};

export class LoginAction implements Action {
    readonly type = ClassActionTypes.LOGIN;
    constructor(public payload: { email: string, password: string }) { }
}
export class LoginSuccessAction implements Action {
    readonly type = ClassActionTypes.LOGIN_SUCCESS;
    constructor(public payload: Auth) { }
}
export class LoginFailAction implements Action {
    readonly type = ClassActionTypes.LOGIN_FAIL;
    constructor(public payload: string) { }
}


export class RegesterAction implements Action {
    readonly type = ClassActionTypes.REGISTER;
    constructor(public payload: User) { }
}
export class RegesterSuccessAction implements Action {
    readonly type = ClassActionTypes.REGISTER_SUCCESS;
    constructor(public payload: Auth) { }
}
export class RegesterFailAction implements Action {
    readonly type = ClassActionTypes.REGISTER_FAIL;
    constructor(public payload: string) { }
}

export class LogoutAction implements Action {
    readonly type = ClassActionTypes.LOGOUT;
    constructor(public payload: Auth) { }
}

export type Actions = LoginAction
    | LoginSuccessAction
    | LoginFailAction
    | RegesterAction
    | RegesterSuccessAction
    | RegesterFailAction
    | LogoutAction