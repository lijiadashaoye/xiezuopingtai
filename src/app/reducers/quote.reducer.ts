import * as quoteAction from '../actions/quote.action';
import { Quote } from '../domain/quote.model';
<<<<<<< HEAD
=======
import * as actions from '../actions/quote.action';
>>>>>>> df30aeae9072f55027fb9cff10a0f3c3966575b5

export interface State {
    quote: Quote;
};

export const initialState: State = {
    quote: {
        "cn": "想有发现就要实验，这项实验需要时间。—《神盾局特工》",
        "en": "Discovery requires experimentation, and this experiment will take time.",
        "pic": "/assets/img/quotes/5.jpg"
    }
};

export function reducer(state = initialState, action: actions.Actions): State {
    switch (action.type) {
        case actions.ActionTypes.LOAD_SUCCESS: {
            return { ...state, quote: <Quote>action.payload };
        };
        case actions.ActionTypes.LOAD_FAIL: {
            return state
        };
        default: {
            return state;
        }
    }
}
export const getQuote = (state: State) => state.quote;