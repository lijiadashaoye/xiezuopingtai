export const QUOTE = 'Quote'
export const QUOTE_SUCCESS = 'Quote Success'
export const QUOTE_FAIL = 'Quote Fail'

import { Action } from '@ngrx/store';
import { Quote } from '../domain/quote.model';
import { type } from '../utils/type.util'

export const ActionTypes = {
    LOAD: type('[Quote] Load'),
    LOAD_SUCCESS: type('[Quote] Load Success'),
    LOAD_FAIL: type('[Quote] Load Fail'),
};

export class LoadAction implements Action {
    readonly type = ActionTypes.LOAD;
    constructor(public payload: Quote) { }
}

export class LoadSuccesAction implements Action {
    readonly type = ActionTypes.LOAD_SUCCESS;
    constructor(public payload: Quote) { }
}

export class LoadFailAction implements Action {
    readonly type = ActionTypes.LOAD_FAIL;
    constructor(public payload: string) { }
}

export type Actions = LoadAction | LoadSuccesAction | LoadFailAction;
