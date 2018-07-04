import { NgModule } from '@angular/core';
import { StoreModule, combineReducers, ActionReducer } from '@ngrx/store';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

import * as fromQuote from './quote.reducer';

import { compose } from '@ngrx/core/compose';
import { environment } from '../../environments/environment';
import { createSelector } from 'reselect'

export interface State {  // 用来总括所有的state
    quote: fromQuote.State
};

const initialState: State = {
    quote: fromQuote.initialState
};

const reducers = {   // reducer字典
    quote: fromQuote.reducer
}

const productionReducers: ActionReducer<State> = combineReducers(reducers);
const developmentReducers: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);

export function reducerAll(state = initialState, action: any): State {   // 全局总括的reducer
    if (environment.production) {
        return productionReducers(state, action)
    } else {
        return developmentReducers(state, action)
    }
}

export const getQuoteState = (state: State) => state.quote;
export const getQuote = createSelector(getQuoteState, fromQuote.getQuote);

@NgModule({
    imports: [
        StoreModule.provideStore(reducerAll),
        RouterStoreModule.connectRouter(),
        StoreDevtoolsModule.instrumentOnlyWithExtension(),
    ],
})
export class AppStoreModule { }