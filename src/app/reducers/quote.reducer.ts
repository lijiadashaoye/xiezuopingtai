import * as quoteAction from '../actions/quote.action';
import { Quote } from '../domain/quote.model';

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

export function reducer(state = initialState, action: { type: string, payload: any }): State {
    switch (action.type) {
        case quoteAction.QUOTE_SUCCESS: {
            return { ...state, quote: action.payload };
        };
        case quoteAction.QUOTE_FAIL: {
            return state
        };
        default: {
            return state;
        }
    }
}