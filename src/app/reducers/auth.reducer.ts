import * as actions from '../actions/auth.action';
import { Auth } from '../domain/auth'

export interface State {

};

export const initialState: State = {};

export function reducer(state = initialState, action: actions.Actions): Auth {
    switch (action.type) {
        case actions.ClassActionTypes.LOGIN_SUCCESS:
        case actions.ClassActionTypes.REGISTER_SUCCESS: {
            return {
                ...<Auth>action.payload
            };
        }

        case actions.ClassActionTypes.LOGIN_FAIL:
        case actions.ClassActionTypes.REGISTER_FAIL: {
            return initialState
        }

        default: {
            return state;
        }
    }
}